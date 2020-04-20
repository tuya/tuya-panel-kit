Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledList = exports.StyledCheckboxList = exports.StyledInput = exports.StyledInputContainer = exports.StyledConfirmText = exports.StyledCancelText = exports.StyledButton = exports.StyledSubTitle = exports.StyledTitle = exports.StyledFooter = exports.StyledContent = exports.StyledHeader = exports.StyledContainer = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  width: ', 'px;\n  align-self: center;\n  align-items: center;\n  justify-content: center;\n  border-radius: ', ';\n  background-color: ', ';\n'], ['\n  width: ', 'px;\n  align-self: center;\n  align-items: center;\n  justify-content: center;\n  border-radius: ', ';\n  background-color: ', ';\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  align-self: stretch;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  border-bottom-width: ', ';\n  border-bottom-color: ', ';\n  height: ', 'px;\n'], ['\n  align-self: stretch;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  border-bottom-width: ', ';\n  border-bottom-color: ', ';\n  height: ', 'px;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  padding: ', 'px;\n  align-self: stretch;\n  align-items: center;\n  justify-content: center;\n'], ['\n  padding: ', 'px;\n  align-self: stretch;\n  align-items: center;\n  justify-content: center;\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  align-self: stretch;\n  flex-direction: row;\n  border-top-width: ', ';\n  border-top-color: ', ';\n  height: ', 'px;\n'], ['\n  align-self: stretch;\n  flex-direction: row;\n  border-top-width: ', ';\n  border-top-color: ', ';\n  height: ', 'px;\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n  font-weight: 500;\n  font-size: ', 'px;\n  text-align: center;\n  color: ', ';\n'], ['\n  font-weight: 500;\n  font-size: ', 'px;\n  text-align: center;\n  color: ', ';\n']),
    _templateObject6 = _taggedTemplateLiteral(['\n  margin-top: 7px;\n  font-size: ', 'px;\n  text-align: center;\n  color: ', ';\n'], ['\n  margin-top: 7px;\n  font-size: ', 'px;\n  text-align: center;\n  color: ', ';\n']),
    _templateObject7 = _taggedTemplateLiteral(['\n  flex: 1;\n  align-items: center;\n  justify-content: center;\n  border-right-width: ', ';\n  border-right-color: ', ';\n'], ['\n  flex: 1;\n  align-items: center;\n  justify-content: center;\n  border-right-width: ', ';\n  border-right-color: ', ';\n']),
    _templateObject8 = _taggedTemplateLiteral(['\n  font-size: ', 'px;\n  text-align: center;\n  color: ', ';\n'], ['\n  font-size: ', 'px;\n  text-align: center;\n  color: ', ';\n']),
    _templateObject9 = _taggedTemplateLiteral(['\n  font-weight: bold;\n  font-size: ', 'px;\n  text-align: center;\n  color: ', ';\n'], ['\n  font-weight: bold;\n  font-size: ', 'px;\n  text-align: center;\n  color: ', ';\n']),
    _templateObject10 = _taggedTemplateLiteral(['\n  justify-content: center;\n  border-radius: ', '\n  align-self: stretch;\n  margin-top: 16px;\n  padding: ', ';\n  background-color: ', ';\n  border-color: ', ';\n  border-width: ', ';\n'], ['\n  justify-content: center;\n  border-radius: ', '\n  align-self: stretch;\n  margin-top: 16px;\n  padding: ', ';\n  background-color: ', ';\n  border-color: ', ';\n  border-width: ', ';\n']),
    _templateObject11 = _taggedTemplateLiteral(['\n  font-size: ', ';\n  color: ', ';\n  padding: 0px;\n'], ['\n  font-size: ', ';\n  color: ', ';\n  padding: 0px;\n']),
    _templateObject12 = _taggedTemplateLiteral(['\n  align-self: stretch;\n  background-color: ', ';\n'], ['\n  align-self: stretch;\n  background-color: ', ';\n']),
    _templateObject13 = _taggedTemplateLiteral(['\n  margin-top: ', 'px;\n  align-self: stretch;\n  background-color: ', ';\n  border-top-color: ', ';\n  border-top-width: ', ';\n  border-bottom-left-radius: ', ';\n  border-bottom-right-radius: ', ';\n'], ['\n  margin-top: ', 'px;\n  align-self: stretch;\n  background-color: ', ';\n  border-top-color: ', ';\n  border-top-width: ', ';\n  border-bottom-left-radius: ', ';\n  border-bottom-right-radius: ', ';\n']);

var _reactNative = require('react-native');

var _native = require('styled-components/native');

var _native2 = _interopRequireDefault(_native);

var _utils = require('../../utils');

var _list = require('../TYLists/list');

var _list2 = _interopRequireDefault(_list);

var _TYText = require('../TYText');

var _TYText2 = _interopRequireDefault(_TYText);

var _themeGet = require('../theme/theme-get');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var cx = _utils.RatioUtils.convertX;
var width = _themeGet.dialog.width,
    radius = _themeGet.dialog.radius,
    bgColor = _themeGet.dialog.bgColor,
    lineColor = _themeGet.dialog.lineColor,
    cellHeight = _themeGet.dialog.cellHeight,
    titleFontSize = _themeGet.dialog.titleFontSize,
    titleFontColor = _themeGet.dialog.titleFontColor,
    subTitleFontSize = _themeGet.dialog.subTitleFontSize,
    subTitleFontColor = _themeGet.dialog.subTitleFontColor,
    cancelFontSize = _themeGet.dialog.cancelFontSize,
    cancelFontColor = _themeGet.dialog.cancelFontColor,
    confirmFontSize = _themeGet.dialog.confirmFontSize,
    confirmFontColor = _themeGet.dialog.confirmFontColor,
    prompt = _themeGet.dialog.prompt;
var StyledContainer = exports.StyledContainer = (0, _native2.default)(_reactNative.View)(_templateObject, width, radius, bgColor);

var StyledHeader = exports.StyledHeader = (0, _native2.default)(_reactNative.View)(_templateObject2, _reactNative.StyleSheet.hairlineWidth, lineColor, cellHeight);

var StyledContent = exports.StyledContent = (0, _native2.default)(_reactNative.View)(_templateObject3, cx(16));

var StyledFooter = exports.StyledFooter = (0, _native2.default)(_reactNative.View)(_templateObject4, _reactNative.StyleSheet.hairlineWidth, lineColor, cellHeight);

var StyledTitle = exports.StyledTitle = (0, _native2.default)(_TYText2.default)(_templateObject5, titleFontSize, titleFontColor);

var StyledSubTitle = exports.StyledSubTitle = (0, _native2.default)(_TYText2.default)(_templateObject6, subTitleFontSize, subTitleFontColor);

var StyledButton = exports.StyledButton = (0, _native2.default)(_reactNative.TouchableOpacity).attrs({
  activeOpacity: 0.8
})(_templateObject7, function (props) {
  return props.bordered ? _reactNative.StyleSheet.hairlineWidth : 0;
}, lineColor);

var StyledCancelText = exports.StyledCancelText = (0, _native2.default)(_TYText2.default)(_templateObject8, cancelFontSize, cancelFontColor);

var StyledConfirmText = exports.StyledConfirmText = (0, _native2.default)(_TYText2.default)(_templateObject9, confirmFontSize, confirmFontColor);

var StyledInputContainer = exports.StyledInputContainer = (0, _native2.default)(_reactNative.View)(_templateObject10, prompt.radius, prompt.padding, prompt.bg, lineColor, _reactNative.StyleSheet.hairlineWidth);

var StyledInput = exports.StyledInput = (0, _native2.default)(_reactNative.TextInput).attrs({
  placeholderTextColor: prompt.placeholder,
  underlineColorAndroid: 'transparent'
})(_templateObject11, subTitleFontSize, titleFontColor);

var StyledCheckboxList = exports.StyledCheckboxList = (0, _native2.default)(_list2.default)(_templateObject12, bgColor);

var StyledList = exports.StyledList = (0, _native2.default)(_list2.default)(_templateObject13, cx(16), bgColor, lineColor, _reactNative.StyleSheet.hairlineWidth, radius, radius);