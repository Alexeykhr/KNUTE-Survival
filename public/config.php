<?php

/*
 * CREATE A NEW TABLE!!! Pass => VARCHAR(60)
 */

//QB::query('CREATE TABLE IF NOT EXISTS USERS(
//  id      INT AUTO_INCREMENT NOT NULL,
//  login   VARCHAR (30)       NOT NULL,
//  pass    VARCHAR (60)      NOT NULL,
//  money   INT     (11)    DEFAULT 10,
//  PRIMARY KEY(ID)
// )');

define('KNUTE_DIR', __DIR__ . '/../');

require_once KNUTE_DIR . '/vendor/autoload.php';

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
