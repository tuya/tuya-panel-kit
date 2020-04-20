Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/components/tabbar/default.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactNative = require('react-native');

var _utils = require('../../utils');

var _TYText = require('../TYText');

var _TYText2 = _interopRequireDefault(_TYText);

var _tabHoc = require('./tabHoc');

var _tabHoc2 = _interopRequireDefault(_tabHoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var convertX = _utils.RatioUtils.convertX;

var WIDTH = _reactNative.Dimensions.get('window').width;

var styles = _reactNative.StyleSheet.create({
  underlineStyle: {
    height: 2,
    backgroundColor: '#108ee9',
    width: convertX(80),
    position: 'absolute',
    bottom: 0
  },
  tabContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  tabStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 43,
    backgroundColor: '#fff',
    width: convertX(80)
  },
  tabTextStyle: {
    color: '#333',
    fontSize: 16
  },
  tabTextActiveStyle: {
    color: '#108ee9'
  },
  tabWrapperStyle: {
    backgroundColor: '#fff'
  }
});

var TabBar = function (_React$PureComponent) {
  _inherits(TabBar, _React$PureComponent);

  function TabBar(props) {
    _classCallCheck(this, TabBar);

    var _this = _possibleConstructorReturn(this, (TabBar.__proto__ || Object.getPrototypeOf(TabBar)).call(this, props));

    _this.onTabClick = function (key, callback) {
      var onChange = _this.props.onChange;

      if (!('activeKey' in _this.props)) {
        _this.setState({ activeKey: key }, function () {
          _this.updateView(false);
        });
      }
      onChange && onChange(key);
      callback && callback(key);
    };

    _this.getTabs = function () {
      var _this$props = _this.props,
          tabs = _this$props.tabs,
          tabStyle = _this$props.tabStyle,
          tabActiveStyle = _this$props.tabActiveStyle,
          tabTextStyle = _this$props.tabTextStyle,
          tabActiveTextStyle = _this$props.tabActiveTextStyle;
      var activeKey = _this.state.activeKey;

      return tabs.map(function (tab, index) {
        var tabKey = typeof tab.key === 'undefined' ? 'tab_' + index : tab.key;
        var isActive = tabKey === activeKey;
        var style = [styles.tabStyle, tabStyle, tab.style && tab.style, isActive && tabActiveStyle, isActive && tab.activeStyle && tab.activeStyle];
        var textStyle = [styles.tabTextStyle, tabTextStyle, tab.textStyle && tab.textStyle, isActive && styles.tabTextActiveStyle, isActive && tabActiveTextStyle, isActive && tab.activeTextStyle && tab.activeTextStyle];
        var title = tab.title;

        return _react2.default.createElement(
          _reactNative.TouchableOpacity,
          {
            key: tabKey,
            style: style,
            onPress: function onPress() {
              return _this.onTabClick(tabKey, tab.onPress);
            },
            onLayout: function onLayout(e) {
              return _this.tabLayout(index, e);
            },
            accessibilityLabel: tab.accessibilityLabel,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 137
            }
          },
          typeof title !== 'string' ? title : _react2.default.createElement(
            _TYText2.default,
            { style: textStyle, accessibilityLabel: tab.textAccessibilityLabel, __source: {
                fileName: _jsxFileName,
                lineNumber: 147
              }
            },
            title
          )
        );
      });
    };

    _this.getUnderline = function () {
      var underlineStyle = _this.props.underlineStyle;
      var _this$state = _this.state,
          underlineLeft = _this$state.underlineLeft,
          underlineWidth = _this$state.underlineWidth;

      var style = [styles.underlineStyle, { width: underlineWidth }, underlineStyle, { left: underlineLeft }];
      return _react2.default.createElement(_reactNative.Animated.View, { style: style, __source: {
          fileName: _jsxFileName,
          lineNumber: 164
        }
      });
    };

    _this.setRef = function (ref) {
      _this.scrollView = ref;
    };

    _this.getActiveIndexByKey = function (activeKey) {
      var tabs = _this.props.tabs;

      var activeIndex = 0;
      for (var i = 0; i < tabs.length; i++) {
        var tabKey = typeof tabs[i].key !== 'undefined' ? tabs[i].key : 'tab_' + i;
        if (activeKey === tabKey) {
          activeIndex = i;
          break;
        }
      }
      _this.activeIndex = activeIndex;
    };

    _this.updateScrollView = function (isSysUpdate) {
      var _this$tab$_this$activ = _this.tab[_this.activeIndex],
          left = _this$tab$_this$activ.left,
          width = _this$tab$_this$activ.width;

      var tempWidth = _this.tabBarContainerWidth - width;
      var newScrollX = Math.max(Math.min(left - tempWidth / 2, _this.tabBar.width - WIDTH), 0);
      _this.scrollView.scrollTo({ x: newScrollX, y: 0, animated: !isSysUpdate });
    };

    _this.updateUnderline = function (isSysUpdate) {
      var _this$props2 = _this.props,
          underlineStyle = _this$props2.underlineStyle,
          isUnderlineCenter = _this$props2.isUnderlineCenter;

      var underLineWidth = _reactNative.StyleSheet.flatten([styles.underlineStyle, underlineStyle]).width;
      _this.underlineLeftAnimation && _this.underlineLeftAnimation.stop();
      _this.underlineWidthAnimation && _this.underlineWidthAnimation.stop();
      var left = _this.tab[_this.activeIndex].left;
      var width = _this.tab[_this.activeIndex].width;

      if (isUnderlineCenter) {
        left += (width - underLineWidth) / 2;
      }
      if (isSysUpdate) {
        _this.state.underlineLeft.setValue(left);
        _this.state.underlineWidth.setValue(width);
      } else {
        _this.underlineLeftAnimation = _reactNative.Animated.timing(_this.state.underlineLeft, {
          toValue: left,
          duration: 200
        });
        _this.underlineWidthAnimation = _reactNative.Animated.timing(_this.state.underlineWidth, {
          toValue: width,
          duration: 200
        });
        _this.underlineLeftAnimation.start();
        _this.underlineWidthAnimation.start();
      }
    };

    _this.updateView = function (isSysUpdate) {
      var tabs = _this.props.tabs;

      if (!_this.tabBar) return;
      if (!_this.tabBarContainerWidth) return;
      if (_this.tab.length <= 0) return;
      var tabIsReady = _this.tab.filter(function (value) {
        return value;
      }).length === tabs.length;
      if (tabIsReady) {
        _this.updateScrollView(isSysUpdate);
        _this.updateUnderline(isSysUpdate);
      }
    };

    _this.tabBarContainerLayout = function (e) {
      _this.tabBarContainerWidth = e.nativeEvent.layout.width;
      _this.updateView(true);
    };

    _this.tabBarLayout = function (e) {
      _this.tabBar = e.nativeEvent.layout;
      _this.updateView(true);
    };

    _this.tabLayout = function (index, e) {
      var _e$nativeEvent$layout = e.nativeEvent.layout,
          x = _e$nativeEvent$layout.x,
          width = _e$nativeEvent$layout.width,
          height = _e$nativeEvent$layout.height;

      _this.tab[index] = { left: x, right: x + width, width: width, height: height };
      _this.updateView(true);
    };

    _this.state = {
      activeKey: props.activeKey || props.defaultActiveKey,
      underlineLeft: new _reactNative.Animated.Value(0),
      underlineWidth: new _reactNative.Animated.Value(0)
    };
    _this.tab = [];
    _this.tabBar = null;
    _this.getActiveIndexByKey(_this.state.activeKey);
    return _this;
  }

  _createClass(TabBar, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if ('activeKey' in nextProps) {
        if (nextProps.activeKey === this.state.activeKey) return;
        this.getActiveIndexByKey(nextProps.activeKey);
        this.setState({ activeKey: nextProps.activeKey }, function () {
          _this2.updateView(false);
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          wrapperStyle = _props.wrapperStyle,
          style = _props.style;

      var cWrapperStyle = [styles.tabContainerStyle, wrapperStyle];
      var cStyle = [styles.tabWrapperStyle, style];
      return _react2.default.createElement(
        _reactNative.View,
        { style: cStyle, onLayout: this.tabBarContainerLayout, __source: {
            fileName: _jsxFileName,
            lineNumber: 242
          }
        },
        _react2.default.createElement(
          _reactNative.ScrollView,
          { ref: this.setRef, showsHorizontalScrollIndicator: false, horizontal: true, __source: {
              fileName: _jsxFileName,
              lineNumber: 243
            }
          },
          _react2.default.createElement(
            _reactNative.View,
            { onLayout: this.tabBarLayout, style: cWrapperStyle, __source: {
                fileName: _jsxFileName,
                lineNumber: 244
              }
            },
            this.getTabs()
          ),
          this.getUnderline()
        )
      );
    }
  }]);

  return TabBar;
}(_react2.default.PureComponent);

TabBar.propTypes = {
  underlineStyle: _reactNative.ViewPropTypes.style,
  tabStyle: _reactNative.ViewPropTypes.style,
  tabActiveStyle: _reactNative.ViewPropTypes.style,
  tabTextStyle: _reactNative.Text.propTypes.style,
  tabActiveTextStyle: _reactNative.Text.propTypes.style,
  wrapperStyle: _reactNative.ViewPropTypes.style,
  style: _reactNative.ViewPropTypes.style,

  activeKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  defaultActiveKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  tabs: _propTypes2.default.array,
  isUnderlineCenter: _propTypes2.default.bool,

  onChange: _propTypes2.default.func
};
TabBar.defaultProps = {
  underlineStyle: {},
  defaultActiveKey: 0,
  tabs: [],
  tabStyle: {},
  tabActiveStyle: {},
  tabTextStyle: {},
  tabActiveTextStyle: {},
  wrapperStyle: {},
  style: {},
  onChange: function onChange() {},
  isUnderlineCenter: true
};
exports.default = (0, _tabHoc2.default)(TabBar);