

// Рассчет цены в чат-калькуляторе
function calculateChatPrice() {
    const width = parseFloat(document.getElementById('chatWidth')?.value) || 0;
    const height = parseFloat(document.getElementById('chatHeight')?.value) || 0;
    const profile = parseInt(document.getElementById('chatProfile')?.value) || 0;
    const area = width * height;
    const basePrice = 7000;
    let total = area * basePrice + profile;
    
    if (total < 0) total = 0;
    
    const resultElement = document.getElementById('chatResult');
    if (resultElement) {
        resultElement.innerHTML = `🍊 Стоимость: ${formatPrice(total)}`;
    }
}

// Открытие модального окна калькулятора
function openChatCalculator() {
    const modal = document.getElementById('chatCalculatorModal');
    if (modal) modal.classList.add('active');
}

// Закрытие модального окна калькулятора
function closeChatCalculator() {
    const modal = document.getElementById('chatCalculatorModal');
    if (modal) modal.classList.remove('active');
}

// Загрузка модального окна калькулятора
async function loadCalculatorModal() {
    const modalHtml = `
        <div class="modal-content chat-modal">
            <div class="chat-header">
                <i class="fas fa-calculator"></i>
                <h3>🍊 Калькулятор стоимости окна</h3>
                <span class="close-modal" onclick="closeChatCalculator()">&times;</span>
            </div>
            <div class="chat-body">
                <div class="form-group">
                    <label>Ширина (м)</label>
                    <input type="number" id="chatWidth" placeholder="1.5" step="0.1">
                </div>
                <div class="form-group">
                    <label>Высота (м)</label>
                    <input type="number" id="chatHeight" placeholder="1.5" step="0.1">
                </div>
                <div class="form-group">
                    <label>Тип профиля</label>
                    <select id="chatProfile">
                        <option value="0">Эконом</option>
                        <option value="3000">Стандарт (+3000₽)</option>
                        <option value="6000">Премиум (+6000₽)</option>
                    </select>
                </div>
                <button class="btn btn-orange" style="width:100%;" onclick="calculateChatPrice()">
                    🍊 Рассчитать
                </button>
                <div class="calculator-result" id="chatResult">
                    Стоимость: 0 ₽
                </div>
                <button class="btn" style="width:100%; margin-top:1rem;" 
                    onclick="closeChatCalculator(); smoothScrollTo('request');">
                    Заказать замер
                </button>
            </div>
        </div>
    `;
    document.getElementById('chatCalculatorModal').innerHTML = modalHtml;
}