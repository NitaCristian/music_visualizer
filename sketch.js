let controls = null;
let vis = null;
let sound = null;
let fourier;
let volume = 0.2;
let songList = [
	'INNA_Gimme_Gimme.mp3',
	'cysmix_fright_march.mp3',
	'YACHT-The-Summer-Song-Instrumental.mp3',
	'mechanicus-children-of-the-omnissiah.mp3',
	'broke_for_free_as_colorful_as_ever.mp3',
	'persona_4_specialist.mp3',
	'stomper_reggae_bit.mp3',
	'i_secretly_love_u.mp3',
];
let songIndex = 0;
let myp5;

function preload() {
	sound = loadSound('assets/' + songList[songIndex]);
	sound.setVolume(volume);
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	controls = new ControlsAndInput();
	fourier = new p5.FFT();

	vis = new Visualisations();
	vis.add(new Spectrum());
	vis.add(new Equalizer());
	vis.add(new Needles());
	vis.add(new Radio());
	vis.add(new Mystify(10));

	// myp5 = new p5(s);
	// let twoD_canvas = select('#defaultCanvas0').hide();
	// let threeD_canvas = select('#defaultCanvas1').hide();
}

function draw() {
	background(0);
	vis.selectedVisual.draw();
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
	controls.onResize();
	if (vis.selectedVisual.hasOwnProperty('onResize') || vis.selectedVisual.__proto__.hasOwnProperty('onResize')) {
		vis.selectedVisual.onResize();
	}
}
