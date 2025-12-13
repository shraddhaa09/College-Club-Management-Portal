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

if (!$request_id) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Request ID required"]);
    exit;
}

try {
    $pdo->beginTransaction();

    // Get club_id before deleting
    $getSql = "SELECT club_id FROM club_registration_requests WHERE id = ?";
    $getStmt = $pdo->prepare($getSql);
    $getStmt->execute([$request_id]);
    $request = $getStmt->fetch(PDO::FETCH_ASSOC);

    if (!$request) {
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "Request not found"]);
        $pdo->rollBack();
        exit;
    }

    // Delete registration request
    $deleteSql = "DELETE FROM club_registration_requests WHERE id = ?";
    $deleteStmt = $pdo->prepare($deleteSql);
    $deleteStmt->execute([$request_id]);

    // Also delete the club if it was rejected
    $deleteClubSql = "DELETE FROM clubs WHERE id = ? AND registration_status = 'rejected'";
    $deleteClubStmt = $pdo->prepare($deleteClubSql);
    $deleteClubStmt->execute([$request['club_id']]);

    $pdo->commit();

    echo json_encode([
        "status" => "success",
        "message" => "Registration request deleted successfully"
    ]);

} catch (PDOException $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Failed to delete request: " . $e->getMessage()
    ]);
}
?>
