import { getActiveProject } from '../server/db.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const activeProject = getActiveProject();
if (!activeProject) {
  console.error('[Sync] No active project found to export.');
  process.exit(1);
}

const sampleDataPath = path.join(__dirname, '..', 'src', 'constants', 'sampleData.js');
let currentContent = fs.readFileSync(sampleDataPath, 'utf8');

// Find the export const VIETNAMESE_PRONUNCIATION_PROJECT = ...
const marker = 'export const VIETNAMESE_PRONUNCIATION_PROJECT =';
const markerIdx = currentContent.indexOf(marker);

if (markerIdx === -1) {
  console.error('[Sync] Could not locate VIETNAMESE_PRONUNCIATION_PROJECT marker in sampleData.js');
  process.exit(1);
}

const headerPart = currentContent.substring(0, markerIdx).trimEnd();
const newContent = `${headerPart}\n\nexport const VIETNAMESE_PRONUNCIATION_PROJECT = ${JSON.stringify(activeProject, null, 2)};\n`;

fs.writeFileSync(sampleDataPath, newContent, 'utf8');
console.log(`[Sync] Successfully updated ${sampleDataPath} with all ${activeProject.stories.length} enriched stories.`);
