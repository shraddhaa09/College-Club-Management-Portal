<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit();

require_once __DIR__.'/../config/db_connect.php';

// Total events
$events_stmt = $pdo->query("SELECT COUNT(*) as total_events FROM events");
$total_events = $events_stmt->fetch()['total_events'];

// Event attendance
$attendance_stmt = $pdo->query("SELECT title as event, attendance FROM events ORDER BY event_date ASC");
$event_attendance = $attendance_stmt->fetchAll(PDO::FETCH_ASSOC);

// Demo member monthly growth (replace with actual logic if you have members table)
$member_growth = [
  ["month" => "Jan", "members" => 250],
  ["month" => "Feb", "members" => 280],
  ["month" => "Mar", "members" => 290],
  ["month" => "Apr", "members" => 310],
  ["month" => "May", "members" => 324]
];

// Average attendance
$avg_query = $pdo->query("SELECT AVG(attendance) as avg_attendance FROM events");
$avg_attendance = round($avg_query->fetch()['avg_attendance']);

echo json_encode([
  "total_events" => $total_events,
  "member_growth" => $member_growth, // Replace with actual SQL if available
  "event_attendance" => $event_attendance,
  "avg_attendance" => $avg_attendance
]);
