<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PATCH");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../config/db_connect.php';
require_once __DIR__ . '/../utils/token_utils.php';

// JWT Authentication
$headers = getallheaders();

if (!isset($headers['Authorization'])) {
    http_response_code(401);
    echo json_encode(['status' => 'error', 'message' => 'No token provided']);
    exit();
}

$token = str_replace('Bearer ', '', $headers['Authorization']);
$decoded = verifyToken($token);

if (!$decoded) {
    http_response_code(401);
    echo json_encode(['status' => 'error', 'message' => 'Invalid or expired token']);
    exit();
}

$club_id = $decoded['user_id'];

try {
    $stmt = $pdo->prepare("
        SELECT 
            name AS club_name, 
            description AS club_description, 
            club_email AS club_contact_email, 
            mission,
            vision
        FROM clubs
        WHERE id = ?
    ");
    $stmt->execute([$club_id]);
    $club = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$club) {
        http_response_code(404);
        echo json_encode(['status' => 'error', 'message' => 'Club not found']);
        exit();
    }

    echo json_encode(['status' => 'success', 'club' => $club]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to fetch settings: ' . $e->getMessage()]);
}
?>
