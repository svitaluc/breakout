/** @class Paddle
 * The paddle in a breakout game
 */
export default class Paddle {
    constructor(canvasWidth, canvasHeight){
        this.position = {x: canvasWidth/2, y: canvasHeight - 70};
        this.paddleHalfWidth = canvasWidth/10;
        this.canvasWidth = canvasWidth;
        this.stepChange = 30;

        // Bind class functions
        this.update = this.update.bind(this);
        this.render = this.render.bind(this);
        this.getX = this.getX.bind(this);
        this.getHalfWidth = this.getHalfWidth.bind(this);
    }

    getX(){
        return this.position.x;
    }

    getHalfWidth() {
        return this.paddleHalfWidth;
    }

    update(inputMove){
        if(inputMove === 'l' && (this.position.x - this.paddleHalfWidth > 0)){
            this.position.x -= this.stepChange;
        }
        else if(inputMove === 'r' && (this.position.x + this.paddleHalfWidth < this.canvasWidth)){
            this.position.x += this.stepChange;
        }
    }

    render(ctx){
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.fillRect(this.position.x - this.paddleHalfWidth, this.position.y, this.paddleHalfWidth*2, 10);
        ctx.restore();
    }
}