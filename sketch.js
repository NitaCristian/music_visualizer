// Polish everything
// Improve radio, performance, file structure, all visuals, abstract
// Refactor classes such as star and drop to become particles
// Refactor the buttons (using callbacks), maybe also the video bar and the volume icon
// Comments on: radio, mystify, equalizer(credit), star, particle, drop, emmitter, confetti, the buttons
// Progress log, testing?, better resize


/** @var {!ControlsAndInput} controls Handles controls and input */
let controls = null;

/** @var {VisualisationsContainer} vis Container to store visualisations in */
let vis = null;

/** @var {p5.Sound} sound Hold the current soung */
let sound = null;

/** @var {p5.FFT} fourier Object to analyze the song */
let fourier;

/** @var {number} volume Volume of the song*/
let volume = 0.2;

/** @var {Array} songList List of all songs available*/
let songList = [
	'songname.mp3',
	'INNA_Gimme_Gimme.mp3',
	'YACHT-The-Summer-Song-Instrumental.mp3',
	'broke_for_free_as_colorful_as_ever.mp3',
	'mechanicus-children-of-the-omnissiah.mp3',
	'cysmix_fright_march.mp3',
	'persona_4_specialist.mp3',
	'i_secretly_love_u.mp3',
	'stomper_reggae_bit.mp3',
	'Persona-5-Last-Surprise.mp3'
];

/** @var {number} songIndex Index of the current loaded song from the songList array*/
let songIndex = 0;

/** @var {Array} peaks Array of amplitude peaks in a p5.SoundFile*/
let peaks;

/** @var {type} name desc*/
let myp5;

/** @var {type} name desc*/
let twoD_canvas;

/** @var {type} name desc*/
let threeD_canvas;

/** @var {Bool} is3D Flag to tell if the current visualization is 3D */
let is3D = false;

function preload() {
	sound = loadSound('assets/' + songList[songIndex], successCallback = loadPeaks);
	sound.setVolume(volume);
}

/**
 * @desc Callback function called after a soung is loaded
 * 
 * @returns {Array} Returns and array of amplitude peaks
 */
function loadPeaks() {
	peaks = sound.getPeaks();
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	controls = new ControlsAndInput();

	// Instantiate the FFT object
	fourier = new p5.FFT();
	peaks = sound.getPeaks();

	// Create a new visualisations container and add visualisations
	vis = new VisualisationsContainer();
	vis.add(new Spectrum());
	vis.add(new Equalizer());
	vis.add(new Radio());
	vis.add(new Mystify(10));

	// Create a new instance of p5 for the 3D visualizations
	myp5 = new p5(s);
	// Create references to both canvases and show the 2D canvas and hide the 3D canvas
	twoD_canvas = select('#defaultCanvas0').show();
	threeD_canvas = select('#defaultCanvas1').hide();
}

function draw() {
	background(0);
	// Draw the selected visualisation
	vis.selectedVisual.draw();
	// Draw the controls
	controls.draw();
}

function mouseClicked() {
	controls.mousePressed();
}

function keyPressed() {
	controls.keyPressed(keyCode);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	// Resize the controls
	controls.onResize();
	// Resize any visualisation that needs resize
	if (vis.selectedVisual.hasOwnProperty('onResize') || vis.selectedVisual.__proto__.hasOwnProperty('onResize')) {
		vis.selectedVisual.onResize();
	}
}



//Function Documentation
/**
 * @desc {short description}
 *
 * @param {type} {name} short description
 * @returns {type} short description
 */

// Class Documentation
/**
 * @desc {short description}
 *
 * @implements {class}
 */

// Constructor
/**
 * @param {type} name {short description}
 */

// Class field and Variable
/** @private @const {type} {short description} */
/** @var {type} {short description} */
