Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/components/motion/scale-pull-down.js';

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

var _Dimensions$get = _reactNative.Dimensions.get('window'),
    winHeight = _Dimensions$get.height;

var DEFAULT_ANIMATION_CONFIG = {
  duration: 300,
  delay: 0,
  isInteraction: true,
  useNativeDriver: true
};

var ScalePullDown = function (_PureComponent) {
  _inherits(ScalePullDown, _PureComponent);

  function ScalePullDown(props) {
    _classCallCheck(this, ScalePullDown);

    var _this = _possibleConstructorReturn(this, (ScalePullDown.__proto__ || Object.getPrototypeOf(ScalePullDown)).call(this, props));

    _this.startAnimation = function (show) {
      if (show) {
        _this.setState({ show: show, isAnimating: true }, _this.startShowAnimation);
      } else {
        _this.setState({ isAnimating: true }, _this.startHideAnimation);
      }
    };

    _this.startShowAnimation = function () {
      var _this$props = _this.props,
          onShow = _this$props.onShow,
          showDuration = _this$props.showDuration;

      var animationConfig = _extends({}, DEFAULT_ANIMATION_CONFIG, _this.props.animationConfig);
      _reactNative.Animated.parallel([_reactNative.Animated.timing(_this.state.scale, _extends({
        toValue: 1
      }, animationConfig, {
        duration: showDuration,
        easing: _reactNative.Easing.bezier(0, 0, 0.25, 1)
      })), _reactNative.Animated.timing(_this.state.opacity, _extends({
        toValue: 1
      }, animationConfig, {
        duration: showDuration,
        easing: _reactNative.Easing.bezier(0, 0, 0.25, 1)
      }))]).start(function (_ref) {
        var finished = _ref.finished;

        if (finished) {
          _this.setState({ isAnimating: false }, function () {
            typeof onShow === 'function' && onShow();
            _this._viewRef && _this._viewRef._component.measureInWindow(function (positionX, positionY, width, height) {
              _this.setState({ measuredHeight: winHeight - positionY });
            });
          });
        }
      });
    };

    _this.startHideAnimation = function () {
      var _this$props2 = _this.props,
          onHide = _this$props2.onHide,
          hideDuration = _this$props2.hideDuration;

      var animationConfig = _extends({}, DEFAULT_ANIMATION_CONFIG, _this.props.animationConfig);
      _reactNative.Animated.parallel([_reactNative.Animated.timing(_this.state.opacity, _extends({
        toValue: 0
      }, animationConfig, {
        duration: hideDuration,
        easing: _reactNative.Easing.bezier(0.42, 0, 1, 1)
      })), _reactNative.Animated.timing(_this.state.dropHeight, _extends({
        toValue: 1
      }, animationConfig, {
        duration: hideDuration,
        easing: _reactNative.Easing.bezier(0.38, 0, 0.25, 1)
      }))]).start(function (_ref2) {
        var finished = _ref2.finished;

        if (finished) {
          _this.setState({ show: false, isAnimating: false }, function () {
            typeof onHide === 'function' && onHide();
          });
        }
      });
    };

    _this.state = {
      show: props.show,
      scale: new _reactNative.Animated.Value(props.initScale),
      opacity: new _reactNative.Animated.Value(0),
      dropHeight: new _reactNative.Animated.Value(0),
      measuredHeight: winHeight,
      isAnimating: false
    };
    return _this;
  }

  _createClass(ScalePullDown, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.state.show) {
        this.startShowAnimation();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var show = nextProps.show;

      if (!this.state.isAnimating && typeof show !== 'undefined' && show !== this.state.show) {
        this.startAnimation(show);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.state.scale.stopAnimation();
      this.state.opacity.stopAnimation();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          style = _props.style,
          children = _props.children,
          isAlign = _props.isAlign;

      if (!this.state.show || !_react2.default.isValidElement(children)) {
        return null;
      }
      return _react2.default.createElement(
        _reactNative.Animated.View,
        {
          renderToHardwareTextureAndroid: this.state.isAnimating,
          ref: function ref(_ref3) {
            _this2._viewRef = _ref3;
          },
          style: [style, {
            justifyContent: 'center',
            opacity: this.state.opacity,
            transform: [{
              scale: this.state.scale
            }, {
              translateY: this.state.dropHeight.interpolate({
                inputRange: [0, 1],
                outputRange: [0, this.state.measuredHeight || winHeight]
              })
            }]
          }, isAlign && { alignItems: 'center' }],
          __source: {
            fileName: _jsxFileName,
            lineNumber: 144
          }
        },
        children
      );
    }
  }]);

  return ScalePullDown;
}(_react.PureComponent);

ScalePullDown.displayName = 'Motion.ScalePullDown';
ScalePullDown.propTypes = {
  style: _reactNative.ViewPropTypes.style,
  show: _propTypes2.default.bool,
  initScale: _propTypes2.default.number,
  showDuration: _propTypes2.default.number,
  hideDuration: _propTypes2.default.number,
  children: _propTypes2.default.element.isRequired,
  onShow: _propTypes2.default.func,
  isAlign: _propTypes2.default.bool,
  onHide: _propTypes2.default.func,
  animationConfig: _propTypes2.default.shape({
    duration: _propTypes2.default.number,
    delay: _propTypes2.default.number,
    isInteraction: _propTypes2.default.bool,
    useNativeDriver: _propTypes2.default.bool
  })
};
ScalePullDown.defaultProps = {
  style: null,
  show: undefined,
  showDuration: 300,
  hideDuration: 300,
  initScale: 0,
  isAlign: true,
  onShow: function onShow() {},
  onHide: function onHide() {},
  animationConfig: DEFAULT_ANIMATION_CONFIG
};
exports.default = ScalePullDown;