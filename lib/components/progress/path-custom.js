Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/components/progress/path-custom.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactNativeSvg = require('react-native-svg');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PathCustom = function (_PureComponent) {
  _inherits(PathCustom, _PureComponent);

  function PathCustom() {
    _classCallCheck(this, PathCustom);

    return _possibleConstructorReturn(this, (PathCustom.__proto__ || Object.getPrototypeOf(PathCustom)).apply(this, arguments));
  }

  _createClass(PathCustom, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          strokeOpacity = _props.strokeOpacity,
          isGradient = _props.isGradient,
          gradientId = _props.gradientId,
          foreColor = _props.foreColor,
          strokeWidth = _props.strokeWidth,
          path = _props.path;

      return _react2.default.createElement(_reactNativeSvg.Path, {
        d: path,
        x: '0',
        y: '0',
        fill: 'none',
        strokeWidth: strokeWidth,
        strokeOpacity: strokeOpacity,
        stroke: isGradient ? 'url(#' + gradientId + ')' : foreColor,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 27
        }
      });
    }
  }]);

  return PathCustom;
}(_react.PureComponent);

PathCustom.propTypes = {
  strokeOpacity: _propTypes2.default.number,
  path: _propTypes2.default.string,
  isGradient: _propTypes2.default.bool,
  gradientId: _propTypes2.default.string,
  foreColor: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  strokeWidth: _propTypes2.default.number
};
PathCustom.defaultProps = {
  strokeOpacity: 1,
  path: '',
  isGradient: false,
  gradientId: 'Gradient',
  foreColor: '#FF4800',
  strokeWidth: 5
};
exports.default = PathCustom;