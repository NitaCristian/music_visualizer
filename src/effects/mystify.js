// Credit ot Microsoft for Windows Mystify Screensaver
// Credit to Coding Train for Drag force: https://thecodingtrain.com/learning/nature-of-code/2.4-drag.html

class MystifyParticles {
    constructor(points) {
        this.particles = [];
        this.setup(points);
    }

    update() {
        for (let particle of this.particles) {
            particle.update();
            particle.drag();
            particle.edges();
        }
    }

    shake(amount) {
        for (let particle of this.particles) {
            let force = createVector(
                random(-amount, amount),
                random(-amount, amount)
            );
            particle.applyForce(force);
        }
    }

    show(myColor) {
        stroke(myColor);
        let offset = 50;
        for (let i = 0; i < this.particles.length; i++) {
            let n = (i + 1) % this.particles.length;
            let current = this.particles[i];
            let next = this.particles[n];
            line(current.x + offset, current.y, next.x + offset, next.y);
            line(current.x, current.y, next.x, next.y);
            line(current.x - offset, current.y, next.x - offset, next.y);
        }
    }

    setup(points) {
        for (let i = 0; i < points; i++) {
            this.particles.push(new Particle(random(200, width - 200), random(200, height - 200)));
        }
    }
}
