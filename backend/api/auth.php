<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

session_start();

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
$action = $_GET['action'] ?? '';

if ($method !== 'POST') {
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

switch($action) {
    case 'register':
        // Проверяем, существует ли пользователь
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$data['email']]);
        if ($stmt->fetch()) {
            echo json_encode(['error' => 'User already exists']);
            exit;
        }
        
        // Создаем нового пользователя
        $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
        $stmt->execute([$data['name'], $data['email'], $hashedPassword]);
        
        $userId = $pdo->lastInsertId();
        $_SESSION['user_id'] = $userId;
        $_SESSION['user_name'] = $data['name'];
        
        echo json_encode([
            'success' => true,
            'user' => [
                'id' => $userId,
                'name' => $data['name'],
                'email' => $data['email']
            ]
        ]);
        break;
        
    case 'login':
        $stmt = $pdo->prepare("SELECT id, name, email, password FROM users WHERE email = ?");
        $stmt->execute([$data['email']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($user && password_verify($data['password'], $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['name'];
            
            echo json_encode([
                'success' => true,
                'user' => [
                    'id' => $user['id'],
                    'name' => $user['name'],
                    'email' => $user['email']
                ]
            ]);
        } else {
            echo json_encode(['error' => 'Invalid credentials']);
        }
        break;
        
    case 'logout':
        session_destroy();
        echo json_encode(['success' => true]);
        break;
        
    case 'check':
        if (isset($_SESSION['user_id'])) {
            echo json_encode([
                'authenticated' => true,
                'user' => [
                    'id' => $_SESSION['user_id'],
                    'name' => $_SESSION['user_name']
                ]
            ]);
        } else {
            echo json_encode(['authenticated' => false]);
        }
        break;
        
    default:
        echo json_encode(['error' => 'Invalid action']);
}
?>