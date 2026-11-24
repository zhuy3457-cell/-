const courseCatalog = (() => {
  const topics = new Map(subjects.flatMap(subject => subject.topics.map(topic => [topic.key, topic])));
  const fullGroup = (key, title = topics.get(key).title) =>
    ({key, title, ids: topics.get(key).questions.map(question => question.id)});
  const sectionGroup = (module, index) => {
    const {key, title, ids} = module.sections[index];
    return {key: module.key + '-' + key, title, ids};
  };
  const writingGroup = (ids) => ({key: 'dictation', title: '课文默写', ids});
  const makeCourse = (key, title, description, groups, studyKeys = [], sources = []) =>
    ({key, title, description, groups, studyKeys, sources, ids: [...new Set(groups.flatMap(group => group.ids))]});
  const topicCourse = (key, practiceTitle = '本课练习') => {
    const topic = topics.get(key);
    return makeCourse(key, topic.title, topic.description, [fullGroup(key, practiceTitle)], [key]);
  };

  const grammarByUnit = [
    englishPronounModules.map(module => module.key),
    ['english-grammar-day3', 'english-grammar-day4'],
    ['english-grammar-day5', 'english-grammar-day6'],
    ['english-grammar-day7'],
    ['english-grammar-day8'],
    ['english-grammar-day9'],
    ['english-grammar-day10', 'english-grammar-day11'],
    []
  ];
  const classroomByUnit = [englishClassroomModules.slice(0,2),englishClassroomModules.slice(2,3)];
  const moduleGroups = (module,prefix = '') => module.sections.map((section,index)=>({
    ...sectionGroup(module,index),title:prefix+section.title
  }));
  const [unitOneVocab,unitTwoVocab,sentenceSheet] = englishVocabModules;
  const vocabByUnit = [unitOneVocab,unitTwoVocab];
  const sentenceGroups = [[sectionGroup(sentenceSheet,0),sectionGroup(sentenceSheet,2)],[sectionGroup(sentenceSheet,1)]];
  const english = englishPhraseModules.map(unit => {
    const index = unit.unit - 1;
    const check = englishCourseChecks[index];
    const grammar = grammarByUnit[index];
    const classroom = classroomByUnit[index] ?? [];
    const vocab = vocabByUnit[index];
    return makeCourse('unit-' + unit.unit, unit.title, topics.get(check).description,
      [fullGroup(check, '随堂小测'), ...unit.sections.map((section, i) => sectionGroup(unit, i)),
        ...grammar.map(key => fullGroup(key)),
        ...classroom.flatMap(module=>moduleGroups(module,module.title.split(' · ')[1]+' · ')),
        ...(vocab ? [...moduleGroups(vocab),...sentenceGroups[index]] : [])],
      [unit.key, ...grammar, ...classroom.map(module=>module.key),...(vocab ? [vocab.key,sentenceSheet.key] : [])]);
  });
  const englishWorksheets = [...englishClassroomModules,...englishVocabModules].map(module=>
    makeCourse(module.key,module.title,module.description,moduleGroups(module),[module.key],module.sources));

  const [classics, scenery] = publicStudyCollections.chinese;
  const chinese = [
    makeCourse('guan-cang-hai', '《观沧海》', '辨析海景中的实景与想象，再检查诗句默写。',
      [sectionGroup(scenery, 0), writingGroup(['dict-upper-sea-islands'])], [], scenery.sources.slice(0, 2)),
    makeCourse('yong-xue', '《咏雪》', '辨析两种咏雪比喻，理解人物对话。',
      [sectionGroup(classics, 1)], [], classics.sources),
    makeCourse('chen-tai-qiu', '《陈太丘与友期行》', '结合对话判断守信、知礼和人物态度。',
      [sectionGroup(classics, 0)], [], classics.sources),
    makeCourse('analects', '《论语》十二章', '用原句理解学习方法与自我反省，练习字词与默写。',
      [fullGroup(analectsCourseCheck, '字词与文意'),
        writingGroup(['dict-upper-analects-diligent', 'dict-upper-analects-think', 'dict-upper-analects-will'])], [],
      dictationTopics[0].sources),
    makeCourse('jie-zi-shu', '《诫子书》', '按默写、字词翻译、论证和对比阅读练习。',
      jiezishuModules.map(module => fullGroup(module.key)), jiezishuModules.map(module => module.key))
  ];
  const poems = {
    上: [
      ['bei-gu-shan', '《次北固山下》', 'dict-upper-beigu-time', 'dict-upper-beigu-letter'],
      ['qiu-si', '《天净沙·秋思》', 'dict-upper-autumn-dusk'],
      ['qiu-ci', '《秋词》（其一）', 'dict-upper-crane-sky'],
      ['ye-yu-ji-bei', '《夜雨寄北》', 'dict-upper-west-window', 'hard-zh-night-rain-present'],
      ['wen-di', '《夜上受降城闻笛》', 'dict-upper-flute-home'],
      ['feng-yu-da-zuo', '《十一月四日风雨大作》（其二）', 'dict-upper-luyou-dream'],
      ['tong-guan', '《潼关》', 'dict-upper-tongguan-cloud']
    ],
    下: [
      ['mu-lan-shi', '《木兰诗》', 'dict-lower-mulan-frontier-night'],
      ['zhu-li-guan', '《竹里馆》', 'dict-lower-bamboo-solitude'],
      ['feng-ru-jing-shi', '《逢入京使》', 'dict-lower-capital-messenger'],
      ['you-zhou-tai', '《登幽州台歌》', 'dict-lower-youzhou-universe'],
      ['wang-yue', '《望岳》', 'dict-lower-wangyue-view'],
      ['fei-lai-feng', '《登飞来峰》', 'dict-lower-feilaifeng-height'],
      ['shan-xi-cun', '《游山西村》', 'dict-lower-shanxi-road'],
      ['ji-hai-za-shi', '《己亥杂诗》（其五）', 'dict-lower-jihai-petals'],
      ['lou-shi-ming', '《陋室铭》', 'dict-lower-loushi-green'],
      ['ai-lian-shuo', '《爱莲说》', 'dict-lower-lotus-clear-water'],
      ['bo-qin-huai', '《泊秦淮》', 'dict-lower-qinhuai-berth'],
      ['yue-ke', '《约客》', 'dict-lower-yueke-wait']
    ]
  };
  const poemCourses = (term) => poems[term].map(([key, title, ...ids]) =>
    makeCourse(key, title, '根据原句或情境提示默写。', [writingGroup(ids)],
      [term === '上' ? 'dictation-upper' : 'dictation-lower']));

  const [calculation, models] = publicStudyCollections.math;
  const math = [
    makeCourse('rational-numbers', '有理数', '练习数轴、绝对值与有理数运算。', [
      sectionGroup(calculation, 0),
      fullGroup('rational', '有理数基础与应用'),
      fullGroup('absolute-axis-first'),
      fullGroup('absolute-axis-second'),
      fullGroup('math-absolute-nonnegative')
    ], ['rational','math-absolute-nonnegative'], [calculation.sources[0]]),
    makeCourse('algebraic-expressions', '代数式', '练习列代数式、求值、去括号和合并同类项。', [
      sectionGroup(calculation, 1),
      fullGroup('algebra', '用字母表示数与求值'),
      fullGroup('math-variable-independent'),
      ...mathAlgebraModules.filter(module => module.key.startsWith('algebra-simplify-'))
        .map(module => fullGroup(module.key, module.range + ' · 化简求值'))
    ], ['algebra','math-variable-independent'], [calculation.sources[1]]),
    makeCourse('linear-equations', '一元一次方程', '按数量关系、行程、计费、比赛等情境列方程。', [
      ...models.sections.map((section, i) => sectionGroup(models, i)),
      ...equationApplicationModules.map(module => fullGroup(module.key))
    ], ['equation','web-math-models'], models.sources),
    topicCourse('geometry')
  ];

  const historySources = [{
    title: '国家中小学智慧教育平台 · 七年级历史课程目录',
    url: 'https://lsx.hxu.edu.cn/__local/6/74/1E/2539C431BB3F39BA9C44F508BBE_FB1F4721_BBD0D.pdf#page=5',
    note: '核对七年级上册第 1–21 课课序和篇名。'
  }, {
    title: '人民教育出版社 · 新修订历史统编教材七年级上册的新变化',
    url: 'https://www.pep.com.cn/bks/zxxjcjx/jcb/202504/t20250417_1999630.shtml',
    note: '参考修订教材的单元主题和活动安排。'
  }];
  const history = [...historyMindmapModules.map(module => module.key), ...historyCourseChecks]
    .sort((a, b) => Number(a.split('-').at(-1)) - Number(b.split('-').at(-1)))
    .map(key => {
      const course = topicCourse(key);
      return {...course, sources: historySources};
    });
  const namedCourses = {
    chinese: {上: [...chinese, ...poemCourses('上')], 下: poemCourses('下')},
    math: {上: math},
    english: {上: [...english,...englishWorksheets]},
    civics: {上: civicsReviewModules.map(module => topicCourse(module.key))},
    history: {上: history},
    geography: {上: geoReviewModules.map(module => topicCourse(module.key))},
    biology: {上: biologyReviewModules.map(module => topicCourse(module.key))}
  };
  const groupedTopicKeys = new Set(['dictation-upper', 'dictation-lower', 'rational', 'algebra', 'geometry']);
  return new Map(activeSubjects.flatMap(subject => ['上', '下'].map(term => {
    const lessons = namedCourses[subject.id]?.[term] ?? [];
    const topics = subject.topics.filter(topic => topic.term === term && lessonByTopic.has(topic.key) &&
      !groupedTopicKeys.has(topic.key)).map(topic => topicCourse(topic.key, '知识点练习'));
    return [subject.id + '/' + term, {lessons, topics}];
  })));
})();

const courseByKey = new Map([...courseCatalog].flatMap(([scope, {lessons, topics}]) => {
  const [subjectId, term] = scope.split('/');
  return [...lessons, ...topics].map(course => [
    course.key, {...course, subjectId, term, href: '#course/' + subjectId + '/' + course.key}
  ]);
}));
