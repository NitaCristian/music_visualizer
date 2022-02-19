/** 
 * @desc Class to display a volume icon which shows the current volume
 *       and is used to mute the audio
 */
class VolumeIcon {
    constructor() {
        /** @var {Number} x coordinate of the volume icon*/
        this.x = width / 2 + 120;
        /** @var {Number} y coordinate of the volume icon*/
        this.y = height - 50;
        /** @var {Number} width of the volume icon*/
        this.width = 20;
        /** @var {Number} height of the volume icon*/
        this.height = 20;
        /** @var {Boolean} flag to keep track of whether the audio is muted*/
        this.mute = false;
    }
    /** 
     * @desc Function which draws the icon to the canvas
     */
    draw() {
        fill('white')
        noStroke();
        // Draw the icon
        triangle(
            this.x + this.width, this.y,
            this.x, this.y + this.height / 2,
            this.x + this.width, this.y + this.height);
        rect(this.x - 1, this.y + 4, this.width / 1.7, this.height / 1.7)

        // If the volume is muted or at 0, display a red cross
        if (this.mute || volume == 0) {
            stroke('red')
            line(this.x, this.y, this.x + 20, this.y + 20)
            line(this.x + 20, this.y, this.x, this.y + 20)
        }
        // Display the volume
        textSize(15)
        textAlign(LEFT)
        text(((volume.toFixed(1)) * 100 * !this.mute).toString(), this.x, this.y + 40)
    }
    /** 
     * @desc Function to mute the audio if the user presses the button
     */
    hitCheck() {
        if (volume == 0) return;
        if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
            this.mute = !this.mute
            if (this.mute) {
                sound.setVolume(0);
                return;
            }
            sound.setVolume(volume);
        }
    }
    /** 
     * @desc Function to resize the image based on canvas dimensions
     */
    onresize() {
        this.x = width / 2 + 120;
        this.y = height - 50;
        this.width = 20;
        this.height = 20;
    }
}