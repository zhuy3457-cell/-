const calibrationSources = [
  {
    "title": "教育部义务教育课程方案和课程标准（2022年版）",
    "url": "https://www.moe.gov.cn/srcsite/A26/s8001/202204/t20220420_619921.html",
    "note": "用于核对义务教育学段的课程内容和学业质量要求。公开试卷用来参考材料形式和任务要求。"
  },
  {
    "title": "苏州市教育科学研究院公开的苏州市区七年级上学期期末数学卷",
    "url": "https://szteacher.suzhou.edu.cn/News.aspx?ID=99774&NTID=291",
    "note": "官方公开全文，体现有理数、角和代数既考基本概念，也考情境建模与多步推理。使用较早试卷仅校准题型。"
  },
  {
    "title": "苏州市吴江区2025—2026学年七年级下学期期末数学卷（公开转载）",
    "url": "https://zy.21cnjy.com/26010157",
    "note": "公开卷面中的仿真实情境、方程组建模和综合角度推理，用于参考从基础应用到多条件题的变化。"
  },
  {
    "title": "苏州市 2025—2026 学年七年级上学期期末语文试题（公开转载）",
    "url": "https://zy.21cnjy.com/25189718",
    "note": "公开预览可读到短文中的字词辨析、语境中的表达顺序与整本书阅读题，作为上册语文命题形式的参考。"
  },
  {
    "title": "常州市实验初级中学 2025—2026 学年七年级下学期期中语文试卷（公开转载）",
    "url": "https://m.ht88.com/html/1/1027871.htm",
    "note": "公开预览可读到联系上下文理解词语、综合性语文活动、结合具体字词解读古诗情感等题型。"
  },
  {
    "title": "苏州市吴中、吴江、相城区 2024—2025 学年七年级下学期期末英语试卷（公开转载）",
    "url": "https://zy.21cnjy.com/23303742",
    "note": "参考公开试卷中的语境选词、阅读材料的信息提取和推断题型。"
  },
  {
    "title": "苏州市吴中区2025—2026学年七年级上学期期末历史试题（公开转载）",
    "url": "https://zujuan.zxls.com/PaperList.aspx?id=30554",
    "note": "网页公开展示选择题及材料题，可观察由史料线索定位历史事物、根据材料推断和解释的题型。"
  },
  {
    "title": "苏州市吴中、吴江、相城、高新区2024—2025学年七年级上学期期末道德与法治试题（公开转载）",
    "url": "https://www.jiangsu100.com/22802.html",
    "note": "公开预览借成长日记、师生情境和学习资料考查判断与行动。"
  },
  {
    "title": "苏州工业园区星湖学校2024—2025学年七年级下学期期中地理试题（公开转载）",
    "url": "https://www.jiangsu100.com/33773.html",
    "note": "公开预览包含地形剖面判读、世界区域定位及航运和资源的关联。"
  },
  {
    "title": "江苏连云港市灌南县2025—2026学年七年级上学期期中生物学公开预览",
    "url": "https://www.jiangsu100.com/54565.html",
    "note": "公开预览显示用具体观察材料考查显微镜、生物与环境关系、对照与变量辨析。"
  },
  {
    "title": "江苏南京市高淳区2023—2024学年七年级下学期期末生物学公开试题",
    "url": "https://www.jyeoo.com/sj/aa59e7ea-3c71-4e14-b3f5-a753f6fc470b",
    "note": "公开题干体现从血液或日常活动材料推断结构功能与调节机制。"
  }
];

const calibratedQuestions = [
  {
    "id": "cal-rational-water-rise",
    "topic": "rational",
    "level": "standard",
    "prompt": "湿地观察站把警戒水位记为 0 厘米。星期一水位记录为 −8 厘米，星期二为 ＋3 厘米。从星期一到星期二，水位变化了多少？",
    "correct": "上升了 11 厘米",
    "options": [
      "上升了 5 厘米",
      "上升了 11 厘米",
      "下降了 11 厘米",
      "下降了 5 厘米"
    ],
    "explanation": "水位变化量等于后一次读数减前一次读数，即 3−(−8)＝11 厘米。正号表示水位比前一次高。从 −8 到 0 上升 8 厘米，从 0 到 3 又上升 3 厘米。"
  },
  {
    "id": "cal-geometry-split-corner",
    "topic": "geometry",
    "level": "standard",
    "prompt": "舞台模型的 ∠AOB 为 108°。射线 OC 在角的内部，且平分 ∠AOB。在 ∠AOC 内部再画射线 OD，使 ∠AOD＝20°。∠DOC 等于多少？",
    "correct": "34°",
    "options": [
      "44°",
      "74°",
      "34°",
      "88°"
    ],
    "explanation": "角平分线把 108° 分成两个 54° 的角，因此 ∠AOC＝54°。OD 在 ∠AOC 内，∠DOC＝54°−20°＝34°。"
  },
  {
    "id": "cal-equation-garden-labels",
    "topic": "equation",
    "level": "challenge",
    "prompt": "园艺社有一批植物标签。按原计划每组分 7 张，余 9 张。又有 2 个小组报名，改为每组分 5 张，余 13 张。这批标签一共有多少张？只填数字。",
    "correct": "58",
    "options": null,
    "explanation": "设原计划有 x 个小组，同一批标签可以表示为 7x＋9 或 5(x＋2)＋13。列方程得 7x＋9＝5x＋23，所以 x＝7。把 x＝7 代回，标签总数为 7×7＋9＝58。"
  },
  {
    "id": "cal-algebra-joined-display",
    "topic": "algebra",
    "level": "challenge",
    "prompt": "美术社把两块相同的长方形展板沿短边无缝拼为一块大长方形展板。每块小展板长 (3x＋2) 厘米、宽 (x＋1) 厘米。只沿大展板的外边缘贴一圈彩带，x＝3 时需要多长的彩带？",
    "correct": "52 厘米",
    "options": [
      "60 厘米",
      "44 厘米",
      "50 厘米",
      "52 厘米"
    ],
    "explanation": "拼接后大展板的长为 2(3x＋2)，宽仍是 x＋1。外沿长度为 2[2(3x＋2)＋(x＋1)]＝14x＋10，代入 x＝3 得 52 厘米。若将两个小展板周长直接相加，就会多算两次拼接短边。"
  },
  {
    "id": "cal-parallel-garden-trails",
    "topic": "parallel",
    "level": "standard",
    "prompt": "图纸上两条平行的笔直步道被一条笔直小径所截。在两条步道之间且位于小径同一侧的两个角中，已知其中一个为 112°，另一个是多少？",
    "correct": "68°",
    "options": [
      "112°",
      "78°",
      "68°",
      "22°"
    ],
    "explanation": "题中位置关系说明这两个角是同旁内角。两直线平行，同旁内角互补，所以另一个角为 180°−112°＝68°。"
  },
  {
    "id": "cal-probability-bin-edge",
    "topic": "probability",
    "level": "standard",
    "prompt": "科学社统计 20 株豆苗的高度。按 1≤h＜4、4≤h＜7、7≤h＜10（单位为厘米）分组，三组频数分别是 3、12、5。问高度至少 4 厘米但不足 7 厘米的豆苗占多少？",
    "correct": "60%",
    "options": [
      "25%",
      "60%",
      "35%",
      "85%"
    ],
    "explanation": "“至少 4”包含 4，“不足 7”不含 7，正好对应第二组。频率等于该组频数除以总数，即 12÷20＝60%。"
  },
  {
    "id": "cal-systems-model-kits",
    "topic": "systems",
    "level": "challenge",
    "prompt": "模型社制作了甲、乙两种拼装包，一共 14 包。每包甲含 4 根木条，每包乙含 7 根木条，共用木条 71 根。制作了多少包乙？只填数字。",
    "correct": "5",
    "options": null,
    "explanation": "设甲、乙分别有 x 包、y 包。有 x＋y＝14，4x＋7y＝71。用第二式减去第一式的 4 倍得到 3y＝71−56＝15，所以 y＝5。代回得甲 9 包，木条总数确为 9×4＋5×7＝71。"
  },
  {
    "id": "cal-powers-square-tiles",
    "topic": "powers",
    "level": "challenge",
    "prompt": "两块正方形展示牌的边长分别是 (a＋2) 厘米和 (a−2) 厘米，a＞2。较大展示牌的面积比较小展示牌大 64 平方厘米。较小展示牌的面积是多少平方厘米？只填数字。",
    "correct": "36",
    "options": null,
    "explanation": "两块面积之差为 (a＋2)²−(a−2)²。用平方差公式，结果是 [(a＋2)−(a−2)][(a＋2)＋(a−2)]＝4×2a＝8a。令 8a＝64 得 a＝8，较小展示牌边长是 6 厘米，面积为 36 平方厘米。"
  },
  {
    "id": "cal-cells-slide-direction",
    "topic": "cells",
    "level": "standard",
    "prompt": "小唐在显微镜的低倍视野里看到目标叶片表皮细胞位于右下角。他想先把目标移到视野中央再换成高倍物镜。应将玻片向哪个方向移动？",
    "correct": "向右下方",
    "options": [
      "向左上方",
      "向左下方",
      "向右下方",
      "向右上方"
    ],
    "explanation": "普通光学显微镜观察到的物像是倒像，物像移动的方向与玻片实际移动的方向相反。右下方的物像需要向左上方移到中心，所以应把玻片向右下方移动。"
  },
  {
    "id": "cal-ecosystem-branch-water",
    "topic": "ecosystem",
    "level": "standard",
    "prompt": "校园科学角的观察记录中，一只干燥透明袋套住表面干燥的带叶枝条并扎紧，另一只相同的袋子在同处扎紧且保持空袋。几小时后，只有套枝条的袋内出现较多水珠。在供试条件下，这一现象最能说明什么？",
    "correct": "有水分从带叶枝条进入袋内空气",
    "options": [
      "袋上的水珠主要由袋内氧气转化而来",
      "空袋中的空气完全不含水蒸气",
      "叶片只有在完全黑暗中才散失水分",
      "有水分从带叶枝条进入袋内空气"
    ],
    "explanation": "两袋原本干燥、所处环境相同，带叶枝条是主要差别。叶片蒸腾释放的水蒸气在袋壁遇冷液化成水珠。空袋无可见水珠并不能说明里面完全没有水蒸气。"
  },
  {
    "id": "cal-plants-two-variable-tray",
    "topic": "plants",
    "level": "challenge",
    "prompt": "老师提供同一批萝卜种子的观察记录，每组都用 20 粒种子且空气条件一致。甲：湿润、24℃，萌发 18 粒；乙：干燥、24℃，萌发 0 粒；丙：湿润、8℃，萌发 5 粒；丁：干燥、8℃，萌发 0 粒。若同时寻找能分别判断水分、温度影响的两对对照，哪项选择合适？",
    "correct": "水分比较甲和乙，温度比较甲和丙",
    "options": [
      "水分比较甲和丁，温度比较乙和丙",
      "水分比较甲和乙，温度比较甲和丙",
      "水分比较甲和丙，温度比较甲和乙",
      "水分比较乙和丙，温度比较甲和丁"
    ],
    "explanation": "比较水分时，甲、乙同为 24℃，只改变干湿条件。比较温度时，甲、丙都保持湿润，只改变温度。甲和丁这类组合同时改变了干湿与温度，无法将差异归因于其中一个条件。"
  },
  {
    "id": "cal-cells-structure-evidence",
    "topic": "cells",
    "level": "challenge",
    "prompt": "有甲、乙两张玻片，一张来自洋葱鳞片叶内表皮，另一张来自人的口腔内侧，但标签没有标明取材部位。显微镜下，甲的许多细胞呈长方形且界线清晰，乙细胞形状不规则。两者都可见被染色的细胞核，甲没有看到绿色颗粒。哪一项推断符合这些证据？",
    "correct": "甲来自洋葱鳞片叶内表皮，未观察到绿色颗粒不能排除它是植物细胞",
    "options": [
      "甲来自人口腔，因为植物细胞一定有绿色颗粒",
      "甲来自洋葱鳞片叶内表皮，未观察到绿色颗粒不能排除它是植物细胞",
      "乙来自洋葱鳞片叶，因为动物细胞通常没有细胞核",
      "两者都来自植物，因为都有被染色的细胞核"
    ],
    "explanation": "甲细胞呈较整齐的形状且边界明显，符合有细胞壁的洋葱鳞片叶内表皮细胞的特征。该部位通常没有叶绿体，不能按有没有绿色来单独判定。两种细胞都有细胞核，细胞核也不能用来区分它们。"
  },
  {
    "id": "cal-body-food-passage",
    "topic": "body",
    "level": "standard",
    "prompt": "课上把人体不同部位的作用写在卡片上。有一张卡片标注：这里的内壁有很多小肠绒毛，内部有毛细血管。这个结构有利于进行哪项活动？",
    "correct": "使消化后的小分子营养物质更易被吸收",
    "options": [
      "让整块未消化的食物更易直接进入血液",
      "将食物中的淀粉直接转化为氧气",
      "使消化后的小分子营养物质更易被吸收",
      "缩短食物在小肠内的行进距离"
    ],
    "explanation": "小肠绒毛增加了小肠内表面面积，绒毛内毛细血管丰富，有利于葡萄糖、氨基酸等消化后的营养物质被吸收并运走。"
  },
  {
    "id": "cal-health-eye-screen",
    "topic": "health",
    "level": "standard",
    "prompt": "老师用纸盒做了一个眼球模型，凸透镜让外界物体在盒子后方的白色薄片上形成清晰的像。白色薄片模拟眼球内的哪个结构？",
    "correct": "视网膜",
    "options": [
      "晶状体",
      "视网膜",
      "角膜",
      "虹膜"
    ],
    "explanation": "白色薄片接收成像，类似视网膜接受聚焦后光线的作用。角膜和晶状体参与折光，虹膜调节瞳孔大小，均不是清晰物像所在的位置。"
  },
  {
    "id": "cal-investigation-paired-pulse",
    "topic": "investigation",
    "level": "challenge",
    "prompt": "三个同学在相同记录条件下，测得各自休息时与同一活动后每分钟的脉搏次数。甲为 72 和 108，乙为 84 和 100，丙为 76 和 106。哪一项评价符合这组数据？",
    "correct": "甲增加 36 次/分钟，增幅最大。三人均增加，但这三人的记录不足以说明所有人都会增加",
    "options": [
      "乙休息时的次数最多，所以乙增幅最大",
      "甲增加 36 次/分钟，增幅最大。三人均增加，但这三人的记录不足以说明所有人都会增加",
      "丙运动后为 106 次/分钟，比乙多，所以丙增幅最大",
      "三人的脉搏次数都增加，足以断定所有人增加的次数相同"
    ],
    "explanation": "应对每个人用活动后次数减去他本人的休息次数，甲、乙、丙依次为 36、16、30 次/分钟，甲增幅最大。这三名同学不是全体，也不构成各个年龄和条件的代表样本，不能从中推出人人一定增加。"
  },
  {
    "id": "cal-body-blood-route",
    "topic": "body",
    "level": "challenge",
    "prompt": "在人体循环模型中，管道 P 把血液从右心室送往肺，管道 Q 把血液从肺送回左心房。正常情况下，对两段管道和其中血液含氧量的判断，哪一项正确？",
    "correct": "P 是动脉，Q 是静脉，Q 中血液通常比 P 含氧量高",
    "options": [
      "P 是动脉，Q 是静脉，Q 中血液通常比 P 含氧量高",
      "P 是静脉，Q 是动脉，因为含氧量较高的血液一定在动脉里",
      "P、Q 都是动脉，因为它们都与心脏相连",
      "P 是动脉，Q 是静脉，P 中血液通常比 Q 含氧量高"
    ],
    "explanation": "动脉把血液送离心脏，静脉把血液送回心脏，因此 P 是肺动脉，Q 是肺静脉。血液流经肺泡周围毛细血管时获得氧，回流的 Q 通常含氧量更高。不能只凭含氧量判断动脉或静脉。"
  },
  {
    "id": "cal-zh-rain-shelter",
    "topic": "reading",
    "level": "standard",
    "prompt": "放学时雨越下越大。小珂把外套顶在头上跑到公交站，忽然又离开屋檐，往校门口折回去。值日的老师见她把墙角的图书漂流箱挪进了门卫室。最有依据的推断是什么？",
    "correct": "小珂折回去是为了防止箱里的书被雨淋湿。",
    "options": [
      "小珂觉得公交站屋檐不够宽，想换个地方等车。",
      "小珂折回去是为了防止箱里的书被雨淋湿。",
      "小珂想把书送给门卫老师做纪念。",
      "值日老师让小珂回去整理图书漂流箱。"
    ],
    "explanation": "先联系“雨越下越大”这一处境，再看她折回后做的事：把本来靠墙角的图书箱搬进室内。两处信息都指向给图书避雨。其他说法增添了换候车点、送礼或老师下令等材料未交代的原因。"
  },
  {
    "id": "cal-zh-word-choice",
    "topic": "literal",
    "level": "standard",
    "prompt": "社区地图把老街上的公开饮水点逐一标了出来，既注明开放时段，也补上绕行示意。这些说明很____，第一次来的人照着走也能找到。哪一项最贴切？",
    "correct": "详尽",
    "options": [
      "简洁",
      "严厉",
      "详尽",
      "深奥"
    ],
    "explanation": "“逐一”“既……也……”都表明说明交代得全面而具体，“详尽”最贴切。“简洁”强调少而明白，不能突出此处的信息齐全；“严厉”多指态度，“深奥”与初来的人也能看懂不合。"
  },
  {
    "id": "cal-zh-explanation-zhi",
    "topic": "classic",
    "level": "challenge",
    "prompt": "读《论语》两句：“择其善者而从之，其不善者而改之。”“知之者不如好之者，好之者不如乐之者。”下面对两句含义的概括，哪一项最准确？",
    "correct": "第一句说要从他人的表现反观自己，第二句比较知道、喜爱和以之为乐三个层次。",
    "options": [
      "第一句说应帮助同伴改掉缺点，第二句说知识多了以后自然会喜欢学习。",
      "第一句说要选择品行好的同伴，第二句说喜欢学习已经是最高的层次。",
      "第一句说同伴怎么做自己就怎么做，第二句说学习重在记住的知识多少。",
      "第一句说要从他人的表现反观自己，第二句比较知道、喜爱和以之为乐三个层次。"
    ],
    "explanation": "第一句要同时看“择”“从”和“改”。选择别人身上好的方面来学习，看到不足时反省并改正自己相应的问题。第二句两次用“不如”连接“知、好、乐”，表明层次由了解推进到喜爱，再到以之为乐。"
  },
  {
    "id": "cal-zh-reading-notes",
    "topic": "wholebook",
    "level": "challenge",
    "prompt": "一本成长小说里，第三章写小石答应守护苗圃，遇雨后却擅自回家。第十二章遇到同样的大雨，他先请邻居接班，又等交接清楚才离开。读书小组想说明他的变化。下列哪份批注最能支持小组的判断？",
    "correct": "对照两次大雨中的不同选择，指出他从想走就走变为先安排交接再离开。",
    "options": [
      "对照两次大雨中的不同选择，指出他从想走就走变为先安排交接再离开。",
      "记录两场雨的描写都很生动，并据此判断小石以前害怕下雨，后来不怕了。",
      "摘录第十二章邻居答应帮忙的一段，说明邻居一直比小石更擅长照料苗圃。",
      "列出第三章和第十二章的页数差异，说明作者后半部分更重视描写天气。"
    ],
    "explanation": "判断人物变化要在可比较的处境中找前后证据。两次都下大雨，关键区别是离开前是否考虑交接。把两处行为放在一起，才能看出他的责任意识有了变化。害怕下雨、邻居更擅长或作者偏好天气都缺少证据。"
  },
  {
    "id": "cal-zh-courtyard-narrative",
    "topic": "writing",
    "level": "standard",
    "prompt": "小安写班级修补旧书，想突出“分工让修书更快”。哪处材料最适合写成正文细节？",
    "correct": "同桌把散页按页码排好，另一人接过一叠贴边，修完的一本接一本摞了起来。",
    "options": [
      "同桌把散页按页码排好，另一人接过一叠贴边，修完的一本接一本摞了起来。",
      "同桌独自把一本书从头修到尾，剪齐封面后还试了几次不同的贴法。",
      "书架旁的窗户没有关，操场上有学生在练习跳绳。",
      "我修完第一本后给书包换了一个新挂件，自己很喜欢。"
    ],
    "explanation": "要服务于“分工让修书更快”，材料至少要看得到不同人的分工和协作带来的结果。排页、贴边是前后接续的工序，修好的书不断增多写出了效果。其他细节虽能写进别的文章，却无法说明这条因果。"
  },
  {
    "id": "cal-zh-ancient-context",
    "topic": "poetry",
    "level": "standard",
    "prompt": "韩愈《晚春》写“杨花榆荚无才思，惟解漫天作雪飞”。诗人眼前最可能是哪一幅画面？",
    "correct": "晚春时杨花和榆荚随风飞舞，远望仿佛雪片飘落。",
    "options": [
      "晚春时下了一场大雪，落雪盖住了杨树和榆树。",
      "晚春时杨、榆的枝条弯向地面，叶子像雪那样白。",
      "晚春时杨花和榆荚随风飞舞，远望仿佛雪片飘落。",
      "晚春时雪已融化，枝头才刚冒出嫩芽。"
    ],
    "explanation": "“漫天作雪飞”把杨花和榆荚漫天飞舞的样子写得像飘雪。“飞”的主体是前句的杨花榆荚，画面中的时节仍是晚春，没有写实在的降雪。"
  },
  {
    "id": "cal-zh-notice-revision",
    "topic": "summary",
    "level": "challenge",
    "prompt": "读两条消息。初版通知写，周四的旧物交换活动在操场举行，七年级 15:40 摆摊，八年级 16:10 摆摊。更新消息写，因雨改到体育馆，八年级活动推迟到周五，七年级仍按原定时间进行。如果给七年级同学发一条提醒，哪一句最准确？",
    "correct": "七年级旧物交换活动照常在周四 15:40 开始摆摊，地点改为体育馆。",
    "options": [
      "七年级旧物交换活动改到周五 15:40，地点为体育馆。",
      "七年级旧物交换活动照常在周四 15:40 开始摆摊，地点改为体育馆。",
      "七年级旧物交换活动周四 16:10 在体育馆开始摆摊。",
      "七年级旧物交换活动周四 15:40 开始摆摊，仍在操场。"
    ],
    "explanation": "先从初版提取七年级的原定时间“周四 15:40”，再分别核对更新的时间和地点。周五只适用于八年级，地点更新适用于本次活动。合并后应保留七年级原来的时段，把操场换成体育馆。"
  },
  {
    "id": "cal-zh-poems-heard",
    "topic": "poetry",
    "level": "challenge",
    "prompt": "比较王维《竹里馆》的“独坐幽篁里，弹琴复长啸”和李白《春夜洛城闻笛》的“此夜曲中闻折柳，何人不起故园情”。“折柳”在这里指曲子《折杨柳》。哪一项对两处音乐描写的比较最准确？",
    "correct": "前一句写诗人在竹林中自己弹奏，后一句写听闻曲调引出思乡感受。",
    "options": [
      "两处都写诗人与朋友合奏，表达相聚时的喜悦。",
      "前一句因听到别人的演奏而想家，后一句写诗人自己吹笛遣兴。",
      "前一句写诗人在竹林中自己弹奏，后一句写听闻曲调引出思乡感受。",
      "两处都通过音乐交代地点，诗句没有写出任何情感。"
    ],
    "explanation": "先看声音来自谁：“弹琴”承接“独坐”，是王维笔下的诗人自己演奏；“闻”则表示李白诗中听到曲调。再看写声音的用意，“故园情”直接点出乡思。不能因为两句都有音乐，就把人物动作和情感混在一起。"
  },
  {
    "id": "cal-en-library-duty",
    "topic": "present",
    "level": "standard",
    "prompt": "A school notice says Leo closes the reading room every Tuesday. Mia closes it only when Leo is away. Which sentence correctly describes their usual jobs?",
    "correct": "Leo usually closes the room, and Mia helps when he is away.",
    "options": [
      "Leo usually close the room, and Mia help when he is away.",
      "Mia usually closes the room, and Leo helps when she is away.",
      "Leo usually closes the room, and Mia helps when he is away.",
      "Leo always closes the room, and Mia never helps."
    ],
    "explanation": "通知中的 every Tuesday 描述 Leo 的日常职责，only when Leo is away 说明 Mia 只在他不在时帮忙。Leo 和 Mia 都是第三人称单数主语，肯定句谓语分别用 closes、helps。always 和 never 忽略了有人替班的情况。"
  },
  {
    "id": "cal-en-club-schedule",
    "topic": "prepositions",
    "level": "standard",
    "prompt": "The robotics club meets on Friday afternoon. This week it starts at 3:50 p.m., ten minutes earlier than usual. Which line gives the usual meeting time?",
    "correct": "At 4 p.m. on Friday afternoon.",
    "options": [
      "At 3:40 p.m. on Friday afternoon.",
      "In 4 p.m. at Friday afternoon.",
      "At 3:50 p.m. on Friday afternoon.",
      "At 4 p.m. on Friday afternoon."
    ],
    "explanation": "3:50 是本周提前十分钟的时间，因此照常时间是 4:00。钟点前用 at，具体某天的下午用 on，所以介词也要写对。"
  },
  {
    "id": "cal-en-garden-now",
    "topic": "continuous",
    "level": "challenge",
    "prompt": "Read the message: “On Wednesdays, Kim and Bo usually water the flowers. It is raining now, so they are in the classroom. Kim is making plant labels. Bo is looking for paper.” Which reply tells the usual job and what both students are doing now?",
    "correct": "They usually water the flowers. Kim is making labels, and Bo is looking for paper now.",
    "options": [
      "They usually water the flowers. Kim is making labels, and Bo is looking for paper now.",
      "They are watering the flowers now. Kim usually makes labels, and Bo usually looks for paper.",
      "They usually water the flowers. Kim is looking for paper, and Bo is making labels now.",
      "They usually makes labels. Kim and Bo are watering the flowers now."
    ],
    "explanation": "先按时间分组。usually 对应每周三浇花，用一般现在时；now 对应今天下雨后正在做的事，用 is 加 -ing。然后核对姓名和动作，Kim 在做标签，Bo 在找纸，不能互换。"
  },
  {
    "id": "cal-en-hall-slot",
    "topic": "daily",
    "level": "challenge",
    "prompt": "School Fair on Friday:\n3:30–3:50 Art Show, Room 1\n3:45–4:05 Book Swap, Library\n4:00–4:20 Robot Show, Room 2\nLin can enter the school at 3:40, must watch an activity from its start, and must leave by 4:10. Which activity can Lin finish, and where is it?",
    "correct": "The Book Swap in the library.",
    "options": [
      "The Art Show in Room 1.",
      "The Book Swap in the library.",
      "The Robot Show in Room 2.",
      "The Book Swap in Room 2."
    ],
    "explanation": "先排除 3:40 前已开场的 Art Show，再排除 4:10 后才结束的 Robot Show。Book Swap 从 3:45 到 4:05，开场和散场都在 Lin 能参加的时段内。表中给的地点是 Library。"
  },
  {
    "id": "cal-en-visit-note",
    "topic": "past",
    "level": "standard",
    "prompt": "A class diary says, “Yesterday we wanted to visit the park, but it rained. We went to the museum instead.” Which sentence correctly reports the visit?",
    "correct": "They didn’t go to the park.",
    "options": [
      "They didn’t went to the park.",
      "They don’t go to the park on rainy days.",
      "They went to the park before the museum.",
      "They didn’t go to the park."
    ],
    "explanation": "instead 表示博物馆之行替代了原定的公园之行。yesterday 要用一般过去时。过去时否定句用 didn’t，后面的 go 保持原形。日记只写了昨天发生的事，不能说明他们所有雨天的习惯。"
  },
  {
    "id": "cal-en-reading-room-rule",
    "topic": "modal",
    "level": "standard",
    "prompt": "A notice in the school reading room says, “Water in a closed bottle is OK. Please leave all food in your schoolbag.” Mei has a closed bottle of water and wants to eat an apple there. Which advice follows the notice?",
    "correct": "She can take the bottle in, but she mustn’t eat the apple there.",
    "options": [
      "She can take the bottle in, but she mustn’t eat the apple there.",
      "She must leave the bottle outside, but she can eat the apple inside.",
      "She must drink the water before going in, and she can take the apple out of her bag.",
      "She can take the bottle in, and she can eat the apple if she is quiet."
    ],
    "explanation": "第一句允许带密封水瓶，属于许可，用 can。第二句要求把食物留在书包里，苹果也属于食物，在阅览室里不能拿出来吃，因此用 mustn’t 表示禁止。安静并不是通知给出的例外。"
  },
  {
    "id": "cal-en-backup-plan",
    "topic": "future",
    "level": "challenge",
    "prompt": "On Monday, Amy wrote, “We are going to meet at the playground on Saturday.” On Friday, the teacher wrote, “It will rain on Saturday. Meet in Room 2 at the same time.” Which message correctly tells the latest plan and the reason for the change?",
    "correct": "We are going to meet in Room 2 on Saturday because it will rain.",
    "options": [
      "We are going to meet in Room 2 on Friday because it rained on Monday.",
      "We will meet at the playground on Saturday because it is sunny.",
      "We are going to meet in Room 2 on Saturday because it will rain.",
      "We are going to meet at the playground because it won’t rain on Saturday."
    ],
    "explanation": "先用星期五的新消息更新地点，Room 2 取代 playground。再把 at the same time 与原计划对照，活动仍是周六。最后识别 it will rain 是尚未发生的天气预测。be going to 说明已有计划，will rain 说明预测。"
  },
  {
    "id": "cal-en-library-quiet-corner",
    "topic": "passage",
    "level": "challenge",
    "prompt": "The school library put a box by the door so students could leave notes about problems. Several students wrote, “We can find books, but we can’t find a quiet place after lunch.” Ms Li first wanted to buy more books. After reading the notes, she moved two tables into a small room and put up a sign: “Quiet Corner, open at noon.” What can we learn from Ms Li’s change of plan?",
    "correct": "The notes helped her see that quiet space was a more immediate need than extra books.",
    "options": [
      "The notes helped her see that students could not find any books to read.",
      "The notes showed that the library needed to stay closed after lunch.",
      "The notes helped her see that quiet space was a more immediate need than extra books.",
      "The notes asked her to move all the books into the small room."
    ],
    "explanation": "先找学生实际遇到的问题，他们能找到书，却缺少午间安静阅读的地方。接着比较老师的原计划和最后行动，她原想买书，后来用小房间和桌子开设安静区。行动变化体现了她先处理学生留言中的实际困难。"
  },
  {
    "id": "cal-hist-pottery-evidence",
    "topic": "early",
    "level": "standard",
    "prompt": "小组为一处假设的史前遗址写展签。清理报告记载，当地生活区出土了多件陶罐和炭化稻粒。哪句展签最符合这些证据？",
    "correct": "当地居民的生活中已经出现陶器和稻谷",
    "options": [
      "当地居民的生活中已经出现陶器和稻谷",
      "当地每户居民都只靠种稻生活",
      "当地出土的陶罐都专门用于储存稻谷",
      "当地是全国最早使用陶器的地方"
    ],
    "explanation": "生活区同时发现陶罐和稻粒，可以支持陶器和稻谷都已出现在当地居民生活中。各户的生计、陶罐的具体用途和与其他遗址的年代先后，需要分别有更有针对性的证据。"
  },
  {
    "id": "cal-hist-qin-records",
    "topic": "qinhan",
    "level": "challenge",
    "prompt": "历史兴趣小组将两条秦朝材料改写成卡片。甲写着，不同地方的官府凭统一的容量标准清点粮食。乙写着，郡县的主要官员由中央任免。怎样分别解释两条材料的作用？",
    "correct": "甲便于按同一标准核算，乙便于中央直接管理地方",
    "options": [
      "甲便于按同一标准核算，乙便于中央直接管理地方",
      "甲便于按同一标准核算，乙便于诸侯世袭地方官职",
      "甲主要解决公文书写差异，乙便于中央直接管理地方",
      "甲主要解决公文书写差异，乙便于诸侯世袭地方官职"
    ],
    "explanation": "容量标准属于度量衡，主要解决粮食等物资按什么标准计量的问题；统一文字才直接解决文书字形差异。任免权集中在中央，有助于加强中央对郡县的管理。"
  },
  {
    "id": "cal-hist-jiankang-timeline",
    "topic": "chronology",
    "level": "challenge",
    "prompt": "南京研学小组制作年代表，先固定了三个节点：秦统一、东汉结束、西晋短暂统一。现在要加入“孙权称帝”和“东晋在建康定都”两张卡片。应该怎样插入？",
    "correct": "孙权称帝插在东汉结束之后、西晋统一之前，东晋定都插在西晋统一之后",
    "options": [
      "孙权称帝插在东汉结束之前，东晋定都插在西晋统一之后",
      "孙权称帝插在秦统一之前，东晋定都插在东汉结束与西晋统一之间",
      "孙权称帝插在东汉结束之后、西晋统一之前，东晋定都插在西晋统一之后",
      "孙权称帝与东晋定都都插在西晋统一之前"
    ],
    "explanation": "东汉结束后进入三国时期，孙权于229年称帝。西晋灭吴后短暂统一，西晋灭亡后，东晋于317年在建康建立。虽然今南京与孙吴、东晋都有联系，同属一座城市并不能确定两个事件的先后。"
  },
  {
    "id": "cal-hist-song-market",
    "topic": "tangsong",
    "level": "standard",
    "prompt": "一份模拟宋代城市生活的展板写道：“同一条街上，茶坊旁是卖书的店铺，入夜后还有商贩在街边经营。”这段材料最适合放在展览的哪一部分？",
    "correct": "城市商业的活跃",
    "options": [
      "城市商业的活跃",
      "边疆管理的制度",
      "农业工具的改进",
      "科举选官的变化"
    ],
    "explanation": "茶坊、书店、夜间商贩都属于商业活动。不同类型的店铺与夜间经营共同说明城市商业较为活跃，材料没有说明农业技术、科举制度或边疆治理。"
  },
  {
    "id": "cal-hist-mingqing-documents",
    "topic": "mingqing",
    "level": "challenge",
    "prompt": "讲解员准备两页展签。第一页是明朝船队从太仓刘家港一带出航，与海外多地交往。第二页是清朝设台湾府并隶属福建。要分别选题并归纳两页的共同价值，哪句最恰当？",
    "correct": "分别题为“海上交往”和“地方治理”，两页都可用于了解当时国家开展的活动",
    "options": [
      "都题为“海上交往”，说明明清时期对外贸易的具体规模",
      "都题为“地方治理”，说明船队出航和置府都为了管理海外地方",
      "分别题为“海上交往”和“地方治理”，两页都可用于了解当时国家开展的活动",
      "分别题为“地方治理”和“海上交往”，两页都可用于了解同一种制度"
    ],
    "explanation": "先辨别每页活动的对象：明朝船队前往海外，体现对外交往；清朝设台湾府属于地方行政管理。两者都可帮助了解当时国家的活动，但材料并未给出贸易规模，也没有表现同一种制度。"
  },
  {
    "id": "cal-hist-technology-materials",
    "topic": "exchange",
    "level": "challenge",
    "prompt": "科技史展览有两张说明卡。甲写道，工匠把单个字模排成版，印完还可拆开重排。乙写道，船员在视线不佳时仍能借助器具判断方向。如果把两张卡分别放进展柜，怎样搭配最贴切？",
    "correct": "甲配“活字印刷，便于重排文字”，乙配“指南针应用，帮助海上辨向”",
    "options": [
      "甲配“雕版印刷，便于重排文字”，乙配“指南针应用，帮助海上辨向”",
      "甲配“活字印刷，便于重排文字”，乙配“造纸技术，帮助海上辨向”",
      "甲配“造纸技术，便于重排文字”，乙配“指南针应用，帮助海上辨向”",
      "甲配“活字印刷，便于重排文字”，乙配“指南针应用，帮助海上辨向”"
    ],
    "explanation": "单字可以拆开并重新排版，是活字的直接特征，雕版上的字不能一个个拆换。乙说的是方向判断，不是书写记录，指向指南针在海上航行中的应用。"
  },
  {
    "id": "cal-geo-campus-route",
    "topic": "earth",
    "level": "challenge",
    "prompt": "连云港某校绘制了一张纸质校园图，指北针朝纸面右方，比例尺为 1∶4 000。图书馆在教学楼纸面正下方，两点图上直线距离 2.5 厘米。图书馆在教学楼哪个方向，两点实地直线距离是多少？",
    "correct": "正东，100 米",
    "options": [
      "正东，100 米",
      "正西，100 米",
      "正东，1 000 米",
      "正南，100 米"
    ],
    "explanation": "让图中北方朝向自己正前方，面向北方时的右手边是东，对应原图纸面下方。距离为 2.5×4 000＝10 000 厘米，换算为 100 米。纸面的下方只有在普通上北下南的画法下才代表南方。"
  },
  {
    "id": "cal-geo-fog-calendar",
    "topic": "climate",
    "level": "standard",
    "prompt": "学校要为盐城一次秋季户外活动评估晨雾发生的可能性。若想知道“当地秋天通常哪段时间晨雾较多”，下列哪种资料最合适？",
    "correct": "当地连续多年逐日晨间能见度记录，按秋季时段统计",
    "options": [
      "当地活动前一天的逐小时天气预报",
      "当地连续多年逐日晨间能见度记录，按秋季时段统计",
      "当地连续三日的逐小时降水实况",
      "相邻城市最近一次秋季晨雾的现场照片"
    ],
    "explanation": "“通常”要求用当地多年的同季节资料比较，晨间能见度又与题目要研究的晨雾直接相关。短期预报适合安排某一天，但不能说明多年的频率，降水量和晨雾也不能直接互相替代。"
  },
  {
    "id": "cal-geo-settlement-density",
    "topic": "population",
    "level": "challenge",
    "prompt": "某张假想区域图上，甲区人口 36 万、面积 900 平方千米，乙区人口 24 万、面积 400 平方千米。甲地区域内还有一条沿河的聚落带。根据这些信息，哪项判断可靠？",
    "correct": "乙区平均人口密度较高，但不能据此断定甲区沿河聚落带也更稀疏",
    "options": [
      "甲区人口较多，所以甲区平均人口密度较高",
      "乙区平均人口密度较高，所以乙区每个聚落都比甲区聚落更密集",
      "乙区平均人口密度较高，但不能据此断定甲区沿河聚落带也更稀疏",
      "甲区面积较大，所以甲、乙两区平均人口密度相同"
    ],
    "explanation": "甲区平均人口密度为 360 000÷900＝400 人每平方千米，乙区为 240 000÷400＝600 人每平方千米。分区平均值不能代替聚落带的局部数据，沿河聚落带仍有可能密度较高。"
  },
  {
    "id": "cal-geo-monsoon-slope",
    "topic": "asia",
    "level": "standard",
    "prompt": "在亚洲南部一条山脉的两侧，甲地位于来自海洋的夏季风迎风坡，乙地位于背风坡，两地海拔接近。夏季甲地更容易出现较多降水，主要原因是什么？",
    "correct": "来自海洋的湿润空气在甲坡被迫抬升，较容易冷却形成降水",
    "options": [
      "来自海洋的湿润空气经过甲坡时下沉，较容易冷却形成降水",
      "来自海洋的湿润空气在甲坡被迫抬升，较容易冷却形成降水",
      "甲、乙两地接受同一季风，所以降水应当完全相同",
      "相近的海拔会使背风坡的空气比迎风坡抬升更明显"
    ],
    "explanation": "湿润的夏季风先遇迎风坡，抬升过程中气温降低，水汽更容易凝结，形成地形雨。题设两地海拔接近，主要差别是相对于湿润气流的坡向。"
  },
  {
    "id": "cal-geo-port-constraints",
    "topic": "world",
    "level": "challenge",
    "prompt": "南通的地理社团为一艘前往海外港口的货轮设计模型航线。甲线走海峡，总路程最短，但有一段水深只有 9 米。乙线绕行，航程比甲长，但沿线水深都至少 13 米。模型规则要求船底与海底至少留 2 米，满载吃水深度为 8 米。按保持满载且符合规则的目标，应选哪项方案？",
    "correct": "选乙线，因为按规则水深至少要有 10 米",
    "options": [
      "选甲线，因为水深 9 米大于吃水深度 8 米",
      "选甲线，因为船底距海底 1 米已满足规则",
      "选乙线，因为按规则水深至少要有 10 米",
      "两条线都可以，因为规则只要求港口处留足 2 米"
    ],
    "explanation": "先由吃水 8 米＋所需余量 2 米得到沿线水深下限 10 米，再与两条路线最浅处比较。甲只有 9 米，即使距离短也不能满足条件；乙所给水深超过下限。"
  },
  {
    "id": "cal-geo-seasonal-water",
    "topic": "climategraph",
    "level": "challenge",
    "prompt": "某区域多年平均记录显示：1 月 23℃、降水 18 毫米，7 月 10℃、降水 103 毫米，其余月份也呈暖季较干、凉季较湿的规律。当地试验种植一种在温暖季节需水较多的作物。哪项安排最贴合资料？",
    "correct": "该地更可能在南半球，可考虑储存凉季雨水，供温暖偏干时使用",
    "options": [
      "该地更可能在北半球，可考虑储存凉季雨水，供温暖偏干时使用",
      "该地更可能在南半球，作物旺季恰好赶上全年降水较多的时段，无须考虑储水",
      "该地更可能在南半球，可考虑储存凉季雨水，供温暖偏干时使用",
      "该地更可能在北半球，可依靠 7 月的高温和多雨同时满足作物需要"
    ],
    "explanation": "1 月暖而 7 月凉，说明该地更可能在南半球；当地较暖的时期反而少雨，与作物温暖季节的用水需求错开。储存凉季雨水可以帮助缓解暖季缺水，题目并未给出足以判断实际供水总量的信息。"
  },
  {
    "id": "cal-civics-specific-feedback",
    "topic": "self",
    "level": "standard",
    "prompt": "小桥在班级朗诵活动后写道：“录音里我有几句读得太快；同伴说停顿也不够清楚。”如果他准备制定下一周的改进目标，哪项最容易检验效果？",
    "correct": "每天选一小段标出停顿，录两次朗读并比较停顿是否清楚",
    "options": [
      "把每天练习时间延长一倍，只登记练了多久",
      "每天选一小段标出停顿，录两次朗读并比较停顿是否清楚",
      "只请同伴每天给出一个总分，不追问具体原因",
      "改练一个熟悉的故事，以最后完成了几篇为检验标准"
    ],
    "explanation": "有效目标要回应实际问题，并有清晰的检验方法。标记停顿和比较录音都直接对应本次反馈；只记时间、总分或篇数，很难知道停顿和语速是否真的改善。"
  },
  {
    "id": "cal-civics-photo-boundary",
    "topic": "relation",
    "level": "challenge",
    "prompt": "徐州某校的小安答应朋友保留一张合影。老师请小安为班级展示提交活动照片，朋友此前明确说这张合影只愿私下保存。离提交还剩半天，班级还有其他已征得同学同意的照片。小安怎么处理最妥当？",
    "correct": "保留朋友的合影供私下纪念，按时提交已经取得同意的其他照片",
    "options": [
      "说明老师统一收集，先提交朋友的合影，再由朋友决定是否撤回",
      "保留朋友的合影供私下纪念，按时提交已经取得同意的其他照片",
      "请同组投票决定，票数多数赞成就提交朋友的合影",
      "为避免再起争执，直接放弃提交班级展示照片"
    ],
    "explanation": "先区分答应私下保留与允许公开展示。朋友已经明确表达边界，应尊重其决定。题目同时给出了按时完成展示的可行替代方案，可以兼顾友谊、尊重和集体任务。"
  },
  {
    "id": "cal-civics-review-plan",
    "topic": "learning",
    "level": "challenge",
    "prompt": "家长看到小舟总要翻书核对，担心她没有掌握地理。她自己也发现，同一道题看懂解析后，过两天换个图就容易做错。下列哪项既能检测是否真正掌握，也最方便和家长沟通？",
    "correct": "隔两天闭卷做同知识点的新题，记录错因，并向家长说明要怎么改进",
    "options": [
      "当天反复做原题，向家长展示最快完成的一次",
      "隔两天闭卷做同知识点的新题，记录错因，并向家长说明要怎么改进",
      "先把新题答案抄到题旁，过两天按答案重做，再展示正确率",
      "把每日复习时间加长，把复习时长作为唯一的掌握指标"
    ],
    "explanation": "延后作答能检验是否记得住，同知识点的新题能检验是否会迁移，闭卷能避免靠解析完成。记录并交流错因，能让家长看到问题和改进办法，比展示练习时长或当天重做原题更贴近实际掌握情况。"
  },
  {
    "id": "cal-civics-group-frustration",
    "topic": "emotion",
    "level": "standard",
    "prompt": "小南看见本组作品评分较低，马上在群聊里写好一条责怪队友的消息，还没发送。哪种做法最有助于调节情绪并给后续沟通留出空间？",
    "correct": "暂缓发送，等情绪平稳后再约队友一起看评分意见",
    "options": [
      "暂缓发送，等情绪平稳后再约队友一起看评分意见",
      "先把责怪消息发给一名好友，再请他转达",
      "先在群里用反话表达不满，晚一点再解释",
      "装作毫不在意，以后尽量避开和队友讨论作品"
    ],
    "explanation": "短暂停顿可以减少冲动表达造成的伤害。等情绪平稳后回到评分意见，便能把注意力转到可讨论的事实与改进办法；间接责怪、使用反话或长期回避都不利于合作。"
  },
  {
    "id": "cal-civics-private-registration",
    "topic": "law",
    "level": "challenge",
    "prompt": "扬州某校兴趣小组群里出现一个自称“活动补登记”的陌生链接，要求填写家庭住址和家长证件号码。群内有人说它可能是真通知，也有人已经填过。尚未提交的小宇该怎样做？",
    "correct": "暂不填写，通过平时使用的学校渠道核实，并提醒已填写的同学向监护人或老师求助",
    "options": [
      "先用自己的信息试填，若页面可以提交再提醒老师",
      "暂不填写，通过平时使用的学校渠道核实，并提醒已填写的同学向监护人或老师求助",
      "把链接转到其他班寻找填过的人，根据转发数量判断真假",
      "只填家长的证件号码，把住址空着，等主办方主动解释"
    ],
    "explanation": "家长证件号码和家庭住址都需要谨慎保护，群转发和页面能够提交并不证明来源可靠。先停止填写并从已知正规渠道核实，同时让可能已泄露信息的同学尽早获得可信成年人帮助。"
  },
  {
    "id": "cal-civics-exhibition-schedule",
    "topic": "responsibility",
    "level": "challenge",
    "prompt": "无锡某校的志愿队做公开展板。一页数据图快做好了，但组员刚发现统计范围写错，重算可能赶不上布置时间。展板也可以先撤下这页，其他部分照常展示。面对时间压力，哪项最负责任？",
    "correct": "立即说明错误和时间风险，商议重算并复核，来不及就先撤下该页",
    "options": [
      "把数据来源改为小组估算，数字保持原样，让观众自行判断",
      "把数据图先贴出来，等活动结束后统一更正",
      "立即说明错误和时间风险，商议重算并复核，来不及就先撤下该页",
      "自行删掉图表并离开现场，等其他同学发现后再处理"
    ],
    "explanation": "先向团队说明已知事实，才能共同判断重算和复核所需时间。由于存在先撤下该页的替代方案，既能避免公开传播有误数据，也能维持其他内容按时展示，体现对团队和观众负责。"
  },
  {
    "id": "cal-pe-warmup-jump",
    "topic": "warmup",
    "level": "standard",
    "prompt": "同学们完成了慢跑和踝、膝活动，接下来要练习跳起后的稳定落地。正式练习前，哪一步最能起到专项热身的作用？",
    "correct": "做几次低幅度起跳，按老师提示屈髋屈膝轻稳落地",
    "options": [
      "做几次低幅度起跳，按老师提示屈髋屈膝轻稳落地",
      "原地做几组小幅肩部绕环",
      "在场边做几次不带起跳的上肢摆动",
      "再做一轮相同速度的慢跑"
    ],
    "explanation": "专项热身要和接下来的动作相接。低幅度起跳和缓冲落地能同时预习起跳、落地两个环节，强度也便于控制。"
  },
  {
    "id": "cal-pe-warmup-space",
    "topic": "warmup",
    "level": "challenge",
    "prompt": "体育课原定先绕场慢跑，再练短距离折返。雨后场地一侧湿滑，老师已划好干燥练习区，只容两组活动，全班有四组。哪项调整同时保留热身作用并让折返练习安全有序？",
    "correct": "各组先在等候区做完原地动态热身，再按老师指示每批两组到干燥区分道练习",
    "options": [
      "全班都在干燥区分散做原地热身，随后四组同时做折返",
      "两组先在干燥区做折返，另两组原地热身，交换时直接做折返",
      "四组都做完原地热身，再依次使用原定折返点",
      "各组先在等候区做完原地动态热身，再按老师指示每批两组到干燥区分道练习"
    ],
    "explanation": "先保证各组都完成热身，再同时满足干燥区域和每批最多两组的条件。分道轮换还能减少相向交叉。"
  },
  {
    "id": "cal-pe-fitness-space",
    "topic": "fitness",
    "level": "standard",
    "prompt": "三人传球练习中，甲持球，乙被防守队员挡住，丙站在空位。此时最容易让小组保持控球的是哪种配合？",
    "correct": "甲向丙传球，乙向空位移动接应",
    "options": [
      "甲留在原地护球，乙和丙都移到甲身边",
      "甲等丙靠近乙后，再传给其中离甲更近的人",
      "甲向丙传球，乙向空位移动接应",
      "甲向乙传球，丙留在原地观察"
    ],
    "explanation": "观察传球路线时要先看防守的位置。丙处于空位，乙再移动接应，可以给下一次传球留出路线。"
  },
  {
    "id": "cal-pe-fitness-load",
    "topic": "fitness",
    "level": "challenge",
    "prompt": "运动记录显示，小周连续两周每周三次、每次快走 15 分钟，结束后状态良好。他计划下周适当增加训练量，但希望保持练习频率，并观察单项调整的效果。哪项计划最合适？",
    "correct": "仍每周三次，保持原速度，每次快走 17 分钟并记录感受",
    "options": [
      "仍每周三次，每次 15 分钟，保持原速度",
      "仍每周三次，保持原速度，每次快走 17 分钟并记录感受",
      "改为每周四次，保持原速度，每次快走 15 分钟",
      "仍每周三次，每次 17 分钟，同时明显加快速度"
    ],
    "explanation": "题目要求频率不变、运动总量小幅增加、只调整一项。保持次数和速度，只小幅延长每次时间，便于比较前后的感受。"
  },
  {
    "id": "cal-music-rhythm-fill",
    "topic": "rhythm",
    "level": "standard",
    "prompt": "一段旋律用 2/4 拍记谱，某小节已经写入一个四分音符和一个八分音符。要把这一小节补足，可以再写入哪一种音符？",
    "correct": "一个八分音符",
    "options": [
      "一个八分音符",
      "一个四分音符",
      "一个十六分音符",
      "一个二分音符"
    ],
    "explanation": "2/4 拍每小节两拍，四分音符是一拍，八分音符是半拍。已有一拍半，再补半拍即可。"
  },
  {
    "id": "cal-music-rhythm-time",
    "topic": "rhythm",
    "level": "challenge",
    "prompt": "班级排练一段 3/4 拍的旋律，按每分钟 72 拍匀速演奏。节拍器开始后，前 1 小节只数拍，第 2 小节才起唱，再唱满 5 个小节。起唱前等了多久，从开始数拍到唱完共多久？",
    "correct": "2.5 秒，15 秒",
    "options": [
      "2.5 秒，12.5 秒",
      "0.83 秒，5 秒",
      "5 秒，15 秒",
      "2.5 秒，15 秒"
    ],
    "explanation": "每拍用时 60÷72 秒，每小节三拍，等一小节要 2.5 秒。连同唱的五小节共六小节，合计 15 秒。"
  },
  {
    "id": "cal-music-listening-entry",
    "topic": "listening",
    "level": "standard",
    "prompt": "音乐小组想把同一首歌的齐唱改成轮唱。两组仍各唱原来的完整旋律，应该怎样安排进场时间？",
    "correct": "第一组唱了两小节后，第二组从开头加入，两组继续各唱各的进度",
    "options": [
      "第一组唱了两小节后，第二组从开头加入，两组继续各唱各的进度",
      "两组同时从第一小节开始，在段末一起停下",
      "第一组唱完整首歌并停下，第二组才从头唱",
      "第一组从头唱主旋律，第二组同时唱起一条不同的旋律"
    ],
    "explanation": "轮唱需要两组先后进入同一条旋律，而且有重叠。第二组从开头加入时，第一组已经唱到后面的部分。"
  },
  {
    "id": "cal-music-listening-contrast",
    "topic": "listening",
    "level": "challenge",
    "prompt": "音乐欣赏课上，老师给出两段录音的记录。甲段用长笛演奏，节拍器始终是每分钟 80 拍，声音由弱到强。乙段换成小提琴，节拍器调到每分钟 96 拍，音量始终均匀。哪条听辨记录最准确？",
    "correct": "甲段有渐强，乙段速度较快，两段主奏乐器的音色不同",
    "options": [
      "甲段力度稳定，乙段有渐强，两段主奏乐器的音色不同",
      "甲段有渐强，乙段速度较快，两段主奏乐器的音色不同",
      "甲段有渐快，乙段力度较强，两段主奏乐器的音色不同",
      "甲段有渐强，乙段速度较慢，两段主奏乐器的音色相同"
    ],
    "explanation": "节拍器数值反映速度，甲段的拍速固定，乙段 96 拍比 80 拍快。甲段音量逐渐变大，对应渐强。长笛与小提琴产生不同的音色。"
  },
  {
    "id": "cal-art-color-contrast",
    "topic": "color",
    "level": "standard",
    "prompt": "画一幅校园夜景时，背景已经用了深蓝紫色。同学希望观众先注意画面中占地很小的路灯光晕。哪种处理最容易让光晕成为视觉焦点？",
    "correct": "用亮黄色表现光晕，周围仍保留深蓝紫",
    "options": [
      "用亮黄色表现光晕，周围仍保留深蓝紫",
      "把光晕和背景一起涂成深蓝紫",
      "把光晕与背景一起调成相近的浅灰",
      "在天空各处重复大小和亮度相同的黄色光晕"
    ],
    "explanation": "面积较小的亮黄色放在深蓝紫背景上能形成醒目的明暗和冷暖对比，视线更容易集中在路灯附近。"
  },
  {
    "id": "cal-art-color-hierarchy",
    "topic": "color",
    "level": "challenge",
    "prompt": "班级要做一张雨天安全海报，要求远处先看清主标题，近处能读到三条规则，并保留左下角已有的小雨伞插画。标题和规则目前都压在深色插画上。哪项调整最能同时满足要求？",
    "correct": "把亮色大标题放到上方深色留白，规则放在独立浅底区并用深色小字，雨伞留在左下角",
    "options": [
      "用亮色把标题和规则全部加粗放大，仍压在原有插画上",
      "把标题放到上方留白，把三条规则缩成伞柄旁的一竖行，保留小雨伞",
      "给标题和规则分别放到两块留白区但刻意保持同等字号和强调色，并移走小雨伞",
      "把亮色大标题放到上方深色留白，规则放在独立浅底区并用深色小字，雨伞留在左下角"
    ],
    "explanation": "标题需要鲜明的层级与明暗对比，规则要有足够阅读空间，插画也必须保留。把三类元素分开安放，可以同时满足这些条件。"
  },
  {
    "id": "cal-art-design-reflect",
    "topic": "design",
    "level": "standard",
    "prompt": "剪纸图案沿竖直中线左右对称。左边有一颗小圆点，离中线 2 厘米，离纸张下边 3 厘米。右边对应的圆点应落在哪里？",
    "correct": "中线右边 2 厘米，离下边 3 厘米",
    "options": [
      "中线右边 2 厘米，离下边 1 厘米",
      "中线左边 2 厘米，离下边 3 厘米",
      "中线右边 2 厘米，离下边 3 厘米",
      "中线右边 3 厘米，离下边 2 厘米"
    ],
    "explanation": "竖直轴对称会改变圆点所在的左右侧，圆点到中线的距离和高度保持一致。"
  },
  {
    "id": "cal-art-design-border",
    "topic": "design",
    "level": "challenge",
    "prompt": "学校展板底边要排一行剪纸纹样，共 9 格。正中第 5 格是花，两端都是叶，花与叶必须交替，并要以第 5 格为中线左右对称。哪项同时符合规定？",
    "correct": "以上要求无法同时满足",
    "options": [
      "以上要求无法同时满足",
      "叶、花、叶、花、叶、花、叶、花、叶",
      "花、叶、花、叶、花、叶、花、叶、花",
      "叶、花、叶、叶、花、叶、叶、花、叶"
    ],
    "explanation": "若从左端叶开始交替，第 1、3、5、7、9 格都应是叶，和第 5 格必须是花的条件冲突。左右对称仍可实现，须先修改端点或中心的要求。"
  },
  {
    "id": "cal-it-data-sum",
    "topic": "data",
    "level": "standard",
    "prompt": "小组把每次借阅记成表格的一行，列有“日期、班级、书籍类别”。要统计七年级一班本周借阅科普书的次数，最合适的操作是什么？",
    "correct": "筛选本周、一班、科普三个条件后，数保留下来的行数",
    "options": [
      "筛选本周、一班、科普三个条件后，数保留下来的行数",
      "只筛选一班，把保留下来的不同图书类别种数作为结果",
      "按日期升序排列，把最上面七行作为结果",
      "筛选本周和科普，数出现过多少个班级"
    ],
    "explanation": "每行代表一次借阅，同时满足时间、班级与书籍类别条件的行数，就是题目所求的次数。"
  },
  {
    "id": "cal-it-data-fair",
    "topic": "data",
    "level": "challenge",
    "prompt": "学校想公开两个班的阅读参与情况。甲班 40 人有 28 人参加，乙班 50 人有 32 人参加，原登记表里有姓名。既要公平比较参与情况，也要保护个人信息，公开哪种结果最合适？",
    "correct": "只列班级和参与率，甲班 70%，乙班 64%",
    "options": [
      "只列班级和参与人数，甲班 28 人，乙班 32 人，并据此认定乙班参与程度更高",
      "列班级、参与率以及各班所有参与者的姓名",
      "只列班级和参与率，甲班 56%，乙班 80%",
      "只列班级和参与率，甲班 70%，乙班 64%"
    ],
    "explanation": "两班人数不同，应分别除以各自班级人数。计算得 28÷40＝70%，32÷50＝64%，公开汇总数据即可。"
  },
  {
    "id": "cal-it-algorithm-log",
    "topic": "algorithm",
    "level": "standard",
    "prompt": "画图程序接到四条指令。第一次画 1 个圆，随后反复执行“把本次画的圆数增加 1，再画这些圆”，共执行三次。只统计三次重复指令画出的圆，一共画几个？",
    "correct": "9 个",
    "options": [
      "10 个",
      "12 个",
      "9 个",
      "6 个"
    ],
    "explanation": "第一次的 1 个圆属于初始操作。三次重复分别画 2、3、4 个，合计 9 个。"
  },
  {
    "id": "cal-it-algorithm-branch",
    "topic": "algorithm",
    "level": "challenge",
    "prompt": "计分程序初始分数为 3。每轮先判断当前分数，若小于 6 就加 2，否则减 1，随后记录新分数。执行四轮后，哪组记录正确？",
    "correct": "5、7、6、5",
    "options": [
      "5、7、9、11",
      "5、7、6、5",
      "5、7、6、8",
      "3、5、7、6"
    ],
    "explanation": "第一轮 3 小于 6，得 5，第二轮 5 小于 6，得 7。第三轮 7 大于 6，得 6。第四轮 6 等于门槛，进入减 1 的分支，得 5。"
  },
  {
    "id": "cal-labor-planning-order",
    "topic": "planning",
    "level": "standard",
    "prompt": "同学们整理一排劳动柜，需要取出物品、擦柜板、晾干柜面、按标签归位。为了使已归位物品保持干燥，哪一组安排最合适？",
    "correct": "先取出，擦柜板并晾干，再核对标签归位",
    "options": [
      "先取出，擦柜板并晾干，再核对标签归位",
      "先取出并核对标签归位，再擦柜板",
      "先晾干柜面，再取出物品和擦柜板，最后归位",
      "先取出并擦柜板，马上归位，再开柜通风"
    ],
    "explanation": "擦柜板会使柜面变湿，要在擦完后留出晾干时间，之后再把物品放回，才可避免物品受潮。"
  },
  {
    "id": "cal-labor-planning-parallel",
    "topic": "planning",
    "level": "challenge",
    "prompt": "小组有两人，要在离教室前整理劳动成果。清点工具需 3 分钟，填写工具清单需 2 分钟且必须等清点完成。整理照片和收拾桌面各需 4 分钟，可以从开始就独立进行。每项工作只需一人。最快几分钟完成？",
    "correct": "7 分钟",
    "options": [
      "7 分钟",
      "9 分钟",
      "13 分钟",
      "8 分钟"
    ],
    "explanation": "两人总工作时间至少是 3＋2＋4＋4＝13 分钟，所以 6 分钟内完不成。甲先清点 3 分钟，再整理照片 4 分钟。乙先收拾桌面 4 分钟，再填单 2 分钟。填单开始时已清点完毕，两人最迟第 7 分钟完成。"
  },
  {
    "id": "cal-labor-project-reuse",
    "topic": "project",
    "level": "standard",
    "prompt": "小组急需 12 张大小相同的标签，每张 4 厘米×6 厘米。材料柜有许多平整干净的 4 厘米×12 厘米废卡纸。哪种方案能满足需求，又使用最少的废卡纸且无需新纸？",
    "correct": "把 6 张废卡纸各等分成两份",
    "options": [
      "另用一张新卡纸制作所有标签",
      "把 4 张废卡纸各等分成三份",
      "把 6 张废卡纸各等分成两份",
      "把 12 张废卡纸各裁成 4 厘米×6 厘米，剩下部分弃置"
    ],
    "explanation": "沿 12 厘米的一边等分，正好得到两张 4 厘米×6 厘米的标签。6 张可以做 12 张，尺寸和数量都合适。"
  },
  {
    "id": "cal-labor-project-evaluate",
    "topic": "project",
    "level": "challenge",
    "prompt": "两个小组都制作了能装 10 本练习册的纸盒。甲盒用新纸一张，能重复使用 5 次。乙盒用旧纸，测试只能使用 2 次。学校需要同一个盒子连续使用 4 次，又希望减少用新纸。用什么办法最能判断乙盒是否值得推广？",
    "correct": "用旧纸加固乙盒，再按每次装 10 本连续开合、搬运 4 次，记录是否完好",
    "options": [
      "把乙盒改成全套新纸，再检查它能否重复使用 4 次",
      "用旧纸加固乙盒，再按每次装 10 本连续开合、搬运 4 次，记录是否完好",
      "用旧纸加固乙盒，一次装 40 本，检查盒底是否牢固",
      "把甲盒和乙盒的外观照片给同学选，票数较高的用作最终方案"
    ],
    "explanation": "目标同时涉及重复次数、每次承重和材料。继续用旧纸改进，再用同样的 10 本逐次测试 4 次，才能检验实际用途和节省新纸的目标。"
  }
];

const calibratedTopics = new Map(subjects.flatMap(subject =>
  subject.topics.map(topic => [topic.key, {subject:subject.id, topic}])
));
for (const question of calibratedQuestions) {
  const target = calibratedTopics.get(question.topic);
  target.topic.questions.push({...question, subject:target.subject});
}
