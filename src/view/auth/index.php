<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>Authorization</title>

    <link rel="stylesheet" href="/public/css/login.css">
    <script type="text/javascript" src="/public/js/jquery.js"></script>
    <script type="text/javascript" src="/public/js/auth/script.js"></script>
</head>
<body>

<div class="wrap">
    <div class="inner">
        <div class="container">
            <img src="/public/img/logo.png">

            <div id="auth_form">
                <p>Authorization</p>
                <input type="text" name="login" placeholder="Login">
                <input type="password" name="pass" placeholder="Password">
                <p class="error hidden"></p>
                <input type="submit" value="Sign In">
            </div>

            <div id="registration_form">
                <p>Registration</p>
                <input type="text" name="login" placeholder="Login">
                <input type="password" name="pass" placeholder="Password">
                <p class="error hidden"></p>
                <input type="submit" value="Sign Up">
            </div>
        </div>
    </div>
</div>

</body>
</html>
