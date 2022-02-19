/** 
 * @desc Class to handle the onscreen medu, keyboard and mouse controls
 */
class ControlsAndInput {
	constructor() {
		/** @var {Boolean} Flag to determine is the visuals list should be shown*/
		this.visualsDisplayed = false;
		/** @var {Boolean} Flag to determine is the song list should be shown*/
		this.songsDisplayed = false;
		/** @var {PlaybackButton} Button to play or pause current song*/
		this.playbackButton = new PlaybackButton();
		/** @var {VideoBar} Horisontal bar to show the length of the song and jump to specific time*/
		this.videoBar = new VideoBar();
		/** @var {NextSong} Button to change to the next song*/
		this.nextSong = new NextSong();
		/** @var {PreviousSong} Button to change to the previous song*/
		this.prevSong = new PreviousSong();
		/** @var {volumeIcon} Button to show the volume of the song and mute on press*/
		this.volumeIcon = new VolumeIcon();
	}
	/** 
	 * @desc Handle the mouse pressed on canvas action. All actions are disabled if the 3D canvas is shown
	 */
	mousePressed() {
		if (is3D) return;
		this.playbackButton.hitCheck();
		this.nextSong.hitCheck();
		this.prevSong.hitCheck();
		this.volumeIcon.hitCheck();
		this.videoBar.hitCheck();
	};
	/** 
	 * @desc Handle key pressed action.
	 * 
	 * @param {Number} keycode ASCII code of the key pressed
	 */
	keyPressed(keycode) {
		// SPACEBAR - Play or Pause the song
		if (keycode == 32) {
			if (sound.isPlaying()) {
				sound.pause();
			} else {
				sound.loop();
			}
			return
		}
		// LEFT ARROW - Skip 5 seconds backwards
		if (keycode == 37) {
			sound.jump(sound.currentTime() - 5)
			return;
		}
		// RIGHT ARROW - Skip 5 seconds forward
		if (keycode == 39) {
			sound.jump(sound.currentTime() + 5)
			return;
		}
		// UP ARROW - Increase volume
		if (keycode == 38) {
			volume = min(1.0, volume + 0.1)
			sound.setVolume(volume)
			return;
		}
		// DOWN ARROW - Decrease volume
		if (keycode == 40) {
			volume = max(0.0, volume - 0.1)
			sound.setVolume(volume)
			return;
		}
		// F - Enter or Exit fullscreen
		if (keycode == 70) {
			fullscreen(!fullscreen());
			return;
		}
		// H - List help instructions
		if (keycode == 72) {
			// TODO
			return
		}
		// L - List songs
		if (keycode == 76) {
			this.songsDisplayed = !this.songsDisplayed;
			return
		}
		// M - Mute audio
		if (keycode == 77) {
			if (volume == 0) return;
			this.volumeIcon.mute = !this.volumeIcon.mute
			if (this.volumeIcon.mute) {
				sound.setVolume(0);
				return;
			}
			sound.setVolume(volume);
			return
		}
		// N - Change to the next song
		if (keycode == 78) {
			songIndex = (songIndex + 1) % songList.length
			this.changeSong(songIndex)
			return;
		}
		// P - Change to the previous song
		if (keycode == 80) {
			songIndex = (songIndex + songList.length - 1) % songList.length
			this.changeSong(songIndex)
			return;
		}
		// V - List visualisations
		if (keycode == 86) {
			this.visualsDisplayed = !this.visualsDisplayed;
			return;
		}
		// 1 - 9 Keys
		if (keycode > 48 && keycode < 58) {
			let visNumber = keycode - 49;
			if (visNumber < vis.visuals.length) {
				this.changeVisualisation(vis, visNumber, twoD_canvas, threeD_canvas, false)
				return;
			}
			// Index of the 3D visualisation (5th visualisation is the first 3D visualisation)
			let index = visNumber - vis.visuals.length
			if (index < myp5.vis.visuals.length) {
				this.changeVisualisation(myp5.vis, index, threeD_canvas, twoD_canvas, true)
				return;
			}
			return;
		}
	};
	/** 
	 * @desc Handles the change of a visualisation and showing the appropriate canvas
	 * 
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
	 * @desc Handles the change of a song based on an index
	 * 
	 * @param {Number} index Index of the new song 
	 */
	changeSong(index) {
		sound.stop();
		sound = loadSound('assets/' + songList[index], successCallback = loadPeaks);
		sound.setVolume(volume);
	}
	/** 
	 * @desc Functions which draws all the controls to the screen
	 */
	draw() {
		// If the 3D canvas is displayed, don't resize the 2D controls
		if (is3D) return;

		push();
		fill("white");
		stroke("black");
		strokeWeight(2);

		this.playbackButton.draw();
		this.videoBar.draw();
		this.nextSong.draw();
		this.prevSong.draw();
		this.volumeIcon.draw();

		if (this.visualsDisplayed) {
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
	/** 
	 * @desc Function which displays the list of visualisations
	 */
	menu() {
		for (var i = 0; i < vis.visuals.length; i++) {
			var yLoc = 70 + i * 40;
			text((i + 1) + ":  " + vis.visuals[i].name, 100, yLoc);
		}
	};
	/** 
	 * @desc Function which displays the list of songs
	 */
	showSongs() {
		for (var i = 0; i < songList.length; i++) {
			var yLoc = 70 + i * 40;
			text((i + 1) + ":  " + songList[i], 600, yLoc);
		}
	}
	/** 
	 * @desc Function which calls the resize functions of each control
	 */
	onResize() {
		// If the 3D canvas is displayed, don't resize the 2D controls
		if (is3D) return;

		this.videoBar.onResize();
		this.playbackButton.onResize(width / 2 - 10, height - 50, 20, 20);
		this.nextSong.onResize(width / 2 + 60, height - 50, 20, 20);
		this.prevSong.onResize(width / 2 - 80, height - 50, 20, 20);
		this.volumeIcon.onresize();
	}
}