<?php
require_once 'api_init.php';
require_once '../config/db_connect.php';
if (!isset($_SESSION['club_id'])) { http_response_code(401); exit(); }
$club_id = $_SESSION['club_id'];

header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename="club_members.csv"');
$output = fopen('php://output', 'w');
fputcsv($output, ['ID', 'Name', 'Email', 'Role', 'JoinedAt']);

$sql = "SELECT u.id, u.name, u.email, m.role, m.joined_at
        FROM memberships m
        JOIN users u ON m.user_id = u.id
        WHERE m.club_id=? AND m.status = 'approved'";
$stmt = $pdo->prepare($sql);
$stmt->execute([$club_id]);
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    fputcsv($output, $row);
}
fclose($output);
exit();
?>
