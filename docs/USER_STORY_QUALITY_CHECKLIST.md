# ✅ VietPhonics — Bộ Tiêu Chí Kiểm Tra Chất Lượng User Story

> **Bối cảnh sản phẩm**: Web luyện phát âm tiếng Anh cho người Việt, **thu phí** (Freemium → Pro), mục tiêu **5,000 người dùng trả phí**, phải đủ sức cạnh tranh với ELSA Speak, BoldVoice, Speechace, Cake.
>
> **Cách dùng**: Mỗi story phải đi qua **12 cổng (Gate A → L)**. Mỗi cổng chấm `PASS / FAIL / N/A`. Một story chỉ được chuyển trạng thái khi đạt đủ điều kiện ở [Mục 2](#2-quy-tắc-trạng-thái--bằng-chứng-bắt-buộc).

---

## Mục lục

1. [Nguyên tắc chấm](#1-nguyên-tắc-chấm)
2. [Quy tắc trạng thái & bằng chứng bắt buộc](#2-quy-tắc-trạng-thái--bằng-chứng-bắt-buộc)
3. [Gate A — Nội dung story](#gate-a--nội-dung-story)
4. [Gate B — Acceptance Criteria](#gate-b--acceptance-criteria)
5. [Gate C — Frontend & UI/UX](#gate-c--frontend--uiux)
6. [Gate D — Backend & API](#gate-d--backend--api)
7. [Gate E — Database & Dữ liệu](#gate-e--database--dữ-liệu)
8. [Gate F — Đăng nhập, Tài khoản & Bảo mật](#gate-f--đăng-nhập-tài-khoản--bảo-mật)
9. [Gate G — Thanh toán & Kiếm tiền](#gate-g--thanh-toán--kiếm-tiền)
10. [Gate H — Theo dõi tiến độ (Progress)](#gate-h--theo-dõi-tiến-độ-progress)
11. [Gate I — Tính năng nâng cao & Khả năng cạnh tranh](#gate-i--tính-năng-nâng-cao--khả-năng-cạnh-tranh)
12. [Gate J — Hiệu năng & Scale 5,000 users](#gate-j--hiệu-năng--scale-5000-users)
13. [Gate K — Kiểm thử (QA)](#gate-k--kiểm-thử-qa)
14. [Gate L — Vận hành, Giám sát & Pháp lý](#gate-l--vận-hành-giám-sát--pháp-lý)
15. [Danh sách story BẮT BUỘC cho web trả phí](#15-danh-sách-story-bắt-buộc-cho-web-trả-phí)
16. [Ma trận cạnh tranh](#16-ma-trận-cạnh-tranh)
17. [Phiếu chấm điểm mẫu cho 1 story](#17-phiếu-chấm-điểm-mẫu-cho-1-story)
18. [Hiện trạng rà soát sơ bộ (03/10/2026)](#18-hiện-trạng-rà-soát-sơ-bộ-03102026)

---

## 1. Nguyên tắc chấm

| Nguyên tắc | Ý nghĩa |
| :--- | :--- |
| **Không có bằng chứng = FAIL** | Mọi AC đánh `completed: true` phải trỏ tới code, test hoặc ảnh chụp thực tế. Viết đẹp trong `notes` không được tính. |
| **Đúng loại story** | Story Frontend không được chèn DDL giả. Story Backend không được chèn mockup giả. Story Fullstack phải có **cả hai** và hai bên khớp nhau (API contract ↔ component gọi API). |
| **Đo được** | Mọi yêu cầu phi chức năng phải có con số: `P95 < 300ms`, `60 FPS`, `≥ 99.5% uptime`. Cấm các từ "nhanh", "mượt", "đẹp" đứng một mình. |
| **Không rập khuôn** | Hai story bất kỳ không được có AC trùng câu chữ > 30%. |
| **Người Việt là trung tâm** | Story phát âm phải nêu rõ lỗi L1 cụ thể (nuốt âm cuối, L/N, thanh điệu, /θ/→/t/…). |

**Mức nghiêm trọng khi FAIL:**

- 🔴 **Blocker** — không được merge / không được tính Done.
- 🟠 **Major** — được làm tiếp nhưng phải sửa trước khi release.
- 🟡 **Minor** — ghi nhận, sửa trong sprint sau.

---

## 2. Quy tắc trạng thái & bằng chứng bắt buộc

| Trạng thái | Điều kiện tối thiểu | Bằng chứng phải đính kèm |
| :--- | :--- | :--- |
| `backlog` | Có tiêu đề + persona + giá trị | — |
| `todo` (Ready) | Pass Gate A, B. Đã ước lượng points. Không còn câu hỏi mở. | Link wireframe (nếu FE), API contract nháp (nếu BE) |
| `in-progress` | Có branch / PR đang mở | Link PR hoặc commit hash |
| `review` | Code xong, test pass trên CI | Link CI run xanh |
| `done` | Pass **toàn bộ gate áp dụng**, chạy được trên môi trường staging | Commit hash + đường dẫn file + test + ảnh/video demo |

> [!IMPORTANT]
> Một AC chỉ được đánh `completed: true` khi trả lời được câu hỏi: **"Mở file nào, dòng nào, chạy lệnh gì để thấy nó hoạt động?"**. Nếu không trả lời được → `completed: false`.

**Định dạng bằng chứng đề xuất trong `notes`:**

```markdown
#### 🔎 Evidence
- Code: `vietphonics-app/src/views/PracticeStudioView.jsx#L120-L188`
- API: `server/routes/scoring.js` — `POST /api/v1/scoring/phoneme`
- Test: `tests/scoring.spec.js` (12 pass)
- Demo: `docs/evidence/ELSA-201.mp4`
- Commit: `a811506`
```

---

## Gate A — Nội dung story

| # | Tiêu chí | Mức | Cách kiểm |
| :-- | :--- | :-- | :--- |
| A1 | Đúng format: *Là [persona] tôi muốn [hành động] để [giá trị]* | 🔴 | Đọc 3 trường `persona / action / value` |
| A2 | Persona cụ thể (vd: "Dev remote làm với khách Mỹ"), không phải "người dùng" chung chung | 🟠 | |
| A3 | Giá trị gắn với mục tiêu kinh doanh: giữ chân, chuyển đổi Pro, hoặc tăng điểm phát âm | 🟠 | |
| A4 | **INVEST**: Độc lập, Thương lượng được, Có giá trị, Ước lượng được, Nhỏ (≤ 13 points), Kiểm thử được | 🔴 | Story > 13 points phải tách |
| A5 | Ghi rõ loại: `Pure Frontend` / `Pure Backend` / `Fullstack` | 🔴 | Dòng đầu của `notes` |
| A6 | Có priority MoSCoW hợp lý (Must cho login, thanh toán, chấm điểm lõi) | 🟠 | |
| A7 | Nêu phụ thuộc (depends on story nào) | 🟠 | vd: PAY-101 phụ thuộc USER-101, ARCH-103 |
| A8 | Nêu rõ **ngoài phạm vi** (out of scope) | 🟡 | |
| A9 | Story phát âm có nêu lỗi L1 tiếng Việt cụ thể | 🟠 | |
| A10 | Không trùng nội dung với story khác | 🟠 | So sánh tiêu đề + AC |

---

## Gate B — Acceptance Criteria

| # | Tiêu chí | Mức |
| :-- | :--- | :-- |
| B1 | Viết dạng **Given / When / Then** | 🔴 |
| B2 | 3–6 AC mỗi story (ít hơn = thiếu, nhiều hơn = nên tách) | 🟠 |
| B3 | Mỗi AC kiểm thử được bằng 1 test case cụ thể | 🔴 |
| B4 | Có ít nhất **1 AC cho luồng lỗi** (mất mạng, từ chối mic, hết quota, thanh toán thất bại…) | 🔴 |
| B5 | Có ít nhất **1 AC phi chức năng có số đo** (latency, FPS, kích thước…) | 🟠 |
| B6 | Có AC về **phân quyền Free / Pro** nếu tính năng có giới hạn | 🔴 |
| B7 | Có AC về **khả năng tiếp cận** (bàn phím, contrast, aria) với story giao diện | 🟡 |
| B8 | Trạng thái `completed` khớp với bằng chứng ở Mục 2 | 🔴 |

**Ví dụ AC ĐẠT:**

```
Given  học viên gói Free đã dùng 5/5 bài hôm nay
When   bấm vào bài thứ 6
Then   API trả 429 kèm { code: "QUOTA_EXCEEDED", resetAt }, UI mở PaywallModal,
       và không có request nào gửi tới worker chấm điểm
```

**Ví dụ AC KHÔNG ĐẠT:** *"Giao diện đẹp, mượt, chịu được 5,000 người dùng."* → không đo được, không test được.

---

## Gate C — Frontend & UI/UX

### C.1 Thiết kế & bố cục

| # | Tiêu chí | Mức |
| :-- | :--- | :-- |
| C1 | Có link wireframe thật trong `vietphonics-app/src/ui-reference/` | 🟠 |
| C2 | Liệt kê cây component (tên file thật) | 🟠 |
| C3 | Đủ **5 trạng thái UI**: loading, empty, error, success, disabled | 🔴 |
| C4 | Responsive: 360px (mobile), 768px (tablet), 1280px+ (desktop) | 🔴 |
| C5 | Dùng design token thống nhất (màu, spacing, font) — không hard-code lung tung | 🟡 |
| C6 | Microcopy tiếng Việt tự nhiên, thông báo lỗi nói rõ **người dùng phải làm gì** | 🟠 |

### C.2 Hiệu năng phía client

| # | Chỉ số | Ngưỡng |
| :-- | :--- | :--- |
| C7 | LCP (trang chính) | ≤ 2.5s trên 4G |
| C8 | INP | ≤ 200ms |
| C9 | CLS | ≤ 0.1 |
| C10 | Bundle JS khởi đầu | ≤ 250KB gzip (hiện tại ~137KB ✅ app, ~250KB ⚠️ Kanban) — dùng code-splitting cho Game3D, AdvancedAiLab |
| C11 | Canvas / animation | ≥ 55 FPS trên máy tầm trung, không rò rỉ bộ nhớ sau 10 phút |
| C12 | Ghi âm | Bắt đầu thu ≤ 150ms sau khi bấm, xử lý trong AudioWorklet (không chặn main thread) |

### C.3 Âm thanh & thiết bị

| # | Tiêu chí | Mức |
| :-- | :--- | :-- |
| C13 | Xử lý từ chối quyền mic / camera có hướng dẫn cấp lại | 🔴 |
| C14 | Hoạt động trên Chrome, Edge, Safari iOS 16+, Chrome Android | 🔴 |
| C15 | Mở khoá AudioContext trên Safari iOS sau thao tác chạm đầu tiên | 🔴 |
| C16 | Phát hiện tiếng ồn nền / âm lượng quá nhỏ và nhắc người dùng | 🟠 |

### C.4 Khả năng tiếp cận

| # | Tiêu chí | Mức |
| :-- | :--- | :-- |
| C17 | Điều hướng được hoàn toàn bằng bàn phím | 🟠 |
| C18 | Contrast chữ ≥ 4.5:1 | 🟠 |
| C19 | Thông tin không chỉ truyền qua màu (thêm icon cho đúng/sai) | 🟠 |
| C20 | Tôn trọng `prefers-reduced-motion` | 🟡 |

---

## Gate D — Backend & API

| # | Tiêu chí | Mức |
| :-- | :--- | :-- |
| D1 | API contract đầy đủ: method, path, header, request body, **mọi** mã response (200/400/401/403/404/409/429/500) | 🔴 |
| D2 | Có versioning `/api/v1/` | 🟠 |
| D3 | Validate input bằng schema (Zod / Joi / JSON Schema), từ chối payload sai | 🔴 |
| D4 | Lỗi trả về định dạng thống nhất (RFC 7807: `type, title, status, detail, code`) | 🟠 |
| D5 | Endpoint ghi dữ liệu có **idempotency** (đặc biệt thanh toán, nộp bài) | 🔴 |
| D6 | Tác vụ nặng (chấm điểm AI, xử lý audio) chạy **bất đồng bộ** qua queue, API trả 202 | 🔴 |
| D7 | Có timeout + retry + dead-letter queue cho worker | 🟠 |
| D8 | Mọi endpoint (trừ public) yêu cầu xác thực và kiểm tra quyền sở hữu dữ liệu (user A không đọc được dữ liệu user B) | 🔴 |
| D9 | Có rate limit theo user và theo IP | 🔴 |
| D10 | Có pagination cho danh sách (lịch sử, error bank, leaderboard) | 🟠 |
| D11 | Logging có `requestId`, không log mật khẩu / token / audio thô | 🔴 |
| D12 | Có tài liệu OpenAPI / Swagger | 🟡 |

---

## Gate E — Database & Dữ liệu

| # | Tiêu chí | Mức |
| :-- | :--- | :-- |
| E1 | DDL thật (bảng, kiểu, khoá chính, khoá ngoại, ràng buộc CHECK/UNIQUE) | 🔴 |
| E2 | Index cho mọi truy vấn thường xuyên; có `EXPLAIN ANALYZE` cho truy vấn nóng | 🟠 |
| E3 | Có migration có thể rollback | 🔴 |
| E4 | Tiền tệ lưu bằng số nguyên (VND) hoặc `NUMERIC`, **không dùng float** | 🔴 |
| E5 | Thời gian lưu `TIMESTAMPTZ` (UTC), hiển thị theo `Asia/Ho_Chi_Minh` | 🟠 |
| E6 | Bảng lớn (điểm âm vị, log) có chiến lược partition / archive | 🟠 |
| E7 | Backup tự động hằng ngày, đã **thử khôi phục** ít nhất 1 lần | 🔴 |
| E8 | Có chính sách lưu giữ & xoá audio (vd Free 7 ngày, Pro 90 ngày) | 🟠 |
| E9 | Connection pooling (PgBouncer hoặc pool của ORM) cấu hình cho tải dự kiến | 🟠 |

---

## Gate F — Đăng nhập, Tài khoản & Bảo mật

> Đây là nền móng của web trả phí. **Không có Gate F hoàn chỉnh thì không được bật thanh toán.**

### F.1 Chức năng tài khoản tối thiểu

| # | Chức năng | Mức |
| :-- | :--- | :-- |
| F1 | Đăng ký bằng email + mật khẩu, **xác minh email** | 🔴 |
| F2 | Đăng nhập Google (OAuth 2.0 / OIDC) | 🔴 |
| F3 | Quên mật khẩu / đặt lại qua email (link hết hạn ≤ 30 phút, dùng 1 lần) | 🔴 |
| F4 | Đăng xuất, đăng xuất khỏi mọi thiết bị | 🟠 |
| F5 | Trang hồ sơ: đổi tên, avatar, vùng miền (Bắc/Trung/Nam), mục tiêu (IELTS / công việc / giao tiếp) | 🟠 |
| F6 | **Xoá tài khoản** và xuất dữ liệu cá nhân (theo Nghị định 13/2023/NĐ-CP) | 🔴 |
| F7 | Onboarding sau đăng ký: bài chẩn đoán 3 phút → lộ trình cá nhân | 🟠 |

### F.2 Bảo mật

| # | Tiêu chí | Mức |
| :-- | :--- | :-- |
| F8 | Mật khẩu băm bằng **Argon2id** hoặc bcrypt (cost ≥ 12) | 🔴 |
| F9 | Session/JWT lưu trong cookie `HttpOnly; Secure; SameSite=Lax`, **không** lưu trong `localStorage` | 🔴 |
| F10 | Access token ngắn hạn (≤ 15 phút) + refresh token xoay vòng, thu hồi được | 🔴 |
| F11 | Chống brute-force: khoá tạm sau 5 lần sai, CAPTCHA khi nghi ngờ | 🔴 |
| F12 | Bảo vệ CSRF cho request thay đổi dữ liệu | 🔴 |
| F13 | Phân quyền phía **server** (Free / Pro / Admin) — không tin dữ liệu `tier` gửi từ client | 🔴 |
| F14 | HTTPS toàn bộ, HSTS, CSP, không lộ secret trong bundle frontend | 🔴 |
| F15 | Kiểm tra OWASP Top 10 trước khi release | 🔴 |
| F16 | Chống chia sẻ tài khoản Pro: giới hạn số thiết bị đăng nhập đồng thời (vd 2) | 🟠 |

---

## Gate G — Thanh toán & Kiếm tiền

| # | Tiêu chí | Mức |
| :-- | :--- | :-- |
| G1 | Bảng giá rõ ràng (tháng / năm), hiển thị giá đã gồm VAT | 🔴 |
| G2 | Ít nhất 2 kênh: VietQR chuyển khoản + ví (MoMo / ZaloPay) hoặc thẻ (VNPay / Stripe) | 🔴 |
| G3 | Kích hoạt Pro **tự động** qua webhook có xác thực chữ ký (HMAC) | 🔴 |
| G4 | Webhook **idempotent** — gửi lại 10 lần vẫn chỉ cộng 1 lần | 🔴 |
| G5 | Đối soát định kỳ (cron) cho giao dịch không nhận được webhook | 🔴 |
| G6 | Xử lý chuyển thiếu / thừa tiền / sai nội dung chuyển khoản | 🟠 |
| G7 | Gia hạn, nhắc trước khi hết hạn (3 ngày), thời gian ân hạn | 🟠 |
| G8 | Lịch sử giao dịch + hoá đơn tải về cho người dùng | 🟠 |
| G9 | Chính sách hoàn tiền rõ ràng, có luồng yêu cầu hoàn tiền | 🟠 |
| G10 | Xuất **hoá đơn điện tử** theo quy định (Nghị định 123/2020) | 🟠 |
| G11 | Mã giảm giá / dùng thử Pro 7 ngày | 🟡 |
| G12 | Quota Free được kiểm tra ở **server** (không chỉ ẩn nút ở UI) | 🔴 |
| G13 | Trang admin xem doanh thu, MRR, churn, số user Pro | 🟠 |

---

## Gate H — Theo dõi tiến độ (Progress)

> Người trả tiền phải **thấy mình tiến bộ** — đây là lý do chính họ gia hạn.

| # | Tiêu chí | Mức |
| :-- | :--- | :-- |
| H1 | Mọi lần luyện tập được **lưu vào server** (không chỉ `localStorage`) và đồng bộ đa thiết bị | 🔴 |
| H2 | Dashboard tổng quan: điểm tổng, streak, số phút luyện, số âm đã thuần thục / 44 | 🔴 |
| H3 | Biểu đồ tiến độ theo thời gian (7 / 30 / 90 ngày) cho từng kỹ năng | 🔴 |
| H4 | Ma trận 44 âm IPA với màu theo mức thành thạo | 🟠 |
| H5 | So sánh "trước / sau": nghe lại bản ghi ngày đầu vs hôm nay | 🟠 |
| H6 | Ước tính band IELTS / CEFR có ghi rõ là **ước tính** và phương pháp tính | 🟠 |
| H7 | Báo cáo tuần qua email / thông báo | 🟡 |
| H8 | Error Bank + ôn tập ngắt quãng (SM-2) có lịch ôn thực tế | 🟠 |
| H9 | Mục tiêu cá nhân (vd: "Đạt 80% âm cuối trong 30 ngày") và % hoàn thành | 🟡 |
| H10 | Xuất báo cáo PDF / chia sẻ thành tích | 🟡 |
| H11 | Số liệu tiến độ được tính từ dữ liệu thật, có test đảm bảo công thức đúng | 🔴 |

---

## Gate I — Tính năng nâng cao & Khả năng cạnh tranh

| # | Tiêu chí | Mức |
| :-- | :--- | :-- |
| I1 | Chấm điểm đến **mức âm vị** (không chỉ cả từ), có vị trí lỗi trong từ | 🔴 |
| I2 | Phản hồi trong ≤ 2s sau khi nói xong (P95) | 🔴 |
| I3 | Độ chính xác chấm điểm được **đo trên tập dữ liệu người Việt** (≥ 200 mẫu, có nhãn chuyên gia), công bố mức tương quan với giám khảo | 🔴 |
| I4 | Hướng dẫn sửa lỗi bằng tiếng Việt kèm hình khẩu hình | 🟠 |
| I5 | Trọng âm, ngữ điệu, nối âm (không chỉ âm đơn) | 🟠 |
| I6 | Hội thoại AI (roleplay) theo tình huống: công sở, phỏng vấn, du lịch, IELTS | 🟠 |
| I7 | Tính năng khác biệt riêng cho người Việt: hiệu chỉnh theo vùng miền, cảnh báo thanh điệu | 🟠 |
| I8 | Chi phí AI mỗi user được ước tính và **thấp hơn doanh thu mỗi user** (vd ≤ 30% giá gói) | 🔴 |
| I9 | Có phương án dự phòng khi nhà cung cấp AI / API ngoài bị lỗi | 🟠 |
| I10 | Dữ liệu giọng nói không dùng để huấn luyện nếu người dùng chưa đồng ý | 🔴 |

---

## Gate J — Hiệu năng & Scale 5,000 users

### J.1 Giả định tải (phải ghi rõ trong story hạ tầng)

| Thông số | Giá trị giả định |
| :--- | :--- |
| Tổng user trả phí | 5,000 |
| DAU (khoảng 40%) | ~2,000 |
| Đồng thời giờ cao điểm (20h–22h, ~15% DAU) | **~300–500 phiên** |
| Lượt chấm điểm / user / ngày | ~40 |
| Tổng lượt chấm / ngày | ~80,000 |
| Đỉnh lượt chấm / giây | ~15–30 req/s |
| Dung lượng audio (Opus 32kbps, 5s/lượt) | ~20KB/lượt → ~1.6GB/ngày |

> [!NOTE]
> "5,000 users" **không** có nghĩa 5,000 người dùng cùng một giây. Thiết kế theo số đồng thời thực tế, nhưng **load test ở mức gấp 3** (≈ 1,500 phiên đồng thời) để có dư địa.

### J.2 Ngưỡng bắt buộc

| # | Chỉ số | Ngưỡng |
| :-- | :--- | :--- |
| J1 | API thường (đọc profile, dashboard) | P95 ≤ 200ms |
| J2 | Chấm điểm phát âm end-to-end | P95 ≤ 2s |
| J3 | Tỉ lệ lỗi 5xx | < 0.5% |
| J4 | Uptime | ≥ 99.5% / tháng |
| J5 | Load test (k6 / Artillery) ở 1,500 phiên đồng thời trong 30 phút | Pass J1–J3 |
| J6 | Static asset & audio mẫu qua CDN | Cache hit ≥ 90% |
| J7 | Worker AI tự mở rộng theo độ dài queue | Có cấu hình + đã test |
| J8 | Không có điểm lỗi đơn lẻ cho DB (có replica hoặc managed DB có failover) | 🟠 |

---

## Gate K — Kiểm thử (QA)

| # | Tiêu chí | Mức |
| :-- | :--- | :-- |
| K1 | Unit test cho logic tính điểm, quota, SM-2, giá tiền | 🔴 |
| K2 | Integration test cho API (auth, thanh toán, chấm điểm) | 🔴 |
| K3 | E2E test (Playwright) cho luồng: đăng ký → chẩn đoán → luyện → hết quota → nâng cấp Pro → luyện tiếp | 🔴 |
| K4 | Test trên thiết bị thật: iPhone (Safari), Android tầm trung, laptop Windows | 🟠 |
| K5 | Test với giọng thật của người Việt 3 miền | 🟠 |
| K6 | Test luồng lỗi: mất mạng giữa chừng, mic bị chiếm, token hết hạn, webhook trùng | 🔴 |
| K7 | CI chạy test + build mỗi PR, không merge khi đỏ | 🔴 |
| K8 | Test bảo mật cơ bản (OWASP ZAP hoặc tương đương) | 🟠 |

---

## Gate L — Vận hành, Giám sát & Pháp lý

| # | Tiêu chí | Mức |
| :-- | :--- | :-- |
| L1 | Error tracking (Sentry) cho cả frontend và backend | 🔴 |
| L2 | Metrics & dashboard (latency, lỗi, queue depth, doanh thu) + cảnh báo | 🟠 |
| L3 | Log tập trung, giữ ≥ 14 ngày | 🟠 |
| L4 | Môi trường tách biệt: dev / staging / production, secret quản lý riêng | 🔴 |
| L5 | Quy trình deploy có thể rollback trong ≤ 10 phút | 🟠 |
| L6 | Điều khoản sử dụng, Chính sách bảo mật, Chính sách hoàn tiền (tiếng Việt) | 🔴 |
| L7 | Xin đồng ý rõ ràng trước khi thu âm / bật camera / lưu giọng nói | 🔴 |
| L8 | Tuân thủ Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân | 🔴 |
| L9 | Kênh hỗ trợ khách hàng (Zalo / email) + FAQ | 🟠 |
| L10 | Product analytics: funnel đăng ký → kích hoạt → trả phí → gia hạn | 🟠 |

---

## 15. Danh sách story BẮT BUỘC cho web trả phí

Đối chiếu với 72 story trong backlog (54 story ban đầu + 18 story bổ sung). ✅ = đã có story hoàn chỉnh trong backlog.

| Nhóm | Story cần có | Hiện trạng & Story ID |
| :--- | :--- | :--- |
| **Tài khoản** | Đăng ký email + xác minh | ✅ **USER-106** (Xác minh OTP/Magic link, Argon2id, chống bot/disposable mail) |
| | Đăng nhập Google | ✅ **USER-101** (Google OAuth, JWT HttpOnly, CSRF token) |
| | Quên / đặt lại mật khẩu | ✅ **USER-103** (Token 1 lần 30 phút, SHA-256, thu hồi mọi phiên) |
| | Quản lý hồ sơ & thiết bị đăng nhập | ✅ **USER-104** (Tối đa 2 phiên đồng thời, thu hồi từ xa, profile L1) |
| | Xoá tài khoản & xuất dữ liệu (NĐ 13/2023) | ✅ **USER-105** (Quyền lãng quên, xuất file ZIP JSON, ân hạn 7 ngày) |
| **Thanh toán** | Bảng giá, chu kỳ | ✅ **PAY-103** (Tháng 299k, Năm 1.499k, Trọn đời, so sánh ROI) |
| | VietQR + webhook + đối soát | ✅ **PAY-101**, **ARCH-103** (Tự động đối soát, kích hoạt Pro ≤ 3s) |
| | Ví / thẻ (MoMo, VNPay, Stripe) | ✅ **PAY-105** (Đa kênh MoMo, ZaloPay, VNPay, Stripe cards, HMAC-SHA256) |
| | Lịch sử giao dịch, hoá đơn, hoàn tiền | ✅ **PAY-106** (Bảng giao dịch, tải biên lai PDF, tự yêu cầu hoàn tiền 7 ngày) |
| | Hoá đơn điện tử (NĐ 123/2020) | ✅ **PAY-107** (Xuất HĐĐT tự động qua MISA/VNPT/Viettel, xác thực MST) |
| | Mã giảm giá / dùng thử 7 ngày | ✅ **PAY-108** (Dùng thử 7 ngày không cần thẻ, engine coupon, auto-downgrade) |
| **Progress** | Dashboard & radar kỹ năng | ✅ **USER-101** (Radar 5 trục ngữ âm, CEFR, IELTS ước tính) |
| | Biểu đồ tiến độ theo thời gian | ✅ **PROG-101** (Chuỗi thời gian 7/30/90 ngày, daily velocity, heatmap) |
| | So sánh trước / sau | ✅ **PROG-102** (Đối chiếu audio Day 1 vs Day 30, spectrogram delta) |
| | Báo cáo tuần tự động | ✅ **PROG-103** (Bản tin email tuần, top 3 âm yếu, deep-link 1-click) |
| **Vận hành** | Trang admin (user, doanh thu, nội dung) | ✅ **OPS-101** (Bảng điều khiển MRR, Churn rate, tra cứu user, quota override) |
| | Giám sát & cảnh báo | ✅ **OPS-102** (APM Sentry, Prometheus P95, bot Telegram/Slack On-Call) |
| | CMS quản lý bài học / câu luyện | ✅ **OPS-103** (Quản trị câu luyện, kiểm tra cú pháp IPA, upload audio R2) |
| | Hệ thống thông báo (email / push) | ✅ **OPS-104** (Trung tâm thông báo in-app, nhắc nhở streak 20:30, email) |
| **Pháp lý** | Điều khoản, chính sách, consent thu âm | ✅ **LEG-101** (ToS, Privacy Policy NĐ 13/2023, modal chấp thuận mic & giọng nói) |
| **Chất lượng AI** | Bộ dữ liệu đánh giá giọng Việt & báo cáo độ chính xác | ✅ **AIQ-101** (200 mẫu 3 miền, dán nhãn 2 chuyên gia, tương quan r ≥ 0.85) |
| **Scale** | Load test 1,500 phiên đồng thời | ✅ **SCL-101** (Kịch bản k6 1,500 VUs, P95 < 2s, 5xx < 0.5%, RAM/CPU ổn định) |


---

## 16. Ma trận cạnh tranh

> Mục đích: mỗi tính năng "phải có" của đối thủ cần có story tương ứng; mỗi điểm khác biệt của VietPhonics cần được làm **tốt hơn rõ rệt**.

| Năng lực | Mức thị trường kỳ vọng | Story VietPhonics | Đánh giá |
| :--- | :--- | :--- | :--- |
| Chấm điểm mức âm vị | Bắt buộc | ELSA-201, PRON-203 | Cần chứng minh độ chính xác (I3) |
| Lộ trình cá nhân hoá | Bắt buộc | ELSA-401, VN-102 | OK nếu dữ liệu lưu server |
| Hội thoại AI | Phổ biến ở app trả phí | ELSA-301, VN-104 | Cần chi phí/user rõ ràng (I8) |
| Ước tính IELTS | Phổ biến | ELSA-103, VN-104 | Phải ghi "ước tính" |
| Video hướng dẫn khẩu hình | Phổ biến | PRON-210 | Đang `todo` |
| Streak, gamification | Phổ biến | ELSA-601, GAME-101..105 | Điểm cộng |
| **Hiệu chỉnh theo vùng miền Việt** | Hiếm | ELSA-102, VN-101..105 | **Điểm khác biệt chính** |
| **Giải thích lỗi bằng tiếng Việt + so sánh với tiếng Việt** | Hiếm | VN-105, PRON-201 | **Điểm khác biệt chính** |
| **Thanh toán VietQR không cần thẻ** | Hiếm ở app quốc tế | PAY-101 | **Lợi thế chuyển đổi** |
| Golden Speaker, soi khẩu hình webcam, biểu đồ F1/F2 | Nâng cao | ADV-101..103 | Điểm cộng, không phải lõi |

---

## 17. Phiếu chấm điểm mẫu cho 1 story

Sao chép bảng này vào phần `notes` hoặc file review của từng story.

```markdown
### 🧪 Quality Review — <STORY-ID>
Người review: ______   Ngày: ______   Loại: FE / BE / Fullstack

| Gate | Kết quả | Ghi chú / Bằng chứng |
| :--- | :--- | :--- |
| A — Nội dung            | PASS / FAIL / N/A | |
| B — Acceptance Criteria | PASS / FAIL / N/A | |
| C — Frontend            | PASS / FAIL / N/A | |
| D — Backend & API       | PASS / FAIL / N/A | |
| E — Database            | PASS / FAIL / N/A | |
| F — Auth & Bảo mật      | PASS / FAIL / N/A | |
| G — Thanh toán          | PASS / FAIL / N/A | |
| H — Progress            | PASS / FAIL / N/A | |
| I — Nâng cao / Cạnh tranh | PASS / FAIL / N/A | |
| J — Scale 5,000 users   | PASS / FAIL / N/A | |
| K — QA                  | PASS / FAIL / N/A | |
| L — Vận hành & Pháp lý  | PASS / FAIL / N/A | |

Blocker còn mở: __
Trạng thái đề xuất: backlog / todo / in-progress / review / done
```

**Quy tắc kết luận:**

- Có ≥ 1 🔴 FAIL → **không được `done`**.
- Có ≥ 3 🟠 FAIL → tối đa `review`.
- Toàn bộ gate áp dụng PASS + có bằng chứng → `done`.

---

## 18. Hiện trạng rà soát sơ bộ (03/10/2026)

> [!WARNING]
> Rà soát nhanh mã nguồn cho thấy **trạng thái `done` của nhiều story đang cao hơn thực tế**. Cần chấm lại theo Mục 2 trước khi dùng Kanban để báo cáo tiến độ.

**Phát hiện từ mã nguồn `vietphonics-app/`:**

| # | Phát hiện | Ảnh hưởng |
| :-- | :--- | :--- |
| 1 | Script `npm run server` trỏ tới `server/index.js` nhưng **thư mục `vietphonics-app/server/` không tồn tại** | Chưa có backend thật cho app → mọi AC về API, webhook, DB thật đều chưa có bằng chứng |
| 2 | `package.json` không có thư viện xác thực (OAuth, JWT, bcrypt/argon2) hay driver PostgreSQL / Redis | USER-101 (đăng nhập Google, JWT HttpOnly) chưa thể là `done` |
| 3 | `src/lib/billing/reconciler.js`, `src/lib/middleware/quotaLimiter.js`, `src/lib/storage/r2Client.js`, `src/lib/db/schema.sql` nằm **trong thư mục frontend** | Đây là bản phác thảo, chưa chạy phía server; quota kiểm tra ở client có thể bị vượt qua (vi phạm G12, F13) |
| 4 | Không có thư mục test | Không story nào pass Gate K |

**Story đang `done` cần chấm lại ngay (nghi vấn thiếu bằng chứng backend):**

| Story | Lý do nghi vấn | Đề xuất tạm thời |
| :--- | :--- | :--- |
| USER-101 | Không có auth thật | `in-progress` |
| PAY-101, PAY-102 | Không có webhook / backend kích hoạt Pro | `in-progress` (UI có thể đã xong) |
| ELSA-301, ELSA-302 | Hội thoại AI cần LLM + WebSocket backend | Kiểm tra lại; nếu chỉ là mô phỏng → `in-progress` |
| ELSA-402 | SM-2 cần lưu lịch ôn ở server | Kiểm tra lại |
| ELSA-102, ELSA-103 | Cần API lưu hồ sơ / công thức đã kiểm chứng | Kiểm tra lại |
| ADV-101 | Voice clone cần mô hình AI phía server | Rất có thể chỉ là mô phỏng → `in-progress` |
| ELSA-201 | CTC forced alignment cần mô hình thật | Kiểm tra lại |

Các story thuần frontend (PRON-101, PRON-201, PRON-204, ELSA-205, GAME-101..104, ADV-102, ADV-103, ADV-108, VN-105) có khả năng giữ `done` cao hơn, nhưng vẫn cần đính kèm bằng chứng theo Mục 2.

**Thứ tự ưu tiên đề xuất để sẵn sàng thu phí:**

1. Dựng backend thật (`vietphonics-app/server/`): auth → lưu tiến độ → quota phía server.
2. Thanh toán VietQR + webhook idempotent + đối soát.
3. Story pháp lý & tài khoản còn thiếu (Mục 15).
4. Bộ test E2E cho luồng trả phí (K3).
5. Load test 1,500 phiên đồng thời (J5).
6. Sau đó mới đầu tư thêm tính năng nâng cao.
