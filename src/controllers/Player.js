angularPlayer.controller('PlayerController', function ($rootScope, $scope, ArtistsService, AlbumsService, TracksService) {

    const player = $('audio#player');
    let audio = null;

    $scope.player = {
        state: {
            playing: false,
            position: {
                current: 0,
                duration: 0
            }
        },
        track: {
            index: 0,
            selected: false
        },
        instance: null
    };

    $scope.state = null;

    $scope.data = {
        meta: {
            artists: 0,
            albums: 0,
            tracks: 0
        },
        artists: [],
        albums: [],
        tracks: []
    };

    $scope.loading = true;

    $scope.switchPlayState = function (trackIndex) {
        $scope.player.state.playing = !$scope.player.state.playing;

        if (audio instanceof Audio) {
            $scope.player.state.playing ?
                audio.play() :
                audio.pause();
        }

        if (trackIndex !== $scope.player.track.index) {
            audio.pause();

            $scope.player.state.position = {
                current: 0,
                duration: 0
            };

            $scope.loadTrack(trackIndex);
            $scope.player.state.playing = true;
        }

    };

    $scope.loadTrack = function (trackIndex, init = false) {
        $scope.player.track.index = trackIndex;
        $scope.player.track.selected = $scope.data.tracks[trackIndex];

        $rootScope.title.additional = `${$scope.player.track.selected.title} by ${$scope.player.track.selected.artist.title}`;

        if ($scope.player.track.selected.url) {
            audio = new Audio($scope.player.track.selected.url);

            audio.addEventListener('ended', function () {
                $scope.switchTrack('next');
            });

            audio.addEventListener('canplay', function () {
                const duration = this.duration;

                $scope.$apply(function () {
                    $scope.player.state.position.duration = duration;
                });

                if (!init) {
                    audio.play();
                }
            });

            audio.addEventListener('timeupdate', function () {
                const currentTime = this.currentTime;

                $scope.$apply(function () {
                    $scope.player.state.position.current = currentTime;
                });
            });

            audio.addEventListener('error', function () {
                $scope.switchTrack('next');

                M.toast({html: `Error loading ${$scope.player.track.selected.title}`});
            });

            return true;
        }

        $scope.$apply(function () {
            $scope.switchTrack('next');
            audio.play();
        });
    };

    $scope.init = function () {
        ArtistsService
            .getArtists()
            .then(function (response) {
                $scope.data.artists = response.data.artists;
                $scope.data.meta.artists = response.data.artists.length;
            });

        AlbumsService
            .getAlbums()
            .then(function (response) {
                $scope.data.albums = response.data.albums;
                $scope.data.meta.albums = $scope.data.albums.length;
            });

        TracksService
            .getTracks()
            .then(function (response) {
                $scope.data.tracks = response.data.tracks;
                $scope.data.meta.tracks = $scope.data.tracks.length;

                $scope.loadTrack(0, true);
            });

        $scope.loading = false;

        $scope.switchState('artists');
    };

    /**
     *
     * @param position
     */
    $scope.switchTrack = function (position) {

        const tracksLength = $scope.data.tracks.length;
        const trackIndex = $scope.player.track.index;

        switch (position) {
            case 'prev':
                $scope.player.track.index = (
                    trackIndex === 0 ?
                        tracksLength - 1 :
                        trackIndex - 1
                );
                break;
            case 'next':
                $scope.player.track.index = (
                    trackIndex === tracksLength - 1 ?
                        0 :
                        trackIndex + 1
                );
                break;
        }

        audio.pause();
        $scope.loadTrack($scope.player.track.index);
    };

    $scope.switchState = function (state = 'artists') {
        $scope.state = state;
    };

    $scope.init();

});