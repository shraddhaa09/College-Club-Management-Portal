<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
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
$title = trim($data['title'] ?? '');
$event_date = trim($data['event_date'] ?? '');
$description = trim($data['description'] ?? '');
$time = trim($data['time'] ?? null);
$venue = trim($data['venue'] ?? null);
$status = trim($data['status'] ?? 'Upcoming');

if (!$id || !$title || !$event_date) {
    http_response_code(400);
    exit(json_encode(['status' => 'error', 'message' => 'Required: id, title, and event_date']));
}

// Update only events belonging to the logged-in club
$stmt = $pdo->prepare("
    UPDATE events 
    SET title = ?, event_date = ?, description = ?, time = ?, venue = ?, status = ?
    WHERE id = ? AND club_id = ?
");

if ($stmt->execute([$title, $event_date, $description, $time, $venue, $status, $id, $club_id])) {
    if ($stmt->rowCount() > 0) {
        echo json_encode(['status' => 'success', 'message' => 'Event updated successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No event found or not authorized']);
    }
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to update event']);
}
?>
