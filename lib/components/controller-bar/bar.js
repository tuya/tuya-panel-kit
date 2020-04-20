Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/controller-bar/bar.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('../../utils');

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _barGroup = require('./bar-group');

var _barGroup2 = _interopRequireDefault(_barGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cx = _utils.RatioUtils.convertX;


var styles = _reactNative.StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  wrapper: {
    paddingVertical: 8,
    marginHorizontal: cx(16)
  },
  controllerBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  bottomBorder: {
    borderBottomWidth: _reactNative.StyleSheet.hairlineWidth,
    borderBottomColor: '#E5EAF3'
  }
});

var ControllerBar = function (_React$PureComponent) {
  _inherits(ControllerBar, _React$PureComponent);

  function ControllerBar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ControllerBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ControllerBar.__proto__ || Object.getPrototypeOf(ControllerBar)).call.apply(_ref, [this].concat(args))), _this), _this.renderControllerBar = function () {
      var _this$props = _this.props,
          stretch = _this$props.stretch,
          button = _this$props.button,
          type = _this$props.type,
          size = _this$props.size;

      return _react2.default.createElement(
        _reactNative.View,
        { style: styles.controllerBar, __source: {
            fileName: _jsxFileName,
            lineNumber: 59
          }
        },
        button.map(function (btn, index) {
          return _react2.default.createElement(_button2.default, _extends({
            wrapperStyle: { flex: 1 },
            type: type,
            size: size,
            stretch: stretch
          }, btn, {
            key: 'cupcakeBtn_' + index,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 62
            }
          }));
        })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ControllerBar, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          type = _props.type,
          size = _props.size,
          stretch = _props.stretch,
          button = _props.button,
          style = _props.style,
          backgroundType = _props.backgroundType,
          backgroundColor = _props.backgroundColor,
          hasBottomBorder = _props.hasBottomBorder,
          wrapperStyle = _props.wrapperStyle,
          rest = _objectWithoutProperties(_props, ['type', 'size', 'stretch', 'button', 'style', 'backgroundType', 'backgroundColor', 'hasBottomBorder', 'wrapperStyle']);

      var backgroundStyle = {
        backgroundColor: backgroundColor || '#fff'
      };
      if (backgroundType === 'alpha') {
        backgroundStyle.backgroundColor = 'rgba(255, 255, 255, 0.08)';
      }
      var containerStyle = [styles.container, backgroundStyle, style];
      var cWrapperStyle = [styles.wrapper, hasBottomBorder && styles.bottomBorder, wrapperStyle];
      return _react2.default.createElement(
        _reactNative.View,
        _extends({}, rest, { style: containerStyle, __source: {
            fileName: _jsxFileName,
            lineNumber: 98
          }
        }),
        _react2.default.createElement(
          _reactNative.View,
          { style: cWrapperStyle, __source: {
              fileName: _jsxFileName,
              lineNumber: 99
            }
          },
          this.renderControllerBar()
        )
      );
    }
  }]);

  return ControllerBar;
}(_react2.default.PureComponent);

ControllerBar.Group = _barGroup2.default;
ControllerBar.defaultProps = {
  type: 'normal',
  size: 'normal',
  stretch: true,
  backgroundType: 'pure',
  backgroundColor: '#fff',
  hasBottomBorder: false,
  style: {},
  wrapperStyle: {}
};
ControllerBar.propTypes = {
  type: _propTypes2.default.oneOf(['primary', 'normal']),
  size: _propTypes2.default.oneOfType([_propTypes2.default.oneOf(['large', 'normal', 'small']), _propTypes2.default.number]),
  stretch: _propTypes2.default.bool,
  backgroundType: _propTypes2.default.oneOf(['alpha', 'pure']),
  backgroundColor: _reactNative.ColorPropType,
  hasBottomBorder: _propTypes2.default.bool,
  style: _reactNative.ViewPropTypes.style,
  button: _propTypes2.default.array.isRequired,
  wrapperStyle: _reactNative.ViewPropTypes.style
};
exports.default = ControllerBar;