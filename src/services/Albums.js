angularPlayer.service('AlbumsService', function ($http) {

    let service = this;

    service.getAlbums = function (q = '', page = 1, limit = 12) {
        return $http.get('/data/albums.json');
    };

});