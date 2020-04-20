Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/components/checkbox/index.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _styled = require('./styled');

var _defaultSvg = require('../iconfont/svg/defaultSvg');

var _defaultSvg2 = _interopRequireDefault(_defaultSvg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Checkbox = function (_Component) {
  _inherits(Checkbox, _Component);

  function Checkbox() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Checkbox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call.apply(_ref, [this].concat(args))), _this), _this._handleToggleCheck = function () {
      var _this$props = _this.props,
          checked = _this$props.checked,
          onChange = _this$props.onChange;

      onChange && onChange(!checked);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Checkbox, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          accessibilityLabel = _props.accessibilityLabel,
          style = _props.style,
          size = _props.size,
          disabled = _props.disabled,
          disabledColor = _props.disabledColor,
          checked = _props.checked,
          checkedIcon = _props.checkedIcon,
          unCheckedIcon = _props.unCheckedIcon,
          reverse = _props.reverse,
          hideOnUnselect = _props.hideOnUnselect,
          color = _props.color,
          children = _props.children;

      var iconPath = void 0;
      if (checked) {
        iconPath = checkedIcon || _defaultSvg2.default.selected;
      } else {
        iconPath = unCheckedIcon || _defaultSvg2.default.unselected;
      }
      var elements = [_react2.default.createElement(_styled.StyledIcon, {
        key: 'checkIcon',
        style: !checked && hideOnUnselect && { opacity: 0 },
        d: iconPath,
        activeColor: color,
        disabledColor: disabledColor,
        disabled: disabled,
        size: size,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 103
        }
      }), typeof children === 'string' ? _react2.default.createElement(
        _styled.StyledText,
        { key: 'checkText', disabled: disabled, __source: {
            fileName: _jsxFileName,
            lineNumber: 113
          }
        },
        children
      ) : children];
      if (reverse) {
        elements.reverse();
      }
      return _react2.default.createElement(
        _styled.StyledCheckbox,
        {
          accessibilityLabel: accessibilityLabel,
          style: style,
          activeOpacity: 0.8,
          onPress: this._handleToggleCheck,
          disabled: disabled,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 124
          }
        },
        _react2.default.createElement(
          _reactNative.View,
          { style: { flexDirection: 'row', alignItems: 'center', opacity: disabled ? 0.3 : 1 }, __source: {
              fileName: _jsxFileName,
              lineNumber: 131
            }
          },
          elements
        )
      );
    }
  }]);

  return Checkbox;
}(_react.Component);

Checkbox.propTypes = {
  accessibilityLabel: _propTypes2.default.string,

  style: _reactNative.ViewPropTypes.style,

  size: _propTypes2.default.number,

  disabled: _propTypes2.default.bool,

  disabledColor: _reactNative.ColorPropType,

  checked: _propTypes2.default.bool,

  checkedIcon: _propTypes2.default.string,

  unCheckedIcon: _propTypes2.default.string,

  reverse: _propTypes2.default.bool,

  hideOnUnselect: _propTypes2.default.bool,

  color: _reactNative.ColorPropType,

  onChange: _propTypes2.default.func,

  children: _propTypes2.default.any
};
Checkbox.defaultProps = {
  accessibilityLabel: 'Checkbox',
  style: null,
  size: 17,
  disabled: false,
  disabledColor: null,
  checked: false,
  checkedIcon: null,
  unCheckedIcon: null,
  reverse: false,
  hideOnUnselect: false,
  color: null,
  onChange: null,
  children: null
};
exports.default = Checkbox;