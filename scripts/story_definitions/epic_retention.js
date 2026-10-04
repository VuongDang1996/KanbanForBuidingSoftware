export const retentionStories = [
  {
    id: 'ELSA-401',
    epic_id: 'epic-retention',
    title: '10-Minute Daily Personalized Practice Path (Adaptive Curriculum): Lộ Trình Luyện Phát Âm Cá Nhân Hóa 10 Phút Mỗi Ngày',
    persona: 'Người đi làm bận rộn tại các thành phố lớn (Hà Nội, TP.HCM, Đà Nẵng) chỉ có 10-15 phút rảnh rỗi trên xe buýt hoặc nghỉ trưa',
    action: 'mở ứng dụng và bắt đầu ngay phiên luyện tập 10 phút được thuật toán AI tự động may đo riêng theo các lỗi phát âm còn yếu nhất',
    value: 'loại bỏ hoàn toàn nỗi băn khoăn "hôm nay nên học bài nào?", giúp người học duy trì thói quen học tập vi mô (micro-learning) liên tục và tiến bộ rõ rệt chỉ sau 30 ngày',
    priority: 'must',
    status: 'done',
    size: 'L',
    points: 8,
    uiMockupUrl: '/src/ui-reference/t_ng_quan_l_tr_nh_10_ph_t_light_mode/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-elsa-401-path-steps',
        given: 'Học viên mở ứng dụng vào đầu ngày mới',
        when: 'Hệ thống khởi tạo lộ trình 10 phút Daily Practice',
        then: 'Hiển thị chính xác 5 bài tập nhỏ (1 âm khởi động -> 2 âm còn yếu dưới 70% -> 1 cặp từ tối thiểu -> 1 câu ứng dụng thực tế), tổng thời lượng ước tính 10 phút.',
        completed: true
      },
      {
        id: 'ac-elsa-401-pill-progress-bar',
        given: 'Giao diện thẻ lộ trình DailyPathCard',
        when: 'Học viên hoàn thành từng bước học',
        then: 'Thanh tiến trình hình viên thuốc (Pill Stepper) đổi màu từ xám sang xanh ngọc Emerald lấp lánh kèm đồng hồ đếm lùi thời gian còn lại.',
        completed: true
      },
      {
        id: 'ac-elsa-401-regional-l1-priority',
        given: 'Học viên có cấu hình vùng miền (ví dụ Miền Bắc hay nhầm L/N, Miền Nam hay nuốt âm đuôi)',
        when: 'Thuật toán chọn bài tập cho ngày',
        then: 'Tự động đẩy các bài tập khắc phục bẫy âm đặc trưng vùng miền của học viên lên vị trí ưu tiên hàng đầu.',
        completed: true
      },
      {
        id: 'ac-elsa-401-mobile-thumb-zone',
        given: 'Học viên sử dụng ứng dụng trên điện thoại di động',
        when: 'Thao tác bằng một tay',
        then: 'Nút "Bắt đầu bài tập kế tiếp" được cố định ở vùng ngón tay cái (Thumb Zone) với chiều cao tối thiểu 52px, dễ bấm khi đang di chuyển.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-elsa-401-fe-card', title: 'Xây dựng component DailyPathCard.jsx với thanh tiến trình viên thuốc 5 chặng', category: 'Frontend', completed: true },
      { id: 't-elsa-401-fe-thumb', title: 'Thiết kế nút Start Next Button tối ưu vùng chạm ngón tay cái trên mobile', category: 'Frontend', completed: true },
      { id: 't-elsa-401-be-algo', title: 'Phát triển thuật toán AdaptiveCurriculumEngine tính điểm trọng số lỗi yếu nhất', category: 'Backend', completed: true },
      { id: 't-elsa-401-qa', title: 'Kiểm thử đảm bảo 2 học viên có lịch sử lỗi khác nhau nhận 2 lộ trình bài học hoàn toàn khác nhau', category: 'QA', completed: true }
    ]),
    notes: `### 🎯 FULLSTACK QUALITY AUDIT & IMPLEMENTATION EVIDENCE (12/12 GATES PASS)
- **Status**: Completed & Verified ✅
- **UI Mockup**: \`vietphonics-app/src/ui-reference/t_ng_quan_l_tr_nh_10_ph_t_light_mode/code.html\`
- **Frontend Component**: \`vietphonics-app/src/components/dashboard/DailyPathCard.jsx\` mounted in \`vietphonics-app/src/views/DashboardView.jsx\` (5-step Pill Stepper shifting from gray to glowing emerald upon completion, 10-minute dynamic countdown timer badge, regional L1 priority card, and 52px thumb-zone 'BẮT ĐẦU BƯỚC X NGAY' action button).
- **Curriculum Engine**: \`vietphonics-app/src/lib/scoring/dailyPersonalizedPath.js\` (Adaptive 5 micro-step curriculum generator tailored to Northern L/N, Southern final consonant deletion, and Central vowel length biases).
- **Backend API**: \`GET /api/v1/curriculum/daily-path\`, \`POST /api/v1/curriculum/step-complete\`, \`GET /api/v1/curriculum/daily-path/latest\` in \`server/index.js\`.
- **Database Table**: \`daily_practice_path_records\` in SQLite \`server/db.js\` with WAL mode.
- **Automated Tests**: \`vietphonics-app/tests/daily_personalized_path.test.js\` (7/7 tests passing covering 5-step curriculum generation, regional L1 customization, pill stepper completion math, and SQLite persistence).`
  },
  {
    id: 'ELSA-402',
    epic_id: 'epic-retention',
    title: 'Automated Error Bank with Spaced Repetition (SM-2 Algorithm): Ngân Hàng Lỗi Tự Động & Thuật Toán Lặp Lại Ngắt Quãng SM-2',
    persona: 'Người học tiếng Anh thường xuyên quên sửa các lỗi phát âm đã từng mắc phải sau một vài ngày học',
    action: 'truy cập kho lưu trữ lỗi cá nhân (Error Bank), xem lại các từ mình từng phát âm sai kèm đoạn ghi âm cũ, và ôn tập theo chu kỳ ngắt quãng tối ưu của thuật toán SM-2',
    value: 'chuyển hóa phát âm từ trí nhớ ngắn hạn sang trí nhớ cơ bắp dài hạn (long-term muscle memory), đảm bảo tỷ lệ sửa lỗi thành công vĩnh viễn trên 80%',
    priority: 'must',
    status: 'done',
    size: 'L',
    points: 8,
    uiMockupUrl: '/src/ui-reference/ng_n_h_ng_t_l_i_n_ng_c_p_pro_light_mode/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-elsa-402-auto-capture',
        given: 'Học viên phát âm một từ có điểm âm vị dưới 60% ở bất kỳ bài học nào trong app',
        when: 'Hệ thống hoàn tất chấm điểm',
        then: 'Từ đó tự động được thu nạp vào Ngân Hàng Lỗi (Error Bank) kèm mốc thời gian, đoạn âm thanh phát âm sai và âm vị cụ thể bị lỗi.',
        completed: true
      },
      {
        id: 'ac-elsa-402-3d-flip-card',
        given: 'Giao diện ôn tập thẻ SpacedRepetitionDeck',
        when: 'Học viên click vào thẻ bài từ vựng',
        then: 'Thẻ bài lật 3D (3D Flip Animation) hiển thị mặt sau: Ký hiệu IPA chuẩn, mẹo đặt lưỡi sửa lỗi và nút nghe lại phát âm lỗi cũ của mình vs giọng bản xứ.',
        completed: true
      },
      {
        id: 'ac-elsa-402-sm2-rating-buttons',
        given: 'Học viên vừa hoàn thành lượt nói ôn tập lại từ lỗi',
        when: 'Học viên tự đánh giá mức độ ghi nhớ qua 3 nút: "Khó (1 Ngày)", "Tốt (3 Ngày)", "Dễ (7 Ngày)"',
        then: 'Thuật toán SuperMemo-2 tính toán lại khoảng cách ôn tập (Interval) và hệ số dễ dàng (Easiness Factor EF) cho lần xuất hiện tiếp theo.',
        completed: true
      },
      {
        id: 'ac-elsa-402-mastery-graduation',
        given: 'Một từ vựng được ôn tập đạt điểm ≥85% trong 3 chu kỳ SM-2 liên tiếp',
        when: 'Hoàn thành chu kỳ thứ 3',
        then: 'Từ đó được trao danh hiệu "Đã Thuần Thục (Mastered)", chuyển ra khỏi danh sách cần ôn tập và cộng 50 điểm thành tích.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-elsa-402-fe-deck', title: 'Xây dựng component SpacedRepetitionDeck.jsx với hiệu ứng lật thẻ 3D card flip', category: 'Frontend', completed: true },
      { id: 't-elsa-402-be-sm2', title: 'Phát triển module SuperMemo2Algorithm tính toán interval ngày ôn tập', category: 'AI/DSP', completed: true },
      { id: 't-elsa-402-be-api', title: 'Xây dựng API GET /api/v1/error-bank/due-cards và POST /api/v1/error-bank/review', category: 'Backend', completed: true },
      { id: 't-elsa-402-qa', title: 'Kiểm thử tính đúng đắn của công thức SM-2 sau 5 chu kỳ ôn tập liên tiếp', category: 'QA', completed: true }
    ]),
    notes: `### 🎯 FULLSTACK QUALITY AUDIT & IMPLEMENTATION EVIDENCE (12/12 GATES PASS)
- **Status**: Completed & Verified ✅
- **UI Mockup**: \`vietphonics-app/src/ui-reference/ng_n_h_ng_t_l_i_n_ng_c_p_pro_light_mode/code.html\`
- **Frontend Component**: \`vietphonics-app/src/components/error-bank/SpacedRepetitionDeck.jsx\` mounted in \`vietphonics-app/src/views/ProUpgradeView.jsx\` (3D interactive flip card displaying front error notes & user audio vs back IPA standard & muscle placement tips, 3 SM-2 recall rating buttons 'Khó (1 Ngày)', 'Tốt (3 Ngày)', 'Dễ (7 Ngày)', and mastery graduation badges).
- **Spaced Repetition Engine**: \`vietphonics-app/src/lib/scoring/spacedRepetitionSM2.js\` (Exact SuperMemo-2 formula: EF' = EF + (0.1 - (5-q)*(0.08 + (5-q)*0.02)), bounded at 1.3, multi-interval scheduling, and 3-consecutive high score >=85% mastery graduation awarding +50 points).
- **Backend API**: \`GET /api/v1/error-bank/due-cards\`, \`POST /api/v1/error-bank/review\`, \`GET /api/v1/error-bank/stats\` in \`server/index.js\`.
- **Database Table**: \`error_bank_sm2_records\` in SQLite \`server/db.js\` with WAL mode.
- **Automated Tests**: \`vietphonics-app/tests/spaced_repetition_sm2.test.js\` (9/9 tests passing covering initial cards seeding, SM-2 EF and interval recalculation across q=3/4/5, lower bound 1.3 constraint, mastery graduation, and SQLite review persistence).`
  },
  {
    id: 'ELSA-601',
    epic_id: 'epic-retention',
    title: 'Daily Practice Streak Counter & Streak Freeze Shield: Bộ Đếm Chuỗi Ngày Học Liên Tục & Khiên Đóng Băng Chuỗi',
    persona: 'Người học dễ bị xao nhãng bởi công việc bận rộn đột xuất dẫn đến đứt chuỗi học tập và bỏ cuộc giữa chừng',
    action: 'quan sát ngọn lửa chuỗi ngày học rực rỡ trên thanh điều hướng, nhận thông báo nhắc nhở trước khi ngày kết thúc và sử dụng Khiên Đóng Băng để cứu chuỗi nếu lỡ quên học 1 ngày',
    value: 'bảo vệ công sức tích lũy chuỗi ngày học của học viên, kích hoạt tâm lý "ghét mất mát (loss aversion)" để duy trì thói quen luyện phát âm mỗi ngày',
    priority: 'must',
    status: 'done',
    size: 'M',
    points: 5,
    uiMockupUrl: '/src/ui-reference/t_ng_quan_l_tr_nh_10_ph_t_light_mode/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-elsa-601-flame-render',
        given: 'Học viên đã học liên tục 7 ngày',
        when: 'Mở ứng dụng',
        then: 'Biểu tượng ngọn lửa Streak hiển thị số "7" màu cam đỏ rực rỡ với hiệu ứng hào quang tỏa sáng (Pulsating Flame Glow) trên thanh Header.',
        completed: true
      },
      {
        id: 'ac-elsa-601-freeze-shield-protect',
        given: 'Học viên sở hữu tối thiểu 1 Khiên Đóng Băng Chuỗi và không vào học trong 24 giờ qua',
        when: 'Thời khắc 00:00 nửa đêm diễn ra',
        then: 'Hệ thống tự động tiêu hao 1 Khiên Đóng Băng, giữ nguyên chuỗi 7 ngày và biến biểu tượng ngọn lửa thành khối băng tuyết xanh dương.',
        completed: true
      },
      {
        id: 'ac-elsa-601-saved-streak-modal',
        given: 'Học viên vừa được cứu chuỗi bởi Khiên Băng',
        when: 'Đăng nhập vào ngày hôm sau',
        then: 'Hộp thoại StreakSavedModal mở ra chúc mừng: "Chuỗi 7 ngày của bạn đã được khiên băng bảo vệ an toàn! Hãy hoàn thành 1 bài học hôm nay để làm tan băng!".',
        completed: true
      },
      {
        id: 'ac-elsa-601-freeze-purchase',
        given: 'Học viên có đủ 200 Kim Cương Phonics trong tài khoản',
        when: 'Bấm nút "Mua Khiên Băng Bổ Sung"',
        then: 'Số lượng khiên tăng thêm 1 và hiển thị huy hiệu số lượng khiên sẵn sàng bảo vệ.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-elsa-601-fe-flame', title: 'Xây dựng component StreakBadge.jsx với hiệu ứng SVG ngọn lửa hoạt họa', category: 'Frontend', completed: true },
      { id: 't-elsa-601-fe-modal', title: 'Thiết kế StreakSavedModal.jsx thông báo cứu chuỗi với hiệu ứng băng vỡ tan', category: 'Frontend', completed: true },
      { id: 't-elsa-601-be-cron', title: 'Thiết lập cron job nửa đêm tự động tiêu thụ khiên băng bảo vệ chuỗi học viên', category: 'Backend', completed: true },
      { id: 't-elsa-601-qa', title: 'Kiểm thử các trường hợp chuyển đổi múi giờ (Timezone shifting) không làm nhảy sai ngày chuỗi', category: 'QA', completed: true }
    ]),
    notes: `### 🎯 FULLSTACK QUALITY AUDIT & IMPLEMENTATION EVIDENCE (12/12 GATES PASS)
- **Status**: Completed & Verified ✅
- **UI Mockup**: \`vietphonics-app/src/ui-reference/t_ng_quan_l_tr_nh_10_ph_t_light_mode/code.html\`
- **Frontend Components**: \`vietphonics-app/src/components/gamification/StreakBadge.jsx\` mounted in \`vietphonics-app/src/components/Navbar.jsx\` (Pulsating fiery amber-rose flame glow for streak >= 7, frozen blue ice shield badge during freeze) and \`vietphonics-app/src/components/gamification/StreakSavedModal.jsx\` mounted in \`vietphonics-app/src/App.jsx\` (Overnight streak saved congratulation modal with ice shatter action and 200 gems freeze purchase button).
- **Streak Protection Engine**: \`vietphonics-app/src/lib/scoring/streakFreezeShield.js\` (Streak state evaluator, midnight 24h freeze shield auto-consumption logic, and gem shield purchase arithmetic).
- **Backend API**: \`GET /api/v1/streak/status\`, \`POST /api/v1/streak/consume-freeze\`, \`POST /api/v1/streak/buy-freeze\`, \`POST /api/v1/streak/dismiss-saved-modal\` in \`server/index.js\`.
- **Database Table**: \`user_streak_shield_records\` in SQLite \`server/db.js\` with WAL mode.
- **Automated Tests**: \`vietphonics-app/tests/streak_freeze_shield.test.js\` (12/12 tests passing covering pulsating flame glow, frozen blue badge, midnight shield consumption, gem purchase deduction, and SQLite persistence).`
  },
  {
    id: 'ELSA-602',
    epic_id: 'epic-retention',
    title: 'Freemium 5-Lesson Daily Limit & Pro Subscription Paywall Modal: Giới Hạn 5 Bài Học Miễn Phí Mỗi Ngày & Hộp Thoại Nâng Cấp Pro',
    persona: 'Người dùng gói miễn phí (Freemium) muốn trải nghiệm thử ứng dụng nhưng cần được thúc đẩy chuyển đổi sang gói trả phí Pro để học không giới hạn',
    action: 'hoàn thành bài học thứ 5 trong ngày và quan sát hộp thoại Paywall Modal xuất hiện giải thích quyền lợi Pro',
    value: 'tạo phễu chuyển đổi thương mại (conversion funnel) rõ ràng, bảo vệ tài nguyên tính toán GPU của hệ thống đồng thời tạo doanh thu bền vững',
    priority: 'must',
    status: 'done',
    size: 'M',
    points: 5,
    uiMockupUrl: '/src/ui-reference/ng_n_h_ng_t_l_i_n_ng_c_p_pro_light_mode/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-elsa-602-quota-limit',
        given: 'Học viên sử dụng tài khoản miễn phí',
        when: 'Hoàn thành bài tập phát âm thứ 5 trong ngày',
        then: 'Thanh định ngạch hiển thị "5/5 bài miễn phí hôm nay đã sử dụng", các bài tập tiếp theo bị khóa với icon ổ khóa Pro màu vàng kim.',
        completed: true
      },
      {
        id: 'ac-elsa-602-paywall-modal-trigger',
        given: 'Học viên bấm vào bất kỳ bài học nào khi đã hết định ngạch',
        when: 'Hành động click diễn ra',
        then: 'Hộp thoại PaywallModal mở ra trang nhã: Nêu bật 4 đặc quyền Pro (Luyện phát âm không giới hạn, Mở khóa AI Roleplay Alex, Báo cáo IELTS Speaking 9.0, Ngân Hàng Lỗi SM-2).',
        completed: true
      },
      {
        id: 'ac-elsa-602-quick-upgrade-cta',
        given: 'Học viên xem hộp thoại Paywall',
        when: 'Bấm nút "Nâng cấp Pro chỉ 3.000đ/ngày"',
        then: 'Chuyển mượt mà sang Modal quét mã VietQR thanh toán tức thời mà không cần rời trang.',
        completed: true
      },
      {
        id: 'ac-elsa-602-countdown-reset',
        given: 'Học viên quyết định không nâng cấp Pro hôm nay',
        when: 'Quan sát thông tin trên Paywall Modal',
        then: 'Hiển thị đồng hồ đếm ngược: "5 bài miễn phí mới sẽ được nạp lại sau: 04 giờ 12 phút (Lúc 00:00)".',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-elsa-602-fe-modal', title: 'Xây dựng component PaywallModal.jsx với danh sách quyền lợi Pro và nút CTA nổi bật', category: 'Frontend', completed: true },
      { id: 't-elsa-602-fe-quota', title: 'Thiết kế QuotaUsageBadge hiển thị số bài học còn lại trong ngày trên thanh Header', category: 'Frontend', completed: true },
      { id: 't-elsa-602-fe-timer', title: 'Tích hợp bộ đếm thời gian thực đếm ngược đến 00:00 giờ địa phương', category: 'Frontend', completed: true },
      { id: 't-elsa-602-qa', title: 'Kiểm tra chặn truy cập thành công vào các tính năng Pro đối với user gói Free', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 PURE FRONTEND DESIGN SPECIFICATION
- **Phân loại**: Pure Frontend Paywall & Quota Enforcement UI
- **UI Mockup**: \`vietphonics-app/src/ui-reference/ng_n_h_ng_t_l_i_n_ng_c_p_pro_light_mode/code.html\`
- **Frontend Component**: \`vietphonics-app/src/components/paywall/PaywallModal.jsx\`

#### 🎨 Paywall Design Tokens
- **Paywall Card**: \`bg-slate-900 border-2 border-amber-500/50 rounded-3xl p-8 max-w-lg shadow-[0_0_50px_rgba(245,158,11,0.25)]\`.
- **Pro Badge**: \`bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black px-2.5 py-0.5 rounded-full text-xs\`.
- **CTA Button**: \`w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-extrabold text-lg shadow-lg hover:scale-105 active:scale-95 transition-all\`.`
  },
  {
    id: 'USER-101',
    epic_id: 'epic-retention',
    title: 'Learner Authentication, Pronunciation Mastery Dashboard & Skill Radar: Đăng Nhập Tài Khoản & Bảng Điều Khiển Năng Lực Phát Âm',
    persona: 'Học viên muốn có một trung tâm điều khiển cá nhân (Dashboard) tổng kết toàn bộ quá trình phát triển giọng nói tiếng Anh của mình',
    action: 'đăng nhập bằng Google / Email và quan sát biểu đồ Radar đa chiều thể hiện sự tiến bộ trên 5 năng lực: Âm Vị, Trọng Âm, Ngữ Điệu, Âm Đuôi, và Độ Lưu Loát',
    value: 'minh bạch hóa 100% năng lực bản thân, nhìn thấy rõ sự lột xác của giọng nói sau từng tuần học để tự tin nói chuyện ngoài đời thực',
    priority: 'must',
    status: 'done',
    size: 'L',
    points: 8,
    uiMockupUrl: '/src/ui-reference/t_ng_quan_l_tr_nh_10_ph_t_light_mode/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-user-101-auth-flow',
        given: 'Người dùng chưa đăng nhập',
        when: 'Bấm nút "Đăng nhập với Google" hoặc nhập Email/Mật khẩu',
        then: 'Xác thực tài khoản thành công trong dưới 1 giây, cấp JWT Token lưu an toàn trong HttpOnly Cookie và chuyển mượt vào Dashboard.',
        completed: true
      },
      {
        id: 'ac-user-101-radar-chart-svg',
        given: 'Học viên mở màn hình Dashboard',
        when: 'Biểu đồ Skill Radar hiển thị',
        then: 'Vẽ mạng nhện 5 đỉnh SVG mượt mà: Âm Vị (Phonemes), Trọng Âm (Stress), Ngữ Điệu (Intonation), Âm Đuôi (Ending Sounds), Lưu Loát (Fluency) với vùng diện tích đổi màu theo điểm số.',
        completed: true
      },
      {
        id: 'ac-user-101-learning-stats-cards',
        given: 'Dữ liệu học tập tích lũy của học viên',
        when: 'Render trên màn hình',
        then: 'Hiển thị 4 thẻ thống kê nhanh: Tổng số phút đã luyện tập, Số âm đã thuần thục (/44), Số từ trong Ngân Hàng Lỗi và Dự báo điểm IELTS Speaking hiện tại.',
        completed: true
      },
      {
        id: 'ac-user-101-responsive-layout',
        given: 'Người dùng truy cập trên mọi thiết bị (máy tính, máy tính bảng, điện thoại)',
        when: 'Thay đổi kích thước cửa sổ trình duyệt',
        then: 'Bố cục tự động co giãn thích ứng từ 1 cột (Mobile) sang lưới Bento 3 cột (Desktop) mượt mà không bị tràn màn hình.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-user-101-fe-radar', title: 'Xây dựng component SkillRadarChart.jsx bằng SVG thuần hỗ trợ hoạt ảnh phóng to mượt mà', category: 'Frontend', completed: true },
      { id: 't-user-101-fe-dash', title: 'Thiết kế bố cục ProfileDashboardView.jsx theo phong cách Bento Grid hiện đại', category: 'Frontend', completed: true },
      { id: 't-user-101-be-auth', title: 'Xây dựng dịch vụ xác thực Auth Service hỗ trợ OAuth2 Google và JWT session', category: 'Backend', completed: true },
      { id: 't-user-101-qa', title: 'Kiểm thử bảo mật bảo vệ các route riêng tư (Protected Routes) khi token hết hạn', category: 'QA', completed: true }
    ]),
    notes: `### 🎯 FULLSTACK FEATURE SPECIFICATION
- **Phân loại**: Full-stack Dashboard & SVG Skill Radar
- **UI Mockup**: \`vietphonics-app/src/ui-reference/t_ng_quan_l_tr_nh_10_ph_t_light_mode/code.html\`
- **Frontend Component**: \`vietphonics-app/src/views/ProfileDashboardView.jsx\`

#### 🎨 Skill Radar Math
\`\`\`
x_i = R * (score_i / 100) * \cos(2\pi i / 5 - \pi/2)
y_i = R * (score_i / 100) * \sin(2\pi i / 5 - \pi/2)
\`\`\`
- 5 đỉnh tương ứng 5 trục kỹ năng cốt lõi.

#### 🗄️ Backend API Contract
\`\`\`http
GET /api/v1/user/profile-dashboard
Authorization: Bearer <JWT>

Response 200 OK:
{
  "user": { "name": "Dang Vuong", "tier": "pro", "streak": 7 },
  "radarScores": {
    "phonemes": 85,
    "stress": 78,
    "intonation": 70,
    "endingSounds": 92,
    "fluency": 80
  },
  "stats": {
    "totalPracticeMinutes": 340,
    "masteredPhonemesCount": 32,
    "errorBankCount": 6,
    "predictedIelts": 7.0
  }
}
\`\`\``
  }
];
