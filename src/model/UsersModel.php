<?php

namespace knute\model;

class UsersModel
{
    const TABLE_USERS = 'users';

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
     * Verifies that a password matches a hash.
     *
     * @param string $pass
     * @param string $hash
     *
     * @return bool
     */
    public function verifyHash($pass, $hash)
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
    public function addUser($login, $pass)
    {
        return \QB::table(self::TABLE_USERS)->insert([
            'login' => $login,
            'pass'  => $this->getHash($pass)
        ]);
    }

    /**
     *
     */
    public function getUser($id)
    {

    }
}
