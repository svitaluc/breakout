/** @class Ball
 * The ball in a breakout game
 */
export default class Ball {
    constructor(canvasWidth, canvasHeight){
        this.position = {x: canvasWidth/2, y: canvasHeight - 80};
        this.radius = 10;
        this.direction = {x: 5, y: -5};
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        // Bind class functions
        this.update = this.update.bind(this);
        this.render = this.render.bind(this);
    }

    update(paddleX, paddleWidth){
        if(this.position.x + this.direction.x < this.radius
            || this.position.x + this.direction.x > this.canvasWidth-this.radius) {

            this.direction.x = -this.direction.x;
        }
        if(this.position.y + this.direction.y < this.radius) {
            this.direction.y = -this.direction.y;
        }
        else if(this.position.y + this.direction.y > this.canvasHeight-80) {
            if(this.position.x > paddleX-paddleWidth/2 && this.position.x < paddleX + paddleWidth/2) {
                this.direction.y = -this.direction.y;
            }
            else {
                //TODO game over
            }
        }
        this.position.x += this.direction.x;
        this.position.y += this.direction.y;
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