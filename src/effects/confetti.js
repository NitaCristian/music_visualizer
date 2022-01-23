// Credit to Coding Train: https://thecodingtrain.com/learning/nature-of-code/4.1-particle-system-simulation.html

class Confetti extends Particle {
  constructor(x, y) {
    super(x, y)
    this.angle = random(TWO_PI);
  }

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