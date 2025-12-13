<?php
// backend/config/db_connect.php
require_once __DIR__ . '/config.php'; // contains $DB_HOST, $DB_NAME, $DB_USER, $DB_PASS

try {
    $dsn = "mysql:host={$DB_HOST};dbname={$DB_NAME};charset=utf8mb4";
    $pdo = new PDO($dsn, $DB_USER, $DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false
    ]);
} catch (PDOException $e) {
    echo json_encode(['status'=>'error','message'=>'DB error: '.$e->getMessage()]);
    exit;
}
?>
