/** @class Wall
 * The wall of bricks in a breakout game
 */
export default class Wall {
    constructor(bricksPerRow){
        this.wall = [];
        this.bricksPerRow = bricksPerRow;
        this.remainingBricks = bricksPerRow * 8;
        for(var i = 0; i < 8; i++) {
            this.wall[i] = [];
            for (var j = 0; j < this.bricksPerRow; j++) {
                this.wall[i][j] = true;
            }
        }

        // Bind class functions
        this.update = this.update.bind(this);
        this.render = this.render.bind(this);
        this.getWall = this.getWall.bind(this);
        this.resetWall = this.resetWall.bind(this);
    }

    getWall(){
        return this.wall;
    }

    resetWall(){
        for(var i = 0; i < 8; i++) {
            this.wall[i] = [];
            for (var j = 0; j < this.bricksPerRow; j++) {
                this.wall[i][j] = true;
            }
        }
        this.remainingBricks = this.bricksPerRow * 8;
    }

    update(collisionBrick){
        this.wall[collisionBrick.y][collisionBrick.x] = false;
        this.remainingBricks--;
        return this.remainingBricks;
    }

    render(ctx){
        var brickWidth = (ctx.canvas.width-7)/this.bricksPerRow;
        var brickHeight = ctx.canvas.height/20;

        for(var i = 0; i < 8; i++){
            for(var j = 0; j < this.bricksPerRow; j++) {
                if(!this.wall[i][j])
                    continue;

                ctx.save();
                switch(i){
                    case 0:
                        ctx.fillStyle = (j % 2 === 0)? 'red' : 'darkred';
                        break;
                    case 1:
                        ctx.fillStyle = (j % 2 === 0)? 'darkred' : 'red';
                        break;
                    case 2:
                        ctx.fillStyle = (j % 2 === 0)? 'darkorange' : 'gold';
                        break;
                    case 3:
                        ctx.fillStyle = (j % 2 === 0)? 'gold' : 'darkorange';
                        break;
                    case 4:
                        ctx.fillStyle = (j % 2 === 0)? 'green' : '#00FF00';
                        break;
                    case 5:
                        ctx.fillStyle = (j % 2 === 0)? '#00FF00' : 'green';
                        break;
                    case 6:
                        ctx.fillStyle = (j % 2 === 0)? 'yellow' : '#FFFF99';
                        break;
                    case 7:
                        ctx.fillStyle = (j % 2 === 0)? '#FFFF99' : 'yellow';
                        break;
                }
                ctx.clearRect(j+brickWidth * j, i + brickHeight * i, brickWidth, brickHeight);
                ctx.fillRect(j+brickWidth * j, i + brickHeight * i, brickWidth, brickHeight);
                ctx.restore();
            }
        }
    }
}