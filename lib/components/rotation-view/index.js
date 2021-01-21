Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/components/rotation-view/index.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RotationView = function (_Component) {
  _inherits(RotationView, _Component);

  function RotationView(props) {
    _classCallCheck(this, RotationView);

    var _this = _possibleConstructorReturn(this, (RotationView.__proto__ || Object.getPrototypeOf(RotationView)).call(this, props));

    _this.state = {
      active: props.active,
      rotationValue: new _reactNative.Animated.Value(0)
    };

    _this.rotateV = 0;
    _this.startAnimation = _this.startAnimation.bind(_this);
    _this.stopAnimation = _this.stopAnimation.bind(_this);
    return _this;
  }

  _createClass(RotationView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.startAnimation();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var active = nextProps.active;

      if (typeof active !== 'undefined' && active !== this.state.active) {
        this.setState({ active: active }, function () {
          if (active) {
            _this2.startAnimation();
          } else {
            _this2.stopAnimation();
          }
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.stopAnimation();
    }
  }, {
    key: 'startAnimation',
    value: function startAnimation() {
      var _this3 = this;

      if (this.isStateDisable) {
        return;
      }
      this.isStateDisable = true;

      if (!this.state.active) {
        this.isStateDisable = false;
        return;
      }

      this.state.rotationValue.setValue(this.rotateV);
      _reactNative.Animated.timing(this.state.rotationValue, {
        toValue: 1,
        duration: this.props.duration * (1 - this.rotateV),
        easing: _reactNative.Easing.linear,
        useNativeDriver: this.props.useNativeDriver,
        isInteraction: this.props.isInteraction
      }).start(function () {
        _this3.startAnimation();
      });
      this.rotateV = 0;
      this.isStateDisable = false;
    }
  }, {
    key: 'stopAnimation',
    value: function stopAnimation() {
      var _this4 = this;

      this.state.rotationValue.stopAnimation(function (d) {
        _this4.rotateV = d;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactNative.Animated.View,
        {
          accessibilityLabel: this.props.accessibilityLabel,
          style: [styles.container, this.props.style, {
            transform: [{
              rotate: this.state.rotationValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']
              })
            }]
          }],
          __source: {
            fileName: _jsxFileName,
            lineNumber: 117
          }
        },
        this.props.children
      );
    }
  }]);

  return RotationView;
}(_react.Component);

RotationView.propTypes = {
  accessibilityLabel: _propTypes2.default.string,

  style: _reactNative.ViewPropTypes.style,

  children: _propTypes2.default.node,

  active: _propTypes2.default.bool,

  duration: _propTypes2.default.number,

  useNativeDriver: _propTypes2.default.bool,

  isInteraction: _propTypes2.default.bool
};
RotationView.defaultProps = {
  accessibilityLabel: 'RotationView',
  duration: 5000,
  active: true,
  useNativeDriver: false,
  isInteraction: true
};
exports.default = RotationView;


var styles = _reactNative.StyleSheet.create({
  container: {}
});