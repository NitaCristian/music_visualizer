function NextPrevSong() {
    this.width = 20;
    this.height = 20;
    this.x = width / 2 + 2 * this.width + 20;
    this.y = height - 50;

    this.draw = function () {
        fill('white')
        ellipse(this.x + 10, this.y + 10, 60)
        triangle(this.x, this.y, this.x + this.width, this.y + this.height / 2, this.x, this.y + this.height);
        triangle(this.x + 10, this.y, this.x + this.width + 10, this.y + this.height / 2, this.x + 10, this.y + this.height);
    }


    this.hitCheck = function () {
        if (mouseX > this.x - 20 && mouseX < this.x + this.width + 20 && mouseY > this.y - 20 && mouseY < this.y + this.height + 20) {
            songIndex = (songIndex + 1) % songList.length
            sound = loadSound('assets/' + songList[songIndex]);
        }
    };

    this.onResize = function () {
        this.x = width / 2;
        this.y = height - 2 * this.height;
    };
}