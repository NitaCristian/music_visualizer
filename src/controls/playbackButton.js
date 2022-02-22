/** 
 * @desc Class to display and handle clicks on the playback button.
 */
class PlaybackButton extends Button {
	constructor(x, y, w, h) {
		super(x, y, w, h)
	}

	draw() {
		super.draw()

		if (song.isPlaying()) {
			rect(this.x, this.y, this.w / 2 - 2, this.h);
			rect(this.x + (this.w / 2 + 2), this.y, this.w / 2 - 2, this.h);
		}
		else {
			triangle(this.x, this.y, this.x + this.w, this.y + this.h / 2, this.x, this.y + this.h);
		}
	}
}
