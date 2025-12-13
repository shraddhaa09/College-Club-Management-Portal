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

$club_id = $decoded['user_id'];

// Read and decode JSON input
$input = json_decode(file_get_contents("php://input"), true);

if (!$input) {
    http_response_code(400);
    exit(json_encode(['status' => 'error', 'message' => 'Invalid or empty JSON received']));
}

// ✅ Add "vision" as optional but included if available
if (
    empty($input['name']) ||
    empty($input['description']) ||
    empty($input['club_email']) ||
    empty($input['mission'])
) {
    http_response_code(400);
    exit(json_encode(['status' => 'error', 'message' => 'Missing required fields']));
}

$vision = isset($input['vision']) ? $input['vision'] : null;

try {
    $stmt = $pdo->prepare("
        UPDATE clubs 
        SET name = ?, description = ?, club_email = ?, mission = ?, vision = ?
        WHERE id = ?
    ");
    $stmt->execute([
        $input['name'],
        $input['description'],
        $input['club_email'],
        $input['mission'],
        $vision,
        $club_id
    ]);

    echo json_encode(['status' => 'success', 'message' => 'Settings updated successfully']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to update settings: ' . $e->getMessage()
    ]);
}
?>
