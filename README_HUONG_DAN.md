# Nihongo Quest – Thùy Linh 💖 (chỉ tiếng Nhật)

Bản PWA này giữ các chức năng học tiếng Nhật từ bản trước, không có tiếng Anh.

## Cập nhật hình minh họa
- 50 từ N5 hiện có đều có biểu tượng minh họa gắn riêng với nghĩa của từ. Ví dụ: 水（みず）→ 💧, 猫（ねこ）→ 🐈, 電車（でんしゃ）→ 🚆.
- Hình xuất hiện ở cả mặt trước và sau của flashcard, và trong danh sách từ đã học.
- Đây là hình biểu tượng emoji minh họa, không phải ảnh chụp thực tế. Một số từ trừu tượng dùng biểu tượng gợi nhớ.
- Giữ lật thẻ 3D, luyện viết, luyện nói, luyện nghe, bảng chữ cái, XP, mục tiêu 20 từ/ngày, lịch ôn.

## Đăng GitHub Pages
Giải nén ZIP rồi upload **nội dung bên trong thư mục** vào root của repository `Zthuylinh`, thay file cũ `index.html`, `service-worker.js`, `manifest.webmanifest` và thư mục `icons`. Không upload nguyên ZIP.
Vào Settings → Pages → Deploy from a branch → main → /(root) → Save.
Mở https://huynhcongdat.github.io/Zthuylinh/ sau khi deploy. Trên iPhone mở Safari → Share → Add to Home Screen.

Nếu vẫn thấy bản cũ, đóng PWA và mở lại khi có mạng; service worker sẽ cập nhật cache. Tiến độ cũ dùng cùng khóa localStorage nên được giữ nếu cùng domain/path và không xóa dữ liệu trình duyệt.

**Lưu ý:** Chưa có push notification tự động khi app đóng. Nhận diện giọng nói trên Safari tùy hỗ trợ trình duyệt.
