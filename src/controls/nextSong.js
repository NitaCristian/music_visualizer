/** 
 * Class to add a button which changes to the next song
 */
class NextSong extends Button {
    constructor(x, y, w, h) {
        super(x, y, w, h)
    }

    draw() {
        super.draw()
        triangle(this.x, this.y, this.x + this.w, this.y + this.h / 2, this.x, this.y + this.h);
        triangle(this.x + 10, this.y, this.x + this.w + 10, this.y + this.h / 2, this.x + 10, this.y + this.h);
    }
}