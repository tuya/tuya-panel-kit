Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/layout/offline-view/ble-offline-view/ble-toast-modal.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _topbar = require('../../topbar');

var _topbar2 = _interopRequireDefault(_topbar);

var _bleToast = require('./ble-toast');

var _bleToast2 = _interopRequireDefault(_bleToast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BleOfflineModal = function (_PureComponent) {
  _inherits(BleOfflineModal, _PureComponent);

  function BleOfflineModal(props) {
    _classCallCheck(this, BleOfflineModal);

    var _this = _possibleConstructorReturn(this, (BleOfflineModal.__proto__ || Object.getPrototypeOf(BleOfflineModal)).call(this, props));

    _this.show = function () {
      _reactNative.Animated.spring(_this.state.value, {
        toValue: 1,
        useNativeDriver: true
      }).start();
    };

    _this.hide = function () {
      _reactNative.Animated.spring(_this.state.value, {
        toValue: 0,
        useNativeDriver: true
      }).start(function () {
        typeof _this.props.onClose === 'function' && _this.props.onClose();
      });
    };

    _this.state = {
      value: new _reactNative.Animated.Value(0)
    };
    return _this;
  }

  _createClass(BleOfflineModal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.show();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          disabled = _props.disabled,
          maskColor = _props.maskColor,
          toastProps = _objectWithoutProperties(_props, ['disabled', 'maskColor']);

      var value = this.state.value;

      return _react2.default.createElement(
        _reactNative.TouchableOpacity,
        {
          style: styles.modal,
          activeOpacity: 1,
          disabled: disabled,
          onPress: this.hide,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 51
          }
        },
        _react2.default.createElement(_reactNative.Animated.View, {
          style: [_reactNative.StyleSheet.absoluteFill, { backgroundColor: maskColor, opacity: value }],
          __source: {
            fileName: _jsxFileName,
            lineNumber: 57
          }
        }),
        _react2.default.createElement(_bleToast2.default, _extends({}, toastProps, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 60
          }
        }))
      );
    }
  }]);

  return BleOfflineModal;
}(_react.PureComponent);

BleOfflineModal.propTypes = {
  disabled: _propTypes2.default.bool,
  maskColor: _reactNative.ColorPropType,
  onClose: _propTypes2.default.func
};
BleOfflineModal.defaultProps = {
  disabled: false,
  maskColor: 'rgba(0, 0, 0, 0.4)',
  onClose: null
};
exports.default = BleOfflineModal;


var styles = _reactNative.StyleSheet.create({
  modal: {
    position: 'absolute',
    top: _topbar2.default.height,
    bottom: 0,
    left: 0,
    right: 0
  }
});