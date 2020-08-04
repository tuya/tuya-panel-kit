Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MOTION_TYPES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/popup/withSkeleton.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _modal = require('../modal');

var _modal2 = _interopRequireDefault(_modal);

var _TYModal = require('../modal/TYModal');

var _TYModal2 = _interopRequireDefault(_TYModal);

var _motion = require('../motion');

var _motion2 = _interopRequireDefault(_motion);

var _TYText = require('../TYText');

var _TYText2 = _interopRequireDefault(_TYText);

var _styled = require('./styled');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MOTION_TYPES = exports.MOTION_TYPES = Object.keys(_motion2.default).concat('none').filter(function (v) {
  return v !== 'Toast' && v !== 'PushDown';
});

var withSkeleton = function withSkeleton(WrappedComponent) {
  var _class, _temp;

  var withModal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var name = WrappedComponent.displayName || '';
  var ACCESSIBILITY_LABEL_MAP = {
    CountdownPopup: 'Popup_CountdownPicker',
    DatePickerPopup: 'Popup_DatePicker',
    TimerPickerPopup: 'Popup_TimerPicker',
    NumberSelectorPopup: 'Popup_NumberSelector',
    ListPopup: 'Popup_List',
    PickerPopup: 'Popup_Picker',
    Custom: 'Popup_Custom'
  };
  var accessPrefix = ACCESSIBILITY_LABEL_MAP[name] || 'Popup';
  return _temp = _class = function (_React$Component) {
    _inherits(WrapperComponent, _React$Component);

    function WrapperComponent(props) {
      _classCallCheck(this, WrapperComponent);

      var _this = _possibleConstructorReturn(this, (WrapperComponent.__proto__ || Object.getPrototypeOf(WrapperComponent)).call(this, props));

      _this.getData = function () {
        return _this.data;
      };

      _this._handleDataChange = function (data) {
        for (var _len = arguments.length, extraParams = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          extraParams[_key - 1] = arguments[_key];
        }

        _this.data = data;
        _this.extraParams = extraParams;
      };

      _this._handleSwitchValueChange = function (switchValue) {
        var onSwitchValueChange = _this.props.onSwitchValueChange;

        _this.setState({ switchValue: switchValue });
        onSwitchValueChange && onSwitchValueChange(switchValue);
      };

      _this._handleMaskPress = function () {
        var onMaskPress = _this.props.onMaskPress;

        if (_this.hasMotion) {
          typeof onMaskPress === 'function' && onMaskPress({
            close: function close() {
              _this.setState({ show: false });
              _this.actionTypeFn = function () {
                _modal2.default.close();
              };
            }
          });
        } else {
          typeof onMaskPress === 'function' && onMaskPress({ close: function close() {
              return _modal2.default.close();
            } });
        }
      };

      _this._handleCancelPress = function () {
        var onCancel = _this.props.onCancel;

        if (_this.hasMotion) {
          _this.setState({ show: false });
          _this.actionTypeFn = function () {
            typeof onCancel === 'function' && onCancel();
          };
        } else {
          typeof onCancel === 'function' && onCancel();
        }
      };

      _this._handleBack = function () {
        var onBack = _this.props.onBack;

        if (_this.hasMotion) {
          typeof onBack === 'function' && onBack({
            close: function close() {
              _this.setState({ show: false });
              _this.actionTypeFn = function () {
                _modal2.default.close();
              };
            }
          });
        } else {
          typeof onBack === 'function' && onBack({ close: function close() {
              return _modal2.default.close();
            } });
        }
      };

      _this._handleConfirmPress = function () {
        var onConfirm = _this.props.onConfirm;

        if (_this.hasMotion) {
          typeof onConfirm === 'function' && onConfirm.apply(undefined, [_this.data].concat(_toConsumableArray(_this.extraParams), [{
            close: function close() {
              _this.setState({ show: false });
              _this.actionTypeFn = function () {
                _modal2.default.close();
              };
            }
          }]));
        } else {
          typeof onConfirm === 'function' && onConfirm.apply(undefined, [_this.data].concat(_toConsumableArray(_this.extraParams), [{
            close: function close() {
              return _modal2.default.close();
            }
          }]));
        }
      };

      _this._handleMotionHide = function () {
        if (typeof _this.actionTypeFn === 'function') {
          _this.actionTypeFn();
        }
      };

      _this.renderTitle = function () {
        var _this$props = _this.props,
            title = _this$props.title,
            titleTextStyle = _this$props.titleTextStyle,
            titleWrapperStyle = _this$props.titleWrapperStyle,
            subTitle = _this$props.subTitle,
            backIconColor = _this$props.backIconColor,
            showBack = _this$props.showBack,
            backText = _this$props.backText;

        if (_react2.default.isValidElement(title)) return title;
        var titleArray = Array.isArray(title) ? title : [title];
        return _react2.default.createElement(
          _styled.StyledTitle,
          {
            style: [titleWrapperStyle, subTitle && { flexDirection: 'column', justifyContent: 'center' }],
            __source: {
              fileName: _jsxFileName,
              lineNumber: 300
            }
          },
          showBack && _react2.default.createElement(
            _styled.StyledTouchView,
            { onPress: _this._handleBack, __source: {
                fileName: _jsxFileName,
                lineNumber: 307
              }
            },
            _react2.default.createElement(_styled.StyledBackIcon, { d: _styled.backIcon, color: backIconColor, __source: {
                fileName: _jsxFileName,
                lineNumber: 308
              }
            }),
            _react2.default.createElement(_styled.StyledBackText, { text: backText, __source: {
                fileName: _jsxFileName,
                lineNumber: 309
              }
            })
          ),
          titleArray.map(function (t, idx) {
            return _react2.default.createElement(
              _styled.StyledTitleText,
              { key: idx, style: titleTextStyle, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 313
                }
              },
              t
            );
          }),
          !!subTitle && _react2.default.createElement(
            _styled.StyledSubTitleText,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 317
              }
            },
            subTitle
          ),
          typeof _this.state.switchValue === 'boolean' && _react2.default.createElement(_styled.StyledSwitch, {
            style: { position: 'absolute', right: 16 },
            accessibilityLabel: accessPrefix + '_Switch',
            useNativeDriver: false,
            value: _this.state.switchValue,
            onValueChange: _this._handleSwitchValueChange,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 319
            }
          })
        );
      };

      _this.renderFooter = function () {
        var _this$props2 = _this.props,
            footer = _this$props2.footer,
            footerType = _this$props2.footerType,
            cancelText = _this$props2.cancelText,
            confirmText = _this$props2.confirmText,
            footerWrapperStyle = _this$props2.footerWrapperStyle,
            cancelTextStyle = _this$props2.cancelTextStyle,
            confirmTextStyle = _this$props2.confirmTextStyle;

        if (footer) return footer;
        var showConfirm = footerType === 'both' || footerType === 'singleConfirm';
        var showCancel = footerType === 'both' || footerType === 'singleCancel';
        return _react2.default.createElement(
          _styled.StyledFooter,
          { style: footerWrapperStyle, __source: {
              fileName: _jsxFileName,
              lineNumber: 345
            }
          },
          showCancel ? _react2.default.createElement(
            _styled.StyledButton,
            {
              accessibilityLabel: accessPrefix + '_Cancel',
              bordered: footerType === 'both',
              onPress: _this._handleCancelPress,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 347
              }
            },
            _react2.default.createElement(
              _styled.StyledCancelText,
              { style: cancelTextStyle, single: footerType === 'singleCancel', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 352
                }
              },
              cancelText
            )
          ) : null,
          showConfirm ? _react2.default.createElement(
            _styled.StyledButton,
            {
              accessibilityLabel: accessPrefix + '_Confirm',
              onPress: _this._handleConfirmPress,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 358
              }
            },
            _react2.default.createElement(
              _styled.StyledConfirmText,
              { style: confirmTextStyle, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 362
                }
              },
              confirmText
            )
          ) : null
        );
      };

      _this.actionTypeFn = null;
      _this.extraParams = [];
      _this.state = {
        show: withModal ? props.visible : true,
        switchValue: props.switchValue
      };
      return _this;
    }

    _createClass(WrapperComponent, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (this.props.visible !== nextProps.visible) {
          this.setState({ show: nextProps.visible });
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            visible = _props.visible,
            animationType = _props.animationType,
            alignContainer = _props.alignContainer,
            mask = _props.mask,
            maskStyle = _props.maskStyle,
            onMaskPress = _props.onMaskPress,
            onShow = _props.onShow,
            onHide = _props.onHide,
            onDismiss = _props.onDismiss,
            title = _props.title,
            titleTextStyle = _props.titleTextStyle,
            titleWrapperStyle = _props.titleWrapperStyle,
            footer = _props.footer,
            cancelText = _props.cancelText,
            confirmText = _props.confirmText,
            onCancel = _props.onCancel,
            footerWrapperStyle = _props.footerWrapperStyle,
            cancelTextStyle = _props.cancelTextStyle,
            confirmTextStyle = _props.confirmTextStyle,
            wrapperStyle = _props.wrapperStyle,
            motionType = _props.motionType,
            motionConfig = _props.motionConfig,
            isAlign = _props.isAlign,
            props = _objectWithoutProperties(_props, ['visible', 'animationType', 'alignContainer', 'mask', 'maskStyle', 'onMaskPress', 'onShow', 'onHide', 'onDismiss', 'title', 'titleTextStyle', 'titleWrapperStyle', 'footer', 'cancelText', 'confirmText', 'onCancel', 'footerWrapperStyle', 'cancelTextStyle', 'confirmTextStyle', 'wrapperStyle', 'motionType', 'motionConfig', 'isAlign']);

        var switchValue = this.state.switchValue;

        var element = _react2.default.createElement(
          _styled.StyledContainer,
          { style: wrapperStyle, __source: {
              fileName: _jsxFileName,
              lineNumber: 403
            }
          },
          this.renderTitle(),
          _react2.default.createElement(WrappedComponent, _extends({}, props, {
            switchValue: typeof switchValue === 'undefined' ? true : switchValue,
            _onDataChange: this._handleDataChange,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 405
            }
          })),
          this.renderFooter()
        );
        if (this.hasMotion) {
          var MotionComp = _motion2.default[motionType];
          element = _react2.default.createElement(
            MotionComp,
            _extends({}, motionConfig, {
              show: this.state.show,
              onHide: this._handleMotionHide,
              isAlign: isAlign,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 416
              }
            }),
            element
          );
        }
        return withModal ? _react2.default.createElement(
          _modal2.default,
          {
            visible: visible,
            animationType: animationType,
            alignContainer: alignContainer,
            mask: mask,
            maskStyle: maskStyle,
            onMaskPress: this._handleMaskPress,
            onShow: onShow,
            onHide: onHide,
            onDismiss: onDismiss,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 427
            }
          },
          element
        ) : element;
      }
    }, {
      key: 'hasMotion',
      get: function get() {
        var motionType = this.props.motionType;

        return motionType !== 'none' && typeof _motion2.default[motionType] === 'function';
      }
    }]);

    return WrapperComponent;
  }(_react2.default.Component), _class.propTypes = _extends({}, _TYModal2.default.propTypes, {
    wrapperStyle: _reactNative.ViewPropTypes.style,

    title: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.string), _propTypes2.default.string, _propTypes2.default.element]),

    subTitle: _propTypes2.default.string,

    titleTextStyle: _TYText2.default.propTypes.style,

    titleWrapperStyle: _reactNative.ViewPropTypes.style,

    switchValue: _propTypes2.default.bool,

    onSwitchValueChange: _propTypes2.default.func,

    onCancel: _propTypes2.default.func,

    onConfirm: _propTypes2.default.func,

    cancelText: _propTypes2.default.string,

    confirmText: _propTypes2.default.string,

    cancelTextStyle: _TYText2.default.propTypes.style,

    confirmTextStyle: _TYText2.default.propTypes.style,

    footer: _propTypes2.default.element,

    footerWrapperStyle: _reactNative.ViewPropTypes.style,

    footerType: _propTypes2.default.oneOf(['singleConfirm', 'singleCancel', 'custom', 'both']),

    motionType: _propTypes2.default.oneOf(MOTION_TYPES),

    motionConfig: _propTypes2.default.object,

    isAlign: _propTypes2.default.bool,

    backIconColor: _propTypes2.default.string,

    onBack: _propTypes2.default.func,

    backText: _propTypes2.default.string,

    showBack: _propTypes2.default.bool
  }), _class.defaultProps = {
    title: 'Modal',
    titleTextStyle: null,
    titleWrapperStyle: null,
    wrapperStyle: null,
    subTitle: '',
    switchValue: undefined,
    onSwitchValueChange: null,
    onCancel: function onCancel() {},
    onConfirm: function onConfirm() {},
    cancelText: 'Cancel',
    confirmText: 'Confirm',
    cancelTextStyle: null,
    confirmTextStyle: null,
    footer: null,
    footerWrapperStyle: null,
    footerType: 'both',
    motionType: 'PullUp',
    motionConfig: {},
    isAlign: false,
    backIconColor: null,
    onBack: null,
    backText: '返回',
    showBack: false
  }, _temp;
};

exports.default = withSkeleton;