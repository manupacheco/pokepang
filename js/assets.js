// imgs
var imgBoard = new Image();imgBoard.src = 'img/board.jpg';
var imgPokeball = new Image();imgPokeball.src = 'img/pokeballs.png';
var imgPokeballCaught = new Image();imgPokeballCaught.src = 'img/pokeball_caught.png';
var imgPokeballLightIn = new Image();imgPokeballLightIn.src = 'img/light_caught_in.png';
var imgPokeballLightOut = new Image();imgPokeballLightOut.src = 'img/light_caught_out.png';
var imgPikachuStill = new Image();imgPikachuStill.src = 'img/pikachu.png';
var imgPikachuLeft = new Image();imgPikachuLeft.src = 'img/pikachu_run_left.png';
var imgPikachuRight = new Image();imgPikachuRight.src = 'img/pikachu_run_right.png';
var imgPikachuAttack = new Image();imgPikachuAttack.src = 'img/pikachu_attack.png';
var imgPikachuThunder = new Image();imgPikachuThunder.src = 'img/thunder.png';
var imgBulbasurStill = new Image();imgBulbasurStill.src = 'img/bulbasur_normal.png';
var imgBulbasurLeft = new Image();imgBulbasurLeft.src = 'img/bulbasur_left.png';
var imgBulbasurRight = new Image(); imgBulbasurRight.src = 'img/bulbasur_right.png';
var imgBulbasurAttack = new Image(); imgBulbasurAttack.src = 'img/bulbasur_attack.png';
var imgBulbasurLeaf = new Image(); imgBulbasurLeaf.src = 'img/leaf.png';
var imgSquirtleStill = new Image();imgSquirtleStill.src = 'img/squirtle_normal.png';
var imgSquirtleLeft = new Image();imgSquirtleLeft.src = 'img/squirtle_left.png';
var imgSquirtleRight = new Image();imgSquirtleRight.src = 'img/squirtle_right.png';
var imgSquirtleAttack = new Image();imgSquirtleAttack.src = 'img/squirtle_attack.png';
var imgSquirtleWater = new Image();imgSquirtleWater.src = 'img/water.png';
var imgCharmanderStill = new Image();imgCharmanderStill.src = 'img/charmander_normal.png';
var imgCharmanderLeft = new Image();imgCharmanderLeft.src = 'img/charmander_left.png';
var imgCharmanderRight = new Image();imgCharmanderRight.src = 'img/charmander_right.png';
var imgCharmanderAttack = new Image();imgCharmanderAttack.src = 'img/charmander_attack.png';
var imgCharmanderFire = new Image();imgCharmanderFire.src = 'img/fire.png';
var imgPidgeottoLeft = new Image();imgPidgeottoLeft.src = 'img/pidgeotto_left.png';
var imgPidgeottoRight = new Image();imgPidgeottoRight.src = 'img/pidgeotto_right.png';
var imgStoneHeart = new Image();imgStoneHeart.src = 'img/stone_heart.png';
var imgStonePower = new Image(); imgStonePower.src = 'img/stone_power.png';

//sounds
var soundIntro = new Audio(); soundIntro.src = 'sound/intro.mp3'; soundIntro.volume -= 0.8; soundIntro.loop = true;
var soundInGame = new Audio(); soundInGame.src = 'sound/ingame.mp3'; soundInGame.volume -= 0.8; soundInGame.loop = true;
var soundLoser = new Audio(); soundLoser.src = 'sound/loser.mp3'; soundLoser.volume -= 0.8;
var soundCaught = new Audio(); soundCaught.src = 'sound/caught.mp3'; soundCaught.volume -= 0.4;
var soundCrash = new Audio(); soundCrash.src = 'sound/crash.mp3';
var soundMassiveAttack = new Audio(); soundMassiveAttack.src = 'sound/massiveAttack.mp3';
var soundPower = new Audio(); soundPower.src = 'sound/win.mp3'; soundPower.volume -= 0.5;
var soundHeart = new Audio(); soundHeart.src = 'sound/health.mp3'; soundHeart.volume -= 0.5;
var soundPidgeotto = new Audio(); soundPidgeotto.src = 'sound/pidgeotto.mp3';
var soundPikachu = new Audio(); soundPikachu.src = 'sound/pikachu.ogx'; soundPikachu.volume -= 0.8;
var soundBulbasur = new Audio(); soundBulbasur.src = 'sound/bulbasur.mp3';
var soundSquirtle = new Audio(); soundSquirtle.src = 'sound/squirtle.mp3';
var soundCharmander = new Audio(); soundCharmander.src = 'sound/charmander.mp3';

//characters
var pikachu = {
  x2: 90,
  speed: 5,
  sound: soundPikachu,
  still: {
    character: imgPikachuStill,
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
    widthFrame: 42,
    heightFrame: 37,
    spriteX: 0,
    spriteY: 0,
    currentFrame: 0,
    frameCount: 5,
    speedFrame: 50,
  },
  attackType: {
    character: imgPikachuThunder,
    widthFrame: 40.5,
    heightFrame: 614,
    spriteX: 0,
    spriteY: 0,
    currentFrame: 0,
    frameCount: 2,
    speedFrame: 100,
  }
};

var bulbasur = {
  x2: 105,
  speed: 5,
  sound: soundBulbasur,
  still: {
    character: imgBulbasurStill,
    widthFrame: 38,
    heightFrame: 34,
    spriteX: 0,
    spriteY: 0,
    currentFrame: 0,
    frameCount: 3,
    speedFrame: 200,
  },
  left: {
    character: imgBulbasurLeft,
    widthFrame: 38,
    heightFrame: 34,
    spriteX: 0,
    spriteY: 0,
    currentFrame: 0,
    frameCount: 5,
    speedFrame: 50,
  },
  right: {
    character: imgBulbasurRight,
    widthFrame: 38,
    heightFrame: 34,
    spriteX: 0,
    spriteY: 0,
    currentFrame: 0,
    frameCount: 5,
    speedFrame: 50,
  },
  attack: {
    character: imgBulbasurAttack,
    widthFrame: 38,
    heightFrame: 34,
    spriteX: 0,
    spriteY: 0,
    currentFrame: 0,
    frameCount: 5,
    speedFrame: 50,
  },
  attackType: {
    character: imgBulbasurLeaf,
    widthFrame: 40.5,
    heightFrame: 614,
    spriteX: 0,
    spriteY: 0,
    currentFrame: 0,
    frameCount: 2,
    speedFrame: 100,
  }
};

var squirtle = {
  x2: 90,
  speed: 5,
  sound: soundSquirtle,
  still: {
    character: imgSquirtleStill,
    widthFrame: 41,
    heightFrame: 40,
    spriteX: 0,
    spriteY: 0,
    currentFrame: 0,
    frameCount: 3,
    speedFrame: 200,
  },
  left: {
    character: imgSquirtleLeft,
    widthFrame: 39,
    heightFrame: 40,
    spriteX: 0,
    spriteY: 0,
    currentFrame: 0,
    frameCount: 6,
    speedFrame: 50,
  },
  right: {
    character: imgSquirtleRight,
    widthFrame: 39,
    heightFrame: 40,
    spriteX: 0,
    spriteY: 0,
    currentFrame: 0,
    frameCount: 6,
    speedFrame: 50,
  },
  attack: {
    character: imgSquirtleAttack,
    widthFrame: 44,
    heightFrame: 40,
    spriteX: 0,
    spriteY: 0,
    currentFrame: 0,
    frameCount: 3,
    speedFrame: 50,
  },
  attackType: {
    character: imgSquirtleWater,
    widthFrame: 40.5,
    heightFrame: 614,
    spriteX: 0,
    spriteY: 0,
    currentFrame: 0,
    frameCount: 2,
    speedFrame: 200,
  }
};

var charmander = {
  x2: 120,
  speed: 5,
  sound: soundCharmander,
  still: {
    character: imgCharmanderStill,
    widthFrame: 49,
    heightFrame: 40,
    spriteX: 0,
    spriteY: 0,
    currentFrame: 0,
    frameCount: 3,
    speedFrame: 200,
  },
  left: {
    character: imgCharmanderLeft,
    widthFrame: 49,
    heightFrame: 40,
    spriteX: 0,
    spriteY: 0,
    currentFrame: 0,
    frameCount: 6,
    speedFrame: 50,
  },
  right: {
    character: imgCharmanderRight,
    widthFrame: 49,
    heightFrame: 40,
    spriteX: 0,
    spriteY: 0,
    currentFrame: 0,
    frameCount: 6,
    speedFrame: 50,
  },
  attack: {
    character: imgCharmanderAttack,
    widthFrame: 49,
    heightFrame: 40,
    spriteX: 0,
    spriteY: 0,
    currentFrame: 0,
    frameCount: 3,
    speedFrame: 50,
  },
  attackType: {
    character: imgCharmanderFire,
    widthFrame: 40.5,
    heightFrame: 614,
    spriteX: 0,
    spriteY: 0,
    currentFrame: 0,
    frameCount: 2,
    speedFrame: 200,
  }
};

var pidgeotto = {
  left: {
    character: imgPidgeottoLeft,
    widthFrame: 119,
    heightFrame: 89,
    spriteX: 0,
    spriteY: 0,
    currentFrame: 0,
    frameCount: 5,
    speedFrame: 100,
  },
  right: {
    character: imgPidgeottoRight,
    widthFrame: 119,
    heightFrame: 89,
    spriteX: 0,
    spriteY: 0,
    currentFrame: 0,
    frameCount: 5,
    speedFrame: 100,
  },
};

var caugth = {
  pokeball: {
    character: imgPokeballCaught,
    widthFrame: 39,
    heightFrame: 40,
    spriteX: 0,
    spriteY: 0,
    currentFrame: 0,
    frameCount: 6,
    speedFrame: 100,
  },
  lightIn: {
    character: imgPokeballLightIn,
    widthFrame: 39,
    heightFrame: 40,
    spriteX: 0,
    spriteY: 0,
    currentFrame: 0,
    frameCount: 3,
    speedFrame: 100,
  },
  lightOut: {
    character: imgPokeballLightOut,
    widthFrame: 39,
    heightFrame: 40,
    spriteX: 0,
    spriteY: 0,
    currentFrame: 0,
    frameCount: 3,
    speedFrame: 100,
  },
};