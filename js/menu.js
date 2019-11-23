$(function () {
    $('#Tz_nav a').hover(function () {
        $(this).children('span').css({
            'backgroundColor': getRandomColor(),
            'fontWeight': 'normal',

            'borderRadius': '3px 3px 0 0'
        }).stop().animate({marginTop: '0px'}, 100)
    }, function () {
        $(this).children('span').css({
            'backgroundColor': '#FFFFFF',
            'fontWeight': 'normal',
            'color': '#000000',
            'borderRadius': '0 0 0 0'
        }).stop().animate({marginTop: '8px'}, 100)
    })
    var getRandomColor = function () {
        return '#' + (function (color) {
                return (color += '123456789abcdef'[Math.floor(Math.random() * 15)])
                && (color.length == 6) ? color : arguments.callee(color);
            })('');
    };
})