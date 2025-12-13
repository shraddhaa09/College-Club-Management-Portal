<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit();

require_once __DIR__ . '/../config/db_connect.php';
require_once __DIR__ . '/../utils/token_utils.php';

// Authenticate JWT
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

// Support tokens that store club id as user_id or club_id
$club_id = $decoded['club_id'] ?? $decoded['user_id'] ?? null;
if (!$club_id) {
    http_response_code(401);
    exit(json_encode(['status' => 'error', 'message' => 'Token missing club id']));
}

try {
    $stmt = $pdo->prepare("SELECT id, name, email, department, role, status, domain, joined FROM members WHERE club_id = ? ORDER BY joined DESC");
    $stmt->execute([$club_id]);
    $members = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['status' => 'success', 'members' => $members]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to fetch members: ' . $e->getMessage()]);
}
?>