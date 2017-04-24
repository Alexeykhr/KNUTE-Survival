<?php

$data = $_POST['data'];
$text = $data;

$filename = $_SERVER['DOCUMENT_ROOT'] . '/public/store/xmls/lvl1.xml';

file_put_contents($filename, $text);