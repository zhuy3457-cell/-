import assert from 'node:assert/strict';
import {webcrypto} from 'node:crypto';
import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';

const web = fileURLToPath(new URL('../dist/',import.meta.url));
const html = process.argv[2] ? await readFile(process.argv[2],'utf8') : await readFile(join(web,'index.html'),'utf8');
const sources = process.argv[2]
  ? [...html.matchAll(/<script>\n([\s\S]*?)<\/script>/g)].map(([,script])=>script)
  : await Promise.all([...html.matchAll(/<script defer src="([^"]+\.js)"><\/script>/g)].map(([,file])=>readFile(join(web,file),'utf8')));
assert.ok(sources.length);
if (process.argv[2]) assert.doesNotMatch(html,/<script\s[^>]*src=|<link rel="stylesheet"/);

function browser(fetch) {
  const saved = new Map();
  const handlers = new Map();
  const node = {innerHTML:'',addEventListener(){}};
  const app = {innerHTML:'',querySelector:()=>null,addEventListener:(type,handler)=>handlers.set(type,handler)};
  const context = vm.createContext({
    document:{querySelectorAll:()=>[],querySelector:selector=>selector==='#app'?app:node,getElementById:()=>null},
    window:{addEventListener(){}},location:{hash:'#home',protocol:fetch?'https:':'file:'},
    crypto:webcrypto,fetch,
    localStorage:{getItem:key=>saved.get(key)??null,setItem:(key,value)=>saved.set(key,value),removeItem:key=>saved.delete(key)}
  });
  for (const source of sources) vm.runInContext(source,context);
  return {context, run:code=>vm.runInContext(code,context), saved, handlers};
}

const source = browser();
const payload = source.run(`
  const [a,b] = allQuestions.filter(question=>isActiveQuestion(question.id)).map(question=>question.id);
  state.attempts = [
    {id:a,ref:'restore-a',ok:false,date:'2026-11-21',time:1},
    {id:b,ref:'restore-b',ok:false,date:'2026-11-21',time:2},
    {id:b,ref:'restore-c',ok:true,date:'2026-11-22',time:3}
  ];
  state.favorites = [a,b];
  JSON.stringify(backupPayload());
`);
const target = browser();
target.context.backup = JSON.parse(payload);
assert.match(target.run('mergeBackup(backup)'),/已合并 3 条答题记录、2 道收藏题/);
assert.match(target.run('mergeBackup(backup)'),/已合并 0 条答题记录、0 道收藏题/);
const restored = JSON.parse(target.saved.get('suxue-study-v1'));
assert.equal(restored.attempts.length,3);
assert.deepEqual(restored.favorites,JSON.parse(payload).favorites);
assert.deepEqual(restored.mistakes,{[restored.favorites[0]]:{count:1,time:1}});
assert.throws(()=>target.run('mergeBackup({})'),/无法识别备份格式/);
assert.equal(target.run('state.attempts.length'),3);
console.log('浏览器备份验证通过：答题记录、收藏、错题重建、重复导入与无效文件保护。');

assert.match(target.run('historyList("",1)'),/答题明细.*#record\/restore-c\/all\/1/s);
assert.match(target.run('recordPage("restore-a","all",1)'),/本次答错.*正确答案.*再练这题/s);
assert.match(target.run('recordPage("restore-c","all",1)'),/本次答对/);
assert.match(target.run('recordPage("%","all",1)'),/找不到这条答题记录/);
assert.match(target.run('state.attempts = Array.from({length:21},(_,i)=>({id:state.favorites[0],'+
  'ref:"page-"+i,ok:true,date:"2026-11-25",time:i})); historyList("",2)'),/page-0\/all\/2.*上一页/s);

const attempts = new Map();
const bookmarks = new Map();
const events = new Set();
let duringFetch = null;
const fetchStudy = async (path, options)=>{
  if (path==='/api/study-sync') {
    if (!options) return Response.json({attempts:[...attempts.values()],next:null});
    let added = 0;
    for (const item of JSON.parse(options.body).attempts) {
      if (attempts.has(item.ref)) continue;
      attempts.set(item.ref,item);
      added++;
    }
    return Response.json({added});
  }
  assert.equal(path,'/api/study-favorites');
  if (!options) {
    duringFetch?.();
    return Response.json({favorites:[...bookmarks].filter(([,selected])=>selected).map(([id])=>id)});
  }
  const {legacy,changes} = JSON.parse(options.body);
  for (const id of legacy) if (!bookmarks.has(id)) bookmarks.set(id,true);
  for (const {id,selected,ref} of changes) if (!events.has(ref)) {
    events.add(ref);
    bookmarks.set(id,selected);
  }
  return Response.json({saved:true});
};

const tablet = browser(fetchStudy);
const second = browser(fetchStudy);
tablet.context.seed = JSON.parse(payload);
tablet.run('state.attempts=seed.attempts; state.favorites=seed.favorites;');
await tablet.run('syncStudyRecords()');
await second.run('syncStudyRecords()');
assert.deepEqual(JSON.parse(second.run('JSON.stringify(state.favorites)')),tablet.context.seed.favorites);
assert.equal(second.run('state.attempts.length'),3);
assert.match(second.run('recordPage("restore-a","all",1)'),/本次答错.*解题思路/s);

tablet.run('const removed=state.favorites.shift(); queueFavoriteChange(removed,false)');
await tablet.run('syncStudyRecords()');
await second.run('syncStudyRecords()');
assert.deepEqual(JSON.parse(second.run('JSON.stringify(state.favorites)')),tablet.context.seed.favorites.slice(1));

duringFetch = ()=>second.run('state.favorites.push(state.attempts[0].id);queueFavoriteChange(state.attempts[0].id,true)');
await second.run('syncStudyRecords()');
duringFetch = null;
assert.equal(second.run('state.favorites.length'),2);
assert.equal(second.run('Object.keys(state.favoriteChanges).length'),1);
await second.run('syncStudyRecords()');
await tablet.run('syncStudyRecords()');
assert.equal(tablet.run('state.favorites.length'),2);
assert.equal(second.run('Object.keys(state.favoriteChanges).length'),0);
console.log('两台模拟设备同步旧收藏、取消与重试通过，答题明细可打开历史题目。');

const practice = browser();
assert.equal(practice.run("allQuestions.filter(q=>isActiveQuestion(q.id) && !answerExplanation(q)).length"),0);
practice.run("const worked = allQuestions.find(q=>q.subject==='math' && q.solution?.length);"+
  "state.session={key:'test',ids:[worked.id],label:'测试',back:'#home',index:0,answers:[],selected:''};");
assert.doesNotMatch(practice.run('quizPage()'),/class="worked-solution"/);
practice.run("state.session.answers[0]={id:worked.id,ok:true,raw:'合成答案',fields:[]};");
assert.match(practice.run('quizPage()'),/正确(?:答案|结果).*<section class="worked-solution"><h2>解题思路与步骤<\/h2>.*<ol>/s);
practice.run('state.session.index=1;');
assert.match(practice.run('quizPage()'),/本组答题回顾.*解题思路与步骤/s);
for (const id of ['classroom-u4-welcome-reading-1','chinese-weekend-two-review-1','geo-124-weather-day']) {
  const html = practice.run('answerExplanation(questionById.get('+JSON.stringify(id)+'))');
  assert.match(html,/<h2>解题思路<\/h2><p class="solution-overview">.+<\/p>/s);
  assert.doesNotMatch(html,/<details/);
}
assert.match(practice.run('answerExplanation(questionById.get("history-qin-han-evidence-6"))'),/沿箭头读年代/);
console.log('全科答后思路覆盖，数学步骤、知识题解释、默写提示和讲评配图已验证。');

const animated = practice.run('questionById.get("bio-summary-cell-division")');
assert.equal(animated.answerFrames.length,3);
assert.match(practice.run('answerExplanation(questionById.get("bio-summary-cell-division"))'),/播放动画.*下一步/);
assert.match(practice.run('answerExplanation(questionById.get("geo-124-weather-day"))'),/气温|观测值/);
if (process.argv[2]) {
  for (const frame of animated.answerFrames) assert.match(frame.src,/^data:image\/webp;base64,/);
}
console.log('答后图片和三步动画已验证。');

const repair = browser();
repair.run("const targetMap=questionById.get('geo-daily-arrow-orientation');"+
  "state.attempts=[{id:targetMap.id,ref:'saved-map-attempt',ok:false,date:'2026-11-25',time:1}];"+
  "state.session={key:'test',ids:[targetMap.id],label:'测试',back:'#home',index:0,answers:[],selected:''};");
const renderedMap = /<details class="reading-material" open[^>]*>.*<img [^>]*alt="指北箭头朝图面右方/s;
assert.match(repair.run('quizPage()'),renderedMap);
assert.match(repair.run('recordPage("saved-map-attempt","all",1)'),renderedMap);
assert.match(repair.run("readingMaterial(questionById.get('math-midterm-4-6'),true)"),/role="img".*数轴|<figure class="number-line"/);
assert.match(repair.run("readingMaterial(questionById.get('hard-bio-seed-rate-controls'),true)"),/<table><caption>萝卜种子的四组观察记录/);
if (process.argv[2]) assert.match(repair.run('quizPage()'),/src="data:image\/webp;base64,/);
console.log('校园地图在作答前和旧记录中均展开，结构化数轴和观察表正常。');

const worksheet = browser();
assert.match(worksheet.run("englishClassroomPage('unit-5',new Set(),null)"),
  /Grammar · 7 题.*Integration 1 · 12 题.*Integration 2 · 5 题.*练整卷/s);
worksheet.run("start('topic/classroom-u5-grammar-integration')");
assert.equal(worksheet.run('state.session.ids.length'),24);
assert.match(worksheet.run('quizPage()'),/Grammar 第 1 题.*<h1>一块奶酪<\/h1>/s);
assert.match(worksheet.run("englishClassroomPage('unit-5',new Set(),questionById.get(state.session.ids[0]))"),
  /Grammar–Integration 默写卷.*继续练习/s);
worksheet.run("state.session.index=6; location.hash='#home'");
assert.match(worksheet.run('quizPage()'),/① we should get ② our class party/);
worksheet.run("start('review-section/classroom-u5-grammar-integration/integration-2')");
assert.equal(worksheet.run('state.session.ids.length'),5);
assert.match(worksheet.run('quizPage()'),/Integration 2 第 1 题.*<h1>馅饼（名词）<\/h1>/s);
worksheet.run("start('search-question/geo-daily-grid-increasing-degrees')");
assert.match(worksheet.run('quizPage()'),/<img [^>]+alt="北向箭头朝上.*查看图中数据.*40°、30°、20°/s);
assert.doesNotMatch(worksheet.run('quizPage()'),/解题思路/);
console.log('Unit 5 原卷分组、题号与填空顺序，以及经纬网图的文字读图数据已验证。');

const recitation = browser();
const courseKey = 'civics-midterm-recitation';
const draftKey = 'suxue-short-answer-'+courseKey+'-priorities';
const renderDrafts = () => recitation.run("shortAnswerSection(courseByKey.get('"+courseKey+"').shortAnswers,'"+courseKey+"')");
assert.equal([...renderDrafts().matchAll(/data-short-answer-draft=/g)].length,4);
assert.match(recitation.run("courseDetail(courseByKey.get('"+courseKey+"'),activeSubjectById.get('civics'))"),/data-short-answer-jump/);
const draftField = {id:draftKey,dataset:{shortAnswerDraft:draftKey},value:'先完成报告\n</textarea>再练演讲'};
recitation.handlers.get('input')({target:draftField});
assert.equal(recitation.saved.get(draftKey),draftField.value);
assert.match(renderDrafts(),/先完成报告\n&lt;\/textarea&gt;再练演讲/);
assert.doesNotMatch(recitation.run('JSON.stringify(backupPayload())'),/先完成报告/);
assert.match(recitation.run('studyBackup()'),/<input type="checkbox" id="backupDrafts"> 包含简答草稿/);
const draftBackup = JSON.parse(recitation.run('JSON.stringify(backupPayload(true))'));
assert.deepEqual(draftBackup.shortAnswerDrafts,[{key:draftKey,text:draftField.value}]);
const destination = browser();
destination.context.backup = draftBackup;
assert.match(destination.run('mergeBackup(backup)'),/已恢复 1 份简答草稿/);
assert.equal(destination.saved.get(draftKey),draftField.value);
assert.match(destination.run('mergeBackup(backup)'),/已恢复 0 份简答草稿/);
destination.saved.set(draftKey,'本机新作答');
assert.match(destination.run('mergeBackup(backup)'),/已保留本机版本/);
assert.equal(destination.saved.get(draftKey),'本机新作答');
destination.context.invalidBackup = {...draftBackup,shortAnswerDrafts:[{key:draftKey,text:'字'.repeat(4001)}]};
assert.throws(()=>destination.run('mergeBackup(invalidBackup)'),/记录有误/);
destination.context.unknownBackup = {...draftBackup,shortAnswerDrafts:[{key:'suxue-study-v1',text:'unexpected'}]};
assert.match(destination.run('mergeBackup(unknownBackup)'),/找不到的 1 条记录已跳过/);
assert.doesNotMatch(destination.saved.get('suxue-study-v1'),/unexpected/);
const filteredStats = browser();
filteredStats.run('location.hash="#stats/civics/1"');
await filteredStats.handlers.get('change')({
  target:{id:'studyBackupInput',files:[{text:async()=>JSON.stringify(draftBackup)}]}
});
assert.match(filteredStats.run('app.innerHTML'),/已恢复 1 份简答草稿/);
draftField.value = '';
recitation.handlers.get('input')({target:draftField});
assert.equal(recitation.saved.has(draftKey),false);
assert.doesNotMatch(renderDrafts(),/先完成报告/);
console.log('道法简答草稿可保存、清空、选入备份和恢复。重复导入保留本机草稿，分科记录页显示结果。');

const morning = browser();
const morningKey = 'classroom-u5-health-morning';
assert.match(morning.run("englishClassroomPage('unit-5',new Set(),null)"),/明早默写 · 8 题/);
morning.run("start('course/"+morningKey+"/"+morningKey+"-morning-dictation')");
assert.equal(morning.run('state.session.ids.length'),8);
assert.match(morning.run('quizPage()'),/明早默写 第 1 题.*<h1>他不爱吃甜食/s);
morning.run('state.session.index=7');
assert.match(morning.run('quizPage()'),/明早默写 第 8 题.*\[six\]/s);
assert.doesNotMatch(morning.run('quizPage()'),/完整参考句/);
morning.run("state.session.answers[7]={ok:true,fields:['How many bottles'],raw:'How many bottles'}");
assert.match(morning.run('quizPage()'),/完整参考句.*How many bottles of juice does Amy buy\?/s);
console.log('Unit 5 明早默写按原题顺序呈现，完整参考句在答后显示。');

const daily = browser();
daily.run(`
  const practiceDate = '2026-11-28';
  const priorDate = '2026-11-27';
  const termIds = term => activeSubjects.flatMap(subject=>topicsIn(subject,term)
    .flatMap(topic=>topic.questions.map(question=>question.id)));
  const subjectOf = id => questionById.get(id).subject;
  const [wrong, recovered, anotherWrong] = activeSubjects
    .map(subject=>topicsIn(subject,'上').flatMap(topic=>topic.questions)[0]?.id).filter(Boolean);
  state.attempts = [
    {id:wrong,ok:false,date:priorDate,time:1},
    {id:recovered,ok:true,date:priorDate,time:2},
    {id:recovered,ok:false,date:priorDate,time:1},
    {id:anotherWrong,ok:false,date:priorDate,time:1}
  ];
  const scheduled = dailyQuestions('上',practiceDate);
`);
assert.equal(daily.run('scheduled.length'),5);
assert.equal(daily.run('new Set(scheduled.map(subjectOf)).size'),5);
assert.equal(daily.run('scheduled.slice(0,2).includes(wrong) && scheduled.slice(0,2).includes(anotherWrong)'),true);
assert.equal(daily.run('scheduled.includes(recovered)'),false);
daily.run('state.attempts.push({id:wrong,ok:true,date:practiceDate,time:3});');
assert.equal(daily.run('JSON.stringify(dailyQuestions("上",practiceDate))===JSON.stringify(scheduled)'),true);
assert.equal(daily.run('dailyQuestions("下",practiceDate).every(id=>termIds("下").includes(id))'),true);
daily.run('state.attempts=termIds("下").map(id=>({id,ok:true,date:priorDate}));');
assert.equal(daily.run('new Set(dailyQuestions("下",practiceDate)).size'),5);
daily.run('start("daily"); state.session.index=1; start("daily");');
assert.equal(daily.run('state.session.index'),1);
daily.run('state.term="下"; start("daily");');
assert.equal(daily.run('state.session.index'),0);
assert.equal(daily.run('state.session.dailyTerm'), '下');
daily.run('state.session.index=1; state.session.dailyDate="2000-01-01"; start("daily");');
assert.equal(daily.run('state.session.index'),0);
assert.equal(daily.run('state.session.dailyDate'),daily.run('dateKey()'));
console.log('每日练习优先选取旧错题和新题，覆盖不同学科，并正确处理续练、跨日和切换册次。');
