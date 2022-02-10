class Button {
    constructor(_x, _y, _width, _height) {
        this.onResize(_x, _y, _width, _height)
    }

    onResize(_x, _y, _width, _height) {
        this.width = _width
        this.height = _height
        this.x = _x
        this.y = _y
    };
}