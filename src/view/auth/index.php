<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>Authorization</title>

    <link rel="stylesheet" href="/public/css/auth/login.css?1516">
    <link href="/public/fonts/Lato.ttf">
    <link href="/public/fonts/Roboto.ttf">

    <script type="text/javascript" src="/public/js/jquery.js"></script>
    <script type="text/javascript" src="/public/js/auth/script.js"></script>
</head>
<body>

<div class="wrap">
    <div class="inner">
        <div class="container">
            <img src="/public/img/logo.png">

            <div id="auth_form">
                <h2>Authorization</h2>
                <input type="text" name="login" placeholder="Login">
                <input type="password" name="pass" placeholder="Password">
                <input type="submit" value="Sign In">
                <span class="error hidden"></span>
            </div>

            <div id="registration_form">
                <h2>Registration</h2>
                <input type="text" name="login" placeholder="Login">
                <input type="password" name="pass" placeholder="Password">
                <input type="submit" value="Sign Up">
                <span class="error hidden"></span>
            </div>
        </div>
    </div>
</div>

<div id="particles-js"></div>
<script type="text/javascript" src="/public/js/libs/particles.min.js"></script>
<script type="text/javascript" src="/public/js/auth/particles.js"></script>

</body>
</html>
