angularPlayer.config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('@');
});