/////////////////////////////////////////////////////////////////////
// Credit: Coding Train - https://www.youtube.com/watch?v=2O3nm0Nvbi4
/////////////////////////////////////////////////////////////////////

/** 
 * @desc Equalizer Visualisation
 */
class Equalizer {
	constructor() {
		/** @var {String} Name of the current visualisation*/
		this.name = "Circle Equalizer";

		/** @var {Emitter} Emitter object which emitts a shower of particles*/
		this.emitter = new Emitter(0, 0)
	}

	draw() {
		opacity = 180

		push();
		angleMode(DEGREES);
		// Translate the 0,0 coordinate to the center of the canvas
		translate(width / 2, height / 2);
		// Translate the 0,0 coordinate in a circle path using the cos() and sin() functions
		translate(cos(frameCount) * 50, sin(frameCount) * 30);

		// Add, update and show particle
		if (frameCount % 10) this.emitter.emit(1)
		this.emitter.show()

		// Draw a circle
		fill(0)
		circle(0, 0, 200, 200)

		stroke(255);
		// Rotate clockwise
		rotate(frameCount / 5);
		this.drawWaveForm();
		noFill();
		this.drawEqualizer();

		// Rotate counter-clockwise
		rotate(-frameCount / 5);
		this.drawPeaks();

		pop();
	};

	/** 
	 * @desc Draw the peaks of the current song
	 */
	drawPeaks() {
		beginShape()
		// For every peak in the peaks array
		for (let i = 0; i < peaks.length; i += 20) {
			// x coordinate of the peak from -90 to 90
			let x = map(i, 0, peaks.length, -90, 90)
			vertex(x, peaks[i] * 50)
		}
		endShape()
	}

	drawEqualizer() {
		let spectrum = fourier.analyze();
		beginShape();
		// For every amplitude
		for (let i = 0; i < spectrum.length; i += 10) {
			// Determine an angle for the current amplitude
			// first amplitude - angle 0, second amplitude - angle x, ...
			let angle = map(i, 0, spectrum.length, 0, 360);
			// Map the value of the amplitude 
			let r = map(spectrum[i], 0, 256, 100, 300);
			// Determine the x,y coordinates of the point for this aplitude 
			let x = r * cos(angle);
			let y = r * sin(angle);
			// Draw a curved line between points
			curveVertex(x, y);
			// Draw a line from the point x,y to the base of the circle
			line(x, y, cos(angle) * 100, sin(angle) * 100)
		}
		endShape(CLOSE);

	}

	drawWaveForm() {
		fill(0)
		let spectrum = fourier.waveform();
		beginShape();
		// For every amplitude
		for (let i = 0; i < spectrum.length - 100; i += 15) {
			// Determine an angle for the current amplitude
			let angle = map(i, 0, spectrum.length - 100, 0, 360);
			// Map the value of the amplitude
			let r = map(spectrum[i], -1, 1, 80, 400);
			// Determine the x,y coordinates of the current amplitude
			let x = r * cos(angle);
			let y = r * sin(angle);
			// Draw a curve vertex between points
			curveVertex(x, y);
		}
		endShape(CLOSE);
	}
}