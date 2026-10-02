import express from 'express';
import cors from 'cors';
import {
  initDatabase,
  getActiveProject,
  saveFullProject,
  listAllProjects,
  db
} from './db.js';
import { VIETNAMESE_PRONUNCIATION_PROJECT } from '../src/constants/sampleData.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Initialize SQLite Schema
initDatabase();

// Sync VIETNAMESE_PRONUNCIATION_PROJECT as the single active project
try {
  saveFullProject(VIETNAMESE_PRONUNCIATION_PROJECT);
  db.prepare("INSERT INTO app_settings (key, value) VALUES ('active_project_id', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value").run(VIETNAMESE_PRONUNCIATION_PROJECT.id);
  // Clean up old demo projects
  db.prepare("DELETE FROM projects WHERE id != ?").run(VIETNAMESE_PRONUNCIATION_PROJECT.id);
  console.log('[SQLite] Master Vietnamese Pronunciation project synced and set as single active project in SQLite.');
} catch (err) {
  console.error('[SQLite] Failed to seed project:', err);
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: 'sqlite',
    databaseFile: 'data/storymapper.db',
    timestamp: new Date().toISOString()
  });
});

// Get current active project
app.get('/api/project/active', (req, res) => {
  try {
    const project = getActiveProject();
    if (!project) {
      return res.status(404).json({ error: 'No active project found' });
    }
    res.json(project);
  } catch (err) {
    console.error('Error fetching active project:', err);
    res.status(500).json({ error: err.message });
  }
});

// List all stored projects
app.get('/api/projects', (req, res) => {
  try {
    const projects = listAllProjects();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save or update active project
app.post('/api/project/save', (req, res) => {
  try {
    const project = req.body;
    if (!project || !project.id || !project.name) {
      return res.status(400).json({ error: 'Invalid project payload' });
    }
    saveFullProject(project);
    res.json({ success: true, message: 'Saved to SQLite database successfully', id: project.id });
  } catch (err) {
    console.error('Error saving project to SQLite:', err);
    res.status(500).json({ error: err.message });
  }
});

// Switch active project
app.post('/api/project/select/:id', (req, res) => {
  try {
    const { id } = req.params;
    const projectExists = db.prepare('SELECT id FROM projects WHERE id = ?').get(id);
    if (!projectExists) {
      return res.status(404).json({ error: 'Project not found' });
    }
    db.prepare("INSERT INTO app_settings (key, value) VALUES ('active_project_id', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value").run(id);
    const active = getActiveProject();
    res.json(active);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete project
app.delete('/api/project/:id', (req, res) => {
  try {
    const { id } = req.params;
    db.prepare('DELETE FROM projects WHERE id = ?').run(id);
    const active = getActiveProject();
    res.json({ success: true, activeProject: active });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`[Express API] StoryMapper SQLite Backend running on http://localhost:${PORT}`);
});
