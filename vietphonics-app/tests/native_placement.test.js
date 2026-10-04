import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  NATIVE_PLACEMENT_GUIDES,
  getPlacementGuidesCatalog,
  getPlacementGuideByPhoneme,
  evaluatePlacementFeedback
} from '../src/lib/scoring/nativePlacement.js';

describe('VN-105: Vietnamese Native-Tongue Mouth & Tongue Placement Guides Tests', () => {
  let server;
  const PORT = 3869;
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

  describe('3-Step Articulatory Guides (AC 1)', () => {
    test('Catalog must contain placement guides for /ð/, /θ/, and /æ/', () => {
      const catalog = getPlacementGuidesCatalog();
      assert.ok(Array.isArray(catalog));
      assert.ok(catalog.length >= 3);

      const dhGuide = catalog.find((g) => g.phoneme === '/ð/');
      assert.ok(dhGuide);
      assert.equal(dhGuide.threeSteps.length, 3);
      assert.match(dhGuide.threeSteps[0].name, /Kẹp/i);
      assert.match(dhGuide.threeSteps[1].name, /Rung/i);
      assert.match(dhGuide.threeSteps[2].name, /Rụt Lưỡi/i);
    });

    test('Each 3-step guide must include actionable practical instruction without academic jargon', () => {
      const guide = getPlacementGuideByPhoneme('/ð/');
      for (const step of guide.threeSteps) {
        assert.ok(step.step >= 1 && step.step <= 3);
        assert.ok(step.name);
        assert.ok(step.action);
        assert.ok(step.detail);
      }
    });
  });

  describe('Side-by-Side Palate Contrast & Tactile Mnemonics (AC 2 & AC 3)', () => {
    test('Must define side-by-side contrast between Vietnamese L1 habit and English target', () => {
      const guide = getPlacementGuideByPhoneme('/ð/');
      assert.ok(guide.contrastPalate);
      assert.match(guide.contrastPalate.vietnamesePosture, /tiếng việt/i);
      assert.match(guide.contrastPalate.englishPosture, /luồng hơi nén/i);
    });

    test('Must provide tactile mnemonic sensation for sensory muscle feedback', () => {
      const guide = getPlacementGuideByPhoneme('/ð/');
      assert.ok(guide.tactileMnemonic);
      assert.match(guide.tactileMnemonic.action, /thanh quản/i);
      assert.match(guide.tactileMnemonic.sensation, /rung rần rần/i);

      const thGuide = getPlacementGuideByPhoneme('/θ/');
      assert.match(thGuide.tactileMnemonic.action, /lòng bàn tay/i);
      assert.match(thGuide.tactileMnemonic.sensation, /gió mát/i);
    });
  });

  describe('Placement Feedback Evaluation (AC 4)', () => {
    test('evaluatePlacementFeedback should validate ratings and provide gratitude feedback', () => {
      const res = evaluatePlacementFeedback({
        phoneme: '/ð/',
        rating: 5,
        feedbackNote: 'Mẹo kẹp lưỡi rất dễ hiểu!'
      });

      assert.equal(res.success, true);
      assert.equal(res.phoneme, '/ð/');
      assert.equal(res.rating, 5);
      assert.equal(res.isHelpful, true);
    });
  });

  describe('Backend API & SQLite Persistence (Gate D & E)', () => {
    test('GET /api/v1/pedagogy/placement-guides should return all guides', async () => {
      const res = await fetch(`${baseUrl}/api/v1/pedagogy/placement-guides`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.guides.length >= 3);
    });

    test('GET /api/v1/pedagogy/placement-guides/:phoneme should return single guide', async () => {
      const res = await fetch(`${baseUrl}/api/v1/pedagogy/placement-guides/%2F%C3%B0%2F`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.guide.phoneme, '/ð/');
    });

    test('POST /api/v1/pedagogy/placement-feedback should persist feedback to SQLite', async () => {
      const testUserId = `test-user-${Date.now()}`;
      const payload = {
        userId: testUserId,
        phoneme: '/ð/',
        rating: 5,
        feedbackNote: 'Rất hữu ích cho người mất gốc'
      };

      const res = await fetch(`${baseUrl}/api/v1/pedagogy/placement-feedback`, {
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
      assert.equal(data.feedback.isHelpful, true);

      // Verify in SQLite
      const row = db.prepare('SELECT * FROM native_placement_feedback_records WHERE id = ?').get(data.recordId);
      assert.ok(row);
      assert.equal(row.user_id, testUserId);
      assert.equal(row.phoneme, '/ð/');
      assert.equal(row.rating, 5);
      assert.equal(row.is_helpful, 1);
    });

    test('GET /api/v1/pedagogy/placement-feedback/latest should retrieve user feedback', async () => {
      const testUserId = `test-user-${Date.now()}`;
      const payload = {
        userId: testUserId,
        phoneme: '/θ/',
        rating: 4,
        feedbackNote: 'Thổi gió mát cảm nhận được ngay'
      };

      await fetch(`${baseUrl}/api/v1/pedagogy/placement-feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const res = await fetch(`${baseUrl}/api/v1/pedagogy/placement-feedback/latest`, {
        headers: { 'x-user-id': testUserId }
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.recordId);
      assert.equal(data.userId, testUserId);
      assert.equal(data.phoneme, '/θ/');
      assert.equal(data.rating, 4);
    });

    test('POST /api/v1/pedagogy/placement-feedback validation: reject missing phoneme with 400', async () => {
      const res = await fetch(`${baseUrl}/api/v1/pedagogy/placement-feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: 5 })
      });

      assert.equal(res.status, 400);
      const data = await res.json();
      assert.equal(data.success, false);
      assert.match(data.error, /phoneme/i);
    });
  });
});
