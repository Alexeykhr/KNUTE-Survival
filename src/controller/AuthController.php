<?php

namespace knute\controller;

class AuthController
{
    const TABLE_USERS = 'users';

    public function __construct()
    {
        session_start();
    }

    /**
     * Get a hash of the password with BCRYPT.
     *
     * @param string $pass
     *
     * @return bool|string
     */
    public function getHash($pass)
    {
        return password_hash($pass, PASSWORD_BCRYPT);
    }

    /**
     * Add a new user to database.
     *
     * @param string $login
     * @param string $pass
     *
     * @return int Insert ID
     */
    public function addUser($login, $pass)
    {
        return \QB::table(self::TABLE_USERS)->insert([
            'login' => $login,
            'pass'  => $this->getHash($pass)
        ]);
    }
}
