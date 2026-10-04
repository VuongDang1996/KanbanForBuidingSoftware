import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  getVoiceSpells,
  getVoiceSpellById,
  calculateDecibelFromRms,
  evaluateVoiceSpell
} from '../src/lib/audio/gameVoiceController.js';

describe('GAME-102: Dual Voice Controller Tests', () => {
  let server;
  const PORT = 3874;
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

  describe('Voice Spells Catalog & Decibel RMS Metric (AC 1 & AC 2)', () => {
    test('Catalog must contain combat voice spells for ending sounds and clusters', () => {
      const spells = getVoiceSpells();
      assert.ok(Array.isArray(spells));
      assert.ok(spells.length >= 4);

      const sixSpell = getVoiceSpellById('spell_six');
      assert.ok(sixSpell);
      assert.equal(sixSpell.targetWord, 'six');
      assert.equal(sixSpell.targetPhoneme, '/ks/');
      assert.ok(sixSpell.baseDamage >= 200);
    });

    test('calculateDecibelFromRms maps RMS audio amplitudes to 0-100 dB scale', () => {
      const silenceDb = calculateDecibelFromRms(0.0001);
      assert.equal(silenceDb, 0);

      const maxDb = calculateDecibelFromRms(1.0);
      assert.equal(maxDb, 100);

      const midDb = calculateDecibelFromRms(0.1);
      assert.ok(midDb >= 60 && midDb <= 80);
    });
  });

  describe('Voice Spell Casting & Critical Strike Damage (AC 2 & AC 3)', () => {
    test('Exact match yields critical strike and combo damage bonus', () => {
      const res = evaluateVoiceSpell({
        targetSpellId: 'spell_six',
        spokenWord: 'six',
        isSimulated: false,
        currentCombo: 3,
        latencyMs: 18
      });

      assert.equal(res.hitType, 'critical');
      assert.equal(res.spokenWord, 'six');
      assert.equal(res.isSimulated, false);
      assert.ok(res.damage > 250); // 250 base + combo bonus
      assert.equal(res.newCombo, 4);
      assert.match(res.feedbackText, /HOÀN HẢO ÂM ĐUÔI/i);
    });

    test('Dev / Simulator mode triggers simulated critical strike (AC 3)', () => {
      const res = evaluateVoiceSpell({
        targetSpellId: 'spell_contact',
        spokenWord: '',
        isSimulated: true,
        currentCombo: 0
      });

      assert.equal(res.hitType, 'critical');
      assert.equal(res.isSimulated, true);
      assert.equal(res.targetWord, 'contact');
      assert.ok(res.damage >= 280);
      assert.equal(res.newCombo, 1);
    });

    test('Incorrect pronunciation results in miss, resets combo, and warns L1 error', () => {
      const res = evaluateVoiceSpell({
        targetSpellId: 'spell_six',
        spokenWord: 'si', // dropped /ks/
        isSimulated: false,
        currentCombo: 5
      });

      assert.equal(res.hitType, 'miss');
      assert.equal(res.damage, 0);
      assert.equal(res.newCombo, 0);
      assert.match(res.feedbackText, /TRƯỢT ĐÒN! Rụng âm đuôi/i);
    });
  });

  describe('API Endpoints & SQLite Persistence (Gate D & E)', () => {
    test('GET /api/v1/game/voice-commands should return all voice spells', async () => {
      const res = await fetch(`${baseUrl}/api/v1/game/voice-commands`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.spells.length >= 4);
    });

    test('POST /api/v1/game/voice-action should evaluate spell cast and persist record to SQLite', async () => {
      const testUserId = `test-caster-${Date.now()}`;
      const payload = {
        spellId: 'spell_beach',
        spokenWord: 'beach',
        isSimulated: false,
        currentCombo: 2,
        latencyMs: 15
      };

      const res = await fetch(`${baseUrl}/api/v1/game/voice-action`, {
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
      assert.equal(data.action.hitType, 'critical');
      assert.equal(data.action.newCombo, 3);

      // Verify row in SQLite
      const row = db.prepare('SELECT * FROM game_voice_session_records WHERE id = ?').get(data.recordId);
      assert.ok(row);
      assert.equal(row.user_id, testUserId);
      assert.equal(row.spell_id, 'spell_beach');
      assert.equal(row.hit_type, 'critical');
      assert.equal(row.damage, data.action.damage);
    });

    test('GET /api/v1/game/voice/latest should return user latest spell action', async () => {
      const testUserId = `test-caster-latest-${Date.now()}`;
      await fetch(`${baseUrl}/api/v1/game/voice-action`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': testUserId
        },
        body: JSON.stringify({
          spellId: 'spell_blocked',
          spokenWord: '',
          isSimulated: true,
          currentCombo: 1
        })
      });

      const res = await fetch(`${baseUrl}/api/v1/game/voice/latest`, {
        headers: { 'x-user-id': testUserId }
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.spellId, 'spell_blocked');
      assert.equal(data.isSimulated, true);
      assert.equal(data.hitType, 'critical');
    });
  });
});
