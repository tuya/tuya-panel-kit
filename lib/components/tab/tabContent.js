Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/components/tab/tabContent.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactNative = require('react-native');

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnimatedScrollView = _reactNative.Animated.createAnimatedComponent(_reactNative.ScrollView);

var TabContent = function (_React$Component) {
  _inherits(TabContent, _React$Component);

  function TabContent(props) {
    _classCallCheck(this, TabContent);

    var _this = _possibleConstructorReturn(this, (TabContent.__proto__ || Object.getPrototypeOf(TabContent)).call(this, props));

    _initialiseProps.call(_this);

    var activeIndex = _utils2.default.getActiveIndex(props.panels, props.activeKey);
    var width = props.containerWidth;
    _this.state = {
      scrollX: new _reactNative.Animated.Value((activeIndex !== -1 ? activeIndex : 0) * width),
      activeIndex: activeIndex
    };
    _this.nextTab = activeIndex;
    _this.distance = 0;
    return _this;
  }

  _createClass(TabContent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.prevTab = this.state.activeIndex;
      this.state.scrollX.addListener(function (_ref) {
        var value = _ref.value;

        var scrollValue = value / _this2.props.containerWidth;
        _this2.props.onScrollValueChange(scrollValue);
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.activeKey !== nextProps.activeKey && nextProps.activeKey !== undefined) {
        this.goToTab(_utils2.default.getActiveIndex(nextProps.panels, nextProps.activeKey), true);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.prevTab = this.state.activeIndex;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          swipeable = _props.swipeable,
          style = _props.style,
          useViewPagerOnAndroid = _props.useViewPagerOnAndroid;

      if (_reactNative.Platform.OS === 'android' && useViewPagerOnAndroid) {
        return _react2.default.createElement(
          _reactNative.ViewPagerAndroid,
          {
            key: '$content',
            keyboardDismissMode: 'on-drag',
            initialPage: this.state.activeIndex,
            scrollEnabled: swipeable,
            onPageScroll: this.onScroll,
            style: [{ flex: 1 }, style],
            onPageSelected: this.onPageSelected,
            ref: function ref(_ref2) {
              _this3.viewPager = _ref2;
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 195
            }
          },
          this.getTabPanes()
        );
      }
      return _react2.default.createElement(
        AnimatedScrollView,
        {
          ref: this.setScrollView,
          key: 'scrollContent',
          horizontal: true,
          onScroll: _reactNative.Animated.event([{ nativeEvent: { contentOffset: { x: this.state.scrollX } } }], {
            useNativeDriver: true
          }),
          automaticallyAdjustContentInsets: false,
          onMomentumScrollEnd: this.onMomentumScrollEnd,
          scrollEventThrottle: 5,
          scrollsToTop: false,
          showsHorizontalScrollIndicator: false,
          scrollEnabled: swipeable,
          alwaysBounceVertical: false,
          directionalLockEnabled: true,
          keyboardDismissMode: 'on-drag',
          pagingEnabled: true,
          contentContainerStyle: style,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 212
          }
        },
        this.getTabPanes()
      );
    }
  }]);

  return TabContent;
}(_react2.default.Component);

TabContent.defaultProps = {
  distanceToChangeTab: 0.3,
  swipeable: true,
  animated: true,
  useViewPagerOnAndroid: true
};
TabContent.propTypes = {
  distanceToChangeTab: _propTypes2.default.number,

  containerWidth: _propTypes2.default.number,

  onScrollValueChange: _propTypes2.default.func,

  onChange: _propTypes2.default.func,

  swipeable: _propTypes2.default.bool,

  activeKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

  panels: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.array]),

  animated: _propTypes2.default.bool,

  useViewPagerOnAndroid: _propTypes2.default.bool,

  style: _reactNative.ViewPropTypes.style
};

var _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this.onScroll = function (e) {
    if (e) {
      if (_reactNative.Platform.OS === 'android') {
        var _e$nativeEvent = e.nativeEvent,
            position = _e$nativeEvent.position,
            offset = _e$nativeEvent.offset;

        requestAnimationFrame(function () {
          _this4.state.scrollX.setValue((position + offset) * _this4.props.containerWidth);
        });
      }
    }
  };

  this.onMomentumScrollEnd = function (e) {
    var offsetX = e.nativeEvent.contentOffset.x;
    var page = _this4.getOffsetIndex(offsetX, _this4.props.containerWidth);
    if (_this4.state.activeIndex !== page) {
      _this4.goToTab(page, false);
    }
  };

  this.onPageSelected = function (e) {
    var index = e.nativeEvent.position;
    _this4.setState({
      activeIndex: index
    }, function () {
      _this4.props.onChange && _this4.props.onChange(index);
    });
    _this4.nextTab = index;
  };

  this.setScrollView = function (scrollView) {
    _this4.scrollView = scrollView;
    _this4.scrollTo(_this4.state.activeIndex);
  };

  this.getTabPanes = function () {
    var _props2 = _this4.props,
        panels = _props2.panels,
        activeKey = _props2.activeKey;

    return _react2.default.Children.map(panels, function (child, index) {
      if (!child) return;
      var isActive = activeKey === child.key;
      var pane = _react2.default.cloneElement(child, {
        isActive: isActive,
        children: child.props.children,
        style: [child.props.style, { width: _this4.props.containerWidth }]
      });
      return _react2.default.createElement(
        _reactNative.View,
        { key: child.key || 'tab_' + index, __source: {
            fileName: _jsxFileName,
            lineNumber: 136
          }
        },
        pane
      );
    });
  };

  this.getOffsetIndex = function (current, width) {
    var threshold = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this4.props.distanceToChangeTab;

    var ratio = Math.abs(current / width);
    var direction = ratio > _this4.state.activeIndex ? 'right' : 'left';
    var index = Math.floor(ratio);
    switch (direction) {
      case 'right':
        return ratio - index > threshold ? index + 1 : index;
      case 'left':
        return 1 - ratio + index > threshold ? index : index + 1;
      default:
        return Math.round(ratio);
    }
  };

  this.goToTab = function (index, force) {
    if (!force && _this4.nextTab === index) return;
    _this4.nextTab = index;
    var _props3 = _this4.props,
        panels = _props3.panels,
        onChange = _props3.onChange;

    if (index >= 0 && index < panels.length) {
      if (!force) {
        onChange && onChange(index);
      }
      _this4.setState({
        activeIndex: index
      }, function () {
        requestAnimationFrame(function () {
          _this4.scrollTo(_this4.state.activeIndex, _this4.props.animated);
        });
      });
    }
  };

  this.scrollTo = function (index) {
    var animated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (_reactNative.Platform.OS === 'android' && _this4.props.useViewPagerOnAndroid) {
      if (_this4.viewPager) {
        if (animated) {
          _this4.viewPager.setPage(index);
        } else {
          _this4.viewPager.setPageWithoutAnimation(index);
        }
        return;
      }
    }
    var containerWidth = _this4.props.containerWidth;

    if (containerWidth) {
      var offset = index * containerWidth;
      if (_this4.scrollView && _this4.scrollView._component && _this4.scrollView._component.scrollTo) {
        _this4.scrollView._component.scrollTo({ x: offset, animated: animated });
      }
    }
  };
};

exports.default = TabContent;