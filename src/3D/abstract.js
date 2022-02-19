class Abstract {
    constructor(sketch) {
        this.name = "Abstract";
        this.sketch = sketch
    }
    draw = function () {
        this.sketch.rotateX(90);
        this.sketch.rotateZ(-90);
        this.sketch.lights();
        let spectrum = fourier.analyze();
        //"bass", "lowMid", "highMid", "treble"
        let energy = fourier.getEnergy('lowMid');
        this.drawBox(130, 70, 20, energy);
        this.drawBox(410, 120, 20, energy);
        this.drawBox(620, 340, 20, energy);
        this.drawBox(650, 560, 20, energy);
        this.drawBox(110, 460, 20, energy);
        this.drawBox(220, 430, 20, energy);
        this.drawBox(740, 450, 20, energy);


    };
    drawBox = function (x, y, size, energy) {
        this.sketch.push()
        this.sketch.translate(x, y);
        this.sketch.rotateX(floor(energy / 10) * 10);
        this.sketch.box(50);
        this.sketch.pop()
    }
}