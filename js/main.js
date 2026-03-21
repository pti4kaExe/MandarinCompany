
// Инициализация всех компонентов
async function init() {
    // Загружаем модальные окна
    await loadCartModal();
    await loadAuthModal();
    await loadCalculatorModal();
    
    // Рендерим компоненты
    renderFilters();
    renderCatalog();
    renderAdvantages();
    renderServices();
    renderPortfolio();
    renderAbout();
    renderBlog();
    renderContacts();
    renderHeader();
    renderFooter();
    
    // Инициализируем анимации
    initMandarinAnimation();
    initScrollAnimations();
    initButtonAnimations();
    initSmoothScroll();
    
    // Навешиваем обработчики
    initEventListeners();
    
    // Обновляем UI
    updateCartDisplay();
    updateAuthUI();
}

// Рендер портфолио
function renderPortfolio() {
    const portfolioItems = [
        { img: "🏠", title: "Остекление лоджии", desc: "ул. Земская, Феодосия" },
        { img: "🚪", title: "Входная дверь Престиж", desc: "пгт. Коктебель" },
        { img: "🪟", title: "Пластиковые окна", desc: "ЖК «Мандарин»" },
        { img: "🏢", title: "Секционные ворота", desc: "Автосервис, Феодосия" }
    ];
    
    const grid = document.getElementById("portfolioGrid");
    if (grid) {
        grid.innerHTML = portfolioItems.map(item => `
            <div class="portfolio-item">
                <div class="portfolio-img">${item.img}</div>
                <div class="portfolio-info">
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                </div>
            </div>
        `).join("");
    }
}

// Рендер блога
function renderBlog() {
    const blogItems = [
        { icon: "fas fa-wind", title: "Как ухаживать за окнами зимой", desc: "Полезные советы по уходу за пластиковыми окнами." },
        { icon: "fas fa-door-open", title: "Как выбрать входную дверь", desc: "На что обратить внимание при выборе двери." },
        { icon: "fas fa-sun", title: "Остекление балкона: плюсы", desc: "Преимущества остекления балкона." }
    ];
    
    const grid = document.getElementById("blogGrid");
    if (grid) {
        grid.innerHTML = blogItems.map(item => `
            <div class="blog-card">
                <i class="${item.icon}"></i>
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
                <a href="#" style="color:#FF8C42;">Читать →</a>
            </div>
        `).join("");
    }
}

// Рендер секции "О компании"
function renderAbout() {
    const aboutContent = document.getElementById("aboutContent");
    if (aboutContent) {
        aboutContent.innerHTML = `
            <div style="max-width:800px; margin:0 auto; text-align:center;">
                <p style="font-size:1.1rem; line-height:1.8;">
                    ООО «Мандарин» — лидер в Феодосии и Крыму по продаже и установке окон, дверей, балконов. 
                    Работаем с 2015 года, более 5000 довольных клиентов. Используем только сертифицированные 
                    материалы, даём гарантию 5 лет.
                </p>
            </div>
        `;
    }
}

// Рендер контактов
function renderContacts() {
    const contactsContent = document.getElementById("contactsContent");
    if (contactsContent) {
        contactsContent.innerHTML = `
            <p><i class="fas fa-map-marker-alt"></i> <strong>г. Феодосия, ул. Советская 3</strong></p>
            <p><i class="fas fa-phone"></i> <strong>+7 (978) 123-45-67</strong></p>
            <p><i class="fas fa-envelope"></i> <strong>info@mandarin.ru</strong></p>
        `;
    }
}

// Рендер шапки
function renderHeader() {
    const headerHtml = `
        <header>
            <div class="header-container">
                <div class="logo">
                    <h1><i class="fas fa-tangerine"></i> МАНДАРИН</h1>
                    <p>Окна · Двери · Балконы · Роллеты · Ворота · Шторы · Кондиционеры</p>
                </div>
                <nav>
                    <ul>
                        <li><a href="#home">Главная</a></li>
                        <li><a href="#catalog">Каталог</a></li>
                        <li><a href="#services">Услуги</a></li>
                        <li><a href="#portfolio">Портфолио</a></li>
                        <li><a href="#about">О компании</a></li>
                        <li><a href="#blog">Блог</a></li>
                        <li><a href="#contacts">Контакты</a></li>
                    </ul>
                </nav>
                <div class="user-actions">
                    <div class="cart-icon" id="cartIcon">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="cart-count" id="cartCount">0</span>
                    </div>
                    <div class="user-icon" id="userIcon">
                        <i class="fas fa-user"></i>
                    </div>
                </div>
            </div>
        </header>
    `;
    document.getElementById('header').innerHTML = headerHtml;
}

// Рендер футера
function renderFooter() {
    const footerHtml = `
        <footer>
            <div class="footer-content">
                <div class="footer-col">
                    <h4>ООО «Мандарин»</h4>
                    <p>Надёжные окна и двери от производителя в Феодосии и Крыму</p>
                </div>
                <div class="footer-col">
                    <h4>Контакты</h4>
                    <p>ул. Советская 3, Феодосия<br>+7 (978) 580-70-75<br>info@mandarin.ru</p>
                </div>
                <div class="footer-col">
                    <h4>Мы в соцсетях</h4>
                    <div class="social-links">
                        <a href="///////////////" target="_blank"><i class="fab fa-whatsapp"></i></a>
                        <a href="//////////////" target="_blank"><i class="fab fa-telegram"></i></a>
                        <a href="#" target="_blank"><i class="fab fa-vk"></i></a>
                    </div>
                </div>
                <div class="footer-col">
                    <h4>Режим работы</h4>
                    <p>Пн-Пт: 9:00–17:00<br>Сб:9:00–16:00<br>Вс–Выходной</p>
                </div>
            </div>
            <div class="copyright">
                © 2026 ООО «Мандарин». Бесплатный замер, гарантия 5 лет, установка за 1 день.
            </div>
        </footer>
    `;
    document.getElementById('footer').innerHTML = footerHtml;
}

// Инициализация обработчиков событий
function initEventListeners() {
    // Корзина
    const cartIcon = document.getElementById('cartIcon');
    if (cartIcon) cartIcon.addEventListener('click', openCartModal);
    
    // Пользователь
    const userIcon = document.getElementById('userIcon');
    if (userIcon) userIcon.addEventListener('click', openAuthModal);
    
    // Калькулятор
    const calculatorBtn = document.getElementById('chatCalculatorBtn');
    if (calculatorBtn) calculatorBtn.addEventListener('click', openChatCalculator);
    
    // Форма заявки
    const requestForm = document.getElementById('requestForm');
    if (requestForm) {
        requestForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('requestName').value;
            const phone = document.getElementById('requestPhone').value;
            const comment = document.getElementById('requestComment').value;
            
            let message = `🍊 Новая заявка!\nИмя: ${name}\nТелефон: ${phone}\nКомментарий: ${comment}`;
            
            if (cart.length > 0) {
                const cartItems = cart.map(item => `${item.name} (${item.quantity} шт.)`).join(', ');
                message += `\n\nТовары из корзины: ${cartItems}`;
                clearCart();
            }
            
            showNotification(`🍊 Спасибо, ${name}! Мы свяжемся с вами в ближайшее время.`);
            requestForm.reset();
            
            // Здесь можно отправить данные на сервер
            console.log(message);
        });
    }
}

// Запуск приложения
document.addEventListener('DOMContentLoaded', init);