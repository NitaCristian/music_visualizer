////////////////////////////////////////////////////////////////////
// Credit to Microsoft for creating the original Mystify ScreenSaver
////////////////////////////////////////////////////////////////////

class Mystify {
    constructor(points) {
        this.name = "Mystify";
        this.particles = [];
        this.setup(points);

        this.offset = 0;
        this.colors = [color(255, 0, 0), color(125, 125, 0), color(0, 255, 0), color(0, 125, 125), color(0, 0, 255), color(125, 0, 125)];
        this.current_index = 0;
        this.current_color = this.colors[0];

        this.starField = new Starfield();
        this.starField.emit(100);
    }

    setup(points) {
        for (let i = 0; i < points; i++) {
            this.particles.push(new Particle(random(200, width - 200), random(200, height - 200)));
        }
    }

    update_color() {
        let next_index = (this.current_index + 1) % this.colors.length;
        this.current_color = lerpColor(this.colors[this.current_index], this.colors[next_index], this.offset);

        if (this.current_color.toString() === this.colors[next_index].toString()) {
            this.current_index = next_index;
            this.offset = 0;
        }
        this.offset += 0.01;
    }

    update() {
        for (let particle of this.particles) {
            particle.update();
            particle.drag();
            particle.edges();
        }
        this.update_color();
    }

    shake(amount) {
        for (let particle of this.particles) {
            let force = createVector(random(-amount, amount), random(-amount, amount));
            particle.applyForce(force);
        }
    }

    show() {
        stroke(this.current_color);
        let distance = 50;
        for (let i = 0; i < this.particles.length; i++) {
            let n = (i + 1) % this.particles.length;
            let current = this.particles[i];
            let next = this.particles[n];
            line(current.x + distance, current.y, next.x + distance, next.y);
            line(current.x, current.y, next.x, next.y);
            line(current.x - distance, current.y, next.x - distance, next.y);
        }
    }

    draw() {
        this.starField.draw();

        fourier.analyze();
        let energy = fourier.getEnergy("highMid");

        push();
        if (energy >= 90)
            this.shake(energy / 10);

        this.update();
        this.show();
        pop();

    };
}
