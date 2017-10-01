
import Paddle from './paddle.js';
import Wall from './wall.js';
import Ball from './ball.js';

/** @class Game
 * Represents a breakout game
 */
export default class Game {
    constructor() {
        this.width = 800;
        this.height = 500;
        this.paddle = new Paddle(this.width, this.height);
        this.wall = new Wall();
        this.ball = new Ball(this.width, this.height);
        this.inputMove =  's';

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
        this.render = this.render.bind(this);
        this.update = this.update.bind(this);
        this.loop = this.loop.bind(this);
        this.handleKeyDow = this.handleKeyDown.bind(this);

        window.onkeydown = this.handleKeyDow;

        // Start the game loop
        this.interval = setInterval(this.loop, 50);
    }

    update(){
        this.paddle.update(this.inputMove);
        this.ball.update(this.paddle.getX(), this.paddle.getWidth());
        this.inputMove = 's';
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
        this.screenBufferContext.drawImage(this.backBufferCanvas,0,0);
    }

    loop() {
        this.update();
        this.render();
    }

    handleKeyDown(event) {
        event.preventDefault();
        switch (event.key) {
            case 'a':
            case 'ArrowLeft':
                this.inputMove = 'l';
                break;
            case 'd':
            case 'ArrowRight':
                this.inputMove = 'r';
                break;
        }
    }
}