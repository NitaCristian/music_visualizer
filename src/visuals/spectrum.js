function Spectrum() {
	this.name = "Spectrum";

	this.draw = function () {
		push();

		let spectrum = fourier.analyze();
		noStroke();

		for (let i = 0; i < spectrum.length; i += 6) {

			let g = map(spectrum[i], 0, 255, 255, 0);
			fill(spectrum[i], g, 0);

			let x = map(i, 0, spectrum.length, width / 2, width);
			let y = height / 2;
			let h = map(spectrum[i], 0, 255, 0, height / 5) + 1;
			let bar_width = width / spectrum.length;

			// Right
			rect(x, y - h, bar_width, 2 * h);
			// Left 
			rect(width - x, y - h, bar_width, 2 * h);
		}
		pop();

	};
}
