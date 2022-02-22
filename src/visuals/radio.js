//
class Radio {
    constructor() {
        this.name = "Radio";

        this.minAngle = PI + PI / 10;
        this.maxAngle = TWO_PI - PI / 10;

        this.frequencyBins = ["bass", "lowMid", "highMid", "treble"];
        this.onResize();
    }

    onResize() {
        this.pad = width / 30;
        this.dialRadius = 160;
    }

    draw() {
        background('SaddleBrown')
        opacity = 255
        let spectrum = fourier.analyze();

        this.slider(100, height - 900, 850, 200)
        this.dial(100, height - 600, 400, 200, "Low Mid", "lowMid")
        this.dial(550, height - 600, 400, 200, "High Mid", "highMid")
        this.button(300, height - 250, 80, "Volume", 'lowMid')
        this.button(500, height - 250, 70, "Bass", 'bass')
        this.button(700, height - 250, 70, "Treble", 'treble')
        this.speaker()
    }

    slider(x, y, w, h) {
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
        line(x + w / 2, y, x + w / 2, y + h)
    }
    button(x, y, size, label, bin) { // IMPROVE: resizeing does not work
        fill('Gray')
        stroke('Black')
        circle(x, y, size)

        fill('Black')
        textSize(15)
        textStyle(BOLD);
        textAlign(CENTER);
        text(label, x, y + 60)

        strokeWeight(2);
        stroke(255, 20, 0)
        this.needle(fourier.getEnergy(bin), x, y, size / 2)
    }
    speaker() {
        stroke('Black')
        fill('Peru')
        let halfW = width / 2
        rect(halfW + this.pad, this.pad, halfW - 2 * this.pad, height - 3 * this.pad)

        let n = (halfW - 2 * this.pad) / 10
        for (let i = 1; i <= n; i++) {
            line(halfW + i * this.pad, this.pad, halfW + i * this.pad, height - 2 * this.pad)
        }
        let m = (height - 3 * this.pad) / 54
        // // console.log(m);
        // for (let i = 1; i < m; i++) {
        //     line(halfW + this.pad, i * this.pad, width - this.pad, i * this.pad)
        // }
    }

    dial(x, y, w, h, label, bin) {
        stroke('Black')
        let energy = fourier.getEnergy(bin);
        push();
        fill('#f0f2d2');
        rect(x, y, w, h);
        this.ticks(x + w / 2, y + h, label);
        this.needle(energy, x + w / 2, y + h, this.dialRadius);
        pop();
    }

    needle(energy, centreX, bottomY, l) {
        angleMode(RADIANS);

        push();
        // stroke('#333333');
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