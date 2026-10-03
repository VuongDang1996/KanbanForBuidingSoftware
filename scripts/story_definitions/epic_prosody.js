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
    uiMockupUrl: '/src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-elsa-202-stress-bubbles',
        given: 'Học viên phát âm từ đa âm tiết (e.g., "pho-TO-gra-pher", "COM-pu-ter")',
        when: 'Hệ thống đo đạc năng lượng và thời lượng từng âm tiết',
        then: 'Dải bong bóng âm tiết (Syllable Bubbles) hiển thị: Âm tiết trọng âm chính có đường kính 64px màu tím Indigo-500 phát sáng, các âm tiết phụ chỉ có kích thước 32px màu xám mờ.',
        completed: true
      },
      {
        id: 'ac-elsa-202-three-pillars',
        given: 'Học viên bấm vào âm tiết trọng âm để xem chi tiết',
        when: 'Bảng 3 Cột Âm Học (Three Pillars) hiển thị',
        then: 'So sánh trực tiếp 3 chỉ số giữa âm nhấn và âm lướt: Độ dài thời gian (Duration ms - gấp 2-2.5 lần), Độ to (Volume dB - cao hơn 4-6dB), và Cao độ (Pitch Hz).',
        completed: true
      },
      {
        id: 'ac-elsa-202-l1-tone-warning',
        given: 'Người Việt có thói quen đánh "dấu sắc" vào trọng âm tiếng Anh (e.g. đọc "pencil" thành "pén-xì")',
        when: 'Cao độ tăng vọt nhưng thời lượng phát âm quá ngắn (<120ms)',
        then: 'Bật cảnh báo sư phạm: "Bạn đang thêm dấu sắc tiếng Việt! Trọng âm tiếng Anh cần phải ngân dài và mở to miệng, không chỉ đơn thuần là đẩy cao giọng".',
        completed: true
      },
      {
        id: 'ac-elsa-202-keyboard-isolate',
        given: 'Học viên sử dụng bàn phím số 1, 2, 3, 4',
        when: 'Bấm phím số tương ứng với vị trí âm tiết',
        then: 'Hệ thống tự động cô lập và phát riêng file audio của âm tiết đó (Isolated Syllable Playback) để luyện khả năng thẩm âm đối chiếu.',
        completed: false
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-elsa-202-fe-bubbles', title: 'Xây dựng component SyllableBubbleVisualizer.jsx với hiệu ứng bong bóng co giãn theo độ lớn trọng âm', category: 'Frontend', completed: true },
      { id: 't-elsa-202-fe-pillars', title: 'Thiết kế biểu đồ 3 cột Energy-Duration-Pitch so sánh tỷ lệ giữa âm nhấn và âm lướt', category: 'Frontend', completed: true },
      { id: 't-elsa-202-fe-slice', title: 'Tích hợp bộ cắt audio Web Audio API phát riêng từng âm tiết theo phím số 1-4', category: 'Frontend', completed: true },
      { id: 't-elsa-202-qa', title: 'Kiểm thử với các cặp từ hoán đổi trọng âm theo từ loại (e.g. REcord danh từ vs reCORD động từ)', category: 'QA', completed: false }
    ]),
    notes: `### 🎨 PURE FRONTEND DESIGN SPECIFICATION
- **Phân loại**: Pure Frontend UI/UX Component (Syllable Bubbles & Three Pillars)
- **UI Mockup**: \`vietphonics-app/src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html\`
- **Frontend Component**: \`vietphonics-app/src/components/prosody/SyllableStressVisualizer.jsx\`

#### 📐 Layout & Bubble Visual Structure
\`\`\`
+-------------------------------------------------------------+
| Từ: "pho-TO-gra-phy"                                        |
|                                                             |
|    (pho)       ((  TO  ))       (gra)        (phy)          |
|    32px           64px          32px         32px           |
|    Mờ đục     Tím Neon Sáng     Mờ đục       Mờ đục         |
|   120ms          280ms          110ms        130ms          |
+-------------------------------------------------------------+
| BẢNG 3 TRỤ CỘT TRỌNG ÂM:                                    |
| [ Thời Lượng: 2.3x ]  [ Độ To: +5.2dB ]  [ Cao Độ: +42Hz ]   |
+-------------------------------------------------------------+
\`\`\`

#### 🎨 Design Tokens & Dynamic Styling
- **Stressed Bubble**:
  \`w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-extrabold text-xl shadow-[0_0_30px_rgba(99,102,241,0.5)] border-2 border-indigo-300 flex items-center justify-center animate-pulse\`
- **Unstressed Bubble**:
  \`w-12 h-12 rounded-full bg-slate-800 text-slate-400 font-medium text-sm border border-slate-700 flex items-center justify-center\`.`
  },
  {
    id: 'ELSA-203',
    epic_id: 'epic-prosody',
    title: 'Suprasegmental Pitch & Sentence Intonation Melody Tracker: Theo Dõi Đường Cong Cao Độ & Giai Điệu Ngữ Điệu Câu',
    persona: 'Người học khi nói tiếng Anh thường phát âm cả câu như một đường thẳng tắp, không có ngữ điệu lên giọng (Rising) hay xuống giọng (Falling) tự nhiên',
    action: 'nói các câu giao tiếp thực tế và quan sát đường cong cao độ giọng nói thời gian thực (Real-Time Pitch Contour Curve) chạy đè lên đường cong mẫu của người bản xứ',
    value: 'làm chủ giai điệu câu tiếng Anh (Sentence Melody): biết lên giọng ở câu hỏi Yes/No, hạ giọng ở câu trần thuật và nhấn đúng từ khóa truyền tải cảm xúc',
    priority: 'must',
    status: 'todo',
    size: 'XL',
    points: 13,
    uiMockupUrl: '/src/ui-reference/acoustic_precision_light/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-elsa-203-pitch-contour',
        given: 'Học viên nói một câu hội thoại hoàn chỉnh',
        when: 'Bộ phân tích âm học trích xuất cao độ F0 liên tục sau mỗi khung hình 10ms',
        then: 'Đồ thị SVG vẽ đường cong Bezier mượt mà so sánh đồng thời 2 đường: Đường xanh Sky-400 (Giọng chuẩn bản xứ) và đường vàng Amber-400 (Giọng học viên).',
        completed: false
      },
      {
        id: 'ac-elsa-203-terminal-intonation',
        given: 'Câu nói thuộc thể loại câu hỏi Yes/No (e.g., "Are you ready?")',
        when: 'Phân tích xu hướng cao độ ở 300ms cuối câu',
        then: 'Hệ thống nhận diện hướng ngữ điệu (Rising Tone: +3 semitones trở lên); nếu học viên hạ giọng, hiển thị mũi tên đỏ hướng xuống cảnh báo.',
        completed: false
      },
      {
        id: 'ac-elsa-203-humming-mode',
        given: 'Học viên muốn cảm nhận ngữ điệu mà không bị phân tâm bởi việc phát âm từ vựng',
        when: 'Bấm nút "Nghe Giai Điệu Ùm Ùm (Humming Synth)"',
        then: 'Bộ tổng hợp âm thanh Web Audio Oscillator phát ra chuỗi âm thanh huýt sáo không lời mô phỏng chính xác đường lượn cao độ của câu.',
        completed: false
      },
      {
        id: 'ac-elsa-203-semitone-normalization',
        given: 'Học viên có tông giọng tự nhiên khác biệt (giọng nam trầm vs giọng nữ cao)',
        when: 'Hệ thống so sánh với giọng người bản ngữ',
        then: 'Tự động chuẩn hóa cao độ về thang Bán Âm (Semitone Normalization relative to median F0) để việc so sánh chỉ tập trung vào độ dốc giai điệu.',
        completed: false
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-elsa-203-fe-curve', title: 'Xây dựng component PitchContourSvg.jsx vẽ đường cong Bezier mượt mà so sánh 2 dải cao độ F0', category: 'Frontend', completed: false },
      { id: 't-elsa-203-fe-synth', title: 'Tích hợp Web Audio Oscillator phát âm thanh Humming Melody mô phỏng đường cong ngữ điệu', category: 'Frontend', completed: false },
      { id: 't-elsa-203-be-yin', title: 'Triển khai thuật toán YIN Pitch Tracking trích xuất F0 sau mỗi 10ms có bộ lọc Voiced/Unvoiced', category: 'AI/DSP', completed: false },
      { id: 't-elsa-203-be-norm', title: 'Phát triển module SemitoneConverter chuẩn hóa dải cao độ cá nhân loại bỏ chênh lệch giới tính', category: 'Backend', completed: false }
    ]),
    notes: `### 🎯 FULLSTACK FEATURE SPECIFICATION
- **Phân loại**: Full-stack Intonation Analysis (SVG Pitch Curves + F0 Semitone Processing)
- **UI Mockup**: \`vietphonics-app/src/ui-reference/acoustic_precision_light/code.html\`
- **Frontend Component**: \`vietphonics-app/src/components/prosody/PitchContourMelodyView.jsx\`

#### 🎨 Dual Pitch Curve Visualization
\`\`\`
+-------------------------------------------------------------+
| Câu hỏi: "Are you coming with us tomorrow?"                 |
| F0 (Hz)                                                     |
| 250 |                     ____/\  <-- [Bản xứ: Vút cao ↗]   |
| 200 |         __/\__    /                                   |
| 150 |  ______/      \--/--------\ <-- [Học viên: Đi xuống ↘]|
|     +-------------------------------------------------------+
|        Are   you   coming   with   us   tomorrow?           |
+-------------------------------------------------------------+
\`\`\`

#### 🗄️ Backend Semitone Normalization Formula
\`\`\`
Semitone(t) = 12 * \log_2(F0(t) / F0_{median})
\`\`\`
- Chuẩn hóa loại bỏ yếu tố sinh học giới tính (nam ~120Hz, nữ ~220Hz), đưa về thang đo tương đối delta semitones.

#### 🗄️ Backend API Contract
\`\`\`http
POST /api/v1/scoring/pitch-contour
Content-Type: application/json

{
  "sentenceId": "sent_prosody_01",
  "audioUrl": "https://r2.vietphonics.com/audio/session_503.opus"
}
\`\`\`
- **Response**: Trả về mảng \`contourNormalizedPoints\` gồm \`{ timeSec, semitone }\` và kết quả đánh giá \`terminalPattern: 'rise' | 'fall'\`.`
  },
  {
    id: 'VN-103',
    epic_id: 'epic-prosody',
    title: 'Syllable Stress vs. Tone Mark Visualizer & Schwa Demotion: Đối Soát Trọng Âm vs Thanh Điệu & Luyện Giảm Âm Schwa',
    persona: 'Học viên Việt Nam bị thói quen thanh điệu (Dấu sắc, huyền, hỏi, ngã, nặng) chi phối nặng nề, luôn có xu hướng đọc rõ từng âm tiết tiếng Anh như một từ đơn',
    action: 'quan sát bảng đối chiếu cơ chế giữa "Thanh điệu đơn lập tiếng Việt" vs "Trọng âm động học tiếng Anh", và luyện các bài tập hạ âm schwa (/ə/) để biến các âm tiết không trọng âm thành âm lướt nhẹ',
    value: 'giải phóng học viên khỏi tư duy thanh điệu tiếng mẹ đẻ, giúp câu nói tiếng Anh có độ nén nhịp điệu (Stress-timed Rhythm) tự nhiên như người bản xứ',
    priority: 'must',
    status: 'todo',
    size: 'L',
    points: 8,
    uiMockupUrl: '/src/ui-reference/kh_u_h_nh_2d_th_vi_n_gi_i_ph_u_m_v_l1_light_mode/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-vn-103-schwa-demotion',
        given: 'Học viên luyện từ chứa âm lướt schwa (e.g., "ba-NA-na", "a-BOUT", "CHO-co-late")',
        when: 'Hệ thống đo đạc thời lượng và độ mở nguyên âm của âm schwa',
        then: 'Nếu âm schwa được phát âm cực ngắn (<70ms) và thả lỏng cơ miệng về trung tâm (F1/F2 trung tính) thì ghi nhận thành công kỹ năng giảm âm (Schwa Demotion).',
        completed: false
      },
      {
        id: 'ac-vn-103-contrast-card',
        given: 'Giao diện StressVsToneView hiển thị',
        when: 'Học viên mở bài đối chiếu ngôn ngữ',
        then: 'Hiển thị đồ họa so sánh 2 cơ chế: Cột trái "Thanh điệu tiếng Việt (Âm tiết độc lập, đều độ dài)" và Cột phải "Nhịp điệu tiếng Anh (Âm nhấn vươn dài, âm phụ rút gọn thành Schwa /ə/)".',
        completed: false
      },
      {
        id: 'ac-vn-103-l1-advice',
        given: 'Học viên phát âm từ "banana" thành "ba-na-nà" (đều 3 âm tiết)',
        when: 'Hệ thống phát hiện lỗi không giảm âm',
        then: 'Hiển thị lời khuyên L1: "Bạn đang đọc rõ chữ \'ba\'! Hãy đọc lướt thật nhanh thành /bə/ - chỉ lướt nhẹ môi như một tiếng thở dài".',
        completed: false
      },
      {
        id: 'ac-vn-103-mobile-haptic',
        given: 'Học viên luyện tập trên thiết bị di động có motor rung',
        when: 'Âm thanh phát đến âm tiết trọng âm chính',
        then: 'Điện thoại rung nhịp dứt khoát (Vibrate 100ms), và khi đến âm lướt schwa chỉ rung siêu nhẹ (10ms) qua Navigator.vibrate API.',
        completed: false
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-vn-103-fe-contrast', title: 'Xây dựng component StressVsToneComparison.jsx trình diễn trực quan sự khác biệt ngôn ngữ đơn lập vs đa âm tiết', category: 'Frontend', completed: false },
      { id: 't-vn-103-fe-haptic', title: 'Tích hợp Navigator.vibrate Haptic API rung theo nhịp trọng âm trên thiết bị di động', category: 'Frontend', completed: false },
      { id: 't-vn-103-be-schwa', title: 'Xây dựng thuật toán kiểm tra độ tập trung Formant nguyên âm schwa (Neutral Formant Proximity)', category: 'AI/DSP', completed: false },
      { id: 't-vn-103-be-cache', title: 'Thiết lập danh mục 500 từ vựng chứa âm schwa dễ nhầm lẫn nhất của người Việt lưu trong Redis', category: 'Backend', completed: false }
    ]),
    notes: `### 🎯 FULLSTACK & PEDAGOGICAL FEATURE SPECIFICATION
- **Phân loại**: Full-stack Pedagogical Feature (Linguistic Contrast + Schwa Formant Detection)
- **UI Mockup**: \`vietphonics-app/src/ui-reference/kh_u_h_nh_2d_th_vi_n_gi_i_ph_u_m_v_l1_light_mode/code.html\`
- **Frontend Component**: \`vietphonics-app/src/components/prosody/StressVsToneVisualizer.jsx\`

#### 🎨 Linguistic Contrast Layout
\`\`\`
+-------------------------------------------------------------+
| TIẾNG VIỆT (Đơn lập - Syllable-timed)                       |
| "quả - chuối - tiêu" -> Mỗi từ đều đặn ~200ms               |
+-------------------------------------------------------------+
| TIẾNG ANH (Đa âm tiết - Stress-timed)                       |
| "ba - NA - na" -> /bə/ (50ms) - /'næn/ (300ms) - /ə/ (50ms) |
| [Lướt nhẹ]          [VƯƠN CAO NGÂN DÀI]        [Lướt nhẹ]   |
+-------------------------------------------------------------+
\`\`\`

#### 🧮 Schwa Neutral Formant Proximity Formula
\`\`\`
D_{neutral} = \sqrt{(F1 - 500)^2 + (F2 - 1500)^2}
\`\`\`
- Nếu \`D_{neutral} < 150\` và \`duration < 70ms\`: Đạt chuẩn Schwa thả lỏng hoàn hảo.
- Nếu \`F1 > 700\` hoặc \`duration > 150ms\`: Vẫn đang phát âm nguyên âm mở hoàn toàn (chưa giảm âm).

#### 🗄️ Backend API Contract
\`\`\`http
POST /api/v1/pedagogy/schwa-check
Content-Type: application/json

{
  "word": "banana",
  "audioUrl": "https://r2.vietphonics.com/audio/session_604.opus"
}
\`\`\``
  }
];
