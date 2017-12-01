function Player() {
    this.x2 = 50;
    this.y2 = 50;
    this.x = (width / 2) - this.x2;
    this.y = height - this.y2;
}

Player.prototype.goLeft = function () {
    if (this.x !== 0) {
        this.x = this.x - this.x2;
        console.log('l');
    }
};

Player.prototype.goRight = function () {
    if (this.x !== (width - this.x2)) {
        this.x = this.x + this.x2;
        console.log('r');
    }
};

function Attack(height) {
    this.style = '';
    this.x = 0;
    this.y = height;
    this.x2 = 0;
    this.y2 = 0;
    this.intervalId = undefined;
}

Attack.prototype.updateAttack = function (x, x2, height, width) {
    this.style = 'red';
    this.x = x + 10;
    this.y = height - x2;
    this.x2 = x2 - 20;
    this.y2 = height + x2;

    this.intervalId = clearInterval(this.intervalId);;
    this.intervalId = setInterval(function () {
        console.log(this.y);
        this.y = this.y - 5;

        if (this.y === 0) {
            clearInterval(this.intervalId);
        }
    }.bind(this), 25);
};

function BigBubble(height, width) {
    this.style = 'blue';
    this.x = 100;
    this.y = 100;
    this.radius = 50;
    this.speedX = 2;
    this.speedY = 5;
    this.boardHeight = height;
    this.boardWidth = width;
    this.gravity = 0.04;
    this.intervalId = undefined; 
}

BigBubble.prototype.updatePosBigBubble = function () {
        this.speedY += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY;
        if ((this.x + this.speedX) > (this.boardWidth - this.radius) || (this.x + this.speedX) < (0 + this.radius)){
            console.log('crash x');
            this.speedX *= -1;
        }
        if ((this.y + this.speedY) > (this.boardHeight - this.radius)){
            console.log('crash down');
            this.speedY = 5;
            this.speedY *= -1;
        }
        if ((this.y + this.speedY) < (0 + this.radius)){
            console.log('crash up');
            this.speedY = -2;
            this.speedY *= -1;
        }

        this.intervalId = window.requestAnimationFrame(this.updatePosBigBubble.bind(this));
};