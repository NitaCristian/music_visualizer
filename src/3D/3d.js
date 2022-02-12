const s = (sketch) => {
    sketch.vis = null

    sketch.setup = function () {
        sketch.createCanvas(1920, 1080, WEBGL)

        sketch.vis = new Visualisations();
        sketch.vis.add(new Abstract(sketch))
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
            return;
        }
        if (sketch.keyCode == 49) {
            sketch.vis.selectVisual(sketch.vis.visuals[0].name)
            return;
        }
        if (sketch.keyCode == 50) {
            sketch.vis.selectVisual(sketch.vis.visuals[1].name)
            return;
        }
    };

    sketch.draw = function () {
        sketch.background(100);
        sketch.vis.selectedVisual.draw(sketch);
        sketch.orbitControl(1, 1);
    };
}