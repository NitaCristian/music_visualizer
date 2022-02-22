//////////////////////////////////////////////////////////////////////////////////////////
// Credit to Coding Train: https://thecodingtrain.com/CodingChallenges/004-purplerain.html
//////////////////////////////////////////////////////////////////////////////////////////


/** 
 * Drop Class which is used to create rain
 */
class Drop extends Particle {
    constructor() {
        super(random(-200, width - 200), random(-500, -50))

        /** z position of the rain*/
        this.z = random(0, 20);

        /** Length of the drop based on the distance z*/
        this.len = map(this.z, 0, 20, 5, 10);

        /** Speed at which the drop falls, closer drops fall faster*/
        this.vel = createVector(map(this.z, 0, 20, 1, 10), map(this.z, 0, 20, 1, 20))

        /** Color of each drop*/
        this.color = color(random(255), random(255), random(255))
    }

    /** 
     * Function to update the drop
     */
    update() {
        // Apply gravity
        let gravity = createVector(0, map(this.z, 0, 20, 0, 0.1))
        super.applyForce(gravity)
        super.update()
        this.vel.limit(10)
    }

    outOfBounds() {
        return (this.y > height || this.x > width)
    }

    /** 
     * Function to show the drop of rain
     */
    show() {
        let thick = map(this.z, 0, 20, 1, 3);
        strokeWeight(thick);
        stroke(this.color);
        line(this.x, this.y, this.x, this.y + this.len);
    }
}