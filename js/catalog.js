

// Данные каталога
const catalogItems = [
    { id: 1, name: "Окно ПВХ 70мм", category: "windows", price: 8500, priceText: "8 500 ₽/м²", icon: "🪟", desc: "Энергосберегающее" },
    { id: 2, name: "Деревянное окно", category: "windows", price: 12000, priceText: "12 000 ₽/м²", icon: "🌳", desc: "Экологичное" },
    { id: 3, name: "Входная дверь", category: "doors", price: 24900, priceText: "24 900 ₽", icon: "🚪", desc: "Стальная, утеплённая" },
    { id: 4, name: "Межкомнатная дверь", category: "doors", price: 8500, priceText: "8 500 ₽", icon: "🚪✨", desc: "Ламинат, шпон" },
    { id: 5, name: "Остекление балкона", category: "balconies", price: 15000, priceText: "от 15 000 ₽", icon: "🏠", desc: "Холодное/тёплое" },
    { id: 6, name: "Роллеты защитные", category: "rollers", price: 5500, priceText: "5 500 ₽/м²", icon: "📜", desc: "Антивандальные" },
    { id: 7, name: "Секционные ворота", category: "rollers", price: 45000, priceText: "45 000 ₽", icon: "🚘", desc: "Автоматические" },
    { id: 8, name: "Кондиционер", category: "ac", price: 32000, priceText: "32 000 ₽", icon: "❄️", desc: "Сплит-система" }
];

// Данные преимуществ
const advantagesData = [
    { icon: "fas fa-ruler-combined", title: "Бесплатный замер", desc: "Выезд специалиста" },
    { icon: "fas fa-truck", title: "Доставка по Крыму", desc: "Быстрая доставка" },
    { icon: "fas fa-tools", title: "Установка за 1 день", desc: "Профессиональный монтаж" },
    { icon: "fas fa-shield-alt", title: "Гарантия 5 лет", desc: "На все изделия" }
];

// Данные услуг
const servicesData = [
    { icon: "fas fa-drafting-compass", title: "Профессиональный замер", desc: "Точные замеры" },
    { icon: "fas fa-boxes", title: "Доставка", desc: "Собственный автопарк" },
    { icon: "fas fa-wrench", title: "Установка под ключ", desc: "Монтаж любой сложности" },
    { icon: "fas fa-medal", title: "Гарантийное обслуживание", desc: "5 лет гарантии" }
];

// Рендер каталога
function renderCatalog(filter = "all") {
    const grid = document.getElementById("catalogGrid");
    if (!grid) return;
    
    const filtered = filter === "all" ? catalogItems : catalogItems.filter(item => item.category === filter);
    
    grid.innerHTML = filtered.map(item => `
        <div class="product-card">
            <div class="product-img">${item.icon}</div>
            <div class="product-info">
                <h3>${item.name}</h3>
                <p style="color:#666; font-size:0.9rem;">${item.desc}</p>
                <div class="price">${item.priceText}</div>
                <div class="product-buttons">
                    <button class="btn btn-orange" onclick="addToCart(${JSON.stringify(item).replace(/"/g, '&quot;')})">
                        🍊 В корзину
                    </button>
                    <button class="btn" onclick="goToOrderForm('${item.name}')">
                        Заказать
                    </button>
                </div>
            </div>
        </div>
    `).join("");
}

// Рендер преимуществ
function renderAdvantages() {
    const grid = document.getElementById("advantagesGrid");
    if (!grid) return;
    
    grid.innerHTML = advantagesData.map(adv => `
        <div class="advantage-card">
            <i class="${adv.icon}"></i>
            <h3>${adv.title}</h3>
            <p>${adv.desc}</p>
        </div>
    `).join("");
}

// Рендер услуг
function renderServices() {
    const grid = document.getElementById("servicesGrid");
    if (!grid) return;
    
    grid.innerHTML = servicesData.map(service => `
        <div class="advantage-card">
            <i class="${service.icon}"></i>
            <h3>${service.title}</h3>
            <p>${service.desc}</p>
        </div>
    `).join("");
}

// Рендер фильтров
function renderFilters() {
    const filtersContainer = document.getElementById("filters");
    if (!filtersContainer) return;
    
    const filters = [
        { id: "all", name: "Все товары" },
        { id: "windows", name: "Окна" },
        { id: "doors", name: "Двери" },
        { id: "balconies", name: "Балконы" },
        { id: "rollers", name: "Роллеты/Ворота" },
        { id: "ac", name: "Кондиционеры" }
    ];
    
    filtersContainer.innerHTML = filters.map(filter => `
        <button class="filter-btn ${filter.id === 'all' ? 'active' : ''}" data-filter="${filter.id}">
            ${filter.name}
        </button>
    `).join("");
    
    // Добавляем обработчики
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            renderCatalog(this.dataset.filter);
        });
    });
}

// Переход к форме заказа
function goToOrderForm(productName) {
    smoothScrollTo('request');
    
    if (currentUser) {
        document.getElementById('requestName').value = currentUser.name;
    }
    
    const commentField = document.getElementById('requestComment');
    if (commentField.value) {
        commentField.value = commentField.value + `, ${productName}`;
    } else {
        commentField.value = `Заказ товара: ${productName}`;
    }
}