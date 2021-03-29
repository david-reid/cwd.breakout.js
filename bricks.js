
class Bricks {

    constructor(graphics) {
        this.fx = graphics;
        this.red = "#e74c3c";
        this.orange = "#e67e22";
        this.yellow = "#f1c40f";
        this.green = "#27ae60";
        this.color = this.green;

        this.brickWidth = 0;
        this.brickHeight = 0;
        this.brickGap = 0;
        this.columns = 11;
        this.rows = 1;
        this.grid = null;
        this.liveBricks = 0;
    }

    init() {
        this.reset();
    }

    reset() {
        this.brickWidth = Math.ceil(this.fx.width() / this.columns);
        this.brickHeight = this.fx.height() * 0.05;
        this.brickGap = this.fx.height() * 0.01;
        this.grid = Array(this.columns * this.rows);
        this.liveBricks = 0;

        for ( let i = 0; i < this.columns * this.rows; i++ ) {
            this.grid[i] = true;
            this.liveBricks++;
        }
    }

    draw() {
        for ( let eachRow=0; eachRow<this.rows; eachRow++) {
            for ( let eachCol=0; eachCol<this.columns; eachCol++) {
                let arrayIndex = this.rowColToArrayIndex(eachCol,eachRow);
                if ( this.grid[arrayIndex] == true ) {
                    this.colorPicker(eachRow);
                    this.fx.drawRect(
                        this.brickWidth*eachCol,
                        this.brickHeight*eachRow,
                        this.brickWidth-this.brickGap,
                        this.brickHeight-this.brickGap,
                        this.color
                    );
                }
            }
        }
    }

    rowColToArrayIndex(col,row) {
        return col + this.columns * row;
    }

    isBrickAtColRow(col,row) {
        if ( col >= 0 && col < this.columns && row >= 0 && row < this.rows ) {
            let brickIndexUnderCoord = this.rowColToArrayIndex(col,row);
            return this.grid[brickIndexUnderCoord];
        }
        return false;
    }

    colorPicker(row) {
        this.color = this.green;
        switch(row) {
            case 0:
            case 1:
                this.color = this.red;
                break;

            case 2:
            case 3:
                this.color = this.orange;
                break;

            case 4:
            case 5:
                this.color = this.yellow;
                break;
        }
    }

    isBrickCountZero() {
        return this.liveBricks == 0;
    }
}
