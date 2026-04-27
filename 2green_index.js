// Маркеры данных
const markersData = [
    {
        id: 1,
        coords: [56.86113108092801, 53.17586856845352],
        name: "Парк Культуры и Отдыха имени Кирова",
        description: "",
        category: "Парк",
        address: "Удмуртская Республика, г. Ижевск, ул. Кирова, 8-а"
    },
    {
        id: 2,
        coords: [56.85368486399105, 53.2189401954412],
        name: "Сквер Карлутской площади",
        description: "",
        category: "Сквер",
        address: " Удмуртская Республика, г. Ижевск, Карлутская площадь"
    },
    {
        id: 3,
        coords: [56.86362520902421, 53.27946578929785],
        name: "Сквер им. Татьяны Барамзиной",
        description: "",
        category: "Сквер",
        address: " Удмуртская Республика, г. Ижевск, ул. Труда, 48"
    },
    {
        id: 4,
        coords: [56.850563208267545, 53.19531171447617],
        name: "Сквер на Набережной Ижевского пруда",
        description: "",
        category: "Сквер",
        address: " Удмуртская Республика, г. Ижевск, наб. Зодчего Дудина"
    },
    {
        id: 5,
        coords: [56.842524236481424, 53.21795916536055],
        name: "Птичий сквер",
        description: "",
        category: "Сквер",
        address: " Удмуртская Республика, г. Ижевск, ул. Пушкинская, 158 и ул. Коммунаров, 191а"
    },
    {
        id: 6,
        coords: [56.86116292170031, 53.20887910528223],
        name: "Вишневый сквер",
        description: "",
        category: "Сквер",
        address: " Удмуртская Республика, г. Ижевск, ул. Пушкинская, 268"
    },
    
];

let currentMap = null;
let currentMarkers = [];

// Инициализация Яндекс.Карты
ymaps.ready(function() {
    currentMap = new ymaps.Map("custom-map", {
        center: [56.852775, 53.211483],
        zoom: 13,
        controls: ['zoomControl', 'fullscreenControl']
    });

    // Добавляем маркеры
    markersData.forEach(function(marker) {
        const placemark = new ymaps.Placemark(marker.coords, {
            balloonContentHeader: `<b style="color: #e11d48; font-size: 16px;">${marker.name}</b>`,
            balloonContentBody: `
                <strong>📍 Категория:</strong> ${marker.category}<br/>
                <strong>📝 Описание:</strong> ${marker.description}<br/>
                <strong>🏠 Адрес:</strong> ${marker.address}
            `,
            hintContent: marker.name
        }, {
            preset: 'islands#redIcon',
            openBalloonOnClick: true
        });
        
        currentMap.geoObjects.add(placemark);
        currentMarkers.push(placemark);
    });

    console.log('✅ Яндекс.Карта загружена, добавлено маркеров:', currentMarkers.length);
});