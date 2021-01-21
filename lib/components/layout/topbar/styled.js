Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledIconFont = exports.StyledImage = exports.StyledTopBarText = exports.StyledTopBarAction = exports.StyledTopBarSubTitle = exports.StyledTopBarTitle = exports.StyledTopBarContent = exports.StyledTopBar = exports.StyledTopBarContainer = exports.TOPBAR_ACTION_TEXT_WIDTH = exports.TOPBAR_ACTION_WIDTH = exports.TOPBAR_HEIGHT = exports.TOPBAR_MARGIN = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/layout/topbar/styled.js';

var _templateObject = _taggedTemplateLiteral(['\n  align-self: stretch;\n  height: ', 'px;\n'], ['\n  align-self: stretch;\n  height: ', 'px;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  flex-direction: row;\n  align-self: stretch;\n  align-items: center;\n  justify-content: space-between;\n  height: ', ';\n  margin-top: ', ';\n'], ['\n  flex-direction: row;\n  align-self: stretch;\n  align-items: center;\n  justify-content: space-between;\n  height: ', ';\n  margin-top: ', ';\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  position: absolute;\n  height: 100%;\n  align-self: center;\n  align-items: ', ';\n  justify-content: center;\n'], ['\n  position: absolute;\n  height: 100%;\n  align-self: center;\n  align-items: ', ';\n  justify-content: center;\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  font-weight: 500;\n  color: ', ';\n'], ['\n  font-weight: 500;\n  color: ', ';\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n  color: ', ';\n'], ['\n  color: ', ';\n']),
    _templateObject6 = _taggedTemplateLiteral(['\n  width: ', 'px;\n  height: 100%;\n  position: absolute;\n  align-items: center;\n  justify-content: center;\n'], ['\n  width: ', 'px;\n  height: 100%;\n  position: absolute;\n  align-items: center;\n  justify-content: center;\n']),
    _templateObject7 = _taggedTemplateLiteral(['\n  font-size: 16px;\n  color: ', ';\n'], ['\n  font-size: 16px;\n  color: ', ';\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _native = require('styled-components/native');

var _native2 = _interopRequireDefault(_native);

var _TYText = require('../../TYText');

var _TYText2 = _interopRequireDefault(_TYText);

var _iconfont = require('../../iconfont');

var _iconfont2 = _interopRequireDefault(_iconfont);

var _theme = require('../../theme');

var _utils = require('../../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var getTheme = _utils.ThemeUtils.getTheme,
    ThemeConsumer = _utils.ThemeUtils.ThemeConsumer;
var isIos = _utils.RatioUtils.isIos,
    isIphoneX = _utils.RatioUtils.isIphoneX,
    statusBarHeight = _utils.RatioUtils.statusBarHeight;


var DEFAULT_THEME = _theme.defaultTheme.topbar.light;

var ALIGN_ITEMS_MAP = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end'
};

var TOPBAR_MARGIN = exports.TOPBAR_MARGIN = 6;
var TOPBAR_HEIGHT = exports.TOPBAR_HEIGHT = isIos ? isIphoneX ? 88 : 64 : 56;
var TOPBAR_ACTION_WIDTH = exports.TOPBAR_ACTION_WIDTH = 17;
var TOPBAR_ACTION_TEXT_WIDTH = exports.TOPBAR_ACTION_TEXT_WIDTH = 78;

var StyledTopBarContainer = exports.StyledTopBarContainer = (0, _native2.default)(_reactNative.View)(_templateObject, TOPBAR_HEIGHT);

var StyledTopBar = exports.StyledTopBar = (0, _native2.default)(_reactNative.View)(_templateObject2, isIos ? TOPBAR_HEIGHT - statusBarHeight : TOPBAR_HEIGHT, isIos ? statusBarHeight : 0);

var StyledTopBarContent = exports.StyledTopBarContent = (0, _native2.default)(_reactNative.View)(_templateObject3, function (props) {
  return ALIGN_ITEMS_MAP[props.align] || 'center';
});

var StyledTopBarTitle = exports.StyledTopBarTitle = (0, _native2.default)(_TYText2.default).attrs({
  type: 'title',
  size: 17
})(_templateObject4, function (props) {
  return props.color || getTheme(props, 'topbar.color', DEFAULT_THEME.color);
});

var StyledTopBarSubTitle = exports.StyledTopBarSubTitle = (0, _native2.default)(_TYText2.default).attrs({
  type: 'paragraph',
  size: 'normal'
})(_templateObject5, function (props) {
  return props.color || getTheme(props, 'topbar.color', DEFAULT_THEME.color);
});

var StyledTopBarAction = exports.StyledTopBarAction = (0, _native2.default)(_reactNative.TouchableOpacity)(_templateObject6, TOPBAR_ACTION_WIDTH);

var StyledTopBarText = exports.StyledTopBarText = (0, _native2.default)(_TYText2.default)(_templateObject7, function (props) {
  return props.color || getTheme(props, 'topbar.color', DEFAULT_THEME.color);
});

var StyledImage = function StyledImage(props) {
  var style = props.style,
      rest = _objectWithoutProperties(props, ['style']);

  return _react2.default.createElement(
    ThemeConsumer,
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 78
      }
    },
    function (theme) {
      var propsWithTheme = _extends({}, props, { theme: theme });
      var imageStyle = [{
        tintColor: props.color || getTheme(propsWithTheme, 'topbar.color', DEFAULT_THEME.color)
      }, style];
      return _react2.default.createElement(_reactNative.Image, _extends({ style: imageStyle }, rest, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 87
        }
      }));
    }
  );
};

exports.StyledImage = StyledImage;
var StyledIconFont = function StyledIconFont(props) {
  var color = props.color,
      rest = _objectWithoutProperties(props, ['color']);

  return _react2.default.createElement(
    ThemeConsumer,
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 96
      }
    },
    function (theme) {
      var propsWithTheme = _extends({}, props, { theme: theme });
      return _react2.default.createElement(_iconfont2.default, _extends({
        color: color || getTheme(propsWithTheme, 'topbar.color', DEFAULT_THEME.color)
      }, rest, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 100
        }
      }));
    }
  );
};
exports.StyledIconFont = StyledIconFont;