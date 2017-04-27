<?php

use knute\model\UsersModel;

define('KNUTE_DIR', __DIR__ . '/../');

// Database connection.
require_once "../src/configs/db.php";

// If you do not have authorization cookies.
if ( empty($_COOKIE['logged']) )
	return require KNUTE_DIR . '/src/view/auth/index.php';

$auth = UsersModel::isAuth($_COOKIE['logged']);

// If the key is not found.
if ( is_null($auth) )
	return require KNUTE_DIR . '/src/view/auth/index.php';

$user = UsersModel::getUserById($auth->id);
$inConstructor = empty($_COOKIE['constructor']) ? false : $_COOKIE['constructor'];

require KNUTE_DIR . '/src/view/index.php';
