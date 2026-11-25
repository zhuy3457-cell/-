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
    const sections = groups.map(([keySuffix,stage,items,material,startNumber])=>{
      const ids = items.map((item,index)=>{
        const number = startNumber===undefined ? questions.length+1 : startNumber+index;
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
  const toadHall = [
    '“Is Toad (蛤蟆) a nice animal?” asked Mole (鼹鼠), as Rat (河鼠) rowed the boat.',
    '“Yes,” replied Rat. “Toad is very kind. But he’s not very clever. And he is a little, well... boastful (自吹自擂的), but I like Toad very much.”',
    'They travelled along the river. Rat sang a song about ducks. Soon, they saw Toad Hall, Toad’s house. It was a lovely old house near the river with beautiful gardens.',
    '“There’s Toad’s Hall,” said Rat. “Toad is very rich, you know.” Rat and Mole found Toad in the garden. He was looking at a big map.',
    '“Mole and Rat!” he cried. “Oh, it’s great to see you. And you can help me—it’s very important.”',
    '“Do you want help with your boat?” asked Rat.',
    '“Boat? Oh, no,” said Toad. “Boats are stupid (愚蠢的). I hate boats. I have a new thing now. Come and see.”',
    'Rat and Mole went with Toad to the back of the house. There they saw the new thing—it was a Gypsy caravan (大篷车). It was yellow and green with red wheels.',
    '“Look, look!” cried Toad. Mole was very excited. Mole went up the steps into the caravan with Toad. It was very small, but very nice. There were three little beds. There was a little table, a cooker, bookshelves and a bird cage with a bird in it.',
    '“It’s perfect,” said Toad. He opened a cupboard. “Look,” he cried. “Food, drink, paper and cards. It’s ready for our journey this afternoon.”',
    '“What?” said Rat. “Our journey and this afternoon?”',
    '“Now, Rat,” said Toad. “Please, please come with me. We can see the world—together.”',
    '“No,” said Rat. “I don’t want to see the world. I want to stay on my river. And Mole wants to stay on the river too. Don’t you, Mole?”',
    '“Er... Yes, of course,” said Mole, sadly. He looked at the yellow and green caravan. Then he looked at Toad.',
    '—Adapted from The Wind in the Willows'
  ].join('\n\n');
  const willows = module('english-wind-willows','《柳林风声》The Wind in the Willows','七上 · 英语课外阅读',
    '读三篇情节改写，练人物判断、事件排序和最佳标题，含学案第 53–57 题。',[
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
    ],road],
    ['toad-hall','拜访蛤蟆庄园 · 学案 53–57',[
      choose('What did Rat think of Toad?',['Noisy but clever.','Clever and rich.','Kind but boastful.','Stupid and unfriendly.'],2,'Rat 说 Toad 很善良（very kind），也有点爱自夸（a little boastful）。'),
      choose('How did Toad feel when seeing Mole and Rat?',['Excited.','Worried.','Afraid.','Lucky.'],0,'Toad 一见面就喊出他们的名字，并说 “it’s great to see you”，表现出兴奋。'),
      choose('Which of the following shows the right order of the story?\n(a) Toad opened a cupboard.\n(b) Rat sang a song about ducks.\n(c) Toad was looking at a big map.\n(d) Mole went up the steps into the caravan with Toad.',
        ['a-c-b-d','b-c-d-a','b-c-a-d','a-d-b-c'],1,'Rat 在路上唱歌（b），到达庄园后他们在花园看到 Toad 正看地图（c），接着 Mole 登上大篷车（d），最后 Toad 打开柜子（a）。'),
      choose('Which of the following is TRUE about Toad?',['His house was very far from the river.','His caravan was in front of the house.','He always wanted to stay on the river.','He planned a journey with Mole and Rat.'],3,'Toad 已为下午的旅行做好准备，还邀请两位朋友一起去。房子靠河，大篷车在屋后，想留在河上的是 Rat。'),
      choose('Which can be the best title for this passage?',['A Visit to Toad Hall','Three Good Friends','Toad’s New Caravan','A Happy Boat Trip'],0,'全文写 Rat 和 Mole 去拜访 Toad，从划船抵达、在花园见面，写到看大篷车和谈旅行。A 能概括完整经过，C 只概括其中一个情节。')
    ],toadHall,53]
  ],[{title:'Project Gutenberg · The Wind in the Willows',url:'https://www.gutenberg.org/files/289/289-h/289-h.htm',
    note:'Kenneth Grahame 原著。前两组为情节简写与配套练习，拜访蛤蟆庄园一组来自学案照片。'}]);

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
  const unitOneMorning = module('classroom-u1-morning-reading','Unit 1 · 早读词形与同义表达','七上 Unit 1',
    '根据 Unit 1 早读补练自我介绍、名词和动词词形、同义表达与固定搭配。',[
    ['动词和词形','greet sb. 直接接宾语，introduce 的 -ing 形式是 introducing。hobby 的复数是 hobbies。call sb. + 名字可以和 go by + 名字对照。'],
    ['固定搭配','let sb. do sth. 不加 to。be full of = be filled with。be good at doing = do well in doing。play the piano，play football，play chess。'],
    ['人物与时间','other people = others。人对某事感兴趣用 interested，事物令人感兴趣用 interesting。here、there、home 作地点副词时可直接接在动词后，this / every / next / last 加时间名词前通常不用介词。']
  ],[
    ['forms','词形与班级',[
      fill('用 greet 的适当形式。\nAmy often ____ her classmates with a smile.','greets','greet 作及物动词。Amy 对应第三人称单数 greets。'),
      fill('用 introduce 的 -ing 形式。\nI am ____ myself to the class.','introducing','去掉末尾不发音的 e 再加 -ing。'),
      fill('用 hobby 的复数。\nReading and chess are my two ____.','hobbies','词尾为辅音字母加 y，复数把 y 改成 i 再加 es。'),
      fill('你在哪个班？用 Which 开头。\n____ are you in?','Which class','问班级用 Which class，答语可用 I’m in Class One。'),
      fill('见到你，我很高兴。\nI’m ____ meet you.','glad to','be glad to do sth. 表示高兴做某事。')
    ]],
    ['patterns','句型与易错搭配',[
      fill('Amy 也叫 Sunny。用 call 与 go by 各补一句。\nYou can ____ Sunny. She ____ Sunny.',['call her','goes by'],'call 后用宾格 her。she 后用 goes by。'),
      fill('让他介绍自己。\nLet ____ himself.','him introduce','let 后用代词宾格加动词原形。'),
      fill('公园里到处是花。按顺序填两种搭配。\nThe park is ____ flowers. = The park is ____ flowers.',['full of','filled with'],'be full of 与 be filled with 都可以表示充满。'),
      fill('他擅长跑步。用 good 和 well 分别补全。\nHe is ____ running. = He ____ running.',['good at','does well in'],'be good at doing 对应 do well in doing。'),
      fill('她乐于帮助别人。\nShe is ____.',[['ready to help others','ready to help other people']],'others 本身表示其他人，other 则可修饰 people。'),
      fill('用 interested 或 interesting 填空。\nI am ____ in chess because it is ____.',['interested','interesting'],'interested 描述人的感受，interesting 描述引起兴趣的事物。'),
      fill('分别用 have 和 with 描写她的长发。\nShe ____. = She is a girl ____.',['has long hair','with long hair'],'have 的第三人称单数是 has。with long hair 作后置修饰语。'),
      choose('哪句表达正确？',['I play piano and the chess.','I go to home every Friday.','I play the piano and go home after class.','I play the football at next week.'],2,'乐器前用 the。home 在 go home 中作副词，不用 to。')
    ]]
  ]);

  const unitThreeWelcome = module('classroom-u3-welcome-reading','Unit 3 · Welcome–Reading 默写卷','七上 Unit 3',
    '按原卷顺序练学校设施、阅读词句与八个辅音音标。',[
    ['校园设施与活动','gym、sports field、dining hall、a modern library、lab、building。on the sports field 表示在运动场上，其他室内场所常用 in。take place 表示活动举行。'],
    ['观察与搭配','see sb. doing sth. 强调看见动作正在进行。see sb. do sth. 可强调看到整个动作，课内题也用来表达经常看见。spend time doing sth. 中用动词 -ing。']
  ],[
    ['welcome','Welcome · 原卷 1–10',[
      ...words([
        ['体育馆（以 g 开头）','gym'],['建筑物','building'],['体育场','sports field'],['学校餐厅（两词）','dining hall'],
        ['最棒的部分','the best part'],['一个现代化的图书馆','a modern library'],['干净又明亮','clean and bright']
      ]),
      fill('我们也有一个实验室，用 as well。\nWe have ____.','a lab as well','as well 用在句末。'),
      fill('你的新学校怎样？依次用 How 和 What 开头写两句。',['How is your new school?','What is your new school like?'],'What is … like? 可用来询问特点。'),
      fill('你的学校有多少间教室？\n____ classrooms ____ your school ____?',['How many','does','have'],'classroom 可数，does 后使用 have。')
    ]],
    ['reading','Reading · 原卷 1–17',[
      ...words([
        ['所有人、每人（代词）',[['everyone','everybody']]],
        ['很、真正地（以 r 开头）','really'],['马上、很快（以 s 开头）','soon'],['进行、发生','take place'],
        ['许多绿地',[['lots of green spaces','a lot of green spaces','many green spaces']]],
        ['花时间做某事',[['spend time doing sth.','spend time doing something']]],
        ['和某人聊天',[['chat with sb.','chat with somebody','chat with someone']]],
        ['看见某人正在做某事',[['see sb. doing sth.','see somebody doing something','see someone doing something']]],
        ['看到某人做某事（用动词原形结构）',[['see sb. do sth.','see somebody do something','see someone do something']]],
        ['在大门附近','near the gate'],['学校新闻','school news'],['榜样（复数）','role models'],
        ['发现更多的好地方',[['find more great places','find more good places']]],['相信我','trust me']
      ]),
      fill('它们非常适合学习。\nThey are ____.','perfect for studying','介词 for 后接 studying。'),
      fill('许多令人激动的体育比赛在此举行。\nLots of ____ on it.','exciting sports matches take place','matches 是复数主语，take 用原形。'),
      fill('告示牌也展示了学生的绘画和照片。\nThe noticeboards ____ students’ ____ and ____.',['also show','paintings',['photos','photographs']],'also 一般放在实义动词前。')
    ]],
    ['pronunciation','Pronunciation · 原卷 8 题',sounds([['[k]ite','k'],['e[gg]','g'],['[wh]o','h'],['na[m]e','m'],['[y]ear','j'],['[r]ed','r'],['si[ng]','ŋ'],['s[w]im','w']])]
  ]);

  const unitThreeMidterm = module('classroom-u3-midterm-dictation','Unit 3 · 期中复习默写卷与早读','七上 Unit 3',
    '按期中卷的词汇、短语、句型顺序练习，并补练早读中的词形、易混句型和词性。',[
    ['词形与词性','build → building(s)，dine → dining，library → libraries，chat → chatting，excite → exciting，real → really，teach → teaches。news 不可数，The news is exciting.。'],
    ['也、还有什么','as well、too 常用在肯定句句末。also 通常置于实义动词前、be 动词后。either 可用在否定句句末。What else…? 可换成 What other things…?。'],
    ['数量与习惯搭配','two thousand 有具体数字时不加 s，表示不确定的大量时用 thousands of。borrow sth. from sb.，teach us English，be different from。'],
    ['两处答案订正','词汇第 11 题学生卷的提示为“大的”，参考答案行误重复了 special，对应 large。短语第 17 题 like 后可用 playing 或 to play。']
  ],[
    ['words','原卷 · 单词 1–17',words([
      ['部分','part'],['大门','gate'],['新闻、消息','news'],['例如、像（介词，以 l 开头）','like'],['更多','more'],
      ['真正地','really'],['很快、马上','soon'],['演出、展览（以 s 开头的名词）','show'],['灰色的',[['grey','gray']]],
      ['不同的','different'],['大的（以 l 开头）','large'],['相当、颇（以 q 开头）','quite'],['体育馆','gym'],
      ['实验室',[['lab','laboratory']]],['楼房、建筑物','building'],['所有人、人人',[['everyone','everybody']]],
      ['特别的、特殊的','special']
    ])],
    ['phrases','原卷 · 短语 1–24',words([
      ['一个体育场','a sports field'],['两个餐厅',[['two dining halls','2 dining halls']]],
      ['也（用 as 开头的短语）','as well'],['确切地说、事实上',[['in fact','as a matter of fact']]],
      ['关心','care about'],['一个现代化的图书馆','a modern library'],
      ['许多绿地',[['lots of green spaces','a lot of green spaces','many green spaces']]],
      ['花时间做某事',[['spend time doing sth.','spend time doing something']]],
      ['看到某人正在做某事',[['see sb. doing sth.','see someone doing something']]],
      ['看到某人做某事（用动词原形结构）',[['see sb. do sth.','see someone do something']]],
      ['相信我','trust me'],['教我们英语','teach us English'],
      ['告诉某人关于某事',[['tell sb. about sth.','tell someone about something']]],
      ['在校足球队',[['be in the school football team','be on the school football team']]],
      ['跟某人问好',[['say hello to sb.','say hello to someone']]],
      ['每次、一次（用 at）','at a time'],
      ['喜欢一起打乒乓球',[['like playing ping-pong together','like to play ping-pong together','enjoy playing ping-pong together','like playing table tennis together','like to play table tennis together']]],
      ['成千上万的','thousands of'],
      ['从某人处借某物',[['borrow sth. from sb.','borrow something from someone','borrow from']]],
      ['在顶楼','on the top floor'],['阅读报纸和杂志','read newspapers and magazines'],
      ['因做某事感谢某人',[['thank sb. for doing sth.','thank someone for doing something']]],
      ['一个重大事件',[['a major event','an important event','a big event','an event']]],['干净又明亮','clean and bright']
    ])],
    ['sentences','原卷 · 句型 1–4',[
      fill('它们非常适合学习。\nThey are ____.','perfect for studying','for 是介词，后用 studying。'),
      fill('许多令人激动的体育比赛在此举行。\nLots of ____ on it.','exciting sports matches take place','take place 表示举行。'),
      fill('他经常和学生聊天，并帮助他们解决问题。\nHe often ____ the students and ____ their problems.',['chats with','helps them with'],'he 后用 chats 和 helps。help sb. with sth. 表示帮助某人处理某事。'),
      fill('你还喜欢我们学校的哪些方面？\n____ about our school?',[['What else do you like','What other things do you like']],'else 紧跟疑问词，other 放在名词前。')
    ]],
    ['morning','早读 · 词形与译写',[
      fill('写出 build 对应的单数名词，以及 dine 在 dining hall 中的形式。',['building','dining'],'building 是建筑物，dining hall 是食堂。'),
      fill('写出 library 的复数和 chat 的 -ing 形式。',['libraries','chatting'],'library 复数变 y 为 i 加 es。chat 要双写 t。'),
      fill('写出 excite 的形容词，形容比赛让人兴奋。\nan ____ match','exciting','exciting 描述事物带给人的感受。'),
      fill('写出 many / much 的比较级和 real 的副词。',['more','really'],'many、much 的比较级相同。real 加 -ly。'),
      fill('写出 teach 的第三人称单数。','teaches','teach 以 -ch 结尾，第三人称单数加 -es。'),
      fill('填介词。\n____ the lab / ____ the sports field',['in','on'],'在实验室内部用 in，在运动场上用 on。'),
      fill('分别写“两千”和“成千上万的”。',['two thousand','thousands of'],'具体数量 two thousand 不加 s。'),
      fill('事实上，我们真的关心彼此。\n____, we really ____.',['In fact','care about each other'],'care about 后接关心的人或事。'),
      fill('我们喜欢花时间和朋友聊天。\nWe enjoy ____ with our friends.','spending time chatting','enjoy 和 spend time 后都用 -ing。'),
      fill('最好的部分是现代化图书馆，因为我们可以从那里借书。\nThe best part is the modern library because we can ____.','borrow books from it','borrow sth. from… 表示从某处借入。'),
      fill('我们学校不大，但对我来说是个特别的地方。不能用 big。\nOur school ____, but it is ____ for me.',[
        ["isn't large",'is not large'],'a special place'
      ],'large 对应“大”，a special place 表示特别的地方。'),
      fill('与……不同（用 different）。','be different from','常用介词 from。'),
      fill('按顺序补两种“还有什么”。\nWhat ____? = What ____?',['else','other things'],'else 放在疑问词之后，other 修饰名词。'),
      choose('哪一句正确？',['Everyone are there.','The news is exciting.','She teach us English.','I don’t like it as well.'],1,'everyone 和 news 作主语通常用单数谓语。否定句末的“也”可用 either。'),
      choose('下面哪组词性和词义都正确？',['bright 副词，明亮地；soon 名词，消息','gate 动词，信任；trust 名词，大门','grey 形容词，灰色的；gate 名词，大门；quite 副词，相当','bright 名词，大门；soon 形容词，特殊的'],2,'bright 常用作形容词，soon 和 quite 是副词，trust 可作动词“信任”。')
    ]]
  ]);

  const schoolLife = module('classroom-u3-u4-school-life','Unit 3–4 · My School Life 作文素材','七上 Unit 3–4',
    '按约 80 词的征文要求，练最喜欢的场所、师友、活动和感受四个要点。',[
    ['限时写作','以 My School Life 为题写约 80 词。写出一个喜欢的场所及理由，介绍老师和朋友，描述喜欢的活动，写明自己的感受。例文可用来核对结构。'],
    ['基础范文','My school is big and nice. My favourite place is the school hall. We have meetings there. Our teachers are kind and often help us with our problems. My classmates are friendly and helpful. I like playing volleyball best. We also go on a field trip each term. I love picking apples because I can get close to nature. I enjoy my school life and I am happy to be a student here.'],
    ['进阶范文','My school is not only large but also modern. I enjoy reading in our library because it is a perfect place to spend some quiet time. Our teachers care about us, and my classmates are always ready to help. My favourite field trip is planting trees in spring. We work in groups and try our best to make the school greener. These trips teach me the value of teamwork. I am glad to be a student here.'],
    ['写后核对','四个要点各有具体内容，理由与活动相配。复查第三人称单数、可数名词和 like / enjoy 后面的动词形式。']
  ],[
    ['writing','四个作文要点 · 句型补练',[
      fill('我的学校不仅大，而且很现代化。\nMy school is ____.','not only large but also modern','not only… but also… 连接同类成分。'),
      fill('它是我们安静阅读的理想场所。\nIt’s a perfect place ____.','for us to read quietly','a place for sb. to do sth. 可写场所用途。'),
      fill('我们可以从图书馆借各种书。\nWe can ____ the library.','borrow different kinds of books from','borrow sth. from… 表示从某处借。'),
      fill('老师经常关心我们，同学们总是乐于助人。\nOur teachers often ____ us, and our classmates are always ____.',['care about','ready to help'],'care about 表示关心。be ready to help 表示乐于帮助。'),
      fill('我最喜欢打排球，而且是校排球队的一员。\nI like ____ best and I am ____ the school volleyball team.',['playing volleyball',['in','on']],'like doing 表示喜爱的活动。in / on the team 都可表示是队员。'),
      fill('我们每学期进行一次实地考察。\nWe have ____ each term.','a field trip','每学期一次，可用 a field trip each term。'),
      fill('我很喜欢采苹果，因为我能亲近自然。\nI enjoy ____ because I can ____.',['picking apples','get close to nature'],'enjoy 后用动名词。get close to nature 写出喜欢活动的原因。'),
      fill('大家都尽力使事情更好，这些旅行教会我团队合作的重要性。\nEverybody ____ to make things better, and these trips teach me the value of ____.',['tries their best','teamwork'],'Everybody 后用 tries。teamwork 表示团队合作。'),
      fill('我很高兴能成为这里的一名学生。\nI’m ____ a student here.',[['glad to be','happy to be']],'可用 be glad/happy to do 写学校生活感受。'),
      choose('哪组内容最能覆盖征文要求的四个要点？',['学校很大、楼很高、图书种类多、校园很新','喜欢的场所和理由、师友相处、喜欢的活动、自己的感受','朋友的年龄、住处、电话号码、家庭成员','学校的面积、校名变化、地理位置、建校年份'],1,'四部分分别回答最喜欢的地点、老师朋友、喜欢的活动以及自己的感受。')
    ]]
  ]);
  const parentsMeeting = [
    'Chinese schools often have parents’ meetings. They help [15] know about their children’s schoolwork.',
    'In our school, the parents’ meeting is on the first [16] afternoon of a new school year. The next day is the weekend, so teachers and parents have enough [17] to have a good talk. The meeting starts at 6:00 p.m. and most parents can come to school after [18].',
    'At parents’ meetings, teachers talk [19] parents. These meetings are very short, maybe five or ten [20]. These face-to-face talks are very [21] for teachers, parents and students.',
    'In our school, students can listen to the conversation. They can sit near their parents. [22] do you feel when you hear your teachers and parents talk about you? I really feel [23], because I am good at all my [24].',
    'What about parents’ meetings at your school?'
  ].join('\n\n');
  const marySchoolDay = [
    'On weekdays, Mary gets up at 5:30 a.m. She dresses, washes her face and does morning [25] (exercise). She has breakfast at 6:30 a.m. [26] sunny mornings, she always rides a bike to school.',
    'She gets to school at about 7:15 a.m. every day. She doesn’t like [27] (be) late. Classes begin at 8:00 a.m. In class, she listens to her teachers carefully and studies hard at all her lessons. She usually has bread and [28] glass of milk in the middle of the day. Classes are over at 4:30 p.m. After class, she often chats with her classmates and practises [29] (dance). She also takes part [30] different kinds of activities.',
    'Her classmates often take turns [31] (clean) the classroom. Sometimes, she throws a Frisbee with other classmates. She gets home at 5:30 p.m. Later, her parents come back from work. Mary usually helps [32] (they) with different chores.',
    'In the evening, she does her homework. Sometimes, she watches TV or reads storybooks. She seldom spends time [33] (play) computer games. She goes to bed at ten. Her school life is [34] (interest).'
  ].join('\n\n');
  const parentsAndSchoolDay = module('classroom-u4-parents-mary','Unit 4 · 4.5 Integration (2) 学案','七上 Unit 4',
    '两页学案第 1–34 题，含词汇、翻译、单选、家长会完形与校园生活语法填空。',[
    ['班级合作与值日','work in groups 小组合作，take turns to do sth. 轮流做某事，sweep the floor 扫地，take care of 照顾。'],
    ['家长会常用搭配','talk with sb. 与某人交谈，talk about sth. 谈论某事。be good for 表示“对……有益”，be good at 表示“擅长……”。'],
    ['动词形式','like doing / like to do 都可用。practise doing 和 spend time doing 后接动名词。take turns to do 和 take turns doing 都可表示轮流做某事。'],
    ['校园生活词组','do morning exercises 做早操，on sunny mornings 在晴朗的早晨，take part in an activity 参加活动，help sb. with sth. 在某方面帮助某人。']
  ],[
    ['vocabulary','第 1–5 题 · 词汇',[
      fill('Our school day always ____ (开始) at 8:00 a.m. and it finishes at 4:30 p.m.',[['starts','begins']],'主语 our school day 是单数，一般现在时用 starts 或 begins。'),
      fill('We students often work in ____ (小组) to finish tasks in class.','groups','work in groups 表示“小组合作”，groups 用复数。'),
      fill('In this video, you can learn how ____ (take) care of dogs.','to take','how to do sth. 表示“如何做某事”。take care of 表示“照顾”。'),
      fill('He always ____ (empty) the rubbish bin and keeps the classroom clean.','empties','主语 he 是第三人称单数，empty 变 y 为 i 再加 -es，得到 empties。'),
      fill('There are two ____ (bin) in the classroom, and we put the waste in them.','bins','two 后接可数名词复数，bin 的复数是 bins。')
    ]],
    ['translation','第 6–8 题 · 翻译',[
      fill('在我的班级，我们都小组合作并且轮流做不同的日常事务。\nIn my class, we all ____ ____ ____ and ____ ____ to do different chores.',['work','in','groups','take','turns'],'we 后用动词原形 work 和 take。work in groups 和 take turns to do sth. 中的 groups 和 turns 都用复数。'),
      fill('在他的空闲时间里，丹尼尔喜欢扫地。\nIn his free time, Daniel likes to ____ ____ ____.',['sweep','the','floor'],'sweep the floor 表示“扫地”。'),
      fill('我们在学校学习如何照顾植物。\nWe learn how to ____ ____ ____ plants at school.',['take','care','of'],'按三个空填 take care of。look after 也表示“照顾”，可以用于两个空的改写。')
    ]],
    ['choices','第 9–14 题 · 单选',[
      choose('Mike has to ____ his little sister when their parents are working.',['take part in','take place','take apart','take care of'],3,'take care of 表示“照顾”。take part in 表示“参加”，take place 表示“发生”，take apart 表示“拆开”。'),
      choose('Many students practise ____ in the morning because of the PE exam.',['to run','running','run','runs'],1,'practise 后接动名词。run 双写 n 再加 -ing，得到 running。'),
      choose('The teacher asked the students to sit in ____ to talk about what they learn.',['groups','turns','duties','trips'],0,'sit in groups 表示“分组坐”。in turns 表示“轮流”，题中学生分组讨论。'),
      choose('The World Cup is usually ____ summer. It lasts about a month.',['from','for','in','on'],2,'季节前通常用介词 in，如 in summer。'),
      choose('Peter doesn’t like football. He ____ plays it.',['sometimes','often','usually','seldom'],3,'seldom 表示“很少”，符合 Peter 不喜欢足球的语境。'),
      choose('—How do you practise your English?\n—I practise it by ____ English news every day.',['read','to read','reading','reads'],2,'by doing sth. 表示“通过做某事”。by 是介词，后接动名词 reading。')
    ]],
    ['cloze','第 15–24 题 · 家长会完形',[
      choose('They help ____ know about their children’s schoolwork.',['students','teachers','parents','friends'],2,'their children’s schoolwork 指“自己孩子的学业情况”，因此选 parents。'),
      choose('The parents’ meeting is on the first ____ afternoon of a new school year.',['Monday','Tuesday','Thursday','Friday'],3,'下文说第二天是周末，因此家长会在周五举行。'),
      choose('Teachers and parents have enough ____ to have a good talk.',['time','money','space','area'],0,'have enough time to do sth. 表示“有足够的时间做某事”。'),
      choose('The meeting starts at 6:00 p.m. and most parents can come to school after ____.',['breakfast','sleep','work','trip'],2,'家长会在傍晚六点开始，多数家长可以下班后到学校。after work 表示“下班后”。'),
      choose('Teachers talk ____ parents.',['with','about','for','like'],0,'talk with sb. 表示“与某人交谈”。下文的 face-to-face talks 说明老师和家长面对面交谈。'),
      choose('These meetings are very short, maybe five or ten ____.',['hours','minutes','days','seconds'],1,'根据 very short 和交谈的语境，选 minutes，表示五到十分钟。'),
      choose('These face-to-face talks are very ____ for teachers, parents and students.',['sorry','polite','good','bright'],2,'be good for 表示“对……有益”，符合家长会的语境。'),
      choose('____ do you feel when you hear your teachers and parents talk about you?',['Where','Which','Who','How'],3,'How do you feel? 用 how 询问感受。'),
      choose('I really feel ____. 请根据短文选出符合上下文的词。',['happy','worried','lazy','ready'],0,'后半句说自己各门课都学得好，因此这里选 happy。'),
      choose('I am good at all my ____.',['sports','lessons','stories','dreams'],1,'家长会的语境涉及在校学习，all my lessons 指“我的所有课程”。')
    ],parentsMeeting],
    ['grammar','第 25–34 题 · 校园生活语法',[
      fill('She does morning ____ (exercise).','exercises','do morning exercises 是“做早操”。这里 exercise 用复数形式，拼作 exercises。'),
      fill('____ sunny mornings, she always rides a bike to school.','On','描述某一类具体的早晨用 on，如 on sunny mornings。句首写 On。'),
      fill('She doesn’t like ____ (be) late.',[['being','to be']],'like 后可接动名词或不定式，being late 和 to be late 都成立。'),
      fill('She usually has bread and ____ glass of milk.','a','a glass of milk 表示“一杯牛奶”。'),
      fill('After class, she practises ____ (dance).','dancing','practise 后接动名词。dance 去掉词尾 e 后加 -ing。'),
      fill('She also takes part ____ different kinds of activities.','in','take part in 表示“参加”某项活动。'),
      fill('Her classmates often take turns ____ (clean) the classroom.',[['to clean','cleaning']],'take turns to do sth. 和 take turns doing sth. 都可表示“轮流做某事”。'),
      fill('Mary usually helps ____ (they) with different chores.','them','helps 后接宾语。they 的宾格是 them。'),
      fill('She seldom spends time ____ (play) computer games.','playing','spend time doing sth. 表示“花时间做某事”。'),
      fill('Her school life is ____ (interest).','interesting','用 interesting 描述学校生活有趣。interested 常用于描述人的感受。')
    ],marySchoolDay]
  ]);
  const schoolTour = [
    'Word bank: as well, building, soon, show you around, large, quite, use',
    'My school is big and beautiful. Let me [29].',
    'If you walk along the road, you can find a [30] with a lot of classrooms and offices. There are many new computers in each classroom. Students can [31] them to find answers to their questions. We also have lessons and learn knowledge (知识) in it. In front of it, there’s a [32] and clean playground. Students like doing sports there after class. An exciting sports meeting will take place in it [33]. Our school has a modern library [34]. There are all different kinds of books in it. Many of the books are [35] interesting.',
    'My school is also my home. I have a great time with my teachers and classmates.'
  ].join('\n\n');
  const teachingDream = [
    'Do you have a dream? What are you going to be when you grow up? Almost everyone [36] (have) their own dreams in their life. Dreams are very important to them. Dreams can make them [37] (work) hard.',
    'Wu Jun is studying in a school now. He enjoys [38] (read) books and learning new things. He likes to share his knowledge with others, [39] his dream is to become a teacher in West China. He wants to be a good teacher [40] Zhang Guimei, a great teacher from Yunnan Province.',
    'Some places in West China [41] (real) need teachers. Being a teacher is great because he can help children learn [42] (many) about the world. He will be nice to his students and make friends [43] kids. He will spend time [44] (chat) with them. He will give them love and teach [45] (they) how to be a useful person. He thinks it is the greatest job in the world.'
  ].join('\n\n');
  const greenSchool = [
    'Our school is a green school. What makes it green? [48]',
    'First, we have a lot of trees. They are in front of and behind every building. Some trees are green only in spring and summer. [49] The trees make our school look like a green park.',
    'And our school is a green one because we “go green”. How do we go green? [50] On green days, no students or teachers go to school by car. And we have Clean-up Day every month. That day, students go to pick up rubbish. Also, we have Tree-planting Day every spring. We plant young trees on hills. [51] They do many things like watering.',
    'Green is not only a colour. [52] Please go green with us and make the world a more beautiful place.'
  ].join('\n\n');
  const greenSchoolOptions = [
    'The students there look after those trees well.',
    'Birds sing happily in the trees.',
    'We have two green days every month.',
    'It is also about life.',
    'Let’s have a look together.',
    'And some are green all year.'
  ];
  const schoolAndDreams = module('classroom-u3-school-dreams','校园与梦想 · 英语学案 21–52','七上英语',
    '练单选、选词填空、短文填空、句子翻译和信息还原。第 48–52 题使用第 3 页的短文和第 4 页的六个选项。',[
    ['单选易混点','see sb. doing sth. 强调看见动作正在进行，see sb. do sth. 可表示看到一个完整动作或看到某人做某事。borrow 表示借入，lend 表示借出。a few 修饰可数名词复数，a little 修饰不可数名词。'],
    ['校园词组','show sb. around 带某人参观，care about 关心，take place 举行或发生。as well 表示“也”，常放句末。'],
    ['常考动词形式','everyone 作主语时，谓语用第三人称单数。let 或 make sb. do 后用动词原形，enjoy doing 和 spend time doing 后用动名词。'],
    ['信息还原','根据上下句判断空格是总领、补充、解释还是总结，留意 some、they、it 和 those trees 等指代。']
  ],[
    ['choice','第 21–28 题 · 单项选择',[
      choose('I often see Linda ____ ball games on the playground.（强调每次看到时，她正在打球。）',
        ['playing','play','plays','to play'],0,'强调看见当时正在进行的动作，用 see sb. doing sth.，因此选 playing。原卷没有限定这个角度，play 用在 see sb. do sth. 中也符合语法，可描述看到她打球这件事。'),
      choose('Which word has a different pronunciation for the letters in brackets?',
        ['d[oo]r','l[oo]k','c[oo]k','b[oo]k'],0,'按本卷采用的英式读音，door 的 oo 对应 /ɔː/，look、cook 和 book 的 oo 都是 /ʊ/。'),
      choose('The man over there is our teacher. He teaches ____ English.',
        ['I','us','we','our'],1,'teach sb. sth. 表示“教某人某学科或内容”。sb. 在这里用宾格 us。'),
      choose('Every year, ____ visitors come to Guilin to enjoy its beautiful mountains and rivers.',
        ['five thousands of','thousands of','thousand of','five thousands'],1,'thousands of 表示“成千上万的”。说确切数量时用 five thousand visitors，thousand 后不加 -s 或 of。'),
      choose('—What ____ do you want to eat?\n—Some beef and some orange juice.',
        ['other','another','others','else'],3,'else 放在疑问词 what 等词后。What else? 可以改写为 What other things?，other 后要有它修饰的名词。'),
      choose('He often spends half an hour ____ books before sleeping.',
        ['to read','reading','read','reads'],1,'spend time doing sth. 表示“花时间做某事”，所以用 reading。'),
      choose('—Could I ____ your bike?\n—Sorry, I ____ it to Alice this morning.',
        ['borrow; kept','lend; borrowed','borrow; lent','lend; lent'],2,'从别人那里借来用 borrow，借给 Alice 用 lend sth. to Alice。this morning 在此指已经发生的事，lend 的过去式是 lent。'),
      choose('Simon eats only ____ food for lunch. I think he may be hungry now.',
        ['a few','few','a little','little'],2,'food 在句中是不可数名词。only a little food 表示“只有一点食物”。a few 和 few 后接可数名词复数。')
    ],undefined,21],
    ['word-bank','第 29–35 题 · 校园介绍选词填空',[
      fill('Let me ____.','show you around','let sb. do sth. 中用动词原形。show sb. around 表示“带某人参观”。'),
      fill('You can find a ____ with a lot of classrooms and offices.','building','a 后接单数可数名词。下文的教室和办公室都在这栋楼里。'),
      fill('Students can ____ them to find answers to their questions.','use','can 后接动词原形。them 指前文的 computers。'),
      fill('There’s a ____ and clean playground.','large','large 和 clean 都是形容词，一起修饰 playground。'),
      fill('An exciting sports meeting will take place in it ____.','soon','soon 意为“不久”，与将来时 will take place 呼应。'),
      fill('Our school has a modern library ____.','as well','as well 表示“也”，通常位于句末。'),
      fill('Many of the books are ____ interesting.','quite','quite 是副词，修饰形容词 interesting。')
    ],schoolTour,29],
    ['grammar','第 36–45 题 · 梦想短文填空',[
      fill('Almost everyone ____ (have) their own dreams in their life.','has','主语 everyone 按第三人称单数处理。have 的第三人称单数是 has。'),
      fill('Dreams can make them ____ (work) hard.','work','make sb. do sth. 表示“使某人做某事”，make 的宾补用动词原形。'),
      fill('He enjoys ____ (read) books and learning new things.','reading','enjoy 后接动名词，reading 与 learning 并列。'),
      fill('He likes to share his knowledge with others, ____ his dream is to become a teacher in West China.（填表示因果关系的连词）','so','前文是原因，后文是结果，用 so 表示“所以”。'),
      fill('He wants to be a good teacher ____ Zhang Guimei.','like','此处用介词 like 表示“像……一样”，后面直接接人名。'),
      fill('Some places in West China ____ (real) need teachers.','really','用副词 really 修饰动词 need。'),
      fill('He can help children learn ____ (many) about the world.','more','many 的比较级是 more。learn more about 表示“更多地了解”。'),
      fill('He will be nice to his students and make friends ____ kids.','with','make friends with sb. 表示“和某人交朋友”。'),
      fill('He will spend time ____ (chat) with them.','chatting','spend time doing sth. 表示“花时间做某事”。chat 要双写 t 再加 -ing。'),
      fill('He will give them love and teach ____ (they) how to be a useful person.','them','teach 后需要宾格，they 的宾格是 them。')
    ],teachingDream,36],
    ['translation','第 46–47 题 · 翻译句子',[
      fill('事实上，我们的班主任非常关心我们。\n____, our form teacher ____ us a lot.',['In fact','cares about'],'In fact 表示“事实上”。form teacher 是第三人称单数，care about 用 cares about。'),
      fill('体育节期间经常举行激动人心的比赛。\n____ often ____ during the sports festival.',['Exciting matches','take place'],'take place 表示“举行”，主语 matches 是复数，用 take。')
    ],undefined,46],
    ['restoration','第 48–52 题 · 绿色校园信息还原',[
      choose('哪句话最适合第 48 空？',greenSchoolOptions,4,'前句提问 What makes it green?，后面分段介绍。Let’s have a look together. 承接问题并引出下文。'),
      choose('哪句话最适合第 49 空？',greenSchoolOptions,5,'前一句说有些树只在春夏是绿色，接着补充另一些树全年常绿。'),
      choose('哪句话最适合第 50 空？',greenSchoolOptions,2,'下一句以 On green days 开头。此处先介绍每月有两个绿色出行日。'),
      choose('哪句话最适合第 51 空？',greenSchoolOptions,0,'those trees 指前文新种的小树。下一句 They do many things like watering. 说明学生怎样照顾树。'),
      choose('哪句话最适合第 52 空？',greenSchoolOptions,3,'前句的 not only a colour 和下句 It is also about life 相呼应，最后一句号召大家践行绿色生活。')
    ],greenSchool,48]
  ]);
  const unitFourReview = module('classroom-u4-midterm-review-paper','Unit 4 · 期中复习练习卷','七上 Unit 4',
    '第 1 页，共 22 题。练习词形填空、同义句转换、完成句子和单项选择。',[
    ['词形','for the first time 表示“第一次”。a writer 用名词，make things better 用比较级，living things 表示“生物”。'],
    ['时间与频率','in the morning 表示“在早晨”，具体某一天的早晨用 on。How often 用于问频率。'],
    ['句型转换','take care of 和 look after 表示“照顾”。hear from sb. 表示收到某人的来信或消息。be in / on the team 表示是队员。']
  ],[
    ['word-forms','第 1–10 题 · 词形填空',[
      fill('The boy visits Beijing for the ____ (one) time. He’s very excited.','first','for the first time 表示“第一次”。one 的序数词是 first。'),
      fill('She likes reading books. So she wants to be a ____ (write).','writer','a 后填表示职业的单数名词 writer。'),
      fill('I really enjoy ____ (I) chatting with my friends.','myself','enjoy oneself 表示“玩得开心”。主语 I 对应反身代词 myself。'),
      fill('If you work in groups, you can make things ____ (good).','better','good 的比较级是 better。make things better 表示“使事情变得更好”。'),
      fill('All ____ (live) things need water to live.','living','living 是形容词，living things 指生物。'),
      fill('Our school has different kinds of after-school ____ (activity).','activities','different kinds of 后在这里接复数名词。activity 的复数是 activities。'),
      fill('Doing morning ____ (exercise) helps us keep fit.','exercises','do morning exercises 表示“做早操”，exercises 用复数。'),
      fill('Too much housework is ____ (tire). I need to have a rest.','tiring','tiring 表示“令人疲倦的”，用来描述家务。描述人的感受可用 tired。'),
      fill('We can learn a lot about ____ (大自然) in Biology lessons.','nature','nature 表示“大自然”，learn about 表示“了解”。'),
      fill('The new ____ (学期) starts in September.','term','根据 starts 可确定主语是单数，用 term。')
    ]],
    ['conversion','第 11–13 题 · 同义句转换',[
      fill('Sandy helps her mother look after her brother.\nSandy helps her mother ____ her brother.','take care of','take care of 和 look after 都表示“照顾”。'),
      fill('We are members of the basketball team.\nWe ____ the basketball team.',[['are in','are on']],'主语是 we，be 用 are。are in the team 和 are on the team 都可表示“是队员”。'),
      fill('I hope to get a letter from you soon.\nI hope to ____ you soon.','hear from','hear from sb. 表示收到某人的来信或消息。hope to 后用动词原形。')
    ]],
    ['completion','第 14–16 题 · 完成句子',[
      fill('你每天几点起床？——在 6:30。\n—When do you ____ every day? —At 6:30.','get up','get up 表示“起床”。do 后用动词原形。'),
      fill('Sandy 明天将动身前往一个农场去摘水果。\nSandy will ____ a farm tomorrow to pick fruit.','leave for','leave for 后接目的地。will 后用动词原形。'),
      fill('Tom 喜欢睡觉前阅读一点书。\nTom likes reading ____ before going to bed.','a little','read a little 表示“读一点书”。')
    ]],
    ['choice','第 17–22 题 · 单项选择',[
      choose('In which word are the letters in brackets pronounced /uː/?',['w[ou]ld','f[oo]t','c[oo]k','gr[ou]p'],3,'group 的 ou 发 /uː/，would、foot 和 cook 方括号中的字母发 /ʊ/。'),
      choose('After school, I often play ____ tennis with my friends.',['a','/','an','the'],1,'play tennis 表示“打网球”。球类运动名称前通常不用冠词。选项 / 表示不填。'),
      choose('—Do you go to the library to read books?\n—No. I ____ go there. I don’t have free time on weekends.',['always','often','seldom','sometimes'],2,'seldom 表示“很少”。根据回答 No 和周末没空的解释，应选 seldom。'),
      choose('Daniel would like to ____ the field trip to a park this weekend.',['take turns','take part in','take apart','take care of'],1,'take part in 表示“参加某项活动”。此处指参加实地考察。'),
      choose('—____ do you go swimming?\n—Never. I don’t like swimming.',['How old','How long','How often','How far'],2,'Never 表示频率。How often 用来问“多久一次”。'),
      choose('We read English ____ the morning every day.',['on','in','at','of'],1,'泛指早晨用 in the morning，点明某天的早晨可用 on，如 on Monday morning。')
    ]]
  ]);
  const tomIntroduction = [
    'I have a classmate called Tom. Let me [6] (introduce) him to you. We all like Tom very much. He is [7] (friend) to everyone around him. And he is always ready [8] (help) people when they have problems.',
    'Both Tom and I [9] (be) members of the School Football Club because we are [10] (interest) in different kinds of outdoor activities. Everyone in our club [11] (call) Tom “Lightning” because of his amazing speed. He is good at [12] (play) football and always practises hard after school. After doing his homework, he often watches exciting football [13] (match). His dream is [14] (become) a football player.',
    'Tom has lots of lessons every day, [15] he still spends much time training (训练). I really hope his dream can come true.'
  ].join('\n\n');
  const wildWood = [
    'Summer passes, then autumn comes. After that winter arrives. Rat and Mole are at home all day. Mole is bored. He says, “I want to visit Badger.” But Rat tells him, “Badger lives in the middle of the Wild Wood. It’s a long way to go in winter.”',
    'But Mole still wants to go. When Rat is asleep (睡着的), he puts on his coat and goes into the Wild Wood. It is cold and the sky is grey. At first it is fun. But then it gets dark. Mole sees strange little faces in the wood. The faces have sharp teeth. Then he remembers the animals in the Wild Wood, the stoats and weasels: they are dangerous (危险的). He hears strange noises and he panics. Poor Mole runs and runs through the wood. Then he sees a hole inside a tree and he hides (躲藏) there.',
    'When Rat wakes up at home, he calls, “Mole, Mole!” But Mole doesn’t answer. Rat looks around the house for Mole. But Mole isn’t there. And Mole’s coat isn’t there. Rat thinks, “Mole is visiting Badger. Oh, no! Mole is in the Wild Wood!” He puts on his coat and puts a gun in his pocket. He goes along the path to the Wild Wood. He sees the strange little faces with sharp teeth. But they see Rat’s gun, and go away. Rat calls and calls, “Mole, where are you? It’s me—Rat.”',
    'At last Mole answers. “Rat, I’m here! In the tree! I am very frightened (害怕的)!” he says in a little voice. “Don’t worry, Mole,” says Rat. “Let’s go home now!”',
    'But Mole is very tired. He wants to sleep, so Rat sits and waits. While Mole is sleeping, it begins to snow. The snow is white and it covers all the paths.',
    'Later, Mole wakes up. Then the two friends set off through the white woods. Everything is different with the snow and soon Rat and Mole are lost. They walk for hours but they cannot find the way home. They are tired, and cold, and hungry.',
    '—The Wind in the Willows, Chapter 6（学案节选）'
  ].join('\n\n');
  const unitOneReview = module('classroom-u1-midterm-review-paper','Unit 1 · 期中复习练习卷','七上 Unit 1',
    '两页共 32 题，含词汇、短文语法、句型转换、翻译、单选和《柳林风声》阅读。',[
    ['主谓一致','both A and B 作主语用复数谓语。everyone 作主语用第三人称单数。主语后加 with 短语时，谓语与主语一致。'],
    ['动词搭配','let sb. do，be ready to do，be interested in doing，be good at doing。'],
    ['阅读定位','按故事经过核对事件顺序，用人物的言行和故事中的因果关系判断选项。']
  ],[
    ['words','第 1–5 题 · 词汇',[
      fill('You ____ (只有，仅) have a few minutes left. You need to hurry up.','only','only 在这里表示“只有，仅仅”。'),
      fill('It is helpful of Daniel to help his friends with their Maths ____ (难题).','problems','help sb. with their Maths problems 表示“帮某人解决数学难题”。'),
      fill('One of my favourite ____ (hobby) is playing volleyball with my classmates.','hobbies','one of 后接可数名词复数，hobby 的复数是 hobbies。'),
      fill('Sandy is very kind and often ____ (greet) me with a smile when we meet.','greets','主语 Sandy 是第三人称单数，动词用 greets。'),
      fill('My mum with my grandparents ____ (stay) healthy by jogging together every day.','stays','主语是 My mum，with my grandparents 是附加成分，谓语用第三人称单数 stays。')
    ]],
    ['grammar','第 6–15 题 · 同学介绍语法填空',[
      fill('Let me ____ (introduce) him to you.','introduce','let sb. do sth. 中用动词原形。'),
      fill('He is ____ (friend) to everyone around him.','friendly','be friendly to sb. 表示“对某人友好”。'),
      fill('He is always ready ____ (help) people.','to help','be ready to do sth. 表示“乐意做某事”或“准备好做某事”。'),
      fill('Both Tom and I ____ (be) members of the School Football Club.','are','both A and B 作主语时指两个人，be 动词用 are。'),
      fill('We are ____ (interest) in different kinds of outdoor activities.','interested','be interested in 表示“对……感兴趣”。'),
      fill('Everyone in our club ____ (call) Tom “Lightning”.','calls','everyone 作主语时，谓语动词用第三人称单数 calls。'),
      fill('He is good at ____ (play) football.','playing','at 是介词，后接动名词 playing。'),
      fill('He often watches exciting football ____ (match).','matches','match 的复数形式是 matches。'),
      fill('His dream is ____ (become) a football player.','to become','这里用不定式 to become 说明梦想的内容。'),
      fill('Tom has lots of lessons every day, ____ he still spends much time training.',[['but','yet']],'前后表示转折，“课很多，但仍用很多时间训练”，可用 but 或 yet。')
    ],tomIntroduction],
    ['conversion','第 16–19 题 · 句型转换',[
      fill('改为一般疑问句。\nThere are some maps and pictures on the wall.\n____ there ____ maps ____ pictures on the wall?',['Are','any',['or','and']],'There are 改一般疑问句时把 Are 提前，some 常改成 any。用 or 问是否有其中一类，用 and 可问是否两类都有。'),
      fill('改为一般疑问句并作肯定回答。\nOur English teacher is Mr. Lin.\n—____ English teacher Mr. Lin? —Yes, ____.',['Is your','he is'],'把 is 提到句首。提问时将 our 改为 your。Mr. Lin 用 he 指代，肯定简答用 Yes, he is。'),
      fill('对 Class 34 提问。\nHe is in Class 34.\n____ is he ____?',[['Which class','What class'],'in'],'问在哪个班可用 Which class is he in?'),
      fill('改为同义句。\nMillie, this is my friend Chen Dan, and you can call him Daniel.\nMillie, this is my friend Chen Dan, and he ____ Daniel.','goes by','go by 加名字表示“以某名字为人所知、别人称他为……”。主语是 he，用 goes。')
    ]],
    ['translation','第 20–22 题 · 句子翻译',[
      fill('我们都喜欢和 Tom 交朋友，因为他每天满是活力。\nWe all like to ____ Tom because he is ____ every day.',['make friends with','full of energy'],'make friends with sb. 表示“与某人交朋友”。be full of energy 表示“充满活力”。'),
      fill('我的英语老师喜欢在周末和学生下中国象棋。\nMy English teacher enjoys ____ with students ____.',['playing Chinese chess',['at the weekend','at weekends','on the weekend','on weekends','on the weekends']],'enjoy 后用动名词。at the weekend 和 on weekends 等都表示“在周末”。'),
      fill('Millie 和 Simon 在相同的年级，并且他们经常互相帮助。\nMillie and Simon are ____ and they often ____.',['in the same grade','help each other'],'in the same grade 表示“在同一个年级”，help each other 表示“互相帮助”。')
    ]],
    ['choice','第 23–27 题 · 单项选择',[
      choose('Which word has a different sound for the letter in brackets?',['th[o]se','n[o]','st[o]p','h[o]me'],2,'按英式读音，stop 中 o 发 /ɒ/，其他三项的 o 发 /əʊ/。'),
      choose('—Are you new students in our school?\n—____.',['Yes, I am.','No, I’m not.','Yes, we are.','No, we are.'],2,'students 是复数，回答用 we。肯定回答用 Yes, we are，否定回答要用 aren’t。'),
      choose('Simon can answer all the English questions quickly. He is very ____.',['shy','polite','smart','pretty'],2,'能快速回答所有问题说明 Simon 很聪明，smart 符合语境。'),
      choose('—What about her ____?\n—She is slim and wears a pair of glasses.',['character','hobby','age','looks'],3,'slim 和戴眼镜描述的是外貌，因此选 looks。'),
      choose('—We have a basketball match with Class 11 tomorrow.\n—____',['Glad to see you.','Have a good time.','Good luck!','You’re welcome.'],2,'对方即将参加比赛，可以用 Good luck! 祝对方好运。')
    ]],
    ['reading','第 28–32 题 · 《柳林风声》阅读',[
      choose('What does the word “panics” mean in Paragraph 2?',['恐慌','期待','放松','怀疑'],0,'Mole 听到奇怪的声音后不停地跑，最后躲进树洞。panics 表示“惊慌、恐慌”。'),
      choose('Which of the following is true?',['Rat takes a gun to protect himself.','Rat wants to visit Badger in winter.','Rat can’t find his way before Mole finds him.','Mole goes to the Wild Wood together with Rat.'],0,'Rat 想到 Mole 可能在树林里，就带枪出发。在树林中，那些陌生动物看到 Rat 的枪后离开了。'),
      choose('Which of the following shows the right order of the story?\n① Rat takes his gun to look for Mole.\n② Mole feels afraid and hides in a hole.\n③ Rat finds Mole and helps him get out.\n④ Mole goes into the Wild Wood when Rat is sleeping.',['④①②③','④②①③','③①④②','③②④①'],1,'先是 Mole 独自进树林（④），接着因害怕躲进树洞（②），然后 Rat 带枪寻找 Mole（①），最后找到他（③）。'),
      choose('Why does the writer write about the snow falling according to the last paragraph?',['To show winter is beautiful with white snow.','To show it’s harder for Rat and Mole to go home.','To show how cold the winter in the Wild Wood is.','To show there will be a good harvest next year.'],1,'雪盖住了所有小路，两人认不出方向，走了几个小时仍找不到回家的路，所以选 B。'),
      choose('What is Rat like according to the passage?',['Rat is smart and funny.','Rat is brave but not helpful.','Rat is brave, smart and caring.','Rat is afraid and shy.'],2,'Rat 根据外套不见了判断 Mole 的去向，勇敢进树林找他，找到后安慰并等他休息，体现机智、勇敢和关心朋友。')
    ],wildWood]
  ]);
  const millieSchoolDay = [
    'Hi, I’m Millie. I am a Grade 7 student at Sunshine Middle School. I love my new school life very much.',
    'On [23] (weekday), I go to school at 7:30. [24] (usual), I spend about 15 minutes walking to school. School [25] (start) at 8:00 a.m. Sometimes my group members and I have our [26] (duty). We need to clean some parts of our school area [27] Monday morning. Our form teacher always teaches us how [28] (do) cleaning well patiently. We have four lessons in the morning. My favourite subject is English. I think it is interesting and useful. I also like Chinese because I can read many [29] (amaze) works.',
    'In the afternoon, we have two or three lessons. After school, I go to the volleyball club. We practise [30] (play) volleyball every Friday afternoon. Next year, I want to join more clubs [31] I think club activities are a good way for me to have fun and make friends. At night, I have some [32] (homework) to do. After finishing it, I can go to bed.'
  ].join('\n\n');
  const gardeningPassage = [
    'For most students, they learn many subjects like English and maths in the classroom. Now, there is a new outdoor (户外的) subject in Sunshine Middle School. That is school gardening.',
    'In the gardening class, teachers teach students how to plant vegetables. Then students work together. They really love this subject. “We can have great fun in this class. We can get out and do things with our hands,” says Anna, one of the students.',
    'It’s also fun to get something to eat in class. Some students like to plant tomatoes and carrots. “The tomato is my favorite vegetable. It’s always fun to get a tomato, clean it and eat it right in the garden,” says Anna.',
    'Students can also learn something from the class. Keeping a school garden is not easy and all the students need to come and help. It teaches students to work together. Also, some vegetables are easy to grow but others need a long time. This teaches students that they need to wait before they get the things they want.',
    'Students really love having outdoor classes like this. And they want to have more in the future.'
  ].join('\n\n');
  const schoolGardening = module('classroom-u4-school-gardening','Unit 4 · 校园生活与园艺课学案','七上 Unit 4',
    '原卷第 22–37 题。第 37 题为开放问答，可先作答再对照例句。',[
    ['时间与搭配','on weekdays，on Monday morning。how to do，practise doing。homework 不可数。'],
    ['阅读简答','每题答案不超过 8 个词。问看法时回答看法，问原因时写清楚 because 后的理由。']
  ],[
    ['choice','第 22 题 · 情景单选',[
      choose('—Can you help me empty the bins, Jim?\n—____. I will do it soon.',['Of course','Enjoy yourself','All the best','Good luck'],0,'Of course 表示“当然可以”，用于回应请求。')
    ],undefined,22],
    ['grammar','第 23–32 题 · 短文语法填空',[
      fill('On ____ (weekday), I go to school at 7:30.','weekdays','on weekdays 表示“在工作日”。'),
      fill('____ (usual), I spend about 15 minutes walking to school.','Usually','副词 usually 表示“通常”，用在句首时首字母大写。'),
      fill('School ____ (start) at 8:00 a.m.','starts','School 作主语，动词用第三人称单数 starts。'),
      fill('Sometimes my group members and I have our ____ (duty).','duties','duty 的复数是 duties。'),
      fill('We need to clean some parts of our school area ____ Monday morning.','on','特定一天的早晨用 on，如 on Monday morning。'),
      fill('Our form teacher always teaches us how ____ (do) cleaning well.','to do','how to do sth. 表示“如何做某事”。'),
      fill('I also like Chinese because I can read many ____ (amaze) works.','amazing','amazing 是“令人惊奇的”，用来形容作品。'),
      fill('We practise ____ (play) volleyball every Friday afternoon.','playing','practise 后接动名词 playing。'),
      fill('I want to join more clubs ____ I think club activities are a good way to have fun and make friends.','because','后半句是想加入更多社团的原因，用 because。'),
      fill('At night, I have some ____ (homework) to do.','homework','homework 是不可数名词，some homework 表示“一些作业”。')
    ],millieSchoolDay,23],
    ['reading','第 33–36 题 · 园艺课阅读简答（每题不超过 8 词）',[
      fill('What is the outdoor subject?',[['School gardening','It is school gardening','It’s school gardening','That is school gardening','That’s school gardening']],'第一段直接给出户外科目是 school gardening。'),
      fill('What do teachers teach students in the gardening class?',[['How to plant vegetables','They teach students how to plant vegetables','They teach them how to plant vegetables','To plant vegetables']],'第二段说老师教学生如何种植蔬菜。'),
      fill('What does the writer think of keeping a school garden?',[['Not easy','It is not easy','It isn’t easy','It is difficult','Difficult','Keeping a school garden is not easy','It’s not easy']],'第四段直接评价 Keeping a school garden is not easy。'),
      fill('Are all vegetables easy to grow?',[['No','No, they aren’t','No, they are not','No, not all of them are','No, some need a long time']],'第四段说有些蔬菜容易种，有些需要很长时间，因此作否定回答。')
    ],gardeningPassage,33]
  ]);
  schoolGardening.shortAnswers = [{
    title:'第 37 题 · 开放问答',material:gardeningPassage,
    prompt:'Do you want to have the gardening class? Why?（不超过 8 个词。）',
    points:['示例：Yes, because I can have fun.','答 Yes 或 No 均可，写出与园艺课有关的理由，并控制在 8 个词以内。']
  }];
  return [
    introduction,grammar,integration,willows,prince,schoolWriting,dailyLife,schoolActivities,lifestyle,breakfast,paraphrase,unitFourMidterm,
    unitOneMorning,unitThreeWelcome,unitThreeMidterm,schoolLife,parentsAndSchoolDay,schoolAndDreams,unitFourReview,unitOneReview,schoolGardening
  ];
})();

const englishClassroomByTopic = new Map(englishClassroomModules.map(module=>[module.key,module]));
const classroomUnitOf = module => Number(/^classroom-u([1-5])-/.exec(module.key)?.[1]) || null;
const classroomModulesForUnit = unit => englishClassroomModules.filter(module=>
  classroomUnitOf(module)===unit || (unit===4 && module.key==='classroom-u3-u4-school-life'));
const classroomEnglish = subjects.find(subject=>subject.id==='english');
for (const module of englishClassroomModules) {
  classroomEnglish.topics.push({
    ...module,term:'上',questions:module.questions.map(question=>({...question,subject:'english',topic:module.key}))
  });
}
