var height = 500;
var width = 800;

function PangGame(options) {
    this.ctx = document.getElementById('game-board').getContext('2d');
    this.player = new Player();
    this.attack = new Attack(height);
    this.bigBubble = new BigBubble(height, width);
}

PangGame.prototype.ini = function () {
    this._controlsKeys();
    this._update();
    this.bigBubble.updatePosBigBubble(height, width);
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
    this.ctx.beginPath();
    this.ctx.arc(this.bigBubble.x, this.bigBubble.y, this.bigBubble.radius, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.fillStyle = this.bigBubble.style;
    this.ctx.fill();
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
    this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
};