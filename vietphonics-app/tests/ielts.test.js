import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../server/index.js';
import { calculateIeltsBand, computeTargetGap } from '../src/lib/scoring/ieltsMapping.js';

let server;
const PORT = 3848; // Test port for IELTS tests

describe('ELSA-103: Predicted IELTS & CEFR Speaking Band Estimator Tests', () => {
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

  describe('Scoring Algorithm & Cambridge Benchmark Tests', () => {
    test('Should accurately map high accuracy to Band 8.5 (C2)', () => {
      const res = calculateIeltsBand({
        pronunciationAcc: 94,
        fluencyWpm: 145,
        intonationScore: 92,
        lexicalGrammarEstimate: 90
      });
      assert.equal(res.overallBand, 8.5);
      assert.equal(res.cefr, 'C2');
    });

    test('Should map proficient learner to Band 7.5 (C1)', () => {
      const res = calculateIeltsBand({
        pronunciationAcc: 84,
        fluencyWpm: 138,
        intonationScore: 82,
        lexicalGrammarEstimate: 80
      });
      assert.equal(res.overallBand, 7.5);
      assert.equal(res.cefr, 'C1');
    });

    test('Should map intermediate learner to Band 6.5 (B2)', () => {
      const res = calculateIeltsBand({
        pronunciationAcc: 64,
        fluencyWpm: 120,
        intonationScore: 62,
        lexicalGrammarEstimate: 60
      });
      assert.equal(res.overallBand, 6.5);
      assert.equal(res.cefr, 'B2');
    });

    test('Should map modest learner to Band 5.5 (B2/B1)', () => {
      const res = calculateIeltsBand({
        pronunciationAcc: 48,
        fluencyWpm: 95,
        intonationScore: 48,
        lexicalGrammarEstimate: 46
      });
      assert.equal(res.overallBand, 5.5);
      assert.equal(res.cefr, 'B2');
    });

    test('Should map basic learner to Band 4.5 (B1)', () => {
      const res = calculateIeltsBand({
        pronunciationAcc: 32,
        fluencyWpm: 65,
        intonationScore: 30,
        lexicalGrammarEstimate: 32
      });
      assert.equal(res.overallBand, 4.5);
      assert.equal(res.cefr, 'B1');
    });

    test('AC 2: Must contain all 4 official assessment criteria (PR, FC, LR, GRA)', () => {
      const res = calculateIeltsBand();
      assert.ok(res.criteria.pronunciation);
      assert.ok(res.criteria.fluency);
      assert.ok(res.criteria.lexical);
      assert.ok(res.criteria.grammar);
      assert.ok(res.criteria.pronunciation.band >= 4.0 && res.criteria.pronunciation.band <= 9.0);
    });

    test('Gate I7 & L: Must include legal disclaimer regarding Cambridge/IDP/BC', () => {
      const res = calculateIeltsBand();
      assert.ok(res.disclaimer);
      assert.ok(res.disclaimer.includes('Cambridge') || res.disclaimer.includes('IDP'));
    });
  });

  describe('Target Gap Calculation (AC 3)', () => {
    test('Should compute positive gap when current band is below target', () => {
      const criteria = {
        pronunciation: { band: 6.5 },
        fluency: { band: 6.5 }
      };
      const gapInfo = computeTargetGap(6.5, 7.5, criteria);
      assert.equal(gapInfo.gap, 1.0);
      assert.equal(gapInfo.achieved, false);
      assert.ok(gapInfo.recommendation.includes('+1 Band') || gapInfo.recommendation.includes('+1.0') || gapInfo.recommendation.includes('+1'));
    });

    test('Should detect achieved goal when current band reaches target', () => {
      const gapInfo = computeTargetGap(8.0, 7.5);
      assert.equal(gapInfo.achieved, true);
      assert.equal(gapInfo.gap, 0);
    });
  });

  describe('Backend API Integration Tests (Gate D & E)', () => {
    test('GET /api/v1/user/ielts-estimate should return current estimation', async () => {
      const res = await fetch(`http://localhost:${PORT}/api/v1/user/ielts-estimate`, {
        headers: { 'x-user-id': 'test_ielts_user' }
      });
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.estimate.overallBand >= 4.0);
      assert.ok(data.estimate.cefr);
      assert.ok(data.gapInfo);
    });

    test('POST /api/v1/user/ielts-target should update target band and persist to DB', async () => {
      const res = await fetch(`http://localhost:${PORT}/api/v1/user/ielts-target`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'test_ielts_user'
        },
        body: JSON.stringify({ targetBand: 8.0 })
      });
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.targetBand, 8.0);
      assert.ok(data.gapInfo);
    });

    test('Validation: Should reject invalid target band with 400 Bad Request', async () => {
      const res = await fetch(`http://localhost:${PORT}/api/v1/user/ielts-target`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'test_ielts_user'
        },
        body: JSON.stringify({ targetBand: 'invalid_band' })
      });
      assert.equal(res.status, 400);
      const data = await res.json();
      assert.equal(data.success, false);
    });
  });
});
