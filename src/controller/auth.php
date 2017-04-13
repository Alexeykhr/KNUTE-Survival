<?php

    $data = $_POST['data'];
    $login = $data[0];
    $pass = $data[1];

    if ( empty($login) || empty($pass) )
        die("no data");

    $query = QB::table('USERS')
        ->select('pass')
        ->where("login", "=", $login);

    $us = $query->get();
    $true_pass = $us[0]->pass;

    if(!$us)
        die("no login");

    if ($true_pass == $pass) {
        echo "good";
    } else {
        echo "no pass";
    }