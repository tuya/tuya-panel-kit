Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/switch-button/switch-button.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactNative = require('react-native');

var _reactNativeSvg = require('react-native-svg');

var _linearGradient = require('../gradient/linear-gradient');

var _linearGradient2 = _interopRequireDefault(_linearGradient);

var _TYText = require('../TYText');

var _TYText2 = _interopRequireDefault(_TYText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_SIZE = {
  width: 51,
  height: 28,
  activeSize: 24,
  margin: 2
};

var DEFAULT_GRADIENT_SIZE = {
  width: 57,
  height: 28,
  activeSize: 24,
  margin: 2
};

var EXTRA_WIDTH = 2;
var EXTRA_HEIGHT = 3;

var SwitchButton = function (_React$PureComponent) {
  _inherits(SwitchButton, _React$PureComponent);

  function SwitchButton(props) {
    _classCallCheck(this, SwitchButton);

    var _this = _possibleConstructorReturn(this, (SwitchButton.__proto__ || Object.getPrototypeOf(SwitchButton)).call(this, props));

    _initialiseProps.call(_this);

    _this.value = 'value' in props ? props.value : props.defaultValue;
    var left = _this.calcLeft(_this.value);
    _this.state = {
      thumbLeft: new _reactNative.Animated.Value(left)
    };
    return _this;
  }

  _createClass(SwitchButton, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!('value' in nextProps) || this.value === nextProps.value) return;
      this.valueChange(nextProps.value);
    }
  }, {
    key: 'renderBackground',
    value: function renderBackground() {
      var _this2 = this;

      var _props = this.props,
          tintColor = _props.tintColor,
          onTintColor = _props.onTintColor;
      var _CGSize = this.CGSize,
          width = _CGSize.width,
          height = _CGSize.height;

      var backgroundColor = this.calcColor(this.value);
      var borderColor = this.calcColor(this.value, 'border');
      var wrapperStyle = {
        width: width,
        height: height,
        borderRadius: 15.5 / 28 * height,
        justifyContent: 'center'
      };
      var color = this.value ? onTintColor : tintColor;
      if (typeof color === 'string') {
        return _react2.default.createElement(_reactNative.View, {
          style: [wrapperStyle, {
            backgroundColor: backgroundColor,
            borderColor: borderColor
          }],
          ref: function ref(_ref) {
            _this2._ref = _ref;
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 150
          }
        });
      } else if (typeof color === 'object') {
        return _react2.default.createElement(
          _reactNative.View,
          {
            style: [wrapperStyle, {
              backgroundColor: 'transparent',
              borderColor: 'transparent'
            }],
            ref: function ref(_ref2) {
              _this2._ref = _ref2;
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 165
            }
          },
          _react2.default.createElement(
            _linearGradient2.default,
            { style: { width: width, height: height }, stops: color, x1: '0%', y1: '0%', x2: '100%', y2: '0%', __source: {
                fileName: _jsxFileName,
                lineNumber: 177
              }
            },
            _react2.default.createElement(_reactNativeSvg.Rect, { x: '0', y: '0', width: '100%', height: '100%', rx: height / 2, __source: {
                fileName: _jsxFileName,
                lineNumber: 178
              }
            })
          )
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _CGSize2 = this.CGSize,
          width = _CGSize2.width,
          height = _CGSize2.height,
          activeSize = _CGSize2.activeSize;
      var _props2 = this.props,
          accessibilityLabel = _props2.accessibilityLabel,
          style = _props2.style,
          disabled = _props2.disabled,
          onText = _props2.onText,
          offText = _props2.offText,
          onTextStyle = _props2.onTextStyle,
          offTextStyle = _props2.offTextStyle;

      var thumbColor = this.calcColor(this.value, 'thumb');
      var containerStyle = [style, disabled && { opacity: 0.8 }];
      var contentStyle = {
        width: width + EXTRA_WIDTH,
        height: Math.max(activeSize, height) + EXTRA_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
      };
      var thumbStyle = [{
        width: activeSize,
        height: activeSize,
        borderRadius: activeSize / 2,
        position: 'absolute',
        transform: [{ translateX: this.state.thumbLeft }],
        alignSelf: 'flex-start',
        backgroundColor: thumbColor,
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 2
      }, this.props.thumbStyle];
      var textOn = onText.length > 3 ? onText.substr(0, 2) + '...' : onText;
      var textOff = offText.length > 3 ? offText.substr(0, 2) + '...' : offText;
      return _react2.default.createElement(
        _reactNative.View,
        { style: containerStyle, needsOffscreenAlphaCompositing: true, __source: {
            fileName: _jsxFileName,
            lineNumber: 228
          }
        },
        _react2.default.createElement(
          _reactNative.TouchableOpacity,
          {
            style: contentStyle,
            accessibilityLabel: accessibilityLabel,
            activeOpacity: 1,
            onPress: this.onSwitchChange,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 229
            }
          },
          this.renderBackground(),
          this.isGradient && !!onText && _react2.default.createElement(_TYText2.default, {
            text: textOn,
            style: [{
              fontSize: 10,
              color: '#FFF',
              position: 'absolute',
              left: 6,
              fontWeight: '500',
              opacity: this.value ? 1 : 0
            }, onTextStyle],
            __source: {
              fileName: _jsxFileName,
              lineNumber: 238
            }
          }),
          this.isGradient && !!offText && _react2.default.createElement(_TYText2.default, {
            text: textOff,
            style: [{
              fontSize: 10,
              color: '#999',
              position: 'absolute',
              right: 6,
              fontWeight: '500',
              opacity: this.value ? 0 : 1
            }, offTextStyle],
            __source: {
              fileName: _jsxFileName,
              lineNumber: 254
            }
          }),
          _react2.default.createElement(_reactNative.Animated.View, {
            style: thumbStyle,
            ref: function ref(_ref3) {
              _this3.thumb = _ref3;
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 269
            }
          })
        )
      );
    }
  }, {
    key: 'CGSize',
    get: function get() {
      this.isGradient = this.props.onTintColor && typeof this.props.onTintColor === 'object';
      if (this.isGradient) {
        return _extends({}, DEFAULT_GRADIENT_SIZE, this.props.size);
      }

      return _extends({}, DEFAULT_SIZE, this.props.size);
    }
  }]);

  return SwitchButton;
}(_react2.default.PureComponent);

SwitchButton.propTypes = {
  accessibilityLabel: _propTypes2.default.string,
  style: _reactNative.ViewPropTypes.style,
  disabled: _propTypes2.default.bool,
  value: _propTypes2.default.bool,
  defaultValue: _propTypes2.default.bool,
  size: _propTypes2.default.object,
  onValueChange: _propTypes2.default.func,
  tintColor: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  onTintColor: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  thumbTintColor: _propTypes2.default.string,
  onThumbTintColor: _propTypes2.default.string,
  borderColor: _propTypes2.default.string,
  thumbStyle: _reactNative.ViewPropTypes.style,
  useNativeDriver: _propTypes2.default.bool,
  onText: _propTypes2.default.string,
  offText: _propTypes2.default.string,
  onTextStyle: _reactNative.ViewPropTypes.style,
  offTextStyle: _reactNative.ViewPropTypes.style
};
SwitchButton.defaultProps = {
  accessibilityLabel: 'SwitchButton',
  defaultValue: true,
  disabled: false,
  onTintColor: '#44DB5E',
  thumbTintColor: '#fff',
  tintColor: '#e5e5e5',
  borderColor: '#e5e5e5',
  thumbStyle: null,
  useNativeDriver: true,
  onText: 'ON',
  offText: 'OFF',
  onTextStyle: null,
  offTextStyle: null
};

var _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this.onSwitchChange = function () {
    var _props3 = _this4.props,
        disabled = _props3.disabled,
        onValueChange = _props3.onValueChange;

    if (disabled) return;
    var newValue = !_this4.value;
    if (!('value' in _this4.props)) {
      _this4.valueChange(newValue);
    }
    onValueChange && onValueChange(newValue);
  };

  this.calcLeft = function (value) {
    var _CGSize3 = _this4.CGSize,
        width = _CGSize3.width,
        activeSize = _CGSize3.activeSize,
        margin = _CGSize3.margin;

    var left = value ? width - (activeSize + margin) : margin;
    return left + EXTRA_WIDTH / 2;
  };

  this.calcColor = function (value, type) {
    var _props4 = _this4.props,
        onThumbTintColor = _props4.onThumbTintColor,
        thumbTintColor = _props4.thumbTintColor,
        onTintColor = _props4.onTintColor,
        tintColor = _props4.tintColor,
        borderColor = _props4.borderColor;

    if (type === 'thumb') {
      var activeColor = onThumbTintColor || thumbTintColor;
      return value ? activeColor : thumbTintColor;
    }
    if (type === 'border') {
      return value ? onTintColor : borderColor;
    }
    return value ? onTintColor : tintColor;
  };

  this.valueChange = function (value) {
    var useNativeDriver = _this4.props.useNativeDriver;

    var color = _this4.calcColor(value);
    var borderColor = _this4.calcColor(value, 'border');
    var thumbColor = _this4.calcColor(value, 'thumb');
    _this4._ref.setNativeProps({
      style: { backgroundColor: color, borderColor: borderColor }
    });
    _this4.thumb.setNativeProps({
      style: { backgroundColor: thumbColor }
    });
    _this4.value = value;
    var left = _this4.calcLeft(value);
    _this4.state.thumbLeft.stopAnimation();
    _reactNative.Animated.spring(_this4.state.thumbLeft, {
      toValue: left,
      duration: 200,
      useNativeDriver: useNativeDriver
    }).start();
  };
};

exports.default = SwitchButton;