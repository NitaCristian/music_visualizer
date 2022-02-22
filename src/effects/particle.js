// Credit to Coding Train: https://thecodingtrain.com/learning/nature-of-code/4.1-particle-system-simulation.html

/** 
 * @desc Particle Class to create particles
 */
class Particle extends p5.Vector {
  constructor(x, y) {
    super(x, y);

    /** @var {p5.Vector} Velocity of the particle*/
    this.vel = createVector(0, 0);

    /** @var {p5.Vector} Acceleration of the particle*/
    this.acc = createVector(0, 0);

    /** @var {Number} Radius of the particle*/
    this.r = 8;
  }

  /** 
   * @desc Function to apply a given force to the particle
   * @param {p5.Vector} force Force to be applied
   */
  applyForce(force) {
    this.acc.add(force);
  }

  /** 
   * @desc Collision detection function. Makes the particle bounce back when hitting the edges
   */
  edges() {
    if (this.y >= height - this.r) {
      this.y = height - this.r;
      this.vel.y *= -1;
      return;
    }
    if (this.y <= 0 + this.r) {
      this.y = 0 + this.r;
      this.vel.y *= -1;
      return;
    }
    if (this.x >= width - this.r) {
      this.x = width - this.r;
      this.vel.x *= -1;
      return
    }
    if (this.x <= 0 + this.r) {
      this.x = 0 + this.r;
      this.vel.x *= -1;
      return;
    }
  }

  /** 
   * @desc Function to add drag to a particle, making it slow down
   */
  drag() {
    // Make a copy of the velocity
    let drag = this.vel.copy()
    // Make it a normal vector
    drag.normalize()
    // Make it point in the opposite direction
    drag.mult(-1)

    let c = 0.009
    let speedSq = this.vel.magSq()
    drag.setMag(c * speedSq)
    this.applyForce(drag)
  }

  /** 
   * @desc Function to update a particle's position
   */
  update() {
    this.vel.add(this.acc);
    this.add(this.vel);
    this.acc.set(0, 0);
  }
}
