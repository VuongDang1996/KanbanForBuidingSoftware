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

/**
 * PRON-209: Numbered Target Phoneme System & Multi-Spelling Sound Maps Endpoints
 */
import {
  getSpellingMapCatalog,
  getSpellingMapByPhoneme,
  evaluateSpellingQuiz
} from '../src/lib/scoring/spellingMaps.js';

// GET all multi-spelling sound maps
app.get('/api/v1/phonetics/spelling-maps', (req, res) => {
  try {
    const catalog = getSpellingMapCatalog();
    res.json({ success: true, count: catalog.length, maps: catalog });
  } catch (err) {
    console.error('Error in GET spelling-maps:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET specific phoneme spelling map
app.get('/api/v1/phonetics/spelling-maps/:phonemeId', (req, res) => {
  try {
    const map = getSpellingMapByPhoneme(req.params.phonemeId);
    if (!map) {
      return res.status(404).json({ success: false, error: `Spelling map not found for ${req.params.phonemeId}` });
    }
    res.json({ success: true, map });
  } catch (err) {
    console.error('Error in GET spelling-maps/:phonemeId:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST evaluate spelling quiz answers and persist to SQLite
app.post('/api/v1/phonetics/spelling-quiz', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const { phonemeId, answers } = req.body;

    if (!phonemeId || typeof phonemeId !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Missing or invalid required field: phonemeId'
      });
    }

    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: answers (must be non-empty array)'
      });
    }

    const evaluation = evaluateSpellingQuiz(phonemeId, answers);
    if (!evaluation.success) {
      return res.status(400).json(evaluation);
    }

    const now = new Date().toISOString();
    const recordId = `spm-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    db.prepare(`
      INSERT INTO spelling_map_quiz_records (
        id, user_id, phoneme_id, symbol, score, total_questions, correct_count, passed, results_json, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      recordId,
      userId,
      evaluation.phonemeId,
      evaluation.symbol,
      evaluation.scorePercent,
      evaluation.totalQuestions,
      evaluation.correctCount,
      evaluation.passed ? 1 : 0,
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
    console.error('Error in POST spelling-quiz:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET latest spelling quiz record for user
app.get('/api/v1/phonetics/spelling-quiz/latest', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    const row = db.prepare('SELECT * FROM spelling_map_quiz_records WHERE user_id = ? ORDER BY created_at DESC LIMIT 1').get(userId);

    if (!row) {
      return res.json({ success: true, quiz: null });
    }

    res.json({
      success: true,
      recordId: row.id,
      userId: row.user_id,
      phonemeId: row.phoneme_id,
      symbol: row.symbol,
      score: row.score,
      totalQuestions: row.total_questions,
      correctCount: row.correct_count,
      passed: Boolean(row.passed),
      results: JSON.parse(row.results_json),
      createdAt: row.created_at
    });
  } catch (err) {
    console.error('Error in GET spelling-quiz/latest:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * PRON-210: Video-Synchronized Masterclass & Exaggerated Articulation Modeling Endpoints
 */
import {
  getMasterclassCatalog,
  getMasterclassLesson,
  evaluateMasterclassSession
} from '../src/lib/scoring/videoMasterclass.js';

// GET all masterclass lessons
app.get('/api/v1/masterclass/videos', (req, res) => {
  try {
    const catalog = getMasterclassCatalog();
    res.json({ success: true, count: catalog.length, lessons: catalog });
  } catch (err) {
    console.error('Error in GET masterclass/videos:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET specific masterclass lesson
app.get('/api/v1/masterclass/videos/:lessonId', (req, res) => {
  try {
    const lesson = getMasterclassLesson(req.params.lessonId);
    if (!lesson) {
      return res.status(404).json({ success: false, error: `Lesson not found for ${req.params.lessonId}` });
    }
    res.json({ success: true, lesson });
  } catch (err) {
    console.error('Error in GET masterclass/videos/:lessonId:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST save user masterclass watch progress & completion
app.post('/api/v1/masterclass/progress', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const { lessonId, watchDurationSec, cameraAngle, playbackRate, loopEnabled } = req.body;

    if (!lessonId || typeof lessonId !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Missing or invalid required field: lessonId'
      });
    }

    if (watchDurationSec === undefined || watchDurationSec === null || typeof watchDurationSec !== 'number') {
      return res.status(400).json({
        success: false,
        error: 'Missing or invalid required field: watchDurationSec (number)'
      });
    }

    const evaluation = evaluateMasterclassSession({
      lessonId,
      watchDurationSec,
      cameraAngle: cameraAngle || 'frontal',
      playbackRate: typeof playbackRate === 'number' ? playbackRate : 1.0,
      loopEnabled: Boolean(loopEnabled)
    });

    if (!evaluation.success) {
      return res.status(400).json(evaluation);
    }

    const now = new Date().toISOString();
    const recordId = `mcp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    db.prepare(`
      INSERT INTO masterclass_progress_records (
        id, user_id, lesson_id, phoneme, camera_angle, playback_rate, loop_enabled,
        watch_duration_sec, completion_percentage, is_completed, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      recordId,
      userId,
      evaluation.lessonId,
      evaluation.phoneme,
      evaluation.cameraAngle,
      evaluation.playbackRate,
      evaluation.loopEnabled ? 1 : 0,
      evaluation.watchDurationSec,
      evaluation.completionPercentage,
      evaluation.isCompleted ? 1 : 0,
      now
    );

    res.json({
      success: true,
      recordId,
      userId,
      progress: evaluation,
      createdAt: now
    });
  } catch (err) {
    console.error('Error in POST masterclass/progress:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET latest masterclass progress record for user
app.get('/api/v1/masterclass/progress/latest', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    const row = db.prepare('SELECT * FROM masterclass_progress_records WHERE user_id = ? ORDER BY created_at DESC LIMIT 1').get(userId);

    if (!row) {
      return res.json({ success: true, progress: null });
    }

    res.json({
      success: true,
      recordId: row.id,
      userId: row.user_id,
      lessonId: row.lesson_id,
      phoneme: row.phoneme,
      cameraAngle: row.camera_angle,
      playbackRate: row.playback_rate,
      loopEnabled: Boolean(row.loop_enabled),
      watchDurationSec: row.watch_duration_sec,
      completionPercentage: row.completion_percentage,
      isCompleted: Boolean(row.is_completed),
      createdAt: row.created_at
    });
  } catch (err) {
    console.error('Error in GET masterclass/progress/latest:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * PRON-211: Dense Target Sound Saturation Sentences Endpoints
 */
import {
  getSaturationSentences,
  getSaturationSentence,
  evaluateSaturationSpeech
} from '../src/lib/scoring/soundSaturation.js';

// GET all saturation sentences
app.get('/api/v1/practice/saturation/sentences', (req, res) => {
  try {
    const sentences = getSaturationSentences();
    res.json({ success: true, count: sentences.length, sentences });
  } catch (err) {
    console.error('Error in GET saturation/sentences:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET specific saturation sentence
app.get('/api/v1/practice/saturation/sentences/:id', (req, res) => {
  try {
    const sentence = getSaturationSentence(req.params.id);
    if (!sentence) {
      return res.status(404).json({ success: false, error: `Sentence not found for ${req.params.id}` });
    }
    res.json({ success: true, sentence });
  } catch (err) {
    console.error('Error in GET saturation/sentences/:id:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST evaluate saturation sentence reading and persist to SQLite
app.post('/api/v1/scoring/saturation-sentence', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const { sentenceId, correctOccurrences, detectedSubstitutions } = req.body;

    if (!sentenceId || typeof sentenceId !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Missing or invalid required field: sentenceId'
      });
    }

    const evaluation = evaluateSaturationSpeech({
      sentenceId,
      correctOccurrences: typeof correctOccurrences === 'number' ? correctOccurrences : null,
      detectedSubstitutions: Array.isArray(detectedSubstitutions) ? detectedSubstitutions : []
    });

    if (!evaluation.success) {
      return res.status(400).json(evaluation);
    }

    const now = new Date().toISOString();
    const recordId = `sat-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    db.prepare(`
      INSERT INTO sound_saturation_records (
        id, user_id, sentence_id, target_phoneme, total_occurrences, correct_occurrences,
        accuracy_percentage, saturation_meter_level, is_mastered, detected_traps_json, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      recordId,
      userId,
      evaluation.sentenceId,
      evaluation.targetPhoneme,
      evaluation.totalOccurrences,
      evaluation.correctOccurrences,
      evaluation.accuracyPercent,
      evaluation.saturationMeterLevel,
      evaluation.isMastered ? 1 : 0,
      JSON.stringify(evaluation.detectedTraps),
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
    console.error('Error in POST saturation-sentence:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET latest saturation sentence record for user
app.get('/api/v1/scoring/saturation-sentence/latest', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    const row = db.prepare('SELECT * FROM sound_saturation_records WHERE user_id = ? ORDER BY created_at DESC LIMIT 1').get(userId);

    if (!row) {
      return res.json({ success: true, drill: null });
    }

    res.json({
      success: true,
      recordId: row.id,
      userId: row.user_id,
      sentenceId: row.sentence_id,
      targetPhoneme: row.target_phoneme,
      totalOccurrences: row.total_occurrences,
      correctOccurrences: row.correct_occurrences,
      accuracyPercentage: row.accuracy_percentage,
      saturationMeterLevel: row.saturation_meter_level,
      isMastered: Boolean(row.is_mastered),
      detectedTraps: JSON.parse(row.detected_traps_json || '[]'),
      createdAt: row.created_at
    });
  } catch (err) {
    console.error('Error in GET saturation-sentence/latest:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * VN-105: Vietnamese Native-Tongue Mouth & Tongue Placement Guides Endpoints
 */
import {
  getPlacementGuidesCatalog,
  getPlacementGuideByPhoneme,
  evaluatePlacementFeedback
} from '../src/lib/scoring/nativePlacement.js';

// GET all native placement guides
app.get('/api/v1/pedagogy/placement-guides', (req, res) => {
  try {
    const guides = getPlacementGuidesCatalog();
    res.json({ success: true, count: guides.length, guides });
  } catch (err) {
    console.error('Error in GET placement-guides:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET specific placement guide by phoneme
app.get('/api/v1/pedagogy/placement-guides/:phoneme', (req, res) => {
  try {
    const guide = getPlacementGuideByPhoneme(req.params.phoneme);
    if (!guide) {
      return res.status(404).json({ success: false, error: `Placement guide not found for ${req.params.phoneme}` });
    }
    res.json({ success: true, guide });
  } catch (err) {
    console.error('Error in GET placement-guides/:phoneme:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST save user feedback on placement guide helpfulness and persist to SQLite
app.post('/api/v1/pedagogy/placement-feedback', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const { phoneme, rating, feedbackNote } = req.body;

    if (!phoneme || typeof phoneme !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Missing or invalid required field: phoneme'
      });
    }

    const evaluation = evaluatePlacementFeedback({
      phoneme,
      rating: typeof rating === 'number' ? rating : 5,
      feedbackNote: typeof feedbackNote === 'string' ? feedbackNote : ''
    });

    if (!evaluation.success) {
      return res.status(400).json(evaluation);
    }

    const now = new Date().toISOString();
    const recordId = `plf-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    db.prepare(`
      INSERT INTO native_placement_feedback_records (
        id, user_id, guide_id, phoneme, rating, is_helpful, feedback_note, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      recordId,
      userId,
      evaluation.guideId,
      evaluation.phoneme,
      evaluation.rating,
      evaluation.isHelpful ? 1 : 0,
      evaluation.feedbackNote,
      now
    );

    res.json({
      success: true,
      recordId,
      userId,
      feedback: evaluation,
      createdAt: now
    });
  } catch (err) {
    console.error('Error in POST placement-feedback:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET latest placement feedback record for user
app.get('/api/v1/pedagogy/placement-feedback/latest', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    const row = db.prepare('SELECT * FROM native_placement_feedback_records WHERE user_id = ? ORDER BY created_at DESC LIMIT 1').get(userId);

    if (!row) {
      return res.json({ success: true, feedback: null });
    }

    res.json({
      success: true,
      recordId: row.id,
      userId: row.user_id,
      guideId: row.guide_id,
      phoneme: row.phoneme,
      rating: row.rating,
      isHelpful: Boolean(row.is_helpful),
      feedbackNote: row.feedback_note,
      createdAt: row.created_at
    });
  } catch (err) {
    console.error('Error in GET placement-feedback/latest:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * ELSA-301: Dynamic Scenario AI Speaking Roleplay Endpoints
 */
import {
  getRoleplayScenarios,
  getRoleplayScenario,
  evaluateRoleplayTurn
} from '../src/lib/scoring/roleplayScenarios.js';

// GET all roleplay scenarios
app.get('/api/v1/roleplay/scenarios', (req, res) => {
  try {
    const scenarios = getRoleplayScenarios();
    res.json({ success: true, count: scenarios.length, scenarios });
  } catch (err) {
    console.error('Error in GET roleplay/scenarios:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET specific roleplay scenario
app.get('/api/v1/roleplay/scenarios/:scenarioId', (req, res) => {
  try {
    const scenario = getRoleplayScenario(req.params.scenarioId);
    if (!scenario) {
      return res.status(404).json({ success: false, error: `Scenario not found for ${req.params.scenarioId}` });
    }
    res.json({ success: true, scenario });
  } catch (err) {
    console.error('Error in GET roleplay/scenarios/:scenarioId:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST evaluate roleplay speech turn and persist to SQLite
app.post('/api/v1/roleplay/turn-eval', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const { scenarioId, userTranscript, detectedPhonemeErrors } = req.body;

    if (!scenarioId || typeof scenarioId !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Missing or invalid required field: scenarioId'
      });
    }

    if (!userTranscript || typeof userTranscript !== 'string' || !userTranscript.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: userTranscript (must be non-empty string)'
      });
    }

    const evaluation = evaluateRoleplayTurn({
      scenarioId,
      userTranscript: userTranscript.trim(),
      detectedPhonemeErrors: Array.isArray(detectedPhonemeErrors) ? detectedPhonemeErrors : []
    });

    if (!evaluation.success) {
      return res.status(400).json(evaluation);
    }

    const now = new Date().toISOString();
    const recordId = `rol-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    db.prepare(`
      INSERT INTO roleplay_session_records (
        id, user_id, scenario_id, user_transcript, ai_response, phonetic_accuracy,
        unreleased_stops_json, is_blocker_resolved, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      recordId,
      userId,
      evaluation.scenarioId,
      evaluation.userTranscript,
      evaluation.aiResponse,
      evaluation.phoneticAccuracy,
      JSON.stringify(evaluation.unreleasedStops),
      evaluation.isBlockerResolved ? 1 : 0,
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
    console.error('Error in POST roleplay/turn-eval:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET latest roleplay session record for user
app.get('/api/v1/roleplay/session/latest', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    const row = db.prepare('SELECT * FROM roleplay_session_records WHERE user_id = ? ORDER BY created_at DESC LIMIT 1').get(userId);

    if (!row) {
      return res.json({ success: true, session: null });
    }

    res.json({
      success: true,
      recordId: row.id,
      userId: row.user_id,
      scenarioId: row.scenario_id,
      userTranscript: row.user_transcript,
      aiResponse: row.ai_response,
      phoneticAccuracy: row.phonetic_accuracy,
      unreleasedStops: JSON.parse(row.unreleased_stops_json || '[]'),
      isBlockerResolved: Boolean(row.is_blocker_resolved),
      createdAt: row.created_at
    });
  } catch (err) {
    console.error('Error in GET roleplay/session/latest:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * ELSA-302: Post-Roleplay Comprehensive Scorecard Endpoints
 */
import { calculateRoleplayScorecard } from '../src/lib/scoring/roleplayScorecard.js';

// POST generate and persist post-roleplay comprehensive scorecard
app.post('/api/v1/roleplay/scorecard/generate', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const {
      sessionId,
      pronunciationScore,
      fluencyScore,
      grammarScore,
      vocabularyScore,
      objectiveScore,
      transcriptTurns,
      detectedErrors
    } = req.body;

    const scorecard = calculateRoleplayScorecard({
      sessionId: sessionId || 'session_default',
      pronunciationScore,
      fluencyScore,
      grammarScore,
      vocabularyScore,
      objectiveScore,
      transcriptTurns,
      detectedErrors
    });

    const now = new Date().toISOString();
    const recordId = `scd-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    db.prepare(`
      INSERT INTO roleplay_scorecard_records (
        id, user_id, session_id, overall_score, rank_badge, pronunciation_score,
        fluency_score, grammar_score, vocabulary_score, objective_score,
        weak_words_json, transcript_json, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      recordId,
      userId,
      scorecard.sessionId,
      scorecard.overallScore,
      scorecard.rankBadge,
      scorecard.pillars.pronunciation.score,
      scorecard.pillars.fluency.score,
      scorecard.pillars.grammar.score,
      scorecard.pillars.vocabulary.score,
      scorecard.pillars.objectives.score,
      JSON.stringify(scorecard.weakWords),
      JSON.stringify(scorecard.transcript),
      now
    );

    res.json({
      success: true,
      recordId,
      scorecardId: recordId,
      userId,
      scorecard,
      createdAt: now
    });
  } catch (err) {
    console.error('Error in POST roleplay/scorecard/generate:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET latest roleplay scorecard for user
app.get('/api/v1/roleplay/scorecard/latest', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    const row = db.prepare('SELECT * FROM roleplay_scorecard_records WHERE user_id = ? ORDER BY created_at DESC LIMIT 1').get(userId);

    if (!row) {
      return res.json({ success: true, scorecard: null });
    }

    const weakWords = JSON.parse(row.weak_words_json || '[]');
    const transcript = JSON.parse(row.transcript_json || '[]');

    const scorecard = calculateRoleplayScorecard({
      sessionId: row.session_id,
      pronunciationScore: row.pronunciation_score,
      fluencyScore: row.fluency_score,
      grammarScore: row.grammar_score,
      vocabularyScore: row.vocabulary_score,
      objectiveScore: row.objective_score,
      transcriptTurns: transcript,
      detectedErrors: weakWords
    });

    res.json({
      success: true,
      recordId: row.id,
      userId: row.user_id,
      scorecard,
      createdAt: row.created_at
    });
  } catch (err) {
    console.error('Error in GET roleplay/scorecard/latest:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST save weak word from scorecard into error bank
app.post('/api/v1/roleplay/scorecard/save-error', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const { word, ipa, issue, correctiveTip } = req.body;

    if (!word || typeof word !== 'string' || !word.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: word'
      });
    }

    const now = new Date().toISOString();
    res.json({
      success: true,
      userId,
      savedWord: {
        word: word.trim(),
        ipa: ipa || '',
        issue: issue || '',
        correctiveTip: correctiveTip || '',
        intervalDays: 1,
        repetition: 0,
        savedAt: now
      },
      message: `Đã lưu từ "${word.trim()}" vào Ngân Hàng Lỗi (Error Bank) để ôn tập Spaced Repetition!`
    });
  } catch (err) {
    console.error('Error in POST roleplay/scorecard/save-error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * VN-104: IELTS Speaking Part 1 & 2 AI Mock Examiner Endpoints
 */
import { getIeltsCueCards, getIeltsCueCardById, evaluateIeltsMockPart2 } from '../src/lib/scoring/ieltsMockExaminer.js';

// GET all IELTS Cue Cards
app.get('/api/v1/ielts/cue-cards', (req, res) => {
  try {
    const cards = getIeltsCueCards();
    res.json({ success: true, cueCards: cards });
  } catch (err) {
    console.error('Error in GET /api/v1/ielts/cue-cards:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET single cue card
app.get('/api/v1/ielts/cue-cards/:id', (req, res) => {
  try {
    const card = getIeltsCueCardById(req.params.id);
    res.json({ success: true, cueCard: card });
  } catch (err) {
    console.error('Error in GET /api/v1/ielts/cue-cards/:id:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST evaluate Part 2 speech & record to SQLite
app.post('/api/v1/ielts/mock-eval', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const { topicId, transcript, prepNotes, speechDurationSec } = req.body;

    if (!transcript || typeof transcript !== 'string' || !transcript.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: transcript'
      });
    }

    const evalResult = evaluateIeltsMockPart2({
      topicId: topicId || 'tech_difficult_01',
      transcript,
      prepNotes: prepNotes || '',
      speechDurationSec: Number(speechDurationSec) || 110
    });

    const recordId = `ielts-mock-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO ielts_mock_examiner_records (
        id, user_id, topic_id, topic_title, part_type, prep_notes, transcript,
        duration_sec, fc_band, lr_band, gra_band, pr_band, overall_band,
        past_tense_errors_json, feedback_json, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      recordId,
      userId,
      evalResult.topicId,
      evalResult.topicTitle,
      2,
      evalResult.prepNotes,
      evalResult.transcript,
      evalResult.speechDurationSec,
      evalResult.criteria.fc.band,
      evalResult.criteria.lr.band,
      evalResult.criteria.gra.band,
      evalResult.criteria.pr.band,
      evalResult.overallBand,
      JSON.stringify(evalResult.criteria.gra.pastTenseErrors),
      JSON.stringify(evalResult),
      now
    );

    res.json({
      success: true,
      recordId,
      mockId: recordId,
      userId,
      evaluation: evalResult,
      createdAt: now
    });
  } catch (err) {
    console.error('Error in POST /api/v1/ielts/mock-eval:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET latest IELTS mock exam for user
app.get('/api/v1/ielts/mock/latest', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    const row = db.prepare('SELECT * FROM ielts_mock_examiner_records WHERE user_id = ? ORDER BY created_at DESC LIMIT 1').get(userId);

    if (!row) {
      return res.json({ success: true, evaluation: null });
    }

    res.json({
      success: true,
      recordId: row.id,
      userId: row.user_id,
      topicId: row.topic_id,
      topicTitle: row.topic_title,
      overallBand: row.overall_band,
      criteriaBands: {
        fc: row.fc_band,
        lr: row.lr_band,
        gra: row.gra_band,
        pr: row.pr_band
      },
      evaluation: JSON.parse(row.feedback_json),
      createdAt: row.created_at
    });
  } catch (err) {
    console.error('Error in GET /api/v1/ielts/mock/latest:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GAME-101: Multi-Tier Level Progression & 4-World Map Engine Endpoints
 */
import { getGameWorlds, getGameWorldById, evaluateStageCompletion } from '../src/lib/scoring/gameLevelMap.js';

// GET all 4 worlds and their stages
app.get('/api/v1/game/world-map', (req, res) => {
  try {
    const worlds = getGameWorlds();
    res.json({ success: true, worlds });
  } catch (err) {
    console.error('Error in GET /api/v1/game/world-map:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET single world details
app.get('/api/v1/game/world-map/:worldId', (req, res) => {
  try {
    const world = getGameWorldById(req.params.worldId);
    res.json({ success: true, world });
  } catch (err) {
    console.error('Error in GET /api/v1/game/world-map/:worldId:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST evaluate stage completion & save progress
app.post('/api/v1/game/stage-complete', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const { worldId, stageId, score, currentTotalStars } = req.body;

    if (score === undefined || score === null || isNaN(Number(score))) {
      return res.status(400).json({
        success: false,
        error: 'Missing or invalid field: score'
      });
    }

    const result = evaluateStageCompletion({
      worldId: worldId || 'world_1',
      stageId: stageId || 'stage_1_1',
      score: Number(score),
      currentTotalStars: Number(currentTotalStars) || 0
    });

    const recordId = `game-stage-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO game_world_progress_records (
        id, user_id, world_id, stage_id, score, stars, gem_reward,
        next_stage_id, next_world_unlocked, feedback_text, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      recordId,
      userId,
      result.worldId,
      result.stageId,
      result.score,
      result.stars,
      result.gemReward,
      result.nextStageId,
      result.nextWorldUnlocked ? 1 : 0,
      result.feedbackText,
      now
    );

    res.json({
      success: true,
      recordId,
      userId,
      progression: result,
      createdAt: now
    });
  } catch (err) {
    console.error('Error in POST /api/v1/game/stage-complete:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET latest game progress for user
app.get('/api/v1/game/progress/latest', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    const row = db.prepare('SELECT * FROM game_world_progress_records WHERE user_id = ? ORDER BY created_at DESC LIMIT 1').get(userId);

    if (!row) {
      return res.json({ success: true, progress: null });
    }

    res.json({
      success: true,
      recordId: row.id,
      userId: row.user_id,
      worldId: row.world_id,
      stageId: row.stage_id,
      score: row.score,
      stars: row.stars,
      gemReward: row.gem_reward,
      nextStageId: row.next_stage_id,
      nextWorldUnlocked: Boolean(row.next_world_unlocked),
      feedbackText: row.feedback_text,
      createdAt: row.created_at
    });
  } catch (err) {
    console.error('Error in GET /api/v1/game/progress/latest:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GAME-102: Dual Voice Controller: Real-Time Web Speech & Fallback Simulation Endpoints
 */
import { getVoiceSpells, getVoiceSpellById, evaluateVoiceSpell, calculateDecibelFromRms } from '../src/lib/audio/gameVoiceController.js';

// GET available voice combat spells
app.get('/api/v1/game/voice-commands', (req, res) => {
  try {
    const spells = getVoiceSpells();
    res.json({ success: true, spells });
  } catch (err) {
    console.error('Error in GET /api/v1/game/voice-commands:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST cast voice spell (real mic or simulator fallback)
app.post('/api/v1/game/voice-action', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const { spellId, spokenWord, isSimulated, currentCombo, latencyMs } = req.body;

    const evalResult = evaluateVoiceSpell({
      targetSpellId: spellId || 'spell_six',
      spokenWord: spokenWord || '',
      isSimulated: Boolean(isSimulated),
      currentCombo: Number(currentCombo) || 0,
      latencyMs: Number(latencyMs) || 18
    });

    const recordId = `game-voice-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO game_voice_session_records (
        id, user_id, spell_id, spell_name, target_word, spoken_word,
        is_simulated, hit_type, damage, new_combo, latency_ms, feedback_text, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      recordId,
      userId,
      evalResult.spellId,
      evalResult.spellName,
      evalResult.targetWord,
      evalResult.spokenWord,
      evalResult.isSimulated ? 1 : 0,
      evalResult.hitType,
      evalResult.damage,
      evalResult.newCombo,
      evalResult.latencyMs,
      evalResult.feedbackText,
      now
    );

    res.json({
      success: true,
      recordId,
      userId,
      action: evalResult,
      createdAt: now
    });
  } catch (err) {
    console.error('Error in POST /api/v1/game/voice-action:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET latest voice action for user
app.get('/api/v1/game/voice/latest', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    const row = db.prepare('SELECT * FROM game_voice_session_records WHERE user_id = ? ORDER BY created_at DESC LIMIT 1').get(userId);

    if (!row) {
      return res.json({ success: true, action: null });
    }

    res.json({
      success: true,
      recordId: row.id,
      userId: row.user_id,
      spellId: row.spell_id,
      spellName: row.spell_name,
      targetWord: row.target_word,
      spokenWord: row.spoken_word,
      isSimulated: Boolean(row.is_simulated),
      hitType: row.hit_type,
      damage: row.damage,
      newCombo: row.new_combo,
      latencyMs: row.latency_ms,
      feedbackText: row.feedback_text,
      createdAt: row.created_at
    });
  } catch (err) {
    console.error('Error in GET /api/v1/game/voice/latest:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GAME-103: Auditory Discrimination Boss Arenas & Turn-Based Minimal Pair Counter-Spells Endpoints
 */
import { getBossEncounters, getBossEncounterById, evaluateBossTurn } from '../src/lib/scoring/bossArena.js';

// GET all boss encounters
app.get('/api/v1/game/boss-arenas', (req, res) => {
  try {
    const bosses = getBossEncounters();
    res.json({ success: true, bosses });
  } catch (err) {
    console.error('Error in GET /api/v1/game/boss-arenas:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET single boss encounter details
app.get('/api/v1/game/boss-arenas/:bossId', (req, res) => {
  try {
    const boss = getBossEncounterById(req.params.bossId);
    res.json({ success: true, boss });
  } catch (err) {
    console.error('Error in GET /api/v1/game/boss-arenas/:bossId:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST turn action in boss fight
app.post('/api/v1/game/boss-turn', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const { bossId, turnIndex, selectedOptionIndex, currentBossHp, currentPlayerHp, timeTakenSec } = req.body;

    if (selectedOptionIndex === undefined || selectedOptionIndex === null) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: selectedOptionIndex'
      });
    }

    const evalResult = evaluateBossTurn({
      bossId: bossId || 'boss_titan_t',
      turnIndex: Number(turnIndex) || 1,
      selectedOptionIndex: Number(selectedOptionIndex),
      currentBossHp: Number(currentBossHp) || 100,
      currentPlayerHp: Number(currentPlayerHp) || 100,
      timeTakenSec: Number(timeTakenSec) || 2.0
    });

    const recordId = `boss-turn-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO game_boss_battle_records (
        id, user_id, boss_id, boss_name, turn_index, target_word, selected_word,
        is_correct, is_timeout, boss_hp_left, player_hp_left, damage_dealt,
        damage_taken, magnifier_tip, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      recordId,
      userId,
      evalResult.bossId,
      evalResult.bossName,
      evalResult.turnIndex,
      evalResult.targetWord,
      evalResult.selectedWord,
      evalResult.isCorrect ? 1 : 0,
      evalResult.isTimeout ? 1 : 0,
      evalResult.newBossHp,
      evalResult.newPlayerHp,
      evalResult.damageDealt,
      evalResult.damageTaken,
      evalResult.magnifierTip,
      now
    );

    res.json({
      success: true,
      recordId,
      userId,
      turnResult: evalResult,
      createdAt: now
    });
  } catch (err) {
    console.error('Error in POST /api/v1/game/boss-turn:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET latest boss fight turn record
app.get('/api/v1/game/boss/latest', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    const row = db.prepare('SELECT * FROM game_boss_battle_records WHERE user_id = ? ORDER BY created_at DESC LIMIT 1').get(userId);

    if (!row) {
      return res.json({ success: true, turnResult: null });
    }

    res.json({
      success: true,
      recordId: row.id,
      userId: row.user_id,
      bossId: row.boss_id,
      bossName: row.boss_name,
      turnIndex: row.turn_index,
      targetWord: row.target_word,
      selectedWord: row.selected_word,
      isCorrect: Boolean(row.is_correct),
      isTimeout: Boolean(row.is_timeout),
      bossHpLeft: row.boss_hp_left,
      playerHpLeft: row.player_hp_left,
      damageDealt: row.damage_dealt,
      damageTaken: row.damage_taken,
      magnifierTip: row.magnifier_tip,
      createdAt: row.created_at
    });
  } catch (err) {
    console.error('Error in GET /api/v1/game/boss/latest:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GAME-104: Zero-Latency Web Audio API Sound Synthesizer Endpoints
 */
import { getSynthSfxCatalog, getSynthSfxById } from '../src/lib/audio/soundSynthesizer.js';

// GET all 8 procedural synthesizer effects
app.get('/api/v1/audio/sfx-catalog', (req, res) => {
  try {
    const sfxList = getSynthSfxCatalog();
    res.json({ success: true, sfxCatalog: sfxList });
  } catch (err) {
    console.error('Error in GET /api/v1/audio/sfx-catalog:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST save user audio & reduced-motion settings
app.post('/api/v1/audio/settings', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const { sfxVolume, bgmVolume, reducedMotion, muted, playedIncrement } = req.body;

    const safeSfx = sfxVolume !== undefined ? Math.max(0, Math.min(1.0, Number(sfxVolume))) : 0.8;
    const safeBgm = bgmVolume !== undefined ? Math.max(0, Math.min(1.0, Number(bgmVolume))) : 0.6;
    const isReduced = Boolean(reducedMotion) ? 1 : 0;
    const isMuted = Boolean(muted) ? 1 : 0;
    const incPlayed = Number(playedIncrement) || 0;
    const now = new Date().toISOString();

    const existing = db.prepare('SELECT * FROM sound_synthesizer_records WHERE user_id = ?').get(userId);

    if (existing) {
      db.prepare(`
        UPDATE sound_synthesizer_records
        SET sfx_volume = ?, bgm_volume = ?, reduced_motion = ?, muted = ?,
            sfx_played_count = sfx_played_count + ?, updated_at = ?
        WHERE user_id = ?
      `).run(safeSfx, safeBgm, isReduced, isMuted, incPlayed, now, userId);
    } else {
      const recordId = `audio-set-${Date.now()}`;
      db.prepare(`
        INSERT INTO sound_synthesizer_records (id, user_id, sfx_volume, bgm_volume, reduced_motion, muted, sfx_played_count, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(recordId, userId, safeSfx, safeBgm, isReduced, isMuted, incPlayed, now);
    }

    const updated = db.prepare('SELECT * FROM sound_synthesizer_records WHERE user_id = ?').get(userId);
    res.json({
      success: true,
      userId,
      settings: {
        sfxVolume: updated.sfx_volume,
        bgmVolume: updated.bgm_volume,
        reducedMotion: Boolean(updated.reduced_motion),
        muted: Boolean(updated.muted),
        sfxPlayedCount: updated.sfx_played_count,
        updatedAt: updated.updated_at
      }
    });
  } catch (err) {
    console.error('Error in POST /api/v1/audio/settings:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET latest user audio settings
app.get('/api/v1/audio/settings/latest', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    const row = db.prepare('SELECT * FROM sound_synthesizer_records WHERE user_id = ?').get(userId);

    if (!row) {
      return res.json({
        success: true,
        settings: {
          sfxVolume: 0.8,
          bgmVolume: 0.6,
          reducedMotion: false,
          muted: false,
          sfxPlayedCount: 0
        }
      });
    }

    res.json({
      success: true,
      settings: {
        sfxVolume: row.sfx_volume,
        bgmVolume: row.bgm_volume,
        reducedMotion: Boolean(row.reduced_motion),
        muted: Boolean(row.muted),
        sfxPlayedCount: row.sfx_played_count,
        updatedAt: row.updated_at
      }
    });
  } catch (err) {
    console.error('Error in GET /api/v1/audio/settings/latest:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GAME-105: RPG Equipment Inventory & University Leaderboard Endpoints
 */
import {
  getPerkCatalog,
  getUniversitiesList,
  buyPerkItem,
  computeUniversityLeaderboard
} from '../src/lib/scoring/rpgInventoryLeaderboard.js';

// GET user inventory & gems
app.get('/api/v1/game/inventory', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    let row = db.prepare('SELECT * FROM rpg_inventory_records WHERE user_id = ?').get(userId);

    if (!row) {
      const recordId = `inv-${Date.now()}`;
      const now = new Date().toISOString();
      db.prepare(`
        INSERT INTO rpg_inventory_records (id, user_id, gems_balance, items_json, updated_at)
        VALUES (?, ?, 500, '[]', ?)
      `).run(recordId, userId, now);
      row = { id: recordId, user_id: userId, gems_balance: 500, items_json: '[]', updated_at: now };
    }

    res.json({
      success: true,
      gemsBalance: row.gems_balance,
      inventory: JSON.parse(row.items_json),
      catalog: getPerkCatalog()
    });
  } catch (err) {
    console.error('Error in GET /api/v1/game/inventory:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST purchase item
app.post('/api/v1/game/inventory/buy', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const { itemId } = req.body;

    let row = db.prepare('SELECT * FROM rpg_inventory_records WHERE user_id = ?').get(userId);
    if (!row) {
      const recordId = `inv-${Date.now()}`;
      const now = new Date().toISOString();
      db.prepare(`
        INSERT INTO rpg_inventory_records (id, user_id, gems_balance, items_json, updated_at)
        VALUES (?, ?, 500, '[]', ?)
      `).run(recordId, userId, now);
      row = { id: recordId, user_id: userId, gems_balance: 500, items_json: '[]', updated_at: now };
    }

    const currentGems = row.gems_balance;
    const currentInventory = JSON.parse(row.items_json);

    const result = buyPerkItem({ currentGems, inventory: currentInventory, itemId });
    if (!result.success) {
      return res.status(400).json(result);
    }

    const now = new Date().toISOString();
    db.prepare(`
      UPDATE rpg_inventory_records
      SET gems_balance = ?, items_json = ?, updated_at = ?
      WHERE user_id = ?
    `).run(result.newGems, JSON.stringify(result.newInventory), now, userId);

    res.json({
      success: true,
      gemsBalance: result.newGems,
      purchasedItem: result.purchasedItem,
      inventory: result.newInventory
    });
  } catch (err) {
    console.error('Error in POST /api/v1/game/inventory/buy:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET university leaderboard
app.get('/api/v1/leaderboard/university', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    const userUni = req.query.universityId || 'HUST';

    const records = db.prepare('SELECT * FROM university_leaderboard_records').all();
    const leaderboard = computeUniversityLeaderboard(records, userUni);

    res.json({
      success: true,
      podium: leaderboard.podium,
      rankings: leaderboard.rankings,
      personalRank: leaderboard.personalRank
    });
  } catch (err) {
    console.error('Error in GET /api/v1/leaderboard/university:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST submit XP to university leaderboard
app.post('/api/v1/leaderboard/submit-xp', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const { userName, universityId, universityName, xp } = req.body;

    const safeXp = Math.max(1, Number(xp) || 50);
    const uniId = universityId || 'HUST';
    const uniName = universityName || 'ĐH Bách Khoa Hà Nội';
    const uName = userName || 'Học viên Bách Khoa';
    const recordId = `uni-xp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO university_leaderboard_records (id, user_id, user_name, university_id, university_name, xp, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(recordId, userId, uName, uniId, uniName, safeXp, now);

    const records = db.prepare('SELECT * FROM university_leaderboard_records').all();
    const leaderboard = computeUniversityLeaderboard(records, uniId);

    res.json({
      success: true,
      submittedXp: safeXp,
      universityId: uniId,
      podium: leaderboard.podium,
      personalRank: leaderboard.personalRank
    });
  } catch (err) {
    console.error('Error in POST /api/v1/leaderboard/submit-xp:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * ELSA-401: 10-Minute Daily Personalized Practice Path Endpoints
 */
import {
  getDailyPathCurriculum,
  processStepCompletion
} from '../src/lib/scoring/dailyPersonalizedPath.js';

// GET daily path for user (initializes if none for today)
app.get('/api/v1/curriculum/daily-path', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.query.userId || 'default_user';
    const dialect = req.query.dialect || 'nam';
    const today = new Date().toISOString().split('T')[0];

    let row = db.prepare(`
      SELECT * FROM daily_practice_path_records
      WHERE user_id = ? AND date_str = ?
      ORDER BY updated_at DESC LIMIT 1
    `).get(userId, today);

    if (!row) {
      const curriculum = getDailyPathCurriculum(dialect);
      const recordId = `path-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      const now = new Date().toISOString();

      db.prepare(`
        INSERT INTO daily_practice_path_records (
          id, user_id, dialect, total_steps, completed_steps,
          current_step_order, remaining_minutes, path_json, date_str, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        recordId, userId, dialect, curriculum.totalSteps, 0,
        1, curriculum.totalMinutes, JSON.stringify(curriculum), today, now
      );

      row = db.prepare('SELECT * FROM daily_practice_path_records WHERE id = ?').get(recordId);
    }

    const pathData = JSON.parse(row.path_json);
    res.json({
      success: true,
      pathId: row.id,
      userId: row.user_id,
      dialect: row.dialect,
      totalSteps: row.total_steps,
      completedSteps: row.completed_steps,
      currentStepOrder: row.current_step_order,
      remainingMinutes: row.remaining_minutes,
      dateStr: row.date_str,
      curriculum: pathData
    });
  } catch (err) {
    console.error('Error in GET /api/v1/curriculum/daily-path:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST complete a micro-step
app.post('/api/v1/curriculum/step-complete', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const { stepOrder } = req.body;
    const today = new Date().toISOString().split('T')[0];

    const row = db.prepare(`
      SELECT * FROM daily_practice_path_records
      WHERE user_id = ? AND date_str = ?
      ORDER BY updated_at DESC LIMIT 1
    `).get(userId, today);

    if (!row) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy lộ trình học hôm nay.' });
    }

    const updateCalc = processStepCompletion({
      currentCompletedSteps: row.completed_steps,
      targetOrder: Number(stepOrder) || (row.completed_steps + 1),
      totalSteps: row.total_steps
    });

    const now = new Date().toISOString();
    db.prepare(`
      UPDATE daily_practice_path_records
      SET completed_steps = ?, current_step_order = ?, remaining_minutes = ?, updated_at = ?
      WHERE id = ?
    `).run(updateCalc.completedSteps, updateCalc.nextStepOrder, updateCalc.remainingMinutes, now, row.id);

    const updated = db.prepare('SELECT * FROM daily_practice_path_records WHERE id = ?').get(row.id);
    const pathData = JSON.parse(updated.path_json);

    res.json({
      success: true,
      pathId: updated.id,
      completedSteps: updated.completed_steps,
      currentStepOrder: updated.current_step_order,
      remainingMinutes: updated.remaining_minutes,
      isAllCompleted: updateCalc.isAllCompleted,
      progressPercent: updateCalc.progressPercent,
      curriculum: pathData
    });
  } catch (err) {
    console.error('Error in POST /api/v1/curriculum/step-complete:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET latest daily path state
app.get('/api/v1/curriculum/daily-path/latest', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    const row = db.prepare(`
      SELECT * FROM daily_practice_path_records
      WHERE user_id = ?
      ORDER BY updated_at DESC LIMIT 1
    `).get(userId);

    if (!row) {
      return res.json({ success: true, dailyPath: null });
    }

    res.json({
      success: true,
      dailyPath: {
        id: row.id,
        dialect: row.dialect,
        totalSteps: row.total_steps,
        completedSteps: row.completed_steps,
        currentStepOrder: row.current_step_order,
        remainingMinutes: row.remaining_minutes,
        curriculum: JSON.parse(row.path_json),
        updatedAt: row.updated_at
      }
    });
  } catch (err) {
    console.error('Error in GET /api/v1/curriculum/daily-path/latest:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * ELSA-402: Automated Error Bank with Spaced Repetition (SM-2) Endpoints
 */
import {
  getInitialCards,
  calculateSM2
} from '../src/lib/scoring/spacedRepetitionSM2.js';

// GET due cards for user (seeds if empty)
app.get('/api/v1/error-bank/due-cards', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    let rows = db.prepare('SELECT * FROM error_bank_sm2_records WHERE user_id = ?').all(userId);

    if (rows.length === 0) {
      const initialCards = getInitialCards();
      const insertStmt = db.prepare(`
        INSERT INTO error_bank_sm2_records (
          id, user_id, word, ipa, phoneme_error, past_audio,
          muscle_tip, easiness_factor, interval_days, repetitions,
          consecutive_high_scores, last_score, status, category,
          next_review_date, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const now = new Date().toISOString();
      for (const card of initialCards) {
        insertStmt.run(
          `${card.id}-${userId}`,
          userId,
          card.word,
          card.ipa,
          card.phonemeError,
          card.pastUserAudio,
          card.muscleTip,
          card.easinessFactor,
          card.intervalDays,
          card.repetitions,
          card.consecutiveHighScores,
          card.lastScore,
          card.status,
          card.category,
          now,
          now
        );
      }
      rows = db.prepare('SELECT * FROM error_bank_sm2_records WHERE user_id = ?').all(userId);
    }

    res.json({
      success: true,
      dueCards: rows.filter((r) => r.status === 'due' || r.status === 'learning'),
      allCards: rows
    });
  } catch (err) {
    console.error('Error in GET /api/v1/error-bank/due-cards:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST review card with SM-2 rating
app.post('/api/v1/error-bank/review', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const { cardId, quality, score } = req.body;

    const row = db.prepare('SELECT * FROM error_bank_sm2_records WHERE id = ? AND user_id = ?').get(cardId, userId);
    if (!row) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy thẻ từ vựng.' });
    }

    const sm2Result = calculateSM2({
      quality: Number(quality) || 4,
      currentEF: row.easiness_factor,
      currentInterval: row.interval_days,
      repetitions: row.repetitions,
      score: Number(score) || 80,
      consecutiveHighScores: row.consecutive_high_scores
    });

    const newStatus = sm2Result.isMastered ? 'mastered' : 'learning';
    const now = new Date().toISOString();

    db.prepare(`
      UPDATE error_bank_sm2_records
      SET easiness_factor = ?, interval_days = ?, repetitions = ?,
          consecutive_high_scores = ?, last_score = ?, status = ?,
          next_review_date = ?, updated_at = ?
      WHERE id = ? AND user_id = ?
    `).run(
      sm2Result.easinessFactor,
      sm2Result.intervalDays,
      sm2Result.repetitions,
      sm2Result.consecutiveHighScores,
      Number(score) || 80,
      newStatus,
      sm2Result.nextReviewDate,
      now,
      cardId,
      userId
    );

    const updated = db.prepare('SELECT * FROM error_bank_sm2_records WHERE id = ?').get(cardId);

    res.json({
      success: true,
      cardId,
      sm2: sm2Result,
      updatedCard: updated
    });
  } catch (err) {
    console.error('Error in POST /api/v1/error-bank/review:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET error bank stats
app.get('/api/v1/error-bank/stats', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    const rows = db.prepare('SELECT * FROM error_bank_sm2_records WHERE user_id = ?').all(userId);

    const dueCount = rows.filter((r) => r.status === 'due').length;
    const learningCount = rows.filter((r) => r.status === 'learning').length;
    const masteredCount = rows.filter((r) => r.status === 'mastered').length;

    res.json({
      success: true,
      totalCards: rows.length,
      dueCount,
      learningCount,
      masteredCount
    });
  } catch (err) {
    console.error('Error in GET /api/v1/error-bank/stats:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * ELSA-601: Daily Practice Streak Counter & Streak Freeze Shield Endpoints
 */
import {
  evaluateStreakVisuals,
  processMidnightStreakProtection,
  buyStreakFreeze
} from '../src/lib/scoring/streakFreezeShield.js';

// GET user streak and shields status
app.get('/api/v1/streak/status', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    let row = db.prepare('SELECT * FROM user_streak_shield_records WHERE user_id = ?').get(userId);

    if (!row) {
      const recordId = `streak-${Date.now()}`;
      const now = new Date().toISOString();
      db.prepare(`
        INSERT INTO user_streak_shield_records (
          id, user_id, streak_count, freeze_shields_count, is_frozen,
          hours_inactive, saved_modal_pending, last_active_date, updated_at
        ) VALUES (?, ?, 7, 1, 0, 0, 0, ?, ?)
      `).run(recordId, userId, now, now);
      row = db.prepare('SELECT * FROM user_streak_shield_records WHERE id = ?').get(recordId);
    }

    const visuals = evaluateStreakVisuals({ streak: row.streak_count, isFrozen: Boolean(row.is_frozen) });

    res.json({
      success: true,
      userId: row.user_id,
      streakCount: row.streak_count,
      freezeShieldsCount: row.freeze_shields_count,
      isFrozen: Boolean(row.is_frozen),
      hoursInactive: row.hours_inactive,
      savedModalPending: Boolean(row.saved_modal_pending),
      visuals,
      lastActiveDate: row.last_active_date
    });
  } catch (err) {
    console.error('Error in GET /api/v1/streak/status:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST simulate midnight streak protection
app.post('/api/v1/streak/consume-freeze', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const { hoursInactive = 25 } = req.body;

    let row = db.prepare('SELECT * FROM user_streak_shield_records WHERE user_id = ?').get(userId);
    if (!row) {
      const recordId = `streak-${Date.now()}`;
      const now = new Date().toISOString();
      db.prepare(`
        INSERT INTO user_streak_shield_records (
          id, user_id, streak_count, freeze_shields_count, is_frozen,
          hours_inactive, saved_modal_pending, last_active_date, updated_at
        ) VALUES (?, ?, 7, 1, 0, 0, 0, ?, ?)
      `).run(recordId, userId, now, now);
      row = db.prepare('SELECT * FROM user_streak_shield_records WHERE id = ?').get(recordId);
    }

    const protection = processMidnightStreakProtection({
      streak: row.streak_count,
      shields: row.freeze_shields_count,
      hoursInactive: Number(hoursInactive)
    });

    const now = new Date().toISOString();
    db.prepare(`
      UPDATE user_streak_shield_records
      SET streak_count = ?, freeze_shields_count = ?, is_frozen = ?,
          hours_inactive = ?, saved_modal_pending = ?, updated_at = ?
      WHERE user_id = ?
    `).run(
      protection.streakMaintained,
      protection.shieldsRemaining,
      protection.isFrozen ? 1 : 0,
      Number(hoursInactive),
      protection.shieldConsumed ? 1 : 0,
      now,
      userId
    );

    const updated = db.prepare('SELECT * FROM user_streak_shield_records WHERE user_id = ?').get(userId);
    const visuals = evaluateStreakVisuals({ streak: updated.streak_count, isFrozen: Boolean(updated.is_frozen) });

    res.json({
      success: true,
      protection,
      streakCount: updated.streak_count,
      freezeShieldsCount: updated.freeze_shields_count,
      isFrozen: Boolean(updated.is_frozen),
      savedModalPending: Boolean(updated.saved_modal_pending),
      visuals
    });
  } catch (err) {
    console.error('Error in POST /api/v1/streak/consume-freeze:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST purchase streak freeze shield for 200 gems
app.post('/api/v1/streak/buy-freeze', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';

    // Get gems from rpg_inventory_records if available, else 500
    let invRow = db.prepare('SELECT * FROM rpg_inventory_records WHERE user_id = ?').get(userId);
    let gems = invRow ? invRow.gems_balance : 500;

    let streakRow = db.prepare('SELECT * FROM user_streak_shield_records WHERE user_id = ?').get(userId);
    let currentShields = streakRow ? streakRow.freeze_shields_count : 1;

    const buyResult = buyStreakFreeze({ gemsBalance: gems, currentShields, costGems: 200 });
    if (!buyResult.success) {
      return res.status(400).json(buyResult);
    }

    const now = new Date().toISOString();

    // Update gems
    if (invRow) {
      db.prepare('UPDATE rpg_inventory_records SET gems_balance = ?, updated_at = ? WHERE user_id = ?')
        .run(buyResult.gemsBalance, now, userId);
    }

    // Update shields
    if (streakRow) {
      db.prepare('UPDATE user_streak_shield_records SET freeze_shields_count = ?, updated_at = ? WHERE user_id = ?')
        .run(buyResult.shields, now, userId);
    } else {
      const recordId = `streak-${Date.now()}`;
      db.prepare(`
        INSERT INTO user_streak_shield_records (
          id, user_id, streak_count, freeze_shields_count, is_frozen,
          hours_inactive, saved_modal_pending, last_active_date, updated_at
        ) VALUES (?, ?, 7, ?, 0, 0, 0, ?, ?)
      `).run(recordId, userId, buyResult.shields, now, now);
    }

    res.json({
      success: true,
      gemsBalance: buyResult.gemsBalance,
      freezeShieldsCount: buyResult.shields,
      message: buyResult.message
    });
  } catch (err) {
    console.error('Error in POST /api/v1/streak/buy-freeze:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST dismiss saved streak modal
app.post('/api/v1/streak/dismiss-saved-modal', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    db.prepare('UPDATE user_streak_shield_records SET saved_modal_pending = 0, is_frozen = 0 WHERE user_id = ?')
      .run(userId);
    res.json({ success: true, message: 'Băng đã tan! Tiếp tục phát huy chuỗi học tập!' });
  } catch (err) {
    console.error('Error in POST /api/v1/streak/dismiss-saved-modal:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * ELSA-602: Freemium 5-Lesson Daily Limit & Pro Subscription Paywall Endpoints
 */
import {
  evaluateUserQuota,
  getCountdownUntilMidnight,
  getProBenefits,
  FREE_DAILY_LESSON_LIMIT
} from '../src/lib/scoring/freemiumQuota.js';

// GET quota status for active user
app.get('/api/v1/quota/status', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    const today = new Date().toISOString().split('T')[0];

    let row = db.prepare('SELECT * FROM freemium_quota_records WHERE user_id = ? AND date_str = ?').get(userId, today);
    if (!row) {
      const recordId = `quota-${Date.now()}`;
      const now = new Date().toISOString();
      db.prepare(`
        INSERT INTO freemium_quota_records (id, user_id, is_pro, lessons_completed_today, date_str, updated_at)
        VALUES (?, ?, 0, 0, ?, ?)
      `).run(recordId, userId, today, now);
      row = db.prepare('SELECT * FROM freemium_quota_records WHERE id = ?').get(recordId);
    }

    const quota = evaluateUserQuota({
      lessonsCompletedToday: row.lessons_completed_today,
      isPro: Boolean(row.is_pro)
    });
    const countdown = getCountdownUntilMidnight();

    res.json({
      success: true,
      userId: row.user_id,
      dateStr: row.date_str,
      quota,
      countdown,
      benefits: getProBenefits()
    });
  } catch (err) {
    console.error('Error in GET /api/v1/quota/status:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST consume a free lesson
app.post('/api/v1/quota/consume-lesson', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const today = new Date().toISOString().split('T')[0];

    let row = db.prepare('SELECT * FROM freemium_quota_records WHERE user_id = ? AND date_str = ?').get(userId, today);
    if (!row) {
      const recordId = `quota-${Date.now()}`;
      const now = new Date().toISOString();
      db.prepare(`
        INSERT INTO freemium_quota_records (id, user_id, is_pro, lessons_completed_today, date_str, updated_at)
        VALUES (?, ?, 0, 0, ?, ?)
      `).run(recordId, userId, today, now);
      row = db.prepare('SELECT * FROM freemium_quota_records WHERE id = ?').get(recordId);
    }

    const currentQuota = evaluateUserQuota({
      lessonsCompletedToday: row.lessons_completed_today,
      isPro: Boolean(row.is_pro)
    });

    if (!currentQuota.canAccessLesson) {
      return res.status(403).json({
        success: false,
        error: 'Đã hết định ngạch bài học miễn phí hôm nay. Vui lòng nâng cấp Pro để học không giới hạn.',
        quota: currentQuota,
        countdown: getCountdownUntilMidnight()
      });
    }

    const now = new Date().toISOString();
    const newCount = row.lessons_completed_today + 1;
    db.prepare('UPDATE freemium_quota_records SET lessons_completed_today = ?, updated_at = ? WHERE id = ?')
      .run(newCount, now, row.id);

    const updated = db.prepare('SELECT * FROM freemium_quota_records WHERE id = ?').get(row.id);
    const updatedQuota = evaluateUserQuota({
      lessonsCompletedToday: updated.lessons_completed_today,
      isPro: Boolean(updated.is_pro)
    });

    res.json({
      success: true,
      quota: updatedQuota,
      countdown: getCountdownUntilMidnight()
    });
  } catch (err) {
    console.error('Error in POST /api/v1/quota/consume-lesson:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST upgrade to Pro account
app.post('/api/v1/quota/upgrade-pro', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toISOString();

    let row = db.prepare('SELECT * FROM freemium_quota_records WHERE user_id = ? AND date_str = ?').get(userId, today);
    if (row) {
      db.prepare('UPDATE freemium_quota_records SET is_pro = 1, updated_at = ? WHERE user_id = ?')
        .run(now, userId);
    } else {
      const recordId = `quota-${Date.now()}`;
      db.prepare(`
        INSERT INTO freemium_quota_records (id, user_id, is_pro, lessons_completed_today, date_str, updated_at)
        VALUES (?, ?, 1, 0, ?, ?)
      `).run(recordId, userId, today, now);
    }

    res.json({
      success: true,
      isPro: true,
      message: 'Chúc mừng bạn đã nâng cấp thành công tài khoản Pro!'
    });
  } catch (err) {
    console.error('Error in POST /api/v1/quota/upgrade-pro:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * USER-101: Learner Authentication, Pronunciation Mastery Dashboard & Skill Radar Endpoints
 */
import {
  generateAuthToken,
  verifyAuthToken,
  computeRadarPoints,
  calculateAverageRadarScore,
  getRadarColorTheme
} from '../src/lib/scoring/learnerDashboardAuth.js';

// POST /api/v1/auth/login
app.post('/api/v1/auth/login', (req, res) => {
  try {
    const { email, password, provider = 'email', name } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required' });
    }

    const cleanEmail = email.trim().toLowerCase();
    let user = db.prepare('SELECT * FROM learner_auth_dashboard_records WHERE email = ?').get(cleanEmail);

    const now = new Date().toISOString();
    if (!user) {
      const userId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const userName = name || cleanEmail.split('@')[0];
      const token = generateAuthToken(userId, cleanEmail);

      db.prepare(`
        INSERT INTO learner_auth_dashboard_records (
          id, user_id, name, email, role, tier, token_hash,
          phonemes_score, stress_score, intonation_score, ending_sounds_score, fluency_score,
          total_practice_minutes, mastered_phonemes_count, error_bank_count, predicted_ielts,
          created_at, updated_at
        ) VALUES (?, ?, ?, ?, 'learner', 'free', ?, 75, 70, 68, 80, 72, 60, 15, 2, 6.0, ?, ?)
      `).run(
        `learner-${Date.now()}`, userId, userName, cleanEmail, token, now, now
      );
      user = db.prepare('SELECT * FROM learner_auth_dashboard_records WHERE user_id = ?').get(userId);
    }

    const token = generateAuthToken(user.user_id, user.email);
    db.prepare('UPDATE learner_auth_dashboard_records SET token_hash = ?, updated_at = ? WHERE user_id = ?')
      .run(token, now, user.user_id);

    res.json({
      success: true,
      token,
      user: {
        id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
        tier: user.tier,
        streak: 7
      }
    });
  } catch (err) {
    console.error('Error in POST /api/v1/auth/login:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/v1/user/profile-dashboard
app.get('/api/v1/user/profile-dashboard', (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    let userId = req.headers['x-user-id'];

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const payload = verifyAuthToken(authHeader);
      if (payload && payload.sub) {
        userId = payload.sub;
      }
    }

    if (!userId) {
      userId = 'default_user';
    }

    let record = db.prepare('SELECT * FROM learner_auth_dashboard_records WHERE user_id = ?').get(userId);
    if (!record) {
      // Fallback to default user if not found
      record = db.prepare("SELECT * FROM learner_auth_dashboard_records WHERE user_id = 'default_user'").get();
    }

    if (!record) {
      return res.status(404).json({ success: false, error: 'User profile not found' });
    }

    const radarScores = {
      phonemes: record.phonemes_score,
      stress: record.stress_score,
      intonation: record.intonation_score,
      endingSounds: record.ending_sounds_score,
      fluency: record.fluency_score
    };

    const stats = {
      totalPracticeMinutes: record.total_practice_minutes,
      masteredPhonemesCount: record.mastered_phonemes_count,
      errorBankCount: record.error_bank_count,
      predictedIelts: record.predicted_ielts
    };

    const averageRadarScore = calculateAverageRadarScore(radarScores);
    const radarTheme = getRadarColorTheme(averageRadarScore);
    const radarPoints = computeRadarPoints(radarScores);

    res.json({
      success: true,
      user: {
        id: record.user_id,
        name: record.name,
        email: record.email,
        tier: record.tier,
        streak: 7
      },
      radarScores,
      stats,
      averageRadarScore,
      radarTheme,
      radarPoints
    });
  } catch (err) {
    console.error('Error in GET /api/v1/user/profile-dashboard:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/v1/user/profile-dashboard/update-scores
app.post('/api/v1/user/profile-dashboard/update-scores', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default_user';
    const { radarScores = {}, stats = {} } = req.body;
    const now = new Date().toISOString();

    const record = db.prepare('SELECT * FROM learner_auth_dashboard_records WHERE user_id = ?').get(userId);
    if (!record) {
      return res.status(404).json({ success: false, error: 'Learner profile not found' });
    }

    const newPhonemes = radarScores.phonemes ?? record.phonemes_score;
    const newStress = radarScores.stress ?? record.stress_score;
    const newIntonation = radarScores.intonation ?? record.intonation_score;
    const newEnding = radarScores.endingSounds ?? record.ending_sounds_score;
    const newFluency = radarScores.fluency ?? record.fluency_score;

    const newMinutes = stats.totalPracticeMinutes ?? record.total_practice_minutes;
    const newMastered = stats.masteredPhonemesCount ?? record.mastered_phonemes_count;
    const newErrors = stats.errorBankCount ?? record.error_bank_count;
    const newIelts = stats.predictedIelts ?? record.predicted_ielts;

    db.prepare(`
      UPDATE learner_auth_dashboard_records SET
        phonemes_score = ?,
        stress_score = ?,
        intonation_score = ?,
        ending_sounds_score = ?,
        fluency_score = ?,
        total_practice_minutes = ?,
        mastered_phonemes_count = ?,
        error_bank_count = ?,
        predicted_ielts = ?,
        updated_at = ?
      WHERE user_id = ?
    `).run(
      newPhonemes, newStress, newIntonation, newEnding, newFluency,
      newMinutes, newMastered, newErrors, newIelts, now, userId
    );

    res.json({
      success: true,
      message: 'Learner scores & stats updated successfully'
    });
  } catch (err) {
    console.error('Error in POST /api/v1/user/profile-dashboard/update-scores:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * ARCH-101: Relational Database Schema & Range Partitioning Endpoints
 */
import {
  SCHEMA_TABLES,
  getPartitionNameForDate,
  getMonthBoundaries,
  evaluateConnectionPoolHealth,
  ensureMonthlyPartition,
  routeInsertPhonemeScore
} from '../src/lib/database/relationalSchemaManager.js';

// GET /api/v1/arch/schema-status
app.get('/api/v1/arch/schema-status', (req, res) => {
  try {
    const poolHealth = evaluateConnectionPoolHealth({
      maxClientConn: 5000,
      activeClients: 1420,
      defaultPoolSize: 50,
      poolMode: 'transaction'
    });

    const currentPartition = getPartitionNameForDate(new Date());

    res.json({
      success: true,
      tables: SCHEMA_TABLES,
      currentPartition,
      poolHealth,
      partitionMode: 'Range Partitioning by Month'
    });
  } catch (err) {
    console.error('Error in GET /api/v1/arch/schema-status:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/v1/arch/records
app.post('/api/v1/arch/records', (req, res) => {
  try {
    const { userId, phonemeSymbol, score, durationMs, audioUrl } = req.body;
    if (!userId || !phonemeSymbol || score === undefined) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const recordId = `ps_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const routeResult = routeInsertPhonemeScore(db, {
      id: recordId,
      user_id: userId,
      phoneme_symbol: phonemeSymbol,
      score: Number(score),
      duration_ms: Number(durationMs || 300),
      audio_r2_url: audioUrl || null
    });

    res.json({
      success: true,
      recordId,
      partitionTable: routeResult.partitionTable,
      createdAt: routeResult.createdAt
    });
  } catch (err) {
    console.error('Error in POST /api/v1/arch/records:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/v1/arch/user-history/:userId
app.get('/api/v1/arch/user-history/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const limit = Number(req.query.limit) || 20;

    const scores = db.prepare(
      'SELECT * FROM arch_phoneme_scores WHERE user_id = ? ORDER BY created_at DESC LIMIT ?'
    ).all(userId, limit);

    const subscription = db.prepare(
      'SELECT * FROM arch_subscriptions WHERE user_id = ? AND status = ?'
    ).get(userId, 'active');

    res.json({
      success: true,
      userId,
      hasActiveSubscription: Boolean(subscription),
      historyCount: scores.length,
      scores
    });
  } catch (err) {
    console.error('Error in GET /api/v1/arch/user-history:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/v1/arch/partition/ensure
app.post('/api/v1/arch/partition/ensure', (req, res) => {
  try {
    const targetDate = req.body.date ? new Date(req.body.date) : new Date();
    const tableName = ensureMonthlyPartition(db, targetDate);

    res.json({
      success: true,
      partitionTable: tableName,
      date: targetDate.toISOString()
    });
  } catch (err) {
    console.error('Error in POST /api/v1/arch/partition/ensure:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * ARCH-102: Asynchronous Audio Ingestion & GPU Worker Queue Pipeline Endpoints
 */
import {
  detectAudioFormat,
  FFMPEG_NORMALIZATION_SPEC,
  verifyAudioNormalization,
  calculateKedaGpuScale,
  evaluateJobRetryPolicy
} from '../src/lib/audio/asyncAudioQueuePipeline.js';

// POST /api/v1/audio/ingest
app.post('/api/v1/audio/ingest', (req, res) => {
  const startTime = performance.now();
  try {
    const { audioData, mimeType, isPro, forceError } = req.body;
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';

    if (!audioData) {
      return res.status(400).json({ success: false, error: 'Missing audioData payload' });
    }

    // Magic bytes detection in under 15ms
    const formatInfo = detectAudioFormat(audioData);
    if (!formatInfo.valid) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or unsupported audio binary format. Expected WAV, WebM, or Ogg.'
      });
    }

    const priority = isPro ? 1 : 0;
    const jobId = `job_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO audio_worker_jobs (
        id, user_id, status, priority, mime_type, sample_rate_hz, channels, attempts,
        result_json, error_message, created_at, updated_at
      ) VALUES (?, ?, 'queued', ?, ?, 16000, 1, 0, NULL, ?, ?, ?)
    `).run(
      jobId, userId, priority, formatInfo.mimeType,
      forceError ? 'FORCE_DECODE_ERROR' : null, now, now
    );

    const validationDurationMs = Math.round((performance.now() - startTime) * 100) / 100;

    res.status(202).json({
      status: 'accepted',
      jobId,
      statusUrl: `/api/v1/jobs/${jobId}/status`,
      detectedFormat: formatInfo.format,
      mimeType: formatInfo.mimeType,
      priority: priority === 1 ? 'high_priority_vip' : 'standard',
      validationDurationMs,
      message: 'Audio binary accepted into GPU queue'
    });
  } catch (err) {
    console.error('Error in POST /api/v1/audio/ingest:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/v1/jobs/:jobId/status
app.get('/api/v1/jobs/:jobId/status', (req, res) => {
  try {
    const { jobId } = req.params;
    let job = db.prepare('SELECT * FROM audio_worker_jobs WHERE id = ?').get(jobId);

    if (!job) {
      return res.status(404).json({ success: false, error: 'Job not found' });
    }

    const now = new Date().toISOString();

    // Simulate worker processing if queued
    if (job.status === 'queued') {
      if (job.error_message === 'FORCE_DECODE_ERROR') {
        const retryPolicy = evaluateJobRetryPolicy(job.attempts, 'Corrupted Opus audio stream');
        if (retryPolicy.moveToDlq) {
          db.prepare(`
            UPDATE audio_worker_jobs SET
              status = 'dlq',
              attempts = ?,
              error_message = ?,
              updated_at = ?
            WHERE id = ?
          `).run(retryPolicy.nextAttempt, retryPolicy.dlqReason, now, jobId);
        } else {
          db.prepare(`
            UPDATE audio_worker_jobs SET
              attempts = ?,
              updated_at = ?
            WHERE id = ?
          `).run(retryPolicy.nextAttempt, now, jobId);
        }
      } else {
        // Successful processing through FFmpeg normalization and GPU Whisper/Kaldi
        const normInfo = verifyAudioNormalization({ sampleRateHz: 16000, channels: 1, bitDepth: 16 });
        const mockResult = {
          transcription: 'Six months ago, she baked fresh bread.',
          overallGop: 88,
          phonemeAccuracy: 91.5,
          normalized: normInfo.normalized,
          filterPipeline: normInfo.appliedFilters,
          gpuExecutionMs: 142
        };

        db.prepare(`
          UPDATE audio_worker_jobs SET
            status = 'completed',
            attempts = 1,
            result_json = ?,
            updated_at = ?
          WHERE id = ?
        `).run(JSON.stringify(mockResult), now, jobId);
      }

      job = db.prepare('SELECT * FROM audio_worker_jobs WHERE id = ?').get(jobId);
    }

    res.json({
      success: true,
      jobId: job.id,
      userId: job.user_id,
      status: job.status,
      priority: job.priority,
      attempts: job.attempts,
      result: job.result_json ? JSON.parse(job.result_json) : null,
      errorMessage: job.error_message,
      createdAt: job.created_at,
      updatedAt: job.updated_at
    });
  } catch (err) {
    console.error('Error in GET /api/v1/jobs/:jobId/status:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/v1/jobs/pipeline-metrics
app.get('/api/v1/jobs/pipeline-metrics', (req, res) => {
  try {
    const queuedCount = db.prepare("SELECT COUNT(*) as cnt FROM audio_worker_jobs WHERE status = 'queued'").get().cnt;
    const dlqCount = db.prepare("SELECT COUNT(*) as cnt FROM audio_worker_jobs WHERE status = 'dlq'").get().cnt;
    const completedCount = db.prepare("SELECT COUNT(*) as cnt FROM audio_worker_jobs WHERE status = 'completed'").get().cnt;

    const kedaAutoscale = calculateKedaGpuScale(queuedCount, 2, 2, 16);

    res.json({
      success: true,
      queueDepth: queuedCount,
      dlqCount,
      completedCount,
      kedaAutoscale,
      normalizationSpec: FFMPEG_NORMALIZATION_SPEC
    });
  } catch (err) {
    console.error('Error in GET /api/v1/jobs/pipeline-metrics:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * ARCH-103: Multi-Gateway Subscription Billing & Webhook Reconciliation Endpoints
 */
import {
  GATEWAY_SECRETS,
  generateHmacSha256,
  verifyHmacSha256,
  normalizeGatewayPayload,
  calculateSubscriptionExtension,
  runBankReconciliation
} from '../src/lib/billing/multiGatewayReconciliation.js';

// POST /api/v1/billing/webhook/:gateway
app.post('/api/v1/billing/webhook/:gateway', (req, res) => {
  try {
    const { gateway } = req.params;
    const signature = req.headers['x-signature'];
    const secret = GATEWAY_SECRETS[gateway] || GATEWAY_SECRETS.vietqr;

    // Verify HMAC-SHA256 signature
    const isValid = verifyHmacSha256(req.body, signature, secret);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid HMAC signature' });
    }

    const tx = normalizeGatewayPayload(gateway, req.body);
    const now = new Date().toISOString();

    // Idempotency check: see if transactionId has already been recorded
    const existing = db.prepare('SELECT * FROM billing_webhook_logs WHERE transaction_id = ?').get(tx.transactionId);
    if (existing) {
      return res.status(200).json({
        status: 'already_processed',
        transactionId: tx.transactionId,
        message: 'Idempotent duplicate request recognized; no changes applied'
      });
    }

    // Atomic transaction for subscription activation
    const currentSub = db.prepare('SELECT * FROM arch_subscriptions WHERE user_id = ?').get(tx.userId);
    const newExpiresAt = calculateSubscriptionExtension(currentSub?.current_period_end, tx.planCode);

    db.prepare(`
      INSERT INTO billing_webhook_logs (
        id, gateway, transaction_id, order_code, user_id, amount,
        plan_code, status, signature, created_at, reconciled_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'processed', ?, ?, ?)
    `).run(
      `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      gateway,
      tx.transactionId,
      tx.orderCode,
      tx.userId,
      tx.amount,
      tx.planCode,
      signature,
      now,
      now
    );

    // Update arch_users
    db.prepare("UPDATE arch_users SET tier = 'pro', updated_at = ? WHERE id = ?").run(now, tx.userId);

    // Update or insert arch_subscriptions
    if (currentSub) {
      db.prepare(`
        UPDATE arch_subscriptions SET
          status = 'active',
          plan_code = ?,
          current_period_end = ?
        WHERE user_id = ?
      `).run(tx.planCode, newExpiresAt, tx.userId);
    } else {
      db.prepare(`
        INSERT INTO arch_subscriptions (id, user_id, plan_code, status, current_period_start, current_period_end, created_at)
        VALUES (?, ?, ?, 'active', ?, ?, ?)
      `).run(`sub_${tx.userId}_${Date.now()}`, tx.userId, tx.planCode, now, newExpiresAt, now);
    }

    // Update learner_auth_dashboard_records
    db.prepare("UPDATE learner_auth_dashboard_records SET tier = 'pro', updated_at = ? WHERE user_id = ?").run(now, tx.userId);

    res.status(200).json({
      status: 'activated_success',
      transactionId: tx.transactionId,
      userId: tx.userId,
      gateway,
      planCode: tx.planCode,
      expiresAt: newExpiresAt
    });
  } catch (err) {
    console.error('Error in POST /api/v1/billing/webhook:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/v1/billing/reconcile-cron
app.post('/api/v1/billing/reconcile-cron', (req, res) => {
  try {
    const transactions = req.body.transactions || [];
    const result = runBankReconciliation(db, transactions);

    res.json({
      success: true,
      message: 'Bank reconciliation cron completed',
      ...result
    });
  } catch (err) {
    console.error('Error in POST /api/v1/billing/reconcile-cron:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/v1/billing/reconcile-status
app.get('/api/v1/billing/reconcile-status', (req, res) => {
  try {
    const totalCount = db.prepare('SELECT COUNT(*) as cnt FROM billing_webhook_logs').get().cnt;
    const totalAmount = db.prepare('SELECT COALESCE(SUM(amount), 0) as total FROM billing_webhook_logs').get().total;
    const recentLogs = db.prepare('SELECT * FROM billing_webhook_logs ORDER BY created_at DESC LIMIT 10').all();

    res.json({
      success: true,
      totalCount,
      totalAmount,
      recentLogs
    });
  } catch (err) {
    console.error('Error in GET /api/v1/billing/reconcile-status:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * ARCH-104: Tiered Quota Limiter & Entitlement Enforcement Endpoints
 */
import {
  evaluateSlidingWindow,
  clearSlidingWindowStore,
  checkTierEntitlement
} from '../src/lib/security/slidingWindowRateLimiter.js';

// POST /api/v1/security/rate-limit/check
app.post('/api/v1/security/rate-limit/check', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const endpoint = req.body.endpoint || '/api/v1/scoring';
    const windowMs = Number(req.body.windowMs) || 60000;
    const maxRequests = Number(req.body.maxRequests) || 10;

    const rateResult = evaluateSlidingWindow(`${userId}:${endpoint}`, { windowMs, maxRequests });

    res.setHeader('X-RateLimit-Limit', maxRequests);
    res.setHeader('X-RateLimit-Remaining', rateResult.remaining);

    if (!rateResult.allowed) {
      res.setHeader('Retry-After', rateResult.retryAfterSec);
      return res.status(429).json({
        type: 'https://vietphonics.com/errors/rate-limit-exceeded',
        title: 'Tần Suất Yêu Cầu Vượt Quá Giới Hạn (Rate Limit Exceeded)',
        status: 429,
        detail: `Bạn đã thực hiện quá ${maxRequests} yêu cầu trong 60 giây. Vui lòng thử lại sau ${rateResult.retryAfterSec} giây.`,
        retryAfter: rateResult.retryAfterSec,
        endpoint
      });
    }

    // Persist log into SQLite
    const now = new Date().toISOString();
    db.prepare(`
      INSERT INTO rate_limit_sliding_window_logs (id, user_id, endpoint, timestamp_ms, created_at)
      VALUES (?, ?, ?, ?, ?)
    `).run(`rl_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`, userId, endpoint, Date.now(), now);

    res.json({
      allowed: true,
      currentCount: rateResult.currentCount,
      remaining: rateResult.remaining,
      resetAfterSec: rateResult.resetAfterSec
    });
  } catch (err) {
    console.error('Error in POST /api/v1/security/rate-limit/check:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/v1/security/entitlements/:userId
app.get('/api/v1/security/entitlements/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const today = new Date().toISOString().split('T')[0];

    // Check user tier
    let user = db.prepare('SELECT * FROM arch_users WHERE id = ?').get(userId);
    if (!user) {
      const learner = db.prepare('SELECT * FROM learner_auth_dashboard_records WHERE user_id = ?').get(userId);
      user = { id: userId, tier: learner?.tier || 'free' };
    }

    // Check today's lesson usage
    const quotaRow = db.prepare('SELECT * FROM freemium_quota_records WHERE user_id = ? AND date_str = ?').get(userId, today);
    const lessonsToday = quotaRow ? quotaRow.lessons_completed_today : 0;

    const entitlement = checkTierEntitlement(user, lessonsToday);

    if (!entitlement.allowed) {
      return res.status(429).json(entitlement.problemDetails);
    }

    res.json({
      success: true,
      userId,
      tier: entitlement.tier,
      allowed: true,
      remainingLessons: entitlement.remainingLessons,
      verificationLatencyMs: entitlement.latencyMs
    });
  } catch (err) {
    console.error('Error in GET /api/v1/security/entitlements:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * ARCH-105: Cloud Object Storage & Ephemeral Audio Retention Endpoints
 */
import {
  R2_CONFIG,
  createAudioUploadTicket,
  calculateRetentionPolicy,
  isAudioObjectExpired,
  validateCorsOrigin,
  purgeExpiredAudioObjects
} from '../src/lib/storage/r2StorageManager.js';

// GET /api/v1/storage/upload-ticket
app.get('/api/v1/storage/upload-ticket', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.query.userId || 'default_user';
    const extension = req.query.extension || 'opus';
    const mimeType = req.query.mimeType || 'audio/opus';

    const ticket = createAudioUploadTicket({ userId, extension, mimeType });

    res.json({
      success: true,
      ticket
    });
  } catch (err) {
    console.error('Error in GET /api/v1/storage/upload-ticket:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/v1/storage/register-uploaded-file
app.post('/api/v1/storage/register-uploaded-file', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'default_user';
    const { storageKey, fileSizeBytes = 48200, mimeType = 'audio/opus' } = req.body;

    if (!storageKey) {
      return res.status(400).json({ success: false, error: 'storageKey is required' });
    }

    // Determine tier
    let user = db.prepare('SELECT tier FROM arch_users WHERE id = ?').get(userId);
    const tier = user ? user.tier : 'free';

    const policy = calculateRetentionPolicy(tier);
    const now = new Date().toISOString();
    const objectId = `obj_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    db.prepare(`
      INSERT INTO storage_audio_objects (
        id, user_id, storage_key, bucket_name, content_type,
        file_size_bytes, tier, retention_days, expires_at, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      objectId, userId, storageKey, R2_CONFIG.bucketName, mimeType,
      Number(fileSizeBytes), tier, policy.retentionDays, policy.expiresAt, now
    );

    res.json({
      success: true,
      objectId,
      storageKey,
      tier,
      retentionDays: policy.retentionDays,
      expiresAt: policy.expiresAt
    });
  } catch (err) {
    console.error('Error in POST /api/v1/storage/register-uploaded-file:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/v1/storage/purge-expired
app.post('/api/v1/storage/purge-expired', (req, res) => {
  try {
    const simulatedNowIso = req.body.simulatedNowIso || new Date().toISOString();
    const result = purgeExpiredAudioObjects(db, simulatedNowIso);

    res.json({
      success: true,
      ...result,
      purgedAt: simulatedNowIso
    });
  } catch (err) {
    console.error('Error in POST /api/v1/storage/purge-expired:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/v1/storage/cors-check
app.get('/api/v1/storage/cors-check', (req, res) => {
  try {
    const origin = req.headers['origin'] || req.query.origin || '';
    const isAllowed = validateCorsOrigin(origin);

    if (!isAllowed) {
      return res.status(403).json({
        allowed: false,
        error: 'Origin rejected by R2 Bucket CORS security policy',
        origin
      });
    }

    res.json({
      allowed: true,
      origin,
      bucket: R2_CONFIG.bucketName
    });
  } catch (err) {
    console.error('Error in GET /api/v1/storage/cors-check:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * PAY-101, PAY-102, PAY-103: Dynamic VietQR Napas & Pricing Matrix Endpoints
 */
import {
  BANK_CONFIG,
  PRICING_PLANS,
  FEATURE_COMPARISON,
  generateVietQrEmvcoString,
  getVietQrImageUrl,
  buildBankingDeepLink,
  generateOrderMemo
} from '../src/lib/payment/vietQrEmvco.js';

// GET /api/v1/pricing/matrix
app.get('/api/v1/pricing/matrix', (req, res) => {
  try {
    res.json({
      success: true,
      plans: PRICING_PLANS,
      featureComparison: FEATURE_COMPARISON,
      bankConfig: BANK_CONFIG
    });
  } catch (err) {
    console.error('Error in GET /api/v1/pricing/matrix:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/v1/payment/vietqr/create-order
app.post('/api/v1/payment/vietqr/create-order', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'learner_vip';
    const planId = req.body.planId || 'pro_annual';

    const selectedPlan = PRICING_PLANS.find(p => p.id === planId) || PRICING_PLANS[1];
    const orderId = `vqr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const orderCode = generateOrderMemo(userId, selectedPlan.id);
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 15 * 60 * 1000).toISOString();

    const qrPayload = generateVietQrEmvcoString({
      bankBin: BANK_CONFIG.bin,
      accountNumber: BANK_CONFIG.accountNumber,
      amount: selectedPlan.price,
      orderCode
    });

    const qrImageUrl = getVietQrImageUrl({
      bankBin: BANK_CONFIG.bin,
      accountNumber: BANK_CONFIG.accountNumber,
      amount: selectedPlan.price,
      orderCode,
      accountName: BANK_CONFIG.accountName
    });

    const deepLink = buildBankingDeepLink({
      bankBin: BANK_CONFIG.bin,
      accountNumber: BANK_CONFIG.accountNumber,
      amount: selectedPlan.price,
      orderCode
    });

    db.prepare(`
      INSERT INTO vietqr_orders (
        id, order_code, user_id, plan_code, amount,
        bank_bin, account_number, account_name,
        status, qr_payload, expires_at, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      orderId,
      orderCode,
      userId,
      selectedPlan.id,
      selectedPlan.price,
      BANK_CONFIG.bin,
      BANK_CONFIG.accountNumber,
      BANK_CONFIG.accountName,
      'pending',
      qrPayload,
      expiresAt,
      now.toISOString()
    );

    res.json({
      success: true,
      order: {
        id: orderId,
        orderCode,
        userId,
        planId: selectedPlan.id,
        planName: selectedPlan.name,
        amount: selectedPlan.price,
        bankBin: BANK_CONFIG.bin,
        bankName: BANK_CONFIG.shortName,
        accountNumber: BANK_CONFIG.accountNumber,
        accountName: BANK_CONFIG.accountName,
        qrPayload,
        qrImageUrl,
        deepLink,
        expiresAt,
        status: 'pending'
      }
    });
  } catch (err) {
    console.error('Error in POST /api/v1/payment/vietqr/create-order:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/v1/payment/vietqr/order/:orderCode/status
app.get('/api/v1/payment/vietqr/order/:orderCode/status', (req, res) => {
  try {
    const { orderCode } = req.params;
    const order = db.prepare('SELECT * FROM vietqr_orders WHERE order_code = ?').get(orderCode);

    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    let status = order.status;
    if (status === 'pending' && new Date(order.expires_at) < new Date()) {
      status = 'expired';
      db.prepare('UPDATE vietqr_orders SET status = ? WHERE order_code = ?').run('expired', orderCode);
    }

    res.json({
      success: true,
      orderCode: order.order_code,
      status,
      amount: order.amount,
      planCode: order.plan_code,
      userId: order.user_id,
      expiresAt: order.expires_at,
      paidAt: order.paid_at || null
    });
  } catch (err) {
    console.error('Error in GET /api/v1/payment/vietqr/order/:orderCode/status:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/v1/payment/vietqr/simulate-bank-transfer
app.post('/api/v1/payment/vietqr/simulate-bank-transfer', (req, res) => {
  try {
    const { orderCode } = req.body;
    if (!orderCode) {
      return res.status(400).json({ success: false, error: 'orderCode is required' });
    }

    const order = db.prepare('SELECT * FROM vietqr_orders WHERE order_code = ?').get(orderCode);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    const nowIso = new Date().toISOString();

    if (order.status === 'paid') {
      return res.json({
        success: true,
        alreadyPaid: true,
        orderCode,
        status: 'paid',
        paidAt: order.paid_at
      });
    }

    // Mark order as paid
    db.prepare('UPDATE vietqr_orders SET status = ?, paid_at = ? WHERE order_code = ?').run('paid', nowIso, orderCode);

    // Upsert or update arch_users tier to pro
    const existingUser = db.prepare('SELECT id FROM arch_users WHERE id = ?').get(order.user_id);
    if (existingUser) {
      db.prepare('UPDATE arch_users SET tier = ?, updated_at = ? WHERE id = ?').run('pro', nowIso, order.user_id);
    } else {
      db.prepare(`
        INSERT INTO arch_users (id, email, full_name, dialect_preference, tier, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(order.user_id, `${order.user_id}@vietphonics.com`, 'VietPhonics Pro Learner', 'northern', 'pro', nowIso, nowIso);
    }

    // Update freemium_quota_records
    const today = new Date().toISOString().split('T')[0];
    const existingQuota = db.prepare('SELECT id FROM freemium_quota_records WHERE user_id = ? AND date_str = ?').get(order.user_id, today);
    if (existingQuota) {
      db.prepare('UPDATE freemium_quota_records SET is_pro = 1, updated_at = ? WHERE user_id = ? AND date_str = ?').run(nowIso, order.user_id, today);
    } else {
      db.prepare(`
        INSERT INTO freemium_quota_records (id, user_id, is_pro, lessons_completed_today, date_str, updated_at)
        VALUES (?, ?, 1, 0, ?, ?)
      `).run(`quota_${Date.now()}`, order.user_id, today, nowIso);
    }

    // Insert active subscription record
    const subId = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const periodEnd = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
    db.prepare(`
      INSERT INTO arch_subscriptions (id, user_id, plan_code, status, current_period_start, current_period_end, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(subId, order.user_id, order.plan_code, 'active', nowIso, periodEnd, nowIso);

    // Record webhook log for multi-gateway traceability
    const txId = `tx_vqr_${Date.now()}`;
    db.prepare(`
      INSERT INTO billing_webhook_logs (id, gateway, transaction_id, order_code, user_id, amount, plan_code, status, created_at, reconciled_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(`log_${Date.now()}`, 'vietqr', txId, orderCode, order.user_id, order.amount, order.plan_code, 'success', nowIso, nowIso);

    res.json({
      success: true,
      orderCode,
      status: 'paid',
      activatedTier: 'pro',
      userId: order.user_id,
      planCode: order.plan_code,
      amount: order.amount,
      paidAt: nowIso
    });
  } catch (err) {
    console.error('Error in POST /api/v1/payment/vietqr/simulate-bank-transfer:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * PAY-104: Automated Grace Period & Expiring Subscription Reminders Endpoints
 */
import {
  runSubscriptionLifecycleCron,
  evaluateSubscriptionLifecycle
} from '../src/lib/billing/subscriptionGracePeriod.js';

// POST /api/v1/billing/subscription/check-expiring-cron
app.post('/api/v1/billing/subscription/check-expiring-cron', (req, res) => {
  try {
    const simulatedNow = req.body.simulatedNow ? new Date(req.body.simulatedNow) : new Date();
    const result = runSubscriptionLifecycleCron(db, simulatedNow);
    res.json({ success: true, ...result });
  } catch (err) {
    console.error('Error in check-expiring-cron:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/v1/billing/subscription/audit-logs/:userId
app.get('/api/v1/billing/subscription/audit-logs/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const logs = db.prepare('SELECT * FROM subscription_audit_logs WHERE user_id = ? ORDER BY created_at DESC').all(userId);
    res.json({ success: true, logs });
  } catch (err) {
    console.error('Error in subscription audit-logs:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/v1/billing/subscription/status/:userId
app.get('/api/v1/billing/subscription/status/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const sub = db.prepare("SELECT * FROM arch_subscriptions WHERE user_id = ? ORDER BY created_at DESC LIMIT 1").get(userId);
    const notifications = db.prepare("SELECT * FROM subscription_notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 5").all(userId);

    if (!sub) {
      return res.json({ success: true, hasSubscription: false, status: 'free', notifications });
    }

    const evaluation = evaluateSubscriptionLifecycle(sub);
    res.json({
      success: true,
      hasSubscription: true,
      subscription: sub,
      status: sub.status,
      graceDaysLeft: evaluation.graceDaysLeft,
      isExpiringAlert: evaluation.isExpiringAlert,
      notifications
    });
  } catch (err) {
    console.error('Error in subscription status:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * ADV-101: Golden Speaker Voice-Cloned Self Model Endpoints
 */
import {
  extractSpeakerEmbedding,
  calculateCosineSimilarity,
  synthesizeGoldenSpeakerChannels
} from '../src/lib/ai/goldenSpeakerEngine.js';

// POST /api/v1/ai/golden-speaker/calibrate
app.post('/api/v1/ai/golden-speaker/calibrate', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'learner_vip';
    const { audioFeatures = [140, 1850, 0.72, 500, 1500] } = req.body;

    const embedding = extractSpeakerEmbedding(userId, audioFeatures);
    const cosineSimilarity = 0.93;
    const nowIso = new Date().toISOString();

    const existing = db.prepare('SELECT id FROM golden_speaker_embeddings WHERE user_id = ?').get(userId);
    if (existing) {
      db.prepare(`
        UPDATE golden_speaker_embeddings
        SET embedding_json = ?, cosine_similarity = ?, updated_at = ?
        WHERE user_id = ?
      `).run(JSON.stringify(embedding), cosineSimilarity, nowIso, userId);
    } else {
      db.prepare(`
        INSERT INTO golden_speaker_embeddings (id, user_id, embedding_json, cosine_similarity, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(`emb_${Date.now()}`, userId, JSON.stringify(embedding), cosineSimilarity, nowIso, nowIso);
    }

    res.json({
      success: true,
      userId,
      embeddingLength: embedding.length,
      cosineSimilarity,
      status: 'calibrated'
    });
  } catch (err) {
    console.error('Error in golden-speaker/calibrate:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/v1/ai/golden-speaker/synthesize
app.post('/api/v1/ai/golden-speaker/synthesize', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'learner_vip';
    const { word = 'specifically', targetIpa = '/spəˈsɪfɪkli/' } = req.body;

    const embRow = db.prepare('SELECT embedding_json FROM golden_speaker_embeddings WHERE user_id = ?').get(userId);
    const userEmbedding = embRow ? JSON.parse(embRow.embedding_json) : null;

    const channelsData = synthesizeGoldenSpeakerChannels({ userId, word, targetIpa, userEmbedding });
    const sessionId = `gss_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const nowIso = new Date().toISOString();

    db.prepare(`
      INSERT INTO golden_speaker_sessions (id, user_id, word, target_ipa, similarity_score, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(sessionId, userId, word, targetIpa, channelsData.timbreSimilarity, nowIso);

    res.json({
      success: true,
      sessionId,
      ...channelsData
    });
  } catch (err) {
    console.error('Error in golden-speaker/synthesize:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/v1/ai/golden-speaker/profile/:userId
app.get('/api/v1/ai/golden-speaker/profile/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const embRow = db.prepare('SELECT * FROM golden_speaker_embeddings WHERE user_id = ?').get(userId);
    const recentSessions = db.prepare('SELECT * FROM golden_speaker_sessions WHERE user_id = ? ORDER BY created_at DESC LIMIT 5').all(userId);

    res.json({
      success: true,
      isCalibrated: Boolean(embRow),
      cosineSimilarity: embRow ? embRow.cosine_similarity : null,
      recentSessions
    });
  } catch (err) {
    console.error('Error in golden-speaker/profile:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * ADV-102: Webcam Lip & Jaw Tracking Endpoints
 */
import {
  evaluatePhonemeLipTarget
} from '../src/lib/cv/lipTrackingEngine.js';

// POST /api/v1/ai/lip-tracking/record
app.post('/api/v1/ai/lip-tracking/record', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'learner_vip';
    const { phonemeKey = 'ae', telemetry = { jawOpening: 80, lipSpread: 50, lipRounding: 50 } } = req.body;

    const evaluation = evaluatePhonemeLipTarget(phonemeKey, telemetry);
    const recordId = `lip_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const nowIso = new Date().toISOString();

    db.prepare(`
      INSERT INTO webcam_lip_tracking_records (
        id, user_id, phoneme, jaw_openness, lip_spread, lip_rounding,
        target_met, score, advice, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      recordId,
      userId,
      evaluation.phoneme,
      telemetry.jawOpening || 0,
      telemetry.lipSpread || 0,
      telemetry.lipRounding || 0,
      evaluation.isTargetMet ? 1 : 0,
      evaluation.score,
      evaluation.advice,
      nowIso
    );

    res.json({
      success: true,
      recordId,
      evaluation
    });
  } catch (err) {
    console.error('Error in lip-tracking/record:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/v1/ai/lip-tracking/history/:userId
app.get('/api/v1/ai/lip-tracking/history/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const history = db.prepare('SELECT * FROM webcam_lip_tracking_records WHERE user_id = ? ORDER BY created_at DESC LIMIT 10').all(userId);
    res.json({ success: true, history });
  } catch (err) {
    console.error('Error in lip-tracking/history:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * ADV-103: Live Vowel Space Chart Endpoints
 */
import {
  evaluateVowelFormants,
  VOWEL_FORMANT_TARGETS
} from '../src/lib/audio/formantAnalysis.js';

// GET /api/v1/ai/vowel-space/targets
app.get('/api/v1/ai/vowel-space/targets', (req, res) => {
  try {
    res.json({ success: true, targets: VOWEL_FORMANT_TARGETS });
  } catch (err) {
    console.error('Error in vowel-space/targets:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/v1/ai/vowel-space/evaluate
app.post('/api/v1/ai/vowel-space/evaluate', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'learner_vip';
    const { targetSymbol = '/iː/', userF1 = 280, userF2 = 2250 } = req.body;

    const evalResult = evaluateVowelFormants(targetSymbol, Number(userF1), Number(userF2));
    const recordId = `vow_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const nowIso = new Date().toISOString();

    db.prepare(`
      INSERT INTO vowel_space_records (
        id, user_id, target_symbol, user_f1, user_f2, delta_f1, delta_f2,
        is_in_target, score, advice, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      recordId,
      userId,
      targetSymbol,
      evalResult.userF1,
      evalResult.userF2,
      evalResult.deltaF1,
      evalResult.deltaF2,
      evalResult.isInTarget ? 1 : 0,
      evalResult.score,
      evalResult.advice,
      nowIso
    );

    res.json({
      success: true,
      recordId,
      ...evalResult
    });
  } catch (err) {
    console.error('Error in vowel-space/evaluate:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * ADV-104: AI Phonetics Coach Long-Term Context Memory Endpoints
 */
import {
  getOrCreateCoachMemoryProfile,
  generateCoachResponse
} from '../src/lib/ai/phoneticsCoachMemory.js';

// GET /api/v1/ai/coach/memory-profile/:userId
app.get('/api/v1/ai/coach/memory-profile/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const profile = getOrCreateCoachMemoryProfile(userId);
    res.json({ success: true, profile });
  } catch (err) {
    console.error('Error in coach/memory-profile:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/v1/ai/coach/chat-stream
app.post('/api/v1/ai/coach/chat-stream', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'learner_vip';
    const { prompt = '' } = req.body;

    const profile = getOrCreateCoachMemoryProfile(userId);
    const result = generateCoachResponse(prompt, profile);
    const nowIso = new Date().toISOString();

    // Persist user and assistant messages
    const userMsgId = `cmsg_${Date.now()}_u`;
    const asstMsgId = `cmsg_${Date.now()}_a`;

    db.prepare(`
      INSERT INTO ai_coach_chat_messages (id, user_id, role, message, created_at)
      VALUES (?, ?, ?, ?, ?)
    `).run(userMsgId, userId, 'user', prompt, nowIso);

    db.prepare(`
      INSERT INTO ai_coach_chat_messages (id, user_id, role, message, articulatory_tip_json, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(asstMsgId, userId, 'assistant', result.responseText, JSON.stringify(result.articulatoryTip), nowIso);

    res.json({
      success: true,
      ...result,
      createdAt: nowIso
    });
  } catch (err) {
    console.error('Error in coach/chat-stream:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * ADV-105: Connected Speech Lab Endpoints
 */
import {
  CONNECTED_SPEECH_DRILLS,
  evaluateConnectedSpeechFlow
} from '../src/lib/audio/connectedSpeechEngine.js';

// GET /api/v1/ai/connected-speech/sentences
app.get('/api/v1/ai/connected-speech/sentences', (req, res) => {
  try {
    res.json({ success: true, drills: CONNECTED_SPEECH_DRILLS });
  } catch (err) {
    console.error('Error in connected-speech/sentences:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/v1/ai/connected-speech/evaluate
app.post('/api/v1/ai/connected-speech/evaluate', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'learner_vip';
    const { drillId = 'cs_hold_on', measuredBoundaries = [] } = req.body;

    const evalResult = evaluateConnectedSpeechFlow(drillId, measuredBoundaries);
    const recordId = `cs_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const nowIso = new Date().toISOString();

    db.prepare(`
      INSERT INTO connected_speech_records (
        id, user_id, drill_id, sentence, flow_score, staccato_count, evaluation_json, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      recordId,
      userId,
      evalResult.drillId,
      evalResult.sentence,
      evalResult.flowScore,
      evalResult.staccatoCount,
      JSON.stringify(evalResult.evaluatedPairs),
      nowIso
    );

    res.json({
      success: true,
      recordId,
      ...evalResult
    });
  } catch (err) {
    console.error('Error in connected-speech/evaluate:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/v1/ai/connected-speech/history/:userId
app.get('/api/v1/ai/connected-speech/history/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const rows = db.prepare('SELECT * FROM connected_speech_records WHERE user_id = ? ORDER BY created_at DESC LIMIT 10').all(userId);
    res.json({ success: true, history: rows });
  } catch (err) {
    console.error('Error in connected-speech/history:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * ADV-106: Intelligibility Score & Multi-ASR Listener Panel Endpoints
 */
import {
  SEMANTIC_RISK_DICTIONARY,
  VIRTUAL_LISTENERS,
  evaluateIntelligibility
} from '../src/lib/ai/intelligibilityEngine.js';

// GET /api/v1/ai/intelligibility/semantic-risk-pairs
app.get('/api/v1/ai/intelligibility/semantic-risk-pairs', (req, res) => {
  try {
    res.json({ success: true, riskDictionary: SEMANTIC_RISK_DICTIONARY, listeners: VIRTUAL_LISTENERS });
  } catch (err) {
    console.error('Error in intelligibility/semantic-risk-pairs:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/v1/ai/intelligibility/evaluate
app.post('/api/v1/ai/intelligibility/evaluate', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'learner_vip';
    const { spokenText = '', mispronouncedWords = [] } = req.body;

    const evalResult = evaluateIntelligibility({ spokenText, mispronouncedWords });
    const recordId = `intel_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const nowIso = new Date().toISOString();

    db.prepare(`
      INSERT INTO intelligibility_evaluations (
        id, user_id, spoken_text, global_score, listener_scores_json, semantic_risks_json, has_high_risk, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      recordId,
      userId,
      evalResult.spokenText,
      evalResult.globalIntelligibility,
      JSON.stringify(evalResult.listenerScores),
      JSON.stringify(evalResult.semanticRisks),
      evalResult.hasHighRiskAlert ? 1 : 0,
      nowIso
    );

    res.json({
      success: true,
      recordId,
      ...evalResult
    });
  } catch (err) {
    console.error('Error in intelligibility/evaluate:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/v1/ai/intelligibility/history/:userId
app.get('/api/v1/ai/intelligibility/history/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const rows = db.prepare('SELECT * FROM intelligibility_evaluations WHERE user_id = ? ORDER BY created_at DESC LIMIT 10').all(userId);
    res.json({ success: true, history: rows });
  } catch (err) {
    console.error('Error in intelligibility/history:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * ADV-107: Spontaneous Speech Voice Journal Endpoints
 */
import {
  VOICE_JOURNAL_PROMPTS,
  evaluateSpontaneousJournalEntry
} from '../src/lib/audio/voiceJournalEngine.js';

// GET /api/v1/ai/voice-journal/prompts
app.get('/api/v1/ai/voice-journal/prompts', (req, res) => {
  try {
    res.json({ success: true, prompts: VOICE_JOURNAL_PROMPTS });
  } catch (err) {
    console.error('Error in voice-journal/prompts:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/v1/ai/voice-journal/entry
app.post('/api/v1/ai/voice-journal/entry', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'learner_vip';
    const {
      promptId = 'vj_p1',
      rawTranscript = '',
      durationSeconds = 45,
      baselineReadAloudScore = 85
    } = req.body;

    const evalResult = evaluateSpontaneousJournalEntry({
      promptId,
      rawTranscript,
      durationSeconds: Number(durationSeconds),
      baselineReadAloudScore: Number(baselineReadAloudScore)
    });

    const recordId = `vj_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const nowIso = new Date().toISOString();

    db.prepare(`
      INSERT INTO voice_journal_entries (
        id, user_id, prompt_id, transcript, duration_seconds, wpm,
        baseline_score, spontaneous_score, transfer_gap, aligned_words_json, fillers_json, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      recordId,
      userId,
      evalResult.promptId,
      evalResult.transcript,
      evalResult.durationSeconds,
      evalResult.wpm,
      evalResult.baselineReadAloudScore,
      evalResult.spontaneousScore,
      evalResult.transferGap,
      JSON.stringify(evalResult.alignedWords),
      JSON.stringify(evalResult.detectedFillers),
      nowIso
    );

    res.json({
      success: true,
      recordId,
      ...evalResult
    });
  } catch (err) {
    console.error('Error in voice-journal/entry:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/v1/ai/voice-journal/history/:userId
app.get('/api/v1/ai/voice-journal/history/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const rows = db.prepare('SELECT * FROM voice_journal_entries WHERE user_id = ? ORDER BY created_at DESC LIMIT 10').all(userId);
    res.json({ success: true, history: rows });
  } catch (err) {
    console.error('Error in voice-journal/history:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * ADV-108: Accent Explorer & Target Dialect Selector Endpoints
 */
import {
  TARGET_DIALECTS,
  ACCENT_CONTRAST_WORDS,
  evaluateDialectProximity
} from '../src/lib/audio/accentExplorerEngine.js';

// GET /api/v1/ai/accent-explorer/dialects
app.get('/api/v1/ai/accent-explorer/dialects', (req, res) => {
  try {
    res.json({
      success: true,
      dialects: TARGET_DIALECTS,
      contrastWords: ACCENT_CONTRAST_WORDS
    });
  } catch (err) {
    console.error('Error in accent-explorer/dialects:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/v1/ai/accent-explorer/select-target
app.post('/api/v1/ai/accent-explorer/select-target', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'learner_vip';
    const { dialectCode = 'us', userTelemetry = {} } = req.body;

    const evalResult = evaluateDialectProximity(dialectCode, userTelemetry);
    const nowIso = new Date().toISOString();
    const recordId = `dial_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    db.prepare(`
      INSERT INTO user_target_dialects (id, user_id, dialect_code, proximity_score, updated_at)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(user_id) DO UPDATE SET
        dialect_code = excluded.dialect_code,
        proximity_score = excluded.proximity_score,
        updated_at = excluded.updated_at
    `).run(recordId, userId, dialectCode, evalResult.proximityPercent, nowIso);

    res.json({
      success: true,
      userId,
      dialectCode,
      ...evalResult,
      updatedAt: nowIso
    });
  } catch (err) {
    console.error('Error in accent-explorer/select-target:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/v1/ai/accent-explorer/user-target/:userId
app.get('/api/v1/ai/accent-explorer/user-target/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const row = db.prepare('SELECT * FROM user_target_dialects WHERE user_id = ?').get(userId);
    const dialectCode = row ? row.dialect_code : 'us';
    const evalResult = evaluateDialectProximity(dialectCode);

    res.json({
      success: true,
      userId,
      selectedDialectCode: dialectCode,
      proximityScore: row ? row.proximity_score : evalResult.proximityPercent,
      ...evalResult
    });
  } catch (err) {
    console.error('Error in accent-explorer/user-target:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * BATCH 12 IMPLEMENTATION: USER-106, USER-103, USER-104
 * ─────────────────────────────────────────────────────────────────────────────
 */
import {
  validateEmailAddress,
  validatePasswordStrength,
  hashPassword,
  verifyPassword,
  hashTokenSha256,
  generateEmailVerificationOtp,
  generatePasswordResetToken,
  authRateLimiter,
  parseDeviceFromUserAgent
} from '../src/lib/auth/authSecurityManager.js';

/**
 * USER-106: Email Sign-Up & Verification
 */

// POST /api/v1/auth/email/register
app.post('/api/v1/auth/email/register', (req, res) => {
  try {
    const {
      email,
      password,
      displayName,
      l1Dialect = 'bac',
      learningGoal = 'communication',
      consentedToTerms = false
    } = req.body;

    // Gate L6: Terms & Privacy policy consent required
    if (!consentedToTerms) {
      return res.status(400).json({
        success: false,
        error: 'Bạn phải đồng ý với Điều khoản dịch vụ và Chính sách bảo mật (Nghị định 13/2023) để đăng ký tài khoản.'
      });
    }

    // Email validation & disposable domain check (Gate F8)
    const emailValidation = validateEmailAddress(email);
    if (!emailValidation.valid) {
      return res.status(400).json({ success: false, error: emailValidation.error });
    }
    const cleanEmail = email.trim().toLowerCase();

    // Password strength check (Gate F1)
    const pwdValidation = validatePasswordStrength(password);
    if (!pwdValidation.valid) {
      return res.status(400).json({
        success: false,
        error: pwdValidation.feedback.join('. '),
        details: pwdValidation.feedback
      });
    }

    // Rate limit: Max 5 registration attempts per IP in 10 minutes (Gate F7)
    const clientIp = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';
    const regLimit = authRateLimiter.check(`reg_ip:${clientIp}`, 5, 10 * 60 * 1000);
    if (!regLimit.allowed) {
      return res.status(429).json({
        success: false,
        error: `Quá nhiều lượt đăng ký từ địa chỉ này. Vui lòng thử lại sau ${regLimit.retryAfterSeconds} giây.`
      });
    }

    const now = new Date().toISOString();
    let account = db.prepare('SELECT * FROM auth_accounts WHERE email = ?').get(cleanEmail);

    if (account) {
      if (account.status === 'active') {
        // Anti-enumeration: neutral response (Gate F8)
        return res.json({
          success: true,
          message: 'Nếu email chưa có tài khoản, hướng dẫn kích hoạt đã được gửi.',
          alreadyRegistered: true
        });
      }
      // If pending verification, update password hash and re-send OTP
      const pwdHash = hashPassword(password);
      db.prepare('UPDATE auth_accounts SET password_hash = ?, display_name = ?, l1_dialect = ?, learning_goal = ?, updated_at = ? WHERE id = ?')
        .run(pwdHash, displayName || cleanEmail.split('@')[0], l1Dialect, learningGoal, now, account.id);
    } else {
      const accountId = `acc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const pwdHash = hashPassword(password);
      db.prepare(`
        INSERT INTO auth_accounts (
          id, email, password_hash, display_name, l1_dialect, learning_goal,
          status, tier, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, 'pending_verification', 'free', ?, ?)
      `).run(accountId, cleanEmail, pwdHash, displayName || cleanEmail.split('@')[0], l1Dialect, learningGoal, now, now);

      account = db.prepare('SELECT * FROM auth_accounts WHERE id = ?').get(accountId);
    }

    // Invalidate prior unused OTPs
    db.prepare('UPDATE email_verification_tokens SET used_at = ? WHERE account_id = ? AND used_at IS NULL').run(now, account.id);

    // Generate new OTP & Token
    const { otpCode, rawToken, tokenHash, expiresAt } = generateEmailVerificationOtp();
    const tokenId = `evt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    db.prepare(`
      INSERT INTO email_verification_tokens (
        id, account_id, token_hash, otp_code, expires_at, created_at
      ) VALUES (?, ?, ?, ?, ?, ?)
    `).run(tokenId, account.id, tokenHash, otpCode, expiresAt, now);

    res.status(201).json({
      success: true,
      message: 'Mã xác thực OTP đã được gửi đến email của bạn. Mã có hiệu lực trong 15 phút.',
      accountId: account.id,
      email: cleanEmail,
      otpPreview: otpCode, // For demo/testing convenience
      expiresAt
    });
  } catch (err) {
    console.error('Error in /api/v1/auth/email/register:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/v1/auth/email/verify
app.post('/api/v1/auth/email/verify', (req, res) => {
  try {
    const { email, otpCode } = req.body;
    if (!email || !otpCode) {
      return res.status(400).json({ success: false, error: 'Email và mã OTP là bắt buộc' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const account = db.prepare('SELECT * FROM auth_accounts WHERE email = ?').get(cleanEmail);
    if (!account) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy tài khoản với email này' });
    }

    if (account.status === 'active') {
      return res.json({
        success: true,
        message: 'Tài khoản đã được xác minh trước đó.',
        account: {
          id: account.id,
          email: account.email,
          displayName: account.display_name,
          tier: account.tier,
          status: account.status
        }
      });
    }

    const tokenRow = db.prepare(`
      SELECT * FROM email_verification_tokens
      WHERE account_id = ? AND used_at IS NULL
      ORDER BY created_at DESC LIMIT 1
    `).get(account.id);

    if (!tokenRow) {
      return res.status(422).json({
        success: false,
        error: 'Mã xác thực không tồn tại hoặc đã được sử dụng. Vui lòng bấm "Gửi lại mã".'
      });
    }

    const now = new Date();
    if (now > new Date(tokenRow.expires_at)) {
      return res.status(422).json({
        success: false,
        error: 'Mã xác thực đã hết hạn (sau 15 phút). Vui lòng yêu cầu mã mới.'
      });
    }

    if (tokenRow.attempts >= 5) {
      return res.status(429).json({
        success: false,
        error: 'Bạn đã nhập sai mã xác thực quá 5 lần. Vui lòng yêu cầu mã mới.'
      });
    }

    if (tokenRow.otp_code !== otpCode.trim()) {
      db.prepare('UPDATE email_verification_tokens SET attempts = attempts + 1 WHERE id = ?').run(tokenRow.id);
      const remaining = 5 - (tokenRow.attempts + 1);
      return res.status(422).json({
        success: false,
        error: `Mã OTP không chính xác. Bạn còn ${remaining} lần thử.`
      });
    }

    // Mark token as used
    const nowIso = now.toISOString();
    db.prepare('UPDATE email_verification_tokens SET used_at = ?, attempts = attempts + 1 WHERE id = ?').run(nowIso, tokenRow.id);

    // Activate account
    db.prepare('UPDATE auth_accounts SET status = \'active\', email_verified_at = ?, updated_at = ? WHERE id = ?')
      .run(nowIso, nowIso, account.id);

    // Sync to user_profiles and learner_auth_dashboard_records
    db.prepare(`
      INSERT INTO user_profiles (id, user_id, dialect, calibration_mode, confidence_score, ielts_target, overall_gop, created_at, updated_at)
      VALUES (?, ?, ?, 'manual_selection', 0.90, 7.5, 75, ?, ?)
      ON CONFLICT(user_id) DO UPDATE SET dialect = excluded.dialect, updated_at = excluded.updated_at
    `).run(`prof_${account.id}`, account.id, account.l1_dialect, nowIso, nowIso);

    // Create session (USER-104)
    const userAgent = req.headers['user-agent'] || 'VietPhonics Web App';
    const { deviceName, deviceType } = parseDeviceFromUserAgent(userAgent);
    const sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const sessionTokenHash = hashTokenSha256(`token_${account.id}_${Date.now()}`);

    db.prepare(`
      INSERT INTO user_active_sessions (
        id, account_id, refresh_token_hash, device_name, device_type,
        user_agent, ip_address, location_estimate, last_active_at, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'Việt Nam', ?, ?)
    `).run(sessionId, account.id, sessionTokenHash, deviceName, deviceType, userAgent, req.ip || '127.0.0.1', nowIso, nowIso);

    const authToken = generateAuthToken(account.id, account.email);

    res.json({
      success: true,
      message: 'Kích hoạt tài khoản thành công! Chào mừng bạn đến với VietPhonics.',
      token: authToken,
      sessionId,
      account: {
        id: account.id,
        email: account.email,
        displayName: account.display_name,
        l1Dialect: account.l1_dialect,
        learningGoal: account.learning_goal,
        tier: account.tier,
        status: 'active'
      }
    });
  } catch (err) {
    console.error('Error in /api/v1/auth/email/verify:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/v1/auth/email/resend-verification
app.post('/api/v1/auth/email/resend-verification', (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: 'Email là bắt buộc' });
    }
    const cleanEmail = email.trim().toLowerCase();
    const account = db.prepare('SELECT * FROM auth_accounts WHERE email = ?').get(cleanEmail);
    if (!account) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy tài khoản với email này' });
    }

    // 60s cooldown limit (Gate F7)
    const cooldown = authRateLimiter.check(`resend_otp:${cleanEmail}`, 1, 60 * 1000);
    if (!cooldown.allowed) {
      return res.status(429).json({
        success: false,
        error: `Vui lòng đợi ${cooldown.retryAfterSeconds} giây trước khi yêu cầu gửi lại mã mới.`,
        retryAfterSeconds: cooldown.retryAfterSeconds
      });
    }

    const nowIso = new Date().toISOString();
    // Void old tokens
    db.prepare('UPDATE email_verification_tokens SET used_at = ? WHERE account_id = ? AND used_at IS NULL').run(nowIso, account.id);

    const { otpCode, rawToken, tokenHash, expiresAt } = generateEmailVerificationOtp();
    const tokenId = `evt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    db.prepare(`
      INSERT INTO email_verification_tokens (
        id, account_id, token_hash, otp_code, expires_at, created_at
      ) VALUES (?, ?, ?, ?, ?, ?)
    `).run(tokenId, account.id, tokenHash, otpCode, expiresAt, nowIso);

    res.json({
      success: true,
      message: 'Mã xác thực mới đã được gửi vào hộp thư của bạn.',
      otpPreview: otpCode,
      expiresAt
    });
  } catch (err) {
    console.error('Error in /api/v1/auth/email/resend-verification:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * USER-103: Forgot & Reset Password
 */

// POST /api/v1/auth/password/forgot
app.post('/api/v1/auth/password/forgot', (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: 'Email là bắt buộc' });
    }
    const cleanEmail = email.trim().toLowerCase();

    // Throttle: max 3 requests per hour per email (Gate F7)
    const throttle = authRateLimiter.check(`pwd_forgot:${cleanEmail}`, 3, 60 * 60 * 1000);
    if (!throttle.allowed) {
      return res.status(429).json({
        success: false,
        error: `Quá nhiều yêu cầu đặt lại mật khẩu. Vui lòng thử lại sau ${throttle.retryAfterSeconds} giây.`
      });
    }

    const account = db.prepare('SELECT * FROM auth_accounts WHERE email = ?').get(cleanEmail);
    let resetTokenPreview = null;

    if (account && account.status === 'active') {
      const nowIso = new Date().toISOString();
      // Invalidate prior unused tokens
      db.prepare('UPDATE password_reset_tokens SET used_at = ? WHERE account_id = ? AND used_at IS NULL').run(nowIso, account.id);

      const { rawToken, tokenHash, expiresAt } = generatePasswordResetToken();
      const tokenId = `prt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      db.prepare(`
        INSERT INTO password_reset_tokens (
          id, account_id, token_hash, expires_at, ip_address, created_at
        ) VALUES (?, ?, ?, ?, ?, ?)
      `).run(tokenId, account.id, tokenHash, expiresAt, req.ip || '127.0.0.1', nowIso);

      resetTokenPreview = rawToken;
    }

    // Anti-enumeration response (Gate F8)
    res.json({
      success: true,
      message: 'Nếu địa chỉ email tồn tại trong hệ thống, hướng dẫn đặt lại mật khẩu đã được gửi đến bạn.',
      resetTokenPreview // For testing and preview
    });
  } catch (err) {
    console.error('Error in /api/v1/auth/password/forgot:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/v1/auth/password/reset
app.post('/api/v1/auth/password/reset', (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ success: false, error: 'Token và mật khẩu mới là bắt buộc' });
    }

    const pwdCheck = validatePasswordStrength(newPassword);
    if (!pwdCheck.valid) {
      return res.status(400).json({ success: false, error: pwdCheck.feedback.join('. ') });
    }

    const tokenHash = hashTokenSha256(token);
    const resetRow = db.prepare(`
      SELECT * FROM password_reset_tokens
      WHERE token_hash = ? AND used_at IS NULL
      ORDER BY created_at DESC LIMIT 1
    `).get(tokenHash);

    if (!resetRow) {
      return res.status(422).json({
        success: false,
        error: 'Liên kết đặt lại mật khẩu không hợp lệ hoặc đã được sử dụng.'
      });
    }

    const now = new Date();
    if (now > new Date(resetRow.expires_at)) {
      return res.status(422).json({
        success: false,
        error: 'Liên kết đặt lại mật khẩu đã hết hạn (sau 30 phút). Vui lòng yêu cầu liên kết mới.'
      });
    }

    const nowIso = now.toISOString();
    const newPwdHash = hashPassword(newPassword);

    // Update password
    db.prepare('UPDATE auth_accounts SET password_hash = ?, updated_at = ? WHERE id = ?')
      .run(newPwdHash, nowIso, resetRow.account_id);

    // Mark token used
    db.prepare('UPDATE password_reset_tokens SET used_at = ? WHERE id = ?').run(nowIso, resetRow.id);

    // Gate F6 / USER-103: Revoke ALL active sessions on other devices
    const revokedCount = db.prepare('UPDATE user_active_sessions SET revoked_at = ? WHERE account_id = ? AND revoked_at IS NULL')
      .run(nowIso, resetRow.account_id).changes;

    res.json({
      success: true,
      message: 'Mật khẩu đã được cập nhật thành công. Toàn bộ thiết bị đăng nhập cũ đã được đăng xuất an toàn.',
      revokedSessionsCount: revokedCount
    });
  } catch (err) {
    console.error('Error in /api/v1/auth/password/reset:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * USER-104: Profile & Active Device Session Limiter (Max 2 Concurrent Sessions)
 */

// POST /api/v1/auth/session/enforce
app.post('/api/v1/auth/session/enforce', (req, res) => {
  try {
    const { accountId, evictOldest = false } = req.body;
    if (!accountId) {
      return res.status(400).json({ success: false, error: 'accountId là bắt buộc' });
    }

    const account = db.prepare('SELECT * FROM auth_accounts WHERE id = ?').get(accountId);
    if (!account) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy tài khoản' });
    }

    // Free tier: 1 concurrent device; Pro tier: max 2 concurrent devices (Gate G12)
    const maxAllowed = account.tier === 'pro' ? 2 : 1;

    const activeSessions = db.prepare(`
      SELECT * FROM user_active_sessions
      WHERE account_id = ? AND revoked_at IS NULL
      ORDER BY last_active_at ASC
    `).all(accountId);

    const nowIso = new Date().toISOString();

    if (activeSessions.length >= maxAllowed) {
      if (evictOldest) {
        const oldest = activeSessions[0];
        db.prepare('UPDATE user_active_sessions SET revoked_at = ? WHERE id = ?').run(nowIso, oldest.id);
      } else {
        return res.status(409).json({
          success: false,
          code: 'DEVICE_LIMIT_REACHED',
          message: `Tài khoản ${account.tier.toUpperCase()} của bạn đã đạt giới hạn tối đa ${maxAllowed} thiết bị đồng thời.`,
          maxAllowed,
          activeSessions: activeSessions.map(s => ({
            id: s.id,
            deviceName: s.device_name,
            deviceType: s.device_type,
            lastActiveAt: s.last_active_at,
            ipAddress: s.ip_address
          }))
        });
      }
    }

    // Register new session
    const userAgent = req.headers['user-agent'] || 'VietPhonics Web Client';
    const { deviceName, deviceType } = parseDeviceFromUserAgent(userAgent);
    const newSessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const sessionTokenHash = hashTokenSha256(`token_${accountId}_${Date.now()}`);

    db.prepare(`
      INSERT INTO user_active_sessions (
        id, account_id, refresh_token_hash, device_name, device_type,
        user_agent, ip_address, location_estimate, last_active_at, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'Việt Nam', ?, ?)
    `).run(newSessionId, accountId, sessionTokenHash, deviceName, deviceType, userAgent, req.ip || '127.0.0.1', nowIso, nowIso);

    res.json({
      success: true,
      sessionId: newSessionId,
      deviceName,
      deviceType,
      activeSessionsCount: activeSessions.length >= maxAllowed ? maxAllowed : activeSessions.length + 1
    });
  } catch (err) {
    console.error('Error in /api/v1/auth/session/enforce:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/v1/user/sessions
app.get('/api/v1/user/sessions', (req, res) => {
  try {
    const accountId = req.query.accountId || req.headers['x-account-id'] || 'default_user';
    const currentSessionId = req.query.currentSessionId || req.headers['x-session-id'];

    const sessions = db.prepare(`
      SELECT * FROM user_active_sessions
      WHERE account_id = ? AND revoked_at IS NULL
      ORDER BY last_active_at DESC
    `).all(accountId);

    res.json({
      success: true,
      accountId,
      sessions: sessions.map(s => ({
        id: s.id,
        deviceName: s.device_name,
        deviceType: s.device_type,
        ipAddress: s.ip_address,
        locationEstimate: s.location_estimate,
        lastActiveAt: s.last_active_at,
        isCurrent: currentSessionId ? s.id === currentSessionId : false
      }))
    });
  } catch (err) {
    console.error('Error in GET /api/v1/user/sessions:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/v1/user/sessions/:sessionId
app.delete('/api/v1/user/sessions/:sessionId', (req, res) => {
  try {
    const { sessionId } = req.params;
    const nowIso = new Date().toISOString();

    const result = db.prepare('UPDATE user_active_sessions SET revoked_at = ? WHERE id = ? AND revoked_at IS NULL')
      .run(nowIso, sessionId);

    if (result.changes === 0) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy phiên hoặc phiên đã bị thu hồi' });
    }

    res.json({
      success: true,
      message: 'Thiết bị đã được đăng xuất từ xa thành công.'
    });
  } catch (err) {
    console.error('Error in DELETE /api/v1/user/sessions/:sessionId:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/v1/user/sessions/revoke-all-others
app.post('/api/v1/user/sessions/revoke-all-others', (req, res) => {
  try {
    const { accountId, currentSessionId } = req.body;
    if (!accountId) {
      return res.status(400).json({ success: false, error: 'accountId là bắt buộc' });
    }

    const nowIso = new Date().toISOString();
    let query = 'UPDATE user_active_sessions SET revoked_at = ? WHERE account_id = ? AND revoked_at IS NULL';
    const params = [nowIso, accountId];

    if (currentSessionId) {
      query += ' AND id != ?';
      params.push(currentSessionId);
    }

    const result = db.prepare(query).run(...params);

    res.json({
      success: true,
      message: `Đã đăng xuất ${result.changes} thiết bị khác thành công.`,
      revokedCount: result.changes
    });
  } catch (err) {
    console.error('Error in /api/v1/user/sessions/revoke-all-others:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH /api/v1/user/profile-settings
app.patch('/api/v1/user/profile-settings', (req, res) => {
  try {
    const { accountId, displayName, l1Dialect, learningGoal } = req.body;
    if (!accountId) {
      return res.status(400).json({ success: false, error: 'accountId là bắt buộc' });
    }

    if (l1Dialect && !['bac', 'trung', 'nam'].includes(l1Dialect)) {
      return res.status(400).json({ success: false, error: 'Phương ngữ không hợp lệ. Chỉ chấp nhận bac, trung, nam' });
    }

    const nowIso = new Date().toISOString();
    const account = db.prepare('SELECT * FROM auth_accounts WHERE id = ?').get(accountId);
    if (!account) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy tài khoản' });
    }

    const updatedName = displayName || account.display_name;
    const updatedDialect = l1Dialect || account.l1_dialect;
    const updatedGoal = learningGoal || account.learning_goal;

    db.prepare('UPDATE auth_accounts SET display_name = ?, l1_dialect = ?, learning_goal = ?, updated_at = ? WHERE id = ?')
      .run(updatedName, updatedDialect, updatedGoal, nowIso, accountId);

    // Sync to user_profiles for dialect calibration (ELSA-102)
    db.prepare(`
      INSERT INTO user_profiles (id, user_id, dialect, calibration_mode, confidence_score, ielts_target, overall_gop, created_at, updated_at)
      VALUES (?, ?, ?, 'manual_selection', 0.92, 7.5, 76, ?, ?)
      ON CONFLICT(user_id) DO UPDATE SET dialect = excluded.dialect, updated_at = excluded.updated_at
    `).run(`prof_${accountId}`, accountId, updatedDialect, nowIso, nowIso);

    res.json({
      success: true,
      message: 'Cập nhật hồ sơ thành công.',
      profile: {
        accountId,
        displayName: updatedName,
        l1Dialect: updatedDialect,
        learningGoal: updatedGoal,
        updatedAt: nowIso
      }
    });
  } catch (err) {
    console.error('Error in PATCH /api/v1/user/profile-settings:', err);
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
