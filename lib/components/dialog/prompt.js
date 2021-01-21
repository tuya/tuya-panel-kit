Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/dialog/prompt.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _iconfont = require('../iconfont');

var _iconfont2 = _interopRequireDefault(_iconfont);

var _TYText = require('../TYText');

var _TYText2 = _interopRequireDefault(_TYText);

var _footer = require('./footer');

var _footer2 = _interopRequireDefault(_footer);

var _styled = require('./styled');

var _withMotion = require('./withMotion');

var _withMotion2 = _interopRequireDefault(_withMotion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Prompt = function (_Component) {
  _inherits(Prompt, _Component);

  function Prompt(props) {
    _classCallCheck(this, Prompt);

    var _this = _possibleConstructorReturn(this, (Prompt.__proto__ || Object.getPrototypeOf(Prompt)).call(this, props));

    _this._handleChangeText = function (text) {
      var _this$props = _this.props,
          defaultValue = _this$props.defaultValue,
          value = _this$props.value,
          onChangeText = _this$props.onChangeText;

      if (typeof defaultValue !== 'undefined') {
        _this._value = text;
        typeof onChangeText === 'function' && onChangeText(_this._value);
        _this.setState({ unControlledValue: _this._value });
      } else if (typeof value !== 'undefined') {
        var ret = typeof onChangeText === 'function' ? onChangeText(text) : undefined;
        typeof ret !== 'undefined' && _this.setState({ value: ret });
      } else {
        _this._value = text;
        _this.setState({ unControlledValue: _this._value });
        typeof onChangeText === 'function' && onChangeText(_this._value);
      }
    };

    _this._handleConfirm = function () {
      var _this$props2 = _this.props,
          defaultValue = _this$props2.defaultValue,
          value = _this$props2.value,
          onConfirm = _this$props2.onConfirm;

      if (typeof onConfirm !== 'function') {
        return;
      }
      if (typeof defaultValue !== 'undefined') {
        onConfirm(_this._value);
      } else if (typeof value !== 'undefined') {
        onConfirm(_this.state.value);
      } else {
        onConfirm(_this._value);
      }
    };

    _this._value = props.defaultValue;
    _this.state = {
      value: props.value,
      unControlledValue: props.defaultValue
    };
    return _this;
  }

  _createClass(Prompt, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          value = _props.value,
          defaultValue = _props.defaultValue,
          showHelp = _props.showHelp,
          onHelpPress = _props.onHelpPress,
          style = _props.style,
          contentStyle = _props.contentStyle,
          title = _props.title,
          titleStyle = _props.titleStyle,
          inputWrapperStyle = _props.inputWrapperStyle,
          inputStyle = _props.inputStyle,
          footerWrapperStyle = _props.footerWrapperStyle,
          confirmText = _props.confirmText,
          confirmTextStyle = _props.confirmTextStyle,
          confirmAccessibilityLabel = _props.confirmAccessibilityLabel,
          cancelText = _props.cancelText,
          cancelTextStyle = _props.cancelTextStyle,
          cancelAccessibilityLabel = _props.cancelAccessibilityLabel,
          onCancel = _props.onCancel,
          TextInputProps = _objectWithoutProperties(_props, ['value', 'defaultValue', 'showHelp', 'onHelpPress', 'style', 'contentStyle', 'title', 'titleStyle', 'inputWrapperStyle', 'inputStyle', 'footerWrapperStyle', 'confirmText', 'confirmTextStyle', 'confirmAccessibilityLabel', 'cancelText', 'cancelTextStyle', 'cancelAccessibilityLabel', 'onCancel']);

      var confirmDisabled = typeof value !== 'undefined' && this.state.value || typeof defaultValue !== 'undefined' && this.state.unControlledValue;
      return _react2.default.createElement(
        _styled.StyledContainer,
        { style: style, __source: {
            fileName: _jsxFileName,
            lineNumber: 177
          }
        },
        _react2.default.createElement(
          _styled.StyledContent,
          {
            style: [{ paddingLeft: 16, paddingRight: 16, paddingTop: 28, paddingBottom: 24 }, contentStyle],
            __source: {
              fileName: _jsxFileName,
              lineNumber: 178
            }
          },
          _react2.default.createElement(
            _styled.StyledTitle,
            { style: titleStyle, __source: {
                fileName: _jsxFileName,
                lineNumber: 184
              }
            },
            title
          ),
          _react2.default.createElement(
            _styled.StyledInputContainer,
            { style: inputWrapperStyle, __source: {
                fileName: _jsxFileName,
                lineNumber: 185
              }
            },
            _react2.default.createElement(_styled.StyledInput, _extends({
              style: inputStyle,
              autoFocus: true,
              selectionColor: '#FF4800'
            }, TextInputProps, {
              value: typeof value !== 'undefined' ? this.state.value : undefined,
              defaultValue: typeof defaultValue !== 'undefined' ? this.state.unControlledValue : undefined,
              onChangeText: this._handleChangeText,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 186
              }
            })),
            showHelp && _react2.default.createElement(
              _reactNative.TouchableOpacity,
              {
                style: { position: 'absolute', right: 12 },
                activeOpacity: 0.8,
                onPress: onHelpPress,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 198
                }
              },
              _react2.default.createElement(_iconfont2.default, { name: 'help', size: 17, color: '#b5b5b5', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 203
                }
              })
            )
          )
        ),
        _react2.default.createElement(_footer2.default, {
          style: footerWrapperStyle,
          cancelTextStyle: cancelTextStyle,
          confirmTextStyle: [{ opacity: confirmDisabled ? 1 : 0.3 }, confirmTextStyle],
          cancelText: cancelText,
          confirmText: confirmText,
          cancelAccessibilityLabel: cancelAccessibilityLabel,
          confirmAccessibilityLabel: confirmAccessibilityLabel,
          onCancel: onCancel,
          onConfirm: this._handleConfirm,
          confirmDisabled: !confirmDisabled,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 208
          }
        })
      );
    }
  }]);

  return Prompt;
}(_react.Component);

Prompt.propTypes = _extends({}, _reactNative.TextInput.propTypes, {
  showHelp: _propTypes2.default.bool,

  onHelpPress: _propTypes2.default.func,

  inputWrapperStyle: _reactNative.ViewPropTypes.style,

  inputStyle: _reactNative.TextInput.propTypes.style,

  style: _reactNative.ViewPropTypes.style,

  contentStyle: _reactNative.ViewPropTypes.style,

  title: _propTypes2.default.string.isRequired,

  titleStyle: _TYText2.default.propTypes.style,

  footerWrapperStyle: _reactNative.ViewPropTypes.style,

  textContentType: _propTypes2.default.string,

  cancelText: _propTypes2.default.string.isRequired,

  cancelTextStyle: _TYText2.default.propTypes.style,

  cancelAccessibilityLabel: _propTypes2.default.string,

  confirmText: _propTypes2.default.string.isRequired,

  confirmTextStyle: _TYText2.default.propTypes.style,

  confirmAccessibilityLabel: _propTypes2.default.string,

  onCancel: _propTypes2.default.func,

  onConfirm: _propTypes2.default.func
});
Prompt.defaultProps = {
  showHelp: false,
  onHelpPress: null,
  style: null,
  contentStyle: null,
  titleStyle: null,
  inputWrapperStyle: null,
  inputStyle: null,
  footerWrapperStyle: null,
  cancelTextStyle: null,
  cancelAccessibilityLabel: 'Dialog.Cancel',
  confirmTextStyle: null,
  confirmAccessibilityLabel: 'Dialog.Confirm',
  textContentType: '',
  onCancel: null,
  onConfirm: null
};
exports.default = (0, _withMotion2.default)(Prompt);