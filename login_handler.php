<?php
session_start();
require 'db.php';

if($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: login.html');
    exit;
}

if(isset($_SESSION['user_id'])) {
    header('Location: index.html');
    exit;
}

$user = trim($_POST['user'] ?? '');
$password = $_POST['password'] ?? '';

if($user === '' || $password === '') {
    header('Location: login.html?error=invalid');
    exit;
}

$stmt = $pdo->prepare('SELECT id, username, password_hash FROM users WHERE username = ? OR email = ?');
$stmt->execute([$user, $user]);
$row = $stmt->fetch();

if(!$row || !password_verify($password, $row['password_hash'])) {
    header('Location: login.html?error=invalid');
    exit;
}

session_regenerate_id(true);
$_SESSION['user_id'] = $row['id'];
$_SESSION['username'] = $row['username'];

header('Location: index.html');
exit;