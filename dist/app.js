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
const activeSubjectById = new Map(activeSubjects.map(subject=>[subject.id,subject]));
const isActiveQuestion = id => activeSubjectById.has(questionById.get(id)?.subject);
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
let syncNotice = '';
let syncingStudy = false;
let syncNeedsSignIn = false;
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
const mistakeIds = () => Object.keys(state.mistakes).filter(isActiveQuestion);
const favoriteIds = () => state.favorites.filter(isActiveQuestion);
const retainedFavoriteIds = () => state.favorites.filter(id=>questionById.has(id));
const correctQuestionIds = () => {
  const latest = new Map();
  for (const attempt of state.attempts) latest.set(attempt.id,attempt.ok);
  return new Set([...latest].filter(([,ok])=>ok).map(([id])=>id));
};
const remainingReviewIds = (unit, correctIds) => unit.questions.map(question=>question.id).filter(id=>!correctIds.has(id));
const missedSessionIds = session => [...new Set(session.answers.filter(answer=>!answer.ok && questionById.has(answer.id)).map(answer=>answer.id))];
const endOfSession = s => s.index >= s.ids.length;
const isActiveSession = s => !!s && s.ids.length>0 && s.ids.every(isActiveQuestion);
const percent = (right,total) => total ? Math.round(right / total * 100) + '%' : '—';
const termName = () => '七年级' + state.term + '册';
const startButton = (key, label, style = 'primary', symbol = '', back = '') => '<button type="button" class="btn '+style+'" data-start="'+key+'"'+(back?' data-back="'+back+'"':'')+'>'+(symbol ? icon(symbol) : '')+label+'</button>';
const pageHead = (title, sub, back = '') => '<div class="page-head">'+back+'<h1>'+title+'</h1><p>'+sub+'</p></div>';
const homeLink = '<a class="crumb" href="#home">学习首页</a>';
const mixedLink = (subjectId = '', label = '自选组卷') => '<a class="btn secondary" href="#mixed'+(subjectId ? '/'+subjectId : '')+'">'+icon('layers')+label+'</a>';
const bankLink = '<a class="crumb" href="#bank">学科题库</a>';
const referenceItems = (sources = []) => sources.map(source=>'<li><a class="crumb" href="'+esc(source.url)+'" target="_blank" rel="noopener">'+esc(source.title)+'</a><p>'+esc(source.note)+'</p></li>').join('');
const reviewCollections = new Map([
  ['english-public-study', {
    subject:'english', name:'英语', icon:'letters', tone:'blue',
    title:'公开资料拓展', keywords:'公开资料拓展 A1 A2 英语',
    subtitle:'读社团通知、图书角告示和义卖对话，再做词组与语法练习。各专题附有公开参考来源。',
    start:'english-public-study', returnLabel:'英语拓展练习', modules:publicStudyCollections.english, byTopic:publicStudyByTopic.english
  }],
  ['math-public-study', {
    subject:'math', name:'数学', icon:'math', tone:'violet',
    title:'公开资料拓展', keywords:'公开资料拓展 苏科版',
    subtitle:'按苏科版七上第 2–4 章编排。计算和应用填空附列式，可核对中间过程。',
    start:'math-public-study', returnLabel:'数学拓展练习', modules:publicStudyCollections.math, byTopic:publicStudyByTopic.math
  }],
  ['chinese-public-study', {
    subject:'chinese', name:'语文', icon:'book', tone:'pink',
    title:'公开资料拓展', keywords:'公开资料拓展 语文阅读',
    subtitle:'练习《世说新语》《观沧海》公开节选与原创短文。材料和参考来源可在专题中查看。',
    start:'chinese-public-study', returnLabel:'语文拓展练习', modules:publicStudyCollections.chinese, byTopic:publicStudyByTopic.chinese
  }],
  ['equation-application', {
    subject:'math', name:'数学', icon:'math', tone:'violet',
    title:'一元一次方程应用', keywords:'一元一次方程应用 行程问题 分段计费 工程 配套 利润 方案选择 答题得分 球赛积分 含参方程 盈亏 古代问题',
    subtitle:'按上传资料的专题三至十二整理。先找等量关系，再作答，提交后可查看列式和检验。',
    start:'equation-application', returnLabel:'一元一次方程应用', modules:equationApplicationModules, byTopic:equationApplicationByTopic
  }],
  ['english-phrases', {
    subject:'english', name:'英语', icon:'letters', tone:'blue', unitLabel:'个单元',
    title:'Unit 1–8 重点词组', keywords:'英语重点词组 短语默写 中译英 中英对照',
    subtitle:'可查看中英对照，按单元或编号范围默写。顶部搜索支持按中文、英文或原编号查找单条词组。',
    start:'english-phrases', returnLabel:'英语重点词组', modules:englishPhraseModules, byTopic:englishPhraseByTopic
  }],
  ['english-grammar-daily', {
    subject:'english', name:'英语', icon:'letters', tone:'blue', unitLabel:'天',
    title:'语法每日一练 Day 3–11', keywords:'七上英语语法 每日一练',
    subtitle:'按原练习的 Day 3 至 Day 11 排列。可以做一天的完整练习，也可以按题型单独作答。',
    related:{route:'english-pronouns-day2',label:'Day 2 · 人称代词和物主代词'},
    start:'english-grammar-daily', returnLabel:'英语每日一练', modules:englishGrammarModules, byTopic:englishGrammarByTopic
  }],
  ['english-classroom', {
    subject:'english', name:'英语', icon:'letters', tone:'blue',
    title:'Unit 1–5 学案、默写与课外阅读', keywords:'自我介绍 Grammar Integration Welcome Reading 同义句 早读 新学校 柳林风声 快乐王子',
    subtitle:'按单元练学案、词句默写、音标、写作与同义转换，也可做英文课外阅读。',
    start:'english-classroom', returnLabel:'英语学案与课外阅读', modules:englishClassroomModules, byTopic:englishClassroomByTopic
  }],
  ['english-vocab-review', {
    subject:'english', name:'英语', icon:'letters', tone:'blue',
    title:'Unit 1–2 词汇与句子默写', keywords:'词汇默写 中文释义 词性 音标 词形 句子默写',
    subtitle:'按原词表顺序写释义和词性，再练词形、重点搭配和整句中译英。',
    start:'english-vocab-review', returnLabel:'词汇与句子默写', modules:englishVocabModules, byTopic:englishVocabByTopic
  }],
  ['english-pronouns-day2', {
    subject:'english', name:'英语', icon:'letters', tone:'blue',
    title:'语法每日一练 Day 2 · 人称代词和物主代词', keywords:'Unit 1 Day 2 英语语法 人称代词 物主代词 主格 宾格',
    subtitle:'先逐行练代词表，再做 20 道变形填空和 10 道单选。填空按代词形式判分，书写时注意 I 和句首大写。',
    start:'english-pronouns-day2', returnLabel:'英语代词 Day 2', modules:englishPronounModules, byTopic:englishPronounByTopic
  }],
  ['math-algebra-review', {
    subject:'math', name:'数学', icon:'math', tone:'violet', unitLabel:'组',
    title:'绝对值与整式化简', keywords:'绝对值化简 整式化简求值 代数式化简 数轴专项',
    subtitle:'按上传的 6 页资料整理。绝对值 10 题，代数式化简求值 18 题，保留两套资料的原题号。',
    start:'math-algebra-review', returnLabel:'绝对值与整式化简', modules:mathAlgebraModules, byTopic:mathAlgebraByTopic
  }],
  ['math-midterm-workout', {
    subject:'math', name:'数学', icon:'math', tone:'violet', unitLabel:'组',
    title:'期中计算强化 10 天', keywords:'期中计算强化 计算必刷 有理数 整式的加减',
    subtitle:'按上传的 10 天练习单编排，每组建议用时 15 分钟。涵盖有理数、绝对值、整式与整体代入。',
    start:'math-midterm-workout', returnLabel:'期中计算强化', modules:mathMidtermModules, byTopic:mathMidtermByTopic
  }],
  ['jiezishu-review', {
    subject:'chinese', name:'语文', icon:'book', tone:'pink',
    title:'《诫子书》诵读与阅读', keywords:'诫子书 诸葛亮 文言文默写 家书家训 意与日去',
    subtitle:'按上传的 4 页整理，练习分句默写、字词翻译、论证分析和对比阅读。',
    start:'jiezishu-review', returnLabel:'《诫子书》专题', modules:jiezishuModules, byTopic:jiezishuByTopic
  }],
  ['geo-daily', {
    subject:'geography', name:'地理', icon:'globe', tone:'teal',
    title:'每日一练 1–6', keywords:'七上地理每日一练 地理每日一练', unitLabel:'组',
    subtitle:'按上传的 6 张练习单编号排列。可以逐组复习，做填空、应用题和材料简答。',
    start:'geo-daily', returnLabel:'地理每日一练', modules:geoDailyModules, byTopic:geoDailyByTopic
  }],
  ['geo-review', {
    subject:'geography', name:'地理', icon:'globe', tone:'teal',
    title:'第一次月考复习', keywords:'地理月考复习 第一次月考', subtitle:'根据你上传的第 1–7 页整理，涵盖资料中的考点 1–102。',
    start:'geo-monthly', returnLabel:'月考复习', modules:geoReviewModules, byTopic:geoReviewByTopic
  }],
  ['history-mindmap', {
    subject:'history', name:'历史', icon:'history', tone:'gold', unitLabel:'课',
    title:'思维导图与史料练习', keywords:'七上历史思维导图 历史导图', noteHeading:'思维导图',
    subtitle:'按上传的第 1–4、8 页整理，覆盖第 1–8、15–16 课。',
    start:'history-mindmap', returnLabel:'历史思维导图', modules:historyMindmapModules, byTopic:historyMindmapByTopic
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
    subtitle:'按你上传的第 1–4、6、8、10 页整理，共 63 张问答卡。第一单元已覆盖考点 1–27。',
    start:'civics-cards', returnLabel:'道法课课贴', modules:civicsReviewModules, byTopic:civicsReviewByTopic
  }]
]);
for (const id of new Set(sevenUpperReview.map(module=>module.subject))) {
  const subject = activeSubjectById.get(id);
  const modules = sevenUpperReview.filter(module=>module.subject===id);
  const route = id+'-upper-review';
  reviewCollections.set(route,{
    subject:id,name:subject.name,icon:subject.icon,tone:subject.tone,
    title:'七上复习 · '+subject.name,keywords:'七上 期末复习',
    subtitle:'按考点分组，读完要点后可直接做对应练习。',
    start:route,returnLabel:subject.name+'七上复习',modules,
    byTopic:new Map(modules.map(module=>[module.key,module]))
  });
}
const reviewRouteByTopic = new Map([...reviewCollections].flatMap(([route,collection])=>collection.modules.map(module=>[module.key,route])));
const reviewRouteByStart = new Map([...reviewCollections].map(([route,collection])=>[collection.start,route]));
const studyHref = key => reviewRouteByTopic.has(key) ? '#'+reviewRouteByTopic.get(key)+'/'+key : lessonByTopic.has(key) ? '#learn/'+key : '';
const normalizeSearch = text => text.normalize('NFKC').toLowerCase()
  .replace(/\b(day|unit)[\s-]*(?=\d)/g,'$1')
  .replace(/(\p{Script=Han})(?=[a-z0-9])/gu,'$1 ').replace(/([a-z0-9])(?=\p{Script=Han})/gu,'$1 ')
  .replace(/[·、，,]/g,' ').trim();
const topicSearchIndex = allTopics.filter(topic=>activeSubjectById.has(topic.subject.id)).map(topic=>{
  const collection = reviewCollections.get(reviewRouteByTopic.get(topic.key));
  const module = collection?.byTopic.get(topic.key);
  const name = topic.subject.name;
  const volume = topic.term+'册';
  const shortGrade = '七'+topic.term;
  return {
    topic,
    title:normalizeSearch(topic.title),
    scope:normalizeSearch([name,volume,'七年级'+volume,shortGrade,name+volume,shortGrade+name].join(' ')),
    detail:normalizeSearch([topic.description,module?.range,collection?.keywords].filter(Boolean).join(' '))
  };
});
const courseSearchIndex = [...courseCatalog.values()].flatMap(({lessons})=>lessons.map(({key})=>{
  const course = courseByKey.get(key);
  const {name} = activeSubjectById.get(course.subjectId);
  const volume = course.term+'册';
  return {course, name, title:normalizeSearch(course.title),
    scope:normalizeSearch([name,volume,'七年级'+volume,'七'+course.term+name,name+volume].join(' ')),detail:''};
}));
const phraseSearchKey = text => normalizeSearch(text).replace(/[’‘ʼ]/g,"'")
  .replace(/[^\p{L}\p{N}']+/gu,' ').trim();
const phraseSearchIndex = englishPhraseModules.flatMap(unit=>unit.questions.map((question,index)=>{
  const chinese = question.prompt.replace(/^\d+\.\s*/,'');
  const forms = question.steps.flatMap(step=>[step.answer,...step.aliases]);
  return {
    unit, question, number:index+1,
    values:[...new Set([chinese,...forms].map(phraseSearchKey))]
  };
}));
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
  if (id==='all') return activeSubjects.flatMap(subject=>topicsIn(subject,term));
  const subject = activeSubjectById.get(id);
  return subject ? topicsIn(subject,term) : [];
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
  const subject = activeSubjectById.get(id);
  const selectedSubjects = id==='all' ? shuffled(activeSubjects) : subject ? [subject] : [];
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
    '<label>学科<select name="subject"><option value="all">核心学科混合</option>'+activeSubjects.map(item=>'<option value="'+item.id+'" '+(item.id===id?'selected':'')+'>'+item.name+'</option>').join('')+'</select></label>'+
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
    '<section id="subjectList" aria-labelledby="subjectTitle"><div class="section-head"><div><h2 id="subjectTitle">选择学科</h2><p>'+termName()+' · 按知识点专项练习</p></div>'+termTabs()+'</div><div class="subject-grid">'+activeSubjects.map(subjectCard).join('')+'</div><p class="scope">题目按江苏七年级常见知识点编排，册次安排以各校教材为准。<a href="#difficulty">出题难度与参考资料</a></p></section>';
}
function publicStudyShortcuts() {
  const links = ['chinese','math','english'].map(subject=>{
    const route = subject+'-public-study';
    const collection = reviewCollections.get(route);
    const count = collection.modules.reduce((total,module)=>total+module.questions.length,0);
    return '<a class="btn secondary" href="#'+route+'">'+icon(collection.icon)+collection.name+' · '+count+' 题</a>';
  }).join('');
  return '<section class="public-study-shortcuts" aria-labelledby="publicStudyTitle"><h2 class="group-title" id="publicStudyTitle">七上公开资料拓展</h2><div class="public-study-links">'+links+'</div></section>';
}
function home() {
  const daily = state.attempts.filter(item=>item.date===dateKey() && isActiveQuestion(item.id));
  const canResume = isActiveSession(state.session) && !endOfSession(state.session);
  const continuation = canResume
    ? '<a class="btn secondary" href="#quiz">'+icon('book')+'继续上次练习</a>'
    : mixedLink();
  return '<section class="hero"><img class="hero-art" src="workbook.webp" alt="" fetchpriority="high"><div class="hero-content"><span class="pill">'+icon('book')+'江苏 · 七年级</span><h1>今天想练哪一科？</h1><p>同步练知识点，做完就看解析。<br>从每天 5 道题开始。</p><div class="hero-actions">'+startButton('daily','每日练习','primary','bolt')+
    '<a class="btn secondary" href="#course">'+icon('book')+'按课练习</a>'+continuation+
    (canResume ? '<a class="quick-link" href="#mixed">自选组卷</a>' : '')+
    '</div></div></section><div class="metrics" aria-label="今日学习概况">'+metric('今日已练',daily.length+' 题','violet','pencil')+metric('今日正确率',percent(daily.filter(x=>x.ok).length,daily.length),'green','target')+metric('待复练错题',mistakeIds().length+' 题','orange','notebook')+'</div>'+publicStudyShortcuts()+subjectGrid();
}
function subjectPage(subject) {
  const level = state.difficulty;
  const topics = topicsIn(subject).map(topic=>({topic, questions:questionsAt(topic,level)})).filter(item=>item.questions.length);
  const done = correctQuestionIds();
  const shortcut = subject.id==='math' && state.term==='上' ? '<a class="crumb" href="#packs/equation-modeling">一元一次方程同难度练习</a>'
    : subject.id==='chinese' ? '<a class="crumb" href="#learn/dictation-'+(state.term==='上'?'upper':'lower')+'">古诗文默写</a>' : '';
  const filters = '<div class="difficulty-filter"><label for="topicDifficulty">练习难度</label><select id="topicDifficulty">'+difficultyOptions(level)+'</select><a class="crumb" href="#difficulty">难度说明</a>'+shortcut+'</div>';
  const rows = topics.map(({topic,questions})=>{
    const mastered = questions.filter(q=>done.has(q.id)).length;
    const key = 'topic/'+topic.key+(level==='all'?'':'/'+level);
    return '<div class="row topic-row"><div><h3>'+topic.title+'</h3><p>'+topic.description+'</p><p>已答对 '+mastered+' / '+questions.length+' 题</p></div><div class="saved-actions">'+lessonLink(topic.key)+startButton(key,'做练习')+'</div></div>';
  }).join('');
  const review = state.term==='上' ? [...reviewCollections].filter(([,collection])=>collection.subject===subject.id).map(([route,collection])=>reviewEntry(route,collection)).join('') : '';
  return pageHead(subject.name, termName()+' · 按知识点看讲解、做练习',bankLink)+courseEntry(subject)+review+advancedEntry(subject)+'<section><div class="section-head"><h2 class="group-title">知识点</h2><div class="section-actions">'+mixedLink(subject.id,'本学科组卷')+termTabs()+'</div></div>'+filters+
    (rows ? '<div class="topic-list">'+rows+'</div>' : '<p class="empty" role="status">本册暂无这个难度的题。可以选择「不限难度」查看所有知识点。</p>')+'</section>';
}
function courseEntry(subject) {
  const href = '#course'+(subject ? '/'+subject.id : '');
  return '<a class="pack-entry" href="'+href+'"><span class="subject-icon violet">'+icon('book')+'</span>'+
    '<span><strong>按课练习</strong><small>选择课次、课文或单元，做对应题目</small></span>'+
    '<span class="pack-entry-label">打开目录</span></a>';
}
const courseProgress = (ids, done) => '已答对 '+ids.filter(id=>done.has(id)).length+' / '+ids.length+' 题';
function coursePage(subject, key) {
  if (!subject) {
    const cards = activeSubjects.map(item=>{
      const {lessons,topics} = courseCatalog.get(item.id+'/'+state.term);
      const summary = [lessons.length ? lessons.length+' 组分课练习' : '', topics.length ? topics.length+' 组知识点练习' : ''].filter(Boolean).join(' · ');
      return '<a class="subject-card" href="#course/'+item.id+'"><div class="subject-head"><span class="subject-icon '+item.tone+'">'+
        icon(item.icon)+'</span><h3>'+item.name+'</h3></div><div class="subject-foot"><span>'+summary+'</span><strong>选课</strong></div></a>';
    }).join('');
    return pageHead('按课练习','选择学科和册次，查看已收录的课次与单元。',bankLink)+
      '<div class="section-head"><h2 class="group-title">学科目录</h2>'+termTabs()+'</div><div class="subject-grid">'+cards+'</div>';
  }
  if (key) {
    const course = courseByKey.get(key);
    if (!course || course.subjectId!==subject.id) return empty('找不到这组练习','可以从学科目录重新选课。','book');
    if (state.term!==course.term) {
      state.term = course.term;
      save();
    }
    return courseDetail(course,subject);
  }
  const {lessons,topics} = courseCatalog.get(subject.id+'/'+state.term);
  const done = correctQuestionIds();
  const cards = (items,title)=>items.length ? '<section class="course-list"><h2 class="group-title">'+title+'</h2><div class="topic-list">'+items.map(course=>
    '<a class="row course-row" href="'+courseByKey.get(course.key).href+'"><div><h3>'+esc(course.title)+'</h3><p>'+
    esc(course.description)+'</p></div><span class="crumb">'+courseProgress(course.ids,done)+'</span></a>').join('')+'</div></section>' : '';
  return pageHead(subject.name+' · 按课练习',termName(),'<a class="crumb" href="#course">全部学科</a>')+
    '<div class="section-head"><a class="crumb" href="#subject/'+subject.id+'">学科题库</a>'+termTabs()+'</div>'+
    cards(lessons,'已收录的课次与单元')+cards(topics,'知识点练习');
}
function courseDetail(course,subject) {
  const done = correctQuestionIds();
  const pending = course.ids.filter(id=>!done.has(id)).length;
  const current = state.session;
  const canResume = current?.back===course.href && !endOfSession(current);
  const unit = course.key.startsWith('unit-');
  const nextGroup = course.groups.find(group=>group.ids.some(id=>!done.has(id))) ?? course.groups[0];
  const links = course.studyKeys.map(key=>{
    const href = studyHref(key);
    if (!href) return '';
    const topic = topicByKey.get(key);
    return '<a class="btn secondary" href="'+href+'">'+esc(topic.title)+'</a>';
  }).join('');
  const refs = referenceItems(course.sources);
  const groups = course.groups.map(group=>
    '<div class="row topic-row"><div><h3>'+esc(group.title)+'</h3><p>'+courseProgress(group.ids,done)+'</p></div>'+
    startButton('course/'+course.key+'/'+group.key,'做这组','secondary')+'</div>').join('');
  const back = '<a class="crumb" href="#course/'+subject.id+'">返回'+subject.name+'课程目录</a>';
  const actions = (canResume ? '<a class="btn primary" href="#quiz">继续'+(unit?'本单元':'本课')+'练习</a>' :
    startButton('course/'+course.key+'/'+nextGroup.key,'开始练习','primary','pencil'))+
    (course.groups.length>1 && pending ? startButton('course/'+course.key+'/remaining','未答对的题 · '+pending+' 题','secondary') : '');
  return pageHead(esc(course.title),subject.name+' · 七年级'+course.term+'册 · '+courseProgress(course.ids,done),back)+
    '<p class="course-description">'+esc(course.description)+'</p><div class="actions course-actions">'+actions+'</div>'+
    '<section class="course-list"><h2 class="group-title">选择题组</h2><div class="topic-list">'+groups+'</div></section>'+
    (links ? '<section class="course-list"><h2 class="group-title">复习资料</h2><div class="actions course-actions">'+links+'</div></section>' : '')+
    (refs ? '<details class="course-list"><summary>参考来源</summary><ul class="reference-list">'+refs+'</ul></details>' : '');
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
    '<span><strong>'+collection.title+'</strong><small>'+collection.modules.length+' '+(collection.unitLabel??'个主题')+' · '+total+' 道练习 · 七年级上册</small></span><span class="pack-entry-label">查看复习资料</span></a>';
}
function reviewPage(route,key) {
  const collection = reviewCollections.get(route);
  const base = '#'+route;
  const unit = collection.byTopic.get(key);
  const done = correctQuestionIds();
  const session = state.session;
  const current = session && !endOfSession(session) ? questionById.get(session.ids[session.index]) : null;
  if (!unit) {
    const total = collection.modules.reduce((count,module)=>count+module.questions.length,0);
    const cards = collection.modules.map(module=>{
      const correct = module.questions.filter(question=>done.has(question.id)).length;
      const progress = '已答对 '+correct+' / '+module.questions.length+' 题';
      return '<a class="pack-card geo-unit-link" href="'+base+'/'+module.key+'"><div class="subject-head"><span class="subject-icon '+collection.tone+'">'+icon(collection.icon)+'</span><div><h2>'+esc(module.title)+'</h2><p>'+esc(module.range)+' · '+progress+'</p></div></div><p>'+esc(module.description)+'</p></a>';
    }).join('');
    const practiceName = collection.modules.some(module=>module.shortAnswer) ? '练习 '+total+' 道选择和填空' : '练习全部 '+total+' 题';
    const studyTip = collection.related ? '<a class="crumb" href="#'+collection.related.route+'">'+esc(collection.related.label)+'</a>'
      : collection.noteHeading ? '展开各课的导图分支复习，或做一组综合练习。' : '展开问答卡回忆要点，或做一组综合练习。';
    const practice = current && reviewRouteByTopic.get(current.topic)===route
      ? '<a class="btn primary" href="#quiz">继续当前练习</a>'+startButton(collection.start,practiceName,'secondary')
      : startButton(collection.start,practiceName);
    return pageHead(collection.name+'上册 · '+collection.title,collection.subtitle,'<a class="crumb" href="#subject/'+collection.subject+'">返回'+collection.name+'</a>')+
      '<div class="section-head geo-review-head"><div><h2>按主题复习</h2><p>'+studyTip+'</p></div><div class="section-actions">'+practice+'</div></div>'+
      '<div class="pack-grid">'+cards+'</div>';
  }
  const branches = collection.noteHeading ? ' review-branches' : '';
  const notes = unit.notes.map(note=>'<details class="geo-note"><summary>'+esc(note.label)+'</summary>'+
    (note.points ? '<ul>'+note.points.map(point=>'<li>'+esc(point)+'</li>').join('')+'</ul>' : '<p>'+esc(note.text)+'</p>')+'</details>').join('');
  const refs = referenceItems(unit.sources);
  const timeline = unit.timeline ? '<section class="history-timeline"><h2>时间轴</h2><ol>'+unit.timeline.map(([date,event])=>'<li><span>'+esc(date)+'</span><strong>'+esc(event)+'</strong></li>').join('')+'</ol></section>' : '';
  const task = unit.shortAnswer;
  const shortAnswer = task ? '<section class="short-answer"><h2 class="group-title">材料简答</h2><p>'+esc(task.material)+'</p><p>'+esc(task.prompt)+'</p>'+
    '<details class="geo-note"><summary>核对作答要点</summary><ol>'+task.points.map(point=>'<li>'+esc(point)+'</li>').join('')+'</ol></details></section>' : '';
  const practice = current?.topic===unit.key
    ? '<a class="btn primary" href="#quiz">继续当前练习</a>'
    : startButton('topic/'+unit.key,'做本主题 '+unit.questions.length+' 题','primary','pencil',base+'/'+unit.key);
  const remaining = remainingReviewIds(unit,done).length;
  const targetedPractice = current?.topic!==unit.key && remaining>0 && remaining<unit.questions.length
    ? startButton('review-remaining/'+unit.key,'只练未答对的 '+remaining+' 题','secondary')
    : '';
  const sections = unit.sections ? '<div class="actions review-sections">'+unit.sections.map(section=>{
    const correct = section.ids.filter(id=>done.has(id)).length;
    const label = esc(section.title)+' · 已答对 '+correct+' / '+section.ids.length;
    return startButton('review-section/'+unit.key+'/'+section.key,label,'secondary');
  }).join('')+'</div>' : '';
  return '<article class="lesson-page">'+pageHead(esc(unit.title),esc(unit.range)+' · '+esc(unit.description),'<a class="crumb" href="'+base+'">'+collection.title+'</a>')+
    timeline+'<div class="section-head geo-review-head"><h2>'+(collection.noteHeading ?? '问答复习卡')+'</h2><div class="section-actions">'+targetedPractice+practice+'</div></div>'+sections+'<div class="geo-notes'+branches+'">'+notes+'</div>'+shortAnswer+
    (refs?'<details class="geo-references"><summary>查阅参考来源</summary><ul class="reference-list">'+refs+'</ul></details>':'')+'</article>';
}
function advancedPage(selected) {
  const items = selected ? [selected] : activeSubjects;
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
  if (selected && selected.term!==state.term) {
    state.term = selected.term;
    save();
  }
  const entries = selected ? [[selectedId,selected]] : [...practicePacks].reverse().filter(([,pack])=>pack.term===state.term);
  const cards = entries.map(([id,pack])=>{
    const refs = referenceItems(pack.sources);
    const stages = pack.stages ? '<ul class="pack-stages">'+pack.stages.map(stage=>'<li class="chip">'+esc(stage)+'</li>').join('')+'</ul>' : '';
    return '<article class="pack-card"><div class="subject-head"><span class="subject-icon '+pack.tone+'">'+icon(pack.icon)+'</span><div><h2>'+esc(pack.title)+'</h2><p>七年级'+pack.term+'册 · '+pack.ids.length+' 题</p></div></div>'+
      '<p>'+esc(pack.description)+'</p>'+stages+(refs?'<details><summary>查看参考卷面</summary><ul class="reference-list">'+refs+'</ul></details>':'')+
      '<div class="actions">'+startButton('pack/'+id,'开始这组')+'</div></article>';
  }).join('');
  const tabs = selected ? '' : '<div class="section-head"><h2 class="group-title">选择册次</h2>'+termTabs()+'</div>';
  return pageHead(selected?.stages?'课堂同难度练习':'江苏专项题组','做完后可以逐题核对答案和思路。',selected?'<a class="crumb" href="#packs">返回专项题组</a>':bankLink)+tabs+
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
  return {format:backupSchema, version:1, attempts:attemptReferences(state.attempts), favorites:retainedFavoriteIds()};
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
  const bookmarks = new Set(retainedFavoriteIds());
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
function studySyncPanel() {
  if (location.protocol!=='https:') return '';
  const signIn = syncNeedsSignIn ? '<a class="btn secondary" href="/signin-with-chatgpt?return_to=%2F%23stats" target="_top">用 ChatGPT 账号登录</a>' : '';
  return '<section class="backup-panel"><div><h2>同步到七年级学习助手</h2>'+
    '<p>把本浏览器的答题结果与同一 ChatGPT 账号合并，方便在聊天里查询进度和错题。</p></div>'+
    '<div class="saved-actions">'+signIn+'<button class="btn secondary" type="button" data-study-sync '+(syncingStudy?'disabled':'')+
    '>'+(syncingStudy?'正在同步…':'同步学习记录')+'</button></div>'+
    '<p class="backup-status" role="status">'+esc(syncNotice)+'</p></section>';
}
async function syncStudyRecords() {
  if (syncingStudy) return;
  syncingStudy = true;
  syncNotice = '';
  syncNeedsSignIn = false;
  render();
  async function requestSync(path = '',options) {
    const response = await fetch('/api/study-sync'+path,options);
    if (response.status===401 || response.redirected) {
      syncNeedsSignIn = true;
      throw new Error('请先用同一 ChatGPT 账号登录，再同步。');
    }
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || '暂时无法同步，请稍后重试。');
    return data;
  }
  try {
    const backup = backupPayload();
    let page = await requestSync();
    let uploaded = 0;
    for (let start=0;start<backup.attempts.length;start+=200) {
      const attempts = backup.attempts.slice(start,start+200);
      const {added} = await requestSync('',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({attempts})});
      uploaded += added;
    }
    const attempts = page.attempts.slice();
    while (page.next!==null) {
      page = await requestSync('?after='+encodeURIComponent(page.next));
      attempts.push(...page.attempts);
    }
    syncNotice = '已上传 '+uploaded+' 条答题记录。'+mergeBackup({...backup,attempts,favorites:[]});
  } catch (error) {
    syncNotice = error instanceof SyntaxError || error instanceof TypeError ? '暂时无法同步，请稍后重试。' : error.message;
  } finally {
    syncingStudy = false;
    if (location.hash==='#stats') render();
  }
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
  const attempts = state.attempts.filter(item=>isActiveQuestion(item.id));
  const right = attempts.filter(a => a.ok);
  const days = new Set(attempts.map(a => a.date));
  return pageHead('学习记录','做题后自动更新。记录保存在当前浏览器。',homeLink)+
    '<div class="metrics">'+metric('累计作答',attempts.length+' 题','violet','pencil')+metric('整体正确率',percent(right.length,attempts.length),'green','target')+metric('练习天数',days.size+' 天','orange','chart')+'</div>'+
    studyBackup()+studySyncPanel()+priorityReview()+'<div class="section-head"><h2>分科进度</h2></div><div class="topic-list">'+activeSubjects.map(subject => {
      const tried = attempts.filter(a=>questionById.get(a.id)?.subject===subject.id);
      const success = tried.filter(a=>a.ok);
      const distinct = new Set(success.map(a=>a.id)).size;
      const total = subject.topics.reduce((n,t)=>n+t.questions.length,0);
      return '<div class="row"><div class="subject-head"><span class="subject-icon '+subject.tone+'">'+icon(subject.icon)+'</span><div><h3>'+subject.name+'</h3><p>已答对 '+distinct+' / '+total+' 道不同的题</p></div></div><div>'+percent(success.length,tried.length)+'</div></div>';
    }).join('')+'</div>';
}
function dailyQuestions() {
  const day = Number(dateKey().replaceAll('-',''));
  return Array.from({length:5},(_,i)=>{
    const subject = activeSubjects[(day+i)%activeSubjects.length];
    const topics = topicsIn(subject);
    const topic = topics[(day+i*3)%topics.length];
    return topic.questions[Math.floor(day*(i+3)/7)%topic.questions.length].id;
  });
}
function start(key, backTarget) {
  let ids, label, back;
  const [kind, id, term, count, difficulty] = key.split('/');
  if (state.session?.key===key && isActiveSession(state.session) && !endOfSession(state.session)) {
    location.hash = 'quiz';
    return;
  }
  if (kind === 'mixed') {
    if (id!=='all' && !activeSubjectById.has(id)) return;
    const level = cleanLevel(difficulty);
    ids = mixedQuestions(id,term,Number(count),level);
    const name = id==='all' ? '核心学科混合' : activeSubjectById.get(id).name;
    label = name+' · '+term+'册组卷'+(level==='all'?'':' · '+difficultyName(level)); back = '#mixed'+(id==='all'?'':'/'+id);
  } else if (kind === 'pack') {
    const pack = practicePacks.get(id);
    if (!pack) return;
    state.term = pack.term;
    ids = pack.ids; label = pack.title; back = pack.stages ? '#packs/'+id : '#packs';
  } else if (kind === 'advanced') {
    const set = advancedSets.get(id+'/'+term);
    if (!set) return;
    ids = set.ids; label = set.name+' · '+term+'册综合提升'; back = '#advanced/'+id;
  } else if (kind === 'course') {
    const course = courseByKey.get(id);
    if (!course) return;
    if (term === 'remaining') {
      const done = correctQuestionIds();
      ids = course.ids.filter(questionId=>!done.has(questionId));
      label = course.title+' · 未答对的题';
    } else {
      const group = course.groups.find(item=>item.key===term);
      if (!group) return;
      ids = group.ids;
      label = course.title+' · '+group.title;
    }
    state.term = course.term;
    back = course.href;
  } else if (reviewRouteByStart.has(kind)) {
    const route = reviewRouteByStart.get(kind);
    const collection = reviewCollections.get(route);
    ids = collection.modules.flatMap(module=>module.questions.map(question=>question.id));
    label = collection.name+'上册 · '+collection.title; back = '#'+route;
  } else if (kind === 'phrase') {
    const question = questionById.get(id);
    const unit = englishPhraseByTopic.get(question?.topic);
    if (!unit) return;
    ids = [id];
    label = unit.title+' · 单条默写';
    back = studyHref(unit.key);
    state.term = '上';
  } else if (kind === 'review-section' || kind === 'review-remaining') {
    const route = reviewRouteByTopic.get(id);
    const unit = reviewCollections.get(route)?.byTopic.get(id);
    if (!unit) return;
    if (kind === 'review-section') {
      const section = unit.sections?.find(section=>section.key===term);
      if (!section) return;
      ids = section.ids;
      label = unit.title+' · '+section.title;
    } else {
      ids = remainingReviewIds(unit,correctQuestionIds());
      label = unit.title+' · 未答对的题';
    }
    back = '#'+route+'/'+id;
  } else if (kind === 'session-mistakes') {
    const session = state.session;
    if (!session || !endOfSession(session)) return;
    ids = missedSessionIds(session);
    label = session.key===key ? session.label : session.label+' · 本组错题';
    back = session.back;
  } else if (kind === 'daily') {
    ids = dailyQuestions(); label = '每日练习'; back = '#home';
  } else if (kind === 'topic') {
    const topic = topicByKey.get(id);
    if (!activeSubjectById.has(topic?.subject.id)) return;
    const level = cleanLevel(term);
    ids = questionsAt(topic,level).map(q=>q.id); label = topic.subject.name+' · '+topic.title+(level==='all'?'':' · '+difficultyName(level)); back = backTarget || '#subject/'+topic.subject.id;
  } else if (kind === 'favorites' || kind === 'favorite-one') {
    ids = kind === 'favorite-one' ? [id] : favoriteIds();
    label = '收藏题复练'; back = '#favorites';
  } else if (kind === 'topic-mistakes') {
    const topic = topicByKey.get(id);
    if (!activeSubjectById.has(topic?.subject.id)) return;
    ids = mistakeIds().filter(qid=>questionById.get(qid).topic===id);
    label = topic.title+' · 错题复练'; back = '#stats';
  } else {
    ids = kind === 'one' ? [id] : mistakeIds();
    label = '错题复练'; back = '#mistakes';
  }
  if (!ids.length || !ids.every(isActiveQuestion)) return;
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
  const ok = answerMatches(q,fields ?? raw);
  current.answers[current.index] = {id:q.id,ok,raw,...(fields?{fields}:{})};
  const now = new Date();
  const time = now.getTime();
  const ref = Array.from(crypto.getRandomValues(new Uint32Array(4)), number=>number.toString(16).padStart(8,'0')).join('');
  state.attempts.push({id:q.id,ok,date:dateKey(now),time,ref});
  if (ok) delete state.mistakes[q.id];
  else state.mistakes[q.id] = {count:(state.mistakes[q.id]?.count??0)+1,time};
  rememberReadingView(current);
  save();
  render();
  document.querySelector('#feedback')?.focus();
}
function materialTable(table) {
  const columns = table.headers.map(header=>'<th scope="col">'+esc(header)+'</th>').join('');
  const rows = table.rows.map(row=>'<tr>'+row.map((value,index)=>{
    if (index===0 && table.rowHeaders!==false) return '<th scope="row">'+esc(value)+'</th>';
    return '<td'+(table.shaded?.includes(value)?' class="material-cell-shaded"':'')+'>'+esc(value)+'</td>';
  }).join('')+'</tr>').join('');
  return '<div class="material-table-scroll"><table><caption>'+esc(table.caption)+'</caption><thead><tr>'+columns+'</tr></thead><tbody>'+rows+'</tbody></table></div>';
}
function numberLineFigure(line) {
  const marks = line.marks.map(([position,label,above])=>'<span class="number-line-mark" aria-hidden="true" style="left:'+position+'%">'+
    (above?'<span class="number-line-above">'+esc(above)+'</span>':'')+
    (label?'<span class="number-line-below">'+esc(label)+'</span>':'')+'</span>').join('');
  return '<figure class="number-line" role="img" aria-label="'+esc(line.description)+'"><span class="number-line-axis" aria-hidden="true">'+marks+'</span></figure>';
}
function readingBlock(session, question) {
  const hasTextOnly = item => item?.material && !item.table && !item.numberLine && !item.diagram;
  if (!hasTextOnly(question)) return null;
  const sameText = id => {
    const item = questionById.get(id);
    return hasTextOnly(item) && item.topic===question.topic && item.material===question.material;
  };
  let first = session.index;
  let last = session.index;
  while (first>0 && sameText(session.ids[first-1])) first--;
  while (last+1<session.ids.length && sameText(session.ids[last+1])) last++;
  return first===last ? null : {key:session.ids[first],number:session.index-first+1,total:last-first+1};
}
function rememberReadingView(session, panel = app.querySelector('[data-reading-block]')) {
  const key = panel?.dataset?.readingBlock;
  if (!session || !key || typeof panel.open!=='boolean') return false;
  if (session.readingView?.key===key && session.readingView.open===panel.open) return false;
  session.readingView = {key,open:panel.open};
  return true;
}
function readingMaterial(question, expanded = false, block = null) {
  const diagram = question.diagram;
  const line = question.numberLine;
  if (!question.material && !question.table && !diagram && !line) return '';
  const title = line ? '查看数轴' : diagram ? '查看示意图' : question.stage==='找规律' ? '查看图形与数据' : question.table ? '查看数据表' : '阅读材料';
  const figure = line ? numberLineFigure(line) : diagram ? '<img class="material-diagram" src="'+esc(diagram.src)+'" alt="'+esc(diagram.alt)+'" width="720" height="360">' : '';
  const key = block ? ' data-reading-block="'+esc(block.key)+'"' : '';
  const progress = block ? '<span class="reading-progress">本篇 '+block.number+' / '+block.total+' 题</span>' : '';
  return '<details class="reading-material" '+(expanded?'open':'')+key+'><summary>'+title+progress+'</summary>'+
    (question.material?'<div>'+esc(question.material)+'</div>':'')+figure+(question.table?materialTable(question.table):'')+'</details>';
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
    const invalid = submitted && !matchesStep(step,values[index]);
    const unit = step.unit ? '<span class="step-unit">'+esc(step.unit)+'</span>' : '';
    const english = step.text === 'english';
    const placeholder = english ? '输入英文' : step.text ? '按题意填词' : step.symbol ? '按题意填符号或字母' : '整数、小数或分数';
    const attributes = ' class="answer-input" id="'+id+'" data-answer-field="'+index+'" autocomplete="off" spellcheck="false" maxlength="'+(english?160:32)+'" placeholder="'+placeholder+'"'+(submitted?' disabled':'')+(invalid?' aria-invalid="true"':'');
    const value = esc(values[index]);
    const field = english && step.answer.length>32 ? '<textarea rows="2"'+attributes+'>'+value+'</textarea>' : '<input type="text"'+attributes+' value="'+value+'">';
    return '<div><label for="'+id+'">'+esc(step.label)+'</label><div class="step-input">'+field+unit+'</div></div>';
  }).join('')+'</div>';
}
function stepReview(question, submitted) {
  const values = fieldValues(question,submitted.fields);
  return '<ul class="dictation-review">'+question.steps.map((step,index)=>{
    const value = values[index];
    const ok = matchesStep(step,value);
    return '<li><strong>'+esc(step.label)+' · '+(ok?'正确':value.trim()?'有误':'未填')+'</strong>'+
      (ok?'':'<span>你的答案　'+(esc(value.trim())||'（空白）')+'</span>')+'<span>正确结果　'+esc(step.answer)+(step.unit?' '+esc(step.unit):'')+'</span></li>';
  }).join('')+'</ul>';
}
function workedSolution(question) {
  if (!question.solution?.length) return '';
  const groups = question.solution.map(({title,lines})=>'<section class="solution-part"><h3>'+esc(title)+'</h3>'+
    lines.map(line=>'<p>'+esc(line)+'</p>').join('')+'</section>').join('');
  return '<details class="worked-solution"><summary>查看完整解题过程</summary>'+groups+'</details>';
}
function quizPage() {
  const s = state.session;
  if (!isActiveSession(s)) return empty('选择一组练习','可以按学科与知识点开始练习。','pencil');
  const reviewBack = reviewCollections.get(s.back.slice(1).split('/')[0]);
  const backLabel = reviewBack?.returnLabel ?? (s.back.startsWith('#mixed') ? '组卷设置' : s.back.startsWith('#learn/') ? '讲解'
    : s.back.startsWith('#course/') ? '本课练习' : s.back.startsWith('#advanced') ? '综合提升' : s.back.startsWith('#packs') ? '专项题组' : ({'#mistakes':'错题本','#home':'首页','#stats':'学习记录','#favorites':'题目收藏'}[s.back] ?? '学科'));
  const back = '<a class="crumb" href="'+s.back+'">返回'+backLabel+'</a>';
  if (endOfSession(s)) {
    const right = s.answers.filter(a=>a.ok).length;
    const wrong = missedSessionIds(s).length;
    const retry = s.key.startsWith('mixed/') ? startButton(s.key,'再出一组','secondary')
      : (/^(mistakes$|session-mistakes$|topic-mistakes\/|review-remaining\/|course\/[^/]+\/remaining$)/.test(s.key) ? '' : startButton(s.key,'再练一遍','secondary','',s.back));
    const nextAction = wrong
      ? '<a class="btn secondary" href="#mistakes">查看错题本</a>'+startButton('session-mistakes','重练本组 '+wrong+' 道错题','primary','notebook')
      : '<a class="btn primary" href="'+s.back+'">返回'+backLabel+'</a>';
    const view = wrong && s.resultView==='mistakes' ? 'mistakes' : 'all';
    const filter = wrong ? '<div class="segmented" role="group" aria-label="答题回顾筛选">'+
      [['all','全部 '+s.answers.length],['mistakes','只看错题 '+wrong]].map(([key,label])=>
        '<button type="button" data-result-filter="'+key+'" aria-controls="answerReviewList" aria-pressed="'+(view===key)+'">'+label+'</button>'
      ).join('')+'</div>' : '';
    const overview = s.answers.map((answer, index)=>{
      const question = questionById.get(answer.id);
      const comparison = question.steps ? stepReview(question,answer) : question.blanks ? dictationReview(question,answer) : '<p>你的答案：'+esc(answer.raw)+'</p><p>正确答案：'+esc(question.correct)+'</p>';
      const explanation = question.explanation ? '<p>'+esc(question.explanation)+'</p>' : '';
      return '<li data-correct="'+answer.ok+'"><details '+(answer.ok?'':'open')+'><summary><span class="result-status '+(answer.ok?'is-correct':'is-wrong')+'">'+(answer.ok?'答对':'答错')+'</span>第 '+(index+1)+' 题 · '+esc(question.prompt)+'</summary>'+readingMaterial(question)+comparison+explanation+workedSolution(question)+'<div class="result-actions">'+favoriteButton(question.id)+lessonLink(question.topic)+'</div></details></li>';
    }).join('');
    return '<section class="quiz">'+pageHead('练习完成',esc(s.label),back)+'<div class="metrics">'+metric('已作答',s.ids.length+' 题','violet','pencil')+metric('答对',right+' 题','green','check')+metric('正确率',percent(right,s.ids.length),'orange','target')+'</div><div class="actions">'+retry+nextAction+'</div>'+
      '<section class="result-review" id="answerReview" data-result-view="'+view+'"><div class="section-head result-review-head"><h2 class="group-title">本组答题回顾</h2>'+filter+'</div><ul id="answerReviewList">'+overview+'</ul></section></section>';
  }
  const q = questionById.get(s.ids[s.index]);
  const topic = topicByKey.get(q.topic);
  const level = questionLevel(q);
  const submitted = s.answers[s.index];
  const block = readingBlock(s,q);
  const expanded = block ? s.readingView?.key!==block.key || s.readingView.open : !submitted;
  const value = submitted?.raw ?? s.selected;
  const options = q.steps ? stepInputs(q,s.selected,submitted) : q.blanks ? dictationInputs(q,s.selected,submitted) : q.options
    ? '<div class="options">'+q.options.map((option,i)=>{
      const status = submitted ? option===q.correct?' correct':option===value?' wrong':'' : '';
      return '<button class="option'+status+'" type="button" data-option="'+i+'" aria-pressed="'+(option===value)+'" '+(submitted?'disabled':'')+'><span>'+String.fromCharCode(65+i)+'</span><span>'+esc(option)+'</span></button>';
    }).join('')+'</div>'
    : '<input class="answer-input" id="answerInput" aria-label="填写答案" placeholder="整数、小数或分数（如 1/2）" autocomplete="off" maxlength="32" value="'+esc(value)+'" '+(submitted?'disabled':'')+'>';
  const comparison = submitted && q.steps ? stepReview(q,submitted) : submitted && q.blanks ? dictationReview(q,submitted) : '<p><b>正确答案</b>　'+esc(q.correct)+'</p>';
  const explanation = q.explanation ? '<p><b>解析</b>　'+esc(q.explanation)+'</p>' : '';
  const feedback = submitted ? '<div class="feedback '+(submitted.ok?'good':'bad')+'" id="feedback" tabindex="-1"><strong>'+(submitted.ok?'答对了！':'答错了，已加入错题本')+'</strong>'+comparison+explanation+workedSolution(q)+lessonLink(q.topic,'crumb feedback-lesson')+'</div>' : '';
  return '<section class="quiz">'+back+'<div class="quiz-meta"><span>'+esc(s.label)+'</span><span>第 '+(s.index+1)+' / '+s.ids.length+' 题</span></div><div class="track" role="progressbar" aria-label="练习进度" aria-valuenow="'+(s.index+(submitted?1:0))+'" aria-valuemax="'+s.ids.length+'"><div style="width:'+100*(s.index+(submitted?1:0))/s.ids.length+'%"></div></div><form class="question" id="questionForm"><div class="quiz-chips"><span class="chip">'+topic.subject.name+' · '+topic.term+'册 · '+(q.steps?'分步填空':q.blanks?'默写填空':q.options?'单选题':'填空题')+'</span><span class="chip level-'+level+'">'+difficultyName(level)+'</span>'+(q.stage?'<span class="chip">'+esc(q.stage)+'</span>':'')+'</div>'+readingMaterial(q,expanded,block)+'<h1>'+esc(q.prompt)+'</h1>'+options+feedback+'<div class="actions quiz-actions">'+favoriteButton(q.id)+(submitted?'<button type="button" class="btn primary" id="nextQuestion">'+(s.index+1===s.ids.length?'查看结果':'下一题')+'</button>':'<button type="submit" class="btn primary" id="submitAnswer" '+(q.steps || q.blanks || value?'':'disabled')+'>提交答案</button>')+'</div></form></section>';
}
function render(moveFocus = false) {
  const [page,subjectId,courseKey] = location.hash.slice(1).split('/');
  const subject = activeSubjectById.get(subjectId);
  const quizNav = ({'#home':'home','#mistakes':'mistakes','#stats':'stats','#favorites':'favorites'})[state.session?.back] ?? 'bank';
  const view = reviewCollections.has(page) ? 'bank' : {bank:'bank',mixed:'bank',difficulty:'bank',advanced:'bank',packs:'bank',subject:'bank',course:'bank',learn:'bank',mistakes:'mistakes',favorites:'favorites',stats:'stats',quiz:quizNav}[page] ?? 'home';
  for (const link of document.querySelectorAll('[data-nav]')) {
    if (link.dataset.nav===view) link.setAttribute('aria-current','page');
    else link.removeAttribute('aria-current');
  }
  document.querySelector('#mistakeBadge').textContent = mistakeIds().length || '';
  if (page==='bank') app.innerHTML = '<div class="bank-header">'+pageHead('学科题库','按学科和册次查看讲解或选择练习。',homeLink)+mixedLink()+'</div>'+courseEntry()+subjectGrid();
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
  else if (page==='course') app.innerHTML = coursePage(subject,courseKey);
  else if (page==='subject' && subject) app.innerHTML = subjectPage(subject);
  else if (page==='learn') {
    const item = topicByKey.get(subjectId);
    const topic = activeSubjectById.has(item?.subject.id) ? item : null;
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
    state.term = button.dataset.term;
    save(); render();
    app.querySelector('[data-term="'+state.term+'"]')?.focus({preventScroll:true});
  } else if (button.dataset.start) {
    start(button.dataset.start,button.dataset.back);
  } else if (button.dataset.resultFilter) {
    const view = button.dataset.resultFilter;
    const review = app.querySelector('#answerReview');
    if (!review || !['all','mistakes'].includes(view)) return;
    review.dataset.resultView = view;
    app.querySelectorAll('[data-result-filter]').forEach(control=>control.setAttribute('aria-pressed',String(control===button)));
    state.session.resultView = view;
    save();
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
  } else if (button.dataset.studySync !== undefined) {
    syncStudyRecords();
  } else if (button.dataset.option !== undefined) {
    const s = state.session;
    const q = questionById.get(s.ids[s.index]);
    s.selected = q.options[Number(button.dataset.option)];
    save();
    app.querySelectorAll('[data-option]').forEach(el=>el.setAttribute('aria-pressed',String(el===button)));
    document.querySelector('#submitAnswer').disabled = false;
  } else if (button.id==='nextQuestion') {
    rememberReadingView(state.session);
    state.session.index++;
    state.session.selected='';
    save(); render(true);
  }
});
app.addEventListener('toggle',event=>{
  const panel = event.target;
  if (panel.dataset?.readingBlock && app.contains(panel) && rememberReadingView(state.session,panel)) save();
},true);
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
function searchScore(entry, terms) {
  let score = 0;
  for (const term of terms) {
    const numbered = /^(day|unit)\d+$/.test(term);
    const matches = text=>numbered ? text.split(/[^a-z0-9]+/).includes(term) : text.includes(term);
    if (matches(entry.title)) score += 8;
    else if (matches(entry.scope)) score += 4;
    else if (matches(entry.detail)) score += 1;
    else return 0;
  }
  return score;
}
const phraseScopeWords = new Set(['英语','七上','七上英语','英语上册','重点词组','英语重点词组','词组','短语','短语默写','词组默写']);
function findPhrases(query) {
  const words = query.replace(/第\s*(\d+)\s*单元/g,'unit$1').split(/\s+/);
  const unitToken = words.find(word=>/^unit\d+$/.test(word));
  const unitNumber = unitToken ? Number(unitToken.slice(4)) : null;
  const body = words.filter(word=>word!==unitToken && !phraseScopeWords.has(word)).join(' ');
  const needle = phraseSearchKey(body);
  if (!needle || /^[a-z]$/.test(needle)) return [];
  const itemNumber = unitToken && /^第?\s*(\d+)\s*(?:条|题)?$/.exec(needle);
  const terms = needle.split(' ');
  const contains = (value,term) => /\p{Script=Han}/u.test(term) ? value.includes(term) : (' '+value+' ').includes(' '+term+' ');
  return phraseSearchIndex.flatMap(entry=>{
    if (unitNumber!==null && entry.unit.unit!==unitNumber) return [];
    if (itemNumber) return entry.number===Number(itemNumber[1]) ? [{entry,score:3}] : [];
    if (entry.values.includes(needle)) return [{entry,score:3}];
    if (entry.values.some(value=>contains(value,needle))) return [{entry,score:2}];
    if (terms.length>1 && terms.every(term=>entry.values.some(value=>contains(value,term)))) return [{entry,score:1}];
    return [];
  }).sort((left,right)=>right.score-left.score).slice(0,8);
}
function search() {
  const query = normalizeSearch(searchInput.value);
  const terms = query ? [...new Set(query.split(/\s+/))] : [];
  const found = terms.length ? topicSearchIndex
    .map(entry=>({topic:entry.topic, score:searchScore(entry,terms)}))
    .filter(result=>result.score>0).sort((a,b)=>b.score-a.score).slice(0,14).map(result=>result.topic) : [];
  const topics = found.map(t=>{
    const hasLesson = !!studyHref(t.key);
    const result = '<button class="search-result option" type="button" data-key="'+t.key+'" data-search-action="'+(hasLesson?'learn':'practice')+'"><div><strong>'+t.title+'</strong><small>'+t.subject.name+' · '+t.term+'册'+(hasLesson?' · 看讲解':'')+'</small></div></button>';
    const practice = hasLesson ? '<button class="btn secondary" type="button" data-key="'+t.key+'" data-search-action="practice" aria-label="练习'+esc(t.title)+'">做练习</button>' : '';
    return '<div class="search-entry">'+result+practice+'</div>';
  }).join('');
  const matches = terms.length ? findPhrases(query) : [];
  const phrases = matches.map(({entry:{question,unit}})=>{
    const action = '<button class="search-result option" type="button" data-phrase-id="'+question.id+'"><strong>'+esc(question.prompt)+'</strong>'+
      '<small>'+esc(question.correct)+'</small><small>Unit '+unit.unit+' · 默写这条</small></button>';
    const lesson = '<button class="btn secondary" type="button" data-key="'+unit.key+'" data-search-action="learn" aria-label="查看 '+esc(unit.title)+'">看本单元</button>';
    return '<div class="search-entry">'+action+lesson+'</div>';
  }).join('');
  const courseMatches = terms.length ? courseSearchIndex.map(entry=>({...entry,score:searchScore(entry,terms)}))
    .filter(entry=>entry.score>=8 && terms.some(term=>entry.title.includes(term)))
    .sort((a,b)=>b.score-a.score).slice(0,5) : [];
  const courses = courseMatches.map(({course,name})=>
    '<div class="search-entry"><button class="search-result option" type="button" data-search-course="'+course.key+'"><strong>'+
    esc(course.title)+'</strong><small>'+name+' · '+course.term+'册 · '+course.ids.length+' 题</small></button></div>').join('');
  const courseGroup = courses ? '<h3 class="search-heading">按课练习</h3>'+courses : '';
  const topicGroup = topics && (phrases || courses) ? '<h3 class="search-heading">知识点</h3>'+topics : topics;
  const phraseGroup = phrases ? '<h3 class="search-heading">重点词组</h3>'+phrases : '';
  results.innerHTML = (matches[0]?.score===3 ? phraseGroup+courseGroup+topicGroup : courseGroup+topicGroup+phraseGroup) ||
    '<p class="scope" role="status">'+(query?'没有找到匹配的知识点或词组。':'试试「英语 Day 11」「保持健康」或「Unit 3 第 44 条」。')+'</p>';
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
searchInput.addEventListener('keydown',event=>{
  if (event.key==='Enter' && !event.isComposing) {
    event.preventDefault();
    results.querySelector('.search-result')?.click();
  }
});
dialog.addEventListener('click',event=>{
  if (event.target===dialog) {
    const rect=dialog.getBoundingClientRect();
    if (event.clientX<rect.left || event.clientX>rect.right || event.clientY<rect.top || event.clientY>rect.bottom) dialog.close();
  }
  const button = event.target.closest('[data-key], [data-phrase-id], [data-search-course]');
  if (!button) return;
  dialog.close();
  if (button.dataset.phraseId) {
    start('phrase/'+button.dataset.phraseId);
    return;
  }
  if (button.dataset.searchCourse) {
    location.hash = courseByKey.get(button.dataset.searchCourse).href;
    return;
  }
  const key = button.dataset.key;
  if (button.dataset.searchAction === 'learn') location.hash = studyHref(key);
  else {
    state.term = topicByKey.get(key).term;
    start('topic/'+key,studyHref(key));
  }
});
window.addEventListener('keydown',event=>{
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase()==='k') {
    event.preventDefault(); openSearch();
  }
});
window.addEventListener('hashchange',()=>render(true));
render();
