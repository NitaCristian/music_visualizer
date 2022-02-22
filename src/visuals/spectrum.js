
/** 
 * @desc Spectrum Visualisation
 */
class Spectrum {
	constructor() {
		/** @var {String} Name of the visualisation*/
		this.name = "Spectrum";

		/** @var {Rain} Rain object which renders droples falling */
		this.rain = new Rain();
	}

	draw() {
		opacity = 255

		push();
		// Draw the rain on the screen
		this.rain.draw();

		noStroke();
		let spectrum = fourier.analyze();
		for (let i = 0; i < spectrum.length; i += 5) {

			// x position of each rectangle, starts in the middle of the canvas
			let x = map(i, 0, spectrum.length, width / 2, width);
			// y position of each rectangle, always in the middle of the canvas
			let y = height / 2;

			// h height of each rectangle based on the amplitude
			let h = map(spectrum[i], 0, 255, 0, height / 5) + 1;
			// bar_width width of each rectangle
			let bar_width = width / spectrum.length;

			// Color of each rectangle
			let r = map(x, width / 2, width, 0, 255)
			let g = map(mouseY, 0, height, 0, 255);
			let b = map(mouseX, 0, width, 0, 255)
			fill(r, g, b);

			// Draw the rectangle on the right side
			rect(x, y - h, bar_width, 2 * h);
			// Draw the rectangle on the left side
			rect(width - x, y - h, bar_width, 2 * h);
		}
		pop();
	}
}
