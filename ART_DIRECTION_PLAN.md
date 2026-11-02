# KẾ HOẠCH ĐỊNH HƯỚNG NGHỆ THUẬT & TINH CHỈNH THỊ GIÁC (ART DIRECTION PLAN)

> **Dự án:** VUONTHONG — Homestay Website Template  
> **Phong cách cốt lõi:** Nature Editorial / Luxury Boutique Hospitality  
> **Mục tiêu:** Nâng tầm diện mạo thị giác thành một website nghỉ dưỡng cao cấp, giàu chất thơ và tính biên tập tạp chí, loại bỏ triệt để các rập khuôn AI template slop, bảo toàn tính tương thích kỹ thuật 100% theo `NEW_PROJECT_MASTER_GUIDE.md`.

---

## 1. TRIẾT LÝ THIẾT KẾ (DESIGN PHILOSOPHY)

Khác với các khách sạn thương mại đô thị cần sự náo nhiệt và nút bấm dồn dập, **VUONTHONG** là một nơi chốn của sự **tĩnh lặng, mộc mạc và chữa lành**. Do đó, triết lý thiết kế tuân theo 4 trụ cột:

1. **Quiet Luxury (Sự Sang Trọng Trong Tĩnh Lặng):** Không dùng hiệu ứng chuyển động phô trương, bóng đổ đậm hay màu sắc chói lọi. Sự cao cấp đến từ tỷ lệ vàng của khoảng trắng âm, typography serif thanh lịch và sự chỉn chu đến từng chi tiết đường viền mảnh (hairline rules).
2. **Editorial Storytelling (Dẫn Dắt Như Một Cuốn Tạp Chí Độc Bản):** Từng section như một trang mở (spread) của các ấn phẩm kiến trúc danh tiếng như *Kinfolk*, *Cereal*, hay *The Monocle*. Mỗi phần đều có nhịp thở riêng, không chia cột cơ học.
3. **Authentic Sense of Place (Hơi Thở Bản Địa Rừng Thông Đà Lạt):** Từng bức ảnh, góc chụp, ánh sáng phải toát lên được không khí đồi thông mù sương ở độ cao 1.520m, bếp than hồng ấm cúng, hương gỗ thông mộc và nét bình yên của sương sớm.
4. **Human-Crafted Intent (Dấu Ấn Thiết Kế Nhân Bản):** Từng dòng chữ tiếng Việt được ngắt câu trọn vẹn ngữ nghĩa, không gãy từ vô duyên; từng bức ảnh trong bộ sưu tập có kích thước tương quan nhịp nhàng, có điểm nhấn chính (focal hero) và phụ.

---

## 2. HỆ THỐNG NGÔN NGỮ THỊ GIÁC (VISUAL LANGUAGE & DESIGN SYSTEM)

### 2.1. Bảng màu Bản địa (Nature Editorial Palette)
Duy trì và tối ưu hệ thống design tokens hiện có thông qua CSS variables:
- **Canvas / Nền chủ đạo:** `--theme-canvas` (`#FAFBF9`) — Màu giấy ngà tự nhiên, ấm áp, dịu mắt, gợi liên tưởng đến trang giấy in mỹ thuật cao cấp.
- **Surface / Nền phụ:** `--theme-surface` (`#F0F4F1`) — Sắc sương thông mờ nhạt để phân tách các khu vực nội dung mà không cần đóng khung viền thô.
- **Primary / Màu chữ chính:** `--theme-primary` (`#18281E`) — Sắc xanh thông thẫm ngả đen tự nhiên, sang trọng và dịu hơn màu đen tuyệt đối (`#000000`).
- **Accent / Điểm nhấn gỗ mộc:** `--theme-accent` (`#876D4B`) — Màu vỏ cây thông cổ thụ và hương quế ấm nồng.
- **Border / Đường viền phân cách:** `--theme-border` (`#DCE4DD` / `rgba(24, 40, 30, 0.08)`) — Đường hairline siêu mỏng 1px, tạo cảm giác phân chia trang nhã như layout sách nghệ thuật.
- **Deep Evergreen / Nền chân trang & CTA:** `#121E16` — Chiều sâu tĩnh mịch của rừng thông lúc chạng vạng.

### 2.2. Hệ thống Typography Biên tập (Editorial Typography Scale)
Kết hợp hai họ phông chữ đã nạp sẵn trong `index.html`:
- **Heading & Display Serif:** `Newsreader` (hoặc `Playfair Display`, `Georgia`)  
  - Tỷ lệ line-height chặt chẽ (`leading-[1.08]` đến `leading-[1.18]`)  
  - Letter-spacing hơi siết nhẹ (`tracking-[-0.02em]` đến `tracking-[-0.01em]`)  
  - Sử dụng cho: Tiêu đề lớn, số liệu thống kê nghệ thuật, trích dẫn khách lưu trú và tên hạng phòng.
- **Body & Metadata Sans-Serif:** `Public Sans`  
  - Font weight nhẹ (`font-light` 300, `font-normal` 400, `font-medium` 500)  
  - Letter-spacing thoáng cho nhãn phụ (`tracking-[0.08em]` uppercase)  
  - Line-height rộng rãi (`leading-relaxed` 1.75) giúp người đọc thư thái khi tiếp nhận câu chuyện.
- **Nguyên tắc ngắt dòng ngữ nghĩa tiếng Việt (Semantic Typography):**
  - Tuyệt đối không để rớt chữ đơn lẻ xuống dòng (không mồ côi từ / no widows).
  - Sử dụng khoảng trắng không ngắt (`&nbsp;`) ở các cụm từ quan trọng như *"bình&nbsp;yên"*, *"thung&nbsp;lũng"*, *"Đà&nbsp;Lạt"*.

---

## 3. KẾ HOẠCH NÂNG CẤP BỐ CỤC TỪNG PHÂN ĐOẠN (SECTION-BY-SECTION BLUEPRINT)

### A. Header (Điều hướng & Bản sắc thương hiệu)
- **Thay đổi:**
  - Tinh giản topbar thành một dòng ghi chú thời tiết thanh tú, giảm bớt chi tiết vụn vặt.
  - Tinh chỉnh logo thương hiệu VUONTHONG với tỷ lệ hoàn hảo, chữ thanh mảnh sang trọng.
  - Tối ưu nút CTA "Đặt Kỳ Nghỉ" thành nút Primary sắc nét, có micro-interaction chuyển màu êm ái sang tone pine sẫm `#23392B`.
  - Cải thiện Mobile Menu Drawer với nhịp điệu mở mượt mà và thông tin liên hệ được bố trí trang trọng.

### B. Hero Section (Khúc mở đầu nghệ thuật)
- **Thay đổi:**
  - Thay thế ngay bức ảnh hồ bơi resort hiện đại bằng **nhiếp ảnh toàn cảnh thung lũng rừng thông Đà Lạt ngập trong biển mây sớm mai** tuyệt đẹp.
  - Tái cấu trúc bố cục: Bỏ kiểu 2 cột bằng chằn chặn. Áp dụng bố cục **Asymmetric Editorial Showcase**:
    - Khối chữ tiêu đề chiếm ưu thế với kích thước 4xl - 7xl, căn chỉnh typography tinh tế.
    - Khối ảnh chính được cắt cúp theo tỷ lệ kiến trúc chuẩn (portrait hoặc dynamic 4:5), đi kèm một khung chú thích nhỏ thanh lịch (curated caption) với phông serif in nghiêng.
    - Thanh thông số độ cao (1.520m) và nhiệt độ sương sớm (16°C) được tích hợp tinh tế thành một con dấu biên tập (editorial seal), tạo cảm xúc du ngoạn ngay tức khắc.

### C. About Story Section (Triết lý sống chậm & Địa hình tự nhiên)
- **Thay đổi:**
  - Loại bỏ hoàn toàn ảnh tuyết Canada và ảnh hồ bơi biển đảo rặng dừa.
  - Tuyển chọn 2 bức ảnh chuẩn xác về Đà Lạt: Một ảnh kiến trúc nhà gỗ thông mộc mạc ẩn hiện giữa cây cối tự nhiên và một ảnh cận cảnh sương mai đọng trên nhánh thông.
  - Bỏ hiệu ứng ảnh phụ đè viền trắng 4px kiểu sticker. Thay bằng cấu trúc **Editorial Diptych**: hai khung hình có tỷ lệ bù trừ hài hòa, tạo chiều sâu thị giác tự nhiên.
  - Khắc phục triệt để lỗi CSS drop-cap `first-letter`: Chuyển sang phong cách đoạn mở đầu biên tập (editorial lead paragraph) với font serif trang trọng, liền mạch ngữ pháp tiếng Việt.
  - Căn chỉnh lại 3 con số thống kê với tỷ lệ chữ cân đối, không để rớt chữ *"Mộc"*.

### D. Rooms Section (Không gian lưu trú chữa lành)
- **Thay đổi:**
  - Loại bỏ hoàn toàn chuỗi ziczac lặp lại rập khuôn (Trái-Phải-Trái-Phải).
  - Tái cấu trúc thành **Curated Suite Collection**:
    - **Phòng 01 (Mây Ngàn - Signature Suite):** Chiếm trọn không gian chính với ảnh panorama lớn, tôn vinh ban công ngắm biển mây và bồn tắm ngâm thảo mộc.
    - **Phòng 02 & Phòng 03 (Áp Mái & Bungalow):** Bố trí dạng lưới 2 cột bất đối xứng thanh lịch, mỗi phòng có bảng thông số mộc mạc, giá hiển thị tinh tế và nút "Xem chi tiết" / "Đặt phòng" có phân cấp thị giác rõ ràng.
  - Cập nhật ảnh phòng ngủ gỗ thông thực thụ, ấm áp ánh đèn vàng, view kính hướng núi đồi thay cho các ảnh resort xa lạ.

### E. Experiences Section (Nhật ký trải nghiệm 24 giờ)
- **Thay đổi:**
  - Xóa bỏ ảnh du khách studio và ảnh Yosemite. Thay bằng các khoảnh khắc chân thực: Tách trà nóng bên ban công sương sớm (05:30), Góc đọc sách bên hiên gỗ ngập nắng thông (15:00), và Đốm lửa trại bập bùng đêm lạnh (19:00).
  - Tái cấu trúc layout theo **Trục Thời Gian Biên Tập (Editorial Dayflow Itinerary)**: Bố cục 3 giai đoạn trong ngày với nhịp điệu ảnh dọc - ngang so le tinh tế, làm nổi bật cảm giác thong dong, chậm rãi.
  - Loại bỏ dòng text lặp lại 3 lần vô nghĩa ở chân thẻ.

### F. Amenities Section (Tiện nghi bản địa & Thuần khiết)
- **Thay đổi:**
  - Bỏ bố cục 2 cột với ảnh cô gái đeo balo mũ len xanh trùng lặp.
  - Chuyển thành bố cục **Boutique Provisions Grid**: Lưới 4 tiện ích bản địa trình bày thoáng đãng với số thứ tự la mã hoặc số đếm thanh lịch (`01`, `02`, `03`, `04`), không đóng khung xám cứng nhắc, tạo cảm giác sang trọng như menu của một resort 5 sao tĩnh lặng.

### G. Gallery Section (Tác phẩm thị giác tâm điểm - Visual Focal Piece)
- **Thay đổi:**
  - Sửa lỗi khuyết cột: Bố cục lại theo **Editorial Asymmetric Master Wall**:
    - 1 Tác phẩm chủ đạo toàn cảnh (Hero Panorama) khổ lớn chiếm 8 cột, thể hiện thung lũng Đà Lạt trong ánh bình minh huyền ảo.
    - Các tác phẩm chi tiết (kiến trúc gỗ, góc ban công, ly cà phê mộc, rặng thông cổ) được bố trí phụ trợ 4 cột kế bên và hàng dưới tạo thành một bố cục hoàn chỉnh, chặt chẽ, không góc chết.
  - Tối ưu Lightbox Modal: Hiển thị ảnh sắc nét, caption có số thứ tự tác phẩm (`01 / 06`), phông serif sang trọng và nút điều hướng mượt mà.

### H. Testimonials Section (Sổ lưu bút thung lũng)
- **Thay đổi:**
  - Bỏ 2 hộp thẻ trắng viền xám trơ trọi.
  - Biến thành **Guestbook Spread**: Nền giấy màu kem mộc ấm áp, typography serif in nghiêng giàu cảm xúc như những dòng nhật ký chân thật viết tay, ngày lưu trú và tên phòng được trình bày như một con dấu lưu niệm nhỏ.

### I. Location Section (Đường về thung lũng & Tọa độ)
- **Thay đổi:**
  - Thay ảnh Yosemite bằng bức ảnh con dốc quanh co ngập tràn thông reo đặc trưng của Đà Lạt.
  - Bố cục hài hòa giữa chỉ dẫn cự ly địa phương (Hồ Xuân Hương, Dinh 1, Sân bay Liên Khương) và thông tin hỗ trợ đón rước chu đáo.

### J. Booking CTA Section (Lời mời bình yên)
- **Thay đổi:**
  - Thay ảnh nền cabin tuyết bằng khung cảnh hoàng hôn đồi thông ấm áp, ánh đèn vàng hắt qua khung cửa kính gỗ mộc.
  - Typography lắng đọng: *"Bạn đã sẵn sàng trở về với sự bình yên?"* ngắt dòng trọn vẹn ngữ nghĩa.
  - Nút hành động tinh tế, đẳng cấp, mang cảm xúc chào đón nồng hậu.

---

## 4. CHIẾN LƯỢC NHIẾP ẢNH ĐẶC BIỆT (CURATED PHOTO ASSET STRATEGY)

Toàn bộ ảnh được tuyển chọn khắt khe để đảm bảo:
- **Tính đồng nhất về tông màu (Color Grading):** Sắc xanh thông thẫm (Deep Pine Green), màu sương sớm bạc mờ (Morning Mist), sắc gỗ sồi/thông ấm áp (Warm Timber Wood) và ánh vàng đèn ngủ (Warm Ambient Light).
- **Tính xác thực (Authenticity):** Không sử dụng ảnh bãi biển, cây dừa, tuyết rơi Bắc Cực hay resort bê tông hồ bơi sang chảnh kiểu Dubai/Maldives. Mọi bức ảnh đều gắn liền với núi rừng nhiệt đới gió mùa cao nguyên, nhà gỗ mộc và thung lũng mây.
- Tuyệt đối không dùng ảnh AI giả tạo, biến dạng bàn tay hay kiến trúc méo mó. Sử dụng kho ảnh Unsplash chọn lọc cao cấp với ID chuẩn xác, đảm bảo tải 100% không lỗi.

---

## 5. BẢO TOÀN KIẾN TRÚC & TÍNH TƯƠNG THÍCH (TECHNICAL COMPLIANCE)

Tuân thủ nghiêm ngặt mọi quy chuẩn của `NEW_PROJECT_MASTER_GUIDE.md`:
1. **Không sửa đổi `template.json` sai quy cách:** Mọi key dữ liệu hiện tại đều được duy trì, tương thích 100% với adapter `clientData.ts` và backend injection.
2. **Không hardcode màu sắc HEX tùy tiện:** Mọi class đều sử dụng Tailwind config và semantic CSS variables của dự án (`--theme-canvas`, `--theme-surface`, `--theme-primary`, `--theme-accent`, `--theme-border`).
3. **Giữ nguyên Modal & Interaction State:** `BookingModalContext`, chức năng mở form gửi contact request qua API `POST /moduleapi/contactme/send_contact_request` với header `publickey: window.PUBLIC_KEY` đều được bảo toàn trọn vẹn.
4. **Không thêm dependency thừa:** Tiếp tục khai thác tối đa `lucide-react`, `clsx`, `tailwind-merge` có sẵn trong repo.

---

## 6. KẾ HOẠCH TRIỂN KHAI THEO THỨ TỰ ƯU TIÊN

1. **Bước 1 — Hero Section & Header:** Tạo ấn tượng thị giác đầu tiên mạnh mẽ, thanh lịch, chuẩn tinh thần Nature Editorial.
2. **Bước 2 — About Story Section:** Chỉnh sửa bố cục editorial diptych, sửa lỗi drop-cap tiếng Việt và căn chỉnh chỉ số đồi thông.
3. **Bước 3 — Rooms Section:** Phá vỡ ziczac rập khuôn, xây dựng Signature Suite + Curated Suites grid cao cấp.
4. **Bước 4 — Experiences & Amenities:** Thiết kế timeline nhịp điệu ngày và danh mục tiện ích bản địa tinh gọn.
5. **Bước 5 — Gallery Section:** Hoàn thiện kiệt tác Asymmetric Art Wall không khuyết cột, nâng cấp Lightbox.
6. **Bước 6 — Testimonials, Location, FAQ & Booking CTA:** Hoàn thiện sổ lưu bút, bản đồ hành trình và lời mời trở về bình yên.
7. **Bước 7 — Đồng bộ Subpages & template.json:** Đồng bộ hóa dữ liệu mặc định và bố cục cho 5 subpages liên quan.
8. **Bước 8 — Browser Review & Verification:** Kiểm tra trực quan trên trình duyệt thật (Desktop 1440px, Tablet 768px, Mobile 390px), chụp ảnh đối chứng Before/After và xác minh không có lỗi tràn viền (horizontal overflow).
