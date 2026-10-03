export const retentionStories = [
  {
    id: 'ELSA-401',
    epic_id: 'epic-retention',
    title: '10-Minute Daily Personalized Practice Path (Adaptive Curriculum): Lộ Trình Luyện Phát Âm Cá Nhân Hóa 10 Phút Mỗi Ngày',
    persona: 'Người đi làm bận rộn tại các thành phố lớn (Hà Nội, TP.HCM, Đà Nẵng) chỉ có 10-15 phút rảnh rỗi trên xe buýt hoặc nghỉ trưa',
    action: 'mở ứng dụng và bắt đầu ngay phiên luyện tập 10 phút được thuật toán AI tự động may đo riêng theo các lỗi phát âm còn yếu nhất',
    value: 'loại bỏ hoàn toàn nỗi băn khoăn "hôm nay nên học bài nào?", giúp người học duy trì thói quen học tập vi mô (micro-learning) liên tục và tiến bộ rõ rệt chỉ sau 30 ngày',
    priority: 'must',
    status: 'in-progress',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-elsa-401-path-generation',
        given: 'Học viên đăng nhập vào đầu ngày mới',
        when: 'Hệ thống khởi tạo lộ trình 10 phút Daily Practice',
        then: 'Hệ thống sinh ra phiên học gồm chính xác 5 bài tập nhỏ (1 âm khởi động -> 2 âm còn yếu dưới 70% điểm số -> 1 cặp từ tối thiểu -> 1 câu ứng dụng thực tế), tổng thời lượng ước tính đúng 10 phút.',
        completed: true
      },
      {
        id: 'ac-elsa-401-ui',
        given: 'Giao diện màn hình chính Lộ trình hàng ngày DailyPathView',
        when: 'Render trên thiết bị di động hoặc máy tính để bàn',
        then: 'Hiển thị thẻ bài lộ trình lớn viền gradient Rose-Sky nổi bật, đồng hồ đếm ngược tiến độ (0/5 bài đã xong), thanh tiến trình hình viên thuốc (pill progress bar) đổi màu từ xám sang xanh ngọc lục bảo khi hoàn thành từng bước, không bị giật layout (zero CLS).',
        completed: true
      },
      {
        id: 'ac-elsa-401-scale-5000',
        given: '5,000 học viên mở ứng dụng đồng thời vào khung giờ cao điểm (7h-8h sáng & 20h-21h tối)',
        when: 'Hệ thống tải dữ liệu lộ trình cá nhân hóa',
        then: 'Lộ trình được tính toán sẵn bởi background worker lúc 04:00 sáng và lưu vào Redis key \`user:daily_path:{user_id}\` với TTL 24h, thời gian phản hồi API P95 < 45ms, chịu tải 5,000 req/s mà không tác động tới cơ sở dữ liệu chính.',
        completed: true
      },
      {
        id: 'ac-elsa-401-l1',
        given: 'Học viên gốc miền Bắc hay nhầm lẫn /l/ vs /n/ hoặc miền Nam hay nuốt âm đuôi /t/',
        when: 'Thuật toán thích ứng phân tích lịch sử lỗi',
        then: 'Lộ trình tự động ưu tiên bài tập chẩn đoán điều chỉnh khẩu hình chuyên biệt theo vùng miền của học viên, minh họa trực quan sự khác biệt vị trí đặt lưỡi.',
        completed: true
      },
      {
        id: 'ac-elsa-401-a11y',
        given: 'Học viên đang di chuyển trên xe buýt rung lắc',
        when: 'Thao tác bằng một tay',
        then: 'Nút "Bắt đầu bài tập kế tiếp" được đặt ở góc dưới màn hình trong vùng ngón tay cái (thumb zone) với chiều cao tối thiểu 52px, độ tương phản màu văn bản đạt 4.8:1 trên nền sáng.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-elsa-401-ui', title: 'Xây dựng component DailyPathCard với thanh tiến trình viên thuốc 5 chặng và nút bấm lớn chuẩn mobile-first', category: 'Frontend', completed: true },
      { id: 't-elsa-401-algo', title: 'Phát triển thuật toán AdaptiveCurriculumEngine tính điểm trọng số lỗi (Weak Phoneme Weight Matrix)', category: 'Backend', completed: true },
      { id: 't-elsa-401-cron', title: 'Thiết lập BullMQ cron worker chạy lúc 04:00 sáng sinh trước lộ trình cho 5,000 active users đẩy vào Redis', category: 'DevOps/Scale', completed: true },
      { id: 't-elsa-401-offline', title: 'Hỗ trợ ServiceWorker cache các audio mẫu của lộ trình 10 phút để học viên luyện tập mượt mà ngay cả khi mạng chập chờn', category: 'Frontend', completed: true },
      { id: 't-elsa-401-qa', title: 'Kiểm thử hộp đen kiểm tra tính cá nhân hóa: đảm bảo 2 học viên có lỗi âm khác nhau nhận 2 lộ trình hoàn toàn khác nhau', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design System Specifications
- **Màn hình tham chiếu**: \`src/ui-reference/gamified_duolingo_style_vietnamese_accent_mastery/code.html\`
- **React Component**: \`vietphonics-app/src/components/dashboard/DailyPathCard.jsx\`
- **Design Tokens**:
  - Container: \`bg-gradient-to-r from-rose-50 to-sky-50 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-6 border border-rose-100 dark:border-slate-700 shadow-sm\`
  - Step Indicator: 5 chấm tròn hoặc viên thuốc kết nối bằng đường kẻ đứt nét \`border-dashed border-slate-300\`
- **Thuật toán sinh lộ trình**:
  - Âm Warm-up: Chọn từ danh sách âm học viên đạt điểm >85% trong quá khứ để tạo hưng phấn ban đầu
  - 2 Âm Thách thức: Lấy từ top 3 âm có điểm trung bình thấp nhất trong 14 ngày gần nhất
  - Cặp âm tối thiểu: Ghép âm yếu với âm đối xứng dễ nhầm lẫn
  - Câu ứng dụng: Chọn câu giao tiếp thực tế chứa ít nhất 2 từ mang các âm trên.`
  },
  {
    id: 'ELSA-402',
    epic_id: 'epic-retention',
    title: 'Automated Error Bank with Spaced Repetition (SM-2 Algorithm): Ngân Hàng Lỗi Tự Động & Thuật Toán Lặp Lại Ngắt Quãng SM-2',
    persona: 'Người học tiếng Anh thường xuyên quên sửa các lỗi phát âm đã từng mắc phải sau một vài ngày học',
    action: 'truy cập kho lưu trữ lỗi cá nhân (Error Bank), xem lại các từ mình từng phát âm sai kèm đoạn ghi âm cũ, và ôn tập theo chu kỳ ngắt quãng tối ưu của thuật toán SM-2',
    value: 'chuyển hóa phát âm từ trí nhớ ngắn hạn sang trí nhớ cơ bắp dài hạn (long-term muscle memory), đảm bảo tỷ lệ sửa lỗi thành công vĩnh viễn trên 80%',
    priority: 'must',
    status: 'in-progress',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-elsa-402-bank-capture',
        given: 'Học viên phát âm bất kỳ từ nào đạt điểm dưới 75% trong bất kỳ màn học hay bài kiểm tra nào',
        when: 'Hệ thống ghi nhận kết quả chấm điểm',
        then: 'Từ vựng đó kèm theo âm vị bị sai, file audio ghi âm của học viên và thời điểm mắc lỗi được tự động thêm vào Ngân Hàng Lỗi (Error Bank) mà không cần người dùng bấm lưu thủ công.',
        completed: true
      },
      {
        id: 'ac-elsa-402-ui',
        given: 'Giao diện Ngân Hàng Lỗi ErrorBankView',
        when: 'Hiển thị danh sách các từ cần ôn tập hôm nay',
        then: 'Mỗi thẻ từ hiển thị rõ phiên âm IPA chuẩn, ký tự bị lỗi tô đỏ rực rỡ kèm huy hiệu cấp độ nhớ (Hộp Leitner 1-5), nút nghe lại giọng mình cũ vs giọng người bản ngữ đặt cạnh nhau trực quan, kèm nút đánh giá mức độ nhớ (Dễ - Vừa - Khó).',
        completed: true
      },
      {
        id: 'ac-elsa-402-scale-5000',
        given: '5,000 học viên tích lũy trung bình 150 từ lỗi trong tài khoản cá nhân (tổng 750,000 bản ghi lỗi)',
        when: 'Truy vấn các từ đến hạn ôn tập hôm nay (\`due_date <= CURRENT_DATE\`)',
        then: 'Bảng cơ sở dữ liệu có chỉ mục kết hợp \`CREATE INDEX idx_user_due_date ON error_bank(user_id, due_date)\`, kết quả truy vấn trả về phân trang dưới 35ms cho 5,000 người dùng đồng thời.',
        completed: true
      },
      {
        id: 'ac-elsa-402-l1',
        given: 'Học viên phát âm sai từ "specifically" do lỗi nuốt âm /s/ hoặc chèn âm tiếng Việt',
        when: 'Xem chi tiết lỗi trong Error Bank',
        then: 'Thẻ phân tích cung cấp mẹo chỉnh cơ miệng: "Chú ý phân đoạn âm tiết: spe-ci-fi-cal-ly, hạ âm schwa /ə/ ở âm tiết thứ ba".',
        completed: true
      },
      {
        id: 'ac-elsa-402-a11y',
        given: 'Học viên ôn tập nhanh bằng bàn phím máy tính',
        when: 'Bấm phím 1 (Khó), 2 (Tốt), 3 (Dễ) sau khi nghe',
        then: 'Hệ thống cập nhật hệ số dễ dàng (Easiness Factor EF) và khoảng thời gian ôn tập kế tiếp (Interval Days) ngay lập tức theo chuẩn thuật toán SuperMemo-2.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-elsa-402-ui', title: 'Xây dựng component ErrorBankCard với tính năng so sánh âm thanh đôi (A/B Audio Player) và thanh tiến độ hộp Leitner', category: 'Frontend', completed: true },
      { id: 't-elsa-402-sm2', title: 'Triển khai thuật toán SuperMemo-2 (SM-2) tính toán EF (Easiness Factor) và Interval I(n) sau mỗi lượt ôn tập', category: 'Backend', completed: true },
      { id: 't-elsa-402-db', title: 'Thiết kế bảng PostgreSQL error_bank và tạo compound index tối ưu hóa cho 750,000 bản ghi', category: 'Backend', completed: true },
      { id: 't-elsa-402-scale', title: 'Tối ưu hóa nén và streaming file âm thanh ghi âm cũ từ Cloudflare R2 bucket với presigned URL thời hạn 1 giờ', category: 'DevOps/Scale', completed: true },
      { id: 't-elsa-402-qa', title: 'Kiểm thử toán học kiểm tra tính đúng đắn của chu kỳ lặp lại SM-2 qua 5 chu kỳ ôn tập liên tiếp', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design System Specifications
- **Màn hình tham chiếu**: \`src/ui-reference/dashboard_ti_n_tr_nh_h_c_t_p_v_l_ch_s_thu_m/code.html\`
- **React Component**: \`vietphonics-app/src/views/ErrorBankView.jsx\`
- **Công thức thuật toán SM-2**:
  - $EF' = EF + (0.1 - (5 - q) \times (0.08 + (5 - q) \times 0.02))$
  - Nếu $EF' < 1.3$, đặt $EF' = 1.3$
  - Khoảng cách ngày $I(1) = 1$, $I(2) = 6$, $I(n) = I(n-1) \times EF'$
  - $q$ là điểm đánh giá của người dùng từ 0 (hoàn toàn quên) đến 5 (phát âm hoàn hảo).
- **Audio A/B Comparison Player**:
  - Kênh A (Trái): Giọng của học viên khi mắc lỗi (vạch sóng âm màu đỏ hồng #f43f5e)
  - Kênh B (Phải): Giọng chuẩn bản ngữ (vạch sóng âm màu xanh ngọc #10b981).`
  },
  {
    id: 'ELSA-601',
    epic_id: 'epic-retention',
    title: 'Daily Practice Streak Counter & Streak Freeze Shields: Bộ Đếm Chuỗi Luyện Tập Hằng Ngày & Khiên Đóng Băng Bảo Vệ Chuỗi',
    persona: 'Người học đang hình thành thói quen học tập cần sự khích lệ liên tục và muốn bảo vệ chuỗi ngày học kỷ lục của mình',
    action: 'theo dõi ngọn lửa chuỗi ngày học liên tục (Streak Flame), nhận khiên đóng băng tự động khi có việc bận đột xuất, và nhận huy hiệu danh giá khi đạt mốc 7, 30, 100 ngày',
    value: 'tăng tỷ lệ quay lại ngày tiếp theo (Day-1 Retention) lên trên 65% và tỷ lệ giữ chân tháng đầu (Day-30 Retention) lên trên 40% nhờ hiệu ứng tâm lý sợ mất mát (Loss Aversion)',
    priority: 'must',
    status: 'in-progress',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-elsa-601-streak-calc',
        given: 'Học viên hoàn thành ít nhất 1 bài luyện phát âm trong ngày (theo múi giờ địa phương Asia/Ho_Chi_Minh GMT+7)',
        when: 'Hệ thống kiểm tra điều kiện Streak lúc 23:59:59',
        then: 'Bộ đếm chuỗi tăng thêm 1 ngày, ngọn lửa chuỗi bùng cháy với hiệu ứng ánh cam rực rỡ và thông báo chúc mừng "Chuỗi 12 ngày liên tục! Bạn thật tuyệt vời!".',
        completed: true
      },
      {
        id: 'ac-elsa-601-ui',
        given: 'Thanh điều hướng trên cùng (Navbar) và màn hình hồ sơ người dùng',
        when: 'Hiển thị huy hiệu Streak',
        then: 'Biểu tượng ngọn lửa màu cam cháy sống động kèm số ngày font chữ đậm Plus Jakarta Sans; khi bấm vào ngọn lửa, mở Modal Lịch Streak tháng hiển thị các ngày đã học được đánh dấu chấm xanh, ngày dùng Khiên Băng đánh dấu bông tuyết xanh lam.',
        completed: true
      },
      {
        id: 'ac-elsa-601-scale-5000',
        given: '5,000 học viên cùng hoạt động vào khung giờ chuyển giao ngày mới (23:50 - 00:10)',
        when: 'Hệ thống kiểm tra và cập nhật Streak hàng loạt',
        then: 'Sử dụng hàng đợi phân tán Redis Task Queue xử lý cập nhật bất đồng bộ, khóa phân tán Redlock bảo vệ chống race-condition ghi đè streak hai lần, thời gian xử lý toàn bộ 5,000 users dưới 4 giây.',
        completed: true
      },
      {
        id: 'ac-elsa-601-l1',
        given: 'Học viên bỏ lỡ 1 ngày luyện tập vì bận việc gia đình',
        when: 'Học viên sở hữu ít nhất 1 Khiên Băng (Streak Freeze Shield)',
        then: 'Hệ thống tự động tiêu thụ 1 khiên băng, bảo toàn chuỗi ngày học nguyên vẹn và gửi thông báo nhắc nhở nhẹ nhàng vào sáng hôm sau: "Khiên Băng đã cứu chuỗi 15 ngày của bạn! Đừng quên luyện tập hôm nay nhé!".',
        completed: true
      },
      {
        id: 'ac-elsa-601-a11y',
        given: 'Học viên dùng phím điều hướng',
        when: 'Focus vào ngọn lửa Streak',
        then: 'Aria-label đọc đầy đủ: "Chuỗi học tập hiện tại: 12 ngày liên tiếp. Bạn có 2 khiên băng bảo vệ. Nhấn để xem lịch sử tháng".',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-elsa-601-ui', title: 'Xây dựng component StreakModal với lịch tháng tương tác và hoạt ảnh ngọn lửa Lottie/CSS Canvas', category: 'Frontend', completed: true },
      { id: 't-elsa-601-logic', title: 'Xây dựng module StreakManager xử lý múi giờ địa phương IANA Timezone và cơ chế tự động kích hoạt Freeze Shield', category: 'Backend', completed: true },
      { id: 't-elsa-601-redis', title: 'Triển khai Redis cache và Redlock bảo vệ cập nhật đồng thời chuỗi học tập cho 5,000 users', category: 'Backend', completed: true },
      { id: 't-elsa-601-notify', title: 'Tích hợp Web Push Notification và Zalo ZNS nhắc nhở học viên trước 21:00 nếu chưa hoàn thành bài trong ngày', category: 'DevOps/Scale', completed: true },
      { id: 't-elsa-601-qa', title: 'Kiểm thử kịch bản múi giờ: mô phỏng học viên bay từ Hà Nội (GMT+7) sang Tokyo (GMT+9) và New York (GMT-5)', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design System Specifications
- **Màn hình tham chiếu**: \`vietphonics-app/src/components/Navbar.jsx\`
- **Streak Flame Visual**:
  - Gradient: \`from-orange-500 via-amber-500 to-yellow-400\`
  - Shadow: \`drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)]\`
  - Level Milestones: 7 ngày (Ngọn lửa đồng), 30 ngày (Ngọn lửa bạc xanh), 100 ngày (Ngọn lửa vàng kim tỏa hào quang rực rỡ).
- **Cơ chế Khiên Băng (Freeze Shield)**:
  - Tặng miễn phí 1 khiên mỗi khi đạt mốc 7 ngày liên tiếp
  - Giới hạn tối đa tích trữ 2 khiên cùng một thời điểm.`
  },
  {
    id: 'ELSA-602',
    epic_id: 'epic-retention',
    title: 'Freemium 5-Lesson Daily Limit & Pro Subscription Paywall: Hạn Mức 5 Bài Học Miễn Phí Mỗi Ngày & Cửa Sổ Nâng Cấp Pro Chuyển Đổi Cao',
    persona: 'Người dùng sử dụng tài khoản miễn phí muốn trải nghiệm giá trị ứng dụng trước khi quyết định chi trả',
    action: 'học tối đa 5 bài học phát âm miễn phí mỗi ngày; khi chạm ngưỡng giới hạn, xem bảng so sánh tính năng Pro hấp dẫn với mức giá chỉ 30,000đ/tháng và tiến hành nâng cấp',
    value: 'bảo vệ hạ tầng điện toán đám mây và chi phí ASR, đồng thời tối đa hóa tỷ lệ chuyển đổi từ người dùng miễn phí sang thuê bao trả phí (Free-to-Paid Conversion Rate > 8%)',
    priority: 'must',
    status: 'in-progress',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-elsa-602-quota-check',
        given: 'Học viên dùng gói Free đã hoàn thành 5 bài học trong ngày',
        when: 'Cố gắng bấm bắt đầu bài học thứ 6',
        then: 'Hệ thống chặn truy cập bài học và hiển thị Modal Nâng Cấp Pro (Paywall Modal) với tiêu đề thân thiện: "Bạn đã hoàn thành xuất sắc hạn mức 5 bài hôm nay! Nâng cấp Pro để mở khóa không giới hạn".',
        completed: true
      },
      {
        id: 'ac-elsa-602-ui',
        given: 'Cửa sổ nâng cấp Pro Paywall Modal',
        when: 'Hiển thị trên màn hình',
        then: 'Thiết kế theo chuẩn Google Stitch phong cách thẻ giá hiện đại: Bảng so sánh 2 cột Free vs Pro, huy hiệu "Phổ Biến Nhất" màu vàng cam, giá ưu đãi 30.000đ/tháng (chỉ 1.000đ/ngày tương đương nửa ly trà đá), nút kêu gọi hành động (CTA) gradient Rose rực rỡ với hiệu ứng hào quang nhẹ.',
        completed: true
      },
      {
        id: 'ac-elsa-602-scale-5000',
        given: '5,000 người dùng kiểm tra hạn mức bài học liên tục',
        when: 'Gửi request bắt đầu bài học',
        then: 'Hạn mức được kiểm tra trên Redis INCR counter \`quota:{user_id}:{date}\` với thời gian phản hồi dưới 3ms, không tốn bất kỳ lượt truy vấn nào vào cơ sở dữ liệu PostgreSQL chính.',
        completed: true
      },
      {
        id: 'ac-elsa-602-l1',
        given: 'Học viên muốn nghe lại đoạn ghi âm cũ của mình trong Error Bank',
        when: 'Kiểm tra quyền hạn gói Free',
        then: 'Gói Free cho phép nghe lại tối đa 3 ngày gần nhất; hiển thị icon ổ khóa mở rộng cho các đoạn ghi âm lịch sử lâu hơn kèm chú thích "Nâng cấp Pro để lưu trữ trọn đời âm thanh của bạn".',
        completed: true
      },
      {
        id: 'ac-elsa-602-a11y',
        given: 'Người dùng muốn đóng Modal Paywall',
        when: 'Nhấn phím Escape hoặc nút "Để sau, mai học tiếp"',
        then: 'Modal đóng mượt mà và focus trả về nút bài học trước đó, không gây bẫy bàn phím (keyboard trap).',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-elsa-602-ui', title: 'Xây dựng component ProPaywallModal với bảng so sánh tính năng Free vs Pro và đồng hồ đếm ngược reset hạn mức', category: 'Frontend', completed: true },
      { id: 't-elsa-602-redis', title: 'Triển khai Redis atomic counter INCR và EXPIREAT (23:59:59) kiểm soát hạn mức 5 bài/ngày cho 5,000 users', category: 'Backend', completed: true },
      { id: 't-elsa-602-gate', title: 'Viết Express/FastAPI middleware verifyQuotaMiddleware chặn các lượt gọi API luyện âm khi vượt quota', category: 'Backend', completed: true },
      { id: 't-elsa-602-perf', title: 'Đảm bảo modal mở tức thì dưới 50ms không bị hiện tượng giật cục layout (zero Cumulative Layout Shift)', category: 'DevOps/Scale', completed: true },
      { id: 't-elsa-602-qa', title: 'Kiểm thử hộp đen các trường hợp: tài khoản Pro không bị giới hạn, tài khoản Free đúng 5 bài bị chặn', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design System Specifications
- **Màn hình tham chiếu**: \`src/ui-reference/m_n_h_nh_ch_n_g_i_v_thanh_to_n_qr_code/code.html\`
- **React Component**: \`vietphonics-app/src/components/subscription/ProPaywallModal.jsx\`
- **Key Selling Points**:
  - Gói Free: 5 bài học/ngày, phản hồi âm thanh cơ bản, lưu lịch sử 3 ngày
  - Gói Pro: Không giới hạn bài học, chẩn đoán AI 3D khẩu hình, Golden Speaker Voice Clone, Error Bank trọn đời
- **Conversion Optimization**:
  - Đặt giá neo tâm lý: 30,000đ/tháng hoặc 299,000đ/năm (tiết kiệm 17% + tặng 3 tháng).`
  },
  {
    id: 'USER-101',
    epic_id: 'epic-retention',
    title: 'Learner Authentication, Pronunciation Mastery Dashboard & Practice Recording History: Xác Thực Người Dùng, Bảng Điều Khiển Tổng Quan & Lịch Sử Ghi Âm',
    persona: 'Học viên muốn có một trung tâm điều khiển cá nhân (Personal Learning Hub) để quản lý tài khoản, theo dõi tiến độ tổng thể và nghe lại sự tiến bộ của mình',
    action: 'đăng nhập nhanh bằng Google/Email, xem biểu đồ radar 5 kỹ năng phát âm, tra cứu lịch sử các bài ghi âm đã thực hiện và tải về file âm thanh đối chiếu',
    value: 'tạo sự minh bạch tuyệt đối về sự tiến bộ của học viên theo thời gian, chứng minh giá trị học tập rõ ràng giúp tăng sự hài lòng và niềm tin vào ứng dụng',
    priority: 'must',
    status: 'in-progress',
    size: 'XL',
    points: 13,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-user-101-auth-dashboard',
        given: 'Học viên đăng nhập thành công vào hệ thống',
        when: 'Truy cập vào trang Dashboard tổng quan',
        then: 'Hệ thống hiển thị ảnh đại diện, hạng thành viên (Free/Pro), điểm trung bình toàn diện (Overall Pronunciation Score), tổng số từ đã luyện và biểu đồ phân tích 5 trụ cột phát âm (Nguyên âm, Âm cuối, Trọng âm, Ngữ điệu, Nối âm).',
        completed: true
      },
      {
        id: 'ac-user-101-ui',
        given: 'Giao diện DashboardView và RecordingHistoryView',
        when: 'Render trên màn hình độ phân giải từ 375px đến 4K',
        then: 'Bố cục lưới Grid linh hoạt chuẩn Google Stitch: 4 thẻ thống kê số liệu (Metric KPI cards) ở trên cùng có hiệu ứng đổ bóng thanh lịch, biểu đồ Radar chart mượt mà sử dụng SVG vector, bảng lịch sử ghi âm có bộ lọc theo điểm số (Xanh lá >80%, Vàng 60-79%, Đỏ <60%).',
        completed: true
      },
      {
        id: 'ac-user-101-scale-5000',
        given: '5,000 học viên đồng thời tải trang Dashboard cá nhân',
        when: 'Hệ thống tính toán các chỉ số thống kê và nạp 20 bản ghi âm gần nhất',
        then: 'Sử dụng View vật lý hóa (Materialized View) hoặc Redis caching tổng hợp điểm số định kỳ 10 phút/lần; các file audio ghi âm được phục vụ qua CDN có cache-control immutable, P95 thời gian tải toàn trang dưới 350ms.',
        completed: true
      },
      {
        id: 'ac-user-101-l1',
        given: 'Bảng tóm tắt lỗi âm học đặc thù của người Việt',
        when: 'Học viên xem phần "Vùng Cần Cải Thiện"',
        then: 'Hệ thống liệt kê top 3 âm vị tiếng Anh bị ảnh hưởng nặng nhất bởi thói quen L1 tiếng Việt kèm nút "Luyện tập ngay" dẫn thẳng vào bài khắc phục chuyên sâu.',
        completed: true
      },
      {
        id: 'ac-user-101-a11y',
        given: 'Học viên thao tác với bảng lịch sử ghi âm',
        when: 'Sử dụng bàn phím di chuyển giữa các dòng',
        then: 'Các nút Play/Pause âm thanh có nhãn aria-label rõ ràng: "Phát bản ghi âm từ \'thought\' thực hiện ngày 02 tháng 10 năm 2026, điểm số 88%", hỗ trợ phím Space để bật/tắt âm thanh.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-user-101-ui', title: 'Xây dựng giao diện DashboardView hoàn chỉnh với 4 KPI cards, Radar Chart và bảng danh sách Audio History', category: 'Frontend', completed: true },
      { id: 't-user-101-auth', title: 'Tích hợp xác thực JWT an toàn kết hợp OAuth2 Google/Facebook và lưu refresh token trong HttpOnly cookie', category: 'Backend', completed: true },
      { id: 't-user-101-db', title: 'Thiết kế bảng practice_sessions có quan hệ 1-N với audio_records và compound index trên (user_id, created_at DESC)', category: 'Backend', completed: true },
      { id: 't-user-101-scale', title: 'Triển khai Cloudflare CDN edge caching cho các file audio ghi âm của học viên phục vụ 5,000 users', category: 'DevOps/Scale', completed: true },
      { id: 't-user-101-qa', title: 'Kiểm thử tự động End-to-End từ bước đăng nhập, nộp bài phát âm đến khi bản ghi xuất hiện trong Audio History', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design System Specifications
- **Màn hình tham chiếu**: \`src/ui-reference/dashboard_ti_n_tr_nh_h_c_t_p_v_l_ch_s_thu_m/code.html\`
- **React Component**: \`vietphonics-app/src/views/DashboardView.jsx\`
- **Metric Cards Layout**:
  - Total Words Practiced: Icon Microphone xanh ngọc (\`#10b981\`), số đếm \`font-mono font-bold text-2xl\`
  - Overall Accuracy: Icon Shield hồng rose (\`#f43f5e\`), điểm % kèm thanh mini bar
  - Current Streak: Icon Fire cam hổ phách (\`#f59e0b\`), số ngày kèm huy hiệu
  - Pro Status: Icon Crown tím (\`#8b5cf6\`), ngày hết hạn hoặc nút Nâng cấp.
- **Audio History Table**:
  - Cột Từ vựng, Cột Phiên âm IPA, Cột Ngày học, Cột Điểm số (Badge màu), Cột Trình phát A/B.`
  }
];
