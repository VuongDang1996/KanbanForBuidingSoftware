export const endingSoundsStories = [
  {
    id: 'PRON-101',
    epic_id: 'epic-ending-sounds',
    title: 'Web Audio API Low-Latency In-Browser Audio Streaming: Bộ Thu Âm Trình Duyệt Không Độ Trễ & Hiển Thị Sóng Âm 48kHz',
    persona: 'Người học tiếng Anh cần phản hồi phát âm tức thì ngay khi vừa dứt lời, không chấp nhận độ trễ (latency) gây mất tập trung',
    action: 'thu âm giọng nói trực tiếp qua micro trình duyệt bằng Web Audio API, truyền luồng âm thanh PCM 16kHz/48kHz với độ trễ dưới 80ms và hiển thị dải sóng âm thời gian thực 60fps',
    value: 'loại bỏ hoàn toàn cảm giác lag, tạo cảm giác mượt mà tức thời như đang trò chuyện với giáo viên bản ngữ trực tiếp',
    priority: 'must',
    status: 'in-progress',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pron-101-audio-stream',
        given: 'Học viên bấm giữ nút mic hoặc phím Space',
        when: 'Micro bắt đầu thu âm',
        then: 'Hệ thống khởi tạo Web Audio API AudioContext, lấy dữ liệu từ AnalyserNode (FFT Size 1024) và truyền luồng nhị phân về bộ nhớ đệm với độ trễ dưới 80ms.',
        completed: true
      },
      {
        id: 'ac-pron-101-frontend-design',
        given: 'Giao diện LiveWaveformVisualizer trong VietPhonics App',
        when: 'Học viên đang nói vào micro',
        then: 'Canvas HTML5 vẽ dải sóng âm đối xứng 64 thanh phổ màu gradient Rose sang Sky nhảy múa theo tần số âm thanh thời gian thực ở tốc độ 60 FPS, không gây giật lag luồng UI chính (Zero Jank).',
        completed: true
      },
      {
        id: 'ac-pron-101-backend-design',
        given: '5,000 học viên cùng lúc thu âm và truyền luồng âm thanh',
        when: 'Máy khách kết nối WebSocket Gateway /ws/v1/audio/stream',
        then: 'Sử dụng cụm Node.js / Go WebSocket gateway xử lý đóng gói binary chunk (Opus 48kbps), duy trì 5,000 kết nối đồng thời với lượng RAM tiêu thụ dưới 350MB, P95 độ trễ mạng < 40ms.',
        completed: true
      },
      {
        id: 'ac-pron-101-l1-precision',
        given: 'Đặc trưng âm học của người Việt khi phát âm phụ âm cuối thường có âm lượng nhỏ dần (Decrescendo)',
        when: 'Thu âm âm cuối',
        then: 'Bộ tiền khuếch đại phần mềm (Software Gain Pre-amp) tự động tăng độ nhạy microphone thêm 3dB ở dải tần số cao (3kHz - 8kHz) để bắt trọn âm xát và âm bật hơi.',
        completed: true
      },
      {
        id: 'ac-pron-101-a11y-fallback',
        given: 'Học viên dùng phím Space để điều khiển thu âm',
        when: 'Bấm và giữ phím Space',
        then: 'Tự động kích hoạt Push-To-Talk, nhả phím Space để dừng và nộp bài, kèm âm thanh bip báo hiệu nhẹ nhàng qua Web Audio Synthesizer.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pron-101-fe-worklet', title: 'Xây dựng AudioWorkletProcessor trích xuất luồng PCM 16kHz mono trong luồng nền (Audio Worker Thread)', category: 'Frontend', completed: true },
      { id: 't-pron-101-fe-canvas', title: 'Phát triển component LiveWaveformCanvas.jsx vẽ 64 thanh sóng âm FFT với hiệu ứng đổ bóng neon', category: 'Frontend', completed: true },
      { id: 't-pron-101-be-ws', title: 'Thiết lập WebSocket streaming gateway bằng uWebSockets.js đáp ứng 5,000 kết nối đồng thời', category: 'Backend', completed: true },
      { id: 't-pron-101-be-codec', title: 'Tích hợp bộ giải mã libopus thời gian thực chuyển đổi luồng Opus sang PCM nạp cho GPU pipeline', category: 'Audio/DSP', completed: true },
      { id: 't-pron-101-qa', title: 'Đo kiểm độ trễ Round-Trip Time (RTT) từ lúc ngắt tiếng nói đến khi canvas nhận diện dừng hoàn toàn (<100ms)', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/components/audio/AudioRecordingController.jsx\`
- **Component Architecture**:
  \`\`\`
  <AudioRecordingController onAudioChunk={handleStreamChunk} onRecordComplete={handleDone}>
    <LiveWaveformCanvas analyser={analyserNode} isRecording={isRecording} />
    <PushToTalkButton isRecording={isRecording} volumeLevel={volumeRms} />
    <LatencyBadge latencyMs={measuredLatency} />
  </AudioRecordingController>
  \`\`\`
- **Audio Worklet Pipeline**:
  - \`navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, sampleRate: 16000 } })\`
  - Gắn vào \`audioContext.audioWorklet.addModule('/worklets/pcm-processor.js')\`
  - Gửi binary array \`Float32Array\` sang Web Worker để đóng gói Opus chunk.
- **Stitch Design Tokens**:
  - Mic Button: \`w-24 h-24 rounded-full bg-gradient-to-tr from-rose-600 to-rose-400 shadow-[0_0_40px_rgba(244,63,94,0.45)] ring-4 ring-rose-500/20 active:scale-95 transition-all\`
  - Canvas: \`h-20 w-full max-w-md rounded-2xl bg-slate-900/80 border border-slate-800\`.

---

### 🗄️ BACKEND DESIGN SPECIFICATION
- **WebSocket Protocol Contract**:
  \`\`\`
  WebSocket URL: wss://api.vietphonics.com/ws/v1/audio/stream?token=<JWT>
  
  Client -> Server (Binary Frames):
  - Frame 1: JSON Config { "sampleRate": 16000, "channels": 1, "targetSentenceId": "sent_102" }
  - Frames 2..N: Opus encoded binary audio chunks (20ms frames, ~120 bytes each)
  - Frame End: String "__EOF__"

  Server -> Client (JSON Text Frames):
  - Ping / Pong: Heartbeat every 15s
  - Realtime Telemetry: { "rmsDb": -18.4, "vadActive": true, "latencyMs": 28 }
  - Final Result: { "transcript": "contact", "confidence": 0.96, "audioUrl": "https://r2.../audio.opus" }
  \`\`\`
- **High Concurrency & Load (5,000 Users)**:
  - WebSocket Server sử dụng uWebSockets.js (viết bằng C++), 1 node chịu 10,000 kết nối đồng thời với 400MB RAM.
  - Phân tải qua AWS Network Load Balancer (NLB) Layer 4 với thuật toán Least Connections.`
  },
  {
    id: 'ELSA-201',
    epic_id: 'epic-ending-sounds',
    title: 'Real-Time Phoneme Error Heatmap with Forced Alignment: Bản Đồ Nhiệt Âm Vị Thời Gian Thực & Căn Chỉnh Cưỡng Bức',
    persona: 'Học viên muốn biết chính xác đến từng mili-giây và từng ký tự xem mình phát âm sai ở đâu trong một từ hoặc câu dài',
    action: 'đọc câu tiếng Anh và nhận kết quả tức thì dưới dạng Bản Đồ Nhiệt Âm Vị (Phoneme Heatmap), trong đó từng âm vị được tô màu trực quan: Xanh lá (Đúng ≥85%), Vàng cam (Tạm chấp nhận 60-84%), Đỏ (Phát âm sai <60%)',
    value: 'chỉ ra lỗi sai với độ chính xác đến từng âm tố, loại bỏ hoàn toàn sự hoang mang "tôi nói cả câu mà không biết sai chữ nào"',
    priority: 'must',
    status: 'in-progress',
    size: 'XL',
    points: 13,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-elsa-201-alignment-flow',
        given: 'Học viên hoàn thành bài nói câu mục tiêu',
        when: 'Thuật toán CTC Forced Alignment phân tích âm thanh',
        then: 'Xác định chính xác thời điểm bắt đầu (Start Time ms) và kết thúc (End Time ms) của từng âm vị, tính toán điểm số độ tin cậy ngữ âm và trả về bản đồ nhiệt trong vòng dưới 350ms.',
        completed: true
      },
      {
        id: 'ac-elsa-201-frontend-design',
        given: 'Giao diện PhonemeHeatmapView',
        when: 'Hiển thị kết quả chấm câu',
        then: 'Mỗi từ được hiển thị bằng chữ cái lớn, ngay bên dưới là phiên âm IPA tương ứng được chia thành các ô âm vị (Phoneme Chips) tô màu theo 3 cấp độ (Xanh #10b981, Vàng #f59e0b, Đỏ #ef4444); khi click vào âm đỏ sẽ mở Modal hướng dẫn khẩu hình sửa lỗi.',
        completed: true
      },
      {
        id: 'ac-elsa-201-backend-design',
        given: '5,000 yêu cầu chấm forced alignment diễn ra trong giờ cao điểm',
        when: 'Hệ thống xử lý phân tích âm vị',
        then: 'Sử dụng mô hình ONNX Runtime Whisper-CTC quantize FP16 chạy trên worker GPU, xử lý 300 câu/giây, P95 độ trễ toàn trình < 350ms.',
        completed: true
      },
      {
        id: 'ac-elsa-201-l1-precision',
        given: 'Học viên nuốt âm cuối /t/ trong từ "contact" (nói thành "con-tac")',
        when: 'Bản đồ nhiệt phân tích âm vị cuối',
        then: 'Ký tự /t/ tô màu đỏ rực rỡ kèm nhãn cảnh báo L1: "Lỗi nuốt âm đuôi: Thiếu âm bật hơi /t/ ở cuối từ".',
        completed: true
      },
      {
        id: 'ac-elsa-201-a11y-fallback',
        given: 'Người dùng bị mù màu (Color Blindness)',
        when: 'Bật chế độ Color-Blind Friendly',
        then: 'Các thẻ âm vị bổ sung ký hiệu biểu tượng rõ ràng: Dấu tick tròn (Đúng), Dấu chấm than tam giác (Cần chú ý), Dấu X chéo (Sai), không phụ thuộc vào màu sắc.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-elsa-201-fe-chips', title: 'Xây dựng component PhonemeHeatmapCard.jsx hiển thị từ ngữ và dải ký hiệu IPA tương tác', category: 'Frontend', completed: true },
      { id: 't-elsa-201-fe-popover', title: 'Thiết kế PhonemeDiagnosticModal.jsx hiển thị ảnh động khẩu hình và nút nghe âm thanh lỗi vs chuẩn', category: 'Frontend', completed: true },
      { id: 't-elsa-201-be-ctc', title: 'Tích hợp mô hình Wav2Vec2/Whisper CTC Forced Alignment trích xuất time-aligned phonemes', category: 'AI/DSP', completed: true },
      { id: 't-elsa-201-be-cache', title: 'Cấu hình Redis cache lưu trữ ma trận âm vị target dictionary cho 10,000 từ vựng tiếng Anh phổ biến', category: 'Backend', completed: true },
      { id: 't-elsa-201-qa', title: 'Kiểm thử độ chính xác căn chỉnh thời gian (Boundary Alignment Error < 25ms) trên tập dữ liệu TIMIT', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/components/scoring/PhonemeHeatmapRenderer.jsx\`
- **Component Hierarchy**:
  \`\`\`
  <PhonemeHeatmapRenderer sentence={targetSentence} result={scoringResult}>
    <SentenceOverviewScore overallScore={86} fluencyScore={90} />
    <WordClusterContainer>
      {result.words.map(w => (
        <WordCard key={w.wordId} text={w.text} score={w.score}>
          <IpaPhonemeStrip phonemes={w.phonemes} onPhonemeClick={handleOpenDiagnostic} />
        </WordCard>
      ))}
    </WordClusterContainer>
    <PhonemeDiagnosticDrawer activePhoneme={selectedPhoneme} onClose={closeDrawer} />
  </PhonemeHeatmapRenderer>
  \`\`\`
- **Stitch Design Tokens**:
  - Correct Chip (≥85%): \`bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded-lg font-mono text-sm\`
  - Warning Chip (60-84%): \`bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-1 rounded-lg font-mono text-sm\`
  - Error Chip (<60%): \`bg-rose-500/10 text-rose-400 border border-rose-500/30 px-2 py-1 rounded-lg font-mono text-sm animate-pulse\`
  - Word Card: \`bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center gap-2\`.

---

### 🗄️ BACKEND DESIGN SPECIFICATION
- **REST API Endpoint**:
  \`\`\`http
  POST /api/v1/scoring/phoneme-alignment
  Authorization: Bearer <JWT>
  Content-Type: application/json

  Request Body:
  {
    "audioUrl": "https://r2.vietphonics.com/audio/session_102.opus",
    "targetSentence": "She sells seashells by the seashore",
    "targetIpa": "ʃiː sɛlz ˈsiːʃɛlz baɪ ðə ˈsiːʃɔː"
  }

  Response 200 OK:
  {
    "overallScore": 79.4,
    "durationMs": 2840,
    "words": [
      {
        "word": "seashells",
        "score": 62.0,
        "startMs": 850,
        "endMs": 1420,
        "phonemes": [
          { "symbol": "/s/", "score": 92, "startMs": 850, "endMs": 930 },
          { "symbol": "/iː/", "score": 88, "startMs": 930, "endMs": 1050 },
          { "symbol": "/ʃ/", "score": 45, "startMs": 1050, "endMs": 1180, "errorType": "substituted_with_/s/" },
          { "symbol": "/ɛ/", "score": 85, "startMs": 1180, "endMs": 1260 },
          { "symbol": "/l/", "score": 80, "startMs": 1260, "endMs": 1330 },
          { "symbol": "/z/", "score": 38, "startMs": 1330, "endMs": 1420, "errorType": "omitted_final_consonant" }
        ]
      }
    ]
  }
  \`\`\`
- **Database Schema (PostgreSQL DDL)**:
  \`\`\`sql
  CREATE TABLE phoneme_alignment_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    sentence_text TEXT NOT NULL,
    overall_score NUMERIC(5, 2) NOT NULL,
    word_details JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
  CREATE INDEX idx_alignment_records_user ON phoneme_alignment_records(user_id, created_at DESC);
  \`\`\`
- **5,000 Users Scale Strategy**:
  - GPU Inference được điều phối qua Triton Inference Server với dynamic batching (batch size max 32, max queue delay 10ms) đảm bảo GPU đạt 95% hiệu suất khai thác.`
  },
  {
    id: 'ELSA-204',
    epic_id: 'epic-ending-sounds',
    title: 'Speech Fluency, Natural Pauses & Filler Word Monitor: Giám Sát Độ Lưu Loát, Quãng Nghỉ Tự Nhiên & Từ Đệm Rác',
    persona: 'Người học tiếng Anh giao tiếp hoặc luyện thi nói hay bị ấp úng, chèn quá nhiều từ đệm rác ("uhm", "ah", "like", "you know") và ngập ngừng ngắt quãng sai chỗ',
    action: 'nói các đoạn văn dài và quan sát thước đo độ lưu loát (Fluency Timeline), đếm số lượng từ đệm rác, đo độ dài quãng nghỉ ngắt câu (Pauses) và đo tốc độ nói chuẩn (Words Per Minute - WPM)',
    value: 'rèn luyện nhịp thở và phong thái nói đĩnh đạc tự tin, cải thiện trực tiếp tiêu chí Fluency & Coherence trong các bài thuyết trình và phỏng vấn tiếng Anh',
    priority: 'must',
    status: 'in-progress',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-elsa-204-fluency-calc',
        given: 'Học viên hoàn thành bài nói kéo dài từ 20 đến 60 giây',
        when: 'Hệ thống phân tích phổ âm học đoạn nói',
        then: 'Tính toán chính xác: Tốc độ nói WPM (chuẩn 120-150 WPM), tổng số quãng nghỉ bất thường (>0.6s) và danh sách từ đệm rác (Filler Words).',
        completed: true
      },
      {
        id: 'ac-elsa-204-frontend-design',
        given: 'Giao diện FluencyTrackerView',
        when: 'Render kết quả trên màn hình',
        then: 'Hiển thị thước đo tốc độ WPM Speedometer dạng bán nguyệt, dòng thời gian Timeline trực quan với các điểm ngắt nghỉ tô màu hổ phách, các từ đệm rác tô màu tím Violet có huy hiệu cảnh báo, bảng so sánh với tốc độ người bản xứ.',
        completed: true
      },
      {
        id: 'ac-elsa-204-backend-design',
        given: '5,000 học viên nộp bài phân tích độ lưu loát',
        when: 'Endpoint POST /api/v1/scoring/fluency tiếp nhận dữ liệu',
        then: 'Phân tích âm học dựa trên đặc trưng VAD và nén dữ liệu báo cáo JSON lưu trong Redis với TTL 24h; P95 độ trễ xử lý < 200ms.',
        completed: true
      },
      {
        id: 'ac-elsa-204-l1-precision',
        given: 'Người Việt có thói quen chèn âm đệm tiếng Việt ("ờ", "ừm") khi suy nghĩ từ vựng tiếng Anh',
        when: 'Hệ thống phân tích phổ âm thanh',
        then: 'Nhận diện chính xác các âm đệm L1 tiếng Việt và đưa ra lời khuyên: "Thay vì nói \'ờ\', hãy giữ im lặng 0.5s để chuẩn bị ý tiếp theo - sự im lặng có chủ đích thể hiện sự tự tin".',
        completed: true
      },
      {
        id: 'ac-elsa-204-a11y-fallback',
        given: 'Học viên xem lại các vị trí ngắt nghỉ bất thường',
        when: 'Bấm phím Tab đến từng điểm cảnh báo quãng nghỉ',
        then: 'Hệ thống tự động phát đoạn audio 2 giây xung quanh vị trí đó để học viên tự nghe lại sự ấp úng của mình.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-elsa-204-fe-timeline', title: 'Xây dựng component FluencyTimeline.jsx hiển thị trục thời gian trực quan với các khối lời nói và khoảng lặng', category: 'Frontend', completed: true },
      { id: 't-elsa-204-fe-meter', title: 'Phát triển đồng hồ đo tốc độ WpmSpeedometer.jsx với 3 vùng tốc độ (Chậm <110, Chuẩn 120-150, Quá nhanh >170)', category: 'Frontend', completed: true },
      { id: 't-elsa-204-be-vad', title: 'Triển khai thuật toán Silero VAD phân tích độ dài khoảng lặng và trích xuất nhịp điệu lời nói', category: 'AI/DSP', completed: true },
      { id: 't-elsa-204-be-filler', title: 'Xây dựng bộ từ điển nhận diện âm đệm đa ngôn ngữ (English Fillers + Vietnamese L1 hesitation tokens)', category: 'Backend', completed: true },
      { id: 't-elsa-204-qa', title: 'Kiểm thử với 40 đoạn thu âm có tốc độ nói từ cực chậm (80 WPM) đến cực nhanh (190 WPM)', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/components/scoring/FluencyTimelineTracker.jsx\`
- **Component Hierarchy**:
  \`\`\`
  <FluencyTimelineTracker metrics={fluencyData}>
    <WpmSpeedometer currentWpm={fluencyData.wpm} targetRange={[120, 150]} />
    <TimelineTrack durationMs={fluencyData.durationMs}>
      {fluencyData.segments.map(s => (
        <TimelineSegment key={s.id} type={s.type} startMs={s.startMs} endMs={s.endMs} label={s.label} />
      ))}
    </TimelineTrack>
    <FillerWordList fillers={fluencyData.fillers} onPlayExcerpt={playExcerpt} />
  </FluencyTimelineTracker>
  \`\`\`
- **Stitch Design Tokens**:
  - Normal Speech Segment: \`bg-sky-500/20 border-sky-500/50 text-sky-300 rounded px-2 py-1 text-xs\`
  - Awkward Pause (>0.6s): \`bg-amber-500/20 border border-amber-500 text-amber-400 rounded px-2 py-1 text-xs font-mono\`
  - Filler Word Badge: \`bg-purple-500/20 border border-purple-500 text-purple-300 rounded-full px-2.5 py-0.5 text-xs font-semibold\`.

---

### 🗄️ BACKEND DESIGN SPECIFICATION
- **REST API Endpoint**:
  \`\`\`http
  POST /api/v1/scoring/fluency-analysis
  Authorization: Bearer <JWT>
  Content-Type: application/json

  Request Body:
  {
    "audioUrl": "https://r2.vietphonics.com/audio/session_303.opus",
    "transcript": "Well, um, I think that the project is, you know, quite challenging."
  }

  Response 200 OK:
  {
    "wpm": 118,
    "speechDurationSec": 5.4,
    "totalPauses": 3,
    "awkwardPausesCount": 1,
    "fillerWordsCount": 2,
    "fluencyBandIelts": 6.5,
    "fillersDetected": [
      { "word": "um", "timestampMs": 950, "durationMs": 420 },
      { "word": "you know", "timestampMs": 3100, "durationMs": 580 }
    ],
    "recommendation": "Tốc độ nói 118 WPM ở mức tốt, hãy giảm 2 từ đệm 'um' và 'you know' để đạt chuẩn Band 7.5+."
  }
  \`\`\`
- **High Concurrency (5,000 Users)**:
  - Silero VAD chạy cực nhẹ trên CPU (chỉ tốn ~2MB RAM và 1.5ms mỗi câu 5 giây).
  - Kết quả lưu trong Redis cache với key \`fluency:user:{userId}:{sessionId}\`.`
  },
  {
    id: 'VN-101',
    epic_id: 'epic-ending-sounds',
    title: 'Final Consonant Sound "Ending Sound" Inspector & Acoustical Burst Analyzer: Thanh Tra Âm Cuối & Phân Tích Xung Âm Bật Hơi',
    persona: 'Học viên Việt Nam thường xuyên mắc tật "nuốt sạch âm đuôi" (bỏ quên các âm /t/, /d/, /k/, /g/, /p/, /b/, /s/, /z/, /ks/ ở cuối từ)',
    action: 'phát âm các từ có đuôi phức tạp và quan sát xung sóng âm bật hơi (Acoustical Burst Spike) trên màn hình để kiểm tra xem mình có thực sự nhả âm cuối hay chỉ ngậm miệng lại',
    value: 'trị tận gốc "căn bệnh thế kỷ" của người Việt học tiếng Anh: nói tiếng Anh không có âm đuôi khiến người nước ngoài hoàn toàn không hiểu',
    priority: 'must',
    status: 'in-progress',
    size: 'XL',
    points: 13,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-vn-101-burst-detection',
        given: 'Học viên phát âm từ có phụ âm bật hơi cuối (e.g., "cat", "friend", "six", "desk")',
        when: 'Hệ thống đo đạc xung năng lượng âm học (Transient Burst Energy Spike)',
        then: 'Phát hiện sự hiện diện của xung bật hơi trong khoảng 50ms cuối cùng của từ; nếu tỷ lệ năng lượng xung > 0.35 thì công nhận phát âm rõ âm đuôi.',
        completed: true
      },
      {
        id: 'ac-vn-101-frontend-design',
        given: 'Giao diện EndingSoundInspectorView',
        when: 'Render kết quả phân tích',
        then: 'Hiển thị đồ thị dạng sóng âm đôi (A/B Comparison Oscilloscope): Kênh trên là giọng chuẩn bản ngữ với mũi tên chỉ rõ xung bật hơi /t/, kênh dưới là sóng âm học viên; nếu thiếu xung bật hơi thì vị trí cuối từ nhấp nháy vòng tròn đỏ cảnh báo.',
        completed: true
      },
      {
        id: 'ac-vn-101-backend-design',
        given: '5,000 học viên cùng lúc luyện bài tập âm cuối',
        when: 'Endpoint POST /api/v1/acoustic/ending-burst phân tích',
        then: 'Thuật toán trích xuất đặc trưng âm học Spectral Flux và Zero Crossing Rate (ZCR) chạy trên WebAssembly client-side hoặc worker server trong < 30ms, không gây nghẽn hệ thống.',
        completed: true
      },
      {
        id: 'ac-vn-101-l1-precision',
        given: 'Sự khác biệt giữa âm tắc khép tiếng Việt (Unreleased Stop e.g. "bát", "mát") vs âm tắc nhả tiếng Anh (Released Plosive e.g. "bat", "mat")',
        when: 'Học viên khép miệng không nhả hơi',
        then: 'Giao diện bật cảnh báo giải phẫu học: "Bạn đang khép môi giữ hơi như nói tiếng Việt! Hãy mở miệng và bật một luồng hơi nhỏ qua đầu lưỡi để phát ra âm /t/".',
        completed: true
      },
      {
        id: 'ac-vn-101-a11y-fallback',
        given: 'Học viên muốn nghe chậm lại âm đuôi để bắt chước',
        when: 'Bấm nút "Nghe Chậm 0.5x"',
        then: 'Hệ thống phát lại đoạn âm thanh bản ngữ ở tốc độ 0.5x với thuật toán bảo toàn cao độ (Pitch-preserving Slowdown), giúp đôi tai nghe rõ từng âm /k/ và /s/ trong từ "six".',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-vn-101-fe-scope', title: 'Xây dựng component OscilloscopeDualWaveform.jsx so sánh sóng âm đôi người dùng vs người bản xứ', category: 'Frontend', completed: true },
      { id: 't-vn-101-fe-burst', title: 'Thiết kế mũi tên SVG phát sáng chỉ vào vị trí xung bật hơi Acoustic Burst Indicator', category: 'Frontend', completed: true },
      { id: 't-vn-101-be-dsp', title: 'Xây dựng thuật toán phát hiện xung bật hơi dựa trên đạo hàm năng lượng dE/dt và Zero-Crossing Rate (ZCR)', category: 'Audio/DSP', completed: true },
      { id: 't-vn-101-be-bench', title: 'Tối ưu hóa thư viện xử lý tín hiệu chạy dưới dạng WebAssembly (Rust/C++ Wasm) nhúng thẳng vào trình duyệt', category: 'DevOps/Scale', completed: true },
      { id: 't-vn-101-qa', title: 'Kiểm thử với 100 mẫu phát âm chứa 15 loại cụm phụ âm đuôi phức tạp (/kts/, /sks/, /mps/, /ndz/)', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/components/ending-sounds/EndingSoundInspector.jsx\`
- **Component Hierarchy**:
  \`\`\`
  <EndingSoundInspector targetWord="contact" targetSound="/t/">
    <AudioComparisonOscilloscope
      nativeWaveform={nativeWaveBuffer}
      userWaveform={userWaveBuffer}
      burstLocationMs={userBurstTime}
    />
    <BurstMeterIndicator burstEnergyRatio={0.42} threshold={0.35} />
    <L1MouthCavityDiagram anatomyType="alveolar-plosive" isReleased={isReleased} />
    <SlowPlaybackController speed={0.5} onPlayAudio={playNativeSlow} />
  </EndingSoundInspector>
  \`\`\`
- **Stitch Design Tokens**:
  - Native Waveform: \`stroke-sky-400 fill-sky-500/10 h-16 w-full\`
  - User Waveform: \`stroke-rose-400 fill-rose-500/10 h-16 w-full\`
  - Burst Pin: \`bg-emerald-500 text-slate-950 font-bold px-2 py-0.5 rounded shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-bounce text-[10px]\`.

---

### 🗄️ BACKEND DESIGN SPECIFICATION
- **REST API Endpoint**:
  \`\`\`http
  POST /api/v1/acoustic/ending-burst
  Authorization: Bearer <JWT>
  Content-Type: application/json

  Request Body:
  {
    "word": "contact",
    "targetEndingPhoneme": "/t/",
    "audioBase64": "UklGRi...",
    "sampleRate": 16000
  }

  Response 200 OK:
  {
    "hasReleasedBurst": true,
    "burstTimeMs": 620,
    "burstEnergyRatio": 0.48,
    "threshold": 0.35,
    "isUnreleasedStop": false,
    "phoneticScore": 92,
    "feedbackMessage": "Xuất sắc! Âm bật hơi /t/ cuối từ rất đanh và rõ nét."
  }
  \`\`\`
- **High Concurrency & Low Latency (5,000 Users)**:
  - Thuật toán Wasm biên dịch từ Rust chạy 100% trên client trình duyệt của học viên -> Server backend chịu tải 0% CPU cho việc tính xung bật hơi.`
  }
];
