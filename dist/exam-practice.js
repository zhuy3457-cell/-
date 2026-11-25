const examQuestions = [
  {
    "id": "pack-math-roof-exterior",
    "topic": "parallel",
    "level": "standard",
    "prompt": "木工课的屋顶模型由三根木条组成三角形 ABC，已知 ∠BAC＝38°，∠ACB＝67°。将木条 AB 从 B 点继续直线延长到 D 点。延长的 BD 和木条 BC 所成的 ∠CBD 是多少度？",
    "correct": "105°",
    "options": [
      "75°",
      "113°",
      "105°",
      "142°"
    ],
    "explanation": "∠CBD 是三角形 ABC 在 B 点的外角，因此等于两个不相邻内角之和，即 38°＋67°＝105°。也可以先算出 ∠ABC＝75°，再用 180° 减去 75°。"
  },
  {
    "id": "pack-math-workshop-count",
    "topic": "probability",
    "level": "standard",
    "prompt": "社团活动结束后，工作人员将所有参观者在展台停留的时长分组。停留 3 分钟以上（含 3 分钟）、6 分钟以下（不含 6 分钟）的有 24 人，占全部统计人数的 30%。本次共统计了多少人？只填数字。",
    "correct": "80",
    "options": null,
    "explanation": "这一组的频数是 24，频率是 30%。因为频率＝组内人数÷总人数，所以总人数＝24÷0.30＝80。"
  },
  {
    "id": "pack-math-printing-schedule",
    "topic": "systems",
    "level": "challenge",
    "prompt": "戏剧社准备印制至少 150 份剧本。两台打印机每分钟印出的份数各自固定。试印时，甲单独工作 2 分钟、乙单独工作 3 分钟，共印 72 份。甲单独工作 4 分钟、乙单独工作 2 分钟，共印 96 份。正式印制时，乙先单独工作 1 分钟，此后两台同时工作。两台至少需要同时工作多少个整分钟？",
    "correct": "5 分钟",
    "options": [
      "4 分钟",
      "6 分钟",
      "8 分钟",
      "5 分钟"
    ],
    "explanation": "设甲、乙每分钟分别印 x、y 份。由 2x＋3y＝72、4x＋2y＝96 消元，得 x＝18、y＝12。乙先印 12 份后，还差 138 份，两台同时每分钟印 30 份。4 分钟只能印 120 份，5 分钟可印 150 份，所以最少需同时工作 5 个整分钟。"
  },
  {
    "id": "pack-math-crossed-paths",
    "topic": "powers",
    "level": "challenge",
    "prompt": "劳动课设计一块长为 (x＋7) 米、宽为 (x＋3) 米的长方形种植区。第一条步道宽 1 米，沿长边方向贯通全长。第二条步道宽 2 米，沿短边方向贯通全宽。两条步道垂直相交，其他地方均用于种植。x＝4 时，种植面积是多少平方米？只填数字。",
    "correct": "54",
    "options": null,
    "explanation": "整块地面积为 (x＋7)(x＋3)，两条步道面积分别为 1(x＋7) 和 2(x＋3)。同时减去两条步道时，交叉处的 1×2 平方米被减了两遍，要加回一次。代入 x＝4，种植面积为 11×7−11−14＋2＝54 平方米。"
  },
  {
    "id": "pack-zh-sign-question",
    "topic": "writing",
    "level": "standard",
    "prompt": "第①段为什么写爷爷折回来提问？",
    "correct": "写出“左转”缺少清楚的转弯位置，引出阿禾接下来的观察。",
    "options": [
      "表明参观者认为路牌画得不够漂亮。",
      "写出“左转”缺少清楚的转弯位置，引出阿禾接下来的观察。",
      "说明爷爷记住了转弯位置，却因为走得慢错过了同伴。",
      "交代爷爷回到校门口后，成了帮阿禾抬牌子的人。"
    ],
    "explanation": "爷爷在两种转弯位置之间拿不定主意，暴露出单写“左转”留下的疑问。第②段紧接着写阿禾站到他停步的位置观察，这个提问推动了后面的情节。",
    "material": "给脚步留一点时间\n\n① 学校开放日，值日生阿禾负责给参观者指路。她把指路牌画得很漂亮，还用蓝笔描粗了箭头。第一拨来访者刚走过去，就有一位爷爷折回来问：“往左转，是现在转，还是到那棵树下再转？”\n\n② 阿禾走到爷爷刚才停步的地方一看。路牌立在两条路分开的地方，远看只有箭头，小字要走近才看得清。人走到这里，只顾着看迎面来的同学，很容易错过那一行字。\n\n③ 她把牌子往前移了几步，又把“左转”改成“到香樟树下左转”。同桌提醒她：“再往前挪一点，大家就能边走边看。”两人抬着牌子向来路走了一段，在来访者进校后最先看得见的地方停下。\n\n④ 第二拨来访者到了。阿禾看着他们先抬头读牌子，再从容地走到香樟树下转弯。这回，她没有去看蓝箭头够不够亮。"
  },
  {
    "id": "pack-zh-sign-evidence",
    "topic": "summary",
    "level": "challenge",
    "prompt": "小组想用这篇文章说明“路牌的内容和摆放位置都要替读者考虑”。哪组改动最能同时支撑这两个方面？",
    "correct": "写明“到香樟树下左转”，并把牌子放到来访者能提前看到的地方。",
    "options": [
      "用蓝笔描粗箭头，并在两个路口都安排同学引路。",
      "把原来的箭头重新描粗，并在牌子正面加上开放日标题。",
      "写明“到香樟树下左转”，并把牌子放到来访者能提前看到的地方。",
      "把牌子往来路挪了几步，并在香樟树旁给参观者留出走路的空间。"
    ],
    "explanation": "题目要求同时找到内容、位置两方面证据。写明香樟树补足了文字信息，把牌子往来路挪到提前可见处改善了阅读时机。其他选项有的只涉及一方面，有的加入了原文没有的改动。",
    "material": "给脚步留一点时间\n\n① 学校开放日，值日生阿禾负责给参观者指路。她把指路牌画得很漂亮，还用蓝笔描粗了箭头。第一拨来访者刚走过去，就有一位爷爷折回来问：“往左转，是现在转，还是到那棵树下再转？”\n\n② 阿禾走到爷爷刚才停步的地方一看。路牌立在两条路分开的地方，远看只有箭头，小字要走近才看得清。人走到这里，只顾着看迎面来的同学，很容易错过那一行字。\n\n③ 她把牌子往前移了几步，又把“左转”改成“到香樟树下左转”。同桌提醒她：“再往前挪一点，大家就能边走边看。”两人抬着牌子向来路走了一段，在来访者进校后最先看得见的地方停下。\n\n④ 第二拨来访者到了。阿禾看着他们先抬头读牌子，再从容地走到香樟树下转弯。这回，她没有去看蓝箭头够不够亮。"
  },
  {
    "id": "pack-zh-sign-ending",
    "topic": "writing",
    "level": "challenge",
    "prompt": "最后一句“这回，她没有去看蓝箭头够不够亮”在全文中有什么作用？",
    "correct": "与开头描粗蓝箭头照应，通过关注点的变化表现阿禾开始用能否顺利指路来判断路牌。",
    "options": [
      "与开头描粗蓝箭头照应，通过关注点的变化表现阿禾开始用能否顺利指路来判断路牌。",
      "与开头描粗蓝箭头照应，说明这一次改牌时她把箭头也画得足够醒目了。",
      "补充读牌人的视角，说明他们只要认出蓝色箭头，就能到树下转弯。",
      "承接同桌挪牌的建议，说明阿禾最终只改了摆放位置，文字仍沿用原来的写法。"
    ],
    "explanation": "开头写她在意箭头颜色和牌子的样子，结尾写她观察访客读牌后是否顺利转弯。两个细节前后照应，让她从注重外观转向注重实际指路效果的变化更清楚。",
    "material": "给脚步留一点时间\n\n① 学校开放日，值日生阿禾负责给参观者指路。她把指路牌画得很漂亮，还用蓝笔描粗了箭头。第一拨来访者刚走过去，就有一位爷爷折回来问：“往左转，是现在转，还是到那棵树下再转？”\n\n② 阿禾走到爷爷刚才停步的地方一看。路牌立在两条路分开的地方，远看只有箭头，小字要走近才看得清。人走到这里，只顾着看迎面来的同学，很容易错过那一行字。\n\n③ 她把牌子往前移了几步，又把“左转”改成“到香樟树下左转”。同桌提醒她：“再往前挪一点，大家就能边走边看。”两人抬着牌子向来路走了一段，在来访者进校后最先看得见的地方停下。\n\n④ 第二拨来访者到了。阿禾看着他们先抬头读牌子，再从容地走到香樟树下转弯。这回，她没有去看蓝箭头够不够亮。"
  },
  {
    "id": "pack-en-boat-lean",
    "topic": "passage",
    "level": "standard",
    "prompt": "What does “leaned” most likely mean in the first paragraph?",
    "correct": "Tilted to one side.",
    "options": [
      "Moved very slowly.",
      "Turned completely upside down.",
      "Tilted to one side.",
      "Stayed still in the water."
    ],
    "explanation": "题目问的是词义线索。leaned 后的 to one side 指出船身偏向一边，接着写水进了船里，也符合船体倾斜后的情形。因此 leaned 在这里是“倾斜”的意思。",
    "material": "Two Paper Boats\n\nAt a school science fair, Li Mei and Noah had to make a paper boat cross a small pool. “Let’s give it a tall sail,” said Noah. Their first boat moved fast when the fan was on, but it leaned to one side and started to take in water.\n\nLi Mei wanted to start again. Noah asked her to watch the boat one more time. They saw that it only leaned when the wind grew stronger. They made a shorter sail and folded a second layer of paper around the sides. The boat was slower, but it reached the other side without getting water inside.\n\nAt the fair, another team set the fastest time. Li Mei still wrote “a success” in her notebook. Below that, she wrote, “Next time, let’s see how much faster we can go without making the boat lean.”"
  },
  {
    "id": "pack-en-boat-observation",
    "topic": "passage",
    "level": "challenge",
    "prompt": "Which line gives the right order of the team’s work and explains why they changed the boat?",
    "correct": "They watched the first boat again, saw that stronger wind made it lean, and then changed the sail and sides.",
    "options": [
      "They shortened the sail first, then tested it and found that it made the boat lean.",
      "They watched the first boat again, saw that stronger wind made it lean, and then changed the sail and sides.",
      "They added another layer of paper first, then found that the tall sail helped stop water from entering.",
      "They saw another team’s fast boat, then copied that team’s sail and tested it in stronger wind."
    ],
    "explanation": "先找 one more time，说明他们改造前重新观察。接着看 only leaned when the wind grew stronger，判断问题和风变强有关。最后回到下一句，确认他们缩短船帆，并在船侧加折了一层纸。",
    "material": "Two Paper Boats\n\nAt a school science fair, Li Mei and Noah had to make a paper boat cross a small pool. “Let’s give it a tall sail,” said Noah. Their first boat moved fast when the fan was on, but it leaned to one side and started to take in water.\n\nLi Mei wanted to start again. Noah asked her to watch the boat one more time. They saw that it only leaned when the wind grew stronger. They made a shorter sail and folded a second layer of paper around the sides. The boat was slower, but it reached the other side without getting water inside.\n\nAt the fair, another team set the fastest time. Li Mei still wrote “a success” in her notebook. Below that, she wrote, “Next time, let’s see how much faster we can go without making the boat lean.”"
  },
  {
    "id": "pack-en-boat-success",
    "topic": "passage",
    "level": "challenge",
    "prompt": "Why did Li Mei write “a success” even though another team was faster?",
    "correct": "She saw that their new design solved the water problem, and she could work on speed next.",
    "options": [
      "She learned that the team could win by keeping the tall sail.",
      "She found a way to make the second boat move faster than the first one.",
      "She thought the fastest team’s boat had taken in water.",
      "She saw that their new design solved the water problem, and she could work on speed next."
    ],
    "explanation": "第二段明确说改造后的船更慢，却能不进水地到达对岸。结尾又写她希望保持船身平稳的同时提高速度。把这两处放在一起可以看出，她把解决了眼前的问题视为成功，并把更快留作下次目标。",
    "material": "Two Paper Boats\n\nAt a school science fair, Li Mei and Noah had to make a paper boat cross a small pool. “Let’s give it a tall sail,” said Noah. Their first boat moved fast when the fan was on, but it leaned to one side and started to take in water.\n\nLi Mei wanted to start again. Noah asked her to watch the boat one more time. They saw that it only leaned when the wind grew stronger. They made a shorter sail and folded a second layer of paper around the sides. The boat was slower, but it reached the other side without getting water inside.\n\nAt the fair, another team set the fastest time. Li Mei still wrote “a success” in her notebook. Below that, she wrote, “Next time, let’s see how much faster we can go without making the boat lean.”"
  }
];

for (const question of examQuestions) {
  const target = calibratedTopics.get(question.topic);
  target.topic.questions.push({...question, subject:target.subject});
}

const practicePacks = new Map(Object.entries({
  "math": {
    "term": "下",
    "title": "数学 · 应用与综合",
    "icon": "math",
    "tone": "violet",
    "description": "先练条件转化和数字填空，再完成角度、方程组和面积的多步题。",
    "ids": [
      "cal-parallel-garden-trails",
      "pack-math-roof-exterior",
      "pack-math-workshop-count",
      "cal-probability-bin-edge",
      "cal-systems-model-kits",
      "pack-math-printing-schedule",
      "cal-powers-square-tiles",
      "pack-math-crossed-paths"
    ],
    "sources": [
      {
        "title": "苏州市吴江区 2025—2026 学年七年级下学期期末数学卷",
        "url": "https://zy.21cnjy.com/26010157",
        "note": "可见方程组建模、材料中的角度推理，以及数字填空。"
      },
      {
        "title": "江苏淮安市淮安区2025—2026学年七年级下学期期末数学公开预览",
        "url": "https://www.renrendoc.com/paper/535577462.html",
        "note": "公开预览有整式运算、平行线及三角形相关命题、二元一次方程组阅读题和面积综合题。用作下册知识范围与综合程度参考。"
      }
    ]
  },
  "chinese": {
    "term": "下",
    "title": "语文 · 阅读与表达",
    "icon": "book",
    "tone": "pink",
    "description": "读一篇原创记叙文，分辨细节、提取证据、分析结尾，再练通知整合与古诗对读。",
    "ids": [
      "pack-zh-sign-question",
      "pack-zh-sign-evidence",
      "pack-zh-sign-ending",
      "cal-zh-courtyard-narrative",
      "cal-zh-notice-revision",
      "cal-zh-poems-heard"
    ],
    "sources": [
      {
        "title": "南通市海安市 2025—2026 学年七年级下学期期末语文卷",
        "url": "https://zy.21cnjy.com/26400046",
        "note": "可见同一篇记叙文的情节梳理、词句作用和联系全文解释，以及多则材料的信息整合。"
      }
    ]
  },
  "english": {
    "term": "下",
    "title": "英语 · 语篇理解",
    "icon": "letters",
    "tone": "blue",
    "description": "读一篇原创英文短文，练语境猜词、事件顺序和原因推断，再练通知与规则。",
    "ids": [
      "pack-en-boat-lean",
      "pack-en-boat-observation",
      "pack-en-boat-success",
      "cal-en-reading-room-rule",
      "cal-en-backup-plan",
      "cal-en-library-quiet-corner"
    ],
    "sources": [
      {
        "title": "南京市建邺区新城中学 2025—2026 学年七年级下学期期末英语卷",
        "url": "https://zy.21cnjy.com/26044544",
        "note": "可见同一篇阅读材料下的细节理解、词义推断、情节排序和判断题。"
      }
    ]
  },
  "materials": {
    "term": "下",
    "title": "综合 · 材料信息推断",
    "icon": "layers",
    "tone": "teal",
    "description": "在历史、地理、生物学、道德与法治的情境中识别线索、比较条件，再根据材料限定结论。",
    "ids": [
      "cal-hist-song-market",
      "cal-health-eye-screen",
      "cal-civics-group-frustration",
      "cal-geo-monsoon-slope",
      "cal-hist-technology-materials",
      "cal-civics-exhibition-schedule",
      "cal-hist-mingqing-documents",
      "cal-geo-port-constraints",
      "cal-geo-seasonal-water",
      "cal-investigation-paired-pulse"
    ],
    "sources": [
      {
        "title": "苏州市 2025—2026 学年七年级下学期期末历史卷",
        "url": "https://zy.21cnjy.com/26090186",
        "note": "可见比较历史材料、归纳共同点和用商贸材料推断区域联系。"
      },
      {
        "title": "南通市通州区 2025—2026 学年七年级下学期期末地理卷",
        "url": "https://zy.21cnjy.com/26035844",
        "note": "可见一组问题共用同一情境，结合位置、气候和季节变化推断。"
      },
      {
        "title": "苏州市 2025—2026 学年七年级下学期期末生物学卷",
        "url": "https://www.renrendoc.com/paper/533058893.html",
        "note": "公开文字预览可见共用探究材料和从数据表选结论，部分文字有识别误差。"
      }
    ]
  }
}));

const worksheetQuestions = [
  {
    "id": "match-equation-formula-fence",
    "topic": "equation",
    "level": "standard",
    "prompt": "劳动课要给一块长方形花圃围上围栏。花圃的长比宽多 6 米，四周留出一个宽 3 米的入口，其余部分共用围栏 57 米。设花圃的宽为 x 米，下面哪个方程正确？",
    "correct": "2(x＋x＋6)－3＝57",
    "options": [
      "2(x＋x＋6)＋3＝57",
      "2(x＋x＋6)－3＝57",
      "2(x＋x＋6)－6＝57",
      "x＋x＋6－3＝57"
    ],
    "explanation": "设宽为 x 米，则长为 (x＋6) 米。长方形周长是 2(x＋x＋6) 米，减去入口的 3 米才是围栏长度，因此列式 2(x＋x＋6)－3＝57。解得 x＝12，长为 18 米。验算得 2×(12＋18)－3＝57。",
    "stage": "用公式"
  },
  {
    "id": "match-equation-formula-trapezoid",
    "topic": "equation",
    "level": "standard",
    "prompt": "美术课上，小林用卡纸剪出一个梯形。梯形的面积是 150 平方厘米，高为 10 厘米，下底比上底长 6 厘米。这个梯形的下底是多少厘米？只填数字。",
    "correct": "18",
    "options": null,
    "explanation": "设上底为 x 厘米，则下底为 (x＋6) 厘米。按梯形面积公式列式：(x＋x＋6)×10÷2＝150。化简得 2x＋6＝30，解得 x＝12，所以所求的下底是 18 厘米。验算：(12＋18)×10÷2＝150。",
    "stage": "用公式"
  },
  {
    "id": "match-equation-display-width",
    "topic": "equation",
    "level": "standard",
    "prompt": "一个长方形展板的长比宽多 4 分米。给四条边贴一圈边框，边框总长 36 分米。展板宽多少分米？只填数字。",
    "correct": "7",
    "options": null,
    "explanation": "设宽为 x 分米，则长为 x＋4 分米。按长方形周长公式列 2(x＋x＋4)＝36。解得 4x＝28，x＝7。检验：宽 7、长 11，周长 2×(7＋11)＝36 分米。",
    "stage": "用公式"
  },
  {
    "id": "match-equation-walkway-time",
    "topic": "equation",
    "level": "standard",
    "prompt": "一条步道全长 1020 米。小乐先以 75 米/分走了 8 分钟，再以 60 米/分走到终点。后一段用了几分钟？只填数字。",
    "correct": "7",
    "options": null,
    "explanation": "设后一段用了 x 分钟。根据「两段路程相加等于总路程」列 75×8＋60x＝1020。解得 x＝7。检验：两段共走 600＋420＝1020 米。",
    "stage": "用公式"
  },
  {
    "id": "match-equation-property-exterior",
    "topic": "equation",
    "level": "standard",
    "prompt": "三角形 ABC 中，把边 BC 沿原方向延长到点 D，得到外角 ∠ACD＝108°。已知 ∠A 的度数是 ∠B 的 3 倍。设 ∠B 的度数为 x，下面哪个方程正确？",
    "correct": "3x＋x＝108",
    "options": [
      "3x＋x＋108＝180",
      "3x－x＝108",
      "3x＋x＝108",
      "3x＋x＝90"
    ],
    "explanation": "设 ∠B＝x°，则 ∠A＝3x°。三角形的外角等于与它不相邻的两个内角之和，所以 3x＋x＝108。解得 ∠B＝27°、∠A＝81°，两角之和恰为 108°。",
    "stage": "用性质"
  },
  {
    "id": "match-equation-property-supplementary",
    "topic": "equation",
    "level": "standard",
    "prompt": "直线 AB 上有一点 O，射线 OC 从 O 出发且不在直线 AB 上。∠AOC 比 ∠COB 的 2 倍少 15°。求 ∠AOC 的度数。只填数字。",
    "correct": "115",
    "options": null,
    "explanation": "设 ∠COB＝x°，由题意 ∠AOC＝(2x－15)°。射线 OC 把平角 ∠AOB 分成两部分，因此列式 x＋(2x－15)＝180。解得 x＝65，所求的 ∠AOC 为 115°。验算：115＋65＝180，且 2×65－15＝115。",
    "stage": "用性质"
  },
  {
    "id": "match-equation-angle-ratio",
    "topic": "equation",
    "level": "standard",
    "prompt": "一个三角形的三个内角度数之比为 3∶4∶5。按角分类，它是什么三角形？",
    "correct": "锐角三角形",
    "options": [
      "直角三角形",
      "锐角三角形",
      "钝角三角形",
      "条件不足，无法确定"
    ],
    "explanation": "设每一份为 x°。根据三角形内角和列 3x＋4x＋5x＝180，解得 x＝15。三个角分别为 45°、60°、75°，和为 180°，且都小于 90°。",
    "stage": "用性质"
  },
  {
    "id": "match-equation-isosceles-apex",
    "topic": "equation",
    "level": "standard",
    "prompt": "一个等腰三角形的顶角比一个底角的 2 倍多 12°。它的顶角是多少度？只填数字。",
    "correct": "96",
    "options": null,
    "explanation": "设一个底角为 x°，另一个底角也是 x°，顶角为 (2x＋12)°。列 x＋x＋2x＋12＝180，解得 x＝42。顶角为 96°。检验：两个 42° 加 96° 正好是 180°。",
    "stage": "用性质"
  },
  {
    "id": "match-equation-pattern-bead-formula",
    "topic": "equation",
    "level": "standard",
    "material": "图例　○ 表示白珠，● 表示蓝珠\n第 1 图　○○｜●●●\n第 2 图　○○｜●●●｜●●●\n第 3 图　○○｜●●●｜●●●｜●●●",
    "prompt": "照这个规律排下去，左端始终保留 2 颗白珠，每增加一组就增加 3 颗蓝珠。若用 n 表示图号（n＝1，2，3，…），第 n 图的珠子总数可用哪个式子表示？",
    "correct": "3n＋2",
    "options": [
      "2n＋3",
      "3n＋2",
      "5n",
      "3n－1"
    ],
    "explanation": "设图号为 n，第 n 图有 n 组蓝珠，共 3n 颗，再加固定的 2 颗白珠，所以总数是 3n＋2。这道题只需列出式子。把 n＝1 和 n＝2 分别代入，得到 5 和 8，与图形计数相符。",
    "stage": "找规律"
  },
  {
    "id": "match-equation-pattern-ladder-levels",
    "topic": "equation",
    "level": "standard",
    "material": "顶端和底端各有 1 根横杆。每增加一层，就在左、右两侧各接 1 根短竖杆，并多加 1 根横杆；横杆总数等于层数加 1。",
    "prompt": "科技小组用短杆做梯架模型。第 n 个模型有 n 层，两侧分别用 n 根短竖杆拼接，横杆装在每层交界和模型的上下两端。第几个模型恰好用 34 根短杆？只填数字。",
    "correct": "11",
    "options": null,
    "explanation": "设第 n 个模型恰好用 34 根短杆。两侧共有 2n 根短竖杆，横杆有 n＋1 根，列式 2n＋n＋1＝34。解得 3n＝33，n＝11。11 是正整数，代入可得 22＋12＝34，所以是第 11 个模型。",
    "stage": "找规律"
  },
  {
    "id": "match-equation-pattern-pentagon-boundary",
    "topic": "equation",
    "level": "challenge",
    "material": "每张正五边形纸片有 5 条等长的边。纸片排成一列，每对相邻纸片恰好共用 1 条完整边，其他边不重合。共用边位于内部，外缘按纸片的一条边算 1 段。",
    "prompt": "第 n 图用 n 张纸片拼成，图号从 1 开始。有没有一个图形的外缘恰好由 49 段组成？",
    "correct": "没有。由 3n＋2＝49 解得 n＝47/3，图号必须是正整数",
    "options": [
      "有，是第 15 图。47/3 的整数部分是 15",
      "有，是第 16 图。47/3 四舍五入等于 16",
      "没有。由 3n＋2＝49 解得 n＝47/3，图号必须是正整数",
      "有，是第 12 图。由 4n＋1＝49 解得 n＝12"
    ],
    "explanation": "设第 n 图恰有 49 段外缘。分开数有 5n 条边，共用边有 n－1 条，每条共用边原来被两张纸片各数了 1 次，应减 2(n－1)，所以列 5n－2(n－1)＝49，解得 n＝47/3。这个值不是整数，也不能四舍五入成图号。检验相邻图形，第 15 图有 47 段，第 16 图有 50 段，均不是 49 段。",
    "stage": "找规律"
  },
  {
    "id": "match-equation-pattern-positive-index",
    "topic": "equation",
    "level": "challenge",
    "material": "第 1 图：9 盏灯。第 2 图：13 盏灯。第 3 图：17 盏灯。第 1 图是一块完整灯牌，从第 2 图起，每次都在两侧各加 2 盏灯。",
    "prompt": "做灯牌时只允许选择第 1 图、第 2 图、第 3 图……中的一个，必须刚好用完手头的灯。现有 5 盏、9 盏、29 盏三批灯，哪几批各自能拼出符合规则的灯牌？",
    "correct": "9 盏和 29 盏，分别对应第 1 图和第 6 图",
    "options": [
      "只有 29 盏，对应第 6 图",
      "5 盏和 9 盏，分别对应第 0 图和第 1 图",
      "9 盏和 29 盏，分别对应第 1 图和第 6 图",
      "三批都能拼，分别对应第 0 图、第 1 图和第 6 图"
    ],
    "explanation": "设图号为 n。从第 1 图到第 n 图共增加 n－1 次，每次增加 4 盏，因此列式 9＋4(n－1)＝灯数。依次代入 5、9、29，解得 n＝0、1、6。图号必须是正整数，0 虽符合等式但不符合题意。检验第 1 图用 9 盏，第 6 图用 9＋4×5＝29 盏。",
    "stage": "找规律"
  }
];

for (const question of worksheetQuestions) {
  const target = calibratedTopics.get(question.topic);
  target.topic.questions.push({...question, subject:target.subject});
}

const equationWorksheetPack = {
  title:'一元一次方程 · 同难度练习',
  icon:'math',
  tone:'violet',
  term:'上',
  description:'按课堂学案的三类题练习。先从公式或几何性质找等量关系，再找图形规律，并检验方程的解能否作为图号。',
  ids:worksheetQuestions.map(question=>question.id),
  stages:['用公式 · 4 题','用性质 · 4 题','找规律 · 4 题']
};
practicePacks.set('equation-modeling', equationWorksheetPack);
