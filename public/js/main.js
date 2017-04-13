$(document).ready(function () {

    // авторизация
    $('#auth_form').find("input[type='submit']").on("click", function () {
        var login = $("#auth_form").find("input[name='login']").val();
        var pass = $("#auth_form").find("input[name='pass']").val();
        var error = $("#auth_form").find(".error");

        $.ajax({
            url: "/src/controller/AjaxController.php",
            type: "POST",
            data: { 'action': "auth",
                    'data': [login, pass]},
            success: function(json){
                switch (json){
                    case "no pass":
                        showFormError("Не верно введенный пароль.", error);
                        break;
                    case "no data":
                        showFormError("Введите логин и пароль.", error);
                        break;
                    case "no login":
                        showFormError("Такого логина не существует.", error);
                        break;
                    case "good":
                        alert("Вы успешно авторизировались.");
                        error.addClass("hidden");
                        break;
                }
            }
        });
    });

    // регистрация
    $("#registration_form").find("input[type='submit']").on("click", function () {
        var login = $("#registration_form").find("input[name='login']").val();
        var pass = $("#registration_form").find("input[name='pass']").val();
        var error = $("#registration_form").find(".error");

        if(pass.length < 8)
            showFormError("Минимальная длина пароля 8 символов.", error);
        else if(login.length < 5){
            showFormError("Минимальная длина логина 5 символов.", error);
        }
        else
            $.ajax({
                url: "/src/controller/AjaxController.php",
                type: "POST",
                data: { 'action': "registration",
                    'data': [login, pass]},
                success: function(json){
                    switch (json){
                        case "no data":
                            showFormError("Введите логин и пароль.", error);
                            break;
                        default:
                            alert("Вы успешно зарегестрировались");
                            error.addClass("hidden");
                    }
                },
                error: function () {
                    showFormError("Логин уже занят.", error);
                }
            });
    });
});

function showFormError(message, block) {
    $(block).text(message);
    $(block).removeClass("hidden");
}
