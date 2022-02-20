// Credit to Coding Train: https://thecodingtrain.com/CodingChallenges/004-purplerain.html

/** 
 * @desc Rain Class used to render droplets fallin to the screen
 */
class Rain {
    constructor() {
        /** @var {Array}  Array to hold droplets of water that will be drawn*/
        this.drops = []
        // Call the helper function to drop 30 droplets
        this.drop(50);
    }

    /** 
     * @desc Function to set the number of drops
     * 
     * @param {Number} n Number of drops to be added to the drops array
     */
    drop(n) {
        this.drops = []
        for (let i = 0; i < n; i++) {
            this.drops[i] = new Drop();
        }
    }
    draw() {
        push();
        // For every drop in the drops array
        for (let drop of this.drops) {
            // Update each droplet's position
            drop.update();
            // If a drop is out of bounds bring it back
            drop.edges();
            // Draw the droplet onto the screen
            drop.show();
        }
        pop();
    }
}
