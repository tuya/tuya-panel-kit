import ColorUtils from '../color';

describe('ColorUtils hsvToRgb', () => {
  it('ColorUtils.hsvToRgb(0, 1, 1) = {r: 255, g: 0, b: 0}', () => {
    const result = ColorUtils.hsvToRgb(0, 1, 1);
    expect(result).toEqual({ r: 255, g: 0, b: 0 });
  });

  it('ColorUtils.hsvToRgb(120, 1, 0.5) = { b: 0, g: 128, r: 0 }', () => {
    const result = ColorUtils.hsvToRgb(120, 1, 0.5);
    expect(result).toEqual({ b: 0, g: 128, r: 0 });
  });

  it('ColorUtils.hsvToRgb(90, 100, 100) = {r: 128, g: 255, b: 0}', () => {
    const result = ColorUtils.hsvToRgb(90, 100, 100);
    expect(result).toEqual({ r: 128, g: 255, b: 0 });
  });

  it('ColorUtils.hsvToRgb(200, 100, 100) = { b: 255, g: 170, r: 0 }', () => {
    const result = ColorUtils.hsvToRgb(200, 100, 100);
    expect(result).toEqual({ b: 255, g: 170, r: 0 });
  });

  it('ColorUtils.hsvToRgb(260, 100, 40) = { b: 255, g: 0, r: 85 }', () => {
    const result = ColorUtils.hsvToRgb(260, 100, 40);
    expect(result).toEqual({ b: 255, g: 0, r: 85 });
  });

  it('ColorUtils.hsvToRgb(300, 100, 40) = { b: 255, g: 0, r: 255 }', () => {
    const result = ColorUtils.hsvToRgb(300, 100, 40);
    expect(result).toEqual({ b: 255, g: 0, r: 255 });
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

  it('ColorUtils.rgbToHsv(0, 0, 0) = {h: -1, s: 0, v: 0}', () => {
    const result = ColorUtils.rgbToHsv(0, 0, 0);
    expect(result).toEqual({ h: -1, s: 0, v: 0 });
  });

  it('ColorUtils.rgbToHsv(0, 0, 255) = { h: 240, s: 1, v: 1 }', () => {
    const result = ColorUtils.rgbToHsv(0, 0, 255);
    expect(result).toEqual({ h: 240, s: 1, v: 1 });
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

  it('ColorUtils.rgbToHsl(255, 255, 255) = {r: 255, g: 255, b: 255}', () => {
    const result = ColorUtils.rgbToHsl(255, 255, 255);
    expect(result).toEqual({ h: NaN, l: 1, s: 0 });
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

describe('ColorUtils Color hex2hsv', () => {
  it('color.hex2hsv(#FF00FF) = [300,100,100]', () => {
    const result = color.hex2hsv('#FF00FF');
    expect(result).toEqual([300, 100, 100]);
  });
});

describe('ColorUtils Color rgb2hex', () => {
  it('color.rgb2hex(255, 255, 255) = #FFFFFF', () => {
    const result = color.rgb2hex(255, 255, 255);
    expect(result).toEqual('#FFFFFF');
  });
});

describe('ColorUtils Color hex2hsb', () => {
  it('color.hex2hsb(#FF00FF) = [300,100,100]', () => {
    const result = color.hex2hsb('#FF00FF');
    expect(result).toEqual([300, 100, 100]);
  });
});

describe('ColorUtils Color hex2hsl', () => {
  it('color.hex2hsl(#FF00FF) = [300, 100, 50]', () => {
    const result = color.hex2hsl('#FF00FF');
    expect(result).toEqual([300, 100, 50]);
  });
});

describe('ColorUtils Color hex2yuv', () => {
  it('color.hex2yuv(#FF00FF) = [105.315, 212.47232, 234.76544]', () => {
    const result = color.hex2yuv('#FF00FF');
    expect(result).toEqual([105.315, 212.47232, 234.76544]);
  });
});

describe('ColorUtils Color yuv2rgb', () => {
  it('color.yuv2rgb(255, 255, 255, 1) = [255, 120.0752, 255, 1]', () => {
    const result = color.yuv2rgb(255, 255, 255, 1);
    expect(result).toEqual([255, 120.0752, 255, 1]);
  });
});

describe('ColorUtils Color hsb2rgb', () => {
  it('color.hsb2rgb(255, 255, 255,1) = [64, 0, 255, 1]', () => {
    const result = color.hsb2rgb(255, 255, 255, 1);
    expect(result).toEqual([64, 0, 255, 1]);
  });
});

describe('ColorUtils Color rgb2hsv', () => {
  it('color.rgb2hsv(255, 255, 255) = [0, 0, 100]', () => {
    const result = color.rgb2hsv(255, 255, 255);
    expect(result).toEqual([0, 0, 100]);
  });
  it('color.rgb2hsv(-1, -1, -1)', () => {
    const result = color.rgb2hsv(-1, -1, -1);
    expect(result).toEqual([0, 0, 0]);
  });
  it('color.rgb2hsv(256, 256, 256)', () => {
    const result = color.rgb2hsv(256, 256, 256);
    expect(result).toEqual([0, 0, 100]);
  });
});

describe('ColorUtils Color rgb2hsb', () => {
  it('color.rgb2hsb(255, 255, 255) = [0, 0, 100]', () => {
    const result = color.rgb2hsb(255, 255, 255);
    expect(result).toEqual([0, 0, 100]);
  });
});

describe('ColorUtils Color hsv2hex', () => {
  it('color.hsv2hex(255, 255, 255) = #4000FF', () => {
    const result = color.hsv2hex(255, 255, 255);
    expect(result).toEqual('#4000FF');
  });
});

describe('ColorUtils Color hsb2hex', () => {
  it('color.hsb2hex(255, 255, 255) = #4000FF', () => {
    const result = color.hsb2hex(255, 255, 255);
    expect(result).toEqual('#4000FF');
  });
});

describe('ColorUtils Color rgb2hsl', () => {
  it('color.rgb2hsl(255, 255, 255) = ["0", "0", "100"]', () => {
    const result = color.rgb2hsl(255, 255, 255);
    expect(result).toEqual(['0', '0', '100']);
  });
  it('color.rgb2hsl(-1, -1, -1) ', () => {
    const result = color.rgb2hsl(-1, -1, -1);
    expect(result).toEqual(['0', '0', '0']);
  });
  it('color.rgb2hsl(256, 256, 256)', () => {
    const result = color.rgb2hsl(256, 256, 256);
    expect(result).toEqual(['0', '0', '100']);
  });
});

describe('ColorUtils Color hsl2rgb', () => {
  it('color.hsl2rgb(255, 255, 255) = [255, 255, 255]', () => {
    const result = color.hsl2rgb(255, 255, 255);
    expect(result).toEqual([255, 255, 255]);
  });
});

describe('ColorUtils Color hsl2hex', () => {
  it('color.hsl2hex(255, 255, 255) = "#FFFFFF"', () => {
    const result = color.hsl2hex(255, 255, 255);
    expect(result).toEqual('#FFFFFF');
  });
});

describe('ColorUtils Color complement', () => {
  it('color.complement("rgba(255,33,46)") = "#21FFF2"', () => {
    const result = color.complement('rgba(255,33,46)');
    expect(result).toEqual('#21FFF2');
  });
});

describe('ColorUtils Color reversed', () => {
  it('color.reversed("rgba(255,33,46)") = "#21FFF2"', () => {
    const result = color.reversed('rgba(255,33,46)');
    expect(result).toEqual('#00DED1');
  });
});

describe('ColorUtils Color hex2RgbString', () => {
  it('color.hex2RgbString("#333333", 0.5) = "rgba(51, 51, 51, 0.5)"', () => {
    const result = color.hex2RgbString('#333333', 0.5);
    expect(result).toEqual('rgba(51, 51, 51, 0.5)');
  });
});

describe('ColorUtils Color hsv2RgbString', () => {
  it('color.hsv2RgbString(51, 51, 51, 0.5) =  "rgba(130, 120, 64, 0.5)"', () => {
    const result = color.hsv2RgbString(51, 51, 51, 0.5);
    expect(result).toEqual('rgba(130, 120, 64, 0.5)');
  });
});

describe('ColorUtils Color hsb2RgbString', () => {
  it('color.hsb2RgbString(51, 51, 51, 0.5) =  "rgba(130, 120, 64, 0.5)"', () => {
    const result = color.hsb2RgbString(51, 51, 51, 0.5);
    expect(result).toEqual('rgba(130, 120, 64, 0.5)');
  });
});

describe('ColorUtils Color hsl2RgbString', () => {
  it('color.hsl2RgbString(51, 51, 51, 0.5) =  "rgba(130, 120, 64, 0.5)"', () => {
    const result = color.hsl2RgbString(51, 51, 51, 0.5);
    expect(result).toEqual('rgba(194, 175, 66, 0.5)');
  });
});

describe('ColorUtils Color yuv2RgbString', () => {
  it('color.yuv2RgbString(51, 51, 51, 0.5) =  "rgba(0, 133, 0, 0.5)"', () => {
    const result = color.yuv2RgbString(51, 51, 51, 0.5);
    expect(result).toEqual('rgba(0, 133, 0, 0.5)');
  });
});

describe('ColorUtils Color encodeColorData', () => {
  it('color.encodeColorData([51, 51, 51, 100, 100]) =  "333333006464"', () => {
    const result = color.encodeColorData([51, 51, 51, 100, 100]);
    expect(result).toEqual('333333006464');
  });
});

describe('ColorUtils Color decodeColorData', () => {
  it('color.decodeColorData("") =  [0, 0, 0, 0, 0, 0]', () => {
    const result = color.decodeColorData('');
    expect(result).toEqual([0, 0, 0, 0, 0, 0]);
  });
});

describe('ColorUtils Color decodeColorDataWithPosition', () => {
  it('color.decodeColorDataWithPosition("") = [0, 0, 0, 0, 0, 0, 0]', () => {
    const result = color.decodeColorDataWithPosition('');
    expect(result).toEqual([0, 0, 0, 0, 0, 0, 0]);
  });
});

describe('ColorUtils Color encodeColorDataWithPosition', () => {
  it('color.encodeColorDataWithPosition([233, 210, 23, 55, 46, 55, 68]) = "e9d21715113744"', () => {
    const result = color.encodeColorDataWithPosition([233, 210, 23, 55, 46, 55, 68]);
    expect(result).toEqual('e9d21715113744');
  });
});

describe('ColorUtils Color encodeSceneData', () => {
  it('color.encodeSceneData([]) = ""', () => {
    const result = color.encodeSceneData([]);
    expect(result).toEqual('');
  });

  it('color.encodeSceneData([34, 46, 23]) = "222e17"', () => {
    const result = color.encodeSceneData([34, 46, 23]);
    expect(result).toEqual('222e17');
  });
});

describe('ColorUtils Color kelvin2rgbUsingTH', () => {
  it('color.kelvin2rgbUsingTH(360) = [255, 0, 0]', () => {
    const result = color.kelvin2rgbUsingTH(360);
    expect(result).toEqual([255, 0, 0]);
  });

  it('color.kelvin2rgbUsingTH(3200) =  [255, 183.61996363685068, 123.1193950227788]', () => {
    const result = color.kelvin2rgbUsingTH(3200);
    expect(result).toEqual([255, 183.61996363685068, 123.1193950227788]);
  });

  it('color.kelvin2rgbUsingTH(6800) =  [249.9317249858929, 246.25211663800485, 255]', () => {
    const result = color.kelvin2rgbUsingTH(6800);
    expect(result).toEqual([249.9317249858929, 246.25211663800485, 255]);
  });
});

describe('ColorUtils Color kelvin2rgb', () => {
  it('color.kelvin2rgb(360) = [255, 0, 0]', () => {
    const result = color.kelvin2rgb([360]);
    expect(result).toEqual([255, 0, 0]);
  });
});

describe('ColorUtils Color kelvin2rgb', () => {
  it('color.kelvin2rgb([360]) = [255, 0, 0]', () => {
    const result = color.kelvin2rgb([360]);
    expect(result).toEqual([255, 0, 0]);
  });

  it('color.kelvin2rgb([9000]) = [212.85834850381497, 225.02352251471098, 255]', () => {
    const result = color.kelvin2rgb([9000]);
    expect(result).toEqual([212.85834850381497, 225.02352251471098, 255]);
  });
});

describe('ColorUtils Color toRgbString', () => {
  it('color.toRgbString([233, 21, 36], 0.8) = "rgba(233, 21, 36, 0.8)"', () => {
    const result = color.toRgbString([233, 21, 36], 0.8);
    expect(result).toEqual('rgba(233, 21, 36, 0.8)');
  });
});

describe('ColorUtils Color rgb2kelvin', () => {
  it('color.rgb2kelvin([112, 255, 46]) = 2946', () => {
    const result = color.rgb2kelvin([112, 255, 46]);
    expect(result).toEqual(2946);
  });

  it('color.rgb2kelvin([255, 255, 255]) = 6524', () => {
    const result = color.rgb2kelvin([255, 255, 255]);
    expect(result).toEqual(6524);
  });
});

describe('ColorUtils Color decodeSceneDataWithMode', () => {
  it('color.rgb2kelvin("") = []', () => {
    const result = color.decodeSceneDataWithMode('');
    expect(result).toEqual([]);
  });

  it('color.rgb2kelvin([255, 255, 255]) = 6524', () => {
    const result = color.decodeSceneDataWithMode('ltfcmrgbhsvbtmrgbhsvbt');
    expect(result).toEqual([NaN, 252, NaN, NaN]);
  });
});

describe('ColorUtils calculateWhiteColorForView', () => {
  it('ColorUtils.calculateWhiteColorForView(0.6, 0.8) = "rgb(255, 255, 255)"', () => {
    const result = ColorUtils.calculateWhiteColorForView(0.6, 0.8);
    expect(result).toEqual('rgb(255, 255, 255)');
  });
});

describe('ColorUtils Color decodeSceneData', () => {
  it('color.decodeSceneData([r,g,b,r,g,b,r,g,b]) = ""', () => {
    const result = color.decodeSceneData('rgba(255,255,255)');
    expect(result).toEqual([NaN, 186, 37, 0.3333333333333333, [37, NaN, NaN]]);
  });
  it('color.decodeSceneData() = []', () => {
    const result = color.decodeSceneData();
    expect(result).toEqual([]);
  });
});

describe('ColorUtils Color random', () => {
  it('color.randomRgb()', () => {
    color.randomRgb();
    color.randomRgb(255, 0);
  });
  it('color.randomHsb()', () => {
    color.randomHsb();
  });
});
