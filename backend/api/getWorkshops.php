<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit();

require_once __DIR__ . '/../config/db_connect.php';
require_once __DIR__ . '/../utils/token_utils.php';

// JWT Auth
$headers = getallheaders();
if (!isset($headers['Authorization'])) {
    http_response_code(401);
    exit(json_encode(['status'=>'error','message'=>'No token provided']));
}

$token = str_replace('Bearer ', '', $headers['Authorization']);
$decoded = verifyToken($token);
if (!$decoded) {
    http_response_code(401);
    exit(json_encode(['status'=>'error','message'=>'Invalid or expired token']));
}

$club_id = $decoded['user_id'];

try {
    $stmt = $pdo->prepare("
        SELECT id, title, description, date, venue, duration, seats, enrolled, type
        FROM workshops
        WHERE club_id = ?
        ORDER BY date ASC
    ");
    $stmt->execute([$club_id]);
    $workshops = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['status' => 'success', 'workshops' => $workshops]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to fetch workshops: ' . $e->getMessage()
    ]);
}
?>
