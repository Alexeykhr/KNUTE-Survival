<?php

if( isset($_POST['action']) ) {

    require_once "../configs/config.php";

    try {
        include $_POST['action'] . '.php';
    } catch(Exception $ex){
        header("HTTP/1.1 404 Not Found");
    }
}
