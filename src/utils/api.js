// API Client for StoryMapper SQLite Backend

const API_BASE = '/api';

/**
 * Health check to verify SQLite backend connection
 */
export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(2500) });
    if (!res.ok) return { connected: false };
    const data = await res.json();
    return {
      connected: true,
      database: data.database,
      databaseFile: data.databaseFile
    };
  } catch (err) {
    return { connected: false, error: err.message };
  }
}

/**
 * Fetch the active project from SQLite database
 */
export async function fetchActiveProjectFromDb() {
  const res = await fetch(`${API_BASE}/project/active`);
  if (!res.ok) {
    throw new Error(`Failed to load project from SQLite: ${res.statusText}`);
  }
  return await res.json();
}

/**
 * Save project to SQLite database
 */
export async function saveProjectToDb(project) {
  const res = await fetch(`${API_BASE}/project/save`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project)
  });
  if (!res.ok) {
    throw new Error(`Failed to save to SQLite: ${res.statusText}`);
  }
  return await res.json();
}

/**
 * List all saved projects from SQLite
 */
export async function listProjectsFromDb() {
  const res = await fetch(`${API_BASE}/projects`);
  if (!res.ok) {
    throw new Error('Failed to list projects');
  }
  return await res.json();
}

/**
 * Switch active project in SQLite
 */
export async function selectProjectInDb(id) {
  const res = await fetch(`${API_BASE}/project/select/${id}`, { method: 'POST' });
  if (!res.ok) {
    throw new Error('Failed to switch project');
  }
  return await res.json();
}

/**
 * Delete project from SQLite
 */
export async function deleteProjectFromDb(id) {
  const res = await fetch(`${API_BASE}/project/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    throw new Error('Failed to delete project');
  }
  return await res.json();
}
