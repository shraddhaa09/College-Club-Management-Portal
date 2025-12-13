<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../config/db_connect.php';

session_start();
$club_id = $_SESSION['club_id'] ?? 2;

// Member count
$memberCount = $pdo->query("SELECT COUNT(*) FROM members WHERE status = 'active'")->fetchColumn();

// Events per month (current year)
$eventsMonthly = [];
$stmt = $pdo->query("
    SELECT DATE_FORMAT(event_date, '%b') AS month, COUNT(*) AS count
    FROM events
    WHERE YEAR(event_date) = YEAR(CURDATE())
    GROUP BY MONTH(event_date)
    ORDER BY MIN(event_date)
");
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $eventsMonthly[] = $row;
}

echo json_encode([
    "status" => "success",
    "members_count" => (int)$memberCount,
    "events_monthly" => $eventsMonthly
]);
?>
