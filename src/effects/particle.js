// Credit to Coding Train: https://thecodingtrain.com/learning/nature-of-code/4.1-particle-system-simulation.html


class Particle extends p5.Vector {
  constructor(x, y) {
    super(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(-2, 2));
    this.acc = createVector(0, 0);
    this.r = 8;
    this.lifetime = 255;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  edges() {
    if (this.y >= height - this.r) {
      this.y = height - this.r;
      this.vel.y *= -1;
    } else if (this.y <= 0 + this.r) {
      this.y = 0 + this.r;
      this.vel.y *= -1;
    }
    if (this.x >= width - this.r) {
      this.x = width - this.r;
      this.vel.x *= -1;
    } else if (this.x <= 0 + this.r) {
      this.x = 0 + this.r;
      this.vel.x *= -1;
    }
  }

  drag() {
    let drag = this.vel.copy()
    drag.normalize()
    drag.mult(-1)

    let c = 0.009
    let speedSq = this.vel.magSq()
    drag.setMag(c * speedSq)
    this.applyForce(drag)
  }

  finished() {
    return this.lifetime < 0;
  }

  update() {
    this.vel.add(this.acc);
    // this.vel.limit(10);
    this.add(this.vel);
    this.acc.set(0, 0);

    this.lifetime -= 5;
  }

  show() {
    stroke(255, this.lifetime);
    strokeWeight(2);
    fill(255, this.lifetime);
    ellipse(this.x, this.y, this.r * 2);
  }
}
