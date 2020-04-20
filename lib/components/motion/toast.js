Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/components/motion/toast.js';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactNative = require('react-native');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_ANIMATION_CONFIG = {
  duration: 250,
  delay: 0,
  isInteraction: true,
  useNativeDriver: true
};

var MotionToast = function (_PureComponent) {
  _inherits(MotionToast, _PureComponent);

  function MotionToast(props) {
    _classCallCheck(this, MotionToast);

    var _this = _possibleConstructorReturn(this, (MotionToast.__proto__ || Object.getPrototypeOf(MotionToast)).call(this, props));

    _this.startShowAnimation = function () {
      var showDuration = _this.props.showDuration;
      var _this$state = _this.state,
          fadeValue = _this$state.fadeValue,
          scale = _this$state.scale;

      var animationConfig = _extends({}, DEFAULT_ANIMATION_CONFIG, _this.props.animationConfig);
      _reactNative.Animated.parallel([_reactNative.Animated.timing(fadeValue, _extends({
        toValue: 1
      }, animationConfig, {
        duration: showDuration,
        easing: _reactNative.Easing.bezier(0, 0, 0.25, 1)
      })), _reactNative.Animated.timing(scale, _extends({
        toValue: 1
      }, animationConfig, {
        duration: showDuration,
        easing: _reactNative.Easing.bezier(0, 0, 0.25, 1)
      }))]).start(function () {
        return _this.timer();
      });
    };

    _this.startHideAnimation = function () {
      var _this$props = _this.props,
          initScale = _this$props.initScale,
          hideDuration = _this$props.hideDuration;
      var _this$state2 = _this.state,
          fadeValue = _this$state2.fadeValue,
          scale = _this$state2.scale;

      var animationConfig = _extends({}, DEFAULT_ANIMATION_CONFIG, _this.props.animationConfig);
      _reactNative.Animated.parallel([_reactNative.Animated.timing(fadeValue, _extends({
        toValue: 0
      }, animationConfig, {
        duration: hideDuration,
        easing: _reactNative.Easing.bezier(0.42, 0, 1, 1)
      })), _reactNative.Animated.timing(scale, _extends({
        toValue: initScale
      }, animationConfig, {
        duration: hideDuration,
        easing: _reactNative.Easing.bezier(0.42, 0, 1, 1)
      }))]).start();
    };

    _this.timer = function () {
      clearTimeout(_this._timer);
      _this._timer = setTimeout(function () {
        return _this.props.onFinish();
      }, 2000);
    };

    _this._timer = null;
    _this.state = {
      fadeValue: new _reactNative.Animated.Value(0),
      scale: new _reactNative.Animated.Value(props.initScale),
      show: props.show
    };
    return _this;
  }

  _createClass(MotionToast, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var show = nextProps.show;

      if (typeof show !== 'undefined' && show !== this.state.show) {
        this.setState({ show: show });
        if (show) {
          this.startShowAnimation();
        } else {
          this.startHideAnimation();
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._timer && clearTimeout(this._timer);
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          scale = _state.scale,
          fadeValue = _state.fadeValue;
      var _props = this.props,
          children = _props.children,
          style = _props.style;

      if (!_react2.default.isValidElement(children)) {
        return null;
      }
      return _react2.default.createElement(
        _reactNative.Animated.View,
        { style: [styles.center, style, { opacity: fadeValue, transform: [{ scale: scale }] }], __source: {
            fileName: _jsxFileName,
            lineNumber: 114
          }
        },
        children
      );
    }
  }]);

  return MotionToast;
}(_react.PureComponent);

MotionToast.propTypes = {
  style: _reactNative.ViewPropTypes.style,
  initScale: _propTypes2.default.number,
  show: _propTypes2.default.bool.isRequired,
  onFinish: _propTypes2.default.func.isRequired,
  children: _propTypes2.default.element.isRequired,
  showDuration: _propTypes2.default.number,
  hideDuration: _propTypes2.default.number,
  animationConfig: _propTypes2.default.shape({
    duration: _propTypes2.default.number,
    delay: _propTypes2.default.number,
    isInteraction: _propTypes2.default.bool,
    useNativeDriver: _propTypes2.default.bool
  })
};
MotionToast.defaultProps = {
  style: null,
  initScale: 0.5,
  showDuration: 250,
  hideDuration: 250,
  animationConfig: DEFAULT_ANIMATION_CONFIG
};


var styles = _reactNative.StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

exports.default = MotionToast;