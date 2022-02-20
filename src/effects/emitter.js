// Credit to Coding Train: https://thecodingtrain.com/learning/nature-of-code/4.2-particle-emmiters.html
/** 
 * @desc Emitter Class that creates a shower of particles
 */
class Emitter {
  constructor(x, y) {
    /** @var {p5.Vector} Position of the emitter on the canvas*/
    this.pos = createVector(x, y);
    /** @var {Array} Array which holds all particles that will be shown*/
    this.particles = [];
  }
  /** 
   * @desc Set the number of particles to be shown
   * 
   * @param {Number} num Number of particles to be added
   */
  emit(num) {
    for (let i = 0; i < num; i++) {
      // 50/50 chance of a round particle or a square particle
      if (random(1) < 0.5) {
        this.particles.push(new Particle(this.pos.x, this.pos.y));
      }
      else {
        this.particles.push(new Confetti(this.pos.x, this.pos.y));
      }
    }
  }
  /** 
   * @desc Function to update the position of each particle
   */
  update() {
    // for every particle
    for (let particle of this.particles) {
      // apply gravity and update
      let gravity = createVector(0, 0.2);
      particle.applyForce(gravity);
      particle.update();
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      // if a particle's lifetime is 0
      if (this.particles[i].finished()) {
        // remove it
        this.particles.splice(i, 1);
      }
    }
  }
  /** 
   * @desc Function to show the particles to the screen
   */
  show() {
    for (let particle of this.particles) {
      particle.show();
    }
  }
}
