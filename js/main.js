$(document).ready(function () {
    var pang;
    var characterSelect;

    $('#select-characters').on('click', '.characters', function () {
        characterSelect = $(this).attr('id');
        pang = new PangGame(characterSelect);
    });

    $('#btn-start').on('click', function () {
        $('.starting-screen').addClass('disable');
        $('canvas').removeClass('disable');
        pang.init();
    });

});