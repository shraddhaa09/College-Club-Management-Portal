<?php
// --------------------
// Error display (only during development)
// --------------------
ini_set('display_errors', 1);
error_reporting(E_ALL);

// --------------------
// CORS
// --------------------
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// --------------------
// DB & JWT
// --------------------
require_once __DIR__ . '/../config/db_connect.php';
require_once __DIR__ . '/../utils/token_utils.php';

// --------------------
// Read Authorization Token
// --------------------
$headers = getallheaders();
$auth = "";

// Support both capital & lowercase headers
if (isset($headers["Authorization"])) {
    $auth = $headers["Authorization"];
} elseif (isset($headers["authorization"])) {
    $auth = $headers["authorization"];
}

if (!$auth) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "No token provided"]);
    exit();
}

$token = str_replace("Bearer ", "", $auth);
$user  = verifyToken($token);

// Validate token
if (!$user || $user["role"] !== "club") {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Invalid or expired token"]);
    exit();
}

$club_id = (int)$user["user_id"];

try {
    // --------------------
    // Total active members
    // --------------------
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM members WHERE club_id = ? AND status = 'active'");
    $stmt->execute([$club_id]);
    $totalMembers = (int)$stmt->fetchColumn();

    // --------------------
    // Total events
    // --------------------
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM events WHERE club_id = ?");
    $stmt->execute([$club_id]);
    $totalEvents = (int)$stmt->fetchColumn();

    // --------------------
    // Department distribution
    // --------------------
    $stmt = $pdo->prepare("
        SELECT department AS name, COUNT(*) AS value
        FROM members
        WHERE club_id = ?
        GROUP BY department
    ");
    $stmt->execute([$club_id]);
    $deptDistribution = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // --------------------
    // Upcoming events
    // --------------------
    $stmt = $pdo->prepare("
        SELECT
            e.id,
            e.title,
            e.event_date,
            e.time,
            e.venue AS location,
            COALESCE(ea.attendee_count,0) AS attendees,
            e.club_id,
            c.name AS clubName,
            CASE WHEN e.club_id = ? THEN 1 ELSE 0 END AS isOwnClub
        FROM events e
        JOIN clubs c ON e.club_id = c.id
        LEFT JOIN event_attendance ea ON e.id = ea.event_id
        WHERE e.event_date >= CURDATE()
        ORDER BY e.event_date ASC
        LIMIT 20
    ");
    $stmt->execute([$club_id]);
    $upcomingEvents = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // --------------------
    // Recent activity
    // --------------------
    $stmt = $pdo->prepare("
        SELECT name AS member, 'Joined Club' AS action, 'join' AS type, joined AS time
        FROM members
        WHERE club_id = ? AND joined IS NOT NULL
        ORDER BY joined DESC
        LIMIT 5
    ");
    $stmt->execute([$club_id]);
    $recentActivity = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // --------------------
    // Average attendance
    // --------------------
    $stmt = $pdo->prepare("
        SELECT AVG(ea.attendee_count)
        FROM event_attendance ea
        JOIN events e ON ea.event_id = e.id
        WHERE e.club_id = ?
    ");
    $stmt->execute([$club_id]);
    $avg = $stmt->fetchColumn();
    $avgAttendance = $avg ? round($avg) : 0;

    // --------------------
    // Recent memories (photos)
//  Requires event_photos table: id, club_id, file_path, caption, uploaded_at
    // --------------------
    $stmt = $pdo->prepare("
        SELECT id, file_path, caption, uploaded_at
        FROM event_photos
        WHERE club_id = ?
        ORDER BY uploaded_at DESC
        LIMIT 10
    ");
    $stmt->execute([$club_id]);
    $memories = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // --------------------
    // Send response
    // --------------------
    echo json_encode([
        "status"                 => "success",
        "clubMembers"            => $totalMembers,
        "clubEvents"             => $totalEvents,
        "avgAttendance"          => $avgAttendance,
        // removed: memberGrowth
        // removed: eventAttendance
        "departmentDistribution" => $deptDistribution,
        "upcomingEvents"         => $upcomingEvents,
        "recentActivity"         => $recentActivity,
        "memories"               => $memories,
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status"  => "error",
        "message" => "Failed to fetch dashboard data: " . $e->getMessage()
    ]);
}
?>
