var height = 800;
var width = 500;

function PangGame(options) {
    this.ctx = document.getElementById('game-board').getContext('2d');
    this.pj = new Pj();
}

PangGame.prototype.ini = function () {
    this._controlsKeys();
    this._update();
}

PangGame.prototype._drawPj = function () {
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(this.pj.x,this.pj.y,this.pj.x2,this.pj.y2);
}

PangGame.prototype._controlsKeys = function () {
    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 37:
                this.pj.goLeft();
                break;
            case 39:
                this.pj.goRight();
                break;
        }
    }.bind(this);
}

PangGame.prototype._update = function () {
    this.ctx.clearRect(0,0,height,width);
    this._drawPj();
    this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
}