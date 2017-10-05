/** @class Ball
 * The ball in a breakout game
 */
export default class Ball {
    constructor(canvasWidth, canvasHeight, bricksPerRow){
        this.position = {x: canvasWidth/2, y: canvasHeight - 80};
        this.radius = 10;
        this.direction = {x: 3, y: -3};
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.bricksPerRow = bricksPerRow;
        this.audioBounce = new Audio("bounce.mp3");
        this.addedX = 0.5;

        // Bind class functions
        this.update = this.update.bind(this);
        this.render = this.render.bind(this);
        this.hasCollision = this.hasCollision.bind(this);
        this.resetBall = this.resetBall.bind(this);
        this.getPosition = this.getPosition.bind(this);
        this.upgradeSecondRound = this.upgradeSecondRound.bind(this);
    }

    upgradeSecondRound(){
        this.addedX += 2;
        this.direction.y *= 1.5;
    }

    getPosition(){
        return this.position;
    }

    resetBall(){
        this.position = {x: this.canvasWidth/2, y: this.canvasHeight - 80};
        this.direction.x = 3;
        this.direction.y = -Math.abs(this.direction.y);
    }

    hasCollision(wall){
        var brickWidth = (this.canvasWidth-7)/this.bricksPerRow;
        var brickHeight = this.canvasHeight/20;
        var collisionBrick = null;
        for(var i = 0; i < 8; i++){
            for(var j = 0; j < this.bricksPerRow; j++){
                if(wall[i][j]) {
                    var rx = Math.max(j+j*brickWidth,Math.min(j+j*brickWidth + brickWidth,this.position.x));
                    var ry = Math.max(i+i*brickHeight,Math.min(i+i*brickHeight + brickHeight,this.position.y));
                    var distSquared =
                        Math.pow(rx - this.position.x, 2) +
                        Math.pow(ry - this.position.y, 2);
                    if (distSquared < Math.pow(this.radius, 2)) {
                        collisionBrick = {x: j, y: i};
                    }
                }
            }
        }
        return collisionBrick;
    }

    update(paddleX, paddleHalfWidth, wall){
        var result = {
            collisionBrick: null,
            ballDown: false
        };
        if(this.position.x + this.direction.x < this.radius
            || this.position.x + this.direction.x > this.canvasWidth-this.radius) {
            this.direction.x = -this.direction.x;
            this.audioBounce.play();
        }
        if(this.position.y + this.direction.y < this.radius) {
            this.direction.y = -this.direction.y;
            this.audioBounce.play();
        }
        else if(this.position.y + this.direction.y > this.canvasHeight-80) {
            if((this.position.x > paddleX-paddleHalfWidth) && (this.position.x < paddleX + paddleHalfWidth) && (this.direction.y > 0)) {
                this.direction.y = -this.direction.y;
                this.direction.x = Math.sign(this.position.x - paddleX) * Math.round((Math.abs(paddleX - this.position.x) / 10 + this.addedX) * 1000 / 1000);
                this.audioBounce.play();
            }
        else {
                if(this.position.y + this.direction.y > this.canvasHeight-55) {
                    result.ballDown = true;
                }
            }
        }
        result.collisionBrick = this.hasCollision(wall);
        if(result.collisionBrick){
            if((this.position.y > result.collisionBrick.y*26) && (this.position.y < (result.collisionBrick.y*26+25))) {
                this.direction.x = -this.direction.x;
            }
            else {
                this.direction.y = -this.direction.y;
            }
        }
        this.position.x += this.direction.x;
        this.position.y += this.direction.y;
        return result;
    }

    render(ctx){
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}