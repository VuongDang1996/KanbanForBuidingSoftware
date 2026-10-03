export const prosodyStories = [
  {
    id: 'ELSA-202',
    epic_id: 'epic-prosody',
    title: 'Syllable Stress & Capitalized Word Emphasis Evaluator: Đánh Giá Trọng Âm Từ & Nhấn Từ Trọng Tâm',
    persona: 'Người học tiếng Anh thường đọc từ đa âm tiết bằng giọng đều đều không trọng âm hoặc đánh sai trọng âm (e.g. đọc "PHOtograph" thành "phoTOgraph")',
    action: 'phát âm các từ đa âm tiết và quan sát kích thước các bong bóng âm tiết (Syllable Bubbles): âm tiết mang trọng âm hiển thị to gấp đôi, có cao độ cao hơn và ngân dài hơn',
    value: 'nắm vững bản chất 3 yếu tố của trọng âm tiếng Anh (To hơn - Dài hơn - Cao hơn), loại bỏ hiện tượng nói tiếng Anh bằng ngữ điệu phẳng như tiếng Việt',
    priority: 'must',
    status: 'in-progress',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-elsa-202-stress-calc',
        given: 'Học viên đọc từ đa âm tiết (e.g., "COM-pu-ter", "pho-TO-gra-phy")',
        when: 'Hệ thống đo đạc 3 chỉ số âm học: Năng lượng RMS (dB), Thời lượng phát âm (Duration ms), và Tần số cơ bản F0 (Pitch Hz)',
        then: 'Xác định chính xác âm tiết nào được người học nhấn mạnh nhất và đối chiếu với từ điển trọng âm chuẩn Oxford/Cambridge.',
        completed: true
      },
      {
        id: 'ac-elsa-202-frontend-design',
        given: 'Giao diện SyllableStressCard',
        when: 'Render trên màn hình',
        then: 'Từ được phân tách thành các bong bóng âm tiết: Âm tiết trọng âm chính có đường kính 64px màu tím Indigo-500 phát sáng, âm tiết không trọng âm có đường kính 32px màu xám mờ; có thanh đo cao độ Pitch Pillar trực quan ngay dưới từng âm tiết.',
        completed: true
      },
      {
        id: 'ac-elsa-202-backend-design',
        given: '5,000 học viên cùng làm bài luyện trọng âm',
        when: 'Gửi audio lên POST /api/v1/scoring/syllable-stress',
        then: 'Thuật toán tính toán năng lượng RMS và F0 trích xuất sau mỗi 10ms frame, so sánh tỷ lệ tỷ đối (Relative Stress Ratio) và trả về kết quả trong dưới 120ms.',
        completed: true
      },
      {
        id: 'ac-elsa-202-l1-precision',
        given: 'Người Việt hay biến trọng âm tiếng Anh thành "dấu sắc" tiếng Việt (e.g. đọc "pencil" thành "pén-xì")',
        when: 'Hệ thống phát hiện cao độ tăng vọt nhưng thời lượng quá ngắn',
        then: 'Cảnh báo sư phạm: "Bạn đang thêm dấu sắc tiếng Việt! Trọng âm tiếng Anh không chỉ cao hơn mà phải ngân dài gấp đôi âm tiết phụ".',
        completed: true
      },
      {
        id: 'ac-elsa-202-a11y-fallback',
        given: 'Học viên sử dụng bàn phím',
        when: 'Nhấn phím 1, 2, 3 để chọn âm tiết tương ứng',
        then: 'Hệ thống phát mẫu âm thanh của riêng âm tiết đó được cô lập (Isolated Syllable Audio) để học viên nghe rõ sự tương phản.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-elsa-202-fe-bubbles', title: 'Xây dựng component SyllableBubbleVisualizer.jsx với hiệu ứng bong bóng co giãn theo độ lớn trọng âm', category: 'Frontend', completed: true },
      { id: 't-elsa-202-fe-pillars', title: 'Thiết kế biểu đồ 3 cột Energy-Duration-Pitch so sánh tỷ lệ giữa âm nhấn và âm lướt', category: 'Frontend', completed: true },
      { id: 't-elsa-202-be-stress', title: 'Phát triển module StressScoringEngine tính toán tỷ lệ tương đối giữa các âm tiết dựa trên F0 và RMS', category: 'Backend', completed: true },
      { id: 't-elsa-202-be-dict', title: 'Tích hợp từ điển trọng âm CMU Pronouncing Dictionary 134,000 từ lưu trong bộ nhớ đệm Redis', category: 'Backend', completed: true },
      { id: 't-elsa-202-qa', title: 'Kiểm thử với các cặp từ thay đổi trọng âm theo từ loại (e.g. REcord danh từ vs reCORD động từ)', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/components/prosody/SyllableStressVisualizer.jsx\`
- **Component Structure**:
  \`\`\`
  <SyllableStressVisualizer word="photographer" targetStressIndex={1}>
    <SyllableTrack>
      <SyllableBubble text="pho" isStressed={false} relativeEnergy={0.3} />
      <SyllableBubble text="TO" isStressed={true} relativeEnergy={1.0} hasGlow={true} />
      <SyllableBubble text="gra" isStressed={false} relativeEnergy={0.25} />
      <SyllableBubble text="pher" isStressed={false} relativeEnergy={0.2} />
    </SyllableTrack>
    <StressMetricsBreakdown
      durationRatio="2.4x"
      volumeRatio="+6dB"
      pitchDelta="+45Hz"
    />
  </SyllableStressVisualizer>
  \`\`\`
- **Stitch Design Tokens**:
  - Primary Stressed Bubble: \`w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-extrabold text-xl shadow-[0_0_30px_rgba(99,102,241,0.5)] border-2 border-indigo-300\`
  - Unstressed Bubble: \`w-12 h-12 rounded-full bg-slate-800 text-slate-400 font-medium text-sm border border-slate-700\`.

---

### 🗄️ BACKEND DESIGN SPECIFICATION
- **REST API Endpoint**:
  \`\`\`http
  POST /api/v1/scoring/syllable-stress
  Authorization: Bearer <JWT>
  Content-Type: application/json

  Request Body:
  {
    "word": "photographer",
    "audioUrl": "https://r2.vietphonics.com/audio/session_402.opus"
  }

  Response 200 OK:
  {
    "targetWord": "photographer",
    "targetStressPattern": [0, 1, 0, 0],
    "detectedStressPattern": [0, 1, 0, 0],
    "isStressCorrect": true,
    "syllables": [
      { "syllable": "pho", "durationMs": 140, "rmsDb": -22, "pitchAvgHz": 180 },
      { "syllable": "to", "durationMs": 310, "rmsDb": -14, "pitchAvgHz": 235, "isProminent": true },
      { "syllable": "gra", "durationMs": 120, "rmsDb": -24, "pitchAvgHz": 175 },
      { "syllable": "pher", "durationMs": 130, "rmsDb": -23, "pitchAvgHz": 165 }
    ],
    "stressScore": 95
  }
  \`\`\`
- **High Concurrency (5,000 Users)**:
  - CMU Pronouncing Dict được nạp sẵn vào Redis in-memory (dung lượng chỉ 12MB RAM).
  - Tra cứu cấu trúc trọng âm chuẩn O(1) < 0.5ms.`
  },
  {
    id: 'ELSA-203',
    epic_id: 'epic-prosody',
    title: 'Suprasegmental Pitch & Sentence Intonation Melody Tracker: Theo Dõi Đường Cong Cao Độ & Giai Điệu Ngữ Điệu Câu',
    persona: 'Người học khi nói tiếng Anh thường phát âm cả câu như một đường thẳng tắp, không có ngữ điệu lên giọng (Rising) hay xuống giọng (Falling) tự nhiên',
    action: 'nói các câu giao tiếp thực tế và quan sát đường cong cao độ giọng nói thời gian thực (Real-Time Pitch Contour Curve) chạy đè lên đường cong mẫu của người bản xứ',
    value: 'làm chủ giai điệu câu tiếng Anh (Sentence Melody): biết lên giọng ở câu hỏi Yes/No, hạ giọng ở câu trần thuật và nhấn đúng từ khóa truyền tải cảm xúc',
    priority: 'must',
    status: 'in-progress',
    size: 'XL',
    points: 13,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-elsa-203-pitch-tracking',
        given: 'Học viên nói một câu hội thoại hoàn chỉnh',
        when: 'Thuật toán YIN / CREPE Pitch Tracker trích xuất cao độ F0 liên tục',
        then: 'Vẽ ra đường cong cao độ mượt mà (Pitch Contour Curve) và so sánh độ tương đồng hình học (Geometric Fréchet Distance) với đường cong bản ngữ.',
        completed: true
      },
      {
        id: 'ac-elsa-203-frontend-design',
        given: 'Giao diện PitchMelodyView',
        when: 'Render trên màn hình',
        then: 'Đồ thị SVG hiển thị 2 đường cong giai điệu: Đường màu xanh Sky-400 (Giọng mẫu bản ngữ) và đường màu vàng Amber-400 (Giọng học viên) uốn lượn nhịp nhàng, biểu tượng mũi tên chỉ hướng (Lên / Xuống) hiển thị rõ ở cuối câu.',
        completed: true
      },
      {
        id: 'ac-elsa-203-backend-design',
        given: '5,000 học viên nộp bài phân tích ngữ điệu câu',
        when: 'Endpoint POST /api/v1/scoring/pitch-contour tiếp nhận',
        then: 'Chuẩn hóa cao độ theo bán âm (Semitone Normalization relative to user median pitch) giúp so sánh chính xác giữa giọng nam trầm và giọng nữ cao, hoàn tất dưới 180ms.',
        completed: true
      },
      {
        id: 'ac-elsa-203-l1-precision',
        given: 'Học viên đọc câu hỏi Yes/No ("Are you coming?") nhưng hạ giọng ở cuối câu như thói quen tiếng Việt',
        when: 'Hệ thống đối soát đường cong ngữ điệu',
        then: 'Vẽ vùng lệch màu đỏ ở cuối câu kèm lời nhắc: "Hãy vút cao giọng ở từ \'coming\' (Rising Intonation) để thể hiện câu hỏi thân thiện!".',
        completed: true
      },
      {
        id: 'ac-elsa-203-a11y-fallback',
        given: 'Học viên muốn nghe âm thanh giai điệu đơn giản (Humming / Whistle Melody)',
        when: 'Bấm nút "Nghe Giai Điệu Ùm Ùm"',
        then: 'Bộ tổng hợp âm thanh phát tiếng huýt sáo hoặc tiếng đàn synth mô phỏng chính xác đường lượn cao độ không lời, giúp người học cảm thụ giai điệu thuần khiết.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-elsa-203-fe-curve', title: 'Xây dựng component PitchContourSvg.jsx vẽ đường cong Bezier mượt mà so sánh 2 dải cao độ F0', category: 'Frontend', completed: true },
      { id: 't-elsa-203-fe-synth', title: 'Tích hợp Web Audio Oscillator phát âm thanh Humming Melody mô phỏng đường cong ngữ điệu', category: 'Frontend', completed: true },
      { id: 't-elsa-203-be-yin', title: 'Triển khai thuật toán YIN Pitch Tracking trích xuất F0 sau mỗi 10ms có bộ lọc nhiễu vô thanh (Voiced/Unvoiced Gate)', category: 'AI/DSP', completed: true },
      { id: 't-elsa-203-be-norm', title: 'Phát triển module SemitoneConverter chuẩn hóa dải cao độ cá nhân loại bỏ chênh lệch giới tính', category: 'Backend', completed: true },
      { id: 't-elsa-203-qa', title: 'Kiểm thử với 3 loại câu: Câu trần thuật (Fall), Câu hỏi Yes/No (Rise), và Câu hỏi Wh (Fall)', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/components/prosody/PitchContourMelodyView.jsx\`
- **Component Hierarchy**:
  \`\`\`
  <PitchContourMelodyView sentence="Are you ready to order?" sentenceType="yes_no_question">
    <SvgPitchCanvas width={640} height={200}>
      <NativePitchLine points={nativeContour} stroke="#38bdf8" />
      <UserPitchLine points={userContour} stroke="#f59e0b" />
      <SentenceWordLabels words={words} timestamps={wordTimes} />
      <IntonationArrow direction="rise" atTimestamp={lastWordTime} />
    </SvgPitchCanvas>
    <HummingAudioButton onPlayHumming={playPitchSynthesizer} />
  </PitchContourMelodyView>
  \`\`\`
- **Stitch Design Tokens**:
  - Canvas Container: \`bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-xl\`
  - Native Curve: \`stroke-[3px] stroke-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]\`
  - User Curve: \`stroke-[3px] stroke-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]\`.

---

### 🗄️ BACKEND DESIGN SPECIFICATION
- **REST API Endpoint**:
  \`\`\`http
  POST /api/v1/scoring/pitch-contour
  Authorization: Bearer <JWT>
  Content-Type: application/json

  Request Body:
  {
    "sentenceId": "sent_yn_01",
    "audioUrl": "https://r2.vietphonics.com/audio/session_503.opus"
  }

  Response 200 OK:
  {
    "sentenceType": "yes_no_question",
    "targetTerminalPattern": "rise",
    "detectedTerminalPattern": "rise",
    "contourSimilarityScore": 88.5,
    "userMedianPitchHz": 195.4,
    "contourNormalizedPoints": [
      { "timeSec": 0.1, "semitone": 0.2 },
      { "timeSec": 0.5, "semitone": 1.1 },
      { "timeSec": 1.2, "semitone": 4.8 }
    ]
  }
  \`\`\`
- **High Concurrency (5,000 Users)**:
  - Đường cong chuẩn (Gold Standard Native Contours) của các câu luyện tập được tính sẵn và lưu trong Cloudflare KV / Redis với TTL 30 ngày.`
  },
  {
    id: 'VN-103',
    epic_id: 'epic-prosody',
    title: 'Syllable Stress vs. Tone Mark Visualizer & Schwa Demotion: Đối Soát Trọng Âm vs Thanh Điệu & Luyện Giảm Âm Schwa',
    persona: 'Học viên Việt Nam bị thói quen thanh điệu (Dấu sắc, huyền, hỏi, ngã, nặng) chi phối nặng nề, luôn có xu hướng đọc rõ từng âm tiết tiếng Anh như một từ đơn',
    action: 'quan sát bảng đối chiếu cơ chế giữa "Thanh điệu đơn lập tiếng Việt" vs "Trọng âm động học tiếng Anh", và luyện các bài tập hạ âm schwa (/ə/) để biến các âm tiết không trọng âm thành âm lướt nhẹ',
    value: 'giải phóng học viên khỏi tư duy thanh điệu tiếng mẹ đẻ, giúp câu nói tiếng Anh có độ nén nhịp điệu (Stress-timed Rhythm) tự nhiên như người bản xứ',
    priority: 'must',
    status: 'in-progress',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-vn-103-schwa-demotion',
        given: 'Học viên luyện từ chứa âm lướt schwa (e.g., "ba-NA-na", "a-BOUT", "CHO-co-late")',
        when: 'Hệ thống đo đạc thời lượng và độ mở nguyên âm của âm schwa',
        then: 'Nếu âm schwa được phát âm cực ngắn (<70ms) và thả lỏng cơ miệng về trung tâm (F1/F2 trung tính) thì ghi nhận thành công kỹ năng giảm âm (Schwa Demotion).',
        completed: true
      },
      {
        id: 'ac-vn-103-frontend-design',
        given: 'Giao diện StressVsToneView',
        when: 'Render trên màn hình',
        then: 'Hiển thị đồ họa so sánh 2 thế giới: Bên trái là cột "Thanh điệu tiếng Việt" với các dấu câu tĩnh; bên phải là cột "Nhịp điệu tiếng Anh" có các hạt âm tiết to nhỏ nhún nhảy theo nhạc beat, ký hiệu /ə/ hiển thị màu xanh ngọc lấp lánh.',
        completed: true
      },
      {
        id: 'ac-vn-103-backend-design',
        given: '5,000 học viên cùng làm bài luyện giảm âm schwa',
        when: 'Xử lý qua endpoint POST /api/v1/pedagogy/schwa-check',
        then: 'Phân tích Formant F1/F2 của âm lướt so với vùng trung tính (500Hz / 1500Hz) trong dưới 50ms, trả về điểm số độ thả lỏng cơ miệng.',
        completed: true
      },
      {
        id: 'ac-vn-103-l1-precision',
        given: 'Học viên phát âm từ "banana" thành "ba-na-nà" (đều 3 âm tiết)',
        when: 'Hệ thống phát hiện lỗi không giảm âm',
        then: 'Hiển thị lời khuyên: "Bạn đang đọc rõ chữ \'ba\'! Hãy đọc lướt thật nhanh thành /bə/ - chỉ lướt nhẹ môi như một tiếng thở dài".',
        completed: true
      },
      {
        id: 'ac-vn-103-a11y-fallback',
        given: 'Học viên muốn cảm nhận nhịp điệu qua xúc giác',
        when: 'Thiết bị di động có hỗ trợ motor rung (Vibration API)',
        then: 'Điện thoại rung mạnh ở âm tiết trọng âm chính và rung siêu nhẹ ở âm schwa, tạo phản hồi xúc giác (Haptic Feedback) sống động.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-vn-103-fe-contrast', title: 'Xây dựng component StressVsToneComparison.jsx trình diễn trực quan sự khác biệt ngôn ngữ đơn lập vs đa âm tiết', category: 'Frontend', completed: true },
      { id: 't-vn-103-fe-haptic', title: 'Tích hợp Navigator.vibrate Haptic API rung theo nhịp trọng âm trên thiết bị di động', category: 'Frontend', completed: true },
      { id: 't-vn-103-be-schwa', title: 'Xây dựng thuật toán kiểm tra độ tập trung Formant nguyên âm schwa (Neutral Formant Proximity)', category: 'AI/DSP', completed: true },
      { id: 't-vn-103-be-cache', title: 'Thiết lập danh mục 500 từ vựng chứa âm schwa dễ nhầm lẫn nhất của người Việt lưu trong Redis', category: 'Backend', completed: true },
      { id: 't-vn-103-qa', title: 'Kiểm thử phản hồi xúc giác trên thiết bị di động Android và đảm bảo không gây lỗi trên iOS Safari', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/components/prosody/StressVsToneVisualizer.jsx\`
- **Component Hierarchy**:
  \`\`\`
  <StressVsToneVisualizer word="banana" schwaPositions={[0, 2]}>
    <LinguisticContrastCard>
      <VietnameseToneColumn title="Tiếng Việt (Đơn lập)" description="Mỗi âm tiết mang thanh điệu riêng biệt, đều độ dài" />
      <EnglishStressColumn title="Tiếng Anh (Stress-timed)" description="Âm nhấn vươn cao kéo dài, âm phụ co rút thành Schwa /ə/" />
    </LinguisticContrastCard>
    <SchwaDemotionDrill isSchwaRelaxed={true} durationMs={55} />
  </StressVsToneVisualizer>
  \`\`\`
- **Stitch Design Tokens**:
  - Contrast Card: \`grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-slate-900 rounded-3xl border border-slate-800\`
  - Schwa Chip: \`bg-teal-500/10 text-teal-400 border border-teal-500/30 font-bold px-3 py-1 rounded-full animate-pulse\`.

---

### 🗄️ BACKEND DESIGN SPECIFICATION
- **REST API Endpoint**:
  \`\`\`http
  POST /api/v1/pedagogy/schwa-check
  Authorization: Bearer <JWT>
  Content-Type: application/json

  Request Body:
  {
    "word": "banana",
    "audioUrl": "https://r2.vietphonics.com/audio/session_604.opus"
  }

  Response 200 OK:
  {
    "isSchwaProperlyDemoted": true,
    "schwaDurationMs": 58,
    "f1Hz": 510,
    "f2Hz": 1490,
    "distanceFromNeutralCenter": 22.4,
    "demotionGrade": "excellent"
  }
  \`\`\`
- **High Concurrency (5,000 Users)**:
  - Dữ liệu 500 bài tập Schwa được lưu sẵn trên Redis CDN với TTL 86,400s.`
  }
];
