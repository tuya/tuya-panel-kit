Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/components/tab/tabs.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactNative = require('react-native');

var _tabContent = require('./tabContent');

var _tabContent2 = _interopRequireDefault(_tabContent);

var _tabNav = require('./tabNav');

var _tabNav2 = _interopRequireDefault(_tabNav);

var _tabPane = require('./tabPane');

var _tabPane2 = _interopRequireDefault(_tabPane);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tabs = function (_React$Component) {
  _inherits(Tabs, _React$Component);

  function Tabs(props) {
    _classCallCheck(this, Tabs);

    var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));

    _initialiseProps.call(_this);

    var activeKey = void 0;
    if ('activeKey' in props) {
      activeKey = props.activeKey;
    } else if ('defaultActiveKey' in props) {
      activeKey = props.defaultActiveKey;
    }
    var containerWidth = _reactNative.Dimensions.get('window').width;
    var activeIndex = _utils2.default.getActiveIndex(props.children, activeKey);
    _this.state = {
      activeKey: activeKey,
      scrollValue: new _reactNative.Animated.Value(activeIndex > 0 ? activeIndex : 0),
      containerWidth: containerWidth
    };
    return _this;
  }

  _createClass(Tabs, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('activeKey' in nextProps) {
        this.setState({
          activeKey: nextProps.activeKey
        });
      } else if (!_utils2.default.activeKeyIsValid(nextProps.children, this.state.activeKey)) {
        this.setState({
          activeKey: _utils2.default.getDefaultActiveKey(nextProps.children)
        });
      }
    }
  }, {
    key: 'renderTabContent',
    value: function renderTabContent() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          animated = _props.animated,
          swipeable = _props.swipeable,
          useViewPagerOnAndroid = _props.useViewPagerOnAndroid,
          tabContentStyle = _props.tabContentStyle;

      return _react2.default.createElement(_tabContent2.default, {
        ref: function ref(content) {
          _this2.tabContent = content;
        },
        key: 'tabContent',
        panels: children,
        activeKey: this.state.activeKey,
        onScrollValueChange: this.onScrollValueChange,
        onChange: this.setActiveTab,
        containerWidth: this.state.containerWidth,
        animated: animated,
        swipeable: swipeable,
        scrollValue: this.state.scrollValue,
        useViewPagerOnAndroid: useViewPagerOnAndroid,
        style: tabContentStyle,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 172
        }
      });
    }
  }, {
    key: 'renderTabBar',
    value: function renderTabBar() {
      var _this3 = this;

      var _props2 = this.props,
          children = _props2.children,
          tabDefaultColor = _props2.tabDefaultColor,
          tabBarUnderlineStyle = _props2.tabBarUnderlineStyle,
          tabBarBackgroundColor = _props2.tabBarBackgroundColor,
          tabsContainerStyle = _props2.tabsContainerStyle,
          tabTextStyle = _props2.tabTextStyle,
          tabStyle = _props2.tabStyle,
          tabBarStyle = _props2.tabBarStyle,
          tabActiveTextStyle = _props2.tabActiveTextStyle,
          tabBarPosition = _props2.tabBarPosition,
          tabNavAccessibilityLabel = _props2.tabNavAccessibilityLabel;

      return _react2.default.createElement(_tabNav2.default, {
        ref: function ref(bar) {
          _this3.tabBar = bar;
        },
        key: 'tabBar',
        onTabClick: this.setActiveTab,
        panels: children,
        activeKey: this.state.activeKey,
        scrollValue: this.state.scrollValue,
        tabDefaultColor: tabDefaultColor,
        tabTextStyle: tabTextStyle,
        tabBarUnderlineStyle: tabBarUnderlineStyle,
        tabBarBackgroundColor: tabBarBackgroundColor,
        tabsContainerStyle: tabsContainerStyle,
        tabStyle: tabStyle,
        tabBarStyle: tabBarStyle,
        tabActiveTextStyle: tabActiveTextStyle,
        tabBarPosition: tabBarPosition,
        tabNavAccessibilityLabel: tabNavAccessibilityLabel,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 206
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var tabBarPosition = this.props.tabBarPosition;

      var content = [this.renderTabBar(), this.renderTabContent()];
      return _react2.default.createElement(
        _reactNative.View,
        { onLayout: this.onLayout, style: [styles.container, this.props.style], __source: {
            fileName: _jsxFileName,
            lineNumber: 233
          }
        },
        tabBarPosition === 'top' ? content : content.reverse()
      );
    }
  }]);

  return Tabs;
}(_react2.default.Component);

Tabs.TabPane = _tabPane2.default;
Tabs.defaultProps = {
  swipeable: true,
  animated: true,
  onChange: function onChange() {},
  tabDefaultColor: '#333',
  tabBarPosition: 'top',
  tabNavAccessibilityLabel: 'TabNav',
  useViewPagerOnAndroid: true
};
Tabs.propTypes = {
  swipeable: _propTypes2.default.bool,

  animated: _propTypes2.default.bool,

  activeKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

  defaultActiveKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

  onChange: _propTypes2.default.func,

  children: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.array]),

  tabContentStyle: _reactNative.ViewPropTypes.style,

  tabDefaultColor: _propTypes2.default.string,

  tabBarBackgroundColor: _propTypes2.default.string,

  tabBarUnderlineStyle: _reactNative.ViewPropTypes.style,

  tabBarStyle: _reactNative.ViewPropTypes.style,

  tabTextStyle: _reactNative.Text.propTypes.style,

  tabActiveTextStyle: _reactNative.Text.propTypes.style,

  tabsContainerStyle: _reactNative.ViewPropTypes.style,

  tabStyle: _reactNative.ViewPropTypes.style,

  style: _reactNative.ViewPropTypes.style,

  tabBarPosition: _propTypes2.default.oneOf(['top', 'bottom']),

  tabNavAccessibilityLabel: _propTypes2.default.string,

  useViewPagerOnAndroid: _propTypes2.default.bool
};

var _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this.onScrollValueChange = function (scrollValue) {
    _this4.state.scrollValue.setValue(scrollValue);
  };

  this.onLayout = function (e) {
    var width = e.nativeEvent.layout.width;
    var containerWidth = _this4.state.containerWidth;

    if (Math.round(width) !== Math.round(_this4.state.containerWidth)) {
      containerWidth = width;
    }
    _this4.setState({
      containerWidth: containerWidth
    }, function () {
      var index = _utils2.default.getActiveIndex(_this4.props.children, _this4.state.activeKey);

      requestAnimationFrame(function () {
        _this4.tabContent && _this4.tabContent.scrollTo(index, false);
      });
    });
  };

  this.setActiveTab = function (activeIndex) {
    var activeKey = _utils2.default.toArray(_this4.props.children)[activeIndex].key;
    if (_this4.state.activeKey !== activeKey) {
      if (!('activeKey' in _this4.props)) {
        _this4.setState({
          activeKey: activeKey
        });
      }
      _this4.props.onChange && _this4.props.onChange(activeKey);
    }
  };
};

var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  }
});

exports.default = Tabs;