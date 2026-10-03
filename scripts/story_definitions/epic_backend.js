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
        id: 'ac-arch-101-ddl-structure',
        given: 'Hệ thống cần lưu trữ thông tin tài khoản, gói thuê bao và chi tiết từng âm vị được chấm điểm',
        when: 'Triển khai migration khởi tạo cơ sở dữ liệu',
        then: 'Lược đồ hoàn chỉnh gồm 8 bảng quan hệ có khóa ngoại ON DELETE CASCADE hợp lý, sử dụng kiểu dữ liệu tối ưu (UUIDv7 cho ID phân tán, JSONB cho metadata âm học, TIMESTAMPTZ cho thời gian theo chuẩn UTC).',
        completed: true
      },
      {
        id: 'ac-arch-101-compound-indexes',
        given: 'Bảng điểm số phoneme_scores đạt quy mô hơn 10 triệu bản ghi',
        when: 'Thực hiện truy vấn lịch sử học tập của học viên',
        then: 'Các chỉ mục tổng hợp (Compound Indexes) trên (user_id, phoneme_symbol) và (user_id, created_at DESC) đảm bảo thời gian quét dữ liệu (Index Scan) hoàn tất dưới 15ms.',
        completed: true
      },
      {
        id: 'ac-arch-101-pgbouncer-pooling',
        given: '5,000 phiên truy cập đồng thời từ các máy khách Web và Mobile',
        when: 'Lưu lượng truy cập gửi đến máy chủ cơ sở dữ liệu',
        then: 'Cấu hình PgBouncer connection pooling trong Transaction Mode duy trì tối đa 50 kết nối vật lý đến PostgreSQL mà không làm tràn bộ nhớ RAM (CPU duy trì <40%).',
        completed: true
      },
      {
        id: 'ac-arch-101-automated-partitioning',
        given: 'Dữ liệu âm vị phát sinh liên tục mỗi ngày',
        when: 'Chuyển sang tháng mới',
        then: 'Extension pg_partman tự động tạo partition mới cho bảng phoneme_scores theo từng tháng (Range Partitioning by created_at) mà không cần can thiệp thủ công.',
        completed: false
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-arch-101-be-migration', title: 'Viết file migration DDL tạo toàn bộ 8 bảng PostgreSQL kèm trigger tự động cập nhật trường updated_at', category: 'Backend', completed: true },
      { id: 't-arch-101-be-partition', title: 'Triển khai phân vùng tự động cho bảng phoneme_scores theo từng tháng với pg_partman', category: 'Backend', completed: false },
      { id: 't-arch-101-be-pgbouncer', title: 'Cấu hình PgBouncer kết hợp Prisma/Kysely connection pool tối ưu cho 5,000 concurrent sessions', category: 'DevOps/Scale', completed: true },
      { id: 't-arch-101-qa', title: 'Chạy công cụ pgbench mô phỏng 5,000 client đồng thời kiểm tra TPS đạt tối thiểu 2,500 transaction/sec', category: 'QA', completed: true }
    ]),
    notes: `### 🗄️ PURE BACKEND & DATABASE SPECIFICATION
- **Phân loại**: Pure Backend Data Architecture (0% UI)
- **Engine**: PostgreSQL 16 + PgBouncer Connection Pooler

#### 📐 Complete PostgreSQL 3NF DDL
\`\`\`sql
-- 1. Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(150),
  dialect_preference VARCHAR(20) DEFAULT 'northern',
  tier VARCHAR(20) DEFAULT 'free',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Subscriptions Table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan_code VARCHAR(50) NOT NULL,
  status VARCHAR(30) NOT NULL CHECK (status IN ('active', 'grace_period', 'expired')),
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_subscriptions_user_status ON subscriptions(user_id, status);

-- 3. Range-Partitioned Phoneme Scores Table
CREATE TABLE phoneme_scores (
  id BIGSERIAL,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  phoneme_symbol VARCHAR(10) NOT NULL,
  score NUMERIC(5, 2) NOT NULL,
  duration_ms INT NOT NULL,
  audio_r2_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

-- Partitions by Month
CREATE TABLE phoneme_scores_2026_10 PARTITION OF phoneme_scores
  FOR VALUES FROM ('2026-10-01 00:00:00+00') TO ('2026-11-01 00:00:00+00');
CREATE TABLE phoneme_scores_2026_11 PARTITION OF phoneme_scores
  FOR VALUES FROM ('2026-11-01 00:00:00+00') TO ('2026-12-01 00:00:00+00');

CREATE INDEX idx_phoneme_scores_user_sym ON phoneme_scores(user_id, phoneme_symbol);
CREATE INDEX idx_phoneme_scores_user_time ON phoneme_scores(user_id, created_at DESC);
\`\`\`

#### ⚙️ PgBouncer Concurrency Config
\`\`\`ini
[databases]
vietphonics_db = host=127.0.0.1 port=5432 dbname=vietphonics_prod

[pgbouncer]
pool_mode = transaction
listen_port = 6432
max_client_conn = 5000
default_pool_size = 50
reserve_pool_size = 10
query_timeout = 30
\`\`\``
  },
  {
    id: 'ARCH-102',
    epic_id: 'epic-backend-infrastructure',
    title: 'Asynchronous Audio Ingestion & GPU Worker Queue Pipeline (BullMQ + Redis + FFmpeg): Đường Ống Nạp Âm Thanh Bất Đồng Bộ & Hàng Đợi Worker GPU',
    persona: 'Kỹ sư Machine Learning và hạ tầng AI phụ trách xử lý hàng ngàn file ghi âm tiếng Anh của học viên mà không làm tắc nghẽn máy chủ',
    action: 'nhận luồng file âm thanh từ máy khách, đẩy vào hàng đợi BullMQ/Celery và phân bổ cho các worker GPU chạy Whisper/Kaldi trích xuất đặc trưng ngữ âm',
    value: 'ngăn chặn tình trạng treo máy chủ khi có lượng lớn người dùng cùng nộp bài ghi âm, đảm bảo thời gian xử lý và trả kết quả chấm điểm luôn dưới 650ms',
    priority: 'must',
    status: 'in-progress',
    size: 'XL',
    points: 13,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-arch-102-fast-accept',
        given: 'Học viên nộp đoạn ghi âm giọng nói WebM/Opus hoặc WAV',
        when: 'API Ingestion POST /api/v1/audio/ingest tiếp nhận file',
        then: 'Kiểm tra magic bytes trong dưới 15ms, sinh jobId duy nhất, đẩy tác vụ vào Redis BullMQ và trả về mã HTTP 202 Accepted kèm URL tra cứu kết quả.',
        completed: true
      },
      {
        id: 'ac-arch-102-ffmpeg-normalization',
        given: 'Audio thô từ các trình duyệt khác nhau có tần số lấy mẫu hỗn hợp (44.1kHz, 48kHz, Opus, WebM)',
        when: 'Worker FFmpeg tiếp nhận xử lý',
        then: 'Chuyển đổi tức thời sang chuẩn PCM 16kHz 16-bit mono và cắt lọc khoảng lặng đầu cuối (-50dB silence trimming) trước khi nạp vào GPU.',
        completed: true
      },
      {
        id: 'ac-arch-102-gpu-autoscaling',
        given: 'Đợt cao điểm với lưu lượng 200 file âm thanh/giây',
        when: 'Độ sâu hàng đợi (Queue Depth) vượt quá 100 tác vụ',
        then: 'Cơ chế KEDA tự động mở rộng cụm GPU worker từ 2 lên tối đa 16 nodes, duy trì P95 thời gian chờ < 400ms.',
        completed: false
      },
      {
        id: 'ac-arch-102-dead-letter-queue',
        given: 'Một file âm thanh bị lỗi hỏng định dạng dữ liệu',
        when: 'Worker gặp lỗi giải mã 3 lần liên tiếp với backoff exponential',
        then: 'Tự động chuyển job sang Dead Letter Queue (DLQ), bắn cảnh báo lỗi về hệ thống giám sát và trả thông báo lỗi thân thiện cho client.',
        completed: false
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-arch-102-be-ingest', title: 'Xây dựng API Ingestion POST /api/v1/audio/ingest tiếp nhận multipart/form-data', category: 'Backend', completed: true },
      { id: 't-arch-102-be-worker', title: 'Viết BullMQ worker thực thi lệnh FFmpeg chuẩn hóa PCM 16kHz mono', category: 'Backend', completed: true },
      { id: 't-arch-102-be-keda', title: 'Thiết lập KEDA ScaledObject trên Kubernetes tự động mở rộng pods theo Redis queue length', category: 'DevOps/Scale', completed: false },
      { id: 't-arch-102-qa', title: 'Chạy stress-test 10,000 job liên tục đảm bảo không rò rỉ bộ nhớ (memory leak)', category: 'QA', completed: false }
    ]),
    notes: `### 🗄️ PURE BACKEND & PIPELINE SPECIFICATION
- **Phân loại**: Pure Backend & GPU Queue Worker Pipeline (0% UI)
- **Components**: BullMQ + Redis Stream + FFmpeg + Triton GPU Workers

#### ⚙️ BullMQ Job Architecture
\`\`\`javascript
import { Queue, Worker } from 'bullmq';

export const audioQueue = new Queue('audio-transcription-queue', {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 1000 },
    removeOnComplete: 1000,
    removeOnFail: 5000
  }
});
\`\`\`

#### 🎵 FFmpeg Normalization Pipeline
\`\`\`bash
ffmpeg -y -i input.webm -ac 1 -ar 16000 -c:a pcm_s16le \
  -af "silenceremove=start_periods=1:start_duration=0.1:start_threshold=-50dB:detection=peak,areverse,silenceremove=start_periods=1:start_duration=0.1:start_threshold=-50dB:detection=peak,areverse" \
  output_normalized.wav
\`\`\``
  },
  {
    id: 'ARCH-103',
    epic_id: 'epic-backend-infrastructure',
    title: 'Multi-Gateway Subscription Billing & Webhook Reconciliation: Xử Lý Webhook Thanh Toán Thuê Bao Bất Đồng Bộ & Chống Trùng Lặp',
    persona: 'Kỹ sư phụ trách cổng thanh toán đảm bảo tài khoản người dùng được nâng cấp Pro ngay lập tức khi tiền về tài khoản ngân hàng',
    action: 'tiếp nhận tín hiệu Webhook từ Napas/VietQR/MoMo, xác thực chữ ký số HMAC-SHA256, xử lý nâng cấp thuê bao với cơ chế Idempotency chống cộng trùng ngày',
    value: 'đảm bảo 100% không bao giờ xảy ra lỗi nâng cấp trùng lặp tài khoản hoặc thất thoát doanh thu, tự động kích hoạt gói Pro trong dưới 1 giây sau khi chuyển khoản',
    priority: 'must',
    status: 'todo',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-arch-103-hmac-verification',
        given: 'Tín hiệu Webhook từ cổng thanh toán VietQR Napas gửi tới',
        when: 'Endpoint POST /api/v1/billing/webhook/vietqr tiếp nhận',
        then: 'Xác thực chữ ký HMAC-SHA256 trong tiêu đề X-Signature với Secret Key; nếu chữ ký không khớp trả về ngay HTTP 401 Unauthorized.',
        completed: false
      },
      {
        id: 'ac-arch-103-idempotency-key',
        given: 'Ngân hàng gửi lại Webhook nhiều lần do chập chờn mạng (Retry Webhooks)',
        when: 'Mã giao dịch transaction_id đã được xử lý trước đó',
        then: 'Hệ thống dùng Redis SETNX khóa idempotency key trong 86,400s; nhận diện trùng lặp và trả về ngay HTTP 200 OK mà không cộng trùng ngày hạn Pro.',
        completed: false
      },
      {
        id: 'ac-arch-103-redlock-transaction',
        given: 'Giao dịch hợp lệ cần kích hoạt gói Pro',
        when: 'Hệ thống cập nhật bảng subscriptions',
        then: 'Thực thi giao dịch PostgreSQL trong khối Isolation Level READ COMMITTED kết hợp Redlock phân tán, đảm bảo tính toàn vẹn trạng thái thuê bao.',
        completed: false
      },
      {
        id: 'ac-arch-103-cron-reconciliation',
        given: 'Các giao dịch treo chưa nhận được webhook do nghẽn mạng phía ngân hàng',
        when: 'Cron job đối soát chạy định kỳ 15 phút một lần',
        then: 'Tự động gọi API ngân hàng đối soát danh sách giao dịch Napas và tự động bù gạch nợ cho người dùng.',
        completed: false
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-arch-103-be-hmac', title: 'Xây dựng middleware kiểm tra chữ ký số HMAC-SHA256 cho Webhook endpoint', category: 'Backend', completed: false },
      { id: 't-arch-103-be-idempotency', title: 'Triển khai cơ chế Idempotent Transaction với Redis SETNX và PostgreSQL transaction', category: 'Backend', completed: false },
      { id: 't-arch-103-be-reconcile', title: 'Thiết lập cron job đối soát thanh toán tự động chạy mỗi 15 phút', category: 'Backend', completed: false },
      { id: 't-arch-103-qa', title: 'Kiểm thử kịch bản bắn 50 request webhook trùng lặp đồng thời kiểm tra tài khoản chỉ được cộng hạn 1 lần duy nhất', category: 'QA', completed: false }
    ]),
    notes: `### 🗄️ PURE BACKEND & BILLING SPECIFICATION
- **Phân loại**: Pure Backend Payment Webhook Engine (0% UI)
- **Security**: HMAC-SHA256 Signature Verification + Redis Distributed Locking

#### ⚙️ Idempotent Webhook Handler
\`\`\`javascript
export async function handlePaymentWebhook(req, res) {
  const signature = req.headers['x-signature'];
  const rawBody = req.rawBody;
  
  if (!verifyHmacSha256(rawBody, signature, process.env.VIETQR_WEBHOOK_SECRET)) {
    return res.status(401).json({ error: 'Invalid HMAC signature' });
  }

  const { transactionId, orderCode, amount } = req.body;
  const lockKey = \`idempotency:webhook:\${transactionId}\`;
  
  // Set NX with 24h TTL
  const isNew = await redis.set(lockKey, '1', 'NX', 'EX', 86400);
  if (!isNew) {
    return res.status(200).json({ status: 'already_processed' });
  }

  await activateSubscriptionTransaction(orderCode, amount);
  return res.status(200).json({ status: 'activated_success' });
}
\`\`\``
  },
  {
    id: 'ARCH-104',
    epic_id: 'epic-backend-infrastructure',
    title: 'Tiered Quota Limiter & Entitlement Enforcement Middleware (Redis Sliding Window): Kiểm Soát Định Ngạch Theo Hạng Tài Khoản & Giới Hạn Tần Suất',
    persona: 'Kỹ sư bảo mật và kiến trúc sư hạ tầng phụ trách bảo vệ hệ thống khỏi nạn spam và lạm dụng API chấm điểm AI',
    action: 'triển khai middleware kiểm tra quyền hạn (Entitlement) và bộ giới hạn tần suất cửa sổ trượt (Sliding Window Rate Limiter) dựa trên Redis',
    value: 'chặn đứng các cuộc tấn công DDoS và hành vi lạm dụng token AI, đảm bảo người dùng trả phí Pro luôn được ưu tiên tài nguyên phục vụ cao nhất',
    priority: 'must',
    status: 'in-progress',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-arch-104-free-tier-enforcement',
        given: 'Học viên sở hữu tài khoản Free',
        when: 'Thực hiện bài học thứ 6 trong ngày',
        then: 'Middleware chặn lại, trả về mã HTTP 429 Too Many Requests kèm JSON chuẩn RFC-7807 giải thích định ngạch 5 bài/ngày đã hết.',
        completed: true
      },
      {
        id: 'ac-arch-104-redis-sliding-window',
        given: 'Người dùng gửi liên tiếp các yêu cầu thu âm trong khoảng thời gian ngắn',
        when: 'Tần suất vượt quá 10 request / 60 giây',
        then: 'Thuật toán Sliding Window sử dụng Redis ZSET tự động chặn các request spam và trả về header Retry-After.',
        completed: true
      },
      {
        id: 'ac-arch-104-pro-tier-bypass',
        given: 'Học viên có gói thuê bao Pro đang hoạt động',
        when: 'Thực hiện 50 bài học phát âm trong ngày',
        then: 'Middleware xác nhận quyền hạn Pro và cho phép truy cập không giới hạn với độ trễ kiểm tra dưới 2ms.',
        completed: false
      },
      {
        id: 'ac-arch-104-midnight-reset',
        given: 'Định ngạch 5 bài học của tài khoản Free',
        when: 'Đồng hồ hệ thống điểm 00:00 UTC',
        then: 'Khóa Redis tự động hết hạn (TTL Expire) mà không cần chạy lệnh xóa database, nạp lại 5 lượt học miễn phí mới cho ngày tiếp theo.',
        completed: false
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-arch-104-be-lua', title: 'Viết kịch bản Lua Script thực thi nguyên tử thuật toán Sliding Window Rate Limiter trên Redis', category: 'Backend', completed: true },
      { id: 't-arch-104-be-mw', title: 'Xây dựng Express middleware checkQuotaAndEntitlements gắn vào toàn bộ route chấm điểm AI', category: 'Backend', completed: true },
      { id: 't-arch-104-qa', title: 'Viết bài kiểm thử tự động bắn 20 request đồng thời kiểm tra độ chính xác của bộ đếm định ngạch', category: 'QA', completed: false }
    ]),
    notes: `### 🗄️ PURE BACKEND & SECURITY SPECIFICATION
- **Phân loại**: Pure Backend Middleware & Rate Limiter (0% UI)
- **Algorithm**: Redis Sorted Set Sliding Window + Lua Script

#### ⚙️ Redis Sliding Window Lua Script
\`\`\`lua
local key = KEYS[1]
local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local limit = tonumber(ARGV[3])

-- Remove timestamps outside the sliding window
redis.call('ZREMRANGEBYSCORE', key, 0, now - window)

local current_count = redis.call('ZCARD', key)
if current_count < limit then
  redis.call('ZADD', key, now, now)
  redis.call('EXPIRE', key, window)
  return 1
else
  return 0
end
\`\`\``
  },
  {
    id: 'ARCH-105',
    epic_id: 'epic-backend-infrastructure',
    title: 'Cloud Object Storage & Ephemeral Audio Retention Lifecycle (Cloudflare R2): Lưu Trữ File Âm Thanh Trên Đám Mây & Vòng Đời Tự Động Xóa Dữ Liệu Tạm',
    persona: 'Kỹ sư DevOps chịu trách nhiệm tối ưu chi phí lưu trữ đám mây và bảo vệ quyền riêng tư dữ liệu giọng nói của học viên',
    action: 'cấu hình lưu trữ đám mây Cloudflare R2 tương thích S3, cấp Presigned Upload URLs để máy khách tải file trực tiếp, và thiết lập vòng đời tự động xóa file rác',
    value: 'giảm 100% chi phí băng thông tải ra (Zero Egress Fees), tiết kiệm 80% chi phí lưu trữ đĩa cứng và tuân thủ tiêu chuẩn bảo vệ quyền riêng tư người dùng',
    priority: 'must',
    status: 'in-progress',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-arch-105-presigned-url',
        given: 'Máy khách chuẩn bị ghi âm giọng nói',
        when: 'Gọi API GET /api/v1/storage/upload-ticket',
        then: 'Hệ thống sinh S3 Presigned URL có thời hạn 5 phút với định danh ngẫu nhiên UUIDv7 trong vòng dưới 20ms.',
        completed: true
      },
      {
        id: 'ac-arch-105-direct-client-upload',
        given: 'Máy khách nhận được Presigned URL',
        when: 'Học viên ghi âm xong và tải file Opus lên Cloudflare R2',
        then: 'Luồng dữ liệu nhị phân truyền thẳng từ trình duyệt lên R2 mà không đi qua máy chủ backend, tiết kiệm 100% băng thông máy chủ.',
        completed: true
      },
      {
        id: 'ac-arch-105-ephemeral-auto-purge',
        given: 'Hàng triệu file ghi âm luyện tập ngắn tích lũy trên R2',
        when: 'File đạt tuổi thọ quá 7 ngày đối với gói Free (hoặc 90 ngày đối với gói Pro)',
        then: 'Quy tắc R2 Bucket Lifecycle Rules tự động thanh trừng các file quá hạn mà không tốn tài nguyên CPU máy chủ.',
        completed: true
      },
      {
        id: 'ac-arch-105-cors-security',
        given: 'Yêu cầu tải file từ một tên miền lạ không thuộc hệ thống',
        when: 'Gửi request lên R2 bucket',
        then: 'Chính sách CORS chặn đứng và từ chối truy cập, chỉ cho phép nguồn gốc xuất phát từ *.vietphonics.com.',
        completed: false
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-arch-105-be-s3', title: 'Tích hợp AWS SDK v3 S3Client kết nối với Cloudflare R2 endpoint', category: 'Backend', completed: true },
      { id: 't-arch-105-be-presign', title: 'Xây dựng API GET /api/v1/storage/upload-ticket sinh presigned PUT URL', category: 'Backend', completed: true },
      { id: 't-arch-105-be-lifecycle', title: 'Cấu hình XML Lifecycle Rules trên bucket R2 cho chính sách xóa 7 ngày và 90 ngày', category: 'DevOps/Scale', completed: true },
      { id: 't-arch-105-qa', title: 'Kiểm thử tải lên file trực tiếp từ trình duyệt Safari iOS và Chrome Android', category: 'QA', completed: false }
    ]),
    notes: `### 🗄️ PURE BACKEND & CLOUD DEVOPS SPECIFICATION
- **Phân loại**: Pure Backend Cloud Storage & S3 Lifecycle (0% UI)
- **Provider**: Cloudflare R2 (S3 Compatible - Zero Egress Fees)

#### ⚙️ S3 Presigned URL Generator
\`\`\`javascript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const r2 = new S3Client({
  region: 'auto',
  endpoint: \`https://\${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com\`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY
  }
});

export async function createAudioUploadTicket(userId, extension = 'opus') {
  const key = \`audio/\${userId}/\${crypto.randomUUID()}.\${extension}\`;
  const command = new PutObjectCommand({
    Bucket: 'vietphonics-audio-prod',
    Key: key,
    ContentType: 'audio/opus'
  });
  const presignedUrl = await getSignedUrl(r2, command, { expiresIn: 300 });
  return { key, presignedUrl };
}
\`\`\``
  },
  {
    id: 'PAY-101',
    epic_id: 'epic-backend-infrastructure',
    title: 'Dynamic VietQR Auto-Reconciliation Engine: Thuê Bao VietQR Napas Tự Động Gạch Nợ',
    persona: 'Học viên Việt Nam muốn nâng cấp tài khoản Pro qua ứng dụng ngân hàng di động mà không cần thẻ tín dụng quốc tế Visa/Mastercard',
    action: 'quét mã VietQR động được tạo riêng cho đơn hàng và chuyển tiền qua ứng dụng ngân hàng (BIDV, Vietcombank, Techcombank, MB, Momo)',
    value: 'kích hoạt gói Pro tự động tức thì trong vòng 2 giây sau khi chuyển khoản, loại bỏ hoàn toàn việc phải chụp ảnh biên lai gửi admin xác nhận thủ công',
    priority: 'must',
    status: 'done',
    size: 'L',
    points: 8,
    uiMockupUrl: '/src/ui-reference/ng_n_h_ng_t_l_i_n_ng_c_p_pro_light_mode/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pay-101-emvco-qr-generation',
        given: 'Học viên chọn gói Pro 1 Tháng hoặc Pro 1 Năm',
        when: 'Hộp thoại thanh toán hiển thị',
        then: 'Hệ thống sinh mã VietQR chuẩn EMVCo chứa sẵn số tài khoản, mã ngân hàng (BIN), số tiền chính xác và cú pháp chuyển khoản duy nhất "VP {userId} {planCode}".',
        completed: true
      },
      {
        id: 'ac-pay-101-realtime-polling-activation',
        given: 'Học viên đang mở màn hình chờ thanh toán',
        when: 'Giao dịch ngân hàng thành công',
        then: 'Màn hình tự động chuyển sang trạng thái "Đã Kích Hoạt Gói Pro!" kèm hiệu ứng pháo hoa chúc mừng trong dưới 2 giây mà không cần bấm nút F5.',
        completed: true
      },
      {
        id: 'ac-pay-101-one-click-copy',
        given: 'Học viên chuyển khoản thủ công không quét mã QR',
        when: 'Bấm nút sao chép bên cạnh Số Tài Khoản hoặc Cú Pháp Chuyển Khoản',
        then: 'Dữ liệu được sao chép vào bộ nhớ đệm Clipboard kèm thông báo Toast "Đã sao chép thành công!".',
        completed: true
      },
      {
        id: 'ac-pay-101-qr-timeout-countdown',
        given: 'Mã QR thanh toán có thời hạn hiệu lực',
        when: 'Đồng hồ đếm ngược 15:00 phút chạy hết giờ',
        then: 'Mã QR mờ đi kèm thông báo "Mã thanh toán đã hết hạn" và nút "Tạo mã QR mới".',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pay-101-fe-modal', title: 'Xây dựng component VietQrCheckoutModal.jsx với mã QR động và đồng hồ đếm ngược 15 phút', category: 'Frontend', completed: true },
      { id: 't-pay-101-fe-poll', title: 'Thiết lập polling trạng thái thanh toán hoặc lắng nghe WebSocket sự kiện payment_received', category: 'Frontend', completed: true },
      { id: 't-pay-101-be-emvco', title: 'Viết module sinh chuỗi ký tự VietQR EMVCo CRC16 chuẩn Napas 24/7', category: 'Backend', completed: true },
      { id: 't-pay-101-qa', title: 'Kiểm thử thanh toán thực tế với 3 app ngân hàng phổ biến (Vietcombank, MB Bank, Techcombank)', category: 'QA', completed: true }
    ]),
    notes: `### 🎯 FULLSTACK FEATURE SPECIFICATION
- **Phân loại**: Full-stack VietQR Napas Payment Integration
- **UI Mockup**: \`vietphonics-app/src/ui-reference/ng_n_h_ng_t_l_i_n_ng_c_p_pro_light_mode/code.html\`
- **Frontend Component**: \`vietphonics-app/src/components/payment/VietQrCheckoutModal.jsx\`

#### 🎨 VietQR Modal Layout
\`\`\`
+-------------------------------------------------------------+
| NÂNG CẤP PRO: GÓI 1 NĂM (TIẾT KIỆM 40%)                     |
| Số tiền: 599.000 VNĐ                 [ ⏱️ Hết hạn: 14:32 ]  |
+-------------------------------------------------------------+
|             [ MÃ VIETQR ĐỘNG CHUẨN NAPAS ]                 |
|             (Mở app ngân hàng bất kỳ để quét)              |
+-------------------------------------------------------------+
| Ngân hàng: MB Bank (Quân Đội)        [ Sao chép ]           |
| Số tài khoản: 0988 123 456           [ Sao chép ]           |
| Nội dung: VP 88291 PRO1Y             [ Sao chép ]           |
+-------------------------------------------------------------+
| [🔴 Đang chờ ngân hàng xác nhận giao dịch tự động...]       |
+-------------------------------------------------------------+
\`\`\``
  },
  {
    id: 'PAY-102',
    epic_id: 'epic-backend-infrastructure',
    title: 'Frictionless 1-Scan Checkout Modal & Real-Time Activation: Giao Diện Quét Mã Thanh Toán Không Ma Sát',
    persona: 'Người dùng muốn trải nghiệm mua hàng nhanh chóng, không muốn điền form thông tin thanh toán rườm rà',
    action: 'mở modal thanh toán 1 chạm, quét mã và nhận tài khoản Pro ngay lập tức',
    value: 'tối đa hóa tỷ lệ chuyển đổi đơn hàng (Checkout Conversion Rate), mang lại trải nghiệm mua sắm hiện đại bậc nhất',
    priority: 'must',
    status: 'done',
    size: 'M',
    points: 5,
    uiMockupUrl: '/src/ui-reference/ng_n_h_ng_t_l_i_n_ng_c_p_pro_light_mode/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pay-102-responsive-modal',
        given: 'Học viên bấm nâng cấp tài khoản Pro',
        when: 'Hộp thoại mở ra',
        then: 'Modal thanh toán hiển thị sắc nét, căn giữa hoàn hảo trên cả desktop và mobile, nền mờ backdrop-blur-md sang trọng.',
        completed: true
      },
      {
        id: 'ac-pay-102-mobile-deeplink',
        given: 'Học viên truy cập bằng điện thoại di động',
        when: 'Không thể dùng điện thoại này quét mã QR trên chính màn hình của nó',
        then: 'Hiển thị nút "Mở Ứng Dụng Ngân Hàng (App Intent Deep Link)" cho phép mở trực tiếp app ngân hàng để chuyển tiền tự động.',
        completed: true
      },
      {
        id: 'ac-pay-102-success-animation',
        given: 'Giao dịch được ghi nhận',
        when: 'Modal chuyển trạng thái',
        then: 'Hiển thị hoạt ảnh dấu tick xanh Emerald nảy lên kèm chữ "Kích hoạt Pro thành công!", tự động đóng modal sau 3 giây.',
        completed: true
      },
      {
        id: 'ac-pay-102-support-hotline-button',
        given: 'Học viên cần hỗ trợ về giao dịch',
        when: 'Xem chân trang modal',
        then: 'Nút "Hỗ trợ Zalo 24/7" mở ngay kênh hỗ trợ viên với mã đơn hàng được sao chép sẵn.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pay-102-fe-deeplink', title: 'Tích hợp liên kết Deep Link mở các app ngân hàng Việt Nam trên mobile', category: 'Frontend', completed: true },
      { id: 't-pay-102-fe-animation', title: 'Thiết kế hiệu ứng thành công Success Confetti Animation', category: 'Frontend', completed: true },
      { id: 't-pay-102-fe-copy', title: 'Tích hợp Clipboard API với thông báo phản hồi trực quan', category: 'Frontend', completed: true },
      { id: 't-pay-102-qa', title: 'Kiểm tra độ tương thích trên các trình duyệt in-app browser như Zalo, Facebook Messenger', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 PURE FRONTEND DESIGN SPECIFICATION
- **Phân loại**: Pure Frontend Checkout Modal & Mobile Deeplinks
- **UI Mockup**: \`vietphonics-app/src/ui-reference/ng_n_h_ng_t_l_i_n_ng_c_p_pro_light_mode/code.html\`
- **Frontend Component**: \`vietphonics-app/src/components/payment/VietQrCheckoutModal.jsx\`

#### 🎨 Checkout Modal Tokens
- **Modal Frame**: \`bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl max-w-md w-full mx-auto\`.
- **QR Box**: \`bg-white p-4 rounded-2xl shadow-inner flex items-center justify-center\`.
- **Deeplink Button**: \`w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm flex items-center justify-center gap-2\`.`
  },
  {
    id: 'PAY-103',
    epic_id: 'epic-backend-infrastructure',
    title: 'Multi-Cycle Pricing & Retention Strategy (Chiến Lược Giá Đa Chu Kỳ: Tháng, Quý, Năm)',
    persona: 'Người học có nhu cầu tài chính và cam kết học tập khác nhau (học thử 1 tháng hoặc cam kết ôn thi 1 năm)',
    action: 'chọn chu kỳ thanh toán linh hoạt (1 Tháng, 3 Tháng, 1 Năm) trên bảng giá và thấy rõ mức tiền tiết kiệm',
    value: 'minh bạch về chi phí, tối ưu hóa giá trị đầu tư cho người học (chỉ 3.000đ/ngày đối với gói năm)',
    priority: 'should',
    status: 'done',
    size: 'M',
    points: 5,
    uiMockupUrl: '/src/ui-reference/ng_n_h_ng_t_l_i_n_ng_c_p_pro_light_mode/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pay-103-cycle-toggle',
        given: 'Học viên xem bảng giá dịch vụ',
        when: 'Gạt thanh chuyển đổi "Thanh toán theo năm (Tiết kiệm 40%)"',
        then: 'Giá hiển thị của tất cả các gói tự động cập nhật lại mức giá tương ứng kèm số tiền tiết kiệm được bôi đậm nổi bật.',
        completed: true
      },
      {
        id: 'ac-pay-103-popular-badge',
        given: 'Gói Pro 1 Năm là gói có giá trị kinh tế tốt nhất',
        when: 'Bảng giá hiển thị',
        then: 'Gói 1 Năm được bao bọc bởi viền phát sáng màu vàng hổ phách, gắn huy hiệu "Gói Phổ Biến Nhất" và phóng to nổi bật hơn 10% so với các gói khác.',
        completed: true
      },
      {
        id: 'ac-pay-103-feature-comparison-table',
        given: 'Học viên muốn so sánh quyền lợi giữa tài khoản Free và Pro',
        when: 'Cuộn xuống phần bảng so sánh tính năng',
        then: 'Hiển thị bảng chi tiết các tính năng: Luyện âm 44 âm, AI Roleplay Alex, Báo cáo IELTS, Lưu trữ Error Bank với các dấu tick xanh rõ ràng.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pay-103-fe-matrix', title: 'Xây dựng component PricingMatrix.jsx với thanh gạt chu kỳ thanh toán linh hoạt', category: 'Frontend', completed: true },
      { id: 't-pay-103-fe-table', title: 'Thiết kế bảng so sánh tính năng FeatureComparisonTable theo chuẩn thiết kế Stripe', category: 'Frontend', completed: true },
      { id: 't-pay-103-qa', title: 'Kiểm tra hiển thị chính xác các con số quy đổi ra chi phí mỗi ngày (3.000đ/ngày)', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 PURE FRONTEND DESIGN SPECIFICATION
- **Phân loại**: Pure Frontend Pricing Matrix Component
- **UI Mockup**: \`vietphonics-app/src/ui-reference/ng_n_h_ng_t_l_i_n_ng_c_p_pro_light_mode/code.html\`
- **Frontend Component**: \`vietphonics-app/src/components/pricing/PricingMatrix.jsx\`

#### 🎨 Pricing Matrix Layout
\`\`\`
+-------------------------------------------------------------+
| BẢNG GIÁ NÂNG CẤP PRO:     [ Gạt sang: Trả Theo Năm (-40%) ]|
+-------------------------------------------------------------+
| [GÓI 1 THÁNG]         | [GÓI 1 NĂM (PHỔ BIẾN NHẤT)] ⭐      |
| 149.000đ / tháng      | 599.000đ / năm (~49.000đ/tháng)    |
| Phù hợp ôn thi cấp tốc| Chỉ 1.600đ/ngày - Tiết kiệm 40%    |
| [Chọn Gói 1 Tháng]    | [👉 NÂNG CẤP 1 NĂM NGAY]           |
+-------------------------------------------------------------+
\`\`\``
  },
  {
    id: 'PAY-104',
    epic_id: 'epic-backend-infrastructure',
    title: 'Automated Grace Period & Expiring Subscription Reminders: Cơ Chế Gia Hạn Ân Hạn & Nhắc Nhở Hết Hạn Tự Động',
    persona: 'Kỹ sư quản lý thuê bao đảm bảo học viên không bị cắt dịch vụ đột ngột khi gói cước hết hạn',
    action: 'kích hoạt thời gian ân hạn 3 ngày (3-Day Grace Period) khi gói cước hết hạn và gửi thông báo nhắc nhở tự động kèm ưu đãi gia hạn',
    value: 'giảm tỷ lệ hủy thuê bao (Churn Rate), duy trì trải nghiệm liên tục cho học viên và tối ưu hóa tỷ lệ gia hạn định kỳ',
    priority: 'should',
    status: 'todo',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pay-104-expiring-cron',
        given: 'Gói thuê bao Pro của học viên còn 3 ngày nữa là hết hạn',
        when: 'Cron job chạy lúc 08:00 sáng hàng ngày',
        then: 'Hệ thống tự động kích hoạt thông báo nhắc nhở qua Email / In-App Notification với liên kết gia hạn nhanh giảm giá 10%.',
        completed: false
      },
      {
        id: 'ac-pay-104-grace-period-activation',
        given: 'Gói cước đã chạm mốc thời gian hết hạn current_period_end',
        when: 'Trạng thái thuê bao chuyển đổi',
        then: 'Chuyển trạng thái sang "grace_period" trong 3 ngày tiếp theo, học viên vẫn được giữ nguyên toàn bộ quyền lợi Pro.',
        completed: false
      },
      {
        id: 'ac-pay-104-grace-period-expiry',
        given: 'Thời gian ân hạn 3 ngày kết thúc mà học viên chưa thanh toán gia hạn',
        when: 'Cron job rà soát lúc nửa đêm',
        then: 'Tự động hạ cấp tài khoản về gói Free an toàn, lưu lại toàn bộ dữ liệu lịch sử học tập và Error Bank vào trạng thái đóng băng.',
        completed: false
      },
      {
        id: 'ac-pay-104-audit-logging',
        given: 'Bất kỳ hành động thay đổi trạng thái thuê bao nào diễn ra',
        when: 'Giao dịch hoàn tất',
        then: 'Ghi log chi tiết vào bảng subscription_audit_logs phục vụ đối soát tài chính và chăm sóc khách hàng.',
        completed: false
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pay-104-be-cron', title: 'Thiết lập BullMQ cron job kiểm tra các thuê bao sắp hết hạn và hết hạn', category: 'Backend', completed: false },
      { id: 't-pay-104-be-state', title: 'Xây dựng State Machine chuyển đổi trạng thái thuê bao: active -> grace_period -> expired', category: 'Backend', completed: false },
      { id: 't-pay-104-be-audit', title: 'Tạo bảng subscription_audit_logs lưu vết toàn bộ lịch sử chuyển đổi gói', category: 'Backend', completed: false },
      { id: 't-pay-104-qa', title: 'Kiểm thử kịch bản giả lập thời gian trôi qua 3 ngày xem tài khoản có hạ cấp chính xác', category: 'QA', completed: false }
    ]),
    notes: `### 🗄️ PURE BACKEND & CRON SPECIFICATION
- **Phân loại**: Pure Backend Subscription State Machine & Cron (0% UI)
- **Engine**: BullMQ Cron + PostgreSQL State Machine

#### ⚙️ Subscription State Transitions
\`\`\`
[ACTIVE] --- (hết hạn period_end) ---> [GRACE_PERIOD (3 ngày)]
                                               |
      +----------------------------------------+
      | (chưa thanh toán sau 3 ngày)           | (thanh toán thành công)
      v                                        v
  [EXPIRED (Hạ về Free)]                   [ACTIVE (Gia hạn mới)]
\`\`\`

#### 🗄️ Database Audit Log DDL
\`\`\`sql
CREATE TABLE subscription_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID NOT NULL REFERENCES subscriptions(id) ON DELETE CASCADE,
  old_status VARCHAR(30) NOT NULL,
  new_status VARCHAR(30) NOT NULL,
  reason VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
\`\`\``
  }
];
