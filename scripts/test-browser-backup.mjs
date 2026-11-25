import assert from 'node:assert/strict';
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

function browser() {
  const saved = new Map();
  const node = {innerHTML:'',addEventListener(){}};
  const context = vm.createContext({
    document:{querySelectorAll:()=>[],querySelector:()=>node},
    window:{addEventListener(){}},location:{hash:'#home'},
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
