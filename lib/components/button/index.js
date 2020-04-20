Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/button/index.js';

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var isNil = _utils.CoreUtils.isNil;
var parseToStyle = _utils.ThemeUtils.parseToStyle;


var ThemedButton = function ThemedButton(props) {
  var theme = props.theme,
      wrapperStyle = props.wrapperStyle,
      style = props.style,
      textStyle = props.textStyle,
      iconSize = props.iconSize,
      iconColor = props.iconColor,
      rest = _objectWithoutProperties(props, ['theme', 'wrapperStyle', 'style', 'textStyle', 'iconSize', 'iconColor']);

  var themedWrapperStyle = [Array.isArray(theme.margin) && parseToStyle(theme.margin, 'margin'), wrapperStyle];
  var themedBtnStyle = [!isNil(theme.bgWidth) && { width: theme.bgWidth }, !isNil(theme.bgHeight) && { height: theme.bgHeight }, !isNil(theme.bgRadius) && { borderRadius: theme.bgRadius }, theme.bgColor && { backgroundColor: theme.bgColor }, style];
  var themedTextStyle = [!isNil(theme.fontSize) && { fontSize: theme.fontSize }, theme.fontColor && { color: theme.fontColor }, textStyle];
  return _react2.default.createElement(_button2.default, _extends({
    wrapperStyle: themedWrapperStyle,
    style: themedBtnStyle,
    textStyle: themedTextStyle,
    iconSize: iconSize || theme.iconSize,
    iconColor: iconColor || theme.iconColor
  }, rest, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    }
  }));
};

ThemedButton.propTypes = _extends({}, _button2.default.propTypes, {
  theme: _propTypes2.default.shape({
    margin: _propTypes2.default.array,

    fontSize: _propTypes2.default.number,

    fontColor: _reactNative.ColorPropType,

    iconSize: _propTypes2.default.number,

    iconColor: _reactNative.ColorPropType,

    bgWidth: _propTypes2.default.number,

    bgHeight: _propTypes2.default.number,

    bgColor: _reactNative.ColorPropType
  })
});

ThemedButton.defaultProps = {
  theme: {}
};

exports.default = ThemedButton;