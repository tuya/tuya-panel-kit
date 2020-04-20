Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/notification/index.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _iconfont = require('../iconfont');

var _iconfont2 = _interopRequireDefault(_iconfont);

var _defaultSvg = require('../iconfont/svg/defaultSvg');

var _defaultSvg2 = _interopRequireDefault(_defaultSvg);

var _utils = require('../../utils');

var _styled = require('./styled');

var _motion = require('../motion');

var _motion2 = _interopRequireDefault(_motion);

var _TYNativeApi = require('../../TYNativeApi');

var _TYNativeApi2 = _interopRequireDefault(_TYNativeApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ThemeConsumer = _utils.ThemeUtils.ThemeConsumer;
var cx = _utils.RatioUtils.convertX;

var closeIcon = 'M329.557333 281.9072a32.8704 32.8704 0 0 1 0.887467 0.853333l177.527467 178.449067 161.6896-171.281067a33.1776 33.1776 0 0 1 47.581866-0.682666l0.682667 0.682666a34.133333 34.133333 0 0 1 0.682667 47.581867l-162.474667 172.100267 162.269867 163.157333a34.133333 34.133333 0 0 1 0.750933 47.377067l-0.853333 0.9216a32.8704 32.8704 0 0 1-46.455467 1.604266l-0.887467-0.853333-161.6896-162.577067-155.7504 165.034667a33.1776 33.1776 0 0 1-46.865066 1.365333l-1.365334-1.365333a34.133333 34.133333 0 0 1-0.682666-47.581867l156.501333-165.853866L282.999467 331.776a34.133333 34.133333 0 0 1-0.750934-47.342933l0.853334-0.9216a32.8704 32.8704 0 0 1 46.455466-1.604267z';

var TYEvent = _TYNativeApi2.default.event;

var ICONS = {
  success: _defaultSvg2.default.selected,
  warning: _defaultSvg2.default.warning,
  error: _defaultSvg2.default.error
};

var DEFAULT_THEME = {
  background: '#fff',
  text: '#495054',
  iconColor: undefined,
  successIcon: undefined,
  warningIcon: undefined,
  errorIcon: undefined,
  closeIcon: '#81828B'
};

var shadowStyles = {
  shadowColor: 'rgba(0,0,0,0.16)',
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 1,
  shadowRadius: 8,
  elevation: 2
};

var Notification = function (_PureComponent) {
  _inherits(Notification, _PureComponent);

  function Notification(props) {
    _classCallCheck(this, Notification);

    var _this = _possibleConstructorReturn(this, (Notification.__proto__ || Object.getPrototypeOf(Notification)).call(this, props));

    _this._handleLayout = function (_ref) {
      var layout = _ref.nativeEvent.layout;

      _this.setState({ height: layout.height || 44 });
    };

    _this._autoCloseId = null;
    _this.state = {
      height: 44
    };
    return _this;
  }

  _createClass(Notification, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          enableClose = _props.enableClose,
          autoCloseTime = _props.autoCloseTime,
          onClose = _props.onClose;

      if (!enableClose) {
        this._autoCloseId = setTimeout(function () {
          typeof onClose === 'function' && onClose();
        }, autoCloseTime);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this._autoCloseId);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var theme = this.theme;

      var _props2 = this.props,
          accessibilityLabel = _props2.accessibilityLabel,
          style = _props2.style,
          icon = _props2.icon,
          variant = _props2.variant,
          message = _props2.message,
          enableClose = _props2.enableClose,
          onClose = _props2.onClose,
          children = _props2.children,
          motionConfig = _props2.motionConfig,
          show = _props2.show,
          motionStyle = _props2.motionStyle,
          backIcon = _props2.backIcon,
          onPress = _props2.onPress,
          imageSource = _props2.imageSource,
          imageStyle = _props2.imageStyle,
          backIconSize = _props2.backIconSize,
          backIconCenter = _props2.backIconCenter,
          rest = _objectWithoutProperties(_props2, ['accessibilityLabel', 'style', 'icon', 'variant', 'message', 'enableClose', 'onClose', 'children', 'motionConfig', 'show', 'motionStyle', 'backIcon', 'onPress', 'imageSource', 'imageStyle', 'backIconSize', 'backIconCenter']);

      var disable = typeof onPress === 'function';
      return _react2.default.createElement(
        _motion2.default.PushDown,
        _extends({}, motionConfig, { show: show, style: [styles.notification, motionStyle], __source: {
            fileName: _jsxFileName,
            lineNumber: 105
          }
        }),
        _react2.default.createElement(
          ThemeConsumer,
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 106
            }
          },
          function (t) {
            var iconPath = icon || ICONS[variant] || ICONS.warning;
            var iconColor = theme.iconColor || theme[variant + 'Icon'] || t.global[variant] || theme.warningIcon;
            var isOneLine = _this2.state.height === 44;
            return _react2.default.createElement(
              _styled.StyledNotification,
              _extends({
                disabled: !disable
              }, rest, {
                style: style,
                accessibilityLabel: accessibilityLabel,
                activeOpacity: 1,
                onPress: onPress,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 113
                }
              }),
              _react2.default.createElement(
                _styled.StyledNotificationContent,
                {
                  style: _extends({
                    alignItems: isOneLine ? 'center' : backIconCenter ? 'center' : 'flex-start'
                  }, shadowStyles),
                  background: theme.background,
                  onLayout: _this2._handleLayout,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 121
                  }
                },
                imageSource ? _react2.default.createElement(_styled.StyledImage, { source: imageSource, style: imageStyle, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 130
                  }
                }) : _react2.default.createElement(_styled.StyledIconFont, { d: iconPath, color: iconColor, size: 20, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 132
                  }
                }),
                children || _react2.default.createElement(
                  _styled.StyledTitle,
                  {
                    color: theme.text,
                    numberOfLines: 3,
                    backIconCenter: backIconCenter,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 135
                    }
                  },
                  message
                ),
                enableClose && _react2.default.createElement(
                  _reactNative.TouchableOpacity,
                  {
                    accessibilityLabel: accessibilityLabel + '_Close',
                    activeOpacity: 0.6,
                    onPress: onClose,
                    style: backIconCenter ? styles.center : styles.touchStyle,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 144
                    }
                  },
                  _react2.default.createElement(_iconfont2.default, { d: backIcon, color: theme.closeIcon, size: backIconSize, __source: {
                      fileName: _jsxFileName,
                      lineNumber: 150
                    }
                  })
                )
              )
            );
          }
        )
      );
    }
  }, {
    key: 'theme',
    get: function get() {
      return _extends({}, DEFAULT_THEME, this.props.theme);
    }
  }]);

  return Notification;
}(_react.PureComponent);

exports.default = Notification;


Notification.propTypes = {
  accessibilityLabel: _propTypes2.default.string,

  style: _reactNative.ViewPropTypes.style,

  theme: _propTypes2.default.shape({
    background: _reactNative.ColorPropType,
    text: _reactNative.ColorPropType,
    iconColor: _reactNative.ColorPropType,
    successIcon: _reactNative.ColorPropType,
    warningIcon: _reactNative.ColorPropType,
    errorIcon: _reactNative.ColorPropType,
    closeIcon: _reactNative.ColorPropType,
    radius: _propTypes2.default.number
  }),

  show: _propTypes2.default.bool,

  icon: _propTypes2.default.string,

  backIcon: _propTypes2.default.string,

  variant: _propTypes2.default.oneOf(['success', 'warning', 'error']),

  enableClose: _propTypes2.default.bool,

  autoCloseTime: _propTypes2.default.number,

  message: _propTypes2.default.string,

  onClose: _propTypes2.default.func,

  children: _propTypes2.default.any,

  motionConfig: _propTypes2.default.object,

  motionStyle: _reactNative.ViewPropTypes.style,

  onPress: _propTypes2.default.func,

  imageSource: _propTypes2.default.number,

  imageStyle: _reactNative.ViewPropTypes.style,

  backIconSize: _propTypes2.default.number,

  backIconCenter: _propTypes2.default.bool
};

Notification.defaultProps = {
  accessibilityLabel: 'Notification',
  style: null,
  theme: DEFAULT_THEME,
  show: false,
  icon: undefined,
  backIcon: closeIcon,
  variant: 'warning',
  enableClose: true,
  autoCloseTime: 1500,
  message: '',
  onClose: null,
  children: null,
  motionConfig: {},
  motionStyle: null,
  onPress: null,
  imageSource: null,
  imageStyle: null,
  backIconSize: 24,
  backIconCenter: false
};

var styles = _reactNative.StyleSheet.create({
  notification: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  center: {
    width: cx(24),
    height: cx(24),
    alignItems: 'center',
    justifyContent: 'center'
  },
  touchStyle: {
    width: cx(24),
    height: cx(24),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 10,
    right: 16
  }
});

Notification.show = function (props) {
  TYEvent.emit('showNotification', _extends({ show: true }, props));
};

Notification.hide = function () {
  TYEvent.emit('hideNotification', { show: false });
};