<?php
require_once 'api_init.php';
require_once '../config/db_connect.php';
if (!isset($_SESSION['club_id'])) { http_response_code(401); exit(); }
$club_id = $_SESSION['club_id'];

header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename="club_events.csv"');
$output = fopen('php://output', 'w');
fputcsv($output, ['ID', 'Title', 'Date', 'Description']);

$sql = "SELECT id, title, event_date, description FROM events WHERE club_id=?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$club_id]);
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    fputcsv($output, $row);
}
fclose($output);
exit();
?>
