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
  return (`${'0'.repeat(count)}${str}`).slice(-1 * count);
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

const isArray = obj => (Object.prototype.toString.call(obj) === '[object Array]');

const isDate = obj => (Object.prototype.toString.call(obj) === '[object Date]');

const isRegExp = obj => (Object.prototype.toString.call(obj) === '[object RegExp]');

const isBoolean = obj => (Object.prototype.toString.call(obj) === '[object Boolean]');

const isNumerical = obj => (Object.prototype.toString.call(obj) === '[object Number]');


export default CoreUtils = {
  toFixed,
  toFilled,
  partition,
  isObject,
  isArray,
  isDate,
  isRegExp,
  isBoolean,
  isNumerical,
};
