# 📖 Hướng Dẫn Sử Dụng Ứng Dụng Hóa Học 10

Tài liệu hướng dẫn chi tiết dành cho học sinh và giáo viên khi sử dụng ứng dụng **Hóa Học 10 - Sổ Tay Tri Thức & Luyện Đề Tương Tác**.

---

## 🎯 1. Khởi Động Ứng Dụng
Bạn có 2 cách cực kỳ đơn giản để mở ứng dụng trên máy tính của mình:

* **Cách 1 (Khuyên Dùng - Nhanh nhất):**  
  Nhấp đúp chuột vào file **`Mo_Ung_Dung.bat`**. Trình duyệt sẽ mở trực tiếp file `index.html`. Không cần mạng Internet, không lo trùng cổng.
  
* **Cách 2 (Mô phỏng máy chủ web):**  
  Nhấp đúp chuột vào file **`Chay_May_Chu.bat`**. Ứng dụng sẽ khởi chạy máy chủ Python nội bộ tại cổng `8090` (hoặc cổng trống tiếp theo) và tự động mở trình duyệt.

---

## 🧭 2. Khám Phá Các Chức Năng Chính

### 📖 Tab 1: Lý Thuyết (Theory)
* Chọn bất kỳ bài học nào ở cột bên trái (từ Bài 1 đến Bài 8).
* Mỗi bài học được cấu trúc rõ ràng:
  - Tóm tắt mục tiêu bài học.
  - Các công thức toán hóa trọng tâm render bằng KaTeX sắc nét.
  - Nội dung lý thuyết chi tiết, bảng biểu phân loại.
* Nhấn nút **"Luyện Bài Tập Ngay"** ở góc trên bài học để tự động chuyển sang ngân hàng câu hỏi của chương đó.

### ✍️ Tab 2: Luyện Đề & Bài Tập (Practice)
* **Chế độ làm bài:**
  - **Trắc nghiệm 4 lựa chọn (MCQ):** Chọn đáp án -> Biết đúng/sai ngay lập tức kèm lời giải chi tiết.
  - **Trắc nghiệm Đúng / Sai (Format 2025):** Đánh giá từng ý a, b, c, d của câu hỏi.
  - **Trả lời ngắn (Format 2025):** Nhập số hoặc đáp số vào ô và nhấn "Kiểm tra".
  - **Tự luận:** Các bài toán phân tử hợp chất, hệ hạt, đồng vị có barem điểm và lời giải mẫu từng bước.
  - **Thi thử 15 phút:** Đồng hồ đếm ngược, bốc ngẫu nhiên 10 câu, tự động chấm thang điểm 10 và hiệu ứng pháo hoa khi đạt điểm giỏi.

### 🔬 Tab 3: Thí Nghiệm & Bảng Tuần Hoàn (Simulations)
* **Bảng Tuần Hoàn tương tác:**
  - Chuyển đổi giữa các chế độ: *Phân loại*, *Độ âm điện Pauling*, *Bán kính nguyên tử*, *Thể ở 25°C*.
  - Lọc nhanh theo nhóm nguyên tố: Kim loại kiềm, Kiềm thổ, Chuyển tiếp, Phi kim, Halogen, Khí hiếm.
  - Bấm vào nguyên tố để mở thẻ tra cứu chi tiết và nút "Xem Mô Phỏng Bohr".
* **Mô phỏng nguyên tử Rutherford - Bohr:**
  - Xem các electron chuyển động quanh hạt nhân theo thời gian thực.
  - Kéo thanh trượt $Z$ từ 1 đến 36 hoặc bấm chọn nhanh các nguyên tố tiêu biểu.
  - Tự động tách lớp K, L, M, N và xác định cấu hình electron, tính kim loại/phi kim/khí hiếm.
* **Bộ giải toán hóa học:**
  - Giải hệ phương trình hạt ($p, n, e$).
  - Tính nguyên tử khối trung bình $\overline{A}$ và phần trăm đồng vị.

### 📋 Tab 4: Tra Cứu Công Thức (Formulas)
* Tra cứu nhanh toàn bộ công thức tính toán và quy tắc biến đổi tuần hoàn.

### 📊 Tab 5: Tiến Độ & Sổ Câu Sai (Stats)
* Hệ thống tự động ghi nhận lại các câu hỏi bạn đã trả lời sai trong quá trình luyện tập để bạn có thể xem lại và củng cố kiến thức trước kỳ thi.

---

## 🚀 3. Đẩy Lên GitHub & Cài Đặt GitHub Pages
1. Tạo một repository mới trên GitHub với tên **`hoa-hoc-10`** (chọn chế độ **Public**).
2. Nhấp đúp vào file **`Day_Len_Github.bat`** trong thư mục này. Quá trình push code sẽ diễn ra hoàn toàn tự động.
3. Sau khi push thành công:
   - Truy cập vào: `https://github.com/pvhdtg-dev/hoa-hoc-10/settings/pages`
   - Tại mục **Branch**, chọn nhánh `main` và thư mục `/(root)` -> Nhấn **Save**.
   - Đợi 1-2 phút, ứng dụng của bạn sẽ chính thức online tại:  
     👉 **`https://pvhdtg-dev.github.io/hoa-hoc-10/`**
