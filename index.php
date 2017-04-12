<?php

include('config.php');

$query = QB::table('USERS')
    ->select('*');

var_dump($query->get());
