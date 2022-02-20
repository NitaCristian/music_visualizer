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
    /** @var {p5.Vector} Random direction in which a confetti particle will go*/
    this.vel = p5.Vector.random2D()
    this.vel.mult(random(3))
    /** @var {Number} Lifetime of  a particle*/
    this.lifetime = 255
  }
  /** 
   * @desc Function to update a confetti particle
   */
  update() {
    super.update()
    this.lifetime -= 2;
  }
  /** 
   * @desc Function to render the particle
   */
  show() {
    noStroke();
    fill(255, this.lifetime)

    push()
    translate(this.x, this.y)
    rotate(this.angle)
    square(this.x, this.y, this.r)
    pop()
  }
}