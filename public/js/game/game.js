var module = angular.module('game', []);

module.controller('mainCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.changelvl = 0;
    $scope.map = [];
    $scope.player = new Player(250,170,50,50,10,"down");
    $scope.go = false;

    $.when($.ajax({
        url: "/public/store/xmls/lvl1.xml",
        type: "POST"
    })).done(function(a1) {
        $scope.lvls = parseLvl(a1);
        $scope.map = $scope.lvls.lvls[$scope.changelvl];
        console.log($scope.lvls, $scope.map);
        updateScope();
    });

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

    $scope.$watch('changelvl', function (newValue) {
        console.log(newValue);
        if($scope.lvls!=undefined)
            $scope.map = $scope.lvls.lvls[$scope.changelvl];
    });

}]);

$(document).ready(function () { //перейти в конструктор
    $("#constructor").on("click", function () {
        document.cookie = "constructor=true; path=/;";
        location.reload();
    });
});

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
    arr.lvls = [];
    $(xml).find("lvl").each(function (lvl_i, lvl){
        arr.lvls[lvl_i] = {};
        arr.lvls[lvl_i].collision = [];
        $(lvl).find("collision").each(function (idx, v) {
            arr.lvls[lvl_i].collision[idx] = {};
            $(v).find("posX").each(function (i, vi) {
                arr.lvls[lvl_i].collision[idx].posX = Number($(vi).text());
            });
            $(v).find("posY").each(function (i, vi) {
                arr.lvls[lvl_i].collision[idx].posY = Number($(vi).text());
            });
            $(v).find("width").each(function (i, vi) {
                arr.lvls[lvl_i].collision[idx].width = Number($(vi).text());
            });
            $(v).find("height").each(function (i, vi) {
                arr.lvls[lvl_i].collision[idx].height = Number($(vi).text());
            });
        });
        arr.lvls[lvl_i].width = $(lvl).find("lvl > width").text();
        arr.lvls[lvl_i].height = $(lvl).find("lvl > height").text();
        arr.lvls[lvl_i].name = $(lvl).find("lvl > name").text();
        arr.lvls[lvl_i].map = $(lvl).find("lvl > map").text();
        arr.lvls[lvl_i].id = lvl_i;
    });
    return arr;
}
function updateScope() {
    $("#update").click();
}
