// Multi-language support
const translations = {
    vi: {
        app_name: "Travel Booking",
        login: "Đăng nhập",
        register: "Đăng ký",
        email: "Email",
        password: "Mật khẩu",
        name: "Tên",
        tour_name: "Tên tour",
        destination: "Điểm đến",
        price: "Giá",
        duration: "Thời lượng",
        description: "Mô tả",
        no_account: "Chưa có tài khoản?",
        register_link: "Đăng ký ngay",
        have_account: "Đã có tài khoản?",
        login_link: "Đăng nhập",
        create_account: "Tạo tài khoản",
        home: "Trang chủ",
        favorites: "Yêu thích",
        logout: "Đăng xuất",
        tour_list: "Danh sách tour",
        favorite_tours: "Tour yêu thích",
        add_tour: "Thêm Tour",
        save: "Lưu",
        cancel: "Hủy",
        no_tours: "Không có tour nào",
        no_favorites: "Chưa có tour yêu thích"
    },
    en: {
        app_name: "Travel Booking",
        login: "Login",
        register: "Sign Up",
        email: "Email",
        password: "Password",
        name: "Name",
        tour_name: "Tour Name",
        destination: "Destination",
        price: "Price",
        duration: "Duration",
        description: "Description",
        no_account: "Don't have an account?",
        register_link: "Sign up now",
        have_account: "Already have an account?",
        login_link: "Login",
        create_account: "Create Account",
        home: "Home",
        favorites: "Favorites",
        logout: "Logout",
        tour_list: "Tour List",
        favorite_tours: "Favorite Tours",
        add_tour: "Add Tour",
        save: "Save",
        cancel: "Cancel",
        no_tours: "No tours available",
        no_favorites: "No favorite tours yet"
    }
};

// Get current language
function getCurrentLanguage() {
    return localStorage.getItem("language") || "vi";
}

// Change language
function changeLanguage(lang) {
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
    updatePageLanguage();
}

// Update page language
function updatePageLanguage() {
    const lang = getCurrentLanguage();
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    
    // Update language selector
    const langSelect = document.getElementById("langSelect");
    if (langSelect) {
        langSelect.value = lang;
    }
}

// Initialize language on page load
document.addEventListener("DOMContentLoaded", () => {
    const lang = getCurrentLanguage();
    document.documentElement.lang = lang;
    updatePageLanguage();
});