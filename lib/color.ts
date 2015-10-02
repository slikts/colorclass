
"use strict";


// class Color {
//     constructor(public r: number,
//                 public g: number,
//                 public b: number) {
//     }
//     static scale(k: number, v: Color) { return new Color(k * v.r, k * v.g, k * v.b); }
//     static plus(v1: Color, v2: Color) { return new Color(v1.r + v2.r, v1.g + v2.g, v1.b + v2.b); }
//     static times(v1: Color, v2: Color) { return new Color(v1.r * v2.r, v1.g * v2.g, v1.b * v2.b); }
//     static white = new Color(1.0, 1.0, 1.0);
//     static grey = new Color(0.5, 0.5, 0.5);
//     static black = new Color(0.0, 0.0, 0.0);
//     static background = Color.black;
//     static defaultColor = Color.black;
//     static toDrawingColor(c: Color) {
//         var legalize = d => d > 1 ? 1 : d;
//         return {
//             r: Math.floor(legalize(c.r) * 255),
//             g: Math.floor(legalize(c.g) * 255),
//             b: Math.floor(legalize(c.b) * 255)
//         }
//     }
// }


export class Color {
  private rgb: Color.RGB;

  constructor(rgb: number[]);
  constructor(rgb: string);
  constructor(rgb: any) {
    if (typeof rgb === "string") {
      rgb = Color.parse(rgb);
    }
    if (rgb.length !== 3) {
      throw new Color.ValueNumberError;
    }
    if (rgb.some(isNaN)) {
      throw new Color.ValueTypeError;
    }
    this.rgb = <Color.RGB>rgb.map(Color.clamp).map(Math.round);
  }

  combine(target: Color, fn: (a: number, b: number) => number) {
    return new Color(this.rgb.map((value, index) => {
      return fn(value, target.rgb[index]);
    }));
  }

  mix(target: Color) {
    return this.combine(target, (a, b) => {
      return Math.round((a + b) / 2);
    });
  }

  add(target: Color) {
    return this.combine(target, (a, b) => {
      return a + b;
    });
  }

  subtract(target: Color) {
    return this.combine(target, (a, b) => {
      return a - b;
    });
  }

  map(fn: (value: number, index?: number) => number) {
    return new Color(this.rgb.map(fn));
  }

  values() {
    return this.rgb.slice();
  }

  toString() {
    return `rgb(${ this.rgb.join(",") })`;
  }

  static clamp(value: number) {
    return Math.min(255, Math.max(0, value));
  }

  static parse(color: string) {
    return color.match(/\((.*)\)/)[1].split(",").map((x) => { return +x; });
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
}
