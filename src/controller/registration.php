<?php

    $data = $_POST['data'];
    $login = $data[0];
    $pass = $data[1];

    if ( empty($login) || empty($pass) )
        die("no data");

    $add = array(
        'login' => $login,
        'pass'  => $pass
    );

    $query = QB::table('USERS')
        ->insert($add);

    echo $query;

//    $us = $query->get();
//    $true_pass = $us[0]->pass;
//
//    if ($true_pass == $pass) {
//        echo "good";
//    } else {
//        echo "no pass";
//    }