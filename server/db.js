import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the data directory exists
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'storymapper.db');
console.log(`[SQLite] Initializing database at: ${dbPath}`);

export const db = new DatabaseSync(dbPath);

// Enable WAL mode for high performance concurrent reads and writes
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

// Initialize tables
export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      created_at TEXT,
      updated_at TEXT
    );

    CREATE TABLE IF NOT EXISTS epics (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      color TEXT DEFAULT 'indigo',
      display_order INTEGER DEFAULT 1,
      FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS stories (
      id TEXT PRIMARY KEY,
      epic_id TEXT NOT NULL,
      title TEXT NOT NULL,
      persona TEXT,
      action TEXT,
      value TEXT,
      priority TEXT NOT NULL DEFAULT 'should',
      status TEXT NOT NULL DEFAULT 'backlog',
      size TEXT DEFAULT 'M',
      points INTEGER DEFAULT 3,
      acceptance_criteria TEXT,
      technical_tasks TEXT,
      notes TEXT,
      created_at TEXT,
      updated_at TEXT,
      FOREIGN KEY(epic_id) REFERENCES epics(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS app_settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `);

  console.log('[SQLite] Schema tables verified.');
}

/**
 * Fetch full active project with all associated epics and stories
 */
export function getActiveProject() {
  // Check active project setting
  const settingRow = db.prepare("SELECT value FROM app_settings WHERE key = 'active_project_id'").get();
  let projectId = settingRow ? settingRow.value : null;

  let projectRow = null;
  if (projectId) {
    projectRow = db.prepare('SELECT * FROM projects WHERE id = ?').get(projectId);
  }

  // If not found, get the most recently updated project
  if (!projectRow) {
    projectRow = db.prepare('SELECT * FROM projects ORDER BY updated_at DESC LIMIT 1').get();
  }

  if (!projectRow) {
    return null;
  }

  const epics = db.prepare('SELECT id, title, description, color, display_order as "order" FROM epics WHERE project_id = ? ORDER BY display_order ASC').all(projectRow.id);

  const storiesRows = db.prepare(`
    SELECT s.* 
    FROM stories s
    JOIN epics e ON s.epic_id = e.id
    WHERE e.project_id = ?
    ORDER BY s.created_at ASC
  `).all(projectRow.id);

  const stories = storiesRows.map(row => ({
    id: row.id,
    epicId: row.epic_id,
    title: row.title,
    persona: row.persona || '',
    action: row.action || '',
    value: row.value || '',
    priority: row.priority || 'should',
    status: row.status || 'backlog',
    size: row.size || 'M',
    points: row.points || 0,
    acceptanceCriteria: row.acceptance_criteria ? JSON.parse(row.acceptance_criteria) : [],
    technicalTasks: row.technical_tasks ? JSON.parse(row.technical_tasks) : [],
    notes: row.notes || '',
    createdAt: row.created_at
  }));

  return {
    id: projectRow.id,
    name: projectRow.name,
    description: projectRow.description || '',
    epics,
    stories
  };
}

/**
 * Atomically save an entire project state (replace or update)
 */
export function saveFullProject(project) {
  const now = new Date().toISOString();

  // Run in a single transaction
  db.exec('BEGIN TRANSACTION;');
  try {
    // 1. Upsert project
    const existing = db.prepare('SELECT id FROM projects WHERE id = ?').get(project.id);
    if (existing) {
      db.prepare(`
        UPDATE projects 
        SET name = ?, description = ?, updated_at = ? 
        WHERE id = ?
      `).run(project.name, project.description || '', now, project.id);
    } else {
      db.prepare(`
        INSERT INTO projects (id, name, description, created_at, updated_at) 
        VALUES (?, ?, ?, ?, ?)
      `).run(project.id, project.name, project.description || '', now, now);
    }

    // 2. Set as active project
    db.prepare(`
      INSERT INTO app_settings (key, value) VALUES ('active_project_id', ?)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value
    `).run(project.id);

    // 3. Sync epics
    const incomingEpicIds = project.epics.map(e => e.id);
    if (incomingEpicIds.length > 0) {
      const placeholders = incomingEpicIds.map(() => '?').join(',');
      db.prepare(`DELETE FROM epics WHERE project_id = ? AND id NOT IN (${placeholders})`).run(project.id, ...incomingEpicIds);
    } else {
      db.prepare('DELETE FROM epics WHERE project_id = ?').run(project.id);
    }

    for (let i = 0; i < project.epics.length; i++) {
      const e = project.epics[i];
      const epicExists = db.prepare('SELECT id FROM epics WHERE id = ?').get(e.id);
      if (epicExists) {
        db.prepare(`
          UPDATE epics SET project_id = ?, title = ?, description = ?, color = ?, display_order = ?
          WHERE id = ?
        `).run(project.id, e.title, e.description || '', e.color || 'indigo', i + 1, e.id);
      } else {
        db.prepare(`
          INSERT INTO epics (id, project_id, title, description, color, display_order)
          VALUES (?, ?, ?, ?, ?, ?)
        `).run(e.id, project.id, e.title, e.description || '', e.color || 'indigo', i + 1);
      }
    }

    // 4. Sync stories
    const incomingStoryIds = project.stories.map(s => s.id);
    const existingStories = db.prepare(`
      SELECT s.id FROM stories s 
      JOIN epics e ON s.epic_id = e.id 
      WHERE e.project_id = ?
    `).all(project.id);

    const existingStoryIds = existingStories.map(s => s.id);
    const storiesToDelete = existingStoryIds.filter(id => !incomingStoryIds.includes(id));

    if (storiesToDelete.length > 0) {
      const deletePlaceholders = storiesToDelete.map(() => '?').join(',');
      db.prepare(`DELETE FROM stories WHERE id IN (${deletePlaceholders})`).run(...storiesToDelete);
    }

    for (const s of project.stories) {
      const storyExists = db.prepare('SELECT id FROM stories WHERE id = ?').get(s.id);
      const acJson = JSON.stringify(s.acceptanceCriteria || []);
      const tasksJson = JSON.stringify(s.technicalTasks || []);

      if (storyExists) {
        db.prepare(`
          UPDATE stories 
          SET epic_id = ?, title = ?, persona = ?, action = ?, value = ?,
              priority = ?, status = ?, size = ?, points = ?,
              acceptance_criteria = ?, technical_tasks = ?, notes = ?, updated_at = ?
          WHERE id = ?
        `).run(
          s.epicId, s.title, s.persona || '', s.action || '', s.value || '',
          s.priority || 'should', s.status || 'backlog', s.size || 'M', s.points || 0,
          acJson, tasksJson, s.notes || '', now, s.id
        );
      } else {
        db.prepare(`
          INSERT INTO stories (
            id, epic_id, title, persona, action, value,
            priority, status, size, points, acceptance_criteria, technical_tasks, notes,
            created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
          s.id, s.epicId, s.title, s.persona || '', s.action || '', s.value || '',
          s.priority || 'should', s.status || 'backlog', s.size || 'M', s.points || 0,
          acJson, tasksJson, s.notes || '', now, now
        );
      }
    }

    db.exec('COMMIT;');
    return true;
  } catch (error) {
    db.exec('ROLLBACK;');
    console.error('[SQLite] Transaction failed:', error);
    throw error;
  }
}

/**
 * List all projects in SQLite
 */
export function listAllProjects() {
  return db.prepare('SELECT id, name, description, created_at, updated_at FROM projects ORDER BY updated_at DESC').all();
}
