var height = 600;
var width = 1200;
var keys = [];

function PangGame(characterSelect) {
    this.ctx = document.getElementById('game-board').getContext('2d');
    this.board = imgBoard;
    this.character = this._selectCharacter(characterSelect);
    this.player = new Player(this.character);
    this.attack = new Attack(height);
    this.balls = [];
    this.counterBall = 6;
    this.intervalGame = undefined;
}

PangGame.prototype._selectCharacter = function (selection) {
    switch (selection) {
        case "pikachu":
            return pikachu;
        case "otro":
            return "otro";
        case "otro":
            return "otro";
    }
};

PangGame.prototype.init = function () {
    this._update();
    this.balls.push(new Ball(height, width, 50, 50, 65, 65, 1, 5));
};

PangGame.prototype.drawElements =function () {
    this.ctx.drawImage(this.board, 0, 0, width, height);
    this.ctx.drawImage(this.player.character, this.player.spriteX, this.player.spriteY, this.player.widthFrame, this.player.heightFrame, this.player.x, this.player.y, this.player.x2, this.player.y2);
    this.ctx.drawImage(this.attack.image, this.attack.spriteX, this.attack.spriteY, this.attack.widthFrame, this.attack.heightFrame, this.attack.x, this.attack.y, this.attack.x2, this.attack.y2);
    this.balls.forEach(function (e, i) {
        this.ctx.drawImage(this.balls[i].pokeball, this.balls[i].spriteX, this.balls[i].spriteY, this.balls[i].widthFrame, this.balls[i].heightFrame, this.balls[i].x, this.balls[i].y, this.balls[i].x2, this.balls[i].y2);
    }.bind(this));
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

PangGame.prototype._collisionBallsPlayer = function () {
    this.balls.forEach(function (e, i) {
        if ((this._collisionDetectionElements(this.balls[i], this.player)) === true) {
            this._stop();
            this._statusGame('lose');
        }
    }.bind(this));
};

PangGame.prototype._collisionBallsAttack = function () {
    this.balls.forEach(function (e, i){
        if ((this._collisionDetectionElements(this.balls[i], this.attack)) === true) {
            if (e.x2 === 65){
                this.balls.push(new Ball(height, width, this.balls[i].x + 25, this.balls[i].y, 50, 50, 1, -5));
                this.balls.push(new Ball(height, width, this.balls[i].x + 25, this.balls[i].y, 50, 50, -1, -5));
                this.attack.deleteAttack();
                this.balls.splice(this.balls[i], 1);
            }else{
                this.counterBall--;
                if (this.counterBall === 4 || this.counterBall === 2) {
                    this.balls.push(new Ball(height, width, (Math.random() * ((width - 110) - 0) + 0), 50, 65, 65, 1, 3));
                }
                this.attack.deleteAttack();
                this.balls.splice(this.balls[i],1);
            }
        }
    }.bind(this));
};

PangGame.prototype._statusGame = function (status) {
    if (this.counterBall === 0) {
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
    //alert('You lose.. L O S E R ! !');
    // $('canvas').addClass('disable');
    // $('.loser-screen').removeClass('disable');
};

PangGame.prototype._stop = function() {
    window.cancelAnimationFrame(this.intervalGame);
    this.intervalGame = undefined;
    console.log('crash');
};

PangGame.prototype._controlsKeys = function () {
    window.addEventListener("keydown", function (e) {
        keys[e.keyCode] = true;
    });
    window.addEventListener("keyup", function (e) {
        keys[e.keyCode] = false;
        this.player.goStill(this.character);
        this.player.direction = '';
    }.bind(this));

    if (keys[37]) {
        this.player.goLeft(this.character);
    }
    if (keys[39]) {
        this.player.goRight(this.character);
    }
    if (keys[37] && keys[39]) {
        this.player.goStill(this.character);
    }
    if (keys[32]) {
        this.attack.updateAttack(this.player.x, this.player.x2, height, width);
        this.player.goAttack(this.character);
    }
    if (keys[90]) {
        console.log('pause');
        if (this.intervalGame != undefined) {
            window.cancelAnimationFrame(this.intervalGame);
            this.intervalGame = undefined;
        } else {
            this._update();
        }
    }
};

PangGame.prototype._update = function () {
    this._controlsKeys();
    this.ctx.clearRect(0, 0, width, height);
    this.drawElements();
    this._collisionBallsAttack();
    this._collisionBallsPlayer();
    this._statusGame();
    this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
};