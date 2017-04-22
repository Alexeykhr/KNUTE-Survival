$(document).ready(function () {

    // Authorization
    $('#auth_form').find("input[type='submit']").on("click", function (event) {
        var login = $("#auth_form").find("input[name='login']").val();
        var pass = $("#auth_form").find("input[name='pass']").val();
        var error = $("#auth_form").find(".error");

        event.preventDefault();

        $.ajax({
            url: "/src/controller/AjaxController.php",
            type: "POST",
            data: {
                'action': "login",
                'data': [login, pass]
            },
            success: function (json) {
                var res = json.split("/");
                switch (res[0]) {
                    case "no pass":
                        showFormError("Неверно введен пароль.", error);
                        break;
                    case "no data":
                        showFormError("Введите логин и пароль.", error);
                        break;
                    case "no auth":
                        showFormError("Такого логина не существует.", error);
                        break;
                    case "good":
                        error.addClass("hidden");
                        var date = new Date(new Date().getTime() - (60 * 1000 * 60 - 3 * 60 * 60 * 1000));//на 1 минуту \\удалить 60
                        document.cookie = "logged=" + res[1] + "; path=/; expires=" + date;
                        location.reload();
                        break;
                }
            }
        });
    });

    // Registration
    $("#registration_form").find("input[type='submit']").on("click", function (event) {
        var login = $("#registration_form").find("input[name='login']").val();
        var pass = $("#registration_form").find("input[name='pass']").val();
        var error = $("#registration_form").find(".error");

        event.preventDefault();

        if (login.length < 5)
            showFormError("Минимальная длина логина 5 символов.", error);
        else if (pass.length < 8)
            showFormError("Минимальная длина пароля 8 символов.", error);
        else
            $.ajax({
                url: "/src/controller/AjaxController.php",
                type: "POST",
                data: {
                    'action': "registration",
                    'data': [login, pass]
                },
                success: function (json) {
                    switch (json) {
                        case "no data":
                            showFormError("Введите логин и пароль.", error);
                            break;
                        case "login len":
                            showFormError("Минимальная длина логина 5 символов.", error);
                            break;
                        case "pass len":
                            showFormError("Минимальная длина пароля 8 символов.", error);
                            break;
                        case "login exists":
                            showFormError("Логин существует.", error);
                            break;
                        default:
                            error.addClass("hidden");
                            var res = json.split("/");
                            var date = new Date(new Date().getTime() + 60 * 1000 - 3 * 60 * 60 * 1000);//на 1 минуту
                            document.cookie = "logged=" + res[1] + "; path=/; expires=" + date;
                            location.reload();
                    }
                }
            });
    });
});

function showFormError(message, block) {
    $(block).text(message);
    $(block).removeClass("hidden");
}
