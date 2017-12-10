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
    this.counterBall = 10;
    this.counterLifes = 3;
    this.score = 0;
    this.caugth = false;
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

PangGame.prototype._drawElements = function () {
    this.ctx.drawImage(this.board, 0, 0, width, height);
    this.ctx.drawImage(this.attack.image, this.attack.spriteX, this.attack.spriteY, this.attack.widthFrame, this.attack.heightFrame, this.attack.x, this.attack.y, this.attack.x2, this.attack.y2);
    this.ctx.drawImage(this.player.character, this.player.spriteX, this.player.spriteY, this.player.widthFrame, this.player.heightFrame, this.player.x, this.player.y, this.player.x2, this.player.y2);
    this.balls.forEach(function (e, i) {
        this.ctx.drawImage(this.balls[i].pokeball, this.balls[i].spriteX, this.balls[i].spriteY, this.balls[i].widthFrame, this.balls[i].heightFrame, this.balls[i].x, this.balls[i].y, this.balls[i].x2, this.balls[i].y2);
    }.bind(this));
    $('#player-score').html(this.score);
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
            this.balls.forEach(function (e, i) {
                this.balls[i].intervalPosBall = window.cancelAnimationFrame(this.balls[i].intervalPosBall);
            }.bind(this));
            this.balls.splice(i, 1);
            this.counterBall--;
            this.player._changeMoveFrame(caught.pokeball);
            this.caugth = true;

            setTimeout(function () {
                this._subtractLife();
                this.balls.forEach(function (e, i) {
                    this.balls[i].updatePosBall();
                }.bind(this));
                this.balls.push(new Ball(height, width, (Math.random() * ((width - 110) - 0) + 0), 50, 65, 65, -1, 3));
                this.player.goStill(this.character);
                this.caugth = false;
            }.bind(this), 3000);
        }
    }.bind(this));
};

PangGame.prototype._subtractLife = function () {
    this.counterLifes--;
    if (this.counterLifes === 2) {
        $('#player-state').css("background-image", "url('img/hearts_two.png')");
    }
    if (this.counterLifes === 1) {
        $('#player-state').css("background-image", "url('img/hearts_one.png')");
    }
    if (this.counterLifes === 0) {
        $('#player-state').css("background-image", "url('img/hearts_none.png')");
        this._statusGame('lose');
    }
};

PangGame.prototype._collisionBallsAttack = function () {
    this.balls.forEach(function (e, i) {
        if ((this._collisionDetectionElements(e, this.attack)) === true) {
            this.score = this.score + 5;
            if (e.x2 === 50) { //Small Ball
                this.balls.splice(i, 1);
                this.counterBall--;
                if (this.counterBall % 2 == 0) {
                    this.balls.push(new Ball(height, width, (Math.random() * ((width - 110) - 0) + 0), 50, 65, 65, -1, 3), new Ball(height, width, (Math.random() * ((width - 110) - 0) + 0), 50, 65, 65, 1, 3));
                }
                this.attack.intervalAttack = clearInterval(this.attack.intervalAttack);
                this.attack.deleteAttack();
            } else if (e.x2 === 65) { //Big Ball
                this.balls.push(new Ball(height, width, e.x + 25, e.y, 50, 50, 1, -5), new Ball(height, width, e.x + 25, e.y, 50, 50, -1, -5));
                this.balls.splice(i, 1);
                this.attack.intervalAttack = clearInterval(this.attack.intervalAttack);
                this.attack.deleteAttack();
            }
        }
    }.bind(this));
};

PangGame.prototype._youWin = function () {
    $('canvas').addClass('disable');
    $('.winner-screen').removeClass('disable');
};

PangGame.prototype._youLose = function () {
    $('canvas').addClass('disable');
    $('.loser-screen').removeClass('disable');
};

PangGame.prototype._statusGame = function (status) {
    // if (this.counterBall === 0) {
    //     this._stop();
    //     this._youWin();
    // }
    if (status === 'lose') {
        this._stop();
        this._youLose();
    }
};

PangGame.prototype._stop = function () {
    this.intervalGame = window.cancelAnimationFrame(this.intervalGame);
    this.player.setInterval = clearInterval(this.player.setInterval);
    this.attack.intervalAttack = clearInterval(this.attack.intervalAttack);
    this.balls.forEach(function (e, i) {
        this.balls[i].intervalPosBall = window.cancelAnimationFrame(this.balls[i].intervalPosBall);
    }.bind(this));
};

PangGame.prototype._controlsKeys = function () {
    if (this.caugth === false) {
        document.onkeydown = function (e) {
            if (e.keyCode == 90) {
                if (this.intervalGame != undefined) {
                    console.log('pause');
                    this._stop();
                } else {
                    this._update();
                    this.player.updateFramePlayer();
                    this.attack.updateAttack();
                    this.balls.forEach(function (e, i) {
                        this.balls[i].updatePosBall();
                    }.bind(this));
                }
            }
        }.bind(this);
        window.addEventListener('keydown', function (e) {
            keys[e.keyCode] = true;
        });
        window.addEventListener('keyup', function (e) {
            keys[e.keyCode] = false;
            if(this.caugth === false){
                this.player.goStill(this.character);
            }
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
    }
};

PangGame.prototype._update = function () {
    this._statusGame();
    this._controlsKeys();
    this.ctx.clearRect(0, 0, width, height);
    this._drawElements();
    this._collisionBallsAttack();
    this._collisionBallsPlayer();
    this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
};