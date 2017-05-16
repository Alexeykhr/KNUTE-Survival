<?php

$int_n = count(scandir($_SERVER['DOCUMENT_ROOT']."/public/img/lvl-maps"))-1;

$data = array();
if( isset( $_FILES[0] ) ){
    $error = false;
    $files = array();

    $uploaddir = $_SERVER['DOCUMENT_ROOT'].'/public/img/lvl-maps/'; // . - текущая папка где находится submit.php

    // Создадим папку если её нет

    if( ! is_dir( $uploaddir ) ) mkdir( $uploaddir, 0777 );

    // переместим файлы из временной директории в указанную // задаем файлу свое имя, сохраняя его разрешение
    foreach( $_FILES as $file ){
        if( move_uploaded_file( $file['tmp_name'], $uploaddir . 'lvl' . $int_n . "." .end(explode('.',basename($file['name']))) ) ){
            $files[] = realpath( $uploaddir . 'lvl' . $int_n . "." .end(explode('.',basename($file['name']))) );
        }
        else{
            $error = true;
        }
    }

    $data = $error ? array('error' => 'Ошибка загрузки файлов.') : array('files' => $files );

    echo json_encode( $data );
}