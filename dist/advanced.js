const advancedSubjects = [
  {
    "id": "math",
    "sources": [
      {
        "title": "南京玄武区2025—2026学年上学期七年级数学期中试卷公开预览",
        "url": "https://www.jiangsu100.com/53444.html",
        "note": "公开题干可见折扣情境中的列式、移动图形的周长关系，以及绝对值与数轴的运用。",
        "term": "上"
      },
      {
        "title": "淮安区2025—2026学年上学期七年级数学期中统测公开预览",
        "url": "https://www.jiangsu100.com/53412.html",
        "note": "公开题干可见有理数的温差应用、图示关系推理和代数运算。部分排版公式缺失，仅按可读题干核对。",
        "term": "上"
      },
      {
        "title": "苏州市教育科学研究院公开的苏州市区七年级数学上学期期末试卷",
        "url": "https://szteacher.suzhou.edu.cn/News.aspx?ID=99774&NTID=291",
        "note": "官方可读的往年试卷呈现行程方程、分段线段、角平分线与动态旋转综合题，作为综合题形式的补充参考。",
        "term": "上"
      },
      {
        "title": "淮安区2025—2026学年下学期七年级数学期末试卷公开预览",
        "url": "https://www.renrendoc.com/paper/535577462.html",
        "note": "可读预览呈现整式乘法、平行线证明、实际情境中的方程组与整数方案，以及新定义和面积结合的多问问题。",
        "term": "下"
      }
    ],
    "questions": [
      {
        "id": "hard-math-water-observations",
        "topic": "rational",
        "material": "湿地观测站以警戒线为 0 厘米。08:00 水位为 −1.6 厘米。随后每半小时记录一次，相对于上一次记录的变化依次为 −2.4、＋3.6、−1.8、＋4.2 厘米。正号表示上升，负号表示下降。",
        "prompt": "只根据这 5 次记录（含 08:00），填出最低记录水位、10:00 的记录水位，以及最高和最低记录水位的差。各栏只填数字。",
        "options": null,
        "correct": "最低 −4 厘米，10:00 为 2 厘米，最高和最低相差 6 厘米",
        "steps": [
          {
            "label": "最低记录水位（只填数字）",
            "answer": "-4",
            "unit": "厘米"
          },
          {
            "label": "10:00 的记录水位（只填数字）",
            "answer": "2",
            "unit": "厘米"
          },
          {
            "label": "最高与最低记录水位的差（只填数字）",
            "answer": "6",
            "unit": "厘米"
          }
        ],
        "explanation": "要把变化量逐次加到上一次水位，不能把变化量直接当作水位。5 次记录依次为 −1.6、−4、−0.4、−2.2、2。最低为 −4，最后一条同时是最高记录 2，最高与最低的差为 2−(−4)＝6 厘米。"
      },
      {
        "id": "hard-math-copy-shop-tiers",
        "topic": "equation",
        "material": "读书节讲义至少印 20 份。甲店前 20 份一共收 30 元，超过的部分每份 0.8 元。乙店每份 1 元，按此计算的总价超过 45 元时，整单减 8 元。",
        "prompt": "印多少份讲义时，两店实付金额相同？只填数字。",
        "options": null,
        "correct": "110",
        "explanation": "设印 x 份，x 是不小于 20 的整数。甲店实付 30＋0.8(x−20)＝14＋0.8x。若 20≤x≤45，乙店收 x 元，等式 14＋0.8x＝x 得 x＝70，超出该范围，舍去。若 x＞45，乙店实付 x−8 元，等式 14＋0.8x＝x−8 得 x＝110，符合条件。代回两店均实付 102 元。"
      },
      {
        "id": "hard-math-staggered-mural",
        "topic": "algebra",
        "material": "用边长为 1 的小正方形拼图案，每排有 n 块，n 为至少 2 的整数。上排占第 1 到第 n 列，下排紧贴上排并向右错开一格，占第 2 到第 n＋1 列。彩带只沿拼成图案的外边缘铺一圈。",
        "prompt": "下面哪项判断正确？",
        "options": [
          "外边缘长可以为 49，因为 49÷2 得 24.5，可以四舍五入为 25 块",
          "外边缘长为 50 时一共需要 40 块，因为两排之间有 2n 条公共边",
          "外边缘长不可能为 49，长为 50 时一共需要 44 块",
          "外边缘始终只有两排各自的两条外侧长边，长度为 2n"
        ],
        "correct": "外边缘长不可能为 49，长为 50 时一共需要 44 块",
        "explanation": "2n 个小正方形的周长相加为 8n。每排内部各有 n−1 条公共边，两排之间也有 n−1 条公共边，共 3(n−1) 条。每条公共边已在周长总和中算了两次，要减掉 2×3(n−1)。外边缘长为 2n＋6，必为偶数，所以不能是 49。若为 50，则 n＝22，需要 44 块。"
      },
      {
        "id": "hard-math-moving-bisectors",
        "topic": "geometry",
        "material": "OA 与 OB 是方向相反的两条射线。射线 OC 在直线 AB 上方，最初 ∠AOC＝42°。OC 在直线 AB 上方朝 OB 方向转动，OD 和 OE 始终分别平分 ∠AOC 与 ∠COB。",
        "prompt": "当转到 ∠DOC 比 ∠COE 的 2 倍少 12° 时，分别填出此时的 ∠AOC、OC 转过的角度和 ∠DOE。各栏只填数字。",
        "options": null,
        "correct": "∠AOC＝112°，OC 转过 70°，∠DOE＝90°",
        "steps": [
          {
            "label": "转动后 ∠AOC 的度数（只填数字）",
            "answer": "112",
            "unit": "°"
          },
          {
            "label": "OC 转过的度数（只填数字）",
            "answer": "70",
            "unit": "°"
          },
          {
            "label": "∠DOE 的度数（只填数字）",
            "answer": "90",
            "unit": "°"
          }
        ],
        "explanation": "设此时 ∠AOC＝x°，则 ∠COB＝(180−x)°。角平分线给出 ∠DOC＝x/2°、∠COE＝(180−x)/2°。按题意 x/2＝2×(180−x)/2−12，解得 x＝112。OC 向 OB 转动使 ∠AOC 增大，因此转过 112°−42°＝70°。两半角之和 ∠DOE＝(112°＋68°)÷2＝90°。"
      },
      {
        "id": "hard-math-bridge-angles",
        "topic": "parallel",
        "material": "三角形 ABC 是木桥支架的模型。点 M 在边 AB 的内部，点 N 在边 AC 的内部，横档 MN 与底边 BC 平行。在 M 点测得射线 MB 与横档 MN 的夹角 ∠BMN＝112°。另知 ∠ACB 比 ∠BAC 大 16°。",
        "prompt": "∠BAC 与 ∠ACB 各是多少？",
        "options": [
          "∠BAC＝56°，∠ACB＝56°",
          "∠BAC＝26°，∠ACB＝42°",
          "∠BAC＝64°，∠ACB＝48°",
          "∠BAC＝48°，∠ACB＝64°"
        ],
        "correct": "∠BAC＝48°，∠ACB＝64°",
        "explanation": "MA 与 MB 是反向射线，所以 ∠AMN＝180°−112°＝68°。MN∥BC，得同位角 ∠ABC＝∠AMN＝68°。设 ∠BAC 的度数为 x，内角和给出 x＋68＋(x＋16)＝180，解得 x＝48，所以 ∠ACB＝64°。"
      },
      {
        "id": "hard-math-loop-speeds",
        "topic": "systems",
        "material": "学校环形步道一圈长 360 米。小苏和小宁总是各自匀速前进，小苏速度较快。两人从同一地点同时反向出发，2 分钟后第一次相遇。若从同一地点同时同向出发，小苏 6 分钟后第一次追上小宁。",
        "prompt": "先填两人的速度。再设小宁先从同一地点出发 90 秒，小苏随后从该点沿同一方向出发，填小苏出发后第一次追上小宁所需的时间。各栏只填数字。",
        "options": null,
        "correct": "小苏 120 米/分钟，小宁 60 米/分钟，1.5 分钟后追上",
        "steps": [
          {
            "label": "小苏每分钟行走的米数（只填数字）",
            "answer": "120",
            "unit": "米/分钟"
          },
          {
            "label": "小宁每分钟行走的米数（只填数字）",
            "answer": "60",
            "unit": "米/分钟"
          },
          {
            "label": "小苏出发后追上的时间（只填数字）",
            "answer": "1.5",
            "unit": "分钟"
          }
        ],
        "explanation": "设两人在相同时间单位下的速度为 x、y。反向第一次相遇时两人路程和为一圈，2(x＋y)＝360。同向第一次追上时快者比慢者多走一圈，6(x−y)＝360。解得 x＝120，y＝60。小宁先走 90 秒即 1.5 分钟，领先 90 米。此时距离小于一圈，小苏按每分钟缩短 120−60＝60 米追赶，第一次追上用 90÷60＝1.5 分钟。"
      },
      {
        "id": "hard-math-build-area-expression",
        "topic": "powers",
        "material": "手工社用两种长度 a、b（单位为厘米）做模型。两个正方形的边长分别为 a、b，面积之和为 74 平方厘米。另有一块两条邻边长为 a 和 b 的长方形板，面积为 35 平方厘米。",
        "prompt": "若做一块两条邻边长分别为 (a＋2b) 厘米、(2a＋b) 厘米的长方形展板，面积是多少？",
        "options": [
          "253 平方厘米",
          "288 平方厘米",
          "323 平方厘米",
          "358 平方厘米"
        ],
        "correct": "323 平方厘米",
        "explanation": "由题意 a²＋b²＝74，ab＝35。把新展板长宽相乘得 (a＋2b)(2a＋b)＝2a²＋ab＋4ab＋2b²＝2(a²＋b²)＋5ab。无需分别求 a、b，直接代入得 2×74＋5×35＝323 平方厘米。"
      },
      {
        "id": "hard-math-merged-survey",
        "topic": "probability",
        "material": "两班各自统计每名学生每天课外阅读时长，按同样标准分为 t＜20、20≤t＜40、t≥40 三组（单位为分钟）。七一班一共 40 人，第二组频率为 30%。七二班第二组有 27 人，频率为 45%。合并数据后发现，七二班有 1 人的 t 为 20，原来被误记在第一组。所给频率均为准确值。",
        "prompt": "填误记纠正前七二班的统计人数，以及两班合并后第二组的频率在更正前、后的百分数。各栏只填数字，百分数栏如 30% 只填 30。",
        "options": null,
        "correct": "七二班 60 人，更正前 39%，更正后 40%",
        "steps": [
          {
            "label": "七二班的统计人数（只填数字）",
            "answer": "60",
            "unit": "人"
          },
          {
            "label": "两班合并后，更正前第二组频率（填写百分数的数字部分）",
            "answer": "39",
            "unit": "%"
          },
          {
            "label": "两班合并后，更正后第二组频率（填写百分数的数字部分）",
            "answer": "40",
            "unit": "%"
          }
        ],
        "explanation": "七二班有 27÷0.45＝60 人，七一班第二组有 40×0.30＝12 人。两班样本大小不同，要先合并频数与人数，原频率为 (12＋27)÷(40＋60)＝39%。20 分钟属于 20≤t＜40，纠正后第二组加 1 人，总人数不变，频率变为 40÷100＝40%。"
      }
    ],
    "focus": "在条件变化时重新列式，分步写出中间量和最终结果。"
  },
  {
    "id": "chinese",
    "sources": [
      {
        "title": "苏州市 2025—2026 学年七年级上学期期末语文试题（公开转载）",
        "url": "https://zy.21cnjy.com/25189718",
        "note": "现代文部分把本地新闻数据和说明材料放进同一组阅读题。卷首名句默写也考查结合学习与生活情境回忆原文。",
        "term": "上"
      },
      {
        "title": "南通市海安市 2025—2026 学年七年级下学期期末语文试题（公开转载）",
        "url": "https://zy.21cnjy.com/26400046",
        "note": "同篇现代文连考情节梳理、重读词语、开篇作用与结合全文解释标题，并要求将文本与链接材料对照。",
        "term": "下"
      },
      {
        "title": "二一教育 · 七年级上册必背古诗文",
        "url": "https://zy.21cnjy.com/23136851",
        "note": "核对李商隐《夜雨寄北》开篇两句及虚实相承的篇章顺序。",
        "term": "上"
      }
    ],
    "questions": [
      {
        "id": "hard-zh-shadow-evidence",
        "topic": "reading",
        "prompt": "校刊想报道“阴凉与长椅使用情况”。哪一句既综合了两份记录，又没有超出证据？",
        "material": "【记录甲】七（2）班在同一个晴天的 12:20 和 15:10 两次检查校园入口。12:20 时，入口旁的长椅完全在阳光下，有两人坐在那里。15:10 时，香樟树影盖住长椅约一半，有五人坐在那里。\n【记录乙】值日生补记，12:20 多数同学仍在吃饭。15:10 有两个社团约在入口碰面，有人在长椅旁站着等同伴。",
        "options": [
          "长椅被树影遮住后更适合休息，遮阴使使用人数从 2 人增至 5 人。",
          "午后长椅的一部分在树影下，坐着的人也更多，但不同观察时间的活动安排可能同样影响人数。",
          "社团约在入口碰面，说明后来多出的 3 个座位使用者全是社团成员。",
          "两次记录显示午后在入口等候的人更多，因此阴凉环境会吸引更多人到校园入口。"
        ],
        "correct": "午后长椅的一部分在树影下，坐着的人也更多，但不同观察时间的活动安排可能同样影响人数。",
        "explanation": "甲只能说明遮阴范围和坐着的人数同时发生变化。乙提示午餐、社团集合也可能影响人数，两次记录还无法区分各个因素的作用。材料也没有记录坐在长椅上的同学身份，或入口等候者的两次总人数。"
      },
      {
        "id": "hard-zh-notebook-revision",
        "topic": "wholebook",
        "prompt": "下面哪一条批注最适合小组讨论“主人公对自己记忆的看法如何变化”？",
        "material": "读书小组读完原创小说《找回曲谱》。第三章里，晓宁为抢先找到乐谱，独自凭记忆抄下两句，后来才发现把开头和结尾对调了。第九章里，她仍坚持自己的记忆可信，却请同伴各唱一遍，并以大家都记得的停顿为标记，比对两份手抄稿。她最后恢复了乐谱原来的顺序。第九章后一页还写道，她请大家把另外一段有争议的旋律先登记下来，等找到原抄本再定。",
        "options": [
          "第三章抄错，第九章抄对，说明她终于把每段旋律都记熟了。",
          "她先依赖自己的记忆，后来则以多数人意见为准，任何争议都立即选一个答案。",
          "她把记忆由直接认定的答案改作待核实的线索，能用对照确认一部分，对证据不足的部分先保留疑问。",
          "她从拒绝分享乐谱转为乐于分享，说明找到原抄本之后同伴关系得到了修复。"
        ],
        "correct": "她把记忆由直接认定的答案改作待核实的线索，能用对照确认一部分，对证据不足的部分先保留疑问。",
        "explanation": "第三章的失误来自只凭记忆，第九章的改变体现在拿唱出的节奏和手抄稿相互核对。下一页还写她对无法确认的另一段暂不定论。三处都要读到，才能发现她改变的是确认记忆的方法。"
      },
      {
        "id": "hard-zh-night-rain-present",
        "topic": "dictation-upper",
        "prompt": "李商隐《夜雨寄北》两次写到“巴山夜雨”。一次写相聚之后回谈今夜，一次写诗人眼前所见。默写实写的两句，先写诗人回应对方询问，再写雨夜所见。\n①______，②______。",
        "options": null,
        "blanks": [
          "君问归期未有期",
          "巴山夜雨涨秋池"
        ],
        "correct": "君问归期未有期，巴山夜雨涨秋池",
        "explanation": "出自李商隐《夜雨寄北》。前两句写眼下的实情，归期没有确定，巴山夜雨让秋池涨水。后两句才转入未来重聚的想象。注意“未有期”中的“未”和水涨的“涨”。"
      },
      {
        "id": "hard-zh-ruler-motif",
        "topic": "writing",
        "prompt": "如果删去结尾摸刻痕的动作，对文章表达影响最明显的是什么？",
        "material": "爷爷留下的木尺在十厘米处有道深刻痕。做模型时，我总用指头避开它，怕这道旧伤让我看错刻度。小南量纸板总有几毫米误差。我把木尺递给她，她从尺端量起，发现尺端已经磨圆了。后来我们从十厘米的刻痕开始量，最后把读数减去十。展示结束后，我把木尺收到盒里，指头顺着那道刻痕轻轻摸了一遍。",
        "options": [
          "开篇刻痕的位置将交代不清，读者也就无法还原测量过程。",
          "读者仍能知道改进过的量法，但缺少一个与开头“避开”形成照应、表现态度变化的细节。",
          "模型的展示结果将变得不明，文章也就无法说明他们有没有参加展示。",
          "会破坏叙事的顺序，因为读者不再知道木尺磨圆是在展示前还是展示后。"
        ],
        "correct": "读者仍能知道改进过的量法，但缺少一个与开头“避开”形成照应、表现态度变化的细节。",
        "explanation": "测试量法的经过在前面已经写清。开头的“避开”表明我担心刻痕碍事，结尾的“摸”发生在刻痕发挥作用后。前后同一处细节的动作变化，让读者看到我对旧木尺的看法发生变化。"
      },
      {
        "id": "hard-zh-map-guide",
        "topic": "summary",
        "prompt": "以下哪份群通知可以直接发给飞鸟组成员？",
        "material": "读书节请各组提交实地导览安排。规则一，老图书馆展厅限 10 人一组。规则二，图书馆后门 14:40 开放，入场后先到一楼领目录。规则三，持校园卡可从正门提前看一楼，提前到的人仍须在 14:40 到后门集合，与所属小组一起参观二楼。七（3）班的飞鸟组有 12 人，其中 7 人有校园卡。",
        "options": [
          "全组 14:40 在后门集合。持卡者可先从正门看一楼，之后直接在二楼等待其余同学。",
          "持卡者从正门先到一楼，另外 5 人到后门集合。持卡人员不占展厅 10 人限额。",
          "全组分为两个不超过 10 人的小组。持卡者想提前看一楼可走正门，14:40 仍要和同组成员在后门集合，入场先领目录。",
          "全组 14:40 到后门集合。先到的人可以在正门领目录，之后全组一起参观二楼。"
        ],
        "correct": "全组分为两个不超过 10 人的小组。持卡者想提前看一楼可走正门，14:40 仍要和同组成员在后门集合，入场先领目录。",
        "explanation": "先判人数，12 人超过每组上限，需拆成两个合规小组。再看持卡只影响能否从正门提前参观，不替代后门集合或一楼领目录。选项逐一落实了三条规则，其他选项至少漏掉一个限制。"
      },
      {
        "id": "hard-zh-heights-perspective",
        "topic": "poetry",
        "prompt": "两处都联系高处和视野，哪一项说清了它们在写法和情感上的差别？",
        "material": "【甲】杜甫《望岳》：会当凌绝顶，一览众山小。\n【乙】王安石《登飞来峰》：不畏浮云遮望眼，自缘身在最高层。\n注：“会当”有终当、定要的意思。",
        "options": [
          "甲由未来登顶的想象表达凌云志向；乙借身在高处能够看得远，说明自己不惧眼前的遮蔽。",
          "甲乙都是已到峰顶后的实景记录，甲着重写众山更低，乙着重写山上云多。",
          "甲用浮云象征登山阻碍，乙则想象将来登到更高处以超越众山。",
          "甲借高度说明只需站得高便无所畏惧，乙着眼于超越眼前所有山峰的目标。"
        ],
        "correct": "甲由未来登顶的想象表达凌云志向；乙借身在高处能够看得远，说明自己不惧眼前的遮蔽。",
        "explanation": "先抓时间和位置。“会当”写将来一定要登顶，接着想象登顶俯瞰的画面；“身在”写已在高层，“自缘”交代“不畏”的缘由。甲重在进取志向，乙重在凭借较高的立足点看穿眼前遮蔽。"
      }
    ],
    "focus": "结合语境默写，比较材料和原文证据，辨析词句及段落作用。"
  },
  {
    "id": "english",
    "sources": [
      {
        "title": "徐州市邳州市 2026—2027 学年七年级上学期期中英语试题（公开转载）",
        "url": "https://zy.21cnjy.com/27134296",
        "note": "阅读 A 篇以分栏活动海报考日期、地点和物品对应关系，B 篇以一个故事结合人物行为与推断。同类原创题增加信息更新与多条件核对。",
        "term": "上"
      },
      {
        "title": "南京市建邺区新城中学 2025—2026 学年七年级下学期期末英语试卷（公开转载）",
        "url": "https://zy.21cnjy.com/26044544",
        "note": "阅读 C 篇围绕同一故事依次考细节、语境词义、情节排序、动机推断。语法区也从对话场景选合适表达。",
        "term": "下"
      }
    ],
    "questions": [
      {
        "id": "hard-en-postcard-room",
        "topic": "daily",
        "prompt": "Which plan lets Nina follow the update and stay for the whole workshop?",
        "material": "NOTICE: Make a Postcard, Thursday 3:40–4:15. Pick up your card at the Art Room before 3:35.\nUPDATE: The Art Room will close at 3:25 today. Pick up your card at the library instead. The last pickup time stays the same. The workshop will still finish at 4:15, but it will start five minutes later.\nNina can get to the library at 3:32 and must leave the workshop by 4:20.",
        "options": [
          "Get the card at 3:32 from the Art Room and go to the workshop at 3:45.",
          "Get the card at 3:36 from the library and go to the workshop at 3:45.",
          "Get the card at 3:32 from the library and go to the workshop from 3:45 to 4:15.",
          "Get the card at 3:32 from the library and go to the workshop from 3:40 to 4:20."
        ],
        "correct": "Get the card at 3:32 from the library and go to the workshop from 3:45 to 4:15.",
        "explanation": "替换取卡地点为图书馆，截止时间仍是 3:35 前。3:32 符合条件。开始时间由 3:40 推迟五分钟到 3:45，结束仍是 4:15，也早于 Nina 的 4:20 离开时间。"
      },
      {
        "id": "hard-en-club-description",
        "topic": "continuous",
        "prompt": "Which line accurately reports the usual place and what is happening at 4:10?",
        "material": "It is Tuesday today. The music club usually practises in the hall on Tuesdays. The hall is in use for a meeting, so today the club is in Room 7. When Ana calls at 4:10, the younger members are carrying chairs into Room 7. The older members are already practising a song there.",
        "options": [
          "The club usually practises in Room 7. At 4:10 the younger members are carrying chairs in the hall.",
          "The club usually practises in the hall. The younger members are carrying chairs, and the older ones are practising in Room 7 now.",
          "The club usually practises in the hall. Everyone is carrying chairs into Room 7 at 4:10.",
          "The club usually practises in the hall, and the older members practise there every time the younger members move chairs."
        ],
        "correct": "The club usually practises in the hall. The younger members are carrying chairs, and the older ones are practising in Room 7 now.",
        "explanation": "把规律与眼下分开。usually 指平时在礼堂排练，用一般现在时；at 4:10 对应今天这一次，两个年龄组都在 Room 7，但一个在搬椅子，一个已经在练歌，用现在进行时。"
      },
      {
        "id": "hard-en-two-lunch-groups",
        "topic": "present",
        "prompt": "Which sentence correctly states the usual jobs and what Dan does today?",
        "material": "Cora and Dan look after the plants. Cora checks the classroom pots every school morning. Dan checks the garden pots on Monday, Wednesday and Friday. When it rains at lunchtime, Dan checks the classroom pots instead of the garden pots. Today is Wednesday and it is dry.",
        "options": [
          "Cora checks the classroom pots on school mornings, and Dan checks the garden pots today.",
          "Cora checks the classroom pots on school mornings, and Dan checks those pots too every Wednesday.",
          "Cora check the classroom pots on school mornings, and Dan checks the garden pots today.",
          "Dan checks the garden pots only when it rains, so Cora checks both sets today."
        ],
        "correct": "Cora checks the classroom pots on school mornings, and Dan checks the garden pots today.",
        "explanation": "先读清三个条件。Cora 每个上课日早晨检查教室花盆，Dan 周三通常检查花园里的花盆，只有午饭时下雨才改去教室。今天晴干，例外不触发。两个人名均为第三人称单数，一般现在时中都用 checks。"
      },
      {
        "id": "hard-en-cold-hall",
        "topic": "passage",
        "prompt": "What does the last sentence most strongly suggest about the changes?",
        "material": "The class reading club began using the school hall in winter. At first, Sam thought members would leave early because the hall was cold. He brought extra coats, but the coats stayed on the table. After two meetings, he noticed that students near the back kept asking, “What page?” The teacher moved the chairs into a smaller circle and wrote the current page number on a small board where everyone could see it. No one asked the page question at the next meeting, though the room was just as cold.",
        "options": [
          "The coats made the hall warmer, so members could read more easily.",
          "Students near the back stopped coming, so no one needed to ask the question.",
          "The teacher changed the book and therefore the reading was easier to understand.",
          "Where people sat and what they could see mattered more to the repeated question than the cold did."
        ],
        "correct": "Where people sat and what they could see mattered more to the repeated question than the cold did.",
        "explanation": "Sam 的初步解释是冷，但加衣并未被使用；后排一直问页码。老师调整座位和展示后，室温没变而问题消失。空间与信息呈现的改变能解释这个对比。材料没有说后排同学缺席或换了书。"
      },
      {
        "id": "hard-en-after-school-report",
        "topic": "past",
        "prompt": "Which sentence correctly reports what was and was not done by lunchtime on Friday?",
        "material": "On Thursday, a team planned to put name cards on its picture display. On Friday at 9:00, the students finished putting up the pictures. By lunchtime the cards were still in a bag because the maker had written the room number on them by mistake. At 2:00, Su changed the cards. Before they went home, the team fixed the new cards below the pictures.",
        "options": [
          "They didn’t put up the pictures by lunchtime, but they fixed the new cards below them.",
          "They put up the pictures by lunchtime, but they didn’t attach the cards until later.",
          "They put up the pictures and fixed the cards below them by lunchtime.",
          "They put up the pictures by lunchtime, but they didn’t attached the cards until later."
        ],
        "correct": "They put up the pictures by lunchtime, but they didn’t attach the cards until later.",
        "explanation": "9:00 已经早于午饭，挂图完成。午饭时卡片仍在包里，下午才更改并贴上，因此到午饭时尚未贴卡片。过去时肯定句 put 的形式不变，否定用 didn’t，后接原形 attach。"
      },
      {
        "id": "hard-en-plan-if-rain",
        "topic": "future",
        "prompt": "Which message keeps the rain plan conditional and gives the right time?",
        "material": "Mia’s group has already made a plan for Sunday. They will practise their dance in the courtyard if it is dry. The weather report says it will probably rain before noon. If it rains, the teacher will unlock Room 6 at 9:20. The group will begin ten minutes after the room opens. Mia wants to text an absent group member.",
        "options": [
          "If it rains on Sunday, we will practise in Room 6 at 9:30.",
          "If it rains on Sunday, we will practise in Room 6 at 9:20.",
          "Since it is raining now, we are practising in Room 6 at 9:30.",
          "We will practise in the courtyard at 9:30 after the teacher unlocks Room 6."
        ],
        "correct": "If it rains on Sunday, we will practise in Room 6 at 9:30.",
        "explanation": "天气预报说可能下雨，并未确定，因此保留 if 条件。换到 Room 6 时，9:20 是开门时间，开始要再等十分钟，即 9:30。if 从句用 rains，主句用 will practise 表示条件成立时的将来安排。"
      }
    ],
    "focus": "对照通知或语篇，筛选有效条件，结合证据推断作者意图。"
  },
  {
    "id": "history",
    "sources": [
      {
        "title": "苏州市吴中区2025—2026学年七年级上学期期末历史试题（公开转载）",
        "url": "https://zujuan.zxls.com/PaperList.aspx?id=30554",
        "note": "公开可读第16题将陪葬器物与文献对照，第25—26题要求用不同材料判断制度与历史现象。",
        "term": "上"
      },
      {
        "title": "南通市通州区2025—2026学年七年级期末历史试卷（公开转载）",
        "url": "https://zujuan.zxls.com/PaperList.aspx?id=30052",
        "note": "公开第2题从历代入仕数据推断制度影响，第5题合读港口与货物线索，第26—27题综合多个朝代材料概括历史变化。",
        "term": "下"
      }
    ],
    "questions": [
      {
        "id": "hard-hist-rice-evidence",
        "topic": "early",
        "material": "模拟考古记录\n甲遗址：灰坑中混有贝壳、兽骨和少量炭化稻粒，暂未发现稻田遗迹。\n乙遗址：同一文化层内发现连片田埂、带稻茬的古田面和集中存放的炭化稻粒。\n说明：两地发掘范围不同，全部遗址尚未发掘完。",
        "prompt": "研学小组要比较两个遗址与稻作的关系。哪句话符合现有证据的范围？",
        "options": [
          "甲的食物残留种类较多，因此比乙更能说明当地稻作发达",
          "乙的田埂、稻茬与稻粒可以相互印证，甲的稻粒能说明当地接触过稻谷",
          "两地都有炭化稻粒，足以判断两地同时开始种稻",
          "乙发现的稻粒更集中，因此乙一定比甲更早开始种稻"
        ],
        "correct": "乙的田埂、稻茬与稻粒可以相互印证，甲的稻粒能说明当地接触过稻谷",
        "explanation": "乙的田埂、田面稻茬和稻粒共同支持当地种稻。甲的稻粒证明稻谷出现过，来源可能有多种。两地稻作起始时间需要可靠的年代和更多相应层位证据。"
      },
      {
        "id": "hard-hist-qin-han-governance",
        "topic": "qinhan",
        "material": "展签甲：秦朝统一后在全国推行郡县制，郡县主要官员由中央任免。\n展签乙：西汉初年，中央直接管理部分郡县，同时有刘姓诸侯王管理各自封国。后来汉武帝下令，允许诸侯王把封地再分给子弟。",
        "prompt": "综合两页展签，哪项概括能解释秦与西汉的制度变化？",
        "options": [
          "西汉在地方一律交由同姓诸侯管理，秦朝的郡县制随之结束",
          "秦与西汉都有郡县，但西汉初还存在封国，后来以分割封地削弱诸侯王",
          "西汉封国日益强大，允许分封子弟的措施使各王原有封地更为集中",
          "秦朝与西汉初的地方结构完全相同，变化只发生在郡县官员的产生方式"
        ],
        "correct": "秦与西汉都有郡县，但西汉初还存在封国，后来以分割封地削弱诸侯王",
        "explanation": "秦朝与西汉都有郡县，西汉初出现郡县与封国并存。允许原封地切分给子弟，使封国逐步分小、原来诸侯王直接控制的范围缩减，体现对地方管理的调整。"
      },
      {
        "id": "hard-hist-layer-dating",
        "topic": "chronology",
        "material": "课堂模拟发掘中，甲层在下，乙层在上，地层顺序清楚，未受后期扰动。甲层一枚公文木简的年代为公元前221年，乙层一枚木简的年代为公元前190年。两层还各发现一些无纪年陶片。",
        "prompt": "怎样说明这组年代和地层证据的关系最严谨？",
        "options": [
          "公元前190年早于公元前221年，所以木简纪年与地层顺序矛盾",
          "两枚木简相隔31年，所以甲、乙层所有陶片也恰好相隔31年",
          "下层木简比上层早31年，与地层顺序一致，陶片制作年代还需另外判断",
          "下层木简的纪年早，所以所有甲层遗物都制作于公元前221年以前"
        ],
        "correct": "下层木简比上层早31年，与地层顺序一致，陶片制作年代还需另外判断",
        "explanation": "同为公元前，数字越大，年份越早；221－190＝31，两枚木简的年代与下层一般较早的顺序一致。木简可帮助判断地层年代，但其他器物的制作、使用和埋入时间可能各不相同。"
      },
      {
        "id": "hard-hist-harbor-triangulation",
        "topic": "tangsong",
        "material": "材料甲：在模拟发掘的唐代扬州港区，清理出外地窑口烧造的陶瓷和带有外来文字的货签。\n材料乙：宋代官方设置市舶司，办理部分港口海上贸易的管理事务。\n待修订展签：两件材料证明宋代扬州港的贸易规模大于唐代。",
        "prompt": "哪种改写既使用两件材料，又避免把证据往前推得过远？",
        "options": [
          "唐代扬州存在商品往来，宋代官方管理部分港口海贸，比较同一港口规模还应补充两代同口径资料",
          "唐宋两代都出现涉外贸易证据，因此可判定宋代扬州沿用了唐代交易制度",
          "唐代有陶瓷实物，说明当时货物数量一定多于宋代，宋代只有管理制度文字",
          "宋有市舶司即说明宋代扬州官方海贸规模大于唐代，无须比较货量"
        ],
        "correct": "唐代扬州存在商品往来，宋代官方管理部分港口海贸，比较同一港口规模还应补充两代同口径资料",
        "explanation": "甲提供扬州商品流通的线索，乙体现宋代一些港口的海贸管理。两者的地区、时代和指标都不同。比较扬州贸易规模需要同一港口、两个时段可比较的货运量等记录。"
      },
      {
        "id": "hard-hist-border-context",
        "topic": "mingqing",
        "material": "甲：1571年，明朝与蒙古俺答汗达成通贡和互市协议，双方恢复经贸往来。\n乙：1762年，清朝设伊犁将军，管理新疆地区军政事务。\n学生打算都收录在“明清时期边疆治理”主题中。",
        "prompt": "哪项小结最能同时概括共同面向与手段差异？",
        "options": [
          "两件措施都与边疆秩序有关，甲用通贡互市改善关系，乙通过设置官职管理地方",
          "两件措施都依赖增设地方官员，甲设主管贸易的将军，乙设主管互市的将军",
          "甲与乙属于同一阶段的连续政策，互市协议直接促成清朝设置伊犁将军",
          "甲主要体现海上对外交流，乙主要体现中原各省间的商业交往"
        ],
        "correct": "两件措施都与边疆秩序有关，甲用通贡互市改善关系，乙通过设置官职管理地方",
        "explanation": "甲的关键信息是达成协议并恢复贸易，乙的关键信息是设官并管理军政。它们是不同朝代、不同背景下维护边疆秩序的举措，两则材料没有支持直接因果关系。"
      },
      {
        "id": "hard-hist-printing-costs",
        "topic": "exchange",
        "material": "课堂估算（单位：工时）\n雕版：同一页首次刻版12，每印30份需要1。保存整版可用于下次印同页。\n活字：同一页首次排版6，每印30份需要2。字模可拆下编排其他页。\n需印一页内容180份，短期内不重印这页。",
        "prompt": "哪项选择同时算对工时，并恰当说明该比较能支持什么？",
        "options": [
          "两种方法都需18工时，本次工时相同，不能据此判断所有任务都一样",
          "雕版需18工时、活字需12工时，所以活字在任何印量下都更省工",
          "两种方法都需18工时，因此可以认定书籍开印以后两种办法的成本始终相同",
          "雕版需12工时、活字需6工时，这张表只须比较首次准备工时"
        ],
        "correct": "两种方法都需18工时，本次工时相同，不能据此判断所有任务都一样",
        "explanation": "180÷30＝6，雕版总工时为12＋6＝18，活字为6＋12＝18。这是课堂示例，换印量、重印同一页或改印其他页都会改变比较条件。"
      }
    ],
    "focus": "比较不同时期的史料，核对举证范围，从材料得出有依据的解释。"
  },
  {
    "id": "geography",
    "sources": [
      {
        "title": "苏州市2025—2026学年七年级上学期期中地理试题（公开转载）",
        "url": "https://www.jiangsu100.com/54475.html",
        "note": "公开第5—7题共用制作地球仪情境，第8—9题用同一经纬网读取位置并比较纬线长度。",
        "term": "上"
      },
      {
        "title": "南通市通州区2025—2026学年七年级下学期期末地理试卷（公开转载）",
        "url": "https://zy.21cnjy.com/26035844",
        "note": "公开第9—10题结合等高线和降雪分布，第11—13题综合气候统计、季节变化及农事材料。",
        "term": "下"
      }
    ],
    "questions": [
      {
        "id": "hard-geo-two-map-routes",
        "topic": "earth",
        "material": "两张平面图等大，使用数字比例尺。\n甲图比例尺 1∶20 000，沿堤路线量得4.1厘米。\n乙图比例尺 1∶50 000，林间路线量得1.6厘米。\n甲图涵盖两条路线的交会处，乙图也涵盖交会处。",
        "prompt": "无锡地理社要选实际较短的路线，同时另选一张通常能把交会处细节画得更清楚的图。两项怎样选？",
        "options": [
          "走沿堤路线，用甲图看交会处",
          "走林间路线，用乙图看交会处",
          "走沿堤路线，用乙图看交会处",
          "走林间路线，用甲图看交会处"
        ],
        "correct": "走林间路线，用甲图看交会处",
        "explanation": "沿堤长4.1×20 000＝82 000厘米＝820米，林间长1.6×50 000＝80 000厘米＝800米。甲的比例尺较大，同一处在纸上画得更大，通常能呈现较多细节。"
      },
      {
        "id": "hard-geo-coastal-comparison",
        "topic": "climate",
        "material": "甲、乙、丙三个模拟站纬度相近，记录来自同一组30年资料。\n站点｜距海｜海拔｜1月均温｜7月均温\n甲｜近｜20米｜3℃｜25℃\n乙｜远｜20米｜0℃｜28℃\n丙｜远｜900米｜－4℃｜23℃",
        "prompt": "为说明距海远近与冬夏温差的关系，哪组比较及结论最合理？",
        "options": [
          "用乙、丙两站，乙冬夏温差较大，说明距海较远会增大温差",
          "用甲、丙两站，丙7月较冷，说明距海较远会使夏季较凉",
          "用甲、乙两站，乙的冬夏温差较大，可作为海陆位置影响气温的线索",
          "用甲、乙两站，甲1月较暖，所以甲的冬夏温差更大"
        ],
        "correct": "用甲、乙两站，乙的冬夏温差较大，可作为海陆位置影响气温的线索",
        "explanation": "甲乙纬度与海拔相近，距海不同。代表月温差分别为25－3＝22℃和28－0＝28℃。丙海拔更高，拿它与甲相比同时改变两个条件，难以单独辨析距海因素。"
      },
      {
        "id": "hard-geo-density-after-transfer",
        "topic": "population",
        "material": "甲镇面积150平方千米、人口9万；乙镇面积450平方千米、人口18万。假设甲镇向乙镇迁出3万人，除此之外两镇人口不变，面积也不变。",
        "prompt": "迁居前后的平均人口密度怎样变化？哪项说法同时区分了相对密度与总人口？",
        "options": [
          "乙镇总人口一直较多，人口密度也一直更大",
          "原来甲镇密度大，迁居后乙镇密度大，两镇合计平均密度保持不变",
          "甲镇密度由600降至400，乙镇密度由400升至约467，两镇合计密度随之升高",
          "两镇合计密度保持不变，就意味着两个镇各自密度也不受迁居影响"
        ],
        "correct": "原来甲镇密度大，迁居后乙镇密度大，两镇合计平均密度保持不变",
        "explanation": "原来每平方千米甲600人、乙400人。迁居后甲400人、乙约467人，排序逆转。两个镇合计人口仍是27万，合计面积仍为600平方千米，合计平均密度仍是450人每平方千米。"
      },
      {
        "id": "hard-geo-rice-flow",
        "topic": "asia",
        "material": "某亚洲季风区的模拟河流自西向东流。记录为多年同季均值。\n观测站｜上游甲｜下游乙\n雨季流量｜96｜139\n旱季流量｜12｜20\n流量单位：立方米每秒。农场位于下游，喷灌旺季在旱季，直接引水需至少25立方米每秒。",
        "prompt": "哪项判断兼顾河流空间差异、季节数据与供水条件？",
        "options": [
          "乙站旱季流量大于甲站，因而已达到直接引水条件",
          "上游甲雨季流量大于25，可证明下游旱季满足引水需求",
          "乙站旱季约为雨季的七分之一，低于直接引水要求，需另查储水或补水条件",
          "乙站雨季流量远高于甲站，所以可以断定下游的降雨量全年都比上游更多"
        ],
        "correct": "乙站旱季约为雨季的七分之一，低于直接引水要求，需另查储水或补水条件",
        "explanation": "题目要求对照下游与旱季，乙站用20÷139约为七分之一，20又小于25。下游流量较大还可能与流域汇流有关，单凭两站河水流量不能断定降雨量。"
      },
      {
        "id": "hard-geo-island-season-plan",
        "topic": "world",
        "material": "某南半球温带岛屿的模拟记录。\n候选地点｜距码头｜可通行月份｜冬季主要风险\n东岸峡谷｜6千米｜12、1、2月｜冰冻落石\n西岸台地｜9千米｜1、2、7、8月｜较强海风\n南岸沙洲｜5千米｜7、8月｜潮水漫道\n考察须避开冬季，预定同一地点连续两个月各进行一次，并优先选择满足要求且离码头最近的地点。",
        "prompt": "哪项方案符合这些条件？",
        "options": [
          "东岸峡谷，1月和2月",
          "南岸沙洲，7月和8月",
          "西岸台地，1月和2月",
          "东岸峡谷，2月和3月"
        ],
        "correct": "东岸峡谷，1月和2月",
        "explanation": "南半球1—2月处于夏季、7—8月处于冬季。东岸和西岸都能连续安排1月、2月，东岸6千米比西岸9千米近；南岸只有冬季开放，东岸3月也不在通行名单中。"
      },
      {
        "id": "hard-geo-orchard-window",
        "topic": "climategraph",
        "material": "当地多年平均气候资料。\n月份｜4月｜5月｜6月｜7月｜8月\n均温｜13℃｜16℃｜19℃｜22℃｜21℃\n当月可利用降水｜70毫米｜45毫米｜25毫米｜15毫米｜30毫米\n这批苗木需连续3个月月均温至少16℃；每月需水至少40毫米。若降水不足，由当月灌溉补足，一季灌溉水总额最多45毫米，不跨月结转额外降水。",
        "prompt": "哪组月份适合安排这批苗木的生长季？",
        "options": [
          "4—6月，降水合计140毫米，足够抵销低温",
          "5—7月，需要灌溉水40毫米，且各月气温都合格",
          "6—8月，每月气温合格，需要灌溉水不超过45毫米",
          "5—7月，降水合计85毫米，与总需水量相差35毫米，按月无需再调整"
        ],
        "correct": "5—7月，需要灌溉水40毫米，且各月气温都合格",
        "explanation": "4月只有13℃，先排除。5—7月分别需补0、15、25毫米，合计40毫米；6—8月补水15＋25＋10＝50毫米。5月多出的5毫米不能转到后面月份，不能直接用全部降水冲抵。"
      }
    ],
    "focus": "结合位置、数据和空间关系，完成两步以上的判读与推断。"
  },
  {
    "id": "civics",
    "sources": [
      {
        "title": "苏州市吴中、吴江、相城、高新区2024—2025学年七年级上学期期末道德与法治试题（公开转载）",
        "url": "https://www.jiangsu100.com/22802.html",
        "note": "公开第2题用多方评价考查认识自我，第7题结合课堂情境判断如何看待老师批评。",
        "term": "上"
      },
      {
        "title": "昆山市2024—2025学年七年级下学期期中道德与法治试题（公开转载）",
        "url": "https://zy.21cnjy.com/23245787",
        "note": "公开第4—5题共用成长日记，第6题排序行为发展过程，第15题结合调查数据判断结论。",
        "term": "下"
      }
    ],
    "questions": [
      {
        "id": "hard-civics-context-feedback",
        "topic": "self",
        "material": "昆山某校记录了一次班级辩论。队友说小宁准备的资料很充分；观众反馈称她第二次陈述时没回应对方最关键的证据。小宁重看录像，发现第二次陈述只剩20秒，她担心匆忙引用会弄错，选择复述自己的开场观点。",
        "prompt": "小宁要据此认识自己的表现并制定目标，哪项最合适？",
        "options": [
          "把资料是否充足作为唯一标准，继续增加证据数量",
          "采纳观众反馈，先认定自己不会辩论，再改做幕后资料整理",
          "保留搜集资料的优势，针对时间受限练习用20秒准确回应一条对方证据",
          "根据录像认定问题完全在时间不够，等下一次延长陈述时间再考虑改进"
        ],
        "correct": "保留搜集资料的优势，针对时间受限练习用20秒准确回应一条对方证据",
        "explanation": "队友评价与观众评价对应不同环节，录像帮助定位第二次陈述的具体困难。既保留已有优势，又以可检验的小目标练回应，比用一次表现给自己贴标签更能促进改进。"
      },
      {
        "id": "hard-civics-fair-turns",
        "topic": "relation",
        "material": "小组有8分钟展示时间，约定两人各讲4分钟。彩排时好友小陶讲了6分钟，另一位同学少讲了2分钟。小陶认为自己的材料比较复杂，希望保留6分钟。老师表示只要每位组员都参与，可调整材料和分工。",
        "prompt": "身为组长，哪项能兼顾友谊、组员参与和展示目标？",
        "options": [
          "先告诉老师小陶超时，请老师直接收回小陶的展示资格",
          "沿用彩排分工，展示后用一句口头道歉补偿另一位同学",
          "坚持每人4分钟，但不讨论复杂材料如何压缩，直接要求按时结束",
          "邀请两人一起确认必讲内容，商量如何压缩材料并给双方留下展示机会，再共同计时彩排"
        ],
        "correct": "邀请两人一起确认必讲内容，商量如何压缩材料并给双方留下展示机会，再共同计时彩排",
        "explanation": "老师允许调整分工，时间上限与全员参与仍须满足。让相关同学一起讨论，保留必要内容并重新检验时间，能同时回应好友的实际困难与另一位同学的展示机会。"
      },
      {
        "id": "hard-civics-learning-evidence",
        "topic": "learning",
        "material": "小诚尝试甲、乙两种单词复习办法。甲用15分钟并看词表，当天对9/10；乙用15分钟闭卷回忆，当天对7/10。三天后小诚只测了乙组，闭卷对8/10。两组单词难度是否相当还未核实。",
        "prompt": "家长想知道哪种办法更适合长期记忆，小诚怎么做能提供更可靠的比较？",
        "options": [
          "直接比较当天的9/10和7/10，选当天得分较高的方法",
          "依据乙组三天后仍做对8题，直接认定乙适合所有单词",
          "先把两组难度尽量调得相当，保持同样学习时长，隔相同天数均闭卷测并记录",
          "把两个办法一起使用，只比较这一周花的总时间和最终背词数量"
        ],
        "correct": "先把两组难度尽量调得相当，保持同样学习时长，隔相同天数均闭卷测并记录",
        "explanation": "现有当日测试开卷条件不同，延后测试又仅有一组。要比较长期保持，应尽量控制词语难度、时长和测验方式，让两种方法都接受相同间隔的检验。"
      },
      {
        "id": "hard-civics-infer-intent",
        "topic": "emotion",
        "material": "社团群里，小卓发的修改建议半天没被回应。他觉得大家有意忽视自己，准备退出活动。可以确认的是：当天下午群里没有新消息，活动负责人先前说过晚饭后才能集中查看，其余组员的想法未知。",
        "prompt": "哪一行动最能把情绪调节和根据证据行动联系起来？",
        "options": [
          "先承认自己受到冷落的感受，等约定时间后礼貌确认接收情况，再决定是否调整参与方式",
          "先退群缓解不适，等大家主动追问再把原有建议补发给负责人",
          "用“大家只是忙”代替原先判断，此后不必与小组确认建议是否收到",
          "把群聊静默当成全组表决结果，立即撤回建议，改由个人另做一个方案"
        ],
        "correct": "先承认自己受到冷落的感受，等约定时间后礼貌确认接收情况，再决定是否调整参与方式",
        "explanation": "失落是真实感受，而组员是否有意忽略仍需要核实。利用负责人给出的回复时间，平复情绪后礼貌询问，比把沉默当成拒绝更能帮助合作继续。"
      },
      {
        "id": "hard-civics-minimal-disclosure",
        "topic": "law",
        "material": "徐州某校小莱发现，社团群中有人转发的报名截图露出另一名同学的电话号码。截图可能来自合作机构，也可能由学生误发，班主任暂未看到。群管理员可以撤回相关消息，受影响的同学还不知情。",
        "prompt": "哪种做法能先减少传播，并为核查保留必要线索？",
        "options": [
          "先保存消息时间和发布位置等必要线索，私下通知管理员和老师处理，并提醒受影响同学",
          "把完整截图发班群，请更多同学共同确认号码是谁的",
          "为了保持证据，建议管理员维持公开可见，等确定发布者身份后再处理",
          "请管理员先撤回，然后在班群公开猜测发布者是谁，直到有人承认为止"
        ],
        "correct": "先保存消息时间和发布位置等必要线索，私下通知管理员和老师处理，并提醒受影响同学",
        "explanation": "消息时间、发布位置等可帮助老师和管理员核查，私下沟通并尽快限制传播可保护同学信息。材料未确定谁发布或是否故意，无需通过反复公开号码或猜测身份来查明。"
      },
      {
        "id": "hard-civics-accessible-service",
        "topic": "responsibility",
        "material": "扬州某社区要在周六举办活动，报名24人，其中4人使用轮椅，且现场不得收取额外费用。方案甲：礼堂有40个座位，入口只有楼梯；方案乙：活动室有26个位置，含4个轮椅位，有无障碍入口，已确认可免费借用；方案丙：商业活动室条件相同，但需要另收费。",
        "prompt": "志愿小组还须在发布通知前复核现场和时间。哪项决定及后续行动最符合职责？",
        "options": [
          "采用甲，先保证座位宽裕，提醒轮椅使用者自行解决进出问题",
          "采用乙，确认入口通行和4个轮椅位置可用，并在通知中说明路线",
          "采用丙，让付费更加方便的同学先参加，随后再想办法补交",
          "采用乙，直接按总位置数发布无须复核的通知，遇到困难再临时换场地"
        ],
        "correct": "采用乙，确认入口通行和4个轮椅位置可用，并在通知中说明路线",
        "explanation": "乙同时满足人数、无障碍位置和费用要求。发布前确认入口、轮椅位置与时间并说明路线，可把现有场地条件转化为参与者能实际使用的安排。"
      }
    ],
    "focus": "分析材料里的冲突，从不同做法中选择兼顾目标与约束的方案。"
  },
  {
    "id": "pe",
    "sources": [
      {
        "title": "苏州工业园区教师发展中心｜2025–2026 学年第二学期园区体育公开课展示",
        "url": "https://tdc.sipedu.cn/xwdt/content_981638",
        "note": "公开课记录了七年级田径热身、小组练习，以及专项运动中传接球时机和配合的选择，作为练习流程和协作情境的参考。"
      },
      {
        "title": "苏州工业园区教师发展中心｜园区初中体育有效课堂与风险防范课例",
        "url": "https://tdc.sipedu.cn/xwdt/content_929887",
        "note": "记录七年级传切配合、运球急停急起传球等课例，以及探究、分组练习与课堂风险防范，作为动作观察和场地组织的参考。"
      }
    ],
    "questions": [
      {
        "id": "hard-pe-warmup-ten-minute",
        "topic": "warmup",
        "prompt": "下列时间安排中，哪一项同时符合四条要求？",
        "material": "体育老师为排球垫球课设定四条要求。\n① 准备活动分两段，先全身动态热身 2 分钟，再做垫球专项准备至少 2 分钟。\n② 进入练习区前预留 1 分钟检查器材与站位。\n③ 进入练习区后要完成两个完整回合，每回合 2 分钟，中间休息 1 分钟。\n④ 全过程只有 10 分钟。",
        "options": [
          "专项准备 2 分钟、全身热身 2 分钟、检查 1 分钟、练 2 分钟、休息 1 分钟、练 2 分钟",
          "全身热身 2 分钟、专项准备 3 分钟、检查 1 分钟、练 2 分钟、休息 1 分钟、练 2 分钟",
          "全身热身 2 分钟、专项准备 3 分钟、检查 1 分钟、连续练 4 分钟",
          "全身热身 2 分钟、专项准备 2 分钟、检查 1 分钟、练 2 分钟、休息 1 分钟、练 2 分钟"
        ],
        "correct": "全身热身 2 分钟、专项准备 2 分钟、检查 1 分钟、练 2 分钟、休息 1 分钟、练 2 分钟",
        "explanation": "先检查顺序，再核对时长。符合要求的最短用时是 2＋2＋1＋2＋1＋2＝10 分钟。把专项准备增到 3 分钟会超时，连续练 4 分钟少了两回合之间的休息。"
      },
      {
        "id": "hard-pe-warmup-landing-feedback",
        "topic": "warmup",
        "prompt": "哪项是符合记录和规则的反馈？",
        "material": "老师在同样的软垫上让小林完成两组低幅度跳起落地练习，每组 5 次。记录如下。\n第一组：主动屈髋屈膝 4 次，落地后站稳 3 次，两项同时做到 2 次。\n第二组：主动屈髋屈膝 4 次，落地后站稳 4 次，两项同时做到 3 次。\n达标规则：同一次尝试须同时做到两项。一组至少 4 次达标，才算达到本节目标。",
        "options": [
          "第二组的达标次数由 2 次增到 3 次，仍少 1 次达到本节目标",
          "第二组有两项各做到 4 次，已达成目标",
          "第一组和第二组主动屈髋屈膝都是 4 次，整体达标次数没有变化",
          "两组一共达标 5 次，所以两组都达到了本节目标"
        ],
        "correct": "第二组的达标次数由 2 次增到 3 次，仍少 1 次达到本节目标",
        "explanation": "评价单位是单次落地，必须看两项同时做到的次数。第二组比第一组多 1 次，离每组至少 4 次的要求仍差 1 次。分别统计的两项次数不能相加或互相替代。"
      },
      {
        "id": "hard-pe-warmup-routes",
        "topic": "warmup",
        "prompt": "下面哪项场地调整可以同时满足三个要求？",
        "material": "羽毛球课依次安排持拍热身、短距离步法练习和两人对练。球筐在场地东侧。老师要求每组进入对练区前做完前两项，准备区与对练区的进出路线分开，并留出东侧通道让同学取球。",
        "options": [
          "热身区在西侧，步法区靠东侧球筐，完成后从西北进入，从南侧退出",
          "热身区、步法区均放在西侧，完成后从西北进入对练区，从南侧退出，东侧只作取球通道",
          "热身区放西侧，步法区放在两人对练区中间，完成两项后再开始对练，东侧只取球",
          "热身和步法都在西侧完成，所有小组都从西北进出对练区，东侧只取球"
        ],
        "correct": "热身区、步法区均放在西侧，完成后从西北进入对练区，从南侧退出，东侧只作取球通道",
        "explanation": "先满足两项准备活动都在对练区外完成，再区分进、出路线。把步法练习留在西侧，可以让东侧取球通道保持畅通。"
      },
      {
        "id": "hard-pe-fitness-pace",
        "topic": "fitness",
        "prompt": "谁的记录同时达到两条目标？",
        "material": "小组记录同学同一段匀速跑练习的 4 圈用时。老师给出两条本次目标：每圈用时都在 58～64 秒内，且最快和最慢一圈相差不超过 4 秒。\n甲：58、61、64、61 秒。乙：60、63、64、62 秒。\n丙：62、64、65、63 秒。丁：57、58、59、60 秒。",
        "options": [
          "丙",
          "丁",
          "乙",
          "甲"
        ],
        "correct": "乙",
        "explanation": "先逐圈检查上下限，排除出现 65 秒的丙和 57 秒的丁。甲的极差是 64−58＝6 秒，乙的极差是 64−60＝4 秒。乙满足两个条件。"
      },
      {
        "id": "hard-pe-fitness-pass",
        "topic": "fitness",
        "prompt": "下面哪种接球顺序符合练习要求？",
        "material": "排球对练中，四位同学甲、乙、丙、丁站在不同位置。一次小组练习从甲持球开始，须让其他三人各接球一次，最后把球传回甲。此回合只有以下传球路线畅通，方向不可倒转。\n甲能传给乙或丙。乙能传给丙或丁。丙能传给甲或丁。丁能传给甲。",
        "options": [
          "甲→丙→乙→丁→甲",
          "甲→乙→丁→丙→甲",
          "甲→丙→丁→甲→乙",
          "甲→乙→丙→丁→甲"
        ],
        "correct": "甲→乙→丙→丁→甲",
        "explanation": "从甲出发，同时检查每条路线和最终回到甲。丙不能传乙，丁不能传丙。经过丙、丁后先回甲再传乙，接球人员虽然齐全，结尾却没有回到甲。有效路线是甲、乙、丙、丁、甲。"
      },
      {
        "id": "hard-pe-fitness-training-evidence",
        "topic": "fitness",
        "prompt": "哪项结论和改进计划最合适？",
        "material": "同一组同学比较两种传接球练习方式，希望知道哪种能提高传接成功率。初测时，每组用方式甲练 5 分钟后尝试 20 次，结果为 15 次成功；改用方式乙练 5 分钟后只尝试 12 次，结果为 10 次成功。",
        "options": [
          "初测中乙的成功率较高。可安排相同次数、距离和场地，轮换两种方式的先后顺序，多测几轮比较",
          "甲的成功次数更多，可直接认定甲训练效果更好，下次只用方式甲",
          "乙的成功率较高，下次让乙多练 5 分钟，使结论更可靠",
          "换一批同学改测乙并延长传球距离，用新结果与甲的初测结果直接比"
        ],
        "correct": "初测中乙的成功率较高。可安排相同次数、距离和场地，轮换两种方式的先后顺序，多测几轮比较",
        "explanation": "甲成功率为 15÷20＝75%，乙为 10÷12，约为 83%。成功率可以作初步比较。为了判断练习方式本身的影响，需要保持其他条件一致，并考虑练习顺序和偶然波动。"
      }
    ],
    "focus": "按场地、安全和动作目标比较训练方案，找出可执行的调整。"
  },
  {
    "id": "it",
    "sources": [
      {
        "title": "华东师范大学｜中小学信息技术教育研讨会初中案例分享会",
        "url": "https://ercdee.ecnu.edu.cn/d8/33/c16571a448563/page.htm",
        "note": "文中收录昆山市葛江中学的真实问题流程拆解课例和苏州工业园区星汇学校的循环算法课例，作为任务规则与程序追踪形式的参考。"
      },
      {
        "title": "苏州市吴江区震泽实验小学｜《学生公交智慧看板》公开课",
        "url": "https://wjzzsyxx.wujiang.edu.cn/2025_01/09_15/content-149641.html",
        "note": "公开报道展示了收集与分析数据、将算法应用于看板的任务过程。以流程结构为参考，原创七年级校园数据题。"
      },
      {
        "title": "教育部｜义务教育信息科技课程标准（2022年版）",
        "url": "https://www.moe.gov.cn/srcsite/A26/s8001/202204/W020220420582361024968.pdf",
        "note": "参考数据处理、精准信息搜索、计算思维和信息社会责任等学段质量要求。"
      }
    ],
    "questions": [
      {
        "id": "hard-it-data-late-dedup",
        "topic": "data",
        "prompt": "哪些单号应出现在周三的逾期未还清单里？",
        "material": "图书角要统计截至周三闭馆仍未归还、且超过截止日期的借阅单。借阅单号相同的记录只保留最新状态。“周三当天截止”到周三闭馆时尚不记逾期。以下是本周三闭馆时整理出的记录，序号越大越新。\n1　D01　周二截止　未还\n2　D02　周一截止　未还\n3　D01　周二截止　已还\n4　D03　周二截止　未还\n5　D04　周三截止　未还\n6　D05　周一截止　未还",
        "options": [
          "D03、D04",
          "D02、D03、D05",
          "D01、D02、D03、D05",
          "D02、D03、D04、D05"
        ],
        "correct": "D02、D03、D05",
        "explanation": "先按单号保留最新状态，D01 已归还。再筛选状态未还、截止日期早于周三的记录，D04 到周三闭馆时尚未逾期。剩下 D02、D03、D05。"
      },
      {
        "id": "hard-it-data-comparable-chart",
        "topic": "data",
        "prompt": "怎样整理与描述数据才符合报告要求？",
        "material": "信息科技小组要比较两个班从 9 月到 10 月使用电子借阅服务的变化。原始表按月统计，班级人数在两个月间不变。\n一班：40 人，9 月有 12 人使用，10 月有 20 人使用。\n二班：50 人，9 月有 20 人使用，10 月有 25 人使用。\n报告需要回答“10 月哪个班使用比例较高”和“哪个班的使用比例上升更多”。",
        "options": [
          "用两个月的使用人数相加后除以两班总人数。10 月一班比例更高，二班增长更多",
          "分别用各自 10 月人数减去 9 月人数，以 9 月使用人数为分母，计算得二班上升 25 个百分点",
          "按班级人数计算各月比例。10 月两班都是 50%，一班上升 20 个百分点，比二班多",
          "比较使用人数。10 月二班使用比例更高，两个班中一班的使用比例上升最多"
        ],
        "correct": "按班级人数计算各月比例。10 月两班都是 50%，一班上升 20 个百分点，比二班多",
        "explanation": "一班从 12÷40＝30% 升到 50%，二班从 20÷50＝40% 升到 50%。先统一各班各月的比例口径，再相减得到一班上升 20 个百分点、二班上升 10 个百分点。"
      },
      {
        "id": "hard-it-data-source-schedule",
        "topic": "data",
        "prompt": "更新班级电子通知时，应怎样处理？",
        "material": "学生要更新周五的校运动会信息。公告规定，参赛时段由学校体育组发布，场馆安排由学校总务处发布，各部门同一事项以最后通知为准。\n① 体育组周二公告：女子接力周五 15:00。\n② 体育组周四更正：女子接力周五 14:30。\n③ 总务处周四公告：周五原定东操场的接力调整至西操场。\n④ 班级群周四晚转发图片：女子接力周五 15:00，东操场，未注明发布者。",
        "options": [
          "写周五 15:00、西操场，时间引用体育组周二通知",
          "写周五 14:30、东操场，地点引用班级群最新图",
          "按群消息发布时间最新的图片，写周五 15:00、东操场",
          "写周五 14:30、西操场，并分别标明体育组更正、总务处公告"
        ],
        "correct": "写周五 14:30、西操场，并分别标明体育组更正、总务处公告",
        "explanation": "先按信息类型选择负责发布的来源，再在同一来源里选择最新信息。体育组周四更正时间为 14:30，总务处周四更新地点为西操场。"
      },
      {
        "id": "hard-it-algorithm-stop",
        "topic": "algorithm",
        "prompt": "程序在哪一次读取后停止，停止时累计人数是多少？",
        "material": "校展按次读取一列报名组人数，初始累计人数为 0。每次先读取一个数，若该数小于 2 则跳过，否则加入累计人数。每加入一次，若累计人数已达到 10 就立即停止。\n依次读取：3，1，4，2，3，5。",
        "options": [
          "第 5 次，12 人",
          "第 4 次，10 人",
          "第 5 次，9 人",
          "第 6 次，17 人"
        ],
        "correct": "第 5 次，12 人",
        "explanation": "第 2 次读到 1 时跳过。第 1～5 次读取后的累计人数依次是 3、3、7、9、12。第 5 次首次达到 10，立即停止，所以最后的 5 不再读取。"
      },
      {
        "id": "hard-it-algorithm-sort-tie",
        "topic": "algorithm",
        "prompt": "程序会按什么顺序选择项目？",
        "material": "机器人给校展项目安排讲解，规则依次执行。\n① 删去讲解用时超过 4 分钟的项目。② 其余项目先按预约人数从多到少排序。预约人数相同的，按准备分钟数从少到多排序。③ 按排序顺次选 3 个，中间不跳过。\n甲：预约 28 人，准备 3 分钟，讲解 6 分钟。\n乙：预约 24 人，准备 4 分钟，讲解 4 分钟。\n丙：预约 24 人，准备 2 分钟，讲解 3 分钟。\n丁：预约 20 人，准备 1 分钟，讲解 4 分钟。\n戊：预约 25 人，准备 5 分钟，讲解 4 分钟。",
        "options": [
          "丙→乙→丁",
          "戊→丙→乙",
          "甲→戊→乙",
          "戊→乙→丙"
        ],
        "correct": "戊→丙→乙",
        "explanation": "甲的讲解用时超过 4 分钟，首先删去。剩下项目预约人数最多的是戊。同为 24 人的丙和乙，丙的准备时间更短，应排在乙前面。取前三项得到戊、丙、乙。"
      },
      {
        "id": "hard-it-algorithm-rows-reset",
        "topic": "algorithm",
        "prompt": "依次记录的三项结果是什么？",
        "material": "程序逐行检查一张卡片表，每行执行下面的步骤。\n将本行计数设为 0。从左到右读这一行，读到 1 就将本行计数加 1。若本行计数第一次达到 2，就记录当前列号，直接开始下一行。若该行读完仍不到 2，记录 0。列号从 1 开始。\n第 1 行：1，0，1，1。第 2 行：0，1，0，0。第 3 行：0，1，1，0。",
        "options": [
          "4、0、3",
          "2、0、2",
          "3、0、3",
          "3、2、2"
        ],
        "correct": "3、0、3",
        "explanation": "第 1 行第 1、3 列为 1，在第 3 列提前结束。第 2 行要从 0 重新计数，只有一个 1，记录 0。第 3 行第 2、3 列为 1，仍在第 3 列达到 2。"
      }
    ],
    "focus": "核对数据处理口径，逐步推演分支、循环和状态变化。"
  },
  {
    "id": "labor",
    "sources": [
      {
        "title": "江苏省教育厅转载｜徐州劳动实践基地课程报道",
        "url": "https://jyt.jiangsu.gov.cn/art/2024/5/8/art_90805_11237958.html",
        "note": "报道记录徐州西苑中学初一学生的木艺制作任务及其加工、装配细节，作为分步执行和验收的参考。"
      },
      {
        "title": "江苏教育｜徐州中小学劳动教育实践案例",
        "url": "https://jyt.jiangsu.gov.cn/art/2024/4/29/art_86385_11237967.html",
        "note": "公开报道介绍徐州市新城实验学校与丰县欢口中学的劳动实践基地，并明确初中重在劳动知识和技能。"
      },
      {
        "title": "教育部｜义务教育劳动课程标准（2022年版）",
        "url": "https://www.moe.gov.cn/srcsite/A26/s8001/202204/W020220420582367012450.pdf",
        "note": "劳动清单、过程记录与成果评价作为分工、比较方案和检验改进效果的参考。"
      }
    ],
    "questions": [
      {
        "id": "hard-labor-planning-queue",
        "topic": "planning",
        "prompt": "以下哪种安排能在第 6 分钟结束前完成两个标签，且符合操作顺序？",
        "material": "劳动小组制作展览标签，有甲乙两人协作。每个标签必须先核对内容 1 分钟，再印制 2 分钟，最后装袋 1 分钟。同一人一次只能做一项，场内只有一台印制设备。已有两张标签 A、B 待做。两人从 0:00 开始工作。",
        "options": [
          "甲先核对 A，接着印制 A，同时印制 B。乙先核对 B，接着依次装袋 A、B",
          "甲先核对并印制 A，然后核对并印制 B。乙等每张印完便装袋",
          "甲核对 A 后印制 A，乙核对 B 后先装袋 B，等印制设备空出后再印制 B，最后装袋 A",
          "甲先核对 A，接着印制 A，再印制 B。乙先核对 B，等 A 印完后装袋 A，再等 B 印完后装袋 B"
        ],
        "correct": "甲先核对 A，接着印制 A，再印制 B。乙先核对 B，等 A 印完后装袋 A，再等 B 印完后装袋 B",
        "explanation": "0～1 分钟两人分别核对。1～3 分钟甲印 A，3～5 分钟甲印 B，同时乙可在 3～4 分钟装袋 A。5～6 分钟乙装袋 B。这个安排利用了不能并行的印制步骤之间可并行的装袋时间。"
      },
      {
        "id": "hard-labor-planning-checklist",
        "topic": "planning",
        "prompt": "哪项分工完整执行了操作单？",
        "material": "班级整理劳动工具柜。工具盒上有绿色和橙色标识。老师给出的操作单写着：① 有裂口或松动的工具先从流程中取出，交老师检查。② 无损工具用干布清洁后归位。③ 有泥土的橙色工具先按要求去泥，晾干后归位。\n小组看见：甲是有泥土但完好的橙色工具；乙是干净但手柄松动的绿色工具；丙是有灰尘且完好的绿色工具。",
        "options": [
          "一人给甲去泥，晾干后归位，一人把乙交老师，再用干布清洁丙并归位",
          "一人把甲擦去泥土后立刻归位，一人用干布清洁乙和丙并归位",
          "一人将甲和乙都放入晾干区，一人用干布清洁丙并归位，等三件都干了再归位",
          "一人把甲和丙交老师检查，一人用干布清洁乙并归位"
        ],
        "correct": "一人给甲去泥，晾干后归位，一人把乙交老师，再用干布清洁丙并归位",
        "explanation": "先按状态分流。乙手柄松动，优先退出流程并交老师。甲需要去泥，待晾干后归位。丙完好且只积灰，用干布清洁即可归位。"
      },
      {
        "id": "hard-labor-planning-donations",
        "topic": "planning",
        "prompt": "登记清单应该怎样写？",
        "material": "劳动日收到标号 A～F 的六袋旧书。老师规定：外袋破损的先换袋再查验；有受潮书的整袋放到待处理区，不能上架；其他书按学科上架；设一人登记每袋去向。\nA：袋破，数学，书完好。B：袋好，语文，有受潮书。C：袋好，数学，书完好。D：袋破，语文，有受潮书。E：袋好，语文，书完好。F：袋好，数学，书完好。",
        "options": [
          "A、D 都换袋后待处理，B、E 上语文架，C、F 上数学架",
          "A 换袋后与 C、F 一起上数学架；D 换袋后与 B 一起待处理；E 上语文架",
          "A、D 都换袋，A、C、F 上数学架，D、E 上语文架，B 待处理",
          "B、D 都待处理且不用换袋；A 与 C、F 直接上数学架，E 上语文架"
        ],
        "correct": "A 换袋后与 C、F 一起上数学架；D 换袋后与 B 一起待处理；E 上语文架",
        "explanation": "袋破影响换袋步骤，受潮影响最终去向，两项应分别判断。A、D 先换袋。B、D 有受潮书，放待处理区。剩下的书按学科分架。"
      },
      {
        "id": "hard-labor-project-cardboard-yield",
        "topic": "project",
        "prompt": "至少要用几张废卡纸，才能做够 20 张标牌？",
        "material": "劳动小组需要 20 张 4 厘米×7 厘米的标牌纸。现有三种完整废卡纸，可沿边直切，每张原料按长方形整齐排放同一方向的标牌，允许旋转排放方向，无需预留切缝。\n甲：8 厘米×21 厘米，最多取 1 张。\n乙：14 厘米×12 厘米，最多取 1 张。\n丙：7 厘米×16 厘米，库存充足。",
        "options": [
          "5 张",
          "6 张",
          "4 张",
          "3 张"
        ],
        "correct": "4 张",
        "explanation": "两种方向分别核对每边能排的份数。甲最多 2×3＝6 张，乙把 7 厘米边对齐 14 厘米边，最多 2×3＝6 张，丙最多 1×4＝4 张。任取 3 张最多得到 6＋6＋4＝16 张。甲、乙各 1 张，加 2 张丙，正好 20 张。"
      },
      {
        "id": "hard-labor-project-box-selection",
        "topic": "project",
        "prompt": "按已有记录，哪组盒子最符合推广目标？",
        "material": "四组用纸制作搬运盒。目标是：每次装 8 本练习册，连续搬运至少 5 次后盒体完好，且尽量少用全新的纸。每条记录都标明原测试条件。\n甲：用新纸 1 张，按每次 8 本搬运 5 次后完好。\n乙：全用旧纸，按每次 8 本搬运 6 次后完好。\n丙：全用旧纸，按每次 10 本搬运 3 次后完好。\n丁：用新纸 2 张，按每次 8 本搬运 6 次后完好。",
        "options": [
          "甲",
          "丙",
          "丁",
          "乙"
        ],
        "correct": "乙",
        "explanation": "先用规定测试条件筛选证据。甲、乙、丁都有按每次 8 本搬运至少 5 次的记录。丙承重更大，但只搬运 3 次，缺少重复耐用性的证据。在符合条件的三组中，乙不消耗新纸。"
      },
      {
        "id": "hard-labor-project-fair-trial",
        "topic": "project",
        "prompt": "下列哪种验证办法最能给出可比较的证据？",
        "material": "两个劳动小组要验证纸质借阅牌的折边能否提高耐用性。折边增加少量纸，但能否延长使用时间还未确定。计划比较折边牌和普通牌在被反复拿取时损坏的情况。",
        "options": [
          "用同批卡纸做相同大小的两组牌，每组 5 张，统一拿取动作和次数，记录每张首次出现破损时的次数",
          "给折边牌用较厚卡纸，给普通牌用较薄卡纸，拿取相同次数后比较破损",
          "给折边牌安排 10 次拿取，给普通牌安排 20 次拿取，最后只记录每组损坏张数",
          "用同批纸做两张牌，一张折边、一张普通，让两个班分别自由使用，下周比较外观"
        ],
        "correct": "用同批卡纸做相同大小的两组牌，每组 5 张，统一拿取动作和次数，记录每张首次出现破损时的次数",
        "explanation": "先固定材料、大小、拿取办法和记录口径，再仅改变折边处理。每组使用多张牌，并记录何时首次破损，可以比较耐用程度并减小偶然差异。"
      }
    ],
    "focus": "梳理任务先后关系，在时间、材料及验收标准之间比较方案。"
  },
  {
    "id": "music",
    "sources": [
      {
        "title": "苏州市教育局《2026年苏州市初中毕业生音乐、美术学科考核方案》",
        "url": "https://www.suzhou.gov.cn/szsrmzf/bmwj/202603/192aa3d8a06c4d019dae9ad0d0d98df5.shtml",
        "note": "苏州公开方案将音乐欣赏、表现、创造和联系纳入实践评价，毕业生现场考核采用选择题。用于参考任务与答题形式。"
      },
      {
        "title": "无锡市教育局《2026年无锡市初中学业水平考试艺术素质测评通知》",
        "url": "https://www.wuxi.gov.cn/doc/2026/03/16/4759056.shtml",
        "note": "规定以苏少版七至九年级教材为考核范围，公开列出机考的选择、判断、连线和操作形式。"
      },
      {
        "title": "苏州市苏剧传习保护中心：曲韵遇少年，名家传匠心",
        "url": "https://wglj.suzhou.gov.cn/szwhgdhlyj/hdxx/202606/c7bd39b22bf848a588dbaadb6b0221c3.shtml",
        "note": "现场教学示范唱腔咬字和转身节奏。用于设计原创的唱词清晰度与节拍配合题。",
        "term": "下"
      }
    ],
    "questions": [
      {
        "id": "hard-music-compound-rest",
        "topic": "rhythm",
        "material": "合奏需要补写一个 6/8 拍的小节。全小节含 6 个八分音符时值，分作两大拍，每大拍含 3 个。下列每个数字表示一个音符或休止占几个八分音符时值，“｜”把两大拍分开。“静1”是 1 个八分音符时值的休止，其余为发声。",
        "prompt": "老师要求两大拍都从发声开始，全小节只在第二大拍末尾停一个八分音符的时值。哪份谱既符合拍号，也符合要求？",
        "options": [
          "2＋1｜1＋静1＋1",
          "1＋2｜2＋静1",
          "2＋2｜1＋静1",
          "2＋静1｜1＋2"
        ],
        "correct": "1＋2｜2＋静1",
        "explanation": "前一大拍 1＋2＝3，后一大拍 2＋1＝3，合计 6。只有第二大拍的最后一个时值为休止。A 把休止放在拍中，C 的分组是 4 和 2，D 把休止放在第一大拍。"
      },
      {
        "id": "hard-music-align-tempos",
        "topic": "rhythm",
        "material": "两个声部同时从各自第一小节的第一拍进入。甲声部有 6 个 3/4 小节，以四分音符为一拍，速度是每分钟 90 拍。乙声部有 4 个 6/8 小节，以附点四分音符为一大拍，每小节有两大拍。两份乐谱都从头到尾完整演奏，没有反复或额外延长。",
        "prompt": "只调整乙的速度，要让两声部同时结束，乙应每分钟演奏多少个大拍？",
        "options": [
          "60 个",
          "90 个",
          "120 个",
          "40 个"
        ],
        "correct": "40 个",
        "explanation": "甲有 6×3＝18 拍，时长 18÷90×60＝12 秒。乙有 4×2＝8 大拍，须在 12 秒内完成，故每分钟有 8÷12×60＝40 大拍。不能把 6/8 的六个八分音符直接当作六个大拍。"
      },
      {
        "id": "hard-music-count-in-pickup",
        "topic": "rhythm",
        "material": "舞台排练使用 3/4 拍，每分钟 120 个四分音符。领唱从第 1 个完整小节之前的 1 拍弱起开始。合唱组在第 3 个完整小节的第 2 拍起点加入。录音从弱起的拍点开始，不含预备拍。",
        "prompt": "从录音开始到合唱组加入，已经过去多少拍、多少秒？",
        "options": [
          "8 拍，4 秒",
          "7 拍，3.5 秒",
          "8 拍，8 秒",
          "9 拍，4.5 秒"
        ],
        "correct": "8 拍，4 秒",
        "explanation": "先计 1 拍弱起，再算前两个完整小节的 6 拍，最后计第 3 小节的第 1 拍，共 8 拍。加入点恰是第 2 拍起点，不能再把该拍算进去。120 拍每分钟即每拍 0.5 秒，所以是 4 秒。"
      },
      {
        "id": "hard-music-canon-and-level",
        "topic": "listening",
        "material": "班级录下一段原创合唱。第 1—2 小节只有甲组演唱。第 3 小节起，甲组继续向后唱，乙组从甲组原先唱过的开头开始。此后两组同时唱着同一旋律的不同位置。两组都按照谱上的 mp 演唱，同样的速度持续到结束。老师从同一位置听，重叠处整体声音更饱满。",
        "prompt": "哪条记录能同时判断演唱形式，并用材料解释整体声音变化？",
        "options": [
          "属于齐唱，声音更饱满是因为乙组从加入时起就跟甲组唱同一个位置。",
          "属于轮唱，声音更饱满说明两组都把 mp 唱成了 f。",
          "属于轮唱，声部重叠使声音更饱满，记录没有显示每组单独改变力度。",
          "属于二重唱，声部重叠可由两组速度不同来解释。"
        ],
        "correct": "属于轮唱，声部重叠使声音更饱满，记录没有显示每组单独改变力度。",
        "explanation": "乙从同一旋律的开头错时进入，是轮唱，不是在同一位置齐唱。速度未变，两组各自保持 mp。此处听到的变化伴随重叠出现，没有证据说明单个声部从 mp 改成了 f。"
      },
      {
        "id": "hard-music-timbre-test",
        "topic": "listening",
        "material": "音乐小组用原创短旋律做聆听比较。最初的甲录音由竹笛演奏，音区较高，速度较快。乙录音由二胡演奏，音区较低，速度较慢。小组发现，多数同学把甲与轻盈、把乙与沉稳联系起来。",
        "prompt": "要判断这种差别是否主要和乐器音色有关，怎样重新录制并播放最合适？",
        "options": [
          "两种乐器都保留原来音区和速度，只调整到相近的录音响度，再交叉播放。",
          "在两种乐器都适合的同一音区，用相同音高、节奏和速度演奏同一旋律，将录音响度调到接近，并交叉播放。",
          "让两种乐器都使用原来的音区，把两首旋律换成拍号相同的不同旋律，按相同速度播放。",
          "只用竹笛分别录制轻快和沉稳两个版本，保持响度接近，然后比较同学的描述。"
        ],
        "correct": "在两种乐器都适合的同一音区，用相同音高、节奏和速度演奏同一旋律，将录音响度调到接近，并交叉播放。",
        "explanation": "要比较音色，需尽量固定音高、节奏、速度和响度，只改变演奏乐器。原录音的音区、速度和乐器同时不同。A 和 C 仍把其他变量混在一起，D 无法比较两种乐器。"
      },
      {
        "id": "hard-music-kunqu-response",
        "topic": "listening",
        "material": "苏州戏曲进校园活动会示范唱腔咬字和动作与音乐的配合。学校借鉴这一点设计原创唱段：角色唱到“回家”时，要让观众听清这两个字；“家”字后的拖腔要有逐步舒展的感觉；同伴必须在原定的第 4 小节第一拍整齐入场，全段速度不变。",
        "prompt": "按这些要求排练，哪套调整最合适？",
        "options": [
          "短句一开头就让伴奏渐强突出“回家”，唱完“家”字后把伴奏降回原力度，按原拍点入场。",
          "唱“回家”时减弱伴奏，之后逐渐放慢全组拍速，让同伴等拖腔完全结束再入场。",
          "保持速度和拍点，伴奏在“回家”时比歌声更响，拖腔开始后立即把旋律反复一遍。",
          "伴奏在“回家”处让出空间，唱完字头后随拖腔逐渐增强表现，大家仍按原速度在指定拍点入场。"
        ],
        "correct": "伴奏在“回家”处让出空间，唱完字头后随拖腔逐渐增强表现，大家仍按原速度在指定拍点入场。",
        "explanation": "先让观众听清唱词，再用拖腔及相应的力度变化表现舒展。持续关注原有节拍，保证指定入场点。A 把力度变化放到了需要听清字词的地方，B 改了速度和入场时机，C 会掩盖歌声并改变原有的音乐进程。"
      }
    ],
    "focus": "结合节拍、结构和演出要求，选择符合条件的演练方案。"
  },
  {
    "id": "art",
    "sources": [
      {
        "title": "苏州市教育局《2026年苏州市初中毕业生音乐、美术学科考核方案》",
        "url": "https://www.suzhou.gov.cn/szsrmzf/bmwj/202603/192aa3d8a06c4d019dae9ad0d0d98df5.shtml",
        "note": "苏州公开方案列出美术欣赏·评述、造型·表现、设计·应用和综合·探索任务，现场考核采用选择题。"
      },
      {
        "title": "无锡市教育局《2026年无锡市初中学业水平考试艺术素质测评通知》",
        "url": "https://www.wuxi.gov.cn/doc/2026/03/16/4759056.shtml",
        "note": "规定以苏少版七至九年级艺术教材为考核范围并兼顾地方优秀艺术文化。"
      },
      {
        "title": "苏州共青团：非遗主题图书馆套色印章体验",
        "url": "https://szyouth.suzhou.gov.cn/wap/news/detail/id-107305.html",
        "note": "公开活动让学生按照顺序完成四次不同颜色与形状的盖章，体现一版一色。用于设计原创的套版定位和改进题。",
        "term": "下"
      }
    ],
    "questions": [
      {
        "id": "hard-art-poster-hierarchy",
        "topic": "color",
        "material": "校园戏曲节海报规定：在走廊远处能先认出标题，走近可读到时间和地点；必须保留插画的大面积留白；打印机只有深蓝和橙色两种油墨，纸张为白色。试印发现，小号橙字在白纸上较淡，深蓝字清楚。",
        "prompt": "哪套排版能同时满足识读、主次和印制条件？",
        "options": [
          "白色留白区用大号深蓝标题和小号深蓝信息，橙色集中在少量插画和装饰上。",
          "把大号深蓝标题压在深蓝色插画实地上，小号深蓝时间与地点放在白色留白区。",
          "白色留白区用大号深蓝标题，小号橙色时间与地点也放在白底上，以两种颜色区分层级。",
          "用深蓝铺满原有留白区，把标题及时间、地点都缩成同样大小，用橙色排在深蓝色图块上。"
        ],
        "correct": "白色留白区用大号深蓝标题和小号深蓝信息，橙色集中在少量插画和装饰上。",
        "explanation": "先根据试印结果选深蓝字和白底，再用标题与信息的字号差建立阅读顺序；将橙色限制在装饰，保留留白。B 的标题缺少明暗对比，C 无法满足小字识读，D 改变了留白并削弱层级。"
      },
      {
        "id": "hard-art-light-space",
        "topic": "color",
        "material": "画面上有白壶、深色杯、台布和墙。教师要求：壶为主体；让人从遮挡关系看出壶在杯前；窗口在左上方，让三个物体看起来受到同一方向的光；画面上仍要有清晰的明暗层次。",
        "prompt": "四份修改说明中，哪项同时合乎要求？",
        "options": [
          "壶挡住杯的一部分，壶左上亮、右下暗，杯的投影朝右下，壶的投影朝左下；把醒目对比放在壶上。",
          "杯挡住壶的一部分，物体亮面偏左上、投影偏右下；适当减弱墙面明暗对比。",
          "壶挡住杯的一部分，亮面偏左上、投影偏右下，在壶的关键部位加强明暗对比，把背景变化处理得柔和一些。",
          "壶挡住杯的一部分，亮面和投影都保留原方向，但把全图最强烈的明暗反差放在墙与台布的交界处。"
        ],
        "correct": "壶挡住杯的一部分，亮面偏左上、投影偏右下，在壶的关键部位加强明暗对比，把背景变化处理得柔和一些。",
        "explanation": "遮挡显示白壶在前。同一左上光源意味着亮面向左上、投影远离光源偏右下。把关键对比安排在壶上且弱化背景可突出主体。A 的两个影子方向冲突，B 遮挡关系反了，D 将视觉焦点移向背景。"
      },
      {
        "id": "hard-art-palette-proportions",
        "topic": "color",
        "material": "班级要给一幅校园戏台画作配色。老师提供的色环中，蓝色与橙色相对。作品需呈暖色主调，且使用一对相对的颜色增强主体对比。设计表规定：暖色背景至少占画面一半，唯一的主体为蓝色，总面积为整幅画的 10% 至 20%，背景的饱和度要低于主体。",
        "prompt": "哪份方案符合三项设计要求？",
        "options": [
          "橙色背景占 57%，是最高饱和度；蓝色主体占 15%，饱和度较低；其余用中性色。",
          "低饱和度橙色背景占 48%；高饱和度蓝色主体占 16%；其余用中性色。",
          "低饱和度橙色背景占 58%；高饱和度蓝色主体占 24%；其余用中性色。",
          "低饱和度橙色背景占 55%；高饱和度蓝色主体占 18%；其余用中性色。"
        ],
        "correct": "低饱和度橙色背景占 55%；高饱和度蓝色主体占 18%；其余用中性色。",
        "explanation": "蓝橙相对，面积较大的橙保留暖色主调。D 的背景超过一半，蓝色面积在给定范围内，且蓝色饱和度更高。A 把饱和度关系颠倒，B 背景未过半，C 主体面积超限。"
      },
      {
        "id": "hard-art-border-symmetry",
        "topic": "design",
        "material": "小组为八格窗格边饰设计剪纸，竖直对称轴位于第 4 格和第 5 格之间。左半从左到右为：叶尖朝右、圆花、叶尖朝左、方花。两种花自身左右对称，叶片则有方向。每个花纹的大小固定。",
        "prompt": "右半从第 5 格到第 8 格应怎样排，展开后才满足轴对称？",
        "options": [
          "方花、叶尖朝左、圆花、叶尖朝右",
          "方花、叶尖朝右、圆花、叶尖朝左",
          "叶尖朝左、圆花、叶尖朝右、方花",
          "方花、圆花、叶尖朝右、叶尖朝左"
        ],
        "correct": "方花、叶尖朝右、圆花、叶尖朝左",
        "explanation": "右半从轴旁往外依次对应左边第 4、3、2、1 格。方花、圆花不变；原第 3 格叶尖朝左，反射后朝右，原第 1 格朝右，反射后朝左。只调换排列顺序但不反转叶尖仍不对称。"
      },
      {
        "id": "hard-art-woodblock-registration",
        "topic": "design",
        "material": "小组借鉴苏州桃花坞木版年画“一版一色”的做法，用黑线、红、蓝三块版画校园图。连印三张试样，纸张均按同一定位线摆放。每张的黑色轮廓和红色色块都完全对齐，蓝色色块的边缘清楚，但整体向右偏 3 毫米。",
        "prompt": "要验证最可能的原因，并避免影响已对齐的部分，先做哪一步？",
        "options": [
          "重新挪动整张纸的位置，再按原来各版的位置和顺序套印。",
          "固定三块版位置，加重蓝版压力，看能否把蓝色边缘压回轮廓范围。",
          "保留纸和黑、红版位置，只把蓝版向左校正 3 毫米后再试印。",
          "保留纸和三块版位置，换一种更深的蓝，再比较蓝色色块的边缘。"
        ],
        "correct": "保留纸和黑、红版位置，只把蓝版向左校正 3 毫米后再试印。",
        "explanation": "偏移方向和距离每张相同，又只出现于蓝色，先单独校正蓝版位置而不改变对齐的参照。边缘清楚，材料没有显示颜色偏淡或压力不足。移动整张纸可能把原本对齐的黑、红也移开。"
      },
      {
        "id": "hard-art-signage-evidence",
        "topic": "design",
        "material": "苏州园林主题展有两块指引展板，底色与印刷颜色都相同。版本 A 把箭头放在有蓝白纹样的边框，文字高度 10 厘米；在同一距离受试的 12 人中，9 人读对展厅名，5 人看对方向。版本 B 把箭头和展厅名放在无花纹的实色信息栏，文字高度 10 厘米；12 人中分别有 9 人和 11 人看对。展板必须保留非遗主题边纹，且下一轮希望进一步提高展厅名辨认率。",
        "prompt": "下一轮应该怎样改，并验证文字大小是否有帮助？",
        "options": [
          "以版本 B 为起点，保留信息栏和装饰边纹，只增大展厅名的字号；同距离、同照明比较新旧两版。",
          "以版本 B 为起点，同时放大展厅名、换信息栏颜色、移动箭头，然后把辨认率变化归结于字号。",
          "以版本 A 为起点，只放大展厅名；把试读距离缩短，并用新结果与旧结果比较。",
          "以版本 B 为起点，移除边纹、放大展厅名并更换灯光，再用结果判断是否保留花纹。"
        ],
        "correct": "以版本 B 为起点，保留信息栏和装饰边纹，只增大展厅名的字号；同距离、同照明比较新旧两版。",
        "explanation": "B 的方向辨认率提高，展厅名辨认率持平，因此应保留信息与纹样分区。试验字号时只改文字大小，并固定距离、照明等条件。B 项同时改多处，难以确定原因；C 改了距离，D 既破坏保留纹样的约束，也同时改了多个条件。"
      }
    ],
    "focus": "综合构图、色彩与制作限制，比较设计方案及其效果。"
  },
  {
    "id": "biology",
    "sources": [
      {
        "title": "连云港市灌南县2025—2026学年七年级上学期期中生物学试题公开预览",
        "url": "https://www.jiangsu100.com/54565.html",
        "note": "公开预览第2、4—7题涉及显微镜放大、观察方法、生物与环境以及对照和变量。综合题把这些要求落实到读数、配对和限定结论。",
        "term": "上"
      },
      {
        "title": "苏州工业园区星湖学校2024—2025学年七年级下学期期末生物卷公开预览",
        "url": "https://zy.21cnjy.com/23510480",
        "note": "卷面说明显示单项选择、组合选择和材料分析并用。参考其中根据材料证据判断结构与功能、比较记录的设问方式。",
        "term": "下"
      },
      {
        "title": "南京市高淳区2023—2024学年七年级下学期期末生物卷公开页面",
        "url": "https://www.jyeoo.com/sj/aa59e7ea-3c71-4e14-b3f5-a753f6fc470b",
        "note": "公开可见人体呼吸、消化与循环的组合判断，以及人体调节的情境问法。用作下册人体部分的知识和设问参考。",
        "term": "下"
      }
    ],
    "questions": [
      {
        "id": "hard-bio-microscope-comparison",
        "topic": "cells",
        "material": "同一块装片、同一目镜下，老师用标尺校准了两种物镜的视野。选取同一排大小相近的细胞测量，量得的直径与该排细胞的排列方向一致，且忽略细胞间隙。\n记录甲｜物镜10×｜视野直径1.60毫米｜横跨直径恰有8个细胞\n记录乙｜物镜40×｜视野直径0.40毫米｜横跨直径恰有2个细胞",
        "prompt": "由两份记录估算单个细胞的实际长度。若甲的视野中待观察细胞偏右上方，换高倍物镜之前应怎样移动装片？",
        "options": [
          "两份记录都约为0.20毫米，装片向左下方移",
          "甲约为0.20毫米、乙约为0.80毫米，装片向右上方移",
          "两份记录都约为0.20毫米，装片向右上方移",
          "甲约为0.20毫米、乙约为0.05毫米，装片向左下方移"
        ],
        "correct": "两份记录都约为0.20毫米，装片向右上方移",
        "explanation": "甲用1.60÷8，乙用0.40÷2，两次都得0.20毫米。换高倍物镜改变的是观察到的物像大小和视野范围，细胞的实际大小未变。物像和装片移动方向相反，物像要从右上移向中央，装片应向右上移动。"
      },
      {
        "id": "hard-bio-habitat-paired-counts",
        "topic": "ecosystem",
        "material": "在一处稻田边，调查小组在同一个傍晚用相同时间、沿相同长度的样段记录蛙的出现次数。样段附近有无草带、路灯亮灭及记录如下。\n甲｜有草带｜灯灭｜18次\n乙｜无草带｜灯灭｜11次\n丙｜有草带｜灯亮｜9次\n丁｜无草带｜灯亮｜5次",
        "prompt": "小组想判断记录中草带与蛙出现次数的关系。哪种比较方法和结论最合适？",
        "options": [
          "比较甲和丁；18与5相差最多，说明差值主要由草带造成",
          "比较甲和乙、丙和丁；在两种照明条件下，有草带样段的记录次数都较多，但还需重复调查",
          "比较甲和丙、乙和丁；灯灭时次数都较多，因此能把两对差值用于判断草带的关系",
          "只比较甲和乙；草带样段多出7次，足以推断同一地区所有稻田都有同样的差值"
        ],
        "correct": "比较甲和乙、丙和丁；在两种照明条件下，有草带样段的记录次数都较多，但还需重复调查",
        "explanation": "甲和乙都灯灭，丙和丁都灯亮，对内比较可避免把照明差异混进草带比较。两组比较都表现为有草带时记录次数更多。这里只记录一次傍晚的出现次数，可能重复遇到同一个体，也可能受其他环境因素影响，不能凭这组数据得出普遍的因果结论。"
      },
      {
        "id": "hard-bio-seed-rate-controls",
        "topic": "plants",
        "material": "课堂记录来自同批萝卜种子，观察时长和空气条件相同。表中最后一列是萌发粒数/供试粒数。\n甲｜22℃｜有光｜湿润｜12/15\n乙｜22℃｜无光｜湿润｜18/20\n丙｜12℃｜无光｜湿润｜9/20\n丁｜22℃｜无光｜干燥｜0/20",
        "prompt": "哪一项同时正确选出了温度对照，并合理解释了光照比较的结果？",
        "options": [
          "比较甲、丙估计温度影响；甲和乙分别萌发12粒、18粒，差6粒就是光照造成的",
          "比较乙、丁估计温度影响；甲和乙萌发率分别为80%和90%，所以本次有光时比例更高",
          "比较乙、丙估计温度影响；甲和乙萌发率分别为80%和90%，这说明光照对所有种子都有抑制作用",
          "比较乙、丙估计温度影响；甲和乙萌发率分别为80%和90%，这组记录说明在本次条件下无光也能萌发"
        ],
        "correct": "比较乙、丙估计温度影响；甲和乙萌发率分别为80%和90%，这组记录说明在本次条件下无光也能萌发",
        "explanation": "乙和丙均无光、湿润，温度不同。甲和乙供试粒数不等，应比较萌发率而不是萌发总粒数：12÷15＝80%，18÷20＝90%。乙组在无光时也有种子萌发。不同种类和条件没有在这组数据中检验，不能据此断言光照普遍抑制萌发。"
      },
      {
        "id": "hard-bio-digestion-membrane",
        "topic": "body",
        "material": "观察三组模拟记录。每组都把不同的材料放入同样的模型袋，袋外起初只有清水。这种膜可让葡萄糖通过，不能让淀粉通过。所有组的环境相同。\n甲：袋内起初有淀粉及能把淀粉最终分解成葡萄糖的模拟消化液。结束时袋内淀粉减少，袋外检测到葡萄糖。\n乙：袋内起初只有与甲等量的淀粉。结束时袋内淀粉没有明显变化，袋外未检测到葡萄糖。\n丙：袋内起初只有葡萄糖。结束时袋外检测到葡萄糖。",
        "prompt": "哪一项同时正确解释了甲和乙的比较、以及丙组的作用？",
        "options": [
          "甲、乙的对照说明模拟消化液使淀粉分解；丙说明葡萄糖无需再分解也能通过膜，模拟吸收",
          "甲、乙的对照说明膜能分解淀粉；丙说明葡萄糖要经过模拟消化液的作用才能通过膜",
          "甲、乙的结果说明淀粉能直接通过膜；丙说明葡萄糖可以在袋外由淀粉分解得到",
          "甲、乙的对照说明模拟消化液改变了膜的通透性；丙说明葡萄糖的产生和通过膜是同一个过程"
        ],
        "correct": "甲、乙的对照说明模拟消化液使淀粉分解；丙说明葡萄糖无需再分解也能通过膜，模拟吸收",
        "explanation": "甲、乙起初的淀粉相同，区别在于有没有模拟消化液。甲的淀粉减少且袋外出现葡萄糖，支持淀粉先分解、产物再通过膜。丙没有淀粉或消化液，膜外仍出现葡萄糖，说明小分子通过膜与大分子的消化是不同的步骤。"
      },
      {
        "id": "hard-bio-eye-two-controls",
        "topic": "health",
        "material": "记录甲：一名同学一直看同一距离的字，环境由暗变亮后，瞳孔直径从5毫米变为3毫米。\n记录乙：在眼球模型中，光线亮度和透镜至纸屏的距离保持不变。同一物体离透镜50厘米时，较薄的凸透镜能使纸屏上的像清晰。物体移到20厘米时，改用较厚的凸透镜才能使像清晰。",
        "prompt": "哪项解释既区分了两份记录所反映的调节，也没有超出模型能说明的范围？",
        "options": [
          "甲主要说明改变看物体的远近会使瞳孔变小；乙主要说明透镜改变了进光量",
          "甲说明亮处瞳孔变小会增加进光；乙说明物体移近时要减小透镜的会聚能力",
          "甲说明亮处瞳孔变小能减少进光；乙说明物体移近时需要较强会聚作用，因此已找到了人发生近视的唯一原因",
          "甲说明亮处瞳孔变小能减少进光；乙说明在模型条件下改变透镜的会聚能力，可把近处物体的像重新聚在同一纸屏上"
        ],
        "correct": "甲说明亮处瞳孔变小能减少进光；乙说明在模型条件下改变透镜的会聚能力，可把近处物体的像重新聚在同一纸屏上",
        "explanation": "甲的观看距离未改变，环境变亮时瞳孔缩小，能减少进入眼内的光。乙固定光线亮度和屏距，改用会聚作用较强的凸透镜，是在模拟改变聚焦能力。模型仅改变了几个指定因素，不能据此确定真实眼睛出现近视的所有原因。"
      },
      {
        "id": "hard-bio-pulse-time-unit",
        "topic": "investigation",
        "material": "三名同学完成同一课堂活动。记录分别在活动前、活动结束后立即和结束后3分钟开始数脉搏。格式为“数到的次数/计时秒数”。\n甲：15次/15秒｜49次/30秒｜17次/15秒\n乙：34次/30秒｜24次/15秒｜35次/30秒\n丙：18次/15秒｜52次/30秒｜18次/15秒",
        "prompt": "全都换算成每分钟次数后，谁在活动结束后立即测得的脉搏最高？谁比自己的活动前增量最大？谁在3分钟后的记录已经回到自己的活动前水平？",
        "options": [
          "依次为甲、甲、丙",
          "依次为丙、丙、乙",
          "依次为丙、甲、丙",
          "依次为乙、甲、乙"
        ],
        "correct": "依次为丙、甲、丙",
        "explanation": "15秒计数乘4，30秒计数乘2。换算后，甲依次为60、98、68，乙为68、96、70，丙为72、104、72次/分钟。立即测得的最高值是丙的104，但三人相对各自活动前的增量是38、28、32，最大的是甲。3分钟后的记录中，只有丙的72恰好和自己活动前相同。"
      }
    ],
    "focus": "读取对照结果和测量数据，区分数据所支持的结论与过度推断。"
  }
];

const advancedSets = new Map();
for (const entry of advancedSubjects) {
  const subject = subjects.find(item=>item.id===entry.id);
  for (const term of ['上','下']) {
    const sources = entry.sources.filter(source=>!source.term || source.term===term);
    advancedSets.set(subject.id+'/'+term,{
      name:subject.name,
      focus:entry.focus,
      sources:sources.length?sources:entry.sources,
      ids:[]
    });
  }
  for (const question of entry.questions) {
    const topic = subject.topics.find(item=>item.key===question.topic);
    topic.questions.push({...question, subject:subject.id, level:'challenge'});
    advancedSets.get(subject.id+'/'+topic.term).ids.push(question.id);
  }
}
