<?php if ( ! isset($_POST['data']) ) return;

use knute\model\UsersModel;

$data = $_POST['data'];
$login = $data[0];
$pass = $data[1];

if ( empty($login) || empty($pass) )
    die('no data');

$user = UsersModel::getUser($login);

if( empty($user) )
    die("no login");

echo ( UsersModel::verifyPassword($pass, $user->pass) ) ? 'good' : 'no pass';
