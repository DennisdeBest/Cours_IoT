angular.module('starter.controllers.search', [])

    .controller('SearchCtrl', function($scope, $stateParams) {
        console.log($stateParams);

        $scope.name = $stateParams.name;
        $scope.firstname = $stateParams.firstname;
    })