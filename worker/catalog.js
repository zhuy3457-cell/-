const SITE_URL = 'https://suxue-grade7-practice.myworkspace-8202.chatgpt.site/';
const subjectNames = new Map(STUDY.subjects.map(({id,name})=>[id,name]));
const questions = new Map(STUDY.questions.map(question=>[question.id,question]));
const topics = new Map(STUDY.topics.map(topic=>[topic.key,topic]));
const courseTopics = new Map(STUDY.courses.map(course=>[course.key,course]));
const scopeList = [
  ...STUDY.courses.map(course=>({...course,kind:'course',subject:course.subjectId})),
  ...STUDY.topics.filter(topic=>subjectNames.has(topic.subject)).map(topic=>({...topic,kind:'topic'})),
  ...STUDY.packs.map(pack=>({...pack,kind:'pack'}))
];
const scopes = new Map(scopeList.map(scope=>[scope.kind+':'+scope.key,scope]));
const levels = ['basic','standard','challenge'];
const levelNames = {basic:'基础',standard:'进阶',challenge:'挑战'};
const normalizeCatalog = value=>value.normalize('NFKC').toLowerCase().replace(/[\p{P}\s]/gu,'');
const publicLink = href=>href ? new URL(href,SITE_URL).href : null;
const subjectPrefixes = [...STUDY.subjects.map(({id,name})=>[name,id]),
  ['道法','civics'],['生物','biology'],['政治','civics']].sort((a,b)=>b[0].length-a[0].length);
const termPrefix = /^(?:(?:七年级|初一)([上下])(?:册|学期)?|七([上下])(?:册)?|([上下])(?:册|学期))/;
const englishUnit = /^(?:第)?([一二三四五六七八1-8])单元$/;
const maxExcludedQuestions = 300;

class StudyError extends Error {}

function textValue(value, label, limit, required = false) {
  if (value===undefined && !required) return '';
  if (typeof value!=='string' || value.length>limit || (required && !value.trim())) {
    throw new StudyError(label+'应为'+(required?'非空':'')+'文本，最多 '+limit+' 字。');
  }
  return value.trim();
}
function validSubject(value) {
  if (value===undefined) return 'math';
  if (typeof value==='string' && subjectNames.has(value)) return value;
  const named = STUDY.subjects.find(subject=>subject.name===value);
  if (named) return named.id;
  throw new StudyError('当前开放的学科有语文、数学、英语、道德与法治、历史、地理和生物学。');
}
function ensureStudySubject(subject) {
  if (!subjectNames.has(subject)) throw new StudyError('该学科的练习入口已停用，已有学习记录会保留。');
}
function validTerm(value) {
  if (value===undefined || value==='all') return null;
  if (value==='上' || value==='下') return value;
  throw new StudyError('册次应为「上」「下」或 all。');
}
function validCount(value, fallback, maximum) {
  if (value===undefined) return fallback;
  if (!Number.isInteger(value) || value<1 || value>maximum) throw new StudyError('题量应在 1 到 '+maximum+' 之间。');
  return value;
}
function scopeMatches(scope,subject,term) {
  if (scope.subject) return scope.subject===subject && (!term || scope.term===term);
  return scope.ids.some(id=>{
    const question = questions.get(id);
    return question.subject===subject && (!term || topics.get(question.topic).term===term);
  });
}
function scopeSummary(scope,subject,term) {
  return {
    scope_id:scope.kind+':'+scope.key,
    type:scope.kind,
    title:scope.title,
    term:scope.term ?? null,
    description:scope.description ?? '',
    question_count:scope.ids.filter(id=>{
      const question = questions.get(id);
      return question.subject===subject && (!term || topics.get(question.topic).term===term);
    }).length,
    url:publicLink(scope.href ?? '#subject/'+subject)
  };
}
function courseRequest(args) {
  let keyword = normalizeCatalog(textValue(args.query,'搜索词',100));
  const leadingTerm = termPrefix.exec(keyword);
  if (leadingTerm) keyword = keyword.slice(leadingTerm[0].length);
  const named = subjectPrefixes.find(([name])=>keyword.startsWith(name));
  if (named) keyword = keyword.slice(named[0].length);
  const embeddedTerm = !leadingTerm && termPrefix.exec(keyword);
  if (embeddedTerm) keyword = keyword.slice(embeddedTerm[0].length);
  const inferredTerm = (leadingTerm || embeddedTerm || []).slice(1).find(Boolean);
  const term = validTerm(args.term);
  if (term && inferredTerm && term!==inferredTerm) throw new StudyError('所选册次与搜索词中的册次不同。');
  const explicitSubject = args.subject===undefined ? null : validSubject(args.subject);
  if (explicitSubject && named && explicitSubject!==named[1]) throw new StudyError('所选学科与搜索词中的学科不同。');
  const subject = explicitSubject ?? named?.[1] ?? scopes.get(args.scope_id)?.subject ?? 'math';
  const unit = subject==='english' && englishUnit.exec(keyword);
  if (unit) keyword = 'unit'+(Number(unit[1]) || ('一二三四五六七八'.indexOf(unit[1])+1));
  return {subject,term:term ?? inferredTerm ?? null,keyword};
}
function matchingScopes(subject,term,keyword) {
  return scopeList.filter(scope=>scopeMatches(scope,subject,term) &&
    (scope.kind!=='topic' || courseTopics.get(scope.key)?.title!==scope.title)).map(scope=>{
    const title = normalizeCatalog(scope.title);
    const key = normalizeCatalog(scope.key);
    const description = normalizeCatalog(scope.description ?? '');
    const relevance = !keyword ? 1 : title===keyword || key===keyword ? 5 : title.includes(keyword) || key.includes(keyword) ? 3 : description.includes(keyword) ? 1 : 0;
    return {scope,relevance};
  }).filter(item=>item.relevance).sort((a,b)=>b.relevance-a.relevance);
}
function queryCourses(args) {
  const {subject,term,keyword} = courseRequest(args);
  const limit = validCount(args.limit,15,35);
  const matches = matchingScopes(subject,term,keyword);
  return {subject:subjectNames.get(subject),term:term ?? '上、下册',total:matches.length,
    results:matches.slice(0,limit).map(({scope})=>scopeSummary(scope,subject,term))};
}
function getScope(id,subject,term,required = false) {
  if (id===undefined && !required) return null;
  const key = textValue(id,'范围编号',120,true);
  const scope = scopes.get(key);
  if (!scope || !scopeMatches(scope,subject,term)) {
    throw new StudyError('找不到该学科和册次下的范围。先用 query_courses 查找 scope_id。');
  }
  return scope;
}
function courseSelection(args,required) {
  const {subject,term,keyword} = courseRequest(args);
  const selection = scope=>({subject,term:term ?? scope?.term ?? null,scope});
  if (args.scope_id!==undefined || !keyword) return selection(getScope(args.scope_id,subject,term,required));
  const matches = matchingScopes(subject,term,keyword);
  if (!matches.length) throw new StudyError('找不到匹配的课程。请换个搜索词，或用 query_courses 查看目录。');
  const best = matches[0];
  const tied = matches.filter(item=>item.relevance===best.relevance);
  const preferred = tied.filter(({scope})=>scope.kind==='course' && normalizeCatalog(scope.title)===keyword);
  if (preferred.length===1) return selection(preferred[0].scope);
  if (tied.length>1) {
    const titles = tied.slice(0,4).map(({scope})=>scope.title+(scope.term ? '（'+scope.term+'册）' : ''));
    throw new StudyError('有多个匹配范围，请选一个：'+titles.join('、')+'。也可用 query_courses 查看编号。');
  }
  return selection(best.scope);
}
function lessonNotes(topic) {
  if (topic.lesson) {
    const [concept,caution,example,answer,reasoning] = topic.lesson;
    return {topic:topic.title,concept,caution,example,answer,reasoning};
  }
  if (topic.review?.length) {
    return {topic:topic.title,notes:topic.review.slice(0,4).map(note=>({
      title:note.label,
      detail:note.text ?? note.points?.slice(0,4)
    }))};
  }
  return null;
}
function explainTopic(args) {
  const {subject,term,scope} = courseSelection(args,true);
  const candidates = scope.kind==='topic' ? [scope] : (scope.studyKeys ?? []).map(key=>topics.get(key)).filter(Boolean);
  const teaching = candidates.map(lessonNotes).filter(Boolean).slice(0,4);
  return {...scopeSummary(scope,subject,term),teaching,
    practice_groups:scope.groups?.map(group=>({group_id:group.key,title:group.title,question_count:group.ids.length})),
    ...(scope.shortAnswers?.length ? {short_answer_tasks:scope.shortAnswers} : {}),
    sources:scope.sources ?? [],
    ...(teaching.length ? {} : {guidance:'该范围提供练习。可先随机抽取一道，作答后通过批改工具查看例题解析。'})};
}
function poolFor(args,requireScope = false) {
  const {subject,term,scope} = courseSelection(args,requireScope);
  const level = args.difficulty ?? 'all';
  if (level!=='all' && !levels.includes(level)) throw new StudyError('难度应为 basic、standard、challenge 或 all。');
  const groupKey = textValue(args.group_id,'题组编号',150);
  const group = groupKey && scope?.groups?.find(item=>item.key===groupKey);
  if (groupKey && !group) throw new StudyError('找不到该题组。可先用 explain_topic 查询题组编号。');
  const pool = (group?.ids ?? scope?.ids ?? STUDY.questions.map(item=>item.id)).map(id=>questions.get(id))
    .filter(question=>question.subject===subject && (!term || topics.get(question.topic).term===term) &&
      (level==='all' || (question.level ?? 'basic')===level));
  const excluded = args.exclude_question_ids ?? [];
  if (!Array.isArray(excluded) || excluded.length>maxExcludedQuestions ||
      excluded.some(id=>typeof id!=='string' || !id.length || id.length>120)) {
    throw new StudyError('已出题号必须是数组，最多 '+maxExcludedQuestions+' 条。');
  }
  return {subject,term,scope,group,pool,excluded:new Set(excluded)};
}
function publicDiagram(diagram) {
  return {url:publicLink(diagram.src),alt:diagram.alt,
    ...(diagram.caption ? {caption:diagram.caption} : {}),
    ...(diagram.source ? {source_url:diagram.source,credit:diagram.credit} : {})};
}
function questionView(question) {
  const topic = topics.get(question.topic);
  return {
    question_id:question.id,
    subject:subjectNames.get(question.subject),
    term:topic.term,
    topic:topic.title,
    difficulty:levelNames[question.level ?? 'basic'],
    prompt:question.prompt,
    ...(question.options ? {options:question.options.map((text,index)=>({option:String.fromCharCode(65+index),text}))} : {}),
    ...(question.steps ? {fields:question.steps.map(step=>({label:step.label,unit:step.unit}))} : {}),
    ...(question.blanks ? {blank_count:question.blanks.length} : {}),
    material:question.material,
    table:question.table,
    number_line:question.numberLine,
    ...(question.diagram ? {diagram:publicDiagram(question.diagram)} : {})
  };
}
function sample(pool,count) {
  const result = pool.slice();
  for (let i=0;i<Math.min(count,result.length);i++) {
    const index = i+Math.floor(Math.random()*(result.length-i));
    [result[i],result[index]] = [result[index],result[i]];
  }
  return result.slice(0,count);
}
function makePractice(selection,count,mode,view = questionView) {
  const {scope,group,pool,subject,term,excluded} = selection;
  const eligible = excluded.size ? pool.filter(item=>!excluded.has(item.id)) : pool;
  const picked = sample(eligible,count);
  return {subject:subjectNames.get(subject),term:term ?? '上、下册',scope:scope?.title ?? '全学科范围',
    group:group?.title,mode,available:eligible.length,remaining:eligible.length-picked.length,
    questions:picked.map(view)};
}
