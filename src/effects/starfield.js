// Credit to Coding Train: https://thecodingtrain.com/CodingChallenges/001-starfield.html

class Starfield {
    constructor() {
        this.stars = [];
        this.speed = 50;
    };

    emit(n) {
        for (let i = 0; i < n; i++) {
            this.stars[i] = new Star();
        }
    };

    draw() {
        push();
        translate(width / 2, height / 2);
        for (let i = 0; i < this.stars.length; i++) {
            this.stars[i].update(this.speed);
            this.stars[i].show();
        }
        pop();
    }
}
