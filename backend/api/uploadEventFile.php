<?php
require_once 'api_init.php';
require_once '../config/db_connect.php';

if (!isset($_SESSION['club_id'])) {
    http_response_code(401); exit(json_encode(['status'=>'error','message'=>'Not logged in as club']));
}
$event_id = $_POST['event_id'];
if (!$event_id || !isset($_FILES['file'])) {
    http_response_code(400); exit(json_encode(['status'=>'error','message'=>'Missing event or file']));
}

// Save the file
$target_dir = "../uploads/";
$target_file = $target_dir . basename($_FILES['file']['name']);

if (move_uploaded_file($_FILES['file']['tmp_name'], $target_file)) {
    $sql = "INSERT INTO event_files (event_id, file_name, file_path) VALUES (?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$event_id, $_FILES['file']['name'], $target_file]);
    echo json_encode(['status'=>'success','message'=>'File uploaded']);
} else {
    http_response_code(500);
    echo json_encode(['status'=>'error','message'=>'Upload failed']);
}
?>
