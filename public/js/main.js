$(document).ready(function () {

    // авторизация
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
                        $("#auth_form p.error").text("Не верно введенный пароль.");
                        $("#auth_form p.error").removeClass("hidden");
                        break;
                    case "no data":
                        $("#auth_form p.error").text("Введите логин и пароль.");
                        $("#auth_form p.error").removeClass("hidden");
                        break;
                }
            }
        });
    });

    // регистрация
    $("#registration_form input[type='submit']").on("click", function () {
        var login = $("#registration_form input[name='login']").val();
        var pass = $("#registration_form input[name='pass']").val();

        $.ajax({
            url: "/src/controller/AjaxController.php",
            type: "POST",
            data: { 'action': "registration",
                'data': [login, pass]},
            success: function(json){
                switch (json){
                    case "no data":
                        $("#registration_form p.error").text("Введите логин и пароль.");
                        $("#registration_form p.error").removeClass("hidden");
                        break;
                    default:
                        alert("Вы успешно зарегестрировались");
                }
            },
            error: function () {
                $("#registration_form p.error").text("Логин уже занят.");
                $("#registration_form p.error").removeClass("hidden");
            }
        });
    });
});
