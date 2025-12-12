# Travel Booking - Hệ Thống Quản Lý Tour Du Lịch

## 📋 Giới Thiệu
Travel Booking là một ứng dụng web hiện đại để quản lý và đặt tour du lịch. Ứng dụng cung cấp đầy đủ các tính năng từ đăng nhập, quản lý tour, yêu thích cho đến hỗ trợ đa ngôn ngữ.

## ✨ Tính Năng Chính

### 1. **Quản Lý Người Dùng**
- ✅ Đăng ký tài khoản mới
- ✅ Đăng nhập với email và mật khẩu
- ✅ Xác thực email và mật khẩu
- ✅ Đăng xuất an toàn

### 2. **Quản Lý Tour Du Lịch**
- ✅ Xem danh sách tour (từ MockAPI)
- ✅ Thêm tour mới
- ✅ Sửa thông tin tour
- ✅ Xóa tour
- ✅ Tìm kiếm tour theo tên, điểm đến
- ✅ Hiển thị giá, thời lượng, mô tả chi tiết

### 3. **Danh Sách Yêu Thích**
- ✅ Thêm/xóa tour vào yêu thích (Local Storage)
- ✅ Ghi chú riêng cho mỗi tour yêu thích
- ✅ Hiển thị danh sách tour yêu thích
- ✅ Lưu trữ trên trình duyệt

### 4. **Chức Năng Nâng Cao**
- ✅ **Dark Mode**: Chuyển đổi giao diện tối
- ✅ **Multi Language**: Hỗ trợ Tiếng Việt & English
- ✅ **Animation**: Hiệu ứng fadeIn, slideIn, scaleUp
- ✅ **Responsive Design**: Tương thích mobile, tablet, desktop
- ✅ **Modal Forms**: Form thêm/sửa tour với kiểm chứng dữ liệu

## 🛠️ Công Nghệ Sử Dụng

### Frontend
- **HTML5**: Cấu trúc trang web
- **CSS3**: Styling, animations, responsive
- **JavaScript**: Logic ứng dụng, DOM manipulation
- **Bootstrap 5**: Framework CSS
- **jQuery**: Simplified DOM operations

### API & Storage
- **MockAPI**: Lưu trữ dữ liệu users và tours
- **Local Storage**: Lưu danh sách yêu thích và ghi chú

### Features
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: CSS variables + localStorage
- **Internationalization (i18n)**: Đa ngôn ngữ
- **Error Handling**: Try-catch, validation

## 📁 Cấu Trúc Thư Mục

```
Travel_Booking/
├── index.html              # Danh sách tour
├── login.html              # Trang đăng nhập
├── register.html           # Trang đăng ký
├── favorites.html          # Danh sách yêu thích
├── README.md               # File hướng dẫn
└── assets/
    ├── css/
    │   └── style.css       # Styles, animations, dark mode
    └── js/
        ├── api.js          # API calls, theme toggle
        ├── auth.js         # Login, register, logout
        ├── tours.js        # Tour CRUD operations
        ├── favorites.js    # Favorites management
        └── i18n.js         # Multi-language support
```

## 🚀 Hướng Dẫn Sử Dụng

### 1. **Khởi Động Ứng Dụng**
```bash
# Mở file login.html trong trình duyệt
# Hoặc chạy local server:
python -m http.server 8000
# Truy cập: http://localhost:8000/login.html
```

### 2. **Đăng Ký Tài Khoản**
- Nhấp vào "Đăng ký ngay"
- Nhập Tên, Email, Mật khẩu
- Mật khẩu tối thiểu 6 ký tự
- Email phải hợp lệ
- Nhấp "Tạo tài khoản"

### 3. **Đăng Nhập**
- Nhập email và mật khẩu đã đăng ký
- Nhấp "Đăng nhập"
- Sẽ chuyển đến trang danh sách tour

### 4. **Quản Lý Tour**
#### Xem danh sách:
- Tất cả tour được tải từ MockAPI
- Hiển thị với hình ảnh, giá, thời lượng

#### Tìm kiếm:
- Nhập tên tour hoặc điểm đến
- Kết quả cập nhật real-time

#### Thêm tour:
- Nhấp nút "+ Thêm Tour"
- Điền các thông tin: tên, địa điểm, giá, thời lượng, mô tả
- Nhấp "Lưu"

#### Sửa tour:
- Nhấp icon Edit trên card tour
- Cập nhật thông tin
- Nhấp "Lưu"

#### Xóa tour:
- Nhấp icon Trash
- Xác nhận xóa

### 5. **Danh Sách Yêu Thích**
- Nhấp icon ❤️ trên tour để thêm yêu thích
- Vào trang "Yêu thích" để xem danh sách
- Thêm ghi chú cho mỗi tour
- Ghi chú lưu tự động

### 6. **Tính Năng Khác**
#### Dark Mode:
- Nhấp nút Moon/Sun góc trên phải
- Giao diện tự động lưu preferences

#### Đổi Ngôn Ngữ:
- Chọn "Tiếng Việt" hoặc "English"
- Giao diện cập nhật tức thì

#### Đăng Xuất:
- Nhấp nút "Đăng xuất"
- Xác nhận, quay về trang login

## 📝 API Endpoints

### Users (MockAPI)
```
GET    https://6936c7f6f8dc350aff323338.mockapi.io/users
POST   https://6936c7f6f8dc350aff323338.mockapi.io/users
PUT    https://6936c7f6f8dc350aff323338.mockapi.io/users/:id
DELETE https://6936c7f6f8dc350aff323338.mockapi.io/users/:id
```

### Tours (MockAPI)
```
GET    https://6936c7f6f8dc350aff323338.mockapi.io/tours
POST   https://6936c7f6f8dc350aff323338.mockapi.io/tours
PUT    https://6936c7f6f8dc350aff323338.mockapi.io/tours/:id
DELETE https://6936c7f6f8dc350aff323338.mockapi.io/tours/:id
```

## 🔐 Bảo Mật

### Dữ Liệu Người Dùng
- Mật khẩu được lưu trữ trên MockAPI
- Xác thực cơ bản: email + password
- Session lưu trong localStorage (currentUser)

### Local Storage
- `currentUser`: Thông tin user đang login
- `favorites`: Danh sách ID tour yêu thích
- `notes`: Ghi chú cho tour yêu thích
- `darkMode`: Trạng thái dark mode
- `language`: Ngôn ngữ hiện tại

## ⚠️ Validation & Error Handling

### User Input
- ✅ Email validation (RFC format)
- ✅ Password minimum 6 characters
- ✅ Name minimum 2 characters
- ✅ Tour price >= 0
- ✅ Tour duration >= 1 day
- ✅ All fields required

### API Errors
- ✅ Try-catch blocks
- ✅ User-friendly error messages
- ✅ Console logging for debugging

## 🎨 Design & UX

### Color Scheme
- Primary: #0d6efd (Blue)
- Success: #198754 (Green)
- Danger: #dc3545 (Red)
- Dark Mode: #1e1e1e

### Animations
- **Fade In**: Mờ dần vào (0.5s)
- **Slide**: Trượt từ trái/phải (0.5s)
- **Scale Up**: Phóng to nhẹ (0.3s)
- **Hover Effects**: Transform & shadow

### Responsive Breakpoints
- Mobile: < 576px
- Tablet: 576px - 768px
- Desktop: > 768px

## 🐛 Troubleshooting

### "Lỗi đăng nhập"
- Kiểm tra email và mật khẩu
- Đảm bảo đã đăng ký

### "Không tải được tour"
- Kiểm tra kết nối internet
- MockAPI có thể bị rate limit
- Mở Developer Console (F12) để xem lỗi

### Dark Mode không lưu
- Kiểm tra Local Storage có được bật
- Xóa cache browser nếu cần

### Lỗi ngôn ngữ
- Xóa localStorage.language
- Tải lại trang

## 📚 Tài Liệu Thêm

- [Bootstrap 5 Docs](https://getbootstrap.com/)
- [MockAPI Docs](https://mockapi.io/)
- [MDN Web Docs](https://developer.mozilla.org/)

## 👨‍💻 Phát Triển

### Future Features
- [ ] User profile management
- [ ] Tour reviews & ratings
- [ ] Booking confirmation email
- [ ] Payment integration
- [ ] Advanced search filters
- [ ] Tour images upload
- [ ] Calendar booking view

## 📄 License
Dự án này được tạo cho mục đích học tập.

## 📞 Support
Nếu gặp vấn đề, kiểm tra Developer Console (F12) để xem error messages chi tiết.