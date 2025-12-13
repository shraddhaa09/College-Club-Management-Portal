<?php
require_once 'api_init.php';
require_once '../config/db_connect.php';

if (!isset($_SESSION['club_id'])) {
    http_response_code(401);
    exit(json_encode(['status'=>'error','message'=>'Not logged in as club']));
}

$data = json_decode(file_get_contents("php://input"), true);
$event_id = $data['event_id'];

if (!$event_id) {
    http_response_code(400);
    exit(json_encode(['status'=>'error','message'=>'Event ID required']));
}

$club_id = $_SESSION['club_id'];

// Make sure this event belongs to the logged-in club!
$check_sql = "SELECT id FROM events WHERE id=? AND club_id=?";
$check_stmt = $pdo->prepare($check_sql);
$check_stmt->execute([$event_id, $club_id]);
if (!$check_stmt->fetch()) {
    http_response_code(403);
    exit(json_encode(['status'=>'error','message'=>'Not your event']));
}

// Get all registered students for this event:
$sql = "SELECT u.id, u.name, u.email, er.registered_at
        FROM event_registrations er
        JOIN users u ON er.student_id = u.id
        WHERE er.event_id = ?
        ORDER BY er.registered_at ASC";
$stmt = $pdo->prepare($sql);
$stmt->execute([$event_id]);
$participants = $stmt->fetchAll();

echo json_encode([
    'status'=>'success',
    'participants'=>$participants
]);
?>
