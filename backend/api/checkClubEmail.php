<?php
// CORS headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'api_init.php';
require_once '../config/db_connect.php';
header("Content-Type: application/json; charset=utf-8");

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? null;

if (!$email) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Email is required"
    ]);
    exit;
}

try {
    $sql = "SELECT id FROM clubs WHERE club_email = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$email]);
    
    $exists = $stmt->rowCount() > 0;
    
    echo json_encode([
        "status" => "success",
        "exists" => $exists,
        "available" => !$exists
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Failed to check email: " . $e->getMessage()
    ]);
}
?>
