<?php

$data = $_POST['data'];
$text = $data;

$filename = $_SERVER["DOCUMENT_ROOT"] . '/public/store/xmls/lvl1.xml';

$f = fopen($filename, 'a');
fwrite($f, $text);
fclose($f);
