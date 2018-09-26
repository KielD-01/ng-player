angularPlayer.filter('timeConvert', function () {
    return function (time) {

        function wrapTime(a, b, c) {
            return [
                a < 10 ? `0${a}` : a,
                b < 10 ? `0${b}` : b,
                c < 10 ? `0${c}` : c
            ].join(':');
        }

        const secNum = parseInt(time, 10); // don't forget the second param
        let hours = Math.floor(secNum / 3600),
            minutes = Math.floor((secNum - (hours * 3600)) / 60),
            seconds = secNum  - (hours * 3600) - (minutes * 60);

        return wrapTime(
            Math.floor(secNum / 3600),
            Math.floor((secNum - (hours * 3600)) / 60),
            secNum  - (hours * 3600) - (minutes * 60)
        );
    }
});