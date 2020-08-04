Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/global-toast/index.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactNative = require('react-native');

var _iconfont = require('../res/iconfont.json');

var _iconfont2 = _interopRequireDefault(_iconfont);

var _toast = require('../toast-view/toast');

var _toast2 = _interopRequireDefault(_toast);

var _svg = require('../iconfont/svg');

var _svg2 = _interopRequireDefault(_svg);

var _utils = require('../../utils');

var _utils2 = require('../TYLists/items/utils');

var _TYNativeApi = require('../../TYNativeApi');

var _TYNativeApi2 = _interopRequireDefault(_TYNativeApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TYEvent = _TYNativeApi2.default.event;

var cx = _utils.RatioUtils.convertX,
    cy = _utils.RatioUtils.convertY;

var GlobalToast = function (_React$PureComponent) {
  _inherits(GlobalToast, _React$PureComponent);

  function GlobalToast() {
    _classCallCheck(this, GlobalToast);

    return _possibleConstructorReturn(this, (GlobalToast.__proto__ || Object.getPrototypeOf(GlobalToast)).apply(this, arguments));
  }

  _createClass(GlobalToast, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          text = _props.text,
          contentStyle = _props.contentStyle,
          showPosition = _props.showPosition,
          color = _props.color,
          d = _props.d,
          size = _props.size,
          iconfontStyle = _props.iconfontStyle,
          showIcon = _props.showIcon,
          props = _objectWithoutProperties(_props, ['text', 'contentStyle', 'showPosition', 'color', 'd', 'size', 'iconfontStyle', 'showIcon']);

      var toastPropNames = Object.keys(_toast2.default.propTypes);
      var toastProps = (0, _utils2.pick)(props, toastPropNames);
      var iconProps = (0, _utils2.omit)(props, toastPropNames);
      return _react2.default.createElement(
        _toast2.default,
        _extends({}, toastProps, {
          text: text,
          showPosition: showPosition,
          contentStyle: [showIcon && {
            paddingVertical: cy(27),
            width: cx(120),
            height: cx(120),
            backgroundColor: 'rgba(0,0,0,.7)',
            borderRadius: cx(8)
          }, contentStyle],
          __source: {
            fileName: _jsxFileName,
            lineNumber: 79
          }
        }),
        showIcon && _react2.default.createElement(_svg2.default, _extends({}, iconProps, {
          d: d,
          size: size,
          color: color,
          style: [{ marginBottom: cy(8) }, iconfontStyle],
          __source: {
            fileName: _jsxFileName,
            lineNumber: 95
          }
        }))
      );
    }
  }]);

  return GlobalToast;
}(_react2.default.PureComponent);

GlobalToast.propTypes = {
  text: _propTypes2.default.string,

  size: _propTypes2.default.number,

  d: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]),

  iconfontStyle: _reactNative.ViewPropTypes.style,

  contentStyle: _reactNative.ViewPropTypes.style,

  showPosition: _propTypes2.default.string,

  color: _propTypes2.default.string,

  showIcon: _propTypes2.default.bool
};
GlobalToast.defaultProps = {
  text: '成功文案',
  size: cx(40),
  d: _iconfont2.default.correct,
  iconfontStyle: null,
  contentStyle: {},
  showPosition: 'center',
  color: '#fff',
  showIcon: true
};
exports.default = GlobalToast;


GlobalToast.show = function (props) {
  TYEvent.emit('showToast', _extends({ show: true }, props));
};

GlobalToast.hide = function () {
  TYEvent.emit('hideToast', { show: false });
};