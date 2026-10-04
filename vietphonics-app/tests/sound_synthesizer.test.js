import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  getSynthSfxCatalog,
  getSynthSfxById,
  isReducedMotionPreferred,
  unlockSafariAudioContext
} from '../src/lib/audio/soundSynthesizer.js';

describe('GAME-104: Zero-Latency Web Audio API Sound Synthesizer Tests', () => {
  let server;
  const PORT = 3876;
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

  describe('Procedural SFX Catalog & Waveforms (AC 1 & AC 2)', () => {
    test('Catalog must contain all 8 procedural game effects with valid ADSR parameters', () => {
      const catalog = getSynthSfxCatalog();
      assert.equal(catalog.length, 8);

      const expectedIds = [
        'hit_slash',
        'critical_impact',
        'coin_pickup',
        'shield_defend',
        'boss_roar',
        'level_up',
        'streak_flame',
        'freeze_shatter'
      ];

      for (const id of expectedIds) {
        const item = catalog.find((c) => c.id === id);
        assert.ok(item, `Effect ${id} must exist in catalog`);
        assert.ok(['sine', 'sawtooth', 'square', 'triangle'].includes(item.waveType));
        assert.ok(item.startFreq > 0);
        assert.ok(item.endFreq > 0);
        assert.ok(item.durationSec > 0 && item.durationSec <= 0.5);
      }
    });

    test('getSynthSfxById returns targeted sound or fallback', () => {
      const hit = getSynthSfxById('hit_slash');
      assert.equal(hit.id, 'hit_slash');
      assert.equal(hit.waveType, 'sawtooth');

      const nonExistent = getSynthSfxById('unknown_sfx');
      assert.ok(nonExistent);
      assert.equal(nonExistent.id, 'hit_slash'); // fallback
    });

    test('Reduced motion and Safari unlock helper handle non-browser gracefully', async () => {
      // In Node environment, window is undefined
      assert.equal(isReducedMotionPreferred(), false);
      const unlocked = await unlockSafariAudioContext();
      assert.equal(unlocked, false);
    });
  });

  describe('REST API & SQLite Settings Persistence (AC 3 & AC 4)', () => {
    test('GET /api/v1/audio/sfx-catalog returns full 8-sound catalog', async () => {
      const res = await fetch(`${baseUrl}/api/v1/audio/sfx-catalog`);
      assert.equal(res.status, 200);

      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.sfxCatalog.length, 8);
    });

    test('POST /api/v1/audio/settings saves audio volume & reduced-motion preferences', async () => {
      const testUserId = `test-audio-user-${Date.now()}`;
      const payload = {
        userId: testUserId,
        sfxVolume: 0.75,
        bgmVolume: 0.45,
        reducedMotion: true,
        muted: false,
        playedIncrement: 5
      };

      const res = await fetch(`${baseUrl}/api/v1/audio/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.settings.sfxVolume, 0.75);
      assert.equal(data.settings.bgmVolume, 0.45);
      assert.equal(data.settings.reducedMotion, true);
      assert.equal(data.settings.muted, false);
      assert.equal(data.settings.sfxPlayedCount, 5);

      // Verify in SQLite
      const row = db.prepare('SELECT * FROM sound_synthesizer_records WHERE user_id = ?').get(testUserId);
      assert.ok(row);
      assert.equal(row.sfx_volume, 0.75);
      assert.equal(row.reduced_motion, 1);
      assert.equal(row.sfx_played_count, 5);
    });

    test('GET /api/v1/audio/settings/latest retrieves saved user configuration', async () => {
      const testUserId = `test-audio-user-${Date.now()}`;
      // Save first
      await fetch(`${baseUrl}/api/v1/audio/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: testUserId,
          sfxVolume: 0.9,
          bgmVolume: 0.3,
          reducedMotion: false,
          muted: true,
          playedIncrement: 2
        })
      });

      // Then fetch
      const res = await fetch(`${baseUrl}/api/v1/audio/settings/latest`, {
        headers: { 'x-user-id': testUserId }
      });
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.settings.sfxVolume, 0.9);
      assert.equal(data.settings.bgmVolume, 0.3);
      assert.equal(data.settings.muted, true);
      assert.equal(data.settings.sfxPlayedCount, 2);
    });

    test('Stress Test: rapid concurrent updates to sound settings without deadlock', async () => {
      const testUserId = `test-audio-stress-${Date.now()}`;
      const updates = [];

      for (let i = 0; i < 20; i++) {
        updates.push(
          fetch(`${baseUrl}/api/v1/audio/settings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: testUserId,
              sfxVolume: 0.8,
              bgmVolume: 0.5,
              playedIncrement: 1
            })
          })
        );
      }

      const results = await Promise.all(updates);
      for (const res of results) {
        assert.equal(res.status, 200);
      }

      const row = db.prepare('SELECT * FROM sound_synthesizer_records WHERE user_id = ?').get(testUserId);
      assert.ok(row);
      assert.equal(row.sfx_played_count, 20);
    });
  });
});
