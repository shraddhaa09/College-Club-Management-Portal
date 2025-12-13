<?php
require_once 'api_init.php';
require_once '../config/db_connect.php';
if (!isset($_SESSION['club_id'])) { http_response_code(401); exit(json_encode(['status'=>'error','message'=>'Not logged in as club'])); }
$club_id = $_SESSION['club_id'];
$sql = "SELECT action, details, created_at FROM club_activity_log WHERE club_id=? ORDER BY created_at DESC";
$stmt = $pdo->prepare($sql);
$stmt->execute([$club_id]);
$timeline = $stmt->fetchAll();
echo json_encode(['status'=>'success','timeline'=>$timeline]);
?>
