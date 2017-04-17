<?php if ( ! isset($_POST['data']) ) return;

$data = $_POST['data'];
$login = $data[0];
$pass = $data[1];

if ( empty($login) || empty($pass) )
    die("no data");

echo \knute\model\UsersModel::addUser($login, $pass);
echo "/";

$key = $login . ',' . bin2hex( openssl_random_pseudo_bytes(15) );
echo $key;      //передаю ключ и записываю в кук через js

$user = \knute\model\UsersModel::getUserByLogin($login);

\knute\model\UsersModel::addToAuth($key, $user->id);
