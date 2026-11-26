{
  const questionVisuals = {
    'geo-daily-arrow-orientation': {
      diagram:{src:'question-campus-observation.webp',alt:'指北箭头朝图面右方。观测坪在画面偏左下，实验楼在观测坪的图面右上方。',caption:'先按指向标确定北方，再以观测坪为参照。'}
    },
    'geo-month1-map-arrow': {
      diagram:{src:'question-campus-playground.webp',alt:'指北箭头朝图面右方。图书室用菱形标出，操场用圆形标出，操场在图书室的正下方。',caption:'校园导览图。'}
    },
    'cal-geo-campus-route': {
      diagram:{src:'question-campus-library.webp',alt:'指北箭头朝右。图书馆在教学楼的图面正下方，两点图上距离为2.5厘米，比例尺为1比4000。',caption:'图上距离按标注计算。'}
    },
    'geography-map-review-10': {
      diagram:{src:'question-polar-north.webp',alt:'俯视图以北极为中心，周围有纬线圈和向外延伸的经线。',caption:'从北极上空向下看。'}
    },
    'geography-map-review-11': {
      diagram:{src:'question-polar-south.webp',alt:'经纬网的中心是南极，箭头沿一条经线从南极向外指。',caption:'沿单条经线从中心往外走。'}
    },
    'bio-midterm-micro-image-rotation': {
      diagram:{src:'question-microscope-slide.webp',alt:'装片图样：小写字母 b 和指向右方的箭头都位于视野中心左上方。',caption:'这里显示的是装片。'}
    },
    'math-equation-final-review-1': {
      diagram:{src:'question-equal-strips.webp',alt:'两条等长的边。甲从左到右是 x、x、x、2；乙从左到右是 x+2、x−4、12，单位厘米。',caption:'各段长度以标注为准。'}
    },
    'math-midterm-3-6': {
      numberLine:{description:'从左到右：b、a、0、c。位置仅为示意。',marks:[[14,'b'],[33,'a'],[52,'0'],[78,'c']]}
    },
    'math-midterm-4-6': {
      numberLine:{description:'从左到右：a、0、b、c。a 到原点的距离大于 b 到原点的距离。',marks:[[16,'a'],[53,'0'],[66,'b'],[84,'c']]}
    },
    'math-happy-four-28': {
      numberLine:{description:'从左到右：c、b、0、a。c 到原点的距离大于 a 到原点的距离。',marks:[[13,'c'],[35,'b'],[56,'0'],[75,'a']]}
    },
    'web-math-calculation-3': {
      numberLine:{description:'A 位于 −5，B 位于 2。原点为 0，相邻刻度相距 1 个单位。',marks:[[15,'−5','A'],[25,'−4'],[35,'−3'],[45,'−2'],[55,'−1'],[65,'0'],[75,'1'],[85,'2','B']]}
    },
    'math-friendly-midpoint-2': {
      numberLine:{description:'从左到右：A、C、B。A、B 的坐标分别为 a、b，C 到 A 和 B 的距离相等。',marks:[[20,'a','A'],[50,'','C'],[80,'b','B']]}
    },
    'math-happy-three-31': {
      numberLine:{description:'纸带两端在 −1 和 5，尚未标记折痕或剪口。',marks:[[15,'−1'],[26.67,'0'],[38.33,'1'],[50,'2'],[61.67,'3'],[73.33,'4'],[85,'5']]}
    },
    'hard-bio-seed-rate-controls': {
      material:'课堂记录来自同批萝卜种子，观察时长和空气条件相同。',
      table:{caption:'萝卜种子的四组观察记录',headers:['组别','温度','光照','水分','萌发粒数 / 供试粒数'],
        rows:[['甲','22℃','有光','湿润','12/15'],['乙','22℃','无光','湿润','18/20'],['丙','12℃','无光','湿润','9/20'],['丁','22℃','无光','干燥','0/20']]}
    },
    'geo-daily-6-earth-facts-panel': {
      table:{caption:'各范围的海洋面积比例（题设数据）',headers:['范围','海洋面积占该范围的比例'],
        rows:[['全球','71%'],['北半球','64%'],['南半球','待求']]}
    },
    'geo-month1-weather-wind': {
      table:{caption:'两站空气质量指数',headers:['测站','AQI'],rows:[['甲站','34'],['乙站','87']]}
    }
  };
  for (const subject of subjects) {
    for (const topic of subject.topics) {
      for (const question of topic.questions) {
        const visual = questionVisuals[question.id];
        if (visual) Object.assign(question,visual);
      }
    }
  }
}
