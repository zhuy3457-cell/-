const mathAlgebraModules = [
  {
    "key": "absolute-axis-first",
    "title": "绝对值化简 1–5",
    "range": "原资料第 1 页",
    "description": "读数轴后判符号，练习相反数和多层绝对值。",
    "notes": [
      {
        "label": "怎样判断 a+b 的正负？",
        "text": "一正一负时，比较两数到原点的距离。距离较长的一侧决定和的符号，距离相等时和为零。"
      },
      {
        "label": "怎样去掉绝对值？",
        "text": "先判绝对值内的式子与零的关系。为正时保留原式，为负时取其相反数，为零时结果为零。"
      }
    ],
    "sources": [
      {
        "title": "无锡梁溪区七上数学期中卷（公开预览）",
        "url": "https://www.jiangsu100.com/53520.html",
        "note": "参考数轴判号与绝对值化简的设问。"
      },
      {
        "title": "苏科版七上数学期中复习卷（公开预览）",
        "url": "https://zy.21cnjy.com/24218214",
        "note": "参考整式化简、代入与变量取值无关的设问。"
      }
    ],
    "questions": [
      {
        "id": "absolute-axis-1",
        "level": "challenge",
        "prompt": "1. (1) 依图判断三个式子的符号。(2) 化简 |b−c|+|a+b|−|c−a|。",
        "options": null,
        "steps": [
          {
            "label": "b−c □ 0（填比较符号）",
            "answer": "<",
            "symbol": true
          },
          {
            "label": "a+b □ 0（填比较符号）",
            "answer": "<",
            "symbol": true
          },
          {
            "label": "c−a □ 0（填比较符号）",
            "answer": ">",
            "symbol": true
          },
          {
            "label": "b 项系数",
            "answer": "-2"
          }
        ],
        "correct": "<，<，>，-2",
        "explanation": "a<0<b<c，且 |a|>b。原式为 (c−b)−(a+b)−(c−a)=−2b。",
        "numberLine": {
          "description": "从左到右依次为 a、0、b、c。a 到原点的距离大于 b 到原点的距离。",
          "marks": [
            [
              18,
              "a"
            ],
            [
              43,
              "0"
            ],
            [
              57,
              "b"
            ],
            [
              79,
              "c"
            ]
          ]
        }
      },
      {
        "id": "absolute-axis-2",
        "level": "standard",
        "prompt": "2. 依图化简 |b−a|−|c−b|+|a+b|。",
        "options": null,
        "steps": [
          {
            "label": "a 项系数",
            "answer": "2"
          },
          {
            "label": "b 项系数",
            "answer": "-1"
          },
          {
            "label": "c 项系数",
            "answer": "1"
          }
        ],
        "correct": "2，-1，1",
        "explanation": "c<b<0<a，且 a>|b|，故 a+b>0。去绝对值后为 (a−b)−(b−c)+(a+b)=2a−b+c。",
        "numberLine": {
          "description": "从左到右依次为 c、b、0、a。a 到原点的距离大于 b 到原点的距离。",
          "marks": [
            [
              19,
              "c"
            ],
            [
              40,
              "b"
            ],
            [
              49,
              "0"
            ],
            [
              83,
              "a"
            ]
          ]
        }
      },
      {
        "id": "absolute-axis-3",
        "level": "challenge",
        "prompt": "3. 点 A、B、C 分别表示 a、b、c。(1) 依图判断三个式子的符号。(2) 化简 |a+b|−|c−b|−|c−a|。",
        "options": null,
        "steps": [
          {
            "label": "a+b □ 0（填比较符号）",
            "answer": "<",
            "symbol": true
          },
          {
            "label": "c−b □ 0（填比较符号）",
            "answer": "<",
            "symbol": true
          },
          {
            "label": "c−a □ 0（填比较符号）",
            "answer": ">",
            "symbol": true
          },
          {
            "label": "b 项系数",
            "answer": "-2"
          }
        ],
        "correct": "<，<，>，-2",
        "explanation": "a<c<0<b，且 |a|>b。原式为 −(a+b)−(b−c)−(c−a)=−2b。",
        "numberLine": {
          "description": "从左到右依次为 A(a)、C(c)、0、B(b)，点 A 比点 B 离原点更远。",
          "marks": [
            [
              12,
              "a",
              "A"
            ],
            [
              30,
              "c",
              "C"
            ],
            [
              65,
              "0"
            ],
            [
              86,
              "b",
              "B"
            ]
          ]
        }
      },
      {
        "id": "absolute-axis-4",
        "level": "challenge",
        "prompt": "4. 已知 a<0、b>0、c>0，且 |b|<|a|<|c|。(1) 把 a、b、c 填入数轴。(2) 化简 |2a−b|+|b−c|−|c−a|。",
        "options": null,
        "steps": [
          {
            "label": "从左数第一个空位（填字母）",
            "answer": "a",
            "symbol": true
          },
          {
            "label": "从左数第二个空位（填字母）",
            "answer": "b",
            "symbol": true
          },
          {
            "label": "从左数第三个空位（填字母）",
            "answer": "c",
            "symbol": true
          },
          {
            "label": "a 项系数",
            "answer": "-1"
          }
        ],
        "correct": "a，b，c，-1",
        "explanation": "数轴顺序为 a、0、b、c。2a−b<0、b−c<0、c−a>0，原式为 (b−2a)+(c−b)−(c−a)=−a。",
        "numberLine": {
          "description": "原点左边有一个空位，右边有两个空位。右边第一个空位比左边空位离原点近，右边第二个空位比左边空位离原点远。",
          "marks": [
            [
              13,
              "□"
            ],
            [
              35,
              "0"
            ],
            [
              50,
              "□"
            ],
            [
              79,
              "□"
            ]
          ]
        }
      },
      {
        "id": "absolute-axis-5",
        "level": "challenge",
        "prompt": "5. 已知 |a|=|b|。(1) 求 a+b 与 a/b。(2) 判断五个式子的符号，等于零填“=”。(3) 化简 |a|−|a+b|−|c−a|+|c−b|−|−2b|，用 b 表示结果。",
        "options": null,
        "steps": [
          {
            "label": "(1) a+b",
            "answer": "0"
          },
          {
            "label": "(1) a/b",
            "answer": "-1"
          },
          {
            "label": "a □ 0（填比较符号）",
            "answer": ">",
            "symbol": true
          },
          {
            "label": "a+b □ 0（填比较符号）",
            "answer": "=",
            "symbol": true
          },
          {
            "label": "c−a □ 0（填比较符号）",
            "answer": "<",
            "symbol": true
          },
          {
            "label": "c−b □ 0（填比较符号）",
            "answer": "<",
            "symbol": true
          },
          {
            "label": "−2b □ 0（填比较符号）",
            "answer": ">",
            "symbol": true
          },
          {
            "label": "b 项系数",
            "answer": "3"
          }
        ],
        "correct": "0，-1，>，=，<，<，>，3",
        "explanation": "c<b<0<a 且 |a|=|b|，故 a=−b。原式为 a−0−(a−c)+(b−c)−(−2b)=3b，也等于 −3a。",
        "numberLine": {
          "description": "从左到右依次为 c、b、0、a。b 与 a 到原点的距离相等。",
          "marks": [
            [
              13,
              "c"
            ],
            [
              34,
              "b"
            ],
            [
              55,
              "0"
            ],
            [
              76,
              "a"
            ]
          ]
        }
      }
    ]
  },
  {
    "key": "absolute-axis-second",
    "title": "绝对值化简 6–10",
    "range": "原资料第 2 页",
    "description": "结合刻度、中点和距离关系拆绝对值。",
    "notes": [
      {
        "label": "中点在原点能推出什么？",
        "text": "若 A(a)、B(b) 分居原点两侧且原点是 AB 的中点，则 a+b=0。图上额外标出的 1 还可以用来判断 a+1 的符号。"
      },
      {
        "label": "怎样利用数轴的刻度和方向？",
        "text": "在数轴上先定位原点、正方向和已知刻度，再按左右位置比较大小，按离原点的距离比较绝对值。"
      }
    ],
    "sources": [
      {
        "title": "无锡梁溪区七上数学期中卷（公开预览）",
        "url": "https://www.jiangsu100.com/53520.html",
        "note": "参考数轴判号与绝对值化简的设问。"
      },
      {
        "title": "苏科版七上数学期中复习卷（公开预览）",
        "url": "https://zy.21cnjy.com/24218214",
        "note": "参考整式化简、代入与变量取值无关的设问。"
      }
    ],
    "questions": [
      {
        "id": "absolute-axis-6",
        "level": "challenge",
        "prompt": "6. (1) 依图判断四个式子的符号。(2) 化简 |a−b|+|b−c|−|c−a|+|b+c|。",
        "options": null,
        "steps": [
          {
            "label": "a−b □ 0（填比较符号）",
            "answer": ">",
            "symbol": true
          },
          {
            "label": "b−c □ 0（填比较符号）",
            "answer": ">",
            "symbol": true
          },
          {
            "label": "c−a □ 0（填比较符号）",
            "answer": "<",
            "symbol": true
          },
          {
            "label": "b+c □ 0（填比较符号）",
            "answer": "<",
            "symbol": true
          },
          {
            "label": "b 项系数",
            "answer": "-1"
          },
          {
            "label": "c 项系数",
            "answer": "-1"
          }
        ],
        "correct": ">，>，<，<，-1，-1",
        "explanation": "图中 a>b>0>c 且 |c|>b。前三项化为 (a−b)+(b−c)−(a−c)=0，余下 |b+c|=−b−c。",
        "numberLine": {
          "description": "等距整数刻度为 −2、−1、0、1、2。点 c 在 −1 与 0 之间，点 b 在 0 与 1 之间，点 a 在 1 与 2 之间。c 比 b 离原点更远。",
          "marks": [
            [
              9,
              "−2"
            ],
            [
              29,
              "−1"
            ],
            [
              33,
              "",
              "c"
            ],
            [
              49,
              "0"
            ],
            [
              53,
              "",
              "b"
            ],
            [
              69,
              "1"
            ],
            [
              78,
              "",
              "a"
            ],
            [
              89,
              "2"
            ]
          ]
        }
      },
      {
        "id": "absolute-axis-7",
        "level": "standard",
        "prompt": "7. 依图化简 2|a−b|+|a−c|−|c−b|。",
        "options": null,
        "steps": [
          {
            "label": "a 项系数",
            "answer": "-1"
          },
          {
            "label": "b 项系数",
            "answer": "1"
          }
        ],
        "correct": "-1，1",
        "explanation": "c<a<0<b。去绝对值后为 2(b−a)+(a−c)−(b−c)=b−a。",
        "numberLine": {
          "description": "从左到右依次为 c、a、0、b。",
          "marks": [
            [
              13,
              "c"
            ],
            [
              28,
              "a"
            ],
            [
              56,
              "0"
            ],
            [
              83,
              "b"
            ]
          ]
        }
      },
      {
        "id": "absolute-axis-8",
        "level": "challenge",
        "prompt": "8. 已知 a>0、b<0、c>0，且 |c|<|b|<|a|。(1) 将 a、b、c 填入数轴。(2) 化简 2|a−c|+|b+c|−|a−b|。",
        "options": null,
        "steps": [
          {
            "label": "从左数第一个空位（填字母）",
            "answer": "b",
            "symbol": true
          },
          {
            "label": "从左数第二个空位（填字母）",
            "answer": "c",
            "symbol": true
          },
          {
            "label": "从左数第三个空位（填字母）",
            "answer": "a",
            "symbol": true
          },
          {
            "label": "a 项系数",
            "answer": "1"
          },
          {
            "label": "c 项系数",
            "answer": "-3"
          }
        ],
        "correct": "b，c，a，1，-3",
        "explanation": "数轴顺序为 b、0、c、a。b+c<0，原式为 2(a−c)−(b+c)−(a−b)=a−3c。",
        "numberLine": {
          "description": "原点左边有一个空位，右边有两个空位。按数轴上从左到右的顺序填空。",
          "marks": [
            [
              24,
              "□"
            ],
            [
              49,
              "0"
            ],
            [
              63,
              "□"
            ],
            [
              85,
              "□"
            ]
          ]
        }
      },
      {
        "id": "absolute-axis-9",
        "level": "challenge",
        "prompt": "9. (1) 判断 a+b 和 2a−c 的符号。(2) 依图化简 |a+b|−|2a−c|+2|b+c|。",
        "options": null,
        "steps": [
          {
            "label": "a+b □ 0（填比较符号）",
            "answer": "<",
            "symbol": true
          },
          {
            "label": "2a−c □ 0（填比较符号）",
            "answer": "<",
            "symbol": true
          },
          {
            "label": "a 项系数",
            "answer": "1"
          },
          {
            "label": "b 项系数",
            "answer": "1"
          },
          {
            "label": "c 项系数",
            "answer": "1"
          }
        ],
        "correct": "<，<，1，1，1",
        "explanation": "a<b<0<c，且 c>|b|。原式为 −(a+b)−(c−2a)+2(b+c)=a+b+c。",
        "numberLine": {
          "description": "从左到右依次为 a、b、0、c。c 比 b 离原点更远。",
          "marks": [
            [
              14,
              "a"
            ],
            [
              43,
              "b"
            ],
            [
              56,
              "0"
            ],
            [
              80,
              "c"
            ]
          ]
        }
      },
      {
        "id": "absolute-axis-10",
        "level": "challenge",
        "prompt": "10. 数轴上点 A、O、B 分别表示 a、0、b，O 是 AB 的中点。化简 |a+b|+|2a−b|+2|a+1|，用 a 表示结果。",
        "options": null,
        "steps": [
          {
            "label": "a 项系数",
            "answer": "-5"
          },
          {
            "label": "常数项",
            "answer": "-2"
          }
        ],
        "correct": "-5，-2",
        "explanation": "中点条件给出 b=−a。图中 b>1，故 a<−1。原式为 0−3a−2(a+1)=−5a−2，也可写成 5b−2。",
        "numberLine": {
          "description": "从左到右依次为 A(a)、O(0)、1、B(b)。O 是 AB 的中点。",
          "marks": [
            [
              20,
              "a",
              "A"
            ],
            [
              51,
              "0",
              "O"
            ],
            [
              67,
              "1"
            ],
            [
              82,
              "b",
              "B"
            ]
          ]
        }
      }
    ]
  },
  {
    "key": "algebra-simplify-first",
    "title": "代数式化简求值 1–6",
    "range": "原资料第 1 页",
    "description": "先去括号、合并同类项，再代入或消项。",
    "notes": [
      {
        "label": "什么时候先化简更省力？",
        "text": "先展开并合并同类项，抵消的项就不用代值。括号前乘负数时，逐项检查符号是否改变。"
      },
      {
        "label": "只填系数时怎么做？",
        "text": "对照输入框给出的项，把对应的数字系数写入。原式中需填的项在化简后抵消时，系数为 0。"
      }
    ],
    "sources": [
      {
        "title": "无锡梁溪区七上数学期中卷（公开预览）",
        "url": "https://www.jiangsu100.com/53520.html",
        "note": "参考数轴判号与绝对值化简的设问。"
      },
      {
        "title": "苏科版七上数学期中复习卷（公开预览）",
        "url": "https://zy.21cnjy.com/24218214",
        "note": "参考整式化简、代入与变量取值无关的设问。"
      }
    ],
    "questions": [
      {
        "id": "algebra-simplify-1",
        "level": "challenge",
        "prompt": "1. 化简 (1) 2a−2b−6a+3b。(2) 2(2a³b+ab³)−3(ab³−3a³b)。",
        "options": null,
        "steps": [
          {
            "label": "(1) a 项系数",
            "answer": "-4"
          },
          {
            "label": "(1) b 项系数",
            "answer": "1"
          },
          {
            "label": "(2) a³b 项系数",
            "answer": "13"
          },
          {
            "label": "(2) ab³ 项系数",
            "answer": "-1"
          }
        ],
        "correct": "-4，1，13，-1",
        "explanation": "（1）合并得 −4a+b。（2）先展开得 4a³b+2ab³−3ab³+9a³b，合并得 13a³b−ab³。",
        "solution": [
          {
            "title": "（1）按字母分组合并",
            "lines": [
              "2a−2b−6a+3b = (2−6)a+(−2+3)b",
              "= −4a+b"
            ]
          },
          {
            "title": "（2）先分配，再合并",
            "lines": [
              "2(2a³b+ab³)−3(ab³−3a³b)",
              "= 4a³b+2ab³−3ab³+9a³b",
              "= (4+9)a³b+(2−3)ab³",
              "= 13a³b−ab³"
            ]
          }
        ]
      },
      {
        "id": "algebra-simplify-2",
        "level": "challenge",
        "prompt": "2. 先化简再求值。4x²+2(2xy−y²)−3(x²+2xy)，其中 x=−1、y=2。",
        "options": null,
        "steps": [
          {
            "label": "x² 项系数",
            "answer": "1"
          },
          {
            "label": "xy 项系数",
            "answer": "-2"
          },
          {
            "label": "y² 项系数",
            "answer": "-2"
          },
          {
            "label": "代入后的值",
            "answer": "-3"
          }
        ],
        "correct": "1，-2，-2，-3",
        "explanation": "原式=x²−2xy−2y²。代入得 1+4−8=−3。",
        "solution": [
          {
            "title": "去括号并合并",
            "lines": [
              "4x²+2(2xy−y²)−3(x²+2xy)",
              "= 4x²+4xy−2y²−3x²−6xy",
              "= x²−2xy−2y²"
            ]
          },
          {
            "title": "代入 x=−1、y=2",
            "lines": [
              "(−1)²−2×(−1)×2−2×2²",
              "= 1+4−8 = −3"
            ]
          }
        ]
      },
      {
        "id": "algebra-simplify-3",
        "level": "standard",
        "prompt": "3. 先化简再求值。2x²+(−x²−2xy)−2(−xy+2y²)，其中 x=3、y=−2。",
        "options": null,
        "steps": [
          {
            "label": "x² 项系数",
            "answer": "1"
          },
          {
            "label": "y² 项系数",
            "answer": "-4"
          },
          {
            "label": "代入后的值",
            "answer": "-7"
          }
        ],
        "correct": "1，-4，-7",
        "explanation": "xy 项抵消，原式=x²−4y²。代入得 9−16=−7。",
        "solution": [
          {
            "title": "展开各项",
            "lines": [
              "2x²+(−x²−2xy)−2(−xy+2y²)",
              "= 2x²−x²−2xy+2xy−4y²",
              "= x²−4y²"
            ]
          },
          {
            "title": "代入 x=3、y=−2",
            "lines": [
              "3²−4×(−2)² = 9−16 = −7"
            ]
          }
        ]
      },
      {
        "id": "algebra-simplify-4",
        "level": "standard",
        "prompt": "4. 先化简再求值。4(3a²b−2ab²)−6(−ab²+2a²b)，其中 a=−1、b=−2。",
        "options": null,
        "steps": [
          {
            "label": "ab² 项系数",
            "answer": "-2"
          },
          {
            "label": "代入后的值",
            "answer": "8"
          }
        ],
        "correct": "-2，8",
        "explanation": "a²b 项抵消，原式=−2ab²。代入得 −2×(−1)×4=8。",
        "solution": [
          {
            "title": "展开并消去同类项",
            "lines": [
              "4(3a²b−2ab²)−6(−ab²+2a²b)",
              "= 12a²b−8ab²+6ab²−12a²b",
              "= −2ab²"
            ]
          },
          {
            "title": "代入 a=−1、b=−2",
            "lines": [
              "−2×(−1)×(−2)² = 2×4 = 8"
            ]
          }
        ]
      },
      {
        "id": "algebra-simplify-5",
        "level": "challenge",
        "prompt": "5. A=2a²−a+3b−ab，B=a²+2a−b+ab。(1) 当 a=1、b=2 时求 A−2B。(2) 若 A−2B 与 b 的取值无关，求 a。",
        "options": null,
        "steps": [
          {
            "label": "(1) A−2B 的值",
            "answer": "-1"
          },
          {
            "label": "(2) a",
            "answer": "5/3"
          }
        ],
        "correct": "-1，5/3",
        "explanation": "A−2B=−5a+(5−3a)b。代入 1、2 得 −1。若与 b 无关，令 5−3a=0，得 a=5/3。",
        "solution": [
          {
            "title": "（1）先求 A−2B，再代入",
            "lines": [
              "A−2B = (2a²−a+3b−ab)−2(a²+2a−b+ab)",
              "= 2a²−a+3b−ab−2a²−4a+2b−2ab",
              "= −5a+5b−3ab",
              "a=1、b=2 时，原式 = −5+10−6 = −1。"
            ]
          },
          {
            "title": "（2）把含 b 的项合并",
            "lines": [
              "−5a+5b−3ab = −5a+(5−3a)b",
              "结果与 b 无关，所以 5−3a=0，解得 a=5/3。"
            ]
          }
        ]
      },
      {
        "id": "algebra-simplify-6",
        "level": "challenge",
        "prompt": "6. A=3x²−2mx+3x+1，B=2x²+2mx−1。(1) 化简 2A+3B。(2) 当 m=2、x=−2 时求值。",
        "options": null,
        "steps": [
          {
            "label": "(1) x² 项系数",
            "answer": "12"
          },
          {
            "label": "(1) mx 项系数",
            "answer": "2"
          },
          {
            "label": "(1) x 项系数",
            "answer": "6"
          },
          {
            "label": "(1) 常数项",
            "answer": "-1"
          },
          {
            "label": "(2) 的值",
            "answer": "27"
          }
        ],
        "correct": "12，2，6，-1，27",
        "explanation": "2A+3B=12x²+2mx+6x−1。代入 m=2、x=−2，得 48−8−12−1=27。",
        "solution": [
          {
            "title": "（1）分别展开 2A、3B",
            "lines": [
              "2A+3B = 2(3x²−2mx+3x+1)+3(2x²+2mx−1)",
              "= 6x²−4mx+6x+2+6x²+6mx−3",
              "= 12x²+2mx+6x−1 = 12x²+(2m+6)x−1"
            ]
          },
          {
            "title": "（2）代入 m=2、x=−2",
            "lines": [
              "12×(−2)²+(2×2+6)×(−2)−1",
              "= 48−20−1 = 27"
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "algebra-simplify-second",
    "title": "代数式化简求值 7–10",
    "range": "原资料第 2 页",
    "description": "分辨同类项，并用已知整式整体代入。",
    "notes": [
      {
        "label": "怎样把条件整体代入？",
        "text": "先观察目标式可否写成题目给出的几个整体，例如 7x+7y=7(x+y)。"
      },
      {
        "label": "如何判断与 y 无关？",
        "text": "将含 y 的项合并为由系数乘 y 的形式。结果对任意 y 不变时，含 y 项的系数取零。"
      }
    ],
    "sources": [
      {
        "title": "无锡梁溪区七上数学期中卷（公开预览）",
        "url": "https://www.jiangsu100.com/53520.html",
        "note": "参考数轴判号与绝对值化简的设问。"
      },
      {
        "title": "苏科版七上数学期中复习卷（公开预览）",
        "url": "https://zy.21cnjy.com/24218214",
        "note": "参考整式化简、代入与变量取值无关的设问。"
      }
    ],
    "questions": [
      {
        "id": "algebra-simplify-7",
        "level": "challenge",
        "prompt": "7. 化简 (1) 2a²−4a−3a²+6a。(2) (3a²+a−5)−(4−a+7a²)。",
        "options": null,
        "steps": [
          {
            "label": "(1) a² 项系数",
            "answer": "-1"
          },
          {
            "label": "(1) a 项系数",
            "answer": "2"
          },
          {
            "label": "(2) a² 项系数",
            "answer": "-4"
          },
          {
            "label": "(2) a 项系数",
            "answer": "2"
          },
          {
            "label": "(2) 常数项",
            "answer": "-9"
          }
        ],
        "correct": "-1，2，-4，2，-9",
        "explanation": "（1）合并得 −a²+2a。（2）去括号后为 3a²+a−5−4+a−7a²，合并得 −4a²+2a−9。",
        "solution": [
          {
            "title": "（1）分别合并二次项和一次项",
            "lines": [
              "2a²−4a−3a²+6a",
              "= (2−3)a²+(−4+6)a",
              "= −a²+2a"
            ]
          },
          {
            "title": "（2）减号后的每一项都变号",
            "lines": [
              "(3a²+a−5)−(4−a+7a²)",
              "= 3a²+a−5−4+a−7a²",
              "= (3−7)a²+(1+1)a−5−4",
              "= −4a²+2a−9"
            ]
          }
        ]
      },
      {
        "id": "algebra-simplify-8",
        "level": "standard",
        "prompt": "8. 先化简再求值。3(2x²y−3xy²)−2(2xy²−3x²y)，其中 x=1、y=−1。",
        "options": null,
        "steps": [
          {
            "label": "x²y 项系数",
            "answer": "12"
          },
          {
            "label": "xy² 项系数",
            "answer": "-13"
          },
          {
            "label": "代入后的值",
            "answer": "-25"
          }
        ],
        "correct": "12，-13，-25",
        "explanation": "原式=12x²y−13xy²，代入得 −12−13=−25。",
        "solution": [
          {
            "title": "去括号并合并",
            "lines": [
              "3(2x²y−3xy²)−2(2xy²−3x²y)",
              "= 6x²y−9xy²−4xy²+6x²y",
              "= 12x²y−13xy²"
            ]
          },
          {
            "title": "代入 x=1、y=−1",
            "lines": [
              "12×1²×(−1)−13×1×(−1)² = −12−13 = −25"
            ]
          }
        ]
      },
      {
        "id": "algebra-simplify-9",
        "level": "challenge",
        "prompt": "9. A=3x²−x+2y−4xy，B=2x²−3x−y+2xy。(1) 化简 2A−3B。(2) 若 x+y=5/7、xy=−1，求值。(3) 若该式的值与 y 无关，求 x。",
        "options": null,
        "steps": [
          {
            "label": "(1) x 项系数",
            "answer": "7"
          },
          {
            "label": "(1) y 项系数",
            "answer": "7"
          },
          {
            "label": "(1) xy 项系数",
            "answer": "-14"
          },
          {
            "label": "(2) 的值",
            "answer": "19"
          },
          {
            "label": "(3) x",
            "answer": "1/2"
          }
        ],
        "correct": "7，7，-14，19，1/2",
        "explanation": "化简得 7x+7y−14xy。（2）写成 7(x+y)−14xy，代入得 5+14=19。（3）写成 7x+(7−14x)y，令 7−14x=0。",
        "solution": [
          {
            "title": "（1）展开 2A−3B",
            "lines": [
              "2(3x²−x+2y−4xy)−3(2x²−3x−y+2xy)",
              "= 6x²−2x+4y−8xy−6x²+9x+3y−6xy",
              "= 7x+7y−14xy"
            ]
          },
          {
            "title": "（2）把 x+y 与 xy 整体代入",
            "lines": [
              "7x+7y−14xy = 7(x+y)−14xy",
              "= 7×(5/7)−14×(−1) = 19"
            ]
          },
          {
            "title": "（3）找含 y 项的系数",
            "lines": [
              "7x+7y−14xy = 7x+(7−14x)y",
              "结果与 y 无关，需要 7−14x=0，所以 x=1/2。"
            ]
          }
        ]
      },
      {
        "id": "algebra-simplify-10",
        "level": "standard",
        "prompt": "10. 先化简再求值。2x²y+2(3xy−4x²y)−(1/2)(12xy−8x²y)，其中 x=−1/2、y=4。",
        "options": null,
        "steps": [
          {
            "label": "x²y 项系数",
            "answer": "-2"
          },
          {
            "label": "代入后的值",
            "answer": "-2"
          }
        ],
        "correct": "-2，-2",
        "explanation": "xy 项抵消，x²y 的系数为 2−8+4=−2。代入 x²y=1 得 −2。",
        "solution": [
          {
            "title": "展开并抵消 xy 项",
            "lines": [
              "2x²y+2(3xy−4x²y)−(1/2)(12xy−8x²y)",
              "= 2x²y+6xy−8x²y−6xy+4x²y",
              "= (2−8+4)x²y = −2x²y"
            ]
          },
          {
            "title": "代入 x=−1/2、y=4",
            "lines": [
              "−2×(−1/2)²×4 = −2×(1/4)×4 = −2"
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "algebra-simplify-third",
    "title": "代数式化简求值 11–14",
    "range": "原资料第 3 页",
    "description": "练习变量无关、分数代入与错算还原。",
    "notes": [
      {
        "label": "从误算的差式怎样还原和式？",
        "text": "若误算结果是 D=A−B，则 A+B=D+2B。若还要求 A−3B，可以算 D−2B。"
      }
    ],
    "sources": [
      {
        "title": "无锡梁溪区七上数学期中卷（公开预览）",
        "url": "https://www.jiangsu100.com/53520.html",
        "note": "参考数轴判号与绝对值化简的设问。"
      },
      {
        "title": "苏科版七上数学期中复习卷（公开预览）",
        "url": "https://zy.21cnjy.com/24218214",
        "note": "参考整式化简、代入与变量取值无关的设问。"
      }
    ],
    "questions": [
      {
        "id": "algebra-simplify-11",
        "level": "challenge",
        "prompt": "11. A=2x²+3xy+2y，B=x²−xy+x。(1) 化简 A−2B。(2) 当 x 取何值时，A−2B 与 y 无关？",
        "options": null,
        "steps": [
          {
            "label": "(1) xy 项系数",
            "answer": "5"
          },
          {
            "label": "(1) y 项系数",
            "answer": "2"
          },
          {
            "label": "(1) x 项系数",
            "answer": "-2"
          },
          {
            "label": "(2) x",
            "answer": "-2/5"
          }
        ],
        "correct": "5，2，-2，-2/5",
        "explanation": "A−2B=5xy+2y−2x=(5x+2)y−2x。令 5x+2=0，得 x=−2/5。",
        "solution": [
          {
            "title": "（1）化简 A−2B",
            "lines": [
              "2x²+3xy+2y−2(x²−xy+x)",
              "= 2x²+3xy+2y−2x²+2xy−2x",
              "= 5xy+2y−2x"
            ]
          },
          {
            "title": "（2）提取 y，再求 x",
            "lines": [
              "5xy+2y−2x = (5x+2)y−2x",
              "要使 A−2B 的值与 y 无关，令 y 的系数 5x+2=0。",
              "解得 x=−2/5。"
            ]
          }
        ]
      },
      {
        "id": "algebra-simplify-12",
        "level": "standard",
        "prompt": "12. 先化简再求值。5(3a²b−ab²)−(ab²+3a²b)，其中 a=1/2、b=1/3。",
        "options": null,
        "steps": [
          {
            "label": "a²b 项系数",
            "answer": "12"
          },
          {
            "label": "ab² 项系数",
            "answer": "-6"
          },
          {
            "label": "代入后的值",
            "answer": "2/3"
          }
        ],
        "correct": "12，-6，2/3",
        "explanation": "化简为 12a²b−6ab²。分别代入得 1 和 −1/3，合计 2/3。",
        "solution": [
          {
            "title": "去括号并合并",
            "lines": [
              "5(3a²b−ab²)−(ab²+3a²b)",
              "= 15a²b−5ab²−ab²−3a²b",
              "= 12a²b−6ab²"
            ]
          },
          {
            "title": "代入 a=1/2、b=1/3",
            "lines": [
              "12×(1/2)²×(1/3)−6×(1/2)×(1/3)²",
              "= 1−1/3 = 2/3"
            ]
          }
        ]
      },
      {
        "id": "algebra-simplify-13",
        "level": "standard",
        "prompt": "13. 先化简再求值。−3(x²y−(1/3)xy²)−(−3x²y+2xy²)+xy，其中 x=2、y=−1/2。",
        "options": null,
        "steps": [
          {
            "label": "xy² 项系数",
            "answer": "-1"
          },
          {
            "label": "xy 项系数",
            "answer": "1"
          },
          {
            "label": "代入后的值",
            "answer": "-3/2"
          }
        ],
        "correct": "-1，1，-3/2",
        "explanation": "x²y 项抵消，原式=−xy²+xy。代入得 −1/2−1=−3/2。",
        "solution": [
          {
            "title": "展开正负号并合并",
            "lines": [
              "−3(x²y−(1/3)xy²)−(−3x²y+2xy²)+xy",
              "= −3x²y+xy²+3x²y−2xy²+xy",
              "= xy−xy²"
            ]
          },
          {
            "title": "代入 x=2、y=−1/2",
            "lines": [
              "2×(−1/2)−2×(−1/2)² = −1−1/2 = −3/2"
            ]
          }
        ]
      },
      {
        "id": "algebra-simplify-14",
        "level": "challenge",
        "prompt": "14. B=3x²y−2xy+x+2。把 A+B 算成 A−B，误算为 6x²y+4xy−2x−1。(1) 求正确的 A+B。(2) 若 A−3B 的值与 x 无关，求 y。",
        "options": null,
        "steps": [
          {
            "label": "(1) x²y 项系数",
            "answer": "12"
          },
          {
            "label": "(1) 常数项",
            "answer": "3"
          },
          {
            "label": "(2) y",
            "answer": "1/2"
          }
        ],
        "correct": "12，3，1/2",
        "explanation": "设误算结果为 D。A+B=D+2B=12x²y+3。A−3B=D−2B=(8y−4)x−5，令 8y−4=0。",
        "solution": [
          {
            "title": "（1）由误算的差还原正确的和",
            "lines": [
              "A+B = (A−B)+2B",
              "= 6x²y+4xy−2x−1+2(3x²y−2xy+x+2)",
              "= 6x²y+4xy−2x−1+6x²y−4xy+2x+4",
              "= 12x²y+3"
            ]
          },
          {
            "title": "（2）找使 A−3B 与 x 无关的 y",
            "lines": [
              "A−3B = (A+B)−4B",
              "= 12x²y+3−4(3x²y−2xy+x+2)",
              "= 8xy−4x−5 = (8y−4)x−5",
              "令 8y−4=0，解得 y=1/2。"
            ]
          }
        ]
      }
    ]
  },
  {
    "key": "algebra-simplify-fourth",
    "title": "代数式化简求值 15–18",
    "range": "原资料第 4 页",
    "description": "练习多层括号、分数系数和作差比较。",
    "notes": [
      {
        "label": "怎样比较两个整式？",
        "text": "可先计算差 M−N，再根据差的正负比较。如果差式是平方加正数，则差恒为正。"
      }
    ],
    "sources": [
      {
        "title": "无锡梁溪区七上数学期中卷（公开预览）",
        "url": "https://www.jiangsu100.com/53520.html",
        "note": "参考数轴判号与绝对值化简的设问。"
      },
      {
        "title": "苏科版七上数学期中复习卷（公开预览）",
        "url": "https://zy.21cnjy.com/24218214",
        "note": "参考整式化简、代入与变量取值无关的设问。"
      }
    ],
    "questions": [
      {
        "id": "algebra-simplify-15",
        "level": "standard",
        "prompt": "15. 先化简再求值。2(a²−(1/2)ab)−3(−(2/3)ab+a²)+a²，其中 a=3、b=−1/2。",
        "options": null,
        "steps": [
          {
            "label": "ab 项系数",
            "answer": "1"
          },
          {
            "label": "代入后的值",
            "answer": "-3/2"
          }
        ],
        "correct": "1，-3/2",
        "explanation": "a² 项系数为 2−3+1=0，ab 项系数为 −1+2=1。原式=ab=−3/2。",
        "solution": [
          {
            "title": "先展开，再合并",
            "lines": [
              "2(a²−(1/2)ab)−3(−(2/3)ab+a²)+a²",
              "= 2a²−ab+2ab−3a²+a²",
              "= (2−3+1)a²+(−1+2)ab = ab"
            ]
          },
          {
            "title": "代入 a=3、b=−1/2",
            "lines": [
              "ab = 3×(−1/2) = −3/2"
            ]
          }
        ]
      },
      {
        "id": "algebra-simplify-16",
        "level": "standard",
        "prompt": "16. 先化简再求值。2a²b−[2ab²−2(a²b+2ab²)]，其中 a=−1/2、b=2。",
        "options": null,
        "steps": [
          {
            "label": "a²b 项系数",
            "answer": "4"
          },
          {
            "label": "ab² 项系数",
            "answer": "2"
          },
          {
            "label": "代入后的值",
            "answer": "-2"
          }
        ],
        "correct": "4，2，-2",
        "explanation": "方括号内=−2a²b−2ab²，原式=4a²b+2ab²。代入得 2−4=−2。",
        "solution": [
          {
            "title": "先化简方括号",
            "lines": [
              "2ab²−2(a²b+2ab²)",
              "= 2ab²−2a²b−4ab² = −2a²b−2ab²"
            ]
          },
          {
            "title": "去外层括号并代入",
            "lines": [
              "原式 = 2a²b−(−2a²b−2ab²) = 4a²b+2ab²",
              "a=−1/2、b=2 时，原式 = 4×(1/4)×2+2×(−1/2)×4",
              "= 2−4 = −2。"
            ]
          }
        ]
      },
      {
        "id": "algebra-simplify-17",
        "level": "challenge",
        "prompt": "17. M=4x²−2x−1，N=3x²−2x−5。(1) 当 x=−1 时，求 4M−(2M+3N)。(2) 比较 M、N 大小。",
        "options": null,
        "steps": [
          {
            "label": "(1) 代入后的值",
            "answer": "10"
          },
          {
            "label": "(2) M □ N（填比较符号）",
            "answer": ">",
            "symbol": true
          }
        ],
        "correct": "10，>",
        "explanation": "（1）2M−3N=−x²+2x+13，代入得 10。（2）M−N=x²+4>0，所以 M>N。",
        "solution": [
          {
            "title": "（1）整体化简后代入",
            "lines": [
              "4M−(2M+3N) = 2M−3N",
              "= 2(4x²−2x−1)−3(3x²−2x−5)",
              "= 8x²−4x−2−9x²+6x+15 = −x²+2x+13",
              "x=−1 时，原式 = −1−2+13 = 10。"
            ]
          },
          {
            "title": "（2）作差比较",
            "lines": [
              "M−N = (4x²−2x−1)−(3x²−2x−5)",
              "= x²+4",
              "任意 x 都有 x²≥0，因此 M−N≥4>0，所以 M>N。"
            ]
          }
        ]
      },
      {
        "id": "algebra-simplify-18",
        "level": "challenge",
        "prompt": "18. B=2x²y−3xy+2x+5。把 A+B 算成 A−B，误算为 4x²y+xy−x−4。(1) 求正确的 A+B。(2) 若 A−3B 的值与 x 无关，求 y。",
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
        "explanation": "设误算结果为 D。A+B=D+2B=8x²y−5xy+3x+6。A−3B=D−2B=(7y−5)x−14，令 7y−5=0。",
        "solution": [
          {
            "title": "解法一 · 先从误算结果还原 A",
            "lines": [
              "A = (A−B)+B",
              "= (4x²y+xy−x−4)+(2x²y−3xy+2x+5)",
              "= 6x²y−2xy+x+1"
            ]
          },
          {
            "title": "（1）在 A 的基础上求 A+B",
            "lines": [
              "A+B = (6x²y−2xy+x+1)+(2x²y−3xy+2x+5)",
              "= 8x²y−5xy+3x+6"
            ]
          },
          {
            "title": "（2）令含 x 的项抵消",
            "lines": [
              "A−3B = 6x²y−2xy+x+1−3(2x²y−3xy+2x+5)",
              "= 7xy−5x−14 = (7y−5)x−14",
              "结果与 x 无关，所以 7y−5=0，解得 y=5/7。"
            ]
          },
          {
            "title": "解法二 · 直接使用差式",
            "lines": [
              "A+B = (A−B)+2B = 8x²y−5xy+3x+6",
              "A−3B = (A−B)−2B = (7y−5)x−14，同样得 y=5/7。"
            ]
          }
        ]
      }
    ]
  }
];

const mathAlgebraByTopic = new Map(mathAlgebraModules.map(module=>[module.key,module]));
const mathAlgebraSubject = subjects.find(subject=>subject.id==='math');
for (const module of mathAlgebraModules) {
  mathAlgebraSubject.topics.push({
    key:module.key,
    title:module.title,
    term:'上',
    description:module.description,
    questions:module.questions.map(question=>({...question,subject:mathAlgebraSubject.id,topic:module.key}))
  });
}
