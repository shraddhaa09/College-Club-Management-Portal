<?php
require_once 'api_init.php';
require_once '../config/db_connect.php';

if (!isset($_SESSION['club_id'])) {
    http_response_code(401);
    exit(json_encode(['status'=>'error','message'=>'Not logged in as club']));
}

$data = json_decode(file_get_contents("php://input"), true);

$notice_id = $data['id'];
$title = trim($data['title']);
$content = trim($data['content']);

if (!$notice_id || !$title || !$content) {
    http_response_code(400);
    exit(json_encode(['status'=>'error','message'=>'ID, title, and content required']));
}

$club_id = $_SESSION['club_id'];

$sql = "UPDATE notices SET title=?, content=? WHERE id=? AND club_id=?";
$stmt = $pdo->prepare($sql);

if ($stmt->execute([$title, $content, $notice_id, $club_id])) {
    if ($stmt->rowCount() > 0) {
        echo json_encode(['status'=>'success','message'=>'Notice updated']);
    } else {
        echo json_encode(['status'=>'error','message'=>'Notice not found or not yours']);
    }
} else {
    http_response_code(500);
    echo json_encode(['status'=>'error','message'=>'Update failed']);
}
?>
