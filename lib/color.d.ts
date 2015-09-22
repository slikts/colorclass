export declare class Color {
    private rgb;
    constructor(rgb: number[]);
    constructor(rgb: string);
    combine(target: Color, fn: (a: number, b: number) => number): Color;
    mix(target: Color): Color;
    add(target: Color): Color;
    subtract(target: Color): Color;
    map(fn: (value: number, index?: number) => number): Color;
    values(): number[];
    toString(): string;
    static clamp(value: number): number;
    static parse(color: string): number[];
}
export declare namespace Color {
    const WHITE: Color;
    const BLACK: Color;
    const GRAY: Color;
    const RED: Color;
    const GREEN: Color;
    const BLUE: Color;
    class ValueNumberError extends TypeError {
        message: string;
    }
    class ValueTypeError extends TypeError {
        message: string;
    }
}
