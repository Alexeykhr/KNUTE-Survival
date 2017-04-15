<?php

namespace knute\model;

class UsersModel
{
    const TABLE_USERS = 'users';
    const TABLE_AUTH = 'auth';

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
        return \QB::table(self::TABLE_USERS)
            ->select('*')
            ->where('login', '=', $login)
            ->first();
    }

    public static function addToAuth($in_key, $id){
        \QB::table(self::TABLE_AUTH)->where('id', '=', $id)->delete(); //удаляем старуб запись авторизации пользователя

        //добавляем запись авторизации в таблицу auth
        return \QB::table(self::TABLE_AUTH)->insert([
            'id' => $id,
            'in_key'  => $in_key
        ]);
    }

    public static function isAuth($in_key){
        return \QB::table(self::TABLE_AUTH)
            ->select('*')
            ->where('in_key', '=', $in_key)
            ->first();
    }
}
