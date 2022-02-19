//displays and handles clicks on the playback button.
class PlaybackButton extends Button {
	constructor() {
		super(width / 2 - 10, height - 50, 20, 20)
	}

	draw() {
		strokeWeight(1)
		ellipse(this.x + 10, this.y + 10, 60)

		if (sound.isPlaying()) {
			rect(this.x, this.y, this.width / 2 - 2, this.height);
			rect(this.x + (this.width / 2 + 2), this.y, this.width / 2 - 2, this.height);
		}
		else {
			triangle(this.x, this.y, this.x + this.width, this.y + this.height / 2, this.x, this.y + this.height);
		}
	}

	hitCheck() {
		if (mouseX > this.x - 20 && mouseX < this.x + this.width + 20 && mouseY > this.y - 20 && mouseY < this.y + this.height + 20) {
			if (sound.isPlaying()) {
				sound.pause();
			} else {
				sound.loop();
			}
		}
	}
}
