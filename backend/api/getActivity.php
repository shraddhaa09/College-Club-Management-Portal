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

$timeline = [];

// Recent events
$stmt1 = $pdo->query("
    SELECT title as member, 'Event Created' as action, 'create' as type, event_date as timestamp
    FROM events
    ORDER BY event_date DESC
    LIMIT 3
");
while ($row = $stmt1->fetch(PDO::FETCH_ASSOC)) {
    $timeline[] = $row;
}

// Recent member joins
$stmt2 = $pdo->query("
    SELECT name as member, 'Joined Club' as action, 'join' as type, joined as timestamp
    FROM members
    WHERE joined IS NOT NULL
    ORDER BY joined DESC
    LIMIT 2
");
while ($row = $stmt2->fetch(PDO::FETCH_ASSOC)) {
    $timeline[] = $row;
}

// Sort by timestamp
usort($timeline, function($a, $b) {
    return strtotime($b['timestamp']) - strtotime($a['timestamp']);
});

echo json_encode([
    "status" => "success",
    "timeline" => array_slice($timeline, 0, 5)
]);
?>
