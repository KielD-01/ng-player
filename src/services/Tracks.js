angularPlayer.service('TracksService', function ($http) {

    let service = this;

    service.getTracks = function (track = null, q = '', page = 1, limit = 12) {
        return $http.get('/data/tracks.json');
    };

    service.getAlbumTracks = function (singerId = null, albumId = null, page = 1, limit = 24) {

    };

});