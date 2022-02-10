//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput() {

	this.menuDisplayed = false;
	this.songsDisplayed = false;
	//playback button displayed in the top left of the screen
	this.playbackButton = new PlaybackButton();

	this.videoBar = new VideoBar();

	this.nextprevSong = new NextPrevSong();

	//make the window fullscreen or revert to windowed
	this.mousePressed = function () {
		// if (!this.playbackButton.hitCheck()) {
		// 	var fs = fullscreen();
		// 	fullscreen(!fs);
		// }
		this.playbackButton.hitCheck();
		this.videoBar.hitCheck();
		this.nextprevSong.hitCheck();
	};

	//responds to keyboard presses
	//@param keycode the ascii code of the keypressed
	this.keyPressed = function (keycode) {
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

		// 37 38 39 40 left up right down
		// 72 h

		if (keycode > 48 && keycode < 58) { // 1 - 9
			let visNumber = keycode - 49;
			if (visNumber < vis.visuals.length)
				vis.selectVisual(vis.visuals[visNumber].name);
			return;
		}
	};

	//draws the playback button and potentially the menu
	this.draw = function () {
		push();
		fill("white");
		stroke("black");
		strokeWeight(2);

		//playback button 
		this.playbackButton.draw();

		//video length bar
		this.videoBar.draw();

		this.nextprevSong.draw();

		//only draw the menu if menu displayed is set to true.
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
		//draw out menu items for each visualisation
		for (var i = 0; i < vis.visuals.length; i++) {
			var yLoc = 70 + i * 40;
			text((i + 1) + ":  " + vis.visuals[i].name, 100, yLoc);
		}
	};

	this.showSongs = function () {
		//draw out menu items for each visualisation
		for (var i = 0; i < vis.visuals.length; i++) {
			var yLoc = 70 + i * 40;
			text((i + 1) + ":  " + songList[i], 600, yLoc);
		}
	}

	this.onResize = function () {
		this.videoBar.onResize();
		this.playbackButton.onResize();
	}
}
