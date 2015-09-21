'use strict';
class Color {
    constructor(rgb) {
        if (typeof rgb === 'string') {
            rgb = Color.parse(rgb);
        }
        if (rgb.length !== 3) {
            throw new Color.ValueNumberError;
        }
        if (rgb.some(isNaN)) {
            throw new Color.ValueTypeError;
        }
        this.rgb = rgb;
    }
    mix(target) {
        return new Color(this.rgb.map((value, index) => {
            return Math.round((value + target.rgb[index]) / 2);
        }));
    }
    add(target) {
        return new Color(this.rgb.map((value, index) => {
            return value + target.rgb[index];
        }));
    }
    subtract(target) {
        return new Color(this.rgb.map((value, index) => {
            return value - target.rgb[index];
        }));
    }
    toString() {
        return `rgb(${this.values().join(',')})`;
    }
    values() {
        return this.rgb.map((x) => { return Color.clamp(x); });
    }
    static clamp(value, max = 255, min = 0) {
        return Math.min(max, Math.max(min, value));
    }
    static parse(color) {
        return color.match(/\((.*)\)/)[1].split(',').map((x) => { return +x; });
    }
}
(function (Color) {
    Color.WHITE = new Color([255, 255, 255]);
    Color.BLACK = new Color([0, 0, 0]);
    Color.RED = new Color([255, 0, 0]);
    Color.GREEN = new Color([0, 255, 0]);
    Color.BLUE = new Color([0, 0, 255]);
    class ValueNumberError extends TypeError {
        constructor(...args) {
            super(...args);
            this.message = 'Wrong number of color values';
        }
    }
    Color.ValueNumberError = ValueNumberError;
    class ValueTypeError extends TypeError {
        constructor(...args) {
            super(...args);
            this.message = 'Invalid color values';
        }
    }
    Color.ValueTypeError = ValueTypeError;
})(Color || (Color = {}));
//# sourceMappingURL=color.js.map