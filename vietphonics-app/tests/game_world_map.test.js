import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  getGameWorlds,
  getGameWorldById,
  calculateStageStars,
  evaluateStageCompletion
} from '../src/lib/scoring/gameLevelMap.js';

describe('GAME-101: Multi-Tier Level Progression & 4-World Map Engine Tests', () => {
  let server;
  const PORT = 3873;
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

  describe('4-World Biome Structure & Stages (AC 2 & AC 3)', () => {
    test('Catalog must contain exactly 4 unique biomes/worlds', () => {
      const worlds = getGameWorlds();
      assert.equal(worlds.length, 4);
      assert.equal(worlds[0].id, 'world_1');
      assert.equal(worlds[1].id, 'world_2');
      assert.equal(worlds[2].id, 'world_3');
      assert.equal(worlds[3].id, 'world_4');
      assert.match(worlds[0].name, /Đảo Nguyên Âm/i);
      assert.match(worlds[1].name, /Vịnh Âm Đuôi/i);
    });

    test('Each world must contain 5 sequential stages with monsters and gem rewards', () => {
      const worlds = getGameWorlds();
      for (const w of worlds) {
        assert.equal(w.stages.length, 5);
        for (const s of w.stages) {
          assert.ok(s.id);
          assert.ok(s.name);
          assert.ok(s.targetPhonemes.length > 0);
          assert.ok(s.monster);
          assert.ok(s.rewardGems > 0);
        }
      }
    });
  });

  describe('3-Star Grading & Sequential Unlocking (AC 1)', () => {
    test('calculateStageStars assigns 3 stars for score >= 85%', () => {
      assert.equal(calculateStageStars(90), 3);
      assert.equal(calculateStageStars(85), 3);
      assert.equal(calculateStageStars(75), 2);
      assert.equal(calculateStageStars(55), 1);
      assert.equal(calculateStageStars(40), 0);
    });

    test('evaluateStageCompletion unlocks next stage upon clearing current stage', () => {
      const res = evaluateStageCompletion({
        worldId: 'world_1',
        stageId: 'stage_1_1',
        score: 88,
        currentTotalStars: 0
      });

      assert.equal(res.stars, 3);
      assert.equal(res.isPassed, true);
      assert.equal(res.nextStageId, 'stage_1_2');
      assert.equal(res.gemReward, 30);
    });

    test('evaluateStageCompletion triggers next world unlock when stars threshold is reached', () => {
      const res = evaluateStageCompletion({
        worldId: 'world_1',
        stageId: 'stage_1_5',
        score: 95,
        currentTotalStars: 7 // 7 + 3 = 10 stars >= 8 required for World 2!
      });

      assert.equal(res.stars, 3);
      assert.equal(res.nextWorldUnlocked, true);
      assert.equal(res.nextStageId, 'stage_2_1');
    });
  });

  describe('API Endpoints & SQLite Persistence (Gate D & E)', () => {
    test('GET /api/v1/game/world-map should return all 4 worlds', async () => {
      const res = await fetch(`${baseUrl}/api/v1/game/world-map`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.worlds.length, 4);
    });

    test('GET /api/v1/game/world-map/:worldId should return single world', async () => {
      const res = await fetch(`${baseUrl}/api/v1/game/world-map/world_2`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.world.name, 'Vịnh Âm Đuôi');
    });

    test('POST /api/v1/game/stage-complete should evaluate stage and persist record', async () => {
      const testUserId = `test-gamer-${Date.now()}`;
      const payload = {
        worldId: 'world_1',
        stageId: 'stage_1_1',
        score: 92,
        currentTotalStars: 2
      };

      const res = await fetch(`${baseUrl}/api/v1/game/stage-complete`, {
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
      assert.equal(data.userId, testUserId);
      assert.ok(data.recordId);
      assert.equal(data.progression.stars, 3);
      assert.equal(data.progression.nextStageId, 'stage_1_2');

      // Verify row in SQLite
      const row = db.prepare('SELECT * FROM game_world_progress_records WHERE id = ?').get(data.recordId);
      assert.ok(row);
      assert.equal(row.user_id, testUserId);
      assert.equal(row.world_id, 'world_1');
      assert.equal(row.stage_id, 'stage_1_1');
      assert.equal(row.stars, 3);
      assert.equal(row.score, 92);
    });

    test('GET /api/v1/game/progress/latest should retrieve the user latest stage record', async () => {
      const testUserId = `test-gamer-latest-${Date.now()}`;
      await fetch(`${baseUrl}/api/v1/game/stage-complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': testUserId
        },
        body: JSON.stringify({
          worldId: 'world_1',
          stageId: 'stage_1_3',
          score: 80,
          currentTotalStars: 5
        })
      });

      const res = await fetch(`${baseUrl}/api/v1/game/progress/latest`, {
        headers: { 'x-user-id': testUserId }
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.stageId, 'stage_1_3');
      assert.equal(data.stars, 2);
    });

    test('POST /api/v1/game/stage-complete should return 400 when score is missing', async () => {
      const res = await fetch(`${baseUrl}/api/v1/game/stage-complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });

      assert.equal(res.status, 400);
      const data = await res.json();
      assert.equal(data.success, false);
      assert.match(data.error, /Missing or invalid field: score/i);
    });
  });
});
