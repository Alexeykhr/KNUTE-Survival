<?php

/*
 * CREATE A NEW TABLE!!! Pass => VARCHAR(60)
 */

require_once '../../vendor/autoload.php';

$config = [
    'driver'    => 'mysql', // Db driver
    'host'      => 'localhost',
    'database'  => 'KNUTE-Survival',
    'username'  => 'root',
    'password'  => '',
    'charset'   => 'utf8', // Optional
    'collation' => 'utf8_unicode_ci', // Optional
    'prefix'    => '', // Table prefix, optional
];

new \Pixie\Connection('mysql', $config, 'QB');
