Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledArrowImage = exports.StyledImage = exports.StyledIconFont = exports.StyledFooterText = exports.StyledFooter = exports.StyledHeaderText = exports.StyledHeader = exports.StyledValueText = exports.StyledSubTitle = exports.StyledTitle = exports.StyledItemRight = exports.StyledItemCenter = exports.StyledItemLeft = exports.StyledItemContent = exports.StyledItem = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/TYLists/styled.js';

var _templateObject = _taggedTemplateLiteral(['\n  flex-grow: 0;\n  align-self: stretch;\n  min-height: 48px;\n  ', ';\n  background-color: ', ';\n  border-radius: ', ';\n'], ['\n  flex-grow: 0;\n  align-self: stretch;\n  min-height: 48px;\n  ', ';\n  background-color: ', ';\n  border-radius: ', ';\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  flex-direction: row;\n  align-items: center;\n  ', ';\n  opacity: ', ';\n  border-radius: ', ';\n'], ['\n  flex-direction: row;\n  align-items: center;\n  ', ';\n  opacity: ', ';\n  border-radius: ', ';\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  justify-content: center;\n  margin-right: ', ';\n'], ['\n  justify-content: center;\n  margin-right: ', ';\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  flex: 1;\n  justify-content: center;\n'], ['\n  flex: 1;\n  justify-content: center;\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n  flex-direction: row;\n  align-items: center;\n  margin-left: ', ';\n'], ['\n  flex-direction: row;\n  align-items: center;\n  margin-left: ', ';\n']),
    _templateObject6 = _taggedTemplateLiteral(['\n  color: ', ';\n'], ['\n  color: ', ';\n']),
    _templateObject7 = _taggedTemplateLiteral(['\n  margin-top: 4px;\n  color: ', ';\n'], ['\n  margin-top: 4px;\n  color: ', ';\n']),
    _templateObject8 = _taggedTemplateLiteral(['\n  margin-left: ', ';\n  margin-right: ', ';\n  margin-top: 24px;\n  margin-bottom: 8px;\n'], ['\n  margin-left: ', ';\n  margin-right: ', ';\n  margin-top: 24px;\n  margin-bottom: 8px;\n']),
    _templateObject9 = _taggedTemplateLiteral(['\n  margin-left: ', ';\n  margin-right: ', ';\n  margin-top: 8px;\n  margin-bottom: 24px;\n'], ['\n  margin-left: ', ';\n  margin-right: ', ';\n  margin-top: 8px;\n  margin-bottom: 24px;\n']);

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

var DEFAULT_THEME = _theme.defaultTheme.list.light;

var cx = _utils.RatioUtils.convertX;
var parseToCss = _utils.ThemeUtils.parseToCss,
    getTheme = _utils.ThemeUtils.getTheme,
    ThemeConsumer = _utils.ThemeUtils.ThemeConsumer;
var StyledItem = exports.StyledItem = (0, _native2.default)(_reactNative.TouchableOpacity)(_templateObject, function (props) {
  var margin = getTheme(props, 'list.margin', DEFAULT_THEME.margin);
  return parseToCss(margin, 'margin');
}, function (props) {
  return getTheme(props, 'list.cellBg', DEFAULT_THEME.cellBg);
}, function (props) {
  return getTheme(props, 'list.cellRadius', DEFAULT_THEME.cellRadius);
});

var StyledItemContent = exports.StyledItemContent = (0, _native2.default)(_reactNative.View)(_templateObject2, function (props) {
  var padding = getTheme(props, 'list.padding', DEFAULT_THEME.padding);
  return parseToCss(padding, 'padding');
}, function (props) {
  return props.disabled ? 0.3 : 1;
}, function (props) {
  return getTheme(props, 'list.cellRadius', DEFAULT_THEME.cellRadius);
});

var StyledItemLeft = exports.StyledItemLeft = (0, _native2.default)(_reactNative.View)(_templateObject3, cx(10));

var StyledItemCenter = exports.StyledItemCenter = (0, _native2.default)(_reactNative.View)(_templateObject4);

var StyledItemRight = exports.StyledItemRight = (0, _native2.default)(_reactNative.TouchableOpacity)(_templateObject5, cx(10));

var StyledTitle = exports.StyledTitle = (0, _native2.default)(_TYText2.default).attrs({
  type: 'title',
  size: 'small'
})(_templateObject6, function (props) {
  return getTheme(props, 'list.fontColor', DEFAULT_THEME.fontColor);
});

var StyledSubTitle = exports.StyledSubTitle = (0, _native2.default)(_TYText2.default).attrs({
  type: 'paragraph',
  size: 'large'
})(_templateObject7, function (props) {
  return getTheme(props, 'list.subFontColor', DEFAULT_THEME.subFontColor);
});

var StyledValueText = exports.StyledValueText = (0, _native2.default)(_TYText2.default).attrs({
  type: 'paragraph',
  size: 'large'
})(_templateObject6, function (props) {
  return getTheme(props, 'list.descFontColor', DEFAULT_THEME.descFontColor);
});

var StyledHeader = exports.StyledHeader = (0, _native2.default)(_reactNative.View)(_templateObject8, cx(16), cx(16));

var StyledHeaderText = exports.StyledHeaderText = (0, _native2.default)(_TYText2.default).attrs({
  type: 'paragraph',
  size: 'normal'
})(_templateObject6, function (props) {
  return props.color || getTheme(props, 'list.subFontColor', DEFAULT_THEME.subFontColor);
});

var StyledFooter = exports.StyledFooter = (0, _native2.default)(_reactNative.View)(_templateObject9, cx(16), cx(16));

var StyledFooterText = exports.StyledFooterText = (0, _native2.default)(_TYText2.default).attrs({
  type: 'paragraph',
  size: 'normal'
})(_templateObject6, function (props) {
  return props.color || getTheme(props, 'list.subFontColor', DEFAULT_THEME.subFontColor);
});

var StyledIconFont = function StyledIconFont(props) {
  var size = props.size,
      color = props.color,
      rest = _objectWithoutProperties(props, ['size', 'color']);

  return _react2.default.createElement(
    ThemeConsumer,
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 108
      }
    },
    function (theme) {
      var propsWithTheme = _extends({}, props, { theme: theme });
      return _react2.default.createElement(_iconfont2.default, _extends({
        size: size || 28,
        color: color || getTheme(propsWithTheme, 'list.iconColor', DEFAULT_THEME.iconColor)
      }, rest, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 112
        }
      }));
    }
  );
};

exports.StyledIconFont = StyledIconFont;
var StyledImage = function StyledImage(props) {
  var style = props.style,
      rest = _objectWithoutProperties(props, ['style']);

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
      var imageStyle = [props.size && { width: props.size, height: props.size }, props.imageFollowIconColor && {
        tintColor: props.color || getTheme(propsWithTheme, 'list.iconColor', DEFAULT_THEME.iconColor)
      }, style];
      return _react2.default.createElement(_reactNative.Image, _extends({ style: imageStyle }, rest, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 137
        }
      }));
    }
  );
};

exports.StyledImage = StyledImage;
var StyledArrowImage = exports.StyledArrowImage = function StyledArrowImage(props) {
  return _react2.default.createElement(StyledImage, _extends({
    style: { marginLeft: cx(6) },
    source: require('../res/arrow.png'),
    imageFollowIconColor: true
  }, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 144
    }
  }));
};