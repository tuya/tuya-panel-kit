Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledCancelText = exports.StyledTitle = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  text-align: center;\n  color: ', ';\n'], ['\n  text-align: center;\n  color: ', ';\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  text-align: center;\n  color: ', ';\n  font-size: ', 'px;\n'], ['\n  text-align: center;\n  color: ', ';\n  font-size: ', 'px;\n']);

var _reactNative = require('react-native');

var _native = require('styled-components/native');

var _native2 = _interopRequireDefault(_native);

var _themeGet = require('../../../theme/theme-get');

var _TYText = require('../../../TYText');

var _TYText2 = _interopRequireDefault(_TYText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var titleFontColor = _themeGet.dialog.titleFontColor,
    confirmFontColor = _themeGet.dialog.confirmFontColor,
    confirmFontSize = _themeGet.dialog.confirmFontSize;
var StyledTitle = exports.StyledTitle = (0, _native2.default)(_reactNative.Text)(_templateObject, titleFontColor);

var StyledCancelText = exports.StyledCancelText = (0, _native2.default)(_TYText2.default)(_templateObject2, confirmFontColor, confirmFontSize);