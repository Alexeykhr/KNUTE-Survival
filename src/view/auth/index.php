<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>Authorization</title>

    <link rel="stylesheet" href="/public/css/login.css">

    <!-- Шрифт возможен для название проекта -->
    <link href="https://fonts.googleapis.com/css?family=Fontdiner+Swanky" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Quantico" rel="stylesheet">

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
                <p class="error hidden"></p>
            </div>

            <div id="registration_form">
                <h2>Registration</h2>
                <input type="text" name="login" placeholder="Login">
                <input type="password" name="pass" placeholder="Password">
                <input type="submit" value="Sign Up">
                <p class="error hidden"></p>
            </div>
        </div>
    </div>
</div>

<div id="particles-js"></div>
<script src="http://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
<script type="text/javascript" src="/public/js/auth/particles.js"></script>

</body>
</html>
