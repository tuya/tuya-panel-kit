Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledIconFont = exports.StyledViewChildren = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/tips/styled.js';

var _templateObject = _taggedTemplateLiteral(['\n  min-width: ', ';\n  border-radius: ', ';\n  padding: ', ';\n  background-color: ', ';\n'], ['\n  min-width: ', ';\n  border-radius: ', ';\n  padding: ', ';\n  background-color: ', ';\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _native = require('styled-components/native');

var _native2 = _interopRequireDefault(_native);

var _iconfont = require('../iconfont');

var _iconfont2 = _interopRequireDefault(_iconfont);

var _theme = require('../theme');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var DEFAULT_THEME = _theme.defaultTheme.tips.light;

var cx = _utils.RatioUtils.convertX;
var getTheme = _utils.ThemeUtils.getTheme,
    ThemeConsumer = _utils.ThemeUtils.ThemeConsumer;
var StyledViewChildren = exports.StyledViewChildren = (0, _native2.default)(_reactNative.View)(_templateObject, cx(64), cx(4), cx(8) + 'px ' + cx(16) + 'px ' + cx(8) + 'px ' + cx(16) + 'px', function (props) {
  return getTheme(props, 'tips.bgColor', DEFAULT_THEME.bgColor);
});

var StyledIconFont = function StyledIconFont(props) {
  var color = props.color,
      rest = _objectWithoutProperties(props, ['color']);

  return _react2.default.createElement(
    ThemeConsumer,
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 23
      }
    },
    function (theme) {
      var propsWithTheme = _extends({}, props, { theme: theme });
      return _react2.default.createElement(_iconfont2.default, _extends({
        size: cx(32),
        color: color || getTheme(propsWithTheme, 'tips.bgColor', DEFAULT_THEME.bgColor)
      }, rest, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 27
        }
      }));
    }
  );
};
exports.StyledIconFont = StyledIconFont;