function Player() {
    this.intervalId = undefined;
    this.x2 = 50;
    this.y2 = 50;
    this.x = (width/2) - this.x2;
    this.y = height - this.y2;
}

Player.prototype.goLeft = function(){
    if(this.x !== 0){
    this.x = this.x - this.x2;
    console.log('l');
    }
};

Player.prototype.goRight = function(){
    if(this.x !== (width-50)){
        this.x = this.x + this.x2;
        console.log('r');
    }
};

function Attack(){
    this.style = '';
    this.x = 0;
    this.y = 500;
    this.x2 = 0;
    this.y2 = 0;
    this.intervalId = undefined;
}

Attack.prototype.updateAttack = function(x, x2, height){
    this.style = 'red';
    this.x = x + 10;
    this.y = 450;
    this.x2 = x2 - 20;
    this.y2 = height + x2;

    this.intervalId = clearInterval(this.intervalId);;
    this.intervalId = setInterval(function(){
        console.log(this.y);
        this.y = this.y - 50;

        if(this.y === 0){
            clearInterval(this.intervalId);
        }
    }.bind(this),250);
};