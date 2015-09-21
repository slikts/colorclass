'use strict';

export class Color {
  private rgb: [number, number, number]

  constructor(rgb: number[]);
  constructor(rgb: string);
  constructor(rgb: any) {
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

  mix(target: Color) {
    return new Color(this.rgb.map((value, index) => {
      return Math.round((value + target.rgb[index]) / 2);
    }));
  }

  add(target: Color) {
    return new Color(this.rgb.map((value, index) => {
      return value + target.rgb[index];
    }));
  }

  subtract(target: Color) {
    return new Color(this.rgb.map((value, index) => {
      return value - target.rgb[index];
    }));
  }

  toString() {
    return `rgb(${ this.values().join(',') })`;
  }

  values() {
    return this.rgb.map((x) => { return Color.clamp(x); });
  }

  static clamp(value: number, max = 255, min = 0) {
    return Math.min(max, Math.max(min, value));
  }

  static parse(color: string) {
    return color.match(/\((.*)\)/)[1].split(',').map((x) => { return +x; });
  }
}

export namespace Color {
  export const WHITE = new Color([255, 255, 255]);
  export const BLACK = new Color([0, 0, 0]);
  export const RED = new Color([255, 0, 0]);
  export const GREEN = new Color([0, 255, 0]);
  export const BLUE = new Color([0, 0, 255]);

  export class ValueNumberError extends TypeError {
    message = 'Wrong number of color values';
  }

  export class ValueTypeError extends TypeError {
    message = 'Invalid color values';
  }
}
