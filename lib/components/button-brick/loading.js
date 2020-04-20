Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/components/button-brick/loading.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactNativeSvg = require('react-native-svg');

var _reactNativeSvg2 = _interopRequireDefault(_reactNativeSvg);

var _rotationView = require('../rotation-view');

var _rotationView2 = _interopRequireDefault(_rotationView);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cx = _utils.RatioUtils.convertX;


var Loading = function Loading(_ref) {
  var _ref$loading = _ref.loading,
      loading = _ref$loading === undefined ? false : _ref$loading,
      _ref$color = _ref.color,
      color = _ref$color === undefined ? '#fff' : _ref$color,
      _ref$backgroundColor = _ref.backgroundColor,
      backgroundColor = _ref$backgroundColor === undefined ? 'rgba(0,0,0,.1)' : _ref$backgroundColor,
      _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      _ref$size = _ref.size,
      size = _ref$size === undefined ? cx(14) : _ref$size,
      _ref$strokeWidth = _ref.strokeWidth,
      strokeWidth = _ref$strokeWidth === undefined ? cx(2) : _ref$strokeWidth;

  if (!loading) return _react2.default.createElement(_reactNative.View, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    }
  });
  var w = size * 2 - 4 * strokeWidth;
  var content = w / 2;
  var r = w * 0.4;
  var strokeDasharray = [Math.PI * r / 2, Math.PI * r * 1.5];
  return _react2.default.createElement(
    _rotationView2.default,
    { style: style, duration: 1000, __source: {
        fileName: _jsxFileName,
        lineNumber: 24
      }
    },
    _react2.default.createElement(
      _reactNativeSvg2.default,
      { height: w, width: w, __source: {
          fileName: _jsxFileName,
          lineNumber: 25
        }
      },
      _react2.default.createElement(_reactNativeSvg.Circle, {
        cx: content,
        cy: content,
        r: r,
        stroke: backgroundColor,
        strokeWidth: strokeWidth,
        fill: 'transparent',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 26
        }
      }),
      _react2.default.createElement(_reactNativeSvg.Circle, {
        cx: content,
        cy: content,
        r: r,
        origin: content + ',' + content,
        stroke: color,
        strokeWidth: strokeWidth,
        strokeLinecap: 'round',
        fill: 'transparent',
        strokeDasharray: strokeDasharray,
        strokeDashoffset: content,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 34
        }
      })
    )
  );
};

Loading.propTypes = {
  loading: _propTypes2.default.bool,
  color: _reactNative.ColorPropType,
  backgroundColor: _reactNative.ColorPropType,
  style: _reactNative.ViewPropTypes.style,
  size: _propTypes2.default.number,
  strokeWidth: _propTypes2.default.number
};

Loading.defaultProps = {
  loading: false,
  color: '#fff',
  backgroundColor: 'rgba(0,0,0,.1)',
  style: {},
  size: cx(14),
  strokeWidth: cx(2)
};

exports.default = Loading;