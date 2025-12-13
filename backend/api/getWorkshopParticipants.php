<?php
require_once 'api_init.php';
require_once '../config/db_connect.php';

if (!isset($_SESSION['club_id'])) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Not logged in as club"]);
    exit;
}
$club_id = $_SESSION['club_id'];

try {
    // ADD order by if you want, but DO NOT add LIMIT, and use fetchAll!
    $stmt = $pdo->prepare("SELECT * FROM workshops WHERE club_id = ?");
    $stmt->execute([$club_id]);
    $workshops = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "workshops" => $workshops,
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Failed to fetch workshops: " . $e->getMessage()
    ]);
}
?>
