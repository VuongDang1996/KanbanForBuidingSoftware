import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  getBossEncounters,
  getBossEncounterById,
  evaluateBossTurn
} from '../src/lib/scoring/bossArena.js';

describe('GAME-103: Auditory Discrimination Boss Arenas Tests', () => {
  let server;
  const PORT = 3875;
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

  describe('Boss Encounters & Minimal Pair Decks (AC 1 & AC 2)', () => {
    test('Catalog must contain The Final-T Titan with 100 max HP', () => {
      const bosses = getBossEncounters();
      assert.ok(Array.isArray(bosses));
      assert.ok(bosses.length >= 2);

      const titan = getBossEncounterById('boss_titan_t');
      assert.ok(titan);
      assert.equal(titan.name, 'The Final-T Titan');
      assert.equal(titan.maxHp, 100);
      assert.ok(titan.deck.length >= 3);
    });

    test('Each turn in deck must define 2 minimal pair options with duration ms', () => {
      const titan = getBossEncounterById('boss_titan_t');
      for (const turn of titan.deck) {
        assert.equal(turn.options.length, 2);
        assert.ok(turn.options.some((o) => o.isCorrect));
        assert.ok(turn.options.some((o) => !o.isCorrect));
        assert.ok(turn.options[0].durationMs > 0);
        assert.ok(turn.options[1].durationMs > 0);
        assert.ok(turn.magnifierTip.length > 10);
      }
    });
  });

  describe('Turn Evaluation, Damage & L1 Acoustic Magnifier (AC 1, AC 2, AC 3)', () => {
    test('Correct counter-spell deals 35 damage to Boss and triggers Screen Shake', () => {
      const res = evaluateBossTurn({
        bossId: 'boss_titan_t',
        turnIndex: 1, // 'beat' vs 'bit', option 2 is correct 'beat'
        selectedOptionIndex: 2,
        currentBossHp: 100,
        currentPlayerHp: 100,
        timeTakenSec: 1.8
      });

      assert.equal(res.isCorrect, true);
      assert.equal(res.damageDealt, 35);
      assert.equal(res.newBossHp, 65); // 100 - 35 = 65
      assert.equal(res.damageTaken, 0);
      assert.equal(res.screenShake, true);
    });

    test('Wrong choice or timeout >3.5s causes Boss to counter-crush player for 25 damage', () => {
      const res = evaluateBossTurn({
        bossId: 'boss_titan_t',
        turnIndex: 1,
        selectedOptionIndex: 1, // wrong option 'bit'
        currentBossHp: 100,
        currentPlayerHp: 100,
        timeTakenSec: 2.0
      });

      assert.equal(res.isCorrect, false);
      assert.equal(res.damageDealt, 0);
      assert.equal(res.damageTaken, 25);
      assert.equal(res.newPlayerHp, 75); // 100 - 25 = 75
      assert.match(res.magnifierTip, /220ms|85ms/i);
    });
  });

  describe('API Endpoints & SQLite Persistence (Gate D & E)', () => {
    test('GET /api/v1/game/boss-arenas should return all boss encounters', async () => {
      const res = await fetch(`${baseUrl}/api/v1/game/boss-arenas`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.bosses.length >= 2);
    });

    test('GET /api/v1/game/boss-arenas/:bossId should return single boss encounter', async () => {
      const res = await fetch(`${baseUrl}/api/v1/game/boss-arenas/boss_titan_t`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.boss.name, 'The Final-T Titan');
    });

    test('POST /api/v1/game/boss-turn should evaluate combat choice and save record to SQLite', async () => {
      const testUserId = `test-boss-slayer-${Date.now()}`;
      const payload = {
        bossId: 'boss_titan_t',
        turnIndex: 1,
        selectedOptionIndex: 2, // 'beat'
        currentBossHp: 100,
        currentPlayerHp: 100,
        timeTakenSec: 1.5
      };

      const res = await fetch(`${baseUrl}/api/v1/game/boss-turn`, {
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
      assert.equal(data.turnResult.isCorrect, true);
      assert.equal(data.turnResult.damageDealt, 35);
      assert.equal(data.turnResult.newBossHp, 65);

      // Verify row in SQLite
      const row = db.prepare('SELECT * FROM game_boss_battle_records WHERE id = ?').get(data.recordId);
      assert.ok(row);
      assert.equal(row.user_id, testUserId);
      assert.equal(row.boss_id, 'boss_titan_t');
      assert.equal(row.is_correct, 1);
      assert.equal(row.boss_hp_left, 65);
    });

    test('GET /api/v1/game/boss/latest should return user latest boss turn record', async () => {
      const testUserId = `test-boss-latest-${Date.now()}`;
      await fetch(`${baseUrl}/api/v1/game/boss-turn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': testUserId
        },
        body: JSON.stringify({
          bossId: 'boss_vowel_chimera',
          turnIndex: 1,
          selectedOptionIndex: 2,
          currentBossHp: 100,
          currentPlayerHp: 100,
          timeTakenSec: 1.9
        })
      });

      const res = await fetch(`${baseUrl}/api/v1/game/boss/latest`, {
        headers: { 'x-user-id': testUserId }
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.bossId, 'boss_vowel_chimera');
      assert.equal(data.isCorrect, true);
    });

    test('POST /api/v1/game/boss-turn should return 400 when selectedOptionIndex is missing', async () => {
      const res = await fetch(`${baseUrl}/api/v1/game/boss-turn`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });

      assert.equal(res.status, 400);
      const data = await res.json();
      assert.equal(data.success, false);
      assert.match(data.error, /Missing required field: selectedOptionIndex/i);
    });
  });
});
