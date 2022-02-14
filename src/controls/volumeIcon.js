class VolumeIcon {
    constructor() {
        this.x = width / 2 + 120;
        this.y = height - 50;
        this.width = 20;
        this.height = 20;
        this.mute = false;
    }

    draw() {
        fill('white')
        noStroke();
        triangle(
            this.x + this.width, this.y,
            this.x, this.y + this.height / 2,
            this.x + this.width, this.y + this.height);
        rect(this.x - 1, this.y + 4, this.width / 1.7, this.height / 1.7)
        textSize(15)
        text(((volume.toFixed(1)) * 100 * !this.mute).toString(), this.x, this.y + 40)
        if (this.mute || volume == 0) {
            stroke('red')
            line(this.x, this.y, this.x + 20, this.y + 20)
            line(this.x + 20, this.y, this.x, this.y + 20)
        }
    }

    hitCheck() {
        if (volume == 0) return;
        if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
            this.mute = !this.mute
            if (this.mute) {
                sound.setVolume(0);
                return;
            }
            sound.setVolume(volume);
        }
    }

    onresize() {
        this.x = width / 2 + 120;
        this.y = height - 50;
        this.width = 20;
        this.height = 20;
        // this.mute = false;
    }
}