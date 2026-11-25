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
    'history-chronology-evidence': [
      {src:'answer-history-early.webp',alt:'从早到晚是约170万年前元谋人、约70万至20万年前北京人、约7000年前河姆渡、约6000年前半坡。',caption:'先判“距今”单位，再用流域和代表性作物核对展签。'}
    ],
    'history-chronology-zhou': [
      {src:'answer-history-zhou.webp',alt:'公元前770年周平王东迁，前356年商鞅变法，约前256年修建都江堰，前221年秦统一六国。',caption:'按公元前纪年从大到小排，再分别判断制度改革和水利工程。'}
    ],
    'history-chronology-regions': [
      {src:'answer-history-western-regions.webp',alt:'公元前221年秦统一，前202年西汉建立，前138年张骞首次出使，前60年设置西域都护。',caption:'先有张骞出使交流，后设西域都护加强管理。'}
    ],
    'history-chronology-parallel': [
      {src:'answer-history-north-south-1.webp',alt:'南线317年东晋建立，先定位南方的起点。',caption:'先看南线，317年东晋建立。'},
      {src:'answer-history-north-south-2.webp',alt:'南线420年刘宋建立、南朝开始。北线439年北魏统一北方、494年孝文帝迁都洛阳。',caption:'把北线的494年和南线对照，南方已进入南朝时期。'},
      {src:'answer-history-north-south-3.webp',alt:'北线和南线最后汇到589年隋统一。494年发生在420年南朝开始之后、589年隋统一之前。',caption:'589年隋灭陈；494年落在南朝时期。'}
    ],
    'history-source-reading-jiahu': [
      {src:'answer-history-jiahu-evidence.webp',alt:'贾湖碳化稻谷指向稻作研究，贾湖骨笛指向早期音乐活动研究。',caption:'两种遗物支持不同的历史结论。',source:'https://www.chnmus.net/ch/collection/appraise/details.html?id=512152053903974657',credit:'河南博物院 · 贾湖遗物'}
    ],
    'history-source-reading-confucians': [
      {src:'answer-history-confucians.webp',alt:'孟子主张仁政、民贵君轻；荀子提倡礼治，也重视法度。',caption:'先找主张中的关键词，再判断人物。'}
    ],
    'history-source-reading-qin': [
      {src:'answer-history-qin-measures.webp',alt:'秦统一文字便利文书交流；郡县制的地方长官由中央任免，加强地方管理。',caption:'分清文化措施和政治制度。'}
    ],
    'history-source-reading-farming': [
      {src:'answer-history-agriculture-policy.webp',alt:'战国秦国奖励耕织以增强实力，西汉初年轻徭薄赋、鼓励务农以恢复战后生产。',caption:'先找共同点，再比较时代背景与政策目的。'}
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
