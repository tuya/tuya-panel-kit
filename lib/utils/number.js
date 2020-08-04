Object.defineProperty(exports, "__esModule", {
  value: true
});

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

var _string = require('./string');

var _string2 = _interopRequireDefault(_string);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toFixedString = function toFixedString(num, count) {
  var s = '' + Math.abs(num);
  s = _core2.default.toFixed(s, count);
  return num < 0 ? '-' + s : s;
};

var toFilledString = function toFilledString(num, count) {
  var s = '' + Math.abs(num);
  s = _core2.default.toFilled(s, count);
  return num < 0 ? '-' + s : s;
};

var getBitValue = function getBitValue(num, idx) {
  return (num & 1 << idx) >> idx;
};

var changeBitValue = function changeBitValue(num, idx) {
  return num ^ 1 << idx;
};

var setBitValueWithOne = function setBitValueWithOne(num, idx) {
  var digit = getBitValue(num, idx);
  return num + (1 - digit) * (1 << idx);
};

var setBitValueWithZero = function setBitValueWithZero(num, idx) {
  var digit = getBitValue(num, idx);
  return num + -1 * digit * (1 << idx);
};

var bytesToHexString = function bytesToHexString(bytes) {
  return bytes.map(function (x) {
    var high = (x >>> 4).toString(16);
    var low = (x & 0xF).toString(16);
    return '' + high + low;
  }).join('');
};

var numToHexString = function numToHexString(num) {
  var padding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  var hex = Number(num).toString(16);
  return _core2.default.toFixed(hex, padding);
};

var numToByteNumbers = function numToByteNumbers(num) {
  var bytes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  var hex = Number(num).toString(16);
  var hexStr = _core2.default.toFilled(hex, bytes * 2);
  var len = hexStr.length;
  return _string2.default.hexStringToNumber([hexStr, '0' + hexStr][len & 1]);
};

var highLowToInt = function highLowToInt(high, low) {
  return low + (high << 8);
};

var intToHighLow = function intToHighLow(num) {
  return [num >> 8, num & 0xff];
};

var inMaxMin = function inMaxMin(min, max, value) {
  return Math.max(Math.min(max, value), min);
};

var scaleNumber = function scaleNumber(scale, value) {
  return (value / Math.pow(10, scale)).toFixed(scale).toString();
};

var range = function range() {
  var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var end = arguments[1];
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  var index = -1;
  var length = Math.max(Math.ceil((end - start) / (step || 1)), 0);
  var result = new Array(length);

  while (length--) {
    result[++index] = start;
    start += step;
  }
  return result;
};

var calcPosition = function calcPosition(value, min, max, newMin, newMax) {
  var oldRange = max - min;
  var newRange = newMax - newMin;
  var newValue = (value - min) * newRange / oldRange + newMin;
  return newValue;
};

var calcPercent = function calcPercent(min, max, value) {
  var offset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  var val = inMaxMin(min, max, value);
  var newMin = inMaxMin(0, 100, 0 + offset * 100);
  var newMax = 100;
  return calcPosition(val, min, max, newMin, newMax) / 100;
};

var calNumLength = function calNumLength(number1, number2) {
  var hasPoint1 = number1.toString().indexOf('.') !== -1;
  var hasPoint2 = number2.toString().indexOf('.') !== -1;
  var idxPoint1 = hasPoint1 ? number1.toString().split('.')[1].length : 0;
  var idxPoint2 = hasPoint2 ? number2.toString().split('.')[1].length : 0;
  var maxLength = Math.pow(10, Math.max(idxPoint1, idxPoint2));
  return maxLength;
};

var add = function add(number1, number2) {
  var maxLength = calNumLength(number1, number2);
  return (number1 * maxLength + number2 * maxLength) / maxLength;
};

var subtract = function subtract(number1, number2) {
  var maxLength = calNumLength(number1, number2);
  return (number1 * maxLength - number2 * maxLength) / maxLength;
};

var NumberUtil = {
  toFixedString: toFixedString,
  toFilledString: toFilledString,
  getBitValue: getBitValue,
  changeBitValue: changeBitValue,
  setBitValueWithOne: setBitValueWithOne,
  setBitValueWithZero: setBitValueWithZero,
  bytesToHexString: bytesToHexString,
  numToHexString: numToHexString,
  numToByteNumbers: numToByteNumbers,
  highLowToInt: highLowToInt,
  intToHighLow: intToHighLow,
  inMaxMin: inMaxMin,
  scaleNumber: scaleNumber,
  range: range,
  calcPosition: calcPosition,
  calcPercent: calcPercent,
  add: add,
  subtract: subtract
};

exports.default = NumberUtil;