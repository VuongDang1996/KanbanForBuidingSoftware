# BỘ QUY CHUẨN KIỂM DUYỆT CHẤT LƯỢNG 10 CỔNG (10-GATE QUALITY PROTOCOL)
## Dành riêng cho Dự án Nền tảng Âm học VietPhonics AI

---

## I. NGUYÊN TẮC CỐT LÕI (CORE PRINCIPLES)

1. **Tuyệt đối Không Khoan Nhượng (Zero Tolerance for Incomplete Implementation)**:
   - Một User Story chỉ được chuyển từ `in-progress` sang `done` khi và chỉ khi **vượt qua toàn bộ 10 Cổng Kiểm Soát Chất Lượng (10 Mandatory Quality Gates)**.
   - Nếu trượt dù chỉ 1 cổng, story bắt buộc phải giữ ở trạng thái `in-progress` và đội ngũ kỹ thuật phải bổ sung code cho tới khi đạt 10/10.

2. **Google Stitch làm Khuôn Mẫu Thẩm Mỹ & Chuẩn Mực UX**:
   - Tuân thủ 100% tokens, bố cục Bento Grid, bảng màu âm học, và hệ thống typography. Không được đơn giản hóa hoặc thay thế bằng UI sơ sài.

3. **Development là Động Cơ Âm Học Thực Nghiệm**:
   - Tất cả tương tác âm thanh, giải phẫu khẩu hình, chẩn đoán thổ âm, tính toán GOP/Formants, và thanh toán VietQR đều phải có mã nguồn chạy thực tế.

---

## II. 10 CỔNG KIỂM SOÁT CHẤT LƯỢNG (THE 10 MANDATORY QUALITY GATES)

### 🚪 CỔNG 1: UI/UX & GOOGLE STITCH TOKENS FIDELITY GATE (Chuẩn Thẩm Mỹ)
- [ ] **1.1 Design Tokens**: Bắt buộc sử dụng đúng hệ thống spacing tokens (`space-xs: 0.25rem`, `space-sm: 0.5rem`, `space-md: 1rem`, `space-lg: 1.5rem`, `space-xl: 2.5rem`, `gutter-desktop: 2rem`) trong `tailwind.config.js`.
- [ ] **1.2 Bảng màu Âm Học (Acoustic Lab Palette)**: 
  - Primary Rose: `#e11d48` / `#b80035`
  - Secondary Sky/Teal: `#0284c7` / `#006398`
  - Semantic Status: Emerald `#10b981` (GOP >80%), Amber `#f59e0b` (GOP 60-79%), Rose `#f43f5e` (GOP <60%).
- [ ] **1.3 Bento Grid & Responsive**: Bố cục Bento Grid cân đối, hỗ trợ đầy đủ 4 kích thước màn hình (Desktop 1440px, Laptop 1024px, Tablet 768px, Mobile 375px), không bị vỡ layout hoặc tràn viền ngang (`overflow-x`).

### 🚪 CỔNG 2: TYPOGRAPHY & PHONETICS FONT STACK GATE (Chuẩn Ngữ Âm & Font Chữ)
- [ ] **2.1 Hierarchy Font Chữ**:
  - `Inter` / `Plus Jakarta Sans`: Hiển thị văn bản, tiêu đề, hướng dẫn học.
  - `JetBrains Mono`: Hiển thị telemetry, tần số Hz, độ trễ ms, chỉ số GOP, mã Napas VietQR.
- [ ] **2.2 Ký Tự Ngữ Âm Quốc Tế (IPA Precision)**: Ký hiệu IPA (`/ks/`, `/θ/`, `/ð/`, `/ʃ/`, `/dʒ/`, `/iː/`, `/æ/`, `/eə/`) phải được bọc trong font-ipa chuyên dụng, không bị méo hoặc hiển thị hình vuông (missing glyph).

### 🚪 CỔNG 3: FUNCTIONAL INTERACTIVITY & REACTIVE STATE GATE (Chuẩn Tương Tác)
- [ ] **3.1 Zero Dead Buttons**: 100% nút bấm, tabs, accordion, toggle và modal triggers đều có sự kiện xử lý thực tế (`onClick`, `onChange`).
- [ ] **3.2 Luồng Dữ Liệu Đồng Bộ**: Trạng thái âm học, hồ sơ phương ngữ, streak ngày học, số khiên bảo vệ được chia sẻ nhất quán qua `AppContext`.

### 🚪 CỔNG 4: REAL-TIME AUDIO PIPELINE & WEB AUDIO DSP GATE (Xử Lý Tín Hiệu Số)
- [ ] **4.1 Khởi tạo AudioContext 16kHz / 44.1kHz**: Hỗ trợ bộ đệm chuẩn hóa tín hiệu âm thanh thu từ microphone.
- [ ] **4.2 AnalyserNode FFT 2048**: Phân tích phổ tần số thời gian thực (Real-time frequency & time-domain data).
- [ ] **4.3 Quản lý Vòng Đời MediaStream**: Thu âm mượt mà, giải phóng microphone tracks ngay khi dừng để tránh rò rỉ bộ nhớ (memory leak).

### 🚪 CỔNG 5: SPEECH SYNTHESIS & PRONUNCIATION TTS GATE (Phát Âm Mẫu Bản Ngữ)
- [ ] **5.1 Giọng Bản Ngữ Chuẩn (US/UK Accent)**: Sử dụng Web Speech API `SpeechSynthesisUtterance` với giọng chuẩn `en-US`.
- [ ] **5.2 Đa Tốc Độ Phát Âm**: Hỗ trợ phát âm chuẩn 1.0x, chậm 0.85x và cực chậm 0.5x để soi chiếu từng âm vị.
- [ ] **5.3 Hủy Ngắt Trùng Lặp**: Gọi `window.speechSynthesis.cancel()` trước khi phát âm mới để tránh chồng lấn giọng.

### 🚪 CỔNG 6: L1 VIETNAMESE PHONETIC TRANSFER ACCURACY GATE (Chuẩn Thổ Âm L1)
- [ ] **6.1 Bắt Lỗi Rụng Âm Đuôi (Coda Deletion)**: Chẩn đoán chính xác lỗi rụng cụm `/ks/` (six, box), `/sts/` (tests), `/kt/` (baked), `/nθs/` (months).
- [ ] **6.2 Sửa Cặp Phụ Âm Răng Xát**: Bắt lỗi kẹp lưỡi `/θ/` bị thụt thành âm tắc `/tʰ/` hoặc `/s/`, `/ð/` thành `/d/` hoặc `/z/`.
- [ ] **6.3 Khử Dấu Thanh Tiếng Việt (De-toning)**: Nhắc nhở người học không đánh dấu Sắc/Nặng vào âm tiết yếu không mang trọng âm.
- [ ] **6.4 Mô Hình Cân Chỉnh 3 Miền**: 
  - Bắc: Khắc phục thiên kiến `/d/-/z/`, `/l/-/n/`.
  - Trung: Mở rộng khẩu hình nguyên âm đôi, giảm độ dồn dập F0.
  - Nam: Giữ trọn âm tắc cuối `-k`, `-t` và phân biệt `/v/-/j/`.

### 🚪 CỔNG 7: ACOUSTIC METRICS & SCIENTIFIC SCORING GATE (Đo Đạc Khoa Học)
- [ ] **7.1 Chỉ Số GOP (Goodness of Pronunciation)**: Tính toán điểm số âm vị dựa trên log-posterior likelihood chuẩn hóa từ 0 - 100%.
- [ ] **7.2 Biểu Đồ Formants F1/F2**: Trực quan hóa không gian nguyên âm (Vowel Space) giúp người học định vị độ mở hàm và vị trí lưỡi.
- [ ] **7.3 Đo Tốc Độ & Nhịp Điệu (WPM & F0 Pitch Tracking)**: Cung cấp chỉ số từ/phút và đường cong cao độ intonation so sánh với người bản ngữ.

### 🚪 CỔNG 8: ACCEPTANCE CRITERIA & CODE EVIDENCE GATE (Nghiệm Thu Given-When-Then)
- [ ] **8.1 Khớp 100% Tiêu Chí AC**: Mỗi tiêu chí Given-When-Then phải có bằng chứng code cụ thể trong các component React.
- [ ] **8.2 Hoàn Thành Technical Tasks**: Tất cả sub-tasks (Design, Logic, Audio, Verification) đều được hiện thực hóa.

### 🚪 CỔNG 9: ACCESSIBILITY (A11Y) & SEMANTIC HTML GATE (Khả Năng Tiếp Cận)
- [ ] **9.1 Thẻ HTML Ngữ Nghĩa**: Dùng đúng thẻ `<button>`, `<nav>`, `<header>`, `<table>`, `<svg>`.
- [ ] **9.2 Nhãn ARIA & Focus States**: Cung cấp `aria-label`, `role`, và `focus:ring` cho bàn phím điều hướng không dùng chuột.
- [ ] **9.3 Tương Tác Bàn Phím**: Hỗ trợ phím Enter/Space để kích hoạt phát âm và ghi âm.

### 🚪 CỔNG 10: PRODUCTION BUILD, PERFORMANCE & GIT INTEGRITY GATE (Kỷ Luật Kỹ Thuật)
- [ ] **10.1 Build Sạch 100%**: Lệnh `npm --prefix vietphonics-app run build` biên dịch thành công 0 lỗi.
- [ ] **10.2 Tốc Độ & Dung Lượng**: Vite build dưới 2.0s, tối ưu bundle production.
- [ ] **10.3 Tuyệt Đối Chỉ Commit Trên Nhánh `pronunciation-app`**: Không bao giờ can thiệp hoặc đẩy vào nhánh `main`.

---

## III. PROMPT MẪU KIỂM THỬ 10 CỔNG CHO TỪNG USER STORY

```text
Bạn là Trưởng Hội Đồng Thẩm Định Chất Lượng Âm Học (Lead Acoustic QA Auditor) của VietPhonics AI.
Nhiệm vụ: Thẩm định User Story [MÃ_STORY] theo BỘ QUY CHUẨN 10 CỔNG KIỂM SOÁT CHẤT LƯỢNG (10-GATE QUALITY PROTOCOL).

Hãy kiểm tra 10 Cổng:
1. CỔNG 1 (Tokens & Stitch Fidelity): Tokens spacing và màu sắc Stitch chuẩn không?
2. CỔNG 2 (Typography & IPA Precision): Font hierarchy và ký tự IPA có chuẩn xác không?
3. CỔNG 3 (Interactivity & State): Zero dead buttons, state quản lý thông suốt không?
4. CỔNG 4 (Audio Pipeline DSP): Web Audio API 16kHz/44.1kHz, AnalyserNode FFT 2048, VAD hoạt động chuẩn không?
5. CỔNG 5 (Speech Synthesis TTS): Phát âm bản ngữ US, đa tốc độ 0.5x-1.0x, cancel chống đè âm không?
6. CỔNG 6 (L1 Vietnamese Acoustics): Xử lý đúng tật rụng âm đuôi, cặp âm xát, khử dấu thanh, bù trừ 3 miền không?
7. CỔNG 7 (Acoustic Metrics & GOP): Tính điểm GOP, formants F1/F2, F0 pitch và WPM có bằng chứng code không?
8. CỔNG 8 (Acceptance Criteria Proof): Đáp ứng 100% Given-When-Then trong AC không?
9. CỔNG 9 (Accessibility & Semantics): Thẻ ngữ nghĩa semantic, ARIA labels, focus ring có đầy đủ không?
10. CỔNG 10 (Build & Git Discipline): Build sạch 0 error, commit nghiêm ngặt trên nhánh pronunciation-app không?

NẾU PASS ĐỦ 10/10: Cho phép đánh dấu 'done' kèm con dấu kiểm định [10-GATE QUALITY AUDIT PASSED].
NẾU THIẾU BẤT KỲ CỔNG NÀO: Giữ nguyên 'in-progress' và tiến hành bổ sung code ngay lập tức.
```
