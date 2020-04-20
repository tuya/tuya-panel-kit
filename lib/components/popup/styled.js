Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledIconFont = exports.StyledFlatList = exports.StyledDatePicker = exports.StyledDisplayText = exports.StyledSliderBtn = exports.StyledSlider = exports.StyledSliderContainer = exports.StyledSliderContent = exports.StyledTimerPicker = exports.StyledSymbolText = exports.StyledTimerPickerRow = exports.StyledTimerPickerContainer = exports.StyledOverview = exports.StyledCountdownContainer = exports.StyledPickerUnitText = exports.StyledPickerUnit = exports.StyledPickerContainer = exports.StyledBackIcon = exports.StyledBackText = exports.StyledTouchView = exports.StyledBackView = exports.StyledSubTitleText = exports.StyledConfirmText = exports.StyledCancelText = exports.StyledButton = exports.StyledFooter = exports.StyledSwitch = exports.StyledTitleText = exports.StyledTitle = exports.StyledContainer = exports.Row = exports.backIcon = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/popup/styled.js';

var _templateObject = _taggedTemplateLiteral(['\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  height: ', 'px;\n  background-color: ', ';\n'], ['\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  height: ', 'px;\n  background-color: ', ';\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  /* bottom: -100%; */\n  border-top-left-radius: ', ';\n  border-top-right-radius: ', ';\n  border-bottom-left-radius: ', ';\n  border-bottom-right-radius: ', ';\n  background-color: ', ';\n'], ['\n  /* bottom: -100%; */\n  border-top-left-radius: ', ';\n  border-top-right-radius: ', ';\n  border-bottom-left-radius: ', ';\n  border-bottom-right-radius: ', ';\n  background-color: ', ';\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  justify-content: space-around;\n  height: ', 'px;\n  background-color: ', ';\n  border-top-left-radius: ', ';\n  border-top-right-radius: ', ';\n  border-bottom-color: ', ';\n  border-bottom-width: ', ';\n'], ['\n  justify-content: space-around;\n  height: ', 'px;\n  background-color: ', ';\n  border-top-left-radius: ', ';\n  border-top-right-radius: ', ';\n  border-bottom-color: ', ';\n  border-bottom-width: ', ';\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  font-size: ', ';\n  color: ', ';\n'], ['\n  font-size: ', ';\n  color: ', ';\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n  position: absolute;\n  right: ', 'px;\n'], ['\n  position: absolute;\n  right: ', 'px;\n']),
    _templateObject6 = _taggedTemplateLiteral(['\n  padding-bottom: ', ';\n  margin-top: ', 'px;\n  border-bottom-left-radius: ', ';\n  border-bottom-right-radius: ', ';\n  height: ', 'px;\n'], ['\n  padding-bottom: ', ';\n  margin-top: ', 'px;\n  border-bottom-left-radius: ', ';\n  border-bottom-right-radius: ', ';\n  height: ', 'px;\n']),
    _templateObject7 = _taggedTemplateLiteral(['\n  flex: 1;\n  margin: 12px 0;\n  align-self: stretch;\n  align-items: center;\n  justify-content: center;\n  border-right-width: ', ';\n  border-right-color: ', ';\n'], ['\n  flex: 1;\n  margin: 12px 0;\n  align-self: stretch;\n  align-items: center;\n  justify-content: center;\n  border-right-width: ', ';\n  border-right-color: ', ';\n']),
    _templateObject8 = _taggedTemplateLiteral(['\n  font-weight: bold;\n  font-size: ', ';\n  color: ', ';\n'], ['\n  font-weight: bold;\n  font-size: ', ';\n  color: ', ';\n']),
    _templateObject9 = _taggedTemplateLiteral(['\n  font-size: ', ';\n  color: ', ';\n  margin-top: ', 'px;\n'], ['\n  font-size: ', ';\n  color: ', ';\n  margin-top: ', 'px;\n']),
    _templateObject10 = _taggedTemplateLiteral(['\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  position: absolute;\n  left: 12px;\n'], ['\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  position: absolute;\n  left: 12px;\n']),
    _templateObject11 = _taggedTemplateLiteral(['\n  width: ', 'px;\n  height: ', 'px;\n  align-items: center;\n  justify-content: center;\n'], ['\n  width: ', 'px;\n  height: ', 'px;\n  align-items: center;\n  justify-content: center;\n']),
    _templateObject12 = _taggedTemplateLiteral([''], ['']),
    _templateObject13 = _taggedTemplateLiteral(['\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  background-color: ', ';\n  opacity: ', ';\n'], ['\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  background-color: ', ';\n  opacity: ', ';\n']),
    _templateObject14 = _taggedTemplateLiteral(['\n  position: absolute;\n  top: 0;\n  align-items: center;\n  justify-content: center;\n'], ['\n  position: absolute;\n  top: 0;\n  align-items: center;\n  justify-content: center;\n']),
    _templateObject15 = _taggedTemplateLiteral(['\n  flex-direction: row;\n  align-items: center;\n  padding: 1px 0;\n  background-color: ', ';\n'], ['\n  flex-direction: row;\n  align-items: center;\n  padding: 1px 0;\n  background-color: ', ';\n']),
    _templateObject16 = _taggedTemplateLiteral(['\n  flex-direction: row;\n  align-items: center;\n  overflow: hidden;\n'], ['\n  flex-direction: row;\n  align-items: center;\n  overflow: hidden;\n']),
    _templateObject17 = _taggedTemplateLiteral(['\n  height: 300px;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  padding: 0 24px;\n'], ['\n  height: 300px;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  padding: 0 24px;\n']),
    _templateObject18 = _taggedTemplateLiteral(['\n  flex: 1;\n  flex-direction: row;\n'], ['\n  flex: 1;\n  flex-direction: row;\n']),
    _templateObject19 = _taggedTemplateLiteral(['\n  padding: 0 18px;\n  font-size: ', ';\n  color: ', ';\n'], ['\n  padding: 0 18px;\n  font-size: ', ';\n  color: ', ';\n']),
    _templateObject20 = _taggedTemplateLiteral(['\n  padding: 32px 0px;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  background-color: ', ';\n'], ['\n  padding: 32px 0px;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  background-color: ', ';\n']),
    _templateObject21 = _taggedTemplateLiteral(['\n  height: 56px;\n  margin-top: 16px;\n  flex-direction: ', ';\n  align-items: center;\n  justify-content: center;\n'], ['\n  height: 56px;\n  margin-top: 16px;\n  flex-direction: ', ';\n  align-items: center;\n  justify-content: center;\n']),
    _templateObject22 = _taggedTemplateLiteral(['\n  width: ', 'px;\n  margin: 0 12px;\n'], ['\n  width: ', 'px;\n  margin: 0 12px;\n']),
    _templateObject23 = _taggedTemplateLiteral(['\n  opacity: ', ';\n'], ['\n  opacity: ', ';\n']),
    _templateObject24 = _taggedTemplateLiteral(['\n  width: ', '; /* \u907F\u514D\u663E\u793A\u8FC7\u957F\u6587\u6848 */\n  text-align: center;\n  font-weight: 500;\n  font-size: 56px;\n  color: ', ';\n  background-color: transparent;\n'], ['\n  width: ', '; /* \u907F\u514D\u663E\u793A\u8FC7\u957F\u6587\u6848 */\n  text-align: center;\n  font-weight: 500;\n  font-size: 56px;\n  color: ', ';\n  background-color: transparent;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _native = require('styled-components/native');

var _native2 = _interopRequireDefault(_native);

var _utils = require('../../utils');

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _TYText = require('../TYText');

var _TYText2 = _interopRequireDefault(_TYText);

var _slider = require('../slider');

var _slider2 = _interopRequireDefault(_slider);

var _iconfont = require('../iconfont');

var _iconfont2 = _interopRequireDefault(_iconfont);

var _timerPicker = require('../timer-picker');

var _timerPicker2 = _interopRequireDefault(_timerPicker);

var _list = require('../TYLists/list');

var _list2 = _interopRequireDefault(_list);

var _datePicker = require('../date-picker');

var _datePicker2 = _interopRequireDefault(_datePicker);

var _switchButton = require('../switch-button');

var _switchButton2 = _interopRequireDefault(_switchButton);

var _theme = require('../theme');

var _themeGet = require('../theme/theme-get');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var DEFAULT_LIST_THEME = _theme.defaultTheme.popup.basic;
var DEFAULT_PICKER_THEME = _theme.defaultTheme.picker.light;

var backIcon = exports.backIcon = 'M770.673778 21.959111a56.888889 56.888889 0 0 1 0 80.440889l-402.204445 402.318222 402.204445 402.204445a56.888889 56.888889 0 0 1-80.440889 80.497777L247.751111 544.938667a56.888889 56.888889 0 0 1 0-80.497778L690.232889 21.959111a56.888889 56.888889 0 0 1 80.440889 0z';

var cx = _utils.RatioUtils.convertX,
    isIphoneX = _utils.RatioUtils.isIphoneX;
var getTheme = _utils.ThemeUtils.getTheme,
    ThemeConsumer = _utils.ThemeUtils.ThemeConsumer;
var cellHeight = _themeGet.popup.cellHeight,
    cellBg = _themeGet.popup.cellBg,
    cellFontSize = _themeGet.popup.cellFontSize,
    cellFontColor = _themeGet.popup.cellFontColor,
    titleRadius = _themeGet.popup.titleRadius,
    titleHeight = _themeGet.popup.titleHeight,
    titleBg = _themeGet.popup.titleBg,
    footerRadius = _themeGet.popup.footerRadius,
    bottomBg = _themeGet.popup.bottomBg,
    lineColor = _themeGet.popup.lineColor,
    titleFontSize = _themeGet.popup.titleFontSize,
    titleFontColor = _themeGet.popup.titleFontColor,
    cancelFontSize = _themeGet.popup.cancelFontSize,
    cancelFontColor = _themeGet.popup.cancelFontColor,
    confirmFontSize = _themeGet.popup.confirmFontSize,
    confirmFontColor = _themeGet.popup.confirmFontColor,
    subTitleFontColor = _themeGet.popup.subTitleFontColor,
    backIconColor = _themeGet.popup.backIconColor;
var Row = exports.Row = (0, _native2.default)(_reactNative.View)(_templateObject, cellHeight, cellBg);

var StyledContainer = exports.StyledContainer = (0, _native2.default)(_reactNative.View)(_templateObject2, titleRadius, titleRadius, footerRadius, footerRadius, bottomBg);

var StyledTitle = exports.StyledTitle = (0, _native2.default)(Row)(_templateObject3, titleHeight, titleBg, titleRadius, titleRadius, lineColor, _reactNative.StyleSheet.hairlineWidth);

var StyledTitleText = exports.StyledTitleText = (0, _native2.default)(_TYText2.default)(_templateObject4, titleFontSize, titleFontColor);

var StyledSwitch = exports.StyledSwitch = (0, _native2.default)(_switchButton2.default).attrs({
  tintColor: function tintColor(props) {
    return getTheme(props, 'popup.tintColor', '#e5e5e5');
  }
})(_templateObject5, cx(16));

var StyledFooter = exports.StyledFooter = (0, _native2.default)(Row)(_templateObject6, isIphoneX ? 20 : 0, cx(6), footerRadius, footerRadius, function (props) {
  var height = cellHeight(props);
  return isIphoneX ? height + 20 : height;
});

var StyledButton = exports.StyledButton = (0, _native2.default)(_reactNative.TouchableOpacity).attrs({
  activeOpacity: 0.8
})(_templateObject7, function (props) {
  return props.bordered ? _reactNative.StyleSheet.hairlineWidth : 0;
}, lineColor);

var StyledCancelText = exports.StyledCancelText = (0, _native2.default)(_TYText2.default)(_templateObject4, cancelFontSize, cancelFontColor);

var StyledConfirmText = exports.StyledConfirmText = (0, _native2.default)(_TYText2.default)(_templateObject8, confirmFontSize, confirmFontColor);

var StyledSubTitleText = exports.StyledSubTitleText = (0, _native2.default)(_TYText2.default)(_templateObject9, function (props) {
  var size = getTheme(props, 'popup.titleFontSize', DEFAULT_LIST_THEME.titleFontSize);
  return size * 6 / 7;
}, subTitleFontColor, cx(5));

var StyledBackView = exports.StyledBackView = (0, _native2.default)(_reactNative.View)(_templateObject10);

var StyledTouchView = exports.StyledTouchView = (0, _native2.default)(_reactNative.TouchableOpacity).attrs({
  touchableOpacity: 0.8
})(_templateObject11, cx(19), cx(18));

var StyledBackText = exports.StyledBackText = (0, _native2.default)(_TYText2.default).attrs({
  color: backIconColor,
  size: titleFontSize
})(_templateObject12);

var StyledBackIcon = function StyledBackIcon(props) {
  var color = props.color,
      rest = _objectWithoutProperties(props, ['color']);

  return _react2.default.createElement(
    ThemeConsumer,
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 156
      }
    },
    function (theme) {
      var propsWithTheme = _extends({}, props, { theme: theme });
      return _react2.default.createElement(_iconfont2.default, _extends({
        size: cx(18),
        color: color || getTheme(propsWithTheme, 'popup.backIconColor', DEFAULT_LIST_THEME.backIconColor)
      }, rest, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 160
        }
      }));
    }
  );
};

exports.StyledBackIcon = StyledBackIcon;
var StyledPickerContainer = exports.StyledPickerContainer = (0, _native2.default)(_reactNative.View)(_templateObject13, cellBg, function (props) {
  return props.disabled ? 0.6 : 1;
});

var StyledPickerUnit = exports.StyledPickerUnit = (0, _native2.default)(_reactNative.View)(_templateObject14);

var StyledPickerUnitText = exports.StyledPickerUnitText = (0, _native2.default)(_TYText2.default)(_templateObject4, cellFontSize, function (props) {
  return props.pickerUnitColor || cellFontColor;
});

var StyledCountdownContainer = exports.StyledCountdownContainer = (0, _native2.default)(_reactNative.View)(_templateObject15, cellBg);

var StyledOverview = exports.StyledOverview = (0, _native2.default)(_reactNative.View)(_templateObject16);

var StyledTimerPickerContainer = exports.StyledTimerPickerContainer = (0, _native2.default)(_reactNative.View)(_templateObject17);

var StyledTimerPickerRow = exports.StyledTimerPickerRow = (0, _native2.default)(_reactNative.View)(_templateObject18);

var StyledSymbolText = exports.StyledSymbolText = (0, _native2.default)(_TYText2.default)(_templateObject19, function (props) {
  return getTheme(props, 'picker.unitFontSize', DEFAULT_PICKER_THEME.unitFontSize);
}, function (props) {
  return getTheme(props, 'picker.unitFontColor', DEFAULT_PICKER_THEME.unitFontColor);
});

var StyledTimerPicker = exports.StyledTimerPicker = function StyledTimerPicker(props) {
  return _react2.default.createElement(
    ThemeConsumer,
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 237
      }
    },
    function (globalTheme) {
      var timerPickerTheme = _extends({}, props, { theme: globalTheme });
      var fontColor = getTheme(timerPickerTheme, 'popup.cellFontColor');
      var timerStyle = void 0;

      if (props.style && props.style.backgroundColor) {
        timerStyle = props.style;
      } else if (props.style) {
        timerStyle = _extends({}, props.style, {
          backgroundColor: getTheme(timerPickerTheme, 'popup.cellBg')
        });
      } else {
        timerStyle = { backgroundColor: getTheme(timerPickerTheme, 'popup.cellBg') };
      }
      return _react2.default.createElement(_timerPicker2.default, _extends({}, props, { pickerFontColor: fontColor, style: timerStyle, __source: {
          fileName: _jsxFileName,
          lineNumber: 253
        }
      }));
    }
  );
};

var StyledSliderContent = exports.StyledSliderContent = (0, _native2.default)(_reactNative.View)(_templateObject20, cellBg);

var StyledSliderContainer = exports.StyledSliderContainer = (0, _native2.default)(_reactNative.View)(_templateObject21, function (props) {
  return props.flexDirection || 'row';
});

var StyledSlider = exports.StyledSlider = (0, _native2.default)(_slider2.default).attrs({
  minimumTrackTintColor: '#0B7CFF',
  maximumTrackTintColor: function maximumTrackTintColor(props) {
    return getTheme(props, 'popup.numberSelector.maximumTrackTintColor');
  }
})(_templateObject22, cx(220));

var StyledSliderBtn = exports.StyledSliderBtn = (0, _native2.default)(_button2.default).attrs({
  iconSize: 26,
  iconColor: function iconColor(props) {
    return getTheme(props, 'popup.numberSelector.cellPlusColor');
  }
})(_templateObject23, function (props) {
  return props.disabled ? 0.6 : 1;
});

var StyledDisplayText = exports.StyledDisplayText = (0, _native2.default)(_TYText2.default).attrs({
  numberOfLines: 1
})(_templateObject24, cx(200), cellFontColor);

var StyledDatePicker = exports.StyledDatePicker = function StyledDatePicker(props) {
  return _react2.default.createElement(
    ThemeConsumer,
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 310
      }
    },
    function (globalTheme) {
      var datePickerTheme = _extends({}, props, { theme: globalTheme });
      var fontColor = getTheme(datePickerTheme, 'popup.cellFontColor');
      var dateStyle = void 0;

      if (props.style && props.style.backgroundColor) {
        dateStyle = props.style;
      } else if (props.style) {
        dateStyle = _extends({}, props.style, {
          backgroundColor: getTheme(datePickerTheme, 'popup.cellBg')
        });
      } else {
        dateStyle = { backgroundColor: getTheme(datePickerTheme, 'popup.cellBg') };
      }
      return _react2.default.createElement(_datePicker2.default, _extends({}, props, { pickerFontColor: fontColor, style: dateStyle, __source: {
          fileName: _jsxFileName,
          lineNumber: 326
        }
      }));
    }
  );
};

var StyledFlatList = exports.StyledFlatList = function StyledFlatList(props) {
  return _react2.default.createElement(
    ThemeConsumer,
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 338
      }
    },
    function (globalTheme) {
      var listTheme = _extends({}, props, { theme: globalTheme });
      return _react2.default.createElement(_list2.default, _extends({
        separatorStyle: {
          backgroundColor: getTheme(listTheme, 'popup.lineColor'),
          marginLeft: 0
        }
      }, props, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 342
        }
      }));
    }
  );
};

var StyledIconFont = function StyledIconFont(props) {
  var color = props.color,
      rest = _objectWithoutProperties(props, ['color']);

  return _react2.default.createElement(
    ThemeConsumer,
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 358
      }
    },
    function (theme) {
      var propsWithTheme = _extends({}, props, { theme: theme });
      return _react2.default.createElement(_iconfont2.default, _extends({
        size: cx(28),
        color: color || getTheme(propsWithTheme, 'popup.checkboxColor', DEFAULT_LIST_THEME.checkboxColor)
      }, rest, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 362
        }
      }));
    }
  );
};
exports.StyledIconFont = StyledIconFont;