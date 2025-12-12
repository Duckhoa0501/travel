// Email validation
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Form validation
function validateForm(name, email, password) {
    let isValid = true;
    
    if (name && name.trim().length < 2) {
        document.getElementById("nameError").textContent = "Tên phải ít nhất 2 ký tự";
        document.getElementById("nameError").classList.remove("d-none");
        isValid = false;
    }
    
    if (!validateEmail(email)) {
        document.getElementById("emailError").textContent = "Email không hợp lệ";
        document.getElementById("emailError").classList.remove("d-none");
        isValid = false;
    }
    
    if (password.length < 6) {
        document.getElementById("passwordError").textContent = "Mật khẩu phải ít nhất 6 ký tự";
        document.getElementById("passwordError").classList.remove("d-none");
        isValid = false;
    }
    
    return isValid;
}

// Clear errors
function clearErrors() {
    document.querySelectorAll(".text-danger").forEach(el => {
        if (el.id && el.id.includes("Error")) {
            el.classList.add("d-none");
        }
    });
}

// REGISTER
async function registerUser() {
    clearErrors();
    
    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value;

    if (!validateForm(name, email, password)) {
        return;
    }

    try {
        const users = await apiGet(API_USERS);
        const exists = users.find(u => u.email === email);

        if (exists) {
            document.getElementById("emailError").textContent = "Email đã tồn tại!";
            document.getElementById("emailError").classList.remove("d-none");
            return;
        }

        const newUser = {
            name, email, password,
            createdAt: new Date().toISOString()
        };

        await apiPost(API_USERS, newUser);
        
        showAlert("Đăng ký thành công!", "success");
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);
    } catch (error) {
        showAlert("Lỗi đăng ký: " + error.message, "danger");
    }
}

// LOGIN
async function loginUser() {
    clearErrors();
    
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (!validateEmail(email) || !password) {
        showAlert("Vui lòng nhập email và mật khẩu", "danger");
        return;
    }

    try {
        const users = await apiGet(API_USERS);
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            showAlert("Sai email hoặc mật khẩu!", "danger");
            return;
        }

        localStorage.setItem("currentUser", JSON.stringify(user));
        showAlert("Đăng nhập thành công!", "success");
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
    } catch (error) {
        showAlert("Lỗi đăng nhập: " + error.message, "danger");
    }
}
