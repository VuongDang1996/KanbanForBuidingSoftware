import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { IPA_PHONEMES } from '../src/lib/phonemes/ipaData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'vietphonics.db');
export const db = new DatabaseSync(dbPath);

// Enable WAL mode
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');
db.exec('PRAGMA busy_timeout = 5000;');

export function initAppDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_profiles (
      id TEXT PRIMARY KEY,
      user_id TEXT UNIQUE NOT NULL,
      dialect TEXT NOT NULL DEFAULT 'bac',
      calibration_mode TEXT NOT NULL DEFAULT 'manual_selection',
      confidence_score REAL DEFAULT 0.92,
      ielts_target REAL DEFAULT 7.5,
      overall_gop INTEGER DEFAULT 76,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS dialect_penalty_weights (
      dialect TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      weights_json TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS user_phoneme_mastery (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      phoneme TEXT NOT NULL,
      score INTEGER NOT NULL,
      attempts INTEGER DEFAULT 1,
      last_practiced_at TEXT NOT NULL,
      UNIQUE(user_id, phoneme)
    );

    CREATE TABLE IF NOT EXISTS diagnostic_screeners (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      answers_json TEXT NOT NULL,
      report_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS phoneme_alignment_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      sentence_text TEXT NOT NULL,
      overall_gop INTEGER NOT NULL,
      words_count INTEGER NOT NULL,
      alignment_data_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS fluency_analysis_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      sentence_text TEXT NOT NULL,
      wpm INTEGER NOT NULL,
      tempo_category TEXT NOT NULL,
      pause_ratio REAL NOT NULL,
      fillers_count INTEGER NOT NULL,
      hesitations_count INTEGER NOT NULL,
      timeline_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS ending_burst_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      word TEXT NOT NULL,
      target_phoneme TEXT NOT NULL,
      burst_ratio REAL NOT NULL,
      is_released INTEGER NOT NULL,
      zcr REAL NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS syllable_stress_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      word TEXT NOT NULL,
      target_syllable TEXT NOT NULL,
      score INTEGER NOT NULL,
      is_correct INTEGER NOT NULL,
      l1_tone_trap INTEGER NOT NULL,
      metrics_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS pitch_contour_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      sentence_id TEXT NOT NULL,
      sentence_text TEXT NOT NULL,
      sentence_type TEXT NOT NULL,
      target_terminal_tone TEXT NOT NULL,
      user_terminal_tone TEXT NOT NULL,
      terminal_delta_semitones REAL NOT NULL,
      melody_similarity_score REAL NOT NULL,
      is_terminal_correct INTEGER NOT NULL,
      user_median_f0 REAL NOT NULL,
      native_contour_json TEXT NOT NULL,
      user_contour_json TEXT NOT NULL,
      feedback_vietnamese TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS schwa_demotion_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      word TEXT NOT NULL,
      schwa_position INTEGER NOT NULL,
      duration_ms INTEGER NOT NULL,
      f1_hz INTEGER NOT NULL,
      f2_hz INTEGER NOT NULL,
      neutral_distance REAL NOT NULL,
      is_demoted INTEGER NOT NULL,
      l1_full_vowel_trap INTEGER NOT NULL,
      score INTEGER NOT NULL,
      feedback_vietnamese TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS minimal_pair_quiz_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      pair_id TEXT NOT NULL,
      target_phoneme_a TEXT NOT NULL,
      target_phoneme_b TEXT NOT NULL,
      target_word TEXT NOT NULL,
      selected_word TEXT NOT NULL,
      is_correct INTEGER NOT NULL,
      reaction_time_ms INTEGER NOT NULL,
      streak_count INTEGER NOT NULL,
      xp_awarded INTEGER NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS anatomy_calibration_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      phoneme TEXT NOT NULL,
      tongue_elevation INTEGER NOT NULL,
      jaw_drop INTEGER NOT NULL,
      air_pressure INTEGER NOT NULL,
      is_ghost_compared INTEGER NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS dictation_exercise_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      exercise_id TEXT NOT NULL,
      sentence_text TEXT NOT NULL,
      user_answers_json TEXT NOT NULL,
      is_all_correct INTEGER NOT NULL,
      correct_gaps_count INTEGER NOT NULL,
      total_gaps_count INTEGER NOT NULL,
      score INTEGER NOT NULL,
      xp_awarded INTEGER NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS target_sound_drill_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      sentence_id TEXT NOT NULL,
      target_phoneme TEXT NOT NULL,
      sentence_text TEXT NOT NULL,
      total_occurrences INTEGER NOT NULL,
      correct_occurrences INTEGER NOT NULL,
      accuracy_percent INTEGER NOT NULL,
      words_breakdown_json TEXT NOT NULL,
      detected_substitutions_json TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS dual_track_recording_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      word TEXT NOT NULL,
      native_duration_ms INTEGER NOT NULL,
      user_duration_ms INTEGER NOT NULL,
      duration_difference_ms INTEGER NOT NULL,
      vowel_nucleus_ms INTEGER NOT NULL,
      correlation_score INTEGER NOT NULL,
      duration_warning TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS positional_ladder_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      phoneme TEXT NOT NULL,
      tier INTEGER NOT NULL,
      tier_label TEXT NOT NULL,
      word TEXT NOT NULL,
      score INTEGER NOT NULL,
      stars INTEGER NOT NULL,
      is_unlocked INTEGER NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS connected_progression_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      progression_id TEXT NOT NULL,
      target_phoneme TEXT NOT NULL,
      step_index INTEGER NOT NULL,
      step_type TEXT NOT NULL,
      text_prompt TEXT NOT NULL,
      score INTEGER NOT NULL,
      baseline_score INTEGER,
      has_degradation INTEGER NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS grammatical_voicing_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      category TEXT NOT NULL,
      total_words INTEGER NOT NULL,
      correct_count INTEGER NOT NULL,
      score INTEGER NOT NULL,
      results_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS cross_transition_drill_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      trap_id TEXT NOT NULL,
      phoneme_a TEXT NOT NULL,
      phoneme_b TEXT NOT NULL,
      sentence_text TEXT NOT NULL,
      agility_score INTEGER NOT NULL,
      transition_matrix_json TEXT NOT NULL,
      detected_assimilations_json TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS spelling_map_quiz_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      phoneme_id TEXT NOT NULL,
      symbol TEXT NOT NULL,
      score INTEGER NOT NULL,
      total_questions INTEGER NOT NULL,
      correct_count INTEGER NOT NULL,
      passed INTEGER NOT NULL,
      results_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS masterclass_progress_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      lesson_id TEXT NOT NULL,
      phoneme TEXT NOT NULL,
      camera_angle TEXT NOT NULL,
      playback_rate REAL NOT NULL,
      loop_enabled INTEGER NOT NULL,
      watch_duration_sec REAL NOT NULL,
      completion_percentage INTEGER NOT NULL,
      is_completed INTEGER NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sound_saturation_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      sentence_id TEXT NOT NULL,
      target_phoneme TEXT NOT NULL,
      total_occurrences INTEGER NOT NULL,
      correct_occurrences INTEGER NOT NULL,
      accuracy_percentage INTEGER NOT NULL,
      saturation_meter_level INTEGER NOT NULL,
      is_mastered INTEGER NOT NULL,
      detected_traps_json TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS native_placement_feedback_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      guide_id TEXT NOT NULL,
      phoneme TEXT NOT NULL,
      rating INTEGER NOT NULL,
      is_helpful INTEGER NOT NULL,
      feedback_note TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS roleplay_session_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      scenario_id TEXT NOT NULL,
      user_transcript TEXT NOT NULL,
      ai_response TEXT NOT NULL,
      phonetic_accuracy INTEGER NOT NULL,
      unreleased_stops_json TEXT,
      is_blocker_resolved INTEGER NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS roleplay_scorecard_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      session_id TEXT NOT NULL,
      overall_score INTEGER NOT NULL,
      rank_badge TEXT NOT NULL,
      pronunciation_score INTEGER NOT NULL,
      fluency_score INTEGER NOT NULL,
      grammar_score INTEGER NOT NULL,
      vocabulary_score INTEGER NOT NULL,
      objective_score INTEGER NOT NULL,
      weak_words_json TEXT NOT NULL,
      transcript_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS ielts_mock_examiner_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      topic_id TEXT NOT NULL,
      topic_title TEXT NOT NULL,
      part_type INTEGER NOT NULL DEFAULT 2,
      prep_notes TEXT NOT NULL,
      transcript TEXT NOT NULL,
      duration_sec INTEGER NOT NULL,
      fc_band REAL NOT NULL,
      lr_band REAL NOT NULL,
      gra_band REAL NOT NULL,
      pr_band REAL NOT NULL,
      overall_band REAL NOT NULL,
      past_tense_errors_json TEXT NOT NULL,
      feedback_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS game_world_progress_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      world_id TEXT NOT NULL,
      stage_id TEXT NOT NULL,
      score INTEGER NOT NULL,
      stars INTEGER NOT NULL,
      gem_reward INTEGER NOT NULL,
      next_stage_id TEXT,
      next_world_unlocked INTEGER NOT NULL,
      feedback_text TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS game_voice_session_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      spell_id TEXT NOT NULL,
      spell_name TEXT NOT NULL,
      target_word TEXT NOT NULL,
      spoken_word TEXT NOT NULL,
      is_simulated INTEGER NOT NULL,
      hit_type TEXT NOT NULL,
      damage INTEGER NOT NULL,
      new_combo INTEGER NOT NULL,
      latency_ms INTEGER NOT NULL,
      feedback_text TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS game_boss_battle_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      boss_id TEXT NOT NULL,
      boss_name TEXT NOT NULL,
      turn_index INTEGER NOT NULL,
      target_word TEXT NOT NULL,
      selected_word TEXT NOT NULL,
      is_correct INTEGER NOT NULL,
      is_timeout INTEGER NOT NULL,
      boss_hp_left INTEGER NOT NULL,
      player_hp_left INTEGER NOT NULL,
      damage_dealt INTEGER NOT NULL,
      damage_taken INTEGER NOT NULL,
      magnifier_tip TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);

  // Seed default penalty weights for 3 regions
  const existingWeights = db.prepare('SELECT COUNT(*) as cnt FROM dialect_penalty_weights').get();
  if (existingWeights.cnt === 0) {
    const insertWeight = db.prepare(`
      INSERT INTO dialect_penalty_weights (dialect, name, description, weights_json, updated_at)
      VALUES (?, ?, ?, ?, ?)
    `);

    const now = new Date().toISOString();
    insertWeight.run(
      'bac',
      'Miền Bắc (Hà Nội & Bắc Bộ)',
      'Tập trung bẫy lẫn lộn /l/-/n/, /d/-/z/, giảm độ gắt /r/ uốn lưỡi',
      JSON.stringify({
        phonemePenalties: { '/l/': 1.5, '/n/': 1.5, '/d/': 1.3, '/z/': 1.3, '/r/': 0.7, '/æ/': 1.2 },
        formantOffsetHz: { F1: 120, F2: -80 },
        pitchTolerance: 'standard'
      }),
      now
    );

    insertWeight.run(
      'trung',
      'Miền Trung (Huế, Đà Nẵng, Nghệ Tĩnh)',
      'Tập trung giải phóng cao độ nặng thanh sắc/nặng, mở rộng nguyên âm đôi',
      JSON.stringify({
        phonemePenalties: { '/eə/': 1.4, '/ɪə/': 1.4, '/aʊ/': 1.3, '/θ/': 1.2, '/ð/': 1.2 },
        formantOffsetHz: { F1: -60, F2: 100 },
        pitchTolerance: 'tonal_drop_boost'
      }),
      now
    );

    insertWeight.run(
      'nam',
      'Miền Nam (TP.HCM & Nam Bộ)',
      'Tập trung bẫy nuốt phụ âm đuôi /t/, /k/ và lẫn lộn /v/-/j/',
      JSON.stringify({
        phonemePenalties: { '/t/': 1.5, '/k/': 1.5, '/ks/': 1.6, '/v/': 1.4, '/j/': 1.3 },
        formantOffsetHz: { F1: 80, F2: 60 },
        pitchTolerance: 'stop_release_boost'
      }),
      now
    );
  }

  // Seed default demo user profile if not exists
  const existingUser = db.prepare("SELECT * FROM user_profiles WHERE user_id = 'default_user'").get();
  if (!existingUser) {
    const now = new Date().toISOString();
    db.prepare(`
      INSERT INTO user_profiles (id, user_id, dialect, calibration_mode, confidence_score, ielts_target, overall_gop, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run('prof-default', 'default_user', 'bac', 'manual_selection', 0.92, 7.5, 76, now, now);
  }

  // Seed default 44 phonemes mastery for demo user if empty
  const existingPhonemes = db.prepare("SELECT COUNT(*) as cnt FROM user_phoneme_mastery WHERE user_id = 'default_user'").get();
  if (existingPhonemes.cnt === 0) {
    const insertPhoneme = db.prepare(`
      INSERT INTO user_phoneme_mastery (id, user_id, phoneme, score, attempts, last_practiced_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const now = new Date().toISOString();
    for (const p of IPA_PHONEMES) {
      insertPhoneme.run(
        `pm-${p.symbol}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        'default_user',
        p.symbol,
        p.defaultScore,
        3,
        now
      );
    }
  }
}
