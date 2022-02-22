////////////////////////////////////////////////////////////////////
// Credit to Microsoft for creating the original Mystify ScreenSaver
////////////////////////////////////////////////////////////////////
//
class Mystify {
    constructor() {
        this.name = "Mystify";
        this.setup(7);

        this.starField = new Starfield();
        this.starField.set(70);
    }

    setup(points) {
        this.particles = []
        for (let i = 0; i < points; i++) {
            this.particles.push(new Particle(random(200, width - 200), random(200, height - 200)));
            this.particles[i].vel = p5.Vector.random2D()
        }
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
            let force = particle.vel.copy()
            force.normalize()
            force.mult(amount / 10)
            particle.applyForce(force)
        }
    }

    setColor() {
        // let r = map(x, width / 2, width, 0, 255)
        let g = map(mouseY, 0, height, 0, 255);
        let b = map(mouseX, 0, width, 0, 255)
        stroke(100, g, b)
    }

    draw() {
        opacity = 100
        // this.starField.draw();

        fourier.analyze();
        let energy = fourier.getEnergy("highMid");

        push();

        if (energy >= 90) this.shake(energy / 5);
        this.update();
        this.setColor()

        for (let i = 0; i < this.particles.length; i++) {
            let current = this.particles[i];

            let n = (i + 1) % this.particles.length;
            let next = this.particles[n];

            let distance = 40;

            line(current.x + distance, current.y, next.x + distance, next.y);
            line(current.x, current.y, next.x, next.y);
            line(current.x - distance, current.y, next.x - distance, next.y);
        }
        pop();

    };
}
