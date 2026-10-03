export const articulationStories = [
  {
    id: 'ELSA-205',
    epic_id: 'epic-articulation',
    title: 'Minimal Pair Auditory Discrimination Quizzes: Luyện Tai Phân Biệt Cặp Âm Dễ Nhầm Lẫn (/θ/-/t/, /iː/-/ɪ/)',
    persona: 'Người học tiếng Anh thường xuyên nhầm lẫn các cặp âm gần giống nhau do tai chưa nhận diện được sự khác biệt âm học',
    action: 'nghe âm thanh ngẫu nhiên được phát ra và chọn từ chính xác giữa 2 lựa chọn cặp âm tối thiểu (A vs B)',
    value: 'rèn luyện phản xạ thính giác nhạy bén, phân biệt rõ ràng giữa /θ/ (think) vs /t/ (tink), /iː/ (sheep) vs /ɪ/ (ship), /s/ (sea) vs /ʃ/ (she) trước khi tập phát âm',
    priority: 'must',
    status: 'in-progress',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-elsa-205-quiz',
        given: 'Cặp âm tối thiểu /θ/ vs /t/ với 2 từ "think" và "tink"',
        when: 'Học viên bấm nút loa phát âm thanh ngẫu nhiên và chọn Lựa chọn A ("think")',
        then: 'Nếu đúng, hiển thị thông báo chúc mừng màu xanh lá, tăng điểm bài kiểm tra (ví dụ: 3/3), tăng chuỗi streak và hiển thị mẹo cấu âm: "Chú ý kẹp lưỡi giữa hai răng cho /θ/, đầu lưỡi bật sau nướu cho /t/".',
        completed: true
      },
      {
        id: 'ac-elsa-205-ui',
        given: 'Tab "Cặp Âm (ELSA-205 & PRON-208)" trong MasteryLabView',
        when: 'Giao diện hiển thị',
        then: 'Nút loa phát âm to tròn 80px nổi bật giữa màn hình với hiệu ứng hover:scale-110 active:scale-95, 2 nút chọn từ A và B to bản thiết kế dạng Bento card, font-black 24px, hiển thị phiên âm IPA chuẩn bên dưới.',
        completed: true
      },
      {
        id: 'ac-elsa-205-scale-5000',
        given: '5,000 học viên cùng làm bài trắc nghiệm phân biệt thính giác',
        when: 'Phát âm thanh mẫu',
        then: 'Sử dụng Web Speech API của trình duyệt hoặc tải file âm thanh mẫu từ CDN Cloudflare với bộ nhớ đệm Cache-Control max-age=31536000; thời gian phản hồi âm thanh < 10ms, không tiêu tốn băng thông máy chủ chính.',
        completed: true
      },
      {
        id: 'ac-elsa-205-l1',
        given: 'Học viên chọn nhầm từ "ship" thành "sheep"',
        when: 'Hệ thống báo sai',
        then: 'Giải thích rõ lỗi L1 tiếng Việt: "Tiếng Việt không có nguyên âm thả lỏng /ɪ/, người Việt hay đọc thành nguyên âm căng /iː/. Hãy phát âm dứt khoát và thả lỏng khóe môi".',
        completed: true
      },
      {
        id: 'ac-elsa-205-a11y',
        given: 'Người dùng thao tác bằng phím tắt',
        when: 'Nhấn phím 1 cho lựa chọn A, phím 2 cho lựa chọn B, phím Space để nghe lại âm',
        then: 'Giao diện phản hồi chuẩn xác theo phím tắt, các nút có đầy đủ aria-label mô tả nội dung từ.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-elsa-205-quiz-ui', title: 'Xây dựng component MinimalPairQuiz với danh sách các cặp âm dễ nhầm của người Việt', category: 'Frontend', completed: true },
      { id: 't-elsa-205-tts', title: 'Tích hợp hàm phát âm thanh playWord với Web Speech API tốc độ 0.8x chuẩn General US', category: 'Audio/DSP', completed: true },
      { id: 't-elsa-205-state', title: 'Quản lý state bài thi quizScore, answeredState, và tự động đồng bộ streak qua AppContext', category: 'Frontend', completed: true },
      { id: 't-elsa-205-scale', title: 'Kiểm thử tải đồng thời 5,000 phiên trắc nghiệm với thời gian phản hồi dưới 15ms', category: 'Performance', completed: true },
      { id: 't-elsa-205-qa', title: 'Kiểm tra độ chính xác của 10 cặp âm tối thiểu phổ biến nhất trong tiếng Anh giao tiếp', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design Specifications
- **Màn hình tham chiếu**: \`src/ui-reference/kh_u_h_nh_2d_gi_i_ph_u_c_mi_ng_light_mode/code.html\`
- **React Component**: \`vietphonics-app/src/views/MasteryLabView.jsx\`
- **Interactive Elements**: Nút loa tròn Sky \`#0284c7\`, Card lựa chọn bo góc \`rounded-2xl border-2 border-slate-200 hover:border-primary\`.`
  },
  {
    id: 'PRON-201',
    epic_id: 'epic-articulation',
    title: 'Interactive 2D Anatomical Lip & Tongue Articulation Guide: Mô Phỏng Thiết Diện Giải Phẫu Cắt Dọc 2D',
    persona: 'Người học tiếng Anh muốn thấy rõ cấu tạo bên trong vòm miệng khi phát âm các âm khó',
    action: 'chọn âm vị mục tiêu và tương tác với đồ họa giải phẫu 2D Sagittal Section',
    value: 'nhìn thấy rõ vị trí đầu lưỡi, độ nâng vòm miệng mềm (velum), độ hạ hàm dưới và luồng hơi thoát ra, kèm 3 thanh trượt điều chỉnh sinh học để hiểu bản chất cơ thể học khi phát âm',
    priority: 'must',
    status: 'in-progress',
    size: 'XL',
    points: 13,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pron-201-sagittal',
        given: 'Học viên chọn âm vị xát kẹp lưỡi /θ/ (think)',
        when: 'Thiết diện cắt dọc Sagittal 2D hiển thị',
        then: 'Đồ họa SVG kích thước 760x500 hiển thị vòm miệng, răng cửa trên dưới, và cơ lưỡi (màu Coral #fb7185) với đầu lưỡi thò ra kẹp giữa hai răng cửa; luồng khí Cyan (#38bdf8) thổi qua kẽ răng.',
        completed: true
      },
      {
        id: 'ac-pron-201-sliders',
        given: '3 thanh trượt điều chỉnh sinh học: Độ nâng lưỡi (Tongue Elevation), Độ hạ hàm (Jaw Drop), Áp lực hơi (Airflow Pressure)',
        when: 'Học viên kéo các thanh slider',
        then: 'Khối cơ lưỡi và xương hàm dưới trên đồ họa SVG dịch chuyển tức thời theo thời gian thực (real-time SVG coordinate transform), không bị giật lag.',
        completed: true
      },
      {
        id: 'ac-pron-201-ui',
        given: 'Màn hình MouthAnatomyView',
        when: 'Render trên trình duyệt',
        then: 'Áp dụng thiết kế chuẩn Stitch: các dải lưới tọa độ giải phẫu mờ nhạt, nhãn chú thích các bộ phận (Răng trên, Nướu, Lưỡi, Thanh hầu) bằng font-mono sắc nét, phối màu sinh học y khoa hiện đại.',
        completed: true
      },
      {
        id: 'ac-pron-201-scale-5000',
        given: '5,000 học viên cùng lúc tương tác với mô hình giải phẫu 2D',
        when: 'Kéo thanh trượt điều chỉnh liên tục',
        then: 'Toàn bộ việc tính toán tọa độ Bézier và di chuyển SVG diễn ra trên GPU client qua CSS transforms; 0% tiêu thụ tài nguyên máy chủ.',
        completed: true
      },
      {
        id: 'ac-pron-201-a11y',
        given: 'Người dùng sử dụng bàn phím',
        when: 'Tab vào các thanh slider',
        then: 'Hỗ trợ phím mũi tên trái/phải để tăng giảm giá trị từng nấc 1 đơn vị, có thuộc tính aria-valuenow, aria-valuemin, aria-valuemax rõ ràng.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pron-201-svg', title: 'Thiết kế đồ họa SVG giải phẫu cắt dọc 2D Sagittal view 760x500 với các đường cong Bézier động', category: 'Frontend', completed: true },
      { id: 't-pron-201-sliders', title: 'Tích hợp 3 thanh trượt điều khiển: tongueElev, jawDrop, airPressure đồng bộ tọa độ SVG', category: 'Frontend', completed: true },
      { id: 't-pron-201-phonemes', title: 'Xây dựng danh mục dữ liệu cấu âm cho các âm khó: /θ/, /ð/, /ʃ/, /ʒ/, /tʃ/, /dʒ/', category: 'Phonetics', completed: true },
      { id: 't-pron-201-scale', title: 'Tối ưu hóa hiệu năng render SVG 60 FPS trên màn hình điện thoại tầm trung', category: 'Performance', completed: true },
      { id: 't-pron-201-qa', title: 'Kiểm tra tính chính xác về mặt giải phẫu cơ miệng theo tài liệu ngữ âm học đại học Oxford', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design Specifications
- **Màn hình tham chiếu**: \`src/ui-reference/kh_u_h_nh_2d_gi_i_ph_u_c_mi_ng_light_mode/code.html\`
- **React Component**: \`vietphonics-app/src/views/MouthAnatomyView.jsx\`
- **SVG Anatomical Palette**: 
  - Muscle Gradient: \`linearGradient #fb7185 -> #be123c\`
  - Airflow Cyan: \`linearGradient #38bdf8 -> #0369a1\`
  - Bone & Teeth: \`#ffffff border #94a3b8\``
  },
  {
    id: 'PRON-202',
    epic_id: 'epic-articulation',
    title: 'Phonemic Audio Dictation & Gap-Fill Exercises: Nghe Chính Tả & Điền Âm Vị Khuyết',
    persona: 'Người học muốn vừa luyện tai nghe vừa liên kết chính tả mặt chữ với âm vị thực tế',
    action: 'nghe câu phát âm mẫu bản ngữ và gõ các chữ cái/âm vị còn thiếu vào ô trống',
    value: 'khắc phục triệt để thói quen viết đúng nhưng đọc thiếu âm đuôi, củng cố mối liên hệ giữa chữ viết chính tả và âm vị học',
    priority: 'should',
    status: 'in-progress',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pron-202-gap',
        given: 'Câu luyện tập có từ bị khuyết phụ âm đuôi (ví dụ: "Si___ months ago...")',
        when: 'Học viên nghe âm thanh mẫu và gõ ký tự "x" vào ô input',
        then: 'Hệ thống kiểm tra tức thì, hiển thị phản hồi xanh lá "Chính xác! Từ \'six\' kết thúc bằng phụ âm kép /ks/".',
        completed: true
      },
      {
        id: 'ac-pron-202-ui',
        given: 'Chế độ "Chính Tả Âm Đuôi" trong PracticeStudioView',
        when: 'Học viên chuyển chế độ',
        then: 'Khung bài tập mở ra mượt mà, ô nhập văn bản có viền rõ ràng focus:ring-2 focus:ring-rose-500, nút "Kiểm Tra" nổi bật, nút nghe lại âm thanh mẫu dễ bấm.',
        completed: true
      },
      {
        id: 'ac-pron-202-scale-5000',
        given: '5,000 học viên cùng làm bài nghe chính tả điền từ',
        when: 'Gửi kết quả kiểm tra',
        then: 'Toàn bộ logic so khớp chuỗi (string matching) và kiểm tra ký tự thực thi trực tiếp trên client JavaScript O(1); không sinh thêm request mạng về backend.',
        completed: true
      },
      {
        id: 'ac-pron-202-l1',
        given: 'Học viên gõ thiếu âm đuôi (ví dụ gõ "bak" thay vì "baked")',
        when: 'Kiểm tra kết quả',
        then: 'Cảnh báo chỉ rõ: "Thiếu đuôi quá khứ -ed! Trong từ \'baked\', đuôi -ed đứng sau phụ âm vô thanh /k/ sẽ được phát âm là /t/".',
        completed: true
      },
      {
        id: 'ac-pron-202-a11y',
        given: 'Học viên sử dụng bàn phím',
        when: 'Gõ xong từ và nhấn phím Enter',
        then: 'Tự động kích hoạt hành động kiểm tra bài làm, focus giữ nguyên trên màn hình kết quả thuận tiện.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pron-202-ui', title: 'Xây dựng giao diện Dictation Mode trong PracticeStudioView với input và validation', category: 'Frontend', completed: true },
      { id: 't-pron-202-rules', title: 'Xây dựng bộ từ điển kiểm tra các cụm âm đuôi dễ gõ sai: -ed, -s/es, -x, -th', category: 'Algorithm', completed: true },
      { id: 't-pron-202-scale', title: 'Tối ưu hóa phản hồi thời gian thực dưới 5ms khi gõ phím', category: 'Performance', completed: true },
      { id: 't-pron-202-qa', title: 'Kiểm thử xử lý khoảng trắng thừa, chữ hoa/chữ thường trong ô nhập liệu', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design Specifications
- **Màn hình tham chiếu**: \`src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html\`
- **React Component**: \`vietphonics-app/src/views/PracticeStudioView.jsx\` (Dictation Mode Toggle)`
  },
  {
    id: 'PRON-203',
    epic_id: 'epic-articulation',
    title: 'Targeted Sound Read-Aloud & Contextual Fluency Drills: Đọc To Đoạn Văn Ngữ Cảnh Chứa Âm Mục Tiêu',
    persona: 'Người học muốn chuyển hóa âm vị đã học đơn lẻ vào việc đọc câu dài trôi chảy trong ngữ cảnh thực tế',
    action: 'đọc to các câu văn và đoạn văn hoàn chỉnh được thiết kế bão hòa âm mục tiêu',
    value: 'giúp cơ hàm thích nghi với việc di chuyển liên tục giữa các âm vị khó mà không bị vấp hoặc khựng lại',
    priority: 'must',
    status: 'in-progress',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pron-203-flow',
        given: 'Đoạn văn ngữ cảnh chứa âm /θ/ và /s/',
        when: 'Học viên đọc to toàn bộ đoạn văn',
        then: 'Hệ thống theo dõi luồng phát âm liên tục, tính toán điểm độ lưu loát ngữ cảnh (Contextual Fluency Score) và phát hiện các điểm ngắt hơi sai quy tắc.',
        completed: true
      },
      {
        id: 'ac-pron-203-ui',
        given: 'Giao diện phòng thu PracticeStudioView',
        when: 'Render đoạn văn',
        then: 'Đoạn văn hiển thị với kích thước chữ lớn 24px, khoảng cách dòng leading-relaxed thoáng đãng, các từ có âm mục tiêu được tô màu nhẹ nhàng để học viên dễ nhận biết trước khi nói.',
        completed: true
      },
      {
        id: 'ac-pron-203-scale-5000',
        given: '5,000 học viên đồng thời luyện đọc đoạn văn ngữ cảnh',
        when: 'Truyền tải văn bản và âm thanh mẫu',
        then: 'Toàn bộ văn bản và danh sách âm vị được nạp sẵn qua AppContext tĩnh; zero lời gọi nạp dữ liệu thừa trong khi đọc.',
        completed: true
      },
      {
        id: 'ac-pron-203-l1',
        given: 'Học viên đọc đoạn văn có sự chuyển đổi liên tục giữa /s/ và /ʃ/',
        when: 'Cơ môi không kịp thay đổi từ bẹt sang chu tròn',
        then: 'Hệ thống đánh dấu các điểm chuyển tiếp bị dính âm (transition failure) và khuyên học viên đọc chậm lại ở tốc độ 0.8x.',
        completed: true
      },
      {
        id: 'ac-pron-203-a11y',
        given: 'Người dùng muốn nghe lại từng cụm từ',
        when: 'Bấm vào bất kỳ từ nào trong đoạn văn',
        then: 'Phát âm thanh mẫu cô lập của từ đó giúp điều chỉnh trước khi đọc to cả câu.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pron-203-ui', title: 'Thiết kế khung văn bản ngữ cảnh trong PracticeStudioView với font chữ lớn và tương tác click', category: 'Frontend', completed: true },
      { id: 't-pron-203-audio', title: 'Tích hợp nút "Nghe toàn câu mẫu" phát âm thanh ngữ cảnh tốc độ chuẩn 1.0x', category: 'Audio/DSP', completed: true },
      { id: 't-pron-203-scale', title: 'Kiểm tra bộ nhớ RAM trình duyệt khi học viên luyện đọc liên tục 30 phút', category: 'Performance', completed: true },
      { id: 't-pron-203-qa', title: 'Đánh giá độ nhạy của bộ phát hiện điểm ngắt hơi trên 20 đoạn văn ngữ cảnh công sở', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design Specifications
- **Màn hình tham chiếu**: \`src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html\`
- **React Component**: \`vietphonics-app/src/views/PracticeStudioView.jsx\``
  },
  {
    id: 'PRON-204',
    epic_id: 'epic-articulation',
    title: 'Dual-Track Audio Recording & Native Speaker Waveform Comparison: Đối Chiếu Trực Quan Dạng Sóng Âm',
    persona: 'Người học có tư duy thị giác (visual learners) muốn nhìn thấy sự khác biệt về trường độ và độ bật của giọng mình so với người bản ngữ',
    action: 'thu âm giọng nói và quan sát 2 track sóng âm song song: Track Bản Ngữ (Native Reference) và Track Người Học (User Track)',
    value: 'nhận ra ngay trực quan đoạn âm đuôi của mình bị đứt cụt (cụt sóng do nuốt âm) trong khi sóng âm bản ngữ kéo dài một đuôi xát tần số cao rõ rệt',
    priority: 'must',
    status: 'in-progress',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pron-204-waves',
        given: 'Bản ghi âm hoàn tất',
        when: 'Màn hình hiển thị đối chiếu dạng sóng',
        then: 'Hiển thị 2 track sóng âm song song: Track trên là sóng âm chuẩn bản ngữ (màu Electric Cyan #0284c7), track dưới là sóng âm học viên (màu Rose #e11d48), các đỉnh biên độ âm thanh được căn chỉnh theo thời gian thực.',
        completed: true
      },
      {
        id: 'ac-pron-204-ui',
        given: 'Giao diện visualizer',
        when: 'Học viên xem 2 track sóng âm',
        then: 'Đồ họa vẽ sắc nét trên Canvas HTML5 60 FPS, có thước đo thời gian (0.0s đến 3.5s), điểm khác biệt biên độ âm đuôi được đóng khung viền cảnh báo nổi bật.',
        completed: true
      },
      {
        id: 'ac-pron-204-scale-5000',
        given: '5,000 học viên đồng thời xem visualizer dạng sóng',
        when: 'Canvas render trên thiết bị người dùng',
        then: 'Canvas 2D context sử dụng buffer hình ảnh tối ưu trên GPU client; zero tải xử lý đồ họa lên máy chủ.',
        completed: true
      },
      {
        id: 'ac-pron-204-l1',
        given: 'Học viên phát âm "six" bị nuốt đuôi /ks/',
        when: 'Đối chiếu dạng sóng',
        then: 'Track người học dập tắt biên độ ở 0.4s (cụt đuôi), trong khi track bản ngữ có chùm năng lượng xát kéo dài đến 0.7s; hệ thống hiển thị chú thích trực quan ngay trên sóng âm.',
        completed: true
      },
      {
        id: 'ac-pron-204-a11y',
        given: 'Người dùng hỗ trợ âm thanh',
        when: 'Nhấn nút "Phát song song"',
        then: 'Hệ thống có thể phát lần lượt giọng mẫu rồi đến giọng học viên để tai nghe đối chiếu tức thì sự khác biệt.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pron-204-canvas', title: 'Xây dựng Canvas Waveform so sánh 2 track sóng âm với requestAnimationFrame', category: 'Frontend', completed: true },
      { id: 't-pron-204-envelope', title: 'Viết hàm trích xuất đường bao biên độ âm thanh (amplitude envelope) từ Float32Array', category: 'Audio/DSP', completed: true },
      { id: 't-pron-204-scale', title: 'Tối ưu hóa canvas pixel ratio phù hợp màn hình Retina không bị mờ nét', category: 'Performance', completed: true },
      { id: 't-pron-204-qa', title: 'Kiểm tra độ trễ hiển thị sóng âm sau khi bấm dừng thu âm phải dưới 100ms', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design Specifications
- **Màn hình tham chiếu**: \`src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html\`
- **React Component**: \`vietphonics-app/src/views/PracticeStudioView.jsx\``
  },
  {
    id: 'PRON-205',
    epic_id: 'epic-articulation',
    title: '3-Tier Positional Phoneme Ladder: Luyện Âm Phân Vị 3 Cấp Độ (Đầu Từ - Giữa Từ - Cuối Từ)',
    persona: 'Người học phát âm được âm khi nó đứng ở đầu từ nhưng bị ngọng hoặc nuốt khi âm đó đứng ở giữa hoặc cuối từ',
    action: 'luyện tập theo bậc thang phân vị 3 cấp độ: Tier 1 (Initial - Đầu từ), Tier 2 (Medial - Giữa từ), Tier 3 (Final - Cuối từ)',
    value: 'nắm vững cơ chế vận động cơ hàm ở mọi vị trí ngữ âm, khắc phục dứt điểm việc chỉ phát âm đúng khi từ đứng độc lập',
    priority: 'must',
    status: 'in-progress',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pron-205-ladder',
        given: 'Âm mục tiêu /θ/ (Interdental Fricative)',
        when: 'Học viên mở bài luyện bậc thang phân vị',
        then: 'Hiển thị 3 cấp bậc rõ ràng: 1. Initial (Think /θɪŋk/), 2. Medial (Method /ˈmeθəd/), 3. Final (Breath /breθ/), mỗi cấp bậc có nút nghe từ và nghe câu mẫu hoàn chỉnh.',
        completed: true
      },
      {
        id: 'ac-pron-205-ui',
        given: 'Tab "Bậc Thang Phân Vị (PRON-205 & 206)" trong MasteryLabView',
        when: 'Giao diện hiển thị',
        then: '3 thẻ bento grid với gradient xanh Emerald dịu mắt, huy hiệu cấp độ in đậm font-mono, nút bấm nghe mẫu to rõ, thiết kế trực quan dễ theo dõi.',
        completed: true
      },
      {
        id: 'ac-pron-205-scale-5000',
        given: '5,000 học viên cùng lúc tương tác với các bậc thang phân vị',
        when: 'Chuyển đổi giữa các âm vị (/θ/ sang /ks/)',
        then: 'Dữ liệu bậc thang được lưu trong bộ nhớ client, chuyển đổi âm vị tức thời trong 0ms, không phát sinh lời gọi API mạng.',
        completed: true
      },
      {
        id: 'ac-pron-205-l1',
        given: 'Học viên phát âm tốt âm /θ/ ở đầu từ ("think") nhưng bỏ quên ở cuối từ ("breath")',
        when: 'Hệ thống đánh giá',
        then: 'Chỉ rõ sự chênh lệch điểm số giữa các vị trí: "Vị trí đầu: 92% | Vị trí cuối: 48%. Hãy tập trung luyện Tier 3 để giữ đầu lưỡi ở cuối từ!".',
        completed: true
      },
      {
        id: 'ac-pron-205-a11y',
        given: 'Người dùng sử dụng bàn phím',
        when: 'Tab qua 3 cấp bậc',
        then: 'Các nút nghe mẫu có nhãn aria-label chi tiết: "Nghe từ mẫu bậc 1: Think", "Nghe câu mẫu bậc 1".',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pron-205-ui', title: 'Xây dựng giao diện 3-Tier Positional Ladder trong MasteryLabView với 3 thẻ bento grid', category: 'Frontend', completed: true },
      { id: 't-pron-205-data', title: 'Biên soạn dữ liệu phân vị cho các âm khó nhất: /θ/, /ð/, /ks/, /s/, /tʃ/', category: 'Phonetics', completed: true },
      { id: 't-pron-205-scale', title: 'Tối ưu hóa bộ nhớ đệm client cho dữ liệu bậc thang âm vị', category: 'Performance', completed: true },
      { id: 't-pron-205-qa', title: 'Kiểm tra tính logic của tiến trình độ khó từ Đầu ➔ Giữa ➔ Cuối', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design Specifications
- **Màn hình tham chiếu**: \`src/ui-reference/kh_u_h_nh_2d_gi_i_ph_u_c_mi_ng_light_mode/code.html\`
- **React Component**: \`vietphonics-app/src/views/MasteryLabView.jsx\` (Tab: Bậc Thang Phân Vị)`
  },
  {
    id: 'PRON-206',
    epic_id: 'epic-articulation',
    title: 'Connected Speech Positional Progression: Nâng Cấp Độ Ngữ Đoạn (Từ ➔ Cụm Từ ➔ Câu Hoàn Chỉnh)',
    persona: 'Người học đã làm chủ âm ở cấp độ từ đơn nhưng khi nói vào câu hoàn chỉnh thì bị rụng âm trở lại',
    action: 'luyện tập theo tiến trình 3 bước nối tiếp: Cấp độ từ đơn ➔ Cấp độ cụm từ ➔ Cấp độ toàn câu ngữ cảnh',
    value: 'tạo cầu nối vững chắc giúp người học chuyển hóa kỹ năng phát âm từ bài tập riêng lẻ sang giao tiếp tự nhiên trong câu hoàn chỉnh',
    priority: 'must',
    status: 'in-progress',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pron-206-progression',
        given: 'Từ vựng "Method" chứa âm /θ/ ở giữa từ',
        when: 'Học viên xem tiến trình',
        then: 'Hiển thị rõ 3 tầng liên kết: Cấp từ ("Method" /ˈmeθəd/) ➔ Cấp cụm từ ("Scientific method") ➔ Cấp toàn câu ("The team follows a rigorous scientific method.").',
        completed: true
      },
      {
        id: 'ac-pron-206-ui',
        given: 'Giao diện MasteryLabView',
        when: 'Render tiến trình',
        then: 'Mỗi tầng ngữ đoạn được đóng khung viền bo tròn trắng sáng, có nhãn phân loại rõ ràng, nút nghe từ và nghe câu mẫu có màu sắc tương phản nổi bật.',
        completed: true
      },
      {
        id: 'ac-pron-206-scale-5000',
        given: '5,000 học viên đồng thời học bài tiến trình ngữ đoạn',
        when: 'Bấm nghe câu mẫu liên tục',
        then: 'Audio synthesis phát ngay tức thì qua Web Speech API không tốn tài nguyên mạng.',
        completed: true
      },
      {
        id: 'ac-pron-206-l1',
        given: 'Học viên đọc câu dài bị vấp ở điểm nối âm',
        when: 'Hệ thống phân tích',
        then: 'Cung cấp ghi chú hướng dẫn: "PRON-206: Tiến trình nối âm giúp khắc phục thói quen ngắt quãng từng từ của người Việt".',
        completed: true
      },
      {
        id: 'ac-pron-206-a11y',
        given: 'Học viên điều khiển bằng bàn phím',
        when: 'Tab đến nút "Câu Mẫu"',
        then: 'Phím Enter kích hoạt phát âm thanh toàn câu mượt mà.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pron-206-ui', title: 'Tích hợp cấp độ Cụm Từ và Toàn Câu vào các tầng bậc thang trong MasteryLabView', category: 'Frontend', completed: true },
      { id: 't-pron-206-data', title: 'Biên soạn 20 bộ câu tiến trình nối âm ứng dụng thực tế trong công sở', category: 'Phonetics', completed: true },
      { id: 't-pron-206-scale', title: 'Đảm bảo thời gian nạp giao diện dưới 50ms', category: 'Performance', completed: true },
      { id: 't-pron-206-qa', title: 'Kiểm thử chất lượng giọng đọc TTS cho các câu văn dài', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design Specifications
- **React Component**: \`vietphonics-app/src/views/MasteryLabView.jsx\` (Tab: Bậc Thang Phân Vị)`
  },
  {
    id: 'PRON-207',
    epic_id: 'epic-articulation',
    title: 'Phonetic Exception Words & Grammatical Voicing Alternation Rules: Bộ Từ Ngoại Lệ & Quy Tắc Rung Thanh Quản',
    persona: 'Người học tiếng Anh trình độ trung cấp hay bị nhầm lẫn giữa Danh từ (vô thanh) và Động từ (hữu thanh)',
    action: 'học các cặp từ có quy tắc biến đổi âm vị ngữ pháp (Voicing Alternation) và các từ ngoại lệ chính tả',
    value: 'hiểu bản chất khoa học: Danh từ phát âm vô thanh không rung (breath /breθ/, use /juːs/), Động từ hóa biến thành âm hữu thanh rung cổ họng (breathe /briːð/, use /juːz/)',
    priority: 'must',
    status: 'in-progress',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pron-207-alternation',
        given: 'Cặp từ "breath vs breathe"',
        when: 'Học viên xem quy tắc trong tab "Quy Tắc Biến Đổi Âm"',
        then: 'Hiển thị so sánh song song: Noun [Danh từ] "breath" (/breθ/ - âm /θ/ vô thanh không rung) vs Verb [Động từ] "breathe" (/briːð/ - âm /ð/ hữu thanh rung cổ họng + nguyên âm dài /iː/).',
        completed: true
      },
      {
        id: 'ac-pron-207-ui',
        given: 'Giao diện tab "Quy Tắc Biến Đổi (PRON-207)"',
        when: 'Render trên màn hình',
        then: '3 thẻ so sánh dạng bento card, phân biệt rõ ràng Noun Box (viền Slate xám) và Verb Box (viền Sky xanh), mỗi hộp có nút loa nghe phát âm riêng biệt, dòng giải thích quy tắc in nghiêng nổi bật.',
        completed: true
      },
      {
        id: 'ac-pron-207-scale-5000',
        given: '5,000 học viên cùng học quy tắc biến đổi âm thanh',
        when: 'Tương tác với các nút nghe mẫu',
        then: 'Âm thanh phát tức thì qua Web Speech API trên máy người dùng, zero tải mạng.',
        completed: true
      },
      {
        id: 'ac-pron-207-l1',
        given: 'Người Việt không quen rung thanh quản ở cuối từ',
        when: 'Học viên đọc từ "breathe"',
        then: 'Ghi chú mẹo: "Đặt ngón tay lên thanh quản để cảm nhận độ rung khi phát âm động từ \'breathe\'".',
        completed: true
      },
      {
        id: 'ac-pron-207-a11y',
        given: 'Người dùng hỗ trợ âm thanh',
        when: 'Bấm nút phát âm',
        then: 'Đọc rõ ràng từng từ kèm phân loại ngữ pháp: "Danh từ breath", "Động từ breathe".',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pron-207-ui', title: 'Xây dựng giao diện Voicing Alternation Cards trong MasteryLabView', category: 'Frontend', completed: true },
      { id: 't-pron-207-data', title: 'Biên soạn danh mục các cặp từ biến đổi âm: breath/breathe, use/use, house/houses, advice/advise', category: 'Phonetics', completed: true },
      { id: 't-pron-207-scale', title: 'Tối ưu hóa cấu trúc dữ liệu tĩnh trong component', category: 'Performance', completed: true },
      { id: 't-pron-207-qa', title: 'Kiểm tra tính chính xác của phiên âm quốc tế IPA trong từng thẻ từ', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design Specifications
- **React Component**: \`vietphonics-app/src/views/MasteryLabView.jsx\` (Tab: Quy Tắc Biến Đổi Âm)`
  },
  {
    id: 'PRON-208',
    epic_id: 'epic-articulation',
    title: 'L1 Confusion-Trap Cross-Transition Drills: Bài Tập Chuyển Đổi Đối Kháng Âm Đích & Âm Bẫy L1',
    persona: 'Người học hay bị "trượt âm" hoặc đồng hóa âm tiếng Anh thành âm tiếng Việt quen thuộc khi hai âm đứng cạnh nhau',
    action: 'luyện các bài tập chuyển đổi đối kháng giữa âm đích (Target Sound: /θ/, /ð/) và âm bẫy L1 (Intrusion Sound: /t/, /d/) trong cùng một câu',
    value: 'rèn luyện sự kiểm soát cơ lưỡi độc lập, không bị cuốn theo thói quen thổ âm khi nói câu phức tạp',
    priority: 'must',
    status: 'in-progress',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pron-208-drill',
        given: 'Câu đối kháng âm /ð/ vs /d/: "They dare to go there today."',
        when: 'Học viên đọc câu',
        then: 'Hệ thống tách riêng điểm số của âm đích /ð/ (kẹp lưỡi) và âm bẫy /d/ (bật nướu), cảnh báo nếu học viên đồng hóa /ð/ thành /d/ ("Đồng hóa âm! Cần kẹp lưỡi cho \'They\' và bật nướu cho \'dare\'").',
        completed: true
      },
      {
        id: 'ac-pron-208-ui',
        given: 'Giao diện bài tập trong MasteryLabView',
        when: 'Render trên màn hình',
        then: 'Các âm đích được đánh dấu màu xanh Sky, âm bẫy được đánh dấu màu tím Indigo, có chú thích vị trí cơ hàm đối nghịch rõ ràng.',
        completed: true
      },
      {
        id: 'ac-pron-208-scale-5000',
        given: '5,000 học viên đồng thời làm bài tập chuyển đổi đối kháng',
        when: 'Hệ thống chấm điểm',
        then: 'Thuật toán phân tích chuỗi âm vị chạy trong WebAssembly dưới 20ms, đảm bảo tốc độ tối đa cho 5,000 người dùng.',
        completed: true
      },
      {
        id: 'ac-pron-208-l1',
        given: 'Người Việt có thói quen đọc "they" thành "đây"',
        when: 'Phát hiện lỗi',
        then: 'Cung cấp bài tập thể dục cơ lưỡi: "Đẩy lưỡi ra kẹp giữa răng rồi rụt nhanh về sau nướu 5 lần để tạo phản xạ linh hoạt".',
        completed: true
      },
      {
        id: 'ac-pron-208-a11y',
        given: 'Người dùng sử dụng bàn phím',
        when: 'Điều khiển bài tập',
        then: 'Phím Space bắt đầu thu âm, phím R để nghe lại câu mẫu.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pron-208-ui', title: 'Tích hợp các câu bài tập chuyển đổi đối kháng vào MasteryLabView', category: 'Frontend', completed: true },
      { id: 't-pron-208-algo', title: 'Xây dựng thuật toán phân tách điểm âm đích vs âm bẫy trong cùng một câu', category: 'Algorithm', completed: true },
      { id: 't-pron-208-scale', title: 'Đảm bảo không nghẽn luồng xử lý âm thanh', category: 'Performance', completed: true },
      { id: 't-pron-208-qa', title: 'Kiểm thử với 10 câu bẫy chuyển đổi đối kháng phức tạp nhất', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design Specifications
- **React Component**: \`vietphonics-app/src/views/MasteryLabView.jsx\``
  },
  {
    id: 'PRON-209',
    epic_id: 'epic-articulation',
    title: 'Numbered Target Phoneme System & Multi-Spelling Sound Annotation: Hệ Thống Đánh Số Âm Vị Mục Tiêu',
    persona: 'Người học cần một hệ thống đánh số âm vị trực quan để ghi nhớ quy tắc chính tả tạo ra âm đó',
    action: 'xem các câu luyện tập có gắn số thứ tự âm vị (Target Number) và các quy tắc chính tả tương ứng (Digraph Rules)',
    value: 'nhận diện ngay quy tắc chữ viết: ví dụ âm /θ/ là âm #25, quy tắc chính là "th" (think, author), ngoại lệ danh xưng phát âm là /t/ ("Thomas", "Thames")',
    priority: 'should',
    status: 'in-progress',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pron-209-number',
        given: 'Bài học âm /θ/ trong tab "Shadowing & Chính Tả"',
        when: 'Giao diện hiển thị',
        then: 'Hiển thị huy hiệu to bản "Phoneme #25: /θ/ - Interdental Voiceless Fricative" cùng 2 thẻ quy tắc chính tả: 1) Quy tắc chính: Chữ viết "th" (think, author), 2) Ngoại lệ danh xưng: Phát âm là /t/ (Thomas /ˈtɒməs/, Thames /temz/).',
        completed: true
      },
      {
        id: 'ac-pron-209-ui',
        given: 'Giao diện hiển thị',
        when: 'Render trên màn hình',
        then: 'Huy hiệu số thứ tự âm vị tô màu Sky #0284c7 nền nhạt, các ô quy tắc chính tả đóng khung bo góc rounded-xl, font-mono hiển thị ví dụ sắc nét.',
        completed: true
      },
      {
        id: 'ac-pron-209-scale-5000',
        given: '5,000 học viên đồng thời tra cứu hệ thống đánh số âm vị',
        when: 'Tải dữ liệu',
        then: 'Toàn bộ bảng quy tắc chính tả 44 âm được nhúng tĩnh trong client bundle, 0 latency, 0 network request.',
        completed: true
      },
      {
        id: 'ac-pron-209-l1',
        given: 'Người Việt hay phát âm từ "Thomas" thành /θɒməs/',
        when: 'Xem thẻ ngoại lệ',
        then: 'Giải thích rõ ràng: "Tên riêng Thomas bắt nguồn từ tiếng Hy Lạp, chữ \'th\' ở đây phát âm là âm tắc /t/, không kẹp lưỡi".',
        completed: true
      },
      {
        id: 'ac-pron-209-a11y',
        given: 'Học viên xem trên thiết bị di động',
        when: 'Cuộn trang',
        then: 'Bố cục tự động co giãn 1 cột trên mobile và 2 cột trên desktop, không bị tràn chữ.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pron-209-ui', title: 'Xây dựng giao diện Numbered Target Phonemes trong MasteryLabView', category: 'Frontend', completed: true },
      { id: 't-pron-209-rules', title: 'Biên soạn danh mục quy tắc chính tả cho 44 âm vị quốc tế', category: 'Phonetics', completed: true },
      { id: 't-pron-209-scale', title: 'Tối ưu hóa dung lượng bundle không vượt quá 5KB cho toàn bộ bảng tra cứu', category: 'Performance', completed: true },
      { id: 't-pron-209-qa', title: 'Kiểm tra 100% các từ ngoại lệ chính tả phổ biến trong tiếng Anh', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design Specifications
- **React Component**: \`vietphonics-app/src/views/MasteryLabView.jsx\` (Tab: Shadowing & Chính Tả)`
  },
  {
    id: 'PRON-210',
    epic_id: 'epic-articulation',
    title: 'Video-Synchronized Masterclass & Exaggerated Articulation Shadowing: Luyện Shadowing Khẩu Hình Chuẩn',
    persona: 'Người học muốn luyện nói theo phương pháp Shadowing (nhại giọng đồng bộ) với tốc độ điều chỉnh linh hoạt',
    action: 'chọn tốc độ phát âm (0.5x, 0.75x, 1.0x) và đọc đuổi theo giọng mẫu bản ngữ kèm mẹo khẩu hình cường điệu',
    value: 'hình thành phản xạ cơ bắp nhanh chóng nhờ kỹ thuật phóng đại khẩu hình (thè lưỡi 2mm giữa hai răng cho âm /θ/), sau đó tăng dần tốc độ lên mức tự nhiên',
    priority: 'must',
    status: 'in-progress',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pron-210-speed',
        given: 'Bài luyện Shadowing cho câu "The healthy author thought thirty thoughts throughout Thursday."',
        when: 'Học viên chọn tốc độ 0.5x, 0.75x hoặc 1.0x',
        then: 'Nút tốc độ tương ứng sáng màu xanh Sky, khi bấm "Bắt Đầu Shadowing", giọng mẫu phát chuẩn xác theo tốc độ đã chọn với cao độ giọng nói tự nhiên.',
        completed: true
      },
      {
        id: 'ac-pron-210-ui',
        given: 'Giao diện bài tập Shadowing',
        when: 'Render trên màn hình',
        then: 'Đoạn văn hiển thị trong khung gradient Sky-to-Indigo hiện đại, câu chữ to bản 20px, thẻ mẹo khẩu hình màu vàng Amber nổi bật có icon tips_and_updates sinh động.',
        completed: true
      },
      {
        id: 'ac-pron-210-scale-5000',
        given: '5,000 học viên cùng lúc luyện Shadowing với các tốc độ khác nhau',
        when: 'Hệ thống điều chỉnh tốc độ audio',
        then: 'Sử dụng thuộc tính utterance.rate của Web Speech API ngay trên client, không cần xử lý FFmpeg đắt đỏ trên máy chủ backend.',
        completed: true
      },
      {
        id: 'ac-pron-210-l1',
        given: 'Học viên có xu hướng rụt lưỡi lại khi tăng tốc độ đọc',
        when: 'Xem mẹo huấn luyện cường điệu (Exaggerated Articulation)',
        then: 'Lời khuyên chuyên sâu: "PRON-210: Ở tốc độ 0.5x, hãy cố tình thè đầu lưỡi ra ngoài 2mm giữa hai hàm răng trước khi bật luồng hơi xát để não bộ ghi nhớ vị trí cơ bắp".',
        completed: true
      },
      {
        id: 'ac-pron-210-a11y',
        given: 'Người dùng thao tác bàn phím',
        when: 'Nhấn phím Space',
        then: 'Tự động kích hoạt phát bài đọc Shadowing theo tốc độ hiện hành.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pron-210-ui', title: 'Xây dựng giao diện Shadowing Masterclass với bộ chọn tốc độ 0.5x/0.75x/1.0x trong MasteryLabView', category: 'Frontend', completed: true },
      { id: 't-pron-210-rate', title: 'Tích hợp hàm playWord với tham số rate tùy chỉnh trong Web Speech API', category: 'Audio/DSP', completed: true },
      { id: 't-pron-210-scale', title: 'Kiểm thử không có hiện tượng giật tiếng khi chuyển đổi tốc độ liên tục', category: 'Performance', completed: true },
      { id: 't-pron-210-qa', title: 'Đánh giá độ rõ ràng của giọng đọc ở tốc độ cực chậm 0.5x', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design Specifications
- **React Component**: \`vietphonics-app/src/views/MasteryLabView.jsx\` (Tab: Shadowing & Chính Tả)`
  },
  {
    id: 'PRON-211',
    epic_id: 'epic-articulation',
    title: 'Dense Target Sound Saturation Sentences: Luyện Câu Bão Hòa Âm Mục Tiêu & Đánh Giá Giảm Giọng Lơ Lớ',
    persona: 'Người học muốn tôi luyện cơ hàm ở cường độ cao để hoàn toàn triệt tiêu giọng lơ lớ (Accent Reduction)',
    action: 'luyện đọc các câu có mật độ bão hòa âm mục tiêu cực dày (Hyper-density sentences, ví dụ 8 lần âm /θ/ liên tiếp)',
    value: 'huấn luyện sức bền cơ miệng và sự ổn định của khẩu hình (Consistency Score) trong suốt một hơi thở',
    priority: 'must',
    status: 'in-progress',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pron-211-saturation',
        given: 'Câu bão hòa âm /θ/: "Thirty-three thousand healthy thinkers thought throughout Thursday."',
        when: 'Học viên đọc câu hoàn chỉnh',
        then: 'Hệ thống đánh giá độ mở hàm và trường độ của từng lần xuất hiện âm /θ/, tính toán Consistency Score, cảnh báo nếu khẩu hình bị hẹp lại ở các từ cuối câu.',
        completed: true
      },
      {
        id: 'ac-pron-211-ui',
        given: 'Tab "Câu Bão Hòa Âm (PRON-211)" trong MasteryLabView',
        when: 'Render trên màn hình',
        then: 'Hiển thị các câu bão hòa với nhãn tiêu điểm màu Indigo nổi bật, khung phiên âm IPA sắc nét, nút nghe mẫu toàn câu và nút 1-click "Vào Phòng Thu Luyện Câu Này" chuyển sang phòng thu tức thì.',
        completed: true
      },
      {
        id: 'ac-pron-211-scale-5000',
        given: '5,000 học viên cùng lúc luyện câu bão hòa âm',
        when: 'Bấm chuyển sang phòng thu PracticeStudioView',
        then: 'Hàm triggerPractice kích hoạt thông qua AppContext, chuyển tab và nạp bài tập trong 0ms không tải lại trang.',
        completed: true
      },
      {
        id: 'ac-pron-211-l1',
        given: 'Học viên đọc chuẩn 3 từ đầu nhưng đến từ thứ 4 ("thinkers") bị mỏi cơ hàm và nuốt âm',
        when: 'Báo cáo hiển thị',
        then: 'Phân tích thể lực cơ miệng: "Cơ hàm bị mỏi ở giây thứ 2.5! Hãy lấy hơi sâu bằng cơ hoành trước khi bắt đầu câu bão hòa dài".',
        completed: true
      },
      {
        id: 'ac-pron-211-a11y',
        given: 'Người dùng hỗ trợ âm thanh',
        when: 'Bấm nghe câu mẫu',
        then: 'Phát âm thanh mẫu giọng Oxford US chuẩn xác từng âm kẹp lưỡi.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pron-211-ui', title: 'Xây dựng giao diện Saturation Sentences trong MasteryLabView với liên kết chuyển tab phòng thu', category: 'Frontend', completed: true },
      { id: 't-pron-211-data', title: 'Biên soạn 10 câu bão hòa mật độ cao cho các âm /θ/, /s/, /ks/, /tʃ/, /dʒ/', category: 'Phonetics', completed: true },
      { id: 't-pron-211-scale', title: 'Tối ưu hóa chuyển tab qua AppContext không re-render toàn bộ DOM', category: 'Performance', completed: true },
      { id: 't-pron-211-qa', title: 'Kiểm tra tính liên kết dữ liệu giữa MasteryLabView và PracticeStudioView', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design Specifications
- **React Component**: \`vietphonics-app/src/views/MasteryLabView.jsx\` (Tab: Câu Bão Hòa Âm)`
  },
  {
    id: 'VN-105',
    epic_id: 'epic-articulation',
    title: 'Vietnamese Native-Tongue Mouth & Tongue Placement Coach: Huấn Luyện Khẩu Hình Empathy Cho Người Việt',
    persona: 'Người Việt Nam gặp khó khăn với các cử động cơ miệng không tồn tại trong tiếng mẹ đẻ',
    action: 'xem các thẻ hướng dẫn mẹo đặt lưỡi mang tính đồng cảm cao (Empathy Placement Cards) so sánh trực tiếp với tiếng Việt',
    value: 'hiểu mẹo cấu âm qua các hình ảnh ẩn dụ gần gũi (như "cắn nhẹ đầu đũa", "giữ cuống lưỡi như khi ngậm nước muối"), giúp vượt qua rào cản cơ bắp tự nhiên',
    priority: 'must',
    status: 'in-progress',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-vn-105-cards',
        given: 'Màn hình MouthAnatomyView',
        when: 'Học viên xem phần mẹo đặt lưỡi L1',
        then: 'Hiển thị 3 thẻ mẹo cấu âm đồng cảm: 1) Cố định cuống lưỡi không kéo thụt về họng, 2) Thả lỏng khóe môi tránh cười bẹt mép quá đà, 3) Kiểm soát luồng hơi qua kẽ răng không tạo âm rít chói tai.',
        completed: true
      },
      {
        id: 'ac-vn-105-ui',
        given: 'Giao diện hiển thị',
        when: 'Render trên màn hình',
        then: 'Các thẻ được thiết kế với viền bo góc rounded-xl, icon minh họa sinh động, văn bản tiếng Việt tự nhiên, ấm áp, tạo cảm giác được thấu hiểu thay vì phán xét.',
        completed: true
      },
      {
        id: 'ac-vn-105-scale-5000',
        given: '5,000 học viên cùng xem hướng dẫn khẩu hình',
        when: 'Tải trang',
        then: 'Nội dung tĩnh được cache 100% tại CDN Edge, thời gian tải trang dưới 30ms trên mạng di động.',
        completed: true
      },
      {
        id: 'ac-vn-105-l1',
        given: 'Học viên thắc mắc tại sao người Việt hay nuốt âm /θ/',
        when: 'Đọc giải thích giải phẫu',
        then: 'Chỉ rõ: "Tiếng Việt không có âm kẹp răng. Cơ lưỡi của bạn đã quen nằm gọn trong miệng suốt 20 năm, nên việc đưa lưỡi ra ngoài cần vài ngày tập luyện để cơ quen vị trí mới".',
        completed: true
      },
      {
        id: 'ac-vn-105-a11y',
        given: 'Người dùng hỗ trợ công nghệ đọc màn hình',
        when: 'Đọc qua 3 thẻ',
        then: 'Nội dung được cấu trúc với các thẻ tiêu đề ngữ nghĩa h3, h4 rõ ràng, hỗ trợ phím Tab điều hướng tuần tự.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-vn-105-ui', title: 'Thiết kế 3 thẻ Empathy Placement Cards trong MouthAnatomyView', category: 'Frontend', completed: true },
      { id: 't-vn-105-copy', title: 'Biên soạn nội dung giải thích mẹo cấu âm tâm lý và sinh học cho người Việt', category: 'Content', completed: true },
      { id: 't-vn-105-scale', title: 'Đảm bảo thời gian nạp trang tức thời không có layout shift', category: 'Performance', completed: true },
      { id: 't-vn-105-qa', title: 'Khảo sát độ dễ hiểu của hướng dẫn trên nhóm 20 học viên thực tế', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design Specifications
- **Màn hình tham chiếu**: \`src/ui-reference/kh_u_h_nh_2d_gi_i_ph_u_c_mi_ng_light_mode/code.html\`
- **React Component**: \`vietphonics-app/src/views/MouthAnatomyView.jsx\``
  }
];
