/////////////////////////////////////////////////////////////////////
// Credit: Coding Train - https://www.youtube.com/watch?v=2O3nm0Nvbi4
/////////////////////////////////////////////////////////////////////

function Equalizer() {
	this.name = "Circle Equalizer";

	this.draw = function () {
		push();

		fill(255);
		stroke(255);

		translate(width / 2, height / 2);
		angleMode(DEGREES);

		let spectrum = fourier.analyze();

		beginShape();
		for (let i = 0; i < spectrum.length; i += 1) {
			let angle = map(i, 0, spectrum.length, 0, 360);
			let r = map(spectrum[i], 0, 256, 20, 300);

			let x = r * cos(angle);
			let y = r * sin(angle);

			vertex(x, y);
		}
		endShape();

		pop();
	};
}