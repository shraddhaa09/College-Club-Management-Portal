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
$acting_member_id = $decoded['member_id'] ?? $decoded['user_member_id'] ?? null; // optional: include in JWT to block self-delete if president
if (!$club_id) {
    http_response_code(401);
    exit(json_encode(['status' => 'error', 'message' => 'Token missing club id']));
}

$data = json_decode(file_get_contents("php://input"), true);
$target_id = (int)($data['user_id'] ?? $data['id'] ?? 0);
if (!$target_id) {
    http_response_code(400);
    exit(json_encode(['status' => 'error', 'message' => 'user_id is required']));
}

try {
    // fetch the target member
    $stmt = $pdo->prepare("SELECT id, role FROM members WHERE id = ? AND club_id = ?");
    $stmt->execute([$target_id, $club_id]);
    $target = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$target) {
        http_response_code(404);
        exit(json_encode(['status' => 'error', 'message' => 'Member not found']));
    }

    // If token contains acting member id, prevent president from deleting self
    if ($acting_member_id && (int)$acting_member_id === (int)$target_id && $target['role'] === 'president') {
        http_response_code(403);
        exit(json_encode(['status' => 'error', 'message' => 'You cannot remove yourself while you are the president. Assign another president first.']));
    }

    // Prevent removing the last president
    if ($target['role'] === 'president') {
        $countStmt = $pdo->prepare("SELECT COUNT(*) as cnt FROM members WHERE club_id = ? AND role = 'president' AND id != ?");
        $countStmt->execute([$club_id, $target_id]);
        $row = $countStmt->fetch(PDO::FETCH_ASSOC);
        $otherPresidents = (int)$row['cnt'];
        if ($otherPresidents === 0) {
            http_response_code(400);
            exit(json_encode(['status' => 'error', 'message' => 'Cannot remove the last president. Assign another president first.']));
        }
    }

    // Soft delete: set status = 'removed' (safer than physical delete). If you prefer hard delete, replace with DELETE.
    $del = $pdo->prepare("UPDATE members SET status = 'removed' WHERE id = ? AND club_id = ?");
    $del->execute([$target_id, $club_id]);

    echo json_encode(['status' => 'success', 'message' => 'Member removed']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to remove member: ' . $e->getMessage()]);
}
?>