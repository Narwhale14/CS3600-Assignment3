<?php
require 'db.php';

if($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: signup.html');
    exit;
}

$username = trim($_POST['username'] ?? '');
$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';
$confirm_password = $_POST['confirm_password'] ?? '';

if(!preg_match('/^[a-zA-Z0-9_]+$/', $username) || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 8 || $password !== $confirm_password) {
    header('Location: signup.html?error=invalid');
    exit;
}

$hash = password_hash($password, PASSWORD_DEFAULT);

try {
    $stmt = $pdo->prepare('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)');
    $stmt->execute([$username, $email, $hash]);
} catch(PDOException $e) {
    if($e->errorInfo[1] == 1062) { // dupe key
        header('Location: signup.html?error=taken');
        exit;
    }
    throw $e;
}

header('Location: login.html?registered=1');
exit;