import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  DUAL_TRACK_BENCHMARKS,
  extractWaveformPeaks,
  compareDualTrackWaveforms
} from '../src/lib/audio/dualTrackWaveform.js';

describe('PRON-204: Dual-Track Audio Recording & Native Speaker Waveform Comparison Tests', () => {

  describe('Benchmark Waveform Catalog & Peak Structures (AC 1)', () => {
    test('Must contain standard benchmark words with native and user demo peaks', () => {
      assert.ok(DUAL_TRACK_BENCHMARKS.thought);
      assert.ok(DUAL_TRACK_BENCHMARKS.banana);
      assert.ok(DUAL_TRACK_BENCHMARKS.fresh);
    });

    test('thought benchmark should specify 680ms native duration and /θɔːt/ IPA', () => {
      const bm = DUAL_TRACK_BENCHMARKS.thought;
      assert.equal(bm.word, 'thought');
      assert.equal(bm.ipa, '/θɔːt/');
      assert.equal(bm.nativeDurationMs, 680);
      assert.equal(bm.nativeVowelNucleusMs, 240);
      assert.equal(bm.nativePeaks.length, 40);
      assert.equal(bm.demoUserPeaks.length, 40);
    });
  });

  describe('Peak Extraction & Waveform DSP (AC 2)', () => {
    test('extractWaveformPeaks should extract 40 normalized peak points from audio buffer', () => {
      const dummyBuffer = new Float32Array(400);
      for (let i = 0; i < 400; i++) {
        dummyBuffer[i] = Math.sin(i / 10) * 0.8;
      }

      const peaks = extractWaveformPeaks(dummyBuffer, 40);
      assert.equal(peaks.length, 40);
      assert.ok(peaks[0] >= 0 && peaks[0] <= 1.0);
      const maxPeak = Math.max(...peaks);
      assert.equal(maxPeak, 1.0); // normalized
    });

    test('extractWaveformPeaks should safely return zero array for empty buffer', () => {
      const peaks = extractWaveformPeaks(new Float32Array(0), 40);
      assert.equal(peaks.length, 40);
      assert.equal(peaks.every(p => p === 0), true);
    });
  });

  describe('Duration Discrepancy & Correlation Scoring (AC 3)', () => {
    test('compareDualTrackWaveforms should detect truncated vowel and emit amber warning', () => {
      // User says "thought" in only 460ms (vowel is truncated)
      const res = compareDualTrackWaveforms('thought', 460);
      assert.equal(res.word, 'thought');
      assert.equal(res.isVowelTooShort, true);
      assert.ok(res.durationWarning.includes('Nguyên âm quá ngắn'));
      assert.ok(res.durationWarning.includes('thiếu ~'));
      assert.ok(res.correlationScore > 0);
    });

    test('compareDualTrackWaveforms should not flag warning if user sustains vowel properly', () => {
      // User sustains for 670ms
      const res = compareDualTrackWaveforms('thought', 670, DUAL_TRACK_BENCHMARKS.thought.nativePeaks);
      assert.equal(res.isVowelTooShort, false);
      assert.equal(res.durationWarning, null);
      assert.ok(res.correlationScore >= 95);
    });
  });

  describe('Backend API & SQLite Persistence (Gate D & E)', () => {
    let server;
    const testPort = 3861;
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

    test('GET /api/v1/acoustic/dual-track/targets should return benchmark list', async () => {
      const res = await fetch(`${baseUrl}/api/v1/acoustic/dual-track/targets`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(Array.isArray(data.targets));
      assert.ok(data.targets.length >= 3);
      assert.equal(data.targets[0].word, 'thought');
    });

    test('POST /api/v1/acoustic/dual-track/compare should evaluate and persist to SQLite', async () => {
      const res = await fetch(`${baseUrl}/api/v1/acoustic/dual-track/compare`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'user_dual_track_test'
        },
        body: JSON.stringify({
          word: 'thought',
          userDurationMs: 460
        })
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.recordId.startsWith('dtw-'));
      assert.equal(data.comparison.word, 'thought');
      assert.equal(data.comparison.isVowelTooShort, true);

      // Verify row persisted in SQLite
      const row = db.prepare('SELECT * FROM dual_track_recording_records WHERE id = ?').get(data.recordId);
      assert.ok(row, 'Record not found in SQLite table');
      assert.equal(row.user_id, 'user_dual_track_test');
      assert.equal(row.word, 'thought');
      assert.equal(row.native_duration_ms, 680);
      assert.equal(row.user_duration_ms, 460);
      assert.ok(row.duration_warning.includes('Nguyên âm quá ngắn'));
    });

    test('GET /api/v1/acoustic/dual-track/latest should retrieve the user record', async () => {
      const res = await fetch(`${baseUrl}/api/v1/acoustic/dual-track/latest`, {
        headers: { 'x-user-id': 'user_dual_track_test' }
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.recordId);
      assert.equal(data.word, 'thought');
      assert.equal(data.nativeDurationMs, 680);
      assert.equal(data.userDurationMs, 460);
    });

    test('POST /api/v1/acoustic/dual-track/compare validation: reject missing word with 400', async () => {
      const res = await fetch(`${baseUrl}/api/v1/acoustic/dual-track/compare`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userDurationMs: 500 })
      });

      assert.equal(res.status, 400);
      const data = await res.json();
      assert.equal(data.success, false);
      assert.ok(data.error.includes('Missing required field: word'));
    });
  });

});
