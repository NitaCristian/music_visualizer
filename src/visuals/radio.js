class Radio {
    constructor() {
        this.name = "Radio";

        this.minAngle = PI + PI / 10;
        this.maxAngle = TWO_PI - PI / 10;

        this.plotsAcross = 2;
        this.plotsDown = 2;
        this.frequencyBins = ["bass", "lowMid", "highMid", "treble"];

        this.onResize();
    }

    onResize() {
        this.pad = width / 30;
        this.plotWidth = (width - this.pad) / this.plotsAcross;
        this.plotHeight = (height - this.pad) / this.plotsDown;
        this.dialRadius = (min(this.plotHeight, this.plotWidth / 2) - this.pad) - 10;
    }

    draw() {
        // TODO add wood background for the left hafl of the radio
        // this.slider()
        // this.dial()
        // this.dial()
        // this.button()
        // this.button()
        // this.button()
        // this.speaker()
    }

    slider() {
        // big rectangle
        // horizontal needles 
        // one red needle that goes left and right 
        // some numbers at some needles
    }
    button() {
        // circle
        // maybe needles around it
        // one red mark that spins
    }
    speaker() {
        // just some grid 
        // maybe rotate it for effect
    }

    dial() {
        angleMode(RADIANS);
        let spectrum = fourier.analyze();
        let currentBin = 0;

        push();
        fill('#f0f2d2');
        for (let i = 0; i < this.plotsDown; i++) {
            for (let j = 0; j < this.plotsAcross; j++) {

                let x = this.pad + j * this.plotWidth;
                let y = this.pad + i * this.plotHeight;
                let w = this.plotWidth - this.pad;
                let h = this.plotHeight - this.pad;
                rect(x, y, w, h);

                this.ticks(x + w / 2, y + h, this.frequencyBins[currentBin]);

                let energy = fourier.getEnergy(this.frequencyBins[currentBin]);
                this.needle(energy, x + w / 2, y + h);
                currentBin++;
            }
        }

        pop();
    }

    needle(energy, centreX, bottomY) {
        push();
        stroke('#333333');
        translate(centreX, bottomY);
        let theta = map(energy, 0, 255, this.minAngle, this.maxAngle);
        let x = this.dialRadius * cos(theta);
        let y = this.dialRadius * sin(theta);
        line(0, 0, x, y);
        pop();
    };

    ticks(centreX, bottomY, freqLabel) {
        let nextTickAngle = this.minAngle;
        push();

        stroke('#333333');
        fill('#333333');
        translate(centreX, bottomY);
        arc(0, 0, 20, 20, PI, 2 * PI);

        textAlign(CENTER);
        textSize(12);
        text(freqLabel, 0, -(this.plotHeight / 2));

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