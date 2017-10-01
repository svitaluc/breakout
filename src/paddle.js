/** @class Paddle
 * The paddle in a breakout game
 */
export default class Paddle {
    constructor(canvasWidth, canvasHeight){
        this.position = {x: canvasWidth/2, y: canvasHeight - 70};
        this.paddleWidth = canvasWidth/5;
        this.canvasWidth = canvasWidth;
        this.stepChange = 20;

        // Bind class functions
        this.update = this.update.bind(this);
        this.render = this.render.bind(this);
        this.getX = this.getX.bind(this);
        this.getWidth = this.getWidth.bind(this);
    }

    getX(){
        return this.position.x;
    }

    getWidth() {
        return this.paddleWidth;
    }

    update(inputMove){
        if(inputMove === 'l' && (this.position.x - this.paddleWidth/2 > 0)){
            this.position.x -= this.stepChange;
        }
        else if(inputMove === 'r' && (this.position.x + this.paddleWidth/2 < this.canvasWidth)){
            this.position.x += this.stepChange;
        }
    }

    render(ctx){
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.fillRect(this.position.x - this.paddleWidth/2, this.position.y, this.paddleWidth, 10);
        ctx.restore();
    }
}