/** @class textBar
 * The text bar in a breakout game
 */
export default class TextBar {
    constructor(canvasWidth, canvasHeight){
        var positionY = canvasHeight - 13;
        this.score = {
            text: "Score: ",
            x: canvasWidth/2-50,
            y: positionY
        };
        this.title = {
            text: "GO CATS! Breakout",
            x: 20,
            y: positionY
        };
        this.lives = {
            text: "Lives: ",
            x: canvasWidth - 25,
            y: positionY
        };
        this.round = {
            text: "Round: ",
            number: 1,
            x: canvasWidth/2 + 100,
            y: positionY
        };

        // Bind class functions
        this.render = this.render.bind(this);
        this.upgradeRound = this.upgradeRound.bind(this);
    }

    upgradeRound(){
        this.round.number++;
    }

    render(ctx, score, lives){
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.fillRect(0, ctx.canvas.height - 50, ctx.canvas.width, 50);
        ctx.fillStyle = '#4B0082';
        ctx.font = 'bold 30px arial';
        ctx.textAlign = "left";
        ctx.fillText(this.title.text, this.title.x, this.title.y);
        ctx.font = 'bold 27px arial';
        ctx.fillText(this.score.text + score, this.score.x, this.score.y);
        ctx.textAlign = "left";
        ctx.fillText(this.round.text + this.round.number +"/2", this.round.x, this.round.y);
        ctx.textAlign = "right";
        ctx.fillText(this.lives.text + lives, this.lives.x, this.lives.y);
        ctx.restore();
    }
}