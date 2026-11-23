const strokes = {
  book:'<path d="M12 6a7 7 0 0 0-9-2v15a7 7 0 0 1 9 2 7 7 0 0 1 9-2V4a7 7 0 0 0-9 2Zm0 0v15"/>',
  home:'<path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 21v-6h6v6"/>',
  layers:'<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',
  notebook:'<rect x="5" y="3" width="15" height="18" rx="2"/><path d="M3 7h4m-4 5h4m-4 5h4m4-9h5m-5 4h5"/>',
  chart:'<path d="M3 3v18h18M8 16v-4m5 4V8m5 8V5"/>',
  pin:'<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  search:'<circle cx="10.8" cy="10.8" r="6.3"/><path d="m16 16 4 4"/>',
  close:'<path d="m6 6 12 12M6 18 18 6"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  target:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
  bolt:'<path d="m13 2-8 12h6l-1 8 9-12h-6l1-8Z"/>',
  pencil:'<path d="m4 16-1 5 5-1L20 8l-4-4L4 16Zm9-9 4 4"/>',
  bookmark:'<path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16l-6-4-6 4Z"/>',
  download:'<path d="M12 3v12m-4-4 4 4 4-4M4 16v4h16v-4"/>',
  math:'<path d="M4 6h6M7 3v6m7-3h6m-15 8 5 5m0-5-5 5m9-4h6m-6 4h6"/>',
  letters:'<path d="m3 18 5-12 5 12m-8-4h6m10 4v-4a2.7 2.7 0 1 0-5.4 0v1.3a2.7 2.7 0 1 0 5.4 0"/>',
  shield:'<path d="M12 3 4 6v5c0 5 4 8 8 10 4-2 8-5 8-10V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  history:'<path d="m3 8 9-5 9 5H3Zm2 12h14m-13-9v6m4-6v6m4-6v6m4-6v6"/>',
  globe:'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
  leaf:'<path d="M20 4c-9 0-15 2-15 9a6 6 0 0 0 6 6c7 0 9-6 9-15ZM4 21l9-9"/>',
  activity:'<path d="M3 12h4l3-7 4 14 3-7h4"/>',
  music:'<path d="M9 18V5l11-2v13M9 9l11-2"/><ellipse cx="6" cy="18" rx="3" ry="2"/><ellipse cx="17" cy="16" rx="3" ry="2"/>',
  palette:'<path d="M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 1.4-3.4 1.5 1.5 0 0 1 1.1-2.6H18a3 3 0 0 0 3-3 9 9 0 0 0-9-9Z"/><path d="M7 11h.1M10 7h.1M15 7h.1M18 11h.1" stroke-width="3"/>',
  monitor:'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M12 17v4m-4 0h8M7 13h10"/>',
  tools:'<path d="m4 19 9-9m-7-4 3-3 4 4-3 3-4-4Zm10 8 4 4a1.4 1.4 0 0 1-2 2l-4-4M3 20l1 1 3-3-1-1"/>'
};
const icon = name => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + strokes[name] + '</svg>';
document.querySelectorAll('[data-icon]').forEach(el => el.innerHTML = icon(el.dataset.icon));
const app = document.querySelector('#app');
const dialog = document.querySelector('#searchDialog');
const searchInput = document.querySelector('#searchInput');
const results = document.querySelector('#searchResults');
const allTopics = subjects.flatMap(subject => subject.topics.map(topic => ({...topic, subject})));
const allQuestions = allTopics.flatMap(topic => topic.questions);
const topicByKey = new Map(allTopics.map(topic => [topic.key, topic]));
const questionById = new Map(allQuestions.map(question => [question.id, question]));
const storageKey = 'suxue-study-v1';
const difficultyLevels = new Map([
  ['basic', ['基础','识记概念、直接代入或做一步运算。']],
  ['standard', ['进阶','在新情境中提取有用信息，并运用一个知识点得出答案。']],
  ['challenge', ['挑战','综合多个条件、比较方案，或完成两步及以上的推理。']]
]);
const cleanLevel = value => difficultyLevels.has(value) ? value : 'all';
let state = {term:'上', difficulty:'all', attempts:[], mistakes:{}, favorites:[], session:null};
try {
  const saved = JSON.parse(localStorage.getItem(storageKey));
  if (saved) state = {...state, ...saved};
} catch {}
if (!['上','下'].includes(state.term)) state.term = '上';
state.difficulty = cleanLevel(state.difficulty);
let storageFailed = false;
let backupNotice = '';
const backupSchema = 'suxue-study-backup';
function save() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
    storageFailed = false;
  }
  catch { storageFailed = true; }
}
const esc = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const dateKey = (date = new Date()) => [date.getFullYear(), String(date.getMonth()+1).padStart(2,'0'), String(date.getDate()).padStart(2,'0')].join('-');
const mistakeIds = () => Object.keys(state.mistakes).filter(id => questionById.has(id));
const favoriteIds = () => state.favorites.filter(id => questionById.has(id));
const endOfSession = s => s.index >= s.ids.length;
const percent = (right,total) => total ? Math.round(right / total * 100) + '%' : '—';
const termName = () => '七年级' + state.term + '册';
const startButton = (key, label, style = 'primary', symbol = '', back = '') => '<button type="button" class="btn '+style+'" data-start="'+key+'"'+(back?' data-back="'+back+'"':'')+'>'+(symbol ? icon(symbol) : '')+label+'</button>';
const pageHead = (title, sub, back = '') => '<div class="page-head">'+back+'<h1>'+title+'</h1><p>'+sub+'</p></div>';
const homeLink = '<a class="crumb" href="#home">学习首页</a>';
const mixedLink = (subjectId = '', label = '自选组卷') => '<a class="btn secondary" href="#mixed'+(subjectId ? '/'+subjectId : '')+'">'+icon('layers')+label+'</a>';
const bankLink = '<a class="crumb" href="#bank">学科题库</a>';
const referenceItems = (sources = []) => sources.map(source=>'<li><a class="crumb" href="'+esc(source.url)+'" target="_blank" rel="noopener">'+esc(source.title)+'</a><p>'+esc(source.note)+'</p></li>').join('');
const reviewCollections = new Map([
  ['geo-review', {
    subject:'geography', name:'地理', icon:'globe', tone:'teal',
    title:'第一次月考复习', keywords:'地理月考复习 第一次月考', subtitle:'根据你上传的第 1–7 页整理，涵盖资料中的考点 1–102。',
    start:'geo-monthly', returnLabel:'月考复习', modules:geoReviewModules, byTopic:geoReviewByTopic
  }],
  ['history-review', {
    subject:'history', name:'历史', icon:'history', tone:'gold',
    title:'时间轴与默写', keywords:'时间轴 历史默写 七上历史 夏商周', subtitle:'按上传资料整理史前时期、夏商周与秦统一的时间轴和考点。',
    start:'history-timeline', returnLabel:'历史复习', modules:historyReviewModules, byTopic:historyReviewByTopic
  }],
  ['biology-review', {
    subject:'biology', name:'生物学', icon:'leaf', tone:'green',
    title:'苏科版期中复习', keywords:'生物期中复习 显微镜 苏科版期中复习',
    subtitle:'按你上传的第 1–5、7–10 页可见内容整理，覆盖苏科版七年级上册第一、二单元的相关考点。',
    start:'biology-midterm', returnLabel:'生物期中复习', modules:biologyReviewModules, byTopic:biologyReviewByTopic
  }],
  ['civics-review', {
    subject:'civics', name:'道德与法治', icon:'shield', tone:'teal',
    title:'课课贴复习', keywords:'七上道法 道法课课贴 道德与法治课课贴',
    subtitle:'根据你上传的第 3、4、6、8、10 页整理，覆盖资料中的 40 个考点。',
    start:'civics-cards', returnLabel:'道法课课贴', modules:civicsReviewModules, byTopic:civicsReviewByTopic
  }]
]);
const reviewRouteByTopic = new Map([...reviewCollections].flatMap(([route,collection])=>collection.modules.map(module=>[module.key,route])));
const reviewRouteByStart = new Map([...reviewCollections].map(([route,collection])=>[collection.start,route]));
const studyHref = key => reviewRouteByTopic.has(key) ? '#'+reviewRouteByTopic.get(key)+'/'+key : lessonByTopic.has(key) ? '#learn/'+key : '';
function lessonLink(key, style = 'btn secondary') {
  const href = studyHref(key);
  return href ? '<a class="'+style+'" href="'+href+'">'+(reviewRouteByTopic.has(key)?'看复习卡':'看讲解')+'</a>' : '';
}
const termTabs = () => '<div class="segmented" role="group" aria-label="选择册次">'+['上','下'].map(term => '<button type="button" data-term="'+term+'" aria-pressed="'+(state.term === term)+'">'+term+'册</button>').join('')+'</div>';
function topicsIn(subject, term = state.term) { return subject.topics.filter(topic => topic.term === term); }
const questionLevel = question => question.level ?? 'basic';
const difficultyName = level => difficultyLevels.get(level)?.[0] ?? '不限难度';
const questionsAt = (topic, level) => level === 'all' ? topic.questions : topic.questions.filter(question=>questionLevel(question)===level);
const difficultyOptions = selected => ['all', ...difficultyLevels.keys()].map(level=>
  '<option value="'+level+'" '+(selected===level?'selected':'')+'>'+difficultyName(level)+'</option>'
).join('');
function mixedTopics(id, term) {
  return id === 'all'
    ? subjects.filter(subject => !subject.extra).flatMap(subject => topicsIn(subject, term))
    : topicsIn(subjects.find(subject => subject.id === id), term);
}
function shuffled(items) {
  const result = items.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
function mixedQuestions(id, term, count, level = 'all') {
  const selectedSubjects = id === 'all' ? shuffled(subjects.filter(subject => !subject.extra)) : [subjects.find(subject => subject.id === id)];
  const queues = selectedSubjects.map(subject => shuffled(topicsIn(subject, term).map(topic=>questionsAt(topic,level)).filter(items=>items.length)).map(shuffled)).filter(items=>items.length);
  const selected = [];
  while (selected.length < count && queues.length) {
    const topics = queues.shift();
    const questions = topics.shift();
    selected.push(questions.pop().id);
    if (questions.length) topics.push(questions);
    if (topics.length) queues.push(topics);
  }
  return selected;
}
function mixedCounts(id, term, level = 'all') {
  const total = mixedTopics(id, term).reduce((sum, topic) => sum + questionsAt(topic,level).length, 0);
  const max = Math.min(total, 20);
  const sizes = total ? [...[5, 10, 15].filter(size=>size<max),max] : [];
  return {total, sizes};
}
function mixedOptions(id, term, desired = 10, level = 'all') {
  const {total, sizes} = mixedCounts(id, term, level);
  const selected = sizes.includes(desired) ? desired : sizes.includes(10) ? 10 : sizes.at(-1);
  return {
    total,
    options: sizes.map(size => '<option value="'+size+'" '+(size===selected?'selected':'')+'>'+size+' 题</option>').join('') || '<option value="">无可选题目</option>',
    description: total ? '当前范围有 '+total+' 道题，优先从不同知识点抽取。' : '当前范围没有这个难度的题，可以调整学科、册次或难度。'
  };
}
function mixedPage(subject) {
  const id = subject?.id ?? 'all';
  const {total, options, description} = mixedOptions(id,state.term,10,state.difficulty);
  return pageHead('自选组卷','选择学科、册次、难度和题量。',bankLink)+
    '<form class="mix-form" id="mixedForm"><div class="mix-fields">'+
    '<label>学科<select name="subject"><option value="all">核心学科混合</option>'+subjects.map(item=>'<option value="'+item.id+'" '+(item.id===id?'selected':'')+'>'+item.name+'</option>').join('')+'</select></label>'+
    '<label>册次<select name="term">'+['上','下'].map(term=>'<option value="'+term+'" '+(term===state.term?'selected':'')+'>七年级'+term+'册</option>').join('')+'</select></label>'+
    '<label>难度<select name="difficulty">'+difficultyOptions(state.difficulty)+'</select></label>'+
    '<label>题量<select name="count" '+(total?'':'disabled')+'>'+options+'</select></label></div>'+
    '<p id="mixDescription" class="scope" aria-live="polite">'+description+'</p><div class="actions"><a class="crumb mix-guide" href="#difficulty">难度说明</a><button class="btn primary" type="submit" '+(total?'':'disabled')+'>'+icon('pencil')+'开始做题</button></div></form>';
}
function metric(title, value, tone, glyph) {
  return '<div class="metric"><span class="metric-icon '+tone+'">'+icon(glyph)+'</span><div class="metric-text"><small>'+title+'</small><strong>'+value+'</strong></div></div>';
}
function subjectCard(subject) {
  const topics = topicsIn(subject);
  return '<a class="subject-card" href="#subject/'+subject.id+'"><div class="subject-head"><span class="subject-icon '+subject.tone+'">'+icon(subject.icon)+'</span><h3>'+subject.name+'</h3></div><div class="subject-topics">'+topics.map(t => t.title).join(' · ')+'</div><div class="subject-foot"><span>'+topics.length+' 个知识点 · '+topics.reduce((sum,t) => sum+t.questions.length,0)+' 题</span><strong>去学习</strong></div></a>';
}
function subjectGrid() {
  return '<div class="practice-entries">'+advancedEntry()+
    '<a class="pack-entry" href="#packs"><span class="subject-icon violet">'+icon('layers')+'</span><span><strong>江苏专项题组</strong><small>课堂同难度练习与期末应用题</small></span><span class="pack-entry-label">查看题组</span></a></div>'+
    '<section id="subjectList" aria-labelledby="subjectTitle"><div class="section-head"><div><h2 id="subjectTitle">选择学科</h2><p>'+termName()+' · 按知识点专项练习</p></div>'+termTabs()+'</div><div class="subject-grid">'+subjects.filter(s => !s.extra).map(subjectCard).join('')+'</div><details class="extras" id="extraSubjects"><summary>体育、艺术与实践课程</summary><div class="subject-grid">'+subjects.filter(s => s.extra).map(subjectCard).join('')+'</div></details><p class="scope">题目按江苏七年级常见知识点编排，册次安排以各校教材为准。<a href="#difficulty">出题难度与参考资料</a></p></section>';
}
function home() {
  const daily = state.attempts.filter(item => item.date === dateKey());
  const continuation = state.session && !endOfSession(state.session)
    ? '<a class="btn secondary" href="#quiz">'+icon('book')+'继续上次练习</a>'
    : mixedLink();
  return '<section class="hero"><img class="hero-art" src="workbook.webp" alt="" fetchpriority="high"><div class="hero-content"><span class="pill">'+icon('book')+'江苏 · 初一全科</span><h1>今天想练哪一科？</h1><p>同步练知识点，做完就看解析。<br>从每天 5 道题开始。</p><div class="hero-actions">'+startButton('daily','每日练习','primary','bolt')+continuation+(state.session && !endOfSession(state.session) ? '<a class="quick-link" href="#mixed">自选组卷</a>' : '')+'</div></div></section><div class="metrics" aria-label="今日学习概况">'+metric('今日已练',daily.length+' 题','violet','pencil')+metric('今日正确率',percent(daily.filter(x=>x.ok).length,daily.length),'green','target')+metric('待复练错题',mistakeIds().length+' 题','orange','notebook')+'</div>'+subjectGrid();
}
function subjectPage(subject) {
  const level = state.difficulty;
  const topics = topicsIn(subject).map(topic=>({topic, questions:questionsAt(topic,level)})).filter(item=>item.questions.length);
  const done = new Set(state.attempts.filter(a=>a.ok).map(a=>a.id));
  const shortcut = subject.id==='math' && state.term==='上' ? '<a class="crumb" href="#packs/equation-modeling">一元一次方程同难度练习</a>'
    : subject.id==='chinese' ? '<a class="crumb" href="#learn/dictation-'+(state.term==='上'?'upper':'lower')+'">古诗文默写</a>' : '';
  const filters = '<div class="difficulty-filter"><label for="topicDifficulty">练习难度</label><select id="topicDifficulty">'+difficultyOptions(level)+'</select><a class="crumb" href="#difficulty">难度说明</a>'+shortcut+'</div>';
  const rows = topics.map(({topic,questions})=>{
    const mastered = questions.filter(q=>done.has(q.id)).length;
    const key = 'topic/'+topic.key+(level==='all'?'':'/'+level);
    return '<div class="row topic-row"><div><h3>'+topic.title+'</h3><p>'+topic.description+'</p><p>已答对 '+mastered+' / '+questions.length+' 题</p></div><div class="saved-actions">'+lessonLink(topic.key)+startButton(key,'做练习')+'</div></div>';
  }).join('');
  const review = state.term==='上' ? [...reviewCollections].filter(([,collection])=>collection.subject===subject.id).map(([route,collection])=>reviewEntry(route,collection)).join('') : '';
  return pageHead(subject.name, termName()+' · 按知识点看讲解、做练习',bankLink)+review+advancedEntry(subject)+'<section><div class="section-head"><h2 class="group-title">知识点</h2><div class="section-actions">'+mixedLink(subject.id,'本学科组卷')+termTabs()+'</div></div>'+filters+
    (rows ? '<div class="topic-list">'+rows+'</div>' : '<p class="empty" role="status">本册暂无这个难度的题。可以选择「不限难度」查看所有知识点。</p>')+'</section>';
}
function difficultyPage() {
  const rubric = [...difficultyLevels].map(([level,[name,description]])=>'<div class="row"><div><h3><span class="chip level-'+level+'">'+name+'</span></h3><p>'+description+'</p></div></div>').join('');
  const sources = calibrationSources.map(source=>'<li><a class="crumb" href="'+esc(source.url)+'" target="_blank" rel="noopener">'+esc(source.title)+'</a><p>'+esc(source.note)+'</p></li>').join('');
  return pageHead('出题难度与参考资料','难度按做题时需要的推理和运用来划分。',bankLink)+advancedEntry()+
    '<section class="topic-list" aria-label="难度分级">'+rubric+'</section><section class="result-review"><h2 class="group-title">公开参考资料</h2><ul class="reference-list">'+sources+'</ul></section>';
}
function advancedEntry(subject) {
  const title = subject ? subject.name+'综合提升' : '江苏各科综合提升';
  const link = '#advanced'+(subject?'/'+subject.id:'');
  return '<a class="pack-entry advanced-entry" href="'+link+'"><span class="subject-icon violet">'+icon('bolt')+'</span><span><strong>'+title+'</strong><small>训练多步推理、材料分析和方案判断</small></span><span class="pack-entry-label">挑战一组</span></a>';
}
function reviewEntry(route,collection) {
  const total = collection.modules.reduce((count,unit)=>count+unit.questions.length,0);
  return '<a class="pack-entry '+route+'-entry" href="#'+route+'"><span class="subject-icon '+collection.tone+'">'+icon(collection.icon)+'</span>'+
    '<span><strong>'+collection.title+'</strong><small>'+collection.modules.length+' 个主题 · '+total+' 道练习 · 七年级上册</small></span><span class="pack-entry-label">查看复习资料</span></a>';
}
function reviewPage(route,key) {
  const collection = reviewCollections.get(route);
  const base = '#'+route;
  const unit = collection.byTopic.get(key);
  if (!unit) {
    const total = collection.modules.reduce((count,module)=>count+module.questions.length,0);
    const cards = collection.modules.map(module=>'<a class="pack-card geo-unit-link" href="'+base+'/'+module.key+'"><div class="subject-head"><span class="subject-icon '+collection.tone+'">'+icon(collection.icon)+'</span><div><h2>'+esc(module.title)+'</h2><p>'+esc(module.range)+' · '+module.notes.length+' 张卡 · '+module.questions.length+' 题</p></div></div><p>'+esc(module.description)+'</p></a>').join('');
    const practiceName = collection.modules.some(module=>module.shortAnswer) ? '练习 '+total+' 道选择和填空' : '练习全部 '+total+' 题';
    return pageHead(collection.name+'上册 · '+collection.title,collection.subtitle,'<a class="crumb" href="#subject/'+collection.subject+'">返回'+collection.name+'</a>')+
      '<div class="section-head geo-review-head"><div><h2>按主题复习</h2><p>展开问答卡回忆要点，或做一组综合练习。</p></div>'+startButton(collection.start,practiceName)+'</div>'+
      '<div class="pack-grid">'+cards+'</div>';
  }
  const notes = unit.notes.map(note=>'<details class="geo-note"><summary>'+esc(note.label)+'</summary><p>'+esc(note.text)+'</p></details>').join('');
  const refs = referenceItems(unit.sources);
  const timeline = unit.timeline ? '<section class="history-timeline"><h2>时间轴</h2><ol>'+unit.timeline.map(([date,event])=>'<li><span>'+esc(date)+'</span><strong>'+esc(event)+'</strong></li>').join('')+'</ol></section>' : '';
  const task = unit.shortAnswer;
  const shortAnswer = task ? '<section class="short-answer"><h2 class="group-title">材料简答</h2><p>'+esc(task.material)+'</p><p>'+esc(task.prompt)+'</p>'+
    '<details class="geo-note"><summary>核对作答要点</summary><ol>'+task.points.map(point=>'<li>'+esc(point)+'</li>').join('')+'</ol></details></section>' : '';
  const practice = state.session && !endOfSession(state.session) && questionById.get(state.session.ids[state.session.index])?.topic===unit.key
    ? '<a class="btn primary" href="#quiz">继续当前练习</a>'
    : startButton('topic/'+unit.key,'做本主题 '+unit.questions.length+' 题','primary','pencil',base+'/'+unit.key);
  return '<article class="lesson-page">'+pageHead(esc(unit.title),esc(unit.range)+' · '+esc(unit.description),'<a class="crumb" href="'+base+'">'+collection.title+'</a>')+
    timeline+'<div class="section-head"><h2>问答复习卡</h2>'+practice+'</div><div class="geo-notes">'+notes+'</div>'+shortAnswer+
    (refs?'<details class="geo-references"><summary>查阅参考来源</summary><ul class="reference-list">'+refs+'</ul></details>':'')+'</article>';
}
function advancedPage(selected) {
  const items = selected ? [selected] : subjects;
  const cards = items.map(subject=>{
    const set = advancedSets.get(subject.id+'/'+state.term);
    const refs = referenceItems(set.sources);
    return '<article class="pack-card advanced-card"><div class="subject-head"><span class="subject-icon '+subject.tone+'">'+icon(subject.icon)+'</span><div><h2>'+subject.name+'</h2><p>'+set.ids.length+' 道挑战题 · '+termName()+'</p></div></div>'+
      '<p>'+esc(set.focus)+'</p><details><summary>参考资料与题型</summary><ul class="reference-list">'+refs+'</ul></details>'+
      '<div class="actions">'+startButton('advanced/'+subject.id+'/'+state.term,'开始挑战')+'</div></article>';
  }).join('');
  const back = selected ? '<a class="crumb" href="#advanced">全部学科</a>' : bankLink;
  return pageHead(selected?selected.name+'综合提升':'江苏各科综合提升','按江苏各地公开卷和课程任务编写原创练习。选一册开始。',back)+
    '<div class="section-head"><h2 class="group-title">选择册次</h2>'+termTabs()+'</div><div class="pack-grid'+(selected?' pack-grid-single':'')+'">'+cards+'</div>';
}
function packPage(selectedId) {
  const selected = practicePacks.get(selectedId);
  const entries = selected ? [[selectedId,selected]] : [...practicePacks].reverse();
  const cards = entries.map(([id,pack])=>{
    const refs = referenceItems(pack.sources);
    const stages = pack.stages ? '<ul class="pack-stages">'+pack.stages.map(stage=>'<li class="chip">'+esc(stage)+'</li>').join('')+'</ul>' : '';
    return '<article class="pack-card"><div class="subject-head"><span class="subject-icon '+pack.tone+'">'+icon(pack.icon)+'</span><div><h2>'+esc(pack.title)+'</h2><p>七年级'+(pack.term ?? '下')+'册 · '+pack.ids.length+' 题</p></div></div>'+
      '<p>'+esc(pack.description)+'</p>'+stages+(refs?'<details><summary>查看参考卷面</summary><ul class="reference-list">'+refs+'</ul></details>':'')+
      '<div class="actions">'+startButton('pack/'+id,'开始这组')+'</div></article>';
  }).join('');
  return pageHead(selected?'课堂同难度练习':'江苏专项题组','做完后可以逐题核对答案和思路。',selected?'<a class="crumb" href="#packs">全部专项题组</a>':bankLink)+
    '<div class="pack-grid'+(selected?' pack-grid-single':'')+'">'+cards+'</div>';
}
function lessonPage(topic) {
  const lesson = lessonByTopic.get(topic.key);
  if (!lesson) return empty('暂无这项讲解', '可以在学科题库中选择对应的练习。', 'book');
  const [concept, caution, prompt, solution, reasoning] = lesson;
  const s = state.session;
  const activeQuestion = s && !endOfSession(s) ? questionById.get(s.ids[s.index]) : null;
  const practice = activeQuestion?.topic === topic.key
    ? '<a class="btn primary" href="#quiz">继续当前练习</a>'
    : startButton('topic/'+topic.key,'做专项练习 · '+topic.questions.length+' 题','primary','pencil','#learn/'+topic.key);
  const back = '<a class="crumb" href="#subject/'+topic.subject.id+'">返回'+topic.subject.name+'</a>';
  const refs = referenceItems(topic.sources);
  return '<article class="lesson-page">'+pageHead(topic.title,topic.subject.name+' · 七年级'+topic.term+'册',back)+
    '<div class="lesson-facts"><section><h2>'+icon('book')+'核心要点</h2><p>'+esc(concept)+'</p></section>'+
    '<section class="lesson-caution"><h2>'+icon('target')+'易错提醒</h2><p>'+esc(caution)+'</p></section></div>'+
    '<section class="lesson-example"><h2>试做例题</h2><p class="example-prompt">'+esc(prompt)+'</p>'+
    '<details><summary>展开答案与思路</summary><p><strong>答案</strong>　'+esc(solution)+'</p><p><strong>思路</strong>　'+esc(reasoning)+'</p></details>'+
    '</section><div class="actions">'+practice+'</div>'+(refs?'<ul class="reference-list" aria-label="教材参考">'+refs+'</ul>':'')+'</article>';
}
const empty = (heading, copy, glyph) => '<div class="empty"><span class="metric-icon">'+icon(glyph)+'</span><h2>'+heading+'</h2><p>'+copy+'</p><a class="btn primary" href="#bank">去学科题库</a></div>';
function mistakePage() {
  const ids = mistakeIds().sort((a,b)=>state.mistakes[b].time-state.mistakes[a].time);
  return pageHead('错题本','答错的题会自动收录，答对后移出错题本。',homeLink)+(ids.length
    ? '<div class="section-head"><h2>待复练 · '+ids.length+' 题</h2>'+startButton('mistakes','复练全部错题')+'</div><div class="topic-list">'+ids.map(id=>{
      const q=questionById.get(id);
      const topic=topicByKey.get(q.topic);
      return '<article class="row"><div><h3>'+esc(q.prompt)+'</h3><p>'+topic.subject.name+' · '+topic.title+' · 已错 '+state.mistakes[id].count+' 次</p></div>'+startButton('one/'+id,'重做这题','secondary')+'</article>';
    }).join('')+'</div>'
    : empty('还没有待复练的错题','开始练习后，可以回到这里复习。','notebook'));
}
function favoriteButton(id) {
  const selected = state.favorites.includes(id);
  return '<button class="btn secondary bookmark-button" type="button" data-favorite="'+id+'" aria-label="收藏题目" aria-pressed="'+selected+'">'+icon('bookmark')+'<span>'+(selected?'已收藏':'收藏')+'</span></button>';
}
function favoritePage() {
  const ids = favoriteIds().reverse();
  return pageHead('题目收藏','把想再练的题收藏起来，答对后也可以继续保留。',homeLink)+(ids.length
    ? '<div class="section-head"><h2>已收藏 · '+ids.length+' 题</h2>'+startButton('favorites','练习全部收藏')+'</div><div class="topic-list">'+ids.map(id=>{
      const question = questionById.get(id);
      const topic = topicByKey.get(question.topic);
      return '<article class="row saved-row"><div><h3>'+esc(question.prompt)+'</h3><p>'+topic.subject.name+' · '+topic.term+'册 · '+topic.title+'</p></div><div class="saved-actions">'+favoriteButton(id)+startButton('favorite-one/'+id,'练习这题','primary')+'</div></article>';
    }).join('')+'</div>'
    : empty('还没有收藏题目','做题或查看答题回顾时，可以收藏想复习的题。','bookmark'));
}
function attemptReferences(attempts) {
  const legacyCounts = new Map();
  return attempts.map(attempt=>{
    if (attempt.ref && !attempt.ref.startsWith('legacy:')) return attempt;
    const key = 'legacy:'+attempt.date+':'+attempt.id+':'+Number(attempt.ok);
    const index = (legacyCounts.get(key) ?? 0) + 1;
    legacyCounts.set(key,index);
    return attempt.ref ? attempt : {...attempt, ref:key+':'+index};
  });
}
function backupPayload() {
  return {format:backupSchema, version:1, attempts:attemptReferences(state.attempts), favorites:favoriteIds()};
}
function exportBackup() {
  const blob = new Blob([JSON.stringify(backupPayload())], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = '苏学学习记录-'+dateKey()+'.json';
  link.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function mergeBackup(data) {
  if (data?.format !== backupSchema || data.version !== 1 || !Array.isArray(data.attempts) || !Array.isArray(data.favorites)) {
    throw new Error('无法识别备份格式。请选择从苏学练习室导出的 JSON 文件。');
  }
  const valid = data.attempts.every(item=>item && typeof item.id==='string' &&
    typeof item.ref==='string' && item.ref.length>0 && item.ref.length<=150 &&
    typeof item.ok==='boolean' && typeof item.date==='string' && /^\d{4}-\d{2}-\d{2}$/.test(item.date) &&
    (item.time===undefined || Number.isSafeInteger(item.time) && item.time>=0));
  if (!valid || data.favorites.some(id=>typeof id!=='string')) {
    throw new Error('备份里的记录有误。请选择一份完整的备份文件。');
  }
  const attempts = attemptReferences(state.attempts);
  const refs = new Set(attempts.map(attempt=>attempt.ref));
  const bookmarks = new Set(favoriteIds());
  const initialAttempts = attempts.length;
  const initialBookmarks = bookmarks.size;
  let unknown = 0;
  for (const {id, ok, date, ref, time} of data.attempts) {
    if (!questionById.has(id)) { unknown++; continue; }
    if (refs.has(ref)) continue;
    refs.add(ref);
    attempts.push({id, ok, date, ref, time});
  }
  for (const id of data.favorites) {
    if (questionById.has(id)) bookmarks.add(id);
    else unknown++;
  }
  const added = attempts.length - initialAttempts;
  if (added) {
    attempts.sort((a,b)=>a.date.localeCompare(b.date) || (a.time??0)-(b.time??0));
    state.attempts = attempts;
    state.mistakes = {};
    for (const item of attempts) {
      if (item.ok) delete state.mistakes[item.id];
      else state.mistakes[item.id] = {
        count:(state.mistakes[item.id]?.count??0)+1,
        time:item.time??Date.parse(item.date)
      };
    }
  }
  state.favorites = [...bookmarks];
  save();
  return '已合并 '+added+' 条答题记录、'+(bookmarks.size-initialBookmarks)+' 道收藏题。'+
    (unknown ? '当前题库中找不到的 '+unknown+' 条记录已跳过。' : '');
}
function studyBackup() {
  return '<section class="backup-panel"><div><h2>学习记录备份</h2><p>导出答题记录、错题和收藏。换设备时导入文件，会合并已有记录。</p></div>'+
    '<div class="saved-actions"><button class="btn secondary" type="button" data-backup="export">'+icon('download')+'导出备份</button>'+
    '<button class="btn secondary" type="button" data-backup="import">导入备份</button>'+
    '<input type="file" id="studyBackupInput" accept=".json,application/json" aria-label="选择学习记录备份" hidden></div>'+
    '<p class="backup-status" role="status">'+esc(backupNotice)+'</p></section>';
}
function priorityReview() {
  const grouped = new Map();
  for (const id of mistakeIds()) {
    const question = questionById.get(id);
    const current = grouped.get(question.topic) ?? {pending:0, wrongAttempts:0};
    current.pending++;
    current.wrongAttempts += state.mistakes[id].count;
    grouped.set(question.topic, current);
  }
  const priority = [...grouped].sort(([,a],[,b])=>b.pending-a.pending || b.wrongAttempts-a.wrongAttempts).slice(0,4);
  if (!priority.length) return '';
  return '<section class="priority"><div class="section-head"><div><h2>优先复练</h2><p>按当前待复练题量排序</p></div></div><div class="topic-list">'+priority.map(([key, summary])=>{
    const topic = topicByKey.get(key);
    return '<div class="row"><div><h3>'+topic.title+'</h3><p>'+topic.subject.name+' · '+topic.term+'册 · '+summary.pending+' 道错题</p></div>'+startButton('topic-mistakes/'+key,'复练此知识点','secondary')+'</div>';
  }).join('')+'</div></section>';
}
function statsPage() {
  const attempts = state.attempts;
  const right = attempts.filter(a => a.ok);
  const days = new Set(attempts.map(a => a.date));
  return pageHead('学习记录','做题后自动更新。记录保存在当前浏览器。',homeLink)+
    '<div class="metrics">'+metric('累计作答',attempts.length+' 题','violet','pencil')+metric('整体正确率',percent(right.length,attempts.length),'green','target')+metric('练习天数',days.size+' 天','orange','chart')+'</div>'+
    studyBackup()+priorityReview()+'<div class="section-head"><h2>分科进度</h2></div><div class="topic-list">'+subjects.map(subject => {
      const tried = attempts.filter(a=>questionById.get(a.id)?.subject===subject.id);
      const success = tried.filter(a=>a.ok);
      const distinct = new Set(success.map(a=>a.id)).size;
      const total = subject.topics.reduce((n,t)=>n+t.questions.length,0);
      return '<div class="row"><div class="subject-head"><span class="subject-icon '+subject.tone+'">'+icon(subject.icon)+'</span><div><h3>'+subject.name+'</h3><p>已答对 '+distinct+' / '+total+' 道不同的题</p></div></div><div>'+percent(success.length,tried.length)+'</div></div>';
    }).join('')+'</div>';
}
function dailyQuestions() {
  const core = subjects.filter(s=>!s.extra);
  const day = Number(dateKey().replaceAll('-',''));
  return Array.from({length:5},(_,i)=>{
    const subject = core[(day+i)%core.length];
    const topics = topicsIn(subject);
    const topic = topics[(day+i*3)%topics.length];
    return topic.questions[Math.floor(day*(i+3)/7)%topic.questions.length].id;
  });
}
function start(key, backTarget) {
  let ids, label, back;
  const [kind, id, term, count, difficulty] = key.split('/');
  if (state.session?.key === key && !endOfSession(state.session)) {
    location.hash = 'quiz';
    return;
  }
  if (kind === 'mixed') {
    const level = cleanLevel(difficulty);
    ids = mixedQuestions(id,term,Number(count),level);
    const name = id === 'all' ? '核心学科混合' : subjects.find(subject=>subject.id===id).name;
    label = name+' · '+term+'册组卷'+(level==='all'?'':' · '+difficultyName(level)); back = '#mixed'+(id==='all'?'':'/'+id);
  } else if (kind === 'pack') {
    const pack = practicePacks.get(id);
    if (!pack) return;
    ids = pack.ids; label = pack.title; back = pack.stages ? '#packs/'+id : '#packs';
  } else if (kind === 'advanced') {
    const set = advancedSets.get(id+'/'+term);
    if (!set) return;
    ids = set.ids; label = set.name+' · '+term+'册综合提升'; back = '#advanced/'+id;
  } else if (reviewRouteByStart.has(kind)) {
    const route = reviewRouteByStart.get(kind);
    const collection = reviewCollections.get(route);
    ids = collection.modules.flatMap(module=>module.questions.map(question=>question.id));
    label = collection.name+'上册 · '+collection.title; back = '#'+route;
  } else if (kind === 'daily') {
    ids = dailyQuestions(); label = '每日练习'; back = '#home';
  } else if (kind === 'topic') {
    const topic = topicByKey.get(id);
    const level = cleanLevel(term);
    ids = questionsAt(topic,level).map(q=>q.id); label = topic.subject.name+' · '+topic.title+(level==='all'?'':' · '+difficultyName(level)); back = backTarget || '#subject/'+topic.subject.id;
  } else if (kind === 'favorites' || kind === 'favorite-one') {
    ids = kind === 'favorite-one' ? [id] : favoriteIds();
    label = '收藏题复练'; back = '#favorites';
  } else if (kind === 'topic-mistakes') {
    const topic = topicByKey.get(id);
    ids = mistakeIds().filter(qid=>questionById.get(qid).topic===id);
    label = topic.title+' · 错题复练'; back = '#stats';
  } else {
    ids = kind === 'one' ? [id] : mistakeIds();
    label = '错题复练'; back = '#mistakes';
  }
  if (!ids.length) return;
  state.session = {key, ids, label, back, index:0, answers:[], selected:''};
  save();
  if (location.hash === '#quiz') render(true);
  else location.hash = 'quiz';
}
function answer(current,currentQuestion) {
  const q = currentQuestion;
  if (current.answers[current.index]) return;
  const fields = q.steps || q.blanks ? fieldValues(q,current.selected) : null;
  const raw = fields ? fields.join(' / ') : q.options ? current.selected : document.querySelector('#answerInput').value.trim();
  if (!fields && !raw) return;
  let ok;
  if (q.steps) ok = q.steps.every((step,index)=>matchesNumber(fields[index],step.answer));
  else if (q.blanks) ok = q.blanks.every((expected,index)=>normalizeDictation(fields[index]) === normalizeDictation(expected));
  else if (q.options) ok = raw === q.correct;
  else ok = matchesNumber(raw,q.correct);
  current.answers[current.index] = {id:q.id,ok,raw,...(fields?{fields}:{})};
  const now = new Date();
  const time = now.getTime();
  const ref = Array.from(crypto.getRandomValues(new Uint32Array(4)), number=>number.toString(16).padStart(8,'0')).join('');
  state.attempts.push({id:q.id,ok,date:dateKey(now),time,ref});
  if (ok) delete state.mistakes[q.id];
  else state.mistakes[q.id] = {count:(state.mistakes[q.id]?.count??0)+1,time};
  save();
  render();
  document.querySelector('#feedback')?.focus();
}
function materialTable(table) {
  const columns = table.headers.map(header=>'<th scope="col">'+esc(header)+'</th>').join('');
  const rows = table.rows.map(([first,...values])=>'<tr><th scope="row">'+esc(first)+'</th>'+values.map(value=>'<td>'+esc(value)+'</td>').join('')+'</tr>').join('');
  return '<div class="material-table-scroll"><table><caption>'+esc(table.caption)+'</caption><thead><tr>'+columns+'</tr></thead><tbody>'+rows+'</tbody></table></div>';
}
function readingMaterial(question, expanded = false) {
  if (!question.material && !question.table) return '';
  const title = question.stage==='找规律' ? '查看图形与数据' : question.table ? '查看数据表' : '阅读材料';
  return '<details class="reading-material" '+(expanded?'open':'')+'><summary>'+title+'</summary>'+
    (question.material?'<div>'+esc(question.material)+'</div>':'')+(question.table?materialTable(question.table):'')+'</details>';
}
const normalizeDictation = text => text.normalize('NFKC').replace(/[\p{P}\s]/gu,'');
const fieldValues = (question, values) => (question.steps ?? question.blanks).map((_,index)=>Array.isArray(values)?(values[index]??''):'');
function matchesNumber(raw, expected) {
  const normalized = raw.normalize('NFKC').replace(/[−–—]/g,'-').trim();
  return /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(normalized) && Number(normalized) === Number(expected);
}
const blankName = index => index === 0 ? '第一空' : '第二空';
function dictationInputs(question, selected, submitted) {
  const values = fieldValues(question,submitted?.fields ?? selected);
  const inputs = question.blanks.map((expected,index)=>{
    const invalid = submitted && normalizeDictation(expected)!==normalizeDictation(values[index]);
    const id = 'dictation-blank-'+index;
    return '<label for="'+id+'"><span>'+blankName(index)+'</span><input class="answer-input" id="'+id+'" data-answer-field="'+index+'" type="text" autocomplete="off" spellcheck="false" maxlength="80" value="'+esc(values[index])+'" '+(submitted?'disabled':'')+(invalid?' aria-invalid="true"':'')+'></label>';
  }).join('');
  return '<div class="dictation-fields">'+inputs+(submitted?'':'<p>标点和空格不计分。想不起来的空可以留空提交。</p>')+'</div>';
}
function dictationDifference(typed, answer) {
  const actual = [...normalizeDictation(typed)];
  const expected = [...normalizeDictation(answer)];
  const common = Array.from({length:actual.length+1},()=>new Uint16Array(expected.length+1));
  for (let i=actual.length-1;i>=0;i--) {
    for (let j=expected.length-1;j>=0;j--) {
      common[i][j] = actual[i] === expected[j] ? 1+common[i+1][j+1] : Math.max(common[i+1][j],common[i][j+1]);
    }
  }
  let i=0, j=0, typedMarkup='', answerMarkup='';
  while (i<actual.length || j<expected.length) {
    if (i<actual.length && j<expected.length && actual[i]===expected[j]) {
      typedMarkup += esc(actual[i++]);
      answerMarkup += esc(expected[j++]);
    } else if (i<actual.length && (j===expected.length || common[i+1][j]>=common[i][j+1])) {
      typedMarkup += '<mark class="dictation-extra">'+esc(actual[i++])+'</mark>';
    } else {
      answerMarkup += '<mark class="dictation-missing">'+esc(expected[j++])+'</mark>';
    }
  }
  return {typedMarkup,answerMarkup};
}
function dictationReview(question, submitted) {
  const values = fieldValues(question,submitted.fields);
  const rows = question.blanks.map((expected,index)=>{
    const typed = values[index];
    if (normalizeDictation(typed)===normalizeDictation(expected)) {
      return '<li><strong>'+blankName(index)+' · 正确</strong><span>'+esc(expected)+'</span></li>';
    }
    const {typedMarkup,answerMarkup} = dictationDifference(typed,expected);
    return '<li><strong>'+blankName(index)+' · '+(normalizeDictation(typed)?'有误':'未填')+'</strong><span>你写的　'+(typedMarkup||'（空白）')+'</span><span>正确原句　'+answerMarkup+'</span></li>';
  }).join('');
  return '<ul class="dictation-review">'+rows+'</ul>';
}
function stepInputs(question, selected, submitted) {
  const values = fieldValues(question,submitted?.fields ?? selected);
  return '<div class="step-fields">'+question.steps.map((step,index)=>{
    const id = 'step-'+index;
    const invalid = submitted && !matchesNumber(values[index],step.answer);
    const unit = step.unit ? '<span class="step-unit">'+esc(step.unit)+'</span>' : '';
    return '<div><label for="'+id+'">'+esc(step.label)+'</label><div class="step-input"><input class="answer-input" id="'+id+'" data-answer-field="'+index+'" type="text" autocomplete="off" maxlength="32" placeholder="只填数字" value="'+esc(values[index])+'" '+(submitted?'disabled':'')+(invalid?' aria-invalid="true"':'')+'>'+unit+'</div></div>';
  }).join('')+'</div>';
}
function stepReview(question, submitted) {
  const values = fieldValues(question,submitted.fields);
  return '<ul class="dictation-review">'+question.steps.map((step,index)=>{
    const value = values[index];
    const ok = matchesNumber(value,step.answer);
    return '<li><strong>'+esc(step.label)+' · '+(ok?'正确':value.trim()?'有误':'未填')+'</strong>'+
      (ok?'':'<span>你的答案　'+(esc(value.trim())||'（空白）')+'</span>')+'<span>正确结果　'+esc(step.answer)+(step.unit?' '+esc(step.unit):'')+'</span></li>';
  }).join('')+'</ul>';
}
function quizPage() {
  const s = state.session;
  if (!s || !s.ids.every(id=>questionById.has(id))) return empty('选择一组练习','可以按学科与知识点开始练习。','pencil');
  const reviewBack = reviewCollections.get(s.back.slice(1).split('/')[0]);
  const backLabel = reviewBack?.returnLabel ?? (s.back.startsWith('#mixed') ? '组卷设置' : s.back.startsWith('#learn/') ? '讲解'
    : s.back.startsWith('#advanced') ? '综合提升' : s.back.startsWith('#packs') ? '专项题组' : ({'#mistakes':'错题本','#home':'首页','#stats':'学习记录','#favorites':'题目收藏'}[s.back] ?? '学科'));
  const back = '<a class="crumb" href="'+s.back+'">返回'+backLabel+'</a>';
  if (endOfSession(s)) {
    const right = s.answers.filter(a=>a.ok).length;
    const retry = s.key.startsWith('mixed/') ? startButton(s.key,'再出一组','secondary')
      : (/^(mistakes$|topic-mistakes\/)/.test(s.key) ? '' : startButton(s.key,'再练一遍','secondary','',s.back));
    const overview = s.answers.map((answer, index)=>{
      const question = questionById.get(answer.id);
      const comparison = question.steps ? stepReview(question,answer) : question.blanks ? dictationReview(question,answer) : '<p>你的答案：'+esc(answer.raw)+'</p><p>正确答案：'+esc(question.correct)+'</p>';
      return '<li><details '+(answer.ok?'':'open')+'><summary><span class="result-status '+(answer.ok?'is-correct':'is-wrong')+'">'+(answer.ok?'答对':'答错')+'</span>第 '+(index+1)+' 题 · '+esc(question.prompt)+'</summary>'+readingMaterial(question)+comparison+'<p>'+esc(question.explanation)+'</p><div class="result-actions">'+favoriteButton(question.id)+lessonLink(question.topic)+'</div></details></li>';
    }).join('');
    return '<section class="quiz">'+pageHead('练习完成',esc(s.label),back)+'<div class="metrics">'+metric('已作答',s.ids.length+' 题','violet','pencil')+metric('答对',right+' 题','green','check')+metric('正确率',percent(right,s.ids.length),'orange','target')+'</div><div class="actions">'+retry+(right<s.ids.length?'<a class="btn primary" href="#mistakes">查看错题本</a>':'<a class="btn primary" href="'+s.back+'">返回'+backLabel+'</a>')+'</div><section class="result-review"><h2 class="group-title">本组答题回顾</h2><ul>'+overview+'</ul></section></section>';
  }
  const q = questionById.get(s.ids[s.index]);
  const topic = topicByKey.get(q.topic);
  const level = questionLevel(q);
  const submitted = s.answers[s.index];
  const value = submitted?.raw ?? s.selected;
  const options = q.steps ? stepInputs(q,s.selected,submitted) : q.blanks ? dictationInputs(q,s.selected,submitted) : q.options
    ? '<div class="options">'+q.options.map((option,i)=>{
      const status = submitted ? option===q.correct?' correct':option===value?' wrong':'' : '';
      return '<button class="option'+status+'" type="button" data-option="'+i+'" aria-pressed="'+(option===value)+'" '+(submitted?'disabled':'')+'><span>'+String.fromCharCode(65+i)+'</span><span>'+esc(option)+'</span></button>';
    }).join('')+'</div>'
    : '<input class="answer-input" id="answerInput" aria-label="填写答案" placeholder="输入数字" autocomplete="off" value="'+esc(value)+'" '+(submitted?'disabled':'')+'>';
  const comparison = submitted && q.steps ? stepReview(q,submitted) : submitted && q.blanks ? dictationReview(q,submitted) : '<p><b>正确答案</b>　'+esc(q.correct)+'</p>';
  const feedback = submitted ? '<div class="feedback '+(submitted.ok?'good':'bad')+'" id="feedback" tabindex="-1"><strong>'+(submitted.ok?'答对了！':'答错了，已加入错题本')+'</strong>'+comparison+'<p><b>解析</b>　'+esc(q.explanation)+'</p>'+lessonLink(q.topic,'crumb feedback-lesson')+'</div>' : '';
  return '<section class="quiz">'+back+'<div class="quiz-meta"><span>'+esc(s.label)+'</span><span>第 '+(s.index+1)+' / '+s.ids.length+' 题</span></div><div class="track" role="progressbar" aria-label="练习进度" aria-valuenow="'+(s.index+(submitted?1:0))+'" aria-valuemax="'+s.ids.length+'"><div style="width:'+100*(s.index+(submitted?1:0))/s.ids.length+'%"></div></div><form class="question" id="questionForm"><div class="quiz-chips"><span class="chip">'+topic.subject.name+' · '+topic.term+'册 · '+(q.steps?'分步填空':q.blanks?'默写填空':q.options?'单选题':'填空题')+'</span><span class="chip level-'+level+'">'+difficultyName(level)+'</span>'+(q.stage?'<span class="chip">'+esc(q.stage)+'</span>':'')+'</div>'+readingMaterial(q,!submitted)+'<h1>'+esc(q.prompt)+'</h1>'+options+feedback+'<div class="actions quiz-actions">'+favoriteButton(q.id)+(submitted?'<button type="button" class="btn primary" id="nextQuestion">'+(s.index+1===s.ids.length?'查看结果':'下一题')+'</button>':'<button type="submit" class="btn primary" id="submitAnswer" '+(q.steps || q.blanks || value?'':'disabled')+'>提交答案</button>')+'</div></form></section>';
}
function render(moveFocus = false) {
  const [page,subjectId] = location.hash.slice(1).split('/');
  const subject = subjects.find(s=>s.id===subjectId);
  const quizNav = ({'#home':'home','#mistakes':'mistakes','#stats':'stats','#favorites':'favorites'})[state.session?.back] ?? 'bank';
  const view = reviewCollections.has(page) ? 'bank' : {bank:'bank',mixed:'bank',difficulty:'bank',advanced:'bank',packs:'bank',subject:'bank',learn:'bank',mistakes:'mistakes',favorites:'favorites',stats:'stats',quiz:quizNav}[page] ?? 'home';
  for (const link of document.querySelectorAll('[data-nav]')) {
    if (link.dataset.nav===view) link.setAttribute('aria-current','page');
    else link.removeAttribute('aria-current');
  }
  document.querySelector('#mistakeBadge').textContent = mistakeIds().length || '';
  if (page==='bank') app.innerHTML = '<div class="bank-header">'+pageHead('学科题库','按学科和册次查看讲解或选择练习。',homeLink)+mixedLink()+'</div>'+subjectGrid();
  else if (page==='mixed') app.innerHTML = mixedPage(subject);
  else if (page==='difficulty') app.innerHTML = difficultyPage();
  else if (page==='advanced') app.innerHTML = advancedPage(subject);
  else if (reviewCollections.has(page)) {
    if (state.term!=='上') {
      state.term='上';
      save();
    }
    app.innerHTML = reviewPage(page,subjectId);
  }
  else if (page==='packs') app.innerHTML = packPage(subjectId);
  else if (page==='subject' && subject) app.innerHTML = subjectPage(subject);
  else if (page==='learn') {
    const topic = topicByKey.get(subjectId);
    if (topic && state.term !== topic.term) {
      state.term = topic.term;
      save();
    }
    app.innerHTML = topic ? lessonPage(topic) : empty('找不到这个知识点','可以重新搜索或按学科浏览。','book');
  }
  else if (page==='mistakes') app.innerHTML = mistakePage();
  else if (page==='favorites') app.innerHTML = favoritePage();
  else if (page==='stats') app.innerHTML = statsPage();
  else if (page==='quiz') app.innerHTML = quizPage();
  else app.innerHTML = home();
  if (storageFailed) app.insertAdjacentHTML('afterbegin','<p class="feedback" role="status">当前浏览器无法保存学习记录。关闭或刷新页面会丢失本次记录。</p>');
  if (moveFocus) {
    window.scrollTo(0,0);
    app.focus({preventScroll:true});
  }
}
app.addEventListener('click',event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.term) {
    const extraOpen = !!document.querySelector('#extraSubjects')?.open;
    state.term = button.dataset.term;
    save(); render();
    const details = document.querySelector('#extraSubjects');
    if (extraOpen && details) details.open = true;
    app.querySelector('[data-term="'+state.term+'"]')?.focus({preventScroll:true});
  } else if (button.dataset.start) {
    start(button.dataset.start,button.dataset.back);
  } else if (button.dataset.favorite) {
    const id = button.dataset.favorite;
    const wasSelected = state.favorites.includes(id);
    state.favorites = wasSelected ? state.favorites.filter(key=>key!==id) : [...state.favorites,id];
    save();
    if (location.hash === '#favorites') {
      render();
      (app.querySelector('[data-favorite]') ?? app).focus({preventScroll:true});
    } else {
      button.setAttribute('aria-pressed',String(!wasSelected));
      button.querySelector('span').textContent = wasSelected ? '收藏' : '已收藏';
    }
  } else if (button.dataset.backup === 'export') {
    exportBackup();
  } else if (button.dataset.backup === 'import') {
    document.querySelector('#studyBackupInput').click();
  } else if (button.dataset.option !== undefined) {
    const s = state.session;
    const q = questionById.get(s.ids[s.index]);
    s.selected = q.options[Number(button.dataset.option)];
    save();
    app.querySelectorAll('[data-option]').forEach(el=>el.setAttribute('aria-pressed',String(el===button)));
    document.querySelector('#submitAnswer').disabled = false;
  } else if (button.id==='nextQuestion') {
    state.session.index++;
    state.session.selected='';
    save(); render(true);
  }
});
app.addEventListener('input',event=>{
  const index = event.target.dataset.answerField;
  if (index !== undefined) {
    const current = state.session;
    const question = questionById.get(current.ids[current.index]);
    const values = fieldValues(question,current.selected);
    values[Number(index)] = event.target.value;
    current.selected = values;
    save();
    return;
  }
  if (event.target.id==='answerInput') {
    state.session.selected=event.target.value;
    document.querySelector('#submitAnswer').disabled=!event.target.value.trim();
    save();
  }
});
app.addEventListener('change',async event=>{
  if (event.target.id==='topicDifficulty') {
    state.difficulty = cleanLevel(event.target.value);
    save();
    render();
    document.querySelector('#topicDifficulty')?.focus({preventScroll:true});
    return;
  }
  if (event.target.id==='studyBackupInput') {
    const file = event.target.files[0];
    if (!file) return;
    try { backupNotice = mergeBackup(JSON.parse(await file.text())); }
    catch (error) {
      backupNotice = error instanceof SyntaxError ? '无法读取这个 JSON 文件。请选择学习记录备份。' : error.message;
    }
    if (location.hash==='#stats') {
      render();
      app.querySelector('[data-backup="import"]')?.focus({preventScroll:true});
    }
    return;
  }
  const form = event.target.closest('#mixedForm');
  if (!form || !['subject','term','difficulty'].includes(event.target.name)) return;
  const {subject,term,count,difficulty} = form.elements;
  const {total,options,description} = mixedOptions(subject.value,term.value,Number(count.value),cleanLevel(difficulty.value));
  count.innerHTML = options;
  count.disabled = !total;
  form.querySelector('button[type=submit]').disabled = !total;
  document.querySelector('#mixDescription').textContent = description;
});
app.addEventListener('submit',event=>{
  if (event.target.id==='mixedForm') {
    event.preventDefault();
    const {subject,term,count,difficulty} = event.target.elements;
    if (!count.value) return;
    state.term = term.value;
    state.difficulty = cleanLevel(difficulty.value);
    start('mixed/'+subject.value+'/'+term.value+'/'+count.value+(state.difficulty==='all'?'':'/'+state.difficulty));
    return;
  }
  if (event.target.id!=='questionForm') return;
  event.preventDefault();
  const s=state.session;
  if (!s.answers[s.index]) answer(s,questionById.get(s.ids[s.index]));
});
function search() {
  const query=searchInput.value.trim().toLowerCase();
  const found = query ? allTopics.filter(t=>[t.subject.name,t.title,t.description,reviewCollections.get(reviewRouteByTopic.get(t.key))?.keywords??''].some(s=>s.toLowerCase().includes(query))).slice(0,14) : [];
  results.innerHTML = found.map(t=>{
    const hasLesson = !!studyHref(t.key);
    const result = '<button class="search-result option" type="button" data-key="'+t.key+'" data-search-action="'+(hasLesson?'learn':'practice')+'"><div><strong>'+t.title+'</strong><small>'+t.subject.name+' · '+t.term+'册'+(hasLesson?' · 看讲解':'')+'</small></div></button>';
    const practice = hasLesson ? '<button class="btn secondary" type="button" data-key="'+t.key+'" data-search-action="practice" aria-label="练习'+esc(t.title)+'">做练习</button>' : '';
    return '<div class="search-entry">'+result+practice+'</div>';
  }).join('') ||
    '<p class="scope" role="status">'+(query?'没有找到匹配的知识点。':'输入「数学」「古诗」或「细胞」试试。')+'</p>';
}
function openSearch() {
  if (dialog.open) return;
  searchInput.value='';
  search();
  dialog.showModal();
  searchInput.focus();
}
document.querySelector('#searchButton').addEventListener('click',openSearch);
document.querySelector('#closeSearch').addEventListener('click',()=>dialog.close());
searchInput.addEventListener('input',search);
dialog.addEventListener('click',event=>{
  if (event.target===dialog) {
    const rect=dialog.getBoundingClientRect();
    if (event.clientX<rect.left || event.clientX>rect.right || event.clientY<rect.top || event.clientY>rect.bottom) dialog.close();
  }
  const button = event.target.closest('[data-key]');
  if (!button) return;
  dialog.close();
  const key = button.dataset.key;
  if (button.dataset.searchAction === 'learn') location.hash = studyHref(key);
  else {
    state.term = topicByKey.get(key).term;
    start('topic/'+key);
  }
});
window.addEventListener('keydown',event=>{
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase()==='k') {
    event.preventDefault(); openSearch();
  }
});
window.addEventListener('hashchange',()=>render(true));
render();
