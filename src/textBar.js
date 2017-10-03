/** @class textBar
 * The text bar in a breakout game
 */
export default class TextBar {
    constructor(canvasWidth, canvasHeight){
        this.score = {
            text: "Score: ",
            points: 0,
            x: 20,
            y: canvasHeight - 13
        };
        this.title = {
            text: "GO CATS! Breakout",
            x: canvasWidth/2,
            y: canvasHeight - 13
        };

        // Bind class functions
        this.update = this.update.bind(this);
        this.render = this.render.bind(this);
    }

    update(score){
        this.score.points = score;
    }

    render(ctx){
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.fillRect(0, ctx.canvas.height - 50, ctx.canvas.width, 50);
        ctx.fillStyle = '#4B0082';
        ctx.font = 'bold 30px arial';
        ctx.textAlign = "left";
        ctx.fillText(this.score.text + this.score.points, this.score.x, this.score.y);
        ctx.textAlign = "center";
        ctx.fillText(this.title.text, this.title.x, this.title.y);
        ctx.restore();
    }
}