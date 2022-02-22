//////////////////////////////////////////////////////////////////////////////////////////
// Credit to Coding Train: https://thecodingtrain.com/CodingChallenges/004-purplerain.html
//////////////////////////////////////////////////////////////////////////////////////////

/** 
 * Rain Class used to render droplets fallin to the screen
 */
class Rain {
    constructor() {
        /** Array to store the droplets*/
        this.drops = []
    }

    /** 
     * Function to set the number of drops
     * @param {Number} n Number of drops to be added to the drops array
     */
    drop(n) {
        // this.drops = []
        for (let i = 0; i < n; i++) {
            this.drops.push(new Drop())
        }
    }

    draw() {
        push();
        this.drop(1)
        // For every drop in the drops array
        for (let drop of this.drops) {
            // Update each droplet's position
            drop.update();
            // If a drop is out of bounds bring it back
            // drop.edges();
            // Draw the droplet onto the screen
            drop.show();
        }
        for (let i = this.drops.length - 1; i >= 0; i--) {
            if (this.drops[i].outOfBounds()) {
                this.drops.splice(i, 1)
            }
        }
        pop();
    }
}
