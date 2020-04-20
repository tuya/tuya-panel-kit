Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/circle-view/index.js';

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var CircleView = function CircleView(props) {
  var children = props.children,
      radius = props.radius,
      style = props.style,
      color = props.color,
      borderColor = props.borderColor,
      _props$borderWidth = props.borderWidth,
      borderWidth = _props$borderWidth === undefined ? 1.5 : _props$borderWidth,
      restProps = _objectWithoutProperties(props, ['children', 'radius', 'style', 'color', 'borderColor', 'borderWidth']);

  var _backgroundColor = null;
  if (style) {
    _backgroundColor = _reactNative.StyleSheet.flatten(style).backgroundColor;
  }

  var propStyle = {};
  if (borderColor) {
    propStyle.borderWidth = borderWidth;
    propStyle.borderColor = borderColor;
  }
  propStyle.backgroundColor = color || _backgroundColor || null;

  var circleWrapperStyle = [propStyle, style, {
    overflow: 'hidden',
    borderRadius: radius,
    height: radius * 2,
    width: radius * 2
  }];

  return _react2.default.createElement(
    _reactNative.View,
    _extends({}, restProps, { style: circleWrapperStyle, __source: {
        fileName: _jsxFileName,
        lineNumber: 32
      }
    }),
    children
  );
};

CircleView.propTypes = {
  style: _reactNative.ViewPropTypes.style,
  children: _propTypes2.default.node,
  color: _reactNative.ColorPropType,
  borderColor: _reactNative.ColorPropType,
  borderWidth: _propTypes2.default.number,
  radius: _propTypes2.default.number.isRequired
};

exports.default = CircleView;