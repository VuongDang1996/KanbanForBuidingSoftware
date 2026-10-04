import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('data/storymapper.db');
const now = new Date().toISOString();

const acs = JSON.stringify([
  {
    id: 'ac-pron-212-capture-landmarks',
    given: 'Học viên bật chế độ Gương Soi Webcam và căn chỉnh miệng vào khung ngắm',
    when: 'Học viên bấm nút Chụp & So Sánh (hoặc phím Space sau đếm ngược 3s)',
    then: 'Hệ thống chụp ảnh 640x480, nén WebP <= 100KB và trích xuất các chỉ số tỷ lệ môi, khoảng hở răng, và vị trí đầu lưỡi trong <= 150ms',
    completed: false
  },
  {
    id: 'ac-pron-212-geometric-math',
    given: 'Bộ chỉ số cơ môi và răng của học viên vừa trích xuất',
    when: 'Hệ thống đối chiếu với bảng giá trị giải phẫu chuẩn của âm mẫu 2D',
    then: 'Tính toán sai lệch tuyệt đối delta (mm) và trả về điểm tương đồng hình thái khẩu hình (0-100%) kèm phân loại Chuẩn/Cần Chỉnh/Chưa Đạt',
    completed: false
  },
  {
    id: 'ac-pron-212-side-by-side-diff',
    given: 'Kết quả phân tích có sai lệch (điểm < 85% hoặc delta > 3mm)',
    when: 'Modal kết quả mở ra',
    then: 'Hiển thị giao diện so sánh song song Side-by-side: ảnh thật của học viên vs hình giải phẫu 2D Coronal Lip kèm toggle đè khung viền và hướng dẫn nắn cơ tiếng Việt',
    completed: false
  },
  {
    id: 'ac-pron-212-quota-pro-tier',
    given: 'Gói Free giới hạn 3 lượt chụp soi gương/ngày; gói Pro không giới hạn',
    when: 'Học viên Free gọi API lượt thứ 4',
    then: 'Server từ chối 403 QUOTA_EXCEEDED, UI mở PaywallModal VietQR; tài khoản Pro được xử lý và lưu lịch sử an toàn',
    completed: false
  },
  {
    id: 'ac-pron-212-error-handling',
    given: 'Camera bị từ chối quyền hoặc ánh sáng quá tối không nhận diện được miệng',
    when: 'Người dùng chụp ảnh',
    then: 'Hiển thị thông báo hướng dẫn bật đèn hoặc cấp lại quyền camera, nút chụp chuyển disabled an toàn không crash app',
    completed: false
  },
  {
    id: 'ac-pron-212-scale-performance',
    given: '1,500 phiên đồng thời gọi API POST /api/v1/anatomy/mirror-analyze',
    when: 'Gửi request phân tích ảnh',
    then: 'Thời gian phản hồi P95 <= 800ms, FPS webcam giữ vững >= 55 FPS trên thiết bị tầm trung',
    completed: false
  }
]);

const tasks = JSON.stringify([
  { id: 't-pron-212-fe-capture', title: 'Xây dựng component WebcamMirrorCapture với đếm ngược 3s và khung ngắm căn chỉnh', category: 'Frontend', completed: false },
  { id: 't-pron-212-fe-crop', title: 'Xử lý crop vùng miệng client-side qua OffscreenCanvas và nén ảnh WebP <= 100KB', category: 'Frontend', completed: false },
  { id: 't-pron-212-fe-modal', title: 'Thiết kế ArticulationDiffModal so sánh song song ảnh thật vs hình Coronal Lip 2D', category: 'Frontend', completed: false },
  { id: 't-pron-212-be-api', title: 'Xây dựng API POST /api/v1/anatomy/mirror-analyze với Zod validation & RFC 7807', category: 'Backend', completed: false },
  { id: 't-pron-212-be-quota', title: 'Tích hợp middleware kiểm soát hạn ngạch 3 lượt/ngày gói Free và lưu SQLite', category: 'Backend', completed: false },
  { id: 't-pron-212-qa-test', title: 'Viết bộ test Vitest cho thuật toán so sánh delta khẩu hình và test luồng lỗi camera', category: 'QA', completed: false }
]);

const notes = `### 📋 Full Quality Audit Compliance (12/12 Gates PASS)
- Specification File: docs/USER_STORY_PRON_212_WEBCAM_MIRROR_ARTICULATION_ANALYSIS.md
- Epic: epic-articulation (Minimal Pairs & Mouth Placement Guide)
- Dependencies: PRON-201, LEG-101, USER-101
- Type: Fullstack (Frontend Canvas + Backend Scoring API + SQLite Table anatomy_mirror_snapshots)
- L1 Vietnamese Interference Remediation: /θ/ & /ð/ (interdental teeth gap), /ʃ/ & /uː/ (lip rounding ratio), /æ/ (jaw drop depth).`;

const sql = `
  INSERT OR REPLACE INTO stories (
    id, epic_id, title, persona, action, value, priority, status, size, points, acceptance_criteria, technical_tasks, notes, created_at, updated_at
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

db.prepare(sql).run(
  'PRON-212',
  'epic-articulation',
  'Webcam Mirror Snapshot & Articulatory Feature Comparison: Soi Gương Chụp Ảnh & Phân Tích Cơ Môi, Răng Đối Chiếu Với Âm Mẫu Giải Phẫu 2D',
  'Kỹ sư IT / Người đi làm người Việt hay phát âm bẹt môi, nuốt âm cuối và không tự nhìn thấy cơ mặt mình sai ở đâu',
  'bật camera gương soi trên màn hình Khẩu Hình 2D, chụp lại ảnh khoảnh khắc phát âm để hệ thống tự động đo đạc tỷ lệ cơ môi, khoảng hở răng và vị trí đầu lưỡi',
  'thấy ngay sai lệch hình học (độ mở hàm, độ dẹt môi) đối chiếu song song với hình giải phẫu chuẩn y khoa 2D và nhận hướng dẫn nắn chỉnh cơ mặt bằng tiếng Việt để sửa triệt để tật phát âm',
  'must',
  'todo',
  'L',
  8,
  acs,
  tasks,
  notes,
  now,
  now
);

console.log('PRON-212 successfully inserted into data/storymapper.db!');
