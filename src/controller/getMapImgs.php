<?php
/**
 * Created by PhpStorm.
 * User: kadey
 * Date: 29.04.2017
 * Time: 23:45
 */


$res = scandir($_SERVER['DOCUMENT_ROOT']."/public/img/lvl-maps");

echo json_encode($res);