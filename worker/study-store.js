function requireOwner(request) {
  const owner = request.headers.get('oai-authenticated-user-id');
  if (!owner) throw new StudyError('请先用 ChatGPT 账号连接助手或登录练习室，再使用个人学习记录。');
  return owner;
}
function studyDb(env) {
  if (!env.DB) throw new StudyError('学习记录存储尚不可用，浏览器里的原有记录仍可使用。');
  return env.DB;
}
const calendarDate = new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'});
function eventTime(date,time) {
  return time ?? Date.parse(date+'T00:00:00+08:00');
}
function validStudyDate(date) {
  if (typeof date!=='string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const parsed = new Date(date+'T00:00:00Z');
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0,10)===date;
}
function backupRows(items) {
  if (!Array.isArray(items) || items.length>200) throw new StudyError('每次最多同步 200 条答题记录。');
  return items.flatMap(item=>{
    if (!item || typeof item.id!=='string' || typeof item.ref!=='string' ||
        !item.ref || item.ref.length>150 || typeof item.ok!=='boolean' || !validStudyDate(item.date) ||
        (item.time!==undefined && (!Number.isSafeInteger(item.time) || item.time<0))) {
      throw new StudyError('备份中含有无法识别的答题记录。');
    }
    const question = questions.get(item.id);
    if (!question) return [];
    return [{ref:item.ref,id:item.id,subject:question.subject,term:topics.get(question.topic).term,
      ok:item.ok,date:item.date,time:eventTime(item.date,item.time)}];
  });
}
async function insertAttempts(env,owner,rows) {
  if (!rows.length) return 0;
  const db = studyDb(env);
  const sql = `INSERT INTO study_attempts
    (owner_id,attempt_ref,question_id,subject_id,term,correct,study_date,submitted_at,homework_prompt,homework_reference,homework_explanation)
    VALUES (?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(owner_id,attempt_ref) DO NOTHING`;
  let inserted = 0;
  for (let i=0;i<rows.length;i+=40) {
    const batch = rows.slice(i,i+40).map(row=>db.prepare(sql).bind(owner,row.ref,row.id,row.subject,row.term,
      Number(row.ok),row.date,row.time,row.prompt ?? null,
      row.reference===undefined ? null : JSON.stringify(row.reference),row.explanation ?? null));
    const results = await db.batch(batch);
    inserted += results.reduce((count,result)=>count+(result.meta?.changes ?? 0),0);
  }
  return inserted;
}
async function savedHomework(env,owner,id) {
  if (!/^homework-[a-f0-9]{40}$/.test(id)) throw new StudyError('找不到该题。外部作业请提供题干和参考答案。');
  const {results:[row]} = await studyDb(env).prepare(`SELECT subject_id AS subject,term,homework_prompt AS prompt,
    homework_reference AS reference,homework_explanation AS explanation
    FROM study_attempts WHERE owner_id = ? AND question_id = ? AND homework_prompt IS NOT NULL
    ORDER BY (homework_reference IS NOT NULL) DESC, rowid DESC LIMIT 1`).bind(owner,id).all();
  if (!row) throw new StudyError('当前账号没有这道作业的记录。');
  return {...row,id,reference:row.reference===null ? undefined : JSON.parse(row.reference)};
}
async function attemptsPage(env,owner,{subject,term,after = 0,limit = 300,bankOnly = false} = {}) {
  const filters = ['owner_id = ?','rowid > ?'];
  const binds = [owner,after];
  if (subject) { filters.push('subject_id = ?'); binds.push(subject); }
  if (term) { filters.push('term = ?'); binds.push(term); }
  if (bankOnly) filters.push('homework_prompt IS NULL');
  const {results} = await studyDb(env).prepare(`SELECT rowid AS cursor,attempt_ref AS ref,question_id AS id,
    subject_id AS subject,term,correct AS ok,study_date AS date,submitted_at AS time,homework_prompt AS prompt,
    homework_reference IS NOT NULL AS hasReference
    FROM study_attempts WHERE ${filters.join(' AND ')} ORDER BY rowid LIMIT ?`).bind(...binds,limit).all();
  return results.map(item=>({...item,ok:!!item.ok}));
}
async function studyAttempts(env,owner,subject,term) {
  const attempts = [];
  let after = 0;
  while (true) {
    const page = await attemptsPage(env,owner,{subject,term,after,limit:600});
    attempts.push(...page);
    if (page.length<600) break;
    after = page.at(-1).cursor;
  }
  return attempts.sort((a,b)=>a.date.localeCompare(b.date)||a.time-b.time||a.cursor-b.cursor);
}
function studySummary(attempts) {
  const latest = new Map();
  const days = new Set();
  let correct = 0;
  for (const attempt of attempts) {
    const previous = latest.get(attempt.id);
    latest.set(attempt.id,{...attempt,hasReference:!!attempt.hasReference || !!previous?.hasReference,
      wrongCount:attempt.ok ? 0 : (previous?.wrongCount ?? 0)+1});
    days.add(attempt.date);
    correct += Number(attempt.ok);
  }
  return {latest,days:days.size,correct};
}
async function progressFor(env,owner,args) {
  const subject = validSubject(args.subject);
  const term = validTerm(args.term);
  const scope = getScope(args.scope_id,subject,term);
  const ids = scope && new Set(scope.ids);
  const attempts = (await studyAttempts(env,owner,subject,term)).filter(item=>!ids || ids.has(item.id));
  const {latest,days,correct} = studySummary(attempts);
  const mastered = [...latest.values()].filter(item=>item.ok).length;
  return {subject:subjectNames.get(subject),term:term ?? '上、下册',scope:scope?.title,
    attempts:attempts.length,correct,accuracy:attempts.length ? Math.round(correct/attempts.length*100) : null,
    study_days:days,attempted_questions:latest.size,mastered_questions:mastered,open_mistakes:latest.size-mastered,
    last_study_day:attempts.at(-1)?.date ?? null,
    ...(attempts.length ? {} : {note:'这个范围暂无同步记录。可在练习室「学习记录」中同步，或在聊天里完成一组并批改。'})};
}
function mistakeQuestionView(item) {
  const question = questions.get(item.id);
  const prompt = question ? questionView(question) :
    {question_id:item.id,prompt:item.prompt,subject:subjectNames.get(item.subject),term:item.term,
      external_homework:true,grading_method:item.hasReference ? 'stored_reference' : 'review_or_reference'};
  return {...prompt,wrong_count:item.wrongCount,last_wrong_day:item.date};
}
async function mistakesFor(env,owner,args) {
  const subject = validSubject(args.subject);
  const term = validTerm(args.term);
  const scope = getScope(args.scope_id,subject,term);
  const limit = validCount(args.limit,10,30);
  const ids = scope && new Set(scope.ids);
  const {latest} = studySummary(await studyAttempts(env,owner,subject,term));
  const open = [...latest.values()].filter(item=>!item.ok && (!ids || ids.has(item.id)))
    .sort((a,b)=>b.date.localeCompare(a.date)||b.time-a.time||b.cursor-a.cursor);
  return {total:open.length,results:open.slice(0,limit).map(mistakeQuestionView)};
}

async function favoriteSnapshot(env,owner) {
  const {results} = await studyDb(env).prepare(`SELECT question_id AS id FROM study_favorite_events
    WHERE owner_id = ? AND selected = 1 AND rowid IN (
      SELECT MAX(rowid) FROM study_favorite_events WHERE owner_id = ? GROUP BY question_id
    ) ORDER BY rowid`).bind(owner,owner).all();
  return results.map(({id})=>id);
}

async function syncFavoriteEvents(env,owner,data) {
  const {legacy,changes} = data ?? {};
  if (!Array.isArray(legacy) || !Array.isArray(changes) || legacy.length+changes.length>200 ||
      legacy.some(id=>typeof id!=='string') ||
      changes.some(item=>!item || typeof item.id!=='string' || typeof item.selected!=='boolean' ||
        typeof item.ref!=='string' || !/^[a-f0-9]{32}$/.test(item.ref))) {
    throw new StudyError('收藏同步数据有误，每次最多同步 200 条。');
  }
  const db = studyDb(env);
  const seed = `INSERT INTO study_favorite_events (owner_id,event_ref,question_id,selected)
    SELECT ?,?,?,1 WHERE NOT EXISTS (
      SELECT 1 FROM study_favorite_events WHERE owner_id = ? AND question_id = ?
    ) ON CONFLICT(owner_id,event_ref) DO NOTHING`;
  const update = `INSERT INTO study_favorite_events (owner_id,event_ref,question_id,selected)
    VALUES (?,?,?,?) ON CONFLICT(owner_id,event_ref) DO NOTHING`;
  const statements = [
    ...legacy.filter(id=>questions.has(id)).map(id=>db.prepare(seed).bind(owner,'legacy:'+id,id,owner,id)),
    ...changes.filter(({id})=>questions.has(id)).map(({id,selected,ref})=>db.prepare(update).bind(owner,ref,id,Number(selected)))
  ];
  for (let i=0;i<statements.length;i+=40) await db.batch(statements.slice(i,i+40));
}
