<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit();

require_once __DIR__ . '/../config/db_connect.php';
require_once __DIR__ . '/../utils/token_utils.php';

// JWT Authentication
$headers = getallheaders();
if (!isset($headers['Authorization'])) {
    http_response_code(401);
    exit(json_encode(['status' => 'error', 'message' => 'No token provided']));
}

$token = str_replace('Bearer ', '', $headers['Authorization']);
$decoded = verifyToken($token);
if (!$decoded) {
    http_response_code(401);
    exit(json_encode(['status' => 'error', 'message' => 'Invalid or expired token']));
}

$club_id = $decoded['user_id']; // the logged-in club

$data = json_decode(file_get_contents("php://input"), true);

$title = trim($data['title'] ?? '');
$event_date = trim($data['event_date'] ?? '');
$description = trim($data['description'] ?? '');
$status = trim($data['status'] ?? 'Upcoming');
$time = trim($data['time'] ?? '');
$venue = trim($data['venue'] ?? '');

if (!$title || !$event_date) {
    http_response_code(400);
    exit(json_encode(['status' => 'error', 'message' => 'Title and event_date are required']));
}

try {
    $stmt = $pdo->prepare("
        INSERT INTO events (club_id, title, event_date, description, status, time, venue)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([$club_id, $title, $event_date, $description, $status, $time, $venue]);

    echo json_encode(['status' => 'success', 'event_id' => $pdo->lastInsertId()]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to add event: ' . $e->getMessage()
    ]);
}
?>
