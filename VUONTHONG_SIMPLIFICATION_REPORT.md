# BÁO CÁO AUDIT & KẾ HOẠCH ĐƠN GIẢN HÓA KIẾN TRÚC — THƯƠNG HIỆU VUONTHONG

> **Dự án:** VUONTHONG — Homestay Website Template  
> **Khách hàng / Hệ thống đích:** Kho giao diện mẫu PDTeam  
> **Chuẩn kỹ thuật tuân thủ:** `NEW_PROJECT_MASTER_GUIDE.md`  
> **Phong cách chủ đạo:** Nature Editorial (Thiên nhiên thung lũng, thông reo, tinh tế, giàu cảm xúc)

---

## 1. Executive Summary & Định hướng chuyển đổi

Dự án được tái định vị từ một *Multi-Purpose Homestay Website Template Platform* (với kiến trúc modular configuration phức tạp, runtime theme switching 4 theme, engine simulation) trở thành **một mẫu website homestay hoàn chỉnh, độc lập và cao cấp mang thương hiệu VUONTHONG (Vườn Thông Homestay)** để đưa vào kho template chính thức của PDTeam.

### Nhận diện thương hiệu mới:
- **Tên thương hiệu:** VUONTHONG
- **Tên hiển thị:** Vườn Thông Homestay Đà Lạt
- **Monogram / Logo biểu trưng:** `V` (Vườn Thông) thay cho `L` (LengKeng)
- **Tagline chính thức:** *"Chạm vào bình yên, giữa miền xanh bất tận."*
- **Định vị & Không gian:** Khu homestay nghỉ dưỡng giữa rừng thông Đà Lạt, nơi con người tìm lại sự thư thái, kết nối với thiên nhiên nguyên bản, đón biển mây sáng sớm và tận hưởng những khoảnh khắc sống chậm.
- **Tính xác thực dữ liệu demo:** Toàn bộ thông tin liên hệ (hotline, email, địa chỉ), giá phòng và đánh giá đều được ghi rõ là **dữ liệu demo / placeholder**, tuyệt đối không tạo thông tin kinh doanh giả mạo như số điện thoại cá nhân hay pháp nhân thật.

---

## 2. Kết quả Audit hiện trạng Codebase

### 2.1. Những thành phần CẦN GIỮ LẠI (Tận dụng tối đa, không viết lại)
- **Core Stack:** React 19 + TypeScript + Vite + Tailwind CSS.
- **Cấu hình Build PDTeam:** `vite.config.js` với `TEMPLATE_ID = "template_homstay4"`, đóng gói tài nguyên vào `dist/template_homstay4/assets/` với hash文件名, sao chép `static/manifest.xml` và icon.
- **Data Adapter & Route Scoping:**
  - `src/utils/clientData.ts`: Đã triển khai đầy đủ các hàm theo chuẩn Master Guide (`getClientDataValues`, `getClientData`, `getImageUrl`, `sendContactRequest`, unwrap typed fields, fallback template).
  - `src/utils/pageScope.ts`: Chuẩn hóa scoping route `getPageNameFromPath`.
- **Hệ thống 10 Sections tại trang chủ:**
  1. `HeroSection.tsx` (Split layout Nature Editorial)
  2. `AboutStorySection.tsx` (Triết lý sống chậm, gìn giữ địa hình rừng thông)
  3. `RoomsSection.tsx` (Hạng phòng lưu trú, modal chi tiết phòng)
  4. `ExperiencesSection.tsx` (Lịch trình thong dong đón sương, trà chiều, lửa trại)
  5. `AmenitiesSection.tsx` (Tiện ích bản địa, nông sản tươi, cún cưng)
  6. `GallerySection.tsx` (Khoảnh khắc thung lũng)
  7. `TestimonialsSection.tsx` (Cảm nhận khách lưu trú dạng demo)
  8. `LocationSection.tsx` (Chỉ dẫn vị trí và đường về thung lũng)
  9. `FAQSection.tsx` (Câu hỏi thường gặp)
  10. `BookingCTASection.tsx` (Lời mời đặt chỗ)
- **Các trang con (Subpages):** `RoomsPage.tsx`, `AboutPage.tsx`, `ExperiencesPage.tsx`, `GalleryPage.tsx`, `ContactPage.tsx`.
- **Booking & Contact Flow:** `BookingModal.tsx` và API contract `POST /moduleapi/contactme/send_contact_request` với header `publickey: window.PUBLIC_KEY`.

### 2.2. Những thành phần CẦN LOẠI BỎ / ĐƠN GIẢN HÓA
- **Hệ thống đa Theme (4 Themes) & Dynamic Theme Switcher:**
  - Loại bỏ các theme phụ không dùng trong `src/index.css`: `theme-luxury-minimalism`, `theme-rustic-retreat`, `theme-coastal-boutique`.
  - Khóa chặt duy nhất phong cách **Nature Editorial** thanh lịch, đậm chất rừng thông Đà Lạt.
  - Đơn giản hóa `src/context/ThemeContext.tsx` hoặc duy trì tối thiểu để tương thích, không lưu trữ logic chuyển đổi runtime dư thừa.
- **Design System Showcase trong Menu Điều Hướng:**
  - Trang mẫu homestay khách hàng không nên có link "Design System" ở Header/Footer chính. Chuyển Header Nav Menu về đúng 6 trang homestay thực tế: *Trang Chủ, Hạng Phòng, Câu Chuyện, Trải Nghiệm, Thư Viện Ảnh, Liên Hệ*.
- **Loại bỏ hoàn toàn các ý niệm:**
  - Build-Time Configuration Compiler
  - Hệ thống 11 modular JSON
  - Multi-client simulation / engine
  - CMS Template Builder phức tạp.

### 2.3. Rà soát thương hiệu cũ LengKeng (CẦN THAY THẾ TOÀN BỘ)
- **`index.html`:** Title, meta description, keywords, Open Graph metadata, favicon.
- **`static/manifest.xml`:** Name `HOMESTAY_PLATFORM_TEMPLATE` -> `VUONTHONG`, description.
- **`src/components/Header.tsx`:** Monogram `L` -> `V`, brand name "LengKeng Valley Retreat" -> "VUONTHONG", tagline "Stay, Pray, Love" -> "Vườn Thông Homestay - Giữa miền xanh bất tận", hotline demo.
- **`src/components/Footer.tsx`:** Monogram `L` -> `V`, brand name, email, copyright, mô tả chân trang.
- **`src/components/sections/HeroSection.tsx`:** Card overlay "LengKeng Da Lat Retreat", tiêu đề gợi nhắc tiếng chuông gió -> tiếng thông reo đại ngàn.
- **`src/components/sections/AboutStorySection.tsx`:** Tiêu đề "LengKeng không chỉ là chốn nghỉ...", quote chuông leng keng -> tiếng thông reo giữa sương sớm.
- **`src/components/sections/FAQSection.tsx`:** Subtitle "kỳ nghỉ của bạn tại LengKeng...".
- **`src/components/sections/TestimonialsSection.tsx`:** Fallback `room_name: "LengKeng Room"` -> `"Phòng Vườn Thông"`.
- **`src/pages/AboutPage.tsx`:** "Về LengKeng Homestay" -> "Về VUONTHONG Homestay".
- **`src/pages/RoomsPage.tsx`:** "Mỗi căn phòng tại LengKeng..." -> "Mỗi căn phòng tại VUONTHONG...".
- **`src/pages/ExperiencesPage.tsx`:** "Mỗi khoảnh khắc tại LengKeng..." -> "Mỗi khoảnh khắc tại VUONTHONG...".
- **`src/pages/ContactPage.tsx`:** "Quản gia LengKeng..." -> "Quản gia VUONTHONG...".
- **`src/assets/template.json`:** Cập nhật toàn bộ các key `brand_name`, `about_title`, `about_quote`, `faq_subtitle`, `footer_*`, `contact_title`.

### 2.4. Rà soát `template.json` theo chuẩn Master Guide
Hiện tại `template.json` chỉ có 4 pages (`Home`, `Contact`, `Rooms`, `DesignSystem`). Theo chuẩn `NEW_PROJECT_MASTER_GUIDE.md`:
- Cần bổ sung đầy đủ các page thực tế của template:
  1. `Home` (`/`)
  2. `Rooms` (`/rooms`)
  3. `About` (`/about`)
  4. `Experiences` (`/experiences`)
  5. `Gallery` (`/gallery`)
  6. `Contact` (`/contact`)
- Mỗi layout trong các page phải có `data_fields` với cấu trúc typed field chuẩn:
  - `0`: `stringData`
  - `1`: `numberData`
  - `2`: `booleanData`
  - `3`: `urlData`
  - `4`: `resourceData`
  - `5`: `objectData`
  - `7`: `arrayString`
  - `9`: `arrayObject`

---

## 3. Kế hoạch triển khai chi tiết (Action Plan)

1. **Giai đoạn 1 — Chuyển đổi Thương hiệu & Toàn bộ Nội dung:**
   - Cập nhật `index.html` (SEO, OG, Title).
   - Cập nhật `static/manifest.xml`.
   - Cập nhật `Header.tsx` (Monogram V, Brand VUONTHONG, Nav menu chuẩn 6 trang, hotline demo).
   - Cập nhật `Footer.tsx` (Monogram V, Brand VUONTHONG, copyright PDTeam, email/hotline demo).
   - Cập nhật 10 section components với ngôn từ mộc mạc, đậm hơi thở rừng thông Đà Lạt.
   - Cập nhật 5 subpages (`AboutPage`, `RoomsPage`, `ExperiencesPage`, `GalleryPage`, `ContactPage`).

2. **Giai đoạn 2 — Chuẩn hóa `template.json` toàn diện:**
   - Cấu trúc đủ 6 pages (`Home`, `Rooms`, `About`, `Experiences`, `Gallery`, `Contact`).
   - Khai báo đầy đủ dữ liệu demo mang thương hiệu VUONTHONG.
   - Kiểm tra cú pháp và schema với script Node.js.

3. **Giai đoạn 3 — Chuẩn hóa Màu sắc & Đơn giản hóa Theme:**
   - Thu gọn `src/index.css` tập trung vào Nature Editorial palette.
   - Rà soát các semantic CSS variables: `--color-canvas`, `--color-surface`, `--color-primary`, `--color-timber`, `--color-mist`, `--color-subtle`.
   - Giữ nguyên `ThemeContext.tsx` nhưng cố định ở `nature-editorial`, loại bỏ các class override không cần thiết.

4. **Giai đoạn 4 — Kiểm thử & Nghiệm thu:**
   - Chạy TypeScript typecheck (`tsc --noEmit`).
   - Chạy `npm run build` xác nhận cấu trúc output: `dist/template_homstay4/assets/` và `dist/template_homstay4/manifest.xml`.
   - Quét mã nguồn với `avoid-ai-design scanner` (`node .agents/skills/avoid-ai-design/scripts/detect.mjs src/`).
   - Kiểm tra rà soát chuỗi không còn sót "LengKeng" hay "lengkeng".

---

## 4. Kết quả Kiểm thử Thực tế & Nghiệm thu (Verification Results)

| Hạng mục kiểm tra | Lệnh / Phương pháp | Kết quả | Trạng thái |
| --- | --- | --- | --- |
| **TypeScript Typecheck** | `npx tsc --noEmit` | Không có lỗi nào (`0 errors`) | **PASS** |
| **Rà soát Brand LengKeng** | `grep -ri "lengkeng"` toàn repo | 0 phát hiện trong source code, template, static hay HTML | **PASS** |
| **avoid-ai-design Scanner** | `npm run detect-ai` | `29 files scanned · 0 findings P0 0 · P1 0 · P2 0` | **PASS** |
| **Cú pháp template.json** | `NEW_PROJECT_MASTER_GUIDE.md` test | `JSON parse OK` · 6 trang đầy đủ (`Home`, `Rooms`, `About`, `Experiences`, `Gallery`, `Contact`) | **PASS** |
| **Đóng gói Vite Build** | `npm run build` | Hoàn tất trong ~4s, xuất ra `dist/index.html` và thư mục chuẩn `dist/template_homstay4/assets/` | **PASS** |
| **Tài nguyên Manifest** | Kiểm tra `dist/template_homstay4/manifest.xml` | Đầy đủ thẻ `<manifest><name>VUONTHONG</name>...</manifest>` | **PASS** |
| **Runtime Headless Browser** | Playwright Preview Suite | Cả 6 trang tải thành công 100%, booking modal đóng/mở chuẩn, drawer mobile hiển thị 6 links | **PASS** |

---

## 5. Kết luận

Dự án **VUONTHONG — Homestay Website Template** đã hoàn thành việc chuyển đổi thương hiệu và đơn giản hóa kiến trúc đúng theo toàn bộ định hướng mới:
1. **Tinh gọn, không phức tạp hóa:** Đã loại bỏ hoàn toàn hệ thống 4 theme switchers runtime, modular config compiler hay simulation SaaS.
2. **Chuẩn mực PDTeam:** Tuân thủ 100% tài liệu `NEW_PROJECT_MASTER_GUIDE.md` từ cấu trúc thư mục, `template.json`, `clientData.ts`, `pageScope.ts`, API booking contact cho đến vị trí output của Vite (`dist/template_homstay4/assets/` và `manifest.xml`).
3. **Thương hiệu & Thiết kế cao cấp:** Giao diện Nature Editorial mộc mạc, đậm hơi thở rừng thông Đà Lạt với thông tin demo được gắn nhãn rõ ràng, sẵn sàng đưa vào hệ thống sản phẩm template của PDTeam.

