var module = angular.module('game', []);

module.controller('mainCtrl', function ($scope) {
     $scope.map = new lvl1();
     $scope.player = new Player(110,110,110,110,10,"down");
     $scope.go = false;

     console.log($scope.map);

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
         console.log($scope.touchPlMp());
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
         var gap = 20;

         return (obj1.posX + $scope.player.gap + gap < obj2.posX + obj2.width && obj1.posY + $scope.player.gap + gap < obj2.posY + obj2.height &&
                 obj1.posX + obj1.width > obj2.posX - $scope.player.gap + gap && obj1.posY + obj1.height > obj2.posY - $scope.player.gap + gap);
     };

     $scope.touchPlMp = function () {
         for(var col in $scope.map.lvl)
             if($scope.touchObj($scope.player, $scope.map.lvl[col]))
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
});

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

function Collision(posX, posY, width, height) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
}

function Player(posX, posY, width, height, speed, rot) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.gap = 20;
    this.speed = speed;
    this.rot = rot;
}
