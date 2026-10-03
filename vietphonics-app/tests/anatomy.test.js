import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  PHONEME_ANATOMY_CATALOG,
  calculateAnatomyTransform
} from '../src/lib/anatomy/phonemeAnatomyData.js';

describe('PRON-201: Interactive 2D Anatomical Lip & Tongue Articulation Guide Tests', () => {

  describe('Static Client Vector Cache & Anatomical Data (AC 1 & AC 4)', () => {
    test('Must load phoneme catalog locally without server delay', () => {
      assert.ok(PHONEME_ANATOMY_CATALOG['/θ/']);
      assert.ok(PHONEME_ANATOMY_CATALOG['/ð/']);
      assert.ok(PHONEME_ANATOMY_CATALOG['/ʃ/']);
      assert.ok(PHONEME_ANATOMY_CATALOG['/ʒ/']);
    });

    test('Each anatomical profile must contain SVG tongue path, contact target and L1 mistake', () => {
      const theta = PHONEME_ANATOMY_CATALOG['/θ/'];
      assert.equal(theta.phoneme, '/θ/');
      assert.equal(theta.sampleWord, 'think');
      assert.ok(theta.tonguePath.startsWith('M '));
      assert.ok(theta.l1GhostPath.startsWith('M '));
      assert.ok(theta.l1Mistake.includes('Thờ'));
      assert.ok(theta.correctiveGuidance.includes('2-3mm'));
      assert.ok(theta.tactileTrick.includes('ngón tay'));
    });
  });

  describe('Biomechanical Sliders & Bézier Coordinate Transform (AC 2)', () => {
    test('calculateAnatomyTransform should return 0 translation at default values (35, 25)', () => {
      const transform = calculateAnatomyTransform(35, 25);
      assert.equal(transform.yOffset, 0);
      assert.equal(transform.jawY, 0);
      assert.equal(transform.totalTranslateY, 0);
    });

    test('calculateAnatomyTransform should adjust height when tongue is elevated', () => {
      // higher elevation (e.g. 65%) should pull tongue upward (negative yOffset)
      const transform = calculateAnatomyTransform(65, 25);
      assert.ok(transform.yOffset < 0);
    });

    test('calculateAnatomyTransform should adjust jaw drop when mouth opens wide', () => {
      // jaw drop (e.g. 50%) should increase downward displacement
      const transform = calculateAnatomyTransform(35, 50);
      assert.ok(transform.jawY > 0);
    });
  });

  describe('L1 Ghost Overlay & Articulatory Contrast (AC 3)', () => {
    test('Must provide distinct L1 ghost path contrasting retracted vs interdental position', () => {
      const theta = PHONEME_ANATOMY_CATALOG['/θ/'];
      assert.notEqual(theta.tonguePath, theta.l1GhostPath);
      assert.ok(theta.l1GhostPath.length > 50);
    });
  });

  describe('Backend API & SQLite Persistence (Gate D & E)', () => {
    let server;
    const testPort = 3858;
    const baseUrl = `http://localhost:${testPort}`;

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

    test('GET /api/v1/anatomy/phonemes should return all anatomy profiles', async () => {
      const res = await fetch(`${baseUrl}/api/v1/anatomy/phonemes`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(Array.isArray(data.phonemes));
      assert.ok(data.phonemes.length >= 4);
      assert.equal(data.phonemes[0].phoneme, '/θ/');
    });

    test('POST /api/v1/anatomy/calibration should persist slider settings to SQLite', async () => {
      const res = await fetch(`${baseUrl}/api/v1/anatomy/calibration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'user_anatomy_test'
        },
        body: JSON.stringify({
          phoneme: '/θ/',
          tongueElevation: 38,
          jawDrop: 22,
          airPressure: 70,
          isGhostCompared: true
        })
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.recordId.startsWith('ant-'));
      assert.equal(data.phoneme, '/θ/');

      // Verify row persisted in SQLite
      const row = db.prepare('SELECT * FROM anatomy_calibration_records WHERE id = ?').get(data.recordId);
      assert.ok(row);
      assert.equal(row.phoneme, '/θ/');
      assert.equal(row.tongue_elevation, 38);
      assert.equal(row.jaw_drop, 22);
      assert.equal(row.is_ghost_compared, 1);
      assert.equal(row.user_id, 'user_anatomy_test');
    });

    test('GET /api/v1/anatomy/calibration/latest should retrieve the latest calibration', async () => {
      const res = await fetch(`${baseUrl}/api/v1/anatomy/calibration/latest`, {
        headers: { 'x-user-id': 'user_anatomy_test' }
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.recordId);
      assert.equal(data.phoneme, '/θ/');
      assert.equal(data.tongueElevation, 38);
      assert.equal(data.isGhostCompared, true);
    });

    test('POST /api/v1/anatomy/calibration validation: should reject missing fields with 400', async () => {
      const res = await fetch(`${baseUrl}/api/v1/anatomy/calibration`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneme: '/θ/' })
      });

      assert.equal(res.status, 400);
      const data = await res.json();
      assert.equal(data.success, false);
      assert.ok(data.error.includes('Missing required fields'));
    });
  });

});
