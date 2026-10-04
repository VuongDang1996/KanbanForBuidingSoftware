export const roleplayStories = [
  {
    id: 'ELSA-301',
    epic_id: 'epic-roleplay-ielts',
    title: 'Dynamic Scenario AI Speaking Roleplay: Hội Thoại Phản Xạ Trực Tiếp Với Đồng Nghiệp Mỹ (IT Standup)',
    persona: 'Lập trình viên và kỹ sư công nghệ làm việc từ xa (remote) với khách hàng và quản lý người Mỹ',
    action: 'tham gia phiên họp Daily Scrum Standup với nhân vật AI Alex Tech Lead (San Francisco) và trả lời câu hỏi cập nhật tiến độ',
    value: 'luyện phản xạ nói tiếng Anh công sở trong môi trường áp lực nhẹ, nhận phản hồi phát âm và ngữ điệu tức thời mà không sợ bị phán xét',
    priority: 'must',
    status: 'done',
    size: 'XL',
    points: 13,
    uiMockupUrl: '/src/ui-reference/ai_h_i_tho_i_roleplay_c_ng_s_light_mode/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-elsa-301-live-turn-taking',
        given: 'Phiên họp Daily Standup với Alex Tech Lead đang diễn ra',
        when: 'Alex hoàn tất câu hỏi: "Morning team! What did you finish yesterday on the payment gateway, and are there any blockers?"',
        then: 'Nút Push-To-Talk phát sáng sẵn sàng thu âm; khi người dùng nói xong và nhả mic, luồng âm thanh được xử lý và Alex phản hồi tự nhiên trong dưới 1.2 giây.',
        completed: true
      },
      {
        id: 'ac-elsa-301-webrtc-spectrum-avatar',
        given: 'Giao diện phòng hội thoại RoleplayView hiển thị',
        when: 'Alex đang phát biểu câu trả lời',
        then: 'Vòng hào quang gradient quanh ảnh đại diện Alex nhấp nháy đồng bộ với dải sóng âm phổ tần số WebRTC (Spectrum Indicator) mượt mà 60 FPS.',
        completed: true
      },
      {
        id: 'ac-elsa-301-blocker-ending-consonant',
        given: 'Học viên trả lời báo cáo blocker nhưng nuốt âm đuôi /t/ trong từ "blocked"',
        when: 'Mô hình phân tích âm học câu nói',
        then: 'Thẻ checklist mục tiêu bên phải lập tức cảnh báo: "Báo cáo blocker: Thiếu âm bật hơi /t/ trong từ \'blocked\'".',
        completed: true
      },
      {
        id: 'ac-elsa-301-bilingual-subtitle-toggle',
        given: 'Học viên muốn hỗ trợ đọc hiểu ngữ cảnh công sở',
        when: 'Bật toggle "Phụ đề song ngữ (Bilingual Subtitles)"',
        then: 'Hiển thị bản dịch tiếng Việt súc tích ngay bên dưới bong bóng thoại tiếng Anh của Alex.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-elsa-301-fe-ui', title: 'Xây dựng giao diện RoleplayView với ảnh đại diện Alex, dải spectrum WebRTC và khung chat', category: 'Frontend', completed: true },
      { id: 't-elsa-301-fe-mic', title: 'Tích hợp Push-To-Talk toàn cục với phím Space và xử lý chuyển đổi lượt nói (turn-taking)', category: 'Audio/DSP', completed: true },
      { id: 't-elsa-301-be-ws', title: 'Thiết kế WebSocket gateway tối ưu hóa phiên thoại với heartbeat 15s', category: 'Backend', completed: true },
      { id: 't-elsa-301-be-llm', title: 'Tích hợp LLM streaming API với system prompt chuyên sâu về IT Scrum meeting', category: 'Backend', completed: true }
    ]),
    notes: `### 🎯 FULLSTACK QUALITY AUDIT & IMPLEMENTATION EVIDENCE (12/12 GATES PASS)
- **Status**: Completed & Verified ✅
- **UI Mockup**: \`vietphonics-app/src/ui-reference/ai_h_i_tho_i_roleplay_c_ng_s_light_mode/code.html\`
- **Frontend Component**: \`vietphonics-app/src/views/RoleplayView.jsx\` (Alex Tech Lead avatar aura with animated spectrum, bilingual subtitle toggle, Spacebar Push-To-Talk microphone toggle, ending stops /t/ /d/ acoustic breakdown bar, real-time sync with backend).
- **Conversational Engine & Catalog**: \`vietphonics-app/src/lib/scoring/roleplayScenarios.js\` (Scenarios catalog for IT Scrum #IT-04 and Job Interview #HR-02, turn evaluator, ending stops /t/ /d/ /kt/ detection, objective checklists, and dynamic AI reply generator).
- **Backend API**: \`GET /api/v1/roleplay/scenarios\`, \`GET /api/v1/roleplay/scenarios/:scenarioId\`, \`POST /api/v1/roleplay/turn-eval\`, \`GET /api/v1/roleplay/session/latest\` in \`server/index.js\`.
- **Database Table**: \`roleplay_session_records\` in SQLite \`server/db.js\` with WAL mode.
- **Automated Tests**: \`vietphonics-app/tests/roleplay.test.js\` (9/9 tests passing covering AC 1-4, scenario definitions, turn-taking evaluation, ending stops detection, and SQLite persistence).`
  },
  {
    id: 'ELSA-302',
    epic_id: 'epic-roleplay-ielts',
    title: 'Post-Roleplay Comprehensive Scorecard: Bảng Chỉ Số Toàn Diện Sau Hội Thoại & Phân Tích Lỗi Giao Tiếp',
    persona: 'Người học vừa kết thúc phiên hội thoại 5 phút và cần một bản báo cáo phân tích toàn diện để biết mình làm tốt điều gì và cần cải thiện gì',
    action: 'xem bảng điểm tổng kết (Post-Roleplay Scorecard) đánh giá 5 trụ cột: Điểm Phát Âm, Độ Lưu Loát, Ngữ Pháp, Từ Vựng Công Sở, và Tỷ Lệ Hoàn Thành Mục Tiêu Buổi Họp',
    value: 'biến một cuộc trò chuyện cảm tính thành dữ liệu định lượng cụ thể, lưu lại các câu nói chưa chuẩn vào Ngân Hàng Lỗi để ôn tập',
    priority: 'must',
    status: 'done',
    size: 'L',
    points: 8,
    uiMockupUrl: '/src/ui-reference/ai_h_i_tho_i_roleplay_c_ng_s_light_mode/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-elsa-302-scorecard-render',
        given: 'Học viên bấm "Kết thúc buổi họp" sau khi hoàn tất các lượt đối thoại',
        when: 'Giao diện tổng kết tải lên',
        then: 'Hiển thị Bảng Chỉ Số Toàn Diện dạng Bento Grid với điểm tổng quan huy hiệu vàng kim (Overall Performance Score) và 5 chỉ số thành phần.',
        completed: true
      },
      {
        id: 'ac-elsa-302-five-pillars-breakdown',
        given: 'Dữ liệu phân tích 5 trụ cột giao tiếp',
        when: 'Render các thẻ thành phần',
        then: 'Hiển thị 5 thẻ phân màu: Phát âm (Rose-500), Lưu loát (Sky-500), Ngữ pháp (Emerald-500), Từ vựng IT (Indigo-500), Hoàn thành mục tiêu (Amber-500).',
        completed: true
      },
      {
        id: 'ac-elsa-302-transcript-audio-replay',
        given: 'Danh sách toàn văn các lượt đối thoại (Full Conversation Transcript)',
        when: 'Học viên bấm nút loa bên cạnh từng câu thoại của mình',
        then: 'Hệ thống phát lại ngay đoạn âm thanh giọng nói của chính học viên ở lượt nói đó để tự đối soát.',
        completed: true
      },
      {
        id: 'ac-elsa-302-save-to-error-bank',
        given: 'Báo cáo chỉ ra các từ kỹ thuật phát âm sai (e.g., "API", "Debug", "Release")',
        when: 'Học viên bấm nút "Lưu vào Ngân Hàng Lỗi"',
        then: 'Các từ vựng này tự động được nạp vào Error Bank Spaced Repetition để luyện lại vào ngày hôm sau.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-elsa-302-fe-bento', title: 'Xây dựng component PostRoleplayScorecard.jsx với bố cục Bento Grid 5 chỉ số', category: 'Frontend', completed: true },
      { id: 't-elsa-302-fe-transcript', title: 'Thiết kế component TranscriptReviewList.jsx hỗ trợ bấm nghe lại từng câu thoại', category: 'Frontend', completed: true },
      { id: 't-elsa-302-fe-error-bank', title: 'Tích hợp nút lưu từ vựng yếu vào Error Bank LocalStorage & State', category: 'Frontend', completed: true },
      { id: 't-elsa-302-qa', title: 'Kiểm tra hiển thị đầy đủ các thẻ đánh giá trên màn hình điện thoại di động', category: 'QA', completed: true }
    ]),
    notes: `### 🎯 FULLSTACK QUALITY AUDIT & IMPLEMENTATION EVIDENCE (12/12 GATES PASS)
- **Status**: Completed & Verified ✅
- **UI Mockup**: \`vietphonics-app/src/ui-reference/ai_h_i_tho_i_roleplay_c_ng_s_light_mode/code.html\`
- **Frontend Component**: \`vietphonics-app/src/components/roleplay/PostRoleplayScorecard.jsx\` mounted in \`vietphonics-app/src/views/RoleplayView.jsx\` (Bento grid 5 communicative pillars, rank tier gold badge, full conversation transcript review with per-turn audio replay, and direct export to Error Bank Spaced Repetition).
- **Evaluation Engine**: \`vietphonics-app/src/lib/scoring/roleplayScorecard.js\` (Weighted scoring formula: Pronunciation 25%, Fluency 20%, Grammar 20%, Vocabulary 20%, Objectives 15%; rank badge calculation; Vietnamese muscle corrective tip generator).
- **Backend API**: \`POST /api/v1/roleplay/scorecard/generate\`, \`GET /api/v1/roleplay/scorecard/latest\`, \`POST /api/v1/roleplay/scorecard/save-error\` in \`server/index.js\`.
- **Database Table**: \`roleplay_scorecard_records\` in SQLite \`server/db.js\` with WAL mode.
- **Automated Tests**: \`vietphonics-app/tests/roleplay_scorecard.test.js\` (9/9 tests passing covering scoring weights, rank badge thresholds, SQLite persistence, and Error Bank payload generation).`
  },
  {
    id: 'VN-104',
    epic_id: 'epic-roleplay-ielts',
    title: 'IELTS Speaking Part 1 & 2 AI Mock Examiner for Vietnamese Learners: Giám Khảo AI Thi Thử IELTS Speaking Part 1 & 2',
    persona: 'Thí sinh người Việt đang ôn thi IELTS Speaking cần người chấm thi thử đúng format chuẩn IDP/BC mà không đủ chi phí thuê giáo viên bản ngữ chấm 1:1',
    action: 'thi thử phòng thi ảo với Giám khảo AI Sarah (London), trải nghiệm Part 1 (hỏi đáp ngắn 4 phút) và Part 2 (thẻ gợi ý Cue Card với 1 phút chuẩn bị và 2 phút nói liên tục)',
    value: 'tạo tâm lý phòng thi chân thực 100%, giải tỏa áp lực phòng thi thật và nhận bảng phân tích 4 tiêu chí chấm thi IELTS Speaking chính thức',
    priority: 'must',
    status: 'done',
    size: 'XL',
    points: 13,
    uiMockupUrl: '/src/ui-reference/ai_h_i_tho_i_roleplay_c_ng_s_light_mode/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-vn-104-cue-card-countdown',
        given: 'Học viên bắt đầu bài thi thử IELTS Speaking Part 2',
        when: 'Giám khảo đưa thẻ chủ đề Cue Card (ví dụ: "Describe a piece of technology you find difficult to use")',
        then: 'Đồng hồ đếm ngược 60 giây kích hoạt kèm bảng nháp ảo; hết 60 giây chuông báo nhẹ và tự động chuyển sang giai đoạn thu âm 120 giây nói liên tục.',
        completed: true
      },
      {
        id: 'ac-vn-104-scratchpad-notes',
        given: 'Trong thời gian 60 giây chuẩn bị Part 2',
        when: 'Học viên gõ dàn ý vào khung ScratchPadNotepad',
        then: 'Ghi chú được lưu giữ hiển thị ngay bên cạnh thẻ Cue Card trong suốt thời gian 2 phút nói để học viên liếc nhìn gợi ý.',
        completed: true
      },
      {
        id: 'ac-vn-104-cambridge-criteria-eval',
        given: 'Học viên hoàn tất 2 phút nói liên tục',
        when: 'Hệ thống gửi audio lên API POST /api/v1/ielts/mock-eval',
        then: 'AI phân tích và xuất bảng điểm 4 tiêu chuẩn Cambridge: Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy, Pronunciation với ước lượng Band 0-9.0.',
        completed: true
      },
      {
        id: 'ac-vn-104-l1-past-tense-flag',
        given: 'Thí sinh kể lại câu chuyện quá khứ nhưng bỏ quên đuôi thì quá khứ (Past Tense -ed)',
        when: 'Báo cáo ngữ pháp GRA xuất hiện',
        then: 'Liệt kê cụ thể: "Bạn đã quên chia thì quá khứ ở các động từ: \'use\', \'try\', \'fail\', làm suy giảm độ chính xác ngữ pháp".',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-vn-104-fe-room', title: 'Xây dựng component IeltsMockExaminer.jsx với đồng hồ đếm ngược kỹ thuật số và bảng nháp Cue Card', category: 'Frontend', completed: true },
      { id: 't-vn-104-fe-timer', title: 'Triển khai hook quản lý chính xác 60s chuẩn bị và 120s nói liên tục với chuông âm tần', category: 'Frontend', completed: true },
      { id: 't-vn-104-be-eval', title: 'Thiết kế Cambridge Examiner API POST /api/v1/ielts/mock-eval áp dụng đúng thang điểm chấm thi IELTS Band Descriptors', category: 'Backend', completed: true },
      { id: 't-vn-104-qa', title: 'Kiểm thử độ chính xác chấm điểm đối chiếu với các tiêu chuẩn chấm IELTS thực tế (10/10 tests PASS)', category: 'QA', completed: true }
    ]),
    notes: `### 🎯 FULLSTACK QUALITY AUDIT & IMPLEMENTATION EVIDENCE (12/12 GATES PASS)
- **Status**: Completed & Verified ✅
- **UI Mockup**: \`vietphonics-app/src/ui-reference/ai_h_i_tho_i_roleplay_c_ng_s_light_mode/code.html\`
- **Frontend Component**: \`vietphonics-app/src/components/roleplay/IeltsMockExaminer.jsx\` mounted in \`vietphonics-app/src/views/RoleplayView.jsx\` (Examiner Sarah persona, 60s preparation countdown timer with audio chime, persistent 1-minute virtual scratchpad, 120s speech timer, Cambridge 4-criteria Bento report with Band badges, and Vietnamese L1 past-tense omission warning callouts).
- **Scoring Engine**: \`vietphonics-app/src/lib/scoring/ieltsMockExaminer.js\` (Cue cards catalog, standard Cambridge IELTS .25/.75 rounding rules, Vietnamese past-tense omission regular verb detector, and 4-criteria band evaluator).
- **Backend API**: \`GET /api/v1/ielts/cue-cards\`, \`GET /api/v1/ielts/cue-cards/:id\`, \`POST /api/v1/ielts/mock-eval\`, \`GET /api/v1/ielts/mock/latest\` in \`server/index.js\`.
- **Database Table**: \`ielts_mock_examiner_records\` in SQLite \`server/db.js\` with WAL mode.
- **Automated Tests**: \`vietphonics-app/tests/ielts_mock_examiner.test.js\` (10/10 tests passing covering Cambridge rounding formula, cue card structure, L1 past-tense error detection, and SQLite persistence).`
  }
];
