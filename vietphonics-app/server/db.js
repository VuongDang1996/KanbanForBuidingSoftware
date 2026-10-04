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

    CREATE TABLE IF NOT EXISTS sound_synthesizer_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL UNIQUE,
      sfx_volume REAL NOT NULL DEFAULT 0.8,
      bgm_volume REAL NOT NULL DEFAULT 0.6,
      reduced_motion INTEGER NOT NULL DEFAULT 0,
      muted INTEGER NOT NULL DEFAULT 0,
      sfx_played_count INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS rpg_inventory_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL UNIQUE,
      gems_balance INTEGER NOT NULL DEFAULT 500,
      items_json TEXT NOT NULL DEFAULT '[]',
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS university_leaderboard_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      user_name TEXT NOT NULL,
      university_id TEXT NOT NULL,
      university_name TEXT NOT NULL,
      xp INTEGER NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS daily_practice_path_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      dialect TEXT NOT NULL,
      total_steps INTEGER NOT NULL DEFAULT 5,
      completed_steps INTEGER NOT NULL DEFAULT 0,
      current_step_order INTEGER NOT NULL DEFAULT 1,
      remaining_minutes INTEGER NOT NULL DEFAULT 10,
      path_json TEXT NOT NULL,
      date_str TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS error_bank_sm2_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      word TEXT NOT NULL,
      ipa TEXT NOT NULL,
      phoneme_error TEXT NOT NULL,
      past_audio TEXT,
      muscle_tip TEXT NOT NULL,
      easiness_factor REAL NOT NULL DEFAULT 2.5,
      interval_days INTEGER NOT NULL DEFAULT 1,
      repetitions INTEGER NOT NULL DEFAULT 0,
      consecutive_high_scores INTEGER NOT NULL DEFAULT 0,
      last_score INTEGER NOT NULL DEFAULT 50,
      status TEXT NOT NULL DEFAULT 'due',
      category TEXT NOT NULL DEFAULT 'general',
      next_review_date TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS user_streak_shield_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL UNIQUE,
      streak_count INTEGER NOT NULL DEFAULT 7,
      freeze_shields_count INTEGER NOT NULL DEFAULT 1,
      is_frozen INTEGER NOT NULL DEFAULT 0,
      hours_inactive INTEGER NOT NULL DEFAULT 0,
      saved_modal_pending INTEGER NOT NULL DEFAULT 0,
      last_active_date TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS freemium_quota_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      is_pro INTEGER NOT NULL DEFAULT 0,
      lessons_completed_today INTEGER NOT NULL DEFAULT 0,
      date_str TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      UNIQUE(user_id, date_str)
    );

    CREATE TABLE IF NOT EXISTS learner_auth_dashboard_records (
      id TEXT PRIMARY KEY,
      user_id TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      role TEXT DEFAULT 'learner',
      tier TEXT DEFAULT 'free',
      token_hash TEXT,
      phonemes_score REAL DEFAULT 85,
      stress_score REAL DEFAULT 78,
      intonation_score REAL DEFAULT 70,
      ending_sounds_score REAL DEFAULT 92,
      fluency_score REAL DEFAULT 80,
      total_practice_minutes INTEGER DEFAULT 340,
      mastered_phonemes_count INTEGER DEFAULT 32,
      error_bank_count INTEGER DEFAULT 6,
      predicted_ielts REAL DEFAULT 7.0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    /* ARCH-101: 3NF Relational Database Schema & Compound Indexes */
    CREATE TABLE IF NOT EXISTS arch_users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      full_name TEXT NOT NULL,
      dialect_preference TEXT DEFAULT 'northern',
      tier TEXT DEFAULT 'free',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS arch_subscriptions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES arch_users(id) ON DELETE CASCADE,
      plan_code TEXT NOT NULL,
      status TEXT NOT NULL,
      current_period_start TEXT NOT NULL,
      current_period_end TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_arch_subscriptions_user_status ON arch_subscriptions(user_id, status);

    CREATE TABLE IF NOT EXISTS arch_phoneme_scores (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES arch_users(id) ON DELETE CASCADE,
      phoneme_symbol TEXT NOT NULL,
      score REAL NOT NULL,
      duration_ms INTEGER NOT NULL,
      audio_r2_url TEXT,
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_arch_phoneme_scores_user_sym ON arch_phoneme_scores(user_id, phoneme_symbol);
    CREATE INDEX IF NOT EXISTS idx_arch_phoneme_scores_user_time ON arch_phoneme_scores(user_id, created_at DESC);

    CREATE TABLE IF NOT EXISTS arch_audio_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES arch_users(id) ON DELETE CASCADE,
      session_id TEXT,
      file_size_bytes INTEGER NOT NULL,
      sample_rate_hz INTEGER NOT NULL DEFAULT 16000,
      duration_ms INTEGER NOT NULL,
      r2_url TEXT,
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_arch_audio_records_user ON arch_audio_records(user_id, created_at DESC);

    /* ARCH-102: Asynchronous Audio Ingestion & GPU Worker Queue Pipeline */
    CREATE TABLE IF NOT EXISTS audio_worker_jobs (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'queued',
      priority INTEGER NOT NULL DEFAULT 0,
      mime_type TEXT NOT NULL,
      sample_rate_hz INTEGER NOT NULL DEFAULT 16000,
      channels INTEGER NOT NULL DEFAULT 1,
      attempts INTEGER NOT NULL DEFAULT 0,
      result_json TEXT,
      error_message TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_audio_worker_jobs_status ON audio_worker_jobs(status, priority DESC, created_at ASC);

    /* ARCH-103: Multi-Gateway Subscription Billing & Webhook Reconciliation */
    CREATE TABLE IF NOT EXISTS billing_webhook_logs (
      id TEXT PRIMARY KEY,
      gateway TEXT NOT NULL,
      transaction_id TEXT UNIQUE NOT NULL,
      order_code TEXT NOT NULL,
      user_id TEXT NOT NULL,
      amount INTEGER NOT NULL,
      plan_code TEXT NOT NULL,
      status TEXT NOT NULL,
      signature TEXT,
      created_at TEXT NOT NULL,
      reconciled_at TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_billing_webhook_logs_user ON billing_webhook_logs(user_id, created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_billing_webhook_logs_tx ON billing_webhook_logs(transaction_id);

    /* ARCH-104: Tiered Quota Limiter & Entitlement Enforcement */
    CREATE TABLE IF NOT EXISTS rate_limit_sliding_window_logs (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      endpoint TEXT NOT NULL,
      timestamp_ms INTEGER NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_rate_limit_user_ts ON rate_limit_sliding_window_logs(user_id, timestamp_ms DESC);

    /* ARCH-105: Cloud Object Storage & Ephemeral Audio Retention Lifecycle */
    CREATE TABLE IF NOT EXISTS storage_audio_objects (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      storage_key TEXT UNIQUE NOT NULL,
      bucket_name TEXT NOT NULL,
      content_type TEXT NOT NULL,
      file_size_bytes INTEGER DEFAULT 0,
      tier TEXT NOT NULL,
      retention_days INTEGER NOT NULL,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_storage_audio_expires ON storage_audio_objects(expires_at);
    CREATE INDEX IF NOT EXISTS idx_storage_audio_user ON storage_audio_objects(user_id, created_at DESC);

    /* PAY-101: Dynamic VietQR Auto-Reconciliation Engine */
    CREATE TABLE IF NOT EXISTS vietqr_orders (
      id TEXT PRIMARY KEY,
      order_code TEXT UNIQUE NOT NULL,
      user_id TEXT NOT NULL,
      plan_code TEXT NOT NULL,
      amount INTEGER NOT NULL,
      bank_bin TEXT NOT NULL,
      account_number TEXT NOT NULL,
      account_name TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      qr_payload TEXT,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL,
      paid_at TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_vietqr_orders_code ON vietqr_orders(order_code);
    CREATE INDEX IF NOT EXISTS idx_vietqr_orders_user ON vietqr_orders(user_id, status);

    /* PAY-104: Automated Grace Period & Expiring Subscription Reminders */
    CREATE TABLE IF NOT EXISTS subscription_audit_logs (
      id TEXT PRIMARY KEY,
      subscription_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      old_status TEXT NOT NULL,
      new_status TEXT NOT NULL,
      reason TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_sub_audit_user ON subscription_audit_logs(user_id, created_at DESC);

    CREATE TABLE IF NOT EXISTS subscription_notifications (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      subscription_id TEXT NOT NULL,
      type TEXT NOT NULL,
      message TEXT NOT NULL,
      promo_code TEXT,
      discount_percent INTEGER DEFAULT 0,
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_sub_notif_user ON subscription_notifications(user_id, created_at DESC);

    /* ADV-101: Golden Speaker Voice-Cloned Self Model */
    CREATE TABLE IF NOT EXISTS golden_speaker_embeddings (
      id TEXT PRIMARY KEY,
      user_id TEXT UNIQUE NOT NULL,
      embedding_json TEXT NOT NULL,
      cosine_similarity REAL NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS golden_speaker_sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      word TEXT NOT NULL,
      target_ipa TEXT NOT NULL,
      similarity_score REAL NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_golden_sessions_user ON golden_speaker_sessions(user_id, created_at DESC);

    /* ADV-102: Webcam Lip & Jaw Tracking */
    CREATE TABLE IF NOT EXISTS webcam_lip_tracking_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      phoneme TEXT NOT NULL,
      jaw_openness INTEGER NOT NULL,
      lip_spread INTEGER NOT NULL,
      lip_rounding INTEGER NOT NULL,
      target_met INTEGER NOT NULL,
      score INTEGER NOT NULL,
      advice TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_lip_records_user ON webcam_lip_tracking_records(user_id, created_at DESC);

    /* ADV-103: Live Vowel Space Chart */
    CREATE TABLE IF NOT EXISTS vowel_space_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      target_symbol TEXT NOT NULL,
      user_f1 INTEGER NOT NULL,
      user_f2 INTEGER NOT NULL,
      delta_f1 INTEGER NOT NULL,
      delta_f2 INTEGER NOT NULL,
      is_in_target INTEGER NOT NULL,
      score INTEGER NOT NULL,
      advice TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_vowel_space_user ON vowel_space_records(user_id, created_at DESC);

    /* ADV-104: AI Phonetics Coach Long-Term Context Memory */
    CREATE TABLE IF NOT EXISTS ai_coach_memory_profiles (
      id TEXT PRIMARY KEY,
      user_id TEXT UNIQUE NOT NULL,
      profile_json TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS ai_coach_chat_messages (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      role TEXT NOT NULL,
      message TEXT NOT NULL,
      articulatory_tip_json TEXT,
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_coach_chat_user ON ai_coach_chat_messages(user_id, created_at DESC);

    /* ADV-105: Connected Speech Lab */
    CREATE TABLE IF NOT EXISTS connected_speech_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      drill_id TEXT NOT NULL,
      sentence TEXT NOT NULL,
      flow_score INTEGER NOT NULL,
      staccato_count INTEGER NOT NULL,
      evaluation_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_connected_speech_user ON connected_speech_records(user_id, created_at DESC);

    /* ADV-106: Intelligibility Score & Multi-ASR Panel */
    CREATE TABLE IF NOT EXISTS intelligibility_evaluations (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      spoken_text TEXT NOT NULL,
      global_score INTEGER NOT NULL,
      listener_scores_json TEXT NOT NULL,
      semantic_risks_json TEXT NOT NULL,
      has_high_risk INTEGER NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_intelligibility_user ON intelligibility_evaluations(user_id, created_at DESC);

    /* ADV-107: Spontaneous Speech Voice Journal */
    CREATE TABLE IF NOT EXISTS voice_journal_entries (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      prompt_id TEXT NOT NULL,
      transcript TEXT NOT NULL,
      duration_seconds INTEGER NOT NULL,
      wpm INTEGER NOT NULL,
      baseline_score INTEGER NOT NULL,
      spontaneous_score INTEGER NOT NULL,
      transfer_gap INTEGER NOT NULL,
      aligned_words_json TEXT NOT NULL,
      fillers_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_voice_journal_user ON voice_journal_entries(user_id, created_at DESC);

    /* ADV-108: Accent Explorer & Target Dialect Selector */
    CREATE TABLE IF NOT EXISTS user_target_dialects (
      id TEXT PRIMARY KEY,
      user_id TEXT UNIQUE NOT NULL,
      dialect_code TEXT NOT NULL,
      proximity_score INTEGER NOT NULL DEFAULT 75,
      updated_at TEXT NOT NULL
    );

    /* USER-106, USER-103, USER-104: Secure Accounts, Email Verification, Password Reset & Active Sessions */
    CREATE TABLE IF NOT EXISTS auth_accounts (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      display_name TEXT NOT NULL,
      l1_dialect TEXT NOT NULL DEFAULT 'bac',
      learning_goal TEXT NOT NULL DEFAULT 'communication',
      status TEXT NOT NULL DEFAULT 'pending_verification',
      tier TEXT NOT NULL DEFAULT 'free',
      email_verified_at TEXT,
      trial_used_at TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_auth_accounts_email ON auth_accounts(email);
    CREATE INDEX IF NOT EXISTS idx_auth_accounts_status ON auth_accounts(status);

    CREATE TABLE IF NOT EXISTS email_verification_tokens (
      id TEXT PRIMARY KEY,
      account_id TEXT NOT NULL,
      token_hash TEXT NOT NULL,
      otp_code TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      used_at TEXT,
      attempts INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      FOREIGN KEY(account_id) REFERENCES auth_accounts(id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_email_verify_acc ON email_verification_tokens(account_id);
    CREATE INDEX IF NOT EXISTS idx_email_verify_hash ON email_verification_tokens(token_hash);

    CREATE TABLE IF NOT EXISTS password_reset_tokens (
      id TEXT PRIMARY KEY,
      account_id TEXT NOT NULL,
      token_hash TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      used_at TEXT,
      ip_address TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY(account_id) REFERENCES auth_accounts(id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_pwd_reset_acc ON password_reset_tokens(account_id);
    CREATE INDEX IF NOT EXISTS idx_pwd_reset_hash ON password_reset_tokens(token_hash);

    CREATE TABLE IF NOT EXISTS user_active_sessions (
      id TEXT PRIMARY KEY,
      account_id TEXT NOT NULL,
      refresh_token_hash TEXT NOT NULL,
      device_name TEXT NOT NULL,
      device_type TEXT NOT NULL DEFAULT 'desktop',
      user_agent TEXT,
      ip_address TEXT,
      location_estimate TEXT DEFAULT 'Việt Nam',
      last_active_at TEXT NOT NULL,
      revoked_at TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY(account_id) REFERENCES auth_accounts(id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_user_sessions_acc_revoked ON user_active_sessions(account_id, revoked_at);

    -- USER-105: Personal Data Exports & Account Deletion Requests (Decree 13/2023/NĐ-CP)
    CREATE TABLE IF NOT EXISTS user_data_exports (
      id TEXT PRIMARY KEY,
      account_id TEXT NOT NULL,
      export_status TEXT NOT NULL DEFAULT 'completed',
      export_data_json TEXT NOT NULL,
      download_url TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY(account_id) REFERENCES auth_accounts(id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_user_data_exports_acc ON user_data_exports(account_id);

    CREATE TABLE IF NOT EXISTS account_deletion_requests (
      id TEXT PRIMARY KEY,
      account_id TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending_deletion',
      cancel_token_hash TEXT NOT NULL,
      requested_at TEXT NOT NULL,
      grace_period_ends_at TEXT NOT NULL,
      canceled_at TEXT,
      purged_at TEXT,
      reason TEXT,
      FOREIGN KEY(account_id) REFERENCES auth_accounts(id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_account_deletion_req_acc ON account_deletion_requests(account_id, status);

    CREATE TABLE IF NOT EXISTS audit_compliance_logs (
      id TEXT PRIMARY KEY,
      account_id TEXT NOT NULL,
      event_type TEXT NOT NULL,
      details_json TEXT,
      ip_address TEXT,
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_audit_compliance_acc ON audit_compliance_logs(account_id, created_at);

    -- PROG-101: Daily Skill Progress History (7/30/90 Days)
    CREATE TABLE IF NOT EXISTS daily_skill_progress_history (
      id TEXT PRIMARY KEY,
      account_id TEXT NOT NULL,
      practice_date TEXT NOT NULL,
      ending_sounds_score REAL NOT NULL,
      vowels_score REAL NOT NULL,
      stress_score REAL NOT NULL,
      intonation_score REAL NOT NULL,
      overall_gop REAL NOT NULL,
      practice_minutes INTEGER DEFAULT 10,
      words_practiced INTEGER DEFAULT 18,
      created_at TEXT NOT NULL,
      UNIQUE(account_id, practice_date)
    );
    CREATE INDEX IF NOT EXISTS idx_daily_progress_acc_date ON daily_skill_progress_history(account_id, practice_date);

    -- PROG-102: Before vs After Audio Comparison (Day 1 Baseline vs Latest)
    CREATE TABLE IF NOT EXISTS baseline_comparison_records (
      id TEXT PRIMARY KEY,
      account_id TEXT NOT NULL,
      sentence_id TEXT NOT NULL,
      sentence_text TEXT NOT NULL,
      baseline_date TEXT NOT NULL,
      baseline_overall_gop REAL NOT NULL,
      baseline_audio_url TEXT,
      baseline_phoneme_scores_json TEXT NOT NULL,
      latest_date TEXT NOT NULL,
      latest_overall_gop REAL NOT NULL,
      latest_audio_url TEXT,
      latest_phoneme_scores_json TEXT NOT NULL,
      model_version TEXT NOT NULL DEFAULT 'Acoustic_GOP_v5.1',
      voice_consent_granted INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      UNIQUE(account_id, sentence_id)
    );
    CREATE INDEX IF NOT EXISTS idx_baseline_comp_acc ON baseline_comparison_records(account_id);
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

  // Seed default auth account if not exists
  const existingAuth = db.prepare("SELECT * FROM auth_accounts WHERE id = 'default_user'").get();
  if (!existingAuth) {
    const now = new Date().toISOString();
    db.prepare(`
      INSERT INTO auth_accounts (id, email, password_hash, display_name, l1_dialect, learning_goal, status, tier, email_verified_at, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run('default_user', 'learner@vietphonics.vn', 'pbkdf2:demo', 'Đặng Vương', 'bac', 'communication', 'active', 'pro', now, now, now);
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

  // Seed default learner dashboard profile if not exists
  const existingLearner = db.prepare("SELECT * FROM learner_auth_dashboard_records WHERE user_id = 'default_user'").get();
  if (!existingLearner) {
    const now = new Date().toISOString();
    db.prepare(`
      INSERT INTO learner_auth_dashboard_records (
        id, user_id, name, email, role, tier, token_hash,
        phonemes_score, stress_score, intonation_score, ending_sounds_score, fluency_score,
        total_practice_minutes, mastered_phonemes_count, error_bank_count, predicted_ielts,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'learner-default', 'default_user', 'Đặng Vương', 'vuong@vietphonics.vn', 'learner', 'pro',
      'demo_session_token_default', 85, 78, 70, 92, 80, 340, 32, 6, 7.0, now, now
    );
  }

  // Seed default arch_users record if not exists
  const existingArchUser = db.prepare("SELECT * FROM arch_users WHERE id = 'usr_arch_default'").get();
  if (!existingArchUser) {
    const now = new Date().toISOString();
    db.prepare(`
      INSERT INTO arch_users (id, email, full_name, dialect_preference, tier, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run('usr_arch_default', 'vuong@vietphonics.vn', 'Đặng Vương', 'northern', 'pro', now, now);

    db.prepare(`
      INSERT INTO arch_subscriptions (id, user_id, plan_code, status, current_period_start, current_period_end, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run('sub_arch_default', 'usr_arch_default', 'pro_annual_unlimited', 'active', now, '2027-10-04T00:00:00.000Z', now);

    db.prepare(`
      INSERT INTO arch_phoneme_scores (id, user_id, phoneme_symbol, score, duration_ms, audio_r2_url, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run('ps_arch_001', 'usr_arch_default', '/ks/', 92.5, 340, 'https://r2.vietphonics.vn/audio/sample_ks.wav', now);
  }

  // Seed default 30-day skill progress history for demo user (PROG-101)
  const existingHistory = db.prepare("SELECT COUNT(*) as cnt FROM daily_skill_progress_history WHERE account_id = 'default_user'").get();
  if (existingHistory.cnt === 0) {
    const insertHistory = db.prepare(`
      INSERT OR IGNORE INTO daily_skill_progress_history (
        id, account_id, practice_date, ending_sounds_score, vowels_score, stress_score, intonation_score, overall_gop, practice_minutes, words_practiced, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const nowMs = Date.now();
    for (let dayOffset = 30; dayOffset >= 0; dayOffset--) {
      // Create 2-3 rest days to test gap-day handling (AC 2)
      if (dayOffset === 22 || dayOffset === 11 || dayOffset === 4) continue;

      const dateStr = new Date(nowMs - dayOffset * 86400000).toISOString().split('T')[0];
      const progressFactor = (30 - dayOffset) / 30; // 0 to 1

      // Progression curves
      const endingSounds = Math.min(96, Math.round(52 + progressFactor * 34 + (Math.sin(dayOffset) * 3)));
      const vowels = Math.min(95, Math.round(60 + progressFactor * 26 + (Math.cos(dayOffset) * 2)));
      const stress = Math.min(94, Math.round(55 + progressFactor * 28 + (Math.sin(dayOffset * 2) * 3)));
      const intonation = Math.min(92, Math.round(50 + progressFactor * 25 + (Math.cos(dayOffset * 3) * 2)));
      const overallGop = Math.round((endingSounds * 0.35) + (vowels * 0.25) + (stress * 0.2) + (intonation * 0.2));

      insertHistory.run(
        `prog-hist-${dateStr}`,
        'default_user',
        dateStr,
        endingSounds,
        vowels,
        stress,
        intonation,
        overallGop,
        10 + (dayOffset % 5),
        18,
        new Date().toISOString()
      );
    }
  }

  // Seed default Before vs After comparison baseline (PROG-102)
  const existingBaseline = db.prepare("SELECT COUNT(*) as cnt FROM baseline_comparison_records WHERE account_id = 'default_user'").get();
  if (existingBaseline.cnt === 0) {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString();
    const today = new Date().toISOString();

    db.prepare(`
      INSERT OR IGNORE INTO baseline_comparison_records (
        id, account_id, sentence_id, sentence_text,
        baseline_date, baseline_overall_gop, baseline_audio_url, baseline_phoneme_scores_json,
        latest_date, latest_overall_gop, latest_audio_url, latest_phoneme_scores_json,
        model_version, voice_consent_granted, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'baseline-rec-001',
      'default_user',
      'sent_focus_01',
      'Six months ago, she baked fresh bread for breakfast on the street.',
      thirtyDaysAgo,
      58,
      'https://r2.vietphonics.vn/audio/baseline_day1_six_months.mp3',
      JSON.stringify([
        { phoneme: '/θ/', score: 42, note: 'Rụt cuống lưỡi quá sớm tạo âm tắc /t/' },
        { phoneme: '/ks/', score: 48, note: 'Rụng mất cụm xát đuôi /ks/ trong "Six"' },
        { phoneme: '/kt/', score: 56, note: 'Bỏ âm bật /t/ trong "baked"' },
        { phoneme: '/st/', score: 60, note: 'Nuốt cụm /st/ trong "street"' }
      ]),
      today,
      84,
      'https://r2.vietphonics.vn/audio/latest_day30_six_months.mp3',
      JSON.stringify([
        { phoneme: '/θ/', score: 78, note: 'Đầu lưỡi kẹp nhẹ giữa 2 răng chuẩn xác (+36)' },
        { phoneme: '/ks/', score: 84, note: 'Bật rõ âm xát /s/ đuôi (+36)' },
        { phoneme: '/kt/', score: 82, note: 'Đã giải phóng xung âm bật vô thanh (+26)' },
        { phoneme: '/st/', score: 90, note: 'Biên độ dao động và thời gian nén hơi chuẩn (+30)' }
      ]),
      'Acoustic_GOP_v5.1',
      1,
      today,
      today
    );
  }
}


