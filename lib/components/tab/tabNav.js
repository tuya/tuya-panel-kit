Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/components/tab/tabNav.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactNative = require('react-native');

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _utils3 = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var convert = _utils3.RatioUtils.convert;

var TabBar = function (_React$Component) {
  _inherits(TabBar, _React$Component);

  function TabBar(props) {
    _classCallCheck(this, TabBar);

    var _this = _possibleConstructorReturn(this, (TabBar.__proto__ || Object.getPrototypeOf(TabBar)).call(this, props));

    _this.onPress = function (index) {
      var onTabClick = _this.props.onTabClick;

      onTabClick && onTabClick(index);
    };

    _this.onTabLayout = function (page, event) {
      var _event$nativeEvent$la = event.nativeEvent.layout,
          x = _event$nativeEvent$la.x,
          width = _event$nativeEvent$la.width,
          height = _event$nativeEvent$la.height;

      _this._tabsMeasurements[page] = { left: x, right: x + width, width: width, height: height };
      _this.updateView({ value: _this.props.scrollValue._value });
    };

    _this.onContainerLayout = function (e) {
      _this._containerLayout = e.nativeEvent.layout;
      _this.setState({ containerWidth: _this._containerLayout.width });
      _this.updateView({ value: _this.props.scrollValue._value });
    };

    _this.onTabContainerLayout = function (e) {
      _this._tabContainerLayout = e.nativeEvent.layout;
      var width = _this._tabContainerLayout.width;

      if (width < _reactNative.Dimensions.get('window').width) {
        width = _reactNative.Dimensions.get('window').width;
      }
      _this.setState({ tabContainerWidth: width });
      _this.updateView({ value: _this.props.scrollValue._value });
    };

    _this.getTabs = function () {
      var _this$props = _this.props,
          panels = _this$props.panels,
          activeKey = _this$props.activeKey,
          tabDefaultColor = _this$props.tabDefaultColor,
          tabTextStyle = _this$props.tabTextStyle,
          tabStyle = _this$props.tabStyle,
          tabActiveTextStyle = _this$props.tabActiveTextStyle,
          page = _this$props.page,
          tabNavAccessibilityLabel = _this$props.tabNavAccessibilityLabel;

      return _react2.default.Children.map(panels, function (child, index) {
        if (!child) return;
        var isActive = activeKey === child.key;

        var tabWidth = child.props.tabWidth ? child.props.tabWidth : _this.state.containerWidth / Math.min(page, panels.length);
        var realTabStyle = [styles.tab, tabStyle, { width: tabWidth }];
        var finalTabTextStyle = [styles.tabText, tabDefaultColor && { color: tabDefaultColor }, tabTextStyle, isActive && styles.activeText, isActive && tabActiveTextStyle];
        return _react2.default.createElement(
          _reactNative.TouchableOpacity,
          {
            activeOpacity: 1,
            onPress: function onPress() {
              return _this.onPress(index);
            },
            key: index,
            accessibilityLabel: tabNavAccessibilityLabel + '_' + index,
            style: tabStyle,
            onLayout: function onLayout(e) {
              return _this.onTabLayout(index, e);
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 168
            }
          },
          _react2.default.createElement(
            _reactNative.View,
            { style: realTabStyle, __source: {
                fileName: _jsxFileName,
                lineNumber: 176
              }
            },
            typeof child.props.tab === 'string' ? _react2.default.createElement(
              _reactNative.Text,
              { numberOfLines: 1, style: finalTabTextStyle, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 178
                }
              },
              child.props.tab
            ) : child.props.tab
          )
        );
      });
    };

    _this.getUnderLine = function () {
      var tabBarUnderlineStyle = _this.props.tabBarUnderlineStyle;

      var tabUnderlineStyle = [{ position: 'absolute', bottom: 0 }, styles.underline, { width: _this.state.underlineWidth }, tabBarUnderlineStyle, { left: _this.state.underlineLeft }];
      return _react2.default.createElement(_reactNative.Animated.View, { style: tabUnderlineStyle, __source: {
          fileName: _jsxFileName,
          lineNumber: 199
        }
      });
    };

    _this.updateTabUnderline = function (page, offset, count) {
      var _this$_tabsMeasuremen = _this._tabsMeasurements[page],
          left = _this$_tabsMeasuremen.left,
          right = _this$_tabsMeasuremen.right;

      if (page === count - 1) {
        _this.state.underlineLeft.setValue(left);
        _this.state.underlineWidth.setValue(right - left);
        return;
      }
      if (page >= 0 && page <= count - 1) {
        var nowLeft = left;
        var nextTabLeft = _this._tabsMeasurements[page + 1].left;
        var newLineLeft = offset * nextTabLeft + (1 - offset) * nowLeft;

        var nowRight = right;
        var nextTabRight = _this._tabsMeasurements[page + 1].right;
        var newLineRight = offset * nextTabRight + (1 - offset) * nowRight;
        _this.state.underlineWidth.setValue(newLineRight - newLineLeft);
        _this.state.underlineLeft.setValue(newLineLeft);
      }
    };

    _this.updateTabPanel = function (page, offset) {
      var containerWidth = _this._containerLayout.width;
      var tabWidth = _this._tabsMeasurements[page].width;
      var nextTabMeasurements = _this._tabsMeasurements[page + 1];
      var nextTabWidth = nextTabMeasurements && nextTabMeasurements.width || 0;
      var tabOffset = _this._tabsMeasurements[page].left;
      var absolutePageOffset = offset * tabWidth;
      var newScrollX = tabOffset + absolutePageOffset;

      newScrollX -= (containerWidth - (1 - offset) * tabWidth - offset * nextTabWidth) / 2;
      newScrollX = newScrollX >= 0 ? newScrollX : 0;
      if (_reactNative.Platform.OS === 'android') {
        _this.scrollView.scrollTo({ x: newScrollX, y: 0, animated: true });
      } else {
        var rightBoundScroll = Math.max(_this._tabContainerLayout.width - _this._containerLayout.width, 0);
        newScrollX = newScrollX > rightBoundScroll ? rightBoundScroll : newScrollX;
        _this.scrollView.scrollTo({ x: newScrollX, y: 0, animated: true });
      }
    };

    _this.measureIsReady = function (page, isLastTab) {
      return _this._tabsMeasurements[page] && (isLastTab || _this._tabsMeasurements[page + 1]) && _this._tabContainerLayout && _this._containerLayout;
    };

    _this.updateView = function (offset) {
      var position = Math.floor(offset.value);
      var pageOffset = offset.value % 1;
      var tabCount = _utils2.default.toArray(_this.props.panels).length;
      var lastTabPosition = tabCount - 1;
      if (tabCount === 0 || offset.value < 0 || offset.value > lastTabPosition) {
        return;
      }
      if (_this.measureIsReady(position, position === lastTabPosition)) {
        _this.updateTabPanel(position, pageOffset);
        _this.updateTabUnderline(position, pageOffset, tabCount);
      }
    };

    _this.state = {
      containerWidth: _reactNative.Dimensions.get('window').width,
      tabContainerWidth: _reactNative.Dimensions.get('window').width,
      underlineLeft: new _reactNative.Animated.Value(0),
      underlineWidth: new _reactNative.Animated.Value(0)
    };
    _this._tabsMeasurements = [];
    return _this;
  }

  _createClass(TabBar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.scrollValue.addListener(this.updateView);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          panels = _props.panels,
          activeKey = _props.activeKey,
          tabBarStyle = _props.tabBarStyle,
          tabsContainerStyle = _props.tabsContainerStyle,
          tabBarBackgroundColor = _props.tabBarBackgroundColor,
          tabBarPosition = _props.tabBarPosition;

      var page = _utils2.default.getActiveIndex(panels, activeKey);
      var borderPosition = tabBarPosition === 'top' ? {
        borderBottomWidth: 1
      } : {
        borderTopWidth: 1
      };
      return _react2.default.createElement(
        _reactNative.View,
        {
          onLayout: this.onContainerLayout,
          style: [styles.container, borderPosition, tabBarStyle],
          __source: {
            fileName: _jsxFileName,
            lineNumber: 288
          }
        },
        _react2.default.createElement(
          _reactNative.ScrollView,
          {
            ref: function ref(scrollView) {
              _this2.scrollView = scrollView;
            },
            horizontal: true,
            showsHorizontalScrollIndicator: false,
            showsVerticalScrollIndicator: false,
            directionalLockEnabled: true,
            bounces: false,
            scrollsToTop: false,
            scrollEnabled: panels.length > page,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 292
            }
          },
          _react2.default.createElement(
            _reactNative.View,
            {
              onLayout: this.onTabContainerLayout,

              style: [styles.tabContainer, tabsContainerStyle, { backgroundColor: tabBarBackgroundColor }],
              __source: {
                fileName: _jsxFileName,
                lineNumber: 304
              }
            },
            this.getTabs(),
            this.getUnderLine()
          )
        )
      );
    }
  }]);

  return TabBar;
}(_react2.default.Component);

TabBar.defaultProps = {
  tabBarBackgroundColor: '#fff',
  page: 5,
  tabDefaultColor: '#333',
  tabTextStyle: {},
  tabStyle: {},
  tabActiveTextStyle: {},
  tabBarUnderlineStyle: {},
  tabBarStyle: {},
  tabsContainerStyle: {},
  tabBarPosition: 'top'
};
TabBar.propTypes = {
  tabNavAccessibilityLabel: _propTypes2.default.string.isRequired,

  onTabClick: _propTypes2.default.func.isRequired,

  scrollValue: _propTypes2.default.object.isRequired,

  tabBarBackgroundColor: _propTypes2.default.string,

  page: _propTypes2.default.number,

  panels: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.array]).isRequired,

  activeKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]).isRequired,

  tabDefaultColor: _propTypes2.default.string,

  tabTextStyle: _reactNative.Text.propTypes.style,

  tabActiveTextStyle: _reactNative.Text.propTypes.style,

  tabStyle: _reactNative.ViewPropTypes.style,

  tabBarUnderlineStyle: _reactNative.ViewPropTypes.style,

  tabBarStyle: _reactNative.ViewPropTypes.style,

  tabsContainerStyle: _reactNative.ViewPropTypes.style,

  tabBarPosition: _propTypes2.default.oneOf(['top', 'bottom'])
};


var styles = _reactNative.StyleSheet.create({
  container: {
    minHeight: convert(43.5),
    borderColor: '#eee'
  },
  tabContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-around'
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: convert(2),
    paddingLeft: convert(2),
    flexDirection: 'row'
  },
  tabText: {
    fontSize: convert(15),
    color: '#000'
  },
  activeText: {
    color: '#108ee9'
  },
  underline: {
    height: convert(2),
    backgroundColor: '#108ee9'
  }
});

exports.default = TabBar;