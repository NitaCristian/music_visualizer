// Credit to Coding Train: https://thecodingtrain.com/CodingChallenges/004-purplerain.html

class Rain {
    constructor() {
        this.drops = []
        this.drop(30);
    }

    drop(n) {
        this.drops = []
        for (let i = 0; i < n; i++) {
            this.drops[i] = new Drop();
        }
    }
    draw() {
        push();
        for (let i = 0; i < this.drops.length; i++) {
            this.drops[i].fall();
            this.drops[i].show();
        }
        pop();
    }
}
