# Nihongo Quest – Nâng cấp ghép câu và đánh giá phát âm

## Chức năng đã hoạt động
- 12 bài ghép câu tiếng Nhật: chạm chọn từ, hoàn tác, gợi ý, kiểm tra thứ tự, nhận XP một lần mỗi bài và lưu tiến độ.
- Giữ toàn bộ giao diện, luyện viết, flashcard, luyện nghe, luyện nói/ghi âm và logo mèo của bản trước.
- Giao diện chấm phát âm bằng âm thanh thật, kết nối tới một API bên ngoài khi được cấu hình.

## Chấm phát âm thật cần gì?
- Bản PWA không chứa khóa API và KHÔNG tự chấm điểm âm thanh nếu chưa có backend.
- Tạo backend HTTPS nhận multipart/form-data: `audio` (webm/định dạng do MediaRecorder cung cấp), `referenceText`, `locale`.
- Backend chuyển đổi âm thanh sang PCM WAV 16 kHz mono nếu nhà cung cấp yêu cầu; gọi Azure Speech Pronunciation Assessment cho ja-JP với referenceText, lấy AccuracyScore, FluencyScore, CompletenessScore, PronScore từ kết quả dịch vụ.
- Backend trả JSON: `{ "accuracyScore": 82, "fluencyScore": 79, "completenessScore": 100, "pronScore": 84 }` (chỉ là ví dụ định dạng, KHÔNG phải điểm của người dùng).
- Backend phải xác thực, giới hạn tần suất, giới hạn dung lượng, CORS đúng origin GitHub Pages, giữ bí mật khóa trong biến môi trường và có chính sách xử lý/xóa âm thanh.
- Điền URL backend vào `config.js`, ví dụ `pronunciationApiUrl: "https://api.example.com/assess"`. Đừng đặt API key trong GitHub Pages.
- Không cấu hình backend: app hiển thị rõ chưa có dịch vụ và không tạo điểm giả.

## Cập nhật GitHub Pages
Giải nén ZIP, tải toàn bộ file và thư mục con lên gốc repo, ghi đè index.html, service-worker.js và thêm sentence-game.js, config.js. Đợi Actions xanh. Trên iPhone mở lại PWA; nếu cache cũ vẫn còn, xóa icon cũ rồi thêm lại từ Safari.
