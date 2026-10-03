export const advancedAiStories = [
  {
    id: 'ADV-101',
    epic_id: 'epic-advanced-ai-lab',
    title: 'Golden Speaker: Nghe Chính Giọng Mình Phát Âm Chuẩn Bản Ngữ (Voice-Cloned Self Model): Mô Hình Giọng Nói Bản Thân Chuẩn Hóa',
    persona: 'Học viên cảm thấy nản lòng hoặc xa lạ khi nghe giọng người bản xứ xa vời và khó bắt chước theo âm sắc phương Tây',
    action: 'thu âm một đoạn mẫu ngắn (10 giây) để AI sao chép âm sắc (timbre) và ngữ điệu cá nhân, tạo ra phiên bản "Golden Speaker" - chính giọng nói của học viên nhưng phát âm chuẩn xác 100% như người bản ngữ',
    value: 'tạo đột phá tâm lý học tập (Self-Identification Breakthrough): não bộ tiếp thu và bắt chước giọng của chính mình nhanh gấp 3 lần so với nghe giọng người lạ',
    priority: 'must',
    status: 'in-progress',
    size: 'XL',
    points: 13,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-adv-101-voice-clone',
        given: 'Học viên hoàn thành việc đọc 3 câu mẫu hiệu chỉnh giọng (Calibration Sentences)',
        when: 'Hệ thống trích xuất vector đặc trưng âm sắc (Speaker Embedding Vector 256-D)',
        then: 'Bộ tổng hợp giọng nói Zero-Shot Voice Clone sinh ra mẫu phát âm chuẩn của từ mục tiêu bằng chính âm sắc của học viên trong vòng dưới 1.5 giây.',
        completed: true
      },
      {
        id: 'ac-adv-101-frontend-design',
        given: 'Giao diện phòng thí nghiệm Golden Speaker Lab trong AdvancedAiLabView',
        when: 'Render trên màn hình',
        then: 'Hiển thị huy hiệu Golden Voice phát sáng viền vàng kim Amber-400, trình phát âm thanh đối chiếu 3 kênh (1. Giọng học viên thực tế, 2. Giọng Golden Speaker của chính mình, 3. Giọng người bản ngữ gốc) với dải sóng âm đồng bộ.',
        completed: true
      },
      {
        id: 'ac-adv-101-backend-design',
        given: '5,000 học viên cùng tạo và nghe các bản mẫu Golden Speaker',
        when: 'Xử lý tổng hợp giọng nói qua API POST /api/v1/ai/golden-speaker-synthesize',
        then: 'Vector âm sắc 256 chiều của học viên được lưu trong Redis Cache (1KB/user), các file audio sinh ra được lưu trên CDN edge cache với khóa golden:{user_id}:{word_hash}, giúp giảm tải 90% GPU inference server.',
        completed: true
      },
      {
        id: 'ac-adv-101-l1-precision',
        given: 'Học viên người Việt giữ âm sắc giọng trầm hoặc bổng đặc trưng tiếng Việt',
        when: 'Golden Speaker tổng hợp giọng nói',
        then: 'Giữ nguyên 100% tần số cơ bản F0 và âm sắc tự nhiên của học viên, nhưng sửa triệt để các lỗi phụ âm cuối (/t/, /k/, /s/, /z/) và mở rộng dải F1/F2 của các nguyên âm chuẩn Anh-Mỹ.',
        completed: true
      },
      {
        id: 'ac-adv-101-a11y-fallback',
        given: 'Học viên muốn chuyển đổi nhanh giữa các mẫu âm thanh',
        when: 'Nhấn các phím tắt A (Giọng mình), B (Golden Speaker), C (Bản ngữ)',
        then: 'Âm thanh tương ứng phát ngay lập tức không bị khựng, kèm thông báo trạng thái trực quan trên màn hình.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-adv-101-fe-ui', title: 'Xây dựng giao diện GoldenSpeakerLab.jsx với 3 kênh so sánh âm thanh trực quan và hoạt ảnh sóng âm đa tầng', category: 'Frontend', completed: true },
      { id: 't-adv-101-be-model', title: 'Tích hợp mô hình XTTS-v2 / OpenVoice trích xuất speaker embedding 256 chiều từ đoạn thu âm 10 giây', category: 'AI/DSP', completed: true },
      { id: 't-adv-101-be-cache', title: 'Thiết kế chiến lược bộ nhớ đệm Redis lưu trữ speaker embedding cho 5,000 users với tốc độ tải < 2ms', category: 'Backend', completed: true },
      { id: 't-adv-101-be-scale', title: 'Triển khai Triton Inference Server kết hợp GPU queue xử lý tổng hợp giọng nói thời gian thực P95 < 1.5s', category: 'DevOps/Scale', completed: true },
      { id: 't-adv-101-qa', title: 'Kiểm thử độ tương đồng âm sắc (Cosine Similarity > 0.88) giữa giọng thật của học viên và giọng Golden Speaker', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/views/AdvancedAiLabView.jsx\` (Tab: \`golden-speaker\`)
- **Stitch Design Tokens**:
  - Golden Aura: \`shadow-[0_0_35px_rgba(245,158,11,0.4)] border-2 border-amber-400/80 rounded-3xl p-6 bg-slate-900/90\`
  - Channel Play Buttons: Student (Rose #f43f5e), Golden (Amber #f59e0b), Native (Emerald #10b981).

---

### 🗄️ BACKEND DESIGN SPECIFICATION
- **REST API Endpoint**:
  \`\`\`http
  POST /api/v1/ai/golden-speaker-synthesize
  Authorization: Bearer <JWT>
  Content-Type: application/json

  Request Body:
  {
    "userId": "usr_99a8b12f",
    "word": "specifically",
    "targetIpa": "/spəˈsɪfɪkli/"
  }

  Response 200 OK:
  {
    "goldenAudioUrl": "https://r2.vietphonics.com/golden/usr99_specifically.opus",
    "cached": true,
    "timbreSimilarity": 0.91,
    "synthesizedInMs": 320
  }
  \`\`\``
  },
  {
    id: 'ADV-102',
    epic_id: 'epic-advanced-ai-lab',
    title: 'Webcam Lip & Jaw Tracking: Soi Khẩu Hình Bằng Camera Ngay Trên Trình Duyệt (MediaPipe Face Landmarker): Theo Dõi Khẩu Hình Trực Quan',
    persona: 'Học viên gặp khó khăn khi hình dung độ mở miệng, độ bè của môi và độ tròn môi khi phát âm các nguyên âm khó',
    action: 'bật webcam để AI tự động vẽ lưới khẩu hình (Lip Mesh), đo đạc độ mở hàm (Jaw Openness %) và độ bè môi (Lip Spread %) theo thời gian thực ngay trên trình duyệt',
    value: 'cung cấp phản hồi sinh học thị giác (Visual Biofeedback) tức thì, giúp học viên tự điều chỉnh cơ miệng chuẩn xác mà không cần giáo viên ngồi kèm bên cạnh',
    priority: 'must',
    status: 'in-progress',
    size: 'XL',
    points: 13,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-adv-102-mesh-tracking',
        given: 'Học viên cấp quyền camera trên trình duyệt',
        when: 'Học viên phát âm từ mục tiêu (e.g., "apple" với nguyên âm /æ/)',
        then: 'Mô hình MediaPipe Face Landmarker nhận diện 468 điểm mốc khuôn mặt với tốc độ 30-60 FPS, vẽ lưới môi phát sáng và hiển thị chỉ số độ mở miệng (Open: 65%) và độ bè môi (Spread: 82%).',
        completed: true
      },
      {
        id: 'ac-adv-102-frontend-design',
        given: 'Giao diện Webcam Lip Tracking View',
        when: 'Camera hoạt động',
        then: 'Khung hình video bo góc mềm mại viền kính mờ glassmorphism, lớp phủ canvas lưới mốc môi 40 điểm phát sáng xanh neon (#00f5d4), hai thanh đo gauge (Độ mở hàm Jaw & Độ căng môi Tension) đặt ở góc phải với chỉ số chuẩn (Target Zone) được đánh dấu vạch xanh.',
        completed: true
      },
      {
        id: 'ac-adv-102-backend-design',
        given: '5,000 học viên cùng lúc bật webcam luyện khẩu hình trên các loại laptop và điện thoại',
        when: 'Chạy mô hình thị giác máy tính',
        then: '100% việc nhận diện mốc khuôn mặt chạy trên WebAssembly (Wasm) và GPU máy khách (WebGL/WebGPU) thông qua MediaPipe Vision Tasks; máy chủ backend chịu tải 0% CPU và 0 byte băng thông video.',
        completed: true
      },
      {
        id: 'ac-adv-102-l1-precision',
        given: 'Học viên phát âm âm /æ/ nhưng khẩu hình quá hẹp như âm /e/ của tiếng Việt',
        when: 'Hệ thống so sánh độ mở hàm với tiêu chuẩn',
        then: 'Vòng đo hàm chuyển sang màu cảnh báo hổ phách kèm chỉ dẫn trực quan: "Hạ hàm dưới sâu hơn 15mm! Miệng mở rộng gấp đôi như khi ngáp".',
        completed: true
      },
      {
        id: 'ac-adv-102-a11y-fallback',
        given: 'Học viên không có camera hoặc từ chối cấp quyền',
        when: 'Webcam không khả dụng',
        then: 'Hệ thống tự động chuyển sang chế độ "Mô hình 3D Giải Phẫu Ảo (Virtual 3D Mouth Simulator)" với ảnh động mặt cắt chuyển động của lưỡi và môi để học viên quan sát.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-adv-102-fe-mediapipe', title: 'Tích hợp @mediapipe/tasks-vision FaceLandmarker chạy hoàn toàn trên Web Worker và WebGL', category: 'Frontend', completed: true },
      { id: 't-adv-102-fe-calc', title: 'Viết thuật toán tính toán tỷ lệ mở hàm (Upper Lip to Lower Lip Euclidean Distance) và độ bè mép môi (Mouth Corner Width)', category: 'AI/DSP', completed: true },
      { id: 't-adv-102-fe-canvas', title: 'Xây dựng Canvas Overlay vẽ 40 điểm môi phát sáng neon với hiệu ứng phản hồi xúc giác thị giác 60 FPS', category: 'Frontend', completed: true },
      { id: 't-adv-102-be-zero', title: 'Tối ưu hóa tài nguyên RAM máy khách < 85MB bằng cách giải phóng video stream frame buffers đúng cách', category: 'DevOps/Scale', completed: true },
      { id: 't-adv-102-qa', title: 'Kiểm thử khả năng chạy mượt mà trên các thiết bị cấu hình yếu và trong điều kiện ánh sáng phòng yếu', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/components/advanced/WebcamLipTracker.jsx\`
- **Stitch Design Tokens**:
  - Video Frame: \`rounded-3xl border-2 border-slate-700 overflow-hidden relative shadow-2xl aspect-[4/3] max-w-md\`
  - Neon Lip Overlay: \`stroke-[#00f5d4] stroke-2 drop-shadow-[0_0_8px_#00f5d4]\`
  - Gauge Pill: \`bg-slate-900/80 backdrop-blur border border-slate-700 rounded-2xl p-3 flex flex-col gap-1\`.`
  },
  {
    id: 'ADV-103',
    epic_id: 'epic-advanced-ai-lab',
    title: 'Live Vowel Space Chart: Biểu Đồ Nguyên Âm F1/F2 Thời Gian Thực (Visual Formant Biofeedback): Biểu Đồ Không Gian Nguyên Âm Thời Gian Thực',
    persona: 'Người học muốn hiểu bản chất khoa học của các nguyên âm tiếng Anh và cần phản hồi trực quan xem lưỡi của mình đã đặt đúng vị trí chưa',
    action: 'phát âm các nguyên âm tiếng Anh và quan sát chấm tròn giọng nói của mình di chuyển trực tiếp trên biểu đồ tọa độ Formant F1 (Độ cao lưỡi) vs F2 (Vị trí trước/sau của lưỡi)',
    value: 'chuyển đổi khái niệm trừu tượng "đặt lưỡi ở đâu" thành tọa độ trực quan trên bản đồ âm thanh, giúp người học sửa lỗi phát âm nguyên âm chỉ sau 3 lần thử',
    priority: 'must',
    status: 'in-progress',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-adv-103-formant-extract',
        given: 'Học viên ngân dài một nguyên âm bất kỳ vào micro (e.g., /iː/, /uː/, /ɑː/)',
        when: 'Hệ thống phân tích phổ âm thanh thời gian thực bằng thuật toán Burg LPC (Linear Predictive Coding)',
        then: 'Trích xuất chính xác 2 tần số cộng hưởng F1 (200-1000Hz) và F2 (600-3000Hz) sau mỗi 50ms với độ trễ dưới 30ms.',
        completed: true
      },
      {
        id: 'ac-adv-103-frontend-design',
        given: 'Giao diện Biểu đồ Vowel Space Chart trong AdvancedAiLabView',
        when: 'Hiển thị trên màn hình',
        then: 'Biểu đồ tọa độ 2 trục chuẩn ngữ âm học (Trục Y đảo ngược F1 - Độ cao của lưỡi: High -> Low; Trục X đảo ngược F2 - Vị trí lưỡi: Front -> Back), các vùng elip mục tiêu của 12 nguyên âm đơn tiếng Anh hiển thị màu pastel thanh lịch, chấm tròn học viên tỏa sáng radar theo âm lượng.',
        completed: true
      },
      {
        id: 'ac-adv-103-backend-design',
        given: '5,000 học viên cùng lúc luyện tập trên biểu đồ nguyên âm',
        when: 'Hệ thống tính toán giải thuật ngữ âm',
        then: 'Toàn bộ thuật toán Burg LPC Formant Extraction được biên dịch sang WebAssembly (Wasm) chạy trực tiếp trong AudioWorkletNode của trình duyệt máy khách, máy chủ backend hoàn toàn không phải xử lý tín hiệu DSP.',
        completed: true
      },
      {
        id: 'ac-adv-103-l1-precision',
        given: 'Học viên phát âm /ɪ/ (trong từ "ship") nhưng kéo F1/F2 rơi vào vùng của /iː/ (trong từ "sheep")',
        when: 'Chấm tọa độ rơi ra ngoài elip mục tiêu',
        then: 'Biểu đồ vẽ mũi tên vector chỉ đường từ vị trí hiện tại sang elip /ɪ/ kèm hướng dẫn: "Thả lỏng cơ lưỡi và hạ hàm xuống một chút để đưa chấm về vùng mục tiêu màu xanh ngọc".',
        completed: true
      },
      {
        id: 'ac-adv-103-a11y-fallback',
        given: 'Người dùng xem lại kết quả phân tích',
        when: 'Bấm nút "Tóm tắt âm học"',
        then: 'Bảng số liệu hiển thị rõ ràng tần số F1: 320 Hz, F2: 2250 Hz kèm đánh giá độ lệch (Delta Offset: 8%) bằng phông JetBrains Mono dễ đọc.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-adv-103-fe-lpc', title: 'Triển khai thuật toán Burg LPC Formant Extractor trong AudioWorkletNode xử lý tín hiệu 50 lần/giây', category: 'Audio/DSP', completed: true },
      { id: 't-adv-103-fe-chart', title: 'Xây dựng component VowelSpaceChart.jsx với SVG tương tác, các vùng elip phân bố chuẩn IPA và vệt quỹ đạo di chuyển (trail effect)', category: 'Frontend', completed: true },
      { id: 't-adv-103-fe-norm', title: 'Tích hợp công thức chuẩn hóa âm học Bark Scale / Lobanov Normalization bù đắp khác biệt giữa giọng nam, giọng nữ và trẻ em', category: 'Audio/DSP', completed: true },
      { id: 't-adv-103-be-zero', title: 'Tối ưu hóa bộ nhớ AudioWorklet và Canvas đảm bảo không gây rò rỉ rác bộ nhớ (Zero Garbage Collection Jitter)', category: 'DevOps/Scale', completed: true },
      { id: 't-adv-103-qa', title: 'Kiểm thử với 50 mẫu phát âm nguyên âm chuẩn IPA quốc tế để kiểm tra độ chính xác tọa độ F1/F2 đạt trên 92%', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/views/AdvancedAiLabView.jsx\` (Tab: \`vowel-space\`)
- **Stitch Design Tokens**:
  - Inverted Acoustic Chart: \`w-full max-w-xl h-96 bg-slate-950 border border-slate-800 rounded-3xl p-6 relative\`
  - Vowel Target Ellipse: \`fill-emerald-500/10 stroke-emerald-500/40 stroke-2\`
  - Realtime User Dot: \`w-4 h-4 rounded-full bg-rose-500 shadow-[0_0_15px_#f43f5e] animate-ping\`.`
  },
  {
    id: 'ADV-104',
    epic_id: 'epic-advanced-ai-lab',
    title: 'AI Phonetics Coach Có Trí Nhớ: Chẩn Đoán Theo Đặc Trưng Cấu Âm & Nhớ Lỗi Qua Các Buổi Học (LLM + Articulatory Features): Huấn Luyện Viên Ngữ Âm AI Có Bộ Nhớ Dài Hạn',
    persona: 'Học viên muốn có một người gia sư phát âm riêng hiểu rõ thói quen, điểm mạnh và các tật phát âm cố hữu của mình qua từng ngày',
    action: 'trò chuyện và nhận lời khuyên từ Huấn luyện viên AI, người ghi nhớ toàn bộ lịch sử luyện tập 30 ngày qua và giải thích lỗi theo ngôn ngữ giải phẫu học cấu âm trực quan',
    value: 'mang lại cảm giác được đồng hành 1:1 bởi một chuyên gia ngữ âm tận tâm, biến những nhận xét chung chung thành phác đồ điều trị ngữ âm chính xác cho riêng từng học viên',
    priority: 'must',
    status: 'in-progress',
    size: 'XL',
    points: 13,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-adv-104-memory-chat',
        given: 'Học viên mở phiên tư vấn với Huấn luyện viên AI sau khi vừa hoàn thành bài luyện âm đuôi',
        when: 'Học viên hỏi: "Hôm nay em phát âm âm /t/ đã đỡ hơn hôm qua chưa cô?"',
        then: 'Huấn luyện viên AI truy vấn bộ nhớ vector (Vector Semantic Memory) và trả lời chính xác: "Chào bạn! So với buổi học thứ Ba khi bạn nuốt 80% âm /t/, hôm nay bạn đã bật âm chuẩn 65%, đặc biệt từ \'contact\' bạn đã phát âm rất rõ!".',
        completed: true
      },
      {
        id: 'ac-adv-104-frontend-design',
        given: 'Giao diện phòng tư vấn AI Coach trong AdvancedAiLabView',
        when: 'Hiển thị cuộc trò chuyện',
        then: 'Ảnh đại diện AI Coach phong cách học viện sư phạm Oxford sang trọng, các thẻ "Hồ sơ trí nhớ học viên" (Memory Cards) hiển thị bên cạnh liệt kê: Các âm đã thuần thục, Các âm cần theo dõi, Tỷ lệ cải thiện 7 ngày qua có biểu đồ Sparkline mini.',
        completed: true
      },
      {
        id: 'ac-adv-104-backend-design',
        given: '5,000 học viên đồng thời tương tác với AI Coach',
        when: 'Hệ thống truy xuất ngữ cảnh và sinh câu trả lời',
        then: 'Lịch sử học tập được nén thành bản tóm tắt hồ sơ ngữ âm (User Phonetic Profile JSON < 2KB) lưu trong Redis; mô hình ngôn ngữ phản hồi qua Server-Sent Events (SSE) streaming với TTFT (Time To First Token) < 350ms.',
        completed: true
      },
      {
        id: 'ac-adv-104-l1-precision',
        given: 'AI phát hiện lỗi đặc trưng do ảnh hưởng cấu âm tiếng Việt',
        when: 'Giải thích nguyên nhân mắc lỗi cho học viên',
        then: 'AI không chỉ nói đúng hay sai mà giải thích rõ cơ chế cấu âm: "Trong tiếng Việt các âm /p, t, k/ ở cuối là âm khép không bật (unreleased stop), nhưng trong tiếng Anh bạn phải nén khí rồi bật đầu lưỡi ra".',
        completed: true
      },
      {
        id: 'ac-adv-104-a11y-fallback',
        given: 'Học viên muốn nghe AI Coach đọc lời nhận xét bằng giọng nói',
        when: 'Bấm nút "Đọc lời khuyên"',
        then: 'Hệ thống phát âm thanh giọng nữ ấm áp tự nhiên với tốc độ 1.0x, văn bản đang đọc được bôi đậm highlight đồng bộ theo từng từ.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-adv-104-fe-ui', title: 'Xây dựng giao diện AiCoachLab.jsx với khung chat streaming markdown và sidebar thẻ nhớ thông tin người học', category: 'Frontend', completed: true },
      { id: 't-adv-104-be-rag', title: 'Thiết kế hệ thống RAG ngữ âm (Phonetic Feature Store) kết hợp cơ sở tri thức giải phẫu cấu âm tiếng Anh và lỗi L1 tiếng Việt', category: 'AI/DSP', completed: true },
      { id: 't-adv-104-be-mem', title: 'Xây dựng module PhoneticProfileMemory tự động cập nhật bản tóm tắt tiến độ người học sau mỗi bài tập', category: 'Backend', completed: true },
      { id: 't-adv-104-be-scale', title: 'Tối ưu hóa streaming LLM gateway với connection pool và prompt caching giảm 60% chi phí token cho 5,000 users', category: 'DevOps/Scale', completed: true },
      { id: 't-adv-104-qa', title: 'Kiểm thử hộp đen độ an toàn và chính xác của AI Coach: không bịa đặt số liệu học tập và luôn đưa ra lời khuyên chuẩn IPA', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/views/AdvancedAiLabView.jsx\` (Tab: \`ai-coach\`)
- **Stitch Design Tokens**:
  - Coach Message: \`bg-slate-900 border border-slate-800 rounded-3xl p-5 text-slate-200 text-sm leading-relaxed max-w-xl\`
  - Memory Card: \`bg-indigo-950/30 border border-indigo-500/30 rounded-2xl p-4\`.

---

### 🗄️ BACKEND DESIGN SPECIFICATION
- **REST / SSE Endpoint**:
  \`\`\`http
  POST /api/v1/ai/coach/chat-stream
  Authorization: Bearer <JWT>
  Content-Type: application/json

  Request Body:
  {
    "userId": "usr_99a8b12f",
    "prompt": "Hôm nay em phát âm âm /t/ đã đỡ hơn chưa cô?"
  }

  Response (text/event-stream):
  data: {"token": "Chào "}
  data: {"token": "bạn! "}
  data: {"token": "So với buổi học trước..."}
  \`\`\``
  },
  {
    id: 'ADV-105',
    epic_id: 'epic-advanced-ai-lab',
    title: 'Connected Speech Lab: Luyện Nối Âm, Nuốt Âm & Biến Âm Như Người Bản Ngữ (Linking, Reduction, Elision, Assimilation): Phòng Thí Nghiệm Nói Nối Âm Tự Nhiên',
    persona: 'Người học có thể phát âm từng từ đơn lẻ rất tốt nhưng khi ghép vào câu lại nói rời rạc như robot, thiếu nhịp điệu tự nhiên của người bản ngữ',
    action: 'luyện tập 4 hiện tượng biến âm trong nói tự nhiên: Nối phụ âm sang nguyên âm (Consonant-to-Vowel Linking), Nuốt âm (Elision e.g. "next door" -> "nex\' door"), Biến âm đồng hóa (Assimilation e.g. "did you" -> "didja"), và Dạng yếu của từ chức năng (Weak Forms of "to", "for", "and")',
    value: 'giúp giọng nói trở nên mượt mà, lưu loát và tự nhiên như người bản xứ, cải thiện điểm tiêu chí Fluency & Coherence trong kỳ thi IELTS Speaking từ 6.0 lên 7.5+',
    priority: 'must',
    status: 'in-progress',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-adv-105-linking-detect',
        given: 'Học viên luyện câu "Hold on a second" (/hoʊld ɒn ə ˈsɛkənd/)',
        when: 'Học viên nói vào micro với sự liên kết âm "Hold-on-a"',
        then: 'Hệ thống nhận diện sự liên tục của dải phổ formant tại các điểm giao nhau (Boundaries), hiển thị ký hiệu vòng cung nối âm rực rỡ và chấm điểm độ mượt mà (Flow Score: 92%).',
        completed: true
      },
      {
        id: 'ac-adv-105-frontend-design',
        given: 'Giao diện Connected Speech Lab trong AdvancedAiLabView',
        when: 'Hiển thị câu luyện tập',
        then: 'Câu văn được trình bày lớn với các vòng cung nối âm màu xanh ngọc (Linking Curve) bắc cầu giữa các từ, ký hiệu gạch chéo mờ đối với âm bị nuốt (Elision), và ký tự schwa /ə/ hiển thị trên các từ chức năng yếu; dải sóng âm hiển thị chuyển động nhịp nhàng.',
        completed: true
      },
      {
        id: 'ac-adv-105-backend-design',
        given: '5,000 học viên đồng thời nộp các đoạn nói câu dài',
        when: 'Hệ thống đối soát phân đoạn âm (Phonetic Forced Alignment)',
        then: 'Sử dụng mô hình CTC Forced Alignment tối ưu hóa trên ONNX Runtime, thời gian căn chỉnh và nhận diện các điểm nối âm trả về trong vòng dưới 220ms, đảm bảo thông lượng 300 câu/giây.',
        completed: true
      },
      {
        id: 'ac-adv-105-l1-precision',
        given: 'Người Việt có thói quen phát âm tiếng Anh ngắt từng từ một (Staccato Monosyllabic habit) do cấu trúc đơn lập của tiếng mẹ đẻ',
        when: 'Học viên ngập ngừng ngắt quãng giữa các từ cần nối',
        then: 'Hệ thống hiển thị cảnh báo: "Lỗi ngắt từ: Bạn đang phát âm ngắt quãng như tiếng Việt! Hãy giữ hơi thở liên tục và nối phụ âm /d/ sang nguyên âm /ɒ/ thành \'hol-don\'".',
        completed: true
      },
      {
        id: 'ac-adv-105-a11y-fallback',
        given: 'Học viên muốn nghe sự khác biệt giữa Nói Từng Từ Rời Rạc vs Nói Nối Âm Bản Ngữ',
        when: 'Bấm nút toggle "So Sánh Robot vs Bản Ngữ"',
        then: 'Hệ thống phát lần lượt 2 bản thu âm để học viên nghe và cảm nhận rõ sự khác biệt kỳ diệu về độ mượt mà của ngữ lưu.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-adv-105-fe-ui', title: 'Xây dựng giao diện ConnectedSpeechLab.jsx với các vòng cung SVG nối âm động và ký hiệu ngữ âm tương tác', category: 'Frontend', completed: true },
      { id: 't-adv-105-be-align', title: 'Tích hợp mô hình CTC Forced Alignment phân tích chính xác thời điểm bắt đầu và kết thúc của từng âm tố', category: 'AI/DSP', completed: true },
      { id: 't-adv-105-be-rules', title: 'Xây dựng bộ quy tắc ngữ âm (Phonological Rule Engine) cho 4 hiện tượng: C-V Linking, Flap-T, Elision và Weak Forms', category: 'AI/DSP', completed: true },
      { id: 't-adv-105-be-scale', title: 'Tối ưu hóa pipeline suy luận AI với bộ nhớ đệm kết quả alignment cho các câu mẫu phổ biến phục vụ 5,000 users', category: 'DevOps/Scale', completed: true },
      { id: 't-adv-105-qa', title: 'Kiểm thử thuật toán với 100 câu hội thoại chứa hiện tượng nối âm và nuốt âm với các cấp độ tốc độ nói khác nhau', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/views/AdvancedAiLabView.jsx\` (Tab: \`connected-speech\`)
- **Stitch Design Tokens**:
  - Linking Bridge Arc: \`stroke-emerald-400 stroke-[3px] stroke-dashed animate-pulse\`
  - Word Span: \`text-2xl font-bold font-['Plus_Jakarta_Sans'] text-slate-100 px-2\`.`
  },
  {
    id: 'ADV-106',
    epic_id: 'epic-advanced-ai-lab',
    title: 'Intelligibility Score: Đo "Người Nghe Có Hiểu Bạn Không?" Thay Vì Chỉ Đo Giống Người Bản Ngữ (Multi-ASR Listener Panel): Điểm Số Độ Thông Hiểu Đa Giác Quan',
    persona: 'Người đi làm và giao tiếp quốc tế không nhất thiết muốn có giọng chuẩn 100% như người Mỹ, mà ưu tiên việc người nghe toàn cầu (Ấn Độ, Singapore, Châu Âu, Mỹ) có hiểu rõ ý mình nói hay không',
    action: 'nói một câu tiếng Anh tự do và xem thử nghiệm "Hội đồng thính giả ảo đa quốc gia (Virtual Multi-ASR Panel)" xem có bao nhiêu công cụ AI và người nghe hiểu chính xác từng từ',
    value: 'giảm bớt áp lực hoàn hảo hóa giọng bản ngữ (Native-like Accent Perfectionism), tập trung vào mục tiêu tối thượng của giao tiếp là độ thông hiểu (Intelligibility & Comprehensibility)',
    priority: 'should',
    status: 'in-progress',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-adv-106-multi-asr',
        given: 'Học viên nói một câu vào micro (e.g., "We need to focus on user experience")',
        when: 'Hệ thống gửi đoạn âm thanh qua 3 bộ nhận diện tiếng nói khác nhau (OpenAI Whisper, Google Cloud Speech, và Meta wav2vec2)',
        then: 'Tổng hợp điểm số thông hiểu tổng thể (Intelligibility Score: 94%), chỉ ra từ nào cả 3 máy đều nghe rõ, từ nào có nguy cơ bị nghe nhầm.',
        completed: true
      },
      {
        id: 'ac-adv-106-frontend-design',
        given: 'Giao diện Intelligibility Score Panel trong AdvancedAiLabView',
        when: 'Hiển thị kết quả chấm điểm',
        then: 'Đồng hồ đo tốc độ (Gauge Meter) màu xanh ngọc lục bảo hiển thị điểm % thông hiểu lớn ở giữa, bên dưới là bảng ma trận 3 người nghe ảo (Mỹ, Anh, Toàn cầu) với trạng thái "Hiểu 100%" kèm danh sách các từ bị nghe nhầm (Confusion Matrix) tô vàng cảnh báo.',
        completed: true
      },
      {
        id: 'ac-adv-106-backend-design',
        given: '5,000 học viên kiểm tra độ thông hiểu định kỳ',
        when: 'Chạy kiểm tra đa mô hình',
        then: 'Để tránh chi phí gọi nhiều API thương mại, hệ thống chạy 1 mô hình Whisper đa ngôn ngữ cục bộ kết hợp với mô hình Acoustic Confidence Scorer gọn nhẹ (chỉ 15MB) trích xuất trực tiếp xác suất âm vị (Posterior Probabilities), đáp ứng dưới 300ms cho 5,000 users.',
        completed: true
      },
      {
        id: 'ac-adv-106-l1-precision',
        given: 'Học viên phát âm từ "sheet" nhưng do thiếu âm đuôi hoặc sai âm đầu /ʃ/ khiến máy nghe thành "shit"',
        when: 'Bảng từ dễ gây hiểu lầm (Critical Misunderstandings) phân tích',
        then: 'Đánh dấu cảnh báo nguy cơ cao (High Semantic Risk): "Cảnh báo hiểu lầm: Người nghe có thể nghe nhầm sang từ nhạy cảm! Hãy kéo dài âm /iː/ và cong môi phát âm /ʃ/".',
        completed: true
      },
      {
        id: 'ac-adv-106-a11y-fallback',
        given: 'Học viên muốn xem chi tiết dạng bảng',
        when: 'Bấm nút "Xem bảng ma trận từ"',
        then: 'Bảng hiển thị tương phản cao theo chuẩn WCAG 2.1 AA, cho phép dùng phím Tab duyệt qua từng từ và nghe lại âm thanh tương ứng.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-adv-106-fe-ui', title: 'Xây dựng giao diện IntelligibilityLab.jsx với đồng hồ đo Gauge Meter và ma trận rủi ro hiểu lầm ngữ nghĩa (Semantic Risk Matrix)', category: 'Frontend', completed: true },
      { id: 't-adv-106-be-engine', title: 'Phát triển thuật toán tính điểm Intelligibility Index dựa trên tích chập độ tự tin nhận diện âm vị (Phonetic Confidence Convolutions)', category: 'AI/DSP', completed: true },
      { id: 't-adv-106-be-risk', title: 'Xây dựng cơ sở dữ liệu các cặp từ nguy hiểm dễ gây hiểu lầm nhạy cảm trong giao tiếp kinh doanh và công sở', category: 'AI/DSP', completed: true },
      { id: 't-adv-106-be-scale', title: 'Tối ưu hóa mô hình Acoustic Confidence Scorer chạy trên CPU backend với lượng RAM dưới 200MB', category: 'DevOps/Scale', completed: true },
      { id: 't-adv-106-qa', title: 'Kiểm thử với 200 mẫu ghi âm của người Việt có giọng địa phương khác nhau để đánh giá độ tin cậy của chỉ số', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/views/AdvancedAiLabView.jsx\` (Tab: \`intelligibility\`)
- **Stitch Design Tokens**:
  - Intelligibility Gauge: Semi-circle Arc \`stroke-emerald-400\`, Percentage: \`font-mono text-5xl font-black text-white\`
  - Risk Card: \`bg-rose-950/30 border border-rose-500/40 rounded-2xl p-4\`.`
  },
  {
    id: 'ADV-107',
    epic_id: 'epic-advanced-ai-lab',
    title: 'Spontaneous Speech Voice Journal: Nhật Ký Nói Tự Do Mỗi Ngày & Chấm Phát Âm Không Kịch Bản: Nhật Ký Thoại Tự Do Đo Khoảng Cách Chuyển Di',
    persona: 'Người học có thể đọc kịch bản có sẵn rất chuẩn nhưng khi tự nói tự do không có văn bản trước mắt thì các tật phát âm cũ lập tức quay trở lại',
    action: 'thu âm nhật ký thoại tự do 60 giây mỗi ngày theo chủ đề mở (e.g., "Kể về một điều khiến bạn vui hôm nay"), AI tự động bóc băng phụ đề và chấm điểm phát âm không kịch bản',
    value: 'đo lường và thu hẹp "Khoảng cách chuyển di (Transfer Gap)" giữa kỹ năng đọc văn bản và phản xạ nói tự nhiên trong đời thực, giúp học viên làm chủ hoàn toàn giọng nói của mình',
    priority: 'should',
    status: 'in-progress',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-adv-107-journal-recording',
        given: 'Học viên nhận chủ đề gợi ý ngày hôm nay',
        when: 'Bấm thu âm và nói tự do từ 30 đến 90 giây',
        then: 'Hệ thống tự động chuyển giọng nói thành văn bản thời gian thực, căn chỉnh từng từ với tín hiệu âm thanh và chấm điểm phát âm của toàn bộ các từ được nói ra.',
        completed: true
      },
      {
        id: 'ac-adv-107-frontend-design',
        given: 'Giao diện Voice Journal trong AdvancedAiLabView',
        when: 'Kết thúc bài thu âm tự do',
        then: 'Hiển thị đoạn nhật ký dạng văn bản có tô màu từng từ theo điểm số (Xanh >85%, Vàng 60-84%, Đỏ <60%), thanh đo "Khoảng Cách Chuyển Di (Transfer Gap: -12%)" so sánh giữa điểm đọc kịch bản và điểm nói tự do, danh sách nhật ký cũ dạng dòng thời gian thanh lịch.',
        completed: true
      },
      {
        id: 'ac-adv-107-backend-design',
        given: '5,000 học viên nộp nhật ký thoại mỗi buổi tối',
        when: 'Hệ thống lưu trữ và xử lý các bản ghi âm dài 60 giây',
        then: 'File audio được nén Opus 32kbps (~240KB/phút) lưu trữ an toàn trên Cloudflare R2, tác vụ phiên âm và chấm điểm được đưa vào hàng đợi nền với thời gian xử lý hoàn tất dưới 3.5 giây.',
        completed: true
      },
      {
        id: 'ac-adv-107-l1-precision',
        given: 'Học viên khi nói tự do thường có thói quen chèn âm đệm tiếng Việt (e.g., "ờ", "ừm", hoặc nuốt sạch âm cuối /s/)',
        when: 'Bộ phân tích nhật ký rà soát đoạn nói',
        then: 'Báo cáo ghi nhận: "Khi nói tự do, bạn đã quên phát âm âm cuối /s/ trong 6 từ liên tiếp. Hãy tập thở chậm lại để giữ vững cơ miệng!".',
        completed: true
      },
      {
        id: 'ac-adv-107-a11y-fallback',
        given: 'Học viên xem lại các bài nhật ký trong quá khứ',
        when: 'Bấm vào bất kỳ từ nào trên đoạn văn bản',
        then: 'Trình phát âm thanh nhảy ngay đến đúng mili-giây học viên nói từ đó và phát lại đoạn âm thanh tương ứng, hỗ trợ phím mũi tên tua lại 5 giây.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-adv-107-fe-ui', title: 'Xây dựng giao diện VoiceJournalLab.jsx với dòng thời gian Timeline lịch sử và trình phát audio đồng bộ từ ngữ (Interactive Word-Synced Player)', category: 'Frontend', completed: true },
      { id: 't-adv-107-be-asr', title: 'Tích hợp mô hình Whisper ASR kết hợp Word-level Timestamp Alignment trích xuất thời điểm chính xác của từng từ', category: 'AI/DSP', completed: true },
      { id: 't-adv-107-be-gap', title: 'Xây dựng thuật toán tính toán Transfer Gap Index so sánh điểm số đọc kịch bản tĩnh vs nói tự do', category: 'AI/DSP', completed: true },
      { id: 't-adv-107-be-scale', title: 'Cấu hình xử lý bất đồng bộ audio 60s qua BullMQ queue và lưu trữ Cloudflare R2 tối ưu cho 5,000 users', category: 'DevOps/Scale', completed: true },
      { id: 't-adv-107-qa', title: 'Kiểm thử độ chính xác căn chỉnh từ ngữ timestamp alignment với các đoạn nói có tạp âm môi trường', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/views/AdvancedAiLabView.jsx\` (Tab: \`voice-journal\`)
- **Stitch Design Tokens**:
  - Interactive Transcript Box: \`p-6 bg-slate-900 border border-slate-800 rounded-3xl leading-loose text-lg font-['Plus_Jakarta_Sans']\`
  - Word Clickable: \`hover:underline cursor-pointer transition-colors px-1 py-0.5 rounded\`.`
  },
  {
    id: 'ADV-108',
    epic_id: 'epic-advanced-ai-lab',
    title: 'Accent Explorer & Target Dialect Selector: Chọn Giọng Mỹ / Anh / Úc Và Đo Độ Đậm Giọng Theo Thời Gian: Bộ Khám Phá Giọng Điệu Bản Ngữ',
    persona: 'Người học có định hướng du học, định cư hoặc làm việc tại các quốc gia cụ thể (Mỹ, Anh, Úc) và muốn rèn luyện giọng điệu mục tiêu nhất quán',
    action: 'lựa chọn chất giọng mục tiêu (General American, British RP, Australian English), nghe các điểm khác biệt then chốt (như âm /r/ rhotic, nguyên âm bath, âm flap-t) và đo lường "Chỉ số tương đồng chất giọng (Dialect Proximity %)"',
    value: 'trao quyền cho học viên chủ động định hình phong cách giao tiếp quốc tế của mình, hiểu sâu sắc sự đa dạng ngôn ngữ và tự tin hội nhập văn hóa toàn cầu',
    priority: 'should',
    status: 'in-progress',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-adv-108-dialect-toggle',
        given: 'Học viên chọn chất giọng mục tiêu là British RP (Giọng Anh chuẩn)',
        when: 'Học viên luyện tập từ vựng "water" hoặc "car"',
        then: 'Hệ thống chuyển đổi toàn bộ âm mẫu, tiêu chuẩn IPA (không cuộn lưỡi âm /r/ cuối, phát âm /ɔː/ thay vì /ɑː/) và tiêu chí chấm điểm tương ứng với chuẩn giọng Anh.',
        completed: true
      },
      {
        id: 'ac-adv-108-frontend-design',
        given: 'Giao diện Accent Explorer trong AdvancedAiLabView',
        when: 'Hiển thị trên màn hình',
        then: 'Bộ 3 thẻ chọn cờ quốc gia (Mỹ - Anh - Úc) phong cách hiện đại với hiệu ứng viền sáng khi được kích hoạt, bảng so sánh đối chiếu âm thanh 3 cột trực quan kèm dải đo mức độ tiệm cận giọng mục tiêu (Dialect Proximity Gauge: 78%).',
        completed: true
      },
      {
        id: 'ac-adv-108-backend-design',
        given: '5,000 học viên thường xuyên chuyển đổi giữa các chất giọng mục tiêu',
        when: 'Hệ thống nạp từ điển phiên âm và âm thanh mẫu theo vùng miền',
        then: 'Toàn bộ từ điển phiên âm đa chất giọng (CMU Dict cho giọng Mỹ, BEEP/Combilex cho giọng Anh) được lưu trong bộ nhớ đệm Redis key-value với thời gian truy vấn < 1ms.',
        completed: true
      },
      {
        id: 'ac-adv-108-l1-precision',
        given: 'Học viên Việt Nam thường học pha trộn lộn xộn giữa giọng Anh và giọng Mỹ (e.g. cuộn lưỡi /r/ kiểu Mỹ nhưng lại dùng từ vựng kiểu Anh)',
        when: 'Hệ thống phân tích tính nhất quán của chất giọng (Accent Consistency Check)',
        then: 'Chỉ ra các điểm không nhất quán: "Bạn đang chọn mục tiêu giọng Mỹ, nhưng từ \'can\'t\' bạn lại phát âm theo giọng Anh /kɑːnt/. Trong giọng Mỹ hãy nói /kænt/ nhé!".',
        completed: true
      },
      {
        id: 'ac-adv-108-a11y-fallback',
        given: 'Học viên chuyển đổi giọng bằng bàn phím',
        when: 'Bấm phím số 1 (Mỹ), 2 (Anh), 3 (Úc)',
        then: 'Hệ thống lập tức chuyển đổi cấu hình âm mẫu và thông báo trạng thái qua trình đọc màn hình, đảm bảo khả năng tiếp cận thuận tiện.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-adv-108-fe-ui', title: 'Xây dựng component AccentExplorerLab.jsx với 3 thẻ chọn chất giọng quốc gia và bảng đối chiếu âm thanh 3 miền', category: 'Frontend', completed: true },
      { id: 't-adv-108-be-dict', title: 'Xây dựng cơ sở dữ liệu phiên âm đa chuẩn ngữ âm (Multi-Dialect Lexicon) cho 10,000 từ vựng phổ biến nhất', category: 'Backend', completed: true },
      { id: 't-adv-108-be-prox', title: 'Phát triển mô hình đo khoảng cách âm học Dialect Proximity Scorer sử dụng khoảng cách Euclidean trên ma trận Formant', category: 'AI/DSP', completed: true },
      { id: 't-adv-108-be-scale', title: 'Lưu trữ tài nguyên audio mẫu đa giọng trên Cloudflare CDN với phân vùng thư mục /audio/us, /audio/uk, /audio/au', category: 'DevOps/Scale', completed: true },
      { id: 't-adv-108-qa', title: 'Kiểm thử hộp đen kiểm tra tính nhất quán chấm điểm khi cùng một file ghi âm được chấm theo 3 chuẩn giọng khác nhau', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/views/AdvancedAiLabView.jsx\` (Tab: \`accent-explorer\`)
- **Stitch Design Tokens**:
  - Flag Card Selected: \`border-2 border-indigo-500 bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.3)] rounded-3xl p-6\`
  - Dialect Proximity Meter: \`font-mono text-3xl font-black text-indigo-400\`.`
  }
];
