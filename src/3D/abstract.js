function Abstract(sketch) {
    this.name = "Abstract";

    this.draw = function () {
        sketch.rotateX(90);
        sketch.rotateZ(-90);
        sketch.lights();
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
    this.drawBox = function (x, y, size, energy) {
        sketch.push()
        sketch.translate(x, y);
        sketch.rotateX(floor(energy / 10) * 10);
        sketch.box(50);
        sketch.pop()
    }
}