Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledIconFont = exports.StyledInput = exports.TouchableThreeView = exports.TouchableOpacityView = exports.RightView = exports.BigButton = exports.dMinus = exports.dPlus = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  width: ', ';\n  padding: ', ';\n  background-color: #f5f5f5;\n  border-radius: ', ';\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n'], ['\n  width: ', ';\n  padding: ', ';\n  background-color: #f5f5f5;\n  border-radius: ', ';\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  width: ', ';\n  background-color: transparent;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n'], ['\n  width: ', ';\n  background-color: transparent;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  width: ', ';\n  height: ', ';\n  background-color: #fff;\n  border-radius: ', ';\n  align-items: center;\n  justify-content: center;\n  border-width: ', ';\n  border-color: rgba(51, 51, 51, 0.2);\n'], ['\n  width: ', ';\n  height: ', ';\n  background-color: #fff;\n  border-radius: ', ';\n  align-items: center;\n  justify-content: center;\n  border-width: ', ';\n  border-color: rgba(51, 51, 51, 0.2);\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  width: ', ';\n  height: ', ';\n  background-color: transparent;\n  border-radius: ', ';\n  align-items: center;\n  justify-content: center;\n'], ['\n  width: ', ';\n  height: ', ';\n  background-color: transparent;\n  border-radius: ', ';\n  align-items: center;\n  justify-content: center;\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n  font-size: 16;\n  color: #000;\n  width: ', ';\n  height: ', ';\n  align-items: center;\n  justify-content: center;\n  padding: 0px;\n  text-align: center;\n'], ['\n  font-size: 16;\n  color: #000;\n  width: ', ';\n  height: ', ';\n  align-items: center;\n  justify-content: center;\n  padding: 0px;\n  text-align: center;\n']),
    _templateObject6 = _taggedTemplateLiteral([''], ['']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _native = require('styled-components/native');

var _native2 = _interopRequireDefault(_native);

var _iconfont = require('../iconfont');

var _iconfont2 = _interopRequireDefault(_iconfont);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var cx = _utils.RatioUtils.convertX;
var dPlus = exports.dPlus = 'M563.20064 196.288l448 597.312A64 64 0 0 1 960.00064 896H64.00064a64 64 0 0 1-51.2-102.4l448-597.312a64 64 0 0 1 102.4 0z';

var dMinus = exports.dMinus = 'M563.20064 827.712l448-597.312A64 64 0 0 0 960.00064 128H64.00064a64 64 0 0 0-51.2 102.4l448 597.312a64 64 0 0 0 102.4 0z';

var BigButton = exports.BigButton = (0, _native2.default)(_reactNative.View)(_templateObject, cx(153), cx(2) + 'px ' + cx(2) + 'px ' + cx(2) + 'px ' + cx(2) + 'px', cx(16));

var RightView = exports.RightView = (0, _native2.default)(_reactNative.View)(_templateObject2, cx(104));

var TouchableOpacityView = exports.TouchableOpacityView = (0, _native2.default)(_reactNative.TouchableOpacity).attrs({
  activeOpacity: 0.6
})(_templateObject3, cx(52), cx(28), cx(14), _reactNative.StyleSheet.hairlineWidth);

var TouchableThreeView = exports.TouchableThreeView = (0, _native2.default)(_reactNative.TouchableOpacity).attrs({
  activeOpacity: 0.6
})(_templateObject4, cx(18), cx(12), cx(1));

var StyledInput = exports.StyledInput = (0, _native2.default)(_reactNative.TextInput).attrs({
  underlineColorAndroid: 'transparent'
})(_templateObject5, cx(22), cx(22));

var StyledIconFont = exports.StyledIconFont = (0, _native2.default)(_iconfont2.default).attrs({
  size: cx(16)
})(_templateObject6);