const PRODUCT_NAME = '七年级学习助手';
const MCP_VERSIONS = ['2026-07-28','2025-11-25','2025-06-18','2025-03-26'];
const scopeProperties = {
  subject:{type:'string',description:'学科英文编号或中文名称。省略时为数学。'},
  term:{type:'string',enum:['上','下','all'],description:'册次。省略时查询上下册。'},
  scope_id:{type:'string',description:'由 query_courses 返回的课程、知识点或专项题组编号。'}
};
const drawProperties = {
  ...scopeProperties,
  group_id:{type:'string',description:'只在指定课程的一个题组取题时使用，由 explain_topic 返回。'},
  difficulty:{type:'string',enum:['all','basic','standard','challenge']},
  count:{type:'integer',minimum:1,maximum:15,description:'题目数量，默认 5。'}
};
const answerSchema = {
  oneOf:[{type:'string',maxLength:500},{type:'number'},
    {type:'array',minItems:1,maxItems:20,items:{type:['string','number']}}]
};
function toolDefinition(name,title,description,properties,required = [],readOnly = true) {
  return {name,title,description,inputSchema:{type:'object',properties,required,additionalProperties:false},
    annotations:{readOnlyHint:readOnly,destructiveHint:false,idempotentHint:true,openWorldHint:false}};
}
const toolsList = [
  toolDefinition('query_courses','查询课程','查询练习室已收录的年级课程、知识点和专项题组。默认数学。后续用返回的 scope_id 查讲解或练习。',{
    subject:scopeProperties.subject,term:scopeProperties.term,
    query:{type:'string',description:'可用课文标题、章节主题或知识点筛选。'},
    limit:{type:'integer',minimum:1,maximum:35}
  }),
  toolDefinition('explain_topic','讲解知识点','返回课程要点、易错提醒、例题与解题思路。需要先从课程查询选定 scope_id。',scopeProperties,['scope_id']),
  toolDefinition('draw_questions','随机出题','按学科、册次、课程和难度抽题。返回题目与题号，不提前给答案。请保留 question_id 以便答完后批改。',drawProperties),
  toolDefinition('grade_homework','批改作业','批改题库题目或有明确参考答案的外部作业。用户解答后再调用。题库单选可提交 A/B/C/D 或选项全文，多空按顺序提交数组。外部主观作业先在聊天里讲评，再用 record_homework_review 保存已确认的结果。默认记录批改结果。同一提交重试时复用 batch_id。',{
    subject:scopeProperties.subject,term:scopeProperties.term,
    batch_id:{type:'string',description:'记录时必填。为本次实际提交生成唯一编号，只用字母、数字、连字符或下划线。重试复用。'},
    record:{type:'boolean',description:'是否保存到当前账号，默认为 true，只检查答案时可传 false。'},
    submissions:{type:'array',minItems:1,maxItems:20,items:{type:'object',additionalProperties:false,required:['answer'],properties:{
      question_id:{type:'string',description:'题库的 question_id。提供时直接使用题库答案。'},
      prompt:{type:'string',maxLength:1500,description:'外部作业原题。没有题库 ID 时必填。'},
      answer:answerSchema,
      reference_answer:{...answerSchema,description:'外部作业的明确参考答案。多空传有序数组，没有题库 ID 时必填。'},
      explanation:{type:'string',maxLength:1200,description:'可为外部作业补充已确认的解题过程。'}
    }}}
  },['submissions'],false),
  toolDefinition('record_homework_review','保存已讲评的作业','保存聊天中已经讲评且用户要求记录的外部作业结果。以实际批改结果为准。同一提交重试时复用 batch_id。',{
    subject:scopeProperties.subject,term:scopeProperties.term,
    batch_id:{type:'string',description:'本次提交的唯一编号，只用字母、数字、连字符或下划线。'},
    items:{type:'array',minItems:1,maxItems:20,items:{type:'object',additionalProperties:false,required:['prompt','correct'],
      properties:{prompt:{type:'string',maxLength:1500},correct:{type:'boolean'}}}}
  },['batch_id','items'],false),
  toolDefinition('get_mistakes','查询错题','查询当前账号最近一次仍答错的题，包含已同步的网页记录和聊天批改。直接返回题目，方便复练。',{
    ...scopeProperties,limit:{type:'integer',minimum:1,maximum:30}
  }),
  toolDefinition('special_practice','专项练习','按已选课程、知识点或专项题组练习。可抽取全部范围、账号里未答对的题，或最近仍答错的题。',{
    ...drawProperties,mode:{type:'string',enum:['all','unmastered','mistakes'],description:'all 为范围内任选，unmastered 为还未答对，mistakes 为待复练错题。'}
  },['scope_id']),
  toolDefinition('get_progress','查询学习进度','查询当前账号的答题次数、正确率、已掌握题数和待复练错题。统计来自聊天批改和已主动同步的网页记录。',scopeProperties)
];
function batchId(args) {
  const id = textValue(args.batch_id,'本次提交编号',96,true);
  if (!/^[A-Za-z0-9_-]+$/.test(id)) throw new StudyError('提交编号只支持字母、数字、连字符和下划线。');
  return id;
}
function asAnswer(value) {
  if (typeof value==='number' && Number.isFinite(value)) return String(value);
  if (Array.isArray(value) && value.length>0 && value.length<=20) {
    return value.map(item=>{
      if (typeof item==='number' && Number.isFinite(item)) return String(item);
      return textValue(item,'分步答案',500);
    });
  }
  return textValue(value,'答案',500,true);
}
function gradeBankQuestion(question,answer) {
  if (question.steps || question.blanks) {
    const actual = Array.isArray(answer) ? answer : [answer];
    const expected = question.steps?.map(step=>step.answer) ?? question.blanks;
    const checks = expected.map((value,index)=>({
      field:question.steps?.[index].label ?? '第 '+(index+1)+' 空',
      correct:question.steps ? matchesStep(question.steps[index],actual[index] ?? '') : normalizeDictation(actual[index] ?? '')===normalizeDictation(value),
      expected:value
    }));
    return {correct:actual.length===expected.length && checks.every(check=>check.correct),
      reference_answer:expected,fields:checks};
  }
  if (Array.isArray(answer)) throw new StudyError('这道题只需要填写一个答案。');
  const options = question.options;
  const letter = answer.normalize('NFKC').toUpperCase();
  const selected = options && !options.includes(answer) && /^[A-H]$/.test(letter) ? options[letter.charCodeAt(0)-65] : answer;
  return {correct:selected!==undefined && answerMatches(question,selected),reference_answer:question.correct};
}
function sameReference(actual,reference) {
  return matchesNumber(actual,reference) || normalizeStepText(actual)===normalizeStepText(reference);
}
function gradeReference(answer,reference) {
  if (Array.isArray(reference)) {
    const actual = Array.isArray(answer) ? answer : [answer];
    const checks = reference.map((value,index)=>({field:'第 '+(index+1)+' 空',correct:sameReference(actual[index] ?? '',value),expected:value}));
    return {correct:actual.length===reference.length && checks.every(check=>check.correct),fields:checks,reference_answer:reference};
  }
  return {correct:!Array.isArray(answer) && sameReference(answer,reference),reference_answer:reference};
}
async function homeworkKey(subject,term,prompt) {
  const bytes = new TextEncoder().encode(subject+'\n'+term+'\n'+prompt.normalize('NFKC').replace(/\s+/g,''));
  const hash = new Uint8Array(await crypto.subtle.digest('SHA-256',bytes));
  return 'homework-'+Array.from(hash.subarray(0,20),byte=>byte.toString(16).padStart(2,'0')).join('');
}
async function gradeHomework(env,request,args) {
  const items = args.submissions;
  if (!Array.isArray(items) || !items.length || items.length>20) throw new StudyError('请提交 1 至 20 道作业。');
  if (args.record!==undefined && typeof args.record!=='boolean') throw new StudyError('record 应为布尔值。');
  const record = args.record!==false;
  const owner = record ? requireOwner(request) : null;
  const ref = record ? batchId(args) : null;
  const subject = validSubject(args.subject);
  const term = validTerm(args.term);
  const now = new Date();
  const evaluated = await Promise.all(items.map(async (item,index)=>{
    if (!item || typeof item!=='object') throw new StudyError('每一项作业都应包含答案。');
    const answer = asAnswer(item.answer);
    const questionId = textValue(item.question_id,'题目编号',120);
    const question = questions.get(questionId);
    if (questionId && !question) throw new StudyError('题库中没有题号 '+questionId+'。外部题请填原题和参考答案。');
    const prompt = question?.prompt ?? textValue(item.prompt,'外部作业题干',1500,true);
    const itemSubject = question?.subject ?? subject;
    const itemTerm = question ? topics.get(question.topic).term : term ?? '上';
    const id = question?.id ?? await homeworkKey(itemSubject,itemTerm,prompt);
    const grade = question ? gradeBankQuestion(question,answer) : gradeReference(answer,asAnswer(item.reference_answer));
    return {
      result:{question_id:id,prompt,...grade,
        explanation:question?.explanation ?? textValue(item.explanation,'讲评',1200),
        solution:question?.solution},
      row:{ref:'chat:'+ref+':'+index,id,subject:itemSubject,term:itemTerm,ok:grade.correct,
        date:calendarDate.format(now),time:now.getTime(),prompt:question ? null : prompt}
    };
  }));
  const saved = record ? await insertAttempts(env,owner,evaluated.map(item=>item.row)) : 0;
  const results = evaluated.map(item=>item.result);
  return {count:results.length,correct:results.filter(item=>item.correct).length,recorded:record,new_records:saved,results};
}
async function recordReviewedHomework(env,request,args) {
  const owner = requireOwner(request);
  const ref = batchId(args);
  const subject = validSubject(args.subject);
  const term = validTerm(args.term) ?? '上';
  if (!Array.isArray(args.items) || !args.items.length || args.items.length>20) throw new StudyError('请提交 1 至 20 道已讲评的题。');
  const now = new Date();
  const rows = await Promise.all(args.items.map(async (item,index)=>{
    if (!item || typeof item.correct!=='boolean') throw new StudyError('请为每道题提供已确认的正误。');
    const prompt = textValue(item.prompt,'作业题干',1500,true);
    const id = await homeworkKey(subject,term,prompt);
    return {ref:'review:'+ref+':'+index,id,subject,term,prompt,ok:item.correct,date:calendarDate.format(now),time:now.getTime()};
  }));
  return {new_records:await insertAttempts(env,owner,rows),question_ids:rows.map(row=>row.id)};
}
async function specialPractice(env,request,args) {
  const mode = args.mode ?? 'all';
  if (!['all','unmastered','mistakes'].includes(mode)) throw new StudyError('请指定 all、unmastered 或 mistakes。');
  const selection = poolFor(args,true);
  if (mode!=='all') {
    const owner = requireOwner(request);
    const {latest} = studySummary(await studyAttempts(env,owner,selection.subject,selection.term));
    selection.pool = selection.pool.filter(question=>{
      const status = latest.get(question.id)?.ok;
      return mode==='mistakes' ? status===false : status!==true;
    });
  }
  return makePractice(selection,validCount(args.count,5,15),mode);
}
const handlers = {
  query_courses:args=>queryCourses(args),
  explain_topic:args=>explainTopic(args),
  draw_questions:args=>makePractice(poolFor(args),validCount(args.count,5,15),'random'),
  grade_homework:(args,env,request)=>gradeHomework(env,request,args),
  record_homework_review:(args,env,request)=>recordReviewedHomework(env,request,args),
  get_mistakes:(args,env,request)=>mistakesFor(env,requireOwner(request),args),
  special_practice:(args,env,request)=>specialPractice(env,request,args),
  get_progress:(args,env,request)=>progressFor(env,requireOwner(request),args)
};
function json(body,status = 200) {
  return Response.json(body,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
}
function rpcError(id,code,message) {
  return json({jsonrpc:'2.0',id:id ?? null,error:{code,message}});
}
async function boundedJson(request,maxBytes) {
  if (!request.headers.get('Content-Type')?.toLowerCase().includes('application/json')) throw new StudyError('请求需要 JSON 格式。');
  if (Number(request.headers.get('Content-Length'))>maxBytes || !request.body) throw new StudyError('请求过大或为空。');
  const decoder = new TextDecoder();
  const reader = request.body.getReader();
  let length = 0;
  let body = '';
  while (true) {
    const {done,value} = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length>maxBytes) {
      await reader.cancel();
      throw new StudyError('请求过大。');
    }
    body += decoder.decode(value,{stream:true});
  }
  return JSON.parse(body+decoder.decode());
}
function toolResult(value,isError = false) {
  return {content:[{type:'text',text:isError ? value : JSON.stringify(value)}],
    ...(isError ? {isError:true} : {structuredContent:value})};
}
async function mcpResponse(request,env) {
  if (request.method!=='POST') return new Response(null,{status:405,headers:{Allow:'POST'}});
  let message;
  try { message = await boundedJson(request,120000); }
  catch { return rpcError(null,-32700,'无法读取 JSON-RPC 请求。'); }
  if (!message || Array.isArray(message) || message.jsonrpc!=='2.0' || typeof message.method!=='string') {
    return rpcError(message?.id,-32600,'无效的 JSON-RPC 请求。');
  }
  const {id,method,params} = message;
  if (id===undefined) return new Response(null,{status:202});
  const capabilities = {tools:{}};
  const serverInfo = {name:PRODUCT_NAME,title:PRODUCT_NAME,version:'1.0.0'};
  let result;
  if (method==='server/discover') {
    result = {supportedVersions:[MCP_VERSIONS[0]],capabilities,serverInfo};
  } else if (method==='initialize') {
    const clientVersion = params?.protocolVersion;
    result = {protocolVersion:MCP_VERSIONS.includes(clientVersion) ? clientVersion : MCP_VERSIONS[0],capabilities,serverInfo};
  } else if (method==='ping') {
    result = {};
  } else if (method==='tools/list') {
    result = {tools:toolsList};
  } else if (method==='tools/call') {
    if (typeof params?.name!=='string' || !Object.hasOwn(handlers,params.name)) return rpcError(id,-32602,'找不到指定工具。');
    const args = params.arguments ?? {};
    if (typeof args!=='object' || Array.isArray(args)) return rpcError(id,-32602,'工具参数必须是对象。');
    try {
      result = toolResult(await handlers[params.name](args,env,request));
    } catch (error) {
      if (!(error instanceof StudyError)) console.error('Study tool '+params.name+': '+error.name+' '+error.message);
      result = toolResult(error instanceof StudyError ? error.message : '学习助手暂时无法完成此操作，请稍后重试。',true);
    }
  } else {
    return rpcError(id,-32601,'未实现的 JSON-RPC 方法。');
  }
  return json({jsonrpc:'2.0',id,result});
}
async function syncResponse(request,env,url) {
  if (!request.headers.get('oai-authenticated-user-id')) return json({error:'请先登录 ChatGPT 账号。'},401);
  const owner = requireOwner(request);
  try {
    if (request.method==='POST') {
      if (request.headers.get('Origin')!==url.origin) return json({error:'请在练习室内同步记录。'},403);
      const data = await boundedJson(request,120000);
      const rows = backupRows(data?.attempts);
      return json({added:await insertAttempts(env,owner,rows),ignored:data.attempts.length-rows.length});
    }
    if (request.method==='GET') {
      const after = Number(url.searchParams.get('after') ?? 0);
      if (!Number.isSafeInteger(after) || after<0) throw new StudyError('同步页码无效。');
      const limit = 300;
      const rows = await attemptsPage(env,owner,{after,limit,bankOnly:true});
      return json({attempts:rows.map(({id,ref,date,time,ok})=>({id,ref,date,time,ok})),
        next:rows.length===limit ? rows.at(-1).cursor : null});
    }
    return new Response(null,{status:405,headers:{Allow:'GET, POST'}});
  } catch (error) {
    if (error instanceof StudyError || error instanceof SyntaxError) return json({error:error instanceof SyntaxError ? '同步数据格式有误。' : error.message},400);
    console.error('Study sync: '+error.name+' '+error.message);
    return json({error:'暂时无法同步，请稍后再试。'},500);
  }
}
function staticResponse(request,path) {
  if (!['GET','HEAD'].includes(request.method)) return new Response(null,{status:405,headers:{Allow:'GET, HEAD'}});
  const assetPath = path==='/' ? '/index.html' : path;
  const asset = Object.hasOwn(STATIC_ASSETS,assetPath) ? STATIC_ASSETS[assetPath] : null;
  if (!asset) return new Response('页面不存在。',{status:404,headers:{'Content-Type':'text/plain; charset=utf-8'}});
  const headers = {
    'Content-Type':asset.type,'ETag':asset.etag,'Cache-Control':'public, max-age=0, must-revalidate',
    'X-Content-Type-Options':'nosniff'
  };
  if (request.headers.get('If-None-Match')===asset.etag) return new Response(null,{status:304,headers});
  const data = request.method==='HEAD' ? null : Uint8Array.from(atob(asset.body),char=>char.charCodeAt(0));
  return new Response(data,{headers});
}

export default {
  fetch(request,env) {
    const url = new URL(request.url);
    if (url.pathname==='/mcp') return mcpResponse(request,env);
    if (url.pathname==='/api/study-sync') return syncResponse(request,env,url);
    return staticResponse(request,url.pathname);
  }
};
