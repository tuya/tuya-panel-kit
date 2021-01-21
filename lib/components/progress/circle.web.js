Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/components/progress/circle.web.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _svgs = require('svgs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProgressCircle = function (_PureComponent) {
  _inherits(ProgressCircle, _PureComponent);

  function ProgressCircle() {
    _classCallCheck(this, ProgressCircle);

    return _possibleConstructorReturn(this, (ProgressCircle.__proto__ || Object.getPrototypeOf(ProgressCircle)).apply(this, arguments));
  }

  _createClass(ProgressCircle, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          strokeWidth = _props.strokeWidth,
          fill = _props.fill,
          stroke = _props.stroke,
          r = _props.r,
          cx = _props.cx,
          cy = _props.cy;

      return _react2.default.createElement(_svgs.Circle, { cx: cx, cy: cy, r: r, fill: fill, stroke: stroke, strokeWidth: strokeWidth, __source: {
          fileName: _jsxFileName,
          lineNumber: 26
        }
      });
    }
  }]);

  return ProgressCircle;
}(_react.PureComponent);

ProgressCircle.propTypes = {
  cx: _propTypes2.default.number,
  cy: _propTypes2.default.number,
  fill: _propTypes2.default.string,
  strokeWidth: _propTypes2.default.number,
  stroke: _propTypes2.default.string,
  r: _propTypes2.default.number
};
ProgressCircle.defaultProps = {
  cx: 0,
  cy: 0,
  fill: '#fff',
  strokeWidth: 2,
  stroke: '#000',
  r: 4
};
exports.default = ProgressCircle;