// Missing mandatory stories from docs/USER_STORY_QUALITY_CHECKLIST.md — Section 15
// Groups: Tài khoản (Gate F) & Thanh toán (Gate G)
// All stories start in 'backlog' — no implementation evidence exists yet.

const ac = (id, given, when, then) => ({ id, given, when, then, completed: false });
const t = (id, title, category) => ({ id, title, category, completed: false });

export const accountBillingStories = [
  // ───────────────────────────── TÀI KHOẢN ─────────────────────────────
  {
    id: 'USER-106',
    epic_id: 'epic-backend-infrastructure',
    title: 'Email Sign-Up & Verification: Đăng Ký Bằng Email & Xác Minh Kích Hoạt Tài Khoản',
    persona: 'Người học Việt Nam không dùng tài khoản Google (hoặc muốn tách email học tập riêng)',
    action: 'đăng ký tài khoản bằng email + mật khẩu và xác minh email qua liên kết/mã OTP trước khi dùng các tính năng trả phí',
    value: 'có tài khoản an toàn, khôi phục được, và hệ thống đảm bảo mỗi email là thật để gửi hoá đơn, báo cáo tuần và thông báo bảo mật',
    priority: 'must',
    status: 'backlog',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      ac('ac-user-106-signup-happy', 'Khách truy cập nhập email hợp lệ, mật khẩu ≥ 10 ký tự (có chữ và số) và tick đồng ý Điều khoản (LEG-101)', 'Bấm "Tạo tài khoản"', 'Server tạo user trạng thái `pending_verification`, băm mật khẩu bằng Argon2id (m=64MB, t=3) hoặc bcrypt cost ≥ 12, gửi email xác minh trong ≤ 60 giây và hiển thị màn hình "Kiểm tra hộp thư" bằng tiếng Việt.'),
      ac('ac-user-106-verify-link', 'Người dùng mở liên kết xác minh trong email', 'Token còn hạn (≤ 24 giờ) và chưa được dùng', 'Tài khoản chuyển sang `active`, token bị vô hiệu hoá (single-use), người dùng được đăng nhập và chuyển thẳng tới bài chẩn đoán 3 phút (ELSA-102).'),
      ac('ac-user-106-expired', 'Liên kết đã hết hạn hoặc đã dùng', 'Người dùng mở liên kết', 'Hiển thị "Liên kết đã hết hạn" kèm nút "Gửi lại email"; gửi lại bị giới hạn 3 lần/giờ/email.'),
      ac('ac-user-106-duplicate', 'Email đã tồn tại trong hệ thống', 'Có người đăng ký lại bằng email đó', 'Giao diện trả cùng một thông báo trung tính như khi thành công (chống dò email — user enumeration); chủ email nhận thư "Bạn đã có tài khoản, đăng nhập tại đây".'),
      ac('ac-user-106-unverified-gate', 'Tài khoản chưa xác minh', 'Người dùng cố mở trang thanh toán Pro', 'API trả 403 `EMAIL_NOT_VERIFIED`; UI hiện banner yêu cầu xác minh. Free tier vẫn được luyện tối đa quota Free.'),
      ac('ac-user-106-abuse', 'Bot gửi hàng loạt yêu cầu đăng ký', 'Vượt 5 lần đăng ký/IP/10 phút', 'Server trả 429 và yêu cầu Cloudflare Turnstile/CAPTCHA; email dùng một lần (disposable) bị từ chối theo blocklist.')
    ]),
    technical_tasks: JSON.stringify([
      t('t-user-106-db', 'Thêm cột `email_verified_at`, `status` vào `users`; bảng `email_verification_tokens` (token_hash SHA-256, expires_at, used_at)', 'Database'),
      t('t-user-106-api', 'API POST /api/v1/auth/register, POST /api/v1/auth/verify-email, POST /api/v1/auth/resend-verification', 'Backend'),
      t('t-user-106-mail', 'Tích hợp nhà cung cấp email (Resend/SES) + template tiếng Việt, cấu hình SPF/DKIM/DMARC', 'DevOps'),
      t('t-user-106-fe', 'Form đăng ký có kiểm tra độ mạnh mật khẩu, màn hình "Kiểm tra hộp thư", trạng thái lỗi/hết hạn', 'Frontend'),
      t('t-user-106-qa', 'Integration test: đăng ký → xác minh → token tái sử dụng bị từ chối; test enumeration & rate limit', 'QA')
    ]),
    notes: `### 📋 Gate applicability
- **Áp dụng**: A, B, C, D, E, F (🔴 F1, F3, F7, F8), K, L (L6 consent khi đăng ký)
- **Bổ sung cho**: USER-101 (đăng nhập Google) — checklist Mục 15 đánh dấu ⚠️ do thiếu AC xác minh email.
- **Phụ thuộc**: LEG-101 (checkbox đồng ý điều khoản), OPS-104 (gửi email).
- **Definition of Done**: Test tích hợp xanh trên CI, email đến hộp thư Gmail/Outlook không vào spam.`
  },
  {
    id: 'USER-103',
    epic_id: 'epic-backend-infrastructure',
    title: 'Forgot & Reset Password: Quên Mật Khẩu & Đặt Lại An Toàn Qua Email',
    persona: 'Học viên trả phí quên mật khẩu khi chuyển sang thiết bị mới',
    action: 'yêu cầu liên kết đặt lại mật khẩu qua email và đặt mật khẩu mới',
    value: 'lấy lại quyền truy cập trong vòng 2 phút mà không cần liên hệ hỗ trợ, đồng thời không mở ra lỗ hổng chiếm tài khoản',
    priority: 'must',
    status: 'backlog',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      ac('ac-user-103-request', 'Người dùng nhập email ở màn "Quên mật khẩu"', 'Bấm "Gửi liên kết"', 'Luôn hiện cùng thông báo "Nếu email tồn tại, bạn sẽ nhận được liên kết" (chống dò email); nếu email tồn tại, gửi liên kết trong ≤ 60 giây.'),
      ac('ac-user-103-token', 'Liên kết đặt lại được sinh ra', 'Server lưu token', 'Token ngẫu nhiên ≥ 32 byte, chỉ lưu bản băm SHA-256, hết hạn sau 30 phút và chỉ dùng được 1 lần; yêu cầu mới làm vô hiệu token cũ.'),
      ac('ac-user-103-reset', 'Người dùng mở liên kết còn hạn và nhập mật khẩu mới hợp lệ', 'Bấm "Đặt lại"', 'Mật khẩu được băm lại bằng Argon2id/bcrypt, **toàn bộ phiên và refresh token khác bị thu hồi**, gửi email thông báo "Mật khẩu của bạn vừa được thay đổi" kèm liên kết khoá tài khoản nếu không phải bạn.'),
      ac('ac-user-103-throttle', 'Kẻ tấn công spam yêu cầu đặt lại', 'Vượt 3 yêu cầu/email/giờ hoặc 10 yêu cầu/IP/giờ', 'Server trả 429 với `Retry-After`, không gửi thêm email, ghi log bảo mật.'),
      ac('ac-user-103-google-only', 'Tài khoản chỉ đăng nhập bằng Google (không có mật khẩu)', 'Yêu cầu đặt lại mật khẩu', 'Email gửi đi hướng dẫn "Tài khoản của bạn đăng nhập bằng Google" thay vì liên kết đặt lại.')
    ]),
    technical_tasks: JSON.stringify([
      t('t-user-103-db', 'Bảng `password_reset_tokens` (user_id, token_hash, expires_at, used_at, ip)', 'Database'),
      t('t-user-103-api', 'API POST /api/v1/auth/forgot-password và POST /api/v1/auth/reset-password; thu hồi session sau reset', 'Backend'),
      t('t-user-103-fe', 'Màn "Quên mật khẩu" + "Đặt mật khẩu mới" với đồng hồ đếm hết hạn & trạng thái lỗi tiếng Việt', 'Frontend'),
      t('t-user-103-qa', 'Test: token hết hạn, token dùng lại, token cũ sau khi yêu cầu mới, session bị thu hồi', 'QA')
    ]),
    notes: `### 📋 Gate applicability
- **Áp dụng**: A, B, C, D, E, F (🔴 F3, F6, F7, F8), K (K6 luồng lỗi)
- **Phụ thuộc**: USER-106 (tài khoản email), OPS-104 (gửi email).`
  },
  {
    id: 'USER-104',
    epic_id: 'epic-backend-infrastructure',
    title: 'Profile & Active Device Management: Quản Lý Hồ Sơ & Thiết Bị Đăng Nhập (Tối Đa 2 Phiên Đồng Thời)',
    persona: 'Học viên Pro dùng cả điện thoại và laptop, lo ngại bị chia sẻ tài khoản trái phép',
    action: 'chỉnh sửa hồ sơ (tên, vùng miền giọng, mục tiêu học) và xem/đăng xuất từ xa các thiết bị đang đăng nhập',
    value: 'kiểm soát bảo mật tài khoản của mình, đồng thời giúp doanh nghiệp hạn chế chia sẻ tài khoản Pro làm thất thoát doanh thu',
    priority: 'must',
    status: 'backlog',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      ac('ac-user-104-edit-profile', 'Học viên mở trang "Hồ sơ"', 'Thay đổi tên hiển thị, vùng miền (Bắc/Trung/Nam), mục tiêu (IELTS/Công việc/Giao tiếp) và lưu', 'Server validate (tên 2–50 ký tự, enum hợp lệ), lưu trong ≤ 200ms P95; thay đổi vùng miền kích hoạt hiệu chỉnh lại hồ sơ L1 (ELSA-102).'),
      ac('ac-user-104-device-list', 'Học viên mở tab "Thiết bị"', 'Trang tải xong', 'Hiển thị danh sách phiên: loại thiết bị, trình duyệt, thành phố ước tính (theo IP), thời điểm hoạt động cuối; phiên hiện tại được đánh dấu "Thiết bị này".'),
      ac('ac-user-104-revoke', 'Có phiên lạ trong danh sách', 'Bấm "Đăng xuất thiết bị này"', 'Refresh token của phiên bị thu hồi ngay; access token hết hiệu lực trong ≤ 15 phút (TTL) hoặc ngay lập tức nếu kiểm tra denylist Redis.'),
      ac('ac-user-104-limit-pro', 'Tài khoản đã có 2 phiên đang hoạt động (Free: 1 thiết bị luyện cùng lúc, Pro: 2)', 'Đăng nhập trên thiết bị thứ 3', 'Hiển thị hộp thoại chọn phiên cần đăng xuất; không tự động huỷ phiên cũ khi chưa có xác nhận.'),
      ac('ac-user-104-change-email', 'Học viên đổi email', 'Gửi yêu cầu đổi', 'Yêu cầu nhập lại mật khẩu, gửi xác minh tới email mới và thông báo tới email cũ; email chỉ đổi sau khi xác minh.')
    ]),
    technical_tasks: JSON.stringify([
      t('t-user-104-db', 'Bảng `user_sessions` (id, user_id, refresh_token_hash, user_agent, ip, last_seen_at, revoked_at) + index (user_id, revoked_at)', 'Database'),
      t('t-user-104-api', 'API GET/PATCH /api/v1/me, GET /api/v1/me/sessions, DELETE /api/v1/me/sessions/:id', 'Backend'),
      t('t-user-104-limit', 'Middleware kiểm tra số phiên theo gói (entitlement từ subscription, không tin client)', 'Backend'),
      t('t-user-104-fe', 'Trang Hồ sơ + tab Thiết bị, hộp thoại giới hạn phiên', 'Frontend'),
      t('t-user-104-qa', 'Test: đăng nhập thiết bị thứ 3, thu hồi phiên, token bị thu hồi gọi API trả 401', 'QA')
    ]),
    notes: `### 📋 Gate applicability
- **Áp dụng**: A–F, G (G12 entitlement phía server), K
- **Rủi ro**: Định vị IP chỉ mang tính ước tính — ghi rõ "Vị trí gần đúng" trên UI.`
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
    priority: 'should',
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
    notes: `### 📋 Gate applicability
- **Áp dụng**: A–F, **G (🔴 G2, G3, G4, G5, G12)**, J, K (K6 webhook trùng), L
- **Phụ thuộc**: PAY-101, ARCH-103 (reconciler đối soát), PAY-107 (hoá đơn điện tử sau thanh toán).
- **Ghi chú**: Cần hợp đồng merchant với từng cổng — tiến độ phụ thuộc thủ tục pháp lý doanh nghiệp.`
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
