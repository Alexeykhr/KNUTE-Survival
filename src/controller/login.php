<?php if ( ! isset($_POST['data']) ) return;

use knute\model\UsersModel;

$data = $_POST['data'];
$login = $data[0];
$pass = $data[1];

if ( empty($login) || empty($pass) )
    die('no data');

$user = UsersModel::getUserByLogin($login);

if( empty($user) )
    die("no auth");

if( UsersModel::verifyPassword($pass, $user->pass) )
    echo 'good/';
else
    die('no pass');

$key = $login . ',' . bin2hex( openssl_random_pseudo_bytes(15) );
echo $key;      //передаю ключ и записываю в кук через js

UsersModel::addToAuth($user->id, $key);
