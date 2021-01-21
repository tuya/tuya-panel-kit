Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CountdownModal = undefined;
var _jsxFileName = 'src/components/popup/countdown.js';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _pickerView = require('../picker-view');

var _pickerView2 = _interopRequireDefault(_pickerView);

var _utils = require('../../utils');

var _withSkeleton = require('./withSkeleton');

var _withSkeleton2 = _interopRequireDefault(_withSkeleton);

var _styled = require('./styled');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var toFixed = _utils.CoreUtils.toFixed;
var range = _utils.NumberUtils.range,
    inMaxMin = _utils.NumberUtils.inMaxMin;
var isIos = _utils.RatioUtils.isIos,
    width = _utils.RatioUtils.width;
var getTheme = _utils.ThemeUtils.getTheme,
    ThemeConsumer = _utils.ThemeUtils.ThemeConsumer;

var CountdownPopup = function (_React$Component) {
  _inherits(CountdownPopup, _React$Component);

  function CountdownPopup(props) {
    _classCallCheck(this, CountdownPopup);

    var _this = _possibleConstructorReturn(this, (CountdownPopup.__proto__ || Object.getPrototypeOf(CountdownPopup)).call(this, props));

    _this.handleHourChange = function (hour) {
      var _this$props = _this.props,
          min = _this$props.min,
          max = _this$props.max,
          onValueChange = _this$props.onValueChange,
          _onDataChange = _this$props._onDataChange;

      var isMaxHour = hour === parseInt(max / 60, 10);
      var isMinHour = hour === parseInt(min / 60, 10);

      var minute = _this.state.minute;

      if (isMaxHour && _this.RemainMinutes.indexOf(minute) === -1) {
        minute = _this.RemainMinutes[0];
      }

      if (isMinHour && _this.shiftMinutes.indexOf(minute) === -1) {
        minute = _this.shiftMinutes[0];
      }
      _this.setState({ hour: hour, minute: minute });
      var data = { hour: hour, minute: minute, value: hour * 60 + minute };
      onValueChange && onValueChange(data);
      _onDataChange && _onDataChange(data);
    };

    _this.handleMinuteChange = function (minute) {
      var _this$props2 = _this.props,
          onValueChange = _this$props2.onValueChange,
          _onDataChange = _this$props2._onDataChange;

      _this.setState({ minute: minute });
      var data = _extends({}, _this.state, {
        minute: minute,
        value: _this.state.hour * 60 + minute
      });
      onValueChange && onValueChange(data);
      _onDataChange && _onDataChange(data);
    };

    if (props.onlyone) {
      _this.Hours = [];
      _this.Minutes = range(props.min, props.max + 1, props.step);
    } else {
      var remainMinutes = props.max % 60;
      var shiftMinutes = props.min % 60;
      _this.Hours = range(parseInt(props.min / 60, 10), parseInt(props.max / 60, 10) + 1);
      _this.Minutes = range(0, 60, props.step);
      _this.EqualMinutes = range(shiftMinutes, remainMinutes + 1, props.step);
      _this.RemainMinutes = range(0, remainMinutes + 1, props.step);
      _this.shiftMinutes = range(shiftMinutes, 60, props.step);
    }
    _this.state = {
      hour: _this.getHour(props),
      minute: _this.getMinute(props)
    };
    props._onDataChange(_extends({}, _this.state, {
      value: _this.state.hour * 60 + _this.state.minute
    }));
    return _this;
  }

  _createClass(CountdownPopup, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.value !== nextProps.value) {
        this.setState({
          hour: this.getHour(nextProps),
          minute: this.getMinute(nextProps)
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.switchValue !== this.props.switchValue) {
        var data = this.props.switchValue ? _extends({}, this.state, { value: this.state.hour * 60 + this.state.minute }) : { hour: 0, minute: 0, value: 0 };
        this.props._onDataChange(data);
      }
    }
  }, {
    key: 'getHour',
    value: function getHour(props) {
      var onlyone = props.onlyone,
          value = props.value,
          max = props.max;

      var v = inMaxMin(0, max, value);
      return onlyone ? 0 : parseInt(v / 60, 10);
    }
  }, {
    key: 'getMinute',
    value: function getMinute(props) {
      var onlyone = props.onlyone,
          value = props.value,
          max = props.max;

      var v = inMaxMin(0, max, value);
      return onlyone ? parseInt(v, 10) : parseInt(v - this.getHour(props) * 60, 10);
    }
  }, {
    key: 'renderOnePicker',
    value: function renderOnePicker() {
      var _this2 = this;

      var _props = this.props,
          switchValue = _props.switchValue,
          countdownWrapperStyle = _props.countdownWrapperStyle,
          pickerFontColor = _props.pickerFontColor,
          pickerUnitColor = _props.pickerUnitColor,
          minuteText = _props.minuteText,
          minutePickerStyle = _props.minutePickerStyle,
          minuteUnitStyle = _props.minuteUnitStyle;

      return _react2.default.createElement(
        ThemeConsumer,
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 203
          }
        },
        function (globalTheme) {
          var countdownTheme = _extends({}, _this2.props, { theme: globalTheme });
          var countFontColor = pickerFontColor || getTheme(countdownTheme, 'popup.cellFontColor');
          var countUnitColor = pickerUnitColor || getTheme(countdownTheme, 'popup.cellFontColor');
          return _react2.default.createElement(
            _styled.StyledCountdownContainer,
            {
              style: [countdownWrapperStyle, !switchValue && { opacity: 0.6 }],
              pointerEvents: !switchValue ? 'none' : 'auto',
              __source: {
                fileName: _jsxFileName,
                lineNumber: 209
              }
            },
            _react2.default.createElement(
              _styled.StyledOverview,
              { style: { flex: 1 }, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 213
                }
              },
              _react2.default.createElement(
                _pickerView2.default,
                {
                  theme: { fontColor: countFontColor },
                  accessibilityLabel: 'Popup_CountdownPicker_Minutes',
                  style: _reactNative.StyleSheet.flatten([{ width: width, height: 220 }, minutePickerStyle]),
                  selectedValue: _this2.state.minute,
                  onValueChange: _this2.handleMinuteChange,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 214
                  }
                },
                _this2.Minutes.map(function (k) {
                  return _react2.default.createElement(_pickerView2.default.Item, { key: k, label: '' + k, value: k, __source: {
                      fileName: _jsxFileName,
                      lineNumber: 222
                    }
                  });
                })
              ),
              _react2.default.createElement(_styled.StyledPickerUnitText, {
                style: _reactNative.StyleSheet.flatten([{ marginLeft: -(width / 2) + 20 }, minuteUnitStyle]),
                pointerEvents: 'none',
                pickerUnitColor: countUnitColor,
                text: minuteText,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 225
                }
              })
            )
          );
        }
      );
    }
  }, {
    key: 'renderTwoPicker',
    value: function renderTwoPicker() {
      var _this3 = this;

      var _props2 = this.props,
          min = _props2.min,
          max = _props2.max,
          switchValue = _props2.switchValue,
          countdownWrapperStyle = _props2.countdownWrapperStyle,
          pickerFontColor = _props2.pickerFontColor,
          pickerUnitColor = _props2.pickerUnitColor,
          hourText = _props2.hourText,
          minuteText = _props2.minuteText,
          hourPickerStyle = _props2.hourPickerStyle,
          hourUnitStyle = _props2.hourUnitStyle,
          minutePickerStyle = _props2.minutePickerStyle,
          minuteUnitStyle = _props2.minuteUnitStyle;

      var isMaxHour = this.state.hour === parseInt(max / 60, 10);
      var isMinHour = this.state.hour === parseInt(min / 60, 10);
      var minuteValues = void 0;
      if (isMaxHour && isMinHour) {
        minuteValues = this.EqualMinutes;
      } else if (isMaxHour && !isMinHour) {
        minuteValues = this.RemainMinutes;
      } else if (isMinHour && !isMaxHour) {
        minuteValues = this.shiftMinutes;
      } else {
        minuteValues = this.Minutes;
      }
      return _react2.default.createElement(
        ThemeConsumer,
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 267
          }
        },
        function (globalTheme) {
          var countdownTheme = _extends({}, _this3.props, { theme: globalTheme });
          var countFontColor = pickerFontColor || getTheme(countdownTheme, 'popup.cellFontColor');
          var countUnitColor = pickerUnitColor || getTheme(countdownTheme, 'popup.cellFontColor');
          return _react2.default.createElement(
            _styled.StyledCountdownContainer,
            {
              style: _reactNative.StyleSheet.flatten([countdownWrapperStyle, !switchValue && { opacity: 0.6 }]),
              pointerEvents: !switchValue ? 'none' : 'auto',
              __source: {
                fileName: _jsxFileName,
                lineNumber: 273
              }
            },
            _react2.default.createElement(
              _styled.StyledOverview,
              {
                style: {
                  flex: isIos ? 1.1 : 1.4,
                  height: 240
                },
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 277
                }
              },
              _react2.default.createElement(
                _pickerView2.default,
                {
                  theme: { fontColor: countFontColor },
                  accessibilityLabel: 'Popup_CountdownPicker_Hours',
                  style: _reactNative.StyleSheet.flatten([{
                    width: width * (7 / 10),
                    marginRight: isIos ? 0 : 20
                  }, hourPickerStyle]),
                  selectedValue: _this3.state.hour,
                  onValueChange: _this3.handleHourChange,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 283
                  }
                },
                _this3.Hours.map(function (k) {
                  return _react2.default.createElement(_pickerView2.default.Item, { key: k, label: toFixed(k, 2), value: k, __source: {
                      fileName: _jsxFileName,
                      lineNumber: 297
                    }
                  });
                })
              ),
              _react2.default.createElement(_styled.StyledPickerUnitText, {
                style: _reactNative.StyleSheet.flatten([{ marginLeft: -(width * (7 / 10 / 2)) + (isIos ? 15 : 0) }, hourUnitStyle]),
                pointerEvents: 'none',
                pickerUnitColor: countUnitColor,
                text: hourText,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 300
                }
              })
            ),
            _react2.default.createElement(
              _styled.StyledOverview,
              { style: { flex: 1 }, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 311
                }
              },
              _react2.default.createElement(
                _pickerView2.default,
                {
                  theme: { fontColor: countFontColor },
                  accessibilityLabel: 'Popup_CountdownPicker_Minutes',
                  selectedValue: _this3.state.minute,
                  onValueChange: _this3.handleMinuteChange,
                  itemAlign: _reactNative.I18nManager.isRTL ? 'flex-end' : 'flex-start',
                  style: _reactNative.StyleSheet.flatten([isIos ? {
                    width: width * (8 / 10),
                    marginLeft: -(width * 3) / 10
                  } : {
                    width: width * (7 / 10)
                  }, minutePickerStyle]),
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 312
                  }
                },
                minuteValues.map(function (k) {
                  return _react2.default.createElement(_pickerView2.default.Item, { key: k, label: toFixed(k, 2), value: k, __source: {
                      fileName: _jsxFileName,
                      lineNumber: 331
                    }
                  });
                })
              ),
              _react2.default.createElement(_styled.StyledPickerUnitText, {
                style: _reactNative.StyleSheet.flatten([{ marginLeft: isIos ? -(width * (8 / 10 / 2)) + 15 : -(width * (7 / 10)) + 28 }, minuteUnitStyle]),
                pointerEvents: 'none',
                pickerUnitColor: countUnitColor,
                text: minuteText,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 335
                }
              })
            )
          );
        }
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var onlyone = this.props.onlyone;

      return onlyone ? this.renderOnePicker() : this.renderTwoPicker();
    }
  }]);

  return CountdownPopup;
}(_react2.default.Component);

CountdownPopup.propTypes = {
  countdownWrapperStyle: _reactNative.ViewPropTypes.style,

  switchValue: _propTypes2.default.bool.isRequired,

  value: _propTypes2.default.number.isRequired,

  onlyone: _propTypes2.default.bool,

  max: _propTypes2.default.number,

  min: _propTypes2.default.number,

  step: _propTypes2.default.number,

  pickerFontColor: _reactNative.ColorPropType,

  pickerUnitColor: _reactNative.ColorPropType,

  hourText: _propTypes2.default.string,

  minuteText: _propTypes2.default.string,

  onValueChange: _propTypes2.default.func,

  _onDataChange: _propTypes2.default.func,

  hourPickerStyle: _reactNative.ViewPropTypes.style,

  hourUnitStyle: _reactNative.Text.propTypes.style,

  minutePickerStyle: _reactNative.ViewPropTypes.style,

  minuteUnitStyle: _reactNative.Text.propTypes.style
};
CountdownPopup.defaultProps = {
  countdownWrapperStyle: null,
  onlyone: false,
  max: 1440,
  min: 0,
  step: 1,
  pickerFontColor: null,
  pickerUnitColor: null,
  hourText: 'Hour',
  minuteText: 'Minute',
  onValueChange: function onValueChange() {},
  _onDataChange: function _onDataChange() {},
  hourPickerStyle: null,
  hourUnitStyle: null,
  minutePickerStyle: null,
  minuteUnitStyle: null
};
var CountdownModal = exports.CountdownModal = (0, _withSkeleton2.default)(CountdownPopup, true);

exports.default = (0, _withSkeleton2.default)(CountdownPopup);