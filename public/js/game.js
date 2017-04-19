
$(document).ready(function () {


    $(document).on('keydown', function(event){
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
    var maxLeftOffset = $('#game').width() - $('#player').width() + 30;
    var maxTopOffset = $('#game').height() - $('#player').height() + 20;
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
    console.log(offsetLeft, offsetTop);
    if(maxTopOffset >= offsetTop && offsetTop > -20)
        $("#player").css("top",offsetTop);
    if(maxLeftOffset >= offsetLeft && offsetLeft > -30)
        $("#player").css("left",offsetLeft);
}
