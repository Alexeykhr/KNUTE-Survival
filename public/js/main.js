$(document).ready(function () {
    $("#auth_form input[type='submit']").on("click", function () {
        var login = $("#auth_form input[name='login']").val();
        var pass = $("#auth_form input[name='pass']").val();

        $.ajax({
            url: "/src/controller/AjaxController.php",
            type: "POST",
            data: { 'action': "auth",
                    'data': [login, pass]},
            success: function(json){
                switch (json){
                    case "no pass":
                        $("p.error").text("Не верно введенный пароль.");
                        $("p.error").removeClass("hidden");
                        break;
                    case "no data":
                        $("p.error").text("Введите логин и пароль.");
                        $("p.error").removeClass("hidden");
                        break;
                }
            }
        });
    });
});
