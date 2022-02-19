class PixelatedWaves {
    constructor(sketch) {
        this.name = "Pixelated Waves";
        this.rows = [];
        this.max_rows = 20;
        this.sketch = sketch
    }
    draw() {
        this.sketch.rotateX(90);
        this.sketch.rotateZ(-90);
        this.sketch.lights();

        let spectrum = fourier.analyze();
        this.rows.unshift(spectrum)
        if (this.rows.length > this.max_rows)
            this.rows.pop();

        this.drawRows(this.sketch);
    }

    drawRows() {
        let y = 500;
        for (let s of this.rows) {
            this.drawSpectrum(s, y, this.sketch);
            y -= 20;
        }
    };
    drawSpectrum(s, y) {
        this.sketch.push()
        this.sketch.translate(-450, y)
        for (let i = 0; i < 80/*s.length*/; i += 2) {

            let h = map(s[i], 0, 255, 0, height / 5);
            if (h == 0) continue;

            this.sketch.push()
            this.sketch.translate(0, 0, h / 2)
            this.sketch.box(20, 20, h)
            this.sketch.pop()

            this.sketch.translate(20, 0, 0);
        }
        this.sketch.pop()
    };
}