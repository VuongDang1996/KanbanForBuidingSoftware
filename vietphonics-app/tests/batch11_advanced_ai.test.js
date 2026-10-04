import { test, describe, before, after } from 'node:test';
import assert from 'node:assert';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  CONNECTED_SPEECH_DRILLS,
  evaluateConnectedSpeechFlow
} from '../src/lib/audio/connectedSpeechEngine.js';
import {
  SEMANTIC_RISK_DICTIONARY,
  VIRTUAL_LISTENERS,
  evaluateIntelligibility
} from '../src/lib/ai/intelligibilityEngine.js';
import {
  VOICE_JOURNAL_PROMPTS,
  evaluateSpontaneousJournalEntry
} from '../src/lib/audio/voiceJournalEngine.js';
import {
  TARGET_DIALECTS,
  ACCENT_CONTRAST_WORDS,
  evaluateDialectProximity
} from '../src/lib/audio/accentExplorerEngine.js';

let server;
const TEST_PORT = 3891;
const BASE_URL = `http://127.0.0.1:${TEST_PORT}`;

before(async () => {
  await new Promise((resolve) => {
    server = app.listen(TEST_PORT, () => resolve());
  });
});

after(async () => {
  await new Promise((resolve) => {
    server.close(() => resolve());
  });
});

describe('ADV-105: Connected Speech Lab Tests', () => {
  test('evaluateConnectedSpeechFlow calculates flow score and detects smooth linking vs L1 staccato', () => {
    // 1. Smooth linking test (pause 40ms)
    const smoothRes = evaluateConnectedSpeechFlow('cs_hold_on', [
      { fromWord: 'Hold', toWord: 'on', measuredPauseMs: 35 },
      { fromWord: 'on', toWord: 'a', measuredPauseMs: 45 }
    ]);
    assert.strictEqual(smoothRes.drillId, 'cs_hold_on');
    assert.ok(smoothRes.flowScore >= 90, 'Smooth linking should score >= 90');
    assert.strictEqual(smoothRes.staccatoCount, 0, 'No staccato detected in smooth speech');
    assert.strictEqual(smoothRes.isMastered, true);

    // 2. Staccato pause test (pause 150ms > 120ms)
    const staccatoRes = evaluateConnectedSpeechFlow('cs_hold_on', [
      { fromWord: 'Hold', toWord: 'on', measuredPauseMs: 150 },
      { fromWord: 'on', toWord: 'a', measuredPauseMs: 45 }
    ]);
    assert.strictEqual(staccatoRes.staccatoCount, 1, 'Should flag 1 staccato boundary');
    assert.ok(staccatoRes.evaluatedPairs[0].l1Warning.includes('Lỗi ngắt từ'));
  });

  test('GET /api/v1/ai/connected-speech/sentences and POST evaluate API endpoints', async () => {
    // 1. GET sentences catalog
    const catRes = await fetch(`${BASE_URL}/api/v1/ai/connected-speech/sentences`);
    const catJson = await catRes.json();
    assert.strictEqual(catJson.success, true);
    assert.ok(catJson.drills.length >= 4);

    // 2. POST evaluate
    const evalRes = await fetch(`${BASE_URL}/api/v1/ai/connected-speech/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-user-id': 'usr_test_cs' },
      body: JSON.stringify({
        drillId: 'cs_turn_it_off',
        measuredBoundaries: [
          { fromWord: 'Turn', toWord: 'it', measuredPauseMs: 40 },
          { fromWord: 'it', toWord: 'off', measuredPauseMs: 40 }
        ]
      })
    });
    const evalJson = await evalRes.json();
    assert.strictEqual(evalJson.success, true);
    assert.ok(evalJson.recordId.startsWith('cs_'));
    assert.ok(evalJson.flowScore > 0);

    // 3. Verify SQLite persistence
    const saved = db.prepare('SELECT * FROM connected_speech_records WHERE id = ?').get(evalJson.recordId);
    assert.ok(saved, 'Record should exist in SQLite');
    assert.strictEqual(saved.user_id, 'usr_test_cs');

    // 4. GET history
    const histRes = await fetch(`${BASE_URL}/api/v1/ai/connected-speech/history/usr_test_cs`);
    const histJson = await histRes.json();
    assert.strictEqual(histJson.success, true);
    assert.ok(histJson.history.length >= 1);
  });
});

describe('ADV-106: Intelligibility Score & Multi-ASR Listener Panel Tests', () => {
  test('evaluateIntelligibility evaluates global score and detects high semantic risk confusion pairs', () => {
    // 1. Clean speech
    const cleanRes = evaluateIntelligibility({
      spokenText: 'Six months ago she baked fresh bread.',
      mispronouncedWords: []
    });
    assert.strictEqual(cleanRes.globalIntelligibility, 100);
    assert.strictEqual(cleanRes.hasHighRiskAlert, false);
    assert.strictEqual(cleanRes.listenerScores.length, 3);

    // 2. Sensitive risk word mispronounced: "sheet" -> confused with "shit"
    const riskRes = evaluateIntelligibility({
      spokenText: 'She washed the bed sheet on the beach.',
      mispronouncedWords: ['sheet']
    });
    assert.ok(riskRes.globalIntelligibility < 100);
    assert.strictEqual(riskRes.hasHighRiskAlert, true, 'Should trigger high semantic risk alert');
    const sheetRisk = riskRes.semanticRisks.find((r) => r.targetWord === 'sheet');
    assert.ok(sheetRisk);
    assert.strictEqual(sheetRisk.confusedWith, 'shit');
    assert.strictEqual(sheetRisk.severity, 'high');
  });

  test('GET semantic-risk-pairs and POST evaluate APIs with persistence', async () => {
    // 1. GET risk pairs
    const pairsRes = await fetch(`${BASE_URL}/api/v1/ai/intelligibility/semantic-risk-pairs`);
    const pairsJson = await pairsRes.json();
    assert.strictEqual(pairsJson.success, true);
    assert.ok(pairsJson.riskDictionary.length >= 5);
    assert.strictEqual(pairsJson.listeners.length, 3);

    // 2. POST evaluate
    const evalRes = await fetch(`${BASE_URL}/api/v1/ai/intelligibility/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-user-id': 'usr_test_intel' },
      body: JSON.stringify({
        spokenText: 'She washed the bed sheet on the beach',
        mispronouncedWords: ['sheet']
      })
    });
    const evalJson = await evalRes.json();
    assert.strictEqual(evalJson.success, true);
    assert.ok(evalJson.recordId.startsWith('intel_'));
    assert.strictEqual(evalJson.hasHighRiskAlert, true);

    // 3. Verify SQLite persistence
    const saved = db.prepare('SELECT * FROM intelligibility_evaluations WHERE id = ?').get(evalJson.recordId);
    assert.ok(saved);
    assert.strictEqual(saved.has_high_risk, 1);

    // 4. GET history
    const histRes = await fetch(`${BASE_URL}/api/v1/ai/intelligibility/history/usr_test_intel`);
    const histJson = await histRes.json();
    assert.strictEqual(histJson.success, true);
    assert.ok(histJson.history.length >= 1);
  });
});

describe('ADV-107: Spontaneous Speech Voice Journal Tests', () => {
  test('evaluateSpontaneousJournalEntry calculates WPM, word alignment and Transfer Gap', () => {
    const raw = 'Yesterday I went to the park and saw a really cute dog ờ and then we played football.';
    const res = evaluateSpontaneousJournalEntry({
      promptId: 'vj_p1',
      rawTranscript: raw,
      durationSeconds: 30,
      baselineReadAloudScore: 88
    });

    assert.strictEqual(res.promptId, 'vj_p1');
    assert.ok(res.wpm > 0);
    assert.ok(res.alignedWords.length >= 15);
    assert.strictEqual(res.detectedFillersCount, 1, 'Should detect Vietnamese filler "ờ"');
    assert.strictEqual(res.detectedFillers[0].word, 'ờ');
    assert.ok(typeof res.transferGap === 'number');
    assert.ok(res.transferGapPercentageText.includes('%'));
  });

  test('GET prompts and POST voice-journal/entry APIs with persistence', async () => {
    // 1. GET prompts
    const pRes = await fetch(`${BASE_URL}/api/v1/ai/voice-journal/prompts`);
    const pJson = await pRes.json();
    assert.strictEqual(pJson.success, true);
    assert.ok(pJson.prompts.length >= 3);

    // 2. POST entry
    const entryRes = await fetch(`${BASE_URL}/api/v1/ai/voice-journal/entry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-user-id': 'usr_test_vj' },
      body: JSON.stringify({
        promptId: 'vj_p1',
        rawTranscript: 'Last weekend I had a great trip with my family.',
        durationSeconds: 40,
        baselineReadAloudScore: 85
      })
    });
    const entryJson = await entryRes.json();
    assert.strictEqual(entryJson.success, true);
    assert.ok(entryJson.recordId.startsWith('vj_'));
    assert.ok(entryJson.alignedWords.length >= 8);

    // 3. Verify SQLite persistence
    const saved = db.prepare('SELECT * FROM voice_journal_entries WHERE id = ?').get(entryJson.recordId);
    assert.ok(saved);
    assert.strictEqual(saved.prompt_id, 'vj_p1');

    // 4. GET history
    const histRes = await fetch(`${BASE_URL}/api/v1/ai/voice-journal/history/usr_test_vj`);
    const histJson = await histRes.json();
    assert.strictEqual(histJson.success, true);
    assert.ok(histJson.history.length >= 1);
  });
});

describe('ADV-108: Accent Explorer & Target Dialect Selector Tests', () => {
  test('evaluateDialectProximity evaluates US, UK, and AU phonetic criteria', () => {
    // 1. General American (US)
    const usEval = evaluateDialectProximity('us', { rhoticStrength: 0.9, flapTAccuracy: 0.85 });
    assert.strictEqual(usEval.selectedDialect.code, 'us');
    assert.strictEqual(usEval.selectedDialect.hotkey, '1');
    assert.ok(usEval.proximityPercent >= 80);

    // 2. British RP (UK)
    const ukEval = evaluateDialectProximity('uk', { rhoticStrength: 0.1, broadVowelAccuracy: 0.9 });
    assert.strictEqual(ukEval.selectedDialect.code, 'uk');
    assert.strictEqual(ukEval.selectedDialect.hotkey, '2');
    assert.ok(ukEval.proximityPercent >= 80);

    // 3. Australian English (AU)
    const auEval = evaluateDialectProximity('au');
    assert.strictEqual(auEval.selectedDialect.code, 'au');
    assert.strictEqual(auEval.selectedDialect.hotkey, '3');
  });

  test('GET dialects and POST select-target APIs with persistence', async () => {
    // 1. GET dialects catalog
    const dRes = await fetch(`${BASE_URL}/api/v1/ai/accent-explorer/dialects`);
    const dJson = await dRes.json();
    assert.strictEqual(dJson.success, true);
    assert.strictEqual(dJson.dialects.length, 3);
    assert.ok(dJson.contrastWords.length >= 5);

    // 2. POST select-target
    const selRes = await fetch(`${BASE_URL}/api/v1/ai/accent-explorer/select-target`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-user-id': 'usr_test_accent' },
      body: JSON.stringify({
        dialectCode: 'uk',
        userTelemetry: { rhoticStrength: 0.15, broadVowelAccuracy: 0.88 }
      })
    });
    const selJson = await selRes.json();
    assert.strictEqual(selJson.success, true);
    assert.strictEqual(selJson.dialectCode, 'uk');

    // 3. Verify SQLite persistence and retrieval via GET user-target
    const userTargetRes = await fetch(`${BASE_URL}/api/v1/ai/accent-explorer/user-target/usr_test_accent`);
    const userTargetJson = await userTargetRes.json();
    assert.strictEqual(userTargetJson.success, true);
    assert.strictEqual(userTargetJson.selectedDialectCode, 'uk');
    assert.ok(userTargetJson.proximityScore > 0);
  });
});
