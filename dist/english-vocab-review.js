const englishVocabModules = (() => {
  const partsOfSpeech = {
    v:['v.','动词','verb','vt.','vi.','及物动词','不及物动词'],
    vt:['vt.','及物动词','v.','动词','verb'],
    vi:['vi.','不及物动词','v.','动词','verb'],
    link:['linking v.','系动词','v.','动词','linking verb'],
    n:['n.','名词','noun'],
    nphr:['n. phr.','名词短语','名词','n.','短语','词组','noun phrase','phr.'],
    adj:['adj.','形容词','adjective'],
    adv:['adv.','副词','adverb'],
    prep:['prep.','介词','preposition'],
    det:['det.','限定词','determiner'],
    'adj./det.':['adj./det.','adj.','det.','形容词','限定词','形容词/限定词','adjective','determiner'],
    'det./pron.':['det./pron.','det.','pron.','限定词','代词','限定词/代词','determiner','pronoun'],
    abbr:['abbr.','缩写','缩写词','abbreviation'],
    phr:['phr.','短语','词组','搭配','phrase','动词短语','介词短语','固定短语']
  };
  function step(label, [answer,...aliases]) {
    return {label,answer,aliases,text:'english'};
  }
  function question(id,number,prompt,steps,explanation,stage) {
    return {id,level:'basic',stage,prompt:number+'. '+prompt,steps,
      correct:steps.map(entry=>entry.answer).join(' / '),explanation};
  }
  const unitOne = [
    ['greet','/ɡriːt/','vt','打招呼','问候','向某人打招呼','向…打招呼','向……打招呼'],
    ['introduce','/ˌɪntrəˈdjuːs/','vt','介绍','引见','引荐'],
    ['each other','/ˌiːtʃ ˈʌðə(r)/','phr','互相','相互','彼此'],
    ['go by','','phr','叫作','被称为','被叫作','被叫做','被称作','叫作、被称为'],
    ['glad','/ɡlæd/','adj','高兴的','开心的','愉快的'],
    ['same','/seɪm/','adj','相同的','同样的','一样的'],
    ['hobby','/ˈhɒbi/','n','业余爱好','爱好','嗜好'],
    ['grade','/ɡreɪd/','n','年级','年级；等级','等级','级别'],
    ['classmate','/ˈklɑːsmeɪt/','n','同班同学','同学'],
    ['friendly','/ˈfrendli/','adj','友好的','友善的','和善的','亲切的'],
    ['full','/fʊl/','adj','满的','充满的','饱的'],
    ['be full of','','phr','充满','满是','充满……的','满是……的','充满……','满是……'],
    ['energy','/ˈenədʒi/','n','精力','能量','活力','精力；能量'],
    ['be good at','','phr','擅长','善于','擅长做某事'],
    ['slim','/slɪm/','adj','苗条的','纤细的'],
    ['polite','/pəˈlaɪt/','adj','有礼貌的','礼貌的','客气的'],
    ['smart','/smɑːt/','adj','聪明的','机灵的','聪慧的'],
    ['ready','/ˈredi/','adj','准备好的','准备好','愿意的'],
    ['be ready to do sth','','phr','愿意做某事','准备好做某事','乐意做某事','准备做某事'],
    ['other','/ˈʌðə(r)/','adj./det.','其他的','另外的','别的'],
    ['interested','/ˈɪntrəstɪd/','adj','感兴趣的','感兴趣'],
    ['be interested in','','phr','对……感兴趣','对…感兴趣','对某事感兴趣','对某物感兴趣','对某事有兴趣'],
    ['looks','/lʊks/','n','外貌','相貌','长相','容貌','外表'],
    ['character','/ˈkærəktə(r)/','n','性格','个性','人物','角色','性格；人物'],
    ['both','/bəʊθ/','det./pron.','两者都','两个都','双方都','两者'],
    ['enjoy','/ɪnˈdʒɔɪ/','vt','喜欢','喜爱','享受','喜欢；享受'],
    ['pretty','/ˈprɪti/','adj','漂亮的','好看的','美丽的'],
    ['shy','/ʃaɪ/','adj','害羞的','腼腆的','羞怯的'],
    ['only','/ˈəʊnli/','adv','只','仅仅','仅','只有','仅有','只是'],
    ['stay','/steɪ/','vi','保持','停留','待','留下','保持；停留'],
    ['match','/mætʃ/','n','比赛','竞赛'],
    ['luck','/lʌk/','n','运气','好运','幸运'],
    ['good luck','','phr','祝好运','好运','祝成功','祝你好运','祝你成功'],
    ['chess','/tʃes/','n','国际象棋','棋','西洋棋'],
    ['Chinese chess','','nphr','中国象棋','象棋'],
    ['problem','/ˈprɒbləm/','n','问题','难题','困难'],
    ['weekend','/ˌwiːkˈend/','n','周末','星期末'],
    ['at the weekend','','phr','在周末','周末'],
    ['fun','/fʌn/','n','乐趣','有趣的事','快乐','好玩的事'],
    ['make friends with','','phr','与……交朋友','和……交朋友','与…交朋友','和…交朋友','与某人交朋友','和某人交朋友']
  ];
  const unitTwo = [
    ['jog',['vi','n'],['慢跑','缓跑'],['慢跑','慢跑运动','一次慢跑']],
    ['paint',['v','n'],['用颜料画','绘画','画','上油漆','涂颜料'],['颜料','油漆','涂料']],
    ['paper-cutting','n','剪纸','剪纸艺术'],
    ['all kinds of','phr','各种各样的','各种的','各式各样的','各种','各式各样'],
    ['fit','adj','健康的','健壮的','身体健康的','强健的','适合的','合适的'],
    ['around',['prep','adv'],['在……周围','在…周围','在周围','围绕','在附近'],['到处','在附近','四处','周围','大约','左右']],
    ['change',['vt','vi','n'],['改变','使改变','更改','变更'],['变化','改变','发生变化'],['变化','改变','变动','变更']],
    ['life','n','生活','生命','人生','生活；生命'],
    ['museum','n','博物馆'],
    ['thing','n','东西','事情','事物','物品','事'],
    ['apart','adv','分开','分离地','相隔','分离','分开地'],
    ['take apart','phr','拆开','拆卸','拆散','拆解'],
    ['fix','vt','修理','修好','修复','维修'],
    ['endless','adj','无穷无尽的','无休止的','无尽的','没完没了的','没有尽头的'],
    ['scientist','n','科学家'],
    ['dream','n','梦想','梦','理想'],
    ['true','adj','真实的','真正的','正确的','真的','符合事实的'],
    ['come true','phr','实现','成真','成为现实','实现；成为现实'],
    ['club','n','俱乐部','社团'],
    ['member','n','成员','会员'],
    ['geography','n','地理','地理学'],
    ['p.m.','abbr','下午','午后','下午（午后）'],
    ['volleyball','n','排球','排球运动'],
    ['each','det./pron.','每一','每个','每一的','各个','各自','每'],
    ['once','adv','一次','一回','一遍','曾经'],
    ['join','v','加入','参加','成为……的一员','成为一员'],
    ['meeting','n','会议','会面','集会','会'],
    ['sound','link','听起来','听上去'],
    ['plan','v','打算','计划','打算；计划'],
    ['questionnaire','n','问卷','调查问卷','调查表','问卷调查表'],
    ['role','n','角色','作用','职责','身份'],
    ['model','n','模范','榜样','模型','模特'],
    ['role model','nphr','楷模','榜样','行为榜样','模范','学习的榜样'],
    ['design','v','设计','构思'],
    ['skill','n','技能','技巧','技术','技艺'],
    ['painting','n','绘画','画','绘画作品','画作','油画'],
    ['artist','n','艺术家','画家','美术家'],
    ['master','n','大师','能手','行家','高手','名家'],
    ['work','n','作品','工作','著作','作品；工作'],
    ['become','v','成为','变成','变得'],
    ['designer','n','设计师','设计者'],
    ['future','n','未来','将来','以后'],
    ['in the future','phr','在未来','在将来','将来','未来','今后'],
    ['hope','v','希望','期望','盼望']
  ].map(([word,pos,...gloss])=>[word,'',pos,...gloss]);
  const unitTwoForms = [
    ['jog 的 -ing 形式','jogging','jog 重读闭音节末尾只有一个辅音字母，双写 g，再加 -ing。'],
    ['paint 的 -ing 形式','painting','paint 直接加 -ing。painting 也可作名词，表示画作。'],
    ['life 的复数形式','lives','life 变复数时把 -fe 变为 -ves。'],
    ['fix 的第三人称单数形式','fixes','以 -x 结尾，加 -es。'],
    ['science 的对应人物名词（单数）','scientist','科学是 science，科学家是 scientist，复数 scientists。'],
    ['meet 的对应名词「会议」（单数）','meeting','会议是 meeting，复数 meetings。'],
    ['one 对应的副词「一次」','once','once a week 表示一周一次。'],
    ['art 的对应人物名词（单数）','artist','艺术家是 artist，复数 artists。'],
    ['master 的复数形式','masters','大师或能手是 master，复数直接加 -s。'],
    ['design 的对应人物名词（单数）','designer','设计师是 designer，复数 designers。']
  ];
  const unitTwoPhrases = [
    ['各种各样的','all kinds of','kind 用复数 kinds。'],
    ['把东西拆开','take things apart','take apart 表示拆开。代词作宾语时用 take it apart。'],
    ['实现、成为现实','come true','常用搭配 dreams come true。'],
    ['楷模、行为榜样（单数）',['role model','a role model'],'单数 role model，复数 role models。'],
    ['愿意、想要做某事',['would like to do','would like to do sth','would like to do something'],'would like to 后用动词原形。'],
    ['在未来','in the future','the future 指未来。']
  ];
  const sentences = [
    ['我是一名来自七年级一班的 13 岁女生。',[
      'I am a 13-year-old girl from Class 1, Grade 7.',
      "I'm a 13-year-old girl from Class 1, Grade 7.",
      'I am a thirteen-year-old girl from Class One, Grade Seven.',
      "I'm a thirteen-year-old girl from Class One, Grade Seven."
    ],'数字作前置复合形容词时用 13-year-old，其中 year 用单数。Class 1, Grade 7 表示七年级一班。'],
    ['我又高又苗条。',['I am tall and slim.',"I'm tall and slim."],'用 and 连接 tall 和 slim。'],
    ['我对其他人友好。',['I am friendly to others.',"I'm friendly to others.",
      'I am friendly to other people.',"I'm friendly to other people."],'be friendly to others 表示对他人友好。'],
    ['在我的空闲时间，我乐意帮助他们解决数学问题。',[
      'In my free time, I am happy to help them with their maths problems.',
      "In my free time, I'm happy to help them with their maths problems.",
      'In my free time, I am glad to help them with their maths problems.',
      'In my free time, I am ready to help them with their maths problems.',
      'In my free time, I am happy to help them with their math problems.'
    ],'help sb. with sth. 表示帮助某人做某事。maths 是英式用法，math 是美式用法。'],
    ['在周末，我喜欢读各种各样的书，因为我能从它们中学到许多。',[
      'At weekends, I like reading all kinds of books because I can learn a lot from them.',
      'At the weekend, I like reading all kinds of books because I can learn a lot from them.',
      'On weekends, I like reading all kinds of books because I can learn a lot from them.',
      'At weekends, I like to read all kinds of books because I can learn a lot from them.'
    ],'all kinds of books 表示各种书，learn a lot from them 表示从它们中学到许多。'],
    ['我对慢跑感兴趣，因为它能帮助我保持健康和开心。',[
      'I am interested in jogging because it can help me stay healthy and happy.',
      "I'm interested in jogging because it can help me stay healthy and happy.",
      'I am interested in jogging because it can help me to stay healthy and happy.'
    ],'interested in 后接 jogging，help me (to) stay 中的 to 可以省略。'],
    ['对我来说，和我的同班同学去游泳是极大的乐趣。',[
      'It is great fun for me to go swimming with my classmates.',
      "It's great fun for me to go swimming with my classmates.",
      'Going swimming with my classmates is great fun for me.'
    ],'great fun 指极大的乐趣，fun 在此是不可数名词。go swimming 表示去游泳。'],
    ['我的梦想是成为一名艺术家。',[
      'My dream is to become an artist.','My dream is to be an artist.'
    ],'artist 的首音是元音，前面用 an。'],
    ['我希望我的梦想在未来可以成真。',[
      'I hope my dream can come true in the future.','I hope my dream will come true in the future.',
      'I hope my dream comes true in the future.'
    ],'come true 表示成真，in the future 表示将来。'],
    ['我想要和你们交朋友。',[
      'I want to make friends with you.','I would like to make friends with you.',
      "I'd like to make friends with you.",'I want to make friends with you all.'
    ],'make friends with sb. 表示和某人交朋友，friends 用复数。']
  ];

  function wordPractice(key,entries) {
    const questions = [];
    const sections = [];
    const notes = [];
    for (let start=0;start<entries.length;start+=10) {
      const end = Math.min(start+10,entries.length);
      const stage = '词汇 '+(start+1)+'–'+end+' · 释义与词性';
      const points = [];
      const ids = entries.slice(start,end).map(([word,ipa,pos,...glosses],index)=>{
        const number = start+index+1;
        const id = key+'-word-'+number;
        const heading = word+(ipa?'  '+ipa:'');
        const senses = Array.isArray(pos) ? pos.map((form,i)=>[partsOfSpeech[form][0],glosses[i][0]])
          : [[partsOfSpeech[pos][0],glosses[0]]];
        const summary = senses.map(([part,meaning])=>part+' '+meaning).join('；');
        const steps = Array.isArray(pos)
          ? pos.map((form,i)=>step(partsOfSpeech[form][1]+'释义',glosses[i]))
          : [step('中文释义',glosses),step('词性',partsOfSpeech[pos])];
        questions.push(question(id,number,heading+'\n按本单元常见义填写各空。',steps,word+'  '+summary+'。',stage));
        points.push(heading+'  '+summary);
        return id;
      });
      sections.push({key:'words-'+(start+1),title:stage,ids});
      notes.push({label:'词汇 '+(start+1)+'–'+end+' · 核对词表',points});
    }
    return {questions,sections,notes};
  }
  function addWritten(module,key,title,rows,offset = 0,label = '默写英文') {
    const ids = rows.map(([prompt,answer,explanation],i)=>{
      const number = offset+i+1;
      const id = module.key+'-'+key+'-'+number;
      const steps = [step(label,Array.isArray(answer)?answer:[answer])];
      module.questions.push(question(id,number,prompt,steps,explanation,title));
      return id;
    });
    module.sections.push({key,title,ids});
  }
  const one = {
    key:'english-u1-vocab-dictation',title:'Unit 1 · 词汇默写与词性',
    range:'七上 Unit 1 · This is me',description:'按词表原顺序练 40 个单词和短语。题面提供可见音标，作答后对照常见中文义和词性。',
    ...wordPractice('english-u1-vocab-dictation',unitOne)
  };
  const two = {
    key:'english-u2-vocab-dictation',title:'Unit 2 · 词汇默写与词性',
    range:'七上 Unit 2',description:'按词表原序练 44 个词条，再练 10 个词形和 6 个重点搭配。多词性词条按空填写。',
    ...wordPractice('english-u2-vocab-dictation',unitTwo)
  };
  two.notes.unshift({label:'易混词和词形',text:'jog 与 paint 可作动词，也可作名词。around 可作介词或副词，change 可作及物动词、不及物动词或名词。注意 jogging 双写 g、lives 变 -fe 为 -ves、fixes 加 -es。'});
  addWritten(two,'forms','词形变换 · 10 题',unitTwoForms,0,'填写正确词形');
  addWritten(two,'phrases','重点搭配 · 6 题',unitTwoPhrases);

  const sentenceSheet = {
    key:'english-u12-sentence-dictation',title:'Unit 1–2 · 10 句默写',range:'七上 Unit 1–2 · 中译英',
    description:'按默写练习和参考答案合并成一套 10 句练习，包含自我介绍、爱好、梦想和交友。',
    notes:[{label:'默写检查',text:'写完核对 13-year-old、be friendly to、help sb. with sth.、be interested in、come true 和 make friends with。'}],
    questions:[],sections:[]
  };
  addWritten(sentenceSheet,'intro','自我介绍 · 原题 1–4',sentences.slice(0,4),0,'英文整句');
  addWritten(sentenceSheet,'interests','爱好与梦想 · 原题 5–9',sentences.slice(4,9),4,'英文整句');
  addWritten(sentenceSheet,'friends','交朋友 · 原题 10',sentences.slice(9),9,'英文整句');
  return [one,two,sentenceSheet];
})();

const englishVocabByTopic = new Map(englishVocabModules.map(module=>[module.key,module]));
const vocabEnglish = subjects.find(subject=>subject.id==='english');
for (const module of englishVocabModules) {
  vocabEnglish.topics.push({
    ...module,term:'上',questions:module.questions.map(question=>({...question,subject:'english',topic:module.key}))
  });
}
