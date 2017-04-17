<?php

use knute\model\UsersModel;

define('KNUTE_DIR', __DIR__ . '/../');

require_once "../src/configs/db.php";

if ( empty($_COOKIE['login']) )
	return require KNUTE_DIR . '/src/view/login/index.html';

$auth = UsersModel::isAuth($_COOKIE['login']);

if ( is_null($auth) )
	return require KNUTE_DIR . '/src/view/login/index.html';

$user = UsersModel::getUserForID($auth->id);
echo "<div>Hello, {$user->login}</div>";
