<?php
require_once 'api_init.php';
require_once '../config/db_connect.php';

if (!isset($_SESSION['club_id'])) {
    http_response_code(401);
    exit(json_encode(['status'=>'error','message'=>'Not logged in as club']));
}

$data = json_decode(file_get_contents("php://input"), true);
$notice_id = $data['id'];
if (!$notice_id) {
    http_response_code(400);
    exit(json_encode(['status'=>'error','message'=>'Notice ID required']));
}

$club_id = $_SESSION['club_id'];
error_log("DeleteTry: club_id=$club_id, id=$notice_id");

$sql = "DELETE FROM notices WHERE id=? AND club_id=?"; // Secure!
$stmt = $pdo->prepare($sql);
if ($stmt->execute([$notice_id, $club_id])) {
    if ($stmt->rowCount() > 0) {
        echo json_encode(['status'=>'success','message'=>'Notice deleted']);
    } else {
        // Main cause: Notice not owned by current club, or wrong id
        echo json_encode(['status'=>'error','message'=>'Notice not found or not yours']);
    }
} else {
    http_response_code(500);
    echo json_encode(['status'=>'error','message'=>'Delete failed']);
}
?>
