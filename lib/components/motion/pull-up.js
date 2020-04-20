Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/components/motion/pull-up.js';

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

var PullUp = function (_PureComponent) {
  _inherits(PullUp, _PureComponent);

  function PullUp(props) {
    _classCallCheck(this, PullUp);

    var _this = _possibleConstructorReturn(this, (PullUp.__proto__ || Object.getPrototypeOf(PullUp)).call(this, props));

    _this.startAnimation = function (show) {
      if (show) {
        _this.setState({ show: true }, _this.startShowAnimation);
      } else {
        _this.startHideAnimation();
      }
    };

    _this.startShowAnimation = function () {
      _this._isAnimating = true;
      var _this$props = _this.props,
          onShow = _this$props.onShow,
          showDuration = _this$props.showDuration;

      var animationConfig = _extends({}, DEFAULT_ANIMATION_CONFIG, _this.props.animationConfig);
      _reactNative.Animated.timing(_this.state.animatedY, _extends({
        toValue: 1
      }, animationConfig, {
        showEasing: _reactNative.Easing.bezier(0, 0, 0.25, 1),
        duration: showDuration
      })).start(function (_ref) {
        var finished = _ref.finished;

        if (finished) {
          _this._isAnimating = false;
          typeof onShow === 'function' && onShow();
        }
      });
    };

    _this.startHideAnimation = function () {
      _this._isAnimating = true;
      var _this$props2 = _this.props,
          onHide = _this$props2.onHide,
          hideDuration = _this$props2.hideDuration;

      var animationConfig = _extends({}, DEFAULT_ANIMATION_CONFIG, _this.props.animationConfig);
      _reactNative.Animated.timing(_this.state.animatedY, _extends({
        toValue: 0
      }, animationConfig, {
        hideEasing: _reactNative.Easing.bezier(0.38, 0, 0.25, 1),
        duration: hideDuration
      })).start(function (_ref2) {
        var finished = _ref2.finished;

        if (finished) {
          _this.setState({ show: false }, function () {
            _this._isAnimating = false;
            typeof onHide === 'function' && onHide();
          });
        }
      });
    };

    _this._isAnimating = false;
    _this.state = {
      show: props.show,
      animatedY: new _reactNative.Animated.Value(0),
      measuredHeight: props.dropHeight
    };
    return _this;
  }

  _createClass(PullUp, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.state.show && typeof this.state.measuredHeight === 'number') {
        this.startShowAnimation();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (typeof this.state.measuredHeight !== 'number') {
        return;
      }
      var show = nextProps.show;

      if (!this._isAnimating && typeof show !== 'undefined' && show !== this.state.show) {
        this.startAnimation(show);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.state.animatedY.stopAnimation();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          style = _props.style,
          children = _props.children;

      if (!this.state.show || !_react2.default.isValidElement(children)) {
        return null;
      }
      return _react2.default.createElement(
        _reactNative.Animated.View,
        {
          style: [styles.container, style, {
            transform: [{
              translateY: this.state.animatedY.interpolate({
                inputRange: [0, 1],
                outputRange: [this.state.measuredHeight || winHeight, 0]
              })
            }]
          }],
          __source: {
            fileName: _jsxFileName,
            lineNumber: 125
          }
        },
        _react2.default.cloneElement(children, {
          onLayout: function onLayout(_ref3) {
            var layout = _ref3.nativeEvent.layout;

            if (layout && typeof _this2.state.measuredHeight === 'undefined' && typeof layout.height === 'number') {
              _this2.setState({ measuredHeight: layout.height }, function () {
                _this2.startAnimation(_this2.state.show);
              });
            }
          }
        })
      );
    }
  }]);

  return PullUp;
}(_react.PureComponent);

PullUp.displayName = 'Motion.PullUp';
PullUp.propTypes = {
  style: _reactNative.ViewPropTypes.style,
  show: _propTypes2.default.bool,
  dropHeight: _propTypes2.default.number,
  children: _propTypes2.default.element.isRequired,
  showDuration: _propTypes2.default.number,
  hideDuration: _propTypes2.default.number,
  onShow: _propTypes2.default.func,
  onHide: _propTypes2.default.func,
  animationConfig: _propTypes2.default.shape({
    duration: _propTypes2.default.number,
    easing: _propTypes2.default.func,
    delay: _propTypes2.default.number,
    isInteraction: _propTypes2.default.bool,
    useNativeDriver: _propTypes2.default.bool
  })
};
PullUp.defaultProps = {
  style: null,
  show: undefined,
  dropHeight: undefined,
  showDuration: 300,
  hideDuration: 300,
  onShow: function onShow() {},
  onHide: function onHide() {},
  animationConfig: DEFAULT_ANIMATION_CONFIG
};


var styles = _reactNative.StyleSheet.create({
  container: {}
});

exports.default = PullUp;