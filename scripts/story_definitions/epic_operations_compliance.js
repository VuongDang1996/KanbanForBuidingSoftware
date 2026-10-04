// Missing mandatory stories from docs/USER_STORY_QUALITY_CHECKLIST.md — Section 15
// Groups: Vận hành (Gate L), Pháp lý (Gate L), Chất lượng AI (Gate I/K), Scale (Gate J)
// All stories start in 'backlog' — no implementation evidence exists yet.

const ac = (id, given, when, then) => ({ id, given, when, then, completed: false });
const t = (id, title, category) => ({ id, title, category, completed: false });

export const operationsComplianceStories = [
  // ───────────────────────────── VẬN HÀNH ─────────────────────────────
  {
    id: 'OPS-101',
    epic_id: 'epic-operations-compliance',
    title: 'Executive Admin Dashboard & Subscription Console: Bảng Điều Khiển Quản Trị Hệ Thống Toàn Diện',
    persona: 'Quản trị viên hệ thống (Admin/Superadmin) và Trưởng bộ phận kinh doanh VietPhonics',
    action: 'đăng nhập vào trang quản trị bảo mật (/admin), theo dõi chỉ số kinh doanh thời gian thực (MRR, Churn rate, active Pro count), tra cứu học viên và can thiệp hạn ngạch/gói Pro',
    value: 'vận hành sản phẩm chuyên nghiệp, phát hiện sớm các bất thường về thanh toán hoặc lạm dụng, và hỗ trợ kỹ thuật khách hàng kịp thời',
    priority: 'must',
    status: 'backlog',
    size: 'XL',
    points: 13,
    acceptance_criteria: JSON.stringify([
      ac('ac-ops-101-auth', 'Truy cập đường dẫn quản trị `/admin`', 'Chưa đăng nhập hoặc tài khoản không có quyền `admin` / `superadmin`', 'API từ chối với 403 Forbidden, chuyển hướng về trang đăng nhập; phiên admin yêu cầu xác thực 2 lớp (MFA/TOTP) và hết hạn sau 15 phút không hoạt động.'),
      ac('ac-ops-101-kpi-metrics', 'Quản trị viên mở bảng điều khiển chính', 'Trang tải xong trong ≤ 300ms P95', 'Hiển thị các chỉ số kinh doanh theo thời gian thực: Doanh thu định kỳ tháng (MRR bằng VND), Số thuê bao Pro đang hoạt động, DAU/MAU, Tỉ lệ chuyển đổi dùng thử → trả phí, Tỉ lệ rời bỏ (Churn Rate 30 ngày).'),
      ac('ac-ops-101-user-lookup', 'Cần kiểm tra phản ánh của khách hàng', 'Tìm kiếm theo email, User ID hoặc mã giao dịch VietQR', 'Hiển thị chi tiết hồ sơ: trạng thái gói, ngày kích hoạt/hết hạn, lịch sử nộp bài gần nhất, danh sách phiên đăng nhập (USER-104), và hạn ngạch quota trong ngày.'),
      ac('ac-ops-101-manual-actions', 'Khách hàng gặp lỗi thanh toán hoặc sự cố hệ thống cần đền bù', 'Admin bấm "Cấp bù Pro 30 ngày" hoặc "Reset Quota"', 'Hệ thống yêu cầu nhập lý do can thiệp, cập nhật tức thì vào DB và ghi vết vào `admin_audit_logs` (ai làm, can thiệp user nào, lý do gì, IP nào) không thể sửa/xoá.'),
      ac('ac-ops-101-masking', 'Admin hoặc nhân viên hỗ trợ xem danh sách khách hàng', 'Hiển thị dữ liệu cá nhân', 'Mật khẩu không bao giờ hiển thị; các thông tin nhạy cảm (token, số thẻ cuối, mã số thuế) được che dấu (masked) theo nguyên tắc đặc quyền tối thiểu (least privilege).')
    ]),
    technical_tasks: JSON.stringify([
      t('t-ops-101-db', 'Bảng `admin_audit_logs` (admin_id, target_user_id, action, reason, ip, created_at) với index theo admin_id và created_at', 'Database'),
      t('t-ops-101-api', 'API GET /api/v1/admin/metrics, GET /api/v1/admin/users, POST /api/v1/admin/users/:id/override-quota, POST /api/v1/admin/users/:id/grant-pro', 'Backend'),
      t('t-ops-101-fe', 'Giao diện Admin Dashboard responsive, bảng tra cứu user có bộ lọc & phân trang, modal xác nhận kèm nhập lý do', 'Frontend'),
      t('t-ops-101-sec', 'Middleware phân quyền RBAC nghiêm ngặt + MFA TOTP + rate limit riêng cho route /admin', 'Backend'),
      t('t-ops-101-qa', 'Test phân quyền (user thường gọi API admin bị 403), test audit log đầy đủ mọi thao tác ghi đè', 'QA')
    ]),
    notes: `### 📋 Gate applicability
- **Áp dụng**: A, B, C, D, E, F (🔴 F1, F6, F7), G, K, **L (🔴 L2 metrics, L3 log)**
- **Phụ thuộc**: USER-101, PAY-101, PAY-105, USER-104.
- **Bối cảnh**: Checklist Mục 15 đánh dấu ❌ — thiếu trang admin cho user, doanh thu và nội dung.`
  },
  {
    id: 'OPS-102',
    epic_id: 'epic-operations-compliance',
    title: 'Real-Time APM Monitoring & Incident Alerting: Hệ Thống Giám Sát Sức Khỏe APM & Cảnh Báo Lỗi Thời Gian Thực',
    persona: 'Kỹ sư DevOps / SRE chịu trách nhiệm cam kết Uptime ≥ 99.5% và độ trễ P95 ≤ 2s cho 5,000 học viên',
    action: 'tích hợp Sentry theo dõi lỗi frontend/backend, cấu hình Prometheus thu thập số liệu tải và thiết lập bot cảnh báo sự cố tức thời qua Telegram/Slack',
    value: 'phát hiện và khắc phục sự cố nghiêm trọng trong ≤ 5 phút trước khi học viên kịp phàn nàn, đảm bảo dịch vụ thông suốt',
    priority: 'must',
    status: 'backlog',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      ac('ac-ops-102-sentry-fe-be', 'Xảy ra lỗi ngoại lệ không xử lý (uncaught exception) ở frontend React hoặc backend API', 'Lỗi phát sinh', 'Sentry bắt lỗi tự động trong ≤ 5 giây kèm breadcrumbs, stack trace, mã người dùng ẩn danh (không lộ PII), tag môi trường (production/staging) và phiên bản release.'),
      ac('ac-ops-102-prometheus-metrics', 'Hệ thống đang phục vụ lưu lượng', 'Prometheus định kỳ cào endpoint `/metrics` mỗi 15 giây', 'Thu thập đầy đủ các chỉ số cốt lõi: HTTP P95 latency (J1), Tỉ lệ lỗi 5xx (J3), Queue depth BullMQ của worker AI (ARCH-102), GPU worker latency, và kết nối DB PgBouncer.'),
      ac('ac-ops-102-alert-rules', 'Hệ thống vượt ngưỡng an toàn (P95 > 2s trong 3 phút, lỗi 5xx > 1%, queue depth > 100 tác vụ)', 'Alertmanager đánh giá quy tắc cảnh báo', 'Tự động kích hoạt thông báo khẩn cấp (severity: critical) đến kênh Slack `#alerts-production` và Telegram Bot On-Call trong ≤ 60 giây.'),
      ac('ac-ops-102-healthchecks', 'Bộ cân bằng tải hoặc Kubernetes probe thăm dò', 'Gọi GET `/health` và GET `/ready`', 'Endpoint `/health` trả 200 trong ≤ 10ms nếu máy chủ sống; `/ready` kiểm tra kết nối DB, Redis, R2 và trả 503 nếu một trong các thành phần cốt lõi bị mất kết nối.'),
      ac('ac-ops-102-log-retention', 'Hệ thống ghi log ứng dụng', 'Lưu trữ log tập trung (Loki/CloudWatch)', 'Log có cấu trúc JSON, chứa requestId, duy trì lưu trữ an toàn tối thiểu 14 ngày (Gate L3) và tự động lọc bỏ thông tin thẻ/mật khẩu.')
    ]),
    technical_tasks: JSON.stringify([
      t('t-ops-102-sentry', 'Cài đặt `@sentry/react` và `@sentry/node`, cấu hình source maps và lọc PII', 'DevOps'),
      t('t-ops-102-prom', 'Cấu hình `prom-client` xuất endpoint `/metrics` với histogram độ trễ API và gauge queue depth', 'Backend'),
      t('t-ops-102-bot', 'Xây dựng Webhook bot gửi tin nhắn cảnh báo định dạng Markdown đẹp vào Telegram & Slack', 'DevOps'),
      t('t-ops-102-probes', 'Viết endpoint GET /health và GET /ready kiểm tra DB/Redis trong server/index.js', 'Backend'),
      t('t-ops-102-qa', 'Kiểm thử kịch bản giả lập lỗi 500 hàng loạt và kiểm tra bot Telegram nhận cảnh báo trong 60 giây', 'QA')
    ]),
    notes: `### 📋 Gate applicability
- **Áp dụng**: A, B, D, **J (J1-J4 ngưỡng hiệu năng)**, K, **L (🔴 L1 Sentry, L2 metrics & alert, L3 log 14 ngày)**
- **Phụ thuộc**: ARCH-102 (BullMQ queue), ARCH-101 (PostgreSQL DB).`
  },
  {
    id: 'OPS-103',
    epic_id: 'epic-operations-compliance',
    title: 'Admin Content Management System (CMS) for Lessons & Sentences: CMS Quản Trị Danh Mục Bài Học, Cặp Âm & Câu Luyện',
    persona: 'Chuyên gia sư phạm ngôn ngữ (Content Lead) phụ trách xây dựng và cập nhật ngân hàng câu luyện tiếng Anh',
    action: 'truy cập giao diện CMS quản trị (/admin/content), tạo mới/chỉnh sửa bài học, nhập câu luyện kèm phiên âm IPA chuẩn xác và tải lên audio mẫu',
    value: 'đội ngũ nội dung có thể làm giàu kho bài tập liên tục (đạt 1,000+ câu) mà không cần lập trình viên sửa mã nguồn hay deploy lại web',
    priority: 'should',
    status: 'backlog',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      ac('ac-ops-103-crud-sentence', 'Chuyên gia nội dung tạo câu luyện mới', 'Nhập văn bản tiếng Anh, cấp độ CEFR (A1-C1), chủ đề (IT Standup, IELTS, Daily)', 'Giao diện tự động gợi ý phiên âm IPA chuẩn General American; cho phép biên tập chỉnh sửa vị trí trọng âm và âm vị mục tiêu.'),
      ac('ac-ops-103-ipa-validator', 'Người dùng nhập phiên âm IPA cho câu luyện', 'Bấm "Lưu"', 'Hệ thống kiểm tra tính hợp lệ của chuỗi ký tự IPA theo chuẩn Unicode, cảnh báo nếu ký tự IPA không tương ứng với các từ trong câu, ngăn ngừa nhập sai ký hiệu âm vị.'),
      ac('ac-ops-103-audio-upload', 'Tải lên file âm thanh bản xứ mẫu (WAV/MP3/M4A)', 'File được tải lên', 'Server tự động chuẩn hoá âm thanh (AAC 64kbps, 16kHz, cắt khoảng lặng đầu cuối), lưu lên Cloudflare R2 và sinh URL CDN công khai.'),
      ac('ac-ops-103-draft-publish', 'Biên tập viên hoàn thành bài học', 'Đổi trạng thái từ `draft` sang `published`', 'Chỉ bài học `published` mới được trả về qua API cho học viên; bài học cập nhật có hiệu lực ngay lập tức sau khi xóa cache CDN/Redis.'),
      ac('ac-ops-103-csv-import', 'Cần nhập hàng loạt 100 câu luyện mới', 'Tải lên file CSV theo mẫu quy định', 'Hệ thống kiểm tra cú pháp từng dòng, trả về báo cáo lỗi cụ thể dòng nào sai IPA/thiếu trường và chỉ nạp những dòng hợp lệ trong một giao dịch an toàn.')
    ]),
    technical_tasks: JSON.stringify([
      t('t-ops-103-db', 'Bảng `lessons`, `target_sentences`, `minimal_pairs` kèm trạng thái draft/published, version và created_by', 'Database'),
      t('t-ops-103-api', 'API RESTful CRUD /api/v1/admin/lessons, /api/v1/admin/sentences, POST /api/v1/admin/sentences/bulk-import', 'Backend'),
      t('t-ops-103-fe', 'Giao diện CMS quản trị với bộ soạn thảo câu luyện, widget kiểm tra IPA thời gian thực, audio player xem trước', 'Frontend'),
      t('t-ops-103-storage', 'Đường ống xử lý audio tải lên R2 qua presigned URL và vô hiệu hoá cache CDN tự động', 'DevOps'),
      t('t-ops-103-qa', 'Test nhập CSV sai format bị từ chối; test câu draft không xuất hiện trong danh sách học viên', 'QA')
    ]),
    notes: `### 📋 Gate applicability
- **Áp dụng**: A, B, C, D, E, K, **L (CMS quản lý nội dung)**
- **Phụ thuộc**: PRON-201 (cặp âm tối thiểu), ELSA-205 (câu luyện đích), ARCH-104 (lưu trữ R2).`
  },
  {
    id: 'OPS-104',
    epic_id: 'epic-operations-compliance',
    title: 'Multi-Channel Automated Notification Hub: Trung Tâm Thông Báo Đa Kênh Tự Động (Email & In-App)',
    persona: 'Học viên cần được nhắc nhở đúng lúc để giữ chuỗi streak và không bỏ lỡ thông báo tài khoản quan trọng',
    action: 'nhận thông báo chuông tức thời trên thanh menu ứng dụng, nhận email nhắc nhở học tập cá nhân hoá và quản lý tuỳ chọn nhận tin',
    value: 'tăng tỉ lệ quay lại ứng dụng hàng ngày thêm 35%, giảm tỉ lệ quên gia hạn gói Pro và tạo kênh liên lạc chính thức với người học',
    priority: 'should',
    status: 'backlog',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      ac('ac-ops-104-inapp-bell', 'Học viên có thông báo mới (mở khóa danh hiệu, đạt chuỗi streak 7 ngày, gói Pro sắp hết hạn)', 'Đang sử dụng ứng dụng web', 'Biểu tượng chuông hiển thị huy hiệu số thông báo đỏ; nhấp vào mở dropdown danh sách với trạng thái đã đọc/chưa đọc; hỗ trợ đánh dấu "Đã đọc tất cả".'),
      ac('ac-ops-104-streak-reminder', 'Học viên chưa hoàn thành mục tiêu ngày vào lúc 20:30 tối (GMT+7)', 'Worker kiểm tra điều kiện', 'Tự động gửi thông báo push/email nhắc nhở: "Chỉ còn 3 tiếng để giữ chuỗi Streak 5 ngày của bạn!"; không gửi nếu người dùng đã hoàn thành bài tập hôm nay.'),
      ac('ac-ops-104-sub-renewal-alert', 'Gói Pro còn 3 ngày và 1 ngày trước khi hết hạn', 'Hệ thống quét lịch thuê bao', 'Gửi email và in-app alert thông báo gia hạn kèm liên kết thanh toán ưu đãi 1-click.'),
      ac('ac-ops-104-preferences', 'Học viên vào trang Cài Đặt Thông Báo', 'Thay đổi tuỳ chọn', 'Cho phép bật/tắt riêng biệt: "Nhắc nhở Streak hằng ngày", "Báo cáo tuần", "Thông báo khuyến mãi"; luôn gửi email bảo mật bắt buộc (đổi mật khẩu, biên lai thanh toán).'),
      ac('ac-ops-104-rate-limit', 'Nhiều sự kiện xảy ra cùng ngày', 'Hệ thống gửi thông báo', 'Áp dụng giới hạn: tối đa 2 email tiếp thị/nhắc nhở mỗi ngày trên một người dùng để tránh làm phiền (spam fatigue).')
    ]),
    technical_tasks: JSON.stringify([
      t('t-ops-104-db', 'Bảng `in_app_notifications` (id, user_id, title, message, type, read_at, action_url, created_at) + cột `notification_prefs` JSONB trên users', 'Database'),
      t('t-ops-104-api', 'API GET /api/v1/me/notifications, PATCH /api/v1/me/notifications/:id/read, PATCH /api/v1/me/notifications/read-all, GET/PUT /api/v1/me/notification-preferences', 'Backend'),
      t('t-ops-104-fe', 'Dropdown chuông thông báo trên Header, trang cài đặt tuỳ chọn nhận tin responsive', 'Frontend'),
      t('t-ops-104-worker', 'Cron job BullMQ quét streak chưa hoàn thành và thuê bao sắp hết hạn gửi email qua Resend/SES', 'Backend'),
      t('t-ops-104-qa', 'Test: tắt thông báo streak thì không nhận email lúc 20:30; test đánh dấu đã đọc cập nhật UI ngay', 'QA')
    ]),
    notes: `### 📋 Gate applicability
- **Áp dụng**: A, B, C, D, E, K, **L (L4 thông báo, L9 chăm sóc khách hàng)**
- **Phụ thuộc**: ELSA-601 (Streak), PAY-103 (Gói Pro), PROG-103 (Báo cáo tuần).`
  },

  // ───────────────────────────── PHÁP LÝ & BẢO MẬT ─────────────────────────────
  {
    id: 'LEG-101',
    epic_id: 'epic-operations-compliance',
    title: 'Terms of Service, Privacy Policy & Explicit Voice Biometric Consent: Điều Khoản Dịch Vụ, Chính Sách Bảo Mật & Đồng Ý Thu Âm Giọng Nói',
    persona: 'Người dùng Việt Nam quan tâm đến quyền riêng tư và Cơ quan thanh tra pháp lý về bảo vệ dữ liệu cá nhân',
    action: 'đọc Điều khoản dịch vụ, Chính sách bảo mật và xác nhận hộp thoại đồng ý thu âm giọng nói có giải thích mục đích AI trước khi bắt đầu luyện tập',
    value: 'bảo vệ pháp lý cho doanh nghiệp, tuân thủ nghiêm ngặt Nghị định 13/2023/NĐ-CP về dữ liệu sinh trắc học và tạo dựng niềm tin tuyệt đối với người học',
    priority: 'must',
    status: 'backlog',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      ac('ac-leg-101-public-pages', 'Khách truy cập vào các đường dẫn `/terms`, `/privacy`, `/refund-policy`', 'Trang tải xong', 'Hiển thị đầy đủ nội dung bằng tiếng Việt rõ ràng, chuẩn ngữ pháp: Điều khoản sử dụng, Chính sách bảo vệ dữ liệu cá nhân theo NĐ 13/2023, Chính sách hoàn tiền 7 ngày; nêu rõ tên đơn vị chủ quản, địa chỉ, mã số thuế và email liên hệ.'),
      ac('ac-leg-101-signup-consent', 'Người dùng đăng ký tài khoản (USER-101, USER-106)', 'Ở form đăng ký', 'Có checkbox bắt buộc: "Tôi đồng ý với Điều khoản dịch vụ và Chính sách bảo mật"; ghi nhận phiên bản điều khoản và thời điểm đồng ý vào cơ sở dữ liệu.'),
      ac('ac-leg-101-voice-biometric-modal', 'Lần đầu tiên người dùng vào tính năng thu âm mic', 'Trước khi trình duyệt xin quyền micro', 'Hiển thị hộp thoại giải thích rõ ràng bằng tiếng Việt: "VietPhonics sử dụng giọng nói của bạn để phân tích phát âm bằng AI. Bạn có quyền xoá dữ liệu giọng nói bất cứ lúc nào trong mục Cài đặt"; người dùng phải bấm "Tôi đồng ý" mới được mở mic.'),
      ac('ac-leg-101-opt-out-model-training', 'Người dùng vào trang Cài Đặt Quyền Riêng Tư', 'Xem mục đào tạo mô hình', 'Có nút gạt: "Cho phép sử dụng bản ghi âm ẩn danh để cải thiện mô hình AI" (mặc định bật, người dùng có quyền tắt bất kỳ lúc nào mà không bị khoá tính năng học).'),
      ac('ac-leg-101-policy-update', 'Doanh nghiệp cập nhật Điều khoản hoặc Chính sách bảo mật', 'Người dùng đăng nhập lần tiếp theo', 'Hiển thị modal thông báo thay đổi và yêu cầu xác nhận phiên bản mới (v1.1) trước khi tiếp tục sử dụng ứng dụng.')
    ]),
    technical_tasks: JSON.stringify([
      t('t-leg-101-db', 'Bảng `user_consents` (id, user_id, policy_type, policy_version, consented_at, ip_address, user_agent)', 'Database'),
      t('t-leg-101-pages', 'Xây dựng các trang tĩnh `/terms`, `/privacy`, `/refund-policy` có định dạng văn bản pháp lý chuyên nghiệp', 'Frontend'),
      t('t-leg-101-modal', 'Tạo component VoiceBiometricConsentModal hiển thị trước khi kích hoạt Web Audio API mic stream', 'Frontend'),
      t('t-leg-101-api', 'API POST /api/v1/legal/consent ghi nhận lịch sử đồng ý và GET /api/v1/legal/consent-status', 'Backend'),
      t('t-leg-101-qa', 'Test: từ chối modal giọng nói thì không khởi tạo mic; người dùng tắt opt-out đào tạo thì cờ `train_opt_in: false` được lưu', 'QA')
    ]),
    notes: `### 📋 Gate applicability
- **Áp dụng**: A, B, C, D, E, **F (F8 audit log)**, K, **L (🔴 L6 văn bản pháp lý tiếng Việt, L7 consent thu âm rõ ràng, L8 NĐ 13/2023)**
- **Phụ thuộc**: USER-101, USER-106, PRON-101 (Microphone stream).`
  },

  // ───────────────────────────── CHẤT LƯỢNG AI & BENCHMARK ─────────────────────────────
  {
    id: 'AIQ-101',
    epic_id: 'epic-advanced-ai-lab',
    title: 'Vietnamese L1 Pronunciation Benchmark Dataset & Accuracy Report: Bộ Dữ Liệu Đánh Giá Giọng Việt 3 Miền & Báo Cáo Độ Chính Xác Tương Quan',
    persona: 'Nhà khoa học dữ liệu Speech AI (Speech Scientist) và Trưởng bộ phận sản phẩm VietPhonics',
    action: 'xây dựng tập dữ liệu kiểm chuẩn 200+ mẫu âm thanh giọng đọc tiếng Anh của người Việt 3 miền (Bắc/Trung/Nam) có dán nhãn chuyên gia ngữ âm, chạy benchmark tự động và xuất báo cáo hệ số tương quan r ≥ 0.85',
    value: 'chứng minh tính chính xác khoa học của thuật toán AI chấm điểm, đảm bảo không có thiên vị phương ngữ (bias) và tạo cơ sở khoa học để tự tin thu phí',
    priority: 'must',
    status: 'backlog',
    size: 'XL',
    points: 13,
    acceptance_criteria: JSON.stringify([
      ac('ac-aiq-101-dataset-curation', 'Thu thập tập dữ liệu kiểm chuẩn', 'Xây dựng kho dữ liệu 200+ bản ghi âm WAV 16kHz', 'Bao phủ đều 3 miền: Miền Bắc (70 mẫu), Miền Trung (60 mẫu), Miền Nam (70 mẫu); gồm cả người mới bắt đầu (A1-A2) và người trung cấp (B1-B2) đọc 50 câu chứa toàn bộ âm vị khó của người Việt.'),
      ac('ac-aiq-101-human-labels', 'Dán nhãn chuẩn mực (Ground Truth)', 'Mỗi bản ghi được chấm độc lập bởi 2 chuyên gia ngữ âm học / giám khảo IELTS', 'Điểm số mức âm vị 0–100, ghi rõ nhãn lỗi (nhầm âm, nuốt âm cuối, sai trọng âm); độ đồng thuận liên chuyên gia đạt Cohen’s Kappa κ ≥ 0.80.'),
      ac('ac-aiq-101-eval-script', 'Chạy script đánh giá tự động `npm run eval:benchmark`', 'Script nạp toàn bộ 200 file âm thanh qua pipeline AI VietPhonics', 'Tính toán sai số tuyệt đối trung bình (MAE) và hệ số tương quan tuyến tính Pearson r giữa điểm AI và điểm trung bình của chuyên gia con người.'),
      ac('ac-aiq-101-thresholds', 'Kết quả benchmark hoàn tất', 'Đánh giá chỉ số chất lượng Gate I3', 'Hệ số tương quan tổng thể đạt r ≥ 0.85; MAE ≤ 7.0 điểm; độ chênh lệch sai số giữa 3 miền Bắc - Trung - Nam ≤ 4.5% (không thiên vị vùng miền).'),
      ac('ac-aiq-101-public-report', 'Xuất báo cáo khoa học định dạng Markdown & PDF', 'Báo cáo được tạo', 'Công khai phương pháp luận, ma trận nhầm lẫn (confusion matrix) cho 10 âm vị thách thức nhất (/θ/, /ð/, /dʒ/, /tʃ/, final /s, z, t, d/) để làm bằng chứng chất lượng cho Gate I.')
    ]),
    technical_tasks: JSON.stringify([
      t('t-aiq-101-corpus', 'Tổ chức kho dữ liệu mẫu âm thanh chuẩn tại `data/benchmark/` kèm metadata JSON phân loại vùng miền và trình độ', 'QA/AI'),
      t('t-aiq-101-labels', 'Xây dựng file `ground_truth_labels.json` chứa điểm số dán nhãn của các chuyên gia ngữ âm học', 'Content/AI'),
      t('t-aiq-101-script', 'Viết công cụ CLI `scripts/run_ai_benchmark.js` nạp file, gọi hàm scoring, tính toán Pearson r, MAE và xuất bảng số liệu', 'AI/Scale'),
      t('t-aiq-101-ci', 'Tích hợp bài test regression benchmark vào CI: cảnh báo đỏ nếu PR mới làm giảm Pearson r xuống dưới 0.82', 'DevOps'),
      t('t-aiq-101-doc', 'Soạn thảo tài liệu báo cáo nghiên cứu kỹ thuật `docs/AI_PRONUNCIATION_ACCURACY_BENCHMARK.md`', 'Content')
    ]),
    notes: `### 📋 Gate applicability
- **Áp dụng**: A, B, **I (🔴 I3 chứng minh độ chính xác CAPT, I4 hiệu chỉnh L1 3 miền)**, **K (K5 test giọng thật 3 miền)**
- **Phụ thuộc**: ELSA-201 (Forced alignment), PRON-203 (Chấm điểm âm vị), VN-101..105 (Hiệu chỉnh giọng Việt).`
  },

  // ───────────────────────────── SCALE & KIỂM THỬ TẢI ─────────────────────────────
  {
    id: 'SCL-101',
    epic_id: 'epic-backend-infrastructure',
    title: 'Load & Stress Testing Suite for 1,500 Concurrent Sessions: Kịch Bản Kiểm Thử Tải 1,500 Phiên Đồng Thời',
    persona: 'Kỹ sư Kiểm thử Hiệu năng (Performance QA) và Kỹ sư Hạ tầng Đám mây',
    action: 'viết kịch bản kiểm thử tải k6 / Artillery mô phỏng 1,500 phiên người dùng đồng thời trong 30 phút, kiểm tra độ bền máy chủ API và hàng đợi GPU',
    value: 'chứng minh hệ thống chịu tải an toàn gấp 3 lần quy mô 5,000 học viên trả phí, không sập nguồn, không rò rỉ RAM và giữ P95 ≤ 2s',
    priority: 'must',
    status: 'backlog',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      ac('ac-scl-101-k6-scenario', 'Kịch bản k6 mô phỏng hành vi học viên thật trong giờ cao điểm tối (20:00–21:30)', '1,500 Virtual Users (VUs) đồng thời', 'Phân bổ hành vi: 50% luyện âm vị nộp file audio, 25% xem dashboard tiến độ & bảng xếp hạng, 15% làm bài chẩn đoán, 10% thanh toán checkout.'),
      ac('ac-scl-101-ramp-up', 'Tiến trình kiểm thử bắt đầu', 'Ramp up từ 0 lên 1,500 VUs trong 5 phút, giữ tải đỉnh 20 phút, hạ tải 5 phút', 'Hệ thống tự động điều chỉnh mở rộng worker; không có tiến trình nào bị crashed hoặc restart đột ngột.'),
      ac('ac-scl-101-threshold-api', 'Dưới áp lực 1,500 phiên đồng thời (≈ 150 requests/giây)', 'Đo lường độ trễ các API thông thường (đọc profile, dashboard, bài học)', 'Độ trễ P95 ≤ 200ms (Gate J1), P99 ≤ 500ms; không có timeout kết nối cơ sở dữ liệu.'),
      ac('ac-scl-101-threshold-audio', 'Dưới lưu lượng nộp bài 15–30 file âm thanh/giây', 'Đo lường thời gian xử lý chấm điểm end-to-end (ingest → queue → scoring → response)', 'Độ trễ P95 ≤ 2.0 giây (Gate J2); hàng đợi Redis không bị tràn bộ nhớ.'),
      ac('ac-scl-101-error-rate', 'Trong suốt 30 phút kiểm thử tải', 'Tổng kết toàn bộ 250,000+ requests gửi lên', 'Tỉ lệ lỗi HTTP 5xx < 0.5% (Gate J3); Uptime đạt 100% trong phiên test (Gate J4); xuất báo cáo HTML và JSON chi tiết.')
    ]),
    technical_tasks: JSON.stringify([
      t('t-scl-101-script', 'Viết kịch bản k6 `tests/load/k6_peak_concurrency_1500.js` với custom metrics, thresholds và sinh dữ liệu audio giả lập', 'QA'),
      t('t-scl-101-setup', 'Cấu hình môi trường Staging đồng nhất phần cứng với Production để chạy load test', 'DevOps'),
      t('t-scl-101-monitor', 'Ghi nhận biểu đồ tiêu thụ CPU, RAM máy chủ, kết nối DB pool và I/O mạng trong suốt quá trình test', 'DevOps'),
      t('t-scl-101-report', 'Phân tích kết quả chạy, lập tài liệu báo cáo kiểm chuẩn hiệu năng `docs/LOAD_TEST_REPORT_1500_CONCURRENCY.md`', 'QA'),
      t('t-scl-101-ci', 'Tích hợp smoke load test nhẹ (50 VUs) vào quy trình CI/CD trước khi release phiên bản lớn', 'DevOps')
    ]),
    notes: `### 📋 Gate applicability
- **Áp dụng**: A, B, **J (🔴 J1 P95 ≤ 200ms, J2 audio P95 ≤ 2s, J3 5xx < 0.5%, J4 uptime, J5 load test 1,500 phiên)**, **K (K1-K8)**
- **Phụ thuộc**: ARCH-101 (Connection pool), ARCH-102 (GPU worker queue), ARCH-103 (Caching & Redis).`
  }
];
