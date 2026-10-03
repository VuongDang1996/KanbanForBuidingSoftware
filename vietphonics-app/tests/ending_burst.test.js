import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  calculateBurstEnergyRatio,
  calculateZeroCrossingRate,
  evaluateBurstSpike,
  analyzeEndingSoundBurst,
  BURST_CRITICAL_WORDS
} from '../src/lib/audio/burstAnalysis.js';

let server;
const PORT = 3853; // Dedicated test port for ending sound burst tests

describe('VN-101: Final Consonant Sound Ending Burst Analyzer Tests', () => {
  before(async () => {
    await new Promise((resolve) => {
      server = app.listen(PORT, resolve);
    });
  });

  after(async () => {
    await new Promise((resolve) => {
      server.close(resolve);
    });
  });

  describe('Audio DSP: Transient Burst Energy & ZCR Math (AC 2)', () => {
    test('calculateZeroCrossingRate should return higher rate for high-frequency noise', () => {
      // High frequency alternating samples (+1, -1, +1, -1)
      const highFreq = new Float32Array([1, -1, 1, -1, 1, -1, 1, -1]);
      const highZcr = calculateZeroCrossingRate(highFreq);
      assert.strictEqual(highZcr, 1.0);

      // Low frequency smooth samples (all positive)
      const lowFreq = new Float32Array([0.2, 0.4, 0.6, 0.8, 0.6, 0.4]);
      const lowZcr = calculateZeroCrossingRate(lowFreq);
      assert.strictEqual(lowZcr, 0.0);
    });

    test('calculateBurstEnergyRatio should compute ratio between final 50ms and vowel energy', () => {
      // 1000 samples at 16kHz (~62ms). Final 50ms is ~800 samples.
      const samples = new Float32Array(1000);
      // Vowel region (middle): amplitude 0.2
      for (let i = 200; i < 600; i++) samples[i] = 0.2;
      // Burst region (final): amplitude 0.8
      for (let i = 800; i < 1000; i++) samples[i] = 0.8;

      const ratio = calculateBurstEnergyRatio(samples, 16000);
      assert.ok(ratio > 0);
      assert.ok(ratio > 1.0, 'Burst energy with 0.8 amplitude should be significantly higher than vowel 0.2');
    });

    test('evaluateBurstSpike must classify ratio >= 0.35 as released and < 0.35 as unreleased (AC 2)', () => {
      const released = evaluateBurstSpike(0.45);
      assert.strictEqual(released.isReleased, true);
      assert.strictEqual(released.status, 'released');
      assert.ok(released.label.includes('Bật hơi chuẩn'));
      assert.ok(released.badgeClass.includes('emerald'));

      const unreleased = evaluateBurstSpike(0.14);
      assert.strictEqual(unreleased.isReleased, false);
      assert.strictEqual(unreleased.status, 'unreleased');
      assert.ok(unreleased.label.includes('Nuốt âm đuôi'));
      assert.ok(unreleased.badgeClass.includes('rose'));
    });
  });

  describe('L1 Vietnamese Unreleased Stop Habit & Guidance (AC 3)', () => {
    test('BURST_CRITICAL_WORDS must define ending sounds and Vietnamese L1 traps', () => {
      const six = BURST_CRITICAL_WORDS['Six'];
      assert.ok(six);
      assert.strictEqual(six.targetPhoneme, '/ks/');
      assert.ok(six.nativeBurstRatio >= 0.35);
      assert.ok(six.userDefaultBurstRatio < 0.35);
      assert.ok(six.trap.includes('Người Việt') || six.trap.includes('nuốt'));
      assert.ok(six.articulatoryGuidance.length > 20);

      const contact = BURST_CRITICAL_WORDS['contact'];
      assert.ok(contact);
      assert.strictEqual(contact.targetPhoneme, '/t/');
      assert.ok(contact.trap.includes('con-tắc') || contact.trap.includes('ngậm môi'));
    });

    test('analyzeEndingSoundBurst should return comprehensive evaluation for word', () => {
      const evalReleased = analyzeEndingSoundBurst('contact', 0.42);
      assert.strictEqual(evalReleased.word, 'contact');
      assert.strictEqual(evalReleased.isReleased, true);
      assert.strictEqual(evalReleased.status, 'released');

      const evalUnreleased = analyzeEndingSoundBurst('contact', 0.12);
      assert.strictEqual(evalUnreleased.isReleased, false);
      assert.strictEqual(evalUnreleased.status, 'unreleased');
      assert.ok(evalUnreleased.message.includes('Miệng bị khép chặt'));
    });
  });

  describe('Backend API & SQLite Persistence (Gate D & E)', () => {
    const testUserId = `test-user-burst-${Date.now()}`;

    test('POST /api/v1/acoustic/ending-burst should evaluate burst and save to SQLite', async () => {
      const res = await fetch(`http://localhost:${PORT}/api/v1/acoustic/ending-burst`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': testUserId
        },
        body: JSON.stringify({
          word: 'contact',
          userBurstRatio: 0.14
        })
      });

      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.success, true);
      assert.ok(data.burstId);
      assert.strictEqual(data.userId, testUserId);
      assert.strictEqual(data.evaluation.word, 'contact');
      assert.strictEqual(data.evaluation.isReleased, false);

      // Verify row in SQLite ending_burst_records
      const row = db.prepare('SELECT * FROM ending_burst_records WHERE id = ?').get(data.burstId);
      assert.ok(row);
      assert.strictEqual(row.user_id, testUserId);
      assert.strictEqual(row.word, 'contact');
      assert.strictEqual(row.is_released, 0);
    });

    test('GET /api/v1/acoustic/ending-burst/latest should return the latest record', async () => {
      const res = await fetch(`http://localhost:${PORT}/api/v1/acoustic/ending-burst/latest`, {
        headers: {
          'x-user-id': testUserId
        }
      });

      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.success, true);
      assert.strictEqual(data.word, 'contact');
      assert.strictEqual(data.isReleased, false);
    });

    test('Validation: Should reject empty word with 400 Bad Request', async () => {
      const res = await fetch(`http://localhost:${PORT}/api/v1/acoustic/ending-burst`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word: '' })
      });

      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.strictEqual(data.success, false);
      assert.ok(data.error.includes('Missing required field: word'));
    });
  });
});
