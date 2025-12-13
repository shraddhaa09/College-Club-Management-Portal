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
require_once __DIR__ . '/../utils/token_utils.php';
require_once __DIR__ . '/../utils/auth.php';

$data = json_decode(file_get_contents("php://input"), true);

$name         = trim($data['name'] ?? '');
$email        = trim($data['club_email'] ?? '');
$password     = trim($data['club_password'] ?? '');
$description  = $data['description'] ?? '';
$mission      = $data['mission'] ?? '';
$vision       = $data['vision'] ?? '';
$contact_info = $data['contact_info'] ?? '';

// 1) Basic required fields
if ($name === '' || $email === '' || $password === '') {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Name, email and password are required']);
    exit;
}

// 2) Email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid email format']);
    exit;
}

// 3) Restrict domain to @vit (change to @vit.edu / @vit.ac.in if needed)
$allowedDomain = '@vit.edu';
if (substr($email, -strlen($allowedDomain)) !== $allowedDomain) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Only @vit.edu email addresses can register']);
    exit;
}

// 4) Password minimum length
if (strlen($password) < 8) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Password must be at least 8 characters long']);
    exit;
}

// 5) Check if club email already exists
$stmt = $pdo->prepare("SELECT id FROM clubs WHERE club_email = ?");
$stmt->execute([$email]);
if ($stmt->fetch()) {
    http_response_code(409);
    echo json_encode(['status' => 'error', 'message' => 'Email already registered']);
    exit;
}

// 6) Hash password
$hashedPassword = hashPassword($password);

// 7) Insert into DB
$stmt = $pdo->prepare("
    INSERT INTO clubs
    (name, description, created_at, club_email, club_password, mission, vision, contact_info)
    VALUES (?, ?, NOW(), ?, ?, ?, ?, ?)
");
$stmt->execute([$name, $description, $email, $hashedPassword, $mission, $vision, $contact_info]);
$club_id = (int)$pdo->lastInsertId();

// 8) Generate JWT token
$token = generateToken($club_id, 'club');

// 9) Send response
echo json_encode([
    'status'  => 'success',
    'message' => 'Club registered successfully',
    'token'   => $token,
    'club'    => [
        'id'          => $club_id,
        'name'        => $name,
        'email'       => $email,
        'description' => $description,
        'mission'     => $mission,
        'vision'      => $vision,
        'contact_info'=> $contact_info,
    ],
]);
