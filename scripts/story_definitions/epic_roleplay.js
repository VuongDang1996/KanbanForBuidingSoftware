export const roleplayStories = [
  {
    id: 'ELSA-301',
    epic_id: 'epic-roleplay-ielts',
    title: 'Dynamic Scenario AI Speaking Roleplay: Hội Thoại Phản Xạ Trực Tiếp Với Đồng Nghiệp Mỹ (IT Standup)',
    persona: 'Lập trình viên và kỹ sư công nghệ làm việc từ xa (remote) với khách hàng và quản lý người Mỹ',
    action: 'tham gia phiên họp Daily Scrum Standup với nhân vật AI Alex Tech Lead (San Francisco) và trả lời câu hỏi cập nhật tiến độ',
    value: 'luyện phản xạ nói tiếng Anh công sở trong môi trường áp lực nhẹ, nhận phản hồi phát âm và ngữ điệu tức thời mà không sợ bị phán xét',
    priority: 'must',
    status: 'in-progress',
    size: 'XL',
    points: 13,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-elsa-301-dialogue',
        given: 'Phiên họp Daily Standup với Alex Tech Lead',
        when: 'Alex hỏi: "Morning team! Let\'s do a quick round. What did you finish yesterday on the payment gateway, and are there any blockers?"',
        then: 'Học viên bấm nút mic to bản hoặc phím Space để nói câu trả lời, hệ thống phiên âm thời gian thực và Alex phản hồi tự nhiên trong vòng dưới 1.2 giây.',
        completed: true
      },
      {
        id: 'ac-elsa-301-frontend-design',
        given: 'Giao diện phòng hội thoại RoleplayView',
        when: 'Render trên màn hình',
        then: 'Hiển thị ảnh chân dung Alex sắc nét có vòng hào quang gradient công nghệ, hiệu ứng sóng âm spectrum 48kHz WebRTC nhảy múa khi Alex nói, khung chat hội thoại dạng bong bóng hiện đại, nút Push-To-Talk tròn lớn ở chân trang.',
        completed: true
      },
      {
        id: 'ac-elsa-301-backend-design',
        given: '5,000 học viên cùng lúc tham gia các phiên roleplay trực tuyến',
        when: 'Duy trì kết nối âm thanh và nhận diện hội thoại',
        then: 'Sử dụng kiến trúc WebSocket connection pooling với heartbeat 15s; luồng TTS của Alex phát trực tiếp qua Web Speech API trên client hoặc CDN edge cache, máy chủ backend duy trì mức sử dụng RAM dưới 30% cho 5,000 kết nối đồng thời.',
        completed: true
      },
      {
        id: 'ac-elsa-301-l1-precision',
        given: 'Học viên trả lời báo cáo blocker nhưng nuốt âm đuôi /t/ trong từ "blocked"',
        when: 'Alex nghe câu trả lời',
        then: 'Thẻ checklist mục tiêu bên phải cảnh báo: "Báo cáo blocker kỹ thuật rõ âm: Cần phát âm rõ âm đuôi /t/ trong từ \'blocked\'".',
        completed: true
      },
      {
        id: 'ac-elsa-301-a11y-fallback',
        given: 'Học viên muốn đọc phụ đề tiếng Việt',
        when: 'Bật toggle "Phụ đề song ngữ"',
        then: 'Hiển thị bản dịch tiếng Việt mượt mà ngay dưới câu thoại của Alex giúp học viên hiểu trọn vẹn ngữ cảnh công sở.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-elsa-301-fe-ui', title: 'Xây dựng giao diện RoleplayView với ảnh đại diện Alex, dải spectrum WebRTC và khung chat', category: 'Frontend', completed: true },
      { id: 't-elsa-301-fe-mic', title: 'Tích hợp Push-To-Talk toàn cục với phím Space và xử lý chuyển đổi lượt nói (turn-taking)', category: 'Audio/DSP', completed: true },
      { id: 't-elsa-301-be-ws', title: 'Thiết kế WebSocket gateway tối ưu hóa cho 5,000 kết nối đồng thời với Node.js cluster', category: 'Backend', completed: true },
      { id: 't-elsa-301-be-llm', title: 'Tích hợp LLM streaming API với system prompt chuyên sâu về Scrum meeting IT', category: 'Backend', completed: true },
      { id: 't-elsa-301-qa', title: 'Kiểm thử độ trễ phản hồi của AI hội thoại luôn duy trì dưới 1.2 giây', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/views/RoleplayView.jsx\`
- **Component Hierarchy**:
  \`\`\`
  <RoleplayView scenario="it_standup_scrum">
    <AlexAvatarHeader status="speaking" latencyMs={18}>
      <SpectrumIndicator active={isAlexSpeaking} />
    </AlexAvatarHeader>
    <ChatDialogueStream messages={chatHistory} />
    <ObjectiveChecklist items={scrumObjectives} />
    <PushToTalkFooter
      isListening={isUserSpeaking}
      onStartRecording={startRecording}
      onStopRecording={stopRecording}
    />
  </RoleplayView>
  \`\`\`
- **Stitch Design Tokens**:
  - Avatar Halo: \`ring-4 ring-indigo-500/40 shadow-[0_0_30px_rgba(99,102,241,0.5)] rounded-full\`
  - AI Bubble: \`bg-slate-800 text-slate-100 rounded-3xl rounded-tl-sm p-4 border border-slate-700 max-w-lg\`
  - User Bubble: \`bg-rose-600 text-white rounded-3xl rounded-tr-sm p-4 max-w-lg ml-auto\`.

---

### 🗄️ BACKEND DESIGN SPECIFICATION
- **WebSocket Protocol Contract**:
  \`\`\`
  Endpoint: wss://api.vietphonics.com/ws/v1/roleplay/session
  
  Client -> Server:
  {
    "action": "user_speech_chunk",
    "sessionId": "rol_88291",
    "transcript": "Yesterday I finished the checkout gateway and today I will test the webhook.",
    "audioUrl": "https://r2.../turn_01.opus"
  }

  Server -> Client (Stream):
  {
    "type": "agent_response_token",
    "token": "Great",
    "isFinished": false
  }
  {
    "type": "turn_evaluation",
    "phoneticAccuracy": 85.0,
    "unreleasedStopsDetected": ["test"],
    "coherenceScore": 90.0
  }
  \`\`\`
- **Database Schema (PostgreSQL DDL)**:
  \`\`\`sql
  CREATE TABLE roleplay_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    scenario_code VARCHAR(50) NOT NULL,
    total_turns INT NOT NULL DEFAULT 0,
    overall_pronunciation_score NUMERIC(5, 2),
    conversation_transcript JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
  CREATE INDEX idx_roleplay_sessions_user ON roleplay_sessions(user_id, created_at DESC);
  \`\`\`
- **5,000 Users Scale Specs**:
  - Context hội thoại rút gọn lưu trong Redis Hash \`roleplay:context:{sessionId}\` (dung lượng < 3KB).
  - TTFT (Time-to-first-token) duy trì < 450ms qua vLLM engine inference.`
  },
  {
    id: 'ELSA-302',
    epic_id: 'epic-roleplay-ielts',
    title: 'Post-Roleplay Comprehensive Scorecard: Bảng Chỉ Số Toàn Diện Sau Hội Thoại & Phân Tích Lỗi Giao Tiếp',
    persona: 'Người học vừa kết thúc phiên hội thoại 5 phút và cần một bản báo cáo phân tích toàn diện để biết mình làm tốt điều gì và cần cải thiện gì',
    action: 'xem bảng điểm tổng kết (Post-Roleplay Scorecard) đánh giá 5 trụ cột: Điểm Phát Âm, Độ Lưu Loát, Ngữ Pháp, Từ Vựng Công Sở, và Tỷ Lệ Hoàn Thành Mục Tiêu Buổi Họp',
    value: 'biến một cuộc trò chuyện cảm tính thành dữ liệu định lượng cụ thể, lưu lại các câu nói chưa chuẩn vào Ngân Hàng Lỗi để ôn tập',
    priority: 'must',
    status: 'in-progress',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-elsa-302-scorecard-flow',
        given: 'Học viên bấm "Kết thúc buổi họp" sau khi hoàn thành 5 lượt đối thoại',
        when: 'Hệ thống kích hoạt thuật toán tổng hợp đánh giá',
        then: 'Màn hình hiển thị Bảng Chỉ Số Toàn Diện với điểm tổng quan (Overall Performance Score /100) và 5 chỉ số thành phần trong vòng dưới 800ms.',
        completed: true
      },
      {
        id: 'ac-elsa-302-frontend-design',
        given: 'Giao diện PostRoleplayScorecardView',
        when: 'Render trên màn hình',
        then: 'Bố cục Bento grid sang trọng: Điểm tổng kết hình huy hiệu vàng kim ở trung tâm, 5 thẻ chỉ số có thanh tiến trình phân màu, bảng toàn văn hội thoại (Full Transcript) cho phép bấm vào từng câu để nghe lại giọng mình.',
        completed: true
      },
      {
        id: 'ac-elsa-302-backend-design',
        given: '5,000 học viên hoàn thành phiên hội thoại cùng lúc',
        when: 'Gửi yêu cầu tổng hợp điểm số',
        then: 'Thuật toán tính điểm chạy bất đồng bộ qua BullMQ worker, lưu báo cáo vào PostgreSQL và cache trong Redis \`scorecard:{sessionId}\` với thời gian phản hồi < 60ms.',
        completed: true
      },
      {
        id: 'ac-elsa-302-l1-precision',
        given: 'Báo cáo chỉ ra các từ chuyên ngành CNTT học viên phát âm sai',
        when: 'Rà soát danh sách từ vựng',
        then: 'Liệt kê chính xác các từ kỹ thuật hay bị phát âm sai kiểu Việt Nam (e.g., "API" đọc thành "A-pi", "Debug" nuốt âm /g/, "Release" đọc thành "Rì-liu") kèm cách sửa chuẩn.',
        completed: true
      },
      {
        id: 'ac-elsa-302-a11y-fallback',
        given: 'Học viên muốn lưu báo cáo về máy',
        when: 'Bấm nút "Tải Báo Cáo PDF" hoặc "Chia sẻ kết quả"',
        then: 'Hệ thống sinh file ảnh tóm tắt thành tích dạng thẻ card đẹp mắt để học viên dễ dàng chia sẻ lên LinkedIn hoặc nhóm học tập.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-elsa-302-fe-bento', title: 'Xây dựng component PostRoleplayScorecard.jsx với bố cục Bento Grid 5 chỉ số', category: 'Frontend', completed: true },
      { id: 't-elsa-302-fe-transcript', title: 'Thiết kế component TranscriptReviewList.jsx hỗ trợ bấm nghe lại từng câu thoại', category: 'Frontend', completed: true },
      { id: 't-elsa-302-be-eval', title: 'Phát triển module ConversationEvaluator chấm điểm 5 tiêu chuẩn giao tiếp quốc tế', category: 'Backend', completed: true },
      { id: 't-elsa-302-be-cache', title: 'Lưu trữ báo cáo tổng kết trong Redis với TTL 7 ngày hỗ trợ tra cứu nhanh', category: 'Backend', completed: true },
      { id: 't-elsa-302-qa', title: 'Kiểm thử tính nhất quán giữa điểm số hiển thị trên thẻ card và dữ liệu chi tiết trong cơ sở dữ liệu', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/components/roleplay/PostRoleplayScorecard.jsx\`
- **Component Hierarchy**:
  \`\`\`
  <PostRoleplayScorecard sessionData={completedSession}>
    <ScoreHeroBadge score={88} rank="Senior Communicator" />
    <FivePillarsGrid>
      <MetricCard title="Pronunciation" score={85} color="rose" />
      <MetricCard title="Fluency" score={92} color="sky" />
      <MetricCard title="Grammar" score={88} color="emerald" />
      <MetricCard title="IT Vocabulary" score={90} color="indigo" />
      <MetricCard title="Goal Completion" score={100} color="amber" />
    </FivePillarsGrid>
    <DetailedTranscriptReview transcripts={completedSession.turns} onPlayAudio={playTurnAudio} />
    <ActionFooter onRetry={restartSession} onSaveErrorBank={saveWeakWords} />
  </PostRoleplayScorecard>
  \`\`\`
- **Stitch Design Tokens**:
  - Hero Card: \`bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 shadow-2xl\`
  - Pillar Card: \`bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col gap-2\`.

---

### 🗄️ BACKEND DESIGN SPECIFICATION
- **REST API Endpoint**:
  \`\`\`http
  GET /api/v1/roleplay/scorecard/{sessionId}
  Authorization: Bearer <JWT>

  Response 200 OK:
  {
    "sessionId": "rol_88291",
    "overallScore": 88.6,
    "metrics": {
      "pronunciation": 85.0,
      "fluency": 92.0,
      "grammar": 88.0,
      "vocabulary": 90.0,
      "goalCompletion": 100.0
    },
    "technicalVocabularyReviewed": [
      { "term": "API", "pronounced": "/eɪ piː aɪ/", "score": 95 },
      { "term": "blocked", "pronounced": "/blɒkt/", "score": 70, "issue": "weak final /t/" }
    ],
    "strengths": ["Proactive communication style", "Accurate technical terms"],
    "areasForImprovement": ["Enunciate past tense -ed endings (/t/, /d/)"]
  }
  \`\`\`
- **Database Schema**:
  \`\`\`sql
  CREATE TABLE roleplay_scorecards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES roleplay_sessions(id) ON DELETE CASCADE,
    overall_score NUMERIC(5, 2) NOT NULL,
    metrics JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
  \`\`\`
- **5,000 Users Scale Strategy**:
  - Dữ liệu scorecard được lưu trữ vĩnh viễn trên PostgreSQL và cache tại CDN Edge trong 24 giờ.`
  },
  {
    id: 'VN-104',
    epic_id: 'epic-roleplay-ielts',
    title: 'IELTS Speaking Part 1 & 2 AI Mock Examiner for Vietnamese Learners: Giám Khảo AI Thi Thử IELTS Speaking Part 1 & 2',
    persona: 'Thí sinh người Việt đang ôn thi IELTS Speaking cần người chấm thi thử đúng format chuẩn IDP/BC mà không đủ chi phí thuê giáo viên bản ngữ chấm 1:1',
    action: 'thi thử phòng thi ảo với Giám khảo AI Sarah (London), trải nghiệm Part 1 (hỏi đáp ngắn 4 phút) và Part 2 (thẻ gợi ý Cue Card với 1 phút chuẩn bị và 2 phút nói liên tục)',
    value: 'tạo tâm lý phòng thi chân thực 100%, giải tỏa áp lực phòng thi thật và nhận bảng phân tích 4 tiêu chí chấm thi IELTS Speaking chính thức',
    priority: 'must',
    status: 'in-progress',
    size: 'XL',
    points: 13,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-vn-104-exam-flow',
        given: 'Học viên bắt đầu bài thi thử IELTS Speaking Part 2',
        when: 'Giám khảo trao thẻ chủ đề Cue Card (ví dụ: "Describe a piece of technology you find difficult to use")',
        then: 'Hệ thống tự động kích hoạt đồng hồ đếm ngược 60 giây chuẩn bị kèm bảng ghi chú nháp ảo; hết 60s tự động chuyển sang trạng thái thu âm 2 phút nói liên tục.',
        completed: true
      },
      {
        id: 'ac-vn-104-frontend-design',
        given: 'Giao diện phòng thi ảo IeltsMockExamView',
        when: 'Render trên màn hình',
        then: 'Không gian phòng thi phong cách British Council trang nhã, ảnh chân dung giám khảo Sarah với biểu cảm tự nhiên, đồng hồ đếm ngược kỹ thuật số hiển thị sắc nét bằng font JetBrains Mono, bảng ghi chú nháp Cue Card có thể gõ phím mượt mà.',
        completed: true
      },
      {
        id: 'ac-vn-104-backend-design',
        given: '5,000 thí sinh cùng tham gia thi thử trong mùa cao điểm',
        when: 'Hệ thống ghi âm và phân tích bài nói 2 phút',
        then: 'Audio được nén chuẩn Opus lưu trên Cloudflare R2, hàng đợi worker AI chia nhỏ phân đoạn chấm điểm 4 tiêu chí và trả về bảng điểm đầy đủ trong dưới 3 giây.',
        completed: true
      },
      {
        id: 'ac-vn-104-l1-precision',
        given: 'Thí sinh người Việt hay gặp lỗi ngữ pháp về thì quá khứ (Past Tense -ed) trong Part 2',
        when: 'Giám khảo AI chấm tiêu chí Grammatical Range and Accuracy (GRA)',
        then: 'Chỉ ra chi tiết: "Bạn đã quên chia thì quá khứ trong 4 động từ khi kể về kỷ niệm cũ, làm giảm điểm tiêu chí Ngữ pháp xuống Band 6.0".',
        completed: true
      },
      {
        id: 'ac-vn-104-a11y-fallback',
        given: 'Thí sinh muốn đọc lại câu hỏi của giám khảo',
        when: 'Bấm nút "Xem văn bản câu hỏi"',
        then: 'Hiển thị thẻ phụ đề câu hỏi rõ ràng có thể điều chỉnh cỡ chữ lớn (A+), hỗ trợ người khiếm thị hoặc người có khả năng nghe kém.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-vn-104-fe-room', title: 'Xây dựng giao diện IeltsMockRoomView với đồng hồ đếm ngược kỹ thuật số và bảng nháp Cue Card', category: 'Frontend', completed: true },
      { id: 't-vn-104-fe-timer', title: 'Triển khai hook useExamTimer quản lý chính xác 60s chuẩn bị và 120s nói liên tục', category: 'Frontend', completed: true },
      { id: 't-vn-104-be-examiner', title: 'Thiết kế AI Examiner Engine áp dụng đúng thang điểm chấm thi IELTS Speaking Band Descriptors công khai', category: 'Backend', completed: true },
      { id: 't-vn-104-be-queue', title: 'Thiết lập hàng đợi BullMQ xử lý song song các bài nói 2 phút cho 5,000 thí sinh đồng thời', category: 'DevOps/Scale', completed: true },
      { id: 't-vn-104-qa', title: 'Kiểm thử độ chính xác chấm điểm đối chiếu với các cựu giám khảo IELTS thực tế', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/views/IeltsMockExamView.jsx\`
- **Component Hierarchy**:
  \`\`\`
  <IeltsMockExamView examPart={2} topicId="tech_difficult_use">
    <ExaminerVideoFrame examinerName="Sarah" avatarUrl="/avatars/sarah.jpg" isSpeaking={isExaminerSpeaking} />
    <CueCardDrawer isOpen={isPreparationPhase}>
      <CueCardText topic="Describe a piece of technology you find difficult to use" prompts={prompts} />
      <ScratchPadNotepad value={notes} onChange={setNotes} />
      <PreparationCountdownTimer secondsRemaining={prepSeconds} />
    </CueCardDrawer>
    <ExamRecordingFooter isSpeaking={isSpeakingPhase} secondsRemaining={speechSeconds} />
  </IeltsMockExamView>
  \`\`\`
- **Stitch Design Tokens**:
  - Exam Room: \`bg-slate-950 text-slate-100 min-h-screen flex flex-col items-center justify-between p-6\`
  - Cue Card: \`bg-amber-50 text-slate-900 rounded-2xl p-6 shadow-2xl border-2 border-amber-200 max-w-md w-full\`
  - Timer: \`font-mono text-3xl font-black text-rose-500 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800\`.

---

### 🗄️ BACKEND DESIGN SPECIFICATION
- **REST API Endpoint**:
  \`\`\`http
  POST /api/v1/ielts/mock-eval
  Authorization: Bearer <JWT>
  Content-Type: application/json

  Request Body:
  {
    "examPart": 2,
    "topic": "Describe a piece of technology...",
    "audioUrl": "https://r2.vietphonics.com/ielts/session_992.opus",
    "prepNotes": "bought laptop 2 years ago, heavy, battery poor"
  }

  Response 200 OK:
  {
    "overallBand": 6.5,
    "fluencyCoherence": 6.5,
    "lexicalResource": 7.0,
    "grammaticalAccuracy": 6.0,
    "pronunciation": 6.5,
    "examinerComments": "Good vocabulary range relating to technical devices. Work on past tense consistency."
  }
  \`\`\`
- **Database Schema**:
  \`\`\`sql
  CREATE TABLE ielts_mock_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    part_number INT NOT NULL,
    overall_band NUMERIC(2, 1) NOT NULL,
    evaluation_json JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
  \`\`\`
- **High Concurrency (5,000 Users)**:
  - Worker GPU chạy Whisper phân đoạn audio 2 phút song song thành các chunk 30s giúp giảm 50% thời gian suy luận.`
  }
];
