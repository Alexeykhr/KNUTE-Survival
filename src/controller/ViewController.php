<?php

namespace knute\controller;

class ViewController
{
    public static function render($file)
    {
        require KNUTE_DIR . '/src/view/' . $file;
    }
}
