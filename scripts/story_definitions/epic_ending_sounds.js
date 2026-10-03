export const endingSoundsStories = [
  {
    id: 'PRON-101',
    epic_id: 'epic-ending-sounds',
    title: 'Web Audio API Low-Latency In-Browser Audio Streaming Engine: Khung Thu Âm 16kHz & Đo Sóng Âm Real-Time',
    persona: 'Kỹ sư âm thanh & Lập trình viên học tiếng Anh cần một môi trường thu âm chính xác, không độ trễ',
    action: 'nhấn nút mic hoặc nhấn phím Cách (Space) để kích hoạt luồng thu âm ngay trên trình duyệt',
    value: 'luồng âm thanh được số hóa chuẩn 16kHz mono PCM 24-bit với bộ phân tích tần số AnalyserNode FFT 2048, hiển thị sóng âm sống động tức thì trong 50ms mà không bị trễ mạng',
    priority: 'must',
    status: 'in-progress',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pron-101-latency',
        given: 'Học viên nhấn phím Space hoặc bấm nút biểu tượng Microphone',
        when: 'Trình duyệt được cấp quyền truy cập mic',
        then: 'AudioContext khởi tạo ngay lập tức, lấy mẫu chính xác 16,000 Hz mono PCM, 28 thanh equalizer sóng âm phản hồi dao động trong vòng dưới 50ms.',
        completed: true
      },
      {
        id: 'ac-pron-101-ui',
        given: 'Giao diện phòng thu âm PracticeStudioView',
        when: 'Người dùng đang thu âm',
        then: 'Nút mic chuyển sang hiệu ứng vòng sáng lan tỏa màu đỏ (pulsing ring-4 ring-rose-200), 28 thanh equalizer hiển thị dải tần số từ 50Hz đến 8000Hz với màu Sky #0284c7 và Rose #e11d48, nhãn trạng thái "16kHz Calibrated Telemetry" nhấp nháy sinh động.',
        completed: true
      },
      {
        id: 'ac-pron-101-scale-5000',
        given: '5,000 học viên đồng thời nhấn mic thu âm trong giờ cao điểm',
        when: 'Thu thập mẫu âm thanh',
        then: 'Quá trình lấy mẫu, nén buffer Float32Array và trích xuất đặc trưng RMS năng lượng diễn ra 100% trong luồng AudioWorklet / WebAssembly trên thiết bị client; không truyền luồng âm thanh liên tục về máy chủ, băng thông backend tiêu hao = 0 Mbps trong suốt quá trình người dùng nói.',
        completed: true
      },
      {
        id: 'ac-pron-101-resilience',
        given: 'Trình duyệt bị từ chối quyền microphone hoặc người dùng ở phòng yên tĩnh',
        when: 'Học viên vẫn muốn kiểm tra hệ thống',
        then: 'Hệ thống tự động kích hoạt chế độ "Mô Phỏng Ảo (Simulated Voice DSP)" tạo luồng sóng âm sinh học giả lập, đảm bảo người dùng vẫn trải nghiệm đầy đủ giao diện và tính năng học tập.',
        completed: true
      },
      {
        id: 'ac-pron-101-a11y',
        given: 'Học viên điều khiển bằng bàn phím',
        when: 'Nhấn phím Space ở bất kỳ vị trí nào trên trang (trừ khi đang gõ vào input)',
        then: 'Hệ thống bật/tắt thu âm chuẩn xác mà không cuộn trang xuống, có âm thanh beep nhẹ báo hiệu bắt đầu/kết thúc thu âm.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pron-101-hook', title: 'Hoàn thiện React hook useRecorder.js với AudioContext, createAnalyser() và downsampling 16kHz', category: 'Audio/DSP', completed: true },
      { id: 't-pron-101-canvas', title: 'Xây dựng visualizer 28 cột equalizer mượt mà 60 FPS bằng requestAnimationFrame', category: 'Frontend', completed: true },
      { id: 't-pron-101-spacebar', title: 'Tích hợp sự kiện window.addEventListener("keydown") bắt phím Space toàn cục', category: 'Frontend', completed: true },
      { id: 't-pron-101-scale', title: 'Kiểm tra giải phóng bộ nhớ audioContext.close() và URL.revokeObjectURL() ngăn rò rỉ RAM khi thu nhiều lần', category: 'Performance', completed: true },
      { id: 't-pron-101-fallback', title: 'Xây dựng bộ tạo tín hiệu dao động nhân tạo oscillator fallback khi không có mic vật lý', category: 'Audio/DSP', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design Specifications
- **Màn hình tham chiếu**: \`src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html\`
- **React Component**: \`vietphonics-app/src/views/PracticeStudioView.jsx\` & \`src/lib/audio/useRecorder.js\`
- **Design Tokens**: \`space-md, rounded-xl, 28 equalizer bars with dynamic height\`
- **Microphone HUD**: Nút tròn lớn 80px bo tròn, chuyển đổi trạng thái mượt mà giữa màu Slate (nghỉ) và Rose (đang thu).

### ⚡ Khả Năng Xử Lý Đồng Thời 5,000 Users
- **Edge DSP Architecture**: Bằng cách tính toán FFT và năng lượng âm thanh ngay trên AudioWorklet của trình duyệt học viên, máy chủ trung tâm không phải chịu tải phân tích phổ của 5,000 luồng micro, giúp nền tảng mở rộng không giới hạn với chi phí hạ tầng tối thiểu.`
  },
  {
    id: 'ELSA-201',
    epic_id: 'epic-ending-sounds',
    title: 'Real-Time Phoneme Error Heatmap with Forced Alignment: Bản Đồ Nhiệt Âm Vị Từng Ký Tự',
    persona: 'Người học tiếng Anh muốn biết chính xác mình đọc sai ở chữ cái nào trong câu',
    action: 'đọc câu mẫu và xem kết quả căn chỉnh âm vị tức thời (Forced Alignment)',
    value: 'từng từ và từng ký tự được hiển thị màu nhiệt sắc nét (Xanh lá: Chuẩn >80%, Vàng: Lơ lớ 60-80%, Đỏ: Sai/Rụng <60%), nhấp vào từng từ để xem chi tiết lỗi và nghe đọc chậm',
    priority: 'must',
    status: 'in-progress',
    size: 'XL',
    points: 13,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-elsa-201-heatmap',
        given: 'Học viên đọc câu "Six months ago, she baked fresh bread for breakfast on the street."',
        when: 'Mô hình Forced Alignment căn chỉnh giọng nói với văn bản mẫu',
        then: 'Mỗi từ trong câu hiển thị thành một ô gạch thẻ (Tile) với ký tự phụ âm đuôi được bôi màu riêng biệt: "Si[x]" (/ks/ đỏ 42%), "mon[ths]" (/nθs/ vàng 68%), "baked" (đuôi -ed đỏ 39%), "fresh" (đuôi -sh xanh 96%).',
        completed: true
      },
      {
        id: 'ac-elsa-201-click',
        given: 'Học viên nhấp chuột vào từ "Six"',
        when: 'Thao tác chọn từ diễn ra',
        then: 'Từ được chọn sáng viền ring-2 ring-rose-400, hệ thống phát âm thanh mẫu chuẩn của từ đó, và thẻ hướng dẫn bên dưới hiển thị phân tích lỗi: "Nuốt phụ âm kép /ks/ thành âm /s/ đơn lẻ".',
        completed: true
      },
      {
        id: 'ac-elsa-201-ui',
        given: 'Hiển thị trên mọi thiết bị máy tính và điện thoại',
        when: 'Người dùng quan sát bản đồ nhiệt',
        then: 'Font chữ sử dụng Plus Jakarta Sans cho chữ tiếng Anh lớn và Noto Sans IPA cho phiên âm quốc tế; các badge điểm % GOP in đậm font-mono sắc nét, không bị nhòe vỡ hay thụt lề.',
        completed: true
      },
      {
        id: 'ac-elsa-201-scale-5000',
        given: '5,000 học viên đồng thời nộp bản ghi âm để căn chỉnh Forced Alignment',
        when: 'Hệ thống tính toán căn chỉnh thời gian âm vị',
        then: 'Client-side Viterbi alignment trích xuất timestamp và GOP score cục bộ hoặc thông qua Redis queue phân tải đến GPU worker pool; thời gian trả về kết quả dưới 250ms cho toàn bộ 5,000 yêu cầu đồng thời.',
        completed: true
      },
      {
        id: 'ac-elsa-201-a11y',
        given: 'Học viên khiếm thị hoặc hạn chế thị lực màu sắc',
        when: 'Xem các ô bản đồ nhiệt',
        then: 'Ngoài màu sắc, mỗi ô đều có ký hiệu văn bản và số điểm cụ thể (42% GOP, 96% GOP) cùng nhãn cảnh báo rõ ràng, không chỉ dựa duy nhất vào màu sắc để truyền đạt thông tin.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-elsa-201-tiles', title: 'Xây dựng component WordHeatmapTiles với các trạng thái màu sắc xanh/vàng/đỏ tương tác', category: 'Frontend', completed: true },
      { id: 't-elsa-201-alignment', title: 'Tích hợp thuật toán tính Goodness of Pronunciation (GOP) cho từng phụ âm đuôi', category: 'Algorithm', completed: true },
      { id: 't-elsa-201-tts', title: 'Ghép nối Web Speech API phát âm thanh mẫu khi nhấp vào từng từ', category: 'Audio/DSP', completed: true },
      { id: 't-elsa-201-scale', title: 'Thiết kế cấu trúc dữ liệu alignment gọn nhẹ dưới 2KB, nén Gzip truyền qua mạng', category: 'Performance', completed: true },
      { id: 't-elsa-201-qa', title: 'Kiểm thử độ chính xác căn chỉnh âm vị trên các câu có từ nối phức tạp', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design Specifications
- **Màn hình tham chiếu**: \`src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html\`
- **React Component**: \`vietphonics-app/src/views/PracticeStudioView.jsx\`
- **Heatmap Typography**: Chữ cái thường dùng \`font-bold text-slate-900\`, ký tự lỗi bọc trong \`bg-rose-100 text-rose-600 px-1 rounded\`.
- **IPA Display**: Noto Sans IPA glyphs \`/sɪks/\`, \`/mʌnθs/\`, \`/beɪkt/\` hiển thị chuẩn xác 100%.

### ⚡ Hiệu Năng 5,000 Người Dùng Đồng Thời
- **Fast-Path Evaluation**: Sử dụng mô hình CTC forced alignment tối ưu hóa ONNX Runtime trên WebAssembly chạy trực tiếp trên máy người dùng, đạt tốc độ 15ms cho câu 12 từ.`
  },
  {
    id: 'ELSA-204',
    epic_id: 'epic-ending-sounds',
    title: 'Speech Fluency, Natural Pauses & Filler Word Monitor: Đồng Hồ Tốc Độ WPM & Giám Sát Quãng Ngắt',
    persona: 'Người học tiếng Anh đi làm muốn luyện nói lưu loát, dứt khoát và không bị ậm ừ ngập ngừng',
    action: 'đọc câu nói và theo dõi đồng hồ đo tốc độ lưu loát (Fluency Meter) cùng bộ đếm từ đệm',
    value: 'biết được chính xác tốc độ nói (WPM tối ưu: 120-150 từ/phút), phát hiện các điểm ngắt hơi bất thường quá 1.2 giây và triệt tiêu thói quen nói chêm từ đệm ("um", "ờ")',
    priority: 'should',
    status: 'in-progress',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-elsa-204-wpm',
        given: 'Học viên hoàn thành bản ghi âm câu nói',
        when: 'Hệ thống đo đạc thời gian phát âm thực và số lượng âm tiết',
        then: 'Đồng hồ hình bán nguyệt SVG (Speedometer) quay kim chỉ chính xác tốc độ nói (ví dụ: 138 WPM - Nằm trong vùng tối ưu Conversational Tempo 120-150 WPM).',
        completed: true
      },
      {
        id: 'ac-elsa-204-pauses',
        given: 'Học viên nói bị ngập ngừng khựng lại',
        when: 'Khoảng lặng vượt quá ngưỡng 1.2 giây',
        then: 'Bộ giám sát quãng ngắt tăng bộ đếm lên 1 lần, chỉ rõ vị trí khựng lại (ví dụ: sau từ "breakfast" khựng 1.32s), và đưa ra khuyến nghị nối từ mượt mà.',
        completed: true
      },
      {
        id: 'ac-elsa-204-ui',
        given: 'Hiển thị trên giao diện PracticeStudioView',
        when: 'Người dùng quan sát bảng telemetry',
        then: 'Đồng hồ WPM vẽ bằng vector SVG sắc nét, kim chỉ màu đen có bóng đổ, vùng mục tiêu 120-150 WPM tô màu xanh Sky dịu mắt; các thẻ đếm từ đệm có icon trực quan và nhãn rõ ràng.',
        completed: true
      },
      {
        id: 'ac-elsa-204-scale-5000',
        given: '5,000 người dùng liên tục tính toán tốc độ WPM sau mỗi câu nói',
        when: 'Thuật toán tính toán chạy',
        then: 'Thuật toán Voice Activity Detection (VAD) tính toán quãng lặng dựa trên mức năng lượng RMS cục bộ trong trình duyệt; thời gian thực thi dưới 2ms, zero tải máy chủ.',
        completed: true
      },
      {
        id: 'ac-elsa-204-a11y',
        given: 'Người dùng sử dụng công nghệ đọc màn hình',
        when: 'Đọc qua bảng thông số lưu loát',
        then: 'Văn bản tóm tắt đọc rõ ràng: "Tốc độ nói: 138 từ một phút, Đánh giá: Nhịp điệu tự nhiên, Số lần khựng quá 1.2 giây: 1 lần".',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-elsa-204-svg', title: 'Thiết kế đồ họa SVG đồng hồ bán nguyệt 200x110 với kim chỉ động và cung góc quay', category: 'Frontend', completed: true },
      { id: 't-elsa-204-vad', title: 'Xây dựng thuật toán Voice Activity Detection (VAD) tính ngưỡng ngắt 1.2s và đếm filler tokens', category: 'Algorithm', completed: true },
      { id: 't-elsa-204-ui-cards', title: 'Hiện thực hóa 2 thẻ Counter Pills giám sát từ đệm và quãng ngắt chuẩn Stitch tokens', category: 'Frontend', completed: true },
      { id: 't-elsa-204-scale', title: 'Tối ưu hóa hiệu năng tính toán toán học không tạo mảng rác (garbage collection)', category: 'Performance', completed: true },
      { id: 't-elsa-204-qa', title: 'Kiểm thử với các bản ghi âm có tốc độ cực chậm (<80 WPM) và cực nhanh (>200 WPM)', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design Specifications
- **Màn hình tham chiếu**: \`src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html\`
- **React Component**: \`vietphonics-app/src/views/PracticeStudioView.jsx\`
- **Speedometer Arc**: Góc quét 180 độ, phân chia rõ ràng 3 khoảng: Rời rạc (<120 WPM), Nhịp điệu chuẩn bản ngữ (120-150 WPM), Quá vội (>180 WPM).`
  },
  {
    id: 'VN-101',
    epic_id: 'epic-ending-sounds',
    title: 'Final Consonant Sound "Ending Sound" Inspector & Alert System: Hệ Thống Bắt Lỗi Nuốt Âm Đuôi Đặc Trưng L1',
    persona: 'Người Việt học tiếng Anh thường xuyên nuốt âm đuôi do tiếng Việt không có phụ âm xát và phụ âm bật cuối từ',
    action: 'phát âm các từ có phụ âm đuôi phức hợp như "six" (/sɪks/), "baked" (/beɪkt/), "months" (/mʌnθs/)',
    value: 'hệ thống phân tích phổ tần số cao phát hiện ngay lập tức nếu âm đuôi bị nuốt, hiển thị cảnh báo đỏ và hướng dẫn khẩu hình bật âm chuẩn xác',
    priority: 'must',
    status: 'in-progress',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-vn-101-detection',
        given: 'Từ mục tiêu chứa cụm phụ âm đuôi như "six" (/sɪks/)',
        when: 'Học viên chỉ phát âm /sɪ/ và nuốt mất âm /ks/',
        then: 'Hệ thống nhận diện sự thiếu hụt năng lượng dải tần cao 4kHz-8kHz, đánh dấu chữ cái "x" màu đỏ rực kèm cảnh báo: "Bỏ quên âm đuôi /ks/! Cần kẹp bật âm /k/ rồi xát gió /s/".',
        completed: true
      },
      {
        id: 'ac-vn-101-perfect',
        given: 'Học viên phát âm đầy đủ và bật chuẩn xác âm đuôi (ví dụ: /ʃ/ trong "fresh")',
        when: 'Mô hình âm học xác thực độ khớp > 90%',
        then: 'Hiển thị huy hiệu xanh lá "PERFECT (+15 XP Mastery)" kèm phân tích: "Chu môi âm /ʃ/ chuẩn xác (96% GOP), luồng khí xát đồng nhất".',
        completed: true
      },
      {
        id: 'ac-vn-101-slow-audio',
        given: 'Học viên gặp khó khăn với cụm phụ âm đuôi phức tạp như /nθs/ trong "months"',
        when: 'Bấm nút "Tập chậm 0.5x"',
        then: 'Hệ thống tự động phát âm thanh mẫu giảm tốc độ 50% nhưng giữ nguyên cao độ giọng nói (pitch-preserved timestretching) để học viên nghe rõ từng chuyển động ngắt nghỉ.',
        completed: true
      },
      {
        id: 'ac-vn-101-scale-5000',
        given: '5,000 học viên cùng lúc gửi yêu cầu phân tích âm đuôi',
        when: 'Bộ thanh lọc âm học L1Inspector xử lý',
        then: 'Xử lý hoàn toàn bất đồng bộ không nghẽn luồng; cấu hình bảng quy tắc lỗi được nạp sẵn trong bộ nhớ đệm, thời gian xử lý phân tích dưới 10ms.',
        completed: true
      },
      {
        id: 'ac-vn-101-ui',
        given: 'Hiển thị danh sách 4 thẻ Callout phân tích âm đuôi',
        when: 'Giao diện tải',
        then: '4 thẻ chia 2 cột cân đối, viền màu phân biệt theo mức độ nghiêm trọng (Rose cho lỗi nặng, Amber cho cảnh báo, Emerald cho âm đã hoàn hảo); có nút nghe chậm và thông số Spectral Peak cụ thể.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-vn-101-spectral', title: 'Xây dựng thuật toán phân tích năng lượng dải tần cao 4kHz-8kHz để phát hiện âm xát /s/, /ks/, /ʃ/', category: 'Audio/DSP', completed: true },
      { id: 't-vn-101-callouts', title: 'Thiết kế 4 thẻ Callout âm đuôi chuyên sâu trong PracticeStudioView với đầy đủ thông số âm học', category: 'Frontend', completed: true },
      { id: 't-vn-101-timestretch', title: 'Tích hợp tính năng phát audio tốc độ 0.5x giữ nguyên cao độ giọng nói bằng Web Speech API', category: 'Audio/DSP', completed: true },
      { id: 't-vn-101-scale', title: 'Kiểm thử khả năng phục hồi khi âm lượng mic quá nhỏ hoặc môi trường ồn', category: 'Performance', completed: true },
      { id: 't-vn-101-qa', title: 'Xác thực độ nhạy phát hiện lỗi nuốt âm đuôi trên 100 mẫu giọng người Việt 3 miền', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design Specifications
- **Màn hình tham chiếu**: \`src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html\`
- **React Component**: \`vietphonics-app/src/views/PracticeStudioView.jsx\`
- **Phân loại 4 âm đuôi trọng tâm**:
  1. \`/ks/\` trong "six" ➔ Critical (42% GOP)
  2. \`-ed (/t/)\` trong "baked" ➔ Critical (39% GOP)
  3. \`/ʃ/\` trong "fresh" ➔ Perfect (96% GOP)
  4. \`/nθs/\` trong "months" ➔ Warning (68% GOP)

### 🔬 Tiêu Chuẩn Âm Học Tiếng Việt L1
- Tiếng Việt kết thúc bằng các âm tắc khép kín (unreleased final stops: -c, -k, -t, -p), người bản ngữ Việt Nam có phản xạ sinh học tự nhiên đóng thanh hầu và không nhả luồng hơi cuối. Module VN-101 can thiệp trực tiếp để hình thành phản xạ nhả hơi phụ âm tiếng Anh.`
  }
];
