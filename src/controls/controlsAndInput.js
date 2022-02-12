//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput() {

	this.menuDisplayed = false;
	this.songsDisplayed = false;

	this.playbackButton = new PlaybackButton();
	this.videoBar = new VideoBar();
	this.nextSong = new NextSong();
	this.prevSong = new PreviousSong();
	this.volumeIcon = new VolumeIcon();

	this.mousePressed = function () {
		// return;
		this.playbackButton.hitCheck();
		this.videoBar.hitCheck();
		this.nextSong.hitCheck();
		this.prevSong.hitCheck();
		this.volumeIcon.hitCheck();
	};

	this.keyPressed = function (keycode) {
		// return;
		if (keycode == 32) { // spacebar
			if (sound.isPlaying()) {
				sound.pause();
			} else {
				sound.loop();
			}
			return;
		}

		if (keycode == 17) { // ctrl
			this.menuDisplayed = !this.menuDisplayed;
			return;
		}
		if (keycode == 16) {// shift
			this.songsDisplayed = !this.songsDisplayed;
			return;
		}

		if (keycode == 37) { // left arrow
			sound.jump(sound.currentTime() - 5)
			return;
		}
		if (keycode == 39) { // right arrow
			sound.jump(sound.currentTime() + 5)
			return;
		}

		if (keycode == 38) { // up arrow
			volume = min(1.0, volume + 0.1)
			sound.setVolume(volume)
			return;
		}
		if (keycode == 40) { // down arrow
			volume = max(0.0, volume - 0.1)
			sound.setVolume(volume)
			return;
		}

		if (keycode == 70) { // f
			fullscreen(!fullscreen());
			return;
		}

		if (keycode > 48 && keycode < 58) { // 1 - 9
			let visNumber = keycode - 49;
			if (visNumber < vis.visuals.length)
				vis.selectVisual(vis.visuals[visNumber].name);
			return;
		}
	};

	//draws the playback button and potentially the menu
	this.draw = function () {
		// return;
		push();
		fill("white");
		stroke("black");
		strokeWeight(2);

		this.playbackButton.draw();
		this.videoBar.draw();
		this.nextSong.draw();
		this.prevSong.draw();
		this.volumeIcon.draw();

		if (this.menuDisplayed) {
			textSize(34);
			text("Select a visualisation:", 100, 30);
			this.menu();
		}

		if (this.songsDisplayed) {
			textSize(34);
			this.showSongs()
		}
		pop();
	};

	this.menu = function () {
		for (var i = 0; i < vis.visuals.length; i++) {
			var yLoc = 70 + i * 40;
			text((i + 1) + ":  " + vis.visuals[i].name, 100, yLoc);
		}
	};

	this.showSongs = function () {
		//draw out menu items for each visualisation
		for (var i = 0; i < songList.length; i++) {
			var yLoc = 70 + i * 40;
			text((i + 1) + ":  " + songList[i], 600, yLoc);
		}
	}

	this.onResize = function () {
		// return;
		this.videoBar.onResize();
		this.playbackButton.onResize(width / 2 - 10, height - 50, 20, 20);
		this.nextSong.onResize(width / 2 + 60, height - 50, 20, 20);
		this.prevSong.onResize(width / 2 - 80, height - 50, 20, 20);
		this.volumeIcon.onresize();
	}
}
