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
  const node = {innerHTML:'',addEventListener(){}};
  const context = vm.createContext({
    document:{querySelectorAll:()=>[],querySelector:()=>node},
    window:{addEventListener(){}},location:{hash:'#home',protocol:fetch?'https:':'file:'},
    crypto:webcrypto,fetch,
    localStorage:{getItem:key=>saved.get(key)??null,setItem:(key,value)=>saved.set(key,value)}
  });
  for (const source of sources) vm.runInContext(source,context);
  return {context, run:code=>vm.runInContext(code,context), saved};
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
