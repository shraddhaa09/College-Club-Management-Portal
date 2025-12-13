<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit();

require_once __DIR__ . '/../config/db_connect.php';
require_once __DIR__ . '/../utils/token_utils.php';

// ✅ Verify JWT
$headers = getallheaders();
if (!isset($headers['Authorization'])) {
    http_response_code(401);
    exit(json_encode(['status'=>'error','message'=>'No token provided']));
}

$token = str_replace('Bearer ', '', $headers['Authorization']);
$decoded = verifyToken($token);
if (!$decoded) {
    http_response_code(401);
    exit(json_encode(['status'=>'error','message'=>'Invalid or expired token']));
}

$club_id = $decoded['user_id'];

// ✅ Get JSON body
$data = json_decode(file_get_contents("php://input"), true);
$id = intval($data['id'] ?? 0);

if (!$id) {
    http_response_code(400);
    exit(json_encode(["status"=>"error", "message"=>"Workshop ID required"]));
}

try {
    // ✅ Delete only if it belongs to that club
    $stmt = $pdo->prepare("DELETE FROM workshops WHERE id=? AND club_id=?");
    $stmt->execute([$id, $club_id]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(["status"=>"success", "message"=>"Workshop deleted"]);
    } else {
        echo json_encode(["status"=>"error", "message"=>"No permission to delete or not found"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status"=>"error", "message"=>"Failed to delete workshop"]);
}
?>
