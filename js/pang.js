var height = 600;
var width = 1200;

function PangGame(options) {
    this.ctx = document.getElementById('game-board').getContext('2d');
    this.board = imgBoard;
    this.player = new Player(pikachu);
    this.attack = new Attack(height);
    this.bigBubble = new Bubble(height, width, 50, 50, 65, 65, 1, 5);
    this.rightBubble = new Bubble();
    this.leftBubble = new Bubble();
    this.counterBubble = 6;
    this.intervalGame = undefined;
}

PangGame.prototype.ini = function () {
    this._controlsKeys();
    this._update();
    this.bigBubble.updatePosBubble();
    this.bigBubble.updateFrameBubble();
    this.player.updateFramePlayer();
};

PangGame.prototype._drawBoard = function () {
    this.ctx.drawImage(this.board, 0, 0, width, height);
};

PangGame.prototype._drawPlayer = function () {
    this.ctx.drawImage(this.player.character, this.player.spriteX, this.player.spriteY, this.player.widthFrame, this.player.heightFrame, this.player.x, this.player.y, this.player.x2, this.player.y2);
};

PangGame.prototype._drawAttack = function () {
    this.ctx.drawImage(this.attack.image, this.attack.spriteX, this.attack.spriteY, this.attack.widthFrame, this.attack.heightFrame, this.attack.x, this.attack.y, this.attack.x2, this.attack.y2);
};

PangGame.prototype._drawsBubbles = function (bubble) {
    this.ctx.drawImage(bubble.pokeball, bubble.spriteX, bubble.spriteY, bubble.widthFrame, bubble.heightFrame, bubble.x, bubble.y, bubble.x2, bubble.y2);
};

PangGame.prototype._collisionDetectionElements = function (elementOne, elementTwo) {
    elementOneX = elementOne.x + 20;
    elementOneY = elementOne.y + 20;
    elementOneX2 = elementOne.x2 - 40;
    elementOneY2 = elementOne.y2 - 40;
    if (elementOneX < elementTwo.x + elementTwo.x2 && elementOneX + elementOneX2 > elementTwo.x && elementOneY < elementTwo.y + elementTwo.y2 && elementOneY + elementOneY2 > elementTwo.y) {
        return true;
    }
};

PangGame.prototype._collisionPlayerBubbles = function (bubble) {
    if ((this._collisionDetectionElements(bubble, this.player)) === true) {
        window.cancelAnimationFrame(this.intervalGame);
        window.cancelAnimationFrame(this.bigBubble.intervalBubble);
        window.cancelAnimationFrame(this.leftBubble.intervalBubble);
        window.cancelAnimationFrame(this.rightBubble.intervalBubble);
        this.intervalGame = undefined;
        this._statusGame('lose');
    }
};

PangGame.prototype._collisionBigBubbleAttack = function () {
    if ((this._collisionDetectionElements(this.bigBubble, this.attack)) === true) {
        this.rightBubble = new Bubble(height, width, this.bigBubble.x + 25, this.bigBubble.y, 50, 50, 1, -5);
        this.leftBubble = new Bubble(height, width, this.bigBubble.x + 25, this.bigBubble.y, 50, 50, -1, -5);
        this.leftBubble.updatePosBubble();
        this.rightBubble.updatePosBubble();
        this.leftBubble.updateFrameBubble();
        this.rightBubble.updateFrameBubble();

        clearInterval(this.attack.intervalAttack);
        window.cancelAnimationFrame(this.bigBubble.intervalBubble);
        this.attack.deleteAttack();
        this.bigBubble.deleteBubble();
    }
};

PangGame.prototype._collisionSmallBubbleAttack = function (smallBubble) {
    if ((this._collisionDetectionElements(smallBubble, this.attack)) === true) {
        clearInterval(this.attack.intervalAttack);
        window.cancelAnimationFrame(smallBubble.intervalBubble);
        this.attack.deleteAttack();
        smallBubble.deleteBubble();
        this.counterBubble--;

        if (this.counterBubble === 4 || this.counterBubble === 2) {
            this.bigBubble = new Bubble(height, width, (Math.random() * ((width - 110) - 0) + 0), 50, 65, 65, 1, 3);
            this.bigBubble.updatePosBubble();
            this.bigBubble.updateFrameBubble();
        }
    }
};

PangGame.prototype._statusGame = function (status) {
    if (this.counterBubble === 0) {
        this._youWin();
    }
    if (status === 'lose') {
        this._youLose();
    }
};

PangGame.prototype._youWin = function () {
    alert('You win!! Congrats!!');
};

PangGame.prototype._youLose = function () {
    alert('You lose.. L O S E R ! !');
};

PangGame.prototype._controlsKeys = function () {
    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 37:
                this.player.goLeft(pikachu);
                this.player.updateFramePlayer();
                break;
            case 39:
                this.player.goRight(pikachu);
                this.player.updateFramePlayer();
                break;
            case 32:
                this.attack.updateAttack(this.player.x, this.player.x2, height, width);
                this.player.goAttack(pikachu);
                break;
            case 90: //z
                console.log('pause');
                if (this.intervalGame != undefined) {
                    window.cancelAnimationFrame(this.intervalGame);
                    window.cancelAnimationFrame(this.bigBubble.intervalBubble);
                    window.cancelAnimationFrame(this.leftBubble.intervalBubble);
                    window.cancelAnimationFrame(this.rightBubble.intervalBubble);
                    this.intervalGame = undefined;
                } else {
                    this._update();
                    this.bigBubble.updatePosBubble();
                    this.leftBubble.updatePosBubble();
                    this.rightBubble.updatePosBubble();
                }
                break;
        }
    }.bind(this);

    document.onkeyup = function (e) {
        switch (e.keyCode) {
            case 37:
                this.player.goStill(pikachu);
                this.player.updateFramePlayer();
                break;
            case 39:
                this.player.goStill(pikachu);
                this.player.updateFramePlayer();
                break;
            case 32:
                this.player.goStill(pikachu);
                this.player.updateFramePlayer();
                break;
        }
    }.bind(this);
};

PangGame.prototype._update = function () {
    this.ctx.clearRect(0, 0, width, height);
    this._drawBoard();
    this._drawAttack();
    this._drawPlayer();
    this._drawsBubbles(this.bigBubble);
    this._drawsBubbles(this.leftBubble);
    this._drawsBubbles(this.rightBubble);
    this._collisionBigBubbleAttack();
    this._collisionSmallBubbleAttack(this.leftBubble);
    this._collisionSmallBubbleAttack(this.rightBubble);
    this._collisionPlayerBubbles(this.bigBubble);
    this._collisionPlayerBubbles(this.leftBubble);
    this._collisionPlayerBubbles(this.rightBubble);
    this._statusGame();
    this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
};