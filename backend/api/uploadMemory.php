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

// ---- Auth ----
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

// ---- Validate input ----
if (!isset($_FILES['image'])) {
    echo json_encode(['status' => 'error', 'message' => 'No image uploaded']);
    exit;
}

$caption = $_POST['caption'] ?? null;
$event_id = !empty($_POST['event_id']) ? (int)$_POST['event_id'] : null;

// ---- File handling ----
$uploadDir = __DIR__ . '/../uploads/memories/';
$publicDir = 'uploads/memories/';

if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$file = $_FILES['image'];

if ($file['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(['status' => 'error', 'message' => 'Upload error']);
    exit;
}

$allowed = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
if (!in_array($file['type'], $allowed, true)) {
    echo json_encode(['status' => 'error', 'message' => 'Only JPG, PNG, WEBP allowed']);
    exit;
}

$ext = pathinfo($file['name'], PATHINFO_EXTENSION);
$uniqueName = time() . '_' . bin2hex(random_bytes(4)) . '.' . $ext;

$targetPath = $uploadDir . $uniqueName;
$pathForDb = $publicDir . $uniqueName;

if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
    echo json_encode(['status' => 'error', 'message' => 'Failed to save file']);
    exit;
}

// ---- Insert DB ----
$stmt = $pdo->prepare("
    INSERT INTO event_photos (club_id, event_id, file_path, caption)
    VALUES (?, ?, ?, ?)
");
$stmt->execute([$club_id, $event_id, $pathForDb, $caption]);

$id = (int)$pdo->lastInsertId();

$stmt = $pdo->prepare("
    SELECT id, club_id, event_id, file_path, caption, uploaded_at
    FROM event_photos
    WHERE id = ?
");
$stmt->execute([$id]);
$photoRow = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode([
    'status' => 'success',
    'photo' => [
        'id' => $id,
        'photo'  => $photoRow,
        'club_id' => $club_id,
        'event_id' => $event_id,
        'file_path' => $pathForDb,
        'caption' => $caption,
    ]
]);
