//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Credit to Coding Train: https://thecodingtrain.com/learning/nature-of-code/4.1-particle-system-simulation.html
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/** 
 * Confetti Class used to create square particles
 */
class Confetti extends Particle {
  constructor(x, y) {
    // Build the Confetti particle just like a normal Particle
    super(x, y)

    /** Angle to rotate a square particle*/
    this.angle = random(TWO_PI);

    /** Random direction in which a confetti particle will go*/
    this.vel = p5.Vector.random2D()
    this.vel.mult(random(3))

    /** Lifetime of a particle*/
    this.lifetime = 255
  }

  /** 
   * Function to update a confetti particle
   */
  update() {
    super.update()
    this.lifetime -= 3;
  }

  /** 
   * Function to render the particle
   */
  show() {
    push()
    translate(this.x, this.y)
    rotate(this.angle)

    noStroke();
    fill(255, this.lifetime)
    square(this.x, this.y, this.r)
    pop()
  }
}