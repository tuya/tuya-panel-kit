Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledIconFont = exports.StyledBadgeText = exports.StyledBadge = exports.StyledBtnText = exports.StyledBtn = exports.StyledBtnContainer = exports.StyledBtnWrapper = exports.SIZE_MAP = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/button/styled.js';

var _templateObject = _taggedTemplateLiteral(['\n    font-size: 16;\n    margin-right: 8px;\n  '], ['\n    font-size: 16;\n    margin-right: 8px;\n  ']),
    _templateObject2 = _taggedTemplateLiteral(['\n    font-size: 16;\n    margin-left: 8px;\n  '], ['\n    font-size: 16;\n    margin-left: 8px;\n  ']),
    _templateObject3 = _taggedTemplateLiteral(['\n    margin-bottom: 4px;\n  '], ['\n    margin-bottom: 4px;\n  ']),
    _templateObject4 = _taggedTemplateLiteral(['\n    margin-top: 4px;\n  '], ['\n    margin-top: 4px;\n  ']),
    _templateObject5 = _taggedTemplateLiteral(['\n      ', '\n    '], ['\n      ', '\n    ']),
    _templateObject6 = _taggedTemplateLiteral(['\n    width: ', 'px;\n    height: ', 'px;\n    border-radius: ', 'px;\n  '], ['\n    width: ', 'px;\n    height: ', 'px;\n    border-radius: ', 'px;\n  ']),
    _templateObject7 = _taggedTemplateLiteral(['\n      background-color: transparent;\n    '], ['\n      background-color: transparent;\n    ']),
    _templateObject8 = _taggedTemplateLiteral(['\n    background-color: ', ';\n  '], ['\n    background-color: ', ';\n  ']),
    _templateObject9 = _taggedTemplateLiteral(['\n  align-self: ', ';\n  align-items: center;\n  justify-content: center;\n  ', ';\n'], ['\n  align-self: ', ';\n  align-items: center;\n  justify-content: center;\n  ', ';\n']),
    _templateObject10 = _taggedTemplateLiteral(['\n  align-self: ', ';\n  align-items: center;\n  justify-content: center;\n'], ['\n  align-self: ', ';\n  align-items: center;\n  justify-content: center;\n']),
    _templateObject11 = _taggedTemplateLiteral(['\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  ', ';\n  ', ';\n'], ['\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  ', ';\n  ', ';\n']),
    _templateObject12 = _taggedTemplateLiteral(['\n  text-align: center;\n  font-size: ', ';\n  opacity: ', ';\n  color: ', ';\n  ', ';\n'], ['\n  text-align: center;\n  font-size: ', ';\n  opacity: ', ';\n  color: ', ';\n  ', ';\n']),
    _templateObject13 = _taggedTemplateLiteral(['\n  position: absolute;\n  border-radius: ', 'px;\n  padding: ', ';\n'], ['\n  position: absolute;\n  border-radius: ', 'px;\n  padding: ', ';\n']),
    _templateObject14 = _taggedTemplateLiteral(['\n  font-size: 10px;\n  text-align: center;\n'], ['\n  font-size: 10px;\n  text-align: center;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _native = require('styled-components/native');

var _native2 = _interopRequireDefault(_native);

var _TYText = require('../TYText');

var _TYText2 = _interopRequireDefault(_TYText);

var _iconfont = require('../iconfont');

var _iconfont2 = _interopRequireDefault(_iconfont);

var _theme = require('../theme');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var cx = _utils.RatioUtils.convertX;
var parseToCss = _utils.ThemeUtils.parseToCss,
    getTheme = _utils.ThemeUtils.getTheme,
    ThemeConsumer = _utils.ThemeUtils.ThemeConsumer;


var DEFAULT_THEME = _theme.defaultTheme.button.light;

var SIZE_MAP = exports.SIZE_MAP = {
  small: cx(32),
  normal: cx(40),
  large: cx(48)
};

var BTN_TEXT_STYLES_MAP = {
  left: (0, _native.css)(_templateObject),
  right: (0, _native.css)(_templateObject2),
  top: (0, _native.css)(_templateObject3),
  bottom: (0, _native.css)(_templateObject4)
};

var sizeStyles = function sizeStyles(props) {
  var bgWidth = getTheme(props, 'button.bgWidth');
  var bgHeight = getTheme(props, 'button.bgHeight');
  var bgRadius = getTheme(props, 'button.bgRadius');
  if (props.size === 'noSet') {
    var styles = [];
    if (typeof bgWidth === 'number') styles.push('width: ' + bgWidth);
    if (typeof bgHeight === 'number') styles.push('height: ' + bgHeight);
    if (typeof bgRadius === 'number') styles.push('border-radius: ' + bgRadius);
    if (styles.length === 0) return null;
    var stylesStr = styles.join('\n');
    return (0, _native.css)(_templateObject5, stylesStr);
  }
  var size = typeof props.size === 'number' ? props.size : SIZE_MAP[props.size];

  return (0, _native.css)(_templateObject6, bgWidth || size, bgHeight || size, bgRadius || size / 2);
};

var bgStyles = function bgStyles(props) {
  if (props.type !== 'primary') {
    return (0, _native.css)(_templateObject7);
  }
  return (0, _native.css)(_templateObject8, getTheme(props, 'button.bgColor', DEFAULT_THEME.bgColor));
};

var btnTextStyles = function btnTextStyles(props) {
  if (!props.textDirection) {
    return null;
  }
  return BTN_TEXT_STYLES_MAP[props.textDirection] || BTN_TEXT_STYLES_MAP.right;
};

var StyledBtnWrapper = exports.StyledBtnWrapper = (0, _native2.default)(_reactNative.View)(_templateObject9, function (props) {
  return props.stretch ? 'stretch' : 'center';
}, function (props) {
  var margin = getTheme(props, 'button.margin', DEFAULT_THEME.margin);
  return parseToCss(margin, 'margin');
});

var StyledBtnContainer = exports.StyledBtnContainer = (0, _native2.default)(_reactNative.TouchableOpacity)(_templateObject10, function (props) {
  return props.stretch ? 'stretch' : 'center';
});

var StyledBtn = exports.StyledBtn = (0, _native2.default)(_reactNative.View)(_templateObject11, function (props) {
  return sizeStyles(props);
}, function (props) {
  return bgStyles(props);
});

var StyledBtnText = exports.StyledBtnText = (0, _native2.default)(_TYText2.default)(_templateObject12, function (props) {
  return getTheme(props, 'button.fontSize', DEFAULT_THEME.fontSize);
}, function (props) {
  return props.disabled ? 0.5 : 1;
}, function (props) {
  return getTheme(props, 'button.fontColor', DEFAULT_THEME.fontColor);
}, function (props) {
  return btnTextStyles(props);
});

var StyledBadge = exports.StyledBadge = (0, _native2.default)(_reactNative.View)(_templateObject13, cx(8), '2px ' + cx(8) + 'px');

var StyledBadgeText = exports.StyledBadgeText = (0, _native2.default)(_TYText2.default)(_templateObject14);

var StyledIconFont = function StyledIconFont(props) {
  var size = props.size,
      color = props.color,
      rest = _objectWithoutProperties(props, ['size', 'color']);

  return _react2.default.createElement(
    ThemeConsumer,
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 126
      }
    },
    function (theme) {
      var propsWithTheme = _extends({}, props, { theme: theme });
      return _react2.default.createElement(_iconfont2.default, _extends({
        size: size || 28,
        color: color || getTheme(propsWithTheme, 'button.iconColor', DEFAULT_THEME.iconColor)
      }, rest, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 130
        }
      }));
    }
  );
};
exports.StyledIconFont = StyledIconFont;