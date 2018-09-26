angularPlayer.run(function ($rootScope) {

    $rootScope.title = {
        base: 'AngularJS Demo Player',
        additional: null,
        getTitle() {
            return this.base + (this.additional ? ` | ${this.additional}` : '')
        }
    };

});