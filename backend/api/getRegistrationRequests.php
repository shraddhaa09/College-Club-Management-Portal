<?php
// CORS headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'api_init.php';
require_once '../config/db_connect.php';
header("Content-Type: application/json; charset=utf-8");

// Check admin session
session_start();
if (!isset($_SESSION['admin_id'])) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Admin access required"]);
    exit;
}

try {
    $sql = "SELECT 
        r.id, r.club_id, r.club_name, r.club_email, r.president_name, 
        r.president_email, r.president_phone, r.description, r.category, 
        r.purpose, r.faculty_advisor, r.status, r.admin_notes, r.rejection_reason,
        r.submitted_at, r.reviewed_at, r.reviewed_by,
        a.name as reviewed_by_name
        FROM club_registration_requests r
        LEFT JOIN admin_users a ON r.reviewed_by = a.id
        ORDER BY 
            CASE r.status 
                WHEN 'pending' THEN 1 
                WHEN 'approved' THEN 2 
                WHEN 'rejected' THEN 3 
            END,
            r.submitted_at DESC";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    
    $requests = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        "status" => "success",
        "requests" => $requests
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed to fetch requests: " . $e->getMessage()]);
}
?>
