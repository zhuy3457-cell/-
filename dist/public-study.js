const publicStudyCollections = (() => {
  const source = (title,url,note) => ({title,url,note});
  const note = (label,text) => ({label,text});

  function choice(prompt,options,index,explanation) {
    return {prompt,options,correct:options[index],explanation,level:'standard'};
  }

  function worked(prompt,fields,explanation,lines) {
    const steps = fields.map(([label,answer,unit])=>({label,answer:String(answer),...(unit?{unit}:{})}));
    return {prompt,steps,correct:steps.map(step=>step.answer).join(' / '),explanation,level:'standard',
      solution:[{title:'列式与检验',lines}]};
  }

  function english(prompt,forms,explanation) {
    const steps = forms.map(([label,answer,...aliases])=>({label,answer,aliases,text:'english'}));
    return {prompt,steps,correct:steps.map(step=>step.answer).join(' / '),explanation,level:'standard'};
  }

  function topic(key,title,range,description,notes,sources,groups) {
    const questions = [];
    const sections = groups.map(([sectionTitle,items,material],index)=>{
      const section = {key:'section-'+(index+1),title:sectionTitle,ids:[]};
      for (const item of items) {
        const id = key+'-'+(questions.length+1);
        questions.push({...item,id,stage:sectionTitle,...(material?{material}:{})});
        section.ids.push(id);
      }
      return section;
    });
    return {key,title,range,description,notes,sources,sections,questions};
  }

  const readingClub = [
    'Wednesday Clubs · Grade 7',
    'Science Club · 4:10–4:50 p.m. · Lab 2. Make a paper bridge with a partner. Bring a pencil. The club has paper.',
    'Chess Club · 4:10–4:45 p.m. · Room 105. You can join even if you cannot play yet.',
    'Table Tennis Club · 4:55–5:25 p.m. · Sports Hall. The school has balls, but each player needs a bat.',
    'Please tell Ms Lin by Tuesday afternoon which clubs you want to join.'
  ].join('\n');

  const readingLibrary = [
    'Reading Corner · This Month',
    'On Monday, Wednesday and Friday, the reading corner opens from 12:20 to 12:55.',
    'You can take one book home for a week. The black box by the door is for books you bring back, not for new books.',
    'This Friday the reading corner is closed at lunchtime. You can bring books back to Room 106 after school. On Monday it opens at the usual time.'
  ].join('\n');

  const marketDialogue = [
    'Saturday School Market',
    'Lily: We open at half past nine. Is there a table near the door?',
    'Chen: Yes. We can put the books there. There are six books in this bag, but two are Mia’s. She wants to keep them.',
    'Lily: OK. Put four books on the table. Each book is five yuan. Let’s use the money to buy plants for our classroom.',
    'Chen: Good idea. I have ten yuan already. If we sell the four books, how much money will we have?'
  ].join('\n');

  const englishTopics = [
    topic('web-english-reading','校园英语阅读','A1 · 校园通知','读社团通知与图书角告示，练习定位时间、规则和例外。',[
      note('如何快速找信息？','先看题目问时间、地点还是规则，再找材料中对应的一行。遇到 this Friday、but、not 等词，检查是否有例外。'),
      note('题目让你比较两项活动时','把两个起止时间放在一起比较。还要查清是否需自带用具，以及是否允许初学者参加。')
    ],[
      source('British Council · The school library','https://learnenglishteens.britishcouncil.org/skills/reading/a1-reading/school-library','参考 A1 告示阅读的难度和信息组织。本站告示及问题为原创。'),
      source('British Council · At the university sports club','https://learnenglishteens.britishcouncil.org/skills/reading/a1-reading/university-sports-club','参考活动海报阅读所需的时间、地点和规则定位。')
    ],[
      ['社团活动表',[
        choice('What do students make in the Science Club?',['A chess board','A paper bridge','A table tennis bat','A school map'],1,'Science Club 一行直接说明活动是 make a paper bridge。'),
        choice('When does the Chess Club finish?',['At 4:10 p.m.','At 4:50 p.m.','At 4:45 p.m.','At 5:25 p.m.'],2,'Chess Club 的时间段是 4:10–4:45 p.m.，终点是 4:45。'),
        choice('What does a Table Tennis Club player need to bring?',['A ball','Some paper','A pencil','A bat'],3,'学校提供 balls，而 each player needs a bat 明确了自带物品。'),
        choice('Which pair below can one student attend in full on Wednesday?',['Science and Chess','Chess and Table Tennis','Science and Chess only if Ms Lin goes','All three clubs'],1,'Chess 4:45 结束，Table Tennis 4:55 开始。Science 和 Chess 都在 4:10 开始。'),
        choice('Can a student who cannot play chess join the Chess Club?',['Yes, beginners can join.','No, only teachers can join.','Yes, but only on Tuesday.','No, they need a bat.'],0,'even if you cannot play yet 表明还不会下棋也可以参加。'),
        choice('What must students do by Tuesday afternoon?',['Go to Lab 2.','Buy a table tennis bat at school.','Tell Ms Lin their club choices.','Finish a paper bridge.'],2,'最后一行中的 by Tuesday afternoon 表示告知社团选择的截止时间。')
      ],readingClub],
      ['图书角通知',[
        choice('Which weekday is the reading corner usually open?',['Tuesday','Thursday','Wednesday','Saturday'],2,'第一行列出的常规开放日是 Monday、Wednesday 和 Friday。'),
        choice('How long can you keep a book at home?',['One day','One week','One month','All term'],1,'take one book home for a week 中的 for a week 表示借阅时长。'),
        choice('What is the black box for?',['Books students return','New books for sale','Pencils for the club','Students’ bags'],0,'bring back 表示把借出的书带回来，黑箱是还书处。'),
        choice('Where can students return books after school this Friday?',['In the sports hall','In Lab 2','In the reading corner','In Room 106'],3,'最后一段给出周五例外以及替代归还地点 Room 106。'),
        choice('Which statement is true about next Monday?',['It is closed all day.','It opens at 12:20 as usual.','Students can borrow two books at once.','The black box moves to the gym.'],1,'on Monday it opens at the usual time，常规开门时间是 12:20。'),
        choice('What is the main purpose of the notice?',['To tell students how to use the reading corner','To teach students how to write books','To invite students to a sports match','To ask students to bring new books for sale'],0,'通知主要提供开放时间、借还规则和周五的临时安排。')
      ],readingLibrary]
    ]),
    topic('web-english-context','语法与词组情境练习','A1–A2 · 对话与表达','在校园义卖场景中用一般现在时、There be、数量和价格表达。',[
      note('How many 和 How much 怎么用？','how many 问可数名词的数量。how much 可以问不可数事物的量，也可以问价格。'),
      note('问句出现 does 后怎么办？','does 作助动词已体现第三人称单数，后面实义动词用原形，如 Does Mia want the books?'),
      note('There is / are 如何选？','不可数名词或单数名词用 is，复数用 are。要表示“有多少本”，可以问 How many books are there?')
    ],[
      source('British Council · Present simple','https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/present-simple','核对一般现在时、第三人称单数与 do/does 的用法。'),
      source('British Council · Using there is and there are','https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/using-there-there-are','参考存在句单复数和问句的练习范围。'),
      source('British Council · Nouns: countable and uncountable','https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/nouns-countable-uncountable','参考 books、money 等名词与疑问词搭配。')
    ],[
      ['义卖对话理解',[
        choice('What time does the market open?',['At 9:00','At 9:15','At 9:30','At 10:30'],2,'half past nine 是九点半，即 9:30。'),
        choice('Where are they going to put the books?',['On a table near the door','In Mia’s bag','Next to the plants','On the floor'],0,'Lily 问门边有没有桌子，Chen 指出书可以放在那里。'),
        choice('Why do they sell only four of the six books?',['Two are too expensive.','Two belong to Mia, and she wants them.','They have only four tables.','Chen has already sold two.'],1,'two are Mia’s 指两本书属于 Mia，她要留着这两本。'),
        choice('How much will they have if all four books sell?',['5 yuan','10 yuan','20 yuan','30 yuan'],3,'售书得 4×5=20 元，加上已有的 10 元，共 30 元。'),
        choice('What does “there” in “We can put the books there” refer to?',['The classroom plants','The bag','The table near the door','The school office'],2,'there 的指代回到前一句提到的地点，即门边的桌子。'),
        choice('Why do the students want to sell books?',['To buy food for a party','To buy plants for their classroom','To give money back to Mia','To buy more tables'],1,'Lily 说要用这些钱给教室买植物。')
      ],marketDialogue],
      ['在情境中用语法',[
        english('补全问句。___ Mia ___ to keep the two books?',[['第一个空','Does'],['第二个空','want']],'Mia 是第三人称单数。问句用 Does，后接 want 原形。'),
        english('补全句子。There ___ six books in the bag, but there ___ only one pencil.',[['书的数量','are'],['铅笔的数量','is']],'六本书为复数，用 are。一支铅笔为单数，用 is。'),
        english('你想问一本书的价格。写出一个完整疑问句。',[['英文问句','How much is one book?','How much is a book?','How much is this book?','How much does one book cost?','How much does a book cost?','How much does this book cost?']],'问价格可用 How much is ...? 或 How much does ... cost?'),
        english('把句子补完整，表示“把钱用在植物上”。We want to ___ the money ___ plants.',[['第一个空','spend'],['第二个空','on']],'spend money on sth 表示把钱花在某物上。'),
        choice('Which question asks for the number of books?',['How much is the book?','How many books are there?','How long is the book?','Whose book is this?'],1,'books 为可数名词复数。问本数用 How many books。'),
        english('写出“我们在九点半开门”的英文句子。',[['英文句子','We open at half past nine.','We open at nine thirty.','We open at 9:30.','We open at half past nine in the morning.','We open at 9:30 a.m.']],'具体钟点前用 at。九点半可顺读 nine thirty，也可说 half past nine。')
      ]]
    ])
  ];

  const mathTopics = [
    topic('web-math-calculation','有理数与代数式','苏科版七上 · 第 2–3 章','练习符号、乘方、整体代入和代数式化简。多步计算可以查看列式。',[
      note('负号和乘方','−3² 表示先算 3² 再取相反数，(−3)² 的底数才是 −3。'),
      note('去括号的顺序','有括号外的倍数，就乘到括号内每一项。括号前为负号时，去括号后每一项都变号。'),
      note('什么时候适合整体代入？','给出含字母的一个式子的值时，先观察所求的式子是否能改写成它的倍数加常数。')
    ],[
      source('K12 开源数学教辅 · 有理数','https://libremath.cn/textbook/suke-qishang-you-li-shu/','参考苏科版七上第 2 章的运算、数轴和绝对值范围。'),
      source('K12 开源数学教辅 · 代数式','https://libremath.cn/textbook/suke-qishang-dai-shu-shi/','参考第 3 章代数式求值、同类项与去括号。数值、题目和解析为本练习编写。')
    ],[
      ['有理数运算',[
        worked('计算 −7+12−(−4)。',[['结果',9]],'减去负数等于加上它的相反数。',['原式 = −7+12+4 = 9。']),
        worked('计算 (−3)²−3²+(−2)³。',[['结果',-8]],'平方的结果为正，负数的三次方为负。',['(−3)²=9，3²=9，(−2)³=−8，所以原式 = 9−9−8=−8。']),
        worked('数轴上 A 表示 −5，B 表示 2。A、B 两点相距多少个单位？',[['距离',7]],'两点距离是它们对应的数之差的绝对值。',['AB=|2−(−5)|=7。']),
        choice('若 |2x|=6，x 的所有可能取值是哪些？',['只有 −3','只有 3','−6 或 6','−3 或 3'],3,'|2x|=6 意味着 2x=6 或 2x=−6，两种情况都要保留。'),
        worked('计算 (−3/4+5/8)÷(−1/4)。',[['结果','1/2']],'先通分算括号，再乘除数的倒数。',['−3/4+5/8=−6/8+5/8=−1/8。','(−1/8)÷(−1/4)=(−1/8)×(−4)=1/2。']),
        worked('上午气温为 −3℃，中午比上午高 7℃，晚上又比中午低 9℃。求晚上气温。',[['气温',-5,'℃']],'升温记加法，降温记减法。',['中午 −3+7=4℃，晚上 4−9=−5℃。'])
      ]],
      ['代数式与整式',[
        worked('化简 3(2a−b)−(4a−5b)，填出两项的系数。',[['a 的系数',2],['b 的系数',2]],'减号作用于后一个括号内的每一项。',['原式 = 6a−3b−4a+5b = 2a+2b。']),
        worked('当 x=−2 时，求 2x²−3x+5 的值。',[['代数式的值',19]],'把负数代入时用括号围起来，再算乘方和乘法。',['2×(−2)²−3×(−2)+5=8+6+5=19。']),
        worked('已知 3A+1=13，求 2A−3。',[['2A−3',5]],'先由已知式求 A，再代入所求式。',['3A=12，A=4。','2×4−3=5。']),
        worked('若 |x−2|+(y+3)²=0，求 x−2y。',[['x−2y',8]],'绝对值和平方都非负，两项相加为 0 时，两项必须分别为 0。',['x−2=0，y+3=0，所以 x=2，y=−3。','x−2y=2−2×(−3)=8。']),
        worked('整式 3x²−2x+(m−3)x²+5x−1 化简后不含 x² 项。求 m 和一次项系数。',[['m',0],['一次项系数',3]],'同类项合并后，二次项的系数是 m。',['原式 = mx²+3x−1。','要没有二次项，m=0，剩余一次项系数是 3。']),
        choice('长方形的宽为 x 厘米，长比宽多 4 厘米。周长是什么？',['2x+4','4x+4','4x+8','2x+8'],2,'括号内是长加宽 x+4+x，周长还要乘 2，得 4x+8。')
      ]]
    ]),
    topic('web-math-models','一元一次方程生活建模','苏科版七上 · 第 4 章','从票价、行程、分段计费和工程情境找出等量关系。',[
      note('先设什么量？','先设题目要问的量，或最容易表示其他量的量。总人数固定时，可用“总数减第一类”表示第二类。'),
      note('解完方程后检查什么？','把结果代回原情境。人数、件数要是非负整数，收费要符合相应区间，行程时间单位要一致。'),
      note('相遇与追及怎样区分？','相向而行时看两人共缩短的距离，同向追及时看较快者比前面的人多走的距离。')
    ],[
      source('K12 开源数学教辅 · 一元一次方程','https://libremath.cn/textbook/suke-qishang-yi-yuan-yi-ci-fang-cheng/','核对苏科版第 4 章的列方程、过程检验及行程、工程和销售范围。'),
      source('苏州工业园区教师发展中心 · 基础教育精品课名单','https://tdc.sipedu.org/Upload/tdc/pdf/2024/04/10/%E9%99%842_2023%E5%B9%B4%E2%80%9C%E5%9F%BA%E7%A1%80%E6%95%99%E8%82%B2%E7%B2%BE%E5%93%81%E8%AF%BE%E2%80%9D%EF%BC%88%E5%AD%A6%E7%A7%91%E8%AF%BE%E7%A8%8B%E7%B1%BB%EF%BC%89%E8%8E%B7%E5%A5%96%281%29.pdf','公开名单列有苏科版七上 4.1《从问题到方程》。本站应用题采用另外编写的情境和数据。')
    ],[
      ['数量与费用',[
        worked('38 人参观，成人票 12 元，学生票 7 元，共 326 元。成人和学生各多少人？',[['成人',12,'人'],['学生',26,'人']],'两类人数相加为 38，两类票款之和为 326。',['设成人 x 人，则学生 38−x 人。','12x+7(38−x)=326，得 5x=60，即 x=12。','学生 38−12=26 人，票款 144+182=326 元。']),
        worked('18 个礼盒中，大盒装 5 张卡片，小盒装 3 张，共 70 张。大小盒各多少个？',[['大盒',8,'个'],['小盒',10,'个']],'可把大盒设为 x，小盒是 18−x，再用卡片总数列式。',['5x+3(18−x)=70，所以 2x=16，x=8。','小盒为 10 个，5×8+3×10=70。']),
        worked('场馆方案 A 需先付 30 元，之后每次 8 元。方案 B 每次 14 元。去几次时费用相同？两方案各多少元？',[['次数',5,'次'],['相同的费用',70,'元']],'两种方案都用同一个到访次数。',['设去 x 次，30+8x=14x，6x=30，得 x=5。','费用均为 70 元。']),
        worked('某月用水前 5 立方米每立方米 2 元，超过部分每立方米 3 元。水费 25 元，用了多少水？',[['用水量',10,'立方米']],'25 元大于第一档的 10 元，超过的部分按每立方米 3 元计算。',['设总量 x 立方米。5×2+3(x−5)=25，得 x=10。','10>5，符合分段收费条件。']),
        worked('学校制作 30 件手工品，每件成本 12 元，售价相同且全部卖完，总利润 120 元。每件售价多少元？',[['每件售价',16,'元']],'利润等于售价减成本，再乘件数。',['设售价 x 元，30(x−12)=120。','每件利润 4 元，售价 x=16 元。']),
        choice('买了 11 支笔，每支售价是 2 元或 3 元，据称共花 28.5 元。怎样判断？',['有可能，2 元的笔有 4 支。','有可能，3 元的笔有 5 支。','不可能，2 元的笔会算出 4.5 支。','不可能，因为最少要付 33 元。'],2,'设 2 元的笔有 x 支，2x+3(11−x)=28.5，得 x=4.5，件数必须是整数。')
      ]],
      ['行程、工程与综合建模',[
        worked('甲在乙前方 120 米，两人同时同向出发，甲每分钟 60 米，乙每分钟 80 米。几分钟追上？',[['时间',6,'分钟']],'每分钟缩短 80−60=20 米。',['设 x 分钟追上，80x−60x=120，所以 x=6。']),
        worked('两人相距 840 米，相向同时出发，速度分别是每分钟 55 米和 65 米。几分钟相遇？',[['时间',7,'分钟']],'相遇时两人行程之和等于原间距。',['设 x 分钟相遇，55x+65x=840，所以 x=7。']),
        worked('要装订 245 张卡片。甲每分钟装订 14 张，先做 5 分钟，乙以每分钟 11 张的速度加入。两人一起工作几分钟？',[['一起工作的时间',7,'分钟']],'总量由甲单独完成的量和两人合作完成的量组成。',['设一起做 x 分钟。14×5+(14+11)x=245，得 25x=175，x=7。']),
        worked('两个书架合计 45 本书。第一个书架上的书比第二个书架书本数的两倍少 3 本。两个书架各几本？',[['第一个书架',29,'本'],['第二个书架',16,'本']],'设第二个书架有 x 本，则第一个有 2x−3 本。',['x+(2x−3)=45，所以 3x=48，x=16。','第一个书架有 32−3=29 本。']),
        worked('长方形周长 48 米，长比宽多 6 米。求长和宽。',[['长',15,'米'],['宽',9,'米']],'先根据周长得到长加宽是 24 米。',['设宽 x 米，长 x+6 米。x+(x+6)=24，得 x=9。','长 15 米，周长是 2×(15+9)=48 米。']),
        worked('一个两位数，十位数字是个位数字的 2 倍。把两位数字对调后，原数比新数大 36。求原数。',[['原来的两位数',84]],'若个位数字为 x，十位为 2x，原数和新数可分别表示为 21x 和 12x。',['21x−12x=36，所以 x=4。','十位是 8，原数为 84。验算 84−48=36。'])
      ]]
    ])
  ];

  const yuanfang = [
    '《世说新语·方正》节选与情节梗概',
    '陈太丘和一位朋友约定同行，原文写“期日中”。过了中午朋友才到，陈太丘已经离开。朋友向七岁的元方问起他的父亲，知道陈太丘已走，便当着元方的面责骂陈太丘。',
    '元方回答：“日中不至，则是无信；对子骂父，则是无礼。”朋友惭愧，下车想拉住元方。原文写“元方入门不顾”。'
  ].join('\n');

  const snow = [
    '《世说新语·言语》节选与情节梗概',
    '寒冷的雪天，谢太傅召集家里晚辈谈论诗文。“俄而雪骤”，他问飞雪像什么。侄子答“撒盐空中差可拟”，侄女答“未若柳絮因风起”。谢太傅听后大笑，很高兴。'
  ].join('\n');

  const sea = [
    '曹操《观沧海》节选',
    '秋风萧瑟，洪波涌起。',
    '日月之行，若出其中；',
    '星汉灿烂，若出其里。'
  ].join('\n');

  const fog = [
    '《雾散以后》· 原创短文',
    '清晨踏进校门，雾还没有散。操场那头的看台只剩一圈模糊的轮廓，国旗却从雾里露出一角红，像浅灰纸上漏下的一滴朱砂。',
    '我沿着跑道走。鞋底擦过湿漉漉的地面，发出轻轻的沙沙声。手扶铁栏杆，掌心一凉。一颗水珠从栏杆上滚下来，钻进了两块砖的缝里。',
    '过了一会儿，白雾慢慢移向墙外。看台的台阶一层层显出来，几个早起的同学抱着篮球跑过来。我原本走得很快，这时却放慢了脚步，想再看一眼清晨的操场。'
  ].join('\n');

  const chineseTopics = [
    topic('web-chinese-classics','文言短篇阅读','七上 · 《世说新语》二则','读《陈太丘与友期行》和《咏雪》节选，练习词义、情节和语言赏析。',[
      note('解释词语要看哪一句？','把词放回句子，先判断动作的人是谁，再看动作产生了什么结果。例如元方进门后的“不顾”写的是回不回头。'),
      note('怎样比较两个比喻？','先找各自写出的共同点，再看哪个比喻更贴合语境。雪有颜色和形状，也有随风飘动的姿态。')
    ],[
      source('维基文库 · 《世说新语·方正》','https://zh.wikisource.org/zh-hans/%E4%B8%96%E8%AA%AA%E6%96%B0%E8%AA%9E/%E6%96%B9%E6%AD%A3','用于核对《陈太丘与友期行》的原文措辞和事件顺序。'),
      source('中国国家图书馆 · 《世说新语》导读','https://www.nlc.cn/migrated/www.nlc.cn/bbjd/202108dzyd/zxyd/no6/202308/P020230801358615416293.pdf','用于核对《咏雪》两种比喻及注释。本站使用短句节选与自写情节梗概。')
    ],[
      ['陈太丘与友期行',[
        choice('“期日中”的“期”是什么意思？',['约定','期限','希望','等待'],0,'“日中”是约定同行的时间，期在这里作动词，意为约定。'),
        choice('按情节先后，哪项排序正确？',['朋友到达→陈太丘离开→双方约定','陈太丘离开→双方约定→朋友到达','双方约定→陈太丘离开→朋友到达','双方约定→朋友到达→陈太丘离开'],2,'他们先约好中午，朋友过中午才到，陈太丘已先行离开。'),
        choice('元方以什么行为指出朋友“无礼”？',['过了中午才到','当着儿子的面责骂他的父亲','没有带礼物','走时没有告别'],1,'“对子骂父，则是无礼”直接说明问题在于对着孩子责骂父亲。'),
        choice('“元方入门不顾”的“顾”是什么意思？',['照料','拜访','考虑','回头看'],3,'句子描写元方转身进门，没有回头看。'),
        choice('朋友听到元方的话后有什么反应？',['觉得惭愧，想拉住元方','更加生气，继续训斥','立即追去找陈太丘','大笑，夸他聪明'],0,'原情节写朋友惭愧，下车伸手拉元方，和先前的责骂形成变化。'),
        choice('哪项最准确地概括元方答语的两层意思？',['先为父亲失约道歉，再劝朋友回家','先说明朋友失约，再指出当面辱骂失礼','先指出朋友失礼，再向朋友表示道歉','先埋怨父亲离开，再责备朋友来晚'],1,'第一层抓住错过约定时间，第二层指出当着孩子骂父亲。')
      ],yuanfang],
      ['咏雪',[
        choice('“俄而雪骤”写出了什么变化？',['雪停了，天马上晴了','过了一会儿，雪下得急了','雨下了很久才变成雪','天色一直没有变化'],1,'“俄而”指不久，“骤”在这里指下得急。'),
        choice('两个晚辈分别把飞雪比作什么？',['蒲公英和羽毛','撒向空中的盐和空中的白云','飘散的棉絮和随风飞起的柳絮','撒向空中的盐和随风飞起的柳絮'],3,'侄子说撒盐，侄女说柳絮，两人都针对眼前的飞雪作比。'),
        choice('“未若柳絮因风起”的“未若”是什么意思？',['还没弄清','假如','不如','就像'],2,'“未若”承接上一个比喻，意思是“不如”。'),
        choice('柳絮的比喻更直接表现了雪花的什么特点？',['轻盈，随风飘舞','白色，落地后积成一片','颗粒细小，落得很快','密密层层，把天空挡住'],0,'“因风起”使读者看到轻盈的雪花随风而动。'),
        choice('描写谢太傅大笑，主要有什么作用？',['明确表示只有侄子的比喻贴切','写出他听到回答后的喜悦','明确表示要求侄女换一个比喻','用大笑打断晚辈并结束谈论'],1,'大笑是听到两个回答后的反应，表现出欣喜。材料未说他明确评出高下。'),
        choice('如果用文字比较两个比喻，哪种说法都能找到材料依据？',['两句都只比较颜色，未涉及飘雪的动作。','撒盐更能表现轻盈随风，柳絮侧重盐粒似的小颗粒。','撒盐可写雪的颜色与细小颗粒感，柳絮还能写出飞舞的动态。','柳絮重在表现雪花迅速垂直落地，撒盐重在写风向。'],2,'比较可以从视觉形态和运动方式入手，两个比喻都与眼前雪景有关。')
      ],snow]
    ]),
    topic('web-chinese-scenery','古诗与现代写景','七上 · 诗景与观察','在《观沧海》节选和原创短文中辨别实景、想象、修辞和多感官描写。',[
      note('诗歌中的想象怎么识别？','像“若”这样的词往往提示“好像”。比较读者能直接观察到的海浪与想象中从海里出现的日月星辰。'),
      note('怎样说明一个比喻的作用？','先指出本体与喻体，再结合材料说清颜色、形状或动态。例如一角红与灰白的雾形成颜色对照。'),
      note('多感官描写怎样找依据？','视觉写看到的颜色与形状，听觉写声音，触觉写冷暖或质感。判断时引用相应的词。')
    ],[
      source('维基文库 · 曹操《观沧海》','https://zh.wikisource.org/zh-hans/%E8%A7%80%E6%BB%84%E6%B5%B7','核对诗句与作品归属。本站使用秋风洪波与日月星汉相关的诗句。'),
      source('中国孔子网 · 《观沧海》赏析','https://www.chinakongzi.org/kzsf/wxxs/zuozhe/caocao/200705/t20070524_23627.htm','参考实景与想象的分析角度。'),
      source('国家中小学智慧教育平台 · 七年级上册语文教材','https://r2-ndr.ykt.cbern.com.cn/edu_product/esp/assets_document/8b9c7052-add4-4744-ab04-69d6c180d5d9.pkg/pdf.pdf','参考七上第一单元写景篇目与《世说新语》选篇。现代写景材料《雾散以后》为原创。')
    ],[
      ['观沧海',[
        choice('节选中直接描写现实海景的是哪一项？',['秋风吹来，大浪涌动','日月仿佛从海中出来','灿烂的银河仿佛出自海中','日月与星汉仿佛一同被大海容纳'],0,'“秋风萧瑟，洪波涌起”直接写风浪。日月和银河仿佛出于海中属于想象。'),
        choice('“若出其中”的“若”是什么意思？',['假如','你','好像','因为'],2,'这里的“若”是“像、仿佛”的意思，后面写由观海引发的想象。'),
        choice('“星汉”在这里指什么？',['星星的名字','银河','汉代的天空','银河旁的云彩'],1,'“星汉”指银河，与前一句的日月相呼应。'),
        choice('“其中”和“其里”在诗中指什么范围？',['山上','船中','秋风中','大海中'],3,'这几句从观海生发想象，写日月和银河仿佛从大海中出现。'),
        choice('诗人先写秋风洪波，再写日月星汉，取得怎样的效果？',['从眼前风浪写到开阔的宇宙想象，突出大海的壮阔','依次实录秋日海边从早到晚见到的景象','由风浪写到繁星，重点表现海面风平浪静','由辽阔的风浪写到细小的星光，刻意缩小画面'],0,'实景使读者感到海浪的力量，日月星汉的想象把海的空间延伸得更辽阔。'),
        choice('下面哪项理解更符合节选？',['诗人借“行”说明日月星汉都是登山时亲眼所见。','诗人用“若”把具体所见与想象连在一起。','“涌起”以静态轮廓为主，与星汉的移动形成对比。','日月星汉的想象与前面的观海场景无关。'],1,'“若”提示后面的画面是一种想象，这种想象由眼前的海景引发。')
      ],sea],
      ['雾散以后',[
        choice('短文按什么顺序写操场？',['先写雾散的结果，再倒叙雾从哪儿来','由雾未散到雾渐渐散开','按从操场中心到校门的空间顺序平行写景','把有雾和无雾的两个清晨交错着写'],1,'开头明写雾还没有散，结尾写雾移向墙外、看台逐渐显出来。'),
        choice('“像浅灰纸上漏下的一滴朱砂”主要写出什么？',['水珠沿着栏杆往下滚的形态','雾在白纸一样的天空中逐渐散去','灰白的雾里那一角红色格外醒目','整个操场被红旗映成了浅红色'],2,'浅灰纸比喻雾的底色，朱砂比喻露出的一角红旗。'),
        choice('哪一句主要运用了听觉描写？',['几个同学抱着篮球跑过来。','掌心一凉。','台阶一层层显出来。','鞋底发出轻轻的沙沙声。'],3,'“沙沙声”写出所听到的声音。'),
        choice('哪一处描写主要表现触觉？',['手扶铁栏杆，掌心一凉','看台只剩模糊的轮廓','水珠钻进砖缝','几个同学抱着篮球'],0,'掌心感觉到凉，写的是身体触摸到栏杆时的感受。'),
        choice('结尾“我”为什么放慢脚步？',['因为校门锁住了','因为同学让“我”去搬篮球','因为想再观察一下雾散后的清晨操场','因为听不见操场的声音'],2,'最后一句就写“想再看一眼清晨的操场”。'),
        choice('哪一条改写练习最符合这篇短文的观察方法？',['只记录景物在雾散前的轮廓，省略此后的变化','确认一个可看到的变化，再补上所听或所触的具体细节','按颜色罗列物品，省略人物走动时感受到的细节','用雾的科普定义解释场景，省略对眼前景物的描写'],1,'短文既记录看台从模糊到显现的变化，也用声响和凉意给景物增加具体质感。')
      ],fog]
    ])
  ];

  return {english:englishTopics,math:mathTopics,chinese:chineseTopics};
})();

const publicStudyByTopic = Object.fromEntries(Object.entries(publicStudyCollections).map(([subjectId,modules])=>
  [subjectId,new Map(modules.map(module=>[module.key,module]))]
));
for (const [subjectId,modules] of Object.entries(publicStudyCollections)) {
  const subject = subjects.find(subject=>subject.id===subjectId);
  for (const module of modules) {
    subject.topics.push({
      key:module.key,title:module.title,term:'上',description:module.description,
      questions:module.questions.map(question=>({...question,subject:subject.id,topic:module.key}))
    });
  }
}
