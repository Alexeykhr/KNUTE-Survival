<?php if ( ! isset($_POST['data']) ) return;

$data = $_POST['data'];
$login = $data[0];
$pass = $data[1];

if ( empty($login) || empty($pass) )
    die("no data");

echo \knute\model\UsersModel::addUser($login, $pass);
