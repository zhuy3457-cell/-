function addCourseQuestions(subjectId, key, title, description, items, {term = '上', sources = []} = {}) {
  const questions = items.map(([prompt, options, answer, explanation], index) => ({
    id: key + '-' + (index + 1),
    topic: key,
    subject: subjectId,
    level: 'standard',
    prompt,
    options,
    correct: options[answer],
    explanation
  }));
  subjects.find(subject => subject.id === subjectId).topics.push({
    key, title, term, description, questions, sources
  });
  return key;
}

const upperExtraPractice = {
  history: addCourseQuestions('history', 'history-qin-han-evidence', '秦汉统一与史料辨析', '从简牍、钱币和历史情境提取证据，区分秦汉治理措施。', [
    ['一枚出土的秦代铜权上刻有统一度量衡的诏文。它最能直接说明秦朝实行了哪项措施？',
      ['推广儒学教育', '统一度量衡', '设立西域都护', '推行推恩令'], 1, '铜权是衡器，诏文和器物相互印证，能直接说明秦朝统一度量衡。'],
    ['秦统一后，某地的郡守由朝廷任免，职位不能由子孙世袭。这体现了哪项制度？',
      ['分封制', '禅让制', '科举制', '郡县制'], 3, '郡县长官由中央任免，有利于中央直接管理地方。'],
    ['观察图中的半两钱。仅凭其中一枚实物，可以确认哪项信息？',
      ['这枚钱币的形制和铭文', '秦朝每个地区的物价', '所有居民每天的交易额', '秦朝再也没有使用其他货币'], 0, '单件实物可直接提供形制与铭文，物价、交易额和货币使用范围还需其他证据。'],
    ['汉武帝时，诸侯王可将封地分给多个子弟，分出的封国变小。这项措施的主要作用是什么？',
      ['恢复西周分封制度', '减轻农民的兵役负担', '削弱诸侯王势力，加强中央集权', '促进丝绸之路上的商品交换'], 2, '推恩令使诸侯王的封地逐渐分割，削弱了地方诸侯王对中央的威胁。'],
    ['要判断丝绸之路沿线是否发生过商品交流，下列哪组材料最能相互印证？',
      ['今人画的两幅丝路想象图', '沿线遗址出土的外来器物和同时期记载货物往来的文献', '两份没有标明依据的传说', '只标注路线的两张现代旅游图'], 1, '外来实物与同时期文字记载是不同类型的证据，可交叉检验商品往来的判断。'],
    ['按发生时间先后排序，正确的是哪一项？',
      ['秦统一六国 → 西汉建立 → 张骞首次出使西域', '张骞首次出使西域 → 西汉建立 → 秦统一六国', '西汉建立 → 秦统一六国 → 张骞首次出使西域', '秦统一六国 → 张骞首次出使西域 → 西汉建立'], 0, '秦于公元前221年统一六国，西汉于公元前202年建立，张骞于公元前138年首次出使西域。']
  ]),
  civics: addCourseQuestions('civics', 'civics-growth-scenarios', '成长与交往情境练习', '用具体行动处理学习、同伴、师生和亲子交往中的常见问题。', [
    ['小远抄了两页错题，下一次还是在同一知识点出错。下面哪项调整最能帮助他改进？',
      ['把错题重新誊写得更工整', '只把标准答案背下来', '找出错因，重做原题后再做一道同类题检查', '只练已经熟悉的题型'], 2, '找出错因、重做和迁移练习，能帮助小远判断自己是否真正掌握方法。'],
    ['同桌没有赴约，小青觉得受到了冷落。怎样做更有利于解决矛盾？',
      ['私下询问原因，说明自己的感受，再商量下次怎么联系', '在班群里发消息指责同桌', '要求其他同学一起疏远同桌', '把自己以前受过的委屈也一次算清'], 0, '先核实情况，再表达感受和商量办法，有利于消除误会、修复友谊。'],
    ['老师说小林的展示论据不足，小林对其中一点评价有疑问。比较妥当的做法是？',
      ['当堂打断老师，请全班评理', '以后不再参加展示', '把老师的评价全部当作对自己的否定', '先记录意见，课后带着材料和疑问向老师请教'], 3, '把评价落到具体作品上，课后带着材料沟通，既能尊重老师，也能主动解决疑问。'],
    ['家长担心参加社团会影响作业，小舟很想参加。哪种做法最有助于达成共识？',
      ['先瞒着家长报名', '说清兴趣与时间安排，听取家长顾虑，商定试行和复盘时间', '请同学替自己说服家长', '用拒绝做作业来表明态度'], 1, '亲子沟通需要倾听和表达。拟定可执行的安排，再根据实际情况调整，有助于建立信任。'],
    ['小组任务中一位成员临时缺席，自己负责的部分已经做完。哪种表现最能体现集体责任？',
      ['把缺席成员从名单里直接删除', '把未完成部分留到汇报时再解释', '和组员重新分工，补上缺口并告知缺席成员', '擅自重做全部内容，只写自己的名字'], 2, '主动协商和分担既能保障任务完成，也尊重其他成员的参与。'],
    ['小文想提升公开表达能力，哪个计划便于执行和检查？',
      ['每周录一次两分钟发言，请同伴指出一处可改进的地方，一个月后比较录音', '等自己完全不紧张再开口', '每次发言必须得到全班认可', '只写下“我要成为最会演讲的人”'], 0, '明确的频率、反馈方式和检查时间，能把目标变成可以持续完成的小行动。']
  ]),
  geography: addCourseQuestions('geography', 'geo-map-terrain-scenarios', '地图比例尺与地形判读', '用校园地图和等高线场景练习距离换算、方向、坡度和地形部位。', [
    ['校园地图比例尺为 1∶20 000，校门到体育馆的图上直线距离是 3 厘米。实地直线距离是多少？',
      ['60 米', '6 千米', '600 米', '60 千米'], 2, '3×20 000＝60 000 厘米，换算为 600 米。'],
    ['两幅地图图幅相同，甲图比例尺为 1∶10 000，乙图为 1∶100 000。哪幅更适合查找校园内的楼栋和小路？',
      ['甲图，因为比例尺更大，便于表示细节', '乙图，因为分母越大比例尺越大', '甲图，因为它表示的实地范围更大', '两幅地图的详略一定相同'], 0, '1∶10 000 大于 1∶100 000。图幅相同时，大比例尺适合细致表示较小范围。'],
    ['在上北下南的地图上，校门位于图书馆的左下方。校门在图书馆的什么方向？',
      ['东北', '西北', '东南', '西南'], 3, '左边是西，下方是南，左下方就是西南。'],
    ['同一幅等高线图上，两条上山路线的起终点海拔分别相同。甲路线等高线较疏，乙路线等高线较密。哪条路线整体坡度较缓？',
      ['乙路线', '甲路线', '两条路线坡度相同', '等高线疏密与坡度无关'], 1, '等高距一定时，等高线较疏，表示相同高差分布在更长的水平距离上，坡度较缓。'],
    ['图中闭合等高线的标高由外向内升高。它最可能表示什么地形部位？',
      ['山谷', '鞍部', '山峰', '陡崖'], 2, '闭合线的海拔向内逐渐升高，说明中间高、四周低，符合山峰特征。'],
    ['一组等高线穿过小河时向海拔较高的一侧弯曲。这个位置最符合哪种地形部位？',
      ['山谷', '山脊', '山顶', '陡崖'], 0, '山谷处等高线向高处凸出，小河通常沿谷底从高处向低处流。']
  ]),
  biology: addCourseQuestions('biology', 'bio-ecosystem-pond-scenarios', '池塘生态系统与科学探究', '辨认生态系统成分，分析食物链，并根据对照数据解释现象。', [
    ['观察校园池塘时，哪份记录描述的是一个完整的生态系统？',
      ['池塘中的所有鱼、虾和水草', '池塘中的水、底泥和阳光', '池塘中的所有动物及其食物', '整个池塘中的生物及其生活环境'], 3, '生态系统包含一定区域内的全部生物及其生活的非生物环境。'],
    ['池塘中的绿藻能利用光能制造有机物。它在生态系统中属于哪种成分？',
      ['消费者', '生产者', '分解者', '非生物成分'], 1, '绿藻通过光合作用制造有机物，是生产者。'],
    ['根据图中的池塘食物网，哪一条经过小虾的食物链书写正确？',
      ['小鱼 → 小虾 → 绿藻', '绿藻 → 小鱼 → 小虾', '绿藻 → 小虾 → 小鱼', '水 → 绿藻 → 小虾'], 2, '食物链从生产者开始，箭头由食物指向取食者。'],
    ['池底的落叶逐渐分解。参与这一过程的许多细菌和真菌主要起什么作用？',
      ['把落叶中的有机物分解成可进入物质循环的简单物质', '利用光能制造有机物', '把池水全部变成氧气', '使能量在池塘内反复循环使用'], 0, '分解者把有机物分解为水、二氧化碳和无机盐等，促进生态系统的物质循环。'],
    ['想探究光照对水草一小时内释放气泡数量的影响。下列哪组对照最合适？',
      ['一组用水草，另一组用小鱼，两组都照光', '两组用相同水草，一组光照强、水温高，另一组光照弱、水温低', '一组观察十分钟，另一组观察一小时，两组的光照也不同', '水草种类、用量、水温和观察时间都相同，两组只改变光照条件'], 3, '只改变光照条件，尽量让其他因素相同，才能把两组差异与光照联系起来。'],
    ['相同时间内，光照组水草产生 30 个气泡，遮光组产生 2 个气泡。根据这一次测量，哪个结论最恰当？',
      ['遮光组水草已经死亡', '在本次条件下，光照组观察到的气泡更多，仍可重复测量验证', '光照组的光合作用速率恰好是遮光组的 15 倍', '所有植物只要有光，一小时都会产生 30 个气泡'], 1, '数据直接支持本次光照组气泡更多。气泡体积可能不同，且一次测量不足以推出精确速率比或普遍结论。']
  ])
};

const englishCourseChecks = [
  ['自我介绍与同学', [
    ['Lily and I are in the same class. ___ often play ping-pong after school.', ['She', 'They', 'We', 'Us'], 2, 'Lily and I 包括说话者，用主格 We 作主语。'],
    ['I’m a new student. You can call ___ Amy.', ['I', 'me', 'my', 'mine'], 1, 'call 后是宾语，用 me。Amy 是介绍给对方使用的名字。'],
    ['That boy is Ben. ___ glasses are blue.', ['He', 'Him', 'His', 'Hers'], 2, '名词 glasses 前用形容词性物主代词 His。'],
    ['Which sentence is a friendly reply to “Glad to meet you!”?', ['Call me Ben.', 'Glad to meet you too!', 'I’m in Class 2.', 'Good luck!'], 1, '用 Glad to meet you too! 回应初次见面的问候。']
  ]],
  ['爱好与社团', [
    ['My brother enjoys ___. He often paints at the weekend.', ['paint', 'paints', 'to paint', 'painting'], 3, 'enjoy 后接动名词，第二句说明他的爱好是画画。'],
    ['—Does Leo go swimming on Wednesdays? —Yes, he ___.', ['do', 'does', 'go', 'is'], 1, 'Does 开头的一般疑问句用 Yes, he does. 作肯定简答。'],
    ['The Robot Club ___ every Wednesday after school.', ['meet', 'meets', 'meeting', 'to meet'], 1, '主语 The Robot Club 为第三人称单数，一般现在时用 meets。'],
    ['Lina and May use the same box of paints. It is ___ box.', ['Lina and May’s', 'Lina’s and May’s', 'Lina and May', 'Lina’s and May'], 0, '两人共同拥有一盒颜料，只在最后一个人名后加 ’s。']
  ]],
  ['校园与方位', [
    ['There ___ a lab and two classrooms on this floor.', ['be', 'are', 'is', 'have'], 2, '按就近原则，紧跟 be 的 a lab 是单数，用 is。'],
    ['The gym is on one side of the road. The library is directly opposite it. The library is ___ the gym.', ['behind', 'inside', 'next to', 'across from'], 3, 'directly opposite 表示正对面，可用 across from。'],
    ['—Are there any computers in the reading room? —Yes, ___.', ['they are', 'there is', 'there are', 'we do'], 2, 'There be 疑问句的简短回答保留 there，复数用 are。'],
    ['The lab is to the left of the gym and the hall is to its right. Which place is between the other two?', ['The lab.', 'The gym.', 'The hall.', 'The reading room.'], 1, '从左到右是实验室、体育馆、大厅，体育馆在中间。']
  ]],
  ['校园日常与课后活动', [
    ['I bring a water bottle ___ we have football practice this afternoon.', ['but', 'or', 'because', 'so'], 2, '下午有足球训练是带水的原因，用 because。'],
    ['Our classroom is small, ___ we keep it clean and tidy.', ['but', 'so', 'because', 'or'], 0, '前后形成转折，教室虽小，大家仍保持干净整洁。'],
    ['We want to finish faster, ___ we work in groups.', ['because', 'but', 'or', 'so'], 3, '分组是为了更快完成而采取的做法，用 so 引出结果。'],
    ['After class, we sweep the floor ___ clean the blackboard.', ['because', 'and', 'but', 'so'], 1, 'and 连接两个并列动作，扫地和擦黑板。']
  ]],
  ['饮食与健康习惯', [
    ['Lan is very good at dancing. She can ___ for an hour.', ['dances', 'dance', 'dancing', 'to dance'], 1, 'can 表示能力，后面直接接动词原形 dance。'],
    ['Which phrase means “两餐之间”？', ['at lunchtime', 'after school', 'between meals', 'at the weekend'], 2, 'between 表示在两者之间，meals 指各餐。'],
    ['Ben gets enough sleep. What does “enough” mean here?', ['太多的', '充足的', '很少的', '额外的'], 1, 'enough sleep 指满足需要的、充足的睡眠。'],
    ['We want to carry some milk. Which phrase tells us the number of milk containers?', ['five cartons of milk', 'four kilos of meat', 'a piece of cheese', 'six bottles of juice'], 0, 'carton 表示纸盒，five cartons of milk 是五盒牛奶。']
  ]],
  ['穿搭与活动时间', [
    ['The fashion show starts at a quarter to three. What time is that?', ['2:15', '2:45', '3:15', '3:45'], 1, 'a quarter to three 指离三点差十五分钟，即 2:45。'],
    ['Nina wears sports shoes every school day. She ___ wears them to school.', ['never', 'seldom', 'sometimes', 'always'], 3, 'every school day 表示每个上学日都这样，用 always。'],
    ['These jeans go well ___ my white shirt.', ['at', 'for', 'with', 'about'], 2, 'go well with 表示与某物搭配得好。'],
    ['Which sentence says what a scarf is made of?', ['It is light and warm.', 'It comes in three sizes.', 'It looks good on you.', 'It is made of cotton.'], 3, 'be made of 表明制成围巾所用的材料。']
  ]],
  ['购物与零花钱', [
    ['—___ are these sports shoes? —They’re ninety yuan.', ['How many', 'How much', 'How often', 'How long'], 1, '答句给出价格，问价格用 How much。'],
    ['Our shop is on the floor above the first floor. It is on the ___ floor.', ['two', 'twice', 'second', 'twelve'], 2, '表达楼层顺序用序数词，second 是第二。'],
    ['I have 50 yuan. I spend 18 yuan on a gift. How much money is left?', ['32 yuan.', '18 yuan.', '50 yuan.', '68 yuan.'], 0, 'left 表示剩下的，50−18=32 元。'],
    ['Ella sets a spending limit of 30 yuan and spends only 28 yuan. Which phrase fits?', ['Pay for daily needs.', 'Spend the other half.', 'Run out of money.', 'Keep to the budget.'], 3, 'keep to the budget 表示遵守预算，实际花费 28 元没有超过限额。']
  ]],
  ['节日与庆祝', [
    ['At the Dragon Boat Festival, people often ___ and watch dragon boat races.', ['hang onions on the door', 'eat rice dumplings', 'sing Christmas songs', 'eat mooncakes'], 1, '端午节常见活动是吃粽子、看龙舟赛。'],
    ['Listen! The musicians ___ a famous piece at the New Year’s Concert.', ['play', 'are playing', 'played', 'plays'], 1, 'Listen! 提示动作此刻正在发生。主语是复数，用 are playing。'],
    ['Which phrase means “和家人朋友欢聚一堂”？', ['give each other presents', 'get ready for dinner', 'get together with family and friends', 'visit a new country'], 2, 'get together with 表示与某人相聚。'],
    ['We put up the Spring Festival couplets beforehand. When do we put them up?', ['In advance.', 'At the same time every day.', 'After the holiday.', 'At the very end of the holiday.'], 0, 'beforehand 与 in advance 同义，表示提前。']
  ]]
].map(([theme, items], index) =>
  addCourseQuestions('english', 'unit-check-' + (index + 1), 'Unit ' + (index + 1) + ' 随堂小测', theme, items)
);

const analectsCourseCheck = addCourseQuestions('chinese', 'analects-course-check', '《论语》十二章随堂练习',
  '结合原句辨析字词、理解观点。', [
    ['“学而时习之”中的“习”，在这句话中最贴切的解释是什么？', ['习惯', '练习、温习', '习俗', '受风吹拂'], 1, '这句话说学过以后按时温习、练习，紧扣学习过程。'],
    ['“温故而知新，可以为师矣”中的“故”指什么？', ['过去学过的知识', '事情发生的原因', '从前的朋友', '故意的行为'], 0, '“故”与“新”相对，指旧知识。温习旧知还能获得新理解。'],
    ['哪一种做法最能体现“学而不思则罔，思而不学则殆”的主张？', ['只记结论，不分析理由', '先定结论，不再阅读材料', '碰到难处就放弃这个问题', '阅读例题后独立解释步骤，再用新题验证'], 3, '两句并列指出只学不思与只思不学的问题，强调学习和思考配合。'],
    ['“择其善者而从之，其不善者而改之”提倡怎样与人相处？', ['只模仿最熟悉的人', '见到缺点就远离对方', '学习别人的长处，反省自己的不足', '先纠正别人，再学长处'], 2, '“从”是学习、跟从，“改之”是从别人的不足反省并改正自己的问题。']
  ]);

const historyCourseChecks = [
  [9, '秦统一中国', '连起统一进程、郡县制度与标准化措施。', [
    ['秦完成统一、建立秦朝是哪一年？', ['公元前 230 年', '公元前 221 年', '公元前 209 年', '公元前 202 年'], 1, '秦从公元前 230 年起陆续灭六国，公元前 221 年完成统一。'],
    ['秦统一后，在全国推广的地方行政制度是？', ['分封制', '行省制', '郡县制', '科举制'], 2, '郡县的主要官吏由中央任免，有利于中央直接管理地方。'],
    ['外地购粮时，不同地区原先“一斗”的实际容量不同。秦的哪项措施直接减少了这种麻烦？', ['统一度量衡', '统一车辆轮距', '修筑长城', '设置太尉'], 0, '容量属于度量衡中的“量”，统一标准有利于跨地区交易。'],
    ['秦推行小篆作为通用文字，对政令传达有什么作用？', ['让官职可以世袭', '取消各地的行政区划', '让各地民众的口语立即相同', '让不同地区按共同的书写标准识读文书'], 3, '统一文字有利于各地识读相同的官方文书，也便利文化交流。']
  ]],
  [10, '秦末农民大起义', '区分大泽乡起义、秦朝灭亡和楚汉之争。', [
    ['大泽乡起义的领导者是？', ['陈胜和吴广', '刘邦和张良', '项羽和项梁', '刘秀和邓禹'], 0, '公元前 209 年，陈胜、吴广在大泽乡发动起义。'],
    ['秦末农民起义在各地获得响应，与哪种社会状况最相关？', ['诸侯国得到更多封地', '土地赋税大幅减轻', '沉重的赋役和严酷的刑罚', '地方推行科举选官'], 2, '过重的徭役、赋税和严刑加剧了社会矛盾。'],
    ['哪一事件发生在秦朝灭亡之前？', ['刘邦建立西汉', '项羽在巨鹿大败秦军主力', '刘邦战胜项羽', '汉文帝即位'], 1, '巨鹿之战发生在秦末起义过程中。刘邦、项羽争夺帝位发生在秦亡以后。'],
    ['把三件事按发生先后排列。①秦朝灭亡　②大泽乡起义　③西汉建立。', ['①②③', '③②①', '②③①', '②①③'], 3, '大泽乡起义发生于公元前 209 年，秦朝随后灭亡，西汉建立于公元前 202 年。']
  ]],
  [11, '西汉建立和“文景之治”', '从汉初社会状况理解休养生息与文景之治。', [
    ['公元前 202 年建立西汉的是谁？', ['刘秀', '汉景帝', '刘邦', '汉武帝'], 2, '刘邦建立西汉，史称汉高祖；刘秀建立的是东汉。'],
    ['战乱过后，哪项政策最直接帮助农民恢复生产？', ['减轻田租和劳役', '增加大规模徭役', '禁止休养生息', '提高农户赋税'], 0, '减轻田租和劳役可以给农户保留更多劳力和生产所得。'],
    ['“文景之治”指哪两位皇帝在位时期？', ['汉高祖和汉武帝', '汉武帝和汉昭帝', '汉景帝和光武帝', '汉文帝和汉景帝'], 3, '“文”“景”分别对应汉文帝、汉景帝。'],
    ['从“减轻徭役”“提倡勤俭”两条措施看，文景时期治理的共同方向是什么？', ['扩大诸侯国权力', '减少民众负担，推动生产恢复', '主动放弃农业', '主要依靠对外战争获取收入'], 1, '减轻服役负担、提倡节俭，有利于社会稳定与经济恢复。']
  ]],
  [12, '大一统王朝的巩固', '把推恩令、五铢钱与儒学的作用分开理解。', [
    ['推恩令通过哪种方式削弱诸侯王的势力？', ['扩大诸侯王的领地', '让诸侯王把封地分封给更多子弟', '允许各王国独立任命郡守', '取消中央对郡县的管辖'], 1, '封地继续分割后，原来较大的诸侯王国势力逐渐减弱。'],
    ['汉武帝接受董仲舒的建议后，哪家学说的地位显著提高？', ['墨家', '道家', '儒家', '兵家'], 2, '汉武帝尊崇儒术，通过太学等方式推广儒学。'],
    ['推行五铢钱主要涉及哪方面？', ['货币管理', '诸侯继承', '学校教育', '官员监察'], 0, '五铢钱属于货币，统一铸币有利于加强中央对经济的管理。'],
    ['下列措施与主要作用配对正确的是？', ['设太学—分割诸侯封地', '推恩令—统一货币形制', '推行五铢钱—培养儒学人才', '设刺史—加强对地方官员等的监察'], 3, '刺史巡视监察地方；太学培养人才，推恩令削弱诸侯势力，五铢钱是货币措施。']
  ]],
  [13, '东汉的兴衰', '梳理光武中兴、外戚宦官交替专权和黄巾起义。', [
    ['建立东汉的刘秀，史称什么？', ['汉高祖', '汉文帝', '汉武帝', '光武帝'], 3, '刘秀于公元 25 年称帝，史称汉光武帝。'],
    ['光武帝时期下令释放部分奴婢、减轻刑罚等，这些措施有利于什么？', ['激化社会矛盾', '恢复生产，缓和矛盾', '让诸侯国控制全国', '强化外戚和宦官的统治'], 1, '相关措施有助于缓和矛盾，推动经济恢复，出现光武中兴。'],
    ['一些东汉皇帝幼年即位时由太后亲属掌权，长大后又借助宫中近侍夺权。这反映了什么现象？', ['外戚和宦官交替专权', '地方实行郡县制', '实行三省六部制', '科举选官开始推广'], 0, '太后亲属是外戚，宫中近侍在此指宦官，二者形成交替专权的局面。'],
    ['东汉末年，由张角领导、沉重打击东汉统治的起义是？', ['大泽乡起义', '黄巢起义', '黄巾起义', '陈桥兵变'], 2, '张角于公元 184 年领导黄巾起义，进一步削弱了东汉统治。']
  ]],
  [14, '丝绸之路的开通与经营西域', '辨认张骞出使、西域都护与双向交流。', [
    ['汉武帝派谁出使西域？', ['班超', '张骞', '甘英', '司马迁'], 1, '张骞两次出使西域，促进了汉朝对西域的了解和联系。'],
    ['西汉设置西域都护是什么时候？', ['公元前 221 年', '公元前 202 年', '公元前 60 年', '公元 25 年'], 2, '公元前 60 年，西汉设置西域都护，加强对西域的管理。'],
    ['下面哪条路线方向最符合陆上丝绸之路的记载？', ['长安向西经河西走廊通向西域', '长安向东经海路直达日本', '洛阳向北经辽东通向朝鲜半岛', '广州向南经海路抵达印度洋'], 0, '七上所学的陆上线路由长安向西，经河西走廊、西域，再向中亚等地延伸。'],
    ['丝织品向西传出，葡萄等物产由西域传入中原。两条信息共同说明什么？', ['交流只发生在汉朝内部', '丝绸是唯一交易物品', '物产只从中原向外传播', '丝绸之路促进了双向交流'], 3, '信息分别展示向西传播与向东传入，可据此判断交流是双向的。']
  ]],
  [17, '西晋的短暂统一和北方各族的内迁', '辨析西晋统一、八王之乱与北方各族内迁。', [
    ['西晋灭吴、结束三国分立是哪一年？', ['220 年', '229 年', '280 年', '316 年'], 2, '280 年西晋灭吴，完成了短暂的统一。'],
    ['八王之乱中争夺中央权力的主要是哪些人？', ['西晋宗室诸王', '东汉地方豪强', '三国时期东吴名将', '北魏皇室'], 0, '西晋宗室诸王围绕中央权力发生长期混战。'],
    ['关于这一时期北方各族内迁，哪项理解恰当？', ['各族在同一年一次迁完', '内迁主要指江南居民迁到东北', '各族迁入后再无交往', '不同族群由此在北方部分地区共同生活'], 3, '内迁经历了较长时间，形成各族交错居住、交往的局面。'],
    ['西晋的统一为什么被称为“短暂”？', ['它始终没有灭吴', '统一后不久内乱加剧，政权很快灭亡', '它只是东晋的另一个称呼', '它在三国建立之前已灭亡'], 1, '西晋 280 年统一，后经八王之乱等动荡，316 年灭亡。']
  ]],
  [18, '东晋南朝政治和江南地区开发', '辨认东晋与南朝，分析江南开发的条件和表现。', [
    ['司马睿建立东晋，定都在哪里？', ['长安', '建康', '洛阳', '平城'], 1, '东晋于 317 年建立，以建康为都城。'],
    ['东晋之后，南方先后出现哪四个王朝？', ['魏、蜀、吴、晋', '辽、宋、夏、金', '秦、汉、隋、唐', '宋、齐、梁、陈'], 3, '南朝是继东晋之后的宋、齐、梁、陈。'],
    ['北方人口南迁对江南经济开发的一个直接作用是什么？', ['带来劳动力和生产技术', '使河流全部改道', '使南方不必再修水利', '令所有商业活动停止'], 0, '南迁人口增加劳动力，也带来了农业和手工业生产经验。'],
    ['哪项材料最直接反映江南农业开发？', ['王朝更换了国号', '史书记录了一场北方战事', '当地兴修水利，稻田面积扩大', '都城兴建了一座宫殿'], 2, '水利改善与耕地扩展均是农业开发的直接表现。']
  ]],
  [19, '北朝政治和北方民族大交融', '用政策和生活材料说明民族交融。', [
    ['北魏孝文帝将都城从平城迁到哪里？', ['建康', '成都', '洛阳', '广州'], 2, '孝文帝迁都洛阳，有利于吸收中原文化、推进改革。'],
    ['孝文帝推行的措施包括哪一项？', ['鼓励鲜卑贵族与汉族士族通婚', '在全国推行科举制', '派张骞出使西域', '以行省管理地方'], 0, '通婚是促进鲜卑贵族与汉族士族交往的措施之一。'],
    ['北方一些汉族居民采用胡床等用具，一些少数民族居民学习种植。材料表明什么？', ['各种生活方式没有变化', '各族已经完全停止交流', '交流仅发生在官员之间', '不同民族在生产与生活中互相学习'], 3, '用具和农业技术的传播都体现了日常生活中的双向影响。'],
    ['下面哪组信息能同时体现改革与交融？', ['北方战事与海上贸易', '孝文帝迁都洛阳与不同族群的生活习俗相互影响', '秦统一货币与修建长城', '赤壁之战与三国建立'], 1, '迁都是改革的重要举措，习俗相互影响是交融的表现。']
  ]],
  [20, '三国两晋南北朝时期的科技与文化', '区分农学、数学、书法和石窟艺术的代表成就。', [
    ['总结生产经验的《齐民要术》由谁撰写？', ['贾思勰', '郦道元', '祖冲之', '顾恺之'], 0, '北朝农学家贾思勰撰写《齐民要术》，记录农业及加工技术。'],
    ['祖冲之的一项数学成就是？', ['制定司母戊鼎的尺寸', '编写《齐民要术》', '撰写《水经注》', '把圆周率的数值精确到小数点后第七位'], 3, '祖冲之给出了圆周率在 3.1415926 和 3.1415927 之间的计算结果。'],
    ['《兰亭集序》常被用来学习谁的书法？', ['顾恺之', '王羲之', '钟繇', '司马迁'], 1, '《兰亭集序》是东晋书法家王羲之的代表作品。'],
    ['山西大同云冈石窟与河南洛阳龙门石窟的早期造像，可以用来研究哪方面？', ['秦朝的度量衡', '西汉的铸币步骤', '北朝的佛教石窟艺术', '东汉的造纸流程'], 2, '两处石窟的早期造像与北魏相关，是研究北朝佛教艺术的重要材料。']
  ]],
  [21, '活动课 · 从考古发现看中华文明的起源', '比较遗址信息，用具体证据说明文明起源。', [
    ['要比较两个早期遗址的年代，哪一组信息最有帮助？', ['遗址名称的字数和现存面积', '考古发掘开始的年月和队员人数', '参观人数和展厅开放时间', '同一年代单位下的测年结果和出土层位'], 3, '测年结果可供比较，出土层位有助于核对遗物属于哪一时期。'],
    ['某遗址发现成片的稻谷遗存，还发现石镰。它们可以共同支持哪项判断？', ['当地存在农业生产', '当地已经形成统一王朝', '当地已经统一文字', '遗址从未被再次使用'], 0, '稻谷和收割工具可以互相印证，支持当地从事农业生产。'],
    ['同一墓地的墓葬规模和随葬品数量明显不同。由此可以先提出什么假设？', ['人人从事相同职业', '当时可能出现了社会分化', '每座墓都属于同一年', '所有人的生活条件完全一样'], 1, '墓葬差异可以作为研究社会分化的线索，还可结合墓葬年代、等级和分布继续核实。'],
    ['课堂展示中，要说明良渚与陶寺分别提供了什么证据，哪种写法最清楚？', ['只写“都很重要”', '把两处出土物混写在一起', '分别写遗址、发现的实物及它们支持的判断', '只按今天的参观路线介绍'], 2, '把发现地点、证据和解释一一对应，听众才能核对每个判断的依据。']
  ]]
].map(([number, title, description, items]) =>
  addCourseQuestions('history', 'history-course-' + number, '第 ' + number + ' 课 · ' + title, description, items)
);

{
  const usgs = 'https://www.usgs.gov/publications/finding-your-way-map-and-compass';
  const nasa = 'https://spaceplace.nasa.gov/seasons/en/';
  const noaa = 'https://www.noaa.gov/education/resource-collections/marine-life/aquatic-food-webs';
  const openstax = 'https://openstax.org/books/biology-2e/pages/4-3-eukaryotic-cells';
  const museum = 'https://www.chnmuseum.cn/portals/0/web/zt/gudai/detail4.html';
  const makeDiagram = (src, alt, caption, source, credit = '制图依据') =>
    ({src,alt,caption,source,credit});
  const campus = makeDiagram('geo-teach-campus.webp',
    '上方为北。校门位于图书馆左下方，校门到体育馆的蓝色线段图上长3厘米，比例尺为1比20000。',
    '校园平面图（教学情境）',usgs);
  const contours = makeDiagram('geo-teach-contours.webp',
    '同一座山的闭合等高线由外向内是200、250、300、350米。甲线经过的各等高线间距较大，乙线经过的各等高线间距较小。',
    '两条路线均由200米处上升到350米处。',usgs);
  const valley = makeDiagram('geo-teach-valley.webp',
    '河流穿过三条等高线，从300米流向250米再到200米。等高线在河道处向高处弯曲。',
    '绿线为等高线，蓝箭头指示河流流向。',usgs);
  const seasons = makeDiagram('geo-teach-seasons.webp',
    '左图春分太阳直射赤道，右图北半球夏至直射北回归线。',
    '用太阳直射点的位置比较春分和夏至。',nasa);
  const pond = makeDiagram('bio-teach-pond.webp',
    '绿藻分别指向小虾和水蚤，小虾和水蚤均指向小鱼。箭头表示能量从食物流向取食者。',
    '简化的池塘食物网。',noaa);
  const bubbles = makeDiagram('bio-teach-bubbles.webp',
    '柱形图横轴为光照组和遮光组，气泡数分别是30和2。两组观察时间相同。',
    '题设示例数据。',null);
  const magnification = makeDiagram('bio-teach-magnification.webp',
    '同一装片的两个等大圆形视野。低倍下细胞图像较小且可见数量较多，高倍下细胞图像较大且可见数量较少。',
    '低倍和高倍显微视野对比（示意图）。',openstax);
  const onion = makeDiagram('bio-teach-onion.webp',
    '洋葱表皮显微照片，视野中可见许多并排的长条状细胞，有清楚的外侧边界。',
    '洋葱鳞片叶表皮的显微照片。',
    'https://commons.wikimedia.org/wiki/File:Living_cells_of_onion_epidermis_(34062338020).jpg',
    'Berkshire Community College Bioscience Image Library · CC0');
  const coin = makeDiagram('history-teach-banliang.webp',
    '三枚外形近圆、中心呈方孔的钱币，方孔两侧有铭文。',
    '半两钱实物参照（照片中的钱币用于观察形制）。',
    'https://commons.wikimedia.org/wiki/File:Qin_State_Qin_Dynasty_Banliang_Coins_(9930897714).jpg',
    'Gary Todd · CC0');
  const timeline = makeDiagram('history-teach-timeline.webp',
    '从早到晚：公元前221年秦统一六国、公元前202年西汉建立、公元前138年张骞首次出使西域。',
    '沿箭头读年代，公元前的年份数值由大到小。',museum);

  const questions = new Map(subjects.flatMap(subject=>subject.topics.flatMap(topic=>
    topic.questions.map(question=>[question.id,question]))));
  for (const [id,diagram] of [
    ['geo-map-terrain-scenarios-1',campus],['geo-map-terrain-scenarios-3',campus],
    ['geo-map-terrain-scenarios-4',contours],['geo-map-terrain-scenarios-5',contours],
    ['geo-map-terrain-scenarios-6',valley],['geo-month1-motion-shadow',seasons],
    ['bio-ecosystem-pond-scenarios-3',pond],['bio-ecosystem-pond-scenarios-6',bubbles],
    ['biology-chapter-one-review-3',magnification],['biology-chapter-one-review-onion-image',onion],
    ['history-qin-han-evidence-3',coin]
  ]) questions.get(id).diagram = diagram;
  questions.get('history-qin-han-evidence-6').answerDiagram = timeline;
}
