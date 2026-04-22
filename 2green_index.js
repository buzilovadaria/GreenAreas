// ========== МАССИВ С МАРКЕРАМИ ДЛЯ ИЖЕВСКА ==========
const markersData = [
    {
        id: 1,
        coords: [56.852775, 53.211483],
        title: "Центральная площадь",
        description: "Главная площадь Ижевска, место проведения городских праздников и фестивалей",
        address: "ул. Пушкинская, 2",
        category: "Достопримечательность"
    },
    {
        id: 2,
        coords: [56.849500, 53.219500],
        title: "Ижевский пруд",
        description: "Один из крупнейших искусственных прудов в Европе, созданный в XVIII веке",
        address: "набережная Ижевского пруда",
        category: "Природа"
    },
    {
        id: 3,
        coords: [56.858000, 53.205000],
        title: "Михайловский собор",
        description: "Православный собор, восстановленный в 2000-х годах",
        address: "ул. Красная, 28",
        category: "Храм"
    },
    {
        id: 4,
        coords: [56.847000, 53.194000],
        title: "Парк Кирова",
        description: "Любимое место отдыха горожан с аттракционами и фонтанами",
        address: "ул. Пушкинская, 190",
        category: "Парк"
    },
    {
        id: 5,
        coords: [56.860000, 53.225000],
        title: "Монумент Дружбы народов",
        description: "Символ единения народов, открытый в 1972 году",
        address: "пл. Оружейников",
        category: "Памятник"
    },
    {
        id: 6,
        coords: [56.855000, 53.202000],
        title: "Национальный музей УР",
        description: "Главный музей Удмуртии с богатой коллекцией",
        address: "ул. Коммунаров, 287",
        category: "Музей"
    },
    {
        id: 7,
        coords: [56.842000, 53.208000],
        title: "Зоопарк Удмуртии",
        description: "Современный зоопарк с более чем 300 видами животных",
        address: "ул. Кирова, 8",
        category: "Развлечения"
    }
];

// ========== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ==========
let map;
let markers = [];

// ========== ИНИЦИАЛИЗАЦИЯ КАРТЫ ==========
function initMap() {
    console.log("Инициализация карты...");
    
    // Проверяем, загружен ли Leaflet
    if (typeof L === 'undefined') {
        console.error("Leaflet не загружен!");
        return;
    }
    
    // Создаём карту с центром в Ижевске
    map = L.map('map').setView([56.852775, 53.211483], 13);
    
    // Добавляем слой с картой
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);
    
    // Добавляем все маркеры
    addAllMarkers();
    
    console.log("✅ Карта готова, маркеров добавлено:", markersData.length);
}

// ========== ДОБАВЛЕНИЕ ВСЕХ МАРКЕРОВ ==========
function addAllMarkers() {
    markersData.forEach(markerData => {
        addMarker(markerData);
    });
}

// ========== ДОБАВЛЕНИЕ ОДНОГО МАРКЕРА ==========
function addMarker(markerData) {
    // Создаём красный маркер
    const marker = L.marker(markerData.coords, {
        title: markerData.title
    });
    
    // Содержимое всплывающего окна
    const popupContent = `
        <div style="min-width: 200px; max-width: 300px; font-family: Arial, sans-serif;">
            <h3 style="margin: 0 0 8px 0; color: #1a73e8;">${markerData.title}</h3>
            <p style="margin: 5px 0; color: #5f6368;">
                <strong>📍 Категория:</strong> ${markerData.category}
            </p>
            <p style="margin: 5px 0; color: #5f6368;">
                <strong>📝 Описание:</strong> ${markerData.description}
            </p>
            <p style="margin: 5px 0; color: #5f6368;">
                <strong>🏠 Адрес:</strong> ${markerData.address}
            </p>
        </div>
    `;
    
    // Привязываем всплывающее окно
    marker.bindPopup(popupContent);
    
    // Добавляем маркер на карту
    marker.addTo(map);
    
    // Сохраняем в массив
    markers.push(marker);
    
    return marker;
}

// ========== ОЧИСТКА ВСЕХ МАРКЕРОВ ==========
function clearMarkers() {
    markers.forEach(marker => {
        map.removeLayer(marker);
    });
    markers = [];
}

// ========== ФИЛЬТРАЦИЯ МАРКЕРОВ ПО КАТЕГОРИИ ==========
function filterMarkersByCategory(category) {
    clearMarkers();
    
    const filteredMarkers = markersData.filter(marker => marker.category === category);
    filteredMarkers.forEach(marker => addMarker(marker));
    
    console.log(`🔍 Отфильтровано: ${filteredMarkers.length} маркеров категории "${category}"`);
}

// ========== ПОИСК МАРКЕРОВ ПО НАЗВАНИЮ ==========
function searchMarkersByName(searchTerm) {
    clearMarkers();
    
    const term = searchTerm.toLowerCase();
    const foundMarkers = markersData.filter(marker => 
        marker.title.toLowerCase().includes(term) || 
        marker.description.toLowerCase().includes(term)
    );
    
    foundMarkers.forEach(marker => addMarker(marker));
    
    console.log(`🔍 Найдено: ${foundMarkers.length} маркеров по запросу "${searchTerm}"`);
    
    return foundMarkers;
}

// ========== ЦЕНТРИРОВАНИЕ НА МАРКЕРЕ ==========
function centerOnMarker(markerId) {
    const markerData = markersData.find(m => m.id === markerId);
    if (markerData) {
        map.setView(markerData.coords, 16);
        
        // Находим маркер и открываем попап
        const marker = markers.find(m => 
            m.getLatLng().lat === markerData.coords[0] && 
            m.getLatLng().lng === markerData.coords[1]
        );
        
        if (marker) {
            marker.openPopup();
        }
    }
}

// ========== ПОЛУЧИТЬ ВСЕ КАТЕГОРИИ ==========
function getAllCategories() {
    const categories = markersData.map(marker => marker.category);
    return [...new Set(categories)];
}

// ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ HTML ==========
function showAllMarkers() {
    clearMarkers();
    addAllMarkers();
    map.setView([56.852775, 53.211483], 13);
}

function centerOnIzhevsk() {
    map.setView([56.852775, 53.211483], 13);
}

// ========== ЗАПУСК КАРТЫ ПРИ ЗАГРУЗКЕ ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log("Страница загружена, запускаем карту...");
    initMap();
});

// ========== ДОБАВЛЕНИЕ НОВОГО МАРКЕРА ==========
function addNewMarker(lat, lng, title, description, address, category) {
    const newMarker = {
        id: markersData.length + 1,
        coords: [lat, lng],
        title: title,
        description: description,
        address: address,
        category: category
    };
    
    markersData.push(newMarker);
    addMarker(newMarker);
    
    console.log(`✅ Добавлен новый маркер: "${title}"`);
    
    return newMarker;
}

// Делаем функции глобальными
window.showAllMarkers = showAllMarkers;
window.centerOnIzhevsk = centerOnIzhevsk;
window.filterMarkersByCategory = filterMarkersByCategory;
window.searchMarkersByName = searchMarkersByName;
window.addNewMarker = addNewMarker;