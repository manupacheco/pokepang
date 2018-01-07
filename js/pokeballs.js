function Ball(height, width, x, y, x2, y2, speedX, speedY) {
  this.pokeball = imgPokeball;
  this.x = x;
  this.y = y;
  this.x2 = x2;
  this.y2 = y2;
  this.speedX = speedX;
  this.speedY = speedY;
  this.boardHeight = height;
  this.boardWidth = width;
  this.gravity = 0.15;
  this.intervalBall = undefined;
  this.intervalPosBall = undefined;
  //animation
  this.spriteWidth = 185;
  this.spriteHeight = 22;
  this.cols = 8;
  this.rows = 1;
  this.widthFrame = this.spriteWidth / this.cols;
  this.heightFrame = this.spriteHeight / this.rows;
  this.spriteX = 0;
  this.spriteY = 0;
  this.currentFrame = 0;
  this.frameCount = 8;
  this.updatePosBall();
  this._updateFrameBall();
}

Ball.prototype._updateFrameBall = function () {
  this.intervalBall = setInterval(function () {
    this.currentFrame = ++this.currentFrame % this.frameCount;
    this.spriteX = this.currentFrame * this.widthFrame;
  }.bind(this), 150);
};

Ball.prototype.updatePosBall = function () {
  this.intervalPosBall = window.cancelAnimationFrame(this.intervalPosBall);
  this.speedY += this.gravity;
  this.x += this.speedX;
  this.y += this.speedY;
  if ((this.x + this.speedX) > (this.boardWidth - this.x2) || (this.x + this.speedX) < (0)) {
    this.speedX *= -1;
  }
  if ((this.y + this.speedY) > (this.boardHeight - this.x2)) {
    this.speedY = 10;
    this.speedY *= -1;
  }
  if ((this.y + this.speedY) < 0) {
    this.speedY = -10;
    this.speedY *= -1;
  }
  this.intervalPosBall = window.requestAnimationFrame(this.updatePosBall.bind(this));
};