const englishGrammarModules = (() => {
  function english(answer, ...aliases) {
    return { answer, aliases };
  }

  function section(key, title, rows, { choice = false } = {}) {
    const questions = rows.map(([prompt, answers, explanation, number], i) => {
      const originalNumber = number ?? i + 1;
      const base = {
        id: 'english-grammar-' + key + '-' + originalNumber,
        level: choice ? 'standard' : 'basic',
        stage: title,
        prompt: String(originalNumber).padStart(2, '0') + '. ' + prompt
      };
      if (choice) {
        const [correctIndex, ...options] = answers;
        return { ...base, options, correct: options[correctIndex], explanation };
      }
      const entries = Array.isArray(answers) ? answers : [answers];
      const steps = entries.map((entry, k) => {
        const { answer, aliases = [], label } = typeof entry === 'string' ? {answer: entry} : entry;
        return { label: label ?? (entries.length === 1 ? '填写答案' : '第 ' + (k + 1) + ' 空'), answer, aliases, text: 'english' };
      });
      return { ...base, steps, correct: steps.map(step => step.answer).join(' / '), explanation };
    });
    return { key, title, questions };
  }

  function day(n, title, unit, description, notes, sections) {
    return {
      key: 'english-grammar-day' + n,
      title: 'Day ' + n + ' · ' + title,
      range: unit,
      description,
      notes: notes.map(([label, text]) => ({label, text})),
      sections: sections.map(part => ({key: part.key, title: part.title, ids: part.questions.map(q => q.id)})),
      questions: sections.flatMap(part => part.questions)
    };
  }

  const thirdPerson = [
    ['clean','cleans'], ['stay','stays'], ['talk','talks'], ['watch','watches'], ['do','does'],
    ['make','makes'], ['live','lives'], ['eat','eats'], ['study','studies'], ['play','plays'],
    ['pay','pays'], ['like','likes'], ['go','goes'], ['cook','cooks'], ['have','has'],
    ['take','takes'], ['swim','swims'], ['sing','sings'], ['buy','buys'], ['greet','greets']
  ].map(([verb, form]) => [
    verb + ' → 写出第三人称单数形式。', form,
    form === 'has' ? 'have 的第三人称单数形式是 has。'
      : form.endsWith('ies') ? '辅音字母加 y 结尾，变 y 为 i，再加 -es。'
      : form === verb + 'es' ? '这个动词的第三人称单数形式在词尾加 -es。'
      : '这个动词的第三人称单数形式在词尾直接加 -s。'
  ]);

  const day3 = day(3, '一般现在时', '原练习 Unit 2', '写动词第三人称单数，练习一般现在时的陈述句、否定句和疑问句。', [
    ['第三人称单数形式怎样变？','多数动词加 -s。watch、go、do 加 -es；辅音字母加 y 结尾时，把 y 改为 i 再加 -es。have 要改为 has。'],
    ['什么时候用 do 或 does？','实义动词的一般现在时疑问句中，第三人称单数用 does，其他主语通常用 do。do 或 does 后用动词原形。']
  ], [
    section('day3-verbs','第三人称单数变形',thirdPerson),
    section('day3-choice','单项选择',[
      ['___ she ___ the piano every day?', [2,'Do / plays','Does / plays','Does / play','Does / to play'],'she 是第三人称单数，用 Does，后面的动词用原形 play。'],
      ['John’s parents ___ to work ___ 7:00 ___ the morning.', [3,'goes / at / in','go / in / in','go / in / at','go / at / in'],'parents 是复数，用 go。钟点前用 at，in the morning 是固定搭配。'],
      ['I ___ 2 apples, but my sister ___ only 1.', [0,'have / has','have / have','has / have','has / has'],'I 后用 have。my sister 是第三人称单数，后用 has。'],
      ['He usually ___ sports games on TV in the evening.', [1,'watch','watches','watching','to watch'],'usually 表示习惯。主语 he 是第三人称单数，watch 变为 watches。'],
      ['—Do you have a pen? —Yes, I ___.', [0,'do','don’t','am','have'],'用 Do 提问，肯定简答用 Yes, I do.'],
      ['He ___ sports. He only ___ them on TV.', [0,'doesn’t play / watches','doesn’t play / watch','not play / watches','don’t play / watch'],'否定句用 doesn’t play。第二句是肯定句，he 后用 watches。'],
      ['I have a color pencil. He ___ one, too.', [1,'have','has','don’t have','doesn’t have'],'too 表示“也”。he 后用 has。'],
      ['Lily ___ playing football, but she doesn’t ___ playing tennis.', [2,'likes / likes','like / like','likes / like','like / likes'],'Lily 后用 likes，doesn’t 后用原形 like。'],
      ['Sam is a nice boy. He often ___ his teachers and classmates.', [0,'helps','is helping','help','helped'],'often 表示经常发生，用一般现在时。he 后用 helps。'],
      ['—Does John ___ in Jiangxi? —No. He ___ in Beijing now.', [0,'live / lives','lives / lives','live / lived','lives / lived'],'Does 后用 live。回答描述现在的居住情况，He 后用 lives。']
    ], {choice:true}),
    section('day3-fill','用所给词填空',[
      ['He always ___ (want) to be a coach.','wants','he 作主语，用 wants。'],
      ['When ___ you usually ___ (start) your class in the morning?',['do','start'],'主语是 you，用助动词 do。其后的 start 用原形。'],
      ['My mum often ___ (work) from Monday to Saturday.','works','My mum 是第三人称单数，work 加 -s。'],
      ['What ___ he usually ___ (do) after school?',['does','do'],'第一个空是助动词 does，第二个空是实义动词 do 的原形。'],
      ['Peter ___ (not have) any brothers.',english('doesn’t have','does not have'),'Peter 是第三人称单数，用 doesn’t，后接原形 have。'],
      ['There ___ (be) seven days in a week.','are','seven days 是复数，用 are。'],
      ['David often ___ (play) basketball on Sundays.','plays','David 是第三人称单数，play 直接加 -s。'],
      ['How ___ he ___ (get) to school every day?',['does','get'],'第三人称单数疑问句用 does，get 用原形。'],
      ['I ___ (have) a basketball and my sister ___ (have) a football.',['have','has'],'I 后用 have，my sister 后用 has。'],
      ['I often ___ (play) the piano on Saturdays.','play','I 作主语，一般现在时用动词原形。']
    ])
  ]);

  const day4 = day(4, '名词所有格', '原练习 Unit 2', '翻译所有格短语，区分共同所有、分别所有和 of 短语。', [
    ['撇号放在哪里？','单数名词或不以 s 结尾的复数名词通常加 ’s。以 s 结尾的复数直接加撇号，如 teachers’ office。'],
    ['两个人的物品是共用还是各有？','共同所有只在最后一个人名后加 ’s。分别所有通常在每个人名后都加 ’s，并按实际数量使用复数。']
  ], [
    section('day4-phrases','短语翻译',[
      ['Tom 的父母。','Tom’s parents','Tom 后加 ’s 表示所属。'],
      ['我弟弟的铅笔。',english('my brother’s pencil','my younger brother’s pencil','my little brother’s pencil'),'弟弟是单数，brother 后加 ’s。'],
      ['我父母的汽车。','my parents’ car','parents 是以 s 结尾的复数，只加撇号。'],
      ['Mary 和 Lily 的房间（共同拥有）。','Mary and Lily’s room','共同拥有一间房，只在 Lily 后加 ’s。'],
      ['Mary 和 Lily 的房间（分别拥有）。','Mary’s and Lily’s rooms','两人各有一间，两个人名都加 ’s，房间用复数。'],
      ['我叔叔的工作。',english('my uncle’s job','my uncle’s work'),'uncle 后加 ’s。'],
      ['老师们的办公室。',english('the teachers’ office','teachers’ office'),'teachers 是规则复数，只加撇号。'],
      ['Bob 的篮球。','Bob’s basketball','人名 Bob 后加 ’s。'],
      ['Peter 的书包。',english('Peter’s schoolbag','Peter’s school bag','Peter’s backpack'),'人名 Peter 后加 ’s。'],
      ['教师节。','Teachers’ Day','teachers 是以 s 结尾的复数，撇号在 s 后。'],
      ['父亲节。','Father’s Day','节日名称的惯用拼写是 Father’s Day。'],
      ['儿童节。','Children’s Day','children 是不以 s 结尾的不规则复数，后加 ’s。'],
      ['Lucy 的爷爷的农场。',english('Lucy’s grandfather’s farm','Lucy’s grandpa’s farm'),'两层所属关系分别加 ’s。'],
      ['我妹妹的风筝。',english('my sister’s kite','my younger sister’s kite','my little sister’s kite'),'sister 表示一个人，后加 ’s。'],
      ['学生的书。',english('the student’s book','a student’s book','the student’s books','a student’s books','the students’ book','the students’ books','students’ books'),'可按实际单复数选择 student’s 或 students’。'],
      ['Jack 的同学。',english('Jack’s classmate','Jack’s classmates'),'Jack 后加 ’s。题目未限定同学人数。'],
      ['教室的门。',english('the door of the classroom','the classroom door','the classroom’s door'),'物体的所属关系常可用 of 表达。'],
      ['桌子的腿。',english('the leg of the table','a leg of the table','a table leg','the table leg','the table’s leg','the legs of the table','the table legs','the table’s legs','the leg of a table','legs of the table'),'可用 of 短语，也可用 table leg。'],
      ['山顶。',english('the top of the mountain','the top of a mountain','the top of the hill','the mountaintop','mountaintop','the mountain top','the summit of the mountain'),'top of the mountain 是常见表达。'],
      ['我房间的窗户。',english('the window of my room','the window in my room','my room’s window'),'窗户和房间的所属关系可用 of 表示。']
    ]),
    section('day4-choice','单项选择',[
      ['—Is the schoolbag under the desk yours? —No, it’s my ___. He left it there just now.',[1,'brother','brother’s','brothers’','brothers’s'],'He 指一位哥哥或弟弟。brother’s 代替 brother’s schoolbag。'],
      ['—Tom, are these books ___? —No, they are ___. Mine are on that sofa.',[1,'mine / Jenny','yours / Jenny’s','mine / Jenny’s','yours / Jenny'],'问“你的吗”用 yours。Jenny’s 代替 Jenny’s books。'],
      ['—Where is my hat, Mom? —I think it’s in your ___ room.（两位祖父母共用的房间）',[3,'grandparent','grandparents','grandparent’s','grandparents’'],'祖父母是 grandparents，属于以 s 结尾的复数，后加撇号。'],
      ['—Is this ___ volleyball? —No. ___ is at her home.',[0,'Helen’s / Hers','Helen / Hers','Helen’s / She','Helen / She'],'用 Helen’s 修饰 volleyball，Hers 独立代替 Helen’s volleyball。'],
      ['This is ___ family photo. Can you find him in the photo?',[2,'Mary’s','your','Li Lei’s','her'],'him 指男性，语境中的人是 Li Lei。Li Lei’s 修饰 family photo。'],
      ['—What is ___ favourite subject? —PE.（问你父亲最喜欢的学科）',[2,'you father','your father','your father’s','your fathers’'],'your father 表示一位父亲，所属形式为 your father’s。'],
      ['I go to ___ home on Sunday.（我祖父母两人的家）',[3,'me grandparent’s','my grandparent’s','me grandparents’','my grandparents’'],'用 my 修饰 grandparents，复数 grandparents 后只加撇号。'],
      ['I am looking for a friend of ___ who lives in this neighborhood.',[1,'me','mine','my','I'],'a friend of mine 表示“我的一位朋友”，用名词性物主代词 mine。'],
      ['___ son is a student, but ___ daughter is not a student.',[0,'Mr Green’s / his','Mr Green’s / her','Mr Green / his','Mr Green / her'],'Mr Green’s 修饰 son，his 修饰同一人的女儿。'],
      ['That’s ___ bedroom. They use the same bedroom.',[3,'Lucy’s and Lily’s','Lucy and Lily','Lucy’s and Lily','Lucy and Lily’s'],'两人共同拥有，只在最后一个人名后加 ’s。']
    ], {choice:true}),
    section('day4-fill','用所给词填空',[
      ['The man is ___ (Tom) father.','Tom’s','Tom 后加 ’s，修饰 father。'],
      ['This dictionary is ___. (Helen)','Helen’s','Helen’s 可独立代替 Helen’s dictionary。'],
      ['Can you tell me your ___ (grandson) names?（几个孙子的名字）','grandsons’','grandsons 是规则复数，所有格只加撇号。'],
      ['This room is my ___ (parent). That one is ___ (I).（两位家长共用第一间）',['parents’','mine'],'parents’ 代替 parents’ room，mine 代替 my room。'],
      ['Have you finished ___ homework yet? (today)','today’s','today’s 修饰 homework，表示“今天的作业”。'],
      ['There are some books on the desk. They are ___ (I).','mine','mine 可以独立代替 my books。'],
      ['—Is the book under the desk ___ (your)? —No, it is my ___ (brother). His name is on it.',['yours','brother’s'],'yours 和 brother’s 都可独立代替对应的 book 短语。'],
      ['___ (Mike) parents took him to the Great Wall on his ninth birthday.','Mike’s','用 Mike’s 修饰 parents。'],
      ['___ (Tom and Bob) rooms are both very clean.','Tom’s and Bob’s','both 对应两间房，两个人各自拥有，人名后都加 ’s。'],
      ['Look at my room. That’s ___ (I) jacket, but these books are my ___ (sister).',['my','sister’s'],'my 修饰 jacket。my sister’s 独立代替 my sister’s books。']
    ])
  ]);

  const day5 = day(5, 'There be 句型', '原练习 Unit 3', '练习 be 的单复数、时态、就近一致和句型转换。', [
    ['There be 怎么选 is 或 are？','单数可数名词或不可数名词用 is，复数用 are。并列列举时按课内规则和紧跟 be 的名词保持一致。'],
    ['怎样变成一般疑问句？','把 be、will 或 can 等提前。There is/are 的一般疑问句中，表示不确定数量的 some 通常改为 any。']
  ], [
    section('day5-be','用 be 的适当形式填空',[
      ['There ___ some water in the bottle.','is','water 是不可数名词，用 is。'],
      ['There ___ some apples on the table.','are','apples 是复数，用 are。'],
      ['There ___ a book on the desk.','is','a book 是单数，用 is。'],
      ['There ___ two apples and an orange on the table.','are','离 be 最近的是复数 two apples，用 are。'],
      ['There ___ an orange and two apples on the table.','is','离 be 最近的是单数 an orange，用 is。'],
      ['There ___ some bread in the bag.','is','bread 是不可数名词，用 is。'],
      ['How many students ___ there in your classroom?','are','students 是复数，用 are。'],
      ['There ___ two English books and a Chinese book in my bag.','are','紧跟 be 的是复数 two English books，用 are。'],
      ['___ there any people in the room?','Are','people 是复数，疑问句把 Are 放在句首。'],
      ['There ___ all kinds of animals on my uncle’s farm.','are','all kinds of animals 是复数，用 are。表示在农场通常用 on the farm。']
    ]),
    section('day5-choice','单项选择',[
      ['There ___ a boy under the tree. He is ___.',[2,'is / sleep','has / sleep','is / sleeping','has / sleeping'],'a boy 是单数，用 There is。正在睡觉用 is sleeping。'],
      ['There ___ only one building in our school before.',[2,'is','are','was','were'],'before 表明是过去，one building 是单数，用 was。'],
      ['___ there any rivers in the park?（询问现在的情况）',[1,'Is','Are','Was','Were'],'现在时、rivers 是复数，用 Are。'],
      ['There ___ a lake or a forest beside the river.',[0,'isn’t','aren’t','don’t have','are'],'a lake 是单数。表示两者都没有时用 There isn’t ... or ...。'],
      ['—Are there any carrots in the basket? —No, ___.',[3,'there are','there isn’t','they aren’t','there aren’t'],'Are there ...? 的否定简答用 No, there aren’t.'],
      ['I like spring best because there ___ beautiful flowers everywhere.',[1,'is','are','was','were'],'表示春天通常有花，flowers 是复数，用 are。'],
      ['___ there a pet hospital in your city two years ago?',[2,'Is','Are','Was','Were'],'two years ago 表示过去，a pet hospital 是单数，用 Was。'],
      ['—Were there any tall buildings in your hometown twenty years ago? —Yes, ___.',[3,'they are','they were','there are','there were'],'Were there ...? 的肯定简答是 Yes, there were.'],
      ['There ___ some newspapers and a magazine on the table.（描述眼前的情况）',[1,'is','are','was','were'],'最近的名词 newspapers 是复数，且描述现在，用 are。'],
      ['There ___ a black dog in my house.（描述眼前的情况）',[0,'is','are','was','be'],'现在时、a black dog 是单数，用 is。']
    ], {choice:true}),
    section('day5-rewrite','句型转换',[
      ['There is a cat in the garden.（改为否定句）',english('There isn’t a cat in the garden.','There is not a cat in the garden.','There is no cat in the garden.'),'在 is 后加 not，也可用 no cat。'],
      ['There are some books on the shelf.（改为一般疑问句）','Are there any books on the shelf?','把 Are 提到句首，some 改为 any。'],
      ['There is a pen and two books on the desk.（改为一般疑问句）','Is there a pen and two books on the desk?','把 Is 提到句首，a pen 仍与 is 保持一致。'],
      ['There are two books and a pen on the desk.（改为否定句）',
        english('There aren’t two books and a pen on the desk.','There are not two books and a pen on the desk.','There aren’t two books or a pen on the desk.','There are not two books or a pen on the desk.'),
        '在 are 后加 not。保留数量时可仅否定原说法，若强调两类东西都没有，也可用 or。'],
      ['There will be a sports meeting next week.（改为一般疑问句）','Will there be a sports meeting next week?','把 Will 提到句首，后面保留 there be。'],
      ['There must be someone in the room.（改为否定句）',
        english('There can’t be anyone in the room.','There cannot be anyone in the room.','There can’t be anybody in the room.','There cannot be anybody in the room.','There mustn’t be anyone in the room.','There must not be anyone in the room.','There mustn’t be anybody in the room.','There must not be anybody in the room.'),
        '原句若表示肯定推测，否定推测通常用 can’t be anyone。must not be 也可表达“必须没有人”等否定要求。'],
      ['There is a bird singing in the tree.（对 in the tree 提问）',
        english('Where is there a bird singing?','Where is the bird singing?','Where is a bird singing?'),'对地点用 Where 提问。'],
      ['There are some children playing in the park.（对 some children 提问）',
        english('Who is playing in the park?','Who are playing in the park?','Who is there playing in the park?','Who are there playing in the park?'),'对人提问用 Who，保留动作 playing in the park。'],
      ['Are there any rivers in your town?（肯定回答和否定回答）',[
        {...english('Yes, there are.'),label:'肯定回答'},
        {...english('No, there aren’t.','No, there are not.'),label:'否定回答'}
      ],'肯定和否定都保留 there，助动词和问句中的 Are 一致。'],
      ['Is there a computer in the room?（肯定回答和否定回答）',[
        {...english('Yes, there is.'),label:'肯定回答'},
        {...english('No, there isn’t.','No, there is not.'),label:'否定回答'}
      ],'Is there ...? 的回答沿用 there is 或 there isn’t。']
    ])
  ]);

  const day6 = day(6, '方位介词', '原练习 Unit 3', '根据位置关系选介词，并翻译描述地点的句子。', [
    ['in front of 和 in the front of 有什么区别？','in front of 指在某物外部的前方。in the front of 指在某物内部靠前的位置，如司机坐在公交车前部。'],
    ['on the wall 和 in the wall 怎么区分？','on the wall 表示在墙面上，如画挂着。in the wall 表示在墙内部，如墙上有个洞。']
  ], [
    section('day6-fill','根据提示完成句子',[
      ['There is a park ___ our school.（在学校前面）','in front of','公园位于学校外部前方，用 in front of。'],
      ['Guangdong is ___ the south of China.（在中国范围内）','in','广东在中国范围内，表示区域内部用 in。'],
      ['There are many apples ___ the tree.（长在树上）','on','树上长出的果实用 on the tree。'],
      ['There is a hole ___ the wall.（在墙体里）','in','洞在墙体内部，用 in the wall。'],
      ['There is a ball ___ the chair.（在椅子下方）','under','under 表示在某物下面。'],
      ['My desk is ___ Tom’s desk.（紧挨着）',english('next to','beside','right next to'),'next to 或 beside 表示紧靠。'],
      ['The hospital is ___ the post office.（在……对面）',english('across from','opposite','directly opposite'),'across from 或 opposite 表示在对面。'],
      ['My book is ___ the table and the chair.（在两者之间）','between','在 A、B 两者之间用 between A and B。'],
      ['The teacher stands ___ the classroom.（在教室内部的前部）','in the front of','在教室内部的前部用 in the front of。'],
      ['There are three apple trees ___ the house.（在房子后面）','behind','behind 表示在某物后方。']
    ]),
    section('day6-choice','单项选择',[
      ['There is a tree ___ the house.（树在房子外面的前方）',[2,'on','in the front of','in front of','in'],'房子外部的前方用 in front of。'],
      ['Shanghai is ___ the east of China.',[1,'on','in','to','under'],'上海属于中国，在范围内用 in。'],
      ['There is a picture ___ the wall.',[0,'on','in','under','behind'],'挂在墙面上用 on the wall。'],
      ['The pens are ___ the desk.（在桌面上）',[1,'at','on','in front of','in'],'桌面是表面，用 on the desk。'],
      ['There is an umbrella ___ the door.（在门后面）',[0,'behind','in the front of','under','in'],'在门后用 behind the door。'],
      ['My bed is ___ the window.（紧挨着窗户）',[2,'under','on','next to','in'],'紧挨某物用 next to。'],
      ['The school is ___ the park.（在公园对面）',[1,'in','across from','on','under'],'across from 表示在对面。'],
      ['The cat is ___ the dog and the bird.（在两者之间）',[0,'between','in front of','behind','on'],'表示两者之间用 between ... and ...。'],
      ['There are some students ___ the classroom.（在教室里）',[0,'in','on','near','under'],'在教室内部用 in the classroom。'],
      ['The driver sits ___ the bus.（在车内的前部）',[1,'in front of','in the front of','behind','on'],'司机坐在车内前部，用 in the front of。']
    ], {choice:true}),
    section('day6-translate','句子翻译',[
      ['门后面有一把雨伞。',english('There is an umbrella behind the door.','There’s an umbrella behind the door.'),'an umbrella 是单数，用 There is。门后用 behind the door。'],
      ['我的床紧挨着窗户。',english('My bed is next to the window.','My bed is beside the window.','My bed is right next to the window.'),'next to 和 beside 都表示紧挨。'],
      ['学校在公园对面。',english('The school is across from the park.','The school is opposite the park.'),'对面可用 across from 或 opposite。'],
      ['我的书在桌子和椅子之间。',english('My book is between the table and the chair.','My book is between the desk and the chair.','My book is between the chair and the table.','My book is between the chair and the desk.'),'between ... and ... 表示两者之间。'],
      ['桌子上有一本书和两支钢笔。',english('There is a book and two pens on the table.','There is a book and two pens on the desk.','There are two pens and a book on the table.','There are two pens and a book on the desk.'),'按课内就近一致规则，先说 a book 用 is，先说 two pens 用 are。'],
      ['墙上有一幅画。',english('There is a picture on the wall.','There’s a picture on the wall.','There is a painting on the wall.','There’s a painting on the wall.'),'画挂在墙面上，用 on the wall。'],
      ['学校大厅在操场后面。',english('The school hall is behind the playground.','The school hall is behind the school playground.'),'学校大厅用 school hall，后面用 behind。'],
      ['图书馆在科学大楼和教学楼之间。',english('The library is between the science building and the teaching building.','The library is between the teaching building and the science building.'),'用 between ... and ... 连接两个地点。'],
      ['学生中心在食堂前面。',english('The student centre is in front of the dining hall.','The student center is in front of the dining hall.','The student centre is in front of the cafeteria.','The student center is in front of the cafeteria.'),'两个建筑的相对位置用 in front of，食堂可用 dining hall 或 cafeteria。'],
      ['邮局在医院对面。',english('The post office is across from the hospital.','The post office is opposite the hospital.'),'邮局用 post office，对面用 across from 或 opposite。']
    ])
  ]);

  const day7 = day(7, '连词', '原练习 Unit 4', '用 and、but、because、so 等连接信息，练习选择疑问句和按要求改写。', [
    ['and、but、because、so 分别连接什么关系？','and 表并列，but 表转折，because 引出原因，so 引出结果。'],
    ['because 和 so 可以同时用吗？','按课内规则，在表达同一个因果关系时通常只选 because 或 so。Because 引导的原因从句在句首时，主句前一般不加 so。']
  ], [
    section('day7-fill','用连词填空',[
      ['I like reading, ___ my sister likes reading too.','and','两个分句都说喜欢阅读，用 and 并列。'],
      ['They want to go swimming, ___ it is too hot.',english('but','because'),'but 表示太热成了阻碍。若意思是因为太热而想游泳，because 也成立。'],
      ['The countryside is so nice ___ quiet.','and','nice 和 quiet 是并列的形容词，用 and。'],
      ['They are very busy this afternoon, ___ they can’t come to your birthday party.','so','后半句是忙碌造成的结果，用 so。'],
      ['My mum will come to see me, ___ she will bring me something nice.','and','两件事并列，用 and。'],
      ['I can’t watch TV ___ I have too much homework.','because','作业太多是不能看电视的原因，用 because。'],
      ['I’m busy today, ___ I can’t go out with you.','so','后半句是今天忙造成的结果，用 so。'],
      ['This is my pen, ___ that is your pencil.',english('and','but','while'),'and 可以并列说明这两样东西。强调归属或物品的对比时也可用 but 或 while。'],
      ['My mom thinks the dress is nice, ___ it doesn’t look good on me.','but','裙子好看和穿在我身上不好看构成转折，用 but。'],
      ['He is tall, ___ his brother is short.',english('but','while','whereas'),'两人的身高形成对比，用 but 或表示对比的 while、whereas。']
    ]),
    section('day7-choice','单项选择',[
      ['I can’t call Miss Green ___ I don’t know her telephone number.',[2,'and','but','because','so'],'不知道电话号码是不能打电话的原因，用 because。'],
      ['I want to learn English well, ___ I listen to the radio every morning.',[0,'so','or','but','for'],'后半句说明为此采取的行动，用 so。'],
      ['—Why do you like this book? —___ it’s great fun.',[0,'Because','So','And','But'],'Why 问原因，答句用 Because。'],
      ['Gina and Lisa are good friends, ___ they aren’t my friends.',[1,'always','but','too','for'],'与我是否是朋友形成转折，用 but。'],
      ['I live close to the library, ___ I usually go there on foot.',[2,'and','because','so','but'],'步行是离图书馆近带来的结果，选 so。'],
      ['Mr Wang is very tired, ___ he goes to bed.',[3,'and','or','but','so'],'上床休息是累了的结果，选 so。'],
      ['The boy hurt himself ___ he climbed the tree and then fell out of it.',[0,'because','before','if','until'],'从树上跌落是受伤的原因，用 because。'],
      ['___ the teachers are all very nice and helpful, ___ I like my school very much.（∅ 表示不填词）',
        [3,'Because / so','Although / but','∅ / because','∅ / so'],'第一句给出原因，第二句给出结果。只在第二句前用 so。'],
      ['I can’t play with Alan ___ I have a lot of work to do.',[1,'so','because','but','and'],'工作很多是不能一起玩的原因，用 because。'],
      ['I like English ___ it’s very interesting.',[3,'or','but','so','because'],'英语有趣是喜欢英语的原因，用 because。']
    ], {choice:true}),
    section('day7-rewrite','按要求改写句子',[
      ['I like apples and oranges.（改为否定句，表达两种都不喜欢）',
        english('I don’t like apples or oranges.','I do not like apples or oranges.','I like neither apples nor oranges.'),'表达两者都不喜欢，通常用 don’t like ... or ...。'],
      ['Our room is small. Our room is tidy.（合并成一句话）',
        english('Our room is small but tidy.','Our room is small and tidy.','Our room is small, but it is tidy.','Our room is small, but it’s tidy.','Our room is small, but our room is tidy.','Our room is small, and it is tidy.'),'用 but 可突出“虽小却整洁”的转折。把两点当并列描述时也可用 and。'],
      ['He is very kind, so many people like him.（用 because 改写）',
        english('Many people like him because he is very kind.','Because he is very kind, many people like him.','Many people like him because he’s very kind.','Because he’s very kind, many people like him.'),'用 because 引出原因，原因从句可放在主句前或后。'],
      ['She is happy because she passed the exam.（对 because she passed the exam 提问）','Why is she happy?','对原因用 Why 提问，其后将 is 放到主语 she 前。'],
      ['I like strawberries and bananas.（用 or 改为选择疑问句）',
        english('Do you like strawberries or bananas?','Do I like strawberries or bananas?','Do you like bananas or strawberries?'),'把 and 改为 or 表示选择。问对方时用 Do you ...?'],
      ['I go to bed at ten at night.（对 at ten at night 提问）',
        english('What time do you go to bed?','When do you go to bed?','What time do you go to bed at night?','When do you go to bed at night?'),'问入睡时间可用 What time 或 When，再接 do you go to bed。'],
      ['I can’t go to the party because I am busy.（对 because I am busy 提问）',
        english('Why can’t you go to the party?','Why can you not go to the party?','Why cannot you go to the party?','Why can’t I go to the party?','Why can I not go to the party?'),'对原因用 Why，将 can’t 提到主语前。'],
      ['I am late for class because I get up late.（用 so 改写）',
        english('I get up late, so I am late for class.','I get up late, so I’m late for class.'),'先写起床晚这一原因，再用 so 引出迟到的结果。'],
      ['Chocolate isn’t healthy. It’s my favourite food.（用 but 合并）',
        english('Chocolate isn’t healthy, but it’s my favourite food.','Chocolate isn’t healthy, but it is my favourite food.','Chocolate is not healthy, but it’s my favourite food.','Chocolate is not healthy, but it is my favourite food.',
          'Chocolate isn’t healthy, but it’s my favorite food.','Chocolate isn’t healthy, but it is my favorite food.','Chocolate is not healthy, but it’s my favorite food.','Chocolate is not healthy, but it is my favorite food.'),
        '两句话是转折关系，用 but 连接。favourite 和 favorite 分别是英式、美式拼写。'],
      ['He can play the guitar. He can sing.（用 and 合并）',
        english('He can play the guitar and sing.','He can play the guitar and he can sing.','He can play the guitar and can sing.'),'两种能力并列，用 and 连接。相同的主语和 can 可以省略一次。']
    ])
  ]);

  const day8 = day(8, '情态动词 can', '原练习 Unit 5', '练习用 can 表示能力，完成肯定、否定、提问和简短回答。', [
    ['can 后的动词用什么形式？','can 后直接接动词原形。主语改变时 can 仍保持原形，如 Jenny can swim。'],
    ['can 的问句和否定句怎么写？','一般疑问句把 Can 提到主语前。否定在 can 后加 not，常写成 can’t 或 cannot。']
  ], [
    section('day8-choice','单项选择',[
      ['—Can you swim? —No, I ___.',[3,'do','don’t','can','can’t'],'用 Can 提问，否定简答用 No, I can’t.'],
      ['Bob can ___ and dance well.',[3,'sings','to sing','singing','sing'],'can 后用动词原形 sing，与 dance 并列。'],
      ['—___ you help me with my Chinese? —Yes, I ___.',[2,'Can / can’t','Can / may','Can / can','May / can'],'Can you ...? 可用于请求。肯定简答用 Yes, I can.'],
      ['—Mary, ___ you speak Chinese? —Yes, only a little.',[1,'must','can','need','can’t'],'询问能否说中文，用 Can you speak Chinese?'],
      ['Lucy is good at basketball. She ___ play basketball very well.',[0,'can','can’t','must','have to'],'is good at 表示擅长，所以用 can 表示能力。'],
      ['Superman is strong and brave. He ___ fly through the sky and fight bad people.',[1,'could','can','must','need'],'描述超人现在拥有的能力，用 can。'],
      ['Although she is eighty-five, she ___ still read without glasses.',[3,'could','might','must','can'],'still 表示现在仍有这一能力，用 can。'],
      ['My sister ___ play the piano very well, but she ___ play the guitar. She likes the guitar very much.（她会弹吉他）',
        [1,'can / can’t','can’t / can','can’t / can’t','can / can'],'后半句会弹吉他，用 can。but 构成转折，前半句用 can’t。'],
      ['—Can you play the guitar, Victor? —Yes, I can. But I ___ sing ___ dance.',[1,'can’t / and','can’t / or','can / or','can / and'],'but 引出不会的两件事，否定两项用 can’t ... or ...。'],
      ['—Could I smoke here, sir? —Sorry, I’m afraid you ___.',[1,'can','can’t','could','couldn’t'],'Could I ...? 礼貌地询问允许。拒绝时常用 Sorry, you can’t.'],
      ['—Can we eat in the classroom? —___. But we can eat in the dining hall.',
        [3,'Yes, we can','Yes, we do','No, we don’t','No, we can’t'],'教室里不能吃，食堂可以吃。Can 开头的问句用 can’t 作否定简答。'],
      ['—___ you come to my birthday party at 6:00 p.m.? —Sure, I’ll be there on time.',
        [2,'Must','Mustn’t','Can','Can’t'],'Can you ...? 可用来发出邀请。答句表示愿意准时到场。'],
      ['—Can we talk about the books in the library? —___. We have to be quiet.',
        [2,'Yes, we do','No, we don’t','No, we can’t','Yes, we can'],'必须保持安静，所以不能说话，回答 No, we can’t.'],
      ['I ___ dance, but I can sing.',[1,'can','can’t','must','don’t have to'],'but 引出对比，前半句表达不会跳舞，用 can’t。'],
      ['—Can she go out on school nights? —No, she ___. And I can’t, either.',
        [2,'doesn’t','don’t','can’t','isn’t'],'问句用 Can，否定回答用 she can’t。either 对应前面的否定。']
    ], {choice:true}),
    section('day8-rewrite','按要求改写句子',[
      ['She can play the violin.（改为否定句）',
        english('She can’t play the violin.','She cannot play the violin.','She can not play the violin.'),'在 can 后加 not，play 保持原形。'],
      ['Can he play basketball?（肯定回答）','Yes, he can.','Can 开头的一般疑问句用 Yes, 主语 + can 作肯定简答。'],
      ['I can sing.（改为一般疑问句）',
        english('Can you sing?','Can I sing?'),'把 Can 提到主语前。问对方时 I 改为 you。'],
      ['They like playing football.（对 football 提问）',
        english('What do they like playing?','What do they like to play?','What sport do they like playing?','What sport do they like to play?'),'对运动项目用 What 或 What sport。主语是 they，用助动词 do。'],
      ['She can play the piano.（对 piano 提问）',
        english('What can she play?','What instrument can she play?','Which instrument can she play?'),'询问能演奏哪种乐器，把 What instrument 或 What 放在句首，随后接 can she play。'],
      ['You can play the violin.（用 Jenny 作主语）','Jenny can play the violin.','主语换成 Jenny，can 和后面的动词原形都保持不变。'],
      ['Tony can sing and dance.（改为否定句，表示两种都不会）',
        english('Tony can’t sing or dance.','Tony cannot sing or dance.','Tony can not sing or dance.','Tony can neither sing nor dance.'),'否定两种能力可用 can’t ... or ...，也可用 neither ... nor ...。'],
      ['Can he speak English?（肯定回答和否定回答）',[
        {...english('Yes, he can.'),label:'肯定回答'},
        {...english('No, he can’t.','No, he cannot.','No, he can not.'),label:'否定回答'}
      ],'两句都用 he，肯定用 can，否定用 can’t。'],
      ['The students can dance.（对 dance 提问）','What can the students do?','问会做什么，用 What can + 主语 + do?'],
      ['My mother can play the piano.（改为一般疑问句）',
        english('Can your mother play the piano?','Can my mother play the piano?'),'把 Can 提到主语前。询问对方的妈妈时，可把 my 改为 your。']
    ])
  ]);

  const numberWords = [
    'zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen',
    'fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'
  ];
  const tens = ['','','twenty','thirty','forty','fifty'];

  function spellNumber(n) {
    if (n < 20) return numberWords[n];
    const ones = n % 10;
    return tens[Math.floor(n / 10)] + (ones ? '-' + numberWords[ones] : '');
  }

  function timeRow(hour, minute) {
    const directHour = spellNumber(hour);
    const direct = minute < 10
      ? english(directHour + ' oh ' + spellNumber(minute),directHour + ' o ' + spellNumber(minute),directHour + ' zero ' + spellNumber(minute))
      : english(directHour + ' ' + spellNumber(minute));
    const remaining = minute > 30 ? 60 - minute : minute;
    const relation = minute > 30 ? 'to' : 'past';
    const reverseHour = spellNumber(minute > 30 ? hour % 12 + 1 : hour);
    const end = ' ' + relation + ' ' + reverseHour;
    const quantity = spellNumber(remaining);
    const minutes = quantity + (remaining === 1 ? ' minute' : ' minutes');
    const reverse = remaining === 15
      ? english('a quarter' + end,'quarter' + end,quantity + end,minutes + end)
      : remaining === 30
        ? english('half' + end,quantity + end,minutes + end)
        : english((remaining < 5 ? minutes : quantity) + end,(remaining < 5 ? quantity : minutes) + end);
    const explanation = minute > 30
      ? '逆读时距下一整点还有 ' + remaining + ' 分钟，用 ' + reverse.answer + '。'
      : '逆读时表示过了整点 ' + remaining + ' 分钟，用 ' + reverse.answer + '。';
    return [
      hour + ':' + String(minute).padStart(2,'0') + '（写出顺读法和逆读法）',
      [{...direct,label:'顺读法'},{...reverse,label:'逆读法'}],
      explanation + (minute < 10 ? '顺读时个位分钟前通常读 oh。' : '')
    ];
  }

  const times = [
    [2,14],[1,45],[6,30],[9,58],[12,15],[3,25],[8,36],[5,45],[11,35],[7,18],
    [4,2],[10,44],[1,30],[7,15],[12,45],[9,8],[3,31],[5,50],[8,20],[12,48]
  ];
  const day9 = day(9, '时间表达和频度副词', '原练习 Unit 6', '练习钟点的两种读法、时间介词、频度副词和时间提问。改写部分保留截图可见的原题号。', [
    ['时间顺读和逆读有何区别？','顺读先说小时，再说分钟。逆读用 past 表示过了当前整点多少分钟，用 to 表示离下一整点还有多少分钟。15 分钟常说 a quarter，30 分钟常说 half。'],
    ['at、on、in 怎么选？','钟点前用 at，具体哪一天或那一天的上午用 on，泛指上午或月份用 in。'],
    ['频度副词常放在哪？','通常在实义动词前、be 动词后。always 表示总是，usually 是通常，sometimes 是有时，seldom 是很少，never 是从不。']
  ], [
    section('day9-time','时间顺读与逆读',times.map(([hour, minute]) => timeRow(hour, minute))),
    section('day9-choice','单项选择',[
      ['—When do you plan to meet for your school trip? —___ 7:00 ___ Sunday morning.',
        [1,'At / in','At / on','On / in','On / on'],'钟点前用 at，指定的星期天早晨前用 on。'],
      ['My birthday is ___ May and his birthday is ___ March 26th.（∅ 表示不填词）',
        [3,'in / in','in / ∅','for / on','in / on'],'月份 May 前用 in，具体日期 March 26th 前用 on。'],
      ['They ___ play basketball after school. I can see them on the sports field every day.',
        [3,'usually','seldom','never','always'],'every day 表示每天，四个选项里 always 最符合语境。'],
      ['Linda is ___ late for school because she ___ gets up early.',
        [2,'usually / never','usually / always','never / always','always / never'],'总是早起解释了为什么从不迟到，用 never 和 always。'],
      ['We have science ___ nine o’clock ___ the morning.',
        [1,'in / at','at / in','on / in','at / on'],'at nine o’clock 表示在九点。in the morning 表示在上午。'],
      ['—The match starts at 9:15. —Well, it is ___ now. We have thirty minutes for a drink.',
        [2,'half past nine','a quarter past eight','a quarter to nine','a quarter to eight'],'9:15 往前推 30 分钟是 8:45，即 a quarter to nine。'],
      ['—Excuse me. What’s the English for “6:45”? —It’s ___.',
        [2,'a quarter to six','a quarter past six','a quarter to seven','a quarter past seven'],'6:45 距七点还有 15 分钟，用 a quarter to seven。'],
      ['—___ do you get up in the morning? —I get up at six forty.',
        [1,'What colour','What time','Where','How'],'答句给出六点四十，问具体钟点用 What time。'],
      ['—___ do you have your maths lesson? —On Monday.',
        [0,'When','What time','What','Where'],'答句是星期一，问哪天用 When。'],
      ['—___ do you have dinner every day? —At six o’clock.',
        [1,'Why','What time','What day','Where'],'答句给出六点整，选择 What time。']
    ], {choice:true}),
    section('day9-rewrite','按要求改写句子',[
      ['I get up at six o’clock.（对 at six o’clock 提问）',
        english('What time do you get up?','When do you get up?','What time do I get up?','When do I get up?'),'对具体钟点用 What time。问对方时用 do you get up。',1],
      ['I go to the park on Sundays.（对 on Sundays 提问）',
        english('When do you go to the park?','When do I go to the park?','What day do you go to the park?','On what day do you go to the park?'),'对星期几提问，一般用 When 或 What day。',4],
      ['He has lunch at twelve.（对 at twelve 提问）',
        english('What time does he have lunch?','When does he have lunch?'),'对钟点提问用 What time。he 用助动词 does，has 恢复原形 have。',5],
      ['She sometimes goes shopping.（改为一般疑问句）',
        'Does she sometimes go shopping?','用 Does 构成一般疑问句，goes 恢复原形 go。',6],
      ['I will never forget this day.（改为一般疑问句）',
        english('Will you ever forget this day?','Will you never forget this day?','Will I ever forget this day?','Will I never forget this day?'),
        '把 Will 提到主语前。直接问“会不会有一天忘记”常用 ever；保留否定含义时也可保留 never。',7],
      ['They usually play basketball.（对 play basketball 提问）',
        'What do they usually do?','整个动作被划线，问“通常做什么”，第一个 do 是助动词，第二个 do 表示所问的动作。',8],
      ['He goes on a trip in summer.（对 in summer 提问）',
        english('When does he go on a trip?','In which season does he go on a trip?','What season does he go on a trip?'),
        '问在什么时间或季节出行，用 When 或 In which season。does 后用 go。',9],
      ['It’s ten o’clock.（用 What time 提问）',
        'What time is it?','What time 提到句首，后面用 is it。',10]
    ])
  ]);

  const numerals = [
    ['三','three'], ['九','nine'], ['十一','eleven'], ['十二','twelve'], ['十三','thirteen'],
    ['十五','fifteen'], ['十九','nineteen'], ['二十','twenty'], ['二十一','twenty-one'], ['三十','thirty'],
    ['四十','forty'], ['五十','fifty'], ['九十','ninety'],
    ['一百',english('one hundred','a hundred')], ['一千',english('one thousand','a thousand')],
    ['第一','first'], ['第二','second'], ['第三','third'], ['第五','fifth'], ['第九','ninth'],
    ['第十','tenth'], ['第十一','eleventh'], ['第十二','twelfth'], ['第十三','thirteenth'], ['第二十','twentieth'],
    ['第二十一','twenty-first'], ['第二十二','twenty-second'], ['第二十三','twenty-third'], ['第三十','thirtieth'], ['第三十一','thirty-first']
  ].map(([chinese, answer], i) => {
    const word = typeof answer === 'string' ? answer : answer.answer;
    const kind = i < 15 ? '基数词' : '序数词';
    return ['写出「'+chinese+'」对应的英文'+kind+'。',answer,
      kind+'写作 '+word+'。'+(word.includes('-')?'书写时在十位和个位之间加连字符。':'')];
  });
  const day10 = day(10, '数词', '原练习 Unit 7', '练习基数词、序数词的拼写，并在日期、顺序和年龄表达中使用。', [
    ['什么时候用基数词、什么时候用序数词？','基数词表示数量，如 seven days。序数词表示次序或日期，如 the first day 和 May fourth。序数词前已有物主限定词时通常不用 the，如 her ninth birthday。'],
    ['复合序数词怎么写？','通常只把最后一个数词变成序数词，并保留连字符，如 twenty-first。注意 fifth、ninth、twelfth、twentieth 的拼写。'],
    ['年龄用连字符时怎样写？','修饰名词时写 an eight-year-old girl，year 保持单数。单独说年龄用 She is eight years old.']
  ], [
    section('day10-numbers','基数词和序数词拼写',numerals),
    section('day10-choice','单项选择',[
      ['There are ___ days in a week. Sunday is the ___ day of the week.（按美国日历的常见排法）',
        [0,'seven / first','seven / one','seventh / first','seventh / one'],'表示天数用基数词 seven。按本题的日历排法，星期日排第一，用 first。'],
      ['—Which sweater is yours? —The ___ one is ___.',[0,'third / mine','five / my','sixth / me','two / mine'],
        '序数词 third 表示第三件。mine 独立使用，指 my sweater。'],
      ['We shared a nice cake ___ her sister’s ___ birthday.',[3,'on / nine','in / ninth','at / nine','on / ninth'],
        '在具体的生日当天用 on。第九个生日用序数词 ninth。'],
      ['My grandparents have ___ daughters. My mother is their ___ daughter.',
        [3,'fourth / third','fourth / three','four / three','four / third'],'女儿人数用基数词 four，排行第三用序数词 third。'],
      ['There are ___ months in a year. September is the ___ month.',
        [2,'twelve / nine','twelfth / nineth','twelve / ninth','twelfth / nine'],'一年有十二个月，用 twelve。九月是第九个月，用 ninth。'],
      ['Mary is ___ girl.',[3,'an 8 year old','8-years-old','the 8 years old','an 8-year-old'],
        '修饰 girl 用 8-year-old，三部分用连字符连接，year 不加 s。8 读作 eight，以元音音素开头，用 an。'],
      ['Which number is spelled incorrectly?', [1,'ninety','ninteen','ninth','nineteenth'],
        '十九正确写法为 nineteen，保留 nine 末尾的 e。'],
      ['—How many magazines do you have? —I have ___.',[0,'two','both','twice','the second'],
        'How many 询问数量，直接用基数词 two 回答。'],
      ['In February of a leap year, there are only ___ days.（闰年）',
        [2,'twenty nine','twenty-nineth','twenty-nine','twenty eight'],
        '闰年二月有 29 天，基数词写作 twenty-nine，十位和个位之间加连字符。'],
      ['—When is your birthday? —It’s May ___.',[2,'four','fourteen','fourth','forty'],
        '按本题日期表达规则，某月的第几天用序数词。五月四日可读作 May fourth。']
    ], {choice:true}),
    section('day10-fill','用所给词填空',[
      ['Thursday is ___ (five) day of a week.（按美国日历的常见排法）','the fifth',
        '按题目的周日起始排法，周四排第五。fifth 是序数词，这里还需要定冠词 the。'],
      ['I think the ___ (ten) lesson is the most difficult in this book.','tenth','第十课用序数词 tenth，the 已经给出。'],
      ['Her birthday is on ___ (twenty) of July.','the twentieth','七月二十日可写作 the twentieth of July，注意 twenty 变为 twentieth。'],
      ['Helen, it’s your turn. You’re the ___ (nine) one.','ninth','表示排第九，用序数词 ninth。'],
      ['The ___ (two) car drives fast.','second','表示第二辆车，用序数词 second。'],
      ['There are ___ (twelve) months in a year. December is the ___ (twelve) one.',
        ['twelve','twelfth'],'第一个空表示月份数量，用 twelve。第二个空表示次序，用 twelfth。'],
      ['Yesterday was the ___ (twenty-two) of August.','twenty-second',
        '复合序数词只把最后一个词 two 改为 second，保留连字符。'],
      ['Today is his ___ (fourteen) birthday.','fourteenth','第十四个生日用序数词 fourteenth。his 后直接接序数词。'],
      ['He lived on the ___ (one) street.','first','one 的序数词是不规则形式 first。'],
      ['There are ___ (eighteenth) mangoes in the basket.','eighteen','此处表示芒果数量，用基数词 eighteen。']
    ])
  ]);

  const day11 = day(11, '特殊疑问句', '原练习 Unit 7', '根据答句选择疑问词，练习询问日期、数量、价格、年龄和地点。', [
    ['how many 和 how much 有什么区别？','How many 后接可数名词复数，问数量。How much 可问不可数名词的量，也可问价格，如 How much are these shoes?'],
    ['怎样确定疑问词？','问人物用 Who，问地点用 Where，问日期或时间用 When，问年龄用 How old，问状态或感受用 How。']
  ], [
    section('day11-choice','单项选择',[
      ['—___ is your English teacher? —Mrs Wang.',[0,'Who','How','What','Why'],'答句给出老师是谁，用 Who。'],
      ['—___ chocolate do you want to buy? —Only a little.',[1,'How many','How much','How old','How heavy'],
        'chocolate 在这里是不可数名词，用 How much 问量。'],
      ['—___ hamburgers do you want? —Two, please. And ___ are they? —They’re 12 yuan.',
        [2,'How much / how much','How many / how many','How many / how much','How much / how many'],
        'hamburgers 是可数名词复数，问数量用 How many。答 12 yuan 的问题问的是价格，用 how much。'],
      ['—___ is your new school, Kitty? —It’s beautiful and modern.',[1,'What','How','Which','Where'],
        '答句描述学校的样子，用 How 询问对学校的看法。'],
      ['—___ is your sister, Bob? —She is ten.',[1,'How much','How old','Who','How'],'She is ten 回答年龄，用 How old。'],
      ['—___ is your brother? —He’s five.',[1,'How','How old','What','Where'],'He’s five 说明年龄，用 How old。'],
      ['—___ is she? —She is fine.',[1,'How old','How','Where','What'],'fine 描述近况，问她怎么样用 How。'],
      ['—___ is this book? —20 yuan.',[3,'How often','How long','How many','How much'],'答句给出价格，用 How much。'],
      ['—___ bread would you like? —Three pieces of ___.',
        [3,'How many / breads','How many / bread','How much / breads','How much / bread'],
        'bread 在这里不可数，问量用 How much。计数由 pieces 表示，of 后的 bread 不加 s。'],
      ['—___ is Mike? —Oh, he is in the classroom.',[1,'Who','Where','What','How'],'in the classroom 说明地点，用 Where。']
    ], {choice:true}),
    section('day11-rewrite','按要求改写句子',[
      ['My birthday is on the third of June.（对 on the third of June 提问）',
        english('When is your birthday?','When is my birthday?'),'对日期用 When。转为向对方提问时，my 改为 your。'],
      ['There are forty people in the classroom.（对 forty people 提问）','How many people are there in the classroom?',
        '问人数用 How many people，再接疑问语序 are there。'],
      ['The price of this T-shirt is 30 yuan.（用 How much 提问）',
        english('How much is this T-shirt?','How much does this T-shirt cost?'),'询问价格可用 How much is ...? 或 How much does ... cost?'],
      ['Her birthday is on February 12th.（对 on February 12th 提问）','When is her birthday?','对日期用 When 提问。'],
      ['There is some juice in the glass.（对 some 提问）','How much juice is there in the glass?',
        'juice 是不可数名词。问有多少果汁，用 How much juice，再接 is there。'],
      ['I will have a party on my fiftieth birthday.（对 on my fiftieth birthday 提问）',
        english('When will you have a party?','When will I have a party?'),'问将来的时间用 When，接着把 will 放到主语前。'],
      ['The event is on September 25th, 2023.（对 on September 25th, 2023 提问）','When is the event?',
        '对具体年月日提问用 When，把 is 放到 the event 前。'],
      ['These shoes are 80 yuan.（用 How much 提问）',
        english('How much are these shoes?','How much do these shoes cost?'),'问价格用 How much。these shoes 是复数，搭配 are 或 do。'],
      ['There are six apples on the tree.（对 six 提问）','How many apples are there on the tree?',
        'apples 是可数名词复数，用 How many apples 问数量。'],
      ['What’s the price of that hat?（用 How much 提问）',
        english('How much is that hat?','How much does that hat cost?'),'How much is that hat? 和 How much does that hat cost? 都可询问那顶帽子的价格。']
    ])
  ]);

  return [day3, day4, day5, day6, day7, day8, day9, day10, day11];
})();

const englishGrammarByTopic = new Map(englishGrammarModules.map(module => [module.key,module]));
const englishGrammarSubject = subjects.find(subject => subject.id === 'english');
for (const module of englishGrammarModules) {
  englishGrammarSubject.topics.push({
    key: module.key,
    title: module.title,
    term: '上',
    description: module.description,
    questions: module.questions.map(question => ({...question, subject: englishGrammarSubject.id, topic: module.key}))
  });
}
