<?php
// backend/utils/token_utils.php

require_once 'C:/xampp/htdocs/cllgclub/backend/vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

const SECRET_KEY = "your_super_secret_key_change_this!"; // Set your actual secret here

function generateToken($userId, $role) {
    $payload = [
        'user_id' => $userId,
        'role'    => $role,
        'iat'     => time(),
        'exp'     => time() + (60 * 60 * 24) // 24 hours
    ];
    return JWT::encode($payload, SECRET_KEY, 'HS256');
}

function verifyToken($token) {
    try {
        $decoded = JWT::decode($token, new Key(SECRET_KEY, 'HS256'));
        return (array)$decoded;
    } catch (Exception $e) {
        return false;
    }
}
?>
