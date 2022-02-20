/** 
 * @desc Star Class used to create a Starfield
 */
class Star extends Particle {
    constructor() {
        super(random(-width, width), random(-height, height))
        /** @var {Number} z position of the star, from back to front*/
        this.z = random(width);
        /** @var {Number} previous z position*/
        this.prevZ = this.z;
    }
    /** 
     * @desc Function to update the position fo the star
     * 
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
            this.prevZ = this.z;
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

        // Draw a line fro the star to its previous position to give the illusion of movement
        let px = map(this.x / this.prevZ, 0, 1, 0, width);
        let py = map(this.y / this.prevZ, 0, 1, 0, height);
        this.prevZ = this.z;
        stroke(255);
        line(px, py, sx, sy);

    }
}
