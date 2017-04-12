<?php
/**
 * Created by PhpStorm.
 * User: kadey
 * Date: 03.04.2017
 * Time: 23:12
 */

$db_host = "KNUTE-Survival";
$db_name = "project";
$db_user = "root";
$db_pass = "";

$db_conn = mysql_connect($db_host, $db_user, $db_pass);

if(!$db_conn) {
    echo "db conn error";
    exit;
}

$db_select = mysql_select_db($db_name, $db_conn);

if(!$db_select){
    echo "db select error";
    exit;
}

mysql_set_charset("UTF-8", $db_conn);
mysql_query("set names 'UTF-8'");

class DB
{
    public static function SendQuery($query)
    {
        return mysql_query($query);
    }

    public static function GetFetchArray($query)
    {
        $res = mysql_query($query);
        while ($row = mysql_fetch_array($res))
            $a[] = $row;

        return $a;
    }
}