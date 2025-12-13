<?php
require_once 'api_init.php';
require_once '../config/db_connect.php';
if (!isset($_SESSION['club_id'])) { http_response_code(401); exit(); }
$club_id = $_SESSION['club_id'];

$event_id = $_GET['event_id'] ?? '';
if (!$event_id) { http_response_code(400); exit(); }

// Optionally, check if the event belongs to this club first!

header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename="event_participants.csv"');
$output = fopen('php://output', 'w');
fputcsv($output, ['UserID', 'Name', 'Email', 'Registration Time']);

$sql = "SELECT u.id, u.name, u.email, er.registered_at
        FROM event_registrations er
        JOIN users u ON er.student_id = u.id
        WHERE er.event_id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$event_id]);
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    fputcsv($output, $row);
}
fclose($output);
exit();
?>
