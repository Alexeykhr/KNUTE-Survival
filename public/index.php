<?php

use knute\model\UsersModel;

define('KNUTE_DIR', __DIR__ . '/../');

require_once "../src/configs/db.php";

if ( empty($_COOKIE['logged']) )
	return require KNUTE_DIR . '/src/view/auth/index.php';

$auth = UsersModel::isAuth($_COOKIE['logged']);

if ( is_null($auth) )
	return require KNUTE_DIR . '/src/view/auth/index.php';

$user = UsersModel::getUserForId($auth->id);
echo "<div>Hello, {$user->login}</div>";

require KNUTE_DIR . '/src/view/index.php';
