import ColorUtils from '../color';

describe('ColorUtils hsvToRgb', () => {
  it('ColorUtils.hsvToRgb(0, 1, 1) = {r: 255, g: 0, b: 0}', () => {
    const result = ColorUtils.hsvToRgb(0, 1, 1);
    expect(result).toEqual({ r: 255, g: 0, b: 0 });
  });

  it('ColorUtils.hsvToRgb(0.5, 1, 0.5) = {r: 128, g: 1, b: 0}', () => {
    const result = ColorUtils.hsvToRgb(0.5, 1, 0.5);
    expect(result).toEqual({ r: 128, g: 1, b: 0 });
  });

  it('ColorUtils.hsvToRgb(90, 100, 100) = {r: 128, g: 255, b: 0}', () => {
    const result = ColorUtils.hsvToRgb(90, 100, 100);
    expect(result).toEqual({ r: 128, g: 255, b: 0 });
  });
});

describe('ColorUtils rgbToHsv', () => {
  it('ColorUtils.rgbToHsv(255,0,0) = {h: 0, s: 1, v: 1}', () => {
    const result = ColorUtils.rgbToHsv(255, 0, 0);
    expect(result).toEqual({ h: 0, s: 1, v: 1 });
  });

  it('ColorUtils.rgbToHsv(128,1,0) = {h: 0, s: 1, v: 0.5019607843137255}', () => {
    const result = ColorUtils.rgbToHsv(128, 1, 0);
    expect(result).toEqual({ h: 0, s: 1, v: 0.5019607843137255 });
  });

  it('ColorUtils.rgbToHsv(128, 255, 0) = {h: 90, s: 1, v: 1}', () => {
    const result = ColorUtils.rgbToHsv(128, 255, 0);
    expect(result).toEqual({ h: 90, s: 1, v: 1 });
  });
});

describe('ColorUtils hslToRgb', () => {
  it('ColorUtils.hslToRgb(0, 1, 0.5) = {r: 255, g: 0, b: 0}', () => {
    const result = ColorUtils.hslToRgb(0, 1, 0.5);
    expect(result).toEqual({ r: 255, g: 0, b: 0 });
  });

  it('ColorUtils.rgbToHsv(128,1,0) = {r: 128, g: 255, b: 128}', () => {
    const result = ColorUtils.hslToRgb(120, 1, 0.75);
    expect(result).toEqual({ r: 128, g: 255, b: 128 });
  });

  it('ColorUtils.hslToRgb(240, 1, 0.25) = {r: 0, g: 0, b: 128}', () => {
    const result = ColorUtils.hslToRgb(240, 1, 0.25);
    expect(result).toEqual({ r: 0, g: 0, b: 128 });
  });
});

describe('ColorUtils rgbToHsl', () => {
  it('ColorUtils.rgbToHsl(255, 0, 0) = {h: 0, s: 1, l: 0.5}', () => {
    const result = ColorUtils.rgbToHsl(255, 0, 0);
    expect(result).toEqual({ h: 0, s: 1, l: 0.5 });
  });

  it('ColorUtils.rgbToHsl(128, 255, 128) = {r: 128, g: 255, b: 128}', () => {
    const result = ColorUtils.rgbToHsl(128, 255, 128);
    expect(result).toEqual({ h: 120, s: 1, l: 0.7509803921568627 });
  });

  it('ColorUtils.rgbToHsl(0,0,128) = {h: 240, s: 1, l: 0.25098039215686274}', () => {
    const result = ColorUtils.rgbToHsl(0, 0, 128);
    expect(result).toEqual({ h: 240, s: 1, l: 0.25098039215686274 });
  });
});
// [name, hsv, rgb]
const examples = [
  ['red', [0, 100, 100], [255, 0, 0]],
  ['lime', [120, 100, 100], [0, 255, 0]],
  ['blue', [240, 100, 100], [0, 0, 255]],
  ['yellow', [60, 100, 100], [255, 255, 0]],
  ['cyan', [180, 100, 100], [0, 255, 255]],
  ['magenta', [300, 100, 100], [255, 0, 255]],
  ['red1', [359.4, 100, 100], [255, 0, 3]],
  ['red2', [359.6, 100, 100], [255, 0, 2]],
];
const { color } = ColorUtils;
describe('Color hsv2rgb', () => {
  examples.forEach(([name, hsv, rgb]) => {
    it(`${name} Color.hsv2rgb(${hsv.join()}) = ${rgb.join()}`, () => {
      const result = color.hsv2rgb(...hsv);
      expect(result).toEqual(rgb);
    });
  });
});

describe('Color rgb2hsv', () => {
  examples.forEach(([name, hsv, rgb]) => {
    it(`${name} Color.rgb2hsv(${rgb.join()}) = ${hsv.join()}`, () => {
      const result = color.rgb2hsv(...rgb);
      expect(result).toEqual(hsv);
    });
  });
});
