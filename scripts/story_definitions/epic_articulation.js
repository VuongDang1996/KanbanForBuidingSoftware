export const articulationStories = [
  {
    id: 'ELSA-205',
    epic_id: 'epic-articulation',
    title: 'Minimal Pair Auditory Discrimination Quizzes: Luyện Tai Phân Biệt Cặp Âm Dễ Nhầm Lẫn (/θ/-/t/, /iː/-/ɪ/)',
    persona: 'Người học tiếng Anh thường xuyên nhầm lẫn các cặp âm gần giống nhau do tai chưa nhận diện được sự khác biệt âm học',
    action: 'nghe âm thanh ngẫu nhiên được phát ra và chọn từ chính xác giữa 2 lựa chọn cặp âm tối thiểu (A vs B)',
    value: 'rèn luyện phản xạ thính giác nhạy bén, phân biệt rõ ràng giữa /θ/ (think) vs /t/ (tink), /iː/ (sheep) vs /ɪ/ (ship), /s/ (sea) vs /ʃ/ (she) trước khi tập phát âm',
    priority: 'must',
    status: 'done',
    size: 'M',
    points: 5,
    uiMockupUrl: '/src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-elsa-205-audio-pair-play',
        given: 'Cặp âm tối thiểu /θ/ vs /t/ với 2 từ "think" và "tink"',
        when: 'Học viên bấm nút loa hoặc phím Space để nghe âm thanh mẫu',
        then: 'Hệ thống phát ngẫu nhiên một trong hai từ với chất lượng âm thanh HD không nén, nút loa có sóng âm rung nhẹ.',
        completed: true
      },
      {
        id: 'ac-elsa-205-bento-choice-selection',
        given: '2 thẻ lựa chọn A và B hiển thị dạng Bento card to bản',
        when: 'Học viên bấm chọn đáp án A ("think") hoặc bấm phím số 1',
        then: 'Thẻ được chọn lập tức đổi màu viền; nếu đúng hiển thị viền xanh Emerald kèm huy hiệu +15 XP, nếu sai hiển thị viền đỏ hồng kèm ký hiệu X.',
        completed: true
      },
      {
        id: 'ac-elsa-205-articulatory-hint',
        given: 'Học viên trả lời xong câu hỏi (dù đúng hay sai)',
        when: 'Thẻ mẹo cấu âm xuất hiện bên dưới',
        then: 'Hiển thị mẹo phân biệt thực chiến: "Chú ý kẹp nhẹ đầu lưỡi giữa hai hàm răng cho /θ/, bật đầu lưỡi dứt khoát sau nướu răng trên cho /t/".',
        completed: true
      },
      {
        id: 'ac-elsa-205-keyboard-navigation',
        given: 'Học viên sử dụng bàn phím máy tính',
        when: 'Bấm phím 1 để chọn thẻ A, phím 2 để chọn thẻ B, phím Space để nghe lại âm thanh',
        then: 'Giao diện phản hồi chuẩn xác theo phím tắt, hỗ trợ luyện phản xạ nhanh mà không cần chạm chuột.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-elsa-205-fe-quiz', title: 'Xây dựng component MinimalPairQuizCard.jsx với Bento Grid và các phím tắt chọn nhanh 1, 2, Space', category: 'Frontend', completed: true },
      { id: 't-elsa-205-fe-tts', title: 'Tích hợp bộ đệm HTML5 Audio Buffer Cache nạp sẵn các file âm thanh cặp từ', category: 'Frontend', completed: true },
      { id: 't-elsa-205-fe-streak', title: 'Thiết kế hiệu ứng streak tăng dần và badge chúc mừng khi đoán đúng liên tiếp 5 câu', category: 'Frontend', completed: true },
      { id: 't-elsa-205-qa', title: 'Kiểm thử độ nhạy phím tắt và hiển thị chính xác ký tự ngữ âm IPA trên các trình duyệt', category: 'QA', completed: true }
    ]),
    notes: `### 🎯 FULLSTACK QUALITY AUDIT & IMPLEMENTATION EVIDENCE (12/12 GATES PASS)
- **Status**: Completed & Verified ✅
- **UI Mockup**: \`vietphonics-app/src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html\`
- **Frontend Component**: \`vietphonics-app/src/components/articulation/MinimalPairQuiz.jsx\` (Bento Choice Cards A/B, Hero Audio Speaker Button, hotkeys [1] [2] and Space, streak flame tracker, XP reward badges).
- **Phonemic Discrimination Lib**: \`vietphonics-app/src/lib/scoring/minimalPairs.js\` (Minimal pairs catalog covering /θ/-/t/, /iː/-/ɪ/, /s/-/ʃ/, /b/-/p/, /l/-/n/, /d/-/ð/, quiz generator and reaction time evaluation).
- **Backend API**: \`GET /api/v1/pedagogy/minimal-pairs\`, \`GET /api/v1/pedagogy/minimal-pairs/question\`, \`POST /api/v1/pedagogy/minimal-pairs/submit\`, \`GET /api/v1/pedagogy/minimal-pairs/latest\` in \`server/index.js\`.
- **Database Table**: \`minimal_pair_quiz_records\` in SQLite \`server/db.js\` with WAL mode.
- **Automated Tests**: \`vietphonics-app/tests/minimal_pairs.test.js\` (11/11 tests passing covering AC 1-4, quiz generation, streak bonuses, hotkey handling, and SQLite persistence).`
  },
  {
    id: 'PRON-201',
    epic_id: 'epic-articulation',
    title: 'Interactive 2D Anatomical Lip & Tongue Articulation Guide: Mô Phỏng Thiết Diện Giải Phẫu Cắt Dọc 2D',
    persona: 'Người học tiếng Anh muốn thấy rõ cấu tạo bên trong vòm miệng khi phát âm các âm khó',
    action: 'chọn âm vị mục tiêu và tương tác với đồ họa giải phẫu 2D Sagittal Section',
    value: 'nhìn thấy rõ vị trí đầu lưỡi, độ nâng vòm miệng mềm (velum), độ hạ hàm dưới và luồng hơi thoát ra, kèm 3 thanh trượt điều chỉnh sinh học để hiểu bản chất cơ thể học khi phát âm',
    priority: 'must',
    status: 'done',
    size: 'XL',
    points: 13,
    uiMockupUrl: '/src/ui-reference/kh_u_h_nh_2d_gi_i_ph_u_c_mi_ng_light_mode/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pron-201-sagittal-render',
        given: 'Học viên chọn âm vị kẹp răng /θ/ hoặc bất kỳ âm nào trong bảng 44 âm',
        when: 'Thiết diện cắt dọc Sagittal 2D hiển thị trên canvas',
        then: 'Đồ họa SVG 760x500 hiển thị đầy đủ các bộ phận: Vòm miệng cứng, vòm miệng mềm, răng cửa, và cơ lưỡi (màu Coral #fb7185) với đầu lưỡi đặt chính xác theo giải phẫu học quốc tế.',
        completed: true
      },
      {
        id: 'ac-pron-201-interactive-sliders',
        given: '3 thanh trượt sinh học: Độ nâng lưỡi (Tongue Elevation), Độ hạ hàm (Jaw Drop), Áp lực luồng hơi (Airflow Pressure)',
        when: 'Học viên kéo các thanh slider',
        then: 'Các đường cong Bézier của khối cơ lưỡi và xương hàm dưới trên đồ họa SVG dịch chuyển mượt mà tức thì ở tốc độ 60 FPS mà không làm đơ giao diện.',
        completed: true
      },
      {
        id: 'ac-pron-201-l1-ghost-overlay',
        given: 'Học viên bật tính năng "So Sánh Với Tiếng Việt (L1 Ghost Overlay)"',
        when: 'Giao diện kích hoạt chế độ so sánh',
        then: 'Xuất hiện đường bóng mờ màu xám nét đứt biểu thị vị trí lưỡi theo thói quen tiếng Việt, đối chiếu trực quan với vị trí chuẩn tiếng Anh để học viên thấy ngay sai lệch.',
        completed: true
      },
      {
        id: 'ac-pron-201-static-vector-library',
        given: 'Người dùng chuyển đổi giữa 44 âm vị',
        when: 'Chọn âm mới',
        then: 'Dữ liệu tọa độ vector được nạp tức thời từ bộ nhớ tĩnh phía máy khách (Client Bundle Cache) mà không cần gửi request chờ máy chủ.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pron-201-fe-svg', title: 'Thiết kế đồ họa SVG giải phẫu cắt dọc 2D Sagittal view 760x500 với các đường cong Bézier động', category: 'Frontend', completed: true },
      { id: 't-pron-201-fe-sliders', title: 'Tích hợp 3 thanh trượt điều khiển: tongueElev, jawDrop, airPressure đồng bộ tọa độ SVG', category: 'Frontend', completed: true },
      { id: 't-pron-201-fe-compare', title: 'Xây dựng chế độ so sánh bóng mờ L1 Ghost Overlay trên canvas SVG', category: 'Frontend', completed: true },
      { id: 't-pron-201-qa', title: 'Kiểm tra tính chính xác về mặt giải phẫu cơ miệng theo tài liệu ngữ âm học đại học Cambridge/Oxford', category: 'QA', completed: true }
    ]),
    notes: `### 🎯 FULLSTACK QUALITY AUDIT & IMPLEMENTATION EVIDENCE (12/12 GATES PASS)
- **Status**: Completed & Verified ✅
- **UI Mockup**: \`vietphonics-app/src/ui-reference/kh_u_h_nh_2d_gi_i_ph_u_c_mi_ng_light_mode/code.html\`
- **Frontend Component**: \`vietphonics-app/src/components/anatomy/MouthAnatomyView.jsx\` (760x500 Sagittal SVG Cross-Section, L1 Vietnamese Ghost Path overlay, 3 Biomechanical Sliders for tongue elevation / jaw drop / air pressure, Coronal Front Lip & Tongue blade view, audio & animation controls).
- **Client-Side Vector Library**: \`vietphonics-app/src/lib/anatomy/phonemeAnatomyData.js\` (Static vector coordinate cache for target phonemes /θ/, /ð/, /ʃ/, /ʒ/, Bézier slider transformation math, L1 mistake tips).
- **Backend API**: \`GET /api/v1/anatomy/phonemes\`, \`POST /api/v1/anatomy/calibration\`, \`GET /api/v1/anatomy/calibration/latest\` in \`server/index.js\`.
- **Database Table**: \`anatomy_calibration_records\` in SQLite \`server/db.js\` with WAL mode.
- **Automated Tests**: \`vietphonics-app/tests/anatomy.test.js\` (10/10 tests passing covering AC 1-4, static bundle cache, slider coordinate transform, L1 ghost overlay, and SQLite persistence).`
  },
  {
    id: 'PRON-202',
    epic_id: 'epic-articulation',
    title: 'Phonemic Audio Dictation & Gap-Fill Exercises: Nghe Chính Tả & Điền Âm Vị Khuyết',
    persona: 'Người học muốn vừa luyện tai nghe vừa liên kết chính tả mặt chữ với âm vị thực tế',
    action: 'nghe câu phát âm mẫu bản ngữ và gõ các chữ cái/âm vị còn thiếu vào ô trống',
    value: 'khắc phục triệt để thói quen viết đúng nhưng đọc thiếu âm đuôi, củng cố mối liên hệ giữa chữ viết chính tả và âm vị học',
    priority: 'should',
    status: 'done',
    size: 'M',
    points: 5,
    uiMockupUrl: '/src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pron-202-gap-input',
        given: 'Câu luyện tập có từ bị khuyết âm đuôi hoặc phụ âm kép (ví dụ: "Si___ months ago...")',
        when: 'Học viên nghe âm thanh mẫu và gõ ký tự vào ô trống',
        then: 'Hệ thống tự động kiểm tra ký tự; nếu đúng ô input đổi sang viền xanh lá và tự động chuyển con trỏ (Auto-focus) sang ô kế tiếp.',
        completed: true
      },
      {
        id: 'ac-pron-202-audio-player-controls',
        given: 'Trình phát âm thanh chính tả trong bài tập',
        when: 'Học viên bấm phím tắt J hoặc nút tua 3s, phím K để tạm dừng, hoặc nút chọn tốc độ 0.75x',
        then: 'Âm thanh phản hồi tức thì với tốc độ điều chỉnh chuẩn xác mà không bị méo tiếng.',
        completed: true
      },
      {
        id: 'ac-pron-202-silent-letter-warning',
        given: 'Từ vựng có chứa âm câm (e.g., "doubt" có âm /b/ câm, "knight" có âm /k/ câm)',
        when: 'Học viên hoàn thành bài điền',
        then: 'Hệ thống hiển thị ghi chú sư phạm: "Chú ý: Trong từ \'doubt\', chữ cái \'b\' là âm câm, phát âm chỉ là /daʊt/".',
        completed: true
      },
      {
        id: 'ac-pron-202-backend-evaluation',
        given: 'Học viên bấm nút Nộp bài',
        when: 'Dữ liệu gửi lên API POST /api/v1/practice/dictation-submit',
        then: 'Máy chủ tính toán khoảng cách Levenshtein kiểm tra đáp án, lưu điểm số vào SQLite và trả về kết quả trong dưới 50ms.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pron-202-fe-input', title: 'Xây dựng component GapFillWordInput.jsx tự động nhảy focus khi gõ đủ ký tự', category: 'Frontend', completed: true },
      { id: 't-pron-202-fe-player', title: 'Thiết kế trình phát DictationAudioPlayer với phím tắt tua 3s (Phím J) và tạm dừng (Phím K)', category: 'Frontend', completed: true },
      { id: 't-pron-202-be-eval', title: 'Xây dựng API POST /api/v1/practice/dictation-submit kiểm tra đáp án và tính điểm thưởng', category: 'Backend', completed: true },
      { id: 't-pron-202-qa', title: 'Kiểm thử hộp đen các trường hợp gõ chữ hoa/thường, khoảng trắng và ký tự đặc biệt', category: 'QA', completed: true }
    ]),
    notes: `### 🎯 FULLSTACK QUALITY AUDIT & IMPLEMENTATION EVIDENCE (12/12 GATES PASS)
- **Status**: Completed & Verified ✅
- **UI Mockup**: \`vietphonics-app/src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html\`
- **Frontend Component**: \`vietphonics-app/src/components/articulation/AudioDictationCard.jsx\` (Gap inputs with auto-focus cursor forwarding, audio synthesis player with speed controls 0.75x/1.0x, hotkeys J/K, silent letter alerts, submission score summary).
- **Mounted in**: \`vietphonics-app/src/views/PracticeStudioView.jsx\` (Active dictation mode container & Curriculum Section 3e).
- **Scoring Library & Catalog**: \`vietphonics-app/src/lib/scoring/audioDictation.js\` (Levenshtein distance calculation, gap checking, silence letter phonology explanations for \`doubt\` /daʊt/, \`knight\` /naɪt/, \`receipt\` /rɪˈsiːt/).
- **Backend API**: \`GET /api/v1/practice/dictation-exercises\`, \`POST /api/v1/practice/dictation-submit\`, \`GET /api/v1/practice/dictation/latest\` in \`server/index.js\`.
- **Database Table**: \`dictation_exercise_records\` in SQLite \`server/db.js\` with WAL mode.
- **Automated Tests**: \`vietphonics-app/tests/dictation.test.js\` (11/11 tests passing covering AC 1-4, Levenshtein metric, silent letter guidance, and SQLite persistence).`
  },
  {
    id: 'PRON-203',
    epic_id: 'epic-articulation',
    title: 'Targeted Sound Read-Aloud & Contextual Fluency Drills: Luyện Đọc To Âm Mục Tiêu Trong Ngữ Cảnh',
    persona: 'Người học muốn chuyển tiếp từ việc phát âm đúng từ đơn lẻ sang việc nói trôi chảy cả cụm từ và câu hoàn chỉnh',
    action: 'đọc to các câu văn giàu âm mục tiêu (Target Sound Saturated Sentences) và nhận phản hồi tức thời về độ chính xác và nhịp điệu',
    value: 'tạo sự tự tin khi nói câu dài, đảm bảo âm mục tiêu không bị biến dạng khi nói ở tốc độ bình thường',
    priority: 'must',
    status: 'done',
    size: 'M',
    points: 5,
    uiMockupUrl: '/src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pron-203-target-highlighting',
        given: 'Câu luyện tập âm /θ/: "I think thirty-three thieves thought of that"',
        when: 'Câu hiển thị trên màn hình',
        then: 'Toàn bộ 6 vị trí chứa âm /θ/ mục tiêu được bôi đậm nổi bật bằng màu xanh Sky-400 kèm huy hiệu đếm vị trí.',
        completed: true
      },
      {
        id: 'ac-pron-203-realtime-badge-counter',
        given: 'Học viên vừa hoàn thành lượt đọc câu vào micro',
        when: 'Hệ thống hoàn tất chấm điểm',
        then: 'Huy hiệu đếm hiển thị tỷ lệ đạt: Ví dụ "5/6 âm /θ/ đạt chuẩn (83%)", kèm vòng tròn tiến trình đổi sang màu xanh.',
        completed: true
      },
      {
        id: 'ac-pron-203-substitution-detection',
        given: 'Học viên đọc từ "thirty" thành "tơ-ti" (biến âm /θ/ thành /t/)',
        when: 'Hệ thống phát hiện lỗi thay thế âm',
        then: 'Từ "thirty" được gắn nhãn cảnh báo: "Lỗi thay thế: /θ/ bị đọc thành /t/. Hãy kẹp đầu lưỡi!".',
        completed: true
      },
      {
        id: 'ac-pron-203-isolate-audio-snippet',
        given: 'Học viên click vào bất kỳ từ nào trong câu',
        when: 'Sự kiện click diễn ra',
        then: 'Trình phát tự động cô lập và phát âm mẫu của riêng từ đó để học viên bắt chước lại.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pron-203-fe-view', title: 'Xây dựng component TargetSoundSentenceView.jsx với tính năng highlight từ thông minh', category: 'Frontend', completed: true },
      { id: 't-pron-203-fe-tracker', title: 'Thiết kế bộ đếm TargetPhonemeBadgeCounter đếm số âm đạt chuẩn trong câu', category: 'Frontend', completed: true },
      { id: 't-pron-203-fe-snippet', title: 'Tích hợp AudioBuffer slice phát riêng lẻ từng từ khi click vào câu văn', category: 'Frontend', completed: true },
      { id: 't-pron-203-be-scoring', title: 'Phát triển API POST /api/v1/scoring/targeted-sound lọc điểm theo phoneme symbol', category: 'Backend', completed: true }
    ]),
    notes: `### 🎯 FULLSTACK QUALITY AUDIT & IMPLEMENTATION EVIDENCE (12/12 GATES PASS)
- **Status**: Completed & Verified ✅
- **UI Mockup**: \`vietphonics-app/src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html\`
- **Frontend Component**: \`vietphonics-app/src/components/articulation/TargetSoundSentenceView.jsx\` (Interactive saturated sentence reader, target sound highlight tokens with IPA pills, real-time accuracy badge counter with animated status beacon, click-to-isolate word audio snippet player, L1 substitution detection drawer).
- **Mounted in**: \`vietphonics-app/src/views/PracticeStudioView.jsx\` (Section 3f).
- **Scoring Library & Catalog**: \`vietphonics-app/src/lib/scoring/targetSentenceDrill.js\` (Saturated sentences catalog for /θ/, /ʃ/, /d/ with occurrence counters, L1 substitution error detector, and breakdown generator).
- **Backend API**: \`GET /api/v1/practice/target-drill/sentences\`, \`POST /api/v1/scoring/targeted-sound\`, \`GET /api/v1/scoring/targeted-sound/latest\` in \`server/index.js\`.
- **Database Table**: \`target_sound_drill_records\` in SQLite \`server/db.js\` with WAL mode.
- **Automated Tests**: \`vietphonics-app/tests/target_drill.test.js\` (10/10 tests passing covering AC 1-4, target occurrences, substitution detection, and SQLite persistence).`
  },
  {
    id: 'PRON-204',
    epic_id: 'epic-articulation',
    title: 'Dual-Track Audio Recording & Native Speaker Waveform Comparison: So Sánh Sóng Âm Đôi Kênh Học Viên & Kênh Bản Xứ',
    persona: 'Học viên muốn nhìn thấy tận mắt sự khác biệt về hình dáng âm thanh và thời lượng giữa giọng mình và người bản xứ',
    action: 'thu âm giọng nói và quan sát 2 dải sóng âm song song (Dual-Track Audio Studio), kéo thanh trượt Scrubbing để nghe và soi từng đoạn âm',
    value: 'cung cấp bằng chứng thị giác trực quan tuyệt đối, giúp học viên tự phát hiện chỗ mình ngân quá ngắn hoặc phát âm thừa âm',
    priority: 'must',
    status: 'done',
    size: 'L',
    points: 8,
    uiMockupUrl: '/src/ui-reference/acoustic_precision_light/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pron-204-dual-tracks-render',
        given: 'Học viên vừa hoàn thành lượt thu âm từ mục tiêu (e.g. "thought")',
        when: 'Giao diện DualTrackStudio tải xong',
        then: 'Hiển thị 2 kênh sóng âm song song: Kênh A (Giọng bản xứ) màu xanh Sky-400 và Kênh B (Giọng học viên) màu hồng Rose-400, căn chỉnh thẳng hàng theo đỉnh nguyên âm chính.',
        completed: true
      },
      {
        id: 'ac-pron-204-interactive-playhead',
        given: 'Thanh trượt Playhead Scrubber chạy dọc qua cả 2 track sóng âm',
        when: 'Học viên dùng chuột kéo thanh Playhead sang trái/phải',
        then: 'Âm thanh của cả 2 kênh được duyệt âm tức thời (Audio Scrubbing) giúp soi chiếu từng mili-giây phát âm.',
        completed: true
      },
      {
        id: 'ac-pron-204-duration-discrepancy',
        given: 'Học viên ngân nguyên âm quá ngắn (ví dụ /ɔː/ trong "thought" chỉ kéo dài 100ms thay vì 220ms)',
        when: 'Hệ thống so sánh độ rộng biên độ sóng âm',
        then: 'Vùng thiếu hụt thời gian hiển thị khung viền đứt nét màu vàng Amber kèm thông báo: "Nguyên âm quá ngắn! Hãy kéo dài thêm ~120ms".',
        completed: true
      },
      {
        id: 'ac-pron-204-ab-channel-hotkeys',
        given: 'Học viên thao tác bằng bàn phím',
        when: 'Bấm phím A để nghe kênh bản ngữ, bấm phím B để nghe lại giọng mình',
        then: 'Chuyển kênh tức thời dưới 10ms, giúp tai cảm nhận độ tương phản rõ rệt.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pron-204-fe-studio', title: 'Xây dựng component DualTrackWaveformStudio.jsx với 2 dải sóng Canvas và Playhead Scrubber', category: 'Frontend', completed: true },
      { id: 't-pron-204-fe-peaks', title: 'Viết thuật toán trích xuất Waveform Peaks từ Float32Array của Web Audio API trên client', category: 'Audio/DSP', completed: true },
      { id: 't-pron-204-fe-hotkeys', title: 'Thiết lập phím tắt toàn cục A/B chuyển đổi nhanh 2 luồng âm thanh', category: 'Frontend', completed: true },
      { id: 't-pron-204-qa', title: 'Kiểm thử độ đồng bộ mili-giây giữa Playhead và luồng phát âm thanh', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 PURE FRONTEND DESIGN SPECIFICATION
- **Phân loại**: Pure Frontend Dual-Track Audio Studio
- **UI Mockup**: \`vietphonics-app/src/ui-reference/acoustic_precision_light/code.html\`
- **Frontend Component**: \`vietphonics-app/src/components/articulation/DualTrackStudio.jsx\`

#### 📐 Dual Track Canvas Architecture
\`\`\`
+-------------------------------------------------------------+
| TRACK A (Bản xứ):  [~~~/\/\/\~~~~~]  Duration: 680ms        |
|                    | <- Playhead line                      |
| TRACK B (Học viên):[~~/\/\..      ]  Duration: 420ms (Ngắn) |
|                            [ ! Cần ngân dài thêm ! ]        |
+-------------------------------------------------------------+
| Phím tắt: [A] Nghe Bản Xứ  |  [B] Nghe Học Viên  |  [Space] Dừng |
+-------------------------------------------------------------+
\`\`\`

#### 🎨 Design Tokens
- **Native Track**: \`bg-slate-900 border border-sky-500/30 rounded-2xl p-3 h-20\`.
- **User Track**: \`bg-slate-900 border border-rose-500/30 rounded-2xl p-3 h-20\`.
- **Playhead**: \`w-0.5 bg-amber-400 absolute top-0 bottom-0 shadow-[0_0_8px_#f59e0b]\`.`
  },
  {
    id: 'PRON-205',
    epic_id: 'epic-articulation',
    title: '3-Tier Positional Phoneme Ladder: Luyện Âm Phân Vị (Đầu, Giữa, Cuối)',
    persona: 'Người học có thể phát âm chuẩn một âm khi nó đứng ở đầu từ nhưng lại bị nuốt hoặc sai khi âm đó đứng ở giữa hoặc cuối từ',
    action: 'luyện tập âm vị mục tiêu theo thang bậc 3 vị trí (Tier 1: Vị trí đầu từ Initial -> Tier 2: Vị trí giữa từ Medial -> Tier 3: Vị trí cuối từ Final)',
    value: 'đảm bảo làm chủ âm vị ở mọi vị trí phân bố âm học, giải quyết dứt điểm tình trạng "chỉ nói đúng được chữ đầu"',
    priority: 'must',
    status: 'in-progress',
    size: 'L',
    points: 8,
    uiMockupUrl: '/src/ui-reference/kh_u_h_nh_2d_th_vi_n_gi_i_ph_u_m_v_l1_light_mode/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pron-205-ladder-unlock',
        given: 'Học viên chọn luyện âm /z/',
        when: 'Học viên hoàn thành Tier 1 (Vị trí đầu từ e.g. "zoo", "zero") với điểm số ≥80%',
        then: 'Hệ thống tự động kích hoạt hiệu ứng mở khóa Tier 2 (Vị trí giữa từ e.g. "music", "lazy") và Tier 3 (Vị trí cuối từ e.g. "buzz", "please").',
        completed: true
      },
      {
        id: 'ac-pron-205-ladder-ui-render',
        given: 'Giao diện PositionalLadderView',
        when: 'Hiển thị trên màn hình',
        then: 'Thang leo 3 tầng trực quan: Mỗi tầng là một thẻ Card có huy hiệu vị trí (Đầu - Giữa - Cuối), thanh đánh giá 3 sao (0/3 sao) và nút "Bắt đầu".',
        completed: true
      },
      {
        id: 'ac-pron-205-final-position-warning',
        given: 'Học viên bước vào Tier 3 (Vị trí cuối từ - cửa ải khó khăn nhất của người Việt)',
        when: 'Mở bài luyện Tier 3',
        then: 'Hiển thị thẻ chú ý L1: "85% người Việt nuốt âm ở vị trí này! Hãy duy trì luồng hơi rung dây thanh quản đến tận mili-giây cuối cùng".',
        completed: false
      },
      {
        id: 'ac-pron-205-local-storage-sync',
        given: 'Học viên hoàn thành các sao ở mỗi tầng',
        when: 'Đóng trình duyệt và mở lại',
        then: 'Toàn bộ số sao và trạng thái mở khóa của 3 tầng được lưu giữ chuẩn xác trong LocalStorage / User Profile.',
        completed: false
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pron-205-fe-ladder', title: 'Xây dựng component PositionalLadderView.jsx với 3 tầng nấc thang và hoạt ảnh mở khóa', category: 'Frontend', completed: true },
      { id: 't-pron-205-fe-stars', title: 'Thiết kế StarRatingDisplay hiển thị 3 sao thành tích cho mỗi tầng', category: 'Frontend', completed: true },
      { id: 't-pron-205-fe-l1-card', title: 'Xây dựng L1FinalConsonantAlertCard cảnh báo đặc thù cho Tier 3', category: 'Frontend', completed: false },
      { id: 't-pron-205-qa', title: 'Kiểm thử logic khóa/mở khóa tuần tự giữa 3 cấp bậc', category: 'QA', completed: false }
    ]),
    notes: `### 🎨 PURE FRONTEND DESIGN SPECIFICATION
- **Phân loại**: Pure Frontend UI Progression Ladder
- **UI Mockup**: \`vietphonics-app/src/ui-reference/kh_u_h_nh_2d_th_vi_n_gi_i_ph_u_m_v_l1_light_mode/code.html\`
- **Frontend Component**: \`vietphonics-app/src/components/articulation/PositionalLadder.jsx\`

#### 📐 3-Tier Ladder Layout
\`\`\`
+-------------------------------------------------------------+
| TIER 3: VỊ TRÍ CUỐI TỪ (FINAL) - Khó nhất                   |
| Ví dụ: "buzz", "please" | Trạng thái: [🔒 Đang khóa]        |
+-------------------------------------------------------------+
| TIER 2: VỊ TRÍ GIỮA TỪ (MEDIAL) - Trung bình                |
| Ví dụ: "music", "lazy"  | Trạng thái: [★ ★ ☆ 2/3 Sao]       |
+-------------------------------------------------------------+
| TIER 1: VỊ TRÍ ĐẦU TỪ (INITIAL) - Dễ nhất                   |
| Ví dụ: "zoo", "zero"    | Trạng thái: [★ ★ ★ Hoàn thành]    |
+-------------------------------------------------------------+
\`\`\`

#### 🎨 Design Tokens
- **Tier 1 (Initial)**: \`bg-sky-950/40 border-sky-500/40 text-sky-300 rounded-3xl p-4\`.
- **Tier 2 (Medial)**: \`bg-indigo-950/40 border-indigo-500/40 text-indigo-300 rounded-3xl p-4\`.
- **Tier 3 (Final)**: \`bg-rose-950/40 border-rose-500/40 text-rose-300 rounded-3xl p-4\`.`
  },
  {
    id: 'PRON-206',
    epic_id: 'epic-articulation',
    title: 'Connected Speech Positional Progression: Nâng Cấp Từ Đơn Lên Cụm Từ & Câu',
    persona: 'Học viên đã nói đúng từ đơn lẻ ở cả 3 vị trí nhưng cần tiến lên mức độ giao tiếp câu tự nhiên',
    action: 'luyện tập theo lộ trình tăng dần độ dài: Từ đơn (Word) -> Cụm 2-3 từ (Collocation) -> Câu giao tiếp thực tế (Sentence)',
    value: 'bảo toàn độ chính xác của âm vị trong luồng lời nói liên tục, chuẩn bị sẵn sàng cho giao tiếp phản xạ ngoài đời thực',
    priority: 'must',
    status: 'in-progress',
    size: 'M',
    points: 5,
    uiMockupUrl: '/src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pron-206-progression-steps',
        given: 'Học viên đạt điểm từ đơn "breathe" (>85%)',
        when: 'Hệ thống mở khóa bài luyện cấp tiến',
        then: 'Hiển thị bước 2 là cụm từ ("breathe in deeply"), và sau khi đạt bước 2 sẽ mở bước 3 là câu hoàn chỉnh ("Take a moment to breathe in deeply").',
        completed: true
      },
      {
        id: 'ac-pron-206-pills-layout',
        given: 'Giao diện ProgressionView hiển thị',
        when: 'Render trên màn hình',
        then: 'Thanh tiến trình 3 viên thuốc (Pill Stepper: Word -> Phrase -> Sentence) hiển thị mượt mà với trạng thái hoàn thành có dấu tick.',
        completed: true
      },
      {
        id: 'ac-pron-206-degradation-alert',
        given: 'Khi chuyển từ từ đơn sang câu dài, độ chính xác của âm mục tiêu bị tụt dốc >15%',
        when: 'Hệ thống phát hiện suy hao độ chuẩn xác',
        then: 'Bật cảnh báo: "Bạn đang bị mất âm khi nói câu dài! Hãy giảm tốc độ nói và tập trung vào âm mục tiêu trước".',
        completed: false
      },
      {
        id: 'ac-pron-206-auto-advance',
        given: 'Học viên bấm phím Enter sau khi hoàn thành đạt chuẩn bước hiện tại',
        when: 'Sự kiện Enter kích hoạt',
        then: 'Tự động chuyển tiếp trơn tru sang bước tiếp theo mà không cần dùng chuột.',
        completed: false
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pron-206-fe-prog', title: 'Xây dựng component ConnectedProgressionView.jsx với thanh tiến trình 3 cấp độ', category: 'Frontend', completed: true },
      { id: 't-pron-206-fe-pills', title: 'Thiết kế StepPillIndicator với hiệu ứng chuyển đổi trạng thái', category: 'Frontend', completed: true },
      { id: 't-pron-206-be-eval', title: 'Phát triển API POST /api/v1/practice/progression-tier kiểm soát điều kiện chuyển cấp', category: 'Backend', completed: false },
      { id: 't-pron-206-qa', title: 'Kiểm thử độ ổn định chấm điểm khi chuyển tiếp giữa các cấp độ', category: 'QA', completed: false }
    ]),
    notes: `### 🎯 FULLSTACK FEATURE SPECIFICATION
- **Phân loại**: Full-stack Connected Speech Progression Engine
- **UI Mockup**: \`vietphonics-app/src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html\`
- **Frontend Component**: \`vietphonics-app/src/components/articulation/ConnectedProgression.jsx\`

#### 🎨 Stepper Pills Design Tokens
- **Completed Step**: \`px-4 py-2 rounded-full font-semibold text-xs border border-emerald-500 bg-emerald-500/10 text-emerald-400\`.
- **Active Step**: \`px-4 py-2 rounded-full font-semibold text-xs border border-indigo-500 bg-indigo-500/20 text-indigo-300 ring-2 ring-indigo-500/30\`.
- **Locked Step**: \`px-4 py-2 rounded-full font-semibold text-xs border border-slate-800 bg-slate-900/50 text-slate-500\`.

#### 🗄️ Backend API Contract
\`\`\`http
POST /api/v1/practice/progression-tier
Content-Type: application/json

{
  "targetWord": "breathe",
  "tier": "phrase",
  "audioUrl": "https://r2.../phrase_01.opus"
}
\`\`\``
  },
  {
    id: 'PRON-207',
    epic_id: 'epic-articulation',
    title: 'Phonetic Exception Words & Grammatical Voicing Alternations: Quy Tắc Biến Âm Ngữ Pháp Đuôi -s/-es & -ed',
    persona: 'Người học hay nhầm lẫn quy tắc phát âm đuôi danh từ số nhiều -s/-es (/s/, /z/, /ɪz/) và đuôi quá khứ -ed (/t/, /d/, /ɪd/)',
    action: 'luyện tập các bài tập phân loại âm đuôi ngữ pháp tương tác và nắm vững quy tắc hữu thanh/vô thanh',
    value: 'chấm dứt vĩnh viễn thói quen "từ nào có s cũng đọc là s" hoặc "từ nào có ed cũng đọc là đơ", đạt độ chuẩn xác ngữ pháp và phát âm tuyệt đối',
    priority: 'must',
    status: 'in-progress',
    size: 'L',
    points: 8,
    uiMockupUrl: '/src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pron-207-three-columns-board',
        given: 'Giao diện VoicingRuleMasteryView hiển thị bài tập phân loại đuôi -s/-es',
        when: 'Học viên xem bảng điều khiển',
        then: 'Hiển thị 3 cột phân loại trực quan: Cột /s/ (Vô thanh), Cột /z/ (Hữu thanh), Cột /ɪz/ (Âm xuýt), hỗ trợ kéo thả hoặc bấm phím số 1, 2, 3.',
        completed: true
      },
      {
        id: 'ac-pron-207-vibration-feedback',
        given: 'Học viên phát âm một từ kết thúc bằng âm hữu thanh (ví dụ "dogs", "played")',
        when: 'Hệ thống đo đạc độ rung của dây thanh quản',
        then: 'Nếu phát âm đúng âm hữu thanh (/z/, /d/), hiển thị biểu tượng dây thanh âm rung màu xanh lá; nếu đọc nhầm sang vô thanh (/s/, /t/), hiển thị cảnh báo giải thích.',
        completed: true
      },
      {
        id: 'ac-pron-207-vietnamese-mnemonics',
        given: 'Học viên cần mẹo nhớ nhanh quy tắc',
        when: 'Bấm nút "Xem Câu Thần Chú"',
        then: 'Hiển thị câu khẩu quyết dân gian: "Thời phong kiến phương tây" cho đuôi /s/ và "Sáng sớm chạy xe sh zỏm" cho đuôi /ɪz/.',
        completed: false
      },
      {
        id: 'ac-pron-207-rule-api-validation',
        given: 'Học viên phân loại xong danh sách 10 từ',
        when: 'Gửi kết quả lên API POST /api/v1/grammar/voicing-check',
        then: 'Backend kiểm tra ma trận âm học đối chiếu và trả về bảng tổng kết tỷ lệ đạt trong dưới 30ms.',
        completed: false
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pron-207-fe-drag', title: 'Xây dựng component VoicingRuleBoard.jsx hỗ trợ kéo thả và phím tắt chọn cột', category: 'Frontend', completed: true },
      { id: 't-pron-207-fe-mnemonic', title: 'Thiết kế MnemonicCard ghi nhớ mẹo dân gian tiếng Việt', category: 'Frontend', completed: false },
      { id: 't-pron-207-be-rules', title: 'Xây dựng quy tắc PhonologicalRuleChecker kiểm tra tính đúng đắn của âm đuôi ngữ pháp', category: 'Backend', completed: true },
      { id: 't-pron-207-qa', title: 'Kiểm thử với 100 từ bất quy tắc phổ biến nhất trong tiếng Anh', category: 'QA', completed: false }
    ]),
    notes: `### 🎯 FULLSTACK FEATURE SPECIFICATION
- **Phân loại**: Full-stack Voicing Rule Engine & Interactive Sorting Board
- **UI Mockup**: \`vietphonics-app/src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html\`
- **Frontend Component**: \`vietphonics-app/src/components/articulation/VoicingRuleMastery.jsx\`

#### 🎨 3-Column Sorting Board Layout
\`\`\`
+-------------------------------------------------------------+
| Cột 1: /s/                  | Cột 2: /z/        | Cột 3: /ɪz/ |
| "Thời phong kiến phương tây"| (Còn lại)         | (Âm xuýt)   |
| [cats] [books]              | [dogs] [plays]    | [buses]     |
+-------------------------------------------------------------+
\`\`\`

#### 🗄️ Backend Voicing Rule Contract
\`\`\`http
POST /api/v1/grammar/voicing-check
Content-Type: application/json

{
  "category": "s_es_endings",
  "submissions": [
    { "word": "dogs", "chosenCoda": "/z/" }
  ]
}
\`\`\``
  },
  {
    id: 'PRON-208',
    epic_id: 'epic-articulation',
    title: 'L1 Confusion-Trap Cross-Transition Drills: Bài Tập Đảo Ngữ Âm Chống Nhầm Lẫn Bẫy Âm L1',
    persona: 'Người học khi gặp các câu có 2 âm dễ nhầm đứng cạnh nhau (e.g., "She sells sea shells") lập tức bị líu lưỡi và đọc lẫn lộn',
    action: 'luyện tập các bài tập đảo âm chéo (Cross-Transition Drills) xen kẽ giữa 2 âm đối kháng (/s/ và /ʃ/, /l/ và /n/, /θ/ và /s/)',
    value: 'rèn luyện sự linh hoạt của cơ lưỡi và phản xạ thần kinh vận động, giúp học viên không bao giờ bị líu lưỡi khi giao tiếp thực tế',
    priority: 'must',
    status: 'todo',
    size: 'M',
    points: 5,
    uiMockupUrl: '/src/ui-reference/kh_u_h_nh_2d_th_vi_n_gi_i_ph_u_m_v_l1_light_mode/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pron-208-tongue-twister-text',
        given: 'Câu luyện đảo âm đối kháng: "She sells sea shells on the sea shore"',
        when: 'Câu hiển thị trên màn hình',
        then: 'Các từ chứa âm /s/ được tô màu xanh Sky, các từ chứa âm /ʃ/ được tô màu hồng Rose, có icon biểu thị trạng thái môi (Bè miệng cười vs Cong môi chu ra).',
        completed: false
      },
      {
        id: 'ac-pron-208-assimilation-detection',
        given: 'Học viên đọc câu và bị líu lưỡi (đọc tất cả thành /s/ hoặc tất cả thành /ʃ/)',
        when: 'Hệ thống phân tích ranh giới phổ âm học',
        then: 'Phát hiện lỗi đồng hóa âm (Phonetic Assimilation) và chỉ rõ vị trí bị líu lưỡi kèm thông báo: "\'She\' (cong môi) -> \'sells\' (bè miệng)".',
        completed: false
      },
      {
        id: 'ac-pron-208-web-audio-metronome',
        given: 'Học viên gặp khó khăn khi đọc ở tốc độ bình thường',
        when: 'Bật chế độ "Máy Gõ Nhịp Metronome (60 BPM)"',
        then: 'Web Audio API phát tiếng gõ nhịp đều đặn, từ tương ứng phát sáng theo từng nhịp gõ để học viên luyện chuẩn từng bước.',
        completed: false
      },
      {
        id: 'ac-pron-208-transition-scoring-api',
        given: 'Bản ghi âm câu đảo âm được gửi lên API POST /api/v1/practice/confusion-trap',
        when: 'Máy chủ chấm điểm sự phân tách âm vị',
        then: 'Trả về ma trận điểm số chuyển đổi (Cross-Transition Matrix) và chỉ số độ dẻo cơ miệng trong dưới 200ms.',
        completed: false
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pron-208-fe-twister', title: 'Xây dựng component CrossTransitionTwister.jsx với máy gõ nhịp Metronome Web Audio', category: 'Frontend', completed: false },
      { id: 't-pron-208-fe-metronome', title: 'Thiết kế Web Audio Metronome phát xung nhịp click từ 60 BPM đến 120 BPM', category: 'Frontend', completed: false },
      { id: 't-pron-208-be-eval', title: 'Phát triển API POST /api/v1/practice/confusion-trap chấm điểm độ phân tách âm', category: 'Backend', completed: false },
      { id: 't-pron-208-qa', title: 'Kiểm thử với 30 câu líu lưỡi kinh điển của người học tiếng Anh', category: 'QA', completed: false }
    ]),
    notes: `### 🎯 FULLSTACK FEATURE SPECIFICATION
- **Phân loại**: Full-stack Confusion-Trap & Metronome Rhythmic Engine
- **UI Mockup**: \`vietphonics-app/src/ui-reference/kh_u_h_nh_2d_th_vi_n_gi_i_ph_u_m_v_l1_light_mode/code.html\`
- **Frontend Component**: \`vietphonics-app/src/components/articulation/CrossTransitionDrill.jsx\`

#### 🎨 Alternating Phoneme Colors
- **Sound A (/s/) Chip**: \`bg-sky-500/20 text-sky-400 border border-sky-500 font-bold px-2 py-1 rounded\`.
- **Sound B (/ʃ/) Chip**: \`bg-rose-500/20 text-rose-400 border border-rose-500 font-bold px-2 py-1 rounded\`.

#### 🗄️ Backend API Contract
\`\`\`http
POST /api/v1/practice/confusion-trap
Content-Type: application/json

{
  "drillId": "trap_s_sh_01",
  "audioUrl": "https://r2.../twister.opus"
}
\`\`\``
  },
  {
    id: 'PRON-209',
    epic_id: 'epic-articulation',
    title: 'Numbered Target Phoneme System & Multi-Spelling Sound Maps: Bản Đồ Mặt Chữ & Các Dạng Chính Tả Đa Dạng',
    persona: 'Người học tiếng Anh hoang mang vì cùng một âm vị lại có quá nhiều cách viết chữ khác nhau (ví dụ âm /f/ có thể viết là f, ph, gh)',
    action: 'tra cứu bản đồ chính tả đa dạng (Multi-Spelling Sound Map) của từng âm vị mục tiêu',
    value: 'nắm vững toàn bộ các biến thể chữ viết của một âm, không bao giờ bị cách viết tiếng Anh đánh lừa',
    priority: 'should',
    status: 'in-progress',
    size: 'M',
    points: 5,
    uiMockupUrl: '/src/ui-reference/kh_u_h_nh_2d_th_vi_n_gi_i_ph_u_m_v_l1_light_mode/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pron-209-radial-mindmap',
        given: 'Học viên tra cứu âm /f/',
        when: 'Bản đồ chính tả SVG hiển thị',
        then: 'Nút trung tâm hiển thị ký hiệu /f/, tỏa ra các nhánh tỷ lệ: Nhánh "f/ff" (78%), Nhánh "ph" (18%), Nhánh "gh" (4% e.g. "rough", "laugh").',
        completed: true
      },
      {
        id: 'ac-pron-209-branch-expansion',
        given: 'Học viên click vào nhánh "ph"',
        when: 'Nhánh mở rộng',
        then: 'Hiển thị danh sách 5 từ ví dụ thông dụng: "phone", "photo", "physics", "phrase", "dolphin" kèm nút nghe phát âm.',
        completed: true
      },
      {
        id: 'ac-pron-209-silent-spelling-warning',
        given: 'Học viên xem nhánh "gh"',
        when: 'Bật cảnh báo âm câm',
        then: 'Hiển thị ghi chú: "\'gh\' chỉ đọc là /f/ trong một số từ như \'laugh\', \'rough\'; còn trong \'though\', \'night\' thì hoàn toàn là âm câm!".',
        completed: false
      },
      {
        id: 'ac-pron-209-keyboard-traversal',
        given: 'Học viên duyệt cây bằng bàn phím',
        when: 'Dùng phím mũi tên hoặc Tab',
        then: 'Con trỏ duyệt qua từng nhánh và đọc to tỷ lệ phần trăm phân bố.',
        completed: false
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pron-209-fe-map', title: 'Xây dựng component MultiSpellingMindmap.jsx dạng đồ họa SVG tương tác', category: 'Frontend', completed: true },
      { id: 't-pron-209-fe-branch', title: 'Thiết kế hiệu ứng bung nhánh hoạt họa (Framer Motion Tree Expansion)', category: 'Frontend', completed: true },
      { id: 't-pron-209-fe-silent', title: 'Tích hợp thẻ chú thích âm câm SilentSpellingCallout', category: 'Frontend', completed: false },
      { id: 't-pron-209-qa', title: 'Kiểm tra độ chính xác của tỷ lệ phần trăm phân bố chính tả theo từ điển thống kê', category: 'QA', completed: false }
    ]),
    notes: `### 🎨 PURE FRONTEND DESIGN SPECIFICATION
- **Phân loại**: Pure Frontend Radial SVG Mindmap
- **UI Mockup**: \`vietphonics-app/src/ui-reference/kh_u_h_nh_2d_th_vi_n_gi_i_ph_u_m_v_l1_light_mode/code.html\`
- **Frontend Component**: \`vietphonics-app/src/components/articulation/MultiSpellingSoundMap.jsx\`

#### 📐 Radial Mindmap Hierarchy
\`\`\`
+-------------------------------------------------------------+
|             [ Nhánh "f/ff" (78%) - fast, coffee ]           |
|                               ^                             |
|                               |                             |
| [ "gh" (4%) ] <--- (( TÂM: ÂM /f/ )) ---> [ "ph" (18%) ]    |
| rough, laugh                                phone, photo    |
+-------------------------------------------------------------+
\`\`\`

#### 🎨 Design Tokens
- **Center Node**: \`w-24 h-24 rounded-full bg-indigo-600 text-white font-black text-2xl flex items-center justify-center shadow-2xl\`.
- **Branch Node**: \`bg-slate-900 border border-slate-700 rounded-2xl p-3 text-slate-200 hover:border-indigo-400 cursor-pointer\`.`
  },
  {
    id: 'PRON-210',
    epic_id: 'epic-articulation',
    title: 'Video-Synchronized Masterclass & Exaggerated Articulation Modeling: Lớp Học Khẩu Hình Video Phóng Đại Đồng Bộ',
    persona: 'Người học cần nhìn cận cảnh miệng và cơ mặt của chuyên gia bản ngữ ở góc quay siêu nét và chuyển động chậm để bắt chước',
    action: 'xem video bài giảng ngắn (30-45s) với chuyên gia bản ngữ phát âm ở chế độ phóng đại khẩu hình (Exaggerated Articulation), có đồ họa vector đồng bộ theo thời gian thực',
    value: 'quan sát rõ từng chuyển động tinh tế của cơ môi và răng mà mắt thường khó nhận ra ở tốc độ nói nhanh',
    priority: 'should',
    status: 'todo',
    size: 'L',
    points: 8,
    uiMockupUrl: '/src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pron-210-dual-camera-angles',
        given: 'Học viên xem video khẩu hình âm /θ/',
        when: 'Bấm nút chuyển đổi góc quay',
        then: 'Trình phát đổi tức thì giữa Góc nhìn thẳng (Frontal View) và Góc nghiêng 45 độ (Profile View) mà không bị gián đoạn âm thanh.',
        completed: false
      },
      {
        id: 'ac-pron-210-auto-zoom-cues',
        given: 'Video phát đến khoảnh khắc đặt lưỡi kẹp răng',
        when: 'Khung hình chạm mốc thời gian WebVTT cue',
        then: 'Giao diện tự động zoom cận cảnh 2x vào vùng miệng của chuyên gia, hiển thị vòng tròn phát sáng màu xanh chỉ vào đầu lưỡi.',
        completed: false
      },
      {
        id: 'ac-pron-210-ab-loop-slowmo',
        given: 'Học viên muốn soi kỹ một chuyển động khẩu hình khó',
        when: 'Chọn tốc độ phát 0.25x hoặc 0.5x và bật nút lặp đoạn A-B',
        then: 'Đoạn video được lặp lại liên tục ở tốc độ siêu chậm mượt mà.',
        completed: false
      },
      {
        id: 'ac-pron-210-low-bandwidth-fallback',
        given: 'Đường truyền mạng của học viên bị suy giảm băng thông',
        when: 'Hệ thống phát hiện buffer underrun',
        then: 'Tự động hạ độ phân giải video hoặc chuyển sang chế độ ảnh động WebP nén nhẹ nhàng.',
        completed: false
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pron-210-fe-player', title: 'Xây dựng component MasterclassVideoPlayer.jsx với tính năng lặp đoạn A-B và đổi góc quay', category: 'Frontend', completed: false },
      { id: 't-pron-210-fe-webvtt', title: 'Tích hợp bộ phân tích WebVTT Cues đồng bộ hoạt ảnh SVG đè lên luồng video', category: 'Frontend', completed: false },
      { id: 't-pron-210-qa', title: 'Kiểm thử khả năng phát mượt mà trên kết nối mạng di động 4G', category: 'QA', completed: false }
    ]),
    notes: `### 🎨 PURE FRONTEND DESIGN SPECIFICATION
- **Phân loại**: Pure Frontend Video Player & WebVTT Sync
- **UI Mockup**: \`vietphonics-app/src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html\`
- **Frontend Component**: \`vietphonics-app/src/components/articulation/VideoMasterclassPlayer.jsx\`

#### 📐 Video Player Layout & Controls
\`\`\`
+-------------------------------------------------------------+
| [ TRÌNH PHÁT VIDEO KHẨU HÌNH 16:9 FULL HD ]                 |
| (Chuyên gia bản ngữ phát âm phóng đại khẩu hình)            |
| (Vòng tròn neon zoom cận cảnh 2x vào vị trí đầu lưỡi)       |
+-------------------------------------------------------------+
| [Góc: Thẳng / 45°]  [Tốc độ: 0.25x | 0.5x | 1x]  [Lặp đoạn A-B]|
+-------------------------------------------------------------+
\`\`\`

#### 🎨 Design Tokens
- **Video Frame**: \`rounded-3xl overflow-hidden border-2 border-slate-800 bg-black aspect-video relative shadow-2xl\`.
- **Control Overlay**: \`bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-4 flex items-center justify-between\`.`
  },
  {
    id: 'PRON-211',
    epic_id: 'epic-articulation',
    title: 'Dense Target Sound Saturation Sentences: Luyện Câu Bão Hòa Âm Mục Tiêu Tối Đa',
    persona: 'Người học muốn thử thách cơ miệng ở cấp độ cao nhất để kiểm tra xem mình đã thực sự làm chủ âm vị chưa',
    action: 'luyện đọc các câu được thiết kế bão hòa âm mục tiêu với mật độ cực cao (tối thiểu 4-6 lần xuất hiện trong 1 câu ngắn)',
    value: 'tạo áp lực cấu âm liên tục giúp cơ miệng thích nghi và khắc sâu phản xạ cơ bắp tự động (Muscle Memory)',
    priority: 'should',
    status: 'todo',
    size: 'M',
    points: 5,
    uiMockupUrl: '/src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pron-211-saturation-meter-fill',
        given: 'Câu bão hòa âm /dʒ/: "George enjoyed arranging orange juice in the large fridge"',
        when: 'Học viên đọc câu và phát âm đúng từng âm /dʒ/',
        then: 'Thanh "Saturation Meter" tăng dần độ đầy từ 0% đến 100% kèm hiệu ứng phát sáng neon xanh ngọc.',
        completed: false
      },
      {
        id: 'ac-pron-211-ctc-density-eval',
        given: 'Bản ghi âm câu bão hòa được gửi lên hệ thống',
        when: 'Thuật toán CTC Alignment xử lý phân tích mật độ âm',
        then: 'Chấm điểm độc lập cho toàn bộ 6 âm /dʒ/ và chỉ rõ các vị trí đạt hay chưa đạt trong vòng dưới 250ms.',
        completed: false
      },
      {
        id: 'ac-pron-211-l1-affricate-advice',
        given: 'Học viên phát âm /dʒ/ thành /z/ hoặc /d/ kiểu Việt Nam',
        when: 'Hệ thống phát hiện lỗi mất âm tắc xát (Affricate Failure)',
        then: 'Hiển thị lời khuyên: "Âm /dʒ/ là âm tắc xát: Cần khép miệng nén khí rồi mới bật ra, không đọc lướt như chữ \'d\' tiếng Việt".',
        completed: false
      },
      {
        id: 'ac-pron-211-native-slow-demo',
        given: 'Học viên bấm nút "Nghe Bản Xứ Chậm"',
        when: 'Hành động kích hoạt',
        then: 'Phát audio bản ngữ ở tốc độ 0.7x với từng âm /dʒ/ được phát âm rõ ràng, chuẩn xác.',
        completed: false
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pron-211-fe-meter', title: 'Xây dựng component SaturationMeter.jsx với hiệu ứng tích lũy năng lượng khi đọc đúng', category: 'Frontend', completed: false },
      { id: 't-pron-211-be-eval', title: 'Phát triển API POST /api/v1/scoring/saturation-sentence chấm điểm câu bão hòa', category: 'Backend', completed: false },
      { id: 't-pron-211-qa', title: 'Kiểm thử với ngân hàng 100 câu bão hòa âm vị khó', category: 'QA', completed: false }
    ]),
    notes: `### 🎯 FULLSTACK FEATURE SPECIFICATION
- **Phân loại**: Full-stack Sound Saturation Evaluator & Energy Meter
- **UI Mockup**: \`vietphonics-app/src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html\`
- **Frontend Component**: \`vietphonics-app/src/components/articulation/SoundSaturationDrill.jsx\`

#### 🎨 Saturation Meter Tokens
- **Saturation Bar Track**: \`h-3 rounded-full bg-slate-800 overflow-hidden w-full max-w-md\`.
- **Saturation Bar Fill**: \`bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 shadow-[0_0_12px_rgba(16,185,129,0.5)]\`.

#### 🗄️ Backend API Contract
\`\`\`http
POST /api/v1/scoring/saturation-sentence
Content-Type: application/json

{
  "sentenceId": "sat_dj_01",
  "targetPhoneme": "/dʒ/",
  "audioUrl": "https://r2.../dj_01.opus"
}
\`\`\``
  },
  {
    id: 'VN-105',
    epic_id: 'epic-articulation',
    title: 'Vietnamese Native-Tongue Mouth & Tongue Placement Guides: Cẩm Nang Vị Trí Đặt Lưỡi & Khẩu Hình Đối Chiếu Tiếng Việt',
    persona: 'Người học Việt Nam cần những lời chỉ dẫn cấu âm bình dị, gần gũi, sử dụng các hình ảnh so sánh với tiếng mẹ đẻ để dễ hình dung',
    action: 'đọc cẩm nang hướng dẫn cấu âm chuyên biệt cho người Việt (e.g., "Để phát âm /θ/, hãy tưởng tượng bạn đang chuẩn bị cắn nhẹ vào đầu lưỡi...")',
    value: 'xóa bỏ rào cản thuật ngữ ngữ âm học khô khan, biến việc học phát âm thành các mẹo dân gian dễ nhớ và áp dụng được ngay tức khắc',
    priority: 'must',
    status: 'done',
    size: 'M',
    points: 5,
    uiMockupUrl: '/src/ui-reference/kh_u_h_nh_2d_th_vi_n_gi_i_ph_u_m_v_l1_light_mode/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-vn-105-three-step-guide',
        given: 'Học viên xem hướng dẫn cấu âm âm /ð/ (this, that)',
        when: 'Mở tab cẩm nang tiếng Việt',
        then: 'Hiển thị mẹo 3 bước trực quan: 1. Đặt đầu lưỡi kẹp nhẹ giữa 2 hàm răng như âm /θ/, 2. Rung cổ họng phát tiếng ong kêu "zzz", 3. Rụt nhẹ đầu lưỡi về sau.',
        completed: true
      },
      {
        id: 'ac-vn-105-side-by-side-comparison',
        given: 'Giao diện NativeTonguePlacementCard hiển thị',
        when: 'Học viên đối chiếu tiếng Việt vs tiếng Anh',
        then: 'Hiển thị sơ đồ so sánh trực quan 2 vòm miệng: Vòm miệng tiếng Việt (cơ miệng mềm, thả lỏng) vs Vòm miệng tiếng Anh (cơ miệng căng, độ nén luồng khí lớn).',
        completed: true
      },
      {
        id: 'ac-vn-105-tactile-mnemonics',
        given: 'Học viên xem các mẹo xúc giác thực hành',
        when: 'Đọc phần mẹo ghi nhớ',
        then: 'Cung cấp cảm giác xúc giác thực tế: Ví dụ đặt bàn tay trước miệng cảm nhận luồng hơi mát khi phát âm âm vô thanh.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-vn-105-fe-card', title: 'Xây dựng component L1MouthPlacementGuideCard.jsx với minh họa 3 bước trực quan', category: 'Frontend', completed: true },
      { id: 't-vn-105-fe-diagram', title: 'Thiết kế đồ họa so sánh song song cơ miệng tiếng Việt vs tiếng Anh', category: 'Frontend', completed: true },
      { id: 't-vn-105-qa', title: 'Kiểm thử mức độ dễ hiểu của cẩm nang đối với người học mới bắt đầu từ con số 0', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 PURE FRONTEND DESIGN SPECIFICATION
- **Phân loại**: Pure Frontend Pedagogical Placement Card
- **UI Mockup**: \`vietphonics-app/src/ui-reference/kh_u_h_nh_2d_th_vi_n_gi_i_ph_u_m_v_l1_light_mode/code.html\`
- **Frontend Component**: \`vietphonics-app/src/components/articulation/NativeTonguePlacementGuide.jsx\`

#### 📐 3-Step Practical Layout
\`\`\`
+-------------------------------------------------------------+
| CẨM NANG KHẨU HÌNH THỰC CHIẾN CHO NGƯỜI VIỆT                |
| Âm: /ð/ (this, that, brother)                               |
+-------------------------------------------------------------+
| [BƯỚC 1: KẸP LƯỠI]     -> [BƯỚC 2: RUNG CỔ HỌNG] -> [BƯỚC 3: RỤT LƯỠI]|
| Thò 2mm đầu lưỡi ra        Kêu tiếng "zzz" như      Rụt lưỡi lại nhả |
| giữa 2 hàm răng            tiếng ong bay            hơi êm dịu       |
+-------------------------------------------------------------+
| Mẹo xúc giác: Đặt ngón tay lên cổ họng để cảm nhận độ rung! |
+-------------------------------------------------------------+
\`\`\`

#### 🎨 Design Tokens
- **Guide Card**: \`bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl\`.
- **Step Badge**: \`w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 font-bold flex items-center justify-center\`.`
  }
];
