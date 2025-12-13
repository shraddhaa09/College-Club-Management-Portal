<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit();

require_once __DIR__ . '/../config/db_connect.php';
require_once __DIR__ . '/../utils/token_utils.php';

// JWT authentication
$headers = getallheaders();
if (!isset($headers['Authorization'])) {
    http_response_code(401);
    exit(json_encode(['status'=>'error','message'=>'No token provided']));
}

$token = str_replace('Bearer ', '', $headers['Authorization']);
$decoded = verifyToken($token);
if (!$decoded) {
    http_response_code(401);
    exit(json_encode(['status'=>'error','message'=>'Invalid or expired token']));
}

$club_id = $decoded['user_id']; // your JWT should contain user_id as club_id

try {
    // Total events
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM events WHERE club_id = ?");
    $stmt->execute([$club_id]);
    $totalEvents = (int)$stmt->fetchColumn();

    // Average attendance
    $stmt = $pdo->prepare("
        SELECT AVG(ea.attendee_count) AS avg_attendance
        FROM event_attendance ea
        JOIN events e ON ea.event_id = e.id
        WHERE e.club_id = ?
    ");
    $stmt->execute([$club_id]);
    $avgAttendance = round($stmt->fetchColumn() ?? 0);

    // Last 5 events
    $stmt = $pdo->prepare("
        SELECT e.title AS event, ea.attendee_count AS attendance
        FROM event_attendance ea
        JOIN events e ON ea.event_id = e.id
        WHERE e.club_id = ?
        ORDER BY e.event_date DESC
        LIMIT 5
    ");
    $stmt->execute([$club_id]);
    $eventAttendance = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Member growth trend (current year)
    $stmt = $pdo->prepare("
        SELECT DATE_FORMAT(joined, '%b') AS month, COUNT(*) AS members
        FROM members
        WHERE club_id = ? AND joined IS NOT NULL AND YEAR(joined) = YEAR(CURDATE())
        GROUP BY MONTH(joined)
        ORDER BY MONTH(joined)
    ");
    $stmt->execute([$club_id]);
    $memberGrowthData = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Growth %
    $growthPercent = "+0%";
    if (count($memberGrowthData) > 1) {
        $first = $memberGrowthData[0]['members'];
        $last = $memberGrowthData[count($memberGrowthData)-1]['members'];
        if ($first > 0) {
            $growthPercent = "+" . round((($last-$first)/$first)*100) . "%";
        }
    }

    echo json_encode([
        'status' => 'success',
        'totalEvents' => $totalEvents,
        'avgAttendance' => $avgAttendance,
        'eventAttendance' => $eventAttendance,
        'memberGrowthData' => $memberGrowthData,
        'memberGrowthPercent' => $growthPercent
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status'=>'error',
        'message'=>'Database error: '.$e->getMessage()
    ]);
}
?>
