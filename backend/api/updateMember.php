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
$acting_member_id = $decoded['member_id'] ?? $decoded['user_member_id'] ?? null; // optional, if your tokens include this
if (!$club_id) {
    http_response_code(401);
    exit(json_encode(['status' => 'error', 'message' => 'Token missing club id']));
}

$data = json_decode(file_get_contents("php://input"), true);
$member_id = (int)($data['id'] ?? 0);
if (!$member_id) {
    http_response_code(400);
    exit(json_encode(['status' => 'error', 'message' => 'Member id is required']));
}

// Fields allowed to update: name, department, role, status, domain
$name = isset($data['name']) ? trim($data['name']) : null;
$department = isset($data['department']) ? trim($data['department']) : null;
$role = isset($data['role']) ? trim($data['role']) : null;
$status = isset($data['status']) ? trim($data['status']) : null;
$domain = isset($data['domain']) ? trim($data['domain']) : null;

// Validate role/status if provided
$ALLOWED_ROLES = ['member', 'officer', 'president', 'vice-president', 'secretary', 'treasurer'];
$ALLOWED_STATUS = ['active', 'pending', 'removed', 'inactive'];

if ($role !== null && !in_array($role, $ALLOWED_ROLES, true)) {
    http_response_code(400);
    exit(json_encode(['status' => 'error', 'message' => 'Invalid role']));
}
if ($status !== null && !in_array($status, $ALLOWED_STATUS, true)) {
    http_response_code(400);
    exit(json_encode(['status' => 'error', 'message' => 'Invalid status']));
}

try {
    // Fetch target member to ensure it belongs to this club
    $stmt = $pdo->prepare("SELECT id, email, role FROM members WHERE id = ? AND club_id = ?");
    $stmt->execute([$member_id, $club_id]);
    $target = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$target) {
        http_response_code(404);
        exit(json_encode(['status' => 'error', 'message' => 'Member not found']));
    }

    // If email is present in data, disallow changing email here (spec requirement)
    if (isset($data['email']) && $data['email'] !== $target['email']) {
        http_response_code(400);
        exit(json_encode(['status' => 'error', 'message' => 'Email cannot be changed']));
    }

    // Prevent demoting last president:
    if ($role !== null && $target['role'] === 'president' && $role !== 'president') {
        // count other presidents
        $countStmt = $pdo->prepare("SELECT COUNT(*) as cnt FROM members WHERE club_id = ? AND role = 'president' AND id != ?");
        $countStmt->execute([$club_id, $member_id]);
        $row = $countStmt->fetch(PDO::FETCH_ASSOC);
        $otherPresidents = (int)$row['cnt'];
        if ($otherPresidents === 0) {
            http_response_code(400);
            exit(json_encode(['status' => 'error', 'message' => 'Cannot demote the last president. Assign another president first.']));
        }
    }

    // Build update dynamically
    $fields = [];
    $params = [];

    if ($name !== null) { $fields[] = "name = ?"; $params[] = $name; }
    if ($department !== null) { $fields[] = "department = ?"; $params[] = $department; }
    if ($role !== null) { $fields[] = "role = ?"; $params[] = $role; }
    if ($status !== null) { $fields[] = "status = ?"; $params[] = $status; }
    if ($domain !== null) { $fields[] = "domain = ?"; $params[] = $domain; }

    if (count($fields) === 0) {
        http_response_code(400);
        exit(json_encode(['status' => 'error', 'message' => 'No valid fields to update']));
    }

    $params[] = $member_id;
    $sql = "UPDATE members SET " . implode(", ", $fields) . " WHERE id = ?";
    $update = $pdo->prepare($sql);
    $update->execute($params);

    echo json_encode(['status' => 'success', 'message' => 'Member updated']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to update member: ' . $e->getMessage()]);
}
?>