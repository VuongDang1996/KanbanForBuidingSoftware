-- ============================================================================
-- VIETPHONICS AI LAB - RELATIONAL DATABASE SCHEMA (POSTGRESQL 3NF)
-- ARCH-101: ACID-compliant schema for 5,000+ paid users with B-tree indexes
-- ============================================================================

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    dialect_origin VARCHAR(20) DEFAULT 'bac' CHECK (dialect_origin IN ('bac', 'trung', 'nam')),
    target_goal VARCHAR(30) DEFAULT 'ielts' CHECK (target_goal IN ('ielts', 'tech', 'coda', 'zero')),
    role VARCHAR(20) DEFAULT 'learner' CHECK (role IN ('learner', 'instructor', 'admin')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 2. SUBSCRIPTIONS TABLE
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    tier VARCHAR(20) NOT NULL CHECK (tier IN ('free', 'pro_monthly', 'pro_quarterly', 'pro_yearly')),
    status VARCHAR(20) NOT NULL CHECK (status IN ('active', 'grace_period', 'expired', 'canceled')),
    price_vnd NUMERIC(12, 2) NOT NULL,
    started_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMPTZ NOT NULL,
    grace_until TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. PAYMENT TRANSACTIONS TABLE
CREATE TABLE IF NOT EXISTS payment_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    gateway VARCHAR(30) NOT NULL CHECK (gateway IN ('vietqr_napas', 'vnpay', 'momo', 'stripe')),
    transaction_code VARCHAR(100) UNIQUE NOT NULL,
    idempotency_key VARCHAR(128) UNIQUE NOT NULL,
    amount_vnd NUMERIC(12, 2) NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'paid', 'failed', 'refunded')),
    raw_payload JSONB,
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. ASSESSMENT SESSIONS TABLE
CREATE TABLE IF NOT EXISTS assessment_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_type VARCHAR(30) NOT NULL CHECK (session_type IN ('diagnostic_3min', 'daily_10min', 'roleplay', 'boss_battle')),
    gop_score NUMERIC(5, 2) NOT NULL,
    ielts_band NUMERIC(3, 1),
    duration_seconds INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 5. PHONEME SCORES TABLE (High-Frequency Time-Series Partition)
CREATE TABLE IF NOT EXISTS phoneme_scores (
    id BIGSERIAL,
    session_id UUID NOT NULL REFERENCES assessment_sessions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    phoneme_symbol VARCHAR(10) NOT NULL,
    target_word VARCHAR(100) NOT NULL,
    measured_gop NUMERIC(5, 2) NOT NULL,
    f0_pitch_hz NUMERIC(6, 2),
    f1_formant_hz NUMERIC(6, 2),
    f2_formant_hz NUMERIC(6, 2),
    coda_burst_energy NUMERIC(5, 2),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

-- 6. USER PHONEME MASTERY SUMMARY TABLE
CREATE TABLE IF NOT EXISTS user_phoneme_mastery (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    phoneme_symbol VARCHAR(10) NOT NULL,
    total_attempts INT DEFAULT 1,
    avg_gop NUMERIC(5, 2) NOT NULL,
    mastery_status VARCHAR(20) DEFAULT 'practicing' CHECK (mastery_status IN ('mastered', 'practicing', 'focus')),
    last_practiced_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, phoneme_symbol)
);

-- ============================================================================
-- B-TREE INDEXES FOR SUB-40MS QUERIES
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_subs_user_status ON subscriptions(user_id, status);
CREATE INDEX IF NOT EXISTS idx_tx_code ON payment_transactions(transaction_code);
CREATE INDEX IF NOT EXISTS idx_phoneme_user_symbol ON phoneme_scores(user_id, phoneme_symbol);
CREATE INDEX IF NOT EXISTS idx_sessions_user_date ON assessment_sessions(user_id, created_at DESC);
