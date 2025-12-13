<?php
require_once __DIR__ . "/api_init.php";

session_unset();
session_destroy();

echo json_encode([
    "status" => "success",
    "message" => "Logged out successfully"
]);
?>
