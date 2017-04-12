<?php
/**
 * Created by PhpStorm.
 * User: kadey
 * Date: 12.04.2017
 * Time: 21:25
 */

//QB::query('CREATE TABLE IF NOT EXISTS USERS(
//  id      INT AUTO_INCREMENT NOT NULL,
//  login   VARCHAR (30)       NOT NULL,
//  pass    VARCHAR (30)      NOT NULL,
//  money   INT     (11)    DEFAULT 10,
//  PRIMARY KEY(ID)
// )');

require_once __DIR__ . '/vendor/autoload.php';

$config = array(
    'driver'    => 'mysql', // Db driver
    'host'      => 'localhost',
    'database'  => 'KNUTE-Survival',
    'username'  => 'root',
    'password'  => '',
    'charset'   => 'utf8', // Optional
    'collation' => 'utf8_unicode_ci', // Optional
    'prefix'    => '', // Table prefix, optional
);

new \Pixie\Connection('mysql', $config, 'QB');
