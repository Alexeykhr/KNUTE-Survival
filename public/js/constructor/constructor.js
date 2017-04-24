var module = angular.module('app', []);

module.controller('constr', ['$scope', '$http', function ($scope, $http) {

    /*
    * Создать showMessage!
    * */

    $scope.changelvl = -1;
    $scope.map = [];
    // $scope.player = new Player(110,110,110,110,10,"down");
    $scope.player = [];
    $scope.go = false;
    $scope.showPoppup = false;
    $scope.newLvl = false; //poppup
    $scope.showEditLvl = false; //poppup
    $scope.remakeLvl="";
    $scope.editcollisionind = 0;
    $scope.editcollision;

    $.when($.ajax({
        url: "/public/store/xmls/lvl1.xml",
        type: "POST"
    })).done(function(a1) {
        $scope.lvls = parseLvl(a1);
        $scope.changelvl = 0;
        console.log($scope.lvls, $scope.map);
        updateScope();
    });

    $scope.createNewLvl = function () {
        var name = $("#projName").val();
        var width = $("#projWidth").val();
        var height = $("#projHeight").val();

        $scope.map = {
            "collision":{},
            "height":height,
            "width":width
        };

        $scope.lvls.lvls.push({
            "name":name,
            "filename":name+".xml"
        });
        $scope.changelvl = name+".xml";

        $scope.showPoppup = false;
        $scope.newLvl = false;

        // var text_xml = "<lvl><name>"+name+"</name><width>"+width+"</width><height>"+height+"</height></lvl>";
        //
        // $.ajax({
        //     url: "/src/controller/AjaxController.php",
        //     type: "POST",
        //     data: {
        //         'action': "createLvl",
        //         'data': text_xml
        //     },
        //     success: function () {
        //         console.log("save");
        //     }
        // });
    };

    $scope.saveAll = function () {
        var text_xml = "<lvls>";

        for(var lvl in $scope.lvls.lvls){
            text_xml+= "<lvl><name>"+$scope.lvls.lvls[lvl].name+"</name>" +
                "<width>"+$scope.lvls.lvls[lvl].width+"</width>" +
                "<height>"+$scope.lvls.lvls[lvl].height+"</height>";
            for(var col in $scope.lvls.lvls[lvl].collision){
                text_xml+= "<collision><posX>"+$scope.lvls.lvls[lvl].collision[col].posX+"</posX>" +
                                    "<posY>"+$scope.lvls.lvls[lvl].collision[col].posY+"</posY>" +
                                    "<width>"+$scope.lvls.lvls[lvl].collision[col].width+"</width>" +
                                    "<height>"+$scope.lvls.lvls[lvl].collision[col].height+"</height></collision>"
            }
            text_xml+="</lvl>";
        }
        text_xml+="</lvls>";

        $.ajax({
            url: "/src/controller/AjaxController.php",
            type: "POST",
            data: {
                'action': "saveLvls",
                'data': text_xml
            },
            success: function () {
                console.log("save");
            }
        });
    };

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

    $scope.$watch('changelvl', function (newValue) {
        console.log(newValue);
        if($scope.lvls!=undefined) {
            $scope.map = $scope.lvls.lvls[$scope.changelvl];
            if($scope.map.collision != undefined)
                $scope.editcollision = $scope.map.collision[$scope.editcollisionind];
        }
    });

    $scope.showEditMenu = function (index) {
        $scope.editcollisionind = index;
        $scope.editcollision = $scope.map.collision[index];
        $("#colision-table tbody tr").removeClass("cadetblue");
        $("#colision-table tbody tr.col-"+index).addClass("cadetblue");
        $(".in_lvl").removeClass("green");
        $("#col-"+index).addClass("green");
    };

    $scope.delCol = function(index){
        $scope.map.collision.splice(index, 1);
    };

    $(document).ready(function (){
        var mouseDown = false;
        var mouseUp = true;

        var elem_left = $("#game").offset().left;
        var elem_top = $("#game").offset().top;

        var scrollLeft = $('#display').scrollLeft();
        var scrollTop = $('#display').scrollTop();

        var posX;
        var posY;

        var res = null;

        $("#game").on("mousedown", function (e) {
            if(mouseUp && $scope.remakeLvl=='addColl') {
                mouseUp = false;
                mouseDown = true;
                posX = e.pageX - elem_left + scrollLeft;
                posY = e.pageY - elem_top + scrollTop;

                $(this).append("<div class='new_block'></div>");
                res = $(".new_block");
                $(res).css('top', posY);
                $(res).css('left', posX);
            }
        });

        $("#game").on("mousemove", function (e2) {
            if(mouseDown && $scope.remakeLvl=='addColl') {
                scrollLeft = $('#display').scrollLeft();
                scrollTop = $('#display').scrollTop();

                var posX2 = e2.pageX - elem_left + scrollLeft;
                var posY2 = e2.pageY - elem_top + scrollTop;
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
            }
        });

        $("#game").on("mouseup", function () {
            if(mouseDown && $scope.remakeLvl=='addColl') {
                var posX = $(res).css('left');
                var posY = $(res).css('top');

                posX = posX.substr(0, posX.length - 2);
                posY = posY.substr(0, posY.length - 2);

                if($scope.map.collision != undefined)
                    $scope.map.collision.push({
                        "posX": Number(posX),
                        "posY": Number(posY),
                        "width": $(res).width(),
                        "height": $(res).height()
                    });
                else
                    $scope.map.collision = [{
                        "posX": Number(posX),
                        "posY": Number(posY),
                        "width": $(res).width(),
                        "height": $(res).height()
                    }];
                mouseUp = true;
                updateScope();
                $(res).remove();
            }
        });

        // $("#constructor").on("click", function () { //выйти из конструктора
        //     document.cookie = "constructor=false; path=/;";
        //     location.reload();
        // });
    });
}]);

// function Player(posX, posY, width, height, speed, rot) {
//     this.posX = posX;
//     this.posY = posY;
//     this.width = width;
//     this.height = height;
//     this.gap = 20;
//     this.speed = speed;
//     this.rot = rot;
// }
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
    });
    return arr;
}
function updateScope() {
    $("#update").click();
}
