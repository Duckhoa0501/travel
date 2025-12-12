let allTours = [];
let editingTourId = null;

async function loadTours() {
    try {
        allTours = await apiGet(API_TOURS); 
        populateDestinationFilter();
        renderTours(allTours);
    } catch (error) {
        showAlert("Lỗi tải tour: " + error.message, "danger");
    }
}

// Populate destination filter dropdown
function populateDestinationFilter() {
    const destinations = [...new Set(allTours.map(t => t.destination))];
    const select = document.getElementById("destinationFilter");
    
    destinations.forEach(dest => {
        const option = document.createElement("option");
        option.value = dest;
        option.textContent = dest;
        select.appendChild(option);
    });
    updatePageLanguage();
}

// RENDER TOURS
function renderTours(tours) {
    const list = document.getElementById("tourList");
    list.innerHTML = "";

    if (tours.length === 0) {
        list.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info text-center">
                    <i class="fas fa-info-circle me-2"></i>
                    <span data-i18n="no_tours">Không có tour nào</span>
                </div>
            </div>
        `;
        updatePageLanguage();
        return;
    }

    tours.forEach(t => {
        const isFavorite = JSON.parse(localStorage.getItem("favorites") || "[]").includes(t.id);
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];
        const bgColor = colors[t.id % colors.length];
        list.innerHTML += `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card tour-card h-100 fade-in">
                    <div class="tour-image-placeholder" style="background-color: ${bgColor}; height: 200px; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-map-location-dot" style="font-size: 3rem; color: white; opacity: 0.8;"></i>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-truncate" title="${t.title}">${t.title}</h5>
                        <p class="card-text text-muted">
                            <i class="fas fa-map-marker-alt me-2"></i>${t.destination}
                        </p>
                        <p class="card-text">
                            <span class="tour-duration">
                                <i class="fas fa-calendar-alt me-1"></i>${t.duration} ngày
                            </span>
                        </p>
                        <p class="tour-price mb-3">
                            <span>$${t.price}</span>
                        </p>
                        <p class="card-text small text-muted flex-grow-1">${t.description || 'Không có mô tả'}</p>
                        <div class="btn-group w-100 mt-3" role="group">
                            <button class="btn btn-outline-danger btn-sm btn-favorite ${isFavorite ? 'active' : ''}" 
                                    onclick="toggleFavorite('${t.id}')" title="Thêm yêu thích">
                                <i class="fas fa-heart"></i>
                            </button>
                            <button class="btn btn-primary btn-sm" onclick="openEditTour('${t.id}')" title="Sửa">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-danger btn-sm" onclick="deleteTour('${t.id}')" title="Xóa">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}

// Open edit tour modal
async function openEditTour(id) {
    try {
        const tour = await apiGet(`${API_TOURS}/${id}`);
        editingTourId = id;
        document.getElementById("tourId").value = id;
        document.getElementById("tourTitle").value = tour.title;
        document.getElementById("tourDestination").value = tour.destination;
        document.getElementById("tourPrice").value = tour.price;
        document.getElementById("tourDuration").value = tour.duration;
        document.getElementById("tourDescription").value = tour.description || "";
        document.getElementById("modalTitle").textContent = "Sửa Tour";
        
        const modal = new bootstrap.Modal(document.getElementById("addTourModal"));
        modal.show();
    } catch (error) {
        showAlert("Lỗi tải tour: " + error.message, "danger");
    }
}

// Save tour (add or edit)
async function saveTour() {
    const id = document.getElementById("tourId").value;
    const title = document.getElementById("tourTitle").value.trim();
    const destination = document.getElementById("tourDestination").value.trim();
    const price = Number(document.getElementById("tourPrice").value);
    const duration = Number(document.getElementById("tourDuration").value);
    const description = document.getElementById("tourDescription").value.trim();

    if (!title || !destination || !price || !duration || !description) {
        showAlert("Vui lòng điền đầy đủ thông tin!", "warning");
        return;
    }

    if (price < 0 || duration < 1) {
        showAlert("Giá và thời lượng phải lớn hơn 0!", "warning");
        return;
    }

    try {
        const tourData = { title, destination, price, duration, description };
        
        if (id) {
            await apiPut(`${API_TOURS}/${id}`, tourData);
            showAlert("Cập nhật tour thành công!", "success");
        } else {
            tourData.createdAt = new Date().toISOString();
            await apiPost(API_TOURS, tourData);
            showAlert("Thêm tour thành công!", "success");
        }
        
        bootstrap.Modal.getInstance(document.getElementById("addTourModal")).hide();
        loadTours();
    } catch (error) {
        showAlert("Lỗi lưu tour: " + error.message, "danger");
    }
}

// DELETE TOUR
async function deleteTour(id) {
    if (!confirm("Bạn có chắc chắn muốn xóa tour này?")) {
        return;
    }

    try {
        await apiDelete(`${API_TOURS}/${id}`);
        showAlert("Xóa tour thành công!", "success");
        loadTours();
    } catch (error) {
        showAlert("Lỗi xóa tour: " + error.message, "danger");
    }
}

// SEARCH + FILTER
function applyFilters() {
    const keyword = document.getElementById("search").value.toLowerCase();
    const destination = document.getElementById("destinationFilter").value;
    const maxPrice = Number(document.getElementById("priceFilter").value) || Infinity;
    const maxDuration = Number(document.getElementById("durationFilter").value) || Infinity;
    
    const filtered = allTours.filter(t => {
        const matchKeyword = t.title.toLowerCase().includes(keyword) ||
                           t.destination.toLowerCase().includes(keyword) ||
                           t.description.toLowerCase().includes(keyword);
        const matchDestination = !destination || t.destination === destination;
        const matchPrice = t.price <= maxPrice;
        const matchDuration = t.duration <= maxDuration;
        
        return matchKeyword && matchDestination && matchPrice && matchDuration;
    });

    renderTours(filtered);
}

// Legacy function for backward compatibility
function searchTours() {
    applyFilters();
}

// TOGGLE FAVORITE
function toggleFavorite(id) {
    let fav = JSON.parse(localStorage.getItem("favorites") || "[]");
    
    if (fav.includes(id)) {
        fav = fav.filter(f => f !== id);
        showAlert("Đã xóa khỏi yêu thích", "info");
    } else {
        fav.push(id);
        showAlert("Đã thêm vào yêu thích", "success");
    }
    
    localStorage.setItem("favorites", JSON.stringify(fav));
    renderTours(allTours);
}
