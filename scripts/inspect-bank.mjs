import assert from 'node:assert/strict';
import {readFile, writeFile} from 'node:fs/promises';
import {join} from 'node:path';

const [, , build, output] = process.argv;
assert.ok(build,'用法: node scripts/inspect-bank.mjs <Worker 构建目录> [完整题库 JSON 路径]');
const worker = await readFile(join(build,'dist/server/index.js'),'utf8');
const line = worker.split('\n').find(row=>row.startsWith('const STUDY = '));
assert.ok(line,'缺少 Worker 内嵌题库');
const bank = JSON.parse(line.slice('const STUDY = '.length,-1));
const terms = new Map(bank.topics.map(topic=>[topic.key,topic.term]));
const knownSubjects = new Map(bank.subjects.map(subject=>[subject.id,subject.name]));
const summary = new Map();
for (const question of bank.questions) {
  const id = question.subject;
  const counts = summary.get(id) ?? {学科:knownSubjects.get(id) ?? id,状态:knownSubjects.has(id)?'启用':'停用保留',上册:0,下册:0,题数:0};
  const term = terms.get(question.topic);
  assert.ok(term==='上'||term==='下',question.id);
  counts[term+'册']++;
  counts.题数++;
  summary.set(id,counts);
}
if (output) await writeFile(output,JSON.stringify(bank,null,2)+'\n',{flag:'wx',mode:0o600});
console.table([...summary.values()]);
console.log(JSON.stringify({questions:bank.questions.length,active:[...summary.values()].filter(row=>row.状态==='启用').reduce((sum,row)=>sum+row.题数,0),topics:bank.topics.length,courses:bank.courses.length,packs:bank.packs.length}));
