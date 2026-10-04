// Missing mandatory stories from docs/USER_STORY_QUALITY_CHECKLIST.md — Section 15
// Group: Progress (Gate H)

const ac = (id, given, when, then) => ({ id, given, when, then, completed: false });
const t = (id, title, category) => ({ id, title, category, completed: false });

export const progressReportingStories = [
  {
    id: 'PROG-101',
    epic_id: 'epic-retention',
    title: 'Progress Over Time Charts (7/30/90 Days): Biểu Đồ Tiến Độ Theo Thời Gian Cho Từng Kỹ Năng',
    persona: 'Học viên Pro luyện đều mỗi ngày và muốn thấy bằng chứng mình đang tiến bộ',
    action: 'xem biểu đồ điểm theo thời gian cho từng nhóm kỹ năng (âm cuối, nguyên âm, trọng âm, ngữ điệu) với các khoảng 7/30/90 ngày',
    value: 'có động lực duy trì thói quen khi thấy tiến bộ cụ thể; doanh nghiệp giảm churn khi học viên nhận thấy giá trị gói trả phí',
    priority: 'must',
    status: 'backlog',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      ac('ac-prog-101-chart', 'Học viên có ≥ 3 ngày luyện tập', 'Mở trang Tiến độ (`ProgressAnalyticsView.jsx`) và chọn khoảng 30 ngày', 'Hiển thị biểu đồ đường điểm trung bình theo ngày cho từng kỹ năng, dữ liệu lấy từ API server (không phải localStorage), tải ≤ 200ms P95 nhờ bảng tổng hợp theo ngày.'),
      ac('ac-prog-101-filter', 'Biểu đồ đang hiển thị', 'Chuyển 7 ↔ 30 ↔ 90 ngày hoặc bật/tắt từng kỹ năng', 'Biểu đồ cập nhật không tải lại trang; ngày không luyện hiển thị khoảng trống (không nội suy giả thành điểm).'),
      ac('ac-prog-101-empty', 'Học viên mới có < 3 ngày dữ liệu', 'Mở trang', 'Hiển thị trạng thái trống tiếng Việt "Luyện thêm X ngày để xem xu hướng" kèm nút vào bài luyện hôm nay.'),
      ac('ac-prog-101-entitlement', 'Người dùng Free', 'Chọn khoảng 30 hoặc 90 ngày', 'Free chỉ xem 7 ngày; 30/90 ngày hiển thị khoá kèm CTA nâng cấp — kiểm tra entitlement tại API (Free gọi range=90 nhận 403).'),
      ac('ac-prog-101-a11y', 'Người dùng dùng trình đọc màn hình hoặc màn hình 360px', 'Xem biểu đồ', 'Có bảng dữ liệu thay thế (aria) và biểu đồ responsive, không cuộn ngang.')
    ]),
    technical_tasks: JSON.stringify([
      t('t-prog-101-db', 'Bảng tổng hợp `daily_skill_scores` (user_id, date, skill, avg_score, attempts) cập nhật bởi job/trigger sau mỗi lượt chấm', 'Database'),
      t('t-prog-101-api', 'API GET /api/v1/progress/timeseries?range=7|30|90&skills=… có kiểm tra entitlement', 'Backend'),
      t('t-prog-101-fe', 'Refactor `ProgressAnalyticsView.jsx` dùng dữ liệu API, bộ lọc khoảng thời gian & kỹ năng, trạng thái trống/lỗi/đang tải', 'Frontend'),
      t('t-prog-101-qa', 'Unit test hàm tổng hợp; E2E kiểm tra Free bị khoá 90 ngày', 'QA')
    ]),
    notes: `### 📋 Gate applicability
- **Áp dụng**: A–E, G (G12), **H (H2 biểu đồ theo thời gian, H5 dữ liệu server)**, J (J1), K
- **Bối cảnh**: Checklist Mục 15 đánh dấu ⚠️ — đã có \`ProgressAnalyticsView.jsx\` nhưng chưa có story riêng & chưa dùng dữ liệu server.`
  },
  {
    id: 'PROG-102',
    epic_id: 'epic-retention',
    title: 'Before vs After Audio Comparison: So Sánh Giọng Nói "Ngày Đầu Tiên" Và "Hôm Nay"',
    persona: 'Học viên đã luyện 30 ngày, khó tự nhận ra mình tiến bộ vì thay đổi diễn ra từ từ',
    action: 'nghe lại bản ghi câu chuẩn của ngày đầu tiên và bản ghi mới nhất cạnh nhau, kèm chênh lệch điểm từng âm vị',
    value: 'cảm nhận rõ tiến bộ bằng chính tai mình — "khoảnh khắc wow" tạo động lực gia hạn và chia sẻ',
    priority: 'should',
    status: 'backlog',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      ac('ac-prog-102-baseline', 'Học viên hoàn thành bài chẩn đoán đầu vào (ELSA-102) và đồng ý lưu bản ghi (LEG-101)', 'Bài chẩn đoán kết thúc', 'Hệ thống lưu 5 câu chuẩn làm "baseline" trên object storage (mã hoá at-rest), gắn nhãn ngày ghi.'),
      ac('ac-prog-102-reprompt', 'Đã qua 14 / 30 / 60 ngày kể từ baseline', 'Học viên mở app', 'Gợi ý "Đọc lại 5 câu ngày đầu" (≤ 2 phút); bản ghi mới được chấm bằng cùng phiên bản mô hình để so sánh công bằng.'),
      ac('ac-prog-102-compare', 'Có cả bản baseline và bản mới', 'Mở thẻ "Trước & Sau"', 'Hai trình phát audio cạnh nhau + bảng chênh lệch điểm từng âm vị (vd /θ/ 42 → 78, +36), các âm cải thiện tô xanh, âm giảm tô cam.'),
      ac('ac-prog-102-model-change', 'Mô hình chấm điểm đã nâng cấp phiên bản giữa hai lần ghi', 'Hiển thị so sánh', 'Chấm lại bản baseline bằng mô hình mới (hoặc ghi chú rõ "điểm có thể không so sánh trực tiếp") — không hiển thị chênh lệch gây hiểu lầm.'),
      ac('ac-prog-102-no-consent', 'Học viên không đồng ý lưu bản ghi âm', 'Mở thẻ', 'Chỉ hiển thị so sánh điểm số, ẩn trình phát audio kèm giải thích.')
    ]),
    technical_tasks: JSON.stringify([
      t('t-prog-102-db', 'Bảng `baseline_recordings` (user_id, sentence_id, audio_key, model_version, score_json, recorded_at)', 'Database'),
      t('t-prog-102-api', 'API GET /api/v1/progress/before-after (trả signed URL audio TTL 10 phút)', 'Backend'),
      t('t-prog-102-fe', 'Thẻ "Trước & Sau" với 2 audio player, bảng delta âm vị', 'Frontend'),
      t('t-prog-102-qa', 'Test: thiếu consent, khác model_version, signed URL hết hạn', 'QA')
    ]),
    notes: `### 📋 Gate applicability
- **Áp dụng**: A–E, F (signed URL), **H (H4 so sánh trước/sau)**, I (I5 nhất quán mô hình), K, **L (🔴 L7 consent lưu giọng nói)**
- **Phụ thuộc**: ELSA-102, LEG-101, ARCH-104.`
  },
  {
    id: 'PROG-103',
    epic_id: 'epic-retention',
    title: 'Automated Weekly Progress Report: Báo Cáo Tiến Độ Hằng Tuần Qua Email & Trong Ứng Dụng',
    persona: 'Học viên bận rộn (dân IT, sinh viên ôn IELTS) không vào app mỗi ngày',
    action: 'nhận báo cáo tóm tắt mỗi tuần: số phút luyện, streak, âm cải thiện nhiều nhất, 3 âm cần ưu tiên tuần tới',
    value: 'được nhắc nhở nhẹ nhàng và có kế hoạch rõ ràng; doanh nghiệp tăng tỉ lệ quay lại (re-engagement) hằng tuần',
    priority: 'should',
    status: 'backlog',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      ac('ac-prog-103-generate', 'Đến 19:00 Chủ nhật theo múi giờ Asia/Ho_Chi_Minh', 'Job báo cáo tuần chạy', 'Sinh báo cáo cho mọi user có hoạt động trong 4 tuần qua và đang bật tuỳ chọn; xử lý theo lô, hoàn tất 5,000 user trong ≤ 30 phút mà không ảnh hưởng P95 API.'),
      ac('ac-prog-103-content', 'Báo cáo được sinh', 'Học viên mở email hoặc thẻ trong app', 'Gồm: tổng phút luyện & so với tuần trước, streak, top 3 âm cải thiện, 3 âm yếu nhất (từ SM-2 error bank) và nút "Bắt đầu bài tuần mới" deep-link.'),
      ac('ac-prog-103-inactive', 'Học viên không luyện tuần này', 'Báo cáo sinh ra', 'Nội dung chuyển sang dạng khích lệ ("Chỉ 5 phút để giữ phong độ") thay vì hiện số 0; không gửi quá 3 tuần liên tiếp nếu vẫn không hoạt động.'),
      ac('ac-prog-103-unsubscribe', 'Học viên không muốn nhận email', 'Bấm "Huỷ nhận" trong email (1 click) hoặc tắt trong Cài đặt', 'Ngừng gửi ngay lập tức; tuỳ chọn được tôn trọng bởi OPS-104.'),
      ac('ac-prog-103-pro', 'Người dùng Free', 'Nhận báo cáo', 'Free nhận bản tóm tắt cơ bản; Pro nhận thêm phân tích chi tiết từng âm và ước tính IELTS (ghi rõ "ước tính").')
    ]),
    technical_tasks: JSON.stringify([
      t('t-prog-103-job', 'Cron job + queue sinh báo cáo theo lô (batch 200 user) từ `daily_skill_scores`', 'Backend'),
      t('t-prog-103-template', 'Template email HTML tiếng Việt responsive + thẻ báo cáo trong app', 'Frontend'),
      t('t-prog-103-db', 'Bảng `weekly_reports` (user_id, week_start, payload_json, sent_at, opened_at)', 'Database'),
      t('t-prog-103-qa', 'Test múi giờ, user không hoạt động, unsubscribe, hiệu năng 5,000 user', 'QA')
    ]),
    notes: `### 📋 Gate applicability
- **Áp dụng**: A–E, **H (H6 báo cáo định kỳ)**, J (job không ảnh hưởng API), K, L (L10 analytics)
- **Phụ thuộc**: PROG-101 (bảng tổng hợp), OPS-104 (gửi email & tuỳ chọn), ELSA-402 (SM-2).`
  }
];
