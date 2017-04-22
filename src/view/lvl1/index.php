<!doctype html>
<html ng-app="game">
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
    <script src="/public/js/libs/jquery.js"></script>
    <script src="/public/js/game/game.js"></script>

    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Lvl 1</title>
    <link rel="stylesheet" href="/public/css/game.css">
</head>
<body ng-controller="mainCtrl" ng-keydown="keyDown($event)" ng-keyup="keyUp()" >
<!--    <input type="text" ng-model="go">-->
    <div id="display" >
        <div id="game" style="width:{{map.width}};height:{{map.height}};">
            <div id="player" class="{{player.rot}}" style="width:{{player.width}};height:{{player.height}};top:{{player.posY + player.gap}};left:{{player.posX + player.gap}};">
                <img id="go" ng-show="go" src="/public/img/player/go.gif" alt="">
                <img id="stop" ng-show="!go" src="/public/img/player/stop.png" alt="">
            </div>
            <div ng-repeat="col in map.collision" class="box" style="top:{{col.posY}};left:{{col.posX}};width:{{col.width}};height:{{col.height}};"></div>
        </div>
    </div>
</body>
</html>