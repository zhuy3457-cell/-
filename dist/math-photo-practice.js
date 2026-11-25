const mathPhotoTopics = [
  {
    key:'math-absolute-nonnegative',title:'绝对值与非负性',term:'上',
    description:'把等式整理成非负项的和为 0，再逐项求值。',
    lesson:[
      '绝对值 |u|≥0，也有 |u|≥u。非负项的和为 0 时，每项都为 0。遇到 |u|=−|v|，可先移项写成 |u|+|v|=0。',
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
    },{
      id:'math-absolute-nonnegative-2',level:'standard',options:null,correct:'-5',
      prompt:'若 |a−1|=−|b+5|，求 ab 的值。',
      explanation:'移项得 |a−1|+|b+5|=0，两项都非负，所以 a=1、b=−5，ab=−5。',
      solution:[{title:'移项后逐项求零',lines:[
        '两边加 |b+5|，得 |a−1|+|b+5|=0。',
        '两项都大于或等于 0，因此 |a−1|=0 且 |b+5|=0。',
        '解得 a=1、b=−5。此时原等式两侧都等于 0，所以 ab=1×(−5)=−5。'
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
  },
  {
    key:'math-monomial-coefficient-degree',title:'单项式的系数与次数',term:'上',
    description:'辨认单项式的数字因数，区分字母指数、常数的指数和单项式次数。',
    lesson:[
      '单项式的系数是数字因数，次数是所有字母的指数之和。字母没有写指数时，指数是 1。',
      'π 是常数。非零常数也是单项式，它的系数是它本身，次数是 0。',
      '写出 −2ab³ 的系数与次数。','系数是 −2，次数是 4。','含符号的数字因数是 −2，字母的指数之和是 1+3=4。'
    ],
    questions:[{
      id:'math-monomial-coefficient-degree-1',level:'basic',options:null,
      prompt:'写出单项式 3x²y 的系数与次数。',
      steps:[{label:'系数',answer:'3'},{label:'次数',answer:'3'}],correct:'3，3',
      explanation:'数字因数是 3。x 的指数是 2，y 的指数是 1，所以次数是 2+1=3。'
    },{
      id:'math-monomial-coefficient-degree-2',level:'standard',options:null,
      prompt:'写出单项式 5π²x³y⁴ 的系数与次数。',
      steps:[{label:'系数（可用 pi^2 表示 π²）',answer:'5π²',text:'formula',aliases:['5π^(2)','5(π)^2']},{label:'次数',answer:'7'}],correct:'5π²，7',
      explanation:'π 是常数，因此 5π² 是整个数字因数。次数只加字母 x、y 的指数，即 3+4=7。'
    },{
      id:'math-monomial-coefficient-degree-3',level:'standard',options:null,
      prompt:'写出单项式 6²⁰²⁶ 的系数与次数。',
      steps:[{label:'系数（保留幂的形式）',answer:'6^2026',text:'formula',aliases:['6^(2026)','6**2026']},{label:'次数',answer:'0'}],correct:'6^2026，0',
      explanation:'6²⁰²⁶ 是一个非零常数，所以系数就是 6²⁰²⁶。式中没有字母，单项式次数为 0。'
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
