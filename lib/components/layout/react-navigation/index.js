Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.moreIcon = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsxFileName = 'src/components/layout/react-navigation/index.js';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactNative = require('react-native');

var _native = require('@react-navigation/native');

var _stack = require('@react-navigation/stack');

require('react-native-gesture-handler');

var _TransitionPresets = require('./TransitionPresets');

var _TransitionPresets2 = _interopRequireDefault(_TransitionPresets);

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

var _get = _utils.CoreUtils.get;
var isIos = _utils.RatioUtils.isIos;


var TYEvent = _TYNativeApi.TYSdk.event;
var TYMobile = _TYNativeApi.TYSdk.mobile;

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

function RouteIntercept(props) {
  var navigation = (0, _native.useNavigation)();
  var navigationState = (0, _native.useNavigationState)(function (state) {
    return state;
  });
  var routes = navigationState.routes,
      index = navigationState.index;
  var _routes$index = routes[index],
      name = _routes$index.name,
      params = _routes$index.params;

  var currentRoute = _extends({ id: name }, params);
  _react2.default.useEffect(function () {
    var unsubscribeFocus = navigation.addListener('focus', function () {
      TYEvent.emit('NAVIGATOR_ON_DID_FOCUS', currentRoute);

      props.onFocus && props.onFocus(navigationState);
    });

    var unsubscribeBlur = navigation.addListener('blur', function () {
      props.onBlur && props.onBlur(navigationState);
    });

    return function () {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation]);

  return props.children();
}

var Stack = (0, _stack.createStackNavigator)();

function createNavigator(_ref) {
  var _class, _temp;

  var router = _ref.router,
      _screenOptions2 = _ref.screenOptions;

  var defaultScreenOptions = _extends({
    cardOverlay: function cardOverlay() {
      return _react2.default.createElement(_reactNative.View, { style: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }, __source: {
          fileName: _jsxFileName,
          lineNumber: 85
        }
      });
    },
    cardOverlayEnabled: true
  }, _TransitionPresets2.default.SlideFromRightIOS);

  return _temp = _class = function (_PureComponent) {
    _inherits(Navigator, _PureComponent);

    function Navigator(props) {
      _classCallCheck(this, Navigator);

      var _this = _possibleConstructorReturn(this, (Navigator.__proto__ || Object.getPrototypeOf(Navigator)).call(this, props));

      _this._navigation = {};
      _this.trackName = 'AutoTrack';
      _this.trackManager = _reactNative.NativeModules.TYRCTAPMTrackManager;
      _this.eventManager = _reactNative.NativeModules.TYRCTAPMEventManager;

      _this._onFocus = function (state) {
        _this.sendEventInfo('page.enter', state);
      };

      _this._onBlur = function (state) {
        _this.sendEventInfo('page.leave', state);
      };

      _this._onBack = function () {
        var routes = _this.navigationState && _this.navigationState.routes;
        if (routes && routes.length > 1) {
          _this._navigation.pop();
          return true;
        }
        return false;
      };

      _this._handleAppStateChange = function (nextAppState) {
        if (nextAppState === 'background') {
          _notification2.default.hide();
        }
      };

      _this._handleToDetail = function () {
        _this.setState({
          modalVisible: true
        });
      };

      _this._handleMqttSignal = function () {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref2$data = _ref2.data,
            data = _ref2$data === undefined ? {} : _ref2$data,
            protocol = _ref2.protocol;

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
                message: _strings2.default.getLang('location', undefined),
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

      _this.setFullViewRef = function (ref) {
        if (ref) _this.fullViewRef = ref;
      };

      _this.getFullViewRef = function () {
        return _this.fullViewRef;
      };

      _this.getRouteOptions = function (localRoute, navRoute) {
        return _extends({}, localRoute, navRoute.params);
      };

      _this.dispatchRoute = function (route) {
        return _react2.default.createElement(
          Stack.Screen,
          {
            key: route.name,
            name: route.name,
            options: function options(_ref3) {
              var navRoute = _ref3.route;

              var opts = _this.getRouteOptions(route, navRoute);
              var options = opts.options || {};
              var gestureEnabled = void 0;
              var _opts$enablePopGestur = opts.enablePopGesture,
                  enablePopGesture = _opts$enablePopGestur === undefined ? true : _opts$enablePopGestur;

              if ((options.gesture || opts.name === 'main') && enablePopGesture) {
                gestureEnabled = true;
                TYMobile.enablePopGesture();
              } else {
                gestureEnabled = false;
                TYMobile.disablePopGesture();
              }
              return _extends({
                gestureEnabled: gestureEnabled,
                swipeEnabled: gestureEnabled
              }, options);
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 250
            }
          },
          function (_ref4) {
            var navRoute = _ref4.route,
                navigation = _ref4.navigation;

            var Element = route.component;
            var routeOptions = _this.getRouteOptions(route, navRoute);
            var options = routeOptions.options || {};
            var opts = _extends({}, options, routeOptions);
            _this.opts = opts;
            var devInfo = _this.props.devInfo;

            var title = opts.title ? opts.title : devInfo.name;
            var showOfflineView = opts.showOfflineView !== undefined ? opts.showOfflineView : !devInfo.appOnline || !devInfo.deviceOnline;
            if (Object.keys(devInfo).length <= 1) {
              showOfflineView = false;
            }

            return _react2.default.createElement(
              RouteIntercept,
              { onBlur: _this._onBlur, onFocus: _this._onFocus, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 289
                }
              },
              function () {
                var contentLayout = _react2.default.createElement(Element, { navigation: navigation, route: navRoute, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 291
                  }
                });

                return _react2.default.createElement(
                  _fullView2.default,
                  {
                    ref: _this.setFullViewRef,
                    title: title,
                    style: [styles.container, opts.style],
                    background: opts.background,
                    topbarStyle: [opts.topbarStyle],
                    topbarTextStyle: opts.topbarTextStyle,
                    appOnline: devInfo.appOnline,
                    deviceOnline: devInfo.deviceOnline,
                    capability: devInfo.capability,
                    onBack: _this._onBack,
                    showMenu: route.name === 'main',
                    isBleOfflineOverlay: opts.isBleOfflineOverlay,
                    renderStatusBar: opts.renderStatusBar,
                    renderTopBar: opts.renderTopBar,
                    hideTopbar: !!opts.hideTopbar,
                    showOfflineView: showOfflineView,
                    backgroundStyle: opts.backgroundStyle,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 294
                    }
                  },
                  contentLayout
                );
              }
            );
          }
        );
      };

      _this.getNavigation = function () {
        return _this._navigation;
      };

      _this.handleNavigationStateChange = function (state) {
        _this.navigationState = state;
      };

      _this.getScreenOptions = function (_ref5, _screenOptions, defaultOptions) {
        var route = _ref5.route,
            navigation = _ref5.navigation;

        var options = void 0;
        if (typeof _screenOptions === 'function') {
          options = _extends({}, defaultOptions, _screenOptions({ route: route, navigation: navigation }), {
            header: function header() {
              return null;
            }
          });
        } else {
          options = _extends({}, defaultOptions, _screenOptions, {
            header: function header() {
              return null;
            }
          });
        }
        return options;
      };

      if (_reactNative.UIManager.setLayoutAnimationEnabledExperimental) {
        _reactNative.UIManager.setLayoutAnimationEnabledExperimental(true);
      }
      _this.state = {
        modalVisible: false
      };
      return _this;
    }

    _createClass(Navigator, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (_reactNative.Platform.OS === 'android') {
          _reactNative.BackHandler.addEventListener('hardwareBackPress', this._onBack);
        }
        if (this.hideSignalPop) return;

        _api2.default.receiverMqttData(23);
        _api2.default.sendMqttData(22);
        _TYNativeApi.TYSdk.DeviceEventEmitter.addListener('receiveMqttData', this._handleMqttSignal);
        _reactNative.AppState.addEventListener('change', this._handleAppStateChange);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (_reactNative.Platform.OS === 'android') {
          _reactNative.BackHandler.removeEventListener('hardwareBackPress', this._onBack);
        }
        if (this.hideSignalPop) return;

        _notification2.default.hide();
        this.timer && clearTimeout(this.timer);
        _TYNativeApi.TYSdk.DeviceEventEmitter.removeListener('receiveMqttData', this._handleMqttSignal);
        _reactNative.AppState.removeEventListener('change', this._handleAppStateChange);
      }
    }, {
      key: 'sendEventInfo',
      value: function sendEventInfo(eventType, state) {
        var enablePageTrack = _get(_TYNativeApi.TYSdk, 'devInfo.panelConfig.fun.enablePageTrack', false);

        if (!enablePageTrack) {
          return;
        }

        var routeNames = state.routeNames,
            index = state.index;

        var currentPage = routeNames[index];
        var referrerPage = index > 0 ? routeNames[index - 1] : '';
        var eventTime = new Date().getTime();
        var attributes = {
          eventType: eventType,
          eventTime: eventTime,
          currentPage: currentPage,
          referrerPage: referrerPage
        };
        if (__DEV__) {
          console.log('====RN Tracker info====', attributes);
        } else {
          this.eventManager.event(this.trackName, attributes);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var modalVisible = this.state.modalVisible;


        return _react2.default.createElement(
          _reactNative.View,
          { style: { flex: 1 }, __source: {
              fileName: _jsxFileName,
              lineNumber: 354
            }
          },
          _react2.default.createElement(
            _native.NavigationContainer,
            { onStateChange: this.handleNavigationStateChange, __source: {
                fileName: _jsxFileName,
                lineNumber: 355
              }
            },
            _react2.default.createElement(
              Stack.Navigator,
              {
                initialRouteName: 'main',
                screenOptions: function screenOptions(_ref6) {
                  var route = _ref6.route,
                      navigation = _ref6.navigation;

                  _this2._navigation = navigation;
                  var options = _this2.getScreenOptions({ route: route, navigation: navigation }, _screenOptions2, defaultScreenOptions);
                  return options;
                },
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 356
                }
              },
              router.map(this.dispatchRoute)
            )
          ),
          modalVisible && _react2.default.createElement(_detectNetModal2.default, { onClose: function onClose() {
              return _this2.setState({ modalVisible: false });
            }, __source: {
              fileName: _jsxFileName,
              lineNumber: 372
            }
          }),
          _react2.default.createElement(_portalOut2.default, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 373
            }
          })
        );
      }
    }, {
      key: 'hideSignalPop',
      get: function get() {
        var _opts$hideSignalPop = this.opts.hideSignalPop,
            hideSignalPopProps = _opts$hideSignalPop === undefined ? false : _opts$hideSignalPop;

        var hideSignalPop = _get(_TYNativeApi.TYSdk, 'devInfo.panelConfig.fun.hideSignalPop', false);

        return hideSignalPop || hideSignalPopProps;
      }
    }]);

    return Navigator;
  }(_react.PureComponent), _class.propTypes = {
    devInfo: _propTypes2.default.object.isRequired
  }, _temp;
}

exports.default = createNavigator;
var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  }
});