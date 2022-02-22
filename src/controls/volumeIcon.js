/** 
 * Class to display a volume icon which shows the current volume
 *       and is used to mute the audio
 */
class VolumeIcon extends Button {
    constructor(x, y, w, h) {
        super(x, y, w, h)
    }

    /** 
     * Function which draws the icon to the canvas
     */
    draw() {
        fill('white')
        noStroke();
        // Draw the icon
        triangle(
            this.x + this.w, this.y,
            this.x, this.y + this.h / 2,
            this.x + this.w, this.y + this.h);
        rect(this.x - 1, this.y + 4, this.w / 1.7, this.h / 1.7)

        // If the volume is muted or at 0, display a red cross
        if (mute || volume == 0) {
            stroke('red')
            line(this.x, this.y, this.x + 20, this.y + 20)
            line(this.x + 20, this.y, this.x, this.y + 20)
        }
        // Display the volume
        textSize(15)
        textAlign(LEFT)
        text(((volume.toFixed(1)) * 100 * !mute).toString(), this.x, this.y + 40)
    }
}