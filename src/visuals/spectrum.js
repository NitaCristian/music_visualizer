function Spectrum() {
	this.name = "Spectrum";

	this.draw = function () {
		push();

		let spectrum = fourier.analyze();
		noStroke();

		for (let i = 0; i < spectrum.length; i += 5) {

			let g = map(spectrum[i], 0, 255, 255, 0);
			fill(spectrum[i], g, 0);

			let x = map(i, 0, spectrum.length, width / 2, width);
			let y = height / 2;
			let h = map(spectrum[i], 0, 255, 0, height / 5) + 1;
			let bar_width = width / spectrum.length;

			if (h == 0) continue;

			// Right - top, bottom
			rect(x, y, bar_width, -h);
			rect(x, y, bar_width, h);
			// Left - top, bottom>>
			rect(width - x, y, bar_width, -h);
			rect(width - x, y, bar_width, h);
		}
		pop();

	};
}
