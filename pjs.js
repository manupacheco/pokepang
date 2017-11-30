function Pj() {
    this.intervalId = undefined;
    this.x2 = 20;
    this.y2 = 20;
    this.x = (height/2) - this.x2;
    this.y = width - this.y2;
}

Pj.prototype.goLeft = function(){
    this.x = this.x - this.x2;
    console.log('l');
}

Pj.prototype.goRight = function(){
    this.x = this.x + this.x2;
    console.log('r');
}