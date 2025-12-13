<?php
require_once 'api_init.php';
require_once '../config/db_connect.php';

if (!isset($_SESSION['club_id'])) {
    http_response_code(401);
    exit(json_encode(['status'=>'error','message'=>'Not logged in']));
}

$club_id = $_SESSION['club_id'];

// Text fields only
$data = json_decode(file_get_contents("php://input"), true);
$mission = $data['mission'] ?? null;
$vision = $data['vision'] ?? null;
$contact_info = $data['contact_info'] ?? null;

// Build SQL dynamically
$fields = [];
$params = [];

if ($mission !== null)      { $fields[] = "mission=?"; $params[] = $mission; }
if ($vision !== null)       { $fields[] = "vision=?"; $params[] = $vision; }
if ($contact_info !== null) { $fields[] = "contact_info=?"; $params[] = $contact_info; }

if (count($fields)) {
    $params[] = $club_id;
    $sql = "UPDATE clubs SET ".implode(", ", $fields)." WHERE id=?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
}

echo json_encode(['status'=>'success','message'=>'Profile updated']);
?>
