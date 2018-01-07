function PokemonFly(height, width) {
  this.character = pidgeotto.right.character;
  this.x = -1200;
  this.y = 10;
  this.x2 = 189;
  this.y2 = 150;
  this.speedX = 2;
  this.boardHeight = height;
  this.boardWidth = width;
  this.intervalPokemonFly = undefined;
  this.direction = 'right';
  //animation
  this.widthFrame = pidgeotto.right.widthFrame;
  this.heightFrame = pidgeotto.right.heightFrame;
  this.spriteX = pidgeotto.right.spriteX;
  this.spriteY = pidgeotto.right.spriteY;
  this.currentFrame = pidgeotto.right.currentFrame;
  this.frameCount = pidgeotto.right.frameCount;
  this.updatePosPokemonFly();
  this._updateFramePokemonFly();
}

PokemonFly.prototype._updateFramePokemonFly = function () {
  this.intervalPokemonFly = setInterval(function () {
    this.currentFrame = ++this.currentFrame % this.frameCount;
    this.spriteX = this.currentFrame * this.widthFrame;
  }.bind(this), 150);
};

PokemonFly.prototype.updatePosPokemonFly = function () {
  this.intervalPokemonFly = window.cancelAnimationFrame(this.intervalPokemonFly);
  if (this.direction == 'right') {
    if (this.x > this.boardWidth + 2200) {
      this.x = this.boardWidth + 1250;
      this._changeAnimationDirection('left');
    }
    this.x += this.speedX;
  }
  if (this.direction == 'left') {
    if (this.x < (-2200)) {
      this.x = (-1250);
      this._changeAnimationDirection('right');
    }
    this.x -= this.speedX;
  }
  this.intervalPokemonFly = window.requestAnimationFrame(this.updatePosPokemonFly.bind(this));
};

PokemonFly.prototype._changeAnimationDirection = function (direction) {
  this.direction = direction;
  if (direction === 'left') {
    this.character = pidgeotto.left.character;
    this.widthFrame = pidgeotto.left.widthFrame;
    this.heightFrame = pidgeotto.left.heightFrame;
    this.spriteX = pidgeotto.left.spriteX;
    this.spriteY = pidgeotto.left.spriteY;
    this.currentFrame = pidgeotto.left.currentFrame;
    this.frameCount = pidgeotto.left.frameCount;
  }
  if (direction === 'right') {
    this.character = pidgeotto.right.character;
    this.widthFrame = pidgeotto.right.widthFrame;
    this.heightFrame = pidgeotto.right.heightFrame;
    this.spriteX = pidgeotto.right.spriteX;
    this.spriteY = pidgeotto.right.spriteY;
    this.currentFrame = pidgeotto.right.currentFrame;
    this.frameCount = pidgeotto.right.frameCount;
  }
};

function PokemonStone(height, width) {
  this.character = undefined;
  this.x = -30;
  this.y = -30;
  this.x2 = 30;
  this.y2 = 30;
  this.boardHeight = height;
  this.boardWidth = width;
  this.gravity = 2;
  this.intervalPokemonStone = undefined;
  this.typeStone = undefined;
  this.falling = false;
  this.type = '';
  this._typeStone();
}

PokemonStone.prototype.updatePosPokemonStone = function (pokemonFly) {
  if (this.falling === true) {
    this.y += this.gravity;
  } else {
    if (pokemonFly.direction === "left") {
      this.x = pokemonFly.x + 100;
      this.y = pokemonFly.y + 105;
    } else {
      this.x = pokemonFly.x + 55;
      this.y = pokemonFly.y + 105;
    }
  }
};

PokemonStone.prototype._typeStone = function () {
  switch (Math.floor(Math.random() * (2 - 0) + 0)) {
    case 0:
      this.type = 'heart';
      this.character = imgStoneHeart;
      console.log(this.type);
      break;
    case 1:
      this.type = 'power';
      this.character = imgStonePower;
      console.log(this.type);
      break;
  }
};