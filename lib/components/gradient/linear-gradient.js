Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/components/gradient/linear-gradient.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _reactNativeSvg = require('react-native-svg');

var _reactNativeSvg2 = _interopRequireDefault(_reactNativeSvg);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Window = _reactNative.Dimensions.get('window');

var LinearGradient = function (_Component) {
  _inherits(LinearGradient, _Component);

  function LinearGradient(props) {
    _classCallCheck(this, LinearGradient);

    var _this = _possibleConstructorReturn(this, (LinearGradient.__proto__ || Object.getPrototypeOf(LinearGradient)).call(this, props));

    _this._gradientId = Math.random().toString(36).substring(7);
    _this.setSource = _this.setSource.bind(_this);
    _this.state = {
      stops: props.stops,
      x1: props.x1,
      y1: props.y1,
      x2: props.x2,
      y2: props.y2
    };
    return _this;
  }

  _createClass(LinearGradient, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        stops: nextProps.stops,
        x1: nextProps.x1,
        y1: nextProps.y1,
        x2: nextProps.x2,
        y2: nextProps.y2
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.state.x1 !== nextState.x1 || this.state.x2 !== nextState.x2 || this.state.y1 !== nextState.y1 || this.state.y2 !== nextState.y2 || this.state.stops !== nextState.stops || this.props.children !== nextProps.children;
    }
  }, {
    key: 'setSource',
    value: function setSource(background) {
      var x1 = background.x1,
          y1 = background.y1,
          x2 = background.x2,
          y2 = background.y2,
          stops = background.stops,
          fstops = _objectWithoutProperties(background, ['x1', 'y1', 'x2', 'y2', 'stops']);

      var st = stops || fstops;
      var props = this.props;
      this.setState({
        stops: st,
        x1: x1 || props.x1,
        y1: y1 || props.y1,
        x2: x2 || props.x2,
        y2: y2 || props.y2
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var gradientId = this.gradientId;
      var style = this.props.style;
      var _state = this.state,
          stops = _state.stops,
          x1 = _state.x1,
          x2 = _state.x2,
          y1 = _state.y1,
          y2 = _state.y2;

      var _StyleSheet$flatten = _reactNative.StyleSheet.flatten([styles.container, style]),
          height = _StyleSheet$flatten.height,
          width = _StyleSheet$flatten.width;

      var stopView = [];
      for (var k in stops) {
        var stopColor = (0, _color2.default)(stops[k]);
        stopView.push(_react2.default.createElement(_reactNativeSvg.Stop, {
          key: k,
          offset: k,
          stopColor: '#' + _utils.NumberUtils.numToHexString(stopColor.rgbNumber(), 6),
          stopOpacity: stopColor.alpha(),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 123
          }
        }));
      }

      return _react2.default.createElement(
        _reactNative.View,
        { style: [styles.container, style], __source: {
            fileName: _jsxFileName,
            lineNumber: 133
          }
        },
        _react2.default.createElement(
          _reactNativeSvg2.default,
          { height: height, width: width, __source: {
              fileName: _jsxFileName,
              lineNumber: 134
            }
          },
          _react2.default.createElement(
            _reactNativeSvg.Defs,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 135
              }
            },
            _react2.default.createElement(
              _reactNativeSvg.LinearGradient,
              { id: gradientId, x1: x1, x2: x2, y1: y1, y2: y2, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 136
                }
              },
              stopView.map(function (d) {
                return d;
              })
            )
          ),
          _react2.default.Children.map(this.props.children, function (element) {
            return _react2.default.cloneElement(element, { fill: 'url(#' + gradientId + ')' });
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

  return LinearGradient;
}(_react.Component);

LinearGradient.propTypes = {
  children: _propTypes2.default.any,

  gradientId: _propTypes2.default.string,

  stops: _propTypes2.default.object,

  style: _reactNative.ViewPropTypes.style,

  x1: _propTypes2.default.string,

  x2: _propTypes2.default.string,

  y1: _propTypes2.default.string,

  y2: _propTypes2.default.string
};
LinearGradient.defaultProps = {
  gradientId: 'linear-gradient',
  style: null,
  children: null,
  stops: {
    '0%': 'rgb(255, 255, 255)',
    '100%': 'rgb(0, 0, 0)'
  },
  x1: '0%',
  y1: '0%',
  x2: '0%',
  y2: '100%'
};
exports.default = LinearGradient;


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