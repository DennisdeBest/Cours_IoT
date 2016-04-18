angular.module('starter.controllers.app', [])

    .controller('AppCtrl',['$scope', '$ionicModal', '$timeout', '$state',
        function($scope, $ionicModal, $timeout, $state) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.links = [
            {
                title:'search',
                url:"app.search"
            },
            {
                title:'Browse',
                url:"app.browse"
            },
            {
                title:'Playlists',
                url:"app.playlists"
            }
        ];
        $scope.afficheLoginBool=true;

        $scope.toggleLogin = function() {
            $scope.afficheLoginBool = ($scope.afficheLoginBool !== true);
        };

        $scope.$on('$stateChangeSuccess', function(event,toState, toParams, fromState, fromParams ){
            console.log($state.current.name);
            $scope.currentPage = $state.current.name;

        });
        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $ionicModal.fromTemplateUrl('templates/formPlaylist.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modalPlaylist = modal;
        });


            // Triggered in the login modal to close it
        $scope.closeLogin = function() {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function() {
            $scope.modal.show();
        };
        $scope.showAddPlaylistForm = function() {
            $scope.modalPlaylist.show();
        };

        $scope.closePlaylistForm= function() {
            $scope.modalPlaylist.hide();
        };


        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function() {
                $scope.closeLogin();
            }, 1000);
        };

        $scope.addPlaylist = function() {
            console.log('Add playlist', $scope.loginData);

            $timeout(function() {
                $scope.closeLogin();
            }, 1000);
        };
    }])