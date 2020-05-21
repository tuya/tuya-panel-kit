Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/tabs/index.js';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if ((typeof Symbol === 'function' ? Symbol.iterator : '@@iterator') in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _utils = require('../../utils');

var _constant = require('./constant');

var _styled = require('./styled');

var _utils2 = require('./utils');

var _tabMask = require('./tab-mask');

var _tabMask2 = _interopRequireDefault(_tabMask);

var _tabPanel = require('./tab-panel');

var _tabPanel2 = _interopRequireDefault(_tabPanel);

var _tabContent = require('./tab-content');

var _tabContent2 = _interopRequireDefault(_tabContent);

var _tabScrollView = require('./tab-scroll-view');

var _tabScrollView2 = _interopRequireDefault(_tabScrollView);

var _TYText = require('../TYText');

var _TYText2 = _interopRequireDefault(_TYText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var get = _utils.CoreUtils.get;
var winWidth = _utils.RatioUtils.winWidth;

var Tabs = function (_Component) {
  _inherits(Tabs, _Component);

  function Tabs(props) {
    _classCallCheck(this, Tabs);

    var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));

    _initialiseProps.call(_this);

    if (Array.isArray(props.dataSource) && Array.isArray(props.children) && props.dataSource.length !== props.children.length) {
      console.warn('Tabs: 数据源与children数量不匹配，请检查是否配置错误');
    }
    _this.state = {
      activeIndex: _this.getCurActiveIndex(props),
      scrollX: new _reactNative.Animated.Value(0),
      underlineLeft: new _reactNative.Animated.Value(0),
      underlineWidth: new _reactNative.Animated.Value(0)
    };
    var styleObj = _reactNative.StyleSheet.flatten([props.style]);
    _this._tabsWidth = (styleObj.width || winWidth) - props.extraSpace;
    _this._tabWidth = (0, _utils2.getTabWidth)(props.maxItem, _this._tabsWidth);
    _this._bounds = [0, -_this._tabWidth * props.dataSource.length + _this._tabsWidth];
    _this._curDeltaX = 0;
    _this._tabIsReady = false;
    _this._tabLayouts = [];
    _this._cachedChildren = Array.isArray(props.children) ? new Array(props.children.length).fill(0) : [];
    _this._panResponder = _reactNative.PanResponder.create({
      onStartShouldSetPanResponder: function onStartShouldSetPanResponder() {
        return !_this.props.disabled;
      },
      onStartShouldSetPanResponderCapture: function onStartShouldSetPanResponderCapture() {
        return !_this.props.disabled;
      },
      onMoveShouldSetPanResponder: function onMoveShouldSetPanResponder() {
        return !_this.props.disabled;
      },
      onMoveShouldSetPanResponderCapture: function onMoveShouldSetPanResponderCapture() {
        return !_this.props.disabled;
      },

      onPanResponderTerminationRequest: function onPanResponderTerminationRequest() {
        return !_this.props.disabled;
      },
      onPanResponderGrant: function onPanResponderGrant() {},
      onPanResponderMove: _this._handleMove,
      onPanResponderRelease: _this._handleRelease,
      onPanResponderTerminate: _this._handleRelease
    });
    return _this;
  }

  _createClass(Tabs, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (this._tabIsReady && typeof nextProps.activeKey !== 'undefined') {
        this.setState({ activeIndex: this.getCurActiveIndex(nextProps) }, function () {
          _this2._startUnderlineAnimation(_this2.state.activeIndex);
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._stopAllAnimations();
    }
  }, {
    key: '_moveTo',
    value: function _moveTo(dx) {
      var deltaX = this._curDeltaX + dx;

      var _bounds = _slicedToArray(this._bounds, 2),
          leftBound = _bounds[0],
          rightBound = _bounds[1];

      if (dx > 0 && deltaX >= leftBound) {
        deltaX = leftBound + (deltaX - leftBound) * _constant.FRICTION_LEVEL;
      } else if (dx < 0 && deltaX <= rightBound) {
        deltaX = rightBound + (deltaX - rightBound) * _constant.FRICTION_LEVEL;
      }
      this.state.scrollX.setValue(deltaX);
      return deltaX;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          accessibilityLabel = _props.accessibilityLabel,
          style = _props.style,
          wrapperStyle = _props.wrapperStyle,
          tabContentStyle = _props.tabContentStyle,
          dataSource = _props.dataSource,
          tabPosition = _props.tabPosition,
          swipeable = _props.swipeable,
          maxItem = _props.maxItem,
          background = _props.background,
          preload = _props.preload,
          preloadTimeout = _props.preloadTimeout,
          velocityThreshold = _props.velocityThreshold,
          renderPlaceholder = _props.renderPlaceholder,
          children = _props.children;

      var showMask = this.state.activeIndex <= dataSource.length - maxItem;
      var tabsComponent = _react2.default.createElement(
        _styled.StyledTab,
        _extends({
          key: 'Tabs',
          style: [style, { width: this._tabsWidth, backgroundColor: background }],
          pointerEvents: 'box-only'
        }, this._panResponder.panHandlers, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 585
          }
        }),
        this._renderTabs(),
        this._renderUnderline(),
        _react2.default.createElement(_tabMask2.default, { visible: this.isMultiScreen && showMask, color: background, __source: {
            fileName: _jsxFileName,
            lineNumber: 593
          }
        })
      );
      if (_react2.default.Children.count(children) > 0) {
        var content = [tabsComponent, _react2.default.createElement(
          _tabContent2.default,
          {
            key: 'TabContent',
            accessibilityLabel: accessibilityLabel,
            style: tabContentStyle,
            activeIndex: this.state.activeIndex,
            disabled: !swipeable,
            preload: preload,
            preloadTimeout: preloadTimeout,
            velocityThreshold: velocityThreshold,
            renderPlaceholder: renderPlaceholder,
            onMove: this._handleTabContentMove,
            onRelease: this._handleTabContentRelease,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 599
            }
          },
          this.props.children
        )];
        if (tabPosition === 'bottom') content.reverse();
        return _react2.default.createElement(
          _reactNative.View,
          { style: [{ flex: 1 }, wrapperStyle], __source: {
              fileName: _jsxFileName,
              lineNumber: 616
            }
          },
          content
        );
      }
      return tabsComponent;
    }
  }, {
    key: 'isMultiScreen',
    get: function get() {
      return this.props.dataSource.length > this.props.maxItem;
    }
  }]);

  return Tabs;
}(_react.Component);

Tabs.TabPanel = _tabPanel2.default;
Tabs.TabContent = _tabContent2.default;
Tabs.TabScrollView = _tabScrollView2.default;
Tabs.propTypes = {
  accessibilityLabel: _propTypes2.default.string,

  style: _reactNative.ViewPropTypes.style,

  wrapperStyle: _reactNative.ViewPropTypes.style,

  tabStyle: _reactNative.ViewPropTypes.style,

  tabActiveStyle: _reactNative.ViewPropTypes.style,

  tabTextStyle: _TYText2.default.propTypes.style,

  tabActiveTextStyle: _TYText2.default.propTypes.style,

  tabContentStyle: _reactNative.ViewPropTypes.style,

  underlineStyle: _reactNative.ViewPropTypes.style,

  underlineWidth: _propTypes2.default.number,

  defaultActiveKey: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  activeKey: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  dataSource: _propTypes2.default.array.isRequired,

  disabled: _propTypes2.default.bool,

  maxItem: _propTypes2.default.number,

  tabPosition: _propTypes2.default.oneOf(['top', 'bottom']),

  swipeable: _propTypes2.default.bool,

  activeColor: _reactNative.ColorPropType,

  background: _reactNative.ColorPropType,

  preload: _propTypes2.default.bool,

  preloadTimeout: _propTypes2.default.number,

  velocityThreshold: _propTypes2.default.number,

  renderPlaceholder: _propTypes2.default.func,

  onChange: _propTypes2.default.func,

  children: _propTypes2.default.array,

  extraSpace: _propTypes2.default.number,

  animationConfig: _propTypes2.default.shape({
    duration: _propTypes2.default.number,
    easing: _propTypes2.default.func,
    delay: _propTypes2.default.number,
    isInteraction: _propTypes2.default.bool,
    useNativeDriver: _propTypes2.default.bool })
};
Tabs.defaultProps = {
  accessibilityLabel: 'Tabs',
  style: null,
  wrapperStyle: null,
  tabStyle: null,
  tabActiveStyle: null,
  tabTextStyle: null,
  tabActiveTextStyle: null,
  tabContentStyle: null,
  underlineStyle: null,
  underlineWidth: undefined,
  defaultActiveKey: 0,
  activeKey: undefined,
  disabled: false,
  maxItem: 4,
  tabPosition: 'top',
  swipeable: true,
  activeColor: undefined,
  background: '#fff',
  onChange: undefined,
  preload: true,
  preloadTimeout: 375,
  velocityThreshold: 0.5,
  renderPlaceholder: undefined,
  children: undefined,
  extraSpace: 0,
  animationConfig: {
    duration: 200,
    easing: _reactNative.Easing.linear,
    delay: 0,
    isInteraction: true,
    useNativeDriver: false
  }
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.getCurActiveIndex = function (props) {
    var activeKey = props.activeKey,
        defaultActiveKey = props.defaultActiveKey;

    var activeIndex = _this3.props.dataSource.findIndex(function (d) {
      return d.value === activeKey || d.value === defaultActiveKey;
    });
    return activeIndex === -1 ? 0 : activeIndex;
  };

  this.getCurTabLayout = function (idx) {
    var curTabLayout = get(_this3._tabLayouts, '' + idx, {});
    return curTabLayout;
  };

  this.scrollToIndex = function (idx, cb) {
    var _props2 = _this3.props,
        animationConfig = _props2.animationConfig,
        dataSource = _props2.dataSource;

    if (idx > dataSource.length - 1) {
      return;
    }
    var toValue = -_this3._tabWidth * idx;
    _this3._stopAllAnimations();
    _this3._curDeltaX = toValue;
    _reactNative.Animated.timing(_this3.state.scrollX, _extends({
      toValue: toValue
    }, animationConfig, {
      useNativeDriver: false
    })).start(cb);
  };

  this._startUnderlineAnimation = function (idx, cb) {
    var _props3 = _this3.props,
        animationConfig = _props3.animationConfig,
        dataSource = _props3.dataSource,
        maxItem = _props3.maxItem;

    if (idx > dataSource.length - 1) {
      return;
    }
    var curTabLayout = _this3.getCurTabLayout(idx);
    _this3._stopAllAnimations();
    _this3.animationFn = _reactNative.Animated.parallel([_reactNative.Animated.timing(_this3.state.underlineLeft, _extends({
      toValue: curTabLayout.left
    }, animationConfig, {
      useNativeDriver: false
    })), _reactNative.Animated.timing(_this3.state.underlineWidth, _extends({
      toValue: curTabLayout.width
    }, animationConfig, {
      useNativeDriver: false
    }))]);
    _this3.animationFn.start(function () {
      var scrollIdx = (0, _utils2.getCenteredScrollIndex)(idx, maxItem, dataSource.length);
      _this3.scrollToIndex(scrollIdx);
      typeof cb === 'function' && cb();
    });
  };

  this._stopAllAnimations = function () {
    _this3.state.scrollX.stopAnimation();
    _this3.state.underlineLeft.stopAnimation();
    _this3.state.underlineWidth.stopAnimation();
  };

  this._handleMove = function (e, _ref) {
    var dx = _ref.dx;

    if (_this3.isMultiScreen) {
      _this3._moveTo(dx);
    }
  };

  this._handleRelease = function (_ref2, _ref3) {
    var nativeEvent = _ref2.nativeEvent;
    var dx = _ref3.dx,
        dy = _ref3.dy,
        vx = _ref3.vx;

    var isPress = (0, _utils2.isValidPress)(dx, dy);
    if (isPress) {
      var locationX = nativeEvent.locationX;

      var deltaX = Math.abs(_this3._curDeltaX) + Math.abs(locationX);
      var idx = (0, _utils2.getIndexByDeltaX)(deltaX, _this3._tabWidth);
      _this3._handleTabChange(_this3.props.dataSource[idx], idx);
    } else if (_this3.isMultiScreen) {
      var _bounds2 = _slicedToArray(_this3._bounds, 2),
          leftBound = _bounds2[0],
          rightBound = _bounds2[1];

      var _props4 = _this3.props,
          dataSource = _props4.dataSource,
          maxItem = _props4.maxItem;

      var _deltaX = _this3._moveTo(dx);
      var maxIdx = Math.max(dataSource.length - maxItem, 0);
      if (dx > 0 && _deltaX >= leftBound || dx < 0 && _deltaX <= rightBound) {
        var _idx = (0, _utils2.getNearestIndexByDeltaX)(_deltaX, _this3._tabWidth, maxIdx);
        _this3.scrollToIndex(_idx);
      } else if ((0, _utils2.isValidSwipe)(vx, dx)) {
        _this3.state.scrollX.addListener(function (_ref4) {
          var value = _ref4.value;

          if (value > leftBound) {
            _this3._curDeltaX = leftBound;
            _this3.state.scrollX.stopAnimation();
            _this3.state.scrollX.setValue(leftBound);
          } else if (value < rightBound) {
            _this3._curDeltaX = rightBound;
            _this3.state.scrollX.stopAnimation();
            _this3.state.scrollX.setValue(rightBound);
          } else {
            _this3._curDeltaX = value;
          }
        });
        _reactNative.Animated.decay(_this3.state.scrollX, {
          velocity: vx,
          deceleration: _constant.DECELERATION
        }).start(function () {
          _this3._curDeltaX = _this3.state.scrollX._value;
          _this3.state.scrollX.removeAllListeners();
        });
      } else {
        _this3._curDeltaX = _deltaX;
      }
    }
  };

  this._handleTabLayout = function (_ref5, idx) {
    var layout = _ref5.nativeEvent.layout;
    var dataSource = _this3.props.dataSource;

    _this3._tabLayouts[idx] = layout;
    _this3._tabIsReady = _this3._tabLayouts.filter(function (d) {
      return !!d;
    }).length === dataSource.length;
    if (_this3._tabIsReady) {
      _this3._tabLayouts = (0, _utils2.reduceTabLayoutLeft)(_this3._tabLayouts);
      _this3._startUnderlineAnimation(_this3.state.activeIndex);
    }
  };

  this._handleTabChange = function (tab, idx) {
    var _props5 = _this3.props,
        dataSource = _props5.dataSource,
        activeKey = _props5.activeKey,
        onChange = _props5.onChange;

    if (idx > dataSource.length - 1 || tab.disabled) {
      return;
    }
    if (typeof activeKey === 'undefined') {
      _this3.setState({ activeIndex: idx }, function () {
        _this3._startUnderlineAnimation(idx);
      });
    }
    typeof onChange === 'function' && _this3.props.onChange(tab, idx);
  };

  this._handleTabContentMove = function (gestureState, idx, percent) {
    var dataSource = _this3.props.dataSource;
    var dx = gestureState.dx;

    var minIdx = 0;
    var maxIdx = dataSource.length - 1;
    var isToRight = dx < 0;
    var rPercent = isToRight ? percent : 1 - percent;
    var isNextPage = rPercent >= 0.5;
    if (isToRight) {
      var nextIdx = Math.min(isNextPage ? idx : idx + 1, maxIdx);
      if (_this3.state.activeIndex === maxIdx && nextIdx === maxIdx) {
        return;
      }
      var curTabLayout = _this3.getCurTabLayout(_this3.state.activeIndex);
      var nextTabLayout = _this3.getCurTabLayout(nextIdx);
      var curLeft = curTabLayout.left,
          curWidth = curTabLayout.width;
      var nextLeft = nextTabLayout.left,
          nextWidth = nextTabLayout.width;

      var moveDelta = curWidth * 0.666667;
      var totalLen = nextLeft + nextWidth * 0.5 - curLeft - curWidth;
      var newWidth = curTabLayout.width + (totalLen - moveDelta) * Math.min(rPercent * 2, 1);
      var newLeft = curLeft + moveDelta * Math.min(rPercent * 2, 1);
      if (isNextPage) {
        var extraWidth = nextLeft - curLeft;
        newWidth -= extraWidth * Math.min((rPercent - 0.5) * 2, 1);
        newLeft += extraWidth * Math.min((rPercent - 0.5) * 2, 1);
      }
      _this3.state.underlineWidth.setValue(newWidth);
      _this3.state.underlineLeft.setValue(newLeft);
    } else {
      var _nextIdx = Math.max(isNextPage ? idx : idx - 1, minIdx);
      if (_this3.state.activeIndex === minIdx && _nextIdx === minIdx) {
        return;
      }
      var _curTabLayout = _this3.getCurTabLayout(_this3.state.activeIndex);
      var _nextTabLayout = _this3.getCurTabLayout(_nextIdx);
      var _curLeft = _curTabLayout.left,
          _curWidth = _curTabLayout.width;
      var _nextLeft = _nextTabLayout.left,
          _nextWidth = _nextTabLayout.width;

      var _moveDelta = _curWidth * 0.333333;
      var _totalLen = _curLeft - _nextLeft - _nextWidth * 0.5;
      var _newWidth = _curTabLayout.width + (_totalLen - _moveDelta) * Math.min(rPercent * 2, 1);
      var _newLeft = _curLeft - _moveDelta * Math.min(rPercent * 2, 1);
      if (isNextPage) {
        var _extraWidth = _curLeft - _nextLeft;
        _newWidth -= _extraWidth * Math.min((rPercent - 0.5) * 2, 1);
        _newLeft -= _extraWidth * Math.min((rPercent - 0.5) * 2, 1);
      }
      _this3.state.underlineWidth.setValue(_newWidth);
      _this3.state.underlineLeft.setValue(_newLeft - (_newWidth - _curWidth));
    }
  };

  this._handleTabContentRelease = function (gestureState, idx) {
    var dataSource = _this3.props.dataSource;

    _this3._handleTabChange(dataSource[idx], idx);
    _this3._startUnderlineAnimation(idx);
  };

  this._renderTab = function (tab, idx) {
    var _props6 = _this3.props,
        accessibilityLabel = _props6.accessibilityLabel,
        tabStyle = _props6.tabStyle,
        tabActiveStyle = _props6.tabActiveStyle,
        tabTextStyle = _props6.tabTextStyle,
        tabActiveTextStyle = _props6.tabActiveTextStyle,
        activeColor = _props6.activeColor,
        underlineWidth = _props6.underlineWidth;
    var label = tab.label,
        renderTab = tab.renderTab;

    var isActive = idx === _this3.state.activeIndex;
    var isFixedWidth = typeof underlineWidth === 'number';
    var TabText = _react2.default.createElement(_styled.StyledTabText, {
      style: [tabTextStyle, isActive && tabActiveTextStyle],
      color: activeColor,
      text: label,
      isActive: isActive,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 492
      }
    });
    return _react2.default.createElement(
      _styled.Center,
      {
        key: idx,
        accessibilityLabel: accessibilityLabel + '_' + idx,
        style: [{ width: _this3._tabWidth }, tab.disabled && { opacity: 0.3 }],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 500
        }
      },
      _react2.default.createElement(
        _styled.StyledTabBtn,
        {
          style: [isFixedWidth && { width: underlineWidth }, tabStyle, isActive && tabActiveStyle],
          onLayout: function onLayout(evt) {
            return _this3._handleTabLayout(evt, idx);
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 505
          }
        },
        !isFixedWidth ? typeof renderTab === 'function' ? renderTab(isActive, _this3.state, _this3.props) : TabText : null
      ),
      isFixedWidth ? typeof renderTab === 'function' ? renderTab(isActive, _this3.state, _this3.props) : TabText : null
    );
  };

  this._renderTabs = function () {
    var dataSource = _this3.props.dataSource;

    if (_this3.isMultiScreen) {
      var width = dataSource.length * _this3._tabWidth;
      return _react2.default.createElement(
        _styled.AnimatedView,
        {
          style: {
            width: width,
            transform: [{
              translateX: _this3.state.scrollX
            }]
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 529
          }
        },
        dataSource.map(_this3._renderTab)
      );
    }
    return dataSource.map(_this3._renderTab);
  };

  this._renderUnderline = function () {
    var _props7 = _this3.props,
        activeColor = _props7.activeColor,
        underlineStyle = _props7.underlineStyle,
        dataSource = _props7.dataSource;
    var activeIndex = _this3.state.activeIndex;

    var _StyleSheet$flatten = _reactNative.StyleSheet.flatten([underlineStyle]),
        backgroundColor = _StyleSheet$flatten.backgroundColor;

    var disabled = get(dataSource, activeIndex + '.disabled', false);
    return _react2.default.createElement(_styled.AnimatedUnderline, {
      style: [underlineStyle, disabled && { opacity: 0.3 }, {
        width: _this3.state.underlineWidth,
        transform: [{ translateX: _reactNative.Animated.add(_this3.state.scrollX, _this3.state.underlineLeft) }]
      }],
      color: backgroundColor || activeColor,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 552
      }
    });
  };
};

exports.default = Tabs;