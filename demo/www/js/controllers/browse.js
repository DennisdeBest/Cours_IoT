angular.module('starter.controllers.browse', [])

    .controller('BrowseCtrl', function($scope, $stateParams) {
    console.log($stateParams);

    $scope.name = $stateParams.name;
    $scope.firstname = $stateParams.firstname;

});