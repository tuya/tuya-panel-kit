Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/layout/full-view/index.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _reactNativeSvg = require('react-native-svg');

var _TYNativeApi = require('../../../TYNativeApi');

var _TYNativeApi2 = _interopRequireDefault(_TYNativeApi);

var _strings = require('../../../i18n/strings');

var _strings2 = _interopRequireDefault(_strings);

var _topbar = require('../topbar');

var _topbar2 = _interopRequireDefault(_topbar);

var _offlineView = require('../offline-view');

var _offlineView2 = _interopRequireDefault(_offlineView);

var _utils = require('../../../utils');

var _notification = require('../../notification');

var _notification2 = _interopRequireDefault(_notification);

var _globalToast = require('../../global-toast');

var _globalToast2 = _interopRequireDefault(_globalToast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TYMobile = _TYNativeApi2.default.mobile;
var TYNative = _TYNativeApi2.default.native;
var TYEvent = _TYNativeApi2.default.event;

var LinearGradient = _reactNative.View;
var RadialGradient = _reactNative.View;

if (TYMobile.verSupported('2.5')) {
  LinearGradient = require('../../gradient/linear-gradient').default;
  RadialGradient = require('../../gradient/radial-gradient').default;
}

var get = _utils.CoreUtils.get;
var withTheme = _utils.ThemeUtils.withTheme;
var isIphoneX = _utils.RatioUtils.isIphoneX;

var Screen = _reactNative.Dimensions.get('screen');
var isIos = _reactNative.Platform.OS === 'ios';
var dropHeight = isIos ? isIphoneX ? 88 : 64 : 56;

var FullView = function (_Component) {
  _inherits(FullView, _Component);

  function FullView(props) {
    _classCallCheck(this, FullView);

    var _this = _possibleConstructorReturn(this, (FullView.__proto__ || Object.getPrototypeOf(FullView)).call(this, props));

    _this.onBack = function (tab) {
      if (!_this.props.onBack || !_this.props.onBack()) {
        if (tab === 'right') {
          TYNative.showDeviceMenu();
        } else {
          TYNative.back();
        }
      }
    };

    _this.showNotification = function (data) {
      var motionStyle = data.motionStyle,
          rest = _objectWithoutProperties(data, ['motionStyle']);

      _this.setState({ showNotification: true, information: rest, motionStyle: motionStyle });
    };

    _this.showToast = function (data) {
      var style = data.style,
          rest = _objectWithoutProperties(data, ['style']);

      _this.setState({ showToast: true, successInformation: rest, successStyle: style });
    };

    _this.hideNotification = function () {
      _this.setState({ showNotification: false });
    };

    _this.hideToast = function () {
      _this.setState({ showToast: false });
    };

    _this.state = {
      showNotification: false,
      information: {},
      motionStyle: {},
      showToast: false,
      successInformation: {},
      successStyle: {}
    };
    return _this;
  }

  _createClass(FullView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      TYEvent.on('showNotification', this.showNotification);
      TYEvent.on('hideNotification', this.hideNotification);
      TYEvent.on('showToast', this.showToast);
      TYEvent.on('hideToast', this.hideToast);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      TYEvent.off('showNotification', this.showNotification);
      TYEvent.off('hideNotification', this.hideNotification);
      TYEvent.off('showToast', this.showToast);
      TYEvent.off('hideToast', this.hideToast);
    }
  }, {
    key: 'renderBackground',
    value: function renderBackground(background) {
      var _this2 = this;

      var backgroundStyle = this.props.backgroundStyle;


      if (typeof background === 'number') {
        return _react2.default.createElement(_reactNative.Image, {
          fadeDuration: 0,
          ref: function ref(_ref) {
            _this2.refBackground = _ref;
          },
          style: [styles.background, backgroundStyle],
          source: background,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 136
          }
        });
      }

      if (typeof background === 'object') {
        var uri = background.uri,
            stops = background.stops,
            others = _objectWithoutProperties(background, ['uri', 'stops']);

        if (uri) {
          return _react2.default.createElement(_reactNative.Image, _extends({
            fadeDuration: 0,
            ref: function ref(_ref2) {
              _this2.refBackground = _ref2;
            },
            style: [styles.background, backgroundStyle],
            source: { uri: uri }
          }, others, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 153
            }
          }));
        }

        if (_utils.CoreUtils.isArray(stops)) {
          return _react2.default.createElement(RadialGradient, _extends({
            ref: function ref(_ref3) {
              _this2.refBackground = _ref3;
            },
            style: [styles.gradientStyle, backgroundStyle]
          }, others, {
            stops: stops,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 167
            }
          }));
        }

        var x1 = background.x1,
            y1 = background.y1,
            x2 = background.x2,
            y2 = background.y2,
            ostops = _objectWithoutProperties(background, ['x1', 'y1', 'x2', 'y2']);

        return _react2.default.createElement(
          LinearGradient,
          {
            ref: function ref(_ref4) {
              _this2.refBackground = _ref4;
            },
            style: [styles.gradientStyle, backgroundStyle],
            stops: ostops,
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 180
            }
          },
          _react2.default.createElement(_reactNativeSvg.Rect, { x: '0', y: '0', height: Screen.height, width: Screen.width, __source: {
              fileName: _jsxFileName,
              lineNumber: 191
            }
          })
        );
      }

      return null;
    }
  }, {
    key: 'renderOfflineView',
    value: function renderOfflineView() {
      var _props = this.props,
          appOnline = _props.appOnline,
          deviceOnline = _props.deviceOnline,
          showOfflineView = _props.showOfflineView,
          capability = _props.capability,
          isBleOfflineOverlay = _props.isBleOfflineOverlay;

      var show = !appOnline || !deviceOnline;
      var tipText = !appOnline ? _strings2.default.getLang('appoffline') : !deviceOnline ? _strings2.default.getLang('offline') : '';

      if (!show) {
        return null;
      }

      if (showOfflineView === undefined) {
        return null;
      }

      if (showOfflineView === false) {
        return null;
      }

      return _react2.default.createElement(_offlineView2.default, {
        style: styles.offlineStyle,
        text: tipText,
        textStyle: styles.offlineText,
        appOnline: appOnline,
        deviceOnline: deviceOnline,
        capability: capability,
        isBleOfflineOverlay: isBleOfflineOverlay,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 227
        }
      });
    }
  }, {
    key: 'renderNotification',
    value: function renderNotification() {
      var _this3 = this;

      return _react2.default.createElement(_notification2.default, _extends({
        onClose: function onClose() {
          return _this3.setState({ showNotification: false });
        },
        motionConfig: { dropHeight: dropHeight }
      }, this.state.information, {
        show: this.state.showNotification,
        motionStyle: [{ zIndex: 99 }, this.state.motionStyle],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 242
        }
      }));
    }
  }, {
    key: 'renderGlobalToast',
    value: function renderGlobalToast() {
      var _this4 = this;

      return _react2.default.createElement(_globalToast2.default, _extends({
        onFinish: function onFinish() {
          return _this4.setState({ showToast: false });
        }
      }, this.state.successInformation, {
        show: this.state.showToast,
        style: [{ zIndex: 999 }, this.state.successStyle],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 255
        }
      }));
    }
  }, {
    key: 'renderTopBar',
    value: function renderTopBar() {
      var _this5 = this;

      var _props2 = this.props,
          title = _props2.title,
          topbarStyle = _props2.topbarStyle,
          hideTopbar = _props2.hideTopbar,
          renderTopBar = _props2.renderTopBar,
          topbarTextStyle = _props2.topbarTextStyle,
          _props2$devInfo = _props2.devInfo,
          devInfo = _props2$devInfo === undefined ? {} : _props2$devInfo;
      var isShare = this.state.isShare;


      if (!hideTopbar) {
        if (renderTopBar) {
          return renderTopBar();
        }
        var uiPhase = devInfo.uiPhase || 'release';

        var _ref5 = _reactNative.StyleSheet.flatten(topbarTextStyle) || {},
            color = _ref5.color;

        var isShowMore = !(isShare || !this.props.showMenu);
        var actions = [{
          accessibilityLabel: 'TopBar_Btn_RightItem',
          name: this.topBarMoreIconName,
          onPress: function onPress() {
            return _this5.onBack('right');
          }
        }, uiPhase !== 'release' && {
          accessibilityLabel: 'TopBar_Preview',
          style: {
            backgroundColor: '#57DD43',
            borderWidth: 1
          },
          contentStyle: { fontSize: 12 },
          color: '#000',
          source: 'Preview',
          disabled: true
        }].filter(function (v) {
          return !!v;
        });
        return _react2.default.createElement(_topbar2.default, {
          style: [{ zIndex: 999 }, topbarStyle],
          title: title,
          titleStyle: topbarTextStyle,
          color: color,
          actions: isShowMore ? actions : null,
          onBack: function onBack() {
            return _this5.onBack('left');
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 301
          }
        });
      }

      return null;
    }
  }, {
    key: 'renderStatusBar',
    value: function renderStatusBar() {
      var renderStatusBar = this.props.renderStatusBar;


      if (renderStatusBar) {
        return renderStatusBar();
      }

      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var _props3 = this.props,
          style = _props3.style,
          theme = _props3.theme;

      var background = this.props.background || get(theme, 'global.background', '#f8f8f8');
      var isBgColor = typeof background === 'string';
      return _react2.default.createElement(
        _reactNative.View,
        {
          ref: function ref(_ref6) {
            _this6.refRootView = _ref6;
          },
          style: [styles.container, isBgColor && { backgroundColor: background }, style],
          __source: {
            fileName: _jsxFileName,
            lineNumber: 330
          }
        },
        this.renderStatusBar(),
        !isBgColor && this.renderBackground(background),
        this.renderNotification(),
        this.renderTopBar(),
        this.renderGlobalToast(),
        this.props.children,
        this.renderOfflineView()
      );
    }
  }, {
    key: 'topBarMoreIconName',
    get: function get() {
      var _props$devInfo = this.props.devInfo,
          devInfo = _props$devInfo === undefined ? {} : _props$devInfo;

      return devInfo && devInfo.panelConfig && devInfo.panelConfig.fun && devInfo.panelConfig.fun.topBarMoreIconName || 'pen';
    }
  }]);

  return FullView;
}(_react.Component);

FullView.propTypes = {
  theme: _propTypes2.default.object,
  title: _propTypes2.default.string,
  style: _reactNative.ViewPropTypes.style,
  topbarStyle: _reactNative.ViewPropTypes.style,
  hideTopbar: _propTypes2.default.bool,
  showMenu: _propTypes2.default.bool,

  background: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.object]),
  onBack: _propTypes2.default.func,
  devInfo: _propTypes2.default.object.isRequired,
  capability: _propTypes2.default.number,

  isBleOfflineOverlay: _propTypes2.default.bool
};
FullView.defaultProps = {
  theme: null,
  title: '',
  style: null,
  topbarStyle: null,
  hideTopbar: false,
  showMenu: true,
  background: null,
  onBack: null,
  capability: 0,
  isBleOfflineOverlay: true
};


var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  },

  background: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    resizeMode: 'stretch',
    width: Screen.width,
    height: Screen.height
  },

  offlineStyle: {
    width: Screen.width,
    height: Screen.height - _topbar2.default.height,
    position: 'absolute',
    top: _topbar2.default.height
  },

  offlineText: {
    paddingBottom: _topbar2.default.height * 2
  },

  gradientStyle: {
    width: Screen.width,
    height: Screen.height
  }
});

exports.default = withTheme(FullView);