import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  alignSentencePhonemes,
  classifyPhonemeTier,
  getAccessibilityMarker,
  decomposeWordToPhonemes,
  VIETNAMESE_PHONETIC_TRAPS
} from '../src/lib/scoring/phonemeAlignment.js';

let server;
const PORT = 3851; // Dedicated test port for alignment

describe('ELSA-201: Real-Time Phoneme Error Heatmap with Forced Alignment Tests', () => {
  const sampleSentence = 'Six months ago, she baked fresh bread for breakfast.';

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

  describe('CTC Alignment & Phoneme Breakdown (AC 1)', () => {
    test('Should align sentence into words and sub-phonemes with timestamps', () => {
      const result = alignSentencePhonemes(sampleSentence);

      assert.ok(result);
      assert.strictEqual(result.sentence, sampleSentence);
      assert.ok(result.wordsCount > 0);
      assert.ok(result.phonemesCount > 0);
      assert.ok(result.overallGop >= 0 && result.overallGop <= 100);

      // Verify word alignment structure
      const firstWord = result.words[0];
      assert.strictEqual(firstWord.word, 'Six');
      assert.ok(firstWord.startMs < firstWord.endMs);
      assert.ok(Array.isArray(firstWord.phonemes));
      assert.strictEqual(firstWord.phonemes.length, 4); // s, ɪ, k, s
    });

    test('Each phoneme must have IPA symbol, score (0-100), and timing interval', () => {
      const result = alignSentencePhonemes(sampleSentence);
      const sixWord = result.words[0];

      sixWord.phonemes.forEach(p => {
        assert.ok(p.symbol);
        assert.ok(p.ipa.startsWith('/'));
        assert.ok(typeof p.score === 'number' && p.score >= 0 && p.score <= 100);
        assert.ok(p.startMs < p.endMs);
      });
    });

    test('Should dynamically decompose unknown sentences with estimated alignment', () => {
      const customSentence = 'Quick brown fox';
      const result = alignSentencePhonemes(customSentence);

      assert.strictEqual(result.words.length, 3);
      assert.strictEqual(result.words[0].word, 'Quick');
      assert.ok(result.words[0].phonemes.length > 0);
    });
  });

  describe('Phoneme Color-Coded Heatmap Tiers (AC 2)', () => {
    test('Score >= 85 must classify as mastered (Emerald Green)', () => {
      const tier = classifyPhonemeTier(95);
      assert.strictEqual(tier.tier, 'mastered');
      assert.ok(tier.badgeClass.includes('emerald'));
      assert.strictEqual(tier.colorCode, '#10b981');
    });

    test('Score 60 to 84 must classify as acceptable (Amber Yellow)', () => {
      const tier = classifyPhonemeTier(70);
      assert.strictEqual(tier.tier, 'acceptable');
      assert.ok(tier.badgeClass.includes('amber'));
      assert.strictEqual(tier.colorCode, '#f59e0b');
    });

    test('Score < 60 must classify as error with pulsating warning glow (Rose Red)', () => {
      const tier = classifyPhonemeTier(42);
      assert.strictEqual(tier.tier, 'error');
      assert.ok(tier.badgeClass.includes('rose'));
      assert.ok(tier.badgeClass.includes('animate-pulse'));
      assert.strictEqual(tier.colorCode, '#f43f5e');
    });
  });

  describe('Diagnostic Guidance & Articulatory Popover (AC 3)', () => {
    test('Error phonemes must contain Vietnamese L1 trap explanation and correction tip', () => {
      const result = alignSentencePhonemes(sampleSentence);
      const sixWord = result.words[0];
      const endingS = sixWord.phonemes[3]; // 's' in /ks/

      assert.strictEqual(endingS.tier, 'error');
      assert.ok(endingS.trap, 'Must have trap explanation');
      assert.ok(endingS.tip, 'Must have articulatory tip');
      assert.ok(endingS.trap.includes('Người Việt') || endingS.trap.includes('bỏ quên'));
    });

    test('Must maintain comprehensive dictionary of Vietnamese L1 phonetic traps', () => {
      assert.ok(VIETNAMESE_PHONETIC_TRAPS['ks']);
      assert.ok(VIETNAMESE_PHONETIC_TRAPS['θ']);
      assert.ok(VIETNAMESE_PHONETIC_TRAPS['t']);
      assert.ok(VIETNAMESE_PHONETIC_TRAPS['d']);
      assert.ok(VIETNAMESE_PHONETIC_TRAPS['ʃ']);
    });
  });

  describe('Colorblind Accessibility Markers (AC 4 & WCAG 2.1 AA)', () => {
    test('Must assign distinct geometric markers: ✓ for >=85%, ! for 60-84%, ✕ for <60%', () => {
      const markerHigh = getAccessibilityMarker(90);
      assert.strictEqual(markerHigh.iconText, '✓');

      const markerMid = getAccessibilityMarker(65);
      assert.strictEqual(markerMid.iconText, '!');

      const markerLow = getAccessibilityMarker(45);
      assert.strictEqual(markerLow.iconText, '✕');
    });
  });

  describe('Backend API & SQLite Persistence (Gate D, E, H)', () => {
    const testUserId = `test-user-align-${Date.now()}`;

    test('POST /api/v1/scoring/phoneme-alignment should evaluate sentence and save record', async () => {
      const res = await fetch(`http://localhost:${PORT}/api/v1/scoring/phoneme-alignment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': testUserId
        },
        body: JSON.stringify({
          sentence: sampleSentence
        })
      });

      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.success, true);
      assert.ok(data.alignmentId);
      assert.strictEqual(data.userId, testUserId);
      assert.strictEqual(data.wordsCount, 9);
      assert.ok(data.overallGop > 0);

      // Verify row in SQLite phoneme_alignment_records
      const row = db.prepare('SELECT * FROM phoneme_alignment_records WHERE id = ?').get(data.alignmentId);
      assert.ok(row);
      assert.strictEqual(row.user_id, testUserId);
      assert.strictEqual(row.sentence_text, sampleSentence);
    });

    test('POST /api/v1/scoring/phoneme-alignment must update user_phoneme_mastery in DB (Gate H)', async () => {
      // Check that phonemes from sentence exist in user_phoneme_mastery
      const phonemeRow = db.prepare('SELECT * FROM user_phoneme_mastery WHERE user_id = ? AND phoneme = ?').get(testUserId, 's');
      assert.ok(phonemeRow, 'Phoneme /s/ should have been synced to mastery ledger');
      assert.ok(phonemeRow.score > 0);
    });

    test('GET /api/v1/scoring/phoneme-alignment/latest should retrieve the most recent alignment', async () => {
      const res = await fetch(`http://localhost:${PORT}/api/v1/scoring/phoneme-alignment/latest`, {
        headers: {
          'x-user-id': testUserId
        }
      });

      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.success, true);
      assert.ok(data.alignment);
      assert.strictEqual(data.sentence, sampleSentence);
    });

    test('Validation: Should reject empty sentence with 400 Bad Request', async () => {
      const res = await fetch(`http://localhost:${PORT}/api/v1/scoring/phoneme-alignment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sentence: '' })
      });

      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.strictEqual(data.success, false);
      assert.ok(data.error.includes('Missing required field: sentence'));
    });
  });
});
