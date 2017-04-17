<?php

namespace knute\model;

class UsersModel
{
    const TABLE_USERS = 'users';
    const TABLE_AUTH  = 'auth';

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
     * Get user by auth.
     *
     * @param string $login
     *
     * @return object|null
     */
    public static function getUserByLogin($login)
    {
        return \QB::table(self::TABLE_USERS)
            ->select('*')
            ->where('login', '=', $login)
            ->first();
    }

    /**
     * Get user by id.
     *
     * @param int $id
     *
     * @return object|null
     */
    public static function getUserForId($id)
    {
        return \QB::table(self::TABLE_USERS)
            ->select('*')
            ->where('id', '=', $id)
            ->first();
    }

    /**
     * Update cookies.
     *
     * @param int    $id
     * @param string $in_key
     *
     * @return object|null
     */
    public static function addToAuth($id, $in_key)
    {
        if ( \QB::table('auth')->where('id', '=', $id)->get() )
            return \QB::table(self::TABLE_AUTH)->where('id', '=', $id)->update([
                'in_key' => $in_key
            ]);

        $_COOKIE['test'] = 123123123;

        return \QB::table(self::TABLE_AUTH)->insert([
            'id'     => $id,
            'in_key' => $in_key
        ]);
    }

    /**
     * Find the key in DB.
     *
     * @param string $in_key
     *
     * @return object|null
     */
    public static function isAuth($in_key)
    {
        return \QB::table(self::TABLE_AUTH)
            ->select('*')
            ->where('in_key', '=', $in_key)
            ->first();
    }
}
