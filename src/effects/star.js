/** 
 * @desc Star Class used to create a Starfield
 */
class Star/* extends Particle*/ {
    constructor() {
        this.x = random(-width, width)
        this.y = random(-height, height)
        /** @var {Number} z position of the star, from back to front*/
        this.z = random(width);
    }

    /** 
     * @desc Function to update the position fo the star
     * @param {Number} speed The speed at which the star is moving
     */
    update(speed) {
        // Update z
        this.z = this.z - speed;
        // If z is out of bounds
        if (this.z < 1) {
            // Reset the coordinates of the star
            this.x = random(-width, width);
            this.y = random(-height, height);
            this.z = width;
        }
    }

    show() {
        noStroke();
        fill(255);
        // Draw the star
        let sx = map(this.x / this.z, 0, 1, 0, width);
        let sy = map(this.y / this.z, 0, 1, 0, height);
        // As the star gets closer to the edges, its size increases
        let r = map(this.z, 0, width, 16, 0);
        ellipse(sx, sy, r, r);
    }
}
