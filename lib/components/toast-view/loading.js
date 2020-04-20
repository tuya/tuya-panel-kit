Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/toast-view/loading.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactNative = require('react-native');

var _toast = require('./toast');

var _toast2 = _interopRequireDefault(_toast);

var _utils = require('../../utils');

var _loading = require('../button-brick/loading');

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cx = _utils.RatioUtils.convertX,
    cy = _utils.RatioUtils.convertY;

var Loading = function (_React$PureComponent) {
  _inherits(Loading, _React$PureComponent);

  function Loading() {
    _classCallCheck(this, Loading);

    return _possibleConstructorReturn(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).apply(this, arguments));
  }

  _createClass(Loading, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          contentStyle = _props.contentStyle,
          showPosition = _props.showPosition,
          size = _props.size,
          color = _props.color,
          loading = _props.loading,
          strokeWidth = _props.strokeWidth,
          loadingStyle = _props.loadingStyle,
          loadingBackgroundColor = _props.loadingBackgroundColor,
          toastProps = _objectWithoutProperties(_props, ['contentStyle', 'showPosition', 'size', 'color', 'loading', 'strokeWidth', 'loadingStyle', 'loadingBackgroundColor']);

      return _react2.default.createElement(
        _toast2.default,
        _extends({}, toastProps, {
          showPosition: showPosition,
          contentStyle: [{ paddingVertical: cy(27) }, contentStyle],
          __source: {
            fileName: _jsxFileName,
            lineNumber: 51
          }
        }),
        _react2.default.createElement(_loading2.default, {
          size: size,
          color: color,
          strokeWidth: strokeWidth,
          loading: loading,
          backgroundColor: loadingBackgroundColor,
          style: loadingStyle,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 56
          }
        })
      );
    }
  }]);

  return Loading;
}(_react2.default.PureComponent);

Loading.propTypes = {
  contentStyle: _reactNative.ViewPropTypes.style,
  color: _reactNative.ColorPropType,
  showPosition: _propTypes2.default.string,
  size: _propTypes2.default.number,
  loading: _propTypes2.default.bool,
  strokeWidth: _propTypes2.default.number,
  loadingStyle: _reactNative.ViewPropTypes.style,
  loadingBackgroundColor: _reactNative.ColorPropType
};
Loading.defaultProps = {
  contentStyle: {
    width: cx(120),
    height: cx(120),
    backgroundColor: 'rgba(0,0,0,.7)',
    borderRadius: cx(8)
  },
  showPosition: 'center',
  size: cx(28),
  color: '#FFF',
  loading: true,
  loadingStyle: null,
  strokeWidth: cx(4),
  loadingBackgroundColor: 'rgba(255,255,255,.1)'
};
exports.default = Loading;