$(document).ready(function () {

    // авторизация
    $('#auth_form').find("input[type='submit']").on("click", function () {
        var login = $("#auth_form").find("input[name='login']").val();
        var pass = $("#auth_form").find("input[name='pass']").val();
        var error = $("#auth_form").find(".error");

        $.ajax({
            url: "/src/controller/AjaxController.php",
            type: "POST",
            data: {
                'action': "auth",
                'data': [login, pass]
            },
            success: function(json){
                var res = json.split("/");
                switch (res[0]){
                    case "no pass":
                        showFormError("Невірно введений пароль.", error);
                        break;
                    case "no data":
                        showFormError("Введіть логін і пароль.", error);
                        break;
                    case "no login":
                        showFormError("Такого логіна не існує.", error);
                        break;
                    case "good":
                        error.addClass("hidden");
                        var date = new Date(new Date().getTime() + 60 * 1000 - 3 * 60 * 60 * 1000);//на 1 минуту
                        document.cookie = "login=" + res[1] + "; path=/; expires=" + date;
                        location.reload()
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
            showFormError("Мінімальна довжина пароля 8 символів.", error);
        else if(login.length < 5){
            showFormError("Мінімальна довжина логіна 5 символів.", error);
        }
        else
            $.ajax({
                url: "/src/controller/AjaxController.php",
                type: "POST",
                data: {
                    'action': "registration",
                    'data': [login, pass]
                },
                success: function(json){
                    switch (json){
                        case "no data":
                            showFormError("Введіть логін і пароль.", error);
                            break;
                        default:
                            error.addClass("hidden");
                            var res = json.split("/");
                            var date = new Date(new Date().getTime() + 60 * 1000 - 3 * 60 * 60 * 1000);//на 1 минуту
                            document.cookie = "login=" + res[1] + "; path=/; expires=" + date;
                            location.reload();
                    }
                },
                error: function () {
                    showFormError("Логін вже зайнятий.", error);
                }
            });
    });
});

function showFormError(message, block) {
    $(block).text(message);
    $(block).removeClass("hidden");
}
