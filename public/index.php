<?php

define('KNUTE_DIR', __DIR__ . '/../');

//require KNUTE_DIR . '/src/view/login/index.html';

// Для генерации рандомных символов
// $random = $login . ',' . bin2hex( openssl_random_pseudo_bytes(15) );

// Если пользователь не авторизован => показываем авторизацию/регистрацию
// Если пользователь авторизован    => показываем контент
