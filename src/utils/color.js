/* eslint-disable */
const maxIn = 255;

const parse = (d, len = 2) => {
  d += '';
  if (d.length < len) {
    d = '0'.repeat(len - d.length) + d;
  } else {
    d = d.slice(0, len);
  }
  return d;
};

const limit = (number, min, max) => Math.min(max, Math.max(min, number));
class Color {
  decode(color) {
    let rgb;

    if (/^rgb/.test(color)) {
      const matcher =
        color.match(
          // eslint-disable-next-line
          /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*([\.\d]+))?\)/
        ) || [];
      rgb = [matcher[1], matcher[2], matcher[3]].map(item => parseInt(item, 10));
      let alpha = matcher[4];
      if (alpha !== undefined) {
        alpha = alpha > 1 ? 1 : alpha < 0 ? 0 : alpha;
        rgb.push(alpha);
      }
      return rgb;
    }

    // eslint-disable-next-line
    color = color.replace(/^#/, '');
    const len = color.length;
    if (len !== 6 && len !== 3) {
      // eslint-disable-next-line
      color = '000000';
    }
    if (len === 3) {
      rgb = color.split('').map(item => `${item}${item}`);
    } else {
      rgb = color.match(/[0-9a-f]{2}/gi) || [];
    }
    return rgb.map(i => {
      // eslint-disable-next-line
      i = parseInt(i, 16);
      // eslint-disable-next-line
      if (i < 0) i = 0;
      // eslint-disable-next-line
      if (i > maxIn) i = maxIn;
      return i;
    });
  }

  hex2hsv(hex) {
    let [r, g, b] = this.decode(hex);

    r /= maxIn;
    g /= maxIn;
    b /= maxIn;

    const M = Math.max(r, g, b);
    const m = Math.min(r, g, b);
    const C = M - m;
    let h;
    let s;
    let v;

    if (C === 0) h = 0;
    else if (M === r) h = ((g - b) / C) % 6;
    else if (M === g) h = (b - r) / C + 2;
    else h = (r - g) / C + 4;
    h *= 60;
    if (h < 0) h += 360;
    v = M;
    if (C === 0) s = 0;
    else s = C / v;
    s *= 100;
    v *= 100;
    return [h, s, v];
  }

  hex2hsb(hex) {
    return this.hex2hsv(hex);
  }

  rgb2hex(r, g, b) {
    let hex = Math.round(r * 65536) + Math.round(g * 256) + Math.round(b);
    hex = hex.toString(16, 6);
    const len = hex.length;
    if (len < 6) for (let i = 0; i < 6 - len; i++) hex = `0${hex}`;
    hex = hex.toUpperCase();
    return `#${hex}`;
  }

  hex2hsl(hex) {
    let [r, g, b] = this.decode(hex);
    r /= maxIn;
    g /= maxIn;
    b /= maxIn;
    const M = Math.max(r, g, b);
    const m = Math.min(r, g, b);
    const d = M - m;
    let h;
    let l;
    let s;
    if (d === 0) h = 0;
    else if (M === r) h = ((g - b) / d) % 6;
    else if (M === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
    l = (M + m) / 2;
    if (d === 0) s = 0;
    else s = d / (1 - Math.abs(2 * l - 1));
    s *= 100;
    l *= 100;
    return [h, s, l];
  }

  hex2yuv(hex) {
    const [r, g, b] = this.decode(hex);
    const y = r * 0.299 + g * 0.587 + b * 0.114;
    const u = r * -0.168736 + g * -0.331264 + b * 0.5 + 128;
    const v = r * 0.5 + g * -0.418688 + b * -0.081312 + 128;

    return [y, u, v];
  }

  yuv2rgb(y, u, v, a) {
    let r;
    let g;
    let b;

    // y = parseInt(y);
    // u = parseInt(u);
    // v = parseInt(v);

    r = y + 1.4075 * (v - 128);
    g = y - 0.3455 * (u - 128) - 0.7169 * (v - 128);
    b = y + 1.779 * (u - 128);

    // r = Math.floor(r);
    // g = Math.floor(g);
    // b = Math.floor(b);

    r = r < 0 ? 0 : r;
    r = r > maxIn ? maxIn : r;

    g = g < 0 ? 0 : g;
    g = g > maxIn ? maxIn : g;

    b = b < 0 ? 0 : b;
    b = b > maxIn ? maxIn : b;

    const rgb = [r, g, b];
    if (a !== undefined) {
      rgb.push(a > 1 ? 1 : a < 0 ? 0 : a);
    }
    return rgb;
  }

  hsv2rgb(h = 0, s = 0, v = 0, a) {
    const hsb = [h, s, v].map((bit, i) => {
      let _bit = bit;
      if (_bit) _bit = parseFloat(_bit);
      if (i === 0) {
        // eslint-disable-next-line
        return Math.round((_bit %= 360) < 0 ? _bit + 360 : _bit);
      }
      return limit(Math.round(bit), 0, 100);
    });

    const br = Math.round(hsb[2] / 100 * 255);
    if (hsb[1] === 0) return [br, br, br];

    const hue = hsb[0];
    const f = hue % 60;
    const p = Math.round(hsb[2] * (100 - hsb[1]) / 10000 * 255);
    const q = Math.round(hsb[2] * (6000 - hsb[1] * f) / 600000 * 255);
    const t = Math.round(hsb[2] * (6000 - hsb[1] * (60 - f)) / 600000 * 255);

    let rgb;
    switch (Math.floor(hue / 60)) {
      case 0:
        rgb = [br, t, p];
        break;
      case 1:
        rgb = [q, br, p];
        break;
      case 2:
        rgb = [p, br, t];
        break;
      case 3:
        rgb = [p, q, br];
        break;
      case 4:
        rgb = [t, p, br];
        break;
      default:
        rgb = [br, p, q];
        break;
    }
    if (a !== undefined) {
      rgb.push(limit(Number(a), 0, 1));
    }
    return rgb;
  }

  hsb2rgb(h, s, b, a) {
    return this.hsv2rgb(h, s, b, a);
  }

  rgb2hsv(r = 0, g = 0, b = 0) {
    r = parseFloat(r);
    g = parseFloat(g);
    b = parseFloat(b);
    if (r < 0) r = 0;
    if (g < 0) g = 0;
    if (b < 0) b = 0;
    if (r > 255) r = 255;
    if (g > 255) g = 255;
    if (b > 255) b = 255;
    r /= 255;
    g /= 255;
    b /= 255;
    const M = Math.max(r, g, b);
    const m = Math.min(r, g, b);
    const C = M - m;
    let h, s, v;
    if (C == 0) h = 0;
    else if (M == r) h = ((g - b) / C) % 6;
    else if (M == g) h = (b - r) / C + 2;
    else h = (r - g) / C + 4;
    h *= 60;
    if (h < 0) h += 360;
    v = M;
    if (C == 0) s = 0;
    else s = C / v;
    s *= 100;
    v *= 100;
    return [h, s, v];
  }

  rgb2hsb(r, g, b) {
    return this.rgb2hsv(r, g, b);
  }

  hsv2hex(h, s, v) {
    const rgb = this.hsv2rgb(h, s, v).map(item => Math.round(item));
    return this.rgb2hex.apply(this, rgb);
  }

  hsb2hex(h, s, b) {
    return this.hsv2hex(h, s, b);
  }

  rgb2hsl(r = 0, g = 0, b = 0) {
    r = parseFloat(r);
    g = parseFloat(g);
    b = parseFloat(b);
    if (r < 0) r = 0;
    if (g < 0) g = 0;
    if (b < 0) b = 0;
    if (r > 255) r = 255;
    if (g > 255) g = 255;
    if (b > 255) b = 255;
    r /= 255;
    g /= 255;
    b /= 255;
    const M = Math.max(r, g, b);
    const m = Math.min(r, g, b);
    const d = M - m;
    let h, s, l;
    if (d == 0) h = 0;
    else if (M == r) h = ((g - b) / d) % 6;
    else if (M == g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
    l = (M + m) / 2;
    if (d == 0) s = 0;
    else s = d / (1 - Math.abs(2 * l - 1));
    s *= 100;
    l *= 100;
    h = h.toFixed(0);
    s = s.toFixed(0);
    l = l.toFixed(0);
    return [h, s, l];
  }

  hsl2rgb(h = 0, s = 0, l = 0, a) {
    h = parseFloat(h);
    s = parseFloat(s);
    l = parseFloat(l);
    if (h < 0) h = 0;
    if (s < 0) s = 0;
    if (l < 0) l = 0;
    if (h >= 360) h = 359;
    if (s > 100) s = 100;
    if (l > 100) l = 100;
    s /= 100;
    l /= 100;
    const C = (1 - Math.abs(2 * l - 1)) * s;
    const hh = h / 60;
    const X = C * (1 - Math.abs(hh % 2 - 1));
    let r = 0;
    let g = 0;
    let b = 0;
    if (hh >= 0 && hh < 1) {
      r = C;
      g = X;
    } else if (hh >= 1 && hh < 2) {
      r = X;
      g = C;
    } else if (hh >= 2 && hh < 3) {
      g = C;
      b = X;
    } else if (hh >= 3 && hh < 4) {
      g = X;
      b = C;
    } else if (hh >= 4 && hh < 5) {
      r = X;
      b = C;
    } else {
      r = C;
      b = X;
    }
    const m = l - C / 2;
    r += m;
    g += m;
    b += m;
    r *= maxIn;
    g *= maxIn;
    b *= maxIn;
    // r = Math.floor(r);
    // g = Math.floor(g);
    // b = Math.floor(b);

    const rgb = [r, g, b];
    if (a !== undefined) {
      rgb.push(a > 1 ? 1 : a < 0 ? 0 : a);
    }
    return rgb;
  }

  hsl2hex(h, s, l) {
    const rgb = this.hsl2rgb(h, s, l);
    return this.rgb2hex(...rgb);
  }

  randomRgb(min = 0, max = 255) {
    const random = (mi, ma) => {
      let x = max;
      let y = min;
      if (x < y) {
        x = mi;
        y = ma;
      }
      return Math.random() * (x - y) + y;
    };

    return [random(min, max), random(min, max), random(min, max)];
  }

  randomHsb() {
    const random = (min, max) => {
      let x = max;
      let y = min;
      if (x < y) {
        x = min;
        y = max;
      }
      return Math.random() * (x - y) + y;
    };

    return [random(0, 360), random(0, 100), random(0, 100)];
  }

  // 补色
  complement(color) {
    const rgb = this.decode(color).map(item => Math.round(item));
    const mm = Math.min(...rgb) + Math.max(...rgb);
    const hex = this.rgb2hex(...rgb.map(item => mm - item));
    return hex;
  }

  // 反相
  reversed(color) {
    const rgb = this.decode(color).map(item => Math.round(item));
    return this.rgb2hex(...rgb.map(item => maxIn - item));
  }

  hex2RgbString(hex, a) {
    const rgb = this.decode(hex);
    return toRgbString(rgb, a);
  }

  hsv2RgbString(h, s, v, a) {
    const rgb = this.hsv2rgb(h, s, v, a);
    return toRgbString(rgb);
  }

  hsb2RgbString(...args) {
    return this.hsv2RgbString.apply(this, args);
  }

  hsl2RgbString(h, s, l, a) {
    const rgb = this.hsl2rgb(h, s, l, a);
    return toRgbString(rgb);
  }

  yuv2RgbString(y, u, v, a) {
    const rgb = this.yuv2rgb(y, u, v, a);
    return toRgbString(rgb);
  }

  encodeColorData(rgbhsv) {
    let rgb = rgbhsv.slice(0, 3);
    let hsv = rgbhsv.slice(3);
    rgb = rgb.map(item => (item < 0 ? 0 : item > 255 ? 255 : item));
    if (hsv.length === 0) {
      hsv = Array(4).fill(0);
    } else {
      let h = hsv[0];
      h = h % 360 ? h % 360 : h;
      h = h < 0 ? 360 + h : h;
      const hh = parseInt(h / 256, 10);
      const hl = parseInt(h % 256, 10);
      hsv.splice(1, 0, hl);
      hsv[0] = hh;
    }
    return rgb
      .concat(hsv)
      .map(item => parse(Math.round(item).toString(16), 2))
      .join('');
  }

  decodeColorData(data = '') {
    // rrggbbhhhlssvv
    // hh 小于等于255色相值
    // hl 大于255小于等于360的色相值
    const arr1 = data.match(/[a-z\d]{2}/gi) || [];
    const len = 7 - arr1.length;
    const arr2 = Array(len < 0 ? 0 : len).fill('00');
    const arr = arr1.concat(arr2);
    const hsv = arr.slice(3);
    const rgb = arr.slice(0, 3).map(item => parseInt(item, 16));
    const h = parseInt(hsv[0] + hsv[1], 16);
    const s = parseInt(hsv[2], 16);
    const v = parseInt(hsv[3], 16);
    return [...rgb, h, s, v];
  }

  decodeColorDataWithPosition(data = '') {
    // rrggbbxxyyvv00
    // xx 0 - 100 x坐标
    // yy 0 - 100 y坐标
    const arr1 = data.match(/[a-z\d]{2}/gi) || [];
    const len = 7 - arr1.length;
    const arr2 = Array(len < 0 ? 0 : len).fill('00');
    const arr = arr1.concat(arr2);
    const rs = arr.map(item => parseInt(item, 16));
    rs[3] /= 100;
    rs[4] /= 100;
    return rs;
  }

  encodeColorDataWithPosition(rgbxyve) {
    let rgb = rgbxyve.slice(0, 3);
    let xyve = rgbxyve.slice(3);
    rgb = rgb.map(item => (item < 0 ? 0 : item > 255 ? 255 : item));
    let len = 4 - xyve.length;
    len = len < 0 ? 0 : len;
    xyve = xyve.concat(Array(len).fill(0));
    const [x, y] = xyve;
    xyve[0] = x * 100;
    xyve[1] = y * 100;

    return rgb
      .concat(xyve)
      .map(item => parse(Math.round(item).toString(16), 2))
      .join('');
  }

  encodeSceneData(data) {
    if (data.length === 0) {
      return '';
    }
    const reduce = (d, init) =>
      d.reduce((curr, next) => {
        if (next.concat) {
          return reduce(next, curr);
        }
        return curr + parse(Math.round(next).toString(16), 2);
      }, init);

    return reduce(data, '');
  }

  decodeSceneData(data) {
    if (!data) {
      return [];
    }
    // l 亮度
    // t 色温
    // f 变化频率
    // c 可变化的颜色数量
    // [r,g,b,r,g,b,r,g,b]
    const arr = data.match(/[a-z\d]{2}/gi);
    const [l, t, f, c, ...d] = arr;
    const ltfc = [l, t, f, c].map(item => parseInt(item, 16));
    const rgbs = [];

    const count = Math.min(ltfc[3], d.length / 3) || 1;
    ltfc[3] = count;

    for (let i = 0; i < count; i++) {
      const n = i * 3 - 1;
      rgbs.push([d[n + 1], d[n + 2], d[n + 3]].map(item => parseInt(item, 16)));
    }
    return ltfc.concat(rgbs);
  }

  // data = [l,t,f,c,m,r,g,b,h,s,v,b,t,m,r,g,b,h,s,v,b,t]
  decodeSceneDataWithMode(data) {
    if (!data) {
      return [];
    }
    // l 亮度
    // t 色温
    // f 变化频率
    // c 可变化的颜色数量
    // [m,r,g,b,b,t,x,y,m,r,g,b,b,t,x,y,m,r,g,b,b,t,x,y]
    // m 模式
    // r,g,b 红绿蓝
    // b 白光亮度 t白光色温
    // x,y为坐标
    const arr = data.match(/[a-z\d]{2}/gi);
    const [l, t, f, c, ...d] = arr;
    const ltfc = [l, t, f, c].map(item => parseInt(item, 16));
    const mrgbhsvbt = [];

    const count = Math.min(ltfc[3], d.length / 8);
    ltfc[3] = count;

    for (let i = 0; i < count; i++) {
      const n = i * 8 - 1;
      const _arr = [];
      let j = 1;
      while (j < 9) {
        _arr.push(d[n + j]);
        j++;
      }
      mrgbhsvbt.push(_arr.map(item => parseInt(item, 16)));
    }
    return ltfc.concat(mrgbhsvbt);
  }

  toRgbString(rgb, a) {
    return toRgbString(rgb, a);
  }

  /**
   *
   *  Neil Bartlett
   *  neilbartlett.com
   *  2015-01-22
   *
   *  Copyright [2015] [Neil Bartlett] *
   *
   * Color Temperature is the color due to black body radiation at a given
   * temperature. The temperature is given in Kelvin. The concept is widely used
   * in photography and in tools such as f.lux.
   *
   * The function here converts a given color temperature into a near equivalent
   * in the RGB colorspace. The function is based on a curve fit on standard sparse
   * set of Kelvin to RGB mappings.
   *
   * Two conversions are presented here. The one colorTempertature2RGBUSingTH
   * is a JS version of the algorithm developed by Tanner Helland. The second is a
   * slightly more accurate conversion based on a refitting of the original data
   * using different curve fit functions. The performance cost of the two
   * approaches is very similar and in general the second algorithm is preferred.
   *
   * NOTE The approximations used are suitable for photo-mainpulation and other
   * non-critical uses. They are not suitable for medical or other high accuracy
   * use cases.
   *
   * Accuracy is best between 1000K and 40000K.
   *
   * See http://github.com/neilbartlett/color-temperature for further details.
   *
   **/

  /**
   * A JS verion of Tanner Helland's original algorithm.
   * Input: color temperature in degrees Kelvin
   * Output: json object of red, green and blue components of the Kelvin temperature
   */
  kelvin2rgbUsingTH(kelvin) {
    const temperature = kelvin / 100.0;
    let red;
    let green;
    let blue;

    if (temperature <= 66.0) {
      red = 255;
    } else {
      red = temperature - 60.0;
      red = 329.698727446 * Math.pow(red, -0.1332047592);
      if (red < 0) red = 0;
      if (red > 255) red = 255;
    }

    /* Calculate green */

    if (temperature <= 66.0) {
      green = temperature;
      green = 99.4708025861 * Math.log(green) - 161.1195681661;
      if (green < 0) green = 0;
      if (green > 255) green = 255;
    } else {
      green = temperature - 60.0;
      green = 288.1221695283 * Math.pow(green, -0.0755148492);
      if (green < 0) green = 0;
      if (green > 255) green = 255;
    }

    /* Calculate blue */

    if (temperature >= 66.0) {
      blue = 255;
    } else if (temperature <= 19.0) {
      blue = 0;
    } else {
      blue = temperature - 10;
      blue = 138.5177312231 * Math.log(blue) - 305.0447927307;
      if (blue < 0) blue = 0;
      if (blue > 255) blue = 255;
    }

    return [red, green, blue];
  }

  /**
   * A more accurate version algorithm based on a different curve fit to the
   * original RGB to Kelvin data.
   * Input: color temperature in degrees Kelvin
   * Output: json object of red, green and blue components of the Kelvin temperature
   */
  kelvin2rgb(kelvin) {
    const temperature = kelvin / 100.0;
    let red;
    let green;
    let blue;

    if (temperature < 66.0) {
      red = 255;
    } else {
      // a + b x + c Log[x] /.
      // {a -> 351.97690566805693`,
      // b -> 0.114206453784165`,
      // c -> -40.25366309332127
      // x -> (kelvin/100) - 55}
      red = temperature - 55.0;
      red =
        351.97690566805693 +
        0.114206453784165 * red -
        40.25366309332127 * Math.log(red);
      if (red < 0) red = 0;
      if (red > 255) red = 255;
    }

    /* Calculate green */

    if (temperature < 66.0) {
      // a + b x + c Log[x] /.
      // {a -> -155.25485562709179`,
      // b -> -0.44596950469579133`,
      // c -> 104.49216199393888`,
      // x -> (kelvin/100) - 2}
      green = temperature - 2;
      green =
        -155.25485562709179 -
        0.44596950469579133 * green +
        104.49216199393888 * Math.log(green);
      if (green < 0) green = 0;
      if (green > 255) green = 255;
    } else {
      // a + b x + c Log[x] /.
      // {a -> 325.4494125711974`,
      // b -> 0.07943456536662342`,
      // c -> -28.0852963507957`,
      // x -> (kelvin/100) - 50}
      green = temperature - 50.0;
      green =
        325.4494125711974 +
        0.07943456536662342 * green -
        28.0852963507957 * Math.log(green);
      if (green < 0) green = 0;
      if (green > 255) green = 255;
    }

    /* Calculate blue */

    if (temperature >= 66.0) {
      blue = 255;
    } else if (temperature <= 20.0) {
      blue = 0;
    } else {
      // a + b x + c Log[x] /.
      // {a -> -254.76935184120902`,
      // b -> 0.8274096064007395`,
      // c -> 115.67994401066147`,
      // x -> kelvin/100 - 10}
      blue = temperature - 10;
      blue =
        -254.76935184120902 +
        0.8274096064007395 * blue +
        115.67994401066147 * Math.log(blue);
      if (blue < 0) blue = 0;
      if (blue > 255) blue = 255;
    }

    return [red, green, blue];
  }

  /**
   convert an rgb in JSON format into to a Kelvin color temperature
   */
  rgb2kelvin([r, , b]) {
    const epsilon = 0.4;
    let temperature;
    let minTemperature = 1000;
    let maxTemperature = 40000;
    while (maxTemperature - minTemperature > epsilon) {
      temperature = (maxTemperature + minTemperature) / 2;
      const [_r, , _b] = this.kelvin2rgb(temperature);
      if (_b / _r >= b / r) {
        maxTemperature = temperature;
      } else {
        minTemperature = temperature;
      }
    }
    return Math.round(temperature);
  }
}

const toRgbString = (rgb, a) => {
  const len = rgb.length;

  if (len === 4) {
    a = rgb.pop();
  }
  rgb = rgb.map(item => Math.round(item));
  if (len === 4) {
    rgb.push(a);
    return `rgba(${rgb.join(', ')})`;
  }

  if (a !== undefined && rgb.length === 3) {
    rgb.push(a > 1 ? 1 : a < 0 ? 0 : a);
    return `rgba(${rgb.join(', ')})`;
  }
  return `rgb(${rgb.join(', ')})`;
};

const color = new Color();

/*
  brightRate = [0-100]
  temperatureRate = [0-100]
*/
const calculateWhiteColorForView = (brightRate, temperatureRate) => {
  const alphaMin = 0.6;
  const alphaMax = 1;
  const sMin = 0;
  const sMax = 60;

  const hue = 36.8;
  const sat = temperatureRate * (sMax - sMin) / 100;
  const alpha = alphaMin + brightRate / 100 * (alphaMax - alphaMin);

  const rgb = color.hsb2RgbString(hue, sat, 100, alpha);
  return rgb;
};

/**
 * @fileOverview 颜色相关工具
 * HSV和HSL解释 解释 https://zh.wikipedia.org/wiki/HSL%E5%92%8CHSV%E8%89%B2%E5%BD%A9%E7%A9%BA%E9%97%B4
 * @name color.js
 */

/* eslint-disable */
function _gcd(a, b) {
  return !b ? a : _gcd(b, a % b);
};

function _gcdEx(a, b) {
  let ref,
      ref1,
      x,
      y;
  if (b === 0) {
    return [1, 0];
  }
  ref = _gcdEx(b, a % b), x = ref[0], y = ref[1];
  return ref1 = [y, x - Math.floor(a / b) * y], x = ref1[0], y = ref1[1], ref1;
};

function getSolutionOfLinearConguenceEquation(a, b, n) {
  let d,
    k,
    r,
    ref,
    s,
    x,
    x0;
  if (a * b === 0) {
    return false;
  }
  d = _gcd(a, n);
  if (d % b === 0 && b !== 1) {
    ref = _gcdEx(a, n), r = ref[0], s = ref[1];
    x0 = r * (b / d);
    return ((function () {
      let i,
        ref1,
        results;
      results = [];
      for (k = i = 0, ref1 = n; 0 <= ref1 ? i < ref1 : i > ref1; k = 0 <= ref1 ? ++i : --i) {
        if (x = x0 + k * Math.floor(n / d) > 0) {
          results.push(x);
        }
      }
      return results;
    })()).slice(0, d);
  }
  return [b];

};


/**
 * hsv转rgb, 来自维基百科的公式的完整实现, 变量名都没改
 * @example
 * hsvToRgb(0, 1, 1)  = {r: 255, g: 0, b: 0}
 * hsvToRgb(0.5, 1, 0.5) = {r: 128, g: 1, b: 0}
 * @param {Number} h - hue表示色相, 0°~360°
 * @param {Number} s - Saturation饱和度，0%~100%
 * @param {Number} v - Value表示明度, 0%~100%
 * @returns {Object} RGB的颜色值
 * r - red, 0~255
 * g - green, 0~255
 * b - blue, 0~255
 */
function hsvToRgb(h, s, v) {
  let r,
      g,
      b,
      i,
      f,
      p,
      q,
      t;

  // Make sure our arguments stay in-range
  h = Math.max(0, Math.min(360, h));
  s = Math.max(0, Math.min(1, s));
  v = Math.max(0, Math.min(1, v));

  i = (getSolutionOfLinearConguenceEquation(1, Math.floor(h / 60), 6) || [0])[0];

  f = h / 60 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
      case 0: r = v; g = t; b = p; break;
      case 1: r = q; g = v; b = p; break;
      case 2: r = p; g = v; b = t; break;
      case 3: r = p; g = q; b = v; break;
      case 4: r = t; g = p; b = v; break;
      case 5: r = v; g = p; b = q; break;
  }

  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
};

/**
 * RGB的颜色值转换hsv
 * @example
 * rgbToHsv(255,0,0) = {h: 0, s: 1, v: 1}
 * rgbToHsv(128,1,0) = {h: 0, s: 1, v: 0.5019607843137255}
 * @param {Number} r - 红色值, 0~255
 * @param {Number} g - 绿色值, 0~255
 * @param {Number} b - 蓝色值, 0~255
 * @returns {object}
 * h - hue表示色相
 * s - Saturation饱和度
 * v - Value表示明度
 */
function rgbToHsv(r, g, b) {
  let h,
      s,
      v;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const delta = max - min;
  v = max / 255.0;
  if (max === 0) {
    return { h: -1, s: 0, v };
  }
  s = delta / max;
  if (r === max) {
    h = (g - b) / delta;
  } else if (g === max) {
    h = 2 + (b - r) / delta;
  } else {
    h = 4 + (r - g) / delta;
  }
  h *= 60;
  if (h < 0) h += 360;

  return { h: Math.round(h), s, v };
};


function _hueToRgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
};

/**
 * 维基百科的hsl转rgb的完整实现，变量名没有改
 * @example
 * hslToRgb(0, 1, 0.5) = {r: 255, g: 0, b: 0}
 * hslToRgb(120, 1, 0.75) = {r: 128, g: 255, b: 128}
 * hslToRgb(240, 1, 0.25) = {r: 0, g: 0, b: 128}
 * @param {Number} h - hue表示色相, 0°~360°
 * @param {Number} s - Saturation饱和度，0%~100%
 * @param {Number} l - Lightness表示亮度, 0%~100%
 * @returns {Object} RGB的颜色值
 * r - red, 0~255
 * g - green, 0~255
 * b - blue, 0~255
 */
function hslToRgb(h, s, l) { // 360, 1.0, 1.0
  const h0 = (h % 360 + 360) % 360 / 360;
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = _hueToRgb(p, q, h0 + 1 / 3);
  const g = _hueToRgb(p, q, h0);
  const b = _hueToRgb(p, q, h0 - 1 / 3);

  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
};

/**
 * RGB转换hsl, 也是来自维基百科的公式实现
 * @example
 * rgbToHsl(255, 0, 0) = {h: 0, s: 1, l: 0.5}
 * rgbToHsl(128, 255, 128) = {h: 120, s: 1, l: 0.7509803921568627}
 * rgbToHsl(0,0,128) = {h: 240, s: 1, l: 0.25098039215686274}
 * @param {Number} rr - 红色值, 0~255
 * @param {Number} gg - 绿色值, 0~255
 * @param {Number} bb - 蓝色值, 0~255
 * @returns {object}
 * h - hue表示色相
 * s - Saturation饱和度
 * v - Lightness表示亮度
 */
function rgbToHsl(rr, gg, bb) { // 255, 255, 255
  let r,
      g,
      b,
      h,
      s,
      l,
      min,
      max;

  r = parseFloat(rr) / 255;
  g = parseFloat(gg) / 255;
  b = parseFloat(bb) / 255;

  min = Math.min(r, g, b);
  max = Math.max(r, g, b);

  l = (max + min) / 2;
  if (max === min) {
    s = 0;
    h = Number.NaN;
  } else if (l < 0.5) s = (max - min) / (max + min);
  else s = (max - min) / (2 - max - min);

  switch (max) {
      case r: h = (g - b) / (max - min); break;
      case g: h = 2 + (b - r) / (max - min); break;
      case b: h = 4 + (r - g) / (max - min); break;
  }

  h *= 60;
  h += h < 0 ? 360 : 0;

  return { h, s, l };
};

export default {
  color,
  calculateWhiteColorForView,
  hsvToRgb,
  rgbToHsv,
  hslToRgb,
  rgbToHsl,
}
