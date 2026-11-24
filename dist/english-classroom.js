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

  return [introduction,grammar,integration,willows,prince];
})();

const englishClassroomByTopic = new Map(englishClassroomModules.map(module=>[module.key,module]));
const classroomEnglish = subjects.find(subject=>subject.id==='english');
for (const module of englishClassroomModules) {
  classroomEnglish.topics.push({
    ...module,term:'上',questions:module.questions.map(question=>({...question,subject:'english',topic:module.key}))
  });
}
