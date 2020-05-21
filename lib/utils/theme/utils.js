Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGetTheme = exports.getTheme = exports.parseToCss = exports.parseToStyle = exports.deepMerge = exports.isObject = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if ((typeof Symbol === 'function' ? Symbol.iterator : '@@iterator') in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteral(['\n    ', '-top: ', 'px;\n    ', '-right: ', 'px;\n    ', '-bottom: ', 'px;\n    ', '-left: ', 'px;\n  '], ['\n    ', '-top: ', 'px;\n    ', '-right: ', 'px;\n    ', '-bottom: ', 'px;\n    ', '-left: ', 'px;\n  ']);

var _native = require('styled-components/native');

var _core = require('../core');

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var get = _core2.default.get,
    isNil = _core2.default.isNil;
var isObject = exports.isObject = function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
};

var deepMerge = exports.deepMerge = function deepMerge(target) {
  for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  if (!sources.length) {
    return target;
  }

  var output = _extends({}, target);
  sources.forEach(function (source) {
    if (isObject(source)) {
      Object.keys(source).forEach(function (key) {
        if (isObject(source[key]) && isObject(output[key])) {
          if (!output[key]) {
            output[key] = _extends({}, source[key]);
          } else {
            output[key] = deepMerge(output[key], source[key]);
          }
        } else {
          output[key] = source[key];
        }
      });
    }
  });
  return output;
};

var parseToStyle = exports.parseToStyle = function parseToStyle(values, key) {
  var _ref;

  if (!values || !Array.isArray(values)) {
    return {};
  }

  var _values = _slicedToArray(values, 4),
      top = _values[0],
      right = _values[1],
      bottom = _values[2],
      left = _values[3];

  return _ref = {}, _defineProperty(_ref, key + 'Top', top), _defineProperty(_ref, key + 'Right', right), _defineProperty(_ref, key + 'Bottom', bottom), _defineProperty(_ref, key + 'Left', left), _ref;
};

var parseToCss = exports.parseToCss = function parseToCss(values, key) {
  if (!values || !Array.isArray(values)) {
    return [];
  }

  var _values2 = _slicedToArray(values, 4),
      top = _values2[0],
      right = _values2[1],
      bottom = _values2[2],
      left = _values2[3];

  var cssStyle = (0, _native.css)(_templateObject, key, top, key, right, key, bottom, key, left);
  return cssStyle;
};

var getTheme = exports.getTheme = function getTheme(props, key, defaultValue) {
  var themePath = typeof key === 'function' ? key(props) : key;

  var _key$split = key.split('.'),
      _key$split2 = _toArray(_key$split),
      namespace = _key$split2[0],
      path = _key$split2.slice(1);

  var themeBasicPath = path.join('.');
  var themeType = get(props.theme, namespace + '.type') || get(props.theme, 'type', 'light');
  var themeValue = void 0,
      themeTypePath = void 0;
  if (themeType) {
    themeTypePath = [namespace, themeType].concat(_toConsumableArray(path)).join('.');
  }
  if (!isNil(get(props, themeBasicPath))) {
    themeValue = get(props, themeBasicPath);
  } else if (!isNil(get(props.theme, themePath))) {
    themeValue = get(props.theme, themePath);
  } else {
    themeValue = get(props.theme, themeTypePath, defaultValue);
  }
  if (typeof themeValue === 'function') {
    themeValue = themeValue(props);
  }
  return themeValue;
};

var createGetTheme = exports.createGetTheme = function createGetTheme(namespace) {
  return function (key, defaultValue) {
    var themeKey = namespace + '.' + key;
    return getTheme(themeKey, defaultValue);
  };
};