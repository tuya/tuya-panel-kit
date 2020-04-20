Object.defineProperty(exports, "__esModule", {
  value: true
});

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var codePointAt = function codePointAt(that, pos) {
  var s = String(that);
  var position = parseInt(pos);
  var size = s.length;
  var first = void 0,
      second = void 0;
  if (position < 0 || position >= size) return undefined;
  first = s.charCodeAt(position);
  return first < 0xd800 || first > 0xdbff || position + 1 === size || (second = s.charCodeAt(position + 1)) < 0xdc00 || second > 0xdfff ? first : (first - 0xd800 << 10) + (second - 0xdc00) + 0x10000;
};

var hexEncode = function hexEncode(str) {
  var result = void 0;
  for (var _iterator = str, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator']();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var s = _ref;

    var hex = codePointAt(s, 0).toString(16);
    result += hex;
  }
  return result;
};

var hexStringToNumber = function hexStringToNumber(bits) {
  return _core2.default.partition(bits, 2).map(function (item) {
    return parseInt(item, 16);
  });
};

var hexStringToBinString = function hexStringToBinString(hexString) {
  return _core2.default.partition(hexString, 2).map(function (x) {
    return parseInt(x, 16).toString(2);
  }).map(function (x) {
    return _core2.default.toFixed(x, 8);
  }).join('');
};

var strToHexString = function strToHexString(str) {
  var binList = str.match(/[01]{4}/g) || [];
  return binList.map(function (x) {
    return parseInt(x, 2).toString(16);
  }).join('');
};

var camelize = function camelize(str) {
  if (_core2.default.isNumerical(str)) {
    return '' + str;
  }

  str = str.replace(/[\-_\s]+(.)?/g, function (match, chr) {
    return chr ? chr.toUpperCase() : '';
  });

  return str.substr(0, 1).toLowerCase() + str.substr(1);
};

var StringUtil = {
  hexStringToNumber: hexStringToNumber,
  hexStringToBinString: hexStringToBinString,
  strToHexString: strToHexString,
  camelize: camelize
};

exports.default = StringUtil;