
var lvl_map = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1],
    [1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1],
    [1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1],
    [1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,0,1],
    [1,0,1,0,0,0,0,0,1,0,1,0,0,0,1,1,0,1],
    [1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,0,1],
    [1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,1,0,1],
    [1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1],
    [1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1],
    [1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,1,0,1,0,0,1,0,0,0,0,1],
    [1,0,1,0,0,1,0,0,0,1,1,0,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

$(document).ready(function () {
    var player = $("#player");
    var game = $("#game");

    var size_map = lvl_map.length * $(player).width();

    $(game).width(size_map);
    $(game).height(size_map);

    for(var i = 0; i < lvl_map.length; i++)
        for(var j = 0; j < lvl_map.length; j++)
            if(lvl_map[i][j]){
                $(game).append("<div class='box' style='top:" + i * player.width() + "; left: " + j * player.width() + ";'></div>");
            }


    $('body').on('keydown', function(event){
        if (event.which  == 68){
            $("#player img").removeClass("up");
            $("#player img").removeClass("down");
            $("#player img").removeClass("left");
            $("#player img").addClass("right");
            goes("right");
            $("#player #go").removeClass("hidden");
            $("#player #stop").addClass("hidden");
        }
        if (event.which  == 87){
            $("#player img").removeClass("left");
            $("#player img").removeClass("down");
            $("#player img").removeClass("right");
            $("#player img").addClass("up");
            goes("up");
            $("#player #go").removeClass("hidden");
            $("#player #stop").addClass("hidden");
        }
        if (event.which  == 65){
            $("#player img").removeClass("up");
            $("#player img").removeClass("down");
            $("#player img").removeClass("right");
            $("#player img").addClass("left");
            goes("left");
            $("#player #go").removeClass("hidden");
            $("#player #stop").addClass("hidden");
        }
        if (event.which  == 83){
            $("#player img").removeClass("up");
            $("#player img").removeClass("left");
            $("#player img").removeClass("right");
            $("#player img").addClass("down");
            goes("down");
            $("#player #go").removeClass("hidden");
            $("#player #stop").addClass("hidden");
        }

    });

    $(document).on('keyup', function(){
        $("#player #go").addClass("hidden");
        $("#player #stop").removeClass("hidden");
    });
});

function goes(when){
    // var maxLeftOffset = $('#game').width() - $('#player').width() + 30;
    // var maxTopOffset = $('#game').height() - $('#player').height() + 20;
    var offsetTop = $("#player").position().top;
    var offsetLeft = $("#player").position().left;
    if(when == "right"){
        offsetLeft += 10;
    }
    if(when == "left"){
        offsetLeft -= 10;
    }
    if(when == "down"){
        offsetTop += 10;
    }
    if(when == "up"){
        offsetTop -= 10;
    }

    if(test(when)// && maxTopOffset >= offsetTop && offsetTop > -20
    )
        $("#player").css("top",offsetTop);
    if(test(when) //&& maxLeftOffset >= offsetLeft && offsetLeft > -30
    )
        $("#player").css("left",offsetLeft);

    var scrollTop = $("#player").position().top - $('#display').height()/2 + $("#player").height();
    var scrollLeft = $("#player").position().left - $('#display').width()/2 + $("#player").width();

    $('#display').animate({ scrollTop:  scrollTop}, 0);
    $('#display').animate({ scrollLeft: scrollLeft }, 0);

}

function test(when){
    var gap = 20;

    var x = $("#player").position().left;
    var y = $("#player").position().top;
    var player_size = $("#player").width();

    var x_normalize = Math.round(x / 110).toFixed(0);
    var y_normalize = Math.round(y / 110).toFixed(0);

    switch (when){
        case "right":
            x_normalize++;
            if(x_normalize*player_size+gap-player_size < x && lvl_map[y_normalize][x_normalize])
                return false;
            break;
        case "left":
            x_normalize--;
            if(x_normalize*player_size+player_size-gap > x && lvl_map[y_normalize][x_normalize])
                return false;
            break;
        case "up":
            y_normalize--;
            if(y_normalize*player_size+player_size-gap > y && lvl_map[y_normalize][x_normalize])
                return false;
            break;
        case "down":
            y_normalize++;
            if(y_normalize*player_size+gap-player_size < y && lvl_map[y_normalize][x_normalize])
                return false;
            break;
    }

    return true;
}