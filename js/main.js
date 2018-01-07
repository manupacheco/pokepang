$(document).ready(function () {
    var pang;
    var characterSelect;
    soundIntro.play();

    $('#select-characters').on('click', '.characters', function () {
        $('#btn-start').removeAttr('disabled');
        characterSelect = $(this).attr('id');
        pang = new PangGame(characterSelect);
    });

    $('#btn-start').on('click', function () {
        $('.starting-screen').addClass('disable');
        $('#player-area').removeClass('disable');
        $('canvas').removeClass('disable');
        pang.init();
    });

    $('#btn-tryagain').on('click', function () {
        window.location.reload(true);
    });
});