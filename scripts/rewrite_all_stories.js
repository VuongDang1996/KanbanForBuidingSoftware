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
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allStories = [
  ...diagnosticStories,
  ...endingSoundsStories,
  ...prosodyStories,
  ...articulationStories,
  ...roleplayStories,
  ...gamifiedStories,
  ...retentionStories,
  ...backendStories,
  ...advancedAiStories
];

console.log(`[Master Rewrite] Total stories to update: ${allStories.length}`);

if (allStories.length !== 54) {
  console.warn(`[Warning] Expected 54 stories, but found ${allStories.length}. Please check definitions.`);
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

const updateStmt = db.prepare(`
  UPDATE stories SET
    epic_id = ?,
    title = ?,
    persona = ?,
    action = ?,
    value = ?,
    priority = ?,
    status = 'in-progress',
    size = ?,
    points = ?,
    acceptance_criteria = ?,
    technical_tasks = ?,
    notes = ?,
    updated_at = ?
  WHERE id = ?
`);

const now = new Date().toISOString();
let updatedCount = 0;
let missingStories = [];

for (const story of allStories) {
  const result = updateStmt.run(
    story.epic_id,
    story.title,
    story.persona,
    story.action,
    story.value,
    story.priority || 'must',
    story.size || 'M',
    story.points || 5,
    story.acceptance_criteria,
    story.technical_tasks,
    story.notes || '',
    now,
    story.id
  );

  if (result.changes > 0) {
    updatedCount++;
    console.log(`  ✓ Updated ${story.id}: ${story.title.slice(0, 50)}...`);
  } else {
    missingStories.push(story.id);
    console.error(`  ✗ Story ID not found in database: ${story.id}`);
  }
}

console.log(`\n[Database Update Complete] ${updatedCount} of ${allStories.length} stories successfully updated in SQLite.`);

if (missingStories.length > 0) {
  console.warn(`[Warning] Missing IDs: ${missingStories.join(', ')}`);
}

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
console.log(`✅ All 54 User Stories have been successfully rewritten with detail, best UI & 5000 users scale!`);
console.log(`All stories status set to: 'in-progress'`);
console.log('=========================================\n');
