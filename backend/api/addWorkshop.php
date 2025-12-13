<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit();

require_once __DIR__ . '/../config/db_connect.php';
require_once __DIR__ . '/../utils/token_utils.php';

// JWT Auth
$headers = getallheaders();
if (!isset($headers['Authorization'])) {
    http_response_code(401);
    exit(json_encode(['status'=>'error','message'=>'No token provided']));
}

$token = str_replace('Bearer ', '', $headers['Authorization']);
$decoded = verifyToken($token);
if (!$decoded) {
    http_response_code(401);
    exit(json_encode(['status'=>'error','message'=>'Invalid or expired token']));
}

$club_id = $decoded['user_id'];
$data = json_decode(file_get_contents("php://input"), true);

$title = trim($data["title"] ?? "");
$description = trim($data["description"] ?? "");
$date = trim($data["date"] ?? "");
$venue = trim($data["venue"] ?? "");
$duration = trim($data["duration"] ?? "");
$seats = intval($data["seats"] ?? 0);
$enrolled = intval($data["enrolled"] ?? 0);
$type = trim($data["type"] ?? "Workshop");

// Validate type
$ALLOWED_TYPES = ["Workshop", "Hackathon", "Competition", "Event"];
if (!in_array($type, $ALLOWED_TYPES)) {
    http_response_code(400);
    exit(json_encode(["status"=>"error", "message"=>"Invalid type"]));
}

if (!$title || !$date || !$duration || !$seats) {
    http_response_code(400);
    exit(json_encode(["status"=>"error", "message"=>"Missing required fields"]));
}

// Prevent duplicate event name for same club on same date/time
$check = $pdo->prepare("SELECT id FROM workshops WHERE club_id = ? AND title = ? AND date = ? AND duration = ?");
$check->execute([$club_id, $title, $date, $duration]);
if ($check->rowCount() > 0) {
    http_response_code(400);
    exit(json_encode(["status"=>"error", "message"=>"Duplicate event for this club on the same date/time"]));
}

// Prevent overlap for any club (same date and time)
// Check if ANY club has an event/workshop/hackathon/competition on that date & duration (cross-club check)
$conflict = $pdo->prepare("SELECT id, club_id, title, type FROM workshops WHERE date = ? AND duration = ?");
$conflict->execute([$date, $duration]);
if ($conflict->rowCount() > 0) {
    $existing = $conflict->fetch(PDO::FETCH_ASSOC);
    http_response_code(400);
    exit(json_encode([
        "status"=>"error",
        "message"=>"There is already a {$existing['type']} named '{$existing['title']}' scheduled by another club at this date and time."
    ]));
}


try {
    $stmt = $pdo->prepare("
        INSERT INTO workshops (club_id, title, description, date, venue, duration, seats, enrolled, type)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([$club_id, $title, $description, $date, $venue, $duration, $seats, $enrolled, $type]);
    echo json_encode(["status"=>"success", "id"=>$pdo->lastInsertId()]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status"=>"error", "message"=>"Failed to add workshop"]);
}
?>
