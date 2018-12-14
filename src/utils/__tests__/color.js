import ColorUtils from '../color';

describe('ColorUtils hsvToRgb', () => {
  it('ColorUtils.hsvToRgb(0, 1, 1) = {r: 255, g: 0, b: 0}', () => {
    const result = ColorUtils.hsvToRgb(0, 1, 1);
    expect(result).toEqual({r: 255, g: 0, b: 0});
  });

  it('ColorUtils.hsvToRgb(0.5, 1, 0.5) = {r: 128, g: 1, b: 0}', () => {
    const result = ColorUtils.hsvToRgb(0.5, 1, 0.5);
    expect(result).toEqual({r: 128, g: 1, b: 0});
  });

  it('ColorUtils.hsvToRgb(90, 100, 100) = {r: 128, g: 255, b: 0}', () => {
    const result = ColorUtils.hsvToRgb(90, 100, 100);
    expect(result).toEqual({r: 128, g: 255, b: 0});
  });
});

describe('ColorUtils rgbToHsv', () => {
  it('ColorUtils.rgbToHsv(255,0,0) = {h: 0, s: 1, v: 1}', () => {
    const result = ColorUtils.rgbToHsv(255,0,0);
    expect(result).toEqual({h: 0, s: 1, v: 1});
  });

  it('ColorUtils.rgbToHsv(128,1,0) = {h: 0, s: 1, v: 0.5019607843137255}', () => {
    const result = ColorUtils.rgbToHsv(128,1,0);
    expect(result).toEqual({h: 0, s: 1, v: 0.5019607843137255});
  });

  it('ColorUtils.rgbToHsv(128, 255, 0) = {h: 90, s: 1, v: 1}', () => {
    const result = ColorUtils.rgbToHsv(128,255,0);
    expect(result).toEqual({h: 90, s: 1, v: 1});
  });
});

describe('ColorUtils hslToRgb', () => {
  it('ColorUtils.hslToRgb(0, 1, 0.5) = {r: 255, g: 0, b: 0}', () => {
    const result = ColorUtils.hslToRgb(0, 1, 0.5);
    expect(result).toEqual({r: 255, g: 0, b: 0});
  });

  it('ColorUtils.rgbToHsv(128,1,0) = {r: 128, g: 255, b: 128}', () => {
    const result = ColorUtils.hslToRgb(120, 1, 0.75);
    expect(result).toEqual({r: 128, g: 255, b: 128});
  });

  it('ColorUtils.hslToRgb(240, 1, 0.25) = {r: 0, g: 0, b: 128}', () => {
    const result = ColorUtils.hslToRgb(240, 1, 0.25);
    expect(result).toEqual({r: 0, g: 0, b: 128});
  });
});


describe('ColorUtils rgbToHsl', () => {
  it('ColorUtils.rgbToHsl(255, 0, 0) = {h: 0, s: 1, l: 0.5}', () => {
    const result = ColorUtils.rgbToHsl(255, 0, 0);
    expect(result).toEqual({h: 0, s: 1, l: 0.5});
  });

  it('ColorUtils.rgbToHsl(128, 255, 128) = {r: 128, g: 255, b: 128}', () => {
    const result = ColorUtils.rgbToHsl(128, 255, 128);
    expect(result).toEqual({h: 120, s: 1, l: 0.7509803921568627});
  });

  it('ColorUtils.rgbToHsl(0,0,128) = {h: 240, s: 1, l: 0.25098039215686274}', () => {
    const result = ColorUtils.rgbToHsl(0,0,128);
    expect(result).toEqual({h: 240, s: 1, l: 0.25098039215686274});
  });
});
