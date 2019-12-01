import CoreUtils from './core';
import StringUtils from './string';


/**
 * @example
 * toFixedString(111, 5)
 * // '00111'
 * @param {Number} num
 * @param {Number} count is number, the length of the return string
 * @returns {String}
 */
const toFixedString = (num, count) => {
  let s = `${Math.abs(num)}`;
  s = CoreUtils.toFixed(s, count);
  return num < 0 ? `-${s}` : s;
};


/**
 * @example
 * toFilledString(111, 5)
 * // '00111'
 * @example
 * toFilledString(-1111111, 5)
 * // '-1111111'
 * @param {Number} num
 * @param {Number} count is number, the length of the return string if the length of `num.toString()` less than count
 * @returns {String}
 */
const toFilledString = (num, count) => {
  let s = `${Math.abs(num)}`;
  s = CoreUtils.toFilled(s, count);
  return num < 0 ? `-${s}` : s;
};



/**
 * @example
 * // 17 = 10001(2)
 * getBitValue(17, 0)
 * // 1
 * @example
 * getBitValue(17, 1)
 * // 0
 * @example
 * getBitValue(17, 4)
 * // 1
 * @param {Number} idx, idx is reverse, and it begins 0
 * @returns {Number} a num
 */
const getBitValue = (num, idx) => ((num & (1 << idx)) >> idx);


/**
 * @example
 * // 17 = 10001(2)
 * changeBitValue(17, 0)
 * // 16, 10000
 * @example
 * changeBitValue(17, 1)
 * // 19, 10010
 * @example
 * changeBitValue(17, 4)
 * // 1, 00001
 * @param {Number} idx, idx is reverse, and it begins 0
 * @returns {Number} a num, which the idx th digit change, 1 to 0, 0 to 1
 */
const changeBitValue = (num, idx) => (num ^ (1 << idx));


/**
 * @example
 * // 17 = 10001(2)
 * setBitValueWithOne(17, 0)
 * // 17, 10001
 * @example
 * setBitValueWithOne(17, 1)
 * // 19, 10010
 * @example
 * setBitValueWithOne(17, 5)
 * // 49, 110001
 * @param {Number} idx, idx is reverse, and it begins 0
 * @returns {Number} a num, which the idx th digit setted to 1
 */
const setBitValueWithOne = (num, idx) => {
  const digit = getBitValue(num, idx);
  return (num + (1 - digit) * (1 << idx));
};


/**
 * @example
 * // 17 = 10001(2)
 * setBitValueWithZero(17, 0)
 * // 16, 10000
 * @example
 * setBitValueWithZero(17, 1)
 * // 17, 10001
 * @example
 * setBitValueWithZero(17, 4)
 * // 1, 00001
 * @param {Number} idx, idx is reverse, and it begins 0
 * @returns {Number} a num, which the idx th digit setted to 0
 */
const setBitValueWithZero = (num, idx) => {
  const digit = getBitValue(num, idx);
  return (num + (-1 * digit) * (1 << idx));
};


/**
 * @example
 * bytesToHexString([1, 2])
 * // '0102'
 * @example
 * bytesToHexString([23, 2])
 * // '1702'
 * @param {Array} bytes, bytes is a array of `Number` which is a 8 bits `Integer`, the `num` is less thah 256
 * @returns {String} a string which convert from the bytes array
 */
const bytesToHexString = bytes => {
  return bytes.map(x => {
    const high = (x >>> 4).toString(16);
    const low = (x & 0xF).toString(16);
    return `${high}${low}`;
  }).join('');
};


/**
 * 等同于原来的 decToHex
 * @example
 * numToHexString(111)
 * // '6f'
 * @example
 * numToHexString(15)
 * // '0f'
 * @param {Number} dec, a number
 * @returns {String} a string which converts from the `str`, which every char is a hex char
 */
const numToHexString = (num, padding = 2) => {
  const hex = Number(num).toString(16);
  return CoreUtils.toFixed(hex, padding);
};


/**
 * 等同于原来的 numberToBytes
 * @example
 * numToByteNumbers(111)
 * // [0, 111]
 * @example
 * numToHexString(1040001)
 * // [15, 222, 129]
 * @param {Number} dec, a number
 * @returns {Array} a Number Array which converts from the `num`, which every char is a hex char
 */
const numToByteNumbers = (num, bytes = 2) => {
  const hex = Number(num).toString(16);
  const hexStr = CoreUtils.toFilled(hex, bytes * 2);
  const len = hexStr.length;
  return StringUtils.hexStringToNumber([hexStr, `0${hexStr}`][len & 1]);
};


/**
 * 等同于原来的 highlowToInt
 * @example
 * highLowToInt(11, 22)
 * // 2838
 * @example
 * highLowToInt(22, 11)
 * // 5643
 * @param {Number} high, a number which stands the high 8 number
 * @param {Number} low, a number which stands the low 8 number
 * @returns {Number} a number which converts from the `str` and the `low`
 */
const highLowToInt = (high, low) => (low + (high << 8));


/**
 * 等同于原来的 intToHighlow
 * @example
 * highLowToInt(2838)
 * // [11, 22]
 * @example
 * highLowToInt(5643)
 * // [22, 11]
 * @param {Number} num, a number
 * @returns {Array} a array of number, which the first is the high 8 number, the second is the low 8 number
 */
const intToHighLow = num => [num >> 8, num & 0xff];


/**
 * 等同于原来的 inMaxMin
 * @example
 * inMaxMin(2838, 1, 233)
 * // 233
 * @example
 * inMaxMin(1, 2, 0)
 * // 1
 * @param {Number} min, a number is the minimum
 * @param {Number} max, a number is the maximum
 * @param {Number} value, a number
 * @returns {Number} a number which less than the maximum and great than the minimum
 */
const inMaxMin = (min, max, value) => Math.max(Math.min(max, value), min);

/**
 * 等同于原来的 formatNumber
 * @example
 * scaleNumber(2, 10245)
 * // 102.45
 * @example
 * formatNumber(1, 1024)
 * // 102.4
 * @param {Number} scale, a number which stands `10 ^ scale`
 * @param {Number} value, a number
 * @returns {Number}
 */
const scaleNumber = (scale, value) => (value / Math.pow(10, scale)).toFixed(scale).toString();


// https://github.com/lodash/lodash/blob/master/.internal/baseRange.js
/**
 * @example
 * range(0, 3)
 * // [0, 1, 2]
 * @param {Number} start, The start of the range
 * @param {Number} end, The end of the range
 * @param {Number} step, The value to increment or decrement by
 * @returns {Number} Returns the range of numbers.
 */
const range = (start = 0, end, step = 1) => {
  let index = -1
  let length = Math.max(Math.ceil((end - start) / (step || 1)), 0)
  const result = new Array(length)

  while (length--) {
    result[++index] = start
    start += step
  }
  return result
  // if ((end - start ) * step < 0) return [];
  // const len = ~~((end - start) / step) + 1;
  // return (new Array(len)).fill(1).map((_, idx) => (start + idx * step));
};

/**
 * @example
 * calcPosition(50, 0, 100, -100, 0)
 * // -50
 * @example
 * calcPosition(255, 0, 255, 0, 100)
 * // 100
 * @example
 * calcPosition(-255, 0, 255, 0, 100)
 * // -100
 * @param {Number} value - 原先值
 * @param {Number} min - 原先最小范围
 * @param {Number} max - 原先最大范围
 * @param {Number} newMin - 新最小范围
 * @param {Number} newMax - 新最大范围
 * 
 * @return {Number} newValue - 新范围内对应的值
 */
const calcPosition = (value, min, max, newMin, newMax) => {
  const oldRange = max - min;
  const newRange = newMax - newMin;
  const newValue = ((value - min) * newRange / oldRange) + newMin;
  return newValue;
};

/**
 * @example
 * calcPercent(25, 255, 25)
 * // 0
 * @example
 * calcPercent(25, 255, 0)
 * // 0
 * @example
 * calcPercent(25, 255, 25, 0.1)
 * // 0.1
 * @param {Number} min
 * @param {Number} max
 * @param {Number} value, 值
 * @param {Number} offset, 百分比起始偏移量
 */
const calcPercent = (min, max, value, offset = 0) => {
  const val = inMaxMin(min, max, value);
  const newMin = inMaxMin(0, 100, 0 + offset * 100);
  const newMax = 100;
  return calcPosition(val, min, max, newMin, newMax) / 100;
};

const NumberUtil = {
  toFixedString,
  toFilledString,
  getBitValue,
  changeBitValue,
  setBitValueWithOne,
  setBitValueWithZero,
  bytesToHexString,
  numToHexString,
  numToByteNumbers,
  highLowToInt,
  intToHighLow,
  inMaxMin,
  scaleNumber,
  range,
  calcPosition,
  calcPercent,
};


export default NumberUtil;
