/////////////////////////////////////////////////////////////////////////////////////////
// Credit to Coding Train: https://thecodingtrain.com/CodingChallenges/001-starfield.html
/////////////////////////////////////////////////////////////////////////////////////////

/** 
 * Star Class used to create a Starfield
 */
class Star {
    constructor() {
        /**x position of the star*/
        this.x = random(-width, width)

        /**y position of the star*/
        this.y = random(-height, height)

        /**z position of the star, from back to front*/
        this.z = random(width);
    }

    /** 
     * Function to update the position fo the star
     * @param {Number} speed The speed at which the star is moving
     */
    update(speed) {
        this.z = this.z - speed;
    }

    outOfBounds() {
        return this.z < 1
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
