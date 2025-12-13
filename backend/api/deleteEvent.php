<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit();

require_once __DIR__ . '/../config/db_connect.php';
require_once __DIR__ . '/../utils/token_utils.php';

// Auth check
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

$club_id = $decoded['user_id'];
$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'] ?? null;

if (!$id) {
    http_response_code(400);
    exit(json_encode(['status' => 'error', 'message' => 'Event ID is required']));
}

// Delete only if event belongs to the logged-in club
$stmt = $pdo->prepare("DELETE FROM events WHERE id = ? AND club_id = ?");
$stmt->execute([$id, $club_id]);

if ($stmt->rowCount() > 0) {
    echo json_encode(['status' => 'success', 'message' => 'Event deleted successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No event found or not authorized']);
}
?>
