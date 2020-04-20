Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimerPickerModal = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/popup/timer-picker.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _timerPicker = require('../timer-picker');

var _timerPicker2 = _interopRequireDefault(_timerPicker);

var _withSkeleton = require('./withSkeleton');

var _withSkeleton2 = _interopRequireDefault(_withSkeleton);

var _styled = require('./styled');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimerPickerPopup = function (_React$Component) {
  _inherits(TimerPickerPopup, _React$Component);

  function TimerPickerPopup(props) {
    _classCallCheck(this, TimerPickerPopup);

    var _this = _possibleConstructorReturn(this, (TimerPickerPopup.__proto__ || Object.getPrototypeOf(TimerPickerPopup)).call(this, props));

    _this.handleTimerChange = function (startTime, endTime) {
      var _this$props = _this.props,
          onTimerChange = _this$props.onTimerChange,
          _onDataChange = _this$props._onDataChange;

      onTimerChange && onTimerChange(startTime, endTime);
      _onDataChange && _onDataChange({ startTime: startTime, endTime: endTime });
    };

    props._onDataChange({ startTime: props.startTime, endTime: props.endTime });
    return _this;
  }

  _createClass(TimerPickerPopup, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          switchValue = _props.switchValue,
          props = _objectWithoutProperties(_props, ['style', 'switchValue']);

      return _react2.default.createElement(_styled.StyledTimerPicker, _extends({
        style: _reactNative.StyleSheet.flatten([!switchValue && { opacity: 0.6 }, style]),
        disabled: !switchValue,
        onTimerChange: this.handleTimerChange
      }, props, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 33
        }
      }));
    }
  }]);

  return TimerPickerPopup;
}(_react2.default.Component);

TimerPickerPopup.propTypes = _extends({}, _timerPicker2.default.propTypes, {
  switchValue: _propTypes2.default.bool.isRequired,
  _onDataChange: _propTypes2.default.func
});
TimerPickerPopup.defaultProps = {
  _onDataChange: function _onDataChange() {}
};
var TimerPickerModal = exports.TimerPickerModal = (0, _withSkeleton2.default)(TimerPickerPopup, true);

exports.default = (0, _withSkeleton2.default)(TimerPickerPopup);