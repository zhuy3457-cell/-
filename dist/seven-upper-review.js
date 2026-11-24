const sevenUpperReview = (() => {
  const choice = (prompt,options,index,explanation) =>
    ({prompt,options,correct:options[index],explanation,level:'standard'});
  const answer = (prompt,correct,lines) => ({
    prompt,correct:String(correct),options:null,level:'standard',explanation:lines.at(-1),
    solution:[{title:'列式与检验',lines}]
  });
  function topic(subject,key,title,description,notes,groups) {
    const questions = [];
    const sections = groups.map(([keySuffix,stage,items,table])=>({
      key:keySuffix,title:stage,ids:items.map(item=>{
        const id = key+'-'+(questions.length+1);
        questions.push({...item,id,stage,...(table ? {table} : {})});
        return id;
      })
    }));
    return {subject,key,title,description,range:'七年级上册',notes:notes.map(([label,text])=>({label,text})),sections,questions};
  }
  const grid = {
    caption:'经纬网定位图（各列是经线，各行是纬线）',
    headers:['纬度／经度','30°W','0°','30°E','60°E'],
    rows:[['60°N','—','—','—','C'],['30°N','A','—','B','—'],['0°','—','E','—','—'],['30°S','—','—','D','—']]
  };
  const orbit = {
    caption:'北半球一年中四个公转位置，按 A → B → C → D → A 依次经过',
    headers:['位置','直射点所在纬线','移动提示'],
    rows:[['A','赤道','直射点继续北移'],['B','北回归线','随后开始南移'],['C','赤道','直射点继续南移'],['D','南回归线','随后开始北移']]
  };
  const geography = topic('geography','geography-map-review','地理识图 · 经纬网与地球运动','根据经纬网、公转位置和俯视图方向练习读图。',[
    ['读图顺序','先确定纬线与经线，写坐标时标明 N、S、E、W。东西半球以 20°W 和 160°E 为界，南北半球以赤道为界。'],
    ['极地俯视','地球自西向东转。从北极上空看为逆时针，从南极上空看为顺时针。赤道是 0° 纬线，北极是 90°N。'],
    ['二分二至','北半球春分约 3 月 21 日、夏至约 6 月 22 日、秋分约 9 月 23 日、冬至约 12 月 22 日。用直射点的位置与移动方向一起判断。']
  ],[
    ['grid','经纬网定位',[
      choice('A 点的坐标是？',['30°S，30°W','30°N，30°W','30°N，30°E','60°N，30°W'],1,'A 在 30°N 行与 30°W 列的交点。'),
      choice('B 点在 D 点的什么方向？',['正南','正东','正北','西北'],2,'B 和 D 在同一条经线上，B 在北纬、D 在南纬。'),
      choice('A 点所在的半球是？',['北半球和西半球','北半球和东半球','南半球和西半球','南半球和东半球'],0,'30°N 在北半球，30°W 位于 20°W 以西的西半球。'),
      choice('图中位于本初子午线和赤道交点的是？',['A','B','D','E'],3,'0° 经线和 0° 纬线相交于 E。'),
      choice('按 0°–30° 为低纬、30°–60° 为中纬、60°–90° 为高纬的分界，C 在哪条分界线上？',['赤道','低、中纬分界','中、高纬分界','极圈'],2,'C 的纬度为 60°N，正好是北半球的中、高纬分界。')
    ],grid],
    ['orbit','地球公转图',[
      choice('哪两个位置全球昼夜大致等长？',['A、C','A、D','B、C','B、D'],0,'A、C 的直射点都在赤道，分别对应春分和秋分。'),
      choice('B 对应北半球哪个节气？',['春分','夏至','秋分','冬至'],1,'太阳直射北回归线时，北半球到夏至。'),
      choice('从 C 到 D，北京的白昼总体怎样变化？',['变长','先变长再变短','变短','不变'],2,'从秋分到冬至，太阳直射点南移，北半球中纬地区白昼变短。'),
      choice('D 时北极圈内有什么现象？',['极昼','昼夜等长','太阳直射','极夜'],3,'北半球冬至时，北极圈以内出现极夜。')
    ],orbit],
    ['poles','极地俯视',[
      choice('一幅图以北极为中心，从北极上空看，地球自转的箭头应怎样画？',['顺时针','逆时针','东西往复','由赤道指向北极'],1,'从北极上空看，地球自西向东的自转呈逆时针。'),
      choice('以南极为中心的经纬网图上，从南极沿同一条经线向外走，纬度怎样变化？',['南纬度数逐渐减小','南纬度数逐渐增大','先增大后减小','始终为 90°S'],0,'南极为 90°S，沿经线远离南极、接近赤道，南纬度数逐渐减小。')
    ]]
  ]);
  const history = topic('history','history-outline-review','七上历史思维导图 · 史前到夏商周','用时间轴、人物和器物线索串联前两个单元。',[
    ['史前社会','早期人类的生活可以从化石、石器和火的遗迹推断。河姆渡和半坡的农作物、房屋和生活环境可以对照记忆。'],
    ['夏商周','先记夏 → 商 → 西周，再把二里头遗址、甲骨文、西周分封制等线索放入对应位置。春秋、战国依时间先后排列。']
  ],[
    ['early','史前时期与文明起源',[
      choice('要研究北京人是否使用过火，哪类证据最直接？',['发现灰烬与烧骨','发现谷物种子','发现青铜礼器','发现竹简文字'],0,'灰烬和烧骨是火的遗迹，可以为判断用火提供证据。'),
      choice('河姆渡居民与半坡居民的主要农作物搭配正确的是？',['水稻—水稻','粟—水稻','水稻—粟','小麦—甘薯'],2,'河姆渡在长江流域，种水稻；半坡在黄河流域，种粟。'),
      choice('哪组证据能共同支持某处史前遗址已有定居农业？',['房屋遗迹与成批谷物','一块散落石片与河流','族谱与城门','一枚铜钱与一处足印'],0,'房屋对应定居，谷物对应农业生产。'),
      choice('良渚古城的大型工程和分等级的墓葬能为研究什么提供线索？',['远古人类的身高','社会分工与组织能力','近代工厂制度','文字印刷技术'],1,'大型工程涉及组织协作，墓葬差异是研究社会分化的证据之一。')
    ]],
    ['dynasties','夏商周与春秋战国',[
      choice('夏、商、西周的顺序是？',['夏 → 商 → 西周','商 → 夏 → 西周','西周 → 商 → 夏','夏 → 西周 → 商'],0,'夏、商、西周先后建立。'),
      choice('研究商代占卜和文字，可优先查阅什么材料？',['秦简','甲骨刻辞','唐代碑刻','宋代印本'],1,'甲骨文常刻在龟甲或兽骨上，可以用于研究商代占卜等问题。'),
      choice('西周王室授予诸侯土地与人民，并要求其承担义务。这对应什么制度？',['郡县制','行省制','分封制','科举制'],2,'西周通过分封建立诸侯国，并规定诸侯的义务。'),
      choice('铁制农具和牛耕推广，与战国各国变法的关系如何理解？',['它们导致农业停止发展','变法只讨论文字问题','变法与农业完全无关','生产力变化是社会变革的背景之一'],3,'生产工具与耕作方式进步，推动经济发展和社会关系变化。')
    ]]
  ]);
  const grammar = topic('english','english-grammar-map-review','七上英语语法知识梳理','按词性、句子成分与结构、时态、疑问词和代词梳理七上常用语法。',[
    ['词性与成分','词性说明词在词汇中的类别，句子成分说明它在某一句的作用。名词可以作主语，也可以作宾语。'],
    ['基础结构','S+V；S+V+O；S+V+C（如 She is friendly.）；S+V+间接宾语+直接宾语。先找谓语，再找其余成分。'],
    ['时态和提问','经常、习惯通常用一般现在时，正在发生常用现在进行时。how often 问频率，how long 问时长或长度，how many 问可数数量。'],
    ['代词','主语用 I、he、they，动词或介词后常用 me、him、them。my、his、their 可放在名词前。']
  ],[
    ['structure','词性与句子结构',[
      choice('In “Lily is friendly”, what part of speech is “friendly”?',['A noun.','An adjective.','A verb.','A preposition.'],1,'friendly 虽以 -ly 结尾，在这里是形容词，作表语。'),
      choice('Which word is the object in “We read books after school”?',['We','read','books','school'],2,'read 的对象是 books。school 是介词 after 的宾语，不是整句谓语的宾语。'),
      choice('Which sentence follows the subject + verb + object pattern?',['Birds fly.','The book is interesting.','They like science.','Anna looks happy.'],2,'They 是主语，like 是谓语，science 是宾语。'),
      choice('In “She gives me a book”, which phrase is the direct object?',['She','me','gives','a book'],3,'被给出的东西 a book 是直接宾语，接受者 me 是间接宾语。')
    ]],
    ['usage','时态、疑问词和代词',[
      choice('Tom usually ____ chess on Saturdays.',['play','plays','is playing','played'],1,'usually 表明习惯，Tom 是第三人称单数，用 plays。'),
      choice('Listen! The students ____ in the next room.',['sing','sings','are singing','sang'],2,'Listen! 提示正在发生，用 are singing。'),
      choice('—____ do you visit the museum? —Once a month.',['How long','How many','How often','How much'],2,'Once a month 表频率，应用 How often。'),
      choice('Mr Wu teaches ____ English. ____ lessons are interesting.',['we; He','us; His','our; Him','us; He'],1,'teaches 后用宾格 us，lessons 前用形容词性物主代词 His。')
    ]]
  ]);
  const takeRows = [
    ['take place','发生、举行','A school concert will take place on Friday.'],
    ['take the place of','代替、取代','Can a map app take the place of this paper map?'],
    ['take part in','参加活动','We take part in the reading festival.'],
    ['take pride in','以……为傲','They take pride in their school team.'],
    ['take care of','照顾、照料','I take care of the plants at home.'],
    ['take up','开始从事；占用','Mia wants to take up painting.'],
    ['take off','脱下；起飞','The plane will take off at ten.'],
    ['take away','拿走、带走','Please take away these empty boxes.'],
    ['take down','记下；取下','Take down this phone number, please.'],
    ['take on','承担','Our class will take on a new task.'],
    ['take over','接管、接替','Lee will take over the club next term.'],
    ['take back','收回；拿回','I take back what I said.'],
    ['take out','取出、拿出','Please take out your notebook.'],
    ['take in','理解、吸收','It is hard to take in all this information at once.'],
    ['take along','随身带上','You can take along a bottle of water.'],
    ['take care','小心；保重','Take care when you cross the road.'],
    ['take a rest','休息一下','Let’s take a rest after lunch.'],
    ['take a walk','散步','We often take a walk after dinner.'],
    ['take a photo','拍照',['take a photograph','take a picture']],
    ['take a bus','乘公共汽车','I take a bus to school.'],
    ['take a train','乘火车','We will take a train to Nanjing.'],
    ['take a seat','坐下、就座','Please take a seat by the window.'],
    ['take a message','捎个口信'],
    ['take an interest in','对……产生兴趣'],
    ['take pity on','同情、怜悯']
  ];
  const takeGroups = [takeRows.slice(0,10),takeRows.slice(10,20),takeRows.slice(20)].map((rows,group)=>[
    'day-'+(group+1),'第 '+(group+1)+' 组 · '+rows.length+' 个短语',rows.map(([correct,prompt,example])=>({
      prompt:'写出含 take 的短语。'+prompt+'。',correct,level:'basic',
      steps:[{label:'英文短语',answer:correct,text:'english',aliases:Array.isArray(example)?example:[]}],
      explanation:typeof example==='string' ? example : correct+' 可表示'+prompt+'。'
    }))
  ]);
  const take = topic('english','english-take-phrases','英语 take 动词短语','按截图可辨认的 25 个短语分组默写，前两组各 10 个。',[
    ['容易混淆','take place 指事件发生或举行，take the place of 指代替，take part in 指参加。'],
    ['小心和照顾','take care 单独用可表示小心或保重，take care of 后接需要照料的人或物。']
  ],takeGroups);
  const math = topic('math','math-equation-final-review','一元一次方程期末应用题','从拼图、容积、配套、盈亏、鸡兔同笼与行程情境中找等量关系。',[
    ['几何与配套','等长的边可以建立方程，体积等于底面积乘高。同种配套先按每套用量统一比例。'],
    ['盈亏与数量','物品总量固定时，两次分配都等于同一总量。两次给的数不同，可用差量反推人数。鸡兔同笼可以按总头数、总脚数列式。'],
    ['和差、倍数与平均','大数=(和+差)÷2，小数=(和−差)÷2。大数是小数 k 倍时，和对应 k+1 份，差对应 k−1 份。平均数等于总量除以总份数。'],
    ['行程','总路程等于速度乘时间。相向相遇用速度和，同向追及用速度差；平均速度用总路程除以总时间。']
  ],[
    ['models','几何、容积与配套',[
      answer('拼图中两条边等长。第一条由 3 段 x 厘米和 1 段 2 厘米拼成，第二条由 (x+2)、(x−4) 和 12 厘米三段拼成。求 x。',8,
        ['按等长列式 3x+2=(x+2)+(x−4)+12。','右边为 2x+10，得到 x=8。各段长度均为正。']),
      answer('密闭瓶容积 30 立方分米。瓶的下段是等截面的直筒，正放时液体高度 20 分米且位于直筒内；倒放时空气高度 5 分米且位于同一直筒内。求液体体积（立方分米）。',24,
        ['设直筒的底面积为 x 平方分米。液体占 20x，空气占 5x。','20x+5x=30，解得 x=6/5。','液体体积为 20×6/5=24。']),
      answer('每张桌子需要 1 个桌面和 4 条桌腿。每立方米木料可做 15 个桌面或 20 条桌腿。现有 30 立方米，要使桌面与桌腿刚好配套，应分多少立方米给桌面？','15/2',
        ['设 x 立方米做桌面，其余 30−x 做桌腿。','配套条件为 4×15x=20(30−x)。','80x=600，得 x=7.5，即 15/2 立方米。'])
    ]],
    ['counts','数量、倍数与盈亏',[
      answer('两数的和为 72，大数比小数多 16，求小数。',28,['设小数为 x，则大数为 x+16。','x+(x+16)=72，得 x=28。']),
      answer('两个数的和是 96，大数是小数的 3 倍，求大数。',72,['设小数为 x，大数为 3x。','4x=96，x=24，故大数是 72。']),
      answer('较大数是较小数的 4 倍，两数相差 36，求较大数。',48,['设较小数为 x，则 4x−x=36。','x=12，所以较大数为 4×12=48。']),
      answer('把同一批本子分给若干学生，每人 5 本剩 8 本，每人 7 本还差 6 本。共有多少名学生？',7,['设有 x 名学生，按总本数相等列式 5x+8=7x−6。','2x=14，所以有 7 名学生。']),
      answer('鸡兔同笼，共有 16 个头、44 只脚。兔有几只？',6,['设兔 x 只，鸡有 16−x 只。','4x+2(16−x)=44，得 x=6。'])
    ]],
    ['travel','相遇、追及与平均速度',[
      answer('甲、乙相距 240 米，同时相向出发，速度分别为每分钟 65 米和 55 米。几分钟相遇？',2,['设 x 分钟相遇，两人的路程之和为 240 米。','(65+55)x=240，得 x=2。']),
      answer('甲在乙前方 90 米，两人同时同向出发，甲速度为每分钟 60 米、乙为每分钟 75 米。乙几分钟追上甲？',6,['设 x 分钟追上，乙比甲多走 90 米。','(75−60)x=90，得 x=6。']),
      answer('沿一条路骑行 12 千米去公园，去时用 1 小时，返回同一路程用 2 小时。往返平均速度是多少千米/小时？',8,['往返总路程为 24 千米，总用时为 3 小时。','按总路程÷总时间，平均速度为 8 千米/小时。'])
    ]]
  ]);
  function multiple(prompt,fields,lines,numberLine) {
    const correct = fields.map(([,value])=>value).join(' / ');
    return {...answer(prompt,correct,lines),steps:fields.map(([label,value])=>({label,answer:String(value)})),
      ...(numberLine ? {numberLine} : {})};
  }
  function axis(points) {
    const first = points[0];
    const span = points.at(-1)-first;
    return {description:'数轴上从左到右标出 '+points.join('、')+'。',
      marks:points.map(value=>[15+70*(value-first)/span,String(value)])};
  }
  function roots(label,left,right) {
    return [['较小的 '+label,left],['较大的 '+label,right]];
  }
  const absolute = topic('math','math-absolute-distance-review','绝对值专题 · 零点分段、距离与最小值','从数轴距离理解绝对值，分组练习分段求解、距离和的最小值及异号判断。',[
    ['零点分段法','先把各绝对值内的式子分别令为零，再把零点按从小到大排序。按区间去绝对值，检查每个解是否落在对应区间。'],
    ['两个距离的和','若两个定点相距 d，动点在两点之间时距离和为 d。距离和若为 D>d，动点在两侧各有一个位置，离较近端点的距离为 (D−d)÷2。D=d 时整段都是解，D<d 时无解。'],
    ['绝对值之和的最小值','把定点从外向内配对，每对的距离和至少等于两点间距。各项系数相同且为正时，奇数个定点取中间一点，偶数个定点取中间两点之间的整段（含端点）。'],
    ['由绝对值判断同异号','两数同号或至少一个为零时，|a+b|=|a|+|b|。若出现严格小于，两数一定异号，此时 |a−b|=|a|+|b|。']
  ],[
    ['split','零点分段',[
      multiple('已知 |b+2|+|b−8|=20，求 b 的所有值。',roots('b',-7,13),[
        '零点是 −2 和 8，分为 b<−2、−2≤b≤8、b>8 三段。',
        '左段有 −(b+2)+(8−b)=20，得到 b=−7，符合左段条件。',
        '中段的距离和恒为 10，因此这一段没有解。',
        '右段有 (b+2)+(b−8)=20，得到 b=13，符合右段条件。因此 b=−7 或 13。'
      ],axis([-2,8])),
      multiple('若 |x+6|+|x−2|=10，求所有整数解。',roots('x',-7,3),[
        '零点为 −6 和 2，区间 [−6,2] 上距离和为 8，与 10 不等。',
        '左段有 −6−x+2−x=10，得到 x=−7；右段有 x+6+x−2=10，得到 x=3。',
        '两个解都在各自的区间内，且都是整数。'
      ],axis([-6,2]))
    ]],
    ['distance','数轴距离',[
      multiple('已知 |x−3|+|x−15|=20，求 x 的所有值。',roots('x',-1,19),[
        '定点 3 与 15 相距 12。两点之间距离和只有 12。',
        '在区间外，多出的 20−12=8 由两段相同的额外距离组成，所以近端点距离为 4。',
        '两侧分别得到 x=3−4=−1 和 x=15+4=19。'
      ],axis([3,15]))
    ]],
    ['minimum','绝对值之和的最小值',[
      multiple('求 |x+5|+|x−7|+|x−3| 的最小值及取最小值时的 x。',[['最小值',12],['x',3]],[
        '定点依次为 −5、3、7。外侧一对的距离和至少是 7−(−5)=12，在 [−5,7] 上取等。',
        '令剩下的 |x−3|=0，得到 x=3，原式最小值是 12。'
      ],axis([-5,3,7])),
      multiple('求 |x+5|+|x−7|+|x−1|+|x+2|+|x−3| 的最小值及取最小值时的 x。',[['最小值',17],['x',1]],[
        '定点依次为 −5、−2、1、3、7。从外向内配对，两对距离之和至少是 12+5=17。',
        '选 x=1 时，两对都取等且 |x−1|=0。因此最小值为 17，只在 x=1 时取得。'
      ],axis([-5,-2,1,3,7])),
      multiple('求 |x+3|+|x+5|+|x−4|+|x−6| 的最小值。再填写所有取到最小值的 x 所在闭区间的两个端点。',[['最小值',18],['左端点',-3],['右端点',4]],[
        '把定点 −5 和 6 配成一对，−3 和 4 配成一对，各对距离和至少为 11 和 7。',
        '两对同时达到下界需要 x 同时在 [−5,6] 与 [−3,4] 内。',
        '因此最小值为 18，当且仅当 −3≤x≤4。'
      ],axis([-5,-3,4,6])),
      multiple('求 |x+3|+|x−1|+|x−4| 的最小值及取最小值时的 x。',[['最小值',7],['x',1]],[
        'x 到 −3 与 4 的距离和至少为 7，区间 [−3,4] 内取等。',
        '取中间点 x=1，剩下的 |x−1|=0，所以最小值是 7。'
      ],axis([-3,1,4])),
      multiple('求 |y−3|+|y+1| 的最小值，再填写取到最小值的闭区间的两个端点。',[['最小值',4],['左端点',-1],['右端点',3]],[
        '两项是 y 到 3 和 −1 的距离，距离和至少是 3−(−1)=4。',
        '只要 −1≤y≤3，两段距离恰好拼成从 −1 到 3 的线段，故最小值为 4。'
      ],axis([-1,3]))
    ]],
    ['signs','同号与异号',[
      answer('已知 |a+b|=6，|a|+|b|=18，求 |a−b|。',18,[
        '因为 6<18，|a+b|<|a|+|b|，故 a、b 异号，且都不是 0。',
        '因此 a 与 −b 同号，|a−b|=|a|+|b|=18。'
      ])
    ]]
  ]);
  const quantities = topic('math','math-bar-model-review','数量关系入门 · 线段图','用线段图表示原有量、减少量和剩余量，再用算式或等量关系检验。',[
    ['画线段的顺序','把苹果线段分成两段等长的一半，后面接上梨。总数减少的部分，正是吃掉的一半苹果。']
  ],[
    ['fruit','线段图 · 苹果和梨',[
      {...multiple('苹果和梨一共 28 个。吃掉一半苹果后，还剩 22 个水果。原来苹果和梨各有多少个？',[['苹果个数',12],['梨的个数',16]],[
        '原有 28 个，剩下 22 个，所以吃掉 28−22=6 个，恰好是一半苹果。',
        '苹果原有 2×6=12 个，梨原有 28−12=16 个。',
        '检验：剩下的一半苹果 6 个加上 16 个梨，共 22 个。'
      ]),level:'basic',material:'原来（28 个）：[ 一半苹果 ][ 另一半苹果 ][ 梨 ]\n剩下（22 个）：[ 另一半苹果 ][ 梨 ]'}
    ]]
  ]);
  return [geography,history,grammar,take,math,absolute,quantities];
})();

for (const module of sevenUpperReview) {
  const subject = subjects.find(item=>item.id===module.subject);
  subject.topics.push({...module,term:'上',
    questions:module.questions.map(question=>({...question,subject:subject.id,topic:module.key}))});
}
