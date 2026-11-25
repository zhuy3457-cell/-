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
    ['英语Grammar Integration 默写','course:classroom-u2-integration',31],
    ['英语柳林风声','course:english-wind-willows',8],
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
  const graded = await good('grade_homework',{record:false,submissions:[
    {question_id:'classroom-u1-intro-8',answer:'C'},
    {question_id:'classroom-u1-intro-15',answer:'to listen'},
    {question_id:'classroom-u1-grammar-9',answer:"isn't"},
    {question_id:'classroom-u1-grammar-17',answer:['Is','is difficult']},
    {question_id:'classroom-u1-grammar-26',answer:'D'},
    {question_id:'classroom-u1-grammar-42',answer:'E'},
    {question_id:'classroom-u2-integration-23',answer:'would like to'},
    {question_id:'classroom-u2-integration-31',answer:'I often visit museums in my free time.'}
  ]});
  assert.equal(graded.correct,graded.count);
  const unitOne = await good('explain_topic',{query:'英语第一单元'});
  const unitTwo = await good('explain_topic',{query:'英语第二单元'});
  assert.ok(unitOne.practice_groups.some(group=>group.group_id==='classroom-u1-intro-sounds'));
  assert.ok(unitTwo.practice_groups.some(group=>group.group_id==='classroom-u2-integration-sentences'));
  for (const query of ['英语柳林风声','英语快乐王子']) {
    const book = await good('explain_topic',{query});
    assert.match(book.sources[0].url,/^https:\/\/www\.gutenberg\.org\//);
    const questions = await good('draw_questions',{query,count:8});
    assert.equal(questions.questions.length,8);
    assert.equal(new Set(questions.questions.map(question=>question.material)).size,2);
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
  assert.deepEqual(sentences.practice_groups.map(group=>group.question_count),[4,5,1]);
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
test('both math photo questions provide worked solutions and grade the exact numerical answers',async ()=>{
  const absolute = await good('draw_questions',{query:'七上数学绝对值与非负性',count:1});
  const variable = await good('draw_questions',{query:'七上数学代数式与字母无关',count:1});
  assert.equal(absolute.questions[0].question_id,'math-absolute-nonnegative-1');
  assert.match(absolute.questions[0].prompt,/\(a−3\)²\|b\|/);
  assert.equal(variable.questions[0].question_id,'math-variable-independent-1');
  const graded = await good('grade_homework',{record:false,submissions:[
    {question_id:absolute.questions[0].question_id,answer:5},
    {question_id:variable.questions[0].question_id,answer:'−3'}
  ]});
  assert.equal(graded.correct,2);
  assert.match(JSON.stringify(graded.results[0].solution),/\|b−2\|=0/);
  assert.match(JSON.stringify(graded.results[1].solution),/2y\+6=0/);
});
test('new absolute-value and segment exercises grade every root, endpoint and count',async ()=>{
  const course = await good('explain_topic',{query:'数学零点分段、距离与最小值'});
  assert.equal(course.question_count,9);
  assert.deepEqual(course.practice_groups.map(group=>group.question_count),[2,1,5,1]);
  const drawn = await good('draw_questions',{scope_id:course.scope_id,group_id:'math-absolute-distance-review-minimum',count:5});
  assert.ok(drawn.questions.every(q=>q.number_line?.marks.length>=2));
  const expected = [[-7,13],[-7,3],[-1,19],[12,3],[17,1],[18,-3,4],[7,1],[4,-1,3],18];
  const graded = await good('grade_homework',{record:false,submissions:[
    ...expected.map((answer,i)=>({question_id:'math-absolute-distance-review-'+(i+1),answer})),
    {question_id:'math-bar-model-review-1',answer:[12,16]},
    {question_id:'math-absolute-distance-review-6',answer:[18,-3,5]}
  ]});
  assert.equal(graded.correct,10);
  assert.deepEqual(graded.results.at(-1).fields.map(field=>field.correct),[true,true,false]);
  assert.match(JSON.stringify(graded.results[9].solution),/28−22=6/);
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
