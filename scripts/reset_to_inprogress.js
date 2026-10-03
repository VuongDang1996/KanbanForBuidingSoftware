import { db } from '../server/db.js';

console.log('[Reset] Resetting all 54 stories to status = "in-progress" for 10-Gate Quality Audit...');
const result = db.prepare(`
  UPDATE stories 
  SET status = 'in-progress', updated_at = ?
`).run(new Date().toISOString());

console.log(`[Reset] Updated ${result.changes} stories to in-progress.`);
