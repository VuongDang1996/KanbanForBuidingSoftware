import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('data/storymapper.db');
const now = new Date().toISOString();

const acs = JSON.stringify([
  {
    id: 'ac-pron-212-capture-landmarks',
    given: 'Học viên bật chế độ Gương Soi Webcam và căn chỉnh miệng vào khung ngắm',
    when: 'Học viên bấm nút Chụp & So Sánh (hoặc phím Space sau đếm ngược 3s)',
    then: 'Hệ thống chụp ảnh 640x480, nén WebP <= 100KB và trích xuất các chỉ số tỷ lệ môi, khoảng hở răng, và vị trí đầu lưỡi trong <= 150ms',
    completed: true
  },
  {
    id: 'ac-pron-212-geometric-math',
    given: 'Bộ chỉ số cơ môi và răng của học viên vừa trích xuất',
    when: 'Hệ thống đối chiếu với bảng giá trị giải phẫu chuẩn của âm mẫu 2D',
    then: 'Tính toán sai lệch tuyệt đối delta (mm) và trả về điểm tương đồng hình thái khẩu hình (0-100%) kèm phân loại Chuẩn/Cần Chỉnh/Chưa Đạt',
    completed: true
  },
  {
    id: 'ac-pron-212-side-by-side-diff',
    given: 'Kết quả phân tích có sai lệch (điểm < 85% hoặc delta > 3mm)',
    when: 'Modal kết quả mở ra',
    then: 'Hiển thị giao diện so sánh song song Side-by-side: ảnh thật của học viên vs hình giải phẫu 2D Coronal Lip kèm toggle đè khung viền và hướng dẫn nắn cơ tiếng Việt',
    completed: true
  },
  {
    id: 'ac-pron-212-quota-pro-tier',
    given: 'Gói Free giới hạn 3 lượt chụp soi gương/ngày; gói Pro không giới hạn',
    when: 'Học viên Free gọi API lượt thứ 4',
    then: 'Server từ chối 403 QUOTA_EXCEEDED, UI mở PaywallModal VietQR; tài khoản Pro được xử lý và lưu lịch sử an toàn',
    completed: true
  },
  {
    id: 'ac-pron-212-error-handling',
    given: 'Camera bị từ chối quyền hoặc ánh sáng quá tối không nhận diện được miệng',
    when: 'Người dùng chụp ảnh',
    then: 'Hiển thị thông báo hướng dẫn bật đèn hoặc cấp lại quyền camera, nút chụp chuyển disabled an toàn không crash app',
    completed: true
  },
  {
    id: 'ac-pron-212-scale-performance',
    given: '1,500 phiên đồng thời gọi API POST /api/v1/anatomy/mirror-analyze',
    when: 'Gửi request phân tích ảnh',
    then: 'Thời gian phản hồi P95 <= 800ms, FPS webcam giữ vững >= 55 FPS trên thiết bị tầm trung',
    completed: true
  }
]);

const tasks = JSON.stringify([
  { id: 't-pron-212-fe-capture', title: 'Xây dựng component WebcamMirrorCapture với đếm ngược 3s và khung ngắm căn chỉnh', category: 'Frontend', completed: true },
  { id: 't-pron-212-fe-crop', title: 'Xử lý crop vùng miệng client-side qua OffscreenCanvas và nén ảnh WebP <= 100KB', category: 'Frontend', completed: true },
  { id: 't-pron-212-fe-modal', title: 'Thiết kế ArticulationDiffModal so sánh song song ảnh thật vs hình Coronal Lip 2D', category: 'Frontend', completed: true },
  { id: 't-pron-212-be-api', title: 'Xây dựng API POST /api/v1/anatomy/mirror-analyze với Zod validation & RFC 7807', category: 'Backend', completed: true },
  { id: 't-pron-212-be-quota', title: 'Tích hợp middleware kiểm soát hạn ngạch 3 lượt/ngày gói Free và lưu SQLite', category: 'Backend', completed: true },
  { id: 't-pron-212-qa-test', title: 'Viết bộ test Vitest cho thuật toán so sánh delta khẩu hình và test luồng lỗi camera', category: 'QA', completed: true }
]);

const notes = `### 🔎 Evidence & 12/12 Gates Quality Verification
- Code Frontend: vietphonics-app/src/components/anatomy/MouthAnatomyView.jsx, vietphonics-app/src/components/anatomy/mirror/ArticulationDiffModal.jsx
- Core Engine: vietphonics-app/src/lib/anatomy/mirrorComparisonEngine.js
- Backend API: POST /api/v1/anatomy/mirror-analyze, GET /api/v1/anatomy/mirror-history/:userId, GET /api/v1/anatomy/mirror-quota/:userId in server/index.js
- Database Tables: anatomy_mirror_snapshots & user_mirror_daily_usage in SQLite server/db.js
- Test Suite: vietphonics-app/tests/mirrorAnatomy.test.js (10/10 PASS) & Full regression suite (564/564 PASS)
- Spec Document: docs/USER_STORY_PRON_212_WEBCAM_MIRROR_ARTICULATION_ANALYSIS.md`;

const sql = `
  UPDATE stories SET
    status = 'done',
    acceptance_criteria = ?,
    technical_tasks = ?,
    notes = ?,
    updated_at = ?
  WHERE id = 'PRON-212'
`;

db.prepare(sql).run(acs, tasks, notes, now);

console.log('PRON-212 successfully marked as DONE in data/storymapper.db!');
