# BỘ QUY CHUẨN KIỂM DUYỆT CHẤT LƯỢNG (QUALITY GATE PROTOCOL)
## Dành riêng cho Dự án Nền tảng Âm học VietPhonics AI

---

## I. NGUYÊN TẮC CỐT LÕI (CORE PRINCIPLES)

1. **Không chấp nhận sản phẩm làm dở (Zero Tolerance for Half-Baked Code)**:
   - Một User Story chỉ được chuyển từ `in-progress` sang `done` khi và chỉ khi **vượt qua toàn bộ 5 Cổng Kiểm Soát Chất Lượng (5 Quality Gates)** dưới đây.
   - Tuyệt đối không đánh dấu `done` dựa trên giả định, placeholder, hoặc code minh họa chưa chạy được.

2. **Quy tắc phân định Google Stitch vs. Development**:
   - **Google Stitch là Khuôn mẫu Thẩm mỹ (Single Source of Design Truth)**: Phải giữ đúng 100% bố cục, màu sắc, font chữ, SVG và đồ họa của Stitch.
   - **Development là Động cơ Thực thi Hoàn chỉnh (Full Functional Engine)**: Phải gắn thêm logic âm thanh thực tế (Web Audio API, Speech Synthesis, State management, L1 Acoustic algorithms, Gamification logic, VietQR payment).

---

## II. 5 CỔNG KIỂM SOÁT CHẤT LƯỢNG (THE 5 MANDATORY QUALITY GATES)

### 🚪 CỔNG 1: UI/UX & VISUAL FIDELITY GATE (Kiểm Duyệt Thẩm Mỹ & Giao Diện)
- [ ] **1.1 Design Tokens**: Bắt buộc sử dụng hệ thống tokens của Stitch trong `tailwind.config.js` (`space-xs: 0.25rem`, `space-sm: 0.5rem`, `space-md: 1rem`, `space-lg: 1.5rem`, `space-xl: 2.5rem`, `gutter-desktop: 2rem`). Không để xảy ra tình trạng thiếu token khiến card bị xẹp 0 padding hoặc 0 gap.
- [ ] **1.2 Bảng màu Chuẩn (Acoustic Lab Palette)**: 
  - Primary Rose: `#b80035` / `#e11d48`
  - Secondary Sky: `#006398` / `#0284c7`
  - Background: `#f8fafc`
  - Surface: `#ffffff` / `#faf8ff`
  - Semantic: Emerald `#059669` (Chuẩn >90%), Amber `#d97706` (Cảnh báo 60-89%), Rose `#e11d48` (Lỗi <60%).
- [ ] **1.3 Typography Phân Tầng Rõ Ràng**:
  - `Plus Jakarta Sans`: Toàn bộ tiêu đề (Headlines), nhãn (Labels), văn bản ngữ cảnh.
  - `JetBrains Mono`: Toàn bộ ký tự âm vị IPA, thông số telemetry GOP, tần số Hz, độ trễ ms, mã cú pháp thanh toán.
- [ ] **1.4 Asset & Vector Nguyên Bản**: Cấm thay ảnh 3D, chân dung hoặc biểu đồ SVG bằng icon div hoặc emoji tạm bợ. Phải dùng đúng vector SVG độ nét cao và ảnh từ Google CDN của Stitch.
- [ ] **1.5 Responsive Viewport**: Kiểm thử giao diện trên 4 độ phân giải: Desktop (1440px), Laptop (1024px), Tablet (768px), Mobile (375px). Không bị vỡ khung, tràn viền ngang (overflow-x), hoặc che khuất nút bấm.

---

### 🚪 CỔNG 2: FUNCTIONAL INTERACTIVITY & AUDIO PIPELINE GATE (Kiểm Duyệt Tương Tác)
- [ ] **2.1 Không có nút bấm chết (No Dead Buttons)**: 100% các nút bấm (Play, Record, Tab, Slider, Toggle, Modal trigger) phải có hàm xử lý sự kiện `onClick` / `onChange` tạo ra kết quả trực quan trên màn hình.
- [ ] **2.2 Thu âm Thực tế (Web Audio API)**:
  - Tích hợp hook ghi âm với tần số 16kHz mono, bộ đệm phân tích tín hiệu âm thanh thực hoặc mô phỏng phản hồi trực tiếp.
  - Trạng thái rõ ràng: Có hiệu ứng nhấp nháy (ping/pulse) khi đang thu âm và nhãn trạng thái đổi thành *"Đang Thu Âm..."*.
- [ ] **2.3 Phát âm Mẫu (Speech Synthesis / TTS)**:
  - Tích hợp Web Speech API hoặc audio file phát âm chuẩn giọng bản ngữ Oxford US.
  - Hỗ trợ đa tốc độ: Chuẩn (1.0x), Chậm (0.8x), Cực chậm bóc tách âm vị (0.5x).
- [ ] **2.4 Cử động Giải phẫu Động (SVG Parametric Morphing)**:
  - Ở màn hình khẩu hình, các thanh trượt (Độ nâng thân lưỡi, Độ mở quai hàm, Lực hơi) phải trực tiếp biến đổi tọa độ `transform: translate()` hoặc thuộc tính SVG theo thời gian thực.
  - Nút *"Xem hoạt họa khẩu hình"* phải chạy chu kỳ đẩy đầu lưỡi thò ra kẽ răng 2-3mm và thu về tự động.

---

### 🚪 CỔNG 3: L1 VIETNAMESE ACOUSTIC ACCURACY GATE (Kiểm Duyệt Chuẩn Âm Học L1)
- [ ] **3.1 Chẩn đoán Đúng Lỗi Thổ Âm Người Việt**:
  - Triệt tiêu lỗi nuốt phụ âm đuôi (Coda Deletion): `/ks/` trong *six*, `/t/` trong *baked*, `/nθs/` trong *months*.
  - Sửa lỗi kẹp lưỡi `/θ/` bị thụt thành âm tắc tiếng Việt `/tʰ/` hoặc `/s/`.
  - Khử dấu thanh (De-toning): Cảnh báo khi người học đánh dấu Sắc/Nặng vào âm tiết không mang trọng âm tiếng Anh.
- [ ] **3.2 Bù trừ 3 Phương Ngữ Vùng Miền**:
  - Miền Bắc: Cân chỉnh thiên kiến `/d/ ➔ /z/`, `/l/-/n/`.
  - Miền Trung: Cân chỉnh độ dốc thanh âm (Pitch Tonal Drop F0).
  - Miền Nam: Cân chỉnh tật rụng âm tắc cuối `-k`, `-t` và biến `/v/ ➔ /j/`.
- [ ] **3.3 Trực quan hóa Phổ Âm & Formant**:
  - Hiển thị đồ thị F0 Fundamental Frequency Tracking so sánh giữa giọng bản ngữ và giọng người học.
  - Cung cấp giải thích xúc giác (Tactile Trick) cụ thể bằng tiếng Việt dễ hiểu.

---

### 🚪 CỔNG 4: ACCEPTANCE CRITERIA & CODE PROOF GATE (Kiểm Duyệt Nghiệm Thu)
- [ ] **4.1 Kiểm tra Từng Tiêu Chí AC (Given - When - Then)**: Mỗi tiêu chí Acceptance Criteria trong story phải có đoạn code chứng minh chức năng hoạt động đúng kịch bản.
- [ ] **4.2 Kiểm tra Danh mục Tasks**: Tất cả các Technical Tasks (Design, Frontend, Backend, QA) phải được hoàn thành trong codebase thực tế.
- [ ] **4.3 Khớp Nối Kiến Trúc Dữ Liệu**: Các component phải kết nối nhịp nhàng qua `AppContext`, đồng bộ trạng thái Streak ngày học, Khiên bảo vệ, và giỏ hàng thanh toán.

---

### 🚪 CỔNG 5: BUILD, PERFORMANCE & GIT INTEGRITY GATE (Kiểm Duyệt Mã Nguồn)
- [ ] **5.1 Build Sạch 100%**: Lệnh `npm run build` phải biên dịch thành công 100%, không sinh lỗi (0 errors).
- [ ] **5.2 Tốc độ Tải Trang**: Bundle size tối ưu, Vite biên dịch dưới 1.5 giây.
- [ ] **5.3 Kỷ luật Nhánh Git (Strict Git Discipline)**:
  - Toàn bộ commit **BẮT BUỘC nằm trên nhánh `pronunciation-app`**.
  - **TUYỆT ĐỐI KHÔNG chạm vào hoặc commit lên nhánh `main`**.
  - Commit message tuân thủ chuẩn Conventional Commits (ví dụ: `feat(audio): ...`, `fix(ui): ...`).

---

## III. PROMPT MẪU ĐỂ CHẠY KIỂM THỬ TỪNG USER STORY

Khi cần kiểm thử và nghiệm thu bất kỳ User Story nào, sử dụng Prompt sau:

```text
Bạn là Trưởng nhóm QA & Kỹ sư Âm học L1 của VietPhonics.
Nhiệm vụ của bạn là kiểm duyệt User Story [MÃ_STORY] (ví dụ: PRON-101, GAME-101) theo đúng BỘ QUY CHUẨN QUALITY GATE PROTOCOL.

Hãy thực hiện kiểm tra nghiêm ngặt qua 5 Cổng:
1. CỔNG 1 (UI/UX Fidelity): Giao diện có khớp 100% mẫu Google Stitch tương ứng không? Có bị mất token Tailwind spacing không? Có dùng emoji thay asset không?
2. CỔNG 2 (Interactivity): Nút bấm, bộ thu âm Web Audio API 16kHz, audio mẫu TTS và thanh trượt SVG có hoạt động trơn tru không?
3. CỔNG 3 (L1 Acoustics): Logic chẩn đoán lỗi âm đuôi /ks, /t/ và thổ âm 3 miền có đúng chuẩn âm học tiếng Việt không?
4. CỔNG 4 (Acceptance Criteria): Tất cả các tiêu chí Given-When-Then đã có code thực thi chưa?
5. CỔNG 5 (Build & Git): npm run build có pass 100% không? Nhánh git có đúng là pronunciation-app không?

BÁO CÁO KẾT QUẢ:
- Điểm đánh giá từng Cổng (PASS / FAIL kèm dẫn chứng code cụ thể).
- NẾU PASS 5/5: Cho phép chuyển trạng thái Kanban từ 'in-progress' -> 'done'.
- NẾU FAIL BẤT KỲ CỔNG NÀO: Giữ nguyên 'in-progress', liệt kê chính xác các dòng code cần sửa chữa ngay lập tức.
```
