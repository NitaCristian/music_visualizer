function VideoBar() {
    this.x = 20
    this.y = height - 100
    this.width = width - 40
    this.height = 10

    this.draw = function () {
        strokeWeight(0.8)
        let l = map(sound.currentTime(), 0, sound.duration(), this.x, this.width);
        if (sound.isPaused()) {
            l = map(sound._pauseTime, 0, sound.duration(), this.x, this.width)
        }
        fill('gray')
        rect(l, this.y, this.width - l, this.height, 10)
        fill('red')
        rect(this.x, this.y, l, this.height, 10)
        ellipse(l + 14, this.y + 5, 15)
    }

    this.hitCheck = function () {
        if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
            let value = map(mouseX, this.x, this.width, 0, sound.duration())
            sound.jump(value);
        }
    };

    this.onResize = function () {
        this.y = height - 100
        this.width = width - 40
    }
}