Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/components/layout/offline-view/ble-offline-view/index.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _TYNativeApi = require('../../../../TYNativeApi');

var _TYNativeApi2 = _interopRequireDefault(_TYNativeApi);

var _strings = require('../../../../i18n/strings');

var _strings2 = _interopRequireDefault(_strings);

var _modal = require('../../../modal');

var _modal2 = _interopRequireDefault(_modal);

var _webview = require('../webview');

var _webview2 = _interopRequireDefault(_webview);

var _bleToast = require('./ble-toast');

var _bleToast2 = _interopRequireDefault(_bleToast);

var _bleToastModal = require('./ble-toast-modal');

var _bleToastModal2 = _interopRequireDefault(_bleToastModal);

var _bleTipModal = require('./ble-tip-modal');

var _bleTipModal2 = _interopRequireDefault(_bleTipModal);

var _bleOfflineModal = require('./ble-offline-modal');

var _bleOfflineModal2 = _interopRequireDefault(_bleOfflineModal);

var _utils = require('../../../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TYNative = _TYNativeApi2.default.native;

var get = _utils.CoreUtils.get;
var isIos = _utils.RatioUtils.isIos;


var Res = {
  arrow: require('../../../res/arrow.png'),
  question: require('../../../res/question.png')
};

var BLE_HELP_LINK = 'https://smartapp.tuya.com/faq/mesh1';

var BleOfflineView = function (_Component) {
  _inherits(BleOfflineView, _Component);

  function BleOfflineView() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, BleOfflineView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BleOfflineView.__proto__ || Object.getPrototypeOf(BleOfflineView)).call.apply(_ref, [this].concat(args))), _this), _this.showOverlayModal = function () {
      var _this$props = _this.props,
          bluetoothValue = _this$props.bluetoothValue,
          deviceOnline = _this$props.deviceOnline,
          isBleOfflineOverlay = _this$props.isBleOfflineOverlay;

      if (!isBleOfflineOverlay) {
        return;
      }
      if (!bluetoothValue) {
        if (isIos) {
          _modal2.default.render(_react2.default.createElement(_bleTipModal2.default, { disabled: true, maskColor: 'rgba(0, 0, 0, 0.6)', __source: {
              fileName: _jsxFileName,
              lineNumber: 89
            }
          }), {
            mask: false
          });
        } else {
          _modal2.default.render(_react2.default.createElement(_bleToastModal2.default, {
            style: { top: 16 },
            disabled: true,
            text: _strings2.default.getLang('bluetoothOfflineTip'),
            image: Res.arrow,
            onPress: function onPress() {
              return TYNative.gotoBlePermissions();
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 94
            }
          }), { mask: false });
          TYNative.gotoBlePermissions();
        }
      } else if (!deviceOnline) {
        var routes = _TYNativeApi2.default.Navigator && _TYNativeApi2.default.Navigator.getCurrentRoutes && _TYNativeApi2.default.Navigator.getCurrentRoutes();
        var isOfflineWebView = get(routes, routes.length - 1 + '.isOfflineWebView', false);
        if (isOfflineWebView) {
          return;
        }
        _this.showBleOfflineModal();
      }
    }, _this.showBleOfflineModal = function () {
      var isBleOfflineOverlay = _this.props.isBleOfflineOverlay;

      _modal2.default.render(_react2.default.createElement(_bleOfflineModal2.default, {
        disabled: true,
        title: _strings2.default.getLang('deviceOffline'),
        subTitle: _strings2.default.getLang('deviceOfflineHelp'),
        cancelText: _strings2.default.getLang(isBleOfflineOverlay ? 'backToHome' : 'alreadyKnow'),
        confirmText: _strings2.default.getLang('checkHelp'),
        onCancel: function onCancel() {
          _modal2.default.close();
          isBleOfflineOverlay && TYNative.back();
        },
        onConfirm: _this.openH5HelpWebView,
        onClose: _modal2.default.close,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 119
        }
      }), { mask: false });
    }, _this.openH5HelpWebView = function () {
      _modal2.default.close();
      _TYNativeApi2.default.Navigator.push({
        isOfflineWebView: true,
        element: _webview2.default,
        hideFullView: true,
        barStyle: 'default',
        titleStyle: { color: '#000' },
        appStyle: { backgroundColor: '#fff' },
        topBarStyle: {
          borderBottomWidth: _reactNative.StyleSheet.hairlineWidth,
          borderBottomColor: '#E1E1E1',
          backgroundColor: '#fff'
        },
        source: BLE_HELP_LINK,
        title: _strings2.default.getLang('offlineHelp')
      });
    }, _this._handleToastPress = function () {
      var _this$props2 = _this.props,
          bluetoothValue = _this$props2.bluetoothValue,
          deviceOnline = _this$props2.deviceOnline;

      if (!bluetoothValue) {
        if (isIos) {
          _modal2.default.render(_react2.default.createElement(_bleTipModal2.default, { onClose: _modal2.default.close, __source: {
              fileName: _jsxFileName,
              lineNumber: 159
            }
          }), { mask: false });
        } else {
          TYNative.gotoBlePermissions();
        }
      } else if (!deviceOnline) {
        _this.showBleOfflineModal(true);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BleOfflineView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.showOverlayModal();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.deviceOnline !== this.props.deviceOnline || prevProps.bluetoothValue !== this.props.bluetoothValue) {
        this.showOverlayModal();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _modal2.default.close();
    }
  }, {
    key: 'getTipText',
    value: function getTipText() {
      var _props = this.props,
          deviceOnline = _props.deviceOnline,
          bluetoothValue = _props.bluetoothValue;

      if (bluetoothValue && deviceOnline) {
        return;
      }
      var tipText = void 0;
      if (!bluetoothValue) {
        tipText = _strings2.default.getLang('bluetoothOfflineTip');
      } else if (!deviceOnline) {
        tipText = _strings2.default.getLang('deviceOffline');
      }
      return tipText;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          bluetoothValue = _props2.bluetoothValue,
          isBleOfflineOverlay = _props2.isBleOfflineOverlay;

      if (isBleOfflineOverlay) {
        return null;
      }
      var tipText = this.getTipText();
      if (!tipText) {
        return null;
      }
      return _react2.default.createElement(_bleToast2.default, {
        text: tipText,
        image: bluetoothValue ? Res.question : Res.arrow,
        onPress: this._handleToastPress,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 178
        }
      });
    }
  }]);

  return BleOfflineView;
}(_react.Component);

BleOfflineView.propTypes = {
  deviceOnline: _propTypes2.default.bool,

  bluetoothValue: _propTypes2.default.bool,

  isBleOfflineOverlay: _propTypes2.default.bool
};
BleOfflineView.defaultProps = {
  deviceOnline: true,
  bluetoothValue: true,
  isBleOfflineOverlay: true
};
exports.default = BleOfflineView;