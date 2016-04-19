$(function() {
    console.log("jQuery");

    var email = $('#email').val();
    var pass = $('#password').val();


    $('#email').bind('input propertychange change', function () {
        email = $(this).val();
        checkInputs();
    });
    $('#password').bind('input propertychange change', function () {
        pass = $(this).val();
        checkInputs();
    });


    var checkInputs = function () {
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

    var userID;

    $('#loginForm').submit(function (event) {
        event.preventDefault();
        var url = 'http://localhost:1337/login';
        var data = $('#loginForm').serialize();
        console.log(data);
        $.post(url, data, function (result) {
            console.log("AJAX send");
            if (result) {
                $('#loginForm').remove();
                $('#flexContainer').show();
                console.log(result);
                userID = result.id;
                getLights();
                getLogs();

            }
            else
                console.log("unidentified user")
        })

    });

    var getLights = function () {
        var url = 'http://localhost:1337/light?user=' + userID;
        console.log(url);
        $('#lightsContainer').html('');
        $.get(url, function (result) {
            for (var i = 0; i < result.length; i++) {
                console.log(result[i]);
                var lightID = result[i].id;
                console.log("light id : " + result[i].id);
                $('#lightsContainer').append(
                    "<button class='changeState' id='" + lightID + "'>I/O</button>" + result[i].room + " state : " + result[i].state + "<br/>");

            }
            changeState()
        });

    };

    var getLogs = function () {
        var url = 'http://localhost:1337/log?user=' + userID;
        console.log(url);
        $.get(url, function (result) {
            for (var i = 0; i < result.length; i++) {
                var state = result[i].state;
                var light = result[i].light;
                console.log(light)
                //console.log(light['room'])
                light = getLightName(result[i].light);
                var date = result[i].createdAt;

                $('#logs').append("light : " + light + " state : " + state + " date : " + date + "<br/>");
            }
        })
    };

    var getLightName = function (light) {
        var result;
        $.each(light, function (key, value) {

            console.log("key : " + key + " value : " + value);
            if (key === 'room') {
                console.log("************************");
                result = value;
            }
        });
        return result;
    };
    var changeState = function () {
        $('.changeState').on('click', function () {
            console.log("Change state clicked");
            var lightID = $(this).attr('id');
            console.log(lightID);
            var url = 'http://localhost:1337/light?id=' + lightID;
            console.log(url);
            var lightState;
             $.get(url , function(result) {
             var lightState = result.state;
             var id = result.id;
             console.log(result);
             lightState = (lightState) ? 'false' : 'true';
             url = 'http://localhost:1337/light';
             result.state = lightState;
             console.log(result);
             $.ajax({
             url: url+"?id="+id,
             type: 'DELETE',
             success: function() {
             $.post(url, result, function(){
             console.log("state updated");
             getLights();
             });

             }
             });

             });
        })

             /*
            $.get(url, function (result) {
                var lightState = result.state;
                var id = result.id;
                console.log(result);
                lightState = (lightState) ? 'false' : 'true';
                url = 'http://localhost:1337/light';
                result.state = lightState;
                console.log(result);
                $.ajax({
                    url: url + "/" + id,
                    method: 'PUT',
                    success: function () {
                        $.post(url, result, function () {
                            console.log("state updated");
                            getLights();
                        })

                    }
                });

            });



        */
    }
});
