<?php

if ( $inConstructor && $user->login == 'admin' )
    require_once "constructor/index.php";
else
    require_once "lvl1/index.php";
