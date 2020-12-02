/* eslint-disable no-param-reassign */
/**
 * @example
 * toFixed('111', 5)
 * // '00111'
 * toFixed('3456111', 5)
 * // '56111'
 * @param {String/Number} str is a string
 * @param {Number} count is number, the length of the return string
 * @returns {String}
 */
const toFixed = (str, count) => {
  return `${'0'.repeat(count)}${str}`.slice(-1 * count);
};

/**
 * @example
 * toFilled('111', 5)
 * // '00111'
 * toFilled('3456111', 5)
 * // '3456111'
 * @param {String} str is a string
 * @param {Number} count is number, the length of the return string
 * @returns {String}
 */
const toFilled = (str, count) => {
  let s = str;
  if (s.length < count) {
    s = '0'.repeat(count - s.length) + s;
  }
  return s;
};

/**
 * @example
 * partition('1234567', 3)
 * // ['123', '456', '7']
 * @param {String} str is a string
 * @param {Number} chunk is number, the length of the return string
 * @returns {Array} a array, item of it is a substring which length is the `chunk`
 */
const partition = (str, chunk) => {
  const res = [];
  const len = str.length;
  for (let i = 0; i < len; i += chunk) {
    res.push(str.slice(i, i + chunk));
  }
  return res;
};

/**
 * @example
 * isObject('1234567', 3)
 * // ['123', '456', '7']
 * @param {Any} obj is a anything
 * @returns {Boolean}
 */
const isObject = obj => obj === Object(obj);

const isArray = obj => Object.prototype.toString.call(obj) === '[object Array]';

const isDate = obj => Object.prototype.toString.call(obj) === '[object Date]';

const isRegExp = obj => Object.prototype.toString.call(obj) === '[object RegExp]';

const isBoolean = obj => Object.prototype.toString.call(obj) === '[object Boolean]';

const isNumerical = obj => Object.prototype.toString.call(obj) === '[object Number]';

const isUndefined = obj => typeof obj === 'undefined';

const isNil = obj => obj === undefined || obj === null;

/**
 * lodash get polyfill
 * https://gist.github.com/dfkaye/59263b51cf1e0b633181c5f44ae2066a
 */
const get = function(object, pathString, defaultValue) {
  // Coerce pathString to a string (even it turns into "[object Object]").
  const parts = `${pathString}`.split('.');
  const { length } = parts;
  let i = 0;

  // In case object isn't a real object, set it to undefined.
  let value = object === Object(object) ? object : undefined;

  while (value != null && i < length) {
    value = value[parts[i++]];
  }

  /**
   * lodash.get() returns the resolved value if
   * 1. iteration happened (i > 0)
   * 2. iteration completed (i === length)
   * 3. the value at the path is found in the data structure (not undefined). Note that if the path is found but the
   *    value is null, then null is returned.
   * If any of those checks fails, return the defaultValue param, if provided.
   */
  return i && i === length && value !== undefined ? value : defaultValue;
};

/**
 * https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_pick
 */
const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (typeof object[key] !== 'undefined') {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

const omit = (object, keys) => {
  const shallowCopy = {
    ...object,
  };
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    delete shallowCopy[key];
  }
  return shallowCopy;
};

const chunk = (arr, chunkSize = 1, cache = []) => {
  const tmp = [...arr];
  if (chunkSize <= 0) return cache;
  while (tmp.length) cache.push(tmp.splice(0, chunkSize));
  return cache;
};

const compareVersion = (v1, v2) => {
  if (typeof v1 !== 'string') return false;
  if (typeof v2 !== 'string') return false;
  v1 = v1.split('.');
  v2 = v2.split('.');
  const k = Math.min(v1.length, v2.length);
  for (let i = 0; i < k; ++i) {
    v1[i] = parseInt(v1[i], 10);
    v2[i] = parseInt(v2[i], 10);
    if (v1[i] > v2[i]) return 1;
    if (v1[i] < v2[i]) return -1;
  }
  return v1.length === v2.length ? 0 : v1.length < v2.length ? -1 : 1;
};

export default {
  get,
  toFixed,
  toFilled,
  partition,
  isObject,
  isArray,
  isDate,
  isRegExp,
  isBoolean,
  isNumerical,
  isUndefined,
  isNil,
  pick,
  omit,
  chunk,
  compareVersion,
};
