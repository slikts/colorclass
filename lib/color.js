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
        this.rgb = rgb.map(Color.clamp).map(Math.round);
    }
    Color.prototype.combine = function (target, fn) {
        return new Color(this.rgb.map(function (value, index) {
            return fn(value, target.rgb[index]);
        }));
    };
    Color.prototype.mix = function (target) {
        return this.combine(target, function (a, b) {
            return Math.round((a + b) / 2);
        });
    };
    Color.prototype.add = function (target) {
        return this.combine(target, function (a, b) {
            return a + b;
        });
    };
    Color.prototype.subtract = function (target) {
        return this.combine(target, function (a, b) {
            return a - b;
        });
    };
    Color.prototype.map = function (fn) {
        return new Color(this.rgb.map(fn));
    };
    Color.prototype.values = function () {
        return this.rgb.slice();
    };
    Color.prototype.toString = function () {
        return "rgb(" + this.rgb.join(',') + ")";
    };
    Color.clamp = function (value) {
        return Math.min(255, Math.max(0, value));
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
    Color.GRAY = new Color([127, 127, 127]);
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