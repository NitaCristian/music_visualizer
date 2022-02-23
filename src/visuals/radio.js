// Radio Visualisation
class Radio {
    constructor() {
        // Name of the visualisation
        this.name = "Radio";

        this.minAngle = PI + PI / 10;
        this.maxAngle = TWO_PI - PI / 10;

        this.frequencyBins = ["bass", "lowMid", "highMid", "treble"];
        this.onResize();
    }


    onResize() {
        this.half_width = width / 2
        this.pad = width / 30;
        this.dialRadius = 160;
    }

    draw() {
        background(102, 34, 0)
        fill('SaddleBrown')
        let p = width / 100
        rect(p, p, width - 2 * p, height - 2 * p)
        opacity = 255
        let spectrum = fourier.analyze();


        this.slider(
            100,
            70,
            this.half_width - 2 * this.pad,
            height / 5,
            spectrum[0])
        this.dial(
            100,
            365,
            this.half_width / 2.5,
            height / 5,
            "Low Mid", "lowMid")
        this.dial(100 + this.half_width / 2.5 + this.pad,
            365,
            this.half_width / 2.5,
            height / 5,
            "High Mid", "highMid")
        this.button(
            300,
            height - 250,
            height / 12,
            "Volume", 'lowMid')
        this.button(500, height - 250, 70, "Bass", 'bass')
        this.button(700, height - 250, 70, "Treble", 'treble')
        this.speaker(spectrum[0])
        push()
        angleMode(DEGREES)
        // rotate(-29)
        textFont(stylish)
        textSize(100)
        fill('Black')
        textAlign(LEFT)
        text('Old Radio', this.half_width - 600, height - 50)
        pop()
    }

    slider(x, y, w, h, test) {
        fill(102, 34, 0)
        rect(x - 10, y - 10, w + 20, h + 20)

        fill('#f0f2d2');
        rect(x, y, w, h)

        let midHeight = h / 2 + 20
        line(x, y + midHeight, x + w, y + midHeight)

        for (let i = 1; i < w / 10; i++) {
            let l = 20
            if (i % 5 == 0) {
                l = 30
                fill(0)
                textStyle(NORMAL)
                text((i + 80).toString(), x + i * 10, y + midHeight - 1.5 * l)
            }
            line(x + i * 10, y + midHeight, x + i * 10, y + midHeight - l)
        }

        stroke(255, 0, 0)
        let t = map(test, 0, 255, 10, 200)
        line(x + w / 2 + t, y, x + w / 2 + t, y + h)
    }
    button(x, y, size, label, bin) { // IMPROVE: resizeing does not work
        fill('Gray')
        stroke('Black')
        circle(x, y, size)

        push()
        fill('Black')
        textSize(30)
        textFont(italiano)
        textStyle(NORMAL);
        textAlign(CENTER);
        text(label, x, y + 60)
        pop()

        strokeWeight(2);
        stroke(255, 20, 0)
        this.needle(fourier.getEnergy(bin), x, y, size / 2)
    }
    speaker(test) {

        let x = this.half_width + this.pad
        let y = this.pad
        let w = this.half_width - 2 * this.pad
        let h = height - 2 * this.pad

        this.woodBack(x, y, w, h)

        // Draw speaker background
        stroke('Black')
        fill('Peru')
        rect(x, y, w, h)

        // Draw k vertical lines of width n

        let k = map(test, 0, 255, 25, 50)
        let n = w / k
        for (let i = 1; i <= k; i++) {
            line(x + i * n, y, x + i * n, y + h)
        }
        // Draw k horisontal lines of height m
        let m = h / k
        for (let i = 1; i <= k; i++) {
            line(x, y + m * i, x + w, y + m * i)
        }
    }

    woodBack(x, y, w, h) {
        stroke(0)
        fill(102, 34, 0)
        rect(x - 10, y - 10, w + 20, h + 20)
    }

    dial(x, y, w, h, label, bin) {
        this.woodBack(x, y, w, h)

        let energy = fourier.getEnergy(bin);
        push();
        // Draw dial background
        stroke('Black')
        fill('#f0f2d2');
        rect(x, y, w, h);

        this.ticks(x + w / 2, y + h, label);
        this.needle(energy, x + w / 2, y + h, this.dialRadius);
        pop();
    }

    needle(energy, centreX, bottomY, l) {
        angleMode(RADIANS);

        push();
        translate(centreX, bottomY);
        let theta = map(energy, 0, 255, this.minAngle, this.maxAngle);
        let x = l * cos(theta);
        let y = l * sin(theta);
        line(0, 0, x, y);
        pop();
    };

    ticks(centreX, bottomY, freqLabel) {
        angleMode(RADIANS);

        let nextTickAngle = this.minAngle;
        push();

        stroke('#333333');
        fill('#333333');
        translate(centreX, bottomY);
        arc(0, 0, 20, 20, PI, 2 * PI);

        textAlign(CENTER);
        textSize(12);
        text(freqLabel, 0, -30);

        for (let i = 0; i < 9; i++) {
            let x = this.dialRadius * cos(nextTickAngle);
            let x1 = (this.dialRadius - 5) * cos(nextTickAngle);

            let y = (this.dialRadius) * sin(nextTickAngle);
            let y1 = (this.dialRadius - 5) * sin(nextTickAngle);

            line(x, y, x1, y1);
            nextTickAngle += PI / 10;
        }
        pop();
    };
}