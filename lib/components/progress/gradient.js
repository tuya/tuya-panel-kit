Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/components/progress/gradient.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactNativeSvg = require('react-native-svg');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Gradient = function (_PureComponent) {
  _inherits(Gradient, _PureComponent);

  function Gradient() {
    _classCallCheck(this, Gradient);

    return _possibleConstructorReturn(this, (Gradient.__proto__ || Object.getPrototypeOf(Gradient)).apply(this, arguments));
  }

  _createClass(Gradient, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          gradientId = _props.gradientId,
          foreColor = _props.foreColor,
          x1 = _props.x1,
          x2 = _props.x2,
          y1 = _props.y1,
          y2 = _props.y2;

      var stopView = [];

      for (var k in foreColor) {
        var stopColor = (0, _color2.default)(foreColor[k]);
        stopView.push(_react2.default.createElement(_reactNativeSvg.Stop, {
          key: k,
          offset: k,
          stopColor: '#' + _utils.NumberUtils.numToHexString(stopColor.rgbNumber(), 6),
          stopOpacity: stopColor.alpha(),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 34
          }
        }));
      }

      return _react2.default.createElement(
        _reactNativeSvg.Defs,
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 44
          }
        },
        _react2.default.createElement(
          _reactNativeSvg.LinearGradient,
          { id: gradientId, x1: x1, x2: x2, y1: y1, y2: y2, __source: {
              fileName: _jsxFileName,
              lineNumber: 45
            }
          },
          stopView.map(function (d) {
            return d;
          })
        )
      );
    }
  }]);

  return Gradient;
}(_react.PureComponent);

Gradient.propTypes = {
  gradientId: _propTypes2.default.string,
  foreColor: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  x1: _propTypes2.default.string,
  x2: _propTypes2.default.string,
  y1: _propTypes2.default.string,
  y2: _propTypes2.default.string
};
Gradient.defaultProps = {
  gradientId: 'Gradient',
  foreColor: '#FF4800',
  x1: '0%',
  y1: '0%',
  x2: '100%',
  y2: '0%'
};
exports.default = Gradient;