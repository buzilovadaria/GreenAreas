// ========== МАССИВ С МАРКЕРАМИ ==========
const markersData = [
    {
        id: 1,
        coords: [56.852775, 53.211483],
        name: "Центральная площадь",
        description: "Главная площадь Ижевска, место проведения городских праздников и фестивалей",
        category: "Достопримечательность",
        address: "ул. Пушкинская, 2"
    },
    {
        id: 2,
        coords: [56.849500, 53.219500],
        name: "Ижевский пруд",
        description: "Один из крупнейших искусственных прудов в Европе, созданный в XVIII веке",
        category: "Природа",
        address: "набережная Ижевского пруда"
    },
    {
        id: 3,
        coords: [56.858000, 53.205000],
        name: "Михайловский собор",
        description: "Православный собор, восстановленный в 2000-х годах",
        category: "Храм",
        address: "ул. Красная, 28"
    },
    {
        id: 4,
        coords: [56.847000, 53.194000],
        name: "Парк Кирова",
        description: "Любимое место отдыха горожан с аттракционами",
        category: "Парк",
        address: "ул. Пушкинская, 190"
    },
    {
        id: 5,
        coords: [56.860000, 53.225000],
        name: "Монумент Дружбы народов",
        description: "Символ единения народов, открытый в 1972 году",
        category: "Памятник",
        address: "пл. Оружейников"
    },
    {
        id: 6,
        coords: [56.855000, 53.202000],
        name: "Национальный музей УР",
        description: "Главный музей Удмуртии с богатой коллекцией",
        category: "Музей",
        address: "ул. Коммунаров, 287"
    }
];

// ========== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ==========
let currentMap = null;
let currentMarkers = [];

// ========== ФУНКЦИЯ ДЛЯ ИНИЦИАЛИЗАЦИИ КАРТЫ ==========
function initMap(containerId = 'map', centerCoords = [56.852775, 53.211483], zoomLevel = 13) {
    // Проверяем, загружена ли библиотека Leaflet
    if (typeof L === 'undefined') {
        console.error('Leaflet не загружен! Подключите CSS и JS библиотеки');
        return null;
    }
    
    // Создаём карту
    const map = L.map(containerId).setView(centerCoords, zoomLevel);
    
    // Добавляем слой с картой (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);
    
    return map;
}

// ========== ФУНКЦИЯ ДЛЯ ДОБАВЛЕНИЯ МАРКЕРОВ НА КАРТУ ==========
function addMarkersToMap(map, markers) {
    if (!map) {
        console.error('Карта не инициализирована');
        return [];
    }
    
    const addedMarkers = [];
    
    markers.forEach(marker => {
        // Создаём маркер
        const markerObj = L.marker(marker.coords);
        
        // Добавляем всплывающее окно
        const popupContent = `
            <div style="min-width: 200px; font-family: Arial, sans-serif;">
                <h3 style="margin: 0 0 8px 0; color: #e11d48;">${marker.name}</h3>
                <p style="margin: 5px 0;"><strong>📍 Категория:</strong> ${marker.category || 'Не указана'}</p>
                <p style="margin: 5px 0;"><strong>📝 Описание:</strong> ${marker.description}</p>
                <p style="margin: 5px 0;"><strong>🏠 Адрес:</strong> ${marker.address || 'Не указан'}</p>
            </div>
        `;
        markerObj.bindPopup(popupContent);
        
        // Добавляем маркер на карту
        markerObj.addTo(map);
        addedMarkers.push(markerObj);
    });
    
    console.log(`✅ Добавлено маркеров: ${addedMarkers.length}`);
    return addedMarkers;
}

// ========== ФУНКЦИЯ ДЛЯ ПОЛУЧЕНИЯ УНИКАЛЬНЫХ КАТЕГОРИЙ ==========
function getUniqueCategories(markers) {
    const categories = markers.map(marker => marker.category);
    return [...new Set(categories)];
}

// ========== ФУНКЦИЯ ДЛЯ ПОИСКА МАРКЕРОВ ПО НАЗВАНИЮ ==========
function searchMarkersByName(markers, searchTerm) {
    const term = searchTerm.toLowerCase();
    return markers.filter(marker => 
        marker.name.toLowerCase().includes(term) || 
        marker.description.toLowerCase().includes(term)
    );
}

// ========== ФУНКЦИЯ ДЛЯ ФИЛЬТРАЦИИ МАРКЕРОВ ПО КАТЕГОРИИ ==========
function filterMarkersByCategory(markers, category) {
    if (category === 'all') {
        return markers;
    }
    return markers.filter(marker => marker.category === category);
}

// ========== ЗАПУСК КАРТЫ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ==========
window.addEventListener('DOMContentLoaded', function() {
    console.log('Страница загружена, инициализируем карту...');
    
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
        console.error('Элемент с id="map" не найден!');
        return;
    }
    
    if (typeof L === 'undefined') {
        console.error('Leaflet не загружен! Проверьте подключение библиотеки');
        return;
    }
    
    // Инициализируем карту
    currentMap = initMap('map', [56.852775, 53.211483], 13);
    
    if (currentMap) {
        // Добавляем маркеры
        currentMarkers = addMarkersToMap(currentMap, markersData);
        
        // Обновляем статистику
        updateStats();
        
        // Заполняем фильтр категорий
        populateCategoryFilter();
        
        console.log('✅ Карта готова! Маркеров добавлено:', currentMarkers.length);
    } else {
        console.error('Не удалось создать карту');
    }
});

// ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ HTML ==========
function updateStats() {
    const statsElement = document.getElementById('stats');
    if (statsElement) {
        statsElement.innerHTML = `📊 Всего мест: ${markersData.length} | Категорий: ${getUniqueCategories(markersData).length}`;
    }
}

function populateCategoryFilter() {
    const select = document.getElementById('categoryFilter');
    if (select) {
        const categories = getUniqueCategories(markersData);
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            select.appendChild(option);
        });
    }
}

function filterByCategory() {
    const select = document.getElementById('categoryFilter');
    if (!select || !currentMap) return;
    
    const category = select.value;
    const filtered = filterMarkersByCategory(markersData, category);
    
    // Очищаем все маркеры с карты
    currentMarkers.forEach(marker => {
        currentMap.removeLayer(marker);
    });
    
    // Добавляем отфильтрованные маркеры
    currentMarkers = addMarkersToMap(currentMap, filtered);
}

function searchMarkers() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput || !currentMap) return;
    
    const searchTerm = searchInput.value;
    const results = searchMarkersByName(markersData, searchTerm);
    
    // Очищаем все маркеры с карты
    currentMarkers.forEach(marker => {
        currentMap.removeLayer(marker);
    });
    
    // Добавляем найденные маркеры
    currentMarkers = addMarkersToMap(currentMap, results);
}

function resetMap() {
    // Очищаем поля
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (searchInput) searchInput.value = '';
    if (categoryFilter) categoryFilter.value = 'all';
    
    // Очищаем все маркеры с карты
    if (currentMap && currentMarkers) {
        currentMarkers.forEach(marker => {
            currentMap.removeLayer(marker);
        });
    }
    
    // Добавляем все маркеры обратно
    currentMarkers = addMarkersToMap(currentMap, markersData);
    
    // Центрируем карту
    if (currentMap) {
        currentMap.setView([56.852775, 53.211483], 13);
    }
}

// Делаем функции глобальными для доступа из HTML
window.filterByCategory = filterByCategory;
window.searchMarkers = searchMarkers;
window.resetMap = resetMap;