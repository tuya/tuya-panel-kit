Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/gradient/radial-gradient.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _reactNativeSvg = require('react-native-svg');

var _reactNativeSvg2 = _interopRequireDefault(_reactNativeSvg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Window = _reactNative.Dimensions.get('window');

var RadialGradient = function (_Component) {
  _inherits(RadialGradient, _Component);

  function RadialGradient(props) {
    _classCallCheck(this, RadialGradient);

    var _this = _possibleConstructorReturn(this, (RadialGradient.__proto__ || Object.getPrototypeOf(RadialGradient)).call(this, props));

    _this._gradientId = Math.random().toString(36).substring(7);
    return _this;
  }

  _createClass(RadialGradient, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          cx = _props.cx,
          cy = _props.cy,
          rx = _props.rx,
          ry = _props.ry,
          fx = _props.fx,
          fy = _props.fy,
          stops = _props.stops;
      var gradientId = this.gradientId;

      var _StyleSheet$flatten = _reactNative.StyleSheet.flatten([styles.container, style]),
          height = _StyleSheet$flatten.height,
          width = _StyleSheet$flatten.width;

      return _react2.default.createElement(
        _reactNative.View,
        { style: [styles.container, style], __source: {
            fileName: _jsxFileName,
            lineNumber: 67
          }
        },
        _react2.default.createElement(
          _reactNativeSvg2.default,
          { height: height, style: style, width: width, __source: {
              fileName: _jsxFileName,
              lineNumber: 68
            }
          },
          _react2.default.createElement(
            _reactNativeSvg.Defs,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 69
              }
            },
            _react2.default.createElement(
              _reactNativeSvg.RadialGradient,
              { id: gradientId, cx: cx, cy: cy, fx: fx, fy: fy, rx: rx, ry: ry, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 70
                }
              },
              stops.map(function (x) {
                return _react2.default.createElement(_reactNativeSvg.Stop, _extends({ key: x.offset }, x, {
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 72
                  }
                }));
              })
            )
          ),
          _react2.default.createElement(_reactNativeSvg.Rect, { fill: 'url(#' + gradientId + ')', height: height, width: width, x: '0', y: '0', __source: {
              fileName: _jsxFileName,
              lineNumber: 76
            }
          })
        )
      );
    }
  }, {
    key: 'gradientId',
    get: function get() {
      return this.props.gradientId || this._gradientId;
    }
  }]);

  return RadialGradient;
}(_react.Component);

RadialGradient.propTypes = {
  style: _reactNative.ViewPropTypes.style,
  gradientId: _propTypes2.default.string,
  cx: _propTypes2.default.string,
  cy: _propTypes2.default.string,
  fx: _propTypes2.default.string,
  fy: _propTypes2.default.string,
  rx: _propTypes2.default.string,
  ry: _propTypes2.default.string,
  stops: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    offset: _propTypes2.default.string.isRequired,
    stopColor: _propTypes2.default.string.isRequired,
    stopOpacity: _propTypes2.default.string.isRequired
  }))
};
RadialGradient.defaultProps = {
  style: null,
  gradientId: null,
  cx: '50%',
  cy: '50%',
  rx: '50%',
  ry: '50%',
  fx: '50%',
  fy: '50%',
  stops: [{
    offset: '0%',
    stopColor: '#ff0',
    stopOpacity: '1'
  }, {
    offset: '100%',
    stopColor: '#00f',
    stopOpacity: '1'
  }]
};
exports.default = RadialGradient;


var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'transparent',
    width: Window.width,
    height: Window.height
  }
});