/** 
 * Button Class is a parent class of multiple controls
 */
class Button {
    constructor(x, y, w, h) {
        this.onResize(x, y, w, h)
    }

    /** 
     * Function do draw a basic button 
     */
    draw() {
        strokeWeight(1)
        fill('white')
        ellipse(this.x + 10, this.y + 10, 60)
    }

    /** 
     * Function to call another function when the button is pressed
     * @param {Function} callback This is a function passed as a parameter
     * @param {Number|undefined} param Parameter to the callback function, can be undefined 
     */
    hitCheck(callback, param) {
        if (mouseX > this.x - 20 && mouseX < this.x + this.w + 20 && mouseY > this.y - 20 && mouseY < this.y + this.h + 20) {
            callback(param)
        }
    }

    /** 
     * Function called to resize the button dimensions when the canvas resizes
     * @param {Number} x new value of the x coordinate
     * @param {Number} y new value of the y coordinate
     * @param {Number} w new value of the width
     * @param {Number} h new value of the height
     */
    onResize(x, y, w, h) {
        /** width of the volume icon*/
        this.w = w

        /** height of the volume icon*/
        this.h = h

        /** x coordinate of the volume icon*/
        this.x = x

        /** y coordinate of the volume icon*/
        this.y = y
    };
}