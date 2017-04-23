<?php
/**
 * Created by PhpStorm.
 * User: kadey
 * Date: 23.04.2017
 * Time: 5:29
 */
$data = $_POST['data'];
$text = $data;

$filename = $_SERVER["DOCUMENT_ROOT"]."/public/store/xmls/lvl1.xml";

file_put_contents($filename, $text);