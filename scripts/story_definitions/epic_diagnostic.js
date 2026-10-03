export const diagnosticStories = [
  {
    id: 'ELSA-102',
    epic_id: 'epic-diagnostic',
    title: 'Native Language (L1) Regional Dialect Calibration: Hiệu Chuẩn Ngữ Điệu Vùng Miền Việt Nam (Bắc - Trung - Nam)',
    persona: 'Người học tiếng Anh tại 3 miền Bắc, Trung, Nam của Việt Nam có các thói quen phát âm tiếng mẹ đẻ (L1) rất khác nhau',
    action: 'lựa chọn vùng miền sinh sống hoặc làm bài test hiệu chuẩn 30 giây để AI nhận diện đặc trưng phát âm địa phương, từ đó điều chỉnh trọng số chấm điểm và bài tập sửa lỗi tương ứng',
    value: 'loại bỏ hiện tượng chấm điểm sai lệch do chất giọng vùng miền (miền Bắc hay lẫn lộn l/n, miền Nam hay nuốt âm cuối /t/, /k/, miền Trung ngữ điệu nặng), tăng độ tin cậy và sự hài lòng của học viên',
    priority: 'must',
    status: 'in-progress',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-elsa-102-calibration-flow',
        given: 'Học viên bắt đầu phiên hiệu chuẩn vùng miền',
        when: 'Học viên chọn vùng miền (Bắc / Trung / Nam) hoặc đọc đoạn âm thanh mẫu chẩn đoán',
        then: 'Hệ thống thiết lập ma trận trọng số âm vị (Phonetic Weight Matrix) tùy biến cho tài khoản, phân bổ các bài tập khắc phục đúng điểm yếu ngữ âm của vùng miền đó.',
        completed: true
      },
      {
        id: 'ac-elsa-102-frontend-design',
        given: 'Giao diện hiệu chuẩn DialectCalibrationView',
        when: 'Hiển thị trên màn hình',
        then: 'Bản đồ Việt Nam dạng SVG tương tác 3 miền (Bắc: Sky-500, Trung: Amber-500, Nam: Emerald-500), khi click vào miền nào thì thẻ danh sách lỗi phổ biến trượt ra mượt mà 60fps với font Plus Jakarta Sans, badge cảnh báo viền Rose-500.',
        completed: true
      },
      {
        id: 'ac-elsa-102-backend-design',
        given: '5,000 học viên cùng lúc gửi dữ liệu hiệu chuẩn vùng miền',
        when: 'Endpoint POST /api/v1/user/dialect-calibration tiếp nhận dữ liệu',
        then: 'Ghi nhận hồ sơ vào bảng PostgreSQL user_dialect_profiles và nạp cấu hình trọng số vào Redis Hash user:dialect:{user_id} với TTL 7 ngày; thời gian phản hồi API P95 < 45ms.',
        completed: true
      },
      {
        id: 'ac-elsa-102-l1-precision',
        given: 'Học viên miền Bắc chọn giọng Bắc',
        when: 'Hệ thống thiết lập trọng số âm vị',
        then: 'Gia tăng độ nhạy nhận diện cặp âm /l/ và /n/, bổ sung bài tập phân biệt "light" vs "night", "lead" vs "need" vào lộ trình ưu tiên số 1.',
        completed: true
      },
      {
        id: 'ac-elsa-102-a11y-fallback',
        given: 'Học viên điều hướng không dùng chuột',
        when: 'Dùng phím Tab và phím mũi tên',
        then: 'Focus outline hiển thị rõ ràng trên từng vùng miền, aria-label đọc: "Miền Bắc: Lỗi đặc thù l/n, nhấn Enter để chọn", hỗ trợ phím số 1, 2, 3 để chọn nhanh.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-elsa-102-fe-map', title: 'Xây dựng component DialectMapSelector.jsx với SVG 3 miền tương tác và hiệu ứng hover pulse', category: 'Frontend', completed: true },
      { id: 't-elsa-102-fe-matrix', title: 'Thiết kế bảng hiển thị DialectPhonemeTable với badge độ lệch âm vị theo vùng miền', category: 'Frontend', completed: true },
      { id: 't-elsa-102-be-api', title: 'Xây dựng API REST POST /api/v1/user/dialect-calibration và GET /api/v1/user/dialect-profile', category: 'Backend', completed: true },
      { id: 't-elsa-102-be-redis', title: 'Thiết lập Redis Hash user:dialect:{userId} lưu ma trận trọng số âm vị cho 5,000 active users', category: 'Backend', completed: true },
      { id: 't-elsa-102-qa', title: 'Kiểm thử ma trận chấm điểm đối chiếu với 30 mẫu âm thanh chuẩn từ 3 vùng miền Việt Nam', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/components/diagnostic/DialectCalibrationModal.jsx\`
- **Component Tree**:
  \`\`\`
  <DialectCalibrationModal isOpen={isOpen} onClose={handleClose}>
    <DialectMapSvg activeRegion={selectedRegion} onSelectRegion={setSelectedRegion} />
    <RegionDetailCard region={selectedRegion}>
      <DialectRiskBadges risks={regionData.commonRisks} />
      <PhonemeWeightPreview weights={regionData.phonemeWeights} />
      <CalibrationAudioRecorder onCalibrationDone={handleSaveProfile} />
    </RegionDetailCard>
  </DialectCalibrationModal>
  \`\`\`
- **React State Shape**:
  \`\`\`typescript
  interface DialectState {
    selectedRegion: 'northern' | 'central' | 'southern';
    isRecording: boolean;
    audioBlob: Blob | null;
    calibratedWeights: Record<string, number>; // e.g. { "/l/": 1.4, "/n/": 1.4, "/t/": 1.2 }
    isSubmitting: boolean;
  }
  \`\`\`
- **Stitch Design Tokens & Tailwind**:
  - Container: \`bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-2xl max-w-2xl w-full\`
  - Region Badges:
    - Northern: \`bg-sky-500/10 text-sky-400 border border-sky-500/30 font-semibold text-xs px-3 py-1 rounded-full\`
    - Central: \`bg-amber-500/10 text-amber-400 border border-amber-500/30 font-semibold text-xs px-3 py-1 rounded-full\`
    - Southern: \`bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold text-xs px-3 py-1 rounded-full\`
  - Typography: \`font-['Plus_Jakarta_Sans']\` for headings, \`font-mono text-xs\` for phonetic weights.

---

### 🗄️ BACKEND DESIGN SPECIFICATION
- **REST API Endpoint**:
  \`\`\`http
  POST /api/v1/user/dialect-calibration
  Authorization: Bearer <JWT>
  Content-Type: application/json

  Request Body:
  {
    "userId": "usr_99a8b12f",
    "region": "northern",
    "detectedAnomalies": ["l_n_confusion", "final_s_omission"],
    "calibrationAudioUrl": "https://r2.vietphonics.com/calibration/usr_99a8b12f.opus"
  }

  Response 200 OK:
  {
    "success": true,
    "calibratedAt": "2026-10-03T13:45:00Z",
    "appliedWeights": {
      "/l/": 1.45,
      "/n/": 1.45,
      "/s/": 1.25,
      "/ʃ/": 1.10
    },
    "recommendedCurriculumModule": "mod_northern_remediation_v1"
  }
  \`\`\`
- **Database Schema (PostgreSQL DDL)**:
  \`\`\`sql
  CREATE TABLE user_dialect_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    region VARCHAR(20) NOT NULL CHECK (region IN ('northern', 'central', 'southern')),
    l1_penalties JSONB NOT NULL DEFAULT '{}'::jsonb,
    audio_sample_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_user_dialect UNIQUE(user_id)
  );
  CREATE INDEX idx_user_dialect_region ON user_dialect_profiles(region);
  \`\`\`
- **High Concurrency & Caching (5,000 Users)**:
  - Cache Key: \`user:dialect:{userId}\` (Redis Hash)
  - TTL: 604800s (7 days). Scoring worker reads dialect weights directly from Redis memory in <1ms without hitting PostgreSQL.`
  },
  {
    id: 'ELSA-103',
    epic_id: 'epic-diagnostic',
    title: 'Predicted IELTS & CEFR Speaking Band Estimator: Bảng Ước Tính Điểm IELTS Speaking & Khung CEFR',
    persona: 'Người học tiếng Anh chuẩn bị thi IELTS (mục tiêu Band 6.5 - 8.0) hoặc cần chứng chỉ CEFR (B1 - C1) cho công việc',
    action: 'xem bảng quy đổi điểm số phát âm chi tiết sang thang điểm IELTS Speaking (0 - 9.0) và khung năng lực Châu Âu CEFR (A1 - C2), kèm biểu đồ phân rã 4 tiêu chí chấm thi chính thức',
    value: 'giúp người học nắm bắt chính xác trình độ thực tế hiện tại, xóa tan sự mông lung và định lượng được số buổi luyện tập cần thiết để đạt mục tiêu band điểm mong muốn',
    priority: 'must',
    status: 'in-progress',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-elsa-103-prediction-flow',
        given: 'Học viên hoàn thành bài kiểm tra chẩn đoán hoặc tích lũy tối thiểu 10 bài luyện phát âm',
        when: 'Hệ thống kích hoạt thuật toán dự báo Band Estimator',
        then: 'Tính toán chính xác điểm ước lượng IELTS Speaking (e.g. 6.5) và CEFR Level (e.g. B2) kèm khoảng tin cậy (Confidence Interval ±0.5 band).',
        completed: true
      },
      {
        id: 'ac-elsa-103-frontend-design',
        given: 'Giao diện thẻ điểm BandEstimatorCard trong DashboardView',
        when: 'Render trên màn hình',
        then: 'Đồng hồ đo bán nguyệt (Semi-circle Gauge) hiển thị điểm IELTS lớn màu vàng kim Amber-400, bên cạnh là biểu đồ Radar SVG 4 trục chuẩn British Council (Pronunciation, Fluency, Lexical, Grammar), thanh so sánh CEFR A1-C2 phân tầng màu gradient.',
        completed: true
      },
      {
        id: 'ac-elsa-103-backend-design',
        given: '5,000 học viên đồng thời tra cứu hoặc cập nhật ước tính điểm band',
        when: 'Truy vấn GET /api/v1/assessment/ielts-prediction',
        then: 'Dữ liệu được lấy từ Redis cache user:ielts_band:{user_id} với thời gian phản hồi < 20ms; nền tảng tính toán cập nhật điểm định kỳ bằng BullMQ worker sau mỗi bài thi.',
        completed: true
      },
      {
        id: 'ac-elsa-103-l1-precision',
        given: 'Tiêu chí Pronunciation trong thang chấm IELTS Speaking',
        when: 'Hệ thống phân tích ảnh hưởng của ngữ âm L1 tiếng Việt',
        then: 'Chỉ rõ tỷ lệ mất điểm do "Nuốt âm cuối" (ảnh hưởng tiêu chí Pronunciation Features Band 6 vs Band 7) và gợi ý lộ trình nâng band cụ thể.',
        completed: true
      },
      {
        id: 'ac-elsa-103-a11y-fallback',
        given: 'Người dùng sử dụng công nghệ hỗ trợ đọc màn hình',
        when: 'Focus vào đồng hồ đo điểm IELTS',
        then: 'Trình đọc thông báo rõ: "Điểm dự báo IELTS Speaking: 6.5, tương đương khung CEFR B2. Tiêu chí Phát âm: 7.0, Độ lưu loát: 6.0".',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-elsa-103-fe-gauge', title: 'Xây dựng component IeltsGaugeMeter.jsx dạng SVG bán nguyệt với hoạt ảnh kim chỉ số mượt mà', category: 'Frontend', completed: true },
      { id: 't-elsa-103-fe-radar', title: 'Thiết kế biểu đồ Radar 4 trục đánh giá năng lực IELTS Speaking chuẩn khảo thí', category: 'Frontend', completed: true },
      { id: 't-elsa-103-be-algo', title: 'Phát triển module IeltsEstimatorService áp dụng thuật toán hồi quy phi tuyến tính (Polynomial Regression)', category: 'Backend', completed: true },
      { id: 't-elsa-103-be-cache', title: 'Thiết lập Redis Key user:ielts_band:{userId} lưu kết quả tính toán cho 5,000 active users', category: 'Backend', completed: true },
      { id: 't-elsa-103-qa', title: 'Kiểm thử đối chiếu thuật toán ước lượng điểm với 50 thí sinh có điểm thi IELTS Speaking thực tế', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/components/dashboard/IeltsBandEstimator.jsx\`
- **Component Structure**:
  \`\`\`
  <IeltsBandEstimator currentScore={userScore}>
    <ScoreGauge score={6.5} min={0} max={9.0} confidence="±0.5" />
    <CefrPillBadge level="B2" subtext="Independent User" />
    <FourPillarsRadarChart
      pronunciation={7.0}
      fluency={6.0}
      lexicalResource={6.5}
      grammaticalRange={6.5}
    />
    <BandRoadmapBanner targetBand={7.5} remainingWeeks={8} />
  </IeltsBandEstimator>
  \`\`\`
- **Stitch CSS Tokens**:
  - Score Gauge Arc: Stroke gradient \`from-amber-500 via-rose-500 to-indigo-500\`
  - Font: JetBrains Mono \`text-4xl font-extrabold text-amber-400\` cho con số Band
  - Radar Grid: Polygon strokes \`stroke-slate-700/60\`, fill \`fill-indigo-500/20\`.

---

### 🗄️ BACKEND DESIGN SPECIFICATION
- **API Endpoint Contract**:
  \`\`\`http
  GET /api/v1/assessment/ielts-prediction
  Authorization: Bearer <JWT>

  Response 200 OK:
  {
    "userId": "usr_99a8b12f",
    "predictedBand": 6.5,
    "confidenceInterval": [6.0, 7.0],
    "cefrEquivalent": "B2",
    "criteriaBreakdown": {
      "pronunciation": 7.0,
      "fluencyCoherence": 6.0,
      "lexicalResource": 6.5,
      "grammaticalAccuracy": 6.5
    },
    "l1ImpedimentFactors": [
      { "factor": "Final consonant deletion", "penaltyPoints": -0.5 },
      { "factor": "Monotone sentence stress", "penaltyPoints": -0.5 }
    ],
    "calculatedAt": "2026-10-03T14:10:00Z"
  }
  \`\`\`
- **Database Schema (PostgreSQL DDL)**:
  \`\`\`sql
  CREATE TABLE ielts_predictions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    predicted_band NUMERIC(2, 1) NOT NULL,
    cefr_level VARCHAR(5) NOT NULL,
    pronunciation_score NUMERIC(3, 1) NOT NULL,
    fluency_score NUMERIC(3, 1) NOT NULL,
    lexical_score NUMERIC(3, 1) NOT NULL,
    grammar_score NUMERIC(3, 1) NOT NULL,
    assessment_history JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
  CREATE INDEX idx_ielts_predictions_user ON ielts_predictions(user_id, created_at DESC);
  \`\`\`
- **5,000 Users Scale Specs**:
  - Redis cache key: \`user:ielts_band:{userId}\` với TTL 86,400s (24h).
  - Background recalculation kích hoạt sau mỗi bài kiểm tra chẩn đoán qua BullMQ queue \`queue:ielts_estimator\`.`
  },
  {
    id: 'USER-102',
    epic_id: 'epic-diagnostic',
    title: 'Granular Phoneme Mastery Ledger: Bản Đồ Ma Trận 44 Âm Vị IPA (Nguyên Âm, Nguyên Âm Đôi & Phụ Âm)',
    persona: 'Học viên muốn có cái nhìn toàn cảnh về năng lực phát âm của mình trên toàn bộ 44 âm trong bảng phiên âm quốc tế IPA',
    action: 'tra cứu bảng ma trận lưới 44 âm vị IPA, quan sát trạng thái thuần thục của từng âm (Xanh lá: Đã thuần thục >85%, Vàng: Đang luyện 60-84%, Đỏ: Cần cải thiện <60%) và click vào âm bất kỳ để mở bài luyện tập',
    value: 'biến bức tranh phát âm trừu tượng thành bản đồ trực quan minh bạch 100%, giúp học viên biết chính xác mình còn bao nhiêu âm chưa đạt và tập trung cải thiện đúng mục tiêu',
    priority: 'must',
    status: 'in-progress',
    size: 'XL',
    points: 13,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-user-102-matrix-grid',
        given: 'Học viên mở màn hình Ma Trận IPA',
        when: 'Hệ thống nạp điểm số tích lũy của 44 âm vị',
        then: 'Hiển thị đầy đủ 44 thẻ âm phân loại theo 3 nhóm chuẩn ngữ âm học quốc tế: Monophthongs (12 âm), Diphthongs (8 âm), Consonants (24 âm) với màu sắc phản ánh chính xác điểm thuần thục.',
        completed: true
      },
      {
        id: 'ac-user-102-frontend-design',
        given: 'Giao diện IpaMatrixView',
        when: 'Render trên màn hình máy tính hoặc điện thoại',
        then: 'Bố cục lưới Grid co giãn thông minh (Responsive 6 cột trên Desktop, 3 cột trên Mobile), font Noto Sans hiển thị chuẩn xác ký tự IPA (/θ/, /ð/, /æ/, /ʃ/, /ʒ/), hiệu ứng hover thẻ phát sáng viền gradient và phóng to nhẹ 1.05x.',
        completed: true
      },
      {
        id: 'ac-user-102-backend-design',
        given: '5,000 học viên truy cập ma trận âm vị cùng lúc',
        when: 'Gọi endpoint GET /api/v1/phonemes/mastery-ledger',
        then: 'Dữ liệu được truy xuất từ Redis Hash user:mastery_ledger:{user_id} với thời gian phản hồi dưới 15ms, không phát sinh tính toán nặng trên database.',
        completed: true
      },
      {
        id: 'ac-user-102-l1-precision',
        given: 'Các âm vị có độ khó cao nhất đối với người Việt (/θ/, /ð/, /dʒ/, /tʃ/, /z/)',
        when: 'Hiển thị trên ma trận',
        then: 'Gắn kèm huy hiệu cảnh báo "Bẫy Ngữ Âm L1" màu đỏ hồng để học viên đặc biệt chú ý và ưu tiên luyện tập trước.',
        completed: true
      },
      {
        id: 'ac-user-102-a11y-fallback',
        given: 'Học viên điều khiển bằng bàn phím',
        when: 'Dùng các phím mũi tên di chuyển qua lại giữa 44 ô âm vị',
        then: 'Focus ring màu indigo-500 bao quanh thẻ âm hiện tại, nhấn phím Enter để mở ngay hộp thoại chi tiết âm kèm mẫu audio phát âm chuẩn.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-user-102-fe-grid', title: 'Xây dựng component IpaMatrixGrid.jsx phân chia 3 phân vùng Monophthongs, Diphthongs và Consonants', category: 'Frontend', completed: true },
      { id: 't-user-102-fe-card', title: 'Thiết kế component PhonemeTileCard.jsx với hiệu ứng màu sắc động và badge cảnh báo bẫy âm L1', category: 'Frontend', completed: true },
      { id: 't-user-102-be-ledger', title: 'Xây dựng service PhonemeMasteryLedgerService tính toán điểm số bình quân trọng số thời gian (Time-decayed Score)', category: 'Backend', completed: true },
      { id: 't-user-102-be-schema', title: 'Thiết kế bảng PostgreSQL user_phoneme_mastery với compound index trên (user_id, phoneme_symbol)', category: 'Backend', completed: true },
      { id: 't-user-102-qa', title: 'Kiểm thử giao diện trên 10 kích thước màn hình từ iPhone SE đến màn hình 4K Ultrawide', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/components/matrix/IpaMatrixGrid.jsx\`
- **Component Hierarchy**:
  \`\`\`
  <IpaMatrixGrid>
    <PhonemeSection title="Monophthongs (12)" color="sky">
      {vowels.map(p => <PhonemeTile key={p.symbol} data={p} onClick={openDetailModal} />)}
    </PhonemeSection>
    <PhonemeSection title="Diphthongs (8)" color="violet">
      {diphthongs.map(p => <PhonemeTile key={p.symbol} data={p} onClick={openDetailModal} />)}
    </PhonemeSection>
    <PhonemeSection title="Consonants (24)" color="emerald">
      {consonants.map(p => <PhonemeTile key={p.symbol} data={p} onClick={openDetailModal} />)}
    </PhonemeSection>
    <PhonemeDetailModal activePhoneme={selectedPhoneme} onClose={closeModal} />
  </IpaMatrixGrid>
  \`\`\`
- **Stitch Design Tokens**:
  - Mastered Tile (≥85%): \`bg-emerald-950/40 border-emerald-500/50 text-emerald-400 hover:border-emerald-400\`
  - Learning Tile (60-84%): \`bg-amber-950/40 border-amber-500/50 text-amber-400 hover:border-amber-400\`
  - Critical Tile (<60%): \`bg-rose-950/40 border-rose-500/50 text-rose-400 hover:border-rose-400\`
  - Font: \`font-['Noto_Sans'] font-bold text-lg\` cho ký hiệu ngữ âm.

---

### 🗄️ BACKEND DESIGN SPECIFICATION
- **API Endpoint Contract**:
  \`\`\`http
  GET /api/v1/phonemes/mastery-ledger
  Authorization: Bearer <JWT>

  Response 200 OK:
  {
    "userId": "usr_99a8b12f",
    "overallMasteryPercent": 74.2,
    "masteredCount": 28,
    "inProgressCount": 11,
    "criticalCount": 5,
    "phonemes": [
      {
        "symbol": "/iː/",
        "category": "monophthong",
        "score": 92,
        "status": "mastered",
        "attempts": 45,
        "lastPracticed": "2026-10-02T19:30:00Z"
      },
      {
        "symbol": "/θ/",
        "category": "consonant",
        "score": 52,
        "status": "critical",
        "attempts": 22,
        "isL1Trap": true,
        "lastPracticed": "2026-10-03T08:15:00Z"
      }
    ]
  }
  \`\`\`
- **Database Schema (PostgreSQL DDL)**:
  \`\`\`sql
  CREATE TABLE user_phoneme_mastery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    phoneme_symbol VARCHAR(10) NOT NULL,
    current_score NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
    practice_count INT NOT NULL DEFAULT 0,
    last_practiced_at TIMESTAMPTZ,
    historical_scores JSONB NOT NULL DEFAULT '[]'::jsonb,
    CONSTRAINT uq_user_phoneme UNIQUE (user_id, phoneme_symbol)
  );
  CREATE INDEX idx_user_mastery_lookup ON user_phoneme_mastery(user_id, current_score);
  \`\`\`
- **5,000 Users Scale Strategy**:
  - Toàn bộ ledger 44 âm của mỗi user được lưu trong Redis Hash \`user:mastery_ledger:{userId}\`.
  - Khi học viên chấm điểm 1 từ, worker cập nhật nguyên tử (HSET / HINCRBY) vào Redis trong 2ms, sau đó flush về PostgreSQL định kỳ mỗi 5 phút.`
  },
  {
    id: 'VN-102',
    epic_id: 'epic-diagnostic',
    title: 'Vietnamese L1 3-Minute Diagnostic Pronunciation Screener: Bài Sàng Lọc Phát Âm Toàn Diện 3 Phút Cho Người Việt',
    persona: 'Người dùng mới cài đặt ứng dụng muốn biết ngay mức độ phát âm chuẩn của mình chỉ trong 3 phút làm bài sàng lọc nhanh',
    action: 'đọc lần lượt 12 câu thử thách được thiết kế riêng để bẫy toàn bộ các lỗi phát âm kinh điển nhất của người Việt, nhận ngay báo cáo chẩn đoán chi tiết sau khi kết thúc',
    value: 'tạo trải nghiệm kích hoạt người dùng mới (Onboarding Magic Moment) cực kỳ ấn tượng, chuyển đổi người dùng mới thành học viên gắn kết trung thành ngay từ phút đầu tiên',
    priority: 'must',
    status: 'in-progress',
    size: 'XL',
    points: 13,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-vn-102-screener-flow',
        given: 'Người dùng mới bắt đầu bài sàng lọc 3 phút',
        when: 'Người dùng đọc lần lượt qua 12 thẻ câu chẩn đoán',
        then: 'Hệ thống thu âm, tự động phát hiện khoảng lặng dừng nói (Voice Activity Detection - VAD) và chuyển câu kế tiếp mượt mà không cần bấm nút.',
        completed: true
      },
      {
        id: 'ac-vn-102-frontend-design',
        given: 'Giao diện DiagnosticScreenerView',
        when: 'Render trên màn hình',
        then: 'Thanh tiến trình 12 bước (Progress Bar) chạy mượt mà ở trên cùng, thẻ câu hỏi phong cách Glassmorphism bo tròn 24px, dải sóng âm 48kHz nhảy sống động theo giọng nói, nút micro tròn đường kính 72px có vòng sáng radar phát quang màu Rose-500.',
        completed: true
      },
      {
        id: 'ac-vn-102-backend-design',
        given: '5,000 người dùng mới cùng làm bài sàng lọc trong chiến dịch ra mắt',
        when: 'Gửi 12 đoạn âm thanh lên API POST /api/v1/diagnostic/screener-batch',
        then: 'Hệ thống đưa các đoạn âm thanh vào hàng đợi Redis BullMQ priority queue, xử lý song song trên các GPU worker và trả về báo cáo chẩn đoán tổng thể trong vòng dưới 2.5 giây.',
        completed: true
      },
      {
        id: 'ac-vn-102-l1-precision',
        given: '12 câu chẩn đoán được thiết kế ngữ âm chuyên biệt',
        when: 'Phân tích kết quả kiểm tra',
        then: 'Chẩn đoán bao phủ 100% 5 nhóm lỗi L1 chí mạng: 1. Nuốt âm cuối /t, d, s, z/, 2. Nhầm /θ/ vs /t/, 3. Lẫn /ʃ/ vs /s/, 4. Trọng âm đều đều kiểu thanh điệu tiếng Việt, 5. Thiếu nối âm (linking sound).',
        completed: true
      },
      {
        id: 'ac-vn-102-a11y-fallback',
        given: 'Người dùng gặp lỗi micro hoặc từ chối cấp quyền',
        when: 'Trình duyệt chặn MediaStream API',
        then: 'Hiển thị hộp thoại hướng dẫn cấp quyền rõ ràng có hình ảnh minh họa cho cả Chrome, Safari, Edge và hỗ trợ chế độ làm bài nghe trắc nghiệm âm thanh thay thế.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-vn-102-fe-vad', title: 'Tích hợp AudioWorklet VAD (Voice Activity Detection) tự động ngắt câu sau 1.5s im lặng', category: 'Frontend', completed: true },
      { id: 't-vn-102-fe-cards', title: 'Xây dựng giao diện DiagnosticWizardCard.jsx với hoạt ảnh chuyển trang 3D mượt mà', category: 'Frontend', completed: true },
      { id: 't-vn-102-be-queue', title: 'Thiết lập hàng đợi BullMQ queue:diagnostic_screener xử lý song song 200 lượt test/giây', category: 'Backend', completed: true },
      { id: 't-vn-102-be-report', title: 'Xây dựng bộ sinh báo cáo DiagnosticReportGenerator xuất dữ liệu phân tích chuẩn JSON cho dashboard', category: 'Backend', completed: true },
      { id: 't-vn-102-qa', title: 'Kiểm thử End-to-End quy trình chẩn đoán từ lúc cấp quyền micro đến khi nhận báo cáo phân tích', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/views/DiagnosticScreenerView.jsx\`
- **Interactive State Machine**:
  \`\`\`typescript
  type ScreenerStep = 'intro' | 'calibrating' | 'recording_item' | 'analyzing' | 'summary_report';
  interface ScreenerState {
    step: ScreenerStep;
    currentItemIndex: number; // 0..11
    audioBlobs: Blob[];
    rmsVolume: number;
    vadSilenceTimer: number;
    isUploading: boolean;
    finalReport: DiagnosticReport | null;
  }
  \`\`\`
- **Stitch Design Tokens**:
  - Container: \`min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4\`
  - Card: \`bg-slate-900/90 border border-slate-800 rounded-3xl p-8 max-w-xl w-full shadow-2xl relative overflow-hidden\`
  - Big Mic Button: \`w-20 h-20 rounded-full bg-rose-600 hover:bg-rose-500 shadow-[0_0_35px_rgba(225,29,72,0.5)] flex items-center justify-center transition-all\`
  - Progress: 12 mini indicator dots, active dot: \`w-8 bg-rose-500 rounded-full h-2\`, inactive: \`w-2 bg-slate-800 rounded-full h-2\`.

---

### 🗄️ BACKEND DESIGN SPECIFICATION
- **API Endpoint Contract**:
  \`\`\`http
  POST /api/v1/diagnostic/screener-batch
  Authorization: Bearer <JWT>
  Content-Type: multipart/form-data

  Form Data:
  - userId: "usr_99a8b12f"
  - audio_0..audio_11: [binary webm/opus files]
  - clientMetrics: {"device": "Chrome Mac", "avgLatencyMs": 32}

  Response 200 OK:
  {
    "reportId": "rep_77182a",
    "overallAccuracy": 68.5,
    "ieltsPredictedBand": 6.0,
    "topErrors": [
      { "phoneme": "/t/", "position": "final", "description": "Nuốt âm đuôi trong từ 'contact', 'first'" },
      { "phoneme": "/θ/", "position": "initial", "description": "Phát âm thành /t/ trong từ 'thought'" }
    ],
    "strengths": ["Clear front vowels /iː/, /e/", "Good speech rate (130 WPM)"],
    "customLearningPathId": "path_remediation_l1_starter"
  }
  \`\`\`
- **Database Schema (PostgreSQL DDL)**:
  \`\`\`sql
  CREATE TABLE diagnostic_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    overall_accuracy NUMERIC(5, 2) NOT NULL,
    predicted_ielts NUMERIC(2, 1) NOT NULL,
    diagnosed_errors JSONB NOT NULL DEFAULT '[]'::jsonb,
    audio_manifest JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
  CREATE INDEX idx_diagnostic_sessions_user ON diagnostic_sessions(user_id, created_at DESC);
  \`\`\`
- **5,000 Users Scale Specs**:
  - Client nén âm thanh trực tiếp sang chuẩn Opus 24kbps trước khi upload (mỗi file chỉ ~30KB).
  - Tải lên trực tiếp song song lên Cloudflare R2 bucket qua Presigned URLs, backend chỉ nhận JSON manifest để kích hoạt worker phân tích.`
  }
];
