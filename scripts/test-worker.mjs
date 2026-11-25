import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readdirSync,readFileSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {DatabaseSync} from 'node:sqlite';
import {after,test} from 'node:test';

const root = fileURLToPath(new URL('..',import.meta.url));
const output = process.env.SUXUE_BUILD_DIR;
assert.ok(output,'Build the Worker and set SUXUE_BUILD_DIR to its output directory.');
const {default:worker} = await import(pathToFileURL(join(output,'dist','server','index.js')).href);
const database = new DatabaseSync(':memory:');
const migrations = readdirSync(join(output,'drizzle')).filter(file=>file.endsWith('.sql')).sort();
const applyMigration = file=>database.exec(readFileSync(join(output,'drizzle',file),'utf8'));
applyMigration(migrations[0]);
const legacyQuestionId = 'homework-'+'a'.repeat(40);
database.prepare(`INSERT INTO study_attempts
  (owner_id,attempt_ref,question_id,subject_id,term,correct,study_date,submitted_at,homework_prompt)
  VALUES ('legacy-owner','old-review',?,'math','下',0,'2026-11-23',0,'旧作业：说明等式的性质。')`).run(legacyQuestionId);
migrations.slice(1).forEach(applyMigration);
const env = {DB:{
  prepare(sql) {
    const statement = database.prepare(sql);
    const bound = (...values)=>({async all() { return {results:statement.all(...values)}; },
      run() { return {meta:{changes:statement.run(...values).changes}}; }});
    return {...bound(),bind:bound};
  },
  async batch(statements) {
    database.exec('BEGIN');
    try {
      const result = statements.map(statement=>statement.run());
      database.exec('COMMIT');
      return result;
    } catch (error) {
      database.exec('ROLLBACK');
      throw error;
    }
  }
}};
after(()=>database.close());

const origin = 'https://suxue-grade7-practice.myworkspace-8202.chatgpt.site';
const attemptEndpoint = '/api/study-sync';
const request = (path,{owner,...options} = {})=>worker.fetch(new Request(origin+path,{
  ...options,headers:{...options.headers,...(owner ? {'oai-authenticated-user-id':owner} : {})}
}),env);
const rpc = async (method,params,owner)=>await (await request('/mcp',{
  owner,method:'POST',headers:{'Content-Type':'application/json'},
  body:JSON.stringify({jsonrpc:'2.0',id:1,method,params})
})).json();
const call = async (name,args,owner)=>{
  const response = await rpc('tools/call',{name,arguments:args},owner);
  assert.ok(!response.error,response.error?.message);
  return response.result;
};
const good = async (name,args,owner)=>{
  const result = await call(name,args,owner);
  assert.ok(!result.isError,result.content?.[0]?.text);
  assert.deepEqual(JSON.parse(result.content[0].text),result.structuredContent);
  return result.structuredContent;
};

test('website assets match original app and remain directly reachable', async ()=>{
  for (const path of ['index.html','bank.js','app.js','answer-rules.js','styles.css','workbook.webp','equation-square-layout.webp']) {
    const response = await request(path==='index.html' ? '/' : '/'+path);
    assert.equal(response.status,200);
    const original = readFileSync(join(root,'dist',path));
    assert.deepEqual(Buffer.from(await response.arrayBuffer()),original);
    const etag = '"'+createHash('sha256').update(original).digest('hex')+'"';
    assert.equal((await request('/'+path,{headers:{'If-None-Match':etag}})).status,304);
  }
  assert.equal((await request('/drizzle/0000_chat_study.sql')).status,404);
  assert.equal((await request('/mcp')).status,405);
});
test('MCP discovery, compatibility handshake and tool schemas', async ()=>{
  const discovery = await rpc('server/discover');
  assert.deepEqual(discovery.result.supportedVersions,['2026-07-28']);
  assert.equal(discovery.result.serverInfo.title,'七年级学习助手');
  const init = await rpc('initialize',{protocolVersion:'2025-11-25'});
  assert.equal(init.result.protocolVersion,'2025-11-25');
  const {tools} = (await rpc('tools/list')).result;
  assert.deepEqual(tools.map(tool=>tool.name),
    ['query_courses','explain_topic','draw_questions','grade_homework','record_homework_review','get_mistakes','special_practice','get_progress']);
  assert.ok(tools.every(tool=>tool.inputSchema.type==='object' && tool.inputSchema.additionalProperties===false));
  assert.equal((await rpc('tools/call',{name:'__proto__'})).error.code,-32602);
  assert.equal((await rpc('unknown')).error.code,-32601);
});
test('lookup, explanations and random questions are constrained to the selected course',async ()=>{
  const {results} = await good('query_courses',{query:'一元一次方程',term:'上'});
  assert.equal(results[0].scope_id,'course:linear-equations');
  const lesson = await good('explain_topic',{scope_id:results[0].scope_id});
  assert.match(lesson.teaching[0].reasoning,/去括号/);
  assert.match(lesson.url,/#course\/math\/linear-equations$/);
  const practice = await good('draw_questions',{scope_id:results[0].scope_id,term:'上',count:9});
  assert.equal(practice.questions.length,9);
  assert.equal(new Set(practice.questions.map(question=>question.question_id)).size,9);
  assert.ok(practice.questions.every(question=>question.term==='上' && question.subject==='数学' &&
    !Object.hasOwn(question,'correct') && !Object.hasOwn(question,'explanation')));
  assert.ok((await call('draw_questions',{scope_id:results[0].scope_id,term:'下'})).isError);
  const english = await good('query_courses',{subject:'english',query:'Unit 3',term:'上',limit:3});
  assert.equal(english.results[0].scope_id,'course:unit-3');
  const group = (await good('explain_topic',{subject:'english',scope_id:'course:unit-3'})).practice_groups[0];
  const unit = await good('special_practice',{subject:'english',scope_id:'course:unit-3',group_id:group.group_id,count:4});
  assert.ok(unit.questions.every(question=>question.question_id.startsWith('unit-check-3-')));
});
test('chat resolves Chinese course phrases and respects explicit subject and term',async ()=>{
  const algebra = await good('query_courses',{query:'七上 数学 方程'});
  assert.equal(algebra.subject,'数学');
  assert.equal(algebra.term,'上');
  assert.equal(algebra.results[0].scope_id,'course:linear-equations');
  const english = await good('explain_topic',{query:'英语第三单元'});
  assert.equal(english.scope_id,'course:unit-3');
  const algebraDraw = await good('draw_questions',{query:'七上数学一元一次方程',count:2});
  assert.equal(algebraDraw.scope,'一元一次方程');
  assert.ok(algebraDraw.questions.every(question=>question.term==='上' && question.subject==='数学'));
  assert.equal((await good('explain_topic',{scope_id:'course:unit-3'})).scope_id,'course:unit-3');
  const explicit = await call('draw_questions',{subject:'math',query:'英语第三单元'});
  assert.match(explicit.content[0].text,/所选学科/);
  const wrongTerm = await call('draw_questions',{term:'下',query:'七上数学一元一次方程'});
  assert.match(wrongTerm.content[0].text,/所选册次/);
  const ambiguous = await call('draw_questions',{query:'七上数学方程'});
  assert.match(ambiguous.content[0].text,/多个匹配范围/);
});
test('continuing a chat practice only draws unseen questions and reports exhaustion',async ()=>{
  const query = '英语第三单元';
  const lesson = await good('explain_topic',{query});
  const group_id = lesson.practice_groups[0].group_id;
  const first = await good('draw_questions',{query,group_id,count:3});
  assert.equal(first.remaining,1);
  const shown = first.questions.map(question=>question.question_id);
  const second = await good('special_practice',{query,group_id,count:3,exclude_question_ids:shown});
  assert.equal(second.available,1);
  assert.equal(second.questions.length,1);
  assert.ok(!shown.includes(second.questions[0].question_id));
  const exhausted = await good('draw_questions',{query,group_id,count:3,
    exclude_question_ids:shown.concat(second.questions[0].question_id)});
  assert.equal(exhausted.available,0);
  assert.equal(exhausted.remaining,0);
  assert.deepEqual(exhausted.questions,[]);
  assert.equal((await call('draw_questions',{query,exclude_question_ids:'bad'})).isError,true);
});
test('uploaded English worksheets and both book units work through the chat tools',async ()=>{
  const courses = [
    ['英语问候与自我介绍学案','course:classroom-u1-intro',30],
    ['英语1.3 Grammar','course:classroom-u1-grammar',43],
    ['英语 Unit 2 Grammar Integration 默写与翻译','course:classroom-u2-integration',31],
    ['英语柳林风声','course:english-wind-willows',13],
    ['英语快乐王子','course:english-happy-prince',8]
  ];
  for (const [query,scopeId,count] of courses) {
    const result = await good('explain_topic',{query});
    assert.equal(result.scope_id,scopeId);
    assert.equal(result.term,'上');
    assert.equal(result.question_count,count);
    assert.equal(result.practice_groups.reduce((sum,group)=>sum+group.question_count,0),count);
  }
  const grammar = await good('special_practice',{query:'英语1.3 Grammar',group_id:'classroom-u1-grammar-cloze',count:10});
  assert.equal(grammar.questions.length,10);
  assert.equal(new Set(grammar.questions.map(question=>question.material)).size,1);
  assert.ok(grammar.questions.every(question=>!Object.hasOwn(question,'correct')));
  assert.deepEqual(grammar.questions.map(question=>Number(question.prompt.split('.')[0])).sort((a,b)=>a-b),
    [29,30,31,32,33,34,35,36,37,38]);
  const dialogue = await good('draw_questions',{query:'英语1.3 Grammar',group_id:'classroom-u1-grammar-dialogue',count:5});
  assert.ok(dialogue.questions.every(question=>question.options.length===6));
  const hall = await good('draw_questions',{query:'英语柳林风声',group_id:'english-wind-willows-toad-hall',count:5});
  assert.deepEqual(hall.questions.map(question=>question.question_id).sort(),
    [53,54,55,56,57].map(number=>'english-wind-willows-'+number));
  assert.ok(hall.questions.every(question=>question.material.includes('Rat sang a song about ducks') &&
    question.material.includes('Then he looked at Toad') && question.options.length===4));
  const graded = await good('grade_homework',{record:false,submissions:[
    {question_id:'classroom-u1-intro-8',answer:'C'},
    {question_id:'classroom-u1-intro-15',answer:'to listen'},
    {question_id:'classroom-u1-grammar-9',answer:"isn't"},
    {question_id:'classroom-u1-grammar-17',answer:['Is','is difficult']},
    {question_id:'classroom-u1-grammar-26',answer:'D'},
    {question_id:'classroom-u1-grammar-42',answer:'E'},
    {question_id:'classroom-u2-integration-23',answer:'would like to'},
    {question_id:'classroom-u2-integration-31',answer:'I often visit museums in my free time.'},
    ...['C','A','B','D','A'].map((answer,index)=>({question_id:'english-wind-willows-'+(53+index),answer}))
  ]});
  assert.equal(graded.correct,graded.count);
  const unitOne = await good('explain_topic',{query:'英语第一单元'});
  const unitTwo = await good('explain_topic',{query:'英语第二单元'});
  assert.ok(unitOne.practice_groups.some(group=>group.group_id==='classroom-u1-intro-sounds'));
  assert.ok(unitTwo.practice_groups.some(group=>group.group_id==='classroom-u2-integration-sentences'));
  for (const [query,count,passages] of [['英语柳林风声',13,3],['英语快乐王子',8,2]]) {
    const book = await good('explain_topic',{query});
    assert.match(book.sources[0].url,/^https:\/\/www\.gutenberg\.org\//);
    const questions = await good('draw_questions',{query,count});
    assert.equal(questions.questions.length,count);
    assert.equal(new Set(questions.questions.map(question=>question.material)).size,passages);
  }
});
test('upper grade review exposes all four subjects and preserves reading tables and worked answers',async ()=>{
  const summaries = [
    ['地理经纬网与地球运动',11],['历史史前到夏商周',8],
    ['英语语法知识梳理',8],['英语 take 动词短语',25],
    ['数学一元一次方程期末应用题',11]
  ];
  for (const [query,count] of summaries) {
    const lesson = await good('explain_topic',{query});
    assert.equal(lesson.question_count,count);
    assert.ok(lesson.teaching.length);
  }
  const grid = await good('draw_questions',{query:'地理经纬网与地球运动',group_id:'geography-map-review-grid',count:5});
  assert.ok(grid.questions.every(question=>question.table.rows.length===4 && !Object.hasOwn(question,'correct')));
  const take = await good('draw_questions',{query:'英语 take 动词短语',group_id:'english-take-phrases-day-1',count:10});
  assert.equal(take.questions.length,10);
  const grades = await good('grade_homework',{record:false,submissions:[
    {question_id:'geography-map-review-1',answer:'B'},
    {question_id:'english-take-phrases-19',answer:'take a picture'},
    {question_id:'math-equation-final-review-2',answer:'24'},
    {question_id:'math-equation-final-review-3',answer:'15/2'}
  ]});
  assert.equal(grades.correct,4);
  assert.match(JSON.stringify(grades.results[2].solution),/20x\+5x=30/);
});
test('vocabulary and sentence sheets preserve order, marking and the Unit 1–2 links',async ()=>{
  const one = await good('explain_topic',{query:'英语 Unit 1 词汇默写与词性'});
  const two = await good('explain_topic',{query:'英语 Unit 2 词汇默写与词性'});
  const sentences = await good('explain_topic',{query:'英语 10 句默写'});
  assert.equal(one.scope_id,'course:english-u1-vocab-dictation');
  assert.deepEqual(one.practice_groups.map(group=>group.question_count),[10,10,10,10]);
  assert.equal(two.scope_id,'course:english-u2-vocab-dictation');
  assert.deepEqual(two.practice_groups.map(group=>group.question_count),[10,10,10,10,4,10,6]);
  assert.deepEqual(sentences.practice_groups.map(group=>group.question_count),[4,5,1,1]);
  assert.match(JSON.stringify(one.teaching),/ɡriːt/);
  const drawn = await good('special_practice',{scope_id:two.scope_id,group_id:'english-u2-vocab-dictation-words-1',count:10});
  const change = drawn.questions.find(question=>question.question_id==='english-u2-vocab-dictation-word-7');
  assert.deepEqual(change.fields.map(field=>field.label),['及物动词释义','不及物动词释义','名词释义']);
  const attempts = await good('grade_homework',{record:false,submissions:[
    {question_id:'english-u1-vocab-dictation-word-1',answer:['问候','动词']},
    {question_id:'english-u1-vocab-dictation-word-3',answer:['相互','短语']},
    {question_id:'english-u1-vocab-dictation-word-39',answer:['乐趣','adv.']},
    {question_id:'english-u2-vocab-dictation-word-1',answer:['慢跑','一次慢跑']},
    {question_id:change.question_id,answer:['使改变','发生变化','变动']},
    {question_id:'english-u2-vocab-dictation-forms-4',answer:'fixes'},
    {question_id:'english-u12-sentence-dictation-intro-1',answer:"I'm a 13-year-old girl from Class 1, Grade 7."}
  ]});
  assert.equal(attempts.correct,6);
  assert.deepEqual(attempts.results[2].fields.map(field=>field.correct),[true,false]);
  const u1 = await good('explain_topic',{query:'英语第一单元'});
  const u2 = await good('explain_topic',{query:'英语第二单元'});
  assert.ok(u1.practice_groups.some(group=>group.group_id==='english-u12-sentence-dictation-friends'));
  assert.ok(u2.practice_groups.some(group=>group.group_id==='english-u2-vocab-dictation-forms'));
});
test('math photo questions provide worked solutions and grade the exact numerical answers',async ()=>{
  const absolute = await good('draw_questions',{query:'七上数学绝对值与非负性',count:2});
  const variable = await good('draw_questions',{query:'七上数学代数式与字母无关',count:1});
  const original = absolute.questions.find(q=>q.question_id==='math-absolute-nonnegative-1');
  const added = absolute.questions.find(q=>q.question_id==='math-absolute-nonnegative-2');
  assert.match(original?.prompt,/\(a−3\)²\|b\|/);
  assert.match(added?.prompt,/\|a−1\|=−\|b\+5\|/);
  assert.equal(variable.questions[0].question_id,'math-variable-independent-1');
  const graded = await good('grade_homework',{record:false,submissions:[
    {question_id:original.question_id,answer:5},
    {question_id:variable.questions[0].question_id,answer:'−3'},
    {question_id:added.question_id,answer:-5}
  ]});
  assert.equal(graded.correct,3);
  assert.match(JSON.stringify(graded.results[0].solution),/\|b−2\|=0/);
  assert.match(JSON.stringify(graded.results[1].solution),/2y\+6=0/);
});
test('new absolute-value and segment exercises grade every root, endpoint and count',async ()=>{
  const course = await good('explain_topic',{query:'数学零点分段、距离与最小值'});
  assert.equal(course.question_count,10);
  assert.deepEqual(course.practice_groups.map(group=>group.question_count),[2,2,5,1]);
  const drawn = await good('draw_questions',{scope_id:course.scope_id,group_id:'math-absolute-distance-review-minimum',count:5});
  assert.ok(drawn.questions.every(q=>q.number_line?.marks.length>=2));
  const expected = [[-7,13],[-7,3],[-1,19],[12,3],[17,1],[18,-3,4],[7,1],[4,-1,3],18];
  const graded = await good('grade_homework',{record:false,submissions:[
    ...expected.map((answer,i)=>({question_id:'math-absolute-distance-review-'+(i+1),answer})),
    {question_id:'math-bar-model-review-1',answer:[12,16]},
    {question_id:'math-absolute-distance-review-distance-equation',answer:[-4,6]},
    {question_id:'math-absolute-distance-review-6',answer:[18,-3,5]}
  ]});
  assert.equal(graded.correct,11);
  assert.deepEqual(graded.results.at(-1).fields.map(field=>field.correct),[true,true,false]);
  assert.match(JSON.stringify(graded.results[9].solution),/28−22=6/);
});
test('new classroom materials stay in their own upper-term courses and grade worked answers',async ()=>{
  for (const [subject,key,count] of [
    ['math','math-equations-brackets-423',23],
    ['math','math-happy-four',29],
    ['math','math-happy-three',31],
    ['biology','biology-environment-chapter-two',8],
    ['biology','biology-ecosystem-types-review',7],
    ['history','history-warring-states-lesson-six',7],
    ['civics','civics-family-lesson-four',3]
  ]) {
    const scope_id = 'course:'+key;
    const lesson = await good('explain_topic',{subject,scope_id});
    assert.equal(lesson.term,'上');
    assert.equal(lesson.question_count,count);
    const quiz = await good('draw_questions',{subject,scope_id,term:'上',count:2});
    assert.ok(quiz.questions.every(q=>q.term==='上' && q.question_id.startsWith(key+'-')));
  }
  const graded = await good('grade_homework',{record:false,submissions:[
    {question_id:'math-equations-brackets-423-23',answer:'2/3'},
    {question_id:'math-happy-four-24',answer:[0,12,54]},
    {question_id:'math-happy-three-12',answer:[1.5,3.5]},
    {question_id:'history-warring-states-lesson-six-7',answer:['都江堰','成都平原']}
  ]});
  assert.equal(graded.correct,4,JSON.stringify(graded.results));
  assert.equal(graded.recorded,false);
});
test('Unit 3–5 worksheets and Chinese classroom reviews are available on the upper term',async ()=>{
  for (const [subject,key,count] of [
    ['english','classroom-u3-school-writing',6],
    ['english','classroom-u4-welcome-reading',31],
    ['english','classroom-u4-grammar-integration',21],
    ['english','classroom-u5-welcome-reading',36],
    ['english','classroom-u5-health-morning',27],
    ['english','classroom-upper-paraphrase',12],
    ['chinese','chinese-narrative-midterm-review',6],
    ['chinese','chinese-hollow-sandalwood-review',4],
    ['chinese','chinese-weekly-one-review',20]
  ]) {
    const result = await good('explain_topic',{subject,scope_id:'course:'+key});
    assert.equal(result.term,'上');
    assert.equal(result.question_count,count);
  }
  const unit4 = await good('explain_topic',{query:'英语第四单元'});
  const unit5 = await good('explain_topic',{query:'英语第五单元'});
  assert.ok(unit4.practice_groups.some(group=>group.group_id==='classroom-u4-grammar-integration-grammar'));
  assert.ok(unit5.practice_groups.some(group=>group.group_id==='classroom-u5-health-morning-words'));
  const tree = await good('draw_questions',{subject:'chinese',scope_id:'course:chinese-hollow-sandalwood-review',count:4});
  assert.ok(tree.questions.every(q=>q.material?.includes('设计师') && !q.table));
  const graded = await good('grade_homework',{record:false,submissions:[
    {question_id:'classroom-u4-welcome-reading-24',answer:'ɑ:'},
    {question_id:'classroom-u4-grammar-integration-21',answer:['take care of','look after']},
    {question_id:'classroom-u5-welcome-reading-12',answer:['What else','What other food']},
    {question_id:'classroom-upper-paraphrase-11',answer:'on weekends'},
    {question_id:'chinese-weekly-one-review-8',answer:['学而不思则罔','思而不学则殆']}
  ]});
  assert.equal(graded.correct,5,JSON.stringify(graded.results));
});
test('Unit 4 Integration worksheet includes both pages and preserves the original question numbers',async ()=>{
  const key = 'classroom-u4-parents-mary';
  const scope_id = 'course:'+key;
  const course = await good('explain_topic',{subject:'english',scope_id});
  assert.equal(course.term,'上');
  assert.equal(course.question_count,34);
  let number = 1;
  for (const [group,count] of [['vocabulary',5],['translation',3],['choices',6],['cloze',10],['grammar',10]]) {
    const quiz = await good('draw_questions',{subject:'english',scope_id,group_id:key+'-'+group,count});
    const questions = new Map(quiz.questions.map(question=>[question.question_id,question]));
    assert.equal(questions.size,count);
    for (let index=0;index<count;index++,number++) {
      const question = questions.get(key+'-'+number);
      assert.ok(question?.prompt.startsWith(number+'. '));
      if (group==='cloze') {
        assert.ok(question.material.includes('Chinese schools often have parents’ meetings.'));
        assert.ok(question.material.includes('[15]') && question.material.includes('[24]'));
      }
      if (group==='grammar') assert.ok(question.material.includes('Mary gets up at 5:30 a.m.'));
    }
  }
  const answers = [
    [1,'starts',true],[4,'empties',true],[6,['work','in','groups','take','turns'],true],
    [8,['take','care','of'],true],[10,'to run',false],[10,'B',true],
    [15,'C',true],[16,'D',true],[17,'A',true],[18,'C',true],
    [19,'with',true],[21,'good',true],[25,'exercises',true],[27,'to be',true],[27,'is',false],
    [29,'dancing',true],[31,'cleaning',true],[33,'playing',true],[33,'to play',false]
  ];
  const grades = await good('grade_homework',{record:false,submissions:answers.map(([number,answer])=>({
    question_id:key+'-'+number,answer
  }))});
  assert.deepEqual(grades.results.map(result=>result.correct),answers.map(([, , correct])=>correct));
});
test('school worksheet grades questions 21–52 and pairs the green-school passage with all six choices',async ()=>{
  const key = 'classroom-u3-school-dreams';
  const scope_id = 'course:'+key;
  const course = await good('explain_topic',{subject:'english',scope_id});
  assert.equal(course.question_count,32);
  let next = 21;
  for (const [group,count] of [['choice',8],['word-bank',7],['grammar',10],['translation',2],['restoration',5]]) {
    const quiz = await good('draw_questions',{scope_id,group_id:key+'-'+group,count});
    const ids = Array.from({length:count},(_,index)=>key+'-'+(next+index));
    assert.deepEqual(quiz.questions.map(question=>question.question_id).sort(),ids);
    next += count;
    if (group==='restoration') assert.ok(quiz.questions.every(question=>question.options.length===6 &&
      question.material.includes('[48]') && question.material.includes('[52]')));
  }
  const answers = [
    ...['A','A','B','B','D','B','C','C'].map((answer,index)=>[21+index,answer,true]),
    [29,'show you around',true],[36,'has',true],[37,'work',true],[39,'so',true],[39,'but',false],[40,'like',true],
    [44,'chatting',true],[46,['In fact','cares about'],true],[47,['Exciting matches','take place'],true],
    ...['E','F','C','A','D'].map((answer,index)=>[48+index,answer,true])
  ];
  for (const batch of [answers.slice(0,8),answers.slice(8)]) {
    const graded = await good('grade_homework',{record:false,submissions:batch.map(([number,answer])=>({
      question_id:key+'-'+number,answer
    }))});
    assert.deepEqual(graded.results.map(result=>result.correct),batch.map(([, ,correct])=>correct));
  }
});
test('Unit 1 review paper preserves all 32 questions and grades both pages',async ()=>{
  const key = 'classroom-u1-midterm-review-paper';
  const scope_id = 'course:'+key;
  const course = await good('explain_topic',{subject:'english',scope_id});
  assert.equal(course.question_count,32);
  let next = 1;
  for (const [group,count] of [['words',5],['grammar',10],['conversion',4],['translation',3],['choice',5],['reading',5]]) {
    const quiz = await good('draw_questions',{scope_id,group_id:key+'-'+group,count});
    const numbers = quiz.questions.map(question=>Number(question.question_id.split('-').at(-1))).sort((a,b)=>a-b);
    assert.deepEqual(numbers,Array.from({length:count},(_,index)=>next+index));
    if (group==='reading') assert.ok(quiz.questions.every(question=>question.material.includes('he panics') &&
      question.material.includes('they cannot find the way home')));
    next += count;
  }
  const answers = [
    [5,'stays'],[9,'are'],[11,'calls'],[14,'to become'],[15,'but'],[17,['Is your','he is']],
    [18,['Which class','in']],[21,['playing Chinese chess','at the weekend']],
    [22,['in the same grade','help each other']],
    [23,'C'],[24,'C'],[26,'D'],[28,'A'],[29,'A'],[30,'B'],[31,'B'],[32,'C']
  ];
  const graded = await good('grade_homework',{record:false,submissions:answers.map(([number,answer])=>({
    question_id:key+'-'+number,answer
  }))});
  assert.equal(graded.correct,answers.length);
});
test('Unit 4 review paper preserves all 22 original question numbers and grades the corrected forms',async ()=>{
  const key = 'classroom-u4-midterm-review-paper';
  const scope_id = 'course:'+key;
  const course = await good('explain_topic',{subject:'english',scope_id});
  assert.equal(course.question_count,22);
  let next = 1;
  for (const [group,count] of [['word-forms',10],['conversion',3],['completion',3],['choice',6]]) {
    const quiz = await good('draw_questions',{scope_id,group_id:key+'-'+group,count});
    const numbers = quiz.questions.map(question=>Number(question.question_id.split('-').at(-1))).sort((a,b)=>a-b);
    assert.deepEqual(numbers,Array.from({length:count},(_,index)=>next+index));
    next += count;
  }
  const grades = [
    [1,'first',true],[1,'once',false],[10,'term',true],[12,'are in',true],[12,'are on',true],[12,'have a',false],
    [13,'hear from',true],[17,'D',true],[18,'B',true],[19,'C',true],[20,'B',true],[21,'C',true],[22,'B',true]
  ];
  const graded = await good('grade_homework',{record:false,submissions:grades.map(([number,answer])=>({
    question_id:key+'-'+number,answer
  }))});
  assert.deepEqual(graded.results.map(result=>result.correct),grades.map(([, ,correct])=>correct));
});
test('midterm and weekend materials expose the new upper-term courses and targeted marking',async ()=>{
  for (const [subject,key,count] of [
    ['english','classroom-u4-midterm-dictation',48],
    ['chinese','chinese-weekend-two-review',29],
    ['chinese','chinese-integrated-practice-midterm',11],
    ['chinese','chinese-holiday-review',11],
    ['chinese','chinese-autumn-midterm-paper',14]
  ]) {
    const lesson = await good('explain_topic',{subject,scope_id:'course:'+key});
    assert.equal(lesson.term,'上');
    assert.equal(lesson.question_count,count);
  }
  const unit = await good('explain_topic',{query:'英语第四单元'});
  assert.ok(unit.practice_groups.some(group=>group.group_id==='classroom-u4-midterm-dictation-morning'));
  const grade = await good('grade_homework',{record:false,submissions:[
    {question_id:'english-u12-sentence-dictation-would-10',answer:"I'd like to make friends with you."},
    {question_id:'english-u12-sentence-dictation-would-10',answer:'I want to make friends with you.'},
    {question_id:'classroom-u4-midterm-dictation-35',answer:['usually do housework','enjoy myself']},
    {question_id:'chinese-weekend-two-review-2',answer:'zhuo2'},
    {question_id:'chinese-weekend-two-review-23',answer:['茵','茵']}
  ]});
  assert.deepEqual(grade.results.map(result=>result.correct),[true,false,true,true,true]);
});
test('Unit 1 and 3 morning review and Unit 3–4 writing are searchable upper-term material',async ()=>{
  for (const [key,count] of [
    ['classroom-u1-morning-reading',13],
    ['classroom-u3-welcome-reading',35],
    ['classroom-u3-midterm-dictation',60],
    ['classroom-u3-u4-school-life',10]
  ]) {
    const scope_id = 'course:'+key;
    const lesson = await good('explain_topic',{subject:'english',scope_id});
    assert.equal(lesson.term,'上');
    assert.equal(lesson.question_count,count);
    const quiz = await good('draw_questions',{subject:'english',scope_id,count:2});
    assert.ok(quiz.questions.every(question=>question.question_id.startsWith(key+'-')));
  }
  const unitOne = await good('explain_topic',{query:'英语第一单元'});
  const unitThree = await good('explain_topic',{query:'英语第三单元'});
  const unitFour = await good('explain_topic',{query:'英语第四单元'});
  assert.ok(unitOne.practice_groups.some(group=>group.group_id==='classroom-u1-morning-reading-patterns'));
  for (const unit of [unitThree,unitFour]) {
    assert.ok(unit.practice_groups.some(group=>group.group_id==='classroom-u3-u4-school-life-writing'));
  }
  const grade = await good('grade_homework',{record:false,submissions:[
    {question_id:'classroom-u3-welcome-reading-9',answer:['How is your new school?','What is your new school like?']},
    {question_id:'classroom-u3-welcome-reading-34',answer:'ŋ'},
    {question_id:'classroom-u3-midterm-dictation-11',answer:'large'},
    {question_id:'classroom-u3-midterm-dictation-11',answer:'special'},
    {question_id:'classroom-u3-midterm-dictation-34',answer:'like to play ping-pong together'},
    {question_id:'classroom-u3-midterm-dictation-34',answer:'like play ping-pong together'}
  ]});
  assert.deepEqual(grade.results.map(result=>result.correct),[true,true,true,false,true,false]);
});
test('Unit 4 handout uses its own numbering and grades the original phrase groups',async ()=>{
  const scope_id = 'course:english-u4-handout-phrases';
  const lesson = await good('explain_topic',{query:'英语 学案词组 1–60'});
  assert.equal(lesson.scope_id,scope_id);
  assert.equal(lesson.term,'上');
  assert.equal(lesson.question_count,60);
  assert.deepEqual(lesson.practice_groups.map(group=>group.question_count),[14,12,10,3,21]);
  const unit = await good('explain_topic',{query:'英语第四单元'});
  assert.ok(unit.practice_groups.some(group=>group.group_id==='english-u4-handout-phrases-phrases-37'));
  const quiz = await good('draw_questions',{scope_id,group_id:'english-u4-handout-phrases-phrases-37',count:3});
  assert.deepEqual(quiz.questions.map(q=>parseInt(q.prompt,10)).sort((a,b)=>a-b),[37,38,39]);
  const welcome = await good('draw_questions',{scope_id,group_id:'english-u4-handout-phrases-phrases-1',count:14});
  assert.deepEqual(welcome.questions.map(q=>parseInt(q.prompt,10)).sort((a,b)=>a-b),
    Array.from({length:14},(_,index)=>index+1));
  const graded = await good('grade_homework',{record:false,submissions:[
    {question_id:'english-u4-handout-phrases-3',answer:['do morning exercises','do eye exercises']},
    {question_id:'english-u4-handout-phrases-12',answer:['get up at 6:45 a.m.','go for a short jog']},
    {question_id:'english-u4-handout-phrases-20',answer:['on','practice']},
    {question_id:'english-u4-handout-phrases-23',answer:'receive a letter from someone'},
    {question_id:'english-u4-handout-phrases-29',answer:"on Children's Day"},
    {question_id:'english-u4-handout-phrases-30',answer:'at the age of six'},
    {question_id:'english-u4-handout-phrases-40',answer:['in spring','in summer','in fall','in winter']},
    {question_id:'english-u4-handout-phrases-55',answer:['join in an activity','join a club']},
    {question_id:'english-u4-handout-phrases-57',answer:['work in groups','take turns to']},
    {question_id:'english-u4-handout-phrases-60',answer:['take good care of someone','look after someone well']}
  ]});
  assert.equal(graded.correct,10);
});
test('friendly midpoint practice grades formulas, negative midpoints and all three motion times',async ()=>{
  const scope_id = 'course:math-friendly-midpoint';
  const lesson = await good('explain_topic',{query:'七上数学友好邻点'});
  assert.equal(lesson.scope_id,scope_id);
  assert.equal(lesson.question_count,4);
  const motion = await good('draw_questions',{scope_id,group_id:'math-friendly-midpoint-motion',count:1});
  assert.equal(motion.questions[0].fields.length,3);
  const grades = await good('grade_homework',{subject:'math',record:false,submissions:[
    {question_id:'math-friendly-midpoint-1',answer:[3,-3.5]},
    {question_id:'math-friendly-midpoint-1',answer:[3,-4.5]},
    {question_id:'math-friendly-midpoint-2',answer:'（b + a）÷ 2'},
    {question_id:'math-friendly-midpoint-3',answer:'-2 - 2 * pi'},
    {question_id:'math-friendly-midpoint-4',answer:['8/3','14/3','44/9']},
    {question_id:'math-friendly-midpoint-4',answer:['8/3','24/5','44/9']}
  ]});
  assert.deepEqual(grades.results.map(result=>result.correct),[true,false,true,true,true,false]);
});
test('all four new upper-term practice sets are available and grade original questions',async ()=>{
  const sets = [
    ['history','history-qin-han-evidence','统一度量衡','设立西域都护'],
    ['civics','civics-growth-scenarios','找出错因，重做原题后再做一道同类题检查','只把标准答案背下来'],
    ['geography','geo-map-terrain-scenarios','600 米','6 千米'],
    ['biology','bio-ecosystem-pond-scenarios','整个池塘中的生物及其生活环境','池塘中的所有鱼、虾和水草']
  ];
  for (const [subject,key,correct,incorrect] of sets) {
    const scope_id = 'course:'+key;
    const lesson = await good('explain_topic',{subject,scope_id});
    assert.equal(lesson.term,'上');
    assert.equal(lesson.question_count,6);
    const quiz = await good('draw_questions',{scope_id,group_id:key,count:6});
    assert.deepEqual(quiz.questions.map(question=>question.question_id).sort(),[1,2,3,4,5,6].map(number=>key+'-'+number));
    const graded = await good('grade_homework',{subject,record:false,submissions:[correct,incorrect].map(answer=>({
      question_id:key+'-1',answer
    }))});
    assert.deepEqual(graded.results.map(result=>result.correct),[true,false]);
  }
});
test('monomial practice treats pi and the constant power as coefficients',async ()=>{
  const key = 'math-monomial-coefficient-degree';
  const quiz = await good('draw_questions',{scope_id:'course:algebraic-expressions',group_id:key,count:3});
  assert.deepEqual(quiz.questions.map(question=>question.question_id).sort(),[1,2,3].map(number=>key+'-'+number));
  const cases = [[1,[3,3],true],[2,['5 pi^2',7],true],[2,['5π²',9],false],
    [3,['6²⁰²⁶',0],true],[3,['6^(2026)',0],true],[3,[6,2026],false]];
  const graded = await good('grade_homework',{record:false,submissions:cases.map(([number,answer])=>({
    question_id:key+'-'+number,answer
  }))});
  assert.deepEqual(graded.results.map(result=>result.correct),cases.map(([, ,correct])=>correct));
});
test('division-power worksheet keeps its definition and grades exponent notation and equality',async ()=>{
  const scope_id = 'course:math-division-power';
  const course = await good('explain_topic',{query:'七上数学除方'});
  assert.equal(course.scope_id,scope_id);
  assert.equal(course.question_count,4);
  const quiz = await good('draw_questions',{scope_id,count:4});
  assert.ok(quiz.questions.every(question=>question.material.includes('从左到右')));
  const grades = await good('grade_homework',{record:false,submissions:[
    {question_id:'math-division-power-1',answer:[1,-0.75]},
    {question_id:'math-division-power-2',answer:'（1 ÷ a） ^ (n − 2)'},
    {question_id:'math-division-power-2',answer:'(1/a)^(n-1)'},
    {question_id:'math-division-power-3',answer:'＝'},
    {question_id:'math-division-power-4',answer:'−(2^46)'},
    {question_id:'math-division-power-4',answer:'−2⁴⁶'},
    {question_id:'math-division-power-4',answer:-70368744177664},
    {question_id:'math-division-power-4',answer:'(-2)^46'},
    {question_id:'math-division-power-4',answer:-246}
  ]});
  assert.deepEqual(grades.results.map(result=>result.correct),[true,true,false,true,true,true,true,false,false]);
});
test('geography checklist preserves both pages and grades rotation, revolution and seasons',async ()=>{
  const key = 'geo-checklist-3-page-6';
  const scope_id = 'course:'+key;
  const course = await good('explain_topic',{subject:'geography',scope_id});
  assert.equal(course.question_count,16);
  const pageFive = await good('draw_questions',{subject:'geography',scope_id,group_id:key+'-page-5',count:7});
  const pageSix = await good('draw_questions',{subject:'geography',scope_id,group_id:key,count:9});
  assert.equal(pageFive.questions.length,7);
  assert.equal(pageSix.questions.length,9);
  const questions = new Map([...pageFive.questions,...pageSix.questions].map(question=>[question.question_id,question]));
  assert.match(questions.get(key+'-1a').diagram.url,/geography-checklist-rotation\.webp$/);
  assert.match(questions.get(key+'-1b').diagram.url,/geography-checklist-revolution\.webp$/);
  assert.equal(questions.get(key+'-6').table.rows.length,4);
  for (const [id,season] of [['7a','春分'],['7b','夏至'],['7c','秋分'],['7d','冬至']]) {
    const question = questions.get(key+'-'+id);
    assert.deepEqual(question.table.headers,['项目',season]);
    assert.equal(question.fields.length,4);
  }
  assert.match(questions.get(key+'-8').diagram.url,/geography-checklist-solar\.webp$/);
  assert.match(questions.get(key+'-10c').diagram.url,/geography-checklist-zones\.webp$/);
  const answers = [
    ['1a',['地轴','自西向东','逆时针','顺时针','一日','昼夜交替','太阳东升西落','地方时差']],
    ['1b',['太阳','自西向东','一年','四季更替','昼夜长短的变化','五带的形成']],
    ['2',['经度','更早看到日出']],
    ['3',['倾斜方向和角度','春季','夏季','秋季','冬季','相反']],
    ['5','春季'],['6',['3-5月','6、7、8月','9—11月','12月至次年2月','相反']],
    ['7b',['6月22日','北回归线','昼最长夜最短','极昼']],
    ['8',['3月21日','9月23日']],
    ['9',['北回归线','南回归线','北极圈','南极圈']],
    ['10b',['北温带','北温带','南温带','北寒带','南寒带','热带']]
  ];
  const graded = await good('grade_homework',{record:false,submissions:answers.map(([id,answer])=>({
    question_id:key+'-'+id,answer
  }))});
  assert.equal(graded.correct,answers.length);
});
test('map-reading checklist keeps its two pages separately available and grades the original blanks',async ()=>{
  const key = 'geo-checklist-4-page-8';
  const scope_id = 'course:'+key;
  const pageSeven = await good('draw_questions',{subject:'geography',scope_id,group_id:key+'-page-7',count:9});
  const pageEight = await good('draw_questions',{subject:'geography',scope_id,group_id:key,count:4});
  assert.equal(pageSeven.questions.length,9);
  assert.equal(pageEight.questions.length,4);
  const questions = new Map([...pageSeven.questions,...pageEight.questions].map(question=>[question.question_id,question]));
  assert.match(questions.get(key+'-direction').diagram.url,/geography-checklist-compass\.webp$/);
  assert.match(questions.get(key+'-legend-a').diagram.url,/geography-checklist-legend\.webp$/);
  assert.equal(questions.get(key+'-3').fields[0].unit,'km');
  assert.match(questions.get(key+'-6a').diagram.alt,/800千米.*40千米/);
  assert.equal(questions.get(key+'-6a').table.rows.length,2);
  const answers = [
    ['1',['符号','比例','平面'],true],['2',['比例尺','方向','图例'],true],
    ['direction',['上北下南左西右东','正北','南北','东西'],true],
    ['legend-a',['居民点','铁路','山峰','火山'],true],
    ['5a',['图上距离','实地距离'],true],['5b',['图上距离/实地距离'],true],
    ['5b',['实地距离÷图上距离'],false],
    ['3',['1/2'],true],['3',['500'],false],['4',['小','大',2,5],true],
    ['6a',['小','大','简略','大','小','详细'],true],['6b',['大','简略','小','详细'],true]
  ];
  const graded = await good('grade_homework',{record:false,submissions:answers.map(([id,answer])=>({
    question_id:key+'-'+id,answer
  }))});
  assert.deepEqual(graded.results.map(result=>result.correct),answers.map(([, ,correct])=>correct));
});
test('geography exam keeps pages 5 and 6, grades multi-select letters, and supplies the original figure data',async ()=>{
  const key = 'geo-exam-earth-page-6';
  const scope_id = 'course:'+key;
  const pageFive = await good('draw_questions',{subject:'geography',scope_id,group_id:key+'-page-5',count:5});
  const quiz = await good('draw_questions',{subject:'geography',scope_id,group_id:key,count:9});
  assert.equal(pageFive.questions.length,5);
  assert.equal(quiz.questions.length,9);
  assert.match(quiz.questions.find(question=>question.question_id===key+'-37-2').diagram.url,/geography-exam-zones\.webp$/);
  const find = id=>pageFive.questions.find(question=>question.question_id===key+'-'+id);
  assert.equal(find('30').table.rows[0][1],'11 分钟');
  assert.match(find('32').diagram.url,/geography-exam-solar-terms\.webp$/);
  const reading = quiz.questions.filter(question=>question.question_id.startsWith(key+'-36-'));
  assert.equal(reading.length,3);
  assert.ok(reading.every(question=>question.diagram?.url.endsWith('/geography-exam-beidou.webp')));
  const answers = [
    ['28','DC',true],['29','A、D',true],['29','BD',false],['30','A',true],['31','BC',true],['32','BC',true],
    ['33','BA',true],['33','A',false],['34','Ｂ，Ｃ',true],['35','D C',true],['35','AB',false],
    ['36-1','B',true],['36-2','C',true],['36-2','A',false],['36-3','乙地',true],
    ['37-1','B',true],['37-2',['北温带','南寒带'],true],['37-3','南纬23.5°',true]
  ];
  const graded = await good('grade_homework',{record:false,submissions:answers.map(([id,answer])=>({
    question_id:key+'-'+id,answer
  }))});
  assert.deepEqual(graded.results.map(result=>result.correct),answers.map(([, ,correct])=>correct));
});
test('Tiangong exam has its own page group and grades all six parts of question 39',async ()=>{
  const key = 'geo-exam-earth-page-6';
  const scope_id = 'course:'+key;
  const course = await good('explain_topic',{subject:'geography',scope_id});
  assert.equal(course.question_count,53);
  assert.deepEqual(course.practice_groups.map(group=>group.question_count),[5,8,8,6,5,9,6,6]);
  const quiz = await good('draw_questions',{subject:'geography',scope_id,group_id:key+'-page-8',count:6});
  assert.deepEqual(quiz.questions.map(question=>question.question_id).sort(),
    Array.from({length:6},(_,index)=>key+'-39-'+(index+1)));
  assert.ok(quiz.questions.every(question=>question.diagram?.url.endsWith('/geography-exam-tiangong.webp')));
  const answers = ['亚欧',['北美洲','大洋洲'],'D','C','南极洲','北冰洋'];
  const graded = await good('grade_homework',{record:false,submissions:answers.map((answer,index)=>({
    question_id:key+'-39-'+(index+1),answer
  }))});
  assert.equal(graded.correct,6);
});
test('page 7 grades the FAST contour and Great Wall questions with their diagrams',async ()=>{
  const key = 'geo-exam-earth-page-6';
  const quiz = await good('draw_questions',{subject:'geography',scope_id:'course:'+key,group_id:key+'-page-7',count:6});
  const questions = new Map(quiz.questions.map(question=>[question.question_id,question]));
  assert.equal(questions.size,6);
  assert.match(questions.get(key+'-37-5').diagram.url,/geography-exam-wall-legend\.webp$/);
  assert.match(questions.get(key+'-38-4').diagram.url,/geography-exam-fast\.webp$/);
  const answers = [['37-4','B',true],['37-5','C',true],['38-1','D',true],['38-2','B',true],
    ['38-3','A',true],['38-3','B',false],['38-4',['B线','等高线更密'],true]];
  const graded = await good('grade_homework',{record:false,submissions:answers.map(([id,answer])=>({
    question_id:key+'-'+id,answer
  }))});
  assert.deepEqual(graded.results.map(result=>result.correct),answers.map(([, ,correct])=>correct));
});
test('page 4 supplies sea-land charts and latitude diagrams with correct single and double choices',async ()=>{
  const key = 'geo-exam-earth-page-6';
  const quiz = await good('draw_questions',{subject:'geography',scope_id:'course:'+key,group_id:key+'-page-4',count:6});
  const questions = new Map(quiz.questions.map(question=>[question.question_id,question]));
  assert.equal(questions.size,6);
  assert.match(questions.get(key+'-24').diagram.url,/geography-exam-land-sea\.webp$/);
  for (const number of [26,27]) assert.match(questions.get(key+'-'+number).diagram.url,/geography-exam-latitudes\.webp$/);
  const answers = [[22,'B',true],[23,'A',true],[24,'C',true],[25,'D',true],
    [26,'CA',true],[27,'A、C',true],[27,'BD',false]];
  const graded = await good('grade_homework',{record:false,submissions:answers.map(([id,answer])=>({
    question_id:key+'-'+id,answer
  }))});
  assert.deepEqual(graded.results.map(result=>result.correct),answers.map(([, ,correct])=>correct));
});
test('page 3 preserves figures 6 and 7 and grades the height and shared-map questions',async ()=>{
  const key = 'geo-exam-earth-page-6';
  const quiz = await good('draw_questions',{subject:'geography',scope_id:'course:'+key,group_id:key+'-page-3',count:8});
  const questions = new Map(quiz.questions.map(question=>[question.question_id,question]));
  assert.equal(questions.size,8);
  for (const number of [15,16,17]) assert.match(questions.get(key+'-'+number).diagram.url,/geography-exam-meridians\.webp$/);
  for (const number of [18,19]) assert.match(questions.get(key+'-'+number).diagram.url,/geography-exam-elevation\.webp$/);
  assert.match(questions.get(key+'-21').material,/共享实时位置/);
  const graded = await good('grade_homework',{record:false,submissions:['C','D','D','A','C','D','B','A'].map((answer,index)=>({
    question_id:key+'-'+(14+index),answer
  }))});
  assert.equal(graded.correct,8);
});
test('page 2 preserves its planetary, launch-center and rotation figures and marks questions 6–13',async ()=>{
  const key = 'geo-exam-earth-page-6';
  const quiz = await good('draw_questions',{subject:'geography',scope_id:'course:'+key,group_id:key+'-page-2',count:8});
  const questions = new Map(quiz.questions.map(question=>[question.question_id,question]));
  assert.equal(questions.size,8);
  for (const [number,image] of [[7,'solar-system'],[10,'launch-sites'],[11,'launch-sites'],[12,'launch-sites'],[13,'pole-rotation']]) {
    assert.ok(questions.get(key+'-'+number).diagram.url.endsWith('/geography-exam-'+image+'.webp'));
  }
  const graded = await good('grade_homework',{record:false,submissions:['A','B','B','D','B','B','A','C'].map((answer,index)=>({
    question_id:key+'-'+(6+index),answer
  }))});
  assert.equal(graded.correct,8);
});
test('the named geography midterm includes page 1 and grades the five astronomy questions',async ()=>{
  const key = 'geo-exam-earth-page-6';
  const quiz = await good('draw_questions',{query:'七上地理期中综合练习（2）',group_id:key+'-page-1',count:5});
  const questions = new Map(quiz.questions.map(question=>[question.question_id,question]));
  assert.equal(questions.size,5);
  for (const [number,image] of [[1,'earth-moon'],[3,'lunar-suit'],[5,'celestial-systems']]) {
    assert.ok(questions.get(key+'-'+number).diagram.url.endsWith('/geography-exam-'+image+'.webp'));
  }
  const graded = await good('grade_homework',{record:false,submissions:['B','D','A','C','C'].map((answer,index)=>({
    question_id:key+'-'+(1+index),answer
  }))});
  assert.equal(graded.correct,5);
});
test('new English, Analects and civics worksheets expose objective questions and original short-answer tasks',async ()=>{
  const worksheets = [
    ['english','classroom-u4-school-gardening',15,1],
    ['chinese','chinese-analects-worksheet-10',36,8],
    ['civics','civics-midterm-growth-text',1,5]
  ];
  for (const [subject,key,questions,tasks] of worksheets) {
    const scope = await good('explain_topic',{subject,scope_id:'course:'+key});
    assert.equal(scope.question_count,questions);
    assert.equal(scope.short_answer_tasks.length,tasks);
    assert.ok(scope.short_answer_tasks.every(task=>task.prompt && task.points.length));
    if (subject==='civics') assert.equal(scope.short_answer_tasks.find(task=>task.table).table.rows.length,3);
  }
  const reading = await good('draw_questions',{scope_id:'course:classroom-u4-school-gardening',
    group_id:'classroom-u4-school-gardening-reading',count:4});
  assert.ok(reading.questions.every(question=>question.material.includes('Keeping a school garden is not easy')));
  const graded = await good('grade_homework',{record:false,submissions:[
    {question_id:'classroom-u4-school-gardening-27',answer:'on'},
    {question_id:'classroom-u4-school-gardening-31',answer:'because'},
    {question_id:'classroom-u4-school-gardening-35',answer:'It is not easy.'},
    {question_id:'chinese-analects-worksheet-10-3',answer:['知道','生气']},
    {question_id:'chinese-analects-worksheet-10-30',answer:'又'},
    {question_id:'chinese-analects-worksheet-10-38-4',answer:['饭疏食','饮水','曲肱而枕之']},
    {question_id:'civics-midterm-growth-text-31',answer:[4,1,3,2]}
  ]});
  assert.equal(graded.correct,7);
});
test('specialty packs report the same term as their questions and respect the requested term',async ()=>{
  const upper = await good('explain_topic',{scope_id:'pack:equation-modeling'});
  const lower = await good('explain_topic',{subject:'english',scope_id:'pack:english'});
  assert.equal(upper.term,'上');
  assert.equal(lower.term,'下');
  const fromPack = await good('draw_questions',{subject:'english',scope_id:'pack:english',count:6});
  assert.equal(fromPack.term,'下');
  assert.ok(fromPack.questions.every(question=>question.term==='下'));
  const filtered = await good('query_courses',{subject:'english',term:'上',query:'语篇理解'});
  assert.ok(filtered.results.every(scope=>scope.scope_id!=='pack:english'));
});
test('grades objective work and isolates personal mistakes and progress',async ()=>{
  const questionId = 'web-math-calculation-5';
  const owner = 'student-a';
  const other = 'student-b';
  assert.ok((await call('get_progress',{})).isError);
  assert.ok((await call('grade_homework',{batch_id:'wrong',submissions:[{question_id:questionId,answer:'1/3'}]})).isError);
  const args = {batch_id:'wrong',submissions:[{question_id:questionId,answer:'1/3'}]};
  const first = await good('grade_homework',args,owner);
  assert.equal(first.new_records,1);
  assert.equal(first.correct,0);
  assert.equal(first.results[0].reference_answer[0],'1/2');
  assert.equal((await good('grade_homework',args,owner)).new_records,0);
  assert.equal((await good('get_progress',{},other)).attempts,0);
  assert.equal((await good('get_mistakes',{},owner)).results[0].question_id,questionId);
  const retry = await good('special_practice',{scope_id:'course:rational-numbers',mode:'mistakes'},owner);
  assert.deepEqual(retry.questions.map(question=>question.question_id),[questionId]);
  const correct = await good('grade_homework',{batch_id:'correct',submissions:[{question_id:questionId,answer:'0.50'}]},owner);
  assert.equal(correct.correct,1);
  assert.equal((await good('get_mistakes',{},owner)).total,0);
  const progress = await good('get_progress',{scope_id:'course:rational-numbers'},owner);
  assert.equal(progress.attempts,2);
  assert.equal(progress.accuracy,50);
  assert.equal(progress.mastered_questions,1);
});
test('handles choice answers, multiple blanks and external homework',async ()=>{
  const english = await good('grade_homework',{record:false,submissions:[{question_id:'unit-check-3-1',answer:'Ｃ'}]});
  assert.equal(english.correct,1);
  const multi = await good('grade_homework',{record:false,submissions:[{question_id:'web-math-calculation-7',answer:[2,2]}]});
  assert.equal(multi.correct,1);
  const wrong = await good('grade_homework',{record:false,submissions:[{question_id:'web-math-calculation-7',answer:[2,3]}]});
  assert.deepEqual(wrong.results[0].fields.map(item=>item.correct),[true,false]);
  const mixed = await good('grade_homework',{record:false,submissions:[{prompt:'求值',answer:'2/4',reference_answer:0.5}]});
  assert.equal(mixed.correct,1);
  const owner = 'homework-owner';
  const prompt = '说明等式两边同时加三仍然相等的理由。';
  await good('record_homework_review',{batch_id:'reviewed',items:[{prompt,correct:false}]},owner);
  assert.equal((await good('get_mistakes',{},owner)).results[0].prompt,prompt);
  assert.equal((await good('get_mistakes',{},'other-owner')).total,0);
});
test('browser sync requires account identity and same origin, and merges both ways',async ()=>{
  const owner = 'web-user';
  const payload = [{id:'web-math-calculation-5',ok:true,ref:'legacy:2026-11-23:old:1:1',date:'2026-11-23'}];
  const write = (requestOrigin,user = owner)=>request(attemptEndpoint,{owner:user,method:'POST',
    headers:{Origin:requestOrigin,'Content-Type':'application/json'},body:JSON.stringify({attempts:payload})});
  assert.equal((await request(attemptEndpoint,{method:'HEAD'})).status,204);
  assert.equal((await request(attemptEndpoint)).status,401);
  assert.equal((await write('https://example.org')).status,403);
  const first = await (await write(origin)).json();
  assert.deepEqual(first,{added:1,ignored:0});
  assert.deepEqual(await (await write(origin)).json(),{added:0,ignored:0});
  assert.equal((await good('get_progress',{},owner)).correct,1);
  await good('grade_homework',{batch_id:'from-chat',submissions:[{question_id:payload[0].id,answer:'0.2'}]},owner);
  const sync = await (await request(attemptEndpoint,{owner})).json();
  assert.deepEqual(sync.attempts.map(item=>item.ok),[true,false]);
  assert.equal(sync.next,null);
  assert.deepEqual(await (await request(attemptEndpoint,{owner:'different-user'})).json(),{attempts:[],next:null});
  assert.equal((await request(attemptEndpoint+'?after=-1',{owner})).status,400);
});
test('chat retakes saved homework without repeating the prompt or answer key',async ()=>{
  const owner = 'chat-retake-user';
  const prompt = '解方程 3x+5=17。';
  const submission = await good('grade_homework',{term:'下',batch_id:'homework-first',
    submissions:[{prompt,answer:5,reference_answer:4,explanation:'两边减 5，再除以 3。'}]},owner);
  const id = submission.results[0].question_id;
  assert.equal(submission.correct,0);
  const list = await good('special_practice',{term:'下',mode:'mistakes'},owner);
  assert.equal(list.available,1);
  assert.equal(list.questions[0].question_id,id);
  assert.equal(list.questions[0].grading_method,'stored_reference');
  const alreadyShown = await good('special_practice',{term:'下',mode:'mistakes',exclude_question_ids:[id]},owner);
  assert.deepEqual(alreadyShown.questions,[]);
  assert.doesNotMatch(JSON.stringify(list),/reference_answer|两边减/);
  const resubmit = {batch_id:'homework-retake',submissions:[{question_id:id,answer:'8/2'}]};
  assert.ok((await call('grade_homework',resubmit,'another-chat-account')).isError);
  const corrected = await good('grade_homework',resubmit,owner);
  assert.equal(corrected.count,1);
  assert.equal(corrected.correct,1);
  assert.equal(corrected.results[0].explanation,'两边减 5，再除以 3。');
  assert.equal((await good('grade_homework',resubmit,owner)).new_records,0);
  assert.equal((await good('get_mistakes',{term:'下'},owner)).total,0);
  assert.equal((await good('get_progress',{term:'下'},owner)).mastered_questions,1);
  assert.equal((await good('get_progress',{term:'上'},owner)).attempts,0);
  const sync = await (await request(attemptEndpoint,{owner})).json();
  assert.deepEqual(sync.attempts,[]);
});
test('existing homework without a key keeps its original identity when reviewed again',async ()=>{
  const owner = 'legacy-owner';
  const old = await good('get_mistakes',{term:'下'},owner);
  assert.equal(old.results[0].question_id,legacyQuestionId);
  assert.equal(old.results[0].grading_method,'review_or_reference');
  assert.match((await call('grade_homework',{batch_id:'missing',submissions:[{question_id:legacyQuestionId,answer:'测试'}]},owner)).content[0].text,/没有参考答案/);
  const checked = await good('record_homework_review',{batch_id:'redo-old',items:[{question_id:legacyQuestionId,correct:true}]},owner);
  assert.deepEqual(checked.question_ids,[legacyQuestionId]);
  assert.equal((await good('get_mistakes',{term:'下'},owner)).total,0);
});
test('retired subjects are unavailable for practice and their old records still sync',async ()=>{
  const owner = 'old-electives';
  for (const subject of ['pe','music','art','it','labor']) {
    const search = await call('query_courses',{subject});
    assert.equal(search.isError,true);
    assert.match(search.content[0].text,/当前开放的学科/);
    assert.equal((await call('draw_questions',{subject})).isError,true);
  }
  const question_id = 'rhythm-1';
  const oldGrade = await call('grade_homework',{record:false,submissions:[{question_id,answer:'A'}]});
  assert.match(oldGrade.content[0].text,/练习入口已停用/);
  const attempt = {id:question_id,ok:false,ref:'old-music-answer',date:'2026-11-23',time:0};
  const sync = await request(attemptEndpoint,{owner,method:'POST',
    headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify({attempts:[attempt]})});
  assert.deepEqual(await sync.json(),{added:1,ignored:0});
  const backup = await (await request(attemptEndpoint,{owner})).json();
  assert.deepEqual(backup.attempts,[attempt]);
});

test('restored supplemental questions preserve prior IDs and grade the new folding and motion answers',async ()=>{
  const graded = await good('grade_homework',{record:false,submissions:[
    {question_id:'math-happy-three-12',answer:['3/2','7/2']},
    {question_id:'math-happy-three-30',answer:'7/2'},
    {question_id:'math-happy-three-31',answer:'1、1.5、2.5、3'}
  ]});
  assert.equal(graded.correct,3);
});

test('history worksheet supplement keeps lesson groups and grades multi-blank historical answers',async ()=>{
  const key = 'history-upper-cloze-supplement';
  const scope_id = 'course:'+key;
  const lesson = await good('explain_topic',{subject:'history',scope_id});
  assert.equal(lesson.question_count,61);
  assert.equal(lesson.practice_groups.length,20);
  const quiz = await good('draw_questions',{scope_id,group_id:key+'-lesson-14',count:5});
  const question = quiz.questions.find(item=>item.question_id===key+'-36');
  assert.equal(question.fields.length,3);
  const grade = await good('grade_homework',{record:false,submissions:[
    {question_id:question.question_id,answer:['阳关、玉门关','大月氏','１３８']},
    {question_id:question.question_id,answer:['玉门关和阳关','匈奴','138']},
    {question_id:key+'-source-1',answer:'100万年'},
    {question_id:key+'-source-3',answer:['私有制','阶级','国家的产生']},
    {question_id:key+'-59',answer:['云冈','龙门石窟','陶潜']}
  ]});
  assert.deepEqual(grade.results.map(result=>result.correct),[true,false,true,true,true]);
});

test('teaching images reach question cards and keep the history timeline in feedback',async ()=>{
  const geography = await good('draw_questions',{subject:'geography',scope_id:'course:geo-map-terrain-scenarios',count:6});
  assert.equal(geography.questions.filter(question=>question.diagram).length,5);

  const biology = await good('draw_questions',{subject:'biology',scope_id:'course:biology-chapter-one-review',
    group_id:'biology-chapter-one-review-microscope',count:6});
  const onionId = 'biology-chapter-one-review-onion-image';
  const onion = biology.questions.find(question=>question.question_id===onionId);
  assert.match(onion.diagram.alt,/长条状/);
  assert.match(onion.diagram.credit,/CC0/);

  const history = await good('draw_questions',{subject:'history',scope_id:'course:history-qin-han-evidence',count:6});
  const timelineId = 'history-qin-han-evidence-6';
  const timeline = history.questions.find(question=>question.question_id===timelineId);
  assert.equal(timeline.answer_diagram,undefined);
  assert.equal(timeline.diagram,undefined);

  const grade = await good('grade_homework',{record:false,submissions:[
    {question_id:onionId,answer:'C'},
    {question_id:timelineId,answer:'A'}
  ]});
  assert.equal(grade.correct,2);
  const timelineImage = grade.results[1].answer_diagram;
  assert.match(timelineImage.alt,/公元前221年.*公元前202年.*公元前138年/);
  for (const {url} of [onion.diagram,timelineImage,...geography.questions.flatMap(question=>question.diagram ?? [])]) {
    const response = await request(new URL(url).pathname);
    assert.equal(response.status,200);
    assert.equal(response.headers.get('content-type'),'image/webp');
  }
});

test('geography review reuses existing pictured questions and grades the new applications',async ()=>{
  const sets = [
    ['geo-review-weather',5,{'geo-124-weather-day':'C','geo-124-weather-isotherms':'A'}],
    ['geo-review-climate',4,{'geo-month1-climate-wet-wind':'C','geo-124-climate-monsoon-woods':'D'}],
    ['geo-review-plates',3,{'geo-month1-plates-types':'A'}]
  ];
  for (const [scope,count,answers] of sets) {
    const quiz = await good('draw_questions',{subject:'geography',scope_id:'course:'+scope,count});
    assert.equal(quiz.questions.length,count);
    for (const [id,answer] of Object.entries(answers)) {
      const question = quiz.questions.find(item=>item.question_id===id);
      assert.ok(question,id);
      if (id!=='geo-124-climate-monsoon-woods') {
        assert.match(question.diagram.alt,/\S/);
        const asset = await request(new URL(question.diagram.url).pathname);
        assert.equal(asset.status,200);
        assert.equal(asset.headers.get('content-type'),'image/webp');
      }
      const grade = await good('grade_homework',{record:false,submissions:[{question_id:id,answer}]});
      assert.equal(grade.correct,1,id);
    }
  }
});

test('later geography lessons draw, display illustrations and grade through their course scopes',async ()=>{
  const sets = [
    ['geo-review-religions',2,[['geo-124-religion-origin','C']]],
    ['geo-review-settlements',4,[['geo-124-settlement-pattern','D',true],['geo-124-settlement-houses','A',true]]],
    ['geo-review-development',3,[['geo-124-development-dialogue','B'],['geo-124-development-value','D']]]
  ];
  for (const [scope,count,samples] of sets) {
    const quiz = await good('draw_questions',{subject:'geography',scope_id:'course:'+scope,count});
    assert.equal(quiz.questions.length,count,scope);
    for (const [question_id,answer,pictured] of samples) {
      const question = quiz.questions.find(item=>item.question_id===question_id);
      assert.ok(question,question_id);
      if (pictured) {
        const asset = await request(new URL(question.diagram.url).pathname);
        assert.equal(asset.status,200);
        assert.equal(asset.headers.get('content-type'),'image/webp');
      }
      const grade = await good('grade_homework',{record:false,submissions:[{question_id,answer}]});
      assert.equal(grade.correct,1,question_id);
    }
  }
});

test('biology summary lessons draw and grade pictured and classification items',async ()=>{
  const groups = [
    ['bio-review-cells',6,[['cell-model','A',true],['cell-division','B',true],['cell-division-data','D']]],
    ['bio-review-plant-groups',4,[['plant-storage','C',true]]],
    ['bio-review-animal-groups',5,[['animal-shapes','C',true],['animal-birds','D']]],
    ['bio-review-classifying',4,[['class-cells','B'],['class-names','D']]]
  ];
  for (const [key,count,samples] of groups) {
    const quiz = await good('draw_questions',{subject:'biology',scope_id:'course:'+key,count});
    assert.equal(quiz.questions.length,count,key);
    for (const [suffix,answer,pictured] of samples) {
      const question_id = 'bio-summary-'+suffix;
      const question = quiz.questions.find(item=>item.question_id===question_id);
      assert.ok(question,question_id);
      if (pictured) {
        assert.match(question.diagram.alt,/\S/);
        const asset = await request(new URL(question.diagram.url).pathname);
        assert.equal(asset.status,200);
        assert.equal(asset.headers.get('content-type'),'image/webp');
      }
      const grade = await good('grade_homework',{record:false,submissions:[{question_id,answer}]});
      assert.equal(grade.correct,1,question_id);
    }
  }
});

test('favorites sync carries legacy saves and removals across devices without replaying old events',async ()=>{
  const owner = 'tablet-favorites';
  const endpoint = '/api/study-favorites';
  const id = 'geo-124-weather-day';
  const other = 'bio-summary-cell-model';
  const add = {id,selected:true,ref:'a'.repeat(32)};
  const remove = {id,selected:false,ref:'b'.repeat(32)};
  const post = (legacy,changes,from=origin)=>request(endpoint,{owner,method:'POST',
    headers:{Origin:from,'Content-Type':'application/json'},body:JSON.stringify({legacy,changes})});
  const read = async account=>(await (await request(endpoint,{owner:account})).json()).favorites;
  assert.equal((await request(endpoint)).status,401);
  assert.equal((await post([id],[],'https://example.com')).status,403);
  assert.equal((await post([], [{...add,selected:1}])).status,400);
  assert.deepEqual(await read(owner),[]);
  assert.equal((await post([id,other],[])).status,200);
  assert.deepEqual(await read(owner),[id,other]);
  assert.deepEqual(await read('other-favorites'),[]);
  assert.equal((await post([], [add])).status,200);
  assert.equal((await post([], [remove])).status,200);
  assert.equal((await post([id], [add,remove])).status,200);
  assert.deepEqual(await read(owner),[other]);
  assert.equal((await post([], [{...add,ref:'c'.repeat(32)}])).status,200);
  assert.deepEqual(await read(owner),[other,id]);
});

test('grading includes answer guidance for recall items that previously had no explanation',async ()=>{
  const grade = await good('grade_homework',{record:false,submissions:[
    {question_id:'classroom-u4-welcome-reading-1',answer:['have breakfast','have lunch','have dinner']},
    {question_id:'chinese-weekend-two-review-1',answer:'huo'}
  ]});
  assert.equal(grade.correct,2);
  assert.match(grade.results[0].explanation,/have \+ 餐名/);
  assert.match(grade.results[1].explanation,/暖和.*轻声/);
});

test('visual explanations are available only in feedback and ship their images',async ()=>{
  const id = 'bio-summary-cell-division';
  const practice = await good('draw_questions',{subject:'biology',scope_id:'course:bio-review-cells',count:6});
  const question = practice.questions.find(item=>item.question_id===id);
  assert.match(question.diagram.url,/bio-summary-cell-division\.webp$/);
  assert.equal(question.answer_diagram,undefined);
  assert.doesNotMatch(JSON.stringify(question),/answer-division-/);
  const grade = await good('grade_homework',{record:false,submissions:[
    {question_id:id,answer:'B'},
    {question_id:'geo-124-weather-day',answer:'C'},
    {question_id:'equation-app-parameters-6',answer:'C'}
  ]});
  assert.equal(grade.correct,3);
  assert.match(grade.results[0].answer_diagram.url,/answer-division-3\.webp$/);
  for (const {answer_diagram:{url}} of grade.results) {
    const response = await request(new URL(url).pathname);
    assert.equal(response.status,200);
    assert.equal(response.headers.get('content-type'),'image/webp');
  }
});

test('history chronology course grades four units and reserves explanatory timelines for feedback',async ()=>{
  const scope_id = 'course:history-chronology';
  const quiz = await good('draw_questions',{subject:'history',scope_id,count:4});
  assert.equal(quiz.questions.length,4);
  assert.doesNotMatch(JSON.stringify(quiz),/answer-history-/);
  const grade = await good('grade_homework',{record:false,submissions:[
    {question_id:'history-chronology-evidence',answer:'A'},
    {question_id:'history-chronology-zhou',answer:'B'},
    {question_id:'history-chronology-regions',answer:'C'},
    {question_id:'history-chronology-parallel',answer:'D'}
  ]});
  assert.equal(grade.correct,4);
  assert.match(grade.results[3].answer_diagram.alt,/420年.*589年/);
  for (const {answer_diagram:{url}} of grade.results) {
    const response = await request(new URL(url).pathname);
    assert.equal(response.status,200);
    assert.equal(response.headers.get('content-type'),'image/webp');
  }
});
