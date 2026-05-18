// ===== КАЛЬКУЛЯТОР ВТОРСЫРЬЯ =====
// Цены за единицу (усредненные по Ижевску)
const PRICES = {
    paper: 5,        // руб/кг макулатура
    pet: 15,         // руб/кг ПЭТ-бутылки
    aluminum: 40,    // руб/кг алюминиевые банки
    batteries: 0.5,  // руб/шт батарейки
    glass: 3         // руб/кг стекло
};

// Функция обновления калькулятора
function updateCalculator() {
    const paper = parseFloat(document.getElementById('paper-kg')?.value) || 0;
    const pet = parseFloat(document.getElementById('pet-kg')?.value) || 0;
    const aluminum = parseFloat(document.getElementById('aluminum-kg')?.value) || 0;
    const batteries = parseFloat(document.getElementById('batteries-pcs')?.value) || 0;
    const glass = parseFloat(document.getElementById('glass-kg')?.value) || 0;
    
    const total = (paper * PRICES.paper) + 
                  (pet * PRICES.pet) + 
                  (aluminum * PRICES.aluminum) + 
                  (batteries * PRICES.batteries) + 
                  (glass * PRICES.glass);
    
    const totalElement = document.getElementById('total-amount');
    if (totalElement) {
        totalElement.textContent = total.toFixed(2);
    }
    
    // Эко-сообщение в зависимости от суммы
    const impactElement = document.getElementById('eco-impact');
    if (impactElement) {
        if (total >= 100) {
            impactElement.innerHTML = '🎉 Отлично! Вы не только заработали, но и спасли деревья и ресурсы планеты!';
        } else if (total >= 50) {
            impactElement.innerHTML = '🌍 Замечательный вклад! Вы помогаете сокращать количество отходов на свалках.';
        } else if (total >= 10) {
            impactElement.innerHTML = '💚 Хорошее начало! Каждый килограмм вторсырья имеет значение.';
        } else {
            impactElement.innerHTML = '🌱 Попробуйте накопить вторсырье — даже небольшая сдача помогает экологии!';
        }
    }
}

// Сброс калькулятора
function resetCalculator() {
    const inputs = ['paper-kg', 'pet-kg', 'aluminum-kg', 'batteries-pcs', 'glass-kg'];
    inputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) input.value = '0';
    });
    updateCalculator();
}

// ===== КАРТОЧКИ ПОПУЛЯРНЫХ ЗОН =====
// Выбираем 5 самых популярных зон (первые 5 из массива или специально отобранные)
function getPopularZones() {
    // Фильтруем только зеленые зоны (не пункты приема)
    const greenZones = markersData.filter(marker => marker.type !== 'recycle');
    // Берем первые 5 или все, если меньше
    return greenZones.slice(0, 5);
}

function createCard(zone) {
    const card = document.createElement('div');
    card.className = 'zone-card';
    card.onclick = () => {
        // При клике на карточку центрируем карту на маркере
        if (currentMap && zone.coords) {
            currentMap.setCenter(zone.coords, 16);
            // Ищем соответствующий маркер и открываем балун
            const marker = currentMarkers.find(m => {
                const markerCoords = m.geometry.getCoordinates();
                return markerCoords[0] === zone.coords[0] && markerCoords[1] === zone.coords[1];
            });
            if (marker) {
                marker.balloon.open();
            }
        }
    };
    
    const imageUrl = zone.image || 'images/placeholder.png';
    const categoryEmoji = zone.category === 'Парк' ? '🌳' : 
                          zone.category === 'Сквер' ? '🌿' :
                          zone.category === 'Лес' ? '🌲' :
                          zone.category === 'Бульвар' ? '🚶' :
                          zone.category === 'Аллея' ? '🌸' : '🍃';
    
    card.innerHTML = `
        <img class="card-image" src="${imageUrl}" alt="${zone.name}" 
             onerror="this.src='https://placehold.co/400x200/e8f5e8/2d8a2d?text=🌳+Зеленая+зона'">
        <div class="card-content">
            <div class="card-title">${zone.name}</div>
            <div class="card-category">${categoryEmoji} ${zone.category}</div>
            <div class="card-description">${zone.description.substring(0, 100)}${zone.description.length > 100 ? '...' : ''}</div>
            <div class="card-address">📍 ${zone.address.substring(0, 50)}${zone.address.length > 50 ? '...' : ''}</div>
        </div>
    `;
    
    return card;
}

function loadPopularCards() {
    const container = document.getElementById('popular-cards');
    if (!container) return;
    
    const popularZones = getPopularZones();
    container.innerHTML = '';
    popularZones.forEach(zone => {
        container.appendChild(createCard(zone));
    });
}

// ===== ЭКО-СОВЕТЫ ДНЯ =====
const ecoTips = [
    "💡 Возьмите с собой многоразовую сумку в магазин — одна сумка заменяет 400 пластиковых пакетов в год!",
    "💡 Выключайте свет, когда выходите из комнаты — это экономит до 15% электроэнергии.",
    "💡 Используйте обе стороны бумаги при печати — так вы сохраните вдвое больше деревьев.",
    "💡 Сдавайте батарейки отдельно — одна батарейка загрязняет 20 кв.м почвы!",
    "💡 Покупайте напитки в стеклянной таре — стекло можно перерабатывать бесконечно.",
    "💡 Замените пластиковую зубную щетку на бамбуковую — она разлагается за 6 месяцев.",
    "💡 Собирайте дождевую воду для полива растений — это экономит ресурсы и снижает счета.",
    "💡 Отдавайте ненужные вещи на благотворительность или в секонд-хенд — продлите им жизнь!",
    "💡 Ходите в магазин со своим контейнером для продуктов — меньше пластика, больше пользы.",
    "💡 Участвуйте в субботниках в парках Ижевска — вместе мы можем сделать город чище!",
    "💡 Компостируйте органические отходы — это отличное удобрение и меньше мусора на свалках.",
    "💡 Выбирайте электронные билеты и чеки — сохраняйте деревья от вырубки.",
    "💡 Сажайте деревья во дворе — каждое дерево очищает воздух для 3 человек!",
    "💡 Сортируйте отходы дома — начните с двух контейнеров: смешанный мусор и вторсырье."
];

let currentTipIndex = -1;

function getRandomTip() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * ecoTips.length);
    } while (newIndex === currentTipIndex && ecoTips.length > 1);
    currentTipIndex = newIndex;
    return ecoTips[currentTipIndex];
}

function updateEcoTip() {
    const tipElement = document.getElementById('tip-text');
    if (tipElement) {
        tipElement.textContent = getRandomTip();
        // Добавляем небольшую анимацию
        tipElement.style.opacity = '0';
        setTimeout(() => {
            tipElement.style.opacity = '1';
        }, 50);
    }
}

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', function() {
    // Настраиваем калькулятор
    const inputs = ['paper-kg', 'pet-kg', 'aluminum-kg', 'batteries-pcs', 'glass-kg'];
    inputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', updateCalculator);
        }
    });
    
    const resetBtn = document.getElementById('reset-calc');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetCalculator);
    }
    
    // Загружаем карточки популярных зон
    loadPopularCards();
    
    // Настраиваем эко-совет
    updateEcoTip();
    const refreshBtn = document.getElementById('refresh-tip');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', updateEcoTip);
    }
    
    // Инициализируем калькулятор
    updateCalculator();
    
    console.log('✅ Новый UI загружен: калькулятор, карточки, эко-советы');
});