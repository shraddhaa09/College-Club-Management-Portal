<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit();

require_once __DIR__ . '/../config/db_connect.php';
require_once __DIR__ . '/../utils/token_utils.php';

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

$stmt = $pdo->prepare("
    SELECT id, name, description, created_at, club_email, mission, vision, contact_info
    FROM clubs
    WHERE id = ?
");
$stmt->execute([$club_id]);
$club = $stmt->fetch();

if ($club) {
    echo json_encode(['status'=>'success','club'=>$club]);
} else {
    http_response_code(404);
    echo json_encode(['status'=>'error','message'=>'Club not found']);
}
?>
