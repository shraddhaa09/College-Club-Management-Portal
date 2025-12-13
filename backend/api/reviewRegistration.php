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

session_start();
if (!isset($_SESSION['admin_id'])) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Admin access required"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$request_id = $data['request_id'] ?? null;
$action = $data['action'] ?? null; // 'approve' or 'reject'
$admin_notes = $data['admin_notes'] ?? null;
$rejection_reason = $data['rejection_reason'] ?? null;

if (!$request_id || !$action) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Request ID and action required"]);
    exit;
}

if (!in_array($action, ['approve', 'reject'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid action"]);
    exit;
}

try {
    $pdo->beginTransaction();

    // Get request details
    $getSql = "SELECT club_id, status FROM club_registration_requests WHERE id = ?";
    $getStmt = $pdo->prepare($getSql);
    $getStmt->execute([$request_id]);
    $request = $getStmt->fetch(PDO::FETCH_ASSOC);

    if (!$request) {
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "Request not found"]);
        $pdo->rollBack();
        exit;
    }

    if ($request['status'] !== 'pending') {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Request already reviewed"]);
        $pdo->rollBack();
        exit;
    }

    $club_id = $request['club_id'];
    $new_status = ($action === 'approve') ? 'approved' : 'rejected';

    // Update registration request
    $updateReqSql = "UPDATE club_registration_requests 
        SET status = ?, admin_notes = ?, rejection_reason = ?, 
            reviewed_at = NOW(), reviewed_by = ?
        WHERE id = ?";
    
    $updateReqStmt = $pdo->prepare($updateReqSql);
    $updateReqStmt->execute([$new_status, $admin_notes, $rejection_reason, $_SESSION['admin_id'], $request_id]);

    // Update club status
    if ($action === 'approve') {
        $updateClubSql = "UPDATE clubs 
            SET status = 'active', registration_status = 'approved', 
                approved_by = ?, approved_at = NOW()
            WHERE id = ?";
        $updateClubStmt = $pdo->prepare($updateClubSql);
        $updateClubStmt->execute([$_SESSION['admin_id'], $club_id]);
        $message = "Club registration approved successfully";
    } else {
        $updateClubSql = "UPDATE clubs 
            SET registration_status = 'rejected', rejection_reason = ?
            WHERE id = ?";
        $updateClubStmt = $pdo->prepare($updateClubSql);
        $updateClubStmt->execute([$rejection_reason, $club_id]);
        $message = "Club registration rejected";
    }

    $pdo->commit();

    echo json_encode([
        "status" => "success",
        "message" => $message
    ]);

} catch (PDOException $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    http_response_code(500);
    echo json_encode([
        "status" => "error", 
        "message" => "Failed to review registration: " . $e->getMessage()
    ]);
}
?>
