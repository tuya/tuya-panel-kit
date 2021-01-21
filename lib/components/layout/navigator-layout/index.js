Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.moreIcon = undefined;
var _jsxFileName = 'src/components/layout/navigator-layout/index.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactNativeDeprecatedCustomComponents = require('react-native-deprecated-custom-components');

var _reactNative = require('react-native');

var _TYNativeApi = require('../../../TYNativeApi');

var _portalOut = require('../../modal/portalOut');

var _portalOut2 = _interopRequireDefault(_portalOut);

var _fullView = require('../full-view');

var _fullView2 = _interopRequireDefault(_fullView);

var _notification = require('../../notification');

var _notification2 = _interopRequireDefault(_notification);

var _api = require('../api');

var _api2 = _interopRequireDefault(_api);

var _detectNetModal = require('../detect-net-modal');

var _detectNetModal2 = _interopRequireDefault(_detectNetModal);

var _strings = require('../../i18n/strings');

var _strings2 = _interopRequireDefault(_strings);

var _utils = require('../../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var moreIcon = exports.moreIcon = 'M353.152 237.76a52.736 52.736 0 0 0 1.28 75.776l210.432 196.352-204.16 202.944a52.928 52.928 0 0 0-0.64 74.496 51.712 51.712 0 0 0 73.6 0.512l230.144-229.568a64 64 0 0 0-0.256-90.88l-232.96-229.888a54.912 54.912 0 0 0-77.44 0.256z';

var Res = require('../../res/wifi.png');

var get = _utils.CoreUtils.get;
var isIos = _utils.RatioUtils.isIos;


var TYEvent = _TYNativeApi.TYSdk.event;
var TYMobile = _TYNativeApi.TYSdk.mobile;
var TYNative = _TYNativeApi.TYSdk.native;

if (_reactNative.Platform.OS !== 'web') {
  var originRender = _reactNative.Text.render || _reactNative.Text.prototype.render;
  var parent = _reactNative.Text.render ? _reactNative.Text : _reactNative.Text.prototype;
  parent.render = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var origin = originRender.call.apply(originRender, [this].concat(args));
    return _react2.default.cloneElement(origin, {
      style: [!isIos && { fontFamily: '' }, origin.props.style]
    });
  };
}

var SceneConfigs = _extends({}, _reactNativeDeprecatedCustomComponents.Navigator.SceneConfigs.HorizontalSwipeJump, {
  gestures: {
    pop: _extends({}, _reactNativeDeprecatedCustomComponents.Navigator.SceneConfigs.FloatFromRight.gestures.pop)
  }
});

var _navigator = void 0;

_reactNative.BackHandler.addEventListener('hardwareBackPress', function () {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

var NavigatorLayout = function (_Component) {
  _inherits(NavigatorLayout, _Component);

  function NavigatorLayout(props) {
    _classCallCheck(this, NavigatorLayout);

    var _this = _possibleConstructorReturn(this, (NavigatorLayout.__proto__ || Object.getPrototypeOf(NavigatorLayout)).call(this, props));

    _this._handleAppStateChange = function (nextAppState) {
      if (nextAppState === 'background') {
        _notification2.default.hide();
      }
    };

    _this._handleMqttSignal = function () {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$data = _ref.data,
          data = _ref$data === undefined ? {} : _ref$data,
          protocol = _ref.protocol;

      if (!data) return;
      if (protocol === 23) {
        var result = data.data;
        var signal = result.signal;

        (0, _api.getRssi)().then(function (res) {
          if (!res) {
            return;
          }
          var rssi = res.value;

          if (signal < rssi && _reactNative.AppState.currentState === 'active') {
            _this.timer && clearTimeout(_this.timer);
            _notification2.default.show({
              message: _strings2.default.getLang('location'),
              backIcon: moreIcon,
              onClose: _this._handleToDetail,
              onPress: _this._handleToDetail,
              enableImage: true,
              backIconSize: 20,
              backIconCenter: true,
              imageSource: Res
            });
            _this.timer = setTimeout(function () {
              _notification2.default.hide();
            }, 3000);
          }
        });
      }
    };

    _this._handleToDetail = function () {
      _this.setState({
        modalVisible: true
      });
    };

    _this._sceneConfigs = _this.__sceneConfigs.bind(_this);
    _this._renderScene = _this.__renderScene.bind(_this);
    _this._onDidFocus = _this.__onDidFocus.bind(_this);
    _this._onWillFocus = _this.__onWillFocus.bind(_this);
    _this._onBack = _this.onBack.bind(_this);

    if (_reactNative.UIManager.setLayoutAnimationEnabledExperimental) {
      _reactNative.UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    _this.state = {
      modalVisible: false
    };
    return _this;
  }

  _createClass(NavigatorLayout, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _opts$hideSignalPop = this.opts.hideSignalPop,
          hideSignalPopProps = _opts$hideSignalPop === undefined ? false : _opts$hideSignalPop;


      var hideSignalPop = get(_TYNativeApi.TYSdk, 'devInfo.panelConfig.fun.hideSignalPop', false);

      if (_reactNative.Platform.OS === 'android') {
        _reactNative.BackHandler.addEventListener('hardwareBackPress', this._onBack);
      }

      if (hideSignalPop || hideSignalPopProps) return;

      _api2.default.receiverMqttData(23);
      _api2.default.sendMqttData(22);
      _TYNativeApi.TYSdk.DeviceEventEmitter.addListener('receiveMqttData', this._handleMqttSignal);
      _reactNative.AppState.addEventListener('change', this._handleAppStateChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _opts$hideSignalPop2 = this.opts.hideSignalPop,
          hideSignalPopProps = _opts$hideSignalPop2 === undefined ? false : _opts$hideSignalPop2;

      var hideSignalPop = get(_TYNativeApi.TYSdk, 'devInfo.panelConfig.fun.hideSignalPop', false);

      if (_reactNative.Platform.OS === 'android') {
        _reactNative.BackHandler.removeEventListener('hardwareBackPress', this._onBack);
      }

      if (hideSignalPop || hideSignalPopProps) return;

      _notification2.default.hide();
      this.timer && clearTimeout(this.timer);
      _TYNativeApi.TYSdk.DeviceEventEmitter.removeListener('receiveMqttData', this._handleMqttSignal);
      _reactNative.AppState.removeEventListener('change', this._handleAppStateChange);
    }
  }, {
    key: 'renderScene',
    value: function renderScene(route, navigator) {
      var Element = route.element || _reactNative.View;
      return _react2.default.createElement(Element, _extends({ navigator: navigator }, route, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 116
        }
      }));
    }
  }, {
    key: '__sceneConfigs',
    value: function __sceneConfigs(route, routeStack) {
      return route.sceneConfigs ? route.sceneConfigs : SceneConfigs;
    }
  }, {
    key: '__renderScene',
    value: function __renderScene(route, navigator) {
      _navigator = navigator;
      _TYNativeApi.TYSdk.applyNavigator(navigator);

      return this.dispatchRoute(route, navigator);
    }
  }, {
    key: '__onDidFocus',
    value: function __onDidFocus(route) {
      TYEvent.fire('NAVIGATOR_ON_DID_FOCUS', route);
    }
  }, {
    key: '__onWillFocus',
    value: function __onWillFocus(route) {
      TYEvent.fire('NAVIGATOR_ON_WILL_FOCUS', route);
    }
  }, {
    key: 'onBack',
    value: function onBack() {
      if (_navigator && _navigator.getCurrentRoutes().length > 1) {
        _navigator.pop();
        return true;
      }
      return false;
    }
  }, {
    key: 'hookRoute',
    value: function hookRoute(route) {
      return {};
    }
  }, {
    key: 'dispatchRoute',
    value: function dispatchRoute(route, navigator) {
      var _this2 = this;

      var contentLayout = null;
      var opts = this.hookRoute(route);
      this.opts = opts;
      var _opts$enablePopGestur = opts.enablePopGesture,
          enablePopGesture = _opts$enablePopGestur === undefined ? true : _opts$enablePopGestur;

      if ((!!opts.gesture || opts.id === 'main') && enablePopGesture) {
        TYMobile.enablePopGesture();
      } else {
        TYMobile.disablePopGesture();
      }

      contentLayout = this.renderScene(route, navigator);
      if (!!opts.hideFullView || route.initialized) {
        contentLayout = this.renderScene(route, navigator);
        if (!!opts.hideFullView) return contentLayout;
      }
      var devInfo = this.props.devInfo;

      var title = opts.title ? opts.title : devInfo.name;

      var showOfflineView = opts.showOfflineView !== undefined ? opts.showOfflineView : !devInfo.appOnline || !devInfo.deviceOnline;
      if (Object.keys(devInfo).length <= 1) {
        showOfflineView = false;
      }
      if (!!opts.FullView) {
        var CustomFullView = opts.FullView;
        return _react2.default.createElement(
          CustomFullView,
          {
            ref: function ref(_ref2) {
              if (_ref2) _this2.fullViewRef = _ref2;
            },
            title: title,
            onBack: this._onBack,
            appOnline: devInfo.appOnline,
            deviceOnline: devInfo.deviceOnline,
            renderStatusBar: opts.renderStatusBar,
            renderTopBar: opts.renderTopBar,
            hideTopbar: !!opts.hideTopbar,
            showOfflineView: showOfflineView,
            devInfo: devInfo,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 225
            }
          },
          contentLayout
        );
      }

      return _react2.default.createElement(
        _fullView2.default,
        {
          ref: function ref(_ref3) {
            if (_ref3) _this2.fullViewRef = _ref3;
          },
          title: title,
          style: [styles.container, opts.style],
          background: opts.background,
          topbarStyle: [styles.topbarStyle, opts.topbarStyle],
          topbarTextStyle: opts.topbarTextStyle,
          appOnline: devInfo.appOnline,
          deviceOnline: devInfo.deviceOnline,
          capability: devInfo.capability,
          onBack: this._onBack,
          showMenu: route.id === 'main',
          isBleOfflineOverlay: opts.isBleOfflineOverlay,
          renderStatusBar: opts.renderStatusBar,
          renderTopBar: opts.renderTopBar,
          hideTopbar: !!opts.hideTopbar,
          showOfflineView: showOfflineView,
          backgroundStyle: opts.backgroundStyle,
          devInfo: devInfo,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 245
          }
        },
        contentLayout
      );
    }
  }, {
    key: '_onDidFocus',
    value: function _onDidFocus(route) {
      TYEvent.fire('NAVIGATOR_ON_DID_FOCUS', route);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var modalVisible = this.state.modalVisible;

      return _react2.default.createElement(
        _reactNative.View,
        { style: { flex: 1 }, __source: {
            fileName: _jsxFileName,
            lineNumber: 279
          }
        },
        _react2.default.createElement(_reactNativeDeprecatedCustomComponents.Navigator, {
          initialRoute: { id: 'main', initialRoute: true },
          configureScene: this._sceneConfigs,
          renderScene: this._renderScene,
          onDidFocus: this._onDidFocus,
          onWillFocus: this._onWillFocus,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 280
          }
        }),
        modalVisible && _react2.default.createElement(_detectNetModal2.default, { onClose: function onClose() {
            return _this3.setState({ modalVisible: false });
          }, __source: {
            fileName: _jsxFileName,
            lineNumber: 287
          }
        }),
        _react2.default.createElement(_portalOut2.default, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 288
          }
        })
      );
    }
  }]);

  return NavigatorLayout;
}(_react.Component);

NavigatorLayout.propTypes = {
  devInfo: _propTypes2.default.object.isRequired
};
exports.default = NavigatorLayout;


var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  topbarStyle: {}
});