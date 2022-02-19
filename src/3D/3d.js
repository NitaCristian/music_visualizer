const s = (sketch) => {
    sketch.vis = null

    sketch.setup = function () {
        sketch.createCanvas(windowWidth, windowHeight, WEBGL)

        sketch.vis = new Visualisations();
        sketch.vis.add(new Abstract(sketch))
        sketch.vis.add(new PixelatedWaves(sketch))

        sketch.angleMode(DEGREES);
        sketch.debugMode();

        sketch.camera(1300, -300, 0, 0, 0, 0)
        sketch.noStroke();
        sketch.normalMaterial();
    };

    sketch.draw = function () {
        sketch.background(100);
        sketch.vis.selectedVisual.draw(sketch);
        sketch.orbitControl(1, 1);
    };

    sketch.windowResized = function () {
        sketch.resizeCanvas(windowWidth, windowHeight)
        sketch.camera(1300, -300, 0, 0, 0, 0)

    }
}