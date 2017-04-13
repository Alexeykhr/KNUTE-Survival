<?php

namespace knute\controller;

class ViewController
{
    public static function render($file)
    {
        // . replace /

        require KNUTE_DIR . '/src/view/' . $file;
    }
}
