var height = 600;
var width = 1200;
var keys = [];

function PangGame(characterSelect) {
    this.ctx = document.getElementById('game-board').getContext('2d');
    this.board = imgBoard;
    this.character = this._selectCharacter(characterSelect);
    this.character.sound.play();
    this.player = new Player(this.character);
    this.attack = new Attack(height, this.character.attackType);
    this.pokemonFly = new PokemonFly(height, width);
    this.pokemonStone = new PokemonStone(height, width);
    this.balls = [];
    this.counterBall = 1000;
    this.counterLifes = 3;
    this.score = 25;
    this.power = 50;
    this.caugth = false;
    this.massiveAttack = [];
    this.intervalFillPowerBar = undefined;
    this.intervalClearPowerBar = undefined;
    this.intervalTimer = undefined;
    this.intervalGame = undefined;
}

PangGame.prototype._selectCharacter = function (selection) {
    $('#selected').html(selection.toUpperCase());
    $('#player-name').html(selection.toUpperCase());
    switch (selection) {
        case "pikachu":
            $('#player-img').css("background-image", "url('img/select_pikachu.gif')");
            $('#player-attack').css("background-image", "url('img/power_thunder.png')");
            return pikachu;
        case "bulbasur":
            $('#player-img').css("background-image", "url('img/select_bulbasur.gif')");
            $('#player-attack').css("background-image", "url('img/power_leaf.png')");
            $('.blinking').css("color", "rgb(255, 255, 255)");
            return bulbasur;
        case "squirtle":
            $('#player-img').css("background-image", "url('img/select_squirtle.gif')");
            $('#player-attack').css("background-image", "url('img/power_water.png')");
            return squirtle;
        case "charmander":
            $('#player-img').css("background-image", "url('img/select_charmander.gif')");
            $('#player-attack').css("background-image", "url('img/power_fire.png')");
            return charmander;
    }
};

PangGame.prototype.init = function () {
    this._update();
    this._timer();
    soundIntro.pause();
    soundInGame.play();
    this.balls.push(new Ball(height, width, 50, 50, 65, 65, 1, 5));
};

PangGame.prototype._timer = function () {
    this.intervalTimer = setInterval(function () {
        this.score = this.score - 2;
    }.bind(this), 3000);
};

PangGame.prototype._drawElements = function () {

    this.ctx.drawImage(this.attack.image, this.attack.spriteX, this.attack.spriteY, this.attack.widthFrame, this.attack.heightFrame, this.attack.x, this.attack.y, this.attack.x2, this.attack.y2);
    if (this.massiveAttack.length !== 0) {
        this.massiveAttack.forEach(function (e, i) {
            this.ctx.drawImage(this.massiveAttack[i].image, this.massiveAttack[i].spriteX, this.massiveAttack[i].spriteY, this.massiveAttack[i].widthFrame, this.massiveAttack[i].heightFrame, this.massiveAttack[i].x, this.massiveAttack[i].y, this.massiveAttack[i].x2, this.massiveAttack[i].y2);
        }.bind(this));
    }
    this.ctx.drawImage(this.player.character, this.player.spriteX, this.player.spriteY, this.player.widthFrame, this.player.heightFrame, this.player.x, this.player.y, this.caugth ? 100 : this.player.x2, this.player.y2);
    this.balls.forEach(function (e, i) {
        this.ctx.drawImage(this.balls[i].pokeball, this.balls[i].spriteX, this.balls[i].spriteY, this.balls[i].widthFrame, this.balls[i].heightFrame, this.balls[i].x, this.balls[i].y, this.balls[i].x2, this.balls[i].y2);
    }.bind(this));
    if (this.score === -1) {
        this.score = 0;
    }
    $('#player-score').html(this.score);
    $('#player-attack').css("width", this.power + "%");

    this.ctx.drawImage(this.pokemonStone.character, this.pokemonStone.x, this.pokemonStone.y, this.pokemonStone.x2, this.pokemonStone.y2);
    this.ctx.drawImage(this.pokemonFly.character, this.pokemonFly.spriteX, this.pokemonFly.spriteY, this.pokemonFly.widthFrame, this.pokemonFly.heightFrame, this.pokemonFly.x, this.pokemonFly.y, this.pokemonFly.x2, this.pokemonFly.y2);
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
            this.caugth = true;
            this._caugthAnimation();
        }
    }.bind(this));
};

PangGame.prototype._caugthAnimation = function () {
    this.player._changeMoveFrame(caugth.lightIn);
    soundCaught.play();
    setTimeout(function () {
        this.player._changeMoveFrame(caugth.pokeball);
        setTimeout(function () {
            this._subtractLife();
            this.player._changeMoveFrame(caugth.lightOut);
            setTimeout(function () {
                this.balls.forEach(function (e, i) {
                    this.balls[i].updatePosBall();
                }.bind(this));
                this.balls.push(new Ball(height, width, (Math.random() * ((width - 110) - 0) + 0), 50, 65, 65, -1, 3));
                this.player.goStill(this.character);
                this.caugth = false;
            }.bind(this), 500);
        }.bind(this), 2000);
    }.bind(this), 500);
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

PangGame.prototype._addLife = function () {
    if (this.counterLifes === 3) {
        this.score = this.score + 20;
    } else {
        this.counterLifes++;
        if (this.counterLifes === 3) {
            $('#player-state').css("background-image", "url('img/hearts_full.png')");
        }
        if (this.counterLifes === 2) {
            $('#player-state').css("background-image", "url('img/hearts_two.png')");
        }
        if (this.counterLifes === 1) {
            $('#player-state').css("background-image", "url('img/hearts_one.png')");
        }
    }
};

PangGame.prototype._collisionBallsAttack = function () {
    this.balls.forEach(function (e, i) {
        if ((this._collisionDetectionElements(e, this.attack)) === true) {
            soundCrash.play();
            this.score = this.score + 5;
            this._fillPowerBar(10);
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

PangGame.prototype._collisionBallsMasiveAttack = function () {
    this.massiveAttack.forEach(function (attackElement, attackIndex) {
        this.balls.forEach(function (ballsElement, ballsIndex) {
            if (this._collisionDetectionElements(ballsElement, attackElement) === true) {
                soundCrash.play();
                this.score = this.score + 2;
                this.balls.splice(ballsIndex, 1);
            }
        }.bind(this));
    }.bind(this));
};

PangGame.prototype._collisionAttackPokemonFly = function () {
    if (this._collisionDetectionElements(this.pokemonFly, this.attack) === true) {
        this.pokemonStone.falling = true;
        this.attack.deleteAttack();
        soundPidgeotto.play();
        console.log('new stone creating...');
        setTimeout(function () {
            this.pokemonStone = new PokemonStone(height, width);
        }.bind(this), 12000);
    }
};

PangGame.prototype._collisionPlayerPokemonStone = function () {
    if (this._collisionDetectionElements(this.player, this.pokemonStone) === true) {
        this.pokemonStone.y = height + 100;
        if (this.pokemonStone.type === 'heart') {
            soundHeart.play();
            this._addLife();
        }
        if (this.pokemonStone.type === 'power') {
            soundPower.play();
            this._fillPowerBar(40);
        }
    }
};

PangGame.prototype._generateMasiveAttack = function () {
    $('canvas').css("background-image", "url('img/board_dark.jpg')");
    soundMassiveAttack.play();
    this.character.sound.play();
    this.player.goAttack(this.character);
    this.balls.forEach(function (e, i) {
        this.balls[i].intervalPosBall = window.cancelAnimationFrame(this.balls[i].intervalPosBall);
    }.bind(this));
    this.caugth = true;

    setTimeout(function () {
        this.power = 99;
        this.massiveAttack = [];
        this._cleanPowerBar();
        for (var i = 0; i < 15; i++) {
            this.massiveAttack.push(new Attack(height, this.character.attackType));
        }
        var max = 80;
        var min = 0;
        this.massiveAttack.forEach(function (e, i) {
            this.massiveAttack[i].updateAttack(Math.random() * (max - min) + min, this.player.x2, Math.random() * ((height + 200) - (height)) + (height));
            max = max + 80;
            min = min + 80;
        }.bind(this));
        setTimeout(function () {
            $('canvas').css("background-image", "url('img/board.jpg')");
            this.balls.forEach(function (e, i) {
                this.balls[i].updatePosBall();
            }.bind(this));
            this.balls.push(new Ball(height, width, (Math.random() * ((width - 110) - 0) + 0), 50, 65, 65, -1, 3));
            this.player.goStill(this.character);
            this.caugth = false;
        }.bind(this), 3000);
    }.bind(this), 2000);
};

PangGame.prototype._cleanPowerBar = function () {
    this.power = 99;
    $('#masive-attack').addClass('disable');
    clearInterval(this.intervalFillPowerBar);
    this.intervalClearPowerBar = setInterval(function () {
        this.power--;
        if (this.power === 0) {
            clearInterval(this.intervalClearPowerBar);
        }
    }.bind(this), 40);
};

PangGame.prototype._fillPowerBar = function (powerAdd) {
    var totalPower = this.power + powerAdd;
    this.intervalFillPowerBar = setInterval(function () {
        if (this.power > 99) {
            this.power = 100;
            $('#masive-attack').removeClass('disable');
            this.intervalFillPowerBar = clearInterval(this.intervalFillPowerBar);
        }
        if (totalPower < 101) {
            this.power++;
            if (this.power === totalPower) {
                this.intervalFillPowerBar = clearInterval(this.intervalFillPowerBar);
            }
            if (this.power === 100) {
                $('#masive-attack').removeClass('disable');
                this.intervalFillPowerBar = clearInterval(this.intervalFillPowerBar);
            }
        } else {
            this.power++;
            if (this.power === 100) {
                $('#masive-attack').removeClass('disable');
                this.intervalFillPowerBar = clearInterval(this.intervalFillPowerBar);
            }
        }
    }.bind(this), 50);
};

PangGame.prototype._youLose = function () {
    soundInGame.pause();
    soundLoser.play();
    this.caugth = true;
    $('.loser-screen').removeClass('disable');
};

PangGame.prototype._statusGame = function (status) {
    if (status === 'lose' || this.score < 1) {
        this._stop();
        this._youLose();
    }
};

PangGame.prototype._stop = function () {
    this.intervalGame = window.cancelAnimationFrame(this.intervalGame);
    this.intervalTimer = clearInterval(this.intervalTimer);
    this.player.setInterval = clearInterval(this.player.setInterval);
    this.attack.intervalAttack = clearInterval(this.attack.intervalAttack);
    this.balls.forEach(function (e, i) {
        this.balls[i].intervalPosBall = window.cancelAnimationFrame(this.balls[i].intervalPosBall);
    }.bind(this));
    this.caugth = true;
    soundInGame.pause();
};

PangGame.prototype._controlsKeys = function () {
    if (this.caugth === false) {
        document.onkeydown = function (e) {
            if (e.keyCode == 90) { // z pause
                if (this.intervalGame != undefined) {
                    console.log('pause');
                    $('.pause-screen').removeClass('disable');
                    this._stop();
                } else {
                    $('.pause-screen').addClass('disable');
                    this._update();
                    this._timer();
                    soundInGame.play();
                    this.caugth = false;
                    this.player.updateFramePlayer();
                    this.attack.updateAttack();
                    this.balls.forEach(function (e, i) {
                        this.balls[i].updatePosBall();
                    }.bind(this));
                }
            }
            if (e.keyCode == 77 && this.power > 99 && this.caugth === false) { // m massiveAttack function
                this._generateMasiveAttack();
            }
        }.bind(this);
        window.addEventListener('keydown', function (e) {
            keys[e.keyCode] = true;
        });
        window.addEventListener('keyup', function (e) {
            keys[e.keyCode] = false;
            if (this.caugth === false) {
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
            this.character.sound.play();
        }
    }
};

PangGame.prototype._update = function () {
    this._statusGame();
    this._controlsKeys();
    this.ctx.clearRect(0, 0, width, height);
    this._drawElements();
    this._collisionBallsAttack();
    this._collisionBallsMasiveAttack();
    this._collisionBallsPlayer();
    this._collisionAttackPokemonFly();
    this._collisionPlayerPokemonStone();
    this.pokemonStone.updatePosPokemonStone(this.pokemonFly);
    this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
};