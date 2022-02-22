/** 
 * Class used to add a Video Bar control to the screen
 */
class VideoBar {
    constructor() {
        /** x coordinate of the video bar*/
        this.x = 20

        /** y coordinate of the video bar*/
        this.y = height - 100

        /** width of the video bar*/
        this.width = width - 40

        /** height of the video bar*/
        this.height = 10
    }

    /** 
     * Function to draw the video bar
     */
    draw() {
        strokeWeight(0.8)
        fill('gray')
        rect(this.x, this.y, this.width, this.height, 10)

        // Amount of the song already progressed mapped to the dimensions of the video bar
        let l = map(song.currentTime(), 0, song.duration(), this.x, this.width);

        fill('red')
        rect(this.x, this.y, l, this.height, 10)
        ellipse(l + 14, this.y + 5, 15)
    }

    /** 
     * Function to check if the user has touched the video bar. 
     *       Used to jump to that position in the song
     */
    hitCheck() {
        if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
            let value = map(mouseX, this.x, this.width, 0, song.duration())
            song.jump(value);
        }
    };

    /** 
     * Function which handles any resize of the canvas
     */
    onResize() {
        this.y = height - 100
        this.width = width - 40
    }
}