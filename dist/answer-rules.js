const normalizeDictation = text => text.normalize('NFKC').replace(/[\p{P}\s]/gu,'');
const fieldValues = (question, values) => (question.steps ?? question.blanks).map((_,index)=>Array.isArray(values)?(values[index]??''):'');
function rationalParts(text) {
  const fraction = /^([+-]?\d+)\s*\/\s*([+-]?\d+)$/.exec(text);
  if (fraction) {
    const denominator = BigInt(fraction[2]);
    return denominator ? [BigInt(fraction[1]),denominator] : null;
  }
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(text)) return null;
  const [whole, decimals=''] = text.split('.');
  return [BigInt(whole+decimals),10n**BigInt(decimals.length)];
}
function matchesNumber(raw, expected) {
  const normalized = raw.normalize('NFKC').replace(/[−–—]/g,'-').replace(/[⁄∕÷]/g,'/').trim();
  const actual = rationalParts(normalized);
  const target = rationalParts(String(expected).trim());
  if (actual && target) return actual[0]*target[1]===target[0]*actual[1];
  return !!actual && !normalized.includes('/') && Number(normalized)===Number(expected);
}
const normalizeStepText = value => value.normalize('NFKC').trim().toLowerCase();
const normalizeEnglish = value => normalizeStepText(value).replace(/[’‘ʼ]/g,"'").replace(/[,，.。?!？！‐‑-]+/g,' ').replace(/\s+/g,' ').trim();
function matchesStep(step,value) {
  if (step.text) {
    const normalize = step.text === 'english' ? normalizeEnglish : normalizeStepText;
    const entered = normalize(value);
    return [step.answer,...(step.aliases ?? [])].some(answer=>normalize(answer)===entered);
  }
  if (step.symbol) return value.normalize('NFKC').trim()===step.answer;
  return matchesNumber(value,step.answer);
}
function answerMatches(question, value) {
  if (question.steps) return question.steps.every((step,index)=>matchesStep(step,value[index]));
  if (question.blanks) return question.blanks.every((expected,index)=>normalizeDictation(value[index])===normalizeDictation(expected));
  return question.options ? value===question.correct : matchesNumber(value,question.correct);
}
