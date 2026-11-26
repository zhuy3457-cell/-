const diagramReference = /(?:这张地图|(?<!地)图中|(?:下图|上图|右图|左图|附图)(?=\s*(?:$|[是为：:，。]))|[这该此本][张幅]图|[原附上下左右]图(?:中|所示|可知|显示)|(?:如|见|读|由|据|看|对照|参照|根据|结合|观察|按照)[下上左右附]?图(?:中|所示|可知|显示|[，。；：]|\s*[0-9０-９]+)|图\s*[0-9０-９]+\s*(?:中|所示|是|为|[，。；：（(])|图为.*示意图|as shown in the (?:figure|diagram|map|chart)\b)/i;
const tableReference = /(?:[上下附]表(?:中|所示|可知|显示|[，。；：])|(?:如|见|读|由|据|查看|参照|根据|结合|观察|按照)[上下附]?表(?:中|所示|可知|显示|[，。；：]|\s*[0-9０-９]+)|表中|按表格填写|as shown in the table\b)/i;

function validWebP(asset) {
  if (asset?.type!=='image/webp') return false;
  const bytes = Buffer.from(asset.body,'base64');
  return bytes.length>16 && bytes.toString('ascii',0,4)==='RIFF' &&
    bytes.toString('ascii',8,12)==='WEBP' && bytes.readUInt32LE(4)+8===bytes.length;
}

export function checkVisualMaterials(questions,assets) {
  const problems = [];
  for (const q of questions) {
    const context = [q.prompt,q.material ?? ''].join('\n');
    if (diagramReference.test(context) && !q.diagram && !q.numberLine) {
      problems.push(q.id+' 引用图，但题面没有图片或数轴');
    }
    if (tableReference.test(context) && !q.table) {
      problems.push(q.id+' 引用表格，但题面没有表格');
    }

    if (q.numberLine && (!q.numberLine.description?.trim() ||
        !Array.isArray(q.numberLine.marks) || !q.numberLine.marks.length ||
        q.numberLine.marks.some(([position])=>!Number.isFinite(position) || position<0 || position>100))) {
      problems.push(q.id+' 数轴缺少说明或有效刻度');
    }
    if (q.table && (!q.table.caption?.trim() || !q.table.headers?.length ||
        !q.table.rows?.length || q.table.rows.some(row=>row.length!==q.table.headers.length))) {
      problems.push(q.id+' 表格缺少标题、表头或数据列不齐');
    }

    const diagrams = [
      ...(q.diagram ? [['题面图片',q.diagram]] : []),
      ...(q.answerDiagram ? [['答后图片',q.answerDiagram]] : []),
      ...(q.answerFrames ?? []).map((frame,index)=>['动画第 '+(index+1)+' 帧',frame])
    ];
    for (const [label,diagram] of diagrams) {
      if (!diagram?.alt?.trim()) problems.push(q.id+' '+label+'缺少读图文字说明');
      if (!validWebP(assets['/'+diagram?.src])) problems.push(q.id+' '+label+'文件不存在、未打包或不是完整 WebP：'+diagram?.src);
    }
  }
  if (problems.length) throw new Error('读图材料检查未通过：\n'+problems.join('\n'));
}
