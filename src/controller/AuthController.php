<?php

namespace knute\controller;

class AuthController
{
    public function __construct()
    {
        session_start();
    }
}
