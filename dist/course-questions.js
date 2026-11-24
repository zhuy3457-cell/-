function addCourseQuestions(subjectId, key, title, description, items) {
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
    key, title, term: '上', description, questions
  });
  return key;
}

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
