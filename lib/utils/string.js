Object.defineProperty(exports, "__esModule", {
  value: true
});

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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