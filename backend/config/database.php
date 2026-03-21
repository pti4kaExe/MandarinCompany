<?php
// Конфигурация базы данных
define('DB_HOST', 'localhost');
define('DB_NAME', 'mandarin');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

// Настройки сайта
define('SITE_NAME', 'Мандарин');
define('SITE_URL', 'http://localhost/mandarin-website');
define('ADMIN_EMAIL', 'info@mandarin.ru');

// Настройки SMTP для отправки писем
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USER', 'your-email@gmail.com');
define('SMTP_PASS', 'your-password');

// Функция для подключения к базе данных
function getDBConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $pdo = new PDO($dsn, DB_USER, DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        return $pdo;
    } catch(PDOException $e) {
        die("Database connection failed: " . $e->getMessage());
    }
}
?>