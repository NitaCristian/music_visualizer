////////////////////////////////////////////////////////////////////
// Credit to Microsoft for creating the original Mystify ScreenSaver
////////////////////////////////////////////////////////////////////

/** 
 * Mystify Visualisation
 */
class Mystify {
    constructor() {
        /** Name of the visualisation*/
        this.name = "Mystify";
        // Make the visualisation use 7 points to draw shape
        this.setup(7);
        /** Starfield object to draw stars to the canvas*/
        this.starField = new Starfield();
    }

    /** 
     * Function to add 7 points to the particles array
     * @param {Number} points Number of points to be added
     */
    setup(points) {
        this.particles = []
        for (let i = 0; i < points; i++) {
            this.particles.push(new Particle(random(200, width - 200), random(200, height - 200)));
            this.particles[i].vel = p5.Vector.random2D()
        }
    }

    /** 
     * Function to update the particles
     */
    update() {
        for (let particle of this.particles) {
            particle.update();
            particle.drag();
            particle.edges();
        }
    }

    /** 
     * Function to make the particles move in different positions based on some amount
     * @param {Number} energy The energy used to send the particles flying in some direction
     */
    shake(energy) {
        // For every particle
        for (let particle of this.particles) {
            // Get the velocity
            let force = particle.vel.copy()
            // Make a normal vector 
            force.normalize()
            // Set its magnitude to be "energy"
            force.setMag(energy / 10)
            // Send the particle flying
            particle.applyForce(force)
        }
    }

    setColor() {
        // let r = map(x, width / 2, width, 0, 255)
        let g = map(mouseY, 0, height, 0, 255);
        let b = map(mouseX, 0, width, 0, 255)
        stroke(100, g, b)
    }

    /** 
     * Function to draw the figure based on the particles array
     * @param {Number} distance Distance from the original point in the particles array
     */
    drawFigure(distance) {
        noFill()
        beginShape()
        // For every particle
        for (let i = 0; i < this.particles.length; i++) {
            let current = this.particles[i];
            // Draw a vertex
            vertex(current.x + distance, current.y + distance)
        }
        endShape(CLOSE)
    }

    draw() {
        opacity = 100
        fourier.analyze();
        let energy = fourier.getEnergy("highMid");

        push();
        // Draw the starfield
        this.starField.draw();

        // If the energy is greater than some amount shake the points
        if (energy >= 90) this.shake(energy / 5);
        // Update the points
        this.update();
        // Set the color of the stroke
        this.setColor()
        // Draw figures
        this.drawFigure(0)
        this.drawFigure(50)
        this.drawFigure(-50)

        pop();

    };
}
