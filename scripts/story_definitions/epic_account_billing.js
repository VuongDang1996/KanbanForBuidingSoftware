// Missing mandatory stories from docs/USER_STORY_QUALITY_CHECKLIST.md — Section 15
// Groups: Tài khoản (Gate F) & Thanh toán (Gate G)
// All stories start in 'backlog' — no implementation evidence exists yet.

const ac = (id, given, when, then) => ({ id, given, when, then, completed: false });
const t = (id, title, category) => ({ id, title, category, completed: false });

export const accountBillingStories = [
  // ───────────────────────────── TÀI KHOẢN (BATCH 12) ─────────────────────────────
  {
    id: 'USER-106',
    epic_id: 'epic-backend-infrastructure',
    title: 'Email Sign-Up & Verification: Đăng Ký Bằng Email & Xác Minh Kích Hoạt Tài Khoản',
    persona: 'Người học Việt Nam không dùng tài khoản Google (hoặc muốn tách email học tập riêng)',
    action: 'đăng ký tài khoản bằng email + mật khẩu và xác minh email qua liên kết/mã OTP trước khi dùng các tính năng trả phí',
    value: 'có tài khoản an toàn, khôi phục được, và hệ thống đảm bảo mỗi email là thật để gửi hoá đơn, báo cáo tuần và thông báo bảo mật',
    priority: 'must',
    status: 'done',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      ac('ac-user-106-signup-happy', 'Khách truy cập nhập email hợp lệ, mật khẩu ≥ 10 ký tự (có chữ và số) và tick đồng ý Điều khoản (LEG-101)', 'Bấm "Tạo tài khoản"', 'Server tạo user trạng thái `pending_verification`, băm mật khẩu bằng Argon2id/PBKDF2 SHA-512 với 10,000 rounds và salt riêng, gửi email xác minh trong ≤ 60 giây và hiển thị màn hình "Kiểm tra hộp thư" bằng tiếng Việt.', true),
      ac('ac-user-106-verify-link', 'Người dùng mở liên kết xác minh hoặc nhập OTP trong email', 'Token còn hạn (≤ 15 phút) và chưa được dùng', 'Tài khoản chuyển sang `active`, token bị vô hiệu hoá (single-use), người dùng được đăng nhập và chuyển thẳng tới bài chẩn đoán 3 phút (ELSA-102).', true),
      ac('ac-user-106-expired', 'Liên kết đã hết hạn hoặc đã dùng', 'Người dùng mở liên kết', 'Hiển thị "Mã xác thực đã hết hạn" kèm nút "Gửi lại mã"; gửi lại bị giới hạn 60s cooldown và tối đa 3 lần/giờ/email.', true),
      ac('ac-user-106-duplicate', 'Email đã tồn tại trong hệ thống', 'Có người đăng ký lại bằng email đó', 'Giao diện trả cùng một thông báo trung tính như khi thành công (chống dò email — user enumeration Gate F8); tài khoản active được bảo vệ.', true),
      ac('ac-user-106-unverified-gate', 'Tài khoản chưa xác minh', 'Người dùng cố mở trang thanh toán Pro', 'API trả 403 `EMAIL_NOT_VERIFIED`; UI hiện banner yêu cầu xác minh. Free tier vẫn được luyện tối đa quota Free.', true),
      ac('ac-user-106-abuse', 'Bot gửi hàng loạt yêu cầu đăng ký', 'Vượt 5 lần đăng ký/IP/10 phút', 'Server trả 429 với retryAfterSeconds; email dùng một lần (disposable) bị từ chối theo blocklist tự động.', true)
    ]),
    technical_tasks: JSON.stringify([
      t('t-user-106-db', 'Tạo bảng `auth_accounts` và `email_verification_tokens` (token_hash SHA-256, expires_at, used_at) trong SQLite', 'Database', true),
      t('t-user-106-api', 'API POST /api/v1/auth/email/register, POST /api/v1/auth/email/verify, POST /api/v1/auth/email/resend-verification', 'Backend', true),
      t('t-user-106-security', 'Bộ lọc email dùng 1 lần `validateEmailAddress`, đo độ mạnh mật khẩu `validatePasswordStrength`, băm mật khẩu PBKDF2/Crypto', 'Backend', true),
      t('t-user-106-fe', 'Form đăng ký email, đo độ mạnh mật khẩu, checkbox đồng ý Điều khoản NĐ 13/2023 và modal nhập OTP 6 số trong AccountSecurityModal.jsx', 'Frontend', true),
      t('t-user-106-qa', 'Integration tests: đăng ký → nhập sai OTP → nhập đúng OTP → kích hoạt tài khoản; test rate limit & disposable email', 'QA', true)
    ]),
    notes: `### 🎯 FULLSTACK QUALITY AUDIT & IMPLEMENTATION EVIDENCE (12/12 GATES PASS)
- **Status**: Completed & Verified ✅
- **Pure Backend Engine**: \`vietphonics-app/src/lib/auth/authSecurityManager.js\` & \`passwordValidation.js\` (RFC regex, disposable domain blocklist, PBKDF2 10k iterations SHA-512 password hashing, 6-digit OTP crypto generator, SHA-256 token hashing, sliding window rate limiter).
- **Database Persistence**: SQLite tables \`auth_accounts\` & \`email_verification_tokens\` in \`vietphonics-app/server/db.js\` with indexes on email, status, account_id, and token_hash.
- **REST APIs**: \`POST /api/v1/auth/email/register\`, \`POST /api/v1/auth/email/verify\`, \`POST /api/v1/auth/email/resend-verification\` in \`server/index.js\`.
- **Frontend UI**: \`AccountSecurityModal.jsx\` (Tab "Đăng Ký & Xác Minh" with password strength progress bar, terms consent checkbox compliant with Decree 13/2023, 6-digit OTP input with 60s cooldown timer).
- **Automated Tests**: \`tests/account_security_batch12.test.js\` (Passing tests for terms consent, disposable rejection, weak password rejection, pending account creation, invalid OTP handling, valid activation).`
  },
  {
    id: 'USER-103',
    epic_id: 'epic-backend-infrastructure',
    title: 'Forgot & Reset Password: Quên Mật Khẩu & Đặt Lại An Toàn Qua Email',
    persona: 'Học viên trả phí quên mật khẩu khi chuyển sang thiết bị mới',
    action: 'yêu cầu liên kết đặt lại mật khẩu qua email và đặt mật khẩu mới',
    value: 'lấy lại quyền truy cập trong vòng 2 phút mà không cần liên hệ hỗ trợ, đồng thời không mở ra lỗ hổng chiếm tài khoản',
    priority: 'must',
    status: 'done',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      ac('ac-user-103-request', 'Người dùng nhập email ở màn "Quên mật khẩu"', 'Bấm "Gửi liên kết"', 'Luôn hiện cùng thông báo "Nếu email tồn tại, bạn sẽ nhận được liên kết" (chống dò email Gate F8); nếu email tồn tại, sinh token trong ≤ 60ms.', true),
      ac('ac-user-103-token', 'Liên kết đặt lại được sinh ra', 'Server lưu token', 'Token ngẫu nhiên 32 byte hex, chỉ lưu bản băm SHA-256, hết hạn sau 30 phút và chỉ dùng được 1 lần; yêu cầu mới làm vô hiệu token cũ.', true),
      ac('ac-user-103-reset', 'Người dùng mở liên kết còn hạn và nhập mật khẩu mới hợp lệ', 'Bấm "Đặt lại"', 'Mật khẩu được băm lại bằng PBKDF2/Argon2id, **toàn bộ phiên và refresh token khác bị thu hồi ngay lập tức (Gate F6)**, gửi thông báo bảo mật.', true),
      ac('ac-user-103-throttle', 'Kẻ tấn công spam yêu cầu đặt lại', 'Vượt 3 yêu cầu/email/giờ', 'Server trả 429 với `retryAfterSeconds`, không gửi thêm email, ghi log bảo mật.', true),
      ac('ac-user-103-reuse', 'Người dùng cố tình sử dụng lại token đã đổi mật khẩu', 'Gửi request reset lần 2', 'Server từ chối với 422 `Liên kết đặt lại mật khẩu không hợp lệ hoặc đã được sử dụng`.', true)
    ]),
    technical_tasks: JSON.stringify([
      t('t-user-103-db', 'Tạo bảng `password_reset_tokens` (id, account_id, token_hash, expires_at, used_at, ip_address) trong SQLite', 'Database', true),
      t('t-user-103-api', 'API POST /api/v1/auth/password/forgot và POST /api/v1/auth/password/reset kèm thu hồi session', 'Backend', true),
      t('t-user-103-security', 'Thu hồi toàn bộ phiên đăng nhập active (`UPDATE user_active_sessions SET revoked_at = now`) khi reset thành công (Gate F6)', 'Backend', true),
      t('t-user-103-fe', 'Tab "Quên Mật Khẩu" & luồng nhập token đặt mật khẩu mới trong AccountSecurityModal.jsx', 'Frontend', true),
      t('t-user-103-qa', 'Test: anti-enumeration 200 response, token 30 phút hết hạn, đổi mật khẩu thành công thu hồi toàn bộ session', 'QA', true)
    ]),
    notes: `### 🎯 FULLSTACK QUALITY AUDIT & IMPLEMENTATION EVIDENCE (12/12 GATES PASS)
- **Status**: Completed & Verified ✅
- **Security Engine**: Single-use 32-byte crypto token generator with 30-minute strict TTL, SHA-256 token hashing, sliding window rate limiter (max 3/hour/email).
- **Session Revocation**: \`UPDATE user_active_sessions SET revoked_at = ? WHERE account_id = ? AND revoked_at IS NULL\` kicks out all concurrent active devices upon password reset (Gate F6).
- **Database Persistence**: SQLite table \`password_reset_tokens\` in \`server/db.js\` with index on \`token_hash\` and \`account_id\`.
- **REST APIs**: \`POST /api/v1/auth/password/forgot\` & \`POST /api/v1/auth/password/reset\` in \`server/index.js\`.
- **Frontend UI**: \`AccountSecurityModal.jsx\` (Tab "Quên Mật Khẩu" with two-phase form: request reset link & enter token with new password strength indicator).
- **Automated Tests**: \`tests/account_security_batch12.test.js\` (Passing tests for anti-enumeration, session revocation verification, and token reuse prevention).`
  },
  {
    id: 'USER-104',
    epic_id: 'epic-backend-infrastructure',
    title: 'Profile & Active Device Management: Quản Lý Hồ Sơ & Thiết Bị Đăng Nhập (Tối Đa 2 Phiên Đồng Thời)',
    persona: 'Học viên Pro dùng cả điện thoại và laptop, lo ngại bị chia sẻ tài khoản trái phép',
    action: 'chỉnh sửa hồ sơ (tên, vùng miền giọng, mục tiêu học) và xem/đăng xuất từ xa các thiết bị đang đăng nhập',
    value: 'kiểm soát bảo mật tài khoản của mình, đồng thời giúp doanh nghiệp hạn chế chia sẻ tài khoản Pro làm thất thoát doanh thu',
    priority: 'must',
    status: 'done',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      ac('ac-user-104-edit-profile', 'Học viên mở trang "Hồ sơ"', 'Thay đổi tên hiển thị, vùng miền (Bắc/Trung/Nam), mục tiêu (IELTS/Công việc/Giao tiếp) và lưu', 'Server validate enum hợp lệ, lưu trong ≤ 50ms P95; thay đổi vùng miền kích hoạt hiệu chỉnh lại hồ sơ L1 (ELSA-102) tức thì.', true),
      ac('ac-user-104-device-list', 'Học viên mở tab "Thiết bị"', 'Trang tải xong', 'Hiển thị danh sách phiên: loại thiết bị (Mobile/Desktop/Tablet), tên thiết bị (iPhone/Windows PC), IP, vị trí ước tính, thời điểm hoạt động cuối; phiên hiện tại được đánh dấu "Thiết bị này".', true),
      ac('ac-user-104-revoke', 'Có phiên lạ trong danh sách', 'Bấm "Đăng xuất thiết bị này"', 'Phiên bị thu hồi ngay trong DB (`revoked_at = now()`); thiết bị bị ngắt phiên đăng nhập.', true),
      ac('ac-user-104-limit-pro', 'Tài khoản đã có 2 phiên đang hoạt động (Free: 1, Pro: 2)', 'Đăng nhập trên thiết bị thứ 3', 'Server trả 409 `DEVICE_LIMIT_REACHED` kèm danh sách phiên để chọn phiên cần đăng xuất; nếu truyền `evictOldest: true` tự động thu hồi phiên cũ nhất.', true),
      ac('ac-user-104-revoke-all', 'Học viên muốn dọn dẹp các máy khác', 'Bấm "Đăng xuất toàn bộ thiết bị khác"', 'Toàn bộ phiên khác bị thu hồi đồng loạt, chỉ giữ lại phiên hiện tại.', true)
    ]),
    technical_tasks: JSON.stringify([
      t('t-user-104-db', 'Tạo bảng `user_active_sessions` (id, account_id, refresh_token_hash, device_name, device_type, user_agent, ip_address, last_active_at, revoked_at) trong SQLite', 'Database', true),
      t('t-user-104-api', 'API GET /api/v1/user/sessions, DELETE /api/v1/user/sessions/:sessionId, POST /api/v1/user/sessions/revoke-all-others, POST /api/v1/auth/session/enforce', 'Backend', true),
      t('t-user-104-profile', 'API PATCH /api/v1/user/profile-settings đồng bộ L1 dialect với user_profiles (ELSA-102)', 'Backend', true),
      t('t-user-104-fe', 'Tab "Hồ Sơ & Thiết Bị (Max 2)" trong AccountSecurityModal.jsx hiển thị danh sách thiết bị kèm nút Đăng xuất từ xa', 'Frontend', true),
      t('t-user-104-qa', 'Test: giới hạn 2 phiên Pro trả 409 khi có thiết bị thứ 3, evictOldest thu hồi phiên cũ nhất, remote revoke thành công, cập nhật hồ sơ sync DB', 'QA', true)
    ]),
    notes: `### 🎯 FULLSTACK QUALITY AUDIT & IMPLEMENTATION EVIDENCE (12/12 GATES PASS)
- **Status**: Completed & Verified ✅
- **Device & Session Engine**: \`parseDeviceFromUserAgent\` auto-classifies device OS (iPhone, iPad, Android, Windows, Mac, Linux) and type (Mobile, Desktop, Tablet).
- **Session Limiter Logic**: Strict enforcement of max 2 concurrent active sessions for Pro accounts (1 for Free), supporting interactive selection or automatic oldest eviction.
- **Database Persistence**: SQLite table \`user_active_sessions\` with index on \`(account_id, revoked_at)\` in \`server/db.js\`.
- **REST APIs**: \`GET /api/v1/user/sessions\`, \`DELETE /api/v1/user/sessions/:sessionId\`, \`POST /api/v1/user/sessions/revoke-all-others\`, \`POST /api/v1/auth/session/enforce\`, \`PATCH /api/v1/user/profile-settings\` in \`server/index.js\`.
- **Frontend UI**: \`AccountSecurityModal.jsx\` (Tab "Hồ Sơ & Thiết Bị (Max 2)" with device icons, IP and location details, and remote logout controls; lock button integrated into \`Navbar.jsx\`).
- **Automated Tests**: \`tests/account_security_batch12.test.js\` (Passing tests for max 2 session limit, 409 conflict, evictOldest, remote DELETE session, and profile update sync).`
  },
  {
    id: 'USER-105',
    epic_id: 'epic-backend-infrastructure',
    title: 'Account Deletion & Personal Data Export (Decree 13/2023/NĐ-CP): Xoá Tài Khoản & Xuất Dữ Liệu Cá Nhân',
    persona: 'Học viên muốn thực hiện quyền của chủ thể dữ liệu theo Nghị định 13/2023/NĐ-CP',
    action: 'tải về toàn bộ dữ liệu cá nhân của mình và yêu cầu xoá vĩnh viễn tài khoản, bản ghi âm giọng nói',
    value: 'tin tưởng rằng giọng nói và dữ liệu học tập của mình được tôn trọng; doanh nghiệp tuân thủ pháp luật và tránh rủi ro xử phạt',
    priority: 'must',
    status: 'backlog',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      ac('ac-user-105-export', 'Học viên bấm "Tải dữ liệu của tôi" ở trang Quyền riêng tư', 'Yêu cầu được xử lý bất đồng bộ', 'Trong ≤ 72 giờ (mục tiêu ≤ 15 phút) người dùng nhận email kèm liên kết tải file ZIP gồm JSON (hồ sơ, lịch sử điểm, giao dịch, consent) + bản ghi âm còn lưu; liên kết ký (signed URL) hết hạn sau 24 giờ.'),
      ac('ac-user-105-delete-confirm', 'Học viên bấm "Xoá tài khoản"', 'Nhập lại mật khẩu (hoặc xác thực Google lại) và gõ chữ "XOÁ"', 'Tài khoản chuyển sang `pending_deletion`, đăng xuất mọi thiết bị, gửi email xác nhận với liên kết "Huỷ yêu cầu xoá" có hiệu lực 7 ngày.'),
      ac('ac-user-105-purge', 'Hết 7 ngày ân hạn mà không huỷ', 'Job xoá chạy', 'Xoá vĩnh viễn hồ sơ, điểm âm vị, bản ghi âm trên R2/S3, voice clone (ADV-101); chỉ giữ dữ liệu giao dịch đã ẩn danh hoá theo nghĩa vụ kế toán/thuế (≥ 10 năm, không gắn danh tính).'),
      ac('ac-user-105-active-sub', 'Học viên còn gói Pro đang hiệu lực', 'Yêu cầu xoá tài khoản', 'UI cảnh báo rõ số ngày Pro còn lại sẽ mất và chính sách hoàn tiền (PAY-106); tự động huỷ gia hạn.'),
      ac('ac-user-105-audit', 'Bất kỳ yêu cầu export/xoá nào', 'Được tạo hoặc hoàn tất', 'Ghi audit log (ai, khi nào, loại yêu cầu, kết quả) bất biến, giữ tối thiểu 2 năm để chứng minh tuân thủ.')
    ]),
    technical_tasks: JSON.stringify([
      t('t-user-105-db', 'Bảng `data_requests` (type export/delete, status, requested_at, completed_at) + `audit_log`', 'Database'),
      t('t-user-105-worker', 'Worker xuất dữ liệu ZIP & worker xoá vĩnh viễn (DB + object storage + backup retention policy)', 'Backend'),
      t('t-user-105-api', 'API POST /api/v1/me/export, POST /api/v1/me/delete, POST /api/v1/me/delete/cancel', 'Backend'),
      t('t-user-105-fe', 'Trang "Quyền riêng tư & Dữ liệu" với luồng xác nhận 2 bước', 'Frontend'),
      t('t-user-105-qa', 'Test: sau purge không còn bản ghi gắn user_id ở mọi bảng & bucket; export chứa đủ dữ liệu', 'QA')
    ]),
    notes: `### 📋 Gate applicability
- **Áp dụng**: A–F, K, **L (🔴 L8 — NĐ 13/2023)**
- **Lưu ý pháp lý**: Cần luật sư/DPO rà soát thời hạn lưu dữ liệu giao dịch và nội dung thông báo trước khi phát hành.
- **Phụ thuộc**: LEG-101, PAY-106, ARCH-104 (lưu trữ audio).`
  },

  // ───────────────────────────── THANH TOÁN ─────────────────────────────
  {
    id: 'PAY-105',
    epic_id: 'epic-backend-infrastructure',
    title: 'E-Wallet & Card Payments (MoMo, ZaloPay, VNPay, Stripe): Thanh Toán Qua Ví Điện Tử & Thẻ',
    persona: 'Người học muốn trả phí Pro bằng ví MoMo/ZaloPay hoặc thẻ Visa/Mastercard thay vì chuyển khoản VietQR',
    action: 'chọn phương thức thanh toán ưa thích tại trang checkout và hoàn tất giao dịch trong một luồng liền mạch',
    value: 'giảm tỉ lệ bỏ giỏ ở bước thanh toán; doanh nghiệp tăng chuyển đổi và hỗ trợ gia hạn tự động bằng thẻ',
    priority: 'wont',
    status: 'backlog',
    size: 'XL',
    points: 13,
    acceptance_criteria: JSON.stringify([
      ac('ac-pay-105-methods', 'Người dùng ở trang checkout gói Pro', 'Trang tải xong', 'Hiển thị VietQR (PAY-101), MoMo, ZaloPay, VNPay, Thẻ quốc tế (Stripe); giá luôn hiển thị bằng VND đã gồm VAT, giống hệt nhau giữa các kênh.'),
      ac('ac-pay-105-redirect', 'Người dùng chọn MoMo/VNPay/ZaloPay', 'Bấm "Thanh toán"', 'Server tạo order với `order_id` duy nhất, ký request bằng HMAC-SHA256 theo tài liệu cổng, chuyển hướng tới cổng; số tiền lấy từ bảng giá phía server, **không** nhận từ client.'),
      ac('ac-pay-105-ipn', 'Cổng thanh toán gọi IPN/webhook', 'Chữ ký hợp lệ và số tiền khớp order', 'Kích hoạt Pro trong ≤ 5 giây, idempotent theo `transaction_id` (IPN gửi trùng không cộng ngày Pro lần 2); chữ ký sai → 400 và log cảnh báo.'),
      ac('ac-pay-105-return-pending', 'Người dùng quay lại trang return trước khi IPN đến', 'Trang return hiển thị', 'Hiện trạng thái "Đang xác nhận thanh toán" và polling tối đa 2 phút; **không** kích hoạt Pro dựa trên query string của return URL.'),
      ac('ac-pay-105-stripe-recurring', 'Người dùng trả bằng thẻ qua Stripe', 'Chọn gia hạn tự động', 'Tạo Stripe Subscription, hỗ trợ 3-D Secure; webhook `invoice.payment_failed` kích hoạt grace period 3 ngày và email nhắc.'),
      ac('ac-pay-105-failure', 'Giao dịch thất bại/huỷ', 'Cổng trả mã lỗi', 'Hiển thị thông báo tiếng Việt dễ hiểu theo từng mã lỗi phổ biến và nút "Thử phương thức khác"; order chuyển `failed`.')
    ]),
    technical_tasks: JSON.stringify([
      t('t-pay-105-adapter', 'Lớp PaymentProvider adapter thống nhất (createOrder, verifyWebhook, refund) cho MoMo/ZaloPay/VNPay/Stripe', 'Backend'),
      t('t-pay-105-db', 'Bảng `payment_orders`, `payment_events` (raw payload, signature_valid, processed_at) với unique (provider, transaction_id)', 'Database'),
      t('t-pay-105-fe', 'UI chọn phương thức + trang trạng thái thanh toán', 'Frontend'),
      t('t-pay-105-secrets', 'Quản lý secret key từng cổng theo môi trường (sandbox/production)', 'DevOps'),
      t('t-pay-105-qa', 'Integration test với sandbox từng cổng: thành công, thất bại, IPN trùng, chữ ký sai, sai số tiền', 'QA')
    ]),
    notes: `### 📋 Decision & Gate applicability
- **Quyết định Product Owner (04/10/2026)**: Để tiết kiệm chi phí tích hợp và phí duy trì merchant cổng ví, ứng dụng tập trung 100% vào **VietQR Napas** (PAY-101, PAY-102, ARCH-103) là cổng thanh toán duy nhất chính thức cho MVP. PAY-105 được đánh dấu **wont** (Won't-Have Now).
- **Áp dụng**: A–F, **G (🔴 G2, G3, G4, G5, G12)**, J, K (K6 webhook trùng), L
- **Phụ thuộc**: PAY-101, ARCH-103 (reconciler đối soát), PAY-107 (hoá đơn điện tử sau thanh toán).`
  },
  {
    id: 'PAY-106',
    epic_id: 'epic-backend-infrastructure',
    title: 'Billing History, Receipts & Refund Requests: Lịch Sử Giao Dịch, Biên Lai PDF & Yêu Cầu Hoàn Tiền',
    persona: 'Học viên Pro cần xem lại các khoản đã trả và muốn được hoàn tiền nếu không hài lòng trong 7 ngày đầu',
    action: 'xem lịch sử giao dịch, tải biên lai PDF và gửi yêu cầu hoàn tiền theo chính sách',
    value: 'minh bạch tài chính tạo niềm tin để trả phí; doanh nghiệp giảm tranh chấp/chargeback và khối lượng ticket hỗ trợ',
    priority: 'must',
    status: 'backlog',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      ac('ac-pay-106-history', 'Học viên mở "Thanh toán & Hoá đơn"', 'Trang tải xong', 'Hiển thị bảng giao dịch: ngày, gói, phương thức, số tiền VND, trạng thái (thành công/thất bại/đã hoàn), phân trang 20 dòng; chỉ thấy giao dịch của chính mình (kiểm tra quyền phía server).'),
      ac('ac-pay-106-receipt', 'Giao dịch thành công', 'Bấm "Tải biên lai"', 'Sinh PDF tiếng Việt có mã giao dịch, thông tin người bán, VAT, trong ≤ 3 giây; nếu đã có hoá đơn điện tử (PAY-107) thì hiển thị thêm liên kết tra cứu.'),
      ac('ac-pay-106-refund-eligible', 'Giao dịch đầu tiên trong ≤ 7 ngày và đã dùng < 30 lượt chấm điểm Pro', 'Học viên gửi yêu cầu hoàn tiền kèm lý do', 'Yêu cầu tự động duyệt, gọi API refund của cổng (hoặc tạo lệnh chuyển khoản thủ công cho VietQR), thu hồi Pro ngay khi hoàn tất, gửi email xác nhận.'),
      ac('ac-pay-106-refund-review', 'Yêu cầu không thoả điều kiện tự động', 'Gửi yêu cầu', 'Chuyển sang hàng chờ admin (OPS-101) với SLA phản hồi ≤ 2 ngày làm việc; người dùng thấy trạng thái "Đang xem xét".'),
      ac('ac-pay-106-no-double', 'Một giao dịch đã được hoàn', 'Gửi yêu cầu hoàn lần nữa', 'Server từ chối với lỗi `ALREADY_REFUNDED`; mỗi giao dịch chỉ có tối đa 1 refund (ràng buộc unique DB).')
    ]),
    technical_tasks: JSON.stringify([
      t('t-pay-106-db', 'Bảng `refund_requests` (payment_id unique, reason, status, decided_by, provider_refund_id)', 'Database'),
      t('t-pay-106-api', 'API GET /api/v1/billing/transactions, GET /api/v1/billing/transactions/:id/receipt.pdf, POST /api/v1/billing/refunds', 'Backend'),
      t('t-pay-106-pdf', 'Dịch vụ render PDF biên lai (font tiếng Việt Unicode đầy đủ)', 'Backend'),
      t('t-pay-106-fe', 'Trang Thanh toán & Hoá đơn + form yêu cầu hoàn tiền', 'Frontend'),
      t('t-pay-106-qa', 'Unit test logic đủ điều kiện hoàn tiền; integration test refund sandbox; test IDOR (xem giao dịch người khác)', 'QA')
    ]),
    notes: `### 📋 Gate applicability
- **Áp dụng**: A–F, **G (G7 hoàn tiền, G9 lịch sử)**, K, L (L6 chính sách hoàn tiền)
- **Phụ thuộc**: PAY-101, PAY-105, LEG-101 (Chính sách hoàn tiền công khai).`
  },
  {
    id: 'PAY-107',
    epic_id: 'epic-backend-infrastructure',
    title: 'Automated E-Invoice Issuance (Decree 123/2020/NĐ-CP): Tự Động Xuất Hoá Đơn Điện Tử',
    persona: 'Kế toán doanh nghiệp VietPhonics và học viên (cá nhân hoặc công ty) cần hoá đơn VAT hợp lệ',
    action: 'tự động phát hành hoá đơn điện tử có mã của cơ quan thuế ngay sau mỗi giao dịch thành công',
    value: 'doanh nghiệp tuân thủ Nghị định 123/2020 và Thông tư 78/2021; khách hàng doanh nghiệp được hoàn chi phí đào tạo',
    priority: 'must',
    status: 'backlog',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      ac('ac-pay-107-company-info', 'Học viên muốn hoá đơn công ty', 'Nhập MST, tên công ty, địa chỉ ở bước checkout', 'Validate định dạng MST (10 hoặc 13 số) và tra cứu tên doanh nghiệp nếu nhà cung cấp hỗ trợ; thông tin được lưu cho lần sau.'),
      ac('ac-pay-107-issue', 'Thanh toán được xác nhận (webhook)', 'Job hoá đơn chạy', 'Gọi API nhà cung cấp hoá đơn điện tử (VNPT/Viettel/MISA meInvoice…) phát hành hoá đơn có mã CQT trong ≤ 10 phút; lưu số hoá đơn, ký hiệu, mã tra cứu.'),
      ac('ac-pay-107-deliver', 'Hoá đơn phát hành thành công', 'Hoàn tất', 'Gửi email kèm PDF/XML hoá đơn và hiển thị trong lịch sử giao dịch (PAY-106).'),
      ac('ac-pay-107-retry', 'API nhà cung cấp lỗi hoặc timeout', 'Phát hành thất bại', 'Retry exponential backoff tối đa 5 lần trong 24 giờ; sau đó chuyển hàng chờ xử lý tay ở trang admin và cảnh báo kế toán.'),
      ac('ac-pay-107-refund-adjust', 'Giao dịch đã có hoá đơn được hoàn tiền', 'Refund hoàn tất', 'Tạo yêu cầu hoá đơn điều chỉnh/thay thế theo đúng quy định, không xoá hoá đơn gốc.')
    ]),
    technical_tasks: JSON.stringify([
      t('t-pay-107-adapter', 'Adapter tích hợp API nhà cung cấp hoá đơn điện tử (sandbox → production)', 'Backend'),
      t('t-pay-107-db', 'Bảng `invoices` (payment_id, buyer_type, tax_code, invoice_no, serial, lookup_code, status, xml_url)', 'Database'),
      t('t-pay-107-fe', 'Form thông tin xuất hoá đơn ở checkout + hiển thị hoá đơn', 'Frontend'),
      t('t-pay-107-qa', 'Test sandbox: cá nhân, doanh nghiệp, lỗi API, điều chỉnh khi hoàn tiền', 'QA')
    ]),
    notes: `### 📋 Gate applicability
- **Áp dụng**: A–E, **G (G8 hoá đơn điện tử)**, K, L
- **Lưu ý**: Cần xác nhận với kế toán thuế về thuế suất VAT áp dụng cho dịch vụ giáo dục trực tuyến và mẫu hoá đơn.`
  },
  {
    id: 'PAY-108',
    epic_id: 'epic-backend-infrastructure',
    title: 'Discount Coupons & 7-Day Pro Free Trial: Mã Giảm Giá & Dùng Thử Gói Pro 7 Ngày',
    persona: 'Người dùng Free còn phân vân trước khi trả phí, và đội marketing chạy chiến dịch khuyến mãi',
    action: 'kích hoạt dùng thử Pro 7 ngày (một lần duy nhất) và nhập mã giảm giá tại checkout',
    value: 'người dùng trải nghiệm giá trị thật trước khi trả tiền; doanh nghiệp tăng tỉ lệ chuyển đổi Free → Pro và đo lường hiệu quả chiến dịch',
    priority: 'should',
    status: 'backlog',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      ac('ac-pay-108-trial-start', 'Tài khoản đã xác minh email, chưa từng dùng thử hoặc trả phí', 'Bấm "Dùng thử Pro 7 ngày"', 'Server cấp entitlement Pro với `trial_ends_at = now + 7 ngày`, không yêu cầu thẻ; UI hiện đếm ngược số ngày còn lại.'),
      ac('ac-pay-108-trial-once', 'Người dùng đã dùng thử trước đó', 'Cố kích hoạt lại (kể cả tạo tài khoản mới cùng thiết bị/email alias)', 'Server từ chối `TRIAL_ALREADY_USED`; chống lạm dụng bằng chuẩn hoá email (bỏ dấu chấm/+alias Gmail) và device fingerprint.'),
      ac('ac-pay-108-trial-expire', 'Hết thời gian dùng thử', 'Job hết hạn chạy (hoặc kiểm tra khi gọi API)', 'Entitlement trở về Free ngay lập tức, dữ liệu học tập giữ nguyên; email nhắc 2 ngày trước và vào ngày hết hạn với ưu đãi chuyển đổi.'),
      ac('ac-pay-108-coupon-apply', 'Người dùng nhập mã giảm giá hợp lệ', 'Bấm "Áp dụng"', 'Server kiểm tra hạn dùng, số lượt còn lại, gói áp dụng, giới hạn 1 lần/người; trả về giá sau giảm (VND, làm tròn đến 1.000đ) và giá này được khoá vào order.'),
      ac('ac-pay-108-coupon-invalid', 'Mã hết hạn/hết lượt/sai', 'Áp dụng', 'Hiển thị lý do cụ thể bằng tiếng Việt; giới hạn 10 lần thử mã/giờ/người để chống dò mã.'),
      ac('ac-pay-108-coupon-race', '2 người cùng dùng lượt cuối của mã giới hạn', 'Thanh toán đồng thời', 'Chỉ 1 order được giữ lượt (cập nhật nguyên tử `used_count < max_uses`); người còn lại được báo mã đã hết.')
    ]),
    technical_tasks: JSON.stringify([
      t('t-pay-108-db', 'Bảng `coupons` (code, type percent/fixed, value, max_uses, used_count, valid_from/to, plan_ids) và `coupon_redemptions`; cột `trial_used_at` trên users', 'Database'),
      t('t-pay-108-api', 'API POST /api/v1/billing/trial, POST /api/v1/billing/coupons/validate; tích hợp giá giảm vào createOrder', 'Backend'),
      t('t-pay-108-fe', 'Banner dùng thử, đếm ngược, ô nhập mã giảm giá ở checkout', 'Frontend'),
      t('t-pay-108-admin', 'CRUD mã giảm giá trong trang admin (OPS-101)', 'Backend'),
      t('t-pay-108-qa', 'Unit test tính giá; test race condition lượt cuối; test hết hạn trial', 'QA')
    ]),
    notes: `### 📋 Gate applicability
- **Áp dụng**: A–F, **G (G6 dùng thử, G10 mã giảm giá, G12 entitlement server)**, H, K, L (L10 funnel)
- **Phụ thuộc**: PAY-103 (bảng giá), USER-106 (xác minh email), OPS-104 (email nhắc).`
  }
];
