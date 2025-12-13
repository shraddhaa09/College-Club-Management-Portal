<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
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

$data = json_decode(file_get_contents("php://input"), true);
$user_id = $data['user_id'] ?? null;
$role = $data['role'] ?? null;

if (!$user_id || !$role) {
    http_response_code(400);
    exit(json_encode(["status" => "error", "message" => "User ID and role required"]));
}

try {
    // Ensure member belongs to this club
    $checkStmt = $pdo->prepare("SELECT id FROM members WHERE id = ? AND club_id = ?");
    $checkStmt->execute([$user_id, $club_id]);
    if ($checkStmt->rowCount() === 0) {
        http_response_code(403);
        exit(json_encode(["status" => "error", "message" => "Unauthorized or member not found"]));
    }

    $sql = "UPDATE members SET role = ? WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$role, $user_id]);

    echo json_encode(["status" => "success", "message" => "Role updated successfully"]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed to update role: " . $e->getMessage()]);
}
?>
