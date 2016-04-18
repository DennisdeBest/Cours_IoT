angular.module('starter.controllers.playlists', [])

    .controller('PlaylistsCtrl',['$scope', 'PlaylistsSrv', function($scope, PlaylistsSrv){
        $scope.playlists = PlaylistsSrv.playlists;

        $scope.deletePlaylist = function(playlist, itemID) {
            var itemIndex = PlaylistsSrv.getItemIndex(playlist, itemID);
            PlaylistsSrv.delete(itemIndex)
        }
    }]);

