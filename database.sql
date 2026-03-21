-- Создание базы данных
CREATE DATABASE IF NOT EXISTS mandarin;
USE mandarin;

-- Таблица пользователей
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Таблица товаров
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    price_text VARCHAR(50),
    icon VARCHAR(10),
    description TEXT,
    material VARCHAR(50),
    images TEXT,
    in_stock BOOLEAN DEFAULT TRUE,
    views INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category)
);

-- Таблица заказов
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    order_number VARCHAR(20) UNIQUE,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT,
    comment TEXT,
    total DECIMAL(10, 2) NOT NULL,
    status ENUM('new', 'processing', 'completed', 'cancelled') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_created (created_at)
);

-- Таблица позиций заказа
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT,
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- Таблица отзывов
CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    user_id INT,
    name VARCHAR(100) NOT NULL,
    rating TINYINT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_product (product_id),
    INDEX idx_approved (is_approved)
);

-- Таблица блога
CREATE TABLE IF NOT EXISTS blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content LONGTEXT,
    category VARCHAR(50),
    icon VARCHAR(50),
    author VARCHAR(100),
    views INT DEFAULT 0,
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_published (is_published)
);

-- Таблица портфолио
CREATE TABLE IF NOT EXISTS portfolio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50),
    description TEXT,
    icon VARCHAR(50),
    address VARCHAR(255),
    client VARCHAR(100),
    images TEXT,
    date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_category (category)
);

-- Таблица логов
CREATE TABLE IF NOT EXISTS logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Таблица настроек
CREATE TABLE IF NOT EXISTS settings (
    `key` VARCHAR(100) PRIMARY KEY,
    `value` TEXT,
    description TEXT
);

-- Вставка начальных данных
INSERT INTO settings (`key`, `value`, `description`) VALUES
('site_name', 'Мандарин', 'Название сайта'),
('site_email', 'info@mandarin.ru', 'Email для связи'),
('site_phone', '+7 (978) 123-45-67', 'Телефон'),
('site_address', 'г. Феодосия, ул. Советская 3', 'Адрес'),
('working_hours', 'Пн-Пт: 9:00-19:00, Сб-Вс: 10:00-16:00', 'Часы работы');

-- Вставка тестовых товаров
INSERT INTO products (name, category, price, price_text, icon, description, material) VALUES
('Окно ПВХ 70мм', 'windows', 8500, '8 500 ₽/м²', '🪟', 'Энергосберегающее окно с тройным стеклопакетом', 'ПВХ'),
('Деревянное окно', 'windows', 12000, '12 000 ₽/м²', '🌳', 'Экологичное окно из массива сосны', 'Дерево'),
('Входная дверь', 'doors', 24900, '24 900 ₽', '🚪', 'Стальная утеплённая входная дверь', 'Металл'),
('Межкомнатная дверь', 'doors', 8500, '8 500 ₽', '🚪✨', 'Ламинат, шпон', 'Ламинат');

-- Вставка тестовых постов блога
INSERT INTO blog_posts (title, slug, excerpt, category, icon, author, is_published, published_at) VALUES
('Как ухаживать за окнами зимой', 'okna-uhod-zimoy', 'Полезные советы по уходу за пластиковыми окнами в холодное время года.', 'care', 'fas fa-wind', 'Алина Бананова', TRUE, NOW()),
('Как выбрать входную дверь', 'vybor-vhodnoy-dveri', 'На что обратить внимание при выборе входной двери для дома или квартиры.', 'doors', 'fas fa-door-open', 'Руслан Мустафаев', TRUE, NOW()),
('Остекление балкона: плюсы', 'osteklenie-balkona', 'Преимущества остекления балкона и как это повышает комфорт в доме.', 'windows', 'fas fa-sun', 'Елизавета Озерова', TRUE, NOW());

-- Вставка тестового портфолио
INSERT INTO portfolio (title, category, description, icon, address, client, date) VALUES
('Остекление лоджии', 'balconies', 'ул. Земская, Феодосия', '🏠', 'ул. Земская, 15', 'Семья Ивановых', '2024-01-15'),
('Входная дверь Престиж', 'doors', 'пгт. Коктебель', '🚪', 'ул. Морская, 7', 'Петр Сидоренко', '2024-02-20'),
('Пластиковые окна', 'windows', 'ЖК «Мандарин»', '🪟', 'ул. Советская, 3', 'ООО «Мандарин»', '2024-03-10');

-- Создание администратора (пароль: admin123)
INSERT INTO users (name, email, password, role) VALUES
('Администратор', 'admin@mandarin.ru', '$2y$10$YourHashedPasswordHere', 'admin');
