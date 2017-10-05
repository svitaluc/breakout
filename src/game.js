
import Paddle from './paddle.js';
import Wall from './wall.js';
import Ball from './ball.js';
import TextBar from './textBar.js';

/** @class Game
 * Represents a breakout game
 */
export default class Game {
    constructor() {
        this.resetVariables = this.resetVariables.bind(this);
        this.render = this.render.bind(this);
        this.update = this.update.bind(this);
        this.loop = this.loop.bind(this);
        this.renderGameOver = this.renderGameOver.bind(this);
        this.handleKeyDow = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);

        window.onkeydown = this.handleKeyDow;
        window.onkeyup = this.handleKeyUp;

        this.resetVariables();

        // Create the back buffer canvas
        this.backBufferCanvas = document.createElement('canvas');
        this.backBufferCanvas.width = this.width;
        this.backBufferCanvas.height = this.height;
        this.backBufferContext = this.backBufferCanvas.getContext('2d');

        // Create the screen buffer canvas
        this.screenBufferCanvas = document.createElement('canvas');
        this.screenBufferCanvas.width = this.width;
        this.screenBufferCanvas.height = this.height;
        document.body.appendChild(this.screenBufferCanvas);
        this.screenBufferContext = this.screenBufferCanvas.getContext('2d');

        // Bind class functions

        // Start the game loop
        this.loop();
    }

    resetVariables(){
        this.width = 800;
        this.height = 500;
        this.paddle = new Paddle(this.width, this.height);
        this.wall = new Wall(8);
        this.ball = new Ball(this.width, this.height, 8);
        this.remainingBricks = 8*8;
        this.textBar = new TextBar(this.width, this.height);
        this.inputMove =  's';
        this.ignoreLeft = false;
        this.ignoreRight = false;
        this.score = 0;
        this.audio = new Audio("smash.mp3");
        this.audioSad = new Audio("sad_trombone.mp3");
        this.audioVictory = new Audio("tada.mp3");
        this.audioFailure = new Audio("failure.mp3");
        this.lives = 3;
        this.firstRound = true;
        this.gameOverText = null;
    }

    update(){
        this.paddle.update(this.inputMove);
        this.result = this.ball.update(this.paddle.getX(), this.paddle.getHalfWidth(), this.wall.getWall());
        if(this.result.collisionBrick) {
            this.audio.play();
            this.remainingBricks = this.wall.update(this.result.collisionBrick);
            this.score += (7 - this.result.collisionBrick.x);
            if(this.result.collisionBrick.x % 2 === 1){
                this.score += 1;
            }
        }
        if(this.result.ballDown){
            if(this.lives === 1) {
                this.gameOverText = "YOU LOST!";
                this.audioFailure.play();
            }
            this.lives--;
            this.ball.resetBall();
            this.audioSad.play();
        }
        if(this.remainingBricks < 1){
            if(this.firstRound) {
                if(this.ball.getPosition().y > this.height/2) {
                    this.wall.resetWall();
                    this.paddle.makeHalfSize();
                    this.ball.upgradeSecondRound();
                    this.remainingBricks = 8*8;
                    this.firstRound = false;
                    this.textBar.upgradeRound();
                }
            }
            else {
                this.gameOverText = "YOU WIN!";
                this.audioVictory.play();
            }
        }
    }

    /** @method render
     * Renders the game world
     */
    render(){
        this.backBufferContext.fillStyle = '#4B0082';
        this.backBufferContext.fillRect(0, 0, this.width, this.height - 50);
        this.paddle.render(this.backBufferContext);
        this.wall.render(this.backBufferContext);
        this.ball.render(this.backBufferContext);
        if((this.remainingBricks === 64) || this.result.collisionBrick || this.result.ballDown) {
            this.textBar.render(this.backBufferContext, this.score, this.lives);
        }
        this.screenBufferContext.drawImage(this.backBufferCanvas,0,0);
    }

    renderGameOver(){
        this.backBufferContext.globalAlpha = 0.5;
        this.backBufferContext.fillStyle = "grey";
        this.backBufferContext.fillRect(0, 0, this.width, this.height);
        this.backBufferContext.globalAlpha = 1;
        this.backBufferContext.fillStyle = 'white';
        this.backBufferContext.fillRect(this.width/4, this.height/4, this.width/2, this.height/2);
        this.backBufferContext.fillStyle = '#4B0082';
        this.backBufferContext.font = 'bold 40px arial';
        this.backBufferContext.textAlign = "center";
        this.backBufferContext.fillText(this.gameOverText, this.width/2, this.height/8*3);
        this.backBufferContext.font = 'bold 30px arial';
        this.backBufferContext.fillText("Your final score: " + this.score, this.width/2, this.height/2);
        this.backBufferContext.font = 'bold 20px arial';
        this.backBufferContext.fillText("Press [spacebar] to play a new game", this.width/2, this.height/8*5);
        this.screenBufferContext.drawImage(this.backBufferCanvas,0,0);
    }

    loop() {
        if(this.gameOverText){
            this.renderGameOver();
            return;
        }
        this.update();
        this.render();
        requestAnimationFrame(this.loop);
    }

    handleKeyDown(event) {
        event.preventDefault();
        switch (event.key) {
            case 'a':
            case 'ArrowLeft':
                if(this.inputMove === 'r'){
                    this.ignoreRight = true;
                }
                if(!this.ignoreLeft) {
                    this.inputMove = 'l';
                }
                break;
            case 'd':
            case 'ArrowRight':
                if(this.inputMove === 'l'){
                    this.ignoreLeft = true;
                }
                if(!this.ignoreRight) {
                    this.inputMove = 'r';
                }
                break;
            case ' ':
                if(this.gameOverText){
                    this.resetVariables();
                    this.loop();
                    this.textBar.render(this.backBufferContext, this.score, this.lives);
                }
                break;
        }
    }

    handleKeyUp(event) {
        event.preventDefault();
        switch (event.key) {
            case 'a':
            case 'ArrowLeft':
                if(this.inputMove === 'l') {
                    this.inputMove = 's';
                }
                this.ignoreLeft = false;
                break;
            case 'd':
            case 'ArrowRight':
                if(this.inputMove === 'r') {
                    this.inputMove = 's';
                }
                this.ignoreRight = false;
        }
    }
}