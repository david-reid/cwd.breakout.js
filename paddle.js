
class Paddle {

    constructor(graphics) {
        this.fx = graphics;
        this.color = "#ecf0f1";
        this.xpos = 0;
        this.ypos = 0;
        this.width = 0;
        this.height = 0;
    }

    init() {
        this.height = this.fx.height() * 0.05;
        this.width = this.fx.width() * 0.15;
        this.ypos = this.fx.height() * 0.95 - this.height/2;
        this.xpos = this.fx.width()/2 - this.width/2;
    }

    draw() {
        this.fx.drawRect(this.xpos,this.ypos, this.width,this.height, this.color);
    }

    moveWithMouse(event) {
        let rect = this.fx.getCanvas().getBoundingClientRect();
        let root = document.documentElement;
        let mouseX = event.clientX - rect.left - root.scrollLeft;
        this.xpos = mouseX - this.width/2;
    }
}
