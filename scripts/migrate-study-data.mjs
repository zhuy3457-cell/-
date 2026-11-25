import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {DatabaseSync} from 'node:sqlite';

const [mode,database,owner,backup] = process.argv.slice(2);
assert.ok(['export','import'].includes(mode) && database && owner && backup,
  '用法: node scripts/migrate-study-data.mjs <export|import> <本地 SQLite 路径> <旧或新账号的内部 ID> <私有备份.json>');

const columns = ['attempt_ref','question_id','subject_id','term','correct','study_date','submitted_at',
  'homework_prompt','homework_reference','homework_explanation'];
const format = 'suxue-d1-owner-backup';
const schemaVersion = 2;
const favoriteColumns = ['event_ref','question_id','selected'];
const favoriteSelect = 'SELECT '+favoriteColumns.join(', ')+' FROM study_favorite_events WHERE owner_id = ? ORDER BY rowid';
const select = 'SELECT '+columns.join(', ')+' FROM study_attempts WHERE owner_id = ?';
const db = new DatabaseSync(database,{readOnly:mode==='export',open:true});
try {
  if (mode==='export') {
    const records = db.prepare(select+' ORDER BY rowid').all(owner);
    const hasFavorites = db.prepare("SELECT 1 FROM sqlite_schema WHERE type='table' AND name='study_favorite_events'").get();
    const favorites = hasFavorites ? db.prepare(favoriteSelect).all(owner) : [];
    await writeFile(backup,JSON.stringify({format,version:schemaVersion,records,favorites},null,2)+'\n',{flag:'wx',mode:0o600});
    console.log('已导出 '+records.length+' 条作答和 '+favorites.length+' 条收藏变更。');
  } else {
    const data = JSON.parse(await readFile(backup,'utf8'));
    assert.ok(data?.format===format && [1,schemaVersion].includes(data.version) && Array.isArray(data.records),'备份格式不受支持');
    assert.ok(data.records.every(row=>row && columns.slice(0,4).every(key=>typeof row[key]==='string' && row[key].length)
      && ['上','下'].includes(row.term) && [0,1].includes(row.correct) && /^\d{4}-\d{2}-\d{2}$/.test(row.study_date)
      && Number.isSafeInteger(row.submitted_at) && row.submitted_at>=0
      && columns.slice(7).every(key=>row[key]===null || typeof row[key]==='string')),'备份记录格式错误');
    const favorites = data.version===1 ? [] : data.favorites;
    assert.ok(Array.isArray(favorites) && favorites.every(row=>row &&
      favoriteColumns.slice(0,2).every(key=>typeof row[key]==='string' && row[key].length) &&
      [0,1].includes(row.selected)) &&
      new Set(favorites.map(row=>row.event_ref)).size===favorites.length,'收藏备份格式错误');
    const count = data.records.length;
    const existing = db.prepare(select+' AND attempt_ref = ?');
    const insert = db.prepare('INSERT INTO study_attempts (owner_id, '+columns.join(', ')+') VALUES ('+
      Array(columns.length+1).fill('?').join(', ')+') ON CONFLICT(owner_id, attempt_ref) DO NOTHING');
    let added = 0;
    let favoriteAdded = 0;
    db.exec('BEGIN IMMEDIATE');
    try {
      for (const row of data.records) {
        const previous = existing.get(owner,row.attempt_ref);
        if (previous && columns.some(column=>previous[column]!==row[column])) {
          throw new Error('发现同一作答编号下的不同数据，已取消整个导入以保留现有记录。');
        }
        added += Number(insert.run(owner,...columns.map(column=>row[column])).changes);
      }
      if (favorites.length) {
        const existingFavorites = db.prepare(favoriteSelect).all(owner);
        const byRef = new Map(existingFavorites.map(row=>[row.event_ref,row]));
        const group = rows=>Map.groupBy(rows,row=>row.question_id);
        const groups = group(existingFavorites);
        for (const [id,items] of group(favorites)) {
          const previous = groups.get(id) ?? [];
          if (previous.slice(0,items.length).some((row,index)=>favoriteColumns.some(column=>row[column]!==items[index][column]))) {
            throw new Error('收藏历史存在冲突，已取消导入以保留目标账号的记录。');
          }
        }
        const add = db.prepare('INSERT INTO study_favorite_events (owner_id,event_ref,question_id,selected) VALUES (?,?,?,?)');
        for (const row of favorites) {
          const previous = byRef.get(row.event_ref);
          if (previous && favoriteColumns.some(column=>previous[column]!==row[column])) {
            throw new Error('收藏编号存在冲突，已取消导入。');
          }
          if (!previous) favoriteAdded += Number(add.run(owner,...favoriteColumns.map(column=>row[column])).changes);
        }
      }
      db.exec('COMMIT');
    } catch (error) {
      db.exec('ROLLBACK');
      throw error;
    }
    console.log('新增 '+added+' 条作答、'+favoriteAdded+' 条收藏变更，已有 '+(count-added)+' 条作答。');
  }
} finally {
  db.close();
}
