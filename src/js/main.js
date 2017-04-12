/**
 * Created by kadey on 12.04.2017.
 */
$(document).ready(function () {
    $("#auth_form input[type='submit']").on("click", function () {
        var login = $("#auth_form input[name='login']").val();
        var pass = $("#auth_form input[name='pass']").val();

        $.ajax({
            url: "src/controller/auth.php",
            type: "POST",
            data: {'data': JSON.stringify([login, pass])},
            success: function(json){
                alert(json);
            }
        });
    });
});