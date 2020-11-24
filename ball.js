
class Ball {

    constructor(graphics) {
        this.fx = graphics;
        this.color = "#ecf0f1";
        this.xpos = 0;
        this.ypos = 0;
        this.xvel = 0;
        this.yvel = 0;
        this.size = 0;
    }

    init() {
        this.size = this.fx.height() * 0.03;
        this.xpos = this.fx.width()/2 - this.size/2;
        this.ypos = this.fx.height()/2 - this.size/2;
        this.yvel = this.fx.width() * 0.005;
        this.xvel = 0;
    }

    reset() {
        this.init();
    }

    draw() {
        this.fx.drawRect(this.xpos,this.ypos, this.size,this.size, this.color);
    }

    move() {
        this.xpos += this.xvel;
        this.ypos += this.yvel;
    }

    collisions(paddle,bricks) {
        this.checkForCollisionsWith(paddle);
        this.checkForPerimeterCollisions();
        this.checkForBrickCollisions(bricks);
    }

    checkForCollisionsWith(paddle) {
        if ( this.checkForCollisions(paddle,this) ) {
            this.yvel *= -1;
            let centerOfPaddleX = paddle.xpos + paddle.width/2;
            let ballDistFromPaddleCenterX = this.xpos - centerOfPaddleX;
            this.xvel = ballDistFromPaddleCenterX * 0.05;
        }
    }

    checkForPerimeterCollisions() {
        if ( this.ypos < 0 ) {
            this.yvel = -this.yvel;
        }
        if ( this.ypos > this.fx.height() ) {
            this.reset();
        }
        if ( this.xpos < 0 || this.xpos > this.fx.width() - this.size) {
            this.xvel = -this.xvel;
        }
    }

    checkForCollisions(a,b) {

        let aLeftOfB = ( a.xpos + a.width ) < ( b.xpos );
        let aRightOfB = ( a.xpos ) > ( b.xpos + b.size );
        let aAboveB = ( a.ypos ) > ( b.ypos + b.size );
        let aBelowB = ( a.ypos + a.height ) < ( b.ypos );

        return !( aLeftOfB || aRightOfB || aAboveB || aBelowB );
    }

    checkForBrickCollisions(bricks) {

        let ballBrickCol = Math.floor((this.xpos + this.size/2)/bricks.brickWidth);
        let ballBrickRow = Math.floor((this.ypos + this.size/2)/bricks.brickHeight);
        let brickIndexUnderBall = bricks.rowColToArrayIndex(ballBrickCol,ballBrickRow);

        if ( ballBrickCol >= 0
            && ballBrickCol < bricks.columns
            && ballBrickRow >= 0
            && ballBrickRow < bricks.rows ) {

            if ( bricks.isBrickAtColRow(ballBrickCol,ballBrickRow) ) {
                bricks.grid[brickIndexUnderBall] = false;
                bricks.count--;

                let prevBallX = this.xpos - this.xvel;
                let prevBallY = this.ypos - this.yvel;
                let prevBrickCol = Math.floor(prevBallX / bricks.brickWidth);
                let prevBrickRow = Math.floor(prevBallY / bricks.brickHeight);
                let bothTestsFailed = true;

                if ( prevBrickCol != ballBrickCol ) {
                    if ( bricks.isBrickAtColRow(prevBrickCol,ballBrickCol) == false ) {
                        this.xvel *= -1;
                        bothTestsFailed = false;
                    }
                }
                if ( prevBrickRow != ballBrickRow ) {
                    if ( bricks.isBrickAtColRow(prevBrickRow,ballBrickRow) == false ) {
                        this.yvel *= -1;
                        bothTestsFailed = false;
                    }
                }
                if ( bothTestsFailed ) {
                    this.xvel *= -1;
                    this.yvel *= -1;
                }
            }
        }
    }
}
