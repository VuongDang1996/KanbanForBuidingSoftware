import { db } from '../server/db.js';
import { diagnosticStories } from './story_definitions/epic_diagnostic.js';
import { endingSoundsStories } from './story_definitions/epic_ending_sounds.js';
import { prosodyStories } from './story_definitions/epic_prosody.js';
import { articulationStories } from './story_definitions/epic_articulation.js';
import { roleplayStories } from './story_definitions/epic_roleplay.js';
import { gamifiedStories } from './story_definitions/epic_gamified.js';
import { retentionStories } from './story_definitions/epic_retention.js';
import { backendStories } from './story_definitions/epic_backend.js';
import { advancedAiStories } from './story_definitions/epic_advanced_ai.js';
import { accountBillingStories } from './story_definitions/epic_account_billing.js';
import { progressReportingStories } from './story_definitions/epic_progress_reporting.js';
import { operationsComplianceStories } from './story_definitions/epic_operations_compliance.js';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure epic-operations-compliance exists
db.prepare(`
  INSERT OR IGNORE INTO epics (id, project_id, title, description, color, display_order)
  VALUES (?, ?, ?, ?, ?, ?)
`).run(
  'epic-operations-compliance',
  'proj-viet-pronounce',
  'Operations, Admin CMS & Legal Compliance',
  'Bảng điều khiển quản trị (MRR, Churn rate, active Pro count), CMS bài học, giám sát APM Sentry/Prometheus, và tuân thủ pháp lý Nghị định 13/2023/NĐ-CP & Nghị định 123/2020/NĐ-CP.',
  'cyan',
  10
);

const allStories = [
  ...diagnosticStories,
  ...endingSoundsStories,
  ...prosodyStories,
  ...articulationStories,
  ...roleplayStories,
  ...gamifiedStories,
  ...retentionStories,
  ...backendStories,
  ...advancedAiStories,
  ...accountBillingStories,
  ...progressReportingStories,
  ...operationsComplianceStories
];

console.log(`[Master Rewrite] Total stories to update/insert: ${allStories.length}`);

if (allStories.length !== 72) {
  console.warn(`[Warning] Expected 72 stories, but found ${allStories.length}. Please check definitions.`);
}

// Check for duplicate IDs
const seenIds = new Set();
for (const s of allStories) {
  if (seenIds.has(s.id)) {
    console.error(`[Error] Duplicate story ID found: ${s.id}`);
    process.exit(1);
  }
  seenIds.add(s.id);
}

const upsertStmt = db.prepare(`
  INSERT INTO stories (
    id, epic_id, title, persona, action, value,
    priority, status, size, points,
    acceptance_criteria, technical_tasks, notes,
    created_at, updated_at
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON CONFLICT(id) DO UPDATE SET
    epic_id = excluded.epic_id,
    title = excluded.title,
    persona = excluded.persona,
    action = excluded.action,
    value = excluded.value,
    priority = excluded.priority,
    status = excluded.status,
    size = excluded.size,
    points = excluded.points,
    acceptance_criteria = excluded.acceptance_criteria,
    technical_tasks = excluded.technical_tasks,
    notes = excluded.notes,
    updated_at = excluded.updated_at
`);

const now = new Date().toISOString();
let processedCount = 0;

for (const story of allStories) {
  const result = upsertStmt.run(
    story.id,
    story.epic_id,
    story.title,
    story.persona,
    story.action,
    story.value,
    story.priority || 'must',
    story.status || 'backlog',
    story.size || 'M',
    story.points || 5,
    story.acceptance_criteria,
    story.technical_tasks,
    story.notes || '',
    now,
    now
  );

  if (result.changes > 0) {
    processedCount++;
    console.log(`  ✓ Synced ${story.id}: ${story.title.slice(0, 50)}...`);
  } else {
    console.error(`  ✗ Failed to process story ID: ${story.id}`);
  }
}

console.log(`\n[Database Sync Complete] ${processedCount} of ${allStories.length} stories successfully synced in SQLite.`);

// Sync to sampleData.js
console.log('\n[Syncing] Running scripts/sync_to_sample_data.js...');
try {
  execSync('node scripts/sync_to_sample_data.js', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
  console.log('[Syncing] Successfully synced to src/constants/sampleData.js');
} catch (err) {
  console.error('[Sync Error] Failed to sync to sampleData.js:', err.message);
  process.exit(1);
}

console.log('\n=========================================');
console.log(`✅ All ${allStories.length} User Stories have been successfully synced with 12-Gate standard!`);
console.log('=========================================\n');
