// Polish everything, better resize
// Improve radio,file structure, all visuals
// Comments on: radio, mystify, equalizer(credit), more credits, 
// Progress log, testing?, 
// hide HUD
// better comments
// better pix waves, add some background
// radio
// refactor for performance
// refactor particle
// drag and drop song
// changin vis bug error to pix waves
// make rain and remove drop when out of bounds
/** @var {ControlsAndInput} Handles controls and input from the user */
let controls = null;

/** @var {VisualisationsContainer} Container to store visualisations in */
let visContainer = null;

/** @var {p5.Sound} Store the current song */
let song = null;

/** @var {p5.FFT} Object to analyze the song */
let fourier = null;

/** @var {number} Default volume of the song*/
let volume = 0.2;

/** @var {Array} List of all songs available*/
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

/** @var {Number} Index of the song from the songList array*/
let songIndex = 0;

/** @var {Array} Array of amplitude peaks of the song*/
let peaks = [];

/** @var {type}  Represents a second instance of p5 where the canvas is 3D*/
let myp5 = null;

/** @var {p5.Element} p5.Element which holds the 2D canvas*/
let twoD_canvas;

/** @var {p5.Element} p5.Element which holds the 3D canvas*/
let threeD_canvas;

/** @var {Boolean} Flag to tell if the current visualization is 3D */
let is3D = false;

/** @var {Boolean} Flag to keep track of whether the audio is muted*/
let mute = false;

/** @var {Number} Opacity set by every visualisation*/
let opacity = 255

function preload() {
	song = loadSound('assets/' + songList[songIndex], successCallback = loadPeaks);
	song.setVolume(volume);
}

/**
 * @desc Callback function called after a song is loaded
 * @returns {Array} Returns an array of amplitude peaks
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
	visContainer.add(new Spectrum());
	visContainer.add(new Equalizer());
	visContainer.add(new Radio());
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
