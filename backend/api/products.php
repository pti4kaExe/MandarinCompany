<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Подключение к базе данных
$host = 'localhost';
$dbname = 'mandarin';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

// Обработка запросов
$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            // Получить один товар
            $stmt = $pdo->prepare("SELECT * FROM products WHERE id = ?");
            $stmt->execute([$_GET['id']]);
            $product = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($product);
        } elseif (isset($_GET['category'])) {
            // Получить товары по категории
            $stmt = $pdo->prepare("SELECT * FROM products WHERE category = ?");
            $stmt->execute([$_GET['category']]);
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($products);
        } else {
            // Получить все товары
            $stmt = $pdo->query("SELECT * FROM products");
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($products);
        }
        break;
        
    case 'POST':
        // Добавить новый товар
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare("INSERT INTO products (name, category, price, price_text, icon, description) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$data['name'], $data['category'], $data['price'], $data['priceText'], $data['icon'], $data['desc']]);
        echo json_encode(['id' => $pdo->lastInsertId()]);
        break;
        
    case 'PUT':
        // Обновить товар
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare("UPDATE products SET name=?, category=?, price=?, price_text=?, icon=?, description=? WHERE id=?");
        $stmt->execute([$data['name'], $data['category'], $data['price'], $data['priceText'], $data['icon'], $data['desc'], $data['id']]);
        echo json_encode(['success' => true]);
        break;
        
    case 'DELETE':
        // Удалить товар
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare("DELETE FROM products WHERE id=?");
        $stmt->execute([$data['id']]);
        echo json_encode(['success' => true]);
        break;
}
?>