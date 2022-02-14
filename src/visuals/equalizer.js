/////////////////////////////////////////////////////////////////////
// Credit: Coding Train - https://www.youtube.com/watch?v=2O3nm0Nvbi4
/////////////////////////////////////////////////////////////////////

class Equalizer {
	constructor() {
		this.name = "Circle Equalizer";
	}

	draw() {
		push();
		noFill();
		stroke(255);

		angleMode(DEGREES);
		translate(width / 2, height / 2);
		translate(cos(frameCount) * 50, sin(frameCount) * 30);

		rotate(-frameCount / 5);
		this.drawPeaks();

		rotate(frameCount / 5);
		this.drawEqualizer();
		this.drawWaveForm();

		pop();
	};

	drawPeaks() {
		beginShape()
		for (let i = 0; i < peaks.length; i += 20) {
			let x = map(i, 0, peaks.length, -90, 90)
			vertex(x, peaks[i] * 50)
		}
		endShape()
	}

	drawEqualizer() {
		let spectrum = fourier.analyze();
		beginShape();
		for (let i = 0; i < spectrum.length; i += 10) {
			let angle = map(i, 0, spectrum.length, 0, 360);
			let r = map(spectrum[i], 0, 256, 100, 300);
			let x = r * cos(angle);
			let y = r * sin(angle);
			curveVertex(x, y);
			line(x, y, cos(angle) * 100, sin(angle) * 100)
		}
		circle(0, 0, 200, 200)
		endShape(CLOSE);
	}

	drawWaveForm() {
		let spectrum = fourier.waveform();
		beginShape();
		for (let i = 0; i < spectrum.length - 100; i += 10) {
			let angle = map(i, 0, spectrum.length - 100, 0, 360);
			let val = map(spectrum[i], -1, 1, 0, height)
			let r = map(val, 0, 256, 80, 200);
			let x = r * cos(angle);
			let y = r * sin(angle);
			curveVertex(x, y);
		}
		endShape(CLOSE);
	}
}