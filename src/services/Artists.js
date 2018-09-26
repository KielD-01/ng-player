angularPlayer.service('ArtistsService', function ($http) {

    let service = this;

    service.getArtists = function (q = '', page = 1, limit = 12) {
        return $http.get('/data/artists.json');
    };

});