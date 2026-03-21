

let cart = getFromLocalStorage('cart') || [];

// Обновление отображения корзины
function updateCartDisplay() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.getElementById('cartCount');
    if (cartCount) cartCount.textContent = count;
    saveToLocalStorage('cart', cart);
}

// Добавление в корзину
function addToCart(item) {
    const existing = cart.find(cartItem => cartItem.id === item.id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    updateCartDisplay();
    showNotification(`🍊 ${item.name} добавлен в корзину!`);
}

// Удаление из корзины
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
    renderCart();
}

// Очистка корзины
function clearCart() {
    cart = [];
    updateCartDisplay();
    renderCart();
}

// Отображение корзины
function renderCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    if (!cartItemsDiv) return;
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p style="text-align:center;">Корзина пуста 🍊</p>';
        document.getElementById('cartTotal').innerHTML = '';
        return;
    }
    
    cartItemsDiv.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-price">${item.priceText}</div>
                <div>Количество: ${item.quantity}</div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${index})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => {
        const price = parsePrice(item.priceText);
        return sum + (price * item.quantity);
    }, 0);
    
    document.getElementById('cartTotal').innerHTML = `Итого: ${formatPrice(total)}`;
}

// Переход к оформлению заказа
function goToCheckout() {
    closeCartModal();
    smoothScrollTo('request');
    
    if (currentUser) {
        document.getElementById('requestName').value = currentUser.name;
    }
    
    if (cart.length > 0) {
        const cartSummary = cart.map(item => `${item.name} (${item.quantity} шт.)`).join(', ');
        const commentField = document.getElementById('requestComment');
        commentField.value = `Заказ из корзины: ${cartSummary}`;
    }
}

// Открытие модального окна корзины
function openCartModal() {
    renderCart();
    const modal = document.getElementById('cartModal');
    if (modal) modal.classList.add('active');
}

// Закрытие модального окна корзины
function closeCartModal() {
    const modal = document.getElementById('cartModal');
    if (modal) modal.classList.remove('active');
}

// Загрузка модального окна корзины
async function loadCartModal() {
    const modalHtml = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>🍊 Моя корзина</h3>
                <span class="close-modal" onclick="closeCartModal()">&times;</span>
            </div>
            <div id="cartItems"></div>
            <div id="cartTotal" class="cart-total"></div>
            <button class="btn btn-orange" style="width:100%; margin-top:1rem;" onclick="goToCheckout()">
                Оформить заказ
            </button>
        </div>
    `;
    document.getElementById('cartModal').innerHTML = modalHtml;
}