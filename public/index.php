<?php

require_once "../src/configs/db.php";

define('KNUTE_DIR', __DIR__ . '/../');

$auth = \knute\model\UsersModel::isAuth($_COOKIE['login']);

if($auth) {
    $user = \knute\model\UsersModel::getUserForID($auth->id);
    echo "<div>Hello $user->login</div>";                            // Если пользователь авторизован    => показываем контент
}else
    require KNUTE_DIR . '/src/view/login/index.html';   // Если пользователь не авторизован => показываем авторизацию/регистрацию

//создать таблицу для ключей
//require KNUTE_DIR . '/src/configs/db.php';
//$qqq = QB::query('CREATE TABLE IF NOT EXISTS auth(
//      id      INT (11)         NOT NULL,
//      in_key   VARCHAR (60)       NOT NULL,
//      PRIMARY KEY(ID)
//         )');
