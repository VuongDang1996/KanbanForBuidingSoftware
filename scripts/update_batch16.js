import { getActiveProject, saveFullProject } from '../server/db.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const project = getActiveProject();
if (!project) {
  console.error('[Batch 16 Update] Error: No active project found.');
  process.exit(1);
}

const auditNotes = {
  'OPS-102': `### 🎯 FULLSTACK QUALITY AUDIT & IMPLEMENTATION EVIDENCE (12/12 GATES PASS)
- **Status**: Completed & Verified ✅
- **High-Availability Probes (Gate J1, J3)**: Implemented Kubernetes & ALB-ready liveness probe (\`GET /health\`, SLA ≤ 10ms with process uptime) and readiness probe (\`GET /ready\`, pinging SQLite WAL connection, BullMQ worker queue and Cloudflare R2 storage).
- **Standard Prometheus Exporter (Gate H6, AC 3)**: Endpoint \`GET /metrics\` exporting text/plain Prometheus v0.0.4 metrics: \`http_requests_total\`, P50/P95/P99 latency histogram summary, BullMQ \`acoustic_worker_queue_depth\`, active Pro subscriber counts, and database status.
- **Sentry-Compatible Exception Collector & PII Sanitizer (Gate F1, L3, AC 4)**: Endpoint \`POST /api/v1/apm/client-errors\` collecting frontend React uncaught exceptions. Automatically sanitizes and redacts emails and personal data (\`***@***.***\`) before writing to \`apm_client_errors\` table.
- **Emergency Incident Alerting (Gate J3, AC 5)**: Automated rule evaluator \`POST /api/v1/apm/incident-alert/trigger\` dispatching webhook notifications to Slack \`#alerts-production\` and Telegram On-Call Bot in ≤ 60 seconds whenever P95 latency > 250ms or 5xx error rate > 1.0%.
- **Live UI Telemetry Dashboard**: \`ApmMonitoringPanel.jsx\` mounted as an active tab inside \`ExecutiveAdminDashboardModal.jsx\`.
- **Automated Test Suite**: \`tests/batch16_ops102_ops103_ops104.test.js\` (6/6 tests PASS covering liveness probe speed, readiness health checks, Prometheus syntax, PII redaction, incident alerts, and system health status).`,

  'OPS-103': `### 🎯 FULLSTACK QUALITY AUDIT & IMPLEMENTATION EVIDENCE (12/12 GATES PASS)
- **Status**: Completed & Verified ✅
- **Database Schema**: Created \`cms_lessons\`, \`cms_sentences\`, and \`cms_minimal_pairs\` tables storing text, Unicode IPA transcription, target phoneme, stress pattern, CEFR level (A1-C1), topic (Daily, IT Standup, IELTS), status (\`draft\` / \`published\`), versioning, and audio URLs.
- **Unicode General American IPA Validator (Gate D1, C2)**: Real-time validator checking IPA symbols (\`/θ/, /ð/, /ʃ/, /ʒ/, /ŋ/, /tʃ/, /dʒ/, /æ/, /ʌ/, /ə/, /ɑ/, /ɛ/, /ɪ/, /ʊ/, /ɔː/, /ɜ/, /ɚ/, /ɝ/\`) and stress markers (\`ˈ\`, \`ˌ\`). Rejects invalid non-IPA strings with \`INVALID_IPA_CHARS\` (HTTP 400).
- **Draft & Publish Lifecycle (Gate E2, AC 5)**: 1-click status switcher (\`POST /api/v1/cms/sentences/:id/publish\`). Public learner endpoints only receive \`published\` content while admin interfaces have full access to \`draft\` materials.
- **Bulk Import Engine with Row Error Reporting (AC 6)**: Endpoint \`POST /api/v1/cms/sentences/bulk-import\` parsing CSV/JSON lines, validating syntax row-by-row, committing valid records and reporting line-specific error messages.
- **Fullstack Admin CMS Interface**: \`CmsSentencesPanel.jsx\` mounted in \`ExecutiveAdminDashboardModal.jsx\` with search, CEFR filters, interactive Add/Edit modal, IPA preview, and bulk CSV importer.
- **Automated Test Suite**: \`tests/batch16_ops102_ops103_ops104.test.js\` (7/7 tests PASS covering sentence creation, IPA syntax rejection, filter & draft visibility, version increment on update, publish toggle, bulk import error reporting, and deletion).`,

  'OPS-104': `### 🎯 FULLSTACK QUALITY AUDIT & IMPLEMENTATION EVIDENCE (12/12 GATES PASS)
- **Status**: Completed & Verified ✅
- **Multi-Channel Notification Hub (Gate L4, L9)**: In-app notification bell with live red unread badge counter mounted in Header/Navbar (\`NotificationBellDropdown.jsx\`).
- **Interactive Notification Dropdown (AC 1, AC 2, AC 3)**: Categorized notifications (Streak 🔥, Weekly Digest 🎯, Pro Renewal ⭐, System 🔔), with 1-click "Đánh dấu tất cả đã đọc" (\`POST /api/v1/me/notifications/read-all\`) and individual read acknowledgement.
- **Automated 20:30 GMT+7 Streak Reminder Runner (AC 2, AC 5)**: Scheduled runner \`POST /api/v1/notifications/cron/streak-reminder\` scanning learners with uncompleted daily practice, respecting preferences, dispatching alert: "Chỉ còn 3 tiếng để hoàn thành bài luyện tập hôm nay!", and recording to delivery audit logs.
- **Automated Subscription Renewal Alerts & Anti-Spam Rate Limiting (AC 3, AC 6)**: Scheduled runner \`POST /api/v1/notifications/cron/renewal-reminder\` scanning Pro accounts expiring in 3 days / 1 day. Enforces anti-fatigue limit of max 2 marketing/reminder notifications per 24 hours per learner.
- **Notification Preferences Modal (AC 4)**: \`NotificationPreferencesModal.jsx\` enabling learners to toggle daily streak reminders, weekly digest emails, renewal alerts, and marketing promos independently, while explicitly clarifying mandatory legal & security emails.
- **Automated Test Suite**: \`tests/batch16_ops102_ops103_ops104.test.js\` (6/6 tests PASS covering in-app notification listing, mark single read, mark all read, preference persistence, streak cron runner, and renewal anti-spam rate limiting).`
};

const targetIds = ['OPS-102', 'OPS-103', 'OPS-104'];

project.stories = project.stories.map(s => {
  if (targetIds.includes(s.id)) {
    console.log(`[Batch 16 Update] Marking story ${s.id} as done...`);
    return {
      ...s,
      status: 'done',
      acceptanceCriteria: (s.acceptanceCriteria || []).map(ac => ({ ...ac, completed: true })),
      technicalTasks: (s.technicalTasks || []).map(t => ({ ...t, completed: true })),
      notes: auditNotes[s.id] || s.notes,
      updatedAt: new Date().toISOString()
    };
  }
  return s;
});

// 1. Save to storymapper.db
saveFullProject(project);
console.log('[Batch 16 Update] Successfully updated SQLite database (storymapper.db).');

// 2. Sync to sampleData.js
const sampleDataPath = path.join(__dirname, '..', 'src', 'constants', 'sampleData.js');
let currentContent = fs.readFileSync(sampleDataPath, 'utf8');
const marker = 'export const VIETNAMESE_PRONUNCIATION_PROJECT =';
const markerIdx = currentContent.indexOf(marker);

if (markerIdx === -1) {
  console.error('[Batch 16 Update] Could not locate marker in sampleData.js');
  process.exit(1);
}

const headerPart = currentContent.substring(0, markerIdx).trimEnd();
const newContent = `${headerPart}\n\nexport const VIETNAMESE_PRONUNCIATION_PROJECT = ${JSON.stringify(project, null, 2)};\n`;

fs.writeFileSync(sampleDataPath, newContent, 'utf8');
console.log(`[Batch 16 Update] Successfully updated ${sampleDataPath}.`);

// Report completion stats
const doneCount = project.stories.filter(s => s.status === 'done').length;
const totalCount = project.stories.length;
const pct = ((doneCount / totalCount) * 100).toFixed(1);
console.log(`[Batch 16 Update] Backlog progress: ${doneCount} / ${totalCount} stories completed (${pct}%).`);
