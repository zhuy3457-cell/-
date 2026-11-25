import assert from 'node:assert/strict';
import {readFile, readdir, writeFile} from 'node:fs/promises';
import {join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const [, , output, track2, track4] = process.argv;
assert.ok(output, '用法: node scripts/build-offline.mjs <输出.html> [第2套听力路径|-] [第4套听力路径|-]');
const web = fileURLToPath(new URL('../dist/', import.meta.url));
const files = await readdir(web);
assert.ok(!files.some(file=>resolve(output)===resolve(web,file)), '输出文件不能覆盖题库源文件');

const page = await readFile(join(web,'index.html'),'utf8');
const styles = await readFile(join(web,'styles.css'),'utf8');
const images = new Map(await Promise.all(files.filter(file=>file.endsWith('.webp')).map(async file=>[
  file, 'data:image/webp;base64,'+(await readFile(join(web,file))).toString('base64')
])));
const replaceImages = source => source.replace(/\b[\w-]+\.webp\b/g,name=>images.get(name) ?? name);
const tracks = [];
for (const [index,path] of [track2,track4].entries()) {
  if (!path || path==='-') continue;
  const type = path.toLowerCase().endsWith('.mp3') ? 'audio/mpeg' : 'audio/mp4';
  tracks.push([index===0 ? 2 : 4,'data:'+type+';base64,'+(await readFile(path)).toString('base64')]);
}
const scriptPattern = /<script defer src="([^"]+\.js)"><\/script>/g;
const scripts = [];
for (const [,file] of page.matchAll(scriptPattern)) {
  let source = replaceImages(await readFile(join(web,file),'utf8'));
  if (file==='app.js' && tracks.length) {
    const marker = 'const listeningAudioUrls = new Map();';
    assert.ok(source.includes(marker));
    source = source.replace(marker,'const listeningAudioUrls = new Map('+JSON.stringify(tracks)+');');
  }
  scripts.push('<script>\n'+source.replace(/<\/script/gi,'<\\/script')+'\n</script>');
}
assert.ok(scripts.length);
const inline = replaceImages(page.replace(scriptPattern,'')
  .replace('<link rel="stylesheet" href="styles.css">',()=>'<style>\n'+styles+'\n</style>'));
assert.ok(inline.includes('</body>'));
await writeFile(output,inline.replace('</body>',()=>scripts.join('\n')+'\n</body>'),{flag:'wx',mode:0o600});
console.log('离线 HTML 已生成：'+output);
