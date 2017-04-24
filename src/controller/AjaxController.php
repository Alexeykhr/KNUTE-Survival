<?php if( ! isset($_POST['action']) ) return;

require_once "../configs/db.php";

try {
    include $_POST['action'] . '.php';
} catch(Exception $ex) {
    header("HTTP/1.1 404 Not Found");
}
