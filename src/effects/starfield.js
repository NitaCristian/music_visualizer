// Credit to Coding Train: https://thecodingtrain.com/CodingChallenges/001-starfield.html

/** 
 * @desc Starfield Class used to render a stars moving from the center outwards
 */
class Starfield {
    constructor() {
        /** @var {Array} stars List of all stars that will be drawn*/
        this.stars = [];
        /** @var {Number} speed Speed at which the stars move*/
        this.speed = 50;
    };

    /** 
     * @desc Set the amount of stars that will be displayed on the screen
     * 
     * @param {Number} n Number of stars to be added 
     */
    set(n) {
        this.stars = [];
        for (let i = 0; i < n; i++) {
            this.stars[i] = new Star();
        }
    };

    draw() {
        push();
        // Translate the 0,0 origin to the center of the canvas
        translate(width / 2, height / 2);
        // For every star in the stars array
        for (let i = 0; i < this.stars.length; i++) {
            // Update each star's new position
            this.stars[i].update(this.speed);
            // Draw the star to the screen
            this.stars[i].show();
        }
        pop();
    }
}
