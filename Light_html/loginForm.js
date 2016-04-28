$(function() {
    console.log("jQuery");

    //get password and email

    var email = $('#email').val();
    var pass = $('#password').val();

    //Make the socket connection and execute function when a new log is detected

    io.socket.get('/log', function(body){
        console.log('Log ', body);
    });
    io.socket.on('log', function(body){
        console.log('Log created ', body);
        getLogs();

    });

    io.socket.get('/light', function(body){
        console.log('Log ', body);
    });
    io.socket.on('light', function(body){
        console.log('light changed ', body);
        getLights();

    });


    //Detect any change in the input fields and update the variables
    $('#email').bind('input propertychange change', function () {
        email = $(this).val();
        checkInputs();
    });
    $('#password').bind('input propertychange change', function () {
        pass = $(this).val();
        checkInputs();
    });

    //Enable or disable the login button if any of the input fields are empty

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

    //Create userID variable that will be needed in certain functions
    var userID;

    //if the login form is submitted create a post request if successful show lights

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

    //get the lights with a get request, append to the html and add on/off button for each light
    var getLights = function () {
        var url = 'http://localhost:1337/light?user=' + userID;
        console.log(url);
        $('#lightsContainer').html('');
        $.get(url, function (result) {
            for (var i = 0; i < result.length; i++) {
                console.log(result[i]);
                var lightID = result[i].id;
                var state =  result[i].state;
                state = (state) ? 'ON' : 'OFF';
                console.log("light id : " + result[i].id);
                $('#lightsContainer').append(
                    "<button class='changeState' id='" + lightID + "'>"+ state +"</button>" + result[i].room +"<br/>");

            }
            changeState()
        });

    };

    var getLogs = function () {
        var url = 'http://localhost:1337/log?user=' + userID;
        //console.log(url);
        $('#logsContainer').html('');
        $.get(url, function (result) {
            for (var i = 0; i < result.length; i++) {
                var state = result[i].state;
                state = (state) ? 'ON' : 'OFF';
                var light = result[i].light;
                light = getLightName(result[i].light);
                var user = getUserName(result[i].user);
                var date = result[i].createdAt;
                var day = /[0-9]{4}-[0-9]{2}-[0-9]{2}/i.exec(date);
                var time = /[0-9]{2}:[0-9]{2}:[0-9]{2}/i.exec(date);

                $('#logsContainer').append(light + " was set to " + state + " on this day : " + day + " at this time : " + time + " by "+ user +"<br/>");
            }
        })
    };

    var getLightName = function (light) {
        var result;
        $.each(light, function (key, value) {

            //console.log("key : " + key + " value : " + value);
            if (key === 'room') {
                //console.log("************************");
                result = value;
            }
        });
        return result;
    };

    var getUserName = function (user) {
        var result;
        $.each(user, function (key, value) {

            //console.log("key : " + key + " value : " + value);
            if (key === 'firstName') {
                //console.log("************************");
                result = value;
            }
        });
        return result;
    };
    var changeState = function () {
        $('.changeState').on('click', function () {
            //console.log("Change state clicked");
            var lightID = $(this).attr('id');
            //console.log(lightID);
            var url = 'http://localhost:1337/light?id=' + lightID;
            //console.log(url);
            $.get(url , function(result) {
                var lightState = result.state;
                var id = result.id;
                //console.log(result);
                lightState = (lightState) ? 'false' : 'true';
                url = 'http://localhost:1337/light';
                result.state = lightState;
                //console.log(result);
                $.ajax({
                    url: url+"?id="+id,
                    type: 'DELETE',
                    success: function() {
                        $.post(url, result, function(){
                            getLights();
                            });
                        var data = {
                            user: userID,
                            state: lightState,
                            light:lightID
                        };
                        $.post('http://localhost:1337/log',data, function(){
                            console.log("log created")
                        })
                        }
                });

            });
        })
    }

});
