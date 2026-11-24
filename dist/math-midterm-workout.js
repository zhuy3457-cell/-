const mathMidtermModules = [
  {
    "key": "midterm-calc-day-1",
    "title": "第 1 天 · 绝对值与整式代入",
    "range": "建议用时 15 分钟",
    "description": "绝对值为正数时，原数有正、负两种可能。",
    "notes": [
      {
        "label": "解题方法",
        "text": "绝对值为正数时，原数有正、负两种可能。"
      },
      {
        "label": "核对要点",
        "text": "不含某一项时，合并后这一项的系数等于零。"
      }
    ],
    "sources": [
      {
        "title": "苏科版七上数学期中达标卷（公开预览）",
        "url": "https://zy.21cnjy.com/24286600",
        "note": "参照相反数、倒数、绝对值和与变量取值无关的设问。"
      },
      {
        "title": "苏科版七上数学期中复习卷（公开预览）",
        "url": "https://zy.21cnjy.com/24218214",
        "note": "参照整式化简、数轴判读和分步计算题型。"
      }
    ],
    "questions": [
      {
        "id": "math-midterm-1-1",
        "prompt": "1. a、b 互为相反数，c、d 互为倒数，|x|=2。求 2(a+b)−cd+x 的所有可能值。",
        "options": null,
        "steps": [
          {
            "label": "较小值",
            "answer": "-3"
          },
          {
            "label": "较大值",
            "answer": "1"
          }
        ],
        "correct": "-3，1",
        "explanation": "a+b=0，cd=1，原式为 x−1。分别代入 −2 和 2，得 −3 和 1。",
        "level": "standard"
      },
      {
        "id": "math-midterm-1-2",
        "prompt": "2. 已知 2x²−3x+9=7，求 −x²+(3/2)x+9。",
        "options": null,
        "correct": "10",
        "explanation": "由条件得 2x²−3x=−2。乘 −1/2 后得 1，再加 9。",
        "level": "standard"
      },
      {
        "id": "math-midterm-1-3",
        "prompt": "3. 分别计算 (1) 15+(−23)+8+(−5)。(2) 24÷(−3)+|−15|×(1/5)−(−2)。(3) (−3/4+5/8−7/16)÷(−1/48)。(4) −1^2025+16÷(−2)³×|−3|。",
        "options": null,
        "steps": [
          {
            "label": "(1)",
            "answer": "-5"
          },
          {
            "label": "(2)",
            "answer": "-3"
          },
          {
            "label": "(3)",
            "answer": "27"
          },
          {
            "label": "(4)",
            "answer": "-7"
          }
        ],
        "correct": "-5，-3，27，-7",
        "explanation": "（1）合并正负数。（2）−8+3+2=−3。（3）括号内为 −9/16，乘 −48 得 27。（4）−1+16÷(−8)×3=−7。",
        "level": "standard"
      },
      {
        "id": "math-midterm-1-4",
        "prompt": "4. |a|=5，|b|=3，且 |a−b|=b−a。求 a+b 的所有可能值。",
        "options": null,
        "steps": [
          {
            "label": "较小值",
            "answer": "-8"
          },
          {
            "label": "较大值",
            "answer": "-2"
          }
        ],
        "correct": "-8，-2",
        "explanation": "|a−b|=b−a 给出 a≤b，所以 a=−5，b 可为 −3 或 3。",
        "level": "standard"
      },
      {
        "id": "math-midterm-1-5",
        "prompt": "5. 先化简再求值。(2a²b+2ab²)−[2(a²b−1)+3ab²+2]，其中 |a+3|+(b−1/2)²=0。",
        "options": null,
        "steps": [
          {
            "label": "化简后 ab² 项的系数",
            "answer": "-1"
          },
          {
            "label": "式子的值",
            "answer": "3/4"
          }
        ],
        "correct": "-1，3/4",
        "explanation": "非负项各为零，得 a=−3、b=1/2。去括号化简为 −ab²，代入得 3/4。",
        "level": "challenge"
      },
      {
        "id": "math-midterm-1-6",
        "prompt": "6. 6x²−2mxy−2y²+4xy−5x+2 不含 xy 项。(1) 求 m。(2) 此时 −m³−2ab²−m+1−m²+3mb²+5 恒为 −8，a 为常数，b≠0，求 a。",
        "options": null,
        "steps": [
          {
            "label": "(1) m",
            "answer": "2"
          },
          {
            "label": "(2) a",
            "answer": "3"
          }
        ],
        "correct": "2，3",
        "explanation": "−2m+4=0，所以 m=2。第二式化为 −8+(6−2a)b²。因 b≠0，须有 6−2a=0。",
        "level": "challenge"
      }
    ]
  },
  {
    "key": "midterm-calc-day-2",
    "title": "第 2 天 · 非负性与整体代入",
    "range": "建议用时 15 分钟",
    "description": "几个非负数相加等于零，它们分别为零。",
    "notes": [
      {
        "label": "解题方法",
        "text": "几个非负数相加等于零，它们分别为零。"
      },
      {
        "label": "核对要点",
        "text": "看到重复出现的代数式，可以把它当作一个整体。"
      }
    ],
    "sources": [
      {
        "title": "苏科版七上数学期中达标卷（公开预览）",
        "url": "https://zy.21cnjy.com/24286600",
        "note": "参照相反数、倒数、绝对值和与变量取值无关的设问。"
      },
      {
        "title": "苏科版七上数学期中复习卷（公开预览）",
        "url": "https://zy.21cnjy.com/24218214",
        "note": "参照整式化简、数轴判读和分步计算题型。"
      }
    ],
    "questions": [
      {
        "id": "math-midterm-2-1",
        "prompt": "1. 已知 |x+2|+(y−1)²=0，求 2x−3y。",
        "options": null,
        "correct": "-7",
        "explanation": "两个非负项分别为零，得 x=−2、y=1，代入得 −7。",
        "level": "standard"
      },
      {
        "id": "math-midterm-2-2",
        "prompt": "2. m、n 互为相反数，c、d 互为倒数，|x|=2。求 m+n−cd+x²。",
        "options": null,
        "correct": "3",
        "explanation": "m+n=0，cd=1，x²=4，得 0−1+4=3。",
        "level": "standard"
      },
      {
        "id": "math-midterm-2-3",
        "prompt": "3. 4x²−3x+5−2mx²−x+1 化简后不含 x² 项，求 m。",
        "options": null,
        "correct": "2",
        "explanation": "令 x² 的系数 4−2m=0，解得 m=2。",
        "level": "standard"
      },
      {
        "id": "math-midterm-2-4",
        "prompt": "4. 分别计算 (1) −2 又 3/8−(−3 又 1/2)+(−2 又 3/4)−(+3 又 1/8)。(2) −1^2026+(−3 又 1/2)×(4/7)+|(−3)²−2|。",
        "options": null,
        "steps": [
          {
            "label": "(1)",
            "answer": "-19/4"
          },
          {
            "label": "(2)",
            "answer": "4"
          }
        ],
        "correct": "-19/4，4",
        "explanation": "（1）通分得 (−19+28−22−25)/8=−19/4。（2）−1−2+7=4。",
        "level": "standard"
      },
      {
        "id": "math-midterm-2-5",
        "prompt": "5. A=x²+xy−2y²，B=2x²−(1/2)xy+3y²。(1) 化简 A−2B。(2) 若 3A 与 4B+C 互为相反数，①求 C；②在 (x−1)²+|y+2|=0 时求 C 的值。",
        "options": null,
        "steps": [
          {
            "label": "(1) x² 项系数",
            "answer": "-3"
          },
          {
            "label": "(1) xy 项系数",
            "answer": "2"
          },
          {
            "label": "(1) y² 项系数",
            "answer": "-8"
          },
          {
            "label": "(2)① C 的 x² 项系数",
            "answer": "-11"
          },
          {
            "label": "(2)① C 的 xy 项系数",
            "answer": "-1"
          },
          {
            "label": "(2)① C 的 y² 项系数",
            "answer": "-6"
          },
          {
            "label": "(2)② C 的值",
            "answer": "-33"
          }
        ],
        "correct": "-3，2，-8，-11，-1，-6，-33",
        "explanation": "A−2B=−3x²+2xy−8y²。由相反数关系得 C=−3A−4B=−11x²−xy−6y²。代入 x=1、y=−2 得 −33。",
        "level": "challenge"
      },
      {
        "id": "math-midterm-2-6",
        "prompt": "6. 用整体思想作答。(1) 合并 3(a−b)²−7(a−b)²+2(a−b)²。(2) x²+2y=5，求 −3x²−6y+21。(3) a−2b=3，2b−c=−5，c−d=10，求 (a−c)+(2b−d)−(2b−c)。",
        "options": null,
        "steps": [
          {
            "label": "(1) (a−b)² 的系数",
            "answer": "-2"
          },
          {
            "label": "(2)",
            "answer": "6"
          },
          {
            "label": "(3)",
            "answer": "8"
          }
        ],
        "correct": "-2，6，8",
        "explanation": "（1）3−7+2=−2。（2）−3(x²+2y)+21=6。（3）原式为 a−d=(a−2b)+(2b−c)+(c−d)=8。",
        "level": "challenge"
      }
    ]
  },
  {
    "key": "midterm-calc-day-3",
    "title": "第 3 天 · 数轴、符号与消项",
    "range": "建议用时 15 分钟",
    "description": "去绝对值前，先判断其中各量的正负。",
    "notes": [
      {
        "label": "解题方法",
        "text": "去绝对值前，先判断其中各量的正负。"
      },
      {
        "label": "核对要点",
        "text": "与某个字母取值无关，要令含该字母的项合并后系数全为零。"
      }
    ],
    "sources": [
      {
        "title": "苏科版七上数学期中达标卷（公开预览）",
        "url": "https://zy.21cnjy.com/24286600",
        "note": "参照相反数、倒数、绝对值和与变量取值无关的设问。"
      },
      {
        "title": "苏科版七上数学期中复习卷（公开预览）",
        "url": "https://zy.21cnjy.com/24218214",
        "note": "参照整式化简、数轴判读和分步计算题型。"
      }
    ],
    "questions": [
      {
        "id": "math-midterm-3-1",
        "prompt": "1. 2x³−8x²+x−1 与 3x³+2mx²−5x+3 相加后不含二次项，求 m。",
        "options": null,
        "correct": "4",
        "explanation": "二次项系数是 −8+2m。令它为 0，得 m=4。",
        "level": "standard"
      },
      {
        "id": "math-midterm-3-2",
        "prompt": "2. 已知 |a|=−a，|b|/b=−1，|c|=c。化简 |a+b|−|a−c|−|b−c|，填化简后 c 的系数。",
        "options": null,
        "correct": "-2",
        "explanation": "a≤0，b<0，c≥0，故原式为 −a−b−(c−a)−(c−b)=−2c。",
        "level": "standard"
      },
      {
        "id": "math-midterm-3-3",
        "prompt": "3. 定义 a△b=ab+(a+b)，求 (−1)△(m+1)。",
        "options": null,
        "correct": "-1",
        "explanation": "代入得 −(m+1)+(−1+m+1)=−1。",
        "level": "standard"
      },
      {
        "id": "math-midterm-3-4",
        "prompt": "4. 分别计算 (1) −4²−3×2²×(1/3−1)÷(−1 又 1/3)。(2) (−1/6+7/12−3/8)×24−3/5。",
        "options": null,
        "steps": [
          {
            "label": "(1)",
            "answer": "-22"
          },
          {
            "label": "(2)",
            "answer": "2/5"
          }
        ],
        "correct": "-22，2/5",
        "explanation": "（1）−16−12×(−2/3)÷(−4/3)=−22。（2）−4+14−9−3/5=2/5。",
        "level": "standard"
      },
      {
        "id": "math-midterm-3-5",
        "prompt": "5. 先化简再求值。3x²y−[2x²−(xy²−3x²y)−4xy²]，其中 |x|=2，y=1/2，且 xy<0。",
        "options": null,
        "correct": "-21/2",
        "explanation": "去括号得 −2x²+5xy²。因 y>0 且 xy<0，取 x=−2，代入得 −8−5/2=−21/2。",
        "level": "challenge"
      },
      {
        "id": "math-midterm-3-6",
        "prompt": "6. (1) 数轴上从左到右为 b、a、0、c。化简 |b+a|−|c−b|−2|c−a|。(2) 若 (x²+ax−2y+7)−(bx²−2x+9y−1) 的值与 x 无关，求 a−b。",
        "options": null,
        "steps": [
          {
            "label": "(1) a 的系数",
            "answer": "1"
          },
          {
            "label": "(1) c 的系数",
            "answer": "-3"
          },
          {
            "label": "(2) a−b",
            "answer": "-3"
          }
        ],
        "correct": "1，-3，-3",
        "explanation": "（1）绝对值去掉后是 −(b+a)−(c−b)−2(c−a)=a−3c。（2）令 x² 和 x 的系数 1−b、a+2 都为 0，得 a−b=−3。",
        "level": "challenge"
      }
    ]
  },
  {
    "key": "midterm-calc-day-4",
    "title": "第 4 天 · 分段计算与整式减法",
    "range": "建议用时 15 分钟",
    "description": "含分式的式子先排除分母为零的取值，再分段讨论符号。",
    "notes": [
      {
        "label": "解题方法",
        "text": "含分式的式子先排除分母为零的取值，再分段讨论符号。"
      },
      {
        "label": "核对要点",
        "text": "括号前有负号，括号内每一项都需要变号。"
      }
    ],
    "sources": [
      {
        "title": "苏科版七上数学期中达标卷（公开预览）",
        "url": "https://zy.21cnjy.com/24286600",
        "note": "参照相反数、倒数、绝对值和与变量取值无关的设问。"
      },
      {
        "title": "苏科版七上数学期中复习卷（公开预览）",
        "url": "https://zy.21cnjy.com/24218214",
        "note": "参照整式化简、数轴判读和分步计算题型。"
      }
    ],
    "questions": [
      {
        "id": "math-midterm-4-1",
        "prompt": "1. 已知 a−b=3，c+d=4，求 (b+c)−(a−d)。",
        "options": null,
        "correct": "1",
        "explanation": "整理成 −(a−b)+(c+d)=−3+4=1。",
        "level": "standard"
      },
      {
        "id": "math-midterm-4-2",
        "prompt": "2. 求 |x|/x+|x−1|/(x−1)+|x−2|/(x−2) 的值。原题条件 x<1 还需排除 x=0，请分情况填写。",
        "options": null,
        "steps": [
          {
            "label": "x<0",
            "answer": "-3"
          },
          {
            "label": "0<x<1",
            "answer": "-1"
          }
        ],
        "correct": "-3，-1",
        "explanation": "在 x<1 且 x≠0 时，后两项均为 −1，第一项按 x 的正负分别为 −1 或 1。",
        "level": "challenge"
      },
      {
        "id": "math-midterm-4-3",
        "prompt": "3. 分别计算 (1) (−36)×(0.5+1/6−5/12)。(2) −2⁴−(1/5)×[4+(−4)²]÷(−8)。",
        "options": null,
        "steps": [
          {
            "label": "(1)",
            "answer": "-9"
          },
          {
            "label": "(2)",
            "answer": "-31/2"
          }
        ],
        "correct": "-9，-31/2",
        "explanation": "（1）括号内为 1/4。（2）方括号内为 20，最后是 −16−(−1/2)=−31/2。",
        "level": "challenge"
      },
      {
        "id": "math-midterm-4-4",
        "prompt": "4. 去括号并合并。(1) 4(2a²−b)−(2b−3a²)−2(a²−2b)。(2) −2(mn−3m²)−[m²−5(mn−m²)+2mn]。",
        "options": null,
        "steps": [
          {
            "label": "(1) a² 项系数",
            "answer": "9"
          },
          {
            "label": "(1) b 项系数",
            "answer": "-2"
          },
          {
            "label": "(2) mn 项系数",
            "answer": "1"
          },
          {
            "label": "(2) m² 项系数",
            "answer": "0"
          }
        ],
        "correct": "9，-2，1，0",
        "explanation": "（1）化为 9a²−2b。（2）方括号内是 6m²−3mn，去括号后化为 mn。",
        "level": "challenge"
      },
      {
        "id": "math-midterm-4-5",
        "prompt": "5. M=ax²+bxy−3y，N=x²−2xy+2x−1。(1) 化简 M−2N，按各项系数填答。(2) 若 M−2N 为关于 x、y 的一次多项式，求 −a⁴+b^a+a/b。",
        "options": null,
        "steps": [
          {
            "label": "(1) x² 项系数 a+□ 中的数",
            "answer": "-2"
          },
          {
            "label": "(1) xy 项系数 b+□ 中的数",
            "answer": "4"
          },
          {
            "label": "(1) x 项系数",
            "answer": "-4"
          },
          {
            "label": "(1) y 项系数",
            "answer": "-3"
          },
          {
            "label": "(1) 常数项",
            "answer": "2"
          },
          {
            "label": "(2) 的值",
            "answer": "-1/2"
          }
        ],
        "correct": "-2，4，-4，-3，2，-1/2",
        "explanation": "M−2N=(a−2)x²+(b+4)xy−4x−3y+2。令二次项的系数都为零，得 a=2、b=−4，代入得 −16+16−1/2=−1/2。",
        "level": "challenge"
      },
      {
        "id": "math-midterm-4-6",
        "prompt": "6. 原图中 a<0<b<c，且 |a|>b。依次判断 (1) a、b、−a、−b 的升序，(2) a+b、abc 的正负，(3) 化简 2|c−a|−|a+b|−|a|+abc/|abc|。",
        "options": [
          "a<−b<b<−a，a+b<0、abc<0，b+2c−1",
          "a<−b<b<−a，a+b>0、abc<0，b+2c−1",
          "−b<a<b<−a，a+b<0、abc<0，b+2c−1",
          "a<−b<b<−a，a+b<0、abc<0，2c−b+1"
        ],
        "correct": "a<−b<b<−a，a+b<0、abc<0，b+2c−1",
        "explanation": "由 |a|>b 得 a<−b，且 b<−a。由符号关系得原式=2(c−a)+(a+b)+a−1=b+2c−1。",
        "level": "challenge"
      }
    ]
  },
  {
    "key": "midterm-calc-day-5",
    "title": "第 5 天 · 绝对值最小值与错算还原",
    "range": "建议用时 15 分钟",
    "description": "数轴上点 x 到两个固定点的距离之和，最小值等于两固定点间的距离。",
    "notes": [
      {
        "label": "解题方法",
        "text": "数轴上点 x 到两个固定点的距离之和，最小值等于两固定点间的距离。"
      },
      {
        "label": "核对要点",
        "text": "若已知 A−B，想求 A+B，可在差式上加 2B。"
      }
    ],
    "sources": [
      {
        "title": "苏科版七上数学期中达标卷（公开预览）",
        "url": "https://zy.21cnjy.com/24286600",
        "note": "参照相反数、倒数、绝对值和与变量取值无关的设问。"
      },
      {
        "title": "苏科版七上数学期中复习卷（公开预览）",
        "url": "https://zy.21cnjy.com/24218214",
        "note": "参照整式化简、数轴判读和分步计算题型。"
      }
    ],
    "questions": [
      {
        "id": "math-midterm-5-1",
        "prompt": "1. 已知 a²−2b+1=0，求 4b/(a²+1)。",
        "options": null,
        "correct": "2",
        "explanation": "a²+1=2b>0，所以 b≠0，约分得 2。",
        "level": "standard"
      },
      {
        "id": "math-midterm-5-2",
        "prompt": "2. |x−1|+|x−a| 的最小值为 3。求 a 的所有可能值。",
        "options": null,
        "steps": [
          {
            "label": "较小值",
            "answer": "-2"
          },
          {
            "label": "较大值",
            "answer": "4"
          }
        ],
        "correct": "-2，4",
        "explanation": "x 在两固定点之间时，距离和最小，等于 |1−a|。令 |1−a|=3，得 −2 或 4。",
        "level": "challenge"
      },
      {
        "id": "math-midterm-5-3",
        "prompt": "3. 分别计算 (1) −36×(1/12−5/9−3/4)+(−3)²。(2) −1²+(−2)³+|−3|÷(1/3)。",
        "options": null,
        "steps": [
          {
            "label": "(1)",
            "answer": "53"
          },
          {
            "label": "(2)",
            "answer": "0"
          }
        ],
        "correct": "53，0",
        "explanation": "（1）−3+20+27+9=53。（2）−1−8+9=0。",
        "level": "challenge"
      },
      {
        "id": "math-midterm-5-4",
        "prompt": "4. a、b 互为相反数，c、d 互为倒数，|x|=2。(1) 求 a+b、cd 和 x。(2) 求 2x²−(a+b)+|x|/(cd)−(2a+2b)/(cd)。",
        "options": null,
        "steps": [
          {
            "label": "(1) a+b",
            "answer": "0"
          },
          {
            "label": "(1) cd",
            "answer": "1"
          },
          {
            "label": "(1) 较小的 x",
            "answer": "-2"
          },
          {
            "label": "(1) 较大的 x",
            "answer": "2"
          },
          {
            "label": "(2)",
            "answer": "10"
          }
        ],
        "correct": "0，1，-2，2，10",
        "explanation": "a+b=0、cd=1、x=±2，所以 (2) 为 8+2=10。",
        "level": "challenge"
      },
      {
        "id": "math-midterm-5-5",
        "prompt": "5. 已知 x=1/2、y=1，求 (1/2)x−[x²+2y²−((1/2)x−3)]+(2x²+3y²+4)。",
        "options": null,
        "correct": "11/4",
        "explanation": "化简为 x²+y²+x+1，代入得 1/4+1+1/2+1=11/4。",
        "level": "challenge"
      },
      {
        "id": "math-midterm-5-6",
        "prompt": "6. B=2x²y−3xy+2x+5。误把 A+B 算成 A−B，得到 4x²y+xy−x−4。(1) 求 A+B。(2) 若 A−3B 与 x 无关，求 y。",
        "options": null,
        "steps": [
          {
            "label": "(1) x²y 项系数",
            "answer": "8"
          },
          {
            "label": "(1) xy 项系数",
            "answer": "-5"
          },
          {
            "label": "(1) x 项系数",
            "answer": "3"
          },
          {
            "label": "(1) 常数项",
            "answer": "6"
          },
          {
            "label": "(2) y",
            "answer": "5/7"
          }
        ],
        "correct": "8，-5，3，6，5/7",
        "explanation": "设误算结果为 D。A+B=D+2B=8x²y−5xy+3x+6。A−3B=D−2B=(7y−5)x−14，故 y=5/7。",
        "level": "challenge"
      }
    ]
  },
  {
    "key": "midterm-calc-day-6",
    "title": "第 6 天 · 自定义运算与分步求值",
    "range": "建议用时 15 分钟",
    "description": "嵌套的新运算先算内层，再把结果代入外层。",
    "notes": [
      {
        "label": "解题方法",
        "text": "嵌套的新运算先算内层，再把结果代入外层。"
      },
      {
        "label": "核对要点",
        "text": "将要讨论的字母提出来，可以看到哪项系数应等于零。"
      }
    ],
    "sources": [
      {
        "title": "苏科版七上数学期中达标卷（公开预览）",
        "url": "https://zy.21cnjy.com/24286600",
        "note": "参照相反数、倒数、绝对值和与变量取值无关的设问。"
      },
      {
        "title": "苏科版七上数学期中复习卷（公开预览）",
        "url": "https://zy.21cnjy.com/24218214",
        "note": "参照整式化简、数轴判读和分步计算题型。"
      }
    ],
    "questions": [
      {
        "id": "math-midterm-6-1",
        "prompt": "1. |a|=3，|b|=2，|c|=1，且 a<b<c。求 a+b+c 的所有可能值。",
        "options": null,
        "steps": [
          {
            "label": "较小值",
            "answer": "-6"
          },
          {
            "label": "较大值",
            "answer": "-4"
          }
        ],
        "correct": "-6，-4",
        "explanation": "a 不能为 3，b 也不能为 2，所以 a=−3、b=−2，c 可为 −1 或 1。",
        "level": "standard"
      },
      {
        "id": "math-midterm-6-2",
        "prompt": "2. (x−2)² 与 |x+2y| 互为相反数，求 y−x。",
        "options": null,
        "correct": "-3",
        "explanation": "两者非负，和为零，得 x=2、y=−1，故 y−x=−3。",
        "level": "standard"
      },
      {
        "id": "math-midterm-6-3",
        "prompt": "3. 定义 A☆B=3A−2B。若 x☆(4☆1)=7，求 x。",
        "options": null,
        "correct": "9",
        "explanation": "先算 4☆1=10，再解 3x−20=7。",
        "level": "standard"
      },
      {
        "id": "math-midterm-6-4",
        "prompt": "4. 先化简再求值。3(a²b−2b³+2ab)−[2(3ab+a²b)−4b³]，其中 |a−2|+(b+1)²=0。",
        "options": null,
        "correct": "-2",
        "explanation": "原式为 a²b−2b³。由非负性得 a=2、b=−1，代入得 −4+2=−2。",
        "level": "standard"
      },
      {
        "id": "math-midterm-6-5",
        "prompt": "5. 分别计算 (1) 5×(−2)+(−8)÷(−2)。(2) −1⁴−(1−0×4)÷(1/3)×[(−2)²−6]。",
        "options": null,
        "steps": [
          {
            "label": "(1)",
            "answer": "-6"
          },
          {
            "label": "(2)",
            "answer": "5"
          }
        ],
        "correct": "-6，5",
        "explanation": "（1）−10+4=−6。（2）−1−1÷(1/3)×(−2)=5。",
        "level": "challenge"
      },
      {
        "id": "math-midterm-6-6",
        "prompt": "6. A=x²−3xy−2y，B=−2x²+xy+y。(1) 化简 (A−B)−(2A−3B)。(2) 当 x=−1、y=2 时求值。(3) 若 (1) 的结果与 y 无关，求该式的值。",
        "options": null,
        "steps": [
          {
            "label": "(1) x² 项系数",
            "answer": "-5"
          },
          {
            "label": "(1) xy 项系数",
            "answer": "5"
          },
          {
            "label": "(1) y 项系数",
            "answer": "4"
          },
          {
            "label": "(2) 的值",
            "answer": "-7"
          },
          {
            "label": "(3) 的值",
            "answer": "-16/5"
          }
        ],
        "correct": "-5，5，4，-7，-16/5",
        "explanation": "原式=−A+2B=−5x²+(5x+4)y。代入 −1、2 得 −7。与 y 无关时 x=−4/5，原式为 −16/5。",
        "level": "challenge"
      }
    ]
  },
  {
    "key": "midterm-calc-day-7",
    "title": "第 7 天 · 乘方符号与整式消项",
    "range": "建议用时 15 分钟",
    "description": "先看负号在括号内还是在乘方前，再按顺序计算。",
    "notes": [
      {
        "label": "解题方法",
        "text": "先看负号在括号内还是在乘方前，再按顺序计算。"
      },
      {
        "label": "核对要点",
        "text": "整式的系数很大时，先看系数相减后能否简化。"
      }
    ],
    "sources": [
      {
        "title": "苏科版七上数学期中达标卷（公开预览）",
        "url": "https://zy.21cnjy.com/24286600",
        "note": "参照相反数、倒数、绝对值和与变量取值无关的设问。"
      },
      {
        "title": "苏科版七上数学期中复习卷（公开预览）",
        "url": "https://zy.21cnjy.com/24218214",
        "note": "参照整式化简、数轴判读和分步计算题型。"
      }
    ],
    "questions": [
      {
        "id": "math-midterm-7-1",
        "prompt": "1. 定义 a☆b=2a²−3|b|，求 2☆(−3)。",
        "options": null,
        "correct": "-1",
        "explanation": "2×2²−3×|−3|=8−9=−1。",
        "level": "standard"
      },
      {
        "id": "math-midterm-7-2",
        "prompt": "2. 已知 x²−2x=1，求 2027−6x+3x²。",
        "options": null,
        "correct": "2030",
        "explanation": "后两项合为 3(x²−2x)。代入得 2027+3=2030。",
        "level": "standard"
      },
      {
        "id": "math-midterm-7-3",
        "prompt": "3. a、b 互为相反数，c、d 互为倒数，m 是最大的负整数。求 3a+2024/(cd)+3b−m^2025。",
        "options": null,
        "correct": "2025",
        "explanation": "3(a+b)=0，cd=1，m=−1 且 2025 为奇数，故值为 2024−(−1)。",
        "level": "standard"
      },
      {
        "id": "math-midterm-7-4",
        "prompt": "4. 分别计算 (1) (−3/4−5/8+7/12)×(−24)+(−8)÷(2/3)。(2) −1⁴−(1−0.5)×(1/3)×[2−(−3)²]。",
        "options": null,
        "steps": [
          {
            "label": "(1)",
            "answer": "7"
          },
          {
            "label": "(2)",
            "answer": "1/6"
          }
        ],
        "correct": "7，1/6",
        "explanation": "（1）18+15−14−12=7。（2）−1−(1/2)×(1/3)×(−7)=1/6。",
        "level": "standard"
      },
      {
        "id": "math-midterm-7-5",
        "prompt": "5. 先化简再求值。3x²y−[2x²y−3(2xy−x²y)−xy]，其中 x=−1/2、y=2。",
        "options": null,
        "correct": "-8",
        "explanation": "方括号化为 5x²y−7xy，故原式=−2x²y+7xy=−1−7=−8。",
        "level": "challenge"
      },
      {
        "id": "math-midterm-7-6",
        "prompt": "6. A=2a²+3ab+2a−1/3，B=−a²+(1/2)ab+2/3。(1) 当 (a+1)²+|b+2|=0 时，求 5A−(4A−2B)。(2) 若 2025A−(2024A−2B) 的值与 a 无关，求 b²。",
        "options": null,
        "steps": [
          {
            "label": "(1) 的值",
            "answer": "7"
          },
          {
            "label": "(2) b²",
            "answer": "1/4"
          }
        ],
        "correct": "7，1/4",
        "explanation": "两式都等于 A+2B=(4b+2)a+1。（1）a=−1、b=−2，得 7。（2）4b+2=0，b=−1/2，故 b²=1/4。",
        "level": "challenge"
      }
    ]
  },
  {
    "key": "midterm-calc-day-8",
    "title": "第 8 天 · 正负代入与多项式纠错",
    "range": "建议用时 15 分钟",
    "description": "用 −x 替换 x，偶次项和常数项不变，奇次项变号。",
    "notes": [
      {
        "label": "解题方法",
        "text": "用 −x 替换 x，偶次项和常数项不变，奇次项变号。"
      },
      {
        "label": "核对要点",
        "text": "要检验与 x 无关，只看含 x 各项，总结果仍可以含其他字母。"
      }
    ],
    "sources": [
      {
        "title": "苏科版七上数学期中达标卷（公开预览）",
        "url": "https://zy.21cnjy.com/24286600",
        "note": "参照相反数、倒数、绝对值和与变量取值无关的设问。"
      },
      {
        "title": "苏科版七上数学期中复习卷（公开预览）",
        "url": "https://zy.21cnjy.com/24218214",
        "note": "参照整式化简、数轴判读和分步计算题型。"
      }
    ],
    "questions": [
      {
        "id": "math-midterm-8-1",
        "prompt": "1. 当 x=−2 时，mx³+2x²+nx+4 的值是 13。求 x=2 时该多项式的值。",
        "options": null,
        "correct": "11",
        "explanation": "两种取值的偶次项与常数和均为 12，奇次项之和由 1 变为 −1。",
        "level": "standard"
      },
      {
        "id": "math-midterm-8-2",
        "prompt": "2. a、b 互为相反数，c、d 互为倒数，|x|=1。求 (1−x)/(cd)+(a+b+cd)x。",
        "options": null,
        "correct": "1",
        "explanation": "a+b=0，cd=1，原式为 1−x+x=1。",
        "level": "standard"
      },
      {
        "id": "math-midterm-8-3",
        "prompt": "3. 分别计算 (1) (−36)×(0.5+1/6−5/12)。(2) −2⁴−(1/5)×[4+(−4)²]÷(−8)。",
        "options": null,
        "steps": [
          {
            "label": "(1)",
            "answer": "-9"
          },
          {
            "label": "(2)",
            "answer": "-31/2"
          }
        ],
        "correct": "-9，-31/2",
        "explanation": "（1）(−36)×1/4=−9。（2）−16−(1/5)×20÷(−8)=−31/2。",
        "level": "standard"
      },
      {
        "id": "math-midterm-8-4",
        "prompt": "4. 先化简再求值。3(a²−2ab)−[a²−3b+3(ab+b)]，其中 a=−2、b=1/3。",
        "options": null,
        "correct": "14",
        "explanation": "方括号为 a²+3ab，原式化为 2a²−9ab=8+6=14。",
        "level": "standard"
      },
      {
        "id": "math-midterm-8-5",
        "prompt": "5. 小英本要计算 A−(2x²−3x+7)，却误算成加法，得到 5x²−2x+4。求 A 和正确的差。",
        "options": null,
        "steps": [
          {
            "label": "A 的 x² 项系数",
            "answer": "3"
          },
          {
            "label": "A 的 x 项系数",
            "answer": "1"
          },
          {
            "label": "A 的常数项",
            "answer": "-3"
          },
          {
            "label": "差的 x² 项系数",
            "answer": "1"
          },
          {
            "label": "差的 x 项系数",
            "answer": "4"
          },
          {
            "label": "差的常数项",
            "answer": "-10"
          }
        ],
        "correct": "3，1，-3，1，4，-10",
        "explanation": "先从误算结果减去被加式，得 A=3x²+x−3，再减一次 2x²−3x+7，得正确的差 x²+4x−10。",
        "level": "challenge"
      },
      {
        "id": "math-midterm-8-6",
        "prompt": "6. A=3x²−6xy+5x+1，B=2x²−3xy−3x−1，C=a(x²−2)−b(2x+3)。(1) 化简 A−2B。(2) 若 A−2B+C 与 x 无关，求 a+b。",
        "options": null,
        "steps": [
          {
            "label": "(1) x² 项系数",
            "answer": "-1"
          },
          {
            "label": "(1) x 项系数",
            "answer": "11"
          },
          {
            "label": "(1) 常数项",
            "answer": "3"
          },
          {
            "label": "(2) a+b",
            "answer": "13/2"
          }
        ],
        "correct": "-1，11，3，13/2",
        "explanation": "A−2B=−x²+11x+3。加 C 后令 a−1=0、11−2b=0，得 a=1，b=11/2。",
        "level": "challenge"
      }
    ]
  },
  {
    "key": "midterm-calc-day-9",
    "title": "第 9 天 · 参数系数与组合代入",
    "range": "建议用时 15 分钟",
    "description": "判断次数和项数前，先合并同类项。",
    "notes": [
      {
        "label": "解题方法",
        "text": "判断次数和项数前，先合并同类项。"
      },
      {
        "label": "核对要点",
        "text": "可把已知整式乘以合适的系数，拼成要求值的整式。"
      }
    ],
    "sources": [
      {
        "title": "苏科版七上数学期中达标卷（公开预览）",
        "url": "https://zy.21cnjy.com/24286600",
        "note": "参照相反数、倒数、绝对值和与变量取值无关的设问。"
      },
      {
        "title": "苏科版七上数学期中复习卷（公开预览）",
        "url": "https://zy.21cnjy.com/24218214",
        "note": "参照整式化简、数轴判读和分步计算题型。"
      }
    ],
    "questions": [
      {
        "id": "math-midterm-9-1",
        "prompt": "1. x²−(3k−1)xy−3y²+3mxy−8 不含 xy 项，求 −3m+3k+2。",
        "options": null,
        "correct": "3",
        "explanation": "令 −3k+1+3m=0，得 −3m+3k=1，故目标式为 3。",
        "level": "standard"
      },
      {
        "id": "math-midterm-9-2",
        "prompt": "2. a、b 互为相反数，c、d 互为倒数，m 是最大的负整数。求 3a+2024/(cd)+3b−m^2025。",
        "options": null,
        "correct": "2025",
        "explanation": "3(a+b)=0，cd=1，m=−1，得 2024−(−1)=2025。",
        "level": "standard"
      },
      {
        "id": "math-midterm-9-3",
        "prompt": "3. 分别计算 (1) [−5³−(−3)³]×|−1/3|。(2) (−3)³÷(2 又 1/4)×(−2/3)²+2³+(−2)²×(−2/3)。",
        "options": null,
        "steps": [
          {
            "label": "(1)",
            "answer": "-98/3"
          },
          {
            "label": "(2)",
            "answer": "0"
          }
        ],
        "correct": "-98/3，0",
        "explanation": "（1）[−125−(−27)]×1/3=−98/3。（2）−16/3+8−8/3=0。",
        "level": "standard"
      },
      {
        "id": "math-midterm-9-4",
        "prompt": "4. A=−3x²−(k+2)x+1，B=3(x²+x−4)。(1) 若 A 是二次二项式，求 k。(2) 若 k 是最大的负整数，化简 B−2A。",
        "options": null,
        "steps": [
          {
            "label": "(1) k",
            "answer": "-2"
          },
          {
            "label": "(2) x² 项系数",
            "answer": "9"
          },
          {
            "label": "(2) x 项系数",
            "answer": "5"
          },
          {
            "label": "(2) 常数项",
            "answer": "-14"
          }
        ],
        "correct": "-2，9，5，-14",
        "explanation": "（1）令一次项系数为零，得 k=−2。（2）k=−1，此时 B−2A=9x²+5x−14。",
        "level": "standard"
      },
      {
        "id": "math-midterm-9-5",
        "prompt": "5. A=2a²+3ab−2a−1，B=a²−(1/2)ab−2/3。(1) 当 a=−1、b=−2 时求 A−2B。(2) 若 A−2B 与 a 无关，求 b。",
        "options": null,
        "steps": [
          {
            "label": "(1) 的值",
            "answer": "31/3"
          },
          {
            "label": "(2) b",
            "answer": "1/2"
          }
        ],
        "correct": "31/3，1/2",
        "explanation": "A−2B=(4b−2)a+1/3，代入得 31/3。要与 a 无关，令 4b−2=0。",
        "level": "challenge"
      },
      {
        "id": "math-midterm-9-6",
        "prompt": "6. 整体代入。(1) x+y=4，求 (x+y)²−3(x+y)。(2) 2a²+ab=6，3ab−b²=5，求 6a²+9ab−2b²。",
        "options": null,
        "steps": [
          {
            "label": "(1)",
            "answer": "4"
          },
          {
            "label": "(2)",
            "answer": "28"
          }
        ],
        "correct": "4，28",
        "explanation": "（1）16−12=4。（2）所求式为 3(2a²+ab)+2(3ab−b²)，即 3×6+2×5=28。",
        "level": "challenge"
      }
    ]
  },
  {
    "key": "midterm-calc-day-10",
    "title": "第 10 天 · 同类项、新运算与非负性",
    "range": "建议用时 15 分钟",
    "description": "新定义含分母时，先确定可取值范围。",
    "notes": [
      {
        "label": "解题方法",
        "text": "新定义含分母时，先确定可取值范围。"
      },
      {
        "label": "核对要点",
        "text": "将式子化为几个平方项之和，可利用平方的非负性判断。"
      }
    ],
    "sources": [
      {
        "title": "苏科版七上数学期中达标卷（公开预览）",
        "url": "https://zy.21cnjy.com/24286600",
        "note": "参照相反数、倒数、绝对值和与变量取值无关的设问。"
      },
      {
        "title": "苏科版七上数学期中复习卷（公开预览）",
        "url": "https://zy.21cnjy.com/24218214",
        "note": "参照整式化简、数轴判读和分步计算题型。"
      }
    ],
    "questions": [
      {
        "id": "math-midterm-10-1",
        "prompt": "1. 多项式 −8x³y^m+xy²−3x³+6y 是六次四项式，求 m。",
        "options": null,
        "correct": "3",
        "explanation": "其他各项次数不超过 3，故 3+m=6。",
        "level": "standard"
      },
      {
        "id": "math-midterm-10-2",
        "prompt": "2. 定义 a※b=(ab−b²)/(2a)，其中 a≠0。求 2※(−2)。",
        "options": null,
        "correct": "-2",
        "explanation": "代入得 (−4−4)/4=−2。",
        "level": "standard"
      },
      {
        "id": "math-midterm-10-3",
        "prompt": "3. 3a^(m+2)b⁴ 与 −2a⁵b^(n−1) 的和仍为一个单项式，求 m+n。",
        "options": null,
        "correct": "8",
        "explanation": "这两项必须为同类项，m+2=5，n−1=4，得 m+n=8。",
        "level": "standard"
      },
      {
        "id": "math-midterm-10-4",
        "prompt": "4. 分别计算 (1) (−1)^2025+16÷2³−[−3+(5/3)×(−3)²]。(2) (−3/4)×(−1 又 1/2)÷(−2 又 1/4)−36×(7/9−5/6)+|−1 又 1/2−2|。",
        "options": null,
        "steps": [
          {
            "label": "(1)",
            "answer": "-11"
          },
          {
            "label": "(2)",
            "answer": "5"
          }
        ],
        "correct": "-11，5",
        "explanation": "（1）方括号内为 12，最终 −1+2−12=−11。（2）三部分为 −1/2、2、7/2，和为 5。",
        "level": "standard"
      },
      {
        "id": "math-midterm-10-5",
        "prompt": "5. 先化简再求值。x²+(2xy−3y²)−2(x²+xy−y²)，其中 |x−2|+(y+1)²=0。",
        "options": null,
        "correct": "-5",
        "explanation": "原式化为 −x²−y²。由非负性得 x=2、y=−1，代入得 −5。",
        "level": "challenge"
      },
      {
        "id": "math-midterm-10-6",
        "prompt": "6. A=2x²+xy+2y²，B=x²−xy+y²。(1) 化简 A−2B。(2) 当 x、y 互为倒数时，求 A−2B。(3) 定义 P☆Q=P+3Q，判断 (A−2B)☆B 能否为负数，并根据化简式说明理由。",
        "options": null,
        "steps": [
          {
            "label": "(1) xy 项系数",
            "answer": "3"
          },
          {
            "label": "(2) 的值",
            "answer": "3"
          },
          {
            "label": "(3) x² 项系数",
            "answer": "3"
          },
          {
            "label": "(3) y² 项系数",
            "answer": "3"
          },
          {
            "label": "(3) 能为负填 1，不能填 0",
            "answer": "0"
          }
        ],
        "correct": "3，3，3，3，0",
        "explanation": "A−2B=3xy，xy=1 时得 3。按定义化为 A+B=3x²+3y²，平方项非负，因此不能为负。",
        "level": "challenge"
      }
    ]
  }
];

const mathMidtermByTopic = new Map(mathMidtermModules.map(module=>[module.key,module]));
const mathMidtermSubject = subjects.find(subject=>subject.id==='math');
for (const module of mathMidtermModules) {
  mathMidtermSubject.topics.push({
    key:module.key,
    title:module.title,
    term:'上',
    description:module.description,
    questions:module.questions.map(question=>({...question,subject:mathMidtermSubject.id,topic:module.key}))
  });
}
