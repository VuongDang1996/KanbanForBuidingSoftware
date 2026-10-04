import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../server/index.js';
import { db } from '../server/db.js';

// ADV-101
import {
  extractSpeakerEmbedding,
  calculateCosineSimilarity,
  synthesizeGoldenSpeakerChannels
} from '../src/lib/ai/goldenSpeakerEngine.js';

// ADV-102
import {
  evaluateLipLandmarks,
  evaluatePhonemeLipTarget
} from '../src/lib/cv/lipTrackingEngine.js';

// ADV-103
import {
  evaluateVowelFormants,
  formantToSvgCoords,
  VOWEL_FORMANT_TARGETS
} from '../src/lib/audio/formantAnalysis.js';

// ADV-104
import {
  getOrCreateCoachMemoryProfile,
  generateCoachResponse
} from '../src/lib/ai/phoneticsCoachMemory.js';

const PORT = 3890;
let server;
const BASE_URL = `http://127.0.0.1:${PORT}`;

before((done) => {
  server = http.createServer(app);
  server.listen(PORT, done);
});

after((done) => {
  server.close(done);
});

describe('ADV-101: Golden Speaker Voice-Cloned Self Model Tests', () => {

  test('extractSpeakerEmbedding produces 256-D normalized vector and cosine similarity > 0.88', () => {
    const vecA = extractSpeakerEmbedding('user_viet_01', [145, 1820, 0.75, 520, 1540]);
    const vecB = extractSpeakerEmbedding('user_viet_01', [148, 1810, 0.74, 525, 1530]);

    assert.equal(vecA.length, 256);
    assert.equal(vecB.length, 256);

    const sim = calculateCosineSimilarity(vecA, vecB);
    assert.ok(sim > 0.88, `Cosine similarity ${sim} should be > 0.88 for same speaker profile`);
  });

  test('synthesizeGoldenSpeakerChannels outputs 3 comparison channels and hotkeys', () => {
    const res = synthesizeGoldenSpeakerChannels({
      userId: 'user_viet_01',
      word: 'specifically',
      targetIpa: '/spəˈsɪfɪkli/'
    });

    assert.equal(res.word, 'specifically');
    assert.equal(res.targetIpa, '/spəˈsɪfɪkli/');
    assert.ok(res.timbreSimilarity >= 0.88);
    assert.ok(res.channels.channelA); // User real
    assert.ok(res.channels.channelB); // Golden speaker
    assert.ok(res.channels.channelC); // Native reference
    assert.equal(res.channels.channelA.channelKey, 'a');
    assert.equal(res.channels.channelB.channelKey, 'b');
    assert.equal(res.channels.channelC.channelKey, 'c');
  });

  test('POST /api/v1/ai/golden-speaker/calibrate and synthesize API endpoints', async () => {
    const testUserId = `test_golden_${Date.now()}`;

    // 1. Calibrate
    const calRes = await fetch(`${BASE_URL}/api/v1/ai/golden-speaker/calibrate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: testUserId, audioFeatures: [150, 1900, 0.8, 500, 1600] })
    });
    assert.equal(calRes.status, 200);
    const calData = await calRes.json();
    assert.equal(calData.success, true);
    assert.equal(calData.embeddingLength, 256);
    assert.equal(calData.status, 'calibrated');

    // 2. Synthesize
    const synRes = await fetch(`${BASE_URL}/api/v1/ai/golden-speaker/synthesize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: testUserId, word: 'comfortable', targetIpa: '/ˈkʌmftəbl/' })
    });
    assert.equal(synRes.status, 200);
    const synData = await synRes.json();
    assert.equal(synData.success, true);
    assert.ok(synData.sessionId);
    assert.ok(synData.channels.channelB);

    // 3. Profile query
    const profRes = await fetch(`${BASE_URL}/api/v1/ai/golden-speaker/profile/${testUserId}`);
    assert.equal(profRes.status, 200);
    const profData = await profRes.json();
    assert.equal(profData.isCalibrated, true);
    assert.ok(profData.recentSessions.length >= 1);
  });

});

describe('ADV-102: Webcam Lip & Jaw Tracking Telemetry Tests', () => {

  test('evaluateLipLandmarks extracts normalized jawOpening and lipSpread metrics', () => {
    // Mock 468 MediaPipe landmarks
    const landmarks = Array.from({ length: 468 }, (_, i) => ({ x: 0.5, y: 0.5, z: 0 }));
    // Upper lip center 13, lower lip center 14
    landmarks[13] = { x: 0.5, y: 0.40, z: 0 };
    landmarks[14] = { x: 0.5, y: 0.65, z: 0 }; // 0.25 vertical distance
    // Left corner 61, right corner 291
    landmarks[61] = { x: 0.35, y: 0.5, z: 0 };
    landmarks[291] = { x: 0.65, y: 0.5, z: 0 }; // 0.30 horizontal distance

    const telemetry = evaluateLipLandmarks(landmarks);
    assert.ok(telemetry.jawOpening >= 70, `Jaw opening ${telemetry.jawOpening} should be >= 70`);
    assert.ok(telemetry.lipSpread >= 50, `Lip spread ${telemetry.lipSpread} should be >= 50`);
  });

  test('evaluatePhonemeLipTarget checks /æ/ target zone and generates Vietnamese L1 jaw warning', () => {
    // 1. In target zone (Jaw 82%)
    const passEval = evaluatePhonemeLipTarget('ae', { jawOpening: 82, lipSpread: 50, lipRounding: 50 });
    assert.equal(passEval.isTargetMet, true);
    assert.equal(passEval.score, 100);

    // 2. Narrow jaw opening (55%), triggers L1 warning
    const failEval = evaluatePhonemeLipTarget('ae', { jawOpening: 55, lipSpread: 50, lipRounding: 50 });
    assert.equal(failEval.isTargetMet, false);
    assert.ok(failEval.score < 100);
    assert.ok(failEval.advice.includes('Hạ hàm dưới'));
  });

  test('POST /api/v1/ai/lip-tracking/record persists telemetry in SQLite', async () => {
    const testUserId = `test_lip_${Date.now()}`;
    const res = await fetch(`${BASE_URL}/api/v1/ai/lip-tracking/record`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: testUserId,
        phonemeKey: 'u',
        telemetry: { jawOpening: 40, lipSpread: 25, lipRounding: 88 }
      })
    });

    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(data.recordId);
    assert.equal(data.evaluation.isTargetMet, true);

    // Verify in DB
    const histRes = await fetch(`${BASE_URL}/api/v1/ai/lip-tracking/history/${testUserId}`);
    const histData = await histRes.json();
    assert.equal(histData.success, true);
    assert.equal(histData.history.length, 1);
    assert.equal(histData.history[0].lip_rounding, 88);
  });

});

describe('ADV-103: Live Inverted Vowel Space Chart Tests', () => {

  test('VOWEL_FORMANT_TARGETS contains 12 standard IPA vowels with F1/F2 targets', () => {
    assert.equal(VOWEL_FORMANT_TARGETS.length, 12);
    const fleece = VOWEL_FORMANT_TARGETS.find(v => v.symbol === '/iː/');
    assert.ok(fleece);
    assert.equal(fleece.f1, 280);
    assert.equal(fleece.f2, 2250);

    const coords = formantToSvgCoords(fleece.f1, fleece.f2);
    assert.ok(coords.x > 0 && coords.x < 640);
    assert.ok(coords.y > 0 && coords.y < 440);
  });

  test('evaluateVowelFormants evaluates target ellipse match and vector advice', () => {
    // 1. Inside target ellipse
    const insideRes = evaluateVowelFormants('/iː/', 285, 2240);
    assert.equal(insideRes.isInTarget, true);
    assert.ok(insideRes.score >= 90);

    // 2. Off target: F1 too high (480Hz instead of 280Hz)
    const offRes = evaluateVowelFormants('/iː/', 480, 2250);
    assert.equal(offRes.isInTarget, false);
    assert.ok(offRes.advice.includes('Nâng quai hàm'));
  });

  test('GET /api/v1/ai/vowel-space/targets and POST /api/v1/ai/vowel-space/evaluate APIs', async () => {
    const listRes = await fetch(`${BASE_URL}/api/v1/ai/vowel-space/targets`);
    assert.equal(listRes.status, 200);
    const listData = await listRes.json();
    assert.equal(listData.targets.length, 12);

    const evalRes = await fetch(`${BASE_URL}/api/v1/ai/vowel-space/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'test_vowel_user', targetSymbol: '/æ/', userF1: 760, userF2: 1680 })
    });
    assert.equal(evalRes.status, 200);
    const evalData = await evalRes.json();
    assert.equal(evalData.success, true);
    assert.equal(evalData.isInTarget, true);
  });

});

describe('ADV-104: AI Phonetics Coach Long-Term Context Memory Tests', () => {

  test('getOrCreateCoachMemoryProfile returns 30-day memory profile with mastered and struggling phonemes', () => {
    const profile = getOrCreateCoachMemoryProfile('learner_test');
    assert.equal(profile.userId, 'learner_test');
    assert.equal(profile.masteredCount, 28);
    assert.equal(profile.totalPhonemes, 44);
    assert.ok(profile.strugglingPhonemes.length >= 3);
    assert.equal(profile.sparkline7Days.length, 7);
  });

  test('generateCoachResponse answers comparison questions with memory and Vietnamese L1 biomechanics', () => {
    // Query about /t/ compared to yesterday
    const res = generateCoachResponse('Hôm nay em phát âm âm /t/ đã đỡ hơn chưa cô?');
    assert.ok(res.responseText.includes('So với hôm qua'));
    assert.ok(res.responseText.includes('75%'));
    assert.ok(res.articulatoryTip);
    assert.ok(res.articulatoryTip.biomechanics.includes('tiếng Việt'));
    assert.ok(res.tokens.length > 5);
  });

  test('GET /api/v1/ai/coach/memory-profile and POST /api/v1/ai/coach/chat-stream APIs', async () => {
    const testUserId = `test_coach_${Date.now()}`;

    // 1. Profile
    const profRes = await fetch(`${BASE_URL}/api/v1/ai/coach/memory-profile/${testUserId}`);
    assert.equal(profRes.status, 200);
    const profData = await profRes.json();
    assert.equal(profData.success, true);
    assert.equal(profData.profile.masteredCount, 28);

    // 2. Chat Stream
    const chatRes = await fetch(`${BASE_URL}/api/v1/ai/coach/chat-stream`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: testUserId, prompt: "Cô ơi từ 'thought' đặt lưỡi thế nào?" })
    });
    assert.equal(chatRes.status, 200);
    const chatData = await chatRes.json();
    assert.equal(chatData.success, true);
    assert.ok(chatData.responseText.includes('/θ/'));
    assert.ok(chatData.articulatoryTip);
  });

});
