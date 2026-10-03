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
      "status": "done",
      "size": "XL",
      "points": 13,
      "acceptanceCriteria": [
        {
          "id": "ac-pron-201-sagittal-render",
          "given": "Học viên chọn âm vị kẹp răng /θ/ hoặc bất kỳ âm nào trong bảng 44 âm",
          "when": "Thiết diện cắt dọc Sagittal 2D hiển thị trên canvas",
          "then": "Đồ họa SVG 760x500 hiển thị đầy đủ các bộ phận: Vòm miệng cứng, vòm miệng mềm, răng cửa, và cơ lưỡi (màu Coral #fb7185) với đầu lưỡi đặt chính xác theo giải phẫu học quốc tế.",
          "completed": true
        },
        {
          "id": "ac-pron-201-interactive-sliders",
          "given": "3 thanh trượt sinh học: Độ nâng lưỡi (Tongue Elevation), Độ hạ hàm (Jaw Drop), Áp lực luồng hơi (Airflow Pressure)",
          "when": "Học viên kéo các thanh slider",
          "then": "Các đường cong Bézier của khối cơ lưỡi và xương hàm dưới trên đồ họa SVG dịch chuyển mượt mà tức thì ở tốc độ 60 FPS mà không làm đơ giao diện.",
          "completed": true
        },
        {
          "id": "ac-pron-201-l1-ghost-overlay",
          "given": "Học viên bật tính năng \"So Sánh Với Tiếng Việt (L1 Ghost Overlay)\"",
          "when": "Giao diện kích hoạt chế độ so sánh",
          "then": "Xuất hiện đường bóng mờ màu xám nét đứt biểu thị vị trí lưỡi theo thói quen tiếng Việt, đối chiếu trực quan với vị trí chuẩn tiếng Anh để học viên thấy ngay sai lệch.",
          "completed": true
        },
        {
          "id": "ac-pron-201-static-vector-library",
          "given": "Người dùng chuyển đổi giữa 44 âm vị",
          "when": "Chọn âm mới",
          "then": "Dữ liệu tọa độ vector được nạp tức thời từ bộ nhớ tĩnh phía máy khách (Client Bundle Cache) mà không cần gửi request chờ máy chủ.",
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
          "id": "t-pron-201-fe-compare",
          "title": "Xây dựng chế độ so sánh bóng mờ L1 Ghost Overlay trên canvas SVG",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-201-qa",
          "title": "Kiểm tra tính chính xác về mặt giải phẫu cơ miệng theo tài liệu ngữ âm học đại học Cambridge/Oxford",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 PURE FRONTEND DESIGN SPECIFICATION\n- **Phân loại**: Pure Frontend Interactive SVG & Canvas 2D\n- **UI Mockup**: `vietphonics-app/src/ui-reference/kh_u_h_nh_2d_gi_i_ph_u_c_mi_ng_light_mode/code.html`\n- **Frontend Component**: `vietphonics-app/src/components/anatomy/MouthAnatomyView.jsx`\n\n#### 📐 SVG Sagittal Coordinates & Bézier Math\n```\n+-------------------------------------------------------------+\n|                    Vòm Miệng Cứng (Hard Palate)             |\n| Răng Cửa Trên                                  Vòm Mềm      |\n|  [||]                                           (Velum)     |\n|         Đầu lưỡi /θ/ thò ra giữa 2 răng                     |\n|          ~~~~~~~ Cơ Lưỡi (Tongue Muscle) ~~~~~              |\n|  [||]                                                       |\n| Răng Cửa Dưới      Hàm Dưới (Mandible - Jaw Drop Slider)    |\n+-------------------------------------------------------------+\n| [Slider 1: Độ nâng lưỡi] [Slider 2: Hạ hàm] [Slider 3: Luồng hơi]|\n+-------------------------------------------------------------+\n```\n\n#### 🎨 Design Tokens & Anatomical Coloring\n- **Tongue Muscle**: `fill-rose-500/80 stroke-rose-400 stroke-2`.\n- **Airflow Stream**: `stroke-sky-400/80 stroke-dashed animate-pulse`.\n- **L1 Ghost Contrast**: `stroke-slate-500/50 stroke-dashed fill-none`.\n- **Bio-feedback Slider**: `accent-indigo-500 w-full h-2 rounded-lg bg-slate-800 cursor-pointer`.",
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
      "status": "done",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-elsa-205-audio-pair-play",
          "given": "Cặp âm tối thiểu /θ/ vs /t/ với 2 từ \"think\" và \"tink\"",
          "when": "Học viên bấm nút loa hoặc phím Space để nghe âm thanh mẫu",
          "then": "Hệ thống phát ngẫu nhiên một trong hai từ với chất lượng âm thanh HD không nén, nút loa có sóng âm rung nhẹ.",
          "completed": true
        },
        {
          "id": "ac-elsa-205-bento-choice-selection",
          "given": "2 thẻ lựa chọn A và B hiển thị dạng Bento card to bản",
          "when": "Học viên bấm chọn đáp án A (\"think\") hoặc bấm phím số 1",
          "then": "Thẻ được chọn lập tức đổi màu viền; nếu đúng hiển thị viền xanh Emerald kèm huy hiệu +15 XP, nếu sai hiển thị viền đỏ hồng kèm ký hiệu X.",
          "completed": true
        },
        {
          "id": "ac-elsa-205-articulatory-hint",
          "given": "Học viên trả lời xong câu hỏi (dù đúng hay sai)",
          "when": "Thẻ mẹo cấu âm xuất hiện bên dưới",
          "then": "Hiển thị mẹo phân biệt thực chiến: \"Chú ý kẹp nhẹ đầu lưỡi giữa hai hàm răng cho /θ/, bật đầu lưỡi dứt khoát sau nướu răng trên cho /t/\".",
          "completed": true
        },
        {
          "id": "ac-elsa-205-keyboard-navigation",
          "given": "Học viên sử dụng bàn phím máy tính",
          "when": "Bấm phím 1 để chọn thẻ A, phím 2 để chọn thẻ B, phím Space để nghe lại âm thanh",
          "then": "Giao diện phản hồi chuẩn xác theo phím tắt, hỗ trợ luyện phản xạ nhanh mà không cần chạm chuột.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-elsa-205-fe-quiz",
          "title": "Xây dựng component MinimalPairQuizCard.jsx với Bento Grid và các phím tắt chọn nhanh 1, 2, Space",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-205-fe-tts",
          "title": "Tích hợp bộ đệm HTML5 Audio Buffer Cache nạp sẵn các file âm thanh cặp từ",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-205-fe-streak",
          "title": "Thiết kế hiệu ứng streak tăng dần và badge chúc mừng khi đoán đúng liên tiếp 5 câu",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-205-qa",
          "title": "Kiểm thử độ nhạy phím tắt và hiển thị chính xác ký tự ngữ âm IPA trên các trình duyệt",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 PURE FRONTEND DESIGN SPECIFICATION\n- **Phân loại**: Pure Frontend UI/UX Component (Bento Quiz Card)\n- **UI Mockup**: `vietphonics-app/src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html`\n- **Frontend Component**: `vietphonics-app/src/components/articulation/MinimalPairQuiz.jsx`\n\n#### 📐 Bento Choice Layout\n```\n+-------------------------------------------------------------+\n|                     [ 🔊 Nghe Âm Thanh ]                    |\n|                        (Phím: Space)                        |\n+-------------------------------------------------------------+\n| [1] THẺ A: \"think\"                 | [2] THẺ B: \"tink\"      |\n| Phiên âm: /θɪŋk/                   | Phiên âm: /tɪŋk/       |\n| Nghĩa: suy nghĩ                    | Nghĩa: tiếng leng keng |\n+-------------------------------------------------------------+\n| Mẹo cấu âm: Kẹp nhẹ đầu lưỡi giữa hai hàm răng khi nói /θ/  |\n+-------------------------------------------------------------+\n```\n\n#### 🎨 Design Tokens & Hotkeys\n- **Hero Speaker Button**: `w-20 h-20 rounded-full bg-sky-500 hover:bg-sky-400 text-white shadow-[0_0_25px_rgba(14,165,233,0.5)] flex items-center justify-center active:scale-95 transition-all`.\n- **Choice Bento Card**: `p-6 bg-slate-900 hover:bg-slate-800 border-2 border-slate-700 hover:border-indigo-500 rounded-3xl transition-all cursor-pointer flex flex-col items-center gap-2`.\n- **Correct State Token**: `border-emerald-500 bg-emerald-500/10 text-emerald-400`.",
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
      "status": "done",
      "size": "XL",
      "points": 13,
      "acceptanceCriteria": [
        {
          "id": "ac-elsa-301-live-turn-taking",
          "given": "Phiên họp Daily Standup với Alex Tech Lead đang diễn ra",
          "when": "Alex hoàn tất câu hỏi: \"Morning team! What did you finish yesterday on the payment gateway, and are there any blockers?\"",
          "then": "Nút Push-To-Talk phát sáng sẵn sàng thu âm; khi người dùng nói xong và nhả mic, luồng âm thanh được xử lý và Alex phản hồi tự nhiên trong dưới 1.2 giây.",
          "completed": true
        },
        {
          "id": "ac-elsa-301-webrtc-spectrum-avatar",
          "given": "Giao diện phòng hội thoại RoleplayView hiển thị",
          "when": "Alex đang phát biểu câu trả lời",
          "then": "Vòng hào quang gradient quanh ảnh đại diện Alex nhấp nháy đồng bộ với dải sóng âm phổ tần số WebRTC (Spectrum Indicator) mượt mà 60 FPS.",
          "completed": true
        },
        {
          "id": "ac-elsa-301-blocker-ending-consonant",
          "given": "Học viên trả lời báo cáo blocker nhưng nuốt âm đuôi /t/ trong từ \"blocked\"",
          "when": "Mô hình phân tích âm học câu nói",
          "then": "Thẻ checklist mục tiêu bên phải lập tức cảnh báo: \"Báo cáo blocker: Thiếu âm bật hơi /t/ trong từ 'blocked'\".",
          "completed": true
        },
        {
          "id": "ac-elsa-301-bilingual-subtitle-toggle",
          "given": "Học viên muốn hỗ trợ đọc hiểu ngữ cảnh công sở",
          "when": "Bật toggle \"Phụ đề song ngữ (Bilingual Subtitles)\"",
          "then": "Hiển thị bản dịch tiếng Việt súc tích ngay bên dưới bong bóng thoại tiếng Anh của Alex.",
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
          "title": "Thiết kế WebSocket gateway tối ưu hóa phiên thoại với heartbeat 15s",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-elsa-301-be-llm",
          "title": "Tích hợp LLM streaming API với system prompt chuyên sâu về IT Scrum meeting",
          "category": "Backend",
          "completed": true
        }
      ],
      "notes": "### 🎯 FULLSTACK FEATURE SPECIFICATION\n- **Phân loại**: Full-stack Conversational AI & WebRTC Streaming\n- **UI Mockup**: `vietphonics-app/src/ui-reference/ai_h_i_tho_i_roleplay_c_ng_s_light_mode/code.html`\n- **Frontend Component**: `vietphonics-app/src/views/RoleplayView.jsx`\n\n#### 🎨 Conversational Chat Layout\n```\n+-------------------------------------------------------------+\n| [Alex Tech Lead (SF)] ((( Sóng âm Spectrum )))  Latency: 18ms|\n+-------------------------------------------------------------+\n| AI: \"Morning team! What did you finish yesterday on the     |\n|      payment gateway, and are there any blockers?\"          |\n|      (Chào cả nhóm! Hôm qua các bạn đã hoàn thành gì...)     |\n|                                                             |\n| User: \"Yesterday I completed the webhook endpoint, but I am |\n|        [blocked] on the Napas sandbox signature.\"           |\n+-------------------------------------------------------------+\n| [ Giữ Space để nói ]    [Mục tiêu: Đạt 3/3 lượt thoại Scrum]|\n+-------------------------------------------------------------+\n```\n\n#### 🗄️ Real-Time WebSocket Protocol\n```\nwss://api.vietphonics.com/ws/v1/roleplay/session?token=<JWT>\n\nClient -> Server (Frame):\n{\n  \"action\": \"user_speech_chunk\",\n  \"sessionId\": \"rol_88291\",\n  \"transcript\": \"Yesterday I completed the webhook endpoint...\",\n  \"audioUrl\": \"https://r2.../turn_01.opus\"\n}\n\nServer -> Client (Stream):\n{\n  \"type\": \"turn_evaluation\",\n  \"phoneticAccuracy\": 86.5,\n  \"unreleasedStopsDetected\": [\"blocked\"],\n  \"responseAudioUrl\": \"https://r2.../alex_turn_02.opus\"\n}\n```",
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
      "status": "done",
      "size": "L",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-elsa-302-scorecard-render",
          "given": "Học viên bấm \"Kết thúc buổi họp\" sau khi hoàn tất các lượt đối thoại",
          "when": "Giao diện tổng kết tải lên",
          "then": "Hiển thị Bảng Chỉ Số Toàn Diện dạng Bento Grid với điểm tổng quan huy hiệu vàng kim (Overall Performance Score) và 5 chỉ số thành phần.",
          "completed": true
        },
        {
          "id": "ac-elsa-302-five-pillars-breakdown",
          "given": "Dữ liệu phân tích 5 trụ cột giao tiếp",
          "when": "Render các thẻ thành phần",
          "then": "Hiển thị 5 thẻ phân màu: Phát âm (Rose-500), Lưu loát (Sky-500), Ngữ pháp (Emerald-500), Từ vựng IT (Indigo-500), Hoàn thành mục tiêu (Amber-500).",
          "completed": true
        },
        {
          "id": "ac-elsa-302-transcript-audio-replay",
          "given": "Danh sách toàn văn các lượt đối thoại (Full Conversation Transcript)",
          "when": "Học viên bấm nút loa bên cạnh từng câu thoại của mình",
          "then": "Hệ thống phát lại ngay đoạn âm thanh giọng nói của chính học viên ở lượt nói đó để tự đối soát.",
          "completed": true
        },
        {
          "id": "ac-elsa-302-save-to-error-bank",
          "given": "Báo cáo chỉ ra các từ kỹ thuật phát âm sai (e.g., \"API\", \"Debug\", \"Release\")",
          "when": "Học viên bấm nút \"Lưu vào Ngân Hàng Lỗi\"",
          "then": "Các từ vựng này tự động được nạp vào Error Bank Spaced Repetition để luyện lại vào ngày hôm sau.",
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
          "id": "t-elsa-302-fe-error-bank",
          "title": "Tích hợp nút lưu từ vựng yếu vào Error Bank LocalStorage & State",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-302-qa",
          "title": "Kiểm tra hiển thị đầy đủ các thẻ đánh giá trên màn hình điện thoại di động",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 PURE FRONTEND DESIGN SPECIFICATION\n- **Phân loại**: Pure Frontend Bento Grid & Audio Replay Studio\n- **UI Mockup**: `vietphonics-app/src/ui-reference/ai_h_i_tho_i_roleplay_c_ng_s_light_mode/code.html`\n- **Frontend Component**: `vietphonics-app/src/components/roleplay/PostRoleplayScorecard.jsx`\n\n#### 📐 Bento Grid Structure\n```\n+-------------------------------------------------------------+\n|              [ HUY HIỆU ĐIỂM TỔNG KẾT: 88/100 ]             |\n|                  Hạng: Senior Communicator                  |\n+-------------------------------------------------------------+\n| [Phát Âm: 85]  [Lưu Loát: 92]  [Ngữ Pháp: 88]               |\n| [Từ Vựng IT: 90]               [Hoàn Thành Mục Tiêu: 100%]  |\n+-------------------------------------------------------------+\n| BẢNG TOÀN VĂN LỊCH SỬ ĐỐI THOẠI:                            |\n| 1. Alex: \"What did you finish yesterday?\"                   |\n| 2. Bạn:  \"Yesterday I completed the webhook...\" [🔊 Nghe lại]|\n+-------------------------------------------------------------+\n| [ 💾 Lưu các từ sai vào Ngân Hàng Lỗi ]  [ 🔄 Luyện lại ]   |\n+-------------------------------------------------------------+\n```\n\n#### 🎨 Design Tokens\n- **Hero Card**: `bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 shadow-2xl`.\n- **Pillar Metric Card**: `bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col gap-1`.",
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
      "status": "done",
      "size": "L",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-elsa-401-path-steps",
          "given": "Học viên mở ứng dụng vào đầu ngày mới",
          "when": "Hệ thống khởi tạo lộ trình 10 phút Daily Practice",
          "then": "Hiển thị chính xác 5 bài tập nhỏ (1 âm khởi động -> 2 âm còn yếu dưới 70% -> 1 cặp từ tối thiểu -> 1 câu ứng dụng thực tế), tổng thời lượng ước tính 10 phút.",
          "completed": true
        },
        {
          "id": "ac-elsa-401-pill-progress-bar",
          "given": "Giao diện thẻ lộ trình DailyPathCard",
          "when": "Học viên hoàn thành từng bước học",
          "then": "Thanh tiến trình hình viên thuốc (Pill Stepper) đổi màu từ xám sang xanh ngọc Emerald lấp lánh kèm đồng hồ đếm lùi thời gian còn lại.",
          "completed": true
        },
        {
          "id": "ac-elsa-401-regional-l1-priority",
          "given": "Học viên có cấu hình vùng miền (ví dụ Miền Bắc hay nhầm L/N, Miền Nam hay nuốt âm đuôi)",
          "when": "Thuật toán chọn bài tập cho ngày",
          "then": "Tự động đẩy các bài tập khắc phục bẫy âm đặc trưng vùng miền của học viên lên vị trí ưu tiên hàng đầu.",
          "completed": true
        },
        {
          "id": "ac-elsa-401-mobile-thumb-zone",
          "given": "Học viên sử dụng ứng dụng trên điện thoại di động",
          "when": "Thao tác bằng một tay",
          "then": "Nút \"Bắt đầu bài tập kế tiếp\" được cố định ở vùng ngón tay cái (Thumb Zone) với chiều cao tối thiểu 52px, dễ bấm khi đang di chuyển.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-elsa-401-fe-card",
          "title": "Xây dựng component DailyPathCard.jsx với thanh tiến trình viên thuốc 5 chặng",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-401-fe-thumb",
          "title": "Thiết kế nút Start Next Button tối ưu vùng chạm ngón tay cái trên mobile",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-401-be-algo",
          "title": "Phát triển thuật toán AdaptiveCurriculumEngine tính điểm trọng số lỗi yếu nhất",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-elsa-401-qa",
          "title": "Kiểm thử đảm bảo 2 học viên có lịch sử lỗi khác nhau nhận 2 lộ trình bài học hoàn toàn khác nhau",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎯 FULLSTACK FEATURE SPECIFICATION\n- **Phân loại**: Full-stack Micro-Session & Adaptive Learning\n- **UI Mockup**: `vietphonics-app/src/ui-reference/t_ng_quan_l_tr_nh_10_ph_t_light_mode/code.html`\n- **Frontend Component**: `vietphonics-app/src/components/dashboard/DailyPathCard.jsx`\n\n#### 🎨 Daily Path Layout\n```\n+-------------------------------------------------------------+\n| LỘ TRÌNH 10 PHÚT HÔM NAY                  [ ⏱️ Còn 10 phút ]|\n| [=== 1 ===] [=== 2 ===] [.. 3 ..] [.. 4 ..] [.. 5 ..]       |\n+-------------------------------------------------------------+\n| BÀI HIỆN TẠI (Bước 3): Phụ Âm Đuôi /t/ trong từ \"contact\"   |\n| Lý do: Bạn đã nuốt âm này 3 lần trong tuần qua.             |\n+-------------------------------------------------------------+\n|                [ BẮT ĐẦU BÀI 3 NGAY (2 PHÚT) ]              |\n+-------------------------------------------------------------+\n```\n\n#### 🗄️ Backend API Contract\n```http\nGET /api/v1/curriculum/daily-path\nAuthorization: Bearer <JWT>\n\nResponse 200 OK:\n{\n  \"totalSteps\": 5,\n  \"steps\": [\n    { \"order\": 1, \"type\": \"warmup\", \"phoneme\": \"/m/\", \"targetWord\": \"moon\" },\n    { \"order\": 2, \"type\": \"challenge\", \"phoneme\": \"/t/\", \"targetWord\": \"contact\" }\n  ]\n}\n```",
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
      "status": "done",
      "size": "L",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-elsa-402-auto-capture",
          "given": "Học viên phát âm một từ có điểm âm vị dưới 60% ở bất kỳ bài học nào trong app",
          "when": "Hệ thống hoàn tất chấm điểm",
          "then": "Từ đó tự động được thu nạp vào Ngân Hàng Lỗi (Error Bank) kèm mốc thời gian, đoạn âm thanh phát âm sai và âm vị cụ thể bị lỗi.",
          "completed": true
        },
        {
          "id": "ac-elsa-402-3d-flip-card",
          "given": "Giao diện ôn tập thẻ SpacedRepetitionDeck",
          "when": "Học viên click vào thẻ bài từ vựng",
          "then": "Thẻ bài lật 3D (3D Flip Animation) hiển thị mặt sau: Ký hiệu IPA chuẩn, mẹo đặt lưỡi sửa lỗi và nút nghe lại phát âm lỗi cũ của mình vs giọng bản xứ.",
          "completed": true
        },
        {
          "id": "ac-elsa-402-sm2-rating-buttons",
          "given": "Học viên vừa hoàn thành lượt nói ôn tập lại từ lỗi",
          "when": "Học viên tự đánh giá mức độ ghi nhớ qua 3 nút: \"Khó (1 Ngày)\", \"Tốt (3 Ngày)\", \"Dễ (7 Ngày)\"",
          "then": "Thuật toán SuperMemo-2 tính toán lại khoảng cách ôn tập (Interval) và hệ số dễ dàng (Easiness Factor EF) cho lần xuất hiện tiếp theo.",
          "completed": true
        },
        {
          "id": "ac-elsa-402-mastery-graduation",
          "given": "Một từ vựng được ôn tập đạt điểm ≥85% trong 3 chu kỳ SM-2 liên tiếp",
          "when": "Hoàn thành chu kỳ thứ 3",
          "then": "Từ đó được trao danh hiệu \"Đã Thuần Thục (Mastered)\", chuyển ra khỏi danh sách cần ôn tập và cộng 50 điểm thành tích.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-elsa-402-fe-deck",
          "title": "Xây dựng component SpacedRepetitionDeck.jsx với hiệu ứng lật thẻ 3D card flip",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-402-be-sm2",
          "title": "Phát triển module SuperMemo2Algorithm tính toán interval ngày ôn tập",
          "category": "AI/DSP",
          "completed": true
        },
        {
          "id": "t-elsa-402-be-api",
          "title": "Xây dựng API GET /api/v1/error-bank/due-cards và POST /api/v1/error-bank/review",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-elsa-402-qa",
          "title": "Kiểm thử tính đúng đắn của công thức SM-2 sau 5 chu kỳ ôn tập liên tiếp",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎯 FULLSTACK FEATURE SPECIFICATION\n- **Phân loại**: Full-stack Spaced Repetition Flashcard Engine\n- **UI Mockup**: `vietphonics-app/src/ui-reference/ng_n_h_ng_t_l_i_n_ng_c_p_pro_light_mode/code.html`\n- **Frontend Component**: `vietphonics-app/src/components/error-bank/SpacedRepetitionDeck.jsx`\n\n#### 🎨 3D Flip Card Layout\n```\n+-------------------------------------------------------------+\n| [MẶT TRƯỚC: Từ vựng]         | [MẶT SAU: Sau khi lật 3D]    |\n| Từ: \"comfortable\"            | Phiên âm: /ˈkʌmftəbl/        |\n| Lỗi cũ: Đọc 4 âm tiết        | Mẹo: Bỏ âm \"for\", chỉ đọc 3  |\n| [🔊 Nghe giọng cũ của bạn]   | âm: \"CƠM-tơ-bồ\"              |\n+-------------------------------------------------------------+\n| ĐÁNH GIÁ ĐỂ LÊN LỊCH ÔN:                                    |\n| [🔴 Khó (1 Ngày)]     [🟡 Tốt (3 Ngày)]     [🟢 Dễ (7 Ngày)] |\n+-------------------------------------------------------------+\n```\n\n#### 🧮 SM-2 Mathematical Formula\n```\nEF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))\nI(1) = 1, I(2) = 6, I(n) = I(n-1) * EF\n```\n- `q`: Điểm chất lượng tự đánh giá (3: Khó, 4: Tốt, 5: Dễ).\n- `EF`: Easiness Factor (khởi đầu 2.5, chặn dưới 1.3).",
      "createdAt": "2026-09-30T17:26:08.290Z"
    },
    {
      "id": "ELSA-601",
      "epicId": "epic-retention",
      "title": "Daily Practice Streak Counter & Streak Freeze Shield: Bộ Đếm Chuỗi Ngày Học Liên Tục & Khiên Đóng Băng Chuỗi",
      "persona": "Người học dễ bị xao nhãng bởi công việc bận rộn đột xuất dẫn đến đứt chuỗi học tập và bỏ cuộc giữa chừng",
      "action": "quan sát ngọn lửa chuỗi ngày học rực rỡ trên thanh điều hướng, nhận thông báo nhắc nhở trước khi ngày kết thúc và sử dụng Khiên Đóng Băng để cứu chuỗi nếu lỡ quên học 1 ngày",
      "value": "bảo vệ công sức tích lũy chuỗi ngày học của học viên, kích hoạt tâm lý \"ghét mất mát (loss aversion)\" để duy trì thói quen luyện phát âm mỗi ngày",
      "priority": "must",
      "status": "done",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-elsa-601-flame-render",
          "given": "Học viên đã học liên tục 7 ngày",
          "when": "Mở ứng dụng",
          "then": "Biểu tượng ngọn lửa Streak hiển thị số \"7\" màu cam đỏ rực rỡ với hiệu ứng hào quang tỏa sáng (Pulsating Flame Glow) trên thanh Header.",
          "completed": true
        },
        {
          "id": "ac-elsa-601-freeze-shield-protect",
          "given": "Học viên sở hữu tối thiểu 1 Khiên Đóng Băng Chuỗi và không vào học trong 24 giờ qua",
          "when": "Thời khắc 00:00 nửa đêm diễn ra",
          "then": "Hệ thống tự động tiêu hao 1 Khiên Đóng Băng, giữ nguyên chuỗi 7 ngày và biến biểu tượng ngọn lửa thành khối băng tuyết xanh dương.",
          "completed": true
        },
        {
          "id": "ac-elsa-601-saved-streak-modal",
          "given": "Học viên vừa được cứu chuỗi bởi Khiên Băng",
          "when": "Đăng nhập vào ngày hôm sau",
          "then": "Hộp thoại StreakSavedModal mở ra chúc mừng: \"Chuỗi 7 ngày của bạn đã được khiên băng bảo vệ an toàn! Hãy hoàn thành 1 bài học hôm nay để làm tan băng!\".",
          "completed": true
        },
        {
          "id": "ac-elsa-601-freeze-purchase",
          "given": "Học viên có đủ 200 Kim Cương Phonics trong tài khoản",
          "when": "Bấm nút \"Mua Khiên Băng Bổ Sung\"",
          "then": "Số lượng khiên tăng thêm 1 và hiển thị huy hiệu số lượng khiên sẵn sàng bảo vệ.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-elsa-601-fe-flame",
          "title": "Xây dựng component StreakBadge.jsx với hiệu ứng SVG ngọn lửa hoạt họa",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-601-fe-modal",
          "title": "Thiết kế StreakSavedModal.jsx thông báo cứu chuỗi với hiệu ứng băng vỡ tan",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-601-be-cron",
          "title": "Thiết lập cron job nửa đêm tự động tiêu thụ khiên băng bảo vệ chuỗi học viên",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-elsa-601-qa",
          "title": "Kiểm thử các trường hợp chuyển đổi múi giờ (Timezone shifting) không làm nhảy sai ngày chuỗi",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 PURE FRONTEND DESIGN SPECIFICATION\n- **Phân loại**: Pure Frontend Gamification Badge & Modals\n- **UI Mockup**: `vietphonics-app/src/ui-reference/t_ng_quan_l_tr_nh_10_ph_t_light_mode/code.html`\n- **Frontend Component**: `vietphonics-app/src/components/gamification/StreakBadge.jsx`\n\n#### 🎨 Streak Design Tokens\n- **Flame Badge**: `flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-rose-500/20 border border-amber-500/40 text-amber-400 font-extrabold shadow-[0_0_15px_rgba(245,158,11,0.3)]`.\n- **Frozen Badge**: `bg-sky-500/20 border-sky-400/50 text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.4)] animate-pulse`.",
      "createdAt": "2026-09-30T17:26:08.290Z"
    },
    {
      "id": "ELSA-602",
      "epicId": "epic-retention",
      "title": "Freemium 5-Lesson Daily Limit & Pro Subscription Paywall Modal: Giới Hạn 5 Bài Học Miễn Phí Mỗi Ngày & Hộp Thoại Nâng Cấp Pro",
      "persona": "Người dùng gói miễn phí (Freemium) muốn trải nghiệm thử ứng dụng nhưng cần được thúc đẩy chuyển đổi sang gói trả phí Pro để học không giới hạn",
      "action": "hoàn thành bài học thứ 5 trong ngày và quan sát hộp thoại Paywall Modal xuất hiện giải thích quyền lợi Pro",
      "value": "tạo phễu chuyển đổi thương mại (conversion funnel) rõ ràng, bảo vệ tài nguyên tính toán GPU của hệ thống đồng thời tạo doanh thu bền vững",
      "priority": "must",
      "status": "done",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-elsa-602-quota-limit",
          "given": "Học viên sử dụng tài khoản miễn phí",
          "when": "Hoàn thành bài tập phát âm thứ 5 trong ngày",
          "then": "Thanh định ngạch hiển thị \"5/5 bài miễn phí hôm nay đã sử dụng\", các bài tập tiếp theo bị khóa với icon ổ khóa Pro màu vàng kim.",
          "completed": true
        },
        {
          "id": "ac-elsa-602-paywall-modal-trigger",
          "given": "Học viên bấm vào bất kỳ bài học nào khi đã hết định ngạch",
          "when": "Hành động click diễn ra",
          "then": "Hộp thoại PaywallModal mở ra trang nhã: Nêu bật 4 đặc quyền Pro (Luyện phát âm không giới hạn, Mở khóa AI Roleplay Alex, Báo cáo IELTS Speaking 9.0, Ngân Hàng Lỗi SM-2).",
          "completed": true
        },
        {
          "id": "ac-elsa-602-quick-upgrade-cta",
          "given": "Học viên xem hộp thoại Paywall",
          "when": "Bấm nút \"Nâng cấp Pro chỉ 3.000đ/ngày\"",
          "then": "Chuyển mượt mà sang Modal quét mã VietQR thanh toán tức thời mà không cần rời trang.",
          "completed": true
        },
        {
          "id": "ac-elsa-602-countdown-reset",
          "given": "Học viên quyết định không nâng cấp Pro hôm nay",
          "when": "Quan sát thông tin trên Paywall Modal",
          "then": "Hiển thị đồng hồ đếm ngược: \"5 bài miễn phí mới sẽ được nạp lại sau: 04 giờ 12 phút (Lúc 00:00)\".",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-elsa-602-fe-modal",
          "title": "Xây dựng component PaywallModal.jsx với danh sách quyền lợi Pro và nút CTA nổi bật",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-602-fe-quota",
          "title": "Thiết kế QuotaUsageBadge hiển thị số bài học còn lại trong ngày trên thanh Header",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-602-fe-timer",
          "title": "Tích hợp bộ đếm thời gian thực đếm ngược đến 00:00 giờ địa phương",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-602-qa",
          "title": "Kiểm tra chặn truy cập thành công vào các tính năng Pro đối với user gói Free",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 PURE FRONTEND DESIGN SPECIFICATION\n- **Phân loại**: Pure Frontend Paywall & Quota Enforcement UI\n- **UI Mockup**: `vietphonics-app/src/ui-reference/ng_n_h_ng_t_l_i_n_ng_c_p_pro_light_mode/code.html`\n- **Frontend Component**: `vietphonics-app/src/components/paywall/PaywallModal.jsx`\n\n#### 🎨 Paywall Design Tokens\n- **Paywall Card**: `bg-slate-900 border-2 border-amber-500/50 rounded-3xl p-8 max-w-lg shadow-[0_0_50px_rgba(245,158,11,0.25)]`.\n- **Pro Badge**: `bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black px-2.5 py-0.5 rounded-full text-xs`.\n- **CTA Button**: `w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-extrabold text-lg shadow-lg hover:scale-105 active:scale-95 transition-all`.",
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
          "id": "ac-vn-104-cue-card-countdown",
          "given": "Học viên bắt đầu bài thi thử IELTS Speaking Part 2",
          "when": "Giám khảo đưa thẻ chủ đề Cue Card (ví dụ: \"Describe a piece of technology you find difficult to use\")",
          "then": "Đồng hồ đếm ngược 60 giây kích hoạt kèm bảng nháp ảo; hết 60 giây chuông báo nhẹ và tự động chuyển sang giai đoạn thu âm 120 giây nói liên tục.",
          "completed": true
        },
        {
          "id": "ac-vn-104-scratchpad-notes",
          "given": "Trong thời gian 60 giây chuẩn bị Part 2",
          "when": "Học viên gõ dàn ý vào khung ScratchPadNotepad",
          "then": "Ghi chú được lưu giữ hiển thị ngay bên cạnh thẻ Cue Card trong suốt thời gian 2 phút nói để học viên liếc nhìn gợi ý.",
          "completed": true
        },
        {
          "id": "ac-vn-104-cambridge-criteria-eval",
          "given": "Học viên hoàn tất 2 phút nói liên tục",
          "when": "Hệ thống gửi audio lên API POST /api/v1/ielts/mock-eval",
          "then": "AI phân tích và xuất bảng điểm 4 tiêu chuẩn Cambridge: Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy, Pronunciation với ước lượng Band 0-9.0.",
          "completed": false
        },
        {
          "id": "ac-vn-104-l1-past-tense-flag",
          "given": "Thí sinh kể lại câu chuyện quá khứ nhưng bỏ quên đuôi thì quá khứ (Past Tense -ed)",
          "when": "Báo cáo ngữ pháp GRA xuất hiện",
          "then": "Liệt kê cụ thể: \"Bạn đã quên chia thì quá khứ ở các động từ: 'use', 'try', 'fail', làm suy giảm độ chính xác ngữ pháp\".",
          "completed": false
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
          "id": "t-vn-104-be-eval",
          "title": "Thiết kế AI Examiner API áp dụng đúng thang điểm chấm thi IELTS Speaking Band Descriptors",
          "category": "Backend",
          "completed": false
        },
        {
          "id": "t-vn-104-qa",
          "title": "Kiểm thử độ chính xác chấm điểm đối chiếu với các cựu giám khảo IELTS thực tế",
          "category": "QA",
          "completed": false
        }
      ],
      "notes": "### 🎯 FULLSTACK FEATURE SPECIFICATION\n- **Phân loại**: Full-stack Exam Simulation & Cambridge Scoring Engine\n- **UI Mockup**: `vietphonics-app/src/ui-reference/ai_h_i_tho_i_roleplay_c_ng_s_light_mode/code.html`\n- **Frontend Component**: `vietphonics-app/src/views/IeltsMockExamView.jsx`\n\n#### 🎨 Exam Room Layout\n```\n+-------------------------------------------------------------+\n| Giám khảo AI: Sarah (London)             [ Đồng Hồ: 01:45 ]  |\n+-------------------------------------------------------------+\n| THẺ CUE CARD PART 2:            | BẢNG GHI CHÚ NHÁP (1 PHÚT)|\n| \"Describe a piece of            | - bought laptop 2 yrs ago |\n|  technology you find difficult  | - heavy, poor battery     |\n|  to use.\"                       | - confusing shortcut keys |\n+-------------------------------------------------------------+\n| [🔴 Đang ghi âm bài nói 2 phút - Hãy nói tự nhiên và lưu loát] |\n+-------------------------------------------------------------+\n```\n\n#### 🗄️ Backend Evaluation Contract\n```http\nPOST /api/v1/ielts/mock-eval\nContent-Type: application/json\n\n{\n  \"examPart\": 2,\n  \"topic\": \"Describe a piece of technology...\",\n  \"audioUrl\": \"https://r2.../ielts_session_992.opus\",\n  \"prepNotes\": \"bought laptop 2 yrs ago...\"\n}\n```\n- Trả về Band điểm 4 tiêu chí: FC, LR, GRA, PR kèm tổng thể Overall Band (e.g. 6.5).",
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
      "status": "done",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-vn-105-three-step-guide",
          "given": "Học viên xem hướng dẫn cấu âm âm /ð/ (this, that)",
          "when": "Mở tab cẩm nang tiếng Việt",
          "then": "Hiển thị mẹo 3 bước trực quan: 1. Đặt đầu lưỡi kẹp nhẹ giữa 2 hàm răng như âm /θ/, 2. Rung cổ họng phát tiếng ong kêu \"zzz\", 3. Rụt nhẹ đầu lưỡi về sau.",
          "completed": true
        },
        {
          "id": "ac-vn-105-side-by-side-comparison",
          "given": "Giao diện NativeTonguePlacementCard hiển thị",
          "when": "Học viên đối chiếu tiếng Việt vs tiếng Anh",
          "then": "Hiển thị sơ đồ so sánh trực quan 2 vòm miệng: Vòm miệng tiếng Việt (cơ miệng mềm, thả lỏng) vs Vòm miệng tiếng Anh (cơ miệng căng, độ nén luồng khí lớn).",
          "completed": true
        },
        {
          "id": "ac-vn-105-tactile-mnemonics",
          "given": "Học viên xem các mẹo xúc giác thực hành",
          "when": "Đọc phần mẹo ghi nhớ",
          "then": "Cung cấp cảm giác xúc giác thực tế: Ví dụ đặt bàn tay trước miệng cảm nhận luồng hơi mát khi phát âm âm vô thanh.",
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
          "id": "t-vn-105-fe-diagram",
          "title": "Thiết kế đồ họa so sánh song song cơ miệng tiếng Việt vs tiếng Anh",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-vn-105-qa",
          "title": "Kiểm thử mức độ dễ hiểu của cẩm nang đối với người học mới bắt đầu từ con số 0",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 PURE FRONTEND DESIGN SPECIFICATION\n- **Phân loại**: Pure Frontend Pedagogical Placement Card\n- **UI Mockup**: `vietphonics-app/src/ui-reference/kh_u_h_nh_2d_th_vi_n_gi_i_ph_u_m_v_l1_light_mode/code.html`\n- **Frontend Component**: `vietphonics-app/src/components/articulation/NativeTonguePlacementGuide.jsx`\n\n#### 📐 3-Step Practical Layout\n```\n+-------------------------------------------------------------+\n| CẨM NANG KHẨU HÌNH THỰC CHIẾN CHO NGƯỜI VIỆT                |\n| Âm: /ð/ (this, that, brother)                               |\n+-------------------------------------------------------------+\n| [BƯỚC 1: KẸP LƯỠI]     -> [BƯỚC 2: RUNG CỔ HỌNG] -> [BƯỚC 3: RỤT LƯỠI]|\n| Thò 2mm đầu lưỡi ra        Kêu tiếng \"zzz\" như      Rụt lưỡi lại nhả |\n| giữa 2 hàm răng            tiếng ong bay            hơi êm dịu       |\n+-------------------------------------------------------------+\n| Mẹo xúc giác: Đặt ngón tay lên cổ họng để cảm nhận độ rung! |\n+-------------------------------------------------------------+\n```\n\n#### 🎨 Design Tokens\n- **Guide Card**: `bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl`.\n- **Step Badge**: `w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 font-bold flex items-center justify-center`.",
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
      "status": "done",
      "size": "L",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-game-101-3star-unlock",
          "given": "Người chơi hoàn thành ải bài học với điểm số ≥85%",
          "when": "Hệ thống tính điểm hoàn tất",
          "then": "Ải được trao 3 sao vàng lấp lánh kèm hiệu ứng pháo hoa particle, con đường dẫn sang ải tiếp theo phát sáng rực rỡ và mở khóa nút \"Bắt đầu Ải kế\".",
          "completed": true
        },
        {
          "id": "ac-game-101-four-biomes-canvas",
          "given": "Giao diện bản đồ thế giới phiêu lưu GamifiedView",
          "when": "Render trên màn hình máy tính hoặc điện thoại",
          "then": "Bản đồ hiển thị 4 quần xã sinh thái độc đáo (Biển ngọc, Thung lũng xanh, Núi lửa tím, Đền cổ vàng kim) theo phong cách Isometric mượt mà 60 FPS, các node ải có hoạt ảnh nhấp nhô floating.",
          "completed": true
        },
        {
          "id": "ac-game-101-node-preview-modal",
          "given": "Người chơi click vào một node ải đã mở khóa",
          "when": "Hộp thoại chi tiết ải mở ra",
          "then": "Hiển thị mục tiêu âm vị (ví dụ: /t/ vs /d/), quái thú trấn giữ ải và phần thưởng Kim Cương Phonics khi hoàn thành.",
          "completed": true
        },
        {
          "id": "ac-game-101-keyboard-world-switch",
          "given": "Người chơi sử dụng phím tắt trên bàn phím",
          "when": "Bấm các phím số 1, 2, 3, 4",
          "then": "Camera trên bản đồ lướt mượt mà chuyển đổi qua lại giữa 4 thế giới mà không bị giật khung hình.",
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
          "id": "t-game-101-fe-floating",
          "title": "Thiết kế hiệu ứng floating animation và particle pháo hoa khi mở khóa ải mới",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-game-101-fe-storage",
          "title": "Lưu trữ tiến trình chơi game tức thời vào LocalStorage client-side",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-game-101-qa",
          "title": "Kiểm thử logic mở khóa tuần tự 40 ải và xử lý ngoại lệ mất mạng khi đang chơi",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 PURE FRONTEND DESIGN SPECIFICATION\n- **Phân loại**: Pure Frontend Isometric Map & Canvas Progression\n- **UI Mockup**: `vietphonics-app/src/ui-reference/game_3d_rpg_chi_n_luy_n_ph_t_m_light_mode/code.html`\n- **Frontend Component**: `vietphonics-app/src/views/GamifiedView.jsx`\n\n#### 📐 Isometric Map Architecture\n```\n+-------------------------------------------------------------+\n| [Thế Giới 1: Đảo Nguyên Âm] -> [Thế Giới 2: Vịnh Âm Đuôi]...|\n+-------------------------------------------------------------+\n|        (Ải 3: ★★★)                                          |\n|                                                            |\n|             --- (Ải 4: ★★☆)                                |\n|                                                            |\n|                       --- [🔒 Boss Vịnh Âm Đuôi]           |\n+-------------------------------------------------------------+\n| [💎 450 Gems]  [🔥 Streak: 7 Ngày]  [⚡ Level 5 Adventurer]   |\n+-------------------------------------------------------------+\n```\n\n#### 🎨 Design Tokens\n- **Node Unlocked**: `w-16 h-16 rounded-3xl bg-white text-slate-900 font-black text-xl shadow-[0_10px_25px_rgba(0,0,0,0.3)] border-4 border-amber-400 hover:scale-110 transition-all cursor-pointer flex items-center justify-center`.\n- **Node Locked**: `w-16 h-16 rounded-3xl bg-slate-800 text-slate-500 border-2 border-slate-700 opacity-60 flex items-center justify-center`.",
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
      "status": "done",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-game-102-realtime-voice-hud",
          "given": "Người chơi đang trong trận chiến phát âm",
          "when": "Micro bắt đầu nhận âm thanh",
          "then": "Nút micro tròn trung tâm tỏa sóng radar gradient Rose-Sky, đồng hồ đo decibel dB thời gian thực nhảy múa sống động kèm độ trễ dưới 25ms.",
          "completed": true
        },
        {
          "id": "ac-game-102-voice-spell-attack",
          "given": "Từ khóa mục tiêu hiển thị (ví dụ \"contact\")",
          "when": "Người chơi nói đúng từ vào micro",
          "then": "Hệ thống nhận diện tức thời và kích hoạt chiêu thức tấn công tung đòn chí mạng (Critical Strike) vào quái vật.",
          "completed": true
        },
        {
          "id": "ac-game-102-dev-simulator-fallback",
          "given": "Người chơi ở nơi công cộng ồn ào hoặc trình duyệt không hỗ trợ Web Speech",
          "when": "Bật chế độ \"Giả Lập Giọng Nói (Dev / Simulator Mode)\"",
          "then": "Xuất hiện phím bấm \"Test Cast Spell\" mô phỏng việc phát âm đạt chuẩn để người chơi tiếp tục cốt truyện game mà không bị chặn.",
          "completed": true
        },
        {
          "id": "ac-game-102-auto-reconnect-loop",
          "given": "Web Speech API bị ngắt kết nối do khoảng lặng kéo dài",
          "when": "Sự kiện onend kích hoạt",
          "then": "Hệ thống tự động khởi tạo lại phiên nhận diện (Auto-Reconnect Loop) mà không yêu cầu người dùng phải bấm lại nút mic.",
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
          "title": "Xây dựng hook useGameSpeechRecognition với khả năng tự phục hồi (auto-reconnect)",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-game-102-fe-sim",
          "title": "Phát triển bộ giả lập VoiceSimulator hỗ trợ kiểm thử không cần micro",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-game-102-qa",
          "title": "Kiểm thử khả năng chịu lỗi khi người dùng cắm/rút tai nghe trong trận đánh",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 PURE FRONTEND DESIGN SPECIFICATION\n- **Phân loại**: Pure Frontend Audio & Speech Controller\n- **UI Mockup**: `vietphonics-app/src/ui-reference/game_3d_rpg_chi_n_luy_n_ph_t_m_light_mode/code.html`\n- **Frontend Component**: `vietphonics-app/src/components/game/VoiceController.jsx`\n\n#### 🎨 Voice HUD Design Tokens\n- **Voice HUD Container**: `bg-slate-900/90 border border-slate-800 rounded-3xl p-4 flex items-center justify-between shadow-2xl`.\n- **RMS Energy Meter**: `h-2 rounded-full bg-slate-800`, Active Fill: `bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500`.\n- **Latency Badge**: `font-mono text-xs text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30`.",
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
      "status": "done",
      "size": "L",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-game-103-boss-hp-shake",
          "given": "Người chơi đối đầu với Boss \"The Final-T Titan\" (100 HP)",
          "when": "Người chơi chọn đúng thần chú phản đòn",
          "then": "Thanh máu Boss sụt giảm 35 HP kèm hoạt ảnh rung lắc màn hình (Screen Shake) và âm thanh vung gươm chân thực.",
          "completed": true
        },
        {
          "id": "ac-game-103-turn-based-counterspells",
          "given": "Boss tung đòn và phát ra âm thanh thử thách (ví dụ \"beat\" /biːt/)",
          "when": "Màn hình hiển thị 2 thẻ bài phản đòn [1] \"bit\" vs [2] \"beat\"",
          "then": "Người chơi có 3.5 giây đếm ngược để chọn thẻ bài tương ứng; chọn đúng sẽ phản đòn, chọn sai Boss sẽ gây sát thương vào người chơi.",
          "completed": true
        },
        {
          "id": "ac-game-103-l1-acoustic-magnifier",
          "given": "Người chơi chọn nhầm từ ngắn sang từ dài",
          "when": "Lượt đánh kết thúc",
          "then": "Kính lúp âm học hiển thị giải thích: \"Âm /iː/ trong 'beat' kéo dài 220ms, miệng cười bè; khác với âm /ɪ/ trong 'bit' chỉ kéo dài 80ms thả lỏng\".",
          "completed": true
        },
        {
          "id": "ac-game-103-number-keys-combat",
          "given": "Người chơi thao tác nhanh bằng bàn phím",
          "when": "Bấm phím 1 hoặc 2",
          "then": "Thẻ bài ma thuật được tung ra tức thời mà không cần click chuột.",
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
          "id": "t-game-103-fe-keys",
          "title": "Tích hợp listener bàn phím số 1, 2 cho lượt phản đòn nhanh",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-game-103-qa",
          "title": "Kiểm thử cân bằng độ khó (game balancing) cho 3 Boss đầu tiên",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 PURE FRONTEND DESIGN SPECIFICATION\n- **Phân loại**: Pure Frontend Turn-Based Game Arena Component\n- **UI Mockup**: `vietphonics-app/src/ui-reference/game_3d_rpg_chi_n_luy_n_ph_t_m_light_mode/code.html`\n- **Frontend Component**: `vietphonics-app/src/views/BossArenaView.jsx`\n\n#### 📐 Boss Arena Battle HUD\n```\n+-------------------------------------------------------------+\n| BOSS: The Final-T Titan [HP: ================== 65/100]     |\n| (Boss đang niệm chú: \"beat\" - 3.5s còn lại)                 |\n+-------------------------------------------------------------+\n|             [1] THẺ PHÉP: \"bit\"    |   [2] THẺ PHÉP: \"beat\" |\n|             Phiên âm: /bɪt/        |   Phiên âm: /biːt/     |\n+-------------------------------------------------------------+\n| BẠN: Adventurer [HP: ==================== 100/100]          |\n+-------------------------------------------------------------+\n```\n\n#### 🎨 Design Tokens\n- **Boss HP Bar**: `h-5 rounded-full bg-slate-950 border border-slate-700 overflow-hidden`, Fill: `bg-gradient-to-r from-rose-600 to-amber-500 transition-all duration-300`.\n- **Spell Card**: `p-5 rounded-2xl bg-slate-900/80 border-2 border-indigo-500/50 hover:border-indigo-400 backdrop-blur-md shadow-xl cursor-pointer active:scale-95`.",
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
      "status": "done",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-game-104-procedural-synth",
          "given": "Game cần phát hiệu ứng âm thanh (tiếng đòn đánh, tiếng nhặt vàng, tiếng thăng cấp)",
          "when": "Hàm playSynthSfx(type) được gọi",
          "then": "Web Audio API OscillatorNode và GainNode tổng hợp sóng âm với envelope ADSR tùy chỉnh trong 0ms, phát ra âm thanh tức thời mà không cần tải file .mp3.",
          "completed": true
        },
        {
          "id": "ac-game-104-zero-asset-download",
          "given": "Học viên mở màn chơi game lần đầu",
          "when": "Kiểm tra lưu lượng mạng tải âm thanh hiệu ứng",
          "then": "Dung lượng tải = 0 KB do toàn bộ SFX được sinh bằng thuật toán toán học phía client.",
          "completed": true
        },
        {
          "id": "ac-game-104-safari-audio-unlock",
          "given": "Học viên chơi game trên trình duyệt Safari iOS",
          "when": "Chạm tay vào màn hình lần đầu tiên",
          "then": "AudioContext tự động chuyển sang trạng thái \"running\" mượt mà theo đúng chính sách autoplay của Apple.",
          "completed": true
        },
        {
          "id": "ac-game-104-accessible-reduced-motion",
          "given": "Người chơi bật chế độ \"Giảm chuyển động (Reduced Motion)\"",
          "when": "Hiệu ứng nổ hạt particle diễn ra",
          "then": "Hệ thống tự động tắt các chớp sáng nhấp nháy, đảm bảo an toàn cho người nhạy cảm ánh sáng (Photosensitive Safe).",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-game-104-fe-synth",
          "title": "Xây dựng module soundEffects.js sử dụng Web Audio API OscillatorNode cho 8 loại hiệu ứng game SFX",
          "category": "Audio/DSP",
          "completed": true
        },
        {
          "id": "t-game-104-fe-safari",
          "title": "Xử lý chính sách âm thanh autoplay và mở khóa AudioContext trên Safari iOS",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-game-104-fe-motion",
          "title": "Tích hợp media query prefers-reduced-motion ngắt hạt nổ ánh sáng",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-game-104-qa",
          "title": "Kiểm thử stress-test chạy 200 lượt phát âm thanh dồn dập không làm nghẽn luồng UI chính",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 PURE FRONTEND DESIGN SPECIFICATION\n- **Phân loại**: Pure Frontend Procedural Sound Synthesizer\n- **UI Mockup**: `vietphonics-app/src/ui-reference/game_3d_rpg_chi_n_luy_n_ph_t_m_light_mode/code.html`\n- **Frontend Component**: `vietphonics-app/src/utils/soundEffects.js`\n\n#### 🧮 Procedural Sound Synthesis Code\n```javascript\nexport function playSynthSfx(type) {\n  const ctx = getAudioContext();\n  const osc = ctx.createOscillator();\n  const gain = ctx.createGain();\n  osc.connect(gain);\n  gain.connect(ctx.destination);\n  \n  if (type === 'hit') {\n    osc.type = 'sawtooth';\n    osc.frequency.setValueAtTime(150, ctx.currentTime);\n    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.12);\n    gain.gain.setValueAtTime(0.4, ctx.currentTime);\n    gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.12);\n    osc.start();\n    osc.stop(ctx.currentTime + 0.12);\n  }\n}\n```\n- **Zero Server Overhead**: 0 byte asset downloads, 100% in-browser Web Audio.",
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
          "id": "ac-game-105-inventory-modal",
          "given": "Người chơi tích lũy đủ Kim Cương Phonics trong game",
          "when": "Mở Cửa Hàng Trang Bị và mua vật phẩm \"Khiên Đóng Băng Chuỗi (Streak Freeze)\"",
          "then": "Vật phẩm xuất hiện trong Túi Đồ (Inventory) với biểu tượng khiên băng 3D phát sáng, sẵn sàng tự động kích hoạt bảo vệ streak nếu quên luyện tập 1 ngày.",
          "completed": true
        },
        {
          "id": "ac-game-105-university-podium",
          "given": "Giao diện Bảng Xếp Hạng Liên Trường (University Leaderboard View)",
          "when": "Học viên mở bảng xếp hạng",
          "then": "Top 3 trường đại học dẫn đầu hiển thị trên bục vinh quang 3D (Hạng 1: Vàng kim, Hạng 2: Bạc, Hạng 3: Đồng) kèm logo sắc nét của các trường ĐH Bách Khoa, Ngoại Thương, Kinh Tế Quốc Dân.",
          "completed": true
        },
        {
          "id": "ac-game-105-personal-rank-footer",
          "given": "Học viên đã chọn trường đại học của mình trong hồ sơ",
          "when": "Bảng xếp hạng hiển thị",
          "then": "Thanh vị trí cá nhân được ghim cố định ở đáy màn hình: \"Bạn đang xếp hạng 14 trong 820 sinh viên ĐH Bách Khoa Hà Nội\".",
          "completed": false
        },
        {
          "id": "ac-game-105-redis-zset-backend",
          "given": "Học viên hoàn thành bài học và ghi nhận điểm XP",
          "when": "Gửi yêu cầu ghi điểm lên API GET/POST /api/v1/leaderboard/university",
          "then": "Máy chủ tính toán thứ hạng thời gian thực qua Redis Sorted Sets trong dưới 20ms mà không gây nghẽn database PostgreSQL.",
          "completed": false
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
          "title": "Triển khai Redis Sorted Sets leaderboard service cho 5,000 users",
          "category": "Backend",
          "completed": false
        },
        {
          "id": "t-game-105-qa",
          "title": "Kiểm thử kịch bản đồng thời 500 sinh viên nộp điểm XP cùng lúc xem bảng xếp hạng có cập nhật chính xác",
          "category": "QA",
          "completed": false
        }
      ],
      "notes": "### 🎯 FULLSTACK FEATURE SPECIFICATION\n- **Phân loại**: Full-stack RPG Inventory & University Leaderboard Engine\n- **UI Mockup**: `vietphonics-app/src/ui-reference/game_3d_rpg_chi_n_luy_n_ph_t_m_light_mode/code.html`\n- **Frontend Component**: `vietphonics-app/src/views/LeaderboardView.jsx`\n\n#### 🎨 University Podium Design Tokens\n- **Podium Rank 1**: `h-36 bg-gradient-to-t from-amber-500 to-yellow-400 text-slate-950 font-black rounded-t-3xl shadow-[0_0_35px_rgba(245,158,11,0.5)] flex flex-col items-center justify-end p-4`.\n- **Podium Rank 2**: `h-28 bg-gradient-to-t from-slate-400 to-slate-200 text-slate-950 font-bold rounded-t-3xl flex flex-col items-center justify-end p-4`.\n- **Podium Rank 3**: `h-24 bg-gradient-to-t from-amber-800 to-amber-700 text-white font-bold rounded-t-3xl flex flex-col items-center justify-end p-4`.\n\n#### 🗄️ Backend Redis ZSET Architecture\n```\nZINCRBY leaderboard:uni:weekly 50 \"HUST\"\nZREVRANGE leaderboard:uni:weekly 0 9 WITHSCORES\n```\n- O(log N) runtime < 2ms, phục vụ 5,000 users đồng thời với tải CPU server < 1%.",
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
      "title": "Learner Authentication, Pronunciation Mastery Dashboard & Skill Radar: Đăng Nhập Tài Khoản & Bảng Điều Khiển Năng Lực Phát Âm",
      "persona": "Học viên muốn có một trung tâm điều khiển cá nhân (Dashboard) tổng kết toàn bộ quá trình phát triển giọng nói tiếng Anh của mình",
      "action": "đăng nhập bằng Google / Email và quan sát biểu đồ Radar đa chiều thể hiện sự tiến bộ trên 5 năng lực: Âm Vị, Trọng Âm, Ngữ Điệu, Âm Đuôi, và Độ Lưu Loát",
      "value": "minh bạch hóa 100% năng lực bản thân, nhìn thấy rõ sự lột xác của giọng nói sau từng tuần học để tự tin nói chuyện ngoài đời thực",
      "priority": "must",
      "status": "done",
      "size": "L",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-user-101-auth-flow",
          "given": "Người dùng chưa đăng nhập",
          "when": "Bấm nút \"Đăng nhập với Google\" hoặc nhập Email/Mật khẩu",
          "then": "Xác thực tài khoản thành công trong dưới 1 giây, cấp JWT Token lưu an toàn trong HttpOnly Cookie và chuyển mượt vào Dashboard.",
          "completed": true
        },
        {
          "id": "ac-user-101-radar-chart-svg",
          "given": "Học viên mở màn hình Dashboard",
          "when": "Biểu đồ Skill Radar hiển thị",
          "then": "Vẽ mạng nhện 5 đỉnh SVG mượt mà: Âm Vị (Phonemes), Trọng Âm (Stress), Ngữ Điệu (Intonation), Âm Đuôi (Ending Sounds), Lưu Loát (Fluency) với vùng diện tích đổi màu theo điểm số.",
          "completed": true
        },
        {
          "id": "ac-user-101-learning-stats-cards",
          "given": "Dữ liệu học tập tích lũy của học viên",
          "when": "Render trên màn hình",
          "then": "Hiển thị 4 thẻ thống kê nhanh: Tổng số phút đã luyện tập, Số âm đã thuần thục (/44), Số từ trong Ngân Hàng Lỗi và Dự báo điểm IELTS Speaking hiện tại.",
          "completed": true
        },
        {
          "id": "ac-user-101-responsive-layout",
          "given": "Người dùng truy cập trên mọi thiết bị (máy tính, máy tính bảng, điện thoại)",
          "when": "Thay đổi kích thước cửa sổ trình duyệt",
          "then": "Bố cục tự động co giãn thích ứng từ 1 cột (Mobile) sang lưới Bento 3 cột (Desktop) mượt mà không bị tràn màn hình.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-user-101-fe-radar",
          "title": "Xây dựng component SkillRadarChart.jsx bằng SVG thuần hỗ trợ hoạt ảnh phóng to mượt mà",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-user-101-fe-dash",
          "title": "Thiết kế bố cục ProfileDashboardView.jsx theo phong cách Bento Grid hiện đại",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-user-101-be-auth",
          "title": "Xây dựng dịch vụ xác thực Auth Service hỗ trợ OAuth2 Google và JWT session",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-user-101-qa",
          "title": "Kiểm thử bảo mật bảo vệ các route riêng tư (Protected Routes) khi token hết hạn",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎯 FULLSTACK FEATURE SPECIFICATION\n- **Phân loại**: Full-stack Dashboard & SVG Skill Radar\n- **UI Mockup**: `vietphonics-app/src/ui-reference/t_ng_quan_l_tr_nh_10_ph_t_light_mode/code.html`\n- **Frontend Component**: `vietphonics-app/src/views/ProfileDashboardView.jsx`\n\n#### 🎨 Skill Radar Math\n```\nx_i = R * (score_i / 100) * cos(2pi i / 5 - pi/2)\ny_i = R * (score_i / 100) * sin(2pi i / 5 - pi/2)\n```\n- 5 đỉnh tương ứng 5 trục kỹ năng cốt lõi.\n\n#### 🗄️ Backend API Contract\n```http\nGET /api/v1/user/profile-dashboard\nAuthorization: Bearer <JWT>\n\nResponse 200 OK:\n{\n  \"user\": { \"name\": \"Dang Vuong\", \"tier\": \"pro\", \"streak\": 7 },\n  \"radarScores\": {\n    \"phonemes\": 85,\n    \"stress\": 78,\n    \"intonation\": 70,\n    \"endingSounds\": 92,\n    \"fluency\": 80\n  },\n  \"stats\": {\n    \"totalPracticeMinutes\": 340,\n    \"masteredPhonemesCount\": 32,\n    \"errorBankCount\": 6,\n    \"predictedIelts\": 7.0\n  }\n}\n```",
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
          "id": "ac-pron-202-gap-input",
          "given": "Câu luyện tập có từ bị khuyết âm đuôi hoặc phụ âm kép (ví dụ: \"Si___ months ago...\")",
          "when": "Học viên nghe âm thanh mẫu và gõ ký tự vào ô trống",
          "then": "Hệ thống tự động kiểm tra ký tự; nếu đúng ô input đổi sang viền xanh lá và tự động chuyển con trỏ (Auto-focus) sang ô kế tiếp.",
          "completed": true
        },
        {
          "id": "ac-pron-202-audio-player-controls",
          "given": "Trình phát âm thanh chính tả trong bài tập",
          "when": "Học viên bấm phím tắt J hoặc nút tua 3s, phím K để tạm dừng, hoặc nút chọn tốc độ 0.75x",
          "then": "Âm thanh phản hồi tức thì với tốc độ điều chỉnh chuẩn xác mà không bị méo tiếng.",
          "completed": true
        },
        {
          "id": "ac-pron-202-silent-letter-warning",
          "given": "Từ vựng có chứa âm câm (e.g., \"doubt\" có âm /b/ câm, \"knight\" có âm /k/ câm)",
          "when": "Học viên hoàn thành bài điền",
          "then": "Hệ thống hiển thị ghi chú sư phạm: \"Chú ý: Trong từ 'doubt', chữ cái 'b' là âm câm, phát âm chỉ là /daʊt/\".",
          "completed": true
        },
        {
          "id": "ac-pron-202-backend-evaluation",
          "given": "Học viên bấm nút Nộp bài",
          "when": "Dữ liệu gửi lên API POST /api/v1/practice/dictation-submit",
          "then": "Máy chủ tính toán khoảng cách Levenshtein kiểm tra đáp án, lưu điểm số vào PostgreSQL và trả về kết quả trong dưới 50ms.",
          "completed": false
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
          "completed": false
        },
        {
          "id": "t-pron-202-qa",
          "title": "Kiểm thử hộp đen các trường hợp gõ chữ hoa/thường, khoảng trắng và ký tự đặc biệt",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎯 FULLSTACK FEATURE SPECIFICATION\n- **Phân loại**: Full-stack Dictation & Phonemic Input Evaluator\n- **UI Mockup**: `vietphonics-app/src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html`\n- **Frontend Component**: `vietphonics-app/src/components/articulation/AudioDictationCard.jsx`\n\n#### 🎨 Frontend Gap Input Tokens\n- **Gap Input**: `w-14 text-center font-mono text-xl font-bold rounded-xl border-2 border-slate-700 bg-slate-900 text-indigo-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20`.\n- **Correct State**: `border-emerald-500 bg-emerald-500/10 text-emerald-400 animate-pulse`.\n\n#### 🗄️ Backend API & Levenshtein Contract\n```http\nPOST /api/v1/practice/dictation-submit\nAuthorization: Bearer <JWT>\nContent-Type: application/json\n\n{\n  \"exerciseId\": \"dic_0912\",\n  \"userAnswers\": { \"gap_1\": \"x\" }\n}\n```\n- **Response**: Trả về `isCorrect: true`, `ipa: \"/sɪks/\"`, kèm giải thích quy tắc âm câm nếu có.",
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
          "id": "ac-pron-203-target-highlighting",
          "given": "Câu luyện tập âm /θ/: \"I think thirty-three thieves thought of that\"",
          "when": "Câu hiển thị trên màn hình",
          "then": "Toàn bộ 6 vị trí chứa âm /θ/ mục tiêu được bôi đậm nổi bật bằng màu xanh Sky-400 kèm huy hiệu đếm vị trí.",
          "completed": true
        },
        {
          "id": "ac-pron-203-realtime-badge-counter",
          "given": "Học viên vừa hoàn thành lượt đọc câu vào micro",
          "when": "Hệ thống hoàn tất chấm điểm",
          "then": "Huy hiệu đếm hiển thị tỷ lệ đạt: Ví dụ \"5/6 âm /θ/ đạt chuẩn (83%)\", kèm vòng tròn tiến trình đổi sang màu xanh.",
          "completed": true
        },
        {
          "id": "ac-pron-203-substitution-detection",
          "given": "Học viên đọc từ \"thirty\" thành \"tơ-ti\" (biến âm /θ/ thành /t/)",
          "when": "Hệ thống phát hiện lỗi thay thế âm",
          "then": "Từ \"thirty\" được gắn nhãn cảnh báo: \"Lỗi thay thế: /θ/ bị đọc thành /t/. Hãy kẹp đầu lưỡi!\".",
          "completed": true
        },
        {
          "id": "ac-pron-203-isolate-audio-snippet",
          "given": "Học viên click vào bất kỳ từ nào trong câu",
          "when": "Sự kiện click diễn ra",
          "then": "Trình phát tự động cô lập và phát âm mẫu của riêng từ đó để học viên bắt chước lại.",
          "completed": false
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
          "id": "t-pron-203-fe-snippet",
          "title": "Tích hợp AudioBuffer slice phát riêng lẻ từng từ khi click vào câu văn",
          "category": "Frontend",
          "completed": false
        },
        {
          "id": "t-pron-203-be-scoring",
          "title": "Phát triển API POST /api/v1/scoring/targeted-sound lọc điểm theo phoneme symbol",
          "category": "Backend",
          "completed": true
        }
      ],
      "notes": "### 🎯 FULLSTACK FEATURE SPECIFICATION\n- **Phân loại**: Full-stack Target Sound Scoring & Sentence Highlight\n- **UI Mockup**: `vietphonics-app/src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html`\n- **Frontend Component**: `vietphonics-app/src/components/articulation/TargetSoundDrill.jsx`\n\n#### 🎨 Target Token Design Tokens\n- **Target Sound Token**: `font-bold text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/30`.\n- **Accuracy Badge**: `bg-slate-900 border border-slate-800 rounded-full px-4 py-1.5 font-mono text-sm`.\n\n#### 🗄️ Backend API Contract\n```http\nPOST /api/v1/scoring/targeted-sound\nContent-Type: application/json\n\n{\n  \"sentenceId\": \"sat_theta_01\",\n  \"targetPhoneme\": \"/θ/\",\n  \"audioUrl\": \"https://r2.../sat_01.opus\"\n}\n```\n- Trả về `targetSoundAccuracy`, `totalOccurrences`, và danh sách `phonemeBreakdown` từng từ.",
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
      "status": "done",
      "size": "L",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-pron-204-dual-tracks-render",
          "given": "Học viên vừa hoàn thành lượt thu âm từ mục tiêu (e.g. \"thought\")",
          "when": "Giao diện DualTrackStudio tải xong",
          "then": "Hiển thị 2 kênh sóng âm song song: Kênh A (Giọng bản xứ) màu xanh Sky-400 và Kênh B (Giọng học viên) màu hồng Rose-400, căn chỉnh thẳng hàng theo đỉnh nguyên âm chính.",
          "completed": true
        },
        {
          "id": "ac-pron-204-interactive-playhead",
          "given": "Thanh trượt Playhead Scrubber chạy dọc qua cả 2 track sóng âm",
          "when": "Học viên dùng chuột kéo thanh Playhead sang trái/phải",
          "then": "Âm thanh của cả 2 kênh được duyệt âm tức thời (Audio Scrubbing) giúp soi chiếu từng mili-giây phát âm.",
          "completed": true
        },
        {
          "id": "ac-pron-204-duration-discrepancy",
          "given": "Học viên ngân nguyên âm quá ngắn (ví dụ /ɔː/ trong \"thought\" chỉ kéo dài 100ms thay vì 220ms)",
          "when": "Hệ thống so sánh độ rộng biên độ sóng âm",
          "then": "Vùng thiếu hụt thời gian hiển thị khung viền đứt nét màu vàng Amber kèm thông báo: \"Nguyên âm quá ngắn! Hãy kéo dài thêm ~120ms\".",
          "completed": true
        },
        {
          "id": "ac-pron-204-ab-channel-hotkeys",
          "given": "Học viên thao tác bằng bàn phím",
          "when": "Bấm phím A để nghe kênh bản ngữ, bấm phím B để nghe lại giọng mình",
          "then": "Chuyển kênh tức thời dưới 10ms, giúp tai cảm nhận độ tương phản rõ rệt.",
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
          "id": "t-pron-204-fe-hotkeys",
          "title": "Thiết lập phím tắt toàn cục A/B chuyển đổi nhanh 2 luồng âm thanh",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-204-qa",
          "title": "Kiểm thử độ đồng bộ mili-giây giữa Playhead và luồng phát âm thanh",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 PURE FRONTEND DESIGN SPECIFICATION\n- **Phân loại**: Pure Frontend Dual-Track Audio Studio\n- **UI Mockup**: `vietphonics-app/src/ui-reference/acoustic_precision_light/code.html`\n- **Frontend Component**: `vietphonics-app/src/components/articulation/DualTrackStudio.jsx`\n\n#### 📐 Dual Track Canvas Architecture\n```\n+-------------------------------------------------------------+\n| TRACK A (Bản xứ):  [~~~///~~~~~]  Duration: 680ms        |\n|                    | <- Playhead line                      |\n| TRACK B (Học viên):[~~//..      ]  Duration: 420ms (Ngắn) |\n|                            [ ! Cần ngân dài thêm ! ]        |\n+-------------------------------------------------------------+\n| Phím tắt: [A] Nghe Bản Xứ  |  [B] Nghe Học Viên  |  [Space] Dừng |\n+-------------------------------------------------------------+\n```\n\n#### 🎨 Design Tokens\n- **Native Track**: `bg-slate-900 border border-sky-500/30 rounded-2xl p-3 h-20`.\n- **User Track**: `bg-slate-900 border border-rose-500/30 rounded-2xl p-3 h-20`.\n- **Playhead**: `w-0.5 bg-amber-400 absolute top-0 bottom-0 shadow-[0_0_8px_#f59e0b]`.",
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
          "id": "ac-pron-205-ladder-unlock",
          "given": "Học viên chọn luyện âm /z/",
          "when": "Học viên hoàn thành Tier 1 (Vị trí đầu từ e.g. \"zoo\", \"zero\") với điểm số ≥80%",
          "then": "Hệ thống tự động kích hoạt hiệu ứng mở khóa Tier 2 (Vị trí giữa từ e.g. \"music\", \"lazy\") và Tier 3 (Vị trí cuối từ e.g. \"buzz\", \"please\").",
          "completed": true
        },
        {
          "id": "ac-pron-205-ladder-ui-render",
          "given": "Giao diện PositionalLadderView",
          "when": "Hiển thị trên màn hình",
          "then": "Thang leo 3 tầng trực quan: Mỗi tầng là một thẻ Card có huy hiệu vị trí (Đầu - Giữa - Cuối), thanh đánh giá 3 sao (0/3 sao) và nút \"Bắt đầu\".",
          "completed": true
        },
        {
          "id": "ac-pron-205-final-position-warning",
          "given": "Học viên bước vào Tier 3 (Vị trí cuối từ - cửa ải khó khăn nhất của người Việt)",
          "when": "Mở bài luyện Tier 3",
          "then": "Hiển thị thẻ chú ý L1: \"85% người Việt nuốt âm ở vị trí này! Hãy duy trì luồng hơi rung dây thanh quản đến tận mili-giây cuối cùng\".",
          "completed": false
        },
        {
          "id": "ac-pron-205-local-storage-sync",
          "given": "Học viên hoàn thành các sao ở mỗi tầng",
          "when": "Đóng trình duyệt và mở lại",
          "then": "Toàn bộ số sao và trạng thái mở khóa của 3 tầng được lưu giữ chuẩn xác trong LocalStorage / User Profile.",
          "completed": false
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
          "id": "t-pron-205-fe-stars",
          "title": "Thiết kế StarRatingDisplay hiển thị 3 sao thành tích cho mỗi tầng",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-205-fe-l1-card",
          "title": "Xây dựng L1FinalConsonantAlertCard cảnh báo đặc thù cho Tier 3",
          "category": "Frontend",
          "completed": false
        },
        {
          "id": "t-pron-205-qa",
          "title": "Kiểm thử logic khóa/mở khóa tuần tự giữa 3 cấp bậc",
          "category": "QA",
          "completed": false
        }
      ],
      "notes": "### 🎨 PURE FRONTEND DESIGN SPECIFICATION\n- **Phân loại**: Pure Frontend UI Progression Ladder\n- **UI Mockup**: `vietphonics-app/src/ui-reference/kh_u_h_nh_2d_th_vi_n_gi_i_ph_u_m_v_l1_light_mode/code.html`\n- **Frontend Component**: `vietphonics-app/src/components/articulation/PositionalLadder.jsx`\n\n#### 📐 3-Tier Ladder Layout\n```\n+-------------------------------------------------------------+\n| TIER 3: VỊ TRÍ CUỐI TỪ (FINAL) - Khó nhất                   |\n| Ví dụ: \"buzz\", \"please\" | Trạng thái: [🔒 Đang khóa]        |\n+-------------------------------------------------------------+\n| TIER 2: VỊ TRÍ GIỮA TỪ (MEDIAL) - Trung bình                |\n| Ví dụ: \"music\", \"lazy\"  | Trạng thái: [★ ★ ☆ 2/3 Sao]       |\n+-------------------------------------------------------------+\n| TIER 1: VỊ TRÍ ĐẦU TỪ (INITIAL) - Dễ nhất                   |\n| Ví dụ: \"zoo\", \"zero\"    | Trạng thái: [★ ★ ★ Hoàn thành]    |\n+-------------------------------------------------------------+\n```\n\n#### 🎨 Design Tokens\n- **Tier 1 (Initial)**: `bg-sky-950/40 border-sky-500/40 text-sky-300 rounded-3xl p-4`.\n- **Tier 2 (Medial)**: `bg-indigo-950/40 border-indigo-500/40 text-indigo-300 rounded-3xl p-4`.\n- **Tier 3 (Final)**: `bg-rose-950/40 border-rose-500/40 text-rose-300 rounded-3xl p-4`.",
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
          "id": "ac-pron-206-progression-steps",
          "given": "Học viên đạt điểm từ đơn \"breathe\" (>85%)",
          "when": "Hệ thống mở khóa bài luyện cấp tiến",
          "then": "Hiển thị bước 2 là cụm từ (\"breathe in deeply\"), và sau khi đạt bước 2 sẽ mở bước 3 là câu hoàn chỉnh (\"Take a moment to breathe in deeply\").",
          "completed": true
        },
        {
          "id": "ac-pron-206-pills-layout",
          "given": "Giao diện ProgressionView hiển thị",
          "when": "Render trên màn hình",
          "then": "Thanh tiến trình 3 viên thuốc (Pill Stepper: Word -> Phrase -> Sentence) hiển thị mượt mà với trạng thái hoàn thành có dấu tick.",
          "completed": true
        },
        {
          "id": "ac-pron-206-degradation-alert",
          "given": "Khi chuyển từ từ đơn sang câu dài, độ chính xác của âm mục tiêu bị tụt dốc >15%",
          "when": "Hệ thống phát hiện suy hao độ chuẩn xác",
          "then": "Bật cảnh báo: \"Bạn đang bị mất âm khi nói câu dài! Hãy giảm tốc độ nói và tập trung vào âm mục tiêu trước\".",
          "completed": false
        },
        {
          "id": "ac-pron-206-auto-advance",
          "given": "Học viên bấm phím Enter sau khi hoàn thành đạt chuẩn bước hiện tại",
          "when": "Sự kiện Enter kích hoạt",
          "then": "Tự động chuyển tiếp trơn tru sang bước tiếp theo mà không cần dùng chuột.",
          "completed": false
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
          "id": "t-pron-206-fe-pills",
          "title": "Thiết kế StepPillIndicator với hiệu ứng chuyển đổi trạng thái",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-206-be-eval",
          "title": "Phát triển API POST /api/v1/practice/progression-tier kiểm soát điều kiện chuyển cấp",
          "category": "Backend",
          "completed": false
        },
        {
          "id": "t-pron-206-qa",
          "title": "Kiểm thử độ ổn định chấm điểm khi chuyển tiếp giữa các cấp độ",
          "category": "QA",
          "completed": false
        }
      ],
      "notes": "### 🎯 FULLSTACK FEATURE SPECIFICATION\n- **Phân loại**: Full-stack Connected Speech Progression Engine\n- **UI Mockup**: `vietphonics-app/src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html`\n- **Frontend Component**: `vietphonics-app/src/components/articulation/ConnectedProgression.jsx`\n\n#### 🎨 Stepper Pills Design Tokens\n- **Completed Step**: `px-4 py-2 rounded-full font-semibold text-xs border border-emerald-500 bg-emerald-500/10 text-emerald-400`.\n- **Active Step**: `px-4 py-2 rounded-full font-semibold text-xs border border-indigo-500 bg-indigo-500/20 text-indigo-300 ring-2 ring-indigo-500/30`.\n- **Locked Step**: `px-4 py-2 rounded-full font-semibold text-xs border border-slate-800 bg-slate-900/50 text-slate-500`.\n\n#### 🗄️ Backend API Contract\n```http\nPOST /api/v1/practice/progression-tier\nContent-Type: application/json\n\n{\n  \"targetWord\": \"breathe\",\n  \"tier\": \"phrase\",\n  \"audioUrl\": \"https://r2.../phrase_01.opus\"\n}\n```",
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
          "id": "ac-pron-207-three-columns-board",
          "given": "Giao diện VoicingRuleMasteryView hiển thị bài tập phân loại đuôi -s/-es",
          "when": "Học viên xem bảng điều khiển",
          "then": "Hiển thị 3 cột phân loại trực quan: Cột /s/ (Vô thanh), Cột /z/ (Hữu thanh), Cột /ɪz/ (Âm xuýt), hỗ trợ kéo thả hoặc bấm phím số 1, 2, 3.",
          "completed": true
        },
        {
          "id": "ac-pron-207-vibration-feedback",
          "given": "Học viên phát âm một từ kết thúc bằng âm hữu thanh (ví dụ \"dogs\", \"played\")",
          "when": "Hệ thống đo đạc độ rung của dây thanh quản",
          "then": "Nếu phát âm đúng âm hữu thanh (/z/, /d/), hiển thị biểu tượng dây thanh âm rung màu xanh lá; nếu đọc nhầm sang vô thanh (/s/, /t/), hiển thị cảnh báo giải thích.",
          "completed": true
        },
        {
          "id": "ac-pron-207-vietnamese-mnemonics",
          "given": "Học viên cần mẹo nhớ nhanh quy tắc",
          "when": "Bấm nút \"Xem Câu Thần Chú\"",
          "then": "Hiển thị câu khẩu quyết dân gian: \"Thời phong kiến phương tây\" cho đuôi /s/ và \"Sáng sớm chạy xe sh zỏm\" cho đuôi /ɪz/.",
          "completed": false
        },
        {
          "id": "ac-pron-207-rule-api-validation",
          "given": "Học viên phân loại xong danh sách 10 từ",
          "when": "Gửi kết quả lên API POST /api/v1/grammar/voicing-check",
          "then": "Backend kiểm tra ma trận âm học đối chiếu và trả về bảng tổng kết tỷ lệ đạt trong dưới 30ms.",
          "completed": false
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
          "id": "t-pron-207-fe-mnemonic",
          "title": "Thiết kế MnemonicCard ghi nhớ mẹo dân gian tiếng Việt",
          "category": "Frontend",
          "completed": false
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
          "completed": false
        }
      ],
      "notes": "### 🎯 FULLSTACK FEATURE SPECIFICATION\n- **Phân loại**: Full-stack Voicing Rule Engine & Interactive Sorting Board\n- **UI Mockup**: `vietphonics-app/src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html`\n- **Frontend Component**: `vietphonics-app/src/components/articulation/VoicingRuleMastery.jsx`\n\n#### 🎨 3-Column Sorting Board Layout\n```\n+-------------------------------------------------------------+\n| Cột 1: /s/                  | Cột 2: /z/        | Cột 3: /ɪz/ |\n| \"Thời phong kiến phương tây\"| (Còn lại)         | (Âm xuýt)   |\n| [cats] [books]              | [dogs] [plays]    | [buses]     |\n+-------------------------------------------------------------+\n```\n\n#### 🗄️ Backend Voicing Rule Contract\n```http\nPOST /api/v1/grammar/voicing-check\nContent-Type: application/json\n\n{\n  \"category\": \"s_es_endings\",\n  \"submissions\": [\n    { \"word\": \"dogs\", \"chosenCoda\": \"/z/\" }\n  ]\n}\n```",
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
      "status": "todo",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-pron-208-tongue-twister-text",
          "given": "Câu luyện đảo âm đối kháng: \"She sells sea shells on the sea shore\"",
          "when": "Câu hiển thị trên màn hình",
          "then": "Các từ chứa âm /s/ được tô màu xanh Sky, các từ chứa âm /ʃ/ được tô màu hồng Rose, có icon biểu thị trạng thái môi (Bè miệng cười vs Cong môi chu ra).",
          "completed": false
        },
        {
          "id": "ac-pron-208-assimilation-detection",
          "given": "Học viên đọc câu và bị líu lưỡi (đọc tất cả thành /s/ hoặc tất cả thành /ʃ/)",
          "when": "Hệ thống phân tích ranh giới phổ âm học",
          "then": "Phát hiện lỗi đồng hóa âm (Phonetic Assimilation) và chỉ rõ vị trí bị líu lưỡi kèm thông báo: \"'She' (cong môi) -> 'sells' (bè miệng)\".",
          "completed": false
        },
        {
          "id": "ac-pron-208-web-audio-metronome",
          "given": "Học viên gặp khó khăn khi đọc ở tốc độ bình thường",
          "when": "Bật chế độ \"Máy Gõ Nhịp Metronome (60 BPM)\"",
          "then": "Web Audio API phát tiếng gõ nhịp đều đặn, từ tương ứng phát sáng theo từng nhịp gõ để học viên luyện chuẩn từng bước.",
          "completed": false
        },
        {
          "id": "ac-pron-208-transition-scoring-api",
          "given": "Bản ghi âm câu đảo âm được gửi lên API POST /api/v1/practice/confusion-trap",
          "when": "Máy chủ chấm điểm sự phân tách âm vị",
          "then": "Trả về ma trận điểm số chuyển đổi (Cross-Transition Matrix) và chỉ số độ dẻo cơ miệng trong dưới 200ms.",
          "completed": false
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pron-208-fe-twister",
          "title": "Xây dựng component CrossTransitionTwister.jsx với máy gõ nhịp Metronome Web Audio",
          "category": "Frontend",
          "completed": false
        },
        {
          "id": "t-pron-208-fe-metronome",
          "title": "Thiết kế Web Audio Metronome phát xung nhịp click từ 60 BPM đến 120 BPM",
          "category": "Frontend",
          "completed": false
        },
        {
          "id": "t-pron-208-be-eval",
          "title": "Phát triển API POST /api/v1/practice/confusion-trap chấm điểm độ phân tách âm",
          "category": "Backend",
          "completed": false
        },
        {
          "id": "t-pron-208-qa",
          "title": "Kiểm thử với 30 câu líu lưỡi kinh điển của người học tiếng Anh",
          "category": "QA",
          "completed": false
        }
      ],
      "notes": "### 🎯 FULLSTACK FEATURE SPECIFICATION\n- **Phân loại**: Full-stack Confusion-Trap & Metronome Rhythmic Engine\n- **UI Mockup**: `vietphonics-app/src/ui-reference/kh_u_h_nh_2d_th_vi_n_gi_i_ph_u_m_v_l1_light_mode/code.html`\n- **Frontend Component**: `vietphonics-app/src/components/articulation/CrossTransitionDrill.jsx`\n\n#### 🎨 Alternating Phoneme Colors\n- **Sound A (/s/) Chip**: `bg-sky-500/20 text-sky-400 border border-sky-500 font-bold px-2 py-1 rounded`.\n- **Sound B (/ʃ/) Chip**: `bg-rose-500/20 text-rose-400 border border-rose-500 font-bold px-2 py-1 rounded`.\n\n#### 🗄️ Backend API Contract\n```http\nPOST /api/v1/practice/confusion-trap\nContent-Type: application/json\n\n{\n  \"drillId\": \"trap_s_sh_01\",\n  \"audioUrl\": \"https://r2.../twister.opus\"\n}\n```",
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
          "id": "ac-pron-209-radial-mindmap",
          "given": "Học viên tra cứu âm /f/",
          "when": "Bản đồ chính tả SVG hiển thị",
          "then": "Nút trung tâm hiển thị ký hiệu /f/, tỏa ra các nhánh tỷ lệ: Nhánh \"f/ff\" (78%), Nhánh \"ph\" (18%), Nhánh \"gh\" (4% e.g. \"rough\", \"laugh\").",
          "completed": true
        },
        {
          "id": "ac-pron-209-branch-expansion",
          "given": "Học viên click vào nhánh \"ph\"",
          "when": "Nhánh mở rộng",
          "then": "Hiển thị danh sách 5 từ ví dụ thông dụng: \"phone\", \"photo\", \"physics\", \"phrase\", \"dolphin\" kèm nút nghe phát âm.",
          "completed": true
        },
        {
          "id": "ac-pron-209-silent-spelling-warning",
          "given": "Học viên xem nhánh \"gh\"",
          "when": "Bật cảnh báo âm câm",
          "then": "Hiển thị ghi chú: \"'gh' chỉ đọc là /f/ trong một số từ như 'laugh', 'rough'; còn trong 'though', 'night' thì hoàn toàn là âm câm!\".",
          "completed": false
        },
        {
          "id": "ac-pron-209-keyboard-traversal",
          "given": "Học viên duyệt cây bằng bàn phím",
          "when": "Dùng phím mũi tên hoặc Tab",
          "then": "Con trỏ duyệt qua từng nhánh và đọc to tỷ lệ phần trăm phân bố.",
          "completed": false
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
          "id": "t-pron-209-fe-branch",
          "title": "Thiết kế hiệu ứng bung nhánh hoạt họa (Framer Motion Tree Expansion)",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-209-fe-silent",
          "title": "Tích hợp thẻ chú thích âm câm SilentSpellingCallout",
          "category": "Frontend",
          "completed": false
        },
        {
          "id": "t-pron-209-qa",
          "title": "Kiểm tra độ chính xác của tỷ lệ phần trăm phân bố chính tả theo từ điển thống kê",
          "category": "QA",
          "completed": false
        }
      ],
      "notes": "### 🎨 PURE FRONTEND DESIGN SPECIFICATION\n- **Phân loại**: Pure Frontend Radial SVG Mindmap\n- **UI Mockup**: `vietphonics-app/src/ui-reference/kh_u_h_nh_2d_th_vi_n_gi_i_ph_u_m_v_l1_light_mode/code.html`\n- **Frontend Component**: `vietphonics-app/src/components/articulation/MultiSpellingSoundMap.jsx`\n\n#### 📐 Radial Mindmap Hierarchy\n```\n+-------------------------------------------------------------+\n|             [ Nhánh \"f/ff\" (78%) - fast, coffee ]           |\n|                               ^                             |\n|                               |                             |\n| [ \"gh\" (4%) ] <--- (( TÂM: ÂM /f/ )) ---> [ \"ph\" (18%) ]    |\n| rough, laugh                                phone, photo    |\n+-------------------------------------------------------------+\n```\n\n#### 🎨 Design Tokens\n- **Center Node**: `w-24 h-24 rounded-full bg-indigo-600 text-white font-black text-2xl flex items-center justify-center shadow-2xl`.\n- **Branch Node**: `bg-slate-900 border border-slate-700 rounded-2xl p-3 text-slate-200 hover:border-indigo-400 cursor-pointer`.",
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
      "status": "todo",
      "size": "L",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-pron-210-dual-camera-angles",
          "given": "Học viên xem video khẩu hình âm /θ/",
          "when": "Bấm nút chuyển đổi góc quay",
          "then": "Trình phát đổi tức thì giữa Góc nhìn thẳng (Frontal View) và Góc nghiêng 45 độ (Profile View) mà không bị gián đoạn âm thanh.",
          "completed": false
        },
        {
          "id": "ac-pron-210-auto-zoom-cues",
          "given": "Video phát đến khoảnh khắc đặt lưỡi kẹp răng",
          "when": "Khung hình chạm mốc thời gian WebVTT cue",
          "then": "Giao diện tự động zoom cận cảnh 2x vào vùng miệng của chuyên gia, hiển thị vòng tròn phát sáng màu xanh chỉ vào đầu lưỡi.",
          "completed": false
        },
        {
          "id": "ac-pron-210-ab-loop-slowmo",
          "given": "Học viên muốn soi kỹ một chuyển động khẩu hình khó",
          "when": "Chọn tốc độ phát 0.25x hoặc 0.5x và bật nút lặp đoạn A-B",
          "then": "Đoạn video được lặp lại liên tục ở tốc độ siêu chậm mượt mà.",
          "completed": false
        },
        {
          "id": "ac-pron-210-low-bandwidth-fallback",
          "given": "Đường truyền mạng của học viên bị suy giảm băng thông",
          "when": "Hệ thống phát hiện buffer underrun",
          "then": "Tự động hạ độ phân giải video hoặc chuyển sang chế độ ảnh động WebP nén nhẹ nhàng.",
          "completed": false
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pron-210-fe-player",
          "title": "Xây dựng component MasterclassVideoPlayer.jsx với tính năng lặp đoạn A-B và đổi góc quay",
          "category": "Frontend",
          "completed": false
        },
        {
          "id": "t-pron-210-fe-webvtt",
          "title": "Tích hợp bộ phân tích WebVTT Cues đồng bộ hoạt ảnh SVG đè lên luồng video",
          "category": "Frontend",
          "completed": false
        },
        {
          "id": "t-pron-210-qa",
          "title": "Kiểm thử khả năng phát mượt mà trên kết nối mạng di động 4G",
          "category": "QA",
          "completed": false
        }
      ],
      "notes": "### 🎨 PURE FRONTEND DESIGN SPECIFICATION\n- **Phân loại**: Pure Frontend Video Player & WebVTT Sync\n- **UI Mockup**: `vietphonics-app/src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html`\n- **Frontend Component**: `vietphonics-app/src/components/articulation/VideoMasterclassPlayer.jsx`\n\n#### 📐 Video Player Layout & Controls\n```\n+-------------------------------------------------------------+\n| [ TRÌNH PHÁT VIDEO KHẨU HÌNH 16:9 FULL HD ]                 |\n| (Chuyên gia bản ngữ phát âm phóng đại khẩu hình)            |\n| (Vòng tròn neon zoom cận cảnh 2x vào vị trí đầu lưỡi)       |\n+-------------------------------------------------------------+\n| [Góc: Thẳng / 45°]  [Tốc độ: 0.25x | 0.5x | 1x]  [Lặp đoạn A-B]|\n+-------------------------------------------------------------+\n```\n\n#### 🎨 Design Tokens\n- **Video Frame**: `rounded-3xl overflow-hidden border-2 border-slate-800 bg-black aspect-video relative shadow-2xl`.\n- **Control Overlay**: `bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-4 flex items-center justify-between`.",
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
      "status": "todo",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-pron-211-saturation-meter-fill",
          "given": "Câu bão hòa âm /dʒ/: \"George enjoyed arranging orange juice in the large fridge\"",
          "when": "Học viên đọc câu và phát âm đúng từng âm /dʒ/",
          "then": "Thanh \"Saturation Meter\" tăng dần độ đầy từ 0% đến 100% kèm hiệu ứng phát sáng neon xanh ngọc.",
          "completed": false
        },
        {
          "id": "ac-pron-211-ctc-density-eval",
          "given": "Bản ghi âm câu bão hòa được gửi lên hệ thống",
          "when": "Thuật toán CTC Alignment xử lý phân tích mật độ âm",
          "then": "Chấm điểm độc lập cho toàn bộ 6 âm /dʒ/ và chỉ rõ các vị trí đạt hay chưa đạt trong vòng dưới 250ms.",
          "completed": false
        },
        {
          "id": "ac-pron-211-l1-affricate-advice",
          "given": "Học viên phát âm /dʒ/ thành /z/ hoặc /d/ kiểu Việt Nam",
          "when": "Hệ thống phát hiện lỗi mất âm tắc xát (Affricate Failure)",
          "then": "Hiển thị lời khuyên: \"Âm /dʒ/ là âm tắc xát: Cần khép miệng nén khí rồi mới bật ra, không đọc lướt như chữ 'd' tiếng Việt\".",
          "completed": false
        },
        {
          "id": "ac-pron-211-native-slow-demo",
          "given": "Học viên bấm nút \"Nghe Bản Xứ Chậm\"",
          "when": "Hành động kích hoạt",
          "then": "Phát audio bản ngữ ở tốc độ 0.7x với từng âm /dʒ/ được phát âm rõ ràng, chuẩn xác.",
          "completed": false
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pron-211-fe-meter",
          "title": "Xây dựng component SaturationMeter.jsx với hiệu ứng tích lũy năng lượng khi đọc đúng",
          "category": "Frontend",
          "completed": false
        },
        {
          "id": "t-pron-211-be-eval",
          "title": "Phát triển API POST /api/v1/scoring/saturation-sentence chấm điểm câu bão hòa",
          "category": "Backend",
          "completed": false
        },
        {
          "id": "t-pron-211-qa",
          "title": "Kiểm thử với ngân hàng 100 câu bão hòa âm vị khó",
          "category": "QA",
          "completed": false
        }
      ],
      "notes": "### 🎯 FULLSTACK FEATURE SPECIFICATION\n- **Phân loại**: Full-stack Sound Saturation Evaluator & Energy Meter\n- **UI Mockup**: `vietphonics-app/src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html`\n- **Frontend Component**: `vietphonics-app/src/components/articulation/SoundSaturationDrill.jsx`\n\n#### 🎨 Saturation Meter Tokens\n- **Saturation Bar Track**: `h-3 rounded-full bg-slate-800 overflow-hidden w-full max-w-md`.\n- **Saturation Bar Fill**: `bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 shadow-[0_0_12px_rgba(16,185,129,0.5)]`.\n\n#### 🗄️ Backend API Contract\n```http\nPOST /api/v1/scoring/saturation-sentence\nContent-Type: application/json\n\n{\n  \"sentenceId\": \"sat_dj_01\",\n  \"targetPhoneme\": \"/dʒ/\",\n  \"audioUrl\": \"https://r2.../dj_01.opus\"\n}\n```",
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
          "id": "ac-arch-101-ddl-structure",
          "given": "Hệ thống cần lưu trữ thông tin tài khoản, gói thuê bao và chi tiết từng âm vị được chấm điểm",
          "when": "Triển khai migration khởi tạo cơ sở dữ liệu",
          "then": "Lược đồ hoàn chỉnh gồm 8 bảng quan hệ có khóa ngoại ON DELETE CASCADE hợp lý, sử dụng kiểu dữ liệu tối ưu (UUIDv7 cho ID phân tán, JSONB cho metadata âm học, TIMESTAMPTZ cho thời gian theo chuẩn UTC).",
          "completed": true
        },
        {
          "id": "ac-arch-101-compound-indexes",
          "given": "Bảng điểm số phoneme_scores đạt quy mô hơn 10 triệu bản ghi",
          "when": "Thực hiện truy vấn lịch sử học tập của học viên",
          "then": "Các chỉ mục tổng hợp (Compound Indexes) trên (user_id, phoneme_symbol) và (user_id, created_at DESC) đảm bảo thời gian quét dữ liệu (Index Scan) hoàn tất dưới 15ms.",
          "completed": true
        },
        {
          "id": "ac-arch-101-pgbouncer-pooling",
          "given": "5,000 phiên truy cập đồng thời từ các máy khách Web và Mobile",
          "when": "Lưu lượng truy cập gửi đến máy chủ cơ sở dữ liệu",
          "then": "Cấu hình PgBouncer connection pooling trong Transaction Mode duy trì tối đa 50 kết nối vật lý đến PostgreSQL mà không làm tràn bộ nhớ RAM (CPU duy trì <40%).",
          "completed": true
        },
        {
          "id": "ac-arch-101-automated-partitioning",
          "given": "Dữ liệu âm vị phát sinh liên tục mỗi ngày",
          "when": "Chuyển sang tháng mới",
          "then": "Extension pg_partman tự động tạo partition mới cho bảng phoneme_scores theo từng tháng (Range Partitioning by created_at) mà không cần can thiệp thủ công.",
          "completed": false
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
          "title": "Triển khai phân vùng tự động cho bảng phoneme_scores theo từng tháng với pg_partman",
          "category": "Backend",
          "completed": false
        },
        {
          "id": "t-arch-101-be-pgbouncer",
          "title": "Cấu hình PgBouncer kết hợp Prisma/Kysely connection pool tối ưu cho 5,000 concurrent sessions",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-arch-101-qa",
          "title": "Chạy công cụ pgbench mô phỏng 5,000 client đồng thời kiểm tra TPS đạt tối thiểu 2,500 transaction/sec",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🗄️ PURE BACKEND & DATABASE SPECIFICATION\n- **Phân loại**: Pure Backend Data Architecture (0% UI)\n- **Engine**: PostgreSQL 16 + PgBouncer Connection Pooler\n\n#### 📐 Complete PostgreSQL 3NF DDL\n```sql\n-- 1. Users Table\nCREATE TABLE users (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  email VARCHAR(255) UNIQUE NOT NULL,\n  full_name VARCHAR(150),\n  dialect_preference VARCHAR(20) DEFAULT 'northern',\n  tier VARCHAR(20) DEFAULT 'free',\n  created_at TIMESTAMPTZ DEFAULT NOW(),\n  updated_at TIMESTAMPTZ DEFAULT NOW()\n);\n\n-- 2. Subscriptions Table\nCREATE TABLE subscriptions (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n  plan_code VARCHAR(50) NOT NULL,\n  status VARCHAR(30) NOT NULL CHECK (status IN ('active', 'grace_period', 'expired')),\n  current_period_start TIMESTAMPTZ NOT NULL,\n  current_period_end TIMESTAMPTZ NOT NULL,\n  created_at TIMESTAMPTZ DEFAULT NOW()\n);\nCREATE INDEX idx_subscriptions_user_status ON subscriptions(user_id, status);\n\n-- 3. Range-Partitioned Phoneme Scores Table\nCREATE TABLE phoneme_scores (\n  id BIGSERIAL,\n  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n  phoneme_symbol VARCHAR(10) NOT NULL,\n  score NUMERIC(5, 2) NOT NULL,\n  duration_ms INT NOT NULL,\n  audio_r2_url TEXT,\n  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),\n  PRIMARY KEY (id, created_at)\n) PARTITION BY RANGE (created_at);\n\n-- Partitions by Month\nCREATE TABLE phoneme_scores_2026_10 PARTITION OF phoneme_scores\n  FOR VALUES FROM ('2026-10-01 00:00:00+00') TO ('2026-11-01 00:00:00+00');\nCREATE TABLE phoneme_scores_2026_11 PARTITION OF phoneme_scores\n  FOR VALUES FROM ('2026-11-01 00:00:00+00') TO ('2026-12-01 00:00:00+00');\n\nCREATE INDEX idx_phoneme_scores_user_sym ON phoneme_scores(user_id, phoneme_symbol);\nCREATE INDEX idx_phoneme_scores_user_time ON phoneme_scores(user_id, created_at DESC);\n```\n\n#### ⚙️ PgBouncer Concurrency Config\n```ini\n[databases]\nvietphonics_db = host=127.0.0.1 port=5432 dbname=vietphonics_prod\n\n[pgbouncer]\npool_mode = transaction\nlisten_port = 6432\nmax_client_conn = 5000\ndefault_pool_size = 50\nreserve_pool_size = 10\nquery_timeout = 30\n```",
      "createdAt": "2026-10-02T12:11:09.502Z"
    },
    {
      "id": "ARCH-102",
      "epicId": "epic-backend-infrastructure",
      "title": "Asynchronous Audio Ingestion & GPU Worker Queue Pipeline (BullMQ + Redis + FFmpeg): Đường Ống Nạp Âm Thanh Bất Đồng Bộ & Hàng Đợi Worker GPU",
      "persona": "Kỹ sư Machine Learning và hạ tầng AI phụ trách xử lý hàng ngàn file ghi âm tiếng Anh của học viên mà không làm tắc nghẽn máy chủ",
      "action": "nhận luồng file âm thanh từ máy khách, đẩy vào hàng đợi BullMQ/Celery và phân bổ cho các worker GPU chạy Whisper/Kaldi trích xuất đặc trưng ngữ âm",
      "value": "ngăn chặn tình trạng treo máy chủ khi có lượng lớn người dùng cùng nộp bài ghi âm, đảm bảo thời gian xử lý và trả kết quả chấm điểm luôn dưới 650ms",
      "priority": "must",
      "status": "in-progress",
      "size": "XL",
      "points": 13,
      "acceptanceCriteria": [
        {
          "id": "ac-arch-102-fast-accept",
          "given": "Học viên nộp đoạn ghi âm giọng nói WebM/Opus hoặc WAV",
          "when": "API Ingestion POST /api/v1/audio/ingest tiếp nhận file",
          "then": "Kiểm tra magic bytes trong dưới 15ms, sinh jobId duy nhất, đẩy tác vụ vào Redis BullMQ và trả về mã HTTP 202 Accepted kèm URL tra cứu kết quả.",
          "completed": true
        },
        {
          "id": "ac-arch-102-ffmpeg-normalization",
          "given": "Audio thô từ các trình duyệt khác nhau có tần số lấy mẫu hỗn hợp (44.1kHz, 48kHz, Opus, WebM)",
          "when": "Worker FFmpeg tiếp nhận xử lý",
          "then": "Chuyển đổi tức thời sang chuẩn PCM 16kHz 16-bit mono và cắt lọc khoảng lặng đầu cuối (-50dB silence trimming) trước khi nạp vào GPU.",
          "completed": true
        },
        {
          "id": "ac-arch-102-gpu-autoscaling",
          "given": "Đợt cao điểm với lưu lượng 200 file âm thanh/giây",
          "when": "Độ sâu hàng đợi (Queue Depth) vượt quá 100 tác vụ",
          "then": "Cơ chế KEDA tự động mở rộng cụm GPU worker từ 2 lên tối đa 16 nodes, duy trì P95 thời gian chờ < 400ms.",
          "completed": false
        },
        {
          "id": "ac-arch-102-dead-letter-queue",
          "given": "Một file âm thanh bị lỗi hỏng định dạng dữ liệu",
          "when": "Worker gặp lỗi giải mã 3 lần liên tiếp với backoff exponential",
          "then": "Tự động chuyển job sang Dead Letter Queue (DLQ), bắn cảnh báo lỗi về hệ thống giám sát và trả thông báo lỗi thân thiện cho client.",
          "completed": false
        }
      ],
      "technicalTasks": [
        {
          "id": "t-arch-102-be-ingest",
          "title": "Xây dựng API Ingestion POST /api/v1/audio/ingest tiếp nhận multipart/form-data",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-arch-102-be-worker",
          "title": "Viết BullMQ worker thực thi lệnh FFmpeg chuẩn hóa PCM 16kHz mono",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-arch-102-be-keda",
          "title": "Thiết lập KEDA ScaledObject trên Kubernetes tự động mở rộng pods theo Redis queue length",
          "category": "DevOps/Scale",
          "completed": false
        },
        {
          "id": "t-arch-102-qa",
          "title": "Chạy stress-test 10,000 job liên tục đảm bảo không rò rỉ bộ nhớ (memory leak)",
          "category": "QA",
          "completed": false
        }
      ],
      "notes": "### 🗄️ PURE BACKEND & PIPELINE SPECIFICATION\n- **Phân loại**: Pure Backend & GPU Queue Worker Pipeline (0% UI)\n- **Components**: BullMQ + Redis Stream + FFmpeg + Triton GPU Workers\n\n#### ⚙️ BullMQ Job Architecture\n```javascript\nimport { Queue, Worker } from 'bullmq';\n\nexport const audioQueue = new Queue('audio-transcription-queue', {\n  connection: redisConnection,\n  defaultJobOptions: {\n    attempts: 3,\n    backoff: { type: 'exponential', delay: 1000 },\n    removeOnComplete: 1000,\n    removeOnFail: 5000\n  }\n});\n```\n\n#### 🎵 FFmpeg Normalization Pipeline\n```bash\nffmpeg -y -i input.webm -ac 1 -ar 16000 -c:a pcm_s16le   -af \"silenceremove=start_periods=1:start_duration=0.1:start_threshold=-50dB:detection=peak,areverse,silenceremove=start_periods=1:start_duration=0.1:start_threshold=-50dB:detection=peak,areverse\"   output_normalized.wav\n```",
      "createdAt": "2026-10-02T12:11:09.502Z"
    },
    {
      "id": "ARCH-103",
      "epicId": "epic-backend-infrastructure",
      "title": "Multi-Gateway Subscription Billing & Webhook Reconciliation: Xử Lý Webhook Thanh Toán Thuê Bao Bất Đồng Bộ & Chống Trùng Lặp",
      "persona": "Kỹ sư phụ trách cổng thanh toán đảm bảo tài khoản người dùng được nâng cấp Pro ngay lập tức khi tiền về tài khoản ngân hàng",
      "action": "tiếp nhận tín hiệu Webhook từ Napas/VietQR/MoMo, xác thực chữ ký số HMAC-SHA256, xử lý nâng cấp thuê bao với cơ chế Idempotency chống cộng trùng ngày",
      "value": "đảm bảo 100% không bao giờ xảy ra lỗi nâng cấp trùng lặp tài khoản hoặc thất thoát doanh thu, tự động kích hoạt gói Pro trong dưới 1 giây sau khi chuyển khoản",
      "priority": "must",
      "status": "todo",
      "size": "L",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-arch-103-hmac-verification",
          "given": "Tín hiệu Webhook từ cổng thanh toán VietQR Napas gửi tới",
          "when": "Endpoint POST /api/v1/billing/webhook/vietqr tiếp nhận",
          "then": "Xác thực chữ ký HMAC-SHA256 trong tiêu đề X-Signature với Secret Key; nếu chữ ký không khớp trả về ngay HTTP 401 Unauthorized.",
          "completed": false
        },
        {
          "id": "ac-arch-103-idempotency-key",
          "given": "Ngân hàng gửi lại Webhook nhiều lần do chập chờn mạng (Retry Webhooks)",
          "when": "Mã giao dịch transaction_id đã được xử lý trước đó",
          "then": "Hệ thống dùng Redis SETNX khóa idempotency key trong 86,400s; nhận diện trùng lặp và trả về ngay HTTP 200 OK mà không cộng trùng ngày hạn Pro.",
          "completed": false
        },
        {
          "id": "ac-arch-103-redlock-transaction",
          "given": "Giao dịch hợp lệ cần kích hoạt gói Pro",
          "when": "Hệ thống cập nhật bảng subscriptions",
          "then": "Thực thi giao dịch PostgreSQL trong khối Isolation Level READ COMMITTED kết hợp Redlock phân tán, đảm bảo tính toàn vẹn trạng thái thuê bao.",
          "completed": false
        },
        {
          "id": "ac-arch-103-cron-reconciliation",
          "given": "Các giao dịch treo chưa nhận được webhook do nghẽn mạng phía ngân hàng",
          "when": "Cron job đối soát chạy định kỳ 15 phút một lần",
          "then": "Tự động gọi API ngân hàng đối soát danh sách giao dịch Napas và tự động bù gạch nợ cho người dùng.",
          "completed": false
        }
      ],
      "technicalTasks": [
        {
          "id": "t-arch-103-be-hmac",
          "title": "Xây dựng middleware kiểm tra chữ ký số HMAC-SHA256 cho Webhook endpoint",
          "category": "Backend",
          "completed": false
        },
        {
          "id": "t-arch-103-be-idempotency",
          "title": "Triển khai cơ chế Idempotent Transaction với Redis SETNX và PostgreSQL transaction",
          "category": "Backend",
          "completed": false
        },
        {
          "id": "t-arch-103-be-reconcile",
          "title": "Thiết lập cron job đối soát thanh toán tự động chạy mỗi 15 phút",
          "category": "Backend",
          "completed": false
        },
        {
          "id": "t-arch-103-qa",
          "title": "Kiểm thử kịch bản bắn 50 request webhook trùng lặp đồng thời kiểm tra tài khoản chỉ được cộng hạn 1 lần duy nhất",
          "category": "QA",
          "completed": false
        }
      ],
      "notes": "### 🗄️ PURE BACKEND & BILLING SPECIFICATION\n- **Phân loại**: Pure Backend Payment Webhook Engine (0% UI)\n- **Security**: HMAC-SHA256 Signature Verification + Redis Distributed Locking\n\n#### ⚙️ Idempotent Webhook Handler\n```javascript\nexport async function handlePaymentWebhook(req, res) {\n  const signature = req.headers['x-signature'];\n  const rawBody = req.rawBody;\n  \n  if (!verifyHmacSha256(rawBody, signature, process.env.VIETQR_WEBHOOK_SECRET)) {\n    return res.status(401).json({ error: 'Invalid HMAC signature' });\n  }\n\n  const { transactionId, orderCode, amount } = req.body;\n  const lockKey = `idempotency:webhook:${transactionId}`;\n  \n  // Set NX with 24h TTL\n  const isNew = await redis.set(lockKey, '1', 'NX', 'EX', 86400);\n  if (!isNew) {\n    return res.status(200).json({ status: 'already_processed' });\n  }\n\n  await activateSubscriptionTransaction(orderCode, amount);\n  return res.status(200).json({ status: 'activated_success' });\n}\n```",
      "createdAt": "2026-10-02T12:11:09.502Z"
    },
    {
      "id": "ARCH-104",
      "epicId": "epic-backend-infrastructure",
      "title": "Tiered Quota Limiter & Entitlement Enforcement Middleware (Redis Sliding Window): Kiểm Soát Định Ngạch Theo Hạng Tài Khoản & Giới Hạn Tần Suất",
      "persona": "Kỹ sư bảo mật và kiến trúc sư hạ tầng phụ trách bảo vệ hệ thống khỏi nạn spam và lạm dụng API chấm điểm AI",
      "action": "triển khai middleware kiểm tra quyền hạn (Entitlement) và bộ giới hạn tần suất cửa sổ trượt (Sliding Window Rate Limiter) dựa trên Redis",
      "value": "chặn đứng các cuộc tấn công DDoS và hành vi lạm dụng token AI, đảm bảo người dùng trả phí Pro luôn được ưu tiên tài nguyên phục vụ cao nhất",
      "priority": "must",
      "status": "in-progress",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-arch-104-free-tier-enforcement",
          "given": "Học viên sở hữu tài khoản Free",
          "when": "Thực hiện bài học thứ 6 trong ngày",
          "then": "Middleware chặn lại, trả về mã HTTP 429 Too Many Requests kèm JSON chuẩn RFC-7807 giải thích định ngạch 5 bài/ngày đã hết.",
          "completed": true
        },
        {
          "id": "ac-arch-104-redis-sliding-window",
          "given": "Người dùng gửi liên tiếp các yêu cầu thu âm trong khoảng thời gian ngắn",
          "when": "Tần suất vượt quá 10 request / 60 giây",
          "then": "Thuật toán Sliding Window sử dụng Redis ZSET tự động chặn các request spam và trả về header Retry-After.",
          "completed": true
        },
        {
          "id": "ac-arch-104-pro-tier-bypass",
          "given": "Học viên có gói thuê bao Pro đang hoạt động",
          "when": "Thực hiện 50 bài học phát âm trong ngày",
          "then": "Middleware xác nhận quyền hạn Pro và cho phép truy cập không giới hạn với độ trễ kiểm tra dưới 2ms.",
          "completed": false
        },
        {
          "id": "ac-arch-104-midnight-reset",
          "given": "Định ngạch 5 bài học của tài khoản Free",
          "when": "Đồng hồ hệ thống điểm 00:00 UTC",
          "then": "Khóa Redis tự động hết hạn (TTL Expire) mà không cần chạy lệnh xóa database, nạp lại 5 lượt học miễn phí mới cho ngày tiếp theo.",
          "completed": false
        }
      ],
      "technicalTasks": [
        {
          "id": "t-arch-104-be-lua",
          "title": "Viết kịch bản Lua Script thực thi nguyên tử thuật toán Sliding Window Rate Limiter trên Redis",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-arch-104-be-mw",
          "title": "Xây dựng Express middleware checkQuotaAndEntitlements gắn vào toàn bộ route chấm điểm AI",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-arch-104-qa",
          "title": "Viết bài kiểm thử tự động bắn 20 request đồng thời kiểm tra độ chính xác của bộ đếm định ngạch",
          "category": "QA",
          "completed": false
        }
      ],
      "notes": "### 🗄️ PURE BACKEND & SECURITY SPECIFICATION\n- **Phân loại**: Pure Backend Middleware & Rate Limiter (0% UI)\n- **Algorithm**: Redis Sorted Set Sliding Window + Lua Script\n\n#### ⚙️ Redis Sliding Window Lua Script\n```lua\nlocal key = KEYS[1]\nlocal now = tonumber(ARGV[1])\nlocal window = tonumber(ARGV[2])\nlocal limit = tonumber(ARGV[3])\n\n-- Remove timestamps outside the sliding window\nredis.call('ZREMRANGEBYSCORE', key, 0, now - window)\n\nlocal current_count = redis.call('ZCARD', key)\nif current_count < limit then\n  redis.call('ZADD', key, now, now)\n  redis.call('EXPIRE', key, window)\n  return 1\nelse\n  return 0\nend\n```",
      "createdAt": "2026-10-02T12:11:09.502Z"
    },
    {
      "id": "ARCH-105",
      "epicId": "epic-backend-infrastructure",
      "title": "Cloud Object Storage & Ephemeral Audio Retention Lifecycle (Cloudflare R2): Lưu Trữ File Âm Thanh Trên Đám Mây & Vòng Đời Tự Động Xóa Dữ Liệu Tạm",
      "persona": "Kỹ sư DevOps chịu trách nhiệm tối ưu chi phí lưu trữ đám mây và bảo vệ quyền riêng tư dữ liệu giọng nói của học viên",
      "action": "cấu hình lưu trữ đám mây Cloudflare R2 tương thích S3, cấp Presigned Upload URLs để máy khách tải file trực tiếp, và thiết lập vòng đời tự động xóa file rác",
      "value": "giảm 100% chi phí băng thông tải ra (Zero Egress Fees), tiết kiệm 80% chi phí lưu trữ đĩa cứng và tuân thủ tiêu chuẩn bảo vệ quyền riêng tư người dùng",
      "priority": "must",
      "status": "in-progress",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-arch-105-presigned-url",
          "given": "Máy khách chuẩn bị ghi âm giọng nói",
          "when": "Gọi API GET /api/v1/storage/upload-ticket",
          "then": "Hệ thống sinh S3 Presigned URL có thời hạn 5 phút với định danh ngẫu nhiên UUIDv7 trong vòng dưới 20ms.",
          "completed": true
        },
        {
          "id": "ac-arch-105-direct-client-upload",
          "given": "Máy khách nhận được Presigned URL",
          "when": "Học viên ghi âm xong và tải file Opus lên Cloudflare R2",
          "then": "Luồng dữ liệu nhị phân truyền thẳng từ trình duyệt lên R2 mà không đi qua máy chủ backend, tiết kiệm 100% băng thông máy chủ.",
          "completed": true
        },
        {
          "id": "ac-arch-105-ephemeral-auto-purge",
          "given": "Hàng triệu file ghi âm luyện tập ngắn tích lũy trên R2",
          "when": "File đạt tuổi thọ quá 7 ngày đối với gói Free (hoặc 90 ngày đối với gói Pro)",
          "then": "Quy tắc R2 Bucket Lifecycle Rules tự động thanh trừng các file quá hạn mà không tốn tài nguyên CPU máy chủ.",
          "completed": true
        },
        {
          "id": "ac-arch-105-cors-security",
          "given": "Yêu cầu tải file từ một tên miền lạ không thuộc hệ thống",
          "when": "Gửi request lên R2 bucket",
          "then": "Chính sách CORS chặn đứng và từ chối truy cập, chỉ cho phép nguồn gốc xuất phát từ *.vietphonics.com.",
          "completed": false
        }
      ],
      "technicalTasks": [
        {
          "id": "t-arch-105-be-s3",
          "title": "Tích hợp AWS SDK v3 S3Client kết nối với Cloudflare R2 endpoint",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-arch-105-be-presign",
          "title": "Xây dựng API GET /api/v1/storage/upload-ticket sinh presigned PUT URL",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-arch-105-be-lifecycle",
          "title": "Cấu hình XML Lifecycle Rules trên bucket R2 cho chính sách xóa 7 ngày và 90 ngày",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-arch-105-qa",
          "title": "Kiểm thử tải lên file trực tiếp từ trình duyệt Safari iOS và Chrome Android",
          "category": "QA",
          "completed": false
        }
      ],
      "notes": "### 🗄️ PURE BACKEND & CLOUD DEVOPS SPECIFICATION\n- **Phân loại**: Pure Backend Cloud Storage & S3 Lifecycle (0% UI)\n- **Provider**: Cloudflare R2 (S3 Compatible - Zero Egress Fees)\n\n#### ⚙️ S3 Presigned URL Generator\n```javascript\nimport { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';\nimport { getSignedUrl } from '@aws-sdk/s3-request-presigner';\n\nconst r2 = new S3Client({\n  region: 'auto',\n  endpoint: `https://${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,\n  credentials: {\n    accessKeyId: process.env.R2_ACCESS_KEY_ID,\n    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY\n  }\n});\n\nexport async function createAudioUploadTicket(userId, extension = 'opus') {\n  const key = `audio/${userId}/${crypto.randomUUID()}.${extension}`;\n  const command = new PutObjectCommand({\n    Bucket: 'vietphonics-audio-prod',\n    Key: key,\n    ContentType: 'audio/opus'\n  });\n  const presignedUrl = await getSignedUrl(r2, command, { expiresIn: 300 });\n  return { key, presignedUrl };\n}\n```",
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
      "title": "Dynamic VietQR Auto-Reconciliation Engine: Thuê Bao VietQR Napas Tự Động Gạch Nợ",
      "persona": "Học viên Việt Nam muốn nâng cấp tài khoản Pro qua ứng dụng ngân hàng di động mà không cần thẻ tín dụng quốc tế Visa/Mastercard",
      "action": "quét mã VietQR động được tạo riêng cho đơn hàng và chuyển tiền qua ứng dụng ngân hàng (BIDV, Vietcombank, Techcombank, MB, Momo)",
      "value": "kích hoạt gói Pro tự động tức thì trong vòng 2 giây sau khi chuyển khoản, loại bỏ hoàn toàn việc phải chụp ảnh biên lai gửi admin xác nhận thủ công",
      "priority": "must",
      "status": "done",
      "size": "L",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-pay-101-emvco-qr-generation",
          "given": "Học viên chọn gói Pro 1 Tháng hoặc Pro 1 Năm",
          "when": "Hộp thoại thanh toán hiển thị",
          "then": "Hệ thống sinh mã VietQR chuẩn EMVCo chứa sẵn số tài khoản, mã ngân hàng (BIN), số tiền chính xác và cú pháp chuyển khoản duy nhất \"VP {userId} {planCode}\".",
          "completed": true
        },
        {
          "id": "ac-pay-101-realtime-polling-activation",
          "given": "Học viên đang mở màn hình chờ thanh toán",
          "when": "Giao dịch ngân hàng thành công",
          "then": "Màn hình tự động chuyển sang trạng thái \"Đã Kích Hoạt Gói Pro!\" kèm hiệu ứng pháo hoa chúc mừng trong dưới 2 giây mà không cần bấm nút F5.",
          "completed": true
        },
        {
          "id": "ac-pay-101-one-click-copy",
          "given": "Học viên chuyển khoản thủ công không quét mã QR",
          "when": "Bấm nút sao chép bên cạnh Số Tài Khoản hoặc Cú Pháp Chuyển Khoản",
          "then": "Dữ liệu được sao chép vào bộ nhớ đệm Clipboard kèm thông báo Toast \"Đã sao chép thành công!\".",
          "completed": true
        },
        {
          "id": "ac-pay-101-qr-timeout-countdown",
          "given": "Mã QR thanh toán có thời hạn hiệu lực",
          "when": "Đồng hồ đếm ngược 15:00 phút chạy hết giờ",
          "then": "Mã QR mờ đi kèm thông báo \"Mã thanh toán đã hết hạn\" và nút \"Tạo mã QR mới\".",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pay-101-fe-modal",
          "title": "Xây dựng component VietQrCheckoutModal.jsx với mã QR động và đồng hồ đếm ngược 15 phút",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pay-101-fe-poll",
          "title": "Thiết lập polling trạng thái thanh toán hoặc lắng nghe WebSocket sự kiện payment_received",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pay-101-be-emvco",
          "title": "Viết module sinh chuỗi ký tự VietQR EMVCo CRC16 chuẩn Napas 24/7",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-pay-101-qa",
          "title": "Kiểm thử thanh toán thực tế với 3 app ngân hàng phổ biến (Vietcombank, MB Bank, Techcombank)",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎯 FULLSTACK FEATURE SPECIFICATION\n- **Phân loại**: Full-stack VietQR Napas Payment Integration\n- **UI Mockup**: `vietphonics-app/src/ui-reference/ng_n_h_ng_t_l_i_n_ng_c_p_pro_light_mode/code.html`\n- **Frontend Component**: `vietphonics-app/src/components/payment/VietQrCheckoutModal.jsx`\n\n#### 🎨 VietQR Modal Layout\n```\n+-------------------------------------------------------------+\n| NÂNG CẤP PRO: GÓI 1 NĂM (TIẾT KIỆM 40%)                     |\n| Số tiền: 599.000 VNĐ                 [ ⏱️ Hết hạn: 14:32 ]  |\n+-------------------------------------------------------------+\n|             [ MÃ VIETQR ĐỘNG CHUẨN NAPAS ]                 |\n|             (Mở app ngân hàng bất kỳ để quét)              |\n+-------------------------------------------------------------+\n| Ngân hàng: MB Bank (Quân Đội)        [ Sao chép ]           |\n| Số tài khoản: 0988 123 456           [ Sao chép ]           |\n| Nội dung: VP 88291 PRO1Y             [ Sao chép ]           |\n+-------------------------------------------------------------+\n| [🔴 Đang chờ ngân hàng xác nhận giao dịch tự động...]       |\n+-------------------------------------------------------------+\n```",
      "createdAt": "2026-10-03T08:34:10.829Z"
    },
    {
      "id": "PAY-102",
      "epicId": "epic-backend-infrastructure",
      "title": "Frictionless 1-Scan Checkout Modal & Real-Time Activation: Giao Diện Quét Mã Thanh Toán Không Ma Sát",
      "persona": "Người dùng muốn trải nghiệm mua hàng nhanh chóng, không muốn điền form thông tin thanh toán rườm rà",
      "action": "mở modal thanh toán 1 chạm, quét mã và nhận tài khoản Pro ngay lập tức",
      "value": "tối đa hóa tỷ lệ chuyển đổi đơn hàng (Checkout Conversion Rate), mang lại trải nghiệm mua sắm hiện đại bậc nhất",
      "priority": "must",
      "status": "done",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-pay-102-responsive-modal",
          "given": "Học viên bấm nâng cấp tài khoản Pro",
          "when": "Hộp thoại mở ra",
          "then": "Modal thanh toán hiển thị sắc nét, căn giữa hoàn hảo trên cả desktop và mobile, nền mờ backdrop-blur-md sang trọng.",
          "completed": true
        },
        {
          "id": "ac-pay-102-mobile-deeplink",
          "given": "Học viên truy cập bằng điện thoại di động",
          "when": "Không thể dùng điện thoại này quét mã QR trên chính màn hình của nó",
          "then": "Hiển thị nút \"Mở Ứng Dụng Ngân Hàng (App Intent Deep Link)\" cho phép mở trực tiếp app ngân hàng để chuyển tiền tự động.",
          "completed": true
        },
        {
          "id": "ac-pay-102-success-animation",
          "given": "Giao dịch được ghi nhận",
          "when": "Modal chuyển trạng thái",
          "then": "Hiển thị hoạt ảnh dấu tick xanh Emerald nảy lên kèm chữ \"Kích hoạt Pro thành công!\", tự động đóng modal sau 3 giây.",
          "completed": true
        },
        {
          "id": "ac-pay-102-support-hotline-button",
          "given": "Học viên cần hỗ trợ về giao dịch",
          "when": "Xem chân trang modal",
          "then": "Nút \"Hỗ trợ Zalo 24/7\" mở ngay kênh hỗ trợ viên với mã đơn hàng được sao chép sẵn.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pay-102-fe-deeplink",
          "title": "Tích hợp liên kết Deep Link mở các app ngân hàng Việt Nam trên mobile",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pay-102-fe-animation",
          "title": "Thiết kế hiệu ứng thành công Success Confetti Animation",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pay-102-fe-copy",
          "title": "Tích hợp Clipboard API với thông báo phản hồi trực quan",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pay-102-qa",
          "title": "Kiểm tra độ tương thích trên các trình duyệt in-app browser như Zalo, Facebook Messenger",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 PURE FRONTEND DESIGN SPECIFICATION\n- **Phân loại**: Pure Frontend Checkout Modal & Mobile Deeplinks\n- **UI Mockup**: `vietphonics-app/src/ui-reference/ng_n_h_ng_t_l_i_n_ng_c_p_pro_light_mode/code.html`\n- **Frontend Component**: `vietphonics-app/src/components/payment/VietQrCheckoutModal.jsx`\n\n#### 🎨 Checkout Modal Tokens\n- **Modal Frame**: `bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl max-w-md w-full mx-auto`.\n- **QR Box**: `bg-white p-4 rounded-2xl shadow-inner flex items-center justify-center`.\n- **Deeplink Button**: `w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm flex items-center justify-center gap-2`.",
      "createdAt": "2026-10-03T08:34:10.829Z"
    },
    {
      "id": "PAY-103",
      "epicId": "epic-backend-infrastructure",
      "title": "Multi-Cycle Pricing & Retention Strategy (Chiến Lược Giá Đa Chu Kỳ: Tháng, Quý, Năm)",
      "persona": "Người học có nhu cầu tài chính và cam kết học tập khác nhau (học thử 1 tháng hoặc cam kết ôn thi 1 năm)",
      "action": "chọn chu kỳ thanh toán linh hoạt (1 Tháng, 3 Tháng, 1 Năm) trên bảng giá và thấy rõ mức tiền tiết kiệm",
      "value": "minh bạch về chi phí, tối ưu hóa giá trị đầu tư cho người học (chỉ 3.000đ/ngày đối với gói năm)",
      "priority": "should",
      "status": "done",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-pay-103-cycle-toggle",
          "given": "Học viên xem bảng giá dịch vụ",
          "when": "Gạt thanh chuyển đổi \"Thanh toán theo năm (Tiết kiệm 40%)\"",
          "then": "Giá hiển thị của tất cả các gói tự động cập nhật lại mức giá tương ứng kèm số tiền tiết kiệm được bôi đậm nổi bật.",
          "completed": true
        },
        {
          "id": "ac-pay-103-popular-badge",
          "given": "Gói Pro 1 Năm là gói có giá trị kinh tế tốt nhất",
          "when": "Bảng giá hiển thị",
          "then": "Gói 1 Năm được bao bọc bởi viền phát sáng màu vàng hổ phách, gắn huy hiệu \"Gói Phổ Biến Nhất\" và phóng to nổi bật hơn 10% so với các gói khác.",
          "completed": true
        },
        {
          "id": "ac-pay-103-feature-comparison-table",
          "given": "Học viên muốn so sánh quyền lợi giữa tài khoản Free và Pro",
          "when": "Cuộn xuống phần bảng so sánh tính năng",
          "then": "Hiển thị bảng chi tiết các tính năng: Luyện âm 44 âm, AI Roleplay Alex, Báo cáo IELTS, Lưu trữ Error Bank với các dấu tick xanh rõ ràng.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pay-103-fe-matrix",
          "title": "Xây dựng component PricingMatrix.jsx với thanh gạt chu kỳ thanh toán linh hoạt",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pay-103-fe-table",
          "title": "Thiết kế bảng so sánh tính năng FeatureComparisonTable theo chuẩn thiết kế Stripe",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pay-103-qa",
          "title": "Kiểm tra hiển thị chính xác các con số quy đổi ra chi phí mỗi ngày (3.000đ/ngày)",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 PURE FRONTEND DESIGN SPECIFICATION\n- **Phân loại**: Pure Frontend Pricing Matrix Component\n- **UI Mockup**: `vietphonics-app/src/ui-reference/ng_n_h_ng_t_l_i_n_ng_c_p_pro_light_mode/code.html`\n- **Frontend Component**: `vietphonics-app/src/components/pricing/PricingMatrix.jsx`\n\n#### 🎨 Pricing Matrix Layout\n```\n+-------------------------------------------------------------+\n| BẢNG GIÁ NÂNG CẤP PRO:     [ Gạt sang: Trả Theo Năm (-40%) ]|\n+-------------------------------------------------------------+\n| [GÓI 1 THÁNG]         | [GÓI 1 NĂM (PHỔ BIẾN NHẤT)] ⭐      |\n| 149.000đ / tháng      | 599.000đ / năm (~49.000đ/tháng)    |\n| Phù hợp ôn thi cấp tốc| Chỉ 1.600đ/ngày - Tiết kiệm 40%    |\n| [Chọn Gói 1 Tháng]    | [👉 NÂNG CẤP 1 NĂM NGAY]           |\n+-------------------------------------------------------------+\n```",
      "createdAt": "2026-10-03T08:34:10.829Z"
    },
    {
      "id": "PAY-104",
      "epicId": "epic-backend-infrastructure",
      "title": "Automated Grace Period & Expiring Subscription Reminders: Cơ Chế Gia Hạn Ân Hạn & Nhắc Nhở Hết Hạn Tự Động",
      "persona": "Kỹ sư quản lý thuê bao đảm bảo học viên không bị cắt dịch vụ đột ngột khi gói cước hết hạn",
      "action": "kích hoạt thời gian ân hạn 3 ngày (3-Day Grace Period) khi gói cước hết hạn và gửi thông báo nhắc nhở tự động kèm ưu đãi gia hạn",
      "value": "giảm tỷ lệ hủy thuê bao (Churn Rate), duy trì trải nghiệm liên tục cho học viên và tối ưu hóa tỷ lệ gia hạn định kỳ",
      "priority": "should",
      "status": "todo",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-pay-104-expiring-cron",
          "given": "Gói thuê bao Pro của học viên còn 3 ngày nữa là hết hạn",
          "when": "Cron job chạy lúc 08:00 sáng hàng ngày",
          "then": "Hệ thống tự động kích hoạt thông báo nhắc nhở qua Email / In-App Notification với liên kết gia hạn nhanh giảm giá 10%.",
          "completed": false
        },
        {
          "id": "ac-pay-104-grace-period-activation",
          "given": "Gói cước đã chạm mốc thời gian hết hạn current_period_end",
          "when": "Trạng thái thuê bao chuyển đổi",
          "then": "Chuyển trạng thái sang \"grace_period\" trong 3 ngày tiếp theo, học viên vẫn được giữ nguyên toàn bộ quyền lợi Pro.",
          "completed": false
        },
        {
          "id": "ac-pay-104-grace-period-expiry",
          "given": "Thời gian ân hạn 3 ngày kết thúc mà học viên chưa thanh toán gia hạn",
          "when": "Cron job rà soát lúc nửa đêm",
          "then": "Tự động hạ cấp tài khoản về gói Free an toàn, lưu lại toàn bộ dữ liệu lịch sử học tập và Error Bank vào trạng thái đóng băng.",
          "completed": false
        },
        {
          "id": "ac-pay-104-audit-logging",
          "given": "Bất kỳ hành động thay đổi trạng thái thuê bao nào diễn ra",
          "when": "Giao dịch hoàn tất",
          "then": "Ghi log chi tiết vào bảng subscription_audit_logs phục vụ đối soát tài chính và chăm sóc khách hàng.",
          "completed": false
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pay-104-be-cron",
          "title": "Thiết lập BullMQ cron job kiểm tra các thuê bao sắp hết hạn và hết hạn",
          "category": "Backend",
          "completed": false
        },
        {
          "id": "t-pay-104-be-state",
          "title": "Xây dựng State Machine chuyển đổi trạng thái thuê bao: active -> grace_period -> expired",
          "category": "Backend",
          "completed": false
        },
        {
          "id": "t-pay-104-be-audit",
          "title": "Tạo bảng subscription_audit_logs lưu vết toàn bộ lịch sử chuyển đổi gói",
          "category": "Backend",
          "completed": false
        },
        {
          "id": "t-pay-104-qa",
          "title": "Kiểm thử kịch bản giả lập thời gian trôi qua 3 ngày xem tài khoản có hạ cấp chính xác",
          "category": "QA",
          "completed": false
        }
      ],
      "notes": "### 🗄️ PURE BACKEND & CRON SPECIFICATION\n- **Phân loại**: Pure Backend Subscription State Machine & Cron (0% UI)\n- **Engine**: BullMQ Cron + PostgreSQL State Machine\n\n#### ⚙️ Subscription State Transitions\n```\n[ACTIVE] --- (hết hạn period_end) ---> [GRACE_PERIOD (3 ngày)]\n                                               |\n      +----------------------------------------+\n      | (chưa thanh toán sau 3 ngày)           | (thanh toán thành công)\n      v                                        v\n  [EXPIRED (Hạ về Free)]                   [ACTIVE (Gia hạn mới)]\n```\n\n#### 🗄️ Database Audit Log DDL\n```sql\nCREATE TABLE subscription_audit_logs (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  subscription_id UUID NOT NULL REFERENCES subscriptions(id) ON DELETE CASCADE,\n  old_status VARCHAR(30) NOT NULL,\n  new_status VARCHAR(30) NOT NULL,\n  reason VARCHAR(100) NOT NULL,\n  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\n);\n```",
      "createdAt": "2026-10-03T08:34:10.829Z"
    }
  ]
};
