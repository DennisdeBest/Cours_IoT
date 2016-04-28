angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $location, $state, userManager) {

  // Form data for the login modal
  $scope.loginData = {
      email:'test@test.tst',
        password:'test'
  };
    $scope.user;
    $scope.lights = {};

    $scope.userManager = userManager;

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
      var errorHandler = function(error) {
          console.log(error);
      };
      var successHandler = function(success){
          console.log(userManager.user);
          $scope.user=userManager.user;
          $state.go('app.lights');
          $scope.closeLogin();
          $scope.getLights();
      };

      userManager.doLogin($scope.loginData).then(successHandler, errorHandler);
      console.log("Doing Login"+$scope.loginData);
  };



    $scope.getLights = function() {
        var errorHandler = function(error) {
            console.log(error);
        };
        var successHandler = function(success){
            console.log("************"+$scope.lights);
            $scope.lights=userManager.lights;
            $state.go('app.lights');
            $scope.closeLogin();
        };
        userManager.getLights().then(successHandler, errorHandler)
        console.log($scope.lights);
    }
})

    /*
.controller('LightCtrl', ['$scope', 'userManager', function($scope, userManager) {
    $scope.userManager = userManager;
    $scope.lights = {};

    console.log("LightCtrl");

    $scope.getLights = function() {
        var errorHandler = function(error) {
            console.log(error);
        };
        var successHandler = function(success){
            console.log(userManager.user);
            $scope.user=userManager.user;
            $state.go('app.lights');
            $scope.closeLogin();
        };
        userManager.getLights().then(successHandler, errorHandler)
        console.log($scope.lights);
    }
}])
*/