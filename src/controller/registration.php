<?php if ( ! isset($_POST['data']) ) return;

use knute\model\UsersModel;

$data = $_POST['data'];
$login = $data[0];
$pass = $data[1];

if ( empty($login) || empty($pass) )
    die('no data');

if ( ! empty(UsersModel::getUserByLogin($login)) )
    die('login exists');

$insertID = UsersModel::addUser($login, $pass);
echo '/';

$key = $login . ',' . bin2hex( openssl_random_pseudo_bytes(15) );
echo $key; // For cookie

UsersModel::addToAuth($insertID, $key);
