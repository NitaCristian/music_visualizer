// Polish everything
// Credits
// Progress log, testing 
// Performance
// Drag and Drop song
// Particle
// Radio
// Pixelated Waves - background
// Effects - refactor and simplify

/** Handles controls and input from the user */
let controls = null;

/** Container to store visualisations in */
let visContainer = null;

/** Store the current song */
let song = null;

/** Object to analyze the song */
let fourier = null;

/** Default volume of the song*/
let volume = 0.2;

/** List of all songs available*/
let songList = [
	'Persona-5-Last-Surprise.mp3',
	'songname.mp3',
	'INNA_Gimme_Gimme.mp3',
	'YACHT-The-Summer-Song-Instrumental.mp3',
	'broke_for_free_as_colorful_as_ever.mp3',
	'mechanicus-children-of-the-omnissiah.mp3',
	'cysmix_fright_march.mp3',
	'persona_4_specialist.mp3',
	'i_secretly_love_u.mp3',
	'stomper_reggae_bit.mp3',
];

/** Index of the song from the songList array*/
let songIndex = 0;

/** Array of amplitude peaks of the song*/
let peaks = [];

/** Represents a second instance of p5 where the canvas is 3D*/
let myp5 = null;

/** p5.Element which holds the 2D canvas*/
let twoD_canvas;

/** p5.Element which holds the 3D canvas*/
let threeD_canvas;

/** Flag to tell if the current visualization is 3D */
let is3D = false;

/** Flag to keep track of whether the audio is muted*/
let mute = false;

/**Opacity set by every visualisation*/
let opacity = 255

function preload() {
	song = loadSound('assets/' + songList[songIndex], successCallback = loadPeaks);
	song.setVolume(volume);
}

/**
 * Callback function called after a song is loaded
 */
function loadPeaks() {
	peaks = song.getPeaks();
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	controls = new ControlsAndInput();
	// Instantiate the FFT object
	fourier = new p5.FFT();
	peaks = song.getPeaks(); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Is this necessary??????????

	// Create a new visualisations container and add visualisations
	visContainer = new VisualisationsContainer();
	visContainer.add(new Radio());
	visContainer.add(new Spectrum());
	visContainer.add(new Equalizer());
	visContainer.add(new Mystify());

	// Create a new instance of p5 for the 3D visualizations
	myp5 = new p5(s);
	// Create references to both canvases and show the 2D canvas and hide the 3D canvas
	twoD_canvas = select('#defaultCanvas0').show();
	threeD_canvas = select('#defaultCanvas1').hide();
}

function draw() {
	background(0, opacity);
	// Draw the selected visualisation
	visContainer.selectedVisual.draw();
	// Draw the controls
	controls.draw();
}

function mouseClicked() {
	controls.mousePressed();
}

function mouseMoved() {
	controls.mouseMoved();
}

function keyPressed() {
	controls.keyPressed(keyCode);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	// Resize the controls
	controls.onResize();
	// Resize any visualisation that needs resize
	if (visContainer.selectedVisual.hasOwnProperty('onResize') || visContainer.selectedVisual.__proto__.hasOwnProperty('onResize')) {
		visContainer.selectedVisual.onResize();
	}
}
