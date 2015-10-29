/// <reference path="../typings/jasmine/jasmine.d.ts" />

import { Color } from "../lib/color";

describe("instance", () => {
  it("should construct from rgb array", () => {
    new Color([255, 0, 5]);
  });
  it("should construct from css rgb string", () => {
    new Color("rgb(255, 0, 0)");
  });
  it("should not construct from less than 3 or more than 4 values", () => {
    expect(() => {
      new Color(<any>[0, 1]);
    }).toThrow(new Color.ValueNumberError);
    expect(() => {
      new Color([0, 1, 2, 3, 4]);
    }).toThrow(new Color.ValueNumberError);
  });
  it("should convert to string", () => {
    expect(""+Color.RED).toBe("rgb(255, 0, 0)");
    expect(Color.RED.toString()).toBe("rgb(255, 0, 0)");
  });
  it("should mix different colors", () => {
    expect(Color.RED.mix(Color.BLUE)+"").toBe("rgb(128, 0, 128)");
  });
  it("should not construct from invalid values", () => {
    expect(() => { new Color("rgb(255, 0, a)"); }).toThrow(new Color.ValueTypeError);
  });
  it("should clamp values to 0-255", () => {
    expect(new Color([-10,500,128]).slice()).toEqual([0, 255, 128]);
  });
  it("should add different colors", () => {
    expect(Color.BLUE.add(Color.RED).slice()).toEqual([255, 0, 255]);
    expect(Color.RED.add(new Color([0, 32, 0])).slice()).toEqual([255, 32, 0]);
  });
  it("should subtract different colors", () => {
    expect(Color.RED.subtract(new Color([128, 0, 0])).slice()).toEqual([127, 0, 0]);
  });
  it("should map color values", () => {
    expect(Color.RED.map(function(x) { return x * 0.5; }).slice()).toEqual([128, 0, 0]);
  });
});

describe("alpha", () => {
  it("should handle alpha values", () => {
    expect(""+new Color([0, 0, 0, 0])).toBe("rgba(0, 0, 0, 0)");
    expect(""+new Color([0, 0, 0, 0.5])).toBe("rgba(0, 0, 0, 0.5)");
  });
  it("should disallow invalid alpha values", () => {
    expect(() => { new Color([0, 0, 0, 5]); }).toThrow(new Color.InvalidAlphaValue);
    expect(() => { new Color([0, 0, 0, <any>"foo"]); }).toThrow(new Color.InvalidAlphaValue);
    expect(() => { new Color([0, 0, 0, -1]); }).toThrow(new Color.InvalidAlphaValue);
  });
  it("should parse alpha colors", () => {
    expect(""+new Color("rgba(255, 0, 0, 0.1)")).toBe("rgba(255, 0, 0, 0.1)");
  });
});

describe("static", () => {
  it("should clamp values from 0 - 255", () => {
    expect(Color.clamp(256)).toBe(255);
    expect(Color.clamp(-1)).toBe(0);
    expect(Color.clamp(128)).toBe(128);
  });
  it("should parse css rgb() colors", () => {
    expect(Color.parse("rgb(0,0,0)")).toEqual([0, 0, 0]);
  });
  it("should parse invalid css rgb() colors to NaN", () => {
    expect(Color.parse("rgb(a,b,c)").every(isNaN)).toBe(true);
  });
});
