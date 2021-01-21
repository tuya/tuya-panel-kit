Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/components/collapsible/index.js';

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

var styles = _reactNative.StyleSheet.create({
  wrapperStyle: {
    overflow: 'hidden'
  }
});

var EASING_PREFIX = ['EaseInOut', 'EaseIn', 'EaseOut'];

var Collapsible = function (_React$PureComponent) {
  _inherits(Collapsible, _React$PureComponent);

  function Collapsible(props) {
    _classCallCheck(this, Collapsible);

    var _this = _possibleConstructorReturn(this, (Collapsible.__proto__ || Object.getPrototypeOf(Collapsible)).call(this, props));

    _this.setHeight = function (prevProps) {
      var _this$props = _this.props,
          collapsed = _this$props.collapsed,
          collapsedHeight = _this$props.collapsedHeight;

      if (prevProps.collapsed !== collapsed) {
        _this.toggleCollapsed(collapsed);
      } else if (collapsed && prevProps.collapsedHeight !== collapsedHeight) {
        _this.state.height.setValue(collapsedHeight);
      }
    };

    _this.setRef = function (ref) {
      _this.content = ref;
    };

    _this.getContentStyle = function () {
      var _this$state = _this.state,
          measuring = _this$state.measuring,
          height = _this$state.height,
          contentHeight = _this$state.contentHeight;
      var align = _this.props.align;

      if (measuring) {
        return { position: 'absolute', opacity: 0 };
      } else if (align !== 'top') {
        return {
          transform: [{
            translateY: height.interpolate({
              inputRange: [0, contentHeight],
              outputRange: [align === 'center' ? contentHeight / -2 : -contentHeight, 0]
            })
          }]
        };
      }
      return {};
    };

    _this.measureContent = function (callback) {
      _this.setState({ measuring: true }, function () {
        requestAnimationFrame(function () {
          if (!_this.content) {
            _this.setState({ measuring: false }, function () {
              return callback(_this.props.collapsedHeight);
            });
          } else {
            _this.content.getNode().measure(function (x, y, width, height) {
              _this.setState({
                measuring: false,
                measured: true,
                contentHeight: height
              }, function () {
                return callback(height);
              });
            });
          }
        });
      });
    };

    _this.toggleCollapsed = function (collapsed) {
      if (collapsed) {
        _this.transitionToHeight(_this.props.collapsedHeight);
      } else if (!_this.content) {
        if (_this.state.measured) {
          _this.transitionToHeight(_this.state.contentHeight);
        }
      } else {
        _this.measureContent(function (contentHeight) {
          _this.transitionToHeight(contentHeight);
        });
      }
    };

    _this.transitionToHeight = function (height) {
      var _this$props2 = _this.props,
          duration = _this$props2.duration,
          easing = _this$props2.easing;

      var finalEasing = void 0;
      var matching = false;
      if (typeof easing === 'string') {
        for (var i = 0; i < EASING_PREFIX.length; i++) {
          var prefix = EASING_PREFIX[i];
          if (easing.substr(0, prefix.length) === prefix) {
            var easingS = easing.substr(prefix.length, 1).toLowerCase() + easing.substr(prefix.length + 1);
            prefix = prefix.substr(4, 1).toLowerCase() + prefix.substr(5);
            finalEasing = _reactNative.Easing[prefix](_reactNative.Easing[easingS || 'ease']);
            matching = true;
            break;
          }
        }
        if (!matching) {
          finalEasing = _reactNative.Easing[easing];
        }
        if (!finalEasing) {
          throw new Error('Invalid easing type "' + _this.props.easing + '"');
        }
        if (_this.animation) {
          _this.animation.stop();
        }
        _this.setState({ animating: true });
        _this.animation = _reactNative.Animated.timing(_this.state.height, {
          toValue: height,
          duration: duration,
          easing: finalEasing,
          useNativeDriver: false
        });
        _this.animation.start(function () {
          if (_this.unmounted) return;
          _this.setState({ animating: false }, function () {
            if (_this.unmounted) return;
            _this.props.onChange();
          });
        });
      }
    };

    _this.handleLayoutChange = function (e) {
      var contentHeight = e.nativeEvent.layout.height;
      if (_this.state.animating || _this.props.collapsed || _this.state.measuring || _this.state.contentHeight === contentHeight) {
        return;
      }

      _this.state.height.setValue(contentHeight);

      _this.setState({ contentHeight: contentHeight });
    };

    _this.state = {
      height: new _reactNative.Animated.Value(props.collapsedHeight),
      contentHeight: 0,
      animating: false,
      measured: false,
      measuring: false
    };
    return _this;
  }

  _createClass(Collapsible, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      if (prevProps.collapsed !== this.props.collapsed) {
        this.setState({ measured: false }, function () {
          return _this2.setHeight(prevProps);
        });
      } else {
        this.setHeight(prevProps);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unmounted = true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          height = _state.height,
          measuring = _state.measuring,
          measured = _state.measured,
          animating = _state.animating;
      var _props = this.props,
          style = _props.style,
          collapsed = _props.collapsed,
          children = _props.children;

      var hasKnownHeight = !measuring && (measured || collapsed);
      var wrapperStyle = [styles.wrapperStyle, { height: height }];
      var preContentStyle = this.getContentStyle();
      var contentStyle = [preContentStyle, style];
      return _react2.default.createElement(
        _reactNative.Animated.View,
        {
          style: hasKnownHeight ? wrapperStyle : null,
          pointerEvents: collapsed ? 'none' : 'auto',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 218
          }
        },
        _react2.default.createElement(
          _reactNative.Animated.View,
          {
            style: contentStyle,
            ref: this.setRef,
            onLayout: animating ? undefined : this.handleLayoutChange,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 222
            }
          },
          children
        )
      );
    }
  }]);

  return Collapsible;
}(_react2.default.PureComponent);

Collapsible.propTypes = {
  align: _propTypes2.default.oneOf(['top', 'center', 'bottom']),

  collapsed: _propTypes2.default.bool,

  collapsedHeight: _propTypes2.default.number,

  duration: _propTypes2.default.number,

  easing: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),

  style: _reactNative.ViewPropTypes.style,

  onChange: _propTypes2.default.func,

  children: _propTypes2.default.node
};
Collapsible.defaultProps = {
  align: 'top',
  collapsed: true,
  collapsedHeight: 0,
  duration: 300,
  easing: 'EaseOutCubic',
  onChange: function onChange() {},
  children: null,
  style: null
};
exports.default = Collapsible;