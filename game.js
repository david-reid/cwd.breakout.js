
let fx;
let loop;
let fps = 1000/60;
let paddle;
let ball;
let bricks;

window.onload = function() {
    fx = new Fx('canvas');
    paddle = new Paddle(fx);
    ball = new Ball(fx);
    bricks = new Bricks(fx);
    addEventListener('mousemove', mouseMove);
}

window.onresize = function() {
    init();
}

function init() {
    fx.setCanvasToPageSize();
    ball.init();
    paddle.init();
    bricks.init();
}

function start() {
    init();
    loop = setInterval(update,fps);
}

function update() {
    move();
    draw();
}

function draw() {
    fx.fillCanvas("#2c3e50");
    bricks.draw();
    ball.draw();
    paddle.draw();
}

function move() {
    ball.move();
    ball.collisions(paddle,bricks);
}

function mouseMove(event) {
    paddle.moveWithMouse(event);
}

function startGame() {
    let startDiv = document.getElementById('start');
    let gameCanvas = document.getElementById('canvas');
    startDiv.style.display = 'none';
    gameCanvas.style.display = 'block';
    start();
}
