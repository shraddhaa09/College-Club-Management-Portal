<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../config/db_connect.php';
require_once __DIR__ . '/../utils/token_utils.php';

$headers = getallheaders();
$auth = $headers['Authorization'] ?? $headers['authorization'] ?? '';

if (!$auth) {
    http_response_code(401);
    echo json_encode(['status' => 'error', 'message' => 'No token provided']);
    exit;
}

$token = str_replace('Bearer ', '', $auth);
$user = verifyToken($token);

if (!$user || $user['role'] !== 'club') {
    http_response_code(401);
    echo json_encode(['status' => 'error', 'message' => 'Invalid or expired token']);
    exit;
}

$club_id = (int)$user['user_id'];

$input = json_decode(file_get_contents('php://input'), true);
$photo_id = isset($input['id']) ? (int)$input['id'] : 0;

if (!$photo_id) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid photo id']);
    exit;
}

// get photo
$stmt = $pdo->prepare("SELECT file_path FROM event_photos WHERE id = ? AND club_id = ?");
$stmt->execute([$photo_id, $club_id]);
$photo = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$photo) {
    echo json_encode(['status' => 'error', 'message' => 'Photo not found']);
    exit;
}

// delete file
$filePath = __DIR__ . '/../' . $photo['file_path'];
if (file_exists($filePath)) {
    unlink($filePath);
}

// delete db row
$stmt = $pdo->prepare("DELETE FROM event_photos WHERE id = ? AND club_id = ?");
$stmt->execute([$photo_id, $club_id]);

echo json_encode(['status' => 'success']);
