<?php
require_once 'api_init.php';
require_once '../config/db_connect.php';  // Database connection

header('Content-Type: application/json');

// ✅ Check if club is logged in
if (!isset($_SESSION['club_id'])) {
    http_response_code(401);
    echo json_encode([
        'status' => 'error',
        'message' => 'Not logged in as a club'
    ]);
    exit;
}

// ✅ Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['title']) || !isset($data['content'])) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid or missing input data'
    ]);
    exit;
}

// ✅ Sanitize and validate input
$title = trim($data['title']);
$content = trim($data['content']);

if ($title === '' || $content === '') {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Title and content are required'
    ]);
    exit;
}

$club_id = $_SESSION['club_id'];

// ✅ Prepare and execute SQL safely
try {
    $sql = "INSERT INTO notices (club_id, title, content) VALUES (?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$club_id, $title, $content]);

    echo json_encode([
        'status' => 'success',
        'message' => 'Notice added successfully'
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
?>
