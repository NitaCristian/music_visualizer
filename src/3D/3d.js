// Credit to p5.js Wiki Global and instance mode ///////////////////
// https://github.com/processing/p5.js/wiki/Global-and-instance-mode
////////////////////////////////////////////////////////////////////

const s = (sketch) => {
    sketch.visContainer = null

    sketch.setup = function () {
        sketch.createCanvas(windowWidth, windowHeight, WEBGL)

        sketch.visContainer = new VisualisationsContainer();
        sketch.visContainer.add(new PixelatedWaves(sketch))

        sketch.angleMode(DEGREES);

        sketch.camera(0, -400, 500, 0, -200, 0)
        sketch.noStroke();
        sketch.normalMaterial();
    };

    sketch.draw = function () {
        sketch.background(100);
        sketch.visContainer.selectedVisual.draw(sketch);
        sketch.orbitControl(1, 1);
    };

    sketch.windowResized = function () {
        sketch.resizeCanvas(windowWidth, windowHeight)
        sketch.camera(0, -400, 500, 0, -200, 0)
    }
}