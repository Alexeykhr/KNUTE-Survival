<?php

use knute\model\UsersModel;

define('KNUTE_DIR', __DIR__ . '/../');

require_once "../src/configs/db.php";

if ( empty($_COOKIE['logged']) )
	return require KNUTE_DIR . '/src/view/auth/index.php';

$auth = UsersModel::isAuth($_COOKIE['logged']);
$inConstructor = !empty($_COOKIE['constructor']) ?? null;

if ( is_null($auth) )
	return require KNUTE_DIR . '/src/view/auth/index.php';

$user = UsersModel::getUserForId($auth->id);

// Необходимо перенести в html код (View), т.к. крашится.
echo "<div class='header'><div class='cont'>Hello, {$user->login}"
    . ($user->login == "admin" ? "<button id='constructor'>Перейти к конструктору</button>" : "")
    . "</div></div>";

require KNUTE_DIR . '/src/view/index.php';
