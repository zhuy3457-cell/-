{
  const visuals = {
    'bio-summary-cell-division': [
      {src:'answer-division-1.webp',alt:'左边的动物细胞和右边的植物细胞都已经形成两个细胞核，胞质尚未分开。',caption:'先看分裂末期：两组细胞都已形成两个细胞核。'},
      {src:'answer-division-2.webp',alt:'动物细胞轮廓从上下向中央缢缩。植物细胞中央出现细胞板，并向两侧伸展。',caption:'再看怎样隔开胞质：动物细胞从外向内缢缩，植物细胞在中央形成细胞板。'},
      {src:'answer-division-3.webp',alt:'动物细胞分成两个独立子细胞。植物细胞的两个子细胞之间出现新的细胞壁。',caption:'最后形成两个子细胞。植物细胞中间形成新的细胞壁。'}
    ],
    'geo-month1-climate-wet-wind': [
      {src:'answer-east-wind-1.webp',alt:'山坡右边是东侧海面，箭头从海面向左指向东坡甲站。乙站位于西坡。',caption:'先判风向：东风从东边吹来，先到东坡的甲站。'},
      {src:'answer-east-wind-2.webp',alt:'东坡上，箭头沿坡抬升，上方出现云和雨滴。',caption:'湿空气沿坡抬升、冷却，水汽凝结，更易形成降水。'},
      {src:'answer-east-wind-3.webp',alt:'东坡示意湿空气抬升降雨，西坡箭头向下。甲位于东侧迎风坡，乙位于西侧背风坡。',caption:'所以迎风坡的甲站通常比背风坡的乙站多雨。'}
    ],
    'geo-124-weather-day': [
      {src:'answer-temperature-range.webp',alt:'折线图标记了6时最低观测值12摄氏度和14时最高观测值27摄氏度，极差是15摄氏度。',caption:'先读最高和最低两个观测值，再用最高值减最低值。'}
    ],
    'geo-124-weather-isotherms': [
      {src:'answer-isotherm-range.webp',alt:'甲乙端点为12和14摄氏度，相差2摄氏度。丙丁端点为16和22摄氏度，相差6摄氏度。',caption:'两段距离一样长，丙—丁的等温线更密，端点温差也更大。'}
    ],
    'bio-summary-plant-storage': [
      {src:'answer-seed-storage.webp',alt:'左侧菜豆种子的两片子叶储存主要营养，右侧玉米籽粒中的胚乳储存主要营养。',caption:'① 指向菜豆子叶，② 指向玉米胚乳。'}
    ],
    'equation-app-parameters-6': [
      {src:'answer-equation-denominator.webp',alt:'左侧把右边的负1漏乘2，得到x等于m，由误算结果得m等于3。右侧正确乘2得到2x减1等于x加m减2，代入m等于3求得x等于2。',caption:'先从错误算式求 m，再回到原方程正确去分母。'}
    ]
  };
  for (const subject of subjects) {
    for (const topic of subject.topics) {
      for (const question of topic.questions) {
        const frames = visuals[question.id];
        if (!frames) continue;
        question.answerDiagram = frames.at(-1);
        if (frames.length>1) question.answerFrames = frames;
      }
    }
  }
}
