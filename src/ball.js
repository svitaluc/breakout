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

        // Bind class functions
        this.update = this.update.bind(this);
        this.render = this.render.bind(this);
        this.hasCollision = this.hasCollision.bind(this);
    }

    hasCollision(wall){
        var brickWidth = this.canvasWidth/this.bricksPerRow;
        var brickHeight = this.canvasHeight/20;
        var collisionBrick = null;
        for(var i = 0; i < 8; i++){
            for(var j = 0; j < this.bricksPerRow; j++){
                if(wall[i][j]) {
                    var rx = Math.max(j*brickWidth,Math.min(j*brickWidth + brickWidth,this.position.x));
                    var ry = Math.max(i*brickHeight,Math.min(i*brickHeight + brickHeight,this.position.y));
                    var distSquared =
                        Math.pow(rx - this.position.x, 2) +
                        Math.pow(ry - this.position.y, 2);
                    if (distSquared < Math.pow(this.radius, 2)) {
                        collisionBrick = {x: i, y: j};
                    }
                }
            }
        }
        return collisionBrick;
    }

    update(paddleX, paddleHalfWidth, move, wall){
        var result = {
            collisionBrick: null,
            over: false
        };
        if(this.position.x + this.direction.x < this.radius
            || this.position.x + this.direction.x > this.canvasWidth-this.radius) {
            this.direction.x = -this.direction.x;
        }
        if(this.position.y + this.direction.y < this.radius) {
            this.direction.y = -this.direction.y;
        }
        else if(this.position.y + this.direction.y > this.canvasHeight-80) {
            if(this.position.x > paddleX-paddleHalfWidth && this.position.x < paddleX + paddleHalfWidth) {
                this.direction.y = -this.direction.y;
                // if(move != 's') {
                    this.direction.x = Math.sign(this.direction.x) * Math.round((Math.abs(paddleX - this.position.x) / 10 + 0.5) * 1000 / 1000);
                // }
            }
            else {
                if(this.position.y + this.direction.y > this.canvasHeight-40) {
                    result.over = true;
                }
            }
        }
        result.collisionBrick = this.hasCollision(wall);
        if(result.collisionBrick){
            this.direction.y = -this.direction.y;
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