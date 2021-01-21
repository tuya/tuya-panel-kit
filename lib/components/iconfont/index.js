Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/iconfont/index.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _svg = require('./svg');

var _svg2 = _interopRequireDefault(_svg);

var _art = require('./art');

var _art2 = _interopRequireDefault(_art);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

exports.default = function (_ref) {
  var useART = _ref.useART,
      rest = _objectWithoutProperties(_ref, ['useART']);

  var IconFont = useART ? _art2.default : _svg2.default;
  return _react2.default.createElement(IconFont, _extends({}, rest, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }));
};