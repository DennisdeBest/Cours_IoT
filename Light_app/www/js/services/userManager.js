angular.module('starter.services', [])


    .service('userManager',['$http', '$q',  function($http, $q){
        this.user = {};
        this.lights = {};
    this.getUser = function() {
        return this.user
    };


    // Perform the login action when the user submits the login form
    this.doLogin = function(loginData) {
        var deferred = $q.defer();
        var self = this;
        var succeshandler = function(response, status, headers, config){
            if(response && response.data != false){
                self.user = response.data;
                return deferred.resolve(self.user);
            }else {
                return deferred.reject("Unknow user");
            }
        };

        var errorhandler  = function(response, status, headers, config) {
            deferred.reject(error);
        }
        var url = 'http://localhost:1337/login';
        var data = loginData;
        console.log(data);
        $http({
            method: 'POST',
            url: url,
            data: data
        }).then(succeshandler, errorhandler);

        return deferred.promise;
    };

        this.getLights = function(){
            var deferred = $q.defer();
            var self = this;
            var succeshandler = function(response, status, headers, config){
                if(response && response.data != false){
                    self.lights = response.data;
                    console.log(response.data);
                    return deferred.resolve(self.lights);
                }else {
                    return deferred.reject("Unknow user");
                }
            };

            var errorhandler  = function(response, status, headers, config) {
                deferred.reject(error);
            };
            var url = 'http://localhost:1337/light?owner='+self.user.id;
            console.log(url);
            $http({
                method: 'GET',
                url: url
            }).then(succeshandler, errorhandler);

            return deferred.promise;
        }
}]);
