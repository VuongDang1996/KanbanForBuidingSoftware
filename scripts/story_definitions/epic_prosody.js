export const prosodyStories = [
  {
    id: 'ELSA-202',
    epic_id: 'epic-prosody',
    title: 'Syllable Stress & Capitalized Word Emphasis Evaluator: Đánh Giá Trọng Âm Từ & Nhấn Nhấn Ngữ Cảnh',
    persona: 'Người học tiếng Anh nói chuyện đều đều không trọng âm hoặc hay nhấn sai âm tiết chính',
    action: 'đọc các từ đa âm tiết (như "com-for-ta-ble", "de-ve-lop-ment") và câu có từ nhấn trọng tâm',
    value: 'hệ thống đo trường độ, cường độ và cao độ của từng âm tiết, chỉ rõ âm tiết mang trọng âm chính cần đọc dài gấp đôi và to hơn các âm tiết phụ xung quanh',
    priority: 'must',
    status: 'in-progress',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-elsa-202-eval',
        given: 'Từ mục tiêu có trọng âm chính ở âm tiết thứ hai (như "de-VE-lop-ment")',
        when: 'Học viên nhấn nhầm vào âm tiết thứ nhất bằng cách đọc to hoặc kéo dài âm đầu',
        then: 'Hệ thống bôi đỏ âm tiết nhấn sai và hiển thị hướng dẫn trực quan: "Trọng âm rơi vào âm tiết thứ hai: de-VE-lop-ment. Hạ giọng âm tiết đầu \'de-\' và dồn năng lượng vào \'VE-\'".',
        completed: true
      },
      {
        id: 'ac-elsa-202-ui',
        given: 'Giao diện hiển thị từ vựng với cấu trúc âm tiết',
        when: 'Render trên màn hình',
        then: 'Các âm tiết được phân tách bằng dấu chấm hoặc gạch nối, âm tiết mang trọng âm chính viết hoa in đậm font-mono với kích thước lớn hơn 15% so với âm tiết không mang trọng âm.',
        completed: true
      },
      {
        id: 'ac-elsa-202-scale-5000',
        given: '5,000 học viên cùng lúc gửi âm thanh kiểm tra trọng âm',
        when: 'Tính toán tỷ lệ năng lượng âm tiết (Syllable Energy Ratio)',
        then: 'Thuật toán trích xuất chuỗi năng lượng RMS theo cửa sổ 20ms thực thi trên client, truyền vector thời lượng âm tiết (Syllable Duration Vector) dưới 50 byte về backend, đảm bảo máy chủ đáp ứng hơn 10,000 requests/giây mà không tăng tải.',
        completed: true
      },
      {
        id: 'ac-elsa-202-l1',
        given: 'Học viên có thói quen đánh dấu sắc vào âm tiết đầu tiên theo phản xạ tiếng Việt',
        when: 'Bộ lọc L1 phát hiện thói quen này',
        then: 'Cảnh báo đồng cảm: "Người Việt thường vô thức thêm dấu sắc vào âm đầu. Hãy thả lỏng cơ hàm và giữ âm đầu thật nhẹ và ngắn".',
        completed: true
      },
      {
        id: 'ac-elsa-202-a11y',
        given: 'Người dùng hỗ trợ âm thanh',
        when: 'Bấm nghe mẫu âm tiết',
        then: 'Phát âm thanh mẫu với trọng âm phóng đại cường độ (exaggerated stress audio) giúp người học dễ dàng cảm nhận sự chênh lệch nhịp điệu.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-elsa-202-algo', title: 'Xây dựng thuật toán Syllable Stress Ratio đo lường Duration, Intensity và F0 Peak', category: 'Algorithm', completed: true },
      { id: 't-elsa-202-ui', title: 'Thiết kế giao diện hiển thị âm tiết viết hoa nổi bật kèm phân tích nhịp điệu', category: 'Frontend', completed: true },
      { id: 't-elsa-202-tts', title: 'Tích hợp Web Speech API phát âm phóng đại trọng âm phục vụ luyện tai nghe', category: 'Audio/DSP', completed: true },
      { id: 't-elsa-202-scale', title: 'Tối ưu hóa vector truyền tải năng lượng âm tiết chỉ 50 byte giảm tải mạng tối đa', category: 'Performance', completed: true },
      { id: 't-elsa-202-qa', title: 'Kiểm thử với danh sách 50 từ đa âm tiết dễ nhấn sai nhất của người Việt', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design Specifications
- **Màn hình tham chiếu**: \`src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html\`
- **React Component**: \`vietphonics-app/src/views/PracticeStudioView.jsx\`
- **Stress Visualization**: Âm tiết chính hiển thị \`text-lg font-black text-rose-600\`, âm tiết phụ hiển thị \`text-xs text-slate-400\`.`
  },
  {
    id: 'ELSA-203',
    epic_id: 'epic-prosody',
    title: 'Suprasegmental Pitch & Sentence Intonation Melody Canvas: Biểu Đồ Đường Cong Cao Độ F0 Ngũ Điệu',
    persona: 'Người học tiếng Anh giao tiếp muốn nói tự nhiên có giai điệu, không bị giọng phẳng hoặc tụt giọng sai chỗ',
    action: 'quan sát biểu đồ đường cong cao độ F0 (80Hz - 350Hz) đối chiếu giọng của mình với giọng chuẩn General US',
    value: 'thấy được trực quan đường nét ngữ điệu (lên giọng cuối câu hỏi Yes/No, xuống giọng câu trần thuật, lướt sóng câu cảm thán), giúp cải thiện ngay lập tức giai điệu nói tiếng Anh tự nhiên',
    priority: 'must',
    status: 'in-progress',
    size: 'XL',
    points: 13,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-elsa-203-canvas',
        given: 'Học viên đọc câu hỏi cần lên giọng (Rising Intonation: "Are you coming tonight?")',
        when: 'Học viên nói với ngữ điệu tụt dốc ở cuối câu',
        then: 'Đường cong cao độ học viên (màu Rose #e11d48) tách rời rõ rệt khỏi đường nét mẫu (màu Sky nét đứt #0284c7) và xuất hiện cảnh báo ngữ điệu: "Giọng bạn bị tụt xuống ở cuối câu. Hãy nâng cao độ ở âm tiết cuối của câu hỏi Yes/No!".',
        completed: true
      },
      {
        id: 'ac-elsa-203-ui',
        given: 'Khung hiển thị đồ họa SVG Suprasegmental Intonation Canvas',
        when: 'Render trên màn hình độ phân giải cao',
        then: 'Trục tung hiển thị dải tần số thực từ 80Hz (Chest voice) đến 350Hz (Head voice), trục hoành hiển thị dòng thời gian từ 0.0s đến 4.2s có gắn nhãn từng từ ngữ cảnh; diện tích dưới đường cong được tô gradient mờ tinh tế, có lưới gridlines âm học đứt đoạn.',
        completed: true
      },
      {
        id: 'ac-elsa-203-scale-5000',
        given: '5,000 học viên đồng thời theo dõi biểu đồ ngữ điệu thời gian thực',
        when: 'Trình duyệt vẽ đường cong F0',
        then: 'Thuật toán Autocorrelation / YIN trích xuất F0 chạy trực tiếp trong Web Worker client không chiếm luồng chính (Main Thread), vẽ đồ họa bằng SVG đường cong Bézier 60 FPS, không gửi bất kỳ khung hình nào về máy chủ.',
        completed: true
      },
      {
        id: 'ac-elsa-203-grid-toggle',
        given: 'Học viên muốn nhìn rõ đường lưới âm học F1/F2 hoặc muốn tối giản giao diện',
        when: 'Bấm nút "Lưới F1-F2: Bật / Tắt"',
        then: 'Các đường lưới tham chiếu ngang dọc ẩn/hiện mượt mà với hiệu ứng chuyển tiếp CSS opacity trong 200ms.',
        completed: true
      },
      {
        id: 'ac-elsa-203-a11y',
        given: 'Người dùng điều hướng bằng bàn phím',
        when: 'Tab đến biểu đồ ngữ điệu',
        then: 'Có thuộc tính aria-label mô tả: "Biểu đồ đường cong cao độ F0: Giọng bản ngữ lên giọng ở 3.2s, giọng của bạn đi ngang ở 3.2s, độ tương đồng 78%".',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-elsa-203-svg', title: 'Thiết kế đồ họa SVG Suprasegmental Pitch Canvas 1000x240 với gradient đổ bóng và đường cong Bézier', category: 'Frontend', completed: true },
      { id: 't-elsa-203-yin', title: 'Tối ưu hóa thuật toán trích xuất pitch F0 bằng YIN/Autocorrelation trong Web Worker', category: 'Audio/DSP', completed: true },
      { id: 't-elsa-203-alignment', title: 'Căn chỉnh chữ cái mốc thời gian từng từ dưới trục hoành khớp với dòng phát âm', category: 'Frontend', completed: true },
      { id: 't-elsa-203-scale', title: 'Đảm bảo biểu đồ render mượt mà 60 FPS trên màn hình điện thoại tầm trung không giật lag', category: 'Performance', completed: true },
      { id: 't-elsa-203-qa', title: 'Kiểm thử với câu hỏi Yes/No, câu hỏi Wh-, câu trần thuật và câu cảm thán', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design Specifications
- **Màn hình tham chiếu**: \`src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html\`
- **React Component**: \`vietphonics-app/src/views/PracticeStudioView.jsx\`
- **Color Gradients**:
  - Native Pitch: \`stroke="#0284c7" strokeDasharray="6 4" strokeWidth="3"\` với \`linearGradient id="nativePitchGlowLight"\`
  - User Pitch: \`stroke="#e11d48" strokeWidth="3.5"\` với \`linearGradient id="userPitchGlowLight"\`
- **Axes Labels**: 350 Hz, 260 Hz, 170 Hz, 80 Hz; Time slices 0.0s đến 4.2s.`
  },
  {
    id: 'VN-103',
    epic_id: 'epic-prosody',
    title: 'Syllable Stress vs. Tone Mark Visualizer & Schwa De-Toner: Bộ Lọc Khử Dấu Sắc/Huyền Tiếng Việt',
    persona: 'Người Việt Nam có phản xạ gắn 6 dấu thanh điệu tiếng Việt (sắc, huyền, hỏi, ngã, nặng, ngang) vào nguyên âm tiếng Anh',
    action: 'luyện phát âm nguyên âm yếu không nhấn trọng âm (Schwa /ə/) trong các từ như "banana", "comfortable", "computer"',
    value: 'bộ trực quan hóa so sánh nhịp điệu phát hiện và cảnh báo việc đánh dấu thanh, hướng dẫn người học hạ thấp và rút ngắn nguyên âm Schwa về trạng thái thả lỏng tự nhiên',
    priority: 'must',
    status: 'in-progress',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-vn-103-detoner',
        given: 'Từ có nguyên âm Schwa yếu (ví dụ âm /ə/ trong "comfortable")',
        when: 'Học viên phát âm thành 4 âm tiết có dấu thanh bằng phẳng ("com-phơ-tờ-bồ")',
        then: 'Hệ thống nhận diện trường độ âm tiết bằng nhau, hiển thị cảnh báo: "Lỗi Đánh Dấu Thanh L1! Rút ngắn và thả lỏng nguyên âm không nhấn thành âm Schwa /ə/".',
        completed: true
      },
      {
        id: 'ac-vn-103-rhythm',
        given: 'Học viên kéo dài âm tiết có trọng âm > 2 lần so với âm Schwa không trọng âm',
        when: 'Mô hình phân tích nhịp điệu (Stress-Timed Rhythm Metric)',
        then: 'Chỉ số nhịp điệu sáng xanh lá với thông điệp: "Đạt chuẩn nhịp điệu Stress-Timed tự nhiên (+10 Bonus Rhythm Score)".',
        completed: true
      },
      {
        id: 'ac-vn-103-ui',
        given: 'Giao diện hiển thị trực quan',
        when: 'Render bảng thông số Schwa De-Toner',
        then: 'Hiển thị ký hiệu ngữ âm Schwa /ə/ to rõ trong khung viền Sky mờ tinh tế, biểu tượng micro-interaction nhấp nháy khi phát hiện dấu thanh tiếng Việt.',
        completed: true
      },
      {
        id: 'ac-vn-103-scale-5000',
        given: '5,000 học viên cùng lúc phân tích tỷ lệ Schwa',
        when: 'Hệ thống xử lý tính toán',
        then: 'Thời gian trích xuất tỷ lệ trường độ nguyên âm chỉ mất dưới 5ms trên client; không yêu cầu thêm kết nối mạng.',
        completed: true
      },
      {
        id: 'ac-vn-103-a11y',
        given: 'Học viên cần giải thích dễ hiểu bằng tiếng Việt',
        when: 'Nhấp vào nút hướng dẫn âm Schwa',
        then: 'Hiển thị giải thích giải phẫu đơn giản: "Âm Schwa /ə/ là âm lười nhất trong tiếng Anh: cơ môi thả lỏng, hàm hơi mở nhẹ, phát âm thoáng qua như tiếng \'ơ\' cực nhẹ".',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-vn-103-metric', title: 'Xây dựng thước đo nhịp điệu Pairwise Variability Index (PVI) chuẩn ngôn ngữ học', category: 'Algorithm', completed: true },
      { id: 't-vn-103-ui', title: 'Thiết kế thẻ trực quan hóa Schwa De-Toner trong PracticeStudioView', category: 'Frontend', completed: true },
      { id: 't-vn-103-audio', title: 'Thêm bài tập mẫu so sánh âm Schwa chuẩn vs âm bị đánh dấu thanh tiếng Việt', category: 'Audio/DSP', completed: true },
      { id: 't-vn-103-scale', title: 'Tối ưu hóa hiệu năng tính toán ma trận độ biến thiên trường độ nguyên âm', category: 'Performance', completed: true },
      { id: 't-vn-103-qa', title: 'Kiểm thử phản xạ âm Schwa trên 20 từ thông dụng bị người Việt phát âm sai nhiều nhất', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design Specifications
- **Màn hình tham chiếu**: \`src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html\`
- **React Component**: \`vietphonics-app/src/views/PracticeStudioView.jsx\`

### 🔬 Cơ Sở Ngôn Ngữ Học So Sánh L1
- Tiếng Việt là ngôn ngữ đẳng thời âm tiết (Syllable-timed) có thanh điệu; mỗi âm tiết có độ dài và độ cao thanh điệu riêng.
- Tiếng Anh là ngôn ngữ đẳng thời trọng âm (Stress-timed); các âm tiết không nhấn bị rút ngắn tối đa thành nguyên âm trung tính Schwa /ə/.
- VN-103 giúp người học Việt Nam chuyển đổi tư duy từ "đọc từng âm có dấu" sang "nhấn trọng âm dứt khoát và lướt qua âm phụ".`
  }
];
