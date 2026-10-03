import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../server/index.js';

let server;
const PORT = 3847; // Test port

describe('ELSA-102: L1 Regional Dialect Calibration Engine Tests', () => {
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

  test('AC 1: Should retrieve default dialect profile with penalty weights', async () => {
    const res = await fetch(`http://localhost:${PORT}/api/v1/user/dialect-profile`, {
      headers: { 'x-user-id': 'test_user_01' }
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(data.profile);
    assert.ok(['bac', 'trung', 'nam'].includes(data.profile.dialect));
    assert.ok(data.weightsConfig.weights.phonemePenalties);
  });

  test('AC 1 & AC 4: Should update dialect profile to Northern (bac) and persist weights', async () => {
    const res = await fetch(`http://localhost:${PORT}/api/v1/user/dialect-profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': 'test_user_01'
      },
      body: JSON.stringify({
        region: 'bac',
        calibrationMode: 'manual_selection',
        confidenceScore: 0.95
      })
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.profile.dialect, 'bac');
    assert.equal(data.weightsConfig.weights.phonemePenalties['/l/'], 1.5);
    assert.equal(data.weightsConfig.weights.phonemePenalties['/r/'], 0.7);
  });

  test('AC 4: Should allow switching dialect to Southern (nam) without data loss', async () => {
    const res = await fetch(`http://localhost:${PORT}/api/v1/user/dialect-profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': 'test_user_01'
      },
      body: JSON.stringify({
        region: 'nam',
        calibrationMode: 'manual_selection'
      })
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.profile.dialect, 'nam');
    assert.equal(data.weightsConfig.weights.phonemePenalties['/t/'], 1.5);
    assert.equal(data.weightsConfig.weights.phonemePenalties['/ks/'], 1.6);
  });

  test('Validation: Should reject invalid region with 400 Bad Request', async () => {
    const res = await fetch(`http://localhost:${PORT}/api/v1/user/dialect-profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': 'test_user_01'
      },
      body: JSON.stringify({ region: 'invalid_region' })
    });
    assert.equal(res.status, 400);
    const data = await res.json();
    assert.equal(data.success, false);
  });

  test('AC 2: Audio calibration endpoint should auto-detect Northern dialect with confidence > 88%', async () => {
    const res = await fetch(`http://localhost:${PORT}/api/v1/user/dialect-audio-calibrate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': 'test_user_01'
      },
      body: JSON.stringify({
        sentence: 'Look at the little light shining at night',
        features: {
          f0Variance: 0.45,
          formantF1F2Offset: 120,
          glottalStopDetected: false
        }
      })
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.detectedDialect, 'bac');
    assert.ok(data.confidenceScore >= 0.88, `Confidence ${data.confidenceScore} should be >= 0.88`);
    assert.ok(data.recommendedCurriculum.includes('L/N'));
  });
});
