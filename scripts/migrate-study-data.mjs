import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {DatabaseSync} from 'node:sqlite';

const [mode,database,owner,backup] = process.argv.slice(2);
assert.ok(['export','import'].includes(mode) && database && owner && backup,
  '用法: node scripts/migrate-study-data.mjs <export|import> <本地 SQLite 路径> <旧或新账号的内部 ID> <私有备份.json>');

const columns = ['attempt_ref','question_id','subject_id','term','correct','study_date','submitted_at',
  'homework_prompt','homework_reference','homework_explanation'];
const format = 'suxue-d1-owner-backup';
const schemaVersion = 1;
const select = 'SELECT '+columns.join(', ')+' FROM study_attempts WHERE owner_id = ?';
const db = new DatabaseSync(database,{readOnly:mode==='export',open:true});
try {
  if (mode==='export') {
    const records = db.prepare(select+' ORDER BY rowid').all(owner);
    await writeFile(backup,JSON.stringify({format,version:schemaVersion,records},null,2)+'\n',{flag:'wx',mode:0o600});
    console.log('已导出 '+records.length+' 条指定账号的记录。');
  } else {
    const data = JSON.parse(await readFile(backup,'utf8'));
    assert.ok(data?.format===format && data.version===schemaVersion && Array.isArray(data.records),'备份格式不受支持');
    assert.ok(data.records.every(row=>row && columns.slice(0,4).every(key=>typeof row[key]==='string' && row[key].length)
      && ['上','下'].includes(row.term) && [0,1].includes(row.correct) && /^\d{4}-\d{2}-\d{2}$/.test(row.study_date)
      && Number.isSafeInteger(row.submitted_at) && row.submitted_at>=0
      && columns.slice(7).every(key=>row[key]===null || typeof row[key]==='string')),'备份记录格式错误');
    const count = data.records.length;
    const existing = db.prepare(select+' AND attempt_ref = ?');
    const insert = db.prepare('INSERT INTO study_attempts (owner_id, '+columns.join(', ')+') VALUES ('+
      Array(columns.length+1).fill('?').join(', ')+') ON CONFLICT(owner_id, attempt_ref) DO NOTHING');
    let added = 0;
    db.exec('BEGIN IMMEDIATE');
    try {
      for (const row of data.records) {
        const previous = existing.get(owner,row.attempt_ref);
        if (previous && columns.some(column=>previous[column]!==row[column])) {
          throw new Error('发现同一作答编号下的不同数据，已取消整个导入以保留现有记录。');
        }
        added += Number(insert.run(owner,...columns.map(column=>row[column])).changes);
      }
      db.exec('COMMIT');
    } catch (error) {
      db.exec('ROLLBACK');
      throw error;
    }
    console.log('新增 '+added+' 条，已存在 '+(count-added)+' 条。');
  }
} finally {
  db.close();
}
