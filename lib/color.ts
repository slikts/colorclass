export class Color {
  private _rgb: Color.RGB;
  private _alpha = 1;

  constructor(rgba: [number, number, number, number]);
  constructor(rgba: Color.RGB);
  constructor(rgba: string);
  constructor(rgba: any) {
    if (typeof rgba === "string") {
      rgba = Color.parse(rgba);
    }
    if (rgba.length < 3 || rgba.length > 4) {
      throw new Color.ValueNumberError;
    }
    if (rgba.length === 4) {
      this.alpha = rgba[3];
    }
    this.rgb = rgba.slice(0, 3);
  }

  private get alpha() { return this._alpha; }
  private set alpha(value: number) {
    if (isNaN(value) || value < 0 || value > 1) {
      throw new Color.InvalidAlphaValue;
    }
    this._alpha = value;
  }

  private get rgb() { return this._rgb; }
  private set rgb(values: Color.RGB) {
    if (values.some(isNaN)) {
      throw new Color.ValueTypeError;
    }
    this._rgb = <Color.RGB>values.map(Color.clamp).map(Math.round);
  }

  apply(target: Color, fn: (a: number, b: number) => number) {
    return this.map((value, index) => {
      return fn(value, target._rgb[index]);
    });
  }

  mix(target: Color) {
    return this.apply(target, (a, b) => {
      return Math.round((a + b) / 2);
    });
  }

  add(target: Color) {
    return this.apply(target, (a, b) => {
      return a + b;
    });
  }

  subtract(target: Color) {
    return this.apply(target, (a, b) => {
      return a - b;
    });
  }

  map(fn: (value: number, index?: number) => number) {
    return new Color(<Color.RGB>this._rgb.map(fn));
  }

  slice() {
    return this._rgb.slice();
  }

  toString() {
    let values = this._rgb.join(", ");
    return this._alpha === 1 ? `rgb(${ values })` : `rgba(${ values }, ${ this._alpha })`;
  }

  static clamp(value: number) {
    return Math.min(255, Math.max(0, value));
  }

  static parse(color: string) {
    return color.match(/rgba?\((.*?)\)/)[1].split(",").map(x => +x);
  }
}

export namespace Color {
  export type RGB = [number, number, number];
  export const WHITE = new Color([255, 255, 255]);
  export const BLACK = new Color([0, 0, 0]);
  export const GRAY = new Color([127, 127, 127]);
  export const RED = new Color([255, 0, 0]);
  export const GREEN = new Color([0, 255, 0]);
  export const BLUE = new Color([0, 0, 255]);

  export class ValueNumberError extends TypeError {
    message = "Wrong number of color values";
  }

  export class ValueTypeError extends TypeError {
    message = "Invalid color values";
  }

  export class InvalidAlphaValue extends TypeError {
    message = "Invalid alpha value";
  }
}
