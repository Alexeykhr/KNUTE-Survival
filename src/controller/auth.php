<?php
//include('/config.php');
//нужно получить доступ к классу QB бикос он его не видит
//подумай как

session_start();

if ( ! isset($_SESSION['login']) ) {
    $data = json_decode($_POST['data']);
    $login = $data[0];
    $pass = $data[1];

//    if ( empty($login) || empty($pass) )
//        die("no data");

    $query = QB::table('USERS')
        ->select('*')
        ->where("login = '$login'");

    $us = $query->get();

//    if ( empty($us['pass']) )
//        die("no login");

    if ($us['pass'] == $pass) {
        echo "good";
    } else {
        echo "no pass";
    }

    return $us['pass'] === $pass;
}
