import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  calculateSemitone,
  calculateMedianF0,
  normalizePitchContour,
  classifyTerminalIntonation,
  evaluateMelodySimilarity,
  analyzePitchContour,
  SENTENCE_PITCH_BENCHMARKS
} from '../src/lib/scoring/pitchContour.js';

describe('ELSA-203: Suprasegmental Pitch & Sentence Intonation Melody Tracker Tests', () => {

  describe('Semitone Normalization & F0 Math (AC 4)', () => {
    test('calculateSemitone should return 0 when F0 equals median F0', () => {
      const st = calculateSemitone(200, 200);
      assert.equal(st, 0);
    });

    test('calculateSemitone should return +12 semitones for one octave higher', () => {
      const st = calculateSemitone(400, 200);
      assert.equal(st, 12);
    });

    test('calculateSemitone should return -12 semitones for one octave lower', () => {
      const st = calculateSemitone(100, 200);
      assert.equal(st, -12);
    });

    test('calculateSemitone should handle unvoiced or invalid frequencies gracefully', () => {
      assert.equal(calculateSemitone(0, 200), 0);
      assert.equal(calculateSemitone(20, 200), 0);
      assert.equal(calculateSemitone(200, 0), 0);
    });

    test('calculateMedianF0 should return median across voiced frames', () => {
      const samples = [120, 130, 140, 150, 160];
      const median = calculateMedianF0(samples);
      assert.equal(median, 140);
    });

    test('normalizePitchContour should eliminate male vs female baseline gap', () => {
      const maleTrack = [
        { timeSec: 0.1, f0: 100 },
        { timeSec: 0.5, f0: 120 },
        { timeSec: 1.0, f0: 150 }
      ];
      const femaleTrack = [
        { timeSec: 0.1, f0: 200 },
        { timeSec: 0.5, f0: 240 },
        { timeSec: 1.0, f0: 300 }
      ];

      const maleNorm = normalizePitchContour(maleTrack);
      const femaleNorm = normalizePitchContour(femaleTrack);

      // Both scale identically in relative semitone space despite absolute Hz difference!
      assert.equal(maleNorm.normalizedPoints[1].st, femaleNorm.normalizedPoints[1].st);
    });
  });

  describe('Terminal Intonation Slope & Classification (AC 2)', () => {
    test('classifyTerminalIntonation should detect rising tone (>= +2.0 semitones)', () => {
      const risingPoints = [
        { t: 0.0, st: 0.0 },
        { t: 0.5, st: 0.5 },
        { t: 0.8, st: 1.0 },
        { t: 1.0, st: 4.2 }
      ];
      const res = classifyTerminalIntonation(risingPoints);
      assert.equal(res.terminalTone, 'rise');
      assert.equal(res.isRising, true);
      assert.ok(res.deltaSemitones >= 2.0);
    });

    test('classifyTerminalIntonation should detect falling tone (<= -1.8 semitones)', () => {
      const fallingPoints = [
        { t: 0.0, st: 2.0 },
        { t: 0.5, st: 1.0 },
        { t: 0.8, st: 0.0 },
        { t: 1.0, st: -2.8 }
      ];
      const res = classifyTerminalIntonation(fallingPoints);
      assert.equal(res.terminalTone, 'fall');
      assert.equal(res.isFalling, true);
      assert.ok(res.deltaSemitones <= -1.8);
    });
  });

  describe('Vietnamese L1 Intonation Trap Detection & Pedagogy (AC 1 & AC 2)', () => {
    test('Must detect L1 falling/flat intonation trap on Yes/No question', () => {
      const evalResult = analyzePitchContour('sent_yes_no_01', null, 'fall_trap');
      assert.equal(evalResult.sentenceType, 'yes_no_question');
      assert.equal(evalResult.targetTerminalTone, 'rise');
      assert.equal(evalResult.userTerminalTone, 'fall');
      assert.equal(evalResult.isTerminalCorrect, false);
      assert.equal(evalResult.l1ToneTrap, true);
      assert.ok(evalResult.feedback.includes('Bẫy ngữ điệu L1'));
    });

    test('Should reward correct rising tone on Yes/No question with high melody score', () => {
      const evalResult = analyzePitchContour('sent_yes_no_01', null, 'normal');
      assert.equal(evalResult.isTerminalCorrect, true);
      assert.equal(evalResult.l1ToneTrap, false);
      assert.ok(evalResult.melodySimilarityScore >= 80);
      assert.ok(evalResult.feedback.includes('tuyệt vời'));
    });

    test('Should support Wh- and Statement sentence benchmarks', () => {
      const whResult = analyzePitchContour('sent_wh_02');
      assert.equal(whResult.targetTerminalTone, 'fall');

      const stmtResult = analyzePitchContour('sent_statement_03');
      assert.equal(stmtResult.targetTerminalTone, 'fall');
    });
  });

  describe('Backend API & SQLite Persistence (Gate D & E)', () => {
    let server;
    const testPort = 3855;
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

    test('GET /api/v1/scoring/pitch-contour/benchmarks should return benchmark sentences', async () => {
      const res = await fetch(`${baseUrl}/api/v1/scoring/pitch-contour/benchmarks`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(Array.isArray(data.benchmarks));
      assert.ok(data.benchmarks.length >= 3);
      assert.equal(data.benchmarks[0].id, 'sent_yes_no_01');
    });

    test('POST /api/v1/scoring/pitch-contour should evaluate intonation and persist in SQLite', async () => {
      const res = await fetch(`${baseUrl}/api/v1/scoring/pitch-contour`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'user_intonation_test'
        },
        body: JSON.stringify({
          sentenceId: 'sent_yes_no_01',
          simulatedTone: 'normal'
        })
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.contourId.startsWith('pit-'));
      assert.equal(data.evaluation.sentenceId, 'sent_yes_no_01');
      assert.equal(data.evaluation.isTerminalCorrect, true);

      // Verify row persisted in SQLite
      const row = db.prepare('SELECT * FROM pitch_contour_records WHERE id = ?').get(data.contourId);
      assert.ok(row);
      assert.equal(row.sentence_id, 'sent_yes_no_01');
      assert.equal(row.target_terminal_tone, 'rise');
      assert.equal(row.user_id, 'user_intonation_test');
    });

    test('GET /api/v1/scoring/pitch-contour/latest should retrieve the latest user record', async () => {
      const res = await fetch(`${baseUrl}/api/v1/scoring/pitch-contour/latest`, {
        headers: { 'x-user-id': 'user_intonation_test' }
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.contourId);
      assert.equal(data.sentenceId, 'sent_yes_no_01');
      assert.ok(Array.isArray(data.nativePoints));
      assert.ok(Array.isArray(data.userPoints));
    });

    test('POST /api/v1/scoring/pitch-contour validation: should reject empty sentenceId with 400', async () => {
      const res = await fetch(`${baseUrl}/api/v1/scoring/pitch-contour`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sentenceId: '' })
      });

      assert.equal(res.status, 400);
      const data = await res.json();
      assert.equal(data.success, false);
      assert.ok(data.error.includes('Missing required field: sentenceId'));
    });
  });

});
