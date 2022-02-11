const s = (sketch) => {
    sketch.vis = null

    sketch.setup = function () {
        sketch.createCanvas(1920, 1080, WEBGL)
        sketch.vis = new Visualisations();
        sketch.vis.add(new PixelatedWaves(sketch))

        sketch.angleMode(DEGREES);
        sketch.debugMode();

        sketch.camera(1300, -300, 0, 0, 0, 0)
        sketch.noStroke();
        sketch.normalMaterial();
    };

    sketch.keyPressed = function () {
        if (sketch.keyCode == 71) { // G key
            if (sound.isPlaying()) {
                sound.pause();
            } else {
                sound.loop();
            }
        }
    };

    sketch.draw = function () {
        sketch.background(100);
        sketch.vis.selectedVisual.draw(sketch);
        sketch.orbitControl(1, 1);
    };
}