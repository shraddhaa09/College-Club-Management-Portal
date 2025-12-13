<?php
require_once 'api_init.php';
require_once '../config/db_connect.php';

header('Content-Type: application/json');

if (!isset($_SESSION['club_id'])) {
    http_response_code(401);
    echo json_encode(['status'=>'error','message'=>'Not logged in as club']);
    exit;
}

$club_id = $_SESSION['club_id'];

try {
    $sql = "SELECT id, title, content, posted_at FROM notices WHERE club_id = ? ORDER BY posted_at DESC";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$club_id]);
    $notices = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['status'=>'success','notices'=>$notices]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status'=>'error','message'=>'Database error: '.$e->getMessage()]);
}
?>
