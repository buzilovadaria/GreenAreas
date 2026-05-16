function calculateEarnings() {
    const paper = parseFloat(document.getElementById('paper').value) || 0;
    const plastic = parseFloat(document.getElementById('plastic').value) || 0;
    const aluminum = parseFloat(document.getElementById('aluminum').value) || 0;
    const glass = parseFloat(document.getElementById('glass').value) || 0;
    
    const minTotal = (paper * 6) + (plastic * 15) + (aluminum * 50) + (glass * 1);
    const maxTotal = (paper * 12) + (plastic * 25) + (aluminum * 80) + (glass * 3);
    
    document.getElementById('result').style.display = 'block';
    document.getElementById('minEarnings').innerHTML = `📉 Минимум: <strong>${minTotal.toFixed(0)} ₽</strong>`;
    document.getElementById('maxEarnings').innerHTML = `📈 Максимум: <strong>${maxTotal.toFixed(0)} ₽</strong>`;
    
    let recommendation = '';
    if (aluminum > 0) {
        recommendation = '💡 Совет: Алюминиевые банки — самые выгодные! Собирайте их отдельно.';
    } else if (plastic > 5) {
        recommendation = '💡 Совет: Пластик лучше сдавать в чистом виде и сортировать по цвету.';
    } else if (paper > 10) {
        recommendation = '💡 Совет: Свяжите макулатуру в пачки для удобства транспортировки.';
    } else if (glass > 20) {
        recommendation = '💡 Совет: Стекло тяжелое, но дешевое. Сдавайте большими объемами.';
    } else {
        recommendation = '💡 Совет: Начните собирать алюминиевые банки — это самый дорогой вид вторсырья!';
    }
    document.getElementById('recommendation').innerHTML = recommendation;
}

function openTab(evt, tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
}