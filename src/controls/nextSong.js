class NextSong extends Button {
    constructor() {
        super(width / 2 + 60, height - 50, 20, 20)
    }

    draw() {
        fill('white')
        circle(this.x + 10, this.y + 10, 60)
        triangle(this.x, this.y, this.x + this.width, this.y + this.height / 2, this.x, this.y + this.height);
        triangle(this.x + 10, this.y, this.x + this.width + 10, this.y + this.height / 2, this.x + 10, this.y + this.height);
    }

    hitCheck() {
        if (mouseX > this.x - 20 && mouseX < this.x + this.width + 20 && mouseY > this.y - 20 && mouseY < this.y + this.height + 20) {
            songIndex = (songIndex + 1) % songList.length
            sound.stop();
            sound = loadSound('assets/' + songList[songIndex], successCallback = loadPeaks);
            sound.setVolume(volume);
        }
    };

}