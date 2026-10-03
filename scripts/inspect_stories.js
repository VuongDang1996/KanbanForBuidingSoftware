import { db } from '../server/db.js';

const ids = ['ELSA-102', 'PRON-101', 'ELSA-202', 'GAME-101', 'PAY-101'];
for (const id of ids) {
  const s = db.prepare('SELECT id, title, persona, action, value, acceptance_criteria, notes FROM stories WHERE id = ?').get(id);
  if (!s) continue;
  console.log(`=== ID: ${s.id} ===`);
  console.log(`Title: ${s.title}`);
  console.log(`Persona: ${s.persona}`);
  console.log(`Action: ${s.action}`);
  console.log(`Value: ${s.value}`);
  const acs = JSON.parse(s.acceptance_criteria);
  acs.forEach((a, i) => {
    console.log(`  AC${i+1} [${a.id}]: Given: ${a.given.slice(0, 50)}... -> Then: ${a.then.slice(0, 50)}...`);
  });
  console.log('Notes preview:', s.notes.slice(0, 150).replace(/\n/g, ' '));
  console.log('\n');
}
