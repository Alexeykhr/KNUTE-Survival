var module = angular.module('game', []);

module.controller('mainCtrl', ['$scope', '$http', function ($scope, $http) {
    $.when($.ajax({
        url: "/public/store/xmls/lvl1.xml",
        type: "POST"
    })).done(function(a1) {
        $scope.map = parseLvl(a1);
        console.log($scope.map);
    });
    $scope.player = new Player(110,110,110,110,10,"down");
    $scope.go = false;

    $scope.keyDown = function (event) {
        switch (event.which){
            case 87:    // W
                $scope.goes("up");
                break;
            case 83:    // S
                $scope.goes("down");
                break;
            case 65:    // A
                $scope.goes("left");
                break;
            case 68:    // D
                $scope.goes("right");
                break;
        }
    };
    $scope.keyUp = function () {
        $scope.go = false;
    };

    $scope.goes = function (vector) {
        $scope.go = true;
        switch (vector){
            case "up":
                $scope.player.posY -= $scope.player.speed;
                if($scope.touchPlMp())
                    $scope.player.posY += $scope.player.speed;
                $scope.player.rot = "up";
                break;
            case "down":
                $scope.player.posY += $scope.player.speed;
                if($scope.touchPlMp())
                    $scope.player.posY -= $scope.player.speed;
                $scope.player.rot = "down";
                break;
            case "left":
                $scope.player.posX -= $scope.player.speed;
                if($scope.touchPlMp())
                    $scope.player.posX += $scope.player.speed;
                $scope.player.rot = "left";
                break;
            case "right":
                $scope.player.posX += $scope.player.speed;
                if($scope.touchPlMp())
                    $scope.player.posX -= $scope.player.speed;
                $scope.player.rot = "right";
                break;
        }
    };

    $scope.touchObj = function (obj1, obj2) {

        var gap = 40;

        return !(Number(obj1.posY) + Number(obj1.height) < Number(obj2.posY)||
        Number(obj1.posX) + Number(obj1.width) < Number(obj2.posX) ||
        Number(obj1.posY) + gap > Number(obj2.posY) + Number(obj2.height)||
        Number(obj1.posX) + gap > Number(obj2.posX) + Number(obj2.width));

    };

    $scope.touchPlMp = function () {
        for(var col in $scope.map.collision)
            if($scope.touchObj($scope.player, $scope.map.collision[col]))
                return true;
        return false;
    };

    $scope.$watch('player.posY', function () {
        var scrollTop = $scope.player.posY - $('#display').height()/2 + $scope.player.height;
        $('#display').animate({ scrollTop:  scrollTop}, 0);
    });

    $scope.$watch('player.posX', function () {
        var scrollLeft = $scope.player.posX - $('#display').width()/2 + $scope.player.width;
        $('#display').animate({ scrollLeft: scrollLeft }, 0);
    });
}]);

function Player(posX, posY, width, height, speed, rot) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.gap = 20;
    this.speed = speed;
    this.rot = rot;
}
function parseLvl(xml) {
    var arr = {};
    arr.collision = [];
    $(xml).find("collision").each(function(idx, v) {
        arr.collision[idx] = {};
        $(v).find("posx").each(function( i , vi) {
            arr.collision[idx].posX = $(vi).text();
        });
        $(v).find("posy").each(function( i , vi) {
            arr.collision[idx].posY = $(vi).text();
        });
        $(v).find("width").each(function( i , vi) {
            arr.collision[idx].width = $(vi).text();
        });
        $(v).find("height").each(function( i , vi) {
            arr.collision[idx].height= $(vi).text();
        });
    });
    arr.width = $(xml).find("width")[0].innerHTML;
    arr.height = $(xml).find("height")[0].innerHTML;
    return arr;
}
