const s = (sketch) => {
    sketch.setup = function () {
        sketch.createCanvas(1920, 1080, WEBGL)
    };
    sketch.draw = function () {
        sketch.background(200);
        sketch.rotateX(frameCount * 0.01);
        sketch.rotateY(frameCount * 0.01);
        sketch.box(50);
    };
}