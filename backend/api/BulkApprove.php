<?php
require_once 'api_init.php';
require_once '../config/db_connect.php';
if (!isset($_SESSION['club_id'])) { http_response_code(401); exit(); }
$club_id = $_SESSION['club_id'];
$data = json_decode(file_get_contents("php://input"), true);
$ids = $data['membership_ids'] ?? [];
$action = $data['action'] ?? '';

if (!$ids || !in_array($action, ['approved', 'rejected'])) {
    http_response_code(400); exit(json_encode(['status'=>'error','msg'=>'Invalid params']));
}

$in  = str_repeat('?,', count($ids) - 1) . '?';
$sql = "UPDATE memberships SET status=? WHERE id IN ($in) AND club_id=?";
$stmt = $pdo->prepare($sql);
$params = array_merge([$action], $ids, [$club_id]);
$stmt->execute($params);

echo json_encode(['status'=>'success','updated'=>$stmt->rowCount()]);
?>
