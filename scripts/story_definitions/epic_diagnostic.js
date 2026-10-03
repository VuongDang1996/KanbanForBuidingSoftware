export const diagnosticStories = [
  {
    id: 'ELSA-102',
    epic_id: 'epic-diagnostic',
    title: 'Native Language (L1) Regional Dialect Calibration: Hiệu Chuẩn Ngữ Điệu Vùng Miền Việt Nam (Bắc - Trung - Nam)',
    persona: 'Người học tiếng Anh tại 3 miền Bắc, Trung, Nam của Việt Nam có các thói quen phát âm tiếng mẹ đẻ (L1) rất khác nhau',
    action: 'chọn vùng miền xuất thân hoặc đọc đoạn âm thanh ngắn để hệ thống tự động căn chỉnh trọng số phát hiện lỗi theo phương ngữ địa phương',
    value: 'tránh bị phạt điểm oan do chất giọng địa phương, đồng thời nhận lộ trình bài tập tập trung chính xác vào tật phát âm đặc trưng của vùng miền mình',
    priority: 'must',
    status: 'done',
    size: 'L',
    points: 8,
    uiMockupUrl: '/src/ui-reference/ng_nh_p_nh_chu_n_gi_ng_l1_light_mode/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-elsa-102-select-region',
        given: 'Màn hình cài đặt vùng miền hiển thị 3 tùy chọn: Miền Bắc, Miền Trung, Miền Nam',
        when: 'Người dùng click chọn "Miền Bắc (Northern)"',
        then: 'Hệ thống kích hoạt profile lỗi L1: Tăng độ nhạy phát hiện nhầm lẫn /l/ và /n/, giảm độ gắt đối với âm /r/ uốn lưỡi, và lưu cấu hình vào hồ sơ người dùng.',
        completed: true
      },
      {
        id: 'ac-elsa-102-audio-calibration',
        given: 'Người dùng chọn chế độ "Tự động nhận diện phương ngữ qua giọng nói"',
        when: 'Người dùng đọc câu kiểm tra: "Look at the little light shining at night"',
        then: 'Bộ phân tích âm học đo đạc độ mở nguyên âm và cách bật âm /l/-/n/, tự động đề xuất phương ngữ Miền Bắc với độ tin cậy > 88%.',
        completed: true
      },
      {
        id: 'ac-elsa-102-curriculum-adaptation',
        given: 'Tài khoản đã hoàn tất hiệu chuẩn vùng miền',
        when: 'Người dùng vào trang Lộ trình học tập cá nhân',
        then: 'Module 1 trong lộ trình tự động đổi tên thành "Khắc phục bẫy âm L/N cho người miền Bắc" thay vì lộ trình chung chung.',
        completed: true
      },
      {
        id: 'ac-elsa-102-switch-region',
        given: 'Người dùng muốn thay đổi vùng miền bất kỳ lúc nào',
        when: 'Vào phần Cài đặt tài khoản và chọn lại vùng miền khác',
        then: 'Toàn bộ trọng số chấm điểm và danh sách bài tập ưu tiên được cập nhật lại ngay lập tức mà không làm mất lịch sử điểm số cũ.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-102-ui', title: 'Xây dựng DialectSelectorCard với bản đồ 3 miền tương tác và badge mô tả lỗi đặc thù', category: 'Frontend', completed: true },
      { id: 't-102-api', title: 'Tạo API POST /api/v1/user/dialect-profile lưu cấu hình vùng miền vào bảng user_profiles', category: 'Backend', completed: true },
      { id: 't-102-weights', title: 'Định nghĩa ma trận trọng số âm vị L1 (Phoneme Penalty Weight Matrix) cho 3 miền', category: 'AI/DSP', completed: true },
      { id: 't-102-qa', title: 'Kiểm thử hộp đen chuyển đổi qua lại giữa 3 miền xem danh sách bài gợi ý có đổi theo', category: 'QA', completed: true }
    ]),
    notes: `### 🎯 FULLSTACK FEATURE SPECIFICATION
- **Phân loại**: Full-stack Integration (Frontend Selection + Backend Penalty Weights)
- **UI Mockup**: \`vietphonics-app/src/ui-reference/ng_nh_p_nh_chu_n_gi_ng_l1_light_mode/code.html\`
- **Frontend Component**: \`vietphonics-app/src/components/diagnostic/DialectCalibrationModal.jsx\`

#### 🎨 Frontend Interface
- **State**: \`selectedRegion: 'northern' | 'central' | 'southern'\`, \`confidenceScore: number\`.
- **Interactions**: Click chọn vùng miền -> Thẻ đổi viền sang màu chủ đạo (Bắc: Sky-500, Trung: Amber-500, Nam: Emerald-500) -> Hiện danh sách 3 lỗi phát âm phổ biến nhất của miền đó.

#### 🗄️ Backend API & Data Contract
\`\`\`http
POST /api/v1/user/dialect-profile
Authorization: Bearer <JWT>
Content-Type: application/json

{
  "region": "northern",
  "calibrationMode": "manual_selection"
}
\`\`\`
- **Database Storage**:
  - Lưu vào cột \`dialect_preference\` trong bảng \`users\` (PostgreSQL/SQLite).
  - Cache ma trận trọng số vào Redis key \`user:weights:{userId}\` để worker chấm điểm đọc trực tiếp.`
  },
  {
    id: 'ELSA-103',
    epic_id: 'epic-diagnostic',
    title: 'Predicted IELTS & CEFR Speaking Band Estimator: Bảng Ước Tính Điểm IELTS Speaking & Khung CEFR',
    persona: 'Người học tiếng Anh chuẩn bị thi IELTS (mục tiêu Band 6.5 - 8.0) hoặc cần chứng chỉ CEFR (B1 - C1) cho công việc',
    action: 'quan sát con số dự báo điểm IELTS Speaking và trình độ CEFR được cập nhật động sau mỗi bài nói',
    value: 'biết rõ mình đang ở mức nào trên thang đo quốc tế, loại bỏ cảm giác học mù quáng không định lượng được kết quả',
    priority: 'must',
    status: 'done',
    size: 'L',
    points: 8,
    uiMockupUrl: '/src/ui-reference/t_ng_quan_l_tr_nh_10_ph_t_light_mode/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-elsa-103-gauge-display',
        given: 'Học viên đã làm tối thiểu 1 bài sàng lọc hoặc 5 bài luyện âm',
        when: 'Mở trang Dashboard',
        then: 'Hiển thị đồng hồ đo bán nguyệt với con số dự báo IELTS Speaking (ví dụ 6.5 Band) và thẻ CEFR (ví dụ B2) với chữ số to bản, rõ ràng.',
        completed: true
      },
      {
        id: 'ac-elsa-103-radar-breakdown',
        given: 'Học viên bấm vào thẻ điểm IELTS để xem chi tiết',
        when: 'Hộp thoại phân tích mở ra',
        then: 'Hiển thị biểu đồ Radar 4 tiêu chí chuẩn khảo thí: Pronunciation (Phát âm), Fluency & Coherence (Lưu loát), Lexical Resource (Từ vựng), Grammatical Range (Ngữ pháp).',
        completed: true
      },
      {
        id: 'ac-elsa-103-target-gap',
        given: 'Học viên đặt mục tiêu thi đạt 7.5 Band',
        when: 'Hệ thống so sánh điểm hiện tại (6.5) với mục tiêu (7.5)',
        then: 'Chỉ ra rõ ràng: "Bạn cần cải thiện +1.0 Band ở tiêu chí Pronunciation (đặc biệt là âm đuôi và ngữ điệu câu hỏi) để chạm mốc mục tiêu".',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-103-gauge', title: 'Xây dựng component IeltsGaugeMeter.jsx dạng SVG bán nguyệt với kim chỉ số mượt mà', category: 'Frontend', completed: true },
      { id: 't-103-radar', title: 'Xây dựng biểu đồ Radar SVG hiển thị 4 tiêu chí chấm thi IELTS Speaking', category: 'Frontend', completed: true },
      { id: 't-103-algo', title: 'Viết thuật toán hồi quy phi tuyến IeltsScoreMapping chuyển đổi điểm âm vị sang thang 0-9.0', category: 'AI/DSP', completed: true },
      { id: 't-103-qa', title: 'Kiểm thử với 20 bộ điểm mẫu đối chiếu với bảng quy đổi chính thức của Cambridge', category: 'QA', completed: true }
    ]),
    notes: `### 🎯 FULLSTACK FEATURE SPECIFICATION
- **Phân loại**: Full-stack Feature (Scoring Algorithm + Visual SVG Dashboard)
- **UI Mockup**: \`vietphonics-app/src/ui-reference/t_ng_quan_l_tr_nh_10_ph_t_light_mode/code.html\`
- **Frontend Component**: \`vietphonics-app/src/components/dashboard/IeltsBandEstimator.jsx\`

#### 🎨 Frontend Visual Specs
- **Score Meter**: Đồng hồ bán nguyệt SVG gradient từ \`#f43f5e\` (Band 4.0) -> \`#f59e0b\` (Band 6.0) -> \`#10b981\` (Band 8.0+).
- **Typography**: Con số điểm hiển thị font JetBrains Mono \`text-4xl font-extrabold\`.
- **4 Cột Tiêu Chí**: Thẻ con hiển thị điểm từng phần kèm nhãn đánh giá: FC, PR, LR, GRA.

#### 🗄️ Backend Mapping Formula
\`\`\`javascript
// Non-linear mapping from phonetic accuracy to IELTS Band
export function mapPhoneticScoreToIelts(phoneticAcc, fluencyWpm, intonationScore) {
  const pScore = phoneticAcc * 0.45 + intonationScore * 0.35 + Math.min(fluencyWpm / 140, 1.0) * 100 * 0.20;
  if (pScore >= 92) return { band: 8.5, cefr: 'C2' };
  if (pScore >= 84) return { band: 7.5, cefr: 'C1' };
  if (pScore >= 74) return { band: 6.5, cefr: 'B2' };
  if (pScore >= 62) return { band: 5.5, cefr: 'B1' };
  return { band: 4.5, cefr: 'A2' };
}
\`\`\``
  },
  {
    id: 'USER-102',
    epic_id: 'epic-diagnostic',
    title: 'Granular Phoneme Mastery Ledger: Bản Đồ Ma Trận 44 Âm Vị IPA (Nguyên Âm, Nguyên Âm Đôi & Phụ Âm)',
    persona: 'Học viên muốn có cái nhìn toàn cảnh về năng lực phát âm của mình trên toàn bộ 44 âm trong bảng phiên âm quốc tế IPA',
    action: 'tra cứu bảng lưới ma trận 44 âm vị IPA, xem trạng thái màu sắc của từng âm và click vào âm bất kỳ để mở bài luyện tập',
    value: 'minh bạch hóa 100% lộ trình học phát âm, biết rõ mình còn bao nhiêu âm chưa thuần thục để chủ động luyện tập',
    priority: 'must',
    status: 'in-progress',
    size: 'XL',
    points: 13,
    uiMockupUrl: '/src/ui-reference/kh_u_h_nh_2d_th_vi_n_gi_i_ph_u_m_v_l1_light_mode/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-user-102-grid-render',
        given: 'Học viên mở màn hình Ma Trận IPA',
        when: 'Giao diện tải xong',
        then: 'Hiển thị đầy đủ 44 ô âm vị phân chia thành 3 khu vực trực quan: Nguyên âm đơn (12 âm), Nguyên âm đôi (8 âm), và Phụ âm (24 âm).',
        completed: true
      },
      {
        id: 'ac-user-102-color-coding',
        given: 'Dữ liệu điểm số của học viên được nạp vào ma trận',
        when: 'Hệ thống hiển thị màu sắc từng ô',
        then: 'Ô đạt ≥85% có viền xanh lá Emerald, ô từ 60-84% có viền vàng hổ phách Amber, ô <60% có viền đỏ hồng Rose kèm biểu tượng chấm than cảnh báo.',
        completed: true
      },
      {
        id: 'ac-user-102-tile-click',
        given: 'Học viên click vào một ô âm vị bất kỳ (ví dụ /θ/)',
        when: 'Hành động click diễn ra',
        then: 'Mở Drawer thông tin chi tiết: Hiển thị ký hiệu IPA to bản, 3 từ ví dụ phổ biến, điểm số trung bình, nút nghe phát âm chuẩn và nút "Luyện tập âm này ngay".',
        completed: true
      },
      {
        id: 'ac-user-102-filter-mode',
        given: 'Học viên chỉ muốn xem các âm đang bị yếu',
        when: 'Bấm nút lọc "Chỉ hiện âm cần cải thiện (<60%)"',
        then: 'Các ô âm vị đạt chuẩn mờ đi (opacity 30%), làm nổi bật các ô âm vị màu đỏ để học viên tập trung.',
        completed: false
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-102-grid', title: 'Xây dựng component IpaMatrixGrid.jsx hiển thị 44 ô âm vị theo đúng bố cục bảng ngữ âm quốc tế', category: 'Frontend', completed: true },
      { id: 't-102-drawer', title: 'Thiết kế PhonemeQuickDetailDrawer.jsx mở ra khi click vào từng ô âm vị', category: 'Frontend', completed: true },
      { id: 't-102-filter', title: 'Tích hợp bộ lọc 3 trạng thái (Tất cả / Đã thuần thục / Cần cải thiện) vào thanh điều khiển', category: 'Frontend', completed: false },
      { id: 't-102-qa', title: 'Kiểm tra hiển thị chuẩn xác ký tự ngữ âm IPA trên font Noto Sans không bị lỗi font ô vuông', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 PURE FRONTEND DESIGN SPECIFICATION
- **Phân loại**: Pure Frontend UI/UX Component
- **UI Mockup**: \`vietphonics-app/src/ui-reference/kh_u_h_nh_2d_th_vi_n_gi_i_ph_u_m_v_l1_light_mode/code.html\`
- **Frontend Component**: \`vietphonics-app/src/components/matrix/IpaMatrixGrid.jsx\`

#### 📐 Layout & Grid Structure
\`\`\`
+-------------------------------------------------------------+
| [Thanh lọc: Tất cả (44) | Cần cải thiện (5) | Thuần thục (28)]|
+-------------------------------------------------------------+
| VOWELS (Monophthongs - 12)                                  |
| [/iː/] [/ɪ/] [/ʊ/] [/uː/] [/e/] [/ə/] [/ɜː/] [/ɔː/] [/æ/]... |
+-------------------------------------------------------------+
| DIPHTHONGS (8)                                              |
| [/eɪ/] [/aɪ/] [/ɔɪ/] [/aʊ/] [/əʊ/] [/ɪə/] [/eə/] [/ʊə/]     |
+-------------------------------------------------------------+
| CONSONANTS (24)                                             |
| [/p/] [/b/] [/t/] [/d/] [/tʃ/] [/dʒ/] [/k/] [/g/] [/f/] ... |
+-------------------------------------------------------------+
\`\`\`

#### 🎨 Design Tokens & Micro-Interactions
- **Font**: \`font-['Noto_Sans']\` đảm bảo 100% hiển thị chính xác các ký tự đặc biệt như \`/θ/\`, \`/ð/\`, \`/ʃ/\`, \`/ʒ/\`.
- **Card Hover**: \`hover:scale-105 hover:-translate-y-1 transition-all duration-200\`.
- **Mastered Token**: \`bg-emerald-500/10 border-emerald-500/40 text-emerald-400\`.
- **Warning Token**: \`bg-amber-500/10 border-amber-500/40 text-amber-400\`.
- **Critical Token**: \`bg-rose-500/10 border-rose-500/40 text-rose-400 animate-pulse\`.`
  },
  {
    id: 'VN-102',
    epic_id: 'epic-diagnostic',
    title: 'Vietnamese L1 3-Minute Diagnostic Pronunciation Screener: Bài Sàng Lọc Phát Âm Toàn Diện 3 Phút Cho Người Việt',
    persona: 'Người dùng mới bắt đầu cần một bài kiểm tra nhanh gọn, chính xác trong 3 phút để xác định ngay các điểm yếu phát âm cốt lõi',
    action: 'đọc lần lượt 12 câu chẩn đoán ngắn được thiết kế riêng để bẫy toàn bộ các lỗi phát âm kinh điển nhất của người Việt',
    value: 'chỉ mất 3 phút để nhận được bản chụp X-quang phát âm của chính mình, có lộ trình sửa lỗi rõ ràng ngay từ ngày đầu tiên',
    priority: 'must',
    status: 'in-progress',
    size: 'XL',
    points: 13,
    uiMockupUrl: '/src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-vn-102-step-wizard',
        given: 'Người dùng bắt đầu bài sàng lọc 3 phút',
        when: 'Giao diện bắt đầu chạy',
        then: 'Hiển thị thẻ câu số 1 kèm thanh tiến trình 12 bước (Progress Bar); nút micro to bản ở trung tâm phát sáng sẵn sàng thu âm.',
        completed: true
      },
      {
        id: 'ac-vn-102-auto-advance',
        given: 'Người dùng đọc xong câu số 1 vào micro',
        when: 'Bộ phát hiện khoảng lặng (VAD) nhận thấy 1.5 giây im lặng sau khi nói',
        then: 'Hệ thống tự động lưu bản ghi âm câu 1 và trượt mượt mà sang câu số 2 mà không bắt người dùng phải bấm nút thủ công.',
        completed: true
      },
      {
        id: 'ac-vn-102-comprehensive-report',
        given: 'Người dùng hoàn thành câu thứ 12',
        when: 'Hệ thống xử lý tổng hợp',
        then: 'Xuất bản Báo Cáo Chẩn Đoán 3 Phút: Liệt kê top 3 lỗi phát âm nặng nhất, điểm số tổng quan và nút "Kích hoạt lộ trình sửa lỗi 30 ngày".',
        completed: false
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-102-wizard', title: 'Xây dựng component DiagnosticWizardView.jsx quản lý luồng 12 thẻ câu chẩn đoán', category: 'Frontend', completed: true },
      { id: 't-102-vad', title: 'Tích hợp AudioWorklet VAD tự động ngắt câu sau 1.5s im lặng', category: 'Audio/DSP', completed: true },
      { id: 't-102-report-api', title: 'Tạo API POST /api/v1/diagnostic/screener-submit tổng hợp kết quả 12 câu', category: 'Backend', completed: false },
      { id: 't-102-qa', title: 'Kiểm thử toàn bộ luồng 12 câu trên thiết bị di động Android và iPhone', category: 'QA', completed: true }
    ]),
    notes: `### 🎯 FULLSTACK FEATURE SPECIFICATION
- **Phân loại**: Full-stack Onboarding Flow
- **UI Mockup**: \`vietphonics-app/src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html\`
- **Frontend Component**: \`vietphonics-app/src/views/DiagnosticScreenerView.jsx\`

#### 🎨 Frontend Wizard Flow
- **12 Câu Chẩn Đoán L1**:
  1. Final /t/: *"What time did you contact the client?"*
  2. Final /s/: *"The price of the house is increasing."*
  3. Initial /θ/: *"I think thirty thousand dollars is fair."*
  4. Initial /ð/: *"They will arrive together this morning."*
  5. Contrast /s/ vs /ʃ/: *"She sells seashells by the seashore."*
  6. Final /d/ vs /t/: *"He needed food and waited outside."*
  7. Vowel /iː/ vs /ɪ/: *"Please sit on the seat near the ship."*
  8. Vowel /æ/ vs /e/: *"The bad cat slept on the red bed."*
  9. Word Stress: *"The photographer took a photograph of photography."*
  10. Intonation: *"Are you coming with us tomorrow?"*
  11. Linking: *"Hold on a second and turn it off."*
  12. Reduction: *"I would have gone if I had known about it."*

#### 🗄️ Backend Aggregation Engine
\`\`\`http
POST /api/v1/diagnostic/screener-submit
Authorization: Bearer <JWT>
Content-Type: application/json

{
  "answers": [
    { "itemIndex": 0, "audioUrl": "https://r2.../q1.opus", "targetPhoneme": "/t/" }
  ]
}
\`\`\`
- Trả về Báo cáo chẩn đoán phân loại theo 4 cấp độ ưu tiên để sinh lộ trình học cá nhân hóa.`
  }
];
