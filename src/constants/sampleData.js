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
      "title": "Web Audio API Low-Latency In-Browser Audio Streaming Engine: Khung Thu Âm 16kHz & Đo Sóng Âm Real-Time",
      "persona": "Kỹ sư âm thanh & Lập trình viên học tiếng Anh cần một môi trường thu âm chính xác, không độ trễ",
      "action": "nhấn nút mic hoặc nhấn phím Cách (Space) để kích hoạt luồng thu âm ngay trên trình duyệt",
      "value": "luồng âm thanh được số hóa chuẩn 16kHz mono PCM 24-bit với bộ phân tích tần số AnalyserNode FFT 2048, hiển thị sóng âm sống động tức thì trong 50ms mà không bị trễ mạng",
      "priority": "must",
      "status": "in-progress",
      "size": "L",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-pron-101-latency",
          "given": "Học viên nhấn phím Space hoặc bấm nút biểu tượng Microphone",
          "when": "Trình duyệt được cấp quyền truy cập mic",
          "then": "AudioContext khởi tạo ngay lập tức, lấy mẫu chính xác 16,000 Hz mono PCM, 28 thanh equalizer sóng âm phản hồi dao động trong vòng dưới 50ms.",
          "completed": true
        },
        {
          "id": "ac-pron-101-ui",
          "given": "Giao diện phòng thu âm PracticeStudioView",
          "when": "Người dùng đang thu âm",
          "then": "Nút mic chuyển sang hiệu ứng vòng sáng lan tỏa màu đỏ (pulsing ring-4 ring-rose-200), 28 thanh equalizer hiển thị dải tần số từ 50Hz đến 8000Hz với màu Sky #0284c7 và Rose #e11d48, nhãn trạng thái \"16kHz Calibrated Telemetry\" nhấp nháy sinh động.",
          "completed": true
        },
        {
          "id": "ac-pron-101-scale-5000",
          "given": "5,000 học viên đồng thời nhấn mic thu âm trong giờ cao điểm",
          "when": "Thu thập mẫu âm thanh",
          "then": "Quá trình lấy mẫu, nén buffer Float32Array và trích xuất đặc trưng RMS năng lượng diễn ra 100% trong luồng AudioWorklet / WebAssembly trên thiết bị client; không truyền luồng âm thanh liên tục về máy chủ, băng thông backend tiêu hao = 0 Mbps trong suốt quá trình người dùng nói.",
          "completed": true
        },
        {
          "id": "ac-pron-101-resilience",
          "given": "Trình duyệt bị từ chối quyền microphone hoặc người dùng ở phòng yên tĩnh",
          "when": "Học viên vẫn muốn kiểm tra hệ thống",
          "then": "Hệ thống tự động kích hoạt chế độ \"Mô Phỏng Ảo (Simulated Voice DSP)\" tạo luồng sóng âm sinh học giả lập, đảm bảo người dùng vẫn trải nghiệm đầy đủ giao diện và tính năng học tập.",
          "completed": true
        },
        {
          "id": "ac-pron-101-a11y",
          "given": "Học viên điều khiển bằng bàn phím",
          "when": "Nhấn phím Space ở bất kỳ vị trí nào trên trang (trừ khi đang gõ vào input)",
          "then": "Hệ thống bật/tắt thu âm chuẩn xác mà không cuộn trang xuống, có âm thanh beep nhẹ báo hiệu bắt đầu/kết thúc thu âm.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pron-101-hook",
          "title": "Hoàn thiện React hook useRecorder.js với AudioContext, createAnalyser() và downsampling 16kHz",
          "category": "Audio/DSP",
          "completed": true
        },
        {
          "id": "t-pron-101-canvas",
          "title": "Xây dựng visualizer 28 cột equalizer mượt mà 60 FPS bằng requestAnimationFrame",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-101-spacebar",
          "title": "Tích hợp sự kiện window.addEventListener(\"keydown\") bắt phím Space toàn cục",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-101-scale",
          "title": "Kiểm tra giải phóng bộ nhớ audioContext.close() và URL.revokeObjectURL() ngăn rò rỉ RAM khi thu nhiều lần",
          "category": "Performance",
          "completed": true
        },
        {
          "id": "t-pron-101-fallback",
          "title": "Xây dựng bộ tạo tín hiệu dao động nhân tạo oscillator fallback khi không có mic vật lý",
          "category": "Audio/DSP",
          "completed": true
        }
      ],
      "notes": "### 🎨 UI/UX Design Specifications\n- **Màn hình tham chiếu**: `src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html`\n- **React Component**: `vietphonics-app/src/views/PracticeStudioView.jsx` & `src/lib/audio/useRecorder.js`\n- **Design Tokens**: `space-md, rounded-xl, 28 equalizer bars with dynamic height`\n- **Microphone HUD**: Nút tròn lớn 80px bo tròn, chuyển đổi trạng thái mượt mà giữa màu Slate (nghỉ) và Rose (đang thu).\n\n### ⚡ Khả Năng Xử Lý Đồng Thời 5,000 Users\n- **Edge DSP Architecture**: Bằng cách tính toán FFT và năng lượng âm thanh ngay trên AudioWorklet của trình duyệt học viên, máy chủ trung tâm không phải chịu tải phân tích phổ của 5,000 luồng micro, giúp nền tảng mở rộng không giới hạn với chi phí hạ tầng tối thiểu.",
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
          "id": "ac-pron-201-sliders",
          "given": "3 thanh trượt điều chỉnh sinh học: Độ nâng lưỡi (Tongue Elevation), Độ hạ hàm (Jaw Drop), Áp lực hơi (Airflow Pressure)",
          "when": "Học viên kéo các thanh slider",
          "then": "Khối cơ lưỡi và xương hàm dưới trên đồ họa SVG dịch chuyển tức thời theo thời gian thực (real-time SVG coordinate transform), không bị giật lag.",
          "completed": true
        },
        {
          "id": "ac-pron-201-ui",
          "given": "Màn hình MouthAnatomyView",
          "when": "Render trên trình duyệt",
          "then": "Áp dụng thiết kế chuẩn Stitch: các dải lưới tọa độ giải phẫu mờ nhạt, nhãn chú thích các bộ phận (Răng trên, Nướu, Lưỡi, Thanh hầu) bằng font-mono sắc nét, phối màu sinh học y khoa hiện đại.",
          "completed": true
        },
        {
          "id": "ac-pron-201-scale-5000",
          "given": "5,000 học viên cùng lúc tương tác với mô hình giải phẫu 2D",
          "when": "Kéo thanh trượt điều chỉnh liên tục",
          "then": "Toàn bộ việc tính toán tọa độ Bézier và di chuyển SVG diễn ra trên GPU client qua CSS transforms; 0% tiêu thụ tài nguyên máy chủ.",
          "completed": true
        },
        {
          "id": "ac-pron-201-a11y",
          "given": "Người dùng sử dụng bàn phím",
          "when": "Tab vào các thanh slider",
          "then": "Hỗ trợ phím mũi tên trái/phải để tăng giảm giá trị từng nấc 1 đơn vị, có thuộc tính aria-valuenow, aria-valuemin, aria-valuemax rõ ràng.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pron-201-svg",
          "title": "Thiết kế đồ họa SVG giải phẫu cắt dọc 2D Sagittal view 760x500 với các đường cong Bézier động",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-201-sliders",
          "title": "Tích hợp 3 thanh trượt điều khiển: tongueElev, jawDrop, airPressure đồng bộ tọa độ SVG",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-201-phonemes",
          "title": "Xây dựng danh mục dữ liệu cấu âm cho các âm khó: /θ/, /ð/, /ʃ/, /ʒ/, /tʃ/, /dʒ/",
          "category": "Phonetics",
          "completed": true
        },
        {
          "id": "t-pron-201-scale",
          "title": "Tối ưu hóa hiệu năng render SVG 60 FPS trên màn hình điện thoại tầm trung",
          "category": "Performance",
          "completed": true
        },
        {
          "id": "t-pron-201-qa",
          "title": "Kiểm tra tính chính xác về mặt giải phẫu cơ miệng theo tài liệu ngữ âm học đại học Oxford",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 UI/UX Design Specifications\n- **Màn hình tham chiếu**: `src/ui-reference/kh_u_h_nh_2d_gi_i_ph_u_c_mi_ng_light_mode/code.html`\n- **React Component**: `vietphonics-app/src/views/MouthAnatomyView.jsx`\n- **SVG Anatomical Palette**: \n  - Muscle Gradient: `linearGradient #fb7185 -> #be123c`\n  - Airflow Cyan: `linearGradient #38bdf8 -> #0369a1`\n  - Bone & Teeth: `#ffffff border #94a3b8`",
      "createdAt": "2026-09-30T17:08:15.377Z"
    },
    {
      "id": "ELSA-103",
      "epicId": "epic-diagnostic",
      "title": "Predicted IELTS & CEFR Speaking Band Estimator: Bảng Quy Đổi Trình Độ Quốc Tế Thời Gian Thực",
      "persona": "Thí sinh luyện thi IELTS và người đi làm cần chứng minh năng lực tiếng Anh chuẩn quốc tế",
      "action": "hoàn thành bài kiểm tra chẩn đoán hoặc các bài luyện tập hàng ngày",
      "value": "nhận bảng điểm ước tính chính xác theo thang CEFR (A1 đến C2) và IELTS Speaking Band (4.0 đến 8.5) kèm phân tích điểm mạnh yếu để xây dựng lộ trình ôn luyện rõ ràng",
      "priority": "must",
      "status": "in-progress",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-elsa-103-func",
          "given": "Học viên hoàn thành bài kiểm tra phát âm với điểm số GOP tổng thể (ví dụ: 76%)",
          "when": "Hệ thống tính toán thuật toán quy đổi chuẩn âm học",
          "then": "Hiển thị chính xác tương đương: IELTS Speaking Band 7.0, CEFR B2+, TOEIC Speaking 160 kèm biểu đồ so sánh với mức trung bình người học Việt Nam.",
          "completed": true
        },
        {
          "id": "ac-elsa-103-ui",
          "given": "Màn hình hiển thị bảng quy đổi trong modal hoặc dashboard",
          "when": "Người dùng xem kết quả",
          "then": "Hiển thị 3 thẻ điểm bento grid với gradient màu sắc sang trọng: IELTS Sky #0284c7, CEFR Rose #e11d48, TOEIC Indigo #6366f1; số điểm in đậm font size 32px font-sans black, nhãn mô tả rõ ràng, không có hiện tượng giật layout.",
          "completed": true
        },
        {
          "id": "ac-elsa-103-scale-5000",
          "given": "5,000 học viên đồng thời hoàn tất bài tập và yêu cầu tính toán quy đổi trình độ",
          "when": "Hệ thống xử lý bảng điểm",
          "then": "Thuật toán tính điểm quy đổi được thực thi thuần túy trên client JavaScript (O(1) logic mapping) dựa trên ma trận CEFR chuẩn lưu trong bộ nhớ; không phát sinh lời gọi tính toán đắt đỏ về GPU backend.",
          "completed": true
        },
        {
          "id": "ac-elsa-103-l1",
          "given": "Học viên đạt Band 6.0 do lỗi phát âm phụ âm xát kẹp lưỡi /θ/-/ð/",
          "when": "Hệ thống phân tích điểm trừ",
          "then": "Hiển thị giải thích chuyên sâu chuẩn IELTS Pronunciation Descriptors: \"Một số lỗi âm vị cá lẻ (isolated phonemic inaccuracies) làm giảm độ lưu loát; khắc phục /θ/ sẽ nâng band lên 7.0+\".",
          "completed": true
        },
        {
          "id": "ac-elsa-103-a11y",
          "given": "Học viên xem bảng điểm trên trình duyệt",
          "when": "Sử dụng phím Tab",
          "then": "Các thẻ điểm có thuộc tính aria-label mô tả đầy đủ: \"Điểm IELTS ước tính: Band 7.0, Trình độ CEFR: B2 Cao cấp\".",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-elsa-103-fe",
          "title": "Thiết kế 3 thẻ Bento Grid hiển thị IELTS/CEFR/TOEIC trong DiagnosticModal và DashboardView",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-103-algo",
          "title": "Xây dựng module hàm computeStandardBands(gopScore) chuẩn hóa theo IELTS Descriptors",
          "category": "Algorithm",
          "completed": true
        },
        {
          "id": "t-elsa-103-be",
          "title": "Tạo bảng điểm lịch sử user_score_snapshots trong SQLite/PostgreSQL có đánh index created_at",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-elsa-103-scale",
          "title": "Tối ưu hóa phản hồi tức thời dưới 5ms trên client, benchmark không nghẽn CPU",
          "category": "Performance",
          "completed": true
        },
        {
          "id": "t-elsa-103-qa",
          "title": "Kiểm thử ma trận biên từ 0% GOP (Band 3.0) đến 100% GOP (Band 9.0)",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 UI/UX Design Specifications\n- **Màn hình tham chiếu**: `src/ui-reference/b_ng_ch_n_o_n_m_l1_ti_ng_vi_t_light_mode/code.html`\n- **React Component**: `vietphonics-app/src/components/DiagnosticModal.jsx` & `src/views/ProgressAnalyticsView.jsx`\n- **Bento Grid Layout**: 3 cột cân đối trên màn hình lớn, tự động co giãn 1 cột trên điện thoại di động.\n\n### ⚡ Khả Năng Chịu Tải 5,000 Users Đồng Thời\n- **Zero Backend Compute**: Việc tính toán quy đổi điểm hoàn toàn diễn ra phía Frontend Client thông qua bảng tra cứu tĩnh chuẩn hóa (Static Normalized Matrix Lookup).\n- **Snapshot Storage**: Dữ liệu lịch sử chỉ được ghi nhận một lần duy nhất khi kết thúc phiên thi để giảm tải I/O ghi cơ sở dữ liệu.",
      "createdAt": "2026-09-30T17:26:08.290Z"
    },
    {
      "id": "ELSA-201",
      "epicId": "epic-ending-sounds",
      "title": "Real-Time Phoneme Error Heatmap with Forced Alignment: Bản Đồ Nhiệt Âm Vị Từng Ký Tự",
      "persona": "Người học tiếng Anh muốn biết chính xác mình đọc sai ở chữ cái nào trong câu",
      "action": "đọc câu mẫu và xem kết quả căn chỉnh âm vị tức thời (Forced Alignment)",
      "value": "từng từ và từng ký tự được hiển thị màu nhiệt sắc nét (Xanh lá: Chuẩn >80%, Vàng: Lơ lớ 60-80%, Đỏ: Sai/Rụng <60%), nhấp vào từng từ để xem chi tiết lỗi và nghe đọc chậm",
      "priority": "must",
      "status": "in-progress",
      "size": "XL",
      "points": 13,
      "acceptanceCriteria": [
        {
          "id": "ac-elsa-201-heatmap",
          "given": "Học viên đọc câu \"Six months ago, she baked fresh bread for breakfast on the street.\"",
          "when": "Mô hình Forced Alignment căn chỉnh giọng nói với văn bản mẫu",
          "then": "Mỗi từ trong câu hiển thị thành một ô gạch thẻ (Tile) với ký tự phụ âm đuôi được bôi màu riêng biệt: \"Si[x]\" (/ks/ đỏ 42%), \"mon[ths]\" (/nθs/ vàng 68%), \"baked\" (đuôi -ed đỏ 39%), \"fresh\" (đuôi -sh xanh 96%).",
          "completed": true
        },
        {
          "id": "ac-elsa-201-click",
          "given": "Học viên nhấp chuột vào từ \"Six\"",
          "when": "Thao tác chọn từ diễn ra",
          "then": "Từ được chọn sáng viền ring-2 ring-rose-400, hệ thống phát âm thanh mẫu chuẩn của từ đó, và thẻ hướng dẫn bên dưới hiển thị phân tích lỗi: \"Nuốt phụ âm kép /ks/ thành âm /s/ đơn lẻ\".",
          "completed": true
        },
        {
          "id": "ac-elsa-201-ui",
          "given": "Hiển thị trên mọi thiết bị máy tính và điện thoại",
          "when": "Người dùng quan sát bản đồ nhiệt",
          "then": "Font chữ sử dụng Plus Jakarta Sans cho chữ tiếng Anh lớn và Noto Sans IPA cho phiên âm quốc tế; các badge điểm % GOP in đậm font-mono sắc nét, không bị nhòe vỡ hay thụt lề.",
          "completed": true
        },
        {
          "id": "ac-elsa-201-scale-5000",
          "given": "5,000 học viên đồng thời nộp bản ghi âm để căn chỉnh Forced Alignment",
          "when": "Hệ thống tính toán căn chỉnh thời gian âm vị",
          "then": "Client-side Viterbi alignment trích xuất timestamp và GOP score cục bộ hoặc thông qua Redis queue phân tải đến GPU worker pool; thời gian trả về kết quả dưới 250ms cho toàn bộ 5,000 yêu cầu đồng thời.",
          "completed": true
        },
        {
          "id": "ac-elsa-201-a11y",
          "given": "Học viên khiếm thị hoặc hạn chế thị lực màu sắc",
          "when": "Xem các ô bản đồ nhiệt",
          "then": "Ngoài màu sắc, mỗi ô đều có ký hiệu văn bản và số điểm cụ thể (42% GOP, 96% GOP) cùng nhãn cảnh báo rõ ràng, không chỉ dựa duy nhất vào màu sắc để truyền đạt thông tin.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-elsa-201-tiles",
          "title": "Xây dựng component WordHeatmapTiles với các trạng thái màu sắc xanh/vàng/đỏ tương tác",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-201-alignment",
          "title": "Tích hợp thuật toán tính Goodness of Pronunciation (GOP) cho từng phụ âm đuôi",
          "category": "Algorithm",
          "completed": true
        },
        {
          "id": "t-elsa-201-tts",
          "title": "Ghép nối Web Speech API phát âm thanh mẫu khi nhấp vào từng từ",
          "category": "Audio/DSP",
          "completed": true
        },
        {
          "id": "t-elsa-201-scale",
          "title": "Thiết kế cấu trúc dữ liệu alignment gọn nhẹ dưới 2KB, nén Gzip truyền qua mạng",
          "category": "Performance",
          "completed": true
        },
        {
          "id": "t-elsa-201-qa",
          "title": "Kiểm thử độ chính xác căn chỉnh âm vị trên các câu có từ nối phức tạp",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 UI/UX Design Specifications\n- **Màn hình tham chiếu**: `src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html`\n- **React Component**: `vietphonics-app/src/views/PracticeStudioView.jsx`\n- **Heatmap Typography**: Chữ cái thường dùng `font-bold text-slate-900`, ký tự lỗi bọc trong `bg-rose-100 text-rose-600 px-1 rounded`.\n- **IPA Display**: Noto Sans IPA glyphs `/sɪks/`, `/mʌnθs/`, `/beɪkt/` hiển thị chuẩn xác 100%.\n\n### ⚡ Hiệu Năng 5,000 Người Dùng Đồng Thời\n- **Fast-Path Evaluation**: Sử dụng mô hình CTC forced alignment tối ưu hóa ONNX Runtime trên WebAssembly chạy trực tiếp trên máy người dùng, đạt tốc độ 15ms cho câu 12 từ.",
      "createdAt": "2026-09-30T17:26:08.290Z"
    },
    {
      "id": "ELSA-202",
      "epicId": "epic-prosody",
      "title": "Syllable Stress & Capitalized Word Emphasis Evaluator: Đánh Giá Trọng Âm Từ & Nhấn Nhấn Ngữ Cảnh",
      "persona": "Người học tiếng Anh nói chuyện đều đều không trọng âm hoặc hay nhấn sai âm tiết chính",
      "action": "đọc các từ đa âm tiết (như \"com-for-ta-ble\", \"de-ve-lop-ment\") và câu có từ nhấn trọng tâm",
      "value": "hệ thống đo trường độ, cường độ và cao độ của từng âm tiết, chỉ rõ âm tiết mang trọng âm chính cần đọc dài gấp đôi và to hơn các âm tiết phụ xung quanh",
      "priority": "must",
      "status": "in-progress",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-elsa-202-eval",
          "given": "Từ mục tiêu có trọng âm chính ở âm tiết thứ hai (như \"de-VE-lop-ment\")",
          "when": "Học viên nhấn nhầm vào âm tiết thứ nhất bằng cách đọc to hoặc kéo dài âm đầu",
          "then": "Hệ thống bôi đỏ âm tiết nhấn sai và hiển thị hướng dẫn trực quan: \"Trọng âm rơi vào âm tiết thứ hai: de-VE-lop-ment. Hạ giọng âm tiết đầu 'de-' và dồn năng lượng vào 'VE-'\".",
          "completed": true
        },
        {
          "id": "ac-elsa-202-ui",
          "given": "Giao diện hiển thị từ vựng với cấu trúc âm tiết",
          "when": "Render trên màn hình",
          "then": "Các âm tiết được phân tách bằng dấu chấm hoặc gạch nối, âm tiết mang trọng âm chính viết hoa in đậm font-mono với kích thước lớn hơn 15% so với âm tiết không mang trọng âm.",
          "completed": true
        },
        {
          "id": "ac-elsa-202-scale-5000",
          "given": "5,000 học viên cùng lúc gửi âm thanh kiểm tra trọng âm",
          "when": "Tính toán tỷ lệ năng lượng âm tiết (Syllable Energy Ratio)",
          "then": "Thuật toán trích xuất chuỗi năng lượng RMS theo cửa sổ 20ms thực thi trên client, truyền vector thời lượng âm tiết (Syllable Duration Vector) dưới 50 byte về backend, đảm bảo máy chủ đáp ứng hơn 10,000 requests/giây mà không tăng tải.",
          "completed": true
        },
        {
          "id": "ac-elsa-202-l1",
          "given": "Học viên có thói quen đánh dấu sắc vào âm tiết đầu tiên theo phản xạ tiếng Việt",
          "when": "Bộ lọc L1 phát hiện thói quen này",
          "then": "Cảnh báo đồng cảm: \"Người Việt thường vô thức thêm dấu sắc vào âm đầu. Hãy thả lỏng cơ hàm và giữ âm đầu thật nhẹ và ngắn\".",
          "completed": true
        },
        {
          "id": "ac-elsa-202-a11y",
          "given": "Người dùng hỗ trợ âm thanh",
          "when": "Bấm nghe mẫu âm tiết",
          "then": "Phát âm thanh mẫu với trọng âm phóng đại cường độ (exaggerated stress audio) giúp người học dễ dàng cảm nhận sự chênh lệch nhịp điệu.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-elsa-202-algo",
          "title": "Xây dựng thuật toán Syllable Stress Ratio đo lường Duration, Intensity và F0 Peak",
          "category": "Algorithm",
          "completed": true
        },
        {
          "id": "t-elsa-202-ui",
          "title": "Thiết kế giao diện hiển thị âm tiết viết hoa nổi bật kèm phân tích nhịp điệu",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-202-tts",
          "title": "Tích hợp Web Speech API phát âm phóng đại trọng âm phục vụ luyện tai nghe",
          "category": "Audio/DSP",
          "completed": true
        },
        {
          "id": "t-elsa-202-scale",
          "title": "Tối ưu hóa vector truyền tải năng lượng âm tiết chỉ 50 byte giảm tải mạng tối đa",
          "category": "Performance",
          "completed": true
        },
        {
          "id": "t-elsa-202-qa",
          "title": "Kiểm thử với danh sách 50 từ đa âm tiết dễ nhấn sai nhất của người Việt",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 UI/UX Design Specifications\n- **Màn hình tham chiếu**: `src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html`\n- **React Component**: `vietphonics-app/src/views/PracticeStudioView.jsx`\n- **Stress Visualization**: Âm tiết chính hiển thị `text-lg font-black text-rose-600`, âm tiết phụ hiển thị `text-xs text-slate-400`.",
      "createdAt": "2026-09-30T17:26:08.290Z"
    },
    {
      "id": "ELSA-203",
      "epicId": "epic-prosody",
      "title": "Suprasegmental Pitch & Sentence Intonation Melody Canvas: Biểu Đồ Đường Cong Cao Độ F0 Ngũ Điệu",
      "persona": "Người học tiếng Anh giao tiếp muốn nói tự nhiên có giai điệu, không bị giọng phẳng hoặc tụt giọng sai chỗ",
      "action": "quan sát biểu đồ đường cong cao độ F0 (80Hz - 350Hz) đối chiếu giọng của mình với giọng chuẩn General US",
      "value": "thấy được trực quan đường nét ngữ điệu (lên giọng cuối câu hỏi Yes/No, xuống giọng câu trần thuật, lướt sóng câu cảm thán), giúp cải thiện ngay lập tức giai điệu nói tiếng Anh tự nhiên",
      "priority": "must",
      "status": "in-progress",
      "size": "XL",
      "points": 13,
      "acceptanceCriteria": [
        {
          "id": "ac-elsa-203-canvas",
          "given": "Học viên đọc câu hỏi cần lên giọng (Rising Intonation: \"Are you coming tonight?\")",
          "when": "Học viên nói với ngữ điệu tụt dốc ở cuối câu",
          "then": "Đường cong cao độ học viên (màu Rose #e11d48) tách rời rõ rệt khỏi đường nét mẫu (màu Sky nét đứt #0284c7) và xuất hiện cảnh báo ngữ điệu: \"Giọng bạn bị tụt xuống ở cuối câu. Hãy nâng cao độ ở âm tiết cuối của câu hỏi Yes/No!\".",
          "completed": true
        },
        {
          "id": "ac-elsa-203-ui",
          "given": "Khung hiển thị đồ họa SVG Suprasegmental Intonation Canvas",
          "when": "Render trên màn hình độ phân giải cao",
          "then": "Trục tung hiển thị dải tần số thực từ 80Hz (Chest voice) đến 350Hz (Head voice), trục hoành hiển thị dòng thời gian từ 0.0s đến 4.2s có gắn nhãn từng từ ngữ cảnh; diện tích dưới đường cong được tô gradient mờ tinh tế, có lưới gridlines âm học đứt đoạn.",
          "completed": true
        },
        {
          "id": "ac-elsa-203-scale-5000",
          "given": "5,000 học viên đồng thời theo dõi biểu đồ ngữ điệu thời gian thực",
          "when": "Trình duyệt vẽ đường cong F0",
          "then": "Thuật toán Autocorrelation / YIN trích xuất F0 chạy trực tiếp trong Web Worker client không chiếm luồng chính (Main Thread), vẽ đồ họa bằng SVG đường cong Bézier 60 FPS, không gửi bất kỳ khung hình nào về máy chủ.",
          "completed": true
        },
        {
          "id": "ac-elsa-203-grid-toggle",
          "given": "Học viên muốn nhìn rõ đường lưới âm học F1/F2 hoặc muốn tối giản giao diện",
          "when": "Bấm nút \"Lưới F1-F2: Bật / Tắt\"",
          "then": "Các đường lưới tham chiếu ngang dọc ẩn/hiện mượt mà với hiệu ứng chuyển tiếp CSS opacity trong 200ms.",
          "completed": true
        },
        {
          "id": "ac-elsa-203-a11y",
          "given": "Người dùng điều hướng bằng bàn phím",
          "when": "Tab đến biểu đồ ngữ điệu",
          "then": "Có thuộc tính aria-label mô tả: \"Biểu đồ đường cong cao độ F0: Giọng bản ngữ lên giọng ở 3.2s, giọng của bạn đi ngang ở 3.2s, độ tương đồng 78%\".",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-elsa-203-svg",
          "title": "Thiết kế đồ họa SVG Suprasegmental Pitch Canvas 1000x240 với gradient đổ bóng và đường cong Bézier",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-203-yin",
          "title": "Tối ưu hóa thuật toán trích xuất pitch F0 bằng YIN/Autocorrelation trong Web Worker",
          "category": "Audio/DSP",
          "completed": true
        },
        {
          "id": "t-elsa-203-alignment",
          "title": "Căn chỉnh chữ cái mốc thời gian từng từ dưới trục hoành khớp với dòng phát âm",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-203-scale",
          "title": "Đảm bảo biểu đồ render mượt mà 60 FPS trên màn hình điện thoại tầm trung không giật lag",
          "category": "Performance",
          "completed": true
        },
        {
          "id": "t-elsa-203-qa",
          "title": "Kiểm thử với câu hỏi Yes/No, câu hỏi Wh-, câu trần thuật và câu cảm thán",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 UI/UX Design Specifications\n- **Màn hình tham chiếu**: `src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html`\n- **React Component**: `vietphonics-app/src/views/PracticeStudioView.jsx`\n- **Color Gradients**:\n  - Native Pitch: `stroke=\"#0284c7\" strokeDasharray=\"6 4\" strokeWidth=\"3\"` với `linearGradient id=\"nativePitchGlowLight\"`\n  - User Pitch: `stroke=\"#e11d48\" strokeWidth=\"3.5\"` với `linearGradient id=\"userPitchGlowLight\"`\n- **Axes Labels**: 350 Hz, 260 Hz, 170 Hz, 80 Hz; Time slices 0.0s đến 4.2s.",
      "createdAt": "2026-09-30T17:26:08.290Z"
    },
    {
      "id": "ELSA-204",
      "epicId": "epic-ending-sounds",
      "title": "Speech Fluency, Natural Pauses & Filler Word Monitor: Đồng Hồ Tốc Độ WPM & Giám Sát Quãng Ngắt",
      "persona": "Người học tiếng Anh đi làm muốn luyện nói lưu loát, dứt khoát và không bị ậm ừ ngập ngừng",
      "action": "đọc câu nói và theo dõi đồng hồ đo tốc độ lưu loát (Fluency Meter) cùng bộ đếm từ đệm",
      "value": "biết được chính xác tốc độ nói (WPM tối ưu: 120-150 từ/phút), phát hiện các điểm ngắt hơi bất thường quá 1.2 giây và triệt tiêu thói quen nói chêm từ đệm (\"um\", \"ờ\")",
      "priority": "should",
      "status": "in-progress",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-elsa-204-wpm",
          "given": "Học viên hoàn thành bản ghi âm câu nói",
          "when": "Hệ thống đo đạc thời gian phát âm thực và số lượng âm tiết",
          "then": "Đồng hồ hình bán nguyệt SVG (Speedometer) quay kim chỉ chính xác tốc độ nói (ví dụ: 138 WPM - Nằm trong vùng tối ưu Conversational Tempo 120-150 WPM).",
          "completed": true
        },
        {
          "id": "ac-elsa-204-pauses",
          "given": "Học viên nói bị ngập ngừng khựng lại",
          "when": "Khoảng lặng vượt quá ngưỡng 1.2 giây",
          "then": "Bộ giám sát quãng ngắt tăng bộ đếm lên 1 lần, chỉ rõ vị trí khựng lại (ví dụ: sau từ \"breakfast\" khựng 1.32s), và đưa ra khuyến nghị nối từ mượt mà.",
          "completed": true
        },
        {
          "id": "ac-elsa-204-ui",
          "given": "Hiển thị trên giao diện PracticeStudioView",
          "when": "Người dùng quan sát bảng telemetry",
          "then": "Đồng hồ WPM vẽ bằng vector SVG sắc nét, kim chỉ màu đen có bóng đổ, vùng mục tiêu 120-150 WPM tô màu xanh Sky dịu mắt; các thẻ đếm từ đệm có icon trực quan và nhãn rõ ràng.",
          "completed": true
        },
        {
          "id": "ac-elsa-204-scale-5000",
          "given": "5,000 người dùng liên tục tính toán tốc độ WPM sau mỗi câu nói",
          "when": "Thuật toán tính toán chạy",
          "then": "Thuật toán Voice Activity Detection (VAD) tính toán quãng lặng dựa trên mức năng lượng RMS cục bộ trong trình duyệt; thời gian thực thi dưới 2ms, zero tải máy chủ.",
          "completed": true
        },
        {
          "id": "ac-elsa-204-a11y",
          "given": "Người dùng sử dụng công nghệ đọc màn hình",
          "when": "Đọc qua bảng thông số lưu loát",
          "then": "Văn bản tóm tắt đọc rõ ràng: \"Tốc độ nói: 138 từ một phút, Đánh giá: Nhịp điệu tự nhiên, Số lần khựng quá 1.2 giây: 1 lần\".",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-elsa-204-svg",
          "title": "Thiết kế đồ họa SVG đồng hồ bán nguyệt 200x110 với kim chỉ động và cung góc quay",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-204-vad",
          "title": "Xây dựng thuật toán Voice Activity Detection (VAD) tính ngưỡng ngắt 1.2s và đếm filler tokens",
          "category": "Algorithm",
          "completed": true
        },
        {
          "id": "t-elsa-204-ui-cards",
          "title": "Hiện thực hóa 2 thẻ Counter Pills giám sát từ đệm và quãng ngắt chuẩn Stitch tokens",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-204-scale",
          "title": "Tối ưu hóa hiệu năng tính toán toán học không tạo mảng rác (garbage collection)",
          "category": "Performance",
          "completed": true
        },
        {
          "id": "t-elsa-204-qa",
          "title": "Kiểm thử với các bản ghi âm có tốc độ cực chậm (<80 WPM) và cực nhanh (>200 WPM)",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 UI/UX Design Specifications\n- **Màn hình tham chiếu**: `src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html`\n- **React Component**: `vietphonics-app/src/views/PracticeStudioView.jsx`\n- **Speedometer Arc**: Góc quét 180 độ, phân chia rõ ràng 3 khoảng: Rời rạc (<120 WPM), Nhịp điệu chuẩn bản ngữ (120-150 WPM), Quá vội (>180 WPM).",
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
          "then": "Nếu đúng, hiển thị thông báo chúc mừng màu xanh lá, tăng điểm bài kiểm tra (ví dụ: 3/3), tăng chuỗi streak và hiển thị mẹo cấu âm: \"Chú ý kẹp lưỡi giữa hai răng cho /θ/, đầu lưỡi bật sau nướu cho /t/\".",
          "completed": true
        },
        {
          "id": "ac-elsa-205-ui",
          "given": "Tab \"Cặp Âm (ELSA-205 & PRON-208)\" trong MasteryLabView",
          "when": "Giao diện hiển thị",
          "then": "Nút loa phát âm to tròn 80px nổi bật giữa màn hình với hiệu ứng hover:scale-110 active:scale-95, 2 nút chọn từ A và B to bản thiết kế dạng Bento card, font-black 24px, hiển thị phiên âm IPA chuẩn bên dưới.",
          "completed": true
        },
        {
          "id": "ac-elsa-205-scale-5000",
          "given": "5,000 học viên cùng làm bài trắc nghiệm phân biệt thính giác",
          "when": "Phát âm thanh mẫu",
          "then": "Sử dụng Web Speech API của trình duyệt hoặc tải file âm thanh mẫu từ CDN Cloudflare với bộ nhớ đệm Cache-Control max-age=31536000; thời gian phản hồi âm thanh < 10ms, không tiêu tốn băng thông máy chủ chính.",
          "completed": true
        },
        {
          "id": "ac-elsa-205-l1",
          "given": "Học viên chọn nhầm từ \"ship\" thành \"sheep\"",
          "when": "Hệ thống báo sai",
          "then": "Giải thích rõ lỗi L1 tiếng Việt: \"Tiếng Việt không có nguyên âm thả lỏng /ɪ/, người Việt hay đọc thành nguyên âm căng /iː/. Hãy phát âm dứt khoát và thả lỏng khóe môi\".",
          "completed": true
        },
        {
          "id": "ac-elsa-205-a11y",
          "given": "Người dùng thao tác bằng phím tắt",
          "when": "Nhấn phím 1 cho lựa chọn A, phím 2 cho lựa chọn B, phím Space để nghe lại âm",
          "then": "Giao diện phản hồi chuẩn xác theo phím tắt, các nút có đầy đủ aria-label mô tả nội dung từ.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-elsa-205-quiz-ui",
          "title": "Xây dựng component MinimalPairQuiz với danh sách các cặp âm dễ nhầm của người Việt",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-205-tts",
          "title": "Tích hợp hàm phát âm thanh playWord với Web Speech API tốc độ 0.8x chuẩn General US",
          "category": "Audio/DSP",
          "completed": true
        },
        {
          "id": "t-elsa-205-state",
          "title": "Quản lý state bài thi quizScore, answeredState, và tự động đồng bộ streak qua AppContext",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-205-scale",
          "title": "Kiểm thử tải đồng thời 5,000 phiên trắc nghiệm với thời gian phản hồi dưới 15ms",
          "category": "Performance",
          "completed": true
        },
        {
          "id": "t-elsa-205-qa",
          "title": "Kiểm tra độ chính xác của 10 cặp âm tối thiểu phổ biến nhất trong tiếng Anh giao tiếp",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 UI/UX Design Specifications\n- **Màn hình tham chiếu**: `src/ui-reference/kh_u_h_nh_2d_gi_i_ph_u_c_mi_ng_light_mode/code.html`\n- **React Component**: `vietphonics-app/src/views/MasteryLabView.jsx`\n- **Interactive Elements**: Nút loa tròn Sky `#0284c7`, Card lựa chọn bo góc `rounded-2xl border-2 border-slate-200 hover:border-primary`.",
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
          "id": "ac-elsa-301-ui",
          "given": "Giao diện phòng hội thoại RoleplayView",
          "when": "Render trên màn hình",
          "then": "Hiển thị ảnh chân dung Alex sắc nét có vòng hào quang gradient công nghệ, hiệu ứng sóng âm spectrum 48kHz WebRTC nhảy múa khi Alex nói, khung chat hội thoại dạng bong bóng hiện đại, nút Push-To-Talk tròn lớn ở chân trang.",
          "completed": true
        },
        {
          "id": "ac-elsa-301-scale-5000",
          "given": "5,000 học viên cùng lúc tham gia các phiên roleplay trực tuyến",
          "when": "Duy trì kết nối âm thanh và nhận diện hội thoại",
          "then": "Sử dụng kiến trúc WebSocket connection pooling với heartbeat 15s; luồng TTS của Alex phát trực tiếp qua Web Speech API trên client hoặc CDN edge cache, máy chủ backend duy trì mức sử dụng RAM dưới 30% cho 5,000 kết nối đồng thời.",
          "completed": true
        },
        {
          "id": "ac-elsa-301-l1",
          "given": "Học viên trả lời báo cáo blocker nhưng nuốt âm đuôi /t/ trong từ \"blocked\"",
          "when": "Alex nghe câu trả lời",
          "then": "Thẻ checklist mục tiêu bên phải cảnh báo: \"Báo cáo blocker kỹ thuật rõ âm: Cần phát âm rõ âm đuôi /t/ trong từ 'blocked'\".",
          "completed": true
        },
        {
          "id": "ac-elsa-301-a11y",
          "given": "Học viên muốn đọc phụ đề tiếng Việt",
          "when": "Bật toggle \"Phụ đề song ngữ\"",
          "then": "Hiển thị bản dịch tiếng Việt mượt mà ngay dưới câu thoại của Alex giúp học viên hiểu trọn vẹn ngữ cảnh công sở.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-elsa-301-ui",
          "title": "Xây dựng giao diện RoleplayView với ảnh đại diện Alex, dải spectrum WebRTC và khung chat",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-301-mic",
          "title": "Tích hợp Push-To-Talk toàn cục với phím Space và xử lý chuyển đổi lượt nói (turn-taking)",
          "category": "Audio/DSP",
          "completed": true
        },
        {
          "id": "t-elsa-301-scale",
          "title": "Thiết kế WebSocket gateway tối ưu hóa cho 5,000 kết nối đồng thời với Node.js cluster",
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
      "notes": "### 🎨 UI/UX Design Specifications\n- **Màn hình tham chiếu**: `src/ui-reference/ai_h_i_tho_i_roleplay_c_ng_s_light_mode/code.html`\n- **React Component**: `vietphonics-app/src/views/RoleplayView.jsx`\n- **Alex Portrait**: Google CDN ảnh chân dung giám đốc công nghệ phong cách Silicon Valley, viền `ring-2 ring-white`, chấm xanh online nhấp nháy.\n- **Spectrum Indicator**: Dải 8 thanh sóng âm nhảy động mô phỏng WebRTC 48kHz latency 14ms.",
      "createdAt": "2026-09-30T17:26:08.290Z"
    },
    {
      "id": "ELSA-302",
      "epicId": "epic-roleplay-ielts",
      "title": "Post-Roleplay Comprehensive Scorecard: Bảng Chỉ Số Toàn Diện Phát Âm & Ngữ Pháp",
      "persona": "Người học sau khi kết thúc phiên hội thoại muốn biết mình được bao nhiêu điểm và cần cải thiện gì",
      "action": "kết thúc phiên roleplay và xem bảng điểm tổng kết (Scorecard)",
      "value": "nhận bảng chỉ số 3 đồng hồ đo: Phát Âm (Pronunciation 84%), Ngữ Pháp (Grammar 88%), Độ Tự Nhiên (Natural Cadence 80%) cùng \"3 Cách Nói Hay Hơn Cho Kỹ Sư Việt\"",
      "priority": "must",
      "status": "in-progress",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-elsa-302-gauges",
          "given": "Phiên hội thoại kết thúc",
          "when": "Bảng chỉ số Standup hiển thị ở cột bên phải",
          "then": "Hiển thị 3 đồng hồ đo hình tròn SVG sắc nét: Phát Âm (84%), Ngữ Pháp (88%), Độ Tự Nhiên (80%), kèm nhãn \"Real-time Telemetry\".",
          "completed": true
        },
        {
          "id": "ac-elsa-302-better-ways",
          "given": "Câu trả lời của học viên còn mang tính dịch từ tiếng Việt sang (Viet-glish)",
          "when": "Hệ thống gợi ý cải thiện",
          "then": "Đưa ra 3 câu diễn đạt tự nhiên hơn chuẩn Silicon Valley: 1) \"I'm currently blocked by the payment gateway API timeout\", 2) \"We're refactoring the database indexing pipeline\", 3) \"I'll sync with the QA team right after standup\".",
          "completed": true
        },
        {
          "id": "ac-elsa-302-ui",
          "given": "Giao diện Scorecard trong RoleplayView",
          "when": "Render trên màn hình",
          "then": "Bảng điểm đóng khung trắng bo góc rounded-xl, viền slate-200 nhẹ nhàng, các đồng hồ tròn vẽ bằng SVG xoay -90 độ với strokeDasharray mượt mà, văn bản rõ ràng dễ đọc.",
          "completed": true
        },
        {
          "id": "ac-elsa-302-scale-5000",
          "given": "5,000 học viên cùng nhận bảng điểm sau phiên họp",
          "when": "Tạo báo cáo",
          "then": "Dữ liệu chỉ số được tính toán ngay trong phiên của client, chỉ đồng bộ 1 bản ghi tổng kết 200 byte về bảng user_roleplay_sessions; cơ sở dữ liệu xử lý nhẹ nhàng 5,000 phiên/phút.",
          "completed": true
        },
        {
          "id": "ac-elsa-302-a11y",
          "given": "Học viên muốn nghe phát âm 3 cách nói hay hơn",
          "when": "Bấm vào biểu tượng loa cạnh từng câu gợi ý",
          "then": "Phát âm thanh mẫu chuẩn của câu gợi ý giúp học viên học thuộc lòng cấu trúc.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-elsa-302-ui",
          "title": "Thiết kế 3 đồng hồ đo hình tròn SVG và danh sách 3 gợi ý nói hay hơn trong RoleplayView",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-302-scoring",
          "title": "Xây dựng module đánh giá điểm số ngữ pháp và độ tự nhiên dựa trên từ vựng công nghệ",
          "category": "Algorithm",
          "completed": true
        },
        {
          "id": "t-elsa-302-scale",
          "title": "Thiết kế payload lưu trữ kết quả roleplay siêu nhẹ 200 byte",
          "category": "Database",
          "completed": true
        },
        {
          "id": "t-elsa-302-qa",
          "title": "Kiểm thử hiển thị bảng điểm trên các kích thước màn hình máy tính bảng và laptop",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 UI/UX Design Specifications\n- **Màn hình tham chiếu**: `src/ui-reference/ai_h_i_tho_i_roleplay_c_ng_s_light_mode/code.html`\n- **React Component**: `vietphonics-app/src/views/RoleplayView.jsx` (Bảng Chỉ Số Standup)",
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
          "id": "ac-elsa-401-ui",
          "given": "Giao diện màn hình chính Lộ trình hàng ngày DailyPathView",
          "when": "Render trên thiết bị di động hoặc máy tính để bàn",
          "then": "Hiển thị thẻ bài lộ trình lớn viền gradient Rose-Sky nổi bật, đồng hồ đếm ngược tiến độ (0/5 bài đã xong), thanh tiến trình hình viên thuốc (pill progress bar) đổi màu từ xám sang xanh ngọc lục bảo khi hoàn thành từng bước, không bị giật layout (zero CLS).",
          "completed": true
        },
        {
          "id": "ac-elsa-401-scale-5000",
          "given": "5,000 học viên mở ứng dụng đồng thời vào khung giờ cao điểm (7h-8h sáng & 20h-21h tối)",
          "when": "Hệ thống tải dữ liệu lộ trình cá nhân hóa",
          "then": "Lộ trình được tính toán sẵn bởi background worker lúc 04:00 sáng và lưu vào Redis key `user:daily_path:{user_id}` với TTL 24h, thời gian phản hồi API P95 < 45ms, chịu tải 5,000 req/s mà không tác động tới cơ sở dữ liệu chính.",
          "completed": true
        },
        {
          "id": "ac-elsa-401-l1",
          "given": "Học viên gốc miền Bắc hay nhầm lẫn /l/ vs /n/ hoặc miền Nam hay nuốt âm đuôi /t/",
          "when": "Thuật toán thích ứng phân tích lịch sử lỗi",
          "then": "Lộ trình tự động ưu tiên bài tập chẩn đoán điều chỉnh khẩu hình chuyên biệt theo vùng miền của học viên, minh họa trực quan sự khác biệt vị trí đặt lưỡi.",
          "completed": true
        },
        {
          "id": "ac-elsa-401-a11y",
          "given": "Học viên đang di chuyển trên xe buýt rung lắc",
          "when": "Thao tác bằng một tay",
          "then": "Nút \"Bắt đầu bài tập kế tiếp\" được đặt ở góc dưới màn hình trong vùng ngón tay cái (thumb zone) với chiều cao tối thiểu 52px, độ tương phản màu văn bản đạt 4.8:1 trên nền sáng.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-elsa-401-ui",
          "title": "Xây dựng component DailyPathCard với thanh tiến trình viên thuốc 5 chặng và nút bấm lớn chuẩn mobile-first",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-401-algo",
          "title": "Phát triển thuật toán AdaptiveCurriculumEngine tính điểm trọng số lỗi (Weak Phoneme Weight Matrix)",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-elsa-401-cron",
          "title": "Thiết lập BullMQ cron worker chạy lúc 04:00 sáng sinh trước lộ trình cho 5,000 active users đẩy vào Redis",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-elsa-401-offline",
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
      "notes": "### 🎨 UI/UX Design System Specifications\n- **Màn hình tham chiếu**: `src/ui-reference/gamified_duolingo_style_vietnamese_accent_mastery/code.html`\n- **React Component**: `vietphonics-app/src/components/dashboard/DailyPathCard.jsx`\n- **Design Tokens**:\n  - Container: `bg-gradient-to-r from-rose-50 to-sky-50 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-6 border border-rose-100 dark:border-slate-700 shadow-sm`\n  - Step Indicator: 5 chấm tròn hoặc viên thuốc kết nối bằng đường kẻ đứt nét `border-dashed border-slate-300`\n- **Thuật toán sinh lộ trình**:\n  - Âm Warm-up: Chọn từ danh sách âm học viên đạt điểm >85% trong quá khứ để tạo hưng phấn ban đầu\n  - 2 Âm Thách thức: Lấy từ top 3 âm có điểm trung bình thấp nhất trong 14 ngày gần nhất\n  - Cặp âm tối thiểu: Ghép âm yếu với âm đối xứng dễ nhầm lẫn\n  - Câu ứng dụng: Chọn câu giao tiếp thực tế chứa ít nhất 2 từ mang các âm trên.",
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
          "id": "ac-elsa-402-ui",
          "given": "Giao diện Ngân Hàng Lỗi ErrorBankView",
          "when": "Hiển thị danh sách các từ cần ôn tập hôm nay",
          "then": "Mỗi thẻ từ hiển thị rõ phiên âm IPA chuẩn, ký tự bị lỗi tô đỏ rực rỡ kèm huy hiệu cấp độ nhớ (Hộp Leitner 1-5), nút nghe lại giọng mình cũ vs giọng người bản ngữ đặt cạnh nhau trực quan, kèm nút đánh giá mức độ nhớ (Dễ - Vừa - Khó).",
          "completed": true
        },
        {
          "id": "ac-elsa-402-scale-5000",
          "given": "5,000 học viên tích lũy trung bình 150 từ lỗi trong tài khoản cá nhân (tổng 750,000 bản ghi lỗi)",
          "when": "Truy vấn các từ đến hạn ôn tập hôm nay (`due_date <= CURRENT_DATE`)",
          "then": "Bảng cơ sở dữ liệu có chỉ mục kết hợp `CREATE INDEX idx_user_due_date ON error_bank(user_id, due_date)`, kết quả truy vấn trả về phân trang dưới 35ms cho 5,000 người dùng đồng thời.",
          "completed": true
        },
        {
          "id": "ac-elsa-402-l1",
          "given": "Học viên phát âm sai từ \"specifically\" do lỗi nuốt âm /s/ hoặc chèn âm tiếng Việt",
          "when": "Xem chi tiết lỗi trong Error Bank",
          "then": "Thẻ phân tích cung cấp mẹo chỉnh cơ miệng: \"Chú ý phân đoạn âm tiết: spe-ci-fi-cal-ly, hạ âm schwa /ə/ ở âm tiết thứ ba\".",
          "completed": true
        },
        {
          "id": "ac-elsa-402-a11y",
          "given": "Học viên ôn tập nhanh bằng bàn phím máy tính",
          "when": "Bấm phím 1 (Khó), 2 (Tốt), 3 (Dễ) sau khi nghe",
          "then": "Hệ thống cập nhật hệ số dễ dàng (Easiness Factor EF) và khoảng thời gian ôn tập kế tiếp (Interval Days) ngay lập tức theo chuẩn thuật toán SuperMemo-2.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-elsa-402-ui",
          "title": "Xây dựng component ErrorBankCard với tính năng so sánh âm thanh đôi (A/B Audio Player) và thanh tiến độ hộp Leitner",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-402-sm2",
          "title": "Triển khai thuật toán SuperMemo-2 (SM-2) tính toán EF (Easiness Factor) và Interval I(n) sau mỗi lượt ôn tập",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-elsa-402-db",
          "title": "Thiết kế bảng PostgreSQL error_bank và tạo compound index tối ưu hóa cho 750,000 bản ghi",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-elsa-402-scale",
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
      "notes": "### 🎨 UI/UX Design System Specifications\n- **Màn hình tham chiếu**: `src/ui-reference/dashboard_ti_n_tr_nh_h_c_t_p_v_l_ch_s_thu_m/code.html`\n- **React Component**: `vietphonics-app/src/views/ErrorBankView.jsx`\n- **Công thức thuật toán SM-2**:\n  - $EF' = EF + (0.1 - (5 - q) \times (0.08 + (5 - q) \times 0.02))$\n  - Nếu $EF' < 1.3$, đặt $EF' = 1.3$\n  - Khoảng cách ngày $I(1) = 1$, $I(2) = 6$, $I(n) = I(n-1) \times EF'$\n  - $q$ là điểm đánh giá của người dùng từ 0 (hoàn toàn quên) đến 5 (phát âm hoàn hảo).\n- **Audio A/B Comparison Player**:\n  - Kênh A (Trái): Giọng của học viên khi mắc lỗi (vạch sóng âm màu đỏ hồng #f43f5e)\n  - Kênh B (Phải): Giọng chuẩn bản ngữ (vạch sóng âm màu xanh ngọc #10b981).",
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
          "id": "ac-elsa-601-ui",
          "given": "Thanh điều hướng trên cùng (Navbar) và màn hình hồ sơ người dùng",
          "when": "Hiển thị huy hiệu Streak",
          "then": "Biểu tượng ngọn lửa màu cam cháy sống động kèm số ngày font chữ đậm Plus Jakarta Sans; khi bấm vào ngọn lửa, mở Modal Lịch Streak tháng hiển thị các ngày đã học được đánh dấu chấm xanh, ngày dùng Khiên Băng đánh dấu bông tuyết xanh lam.",
          "completed": true
        },
        {
          "id": "ac-elsa-601-scale-5000",
          "given": "5,000 học viên cùng hoạt động vào khung giờ chuyển giao ngày mới (23:50 - 00:10)",
          "when": "Hệ thống kiểm tra và cập nhật Streak hàng loạt",
          "then": "Sử dụng hàng đợi phân tán Redis Task Queue xử lý cập nhật bất đồng bộ, khóa phân tán Redlock bảo vệ chống race-condition ghi đè streak hai lần, thời gian xử lý toàn bộ 5,000 users dưới 4 giây.",
          "completed": true
        },
        {
          "id": "ac-elsa-601-l1",
          "given": "Học viên bỏ lỡ 1 ngày luyện tập vì bận việc gia đình",
          "when": "Học viên sở hữu ít nhất 1 Khiên Băng (Streak Freeze Shield)",
          "then": "Hệ thống tự động tiêu thụ 1 khiên băng, bảo toàn chuỗi ngày học nguyên vẹn và gửi thông báo nhắc nhở nhẹ nhàng vào sáng hôm sau: \"Khiên Băng đã cứu chuỗi 15 ngày của bạn! Đừng quên luyện tập hôm nay nhé!\".",
          "completed": true
        },
        {
          "id": "ac-elsa-601-a11y",
          "given": "Học viên dùng phím điều hướng",
          "when": "Focus vào ngọn lửa Streak",
          "then": "Aria-label đọc đầy đủ: \"Chuỗi học tập hiện tại: 12 ngày liên tiếp. Bạn có 2 khiên băng bảo vệ. Nhấn để xem lịch sử tháng\".",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-elsa-601-ui",
          "title": "Xây dựng component StreakModal với lịch tháng tương tác và hoạt ảnh ngọn lửa Lottie/CSS Canvas",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-601-logic",
          "title": "Xây dựng module StreakManager xử lý múi giờ địa phương IANA Timezone và cơ chế tự động kích hoạt Freeze Shield",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-elsa-601-redis",
          "title": "Triển khai Redis cache và Redlock bảo vệ cập nhật đồng thời chuỗi học tập cho 5,000 users",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-elsa-601-notify",
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
      "notes": "### 🎨 UI/UX Design System Specifications\n- **Màn hình tham chiếu**: `vietphonics-app/src/components/Navbar.jsx`\n- **Streak Flame Visual**:\n  - Gradient: `from-orange-500 via-amber-500 to-yellow-400`\n  - Shadow: `drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)]`\n  - Level Milestones: 7 ngày (Ngọn lửa đồng), 30 ngày (Ngọn lửa bạc xanh), 100 ngày (Ngọn lửa vàng kim tỏa hào quang rực rỡ).\n- **Cơ chế Khiên Băng (Freeze Shield)**:\n  - Tặng miễn phí 1 khiên mỗi khi đạt mốc 7 ngày liên tiếp\n  - Giới hạn tối đa tích trữ 2 khiên cùng một thời điểm.",
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
          "id": "ac-elsa-602-ui",
          "given": "Cửa sổ nâng cấp Pro Paywall Modal",
          "when": "Hiển thị trên màn hình",
          "then": "Thiết kế theo chuẩn Google Stitch phong cách thẻ giá hiện đại: Bảng so sánh 2 cột Free vs Pro, huy hiệu \"Phổ Biến Nhất\" màu vàng cam, giá ưu đãi 30.000đ/tháng (chỉ 1.000đ/ngày tương đương nửa ly trà đá), nút kêu gọi hành động (CTA) gradient Rose rực rỡ với hiệu ứng hào quang nhẹ.",
          "completed": true
        },
        {
          "id": "ac-elsa-602-scale-5000",
          "given": "5,000 người dùng kiểm tra hạn mức bài học liên tục",
          "when": "Gửi request bắt đầu bài học",
          "then": "Hạn mức được kiểm tra trên Redis INCR counter `quota:{user_id}:{date}` với thời gian phản hồi dưới 3ms, không tốn bất kỳ lượt truy vấn nào vào cơ sở dữ liệu PostgreSQL chính.",
          "completed": true
        },
        {
          "id": "ac-elsa-602-l1",
          "given": "Học viên muốn nghe lại đoạn ghi âm cũ của mình trong Error Bank",
          "when": "Kiểm tra quyền hạn gói Free",
          "then": "Gói Free cho phép nghe lại tối đa 3 ngày gần nhất; hiển thị icon ổ khóa mở rộng cho các đoạn ghi âm lịch sử lâu hơn kèm chú thích \"Nâng cấp Pro để lưu trữ trọn đời âm thanh của bạn\".",
          "completed": true
        },
        {
          "id": "ac-elsa-602-a11y",
          "given": "Người dùng muốn đóng Modal Paywall",
          "when": "Nhấn phím Escape hoặc nút \"Để sau, mai học tiếp\"",
          "then": "Modal đóng mượt mà và focus trả về nút bài học trước đó, không gây bẫy bàn phím (keyboard trap).",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-elsa-602-ui",
          "title": "Xây dựng component ProPaywallModal với bảng so sánh tính năng Free vs Pro và đồng hồ đếm ngược reset hạn mức",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-602-redis",
          "title": "Triển khai Redis atomic counter INCR và EXPIREAT (23:59:59) kiểm soát hạn mức 5 bài/ngày cho 5,000 users",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-elsa-602-gate",
          "title": "Viết Express/FastAPI middleware verifyQuotaMiddleware chặn các lượt gọi API luyện âm khi vượt quota",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-elsa-602-perf",
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
      "notes": "### 🎨 UI/UX Design System Specifications\n- **Màn hình tham chiếu**: `src/ui-reference/m_n_h_nh_ch_n_g_i_v_thanh_to_n_qr_code/code.html`\n- **React Component**: `vietphonics-app/src/components/subscription/ProPaywallModal.jsx`\n- **Key Selling Points**:\n  - Gói Free: 5 bài học/ngày, phản hồi âm thanh cơ bản, lưu lịch sử 3 ngày\n  - Gói Pro: Không giới hạn bài học, chẩn đoán AI 3D khẩu hình, Golden Speaker Voice Clone, Error Bank trọn đời\n- **Conversion Optimization**:\n  - Đặt giá neo tâm lý: 30,000đ/tháng hoặc 299,000đ/năm (tiết kiệm 17% + tặng 3 tháng).",
      "createdAt": "2026-09-30T17:26:08.290Z"
    },
    {
      "id": "VN-101",
      "epicId": "epic-ending-sounds",
      "title": "Final Consonant Sound \"Ending Sound\" Inspector & Alert System: Hệ Thống Bắt Lỗi Nuốt Âm Đuôi Đặc Trưng L1",
      "persona": "Người Việt học tiếng Anh thường xuyên nuốt âm đuôi do tiếng Việt không có phụ âm xát và phụ âm bật cuối từ",
      "action": "phát âm các từ có phụ âm đuôi phức hợp như \"six\" (/sɪks/), \"baked\" (/beɪkt/), \"months\" (/mʌnθs/)",
      "value": "hệ thống phân tích phổ tần số cao phát hiện ngay lập tức nếu âm đuôi bị nuốt, hiển thị cảnh báo đỏ và hướng dẫn khẩu hình bật âm chuẩn xác",
      "priority": "must",
      "status": "in-progress",
      "size": "L",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-vn-101-detection",
          "given": "Từ mục tiêu chứa cụm phụ âm đuôi như \"six\" (/sɪks/)",
          "when": "Học viên chỉ phát âm /sɪ/ và nuốt mất âm /ks/",
          "then": "Hệ thống nhận diện sự thiếu hụt năng lượng dải tần cao 4kHz-8kHz, đánh dấu chữ cái \"x\" màu đỏ rực kèm cảnh báo: \"Bỏ quên âm đuôi /ks/! Cần kẹp bật âm /k/ rồi xát gió /s/\".",
          "completed": true
        },
        {
          "id": "ac-vn-101-perfect",
          "given": "Học viên phát âm đầy đủ và bật chuẩn xác âm đuôi (ví dụ: /ʃ/ trong \"fresh\")",
          "when": "Mô hình âm học xác thực độ khớp > 90%",
          "then": "Hiển thị huy hiệu xanh lá \"PERFECT (+15 XP Mastery)\" kèm phân tích: \"Chu môi âm /ʃ/ chuẩn xác (96% GOP), luồng khí xát đồng nhất\".",
          "completed": true
        },
        {
          "id": "ac-vn-101-slow-audio",
          "given": "Học viên gặp khó khăn với cụm phụ âm đuôi phức tạp như /nθs/ trong \"months\"",
          "when": "Bấm nút \"Tập chậm 0.5x\"",
          "then": "Hệ thống tự động phát âm thanh mẫu giảm tốc độ 50% nhưng giữ nguyên cao độ giọng nói (pitch-preserved timestretching) để học viên nghe rõ từng chuyển động ngắt nghỉ.",
          "completed": true
        },
        {
          "id": "ac-vn-101-scale-5000",
          "given": "5,000 học viên cùng lúc gửi yêu cầu phân tích âm đuôi",
          "when": "Bộ thanh lọc âm học L1Inspector xử lý",
          "then": "Xử lý hoàn toàn bất đồng bộ không nghẽn luồng; cấu hình bảng quy tắc lỗi được nạp sẵn trong bộ nhớ đệm, thời gian xử lý phân tích dưới 10ms.",
          "completed": true
        },
        {
          "id": "ac-vn-101-ui",
          "given": "Hiển thị danh sách 4 thẻ Callout phân tích âm đuôi",
          "when": "Giao diện tải",
          "then": "4 thẻ chia 2 cột cân đối, viền màu phân biệt theo mức độ nghiêm trọng (Rose cho lỗi nặng, Amber cho cảnh báo, Emerald cho âm đã hoàn hảo); có nút nghe chậm và thông số Spectral Peak cụ thể.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-vn-101-spectral",
          "title": "Xây dựng thuật toán phân tích năng lượng dải tần cao 4kHz-8kHz để phát hiện âm xát /s/, /ks/, /ʃ/",
          "category": "Audio/DSP",
          "completed": true
        },
        {
          "id": "t-vn-101-callouts",
          "title": "Thiết kế 4 thẻ Callout âm đuôi chuyên sâu trong PracticeStudioView với đầy đủ thông số âm học",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-vn-101-timestretch",
          "title": "Tích hợp tính năng phát audio tốc độ 0.5x giữ nguyên cao độ giọng nói bằng Web Speech API",
          "category": "Audio/DSP",
          "completed": true
        },
        {
          "id": "t-vn-101-scale",
          "title": "Kiểm thử khả năng phục hồi khi âm lượng mic quá nhỏ hoặc môi trường ồn",
          "category": "Performance",
          "completed": true
        },
        {
          "id": "t-vn-101-qa",
          "title": "Xác thực độ nhạy phát hiện lỗi nuốt âm đuôi trên 100 mẫu giọng người Việt 3 miền",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 UI/UX Design Specifications\n- **Màn hình tham chiếu**: `src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html`\n- **React Component**: `vietphonics-app/src/views/PracticeStudioView.jsx`\n- **Phân loại 4 âm đuôi trọng tâm**:\n  1. `/ks/` trong \"six\" ➔ Critical (42% GOP)\n  2. `-ed (/t/)` trong \"baked\" ➔ Critical (39% GOP)\n  3. `/ʃ/` trong \"fresh\" ➔ Perfect (96% GOP)\n  4. `/nθs/` trong \"months\" ➔ Warning (68% GOP)\n\n### 🔬 Tiêu Chuẩn Âm Học Tiếng Việt L1\n- Tiếng Việt kết thúc bằng các âm tắc khép kín (unreleased final stops: -c, -k, -t, -p), người bản ngữ Việt Nam có phản xạ sinh học tự nhiên đóng thanh hầu và không nhả luồng hơi cuối. Module VN-101 can thiệp trực tiếp để hình thành phản xạ nhả hơi phụ âm tiếng Anh.",
      "createdAt": "2026-09-30T17:32:40.700Z"
    },
    {
      "id": "VN-102",
      "epicId": "epic-diagnostic",
      "title": "Vietnamese L1 3-Minute Diagnostic Pronunciation Screener: Bộ 5 Câu Chẩn Đoán Toàn Diện Bẫy Thổ Âm",
      "persona": "Người học tiếng Anh bắt đầu hành trình với VietPhonics muốn biết chính xác mình đang mắc những lỗi gì",
      "action": "đọc lần lượt 5 câu chẩn đoán được thiết kế chuyên biệt để kích hoạt tất cả các bẫy ngữ âm tiếng Việt",
      "value": "nhận bản báo cáo phân tích âm học đồng cảm bằng tiếng Việt chỉ sau 3 phút, chỉ rõ Top 3 tật phát âm cần triệt tiêu và lộ trình 7 ngày sửa dứt điểm",
      "priority": "must",
      "status": "in-progress",
      "size": "XL",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-vn-102-sentences",
          "given": "Học viên mở modal Chẩn đoán L1 (DiagnosticModal)",
          "when": "Bắt đầu bài kiểm tra 5 câu",
          "then": "Hệ thống hiển thị lần lượt 5 câu kích hoạt bẫy âm: 1) \"Six months ago, she baked fresh bread...\", 2) \"They think that the comfortable clothes...\", 3) \"World health experts published guidelines...\", 4) \"Please take a look at the statistics...\", 5) \"She usually watches television...\".",
          "completed": true
        },
        {
          "id": "ac-vn-102-recorder",
          "given": "Học viên ghi âm từng câu",
          "when": "Nhấn nút mic hoặc phím Space",
          "then": "Hệ thống thu âm chuẩn 16kHz mono, hiển thị trạng thái sóng âm, tự động chuyển câu tiếp theo khi hoàn tất hoặc cho phép thu âm lại nếu bị ồn.",
          "completed": true
        },
        {
          "id": "ac-vn-102-report",
          "given": "Học viên hoàn thành đủ 5 câu kiểm tra",
          "when": "Hệ thống chạy thuật toán tổng hợp",
          "then": "Hiển thị màn hình báo cáo hoàn chỉnh với: Điểm GOP tổng thể, Bảng quy đổi IELTS/CEFR/TOEIC, Top 3 thói quen cần khắc phục (1. Rụng âm đuôi /ks/, /st/; 2. Kẹp lưỡi cho /θ/, /ð/; 3. Nhấn trọng âm rơi nhịp thay vì đánh dấu sắc/huyền tiếng Việt), và 4 điểm số trụ cột L1.",
          "completed": true
        },
        {
          "id": "ac-vn-102-scale-5000",
          "given": "Cao điểm có 5,000 học viên cùng làm bài chẩn đoán đầu vào",
          "when": "Gửi dữ liệu âm thanh phân tích",
          "then": "Quá trình trích xuất phổ âm FFT và phân tích âm học được thực thi trực tiếp trên Web Audio API của trình duyệt người dùng; backend chỉ tiếp nhận telemetry điểm số, chịu tải 5,000 users với mức sử dụng CPU máy chủ dưới 20%.",
          "completed": true
        },
        {
          "id": "ac-vn-102-ui",
          "given": "Modal chẩn đoán hiển thị trên thiết bị",
          "when": "Người dùng tương tác",
          "then": "Giao diện modal sang trọng, backdrop mờ hiện đại `backdrop-blur-sm bg-slate-900/60`, các bước tiến trình hiển thị rõ ràng (Câu 1/5), nút đóng modal nhanh, không bị khóa cứng trình duyệt.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-vn-102-modal",
          "title": "Xây dựng DiagnosticModal.jsx với quy trình 5 bước thu âm và màn hình kết quả chuyên sâu",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-vn-102-sentences",
          "title": "Biên soạn 5 câu kiểm tra kích hoạt 100% các bẫy âm: /ks/, /nθs/, -ed /t/, /θ/, /ð/, /ʃ/, /ʒ/, linking",
          "category": "Phonetics",
          "completed": true
        },
        {
          "id": "t-vn-102-report-logic",
          "title": "Hiện thực hóa thuật toán tổng hợp điểm GOP và phân loại mức độ nghiêm trọng severity: high/medium",
          "category": "Algorithm",
          "completed": true
        },
        {
          "id": "t-vn-102-scale",
          "title": "Kiểm thử khả năng xử lý đồng thời 5,000 phiên thu âm trên client không rò rỉ bộ nhớ (memory leak)",
          "category": "Performance",
          "completed": true
        },
        {
          "id": "t-vn-102-qa",
          "title": "Kiểm tra độ chính xác của phản hồi tiếng Việt mang tính đồng cảm, tạo động lực cho học viên",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 UI/UX Design Specifications\n- **Màn hình tham chiếu**: `src/ui-reference/b_ng_ch_n_o_n_m_l1_ti_ng_vi_t_light_mode/code.html`\n- **React Component**: `vietphonics-app/src/components/DiagnosticModal.jsx`\n- **Design Tokens**: `max-w-2xl, rounded-3xl, p-6 sm:p-8, shadow-2xl`\n- **Typography**: Headline `Plus Jakarta Sans font-extrabold`, Phoneme details `JetBrains Mono`\n\n### ⚡ Khả Năng Xử Lý Đồng Thời 5,000 Users\n- **In-Browser Acoustic Processing**: Toàn bộ việc thu âm và phân tích phổ âm thanh 16kHz diễn ra trong trình duyệt học viên thông qua `useRecorder.js`. Máy chủ trung tâm không phải xử lý hàng nghìn luồng âm thanh raw streaming cùng lúc, đảm bảo hệ thống chịu tải mượt mà cho 5,000 người dùng.",
      "createdAt": "2026-09-30T17:32:40.700Z"
    },
    {
      "id": "VN-103",
      "epicId": "epic-prosody",
      "title": "Syllable Stress vs. Tone Mark Visualizer & Schwa De-Toner: Bộ Lọc Khử Dấu Sắc/Huyền Tiếng Việt",
      "persona": "Người Việt Nam có phản xạ gắn 6 dấu thanh điệu tiếng Việt (sắc, huyền, hỏi, ngã, nặng, ngang) vào nguyên âm tiếng Anh",
      "action": "luyện phát âm nguyên âm yếu không nhấn trọng âm (Schwa /ə/) trong các từ như \"banana\", \"comfortable\", \"computer\"",
      "value": "bộ trực quan hóa so sánh nhịp điệu phát hiện và cảnh báo việc đánh dấu thanh, hướng dẫn người học hạ thấp và rút ngắn nguyên âm Schwa về trạng thái thả lỏng tự nhiên",
      "priority": "must",
      "status": "in-progress",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-vn-103-detoner",
          "given": "Từ có nguyên âm Schwa yếu (ví dụ âm /ə/ trong \"comfortable\")",
          "when": "Học viên phát âm thành 4 âm tiết có dấu thanh bằng phẳng (\"com-phơ-tờ-bồ\")",
          "then": "Hệ thống nhận diện trường độ âm tiết bằng nhau, hiển thị cảnh báo: \"Lỗi Đánh Dấu Thanh L1! Rút ngắn và thả lỏng nguyên âm không nhấn thành âm Schwa /ə/\".",
          "completed": true
        },
        {
          "id": "ac-vn-103-rhythm",
          "given": "Học viên kéo dài âm tiết có trọng âm > 2 lần so với âm Schwa không trọng âm",
          "when": "Mô hình phân tích nhịp điệu (Stress-Timed Rhythm Metric)",
          "then": "Chỉ số nhịp điệu sáng xanh lá với thông điệp: \"Đạt chuẩn nhịp điệu Stress-Timed tự nhiên (+10 Bonus Rhythm Score)\".",
          "completed": true
        },
        {
          "id": "ac-vn-103-ui",
          "given": "Giao diện hiển thị trực quan",
          "when": "Render bảng thông số Schwa De-Toner",
          "then": "Hiển thị ký hiệu ngữ âm Schwa /ə/ to rõ trong khung viền Sky mờ tinh tế, biểu tượng micro-interaction nhấp nháy khi phát hiện dấu thanh tiếng Việt.",
          "completed": true
        },
        {
          "id": "ac-vn-103-scale-5000",
          "given": "5,000 học viên cùng lúc phân tích tỷ lệ Schwa",
          "when": "Hệ thống xử lý tính toán",
          "then": "Thời gian trích xuất tỷ lệ trường độ nguyên âm chỉ mất dưới 5ms trên client; không yêu cầu thêm kết nối mạng.",
          "completed": true
        },
        {
          "id": "ac-vn-103-a11y",
          "given": "Học viên cần giải thích dễ hiểu bằng tiếng Việt",
          "when": "Nhấp vào nút hướng dẫn âm Schwa",
          "then": "Hiển thị giải thích giải phẫu đơn giản: \"Âm Schwa /ə/ là âm lười nhất trong tiếng Anh: cơ môi thả lỏng, hàm hơi mở nhẹ, phát âm thoáng qua như tiếng 'ơ' cực nhẹ\".",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-vn-103-metric",
          "title": "Xây dựng thước đo nhịp điệu Pairwise Variability Index (PVI) chuẩn ngôn ngữ học",
          "category": "Algorithm",
          "completed": true
        },
        {
          "id": "t-vn-103-ui",
          "title": "Thiết kế thẻ trực quan hóa Schwa De-Toner trong PracticeStudioView",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-vn-103-audio",
          "title": "Thêm bài tập mẫu so sánh âm Schwa chuẩn vs âm bị đánh dấu thanh tiếng Việt",
          "category": "Audio/DSP",
          "completed": true
        },
        {
          "id": "t-vn-103-scale",
          "title": "Tối ưu hóa hiệu năng tính toán ma trận độ biến thiên trường độ nguyên âm",
          "category": "Performance",
          "completed": true
        },
        {
          "id": "t-vn-103-qa",
          "title": "Kiểm thử phản xạ âm Schwa trên 20 từ thông dụng bị người Việt phát âm sai nhiều nhất",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 UI/UX Design Specifications\n- **Màn hình tham chiếu**: `src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html`\n- **React Component**: `vietphonics-app/src/views/PracticeStudioView.jsx`\n\n### 🔬 Cơ Sở Ngôn Ngữ Học So Sánh L1\n- Tiếng Việt là ngôn ngữ đẳng thời âm tiết (Syllable-timed) có thanh điệu; mỗi âm tiết có độ dài và độ cao thanh điệu riêng.\n- Tiếng Anh là ngôn ngữ đẳng thời trọng âm (Stress-timed); các âm tiết không nhấn bị rút ngắn tối đa thành nguyên âm trung tính Schwa /ə/.\n- VN-103 giúp người học Việt Nam chuyển đổi tư duy từ \"đọc từng âm có dấu\" sang \"nhấn trọng âm dứt khoát và lướt qua âm phụ\".",
      "createdAt": "2026-09-30T17:32:40.700Z"
    },
    {
      "id": "VN-104",
      "epicId": "epic-roleplay-ielts",
      "title": "IELTS Speaking Part 1 & 2 AI Mock Examiner for Vietnamese Candidates: Giám Khảo Mô Phỏng IELTS Chuyên Sâu",
      "persona": "Thí sinh luyện thi IELTS tại Việt Nam cần cọ xát với giám khảo bản ngữ bấm giờ chuẩn phòng thi thật",
      "action": "chọn chế độ IELTS Mock Examiner và trả lời các chủ đề Part 1 (phỏng vấn ngắn) hoặc Part 2 (thuyết trình 2 phút cue card)",
      "value": "nhận điểm số chi tiết theo 4 tiêu chí chấm thi của IDP/BC (Pronunciation, Fluency & Coherence, Lexical Resource, Grammatical Range) và lời khuyên cụ thể để bứt phá từ Band 6.0 lên Band 7.0+",
      "priority": "must",
      "status": "in-progress",
      "size": "XL",
      "points": 13,
      "acceptanceCriteria": [
        {
          "id": "ac-vn-104-exam",
          "given": "Chủ đề thi IELTS Speaking Part 2 Cue Card",
          "when": "Học viên nói liên tục trong 1 đến 2 phút",
          "then": "Hệ thống đo đạc thời gian, tính toán điểm tiêu chí Phát Âm (Pronunciation Band), phân tích độ mượt mà khi nối từ (Chunking & Linking), và bắt các lỗi phát âm làm giảm tính dễ hiểu (Intelligibility).",
          "completed": true
        },
        {
          "id": "ac-vn-104-advice",
          "given": "Báo cáo thi thử hoàn tất",
          "when": "Màn hình phân tích hiển thị",
          "then": "Cung cấp lộ trình bứt phá chi tiết: \"Để nâng từ Band 6.0 lên Band 7.0+: Cần duy trì ngữ điệu linh hoạt ở cuối câu phức, khắc phục hiện tượng nuốt âm đuôi phụ âm tắc và nhấn đúng trọng âm của các từ học thuật\".",
          "completed": true
        },
        {
          "id": "ac-vn-104-ui",
          "given": "Giao diện thi thử IELTS",
          "when": "Render trên màn hình",
          "then": "Hiển thị đồng hồ bấm giờ đếm ngược 02:00, thẻ Cue Card đóng khung chuẩn kỳ thi quốc tế, giao diện trang nhã chuẩn học thuật.",
          "completed": true
        },
        {
          "id": "ac-vn-104-scale-5000",
          "given": "5,000 thí sinh cùng lúc thi thử IELTS trong đợt ôn thi cao điểm",
          "when": "Hệ thống ghi nhận bài thi nói",
          "then": "File ghi âm được nén thành Opus 16kbps siêu nhẹ hoặc xử lý trực tiếp trên client, hàng đợi phân tích ielts_evaluation_queue điều phối nhịp nhàng không gây nghẽn cổ chai.",
          "completed": true
        },
        {
          "id": "ac-vn-104-a11y",
          "given": "Thí sinh cần nghe lại giọng nói của mình",
          "when": "Bấm nút \"Nghe lại bài nói\"",
          "then": "Phát lại toàn bộ bản ghi âm kèm highlight dòng chữ transcript đồng bộ theo giọng nói.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-vn-104-cuecard",
          "title": "Xây dựng ngân hàng 50 chủ đề IELTS Speaking Part 1 & 2 bám sát đề thi thật 2026",
          "category": "Content",
          "completed": true
        },
        {
          "id": "t-vn-104-scoring",
          "title": "Hiện thực hóa thuật toán chấm điểm theo 4 tiêu chí IELTS Descriptors chính thức",
          "category": "Algorithm",
          "completed": true
        },
        {
          "id": "t-vn-104-timer",
          "title": "Tích hợp đồng hồ đếm ngược 1 phút chuẩn bị và 2 phút nói chuẩn quy chế thi",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-vn-104-scale",
          "title": "Tối ưu hóa nén âm thanh định dạng Opus giúp tiết kiệm 80% băng thông cho 5,000 users",
          "category": "DevOps",
          "completed": true
        },
        {
          "id": "t-vn-104-qa",
          "title": "Đối chiếu kết quả chấm điểm của AI với điểm chấm của 5 giám khảo IELTS người bản xứ",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 UI/UX Design Specifications\n- **React Component**: `vietphonics-app/src/views/RoleplayView.jsx` (IELTS Examiner Mode)",
      "createdAt": "2026-09-30T17:32:40.700Z"
    },
    {
      "id": "VN-105",
      "epicId": "epic-articulation",
      "title": "Vietnamese Native-Tongue Mouth & Tongue Placement Coach: Huấn Luyện Khẩu Hình Empathy Cho Người Việt",
      "persona": "Người Việt Nam gặp khó khăn với các cử động cơ miệng không tồn tại trong tiếng mẹ đẻ",
      "action": "xem các thẻ hướng dẫn mẹo đặt lưỡi mang tính đồng cảm cao (Empathy Placement Cards) so sánh trực tiếp với tiếng Việt",
      "value": "hiểu mẹo cấu âm qua các hình ảnh ẩn dụ gần gũi (như \"cắn nhẹ đầu đũa\", \"giữ cuống lưỡi như khi ngậm nước muối\"), giúp vượt qua rào cản cơ bắp tự nhiên",
      "priority": "must",
      "status": "in-progress",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-vn-105-cards",
          "given": "Màn hình MouthAnatomyView",
          "when": "Học viên xem phần mẹo đặt lưỡi L1",
          "then": "Hiển thị 3 thẻ mẹo cấu âm đồng cảm: 1) Cố định cuống lưỡi không kéo thụt về họng, 2) Thả lỏng khóe môi tránh cười bẹt mép quá đà, 3) Kiểm soát luồng hơi qua kẽ răng không tạo âm rít chói tai.",
          "completed": true
        },
        {
          "id": "ac-vn-105-ui",
          "given": "Giao diện hiển thị",
          "when": "Render trên màn hình",
          "then": "Các thẻ được thiết kế với viền bo góc rounded-xl, icon minh họa sinh động, văn bản tiếng Việt tự nhiên, ấm áp, tạo cảm giác được thấu hiểu thay vì phán xét.",
          "completed": true
        },
        {
          "id": "ac-vn-105-scale-5000",
          "given": "5,000 học viên cùng xem hướng dẫn khẩu hình",
          "when": "Tải trang",
          "then": "Nội dung tĩnh được cache 100% tại CDN Edge, thời gian tải trang dưới 30ms trên mạng di động.",
          "completed": true
        },
        {
          "id": "ac-vn-105-l1",
          "given": "Học viên thắc mắc tại sao người Việt hay nuốt âm /θ/",
          "when": "Đọc giải thích giải phẫu",
          "then": "Chỉ rõ: \"Tiếng Việt không có âm kẹp răng. Cơ lưỡi của bạn đã quen nằm gọn trong miệng suốt 20 năm, nên việc đưa lưỡi ra ngoài cần vài ngày tập luyện để cơ quen vị trí mới\".",
          "completed": true
        },
        {
          "id": "ac-vn-105-a11y",
          "given": "Người dùng hỗ trợ công nghệ đọc màn hình",
          "when": "Đọc qua 3 thẻ",
          "then": "Nội dung được cấu trúc với các thẻ tiêu đề ngữ nghĩa h3, h4 rõ ràng, hỗ trợ phím Tab điều hướng tuần tự.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-vn-105-ui",
          "title": "Thiết kế 3 thẻ Empathy Placement Cards trong MouthAnatomyView",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-vn-105-copy",
          "title": "Biên soạn nội dung giải thích mẹo cấu âm tâm lý và sinh học cho người Việt",
          "category": "Content",
          "completed": true
        },
        {
          "id": "t-vn-105-scale",
          "title": "Đảm bảo thời gian nạp trang tức thời không có layout shift",
          "category": "Performance",
          "completed": true
        },
        {
          "id": "t-vn-105-qa",
          "title": "Khảo sát độ dễ hiểu của hướng dẫn trên nhóm 20 học viên thực tế",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 UI/UX Design Specifications\n- **Màn hình tham chiếu**: `src/ui-reference/kh_u_h_nh_2d_gi_i_ph_u_c_mi_ng_light_mode/code.html`\n- **React Component**: `vietphonics-app/src/views/MouthAnatomyView.jsx`",
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
          "id": "ac-game-101-ui",
          "given": "Giao diện bản đồ thế giới phiêu lưu GamifiedView",
          "when": "Render trên màn hình máy tính hoặc điện thoại di động",
          "then": "Bản đồ hiển thị 4 quần xã sinh thái độc đáo (Biển ngọc, Thung lũng xanh, Núi lửa tím, Đền cổ vàng kim) theo phong cách Isometric mượt mà, các node ải có hoạt ảnh nhấp nhô floating 60fps, viền sao gradient, huy hiệu tiến độ % hoàn thành thế giới hiển thị rõ trên thanh header.",
          "completed": true
        },
        {
          "id": "ac-game-101-scale-5000",
          "given": "5,000 người chơi đồng thời di chuyển trên bản đồ và mở khóa ải",
          "when": "Đồng bộ hóa dữ liệu tiến trình chơi game lên máy chủ",
          "then": "Dữ liệu tiến trình ải được lưu tức thời vào LocalStorage client-side và đồng bộ ngầm (optimistic update + debounced batch POST 5s) qua REST endpoint; Redis cache lưu giữ map layout static JSON với TTL 24h, P95 độ trễ truy vấn tiến độ < 80ms.",
          "completed": true
        },
        {
          "id": "ac-game-101-l1",
          "given": "Ải bài học thuộc Thế giới 2: Vịnh Âm Đuôi (Consonant Haven)",
          "when": "Người chơi mở chi tiết ải",
          "then": "Nhiệm vụ ải ghi rõ tiêu chuẩn diệt quái: \"Vượt qua thử thách phân biệt âm cuối /t/ vs /d/ và /s/ vs /z/ của người Việt\", kèm gợi ý mẹo rung thanh quản trước khi vào trận.",
          "completed": true
        },
        {
          "id": "ac-game-101-a11y",
          "given": "Người dùng điều hướng bằng bàn phím hoặc công nghệ hỗ trợ",
          "when": "Dùng phím Tab hoặc mũi tên trên bàn phím",
          "then": "Focus outline màu hồng rose-500 nhảy mượt qua từng node ải, thông báo rõ ràng \"Ải 3: Đã mở khóa - Đạt 2 trên 3 sao - Nhấn Enter để bắt đầu\", hỗ trợ phím tắt số 1-4 để chuyển đổi nhanh giữa 4 thế giới.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-game-101-map",
          "title": "Xây dựng component GameMapCanvas hiển thị 4 thế giới sinh thái và các node ải kết nối bằng SVG Bezier curve",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-game-101-sync",
          "title": "Triển khai cơ chế lưu tiến trình song song LocalStorage và REST sync API với cơ chế chống xung đột timestamp",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-game-101-cache",
          "title": "Thiết lập Redis hash lưu user_game_progress_5000_v1 cho 5,000 active users với tốc độ đọc < 5ms",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-game-101-perf",
          "title": "Tối ưu hóa render SVG và WebGL đảm bảo zero-CLS và duy trì 60 FPS trên thiết bị di động tầm trung",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-game-101-qa",
          "title": "Viết bộ kiểm thử tự động kiểm tra logic mở khóa tuần tự 40 ải và xử lý ngoại lệ mất mạng khi đang chơi",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 UI/UX Design System Specifications\n- **Màn hình tham chiếu**: `vietphonics-app/src/views/GamifiedView.jsx`\n- **Palette màu thế giới**:\n  - World 1 (Vowels Island): Emerald Emerald-500 (`#10b981`) & Teal-400 (`#2dd4bf`)\n  - World 2 (Final Sounds Bay): Sky-500 (`#0ea5e9`) & Indigo-500 (`#6366f1`)\n  - World 3 (Stress Peaks): Rose-500 (`#f43f5e`) & Orange-500 (`#f97316`)\n  - World 4 (Fluency Temple): Amber-400 (`#fbbf24`) & Violet-600 (`#7c3aed`)\n- **Node State Design**:\n  - Locked: Background slate-800, biểu tượng ổ khóa bạc, opacity 60%\n  - Unlocked: Background white, viền sáng gradient pulse, 3 ô sao rỗng\n  - Mastered: Background amber-500, 3 sao vàng đổ bóng rực rỡ, hạt particle hào quang bay xung quanh\n- **5,000 Concurrent Users Architecture**:\n  - Level maps config được phân phối tĩnh qua Cloudflare CDN cache-control max-age=86400.\n  - Client state machine xác định unlock state mà không cần gọi API blocking roundtrip.",
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
          "id": "ac-game-102-ui",
          "given": "Giao diện bảng điều khiển âm thanh game HUD",
          "when": "Micro bắt đầu thu âm",
          "then": "Nút micro tròn trung tâm tỏa sóng radar gradient Rose-Sky, đồng hồ đo decibel dB thời gian thực nhảy múa sống động, hiển thị trạng thái \"Đang lắng nghe: Hãy nói rõ âm /t/!\" với font chữ JetBrains Mono hiển thị độ trễ latency 18ms.",
          "completed": true
        },
        {
          "id": "ac-game-102-scale-5000",
          "given": "5,000 phiên thu âm diễn ra đồng thời trong các màn chơi game",
          "when": "Xử lý nhận diện và phân tích tín hiệu giọng nói",
          "then": "Toàn bộ việc nhận diện từ khóa và trích xuất đặc trưng âm thanh được xử lý cục bộ trên trình duyệt thông qua Web Speech API SpeechRecognition và Web Audio AnalyserNode, máy chủ backend chịu tải 0% CPU cho việc xử lý âm thanh thời gian thực của game.",
          "completed": true
        },
        {
          "id": "ac-game-102-l1",
          "given": "Người chơi phát âm từ \"cat\" nhưng nói thành \"cát\" (thiếu âm bật hơi /t/)",
          "when": "Bộ phân tích kiểm tra đặc trưng âm học",
          "then": "Chiêu thức bắn ra bị giảm 50% sát thương (Glancing Hit), trên màn hình hiển thị lời nhắc chiến thuật: \"Thiếu âm đuôi /t/! Bật đầu lưỡi vào vòm họng để tung đòn chí mạng (Critical Hit)!\".",
          "completed": true
        },
        {
          "id": "ac-game-102-a11y",
          "given": "Người chơi bị khiếm thính hoặc gặp lỗi cấp quyền micro",
          "when": "Trình duyệt từ chối quyền truy cập micro",
          "then": "Hệ thống hiển thị banner lịch sự kèm nút chuyển ngay sang chế độ \"Bàn phím + Máy tạo âm ảo (Voice Synthesizer Fallback)\" cho phép chơi game luyện mắt và nhận diện ngữ âm mà không bị khóa tính năng.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-game-102-webaudio",
          "title": "Tích hợp Web Audio API AnalyserNode tính toán RMS decibel và Pitch trực tiếp trên AudioContext",
          "category": "Audio/DSP",
          "completed": true
        },
        {
          "id": "t-game-102-speech",
          "title": "Xây dựng hook useGameSpeechRecognition với khả năng tự phục hồi (auto-reconnect) khi Web Speech API bị drop",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-game-102-sim",
          "title": "Phát triển bộ giả lập VoiceSimulator phát sóng sine và gửi mock transcript hỗ trợ kiểm thử không cần micro",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-game-102-scale",
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
      "notes": "### 🎨 UI/UX Design System Specifications\n- **React Component**: `vietphonics-app/src/components/game/VoiceController.jsx`\n- **Visual Gauges**:\n  - RMS Meter: Dải 16 thanh led gradient từ xanh lá (#10b981) -> vàng (#f59e0b) -> đỏ (#ef4444)\n  - Latency Badge: Chip nhỏ góc phải hiển thị `<120ms WebAudio` bằng font JetBrains Mono viền slate-700\n- **Fallback Simulation Drawer**: Panel trượt ẩn có thể kích hoạt bằng tổ hợp phím Ctrl+Shift+S hoặc nút icon cờ lê để chạy automated tests.",
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
          "id": "ac-game-103-ui",
          "given": "Giao diện đấu trường Boss Arena View",
          "when": "Trận chiến bắt đầu",
          "then": "Thanh máu Boss hoành tráng đỏ rực rỡ có hiệu ứng rung lắc (screen shake) khi nhận sát thương, nhân vật người chơi hiển thị thanh mana xanh lam, thẻ bài ma thuật có viền kính mờ glassmorphism bo tròn góc 16px và âm thanh vung kiếm/bắn phép chân thực.",
          "completed": true
        },
        {
          "id": "ac-game-103-scale-5000",
          "given": "Hàng ngàn trận Boss diễn ra đồng thời trong giờ cao điểm",
          "when": "Hệ thống tải tài nguyên âm thanh và hoạt ảnh trận đánh",
          "then": "Toàn bộ âm thanh trận đánh (tiếng trùm gầm, tiếng phép thuật, mẫu phát âm bản ngữ HD) được nén chuẩn Opus bitrate 48kbps và nạp sẵn vào trình duyệt qua HTML5 Audio Buffer Cache, không phát sinh bất kỳ yêu cầu mạng nào giữa trận đánh.",
          "completed": true
        },
        {
          "id": "ac-game-103-l1",
          "given": "Cặp âm đối kháng nhắm vào lỗi phổ biến nhất của người Việt",
          "when": "Trùm tung chiêu cặp âm /iː/ (căng) vs /ɪ/ (chùng) hoặc /s/ vs /ʃ/",
          "then": "Hệ thống hiển thị kính lúp âm học giải thích ngay sau mỗi lượt đánh: \"Từ vừa nghe có nguyên âm dài /iː/ kéo dài 220ms, miệng kéo bè sang hai bên như đang mỉm cười\".",
          "completed": true
        },
        {
          "id": "ac-game-103-a11y",
          "given": "Người chơi sử dụng phím số để chọn bài",
          "when": "Bấm phím 1 hoặc 2 trên bàn phím",
          "then": "Hệ thống nhận diện phím bấm ngay lập tức mà không cần di chuột, hỗ trợ chế độ làm chậm nhịp độ trận đấu (Slow-Motion Combat Mode) cho người mới bắt đầu.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-game-103-arena",
          "title": "Xây dựng component BossArenaView với hệ thống animation thanh máu, rung màn hình (shake effect) và thẻ bài ma thuật",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-game-103-audio",
          "title": "Tiền tải (Preload) toàn bộ ngân hàng âm thanh cặp từ tối thiểu Minimal Pairs Audio Kit với Web Audio API",
          "category": "Audio/DSP",
          "completed": true
        },
        {
          "id": "t-game-103-rules",
          "title": "Xây dựng State Machine quản lý các pha của trận đấu (Intro -> Boss Cast -> Player Decision -> Combat Resolution)",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-game-103-scale",
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
      "notes": "### 🎨 UI/UX Design System Specifications\n- **Màn hình tham chiếu**: `src/ui-reference/boss_arena_minimal_pair_dark_mode/code.html`\n- **React Component**: `vietphonics-app/src/views/BossArenaView.jsx`\n- **Boss Visual Style**:\n  - The Final-T Titan: Robot đá khổng lồ phong cách Cyberpunk, mắt phát sáng đỏ rực\n  - HP Bar: Dải gradient Rose-600 sang Amber-400 kèm số lượng máu hiển thị bằng phông JetBrains Mono\n  - Card Flip Effect: Hiệu ứng lật 3D CSS `transform-style: preserve-3d` khi người chơi chọn bài phản đòn.",
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
          "id": "ac-game-104-ui",
          "given": "Khung canvas đồ họa trận đánh 3D Isometric",
          "when": "Render liên tục bằng requestAnimationFrame",
          "then": "Khung hình duy trì ổn định 60 khung hình/giây (60 FPS), các hạt particle sao vàng bay tỏa ra từ mục tiêu và rơi xuống mượt mà không gây giật lag hay rò rỉ bộ nhớ (zero memory leak).",
          "completed": true
        },
        {
          "id": "ac-game-104-scale-5000",
          "given": "5,000 phiên canvas chạy đồng thời trên hàng ngàn trình duyệt học viên",
          "when": "Kiểm tra tài nguyên máy chủ và tải CPU máy khách",
          "then": "Tài nguyên mạng backend tiêu thụ = 0 KB nhờ tạo âm thanh thủ tục (procedural synthesis); client CPU duy trì dưới 12% trên chip Intel Core i3 / Snapdragon 680 tầm trung.",
          "completed": true
        },
        {
          "id": "ac-game-104-l1",
          "given": "Âm thanh phản hồi khi học viên phát âm đúng trọng âm tiếng Anh",
          "when": "Hệ thống phát tín hiệu thành công",
          "then": "Âm sắc tổng hợp có tần số cao vút mô phỏng sự vươn cao của cao độ trọng âm (High Pitch Rise), củng cố nhận thức giác quan về bản chất ngữ điệu tiếng Anh.",
          "completed": true
        },
        {
          "id": "ac-game-104-a11y",
          "given": "Người chơi bị nhạy cảm ánh sáng (photosensitive) hoặc muốn tắt âm thanh",
          "when": "Bật toggle \"Chế độ giảm hiệu ứng (Reduced Motion)\" hoặc \"Tắt tiếng SFX\"",
          "then": "Hệ thống tắt toàn bộ hạt nổ chớp sáng và ngắt audio context ngay lập tức, tuân thủ tiêu chuẩn WCAG 2.1 AAA.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-game-104-synth",
          "title": "Xây dựng module SoundSynthesizer.js sử dụng Web Audio API OscillatorNode cho 8 loại hiệu ứng game SFX",
          "category": "Audio/DSP",
          "completed": true
        },
        {
          "id": "t-game-104-canvas",
          "title": "Tối ưu hóa vòng lặp render Isometric Canvas với cơ chế Object Pooling tái sử dụng mảng Particle",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-game-104-safari",
          "title": "Xử lý chính sách âm thanh autoplay và mở khóa AudioContext trên Safari iOS khi người dùng chạm màn hình lần đầu",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-game-104-scale",
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
      "notes": "### 🎨 UI/UX Design System Specifications\n- **Mã nguồn Synthesizer**: `vietphonics-app/src/utils/soundEffects.js`\n- **Thuật toán sóng âm Procedural**:\n  - Coin pickup: Sóng Sine tần số nhảy từ 987.77Hz (B5) lên 1318.51Hz (E6) trong 80ms\n  - Hit impact: Sóng Sawtooth tần số trượt từ 150Hz xuống 40Hz kèm dải lọc Low-pass filter\n  - Victory Fanfare: Hợp âm Đô trưởng (C-E-G-C) chơi liên hoàn 4 nốt arpeggio\n- **Canvas Isometric**: Góc chiếu 30 độ chuẩn game chiến thuật cổ điển, khử răng cưa (image-rendering: crisp-edges).",
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
          "id": "ac-game-105-ui",
          "given": "Giao diện Bảng Xếp Hạng Liên Trường (University Leaderboard View)",
          "when": "Mở tab Bảng Xếp Hạng",
          "then": "Top 3 trường đại học dẫn đầu hiển thị trên bục vinh quang 3D hoành tráng (Hạng 1: Vàng kim rực rỡ, Hạng 2: Bạc lấp lánh, Hạng 3: Đồng cổ điển), logo các trường đại học lớn tại Việt Nam hiển thị sắc nét, thanh tiến độ điểm trường của người dùng được ghim cố định ở đáy màn hình.",
          "completed": true
        },
        {
          "id": "ac-game-105-scale-5000",
          "given": "5,000 học viên liên tục ghi điểm XP từ các bài luyện phát âm",
          "when": "Cập nhật bảng xếp hạng trường học và cá nhân theo thời gian thực",
          "then": "Sử dụng cấu trúc dữ liệu Redis Sorted Sets (`ZADD`, `ZREVRANGEBYSCORE`) với độ phức tạp thuật toán O(log(N)), đảm bảo tính toán thứ hạng cho 5,000 học viên và 100 trường học trong thời gian dưới 20ms mà không gây nghẽn database PostgreSQL chính.",
          "completed": true
        },
        {
          "id": "ac-game-105-l1",
          "given": "Trang bị vật phẩm \"Kính Lúp Cấu Âm (Phoneme Lens)\"",
          "when": "Người chơi vào các bài luyện âm khó như /θ/ hay /ð/",
          "then": "Túi đồ tự động kích hoạt Perk đặc biệt: Làm chậm tốc độ mẫu phát âm của người bản ngữ 20% và phóng to hình ảnh khẩu hình lưỡi đặt giữa hai hàm răng.",
          "completed": true
        },
        {
          "id": "ac-game-105-a11y",
          "given": "Người dùng tra cứu vị trí thứ hạng của mình",
          "when": "Sử dụng trình đọc màn hình TalkBack/NVDA",
          "then": "Hệ thống đọc rõ: \"Bạn đang xếp hạng 14 trên 5,000 sinh viên Đại học Bách Khoa Hà Nội, cần thêm 120 điểm XP để lên hạng 13\".",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-game-105-leaderboard",
          "title": "Xây dựng giao diện LeaderboardView với bục vinh quang Podium Top 3 và danh sách bảng xếp hạng liên trường",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-game-105-inventory",
          "title": "Thiết kế hệ thống Inventory và Perk Store với Modal mua đồ và trang bị vật phẩm trực quan",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-game-105-redis",
          "title": "Triển khai Redis Sorted Sets leaderboard service cho 5,000 users với background cron sync về PostgreSQL mỗi 5 phút",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-game-105-scale",
          "title": "Tối ưu hóa truy vấn phân trang bảng xếp hạng với Redis ZREVRANGE kết hợp ETag caching 60s",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-game-105-qa",
          "title": "Kiểm thử kịch bản đồng thời 500 sinh viên nộp điểm XP cùng lúc xem bảng xếp hạng có cập nhật chính xác",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 UI/UX Design System Specifications\n- **Màn hình tham chiếu**: `src/ui-reference/gamified_duolingo_style_vietnamese_accent_mastery/code.html`\n- **React Component**: `vietphonics-app/src/views/LeaderboardView.jsx`\n- **Podium Visual Styling**:\n  - Rank 1: Chiều cao 140px, gradient `from-amber-400 to-yellow-600`, vương miện 3D vàng kim nhấp nhô\n  - Rank 2: Chiều cao 110px, gradient `from-slate-300 to-slate-500`\n  - Rank 3: Chiều cao 90px, gradient `from-amber-700 to-yellow-800`\n- **Redis High-Concurrency Pattern**:\n  - Key cá nhân: `leaderboard:global:weekly` (Sorted Set)\n  - Key theo trường: `leaderboard:university:weekly` (Sorted Set, điểm trường = tổng XP top 50 sinh viên của trường).",
      "createdAt": "2026-09-30T17:50:58.697Z"
    },
    {
      "id": "ELSA-102",
      "epicId": "epic-diagnostic",
      "title": "Native Language (L1) Regional Dialect Calibration: Hiệu Chuẩn Bù Trừ Thổ Âm 3 Miền Bắc - Trung - Nam",
      "persona": "Người học tiếng Anh bản xứ Việt Nam thuộc các vùng thổ âm khác nhau (Bắc, Trung, Nam)",
      "action": "chọn vùng thổ âm gốc trong cài đặt hồ sơ (Hà Nội, Miền Trung/Huế-Đà Nẵng, Miền Nam/Sài Gòn) trước khi bắt đầu luyện phát âm",
      "value": "hệ thống AI tự động điều chỉnh ma trận trọng số âm học (acoustic prior offsets), không phạt oan các biến thể phương ngữ tự nhiên mà tập trung can thiệp chính xác vào lỗi cản trở giao tiếp",
      "priority": "must",
      "status": "in-progress",
      "size": "L",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-elsa-102-func",
          "given": "Học viên truy cập phần cài đặt hồ sơ hoặc thanh điều hướng Navbar",
          "when": "Học viên chuyển đổi vùng thổ âm L1 giữa: Miền Bắc (/d/ ➔ /z/, /t/ ending), Miền Trung (/e/-/ɛ/ tonal pitch), Miền Nam (/v/ ➔ /j/, dropped -k/-t)",
          "then": "Hệ thống cập nhật tức thì dialect context toàn cục, hiển thị huy hiệu xác nhận, và thay đổi ngưỡng phạt decoding mà không cần tải lại trang.",
          "completed": true
        },
        {
          "id": "ac-elsa-102-ui",
          "given": "Giao diện hiển thị trên mọi độ phân giải màn hình từ Mobile (360px) đến 4K (2560px)",
          "when": "Học viên mở menu chọn Dialect Adaptation",
          "then": "Giao diện áp dụng chuẩn Google Stitch tokens: font Plus Jakarta Sans tiêu đề, JetBrains Mono cho thông số acoustic prior, màu Sky #0284c7 làm điểm nhấn, dropdown có animation mượt mà, bóng đổ shadow-[0_12px_32px_rgba(15,23,42,0.12)], không bị vỡ layout hay tràn ngang (zero CLS).",
          "completed": true
        },
        {
          "id": "ac-elsa-102-scale-5000",
          "given": "Hệ thống đang phục vụ đồng thời 5,000 học viên trực tuyến (concurrent users)",
          "when": "5,000 phiên học gửi yêu cầu hiệu chuẩn âm học và tải cấu hình dialect song song",
          "then": "Cấu hình dialect ma trận L1 được cache trên Redis Cluster với TTL 86400s và lưu cục bộ tại LocalStorage/AppContext của client; độ trễ P99 phản hồi < 15ms, không gây tải thừa lên cơ sở dữ liệu PostgreSQL/SQLite.",
          "completed": true
        },
        {
          "id": "ac-elsa-102-l1",
          "given": "Học viên miền Bắc phát âm từ \"zoo\" (/zuː/) hoặc \"day\" (/deɪ/)",
          "when": "Mô hình ASR phân tích luồng âm thanh 16kHz",
          "then": "Hệ thống áp dụng trọng số bù trừ: phát hiện khuynh hướng trượt âm /d/ sang /z/ của giọng Bắc, đưa ra chỉ dẫn đặt đầu lưỡi sau nướu răng trên để bật âm tắc /d/ thay vì rung xát /z/.",
          "completed": true
        },
        {
          "id": "ac-elsa-102-a11y",
          "given": "Học viên sử dụng bàn phím hoặc công nghệ trợ năng màn hình (Screen Reader)",
          "when": "Điều hướng qua danh sách chọn vùng miền",
          "then": "Các phần tử có đầy đủ role=\"menuitem\", aria-selected, hỗ trợ phím mũi tên lên/xuống và phím Escape để đóng menu; tỷ lệ tương phản văn bản đạt chuẩn WCAG 2.1 AA (> 4.5:1).",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-elsa-102-fe",
          "title": "Tạo component DialectDropdown trong Navbar với animation Tailwind và lưu trữ AppContext",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-elsa-102-dsp",
          "title": "Xây dựng bảng ma trận trọng số âm học L1PriorMatrix cho 3 miền Bắc - Trung - Nam",
          "category": "Audio/DSP",
          "completed": true
        },
        {
          "id": "t-elsa-102-be",
          "title": "Thiết kế endpoint REST /api/user/dialect với validation schema Zod và cập nhật user_profiles",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-elsa-102-scale",
          "title": "Tối ưu hóa Redis caching dialect_weights:v1 và benchmark tải 5,000 req/s với k6",
          "category": "DevOps",
          "completed": true
        },
        {
          "id": "t-elsa-102-qa",
          "title": "Viết unit tests kiểm thử logic chuyển đổi vùng miền và e2e test với Playwright",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 UI/UX Design Specifications (Google Stitch Reference)\n- **Màn hình tham chiếu**: `src/ui-reference/b_ng_ch_n_o_n_m_l1_ti_ng_vi_t_light_mode/code.html`\n- **React Component**: `vietphonics-app/src/components/Navbar.jsx` & `src/context/AppContext.jsx`\n- **Design Tokens**: `space-xs (0.25rem), space-sm (0.5rem), space-md (1rem), rounded-full, rounded-xl`\n- **Bảng màu chủ đạo**: Sky Primary `#0284c7`, Emerald Active `#10b981`, Slate Text `#1e293b`, Background `#f8fafc`\n- **Typography**: Display `Plus Jakarta Sans`, Metric & Phonetics `JetBrains Mono`, IPA Symbols `Noto Sans`\n\n### ⚡ Kiến Trúc Tải Cao 5,000 Users Đồng Thời\n- **Client-Side Offloading**: Client tự động mang cấu hình ma trận dialect trong AppContext, loại bỏ hoàn toàn việc gọi API lặp lại trong mỗi câu nói.\n- **Cache Strategy**: Redis Hash key `dialect:profile:{dialect_id}` lưu giữ vector trọng số âm học, thời gian truy xuất dưới 1.2ms.\n- **Database Indexing**: B-tree index trên `user_profiles(dialect_code)` để truy vấn phân nhóm học viên theo vùng miền.\n\n### 🔬 Quy Tắc Âm Học L1 & Bù Trừ Thổ Âm\n- **Miền Bắc**: Khử thói quen đồng hóa /d/ thành /z/, rụng phụ âm tắc cuối vô thanh /t/.\n- **Miền Trung**: Khử cao độ gắt (sharp tonal rise) trên nguyên âm ngắn, hạ F0 về dải ổn định 100-180Hz.\n- **Miền Nam**: Bù trừ hiện tượng thay /v/ bằng bán nguyên âm /j/ (\"vui vẻ\" ➔ \"dui dẻ\") và rụng hoàn toàn âm đuôi -k/-t.",
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
          "id": "ac-user-101-ui",
          "given": "Giao diện DashboardView và RecordingHistoryView",
          "when": "Render trên màn hình độ phân giải từ 375px đến 4K",
          "then": "Bố cục lưới Grid linh hoạt chuẩn Google Stitch: 4 thẻ thống kê số liệu (Metric KPI cards) ở trên cùng có hiệu ứng đổ bóng thanh lịch, biểu đồ Radar chart mượt mà sử dụng SVG vector, bảng lịch sử ghi âm có bộ lọc theo điểm số (Xanh lá >80%, Vàng 60-79%, Đỏ <60%).",
          "completed": true
        },
        {
          "id": "ac-user-101-scale-5000",
          "given": "5,000 học viên đồng thời tải trang Dashboard cá nhân",
          "when": "Hệ thống tính toán các chỉ số thống kê và nạp 20 bản ghi âm gần nhất",
          "then": "Sử dụng View vật lý hóa (Materialized View) hoặc Redis caching tổng hợp điểm số định kỳ 10 phút/lần; các file audio ghi âm được phục vụ qua CDN có cache-control immutable, P95 thời gian tải toàn trang dưới 350ms.",
          "completed": true
        },
        {
          "id": "ac-user-101-l1",
          "given": "Bảng tóm tắt lỗi âm học đặc thù của người Việt",
          "when": "Học viên xem phần \"Vùng Cần Cải Thiện\"",
          "then": "Hệ thống liệt kê top 3 âm vị tiếng Anh bị ảnh hưởng nặng nhất bởi thói quen L1 tiếng Việt kèm nút \"Luyện tập ngay\" dẫn thẳng vào bài khắc phục chuyên sâu.",
          "completed": true
        },
        {
          "id": "ac-user-101-a11y",
          "given": "Học viên thao tác với bảng lịch sử ghi âm",
          "when": "Sử dụng bàn phím di chuyển giữa các dòng",
          "then": "Các nút Play/Pause âm thanh có nhãn aria-label rõ ràng: \"Phát bản ghi âm từ 'thought' thực hiện ngày 02 tháng 10 năm 2026, điểm số 88%\", hỗ trợ phím Space để bật/tắt âm thanh.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-user-101-ui",
          "title": "Xây dựng giao diện DashboardView hoàn chỉnh với 4 KPI cards, Radar Chart và bảng danh sách Audio History",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-user-101-auth",
          "title": "Tích hợp xác thực JWT an toàn kết hợp OAuth2 Google/Facebook và lưu refresh token trong HttpOnly cookie",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-user-101-db",
          "title": "Thiết kế bảng practice_sessions có quan hệ 1-N với audio_records và compound index trên (user_id, created_at DESC)",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-user-101-scale",
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
      "notes": "### 🎨 UI/UX Design System Specifications\n- **Màn hình tham chiếu**: `src/ui-reference/dashboard_ti_n_tr_nh_h_c_t_p_v_l_ch_s_thu_m/code.html`\n- **React Component**: `vietphonics-app/src/views/DashboardView.jsx`\n- **Metric Cards Layout**:\n  - Total Words Practiced: Icon Microphone xanh ngọc (`#10b981`), số đếm `font-mono font-bold text-2xl`\n  - Overall Accuracy: Icon Shield hồng rose (`#f43f5e`), điểm % kèm thanh mini bar\n  - Current Streak: Icon Fire cam hổ phách (`#f59e0b`), số ngày kèm huy hiệu\n  - Pro Status: Icon Crown tím (`#8b5cf6`), ngày hết hạn hoặc nút Nâng cấp.\n- **Audio History Table**:\n  - Cột Từ vựng, Cột Phiên âm IPA, Cột Ngày học, Cột Điểm số (Badge màu), Cột Trình phát A/B.",
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
          "then": "Hệ thống kiểm tra tức thì, hiển thị phản hồi xanh lá \"Chính xác! Từ 'six' kết thúc bằng phụ âm kép /ks/\".",
          "completed": true
        },
        {
          "id": "ac-pron-202-ui",
          "given": "Chế độ \"Chính Tả Âm Đuôi\" trong PracticeStudioView",
          "when": "Học viên chuyển chế độ",
          "then": "Khung bài tập mở ra mượt mà, ô nhập văn bản có viền rõ ràng focus:ring-2 focus:ring-rose-500, nút \"Kiểm Tra\" nổi bật, nút nghe lại âm thanh mẫu dễ bấm.",
          "completed": true
        },
        {
          "id": "ac-pron-202-scale-5000",
          "given": "5,000 học viên cùng làm bài nghe chính tả điền từ",
          "when": "Gửi kết quả kiểm tra",
          "then": "Toàn bộ logic so khớp chuỗi (string matching) và kiểm tra ký tự thực thi trực tiếp trên client JavaScript O(1); không sinh thêm request mạng về backend.",
          "completed": true
        },
        {
          "id": "ac-pron-202-l1",
          "given": "Học viên gõ thiếu âm đuôi (ví dụ gõ \"bak\" thay vì \"baked\")",
          "when": "Kiểm tra kết quả",
          "then": "Cảnh báo chỉ rõ: \"Thiếu đuôi quá khứ -ed! Trong từ 'baked', đuôi -ed đứng sau phụ âm vô thanh /k/ sẽ được phát âm là /t/\".",
          "completed": true
        },
        {
          "id": "ac-pron-202-a11y",
          "given": "Học viên sử dụng bàn phím",
          "when": "Gõ xong từ và nhấn phím Enter",
          "then": "Tự động kích hoạt hành động kiểm tra bài làm, focus giữ nguyên trên màn hình kết quả thuận tiện.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pron-202-ui",
          "title": "Xây dựng giao diện Dictation Mode trong PracticeStudioView với input và validation",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-202-rules",
          "title": "Xây dựng bộ từ điển kiểm tra các cụm âm đuôi dễ gõ sai: -ed, -s/es, -x, -th",
          "category": "Algorithm",
          "completed": true
        },
        {
          "id": "t-pron-202-scale",
          "title": "Tối ưu hóa phản hồi thời gian thực dưới 5ms khi gõ phím",
          "category": "Performance",
          "completed": true
        },
        {
          "id": "t-pron-202-qa",
          "title": "Kiểm thử xử lý khoảng trắng thừa, chữ hoa/chữ thường trong ô nhập liệu",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 UI/UX Design Specifications\n- **Màn hình tham chiếu**: `src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html`\n- **React Component**: `vietphonics-app/src/views/PracticeStudioView.jsx` (Dictation Mode Toggle)",
      "createdAt": "2026-10-02T11:36:38.882Z"
    },
    {
      "id": "PRON-203",
      "epicId": "epic-articulation",
      "title": "Targeted Sound Read-Aloud & Contextual Fluency Drills: Đọc To Đoạn Văn Ngữ Cảnh Chứa Âm Mục Tiêu",
      "persona": "Người học muốn chuyển hóa âm vị đã học đơn lẻ vào việc đọc câu dài trôi chảy trong ngữ cảnh thực tế",
      "action": "đọc to các câu văn và đoạn văn hoàn chỉnh được thiết kế bão hòa âm mục tiêu",
      "value": "giúp cơ hàm thích nghi với việc di chuyển liên tục giữa các âm vị khó mà không bị vấp hoặc khựng lại",
      "priority": "must",
      "status": "in-progress",
      "size": "L",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-pron-203-flow",
          "given": "Đoạn văn ngữ cảnh chứa âm /θ/ và /s/",
          "when": "Học viên đọc to toàn bộ đoạn văn",
          "then": "Hệ thống theo dõi luồng phát âm liên tục, tính toán điểm độ lưu loát ngữ cảnh (Contextual Fluency Score) và phát hiện các điểm ngắt hơi sai quy tắc.",
          "completed": true
        },
        {
          "id": "ac-pron-203-ui",
          "given": "Giao diện phòng thu PracticeStudioView",
          "when": "Render đoạn văn",
          "then": "Đoạn văn hiển thị với kích thước chữ lớn 24px, khoảng cách dòng leading-relaxed thoáng đãng, các từ có âm mục tiêu được tô màu nhẹ nhàng để học viên dễ nhận biết trước khi nói.",
          "completed": true
        },
        {
          "id": "ac-pron-203-scale-5000",
          "given": "5,000 học viên đồng thời luyện đọc đoạn văn ngữ cảnh",
          "when": "Truyền tải văn bản và âm thanh mẫu",
          "then": "Toàn bộ văn bản và danh sách âm vị được nạp sẵn qua AppContext tĩnh; zero lời gọi nạp dữ liệu thừa trong khi đọc.",
          "completed": true
        },
        {
          "id": "ac-pron-203-l1",
          "given": "Học viên đọc đoạn văn có sự chuyển đổi liên tục giữa /s/ và /ʃ/",
          "when": "Cơ môi không kịp thay đổi từ bẹt sang chu tròn",
          "then": "Hệ thống đánh dấu các điểm chuyển tiếp bị dính âm (transition failure) và khuyên học viên đọc chậm lại ở tốc độ 0.8x.",
          "completed": true
        },
        {
          "id": "ac-pron-203-a11y",
          "given": "Người dùng muốn nghe lại từng cụm từ",
          "when": "Bấm vào bất kỳ từ nào trong đoạn văn",
          "then": "Phát âm thanh mẫu cô lập của từ đó giúp điều chỉnh trước khi đọc to cả câu.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pron-203-ui",
          "title": "Thiết kế khung văn bản ngữ cảnh trong PracticeStudioView với font chữ lớn và tương tác click",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-203-audio",
          "title": "Tích hợp nút \"Nghe toàn câu mẫu\" phát âm thanh ngữ cảnh tốc độ chuẩn 1.0x",
          "category": "Audio/DSP",
          "completed": true
        },
        {
          "id": "t-pron-203-scale",
          "title": "Kiểm tra bộ nhớ RAM trình duyệt khi học viên luyện đọc liên tục 30 phút",
          "category": "Performance",
          "completed": true
        },
        {
          "id": "t-pron-203-qa",
          "title": "Đánh giá độ nhạy của bộ phát hiện điểm ngắt hơi trên 20 đoạn văn ngữ cảnh công sở",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 UI/UX Design Specifications\n- **Màn hình tham chiếu**: `src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html`\n- **React Component**: `vietphonics-app/src/views/PracticeStudioView.jsx`",
      "createdAt": "2026-10-02T11:36:38.882Z"
    },
    {
      "id": "PRON-204",
      "epicId": "epic-articulation",
      "title": "Dual-Track Audio Recording & Native Speaker Waveform Comparison: Đối Chiếu Trực Quan Dạng Sóng Âm",
      "persona": "Người học có tư duy thị giác (visual learners) muốn nhìn thấy sự khác biệt về trường độ và độ bật của giọng mình so với người bản ngữ",
      "action": "thu âm giọng nói và quan sát 2 track sóng âm song song: Track Bản Ngữ (Native Reference) và Track Người Học (User Track)",
      "value": "nhận ra ngay trực quan đoạn âm đuôi của mình bị đứt cụt (cụt sóng do nuốt âm) trong khi sóng âm bản ngữ kéo dài một đuôi xát tần số cao rõ rệt",
      "priority": "must",
      "status": "in-progress",
      "size": "L",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-pron-204-waves",
          "given": "Bản ghi âm hoàn tất",
          "when": "Màn hình hiển thị đối chiếu dạng sóng",
          "then": "Hiển thị 2 track sóng âm song song: Track trên là sóng âm chuẩn bản ngữ (màu Electric Cyan #0284c7), track dưới là sóng âm học viên (màu Rose #e11d48), các đỉnh biên độ âm thanh được căn chỉnh theo thời gian thực.",
          "completed": true
        },
        {
          "id": "ac-pron-204-ui",
          "given": "Giao diện visualizer",
          "when": "Học viên xem 2 track sóng âm",
          "then": "Đồ họa vẽ sắc nét trên Canvas HTML5 60 FPS, có thước đo thời gian (0.0s đến 3.5s), điểm khác biệt biên độ âm đuôi được đóng khung viền cảnh báo nổi bật.",
          "completed": true
        },
        {
          "id": "ac-pron-204-scale-5000",
          "given": "5,000 học viên đồng thời xem visualizer dạng sóng",
          "when": "Canvas render trên thiết bị người dùng",
          "then": "Canvas 2D context sử dụng buffer hình ảnh tối ưu trên GPU client; zero tải xử lý đồ họa lên máy chủ.",
          "completed": true
        },
        {
          "id": "ac-pron-204-l1",
          "given": "Học viên phát âm \"six\" bị nuốt đuôi /ks/",
          "when": "Đối chiếu dạng sóng",
          "then": "Track người học dập tắt biên độ ở 0.4s (cụt đuôi), trong khi track bản ngữ có chùm năng lượng xát kéo dài đến 0.7s; hệ thống hiển thị chú thích trực quan ngay trên sóng âm.",
          "completed": true
        },
        {
          "id": "ac-pron-204-a11y",
          "given": "Người dùng hỗ trợ âm thanh",
          "when": "Nhấn nút \"Phát song song\"",
          "then": "Hệ thống có thể phát lần lượt giọng mẫu rồi đến giọng học viên để tai nghe đối chiếu tức thì sự khác biệt.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pron-204-canvas",
          "title": "Xây dựng Canvas Waveform so sánh 2 track sóng âm với requestAnimationFrame",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-204-envelope",
          "title": "Viết hàm trích xuất đường bao biên độ âm thanh (amplitude envelope) từ Float32Array",
          "category": "Audio/DSP",
          "completed": true
        },
        {
          "id": "t-pron-204-scale",
          "title": "Tối ưu hóa canvas pixel ratio phù hợp màn hình Retina không bị mờ nét",
          "category": "Performance",
          "completed": true
        },
        {
          "id": "t-pron-204-qa",
          "title": "Kiểm tra độ trễ hiển thị sóng âm sau khi bấm dừng thu âm phải dưới 100ms",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 UI/UX Design Specifications\n- **Màn hình tham chiếu**: `src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html`\n- **React Component**: `vietphonics-app/src/views/PracticeStudioView.jsx`",
      "createdAt": "2026-10-02T11:36:38.882Z"
    },
    {
      "id": "USER-102",
      "epicId": "epic-diagnostic",
      "title": "Granular Phoneme Mastery Ledger: Bản Đồ Ma Trận 44 Âm IPA & Lịch Sử Làm Chủ Âm Vị Chi Tiết",
      "persona": "Người học muốn theo dõi tiến độ chính xác của từng âm vị để biết mình yếu âm nào và tiến bộ ra sao",
      "action": "truy cập tab \"Tiến Độ & Phân Tích\" và nhấp vào ma trận 44 âm quốc tế IPA",
      "value": "nhìn thấy trực quan toàn bộ 44 âm vị được mã hóa màu theo 3 cấp độ (Làm chủ, Đang luyện, Yếu cần khắc phục), bấm vào để nghe khẩu hình và luyện tập tức thời",
      "priority": "must",
      "status": "in-progress",
      "size": "XL",
      "points": 13,
      "acceptanceCriteria": [
        {
          "id": "ac-user-102-func",
          "given": "Học viên mở bảng thống kê tiến độ âm vị Phoneme Mastery Grid",
          "when": "Màn hình tải hoàn tất",
          "then": "Hiển thị đầy đủ ma trận 44 âm IPA chia thành 3 phân nhóm: 12 Nguyên âm đơn, 8 Nguyên âm đôi, 24 Phụ âm; mỗi âm hiển thị ký hiệu IPA chuẩn, điểm % GOP trung bình, và màu nền tương ứng (>80% Xanh, 60-80% Vàng, <60% Đỏ).",
          "completed": true
        },
        {
          "id": "ac-user-102-interactive",
          "given": "Học viên nhấp vào một âm bất kỳ (ví dụ âm /θ/)",
          "when": "Thao tác click kích hoạt",
          "then": "Hệ thống tự động phát âm thanh mẫu bản ngữ, thanh Dynamic Phoneme Preview Bar cập nhật thông tin tên âm, điểm số, thói quen lỗi phổ biến của người Việt và nút 1-click \"Xem Khẩu Hình & Luyện Ngay\" chuyển tab tức thì.",
          "completed": true
        },
        {
          "id": "ac-user-102-ui",
          "given": "Hiển thị trên giao diện người dùng Desktop & Mobile",
          "when": "Render 44 nút âm vị",
          "then": "Font chữ bắt buộc sử dụng Noto Sans IPA cho ký hiệu ngữ âm để tránh lỗi vỡ font glyph, các nút bo tròn rounded-lg, hover scale nhẹ nhàng transition-transform, viền đỏ nổi bật cho các âm dưới 60% cần ưu tiên sửa gấp.",
          "completed": true
        },
        {
          "id": "ac-user-102-scale-5000",
          "given": "5,000 học viên đồng thời tải ma trận 44 âm IPA",
          "when": "Tải trang Tiến Độ & Phân Tích",
          "then": "Dữ liệu tiến độ 44 âm được lưu trong một mảng JSON nén gọn 1.2KB trên Redis cache `user:mastery:{user_id}` (TTL 1 giờ); câu lệnh truy vấn cơ sở dữ liệu sử dụng Single Row SELECT với B-tree primary index, thời gian nạp trang dưới 80ms.",
          "completed": true
        },
        {
          "id": "ac-user-102-a11y",
          "given": "Người dùng sử dụng bàn phím để duyệt ma trận âm",
          "when": "Nhấn Tab và Enter",
          "then": "Mỗi nút âm vị có thuộc tính aria-label chi tiết: \"Âm vị theta /θ/, điểm thành thạo 54%, trạng thái: Yếu cần khắc phục\", bấm Enter để nghe phát âm mẫu.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-user-102-matrix",
          "title": "Xây dựng 44 nút bấm âm vị phân loại 12 Monophthongs, 8 Diphthongs, 24 Consonants trong ProgressAnalyticsView",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-user-102-font",
          "title": "Tích hợp font Noto Sans IPA và cấu hình Tailwind font-ipa-display đảm bảo hiển thị chuẩn xác",
          "category": "Design",
          "completed": true
        },
        {
          "id": "t-user-102-db",
          "title": "Tạo bảng phoneme_mastery_ledger với compound index (user_id, phoneme_symbol)",
          "category": "Database",
          "completed": true
        },
        {
          "id": "t-user-102-cache",
          "title": "Thiết lập Redis hash caching cho 5,000 active sessions, giảm thiểu I/O đọc ổ đĩa",
          "category": "DevOps",
          "completed": true
        },
        {
          "id": "t-user-102-qa",
          "title": "Kiểm tra 100% hiển thị 44 ký tự IPA không bị lỗi ô vuông tofu font trên Windows/macOS/iOS/Android",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 UI/UX Design Specifications\n- **Màn hình tham chiếu**: `src/ui-reference/ti_n_ph_n_t_ch_d_li_u_h_c_m_light_mode/code.html`\n- **React Component**: `vietphonics-app/src/views/ProgressAnalyticsView.jsx`\n- **Color Coding**: \n  - Mastered (>80%): `bg-emerald-50 text-emerald-800 border-emerald-200`\n  - Improving (60-80%): `bg-amber-50 text-amber-800 border-amber-200`\n  - Critical (<60%): `bg-rose-50 text-rose-800 ring-2 ring-rose-400 font-black`\n\n### ⚡ Kiến Trúc Chịu Tải 5,000 Users Đồng Thời\n- **B-tree Indexing**: `CREATE INDEX idx_mastery_user ON phoneme_mastery_ledger(user_id, updated_at DESC);`\n- **Lightweight Payload**: Payload trả về từ máy chủ chỉ là mảng phẳng 44 phần tử `[{sym: 'θ', score: 54}, ...]`, kích thước chỉ 1.2KB giúp truyền tải siêu tốc ngay cả trên mạng 3G/4G chập chờn.",
      "createdAt": "2026-10-02T11:36:38.882Z"
    },
    {
      "id": "PRON-205",
      "epicId": "epic-articulation",
      "title": "3-Tier Positional Phoneme Ladder: Luyện Âm Phân Vị 3 Cấp Độ (Đầu Từ - Giữa Từ - Cuối Từ)",
      "persona": "Người học phát âm được âm khi nó đứng ở đầu từ nhưng bị ngọng hoặc nuốt khi âm đó đứng ở giữa hoặc cuối từ",
      "action": "luyện tập theo bậc thang phân vị 3 cấp độ: Tier 1 (Initial - Đầu từ), Tier 2 (Medial - Giữa từ), Tier 3 (Final - Cuối từ)",
      "value": "nắm vững cơ chế vận động cơ hàm ở mọi vị trí ngữ âm, khắc phục dứt điểm việc chỉ phát âm đúng khi từ đứng độc lập",
      "priority": "must",
      "status": "in-progress",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-pron-205-ladder",
          "given": "Âm mục tiêu /θ/ (Interdental Fricative)",
          "when": "Học viên mở bài luyện bậc thang phân vị",
          "then": "Hiển thị 3 cấp bậc rõ ràng: 1. Initial (Think /θɪŋk/), 2. Medial (Method /ˈmeθəd/), 3. Final (Breath /breθ/), mỗi cấp bậc có nút nghe từ và nghe câu mẫu hoàn chỉnh.",
          "completed": true
        },
        {
          "id": "ac-pron-205-ui",
          "given": "Tab \"Bậc Thang Phân Vị (PRON-205 & 206)\" trong MasteryLabView",
          "when": "Giao diện hiển thị",
          "then": "3 thẻ bento grid với gradient xanh Emerald dịu mắt, huy hiệu cấp độ in đậm font-mono, nút bấm nghe mẫu to rõ, thiết kế trực quan dễ theo dõi.",
          "completed": true
        },
        {
          "id": "ac-pron-205-scale-5000",
          "given": "5,000 học viên cùng lúc tương tác với các bậc thang phân vị",
          "when": "Chuyển đổi giữa các âm vị (/θ/ sang /ks/)",
          "then": "Dữ liệu bậc thang được lưu trong bộ nhớ client, chuyển đổi âm vị tức thời trong 0ms, không phát sinh lời gọi API mạng.",
          "completed": true
        },
        {
          "id": "ac-pron-205-l1",
          "given": "Học viên phát âm tốt âm /θ/ ở đầu từ (\"think\") nhưng bỏ quên ở cuối từ (\"breath\")",
          "when": "Hệ thống đánh giá",
          "then": "Chỉ rõ sự chênh lệch điểm số giữa các vị trí: \"Vị trí đầu: 92% | Vị trí cuối: 48%. Hãy tập trung luyện Tier 3 để giữ đầu lưỡi ở cuối từ!\".",
          "completed": true
        },
        {
          "id": "ac-pron-205-a11y",
          "given": "Người dùng sử dụng bàn phím",
          "when": "Tab qua 3 cấp bậc",
          "then": "Các nút nghe mẫu có nhãn aria-label chi tiết: \"Nghe từ mẫu bậc 1: Think\", \"Nghe câu mẫu bậc 1\".",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pron-205-ui",
          "title": "Xây dựng giao diện 3-Tier Positional Ladder trong MasteryLabView với 3 thẻ bento grid",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-205-data",
          "title": "Biên soạn dữ liệu phân vị cho các âm khó nhất: /θ/, /ð/, /ks/, /s/, /tʃ/",
          "category": "Phonetics",
          "completed": true
        },
        {
          "id": "t-pron-205-scale",
          "title": "Tối ưu hóa bộ nhớ đệm client cho dữ liệu bậc thang âm vị",
          "category": "Performance",
          "completed": true
        },
        {
          "id": "t-pron-205-qa",
          "title": "Kiểm tra tính logic của tiến trình độ khó từ Đầu ➔ Giữa ➔ Cuối",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 UI/UX Design Specifications\n- **Màn hình tham chiếu**: `src/ui-reference/kh_u_h_nh_2d_gi_i_ph_u_c_mi_ng_light_mode/code.html`\n- **React Component**: `vietphonics-app/src/views/MasteryLabView.jsx` (Tab: Bậc Thang Phân Vị)",
      "createdAt": "2026-10-02T11:37:33.191Z"
    },
    {
      "id": "PRON-206",
      "epicId": "epic-articulation",
      "title": "Connected Speech Positional Progression: Nâng Cấp Độ Ngữ Đoạn (Từ ➔ Cụm Từ ➔ Câu Hoàn Chỉnh)",
      "persona": "Người học đã làm chủ âm ở cấp độ từ đơn nhưng khi nói vào câu hoàn chỉnh thì bị rụng âm trở lại",
      "action": "luyện tập theo tiến trình 3 bước nối tiếp: Cấp độ từ đơn ➔ Cấp độ cụm từ ➔ Cấp độ toàn câu ngữ cảnh",
      "value": "tạo cầu nối vững chắc giúp người học chuyển hóa kỹ năng phát âm từ bài tập riêng lẻ sang giao tiếp tự nhiên trong câu hoàn chỉnh",
      "priority": "must",
      "status": "in-progress",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-pron-206-progression",
          "given": "Từ vựng \"Method\" chứa âm /θ/ ở giữa từ",
          "when": "Học viên xem tiến trình",
          "then": "Hiển thị rõ 3 tầng liên kết: Cấp từ (\"Method\" /ˈmeθəd/) ➔ Cấp cụm từ (\"Scientific method\") ➔ Cấp toàn câu (\"The team follows a rigorous scientific method.\").",
          "completed": true
        },
        {
          "id": "ac-pron-206-ui",
          "given": "Giao diện MasteryLabView",
          "when": "Render tiến trình",
          "then": "Mỗi tầng ngữ đoạn được đóng khung viền bo tròn trắng sáng, có nhãn phân loại rõ ràng, nút nghe từ và nghe câu mẫu có màu sắc tương phản nổi bật.",
          "completed": true
        },
        {
          "id": "ac-pron-206-scale-5000",
          "given": "5,000 học viên đồng thời học bài tiến trình ngữ đoạn",
          "when": "Bấm nghe câu mẫu liên tục",
          "then": "Audio synthesis phát ngay tức thì qua Web Speech API không tốn tài nguyên mạng.",
          "completed": true
        },
        {
          "id": "ac-pron-206-l1",
          "given": "Học viên đọc câu dài bị vấp ở điểm nối âm",
          "when": "Hệ thống phân tích",
          "then": "Cung cấp ghi chú hướng dẫn: \"PRON-206: Tiến trình nối âm giúp khắc phục thói quen ngắt quãng từng từ của người Việt\".",
          "completed": true
        },
        {
          "id": "ac-pron-206-a11y",
          "given": "Học viên điều khiển bằng bàn phím",
          "when": "Tab đến nút \"Câu Mẫu\"",
          "then": "Phím Enter kích hoạt phát âm thanh toàn câu mượt mà.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pron-206-ui",
          "title": "Tích hợp cấp độ Cụm Từ và Toàn Câu vào các tầng bậc thang trong MasteryLabView",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-206-data",
          "title": "Biên soạn 20 bộ câu tiến trình nối âm ứng dụng thực tế trong công sở",
          "category": "Phonetics",
          "completed": true
        },
        {
          "id": "t-pron-206-scale",
          "title": "Đảm bảo thời gian nạp giao diện dưới 50ms",
          "category": "Performance",
          "completed": true
        },
        {
          "id": "t-pron-206-qa",
          "title": "Kiểm thử chất lượng giọng đọc TTS cho các câu văn dài",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 UI/UX Design Specifications\n- **React Component**: `vietphonics-app/src/views/MasteryLabView.jsx` (Tab: Bậc Thang Phân Vị)",
      "createdAt": "2026-10-02T11:37:33.191Z"
    },
    {
      "id": "PRON-207",
      "epicId": "epic-articulation",
      "title": "Phonetic Exception Words & Grammatical Voicing Alternation Rules: Bộ Từ Ngoại Lệ & Quy Tắc Rung Thanh Quản",
      "persona": "Người học tiếng Anh trình độ trung cấp hay bị nhầm lẫn giữa Danh từ (vô thanh) và Động từ (hữu thanh)",
      "action": "học các cặp từ có quy tắc biến đổi âm vị ngữ pháp (Voicing Alternation) và các từ ngoại lệ chính tả",
      "value": "hiểu bản chất khoa học: Danh từ phát âm vô thanh không rung (breath /breθ/, use /juːs/), Động từ hóa biến thành âm hữu thanh rung cổ họng (breathe /briːð/, use /juːz/)",
      "priority": "must",
      "status": "in-progress",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-pron-207-alternation",
          "given": "Cặp từ \"breath vs breathe\"",
          "when": "Học viên xem quy tắc trong tab \"Quy Tắc Biến Đổi Âm\"",
          "then": "Hiển thị so sánh song song: Noun [Danh từ] \"breath\" (/breθ/ - âm /θ/ vô thanh không rung) vs Verb [Động từ] \"breathe\" (/briːð/ - âm /ð/ hữu thanh rung cổ họng + nguyên âm dài /iː/).",
          "completed": true
        },
        {
          "id": "ac-pron-207-ui",
          "given": "Giao diện tab \"Quy Tắc Biến Đổi (PRON-207)\"",
          "when": "Render trên màn hình",
          "then": "3 thẻ so sánh dạng bento card, phân biệt rõ ràng Noun Box (viền Slate xám) và Verb Box (viền Sky xanh), mỗi hộp có nút loa nghe phát âm riêng biệt, dòng giải thích quy tắc in nghiêng nổi bật.",
          "completed": true
        },
        {
          "id": "ac-pron-207-scale-5000",
          "given": "5,000 học viên cùng học quy tắc biến đổi âm thanh",
          "when": "Tương tác với các nút nghe mẫu",
          "then": "Âm thanh phát tức thì qua Web Speech API trên máy người dùng, zero tải mạng.",
          "completed": true
        },
        {
          "id": "ac-pron-207-l1",
          "given": "Người Việt không quen rung thanh quản ở cuối từ",
          "when": "Học viên đọc từ \"breathe\"",
          "then": "Ghi chú mẹo: \"Đặt ngón tay lên thanh quản để cảm nhận độ rung khi phát âm động từ 'breathe'\".",
          "completed": true
        },
        {
          "id": "ac-pron-207-a11y",
          "given": "Người dùng hỗ trợ âm thanh",
          "when": "Bấm nút phát âm",
          "then": "Đọc rõ ràng từng từ kèm phân loại ngữ pháp: \"Danh từ breath\", \"Động từ breathe\".",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pron-207-ui",
          "title": "Xây dựng giao diện Voicing Alternation Cards trong MasteryLabView",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-207-data",
          "title": "Biên soạn danh mục các cặp từ biến đổi âm: breath/breathe, use/use, house/houses, advice/advise",
          "category": "Phonetics",
          "completed": true
        },
        {
          "id": "t-pron-207-scale",
          "title": "Tối ưu hóa cấu trúc dữ liệu tĩnh trong component",
          "category": "Performance",
          "completed": true
        },
        {
          "id": "t-pron-207-qa",
          "title": "Kiểm tra tính chính xác của phiên âm quốc tế IPA trong từng thẻ từ",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 UI/UX Design Specifications\n- **React Component**: `vietphonics-app/src/views/MasteryLabView.jsx` (Tab: Quy Tắc Biến Đổi Âm)",
      "createdAt": "2026-10-02T11:37:33.191Z"
    },
    {
      "id": "PRON-208",
      "epicId": "epic-articulation",
      "title": "L1 Confusion-Trap Cross-Transition Drills: Bài Tập Chuyển Đổi Đối Kháng Âm Đích & Âm Bẫy L1",
      "persona": "Người học hay bị \"trượt âm\" hoặc đồng hóa âm tiếng Anh thành âm tiếng Việt quen thuộc khi hai âm đứng cạnh nhau",
      "action": "luyện các bài tập chuyển đổi đối kháng giữa âm đích (Target Sound: /θ/, /ð/) và âm bẫy L1 (Intrusion Sound: /t/, /d/) trong cùng một câu",
      "value": "rèn luyện sự kiểm soát cơ lưỡi độc lập, không bị cuốn theo thói quen thổ âm khi nói câu phức tạp",
      "priority": "must",
      "status": "in-progress",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-pron-208-drill",
          "given": "Câu đối kháng âm /ð/ vs /d/: \"They dare to go there today.\"",
          "when": "Học viên đọc câu",
          "then": "Hệ thống tách riêng điểm số của âm đích /ð/ (kẹp lưỡi) và âm bẫy /d/ (bật nướu), cảnh báo nếu học viên đồng hóa /ð/ thành /d/ (\"Đồng hóa âm! Cần kẹp lưỡi cho 'They' và bật nướu cho 'dare'\").",
          "completed": true
        },
        {
          "id": "ac-pron-208-ui",
          "given": "Giao diện bài tập trong MasteryLabView",
          "when": "Render trên màn hình",
          "then": "Các âm đích được đánh dấu màu xanh Sky, âm bẫy được đánh dấu màu tím Indigo, có chú thích vị trí cơ hàm đối nghịch rõ ràng.",
          "completed": true
        },
        {
          "id": "ac-pron-208-scale-5000",
          "given": "5,000 học viên đồng thời làm bài tập chuyển đổi đối kháng",
          "when": "Hệ thống chấm điểm",
          "then": "Thuật toán phân tích chuỗi âm vị chạy trong WebAssembly dưới 20ms, đảm bảo tốc độ tối đa cho 5,000 người dùng.",
          "completed": true
        },
        {
          "id": "ac-pron-208-l1",
          "given": "Người Việt có thói quen đọc \"they\" thành \"đây\"",
          "when": "Phát hiện lỗi",
          "then": "Cung cấp bài tập thể dục cơ lưỡi: \"Đẩy lưỡi ra kẹp giữa răng rồi rụt nhanh về sau nướu 5 lần để tạo phản xạ linh hoạt\".",
          "completed": true
        },
        {
          "id": "ac-pron-208-a11y",
          "given": "Người dùng sử dụng bàn phím",
          "when": "Điều khiển bài tập",
          "then": "Phím Space bắt đầu thu âm, phím R để nghe lại câu mẫu.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pron-208-ui",
          "title": "Tích hợp các câu bài tập chuyển đổi đối kháng vào MasteryLabView",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-208-algo",
          "title": "Xây dựng thuật toán phân tách điểm âm đích vs âm bẫy trong cùng một câu",
          "category": "Algorithm",
          "completed": true
        },
        {
          "id": "t-pron-208-scale",
          "title": "Đảm bảo không nghẽn luồng xử lý âm thanh",
          "category": "Performance",
          "completed": true
        },
        {
          "id": "t-pron-208-qa",
          "title": "Kiểm thử với 10 câu bẫy chuyển đổi đối kháng phức tạp nhất",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 UI/UX Design Specifications\n- **React Component**: `vietphonics-app/src/views/MasteryLabView.jsx`",
      "createdAt": "2026-10-02T11:37:33.191Z"
    },
    {
      "id": "PRON-209",
      "epicId": "epic-articulation",
      "title": "Numbered Target Phoneme System & Multi-Spelling Sound Annotation: Hệ Thống Đánh Số Âm Vị Mục Tiêu",
      "persona": "Người học cần một hệ thống đánh số âm vị trực quan để ghi nhớ quy tắc chính tả tạo ra âm đó",
      "action": "xem các câu luyện tập có gắn số thứ tự âm vị (Target Number) và các quy tắc chính tả tương ứng (Digraph Rules)",
      "value": "nhận diện ngay quy tắc chữ viết: ví dụ âm /θ/ là âm #25, quy tắc chính là \"th\" (think, author), ngoại lệ danh xưng phát âm là /t/ (\"Thomas\", \"Thames\")",
      "priority": "should",
      "status": "in-progress",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-pron-209-number",
          "given": "Bài học âm /θ/ trong tab \"Shadowing & Chính Tả\"",
          "when": "Giao diện hiển thị",
          "then": "Hiển thị huy hiệu to bản \"Phoneme #25: /θ/ - Interdental Voiceless Fricative\" cùng 2 thẻ quy tắc chính tả: 1) Quy tắc chính: Chữ viết \"th\" (think, author), 2) Ngoại lệ danh xưng: Phát âm là /t/ (Thomas /ˈtɒməs/, Thames /temz/).",
          "completed": true
        },
        {
          "id": "ac-pron-209-ui",
          "given": "Giao diện hiển thị",
          "when": "Render trên màn hình",
          "then": "Huy hiệu số thứ tự âm vị tô màu Sky #0284c7 nền nhạt, các ô quy tắc chính tả đóng khung bo góc rounded-xl, font-mono hiển thị ví dụ sắc nét.",
          "completed": true
        },
        {
          "id": "ac-pron-209-scale-5000",
          "given": "5,000 học viên đồng thời tra cứu hệ thống đánh số âm vị",
          "when": "Tải dữ liệu",
          "then": "Toàn bộ bảng quy tắc chính tả 44 âm được nhúng tĩnh trong client bundle, 0 latency, 0 network request.",
          "completed": true
        },
        {
          "id": "ac-pron-209-l1",
          "given": "Người Việt hay phát âm từ \"Thomas\" thành /θɒməs/",
          "when": "Xem thẻ ngoại lệ",
          "then": "Giải thích rõ ràng: \"Tên riêng Thomas bắt nguồn từ tiếng Hy Lạp, chữ 'th' ở đây phát âm là âm tắc /t/, không kẹp lưỡi\".",
          "completed": true
        },
        {
          "id": "ac-pron-209-a11y",
          "given": "Học viên xem trên thiết bị di động",
          "when": "Cuộn trang",
          "then": "Bố cục tự động co giãn 1 cột trên mobile và 2 cột trên desktop, không bị tràn chữ.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pron-209-ui",
          "title": "Xây dựng giao diện Numbered Target Phonemes trong MasteryLabView",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-209-rules",
          "title": "Biên soạn danh mục quy tắc chính tả cho 44 âm vị quốc tế",
          "category": "Phonetics",
          "completed": true
        },
        {
          "id": "t-pron-209-scale",
          "title": "Tối ưu hóa dung lượng bundle không vượt quá 5KB cho toàn bộ bảng tra cứu",
          "category": "Performance",
          "completed": true
        },
        {
          "id": "t-pron-209-qa",
          "title": "Kiểm tra 100% các từ ngoại lệ chính tả phổ biến trong tiếng Anh",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 UI/UX Design Specifications\n- **React Component**: `vietphonics-app/src/views/MasteryLabView.jsx` (Tab: Shadowing & Chính Tả)",
      "createdAt": "2026-10-02T11:46:12.576Z"
    },
    {
      "id": "PRON-210",
      "epicId": "epic-articulation",
      "title": "Video-Synchronized Masterclass & Exaggerated Articulation Shadowing: Luyện Shadowing Khẩu Hình Chuẩn",
      "persona": "Người học muốn luyện nói theo phương pháp Shadowing (nhại giọng đồng bộ) với tốc độ điều chỉnh linh hoạt",
      "action": "chọn tốc độ phát âm (0.5x, 0.75x, 1.0x) và đọc đuổi theo giọng mẫu bản ngữ kèm mẹo khẩu hình cường điệu",
      "value": "hình thành phản xạ cơ bắp nhanh chóng nhờ kỹ thuật phóng đại khẩu hình (thè lưỡi 2mm giữa hai răng cho âm /θ/), sau đó tăng dần tốc độ lên mức tự nhiên",
      "priority": "must",
      "status": "in-progress",
      "size": "L",
      "points": 8,
      "acceptanceCriteria": [
        {
          "id": "ac-pron-210-speed",
          "given": "Bài luyện Shadowing cho câu \"The healthy author thought thirty thoughts throughout Thursday.\"",
          "when": "Học viên chọn tốc độ 0.5x, 0.75x hoặc 1.0x",
          "then": "Nút tốc độ tương ứng sáng màu xanh Sky, khi bấm \"Bắt Đầu Shadowing\", giọng mẫu phát chuẩn xác theo tốc độ đã chọn với cao độ giọng nói tự nhiên.",
          "completed": true
        },
        {
          "id": "ac-pron-210-ui",
          "given": "Giao diện bài tập Shadowing",
          "when": "Render trên màn hình",
          "then": "Đoạn văn hiển thị trong khung gradient Sky-to-Indigo hiện đại, câu chữ to bản 20px, thẻ mẹo khẩu hình màu vàng Amber nổi bật có icon tips_and_updates sinh động.",
          "completed": true
        },
        {
          "id": "ac-pron-210-scale-5000",
          "given": "5,000 học viên cùng lúc luyện Shadowing với các tốc độ khác nhau",
          "when": "Hệ thống điều chỉnh tốc độ audio",
          "then": "Sử dụng thuộc tính utterance.rate của Web Speech API ngay trên client, không cần xử lý FFmpeg đắt đỏ trên máy chủ backend.",
          "completed": true
        },
        {
          "id": "ac-pron-210-l1",
          "given": "Học viên có xu hướng rụt lưỡi lại khi tăng tốc độ đọc",
          "when": "Xem mẹo huấn luyện cường điệu (Exaggerated Articulation)",
          "then": "Lời khuyên chuyên sâu: \"PRON-210: Ở tốc độ 0.5x, hãy cố tình thè đầu lưỡi ra ngoài 2mm giữa hai hàm răng trước khi bật luồng hơi xát để não bộ ghi nhớ vị trí cơ bắp\".",
          "completed": true
        },
        {
          "id": "ac-pron-210-a11y",
          "given": "Người dùng thao tác bàn phím",
          "when": "Nhấn phím Space",
          "then": "Tự động kích hoạt phát bài đọc Shadowing theo tốc độ hiện hành.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pron-210-ui",
          "title": "Xây dựng giao diện Shadowing Masterclass với bộ chọn tốc độ 0.5x/0.75x/1.0x trong MasteryLabView",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-210-rate",
          "title": "Tích hợp hàm playWord với tham số rate tùy chỉnh trong Web Speech API",
          "category": "Audio/DSP",
          "completed": true
        },
        {
          "id": "t-pron-210-scale",
          "title": "Kiểm thử không có hiện tượng giật tiếng khi chuyển đổi tốc độ liên tục",
          "category": "Performance",
          "completed": true
        },
        {
          "id": "t-pron-210-qa",
          "title": "Đánh giá độ rõ ràng của giọng đọc ở tốc độ cực chậm 0.5x",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 UI/UX Design Specifications\n- **React Component**: `vietphonics-app/src/views/MasteryLabView.jsx` (Tab: Shadowing & Chính Tả)",
      "createdAt": "2026-10-02T11:46:12.576Z"
    },
    {
      "id": "PRON-211",
      "epicId": "epic-articulation",
      "title": "Dense Target Sound Saturation Sentences: Luyện Câu Bão Hòa Âm Mục Tiêu & Đánh Giá Giảm Giọng Lơ Lớ",
      "persona": "Người học muốn tôi luyện cơ hàm ở cường độ cao để hoàn toàn triệt tiêu giọng lơ lớ (Accent Reduction)",
      "action": "luyện đọc các câu có mật độ bão hòa âm mục tiêu cực dày (Hyper-density sentences, ví dụ 8 lần âm /θ/ liên tiếp)",
      "value": "huấn luyện sức bền cơ miệng và sự ổn định của khẩu hình (Consistency Score) trong suốt một hơi thở",
      "priority": "must",
      "status": "in-progress",
      "size": "M",
      "points": 5,
      "acceptanceCriteria": [
        {
          "id": "ac-pron-211-saturation",
          "given": "Câu bão hòa âm /θ/: \"Thirty-three thousand healthy thinkers thought throughout Thursday.\"",
          "when": "Học viên đọc câu hoàn chỉnh",
          "then": "Hệ thống đánh giá độ mở hàm và trường độ của từng lần xuất hiện âm /θ/, tính toán Consistency Score, cảnh báo nếu khẩu hình bị hẹp lại ở các từ cuối câu.",
          "completed": true
        },
        {
          "id": "ac-pron-211-ui",
          "given": "Tab \"Câu Bão Hòa Âm (PRON-211)\" trong MasteryLabView",
          "when": "Render trên màn hình",
          "then": "Hiển thị các câu bão hòa với nhãn tiêu điểm màu Indigo nổi bật, khung phiên âm IPA sắc nét, nút nghe mẫu toàn câu và nút 1-click \"Vào Phòng Thu Luyện Câu Này\" chuyển sang phòng thu tức thì.",
          "completed": true
        },
        {
          "id": "ac-pron-211-scale-5000",
          "given": "5,000 học viên cùng lúc luyện câu bão hòa âm",
          "when": "Bấm chuyển sang phòng thu PracticeStudioView",
          "then": "Hàm triggerPractice kích hoạt thông qua AppContext, chuyển tab và nạp bài tập trong 0ms không tải lại trang.",
          "completed": true
        },
        {
          "id": "ac-pron-211-l1",
          "given": "Học viên đọc chuẩn 3 từ đầu nhưng đến từ thứ 4 (\"thinkers\") bị mỏi cơ hàm và nuốt âm",
          "when": "Báo cáo hiển thị",
          "then": "Phân tích thể lực cơ miệng: \"Cơ hàm bị mỏi ở giây thứ 2.5! Hãy lấy hơi sâu bằng cơ hoành trước khi bắt đầu câu bão hòa dài\".",
          "completed": true
        },
        {
          "id": "ac-pron-211-a11y",
          "given": "Người dùng hỗ trợ âm thanh",
          "when": "Bấm nghe câu mẫu",
          "then": "Phát âm thanh mẫu giọng Oxford US chuẩn xác từng âm kẹp lưỡi.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pron-211-ui",
          "title": "Xây dựng giao diện Saturation Sentences trong MasteryLabView với liên kết chuyển tab phòng thu",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pron-211-data",
          "title": "Biên soạn 10 câu bão hòa mật độ cao cho các âm /θ/, /s/, /ks/, /tʃ/, /dʒ/",
          "category": "Phonetics",
          "completed": true
        },
        {
          "id": "t-pron-211-scale",
          "title": "Tối ưu hóa chuyển tab qua AppContext không re-render toàn bộ DOM",
          "category": "Performance",
          "completed": true
        },
        {
          "id": "t-pron-211-qa",
          "title": "Kiểm tra tính liên kết dữ liệu giữa MasteryLabView và PracticeStudioView",
          "category": "QA",
          "completed": true
        }
      ],
      "notes": "### 🎨 UI/UX Design Specifications\n- **React Component**: `vietphonics-app/src/views/MasteryLabView.jsx` (Tab: Câu Bão Hòa Âm)",
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
          "id": "ac-arch-101-ui",
          "given": "Giao diện bảng điều khiển quản trị viên Admin Database Metrics View",
          "when": "Quản trị viên theo dõi trạng thái cơ sở dữ liệu",
          "then": "Hiển thị sơ đồ quan hệ thực thể (ERD) tương tác, số lượng kết nối đang mở (Active Connections / Pool Size), dung lượng bảng và tỷ lệ Cache Hit Ratio luôn hiển thị >99% bằng phông chữ JetBrains Mono trên nền tối Slate-900.",
          "completed": true
        },
        {
          "id": "ac-arch-101-scale-5000",
          "given": "5,000 người dùng tích cực cùng ghi điểm phát âm và đọc lộ trình học",
          "when": "Hệ thống đối mặt với lưu lượng 1,500 truy vấn ghi/giây và 5,000 truy vấn đọc/giây",
          "then": "Cấu hình PgBouncer connection pooling với Transaction Mode (pool size 50 kết nối vật lý), phân vùng bảng phoneme_scores theo tháng (Range Partitioning by created_at), đảm bảo CPU PostgreSQL dưới 45%.",
          "completed": true
        },
        {
          "id": "ac-arch-101-l1",
          "given": "Bảng từ điển âm vị phoneme_dictionary",
          "when": "Truy vấn bảng đối chiếu âm lỗi đặc trưng của người Việt",
          "then": "Bảng lưu trữ trường l1_vietnamese_difficulty_tier (1 đến 5) và dialect_risk_tag (Bac, Trung, Nam) giúp hệ thống lọc nhanh các bài luyện phù hợp theo từng giọng địa phương.",
          "completed": true
        },
        {
          "id": "ac-arch-101-a11y",
          "given": "Đảm bảo khả năng phục hồi dữ liệu khi có thảm họa (Disaster Recovery)",
          "when": "Có sự cố sập node database chính",
          "then": "Hệ thống tự động kích hoạt cơ chế tự phục hồi (Automatic Failover) sang bản sao Streaming Replication Standby trong vòng dưới 30 giây với RPO = 0 (không mất bất kỳ giao dịch nào).",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-arch-101-migration",
          "title": "Viết file migration DDL tạo toàn bộ 8 bảng PostgreSQL kèm trigger tự động cập nhật trường updated_at",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-arch-101-partition",
          "title": "Triển khai phân vùng tự động (Auto Partitioning) cho bảng phoneme_scores theo từng tháng với pg_partman",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-arch-101-pgbouncer",
          "title": "Cấu hình PgBouncer kết hợp Prisma/Kysely connection pool tối ưu cho 5,000 concurrent sessions",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-arch-101-index",
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
      "notes": "### 🎨 UI/UX Design System Specifications\n- **Màn hình tham chiếu**: `src/ui-reference/admin_dashboard_metrics/code.html`\n- **Lược đồ Bảng Cơ Bản**:\n  - `users` (id UUID PK, email, full_name, dialect, tier, created_at)\n  - `subscriptions` (id UUID PK, user_id FK, plan_id, status, current_period_end)\n  - `practice_sessions` (id UUID PK, user_id FK, module_id, overall_score, duration_sec)\n  - `phoneme_scores` (id BIGSERIAL, session_id FK, user_id FK, phoneme, score, audio_url, created_at) PARTITION BY RANGE (created_at)\n  - `error_bank` (id UUID PK, user_id FK, word, target_ipa, easiness_factor, interval_days, next_review_at).",
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
          "id": "ac-arch-102-ui",
          "given": "Giao diện hàng đợi AI Queue Telemetry Dashboard",
          "when": "Kỹ sư hạ tầng giám sát hệ thống",
          "then": "Hiển thị đồ thị thời gian thực về số lượng tác vụ đang chờ (Queue Depth), thời gian chờ trung bình (Wait Time), tỷ lệ GPU VRAM sử dụng và thông lượng bài chấm/phút theo giao diện Dark Mode phong cách Grafana chuyên nghiệp.",
          "completed": true
        },
        {
          "id": "ac-arch-102-scale-5000",
          "given": "5,000 học viên cùng bấm gửi bài chấm phát âm trong giờ làm bài tập trên lớp",
          "when": "Hàng đợi nạp dồn dập 200 file âm thanh/giây",
          "then": "Cơ chế Auto-scaling (KEDA / Kubernetes HPA) tự động mở rộng từ 2 lên tối đa 16 GPU workers, duy trì P95 thời gian chờ trong hàng đợi < 400ms và không có bản ghi nào bị rơi rớt (0% dropped jobs).",
          "completed": true
        },
        {
          "id": "ac-arch-102-l1",
          "given": "Worker âm thanh chạy tiền xử lý FFmpeg",
          "when": "Chuẩn hóa định dạng âm thanh đầu vào",
          "then": "Tự động chuyển đổi mẫu về chuẩn PCM Mono 16kHz 16-bit và cắt lọc khoảng lặng đầu cuối (Silence Trimming -50dB) nhằm tối ưu độ chính xác nhận diện âm tắc vô thanh /p, t, k/ của học viên Việt.",
          "completed": true
        },
        {
          "id": "ac-arch-102-a11y",
          "given": "Sự cố kết nối mạng của worker AI",
          "when": "Một worker gặp lỗi phân tích hoặc timeout 5 giây",
          "then": "Job tự động được trả về hàng đợi thử lại (Dead Letter Queue với cơ chế Exponential Backoff 3 lần), client nhận thông báo lỗi chi tiết thay vì bị treo vô hạn.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-arch-102-fastapi",
          "title": "Xây dựng API Ingestion hiệu năng cao bằng FastAPI với streaming upload và xác thực chữ ký audio header",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-arch-102-queue",
          "title": "Thiết lập cụm Redis BullMQ cluster phân tán với phân luồng ưu tiên (VIP Pro > Standard Free)",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-arch-102-ffmpeg",
          "title": "Tích hợp FFmpeg C-binding xử lý chuẩn hóa audio PCM 16kHz mono trong bộ nhớ RAM (In-Memory Buffer)",
          "category": "Audio/DSP",
          "completed": true
        },
        {
          "id": "t-arch-102-keda",
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
      "notes": "### 🎨 UI/UX Design System Specifications\n- **Màn hình tham chiếu**: `src/ui-reference/admin_dashboard_metrics/code.html`\n- **Kiến trúc luồng xử lý**:\n  - `Client` -> `FastAPI Ingestion` -> Trả HTTP 202 JobID trong 20ms\n  - Đẩy vào Redis BullMQ `queue:audio_scoring:priority`\n  - `GPU Worker (ONNX Runtime / TensorRT)` lấy job -> Whisper CTC Alignment -> Trả điểm về Redis Pub/Sub\n  - `Client` nhận kết quả qua Server-Sent Events (SSE) hoặc WebSocket.",
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
          "id": "ac-arch-103-ui",
          "given": "Giao diện chọn cổng thanh toán PaymentGatewaySelector",
          "when": "Học viên xem các lựa chọn",
          "then": "Logo VNPay, MoMo và Stripe hiển thị sắc nét với tỷ lệ vàng, thẻ phương thức có viền sáng khi được chọn, hiển thị rõ ràng số tiền \"30.000 đ\" định dạng chuẩn Việt Nam, bảo mật SSL 256-bit được chứng nhận bằng huy hiệu khóa xanh an tâm.",
          "completed": true
        },
        {
          "id": "ac-arch-103-scale-5000",
          "given": "Hàng ngàn giao dịch mua gói phát sinh trong các đợt khuyến mãi Back-To-School",
          "when": "Các cổng thanh toán gửi hàng loạt webhook thông báo giao dịch thành công",
          "then": "Hệ thống đối soát sử dụng cơ chế Idempotency Key (khóa giao dịch chống trùng lặp), ghi nhận giao dịch thành công và nâng cấp tài khoản chỉ trong 120ms mà không bao giờ bị cộng thừa ngày sử dụng.",
          "completed": true
        },
        {
          "id": "ac-arch-103-l1",
          "given": "Giao dịch qua các ngân hàng nội địa Việt Nam",
          "when": "Tạo mã đơn hàng thanh toán",
          "then": "Nội dung chuyển khoản được sinh ngắn gọn dạng \"VP [UserID]\" giúp đối soát tự động chính xác tuyệt đối ngay cả khi học viên gõ thiếu dấu tiếng Việt.",
          "completed": true
        },
        {
          "id": "ac-arch-103-a11y",
          "given": "Xử lý lỗi khi cổng thanh toán bảo trì",
          "when": "Một cổng thanh toán gặp sự cố gián đoạn kết nối",
          "then": "Hệ thống tự động hiển thị gợi ý thông minh chuyển sang cổng thanh toán thay thế khả dụng mà không làm học viên phải điền lại thông tin từ đầu.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-arch-103-gateways",
          "title": "Tích hợp SDK MoMo API v2, VNPay Payment Sandbox/Production và Stripe Elements",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-arch-103-webhook",
          "title": "Xây dựng Webhook Reconciler Engine kiểm tra chữ ký số HMAC-SHA256 bảo vệ chống giả mạo giao dịch",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-arch-103-idempotent",
          "title": "Thiết kế bảng payment_transactions với Unique Constraint trên transaction_reference bảo vệ tính Idempotent",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-arch-103-scale",
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
      "notes": "### 🎨 UI/UX Design System Specifications\n- **Màn hình tham chiếu**: `src/ui-reference/m_n_h_nh_ch_n_g_i_v_thanh_to_n_qr_code/code.html`\n- **React Component**: `vietphonics-app/src/components/subscription/PaymentGatewaySelector.jsx`\n- **Idempotency Strategy**:\n  - Header: `X-Idempotency-Key` lưu trong Redis với TTL 24 giờ.\n  - Khi webhook gửi lặp lại: Trả ngay HTTP 200 OK với body kết quả đã lưu trong bộ nhớ đệm mà không thực hiện trừ tiền hay gia hạn lần hai.",
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
          "id": "ac-arch-104-ui",
          "given": "Giao diện ứng dụng nhận mã lỗi 429 từ máy chủ",
          "when": "Xử lý phản hồi tại máy khách",
          "then": "Tự động mở cửa sổ thông báo nâng cấp ProPaywallModal với hiệu ứng trượt nhẹ nhàng, không gây crash ứng dụng hay màn hình trắng.",
          "completed": true
        },
        {
          "id": "ac-arch-104-scale-5000",
          "given": "5,000 người dùng liên tục gửi request kiểm tra từ điển và nộp bài",
          "when": "Middleware phân giải quyền hạn",
          "then": "Sử dụng Redis Cluster kết hợp Lua script chạy nguyên tử (Atomic Lua Script) để kiểm tra hạn mức trong bộ nhớ RAM, thời gian thực thi trung bình < 1.5ms, chịu tải 10,000 RPS.",
          "completed": true
        },
        {
          "id": "ac-arch-104-l1",
          "given": "Học viên Pro muốn sử dụng các tính năng nâng cao (AI Khẩu Hình 3D, Golden Speaker)",
          "when": "Middleware kiểm tra cờ tính năng `entitlements`",
          "then": "Mở quyền truy cập không giới hạn, đồng thời cấp độ ưu tiên của tác vụ trong hàng đợi xử lý âm thanh được gán nhãn `HIGH_PRIORITY`.",
          "completed": true
        },
        {
          "id": "ac-arch-104-a11y",
          "given": "Học viên kiểm tra số lượt học còn lại trong ngày",
          "when": "Xem thanh trạng thái tài khoản",
          "then": "Hiển thị huy hiệu rõ ràng: \"Gói Miễn Phí: Còn 3/5 bài hôm nay\", hỗ trợ tooltip giải thích khi rê chuột hoặc chạm vào.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-arch-104-lua",
          "title": "Viết Lua script cho Redis triển khai thuật toán Sliding Window Counter kiểm soát hạn mức phân tầng",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-arch-104-mw",
          "title": "Xây dựng Fastify/Express Middleware entitlementGuard kiểm tra token JWT và quyền hạn gói Pro",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-arch-104-headers",
          "title": "Bổ sung đầy đủ các header tiêu chuẩn RFC (X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset) vào mọi response",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-arch-104-scale",
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
      "notes": "### 🎨 UI/UX Design System Specifications\n- **Mã nguồn Middleware**: `vietphonics-app/src/middleware/quotaLimiter.js`\n- **Hạn mức chuẩn**:\n  - Free Tier: 5 bài học/ngày, 10 lượt tra cứu từ điển/phút, P95 timeout 5s\n  - Pro Tier: Không giới hạn bài học, 120 lượt tra cứu/phút, P95 timeout 2s\n- **Lua Script Strategy**:\n  - Dùng `redis.call('INCR', key)` kết hợp `redis.call('EXPIRE', key, ttl)` để đảm bảo không rò rỉ khóa không thời hạn.",
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
          "id": "ac-arch-105-ui",
          "given": "Giao diện người dùng trong lúc tải file ghi âm",
          "when": "File đang được tải lên",
          "then": "Hiển thị thanh tiến trình tải lên mượt mà (0% -> 100%) viền Sky-500, không làm đơ giao diện người dùng và tự động chuyển sang trạng thái \"Đang phân tích âm thanh\" khi tải xong.",
          "completed": true
        },
        {
          "id": "ac-arch-105-scale-5000",
          "given": "5,000 người dùng tải lên trung bình 20 file ghi âm/ngày (tổng 100,000 file âm thanh/ngày tương đương 15GB dữ liệu mới)",
          "when": "Xử lý luồng tải lên và vòng đời tệp",
          "then": "Máy chủ backend hoàn toàn không tốn băng thông truyền file âm thanh; Cloudflare R2 Lifecycle Policy tự động dọn dẹp các tệp tạm sau 24 giờ đối với gói Free, đảm bảo chi phí lưu trữ luôn dưới 5$ mỗi tháng.",
          "completed": true
        },
        {
          "id": "ac-arch-105-l1",
          "given": "Học viên Pro muốn lưu trữ các bản ghi âm kỷ niệm để theo dõi tiến trình 6 tháng",
          "when": "Hệ thống xử lý lưu trữ cho người dùng Pro",
          "then": "File được chuyển vào thư mục lưu trữ lâu dài `archive/{user_id}/` với chính sách bảo quản vĩnh viễn và mã hóa AES-256 ở trạng thái nghỉ (At-Rest Encryption).",
          "completed": true
        },
        {
          "id": "ac-arch-105-a11y",
          "given": "Học viên yêu cầu xóa toàn bộ dữ liệu ghi âm cá nhân theo chuẩn quyền riêng tư",
          "when": "Bấm nút \"Xóa lịch sử giọng nói của tôi\" trong phần Cài đặt",
          "then": "Hệ thống gọi API xóa toàn bộ bucket prefix của người dùng trong 3 giây và gửi thông báo xác nhận minh bạch.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-arch-105-r2",
          "title": "Tích hợp AWS S3 SDK tương thích với Cloudflare R2 và viết hàm generatePresignedPutUrl",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-arch-105-lifecycle",
          "title": "Cấu hình R2 Bucket Lifecycle Rules tự động xóa tiền tố uploads/temp/ sau 24 giờ",
          "category": "DevOps/Scale",
          "completed": true
        },
        {
          "id": "t-arch-105-upload",
          "title": "Xây dựng component DirectAudioUploader trên frontend hỗ trợ XMLHttpRequest progress và resume khi mất mạng",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-arch-105-cors",
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
      "notes": "### 🎨 UI/UX Design System Specifications\n- **Mã nguồn Upload Helper**: `vietphonics-app/src/utils/audioUploader.js`\n- **Cấu trúc lưu trữ Cloudflare R2**:\n  - Tạm thời (Free): `audio-temp/{yyyy-mm-dd}/{user_id}/{record_id}.webm` (TTL: 1 day)\n  - Vĩnh viễn (Pro): `audio-vault/{user_id}/{phoneme}/{record_id}.webm` (Lifecycle: Keep forever)\n- **Ưu thế Cloudflare R2**:\n  - Chi phí Egress = 0$ (hoàn toàn miễn phí khi học viên tải lại file âm thanh để nghe)\n  - Tương thích 100% với S3 API tiêu chuẩn.",
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
          "id": "ac-adv-101-ui",
          "given": "Giao diện phòng thí nghiệm Golden Speaker Lab trong AdvancedAiLabView",
          "when": "Render trên màn hình",
          "then": "Hiển thị huy hiệu Golden Voice phát sáng viền vàng kim Amber-400, trình phát âm thanh đối chiếu 3 kênh (1. Giọng học viên thực tế, 2. Giọng Golden Speaker của chính mình, 3. Giọng người bản ngữ gốc) với dải sóng âm đồng bộ.",
          "completed": true
        },
        {
          "id": "ac-adv-101-scale-5000",
          "given": "5,000 học viên cùng tạo và nghe các bản mẫu Golden Speaker",
          "when": "Xử lý tổng hợp giọng nói",
          "then": "Vector âm sắc 256 chiều của học viên được lưu trong Redis Cache (1KB/user), các file audio sinh ra được lưu trên CDN edge cache với khóa `golden:{user_id}:{word_hash}`, giúp giảm tải 90% GPU inference server.",
          "completed": true
        },
        {
          "id": "ac-adv-101-l1",
          "given": "Học viên người Việt giữ âm sắc giọng trầm hoặc bổng đặc trưng tiếng Việt",
          "when": "Golden Speaker tổng hợp giọng nói",
          "then": "Giữ nguyên 100% tần số cơ bản F0 và âm sắc tự nhiên của học viên, nhưng sửa triệt để các lỗi phụ âm cuối (/t/, /k/, /s/, /z/) và mở rộng dải F1/F2 của các nguyên âm chuẩn Anh-Mỹ.",
          "completed": true
        },
        {
          "id": "ac-adv-101-a11y",
          "given": "Học viên muốn chuyển đổi nhanh giữa các mẫu âm thanh",
          "when": "Nhấn các phím tắt A (Giọng mình), B (Golden Speaker), C (Bản ngữ)",
          "then": "Âm thanh tương ứng phát ngay lập tức không bị khựng, kèm thông báo trạng thái trực quan trên màn hình.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-adv-101-ui",
          "title": "Xây dựng giao diện GoldenSpeakerLab với 3 kênh so sánh âm thanh trực quan và hoạt ảnh sóng âm đa tầng",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-adv-101-model",
          "title": "Tích hợp mô hình XTTS-v2 / OpenVoice trích xuất speaker embedding 256 chiều từ đoạn thu âm 10 giây",
          "category": "AI/DSP",
          "completed": true
        },
        {
          "id": "t-adv-101-cache",
          "title": "Thiết kế chiến lược bộ nhớ đệm Redis lưu trữ speaker embedding cho 5,000 users với tốc độ tải < 2ms",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-adv-101-scale",
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
      "notes": "### 🎨 UI/UX Design System Specifications\n- **Màn hình tham chiếu**: `vietphonics-app/src/views/AdvancedAiLabView.jsx` (Tab: `golden-speaker`)\n- **Visual Design Tokens**:\n  - Golden Aura: `shadow-[0_0_25px_rgba(245,158,11,0.35)] border-amber-300 dark:border-amber-600`\n  - Waveform Channels: Kênh Học viên (Đỏ Rose #f43f5e), Kênh Golden (Vàng Hổ Phách #f59e0b), Kênh Bản ngữ (Xanh Ngọc #10b981).\n- **5,000 Users Concurrency Architecture**:\n  - Speaker embeddings được nạp sẵn vào Redis RAM (5,000 users * 1KB = 5MB RAM cực kỳ nhẹ).\n  - Sử dụng ONNX Runtime nén FP16 cho phép chạy song song 64 luồng TTS trên mỗi card NVIDIA T4.",
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
          "id": "ac-adv-102-ui",
          "given": "Giao diện Webcam Lip Tracking View",
          "when": "Camera hoạt động",
          "then": "Khung hình video bo góc mềm mại viền kính mờ glassmorphism, lớp phủ canvas lưới mốc môi 40 điểm phát sáng xanh neon (#00f5d4), hai thanh đo gauge (Độ mở hàm Jaw & Độ căng môi Tension) đặt ở góc phải với chỉ số chuẩn (Target Zone) được đánh dấu vạch xanh.",
          "completed": true
        },
        {
          "id": "ac-adv-102-scale-5000",
          "given": "5,000 học viên cùng lúc bật webcam luyện khẩu hình trên các loại laptop và điện thoại",
          "when": "Chạy mô hình thị giác máy tính",
          "then": "100% việc nhận diện mốc khuôn mặt chạy trên WebAssembly (Wasm) và GPU máy khách (WebGL/WebGPU) thông qua MediaPipe Vision Tasks; máy chủ backend chịu tải 0% CPU và 0 byte băng thông video.",
          "completed": true
        },
        {
          "id": "ac-adv-102-l1",
          "given": "Học viên phát âm âm /æ/ nhưng khẩu hình quá hẹp như âm /e/ của tiếng Việt",
          "when": "Hệ thống so sánh độ mở hàm với tiêu chuẩn",
          "then": "Vòng đo hàm chuyển sang màu cảnh báo hổ phách kèm chỉ dẫn trực quan: \"Hạ hàm dưới sâu hơn 15mm! Miệng mở rộng gấp đôi như khi ngáp\".",
          "completed": true
        },
        {
          "id": "ac-adv-102-a11y",
          "given": "Học viên không có camera hoặc từ chối cấp quyền",
          "when": "Webcam không khả dụng",
          "then": "Hệ thống tự động chuyển sang chế độ \"Mô hình 3D Giải Phẫu Ảo (Virtual 3D Mouth Simulator)\" với ảnh động mặt cắt chuyển động của lưỡi và môi để học viên quan sát.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-adv-102-mediapipe",
          "title": "Tích hợp @mediapipe/tasks-vision FaceLandmarker chạy hoàn toàn trên Web Worker và WebGL",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-adv-102-calc",
          "title": "Viết thuật toán tính toán tỷ lệ mở hàm (Upper Lip to Lower Lip Euclidean Distance) và độ bè mép môi (Mouth Corner Width)",
          "category": "AI/DSP",
          "completed": true
        },
        {
          "id": "t-adv-102-canvas",
          "title": "Xây dựng Canvas Overlay vẽ 40 điểm môi phát sáng neon với hiệu ứng phản hồi xúc giác thị giác 60 FPS",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-adv-102-scale",
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
      "notes": "### 🎨 UI/UX Design System Specifications\n- **Màn hình tham chiếu**: `src/ui-reference/webcam_lip_tracking_interface/code.html`\n- **React Component**: `vietphonics-app/src/components/advanced/WebcamLipTracker.jsx`\n- **Các điểm mốc MediaPipe (Lip Indices)**:\n  - Môi trên đỉnh: Landmark 13 & 0\n  - Môi dưới đáy: Landmark 14 & 17\n  - Khóe môi trái/phải: Landmark 61 & 291\n- **Client-Side Zero Server Cost**:\n  - Không truyền video lên server, bảo vệ quyền riêng tư 100% chuẩn GDPR/COPPA.",
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
          "id": "ac-adv-103-ui",
          "given": "Giao diện Biểu đồ Vowel Space Chart trong AdvancedAiLabView",
          "when": "Hiển thị trên màn hình",
          "then": "Biểu đồ tọa độ 2 trục chuẩn ngữ âm học (Trục Y đảo ngược F1 - Độ cao của lưỡi: High -> Low; Trục X đảo ngược F2 - Vị trí lưỡi: Front -> Back), các vùng elip mục tiêu của 12 nguyên âm đơn tiếng Anh hiển thị màu pastel thanh lịch, chấm tròn học viên tỏa sáng radar theo âm lượng.",
          "completed": true
        },
        {
          "id": "ac-adv-103-scale-5000",
          "given": "5,000 học viên cùng lúc luyện tập trên biểu đồ nguyên âm",
          "when": "Hệ thống tính toán giải thuật ngữ âm",
          "then": "Toàn bộ thuật toán Burg LPC Formant Extraction được biên dịch sang WebAssembly (Wasm) chạy trực tiếp trong AudioWorkletNode của trình duyệt máy khách, máy chủ backend hoàn toàn không phải xử lý tín hiệu DSP.",
          "completed": true
        },
        {
          "id": "ac-adv-103-l1",
          "given": "Học viên phát âm /ɪ/ (trong từ \"ship\") nhưng kéo F1/F2 rơi vào vùng của /iː/ (trong từ \"sheep\")",
          "when": "Chấm tọa độ rơi ra ngoài elip mục tiêu",
          "then": "Biểu đồ vẽ mũi tên vector chỉ đường từ vị trí hiện tại sang elip /ɪ/ kèm hướng dẫn: \"Thả lỏng cơ lưỡi và hạ hàm xuống một chút để đưa chấm về vùng mục tiêu màu xanh ngọc\".",
          "completed": true
        },
        {
          "id": "ac-adv-103-a11y",
          "given": "Người dùng xem lại kết quả phân tích",
          "when": "Bấm nút \"Tóm tắt âm học\"",
          "then": "Bảng số liệu hiển thị rõ ràng tần số F1: 320 Hz, F2: 2250 Hz kèm đánh giá độ lệch (Delta Offset: 8%) bằng phông JetBrains Mono dễ đọc.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-adv-103-lpc",
          "title": "Triển khai thuật toán Burg LPC Formant Extractor trong AudioWorkletNode xử lý tín hiệu 50 lần/giây",
          "category": "Audio/DSP",
          "completed": true
        },
        {
          "id": "t-adv-103-chart",
          "title": "Xây dựng component VowelSpaceChart với SVG tương tác, các vùng elip phân bố chuẩn IPA và vệt quỹ đạo di chuyển (trail effect)",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-adv-103-norm",
          "title": "Tích hợp công thức chuẩn hóa âm học Bark Scale / Lobanov Normalization bù đắp khác biệt giữa giọng nam, giọng nữ và trẻ em",
          "category": "Audio/DSP",
          "completed": true
        },
        {
          "id": "t-adv-103-scale",
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
      "notes": "### 🎨 UI/UX Design System Specifications\n- **Màn hình tham chiếu**: `vietphonics-app/src/views/AdvancedAiLabView.jsx` (Tab: `vowel-space`)\n- **Tọa độ trục chuẩn Ngữ Âm Học (Inverted Acoustic Axes)**:\n  - Trục Y (F1): Đảo ngược từ 200 Hz (Đỉnh - Lưỡi nâng cao e.g. /iː/, /uː/) xuống 1000 Hz (Đáy - Hàm hạ thấp e.g. /æ/, /ɑː/)\n  - Trục X (F2): Đảo ngược từ 2800 Hz (Trái - Lưỡi đưa ra trước e.g. /iː/) xuống 600 Hz (Phải - Lưỡi thụt về sau e.g. /uː/)\n- **Target Ellipses Palette**:\n  - Front High /iː/: Emerald (`#10b981`)\n  - Front Mid-High /ɪ/: Sky (`#0284c7`)\n  - Front Low /æ/: Rose (`#f43f5e`)\n  - Central /ə/: Amber (`#f59e0b`)\n  - Back High /uː/: Violet (`#8b5cf6`).",
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
          "id": "ac-adv-104-ui",
          "given": "Giao diện phòng tư vấn AI Coach trong AdvancedAiLabView",
          "when": "Hiển thị cuộc trò chuyện",
          "then": "Ảnh đại diện AI Coach phong cách học viện sư phạm Oxford sang trọng, các thẻ \"Hồ sơ trí nhớ học viên\" (Memory Cards) hiển thị bên cạnh liệt kê: Các âm đã thuần thục, Các âm cần theo dõi, Tỷ lệ cải thiện 7 ngày qua có biểu đồ Sparkline mini.",
          "completed": true
        },
        {
          "id": "ac-adv-104-scale-5000",
          "given": "5,000 học viên đồng thời tương tác với AI Coach",
          "when": "Hệ thống truy xuất ngữ cảnh và sinh câu trả lời",
          "then": "Lịch sử học tập được nén thành bản tóm tắt hồ sơ ngữ âm (User Phonetic Profile JSON < 2KB) lưu trong Redis; mô hình ngôn ngữ phản hồi qua Server-Sent Events (SSE) streaming với TTFT (Time To First Token) < 350ms.",
          "completed": true
        },
        {
          "id": "ac-adv-104-l1",
          "given": "AI phát hiện lỗi đặc trưng do ảnh hưởng cấu âm tiếng Việt",
          "when": "Giải thích nguyên nhân mắc lỗi cho học viên",
          "then": "AI không chỉ nói đúng hay sai mà giải thích rõ cơ chế cấu âm: \"Trong tiếng Việt các âm /p, t, k/ ở cuối là âm khép không bật (unreleased stop), nhưng trong tiếng Anh bạn phải nén khí rồi bật đầu lưỡi ra\".",
          "completed": true
        },
        {
          "id": "ac-adv-104-a11y",
          "given": "Học viên muốn nghe AI Coach đọc lời nhận xét bằng giọng nói",
          "when": "Bấm nút \"Đọc lời khuyên\"",
          "then": "Hệ thống phát âm thanh giọng nữ ấm áp tự nhiên với tốc độ 1.0x, văn bản đang đọc được bôi đậm highlight đồng bộ theo từng từ.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-adv-104-ui",
          "title": "Xây dựng giao diện AiCoachLab với khung chat streaming markdown và sidebar thẻ nhớ thông tin người học",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-adv-104-rag",
          "title": "Thiết kế hệ thống RAG ngữ âm (Phonetic Feature Store) kết hợp cơ sở tri thức giải phẫu cấu âm tiếng Anh và lỗi L1 tiếng Việt",
          "category": "AI/DSP",
          "completed": true
        },
        {
          "id": "t-adv-104-memory",
          "title": "Xây dựng module PhoneticProfileMemory tự động cập nhật bản tóm tắt tiến độ người học sau mỗi bài tập",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-adv-104-scale",
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
      "notes": "### 🎨 UI/UX Design System Specifications\n- **Màn hình tham chiếu**: `vietphonics-app/src/views/AdvancedAiLabView.jsx` (Tab: `ai-coach`)\n- **Phonetic Profile Memory Schema**:\n  ```json\n  {\n    \"userId\": \"uuid\",\n    \"dialectRisk\": \"Northern-L-N\",\n    \"masteredPhonemes\": [\"/p/\", \"/m/\", \"/f/\"],\n    \"strugglingPhonemes\": [\"/θ/\", \"/ð/\", \"/st/\"],\n    \"recentMilestone\": \"Mastered final /t/ in 5 common words\",\n    \"lastPracticedDate\": \"2026-10-03\"\n  }\n  ```\n- **Design Tokens**:\n  - AI Bubble: `bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-4`\n  - Highlight Term: `text-rose-600 dark:text-rose-400 font-mono font-semibold`.",
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
          "id": "ac-adv-105-ui",
          "given": "Giao diện Connected Speech Lab trong AdvancedAiLabView",
          "when": "Hiển thị câu luyện tập",
          "then": "Câu văn được trình bày lớn với các vòng cung nối âm màu xanh ngọc (Linking Curve) bắc cầu giữa các từ, ký hiệu gạch chéo mờ đối với âm bị nuốt (Elision), và ký tự schwa /ə/ hiển thị trên các từ chức năng yếu; dải sóng âm hiển thị chuyển động nhịp nhàng.",
          "completed": true
        },
        {
          "id": "ac-adv-105-scale-5000",
          "given": "5,000 học viên đồng thời nộp các đoạn nói câu dài",
          "when": "Hệ thống đối soát phân đoạn âm (Phonetic Forced Alignment)",
          "then": "Sử dụng mô hình CTC Forced Alignment tối ưu hóa trên ONNX Runtime, thời gian căn chỉnh và nhận diện các điểm nối âm trả về trong vòng dưới 220ms, đảm bảo thông lượng 300 câu/giây.",
          "completed": true
        },
        {
          "id": "ac-adv-105-l1",
          "given": "Người Việt có thói quen phát âm tiếng Anh ngắt từng từ một (Staccato Monosyllabic habit) do cấu trúc đơn lập của tiếng mẹ đẻ",
          "when": "Học viên ngập ngừng ngắt quãng giữa các từ cần nối",
          "then": "Hệ thống hiển thị cảnh báo: \"Lỗi ngắt từ: Bạn đang phát âm ngắt quãng như tiếng Việt! Hãy giữ hơi thở liên tục và nối phụ âm /d/ sang nguyên âm /ɒ/ thành 'hol-don'\".",
          "completed": true
        },
        {
          "id": "ac-adv-105-a11y",
          "given": "Học viên muốn nghe sự khác biệt giữa Nói Từng Từ Rời Rạc vs Nói Nối Âm Bản Ngữ",
          "when": "Bấm nút toggle \"So Sánh Robot vs Bản Ngữ\"",
          "then": "Hệ thống phát lần lượt 2 bản thu âm để học viên nghe và cảm nhận rõ sự khác biệt kỳ diệu về độ mượt mà của ngữ lưu.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-adv-105-ui",
          "title": "Xây dựng giao diện ConnectedSpeechLab với các vòng cung SVG nối âm động và ký hiệu ngữ âm tương tác",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-adv-105-align",
          "title": "Tích hợp mô hình CTC Forced Alignment phân tích chính xác thời điểm bắt đầu và kết thúc của từng âm tố",
          "category": "AI/DSP",
          "completed": true
        },
        {
          "id": "t-adv-105-rules",
          "title": "Xây dựng bộ quy tắc ngữ âm (Phonological Rule Engine) cho 4 hiện tượng: C-V Linking, Flap-T, Elision và Weak Forms",
          "category": "AI/DSP",
          "completed": true
        },
        {
          "id": "t-adv-105-scale",
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
      "notes": "### 🎨 UI/UX Design System Specifications\n- **Màn hình tham chiếu**: `vietphonics-app/src/views/AdvancedAiLabView.jsx` (Tab: `connected-speech`)\n- **4 Chế độ Luyện Hiện Tượng Ngữ Lưu**:\n  1. `linking`: Nối phụ âm cuối với nguyên âm đầu từ sau (e.g., *turn on* -> /tɜːrnɒn/)\n  2. `elision`: Nuốt âm tắc vô thanh trước phụ âm khác (e.g., *last night* -> /lɑːs naɪt/)\n  3. `assimilation`: Biến đổi âm tố khi đứng cạnh âm khác (e.g., *good boy* -> /gʊb bɔɪ/)\n  4. `weak_forms`: Rút gọn từ chức năng về âm schwa (e.g., *a cup of tea* -> /ə kʌp əv tiː/).",
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
          "id": "ac-adv-106-ui",
          "given": "Giao diện Intelligibility Score Panel trong AdvancedAiLabView",
          "when": "Hiển thị kết quả chấm điểm",
          "then": "Đồng hồ đo tốc độ (Gauge Meter) màu xanh ngọc lục bảo hiển thị điểm % thông hiểu lớn ở giữa, bên dưới là bảng ma trận 3 người nghe ảo (Mỹ, Anh, Toàn cầu) với trạng thái \"Hiểu 100%\" kèm danh sách các từ bị nghe nhầm (Confusion Matrix) tô vàng cảnh báo.",
          "completed": true
        },
        {
          "id": "ac-adv-106-scale-5000",
          "given": "5,000 học viên kiểm tra độ thông hiểu định kỳ",
          "when": "Chạy kiểm tra đa mô hình",
          "then": "Để tránh chi phí gọi nhiều API thương mại, hệ thống chạy 1 mô hình Whisper đa ngôn ngữ cục bộ kết hợp với mô hình Acoustic Confidence Scorer gọn nhẹ (chỉ 15MB) trích xuất trực tiếp xác suất âm vị (Posterior Probabilities), đáp ứng dưới 300ms cho 5,000 users.",
          "completed": true
        },
        {
          "id": "ac-adv-106-l1",
          "given": "Học viên phát âm từ \"sheet\" nhưng do thiếu âm đuôi hoặc sai âm đầu /ʃ/ khiến máy nghe thành \"shit\"",
          "when": "Bảng từ dễ gây hiểu lầm (Critical Misunderstandings) phân tích",
          "then": "Đánh dấu cảnh báo nguy cơ cao (High Semantic Risk): \"Cảnh báo hiểu lầm: Người nghe có thể nghe nhầm sang từ nhạy cảm! Hãy kéo dài âm /iː/ và cong môi phát âm /ʃ/\".",
          "completed": true
        },
        {
          "id": "ac-adv-106-a11y",
          "given": "Học viên muốn xem chi tiết dạng bảng",
          "when": "Bấm nút \"Xem bảng ma trận từ\"",
          "then": "Bảng hiển thị tương phản cao theo chuẩn WCAG 2.1 AA, cho phép dùng phím Tab duyệt qua từng từ và nghe lại âm thanh tương ứng.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-adv-106-ui",
          "title": "Xây dựng giao diện IntelligibilityLab với đồng hồ đo Gauge Meter và ma trận rủi ro hiểu lầm ngữ nghĩa (Semantic Risk Matrix)",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-adv-106-engine",
          "title": "Phát triển thuật toán tính điểm Intelligibility Index dựa trên tích chập độ tự tin nhận diện âm vị (Phonetic Confidence Convolutions)",
          "category": "AI/DSP",
          "completed": true
        },
        {
          "id": "t-adv-106-risk",
          "title": "Xây dựng cơ sở dữ liệu các cặp từ nguy hiểm dễ gây hiểu lầm nhạy cảm trong giao tiếp kinh doanh và công sở",
          "category": "AI/DSP",
          "completed": true
        },
        {
          "id": "t-adv-106-scale",
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
      "notes": "### 🎨 UI/UX Design System Specifications\n- **Màn hình tham chiếu**: `vietphonics-app/src/views/AdvancedAiLabView.jsx` (Tab: `intelligibility`)\n- **Khái niệm then chốt (World Englishes Paradigm)**:\n  - Phân biệt giữa `Accentedness` (Độ đậm giọng địa phương) và `Intelligibility` (Mức độ người nghe hiểu được nội dung).\n  - Không phạt học viên nếu họ giữ một chút chất giọng Việt Nam miễn là từ ngữ được phát âm rõ ràng, không gây nhầm lẫn nghĩa.\n- **Critical Misunderstanding Warning**:\n  - `sheet` vs `shit`\n  - `beach` vs `bitch`\n  - `peace` vs `piss`.",
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
          "id": "ac-adv-107-ui",
          "given": "Giao diện Voice Journal trong AdvancedAiLabView",
          "when": "Kết thúc bài thu âm tự do",
          "then": "Hiển thị đoạn nhật ký dạng văn bản có tô màu từng từ theo điểm số (Xanh >85%, Vàng 60-84%, Đỏ <60%), thanh đo \"Khoảng Cách Chuyển Di (Transfer Gap: -12%)\" so sánh giữa điểm đọc kịch bản và điểm nói tự do, danh sách nhật ký cũ dạng dòng thời gian thanh lịch.",
          "completed": true
        },
        {
          "id": "ac-adv-107-scale-5000",
          "given": "5,000 học viên nộp nhật ký thoại mỗi buổi tối",
          "when": "Hệ thống lưu trữ và xử lý các bản ghi âm dài 60 giây",
          "then": "File audio được nén Opus 32kbps (~240KB/phút) lưu trữ an toàn trên Cloudflare R2, tác vụ phiên âm và chấm điểm được đưa vào hàng đợi nền với thời gian xử lý hoàn tất dưới 3.5 giây.",
          "completed": true
        },
        {
          "id": "ac-adv-107-l1",
          "given": "Học viên khi nói tự do thường có thói quen chèn âm đệm tiếng Việt (e.g., \"ờ\", \"ừm\", hoặc nuốt sạch âm cuối /s/)",
          "when": "Bộ phân tích nhật ký rà soát đoạn nói",
          "then": "Báo cáo ghi nhận: \"Khi nói tự do, bạn đã quên phát âm âm cuối /s/ trong 6 từ liên tiếp. Hãy tập thở chậm lại để giữ vững cơ miệng!\".",
          "completed": true
        },
        {
          "id": "ac-adv-107-a11y",
          "given": "Học viên xem lại các bài nhật ký trong quá khứ",
          "when": "Bấm vào bất kỳ từ nào trên đoạn văn bản",
          "then": "Trình phát âm thanh nhảy ngay đến đúng mili-giây học viên nói từ đó và phát lại đoạn âm thanh tương ứng, hỗ trợ phím mũi tên tua lại 5 giây.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-adv-107-ui",
          "title": "Xây dựng giao diện VoiceJournalLab với dòng thời gian Timeline lịch sử và trình phát audio đồng bộ từ ngữ (Interactive Word-Synced Player)",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-adv-107-asr",
          "title": "Tích hợp mô hình Whisper ASR kết hợp Word-level Timestamp Alignment trích xuất thời điểm chính xác của từng từ",
          "category": "AI/DSP",
          "completed": true
        },
        {
          "id": "t-adv-107-gap",
          "title": "Xây dựng thuật toán tính toán Transfer Gap Index so sánh điểm số đọc kịch bản tĩnh vs nói tự do",
          "category": "AI/DSP",
          "completed": true
        },
        {
          "id": "t-adv-107-scale",
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
      "notes": "### 🎨 UI/UX Design System Specifications\n- **Màn hình tham chiếu**: `vietphonics-app/src/views/AdvancedAiLabView.jsx` (Tab: `voice-journal`)\n- **Transfer Gap Metric**:\n  - $TransferGap = ReadSpeechScore - SpontaneousSpeechScore$\n  - Mục tiêu đào tạo: Đưa $TransferGap$ về dưới 5% (thể hiện phát âm đã trở thành phản xạ vô thức tự nhiên).\n- **Interactive Transcript Player**:\n  - Click vào từ bất kỳ -> `audioRef.current.currentTime = word.startMs / 1000` -> Phát audio.",
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
          "id": "ac-adv-108-ui",
          "given": "Giao diện Accent Explorer trong AdvancedAiLabView",
          "when": "Hiển thị trên màn hình",
          "then": "Bộ 3 thẻ chọn cờ quốc gia (Mỹ - Anh - Úc) phong cách hiện đại với hiệu ứng viền sáng khi được kích hoạt, bảng so sánh đối chiếu âm thanh 3 cột trực quan kèm dải đo mức độ tiệm cận giọng mục tiêu (Dialect Proximity Gauge: 78%).",
          "completed": true
        },
        {
          "id": "ac-adv-108-scale-5000",
          "given": "5,000 học viên thường xuyên chuyển đổi giữa các chất giọng mục tiêu",
          "when": "Hệ thống nạp từ điển phiên âm và âm thanh mẫu theo vùng miền",
          "then": "Toàn bộ từ điển phiên âm đa chất giọng (CMU Dict cho giọng Mỹ, BEEP/Combilex cho giọng Anh) được lưu trong bộ nhớ đệm Redis key-value với thời gian truy vấn < 1ms.",
          "completed": true
        },
        {
          "id": "ac-adv-108-l1",
          "given": "Học viên Việt Nam thường học pha trộn lộn xộn giữa giọng Anh và giọng Mỹ (e.g. cuộn lưỡi /r/ kiểu Mỹ nhưng lại dùng từ vựng kiểu Anh)",
          "when": "Hệ thống phân tích tính nhất quán của chất giọng (Accent Consistency Check)",
          "then": "Chỉ ra các điểm không nhất quán: \"Bạn đang chọn mục tiêu giọng Mỹ, nhưng từ 'can't' bạn lại phát âm theo giọng Anh /kɑːnt/. Trong giọng Mỹ hãy nói /kænt/ nhé!\".",
          "completed": true
        },
        {
          "id": "ac-adv-108-a11y",
          "given": "Học viên chuyển đổi giọng bằng bàn phím",
          "when": "Bấm phím số 1 (Mỹ), 2 (Anh), 3 (Úc)",
          "then": "Hệ thống lập tức chuyển đổi cấu hình âm mẫu và thông báo trạng thái qua trình đọc màn hình, đảm bảo khả năng tiếp cận thuận tiện.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-adv-108-ui",
          "title": "Xây dựng component AccentExplorerLab với 3 thẻ chọn chất giọng quốc gia và bảng đối chiếu âm thanh 3 miền",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-adv-108-dict",
          "title": "Xây dựng cơ sở dữ liệu phiên âm đa chuẩn ngữ âm (Multi-Dialect Lexicon) cho 10,000 từ vựng phổ biến nhất",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-adv-108-proximity",
          "title": "Phát triển mô hình đo khoảng cách âm học Dialect Proximity Scorer sử dụng khoảng cách Euclidean trên ma trận Formant",
          "category": "AI/DSP",
          "completed": true
        },
        {
          "id": "t-adv-108-scale",
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
      "notes": "### 🎨 UI/UX Design System Specifications\n- **Màn hình tham chiếu**: `vietphonics-app/src/views/AdvancedAiLabView.jsx` (Tab: `accent-explorer`)\n- **3 Chuẩn Giọng Hỗ Trợ**:\n  1. `US` (General American): Rhotic /r/, Flap [ɾ] in *water*, Low-back merger\n  2. `UK` (Received Pronunciation): Non-rhotic, Broad-A in *bath* /bɑːθ/, Glottal stop [ʔ]\n  3. `AU` (Australian English): High front vowels shifted, Rising inflection, Intonation buoyancy.\n- **Dialect Proximity Metric**:\n  - Đo độ lệch Formant và biến thể âm tố so với phân phối mẫu của người bản ngữ từng quốc gia.",
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
          "id": "ac-pay-101-ui",
          "given": "Giao diện màn hình thanh toán VietQR Checkout View",
          "when": "Hiển thị mã QR cho học viên",
          "then": "Ảnh mã VietQR kích thước 240x240px sắc nét có logo ngân hàng chính thống ở tâm, khung quét bo góc hiện đại có tia quét radar chuyển động nhẹ, nút bấm một chạm \"Sao chép số tài khoản\" và \"Sao chép số tiền\" có thông báo Toast Toastification xác nhận tiện lợi.",
          "completed": true
        },
        {
          "id": "ac-pay-101-scale-5000",
          "given": "Hàng trăm học viên cùng quét mã QR và chuyển khoản trong giờ vàng khuyến mại",
          "when": "Webhook ngân hàng (SePay / Casso / OpenBanking) gửi thông báo biến động số dư",
          "then": "Hệ thống đối soát phân tích cú pháp nội dung chuyển tiền bằng biểu thức chính quy (Regex Pattern Matching), tìm đúng user_id và nâng cấp tài khoản trong vòng dưới 80ms, xử lý được 200 webhook/giây.",
          "completed": true
        },
        {
          "id": "ac-pay-101-l1",
          "given": "Học viên chuyển tiền từ các ứng dụng ngân hàng phổ biến tại Việt Nam (Vietcombank, Techcombank, MB Bank, VPBank)",
          "when": "Khách hàng quét mã QR bằng tính năng QR Pay trong app ngân hàng",
          "then": "Toàn bộ số tiền và nội dung tự động điền sẵn 100%, học viên chỉ cần bấm xác thực vân tay/FaceID mà không phải gõ bất kỳ con số nào.",
          "completed": true
        },
        {
          "id": "ac-pay-101-a11y",
          "given": "Học viên chuyển khoản sai cú pháp nội dung (e.g. quên gõ tiền tố VP)",
          "when": "Hệ thống nhận biến động số dư không khớp",
          "then": "Giao dịch được ghi nhận vào bảng `unmatched_transactions` và gửi cảnh báo ngay về kênh Telegram Admin kèm số điện thoại học viên để bộ phận CSKH hỗ trợ kích hoạt thủ công trong 5 phút.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pay-101-vietqr",
          "title": "Tích hợp thư viện tạo mã VietQR theo đặc tả chuẩn EMVCo và ngân hàng nhà nước Napas 247",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-pay-101-sepay",
          "title": "Xây dựng Webhook Endpoint tiếp nhận biến động số dư từ SePay/OpenBanking kèm xác thực API Key bảo mật",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-pay-101-regex",
          "title": "Viết bộ phân tích cú pháp Regex trích xuất UserID và số tiền giao dịch chống trường hợp học viên gõ thừa khoảng trắng",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-pay-101-scale",
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
      "notes": "### 🎨 UI/UX Design System Specifications\n- **Màn hình tham chiếu**: `src/ui-reference/m_n_h_nh_ch_n_g_i_v_thanh_to_n_qr_code/code.html`\n- **React Component**: `vietphonics-app/src/components/subscription/VietQrCheckout.jsx`\n- **VietQR URL Template**:\n  - `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-compact2.png?amount=${AMOUNT}&addInfo=${MEMO}&accountName=${ACCOUNT_NAME}`\n- **Lợi ích kinh tế**:\n  - Cổng quốc tế (Stripe): Phí 2.9% + 7,000đ = Mất ~8,000đ trên đơn 30,000đ (mất 26% doanh thu!)\n  - VietQR Chuyển khoản: Phí 0% -> Doanh nghiệp giữ trọn vẹn 100% doanh thu 30,000đ.",
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
          "id": "ac-pay-102-ui",
          "given": "Giao diện cửa sổ thanh toán Checkout Modal",
          "when": "Đang chờ học viên quét mã",
          "then": "Hiển thị vòng quay đếm ngược thời gian giữ chỗ thanh toán (15:00 phút), thông báo trạng thái \"Đang chờ thanh toán...\" có chấm xanh nhấp nháy, kèm huy hiệu hoàn tiền 100% nếu không hài lòng trong 7 ngày.",
          "completed": true
        },
        {
          "id": "ac-pay-102-scale-5000",
          "given": "Hàng trăm học viên cùng mở modal thanh toán cùng lúc",
          "when": "Các máy khách duy trì kết nối kiểm tra trạng thái thanh toán",
          "then": "Sử dụng Server-Sent Events (SSE) nhẹ nhàng hoặc Redis key polling có ETag; máy chủ tiêu tốn dưới 2MB RAM cho 500 kết nối lắng nghe đồng thời, không gây quá tải CPU.",
          "completed": true
        },
        {
          "id": "ac-pay-102-l1",
          "given": "Học viên mở ứng dụng trên điện thoại di động (Mobile Web)",
          "when": "Bấm nút \"Mở App Ngân Hàng\"",
          "then": "Hệ thống hỗ trợ Deep Link tự động mở ứng dụng ngân hàng cài sẵn trên máy (Vietcombank, MB Bank, v.v.) giúp quy trình thanh toán gói gọn trong 2 thao tác chạm.",
          "completed": true
        },
        {
          "id": "ac-pay-102-a11y",
          "given": "Người dùng bấm nút hủy thanh toán hoặc đóng cửa sổ",
          "when": "Bấm nút \"X\" hoặc phím Escape",
          "then": "Hệ thống hỏi nhẹ nhàng \"Bạn có chắc muốn dừng đăng ký gói Pro chỉ 1.000đ/ngày?\" với 2 nút lựa chọn rõ ràng, đảm bảo khả năng tiếp cận và điều hướng thuận tiện.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pay-102-sse",
          "title": "Xây dựng kênh Server-Sent Events (SSE) /api/subscriptions/listen-status/:orderId phát thông báo kích hoạt",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-pay-102-confetti",
          "title": "Tích hợp thư viện canvas-confetti tạo hoạt ảnh pháo hoa chúc mừng khi nâng cấp Pro thành công",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pay-102-deeplink",
          "title": "Triển khai danh sách App Scheme Deep Link cho top 10 ngân hàng phổ biến nhất tại Việt Nam",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pay-102-scale",
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
      "notes": "### 🎨 UI/UX Design System Specifications\n- **Màn hình tham chiếu**: `src/ui-reference/m_n_h_nh_ch_n_g_i_v_thanh_to_n_qr_code/code.html`\n- **React Component**: `vietphonics-app/src/components/subscription/CheckoutModal.jsx`\n- **Countdown Timer**:\n  - Thời lượng: 15 phút (900 giây)\n  - Khi còn dưới 2 phút: Chữ hiển thị màu đỏ cam (`#ea580c`) kèm nhấp nháy nhẹ cảnh báo\n- **Deep Link Ngân Hàng**:\n  - Vietcombank: `vcb://`\n  - Techcombank: `tcb://`\n  - MB Bank: `mbcustom://`.",
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
          "id": "ac-pay-103-ui",
          "given": "Thẻ giá gói dịch vụ PricingCard Component",
          "when": "Render trên trang chọn gói",
          "then": "Gói Năm được làm nổi bật bằng khung viền Rose-500 dày 2px kèm huy hiệu \"Lựa Chọn Tốt Nhất (Best Value)\" ở góc trên, danh sách 6 đặc quyền độc quyền có dấu tick xanh ngọc lục bảo rõ nét.",
          "completed": true
        },
        {
          "id": "ac-pay-103-scale-5000",
          "given": "5,000 học viên truy cập trang giá dịch vụ trong các chiến dịch quảng cáo",
          "when": "Trang web tải cấu hình bảng giá và chương trình khuyến mãi",
          "then": "Cấu hình giá được lưu tĩnh trên CDN Edge Cache (Cloudflare) với P95 thời gian phản hồi < 20ms, máy chủ gốc chịu tải 0% cho việc hiển thị bảng giá.",
          "completed": true
        },
        {
          "id": "ac-pay-103-l1",
          "given": "Học viên phân vân về chi phí học tập",
          "when": "Đọc thông điệp so sánh chi phí",
          "then": "Giao diện hiển thị phép so sánh dí dỏm và gần gũi: \"Chỉ bằng 1 cốc trà sữa mỗi tháng để sở hữu giọng tiếng Anh chuẩn bản ngữ suốt đời!\".",
          "completed": true
        },
        {
          "id": "ac-pay-103-a11y",
          "given": "Người dùng sử dụng công nghệ hỗ trợ đọc màn hình",
          "when": "Chuyển đổi toggle chu kỳ thanh toán",
          "then": "Trình đọc thông báo rõ: \"Đã chọn gói thanh toán Năm, giá 299,000 đồng một năm, tiết kiệm 35 phần trăm so với gói tháng\".",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pay-103-ui",
          "title": "Xây dựng component PricingTierCards với thanh trượt toggle Tháng/Năm và hiệu ứng chuyển đổi mượt mà",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pay-103-plans",
          "title": "Thiết kế cấu trúc dữ liệu SubscriptionPlan và lưu trữ cấu hình linh hoạt trong cơ sở dữ liệu",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-pay-103-discount",
          "title": "Phát triển module Coupon & Voucher giảm giá (e.g., BACK2SCHOOL, VIETPHONICS10) cho phép áp mã trực tiếp",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-pay-103-scale",
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
      "notes": "### 🎨 UI/UX Design System Specifications\n- **Màn hình tham chiếu**: `src/ui-reference/m_n_h_nh_ch_n_g_i_v_thanh_to_n_qr_code/code.html`\n- **React Component**: `vietphonics-app/src/components/subscription/PricingTierCards.jsx`\n- **Bảng so sánh gói**:\n  - Gói Tháng (Monthly): 30,000 VNĐ / tháng (phù hợp học thử ngắn hạn)\n  - Gói Năm (Yearly): 299,000 VNĐ / năm (tặng thêm 3 tháng miễn phí = 15 tháng sử dụng, tương đương 19,900đ/tháng)\n- **Tâm lý học hành vi (Behavioral Economics)**:\n  - Hiệu ứng mỏ neo (Anchoring Effect): Đặt gói tháng 30k làm mốc so sánh để thấy gói năm 299k siêu tiết kiệm.",
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
          "id": "ac-pay-104-ui",
          "given": "Banner thông báo thời gian ân hạn trên thanh điều hướng",
          "when": "Học viên đăng nhập trong thời gian ân hạn",
          "then": "Hiển thị dải banner màu hổ phách Amber-500 viền mềm mại: \"Gói Pro của bạn đang trong 3 ngày ân hạn (còn 48 giờ). Hãy gia hạn ngay để không làm gián đoạn chuỗi luyện tập!\", kèm nút bấm \"Gia Hạn 30K\" một chạm.",
          "completed": true
        },
        {
          "id": "ac-pay-104-scale-5000",
          "given": "5,000 người dùng có ngày hết hạn phân bổ rải rác trong tháng",
          "when": "Hệ thống kiểm tra và gửi thông báo nhắc gia hạn",
          "then": "Cron job chạy bất đồng bộ lúc 09:00 sáng mỗi ngày, quét và xử lý 5,000 tài khoản trong vòng dưới 1.5 giây thông qua BullMQ worker, không ảnh hưởng đến hoạt động luyện âm trực tiếp.",
          "completed": true
        },
        {
          "id": "ac-pay-104-l1",
          "given": "Kênh gửi thông báo nhắc nhở phù hợp với thói quen người Việt",
          "when": "Hệ thống gửi tin nhắn nhắc gia hạn",
          "then": "Tích hợp gửi thông báo qua Zalo ZNS (Zalo Notification Service) và Email tiếng Việt thân thiện kèm đường link mở thẳng vào trang quét mã VietQR.",
          "completed": true
        },
        {
          "id": "ac-pay-104-a11y",
          "given": "Sau 3 ngày ân hạn học viên vẫn chưa gia hạn",
          "when": "Hệ thống chuyển trạng thái sang EXPIRED",
          "then": "Dữ liệu phát âm và tiến độ học tập của học viên được bảo toàn nguyên vẹn 100% (không bao giờ bị xóa), chỉ hạ cấp quyền truy cập về gói Free 5 bài/ngày một cách nhẹ nhàng.",
          "completed": true
        }
      ],
      "technicalTasks": [
        {
          "id": "t-pay-104-cron",
          "title": "Xây dựng BullMQ cron job kiểm tra trạng thái thuê bao hàng ngày và chuyển đổi trạng thái ACTIVE -> GRACE_PERIOD -> EXPIRED",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-pay-104-zalo",
          "title": "Tích hợp Zalo Cloud API (ZNS) gửi tin nhắn thông báo tự động cho người dùng tại Việt Nam",
          "category": "Backend",
          "completed": true
        },
        {
          "id": "t-pay-104-ui",
          "title": "Xây dựng component GracePeriodBanner với nút gia hạn nhanh và đồng hồ đếm ngược giờ ân hạn",
          "category": "Frontend",
          "completed": true
        },
        {
          "id": "t-pay-104-scale",
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
      "notes": "### 🎨 UI/UX Design System Specifications\n- **Màn hình tham chiếu**: `src/ui-reference/m_n_h_nh_ch_n_g_i_v_thanh_to_n_qr_code/code.html`\n- **React Component**: `vietphonics-app/src/components/subscription/GracePeriodBanner.jsx`\n- **Quy trình Nhắc gia hạn**:\n  - D-3 (Trước 3 ngày): Email & Web Push nhắc nhở thân thiện\n  - D-0 (Ngày hết hạn): Bật chế độ Ân hạn 3 ngày (Grace Period), gửi tin Zalo ZNS\n  - D+3 (Hết ân hạn): Chuyển tài khoản về Free Tier, gửi email bảo lưu tiến trình học tập.",
      "createdAt": "2026-10-03T08:34:10.829Z"
    }
  ]
};
