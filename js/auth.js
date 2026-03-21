

let currentUser = getFromLocalStorage('currentUser');

// Регистрация
function register() {
    const name = document.getElementById('regName')?.value;
    const email = document.getElementById('regEmail')?.value;
    const password = document.getElementById('regPassword')?.value;
    
    if (!name || !email || !password) {
        showNotification('Заполните все поля!', 'error');
        return;
    }
    
    const users = getFromLocalStorage('users') || [];
    
    if (users.find(u => u.email === email)) {
        showNotification('Пользователь с таким email уже существует!', 'error');
        return;
    }
    
    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    saveToLocalStorage('users', users);
    
    currentUser = newUser;
    saveToLocalStorage('currentUser', currentUser);
    
    updateAuthUI();
    closeAuthModal();
    showNotification(`🍊 Добро пожаловать, ${name}!`);
}

// Вход
function login() {
    const email = document.getElementById('loginEmail')?.value;
    const password = document.getElementById('loginPassword')?.value;
    
    const users = getFromLocalStorage('users') || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        saveToLocalStorage('currentUser', currentUser);
        updateAuthUI();
        closeAuthModal();
        showNotification(`🍊 С возвращением, ${user.name}!`);
    } else {
        showNotification('Неверный email или пароль!', 'error');
    }
}

// Выход
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
    showNotification('Вы вышли из аккаунта');
}

// Обновление UI авторизации
function updateAuthUI() {
    const userNameElement = document.getElementById('userName');
    const userInfoElement = document.getElementById('userInfo');
    const loginFormElement = document.getElementById('loginForm');
    
    if (userNameElement && userInfoElement && loginFormElement) {
        if (currentUser) {
            userNameElement.textContent = currentUser.name;
            userInfoElement.style.display = 'block';
            loginFormElement.style.display = 'none';
        } else {
            userInfoElement.style.display = 'none';
            loginFormElement.style.display = 'block';
        }
    }
    
    // Обновляем имя в форме заявки если есть
    const requestName = document.getElementById('requestName');
    if (requestName && currentUser) {
        requestName.value = currentUser.name;
    }
}

// Открытие модального окна авторизации
function openAuthModal() {
    updateAuthUI();
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.add('active');
}

// Закрытие модального окна авторизации
function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.remove('active');
}

// Загрузка модального окна авторизации
async function loadAuthModal() {
    const modalHtml = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>🍊 Вход / Регистрация</h3>
                <span class="close-modal" onclick="closeAuthModal()">&times;</span>
            </div>
            <div id="authContent">
                <div id="userInfo" style="display:none;">
                    <p>Вы вошли как: <strong id="userName"></strong></p>
                    <button class="btn" onclick="logout()">Выйти</button>
                </div>
                <div id="loginForm">
                    <div class="form-group">
                        <input type="text" id="regName" placeholder="Имя">
                    </div>
                    <div class="form-group">
                        <input type="email" id="regEmail" placeholder="Email">
                    </div>
                    <div class="form-group">
                        <input type="password" id="regPassword" placeholder="Пароль">
                    </div>
                    <button class="btn btn-orange" style="width:100%;" onclick="register()">Зарегистрироваться</button>
                    <p style="text-align:center; margin:1rem 0;">Или</p>
                    <div class="form-group">
                        <input type="email" id="loginEmail" placeholder="Email">
                    </div>
                    <div class="form-group">
                        <input type="password" id="loginPassword" placeholder="Пароль">
                    </div>
                    <button class="btn" style="width:100%;" onclick="login()">Войти</button>
                </div>
            </div>
        </div>
    `;
    document.getElementById('authModal').innerHTML = modalHtml;
}