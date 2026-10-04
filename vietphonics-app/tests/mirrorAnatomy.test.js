import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  evaluateMouthSnapshot,
  getBenchmarkMetrics,
  analyzeMouthCanvas,
  PHONEME_BENCHMARK_PROFILES
} from '../src/lib/anatomy/mirrorComparisonEngine.js';

describe('PRON-212: Webcam Mirror Snapshot & Articulatory Feature Comparison Tests', () => {

  describe('Benchmark Profiles & Geometric Math Engine (AC 1 & AC 2)', () => {
    test('getBenchmarkMetrics should return accurate physiological targets for dental /θ/', () => {
      const benchmark = getBenchmarkMetrics('/θ/');
      assert.equal(benchmark.phoneme, '/θ/');
      assert.equal(benchmark.targetApertureMm, 3.5);
      assert.equal(benchmark.tongueInterdentalRequired, true);
      assert.equal(benchmark.coronalType, 'dental');
    });

    test('evaluateMouthSnapshot should score high and EXCELLENT when /θ/ is accurately articulated with tongue protruded', () => {
      const result = evaluateMouthSnapshot('/θ/', {
        jawApertureMm: 3.5,
        lipWidthHeightRatio: 2.2,
        teethGapMm: 2.8,
        tongueProtrusionDetected: true
      });

      assert.ok(result.similarityScore >= 85);
      assert.equal(result.status, 'EXCELLENT');
      assert.equal(result.feedback.l1ErrorFlag, null);
      assert.equal(result.metrics.interdentalTongueDetected, true);
    });

    test('L1 Error Detection: Flag RETRACTED_TONGUE when user teeth are clamped with no tongue protrusion for /θ/', () => {
      const result = evaluateMouthSnapshot('/θ/', {
        jawApertureMm: 1.0,
        lipWidthHeightRatio: 2.5,
        teethGapMm: 0.5,
        tongueProtrusionDetected: false
      });

      assert.ok(result.similarityScore < 70);
      assert.equal(result.feedback.l1ErrorFlag, 'RETRACTED_TONGUE');
      assert.ok(result.feedback.actionAdvice.includes('thò đầu lưỡi'));
    });

    test('L1 Error Detection: Flag UNPUCKERED_LIPS when user lips are flat-spread for /ʃ/ (she)', () => {
      const result = evaluateMouthSnapshot('/ʃ/', {
        jawApertureMm: 6.0,
        lipWidthHeightRatio: 2.6, // excessively wide, flat
        teethGapMm: 2.0,
        tongueProtrusionDetected: false
      });

      assert.equal(result.feedback.l1ErrorFlag, 'UNPUCKERED_LIPS');
      assert.ok(result.feedback.actionAdvice.includes('chu môi'));
    });

    test('L1 Error Detection: Flag INSUFFICIENT_JAW_DROP when user mouth is barely open for /æ/ (cat)', () => {
      const result = evaluateMouthSnapshot('/æ/', {
        jawApertureMm: 10.0, // target is 24mm
        lipWidthHeightRatio: 1.8,
        teethGapMm: 6.0,
        tongueProtrusionDetected: false
      });

      assert.equal(result.feedback.l1ErrorFlag, 'INSUFFICIENT_JAW_DROP');
      assert.ok(result.feedback.actionAdvice.includes('hạ cằm'));
    });

    test('L1 Error Detection: Flag EXCESSIVE_JAW_DROP when mouth is opened too wide for /θ/ (Image 1 test case)', () => {
      const result = evaluateMouthSnapshot('/θ/', {
        jawApertureMm: 9.3, // target is 3.5mm (+5.8mm delta)
        lipWidthHeightRatio: 1.43,
        teethGapMm: 3.0,
        tongueProtrusionDetected: true
      });

      assert.equal(result.status, 'NEEDS_ADJUSTMENT');
      assert.equal(result.feedback.l1ErrorFlag, 'EXCESSIVE_JAW_DROP');
      assert.ok(result.feedback.summary.includes('rộng'));
      assert.ok(result.feedback.actionAdvice.includes('há miệng hơi rộng'));
    });

    test('analyzeMouthCanvas should return valid biometric measurements and landmark box', () => {
      const biometrics = analyzeMouthCanvas(null, '/θ/');
      assert.ok(biometrics.landmarkBox);
      assert.equal(typeof biometrics.landmarkBox.leftPercent, 'number');
      assert.equal(typeof biometrics.landmarkBox.topPercent, 'number');
      assert.ok(biometrics.landmarkBox.topPercent > 50); // lower half for mouth
      assert.equal(typeof biometrics.jawApertureMm, 'number');
      assert.equal(typeof biometrics.tongueProtrusionDetected, 'boolean');
    });
  });

  describe('Backend API, SQLite Persistence & Quota Enforcement (Gate D, E, G)', () => {
    let server;
    const testPort = 3899;
    const baseUrl = `http://localhost:${testPort}`;
    const testUserId = `test_user_mirror_${Date.now()}`;

    before(async () => {
      await new Promise((resolve) => {
        server = app.listen(testPort, () => resolve());
      });
    });

    after(async () => {
      if (server) {
        await new Promise((resolve) => server.close(resolve));
      }
    });

    test('POST /api/v1/anatomy/mirror-analyze: evaluate snapshot and persist in SQLite', async () => {
      const res = await fetch(`${baseUrl}/api/v1/anatomy/mirror-analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': testUserId
        },
        body: JSON.stringify({
          phoneme: '/θ/',
          clientMetrics: {
            jawApertureMm: 3.4,
            lipWidthHeightRatio: 2.2,
            teethGapMm: 2.8,
            tongueProtrusionDetected: true
          },
          thumbnailData: 'data:image/webp;base64,mockThumbnailData'
        })
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.snapshotId.startsWith('snap_ant_'));
      assert.equal(data.phoneme, '/θ/');
      assert.ok(data.score >= 80);
      assert.ok(data.metrics);
      assert.ok(data.feedback);
      assert.equal(data.quota.usedToday, 1);
      assert.equal(data.quota.remainingToday, 2);

      // Verify row persisted in SQLite
      const row = db.prepare('SELECT * FROM anatomy_mirror_snapshots WHERE id = ?').get(data.snapshotId);
      assert.ok(row);
      assert.equal(row.phoneme, '/θ/');
      assert.equal(row.user_id, testUserId);
      assert.equal(row.similarity_score, data.score);
    });

    test('Quota Enforcement (Gate G): Free tier user gets blocked on 4th analysis call of the day', async () => {
      // Call 2
      await fetch(`${baseUrl}/api/v1/anatomy/mirror-analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': testUserId },
        body: JSON.stringify({ phoneme: '/θ/', clientMetrics: { jawApertureMm: 3.0 } })
      });

      // Call 3
      await fetch(`${baseUrl}/api/v1/anatomy/mirror-analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': testUserId },
        body: JSON.stringify({ phoneme: '/θ/', clientMetrics: { jawApertureMm: 3.0 } })
      });

      // Call 4: should exceed daily quota limit (3/day)
      const res4 = await fetch(`${baseUrl}/api/v1/anatomy/mirror-analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': testUserId },
        body: JSON.stringify({ phoneme: '/θ/', clientMetrics: { jawApertureMm: 3.0 } })
      });

      assert.equal(res4.status, 403);
      const data4 = await res4.json();
      assert.equal(data4.success, false);
      assert.equal(data4.code, 'QUOTA_EXCEEDED');
      assert.ok(data4.error.includes('3 lượt soi gương/ngày'));
      assert.equal(data4.quota.remainingToday, 0);
    });

    test('GET /api/v1/anatomy/mirror-history/:userId: retrieves snapshot history', async () => {
      const res = await fetch(`${baseUrl}/api/v1/anatomy/mirror-history/${testUserId}`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(Array.isArray(data.records));
      assert.ok(data.records.length >= 3);
      assert.equal(data.records[0].phoneme, '/θ/');
    });

    test('GET /api/v1/anatomy/mirror-quota/:userId: retrieves daily quota status', async () => {
      const res = await fetch(`${baseUrl}/api/v1/anatomy/mirror-quota/${testUserId}`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.tier, 'free');
      assert.equal(data.usedToday, 3);
      assert.equal(data.remainingToday, 0);
    });

    test('Validation: Rejects missing phoneme with 400 Bad Request', async () => {
      const res = await fetch(`${baseUrl}/api/v1/anatomy/mirror-analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': testUserId },
        body: JSON.stringify({ clientMetrics: { jawApertureMm: 3.0 } })
      });

      assert.equal(res.status, 400);
      const data = await res.json();
      assert.equal(data.success, false);
      assert.ok(data.error.includes('Missing required field: phoneme'));
    });
  });

});
