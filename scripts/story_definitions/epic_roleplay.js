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
        id: 'ac-elsa-301-ui',
        given: 'Giao diện phòng hội thoại RoleplayView',
        when: 'Render trên màn hình',
        then: 'Hiển thị ảnh chân dung Alex sắc nét có vòng hào quang gradient công nghệ, hiệu ứng sóng âm spectrum 48kHz WebRTC nhảy múa khi Alex nói, khung chat hội thoại dạng bong bóng hiện đại, nút Push-To-Talk tròn lớn ở chân trang.',
        completed: true
      },
      {
        id: 'ac-elsa-301-scale-5000',
        given: '5,000 học viên cùng lúc tham gia các phiên roleplay trực tuyến',
        when: 'Duy trì kết nối âm thanh và nhận diện hội thoại',
        then: 'Sử dụng kiến trúc WebSocket connection pooling với heartbeat 15s; luồng TTS của Alex phát trực tiếp qua Web Speech API trên client hoặc CDN edge cache, máy chủ backend duy trì mức sử dụng RAM dưới 30% cho 5,000 kết nối đồng thời.',
        completed: true
      },
      {
        id: 'ac-elsa-301-l1',
        given: 'Học viên trả lời báo cáo blocker nhưng nuốt âm đuôi /t/ trong từ "blocked"',
        when: 'Alex nghe câu trả lời',
        then: 'Thẻ checklist mục tiêu bên phải cảnh báo: "Báo cáo blocker kỹ thuật rõ âm: Cần phát âm rõ âm đuôi /t/ trong từ \'blocked\'".',
        completed: true
      },
      {
        id: 'ac-elsa-301-a11y',
        given: 'Học viên muốn đọc phụ đề tiếng Việt',
        when: 'Bật toggle "Phụ đề song ngữ"',
        then: 'Hiển thị bản dịch tiếng Việt mượt mà ngay dưới câu thoại của Alex giúp học viên hiểu trọn vẹn ngữ cảnh công sở.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-elsa-301-ui', title: 'Xây dựng giao diện RoleplayView với ảnh đại diện Alex, dải spectrum WebRTC và khung chat', category: 'Frontend', completed: true },
      { id: 't-elsa-301-mic', title: 'Tích hợp Push-To-Talk toàn cục với phím Space và xử lý chuyển đổi lượt nói (turn-taking)', category: 'Audio/DSP', completed: true },
      { id: 't-elsa-301-scale', title: 'Thiết kế WebSocket gateway tối ưu hóa cho 5,000 kết nối đồng thời với Node.js cluster', category: 'Backend', completed: true },
      { id: 't-elsa-301-qa', title: 'Kiểm thử độ trễ phản hồi của AI hội thoại luôn duy trì dưới 1.2 giây', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design Specifications
- **Màn hình tham chiếu**: \`src/ui-reference/ai_h_i_tho_i_roleplay_c_ng_s_light_mode/code.html\`
- **React Component**: \`vietphonics-app/src/views/RoleplayView.jsx\`
- **Alex Portrait**: Google CDN ảnh chân dung giám đốc công nghệ phong cách Silicon Valley, viền \`ring-2 ring-white\`, chấm xanh online nhấp nháy.
- **Spectrum Indicator**: Dải 8 thanh sóng âm nhảy động mô phỏng WebRTC 48kHz latency 14ms.`
  },
  {
    id: 'ELSA-302',
    epic_id: 'epic-roleplay-ielts',
    title: 'Post-Roleplay Comprehensive Scorecard: Bảng Chỉ Số Toàn Diện Phát Âm & Ngữ Pháp',
    persona: 'Người học sau khi kết thúc phiên hội thoại muốn biết mình được bao nhiêu điểm và cần cải thiện gì',
    action: 'kết thúc phiên roleplay và xem bảng điểm tổng kết (Scorecard)',
    value: 'nhận bảng chỉ số 3 đồng hồ đo: Phát Âm (Pronunciation 84%), Ngữ Pháp (Grammar 88%), Độ Tự Nhiên (Natural Cadence 80%) cùng "3 Cách Nói Hay Hơn Cho Kỹ Sư Việt"',
    priority: 'must',
    status: 'in-progress',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-elsa-302-gauges',
        given: 'Phiên hội thoại kết thúc',
        when: 'Bảng chỉ số Standup hiển thị ở cột bên phải',
        then: 'Hiển thị 3 đồng hồ đo hình tròn SVG sắc nét: Phát Âm (84%), Ngữ Pháp (88%), Độ Tự Nhiên (80%), kèm nhãn "Real-time Telemetry".',
        completed: true
      },
      {
        id: 'ac-elsa-302-better-ways',
        given: 'Câu trả lời của học viên còn mang tính dịch từ tiếng Việt sang (Viet-glish)',
        when: 'Hệ thống gợi ý cải thiện',
        then: 'Đưa ra 3 câu diễn đạt tự nhiên hơn chuẩn Silicon Valley: 1) "I\'m currently blocked by the payment gateway API timeout", 2) "We\'re refactoring the database indexing pipeline", 3) "I\'ll sync with the QA team right after standup".',
        completed: true
      },
      {
        id: 'ac-elsa-302-ui',
        given: 'Giao diện Scorecard trong RoleplayView',
        when: 'Render trên màn hình',
        then: 'Bảng điểm đóng khung trắng bo góc rounded-xl, viền slate-200 nhẹ nhàng, các đồng hồ tròn vẽ bằng SVG xoay -90 độ với strokeDasharray mượt mà, văn bản rõ ràng dễ đọc.',
        completed: true
      },
      {
        id: 'ac-elsa-302-scale-5000',
        given: '5,000 học viên cùng nhận bảng điểm sau phiên họp',
        when: 'Tạo báo cáo',
        then: 'Dữ liệu chỉ số được tính toán ngay trong phiên của client, chỉ đồng bộ 1 bản ghi tổng kết 200 byte về bảng user_roleplay_sessions; cơ sở dữ liệu xử lý nhẹ nhàng 5,000 phiên/phút.',
        completed: true
      },
      {
        id: 'ac-elsa-302-a11y',
        given: 'Học viên muốn nghe phát âm 3 cách nói hay hơn',
        when: 'Bấm vào biểu tượng loa cạnh từng câu gợi ý',
        then: 'Phát âm thanh mẫu chuẩn của câu gợi ý giúp học viên học thuộc lòng cấu trúc.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-elsa-302-ui', title: 'Thiết kế 3 đồng hồ đo hình tròn SVG và danh sách 3 gợi ý nói hay hơn trong RoleplayView', category: 'Frontend', completed: true },
      { id: 't-elsa-302-scoring', title: 'Xây dựng module đánh giá điểm số ngữ pháp và độ tự nhiên dựa trên từ vựng công nghệ', category: 'Algorithm', completed: true },
      { id: 't-elsa-302-scale', title: 'Thiết kế payload lưu trữ kết quả roleplay siêu nhẹ 200 byte', category: 'Database', completed: true },
      { id: 't-elsa-302-qa', title: 'Kiểm thử hiển thị bảng điểm trên các kích thước màn hình máy tính bảng và laptop', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design Specifications
- **Màn hình tham chiếu**: \`src/ui-reference/ai_h_i_tho_i_roleplay_c_ng_s_light_mode/code.html\`
- **React Component**: \`vietphonics-app/src/views/RoleplayView.jsx\` (Bảng Chỉ Số Standup)`
  },
  {
    id: 'VN-104',
    epic_id: 'epic-roleplay-ielts',
    title: 'IELTS Speaking Part 1 & 2 AI Mock Examiner for Vietnamese Candidates: Giám Khảo Mô Phỏng IELTS Chuyên Sâu',
    persona: 'Thí sinh luyện thi IELTS tại Việt Nam cần cọ xát với giám khảo bản ngữ bấm giờ chuẩn phòng thi thật',
    action: 'chọn chế độ IELTS Mock Examiner và trả lời các chủ đề Part 1 (phỏng vấn ngắn) hoặc Part 2 (thuyết trình 2 phút cue card)',
    value: 'nhận điểm số chi tiết theo 4 tiêu chí chấm thi của IDP/BC (Pronunciation, Fluency & Coherence, Lexical Resource, Grammatical Range) và lời khuyên cụ thể để bứt phá từ Band 6.0 lên Band 7.0+',
    priority: 'must',
    status: 'in-progress',
    size: 'XL',
    points: 13,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-vn-104-exam',
        given: 'Chủ đề thi IELTS Speaking Part 2 Cue Card',
        when: 'Học viên nói liên tục trong 1 đến 2 phút',
        then: 'Hệ thống đo đạc thời gian, tính toán điểm tiêu chí Phát Âm (Pronunciation Band), phân tích độ mượt mà khi nối từ (Chunking & Linking), và bắt các lỗi phát âm làm giảm tính dễ hiểu (Intelligibility).',
        completed: true
      },
      {
        id: 'ac-vn-104-advice',
        given: 'Báo cáo thi thử hoàn tất',
        when: 'Màn hình phân tích hiển thị',
        then: 'Cung cấp lộ trình bứt phá chi tiết: "Để nâng từ Band 6.0 lên Band 7.0+: Cần duy trì ngữ điệu linh hoạt ở cuối câu phức, khắc phục hiện tượng nuốt âm đuôi phụ âm tắc và nhấn đúng trọng âm của các từ học thuật".',
        completed: true
      },
      {
        id: 'ac-vn-104-ui',
        given: 'Giao diện thi thử IELTS',
        when: 'Render trên màn hình',
        then: 'Hiển thị đồng hồ bấm giờ đếm ngược 02:00, thẻ Cue Card đóng khung chuẩn kỳ thi quốc tế, giao diện trang nhã chuẩn học thuật.',
        completed: true
      },
      {
        id: 'ac-vn-104-scale-5000',
        given: '5,000 thí sinh cùng lúc thi thử IELTS trong đợt ôn thi cao điểm',
        when: 'Hệ thống ghi nhận bài thi nói',
        then: 'File ghi âm được nén thành Opus 16kbps siêu nhẹ hoặc xử lý trực tiếp trên client, hàng đợi phân tích ielts_evaluation_queue điều phối nhịp nhàng không gây nghẽn cổ chai.',
        completed: true
      },
      {
        id: 'ac-vn-104-a11y',
        given: 'Thí sinh cần nghe lại giọng nói của mình',
        when: 'Bấm nút "Nghe lại bài nói"',
        then: 'Phát lại toàn bộ bản ghi âm kèm highlight dòng chữ transcript đồng bộ theo giọng nói.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-vn-104-cuecard', title: 'Xây dựng ngân hàng 50 chủ đề IELTS Speaking Part 1 & 2 bám sát đề thi thật 2026', category: 'Content', completed: true },
      { id: 't-vn-104-scoring', title: 'Hiện thực hóa thuật toán chấm điểm theo 4 tiêu chí IELTS Descriptors chính thức', category: 'Algorithm', completed: true },
      { id: 't-vn-104-timer', title: 'Tích hợp đồng hồ đếm ngược 1 phút chuẩn bị và 2 phút nói chuẩn quy chế thi', category: 'Frontend', completed: true },
      { id: 't-vn-104-scale', title: 'Tối ưu hóa nén âm thanh định dạng Opus giúp tiết kiệm 80% băng thông cho 5,000 users', category: 'DevOps', completed: true },
      { id: 't-vn-104-qa', title: 'Đối chiếu kết quả chấm điểm của AI với điểm chấm của 5 giám khảo IELTS người bản xứ', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design Specifications
- **React Component**: \`vietphonics-app/src/views/RoleplayView.jsx\` (IELTS Examiner Mode)`
  }
];
