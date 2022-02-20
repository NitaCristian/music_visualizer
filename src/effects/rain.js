// Credit to Coding Train: https://thecodingtrain.com/CodingChallenges/004-purplerain.html

/** 
 * @desc Rain Class used to render droplets fallin to the screen
 */
class Rain {
    constructor() {
        /** @var {Array}  Array to hold droplets of water that will be drawn*/
        this.drops = []
        // Call the helper function to drop 30 droplets
        this.drop(30);
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
        for (let i = 0; i < this.drops.length; i++) {
            // Update each droplet's position
            this.drops[i].fall();
            // Draw the droplet onto the screen
            this.drops[i].show();
        }
        pop();
    }
}
