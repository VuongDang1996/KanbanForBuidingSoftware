// Unified Agile backlog for StoryMapper
// Single Master Project: AI English Pronunciation Platform for Vietnamese Users

export const MOSCOW_PRIORITIES = {
  must: {
    id: 'must',
    label: 'Must-Have',
    shortLabel: 'Must',
    color: 'rose',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    text: 'text-rose-400',
    badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    description: 'Critical for MVP. Non-negotiable core functionality.'
  },
  should: {
    id: 'should',
    label: 'Should-Have',
    shortLabel: 'Should',
    color: 'amber',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    description: 'High impact features important for launch, but viable workarounds exist.'
  },
  could: {
    id: 'could',
    label: 'Could-Have',
    shortLabel: 'Could',
    color: 'blue',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    badge: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    description: 'Desirable improvements if time and resources permit.'
  },
  wont: {
    id: 'wont',
    label: "Won't-Have (Now)",
    shortLabel: "Won't",
    color: 'slate',
    bg: 'bg-slate-500/10',
    border: 'border-slate-500/30',
    text: 'text-slate-400',
    badge: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
    description: 'Out of scope for this release; scheduled for future iterations.'
  }
};

export const STATUSES = {
  backlog: {
    id: 'backlog',
    label: 'Backlog',
    icon: 'Inbox',
    color: 'slate',
    bg: 'bg-slate-500/15 text-slate-300 border-slate-600/30',
    dot: 'bg-slate-400'
  },
  todo: {
    id: 'todo',
    label: 'To Do',
    icon: 'CircleDot',
    color: 'blue',
    bg: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    dot: 'bg-sky-400'
  },
  'in-progress': {
    id: 'in-progress',
    label: 'In Progress',
    icon: 'Clock',
    color: 'amber',
    bg: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    dot: 'bg-amber-400 animate-pulse'
  },
  done: {
    id: 'done',
    label: 'Done',
    icon: 'CheckCircle2',
    color: 'emerald',
    bg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    dot: 'bg-emerald-400'
  }
};

export const T_SHIRT_SIZES = {
  XS: { label: 'XS', points: 1, desc: 'Trivial (< 2 hrs)' },
  S: { label: 'S', points: 2, desc: 'Small (half-day)' },
  M: { label: 'M', points: 3, desc: 'Medium (1-2 days)' },
  L: { label: 'L', points: 5, desc: 'Large (3-5 days)' },
  XL: { label: 'XL', points: 8, desc: 'Epic chunk (1-2 sprints)' }
};

export const TASK_CATEGORIES = [
  { id: 'Frontend', label: 'Frontend', color: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30' },
  { id: 'Backend', label: 'Backend', color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' },
  { id: 'Database', label: 'Database', color: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
  { id: 'DevOps', label: 'DevOps', color: 'bg-purple-500/15 text-purple-300 border-purple-500/30' },
  { id: 'QA', label: 'QA', color: 'bg-rose-500/15 text-rose-300 border-rose-500/30' },
  { id: 'Design', label: 'Design', color: 'bg-pink-500/15 text-pink-300 border-pink-500/30' },
  { id: 'Content', label: 'Content', color: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30' }
];

export const EPIC_COLORS = [
  { id: 'indigo', name: 'Indigo', border: 'border-indigo-500', headerBg: 'bg-indigo-950/60', text: 'text-indigo-400', badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
  { id: 'emerald', name: 'Emerald', border: 'border-emerald-500', headerBg: 'bg-emerald-950/60', text: 'text-emerald-400', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  { id: 'violet', name: 'Violet', border: 'border-violet-500', headerBg: 'bg-violet-950/60', text: 'text-violet-400', badge: 'bg-violet-500/20 text-violet-300 border-violet-500/30' },
  { id: 'amber', name: 'Amber', border: 'border-amber-500', headerBg: 'bg-amber-950/60', text: 'text-amber-400', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  { id: 'cyan', name: 'Cyan', border: 'border-cyan-500', headerBg: 'bg-cyan-950/60', text: 'text-cyan-400', badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
  { id: 'rose', name: 'Rose', border: 'border-rose-500', headerBg: 'bg-rose-950/60', text: 'text-rose-400', badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30' }
];

export const VIETNAMESE_PRONUNCIATION_PROJECT = {
  "id": "proj-viet-pronounce",
  "name": "VietPhonics AI — English Pronunciation Platform for Vietnamese Users",
  "description": "Single unified product backlog for building an AI-powered pronunciation & speaking website tailored specifically for Vietnamese ESL learners, IT engineers, and IELTS candidates.",
  "epics": [
    {
      "id": "epic-diagnostic",
      "title": "Diagnostic Speech Assessment & L1 Profiling",
      "description": "Vietnamese mother-tongue error calibration, 3-minute baseline diagnostic screener, and CEFR/IELTS score estimation.",
      "color": "indigo",
      "order": 1
    },
    {
      "id": "epic-ending-sounds",
      "title": "Final Consonants & Core Phoneme Engine",
      "description": "Ending sound inspector (/s, /z, /t, /d, /k, /ks/), forced phoneme alignment, and speech fluency monitoring.",
      "color": "emerald",
      "order": 2
    },
    {
      "id": "epic-prosody",
      "title": "Rhythm, Syllable Stress & Intonation",
      "description": "Anti-tone de-biasing, visual syllable stress weight gauges, schwa /ə/ reduction, and dual pitch curve overlays.",
      "color": "violet",
      "order": 3
    },
    {
      "id": "epic-articulation",
      "title": "Minimal Pairs & Mouth Placement Guide",
      "description": "Vietnamese-tailored minimal pair contrasts (/θ/-/t/, /iː/-/ɪ/), physical mouth instructions in Vietnamese, and 2D vocal tract diagrams.",
      "color": "amber",
      "order": 4
    },
    {
      "id": "epic-roleplay-ielts",
      "title": "Conversational AI & IELTS Speaking",
      "description": "Low-latency AI conversational voice practice, workplace situations (IT standup), and official IELTS Speaking Part 1 & 2 mock examiner.",
      "color": "cyan",
      "order": 5
    },
    {
      "id": "epic-retention",
      "title": "Daily Habit, Spaced Repetition & Monetization",
      "description": "Adaptive 10-minute daily practice path, SM-2 weak sound bank, streak shields, and Pro subscription paywall.",
      "color": "rose",
      "order": 6
    },
    {
      "id": "epic-gamified-3d",
      "title": "3D Voice-Controlled Gamification & Adventure Quests",
      "description": "Web-based 3D world (Three.js/WebGL) where learners control avatar movement, leap over obstacles, cast spells, and battle bosses using accurate English pronunciation.",
      "color": "amber",
      "order": 7
    },
    {
      "id": "epic-backend-infrastructure",
      "title": "Backend, Database & Cloud Architecture (Scale to 5,000 Paid Users)",
      "description": "Production-ready PostgreSQL database schema, async GPU worker queues (FastAPI + Redis), VNPay/MoMo/Stripe subscription billing, and cloud audio storage for 5,000 monthly paid subscribers.",
      "color": "emerald",
      "order": 8
    },
    {
      "id": "epic-advanced-ai-lab",
      "title": "Advanced AI Speech Lab (Research-Backed 2026 Features)",
      "description": "Next-gen features from 2025-2026 CAPT research & competitors (ELSA, BoldVoice, Speechace): Golden Speaker voice cloning, webcam lip tracking, live F1/F2 vowel chart, LLM articulatory coach with memory, connected speech lab, intelligibility scoring.",
      "color": "violet",
      "order": 9
    }
  ],
  "stories": [
    {
      "id": "PRON-101",
      "epicId": "epic-ending-sounds",
      "title": "Web Audio API Low-Latency In-Browser Audio Streaming: Bộ Thu Âm Trình Duyệt Không Độ Trễ & Hiển Thị Sóng Âm 48kHz",
      "persona": "Người học tiếng Anh cần phản hồi phát âm tức thì ngay khi vừa dứt lời, không chấp nhận độ trễ (latency) gây mất tập trung",
      "action": "thu âm giọng nói trực tiếp qua micro trình duyệt bằng Web Audio API, truyền luồng âm thanh PCM 16kHz/48kHz với độ trễ dưới 50ms và hiển thị dải sóng âm thời gian thực 60fps",
      "value": "loại bỏ hoàn toàn cảm giác giật lag, tạo trải nghiệm mượt mà tức thời như đang đối thoại trực tiếp với giáo viên bản xứ",
      "priority": "must",
      "status": "done",
      "size": "L",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-pron-101-worklet-init",
          "given": "Học viên cấp quyền sử dụng microphone trong trình duyệt",
          "when": "AudioContext được khởi tạo",
          "then": "Hệ thống nạp AudioWorkletProcessor trích xuất luồng mẫu PCM 16kHz Float32 mono với buffer size 1024 mẫu và độ trễ ngắt âm thanh dưới 50ms.",
          "completed": true
        },
        {
          "id": "ac-pron-101-canvas-render",
          "given": "AudioContext đang nhận luồng dữ liệu micro",
          "when": "AnalyserNode tính toán biến đổi Fourier nhanh (FFT Size 1024)",
          "then": "LiveWaveformCanvas vẽ 64 thanh phổ tần số đối xứng dạng sóng âm neon gradient từ Sky-400 sang Rose-500 ở tốc độ ổn định 60 FPS mà không làm rớt khung hình (Zero Frame Drop).",
          "completed": true
        },
        {
          "id": "ac-pron-101-push-to-talk",
          "given": "Học viên nhấn và giữ phím Space hoặc nút Mic tròn ở trung tâm",
          "when": "Sự kiện keydown / mousedown kích hoạt",
          "then": "Trạng thái chuyển sang recording ngay lập tức, nút mic mở rộng viền phát sáng pulsating ring, và tự động dừng thu âm khi nhả phím (keyup / mouseup).",
          "completed": true
        },
        {
          "id": "ac-pron-101-mic-denied-fallback",
          "given": "Trình duyệt từ chối quyền microphone hoặc không tìm thấy thiết bị thu âm",
          "when": "Học viên cố gắng bấm nút thu âm",
          "then": "Hiển thị hộp thoại MicPermissionDeniedModal hướng dẫn bật lại quyền mic trên Chrome/Safari kèm nút \"Kiểm tra lại thiết bị\".",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pron-101-worklet",
          "title": "Xây dựng pcm-recorder-processor.js trong AudioWorklet thread tách biệt hoàn toàn khỏi Main UI thread",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-101-canvas",
          "title": "Phát triển component LiveWaveformCanvas.jsx sử dụng requestAnimationFrame và 2D Canvas context",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-101-ptt",
          "title": "Thiết lập listener bàn phím toàn cục xử lý Push-to-Talk bằng phím Space với bộ đệm chống dội phím (Debounce)",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-101-fallback",
          "title": "Xây dựng modal cảnh báo MicPermissionModal.jsx với đồ họa minh họa các bước cấp quyền micro",
          "category": "Frontend",
          "completed": true
        }
      ],
      "notes": "### 🎨 PURE FRONTEND DESIGN SPECIFICATION\n- **Phân loại**: Pure Frontend Audio Pipeline & Canvas 2D\n- **UI Mockup**: `vietphonics-app/src/ui-reference/acoustic_precision_light/code.html`\n- **Frontend Component**: `vietphonics-app/src/components/audio/AudioRecordingController.jsx`\n\n#### 📐 Component Hierarchy & State\n```\n<AudioRecordingController onAudioData={handleChunk} onStop={handleRecordingEnd}>\n  <LiveWaveformCanvas \n    analyserNode={analyserNode} \n    isRecording={isRecording} \n    barCount={64} \n  />\n  <PushToTalkButton \n    isRecording={isRecording} \n    volumeRms={currentVolumeRms} \n    hotkey=\"Space\" \n  />\n  <MicPermissionModal \n    isOpen={hasPermissionError} \n    onRetry={requestMicAccess} \n  />\n</AudioRecordingController>\n```\n\n#### 🎵 AudioWorklet Architecture\n- `navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, sampleRate: 16000 } })`\n- AudioWorklet tách riêng khỏi main event loop:\n```javascript\nclass PCMRecorderProcessor extends AudioWorkletProcessor {\n  process(inputs) {\n    const input = inputs[0];\n    if (input && input[0]) {\n      this.port.postMessage(input[0]); // Float32Array 128 samples\n    }\n    return true;\n  }\n}\n```\n\n#### 🎨 Design Tokens & Visual Specs\n- **Mic Button**: `w-24 h-24 rounded-full bg-gradient-to-tr from-rose-600 to-rose-400 shadow-[0_0_40px_rgba(244,63,94,0.45)] ring-4 ring-rose-500/20 active:scale-95 transition-all`.\n- **Waveform Canvas**: `h-24 w-full max-w-lg rounded-2xl bg-slate-900/90 border border-slate-800 shadow-inner`.\n- **Canvas Rendering**: 64 bars đối xứng trục tâm, màu gradient `#38bdf8` (Sky-400) đến `#f43f5e` (Rose-500).",
      "createdAt": "2026-09-30T17:08:15.377Z"
    },
    {
      "id": "PRON-201",
      "epicId": "epic-articulation",
      "title": "Interactive 2D Anatomical Lip & Tongue Articulation Guide: Mô Phỏng Thiết Diện Giải Phẫu Cắt Dọc 2D",
      "persona": "Người học tiếng Anh muốn thấy rõ cấu tạo bên trong vòm miệng khi phát âm các âm khó",
      "action": "chọn âm vị mục tiêu và tương tác với đồ họa giải phẫu 2D Sagittal Section",
      "value": "nhìn thấy rõ vị trí đầu lưỡi, độ nâng vòm miệng mềm (velum), độ hạ hàm dưới và luồng hơi thoát ra, kèm 3 thanh trượt điều chỉnh sinh học để hiểu bản chất cơ thể học khi phát âm",
      "priority": "must",
      "status": "in-progress",
      "size": "XL",
      "points": 13,
      "acceptanceCriteria": [
        {
          "id": "ac-pron-201-sagittal",
          "given": "Học viên chọn âm vị xát kẹp lưỡi /θ/ (think)",
          "when": "Thiết diện cắt dọc Sagittal 2D hiển thị",
          "then": "Đồ họa SVG kích thước 760x500 hiển thị vòm miệng, răng cửa trên dưới, và cơ lưỡi (màu Coral #fb7185) với đầu lưỡi thò ra kẹp giữa hai răng cửa; luồng khí Cyan (#38bdf8) thổi qua kẽ răng.",
          "completed": true
        },
        {
          "id": "ac-pron-201-frontend-design",
          "given": "3 thanh trượt điều chỉnh sinh học: Độ nâng lưỡi (Tongue Elevation), Độ hạ hàm (Jaw Drop), Áp lực hơi (Airflow Pressure)",
          "when": "Học viên kéo các thanh slider",
          "then": "Khối cơ lưỡi và xương hàm dưới trên đồ họa SVG dịch chuyển tức thời theo thời gian thực (real-time SVG coordinate transform), không bị giật lag, đạt tốc độ 60 FPS.",
          "completed": true
        },
        {
          "id": "ac-pron-201-backend-design",
          "given": "5,000 học viên cùng lúc tương tác với mô hình giải phẫu 2D",
          "when": "Tải dữ liệu tọa độ giải phẫu của các âm vị",
          "then": "Dữ liệu vector SVG được phân phối qua CDN Edge cache tĩnh (Cache-Control: public, max-age=31536000), 0% CPU máy chủ backend.",
          "completed": true
        },
        {
          "id": "ac-pron-201-l1-precision",
          "given": "Học viên muốn so sánh cấu âm âm /θ/ vs âm /t/ tiếng Việt",
          "when": "Bật toggle \"So Sánh Với Tiếng Việt\"",
          "then": "Mô hình SVG vẽ đường bóng mờ vị trí lưỡi tiếng Việt (đầu lưỡi áp vào chân răng) đối chiếu với vị trí chuẩn tiếng Anh (đầu lưỡi thò ra ngoài 2 răng).",
          "completed": true
        },
        {
          "id": "ac-pron-201-a11y-fallback",
          "given": "Người dùng sử dụng bàn phím",
          "when": "Tab vào các thanh slider",
          "then": "Hỗ trợ phím mũi tên trái/phải để tăng giảm giá trị từng nấc 1 đơn vị, có thuộc tính aria-valuenow rõ ràng.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pron-201-fe-svg",
          "title": "Thiết kế đồ họa SVG giải phẫu cắt dọc 2D Sagittal view 760x500 với các đường cong Bézier động",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-201-fe-sliders",
          "title": "Tích hợp 3 thanh trượt điều khiển: tongueElev, jawDrop, airPressure đồng bộ tọa độ SVG",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-201-be-static",
          "title": "Xuất bản và cấu hình CDN lưu trữ tệp tọa độ cấu âm IPA cho 44 âm vị tiếng Anh",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-pron-201-fe-compare",
          "title": "Xây dựng chế độ so sánh bóng mờ L1 Ghost Overlay trên canvas SVG",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-201-qa",
          "title": "Kiểm tra tính chính xác về mặt giải phẫu cơ miệng theo tài liệu ngữ âm học đại học Oxford",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/views/MouthAnatomyView.jsx`\n- **Component Hierarchy**:\n  ```\n  <MouthAnatomyView phoneme=\"/θ/\">\n    <SagittalCanvasSvg width={760} height={500}>\n      <VocalTractOutline />\n      <AnimatedTonguePath elevation={sliderState.tongueElev} shape={phonemeData.tongueShape} />\n      <AirflowParticleStream pressure={sliderState.airPressure} />\n      <AnatomicalLabels teeth=\"Incisors\" palate=\"Hard Palate\" velum=\"Soft Palate\" />\n    </SagittalCanvasSvg>\n    <BioFeedbackSliders\n      tongueElevation={sliderState.tongueElev}\n      jawDrop={sliderState.jawDrop}\n      airPressure={sliderState.airPressure}\n      onChange={handleSliderChange}\n    />\n  </MouthAnatomyView>\n  ```\n- **Stitch Design Tokens**:\n  - Tongue Muscle: `fill-rose-500/80 stroke-rose-400 stroke-2`\n  - Airflow Stream: `stroke-sky-400/80 stroke-dashed animate-pulse`\n  - Hard Palate: `fill-slate-800 stroke-slate-600`.\n\n---\n\n### 🗄️ BACKEND DESIGN SPECIFICATION\n- **REST API Endpoint**:\n  ```http\n  GET /api/v1/phonetics/anatomy-svg/{phonemeSymbol}\n  Cache-Control: public, max-age=31536000\n\n  Response 200 OK:\n  {\n    \"symbol\": \"/θ/\",\n    \"classification\": \"Voiceless dental fricative\",\n    \"svgPathData\": {\n      \"tongueResting\": \"M 200 350 C 220 300, 280 250, 310 210 ...\",\n      \"velumPosition\": \"raised\",\n      \"jawDropDefault\": 18\n    },\n    \"vietnameseL1Contrast\": \"Tiếng Việt không có âm kẹp răng. Người Việt hay nhầm với âm /t/ hoặc /th/ (âm thờ tiếng Việt).\"\n  }\n  ```\n- **High Concurrency (5,000 Users)**:\n  - Tệp SVG và tọa độ được CDN Edge Cache phân phối với hit ratio > 99.8%.",
      "createdAt": "2026-09-30T17:08:15.377Z"
    },
    {
      "id": "ELSA-103",
      "epicId": "epic-diagnostic",
      "title": "Predicted IELTS & CEFR Speaking Band Estimator: Bảng Ước Tính Điểm IELTS Speaking & Khung CEFR",
      "persona": "Người học tiếng Anh chuẩn bị thi IELTS (mục tiêu Band 6.5 - 8.0) hoặc cần chứng chỉ CEFR (B1 - C1) cho công việc",
      "action": "quan sát con số dự báo điểm IELTS Speaking và trình độ CEFR được cập nhật động sau mỗi bài nói",
      "value": "biết rõ mình đang ở mức nào trên thang đo quốc tế, loại bỏ cảm giác học mù quáng không định lượng được kết quả",
      "priority": "must",
      "status": "done",
      "size": "L",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-elsa-103-gauge-display",
          "given": "Học viên đã làm tối thiểu 1 bài sàng lọc hoặc 5 bài luyện âm",
          "when": "Mở trang Dashboard",
          "then": "Hiển thị đồng hồ đo bán nguyệt với con số dự báo IELTS Speaking (ví dụ 6.5 Band) và thẻ CEFR (ví dụ B2) với chữ số to bản, rõ ràng.",
          "completed": true
        },
        {
          "id": "ac-elsa-103-radar-breakdown",
          "given": "Học viên bấm vào thẻ điểm IELTS để xem chi tiết",
          "when": "Hộp thoại phân tích mở ra",
          "then": "Hiển thị biểu đồ Radar 4 tiêu chí chuẩn khảo thí: Pronunciation (Phát âm), Fluency & Coherence (Lưu loát), Lexical Resource (Từ vựng), Grammatical Range (Ngữ pháp).",
          "completed": true
        },
        {
          "id": "ac-elsa-103-target-gap",
          "given": "Học viên đặt mục tiêu thi đạt 7.5 Band",
          "when": "Hệ thống so sánh điểm hiện tại (6.5) với mục tiêu (7.5)",
          "then": "Chỉ ra rõ ràng: \"Bạn cần cải thiện +1.0 Band ở tiêu chí Pronunciation (đặc biệt là âm đuôi và ngữ điệu câu hỏi) để chạm mốc mục tiêu\".",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-103-gauge",
          "title": "Xây dựng component IeltsGaugeMeter.jsx dạng SVG bán nguyệt với kim chỉ số mượt mà",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-103-radar",
          "title": "Xây dựng biểu đồ Radar SVG hiển thị 4 tiêu chí chấm thi IELTS Speaking",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-103-algo",
          "title": "Viết thuật toán hồi quy phi tuyến IeltsScoreMapping chuyển đổi điểm âm vị sang thang 0-9.0",
          "category": "AI/DSP",
          "completed": true
        },
        {
          "id": "t-103-qa",
          "title": "Kiểm thử với 20 bộ điểm mẫu đối chiếu với bảng quy đổi chính thức của Cambridge",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎯 FULLSTACK FEATURE SPECIFICATION\n- **Phân loại**: Full-stack Feature (Scoring Algorithm + Visual SVG Dashboard)\n- **UI Mockup**: `vietphonics-app/src/ui-reference/t_ng_quan_l_tr_nh_10_ph_t_light_mode/code.html`\n- **Frontend Component**: `vietphonics-app/src/components/dashboard/IeltsBandEstimator.jsx`\n\n#### 🎨 Frontend Visual Specs\n- **Score Meter**: Đồng hồ bán nguyệt SVG gradient từ `#f43f5e` (Band 4.0) -> `#f59e0b` (Band 6.0) -> `#10b981` (Band 8.0+).\n- **Typography**: Con số điểm hiển thị font JetBrains Mono `text-4xl font-extrabold`.\n- **4 Cột Tiêu Chí**: Thẻ con hiển thị điểm từng phần kèm nhãn đánh giá: FC, PR, LR, GRA.\n\n#### 🗄️ Backend Mapping Formula\n```javascript\n// Non-linear mapping from phonetic accuracy to IELTS Band\nexport function mapPhoneticScoreToIelts(phoneticAcc, fluencyWpm, intonationScore) {\n  const pScore = phoneticAcc * 0.45 + intonationScore * 0.35 + Math.min(fluencyWpm / 140, 1.0) * 100 * 0.20;\n  if (pScore >= 92) return { band: 8.5, cefr: 'C2' };\n  if (pScore >= 84) return { band: 7.5, cefr: 'C1' };\n  if (pScore >= 74) return { band: 6.5, cefr: 'B2' };\n  if (pScore >= 62) return { band: 5.5, cefr: 'B1' };\n  return { band: 4.5, cefr: 'A2' };\n}\n```",
      "createdAt": "2026-09-30T17:26:08.290Z"
    },
    {
      "id": "ELSA-201",
      "epicId": "epic-ending-sounds",
      "title": "Real-Time Phoneme Error Heatmap with Forced Alignment: Bản Đồ Nhiệt Âm Vị Thời Gian Thực & Căn Chỉnh Cưỡng Bức",
      "persona": "Học viên muốn biết chính xác đến từng mili-giây và từng ký tự xem mình phát âm sai ở đâu trong một từ hoặc câu dài",
      "action": "đọc câu tiếng Anh và nhận kết quả tức thì dưới dạng Bản Đồ Nhiệt Âm Vị (Phoneme Heatmap), trong đó từng âm vị được tô màu trực quan: Xanh lá (Đúng ≥85%), Vàng cam (Tạm chấp nhận 60-84%), Đỏ (Phát âm sai <60%)",
      "value": "chỉ ra lỗi sai với độ chính xác đến từng âm tố, loại bỏ hoàn toàn sự hoang mang \"tôi nói cả câu mà không biết sai chữ nào\"",
      "priority": "must",
      "status": "done",
      "size": "XL",
      "points": 13,
      "acceptanceCriteria": [
        {
          "id": "ac-elsa-201-ctc-alignment",
          "given": "Bản ghi âm giọng nói của học viên đã được gửi lên hệ thống",
          "when": "Mô hình CTC Forced Alignment xử lý",
          "then": "Trả về danh sách từng từ và các âm vị IPA con tương ứng kèm mốc thời gian (startMs, endMs) và điểm tin cậy độ chính xác (0-100%).",
          "completed": true
        },
        {
          "id": "ac-elsa-201-heatmap-chips",
          "given": "Dữ liệu điểm số âm vị được trả về máy khách",
          "when": "PhonemeHeatmapRenderer hiển thị trên màn hình",
          "then": "Từng âm vị được bao bọc trong thẻ chip có màu: Xanh lá (≥85%), Vàng hổ phách (60-84%), Đỏ hồng (<60% kèm hiệu ứng viền phát sáng cảnh báo).",
          "completed": true
        },
        {
          "id": "ac-elsa-201-phoneme-popover",
          "given": "Học viên click vào một âm vị có điểm dưới 60% (ví dụ âm /t/ bị nuốt trong từ \"contact\")",
          "when": "Drawer chẩn đoán mở ra",
          "then": "Hiển thị ký hiệu IPA to bản, mô tả khẩu hình sai thường gặp của người Việt và nút \"Nghe lại âm này\".",
          "completed": true
        },
        {
          "id": "ac-elsa-201-colorblind-mode",
          "given": "Người dùng bật chế độ hỗ trợ thị giác trong phần Cài đặt",
          "when": "Bản đồ nhiệt hiển thị",
          "then": "Bổ sung các icon hình học (Tick tròn, Chấm than, Dấu X) bên cạnh màu sắc để đảm bảo khả năng tiếp cận WCAG 2.1 AA.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-elsa-201-chips",
          "title": "Xây dựng component PhonemeHeatmapRenderer.jsx render danh sách từ và âm vị theo flex-wrap",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-201-drawer",
          "title": "Thiết kế PhonemeQuickDiagnosticDrawer.jsx hiển thị giải thích âm học và bài tập khắc phục nhanh",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-201-ctc-api",
          "title": "Xây dựng endpoint POST /api/v1/scoring/phoneme-alignment tích hợp mô hình Wav2Vec2-CTC",
          "category": "AI/Backend",
          "completed": true
        },
        {
          "id": "t-elsa-201-cache",
          "title": "Lưu trữ ma trận âm vị target dictionary vào Redis cache giảm thời gian trích xuất xuống < 5ms",
          "category": "Backend",
          "completed": true
        }
      ],
      "notes": "### 🎯 FULLSTACK FEATURE SPECIFICATION\n- **Phân loại**: Full-stack AI Feature (Interactive Heatmap Chips + CTC Forced Alignment)\n- **UI Mockup**: `vietphonics-app/src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html`\n- **Frontend Component**: `vietphonics-app/src/components/scoring/PhonemeHeatmapRenderer.jsx`\n\n#### 🎨 Frontend Heatmap Layout\n```\n+---------------------------------------------------------------+\n| Câu: \"She sells seashells by the seashore\"                    |\n| [She]       [sells]     [sea-shells]      [by]  [the]  [seashore] |\n| ʃ   iː      s  ɛ  l  z   s  iː  ʃ  ɛ  l  z                         |\n| [●] [●]    [●][●][●][▲] [●] [●][▲][●][●][✕]                       |\n+---------------------------------------------------------------+\n```\n- **Chip Tokens**:\n  - Green (≥85%): `bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded-lg font-mono text-sm`\n  - Amber (60-84%): `bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-1 rounded-lg font-mono text-sm`\n  - Red (<60%): `bg-rose-500/10 text-rose-400 border border-rose-500/30 px-2 py-1 rounded-lg font-mono text-sm animate-pulse`\n\n#### 🗄️ Backend API Contract\n```http\nPOST /api/v1/scoring/phoneme-alignment\nAuthorization: Bearer <JWT>\nContent-Type: application/json\n\n{\n  \"audioUrl\": \"https://r2.vietphonics.com/audio/session_102.opus\",\n  \"targetSentence\": \"She sells seashells by the seashore\"\n}\n```\n- **Response**: Trả về cấu trúc JSON phân cấp Word -> Phoneme array với các trường `symbol`, `score`, `startMs`, `endMs`, `errorType`.\n- **Database Table**: `phoneme_alignment_records` (PostgreSQL) lưu vết để tính toán tiến bộ lịch sử.",
      "createdAt": "2026-09-30T17:26:08.290Z"
    },
    {
      "id": "ELSA-202",
      "epicId": "epic-prosody",
      "title": "Syllable Stress & Capitalized Word Emphasis Evaluator: Đánh Giá Trọng Âm Từ & Nhấn Từ Trọng Tâm",
      "persona": "Người học tiếng Anh thường đọc từ đa âm tiết bằng giọng đều đều không trọng âm hoặc đánh sai trọng âm (e.g. đọc \"PHOtograph\" thành \"phoTOgraph\")",
      "action": "phát âm các từ đa âm tiết và quan sát kích thước các bong bóng âm tiết (Syllable Bubbles): âm tiết mang trọng âm hiển thị to gấp đôi, có cao độ cao hơn và ngân dài hơn",
      "value": "nắm vững bản chất 3 yếu tố của trọng âm tiếng Anh (To hơn - Dài hơn - Cao hơn), loại bỏ hiện tượng nói tiếng Anh bằng ngữ điệu phẳng như tiếng Việt",
      "priority": "must",
      "status": "in-progress",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-elsa-202-stress-bubbles",
          "given": "Học viên phát âm từ đa âm tiết (e.g., \"pho-TO-gra-pher\", \"COM-pu-ter\")",
          "when": "Hệ thống đo đạc năng lượng và thời lượng từng âm tiết",
          "then": "Dải bong bóng âm tiết (Syllable Bubbles) hiển thị: Âm tiết trọng âm chính có đường kính 64px màu tím Indigo-500 phát sáng, các âm tiết phụ chỉ có kích thước 32px màu xám mờ.",
          "completed": true
        },
        {
          "id": "ac-elsa-202-three-pillars",
          "given": "Học viên bấm vào âm tiết trọng âm để xem chi tiết",
          "when": "Bảng 3 Cột Âm Học (Three Pillars) hiển thị",
          "then": "So sánh trực tiếp 3 chỉ số giữa âm nhấn và âm lướt: Độ dài thời gian (Duration ms - gấp 2-2.5 lần), Độ to (Volume dB - cao hơn 4-6dB), và Cao độ (Pitch Hz).",
          "completed": true
        },
        {
          "id": "ac-elsa-202-l1-tone-warning",
          "given": "Người Việt có thói quen đánh \"dấu sắc\" vào trọng âm tiếng Anh (e.g. đọc \"pencil\" thành \"pén-xì\")",
          "when": "Cao độ tăng vọt nhưng thời lượng phát âm quá ngắn (<120ms)",
          "then": "Bật cảnh báo sư phạm: \"Bạn đang thêm dấu sắc tiếng Việt! Trọng âm tiếng Anh cần phải ngân dài và mở to miệng, không chỉ đơn thuần là đẩy cao giọng\".",
          "completed": true
        },
        {
          "id": "ac-elsa-202-keyboard-isolate",
          "given": "Học viên sử dụng bàn phím số 1, 2, 3, 4",
          "when": "Bấm phím số tương ứng với vị trí âm tiết",
          "then": "Hệ thống tự động cô lập và phát riêng file audio của âm tiết đó (Isolated Syllable Playback) để luyện khả năng thẩm âm đối chiếu.",
          "completed": false
        }
      ],
      "technicalTasks": [
        {
          "id": "t-elsa-202-fe-bubbles",
          "title": "Xây dựng component SyllableBubbleVisualizer.jsx với hiệu ứng bong bóng co giãn theo độ lớn trọng âm",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-202-fe-pillars",
          "title": "Thiết kế biểu đồ 3 cột Energy-Duration-Pitch so sánh tỷ lệ giữa âm nhấn và âm lướt",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-202-fe-slice",
          "title": "Tích hợp bộ cắt audio Web Audio API phát riêng từng âm tiết theo phím số 1-4",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-202-qa",
          "title": "Kiểm thử với các cặp từ hoán đổi trọng âm theo từ loại (e.g. REcord danh từ vs reCORD động từ)",
          "category": "QA",
          "completed": false
        }
      ],
      "notes": "### 🎨 PURE FRONTEND DESIGN SPECIFICATION\n- **Phân loại**: Pure Frontend UI/UX Component (Syllable Bubbles & Three Pillars)\n- **UI Mockup**: `vietphonics-app/src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html`\n- **Frontend Component**: `vietphonics-app/src/components/prosody/SyllableStressVisualizer.jsx`\n\n#### 📐 Layout & Bubble Visual Structure\n```\n+-------------------------------------------------------------+\n| Từ: \"pho-TO-gra-phy\"                                        |\n|                                                             |\n|    (pho)       ((  TO  ))       (gra)        (phy)          |\n|    32px           64px          32px         32px           |\n|    Mờ đục     Tím Neon Sáng     Mờ đục       Mờ đục         |\n|   120ms          280ms          110ms        130ms          |\n+-------------------------------------------------------------+\n| BẢNG 3 TRỤ CỘT TRỌNG ÂM:                                    |\n| [ Thời Lượng: 2.3x ]  [ Độ To: +5.2dB ]  [ Cao Độ: +42Hz ]   |\n+-------------------------------------------------------------+\n```\n\n#### 🎨 Design Tokens & Dynamic Styling\n- **Stressed Bubble**:\n  `w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-extrabold text-xl shadow-[0_0_30px_rgba(99,102,241,0.5)] border-2 border-indigo-300 flex items-center justify-center animate-pulse`\n- **Unstressed Bubble**:\n  `w-12 h-12 rounded-full bg-slate-800 text-slate-400 font-medium text-sm border border-slate-700 flex items-center justify-center`.",
      "createdAt": "2026-09-30T17:26:08.290Z"
    },
    {
      "id": "ELSA-203",
      "epicId": "epic-prosody",
      "title": "Suprasegmental Pitch & Sentence Intonation Melody Tracker: Theo Dõi Đường Cong Cao Độ & Giai Điệu Ngữ Điệu Câu",
      "persona": "Người học khi nói tiếng Anh thường phát âm cả câu như một đường thẳng tắp, không có ngữ điệu lên giọng (Rising) hay xuống giọng (Falling) tự nhiên",
      "action": "nói các câu giao tiếp thực tế và quan sát đường cong cao độ giọng nói thời gian thực (Real-Time Pitch Contour Curve) chạy đè lên đường cong mẫu của người bản xứ",
      "value": "làm chủ giai điệu câu tiếng Anh (Sentence Melody): biết lên giọng ở câu hỏi Yes/No, hạ giọng ở câu trần thuật và nhấn đúng từ khóa truyền tải cảm xúc",
      "priority": "must",
      "status": "todo",
      "size": "XL",
      "points": 13,
      "acceptanceCriteria": [
        {
          "id": "ac-elsa-203-pitch-contour",
          "given": "Học viên nói một câu hội thoại hoàn chỉnh",
          "when": "Bộ phân tích âm học trích xuất cao độ F0 liên tục sau mỗi khung hình 10ms",
          "then": "Đồ thị SVG vẽ đường cong Bezier mượt mà so sánh đồng thời 2 đường: Đường xanh Sky-400 (Giọng chuẩn bản xứ) và đường vàng Amber-400 (Giọng học viên).",
          "completed": false
        },
        {
          "id": "ac-elsa-203-terminal-intonation",
          "given": "Câu nói thuộc thể loại câu hỏi Yes/No (e.g., \"Are you ready?\")",
          "when": "Phân tích xu hướng cao độ ở 300ms cuối câu",
          "then": "Hệ thống nhận diện hướng ngữ điệu (Rising Tone: +3 semitones trở lên); nếu học viên hạ giọng, hiển thị mũi tên đỏ hướng xuống cảnh báo.",
          "completed": false
        },
        {
          "id": "ac-elsa-203-humming-mode",
          "given": "Học viên muốn cảm nhận ngữ điệu mà không bị phân tâm bởi việc phát âm từ vựng",
          "when": "Bấm nút \"Nghe Giai Điệu Ùm Ùm (Humming Synth)\"",
          "then": "Bộ tổng hợp âm thanh Web Audio Oscillator phát ra chuỗi âm thanh huýt sáo không lời mô phỏng chính xác đường lượn cao độ của câu.",
          "completed": false
        },
        {
          "id": "ac-elsa-203-semitone-normalization",
          "given": "Học viên có tông giọng tự nhiên khác biệt (giọng nam trầm vs giọng nữ cao)",
          "when": "Hệ thống so sánh với giọng người bản ngữ",
          "then": "Tự động chuẩn hóa cao độ về thang Bán Âm (Semitone Normalization relative to median F0) để việc so sánh chỉ tập trung vào độ dốc giai điệu.",
          "completed": false
        }
      ],
      "technicalTasks": [
        {
          "id": "t-elsa-203-fe-curve",
          "title": "Xây dựng component PitchContourSvg.jsx vẽ đường cong Bezier mượt mà so sánh 2 dải cao độ F0",
          "category": "Frontend",
          "completed": false
        },
        {
          "id": "t-elsa-203-fe-synth",
          "title": "Tích hợp Web Audio Oscillator phát âm thanh Humming Melody mô phỏng đường cong ngữ điệu",
          "category": "Frontend",
          "completed": false
        },
        {
          "id": "t-elsa-203-be-yin",
          "title": "Triển khai thuật toán YIN Pitch Tracking trích xuất F0 sau mỗi 10ms có bộ lọc Voiced/Unvoiced",
          "category": "AI/DSP",
          "completed": false
        },
        {
          "id": "t-elsa-203-be-norm",
          "title": "Phát triển module SemitoneConverter chuẩn hóa dải cao độ cá nhân loại bỏ chênh lệch giới tính",
          "category": "Backend",
          "completed": false
        }
      ],
      "notes": "### 🎯 FULLSTACK FEATURE SPECIFICATION\n- **Phân loại**: Full-stack Intonation Analysis (SVG Pitch Curves + F0 Semitone Processing)\n- **UI Mockup**: `vietphonics-app/src/ui-reference/acoustic_precision_light/code.html`\n- **Frontend Component**: `vietphonics-app/src/components/prosody/PitchContourMelodyView.jsx`\n\n#### 🎨 Dual Pitch Curve Visualization\n```\n+-------------------------------------------------------------+\n| Câu hỏi: \"Are you coming with us tomorrow?\"                 |\n| F0 (Hz)                                                     |\n| 250 |                     ____/  <-- [Bản xứ: Vút cao ↗]   |\n| 200 |         __/__    /                                   |\n| 150 |  ______/      --/-------- <-- [Học viên: Đi xuống ↘]|\n|     +-------------------------------------------------------+\n|        Are   you   coming   with   us   tomorrow?           |\n+-------------------------------------------------------------+\n```\n\n#### 🗄️ Backend Semitone Normalization Formula\n```\nSemitone(t) = 12 * log_2(F0(t) / F0_{median})\n```\n- Chuẩn hóa loại bỏ yếu tố sinh học giới tính (nam ~120Hz, nữ ~220Hz), đưa về thang đo tương đối delta semitones.\n\n#### 🗄️ Backend API Contract\n```http\nPOST /api/v1/scoring/pitch-contour\nContent-Type: application/json\n\n{\n  \"sentenceId\": \"sent_prosody_01\",\n  \"audioUrl\": \"https://r2.vietphonics.com/audio/session_503.opus\"\n}\n```\n- **Response**: Trả về mảng `contourNormalizedPoints` gồm `{ timeSec, semitone }` và kết quả đánh giá `terminalPattern: 'rise' | 'fall'`.",
      "createdAt": "2026-09-30T17:26:08.290Z"
    },
    {
      "id": "ELSA-204",
      "epicId": "epic-ending-sounds",
      "title": "Speech Fluency, Natural Pauses & Filler Word Monitor: Giám Sát Độ Lưu Loát, Quãng Nghỉ Tự Nhiên & Từ Đệm Rác",
      "persona": "Người học tiếng Anh giao tiếp hoặc luyện thi nói hay bị ấp úng, chèn quá nhiều từ đệm rác (\"uhm\", \"ah\", \"like\", \"you know\") và ngập ngừng ngắt quãng sai chỗ",
      "action": "nói các đoạn văn dài và quan sát thước đo độ lưu loát (Fluency Timeline), đếm số lượng từ đệm rác, đo độ dài quãng nghỉ ngắt câu (Pauses) và đo tốc độ nói chuẩn (Words Per Minute - WPM)",
      "value": "rèn luyện nhịp thở và phong thái nói đĩnh đạc tự tin, cải thiện trực tiếp tiêu chí Fluency & Coherence trong các bài thuyết trình và phỏng vấn tiếng Anh",
      "priority": "must",
      "status": "in-progress",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-elsa-204-wpm-gauge",
          "given": "Dữ liệu bài nói của học viên kéo dài từ 15 đến 60 giây",
          "when": "Giao diện FluencyTracker tải lên",
          "then": "Hiển thị đồng hồ WPM bán nguyệt SVG với kim chỉ số mượt mà, phân chia 3 dải tốc độ: Chậm (<110 WPM), Lý tưởng (120-150 WPM), và Quá nhanh (>170 WPM).",
          "completed": true
        },
        {
          "id": "ac-elsa-204-timeline-segments",
          "given": "Các mốc thời gian lời nói và khoảng lặng được phân tích",
          "when": "Thanh timeline hiển thị trên màn hình",
          "then": "Phân đoạn nói bình thường màu Sky-500, khoảng lặng tự nhiên (<0.5s) màu xám mờ, và quãng nghỉ ấp úng (>0.6s) màu Amber-500 có viền cảnh báo nổi bật.",
          "completed": true
        },
        {
          "id": "ac-elsa-204-audio-excerpt-playback",
          "given": "Học viên click vào một khoảng nghỉ hoặc từ đệm rác trên thanh timeline",
          "when": "Hành động click diễn ra",
          "then": "Trình duyệt tự động cắt và phát đoạn âm thanh 1.5 giây quanh điểm đó để học viên tự nghe lại khoảnh khắc ngập ngừng của mình.",
          "completed": true
        },
        {
          "id": "ac-elsa-204-l1-filler-filter",
          "given": "Bài nói chứa các từ đệm tiếng Việt L1 (\"ờ\", \"ừm\", \"kiểu như\")",
          "when": "Bật bộ lọc L1 Hesitation Filter",
          "then": "Làm nổi bật các thẻ từ đệm kèm lời khuyên thay thế bằng sự im lặng có chủ đích.",
          "completed": false
        }
      ],
      "technicalTasks": [
        {
          "id": "t-elsa-204-gauge",
          "title": "Xây dựng component WpmSpeedometerGauge.jsx bằng SVG thuần với kim xoay góc -90deg đến +90deg",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-204-timeline",
          "title": "Phát triển component FluencyInteractiveTimeline.jsx có khả năng kéo trượt zoom và click chọn đoạn",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-204-audio-slice",
          "title": "Xây dựng hàm playBufferSegment(audioBuffer, startMs, endMs) sử dụng Web Audio API AudioBufferSourceNode",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-204-l1-filter",
          "title": "Tích hợp bộ lọc phân loại từ đệm tiếng Việt vào thanh công cụ điều khiển",
          "category": "Frontend",
          "completed": false
        }
      ],
      "notes": "### 🎨 PURE FRONTEND DESIGN SPECIFICATION\n- **Phân loại**: Pure Frontend UI/UX Component (Fluency Speedometer & Timeline)\n- **UI Mockup**: `vietphonics-app/src/ui-reference/acoustic_precision_light/code.html`\n- **Frontend Component**: `vietphonics-app/src/components/scoring/FluencyTimelineTracker.jsx`\n\n#### 📐 Layout & Timeline Track Structure\n```\n+-------------------------------------------------------------+\n| [ Đồng Hồ WPM: 128 WPM (Chuẩn) ]  [ 2 Từ Đệm ]  [ 1 Ngập Ngừng ] |\n+-------------------------------------------------------------+\n| 0s       2s           4s            6s            8s        |\n| [=== Nói ===] [..Nghỉ..] [==== Nói ====] [!Ùm!] [=== Nói ===] |\n+-------------------------------------------------------------+\n| > Bấm vào đoạn [!Ùm!] để nghe lại 1.5s ngập ngừng          |\n+-------------------------------------------------------------+\n```\n\n#### 🎨 Micro-Interactions & Audio Snippets\n- **WPM Speedometer**: SVG Arc `d=\"M 20 100 A 80 80 0 0 1 180 100\"` với kim chỉ số xoay theo công thức: `angle = ((wpm - 80) / 120) * 180 - 90`.\n- **Audio Excerpt Slice**:\n```javascript\nfunction playAudioSnippet(audioBuffer, startMs, endMs) {\n  const source = audioContext.createBufferSource();\n  source.buffer = audioBuffer;\n  source.connect(audioContext.destination);\n  source.start(0, startMs / 1000, (endMs - startMs) / 1000);\n}\n```\n- **Tokens**:\n  - Segment Speech: `bg-sky-500/20 border-sky-500/50 text-sky-300 rounded px-2 py-1 text-xs`\n  - Segment Pause (>0.6s): `bg-amber-500/20 border border-amber-500 text-amber-400 rounded px-2 py-1 text-xs font-mono`\n  - Segment Filler: `bg-purple-500/20 border border-purple-500 text-purple-300 rounded-full px-2.5 py-0.5 text-xs font-semibold`.",
      "createdAt": "2026-09-30T17:26:08.290Z"
    },
    {
      "id": "ELSA-205",
      "epicId": "epic-articulation",
      "title": "Minimal Pair Auditory Discrimination Quizzes: Luyện Tai Phân Biệt Cặp Âm Dễ Nhầm Lẫn (/θ/-/t/, /iː/-/ɪ/)",
      "persona": "Người học tiếng Anh thường xuyên nhầm lẫn các cặp âm gần giống nhau do tai chưa nhận diện được sự khác biệt âm học",
      "action": "nghe âm thanh ngẫu nhiên được phát ra và chọn từ chính xác giữa 2 lựa chọn cặp âm tối thiểu (A vs B)",
      "value": "rèn luyện phản xạ thính giác nhạy bén, phân biệt rõ ràng giữa /θ/ (think) vs /t/ (tink), /iː/ (sheep) vs /ɪ/ (ship), /s/ (sea) vs /ʃ/ (she) trước khi tập phát âm",
      "priority": "must",
      "status": "in-progress",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-elsa-205-quiz",
          "given": "Cặp âm tối thiểu /θ/ vs /t/ với 2 từ \"think\" và \"tink\"",
          "when": "Học viên bấm nút loa phát âm thanh ngẫu nhiên và chọn Lựa chọn A (\"think\")",
          "then": "Nếu đúng, hiển thị thông báo chúc mừng màu xanh lá, tăng điểm bài kiểm tra, tăng chuỗi streak và hiển thị mẹo cấu âm: \"Chú ý kẹp lưỡi giữa hai răng cho /θ/, đầu lưỡi bật sau nướu cho /t/\".",
          "completed": true
        },
        {
          "id": "ac-elsa-205-frontend-design",
          "given": "Giao diện MinimalPairQuiz trong MasteryLabView",
          "when": "Giao diện hiển thị",
          "then": "Nút loa phát âm to tròn 80px nổi bật giữa màn hình với hiệu ứng hover:scale-110 active:scale-95, 2 nút chọn từ A và B to bản thiết kế dạng Bento card, font-black 24px, hiển thị phiên âm IPA chuẩn bên dưới.",
          "completed": true
        },
        {
          "id": "ac-elsa-205-backend-design",
          "given": "5,000 học viên cùng làm bài trắc nghiệm phân biệt thính giác",
          "when": "Phát âm thanh mẫu và gửi kết quả",
          "then": "Bộ dữ liệu cặp từ tối thiểu được lưu trong Redis Hash minimal_pairs:catalog (TTL 30 ngày), endpoint POST /api/v1/curriculum/minimal-pair/answer ghi nhận lịch sử vào PostgreSQL trong dưới 25ms.",
          "completed": true
        },
        {
          "id": "ac-elsa-205-l1-precision",
          "given": "Học viên chọn nhầm từ \"ship\" thành \"sheep\"",
          "when": "Hệ thống báo sai",
          "then": "Giải thích rõ lỗi L1 tiếng Việt: \"Tiếng Việt không có nguyên âm thả lỏng /ɪ/, người Việt hay đọc thành nguyên âm căng /iː/. Hãy phát âm dứt khoát và thả lỏng khóe môi\".",
          "completed": true
        },
        {
          "id": "ac-elsa-205-a11y-fallback",
          "given": "Người dùng thao tác bằng phím tắt",
          "when": "Nhấn phím 1 cho lựa chọn A, phím 2 cho lựa chọn B, phím Space để nghe lại âm",
          "then": "Giao diện phản hồi chuẩn xác theo phím tắt, các nút có đầy đủ aria-label mô tả nội dung từ.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-elsa-205-fe-quiz",
          "title": "Xây dựng component MinimalPairQuizCard.jsx với Bento Grid và các phím tắt chọn nhanh 1 & 2",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-205-fe-tts",
          "title": "Tích hợp hàm phát âm thanh mẫu audio chất lượng HD qua HTML5 Audio Buffer Cache",
          "category": "Audio/DSP",
          "completed": true
        },
        {
          "id": "t-elsa-205-be-api",
          "title": "Xây dựng API GET /api/v1/curriculum/minimal-pairs và POST /api/v1/curriculum/minimal-pair/answer",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-elsa-205-be-cache",
          "title": "Lưu trữ ngân hàng 500 cặp âm tối thiểu trong Redis in-memory phục vụ 5,000 users",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-elsa-205-qa",
          "title": "Kiểm tra độ chính xác của 10 cặp âm tối thiểu phổ biến nhất trong tiếng Anh giao tiếp",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/components/articulation/MinimalPairQuiz.jsx`\n- **Component Hierarchy**:\n  ```\n  <MinimalPairQuiz pairId=\"mp_theta_t_01\">\n    <AudioPlayHeroButton onPlay={playWord} isPlaying={isPlaying} />\n    <ChoiceCardsContainer>\n      <ChoiceCard key=\"A\" word=\"think\" ipa=\"/θɪŋk/\" keyShortcut=\"1\" onClick={() => handleSelect('A')} />\n      <ChoiceCard key=\"B\" word=\"tink\" ipa=\"/tɪŋk/\" keyShortcut=\"2\" onClick={() => handleSelect('B')} />\n    </ChoiceCardsContainer>\n    <FeedbackBanner isCorrect={result.isCorrect} tip={result.articulatoryTip} />\n  </MinimalPairQuiz>\n  ```\n- **Stitch Design Tokens**:\n  - Hero Speaker: `w-20 h-20 rounded-full bg-sky-500 hover:bg-sky-400 text-white shadow-[0_0_25px_rgba(14,165,233,0.5)] flex items-center justify-center`\n  - Choice Card: `p-6 bg-slate-900 hover:bg-slate-800 border-2 border-slate-700 hover:border-indigo-500 rounded-3xl transition-all cursor-pointer`.\n\n---\n\n### 🗄️ BACKEND DESIGN SPECIFICATION\n- **REST API Endpoint**:\n  ```http\n  POST /api/v1/curriculum/minimal-pair/answer\n  Authorization: Bearer <JWT>\n  Content-Type: application/json\n\n  Request Body:\n  {\n    \"pairId\": \"mp_theta_t_01\",\n    \"selectedChoice\": \"A\",\n    \"playedTarget\": \"A\",\n    \"responseTimeMs\": 1420\n  }\n\n  Response 200 OK:\n  {\n    \"isCorrect\": true,\n    \"currentStreak\": 5,\n    \"xpEarned\": 15,\n    \"articulatoryTip\": \"Kẹp nhẹ đầu lưỡi giữa hai hàm răng khi phát âm /θ/!\"\n  }\n  ```\n- **Database Schema**:\n  ```sql\n  CREATE TABLE minimal_pair_attempts (\n    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n    pair_id VARCHAR(50) NOT NULL,\n    is_correct BOOLEAN NOT NULL,\n    response_time_ms INT NOT NULL,\n    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\n  );\n  ```\n- **High Concurrency (5,000 Users)**:\n  - Dữ liệu câu hỏi tĩnh phục vụ qua Cloudflare CDN, ghi log kết quả bất đồng bộ qua Redis Queue.",
      "createdAt": "2026-09-30T17:26:08.290Z"
    },
    {
      "id": "ELSA-301",
      "epicId": "epic-roleplay-ielts",
      "title": "Dynamic Scenario AI Speaking Roleplay: Hội Thoại Phản Xạ Trực Tiếp Với Đồng Nghiệp Mỹ (IT Standup)",
      "persona": "Lập trình viên và kỹ sư công nghệ làm việc từ xa (remote) với khách hàng và quản lý người Mỹ",
      "action": "tham gia phiên họp Daily Scrum Standup với nhân vật AI Alex Tech Lead (San Francisco) và trả lời câu hỏi cập nhật tiến độ",
      "value": "luyện phản xạ nói tiếng Anh công sở trong môi trường áp lực nhẹ, nhận phản hồi phát âm và ngữ điệu tức thời mà không sợ bị phán xét",
      "priority": "must",
      "status": "in-progress",
      "size": "XL",
      "points": 13,
      "acceptanceCriteria": [
        {
          "id": "ac-elsa-301-dialogue",
          "given": "Phiên họp Daily Standup với Alex Tech Lead",
          "when": "Alex hỏi: \"Morning team! Let's do a quick round. What did you finish yesterday on the payment gateway, and are there any blockers?\"",
          "then": "Học viên bấm nút mic to bản hoặc phím Space để nói câu trả lời, hệ thống phiên âm thời gian thực và Alex phản hồi tự nhiên trong vòng dưới 1.2 giây.",
          "completed": true
        },
        {
          "id": "ac-elsa-301-frontend-design",
          "given": "Giao diện phòng hội thoại RoleplayView",
          "when": "Render trên màn hình",
          "then": "Hiển thị ảnh chân dung Alex sắc nét có vòng hào quang gradient công nghệ, hiệu ứng sóng âm spectrum 48kHz WebRTC nhảy múa khi Alex nói, khung chat hội thoại dạng bong bóng hiện đại, nút Push-To-Talk tròn lớn ở chân trang.",
          "completed": true
        },
        {
          "id": "ac-elsa-301-backend-design",
          "given": "5,000 học viên cùng lúc tham gia các phiên roleplay trực tuyến",
          "when": "Duy trì kết nối âm thanh và nhận diện hội thoại",
          "then": "Sử dụng kiến trúc WebSocket connection pooling với heartbeat 15s; luồng TTS của Alex phát trực tiếp qua Web Speech API trên client hoặc CDN edge cache, máy chủ backend duy trì mức sử dụng RAM dưới 30% cho 5,000 kết nối đồng thời.",
          "completed": true
        },
        {
          "id": "ac-elsa-301-l1-precision",
          "given": "Học viên trả lời báo cáo blocker nhưng nuốt âm đuôi /t/ trong từ \"blocked\"",
          "when": "Alex nghe câu trả lời",
          "then": "Thẻ checklist mục tiêu bên phải cảnh báo: \"Báo cáo blocker kỹ thuật rõ âm: Cần phát âm rõ âm đuôi /t/ trong từ 'blocked'\".",
          "completed": true
        },
        {
          "id": "ac-elsa-301-a11y-fallback",
          "given": "Học viên muốn đọc phụ đề tiếng Việt",
          "when": "Bật toggle \"Phụ đề song ngữ\"",
          "then": "Hiển thị bản dịch tiếng Việt mượt mà ngay dưới câu thoại của Alex giúp học viên hiểu trọn vẹn ngữ cảnh công sở.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-elsa-301-fe-ui",
          "title": "Xây dựng giao diện RoleplayView với ảnh đại diện Alex, dải spectrum WebRTC và khung chat",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-301-fe-mic",
          "title": "Tích hợp Push-To-Talk toàn cục với phím Space và xử lý chuyển đổi lượt nói (turn-taking)",
          "category": "Audio/DSP",
          "completed": true
        },
        {
          "id": "t-elsa-301-be-ws",
          "title": "Thiết kế WebSocket gateway tối ưu hóa cho 5,000 kết nối đồng thời với Node.js cluster",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-elsa-301-be-llm",
          "title": "Tích hợp LLM streaming API với system prompt chuyên sâu về Scrum meeting IT",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-elsa-301-qa",
          "title": "Kiểm thử độ trễ phản hồi của AI hội thoại luôn duy trì dưới 1.2 giây",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/views/RoleplayView.jsx`\n- **Component Hierarchy**:\n  ```\n  <RoleplayView scenario=\"it_standup_scrum\">\n    <AlexAvatarHeader status=\"speaking\" latencyMs={18}>\n      <SpectrumIndicator active={isAlexSpeaking} />\n    </AlexAvatarHeader>\n    <ChatDialogueStream messages={chatHistory} />\n    <ObjectiveChecklist items={scrumObjectives} />\n    <PushToTalkFooter\n      isListening={isUserSpeaking}\n      onStartRecording={startRecording}\n      onStopRecording={stopRecording}\n    />\n  </RoleplayView>\n  ```\n- **Stitch Design Tokens**:\n  - Avatar Halo: `ring-4 ring-indigo-500/40 shadow-[0_0_30px_rgba(99,102,241,0.5)] rounded-full`\n  - AI Bubble: `bg-slate-800 text-slate-100 rounded-3xl rounded-tl-sm p-4 border border-slate-700 max-w-lg`\n  - User Bubble: `bg-rose-600 text-white rounded-3xl rounded-tr-sm p-4 max-w-lg ml-auto`.\n\n---\n\n### 🗄️ BACKEND DESIGN SPECIFICATION\n- **WebSocket Protocol Contract**:\n  ```\n  Endpoint: wss://api.vietphonics.com/ws/v1/roleplay/session\n  \n  Client -> Server:\n  {\n    \"action\": \"user_speech_chunk\",\n    \"sessionId\": \"rol_88291\",\n    \"transcript\": \"Yesterday I finished the checkout gateway and today I will test the webhook.\",\n    \"audioUrl\": \"https://r2.../turn_01.opus\"\n  }\n\n  Server -> Client (Stream):\n  {\n    \"type\": \"agent_response_token\",\n    \"token\": \"Great\",\n    \"isFinished\": false\n  }\n  {\n    \"type\": \"turn_evaluation\",\n    \"phoneticAccuracy\": 85.0,\n    \"unreleasedStopsDetected\": [\"test\"],\n    \"coherenceScore\": 90.0\n  }\n  ```\n- **Database Schema (PostgreSQL DDL)**:\n  ```sql\n  CREATE TABLE roleplay_sessions (\n    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n    scenario_code VARCHAR(50) NOT NULL,\n    total_turns INT NOT NULL DEFAULT 0,\n    overall_pronunciation_score NUMERIC(5, 2),\n    conversation_transcript JSONB NOT NULL DEFAULT '[]'::jsonb,\n    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\n  );\n  CREATE INDEX idx_roleplay_sessions_user ON roleplay_sessions(user_id, created_at DESC);\n  ```\n- **5,000 Users Scale Specs**:\n  - Context hội thoại rút gọn lưu trong Redis Hash `roleplay:context:{sessionId}` (dung lượng < 3KB).\n  - TTFT (Time-to-first-token) duy trì < 450ms qua vLLM engine inference.",
      "createdAt": "2026-09-30T17:26:08.290Z"
    },
    {
      "id": "ELSA-302",
      "epicId": "epic-roleplay-ielts",
      "title": "Post-Roleplay Comprehensive Scorecard: Bảng Chỉ Số Toàn Diện Sau Hội Thoại & Phân Tích Lỗi Giao Tiếp",
      "persona": "Người học vừa kết thúc phiên hội thoại 5 phút và cần một bản báo cáo phân tích toàn diện để biết mình làm tốt điều gì và cần cải thiện gì",
      "action": "xem bảng điểm tổng kết (Post-Roleplay Scorecard) đánh giá 5 trụ cột: Điểm Phát Âm, Độ Lưu Loát, Ngữ Pháp, Từ Vựng Công Sở, và Tỷ Lệ Hoàn Thành Mục Tiêu Buổi Họp",
      "value": "biến một cuộc trò chuyện cảm tính thành dữ liệu định lượng cụ thể, lưu lại các câu nói chưa chuẩn vào Ngân Hàng Lỗi để ôn tập",
      "priority": "must",
      "status": "in-progress",
      "size": "L",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-elsa-302-scorecard-flow",
          "given": "Học viên bấm \"Kết thúc buổi họp\" sau khi hoàn thành 5 lượt đối thoại",
          "when": "Hệ thống kích hoạt thuật toán tổng hợp đánh giá",
          "then": "Màn hình hiển thị Bảng Chỉ Số Toàn Diện với điểm tổng quan (Overall Performance Score /100) và 5 chỉ số thành phần trong vòng dưới 800ms.",
          "completed": true
        },
        {
          "id": "ac-elsa-302-frontend-design",
          "given": "Giao diện PostRoleplayScorecardView",
          "when": "Render trên màn hình",
          "then": "Bố cục Bento grid sang trọng: Điểm tổng kết hình huy hiệu vàng kim ở trung tâm, 5 thẻ chỉ số có thanh tiến trình phân màu, bảng toàn văn hội thoại (Full Transcript) cho phép bấm vào từng câu để nghe lại giọng mình.",
          "completed": true
        },
        {
          "id": "ac-elsa-302-backend-design",
          "given": "5,000 học viên hoàn thành phiên hội thoại cùng lúc",
          "when": "Gửi yêu cầu tổng hợp điểm số",
          "then": "Thuật toán tính điểm chạy bất đồng bộ qua BullMQ worker, lưu báo cáo vào PostgreSQL và cache trong Redis `scorecard:{sessionId}` với thời gian phản hồi < 60ms.",
          "completed": true
        },
        {
          "id": "ac-elsa-302-l1-precision",
          "given": "Báo cáo chỉ ra các từ chuyên ngành CNTT học viên phát âm sai",
          "when": "Rà soát danh sách từ vựng",
          "then": "Liệt kê chính xác các từ kỹ thuật hay bị phát âm sai kiểu Việt Nam (e.g., \"API\" đọc thành \"A-pi\", \"Debug\" nuốt âm /g/, \"Release\" đọc thành \"Rì-liu\") kèm cách sửa chuẩn.",
          "completed": true
        },
        {
          "id": "ac-elsa-302-a11y-fallback",
          "given": "Học viên muốn lưu báo cáo về máy",
          "when": "Bấm nút \"Tải Báo Cáo PDF\" hoặc \"Chia sẻ kết quả\"",
          "then": "Hệ thống sinh file ảnh tóm tắt thành tích dạng thẻ card đẹp mắt để học viên dễ dàng chia sẻ lên LinkedIn hoặc nhóm học tập.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-elsa-302-fe-bento",
          "title": "Xây dựng component PostRoleplayScorecard.jsx với bố cục Bento Grid 5 chỉ số",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-302-fe-transcript",
          "title": "Thiết kế component TranscriptReviewList.jsx hỗ trợ bấm nghe lại từng câu thoại",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-302-be-eval",
          "title": "Phát triển module ConversationEvaluator chấm điểm 5 tiêu chuẩn giao tiếp quốc tế",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-elsa-302-be-cache",
          "title": "Lưu trữ báo cáo tổng kết trong Redis với TTL 7 ngày hỗ trợ tra cứu nhanh",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-elsa-302-qa",
          "title": "Kiểm thử tính nhất quán giữa điểm số hiển thị trên thẻ card và dữ liệu chi tiết trong cơ sở dữ liệu",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/components/roleplay/PostRoleplayScorecard.jsx`\n- **Component Hierarchy**:\n  ```\n  <PostRoleplayScorecard sessionData={completedSession}>\n    <ScoreHeroBadge score={88} rank=\"Senior Communicator\" />\n    <FivePillarsGrid>\n      <MetricCard title=\"Pronunciation\" score={85} color=\"rose\" />\n      <MetricCard title=\"Fluency\" score={92} color=\"sky\" />\n      <MetricCard title=\"Grammar\" score={88} color=\"emerald\" />\n      <MetricCard title=\"IT Vocabulary\" score={90} color=\"indigo\" />\n      <MetricCard title=\"Goal Completion\" score={100} color=\"amber\" />\n    </FivePillarsGrid>\n    <DetailedTranscriptReview transcripts={completedSession.turns} onPlayAudio={playTurnAudio} />\n    <ActionFooter onRetry={restartSession} onSaveErrorBank={saveWeakWords} />\n  </PostRoleplayScorecard>\n  ```\n- **Stitch Design Tokens**:\n  - Hero Card: `bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 shadow-2xl`\n  - Pillar Card: `bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col gap-2`.\n\n---\n\n### 🗄️ BACKEND DESIGN SPECIFICATION\n- **REST API Endpoint**:\n  ```http\n  GET /api/v1/roleplay/scorecard/{sessionId}\n  Authorization: Bearer <JWT>\n\n  Response 200 OK:\n  {\n    \"sessionId\": \"rol_88291\",\n    \"overallScore\": 88.6,\n    \"metrics\": {\n      \"pronunciation\": 85.0,\n      \"fluency\": 92.0,\n      \"grammar\": 88.0,\n      \"vocabulary\": 90.0,\n      \"goalCompletion\": 100.0\n    },\n    \"technicalVocabularyReviewed\": [\n      { \"term\": \"API\", \"pronounced\": \"/eɪ piː aɪ/\", \"score\": 95 },\n      { \"term\": \"blocked\", \"pronounced\": \"/blɒkt/\", \"score\": 70, \"issue\": \"weak final /t/\" }\n    ],\n    \"strengths\": [\"Proactive communication style\", \"Accurate technical terms\"],\n    \"areasForImprovement\": [\"Enunciate past tense -ed endings (/t/, /d/)\"]\n  }\n  ```\n- **Database Schema**:\n  ```sql\n  CREATE TABLE roleplay_scorecards (\n    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    session_id UUID NOT NULL REFERENCES roleplay_sessions(id) ON DELETE CASCADE,\n    overall_score NUMERIC(5, 2) NOT NULL,\n    metrics JSONB NOT NULL,\n    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\n  );\n  ```\n- **5,000 Users Scale Strategy**:\n  - Dữ liệu scorecard được lưu trữ vĩnh viễn trên PostgreSQL và cache tại CDN Edge trong 24 giờ.",
      "createdAt": "2026-09-30T17:26:08.290Z"
    },
    {
      "id": "ELSA-401",
      "epicId": "epic-retention",
      "title": "10-Minute Daily Personalized Practice Path (Adaptive Curriculum): Lộ Trình Luyện Phát Âm Cá Nhân Hóa 10 Phút Mỗi Ngày",
      "persona": "Người đi làm bận rộn tại các thành phố lớn (Hà Nội, TP.HCM, Đà Nẵng) chỉ có 10-15 phút rảnh rỗi trên xe buýt hoặc nghỉ trưa",
      "action": "mở ứng dụng và bắt đầu ngay phiên luyện tập 10 phút được thuật toán AI tự động may đo riêng theo các lỗi phát âm còn yếu nhất",
      "value": "loại bỏ hoàn toàn nỗi băn khoăn \"hôm nay nên học bài nào?\", giúp người học duy trì thói quen học tập vi mô (micro-learning) liên tục và tiến bộ rõ rệt chỉ sau 30 ngày",
      "priority": "must",
      "status": "in-progress",
      "size": "L",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-elsa-401-path-generation",
          "given": "Học viên đăng nhập vào đầu ngày mới",
          "when": "Hệ thống khởi tạo lộ trình 10 phút Daily Practice",
          "then": "Hệ thống sinh ra phiên học gồm chính xác 5 bài tập nhỏ (1 âm khởi động -> 2 âm còn yếu dưới 70% điểm số -> 1 cặp từ tối thiểu -> 1 câu ứng dụng thực tế), tổng thời lượng ước tính đúng 10 phút.",
          "completed": true
        },
        {
          "id": "ac-elsa-401-frontend-design",
          "given": "Giao diện màn hình chính Lộ trình hàng ngày DailyPathView",
          "when": "Render trên thiết bị di động hoặc máy tính để bàn",
          "then": "Hiển thị thẻ bài lộ trình lớn viền gradient Rose-Sky nổi bật, đồng hồ đếm ngược tiến độ (0/5 bài đã xong), thanh tiến trình hình viên thuốc (pill progress bar) đổi màu từ xám sang xanh ngọc lục bảo khi hoàn thành từng bước, không bị giật layout (zero CLS).",
          "completed": true
        },
        {
          "id": "ac-elsa-401-backend-design",
          "given": "5,000 học viên mở ứng dụng đồng thời vào khung giờ cao điểm (7h-8h sáng & 20h-21h tối)",
          "when": "Hệ thống tải dữ liệu lộ trình cá nhân hóa",
          "then": "Lộ trình được tính toán sẵn bởi background worker lúc 04:00 sáng và lưu vào Redis key user:daily_path:{user_id} với TTL 24h, thời gian phản hồi API P95 < 45ms, chịu tải 5,000 req/s mà không tác động tới cơ sở dữ liệu chính.",
          "completed": true
        },
        {
          "id": "ac-elsa-401-l1-precision",
          "given": "Học viên gốc miền Bắc hay nhầm lẫn /l/ vs /n/ hoặc miền Nam hay nuốt âm đuôi /t/",
          "when": "Thuật toán thích ứng phân tích lịch sử lỗi",
          "then": "Lộ trình tự động ưu tiên bài tập chẩn đoán điều chỉnh khẩu hình chuyên biệt theo vùng miền của học viên, minh họa trực quan sự khác biệt vị trí đặt lưỡi.",
          "completed": true
        },
        {
          "id": "ac-elsa-401-a11y-fallback",
          "given": "Học viên đang di chuyển trên xe buýt rung lắc",
          "when": "Thao tác bằng một tay",
          "then": "Nút \"Bắt đầu bài tập kế tiếp\" được đặt ở góc dưới màn hình trong vùng ngón tay cái (thumb zone) với chiều cao tối thiểu 52px, độ tương phản màu văn bản đạt 4.8:1 trên nền sáng.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-elsa-401-fe-card",
          "title": "Xây dựng component DailyPathCard.jsx với thanh tiến trình viên thuốc 5 chặng và nút bấm lớn chuẩn mobile-first",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-401-be-algo",
          "title": "Phát triển thuật toán AdaptiveCurriculumEngine tính điểm trọng số lỗi (Weak Phoneme Weight Matrix)",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-elsa-401-be-cron",
          "title": "Thiết lập BullMQ cron worker chạy lúc 04:00 sáng sinh trước lộ trình cho 5,000 active users đẩy vào Redis",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-elsa-401-fe-offline",
          "title": "Hỗ trợ ServiceWorker cache các audio mẫu của lộ trình 10 phút để học viên luyện tập mượt mà ngay cả khi mạng chập chờn",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-401-qa",
          "title": "Kiểm thử hộp đen kiểm tra tính cá nhân hóa: đảm bảo 2 học viên có lỗi âm khác nhau nhận 2 lộ trình hoàn toàn khác nhau",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/components/dashboard/DailyPathCard.jsx`\n- **Component Hierarchy**:\n  ```\n  <DailyPathCard userPath={dailyPath}>\n    <PathHeader title=\"10-Minute Focus Routine\" remainingMin={10} date=\"Today\" />\n    <PillStepProgressBar steps={dailyPath.steps} currentStepIndex={currentStep} />\n    <ActiveStepCard step={dailyPath.steps[currentStep]} onStartStep={handleStart} />\n    <EstimatedTimeBadge estimatedSec={120} />\n  </DailyPathCard>\n  ```\n- **Stitch Design Tokens**:\n  - Container: `bg-gradient-to-r from-rose-500/10 via-sky-500/10 to-indigo-500/10 border border-slate-700/80 rounded-3xl p-6 shadow-xl`\n  - Step Pill Done: `bg-emerald-500 h-2.5 rounded-full flex-1 transition-all`\n  - Step Pill Pending: `bg-slate-800 h-2.5 rounded-full flex-1`.\n\n---\n\n### 🗄️ BACKEND DESIGN SPECIFICATION\n- **REST API Endpoint**:\n  ```http\n  GET /api/v1/curriculum/daily-path\n  Authorization: Bearer <JWT>\n\n  Response 200 OK:\n  {\n    \"pathId\": \"path_daily_20261003_usr99\",\n    \"totalSteps\": 5,\n    \"estimatedDurationMinutes\": 10,\n    \"steps\": [\n      { \"order\": 1, \"type\": \"warmup\", \"phoneme\": \"/m/\", \"targetWord\": \"moon\" },\n      { \"order\": 2, \"type\": \"challenge_1\", \"phoneme\": \"/t/\", \"targetWord\": \"contact\", \"reason\": \"historical_accuracy_under_60\" },\n      { \"order\": 3, \"type\": \"challenge_2\", \"phoneme\": \"/θ/\", \"targetWord\": \"thought\", \"reason\": \"l1_trap\" },\n      { \"order\": 4, \"type\": \"minimal_pair\", \"pair\": [\"ship\", \"sheep\"] },\n      { \"order\": 5, \"type\": \"connected_sentence\", \"sentence\": \"I thought about that contact yesterday.\" }\n    ]\n  }\n  ```\n- **Database Schema**:\n  ```sql\n  CREATE TABLE daily_paths (\n    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n    path_date DATE NOT NULL,\n    steps_payload JSONB NOT NULL,\n    is_completed BOOLEAN NOT NULL DEFAULT FALSE,\n    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),\n    CONSTRAINT uq_user_path_date UNIQUE(user_id, path_date)\n  );\n  ```\n- **High Concurrency (5,000 Users)**:\n  - Lộ trình 10 phút được lưu trong Redis String `user:daily_path:{userId}` với TTL 86,400s (24h).",
      "createdAt": "2026-09-30T17:26:08.290Z"
    },
    {
      "id": "ELSA-402",
      "epicId": "epic-retention",
      "title": "Automated Error Bank with Spaced Repetition (SM-2 Algorithm): Ngân Hàng Lỗi Tự Động & Thuật Toán Lặp Lại Ngắt Quãng SM-2",
      "persona": "Người học tiếng Anh thường xuyên quên sửa các lỗi phát âm đã từng mắc phải sau một vài ngày học",
      "action": "truy cập kho lưu trữ lỗi cá nhân (Error Bank), xem lại các từ mình từng phát âm sai kèm đoạn ghi âm cũ, và ôn tập theo chu kỳ ngắt quãng tối ưu của thuật toán SM-2",
      "value": "chuyển hóa phát âm từ trí nhớ ngắn hạn sang trí nhớ cơ bắp dài hạn (long-term muscle memory), đảm bảo tỷ lệ sửa lỗi thành công vĩnh viễn trên 80%",
      "priority": "must",
      "status": "in-progress",
      "size": "L",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-elsa-402-bank-capture",
          "given": "Học viên phát âm bất kỳ từ nào đạt điểm dưới 75% trong bất kỳ màn học hay bài kiểm tra nào",
          "when": "Hệ thống ghi nhận kết quả chấm điểm",
          "then": "Từ vựng đó kèm theo âm vị bị sai, file audio ghi âm của học viên và thời điểm mắc lỗi được tự động thêm vào Ngân Hàng Lỗi (Error Bank) mà không cần người dùng bấm lưu thủ công.",
          "completed": true
        },
        {
          "id": "ac-elsa-402-frontend-design",
          "given": "Giao diện Ngân Hàng Lỗi ErrorBankView",
          "when": "Hiển thị danh sách các từ cần ôn tập hôm nay",
          "then": "Mỗi thẻ từ hiển thị rõ phiên âm IPA chuẩn, ký tự bị lỗi tô đỏ rực rỡ kèm huy hiệu cấp độ nhớ (Hộp Leitner 1-5), nút nghe lại giọng mình cũ vs giọng người bản ngữ đặt cạnh nhau trực quan, kèm nút đánh giá mức độ nhớ (Dễ - Vừa - Khó).",
          "completed": true
        },
        {
          "id": "ac-elsa-402-backend-design",
          "given": "5,000 học viên tích lũy trung bình 150 từ lỗi trong tài khoản cá nhân (tổng 750,000 bản ghi lỗi)",
          "when": "Truy vấn các từ đến hạn ôn tập hôm nay (due_date <= CURRENT_DATE)",
          "then": "Bảng cơ sở dữ liệu có chỉ mục kết hợp CREATE INDEX idx_user_due_date ON error_bank(user_id, due_date), kết quả truy vấn trả về phân trang dưới 35ms cho 5,000 người dùng đồng thời.",
          "completed": true
        },
        {
          "id": "ac-elsa-402-l1-precision",
          "given": "Học viên phát âm sai từ \"specifically\" do lỗi nuốt âm /s/ hoặc chèn âm tiếng Việt",
          "when": "Xem chi tiết lỗi trong Error Bank",
          "then": "Thẻ phân tích cung cấp mẹo chỉnh cơ miệng: \"Chú ý phân đoạn âm tiết: spe-ci-fi-cal-ly, hạ âm schwa /ə/ ở âm tiết thứ ba\".",
          "completed": true
        },
        {
          "id": "ac-elsa-402-a11y-fallback",
          "given": "Học viên ôn tập nhanh bằng bàn phím máy tính",
          "when": "Bấm phím 1 (Khó), 2 (Tốt), 3 (Dễ) sau khi nghe",
          "then": "Hệ thống cập nhật hệ số dễ dàng (Easiness Factor EF) và khoảng thời gian ôn tập kế tiếp (Interval Days) ngay lập tức theo chuẩn thuật toán SuperMemo-2.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-elsa-402-fe-card",
          "title": "Xây dựng component ErrorBankCard.jsx với tính năng so sánh âm thanh đôi (A/B Audio Player) và thanh tiến độ hộp Leitner",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-402-be-sm2",
          "title": "Triển khai thuật toán SuperMemo-2 (SM-2) tính toán EF (Easiness Factor) và Interval I(n) sau mỗi lượt ôn tập",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-elsa-402-be-db",
          "title": "Thiết kế bảng PostgreSQL error_bank và tạo compound index tối ưu hóa cho 750,000 bản ghi",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-elsa-402-be-cdn",
          "title": "Tối ưu hóa nén và streaming file âm thanh ghi âm cũ từ Cloudflare R2 bucket với presigned URL thời hạn 1 giờ",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-elsa-402-qa",
          "title": "Kiểm thử toán học kiểm tra tính đúng đắn của chu kỳ lặp lại SM-2 qua 5 chu kỳ ôn tập liên tiếp",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/views/ErrorBankView.jsx`\n- **Component Hierarchy**:\n  ```\n  <ErrorBankView dueCount={todayDueWords.length}>\n    <ReviewStatsHeader totalSaved={142} dueToday={12} masteredPercent={68} />\n    <WordFlashcardCarousel activeWord={currentReviewWord}>\n      <WordHeader text={currentReviewWord.word} ipa={currentReviewWord.ipa} errorPhoneme=\"/t/\" />\n      <DualPlaybackStrip nativeUrl={currentReviewWord.nativeAudio} userOldUrl={currentReviewWord.userOldAudio} />\n      <LeitnerBoxBadge boxNumber={3} intervalDays={6} />\n      <Sm2RatingButtons onRate={(q) => handleRate(currentReviewWord.id, q)} />\n    </WordFlashcardCarousel>\n  </ErrorBankView>\n  ```\n- **Stitch Design Tokens**:\n  - Flashcard: `bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-lg w-full shadow-2xl space-y-6`\n  - Rating Buttons: 1 (Red #ef4444: Again), 2 (Amber #f59e0b: Hard), 3 (Sky #0284c7: Good), 4 (Emerald #10b981: Easy).\n\n---\n\n### 🗄️ BACKEND DESIGN SPECIFICATION\n- **REST API Endpoint**:\n  ```http\n  POST /api/v1/error-bank/review-rate\n  Authorization: Bearer <JWT>\n  Content-Type: application/json\n\n  Request Body:\n  {\n    \"errorId\": \"err_88192a\",\n    \"qualityRating\": 4 // 0..5\n  }\n\n  Response 200 OK:\n  {\n    \"newEasinessFactor\": 2.6,\n    \"nextReviewDate\": \"2026-10-09T00:00:00Z\",\n    \"intervalDays\": 6,\n    \"repetitions\": 3\n  }\n  ```\n- **Database Schema (PostgreSQL DDL)**:\n  ```sql\n  CREATE TABLE error_bank (\n    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n    word VARCHAR(100) NOT NULL,\n    target_ipa VARCHAR(100) NOT NULL,\n    mispronounced_phoneme VARCHAR(10) NOT NULL,\n    user_audio_url TEXT,\n    easiness_factor NUMERIC(4, 2) NOT NULL DEFAULT 2.50,\n    interval_days INT NOT NULL DEFAULT 1,\n    repetition_count INT NOT NULL DEFAULT 0,\n    due_date DATE NOT NULL DEFAULT CURRENT_DATE,\n    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\n  );\n  CREATE INDEX idx_user_due_date ON error_bank(user_id, due_date);\n  ```\n- **High Concurrency (5,000 Users)**:\n  - Đọc danh sách due words có paging O(1) qua index `(user_id, due_date)`.",
      "createdAt": "2026-09-30T17:26:08.290Z"
    },
    {
      "id": "ELSA-601",
      "epicId": "epic-retention",
      "title": "Daily Practice Streak Counter & Streak Freeze Shields: Bộ Đếm Chuỗi Luyện Tập Hằng Ngày & Khiên Đóng Băng Bảo Vệ Chuỗi",
      "persona": "Người học đang hình thành thói quen học tập cần sự khích lệ liên tục và muốn bảo vệ chuỗi ngày học kỷ lục của mình",
      "action": "theo dõi ngọn lửa chuỗi ngày học liên tục (Streak Flame), nhận khiên đóng băng tự động khi có việc bận đột xuất, và nhận huy hiệu danh giá khi đạt mốc 7, 30, 100 ngày",
      "value": "tăng tỷ lệ quay lại ngày tiếp theo (Day-1 Retention) lên trên 65% và tỷ lệ giữ chân tháng đầu (Day-30 Retention) lên trên 40% nhờ hiệu ứng tâm lý sợ mất mát (Loss Aversion)",
      "priority": "must",
      "status": "in-progress",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-elsa-601-streak-calc",
          "given": "Học viên hoàn thành ít nhất 1 bài luyện phát âm trong ngày (theo múi giờ địa phương Asia/Ho_Chi_Minh GMT+7)",
          "when": "Hệ thống kiểm tra điều kiện Streak lúc 23:59:59",
          "then": "Bộ đếm chuỗi tăng thêm 1 ngày, ngọn lửa chuỗi bùng cháy với hiệu ứng ánh cam rực rỡ và thông báo chúc mừng \"Chuỗi 12 ngày liên tục! Bạn thật tuyệt vời!\".",
          "completed": true
        },
        {
          "id": "ac-elsa-601-frontend-design",
          "given": "Thanh điều hướng trên cùng (Navbar) và màn hình hồ sơ người dùng",
          "when": "Hiển thị huy hiệu Streak",
          "then": "Biểu tượng ngọn lửa màu cam cháy sống động kèm số ngày font chữ đậm Plus Jakarta Sans; khi bấm vào ngọn lửa, mở Modal Lịch Streak tháng hiển thị các ngày đã học được đánh dấu chấm xanh, ngày dùng Khiên Băng đánh dấu bông tuyết xanh lam.",
          "completed": true
        },
        {
          "id": "ac-elsa-601-backend-design",
          "given": "5,000 học viên cùng hoạt động vào khung giờ chuyển giao ngày mới (23:50 - 00:10)",
          "when": "Hệ thống kiểm tra và cập nhật Streak hàng loạt",
          "then": "Sử dụng hàng đợi phân tán Redis Task Queue xử lý cập nhật bất đồng bộ, khóa phân tán Redlock bảo vệ chống race-condition ghi đè streak hai lần, thời gian xử lý toàn bộ 5,000 users dưới 4 giây.",
          "completed": true
        },
        {
          "id": "ac-elsa-601-l1-precision",
          "given": "Học viên bỏ lỡ 1 ngày luyện tập vì bận việc gia đình",
          "when": "Học viên sở hữu ít nhất 1 Khiên Băng (Streak Freeze Shield)",
          "then": "Hệ thống tự động tiêu thụ 1 khiên băng, bảo toàn chuỗi ngày học nguyên vẹn và gửi thông báo nhắc nhở nhẹ nhàng vào sáng hôm sau: \"Khiên Băng đã cứu chuỗi 15 ngày của bạn! Đừng quên luyện tập hôm nay nhé!\".",
          "completed": true
        },
        {
          "id": "ac-elsa-601-a11y-fallback",
          "given": "Học viên dùng phím điều hướng",
          "when": "Focus vào ngọn lửa Streak",
          "then": "Aria-label đọc đầy đủ: \"Chuỗi học tập hiện tại: 12 ngày liên tiếp. Bạn có 2 khiên băng bảo vệ. Nhấn để xem lịch sử tháng\".",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-elsa-601-fe-modal",
          "title": "Xây dựng component StreakModal.jsx với lịch tháng tương tác và hoạt ảnh ngọn lửa Lottie/CSS Canvas",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-601-be-logic",
          "title": "Xây dựng module StreakManager xử lý múi giờ địa phương IANA Timezone và cơ chế tự động kích hoạt Freeze Shield",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-elsa-601-be-redis",
          "title": "Triển khai Redis cache và Redlock bảo vệ cập nhật đồng thời chuỗi học tập cho 5,000 users",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-elsa-601-be-notify",
          "title": "Tích hợp Web Push Notification và Zalo ZNS nhắc nhở học viên trước 21:00 nếu chưa hoàn thành bài trong ngày",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-elsa-601-qa",
          "title": "Kiểm thử kịch bản múi giờ: mô phỏng học viên bay từ Hà Nội (GMT+7) sang Tokyo (GMT+9) và New York (GMT-5)",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/components/retention/StreakModal.jsx`\n- **Stitch Design Tokens**:\n  - Flame Icon: `text-amber-500 drop-shadow-[0_0_12px_rgba(245,158,11,0.6)] animate-pulse`\n  - Streak Modal: `bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full`\n  - Calendar Day Dot: Completed (`bg-emerald-500`), Freeze (`bg-sky-400`), Inactive (`bg-slate-800`).\n\n---\n\n### 🗄️ BACKEND DESIGN SPECIFICATION\n- **Database Schema**:\n  ```sql\n  CREATE TABLE user_streaks (\n    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,\n    current_streak INT NOT NULL DEFAULT 0,\n    longest_streak INT NOT NULL DEFAULT 0,\n    freeze_shields_available INT NOT NULL DEFAULT 1,\n    last_completed_date DATE,\n    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\n  );\n  ```\n- **High Concurrency (5,000 Users)**:\n  - Sử dụng Redlock `lock:streak:{userId}` trong 500ms khi ghi nhận hoàn thành bài.",
      "createdAt": "2026-09-30T17:26:08.290Z"
    },
    {
      "id": "ELSA-602",
      "epicId": "epic-retention",
      "title": "Freemium 5-Lesson Daily Limit & Pro Subscription Paywall: Hạn Mức 5 Bài Học Miễn Phí Mỗi Ngày & Cửa Sổ Nâng Cấp Pro Chuyển Đổi Cao",
      "persona": "Người dùng sử dụng tài khoản miễn phí muốn trải nghiệm giá trị ứng dụng trước khi quyết định chi trả",
      "action": "học tối đa 5 bài học phát âm miễn phí mỗi ngày; khi chạm ngưỡng giới hạn, xem bảng so sánh tính năng Pro hấp dẫn với mức giá chỉ 30,000đ/tháng và tiến hành nâng cấp",
      "value": "bảo vệ hạ tầng điện toán đám mây và chi phí ASR, đồng thời tối đa hóa tỷ lệ chuyển đổi từ người dùng miễn phí sang thuê bao trả phí (Free-to-Paid Conversion Rate > 8%)",
      "priority": "must",
      "status": "in-progress",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-elsa-602-quota-check",
          "given": "Học viên dùng gói Free đã hoàn thành 5 bài học trong ngày",
          "when": "Cố gắng bấm bắt đầu bài học thứ 6",
          "then": "Hệ thống chặn truy cập bài học và hiển thị Modal Nâng Cấp Pro (Paywall Modal) với tiêu đề thân thiện: \"Bạn đã hoàn thành xuất sắc hạn mức 5 bài hôm nay! Nâng cấp Pro để mở khóa không giới hạn\".",
          "completed": true
        },
        {
          "id": "ac-elsa-602-frontend-design",
          "given": "Cửa sổ nâng cấp Pro Paywall Modal",
          "when": "Hiển thị trên màn hình",
          "then": "Thiết kế theo chuẩn Google Stitch phong cách thẻ giá hiện đại: Bảng so sánh 2 cột Free vs Pro, huy hiệu \"Phổ Biến Nhất\" màu vàng cam, giá ưu đãi 30.000đ/tháng (chỉ 1.000đ/ngày tương đương nửa ly trà đá), nút kêu gọi hành động (CTA) gradient Rose rực rỡ với hiệu ứng hào quang nhẹ.",
          "completed": true
        },
        {
          "id": "ac-elsa-602-backend-design",
          "given": "5,000 người dùng kiểm tra hạn mức bài học liên tục",
          "when": "Gửi request bắt đầu bài học",
          "then": "Hạn mức được kiểm tra trên Redis INCR counter quota:{user_id}:{date} với thời gian phản hồi dưới 3ms, không tốn bất kỳ lượt truy vấn nào vào cơ sở dữ liệu PostgreSQL chính.",
          "completed": true
        },
        {
          "id": "ac-elsa-602-l1-precision",
          "given": "Học viên muốn nghe lại đoạn ghi âm cũ của mình trong Error Bank",
          "when": "Kiểm tra quyền hạn gói Free",
          "then": "Gói Free cho phép nghe lại tối đa 3 ngày gần nhất; hiển thị icon ổ khóa mở rộng cho các đoạn ghi âm lịch sử lâu hơn kèm chú thích \"Nâng cấp Pro để lưu trữ trọn đời âm thanh của bạn\".",
          "completed": true
        },
        {
          "id": "ac-elsa-602-a11y-fallback",
          "given": "Người dùng muốn đóng Modal Paywall",
          "when": "Nhấn phím Escape hoặc nút \"Để sau, mai học tiếp\"",
          "then": "Modal đóng mượt mà và focus trả về nút bài học trước đó, không gây bẫy bàn phím (keyboard trap).",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-elsa-602-fe-modal",
          "title": "Xây dựng component ProPaywallModal.jsx với bảng so sánh tính năng Free vs Pro và đồng hồ đếm ngược reset hạn mức",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-602-be-redis",
          "title": "Triển khai Redis atomic counter INCR và EXPIREAT (23:59:59) kiểm soát hạn mức 5 bài/ngày cho 5,000 users",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-elsa-602-be-mw",
          "title": "Viết Express/FastAPI middleware verifyQuotaMiddleware chặn các lượt gọi API luyện âm khi vượt quota",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-elsa-602-be-perf",
          "title": "Đảm bảo modal mở tức thì dưới 50ms không bị hiện tượng giật cục layout (zero Cumulative Layout Shift)",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-elsa-602-qa",
          "title": "Kiểm thử hộp đen các trường hợp: tài khoản Pro không bị giới hạn, tài khoản Free đúng 5 bài bị chặn",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/components/subscription/ProPaywallModal.jsx`\n- **Stitch Design Tokens**:\n  - Modal Backdrop: `bg-slate-950/80 backdrop-blur-md`\n  - Pro Badge: `bg-gradient-to-r from-amber-500 to-rose-500 text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider`\n  - Price Tag: `font-['Plus_Jakarta_Sans'] font-extrabold text-3xl text-white`.\n\n---\n\n### 🗄️ BACKEND DESIGN SPECIFICATION\n- **Middleware Lua Script (Atomic Quota Check)**:\n  ```lua\n  local key = KEYS[1]\n  local limit = tonumber(ARGV[1])\n  local current = redis.call('INCR', key)\n  if current == 1 then\n    redis.call('EXPIREAT', key, tonumber(ARGV[2])) -- midnight timestamp\n  end\n  if current > limit then\n    return 0 -- Over quota\n  else\n    return 1 -- OK\n  end\n  ```",
      "createdAt": "2026-09-30T17:26:08.290Z"
    },
    {
      "id": "VN-101",
      "epicId": "epic-ending-sounds",
      "title": "Final Consonant Sound \"Ending Sound\" Inspector & Acoustical Burst Analyzer: Thanh Tra Âm Cuối & Phân Tích Xung Âm Bật Hơi",
      "persona": "Học viên Việt Nam thường xuyên mắc tật \"nuốt sạch âm đuôi\" (bỏ quên các âm /t/, /d/, /k/, /g/, /p/, /b/, /s/, /z/, /ks/ ở cuối từ)",
      "action": "phát âm các từ có đuôi phức tạp và quan sát xung sóng âm bật hơi (Acoustical Burst Spike) trên màn hình để kiểm tra xem mình có thực sự nhả âm cuối hay chỉ ngậm miệng lại",
      "value": "trị tận gốc \"căn bệnh thế kỷ\" của người Việt học tiếng Anh: nói tiếng Anh không có âm đuôi khiến người nước ngoài hoàn toàn không hiểu",
      "priority": "must",
      "status": "in-progress",
      "size": "XL",
      "points": 13,
      "acceptanceCriteria": [
        {
          "id": "ac-vn-101-dual-oscilloscope",
          "given": "Từ mục tiêu có phụ âm đuôi bật hơi (e.g., \"contact\", \"desk\", \"six\")",
          "when": "Học viên hoàn thành phát âm",
          "then": "Hiển thị 2 kênh sóng âm song song: Kênh trên là giọng bản ngữ chuẩn, kênh dưới là giọng học viên, căn chỉnh đồng bộ theo đỉnh nguyên âm chính.",
          "completed": true
        },
        {
          "id": "ac-vn-101-burst-spike-indicator",
          "given": "Hệ thống đo đạc xung năng lượng âm học (Transient Burst Energy Spike dE/dt)",
          "when": "Tỷ lệ năng lượng xung trong 50ms cuối của từ đạt ≥ 0.35",
          "then": "Hiển thị huy hiệu xanh lá \"Bật hơi chuẩn!\"; nếu thiếu xung bật hơi, vị trí cuối từ xuất hiện vòng tròn đỏ nhấp nháy cảnh báo \"Nuốt âm đuôi\".",
          "completed": true
        },
        {
          "id": "ac-vn-101-l1-unreleased-stop-warning",
          "given": "Học viên khép miệng ngậm hơi theo thói quen tiếng Việt (Unreleased Stop e.g. \"bát\" thay vì \"bat\")",
          "when": "Hệ thống phát hiện năng lượng dải tần số 3kHz - 8kHz bị triệt tiêu đột ngột",
          "then": "Hiển thị sơ đồ giải phẫu 2D chỉ rõ cách mở nhẹ đầu lưỡi để nhả luồng hơi bật ra ngoài.",
          "completed": false
        },
        {
          "id": "ac-vn-101-slowmo-playback",
          "given": "Học viên muốn nghe phân tích chi tiết âm đuôi",
          "when": "Bấm nút \"Nghe Chậm 0.5x\"",
          "then": "Hệ thống phát lại đoạn audio ở tốc độ nửa nhịp nhưng vẫn giữ nguyên cao độ giọng nói (Pitch-preserving Timestretch) qua Web Audio API.",
          "completed": false
        }
      ],
      "technicalTasks": [
        {
          "id": "t-vn-101-scope",
          "title": "Xây dựng component OscilloscopeDualWaveform.jsx vẽ 2 kênh sóng âm bằng Canvas 2D",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-vn-101-burst-meter",
          "title": "Thiết kế AcousticalBurstMeter.jsx hiển thị thanh đo tỷ lệ năng lượng xung nhịp",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-vn-101-dsp-burst",
          "title": "Viết thuật toán trích xuất đạo hàm năng lượng dE/dt và Zero Crossing Rate (ZCR) trong 50ms cuối",
          "category": "Audio/DSP",
          "completed": false
        },
        {
          "id": "t-vn-101-slowmo",
          "title": "Tích hợp Phase Vocoder hoặc Web Audio playbackRate giữ pitch để phát chậm 0.5x",
          "category": "Audio/DSP",
          "completed": false
        }
      ],
      "notes": "### 🎯 FULLSTACK & AUDIO DSP SPECIFICATION\n- **Phân loại**: Full-stack Audio DSP & Oscilloscope Visualizer\n- **UI Mockup**: `vietphonics-app/src/ui-reference/acoustic_precision_light/code.html`\n- **Frontend Component**: `vietphonics-app/src/components/ending-sounds/EndingSoundInspector.jsx`\n\n#### 🎨 Dual Oscilloscope Visualization\n```\n+-------------------------------------------------------------+\n| NATIVE:  ---~--///--~---..|  <-- [Xung bật /t/ rõ ràng]   |\n| USER:    ---~--///-------..|  <-- [! KHÔNG CÓ XUNG BẬT !]  |\n+-------------------------------------------------------------+\n| Burst Energy Ratio: 0.12 (Ngưỡng yêu cầu: >= 0.35) -> Cần sửa |\n+-------------------------------------------------------------+\n```\n\n#### 🧮 Acoustic Burst Formula\n```\nBurstEnergyRatio = int_{T_{end}-50ms}^{T_{end}} |x(t)|^2 dt / E_{vowel}\n```\n- Nếu `BurstEnergyRatio < 0.20`: Người học hoàn toàn ngậm miệng lại (Vietnamese unreleased stop coda).\n- Nếu `BurstEnergyRatio >= 0.35`: Luồng khí bật ra đủ mạnh tạo âm nổ (Released plosive).\n\n#### 🗄️ Backend Contract & Wasm Client Scale\n- **Rust/Wasm Client-Side**: Thuật toán tính toán năng lượng tức thời chạy trực tiếp trên client bằng WebAssembly, giảm 100% tải tính toán âm học trên server backend.\n- **REST API Fallback**:\n```http\nPOST /api/v1/acoustic/ending-burst\nContent-Type: application/json\n\n{\n  \"word\": \"contact\",\n  \"targetEndingPhoneme\": \"/t/\",\n  \"audioUrl\": \"https://r2.../c1.opus\"\n}\n```",
      "createdAt": "2026-09-30T17:32:40.700Z"
    },
    {
      "id": "VN-102",
      "epicId": "epic-diagnostic",
      "title": "Vietnamese L1 3-Minute Diagnostic Pronunciation Screener: Bài Sàng Lọc Phát Âm Toàn Diện 3 Phút Cho Người Việt",
      "persona": "Người dùng mới bắt đầu cần một bài kiểm tra nhanh gọn, chính xác trong 3 phút để xác định ngay các điểm yếu phát âm cốt lõi",
      "action": "đọc lần lượt 12 câu chẩn đoán ngắn được thiết kế riêng để bẫy toàn bộ các lỗi phát âm kinh điển nhất của người Việt",
      "value": "chỉ mất 3 phút để nhận được bản chụp X-quang phát âm của chính mình, có lộ trình sửa lỗi rõ ràng ngay từ ngày đầu tiên",
      "priority": "must",
      "status": "in-progress",
      "size": "XL",
      "points": 13,
      "acceptanceCriteria": [
        {
          "id": "ac-vn-102-step-wizard",
          "given": "Người dùng bắt đầu bài sàng lọc 3 phút",
          "when": "Giao diện bắt đầu chạy",
          "then": "Hiển thị thẻ câu số 1 kèm thanh tiến trình 12 bước (Progress Bar); nút micro to bản ở trung tâm phát sáng sẵn sàng thu âm.",
          "completed": true
        },
        {
          "id": "ac-vn-102-auto-advance",
          "given": "Người dùng đọc xong câu số 1 vào micro",
          "when": "Bộ phát hiện khoảng lặng (VAD) nhận thấy 1.5 giây im lặng sau khi nói",
          "then": "Hệ thống tự động lưu bản ghi âm câu 1 và trượt mượt mà sang câu số 2 mà không bắt người dùng phải bấm nút thủ công.",
          "completed": true
        },
        {
          "id": "ac-vn-102-comprehensive-report",
          "given": "Người dùng hoàn thành câu thứ 12",
          "when": "Hệ thống xử lý tổng hợp",
          "then": "Xuất bản Báo Cáo Chẩn Đoán 3 Phút: Liệt kê top 3 lỗi phát âm nặng nhất, điểm số tổng quan và nút \"Kích hoạt lộ trình sửa lỗi 30 ngày\".",
          "completed": false
        }
      ],
      "technicalTasks": [
        {
          "id": "t-102-wizard",
          "title": "Xây dựng component DiagnosticWizardView.jsx quản lý luồng 12 thẻ câu chẩn đoán",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-102-vad",
          "title": "Tích hợp AudioWorklet VAD tự động ngắt câu sau 1.5s im lặng",
          "category": "Audio/DSP",
          "completed": true
        },
        {
          "id": "t-102-report-api",
          "title": "Tạo API POST /api/v1/diagnostic/screener-submit tổng hợp kết quả 12 câu",
          "category": "Backend",
          "completed": false
        },
        {
          "id": "t-102-qa",
          "title": "Kiểm thử toàn bộ luồng 12 câu trên thiết bị di động Android và iPhone",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎯 FULLSTACK FEATURE SPECIFICATION\n- **Phân loại**: Full-stack Onboarding Flow\n- **UI Mockup**: `vietphonics-app/src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html`\n- **Frontend Component**: `vietphonics-app/src/views/DiagnosticScreenerView.jsx`\n\n#### 🎨 Frontend Wizard Flow\n- **12 Câu Chẩn Đoán L1**:\n  1. Final /t/: *\"What time did you contact the client?\"*\n  2. Final /s/: *\"The price of the house is increasing.\"*\n  3. Initial /θ/: *\"I think thirty thousand dollars is fair.\"*\n  4. Initial /ð/: *\"They will arrive together this morning.\"*\n  5. Contrast /s/ vs /ʃ/: *\"She sells seashells by the seashore.\"*\n  6. Final /d/ vs /t/: *\"He needed food and waited outside.\"*\n  7. Vowel /iː/ vs /ɪ/: *\"Please sit on the seat near the ship.\"*\n  8. Vowel /æ/ vs /e/: *\"The bad cat slept on the red bed.\"*\n  9. Word Stress: *\"The photographer took a photograph of photography.\"*\n  10. Intonation: *\"Are you coming with us tomorrow?\"*\n  11. Linking: *\"Hold on a second and turn it off.\"*\n  12. Reduction: *\"I would have gone if I had known about it.\"*\n\n#### 🗄️ Backend Aggregation Engine\n```http\nPOST /api/v1/diagnostic/screener-submit\nAuthorization: Bearer <JWT>\nContent-Type: application/json\n\n{\n  \"answers\": [\n    { \"itemIndex\": 0, \"audioUrl\": \"https://r2.../q1.opus\", \"targetPhoneme\": \"/t/\" }\n  ]\n}\n```\n- Trả về Báo cáo chẩn đoán phân loại theo 4 cấp độ ưu tiên để sinh lộ trình học cá nhân hóa.",
      "createdAt": "2026-09-30T17:32:40.700Z"
    },
    {
      "id": "VN-103",
      "epicId": "epic-prosody",
      "title": "Syllable Stress vs. Tone Mark Visualizer & Schwa Demotion: Đối Soát Trọng Âm vs Thanh Điệu & Luyện Giảm Âm Schwa",
      "persona": "Học viên Việt Nam bị thói quen thanh điệu (Dấu sắc, huyền, hỏi, ngã, nặng) chi phối nặng nề, luôn có xu hướng đọc rõ từng âm tiết tiếng Anh như một từ đơn",
      "action": "quan sát bảng đối chiếu cơ chế giữa \"Thanh điệu đơn lập tiếng Việt\" vs \"Trọng âm động học tiếng Anh\", và luyện các bài tập hạ âm schwa (/ə/) để biến các âm tiết không trọng âm thành âm lướt nhẹ",
      "value": "giải phóng học viên khỏi tư duy thanh điệu tiếng mẹ đẻ, giúp câu nói tiếng Anh có độ nén nhịp điệu (Stress-timed Rhythm) tự nhiên như người bản xứ",
      "priority": "must",
      "status": "todo",
      "size": "L",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-vn-103-schwa-demotion",
          "given": "Học viên luyện từ chứa âm lướt schwa (e.g., \"ba-NA-na\", \"a-BOUT\", \"CHO-co-late\")",
          "when": "Hệ thống đo đạc thời lượng và độ mở nguyên âm của âm schwa",
          "then": "Nếu âm schwa được phát âm cực ngắn (<70ms) và thả lỏng cơ miệng về trung tâm (F1/F2 trung tính) thì ghi nhận thành công kỹ năng giảm âm (Schwa Demotion).",
          "completed": false
        },
        {
          "id": "ac-vn-103-contrast-card",
          "given": "Giao diện StressVsToneView hiển thị",
          "when": "Học viên mở bài đối chiếu ngôn ngữ",
          "then": "Hiển thị đồ họa so sánh 2 cơ chế: Cột trái \"Thanh điệu tiếng Việt (Âm tiết độc lập, đều độ dài)\" và Cột phải \"Nhịp điệu tiếng Anh (Âm nhấn vươn dài, âm phụ rút gọn thành Schwa /ə/)\".",
          "completed": false
        },
        {
          "id": "ac-vn-103-l1-advice",
          "given": "Học viên phát âm từ \"banana\" thành \"ba-na-nà\" (đều 3 âm tiết)",
          "when": "Hệ thống phát hiện lỗi không giảm âm",
          "then": "Hiển thị lời khuyên L1: \"Bạn đang đọc rõ chữ 'ba'! Hãy đọc lướt thật nhanh thành /bə/ - chỉ lướt nhẹ môi như một tiếng thở dài\".",
          "completed": false
        },
        {
          "id": "ac-vn-103-mobile-haptic",
          "given": "Học viên luyện tập trên thiết bị di động có motor rung",
          "when": "Âm thanh phát đến âm tiết trọng âm chính",
          "then": "Điện thoại rung nhịp dứt khoát (Vibrate 100ms), và khi đến âm lướt schwa chỉ rung siêu nhẹ (10ms) qua Navigator.vibrate API.",
          "completed": false
        }
      ],
      "technicalTasks": [
        {
          "id": "t-vn-103-fe-contrast",
          "title": "Xây dựng component StressVsToneComparison.jsx trình diễn trực quan sự khác biệt ngôn ngữ đơn lập vs đa âm tiết",
          "category": "Frontend",
          "completed": false
        },
        {
          "id": "t-vn-103-fe-haptic",
          "title": "Tích hợp Navigator.vibrate Haptic API rung theo nhịp trọng âm trên thiết bị di động",
          "category": "Frontend",
          "completed": false
        },
        {
          "id": "t-vn-103-be-schwa",
          "title": "Xây dựng thuật toán kiểm tra độ tập trung Formant nguyên âm schwa (Neutral Formant Proximity)",
          "category": "AI/DSP",
          "completed": false
        },
        {
          "id": "t-vn-103-be-cache",
          "title": "Thiết lập danh mục 500 từ vựng chứa âm schwa dễ nhầm lẫn nhất của người Việt lưu trong Redis",
          "category": "Backend",
          "completed": false
        }
      ],
      "notes": "### 🎯 FULLSTACK & PEDAGOGICAL FEATURE SPECIFICATION\n- **Phân loại**: Full-stack Pedagogical Feature (Linguistic Contrast + Schwa Formant Detection)\n- **UI Mockup**: `vietphonics-app/src/ui-reference/kh_u_h_nh_2d_th_vi_n_gi_i_ph_u_m_v_l1_light_mode/code.html`\n- **Frontend Component**: `vietphonics-app/src/components/prosody/StressVsToneVisualizer.jsx`\n\n#### 🎨 Linguistic Contrast Layout\n```\n+-------------------------------------------------------------+\n| TIẾNG VIỆT (Đơn lập - Syllable-timed)                       |\n| \"quả - chuối - tiêu\" -> Mỗi từ đều đặn ~200ms               |\n+-------------------------------------------------------------+\n| TIẾNG ANH (Đa âm tiết - Stress-timed)                       |\n| \"ba - NA - na\" -> /bə/ (50ms) - /'næn/ (300ms) - /ə/ (50ms) |\n| [Lướt nhẹ]          [VƯƠN CAO NGÂN DÀI]        [Lướt nhẹ]   |\n+-------------------------------------------------------------+\n```\n\n#### 🧮 Schwa Neutral Formant Proximity Formula\n```\nD_{neutral} = sqrt{(F1 - 500)^2 + (F2 - 1500)^2}\n```\n- Nếu `D_{neutral} < 150` và `duration < 70ms`: Đạt chuẩn Schwa thả lỏng hoàn hảo.\n- Nếu `F1 > 700` hoặc `duration > 150ms`: Vẫn đang phát âm nguyên âm mở hoàn toàn (chưa giảm âm).\n\n#### 🗄️ Backend API Contract\n```http\nPOST /api/v1/pedagogy/schwa-check\nContent-Type: application/json\n\n{\n  \"word\": \"banana\",\n  \"audioUrl\": \"https://r2.vietphonics.com/audio/session_604.opus\"\n}\n```",
      "createdAt": "2026-09-30T17:32:40.700Z"
    },
    {
      "id": "VN-104",
      "epicId": "epic-roleplay-ielts",
      "title": "IELTS Speaking Part 1 & 2 AI Mock Examiner for Vietnamese Learners: Giám Khảo AI Thi Thử IELTS Speaking Part 1 & 2",
      "persona": "Thí sinh người Việt đang ôn thi IELTS Speaking cần người chấm thi thử đúng format chuẩn IDP/BC mà không đủ chi phí thuê giáo viên bản ngữ chấm 1:1",
      "action": "thi thử phòng thi ảo với Giám khảo AI Sarah (London), trải nghiệm Part 1 (hỏi đáp ngắn 4 phút) và Part 2 (thẻ gợi ý Cue Card với 1 phút chuẩn bị và 2 phút nói liên tục)",
      "value": "tạo tâm lý phòng thi chân thực 100%, giải tỏa áp lực phòng thi thật và nhận bảng phân tích 4 tiêu chí chấm thi IELTS Speaking chính thức",
      "priority": "must",
      "status": "in-progress",
      "size": "XL",
      "points": 13,
      "acceptanceCriteria": [
        {
          "id": "ac-vn-104-exam-flow",
          "given": "Học viên bắt đầu bài thi thử IELTS Speaking Part 2",
          "when": "Giám khảo trao thẻ chủ đề Cue Card (ví dụ: \"Describe a piece of technology you find difficult to use\")",
          "then": "Hệ thống tự động kích hoạt đồng hồ đếm ngược 60 giây chuẩn bị kèm bảng ghi chú nháp ảo; hết 60s tự động chuyển sang trạng thái thu âm 2 phút nói liên tục.",
          "completed": true
        },
        {
          "id": "ac-vn-104-frontend-design",
          "given": "Giao diện phòng thi ảo IeltsMockExamView",
          "when": "Render trên màn hình",
          "then": "Không gian phòng thi phong cách British Council trang nhã, ảnh chân dung giám khảo Sarah với biểu cảm tự nhiên, đồng hồ đếm ngược kỹ thuật số hiển thị sắc nét bằng font JetBrains Mono, bảng ghi chú nháp Cue Card có thể gõ phím mượt mà.",
          "completed": true
        },
        {
          "id": "ac-vn-104-backend-design",
          "given": "5,000 thí sinh cùng tham gia thi thử trong mùa cao điểm",
          "when": "Hệ thống ghi âm và phân tích bài nói 2 phút",
          "then": "Audio được nén chuẩn Opus lưu trên Cloudflare R2, hàng đợi worker AI chia nhỏ phân đoạn chấm điểm 4 tiêu chí và trả về bảng điểm đầy đủ trong dưới 3 giây.",
          "completed": true
        },
        {
          "id": "ac-vn-104-l1-precision",
          "given": "Thí sinh người Việt hay gặp lỗi ngữ pháp về thì quá khứ (Past Tense -ed) trong Part 2",
          "when": "Giám khảo AI chấm tiêu chí Grammatical Range and Accuracy (GRA)",
          "then": "Chỉ ra chi tiết: \"Bạn đã quên chia thì quá khứ trong 4 động từ khi kể về kỷ niệm cũ, làm giảm điểm tiêu chí Ngữ pháp xuống Band 6.0\".",
          "completed": true
        },
        {
          "id": "ac-vn-104-a11y-fallback",
          "given": "Thí sinh muốn đọc lại câu hỏi của giám khảo",
          "when": "Bấm nút \"Xem văn bản câu hỏi\"",
          "then": "Hiển thị thẻ phụ đề câu hỏi rõ ràng có thể điều chỉnh cỡ chữ lớn (A+), hỗ trợ người khiếm thị hoặc người có khả năng nghe kém.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-vn-104-fe-room",
          "title": "Xây dựng giao diện IeltsMockRoomView với đồng hồ đếm ngược kỹ thuật số và bảng nháp Cue Card",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-vn-104-fe-timer",
          "title": "Triển khai hook useExamTimer quản lý chính xác 60s chuẩn bị và 120s nói liên tục",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-vn-104-be-examiner",
          "title": "Thiết kế AI Examiner Engine áp dụng đúng thang điểm chấm thi IELTS Speaking Band Descriptors công khai",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-vn-104-be-queue",
          "title": "Thiết lập hàng đợi BullMQ xử lý song song các bài nói 2 phút cho 5,000 thí sinh đồng thời",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-vn-104-qa",
          "title": "Kiểm thử độ chính xác chấm điểm đối chiếu với các cựu giám khảo IELTS thực tế",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/views/IeltsMockExamView.jsx`\n- **Component Hierarchy**:\n  ```\n  <IeltsMockExamView examPart={2} topicId=\"tech_difficult_use\">\n    <ExaminerVideoFrame examinerName=\"Sarah\" avatarUrl=\"/avatars/sarah.jpg\" isSpeaking={isExaminerSpeaking} />\n    <CueCardDrawer isOpen={isPreparationPhase}>\n      <CueCardText topic=\"Describe a piece of technology you find difficult to use\" prompts={prompts} />\n      <ScratchPadNotepad value={notes} onChange={setNotes} />\n      <PreparationCountdownTimer secondsRemaining={prepSeconds} />\n    </CueCardDrawer>\n    <ExamRecordingFooter isSpeaking={isSpeakingPhase} secondsRemaining={speechSeconds} />\n  </IeltsMockExamView>\n  ```\n- **Stitch Design Tokens**:\n  - Exam Room: `bg-slate-950 text-slate-100 min-h-screen flex flex-col items-center justify-between p-6`\n  - Cue Card: `bg-amber-50 text-slate-900 rounded-2xl p-6 shadow-2xl border-2 border-amber-200 max-w-md w-full`\n  - Timer: `font-mono text-3xl font-black text-rose-500 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800`.\n\n---\n\n### 🗄️ BACKEND DESIGN SPECIFICATION\n- **REST API Endpoint**:\n  ```http\n  POST /api/v1/ielts/mock-eval\n  Authorization: Bearer <JWT>\n  Content-Type: application/json\n\n  Request Body:\n  {\n    \"examPart\": 2,\n    \"topic\": \"Describe a piece of technology...\",\n    \"audioUrl\": \"https://r2.vietphonics.com/ielts/session_992.opus\",\n    \"prepNotes\": \"bought laptop 2 years ago, heavy, battery poor\"\n  }\n\n  Response 200 OK:\n  {\n    \"overallBand\": 6.5,\n    \"fluencyCoherence\": 6.5,\n    \"lexicalResource\": 7.0,\n    \"grammaticalAccuracy\": 6.0,\n    \"pronunciation\": 6.5,\n    \"examinerComments\": \"Good vocabulary range relating to technical devices. Work on past tense consistency.\"\n  }\n  ```\n- **Database Schema**:\n  ```sql\n  CREATE TABLE ielts_mock_records (\n    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n    part_number INT NOT NULL,\n    overall_band NUMERIC(2, 1) NOT NULL,\n    evaluation_json JSONB NOT NULL,\n    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\n  );\n  ```\n- **High Concurrency (5,000 Users)**:\n  - Worker GPU chạy Whisper phân đoạn audio 2 phút song song thành các chunk 30s giúp giảm 50% thời gian suy luận.",
      "createdAt": "2026-09-30T17:32:40.700Z"
    },
    {
      "id": "VN-105",
      "epicId": "epic-articulation",
      "title": "Vietnamese Native-Tongue Mouth & Tongue Placement Guides: Cẩm Nang Vị Trí Đặt Lưỡi & Khẩu Hình Đối Chiếu Tiếng Việt",
      "persona": "Người học Việt Nam cần những lời chỉ dẫn cấu âm bình dị, gần gũi, sử dụng các hình ảnh so sánh với tiếng mẹ đẻ để dễ hình dung",
      "action": "đọc cẩm nang hướng dẫn cấu âm chuyên biệt cho người Việt (e.g., \"Để phát âm /θ/, hãy tưởng tượng bạn đang chuẩn bị cắn nhẹ vào đầu lưỡi...\")",
      "value": "xóa bỏ rào cản thuật ngữ ngữ âm học khô khan, biến việc học phát âm thành các mẹo dân gian dễ nhớ và áp dụng được ngay tức khắc",
      "priority": "must",
      "status": "in-progress",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-vn-105-guide",
          "given": "Học viên xem hướng dẫn âm /ð/ (this, that)",
          "when": "Mở tab cẩm nang tiếng Việt",
          "then": "Hiển thị mẹo 3 bước: 1. Đặt lưỡi như âm /θ/, 2. Bật tiếng rung cổ họng như tiếng ong kêu \"zzz\", 3. Rụt lưỡi lại nhanh.",
          "completed": true
        },
        {
          "id": "ac-vn-105-frontend-design",
          "given": "Giao diện NativeTonguePlacementCard",
          "when": "Render trên màn hình",
          "then": "Thẻ bài phong cách cẩm nang hiện đại: Minh họa 3 bước hoạt hình trực quan, câu khẩu quyết ghi nhớ ngắn gọn đóng khung nổi bật, nút thử nghiệm micro ngay tại chỗ.",
          "completed": true
        },
        {
          "id": "ac-vn-105-backend-design",
          "given": "5,000 học viên tra cứu cẩm nang",
          "when": "Tải cẩm nang từ API GET /api/v1/phonetics/l1-guides",
          "then": "Dữ liệu được nạp từ Redis cache trong < 5ms.",
          "completed": true
        },
        {
          "id": "ac-vn-105-l1-precision",
          "given": "So sánh sự khác biệt cơ bản giữa khẩu hình tiếng Việt và tiếng Anh",
          "when": "Xem phần nguyên lý",
          "then": "Giải thích: Tiếng Việt cơ miệng mềm và thả lỏng, tiếng Anh cơ miệng căng hơn và có độ nén khí lớn hơn.",
          "completed": true
        },
        {
          "id": "ac-vn-105-a11y-fallback",
          "given": "Học viên muốn nghe đọc cẩm nang bằng tiếng Việt",
          "when": "Bấm nút \"Đọc Cẩm Nang\"",
          "then": "Hệ thống phát âm thanh tiếng Việt truyền cảm hướng dẫn từng bước.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-vn-105-fe-card",
          "title": "Xây dựng component L1MouthPlacementGuideCard.jsx với minh họa 3 bước trực quan",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-vn-105-be-content",
          "title": "Biên tập toàn bộ cẩm nang khẩu hình tiếng Việt cho 44 âm vị tiếng Anh",
          "category": "Pedagogy",
          "completed": true
        },
        {
          "id": "t-vn-105-qa",
          "title": "Kiểm thử mức độ dễ hiểu của cẩm nang đối với người học mới bắt đầu từ con số 0",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/components/articulation/NativeTonguePlacementGuide.jsx`\n- **Stitch Design Tokens**:\n  - Guide Container: `bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl`\n  - Step Badge: `w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 font-bold flex items-center justify-center`.",
      "createdAt": "2026-09-30T17:32:40.700Z"
    },
    {
      "id": "GAME-101",
      "epicId": "epic-gamified-3d",
      "title": "Multi-Tier Level Progression & 4-World Map Engine: Bản Đồ Phiêu Lưu Phát Âm Tuyến Tính 4 Thế Giới",
      "persona": "Người học trẻ tuổi (Gen Z, sinh viên đại học) dễ nản lòng khi học phát âm theo giáo trình truyền thống khô khan",
      "action": "khám phá bản đồ thế giới phiêu lưu 4 vùng đất (Đảo Nguyên Âm, Vịnh Âm Đuôi, Núi Trọng Âm, Đền Thờ Phản Xạ), vượt qua từng ải bài học để mở khóa màn chơi mới",
      "value": "duy trì động lực luyện tập hằng ngày thông qua lộ trình trực quan hóa dạng game RPG, tạo cảm giác chinh phục rõ rệt với cơ chế 3 sao và rương phần thưởng",
      "priority": "must",
      "status": "in-progress",
      "size": "L",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-game-101-progression",
          "given": "Người chơi hoàn thành ải 1 với điểm số phát âm từ 85% trở lên",
          "when": "Hệ thống tính điểm hoàn thành ải",
          "then": "Ải 1 được thưởng 3 sao vàng lấp lánh kèm hiệu ứng pháo hoa particle, đường mòn nối sang ải 2 phát sáng rực rỡ và mở khóa nút \"Bắt đầu Ải 2\" ngay lập tức mà không cần reload trang.",
          "completed": true
        },
        {
          "id": "ac-game-101-frontend-design",
          "given": "Giao diện bản đồ thế giới phiêu lưu GamifiedView",
          "when": "Render trên màn hình máy tính hoặc điện thoại di động",
          "then": "Bản đồ hiển thị 4 quần xã sinh thái độc đáo (Biển ngọc, Thung lũng xanh, Núi lửa tím, Đền cổ vàng kim) theo phong cách Isometric mượt mà, các node ải có hoạt ảnh nhấp nhô floating 60fps, viền sao gradient, huy hiệu tiến độ % hoàn thành thế giới hiển thị rõ trên thanh header.",
          "completed": true
        },
        {
          "id": "ac-game-101-backend-design",
          "given": "5,000 người chơi đồng thời di chuyển trên bản đồ và mở khóa ải",
          "when": "Đồng bộ hóa dữ liệu tiến trình chơi game lên máy chủ",
          "then": "Dữ liệu tiến trình ải được lưu tức thời vào LocalStorage client-side và đồng bộ ngầm (optimistic update + debounced batch POST 5s) qua REST endpoint POST /api/v1/game/progress; Redis cache lưu giữ map layout static JSON với TTL 24h, P95 độ trễ truy vấn tiến độ < 80ms.",
          "completed": true
        },
        {
          "id": "ac-game-101-l1-precision",
          "given": "Ải bài học thuộc Thế giới 2: Vịnh Âm Đuôi (Consonant Haven)",
          "when": "Người chơi mở chi tiết ải",
          "then": "Nhiệm vụ ải ghi rõ tiêu chuẩn diệt quái: \"Vượt qua thử thách phân biệt âm cuối /t/ vs /d/ và /s/ vs /z/ của người Việt\", kèm gợi ý mẹo rung thanh quản trước khi vào trận.",
          "completed": true
        },
        {
          "id": "ac-game-101-a11y-fallback",
          "given": "Người dùng điều hướng bằng bàn phím hoặc công nghệ hỗ trợ",
          "when": "Dùng phím Tab hoặc mũi tên trên bàn phím",
          "then": "Focus outline màu hồng rose-500 nhảy mượt qua từng node ải, thông báo rõ ràng \"Ải 3: Đã mở khóa - Đạt 2 trên 3 sao - Nhấn Enter để bắt đầu\", hỗ trợ phím tắt số 1-4 để chuyển đổi nhanh giữa 4 thế giới.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-game-101-fe-map",
          "title": "Xây dựng component GameMapCanvas.jsx hiển thị 4 thế giới sinh thái và các node ải kết nối bằng SVG Bezier curve",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-game-101-fe-sync",
          "title": "Triển khai cơ chế lưu tiến trình song song LocalStorage và REST sync API với cơ chế chống xung đột timestamp",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-game-101-be-cache",
          "title": "Thiết lập Redis hash user_game_progress_5000_v1 cho 5,000 active users với tốc độ đọc < 5ms",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-game-101-be-db",
          "title": "Thiết kế bảng game_progressions và map_levels trong PostgreSQL với compound index",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-game-101-qa",
          "title": "Viết bộ kiểm thử tự động kiểm tra logic mở khóa tuần tự 40 ải và xử lý ngoại lệ mất mạng khi đang chơi",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/views/GamifiedView.jsx`\n- **Component Hierarchy**:\n  ```\n  <GamifiedView currentWorld={activeWorld}>\n    <WorldNavigationHeader worlds={worldCatalog} activeWorld={activeWorld} onSelectWorld={setActiveWorld} />\n    <GameMapCanvas worldId={activeWorld.id}>\n      <PathSvgCurve nodes={activeWorld.nodes} />\n      {activeWorld.nodes.map(node => (\n        <LevelNodeMarker\n          key={node.id}\n          status={node.status} // 'locked' | 'unlocked' | 'mastered'\n          stars={node.stars}\n          onClick={() => handleStartLevel(node)}\n        />\n      ))}\n    </GameMapCanvas>\n    <PlayerStatsFloatBar xp={userXp} streak={userStreak} phonicsGems={gems} />\n  </GamifiedView>\n  ```\n- **Stitch Design Tokens**:\n  - World 1: Emerald `#10b981`, World 2: Sky `#0ea5e9`, World 3: Rose `#f43f5e`, World 4: Amber `#fbbf24`\n  - Node Unlocked: `w-16 h-16 rounded-3xl bg-white text-slate-900 font-black text-xl shadow-[0_10px_25px_rgba(0,0,0,0.3)] border-4 border-amber-400 hover:scale-110 transition-all cursor-pointer`\n  - Node Locked: `w-16 h-16 rounded-3xl bg-slate-800 text-slate-500 border-2 border-slate-700 opacity-60 flex items-center justify-center`.\n\n---\n\n### 🗄️ BACKEND DESIGN SPECIFICATION\n- **REST API Endpoint**:\n  ```http\n  POST /api/v1/game/progress\n  Authorization: Bearer <JWT>\n  Content-Type: application/json\n\n  Request Body:\n  {\n    \"userId\": \"usr_99a8b12f\",\n    \"levelId\": \"lvl_w2_03\",\n    \"starsEarned\": 3,\n    \"scorePercent\": 92.5,\n    \"completedAt\": \"2026-10-03T15:20:00Z\"\n  }\n\n  Response 200 OK:\n  {\n    \"success\": true,\n    \"unlockedNextLevelId\": \"lvl_w2_04\",\n    \"bonusXp\": 120,\n    \"totalGems\": 450,\n    \"unlockedPerk\": null\n  }\n  ```\n- **Database Schema**:\n  ```sql\n  CREATE TABLE user_game_progress (\n    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n    world_id VARCHAR(30) NOT NULL,\n    level_id VARCHAR(30) NOT NULL,\n    stars INT NOT NULL CHECK (stars BETWEEN 0 AND 3),\n    high_score NUMERIC(5, 2) NOT NULL DEFAULT 0.0,\n    is_completed BOOLEAN NOT NULL DEFAULT FALSE,\n    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),\n    CONSTRAINT uq_user_level UNIQUE(user_id, level_id)\n  );\n  ```\n- **High Concurrency (5,000 Users)**:\n  - Tiến trình game được nạp sẵn vào Redis in-memory cache `user:game_progress:{userId}`.\n  - Batching update định kỳ 5 giây/lần giảm 80% tải ghi database.",
      "createdAt": "2026-09-30T17:50:58.697Z"
    },
    {
      "id": "GAME-102",
      "epicId": "epic-gamified-3d",
      "title": "Dual Voice Controller: Real-Time Web Speech Microphone & Fallback Simulation: Bộ Điều Khiển Giọng Nói Kép Cho Game",
      "persona": "Người chơi tham gia chế độ chơi phát âm trong mọi hoàn cảnh (phòng yên tĩnh có mic, hoặc môi trường công cộng ồn ào)",
      "action": "kích hoạt micro để tung chiêu thức bằng giọng nói chuẩn, hoặc chuyển đổi mượt sang chế độ mô phỏng âm thanh kiểm thử (Dev/Simulator Mode) khi môi trường không tiện nói to",
      "value": "đảm bảo trải nghiệm chơi game không bao giờ bị gián đoạn vì lỗi phần cứng micro hoặc tiếng ồn xung quanh, tăng tính khả dụng 100% trong mọi kịch bản thực tế",
      "priority": "must",
      "status": "in-progress",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-game-102-dual-input",
          "given": "Người chơi đang trong trận chiến phát âm",
          "when": "Người chơi nói từ khóa hiển thị vào micro hoặc bấm nút mô phỏng \"Test Cast Spell\"",
          "then": "Hệ thống nhận diện phát âm thời gian thực với độ trễ phản hồi dưới 120ms, hiển thị thanh năng lượng âm thanh (RMS Energy Gauge) và kích hoạt hiệu ứng tung chiêu thức đánh quái vật.",
          "completed": true
        },
        {
          "id": "ac-game-102-frontend-design",
          "given": "Giao diện bảng điều khiển âm thanh game HUD",
          "when": "Micro bắt đầu thu âm",
          "then": "Nút micro tròn trung tâm tỏa sóng radar gradient Rose-Sky, đồng hồ đo decibel dB thời gian thực nhảy múa sống động, hiển thị trạng thái \"Đang lắng nghe: Hãy nói rõ âm /t/!\" với font chữ JetBrains Mono hiển thị độ trễ latency 18ms.",
          "completed": true
        },
        {
          "id": "ac-game-102-backend-design",
          "given": "5,000 phiên thu âm diễn ra đồng thời trong các màn chơi game",
          "when": "Xử lý nhận diện và phân tích tín hiệu giọng nói",
          "then": "Toàn bộ việc nhận diện từ khóa và trích xuất đặc trưng âm thanh được xử lý cục bộ trên trình duyệt thông qua Web Speech API SpeechRecognition và Web Audio AnalyserNode, máy chủ backend chịu tải 0% CPU cho việc xử lý âm thanh thời gian thực của game.",
          "completed": true
        },
        {
          "id": "ac-game-102-l1-precision",
          "given": "Người chơi phát âm từ \"cat\" nhưng nói thành \"cát\" (thiếu âm bật hơi /t/)",
          "when": "Bộ phân tích kiểm tra đặc trưng âm học",
          "then": "Chiêu thức bắn ra bị giảm 50% sát thương (Glancing Hit), trên màn hình hiển thị lời nhắc chiến thuật: \"Thiếu âm đuôi /t/! Bật đầu lưỡi vào vòm họng để tung đòn chí mạng (Critical Hit)!\".",
          "completed": true
        },
        {
          "id": "ac-game-102-a11y-fallback",
          "given": "Người chơi bị khiếm thính hoặc gặp lỗi cấp quyền micro",
          "when": "Trình duyệt từ chối quyền truy cập micro",
          "then": "Hệ thống hiển thị banner lịch sự kèm nút chuyển ngay sang chế độ \"Bàn phím + Máy tạo âm ảo (Voice Synthesizer Fallback)\" cho phép chơi game luyện mắt và nhận diện ngữ âm mà không bị khóa tính năng.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-game-102-fe-audio",
          "title": "Tích hợp Web Audio API AnalyserNode tính toán RMS decibel và Pitch trực tiếp trên AudioContext",
          "category": "Audio/DSP",
          "completed": true
        },
        {
          "id": "t-game-102-fe-hook",
          "title": "Xây dựng hook useGameSpeechRecognition với khả năng tự phục hồi (auto-reconnect) khi Web Speech API bị drop",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-game-102-fe-sim",
          "title": "Phát triển bộ giả lập VoiceSimulator phát sóng sine và gửi mock transcript hỗ trợ kiểm thử không cần micro",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-game-102-be-arch",
          "title": "Thiết kế kiến trúc Client-First DSP loại bỏ hoàn toàn gánh nặng streaming âm thanh thô lên server cho 5,000 user",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-game-102-qa",
          "title": "Kiểm thử khả năng chịu lỗi khi người dùng cắm/rút tai nghe hoặc đổi thiết bị thu âm giữa trận đánh",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/components/game/VoiceController.jsx`\n- **Stitch Design Tokens**:\n  - Voice HUD Container: `bg-slate-900/90 border border-slate-800 rounded-3xl p-4 flex items-center justify-between shadow-2xl`\n  - RMS Meter: `h-2 rounded-full bg-slate-800`, Active Fill: `bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500`\n  - Latency Badge: `font-mono text-xs text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30`.\n\n---\n\n### 🗄️ BACKEND DESIGN SPECIFICATION\n- **Client-First Edge Architecture**:\n  - Không cần gửi streaming audio lên server; 100% DSP tính trên client AudioContext.\n  - Chỉ gửi telemetry định kỳ: `POST /api/v1/telemetry/game-audio` (batching 30s) kiểm tra tỷ lệ lỗi micro.",
      "createdAt": "2026-09-30T17:50:58.697Z"
    },
    {
      "id": "GAME-103",
      "epicId": "epic-gamified-3d",
      "title": "Auditory Discrimination Boss Arenas & Turn-Based Minimal Pair Counter-Spells: Đấu Trường Trùm Phân Biệt Cặp Âm Tối Thiểu",
      "persona": "Học viên đã học lý thuyết các cặp âm dễ nhầm lẫn nhưng hay mất tập trung và phản xạ chậm trong giao tiếp thực tế",
      "action": "đối đầu với các Boss Quái Thú Ngữ Âm (The Final-T Titan, The Schwa Dragon, The Vowel Chimera) theo cơ chế chiến đấu theo lượt (Turn-based RPG), nghe âm thanh trùm tung ra và chọn thần chú phản đòn chính xác",
      "value": "biến bài tập phân biệt cặp âm tối thiểu (minimal pairs e.g., ship/sheep, bad/bed) thành trải nghiệm kịch tính nghẹt thở, rèn luyện đôi tai nhạy bén tuyệt đối chỉ trong 5 phút chơi",
      "priority": "must",
      "status": "in-progress",
      "size": "L",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-game-103-boss-combat",
          "given": "Người chơi đối đầu với Boss \"The Final-T Titan\" (100 HP)",
          "when": "Trùm chuẩn bị tung chiêu búa sét và phát ra âm thanh thử thách e.g. \"beat\" (/biːt/)",
          "then": "Màn hình hiển thị 2 thẻ bài thần chú phản đòn: [1] \"bit\" (/bɪt/) vs [2] \"beat\" (/biːt/); người chơi chọn đúng \"beat\" trong vòng 3.5 giây sẽ tung đòn phản công gây 35 sát thương và làm choáng Boss.",
          "completed": true
        },
        {
          "id": "ac-game-103-frontend-design",
          "given": "Giao diện đấu trường Boss Arena View",
          "when": "Trận chiến bắt đầu",
          "then": "Thanh máu Boss hoành tráng đỏ rực rỡ có hiệu ứng rung lắc (screen shake) khi nhận sát thương, nhân vật người chơi hiển thị thanh mana xanh lam, thẻ bài ma thuật có viền kính mờ glassmorphism bo tròn 16px và âm thanh vung kiếm/bắn phép chân thực.",
          "completed": true
        },
        {
          "id": "ac-game-103-backend-design",
          "given": "Hàng ngàn trận Boss diễn ra đồng thời trong giờ cao điểm",
          "when": "Hệ thống tải tài nguyên âm thanh và hoạt ảnh trận đánh",
          "then": "Toàn bộ âm thanh trận đánh (tiếng trùm gầm, tiếng phép thuật, mẫu phát âm bản ngữ HD) được nén chuẩn Opus bitrate 48kbps và nạp sẵn vào trình duyệt qua HTML5 Audio Buffer Cache, không phát sinh bất kỳ yêu cầu mạng nào giữa trận đánh.",
          "completed": true
        },
        {
          "id": "ac-game-103-l1-precision",
          "given": "Cặp âm đối kháng nhắm vào lỗi phổ biến nhất của người Việt",
          "when": "Trùm tung chiêu cặp âm /iː/ (căng) vs /ɪ/ (chùng) hoặc /s/ vs /ʃ/",
          "then": "Hệ thống hiển thị kính lúp âm học giải thích ngay sau mỗi lượt đánh: \"Từ vừa nghe có nguyên âm dài /iː/ kéo dài 220ms, miệng kéo bè sang hai bên như đang mỉm cười\".",
          "completed": true
        },
        {
          "id": "ac-game-103-a11y-fallback",
          "given": "Người chơi sử dụng phím số để chọn bài",
          "when": "Bấm phím 1 hoặc 2 trên bàn phím",
          "then": "Hệ thống nhận diện phím bấm ngay lập tức mà không cần di chuột, hỗ trợ chế độ làm chậm nhịp độ trận đấu (Slow-Motion Combat Mode) cho người mới bắt đầu.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-game-103-fe-arena",
          "title": "Xây dựng component BossArenaView.jsx với hệ thống animation thanh máu, rung màn hình (shake effect) và thẻ bài ma thuật",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-game-103-fe-audio",
          "title": "Tiền tải (Preload) toàn bộ ngân hàng âm thanh cặp từ tối thiểu Minimal Pairs Audio Kit với Web Audio API",
          "category": "Audio/DSP",
          "completed": true
        },
        {
          "id": "t-game-103-be-boss",
          "title": "Xây dựng State Machine và catalog dữ liệu 10 Boss ngữ âm trong cơ sở dữ liệu",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-game-103-be-cdn",
          "title": "Triển khai nén audio Opus 48kbps và Cloudflare R2 cache rules giúp phục vụ 5,000 trận Boss cùng lúc với băng thông tối thiểu",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-game-103-qa",
          "title": "Kiểm thử cân bằng độ khó (game balancing) cho 3 Boss đầu tiên đảm bảo tỷ lệ vượt ải lần đầu đạt 65-75%",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/views/BossArenaView.jsx`\n- **Stitch Design Tokens**:\n  - Boss HP Bar: `h-5 rounded-full bg-slate-950 border border-slate-700 overflow-hidden`, Fill: `bg-gradient-to-r from-rose-600 to-amber-500 transition-all duration-300`\n  - Spell Card: `p-5 rounded-2xl bg-slate-900/80 border-2 border-indigo-500/50 hover:border-indigo-400 backdrop-blur-md shadow-xl cursor-pointer active:scale-95`.\n\n---\n\n### 🗄️ BACKEND DESIGN SPECIFICATION\n- **REST API Endpoint**:\n  ```http\n  POST /api/v1/game/boss-battle-result\n  Authorization: Bearer <JWT>\n  Content-Type: application/json\n\n  Request Body:\n  {\n    \"bossId\": \"boss_final_t_titan\",\n    \"victory\": true,\n    \"damageDealt\": 105,\n    \"accuracyPercent\": 88.0,\n    \"durationSec\": 125\n  }\n\n  Response 200 OK:\n  {\n    \"bossDefeated\": true,\n    \"trophyEarned\": \"trophy_titan_slayer\",\n    \"xpAwarded\": 250,\n    \"leaderboardRank\": 14\n  }\n  ```",
      "createdAt": "2026-09-30T17:50:58.697Z"
    },
    {
      "id": "GAME-104",
      "epicId": "epic-gamified-3d",
      "title": "Zero-Latency Web Audio API Sound Synthesizer & 3D Isometric Combat Canvas: Bộ Tổng Hợp Âm Thanh Không Độ Trễ & Đồ Họa Đẳng Cự 60 FPS",
      "persona": "Người dùng chơi game trên máy tính cấu hình khiêm tốn hoặc trình duyệt di động đòi hỏi hiệu năng cao và âm thanh sống động",
      "action": "trải nghiệm các hiệu ứng âm thanh sống động (tiếng chém kiếm, tiếng thu thập tiền vàng, tiếng nổ phép thuật) được tổng hợp trực tiếp bằng thuật toán toán học mà không tốn dung lượng tải file",
      "value": "đạt tốc độ khởi động game tức thì (Zero Asset Download Time), giảm thiểu 95% băng thông mạng cho máy chủ và loại bỏ độ trễ âm thanh thường thấy của thẻ HTML5 Audio",
      "priority": "should",
      "status": "in-progress",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-game-104-synth",
          "given": "Người chơi gây sát thương hoặc nhặt sao may mắn",
          "when": "Hàm phát âm thanh game triggerAudioFX(type) được gọi",
          "then": "Hệ thống dùng AudioContext.createOscillator() và GainNode để tổng hợp sóng vuông/sóng sine với envelope ADSR tùy chỉnh trong vòng 0ms, phát ra tiếng bip-bop retro 8-bit hoặc chimes ma thuật trong trẻo.",
          "completed": true
        },
        {
          "id": "ac-game-104-frontend-design",
          "given": "Khung canvas đồ họa trận đánh 3D Isometric",
          "when": "Render liên tục bằng requestAnimationFrame",
          "then": "Khung hình duy trì ổn định 60 khung hình/giây (60 FPS), các hạt particle sao vàng bay tỏa ra từ mục tiêu và rơi xuống mượt mà không gây giật lag hay rò rỉ bộ nhớ (zero memory leak).",
          "completed": true
        },
        {
          "id": "ac-game-104-backend-design",
          "given": "5,000 phiên canvas chạy đồng thời trên hàng ngàn trình duyệt học viên",
          "when": "Kiểm tra tài nguyên máy chủ và tải CPU máy khách",
          "then": "Tài nguyên mạng backend tiêu thụ = 0 KB nhờ tạo âm thanh thủ tục (procedural synthesis); client CPU duy trì dưới 12% trên chip Intel Core i3 / Snapdragon 680 tầm trung.",
          "completed": true
        },
        {
          "id": "ac-game-104-l1-precision",
          "given": "Âm thanh phản hồi khi học viên phát âm đúng trọng âm tiếng Anh",
          "when": "Hệ thống phát tín hiệu thành công",
          "then": "Âm sắc tổng hợp có tần số cao vút mô phỏng sự vươn cao của cao độ trọng âm (High Pitch Rise), củng cố nhận thức giác quan về bản chất ngữ điệu tiếng Anh.",
          "completed": true
        },
        {
          "id": "ac-game-104-a11y-fallback",
          "given": "Người chơi bị nhạy cảm ánh sáng (photosensitive) hoặc muốn tắt âm thanh",
          "when": "Bật toggle \"Chế độ giảm hiệu ứng (Reduced Motion)\" hoặc \"Tắt tiếng SFX\"",
          "then": "Hệ thống tắt toàn bộ hạt nổ chớp sáng và ngắt audio context ngay lập tức, tuân thủ tiêu chuẩn WCAG 2.1 AAA.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-game-104-fe-synth",
          "title": "Xây dựng module SoundSynthesizer.js sử dụng Web Audio API OscillatorNode cho 8 loại hiệu ứng game SFX",
          "category": "Audio/DSP",
          "completed": true
        },
        {
          "id": "t-game-104-fe-canvas",
          "title": "Tối ưu hóa vòng lặp render Isometric Canvas với cơ chế Object Pooling tái sử dụng mảng Particle",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-game-104-fe-safari",
          "title": "Xử lý chính sách âm thanh autoplay và mở khóa AudioContext trên Safari iOS khi người dùng chạm màn hình lần đầu",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-game-104-be-zero",
          "title": "Đo kiểm benchmark hiệu năng đảm bảo không tiêu tốn băng thông CDN cho asset âm thanh hiệu ứng",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-game-104-qa",
          "title": "Kiểm thử stress-test chạy 200 lượt phát âm thanh dồn dập không làm nghẽn luồng UI chính (Main Thread)",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/utils/soundEffects.js`\n- **Procedural Sound Engine**:\n  ```javascript\n  export function playSynthSfx(type) {\n    const ctx = getAudioContext();\n    const osc = ctx.createOscillator();\n    const gain = ctx.createGain();\n    osc.connect(gain);\n    gain.connect(ctx.destination);\n    \n    if (type === 'hit') {\n      osc.type = 'sawtooth';\n      osc.frequency.setValueAtTime(150, ctx.currentTime);\n      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.12);\n      gain.gain.setValueAtTime(0.4, ctx.currentTime);\n      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.12);\n      osc.start();\n      osc.stop(ctx.currentTime + 0.12);\n    }\n  }\n  ```\n- **Zero Server Overhead**: 0 byte audio SFX asset downloads.",
      "createdAt": "2026-09-30T17:50:58.697Z"
    },
    {
      "id": "GAME-105",
      "epicId": "epic-gamified-3d",
      "title": "RPG Equipment Inventory, Perk System & University Leaderboard Ranks: Túi Đồ Trang Bị, Kỹ Năng Bổ Trợ & Bảng Xếp Hạng Trường Đại Học",
      "persona": "Sinh viên các trường đại học tại Việt Nam (Bách Khoa, Ngoại Thương, Kinh Tế...) có tính cạnh tranh cao và tinh thần màu cờ sắc áo",
      "action": "trang bị các vật phẩm RPG (Khiên Đóng Băng Chuỗi, Đũa Phép Bật Âm, Tai Nghe Vàng) và tích lũy điểm kinh nghiệm XP để đưa trường đại học của mình lên top 1 bảng xếp hạng",
      "value": "kích hoạt hiệu ứng tâm lý thi đua lành mạnh và lòng tự hào trường học, tạo ra động lực nội tại mạnh mẽ giúp học viên vào app luyện nói mỗi ngày",
      "priority": "should",
      "status": "in-progress",
      "size": "L",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-game-105-inventory",
          "given": "Người chơi tích lũy đủ 500 Kim Cương Phonics trong game",
          "when": "Người chơi mở Cửa Hàng Trang Bị và mua \"Khiên Bảo Vệ Chuỗi Luyện Tập (Streak Freeze Shield)\"",
          "then": "Vật phẩm xuất hiện trong Túi Đồ (Inventory) với biểu tượng khiên băng 3D phát sáng, sẵn sàng tự động kích hoạt bảo vệ nếu người chơi quên luyện tập 1 ngày.",
          "completed": true
        },
        {
          "id": "ac-game-105-frontend-design",
          "given": "Giao diện Bảng Xếp Hạng Liên Trường (University Leaderboard View)",
          "when": "Mở tab Bảng Xếp Hạng",
          "then": "Top 3 trường đại học dẫn đầu hiển thị trên bục vinh quang 3D hoành tráng (Hạng 1: Vàng kim rực rỡ, Hạng 2: Bạc lấp lánh, Hạng 3: Đồng cổ điển), logo các trường đại học lớn tại Việt Nam hiển thị sắc nét, thanh tiến độ điểm trường của người dùng được ghim cố định ở đáy màn hình.",
          "completed": true
        },
        {
          "id": "ac-game-105-backend-design",
          "given": "5,000 học viên liên tục ghi điểm XP từ các bài luyện phát âm",
          "when": "Cập nhật bảng xếp hạng trường học và cá nhân theo thời gian thực",
          "then": "Sử dụng cấu trúc dữ liệu Redis Sorted Sets (ZADD, ZREVRANGEBYSCORE) với độ phức tạp thuật toán O(log(N)), đảm bảo tính toán thứ hạng cho 5,000 học viên và 100 trường học trong thời gian dưới 20ms mà không gây nghẽn database PostgreSQL chính.",
          "completed": true
        },
        {
          "id": "ac-game-105-l1-precision",
          "given": "Trang bị vật phẩm \"Kính Lúp Cấu Âm (Phoneme Lens)\"",
          "when": "Người chơi vào các bài luyện âm khó như /θ/ hay /ð/",
          "then": "Túi đồ tự động kích hoạt Perk đặc biệt: Làm chậm tốc độ mẫu phát âm của người bản ngữ 20% và phóng to hình ảnh khẩu hình lưỡi đặt giữa hai hàm răng.",
          "completed": true
        },
        {
          "id": "ac-game-105-a11y-fallback",
          "given": "Người dùng tra cứu vị trí thứ hạng của mình",
          "when": "Sử dụng trình đọc màn hình TalkBack/NVDA",
          "then": "Hệ thống đọc rõ: \"Bạn đang xếp hạng 14 trên 5,000 sinh viên Đại học Bách Khoa Hà Nội, cần thêm 120 điểm XP để lên hạng 13\".",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-game-105-fe-board",
          "title": "Xây dựng giao diện LeaderboardView với bục vinh quang Podium Top 3 và danh sách bảng xếp hạng liên trường",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-game-105-fe-store",
          "title": "Thiết kế hệ thống Inventory và Perk Store với Modal mua đồ và trang bị vật phẩm trực quan",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-game-105-be-redis",
          "title": "Triển khai Redis Sorted Sets leaderboard service cho 5,000 users với background cron sync về PostgreSQL mỗi 5 phút",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-game-105-be-db",
          "title": "Thiết kế bảng user_inventories và university_rankings trong PostgreSQL",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-game-105-qa",
          "title": "Kiểm thử kịch bản đồng thời 500 sinh viên nộp điểm XP cùng lúc xem bảng xếp hạng có cập nhật chính xác",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/views/LeaderboardView.jsx`\n- **Stitch Design Tokens**:\n  - Podium Rank 1: `h-36 bg-gradient-to-t from-amber-500 to-yellow-400 text-slate-950 font-black rounded-t-3xl shadow-[0_0_35px_rgba(245,158,11,0.5)] flex flex-col items-center justify-end p-4`\n  - Podium Rank 2: `h-28 bg-gradient-to-t from-slate-400 to-slate-200 text-slate-950 font-bold rounded-t-3xl flex flex-col items-center justify-end p-4`\n  - Podium Rank 3: `h-24 bg-gradient-to-t from-amber-800 to-amber-700 text-white font-bold rounded-t-3xl flex flex-col items-center justify-end p-4`.\n\n---\n\n### 🗄️ BACKEND DESIGN SPECIFICATION\n- **REST API Endpoint**:\n  ```http\n  GET /api/v1/leaderboard/university?limit=10\n  Authorization: Bearer <JWT>\n\n  Response 200 OK:\n  {\n    \"myRank\": 14,\n    \"myUniversity\": \"Đại Học Bách Khoa Hà Nội\",\n    \"topUniversities\": [\n      { \"rank\": 1, \"name\": \"ĐH Bách Khoa Hà Nội\", \"totalXp\": 482900, \"activeStudents\": 820 },\n      { \"rank\": 2, \"name\": \"ĐH Ngoại Thương FTU\", \"totalXp\": 421500, \"activeStudents\": 690 },\n      { \"rank\": 3, \"name\": \"ĐH Kinh Tế Quốc Dân NEU\", \"totalXp\": 389000, \"activeStudents\": 550 }\n    ]\n  }\n  ```\n- **High Concurrency (5,000 Users)**:\n  - Redis Commands: `ZINCRBY leaderboard:uni:weekly 50 \"HUST\"`, `ZREVRANGE leaderboard:uni:weekly 0 9 WITHSCORES` chạy O(log N) < 2ms.",
      "createdAt": "2026-09-30T17:50:58.697Z"
    },
    {
      "id": "ELSA-102",
      "epicId": "epic-diagnostic",
      "title": "Native Language (L1) Regional Dialect Calibration: Hiệu Chuẩn Ngữ Điệu Vùng Miền Việt Nam (Bắc - Trung - Nam)",
      "persona": "Người học tiếng Anh tại 3 miền Bắc, Trung, Nam của Việt Nam có các thói quen phát âm tiếng mẹ đẻ (L1) rất khác nhau",
      "action": "chọn vùng miền xuất thân hoặc đọc đoạn âm thanh ngắn để hệ thống tự động căn chỉnh trọng số phát hiện lỗi theo phương ngữ địa phương",
      "value": "tránh bị phạt điểm oan do chất giọng địa phương, đồng thời nhận lộ trình bài tập tập trung chính xác vào tật phát âm đặc trưng của vùng miền mình",
      "priority": "must",
      "status": "done",
      "size": "L",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-elsa-102-select-region",
          "given": "Màn hình cài đặt vùng miền hiển thị 3 tùy chọn: Miền Bắc, Miền Trung, Miền Nam",
          "when": "Người dùng click chọn \"Miền Bắc (Northern)\"",
          "then": "Hệ thống kích hoạt profile lỗi L1: Tăng độ nhạy phát hiện nhầm lẫn /l/ và /n/, giảm độ gắt đối với âm /r/ uốn lưỡi, và lưu cấu hình vào hồ sơ người dùng.",
          "completed": true
        },
        {
          "id": "ac-elsa-102-audio-calibration",
          "given": "Người dùng chọn chế độ \"Tự động nhận diện phương ngữ qua giọng nói\"",
          "when": "Người dùng đọc câu kiểm tra: \"Look at the little light shining at night\"",
          "then": "Bộ phân tích âm học đo đạc độ mở nguyên âm và cách bật âm /l/-/n/, tự động đề xuất phương ngữ Miền Bắc với độ tin cậy > 88%.",
          "completed": true
        },
        {
          "id": "ac-elsa-102-curriculum-adaptation",
          "given": "Tài khoản đã hoàn tất hiệu chuẩn vùng miền",
          "when": "Người dùng vào trang Lộ trình học tập cá nhân",
          "then": "Module 1 trong lộ trình tự động đổi tên thành \"Khắc phục bẫy âm L/N cho người miền Bắc\" thay vì lộ trình chung chung.",
          "completed": true
        },
        {
          "id": "ac-elsa-102-switch-region",
          "given": "Người dùng muốn thay đổi vùng miền bất kỳ lúc nào",
          "when": "Vào phần Cài đặt tài khoản và chọn lại vùng miền khác",
          "then": "Toàn bộ trọng số chấm điểm và danh sách bài tập ưu tiên được cập nhật lại ngay lập tức mà không làm mất lịch sử điểm số cũ.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-102-ui",
          "title": "Xây dựng DialectSelectorCard với bản đồ 3 miền tương tác và badge mô tả lỗi đặc thù",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-102-api",
          "title": "Tạo API POST /api/v1/user/dialect-profile lưu cấu hình vùng miền vào bảng user_profiles",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-102-weights",
          "title": "Định nghĩa ma trận trọng số âm vị L1 (Phoneme Penalty Weight Matrix) cho 3 miền",
          "category": "AI/DSP",
          "completed": true
        },
        {
          "id": "t-102-qa",
          "title": "Kiểm thử hộp đen chuyển đổi qua lại giữa 3 miền xem danh sách bài gợi ý có đổi theo",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎯 FULLSTACK FEATURE SPECIFICATION\n- **Phân loại**: Full-stack Integration (Frontend Selection + Backend Penalty Weights)\n- **UI Mockup**: `vietphonics-app/src/ui-reference/ng_nh_p_nh_chu_n_gi_ng_l1_light_mode/code.html`\n- **Frontend Component**: `vietphonics-app/src/components/diagnostic/DialectCalibrationModal.jsx`\n\n#### 🎨 Frontend Interface\n- **State**: `selectedRegion: 'northern' | 'central' | 'southern'`, `confidenceScore: number`.\n- **Interactions**: Click chọn vùng miền -> Thẻ đổi viền sang màu chủ đạo (Bắc: Sky-500, Trung: Amber-500, Nam: Emerald-500) -> Hiện danh sách 3 lỗi phát âm phổ biến nhất của miền đó.\n\n#### 🗄️ Backend API & Data Contract\n```http\nPOST /api/v1/user/dialect-profile\nAuthorization: Bearer <JWT>\nContent-Type: application/json\n\n{\n  \"region\": \"northern\",\n  \"calibrationMode\": \"manual_selection\"\n}\n```\n- **Database Storage**:\n  - Lưu vào cột `dialect_preference` trong bảng `users` (PostgreSQL/SQLite).\n  - Cache ma trận trọng số vào Redis key `user:weights:{userId}` để worker chấm điểm đọc trực tiếp.",
      "createdAt": "2026-10-01T16:22:31.743Z"
    },
    {
      "id": "USER-101",
      "epicId": "epic-retention",
      "title": "Learner Authentication, Pronunciation Mastery Dashboard & Practice Recording History: Xác Thực Người Dùng, Bảng Điều Khiển Tổng Quan & Lịch Sử Ghi Âm",
      "persona": "Học viên muốn có một trung tâm điều khiển cá nhân (Personal Learning Hub) để quản lý tài khoản, theo dõi tiến độ tổng thể và nghe lại sự tiến bộ của mình",
      "action": "đăng nhập nhanh bằng Google/Email, xem biểu đồ radar 5 kỹ năng phát âm, tra cứu lịch sử các bài ghi âm đã thực hiện và tải về file âm thanh đối chiếu",
      "value": "tạo sự minh bạch tuyệt đối về sự tiến bộ của học viên theo thời gian, chứng minh giá trị học tập rõ ràng giúp tăng sự hài lòng và niềm tin vào ứng dụng",
      "priority": "must",
      "status": "in-progress",
      "size": "XL",
      "points": 13,
      "acceptanceCriteria": [
        {
          "id": "ac-user-101-auth-dashboard",
          "given": "Học viên đăng nhập thành công vào hệ thống",
          "when": "Truy cập vào trang Dashboard tổng quan",
          "then": "Hệ thống hiển thị ảnh đại diện, hạng thành viên (Free/Pro), điểm trung bình toàn diện (Overall Pronunciation Score), tổng số từ đã luyện và biểu đồ phân tích 5 trụ cột phát âm (Nguyên âm, Âm cuối, Trọng âm, Ngữ điệu, Nối âm).",
          "completed": true
        },
        {
          "id": "ac-user-101-frontend-design",
          "given": "Giao diện DashboardView và RecordingHistoryView",
          "when": "Render trên màn hình độ phân giải từ 375px đến 4K",
          "then": "Bố cục lưới Grid linh hoạt chuẩn Google Stitch: 4 thẻ thống kê số liệu (Metric KPI cards) ở trên cùng có hiệu ứng đổ bóng thanh lịch, biểu đồ Radar chart mượt mà sử dụng SVG vector, bảng lịch sử ghi âm có bộ lọc theo điểm số (Xanh lá >80%, Vàng 60-79%, Đỏ <60%).",
          "completed": true
        },
        {
          "id": "ac-user-101-backend-design",
          "given": "5,000 học viên đồng thời tải trang Dashboard cá nhân",
          "when": "Hệ thống tính toán các chỉ số thống kê và nạp 20 bản ghi âm gần nhất",
          "then": "Sử dụng View vật lý hóa (Materialized View) hoặc Redis caching tổng hợp điểm số định kỳ 10 phút/lần; các file audio ghi âm được phục vụ qua CDN có cache-control immutable, P95 thời gian tải toàn trang dưới 350ms.",
          "completed": true
        },
        {
          "id": "ac-user-101-l1-precision",
          "given": "Bảng tóm tắt lỗi âm học đặc thù của người Việt",
          "when": "Học viên xem phần \"Vùng Cần Cải Thiện\"",
          "then": "Hệ thống liệt kê top 3 âm vị tiếng Anh bị ảnh hưởng nặng nhất bởi thói quen L1 tiếng Việt kèm nút \"Luyện tập ngay\" dẫn thẳng vào bài khắc phục chuyên sâu.",
          "completed": true
        },
        {
          "id": "ac-user-101-a11y-fallback",
          "given": "Học viên thao tác với bảng lịch sử ghi âm",
          "when": "Sử dụng bàn phím di chuyển giữa các dòng",
          "then": "Các nút Play/Pause âm thanh có nhãn aria-label rõ ràng: \"Phát bản ghi âm từ 'thought' thực hiện ngày 02 tháng 10 năm 2026, điểm số 88%\", hỗ trợ phím Space để bật/tắt âm thanh.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-user-101-fe-dash",
          "title": "Xây dựng giao diện DashboardView hoàn chỉnh với 4 KPI cards, Radar Chart và bảng danh sách Audio History",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-user-101-be-auth",
          "title": "Tích hợp xác thực JWT an toàn kết hợp OAuth2 Google/Facebook và lưu refresh token trong HttpOnly cookie",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-user-101-be-db",
          "title": "Thiết kế bảng practice_sessions có quan hệ 1-N với audio_records và compound index trên (user_id, created_at DESC)",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-user-101-be-cdn",
          "title": "Triển khai Cloudflare CDN edge caching cho các file audio ghi âm của học viên phục vụ 5,000 users",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-user-101-qa",
          "title": "Kiểm thử tự động End-to-End từ bước đăng nhập, nộp bài phát âm đến khi bản ghi xuất hiện trong Audio History",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/views/DashboardView.jsx`\n- **Component Hierarchy**:\n  ```\n  <DashboardView user={currentUser}>\n    <KpiMetricsRow>\n      <KpiCard title=\"Words Practiced\" value={1420} icon=\"mic\" color=\"sky\" />\n      <KpiCard title=\"Overall Accuracy\" value=\"84.5%\" icon=\"award\" color=\"rose\" />\n      <KpiCard title=\"Current Streak\" value=\"12 Days\" icon=\"flame\" color=\"amber\" />\n      <KpiCard title=\"Subscription\" value=\"PRO\" icon=\"crown\" color=\"indigo\" />\n    </KpiMetricsRow>\n    <PronunciationRadarChart scores={pillarScores} />\n    <AudioRecordingHistoryTable recordings={recordings} onPlay={playRecording} />\n  </DashboardView>\n  ```\n- **Stitch Design Tokens**:\n  - KPI Card: `bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg flex items-center justify-between`\n  - Table Row: `border-b border-slate-800/60 hover:bg-slate-800/40 transition-colors p-4`.\n\n---\n\n### 🗄️ BACKEND DESIGN SPECIFICATION\n- **REST API Endpoint**:\n  ```http\n  GET /api/v1/user/dashboard-summary\n  Authorization: Bearer <JWT>\n\n  Response 200 OK:\n  {\n    \"userId\": \"usr_99a8b12f\",\n    \"totalWordsPracticed\": 1420,\n    \"overallAccuracy\": 84.5,\n    \"streakDays\": 12,\n    \"tier\": \"pro\",\n    \"pillars\": {\n      \"vowels\": 88,\n      \"endingSounds\": 78,\n      \"wordStress\": 85,\n      \"intonation\": 82,\n      \"connectedSpeech\": 80\n    },\n    \"recentRecordings\": [\n      {\n        \"id\": \"rec_01\",\n        \"word\": \"thought\",\n        \"ipa\": \"/θɔːt/\",\n        \"score\": 92,\n        \"audioUrl\": \"https://r2.../thought.opus\",\n        \"createdAt\": \"2026-10-03T14:30:00Z\"\n      }\n    ]\n  }\n  ```\n- **Database Schema**:\n  ```sql\n  CREATE TABLE practice_sessions (\n    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n    overall_score NUMERIC(5, 2) NOT NULL,\n    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\n  );\n  CREATE TABLE practice_audio_records (\n    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    session_id UUID REFERENCES practice_sessions(id) ON DELETE CASCADE,\n    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n    word VARCHAR(100) NOT NULL,\n    score NUMERIC(5, 2) NOT NULL,\n    audio_r2_path TEXT NOT NULL,\n    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\n  );\n  CREATE INDEX idx_audio_records_user ON practice_audio_records(user_id, created_at DESC);\n  ```\n- **High Concurrency (5,000 Users)**:\n  - Cache summary trong Redis `user:dashboard:{userId}` với TTL 600s.",
      "createdAt": "2026-10-01T16:36:47.318Z"
    },
    {
      "id": "PRON-202",
      "epicId": "epic-articulation",
      "title": "Phonemic Audio Dictation & Gap-Fill Exercises: Nghe Chính Tả & Điền Âm Vị Khuyết",
      "persona": "Người học muốn vừa luyện tai nghe vừa liên kết chính tả mặt chữ với âm vị thực tế",
      "action": "nghe câu phát âm mẫu bản ngữ và gõ các chữ cái/âm vị còn thiếu vào ô trống",
      "value": "khắc phục triệt để thói quen viết đúng nhưng đọc thiếu âm đuôi, củng cố mối liên hệ giữa chữ viết chính tả và âm vị học",
      "priority": "should",
      "status": "in-progress",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-pron-202-gap",
          "given": "Câu luyện tập có từ bị khuyết phụ âm đuôi (ví dụ: \"Si___ months ago...\")",
          "when": "Học viên nghe âm thanh mẫu và gõ ký tự \"x\" vào ô input",
          "then": "Hệ thống tự động kiểm tra, nếu đúng ô input đổi sang viền xanh lá lấp lánh và tự động phát âm thanh xác nhận chúc mừng.",
          "completed": true
        },
        {
          "id": "ac-pron-202-frontend-design",
          "given": "Giao diện AudioDictationView",
          "when": "Hiển thị bài tập",
          "then": "Câu văn bản lớn cỡ 22px với các ô điền từ khuyết (Gap Input) viền sáng, thanh phát audio có nút tua lại 3 giây và điều chỉnh tốc độ 0.75x, nút nộp bài to bản ở đáy màn hình.",
          "completed": true
        },
        {
          "id": "ac-pron-202-backend-design",
          "given": "5,000 học viên nộp bài nghe chính tả đồng thời",
          "when": "Endpoint POST /api/v1/practice/dictation-submit xử lý",
          "then": "Kiểm tra chuỗi đáp án (String Distance / Levenshtein Distance) trong RAM dưới 5ms, ghi nhận điểm số vào PostgreSQL.",
          "completed": true
        },
        {
          "id": "ac-pron-202-l1-precision",
          "given": "Các từ có âm đuôi câm hoặc thay đổi cách viết (e.g., \"doubt\" âm /b/ câm, \"climb\" âm /b/ câm)",
          "when": "Học viên điền từ",
          "then": "Hệ thống chú thích rõ: \"Chú ý: Trong từ 'doubt', chữ cái 'b' là âm câm, phát âm chỉ là /daʊt/\".",
          "completed": true
        },
        {
          "id": "ac-pron-202-a11y-fallback",
          "given": "Học viên điền từ bằng bàn phím",
          "when": "Nhập xong 1 ô ký tự",
          "then": "Con trỏ bàn phím (Focus) tự động nhảy sang ô kế tiếp mà không cần dùng chuột.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pron-202-fe-input",
          "title": "Xây dựng component GapFillWordInput.jsx tự động nhảy focus khi gõ đủ ký tự",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-202-fe-player",
          "title": "Thiết kế trình phát DictationAudioPlayer với phím tắt tua 3s (Phím J) và tạm dừng (Phím K)",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-202-be-eval",
          "title": "Xây dựng API POST /api/v1/practice/dictation-submit kiểm tra đáp án và tính điểm thưởng",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-pron-202-be-dict",
          "title": "Xây dựng cơ sở dữ liệu 200 câu chính tả âm vị chuyên bẫy âm câm và âm đuôi phức tạp",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-pron-202-qa",
          "title": "Kiểm thử hộp đen các trường hợp gõ chữ hoa/thường, khoảng trắng và ký tự đặc biệt",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/components/articulation/AudioDictationCard.jsx`\n- **Stitch Design Tokens**:\n  - Gap Input: `w-14 text-center font-mono text-xl font-bold rounded-xl border-2 border-slate-700 bg-slate-900 text-indigo-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20`\n  - Correct State: `border-emerald-500 bg-emerald-500/10 text-emerald-400`.\n\n---\n\n### 🗄️ BACKEND DESIGN SPECIFICATION\n- **REST API Endpoint**:\n  ```http\n  POST /api/v1/practice/dictation-submit\n  Authorization: Bearer <JWT>\n  Content-Type: application/json\n\n  Request Body:\n  {\n    \"exerciseId\": \"dic_0912\",\n    \"userAnswers\": { \"gap_1\": \"x\" }\n  }\n\n  Response 200 OK:\n  {\n    \"isCorrect\": true,\n    \"fullWord\": \"six\",\n    \"ipa\": \"/sɪks/\",\n    \"explanation\": \"Từ 'six' kết thúc bằng cụm phụ âm /ks/.\"\n  }\n  ```",
      "createdAt": "2026-10-02T11:36:38.882Z"
    },
    {
      "id": "PRON-203",
      "epicId": "epic-articulation",
      "title": "Targeted Sound Read-Aloud & Contextual Fluency Drills: Luyện Đọc To Âm Mục Tiêu Trong Ngữ Cảnh",
      "persona": "Người học muốn chuyển tiếp từ việc phát âm đúng từ đơn lẻ sang việc nói trôi chảy cả cụm từ và câu hoàn chỉnh",
      "action": "đọc to các câu văn giàu âm mục tiêu (Target Sound Saturated Sentences) và nhận phản hồi tức thời về độ chính xác và nhịp điệu",
      "value": "tạo sự tự tin khi nói câu dài, đảm bảo âm mục tiêu không bị biến dạng khi nói ở tốc độ bình thường",
      "priority": "must",
      "status": "in-progress",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-pron-203-read-aloud",
          "given": "Câu luyện tập âm /θ/: \"I think thirty-three thieves thought of that\"",
          "when": "Học viên đọc to vào micro",
          "then": "Hệ thống nhận diện và chấm điểm riêng biệt cho từng vị trí xuất hiện của âm /θ/ trong cả câu.",
          "completed": true
        },
        {
          "id": "ac-pron-203-frontend-design",
          "given": "Giao diện TargetedSoundDrillView",
          "when": "Render trên màn hình",
          "then": "Các từ chứa âm mục tiêu được bôi đậm màu xanh Sky-400, có chỉ số đếm số lượng âm đã phát âm đạt (ví dụ: 5/6 âm /θ/ đạt chuẩn), thanh sóng âm chạy mượt.",
          "completed": true
        },
        {
          "id": "ac-pron-203-backend-design",
          "given": "5,000 học viên nộp bài đọc câu",
          "when": "API POST /api/v1/scoring/targeted-sound tiếp nhận",
          "then": "Mô hình CTC Alignment trích xuất riêng điểm số của các âm /θ/ mục tiêu và trả về kết quả trong dưới 250ms.",
          "completed": true
        },
        {
          "id": "ac-pron-203-l1-precision",
          "given": "Học viên đọc từ \"thirty\" thành \"tơ-ti\" (biến /θ/ thành /t/)",
          "when": "Phân tích kết quả",
          "then": "Cảnh báo chính xác: \"Từ 'thirty' bạn đã phát âm thành /t/. Cần đặt lưỡi giữa hai hàm răng!\".",
          "completed": true
        },
        {
          "id": "ac-pron-203-a11y-fallback",
          "given": "Học viên muốn nghe đọc mẫu từng cụm nhỏ",
          "when": "Bấm vào từng cụm từ",
          "then": "Hệ thống phát âm thanh cô lập của riêng cụm từ đó ở tốc độ chuẩn.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pron-203-fe-view",
          "title": "Xây dựng component TargetSoundSentenceView.jsx với tính năng highlight từ thông minh",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-203-fe-tracker",
          "title": "Thiết kế bộ đếm TargetPhonemeBadgeCounter đếm số âm đạt chuẩn trong câu",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-203-be-scoring",
          "title": "Phát triển API POST /api/v1/scoring/targeted-sound lọc điểm theo phoneme symbol",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-pron-203-be-cache",
          "title": "Lưu trữ ngân hàng 300 câu luyện bão hòa âm trong Redis",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-pron-203-qa",
          "title": "Kiểm thử độ nhạy nhận diện âm mục tiêu trong các câu có mật độ âm cao",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/components/articulation/TargetSoundDrill.jsx`\n- **Stitch Design Tokens**:\n  - Target Token: `font-bold text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/30`\n  - Score Badge: `bg-slate-900 border border-slate-800 rounded-full px-4 py-1.5 font-mono text-sm`.\n\n---\n\n### 🗄️ BACKEND DESIGN SPECIFICATION\n- **REST API Endpoint**:\n  ```http\n  POST /api/v1/scoring/targeted-sound\n  Authorization: Bearer <JWT>\n  Content-Type: application/json\n\n  Request Body:\n  {\n    \"sentenceId\": \"sat_theta_01\",\n    \"targetPhoneme\": \"/θ/\",\n    \"audioUrl\": \"https://r2.vietphonics.com/audio/sat_01.opus\"\n  }\n\n  Response 200 OK:\n  {\n    \"targetSoundAccuracy\": 83.3,\n    \"totalOccurrences\": 6,\n    \"successfulOccurrences\": 5,\n    \"phonemeBreakdown\": [\n      { \"word\": \"think\", \"score\": 92 },\n      { \"word\": \"thirty\", \"score\": 45, \"issue\": \"replaced_by_/t/\" }\n    ]\n  }\n  ```",
      "createdAt": "2026-10-02T11:36:38.882Z"
    },
    {
      "id": "PRON-204",
      "epicId": "epic-articulation",
      "title": "Dual-Track Audio Recording & Native Speaker Waveform Comparison: So Sánh Sóng Âm Đôi Kênh Học Viên & Kênh Bản Xứ",
      "persona": "Học viên muốn nhìn thấy tận mắt sự khác biệt về hình dáng âm thanh và thời lượng giữa giọng mình và người bản xứ",
      "action": "thu âm giọng nói và quan sát 2 dải sóng âm song song (Dual-Track Audio Studio), kéo thanh trượt Scrubbing để nghe và soi từng đoạn âm",
      "value": "cung cấp bằng chứng thị giác trực quan tuyệt đối, giúp học viên tự phát hiện chỗ mình ngân quá ngắn hoặc phát âm thừa âm",
      "priority": "must",
      "status": "in-progress",
      "size": "L",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-pron-204-dual-track",
          "given": "Học viên vừa hoàn thành lượt thu âm từ \"thought\"",
          "when": "Màn hình hiển thị 2 track sóng âm",
          "then": "Track A (Bản xứ) màu xanh Sky và Track B (Học viên) màu đỏ Rose xếp thẳng hàng thời gian với nhau.",
          "completed": true
        },
        {
          "id": "ac-pron-204-frontend-design",
          "given": "Giao diện DualTrackStudioView",
          "when": "Render trên màn hình",
          "then": "Bảng điều khiển phòng thu âm phong cách chuyên nghiệp: 2 track sóng âm độc lập, thanh trượt phát lại đồng thời (Playhead Scrubber) chạy dọc qua 2 track, nút chuyển kênh A/B một chạm.",
          "completed": true
        },
        {
          "id": "ac-pron-204-backend-design",
          "given": "5,000 học viên cùng tải và so sánh sóng âm",
          "when": "Tải dữ liệu biên độ sóng âm (Waveform Peak Data JSON)",
          "then": "File peaks data được sinh trước (Pre-computed Peaks) kích thước chỉ 2KB tải qua Cloudflare CDN trong dưới 10ms.",
          "completed": true
        },
        {
          "id": "ac-pron-204-l1-precision",
          "given": "Học viên ngân nguyên âm quá ngắn so với người bản xứ (ví dụ /ɔː/ trong \"thought\" chỉ kéo dài 100ms thay vì 220ms)",
          "when": "So sánh độ rộng của track sóng âm",
          "then": "Vùng chênh lệch hiển thị khung viền đứt nét màu vàng kèm thông báo: \"Nguyên âm của bạn quá ngắn! Hãy kéo dài thêm 120ms\".",
          "completed": true
        },
        {
          "id": "ac-pron-204-a11y-fallback",
          "given": "Học viên muốn nghe tuần tự từng kênh",
          "when": "Bấm phím A để nghe bản xứ, phím B để nghe lại giọng mình",
          "then": "Âm thanh phát ngay lập tức không trễ, có thông báo trạng thái rõ ràng.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pron-204-fe-studio",
          "title": "Xây dựng component DualTrackWaveformStudio.jsx với 2 dải sóng Canvas và Playhead Scrubber",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-204-fe-peaks",
          "title": "Viết thuật toán trích xuất Waveform Peaks từ Float32Array của Web Audio API trên client",
          "category": "Audio/DSP",
          "completed": true
        },
        {
          "id": "t-pron-204-be-peaks",
          "title": "Xây dựng API sinh trước Peaks JSON cho 5,000 mẫu âm thanh bản xứ",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-pron-204-be-cdn",
          "title": "Cấu hình CDN caching cho các file Peaks JSON phục vụ 5,000 users",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-pron-204-qa",
          "title": "Kiểm thử độ đồng bộ mili-giây giữa Playhead và luồng phát âm thanh",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/components/articulation/DualTrackStudio.jsx`\n- **Stitch Design Tokens**:\n  - Studio Panel: `bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4`\n  - Native Track: `bg-slate-900 border border-sky-500/30 rounded-2xl p-3`\n  - User Track: `bg-slate-900 border border-rose-500/30 rounded-2xl p-3`\n  - Playhead: `w-0.5 bg-amber-400 absolute top-0 bottom-0 shadow-[0_0_8px_#f59e0b]`.\n\n---\n\n### 🗄️ BACKEND DESIGN SPECIFICATION\n- **API Endpoint Contract**:\n  ```http\n  GET /api/v1/audio/peaks/{wordId}\n  Cache-Control: public, max-age=31536000\n\n  Response 200 OK:\n  {\n    \"word\": \"thought\",\n    \"durationMs\": 680,\n    \"peaks\": [0.05, 0.12, 0.45, 0.88, 0.95, 0.80, 0.35, 0.10],\n    \"vowelStartMs\": 140,\n    \"vowelEndMs\": 420\n  }\n  ```",
      "createdAt": "2026-10-02T11:36:38.882Z"
    },
    {
      "id": "USER-102",
      "epicId": "epic-diagnostic",
      "title": "Granular Phoneme Mastery Ledger: Bản Đồ Ma Trận 44 Âm Vị IPA (Nguyên Âm, Nguyên Âm Đôi & Phụ Âm)",
      "persona": "Học viên muốn có cái nhìn toàn cảnh về năng lực phát âm của mình trên toàn bộ 44 âm trong bảng phiên âm quốc tế IPA",
      "action": "tra cứu bảng lưới ma trận 44 âm vị IPA, xem trạng thái màu sắc của từng âm và click vào âm bất kỳ để mở bài luyện tập",
      "value": "minh bạch hóa 100% lộ trình học phát âm, biết rõ mình còn bao nhiêu âm chưa thuần thục để chủ động luyện tập",
      "priority": "must",
      "status": "in-progress",
      "size": "XL",
      "points": 13,
      "acceptanceCriteria": [
        {
          "id": "ac-user-102-grid-render",
          "given": "Học viên mở màn hình Ma Trận IPA",
          "when": "Giao diện tải xong",
          "then": "Hiển thị đầy đủ 44 ô âm vị phân chia thành 3 khu vực trực quan: Nguyên âm đơn (12 âm), Nguyên âm đôi (8 âm), và Phụ âm (24 âm).",
          "completed": true
        },
        {
          "id": "ac-user-102-color-coding",
          "given": "Dữ liệu điểm số của học viên được nạp vào ma trận",
          "when": "Hệ thống hiển thị màu sắc từng ô",
          "then": "Ô đạt ≥85% có viền xanh lá Emerald, ô từ 60-84% có viền vàng hổ phách Amber, ô <60% có viền đỏ hồng Rose kèm biểu tượng chấm than cảnh báo.",
          "completed": true
        },
        {
          "id": "ac-user-102-tile-click",
          "given": "Học viên click vào một ô âm vị bất kỳ (ví dụ /θ/)",
          "when": "Hành động click diễn ra",
          "then": "Mở Drawer thông tin chi tiết: Hiển thị ký hiệu IPA to bản, 3 từ ví dụ phổ biến, điểm số trung bình, nút nghe phát âm chuẩn và nút \"Luyện tập âm này ngay\".",
          "completed": true
        },
        {
          "id": "ac-user-102-filter-mode",
          "given": "Học viên chỉ muốn xem các âm đang bị yếu",
          "when": "Bấm nút lọc \"Chỉ hiện âm cần cải thiện (<60%)\"",
          "then": "Các ô âm vị đạt chuẩn mờ đi (opacity 30%), làm nổi bật các ô âm vị màu đỏ để học viên tập trung.",
          "completed": false
        }
      ],
      "technicalTasks": [
        {
          "id": "t-102-grid",
          "title": "Xây dựng component IpaMatrixGrid.jsx hiển thị 44 ô âm vị theo đúng bố cục bảng ngữ âm quốc tế",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-102-drawer",
          "title": "Thiết kế PhonemeQuickDetailDrawer.jsx mở ra khi click vào từng ô âm vị",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-102-filter",
          "title": "Tích hợp bộ lọc 3 trạng thái (Tất cả / Đã thuần thục / Cần cải thiện) vào thanh điều khiển",
          "category": "Frontend",
          "completed": false
        },
        {
          "id": "t-102-qa",
          "title": "Kiểm tra hiển thị chuẩn xác ký tự ngữ âm IPA trên font Noto Sans không bị lỗi font ô vuông",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 PURE FRONTEND DESIGN SPECIFICATION\n- **Phân loại**: Pure Frontend UI/UX Component\n- **UI Mockup**: `vietphonics-app/src/ui-reference/kh_u_h_nh_2d_th_vi_n_gi_i_ph_u_m_v_l1_light_mode/code.html`\n- **Frontend Component**: `vietphonics-app/src/components/matrix/IpaMatrixGrid.jsx`\n\n#### 📐 Layout & Grid Structure\n```\n+-------------------------------------------------------------+\n| [Thanh lọc: Tất cả (44) | Cần cải thiện (5) | Thuần thục (28)]|\n+-------------------------------------------------------------+\n| VOWELS (Monophthongs - 12)                                  |\n| [/iː/] [/ɪ/] [/ʊ/] [/uː/] [/e/] [/ə/] [/ɜː/] [/ɔː/] [/æ/]... |\n+-------------------------------------------------------------+\n| DIPHTHONGS (8)                                              |\n| [/eɪ/] [/aɪ/] [/ɔɪ/] [/aʊ/] [/əʊ/] [/ɪə/] [/eə/] [/ʊə/]     |\n+-------------------------------------------------------------+\n| CONSONANTS (24)                                             |\n| [/p/] [/b/] [/t/] [/d/] [/tʃ/] [/dʒ/] [/k/] [/g/] [/f/] ... |\n+-------------------------------------------------------------+\n```\n\n#### 🎨 Design Tokens & Micro-Interactions\n- **Font**: `font-['Noto_Sans']` đảm bảo 100% hiển thị chính xác các ký tự đặc biệt như `/θ/`, `/ð/`, `/ʃ/`, `/ʒ/`.\n- **Card Hover**: `hover:scale-105 hover:-translate-y-1 transition-all duration-200`.\n- **Mastered Token**: `bg-emerald-500/10 border-emerald-500/40 text-emerald-400`.\n- **Warning Token**: `bg-amber-500/10 border-amber-500/40 text-amber-400`.\n- **Critical Token**: `bg-rose-500/10 border-rose-500/40 text-rose-400 animate-pulse`.",
      "createdAt": "2026-10-02T11:36:38.882Z"
    },
    {
      "id": "PRON-205",
      "epicId": "epic-articulation",
      "title": "3-Tier Positional Phoneme Ladder: Luyện Âm Phân Vị (Đầu, Giữa, Cuối)",
      "persona": "Người học có thể phát âm chuẩn một âm khi nó đứng ở đầu từ nhưng lại bị nuốt hoặc sai khi âm đó đứng ở giữa hoặc cuối từ",
      "action": "luyện tập âm vị mục tiêu theo thang bậc 3 vị trí (Tier 1: Vị trí đầu từ Initial -> Tier 2: Vị trí giữa từ Medial -> Tier 3: Vị trí cuối từ Final)",
      "value": "đảm bảo làm chủ âm vị ở mọi vị trí phân bố âm học, giải quyết dứt điểm tình trạng \"chỉ nói đúng được chữ đầu\"",
      "priority": "must",
      "status": "in-progress",
      "size": "L",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-pron-205-ladder",
          "given": "Học viên chọn luyện âm /z/",
          "when": "Học viên vượt qua Tier 1 với điểm số >80%",
          "then": "Hệ thống tự động mở khóa Tier 2 (Medial e.g. \"music\", \"lazy\") và sau đó là Tier 3 (Final e.g. \"buzz\", \"please\").",
          "completed": true
        },
        {
          "id": "ac-pron-205-frontend-design",
          "given": "Giao diện PositionalLadderView",
          "when": "Render trên màn hình",
          "then": "Thang leo bậc 3 tầng (3-Tier Ladder) phong cách hiện đại: Mỗi tầng là một thẻ Card có huy hiệu vị trí (Đầu - Giữa - Cuối), thanh sao hoàn thành (0/3 sao) và nút bắt đầu bài luyện.",
          "completed": true
        },
        {
          "id": "ac-pron-205-backend-design",
          "given": "5,000 học viên cập nhật tiến độ thang leo âm vị",
          "when": "Endpoint POST /api/v1/practice/positional-submit ghi nhận kết quả",
          "then": "Cập nhật trực tiếp vào bảng user_positional_progress và cache Redis với thời gian xử lý < 20ms.",
          "completed": true
        },
        {
          "id": "ac-pron-205-l1-precision",
          "given": "Tier 3 (Vị trí cuối từ) là cửa ải khó khăn nhất của người Việt",
          "when": "Học viên vào Tier 3",
          "then": "Giao diện hiển thị gợi ý đặc biệt: \"Cảnh báo: 85% người Việt mắc lỗi ở vị trí này! Hãy rung mạnh dây thanh quản khi phát âm /z/ ở cuối từ\".",
          "completed": true
        },
        {
          "id": "ac-pron-205-a11y-fallback",
          "given": "Học viên chuyển đổi giữa các bậc thang",
          "when": "Dùng phím Tab",
          "then": "Focus outline hiển thị rõ ràng trên từng nấc thang đã mở khóa.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pron-205-fe-ladder",
          "title": "Xây dựng component PositionalLadderView.jsx với 3 tầng nấc thang và hoạt ảnh mở khóa",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-205-be-api",
          "title": "Xây dựng API POST /api/v1/practice/positional-submit cập nhật tiến độ 3 tầng",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-pron-205-be-db",
          "title": "Thiết kế bảng user_positional_progress lưu trữ tiến độ theo từng vị trí âm",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-pron-205-qa",
          "title": "Kiểm thử logic khóa/mở khóa tuần tự giữa 3 cấp bậc",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/components/articulation/PositionalLadder.jsx`\n- **Stitch Design Tokens**:\n  - Tier 1 (Initial): `bg-sky-950/40 border-sky-500/40 text-sky-300`\n  - Tier 2 (Medial): `bg-indigo-950/40 border-indigo-500/40 text-indigo-300`\n  - Tier 3 (Final): `bg-rose-950/40 border-rose-500/40 text-rose-300`.",
      "createdAt": "2026-10-02T11:37:33.191Z"
    },
    {
      "id": "PRON-206",
      "epicId": "epic-articulation",
      "title": "Connected Speech Positional Progression: Nâng Cấp Từ Đơn Lên Cụm Từ & Câu",
      "persona": "Học viên đã nói đúng từ đơn lẻ ở cả 3 vị trí nhưng cần tiến lên mức độ giao tiếp câu tự nhiên",
      "action": "luyện tập theo lộ trình tăng dần độ dài: Từ đơn (Word) -> Cụm 2-3 từ (Collocation) -> Câu giao tiếp thực tế (Sentence)",
      "value": "bảo toàn độ chính xác của âm vị trong luồng lời nói liên tục, chuẩn bị sẵn sàng cho giao tiếp phản xạ ngoài đời thực",
      "priority": "must",
      "status": "in-progress",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-pron-206-progression",
          "given": "Học viên đạt điểm từ đơn \"breathe\" (>85%)",
          "when": "Hệ thống mở khóa bài luyện cụm từ",
          "then": "Hiển thị bài tập cụm từ: \"breathe in deeply\", sau đó là câu: \"Take a moment to breathe in deeply\".",
          "completed": true
        },
        {
          "id": "ac-pron-206-frontend-design",
          "given": "Giao diện ProgressionView",
          "when": "Render trên màn hình",
          "then": "Thanh tiến trình 3 cấp độ (Word -> Phrase -> Sentence), mỗi cấp độ có huy hiệu rõ ràng và đồng hồ đếm điểm.",
          "completed": true
        },
        {
          "id": "ac-pron-206-backend-design",
          "given": "5,000 học viên gửi bài luyện cấp tiến",
          "when": "Xử lý qua API POST /api/v1/practice/progression-tier",
          "then": "Hệ thống đối soát điểm số và trả về kết quả trong dưới 150ms.",
          "completed": true
        },
        {
          "id": "ac-pron-206-l1-precision",
          "given": "Khi chuyển sang câu dài, học viên có xu hướng quên âm đuôi",
          "when": "Chấm điểm câu dài",
          "then": "Hệ thống theo dõi độ suy hao điểm số (Degradation Score) và đưa ra cảnh báo kịp thời.",
          "completed": true
        },
        {
          "id": "ac-pron-206-a11y-fallback",
          "given": "Học viên thao tác nhanh",
          "when": "Bấm phím Enter",
          "then": "Tự động chuyển sang cấp độ kế tiếp khi bài hiện tại đạt chuẩn.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pron-206-fe-prog",
          "title": "Xây dựng component ConnectedProgressionView.jsx với thanh tiến trình 3 cấp độ",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-206-be-eval",
          "title": "Phát triển API POST /api/v1/practice/progression-tier kiểm soát điều kiện chuyển cấp",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-pron-206-qa",
          "title": "Kiểm thử độ ổn định chấm điểm khi chuyển tiếp giữa các cấp độ",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/components/articulation/ConnectedProgression.jsx`\n- **Stitch Design Tokens**:\n  - Step Pills: `px-4 py-2 rounded-full font-semibold text-xs border border-slate-700 bg-slate-900`.",
      "createdAt": "2026-10-02T11:37:33.191Z"
    },
    {
      "id": "PRON-207",
      "epicId": "epic-articulation",
      "title": "Phonetic Exception Words & Grammatical Voicing Alternations: Quy Tắc Biến Âm Ngữ Pháp Đuôi -s/-es & -ed",
      "persona": "Người học hay nhầm lẫn quy tắc phát âm đuôi danh từ số nhiều -s/-es (/s/, /z/, /ɪz/) và đuôi quá khứ -ed (/t/, /d/, /ɪd/)",
      "action": "luyện tập các bài tập phân loại âm đuôi ngữ pháp tương tác và nắm vững quy tắc hữu thanh/vô thanh",
      "value": "chấm dứt vĩnh viễn thói quen \"từ nào có s cũng đọc là s\" hoặc \"từ nào có ed cũng đọc là đơ\", đạt độ chuẩn xác ngữ pháp và phát âm tuyệt đối",
      "priority": "must",
      "status": "in-progress",
      "size": "L",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-pron-207-rules",
          "given": "Các từ tận cùng bằng âm hữu thanh (e.g., \"dogs\", \"played\")",
          "when": "Học viên phát âm đuôi -s hoặc -ed",
          "then": "Hệ thống kiểm tra thanh quản rung (/z/ hoặc /d/); nếu phát âm nhầm sang vô thanh (/s/ hoặc /t/) sẽ hiển thị cảnh báo giải thích quy tắc ngữ âm.",
          "completed": true
        },
        {
          "id": "ac-pron-207-frontend-design",
          "given": "Giao diện VoicingRuleMasteryView",
          "when": "Render trên màn hình",
          "then": "Bảng 3 cột phân loại trực quan: Cột /s/, Cột /z/, Cột /ɪz/; thẻ bài từ vựng có thể kéo thả (Drag and Drop) hoặc bấm chọn vào đúng cột với âm thanh phản hồi vui nhộn.",
          "completed": true
        },
        {
          "id": "ac-pron-207-backend-design",
          "given": "5,000 học viên cùng làm bài luyện biến âm ngữ pháp",
          "when": "Endpoint POST /api/v1/grammar/voicing-check xử lý",
          "then": "Xử lý kiểm tra quy tắc và chấm điểm phát âm trong dưới 30ms.",
          "completed": true
        },
        {
          "id": "ac-pron-207-l1-precision",
          "given": "Người Việt không có thói quen biến âm đuôi theo âm đứng trước",
          "when": "Giải thích quy tắc",
          "then": "Cung cấp câu thần chú dễ nhớ tiếng Việt: \"Thời phong kiến phương tây\" cho đuôi /s/ và \"Sáng sớm chạy xe sh zỏm\" cho đuôi /ɪz/.",
          "completed": true
        },
        {
          "id": "ac-pron-207-a11y-fallback",
          "given": "Học viên không dùng chuột kéo thả",
          "when": "Dùng phím số 1, 2, 3 để gán từ vào cột",
          "then": "Thẻ từ tự động bay vào cột tương ứng kèm hiệu ứng mượt mà.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pron-207-fe-drag",
          "title": "Xây dựng component VoicingRuleBoard.jsx hỗ trợ kéo thả và phím tắt chọn cột",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-207-be-rules",
          "title": "Xây dựng quy tắc PhonologicalRuleChecker kiểm tra tính đúng đắn của âm đuôi ngữ pháp",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-pron-207-qa",
          "title": "Kiểm thử với 100 từ bất quy tắc phổ biến nhất trong tiếng Anh",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/components/articulation/VoicingRuleMastery.jsx`\n- **Stitch Design Tokens**:\n  - Column /s/: `bg-sky-950/30 border-sky-500/40 rounded-3xl p-4`\n  - Column /z/: `bg-indigo-950/30 border-indigo-500/40 rounded-3xl p-4`\n  - Column /ɪz/: `bg-purple-950/30 border-purple-500/40 rounded-3xl p-4`.",
      "createdAt": "2026-10-02T11:37:33.191Z"
    },
    {
      "id": "PRON-208",
      "epicId": "epic-articulation",
      "title": "L1 Confusion-Trap Cross-Transition Drills: Bài Tập Đảo Ngữ Âm Chống Nhầm Lẫn Bẫy Âm L1",
      "persona": "Người học khi gặp các câu có 2 âm dễ nhầm đứng cạnh nhau (e.g., \"She sells sea shells\") lập tức bị líu lưỡi và đọc lẫn lộn",
      "action": "luyện tập các bài tập đảo âm chéo (Cross-Transition Drills) xen kẽ giữa 2 âm đối kháng (/s/ và /ʃ/, /l/ và /n/, /θ/ và /s/)",
      "value": "rèn luyện sự linh hoạt của cơ lưỡi và phản xạ thần kinh vận động, giúp học viên không bao giờ bị líu lưỡi khi giao tiếp thực tế",
      "priority": "must",
      "status": "in-progress",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-pron-208-tongue-twister",
          "given": "Câu luyện đảo âm: \"She sells sea shells on the sea shore\"",
          "when": "Học viên đọc câu vào micro",
          "then": "Hệ thống kiểm tra sự chuyển đổi vị trí đầu lưỡi giữa âm /s/ (răng khép) và âm /ʃ/ (môi cong chu ra trước).",
          "completed": true
        },
        {
          "id": "ac-pron-208-frontend-design",
          "given": "Giao diện CrossTransitionDrillView",
          "when": "Render trên màn hình",
          "then": "Các từ chứa âm /s/ tô màu xanh Sky, các từ chứa âm /ʃ/ tô màu hồng Rose, có đồ họa biểu diễn sự chuyển đổi vị trí môi nhấp nháy đồng bộ.",
          "completed": true
        },
        {
          "id": "ac-pron-208-backend-design",
          "given": "5,000 học viên nộp bài luyện đảo âm",
          "when": "Xử lý phân tích âm vị",
          "then": "Mô hình phân tách rõ ràng ranh giới giữa 2 âm kề nhau với độ trễ phản hồi < 200ms.",
          "completed": true
        },
        {
          "id": "ac-pron-208-l1-precision",
          "given": "Người Việt hay bị \"đồng hóa âm\" (đọc tất cả thành /s/ hoặc tất cả thành /ʃ/)",
          "when": "Hệ thống phát hiện lỗi đồng hóa",
          "then": "Cảnh báo cụ thể: \"Bạn đã bị líu lưỡi! Hãy tách chậm từng từ: 'She' (cong môi) -> 'sells' (cười bè miệng)\".",
          "completed": true
        },
        {
          "id": "ac-pron-208-a11y-fallback",
          "given": "Học viên gặp khó khăn với tốc độ bình thường",
          "when": "Bật chế độ \"Luyện Chậm (Slow-Mo Metronome)\"",
          "then": "Hệ thống bật máy gõ nhịp Metronome 60 BPM hướng dẫn học viên đọc chuẩn từng từ theo nhịp gõ.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pron-208-fe-twister",
          "title": "Xây dựng component CrossTransitionTwister.jsx với máy gõ nhịp Metronome Web Audio",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-208-be-eval",
          "title": "Phát triển API POST /api/v1/practice/confusion-trap chấm điểm độ phân tách âm",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-pron-208-qa",
          "title": "Kiểm thử với 30 câu líu lưỡi kinh điển của người học tiếng Anh",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/components/articulation/CrossTransitionDrill.jsx`\n- **Stitch Design Tokens**:\n  - Sound A Chip: `bg-sky-500/20 text-sky-400 border border-sky-500 font-bold px-2 py-1 rounded`\n  - Sound B Chip: `bg-rose-500/20 text-rose-400 border border-rose-500 font-bold px-2 py-1 rounded`.",
      "createdAt": "2026-10-02T11:37:33.191Z"
    },
    {
      "id": "PRON-209",
      "epicId": "epic-articulation",
      "title": "Numbered Target Phoneme System & Multi-Spelling Sound Maps: Bản Đồ Mặt Chữ & Các Dạng Chính Tả Đa Dạng",
      "persona": "Người học tiếng Anh hoang mang vì cùng một âm vị lại có quá nhiều cách viết chữ khác nhau (ví dụ âm /f/ có thể viết là f, ph, gh)",
      "action": "tra cứu bản đồ chính tả đa dạng (Multi-Spelling Sound Map) của từng âm vị mục tiêu",
      "value": "nắm vững toàn bộ các biến thể chữ viết của một âm, không bao giờ bị cách viết tiếng Anh đánh lừa",
      "priority": "should",
      "status": "in-progress",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-pron-209-spelling-map",
          "given": "Học viên xem bản đồ âm /f/",
          "when": "Hệ thống hiển thị các nhánh chính tả",
          "then": "Hiển thị tỷ lệ xuất hiện: Chữ \"f/ff\" (78%), Chữ \"ph\" (18%), Chữ \"gh\" (4% e.g. rough, laugh) kèm ví dụ mẫu.",
          "completed": true
        },
        {
          "id": "ac-pron-209-frontend-design",
          "given": "Giao diện MultiSpellingView",
          "when": "Render trên màn hình",
          "then": "Bản đồ tư duy hình cây (Mindmap Tree) hoặc mạng nhện SVG tương tác, click vào nhánh nào sẽ hiện danh sách các từ thông dụng thuộc nhánh đó.",
          "completed": true
        },
        {
          "id": "ac-pron-209-backend-design",
          "given": "5,000 học viên tra cứu bản đồ chính tả",
          "when": "Gọi GET /api/v1/dictionary/spelling-map/{phoneme}",
          "then": "Dữ liệu được nạp từ Redis Cache trong < 5ms.",
          "completed": true
        },
        {
          "id": "ac-pron-209-l1-precision",
          "given": "Âm câm trong tiếng Anh (ví dụ \"gh\" trong \"night\", \"though\" là âm câm nhưng trong \"laugh\" lại đọc là /f/)",
          "when": "Xem bản đồ",
          "then": "Đánh dấu cảnh báo đặc biệt về âm câm để người học không bị nhầm lẫn.",
          "completed": true
        },
        {
          "id": "ac-pron-209-a11y-fallback",
          "given": "Học viên dùng bàn phím duyệt bản đồ",
          "when": "Tab qua các nhánh",
          "then": "Mỗi nhánh đọc rõ tỷ lệ phần trăm và số lượng từ vựng.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pron-209-fe-map",
          "title": "Xây dựng component MultiSpellingMindmap.jsx dạng đồ họa SVG tương tác",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-209-be-lexicon",
          "title": "Xây dựng cơ sở dữ liệu ánh xạ 44 âm vị với các biến thể mặt chữ chính tả trong tiếng Anh",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-pron-209-qa",
          "title": "Kiểm tra độ chính xác của tỷ lệ phần trăm phân bố chính tả theo từ điển thống kê",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/components/articulation/MultiSpellingSoundMap.jsx`\n- **Stitch Design Tokens**:\n  - Center Node: `w-24 h-24 rounded-full bg-indigo-600 text-white font-black text-2xl flex items-center justify-center shadow-2xl`\n  - Branch Node: `bg-slate-900 border border-slate-700 rounded-2xl p-3 text-slate-200 hover:border-indigo-400`.",
      "createdAt": "2026-10-02T11:46:12.576Z"
    },
    {
      "id": "PRON-210",
      "epicId": "epic-articulation",
      "title": "Video-Synchronized Masterclass & Exaggerated Articulation Modeling: Lớp Học Khẩu Hình Video Phóng Đại Đồng Bộ",
      "persona": "Người học cần nhìn cận cảnh miệng và cơ mặt của chuyên gia bản ngữ ở góc quay siêu nét và chuyển động chậm để bắt chước",
      "action": "xem video bài giảng ngắn (30-45s) với chuyên gia bản ngữ phát âm ở chế độ phóng đại khẩu hình (Exaggerated Articulation), có đồ họa vector đồng bộ theo thời gian thực",
      "value": "quan sát rõ từng chuyển động tinh tế của cơ môi và răng mà mắt thường khó nhận ra ở tốc độ nói nhanh",
      "priority": "should",
      "status": "in-progress",
      "size": "L",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-pron-210-video-player",
          "given": "Học viên xem video khẩu hình âm /θ/",
          "when": "Video phát đến khoảnh khắc đặt lưỡi kẹp răng",
          "then": "Video tự động phóng to cận cảnh 2x vào vùng miệng, hiển thị vòng tròn phát sáng màu xanh chỉ vào đầu lưỡi và hiển thị phụ đề IPA đồng bộ.",
          "completed": true
        },
        {
          "id": "ac-pron-210-frontend-design",
          "given": "Giao diện MasterclassPlayerView",
          "when": "Render trên màn hình",
          "then": "Trình phát video tỷ lệ 16:9 sắc nét Full HD, thanh điều khiển có nút chuyển góc quay (Góc thẳng / Góc nghiêng 45 độ), nút xem chậm 0.25x và nút lặp đoạn A-B.",
          "completed": true
        },
        {
          "id": "ac-pron-210-backend-design",
          "given": "5,000 học viên cùng stream video bài giảng",
          "when": "Truyền luồng video qua HLS (HTTP Live Streaming)",
          "then": "Các phân đoạn video (.ts / .m4s) được phân phối qua Cloudflare Stream CDN, thời gian khởi tạo video (Time-to-First-Frame) < 400ms.",
          "completed": true
        },
        {
          "id": "ac-pron-210-l1-precision",
          "given": "So sánh góc quay miệng người Việt và người bản xứ",
          "when": "Chuyên gia giảng giải",
          "then": "Chỉ rõ: \"Người Việt hay giữ môi trên bất động. Khi phát âm /w/ bạn cần chúm môi tròn như khi huýt sáo\".",
          "completed": true
        },
        {
          "id": "ac-pron-210-a11y-fallback",
          "given": "Học viên mạng yếu không tải được video HD",
          "when": "Hệ thống phát hiện băng thông thấp",
          "then": "Tự động hạ độ phân giải xuống 480p hoặc chuyển sang chế độ ảnh động WebP nén nhẹ nhàng.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pron-210-fe-player",
          "title": "Xây dựng component MasterclassVideoPlayer.jsx với tính năng lặp đoạn A-B và đổi góc quay",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-210-be-hls",
          "title": "Thiết lập pipeline mã hóa video đa độ phân giải HLS (1080p, 720p, 480p) trên Cloudflare Stream",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-pron-210-qa",
          "title": "Kiểm thử khả năng phát mượt mà trên kết nối mạng 3G/4G chập chờn",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/components/articulation/VideoMasterclassPlayer.jsx`\n- **Stitch Design Tokens**:\n  - Video Frame: `rounded-3xl overflow-hidden border-2 border-slate-800 bg-black aspect-video relative shadow-2xl`\n  - Control Overlay: `bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-4 flex items-center justify-between`.",
      "createdAt": "2026-10-02T11:46:12.576Z"
    },
    {
      "id": "PRON-211",
      "epicId": "epic-articulation",
      "title": "Dense Target Sound Saturation Sentences: Luyện Câu Bão Hòa Âm Mục Tiêu Tối Đa",
      "persona": "Người học muốn thử thách cơ miệng ở cấp độ cao nhất để kiểm tra xem mình đã thực sự làm chủ âm vị chưa",
      "action": "luyện đọc các câu được thiết kế bão hòa âm mục tiêu với mật độ cực cao (tối thiểu 4-6 lần xuất hiện trong 1 câu ngắn)",
      "value": "tạo áp lực cấu âm liên tục giúp cơ miệng thích nghi và khắc sâu phản xạ cơ bắp tự động (Muscle Memory)",
      "priority": "should",
      "status": "in-progress",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-pron-211-saturation",
          "given": "Câu bão hòa âm /dʒ/: \"George enjoyed arranging orange juice in the large fridge\"",
          "when": "Học viên đọc câu vào micro",
          "then": "Hệ thống nhận diện cả 6 âm /dʒ/ và hiển thị biểu đồ radar thành tích cấu âm.",
          "completed": true
        },
        {
          "id": "ac-pron-211-frontend-design",
          "given": "Giao diện SoundSaturationView",
          "when": "Render trên màn hình",
          "then": "Mỗi lần học viên phát âm đúng 1 âm mục tiêu, con số trên thanh \"Bộ Đo Bão Hòa (Saturation Meter)\" tăng lên kèm hiệu ứng phát sáng neon.",
          "completed": true
        },
        {
          "id": "ac-pron-211-backend-design",
          "given": "5,000 học viên nộp bài câu bão hòa",
          "when": "Chấm điểm qua API POST /api/v1/scoring/saturation-sentence",
          "then": "Trả kết quả chi tiết từng từ trong dưới 200ms.",
          "completed": true
        },
        {
          "id": "ac-pron-211-l1-precision",
          "given": "Học viên phát âm /dʒ/ thành /z/ hoặc /d/ kiểu Việt Nam",
          "when": "Hệ thống chấm điểm",
          "then": "Chỉ rõ từ bị sai và hướng dẫn cách giật cằm và bật hơi mạnh của âm /dʒ/.",
          "completed": true
        },
        {
          "id": "ac-pron-211-a11y-fallback",
          "given": "Học viên muốn nghe đọc mẫu câu bão hòa",
          "when": "Bấm nút \"Nghe Bản Xứ\"",
          "then": "Phát audio bản ngữ với âm /dʒ/ được phát âm rõ ràng, chuẩn xác.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pron-211-fe-meter",
          "title": "Xây dựng component SaturationMeter.jsx với hiệu ứng tích lũy năng lượng khi đọc đúng",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-211-be-eval",
          "title": "Phát triển API POST /api/v1/scoring/saturation-sentence chấm điểm câu bão hòa",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-pron-211-qa",
          "title": "Kiểm thử với ngân hàng 100 câu bão hòa âm vị khó",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/components/articulation/SoundSaturationDrill.jsx`\n- **Stitch Design Tokens**:\n  - Saturation Bar: `h-3 rounded-full bg-slate-800 overflow-hidden`, Fill: `bg-gradient-to-r from-emerald-500 to-teal-400`.",
      "createdAt": "2026-10-02T11:46:12.576Z"
    },
    {
      "id": "ARCH-101",
      "epicId": "epic-backend-infrastructure",
      "title": "Relational Database Schema Design for Users, Phoneme Scoring & Subscriptions (PostgreSQL): Thiết Kế Cơ Sở Dữ Liệu Quan Hệ Chuẩn Hóa Cho 5,000 Người Dùng Đồng Thời",
      "persona": "Kỹ sư cơ sở dữ liệu và kiến trúc sư hệ thống phụ trách đảm bảo tính toàn vẹn dữ liệu và hiệu năng truy vấn cho 5,000 người học đồng thời",
      "action": "thiết kế lược đồ cơ sở dữ liệu PostgreSQL chuẩn hóa bậc 3 (3NF) với các bảng users, subscriptions, phoneme_scores, practice_sessions và error_bank, tích hợp phân vùng (partitioning) và chỉ mục hợp lý",
      "value": "đảm bảo độ tin cậy tuyệt đối (ACID) cho dữ liệu thanh toán và tiến độ học tập, duy trì thời gian thực thi truy vấn P95 < 25ms ngay cả khi bảng điểm số đạt hàng triệu bản ghi",
      "priority": "must",
      "status": "in-progress",
      "size": "XL",
      "points": 13,
      "acceptanceCriteria": [
        {
          "id": "ac-arch-101-schema-design",
          "given": "Hệ thống cần lưu trữ thông tin tài khoản, gói thuê bao và chi tiết từng âm vị được chấm điểm",
          "when": "Triển khai migration khởi tạo cơ sở dữ liệu",
          "then": "Lược đồ hoàn chỉnh gồm 8 bảng quan hệ có khóa ngoại ON DELETE CASCADE hợp lý, kiểu dữ liệu tối ưu (UUIDv7 cho ID phân tán, JSONB cho metadata âm học, TIMESTAMPTZ cho thời gian theo chuẩn UTC).",
          "completed": true
        },
        {
          "id": "ac-arch-101-frontend-design",
          "given": "Giao diện bảng điều khiển quản trị viên Admin Database Metrics View",
          "when": "Quản trị viên theo dõi trạng thái cơ sở dữ liệu",
          "then": "Hiển thị sơ đồ quan hệ thực thể (ERD) tương tác, số lượng kết nối đang mở (Active Connections / Pool Size), dung lượng bảng và tỷ lệ Cache Hit Ratio luôn hiển thị >99% bằng phông chữ JetBrains Mono trên nền tối Slate-900.",
          "completed": true
        },
        {
          "id": "ac-arch-101-backend-design",
          "given": "5,000 người dùng tích cực cùng ghi điểm phát âm và đọc lộ trình học",
          "when": "Hệ thống đối mặt với lưu lượng 1,500 truy vấn ghi/giây và 5,000 truy vấn đọc/giây",
          "then": "Cấu hình PgBouncer connection pooling với Transaction Mode (pool size 50 kết nối vật lý), phân vùng bảng phoneme_scores theo tháng (Range Partitioning by created_at), đảm bảo CPU PostgreSQL dưới 45%.",
          "completed": true
        },
        {
          "id": "ac-arch-101-l1-precision",
          "given": "Bảng từ điển âm vị phoneme_dictionary",
          "when": "Truy vấn bảng đối chiếu âm lỗi đặc trưng của người Việt",
          "then": "Bảng lưu trữ trường l1_vietnamese_difficulty_tier (1 đến 5) và dialect_risk_tag (Bac, Trung, Nam) giúp hệ thống lọc nhanh các bài luyện phù hợp theo từng giọng địa phương.",
          "completed": true
        },
        {
          "id": "ac-arch-101-a11y-fallback",
          "given": "Đảm bảo khả năng phục hồi dữ liệu khi có thảm họa (Disaster Recovery)",
          "when": "Có sự cố sập node database chính",
          "then": "Hệ thống tự động kích hoạt cơ chế tự phục hồi (Automatic Failover) sang bản sao Streaming Replication Standby trong vòng dưới 30 giây với RPO = 0 (không mất bất kỳ giao dịch nào).",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-arch-101-be-migration",
          "title": "Viết file migration DDL tạo toàn bộ 8 bảng PostgreSQL kèm trigger tự động cập nhật trường updated_at",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-arch-101-be-partition",
          "title": "Triển khai phân vùng tự động (Auto Partitioning) cho bảng phoneme_scores theo từng tháng với pg_partman",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-arch-101-be-pgbouncer",
          "title": "Cấu hình PgBouncer kết hợp Prisma/Kysely connection pool tối ưu cho 5,000 concurrent sessions",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-arch-101-be-index",
          "title": "Tạo compound index trên (user_id, phoneme_symbol) và (user_id, created_at DESC) để tăng tốc độ truy vấn lịch sử",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-arch-101-qa",
          "title": "Chạy công cụ pgbench mô phỏng 5,000 client đồng thời kiểm tra TPS đạt tối thiểu 2,500 transaction/sec",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/views/admin/AdminDatabaseMetrics.jsx`\n- **Stitch Design Tokens**:\n  - Metric Card: `bg-slate-900 border border-slate-800 rounded-2xl p-4 font-mono text-xs`\n  - Active Connection Indicator: `text-emerald-400 font-bold text-lg`.\n\n---\n\n### 🗄️ BACKEND DESIGN SPECIFICATION\n- **PostgreSQL 3NF DDL Specification**:\n  ```sql\n  -- Users\n  CREATE TABLE users (\n    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    email VARCHAR(255) UNIQUE NOT NULL,\n    full_name VARCHAR(150),\n    dialect_preference VARCHAR(20) DEFAULT 'northern',\n    tier VARCHAR(20) DEFAULT 'free',\n    created_at TIMESTAMPTZ DEFAULT NOW(),\n    updated_at TIMESTAMPTZ DEFAULT NOW()\n  );\n\n  -- Subscriptions\n  CREATE TABLE subscriptions (\n    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n    plan_code VARCHAR(50) NOT NULL,\n    status VARCHAR(30) NOT NULL CHECK (status IN ('active', 'grace_period', 'expired')),\n    current_period_start TIMESTAMPTZ NOT NULL,\n    current_period_end TIMESTAMPTZ NOT NULL,\n    created_at TIMESTAMPTZ DEFAULT NOW()\n  );\n\n  -- Partitioned Phoneme Scores\n  CREATE TABLE phoneme_scores (\n    id BIGSERIAL,\n    user_id UUID NOT NULL,\n    phoneme_symbol VARCHAR(10) NOT NULL,\n    score NUMERIC(5, 2) NOT NULL,\n    duration_ms INT NOT NULL,\n    audio_r2_url TEXT,\n    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),\n    PRIMARY KEY (id, created_at)\n  ) PARTITION BY RANGE (created_at);\n\n  CREATE TABLE phoneme_scores_2026_10 PARTITION OF phoneme_scores\n    FOR VALUES FROM ('2026-10-01 00:00:00+00') TO ('2026-11-01 00:00:00+00');\n  ```\n- **High Concurrency (5,000 Users)**:\n  - PgBouncer: `pool_mode = transaction`, `max_client_conn = 5000`, `default_pool_size = 50`.",
      "createdAt": "2026-10-02T12:11:09.502Z"
    },
    {
      "id": "ARCH-102",
      "epicId": "epic-backend-infrastructure",
      "title": "Asynchronous Audio Ingestion & GPU Worker Queue Pipeline (FastAPI + Redis + FFmpeg): Đường Ống Nạp Âm Thanh Bất Đồng Bộ & Hàng Đợi Worker GPU",
      "persona": "Kỹ sư Machine Learning và hạ tầng AI phụ trách xử lý hàng ngàn file ghi âm tiếng Anh của học viên mà không làm tắc nghẽn máy chủ",
      "action": "nhận luồng file âm thanh từ máy khách, đẩy vào hàng đợi BullMQ/Celery và phân bổ cho các worker GPU chạy Whisper/Kaldi trích xuất đặc trưng ngữ âm",
      "value": "ngăn chặn tình trạng treo máy chủ khi có lượng lớn người dùng cùng nộp bài ghi âm, đảm bảo thời gian xử lý và trả kết quả chấm điểm luôn dưới 650ms",
      "priority": "must",
      "status": "in-progress",
      "size": "XL",
      "points": 13,
      "acceptanceCriteria": [
        {
          "id": "ac-arch-102-ingestion-flow",
          "given": "Học viên nộp đoạn ghi âm giọng nói định dạng WebM/Opus hoặc WAV",
          "when": "API Ingestion Endpoint tiếp nhận file",
          "then": "Hệ thống kiểm tra tính hợp lệ trong 15ms, sinh job_id duy nhất, đẩy tác vụ vào hàng đợi Redis Queue và trả về mã HTTP 202 Accepted kèm URL kiểm tra kết quả ngay lập tức.",
          "completed": true
        },
        {
          "id": "ac-arch-102-frontend-design",
          "given": "Giao diện hàng đợi AI Queue Telemetry Dashboard",
          "when": "Kỹ sư hạ tầng giám sát hệ thống",
          "then": "Hiển thị đồ thị thời gian thực về số lượng tác vụ đang chờ (Queue Depth), thời gian chờ trung bình (Wait Time), tỷ lệ GPU VRAM sử dụng và thông lượng bài chấm/phút theo giao diện Dark Mode phong cách Grafana chuyên nghiệp.",
          "completed": true
        },
        {
          "id": "ac-arch-102-backend-design",
          "given": "5,000 học viên cùng bấm gửi bài chấm phát âm trong giờ làm bài tập trên lớp",
          "when": "Hàng đợi nạp dồn dập 200 file âm thanh/giây",
          "then": "Cơ chế Auto-scaling (KEDA / Kubernetes HPA) tự động mở rộng từ 2 lên tối đa 16 GPU workers, duy trì P95 thời gian chờ trong hàng đợi < 400ms và không có bản ghi nào bị rơi rớt (0% dropped jobs).",
          "completed": true
        },
        {
          "id": "ac-arch-102-l1-precision",
          "given": "Worker âm thanh chạy tiền xử lý FFmpeg",
          "when": "Chuẩn hóa định dạng âm thanh đầu vào",
          "then": "Tự động chuyển đổi mẫu về chuẩn PCM Mono 16kHz 16-bit và cắt lọc khoảng lặng đầu cuối (Silence Trimming -50dB) nhằm tối ưu độ chính xác nhận diện âm tắc vô thanh /p, t, k/ của học viên Việt.",
          "completed": true
        },
        {
          "id": "ac-arch-102-a11y-fallback",
          "given": "Sự cố kết nối mạng của worker AI",
          "when": "Một worker gặp lỗi phân tích hoặc timeout 5 giây",
          "then": "Job tự động được trả về hàng đợi thử lại (Dead Letter Queue với cơ chế Exponential Backoff 3 lần), client nhận thông báo lỗi chi tiết thay vì bị treo vô hạn.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-arch-102-be-fastapi",
          "title": "Xây dựng API Ingestion hiệu năng cao bằng FastAPI với streaming upload và xác thực chữ ký audio header",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-arch-102-be-queue",
          "title": "Thiết lập cụm Redis BullMQ cluster phân tán với phân luồng ưu tiên (VIP Pro > Standard Free)",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-arch-102-be-ffmpeg",
          "title": "Tích hợp FFmpeg C-binding xử lý chuẩn hóa audio PCM 16kHz mono trong bộ nhớ RAM (In-Memory Buffer)",
          "category": "Audio/DSP",
          "completed": true
        },
        {
          "id": "t-arch-102-be-keda",
          "title": "Viết cấu hình Kubernetes ScaledObject (KEDA) tự động tăng giảm GPU worker pods dựa trên Redis queue length",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-arch-102-qa",
          "title": "Chạy kịch bản kiểm thử tải Locust mô phỏng 5,000 user gửi đồng thời 10,000 file âm thanh trong 5 phút",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/components/telemetry/QueueStatusIndicator.jsx`\n- **Stitch Design Tokens**:\n  - Processing Spinner: `w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin`\n  - Queue Wait Badge: `font-mono text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded`.\n\n---\n\n### 🗄️ BACKEND DESIGN SPECIFICATION\n- **REST API Endpoint**:\n  ```http\n  POST /api/v1/audio/ingest-async\n  Authorization: Bearer <JWT>\n  Content-Type: multipart/form-data\n\n  Form Data:\n  - audioFile: [binary webm/opus]\n  - targetText: \"I thought about that\"\n  - priorityTier: \"pro\"\n\n  Response 202 Accepted:\n  {\n    \"jobId\": \"job_99182ab3\",\n    \"status\": \"queued\",\n    \"estimatedWaitMs\": 320,\n    \"pollUrl\": \"/api/v1/audio/job-status/job_99182ab3\"\n  }\n  ```\n- **High Concurrency (5,000 Users)**:\n  - BullMQ Queue `queue:audio_ingest` phân tải thành 2 luồng: `pro_stream` (concurrency 64), `free_stream` (concurrency 16).",
      "createdAt": "2026-10-02T12:11:09.502Z"
    },
    {
      "id": "ARCH-103",
      "epicId": "epic-backend-infrastructure",
      "title": "Multi-Gateway Subscription Billing & Webhook Reconciler (Cổng Thanh Toán Tự Động VNPay, MoMo & Stripe): Bộ Đối Soát Giao Dịch & Thanh Toán Đa Cổng",
      "persona": "Trưởng bộ phận tài chính và kỹ sư backend thanh toán cần đảm bảo dòng tiền từ học viên được ghi nhận chuẩn xác 100%",
      "action": "tích hợp cổng thanh toán nội địa (MoMo, VNPay) cho người dùng Việt Nam và thẻ quốc tế (Stripe) cho người dùng kiều bào, tự động đối soát giao dịch qua Webhook",
      "value": "tạo sự thuận tiện tối đa cho học viên khi chi trả bằng phương thức quen thuộc nhất, loại bỏ hoàn toàn sai sót đối soát thủ công và giảm tỷ lệ giao dịch thất bại xuống dưới 1%",
      "priority": "must",
      "status": "in-progress",
      "size": "L",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-arch-103-payment-flow",
          "given": "Học viên chọn mua gói Pro 1 tháng (30,000đ)",
          "when": "Chọn phương thức MoMo, VNPay hoặc Thẻ Quốc Tế",
          "then": "Hệ thống sinh URL thanh toán an toàn có mã hóa chữ ký số HMAC-SHA256, điều hướng mượt mà hoặc hiển thị QR thanh toán ngay trên màn hình.",
          "completed": true
        },
        {
          "id": "ac-arch-103-frontend-design",
          "given": "Giao diện chọn cổng thanh toán PaymentGatewaySelector",
          "when": "Học viên xem các lựa chọn",
          "then": "Logo VNPay, MoMo và Stripe hiển thị sắc nét với tỷ lệ vàng, thẻ phương thức có viền sáng khi được chọn, hiển thị rõ ràng số tiền \"30.000 đ\" định dạng chuẩn Việt Nam, bảo mật SSL 256-bit được chứng nhận bằng huy hiệu khóa xanh an tâm.",
          "completed": true
        },
        {
          "id": "ac-arch-103-backend-design",
          "given": "Hàng ngàn giao dịch mua gói phát sinh trong các đợt khuyến mãi Back-To-School",
          "when": "Các cổng thanh toán gửi hàng loạt webhook thông báo giao dịch thành công",
          "then": "Hệ thống đối soát sử dụng cơ chế Idempotency Key (khóa giao dịch chống trùng lặp), ghi nhận giao dịch thành công và nâng cấp tài khoản chỉ trong 120ms mà không bao giờ bị cộng thừa ngày sử dụng.",
          "completed": true
        },
        {
          "id": "ac-arch-103-l1-precision",
          "given": "Giao dịch qua các ngân hàng nội địa Việt Nam",
          "when": "Tạo mã đơn hàng thanh toán",
          "then": "Nội dung chuyển khoản được sinh ngắn gọn dạng \"VP [UserID]\" giúp đối soát tự động chính xác tuyệt đối ngay cả khi học viên gõ thiếu dấu tiếng Việt.",
          "completed": true
        },
        {
          "id": "ac-arch-103-a11y-fallback",
          "given": "Xử lý lỗi khi cổng thanh toán bảo trì",
          "when": "Một cổng thanh toán gặp sự cố gián đoạn kết nối",
          "then": "Hệ thống tự động hiển thị gợi ý thông minh chuyển sang cổng thanh toán thay thế khả dụng mà không làm học viên phải điền lại thông tin từ đầu.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-arch-103-be-gateways",
          "title": "Tích hợp SDK MoMo API v2, VNPay Payment Sandbox/Production và Stripe Elements",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-arch-103-be-webhook",
          "title": "Xây dựng Webhook Reconciler Engine kiểm tra chữ ký số HMAC-SHA256 bảo vệ chống giả mạo giao dịch",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-arch-103-be-idempotent",
          "title": "Thiết kế bảng payment_transactions với Unique Constraint trên transaction_reference bảo vệ tính Idempotent",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-arch-103-be-scale",
          "title": "Tối ưu hóa khả năng chịu tải của Webhook Receiver đáp ứng 500 webhooks/giây không gây nghẽn kết nối DB",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-arch-103-qa",
          "title": "Viết test suite mô phỏng các kịch bản: thanh toán thành công, người dùng hủy, timeout, và webhook gửi lặp 3 lần",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/components/subscription/PaymentGatewaySelector.jsx`\n- **Stitch Design Tokens**:\n  - Gateway Card Selected: `border-2 border-rose-500 bg-rose-500/10 shadow-[0_0_20px_rgba(244,63,94,0.3)] rounded-2xl p-4 cursor-pointer`\n  - Amount Display: `font-['Plus_Jakarta_Sans'] font-extrabold text-2xl text-white`.\n\n---\n\n### 🗄️ BACKEND DESIGN SPECIFICATION\n- **Webhook Reconciliation Engine**:\n  ```javascript\n  // Webhook Receiver Handler\n  export async function handleWebhook(req, res) {\n    const signature = req.headers['x-signature'];\n    const isValid = verifyHmacSha256(req.rawBody, process.env.WEBHOOK_SECRET, signature);\n    if (!isValid) return res.status(401).json({ error: 'Invalid signature' });\n\n    const { transactionRef, amount, userId, orderId } = req.body;\n    // Check idempotency in Redis\n    const lockKey = `lock:tx:${transactionRef}`;\n    const acquired = await redis.set(lockKey, '1', 'NX', 'EX', 60);\n    if (!acquired) return res.status(200).json({ status: 'already_processed' });\n\n    await upgradeUserToPro(userId, 30); // 30 days\n    return res.status(200).json({ success: true });\n  }\n  ```",
      "createdAt": "2026-10-02T12:11:09.502Z"
    },
    {
      "id": "ARCH-104",
      "epicId": "epic-backend-infrastructure",
      "title": "Tiered Quota Limiter & Entitlement Enforcement Middleware (Hạn Mức Sử Dụng Gói Free vs Pro 5,000 Users): Lớp Middleware Kiểm Soát Hạn Mức Phân Tầng",
      "persona": "Đội ngũ kỹ thuật vận hành cần bảo vệ hệ thống khỏi các hành vi lạm dụng cào dữ liệu (scraping) hoặc tấn công DDoS",
      "action": "triển khai lớp middleware kiểm tra quyền hạn (Entitlement) và giới hạn tần suất gọi API (Rate Limiting) theo thuật toán Token Bucket / Sliding Window",
      "value": "bảo vệ tính khả dụng 99.99% của ứng dụng cho toàn bộ 5,000 người dùng, đồng thời đảm bảo người dùng trả phí Pro luôn được ưu tiên tài nguyên điện toán cao nhất",
      "priority": "must",
      "status": "in-progress",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-arch-104-quota-enforce",
          "given": "Học viên gói Free thực hiện bài luyện phát âm thứ 6 trong ngày",
          "when": "Request chạm vào API Gateway",
          "then": "Middleware chặn request trong vòng dưới 2ms, trả về mã lỗi HTTP 429 Too Many Requests kèm JSON Payload chứa chi tiết hạn mức và thời gian làm mới (resets_at: 00:00:00 GMT+7).",
          "completed": true
        },
        {
          "id": "ac-arch-104-frontend-design",
          "given": "Giao diện ứng dụng nhận mã lỗi 429 từ máy chủ",
          "when": "Xử lý phản hồi tại máy khách",
          "then": "Tự động mở cửa sổ thông báo nâng cấp ProPaywallModal với hiệu ứng trượt nhẹ nhàng, không gây crash ứng dụng hay màn hình trắng.",
          "completed": true
        },
        {
          "id": "ac-arch-104-backend-design",
          "given": "5,000 người dùng liên tục gửi request kiểm tra từ điển và nộp bài",
          "when": "Middleware phân giải quyền hạn",
          "then": "Sử dụng Redis Cluster kết hợp Lua script chạy nguyên tử (Atomic Lua Script) để kiểm tra hạn mức trong bộ nhớ RAM, thời gian thực thi trung bình < 1.5ms, chịu tải 10,000 RPS.",
          "completed": true
        },
        {
          "id": "ac-arch-104-l1-precision",
          "given": "Học viên Pro muốn sử dụng các tính năng nâng cao (AI Khẩu Hình 3D, Golden Speaker)",
          "when": "Middleware kiểm tra cờ tính năng entitlements",
          "then": "Mở quyền truy cập không giới hạn, đồng thời cấp độ ưu tiên của tác vụ trong hàng đợi xử lý âm thanh được gán nhãn HIGH_PRIORITY.",
          "completed": true
        },
        {
          "id": "ac-arch-104-a11y-fallback",
          "given": "Học viên kiểm tra số lượt học còn lại trong ngày",
          "when": "Xem thanh trạng thái tài khoản",
          "then": "Hiển thị huy hiệu rõ ràng: \"Gói Miễn Phí: Còn 3/5 bài hôm nay\", hỗ trợ tooltip giải thích khi rê chuột hoặc chạm vào.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-arch-104-be-lua",
          "title": "Viết Lua script cho Redis triển khai thuật toán Sliding Window Counter kiểm soát hạn mức phân tầng",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-arch-104-be-mw",
          "title": "Xây dựng Fastify/Express Middleware entitlementGuard kiểm tra token JWT và quyền hạn gói Pro",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-arch-104-be-headers",
          "title": "Bổ sung đầy đủ các header tiêu chuẩn RFC (X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset) vào mọi response",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-arch-104-be-scale",
          "title": "Thiết lập Redis sentinel / replication đảm bảo module Rate Limiter luôn có tính sẵn sàng cao (High Availability)",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-arch-104-qa",
          "title": "Viết kiểm thử tự động bắn dồn dập 50 request trong 1 giây để kiểm tra tính chính xác của Lua script",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/components/subscription/QuotaUsageBadge.jsx`\n- **Stitch Design Tokens**:\n  - Quota Pill: `font-mono text-xs px-2.5 py-1 rounded-full border border-slate-700 bg-slate-900 text-slate-300`.\n\n---\n\n### 🗄️ BACKEND DESIGN SPECIFICATION\n- **HTTP Headers (RFC 6585)**:\n  - `X-RateLimit-Limit`: 5 (Free) / 1000 (Pro)\n  - `X-RateLimit-Remaining`: 0\n  - `X-RateLimit-Reset`: 1730000000 (Timestamp).",
      "createdAt": "2026-10-02T12:11:09.502Z"
    },
    {
      "id": "ARCH-105",
      "epicId": "epic-backend-infrastructure",
      "title": "Cloud Object Storage & Ephemeral Audio Retention Lifecycle (Lưu Trữ Âm Thanh Cloudflare R2 Presigned URLs): Quản Lý Lưu Trữ Đám Mây & Vòng Đời Tệp Tạm",
      "persona": "Kỹ sư hạ tầng đám mây và chuyên gia bảo mật dữ liệu chịu trách nhiệm tối ưu chi phí lưu trữ và tuân thủ quy định bảo mật riêng tư",
      "action": "lưu trữ file âm thanh người dùng trên Cloudflare R2 thông qua cơ chế Presigned URLs trực tiếp từ trình duyệt, tự động xóa file tạm sau 24 giờ cho tài khoản Free",
      "value": "tiết kiệm 100% chi phí truyền tải dữ liệu (Zero Egress Fees), giảm tải băng thông máy chủ chính và ngăn ngừa nguy cơ phình to dung lượng ổ đĩa khi phục vụ 5,000 người dùng hàng ngày",
      "priority": "should",
      "status": "in-progress",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-arch-105-presigned-flow",
          "given": "Ứng dụng máy khách chuẩn bị tải lên bản ghi âm phát âm",
          "when": "Yêu cầu URL tải lên từ máy chủ",
          "then": "Hệ thống sinh Presigned PUT URL có thời hạn hiệu lực 5 phút; trình duyệt tải trực tiếp file âm thanh lên Cloudflare R2 mà không đi qua máy chủ API backend.",
          "completed": true
        },
        {
          "id": "ac-arch-105-frontend-design",
          "given": "Giao diện người dùng trong lúc tải file ghi âm",
          "when": "File đang được tải lên",
          "then": "Hiển thị thanh tiến trình tải lên mượt mà (0% -> 100%) viền Sky-500, không làm đơ giao diện người dùng và tự động chuyển sang trạng thái \"Đang phân tích âm thanh\" khi tải xong.",
          "completed": true
        },
        {
          "id": "ac-arch-105-backend-design",
          "given": "5,000 người dùng tải lên trung bình 20 file ghi âm/ngày (tổng 100,000 file âm thanh/ngày tương đương 15GB dữ liệu mới)",
          "when": "Xử lý luồng tải lên và vòng đời tệp",
          "then": "Máy chủ backend hoàn toàn không tốn băng thông truyền file âm thanh; Cloudflare R2 Lifecycle Policy tự động dọn dẹp các tệp tạm sau 24 giờ đối với gói Free, đảm bảo chi phí lưu trữ luôn dưới 5$ mỗi tháng.",
          "completed": true
        },
        {
          "id": "ac-arch-105-l1-precision",
          "given": "Học viên Pro muốn lưu trữ các bản ghi âm kỷ niệm để theo dõi tiến trình 6 tháng",
          "when": "Hệ thống xử lý lưu trữ cho người dùng Pro",
          "then": "File được chuyển vào thư mục lưu trữ lâu dài archive/{user_id}/ với chính sách bảo quản vĩnh viễn và mã hóa AES-256 ở trạng thái nghỉ (At-Rest Encryption).",
          "completed": true
        },
        {
          "id": "ac-arch-105-a11y-fallback",
          "given": "Học viên yêu cầu xóa toàn bộ dữ liệu ghi âm cá nhân theo chuẩn quyền riêng tư",
          "when": "Bấm nút \"Xóa lịch sử giọng nói của tôi\" trong phần Cài đặt",
          "then": "Hệ thống gọi API xóa toàn bộ bucket prefix của người dùng trong 3 giây và gửi thông báo xác nhận minh bạch.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-arch-105-be-r2",
          "title": "Tích hợp AWS S3 SDK tương thích với Cloudflare R2 và viết hàm generatePresignedPutUrl",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-arch-105-be-lifecycle",
          "title": "Cấu hình R2 Bucket Lifecycle Rules tự động xóa tiền tố uploads/temp/ sau 24 giờ",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-arch-105-fe-upload",
          "title": "Xây dựng component DirectAudioUploader trên frontend hỗ trợ XMLHttpRequest progress và resume khi mất mạng",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-arch-105-be-cors",
          "title": "Thiết lập CORS an toàn trên Cloudflare R2 chỉ cho phép nguồn gốc xuất xứ domain của ứng dụng",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-arch-105-qa",
          "title": "Kiểm thử tải lên 100 file âm thanh song song và xác minh tính hợp lệ của chữ ký URL",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/utils/audioUploader.js`\n- **Direct Upload Flow**:\n  1. `GET /api/v1/audio/presigned-url?filename=record.opus` -> Trả URL có ký số AWS SigV4\n  2. `PUT https://r2.vietphonics.com/temp/usr99/record.opus` trực tiếp qua fetch binary payload\n  3. Gửi metadata `{ r2Key: \"temp/usr99/record.opus\" }` về backend để chấm điểm.\n\n---\n\n### 🗄️ BACKEND DESIGN SPECIFICATION\n- **Cloudflare R2 Lifecycle Policy**:\n  ```json\n  {\n    \"Rules\": [\n      {\n        \"ID\": \"DeleteTempAudioAfter24Hours\",\n        \"Filter\": { \"Prefix\": \"audio-temp/\" },\n        \"Status\": \"Enabled\",\n        \"Expiration\": { \"Days\": 1 }\n      }\n    ]\n  }\n  ```",
      "createdAt": "2026-10-02T12:11:09.502Z"
    },
    {
      "id": "ADV-101",
      "epicId": "epic-advanced-ai-lab",
      "title": "Golden Speaker: Nghe Chính Giọng Mình Phát Âm Chuẩn Bản Ngữ (Voice-Cloned Self Model): Mô Hình Giọng Nói Bản Thân Chuẩn Hóa",
      "persona": "Học viên cảm thấy nản lòng hoặc xa lạ khi nghe giọng người bản xứ xa vời và khó bắt chước theo âm sắc phương Tây",
      "action": "thu âm một đoạn mẫu ngắn (10 giây) để AI sao chép âm sắc (timbre) và ngữ điệu cá nhân, tạo ra phiên bản \"Golden Speaker\" - chính giọng nói của học viên nhưng phát âm chuẩn xác 100% như người bản ngữ",
      "value": "tạo đột phá tâm lý học tập (Self-Identification Breakthrough): não bộ tiếp thu và bắt chước giọng của chính mình nhanh gấp 3 lần so với nghe giọng người lạ",
      "priority": "must",
      "status": "in-progress",
      "size": "XL",
      "points": 13,
      "acceptanceCriteria": [
        {
          "id": "ac-adv-101-voice-clone",
          "given": "Học viên hoàn thành việc đọc 3 câu mẫu hiệu chỉnh giọng (Calibration Sentences)",
          "when": "Hệ thống trích xuất vector đặc trưng âm sắc (Speaker Embedding Vector 256-D)",
          "then": "Bộ tổng hợp giọng nói Zero-Shot Voice Clone sinh ra mẫu phát âm chuẩn của từ mục tiêu bằng chính âm sắc của học viên trong vòng dưới 1.5 giây.",
          "completed": true
        },
        {
          "id": "ac-adv-101-frontend-design",
          "given": "Giao diện phòng thí nghiệm Golden Speaker Lab trong AdvancedAiLabView",
          "when": "Render trên màn hình",
          "then": "Hiển thị huy hiệu Golden Voice phát sáng viền vàng kim Amber-400, trình phát âm thanh đối chiếu 3 kênh (1. Giọng học viên thực tế, 2. Giọng Golden Speaker của chính mình, 3. Giọng người bản ngữ gốc) với dải sóng âm đồng bộ.",
          "completed": true
        },
        {
          "id": "ac-adv-101-backend-design",
          "given": "5,000 học viên cùng tạo và nghe các bản mẫu Golden Speaker",
          "when": "Xử lý tổng hợp giọng nói qua API POST /api/v1/ai/golden-speaker-synthesize",
          "then": "Vector âm sắc 256 chiều của học viên được lưu trong Redis Cache (1KB/user), các file audio sinh ra được lưu trên CDN edge cache với khóa golden:{user_id}:{word_hash}, giúp giảm tải 90% GPU inference server.",
          "completed": true
        },
        {
          "id": "ac-adv-101-l1-precision",
          "given": "Học viên người Việt giữ âm sắc giọng trầm hoặc bổng đặc trưng tiếng Việt",
          "when": "Golden Speaker tổng hợp giọng nói",
          "then": "Giữ nguyên 100% tần số cơ bản F0 và âm sắc tự nhiên của học viên, nhưng sửa triệt để các lỗi phụ âm cuối (/t/, /k/, /s/, /z/) và mở rộng dải F1/F2 của các nguyên âm chuẩn Anh-Mỹ.",
          "completed": true
        },
        {
          "id": "ac-adv-101-a11y-fallback",
          "given": "Học viên muốn chuyển đổi nhanh giữa các mẫu âm thanh",
          "when": "Nhấn các phím tắt A (Giọng mình), B (Golden Speaker), C (Bản ngữ)",
          "then": "Âm thanh tương ứng phát ngay lập tức không bị khựng, kèm thông báo trạng thái trực quan trên màn hình.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-adv-101-fe-ui",
          "title": "Xây dựng giao diện GoldenSpeakerLab.jsx với 3 kênh so sánh âm thanh trực quan và hoạt ảnh sóng âm đa tầng",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-adv-101-be-model",
          "title": "Tích hợp mô hình XTTS-v2 / OpenVoice trích xuất speaker embedding 256 chiều từ đoạn thu âm 10 giây",
          "category": "AI/DSP",
          "completed": true
        },
        {
          "id": "t-adv-101-be-cache",
          "title": "Thiết kế chiến lược bộ nhớ đệm Redis lưu trữ speaker embedding cho 5,000 users với tốc độ tải < 2ms",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-adv-101-be-scale",
          "title": "Triển khai Triton Inference Server kết hợp GPU queue xử lý tổng hợp giọng nói thời gian thực P95 < 1.5s",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-adv-101-qa",
          "title": "Kiểm thử độ tương đồng âm sắc (Cosine Similarity > 0.88) giữa giọng thật của học viên và giọng Golden Speaker",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/views/AdvancedAiLabView.jsx` (Tab: `golden-speaker`)\n- **Stitch Design Tokens**:\n  - Golden Aura: `shadow-[0_0_35px_rgba(245,158,11,0.4)] border-2 border-amber-400/80 rounded-3xl p-6 bg-slate-900/90`\n  - Channel Play Buttons: Student (Rose #f43f5e), Golden (Amber #f59e0b), Native (Emerald #10b981).\n\n---\n\n### 🗄️ BACKEND DESIGN SPECIFICATION\n- **REST API Endpoint**:\n  ```http\n  POST /api/v1/ai/golden-speaker-synthesize\n  Authorization: Bearer <JWT>\n  Content-Type: application/json\n\n  Request Body:\n  {\n    \"userId\": \"usr_99a8b12f\",\n    \"word\": \"specifically\",\n    \"targetIpa\": \"/spəˈsɪfɪkli/\"\n  }\n\n  Response 200 OK:\n  {\n    \"goldenAudioUrl\": \"https://r2.vietphonics.com/golden/usr99_specifically.opus\",\n    \"cached\": true,\n    \"timbreSimilarity\": 0.91,\n    \"synthesizedInMs\": 320\n  }\n  ```",
      "createdAt": "2026-10-03T06:51:58.830Z"
    },
    {
      "id": "ADV-102",
      "epicId": "epic-advanced-ai-lab",
      "title": "Webcam Lip & Jaw Tracking: Soi Khẩu Hình Bằng Camera Ngay Trên Trình Duyệt (MediaPipe Face Landmarker): Theo Dõi Khẩu Hình Trực Quan",
      "persona": "Học viên gặp khó khăn khi hình dung độ mở miệng, độ bè của môi và độ tròn môi khi phát âm các nguyên âm khó",
      "action": "bật webcam để AI tự động vẽ lưới khẩu hình (Lip Mesh), đo đạc độ mở hàm (Jaw Openness %) và độ bè môi (Lip Spread %) theo thời gian thực ngay trên trình duyệt",
      "value": "cung cấp phản hồi sinh học thị giác (Visual Biofeedback) tức thì, giúp học viên tự điều chỉnh cơ miệng chuẩn xác mà không cần giáo viên ngồi kèm bên cạnh",
      "priority": "must",
      "status": "in-progress",
      "size": "XL",
      "points": 13,
      "acceptanceCriteria": [
        {
          "id": "ac-adv-102-mesh-tracking",
          "given": "Học viên cấp quyền camera trên trình duyệt",
          "when": "Học viên phát âm từ mục tiêu (e.g., \"apple\" với nguyên âm /æ/)",
          "then": "Mô hình MediaPipe Face Landmarker nhận diện 468 điểm mốc khuôn mặt với tốc độ 30-60 FPS, vẽ lưới môi phát sáng và hiển thị chỉ số độ mở miệng (Open: 65%) và độ bè môi (Spread: 82%).",
          "completed": true
        },
        {
          "id": "ac-adv-102-frontend-design",
          "given": "Giao diện Webcam Lip Tracking View",
          "when": "Camera hoạt động",
          "then": "Khung hình video bo góc mềm mại viền kính mờ glassmorphism, lớp phủ canvas lưới mốc môi 40 điểm phát sáng xanh neon (#00f5d4), hai thanh đo gauge (Độ mở hàm Jaw & Độ căng môi Tension) đặt ở góc phải với chỉ số chuẩn (Target Zone) được đánh dấu vạch xanh.",
          "completed": true
        },
        {
          "id": "ac-adv-102-backend-design",
          "given": "5,000 học viên cùng lúc bật webcam luyện khẩu hình trên các loại laptop và điện thoại",
          "when": "Chạy mô hình thị giác máy tính",
          "then": "100% việc nhận diện mốc khuôn mặt chạy trên WebAssembly (Wasm) và GPU máy khách (WebGL/WebGPU) thông qua MediaPipe Vision Tasks; máy chủ backend chịu tải 0% CPU và 0 byte băng thông video.",
          "completed": true
        },
        {
          "id": "ac-adv-102-l1-precision",
          "given": "Học viên phát âm âm /æ/ nhưng khẩu hình quá hẹp như âm /e/ của tiếng Việt",
          "when": "Hệ thống so sánh độ mở hàm với tiêu chuẩn",
          "then": "Vòng đo hàm chuyển sang màu cảnh báo hổ phách kèm chỉ dẫn trực quan: \"Hạ hàm dưới sâu hơn 15mm! Miệng mở rộng gấp đôi như khi ngáp\".",
          "completed": true
        },
        {
          "id": "ac-adv-102-a11y-fallback",
          "given": "Học viên không có camera hoặc từ chối cấp quyền",
          "when": "Webcam không khả dụng",
          "then": "Hệ thống tự động chuyển sang chế độ \"Mô hình 3D Giải Phẫu Ảo (Virtual 3D Mouth Simulator)\" với ảnh động mặt cắt chuyển động của lưỡi và môi để học viên quan sát.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-adv-102-fe-mediapipe",
          "title": "Tích hợp @mediapipe/tasks-vision FaceLandmarker chạy hoàn toàn trên Web Worker và WebGL",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-adv-102-fe-calc",
          "title": "Viết thuật toán tính toán tỷ lệ mở hàm (Upper Lip to Lower Lip Euclidean Distance) và độ bè mép môi (Mouth Corner Width)",
          "category": "AI/DSP",
          "completed": true
        },
        {
          "id": "t-adv-102-fe-canvas",
          "title": "Xây dựng Canvas Overlay vẽ 40 điểm môi phát sáng neon với hiệu ứng phản hồi xúc giác thị giác 60 FPS",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-adv-102-be-zero",
          "title": "Tối ưu hóa tài nguyên RAM máy khách < 85MB bằng cách giải phóng video stream frame buffers đúng cách",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-adv-102-qa",
          "title": "Kiểm thử khả năng chạy mượt mà trên các thiết bị cấu hình yếu và trong điều kiện ánh sáng phòng yếu",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/components/advanced/WebcamLipTracker.jsx`\n- **Stitch Design Tokens**:\n  - Video Frame: `rounded-3xl border-2 border-slate-700 overflow-hidden relative shadow-2xl aspect-[4/3] max-w-md`\n  - Neon Lip Overlay: `stroke-[#00f5d4] stroke-2 drop-shadow-[0_0_8px_#00f5d4]`\n  - Gauge Pill: `bg-slate-900/80 backdrop-blur border border-slate-700 rounded-2xl p-3 flex flex-col gap-1`.",
      "createdAt": "2026-10-03T06:51:58.830Z"
    },
    {
      "id": "ADV-103",
      "epicId": "epic-advanced-ai-lab",
      "title": "Live Vowel Space Chart: Biểu Đồ Nguyên Âm F1/F2 Thời Gian Thực (Visual Formant Biofeedback): Biểu Đồ Không Gian Nguyên Âm Thời Gian Thực",
      "persona": "Người học muốn hiểu bản chất khoa học của các nguyên âm tiếng Anh và cần phản hồi trực quan xem lưỡi của mình đã đặt đúng vị trí chưa",
      "action": "phát âm các nguyên âm tiếng Anh và quan sát chấm tròn giọng nói của mình di chuyển trực tiếp trên biểu đồ tọa độ Formant F1 (Độ cao lưỡi) vs F2 (Vị trí trước/sau của lưỡi)",
      "value": "chuyển đổi khái niệm trừu tượng \"đặt lưỡi ở đâu\" thành tọa độ trực quan trên bản đồ âm thanh, giúp người học sửa lỗi phát âm nguyên âm chỉ sau 3 lần thử",
      "priority": "must",
      "status": "in-progress",
      "size": "L",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-adv-103-formant-extract",
          "given": "Học viên ngân dài một nguyên âm bất kỳ vào micro (e.g., /iː/, /uː/, /ɑː/)",
          "when": "Hệ thống phân tích phổ âm thanh thời gian thực bằng thuật toán Burg LPC (Linear Predictive Coding)",
          "then": "Trích xuất chính xác 2 tần số cộng hưởng F1 (200-1000Hz) và F2 (600-3000Hz) sau mỗi 50ms với độ trễ dưới 30ms.",
          "completed": true
        },
        {
          "id": "ac-adv-103-frontend-design",
          "given": "Giao diện Biểu đồ Vowel Space Chart trong AdvancedAiLabView",
          "when": "Hiển thị trên màn hình",
          "then": "Biểu đồ tọa độ 2 trục chuẩn ngữ âm học (Trục Y đảo ngược F1 - Độ cao của lưỡi: High -> Low; Trục X đảo ngược F2 - Vị trí lưỡi: Front -> Back), các vùng elip mục tiêu của 12 nguyên âm đơn tiếng Anh hiển thị màu pastel thanh lịch, chấm tròn học viên tỏa sáng radar theo âm lượng.",
          "completed": true
        },
        {
          "id": "ac-adv-103-backend-design",
          "given": "5,000 học viên cùng lúc luyện tập trên biểu đồ nguyên âm",
          "when": "Hệ thống tính toán giải thuật ngữ âm",
          "then": "Toàn bộ thuật toán Burg LPC Formant Extraction được biên dịch sang WebAssembly (Wasm) chạy trực tiếp trong AudioWorkletNode của trình duyệt máy khách, máy chủ backend hoàn toàn không phải xử lý tín hiệu DSP.",
          "completed": true
        },
        {
          "id": "ac-adv-103-l1-precision",
          "given": "Học viên phát âm /ɪ/ (trong từ \"ship\") nhưng kéo F1/F2 rơi vào vùng của /iː/ (trong từ \"sheep\")",
          "when": "Chấm tọa độ rơi ra ngoài elip mục tiêu",
          "then": "Biểu đồ vẽ mũi tên vector chỉ đường từ vị trí hiện tại sang elip /ɪ/ kèm hướng dẫn: \"Thả lỏng cơ lưỡi và hạ hàm xuống một chút để đưa chấm về vùng mục tiêu màu xanh ngọc\".",
          "completed": true
        },
        {
          "id": "ac-adv-103-a11y-fallback",
          "given": "Người dùng xem lại kết quả phân tích",
          "when": "Bấm nút \"Tóm tắt âm học\"",
          "then": "Bảng số liệu hiển thị rõ ràng tần số F1: 320 Hz, F2: 2250 Hz kèm đánh giá độ lệch (Delta Offset: 8%) bằng phông JetBrains Mono dễ đọc.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-adv-103-fe-lpc",
          "title": "Triển khai thuật toán Burg LPC Formant Extractor trong AudioWorkletNode xử lý tín hiệu 50 lần/giây",
          "category": "Audio/DSP",
          "completed": true
        },
        {
          "id": "t-adv-103-fe-chart",
          "title": "Xây dựng component VowelSpaceChart.jsx với SVG tương tác, các vùng elip phân bố chuẩn IPA và vệt quỹ đạo di chuyển (trail effect)",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-adv-103-fe-norm",
          "title": "Tích hợp công thức chuẩn hóa âm học Bark Scale / Lobanov Normalization bù đắp khác biệt giữa giọng nam, giọng nữ và trẻ em",
          "category": "Audio/DSP",
          "completed": true
        },
        {
          "id": "t-adv-103-be-zero",
          "title": "Tối ưu hóa bộ nhớ AudioWorklet và Canvas đảm bảo không gây rò rỉ rác bộ nhớ (Zero Garbage Collection Jitter)",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-adv-103-qa",
          "title": "Kiểm thử với 50 mẫu phát âm nguyên âm chuẩn IPA quốc tế để kiểm tra độ chính xác tọa độ F1/F2 đạt trên 92%",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/views/AdvancedAiLabView.jsx` (Tab: `vowel-space`)\n- **Stitch Design Tokens**:\n  - Inverted Acoustic Chart: `w-full max-w-xl h-96 bg-slate-950 border border-slate-800 rounded-3xl p-6 relative`\n  - Vowel Target Ellipse: `fill-emerald-500/10 stroke-emerald-500/40 stroke-2`\n  - Realtime User Dot: `w-4 h-4 rounded-full bg-rose-500 shadow-[0_0_15px_#f43f5e] animate-ping`.",
      "createdAt": "2026-10-03T06:51:58.830Z"
    },
    {
      "id": "ADV-104",
      "epicId": "epic-advanced-ai-lab",
      "title": "AI Phonetics Coach Có Trí Nhớ: Chẩn Đoán Theo Đặc Trưng Cấu Âm & Nhớ Lỗi Qua Các Buổi Học (LLM + Articulatory Features): Huấn Luyện Viên Ngữ Âm AI Có Bộ Nhớ Dài Hạn",
      "persona": "Học viên muốn có một người gia sư phát âm riêng hiểu rõ thói quen, điểm mạnh và các tật phát âm cố hữu của mình qua từng ngày",
      "action": "trò chuyện và nhận lời khuyên từ Huấn luyện viên AI, người ghi nhớ toàn bộ lịch sử luyện tập 30 ngày qua và giải thích lỗi theo ngôn ngữ giải phẫu học cấu âm trực quan",
      "value": "mang lại cảm giác được đồng hành 1:1 bởi một chuyên gia ngữ âm tận tâm, biến những nhận xét chung chung thành phác đồ điều trị ngữ âm chính xác cho riêng từng học viên",
      "priority": "must",
      "status": "in-progress",
      "size": "XL",
      "points": 13,
      "acceptanceCriteria": [
        {
          "id": "ac-adv-104-memory-chat",
          "given": "Học viên mở phiên tư vấn với Huấn luyện viên AI sau khi vừa hoàn thành bài luyện âm đuôi",
          "when": "Học viên hỏi: \"Hôm nay em phát âm âm /t/ đã đỡ hơn hôm qua chưa cô?\"",
          "then": "Huấn luyện viên AI truy vấn bộ nhớ vector (Vector Semantic Memory) và trả lời chính xác: \"Chào bạn! So với buổi học thứ Ba khi bạn nuốt 80% âm /t/, hôm nay bạn đã bật âm chuẩn 65%, đặc biệt từ 'contact' bạn đã phát âm rất rõ!\".",
          "completed": true
        },
        {
          "id": "ac-adv-104-frontend-design",
          "given": "Giao diện phòng tư vấn AI Coach trong AdvancedAiLabView",
          "when": "Hiển thị cuộc trò chuyện",
          "then": "Ảnh đại diện AI Coach phong cách học viện sư phạm Oxford sang trọng, các thẻ \"Hồ sơ trí nhớ học viên\" (Memory Cards) hiển thị bên cạnh liệt kê: Các âm đã thuần thục, Các âm cần theo dõi, Tỷ lệ cải thiện 7 ngày qua có biểu đồ Sparkline mini.",
          "completed": true
        },
        {
          "id": "ac-adv-104-backend-design",
          "given": "5,000 học viên đồng thời tương tác với AI Coach",
          "when": "Hệ thống truy xuất ngữ cảnh và sinh câu trả lời",
          "then": "Lịch sử học tập được nén thành bản tóm tắt hồ sơ ngữ âm (User Phonetic Profile JSON < 2KB) lưu trong Redis; mô hình ngôn ngữ phản hồi qua Server-Sent Events (SSE) streaming với TTFT (Time To First Token) < 350ms.",
          "completed": true
        },
        {
          "id": "ac-adv-104-l1-precision",
          "given": "AI phát hiện lỗi đặc trưng do ảnh hưởng cấu âm tiếng Việt",
          "when": "Giải thích nguyên nhân mắc lỗi cho học viên",
          "then": "AI không chỉ nói đúng hay sai mà giải thích rõ cơ chế cấu âm: \"Trong tiếng Việt các âm /p, t, k/ ở cuối là âm khép không bật (unreleased stop), nhưng trong tiếng Anh bạn phải nén khí rồi bật đầu lưỡi ra\".",
          "completed": true
        },
        {
          "id": "ac-adv-104-a11y-fallback",
          "given": "Học viên muốn nghe AI Coach đọc lời nhận xét bằng giọng nói",
          "when": "Bấm nút \"Đọc lời khuyên\"",
          "then": "Hệ thống phát âm thanh giọng nữ ấm áp tự nhiên với tốc độ 1.0x, văn bản đang đọc được bôi đậm highlight đồng bộ theo từng từ.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-adv-104-fe-ui",
          "title": "Xây dựng giao diện AiCoachLab.jsx với khung chat streaming markdown và sidebar thẻ nhớ thông tin người học",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-adv-104-be-rag",
          "title": "Thiết kế hệ thống RAG ngữ âm (Phonetic Feature Store) kết hợp cơ sở tri thức giải phẫu cấu âm tiếng Anh và lỗi L1 tiếng Việt",
          "category": "AI/DSP",
          "completed": true
        },
        {
          "id": "t-adv-104-be-mem",
          "title": "Xây dựng module PhoneticProfileMemory tự động cập nhật bản tóm tắt tiến độ người học sau mỗi bài tập",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-adv-104-be-scale",
          "title": "Tối ưu hóa streaming LLM gateway với connection pool và prompt caching giảm 60% chi phí token cho 5,000 users",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-adv-104-qa",
          "title": "Kiểm thử hộp đen độ an toàn và chính xác của AI Coach: không bịa đặt số liệu học tập và luôn đưa ra lời khuyên chuẩn IPA",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/views/AdvancedAiLabView.jsx` (Tab: `ai-coach`)\n- **Stitch Design Tokens**:\n  - Coach Message: `bg-slate-900 border border-slate-800 rounded-3xl p-5 text-slate-200 text-sm leading-relaxed max-w-xl`\n  - Memory Card: `bg-indigo-950/30 border border-indigo-500/30 rounded-2xl p-4`.\n\n---\n\n### 🗄️ BACKEND DESIGN SPECIFICATION\n- **REST / SSE Endpoint**:\n  ```http\n  POST /api/v1/ai/coach/chat-stream\n  Authorization: Bearer <JWT>\n  Content-Type: application/json\n\n  Request Body:\n  {\n    \"userId\": \"usr_99a8b12f\",\n    \"prompt\": \"Hôm nay em phát âm âm /t/ đã đỡ hơn chưa cô?\"\n  }\n\n  Response (text/event-stream):\n  data: {\"token\": \"Chào \"}\n  data: {\"token\": \"bạn! \"}\n  data: {\"token\": \"So với buổi học trước...\"}\n  ```",
      "createdAt": "2026-10-03T06:51:58.830Z"
    },
    {
      "id": "ADV-105",
      "epicId": "epic-advanced-ai-lab",
      "title": "Connected Speech Lab: Luyện Nối Âm, Nuốt Âm & Biến Âm Như Người Bản Ngữ (Linking, Reduction, Elision, Assimilation): Phòng Thí Nghiệm Nói Nối Âm Tự Nhiên",
      "persona": "Người học có thể phát âm từng từ đơn lẻ rất tốt nhưng khi ghép vào câu lại nói rời rạc như robot, thiếu nhịp điệu tự nhiên của người bản ngữ",
      "action": "luyện tập 4 hiện tượng biến âm trong nói tự nhiên: Nối phụ âm sang nguyên âm (Consonant-to-Vowel Linking), Nuốt âm (Elision e.g. \"next door\" -> \"nex' door\"), Biến âm đồng hóa (Assimilation e.g. \"did you\" -> \"didja\"), và Dạng yếu của từ chức năng (Weak Forms of \"to\", \"for\", \"and\")",
      "value": "giúp giọng nói trở nên mượt mà, lưu loát và tự nhiên như người bản xứ, cải thiện điểm tiêu chí Fluency & Coherence trong kỳ thi IELTS Speaking từ 6.0 lên 7.5+",
      "priority": "must",
      "status": "in-progress",
      "size": "L",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-adv-105-linking-detect",
          "given": "Học viên luyện câu \"Hold on a second\" (/hoʊld ɒn ə ˈsɛkənd/)",
          "when": "Học viên nói vào micro với sự liên kết âm \"Hold-on-a\"",
          "then": "Hệ thống nhận diện sự liên tục của dải phổ formant tại các điểm giao nhau (Boundaries), hiển thị ký hiệu vòng cung nối âm rực rỡ và chấm điểm độ mượt mà (Flow Score: 92%).",
          "completed": true
        },
        {
          "id": "ac-adv-105-frontend-design",
          "given": "Giao diện Connected Speech Lab trong AdvancedAiLabView",
          "when": "Hiển thị câu luyện tập",
          "then": "Câu văn được trình bày lớn với các vòng cung nối âm màu xanh ngọc (Linking Curve) bắc cầu giữa các từ, ký hiệu gạch chéo mờ đối với âm bị nuốt (Elision), và ký tự schwa /ə/ hiển thị trên các từ chức năng yếu; dải sóng âm hiển thị chuyển động nhịp nhàng.",
          "completed": true
        },
        {
          "id": "ac-adv-105-backend-design",
          "given": "5,000 học viên đồng thời nộp các đoạn nói câu dài",
          "when": "Hệ thống đối soát phân đoạn âm (Phonetic Forced Alignment)",
          "then": "Sử dụng mô hình CTC Forced Alignment tối ưu hóa trên ONNX Runtime, thời gian căn chỉnh và nhận diện các điểm nối âm trả về trong vòng dưới 220ms, đảm bảo thông lượng 300 câu/giây.",
          "completed": true
        },
        {
          "id": "ac-adv-105-l1-precision",
          "given": "Người Việt có thói quen phát âm tiếng Anh ngắt từng từ một (Staccato Monosyllabic habit) do cấu trúc đơn lập của tiếng mẹ đẻ",
          "when": "Học viên ngập ngừng ngắt quãng giữa các từ cần nối",
          "then": "Hệ thống hiển thị cảnh báo: \"Lỗi ngắt từ: Bạn đang phát âm ngắt quãng như tiếng Việt! Hãy giữ hơi thở liên tục và nối phụ âm /d/ sang nguyên âm /ɒ/ thành 'hol-don'\".",
          "completed": true
        },
        {
          "id": "ac-adv-105-a11y-fallback",
          "given": "Học viên muốn nghe sự khác biệt giữa Nói Từng Từ Rời Rạc vs Nói Nối Âm Bản Ngữ",
          "when": "Bấm nút toggle \"So Sánh Robot vs Bản Ngữ\"",
          "then": "Hệ thống phát lần lượt 2 bản thu âm để học viên nghe và cảm nhận rõ sự khác biệt kỳ diệu về độ mượt mà của ngữ lưu.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-adv-105-fe-ui",
          "title": "Xây dựng giao diện ConnectedSpeechLab.jsx với các vòng cung SVG nối âm động và ký hiệu ngữ âm tương tác",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-adv-105-be-align",
          "title": "Tích hợp mô hình CTC Forced Alignment phân tích chính xác thời điểm bắt đầu và kết thúc của từng âm tố",
          "category": "AI/DSP",
          "completed": true
        },
        {
          "id": "t-adv-105-be-rules",
          "title": "Xây dựng bộ quy tắc ngữ âm (Phonological Rule Engine) cho 4 hiện tượng: C-V Linking, Flap-T, Elision và Weak Forms",
          "category": "AI/DSP",
          "completed": true
        },
        {
          "id": "t-adv-105-be-scale",
          "title": "Tối ưu hóa pipeline suy luận AI với bộ nhớ đệm kết quả alignment cho các câu mẫu phổ biến phục vụ 5,000 users",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-adv-105-qa",
          "title": "Kiểm thử thuật toán với 100 câu hội thoại chứa hiện tượng nối âm và nuốt âm với các cấp độ tốc độ nói khác nhau",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/views/AdvancedAiLabView.jsx` (Tab: `connected-speech`)\n- **Stitch Design Tokens**:\n  - Linking Bridge Arc: `stroke-emerald-400 stroke-[3px] stroke-dashed animate-pulse`\n  - Word Span: `text-2xl font-bold font-['Plus_Jakarta_Sans'] text-slate-100 px-2`.",
      "createdAt": "2026-10-03T06:51:58.830Z"
    },
    {
      "id": "ADV-106",
      "epicId": "epic-advanced-ai-lab",
      "title": "Intelligibility Score: Đo \"Người Nghe Có Hiểu Bạn Không?\" Thay Vì Chỉ Đo Giống Người Bản Ngữ (Multi-ASR Listener Panel): Điểm Số Độ Thông Hiểu Đa Giác Quan",
      "persona": "Người đi làm và giao tiếp quốc tế không nhất thiết muốn có giọng chuẩn 100% như người Mỹ, mà ưu tiên việc người nghe toàn cầu (Ấn Độ, Singapore, Châu Âu, Mỹ) có hiểu rõ ý mình nói hay không",
      "action": "nói một câu tiếng Anh tự do và xem thử nghiệm \"Hội đồng thính giả ảo đa quốc gia (Virtual Multi-ASR Panel)\" xem có bao nhiêu công cụ AI và người nghe hiểu chính xác từng từ",
      "value": "giảm bớt áp lực hoàn hảo hóa giọng bản ngữ (Native-like Accent Perfectionism), tập trung vào mục tiêu tối thượng của giao tiếp là độ thông hiểu (Intelligibility & Comprehensibility)",
      "priority": "should",
      "status": "in-progress",
      "size": "L",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-adv-106-multi-asr",
          "given": "Học viên nói một câu vào micro (e.g., \"We need to focus on user experience\")",
          "when": "Hệ thống gửi đoạn âm thanh qua 3 bộ nhận diện tiếng nói khác nhau (OpenAI Whisper, Google Cloud Speech, và Meta wav2vec2)",
          "then": "Tổng hợp điểm số thông hiểu tổng thể (Intelligibility Score: 94%), chỉ ra từ nào cả 3 máy đều nghe rõ, từ nào có nguy cơ bị nghe nhầm.",
          "completed": true
        },
        {
          "id": "ac-adv-106-frontend-design",
          "given": "Giao diện Intelligibility Score Panel trong AdvancedAiLabView",
          "when": "Hiển thị kết quả chấm điểm",
          "then": "Đồng hồ đo tốc độ (Gauge Meter) màu xanh ngọc lục bảo hiển thị điểm % thông hiểu lớn ở giữa, bên dưới là bảng ma trận 3 người nghe ảo (Mỹ, Anh, Toàn cầu) với trạng thái \"Hiểu 100%\" kèm danh sách các từ bị nghe nhầm (Confusion Matrix) tô vàng cảnh báo.",
          "completed": true
        },
        {
          "id": "ac-adv-106-backend-design",
          "given": "5,000 học viên kiểm tra độ thông hiểu định kỳ",
          "when": "Chạy kiểm tra đa mô hình",
          "then": "Để tránh chi phí gọi nhiều API thương mại, hệ thống chạy 1 mô hình Whisper đa ngôn ngữ cục bộ kết hợp với mô hình Acoustic Confidence Scorer gọn nhẹ (chỉ 15MB) trích xuất trực tiếp xác suất âm vị (Posterior Probabilities), đáp ứng dưới 300ms cho 5,000 users.",
          "completed": true
        },
        {
          "id": "ac-adv-106-l1-precision",
          "given": "Học viên phát âm từ \"sheet\" nhưng do thiếu âm đuôi hoặc sai âm đầu /ʃ/ khiến máy nghe thành \"shit\"",
          "when": "Bảng từ dễ gây hiểu lầm (Critical Misunderstandings) phân tích",
          "then": "Đánh dấu cảnh báo nguy cơ cao (High Semantic Risk): \"Cảnh báo hiểu lầm: Người nghe có thể nghe nhầm sang từ nhạy cảm! Hãy kéo dài âm /iː/ và cong môi phát âm /ʃ/\".",
          "completed": true
        },
        {
          "id": "ac-adv-106-a11y-fallback",
          "given": "Học viên muốn xem chi tiết dạng bảng",
          "when": "Bấm nút \"Xem bảng ma trận từ\"",
          "then": "Bảng hiển thị tương phản cao theo chuẩn WCAG 2.1 AA, cho phép dùng phím Tab duyệt qua từng từ và nghe lại âm thanh tương ứng.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-adv-106-fe-ui",
          "title": "Xây dựng giao diện IntelligibilityLab.jsx với đồng hồ đo Gauge Meter và ma trận rủi ro hiểu lầm ngữ nghĩa (Semantic Risk Matrix)",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-adv-106-be-engine",
          "title": "Phát triển thuật toán tính điểm Intelligibility Index dựa trên tích chập độ tự tin nhận diện âm vị (Phonetic Confidence Convolutions)",
          "category": "AI/DSP",
          "completed": true
        },
        {
          "id": "t-adv-106-be-risk",
          "title": "Xây dựng cơ sở dữ liệu các cặp từ nguy hiểm dễ gây hiểu lầm nhạy cảm trong giao tiếp kinh doanh và công sở",
          "category": "AI/DSP",
          "completed": true
        },
        {
          "id": "t-adv-106-be-scale",
          "title": "Tối ưu hóa mô hình Acoustic Confidence Scorer chạy trên CPU backend với lượng RAM dưới 200MB",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-adv-106-qa",
          "title": "Kiểm thử với 200 mẫu ghi âm của người Việt có giọng địa phương khác nhau để đánh giá độ tin cậy của chỉ số",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/views/AdvancedAiLabView.jsx` (Tab: `intelligibility`)\n- **Stitch Design Tokens**:\n  - Intelligibility Gauge: Semi-circle Arc `stroke-emerald-400`, Percentage: `font-mono text-5xl font-black text-white`\n  - Risk Card: `bg-rose-950/30 border border-rose-500/40 rounded-2xl p-4`.",
      "createdAt": "2026-10-03T06:51:58.830Z"
    },
    {
      "id": "ADV-107",
      "epicId": "epic-advanced-ai-lab",
      "title": "Spontaneous Speech Voice Journal: Nhật Ký Nói Tự Do Mỗi Ngày & Chấm Phát Âm Không Kịch Bản: Nhật Ký Thoại Tự Do Đo Khoảng Cách Chuyển Di",
      "persona": "Người học có thể đọc kịch bản có sẵn rất chuẩn nhưng khi tự nói tự do không có văn bản trước mắt thì các tật phát âm cũ lập tức quay trở lại",
      "action": "thu âm nhật ký thoại tự do 60 giây mỗi ngày theo chủ đề mở (e.g., \"Kể về một điều khiến bạn vui hôm nay\"), AI tự động bóc băng phụ đề và chấm điểm phát âm không kịch bản",
      "value": "đo lường và thu hẹp \"Khoảng cách chuyển di (Transfer Gap)\" giữa kỹ năng đọc văn bản và phản xạ nói tự nhiên trong đời thực, giúp học viên làm chủ hoàn toàn giọng nói của mình",
      "priority": "should",
      "status": "in-progress",
      "size": "L",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-adv-107-journal-recording",
          "given": "Học viên nhận chủ đề gợi ý ngày hôm nay",
          "when": "Bấm thu âm và nói tự do từ 30 đến 90 giây",
          "then": "Hệ thống tự động chuyển giọng nói thành văn bản thời gian thực, căn chỉnh từng từ với tín hiệu âm thanh và chấm điểm phát âm của toàn bộ các từ được nói ra.",
          "completed": true
        },
        {
          "id": "ac-adv-107-frontend-design",
          "given": "Giao diện Voice Journal trong AdvancedAiLabView",
          "when": "Kết thúc bài thu âm tự do",
          "then": "Hiển thị đoạn nhật ký dạng văn bản có tô màu từng từ theo điểm số (Xanh >85%, Vàng 60-84%, Đỏ <60%), thanh đo \"Khoảng Cách Chuyển Di (Transfer Gap: -12%)\" so sánh giữa điểm đọc kịch bản và điểm nói tự do, danh sách nhật ký cũ dạng dòng thời gian thanh lịch.",
          "completed": true
        },
        {
          "id": "ac-adv-107-backend-design",
          "given": "5,000 học viên nộp nhật ký thoại mỗi buổi tối",
          "when": "Hệ thống lưu trữ và xử lý các bản ghi âm dài 60 giây",
          "then": "File audio được nén Opus 32kbps (~240KB/phút) lưu trữ an toàn trên Cloudflare R2, tác vụ phiên âm và chấm điểm được đưa vào hàng đợi nền với thời gian xử lý hoàn tất dưới 3.5 giây.",
          "completed": true
        },
        {
          "id": "ac-adv-107-l1-precision",
          "given": "Học viên khi nói tự do thường có thói quen chèn âm đệm tiếng Việt (e.g., \"ờ\", \"ừm\", hoặc nuốt sạch âm cuối /s/)",
          "when": "Bộ phân tích nhật ký rà soát đoạn nói",
          "then": "Báo cáo ghi nhận: \"Khi nói tự do, bạn đã quên phát âm âm cuối /s/ trong 6 từ liên tiếp. Hãy tập thở chậm lại để giữ vững cơ miệng!\".",
          "completed": true
        },
        {
          "id": "ac-adv-107-a11y-fallback",
          "given": "Học viên xem lại các bài nhật ký trong quá khứ",
          "when": "Bấm vào bất kỳ từ nào trên đoạn văn bản",
          "then": "Trình phát âm thanh nhảy ngay đến đúng mili-giây học viên nói từ đó và phát lại đoạn âm thanh tương ứng, hỗ trợ phím mũi tên tua lại 5 giây.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-adv-107-fe-ui",
          "title": "Xây dựng giao diện VoiceJournalLab.jsx với dòng thời gian Timeline lịch sử và trình phát audio đồng bộ từ ngữ (Interactive Word-Synced Player)",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-adv-107-be-asr",
          "title": "Tích hợp mô hình Whisper ASR kết hợp Word-level Timestamp Alignment trích xuất thời điểm chính xác của từng từ",
          "category": "AI/DSP",
          "completed": true
        },
        {
          "id": "t-adv-107-be-gap",
          "title": "Xây dựng thuật toán tính toán Transfer Gap Index so sánh điểm số đọc kịch bản tĩnh vs nói tự do",
          "category": "AI/DSP",
          "completed": true
        },
        {
          "id": "t-adv-107-be-scale",
          "title": "Cấu hình xử lý bất đồng bộ audio 60s qua BullMQ queue và lưu trữ Cloudflare R2 tối ưu cho 5,000 users",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-adv-107-qa",
          "title": "Kiểm thử độ chính xác căn chỉnh từ ngữ timestamp alignment với các đoạn nói có tạp âm môi trường",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/views/AdvancedAiLabView.jsx` (Tab: `voice-journal`)\n- **Stitch Design Tokens**:\n  - Interactive Transcript Box: `p-6 bg-slate-900 border border-slate-800 rounded-3xl leading-loose text-lg font-['Plus_Jakarta_Sans']`\n  - Word Clickable: `hover:underline cursor-pointer transition-colors px-1 py-0.5 rounded`.",
      "createdAt": "2026-10-03T06:51:58.830Z"
    },
    {
      "id": "ADV-108",
      "epicId": "epic-advanced-ai-lab",
      "title": "Accent Explorer & Target Dialect Selector: Chọn Giọng Mỹ / Anh / Úc Và Đo Độ Đậm Giọng Theo Thời Gian: Bộ Khám Phá Giọng Điệu Bản Ngữ",
      "persona": "Người học có định hướng du học, định cư hoặc làm việc tại các quốc gia cụ thể (Mỹ, Anh, Úc) và muốn rèn luyện giọng điệu mục tiêu nhất quán",
      "action": "lựa chọn chất giọng mục tiêu (General American, British RP, Australian English), nghe các điểm khác biệt then chốt (như âm /r/ rhotic, nguyên âm bath, âm flap-t) và đo lường \"Chỉ số tương đồng chất giọng (Dialect Proximity %)\"",
      "value": "trao quyền cho học viên chủ động định hình phong cách giao tiếp quốc tế của mình, hiểu sâu sắc sự đa dạng ngôn ngữ và tự tin hội nhập văn hóa toàn cầu",
      "priority": "should",
      "status": "in-progress",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-adv-108-dialect-toggle",
          "given": "Học viên chọn chất giọng mục tiêu là British RP (Giọng Anh chuẩn)",
          "when": "Học viên luyện tập từ vựng \"water\" hoặc \"car\"",
          "then": "Hệ thống chuyển đổi toàn bộ âm mẫu, tiêu chuẩn IPA (không cuộn lưỡi âm /r/ cuối, phát âm /ɔː/ thay vì /ɑː/) và tiêu chí chấm điểm tương ứng với chuẩn giọng Anh.",
          "completed": true
        },
        {
          "id": "ac-adv-108-frontend-design",
          "given": "Giao diện Accent Explorer trong AdvancedAiLabView",
          "when": "Hiển thị trên màn hình",
          "then": "Bộ 3 thẻ chọn cờ quốc gia (Mỹ - Anh - Úc) phong cách hiện đại với hiệu ứng viền sáng khi được kích hoạt, bảng so sánh đối chiếu âm thanh 3 cột trực quan kèm dải đo mức độ tiệm cận giọng mục tiêu (Dialect Proximity Gauge: 78%).",
          "completed": true
        },
        {
          "id": "ac-adv-108-backend-design",
          "given": "5,000 học viên thường xuyên chuyển đổi giữa các chất giọng mục tiêu",
          "when": "Hệ thống nạp từ điển phiên âm và âm thanh mẫu theo vùng miền",
          "then": "Toàn bộ từ điển phiên âm đa chất giọng (CMU Dict cho giọng Mỹ, BEEP/Combilex cho giọng Anh) được lưu trong bộ nhớ đệm Redis key-value với thời gian truy vấn < 1ms.",
          "completed": true
        },
        {
          "id": "ac-adv-108-l1-precision",
          "given": "Học viên Việt Nam thường học pha trộn lộn xộn giữa giọng Anh và giọng Mỹ (e.g. cuộn lưỡi /r/ kiểu Mỹ nhưng lại dùng từ vựng kiểu Anh)",
          "when": "Hệ thống phân tích tính nhất quán của chất giọng (Accent Consistency Check)",
          "then": "Chỉ ra các điểm không nhất quán: \"Bạn đang chọn mục tiêu giọng Mỹ, nhưng từ 'can't' bạn lại phát âm theo giọng Anh /kɑːnt/. Trong giọng Mỹ hãy nói /kænt/ nhé!\".",
          "completed": true
        },
        {
          "id": "ac-adv-108-a11y-fallback",
          "given": "Học viên chuyển đổi giọng bằng bàn phím",
          "when": "Bấm phím số 1 (Mỹ), 2 (Anh), 3 (Úc)",
          "then": "Hệ thống lập tức chuyển đổi cấu hình âm mẫu và thông báo trạng thái qua trình đọc màn hình, đảm bảo khả năng tiếp cận thuận tiện.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-adv-108-fe-ui",
          "title": "Xây dựng component AccentExplorerLab.jsx với 3 thẻ chọn chất giọng quốc gia và bảng đối chiếu âm thanh 3 miền",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-adv-108-be-dict",
          "title": "Xây dựng cơ sở dữ liệu phiên âm đa chuẩn ngữ âm (Multi-Dialect Lexicon) cho 10,000 từ vựng phổ biến nhất",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-adv-108-be-prox",
          "title": "Phát triển mô hình đo khoảng cách âm học Dialect Proximity Scorer sử dụng khoảng cách Euclidean trên ma trận Formant",
          "category": "AI/DSP",
          "completed": true
        },
        {
          "id": "t-adv-108-be-scale",
          "title": "Lưu trữ tài nguyên audio mẫu đa giọng trên Cloudflare CDN với phân vùng thư mục /audio/us, /audio/uk, /audio/au",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-adv-108-qa",
          "title": "Kiểm thử hộp đen kiểm tra tính nhất quán chấm điểm khi cùng một file ghi âm được chấm theo 3 chuẩn giọng khác nhau",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/views/AdvancedAiLabView.jsx` (Tab: `accent-explorer`)\n- **Stitch Design Tokens**:\n  - Flag Card Selected: `border-2 border-indigo-500 bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.3)] rounded-3xl p-6`\n  - Dialect Proximity Meter: `font-mono text-3xl font-black text-indigo-400`.",
      "createdAt": "2026-10-03T06:51:58.830Z"
    },
    {
      "id": "PAY-101",
      "epicId": "epic-backend-infrastructure",
      "title": "Dynamic VietQR Auto-Reconciliation Engine: Thuê Bao 30K Phí Giao Dịch 0% (SePay / OpenBanking Webhook): Động Cơ Đối Soát Tự Động VietQR 0% Phí",
      "persona": "Người sáng lập và đội ngũ tài chính muốn cung cấp gói học phí cực kỳ bình dân (30,000đ/tháng) mà không bị các cổng thanh toán khấu trừ 2-3% phí dịch vụ",
      "action": "sinh mã VietQR động theo chuẩn Napas 24/7 có sẵn số tiền và nội dung chuyển khoản mã hóa, tự động nhận diện giao dịch ngân hàng thành công qua SePay/OpenBanking Webhook",
      "value": "đạt tỷ lệ phí giao dịch 0% (tiết kiệm hàng chục triệu đồng mỗi tháng), kích hoạt tài khoản Pro tự động cho học viên chỉ sau 3-5 giây kể từ khi bấm chuyển tiền",
      "priority": "must",
      "status": "in-progress",
      "size": "L",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-pay-101-vietqr-gen",
          "given": "Học viên chọn gói Pro 30,000đ/tháng",
          "when": "Hệ thống khởi tạo mã VietQR thanh toán",
          "then": "Hệ thống sinh mã QR chuẩn Napas 24/7 chứa sẵn số tài khoản ngân hàng thụ hưởng, đúng số tiền 30,000 VNĐ và nội dung chuyển khoản độc nhất (e.g., \"VP 883921\").",
          "completed": true
        },
        {
          "id": "ac-pay-101-frontend-design",
          "given": "Giao diện màn hình thanh toán VietQR Checkout View",
          "when": "Hiển thị mã QR cho học viên",
          "then": "Ảnh mã VietQR kích thước 240x240px sắc nét có logo ngân hàng chính thống ở tâm, khung quét bo góc hiện đại có tia quét radar chuyển động nhẹ, nút bấm một chạm \"Sao chép số tài khoản\" và \"Sao chép số tiền\" có thông báo Toast Toastification xác nhận tiện lợi.",
          "completed": true
        },
        {
          "id": "ac-pay-101-backend-design",
          "given": "Hàng trăm học viên cùng quét mã QR và chuyển khoản trong giờ vàng khuyến mại",
          "when": "Webhook ngân hàng (SePay / Casso / OpenBanking) gửi thông báo biến động số dư",
          "then": "Hệ thống đối soát phân tích cú pháp nội dung chuyển tiền bằng biểu thức chính quy (Regex Pattern Matching), tìm đúng user_id và nâng cấp tài khoản trong vòng dưới 80ms, xử lý được 200 webhook/giây.",
          "completed": true
        },
        {
          "id": "ac-pay-101-l1-precision",
          "given": "Học viên chuyển tiền từ các ứng dụng ngân hàng phổ biến tại Việt Nam (Vietcombank, Techcombank, MB Bank, VPBank)",
          "when": "Khách hàng quét mã QR bằng tính năng QR Pay trong app ngân hàng",
          "then": "Toàn bộ số tiền và nội dung tự động điền sẵn 100%, học viên chỉ cần bấm xác thực vân tay/FaceID mà không phải gõ bất kỳ con số nào.",
          "completed": true
        },
        {
          "id": "ac-pay-101-a11y-fallback",
          "given": "Học viên chuyển khoản sai cú pháp nội dung (e.g. quên gõ tiền tố VP)",
          "when": "Hệ thống nhận biến động số dư không khớp",
          "then": "Giao dịch được ghi nhận vào bảng unmatched_transactions và gửi cảnh báo ngay về kênh Telegram Admin kèm số điện thoại học viên để bộ phận CSKH hỗ trợ kích hoạt thủ công trong 5 phút.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pay-101-be-vietqr",
          "title": "Tích hợp thư viện tạo mã VietQR theo đặc tả chuẩn EMVCo và ngân hàng nhà nước Napas 247",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-pay-101-be-sepay",
          "title": "Xây dựng Webhook Endpoint tiếp nhận biến động số dư từ SePay/OpenBanking kèm xác thực API Key bảo mật",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-pay-101-be-regex",
          "title": "Viết bộ phân tích cú pháp Regex trích xuất UserID và số tiền giao dịch chống trường hợp học viên gõ thừa khoảng trắng",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-pay-101-be-scale",
          "title": "Thiết kế cơ chế khóa phân tán Redis Lock ngăn ngừa tình trạng kích hoạt trùng lặp khi webhook gửi lại",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-pay-101-qa",
          "title": "Kiểm thử hộp đen mô phỏng toàn bộ chu trình: Sinh QR -> Quét thanh toán giả lập -> Webhook -> Tài khoản chuyển thành Pro",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/components/subscription/VietQrCheckout.jsx`\n- **Stitch Design Tokens**:\n  - QR Box: `w-64 h-64 bg-white p-3 rounded-3xl shadow-[0_0_35px_rgba(255,255,255,0.15)] flex items-center justify-center relative overflow-hidden`\n  - Scan Laser: `h-0.5 bg-rose-500 absolute w-full shadow-[0_0_8px_#f43f5e] animate-pulse`\n  - Copy Pill: `bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl font-mono text-xs flex items-center gap-1.5 cursor-pointer`.\n\n---\n\n### 🗄️ BACKEND DESIGN SPECIFICATION\n- **Webhook Endpoint Contract**:\n  ```http\n  POST /api/v1/billing/sepay-webhook\n  Authorization: ApiKey <SEPAY_SECRET_TOKEN>\n  Content-Type: application/json\n\n  Request Body:\n  {\n    \"id\": 981245,\n    \"gateway\": \"Vietcombank\",\n    \"transactionDate\": \"2026-10-03 15:45:00\",\n    \"accountNumber\": \"9938210029\",\n    \"transferType\": \"in\",\n    \"transferAmount\": 30000,\n    \"content\": \"VP 883921 THANH TOAN PRO\",\n    \"referenceCode\": \"MBVCB.981245\"\n  }\n\n  Response 200 OK:\n  {\n    \"success\": true,\n    \"userId\": \"usr_883921\",\n    \"status\": \"pro_activated_30_days\"\n  }\n  ```",
      "createdAt": "2026-10-03T08:34:10.829Z"
    },
    {
      "id": "PAY-102",
      "epicId": "epic-backend-infrastructure",
      "title": "Frictionless 1-Scan Checkout Modal & Real-Time Activation Polling (Thanh Toán 1 Quẹt & Tự Động Mở Khóa): Cửa Sổ Thanh Toán 1 Chạm & Tự Động Kích Hoạt Thời Gian Thực",
      "persona": "Người dùng vừa quét mã QR ngân hàng xong và đang háo hức chờ ứng dụng tự động mở khóa tính năng mà không muốn phải bấm F5 tải lại trang",
      "action": "quan sát màn hình thanh toán tự động chuyển sang trạng thái \"Thành công rực rỡ\" ngay khi tiền vừa trừ khỏi tài khoản ngân hàng, kèm hiệu ứng pháo hoa chúc mừng",
      "value": "tạo cảm xúc thăng hoa (Aha Moment) và ấn tượng công nghệ hiện đại, xóa bỏ hoàn toàn cảm giác lo lắng \"liệu tiền đã vào hệ thống chưa?\"",
      "priority": "must",
      "status": "in-progress",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-pay-102-auto-polling",
          "given": "Học viên đang mở cửa sổ thanh toán VietQR Checkout Modal",
          "when": "Học viên hoàn tất chuyển khoản trên ứng dụng ngân hàng",
          "then": "Cơ chế Server-Sent Events (SSE) hoặc Polling thông minh (2 giây/lần) phát hiện trạng thái PAID, modal tự động đóng và chuyển hướng sang màn hình chào mừng thành viên Pro với hiệu ứng Confetti rực rỡ.",
          "completed": true
        },
        {
          "id": "ac-pay-102-frontend-design",
          "given": "Giao diện cửa sổ thanh toán Checkout Modal",
          "when": "Đang chờ học viên quét mã",
          "then": "Hiển thị vòng quay đếm ngược thời gian giữ chỗ thanh toán (15:00 phút), thông báo trạng thái \"Đang chờ thanh toán...\" có chấm xanh nhấp nháy, kèm huy hiệu hoàn tiền 100% nếu không hài lòng trong 7 ngày.",
          "completed": true
        },
        {
          "id": "ac-pay-102-backend-design",
          "given": "Hàng trăm học viên cùng mở modal thanh toán cùng lúc",
          "when": "Các máy khách duy trì kết nối kiểm tra trạng thái thanh toán",
          "then": "Sử dụng Server-Sent Events (SSE) nhẹ nhàng hoặc Redis key polling có ETag; máy chủ tiêu tốn dưới 2MB RAM cho 500 kết nối lắng nghe đồng thời, không gây quá tải CPU.",
          "completed": true
        },
        {
          "id": "ac-pay-102-l1-precision",
          "given": "Học viên mở ứng dụng trên điện thoại di động (Mobile Web)",
          "when": "Bấm nút \"Mở App Ngân Hàng\"",
          "then": "Hệ thống hỗ trợ Deep Link tự động mở ứng dụng ngân hàng cài sẵn trên máy (Vietcombank, MB Bank, v.v.) giúp quy trình thanh toán gói gọn trong 2 thao tác chạm.",
          "completed": true
        },
        {
          "id": "ac-pay-102-a11y-fallback",
          "given": "Người dùng bấm nút hủy thanh toán hoặc đóng cửa sổ",
          "when": "Bấm nút \"X\" hoặc phím Escape",
          "then": "Hệ thống hỏi nhẹ nhàng \"Bạn có chắc muốn dừng đăng ký gói Pro chỉ 1.000đ/ngày?\" với 2 nút lựa chọn rõ ràng, đảm bảo khả năng tiếp cận và điều hướng thuận tiện.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pay-102-be-sse",
          "title": "Xây dựng kênh Server-Sent Events (SSE) /api/subscriptions/listen-status/:orderId phát thông báo kích hoạt",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-pay-102-fe-confetti",
          "title": "Tích hợp thư viện canvas-confetti tạo hoạt ảnh pháo hoa chúc mừng khi nâng cấp Pro thành công",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pay-102-fe-deeplink",
          "title": "Triển khai danh sách App Scheme Deep Link cho top 10 ngân hàng phổ biến nhất tại Việt Nam",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pay-102-be-scale",
          "title": "Tối ưu hóa EventSource connection pool trên Nginx reverse proxy tránh lỗi nghẽn file descriptor",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-pay-102-qa",
          "title": "Kiểm thử trải nghiệm trên thiết bị di động iOS Safari và Android Chrome đảm bảo chuyển app và quay lại mượt mà",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/components/subscription/CheckoutModal.jsx`\n- **Stitch Design Tokens**:\n  - Modal: `bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6`\n  - Confetti Burst: `canvas-confetti` 120 particles, colors: `['#f43f5e', '#0ea5e9', '#10b981', '#f59e0b']`.",
      "createdAt": "2026-10-03T08:34:10.829Z"
    },
    {
      "id": "PAY-103",
      "epicId": "epic-backend-infrastructure",
      "title": "Multi-Cycle Pricing & Retention Strategy (Chiến Lược Gói Tháng 30k vs Gói Năm 299k Giảm Tỷ Lệ Rời Bỏ): Chiến Lược Giá Đa Chu Kỳ & Giữ Chân Khách Hàng",
      "persona": "Người dùng đang cân nhắc mức chi tiêu hợp lý cho việc học phát âm tiếng Anh lâu dài",
      "action": "lựa chọn giữa gói linh hoạt Tháng (30,000đ/tháng) và gói tiết kiệm Năm (299,000đ/năm - tặng thêm 3 tháng), xem rõ số tiền tiết kiệm được và các đặc quyền đi kèm",
      "value": "tối ưu hóa giá trị vòng đời khách hàng (Customer Lifetime Value LTV), nâng tỷ lệ chọn gói năm lên trên 45% giúp dòng tiền doanh nghiệp dồi dào và ổn định",
      "priority": "should",
      "status": "in-progress",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-pay-103-pricing-toggle",
          "given": "Học viên xem bảng giá dịch vụ",
          "when": "Bấm chuyển đổi toggle giữa \"Thanh toán theo Tháng\" và \"Thanh toán theo Năm\"",
          "then": "Giá gói năm hiển thị huy hiệu tiết kiệm \"Tiết kiệm 35%\" màu xanh ngọc rực rỡ, tính ra chỉ tương đương 24,000đ/tháng, tự động cập nhật số tiền thanh toán.",
          "completed": true
        },
        {
          "id": "ac-pay-103-frontend-design",
          "given": "Thẻ giá gói dịch vụ PricingCard Component",
          "when": "Render trên trang chọn gói",
          "then": "Gói Năm được làm nổi bật bằng khung viền Rose-500 dày 2px kèm huy hiệu \"Lựa Chọn Tốt Nhất (Best Value)\" ở góc trên, danh sách 6 đặc quyền độc quyền có dấu tick xanh ngọc lục bảo rõ nét.",
          "completed": true
        },
        {
          "id": "ac-pay-103-backend-design",
          "given": "5,000 học viên truy cập trang giá dịch vụ trong các chiến dịch quảng cáo",
          "when": "Trang web tải cấu hình bảng giá và chương trình khuyến mãi",
          "then": "Cấu hình giá được lưu tĩnh trên CDN Edge Cache (Cloudflare) với P95 thời gian phản hồi < 20ms, máy chủ gốc chịu tải 0% cho việc hiển thị bảng giá.",
          "completed": true
        },
        {
          "id": "ac-pay-103-l1-precision",
          "given": "Học viên phân vân về chi phí học tập",
          "when": "Đọc thông điệp so sánh chi phí",
          "then": "Giao diện hiển thị phép so sánh dí dỏm và gần gũi: \"Chỉ bằng 1 cốc trà sữa mỗi tháng để sở hữu giọng tiếng Anh chuẩn bản ngữ suốt đời!\".",
          "completed": true
        },
        {
          "id": "ac-pay-103-a11y-fallback",
          "given": "Người dùng sử dụng công nghệ hỗ trợ đọc màn hình",
          "when": "Chuyển đổi toggle chu kỳ thanh toán",
          "then": "Trình đọc thông báo rõ: \"Đã chọn gói thanh toán Năm, giá 299,000 đồng một năm, tiết kiệm 35 phần trăm so với gói tháng\".",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pay-103-fe-cards",
          "title": "Xây dựng component PricingTierCards.jsx với thanh trượt toggle Tháng/Năm và hiệu ứng chuyển đổi mượt mà",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pay-103-be-plans",
          "title": "Thiết kế cấu trúc dữ liệu SubscriptionPlan và lưu trữ cấu hình linh hoạt trong cơ sở dữ liệu",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-pay-103-be-discount",
          "title": "Phát triển module Coupon & Voucher giảm giá (e.g., BACK2SCHOOL, VIETPHONICS10) cho phép áp mã trực tiếp",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-pay-103-be-scale",
          "title": "Cấu hình Cloudflare Cache Rules cho endpoint bảng giá tĩnh phục vụ 5,000 người dùng với băng thông tối thiểu",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-pay-103-qa",
          "title": "Kiểm thử logic tính tiền khi áp voucher khuyến mại và chuyển đổi chu kỳ thanh toán đảm bảo số tiền chuẩn xác 100%",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/components/subscription/PricingTierCards.jsx`\n- **Stitch Design Tokens**:\n  - Yearly Card Featured: `border-2 border-rose-500 bg-gradient-to-b from-slate-900 to-rose-950/20 rounded-3xl p-8 relative shadow-2xl`\n  - Save 35% Badge: `bg-emerald-500 text-slate-950 font-black text-xs px-2.5 py-0.5 rounded-full absolute -top-3 right-6`.",
      "createdAt": "2026-10-03T08:34:10.829Z"
    },
    {
      "id": "PAY-104",
      "epicId": "epic-backend-infrastructure",
      "title": "Automated Grace Period & Expiring Subscription Reminder Bot (Ân Hạn 3 Ngày & Nhắc Gia Hạn Tự Động): Bot Nhắc Gia Hạn Thông Minh & Chính Sách Ân Hạn 3 Ngày",
      "persona": "Học viên Pro đang theo học dở dang nhưng thẻ ngân hàng tạm thời hết tiền hoặc bận việc chưa kịp gia hạn",
      "action": "nhận thông báo nhắc nhở lịch sự trước 3 ngày, được hưởng chính sách ân hạn thêm 3 ngày tiếp tục học tập bình thường mà không bị cắt quyền truy cập đột ngột",
      "value": "giảm tỷ lệ hủy thuê bao ngoài ý muốn (Involuntary Churn) xuống dưới 2%, tạo thiện cảm sâu sắc với học viên nhờ dịch vụ nhân văn và chuyên nghiệp",
      "priority": "should",
      "status": "in-progress",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-pay-104-grace-period",
          "given": "Gói Pro của học viên đến ngày hết hạn",
          "when": "Hệ thống xử lý gia hạn tự động nhưng chưa nhận được khoản thanh toán mới",
          "then": "Trạng thái tài khoản chuyển sang GRACE_PERIOD trong 72 giờ (3 ngày); học viên vẫn duy trì 100% quyền lợi gói Pro kèm banner nhắc nhở nhẹ nhàng ở góc màn hình.",
          "completed": true
        },
        {
          "id": "ac-pay-104-frontend-design",
          "given": "Banner thông báo thời gian ân hạn trên thanh điều hướng",
          "when": "Học viên đăng nhập trong thời gian ân hạn",
          "then": "Hiển thị dải banner màu hổ phách Amber-500 viền mềm mại: \"Gói Pro của bạn đang trong 3 ngày ân hạn (còn 48 giờ). Hãy gia hạn ngay để không làm gián đoạn chuỗi luyện tập!\", kèm nút bấm \"Gia Hạn 30K\" một chạm.",
          "completed": true
        },
        {
          "id": "ac-pay-104-backend-design",
          "given": "5,000 người dùng có ngày hết hạn phân bổ rải rác trong tháng",
          "when": "Hệ thống kiểm tra và gửi thông báo nhắc gia hạn",
          "then": "Cron job chạy bất đồng bộ lúc 09:00 sáng mỗi ngày, quét và xử lý 5,000 tài khoản trong vòng dưới 1.5 giây thông qua BullMQ worker, không ảnh hưởng đến hoạt động luyện âm trực tiếp.",
          "completed": true
        },
        {
          "id": "ac-pay-104-l1-precision",
          "given": "Kênh gửi thông báo nhắc nhở phù hợp với thói quen người Việt",
          "when": "Hệ thống gửi tin nhắn nhắc gia hạn",
          "then": "Tích hợp gửi thông báo qua Zalo ZNS (Zalo Notification Service) và Email tiếng Việt thân thiện kèm đường link mở thẳng vào trang quét mã VietQR.",
          "completed": true
        },
        {
          "id": "ac-pay-104-a11y-fallback",
          "given": "Sau 3 ngày ân hạn học viên vẫn chưa gia hạn",
          "when": "Hệ thống chuyển trạng thái sang EXPIRED",
          "then": "Dữ liệu phát âm và tiến độ học tập của học viên được bảo toàn nguyên vẹn 100% (không bao giờ bị xóa), chỉ hạ cấp quyền truy cập về gói Free 5 bài/ngày một cách nhẹ nhàng.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pay-104-be-cron",
          "title": "Xây dựng BullMQ cron job kiểm tra trạng thái thuê bao hàng ngày và chuyển đổi trạng thái ACTIVE -> GRACE_PERIOD -> EXPIRED",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-pay-104-be-zalo",
          "title": "Tích hợp Zalo Cloud API (ZNS) gửi tin nhắn thông báo tự động cho người dùng tại Việt Nam",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-pay-104-fe-banner",
          "title": "Xây dựng component GracePeriodBanner.jsx với nút gia hạn nhanh và đồng hồ đếm ngược giờ ân hạn",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pay-104-be-scale",
          "title": "Tối ưu truy vấn tìm kiếm các thuê bao sắp hết hạn bằng chỉ mục trên cột current_period_end",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-pay-104-qa",
          "title": "Kiểm thử luồng chuyển đổi trạng thái: đảm bảo học viên trong thời gian ân hạn vẫn truy cập được mọi bài học",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 FRONTEND DESIGN SPECIFICATION\n- **Component File**: `vietphonics-app/src/components/subscription/GracePeriodBanner.jsx`\n- **Stitch Design Tokens**:\n  - Banner: `bg-amber-500/10 border-b border-amber-500/30 text-amber-200 px-4 py-2 flex items-center justify-between text-xs`\n  - Quick Renew CTA: `bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1 rounded-lg text-xs`.",
      "createdAt": "2026-10-03T08:34:10.829Z"
    }
  ]
};
