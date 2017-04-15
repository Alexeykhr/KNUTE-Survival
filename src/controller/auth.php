<?php if ( ! isset($_POST['data']) ) return;

use knute\model\UsersModel;

$data = $_POST['data'];
$login = $data[0];
$pass = $data[1];

if ( empty($login) || empty($pass) )
    die('no data');

// If strlen $pass and $login..

$user = UsersModel::getUser($login);

if( empty($user) )
    die("no login");

if( UsersModel::verifyPassword($pass, $user->pass) )
    echo 'good/';
else
    die('no pass');

$key = $login . ',' . bin2hex( openssl_random_pseudo_bytes(15) );
echo $key;      //передаю ключ и записываю в кук через js

UsersModel::addToAuth($key, $user->id);
