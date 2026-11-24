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
