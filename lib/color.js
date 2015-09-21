'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Color = (function () {
    function Color(rgb) {
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
    Color.prototype.mix = function (target) {
        return new Color(this.rgb.map(function (value, index) {
            return Math.round((value + target.rgb[index]) / 2);
        }));
    };
    Color.prototype.add = function (target) {
        return new Color(this.rgb.map(function (value, index) {
            return value + target.rgb[index];
        }));
    };
    Color.prototype.subtract = function (target) {
        return new Color(this.rgb.map(function (value, index) {
            return value - target.rgb[index];
        }));
    };
    Color.prototype.toString = function () {
        return "rgb(" + this.values().join(',') + ")";
    };
    Color.prototype.values = function () {
        return this.rgb.map(function (x) { return Color.clamp(x); });
    };
    Color.clamp = function (value, max, min) {
        if (max === void 0) { max = 255; }
        if (min === void 0) { min = 0; }
        return Math.min(max, Math.max(min, value));
    };
    Color.parse = function (color) {
        return color.match(/\((.*)\)/)[1].split(',').map(function (x) { return +x; });
    };
    return Color;
})();
exports.Color = Color;
var Color;
(function (Color) {
    Color.WHITE = new Color([255, 255, 255]);
    Color.BLACK = new Color([0, 0, 0]);
    Color.RED = new Color([255, 0, 0]);
    Color.GREEN = new Color([0, 255, 0]);
    Color.BLUE = new Color([0, 0, 255]);
    var ValueNumberError = (function (_super) {
        __extends(ValueNumberError, _super);
        function ValueNumberError() {
            _super.apply(this, arguments);
            this.message = 'Wrong number of color values';
        }
        return ValueNumberError;
    })(TypeError);
    Color.ValueNumberError = ValueNumberError;
    var ValueTypeError = (function (_super) {
        __extends(ValueTypeError, _super);
        function ValueTypeError() {
            _super.apply(this, arguments);
            this.message = 'Invalid color values';
        }
        return ValueTypeError;
    })(TypeError);
    Color.ValueTypeError = ValueTypeError;
})(Color = exports.Color || (exports.Color = {}));
//# sourceMappingURL=color.js.map