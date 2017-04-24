<?php if ( ! isset($_POST['data']) ) return;

use knute\model\UsersModel;

// Get the data from javascript.
$data = $_POST['data'];
$login = $data[0];
$pass = $data[1];

if ( empty($login) || empty($pass) )
    die('no data/');

$user = UsersModel::getUserByLogin($login);

if( empty($user) )
    die("no auth/");

if( ! UsersModel::verifyPassword($pass, $user->pass) )
    die('no pass/');

// Generate a random key.
$key = $login . ',' . bin2hex( openssl_random_pseudo_bytes(15) );
echo 'good/' . $key;

// Insert / update the key in the database.
UsersModel::addToAuth($user->id, $key);
