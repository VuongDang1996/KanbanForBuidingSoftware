import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  ROLEPLAY_SCENARIOS,
  getRoleplayScenarios,
  getRoleplayScenario,
  evaluateRoleplayTurn
} from '../src/lib/scoring/roleplayScenarios.js';

describe('ELSA-301: Dynamic Scenario AI Speaking Roleplay Tests', () => {
  let server;
  const PORT = 3870;
  const baseUrl = `http://127.0.0.1:${PORT}`;

  before(async () => {
    await new Promise((resolve) => {
      server = http.createServer(app);
      server.listen(PORT, resolve);
    });
  });

  after(async () => {
    await new Promise((resolve) => {
      server.close(resolve);
    });
  });

  describe('Scenario Structure & Persona Definition (AC 1 & AC 4)', () => {
    test('Catalog must contain IT Scrum Standup #IT-04 with Alex Tech Lead persona', () => {
      const scenarios = getRoleplayScenarios();
      assert.ok(Array.isArray(scenarios));
      assert.ok(scenarios.length >= 2);

      const itScrum = scenarios.find((s) => s.id === 'it_scrum_04');
      assert.ok(itScrum);
      assert.equal(itScrum.code, '#IT-04');
      assert.equal(itScrum.partner.name, 'Alex Tech Lead');
      assert.match(itScrum.initialMessage, /Morning team/i);
      assert.match(itScrum.initialMessageVi, /Chào cả nhóm/i);
    });

    test('IT Scrum scenario must define checklist objectives for progress, blockers, and ending stops', () => {
      const itScrum = getRoleplayScenario('it_scrum_04');
      assert.ok(itScrum);
      assert.equal(itScrum.checklists.length, 3);
      assert.ok(itScrum.checklists.some((c) => c.id === 'chk_progress'));
      assert.ok(itScrum.checklists.some((c) => c.id === 'chk_blocker'));
      assert.ok(itScrum.checklists.some((c) => c.id === 'chk_stops'));
    });
  });

  describe('Turn-Taking Evaluation & Ending Stop Detection (AC 2 & AC 3)', () => {
    test('evaluateRoleplayTurn should reward complete answer with high phonetic accuracy', () => {
      const res = evaluateRoleplayTurn({
        scenarioId: 'it_scrum_04',
        userTranscript: 'Yesterday I finished the webhook and today I am not blocked.'
      });

      assert.equal(res.success, true);
      assert.equal(res.scenarioId, 'it_scrum_04');
      assert.ok(res.phoneticAccuracy >= 80);
      assert.equal(res.unreleasedStops.length, 0);
      assert.ok(res.checklists.every((c) => c.met));
      assert.match(res.aiResponse, /shipping that on schedule/i);
    });

    test('evaluateRoleplayTurn should flag missing ending stop /t/ when user says "block" without /t/', () => {
      const res = evaluateRoleplayTurn({
        scenarioId: 'it_scrum_04',
        userTranscript: 'I am block on the database.'
      });

      assert.equal(res.success, true);
      assert.ok(res.unreleasedStops.some((s) => s.includes('blocked')));
      assert.match(res.aiResponse, /flagging the blocker/i);
    });
  });

  describe('Backend API & SQLite Persistence (Gate D & E)', () => {
    test('GET /api/v1/roleplay/scenarios should return all scenarios', async () => {
      const res = await fetch(`${baseUrl}/api/v1/roleplay/scenarios`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.scenarios.length >= 2);
    });

    test('GET /api/v1/roleplay/scenarios/:scenarioId should return single scenario', async () => {
      const res = await fetch(`${baseUrl}/api/v1/roleplay/scenarios/it_scrum_04`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.scenario.code, '#IT-04');
    });

    test('POST /api/v1/roleplay/turn-eval should evaluate speech and persist session to SQLite', async () => {
      const testUserId = `test-user-${Date.now()}`;
      const payload = {
        userId: testUserId,
        scenarioId: 'it_scrum_04',
        userTranscript: 'Yesterday I finished the webhook endpoint, but I am blocked on staging.'
      };

      const res = await fetch(`${baseUrl}/api/v1/roleplay/turn-eval`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': testUserId
        },
        body: JSON.stringify(payload)
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.evaluation.aiResponse);

      // Verify in SQLite
      const row = db.prepare('SELECT * FROM roleplay_session_records WHERE id = ?').get(data.recordId);
      assert.ok(row);
      assert.equal(row.user_id, testUserId);
      assert.equal(row.scenario_id, 'it_scrum_04');
      assert.match(row.user_transcript, /finished/i);
    });

    test('GET /api/v1/roleplay/session/latest should retrieve user session record', async () => {
      const testUserId = `test-user-${Date.now()}`;
      const payload = {
        userId: testUserId,
        scenarioId: 'it_scrum_04',
        userTranscript: 'Everything is resolved.'
      };

      await fetch(`${baseUrl}/api/v1/roleplay/turn-eval`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const res = await fetch(`${baseUrl}/api/v1/roleplay/session/latest`, {
        headers: { 'x-user-id': testUserId }
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.recordId);
      assert.equal(data.userId, testUserId);
      assert.equal(data.scenarioId, 'it_scrum_04');
    });

    test('POST /api/v1/roleplay/turn-eval validation: reject missing userTranscript with 400', async () => {
      const res = await fetch(`${baseUrl}/api/v1/roleplay/turn-eval`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenarioId: 'it_scrum_04' })
      });

      assert.equal(res.status, 400);
      const data = await res.json();
      assert.equal(data.success, false);
      assert.match(data.error, /userTranscript/i);
    });
  });
});
