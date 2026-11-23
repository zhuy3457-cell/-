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
let state = {term:'上', attempts:[], mistakes:{}, session:null};
try {
  const saved = JSON.parse(localStorage.getItem(storageKey));
  if (saved) state = {...state, ...saved};
} catch {}
if (!['上','下'].includes(state.term)) state.term = '上';
let storageFailed = false;
function save() {
  try { localStorage.setItem(storageKey, JSON.stringify(state)); }
  catch { storageFailed = true; }
}
const esc = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const dateKey = (date = new Date()) => [date.getFullYear(), String(date.getMonth()+1).padStart(2,'0'), String(date.getDate()).padStart(2,'0')].join('-');
const mistakeIds = () => Object.keys(state.mistakes).filter(id => questionById.has(id));
const endOfSession = s => s.index >= s.ids.length;
const percent = (right,total) => total ? Math.round(right / total * 100) + '%' : '—';
const termName = () => '七年级' + state.term + '册';
const startButton = (key, label, style = 'primary', symbol = '') => '<button type="button" class="btn '+style+'" data-start="'+key+'">'+(symbol ? icon(symbol) : '')+label+'</button>';
const pageHead = (title, sub, back = '') => '<div class="page-head">'+back+'<h1>'+title+'</h1><p>'+sub+'</p></div>';
const homeLink = '<a class="crumb" href="#home">学习首页</a>';
const mixedLink = (subjectId = '', label = '自选组卷') => '<a class="btn secondary" href="#mixed'+(subjectId ? '/'+subjectId : '')+'">'+icon('layers')+label+'</a>';
const bankLink = '<a class="crumb" href="#bank">学科题库</a>';
const termTabs = () => '<div class="segmented" role="group" aria-label="选择册次">'+['上','下'].map(term => '<button type="button" data-term="'+term+'" aria-pressed="'+(state.term === term)+'">'+term+'册</button>').join('')+'</div>';
function topicsIn(subject, term = state.term) { return subject.topics.filter(topic => topic.term === term); }
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
function mixedQuestions(id, term, count) {
  const selectedSubjects = id === 'all' ? shuffled(subjects.filter(subject => !subject.extra)) : [subjects.find(subject => subject.id === id)];
  const queues = selectedSubjects.map(subject => shuffled(topicsIn(subject, term)).map(topic => shuffled(topic.questions)));
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
function mixedCounts(id, term) {
  const total = mixedTopics(id, term).reduce((sum, topic) => sum + topic.questions.length, 0);
  const sizes = [5, 10, 15].filter(size => size < Math.min(total, 20));
  return {total, sizes: [...sizes, Math.min(total, 20)]};
}
function mixedOptions(id, term, desired = 10) {
  const {total, sizes} = mixedCounts(id, term);
  const selected = sizes.includes(desired) ? desired : sizes.includes(10) ? 10 : sizes.at(-1);
  return {
    options: sizes.map(size => '<option value="'+size+'" '+(size===selected?'selected':'')+'>'+size+' 题</option>').join(''),
    description: '当前范围有 '+total+' 道题，组卷时会优先覆盖不同知识点。'
  };
}
function mixedPage(subject) {
  const id = subject?.id ?? 'all';
  const {options, description} = mixedOptions(id, state.term);
  return pageHead('自选组卷','选择范围和题量，练习后查看每道题的结果。',bankLink)+
    '<form class="mix-form" id="mixedForm"><div class="mix-fields">'+
    '<label>学科<select name="subject"><option value="all">核心学科混合</option>'+subjects.map(item=>'<option value="'+item.id+'" '+(item.id===id?'selected':'')+'>'+item.name+'</option>').join('')+'</select></label>'+
    '<label>册次<select name="term">'+['上','下'].map(term=>'<option value="'+term+'" '+(term===state.term?'selected':'')+'>七年级'+term+'册</option>').join('')+'</select></label>'+
    '<label>题量<select name="count">'+options+'</select></label></div>'+
    '<p id="mixDescription" class="scope" aria-live="polite">'+description+'</p><div class="actions"><button class="btn primary" type="submit">'+icon('pencil')+'开始做题</button></div></form>';
}
function metric(title, value, tone, glyph) {
  return '<div class="metric"><span class="metric-icon '+tone+'">'+icon(glyph)+'</span><div class="metric-text"><small>'+title+'</small><strong>'+value+'</strong></div></div>';
}
function subjectCard(subject) {
  const topics = topicsIn(subject);
  return '<a class="subject-card" href="#subject/'+subject.id+'"><div class="subject-head"><span class="subject-icon '+subject.tone+'">'+icon(subject.icon)+'</span><h3>'+subject.name+'</h3></div><div class="subject-topics">'+topics.map(t => t.title).join(' · ')+'</div><div class="subject-foot"><span>'+topics.length+' 个知识点 · '+topics.reduce((sum,t) => sum+t.questions.length,0)+' 题</span><strong>开始练习</strong></div></a>';
}
function subjectGrid() {
  return '<section id="subjectList" aria-labelledby="subjectTitle"><div class="section-head"><div><h2 id="subjectTitle">选择学科</h2><p>'+termName()+' · 按知识点专项练习</p></div>'+termTabs()+'</div><div class="subject-grid">'+subjects.filter(s => !s.extra).map(subjectCard).join('')+'</div><details class="extras" id="extraSubjects"><summary>体育、艺术与实践课程</summary><div class="subject-grid">'+subjects.filter(s => s.extra).map(subjectCard).join('')+'</div></details><p class="scope">题目按江苏七年级常见知识点编排，册次安排以各校教材为准。<a href="https://jyt.jiangsu.gov.cn/art/2024/1/18/art_88010_11138172.html" target="_blank" rel="noopener">江苏省教材选用说明</a></p></section>';
}
function home() {
  const daily = state.attempts.filter(item => item.date === dateKey());
  const continuation = state.session && !endOfSession(state.session)
    ? '<a class="btn secondary" href="#quiz">'+icon('book')+'继续上次练习</a>'
    : mixedLink();
  return '<section class="hero"><img class="hero-art" src="workbook.webp" alt="" fetchpriority="high"><div class="hero-content"><span class="pill">'+icon('book')+'江苏 · 初一全科</span><h1>今天想练哪一科？</h1><p>同步练知识点，做完就看解析。<br>从每天 5 道题开始。</p><div class="hero-actions">'+startButton('daily','每日练习','primary','bolt')+continuation+(state.session && !endOfSession(state.session) ? '<a class="quick-link" href="#mixed">自选组卷</a>' : '')+'</div></div></section><div class="metrics" aria-label="今日学习概况">'+metric('今日已练',daily.length+' 题','violet','pencil')+metric('今日正确率',percent(daily.filter(x=>x.ok).length,daily.length),'green','target')+metric('待复练错题',mistakeIds().length+' 题','orange','notebook')+'</div>'+subjectGrid();
}
function subjectPage(subject) {
  const topics = topicsIn(subject);
  const done = new Set(state.attempts.filter(a=>a.ok).map(a=>a.id));
  return pageHead(subject.name, termName()+' · 选择知识点开始练习',bankLink)+'<section><div class="section-head"><h2 class="group-title">知识点练习</h2>'+'<div class="section-actions">'+mixedLink(subject.id,'本学科组卷')+termTabs()+'</div></div><div class="topic-list">'+topics.map(topic=>{
    const mastered = topic.questions.filter(q=>done.has(q.id)).length;
    return '<div class="row"><div><h3>'+topic.title+'</h3><p>'+topic.description+'</p><p>已答对 '+mastered+' / '+topic.questions.length+' 题</p></div>'+startButton('topic/'+topic.key,'开始练习')+'</div>';
  }).join('')+'</div></section>';
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
    priorityReview()+'<div class="section-head"><h2>分科进度</h2></div><div class="topic-list">'+subjects.map(subject => {
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
function start(key) {
  let ids, label, back;
  const [kind, id, term, count] = key.split('/');
  if (state.session?.key === key && !endOfSession(state.session)) {
    location.hash = 'quiz';
    return;
  }
  if (kind === 'mixed') {
    ids = mixedQuestions(id, term, Number(count));
    const name = id === 'all' ? '核心学科混合' : subjects.find(subject=>subject.id===id).name;
    label = name+' · '+term+'册组卷'; back = '#mixed'+(id==='all'?'':'/'+id);
  } else if (kind === 'daily') {
    ids = dailyQuestions(); label = '每日练习'; back = '#home';
  } else if (kind === 'topic') {
    const topic = topicByKey.get(id);
    ids = topic.questions.map(q=>q.id); label = topic.subject.name+' · '+topic.title; back = '#subject/'+topic.subject.id;
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
  const raw = q.options ? current.selected : document.querySelector('#answerInput').value.trim();
  if (!raw || current.answers[current.index]) return;
  const normalized = raw.normalize('NFKC').replace(/[−–—]/g,'-').trim();
  const numeric = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(normalized);
  const ok = q.options ? raw === q.correct : numeric && Number(normalized) === Number(q.correct);
  current.answers[current.index] = {id:q.id,ok,raw};
  state.attempts.push({id:q.id,ok,date:dateKey()});
  if (ok) delete state.mistakes[q.id];
  else state.mistakes[q.id] = {count:(state.mistakes[q.id]?.count??0)+1,time:Date.now()};
  save();
  render();
  document.querySelector('#feedback')?.focus();
}
function quizPage() {
  const s = state.session;
  if (!s || !s.ids.every(id=>questionById.has(id))) return empty('选择一组练习','可以按学科与知识点开始练习。','pencil');
  const backLabel = s.back.startsWith('#mixed') ? '组卷设置'
    : ({'#mistakes':'错题本','#home':'首页','#stats':'学习记录'}[s.back] ?? '学科');
  const back = '<a class="crumb" href="'+s.back+'">返回'+backLabel+'</a>';
  if (endOfSession(s)) {
    const right = s.answers.filter(a=>a.ok).length;
    const retry = s.key.startsWith('mixed/') ? startButton(s.key,'再出一组','secondary')
      : (/^(mistakes$|topic-mistakes\/)/.test(s.key) ? '' : startButton(s.key,'再练一遍','secondary'));
    const overview = s.answers.map((answer, index)=>{
      const question = questionById.get(answer.id);
      return '<li><details '+(answer.ok?'':'open')+'><summary><span class="result-status '+(answer.ok?'is-correct':'is-wrong')+'">'+(answer.ok?'答对':'答错')+'</span>第 '+(index+1)+' 题 · '+esc(question.prompt)+'</summary><p>你的答案：'+esc(answer.raw)+'</p><p>正确答案：'+esc(question.correct)+'</p><p>'+esc(question.explanation)+'</p></details></li>';
    }).join('');
    return '<section class="quiz">'+pageHead('练习完成',esc(s.label),back)+'<div class="metrics">'+metric('已作答',s.ids.length+' 题','violet','pencil')+metric('答对',right+' 题','green','check')+metric('正确率',percent(right,s.ids.length),'orange','target')+'</div><div class="actions">'+retry+(right<s.ids.length?'<a class="btn primary" href="#mistakes">查看错题本</a>':'<a class="btn primary" href="'+s.back+'">返回'+backLabel+'</a>')+'</div><section class="result-review"><h2 class="group-title">本组答题回顾</h2><ul>'+overview+'</ul></section></section>';
  }
  const q = questionById.get(s.ids[s.index]);
  const topic = topicByKey.get(q.topic);
  const submitted = s.answers[s.index];
  const value = submitted?.raw ?? s.selected;
  const options = q.options
    ? '<div class="options">'+q.options.map((option,i)=>{
      const status = submitted ? option===q.correct?' correct':option===value?' wrong':'' : '';
      return '<button class="option'+status+'" type="button" data-option="'+i+'" aria-pressed="'+(option===value)+'" '+(submitted?'disabled':'')+'><span>'+String.fromCharCode(65+i)+'</span><span>'+esc(option)+'</span></button>';
    }).join('')+'</div>'
    : '<input class="answer-input" id="answerInput" aria-label="填写答案" placeholder="输入数字" autocomplete="off" value="'+esc(value)+'" '+(submitted?'disabled':'')+'>';
  const feedback = submitted ? '<div class="feedback '+(submitted.ok?'good':'bad')+'" id="feedback" tabindex="-1"><strong>'+(submitted.ok?'答对了！':'答错了，已加入错题本')+'</strong><p><b>正确答案</b>　'+esc(q.correct)+'</p><p><b>解析</b>　'+esc(q.explanation)+'</p></div>' : '';
  return '<section class="quiz">'+back+'<div class="quiz-meta"><span>'+esc(s.label)+'</span><span>第 '+(s.index+1)+' / '+s.ids.length+' 题</span></div><div class="track" role="progressbar" aria-label="练习进度" aria-valuenow="'+(s.index+(submitted?1:0))+'" aria-valuemax="'+s.ids.length+'"><div style="width:'+100*(s.index+(submitted?1:0))/s.ids.length+'%"></div></div><form class="question" id="questionForm"><span class="chip">'+topic.subject.name+' · '+topic.term+'册 · '+(q.options?'单选题':'填空题')+'</span><h1>'+esc(q.prompt)+'</h1>'+options+feedback+'<div class="actions">'+(submitted?'<button type="button" class="btn primary" id="nextQuestion">'+(s.index+1===s.ids.length?'查看结果':'下一题')+'</button>':'<button type="submit" class="btn primary" id="submitAnswer" '+(value?'':'disabled')+'>提交答案</button>')+'</div></form></section>';
}
function render(moveFocus = false) {
  const [page,subjectId] = location.hash.slice(1).split('/');
  const subject = subjects.find(s=>s.id===subjectId);
  const quizNav = ({'#home':'home','#mistakes':'mistakes','#stats':'stats'})[state.session?.back] ?? 'bank';
  const view = {bank:'bank',mixed:'bank',subject:'bank',mistakes:'mistakes',stats:'stats',quiz:quizNav}[page] ?? 'home';
  for (const link of document.querySelectorAll('[data-nav]')) {
    if (link.dataset.nav===view) link.setAttribute('aria-current','page');
    else link.removeAttribute('aria-current');
  }
  document.querySelector('#mistakeBadge').textContent = mistakeIds().length || '';
  if (page==='bank') app.innerHTML = '<div class="bank-header">'+pageHead('学科题库','按学科、册次和知识点选择练习。',homeLink)+mixedLink()+'</div>'+subjectGrid();
  else if (page==='mixed') app.innerHTML = mixedPage(subject);
  else if (page==='subject' && subject) app.innerHTML = subjectPage(subject);
  else if (page==='mistakes') app.innerHTML = mistakePage();
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
    start(button.dataset.start);
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
  if (event.target.id==='answerInput') {
    state.session.selected=event.target.value;
    document.querySelector('#submitAnswer').disabled=!event.target.value.trim();
    save();
  }
});
app.addEventListener('change',event=>{
  const form = event.target.closest('#mixedForm');
  if (!form || !['subject','term'].includes(event.target.name)) return;
  const {subject,term,count} = form.elements;
  const {options,description} = mixedOptions(subject.value,term.value,Number(count.value));
  count.innerHTML = options;
  document.querySelector('#mixDescription').textContent = description;
});
app.addEventListener('submit',event=>{
  if (event.target.id==='mixedForm') {
    event.preventDefault();
    const {subject,term,count} = event.target.elements;
    state.term = term.value;
    start('mixed/'+subject.value+'/'+term.value+'/'+count.value);
    return;
  }
  if (event.target.id!=='questionForm') return;
  event.preventDefault();
  const s=state.session;
  if (!s.answers[s.index]) answer(s,questionById.get(s.ids[s.index]));
});
function search() {
  const query=searchInput.value.trim().toLowerCase();
  const found = query ? allTopics.filter(t=>[t.subject.name,t.title,t.description].some(s=>s.toLowerCase().includes(query))).slice(0,14) : [];
  results.innerHTML = found.map(t=>'<button class="search-result option" type="button" data-key="'+t.key+'"><div><strong>'+t.title+'</strong><small>'+t.subject.name+' · '+t.term+'册 · '+t.questions.length+' 题</small></div></button>').join('') ||
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
  state.term = topicByKey.get(button.dataset.key).term;
  start('topic/'+button.dataset.key);
});
window.addEventListener('keydown',event=>{
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase()==='k') {
    event.preventDefault(); openSearch();
  }
});
window.addEventListener('hashchange',()=>render(true));
render();
