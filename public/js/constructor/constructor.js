var module = angular.module('app', []);

module.controller('constr', ['$scope', '$http', function ($scope, $http) {
    // $.when($.ajax({
    //     url: "/public/store/xmls/lvl1.xml",
    //     type: "POST"
    // })).done(function(a1) {
    //     $scope.map = parseLvl(a1);
    //     console.log($scope.map);
    // });
    $scope.map = [];
    // $scope.player = new Player(110,110,110,110,10,"down");
    $scope.player = [];
    $scope.go = false;

    $scope.keyDown = function (event) {
        switch (event.which){
            case 87:    //W;
                $scope.goes("up");
                break;
            case 83:    //S
                $scope.goes("down");
                break;
            case 65:    //A
                $scope.goes("left");
                break;
            case 68:    //D
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

$(document).ready(function () {

    var elem_left = $("#game").offset().left;
    var elem_top = $("#game").offset().top;

    $("#game").on("mousedown", function (e) {
        var sctollLeft = $('#display').scrollLeft();
        var sctollTop = $('#display').scrollTop();

        var posX = e.pageX - elem_left + sctollLeft;
        var posY = e.pageY - elem_top + sctollTop;
        $(this).append("<div class='new_block'></div>");
        var res = $(".new_block");
        $(res).css('top', posY);
        $(res).css('left', posX);

        $("#game").on("mousemove", function (e2) {

            sctollLeft = $('#display').scrollLeft();
            sctollTop = $('#display').scrollTop();

            var posX2 = e2.pageX - elem_left + sctollLeft;
            var posY2 = e2.pageY - elem_top + sctollTop;
            if (posX2 > posX && posY2 < posY) {
                $(".new_block").width(posX2 - posX);
                $(".new_block").css('top', posY2);
                $(".new_block").css('left', posX);
                $(".new_block").height(posY - posY2);
            } else if (posX2 < posX && posY2 < posY) {
                $(".new_block").css('top', posY2);
                $(".new_block").css('left', posX2);
                $(".new_block").width(posX - posX2);
                $(".new_block").height(posY - posY2);
            } else if (posX2 < posX && posY2 > posY) {
                $(".new_block").css('left', posX2);
                $(".new_block").css('top', posY);
                $(".new_block").width(posX - posX2);
                $(".new_block").height(posY2 - posY);
            } else if (posX2 > posX && posY2 > posY) {
                $(".new_block").width(posX2 - posX);
                $(".new_block").height(posY2 - posY);
                $(".new_block").css('left', posX);
                $(".new_block").css('top', posY);
            } else {
                $(".new_block").width(0);
                $(".new_block").height(0);
            }

            $("#game").on("mouseup", function () {
                $(res).removeClass("new_block");
                $(res).addClass("in_lvl");
            });
        });
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
function getLvlsConfig() {
    var xml = null;

    $.ajax({
        url: "/public/store/config.xml",
        type: "POST",
        success: function (json) {
            xml = json;
        }
    });

    var arr = {};
    arr.lvls = [];
    $(xml).find("collision").each(function(idx, v) {
        arr.lvls[idx] = {};
        $(v).find("name").each(function( i , vi) {
            arr.lvls[idx].name = $(vi).text();
        });
        $(v).find("filename").each(function( i , vi) {
            arr.lvls[idx].filename = $(vi).text();
        });

    });

    return arr;
}

