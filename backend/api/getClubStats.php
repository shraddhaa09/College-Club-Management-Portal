<?php
require_once 'api_init.php';
require_once '../config/db_connect.php';


if (!isset($_SESSION['club_id'])) { http_response_code(401); exit(); }
$club_id = $_SESSION['club_id'];

// Events per month (last 12 months)
$sql = "SELECT DATE_FORMAT(event_date, '%Y-%m') as month, COUNT(*) as count
        FROM events WHERE club_id = ? AND event_date >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
        GROUP BY month ORDER BY month";
$stmt = $pdo->prepare($sql);
$stmt->execute([$club_id]);
$events_monthly = $stmt->fetchAll();

// Most active role
$sql2 = "SELECT role, COUNT(*) as ct FROM memberships WHERE club_id=? GROUP BY role ORDER BY ct DESC LIMIT 1";
$stmt2 = $pdo->prepare($sql2);
$stmt2->execute([$club_id]);
$top_role = $stmt2->fetch();

echo json_encode([
    'status'=>'success',
    'events_monthly'=>$events_monthly,
    'most_active_role'=>$top_role['role'] ?? null
]);
?>
