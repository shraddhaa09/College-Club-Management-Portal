<?php
require_once 'api_init.php';
require_once '../config/db_connect.php';

$sql = "SELECT e.id, e.title, e.event_date, e.description, c.name as club_name
        FROM events e
        JOIN clubs c ON e.club_id = c.id
        ORDER BY e.event_date ASC";
$stmt = $pdo->prepare($sql);
$stmt->execute();
$events = $stmt->fetchAll();

echo json_encode(['status'=>'success','events'=>$events]);
?>
