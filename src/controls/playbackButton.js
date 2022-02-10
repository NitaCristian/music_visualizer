//displays and handles clicks on the playback button.
function PlaybackButton() {

	this.width = 20;
	this.height = 20;
	this.x = width / 2 - 10;
	this.y = height - 50;

	this.draw = function () {
		ellipse(this.x + 10, this.y + 10, 60)

		if (sound.isPlaying()) {
			rect(this.x, this.y, this.width / 2 - 2, this.height);
			rect(this.x + (this.width / 2 + 2), this.y, this.width / 2 - 2, this.height);
		}
		else {
			triangle(this.x, this.y, this.x + this.width, this.y + this.height / 2, this.x, this.y + this.height);
		}
	};

	//checks for clicks on the button, starts or pauses playabck.
	//@returns true if clicked false otherwise.
	this.hitCheck = function () {
		if (mouseX > this.x - 20 && mouseX < this.x + this.width + 20 && mouseY > this.y - 20 && mouseY < this.y + this.height + 20) {
			if (sound.isPlaying()) {
				sound.pause();
			} else {
				sound.loop();
			}
		}
	};

	this.onResize = function () {
		this.x = width / 2;
		this.y = height - 2 * this.height;
	};
}