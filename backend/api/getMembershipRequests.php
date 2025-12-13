<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit();

require_once '../config/db_connect.php';
require_once '../utils/token_utils.php';

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

try {
    $sql = "SELECT id, name, email, department, joined, 'pending' AS status
            FROM members
            WHERE club_id = ? AND status = 'pending'
            ORDER BY joined DESC";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$club_id]);
    $requests = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "requests" => $requests
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Failed to fetch requests: " . $e->getMessage()
    ]);
}
?>
