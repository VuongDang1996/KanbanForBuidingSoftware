export const backendStories = [
  {
    id: 'ARCH-101',
    epic_id: 'epic-backend-infrastructure',
    title: 'Relational Database Schema Design for Users, Phoneme Scoring & Subscriptions (PostgreSQL): Thiết Kế Cơ Sở Dữ Liệu Quan Hệ Chuẩn Hóa Cho 5,000 Người Dùng Đồng Thời',
    persona: 'Kỹ sư cơ sở dữ liệu và kiến trúc sư hệ thống phụ trách đảm bảo tính toàn vẹn dữ liệu và hiệu năng truy vấn cho 5,000 người học đồng thời',
    action: 'thiết kế lược đồ cơ sở dữ liệu PostgreSQL chuẩn hóa bậc 3 (3NF) với các bảng users, subscriptions, phoneme_scores, practice_sessions và error_bank, tích hợp phân vùng (partitioning) và chỉ mục hợp lý',
    value: 'đảm bảo độ tin cậy tuyệt đối (ACID) cho dữ liệu thanh toán và tiến độ học tập, duy trì thời gian thực thi truy vấn P95 < 25ms ngay cả khi bảng điểm số đạt hàng triệu bản ghi',
    priority: 'must',
    status: 'in-progress',
    size: 'XL',
    points: 13,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-arch-101-schema-design',
        given: 'Hệ thống cần lưu trữ thông tin tài khoản, gói thuê bao và chi tiết từng âm vị được chấm điểm',
        when: 'Triển khai migration khởi tạo cơ sở dữ liệu',
        then: 'Lược đồ hoàn chỉnh gồm 8 bảng quan hệ có khóa ngoại ON DELETE CASCADE hợp lý, kiểu dữ liệu tối ưu (UUIDv7 cho ID phân tán, JSONB cho metadata âm học, TIMESTAMPTZ cho thời gian theo chuẩn UTC).',
        completed: true
      },
      {
        id: 'ac-arch-101-ui',
        given: 'Giao diện bảng điều khiển quản trị viên Admin Database Metrics View',
        when: 'Quản trị viên theo dõi trạng thái cơ sở dữ liệu',
        then: 'Hiển thị sơ đồ quan hệ thực thể (ERD) tương tác, số lượng kết nối đang mở (Active Connections / Pool Size), dung lượng bảng và tỷ lệ Cache Hit Ratio luôn hiển thị >99% bằng phông chữ JetBrains Mono trên nền tối Slate-900.',
        completed: true
      },
      {
        id: 'ac-arch-101-scale-5000',
        given: '5,000 người dùng tích cực cùng ghi điểm phát âm và đọc lộ trình học',
        when: 'Hệ thống đối mặt với lưu lượng 1,500 truy vấn ghi/giây và 5,000 truy vấn đọc/giây',
        then: 'Cấu hình PgBouncer connection pooling với Transaction Mode (pool size 50 kết nối vật lý), phân vùng bảng phoneme_scores theo tháng (Range Partitioning by created_at), đảm bảo CPU PostgreSQL dưới 45%.',
        completed: true
      },
      {
        id: 'ac-arch-101-l1',
        given: 'Bảng từ điển âm vị phoneme_dictionary',
        when: 'Truy vấn bảng đối chiếu âm lỗi đặc trưng của người Việt',
        then: 'Bảng lưu trữ trường l1_vietnamese_difficulty_tier (1 đến 5) và dialect_risk_tag (Bac, Trung, Nam) giúp hệ thống lọc nhanh các bài luyện phù hợp theo từng giọng địa phương.',
        completed: true
      },
      {
        id: 'ac-arch-101-a11y',
        given: 'Đảm bảo khả năng phục hồi dữ liệu khi có thảm họa (Disaster Recovery)',
        when: 'Có sự cố sập node database chính',
        then: 'Hệ thống tự động kích hoạt cơ chế tự phục hồi (Automatic Failover) sang bản sao Streaming Replication Standby trong vòng dưới 30 giây với RPO = 0 (không mất bất kỳ giao dịch nào).',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-arch-101-migration', title: 'Viết file migration DDL tạo toàn bộ 8 bảng PostgreSQL kèm trigger tự động cập nhật trường updated_at', category: 'Backend', completed: true },
      { id: 't-arch-101-partition', title: 'Triển khai phân vùng tự động (Auto Partitioning) cho bảng phoneme_scores theo từng tháng với pg_partman', category: 'Backend', completed: true },
      { id: 't-arch-101-pgbouncer', title: 'Cấu hình PgBouncer kết hợp Prisma/Kysely connection pool tối ưu cho 5,000 concurrent sessions', category: 'DevOps/Scale', completed: true },
      { id: 't-arch-101-index', title: 'Tạo compound index trên (user_id, phoneme_symbol) và (user_id, created_at DESC) để tăng tốc độ truy vấn lịch sử', category: 'Backend', completed: true },
      { id: 't-arch-101-qa', title: 'Chạy công cụ pgbench mô phỏng 5,000 client đồng thời kiểm tra TPS đạt tối thiểu 2,500 transaction/sec', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design System Specifications
- **Màn hình tham chiếu**: \`src/ui-reference/admin_dashboard_metrics/code.html\`
- **Lược đồ Bảng Cơ Bản**:
  - \`users\` (id UUID PK, email, full_name, dialect, tier, created_at)
  - \`subscriptions\` (id UUID PK, user_id FK, plan_id, status, current_period_end)
  - \`practice_sessions\` (id UUID PK, user_id FK, module_id, overall_score, duration_sec)
  - \`phoneme_scores\` (id BIGSERIAL, session_id FK, user_id FK, phoneme, score, audio_url, created_at) PARTITION BY RANGE (created_at)
  - \`error_bank\` (id UUID PK, user_id FK, word, target_ipa, easiness_factor, interval_days, next_review_at).`
  },
  {
    id: 'ARCH-102',
    epic_id: 'epic-backend-infrastructure',
    title: 'Asynchronous Audio Ingestion & GPU Worker Queue Pipeline (FastAPI + Redis + FFmpeg): Đường Ống Nạp Âm Thanh Bất Đồng Bộ & Hàng Đợi Worker GPU',
    persona: 'Kỹ sư Machine Learning và hạ tầng AI phụ trách xử lý hàng ngàn file ghi âm tiếng Anh của học viên mà không làm tắc nghẽn máy chủ',
    action: 'nhận luồng file âm thanh từ máy khách, đẩy vào hàng đợi BullMQ/Celery và phân bổ cho các worker GPU chạy Whisper/Kaldi trích xuất đặc trưng ngữ âm',
    value: 'ngăn chặn tình trạng treo máy chủ khi có lượng lớn người dùng cùng nộp bài ghi âm, đảm bảo thời gian xử lý và trả kết quả chấm điểm luôn dưới 650ms',
    priority: 'must',
    status: 'in-progress',
    size: 'XL',
    points: 13,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-arch-102-ingestion-flow',
        given: 'Học viên nộp đoạn ghi âm giọng nói định dạng WebM/Opus hoặc WAV',
        when: 'API Ingestion Endpoint tiếp nhận file',
        then: 'Hệ thống kiểm tra tính hợp lệ trong 15ms, sinh job_id duy nhất, đẩy tác vụ vào hàng đợi Redis Queue và trả về mã HTTP 202 Accepted kèm URL kiểm tra kết quả ngay lập tức.',
        completed: true
      },
      {
        id: 'ac-arch-102-ui',
        given: 'Giao diện hàng đợi AI Queue Telemetry Dashboard',
        when: 'Kỹ sư hạ tầng giám sát hệ thống',
        then: 'Hiển thị đồ thị thời gian thực về số lượng tác vụ đang chờ (Queue Depth), thời gian chờ trung bình (Wait Time), tỷ lệ GPU VRAM sử dụng và thông lượng bài chấm/phút theo giao diện Dark Mode phong cách Grafana chuyên nghiệp.',
        completed: true
      },
      {
        id: 'ac-arch-102-scale-5000',
        given: '5,000 học viên cùng bấm gửi bài chấm phát âm trong giờ làm bài tập trên lớp',
        when: 'Hàng đợi nạp dồn dập 200 file âm thanh/giây',
        then: 'Cơ chế Auto-scaling (KEDA / Kubernetes HPA) tự động mở rộng từ 2 lên tối đa 16 GPU workers, duy trì P95 thời gian chờ trong hàng đợi < 400ms và không có bản ghi nào bị rơi rớt (0% dropped jobs).',
        completed: true
      },
      {
        id: 'ac-arch-102-l1',
        given: 'Worker âm thanh chạy tiền xử lý FFmpeg',
        when: 'Chuẩn hóa định dạng âm thanh đầu vào',
        then: 'Tự động chuyển đổi mẫu về chuẩn PCM Mono 16kHz 16-bit và cắt lọc khoảng lặng đầu cuối (Silence Trimming -50dB) nhằm tối ưu độ chính xác nhận diện âm tắc vô thanh /p, t, k/ của học viên Việt.',
        completed: true
      },
      {
        id: 'ac-arch-102-a11y',
        given: 'Sự cố kết nối mạng của worker AI',
        when: 'Một worker gặp lỗi phân tích hoặc timeout 5 giây',
        then: 'Job tự động được trả về hàng đợi thử lại (Dead Letter Queue với cơ chế Exponential Backoff 3 lần), client nhận thông báo lỗi chi tiết thay vì bị treo vô hạn.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-arch-102-fastapi', title: 'Xây dựng API Ingestion hiệu năng cao bằng FastAPI với streaming upload và xác thực chữ ký audio header', category: 'Backend', completed: true },
      { id: 't-arch-102-queue', title: 'Thiết lập cụm Redis BullMQ cluster phân tán với phân luồng ưu tiên (VIP Pro > Standard Free)', category: 'Backend', completed: true },
      { id: 't-arch-102-ffmpeg', title: 'Tích hợp FFmpeg C-binding xử lý chuẩn hóa audio PCM 16kHz mono trong bộ nhớ RAM (In-Memory Buffer)', category: 'Audio/DSP', completed: true },
      { id: 't-arch-102-keda', title: 'Viết cấu hình Kubernetes ScaledObject (KEDA) tự động tăng giảm GPU worker pods dựa trên Redis queue length', category: 'DevOps/Scale', completed: true },
      { id: 't-arch-102-qa', title: 'Chạy kịch bản kiểm thử tải Locust mô phỏng 5,000 user gửi đồng thời 10,000 file âm thanh trong 5 phút', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design System Specifications
- **Màn hình tham chiếu**: \`src/ui-reference/admin_dashboard_metrics/code.html\`
- **Kiến trúc luồng xử lý**:
  - \`Client\` -> \`FastAPI Ingestion\` -> Trả HTTP 202 JobID trong 20ms
  - Đẩy vào Redis BullMQ \`queue:audio_scoring:priority\`
  - \`GPU Worker (ONNX Runtime / TensorRT)\` lấy job -> Whisper CTC Alignment -> Trả điểm về Redis Pub/Sub
  - \`Client\` nhận kết quả qua Server-Sent Events (SSE) hoặc WebSocket.`
  },
  {
    id: 'ARCH-103',
    epic_id: 'epic-backend-infrastructure',
    title: 'Multi-Gateway Subscription Billing & Webhook Reconciler (Cổng Thanh Toán Tự Động VNPay, MoMo & Stripe): Bộ Đối Soát Giao Dịch & Thanh Toán Đa Cổng',
    persona: 'Trưởng bộ phận tài chính và kỹ sư backend thanh toán cần đảm bảo dòng tiền từ học viên được ghi nhận chuẩn xác 100%',
    action: 'tích hợp cổng thanh toán nội địa (MoMo, VNPay) cho người dùng Việt Nam và thẻ quốc tế (Stripe) cho người dùng kiều bào, tự động đối soát giao dịch qua Webhook',
    value: 'tạo sự thuận tiện tối đa cho học viên khi chi trả bằng phương thức quen thuộc nhất, loại bỏ hoàn toàn sai sót đối soát thủ công và giảm tỷ lệ giao dịch thất bại xuống dưới 1%',
    priority: 'must',
    status: 'in-progress',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-arch-103-payment-flow',
        given: 'Học viên chọn mua gói Pro 1 tháng (30,000đ)',
        when: 'Chọn phương thức MoMo, VNPay hoặc Thẻ Quốc Tế',
        then: 'Hệ thống sinh URL thanh toán an toàn có mã hóa chữ ký số HMAC-SHA256, điều hướng mượt mà hoặc hiển thị QR thanh toán ngay trên màn hình.',
        completed: true
      },
      {
        id: 'ac-arch-103-ui',
        given: 'Giao diện chọn cổng thanh toán PaymentGatewaySelector',
        when: 'Học viên xem các lựa chọn',
        then: 'Logo VNPay, MoMo và Stripe hiển thị sắc nét với tỷ lệ vàng, thẻ phương thức có viền sáng khi được chọn, hiển thị rõ ràng số tiền "30.000 đ" định dạng chuẩn Việt Nam, bảo mật SSL 256-bit được chứng nhận bằng huy hiệu khóa xanh an tâm.',
        completed: true
      },
      {
        id: 'ac-arch-103-scale-5000',
        given: 'Hàng ngàn giao dịch mua gói phát sinh trong các đợt khuyến mãi Back-To-School',
        when: 'Các cổng thanh toán gửi hàng loạt webhook thông báo giao dịch thành công',
        then: 'Hệ thống đối soát sử dụng cơ chế Idempotency Key (khóa giao dịch chống trùng lặp), ghi nhận giao dịch thành công và nâng cấp tài khoản chỉ trong 120ms mà không bao giờ bị cộng thừa ngày sử dụng.',
        completed: true
      },
      {
        id: 'ac-arch-103-l1',
        given: 'Giao dịch qua các ngân hàng nội địa Việt Nam',
        when: 'Tạo mã đơn hàng thanh toán',
        then: 'Nội dung chuyển khoản được sinh ngắn gọn dạng "VP [UserID]" giúp đối soát tự động chính xác tuyệt đối ngay cả khi học viên gõ thiếu dấu tiếng Việt.',
        completed: true
      },
      {
        id: 'ac-arch-103-a11y',
        given: 'Xử lý lỗi khi cổng thanh toán bảo trì',
        when: 'Một cổng thanh toán gặp sự cố gián đoạn kết nối',
        then: 'Hệ thống tự động hiển thị gợi ý thông minh chuyển sang cổng thanh toán thay thế khả dụng mà không làm học viên phải điền lại thông tin từ đầu.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-arch-103-gateways', title: 'Tích hợp SDK MoMo API v2, VNPay Payment Sandbox/Production và Stripe Elements', category: 'Backend', completed: true },
      { id: 't-arch-103-webhook', title: 'Xây dựng Webhook Reconciler Engine kiểm tra chữ ký số HMAC-SHA256 bảo vệ chống giả mạo giao dịch', category: 'Backend', completed: true },
      { id: 't-arch-103-idempotent', title: 'Thiết kế bảng payment_transactions với Unique Constraint trên transaction_reference bảo vệ tính Idempotent', category: 'Backend', completed: true },
      { id: 't-arch-103-scale', title: 'Tối ưu hóa khả năng chịu tải của Webhook Receiver đáp ứng 500 webhooks/giây không gây nghẽn kết nối DB', category: 'DevOps/Scale', completed: true },
      { id: 't-arch-103-qa', title: 'Viết test suite mô phỏng các kịch bản: thanh toán thành công, người dùng hủy, timeout, và webhook gửi lặp 3 lần', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design System Specifications
- **Màn hình tham chiếu**: \`src/ui-reference/m_n_h_nh_ch_n_g_i_v_thanh_to_n_qr_code/code.html\`
- **React Component**: \`vietphonics-app/src/components/subscription/PaymentGatewaySelector.jsx\`
- **Idempotency Strategy**:
  - Header: \`X-Idempotency-Key\` lưu trong Redis với TTL 24 giờ.
  - Khi webhook gửi lặp lại: Trả ngay HTTP 200 OK với body kết quả đã lưu trong bộ nhớ đệm mà không thực hiện trừ tiền hay gia hạn lần hai.`
  },
  {
    id: 'ARCH-104',
    epic_id: 'epic-backend-infrastructure',
    title: 'Tiered Quota Limiter & Entitlement Enforcement Middleware (Hạn Mức Sử Dụng Gói Free vs Pro 5,000 Users): Lớp Middleware Kiểm Soát Hạn Mức Phân Tầng',
    persona: 'Đội ngũ kỹ thuật vận hành cần bảo vệ hệ thống khỏi các hành vi lạm dụng cào dữ liệu (scraping) hoặc tấn công DDoS',
    action: 'triển khai lớp middleware kiểm tra quyền hạn (Entitlement) và giới hạn tần suất gọi API (Rate Limiting) theo thuật toán Token Bucket / Sliding Window',
    value: 'bảo vệ tính khả dụng 99.99% của ứng dụng cho toàn bộ 5,000 người dùng, đồng thời đảm bảo người dùng trả phí Pro luôn được ưu tiên tài nguyên điện toán cao nhất',
    priority: 'must',
    status: 'in-progress',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-arch-104-quota-enforce',
        given: 'Học viên gói Free thực hiện bài luyện phát âm thứ 6 trong ngày',
        when: 'Request chạm vào API Gateway',
        then: 'Middleware chặn request trong vòng dưới 2ms, trả về mã lỗi HTTP 429 Too Many Requests kèm JSON Payload chứa chi tiết hạn mức và thời gian làm mới (resets_at: 00:00:00 GMT+7).',
        completed: true
      },
      {
        id: 'ac-arch-104-ui',
        given: 'Giao diện ứng dụng nhận mã lỗi 429 từ máy chủ',
        when: 'Xử lý phản hồi tại máy khách',
        then: 'Tự động mở cửa sổ thông báo nâng cấp ProPaywallModal với hiệu ứng trượt nhẹ nhàng, không gây crash ứng dụng hay màn hình trắng.',
        completed: true
      },
      {
        id: 'ac-arch-104-scale-5000',
        given: '5,000 người dùng liên tục gửi request kiểm tra từ điển và nộp bài',
        when: 'Middleware phân giải quyền hạn',
        then: 'Sử dụng Redis Cluster kết hợp Lua script chạy nguyên tử (Atomic Lua Script) để kiểm tra hạn mức trong bộ nhớ RAM, thời gian thực thi trung bình < 1.5ms, chịu tải 10,000 RPS.',
        completed: true
      },
      {
        id: 'ac-arch-104-l1',
        given: 'Học viên Pro muốn sử dụng các tính năng nâng cao (AI Khẩu Hình 3D, Golden Speaker)',
        when: 'Middleware kiểm tra cờ tính năng \`entitlements\`',
        then: 'Mở quyền truy cập không giới hạn, đồng thời cấp độ ưu tiên của tác vụ trong hàng đợi xử lý âm thanh được gán nhãn \`HIGH_PRIORITY\`.',
        completed: true
      },
      {
        id: 'ac-arch-104-a11y',
        given: 'Học viên kiểm tra số lượt học còn lại trong ngày',
        when: 'Xem thanh trạng thái tài khoản',
        then: 'Hiển thị huy hiệu rõ ràng: "Gói Miễn Phí: Còn 3/5 bài hôm nay", hỗ trợ tooltip giải thích khi rê chuột hoặc chạm vào.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-arch-104-lua', title: 'Viết Lua script cho Redis triển khai thuật toán Sliding Window Counter kiểm soát hạn mức phân tầng', category: 'Backend', completed: true },
      { id: 't-arch-104-mw', title: 'Xây dựng Fastify/Express Middleware entitlementGuard kiểm tra token JWT và quyền hạn gói Pro', category: 'Backend', completed: true },
      { id: 't-arch-104-headers', title: 'Bổ sung đầy đủ các header tiêu chuẩn RFC (X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset) vào mọi response', category: 'Backend', completed: true },
      { id: 't-arch-104-scale', title: 'Thiết lập Redis sentinel / replication đảm bảo module Rate Limiter luôn có tính sẵn sàng cao (High Availability)', category: 'DevOps/Scale', completed: true },
      { id: 't-arch-104-qa', title: 'Viết kiểm thử tự động bắn dồn dập 50 request trong 1 giây để kiểm tra tính chính xác của Lua script', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design System Specifications
- **Mã nguồn Middleware**: \`vietphonics-app/src/middleware/quotaLimiter.js\`
- **Hạn mức chuẩn**:
  - Free Tier: 5 bài học/ngày, 10 lượt tra cứu từ điển/phút, P95 timeout 5s
  - Pro Tier: Không giới hạn bài học, 120 lượt tra cứu/phút, P95 timeout 2s
- **Lua Script Strategy**:
  - Dùng \`redis.call('INCR', key)\` kết hợp \`redis.call('EXPIRE', key, ttl)\` để đảm bảo không rò rỉ khóa không thời hạn.`
  },
  {
    id: 'ARCH-105',
    epic_id: 'epic-backend-infrastructure',
    title: 'Cloud Object Storage & Ephemeral Audio Retention Lifecycle (Lưu Trữ Âm Thanh Cloudflare R2 Presigned URLs): Quản Lý Lưu Trữ Đám Mây & Vòng Đời Tệp Tạm',
    persona: 'Kỹ sư hạ tầng đám mây và chuyên gia bảo mật dữ liệu chịu trách nhiệm tối ưu chi phí lưu trữ và tuân thủ quy định bảo mật riêng tư',
    action: 'lưu trữ file âm thanh người dùng trên Cloudflare R2 thông qua cơ chế Presigned URLs trực tiếp từ trình duyệt, tự động xóa file tạm sau 24 giờ cho tài khoản Free',
    value: 'tiết kiệm 100% chi phí truyền tải dữ liệu (Zero Egress Fees), giảm tải băng thông máy chủ chính và ngăn ngừa nguy cơ phình to dung lượng ổ đĩa khi phục vụ 5,000 người dùng hàng ngày',
    priority: 'should',
    status: 'in-progress',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-arch-105-presigned-flow',
        given: 'Ứng dụng máy khách chuẩn bị tải lên bản ghi âm phát âm',
        when: 'Yêu cầu URL tải lên từ máy chủ',
        then: 'Hệ thống sinh Presigned PUT URL có thời hạn hiệu lực 5 phút; trình duyệt tải trực tiếp file âm thanh lên Cloudflare R2 mà không đi qua máy chủ API backend.',
        completed: true
      },
      {
        id: 'ac-arch-105-ui',
        given: 'Giao diện người dùng trong lúc tải file ghi âm',
        when: 'File đang được tải lên',
        then: 'Hiển thị thanh tiến trình tải lên mượt mà (0% -> 100%) viền Sky-500, không làm đơ giao diện người dùng và tự động chuyển sang trạng thái "Đang phân tích âm thanh" khi tải xong.',
        completed: true
      },
      {
        id: 'ac-arch-105-scale-5000',
        given: '5,000 người dùng tải lên trung bình 20 file ghi âm/ngày (tổng 100,000 file âm thanh/ngày tương đương 15GB dữ liệu mới)',
        when: 'Xử lý luồng tải lên và vòng đời tệp',
        then: 'Máy chủ backend hoàn toàn không tốn băng thông truyền file âm thanh; Cloudflare R2 Lifecycle Policy tự động dọn dẹp các tệp tạm sau 24 giờ đối với gói Free, đảm bảo chi phí lưu trữ luôn dưới 5$ mỗi tháng.',
        completed: true
      },
      {
        id: 'ac-arch-105-l1',
        given: 'Học viên Pro muốn lưu trữ các bản ghi âm kỷ niệm để theo dõi tiến trình 6 tháng',
        when: 'Hệ thống xử lý lưu trữ cho người dùng Pro',
        then: 'File được chuyển vào thư mục lưu trữ lâu dài \`archive/{user_id}/\` với chính sách bảo quản vĩnh viễn và mã hóa AES-256 ở trạng thái nghỉ (At-Rest Encryption).',
        completed: true
      },
      {
        id: 'ac-arch-105-a11y',
        given: 'Học viên yêu cầu xóa toàn bộ dữ liệu ghi âm cá nhân theo chuẩn quyền riêng tư',
        when: 'Bấm nút "Xóa lịch sử giọng nói của tôi" trong phần Cài đặt',
        then: 'Hệ thống gọi API xóa toàn bộ bucket prefix của người dùng trong 3 giây và gửi thông báo xác nhận minh bạch.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-arch-105-r2', title: 'Tích hợp AWS S3 SDK tương thích với Cloudflare R2 và viết hàm generatePresignedPutUrl', category: 'Backend', completed: true },
      { id: 't-arch-105-lifecycle', title: 'Cấu hình R2 Bucket Lifecycle Rules tự động xóa tiền tố uploads/temp/ sau 24 giờ', category: 'DevOps/Scale', completed: true },
      { id: 't-arch-105-upload', title: 'Xây dựng component DirectAudioUploader trên frontend hỗ trợ XMLHttpRequest progress và resume khi mất mạng', category: 'Frontend', completed: true },
      { id: 't-arch-105-cors', title: 'Thiết lập CORS an toàn trên Cloudflare R2 chỉ cho phép nguồn gốc xuất xứ domain của ứng dụng', category: 'DevOps/Scale', completed: true },
      { id: 't-arch-105-qa', title: 'Kiểm thử tải lên 100 file âm thanh song song và xác minh tính hợp lệ của chữ ký URL', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design System Specifications
- **Mã nguồn Upload Helper**: \`vietphonics-app/src/utils/audioUploader.js\`
- **Cấu trúc lưu trữ Cloudflare R2**:
  - Tạm thời (Free): \`audio-temp/{yyyy-mm-dd}/{user_id}/{record_id}.webm\` (TTL: 1 day)
  - Vĩnh viễn (Pro): \`audio-vault/{user_id}/{phoneme}/{record_id}.webm\` (Lifecycle: Keep forever)
- **Ưu thế Cloudflare R2**:
  - Chi phí Egress = 0$ (hoàn toàn miễn phí khi học viên tải lại file âm thanh để nghe)
  - Tương thích 100% với S3 API tiêu chuẩn.`
  },
  {
    id: 'PAY-101',
    epic_id: 'epic-backend-infrastructure',
    title: 'Dynamic VietQR Auto-Reconciliation Engine: Thuê Bao 30K Phí Giao Dịch 0% (SePay / OpenBanking Webhook): Động Cơ Đối Soát Tự Động VietQR 0% Phí',
    persona: 'Người sáng lập và đội ngũ tài chính muốn cung cấp gói học phí cực kỳ bình dân (30,000đ/tháng) mà không bị các cổng thanh toán khấu trừ 2-3% phí dịch vụ',
    action: 'sinh mã VietQR động theo chuẩn Napas 24/7 có sẵn số tiền và nội dung chuyển khoản mã hóa, tự động nhận diện giao dịch ngân hàng thành công qua SePay/OpenBanking Webhook',
    value: 'đạt tỷ lệ phí giao dịch 0% (tiết kiệm hàng chục triệu đồng mỗi tháng), kích hoạt tài khoản Pro tự động cho học viên chỉ sau 3-5 giây kể từ khi bấm chuyển tiền',
    priority: 'must',
    status: 'in-progress',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pay-101-vietqr-gen',
        given: 'Học viên chọn gói Pro 30,000đ/tháng',
        when: 'Hệ thống khởi tạo mã VietQR thanh toán',
        then: 'Hệ thống sinh mã QR chuẩn Napas 24/7 chứa sẵn số tài khoản ngân hàng thụ hưởng, đúng số tiền 30,000 VNĐ và nội dung chuyển khoản độc nhất (e.g., "VP 883921").',
        completed: true
      },
      {
        id: 'ac-pay-101-ui',
        given: 'Giao diện màn hình thanh toán VietQR Checkout View',
        when: 'Hiển thị mã QR cho học viên',
        then: 'Ảnh mã VietQR kích thước 240x240px sắc nét có logo ngân hàng chính thống ở tâm, khung quét bo góc hiện đại có tia quét radar chuyển động nhẹ, nút bấm một chạm "Sao chép số tài khoản" và "Sao chép số tiền" có thông báo Toast Toastification xác nhận tiện lợi.',
        completed: true
      },
      {
        id: 'ac-pay-101-scale-5000',
        given: 'Hàng trăm học viên cùng quét mã QR và chuyển khoản trong giờ vàng khuyến mại',
        when: 'Webhook ngân hàng (SePay / Casso / OpenBanking) gửi thông báo biến động số dư',
        then: 'Hệ thống đối soát phân tích cú pháp nội dung chuyển tiền bằng biểu thức chính quy (Regex Pattern Matching), tìm đúng user_id và nâng cấp tài khoản trong vòng dưới 80ms, xử lý được 200 webhook/giây.',
        completed: true
      },
      {
        id: 'ac-pay-101-l1',
        given: 'Học viên chuyển tiền từ các ứng dụng ngân hàng phổ biến tại Việt Nam (Vietcombank, Techcombank, MB Bank, VPBank)',
        when: 'Khách hàng quét mã QR bằng tính năng QR Pay trong app ngân hàng',
        then: 'Toàn bộ số tiền và nội dung tự động điền sẵn 100%, học viên chỉ cần bấm xác thực vân tay/FaceID mà không phải gõ bất kỳ con số nào.',
        completed: true
      },
      {
        id: 'ac-pay-101-a11y',
        given: 'Học viên chuyển khoản sai cú pháp nội dung (e.g. quên gõ tiền tố VP)',
        when: 'Hệ thống nhận biến động số dư không khớp',
        then: 'Giao dịch được ghi nhận vào bảng \`unmatched_transactions\` và gửi cảnh báo ngay về kênh Telegram Admin kèm số điện thoại học viên để bộ phận CSKH hỗ trợ kích hoạt thủ công trong 5 phút.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pay-101-vietqr', title: 'Tích hợp thư viện tạo mã VietQR theo đặc tả chuẩn EMVCo và ngân hàng nhà nước Napas 247', category: 'Backend', completed: true },
      { id: 't-pay-101-sepay', title: 'Xây dựng Webhook Endpoint tiếp nhận biến động số dư từ SePay/OpenBanking kèm xác thực API Key bảo mật', category: 'Backend', completed: true },
      { id: 't-pay-101-regex', title: 'Viết bộ phân tích cú pháp Regex trích xuất UserID và số tiền giao dịch chống trường hợp học viên gõ thừa khoảng trắng', category: 'Backend', completed: true },
      { id: 't-pay-101-scale', title: 'Thiết kế cơ chế khóa phân tán Redis Lock ngăn ngừa tình trạng kích hoạt trùng lặp khi webhook gửi lại', category: 'DevOps/Scale', completed: true },
      { id: 't-pay-101-qa', title: 'Kiểm thử hộp đen mô phỏng toàn bộ chu trình: Sinh QR -> Quét thanh toán giả lập -> Webhook -> Tài khoản chuyển thành Pro', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design System Specifications
- **Màn hình tham chiếu**: \`src/ui-reference/m_n_h_nh_ch_n_g_i_v_thanh_to_n_qr_code/code.html\`
- **React Component**: \`vietphonics-app/src/components/subscription/VietQrCheckout.jsx\`
- **VietQR URL Template**:
  - \`https://img.vietqr.io/image/\${BANK_ID}-\${ACCOUNT_NO}-compact2.png?amount=\${AMOUNT}&addInfo=\${MEMO}&accountName=\${ACCOUNT_NAME}\`
- **Lợi ích kinh tế**:
  - Cổng quốc tế (Stripe): Phí 2.9% + 7,000đ = Mất ~8,000đ trên đơn 30,000đ (mất 26% doanh thu!)
  - VietQR Chuyển khoản: Phí 0% -> Doanh nghiệp giữ trọn vẹn 100% doanh thu 30,000đ.`
  },
  {
    id: 'PAY-102',
    epic_id: 'epic-backend-infrastructure',
    title: 'Frictionless 1-Scan Checkout Modal & Real-Time Activation Polling (Thanh Toán 1 Quẹt & Tự Động Mở Khóa): Cửa Sổ Thanh Toán 1 Chạm & Tự Động Kích Hoạt Thời Gian Thực',
    persona: 'Người dùng vừa quét mã QR ngân hàng xong và đang háo hức chờ ứng dụng tự động mở khóa tính năng mà không muốn phải bấm F5 tải lại trang',
    action: 'quan sát màn hình thanh toán tự động chuyển sang trạng thái "Thành công rực rỡ" ngay khi tiền vừa trừ khỏi tài khoản ngân hàng, kèm hiệu ứng pháo hoa chúc mừng',
    value: 'tạo cảm xúc thăng hoa (Aha Moment) và ấn tượng công nghệ hiện đại, xóa bỏ hoàn toàn cảm giác lo lắng "liệu tiền đã vào hệ thống chưa?"',
    priority: 'must',
    status: 'in-progress',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pay-102-auto-polling',
        given: 'Học viên đang mở cửa sổ thanh toán VietQR Checkout Modal',
        when: 'Học viên hoàn tất chuyển khoản trên ứng dụng ngân hàng',
        then: 'Cơ chế Server-Sent Events (SSE) hoặc Polling thông minh (2 giây/lần) phát hiện trạng thái PAID, modal tự động đóng và chuyển hướng sang màn hình chào mừng thành viên Pro với hiệu ứng Confetti rực rỡ.',
        completed: true
      },
      {
        id: 'ac-pay-102-ui',
        given: 'Giao diện cửa sổ thanh toán Checkout Modal',
        when: 'Đang chờ học viên quét mã',
        then: 'Hiển thị vòng quay đếm ngược thời gian giữ chỗ thanh toán (15:00 phút), thông báo trạng thái "Đang chờ thanh toán..." có chấm xanh nhấp nháy, kèm huy hiệu hoàn tiền 100% nếu không hài lòng trong 7 ngày.',
        completed: true
      },
      {
        id: 'ac-pay-102-scale-5000',
        given: 'Hàng trăm học viên cùng mở modal thanh toán cùng lúc',
        when: 'Các máy khách duy trì kết nối kiểm tra trạng thái thanh toán',
        then: 'Sử dụng Server-Sent Events (SSE) nhẹ nhàng hoặc Redis key polling có ETag; máy chủ tiêu tốn dưới 2MB RAM cho 500 kết nối lắng nghe đồng thời, không gây quá tải CPU.',
        completed: true
      },
      {
        id: 'ac-pay-102-l1',
        given: 'Học viên mở ứng dụng trên điện thoại di động (Mobile Web)',
        when: 'Bấm nút "Mở App Ngân Hàng"',
        then: 'Hệ thống hỗ trợ Deep Link tự động mở ứng dụng ngân hàng cài sẵn trên máy (Vietcombank, MB Bank, v.v.) giúp quy trình thanh toán gói gọn trong 2 thao tác chạm.',
        completed: true
      },
      {
        id: 'ac-pay-102-a11y',
        given: 'Người dùng bấm nút hủy thanh toán hoặc đóng cửa sổ',
        when: 'Bấm nút "X" hoặc phím Escape',
        then: 'Hệ thống hỏi nhẹ nhàng "Bạn có chắc muốn dừng đăng ký gói Pro chỉ 1.000đ/ngày?" với 2 nút lựa chọn rõ ràng, đảm bảo khả năng tiếp cận và điều hướng thuận tiện.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pay-102-sse', title: 'Xây dựng kênh Server-Sent Events (SSE) /api/subscriptions/listen-status/:orderId phát thông báo kích hoạt', category: 'Backend', completed: true },
      { id: 't-pay-102-confetti', title: 'Tích hợp thư viện canvas-confetti tạo hoạt ảnh pháo hoa chúc mừng khi nâng cấp Pro thành công', category: 'Frontend', completed: true },
      { id: 't-pay-102-deeplink', title: 'Triển khai danh sách App Scheme Deep Link cho top 10 ngân hàng phổ biến nhất tại Việt Nam', category: 'Frontend', completed: true },
      { id: 't-pay-102-scale', title: 'Tối ưu hóa EventSource connection pool trên Nginx reverse proxy tránh lỗi nghẽn file descriptor', category: 'DevOps/Scale', completed: true },
      { id: 't-pay-102-qa', title: 'Kiểm thử trải nghiệm trên thiết bị di động iOS Safari và Android Chrome đảm bảo chuyển app và quay lại mượt mà', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design System Specifications
- **Màn hình tham chiếu**: \`src/ui-reference/m_n_h_nh_ch_n_g_i_v_thanh_to_n_qr_code/code.html\`
- **React Component**: \`vietphonics-app/src/components/subscription/CheckoutModal.jsx\`
- **Countdown Timer**:
  - Thời lượng: 15 phút (900 giây)
  - Khi còn dưới 2 phút: Chữ hiển thị màu đỏ cam (\`#ea580c\`) kèm nhấp nháy nhẹ cảnh báo
- **Deep Link Ngân Hàng**:
  - Vietcombank: \`vcb://\`
  - Techcombank: \`tcb://\`
  - MB Bank: \`mbcustom://\`.`
  },
  {
    id: 'PAY-103',
    epic_id: 'epic-backend-infrastructure',
    title: 'Multi-Cycle Pricing & Retention Strategy (Chiến Lược Gói Tháng 30k vs Gói Năm 299k Giảm Tỷ Lệ Rời Bỏ): Chiến Lược Giá Đa Chu Kỳ & Giữ Chân Khách Hàng',
    persona: 'Người dùng đang cân nhắc mức chi tiêu hợp lý cho việc học phát âm tiếng Anh lâu dài',
    action: 'lựa chọn giữa gói linh hoạt Tháng (30,000đ/tháng) và gói tiết kiệm Năm (299,000đ/năm - tặng thêm 3 tháng), xem rõ số tiền tiết kiệm được và các đặc quyền đi kèm',
    value: 'tối ưu hóa giá trị vòng đời khách hàng (Customer Lifetime Value LTV), nâng tỷ lệ chọn gói năm lên trên 45% giúp dòng tiền doanh nghiệp dồi dào và ổn định',
    priority: 'should',
    status: 'in-progress',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pay-103-pricing-toggle',
        given: 'Học viên xem bảng giá dịch vụ',
        when: 'Bấm chuyển đổi toggle giữa "Thanh toán theo Tháng" và "Thanh toán theo Năm"',
        then: 'Giá gói năm hiển thị huy hiệu tiết kiệm "Tiết kiệm 35%" màu xanh ngọc rực rỡ, tính ra chỉ tương đương 24,000đ/tháng, tự động cập nhật số tiền thanh toán.',
        completed: true
      },
      {
        id: 'ac-pay-103-ui',
        given: 'Thẻ giá gói dịch vụ PricingCard Component',
        when: 'Render trên trang chọn gói',
        then: 'Gói Năm được làm nổi bật bằng khung viền Rose-500 dày 2px kèm huy hiệu "Lựa Chọn Tốt Nhất (Best Value)" ở góc trên, danh sách 6 đặc quyền độc quyền có dấu tick xanh ngọc lục bảo rõ nét.',
        completed: true
      },
      {
        id: 'ac-pay-103-scale-5000',
        given: '5,000 học viên truy cập trang giá dịch vụ trong các chiến dịch quảng cáo',
        when: 'Trang web tải cấu hình bảng giá và chương trình khuyến mãi',
        then: 'Cấu hình giá được lưu tĩnh trên CDN Edge Cache (Cloudflare) với P95 thời gian phản hồi < 20ms, máy chủ gốc chịu tải 0% cho việc hiển thị bảng giá.',
        completed: true
      },
      {
        id: 'ac-pay-103-l1',
        given: 'Học viên phân vân về chi phí học tập',
        when: 'Đọc thông điệp so sánh chi phí',
        then: 'Giao diện hiển thị phép so sánh dí dỏm và gần gũi: "Chỉ bằng 1 cốc trà sữa mỗi tháng để sở hữu giọng tiếng Anh chuẩn bản ngữ suốt đời!".',
        completed: true
      },
      {
        id: 'ac-pay-103-a11y',
        given: 'Người dùng sử dụng công nghệ hỗ trợ đọc màn hình',
        when: 'Chuyển đổi toggle chu kỳ thanh toán',
        then: 'Trình đọc thông báo rõ: "Đã chọn gói thanh toán Năm, giá 299,000 đồng một năm, tiết kiệm 35 phần trăm so với gói tháng".',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pay-103-ui', title: 'Xây dựng component PricingTierCards với thanh trượt toggle Tháng/Năm và hiệu ứng chuyển đổi mượt mà', category: 'Frontend', completed: true },
      { id: 't-pay-103-plans', title: 'Thiết kế cấu trúc dữ liệu SubscriptionPlan và lưu trữ cấu hình linh hoạt trong cơ sở dữ liệu', category: 'Backend', completed: true },
      { id: 't-pay-103-discount', title: 'Phát triển module Coupon & Voucher giảm giá (e.g., BACK2SCHOOL, VIETPHONICS10) cho phép áp mã trực tiếp', category: 'Backend', completed: true },
      { id: 't-pay-103-scale', title: 'Cấu hình Cloudflare Cache Rules cho endpoint bảng giá tĩnh phục vụ 5,000 người dùng với băng thông tối thiểu', category: 'DevOps/Scale', completed: true },
      { id: 't-pay-103-qa', title: 'Kiểm thử logic tính tiền khi áp voucher khuyến mại và chuyển đổi chu kỳ thanh toán đảm bảo số tiền chuẩn xác 100%', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design System Specifications
- **Màn hình tham chiếu**: \`src/ui-reference/m_n_h_nh_ch_n_g_i_v_thanh_to_n_qr_code/code.html\`
- **React Component**: \`vietphonics-app/src/components/subscription/PricingTierCards.jsx\`
- **Bảng so sánh gói**:
  - Gói Tháng (Monthly): 30,000 VNĐ / tháng (phù hợp học thử ngắn hạn)
  - Gói Năm (Yearly): 299,000 VNĐ / năm (tặng thêm 3 tháng miễn phí = 15 tháng sử dụng, tương đương 19,900đ/tháng)
- **Tâm lý học hành vi (Behavioral Economics)**:
  - Hiệu ứng mỏ neo (Anchoring Effect): Đặt gói tháng 30k làm mốc so sánh để thấy gói năm 299k siêu tiết kiệm.`
  },
  {
    id: 'PAY-104',
    epic_id: 'epic-backend-infrastructure',
    title: 'Automated Grace Period & Expiring Subscription Reminder Bot (Ân Hạn 3 Ngày & Nhắc Gia Hạn Tự Động): Bot Nhắc Gia Hạn Thông Minh & Chính Sách Ân Hạn 3 Ngày',
    persona: 'Học viên Pro đang theo học dở dang nhưng thẻ ngân hàng tạm thời hết tiền hoặc bận việc chưa kịp gia hạn',
    action: 'nhận thông báo nhắc nhở lịch sự trước 3 ngày, được hưởng chính sách ân hạn thêm 3 ngày tiếp tục học tập bình thường mà không bị cắt quyền truy cập đột ngột',
    value: 'giảm tỷ lệ hủy thuê bao ngoài ý muốn (Involuntary Churn) xuống dưới 2%, tạo thiện cảm sâu sắc với học viên nhờ dịch vụ nhân văn và chuyên nghiệp',
    priority: 'should',
    status: 'in-progress',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pay-104-grace-period',
        given: 'Gói Pro của học viên đến ngày hết hạn',
        when: 'Hệ thống xử lý gia hạn tự động nhưng chưa nhận được khoản thanh toán mới',
        then: 'Trạng thái tài khoản chuyển sang GRACE_PERIOD trong 72 giờ (3 ngày); học viên vẫn duy trì 100% quyền lợi gói Pro kèm banner nhắc nhở nhẹ nhàng ở góc màn hình.',
        completed: true
      },
      {
        id: 'ac-pay-104-ui',
        given: 'Banner thông báo thời gian ân hạn trên thanh điều hướng',
        when: 'Học viên đăng nhập trong thời gian ân hạn',
        then: 'Hiển thị dải banner màu hổ phách Amber-500 viền mềm mại: "Gói Pro của bạn đang trong 3 ngày ân hạn (còn 48 giờ). Hãy gia hạn ngay để không làm gián đoạn chuỗi luyện tập!", kèm nút bấm "Gia Hạn 30K" một chạm.',
        completed: true
      },
      {
        id: 'ac-pay-104-scale-5000',
        given: '5,000 người dùng có ngày hết hạn phân bổ rải rác trong tháng',
        when: 'Hệ thống kiểm tra và gửi thông báo nhắc gia hạn',
        then: 'Cron job chạy bất đồng bộ lúc 09:00 sáng mỗi ngày, quét và xử lý 5,000 tài khoản trong vòng dưới 1.5 giây thông qua BullMQ worker, không ảnh hưởng đến hoạt động luyện âm trực tiếp.',
        completed: true
      },
      {
        id: 'ac-pay-104-l1',
        given: 'Kênh gửi thông báo nhắc nhở phù hợp với thói quen người Việt',
        when: 'Hệ thống gửi tin nhắn nhắc gia hạn',
        then: 'Tích hợp gửi thông báo qua Zalo ZNS (Zalo Notification Service) và Email tiếng Việt thân thiện kèm đường link mở thẳng vào trang quét mã VietQR.',
        completed: true
      },
      {
        id: 'ac-pay-104-a11y',
        given: 'Sau 3 ngày ân hạn học viên vẫn chưa gia hạn',
        when: 'Hệ thống chuyển trạng thái sang EXPIRED',
        then: 'Dữ liệu phát âm và tiến độ học tập của học viên được bảo toàn nguyên vẹn 100% (không bao giờ bị xóa), chỉ hạ cấp quyền truy cập về gói Free 5 bài/ngày một cách nhẹ nhàng.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pay-104-cron', title: 'Xây dựng BullMQ cron job kiểm tra trạng thái thuê bao hàng ngày và chuyển đổi trạng thái ACTIVE -> GRACE_PERIOD -> EXPIRED', category: 'Backend', completed: true },
      { id: 't-pay-104-zalo', title: 'Tích hợp Zalo Cloud API (ZNS) gửi tin nhắn thông báo tự động cho người dùng tại Việt Nam', category: 'Backend', completed: true },
      { id: 't-pay-104-ui', title: 'Xây dựng component GracePeriodBanner với nút gia hạn nhanh và đồng hồ đếm ngược giờ ân hạn', category: 'Frontend', completed: true },
      { id: 't-pay-104-scale', title: 'Tối ưu truy vấn tìm kiếm các thuê bao sắp hết hạn bằng chỉ mục trên cột current_period_end', category: 'DevOps/Scale', completed: true },
      { id: 't-pay-104-qa', title: 'Kiểm thử luồng chuyển đổi trạng thái: đảm bảo học viên trong thời gian ân hạn vẫn truy cập được mọi bài học', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 UI/UX Design System Specifications
- **Màn hình tham chiếu**: \`src/ui-reference/m_n_h_nh_ch_n_g_i_v_thanh_to_n_qr_code/code.html\`
- **React Component**: \`vietphonics-app/src/components/subscription/GracePeriodBanner.jsx\`
- **Quy trình Nhắc gia hạn**:
  - D-3 (Trước 3 ngày): Email & Web Push nhắc nhở thân thiện
  - D-0 (Ngày hết hạn): Bật chế độ Ân hạn 3 ngày (Grace Period), gửi tin Zalo ZNS
  - D+3 (Hết ân hạn): Chuyển tài khoản về Free Tier, gửi email bảo lưu tiến trình học tập.`
  }
];
