// Credit to Coding Train: https://thecodingtrain.com/learning/nature-of-code/4.1-particle-system-simulation.html

/** 
 * @desc Confetti Class used to create square particles
 */
class Confetti extends Particle {
  constructor(x, y) {
    // Build the Confetti particle just like a normal Particle
    super(x, y)
    /** @var {Number} Angle to rotate a square particle*/
    this.angle = random(TWO_PI);
  }
  /** 
   * @desc Function to render the particle
   */
  show() {
    fill(255, this.lifetime)
    noStroke();

    push()
    translate(this.x, this.y)
    rotate(this.angle)
    square(8, 0, this.r * 2)
    pop()
  }
}