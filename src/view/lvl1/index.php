<!DOCTYPE html>
<html ng-app="game">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>Lvl 1</title>
<!--    <link rel="stylesheet" href="/public/css/game.css">-->

    <!-- New -->
    <link rel="stylesheet" href="/public/css/game/style.css">
    <!-- End -->

    <script src="/public/libs/js/jquery.js"></script>
    <script src="/public/libs/js/angular.min.js"></script>
    <script src="/public/js/game/game.js"></script>
</head>
<body ng-controller="mainCtrl" ng-keydown="keyDown($event)" ng-keyup="keyUp()" >

<div class="wrap">
    <header>
        <div class="cont">Hello,
            <?= $user->login; ?>
            <?php if ($user->login == 'admin') echo '<button id="constructor">Перейти к конструктору</button>' ?>
        </div>
    </header>

    <input id="update" type="button" ng-click="keyUp()" ng-show="false">

    <div id="display">
        <div id="game" style="width:{{map.width}}px;height:{{map.height}}px;">
            <div id="player" class="{{player.rot}}"style="width:{{player.width}}px;height:{{player.height}}px;top:{{player.posY + player.gap}}px;left:{{player.posX + player.gap}}px;">
                <img id="go" ng-show="go" src="/public/img/player/go.gif" alt="">
                <img id="stop" ng-show="!go" src="/public/img/player/stop.png" alt="">
            </div>
            <div ng-repeat="col in map.collision" class="box" style="top:{{col.posY}}px;left:{{col.posX}}px;width:{{col.width}}px;height:{{col.height}}px;"></div>
        </div>
    </div>
</div>

</body>
</html>