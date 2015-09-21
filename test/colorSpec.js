var Color = require('../lib/color').Color;
var expect = require('expect');

describe('instance methods', function() {
  it('should construct from rgb array', function() {
    new Color([255, 0, 5]);
  });
  it('should construct from css rgb string', function() {
    new Color('rgb(255, 0, 0)');
  });
  it('should not construct from more or less than 3 color values', function() {
    expect(function() {
      new Color([0, 1]);
    }).toThrow(Color.ValueNumberError);
    expect(function() {
      new Color([0, 1, 2, 3]);
    }).toThrow(Color.ValueNumberError);
  });
  it('should convert to string', function() {
    expect(''+Color.RED).toBe('rgb(255,0,0)');
    expect(Color.RED.toString()).toBe('rgb(255,0,0)');
  });
  it('should mix different colors', function() {
    expect(Color.RED.mix(Color.BLUE)+'').toBe('rgb(128,0,128)');
  });
  it('should not construct from invalid values', function() {
    expect(function() {
      new Color('rgb(255, 0, a)');
    }).toThrow(Color.ValueTypeError);
  });
  it('should clamp values to 0-255', function() {
    expect(new Color([-10,500,128]).values()).toEqual([0, 255, 128]);
  });
  it('should add different colors', function() {
    expect(Color.BLUE.add(Color.RED).values()).toEqual([255, 0, 255]);
    expect(Color.RED.add(new Color([-128, 32, 0])).values()).toEqual([127, 32, 0]);
  });
  it('should subtract different colors', function() {
    expect(Color.RED.subtract(new Color([128, 0, 0])).values()).toEqual([127, 0, 0]);
  });
});

describe('class methods', function() {
  it('should clamp values from 0 - 255', function() {
    expect(Color.clamp(256)).toBe(255);
    expect(Color.clamp(-1)).toBe(0);
    expect(Color.clamp(128)).toBe(128);
  });
  it('should parse css rgb() colors', function() {
    expect(Color.parse('rgb(0,0,0)')).toEqual([0, 0, 0]);
  });
  it('should parse invalid css rgb() colors to NaN', function() {
    expect(Color.parse('rgb(a,b,c)').every(Number.isNaN)).toBe(true);
  });
});
