Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var toFixed = function toFixed(str, count) {
  return ('' + '0'.repeat(count) + str).slice(-1 * count);
};

var toFilled = function toFilled(str, count) {
  var s = str;
  if (s.length < count) {
    s = '0'.repeat(count - s.length) + s;
  }
  return s;
};

var partition = function partition(str, chunk) {
  var res = [];
  var len = str.length;
  for (var i = 0; i < len; i += chunk) {
    res.push(str.slice(i, i + chunk));
  }
  return res;
};

var isObject = function isObject(obj) {
  return obj === Object(obj);
};

var isArray = function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

var isDate = function isDate(obj) {
  return Object.prototype.toString.call(obj) === '[object Date]';
};

var isRegExp = function isRegExp(obj) {
  return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBoolean = function isBoolean(obj) {
  return Object.prototype.toString.call(obj) === '[object Boolean]';
};

var isNumerical = function isNumerical(obj) {
  return Object.prototype.toString.call(obj) === '[object Number]';
};

var isUndefined = function isUndefined(obj) {
  return typeof obj === 'undefined';
};

var isNil = function isNil(obj) {
  return obj === undefined || obj === null;
};

var get = function get(object, pathString, defaultValue) {
  var parts = ('' + pathString).split('.');
  var length = parts.length;

  var i = 0;

  var value = object === Object(object) ? object : undefined;

  while (value != null && i < length) {
    value = value[parts[i++]];
  }

  return i && i === length && value !== undefined ? value : defaultValue;
};

var pick = function pick(object, keys) {
  return keys.reduce(function (obj, key) {
    if (typeof object[key] !== 'undefined') {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

var omit = function omit(object, keys) {
  var shallowCopy = _extends({}, object);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    delete shallowCopy[key];
  }
  return shallowCopy;
};

var chunk = function chunk(arr) {
  var chunkSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var cache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var tmp = [].concat(_toConsumableArray(arr));
  if (chunkSize <= 0) return cache;
  while (tmp.length) {
    cache.push(tmp.splice(0, chunkSize));
  }return cache;
};

var compareVersion = function compareVersion(v1, v2) {
  if (typeof v1 !== 'string') return false;
  if (typeof v2 !== 'string') return false;
  v1 = v1.split('.');
  v2 = v2.split('.');
  var k = Math.min(v1.length, v2.length);
  for (var i = 0; i < k; ++i) {
    v1[i] = parseInt(v1[i], 10);
    v2[i] = parseInt(v2[i], 10);
    if (v1[i] > v2[i]) return 1;
    if (v1[i] < v2[i]) return -1;
  }
  return v1.length === v2.length ? 0 : v1.length < v2.length ? -1 : 1;
};

exports.default = {
  get: get,
  toFixed: toFixed,
  toFilled: toFilled,
  partition: partition,
  isObject: isObject,
  isArray: isArray,
  isDate: isDate,
  isRegExp: isRegExp,
  isBoolean: isBoolean,
  isNumerical: isNumerical,
  isUndefined: isUndefined,
  isNil: isNil,
  pick: pick,
  omit: omit,
  chunk: chunk,
  compareVersion: compareVersion
};