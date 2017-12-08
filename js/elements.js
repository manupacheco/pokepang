function Player(character) {
    this.x2 = 100;
    this.y2 = 100;
    this.x = (width / 2) - this.x2;
    this.y = height - this.y2;
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
    //animation
    this._changeMoveFrame(character.still);
};

Player.prototype.goLeft = function (character) {
    if(this.direction != 'left'){
        this.x = this.x - this.speed;
        this._changeMoveFrame(character.left);
    }
    if (this.x > 0) {
        this.x = this.x - this.speed;
    }
    this.direction = 'left';
};

Player.prototype.goRight = function (character) {
    if (this.direction != 'right') {
        this.x = this.x + this.speed;
        this._changeMoveFrame(character.right);
    }
    if (this.x < (width - this.x2)) {
        this.x = this.x + this.speed;
    }
    this.direction = 'right';
};

Player.prototype.goAttack = function (character) {
    this._changeMoveFrame(character.attack);
};

function Attack(height) {
    this.image = imgPikachuThunder;
    this.x = 0;
    this.y = height;
    this.x2 = 0;
    this.y2 = 0;
    this.intervalAttack = undefined;
    //animation
    this.spriteWidth = 81;
    this.spriteHeight = 614;
    this.cols = 2;
    this.rows = 1;
    this.widthFrame = this.spriteWidth / this.cols;
    this.heightFrame = this.spriteHeight / this.rows;
    this.spriteX = 0;
    this.spriteY = 0;
    this.currentFrame = 0;
    this.frameCount = 2;
}

Attack.prototype.updateAttack = function (x, x2, height, width) {
    this.x = x + 30;
    this.y = height - x2;
    this.x2 = x2 - 60;
    this.y2 = height + x2;

    this.intervalAttack = clearInterval(this.intervalAttack);
    this.intervalAttack = setInterval(function () {
        this.y = this.y - 15;
        this.currentFrame = ++this.currentFrame % this.frameCount;
        this.spriteX = this.currentFrame * this.widthFrame;
        if (this.y < -15) {
            clearInterval(this.intervalAttack);
            this.x = 0;
            this.y = height;
            this.x2 = 0;
            this.y2 = 0;
            this.intervalAttack = undefined;
        }
    }.bind(this), 100);
};

Attack.prototype.deleteAttack = function () {
    this.style = '';
    this.x = 0;
    this.y = height;
    this.x2 = 0;
    this.y2 = 0;
    this.intervalAttack = undefined;
};

function Bubble(height, width, x, y, x2, y2, speedX, speedY) {
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
    this.intervalBubble = undefined;
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
}

Bubble.prototype.updateFrameBubble = function () {
    this.setInterval = setInterval(function () {
        this.currentFrame = ++this.currentFrame % this.frameCount;
        this.spriteX = this.currentFrame * this.widthFrame;
    }.bind(this), 150);
};

Bubble.prototype.updatePosBubble = function () {
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

    this.intervalBubble = window.requestAnimationFrame(this.updatePosBubble.bind(this));
};

Bubble.prototype.deleteBubble = function () {
    this.style = '';
    this.x = 0;
    this.y = 0;
    this.x2 = 0;
    this.intervalBubble = undefined;
};