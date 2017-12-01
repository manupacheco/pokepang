var height = 500;
var width = 800;

function PangGame(options) {
    this.ctx = document.getElementById('game-board').getContext('2d');
    this.player = new Player();
    this.attack = new Attack(height);
    this.bigBubble = new Bubble(height, width, 50, 50, 100, 100, 1);
    this.rightBubble = new Bubble();
    this.leftBubble = new Bubble();
    this.intervalGame = undefined;
}

PangGame.prototype.ini = function () {
    this._controlsKeys();
    this._update();
    this.bigBubble.updatePosBubble();
};

PangGame.prototype._drawPlayer = function () {
    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(this.player.x, this.player.y, this.player.x2, this.player.y2);
};

PangGame.prototype._drawAttack = function () {
    this.ctx.fillStyle = this.attack.style;
    this.ctx.fillRect(this.attack.x, this.attack.y, this.attack.x2, this.attack.y2);
};

PangGame.prototype._drawBigBubble = function () {
    this.ctx.fillStyle = this.bigBubble.style;
    this.ctx.beginPath();
    this.ctx.fillRect(this.bigBubble.x, this.bigBubble.y, this.bigBubble.x2, this.bigBubble.y2);
    //this.ctx.arc(this.bigBubble.x, this.bigBubble.y, this.bigBubble.radius, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.fill();
};

PangGame.prototype._drawBubbles = function () {
    this.ctx.fillStyle = this.rightBubble.style;
    this.ctx.beginPath();
    this.ctx.fillRect(this.rightBubble.x, this.rightBubble.y, this.rightBubble.x2, this.rightBubble.y2);
    //this.ctx.arc(this.bigBubble.x, this.bigBubble.y, this.bigBubble.radius, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.fill();
    
    this.ctx.fillStyle = this.leftBubble.style;
    this.ctx.beginPath();
    this.ctx.fillRect(this.leftBubble.x, this.leftBubble.y, this.leftBubble.x2, this.leftBubble.y2);
    //this.ctx.arc(this.bigBubble.x, this.bigBubble.y, this.bigBubble.radius, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.fill();
};

PangGame.prototype._collisionDetectionElements = function (elementOne, elementTwo) {
    if (elementOne.x < elementTwo.x + elementTwo.x2 && elementOne.x + elementOne.x2 > elementTwo.x && elementOne.y < elementTwo.y + elementTwo.y2 && elementOne.y + elementOne.y2 > elementTwo.y) {
        return true;
    }
};

PangGame.prototype._collisionPlayerBigBubble = function () {
    if ((this._collisionDetectionElements(this.bigBubble, this.player)) === true) {
        window.cancelAnimationFrame(this.intervalGame.bind(this));
        window.cancelAnimationFrame(this.bigBubble.intervalBubble);
    }
};

PangGame.prototype._collisionPlayerLeftBubble = function () {
    if ((this._collisionDetectionElements(this.leftBubble, this.player)) === true) {
        window.cancelAnimationFrame(this.intervalGame.bind(this));
        window.cancelAnimationFrame(this.leftBubble.intervalBubble);
    }
};

PangGame.prototype._collisionPlayerRightBubble = function () {
    if ((this._collisionDetectionElements(this.rightBubble, this.player)) === true) {
        window.cancelAnimationFrame(this.intervalGame.bind(this));
        window.cancelAnimationFrame(this.rightBubble.intervalBubble);
    }
};

PangGame.prototype._collisionBigBubbleAttack = function () {
    if ((this._collisionDetectionElements(this.bigBubble, this.attack)) === true) {
        this.rightBubble = new Bubble(height, width, this.bigBubble.x + 25, this.bigBubble.y, 50, 50, 1);
        this.leftBubble = new Bubble(height, width, this.bigBubble.x + 25, this.bigBubble.y, 50, 50, -1);
        this.leftBubble.updatePosBubble();
        this.rightBubble.updatePosBubble();

        clearInterval(this.attack.intervalAttack);
        window.cancelAnimationFrame(this.bigBubble.intervalBubble);
        this.attack.deleteAttack();
        this.bigBubble.deleteBubble();
    }
};

PangGame.prototype._collisionLeftBubbleAttack = function () {
    if ((this._collisionDetectionElements(this.leftBubble, this.attack)) === true) {
        clearInterval(this.attack.intervalAttack);
        window.cancelAnimationFrame(this.leftBubble.intervalBubble);
        this.attack.deleteAttack();
        this.leftBubble.deleteBubble();
    }
};

PangGame.prototype._collisionRightBubbleAttack = function () {
    if ((this._collisionDetectionElements(this.rightBubble, this.attack)) === true) {
        clearInterval(this.attack.intervalAttack);
        window.cancelAnimationFrame(this.rightBubble.intervalBubble);
        this.attack.deleteAttack();
        this.rightBubble.deleteBubble();
    }
};

PangGame.prototype._controlsKeys = function () {
    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 37:
                this.player.goLeft();
                break;
            case 39:
                this.player.goRight();
                break;
            case 32:
                this.attack.updateAttack(this.player.x, this.player.x2, height, width);
                break;
        }
    }.bind(this);
};

PangGame.prototype._update = function () {
    this.ctx.clearRect(0, 0, width, height);
    this._drawAttack();
    this._drawPlayer();
    this._drawBigBubble();
    this._drawBubbles();
    this._collisionBigBubbleAttack();
    this._collisionLeftBubbleAttack();
    this._collisionRightBubbleAttack();
    this._collisionPlayerBigBubble();
    this._collisionPlayerLeftBubble();
    this._collisionPlayerRightBubble();
    this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
};