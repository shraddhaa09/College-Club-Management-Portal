<?php
require_once __DIR__ . '/api_init.php';
require_once __DIR__ . '/../config/db_connect.php';

header("Content-Type: application/json; charset=utf-8");

try {
    // Get all members with all columns
    $sql = "SELECT id, name, email, department, role, status, joined 
            FROM members 
            WHERE status IN ('active', 'inactive', 'pending') 
            ORDER BY joined DESC";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $members = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "members" => $members
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Failed to fetch members: " . $e->getMessage()
    ]);
}
?>
