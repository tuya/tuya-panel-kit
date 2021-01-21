Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/tabs/tab-mask.js';

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _reactNativeSvg = require('react-native-svg');

var _linearGradient = require('../gradient/linear-gradient');

var _linearGradient2 = _interopRequireDefault(_linearGradient);

var _constant = require('./constant');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Mask = function Mask(_ref) {
  var visible = _ref.visible,
      color = _ref.color;

  if (!visible || color === 'transparent') {
    return null;
  }
  var c1 = (0, _color2.default)(color).alpha(0).rgbString();
  var c2 = (0, _color2.default)(color).alpha(0.8).rgbString();
  var c3 = (0, _color2.default)(color).alpha(1).rgbString();
  return _react2.default.createElement(
    _reactNative.View,
    { style: styles.container, __source: {
        fileName: _jsxFileName,
        lineNumber: 24
      }
    },
    _react2.default.createElement(
      _linearGradient2.default,
      {
        style: _constant.MASK_SIZE,
        x1: '0%',
        y1: '50%',
        x2: '100%',
        y2: '50%',
        stops: {
          '0%': c1,
          '40%': c2,
          '100%': c3
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 25
        }
      },
      _react2.default.createElement(_reactNativeSvg.Rect, _extends({}, _constant.MASK_SIZE, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 37
        }
      }))
    )
  );
};

Mask.propTypes = {
  visible: _propTypes2.default.bool,
  color: _reactNative.ColorPropType
};

Mask.defaultProps = {
  visible: true,
  color: '#fff'
};

var styles = _reactNative.StyleSheet.create({
  container: {
    position: 'absolute',
    width: _constant.MASK_SIZE.width,
    right: 0,
    top: 0,
    bottom: 0
  }
});

exports.default = Mask;