<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../config/db_connect.php';
require_once __DIR__ . '/../utils/auth.php';
require_once __DIR__ . '/../utils/token_utils.php';

$data = json_decode(file_get_contents("php://input"), true);

$club_email    = trim($data['club_email'] ?? '');
$club_password = trim($data['club_password'] ?? '');

// 1) Required fields
if ($club_email === '' || $club_password === '') {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Email and password are required']);
    exit;
}

// 2) Email format
if (!filter_var($club_email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid email format']);
    exit;
}

// 3) Restrict to @vit.edu
$allowedDomain = '@vit.edu';
if (substr($club_email, -strlen($allowedDomain)) !== $allowedDomain) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Only @vit.edu email addresses can log in']);
    exit;
}

try {
    // 4) Fetch club by email (prepared statement already prevents SQL injection)
    $stmt = $pdo->prepare("SELECT * FROM clubs WHERE club_email = ?");
    $stmt->execute([$club_email]);
    $club = $stmt->fetch(PDO::FETCH_ASSOC);

    // 5) Verify password
    if ($club && verifyPassword($club_password, $club['club_password'])) {

        // 6) Generate JWT (payload should include user_id + role)
        $token = generateToken($club['id'], 'club');

        http_response_code(200);
        echo json_encode([
            'status'  => 'success',
            'message' => 'Login successful',
            'token'   => $token,
            'club'    => [
                'id'          => (int)$club['id'],
                'name'        => $club['name'],
                'description' => $club['description'],
                'mission'     => $club['mission'],
                'email'       => $club['club_email'],
            ]
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['status' => 'error', 'message' => 'Invalid email or password']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Server error: ' . $e->getMessage()]);
}
?>
