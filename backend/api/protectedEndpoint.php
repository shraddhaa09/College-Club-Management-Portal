<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
require_once 'C:/xampp/htdocs/cllgclub/backend/vendor/autoload.php';
require_once __DIR__ . '/../utils/token_utils.php';

$headers = getallheaders();
$authHeader = $headers["Authorization"] ?? '';
$token = '';
if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
    $token = $matches[1];
}
$userData = $token ? verifyToken($token) : false;
if (!$userData) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Unauthorized or invalid token"]);
    exit;
}
echo json_encode([
    "status" => "success",
    "user" => $userData,
    "message" => "JWT verified successfully"
]);
?>
