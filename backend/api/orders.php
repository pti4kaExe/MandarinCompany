<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

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

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        if (isset($_GET['user_id'])) {
            $stmt = $pdo->prepare("SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC");
            $stmt->execute([$_GET['user_id']]);
            $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($orders);
        } else {
            $stmt = $pdo->query("SELECT * FROM orders ORDER BY created_at DESC");
            $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($orders);
        }
        break;
        
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        
        $pdo->beginTransaction();
        
        try {
            // Создаем заказ
            $stmt = $pdo->prepare("INSERT INTO orders (user_id, name, phone, address, comment, total, status) VALUES (?, ?, ?, ?, ?, ?, 'new')");
            $stmt->execute([
                $data['user_id'] ?? null,
                $data['name'],
                $data['phone'],
                $data['address'],
                $data['comment'],
                $data['total']
            ]);
            $orderId = $pdo->lastInsertId();
            
            // Добавляем товары в заказ
            $stmt = $pdo->prepare("INSERT INTO order_items (order_id, product_id, product_name, quantity, price) VALUES (?, ?, ?, ?, ?)");
            foreach ($data['items'] as $item) {
                $stmt->execute([$orderId, $item['id'], $item['name'], $item['quantity'], $item['price']]);
            }
            
            $pdo->commit();
            echo json_encode(['success' => true, 'order_id' => $orderId]);
        } catch(Exception $e) {
            $pdo->rollBack();
            echo json_encode(['error' => $e->getMessage()]);
        }
        break;
        
    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare("UPDATE orders SET status = ? WHERE id = ?");
        $stmt->execute([$data['status'], $data['id']]);
        echo json_encode(['success' => true]);
        break;
}
?>