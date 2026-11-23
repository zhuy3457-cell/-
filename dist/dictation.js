const dictationTopics = [
  {
    "key": "dictation-upper",
    "title": "古诗文默写",
    "term": "上",
    "description": "补写上下句或按情境默写。单空、双空都可逐空核对错字和漏字。",
    "questions": [
      {
        "id": "dict-upper-sea-islands",
        "level": "basic",
        "prompt": "曹操《观沧海》\n水何澹澹，______。",
        "blanks": [
          "山岛竦峙"
        ],
        "explanation": "出自曹操《观沧海》。前句写水波动荡，这一句转向高高挺立的山岛。注意“竦”是立字旁，“峙”是山字旁。"
      },
      {
        "id": "dict-upper-beigu-time",
        "level": "challenge",
        "prompt": "王湾《次北固山下》把一日的轮替和一年的交替并列写出。写出残夜未尽太阳已升、旧年未过江上已见春意的两句。\n①______，②______。",
        "blanks": [
          "海日生残夜",
          "江春入旧年"
        ],
        "explanation": "出自王湾《次北固山下》。天未亮透时海日已升，旧年未过时江上已有春意。第一句用“生”，第二句用“入”。"
      },
      {
        "id": "dict-upper-beigu-letter",
        "level": "basic",
        "prompt": "王湾《次北固山下》\n乡书何处达？______。",
        "blanks": [
          "归雁洛阳边"
        ],
        "explanation": "出自王湾《次北固山下》。诗人想到托北归的大雁传递家书。地名是“洛阳”，写信的想象借的是“归雁”。"
      },
      {
        "id": "dict-upper-autumn-dusk",
        "level": "standard",
        "prompt": "马致远《天净沙·秋思》结尾先点明日暮，再写漂泊在远方的人的愁苦。请补全这两句。\n①______，②______。",
        "blanks": [
          "夕阳西下",
          "断肠人在天涯"
        ],
        "explanation": "出自马致远《天净沙·秋思》。由落日转向漂泊者，“断肠”写愁苦极深，“天涯”的“涯”用三点水。"
      },
      {
        "id": "dict-upper-analects-diligent",
        "level": "standard",
        "prompt": "《论语》十二章中，子夏谈到广泛学习、坚定志向、恳切发问并思考切近的问题。补全这章开头的两句。\n子夏曰：“①______，②______，仁在其中矣。”",
        "blanks": [
          "博学而笃志",
          "切问而近思"
        ],
        "explanation": "出自《论语》十二章。先说“博学”与“笃志”，再说“切问”与“近思”。“笃”有坚定的意思，上面是竹字头。"
      },
      {
        "id": "dict-upper-analects-think",
        "level": "basic",
        "prompt": "《论语》十二章\n子曰：“学而不思则罔，______。”",
        "blanks": [
          "思而不学则殆"
        ],
        "explanation": "出自《论语》十二章。前句先学后思，后句先思后学，形成对照。末字是“殆”，左边是“歹”。"
      },
      {
        "id": "dict-upper-analects-will",
        "level": "basic",
        "prompt": "《论语》十二章\n子曰：“三军可夺帅也，______。”",
        "blanks": [
          "匹夫不可夺志也"
        ],
        "explanation": "出自《论语》十二章。前句的“三军”和后句的“匹夫”相对，“帅”和“志”相对。两句末尾都有“也”。"
      },
      {
        "id": "dict-upper-luyou-dream",
        "level": "challenge",
        "prompt": "陆游《十一月四日风雨大作》（其二）由深夜听到的现实声响转入梦中的战场想象。写出完成这一转换的两句。\n①______，②______。",
        "blanks": [
          "夜阑卧听风吹雨",
          "铁马冰河入梦来"
        ],
        "explanation": "出自陆游《十一月四日风雨大作》（其二）。“夜阑”表示夜深，注意“阑”里面是“柬”。听到的是风雨声，入梦的是“铁马冰河”。"
      },
      {
        "id": "dict-upper-crane-sky",
        "level": "basic",
        "prompt": "刘禹锡《秋词》（其一）\n晴空一鹤排云上，______。",
        "blanks": [
          "便引诗情到碧霄"
        ],
        "explanation": "出自刘禹锡《秋词》（其一）。鹤上晴空引起高昂的诗情。“碧霄”指青天，“霄”有雨字头。"
      },
      {
        "id": "dict-upper-west-window",
        "level": "challenge",
        "prompt": "李商隐《夜雨寄北》由眼下的巴山夜雨写开去，想象将来相聚时在西窗剪烛、回说今夜。写出这两句。\n①______，②______。",
        "blanks": [
          "何当共剪西窗烛",
          "却话巴山夜雨时"
        ],
        "explanation": "出自李商隐《夜雨寄北》。“何当”问何时才能相聚，“却话”是到那时再回说眼前的巴山夜雨。第一句是“共剪”，第二句是“却话”。"
      },
      {
        "id": "dict-upper-tongguan-cloud",
        "level": "basic",
        "prompt": "谭嗣同《潼关》\n______，秋风吹散马蹄声。",
        "blanks": [
          "终古高云簇此城"
        ],
        "explanation": "出自谭嗣同《潼关》。“终古”写时间久远，“簇”写高云聚集在城的周围。“簇”上面是竹字头。"
      },
      {
        "id": "dict-upper-flute-home",
        "level": "basic",
        "prompt": "李益《夜上受降城闻笛》\n不知何处吹芦管，______。",
        "blanks": [
          "一夜征人尽望乡"
        ],
        "explanation": "出自李益《夜上受降城闻笛》。先写听到的芦管声，再写征人的反应。“尽”表示都，“望乡”的“乡”指故乡。"
      }
    ],
    "sources": [
      {
        "title": "滕州市教育资源公共服务平台 · 2024 年秋季七年级语文教材变化",
        "url": "https://www.tzjtzy.cn/studio/index.php?id=6711&r=studio%2Fpost%2Fview&sid=649",
        "note": "核对 2024 年修订版统编七年级上册《古代诗歌四首》《论语》十二章及两组课外古诗词的篇目。"
      },
      {
        "title": "国家中小学智慧教育平台《义务教育教科书·语文》七年级上册",
        "url": "https://r3-ndr.ykt.cbern.com.cn/edu_product/esp/assets/8b9c7052-add4-4744-ab04-69d6c180d5d9.pkg/pdf.pdf",
        "note": "用公开教材电子版核对修订后沿用的《古代诗歌四首》和《论语》十二章原句。"
      },
      {
        "title": "二一教育 · 七年级上册必背古诗文",
        "url": "https://zy.21cnjy.com/23136851",
        "note": "核对《夜上受降城闻笛》《秋词》（其一）《夜雨寄北》《十一月四日风雨大作》（其二）和《潼关》的用字。"
      }
    ]
  },
  {
    "key": "dictation-lower",
    "title": "古诗文默写",
    "term": "下",
    "description": "补写上下句或按情境默写。单空、双空都可逐空核对错字和漏字。",
    "questions": [
      {
        "id": "dict-lower-wangyue-view",
        "level": "basic",
        "prompt": "补写杜甫《望岳》的下句。“会当凌绝顶，______。”",
        "blanks": [
          "一览众山小"
        ],
        "explanation": "出自杜甫《望岳》。“览”是看，注意下部的“见”。“众山”指许多山峰。"
      },
      {
        "id": "dict-lower-shanxi-road",
        "level": "basic",
        "prompt": "补写陆游《游山西村》的上句。“______，柳暗花明又一村。”",
        "blanks": [
          "山重水复疑无路"
        ],
        "explanation": "出自陆游《游山西村》。“山重”描绘山峦重叠。“水复”的“复”有回环之意，留意字形。"
      },
      {
        "id": "dict-lower-feilaifeng-height",
        "level": "standard",
        "prompt": "王安石在《登飞来峰》中说自己不怕浮云遮住视线。补写说明原因的下句。“不畏浮云遮望眼，______。”",
        "blanks": [
          "自缘身在最高层"
        ],
        "explanation": "出自王安石《登飞来峰》。“自缘”意思是自然是因为，教材写绞丝旁的“缘”。"
      },
      {
        "id": "dict-lower-bamboo-solitude",
        "level": "standard",
        "prompt": "补写王维《竹里馆》的上句。“______，弹琴复长啸。”",
        "blanks": [
          "独坐幽篁里"
        ],
        "explanation": "出自王维《竹里馆》。“幽篁”是幽深的竹林。“篁”上面是竹字头，下面是“皇”。"
      },
      {
        "id": "dict-lower-qinhuai-berth",
        "level": "standard",
        "prompt": "补写杜牧《泊秦淮》的下句。“烟笼寒水月笼沙，______。”",
        "blanks": [
          "夜泊秦淮近酒家"
        ],
        "explanation": "出自杜牧《泊秦淮》。“泊”指船停靠，“淮”是三点水加“隹”，注意写准河名。"
      },
      {
        "id": "dict-lower-yueke-wait",
        "level": "basic",
        "prompt": "补写赵师秀《约客》的上句。“______，闲敲棋子落灯花。”",
        "blanks": [
          "有约不来过夜半"
        ],
        "explanation": "出自赵师秀《约客》。“过夜半”指已经过了半夜。注意原句中的“夜”“半”顺序。"
      },
      {
        "id": "dict-lower-capital-messenger",
        "level": "basic",
        "prompt": "补写岑参《逢入京使》的下句。“马上相逢无纸笔，______。”",
        "blanks": [
          "凭君传语报平安"
        ],
        "explanation": "出自岑参《逢入京使》。“凭”是请求、烦劳，“传语”指捎口信，留意“凭”和“报”的写法。"
      },
      {
        "id": "dict-lower-mulan-frontier-night",
        "level": "challenge",
        "prompt": "《木兰诗》中，从打更声和月光两方面写边塞军营寒夜的诗句是“①______，②______”。",
        "blanks": [
          "朔气传金柝",
          "寒光照铁衣"
        ],
        "explanation": "出自《木兰诗》。“朔”指北方。“金柝”在这里指军中打更的器具。“柝”左边是木字旁。"
      },
      {
        "id": "dict-lower-youzhou-universe",
        "level": "challenge",
        "prompt": "陈子昂登台远望，想到天地的广阔久远，独自伤感落泪。写出《登幽州台歌》中对应的两句。“①______，②______！”",
        "blanks": [
          "念天地之悠悠",
          "独怆然而涕下"
        ],
        "explanation": "出自陈子昂《登幽州台歌》。“悠悠”形容久远、广大。“怆”有竖心旁，“涕”有三点水，这里指眼泪。"
      },
      {
        "id": "dict-lower-loushi-green",
        "level": "standard",
        "prompt": "《陋室铭》中，刘禹锡借台阶上的苔痕和映入帘内的草色写出陋室的清幽。请写出这两句。“①______，②______。”",
        "blanks": [
          "苔痕上阶绿",
          "草色入帘青"
        ],
        "explanation": "出自刘禹锡《陋室铭》。“上”与“入”呼应，“绿”与“青”呼应。注意“苔痕”的“痕”是病字旁。"
      },
      {
        "id": "dict-lower-lotus-clear-water",
        "level": "challenge",
        "prompt": "《爱莲说》中，写莲生在淤泥里仍保持洁净、经清水洗涤后仍质朴的两句应补在这里。“予独爱莲之①______，②______，中通外直……”",
        "blanks": [
          "出淤泥而不染",
          "濯清涟而不妖"
        ],
        "explanation": "出自周敦颐《爱莲说》。“濯”是洗涤，“涟”指细小的波纹。注意“淤”“濯”“涟”都有三点水。"
      },
      {
        "id": "dict-lower-jihai-petals",
        "level": "challenge",
        "prompt": "龚自珍在《己亥杂诗（其五）》中借花瓣落下后仍能滋养新花的景象，表达自己辞官后仍心系国家。请写出对应的两句。“①______，②______。”",
        "blanks": [
          "落红不是无情物",
          "化作春泥更护花"
        ],
        "explanation": "出自龚自珍《己亥杂诗（其五）》。“落红”指落花。注意“化作”用单人旁的“作”，“护”要用提手旁。"
      }
    ],
    "sources": [
      {
        "title": "国家中小学智慧教育平台《义务教育教科书·语文 七年级下册》（统编版）",
        "url": "https://v1.ykt.cbern.com.cn/65/document/206240c75072408bb343d0c403696efa/pdf.pdf",
        "note": "逐字核对默写所用古诗文原句，保留现行统编教材用字。"
      },
      {
        "title": "聊城市智慧教育平台 2026 年春《语文七年级下册》",
        "url": "https://lcsjyy.lcedu.cn/kcsq/index.php?id=9637&r=teach%2Fcourse%2Finfo&sid=6789",
        "note": "课程标注统编版（2024）七年级下册，目录可核实所选课文和课外诵读篇目。"
      },
      {
        "title": "江苏省昆山市2025—2026学年七年级下学期期末语文试卷（公开预览）",
        "url": "https://m.ht88.com/html/1/1030569.htm",
        "note": "公开预览第 2 题同时使用补写上下句和按情境默写。用于参考设问形式，练习题干另行编写。"
      }
    ]
  }
];

const chineseSubject = subjects.find(subject=>subject.id==='chinese');
chineseSubject.topics.unshift(...dictationTopics.map(topic=>({
  ...topic,
  questions:topic.questions.map(question=>({
    ...question, topic:topic.key, subject:chineseSubject.id, options:null, correct:question.blanks.join('，')
  }))
})));

lessonByTopic.set('dictation-upper', [
  '补全上下句时，先把前后两句连起来默读，再逐字写出空缺。按情境默写时，先找到题干里能指向原句的景物、动作或观点。',
  '写完检查字数和顺序。不要用读音相同的字替换原字。像「竦峙」「碧霄」这样的词可以连在原句中一起记。',
  '曹操《观沧海》描写草木繁盛。补写下句。树木丛生，______。',
  '百草丰茂。',
  '把「树木丛生」和「百草丰茂」按景物的对应关系记在一起。'
]);
lessonByTopic.set('dictation-lower', [
  '情境默写要同时看篇名和提示。双空通常按原文顺序填写，先确定是哪一联或哪两句，再逐空检查用字。',
  '别把相近的诗句混在一起。例如「自缘身在最高层」的「自缘」和「自从」意思不同，默写要按原文。',
  '李白《春夜洛城闻笛》先写笛声从不知名的人家传来，再写笛声随风传遍全城。补写下句。谁家玉笛暗飞声，______。',
  '散入春风满洛城。',
  '「散入」写声音随风传开，「满洛城」对应题干的「传遍全城」。'
]);
