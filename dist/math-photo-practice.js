const mathPhotoTopics = [
  {
    key:'math-absolute-nonnegative',title:'绝对值与非负性',term:'上',
    description:'用绝对值下界把等式整理成若干非负项相加等于 0。',
    lesson:[
      '绝对值 |u|≥u，所以 |u|−u≥0。非负项的和若为 0，每一项都必须为 0。',
      '积为 0 时先看哪一个因子已经确定非零，不能直接把每个因子都令为 0。',
      '已知 |x−1|+y²=0，求 x 和 y。','x=1，y=0。',
      '绝对值和平方都非负，因此 |x−1|=0 且 y²=0，分别解得 x=1、y=0。'
    ],
    questions:[{
      id:'math-absolute-nonnegative-1',level:'challenge',options:null,correct:'5',
      prompt:'已知非零有理数 a、b 满足 |2a−4|+|b−2|+(a−3)²|b|+4=2a，求 a+b。',
      explanation:'移项后得到三个非负项的和为 0。先由 |b−2|=0 求得 b=2，再由 (a−3)²|b|=0 求得 a=3。',
      solution:[{title:'化为非负项的和',lines:[
        '将等式改写为 [|2a−4|−(2a−4)]+|b−2|+(a−3)²|b|=0。',
        '|2a−4|≥2a−4，绝对值与平方都非负，所以三个加数都非负，且各自等于 0。'
      ]},{title:'分别求值并检验',lines:[
        '|b−2|=0，得 b=2。因为 |b|=2>0，由 (a−3)²|b|=0 得 a=3。',
        '代入原式，左边是 2+0+0+4=6，右边也是 6，因此 a+b=5。'
      ]}]
    }]
  },
  {
    key:'math-variable-independent',title:'代数式与字母无关',term:'上',
    description:'把含指定字母的项合并，令对应系数为 0。',
    lesson:[
      '式子整理为 Ax+B 后，若它的值与 x 无关，x 的系数 A 必须等于 0。',
      '先合并所有含 x 的项，保留常数项。与 x 无关时，常数项仍可为任意固定值。',
      '若 (m−4)x+9 的值与 x 无关，求 m。','m=4。',
      '令 x 的系数 m−4=0，得到 m=4，原式恒为 9。'
    ],
    questions:[{
      id:'math-variable-independent-1',level:'standard',options:null,correct:'-3',
      prompt:'若代数式 2xy+6x−1 的值与 x 无关，求 y。',
      explanation:'合并含 x 的项得 (2y+6)x−1。要使式值与 x 无关，需要 2y+6=0。',
      solution:[{title:'整理并令系数为零',lines:[
        '2xy+6x−1=(2y+6)x−1。',
        'x 的系数必须为 0，所以 2y+6=0，解得 y=−3。',
        '代入后原式恒为 −1，确实与 x 无关。'
      ]}]
    }]
  }
];

const photoMath = subjects.find(subject=>subject.id==='math');
for (const {lesson,...topic} of mathPhotoTopics) {
  lessonByTopic.set(topic.key,lesson);
  photoMath.topics.push({
    ...topic,questions:topic.questions.map(question=>({...question,subject:'math',topic:topic.key}))
  });
}
