/** 
 * Class to handle the onscreen medu, keyboard and mouse controls
 */
class ControlsAndInput {
	constructor() {
		/** Flag to determine is the visuals list should be shown*/
		this.visualsDisplayed = false;

		/** Flag to determine if the song list should be shown*/
		this.songsDisplayed = false;

		/** Flag to determine if the controls such as video bar and buttons should be shown*/
		this.controlsDisplayed = false

		/** Button to play or pause current song*/
		this.playbackButton = new PlaybackButton(width / 2 - 10, height - 50, 20, 20);

		/** Horisontal bar to show the length of the song and jump to specific time*/
		this.videoBar = new VideoBar();

		/** Button to change to the next song*/
		this.nextSong = new NextSong(width / 2 + 60, height - 50, 20, 20);

		/** Button to change to the previous song*/
		this.prevSong = new PreviousSong(width / 2 - 80, height - 50, 20, 20);

		/** Button to show the volume of the song and mute on press*/
		this.volumeIcon = new VolumeIcon(width / 2 + 120, height - 50, 20, 20);
	}

	/** 
	 * Handles the mouse moved action.
	 */
	mouseMoved() {
		if (is3D) return;

		if (mouseY > height - 150) {
			this.controlsDisplayed = true
			return
		}
		this.controlsDisplayed = false
	}

	/** 
	 * Handle the mouse pressed on canvas action. All actions are disabled if the 3D canvas is shown
	 */
	mousePressed() {
		if (is3D) return;

		this.playbackButton.hitCheck(this.playPause);
		this.nextSong.hitCheck(this.changeSong, (songIndex + 1) % songList.length);
		this.prevSong.hitCheck(this.changeSong, (songIndex + songList.length - 1) % songList.length);
		this.volumeIcon.hitCheck(this.muteAudio);
		this.videoBar.hitCheck();
	}

	/** 
	 * Handle key pressed action.
	 * @param {Number} keyCode ASCII code of the key pressed
	 */
	keyPressed(keyCode) {
		// SPACEBAR - Play or Pause the song
		if (keyCode == 32) {
			this.playPause()
			return
		}
		// LEFT ARROW - Skip 5 seconds backwards
		if (keyCode == 37) {
			song.jump(song.currentTime() - 5)
			return;
		}
		// RIGHT ARROW - Skip 5 seconds forward
		if (keyCode == 39) {
			song.jump(song.currentTime() + 5)
			return;
		}
		// UP ARROW - Increase volume
		if (keyCode == 38) {
			volume = min(1.0, volume + 0.1)
			song.setVolume(volume)
			return;
		}
		// DOWN ARROW - Decrease volume
		if (keyCode == 40) {
			volume = max(0.0, volume - 0.1)
			song.setVolume(volume)
			return;
		}
		// F - Enter or Exit fullscreen
		if (keyCode == 70) {
			fullscreen(!fullscreen());
			return;
		}
		// H - List help instructions
		if (keyCode == 72) {
			// TODO
			return
		}
		// L - List songs
		if (keyCode == 76) {
			this.songsDisplayed = !this.songsDisplayed;
			return
		}
		// M - Mute audio
		if (keyCode == 77) {
			this.muteAudio()
			return
		}
		// N - Change to the next song
		if (keyCode == 78) {
			let newIndex = (songIndex + 1) % songList.length
			this.changeSong(newIndex)
			return;
		}
		// P - Change to the previous song
		if (keyCode == 80) {
			let newIndex = (songIndex + songList.length - 1) % songList.length
			this.changeSong(newIndex)
			return;
		}
		// V - List visualisations
		if (keyCode == 86) {
			this.visualsDisplayed = !this.visualsDisplayed;
			return;
		}
		// 1 - 9 Keys
		if (keyCode > 48 && keyCode < 58) {
			let visNumber = keyCode - 49;
			if (visNumber < visContainer.visuals.length) {
				this.changeVisualisation(visContainer, visNumber, twoD_canvas, threeD_canvas, false)
				return;
			}
			// Index of the 3D visualisation (5th visualisation is the first 3D visualisation)
			let index = visNumber - visContainer.visuals.length
			if (index < myp5.visContainer.visuals.length) {
				this.changeVisualisation(myp5.visContainer, index, threeD_canvas, twoD_canvas, true)
				return;
			}
			return;
		}
	};

	/** 
	 * Play or Pause the current audio
	 */
	playPause() {
		if (song.isPlaying()) {
			song.pause();
		} else {
			song.loop();
		}
	}

	/** 
	 * Mute or Unmute the current audio
	 */
	muteAudio() {
		if (volume == 0) return;
		mute = !mute
		if (mute) {
			song.setVolume(0);
			return;
		}
		song.setVolume(volume);
	}

	/** 
	 * Handles the change of a visualisation and showing the appropriate canvas
	 * @param {visualsContainer} visualsContainer The container that holds the visualisation that will be shown
	 * @param {Number} index Index of the chosen visualisation 
	 * @param {type} canvasToShow The canvas that will be displayed
	 * @param {type} canvasToHide The canvas that will be hidden
	 * @param {Boolean} to3D Flag which tells the type of the visualisation
	 */
	changeVisualisation(visualsContainer, index, canvasToShow, canvasToHide, to3D) {
		canvasToShow.show()
		canvasToHide.hide()
		visualsContainer.selectVisual(visualsContainer.visuals[index].name)
		is3D = to3D
	}

	/** 
	 * Handles the change of a song based on an index
	 * @param {Number} index Index of the new song 
	 */
	changeSong(newIndex) {
		songIndex = newIndex
		song.stop();
		song = loadSound('assets/' + songList[songIndex], successCallback = loadPeaks);
		song.setVolume(volume);
	}

	/** 
	 * Functions which draws all the controls to the screen
	 */
	draw() {
		// If the 3D canvas is displayed, don't resize the 2D controls
		if (is3D) return;

		push();
		fill("white");
		stroke("black");
		strokeWeight(2);

		if (this.controlsDisplayed) {
			this.playbackButton.draw();
			this.videoBar.draw();
			this.nextSong.draw();
			this.prevSong.draw();
			this.volumeIcon.draw();
		}

		if (this.visualsDisplayed) {

			this.showVisuals();
		}

		if (this.songsDisplayed) {
			this.showSongs()
		}
		pop();
	};

	/** 
	 * Function which displays the list of visualisations
	 */
	showVisuals() {
		textSize(10);
		text("Visualisations:", 0, 0);
		let step = 0
		for (let i = 0; i < visContainer.visuals.length; i++, step++) {
			let yLoc = 70 + step * 40;
			text((step + 1) + ":  " + visContainer.visuals[i].name, 100, yLoc);
		}
		for (let j = 0; j < myp5.visualsContainer.visuals.length; j++, step++) {
			let yLoc = 70 + step * 40;
			text((step + 1) + ":  " + visContainer.visuals[i].name, 100, yLoc);
		}
	}

	/** 
	 * Function which displays the list of songs
	 */
	showSongs() {
		textSize(34);

		for (let i = 0; i < songList.length; i++) {
			let yLoc = 70 + i * 40;
			text((i + 1) + ":  " + songList[i], 600, yLoc);
		}
	}

	/** 
	 * Function which calls the resize functions of each control
	 */
	onResize() {
		// If the 3D canvas is displayed, don't resize the 2D controls
		if (is3D) return;

		this.videoBar.onResize();
		this.playbackButton.onResize(width / 2 - 10, height - 50, 20, 20);
		this.nextSong.onResize(width / 2 + 60, height - 50, 20, 20);
		this.prevSong.onResize(width / 2 - 80, height - 50, 20, 20);
		this.volumeIcon.onResize(width / 2 + 120, height - 50, 20, 20);
	}
}