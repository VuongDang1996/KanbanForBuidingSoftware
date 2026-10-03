# BỘ QUY CHUẨN KIỂM DUYỆT CHẤT LƯỢNG 11 CỔNG (11-GATE QUALITY PROTOCOL)
## Dành riêng cho Dự án Nền tảng Âm học VietPhonics AI

---

## I. NGUYÊN TẮC CỐT LÕI (CORE PRINCIPLES)

1. **Kiểm Thử Chậm Mà Chắc (Batch Execution 10 US / Lần)**:
   - Thay vì audit hàng loạt thiếu kiểm chứng hình ảnh thực tế, hệ thống bắt buộc audit theo từng cụm **10 User Stories một lần** (Batch 1: 1-10, Batch 2: 11-20, Batch 3: 21-30, Batch 4: 31-40, Batch 5: 41-50, Batch 6: 51-54).
   - Chỉ khi 10 US của batch hiện tại vượt qua toàn bộ 11 Cổng, có bằng chứng code và không vỡ layout thì mới được chuyển sang `done` và tiếp tục batch kế tiếp.

2. **Google Stitch làm Khuôn Mẫu Thẩm Mỹ & Chuẩn Mực UX**:
   - Tuân thủ 100% tokens, bố cục Bento Grid, bảng màu âm học, và hệ thống typography. Không được đơn giản hóa hoặc thay thế bằng UI sơ sài.

3. **Development là Động Cơ Âm Học Thực Nghiệm**:
   - Tất cả tương tác âm thanh, giải phẫu khẩu hình, chẩn đoán thổ âm, tính toán GOP/Formants, và thanh toán VietQR đều phải có mã nguồn chạy thực tế.

---

## II. 11 CỔNG KIỂM SOÁT CHẤT LƯỢNG (THE 11 MANDATORY QUALITY GATES)

### 🚪 CỔNG 1: UI/UX & GOOGLE STITCH TOKENS FIDELITY GATE (Chuẩn Thẩm Mỹ)
- [ ] **1.1 Design Tokens**: Bắt buộc sử dụng đúng hệ thống spacing tokens (`space-xs: 0.25rem`, `space-sm: 0.5rem`, `space-md: 1rem`, `space-lg: 1.5rem`, `space-xl: 2.5rem`, `gutter-desktop: 2rem`) trong `tailwind.config.js`.
- [ ] **1.2 Bảng màu Âm Học (Acoustic Lab Palette)**: 
  - Primary Rose: `#e11d48` / `#b80035`
  - Secondary Sky/Teal: `#0284c7` / `#006398`
  - Semantic Status: Emerald `#10b981` (GOP >80%), Amber `#f59e0b` (GOP 60-79%), Rose `#f43f5e` (GOP <60%).
- [ ] **1.3 Bento Grid Layout**: Bố cục Bento Grid cân đối, các khối card có padding và gap đồng nhất.

### 🚪 CỔNG 2: TYPOGRAPHY & PHONETICS FONT STACK GATE (Chuẩn Ngữ Âm & Font Chữ)
- [ ] **2.1 Hierarchy Font Chữ**:
  - `Inter` / `Plus Jakarta Sans`: Hiển thị văn bản, tiêu đề, hướng dẫn học.
  - `JetBrains Mono`: Hiển thị telemetry, tần số Hz, độ trễ ms, chỉ số GOP, mã Napas VietQR.
  - `Noto Sans`: Font ngữ âm quốc tế chuyên dụng cho ký hiệu IPA.
- [ ] **2.2 Ký Tự Ngữ Âm Quốc Tế (IPA Precision)**: Ký hiệu IPA (`/ks/`, `/θ/`, `/ð/`, `/ʃ/`, `/dʒ/`, `/iː/`, `/æ/`, `/eə/`, `/ʌ/`) không bị lỗi font glyph hoặc biến dạng thành ký tự lạ (như `/eunBs/`).

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
- [ ] **7.2 Biểu Đồ Formants F1/F2**: Trực quan hóa không gian nguyên âm (Vowel Space) giúp người học định vị độ mở hàm và vị trí lưỡi bằng thuật toán LPC Levinson-Durbin.
- [ ] **7.3 Đo Tốc Độ & Nhịp Điệu (WPM & F0 Pitch Tracking)**: Cung cấp chỉ số từ/phút và đường cong cao độ intonation so sánh với người bản ngữ.

### 🚪 CỔNG 8: ACCEPTANCE CRITERIA & CODE EVIDENCE GATE (Nghiệm Thu Given-When-Then)
- [ ] **8.1 Khớp 100% Tiêu Chí AC**: Mỗi tiêu chí Given-When-Then phải có bằng chứng code cụ thể trong các component React.
- [ ] **8.2 Hoàn Thành Technical Tasks**: Tất cả sub-tasks (Design, Logic, Audio, Verification) đều được hiện thực hóa.

### 🚪 CỔNG 9: ACCESSIBILITY (A11Y) & SEMANTIC HTML GATE (Khả Năng Tiếp Cận)
- [ ] **9.1 Thẻ HTML Ngữ Nghĩa**: Dùng đúng thẻ `<button>`, `<nav>`, `<header>`, `<table>`, `<svg>`, `<main>`.
- [ ] **9.2 100% Nút Có type="button" & aria-label**: Đảm bảo công cụ đọc màn hình nhận diện chính xác từng nút bấm.
- [ ] **9.3 Tương Tác Bàn Phím**: Hỗ trợ phím Space để kích hoạt/dừng ghi âm tức thì mà không cần dùng chuột.

### 🚪 CỔNG 10: PRODUCTION BUILD, PERFORMANCE & GIT INTEGRITY GATE (Kỷ Luật Kỹ Thuật)
- [ ] **10.1 Build Sạch 100%**: Lệnh `npm --prefix vietphonics-app run build` biên dịch thành công 0 lỗi.
- [ ] **10.2 Tốc Độ & Dung Lượng**: Vite build dưới 2.0s, tối ưu bundle production.
- [ ] **10.3 Tuyệt Đối Chỉ Commit Trên Nhánh `pronunciation-app`**: Không bao giờ can thiệp hoặc đẩy vào nhánh `main`.

### 🚪 CỔNG 11: VISUAL LAYOUT, VIEWPORT BOUNDARY & NO-OVERFLOW GATE (Chống Tràn & Chống Che Khuất)
- [ ] **11.1 Header Không Che Khuất Nội Dung**: Header sử dụng `sticky top-0` tự nhiên, nội dung trang không bị chìm dưới thanh điều hướng khi cuộn.
- [ ] **11.2 Chống Tràn Ngang 100% (No Horizontal Overflow)**: Thuộc tính `overflow-x-hidden` và `max-w-[1440px]` được áp dụng trên container toàn cục, thanh navbar thu gọn nhịp nhàng trên màn hình laptop (1024px-1366px), không gây hiện tượng trôi ngang (horizontal shift).
- [ ] **11.3 Vector Asset Bền Vững (Zero Broken Assets)**: Không phụ thuộc vào CDN ảnh ngoài dễ chết; toàn bộ logo và icon âm học dùng vector SVG nguyên bản chuẩn xác.

---

## III. QUY TRÌNH AUDIT THEO BATCH (CHẬM MÀ CHẮC - 10 US / LẦN)

1. **Batch 1**: US 1 đến US 10 $\rightarrow$ Audit 11 Cổng $\rightarrow$ Code proof $\rightarrow$ Update Done.
2. **Batch 2**: US 11 đến US 20 $\rightarrow$ Audit 11 Cổng $\rightarrow$ Code proof $\rightarrow$ Update Done.
3. **Batch 3**: US 21 đến US 30 $\rightarrow$ Audit 11 Cổng $\rightarrow$ Code proof $\rightarrow$ Update Done.
4. **Batch 4**: US 31 đến US 40 $\rightarrow$ Audit 11 Cổng $\rightarrow$ Code proof $\rightarrow$ Update Done.
5. **Batch 5**: US 41 đến US 50 $\rightarrow$ Audit 11 Cổng $\rightarrow$ Code proof $\rightarrow$ Update Done.
6. **Batch 6**: US 51 đến US 54 $\rightarrow$ Hoàn tất 100% dự án.
