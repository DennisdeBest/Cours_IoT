angular.module('starter.services.playlists', [])

    .service('PlaylistsSrv', function () {
        /*this.playlists = [
         { title: 'Reggae', id: 1 },
         { title: 'Chill', id: 2 },
         { title: 'Dubstep', id: 3 },
         { title: 'Indie', id: 4 },
         { title: 'Rap', id: 5 },
         { title: 'Cowbell', id: 6 }
         ];*/

        this.addPlaylistElement = function (playlistItem) {
            var id = nextID(this.playlists);
            playlistItem.id = id;
            this.playlists.push(playlistItem);
            this.save();
        }

        function nextID(playlist) {
            var nextID;
            var lastID = playlist[0].id;
            console.log(playlist[0].id);

            console.log("Length : " + playlist.length);

            for (var i = 0; i < playlist.length; i++) {
                if (playlist[i].id > lastID) {
                    nextID = playlist[i].id;
                    lastid = playlist[i].id;
                    console.log(nextID);
                }
            }

            return nextID + 1;
        }

        this.playlists = window.localStorage['playlists'] ? angular.fromJson(window.localStorage['playlists']) : ['test'];

        this.save = function () {
            window.localStorage['playlists'] = angular.toJson(this.playlists);
        }

        this.delete = function (id) {
            this.playlists.splice(id, 1);
            this.save();
        }

        this.getItemIndex = function(playlist, itemID) {
            for (var i = 0; i < playlist.length; i++) {
                if (playlist[i].id === itemID) {
                    return i;
                }
            }
        }
    })

