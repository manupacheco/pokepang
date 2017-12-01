var height = 500;
var width = 800;

function PangGame(options) {
    this.ctx = document.getElementById('game-board').getContext('2d');
    this.player = new Player();
    this.attack = new Attack(height);
    this.bigBubble = new Bubble(height, width, 50, 50, 100, 100, 1);
    this.rightBubble = new Bubble();
    this.leftBubble = new Bubble();
    this.counterBubble = 6;
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

PangGame.prototype._drawsBubbles = function (bubble) {
    this.ctx.fillStyle = bubble.style;
    this.ctx.beginPath();
    this.ctx.fillRect(bubble.x, bubble.y, bubble.x2, bubble.y2);
    this.ctx.closePath();
    this.ctx.fill();
};

PangGame.prototype._collisionDetectionElements = function (elementOne, elementTwo) {
    if (elementOne.x < elementTwo.x + elementTwo.x2 && elementOne.x + elementOne.x2 > elementTwo.x && elementOne.y < elementTwo.y + elementTwo.y2 && elementOne.y + elementOne.y2 > elementTwo.y) {
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

PangGame.prototype._collisionSmallBubbleAttack = function (smallBubble) {
    if ((this._collisionDetectionElements(smallBubble, this.attack)) === true) {
        clearInterval(this.attack.intervalAttack);
        window.cancelAnimationFrame(smallBubble.intervalBubble);
        this.attack.deleteAttack();
        smallBubble.deleteBubble();
        this.counterBubble --;
        
        if (this.counterBubble === 4 || this.counterBubble === 2){
        this.bigBubble = new Bubble(height, width, (Math.random() * ((width - 110) - 0) + 0), 50, 100, 100, 1);
        this.bigBubble.updatePosBubble();
        }
    }
};

PangGame.prototype._statusGame = function (status) {
    if(this.counterBubble === 0){
        this._youWin();
    }
    if(status === 'lose'){
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
                this.player.goLeft();
                break;
            case 39:
                this.player.goRight();
                break;
            case 32:
                this.attack.updateAttack(this.player.x, this.player.x2, height, width);
                break;
            case 90: //z
                console.log('pause');
                if(this.intervalGame != undefined){
                    window.cancelAnimationFrame(this.intervalGame);
                    window.cancelAnimationFrame(this.bigBubble.intervalBubble);
                    window.cancelAnimationFrame(this.leftBubble.intervalBubble);
                    window.cancelAnimationFrame(this.rightBubble.intervalBubble);
                    this.intervalGame = undefined;
                }else{
                    this._update();
                    this.bigBubble.updatePosBubble();
                    this.leftBubble.updatePosBubble();
                    this.rightBubble.updatePosBubble();
                }
                break;
        }
    }.bind(this);
};

PangGame.prototype._update = function () {
    this.ctx.clearRect(0, 0, width, height);
    this._drawAttack();
    this._drawPlayer();
    //this._drawBigBubble();
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