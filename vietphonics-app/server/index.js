import express from 'express';
import cors from 'cors';
import { db, initAppDatabase } from './db.js';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json({ limit: '15mb' }));

// Initialize SQLite database
initAppDatabase();

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'vietphonics-api',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

/**
 * ELSA-102: L1 Regional Dialect Profile Endpoints
 */

// GET dialect profile for active user
app.get('/api/v1/user/dialect-profile', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    let profile = db.prepare('SELECT * FROM user_profiles WHERE user_id = ?').get(userId);
    
    if (!profile) {
      const now = new Date().toISOString();
      db.prepare(`
        INSERT INTO user_profiles (id, user_id, dialect, calibration_mode, confidence_score, ielts_target, overall_gop, created_at, updated_at)
        VALUES (?, ?, 'bac', 'manual_selection', 0.92, 7.5, 76, ?, ?)
      `).run(`prof-${Date.now()}`, userId, now, now);
      profile = db.prepare('SELECT * FROM user_profiles WHERE user_id = ?').get(userId);
    }

    const weightRow = db.prepare('SELECT * FROM dialect_penalty_weights WHERE dialect = ?').get(profile.dialect);
    const weights = weightRow ? JSON.parse(weightRow.weights_json) : null;

    res.json({
      success: true,
      profile: {
        userId: profile.user_id,
        dialect: profile.dialect,
        calibrationMode: profile.calibration_mode,
        confidenceScore: profile.confidence_score,
        ieltsTarget: profile.ielts_target,
        overallGop: profile.overall_gop,
        updatedAt: profile.updated_at
      },
      weightsConfig: {
        dialect: profile.dialect,
        name: weightRow?.name,
        description: weightRow?.description,
        weights
      }
    });
  } catch (err) {
    console.error('Error in GET dialect-profile:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST update dialect profile
app.post('/api/v1/user/dialect-profile', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    const { region, calibrationMode = 'manual_selection', confidenceScore = 0.92 } = req.body;

    if (!['bac', 'trung', 'nam'].includes(region)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid region. Must be one of: "bac", "trung", "nam"'
      });
    }

    const now = new Date().toISOString();
    db.prepare(`
      INSERT INTO user_profiles (id, user_id, dialect, calibration_mode, confidence_score, ielts_target, overall_gop, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 7.5, 76, ?, ?)
      ON CONFLICT(user_id) DO UPDATE SET
        dialect = excluded.dialect,
        calibration_mode = excluded.calibration_mode,
        confidence_score = excluded.confidence_score,
        updated_at = excluded.updated_at
    `).run(`prof-${Date.now()}`, userId, region, calibrationMode, confidenceScore, now, now);

    const updatedProfile = db.prepare('SELECT * FROM user_profiles WHERE user_id = ?').get(userId);
    const weightRow = db.prepare('SELECT * FROM dialect_penalty_weights WHERE dialect = ?').get(region);
    const weights = weightRow ? JSON.parse(weightRow.weights_json) : null;

    res.json({
      success: true,
      message: `Profile updated to dialect: ${region}`,
      profile: updatedProfile,
      weightsConfig: {
        dialect: region,
        name: weightRow?.name,
        weights
      }
    });
  } catch (err) {
    console.error('Error in POST dialect-profile:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST audio calibration: auto-detect regional dialect from calibration sentence
// Test sentence: "Look at the little light shining at night"
app.post('/api/v1/user/dialect-audio-calibrate', (req, res) => {
  try {
    const { sentence, audioEnergyMetrics, features = {} } = req.body;
    
    // Acoustic heuristics based on Vietnamese phonetic dialect markers:
    // Northern: L/N confusion markers or flat F0 tonal dispersion
    // Southern: V/J merger or final -t/-k glottal closure
    // Central: Strong F0 downward pitch depression and tense vowels
    let detectedRegion = 'bac';
    let confidence = 0.91;
    let rationale = 'Phát hiện thói quen mở khẩu hình dẹt nguyên âm /æ/ và phân tách nhẹ âm /l/-/n/ đặc trưng giọng Bắc Bộ.';

    if (features.f0Variance !== undefined && features.f0Variance > 0.8) {
      detectedRegion = 'trung';
      confidence = 0.89;
      rationale = 'Phát hiện biên độ dao động F0 sâu và trường độ nguyên âm ngắn đặc thù miền Trung (Huế - Nghệ Tĩnh).';
    } else if (features.glottalStopDetected || (features.finalConsonantRelease && features.finalConsonantRelease < 0.4)) {
      detectedRegion = 'nam';
      confidence = 0.93;
      rationale = 'Phát hiện xu hướng ngắt âm tắt thanh hầu đuôi /t/-/k/ và ngữ điệu mềm mại tự nhiên miền Nam.';
    } else {
      detectedRegion = 'bac';
      confidence = 0.92;
      rationale = 'Phát hiện vector F1-F2 phân tách âm /l/-/n/ với độ mở nguyên âm chuẩn Hà Nội & Bắc Bộ (>88% confidence).';
    }

    res.json({
      success: true,
      calibrationSentence: sentence || 'Look at the little light shining at night',
      detectedDialect: detectedRegion,
      confidenceScore: confidence,
      confidencePercentage: Math.round(confidence * 100),
      rationale,
      recommendedCurriculum: {
        bac: 'Khắc phục bẫy âm L/N và cặp âm /d/-/z/ cho người miền Bắc',
        trung: 'Khắc phục bẫy thanh điệu và mở rộng vòm họng nguyên âm đôi cho người miền Trung',
        nam: 'Khắc phục nuốt phụ âm đuôi /k/, /t/ và bẫy âm /v/-/j/ cho người miền Nam'
      }[detectedRegion]
    });
  } catch (err) {
    console.error('Error in audio calibration:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * ELSA-103: Predicted IELTS & CEFR Speaking Band Estimator Endpoints
 */
import { calculateIeltsBand, computeTargetGap } from '../src/lib/scoring/ieltsMapping.js';

// GET current IELTS estimate and 4 criteria radar
app.get('/api/v1/user/ielts-estimate', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    const profile = db.prepare('SELECT * FROM user_profiles WHERE user_id = ?').get(userId);
    
    const targetBand = profile?.ielts_target || 7.5;
    const overallGop = profile?.overall_gop || 76;

    // Estimate IELTS based on current profile metrics
    const estimate = calculateIeltsBand({
      pronunciationAcc: overallGop,
      fluencyWpm: 135,
      intonationScore: 71,
      lexicalGrammarEstimate: 75
    });

    const gapInfo = computeTargetGap(estimate.overallBand, targetBand, estimate.criteria);

    res.json({
      success: true,
      userId,
      targetBand,
      estimate,
      gapInfo
    });
  } catch (err) {
    console.error('Error in GET ielts-estimate:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST update IELTS target band
app.post('/api/v1/user/ielts-target', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    const { targetBand } = req.body;

    const numBand = Number(targetBand);
    if (!numBand || numBand < 4.0 || numBand > 9.0) {
      return res.status(400).json({
        success: false,
        error: 'Target band must be a number between 4.0 and 9.0'
      });
    }

    const now = new Date().toISOString();
    db.prepare(`
      UPDATE user_profiles SET ielts_target = ?, updated_at = ? WHERE user_id = ?
    `).run(numBand, now, userId);

    const profile = db.prepare('SELECT * FROM user_profiles WHERE user_id = ?').get(userId);
    const estimate = calculateIeltsBand({
      pronunciationAcc: profile?.overall_gop || 76,
      fluencyWpm: 135,
      intonationScore: 71,
      lexicalGrammarEstimate: 75
    });
    const gapInfo = computeTargetGap(estimate.overallBand, numBand, estimate.criteria);

    res.json({
      success: true,
      message: `Updated target IELTS band to ${numBand}`,
      targetBand: numBand,
      gapInfo
    });
  } catch (err) {
    console.error('Error in POST ielts-target:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * USER-102: Granular Phoneme Mastery Ledger - 44 IPA Matrix Grid Endpoints
 */
import { IPA_PHONEMES, getPhonemeTier, summarizePhonemes } from '../src/lib/phonemes/ipaData.js';

// GET all 44 phonemes and user mastery ledger
app.get('/api/v1/user/phonemes', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';

    // Query existing mastery records
    let rows = db.prepare('SELECT * FROM user_phoneme_mastery WHERE user_id = ?').all(userId);

    // If user has no rows yet, seed default 44 phonemes
    if (!rows || rows.length === 0) {
      const now = new Date().toISOString();
      const insertStmt = db.prepare(`
        INSERT INTO user_phoneme_mastery (id, user_id, phoneme, score, attempts, last_practiced_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      for (const p of IPA_PHONEMES) {
        insertStmt.run(
          `pm-${p.symbol}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          userId,
          p.symbol,
          p.defaultScore,
          1,
          now
        );
      }
      rows = db.prepare('SELECT * FROM user_phoneme_mastery WHERE user_id = ?').all(userId);
    }

    const scoreMap = new Map();
    for (const r of rows) {
      scoreMap.set(r.phoneme, { score: r.score, attempts: r.attempts, lastPracticedAt: r.last_practiced_at });
    }

    // Build enriched list of 44 phonemes
    const enrichedPhonemes = IPA_PHONEMES.map(meta => {
      const userRecord = scoreMap.get(meta.symbol) || { score: meta.defaultScore, attempts: 0, lastPracticedAt: null };
      const tierInfo = getPhonemeTier(userRecord.score);
      return {
        symbol: meta.symbol,
        category: meta.category,
        categoryVi: meta.categoryVi,
        name: meta.name,
        score: userRecord.score,
        attempts: userRecord.attempts,
        lastPracticedAt: userRecord.lastPracticedAt,
        examples: meta.examples,
        tips: meta.tips,
        tier: tierInfo.tier,
        label: tierInfo.label,
        badgeColor: tierInfo.badgeColor,
        bgClass: tierInfo.bgClass,
        isWarning: tierInfo.isWarning
      };
    });

    const summary = summarizePhonemes(enrichedPhonemes);

    const categories = {
      monophthongs: enrichedPhonemes.filter(p => p.category === 'monophthong'),
      diphthongs: enrichedPhonemes.filter(p => p.category === 'diphthong'),
      consonants: enrichedPhonemes.filter(p => p.category === 'consonant')
    };

    res.json({
      success: true,
      userId,
      summary,
      counts: {
        total: enrichedPhonemes.length,
        monophthongs: categories.monophthongs.length,
        diphthongs: categories.diphthongs.length,
        consonants: categories.consonants.length
      },
      categories,
      phonemes: enrichedPhonemes
    });
  } catch (err) {
    console.error('Error in GET phonemes:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST update or practice a phoneme score
app.post('/api/v1/user/phonemes/score', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    const { phoneme, score } = req.body;

    if (!phoneme || typeof phoneme !== 'string') {
      return res.status(400).json({ success: false, error: 'Phoneme symbol is required' });
    }

    const numScore = Number(score);
    if (isNaN(numScore) || numScore < 0 || numScore > 100) {
      return res.status(400).json({ success: false, error: 'Score must be a number between 0 and 100' });
    }

    const now = new Date().toISOString();
    const id = `pm-${phoneme}-${Date.now()}`;

    db.prepare(`
      INSERT INTO user_phoneme_mastery (id, user_id, phoneme, score, attempts, last_practiced_at)
      VALUES (?, ?, ?, ?, 1, ?)
      ON CONFLICT(user_id, phoneme) DO UPDATE SET
        score = excluded.score,
        attempts = attempts + 1,
        last_practiced_at = excluded.last_practiced_at
    `).run(id, userId, phoneme, Math.round(numScore), now);

    const updated = db.prepare('SELECT * FROM user_phoneme_mastery WHERE user_id = ? AND phoneme = ?').get(userId, phoneme);
    const tierInfo = getPhonemeTier(updated.score);

    res.json({
      success: true,
      message: `Updated score for phoneme /${phoneme}/ to ${updated.score}%`,
      phoneme: {
        symbol: updated.phoneme,
        score: updated.score,
        attempts: updated.attempts,
        lastPracticedAt: updated.last_practiced_at,
        tier: tierInfo.tier,
        label: tierInfo.label
      }
    });
  } catch (err) {
    console.error('Error in POST phonemes/score:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * VN-102: Vietnamese L1 3-Minute Diagnostic Pronunciation Screener Endpoints
 */
import { DIAGNOSTIC_12_SENTENCES, generateDiagnosticReport } from '../src/lib/diagnostic/screenerSentences.js';

// GET the 12 diagnostic sentences
app.get('/api/v1/diagnostic/sentences', (req, res) => {
  res.json({
    success: true,
    totalCount: DIAGNOSTIC_12_SENTENCES.length,
    sentences: DIAGNOSTIC_12_SENTENCES
  });
});

// POST submit screener answers, synthesize report, update baseline
app.post('/api/v1/diagnostic/screener-submit', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const { answers = [] } = req.body;

    const report = generateDiagnosticReport(answers);
    const now = new Date().toISOString();
    const screenerId = `scr-${Date.now()}`;

    // Save to diagnostic_screeners
    db.prepare(`
      INSERT INTO diagnostic_screeners (id, user_id, answers_json, report_json, created_at)
      VALUES (?, ?, ?, ?, ?)
    `).run(screenerId, userId, JSON.stringify(answers), JSON.stringify(report), now);

    // Update user profile baseline overall_gop
    db.prepare(`
      UPDATE user_profiles SET overall_gop = ?, updated_at = ? WHERE user_id = ?
    `).run(report.overallScore, now, userId);

    res.json({
      success: true,
      message: 'Diagnostic screener submitted and baseline updated',
      screenerId,
      userId,
      report
    });
  } catch (err) {
    console.error('Error in screener-submit:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET latest screener report for user
app.get('/api/v1/diagnostic/screener-latest', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    const row = db.prepare('SELECT * FROM diagnostic_screeners WHERE user_id = ? ORDER BY created_at DESC LIMIT 1').get(userId);

    if (!row) {
      return res.json({ success: true, report: null });
    }

    res.json({
      success: true,
      screenerId: row.id,
      answers: JSON.parse(row.answers_json),
      report: JSON.parse(row.report_json),
      createdAt: row.created_at
    });
  } catch (err) {
    console.error('Error in screener-latest:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * ELSA-201: Real-Time Phoneme Error Heatmap with Forced Alignment Endpoints
 */
import { alignSentencePhonemes } from '../src/lib/scoring/phonemeAlignment.js';

// POST evaluate audio / sentence with CTC forced alignment & GOP scoring
app.post('/api/v1/scoring/phoneme-alignment', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const { sentence, customScores = {} } = req.body;

    if (!sentence || typeof sentence !== 'string' || !sentence.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: sentence (must be non-empty string)'
      });
    }

    const alignmentResult = alignSentencePhonemes(sentence, customScores);
    const now = new Date().toISOString();
    const recordId = `ali-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    // Persist alignment record in SQLite
    db.prepare(`
      INSERT INTO phoneme_alignment_records (id, user_id, sentence_text, overall_gop, words_count, alignment_data_json, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      recordId,
      userId,
      sentence.trim(),
      alignmentResult.overallGop,
      alignmentResult.wordsCount,
      JSON.stringify(alignmentResult),
      now
    );

    // Sync phoneme scores into user_phoneme_mastery (Gate H - Progress)
    const updateMasteryStmt = db.prepare(`
      INSERT INTO user_phoneme_mastery (id, user_id, phoneme, score, attempts, last_practiced_at)
      VALUES (?, ?, ?, ?, 1, ?)
      ON CONFLICT(user_id, phoneme) DO UPDATE SET
        score = ROUND((user_phoneme_mastery.score * user_phoneme_mastery.attempts + excluded.score) / (user_phoneme_mastery.attempts + 1)),
        attempts = user_phoneme_mastery.attempts + 1,
        last_practiced_at = excluded.last_practiced_at
    `);

    alignmentResult.words.forEach(w => {
      w.phonemes.forEach(p => {
        const id = `pm-${p.symbol}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
        updateMasteryStmt.run(id, userId, p.symbol, p.score, now);
      });
    });

    res.json({
      success: true,
      alignmentId: recordId,
      userId,
      sentence: alignmentResult.sentence,
      overallGop: alignmentResult.overallGop,
      wordsCount: alignmentResult.wordsCount,
      phonemesCount: alignmentResult.phonemesCount,
      words: alignmentResult.words,
      createdAt: now
    });
  } catch (err) {
    console.error('Error in POST phoneme-alignment:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET latest alignment record for user
app.get('/api/v1/scoring/phoneme-alignment/latest', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    const row = db.prepare('SELECT * FROM phoneme_alignment_records WHERE user_id = ? ORDER BY created_at DESC LIMIT 1').get(userId);

    if (!row) {
      return res.json({ success: true, record: null });
    }

    res.json({
      success: true,
      alignmentId: row.id,
      userId: row.user_id,
      sentence: row.sentence_text,
      overallGop: row.overall_gop,
      wordsCount: row.words_count,
      alignment: JSON.parse(row.alignment_data_json),
      createdAt: row.created_at
    });
  } catch (err) {
    console.error('Error in GET phoneme-alignment/latest:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * ELSA-204: Speech Fluency, Natural Pauses & Filler Word Monitor Endpoints
 */
import { analyzeFluency } from '../src/lib/scoring/fluencyAnalysis.js';

// POST evaluate speech fluency metrics & timeline
app.post('/api/v1/scoring/fluency-analysis', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const { sentence, totalDurationSec = 5.6, customSegments, detectedFillers } = req.body;

    if (!sentence || typeof sentence !== 'string' || !sentence.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: sentence (must be non-empty string)'
      });
    }

    const result = analyzeFluency({
      sentence,
      totalDurationSec,
      customSegments,
      detectedFillers
    });

    const now = new Date().toISOString();
    const recordId = `flu-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    // Persist fluency analysis in SQLite
    db.prepare(`
      INSERT INTO fluency_analysis_records (
        id, user_id, sentence_text, wpm, tempo_category, pause_ratio,
        fillers_count, hesitations_count, timeline_json, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      recordId,
      userId,
      sentence.trim(),
      result.wpm,
      result.tempoCategory,
      result.pauseRatio,
      result.fillersCount,
      result.awkwardPausesCount,
      JSON.stringify(result),
      now
    );

    res.json({
      success: true,
      fluencyId: recordId,
      userId,
      fluency: result,
      createdAt: now
    });
  } catch (err) {
    console.error('Error in POST fluency-analysis:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET latest fluency analysis record for user
app.get('/api/v1/scoring/fluency-analysis/latest', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    const row = db.prepare('SELECT * FROM fluency_analysis_records WHERE user_id = ? ORDER BY created_at DESC LIMIT 1').get(userId);

    if (!row) {
      return res.json({ success: true, fluency: null });
    }

    res.json({
      success: true,
      fluencyId: row.id,
      userId: row.user_id,
      sentence: row.sentence_text,
      wpm: row.wpm,
      tempoCategory: row.tempo_category,
      pauseRatio: row.pause_ratio,
      fillersCount: row.fillers_count,
      hesitationsCount: row.hesitations_count,
      fluency: JSON.parse(row.timeline_json),
      createdAt: row.created_at
    });
  } catch (err) {
    console.error('Error in GET fluency-analysis/latest:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * VN-101: Final Consonant Sound Ending Burst Analyzer Endpoints
 */
import { analyzeEndingSoundBurst } from '../src/lib/audio/burstAnalysis.js';

// POST evaluate ending sound transient burst energy
app.post('/api/v1/acoustic/ending-burst', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const { word, userBurstRatio } = req.body;

    if (!word || typeof word !== 'string' || !word.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: word (must be non-empty string)'
      });
    }

    const result = analyzeEndingSoundBurst(word.trim(), typeof userBurstRatio === 'number' ? userBurstRatio : null);
    const now = new Date().toISOString();
    const recordId = `brs-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    // Persist burst evaluation in SQLite
    db.prepare(`
      INSERT INTO ending_burst_records (
        id, user_id, word, target_phoneme, burst_ratio, is_released, zcr, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      recordId,
      userId,
      result.word,
      result.targetPhoneme,
      result.userBurstRatio,
      result.isReleased ? 1 : 0,
      result.userZcr,
      now
    );

    res.json({
      success: true,
      burstId: recordId,
      userId,
      evaluation: result,
      createdAt: now
    });
  } catch (err) {
    console.error('Error in POST ending-burst:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET latest ending burst record for user
app.get('/api/v1/acoustic/ending-burst/latest', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    const row = db.prepare('SELECT * FROM ending_burst_records WHERE user_id = ? ORDER BY created_at DESC LIMIT 1').get(userId);

    if (!row) {
      return res.json({ success: true, burst: null });
    }

    res.json({
      success: true,
      burstId: row.id,
      userId: row.user_id,
      word: row.word,
      targetPhoneme: row.target_phoneme,
      burstRatio: row.burst_ratio,
      isReleased: Boolean(row.is_released),
      zcr: row.zcr,
      createdAt: row.created_at
    });
  } catch (err) {
    console.error('Error in GET ending-burst/latest:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * ELSA-202: Syllable Stress & Word Emphasis Evaluator Endpoints
 */
import { evaluateSyllableStress } from '../src/lib/scoring/syllableStress.js';

// POST evaluate syllable stress performance
app.post('/api/v1/scoring/syllable-stress', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const {
      word,
      userStressIndex,
      userStressedDurationMs,
      userStressedPitchHz,
      userStressedVolumeDb
    } = req.body;

    if (!word || typeof word !== 'string' || !word.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: word (must be non-empty string)'
      });
    }

    const result = evaluateSyllableStress({
      word: word.trim(),
      userStressIndex: typeof userStressIndex === 'number' ? userStressIndex : undefined,
      userStressedDurationMs: typeof userStressedDurationMs === 'number' ? userStressedDurationMs : undefined,
      userStressedPitchHz: typeof userStressedPitchHz === 'number' ? userStressedPitchHz : undefined,
      userStressedVolumeDb: typeof userStressedVolumeDb === 'number' ? userStressedVolumeDb : undefined
    });

    const now = new Date().toISOString();
    const recordId = `str-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    // Persist stress evaluation in SQLite
    db.prepare(`
      INSERT INTO syllable_stress_records (
        id, user_id, word, target_syllable, score, is_correct, l1_tone_trap, metrics_json, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      recordId,
      userId,
      result.word,
      result.targetSyllable,
      result.score,
      result.isCorrect ? 1 : 0,
      result.l1ToneTrap ? 1 : 0,
      JSON.stringify(result),
      now
    );

    res.json({
      success: true,
      stressId: recordId,
      userId,
      evaluation: result,
      createdAt: now
    });
  } catch (err) {
    console.error('Error in POST syllable-stress:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET latest syllable stress record for user
app.get('/api/v1/scoring/syllable-stress/latest', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    const row = db.prepare('SELECT * FROM syllable_stress_records WHERE user_id = ? ORDER BY created_at DESC LIMIT 1').get(userId);

    if (!row) {
      return res.json({ success: true, stress: null });
    }

    res.json({
      success: true,
      stressId: row.id,
      userId: row.user_id,
      word: row.word,
      targetSyllable: row.target_syllable,
      score: row.score,
      isCorrect: Boolean(row.is_correct),
      l1ToneTrap: Boolean(row.l1_tone_trap),
      evaluation: JSON.parse(row.metrics_json),
      createdAt: row.created_at
    });
  } catch (err) {
    console.error('Error in GET syllable-stress/latest:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * ELSA-203: Suprasegmental Pitch & Sentence Intonation Melody Tracker Endpoints
 */
import { analyzePitchContour, SENTENCE_PITCH_BENCHMARKS } from '../src/lib/scoring/pitchContour.js';

// GET available benchmark sentences for intonation practice
app.get('/api/v1/scoring/pitch-contour/benchmarks', (req, res) => {
  try {
    const list = Object.values(SENTENCE_PITCH_BENCHMARKS).map(b => ({
      id: b.id,
      text: b.text,
      type: b.type,
      targetTerminalTone: b.targetTerminalTone,
      pedagogicalTip: b.pedagogicalTip
    }));
    res.json({ success: true, benchmarks: list });
  } catch (err) {
    console.error('Error in GET pitch-contour/benchmarks:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST evaluate pitch contour against benchmark
app.post('/api/v1/scoring/pitch-contour', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const { sentenceId, userPitchTrack, simulatedTone } = req.body;

    if (!sentenceId || typeof sentenceId !== 'string' || !sentenceId.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: sentenceId'
      });
    }

    const evaluation = analyzePitchContour(sentenceId, userPitchTrack, simulatedTone);
    const now = new Date().toISOString();
    const recordId = `pit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    // Persist intonation contour record in SQLite
    db.prepare(`
      INSERT INTO pitch_contour_records (
        id, user_id, sentence_id, sentence_text, sentence_type,
        target_terminal_tone, user_terminal_tone, terminal_delta_semitones,
        melody_similarity_score, is_terminal_correct, user_median_f0,
        native_contour_json, user_contour_json, feedback_vietnamese, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      recordId,
      userId,
      evaluation.sentenceId,
      evaluation.sentenceText,
      evaluation.sentenceType,
      evaluation.targetTerminalTone,
      evaluation.userTerminalTone,
      evaluation.terminalDeltaSemitones,
      evaluation.melodySimilarityScore,
      evaluation.isTerminalCorrect ? 1 : 0,
      evaluation.userMedianF0,
      JSON.stringify(evaluation.nativePoints),
      JSON.stringify(evaluation.userPoints),
      evaluation.feedback,
      now
    );

    res.json({
      success: true,
      contourId: recordId,
      userId,
      evaluation,
      createdAt: now
    });
  } catch (err) {
    console.error('Error in POST pitch-contour:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET latest pitch contour record for user
app.get('/api/v1/scoring/pitch-contour/latest', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    const row = db.prepare('SELECT * FROM pitch_contour_records WHERE user_id = ? ORDER BY created_at DESC LIMIT 1').get(userId);

    if (!row) {
      return res.json({ success: true, contour: null });
    }

    res.json({
      success: true,
      contourId: row.id,
      userId: row.user_id,
      sentenceId: row.sentence_id,
      sentenceText: row.sentence_text,
      sentenceType: row.sentence_type,
      targetTerminalTone: row.target_terminal_tone,
      userTerminalTone: row.user_terminal_tone,
      terminalDeltaSemitones: row.terminal_delta_semitones,
      melodySimilarityScore: row.melody_similarity_score,
      isTerminalCorrect: Boolean(row.is_terminal_correct),
      userMedianF0: row.user_median_f0,
      nativePoints: JSON.parse(row.native_contour_json),
      userPoints: JSON.parse(row.user_contour_json),
      feedback: row.feedback_vietnamese,
      createdAt: row.created_at
    });
  } catch (err) {
    console.error('Error in GET pitch-contour/latest:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * VN-103: Syllable Stress vs. Tone Mark Visualizer & Schwa Demotion Endpoints
 */
import { analyzeWordSchwa, SCHWA_BENCHMARK_WORDS } from '../src/lib/scoring/schwaDemotion.js';

// GET benchmark words for schwa training
app.get('/api/v1/pedagogy/schwa-words', (req, res) => {
  try {
    const words = Object.values(SCHWA_BENCHMARK_WORDS).map(w => ({
      word: w.word,
      ipa: w.ipa,
      syllables: w.syllables,
      schwaIndex: w.schwaIndex,
      vietnameseToneTrap: w.vietnameseToneTrap,
      pedagogicalAdvice: w.pedagogicalAdvice
    }));
    res.json({ success: true, words });
  } catch (err) {
    console.error('Error in GET schwa-words:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST evaluate schwa demotion on word
app.post('/api/v1/pedagogy/schwa-check', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const { word, customAudioMetrics, simulateL1Trap } = req.body;

    if (!word || typeof word !== 'string' || !word.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: word (must be non-empty string)'
      });
    }

    const evaluationResult = analyzeWordSchwa(word.trim(), customAudioMetrics, simulateL1Trap);
    const now = new Date().toISOString();
    const recordId = `scw-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    // Persist schwa check record in SQLite
    db.prepare(`
      INSERT INTO schwa_demotion_records (
        id, user_id, word, schwa_position, duration_ms, f1_hz, f2_hz,
        neutral_distance, is_demoted, l1_full_vowel_trap, score, feedback_vietnamese, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      recordId,
      userId,
      evaluationResult.word,
      evaluationResult.schwaIndex,
      evaluationResult.evaluation.durationMs,
      evaluationResult.evaluation.f1,
      evaluationResult.evaluation.f2,
      evaluationResult.evaluation.neutralDistance,
      evaluationResult.evaluation.isDemoted ? 1 : 0,
      evaluationResult.evaluation.l1FullVowelTrap ? 1 : 0,
      evaluationResult.evaluation.score,
      evaluationResult.feedback,
      now
    );

    res.json({
      success: true,
      checkId: recordId,
      userId,
      evaluation: evaluationResult,
      createdAt: now
    });
  } catch (err) {
    console.error('Error in POST schwa-check:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET latest schwa check record for user
app.get('/api/v1/pedagogy/schwa-check/latest', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    const row = db.prepare('SELECT * FROM schwa_demotion_records WHERE user_id = ? ORDER BY created_at DESC LIMIT 1').get(userId);

    if (!row) {
      return res.json({ success: true, check: null });
    }

    res.json({
      success: true,
      checkId: row.id,
      userId: row.user_id,
      word: row.word,
      schwaPosition: row.schwa_position,
      durationMs: row.duration_ms,
      f1: row.f1_hz,
      f2: row.f2_hz,
      neutralDistance: row.neutral_distance,
      isDemoted: Boolean(row.is_demoted),
      l1FullVowelTrap: Boolean(row.l1_full_vowel_trap),
      score: row.score,
      feedback: row.feedback_vietnamese,
      createdAt: row.created_at
    });
  } catch (err) {
    console.error('Error in GET schwa-check/latest:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * ELSA-205: Minimal Pair Auditory Discrimination Quizzes Endpoints
 */
import { MINIMAL_PAIRS_CATALOG, generateQuizQuestion, evaluateQuizAnswer } from '../src/lib/scoring/minimalPairs.js';

// GET all available minimal pairs categories
app.get('/api/v1/pedagogy/minimal-pairs', (req, res) => {
  try {
    const list = Object.values(MINIMAL_PAIRS_CATALOG);
    res.json({ success: true, pairs: list });
  } catch (err) {
    console.error('Error in GET minimal-pairs:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET generate random question for pair
app.get('/api/v1/pedagogy/minimal-pairs/question', (req, res) => {
  try {
    const pairId = req.query.pairId || 'pair_theta_t';
    const question = generateQuizQuestion(pairId);
    res.json({ success: true, question });
  } catch (err) {
    console.error('Error in GET minimal-pairs/question:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST submit quiz answer
app.post('/api/v1/pedagogy/minimal-pairs/submit', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const { pairId, targetWord, selectedWord, reactionTimeMs = 1200, currentStreak = 0 } = req.body;

    if (!pairId || !targetWord || !selectedWord) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: pairId, targetWord, selectedWord'
      });
    }

    const pair = MINIMAL_PAIRS_CATALOG[pairId] || MINIMAL_PAIRS_CATALOG.pair_theta_t;
    const result = evaluateQuizAnswer(pairId, targetWord, selectedWord, reactionTimeMs, currentStreak);
    const now = new Date().toISOString();
    const recordId = `mpq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    // Persist quiz record in SQLite
    db.prepare(`
      INSERT INTO minimal_pair_quiz_records (
        id, user_id, pair_id, target_phoneme_a, target_phoneme_b,
        target_word, selected_word, is_correct, reaction_time_ms,
        streak_count, xp_awarded, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      recordId,
      userId,
      pairId,
      pair.phonemeA,
      pair.phonemeB,
      targetWord,
      selectedWord,
      result.isCorrect ? 1 : 0,
      reactionTimeMs,
      result.newStreak,
      result.xpAwarded,
      now
    );

    res.json({
      success: true,
      recordId,
      userId,
      result,
      createdAt: now
    });
  } catch (err) {
    console.error('Error in POST minimal-pairs/submit:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET latest minimal pair quiz record for user
app.get('/api/v1/pedagogy/minimal-pairs/latest', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    const row = db.prepare('SELECT * FROM minimal_pair_quiz_records WHERE user_id = ? ORDER BY created_at DESC LIMIT 1').get(userId);

    if (!row) {
      return res.json({ success: true, record: null });
    }

    res.json({
      success: true,
      recordId: row.id,
      userId: row.user_id,
      pairId: row.pair_id,
      targetPhonemeA: row.target_phoneme_a,
      targetPhonemeB: row.target_phoneme_b,
      targetWord: row.target_word,
      selectedWord: row.selected_word,
      isCorrect: Boolean(row.is_correct),
      reactionTimeMs: row.reaction_time_ms,
      streakCount: row.streak_count,
      xpAwarded: row.xp_awarded,
      createdAt: row.created_at
    });
  } catch (err) {
    console.error('Error in GET minimal-pairs/latest:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * PRON-201: Interactive 2D Anatomical Lip & Tongue Articulation Guide Endpoints
 */
import { PHONEME_ANATOMY_CATALOG } from '../src/lib/anatomy/phonemeAnatomyData.js';

// GET all anatomy phoneme profiles
app.get('/api/v1/anatomy/phonemes', (req, res) => {
  try {
    const list = Object.values(PHONEME_ANATOMY_CATALOG);
    res.json({ success: true, phonemes: list });
  } catch (err) {
    console.error('Error in GET anatomy/phonemes:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST save user anatomy slider calibration
app.post('/api/v1/anatomy/calibration', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const { phoneme, tongueElevation, jawDrop, airPressure, isGhostCompared = false } = req.body;

    if (!phoneme || tongueElevation === undefined || jawDrop === undefined || airPressure === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: phoneme, tongueElevation, jawDrop, airPressure'
      });
    }

    const now = new Date().toISOString();
    const recordId = `ant-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    // Persist calibration record in SQLite
    db.prepare(`
      INSERT INTO anatomy_calibration_records (
        id, user_id, phoneme, tongue_elevation, jaw_drop,
        air_pressure, is_ghost_compared, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      recordId,
      userId,
      phoneme,
      tongueElevation,
      jawDrop,
      airPressure,
      isGhostCompared ? 1 : 0,
      now
    );

    res.json({
      success: true,
      recordId,
      userId,
      phoneme,
      calibration: {
        tongueElevation,
        jawDrop,
        airPressure,
        isGhostCompared: Boolean(isGhostCompared)
      },
      createdAt: now
    });
  } catch (err) {
    console.error('Error in POST anatomy/calibration:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET latest calibration for user
app.get('/api/v1/anatomy/calibration/latest', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    const row = db.prepare('SELECT * FROM anatomy_calibration_records WHERE user_id = ? ORDER BY created_at DESC LIMIT 1').get(userId);

    if (!row) {
      return res.json({ success: true, calibration: null });
    }

    res.json({
      success: true,
      recordId: row.id,
      userId: row.user_id,
      phoneme: row.phoneme,
      tongueElevation: row.tongue_elevation,
      jawDrop: row.jaw_drop,
      airPressure: row.air_pressure,
      isGhostCompared: Boolean(row.is_ghost_compared),
      createdAt: row.created_at
    });
  } catch (err) {
    console.error('Error in GET anatomy/calibration/latest:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * PRON-202: Phonemic Audio Dictation & Gap-Fill Exercises Endpoints
 */
import { DICTATION_EXERCISES, evaluateDictationSubmission } from '../src/lib/scoring/audioDictation.js';

// GET all available dictation exercises
app.get('/api/v1/practice/dictation-exercises', (req, res) => {
  try {
    const list = Object.values(DICTATION_EXERCISES);
    res.json({ success: true, exercises: list });
  } catch (err) {
    console.error('Error in GET dictation-exercises:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST submit dictation answers & calculate score (AC 4)
app.post('/api/v1/practice/dictation-submit', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const { exerciseId, userAnswers = {} } = req.body;

    if (!exerciseId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: exerciseId'
      });
    }

    const evaluation = evaluateDictationSubmission(exerciseId, userAnswers);
    const now = new Date().toISOString();
    const recordId = `dic-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    // Persist dictation record in SQLite
    db.prepare(`
      INSERT INTO dictation_exercise_records (
        id, user_id, exercise_id, sentence_text, user_answers_json,
        is_all_correct, correct_gaps_count, total_gaps_count, score, xp_awarded, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      recordId,
      userId,
      exerciseId,
      evaluation.sentenceText,
      JSON.stringify(userAnswers),
      evaluation.isAllCorrect ? 1 : 0,
      evaluation.correctCount,
      evaluation.totalGaps,
      evaluation.score,
      evaluation.xpAwarded,
      now
    );

    res.json({
      success: true,
      recordId,
      userId,
      evaluation,
      createdAt: now
    });
  } catch (err) {
    console.error('Error in POST dictation-submit:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET latest dictation submission for user
app.get('/api/v1/practice/dictation/latest', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    const row = db.prepare('SELECT * FROM dictation_exercise_records WHERE user_id = ? ORDER BY created_at DESC LIMIT 1').get(userId);

    if (!row) {
      return res.json({ success: true, submission: null });
    }

    res.json({
      success: true,
      recordId: row.id,
      userId: row.user_id,
      exerciseId: row.exercise_id,
      sentenceText: row.sentence_text,
      userAnswers: JSON.parse(row.user_answers_json),
      isAllCorrect: Boolean(row.is_all_correct),
      correctGapsCount: row.correct_gaps_count,
      totalGapsCount: row.total_gaps_count,
      score: row.score,
      xpAwarded: row.xp_awarded,
      createdAt: row.created_at
    });
  } catch (err) {
    console.error('Error in GET dictation/latest:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * PRON-203: Targeted Sound Read-Aloud & Contextual Fluency Drills Endpoints
 */
import {
  TARGET_SATURATED_SENTENCES,
  evaluateTargetDrill
} from '../src/lib/scoring/targetSentenceDrill.js';

// GET all target sound saturated drill sentences (AC 1)
app.get('/api/v1/practice/target-drill/sentences', (req, res) => {
  try {
    const sentences = Object.values(TARGET_SATURATED_SENTENCES);
    res.json({ success: true, sentences });
  } catch (err) {
    console.error('Error in GET target-drill/sentences:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST evaluate speech against target sound saturation (AC 2, 3, Gate D)
app.post('/api/v1/scoring/targeted-sound', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const { sentenceId, userWordPerformances = {} } = req.body;

    if (!sentenceId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: sentenceId'
      });
    }

    const evaluation = evaluateTargetDrill(sentenceId, userWordPerformances);
    const now = new Date().toISOString();
    const recordId = `tsd-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    // Persist in SQLite
    db.prepare(`
      INSERT INTO target_sound_drill_records (
        id, user_id, sentence_id, target_phoneme, sentence_text,
        total_occurrences, correct_occurrences, accuracy_percent,
        words_breakdown_json, detected_substitutions_json, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      recordId,
      userId,
      sentenceId,
      evaluation.targetPhoneme,
      evaluation.text,
      evaluation.totalOccurrences,
      evaluation.correctOccurrences,
      evaluation.accuracyPercent,
      JSON.stringify(evaluation.breakdown),
      JSON.stringify(evaluation.substitutions),
      now
    );

    res.json({
      success: true,
      recordId,
      userId,
      evaluation,
      createdAt: now
    });
  } catch (err) {
    console.error('Error in POST scoring/targeted-sound:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET latest target sound drill evaluation for user
app.get('/api/v1/scoring/targeted-sound/latest', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    const row = db.prepare('SELECT * FROM target_sound_drill_records WHERE user_id = ? ORDER BY created_at DESC LIMIT 1').get(userId);

    if (!row) {
      return res.json({ success: true, drill: null });
    }

    res.json({
      success: true,
      recordId: row.id,
      userId: row.user_id,
      sentenceId: row.sentence_id,
      targetPhoneme: row.target_phoneme,
      sentenceText: row.sentence_text,
      totalOccurrences: row.total_occurrences,
      correctOccurrences: row.correct_occurrences,
      accuracyPercent: row.accuracy_percent,
      breakdown: JSON.parse(row.words_breakdown_json),
      substitutions: JSON.parse(row.detected_substitutions_json || '[]'),
      createdAt: row.created_at
    });
  } catch (err) {
    console.error('Error in GET scoring/targeted-sound/latest:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * PRON-204: Dual-Track Audio Recording & Native Speaker Waveform Comparison Endpoints
 */
import {
  DUAL_TRACK_BENCHMARKS,
  compareDualTrackWaveforms
} from '../src/lib/audio/dualTrackWaveform.js';

// GET all dual-track benchmark targets (AC 1)
app.get('/api/v1/acoustic/dual-track/targets', (req, res) => {
  try {
    const list = Object.values(DUAL_TRACK_BENCHMARKS);
    res.json({ success: true, targets: list });
  } catch (err) {
    console.error('Error in GET dual-track/targets:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST compare user audio waveform against native track (AC 2, AC 3, Gate D)
app.post('/api/v1/acoustic/dual-track/compare', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const { word, userDurationMs = 460, userPeaks = null } = req.body;

    if (!word || typeof word !== 'string' || !word.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: word'
      });
    }

    const comparison = compareDualTrackWaveforms(word.trim().toLowerCase(), userDurationMs, userPeaks);
    const now = new Date().toISOString();
    const recordId = `dtw-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    // Persist in SQLite
    db.prepare(`
      INSERT INTO dual_track_recording_records (
        id, user_id, word, native_duration_ms, user_duration_ms,
        duration_difference_ms, vowel_nucleus_ms, correlation_score,
        duration_warning, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      recordId,
      userId,
      comparison.word,
      comparison.nativeDurationMs,
      comparison.userDurationMs,
      comparison.durationDiff,
      comparison.nativeVowelNucleusMs,
      comparison.correlationScore,
      comparison.durationWarning,
      now
    );

    res.json({
      success: true,
      recordId,
      userId,
      comparison,
      createdAt: now
    });
  } catch (err) {
    console.error('Error in POST dual-track/compare:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET latest dual-track comparison record for user
app.get('/api/v1/acoustic/dual-track/latest', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    const row = db.prepare('SELECT * FROM dual_track_recording_records WHERE user_id = ? ORDER BY created_at DESC LIMIT 1').get(userId);

    if (!row) {
      return res.json({ success: true, comparison: null });
    }

    res.json({
      success: true,
      recordId: row.id,
      userId: row.user_id,
      word: row.word,
      nativeDurationMs: row.native_duration_ms,
      userDurationMs: row.user_duration_ms,
      durationDifferenceMs: row.duration_difference_ms,
      vowelNucleusMs: row.vowel_nucleus_ms,
      correlationScore: row.correlation_score,
      durationWarning: row.duration_warning,
      createdAt: row.created_at
    });
  } catch (err) {
    console.error('Error in GET dual-track/latest:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * PRON-205: 3-Tier Positional Phoneme Ladder Endpoints
 */
import {
  POSITIONAL_LADDER_CATALOG,
  calculateTierStars,
  evaluateLadderProgression
} from '../src/lib/scoring/positionalLadder.js';

// GET all positional ladder phoneme profiles (AC 1 & AC 2)
app.get('/api/v1/practice/positional-ladder/catalog', (req, res) => {
  try {
    const catalog = Object.values(POSITIONAL_LADDER_CATALOG);
    res.json({ success: true, catalog });
  } catch (err) {
    console.error('Error in GET positional-ladder/catalog:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST submit score for a specific tier & update unlock state (AC 1, AC 4, Gate D)
app.post('/api/v1/practice/positional-ladder/submit', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const { phoneme, tier, word, score = 0 } = req.body;

    if (!phoneme || tier === undefined || !word) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: phoneme, tier, or word'
      });
    }

    const tierNumber = Number(tier);
    const numericScore = Number(score);
    const stars = calculateTierStars(numericScore);
    const tierLabels = { 1: 'Initial (Đầu)', 2: 'Medial (Giữa)', 3: 'Final (Cuối)' };
    const tierLabel = tierLabels[tierNumber] || `Tier ${tierNumber}`;
    const now = new Date().toISOString();
    const recordId = `pos-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    // Persist in SQLite
    db.prepare(`
      INSERT INTO positional_ladder_records (
        id, user_id, phoneme, tier, tier_label, word, score,
        stars, is_unlocked, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      recordId,
      userId,
      phoneme,
      tierNumber,
      tierLabel,
      word,
      numericScore,
      stars,
      1,
      now
    );

    // Calculate progression across tiers for this phoneme
    const recentRecords = db.prepare(`
      SELECT tier, MAX(score) as max_score FROM positional_ladder_records
      WHERE user_id = ? AND phoneme = ?
      GROUP BY tier
    `).all(userId, phoneme);

    let t1Max = 0, t2Max = 0, t3Max = 0;
    recentRecords.forEach(r => {
      if (r.tier === 1) t1Max = r.max_score;
      if (r.tier === 2) t2Max = r.max_score;
      if (r.tier === 3) t3Max = r.max_score;
    });

    const progression = evaluateLadderProgression(t1Max, t2Max, t3Max);

    res.json({
      success: true,
      recordId,
      userId,
      phoneme,
      tier: tierNumber,
      word,
      score: numericScore,
      stars,
      progression,
      createdAt: now
    });
  } catch (err) {
    console.error('Error in POST positional-ladder/submit:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET user status & progression for a phoneme
app.get('/api/v1/practice/positional-ladder/status', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    const phoneme = req.query.phoneme || '/z/';

    const records = db.prepare(`
      SELECT tier, MAX(score) as max_score FROM positional_ladder_records
      WHERE user_id = ? AND phoneme = ?
      GROUP BY tier
    `).all(userId, phoneme);

    let t1Max = 85, t2Max = 75, t3Max = 0; // sensible defaults for demo
    records.forEach(r => {
      if (r.tier === 1) t1Max = r.max_score;
      if (r.tier === 2) t2Max = r.max_score;
      if (r.tier === 3) t3Max = r.max_score;
    });

    const progression = evaluateLadderProgression(t1Max, t2Max, t3Max);
    res.json({
      success: true,
      userId,
      phoneme,
      progression
    });
  } catch (err) {
    console.error('Error in GET positional-ladder/status:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * PRON-206: Connected Speech Positional Progression Endpoints
 */
import {
  CONNECTED_PROGRESSIONS,
  evaluateProgressionStep
} from '../src/lib/scoring/connectedProgression.js';

// GET all progression tracks (AC 1 & AC 2)
app.get('/api/v1/practice/progression/catalog', (req, res) => {
  try {
    const catalog = Object.values(CONNECTED_PROGRESSIONS);
    res.json({ success: true, catalog });
  } catch (err) {
    console.error('Error in GET progression/catalog:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST evaluate progression step and detect degradation (AC 1, AC 3, AC 4, Gate D)
app.post('/api/v1/practice/progression-tier', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const { progressionId, stepIndex, score = 85, baselineScore = null } = req.body;

    if (!progressionId || stepIndex === undefined || stepIndex === null) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: progressionId or stepIndex'
      });
    }

    const evaluation = evaluateProgressionStep({
      progressionId,
      stepIndex: Number(stepIndex),
      score: Number(score),
      baselineScore: baselineScore !== null ? Number(baselineScore) : null
    });

    const now = new Date().toISOString();
    const recordId = `csp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    // Persist in SQLite
    db.prepare(`
      INSERT INTO connected_progression_records (
        id, user_id, progression_id, target_phoneme, step_index,
        step_type, text_prompt, score, baseline_score, has_degradation, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      recordId,
      userId,
      progressionId,
      evaluation.targetPhoneme,
      evaluation.stepIndex,
      evaluation.stepType,
      evaluation.text,
      evaluation.score,
      baselineScore !== null ? Number(baselineScore) : null,
      evaluation.hasDegradation ? 1 : 0,
      now
    );

    res.json({
      success: true,
      recordId,
      userId,
      evaluation,
      createdAt: now
    });
  } catch (err) {
    console.error('Error in POST progression-tier:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET latest progression submission for user
app.get('/api/v1/practice/progression/latest', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    const row = db.prepare('SELECT * FROM connected_progression_records WHERE user_id = ? ORDER BY created_at DESC LIMIT 1').get(userId);

    if (!row) {
      return res.json({ success: true, record: null });
    }

    res.json({
      success: true,
      recordId: row.id,
      userId: row.user_id,
      progressionId: row.progression_id,
      targetPhoneme: row.target_phoneme,
      stepIndex: row.step_index,
      stepType: row.step_type,
      textPrompt: row.text_prompt,
      score: row.score,
      baselineScore: row.baseline_score,
      hasDegradation: Boolean(row.has_degradation),
      createdAt: row.created_at
    });
  } catch (err) {
    console.error('Error in GET progression/latest:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * PRON-207: Phonetic Exception Words & Grammatical Voicing Alternations Endpoints
 */
import {
  VOICING_RULE_CATALOG,
  evaluateVoicingCheck
} from '../src/lib/scoring/voicingRules.js';

// GET all voicing rule categories and mnemonics (AC 1 & AC 3)
app.get('/api/v1/grammar/voicing-rules/catalog', (req, res) => {
  try {
    const catalog = Object.values(VOICING_RULE_CATALOG);
    res.json({ success: true, catalog });
  } catch (err) {
    console.error('Error in GET voicing-rules/catalog:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST validate voicing classification submissions (AC 2, AC 4, Gate D)
app.post('/api/v1/grammar/voicing-check', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const { category = 's_es_endings', submissions = [] } = req.body;

    if (!category || !Array.isArray(submissions) || submissions.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: category and non-empty submissions array'
      });
    }

    const evaluation = evaluateVoicingCheck(category, submissions);
    const now = new Date().toISOString();
    const recordId = `vce-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    // Persist in SQLite
    db.prepare(`
      INSERT INTO grammatical_voicing_records (
        id, user_id, category, total_words, correct_count, score, results_json, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      recordId,
      userId,
      category,
      evaluation.totalWords,
      evaluation.correctCount,
      evaluation.score,
      JSON.stringify(evaluation.results),
      now
    );

    res.json({
      success: true,
      recordId,
      userId,
      evaluation,
      createdAt: now
    });
  } catch (err) {
    console.error('Error in POST voicing-check:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET latest voicing check record for user
app.get('/api/v1/grammar/voicing-check/latest', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    const row = db.prepare('SELECT * FROM grammatical_voicing_records WHERE user_id = ? ORDER BY created_at DESC LIMIT 1').get(userId);

    if (!row) {
      return res.json({ success: true, record: null });
    }

    res.json({
      success: true,
      recordId: row.id,
      userId: row.user_id,
      category: row.category,
      totalWords: row.total_words,
      correctCount: row.correct_count,
      score: row.score,
      results: JSON.parse(row.results_json),
      createdAt: row.created_at
    });
  } catch (err) {
    console.error('Error in GET voicing-check/latest:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * PRON-208: L1 Confusion-Trap Cross-Transition Drills Endpoints
 */
import {
  CONFUSION_TRAP_DRILLS,
  evaluateConfusionTrap
} from '../src/lib/scoring/crossTransition.js';

// GET all confusion trap drills (AC 1)
app.get('/api/v1/practice/confusion-trap/drills', (req, res) => {
  try {
    const drills = Object.values(CONFUSION_TRAP_DRILLS);
    res.json({ success: true, drills });
  } catch (err) {
    console.error('Error in GET confusion-trap/drills:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST evaluate speech for assimilation and agility score (AC 2, AC 4, Gate D)
app.post('/api/v1/practice/confusion-trap', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const { trapId, detectedWordPhonemes = {} } = req.body;

    if (!trapId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: trapId'
      });
    }

    const evaluation = evaluateConfusionTrap(trapId, detectedWordPhonemes);
    const now = new Date().toISOString();
    const recordId = `ctd-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    // Persist in SQLite
    db.prepare(`
      INSERT INTO cross_transition_drill_records (
        id, user_id, trap_id, phoneme_a, phoneme_b, sentence_text,
        agility_score, transition_matrix_json, detected_assimilations_json, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      recordId,
      userId,
      trapId,
      evaluation.phonemeA,
      evaluation.phonemeB,
      evaluation.sentence,
      evaluation.agilityScore,
      JSON.stringify(evaluation.matrix),
      JSON.stringify(evaluation.assimilations),
      now
    );

    res.json({
      success: true,
      recordId,
      userId,
      evaluation,
      createdAt: now
    });
  } catch (err) {
    console.error('Error in POST confusion-trap:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET latest cross-transition drill result for user
app.get('/api/v1/practice/confusion-trap/latest', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    const row = db.prepare('SELECT * FROM cross_transition_drill_records WHERE user_id = ? ORDER BY created_at DESC LIMIT 1').get(userId);

    if (!row) {
      return res.json({ success: true, drill: null });
    }

    res.json({
      success: true,
      recordId: row.id,
      userId: row.user_id,
      trapId: row.trap_id,
      phonemeA: row.phoneme_a,
      phonemeB: row.phoneme_b,
      sentenceText: row.sentence_text,
      agilityScore: row.agility_score,
      matrix: JSON.parse(row.transition_matrix_json),
      assimilations: JSON.parse(row.detected_assimilations_json || '[]'),
      createdAt: row.created_at
    });
  } catch (err) {
    console.error('Error in GET confusion-trap/latest:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start listening only if run directly as main entrypoint
const isMain = process.argv[1] && (process.argv[1].includes('server/index.js') || process.argv[1].includes('server\\index.js'));
if (isMain && process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[VietPhonics API] Server listening on port ${PORT}`);
  });
}

export default app;
