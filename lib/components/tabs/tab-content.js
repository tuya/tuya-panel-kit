Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/tabs/tab-content.js';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if ((typeof Symbol === 'function' ? Symbol.iterator : '@@iterator') in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _utils = require('../../utils');

var _styled = require('./styled');

var _constant = require('./constant');

var _utils2 = require('./utils');

var _tabPanel = require('./tab-panel');

var _tabPanel2 = _interopRequireDefault(_tabPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var winWidth = _utils.RatioUtils.winWidth;

var TabContent = function (_Component) {
  _inherits(TabContent, _Component);

  function TabContent(props) {
    _classCallCheck(this, TabContent);

    var _this = _possibleConstructorReturn(this, (TabContent.__proto__ || Object.getPrototypeOf(TabContent)).call(this, props));

    _initialiseProps.call(_this);

    var activeIndex = props.activeIndex,
        children = props.children;

    var x = -activeIndex * winWidth;
    var cachedChildren = Array.isArray(children) ? new Array(children.length).fill(0) : [];
    cachedChildren[activeIndex] = children[activeIndex];
    _this.state = {
      scrollX: new _reactNative.Animated.Value(x),
      cachedChildren: cachedChildren
    };
    _this._bounds = [0, -winWidth * children.length + winWidth];
    _this._curDeltaX = x;
    _this._panResponder = _reactNative.PanResponder.create({
      onStartShouldSetPanResponder: function onStartShouldSetPanResponder() {
        return !_this.props.disabled;
      },
      onStartShouldSetPanResponderCapture: function onStartShouldSetPanResponderCapture() {
        return false;
      },
      onMoveShouldSetPanResponder: function onMoveShouldSetPanResponder(gestureState) {
        if (_this.props.disabled) return false;
        return _this.isHorizontalSwipe(gestureState);
      },
      onMoveShouldSetPanResponderCapture: function onMoveShouldSetPanResponderCapture(evt, gestureState) {
        if (_this.props.disabled) return false;
        return _this.isHorizontalSwipe(gestureState);
      },
      onPanResponderTerminationRequest: function onPanResponderTerminationRequest() {
        return false;
      },
      onPanResponderGrant: _this._handleGrant,
      onPanResponderMove: _this._handleMove,
      onPanResponderRelease: _this._handleRelease
    });
    return _this;
  }

  _createClass(TabContent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.preloadSibling();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.activeIndex !== this.props.activeIndex) {
        this.scrollToIndex(this.props.activeIndex, this.preloadSibling);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this._timerId);
      this.state.scrollX.stopAnimation();
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
          style = _props.style,
          children = _props.children;

      return _react2.default.createElement(
        _styled.AnimatedView,
        _extends({
          style: [style, {
            width: winWidth * children.length,
            flex: 1,
            transform: [{
              translateX: this.state.scrollX
            }]
          }]
        }, this._panResponder.panHandlers, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 211
          }
        }),
        this._renderChildren()
      );
    }
  }]);

  return TabContent;
}(_react.Component);

TabContent.propTypes = {
  style: _reactNative.ViewPropTypes.style,
  activeIndex: _propTypes2.default.number.isRequired,

  velocityThreshold: _propTypes2.default.number,

  disabled: _propTypes2.default.bool,
  preload: _propTypes2.default.bool,
  preloadTimeout: _propTypes2.default.number,
  onMove: _propTypes2.default.func,
  onRelease: _propTypes2.default.func,
  renderPlaceholder: _propTypes2.default.func,
  children: _propTypes2.default.array.isRequired,
  animationConfig: _propTypes2.default.shape({
    duration: _propTypes2.default.number,
    easing: _propTypes2.default.func,
    delay: _propTypes2.default.number,
    isInteraction: _propTypes2.default.bool,
    useNativeDriver: _propTypes2.default.bool
  })
};
TabContent.defaultProps = {
  style: null,
  disabled: false,
  preload: true,
  preloadTimeout: 375,
  velocityThreshold: 0.5,
  onMove: undefined,
  onRelease: undefined,
  renderPlaceholder: function renderPlaceholder() {
    return _react2.default.createElement(_reactNative.ActivityIndicator, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 46
      }
    });
  },
  animationConfig: {
    duration: 200,
    easing: _reactNative.Easing.linear,
    delay: 0,
    isInteraction: true,
    useNativeDriver: true
  }
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.scrollToIndex = function (index, cb) {
    var animationConfig = _this2.props.animationConfig;

    var toValue = -winWidth * index;
    _this2.state.scrollX.stopAnimation();
    _this2._curDeltaX = toValue;
    _reactNative.Animated.timing(_this2.state.scrollX, _extends({
      toValue: toValue
    }, animationConfig)).start(cb);
  };

  this.preloadSibling = function () {
    var _props2 = _this2.props,
        preload = _props2.preload,
        preloadTimeout = _props2.preloadTimeout,
        activeIndex = _props2.activeIndex,
        children = _props2.children;

    if (!preload) {
      return;
    }
    var newCachedChildren = [].concat(_toConsumableArray(_this2.state.cachedChildren));
    if (newCachedChildren.every(function (child) {
      return _react2.default.isValidElement(child);
    })) {
      return;
    }
    _this2._timerId = setTimeout(function () {
      var siblingIndexes = (0, _utils2.getSiblingIndex)(activeIndex, 0, children.length - 1);
      [activeIndex].concat(_toConsumableArray(siblingIndexes)).forEach(function (idx) {
        newCachedChildren[idx] = children[idx];
      });
      _this2.setState({ cachedChildren: newCachedChildren });
    }, preloadTimeout);
  };

  this.isHorizontalSwipe = function (gestureState) {
    return Math.abs(gestureState.dx) > Math.abs(gestureState.dy * 3);
  };

  this._handleGrant = function () {};

  this._handleMove = function (e, gestureState) {
    var onMove = _this2.props.onMove;
    var dx = gestureState.dx;

    var deltaX = _this2._moveTo(dx);
    if (typeof onMove === 'function') {
      var index = (0, _utils2.getNearestIndexByDeltaX)(deltaX, winWidth);
      var ratio = Math.abs(deltaX) / winWidth;
      var percent = ratio - index > 0 ? ratio - index : 1 - (index - ratio);
      onMove(gestureState, index, percent);
    }
  };

  this._handleRelease = function (e, gestureState) {
    var _props3 = _this2.props,
        velocityThreshold = _props3.velocityThreshold,
        children = _props3.children,
        onRelease = _props3.onRelease;
    var dx = gestureState.dx,
        vx = gestureState.vx;

    var deltaX = _this2._moveTo(dx);
    var extraDeltaX = deltaX;
    if (Math.abs(vx) > velocityThreshold) {
      var maxDeltaX = (children.length - 1) * -winWidth;
      extraDeltaX = Math.max(deltaX + (dx > 0 ? winWidth : -winWidth) * 0.5, maxDeltaX);
    }
    var index = (0, _utils2.getNearestIndexByDeltaX)(extraDeltaX, winWidth);

    _this2.scrollToIndex(index);
    if (typeof onRelease === 'function') {
      var ratio = Math.abs(deltaX) / winWidth;
      var percent = ratio - index > 0 ? ratio - index : 1 - (index - ratio);
      onRelease(gestureState, index, percent);
    }
  };

  this._renderChildren = function () {
    var _props4 = _this2.props,
        accessibilityLabel = _props4.accessibilityLabel,
        activeIndex = _props4.activeIndex,
        preload = _props4.preload,
        children = _props4.children,
        renderPlaceholder = _props4.renderPlaceholder;

    if (!preload) {
      return children;
    }
    return _this2.state.cachedChildren.map(function (child, idx) {
      if (_react2.default.isValidElement(child)) return children[idx];
      return _react2.default.createElement(
        _tabPanel2.default,
        { key: idx, accessibilityLabel: accessibilityLabel + '_Placeholder_' + idx, __source: {
            fileName: _jsxFileName,
            lineNumber: 201
          }
        },
        renderPlaceholder(activeIndex, children[idx])
      );
    });
  };
};

exports.default = TabContent;