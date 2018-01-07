function Player(character) {
  this.x2 = character.x2;
  this.y2 = 100;
  this.x = (width / 2) - this.x2;
  this.y = (height - 10) - this.y2;
  this.speed = character.speed;
  this.direction = '';
  this.setInterval = undefined;
  this.character = character.still.character;
  this.widthFrame = character.still.widthFrame;
  this.heightFrame = character.still.heightFrame;
  this.spriteX = character.still.spriteX;
  this.spriteY = character.still.spriteY;
  this.currentFrame = character.still.currentFrame;
  this.frameCount = character.still.frameCount;
  this.speedFrame = character.still.speedFrame;
  this.updateFramePlayer();
}

Player.prototype.updateFramePlayer = function () {
  this.setInterval = clearInterval(this.setInterval);
  this.setInterval = setInterval(function () {
    this.currentFrame = ++this.currentFrame % this.frameCount;
    this.spriteX = this.currentFrame * this.widthFrame;
  }.bind(this), this.speedFrame);
};

Player.prototype._changeMoveFrame = function (move) {
  this.character = move.character;
  this.widthFrame = move.widthFrame;
  this.heightFrame = move.heightFrame;
  this.spriteX = move.spriteX;
  this.spriteY = move.spriteY;
  this.currentFrame = move.currentFrame;
  this.frameCount = move.frameCount;
  this.speedFrame = move.speedFrame;
};

Player.prototype.goStill = function (character) {
  this._changeMoveFrame(character.still);
  this.direction = '';
};

Player.prototype.goLeft = function (character) {
  if (this.x > 0) {
    this.x = this.x - this.speed;
    if (this.direction != 'left') {
      this.x = this.x - this.speed;
      this._changeMoveFrame(character.left);
    }
  }
  this.direction = 'left';
};

Player.prototype.goRight = function (character) {
  if (this.x < (width - this.x2)) {
    this.x = this.x + this.speed;
    if (this.direction != 'right') {
      this.x = this.x + this.speed;
      this._changeMoveFrame(character.right);
    }
  }
  this.direction = 'right';
};

Player.prototype.goAttack = function (character) {
  this._changeMoveFrame(character.attack);
};

function Attack(height, character) {
  this.image = character.character;
  this.x = 0;
  this.y = height;
  this.x2 = 0;
  this.y2 = 0;
  this.intervalAttack = undefined;
  //animation
  this.widthFrame = character.widthFrame;
  this.heightFrame = character.heightFrame;
  this.spriteX = character.spriteX;
  this.spriteY = character.spriteY;
  this.currentFrame = character.currentFrame;
  this.frameCount = character.frameCount;
}

Attack.prototype.updateAttack = function (x, x2, height, width) {
  this.x = x + ((x2 * 30) / 100);
  this.y = height - x2;
  this.x2 = x2 - ((x2 * 60) / 100);
  this.y2 = height + x2;

  this.intervalAttack = clearInterval(this.intervalAttack);
  this.intervalAttack = setInterval(function () {
    this.y = this.y - 25;
    this.currentFrame = ++this.currentFrame % this.frameCount;
    this.spriteX = this.currentFrame * this.widthFrame;
    if (this.y < -15) {
      clearInterval(this.intervalAttack);
      this.x = 0;
      this.y = height;
      this.x2 = 0;
      this.y2 = 0;
      this.intervalAttack = clearInterval(this.intervalAttack);
    }
  }.bind(this), 100);
};

Attack.prototype.deleteAttack = function () {
  this.style = '';
  this.x = 0;
  this.y = height;
  this.x2 = 0;
  this.y2 = 0;
  this.intervalAttack = clearInterval(this.intervalAttack);
};