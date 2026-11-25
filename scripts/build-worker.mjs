import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {mkdir, readdir, readFile, writeFile, copyFile} from 'node:fs/promises';
import {basename, extname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';

const siteRoot = fileURLToPath(new URL('..', import.meta.url));
const output = process.argv[2] && resolve(process.argv[2]);
if (!output || output===resolve(siteRoot) || output.startsWith(resolve(siteRoot)+'/' )) {
  throw new Error('Specify a build-output directory outside the source checkout.');
}
const webRoot = join(siteRoot,'dist');
const html = await readFile(join(webRoot,'index.html'),'utf8');
const inputs = [...html.matchAll(/<script defer src="([^"]+)"><\/script>/g)].map(match=>match[1]);
assert.equal(inputs.at(-1),'app.js');

const node = {innerHTML:'',addEventListener(){}};
const context = vm.createContext({
  document:{querySelectorAll:()=>[],querySelector:()=>node},
  window:{addEventListener(){}},
  localStorage:{getItem:()=>null},
  location:{hash:''}
});
for (const name of inputs) {
  vm.runInContext(await readFile(join(webRoot,name),'utf8'),context,{filename:name});
}
const studyJson = vm.runInContext(`JSON.stringify({
  subjects:activeSubjects.map(({id,name})=>({id,name})),
  topics:allTopics.map(({key,title,term,description,subject,questions,sources})=>({
    key,title,term,description,subject:subject.id,ids:questions.map(q=>q.id),sources,
    href:studyHref(key), lesson:lessonByTopic.get(key),
    review:reviewCollections.get(reviewRouteByTopic.get(key))?.byTopic.get(key)?.notes
  })),
  questions:allQuestions,
  courses:[...courseByKey.values()],
  packs:[...practicePacks].map(([key,data])=>({key,title:data.title,term:data.term,description:data.description,ids:data.ids,href:'#packs/'+key}))
})`,context);
const study = JSON.parse(studyJson);
const questions = new Set(study.questions.map(q=>q.id));
assert.equal(questions.size,study.questions.length);
for (const scope of [...study.topics,...study.courses,...study.packs]) {
  assert.ok(scope.ids.every(id=>questions.has(id)),scope.key);
}
const topicTerms = new Map(study.topics.map(topic=>[topic.key,topic.term]));
const questionTerms = new Map(study.questions.map(question=>[question.id,topicTerms.get(question.topic)]));
for (const pack of study.packs) {
  assert.ok(['上','下'].includes(pack.term) && pack.ids.length>0 && pack.ids.every(id=>questionTerms.get(id)===pack.term),pack.key);
}
const kinds = {
  '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8',
  '.css':'text/css; charset=utf-8', '.webp':'image/webp'
};
const assets = {};
for (const file of (await readdir(webRoot,{withFileTypes:true})).filter(entry=>entry.isFile()).sort((a,b)=>a.name.localeCompare(b.name))) {
  const type = kinds[extname(file.name)];
  if (!type) continue;
  const bytes = await readFile(join(webRoot,file.name));
  assets['/'+file.name] = {type,body:bytes.toString('base64'),
    etag:'"'+createHash('sha256').update(bytes).digest('hex')+'"'};
}
const workerParts = await Promise.all([
  readFile(join(webRoot,'answer-rules.js'),'utf8'),
  ...['catalog.js','study-store.js','index.js'].map(file=>readFile(join(siteRoot,'worker',file),'utf8'))
]);
const manifest = join(siteRoot,'.openai','hosting.json');
await Promise.all(['.openai','dist/.openai','dist/server','drizzle'].map(path=>mkdir(join(output,path),{recursive:true})));
const migrations = (await readdir(join(siteRoot,'drizzle'))).filter(file=>file.endsWith('.sql')).sort();
await Promise.all([
  copyFile(manifest,join(output,'.openai','hosting.json')),
  copyFile(manifest,join(output,'dist','.openai','hosting.json')),
  ...migrations.map(file=>copyFile(join(siteRoot,'drizzle',file),join(output,'drizzle',file))),
  writeFile(join(output,'dist','server','index.js'),
    'const STATIC_ASSETS = '+JSON.stringify(assets)+';\nconst STUDY = '+studyJson+';\n'+workerParts.join('\n\n'))
]);
console.log('Built '+basename(output)+' with '+Object.keys(assets).length+' web assets and '+questions.size+' bank questions.');
