<?php
// Вспомогательные функции

// Очистка входных данных
function sanitize($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Валидация email
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Валидация телефона
function validatePhone($phone) {
    $pattern = '/^\+?[0-9\s\-\(\)]{10,20}$/';
    return preg_match($pattern, $phone);
}

// Отправка email
function sendEmail($to, $subject, $message, $from = ADMIN_EMAIL) {
    $headers = "From: " . SITE_NAME . " <" . $from . ">\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    return mail($to, $subject, $message, $headers);
}

// Генерация уникального кода
function generateUniqueCode($length = 10) {
    $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $code = '';
    for ($i = 0; $i < $length; $i++) {
        $code .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $code;
}

// Форматирование цены
function formatPrice($price) {
    return number_format($price, 0, '', ' ') . ' ₽';
}

// Получение IP адреса пользователя
function getUserIP() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        return $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        return $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        return $_SERVER['REMOTE_ADDR'];
    }
}

// Логирование действий
function logAction($action, $userId = null) {
    $pdo = getDBConnection();
    $ip = getUserIP();
    $stmt = $pdo->prepare("INSERT INTO logs (user_id, action, ip_address) VALUES (?, ?, ?)");
    $stmt->execute([$userId, $action, $ip]);
}

// Получение настроек сайта
function getSettings() {
    $pdo = getDBConnection();
    $stmt = $pdo->query("SELECT * FROM settings");
    $settings = [];
    while ($row = $stmt->fetch()) {
        $settings[$row['key']] = $row['value'];
    }
    return $settings;
}

// Обновление настроек сайта
function updateSettings($key, $value) {
    $pdo = getDBConnection();
    $stmt = $pdo->prepare("UPDATE settings SET value = ? WHERE `key` = ?");
    return $stmt->execute([$value, $key]);
}

// Проверка авторизации администратора
function isAdmin() {
    return isset($_SESSION['user_role']) && $_SESSION['user_role'] === 'admin';
}

// Редирект
function redirect($url) {
    header("Location: " . SITE_URL . $url);
    exit;
}
?>