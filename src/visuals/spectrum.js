
/** 
 * @desc Spectrum Visualisation
 */
class Spectrum {
	constructor() {
		/** @var {String} name Name of the visualisation*/
		this.name = "Spectrum";
		/** @var {Rain} rain Rain object which renders droples falling on the screen*/
		this.rain = new Rain();
	}
	draw() {
		// Draw the rain on the screen
		this.rain.draw();

		push();
		noStroke();
		let spectrum = fourier.analyze();
		for (let i = 0; i < spectrum.length; i += 5) {

			let g = map(spectrum[i], 0, 255, 255, 0);
			fill(spectrum[i], g, 0);

			// x position of each rectangle, starts in the middle of the canvas
			let x = map(i, 0, spectrum.length, width / 2, width);
			// y position of each rectangle, always in the middle of the canvas
			let y = height / 2;
			// h height of each rectangle based on the amplitude
			let h = map(spectrum[i], 0, 255, 0, height / 5) + 1;
			// bar_width width of each rectangle
			let bar_width = width / spectrum.length;

			// Draw the rectangle on the right side
			// Start at the height of the amplitude and 
			// draw it 2 * its size so its symmetric with respect to the x-axis 
			rect(x, y - h, bar_width, 2 * h);
			// Draw the rectangle on the left side, same as the right side
			rect(width - x, y - h, bar_width, 2 * h);
		}
		pop();
	}
}
