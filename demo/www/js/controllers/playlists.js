angular.module('starter.controllers.playlists', [])

    .controller('PlaylistsCtrl',['$scope', 'PlaylistsSrv', function($scope, PlaylistsSrv){
        $scope.playlists = PlaylistsSrv.playlists;
    }])

