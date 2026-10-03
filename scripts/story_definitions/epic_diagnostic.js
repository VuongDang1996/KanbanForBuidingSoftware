export const diagnosticStories = [
  {
    id: 'ELSA-102',
    epic_id: 'epic-diagnostic',
    title: 'Native Language (L1) Regional Dialect Calibration: Hiệu Chuẩn Bù Trừ Thổ Âm 3 Miền Bắc - Trung - Nam',
    persona: 'Người học tiếng Anh bản xứ Việt Nam thuộc các vùng thổ âm khác nhau (Bắc, Trung, Nam)',
    action: 'chọn vùng thổ âm gốc trong cài đặt hồ sơ (Hà Nội, Miền Trung/Huế-Đà Nẵng, Miền Nam/Sài Gòn) trước khi bắt đầu luyện phát âm',
    value: 'hệ thống AI tự động điều chỉnh ma trận trọng số âm học (acoustic prior offsets), không phạt oan các biến thể phương ngữ tự nhiên mà tập trung can thiệp chính xác vào lỗi cản trở giao tiếp',
    priority: 'must',
    status: 'in-progress',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-elsa-102-func',
        given: 'Học viên truy cập phần cài đặt hồ sơ hoặc thanh điều hướng Navbar',
        when: 'Học viên chuyển đổi vùng thổ âm L1 giữa: Miền Bắc (/d/ ➔ /z/, /t/ ending), Miền Trung (/e/-/ɛ/ tonal pitch), Miền Nam (/v/ ➔ /j/, dropped -k/-t)',
        then: 'Hệ thống cập nhật tức thì dialect context toàn cục, hiển thị huy hiệu xác nhận, và thay đổi ngưỡng phạt decoding mà không cần tải lại trang.',
        completed: true
      },
      {
        id: 'ac-elsa-102-ui',
        given: 'Giao diện hiển thị trên mọi độ phân giải màn hình từ Mobile (360px) đến 4K (2560px)',
        when: 'Học viên mở menu chọn Dialect Adaptation',
        then: 'Giao diện áp dụng chuẩn Google Stitch tokens: font Plus Jakarta Sans tiêu đề, JetBrains Mono cho thông số acoustic prior, màu Sky #0284c7 làm điểm nhấn, dropdown có animation mượt mà, bóng đổ shadow-[0_12px_32px_rgba(15,23,42,0.12)], không bị vỡ layout hay tràn ngang (zero CLS).',
        completed: true
      },
      {
        id: 'ac-elsa-102-scale-5000',
        given: 'Hệ thống đang phục vụ đồng thời 5,000 học viên trực tuyến (concurrent users)',
        when: '5,000 phiên học gửi yêu cầu hiệu chuẩn âm học và tải cấu hình dialect song song',
        then: 'Cấu hình dialect ma trận L1 được cache trên Redis Cluster với TTL 86400s và lưu cục bộ tại LocalStorage/AppContext của client; độ trễ P99 phản hồi < 15ms, không gây tải thừa lên cơ sở dữ liệu PostgreSQL/SQLite.',
        completed: true
      },
      {
        id: 'ac-elsa-102-l1',
        given: 'Học viên miền Bắc phát âm từ "zoo" (/zuː/) hoặc "day" (/deɪ/)',
        when: 'Mô hình ASR phân tích luồng âm thanh 16kHz',
        then: 'Hệ thống áp dụng trọng số bù trừ: phát hiện khuynh hướng trượt âm /d/ sang /z/ của giọng Bắc, đưa ra chỉ dẫn đặt đầu lưỡi sau nướu răng trên để bật âm tắc /d/ thay vì rung xát /z/.',
        completed: true
      },
      {
        id: 'ac-elsa-102-a11y',
        given: 'Học viên sử dụng bàn phím hoặc công nghệ trợ năng màn hình (Screen Reader)',
        when: 'Điều hướng qua danh sách chọn vùng miền',
        then: 'Các phần tử có đầy đủ role="menuitem", aria-selected, hỗ trợ phím mũi tên lên/xuống và phím Escape để đóng menu; tỷ lệ tương phản văn bản đạt chuẩn WCAG 2.1 AA (> 4.5:1).',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-elsa-102-fe', title: 'Tạo component DialectDropdown trong Navbar với animation Tailwind và lưu trữ AppContext', category: 'Frontend', completed: true },
      { id: 't-elsa-102-dsp', title: 'Xây dựng bảng ma trận trọng số âm học L1PriorMatrix cho 3 miền Bắc - Trung - Nam', category: 'Audio/DSP', completed: true },
      { id: 't-elsa-102-be', title: 'Thiết kế endpoint REST /api/user/dialect với validation schema Zod và cập nhật user_profiles', category: 'Backend', completed: true },
      { id: 't-elsa-102-scale', title: 'Tối ưu hóa Redis caching dialect_weights:v1 và benchmark tải 5,000 req/s với k6', category: 'DevOps', completed: true },
      { id: 't-elsa-102-qa', title: 'Viết unit tests kiểm thử logic chuyển đổi vùng miền và e2e test với Playwright', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design Specifications (Google Stitch Reference)
- **Màn hình tham chiếu**: \`src/ui-reference/b_ng_ch_n_o_n_m_l1_ti_ng_vi_t_light_mode/code.html\`
- **React Component**: \`vietphonics-app/src/components/Navbar.jsx\` & \`src/context/AppContext.jsx\`
- **Design Tokens**: \`space-xs (0.25rem), space-sm (0.5rem), space-md (1rem), rounded-full, rounded-xl\`
- **Bảng màu chủ đạo**: Sky Primary \`#0284c7\`, Emerald Active \`#10b981\`, Slate Text \`#1e293b\`, Background \`#f8fafc\`
- **Typography**: Display \`Plus Jakarta Sans\`, Metric & Phonetics \`JetBrains Mono\`, IPA Symbols \`Noto Sans\`

### ⚡ Kiến Trúc Tải Cao 5,000 Users Đồng Thời
- **Client-Side Offloading**: Client tự động mang cấu hình ma trận dialect trong AppContext, loại bỏ hoàn toàn việc gọi API lặp lại trong mỗi câu nói.
- **Cache Strategy**: Redis Hash key \`dialect:profile:{dialect_id}\` lưu giữ vector trọng số âm học, thời gian truy xuất dưới 1.2ms.
- **Database Indexing**: B-tree index trên \`user_profiles(dialect_code)\` để truy vấn phân nhóm học viên theo vùng miền.

### 🔬 Quy Tắc Âm Học L1 & Bù Trừ Thổ Âm
- **Miền Bắc**: Khử thói quen đồng hóa /d/ thành /z/, rụng phụ âm tắc cuối vô thanh /t/.
- **Miền Trung**: Khử cao độ gắt (sharp tonal rise) trên nguyên âm ngắn, hạ F0 về dải ổn định 100-180Hz.
- **Miền Nam**: Bù trừ hiện tượng thay /v/ bằng bán nguyên âm /j/ ("vui vẻ" ➔ "dui dẻ") và rụng hoàn toàn âm đuôi -k/-t.`
  },
  {
    id: 'ELSA-103',
    epic_id: 'epic-diagnostic',
    title: 'Predicted IELTS & CEFR Speaking Band Estimator: Bảng Quy Đổi Trình Độ Quốc Tế Thời Gian Thực',
    persona: 'Thí sinh luyện thi IELTS và người đi làm cần chứng minh năng lực tiếng Anh chuẩn quốc tế',
    action: 'hoàn thành bài kiểm tra chẩn đoán hoặc các bài luyện tập hàng ngày',
    value: 'nhận bảng điểm ước tính chính xác theo thang CEFR (A1 đến C2) và IELTS Speaking Band (4.0 đến 8.5) kèm phân tích điểm mạnh yếu để xây dựng lộ trình ôn luyện rõ ràng',
    priority: 'must',
    status: 'in-progress',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-elsa-103-func',
        given: 'Học viên hoàn thành bài kiểm tra phát âm với điểm số GOP tổng thể (ví dụ: 76%)',
        when: 'Hệ thống tính toán thuật toán quy đổi chuẩn âm học',
        then: 'Hiển thị chính xác tương đương: IELTS Speaking Band 7.0, CEFR B2+, TOEIC Speaking 160 kèm biểu đồ so sánh với mức trung bình người học Việt Nam.',
        completed: true
      },
      {
        id: 'ac-elsa-103-ui',
        given: 'Màn hình hiển thị bảng quy đổi trong modal hoặc dashboard',
        when: 'Người dùng xem kết quả',
        then: 'Hiển thị 3 thẻ điểm bento grid với gradient màu sắc sang trọng: IELTS Sky #0284c7, CEFR Rose #e11d48, TOEIC Indigo #6366f1; số điểm in đậm font size 32px font-sans black, nhãn mô tả rõ ràng, không có hiện tượng giật layout.',
        completed: true
      },
      {
        id: 'ac-elsa-103-scale-5000',
        given: '5,000 học viên đồng thời hoàn tất bài tập và yêu cầu tính toán quy đổi trình độ',
        when: 'Hệ thống xử lý bảng điểm',
        then: 'Thuật toán tính điểm quy đổi được thực thi thuần túy trên client JavaScript (O(1) logic mapping) dựa trên ma trận CEFR chuẩn lưu trong bộ nhớ; không phát sinh lời gọi tính toán đắt đỏ về GPU backend.',
        completed: true
      },
      {
        id: 'ac-elsa-103-l1',
        given: 'Học viên đạt Band 6.0 do lỗi phát âm phụ âm xát kẹp lưỡi /θ/-/ð/',
        when: 'Hệ thống phân tích điểm trừ',
        then: 'Hiển thị giải thích chuyên sâu chuẩn IELTS Pronunciation Descriptors: "Một số lỗi âm vị cá lẻ (isolated phonemic inaccuracies) làm giảm độ lưu loát; khắc phục /θ/ sẽ nâng band lên 7.0+".',
        completed: true
      },
      {
        id: 'ac-elsa-103-a11y',
        given: 'Học viên xem bảng điểm trên trình duyệt',
        when: 'Sử dụng phím Tab',
        then: 'Các thẻ điểm có thuộc tính aria-label mô tả đầy đủ: "Điểm IELTS ước tính: Band 7.0, Trình độ CEFR: B2 Cao cấp".',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-elsa-103-fe', title: 'Thiết kế 3 thẻ Bento Grid hiển thị IELTS/CEFR/TOEIC trong DiagnosticModal và DashboardView', category: 'Frontend', completed: true },
      { id: 't-elsa-103-algo', title: 'Xây dựng module hàm computeStandardBands(gopScore) chuẩn hóa theo IELTS Descriptors', category: 'Algorithm', completed: true },
      { id: 't-elsa-103-be', title: 'Tạo bảng điểm lịch sử user_score_snapshots trong SQLite/PostgreSQL có đánh index created_at', category: 'Backend', completed: true },
      { id: 't-elsa-103-scale', title: 'Tối ưu hóa phản hồi tức thời dưới 5ms trên client, benchmark không nghẽn CPU', category: 'Performance', completed: true },
      { id: 't-elsa-103-qa', title: 'Kiểm thử ma trận biên từ 0% GOP (Band 3.0) đến 100% GOP (Band 9.0)', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design Specifications
- **Màn hình tham chiếu**: \`src/ui-reference/b_ng_ch_n_o_n_m_l1_ti_ng_vi_t_light_mode/code.html\`
- **React Component**: \`vietphonics-app/src/components/DiagnosticModal.jsx\` & \`src/views/ProgressAnalyticsView.jsx\`
- **Bento Grid Layout**: 3 cột cân đối trên màn hình lớn, tự động co giãn 1 cột trên điện thoại di động.

### ⚡ Khả Năng Chịu Tải 5,000 Users Đồng Thời
- **Zero Backend Compute**: Việc tính toán quy đổi điểm hoàn toàn diễn ra phía Frontend Client thông qua bảng tra cứu tĩnh chuẩn hóa (Static Normalized Matrix Lookup).
- **Snapshot Storage**: Dữ liệu lịch sử chỉ được ghi nhận một lần duy nhất khi kết thúc phiên thi để giảm tải I/O ghi cơ sở dữ liệu.`
  },
  {
    id: 'USER-102',
    epic_id: 'epic-diagnostic',
    title: 'Granular Phoneme Mastery Ledger: Bản Đồ Ma Trận 44 Âm IPA & Lịch Sử Làm Chủ Âm Vị Chi Tiết',
    persona: 'Người học muốn theo dõi tiến độ chính xác của từng âm vị để biết mình yếu âm nào và tiến bộ ra sao',
    action: 'truy cập tab "Tiến Độ & Phân Tích" và nhấp vào ma trận 44 âm quốc tế IPA',
    value: 'nhìn thấy trực quan toàn bộ 44 âm vị được mã hóa màu theo 3 cấp độ (Làm chủ, Đang luyện, Yếu cần khắc phục), bấm vào để nghe khẩu hình và luyện tập tức thời',
    priority: 'must',
    status: 'in-progress',
    size: 'XL',
    points: 13,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-user-102-func',
        given: 'Học viên mở bảng thống kê tiến độ âm vị Phoneme Mastery Grid',
        when: 'Màn hình tải hoàn tất',
        then: 'Hiển thị đầy đủ ma trận 44 âm IPA chia thành 3 phân nhóm: 12 Nguyên âm đơn, 8 Nguyên âm đôi, 24 Phụ âm; mỗi âm hiển thị ký hiệu IPA chuẩn, điểm % GOP trung bình, và màu nền tương ứng (>80% Xanh, 60-80% Vàng, <60% Đỏ).',
        completed: true
      },
      {
        id: 'ac-user-102-interactive',
        given: 'Học viên nhấp vào một âm bất kỳ (ví dụ âm /θ/)',
        when: 'Thao tác click kích hoạt',
        then: 'Hệ thống tự động phát âm thanh mẫu bản ngữ, thanh Dynamic Phoneme Preview Bar cập nhật thông tin tên âm, điểm số, thói quen lỗi phổ biến của người Việt và nút 1-click "Xem Khẩu Hình & Luyện Ngay" chuyển tab tức thì.',
        completed: true
      },
      {
        id: 'ac-user-102-ui',
        given: 'Hiển thị trên giao diện người dùng Desktop & Mobile',
        when: 'Render 44 nút âm vị',
        then: 'Font chữ bắt buộc sử dụng Noto Sans IPA cho ký hiệu ngữ âm để tránh lỗi vỡ font glyph, các nút bo tròn rounded-lg, hover scale nhẹ nhàng transition-transform, viền đỏ nổi bật cho các âm dưới 60% cần ưu tiên sửa gấp.',
        completed: true
      },
      {
        id: 'ac-user-102-scale-5000',
        given: '5,000 học viên đồng thời tải ma trận 44 âm IPA',
        when: 'Tải trang Tiến Độ & Phân Tích',
        then: 'Dữ liệu tiến độ 44 âm được lưu trong một mảng JSON nén gọn 1.2KB trên Redis cache \`user:mastery:{user_id}\` (TTL 1 giờ); câu lệnh truy vấn cơ sở dữ liệu sử dụng Single Row SELECT với B-tree primary index, thời gian nạp trang dưới 80ms.',
        completed: true
      },
      {
        id: 'ac-user-102-a11y',
        given: 'Người dùng sử dụng bàn phím để duyệt ma trận âm',
        when: 'Nhấn Tab và Enter',
        then: 'Mỗi nút âm vị có thuộc tính aria-label chi tiết: "Âm vị theta /θ/, điểm thành thạo 54%, trạng thái: Yếu cần khắc phục", bấm Enter để nghe phát âm mẫu.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-user-102-matrix', title: 'Xây dựng 44 nút bấm âm vị phân loại 12 Monophthongs, 8 Diphthongs, 24 Consonants trong ProgressAnalyticsView', category: 'Frontend', completed: true },
      { id: 't-user-102-font', title: 'Tích hợp font Noto Sans IPA và cấu hình Tailwind font-ipa-display đảm bảo hiển thị chuẩn xác', category: 'Design', completed: true },
      { id: 't-user-102-db', title: 'Tạo bảng phoneme_mastery_ledger với compound index (user_id, phoneme_symbol)', category: 'Database', completed: true },
      { id: 't-user-102-cache', title: 'Thiết lập Redis hash caching cho 5,000 active sessions, giảm thiểu I/O đọc ổ đĩa', category: 'DevOps', completed: true },
      { id: 't-user-102-qa', title: 'Kiểm tra 100% hiển thị 44 ký tự IPA không bị lỗi ô vuông tofu font trên Windows/macOS/iOS/Android', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design Specifications
- **Màn hình tham chiếu**: \`src/ui-reference/ti_n_ph_n_t_ch_d_li_u_h_c_m_light_mode/code.html\`
- **React Component**: \`vietphonics-app/src/views/ProgressAnalyticsView.jsx\`
- **Color Coding**: 
  - Mastered (>80%): \`bg-emerald-50 text-emerald-800 border-emerald-200\`
  - Improving (60-80%): \`bg-amber-50 text-amber-800 border-amber-200\`
  - Critical (<60%): \`bg-rose-50 text-rose-800 ring-2 ring-rose-400 font-black\`

### ⚡ Kiến Trúc Chịu Tải 5,000 Users Đồng Thời
- **B-tree Indexing**: \`CREATE INDEX idx_mastery_user ON phoneme_mastery_ledger(user_id, updated_at DESC);\`
- **Lightweight Payload**: Payload trả về từ máy chủ chỉ là mảng phẳng 44 phần tử \`[{sym: 'θ', score: 54}, ...]\`, kích thước chỉ 1.2KB giúp truyền tải siêu tốc ngay cả trên mạng 3G/4G chập chờn.`
  },
  {
    id: 'VN-102',
    epic_id: 'epic-diagnostic',
    title: 'Vietnamese L1 3-Minute Diagnostic Pronunciation Screener: Bộ 5 Câu Chẩn Đoán Toàn Diện Bẫy Thổ Âm',
    persona: 'Người học tiếng Anh bắt đầu hành trình với VietPhonics muốn biết chính xác mình đang mắc những lỗi gì',
    action: 'đọc lần lượt 5 câu chẩn đoán được thiết kế chuyên biệt để kích hoạt tất cả các bẫy ngữ âm tiếng Việt',
    value: 'nhận bản báo cáo phân tích âm học đồng cảm bằng tiếng Việt chỉ sau 3 phút, chỉ rõ Top 3 tật phát âm cần triệt tiêu và lộ trình 7 ngày sửa dứt điểm',
    priority: 'must',
    status: 'in-progress',
    size: 'XL',
    points: 8,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-vn-102-sentences',
        given: 'Học viên mở modal Chẩn đoán L1 (DiagnosticModal)',
        when: 'Bắt đầu bài kiểm tra 5 câu',
        then: 'Hệ thống hiển thị lần lượt 5 câu kích hoạt bẫy âm: 1) "Six months ago, she baked fresh bread...", 2) "They think that the comfortable clothes...", 3) "World health experts published guidelines...", 4) "Please take a look at the statistics...", 5) "She usually watches television...".',
        completed: true
      },
      {
        id: 'ac-vn-102-recorder',
        given: 'Học viên ghi âm từng câu',
        when: 'Nhấn nút mic hoặc phím Space',
        then: 'Hệ thống thu âm chuẩn 16kHz mono, hiển thị trạng thái sóng âm, tự động chuyển câu tiếp theo khi hoàn tất hoặc cho phép thu âm lại nếu bị ồn.',
        completed: true
      },
      {
        id: 'ac-vn-102-report',
        given: 'Học viên hoàn thành đủ 5 câu kiểm tra',
        when: 'Hệ thống chạy thuật toán tổng hợp',
        then: 'Hiển thị màn hình báo cáo hoàn chỉnh với: Điểm GOP tổng thể, Bảng quy đổi IELTS/CEFR/TOEIC, Top 3 thói quen cần khắc phục (1. Rụng âm đuôi /ks/, /st/; 2. Kẹp lưỡi cho /θ/, /ð/; 3. Nhấn trọng âm rơi nhịp thay vì đánh dấu sắc/huyền tiếng Việt), và 4 điểm số trụ cột L1.',
        completed: true
      },
      {
        id: 'ac-vn-102-scale-5000',
        given: 'Cao điểm có 5,000 học viên cùng làm bài chẩn đoán đầu vào',
        when: 'Gửi dữ liệu âm thanh phân tích',
        then: 'Quá trình trích xuất phổ âm FFT và phân tích âm học được thực thi trực tiếp trên Web Audio API của trình duyệt người dùng; backend chỉ tiếp nhận telemetry điểm số, chịu tải 5,000 users với mức sử dụng CPU máy chủ dưới 20%.',
        completed: true
      },
      {
        id: 'ac-vn-102-ui',
        given: 'Modal chẩn đoán hiển thị trên thiết bị',
        when: 'Người dùng tương tác',
        then: 'Giao diện modal sang trọng, backdrop mờ hiện đại \`backdrop-blur-sm bg-slate-900/60\`, các bước tiến trình hiển thị rõ ràng (Câu 1/5), nút đóng modal nhanh, không bị khóa cứng trình duyệt.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-vn-102-modal', title: 'Xây dựng DiagnosticModal.jsx với quy trình 5 bước thu âm và màn hình kết quả chuyên sâu', category: 'Frontend', completed: true },
      { id: 't-vn-102-sentences', title: 'Biên soạn 5 câu kiểm tra kích hoạt 100% các bẫy âm: /ks/, /nθs/, -ed /t/, /θ/, /ð/, /ʃ/, /ʒ/, linking', category: 'Phonetics', completed: true },
      { id: 't-vn-102-report-logic', title: 'Hiện thực hóa thuật toán tổng hợp điểm GOP và phân loại mức độ nghiêm trọng severity: high/medium', category: 'Algorithm', completed: true },
      { id: 't-vn-102-scale', title: 'Kiểm thử khả năng xử lý đồng thời 5,000 phiên thu âm trên client không rò rỉ bộ nhớ (memory leak)', category: 'Performance', completed: true },
      { id: 't-vn-102-qa', title: 'Kiểm tra độ chính xác của phản hồi tiếng Việt mang tính đồng cảm, tạo động lực cho học viên', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design Specifications
- **Màn hình tham chiếu**: \`src/ui-reference/b_ng_ch_n_o_n_m_l1_ti_ng_vi_t_light_mode/code.html\`
- **React Component**: \`vietphonics-app/src/components/DiagnosticModal.jsx\`
- **Design Tokens**: \`max-w-2xl, rounded-3xl, p-6 sm:p-8, shadow-2xl\`
- **Typography**: Headline \`Plus Jakarta Sans font-extrabold\`, Phoneme details \`JetBrains Mono\`

### ⚡ Khả Năng Xử Lý Đồng Thời 5,000 Users
- **In-Browser Acoustic Processing**: Toàn bộ việc thu âm và phân tích phổ âm thanh 16kHz diễn ra trong trình duyệt học viên thông qua \`useRecorder.js\`. Máy chủ trung tâm không phải xử lý hàng nghìn luồng âm thanh raw streaming cùng lúc, đảm bảo hệ thống chịu tải mượt mà cho 5,000 người dùng.`
  }
];
