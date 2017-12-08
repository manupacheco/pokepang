// imgs
var imgBoard = new Image(); imgBoard.src = 'img/board.jpg';
var imgPokeball = new Image(); imgPokeball.src = 'img/pokeballs.png';
var imgPikachuStill = new Image(); imgPikachuStill.src = 'img/pikachu.png';
var imgPikachuLeft = new Image(); imgPikachuLeft.src = 'img/pikachu_run_left.png';
var imgPikachuRight = new Image(); imgPikachuRight.src = 'img/pikachu_run_right.png';
var imgPikachuAttack = new Image(); imgPikachuAttack.src = 'img/pikachu_attack.png';
var imgPikachuThunder = new Image(); imgPikachuThunder.src = 'img/thunder.png';

var pikachu = {
  speed: 5,
  still: {
    character: imgPikachuStill,
    spriteWidth: 273,
    spriteHeight: 40,
    cols: 7,
    rows: 1,
    widthFrame: 39,
    heightFrame: 40,
    spriteX: 0,
    spriteY: 0,
    currentFrame: 0,
    frameCount: 7,
    speedFrame: 200,
  },
  left: {
    character: imgPikachuLeft,
    spriteWidth: 288,
    spriteHeight: 37,
    cols: 6,
    rows: 1,
    widthFrame: 48,
    heightFrame: 37,
    spriteX: 0,
    spriteY: 0,
    currentFrame: 0,
    frameCount: 6,
    speedFrame: 50,
  },
  right: {
    character: imgPikachuRight,
    spriteWidth: 288,
    spriteHeight: 37,
    cols: 6,
    rows: 1,
    widthFrame: 48,
    heightFrame: 37,
    spriteX: 0,
    spriteY: 0,
    currentFrame: 0,
    frameCount: 6,
    speedFrame: 50,
  },
  attack: {
    character: imgPikachuAttack,
    spriteWidth: 210,
    spriteHeight: 37,
    cols: 5,
    rows: 1,
    widthFrame: 42,
    heightFrame: 37,
    spriteX: 0,
    spriteY: 0,
    currentFrame: 0,
    frameCount: 5,
    speedFrame: 50,
  },
};