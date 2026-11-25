const englishClassroomModules = (() => {
  function fill(prompt,forms,explanation) {
    const entries = typeof forms==='string' ? [forms] : forms;
    const steps = entries.map((form,index)=>{
      const [answer,...aliases] = typeof form==='string' ? [form] : form;
      return {label:entries.length===1?'填写答案':'第 '+(index+1)+' 空',answer,aliases,text:'english'};
    });
    return {prompt,steps,correct:steps.map(step=>step.answer).join(' / '),explanation,level:'basic'};
  }
  function choose(prompt,options,correct,explanation) {
    return {prompt,options,correct:options[correct],explanation,level:'standard'};
  }
  function module(key,title,range,description,notes,groups,sources = []) {
    const questions = [];
    const sections = groups.map(([keySuffix,stage,items,material])=>{
      const ids = items.map(item=>{
        const number = questions.length+1;
        const id = key+'-'+number;
        questions.push({...item,id,stage,prompt:number+'. '+item.prompt,...(material ? {material} : {})});
        return id;
      });
      return {key:keySuffix,title:stage,ids};
    });
    return {key,title,range,description,notes:notes.map(([label,text])=>({label,text})),sections,questions,sources};
  }

  const introduction = module('classroom-u1-intro','Unit 1 · 问候与自我介绍学案','七上 Unit 1',
    '学案原题 1–22，涵盖词组、元音辨读、词形、翻译和单选，并附词形补练。',[
    ['问候与介绍','greet each other、introduce each other 里的 each other 表互相。Glad to meet you. 可用作见面问候。go by Amy 表示用 Amy 这个名字，第三人称单数用 goes by。'],
    ['形容词搭配','be friendly to sb.、be ready to do sth.、be glad to do sth.。be full of 相当于 be filled with。a lot of energy 的 energy 在这里是不可数名词。'],
    ['爱好与班级','be good at / do well in 后接名词或动名词。be interested in music 对音乐感兴趣。记住 stay healthy、in the same class 和 in Class One, Grade Seven。'],
    ['both 和 only','both A and B 作主语表示两者，在一般现在时中动词用复数形式。both 常放在 be 动词后、实义动词前。only 放在所限制的词语附近，常见位置为 be 动词后、实义动词前。阅读遇到 only 时核对限定范围。'],
    ['词汇与词形','classmate、character、problem 可用复数。描述人物可用 slim、polite、smart、pretty、shy、fun。introduce → introducing，hobby → hobbies，friend → friendly，interest → interested，look → looks，enjoy → enjoys，stay → stays，match → matches。']
  ],[
    ['phrases','学案 1–6 · 汉译英',[
      fill('互相问候','greet each other','greet 是打招呼，each other 是互相。'),
      fill('互相介绍','introduce each other','introduce 表示介绍。'),
      fill('见到你很开心。',[['Glad to meet you.','Nice to meet you.','Pleased to meet you.','I am glad to meet you.','I’m glad to meet you.']],'Glad to meet you. 可用于初次见面。'),
      fill('叫作、被称为','go by','go by + 名字，表示别人用这个名字称呼某人。'),
      fill('有一些爱好','have some hobbies','some 后的可数名词 hobby 用复数 hobbies。'),
      fill('在同一个班级','in the same class','same 前通常用 the。')
    ]],
    ['sounds','学案 7–11 · 元音辨读',[
      choose('选出方括号中的元音发音不同的一项。',['n[a]me','s[a]me','t[a]lk','f[a]ce'],2,'name、same 和 face 的 a 发 /eɪ/。talk 的 a 发 /ɔː/。'),
      choose('选出方括号中的元音发音不同的一项。',['h[e]','[ea]ch','r[e]d','m[ee]t'],2,'he、each、meet 含 /iː/，red 的 e 发 /e/。'),
      choose('选出方括号中的元音发音不同的一项。',['b[i]ke','f[i]ne','l[i]ke','b[i]g'],3,'前三项发 /aɪ/，big 的 i 发 /ɪ/。'),
      choose('选出方括号中的元音发音不同的一项。',['g[o]','s[o]','h[o]me','n[o]t'],3,'英式读音的 go、so、home 含 /əʊ/，not 含 /ɒ/。'),
      choose('选出方括号中的元音发音不同的一项。',['st[u]dent','introd[u]ce','m[u]sic','b[u]s'],3,'英式读音中前三项的该部分含 /juː/，bus 的 u 发 /ʌ/。')
    ]],
    ['words','学案 12–16 · 词汇填空',[
      fill('He is always kind and ____ (打招呼) me with a smile when we meet.','greets','主语 he 是第三人称单数，用 greets。'),
      fill('Tom is our new classmate. Can you ____ (介绍) yourself to us all, Tom?','introduce','can 后用动词原形。'),
      fill('My brother has a lot of ____ (hobby).','hobbies','hobby 复数变 y 为 i 再加 -es。'),
      fill('My name is Zhang Ke. I like ____ (listen) to music.',[['listening','to listen']],'like doing 和 like to do 都可表示喜欢，学案填写 listening。'),
      fill('Mr Wu is an English teacher. He teaches ____ (/miː/) English.','me','teaches 后的人称代词作宾语，用 me。')
    ]],
    ['translate','学案 17–19 · 翻译填空',[
      fill('我的中文名字是张逸，也可以叫我山姆。\nMy ____ is Zhang Yi, and I also ____ Sam.',['Chinese name','go by'],'Chinese name 指中文名字，go by Sam 表示叫作 Sam。'),
      fill('我在二班，很高兴见到你。\nI am in ____. ____ you.',[['Class Two','Class 2'],['Glad to meet','Nice to meet','Pleased to meet']],'班级名用 Class Two。Glad to meet you. 是常见问候。'),
      fill('凯蒂和我在相同的班级。我们经常课后互相交谈。\nKitty and I are ____ class. We often talk with ____ after class.',['in the same','each other'],'in the same class 表示在同一个班，each other 表示互相。')
    ]],
    ['choices','学案 20–22 · 单项选择',[
      choose('—Good morning, Sandy.\n—____, Mr Wu.',['Morning','Good morning','Nice to meet you too','A and B'],3,'Morning 和 Good morning 都能回应早上好，因此选 D。'),
      choose('Simon enjoys ____.',['play the piano','play piano','playing the piano','playing piano'],2,'enjoy 后接动名词。学案考查 play the piano 的常见固定表达。'),
      choose('She goes ____ “Sunny” among her classmates because she always has a smile on her face.',['by','on','after','with'],0,'go by + 名字，表示被称为。')
    ]],
    ['forms','词形专项补练',[
      fill('Ms Li is ____ (introduce) the new student now.','introducing','末尾不发音的 e 去掉，再加 -ing。'),
      fill('Drawing and swimming are two of my ____ (hobby).','hobbies','two of 后接复数。'),
      fill('Mia is ____ (friend) to her classmates.','friendly','be 后用形容词 friendly 描述为人。'),
      fill('The boys are ____ (interest) in films.','interested','描述人感兴趣用 interested。'),
      fill('The new boy ____ (look) shy.','looks','单数主语对应 looks。'),
      fill('My sister ____ (enjoy) reading after lunch.','enjoys','enjoy 末尾是元音字母加 y，直接加 -s。'),
      fill('She ____ (stay) healthy by walking to school.','stays','stay 末尾是元音字母加 y，直接加 -s。'),
      fill('Our school has two football ____ (match) this week.','matches','match 以 -ch 结尾，复数加 -es。')
    ]]
  ]);

  const cloze = [
    'My name is Lucy. I am [29] new student at Sunshine Middle School. I am in Class 1, Grade 7. I [30] from Shanghai. I am 12 years old. I have [31] new friends at school. They are very [32] to me.',
    'One of my friends is a boy. [33] name is Jack. He is tall and strong. He [34] glasses. He is good at [35]. He often plays basketball with his classmates. He is very [36] and always helps others.',
    'Another friend is a girl. [37] name is Lily. She is short and [38].'
  ].join('\n\n');
  const dialogue = [
    'Gina: Hi, Linda. [39]',
    'Linda: I’m watching the movie Ponyo on the Cliff.',
    'Gina: The song in it is nice. [40]',
    'Linda: Li Leqi.',
    'Gina: [41]',
    'Linda: She is a little girl with a round face and big eyes.',
    'Gina: [42]',
    'Linda: Yes, you are right.',
    'Gina: I know her. [43] She may also be an actress like her mother in the future.',
    'Linda: But I think she may be a great singer because she has a good voice.'
  ].join('\n');
  const dialogueOptions = ['Who sings it?','What are you doing?','What does she look like?',
    'She looks like her mother.','Is her English name Lucky?','Her mother is a great actress.'];

  const grammar = module('classroom-u1-grammar','Unit 1 · 1.3 Grammar 学案','七上 Unit 1',
    '按两页学案原题号 1–43 编排，练习 be 动词、翻译、单选、完形填空和对话还原。',[
    ['am、is、are','一般现在时中 I 用 am，you 和复数主语用 are，第三人称单数用 is。everyone 作主语视为单数。be 动词的否定式在其后加 not。'],
    ['两个易错点','there be 有几个并列名词时，课堂练习按就近原则填写。Let’s 后用动词原形，Let’s be good friends. 用 be。'],
    ['阅读题怎么找线索','先读完材料，再看空前空后。basketball 指向 sport，always helps others 指向 helpful。对话里先分辨答句回应的是活动、姓名、外貌还是确认问题。']
  ],[
    ['phrases','学案 1–6 · 汉译英',[
      fill('都非常友好',[['all very friendly','are all very friendly']],'all 表示都，作表语时常用 are all very friendly。'),
      fill('对音乐感兴趣','be interested in music','interested 后常用 in。'),
      fill('擅长运动',[['be good at sport','be good at sports','do well in sport','do well in sports']],'be good at 和 do well in 都表示擅长。'),
      fill('那边的女孩','the girl over there','over there 表示在那边，放在 the girl 后。'),
      fill('填写「对某人来说难」和「对某人来说容易」的短语。',[['difficult for sb.','difficult for','difficult for somebody','hard for sb.','hard for'],['easy for sb.','easy for','easy for somebody']],'difficult/easy for somebody，表示对某人来说难或容易。'),
      fill('非常喜欢这个学校',[['like this school very much','like this school a lot']],'very much 或 a lot 可放在宾语 this school 后表示程度。')
    ]],
    ['be','学案 7–15 · be 动词',[
      fill('____ (be) your uncle a doctor?','Is','your uncle 是单数，疑问句将 Is 提到主语前。'),
      fill('There ____ (be) a boy and three girls in the hall.','is','离 be 最近的是 a boy，按就近原则填 is。'),
      fill('—May I speak to Lucy?\n—Sorry, she ____ (be not) at home now.',[['isn’t','is not']],'she 用 is，否定式是 is not 或 isn’t。'),
      fill('Maths ____ (be) difficult for me to learn well, but I will never give up.','is','Maths 作学科名，视为单数。'),
      fill('My father and I ____ (be) interested in watching films.','are','My father and I 是两个并列的主语，用 are。'),
      fill('Sandy ____ (not be) late for school every day and studies well.',[['isn’t','is not']],'Sandy 为第三人称单数，be 的否定式用 isn’t 或 is not。'),
      fill('I enjoy English, but I ____ (be not) good at English.','am not','I 对应 am，否定式是 am not。'),
      fill('Wow, we have the same hobby. Let’s ____ (be) good friends.','be','Let’s 后接动词原形。'),
      fill('Reading books every day ____ (be) fun. It also helps me learn more about the world.','is','Reading books every day 是一个动名词短语作主语，视为单数。')
    ]],
    ['translate','学案 16–18 · 翻译填空',[
      fill('在那边的男子是吴老师。我对他的课感兴趣。\nThe man ____ is Mr Wu. I ____ his lessons.',['over there','am interested in'],'over there 在那边，I am interested in 表示我对……感兴趣。'),
      fill('—Simon，英语对你来说简单吗？ —不，它对我来说难。\n—____ English easy for you, Simon? —No. It ____ for me.',['Is',['is difficult','is hard']],'English 作学科名用 Is 提问。is difficult / is hard 表示很难。'),
      fill('我喜欢我的新同学。他们都非常友好。\nI like ____. They ____ very friendly.',['my new classmates','are all'],'classmates 用复数，all 放在 are 后是常见语序。')
    ]],
    ['choices','学案 19–28 · 单项选择',[
      choose('I ____ Ann. You ____ Sam and she ____ Kate.',['is; am; are','am; is; are','am; are; is','is; are; am'],2,'I am，you are，she is。'),
      choose('____ everyone in the classroom now?',['is','Do','Am','Are'],0,'everyone 作主语视为单数。选 A，放在句首写成 Is。'),
      choose('—____ your name Kate? —____.',['Is; Yes, I am','Is; Yes, it is','Are; Yes, I am','Are; Yes, it is'],1,'主语是 your name，问句用 Is，简答用 it 指代 your name。'),
      choose('—Are your new friends good at Chinese?\n—____, but they are good at English.',['Yes, they are','No, they aren’t','Yes, we are','No, I’m not'],1,'but 表示转折。friends 用 they 指代，问句用 Are，对应否定答语 No, they aren’t。'),
      choose('—Hi, Simon. ____ is Daniel. —Nice to meet you, Daniel.',['He','She','This','That'],2,'当面将身边的人介绍给对方常用 This is…'),
      choose('Millie’s eyes ____ dark brown and her hair ____ black.',['is; is','are; are','are; is','is; are'],2,'eyes 是复数，hair 在此是不可数名词，用 is。'),
      choose('—How ____ your grandmother? —She is fine, thank you.',['is','are','am','isn’t'],0,'your grandmother 指一个人，How is…? 用来询问近况。'),
      choose('—“I” ____ the ninth letter in the alphabet. —I see, thank you.',['am','are','aren’t','is'],3,'引号里的 “I” 指一个字母，作单数主语用 is。'),
      choose('My parents ____ like sports. We ____ interested in playing badminton.',['all; are all','both; are all','both; all are','all; all are'],1,'parents 指父母两人，用 both。表达全家都感兴趣时，学案考查 are all 的常见语序。'),
      choose('—There are four girls over there. ____ is your sister? —The girl with long hair.\n选最直接表示「哪一位」的疑问词。',['Who','Where','Which','What'],2,'在四位女孩中问哪一位是妹妹，which 最明确。')
    ]],
    ['cloze','学案 29–38 · 完形填空',[
      choose('第 [29] 空填哪一项？',['a','an','the','/'],0,'new 以辅音音素开头，第一次介绍自己是一名新生，用 a。'),
      choose('第 [30] 空填哪一项？',['am','is','are','be'],0,'主语 I 对应 am。'),
      choose('第 [31] 空填哪一项？',['any','some','no','much'],1,'肯定句中表示有一些新朋友，选 some，后文也介绍了朋友。'),
      choose('第 [32] 空填哪一项？',['sad','tired','friendly','busy'],2,'be friendly to sb. 表示对某人友好。'),
      choose('第 [33] 空填哪一项？',['My','Your','His','Her'],2,'该句介绍男孩 Jack，使用 His。'),
      choose('第 [34] 空填哪一项？',['wears','has','puts','takes'],0,'wear glasses 表示戴眼镜，描述 Jack 平时的样子。'),
      choose('第 [35] 空填哪一项？',['music','sport','science','art'],1,'后文提到经常和同学打篮球，线索指向 sport。'),
      choose('第 [36] 空填哪一项？',['polite','quiet','helpful','shy'],2,'always helps others 表明他乐于助人。'),
      choose('第 [37] 空填哪一项？',['My','His','Her','Your'],2,'该句介绍女孩 Lily，用 Her。'),
      choose('给第 [38] 空选一个同样形容身材的词。',['slim','tall','old','smart'],0,'short and slim 表示个子矮、身材苗条。tall 和同句的 short 矛盾。')
    ],cloze],
    ['dialogue','学案 39–43 · 信息还原',[
      choose('第 [39] 空填哪一句？',dialogueOptions,1,'答句在说正在做的事，因此用 What are you doing?'),
      choose('第 [40] 空填哪一句？',dialogueOptions,0,'上文谈到电影里的歌，答句给出人名 Li Leqi，因此问谁唱的。'),
      choose('第 [41] 空填哪一句？',dialogueOptions,2,'答句写圆脸和大眼睛，因此问外貌。'),
      choose('第 [42] 空选一句能用 Yes 直接回答的一般疑问句。',dialogueOptions,4,'Is her English name Lucky? 是是非问句，对应 Yes, you are right. 确认名字后 Gina 说认识她。'),
      choose('第 [43] 空填哪一句？',dialogueOptions,5,'后面提到将来也许会和她母亲一样做演员，上一句应交代母亲是演员。')
    ],dialogue]
  ]);

  const integration = module('classroom-u2-integration','Unit 2 · Grammar–Integration 默写与翻译','七上 Unit 2',
    '练习默写卷中的词汇和搭配，再译写关于爱好、科学与梦想的 7 个句子。',[
    ['谈爱好','enjoy 后接动名词，例如 enjoy listening to music。主语为 Daniel 等第三人称单数时，go 变 goes，make 变 makes，enjoy 变 enjoys。'],
    ['谈俱乐部','join the Geography Club、be interested in the Robot Club、once a week。Both of us will have a great time. 里 will 后用动词原形 have。'],
    ['谈理想','区分 design、designer、artist 和 master。want to / would like to 后接动词原形。I hope my dream comes true. 表达希望梦想成真。']
  ],[
    ['grammar','Grammar · 动词与搭配',[
      fill('用颜料画（动词）','paint','paint 可作动词，表示用颜料画。'),
      fill('丹尼尔周六在公园散步。\nDaniel ____ in the park on Saturdays.',[['goes for a walk','takes a walk']],'go for a walk 表示散步。Daniel 是第三人称单数，用 goes。'),
      fill('桑迪和凯蒂喜欢听音乐吗？\nDo Sandy and Kitty enjoy ____?', 'listening to music','enjoy 后接动名词，所以填 listening to music。')
    ]],
    ['clubs','Integration 1 · 俱乐部',[
      fill('成员（名词）','member','一个俱乐部成员是 a club member。'),
      fill('每一（限定词）','each','each 可限定单数可数名词，如 each member。'),
      fill('会议（名词）','meeting','meeting 可表示会议或会面。'),
      fill('打算、计划（动词）','plan','plan to do sth. 表示计划做某事。'),
      fill('打排球','play volleyball','球类运动前通常不用 the。'),
      fill('加入地理俱乐部','join the Geography Club','join 后可直接接组织名称。'),
      fill('一周一次','once a week','once 表示一次。'),
      fill('听起来好。',[['Sounds nice.','That sounds nice.','Sounds good.','That sounds good.']],'sound 作系动词，后接 nice 或 good。'),
      fill('丹尼尔对机器人俱乐部感兴趣。\nDaniel ____ the Robot Club.','is interested in','Daniel 用 is。固定搭配 be interested in。'),
      fill('跳舞让我感到开心。\nDancing _____.','makes me feel happy','Dancing 作主语时用 makes，make sb. feel 后接形容词 happy。'),
      fill('我们两人在俱乐部都会玩得很开心。\nBoth of us will ____ in clubs.',[['have a great time','have a good time','have fun']],'will 后用原形。三种表达都可表示玩得开心。')
    ]],
    ['design','Integration 2 · 设计与梦想',[
      fill('设计（动词）','design','design 可作动词，如 design a poster。'),
      fill('技能（名词）','skill','skill 可作可数名词。'),
      fill('艺术家（名词）','artist','艺术家是 artist。'),
      fill('能手、大师（名词）','master','master 可指精于某种技艺的人。'),
      fill('楷模、榜样',[['role model','a role model']],'role model 是让人学习或效仿的人。'),
      fill('艺术品（复数）',[['works of art','artworks']],'一件艺术品可写作 a work of art，复数为 works of art。'),
      fill('在未来','in the future','该词组表示在将来。'),
      fill('成为一个设计师','become a designer','designer 是设计师，可数名词单数前加 a。'),
      fill('我想要给我的朋友分享我的画。\nI ____ share my paintings with my friends.',[['want to','would like to']],'want to 和 would like to 都可表示想做某事。'),
      fill('我希望我的梦想成真。\nI ____ my dream ____.',['hope',['comes true','can come true','will come true']],'come true 表示实现。dream 是单数，直接用一般现在时时写 comes true。')
    ]],
    ['sentences','默写加练 · 爱好与科学句子',[
      fill('他喜欢慢跑。（用 enjoy）','He enjoys jogging.','he 对应 enjoys，enjoy 后用 jogging。'),
      fill('在周末，我喜欢读各种各样的书，因为我从它们中学到了很多。',[
        ['At the weekend, I like to read all kinds of books, because I learn a lot from them.',
          'At the weekend I like reading all kinds of books because I learn a lot from them.',
          'On the weekend I like to read all kinds of books because I learn a lot from them.',
          'At weekends I like reading all kinds of books because I learn a lot from them.']
      ],'注意 all kinds of books 和 learn a lot from them。'),
      fill('科学改变我们的生活。',[['Science changes our lives.','Science changes our life.']],'Science 作学科名用 changes，life 的复数是 lives。'),
      fill('对他来说，把东西拆开是极大的乐趣。',[
        ['It is great fun for him to take things apart.','It’s great fun for him to take things apart.',
          'Taking things apart is great fun for him.']
      ],'take things apart 表示把东西拆开。fun 在此为不可数名词，great fun 前不加 a。'),
      fill('她想成为一名科学家。',[['She wants to be a scientist.','She wants to become a scientist.']],'she 后用 wants，a scientist 中 scientist 是单数可数名词。'),
      fill('我希望我的梦想可以成真。',[
        ['I hope my dream can come true.','I hope my dream will come true.','I hope my dream comes true.']
      ],'come true 表示梦想成真。can 后用动词原形 come。'),
      fill('在我的空闲时间，我经常参观博物馆。',[
        ['In my free time, I often visit museums.','I often visit museums in my free time.',
          'In my spare time I often visit museums.']
      ],'in my free time 表示在空闲时间，often 通常放在 visit 前。')
    ]]
  ]);

  const river = [
    'One spring morning, Mole leaves his work at home and goes outside. He reaches a river that he has never seen before. Across the water, he meets Water Rat, who comes to get him in a small boat. They take food with them and stop for a picnic.',
    'On their way back, Mole wants to row. Rat warns him, but Mole takes the oars. The boat turns over, and Mole falls into the river. Rat helps his friend out of the water, and later he begins to teach Mole how to row.'
  ].join('\n\n');
  const road = [
    'Toad invites Rat and Mole on a trip in a horse-drawn caravan. They enjoy the slow journey at first. Then a fast motorcar rushes past. Their horse is frightened, and the caravan goes off the road.',
    'Rat is angry, but Toad can hardly think about the caravan. He is amazed by the speed of the car. The trip was his big plan before the accident. Now his new dream is to drive a motorcar.'
  ].join('\n\n');
  const willows = module('english-wind-willows','《柳林风声》The Wind in the Willows','七上 · 英语课外阅读',
    '读两段七年级难度的原著情节改写，练人物关系、事件顺序和情绪变化。',[
    ['河畔角色','Mole 是初到河边的鼹鼠，Water Rat 是熟悉划船的水鼠。留意谁贸然拿起船桨、谁帮了忙。'],
    ['路上发生了什么','把马车旅行、汽车驶过、马受惊和 Toad 改变兴趣按时间排序。Rat 与 Toad 对同一事件反应不同。']
  ],[
    ['river','河畔相遇',[
      choose('Where does Mole first meet Rat in this passage?',['At Mole’s house.','By the river.','In a motorcar.','In a shop.'],1,'首段讲 Mole 到河边，在水的另一边看见 Rat。'),
      choose('What do they stop to do?',['To fix the boat.','To meet Toad.','To have a picnic.','To go shopping.'],2,'首段最后写 take food 和 stop for a picnic。'),
      choose('What happens just after Mole takes the oars?',['The boat turns over.','Rat walks home alone.','It starts to rain.','Mole finishes the picnic.'],0,'次段写 Mole 拿船桨之后，boat turns over，他落水。'),
      choose('What does Rat do after the accident?',['He laughs and leaves.','He gives Mole a motorcar.','He asks Mole never to row again.','He helps Mole and later teaches him to row.'],3,'Rat 帮 Mole 上岸，后来教他划船，体现了友好。')
    ],river],
    ['road','马车与汽车',[
      choose('How do the friends begin their trip?',['On foot.','In a horse-drawn caravan.','In a small boat.','In a fast motorcar.'],1,'开头说 Toad 邀请朋友乘 horse-drawn caravan 旅行。'),
      choose('Why does the caravan go off the road?',['They are looking for a picnic spot.','The horse is tired.','The horse is frightened by a fast motorcar.','Toad wants to stop and swim.'],2,'汽车飞驰而过后，马受惊，马车离开了道路。'),
      choose('How does Toad react to the motorcar?',['He is amazed by its speed.','He wants to keep driving the caravan.','He is angry with Rat.','He never wants to travel again.'],0,'Toad 被汽车的速度吸引，之后开始梦想开汽车。'),
      choose('Which change is shown most clearly in the passage?',['Rat decides to learn to swim.','Mole decides to buy a horse.','The friends change a car into a caravan.','Toad changes from planning a caravan trip to wanting to drive a motorcar.'],3,'结尾对比了 Toad 事故前的马车计划和事故后的新梦想。')
    ],road]
  ],[{title:'Project Gutenberg · The Wind in the Willows',url:'https://www.gutenberg.org/files/289/289-h/289-h.htm',
    note:'Kenneth Grahame 原著。阅读材料根据第 1、2 章的情节简写，问题为本练习编写。'}]);

  const ruby = [
    'A little Swallow is on his way to Egypt. One night he rests below the statue of the Happy Prince high above a city. Drops of water fall on him, but there are no clouds. He looks up and sees that the Prince is crying.',
    'From his high place, the Prince can see families in trouble. In a poor home, a woman is sewing, and her little boy is sick. The Prince asks the Swallow to take the red jewel from his sword to the woman. The bird wants to leave for Egypt, but he agrees to stay for one night and help.'
  ].join('\n\n');
  const gold = [
    'The Swallow stays and helps the Prince again. Later the Prince cannot see because the bird has carried away the blue jewels from his eyes to help others. The Swallow stays with his friend. At the Prince’s request, he takes thin pieces of gold from the statue and gives them to poor people.',
    'When winter comes, the Swallow dies beside the Prince, and the Prince’s lead heart breaks. City leaders see that the statue has lost its fine appearance. But at the end of the story, the bird and the broken heart are chosen as the most precious things in the city.'
  ].join('\n\n');
  const prince = module('english-happy-prince','《快乐王子》The Happy Prince','七上 · 英语课外阅读',
    '读两段原著情节改写，练情节细节、代词指代、人物动机和主题理解。',[
    ['人物与线索','Swallow 是燕子，statue 是雕像。红宝石来自王子的剑，两颗蓝宝石是雕像的眼睛。留意王子先看到什么，燕子接着做什么。'],
    ['怎样判断主题','把城里领导者看重的外表，与故事结尾认为珍贵的东西对照。结合人物实际做过的事说明主题。']
  ],[
    ['ruby','燕子与红宝石',[
      choose('Where is the Swallow going at first?',['To the sea.','To a village.','To Egypt.','To the woman’s home.'],2,'材料第一句说明燕子原本在去埃及的路上。'),
      choose('Where do the drops of water come from?',['The Prince’s tears.','A rain cloud.','A nearby river.','The woman’s home.'],0,'没有云却有水滴，燕子抬头看到王子在哭。'),
      choose('What does the Prince ask the Swallow to take to the woman?',['A piece of gold from the statue.','A blue jewel from his eyes.','The whole sword.','The red jewel from his sword.'],3,'第二段提到 red jewel from his sword，燕子要送的是红宝石。'),
      choose('Why does the Swallow stay for one night?',['He has forgotten how to fly.','He agrees to help the Prince and the poor family.','The Prince shows him the way to Egypt.','The woman wants to take his food.'],1,'他原本想启程，但听了王子的请求后留下来帮助有困难的人。')
    ],ruby],
    ['gold','金叶与真正的珍宝',[
      choose('Why can the Prince no longer see?',['He has moved to a dark room.','The Swallow has left for Egypt.','The city has turned off the lights.','The blue jewels from his eyes have been given away.'],3,'首段用 because 交代原因，蓝宝石已被送去帮助别人。'),
      choose('In “he takes thin pieces of gold”, who does “he” refer to?',['The Swallow.','The Happy Prince.','A city leader.','The sick little boy.'],0,'这句话延续上一句燕子的行动，he 指 Swallow。'),
      choose('Which things are chosen as the most precious at the end?',['The red and blue jewels.','The statue and its sword.','The bird and the broken heart.','The city leaders’ gold.'],2,'结尾直接指出 the bird and the broken heart。'),
      choose('What idea does the ending best support?',['Only fine-looking things are valuable.','Kind actions can be more valuable than a beautiful appearance.','People should always keep their gold.','Travel is more important than helping friends.'],1,'雕像失去外表的光彩后，故事以燕子和破碎的心表彰帮助他人的行为。')
    ],gold]
  ],[{title:'Project Gutenberg · The Happy Prince and Other Tales',url:'https://www.gutenberg.org/files/902/902-h/902-h.htm',
    note:'Oscar Wilde 原著合集。阅读材料根据同名故事简写，问题为本练习编写。'}]);

  function words(entries) {
    return entries.map(([prompt,forms])=>fill(prompt,forms));
  }
  function sounds(entries) {
    return entries.map(([word,ipa])=>{
      const asciiLength = ipa.replace('ː',':');
      return fill('写出 '+word+' 中方括号部分的音标。',[[`/${ipa}/`,ipa,`/${asciiLength}/`,asciiLength]],'可带斜线，也可只写音标。');
    });
  }

  const schoolWriting = module('classroom-u3-school-writing','Unit 3 · 我的新学校写作','七上 Unit 3',
    '根据写作讲义练习介绍学校、说明喜欢某处的原因，并描述师生。',[
    ['作文的三个问题','What is your new school like? What’s your favourite place at school? What are your teachers and classmates like? 先写学校的总体印象，再写场所、活动和理由，最后写老师与同学。'],
    ['学校活动','take place 表示活动发生或举行。A lot of interesting events take place in the school hall. 也可以用 a perfect place for me to play football 写清喜欢运动场的原因。'],
    ['表达与衔接','so big and modern that… 表示“如此……以至于……”。用 What’s more 或 as well 补充信息。spend an hour reading 用动词 -ing，be ready to help 用 to 加动词原形。']
  ],[
    ['writing','描述学校 · 写作句型',[
      fill('我的学校很大也很现代化，所以我非常喜欢它。\nMy school is ____ that I love it very much.','so big and modern','so + 形容词 + that 引出结果。'),
      fill('很多有趣的活动在学校礼堂举行。\nA lot of interesting events ____ in the school hall.','take place','take place 表示有计划的活动举行。'),
      fill('运动场很适合我和朋友一起踢足球。\nThe sports field is a perfect place ____ with my friends.','for me to play football','a place for sb. to do sth. 可写出场所的用途。'),
      fill('有空时，我经常花一小时读各种各样的书。\nWhen I am free, I often ____ different kinds of books.','spend an hour reading','spend + 时间 + doing。'),
      fill('老师们很关心我们。\nOur teachers ____ us a lot.','care about','care about 表示关心。'),
      fill('同学乐于帮助别人。\nMy classmates are always ____ others.','ready to help','be ready to do sth. 表示愿意或准备好做某事。')
    ]]
  ]);

  const dailyLife = module('classroom-u4-welcome-reading','Unit 4 · Welcome–Reading 默写卷','七上 Unit 4',
    '按原卷顺序练日常活动、学校生活和 8 个元音音标。',[
    ['时间和日常活动','on weekdays、in the morning。do morning exercises 中 exercises 用复数，help with housework 中 housework 不可数。'],
    ['学校生活','learn about 后接学习的对象，leave for 后接目的地。practise doing sth. 中 practise 是英式动词拼写，美式可拼 practice。hear from sb. 表示收到某人的来信或消息。']
  ],[
    ['welcome','Welcome',[
      ...words([
        ['吃早饭、吃午饭、吃晚饭，按顺序填。',['have breakfast','have lunch','have dinner']],
        ['做早操','do morning exercises'],['上课','have lessons'],
        ['做课外活动','do after-school activities'],['帮忙做家务','help with housework'],
        ['做家庭作业',[['do homework','do one’s homework']]],
        ['上床睡觉','go to bed'],['一点、少量','a little'],
        ['玩得痛快，依次填 have fun、have a … time 和 enjoy … 三种表达。',['have fun',['have a good time','have a great time'],'enjoy oneself']]
      ]),
      fill('你工作日早上几点起床？\nWhat time do you ____ in the morning ____?',['get up','on weekdays'],'on weekdays 表示在工作日。'),
      fill('我通常去短途慢跑，而且玩得很开心。\nI ____ go for ____ and enjoy ____.',['usually','a short jog','myself'],'go for a jog 表示出去慢跑。enjoy 的反身代词和主语 I 对应。')
    ]],
    ['reading','Reading',[
      ...words([
        ['开始（动词）',[['start','begin']]],['令人惊奇的（以 a 开头）','amazing'],
        ['生物学','biology'],['采、摘','pick'],
        ['我的第一学期／第一学期',[['my first term','the first term']]],
        ['练习做某事',[['practise doing sth.','practice doing sth.','practise doing something','practice doing something']]],
        ['实地考察（单数）','field trip'],['动身去（某地）','leave for'],['一切顺利。','All the best.']
      ]),
      fill('我们阅读许多著名作家的作品。\nWe read the ____ of many ____.',['works','famous writers'],'works 指作品。'),
      fill('我们了解许多生物和自然。\nWe ____ many ____ and ____.',['learn about','living things','nature'],'living things 表示生物。'),
      fill('希望尽早收到你的来信。\nHope ____ you soon.','to hear from','hope to do sth.，hear from sb.。')
    ]],
    ['pronunciation','Pronunciation',sounds([['p[ar]k','ɑː'],['dr[aw]','ɔː'],['s[ee]','iː'],['h[ea]d','e'],['f[oo]d','uː'],['b[oo]k','ʊ'],['b[ir]d','ɜː'],['aft[er]','ə']])]
  ]);

  const schoolActivities = module('classroom-u4-grammar-integration','Unit 4 · Grammar–Integration 默写卷','七上 Unit 4',
    '按三个板块练频率副词、时间介词、实地考察和班级值日。',[
    ['频率与时间','seldom 和 always 通常放在实义动词前。具体某天的上午用 on Tuesday morning，时长可用 for about half an hour。'],
    ['参观和值日','take a trip to、go on a field trip、share sth. with sb.、try one’s best to do sth.。take care of 相当于 look after。']
  ],[
    ['grammar','Grammar',[
      ...words([['很少（以 s 开头）','seldom'],['当然。','Of course.'],['在运动场上','on the sports field']]),
      fill('我们将在周二早上去一个农场旅游。\nWe will ____ to a farm ____.',['take a trip','on Tuesday morning'],'星期几的上午前用 on。'),
      fill('她总是跳大约半个小时的舞。\nShe always ____ for about ____.',['dances','half an hour'],'she 后用 dances，half an hour 表示半小时。'),
      fill('我没有很多时间去打网球。\nI do not have ____ time to ____.',['much','play tennis'],'time 在这里不可数，球类名称前通常不加冠词。')
    ]],
    ['integration-1','Integration 1',[
      ...words([
        ['累人的（描述事情）','tiring'],['参观、旅行（名词，以 t 开头）','tour'],['团队合作','teamwork'],
        ['种苹果、植树，按顺序填。',['grow apples','plant trees']],['在学校网站上','on the school website'],
        ['观看视频（单复数均可）',[['watch videos','watch a video']]]
      ]),
      fill('我们带一些苹果回家并与家人分享。\nWe take some apples home and ____ them ____ our family.',['share','with'],'share sth. with sb.。'),
      fill('我喜欢实地考察，因为我喜欢待在外面。\nI love ____ because I like ____.',['field trips',['being outside','to be outside']],'field trips 表示不止一次的实地考察。'),
      fill('每个人都尽力使事情变得更好。\nEverybody ____ to ____.',['tries their best','make things better'],'Everybody 作主语时，谓语用第三人称单数。'),
      fill('我喜欢周一的班级值日。保持学校区域整洁很棒。\nI like our ____ on Mondays. It is good to ____.',['class duties','keep our school area clean'],'keep + 宾语 + 形容词。')
    ]],
    ['integration-2','Integration 2',[
      ...words([['参加（活动，三词）','take part in'],['小组合作','work in groups'],['轮流做某事',[['take turns to do sth.','take turns doing sth.','take turns to do something']]]]),
      fill('我擦黑板并清空垃圾桶。\nI clean the blackboard and ____.','empty the bins','empty 在这里作动词。'),
      fill('我们学习如何照顾那里的植物，先填 take…，再填 look…。\nWe learn how to ____ the plants there.',['take care of','look after'],'两种说法都可表示照顾。')
    ]]
  ]);

  const lifestyle = module('classroom-u5-welcome-reading','Unit 5 · Welcome–Reading 默写卷','七上 Unit 5',
    '按原卷板块默写食物、生活方式、健康句型与 8 个辅音音标。',[
    ['食物与数量','candies 或 sweets 可数，chocolate、beef、mutton、sugar 一般不可数。many cucumbers、too much mutton、less sugar。'],
    ['生活习惯','have a sweet tooth 爱吃甜食，stay up 熬夜，without breakfast 没吃早饭。keep fit 和 stay healthy 表示保持健康。'],
    ['句型','It is + 形容词 + for sb. + to do sth.。What else…? 可改写成 What other food…?。say no to 表示拒绝。']
  ],[
    ['welcome','Welcome',[
      ...words([
        ['柠檬','lemon'],['西瓜','watermelon'],['牛肉','beef'],['猪肉','pork'],
        ['有一种健康的生活方式','have a healthy lifestyle'],['许多黄瓜和甜椒','many cucumbers and peppers'],
        ['一些糖果和巧克力',[['some sweets and chocolate','some candies and chocolate']]],
        ['对健康有益、对健康有害，按顺序填。',['be good for health','be bad for health']],
        ['一些美味的点心','some delicious snacks'],['我也是。','Me too.']
      ]),
      fill('经常喝牛奶、吃鸡蛋对我们来说是健康的。\n____ us ____ often.',[['It’s healthy for','It is healthy for'],'to have milk and eggs'],'It is healthy for sb. to do sth.。'),
      fill('你经常吃其他什么？\n____ do you often eat? = ____ do you often eat?',['What else','What other food'],'else 放在疑问词后，other 放名词前。')
    ]],
    ['reading','Reading',[
      ...words([
        ['喜欢待在家里的人','homebody'],['有点不健康的','a little unhealthy'],
        ['很少吃蛋糕和糖果','seldom eat cakes or sweets'],['吃更多水果和更少食糖','eat more fruit and less sugar'],
        ['有一种不健康的饮食','have an unhealthy diet'],['计划去游泳','plan to go swimming'],
        ['没吃早饭去上学',[['go to school without breakfast','go to school without having breakfast']]],
        ['午餐吃一个煎饼','have a pancake for lunch'],['太多羊肉','too much mutton'],
        ['对我们的牙齿有害','be bad for our teeth'],['多锻炼，先填 exercise…，再填 do…。',['exercise more','do more exercise']],
        ['爱吃甜食（用 tooth）','have a sweet tooth'],['熬夜','stay up'],
        ['需要得到足够的睡眠并经常锻炼',[['need to get enough sleep and exercise very often','need to get enough sleep and exercise often']]]
      ]),
      fill('对我来说拒绝蛋糕很难。\n____ me to ____ cakes.',[['It’s hard for','It is hard for'],'say no to'],'say no to cakes 表示拒绝蛋糕。'),
      fill('保持健康对他来说很重要。\nIt’s ____ for him ____.',['important',['to keep fit','to stay healthy','to keep healthy']],'It’s important for him to do sth.。')
    ]],
    ['pronunciation','Pronunciation',sounds([['o[f]ten','f'],['[v]ery','v'],['bo[th]','θ'],['[th]ere','ð'],['ma[tch]','tʃ'],['[g]ym','dʒ'],['[tr]y','tr'],['[dr]eam','dr']])]
  ]);

  const breakfast = module('classroom-u5-health-morning','Unit 5 · 健康生活早读与数量提问','七上 Unit 5',
    '练习早读课件中的饮食、睡眠、数量提问和完整句翻译。',[
    ['问数量','面向包装数用 How many packets of salt…?，面向盐的总量用 How much salt…?。sweets 可数，问糖果数量用 How many sweets…?。'],
    ['问时长','How long do you sleep every day? 可答 I sleep for more than eight hours every day.。How long do you spend sleeping…? 用 spend + 时间 + sleeping 回答。'],
    ['足够与过多','enough 放在名词前、形容词后。too many 后接可数名词复数，too much 后接不可数名词。'],
    ['maybe 与 may be','Maybe 放在句首表示“也许”。may be 由情态动词 may 和原形 be 组成，可在句中作谓语。']
  ],[
    ['words','早读词形与搭配',[
      fill('写出 health 的形容词及其反义词，按顺序填。',['healthy','unhealthy'],'health 是名词，healthy 与 unhealthy 是形容词。'),
      fill('写出 tooth、homebody 和 kilo 的复数，按顺序填。',['teeth','homebodies','kilos'],'tooth 的复数不规则，homebody 把 y 变 i 加 es，kilo 加 s。'),
      fill('写出 little 的比较级、many 的比较级与最高级，按顺序填。',['less','more','most'],'much 的比较级和最高级也分别是 more、most。'),
      fill('写出 miss 的第三人称单数。','misses','以 ss 结尾的动词在第三人称单数中加 -es。'),
      fill('学生们的生活方式\nthe ____ lifestyles','students’','students 是复数，所有格在 s 后加撇号。'),
      fill('太多食糖、太多点心，按顺序填。',['too much sugar','too many snacks'],'sugar 不可数，snacks 是可数名词复数。'),
      fill('不到八个小时／八个多小时，按顺序填。',[
        ['less than eight hours','less than 8 hours'],
        ['more than eight hours','more than 8 hours','over eight hours','over 8 hours']
      ],'less than 表示少于，more than 与 over 均可表示多于。'),
      fill('做出一些改变\nmake ____','some changes','change 作可数名词时，some 后用复数。'),
      fill('它为我们提供整个早上的能量。\nIt gives us ____ for ____.',['energy','the whole morning'],'energy 在这里不可数。'),
      fill('足够的锻炼／足够健康，按顺序填。',['enough exercise','healthy enough'],'enough 修饰名词放在名词前，修饰形容词放在形容词后。'),
      fill('你早餐吃什么？／你吃早餐吗？写出两句。',['What do you have for breakfast?','Do you have breakfast?'],'have breakfast 表示吃早餐，have … for breakfast 表示早餐吃……。'),
      choose('哪一项同时正确使用了 maybe 和 may be？',['May be he is tired. He maybe at home.','Maybe he is tired. He may be at home.','Maybe he tired. He may home.','He may be tired. He maybe be at home.'],1,'句首可用副词 Maybe。主语后可用 may be 作谓语。'),
      fill('健康的生活方式离不开健康饮食、充足锻炼和休息。\nA healthy lifestyle is all about a healthy diet, ____.','enough exercise and rest','这里 exercise 和 rest 都用作不可数名词。')
    ]],
    ['grammar','同义转换与提问',[
      fill('I go to school and I don’t have breakfast.\nI go to school ____ breakfast.','without having','without 是介词，后接动词的 -ing 形式。'),
      fill('Tom needs two packets of salt. 对包装的数量提问。\n____ of salt does Tom need?','How many packets','packets 是可数名词复数。'),
      fill('Tom needs two packets of salt. 对盐的总量提问。\n____ does Tom need?','How much salt','salt 在这里不可数。'),
      fill('Tom needs two packets of sweets. 问需要多少颗糖果。\n____ does Tom need?','How many sweets','sweets 是可数名词复数。'),
      fill('How long do you sleep every day?\nI sleep ____ every day.（近八小时）',[['for almost eight hours','for almost 8 hours','almost eight hours','almost 8 hours']],'almost 表示接近，for 后可接一段时间。'),
      fill('用完整的下半句回答。你每天花多长时间睡觉？\nI spend ____ every day.（八个多小时）',[['more than eight hours sleeping','over eight hours sleeping','more than 8 hours sleeping','over 8 hours sleeping']],'用 spend + 时间 + doing 表示花时间做某事。'),
      fill('Amy buys six bottles of juice. 对瓶数提问。\n____ of juice does Amy buy?','How many bottles','问瓶子的数量使用 How many bottles。')
    ]],
    ['sentences','早读翻译填空',[
      fill('他不爱吃甜食。\nHe ____.',[["doesn’t have a sweet tooth",'does not have a sweet tooth',"doesn’t like sweets",'does not like sweets']],'have a sweet tooth 表示爱吃甜食。'),
      fill('他熬夜并且有不健康的饮食。\nHe ____ and ____.',['stays up','has an unhealthy diet'],'两个动词都与主语 he 一致。'),
      fill('充足的睡眠对我们的健康很重要。\nGetting ____ is important ____.',['enough sleep','for our health'],'Getting enough sleep 作主语。'),
      fill('太多食糖对牙齿有害。\n____ is ____ our teeth.',['Too much sugar','bad for'],'sugar 不可数，使用 much。'),
      fill('他需要多锻炼、少吃盐。\nHe needs to ____ and ____.',[['exercise more','do more exercise'],'eat less salt'],'salt 不可数，用 less 修饰。'),
      fill('我从来不不吃早饭就上学。\nI never go to school ____.',[['without breakfast','without having breakfast']],'never 和 without 分别表示“从不”和“没有”。'),
      fill('我早餐吃两片面包。\nI have ____ for breakfast.',[['two pieces of bread','two slices of bread','2 pieces of bread','2 slices of bread']],'bread 不可数，借助 pieces 或 slices 计量。')
    ]]
  ]);

  const paraphrase = module('classroom-upper-paraphrase','期中同义句转换 · 11 组与任务型问答','七上 · 英语期中复习',
    '按原卷练同义替换、动词形态和时间表达，再答频率问题。',[
    ['搭配转换','go by、hear from、take care of、enjoy oneself、as well、spend time doing、be in a team、would like、be good at。改写后检查人称、时态和动词形式。'],
    ['时间说法','from Monday to Friday 可概括为 on weekdays。on Saturday and Sunday 可写 at the weekend 或 on weekends。How often 用频率或说明固定哪几天来回答。']
  ],[
    ['conversion','同义句转换 1–11',[
      fill('You can call him Daniel.\nHe ____ Daniel.','goes by','he 后用 goes。'),
      fill('I hope to get a letter from you soon.\nI hope to ____ you soon.','hear from','hear from 表示收到某人的来信。'),
      fill('Sandy helps her mother look after her brother.\nSandy helps her mother ____ her brother.','take care of','take care of 与 look after 都表示照顾。'),
      fill('I often have fun playing ping-pong.\nI often ____ playing ping-pong.',[['enjoy myself','have a good time','have a great time']],'主语是 I，反身代词用 myself。'),
      fill('Johnny is interested in playing volleyball too.\nJohnny is interested in playing volleyball ____.','as well','as well 可置于句末，意为“也”。'),
      fill('I do sport for half an hour every day.\nI ____ half an hour ____ sport every day.',['spend','doing'],'spend + 时间 + doing。'),
      fill('We are members of the basketball team.\nWe ____ the basketball team.',[['are in','are on']],'are in / are on the team 可表示是队员。'),
      fill('Do you want to go to school with me?\n____ you ____ to go to school with me?',['Would','like'],'Would you like to…? 用于邀请。'),
      fill('Kitty does well in singing and dancing.\nKitty ____ singing and dancing.','is good at','be good at 与 do well in 都表示擅长。'),
      fill('He takes a bus to school from Monday to Friday.\nHe takes a bus to school ____.','on weekdays','on weekdays 表示工作日。'),
      fill('He watches football matches on Saturday and Sunday.\nHe watches football matches ____.',[['at the weekend','at weekends','on weekends','on the weekend']],'英式常用 at the weekend，美式常用 on the weekend。')
    ]],
    ['frequency','任务型阅读 · 频率',[
      fill('He watches football matches on Saturday and Sunday.\nHow often does he watch football matches?',[
        ['At the weekend.','At weekends.','On weekends.','Every weekend.','On Saturday and Sunday.',
          'He watches football matches at the weekend.','He watches football matches on weekends.','Twice a week.']
      ],'回答可指出每个周末，也可按题意说明一周两天。')
    ]]
  ]);
  const unitFourMidterm = module('classroom-u4-midterm-dictation','Unit 4 · 期中复习默写卷与早读','七上 Unit 4',
    '按期中默写卷的词汇、短语、句型顺序练习，附早读里的词形和易混句型。',[
    ['词形','activity → activities，duty → duties，video → videos，one → first，usual → usually，live → living，good/well → better。amazing、tiring 通常描述事物带给人的感受，amazed、tired 通常描述感受者。'],
    ['时间和频率','时间点用 at。泛指早晨用 in the morning，某天的上午或下午用 on。频率问 How often。never、seldom 带有否定或近似否定意义，许多相应语境中用 any、or。'],
    ['三个问题','What is Tom like? 问特点。What does Tom like? 问喜好。What does Tom look like? 问外貌。'],
    ['活动与搭配','take part in 或 join in 后可接活动，join a club 指加入组织。take care of 与 look after 都表示照顾，care about 表示关心。keep our area clean 用 keep + 宾语 + 形容词。']
  ],[
    ['words','原卷 · 词汇 1–14',words([
      ['家庭作业（名词）','homework'],['开始、着手（动词）',[['start','begin']]],['one 的序数词','first'],
      ['学期','term'],['很少（以 s 开头）','seldom'],['（使）生长','grow'],['video 的复数','videos'],
      ['团队合作','teamwork'],['累人的（描述事情）','tiring'],['duty 的复数','duties'],
      ['生物学','biology'],['采、摘、挑选（以 p 开头）','pick'],['参观、旅行（以 t 开头的名词）','tour'],
      ['令人大为惊奇的（以 a 开头）','amazing']
    ])],
    ['phrases','原卷 · 短语 1–18',words([
      ['在工作日','on weekdays'],['起床','get up'],
      ['参加课外活动',[['take part in after-school activities','join in after-school activities']]],
      ['去短距离慢跑','go for a short jog'],['读一会书',[['read a little','read for a little while']]],
      ['生物（活的东西）','living things'],['很多著名作家的作品','the works of many famous writers'],
      ['亲近大自然','get close to nature'],
      ['练习打网球',[['practise playing tennis','practice playing tennis']]],
      ['动身去一个农场','leave for a farm'],
      ['进行一次实地考察',[['have a field trip','go on a field trip']]],['当然','of course'],
      ['喜欢待在外面',[['enjoy being outside','like being outside','like to be outside']]],
      ['学习如何照顾植物',[['learn how to take care of plants','learn how to look after plants']]],
      ['倒空一个垃圾桶','empty a bin'],['在学校网站上','on the school website'],
      ['保持我们学校区域干净','keep our school area clean'],['在周五下午','on Friday afternoon']
    ])],
    ['sentences','原卷 · 句型 1–3',[
      fill('小组合作并且轮流做不同的日常事务很棒。\nIt’s good to ____ and ____ do different chores.',['work in groups','take turns to'],'work in groups 是小组合作，take turns to do sth. 是轮流做某事。'),
      fill('每个人都尽力让事情变得更好。\nEverybody ____ to ____.',['tries their best','make things better'],'Everybody 作主语，谓语用 tries。make things better 中 better 作宾语补足语。'),
      fill('我通常在周末做家务并且玩得很开心。\nI ____ at the weekend and ____.',['usually do housework','enjoy myself'],'按主语选反身代词，此处为 myself。')
    ]],
    ['morning','早读 · 词形与句型补练',[
      fill('写出 activity 的复数、usual 的副词。',['activities','usually'],'activity 变复数时把 y 改成 i 加 es。usual 是形容词，usually 是副词。'),
      fill('按顺序填 I 的反身代词与形容词性物主代词。',['myself','my'],'enjoy myself 和 my first term 分别用这两种形式。'),
      fill('选用 amaze、live 的适当形式。\nWe saw many ____ things on the trip. It was an ____ day.',['living','amazing'],'living things 是生物，amazing 修饰令人惊奇的事物。'),
      fill('填 good 和 well 的比较级。\nThe plan is ____ now, and we work ____ together.',['better','better'],'good 和 well 的比较级都是 better。'),
      fill('写出“一个作家的”和“多位作家的”，都用 writer。',[
        ['a writer’s',"a writer's"],['writers’',"writers'"]
      ],'单数所有格加 ’s，已加 s 的规则复数在 s 后加撇号。'),
      fill('你们多久做一次早操？\n____ do you do morning exercises?','How often','问频率用 How often，问具体钟点常用 What time。'),
      fill('我先做早操。\nI do morning exercises ____.','first','这里 first 作副词，表示先做。'),
      fill('学习怎样种苹果，以及在哪里植树。\nLearn ____ and ____.',['how to grow apples','where to plant trees'],'how / where + to do 可分别表达方式和地点。'),
      fill('我喜欢待在户外，因为我能亲近大自然。\nI like ____ because I can ____.',[['being outside','to be outside'],'get close to nature'],'like 可接 doing 或 to do。get close to 表示亲近。'),
      choose('要问汤姆长什么样，用哪一句？',['What does Tom like?','What is Tom like?','What does Tom look like?','What time does Tom get up?'],2,'look like 指外貌。What does Tom like? 问喜好。'),
      choose('下面哪项最适合表达“她几乎不吃蛋糕或糖果”？',['She seldom eats cakes or sweets.','She always eats cakes and sweets.','She often eats cakes or sweets.','She never seldom eats cakes.'],0,'seldom 表示很少。or 在此连接两个很少吃的食物。'),
      fill('去农场旅行（用 trip），再写“参观博物馆”（用 tour）。',[
        ['take a trip to a farm','have a trip to a farm'],['have a tour of the museum','take a tour of the museum']
      ],'trip 常搭配 to + 目的地，tour of 可表示参观某地。'),
      fill('和同学分享视频。\nShare the videos ____ classmates.',[['with','with your','with my','with our','with their']],'share sth. with sb. 是固定搭配。')
    ]]
  ]);
  return [
    introduction,grammar,integration,willows,prince,schoolWriting,dailyLife,schoolActivities,lifestyle,breakfast,paraphrase,unitFourMidterm
  ];
})();

const englishClassroomByTopic = new Map(englishClassroomModules.map(module=>[module.key,module]));
const classroomEnglish = subjects.find(subject=>subject.id==='english');
for (const module of englishClassroomModules) {
  classroomEnglish.topics.push({
    ...module,term:'上',questions:module.questions.map(question=>({...question,subject:'english',topic:module.key}))
  });
}
