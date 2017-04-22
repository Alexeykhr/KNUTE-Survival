<?php

// Undefined variable: inConstr
// Временно
$inConstr = true;

if ($inConstr)
    return require_once "constructor/index.php";

require_once "lvl1/index.php";
