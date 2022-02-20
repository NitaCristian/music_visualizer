/** 
 * @desc Drop Class which is used to create rain
 */
class Drop extends Particle {
    constructor() {
        super(random(width), random(-500, -50))
        /** @var {Number} z position of the rain*/
        this.z = random(0, 20);
        /** @var {Number} length of the drop based on the distance z*/
        this.len = map(this.z, 0, 20, 5, 10);
        /** @var {p5.Vector} speed at which the drop falls, closer drops fall faster*/
        this.vel = createVector(map(this.z, 0, 20, 1, 10), map(this.z, 0, 20, 1, 20))
    }
    /** 
     * @desc Function to update the drop
     */
    update() {
        // Apply gravity
        let gravity = createVector(0, map(this.z, 0, 20, 0, 0.1))
        super.applyForce(gravity)
        super.update()
        this.vel.limit(10)
    }
    /** 
     * @desc Function to detect when a drop is off screen
     */
    edges() {
        if (this.y > height) {
            this.x = random(width);
            this.y = random(-200, -100);
            this.vel.y = map(this.z, 0, 20, 4, 10);
            return;
        }
        if (this.x > width) {
            this.x = random(width);
            this.y = random(-200, -100);
            this.vel.x = map(this.z, 0, 20, 1, 10);
            return;
        }
    }
    /** 
     * @desc Function to show the drop of rain
     */
    show() {
        let thick = map(this.z, 0, 20, 1, 3);
        strokeWeight(thick);
        stroke(255);
        line(this.x, this.y, this.x, this.y + this.len);
    }
}