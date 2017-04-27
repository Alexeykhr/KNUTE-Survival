<?php /* Request input: public/index.php */

// If the user is an administrator and the cookie is enabled.
if ($inConstructor && $user->login === 'admin' )
    return require_once 'constructor/index.php';

require_once 'lvl1/index.php';
