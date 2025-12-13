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
$membership_id = $data['membership_id'] ?? null;
$action = $data['action'] ?? null; // "approve" or "reject"

if (!$membership_id || !$action) {
    http_response_code(400);
    exit(json_encode(["status" => "error", "message" => "Membership ID and action required"]));
}

try {
    // Ensure membership belongs to this club
    $checkStmt = $pdo->prepare("SELECT id FROM members WHERE id = ? AND club_id = ?");
    $checkStmt->execute([$membership_id, $club_id]);
    if ($checkStmt->rowCount() === 0) {
        http_response_code(403);
        exit(json_encode(["status" => "error", "message" => "Unauthorized or member not found"]));
    }

    if ($action === "approve") {
        $sql = "UPDATE members SET status = 'active' WHERE id = ?";
    } else {
        $sql = "UPDATE members SET status = 'rejected' WHERE id = ?";
    }

    $stmt = $pdo->prepare($sql);
    $stmt->execute([$membership_id]);

    echo json_encode(["status" => "success", "message" => "Membership " . $action . "d successfully"]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed to process request: " . $e->getMessage()]);
}
?>
