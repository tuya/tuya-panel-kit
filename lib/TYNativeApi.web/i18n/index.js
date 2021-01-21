Object.defineProperty(exports, "__esModule", { value: true });var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();var _api = require('../api');var _api2 = _interopRequireDefault(_api);var _utils = require('../utils');var _utils2 = _interopRequireDefault(_utils);function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}var I18N = function () {
  function I18N(props) {
    var _this = this;_classCallCheck(this, I18N);if (process.env.NODE_ENV === 'development') {}this.strings = this.mergeLanguage(props, _api2.default.lang);this.setLanguage('en');if (typeof _api2.default.mobileInfo === 'undefined') {
      _api2.default.mobile.getMobileInfo().then(function (d) {
        _this.setLanguage(d.lang);
      });
    } else {
      this.setLanguage(_api2.default.mobileInfo.lang);
    }
  }_createClass(I18N, [{ key: 'applyStrings', value: function applyStrings(strings) {
      var strLang = this.mergeLanguage(strings, _api2.default.lang);this.strings = this.mergeLanguage(this.strings, strLang);this.buildLanguage(this.language);
    } }, { key: 'forceUpdateNetworkLang', value: function forceUpdateNetworkLang() {
      var _this2 = this;return new Promise(function (resolve, reject) {
        _api2.default.apiRNRequest({ a: 'tuya.m.i18n.get', postData: { productId: _api2.default.devInfo.productId, moduleName: 'h5', endId: 2, osId: 0 }, v: '1.0' }, function (d) {
          var data = _utils2.default.parseJSON(d);if (process.env.NODE_ENV === 'development') {
            console.info('tuya.m.i18n.get', data);
          }if (data) {
            _this2.strings = _this2.mergeLanguage(_this2.strings, data);_this2.buildLanguage(_this2.language);resolve(data);
          } else {
            reject();
          }
        }, function (error) {
          reject(error);
        });
      });
    } }, { key: 'mergeLanguage', value: function mergeLanguage(L1, L2) {
      if (typeof L1 === 'undefined' && typeof L2 === 'undefined') return {};if (typeof L1 === 'undefined') return L2;if (typeof L2 === 'undefined') return L1;var L0 = _extends({}, L1);for (var k in L2) {
        if (typeof L0[k] !== 'undefined') {
          _extends(L0[k], L2[k]);
        } else {
          L0[k] = _extends({}, L2[k]);
        }
      }return L0;
    } }, { key: 'setLanguage', value: function setLanguage(language) {
      var bestLanguage = this._getBestMatchingLanguage(language, this.strings);if (bestLanguage === this.language) return;this.language = bestLanguage;this.buildLanguage(this.language);
    } }, { key: 'buildLanguage', value: function buildLanguage(language) {
      if (this.strings[language]) {
        var localizedStrings = this.strings[language];for (var key in localizedStrings) {
          if (localizedStrings.hasOwnProperty(key)) {
            this[key] = localizedStrings[key];
          }
        }
      }
    } }, { key: '_getBestMatchingLanguage', value: function _getBestMatchingLanguage(language, props) {
      if (props[language]) return language;var idx = language.lastIndexOf('-');if (idx >= 0) {
        language = language.substring(0, idx);return this._getBestMatchingLanguage(language, props);
      }return Object.keys(props)[0];
    } }, { key: 'formatString', value: function formatString(str) {
      var res = str;for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        values[_key - 1] = arguments[_key];
      }for (var i = 0; i < values.length; i++) {
        res = this._replaceAll('{' + i + '}', values[i], res);
      }return res;
    } }, { key: 'formatValue', value: function formatValue(key) {
      var res = this[key];for (var _len2 = arguments.length, values = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        values[_key2 - 1] = arguments[_key2];
      }for (var i = 0; i < values.length; i++) {
        res = this._replaceAll('{' + i + '}', values[i], res);
      }return res;
    } }, { key: '_replaceAll', value: function _replaceAll(find, replace, str) {
      find = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');if (!!!str) return '';return str.replace(new RegExp(find, 'g'), replace);
    } }, { key: 'getDpLang', value: function getDpLang(code, value) {
      var key = void 0;if (typeof value === 'undefined') {
        key = ('dp_' + code).toLowerCase();
      } else if (typeof value === 'boolean') {
        var valStr = !!value ? 'on' : 'off';key = ('dp_' + code + '_' + valStr).toLowerCase();
      } else {
        key = ('dp_' + code + '_' + value).toLowerCase();
      }return typeof this[key] !== 'undefined' ? this[key] : key;
    } }, { key: 'getDpName', value: function getDpName(code, defaultName) {
      var key = ('dp_' + code).toLowerCase();return typeof this[key] !== 'undefined' ? this[key] : defaultName ? defaultName : key;
    } }, { key: 'getDpsLang', value: function getDpsLang(key) {
      var strs = {};if (typeof key === 'object') {
        if (typeof key.strKey === 'string') {
          strs = typeof this[key.strKey] !== 'undefined' ? this[key.strKey] : key.strKey;
        } else {
          for (var i in key) {
            strs[key[i]] = typeof this[key[i]] !== 'undefined' ? this[key[i]] : key[i];
          }
        }
      } else {
        strs = typeof this[key] !== 'undefined' ? this[key] : key;
      }return strs;
    } }, { key: 'getLang', value: function getLang(key, defaultString) {
      return typeof this[key] !== 'undefined' ? this[key] : typeof defaultString !== 'undefined' ? defaultString : 'I18N@' + key;
    } }, { key: 'getRangeStrings', value: function getRangeStrings(dpCode) {
      var result = {};var schema = _api2.default.device.getDpSchema(dpCode);if (typeof schema === 'undefined') return result;var lists = schema.range;for (var _iterator = lists, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[typeof Symbol === 'function' ? typeof Symbol === "function" ? Symbol.iterator : "@@iterator" : '@@iterator']();;) {
        var _ref;if (_isArray) {
          if (_i >= _iterator.length) break;_ref = _iterator[_i++];
        } else {
          _i = _iterator.next();if (_i.done) break;_ref = _i.value;
        }var v = _ref;var key = ('dp_' + dpCode + '_' + v).toLowerCase();result[v] = typeof this[key] !== 'undefined' ? this[key] : key;
      }return result;
    } }, { key: 'parseCountdown', value: function parseCountdown(t, power) {
      var h = parseFloat(t / 3600);var m = parseFloat(t / 60 - parseInt(h, 10) * 60);var time = h >= 1.0 ? '' + Math.round(h) + this.t_hour : '' + Math.round(m) + this.t_minute;return this.formatString(this['countdown_' + (power ? 'on' : 'off')], time);
    } }, { key: 'dps', get: function get() {
      return this;
    } }]);return I18N;
}();exports.default = I18N;