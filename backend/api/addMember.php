<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
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

$club_id = $decoded['club_id'] ?? $decoded['user_id'] ?? null;
if (!$club_id) {
    http_response_code(401);
    exit(json_encode(['status' => 'error', 'message' => 'Token missing club id']));
}

$data = json_decode(file_get_contents("php://input"), true);
$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$department = trim($data['department'] ?? '');
$role = trim($data['role'] ?? 'member');
$status = trim($data['status'] ?? 'active');
$domain = trim($data['domain'] ?? '');

// Basic validation
if (!$name || !$email || !$department || !$role) {
    http_response_code(400);
    exit(json_encode(['status' => 'error', 'message' => 'Name, email, department and role are required']));
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    exit(json_encode(['status' => 'error', 'message' => 'Invalid email format']));
}

// Allowed role/status lists (enforce fixed values)
$ALLOWED_ROLES = ['member', 'officer', 'president', 'vice-president', 'secretary', 'treasurer'];
$ALLOWED_STATUS = ['active', 'pending', 'removed', 'inactive'];

if (!in_array($role, $ALLOWED_ROLES, true)) {
    http_response_code(400);
    exit(json_encode(['status' => 'error', 'message' => 'Invalid role']));
}
if (!in_array($status, $ALLOWED_STATUS, true)) {
    http_response_code(400);
    exit(json_encode(['status' => 'error', 'message' => 'Invalid status']));
}

try {
    // Duplicate check (email unique per club)
    $check = $pdo->prepare("SELECT id FROM members WHERE club_id = ? AND email = ?");
    $check->execute([$club_id, $email]);
    if ($check->rowCount() > 0) {
        http_response_code(400);
        exit(json_encode(['status' => 'error', 'message' => 'A member with this email already exists']));
    }

    // Insert
    $stmt = $pdo->prepare("INSERT INTO members (club_id, name, email, department, role, status, domain, joined) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())");
    $stmt->execute([$club_id, $name, $email, $department, $role, $status, $domain]);

    echo json_encode(['status' => 'success', 'message' => 'Member added successfully', 'member_id' => $pdo->lastInsertId()]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to add member: ' . $e->getMessage()]);
}
?>