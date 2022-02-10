//global for the controls and input 
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sound = null;
//variable for p5 fast fourier transform
var fourier;

let songList = [
	'mechanicus-children-of-the-omnissiah.mp3',
	'persona_4_specialist.mp3',
	'stomper_reggae_bit.mp3',
	'YACHT-The-Summer-Song-Instrumental.mp3',
];
let songIndex = 0;

function preload() {
	sound = loadSound('assets/' + songList[songIndex]);
	sound.setLoop(true);
}

function setup() {
	createCanvas(windowWidth - 4, windowHeight - 4);
	background(0);
	controls = new ControlsAndInput();

	//instantiate the fft object
	fourier = new p5.FFT();

	//create a new visualisation container and add visualisations
	vis = new Visualisations();
	vis.add(new Spectrum());
	vis.add(new Equalizer());
	vis.add(new Needles());
	vis.add(new Mystify(10));

	let myp5 = new p5(s);
	let threeD_canvas = select('#defaultCanvas1').hide();
	// threeD_canvas.show();
}

function draw() {
	background(0);
	//draw the selected visualisation
	vis.selectedVisual.draw();
	//draw the controls on top.
	controls.draw();
}

function mouseClicked() {
	controls.mousePressed();
}

function keyPressed() {
	if (keyCode == 53) {
		select('#defaultCanvas0').hide()
		select('#defaultCanvas1').show()
		// console.log(keyCode)
	}
	else {
		select('#defaultCanvas0').show()
		select('#defaultCanvas1').hide()
		// console.log(keyCode)
	}
	controls.keyPressed(keyCode);
}

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	if (vis.selectedVisual.hasOwnProperty('onResize') || vis.selectedVisual.__proto__.hasOwnProperty('onResize')) {
		vis.selectedVisual.onResize();
	}
	controls.onResize();
}
