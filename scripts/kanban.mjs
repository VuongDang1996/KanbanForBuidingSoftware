#!/usr/bin/env node
// Automated Kanban progress updater for VietPhonics dev agents.
// Usage:
//   node scripts/kanban.mjs in-progress PRON-101 VN-101
//   node scripts/kanban.mjs done PRON-101 --note "Implemented useRecorder hook in vietphonics-app/src/lib/audio"
//   node scripts/kanban.mjs list            (prints id|status)
// "done" automatically ticks all Acceptance Criteria and Technical Tasks.

const API = process.env.KANBAN_API || 'http://localhost:3001';
const args = process.argv.slice(2);
const cmd = args[0];

async function main() {
  if (!cmd) {
    console.log('Usage: node scripts/kanban.mjs <backlog|todo|in-progress|done|list> [IDs...] [--note "text"]');
    process.exit(1);
  }

  if (cmd === 'list') {
    const res = await fetch(`${API}/api/project/active`);
    const p = await res.json();
    const counts = {};
    for (const s of p.stories) {
      counts[s.status] = (counts[s.status] || 0) + 1;
      console.log(`${s.id}|${s.status}`);
    }
    console.log('\nSummary:', JSON.stringify(counts));
    return;
  }

  const noteIdx = args.indexOf('--note');
  let note = null;
  let ids = args.slice(1);
  if (noteIdx !== -1) {
    note = args.slice(noteIdx + 1).join(' ');
    ids = args.slice(1, noteIdx);
  }

  for (const id of ids) {
    const res = await fetch(`${API}/api/story/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: cmd, completeAll: cmd === 'done', note })
    });
    const out = await res.json();
    if (!res.ok) {
      console.error(`✗ ${id}: ${out.error}`);
    } else {
      console.log(`✓ ${id} → ${out.status}`);
    }
  }
}

main().catch((e) => {
  console.error('Kanban update failed (is the Kanban server running on :3001?):', e.message);
  process.exit(1);
});
