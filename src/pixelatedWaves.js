function PixelatedWaves(sketch) {
    this.name = "Pixelated Waves";
    this.rows = [];
    this.max_rows = 20;

    this.draw = function () {
        sketch.rotateX(90);
        sketch.rotateZ(-90);
        sketch.lights();

        let spectrum = fourier.analyze();
        this.rows.unshift(spectrum)
        if (this.rows.length > this.max_rows)
            this.rows.pop();

        this.drawRows(sketch);
    }

    this.drawRows = function () {
        let y = 500;
        for (let s of this.rows) {
            this.drawSpectrum(s, y, sketch);
            y -= 20;
        }
    };
    this.drawSpectrum = function (s, y) {
        sketch.push()
        sketch.translate(-450, y)
        for (let i = 0; i < 80/*s.length*/; i += 2) {

            let h = map(s[i], 0, 255, 0, height / 5);
            if (h == 0) continue;

            sketch.push()
            sketch.translate(0, 0, h / 2)
            sketch.box(20, 20, h)
            sketch.pop()

            sketch.translate(20, 0, 0);
        }
        sketch.pop()
    };
}