<?php

namespace knute\model;

class UsersModel
{
    const TABLE_USERS = 'users';

    /**
     * Verifies that a password matches a hash.
     *
     * @param string $pass
     * @param string $hash
     *
     * @return bool
     */
    public static function verifyPassword($pass, $hash)
    {
        return password_verify($pass, $hash);
    }

    /**
     * Add a new user to database.
     *
     * @param string $login
     * @param string $pass
     *
     * @return int Insert ID
     */
    public static function addUser($login, $pass)
    {
        return \QB::table(self::TABLE_USERS)->insert([
            'login' => $login,
            'pass'  => password_hash($pass, PASSWORD_DEFAULT)
        ]);
    }

    /**
     * Get user by login.
     *
     * @param string $login
     *
     * @return object
     */
    public static function getUser($login)
    {
        return \QB::table('USERS')
            ->select('pass')
            ->where('login', '=', $login)
            ->first();
    }
}
