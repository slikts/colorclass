export declare class Color {
    private rgb;
    constructor(rgb: number[]);
    constructor(rgb: string);
    mix(target: Color): Color;
    add(target: Color): Color;
    subtract(target: Color): Color;
    toString(): string;
    values(): number[];
    static clamp(value: number, max?: number, min?: number): number;
    static parse(color: string): number[];
}
export declare namespace Color {
    const WHITE: Color;
    const BLACK: Color;
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
