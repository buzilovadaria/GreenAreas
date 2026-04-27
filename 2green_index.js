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
        address: "Удмуртская Республика, г. Ижевск, Карлутская площадь"
    },
    {
        id: 3,
        coords: [56.86362520902421, 53.27946578929785],
        name: "Сквер им. Татьяны Барамзиной",
        description: "",
        category: "Сквер",
        address: "Удмуртская Республика, г. Ижевск, ул. Труда, 48"
    },
    {
        id: 4,
        coords: [56.850563208267545, 53.19531171447617],
        name: "Сквер на Набережной Ижевского пруда",
        description: "",
        category: "Сквер",
        address: "Удмуртская Республика, г. Ижевск, наб. Зодчего Дудина"
    },
    {
        id: 5,
        coords: [56.842524236481424, 53.21795916536055],
        name: "Птичий сквер",
        description: "",
        category: "Сквер",
        address: "Удмуртская Республика, г. Ижевск, ул. Пушкинская, 158 и ул. Коммунаров, 191а"
    },
    {
        id: 6,
        coords: [56.86116292170031, 53.20887910528223],
        name: "Вишневый сквер",
        description: "",
        category: "Сквер",
        address: "Удмуртская Республика, г. Ижевск, ул. Пушкинская, 268"
    },
    {
        id: 7,
        coords: [56.86688784436081, 53.21169884146559],
        name: "Открытый сад",
        description: "",
        category: "Сад",
        address: "Удмуртская Республика, г. Ижевск, ул. Пушкинская, 276"
    },
    {
        id: 8,
        coords: [56.86856853314001, 53.29022940283024],
        name: "Сквер Молодоженов",
        description: "",
        category: "Сквер",
        address: "Удмуртская Республика, г. Ижевск, ул. Михаила Петрова, 33"
    },
        {
        id: 9,
        coords: [56.876658463268775, 53.19241477768947],
        name: "Сквер им. В.С.Тарасова",
        description: "",
        category: "Сквер",
        address: "Удмуртская Республика, г. Ижевск, ул. 50 лет ВЛКСМ"
    },
    {
        id: 10,
        coords: [56.80884229490635, 53.18997651317826],
        name: "Сквер им. Титова",
        description: "",
        category: "Сквер",
        address: "Удмуртская Республика, г. Ижевск, ул. Титова, 4"
    },
    {
        id: 11,
        coords: [56.86581131938815, 53.20997764146552],
        name: "Сквер им.Шувалова П.И.",
        description: "",
        category: "Сквер",
        address: "Удмуртская Республика, г. Ижевск, ул. Пушкинская, 276"
    },
    {
        id: 12,
        coords: [56.87684105100032, 53.184120150701176],
        name: "Сквер Металлургов",
        description: "",
        category: "Сквер",
        address: "Удмуртская Республика, г. Ижевск, ул. Школьная, 44"
    }
    
    
    
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