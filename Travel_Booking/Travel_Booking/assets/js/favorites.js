async function loadFavorites() {
    try {
        let fav = JSON.parse(localStorage.getItem("favorites") || "[]");
        const allTours = await apiGet(API_TOURS);
        const favTours = allTours.filter(t => fav.includes(t.id));

        const box = document.getElementById("favList");
        const emptyMsg = document.getElementById("emptyMessage");
        box.innerHTML = "";

        if (favTours.length === 0) {
            emptyMsg.classList.remove("d-none");
            return;
        }

        emptyMsg.classList.add("d-none");

        favTours.forEach(t => {
            const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];
            const bgColor = colors[t.id % colors.length];
            box.innerHTML += `
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
                            <p class="tour-price mb-3">
                                <span>$${t.price}</span>
                            </p>
                            <p class="card-text small text-muted flex-grow-1">${t.description || 'Không có mô tả'}</p>
                            
                            <div class="mb-3">
                                <textarea class="form-control form-control-sm" placeholder="Ghi chú..." 
                                       onchange="saveNote('${t.id}', this.value)" rows="2">${loadNote(t.id)}</textarea>
                            </div>
                            
                            <button class="btn btn-danger w-100" onclick="removeFavorite('${t.id}')">
                                <i class="fas fa-trash me-2"></i>Xóa khỏi yêu thích
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        showAlert("Lỗi tải danh sách yêu thích: " + error.message, "danger");
    }
}

function saveNote(id, text) {
    let notes = JSON.parse(localStorage.getItem("notes") || "{}");
    notes[id] = text;
    localStorage.setItem("notes", JSON.stringify(notes));
    showAlert("Ghi chú đã lưu", "info");
}

function loadNote(id) {
    let notes = JSON.parse(localStorage.getItem("notes") || "{}");
    return notes[id] || "";
}

function removeFavorite(id) {
    if (!confirm("Bạn có chắc chắn muốn xóa tour này?")) {
        return;
    }
    
    let fav = JSON.parse(localStorage.getItem("favorites") || "[]");
    fav = fav.filter(f => f !== id);
    localStorage.setItem("favorites", JSON.stringify(fav));
    
    showAlert("Đã xóa khỏi yêu thích", "success");
    loadFavorites();
}
