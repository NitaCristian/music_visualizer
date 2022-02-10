let controls = null;
let vis = null;
let sound = null;
let fourier;
let volume = 0.5;
let songList = [
	'mechanicus-children-of-the-omnissiah.mp3',
	'persona_4_specialist.mp3',
	'stomper_reggae_bit.mp3',
	'YACHT-The-Summer-Song-Instrumental.mp3',
	'broke_for_free_as_colorful_as_ever.mp3',
	'i_secretly_love_u.mp3',
	'cysmix_fright_march.mp3',
];
let songIndex = 0;

function preload() {
	sound = loadSound('assets/' + songList[songIndex]);
	sound.setVolume(volume);
	sound.setLoop(true);
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	controls = new ControlsAndInput();
	fourier = new p5.FFT();

	vis = new Visualisations();
	vis.add(new Spectrum());
	vis.add(new Equalizer());
	vis.add(new Needles());
	vis.add(new Mystify(10));
	vis.add(new Radio());

	// let myp5 = new p5(s);
	// let threeD_canvas = select('#defaultCanvas1').hide();
	// threeD_canvas.show();
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
	// if (keyCode == 53) {
	// 	select('#defaultCanvas0').hide()
	// 	select('#defaultCanvas1').show()
	// 	// console.log(keyCode)
	// }
	// else {
	// 	select('#defaultCanvas0').show()
	// 	select('#defaultCanvas1').hide()
	// 	// console.log(keyCode)
	// }
	controls.keyPressed(keyCode);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);

	if (vis.selectedVisual.hasOwnProperty('onResize') || vis.selectedVisual.__proto__.hasOwnProperty('onResize')) {
		vis.selectedVisual.onResize();
	}

	controls.onResize();
}
