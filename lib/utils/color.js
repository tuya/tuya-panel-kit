Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if ((typeof Symbol === 'function' ? Symbol.iterator : '@@iterator') in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var maxIn = 255;

var parse = function parse(d) {
  var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  d += '';
  if (d.length < len) {
    d = '0'.repeat(len - d.length) + d;
  } else {
    d = d.slice(0, len);
  }
  return d;
};

var limit = function limit(number, min, max) {
  return Math.min(max, Math.max(min, number));
};

var Color = function () {
  function Color() {
    _classCallCheck(this, Color);
  }

  _createClass(Color, [{
    key: 'decode',
    value: function decode(color) {
      var rgb = void 0;

      if (/^rgb/.test(color)) {
        var matcher = color.match(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*([\.\d]+))?\)/) || [];
        rgb = [matcher[1], matcher[2], matcher[3]].map(function (item) {
          return parseInt(item);
        });
        var alpha = matcher[4];
        if (alpha !== undefined) {
          alpha = alpha > 1 ? 1 : alpha < 0 ? 0 : alpha;
          rgb.push(alpha);
        }
        return rgb;
      }

      color = color.replace(/^#/, '');
      var len = color.length;
      if (len !== 6 && len !== 3) {
        color = '000000';
      }
      if (len === 3) {
        rgb = color.split('').map(function (item) {
          return '' + item + item;
        });
      } else {
        rgb = color.match(/[0-9a-f]{2}/gi) || [];
      }
      return rgb.map(function (i) {
        i = parseInt(i, 16);
        if (i < 0) i = 0;
        if (i > maxIn) i = maxIn;
        return i;
      });
    }
  }, {
    key: 'hex2hsv',
    value: function hex2hsv(hex) {
      var _decode = this.decode(hex),
          _decode2 = _slicedToArray(_decode, 3),
          r = _decode2[0],
          g = _decode2[1],
          b = _decode2[2];

      r /= maxIn;
      g /= maxIn;
      b /= maxIn;

      var M = Math.max(r, g, b);
      var m = Math.min(r, g, b);
      var C = M - m;
      var h = void 0;
      var s = void 0;
      var v = void 0;

      if (C == 0) h = 0;else if (M === r) h = (g - b) / C % 6;else if (M === g) h = (b - r) / C + 2;else h = (r - g) / C + 4;
      h *= 60;
      if (h < 0) h += 360;
      v = M;
      if (C === 0) s = 0;else s = C / v;
      s *= 100;
      v *= 100;
      return [h, s, v];
    }
  }, {
    key: 'hex2hsb',
    value: function hex2hsb(hex) {
      return this.hex2hsv(hex);
    }
  }, {
    key: 'rgb2hex',
    value: function rgb2hex(r, g, b) {
      var hex = Math.round(r * 65536) + Math.round(g * 256) + Math.round(b);
      hex = hex.toString(16, 6);
      var len = hex.length;
      if (len < 6) for (var i = 0; i < 6 - len; i++) {
        hex = '0' + hex;
      }hex = hex.toUpperCase();
      return '#' + hex;
    }
  }, {
    key: 'hex2hsl',
    value: function hex2hsl(hex) {
      var _decode3 = this.decode(hex),
          _decode4 = _slicedToArray(_decode3, 3),
          r = _decode4[0],
          g = _decode4[1],
          b = _decode4[2];

      r /= maxIn;
      g /= maxIn;
      b /= maxIn;
      var M = Math.max(r, g, b);
      var m = Math.min(r, g, b);
      var d = M - m;
      var h = void 0;
      var l = void 0;
      var s = void 0;
      if (d == 0) h = 0;else if (M === r) h = (g - b) / d % 6;else if (M === g) h = (b - r) / d + 2;else h = (r - g) / d + 4;
      h *= 60;
      if (h < 0) h += 360;
      l = (M + m) / 2;
      if (d == 0) s = 0;else s = d / (1 - Math.abs(2 * l - 1));
      s *= 100;
      l *= 100;
      return [h, s, l];
    }
  }, {
    key: 'hex2yuv',
    value: function hex2yuv(hex) {
      var _decode5 = this.decode(hex),
          _decode6 = _slicedToArray(_decode5, 3),
          r = _decode6[0],
          g = _decode6[1],
          b = _decode6[2];

      var y = r * 0.299 + g * 0.587 + b * 0.114;
      var u = r * -0.168736 + g * -0.331264 + b * 0.5 + 128;
      var v = r * 0.5 + g * -0.418688 + b * -0.081312 + 128;

      return [y, u, v];
    }
  }, {
    key: 'yuv2rgb',
    value: function yuv2rgb(y, u, v, a) {
      var r = void 0;
      var g = void 0;
      var b = void 0;

      r = y + 1.4075 * (v - 128);
      g = y - 0.3455 * (u - 128) - 0.7169 * (v - 128);
      b = y + 1.779 * (u - 128);

      r = r < 0 ? 0 : r;
      r = r > maxIn ? maxIn : r;

      g = g < 0 ? 0 : g;
      g = g > maxIn ? maxIn : g;

      b = b < 0 ? 0 : b;
      b = b > maxIn ? maxIn : b;

      var rgb = [r, g, b];
      if (a !== undefined) {
        rgb.push(a > 1 ? 1 : a < 0 ? 0 : a);
      }
      return rgb;
    }
  }, {
    key: 'hsv2rgb',
    value: function hsv2rgb() {
      var h = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var v = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var a = arguments[3];

      var hsb = [h, s, v].map(function (bit, i) {
        var _bit = bit;
        if (_bit) _bit = parseFloat(_bit);
        if (i === 0) {
          return (_bit %= 360) < 0 ? _bit + 360 : _bit;
        }
        return limit(Math.round(bit), 0, 100);
      });

      var br = Math.round(hsb[2] / 100 * 255);
      if (hsb[1] == 0) return [br, br, br];

      var hue = hsb[0];
      var f = hue % 60;
      var p = Math.round(hsb[2] * (100 - hsb[1]) / 10000 * 255);
      var q = Math.round(hsb[2] * (6000 - hsb[1] * f) / 600000 * 255);
      var t = Math.round(hsb[2] * (6000 - hsb[1] * (60 - f)) / 600000 * 255);

      var rgb = void 0;
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
  }, {
    key: 'hsb2rgb',
    value: function hsb2rgb(h, s, b, a) {
      return this.hsv2rgb(h, s, b, a);
    }
  }, {
    key: 'rgb2hsv',
    value: function rgb2hsv() {
      var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var g = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var b = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

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
      var M = Math.max(r, g, b);
      var m = Math.min(r, g, b);
      var C = M - m;
      var h = void 0,
          s = void 0,
          v = void 0;
      if (C == 0) h = 0;else if (M == r) h = (g - b) / C % 6;else if (M == g) h = (b - r) / C + 2;else h = (r - g) / C + 4;
      h *= 60;
      if (h < 0) h += 360;
      v = M;
      if (C == 0) s = 0;else s = C / v;
      s *= 100;
      v *= 100;
      return [h, s, v];
    }
  }, {
    key: 'rgb2hsb',
    value: function rgb2hsb(r, g, b) {
      return this.rgb2hsv(r, g, b);
    }
  }, {
    key: 'hsv2hex',
    value: function hsv2hex(h, s, v) {
      var rgb = this.hsv2rgb(h, s, v).map(function (item) {
        return Math.round(item);
      });
      return this.rgb2hex.apply(this, rgb);
    }
  }, {
    key: 'hsb2hex',
    value: function hsb2hex(h, s, b) {
      return this.hsv2hex(h, s, b);
    }
  }, {
    key: 'rgb2hsl',
    value: function rgb2hsl() {
      var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var g = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var b = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

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
      var M = Math.max(r, g, b);
      var m = Math.min(r, g, b);
      var d = M - m;
      var h = void 0,
          s = void 0,
          l = void 0;
      if (d == 0) h = 0;else if (M == r) h = (g - b) / d % 6;else if (M == g) h = (b - r) / d + 2;else h = (r - g) / d + 4;
      h *= 60;
      if (h < 0) h += 360;
      l = (M + m) / 2;
      if (d == 0) s = 0;else s = d / (1 - Math.abs(2 * l - 1));
      s *= 100;
      l *= 100;
      h = h.toFixed(0);
      s = s.toFixed(0);
      l = l.toFixed(0);
      return [h, s, l];
    }
  }, {
    key: 'hsl2rgb',
    value: function hsl2rgb() {
      var h = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var l = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var a = arguments[3];

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
      var C = (1 - Math.abs(2 * l - 1)) * s;
      var hh = h / 60;
      var X = C * (1 - Math.abs(hh % 2 - 1));
      var r = 0;
      var g = 0;
      var b = 0;
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
      var m = l - C / 2;
      r += m;
      g += m;
      b += m;
      r *= maxIn;
      g *= maxIn;
      b *= maxIn;


      var rgb = [r, g, b];
      if (a !== undefined) {
        rgb.push(a > 1 ? 1 : a < 0 ? 0 : a);
      }
      return rgb;
    }
  }, {
    key: 'hsl2hex',
    value: function hsl2hex(h, s, l) {
      var rgb = this.hsl2rgb(h, s, l);
      return this.rgb2hex.apply(this, _toConsumableArray(rgb));
    }
  }, {
    key: 'randomRgb',
    value: function randomRgb() {
      var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 255;

      var random = function random(mi, ma) {
        var x = max;
        var y = min;
        if (x < y) {
          x = mi;
          y = ma;
        }
        return Math.random() * (x - y) + y;
      };

      return [random(min, max), random(min, max), random(min, max)];
    }
  }, {
    key: 'randomHsb',
    value: function randomHsb() {
      var random = function random(min, max) {
        var x = max;
        var y = min;
        if (x < y) {
          x = min;
          y = max;
        }
        return Math.random() * (x - y) + y;
      };

      return [random(0, 360), random(0, 100), random(0, 100)];
    }
  }, {
    key: 'complement',
    value: function complement(color) {
      var rgb = this.decode(color).map(function (item) {
        return Math.round(item);
      });
      var mm = Math.min.apply(Math, _toConsumableArray(rgb)) + Math.max.apply(Math, _toConsumableArray(rgb));
      var hex = this.rgb2hex.apply(this, _toConsumableArray(rgb.map(function (item) {
        return mm - item;
      })));
      return hex;
    }
  }, {
    key: 'reversed',
    value: function reversed(color) {
      var rgb = this.decode(color).map(function (item) {
        return Math.round(item);
      });
      return this.rgb2hex.apply(this, _toConsumableArray(rgb.map(function (item) {
        return maxIn - item;
      })));
    }
  }, {
    key: 'hex2RgbString',
    value: function hex2RgbString(hex, a) {
      var rgb = this.decode(hex);
      return _toRgbString(rgb, a);
    }
  }, {
    key: 'hsv2RgbString',
    value: function hsv2RgbString(h, s, v, a) {
      var rgb = this.hsv2rgb(h, s, v, a);
      return _toRgbString(rgb);
    }
  }, {
    key: 'hsb2RgbString',
    value: function hsb2RgbString() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return this.hsv2RgbString.apply(this, args);
    }
  }, {
    key: 'hsl2RgbString',
    value: function hsl2RgbString(h, s, l, a) {
      var rgb = this.hsl2rgb(h, s, l, a);
      return _toRgbString(rgb);
    }
  }, {
    key: 'yuv2RgbString',
    value: function yuv2RgbString(y, u, v, a) {
      var rgb = this.yuv2rgb(y, u, v, a);
      return _toRgbString(rgb);
    }
  }, {
    key: 'encodeColorData',
    value: function encodeColorData(rgbhsv) {
      var rgb = rgbhsv.slice(0, 3);
      var hsv = rgbhsv.slice(3);
      rgb = rgb.map(function (item) {
        return item < 0 ? 0 : item > 255 ? 255 : item;
      });
      if (hsv.length === 0) {
        hsv = Array(4).fill(0);
      } else {
        var h = hsv[0];
        h = h % 360 ? h % 360 : h;
        h = h < 0 ? 360 + h : h;
        var hh = parseInt(h / 256, 10);
        var hl = parseInt(h % 256, 10);
        hsv.splice(1, 0, hl);
        hsv[0] = hh;
      }
      return rgb.concat(hsv).map(function (item) {
        return parse(Math.round(item).toString(16), 2);
      }).join('');
    }
  }, {
    key: 'decodeColorData',
    value: function decodeColorData() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var arr1 = data.match(/[a-z\d]{2}/gi) || [];
      var len = 7 - arr1.length;
      var arr2 = Array(len < 0 ? 0 : len).fill('00');
      var arr = arr1.concat(arr2);
      var hsv = arr.slice(3);
      var rgb = arr.slice(0, 3).map(function (item) {
        return parseInt(item, 16);
      });
      var h = parseInt(hsv[0] + hsv[1], 16);
      var s = parseInt(hsv[2], 16);
      var v = parseInt(hsv[3], 16);
      return [].concat(_toConsumableArray(rgb), [h, s, v]);
    }
  }, {
    key: 'decodeColorDataWithPosition',
    value: function decodeColorDataWithPosition() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var arr1 = data.match(/[a-z\d]{2}/gi) || [];
      var len = 7 - arr1.length;
      var arr2 = Array(len < 0 ? 0 : len).fill('00');
      var arr = arr1.concat(arr2);
      var rs = arr.map(function (item) {
        return parseInt(item, 16);
      });
      rs[3] /= 100;
      rs[4] /= 100;
      return rs;
    }
  }, {
    key: 'encodeColorDataWithPosition',
    value: function encodeColorDataWithPosition(rgbxyve) {
      var rgb = rgbxyve.slice(0, 3);
      var xyve = rgbxyve.slice(3);
      rgb = rgb.map(function (item) {
        return item < 0 ? 0 : item > 255 ? 255 : item;
      });
      var len = 4 - xyve.length;
      len = len < 0 ? 0 : len;
      xyve = xyve.concat(Array(len).fill(0));

      var _xyve = xyve,
          _xyve2 = _slicedToArray(_xyve, 2),
          x = _xyve2[0],
          y = _xyve2[1];

      xyve[0] = x * 100;
      xyve[1] = y * 100;

      return rgb.concat(xyve).map(function (item) {
        return parse(Math.round(item).toString(16), 2);
      }).join('');
    }
  }, {
    key: 'encodeSceneData',
    value: function encodeSceneData(data) {
      if (data.length === 0) {
        return '';
      }
      var reduce = function reduce(d, init) {
        return d.reduce(function (curr, next) {
          if (next.concat) {
            return reduce(next, curr);
          }
          return curr + parse(Math.round(next).toString(16), 2);
        }, init);
      };

      return reduce(data, '');
    }
  }, {
    key: 'decodeSceneData',
    value: function decodeSceneData(data) {
      if (!data) {
        return [];
      }

      var arr = data.match(/[a-z\d]{2}/gi);

      var _arr2 = _toArray(arr),
          l = _arr2[0],
          t = _arr2[1],
          f = _arr2[2],
          c = _arr2[3],
          d = _arr2.slice(4);

      var ltfc = [l, t, f, c].map(function (item) {
        return parseInt(item, 16);
      });
      var rgbs = [];

      var count = Math.min(ltfc[3], d.length / 3) || 1;
      ltfc[3] = count;

      for (var i = 0; i < count; i++) {
        var n = i * 3 - 1;
        rgbs.push([d[n + 1], d[n + 2], d[n + 3]].map(function (item) {
          return parseInt(item, 16);
        }));
      }
      return ltfc.concat(rgbs);
    }
  }, {
    key: 'decodeSceneDataWithMode',
    value: function decodeSceneDataWithMode(data) {
      if (!data) {
        return [];
      }

      var arr = data.match(/[a-z\d]{2}/gi);

      var _arr3 = _toArray(arr),
          l = _arr3[0],
          t = _arr3[1],
          f = _arr3[2],
          c = _arr3[3],
          d = _arr3.slice(4);

      var ltfc = [l, t, f, c].map(function (item) {
        return parseInt(item, 16);
      });
      var mrgbhsvbt = [];

      var count = Math.min(ltfc[3], d.length / 8);
      ltfc[3] = count;

      for (var i = 0; i < count; i++) {
        var n = i * 8 - 1;
        var _arr = [];
        var j = 1;
        while (j < 9) {
          _arr.push(d[n + j]);
          j++;
        }
        mrgbhsvbt.push(_arr.map(function (item) {
          return parseInt(item, 16);
        }));
      }
      return ltfc.concat(mrgbhsvbt);
    }
  }, {
    key: 'toRgbString',
    value: function toRgbString(rgb, a) {
      return _toRgbString(rgb, a);
    }
  }, {
    key: 'kelvin2rgbUsingTH',
    value: function kelvin2rgbUsingTH(kelvin) {
      var temperature = kelvin / 100.0;
      var red = void 0;
      var green = void 0;
      var blue = void 0;

      if (temperature <= 66.0) {
        red = 255;
      } else {
        red = temperature - 60.0;
        red = 329.698727446 * Math.pow(red, -0.1332047592);
        if (red < 0) red = 0;
        if (red > 255) red = 255;
      }

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
  }, {
    key: 'kelvin2rgb',
    value: function kelvin2rgb(kelvin) {
      var temperature = kelvin / 100.0;
      var red = void 0;
      var green = void 0;
      var blue = void 0;

      if (temperature < 66.0) {
        red = 255;
      } else {
        red = temperature - 55.0;
        red = 351.97690566805693 + 0.114206453784165 * red - 40.25366309332127 * Math.log(red);
        if (red < 0) red = 0;
        if (red > 255) red = 255;
      }

      if (temperature < 66.0) {
        green = temperature - 2;
        green = -155.25485562709179 - 0.44596950469579133 * green + 104.49216199393888 * Math.log(green);
        if (green < 0) green = 0;
        if (green > 255) green = 255;
      } else {
        green = temperature - 50.0;
        green = 325.4494125711974 + 0.07943456536662342 * green - 28.0852963507957 * Math.log(green);
        if (green < 0) green = 0;
        if (green > 255) green = 255;
      }

      if (temperature >= 66.0) {
        blue = 255;
      } else if (temperature <= 20.0) {
        blue = 0;
      } else {
        blue = temperature - 10;
        blue = -254.76935184120902 + 0.8274096064007395 * blue + 115.67994401066147 * Math.log(blue);
        if (blue < 0) blue = 0;
        if (blue > 255) blue = 255;
      }

      return [red, green, blue];
    }
  }, {
    key: 'rgb2kelvin',
    value: function rgb2kelvin(_ref) {
      var _ref2 = _slicedToArray(_ref, 3),
          r = _ref2[0],
          b = _ref2[2];

      var epsilon = 0.4;
      var temperature = void 0;
      var minTemperature = 1000;
      var maxTemperature = 40000;
      while (maxTemperature - minTemperature > epsilon) {
        temperature = (maxTemperature + minTemperature) / 2;

        var _kelvin2rgb = this.kelvin2rgb(temperature),
            _kelvin2rgb2 = _slicedToArray(_kelvin2rgb, 3),
            _r = _kelvin2rgb2[0],
            _b = _kelvin2rgb2[2];

        if (_b / _r >= b / r) {
          maxTemperature = temperature;
        } else {
          minTemperature = temperature;
        }
      }
      return Math.round(temperature);
    }
  }]);

  return Color;
}();

var _toRgbString = function _toRgbString(rgb, a) {
  var len = rgb.length;

  if (len === 4) {
    a = rgb.pop();
  }
  rgb = rgb.map(function (item) {
    return Math.round(item);
  });
  if (len === 4) {
    rgb.push(a);
    return 'rgba(' + rgb.join(', ') + ')';
  }

  if (a !== undefined && rgb.length === 3) {
    rgb.push(a > 1 ? 1 : a < 0 ? 0 : a);
    return 'rgba(' + rgb.join(', ') + ')';
  }
  return 'rgb(' + rgb.join(', ') + ')';
};

var color = new Color();

var calculateWhiteColorForView = function calculateWhiteColorForView(brightRate, temperatureRate) {
  var alphaMin = 0.6;
  var alphaMax = 1;
  var sMin = 0;
  var sMax = 60;

  var hue = 36.8;
  var sat = temperatureRate * (sMax - sMin) / 100;
  var alpha = alphaMin + brightRate / 100 * (alphaMax - alphaMin);

  var rgb = color.hsb2RgbString(hue, sat, 100, alpha);
  return rgb;
};

function _gcd(a, b) {
  return !b ? a : _gcd(b, a % b);
};

function _gcdEx(a, b) {
  var ref = void 0,
      ref1 = void 0,
      x = void 0,
      y = void 0;
  if (b === 0) {
    return [1, 0];
  }
  ref = _gcdEx(b, a % b), x = ref[0], y = ref[1];
  return ref1 = [y, x - Math.floor(a / b) * y], x = ref1[0], y = ref1[1], ref1;
};

function getSolutionOfLinearConguenceEquation(a, b, n) {
  var d = void 0,
      k = void 0,
      r = void 0,
      ref = void 0,
      s = void 0,
      x = void 0,
      x0 = void 0;
  if (a * b === 0) {
    return false;
  }
  d = _gcd(a, n);
  if (d % b === 0 && b !== 1) {
    ref = _gcdEx(a, n), r = ref[0], s = ref[1];
    x0 = r * (b / d);
    return function () {
      var i = void 0,
          ref1 = void 0,
          results = void 0;
      results = [];
      for (k = i = 0, ref1 = n; 0 <= ref1 ? i < ref1 : i > ref1; k = 0 <= ref1 ? ++i : --i) {
        if (x = x0 + k * Math.floor(n / d) > 0) {
          results.push(x);
        }
      }
      return results;
    }().slice(0, d);
  }
  return [b];
};

function hsvToRgb(h, s, v) {
  var r = void 0,
      g = void 0,
      b = void 0,
      i = void 0,
      f = void 0,
      p = void 0,
      q = void 0,
      t = void 0;

  h = Math.max(0, Math.min(360, h));
  s = Math.max(0, Math.min(1, s));
  v = Math.max(0, Math.min(1, v));

  i = (getSolutionOfLinearConguenceEquation(1, Math.floor(h / 60), 6) || [0])[0];

  f = h / 60 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      r = v;g = t;b = p;break;
    case 1:
      r = q;g = v;b = p;break;
    case 2:
      r = p;g = v;b = t;break;
    case 3:
      r = p;g = q;b = v;break;
    case 4:
      r = t;g = p;b = v;break;
    case 5:
      r = v;g = p;b = q;break;
  }

  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
};

function rgbToHsv(r, g, b) {
  var h = void 0,
      s = void 0,
      v = void 0;

  var min = Math.min(r, g, b);
  var max = Math.max(r, g, b);
  var delta = max - min;
  v = max / 255.0;
  if (max === 0) {
    return { h: -1, s: 0, v: v };
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

  return { h: Math.round(h), s: s, v: v };
};

function _hueToRgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
};

function hslToRgb(h, s, l) {
  var h0 = (h % 360 + 360) % 360 / 360;
  var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  var p = 2 * l - q;
  var r = _hueToRgb(p, q, h0 + 1 / 3);
  var g = _hueToRgb(p, q, h0);
  var b = _hueToRgb(p, q, h0 - 1 / 3);

  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
};

function rgbToHsl(rr, gg, bb) {
  var r = void 0,
      g = void 0,
      b = void 0,
      h = void 0,
      s = void 0,
      l = void 0,
      min = void 0,
      max = void 0;

  r = parseFloat(rr) / 255;
  g = parseFloat(gg) / 255;
  b = parseFloat(bb) / 255;

  min = Math.min(r, g, b);
  max = Math.max(r, g, b);

  l = (max + min) / 2;
  if (max === min) {
    s = 0;
    h = Number.NaN;
  } else if (l < 0.5) s = (max - min) / (max + min);else s = (max - min) / (2 - max - min);

  switch (max) {
    case r:
      h = (g - b) / (max - min);break;
    case g:
      h = 2 + (b - r) / (max - min);break;
    case b:
      h = 4 + (r - g) / (max - min);break;
  }

  h *= 60;
  h += h < 0 ? 360 : 0;

  return { h: h, s: s, l: l };
};

exports.default = {
  color: color,
  calculateWhiteColorForView: calculateWhiteColorForView,
  hsvToRgb: hsvToRgb,
  rgbToHsv: rgbToHsv,
  hslToRgb: hslToRgb,
  rgbToHsl: rgbToHsl
};