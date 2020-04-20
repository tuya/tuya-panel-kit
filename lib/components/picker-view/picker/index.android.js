Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/picker-view/picker/index.android.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactNative = require('react-native');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WheelPickerView = (0, _reactNative.requireNativeComponent)('TYRCTWheelViewManager', WheelPicker);

var WheelPicker = function (_Component) {
  _inherits(WheelPicker, _Component);

  function WheelPicker(props) {
    _classCallCheck(this, WheelPicker);

    var _this = _possibleConstructorReturn(this, (WheelPicker.__proto__ || Object.getPrototypeOf(WheelPicker)).call(this, props));

    _this.onItemSelected = _this.onItemSelected.bind(_this);
    return _this;
  }

  _createClass(WheelPicker, [{
    key: 'onItemSelected',
    value: function onItemSelected(event) {
      if (!this.props.onValueChange) {
        return;
      }
      this.props.onValueChange(event);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(WheelPickerView, {
        accessibilityLabel: this.props.accessibilityLabel || 'PickerView',
        style: this.props.style,
        items: this.props.items,
        itemTextColor: this.props.itemTextColor,
        selectedItemTextColor: this.props.selectedItemTextColor,
        dividerColor: this.props.dividerColor,
        visibleItemCount: this.props.visibleItemCount,
        itemAlign: this.props.itemAlign,
        selectedIndex: this.props.selectedValue,
        textSize: this.props.textSize,
        loop: this.props.loop,
        onChange: this.onItemSelected,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        }
      });
    }
  }]);

  return WheelPicker;
}(_react.Component);

WheelPicker.propTypes = _extends({}, _reactNative.ViewPropTypes, {
  items: _propTypes2.default.array,
  itemTextColor: _propTypes2.default.string,
  selectedItemTextColor: _propTypes2.default.string,
  dividerColor: _propTypes2.default.string,
  visibleItemCount: _propTypes2.default.number,
  itemAlign: _propTypes2.default.string,
  selectedIndex: _propTypes2.default.number,
  textSize: _propTypes2.default.number,
  loop: _propTypes2.default.bool,
  onChange: _propTypes2.default.func
});

exports.default = WheelPicker;