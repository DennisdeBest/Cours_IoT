$(function(){
    console.log("jQuery");

    var email = $('#email').val();
    var pass = $('#password').val();



    $('#email').bind('input propertychange change', function() {
        email = $(this).val();
        checkInputs();
    });
    $('#password').bind('input propertychange change', function() {
        pass = $(this).val();
        checkInputs();
    });


    var checkInputs = function() {
        console.log("check inputs");

        if (email == '' || pass == '') {
            $('#loginButton').prop('disabled', true);
            $('#loginButton').addClass('loginDisabled');
        }
        else {
            $('#loginButton').prop('disabled', false);
            $('#loginButton').removeClass('loginDisabled')
        }
    };

    checkInputs();


    $('#loginForm').submit(function(event)
    {
        event.preventDefault();
        var url ='http://localhost:1337/login';
        var data = $('#loginForm').serialize();
        console.log(data);
        $.post(url, data, function(result){
            console.log("AJAX send");
            if(result)
                console.log("log ok");
            else
                console.log("unidentified user")
        })

    })

});