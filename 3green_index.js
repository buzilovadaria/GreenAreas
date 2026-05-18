// ===== КАЛЬКУЛЯТОР ВТОРСЫРЬЯ =====
const PRICES = {
    paper: 5,        // руб/кг макулатура
    pet: 15,         // руб/кг ПЭТ-бутылки
    aluminum: 40,    // руб/кг алюминиевые банки
    batteries: 0.5,  // руб/шт батарейки
    glass: 3         // руб/кг стекло
};

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
    
}

function resetCalculator() {
    const inputs = ['paper-kg', 'pet-kg', 'aluminum-kg', 'batteries-pcs', 'glass-kg'];
    inputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) input.value = '0';
    });
    updateCalculator();
}

// ===== ТАБЫ СПРАВОЧНИКА =====
function openTab(evt, tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
}

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', function() {
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
    
    updateCalculator();
    
    console.log('✅ Калькулятор и справочник загружены');
});