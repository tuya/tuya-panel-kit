Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/stepper/index.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactNative = require('react-native');

var _utils = require('../../utils');

var _styled = require('./styled');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var inMaxMin = _utils.NumberUtils.inMaxMin,
    add = _utils.NumberUtils.add,
    subtract = _utils.NumberUtils.subtract;

var Stepper = function (_PureComponent) {
  _inherits(Stepper, _PureComponent);

  function Stepper(props) {
    _classCallCheck(this, Stepper);

    var _this = _possibleConstructorReturn(this, (Stepper.__proto__ || Object.getPrototypeOf(Stepper)).call(this, props));

    _this._handleMath = function (isMinus) {
      var _this$props = _this.props,
          min = _this$props.min,
          max = _this$props.max,
          onValueChange = _this$props.onValueChange,
          stepValue = _this$props.stepValue;
      var value = _this.state.value;

      if (isMinus) {
        if (value > min) {
          var step = Math.min(stepValue, subtract(value, min));
          onValueChange && onValueChange(subtract(value, step));
          _this.setState({
            value: subtract(value, step)
          });
        }
      } else if (value <= max) {
        var _step = Math.min(stepValue, subtract(max, value));
        onValueChange && onValueChange(add(value, _step));
        _this.setState({
          value: add(value, _step)
        });
      }
    };

    _this._handlePressOut = function () {
      _this.clearInterval();
    };

    _this._handlePressIn = function (isMinus) {
      return function () {
        _this._handleMath(isMinus);
        _this.clearInterval();
        _this.timer = setInterval(function () {
          _this._handleMath(isMinus);
        }, 250);
      };
    };

    _this._handleChangeText = function (newValue) {
      var _this$props2 = _this.props,
          max = _this$props2.max,
          min = _this$props2.min;

      var idx = newValue.indexOf('.');
      if (!idx) return;
      if (idx === -1) {
        if (Number(newValue) > max || Number(newValue) < min || newValue.length === 2 && !newValue.indexOf('0') && newValue[1] !== '.') {
          return;
        }
        _this.setState({
          value: newValue
        });
      } else {
        if (Number(newValue.substr(0, idx)) >= max || Number(newValue.substr(0, idx)) < min || newValue.length > idx + 2) {
          return;
        }
        _this.setState({
          value: newValue
        });
      }
    };

    _this._handleEndText = function () {
      var _this$props3 = _this.props,
          min = _this$props3.min,
          onValueChange = _this$props3.onValueChange;
      var value = _this.state.value;

      var newValue = Number(value);
      if (typeof value === 'string' && !value.length) {
        onValueChange && onValueChange(min);
        _this.setState({
          value: min
        });
      } else {
        _this.setState({
          value: newValue
        });
        onValueChange && onValueChange(newValue);
      }
    };

    _this.renderEllipse = function () {
      var _this$props4 = _this.props,
          min = _this$props4.min,
          max = _this$props4.max,
          style = _this$props4.style,
          buttonStyle = _this$props4.buttonStyle,
          ellipseIconColor = _this$props4.ellipseIconColor,
          selectionColor = _this$props4.selectionColor,
          inputStyle = _this$props4.inputStyle,
          editable = _this$props4.editable,
          disabled = _this$props4.disabled,
          textInputProps = _objectWithoutProperties(_this$props4, ['min', 'max', 'style', 'buttonStyle', 'ellipseIconColor', 'selectionColor', 'inputStyle', 'editable', 'disabled']);

      var value = _this.state.value;

      return _react2.default.createElement(
        _styled.BigButton,
        { style: style, __source: {
            fileName: _jsxFileName,
            lineNumber: 237
          }
        },
        _react2.default.createElement(
          _styled.TouchableOpacityView,
          {
            style: buttonStyle,
            disabled: disabled || value === min,
            onPressOut: _this._handlePressOut,
            onPressIn: _this._handlePressIn(true),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 238
            }
          },
          _react2.default.createElement(_styled.StyledIconFont, {
            fill: ellipseIconColor,
            fillOpacity: disabled || value === min ? 0.4 : 1,
            name: 'minus',
            __source: {
              fileName: _jsxFileName,
              lineNumber: 244
            }
          })
        ),
        _react2.default.createElement(_styled.StyledInput, _extends({
          ref: function ref(_ref) {
            _this.TextInputRef = _ref;
          },
          maxLength: 4
        }, textInputProps, {
          style: [disabled && { color: 'rgba(51,51,51,.4)' }, inputStyle],
          onEndEditing: _this._handleEndText,
          value: value.toString(),
          onChangeText: _this._handleChangeText,
          keyboardType: 'numeric',
          selectionColor: selectionColor,
          enablesReturnKeyAutomatically: true,
          editable: !disabled && editable,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 250
          }
        })),
        _react2.default.createElement(
          _styled.TouchableOpacityView,
          {
            style: buttonStyle,
            disabled: disabled || value === max,
            onPressOut: _this._handlePressOut,
            onPressIn: _this._handlePressIn(false),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 265
            }
          },
          _react2.default.createElement(_styled.StyledIconFont, {
            fill: ellipseIconColor,
            fillOpacity: disabled || value === max ? 0.4 : 1,
            name: 'plus',
            __source: {
              fileName: _jsxFileName,
              lineNumber: 271
            }
          })
        )
      );
    };

    _this.renderTriangle = function () {
      var _this$props5 = _this.props,
          min = _this$props5.min,
          max = _this$props5.max,
          style = _this$props5.style,
          buttonStyle = _this$props5.buttonStyle,
          triangleIconColor = _this$props5.triangleIconColor,
          selectionColor = _this$props5.selectionColor,
          iconMinusPath = _this$props5.iconMinusPath,
          iconPlusPath = _this$props5.iconPlusPath,
          inputStyle = _this$props5.inputStyle,
          editable = _this$props5.editable,
          disabled = _this$props5.disabled,
          textInputProps = _objectWithoutProperties(_this$props5, ['min', 'max', 'style', 'buttonStyle', 'triangleIconColor', 'selectionColor', 'iconMinusPath', 'iconPlusPath', 'inputStyle', 'editable', 'disabled']);

      var value = _this.state.value;

      return _react2.default.createElement(
        _styled.RightView,
        { style: style, __source: {
            fileName: _jsxFileName,
            lineNumber: 298
          }
        },
        _react2.default.createElement(
          _styled.TouchableThreeView,
          {
            style: buttonStyle,
            disabled: disabled || value === min,
            onPressOut: _this._handlePressOut,
            onPressIn: _this._handlePressIn(true),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 299
            }
          },
          _react2.default.createElement(_styled.StyledIconFont, {
            fill: triangleIconColor,
            fillOpacity: disabled || value === min ? 0.4 : 1,
            d: iconMinusPath,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 305
            }
          })
        ),
        _react2.default.createElement(_styled.StyledInput, _extends({
          ref: function ref(_ref2) {
            _this.TextInputRef = _ref2;
          },
          maxLength: 4
        }, textInputProps, {
          editable: !disabled && editable,
          style: [disabled && { color: 'rgba(51,51,51,.4)' }, inputStyle],
          onEndEditing: _this._handleEndText,
          value: value.toString(),
          onChangeText: _this._handleChangeText,
          keyboardType: 'numeric',
          selectionColor: selectionColor,
          enablesReturnKeyAutomatically: true,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 311
          }
        })),
        _react2.default.createElement(
          _styled.TouchableThreeView,
          {
            style: buttonStyle,
            disabled: disabled || value === max,
            onPressOut: _this._handlePressOut,
            onPressIn: _this._handlePressIn(false),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 326
            }
          },
          _react2.default.createElement(_styled.StyledIconFont, {
            fill: triangleIconColor,
            fillOpacity: disabled || value === max ? 0.4 : 1,
            d: iconPlusPath,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 332
            }
          })
        )
      );
    };

    _this.state = {
      value: inMaxMin(props.min, props.max, props.value)
    };
    return _this;
  }

  _createClass(Stepper, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var getTextInputRef = this.props.getTextInputRef;

      getTextInputRef && getTextInputRef(this.TextInputRef);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.value !== nextProps.value) {
        this.setState({
          value: nextProps.value
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.clearInterval();
    }
  }, {
    key: 'clearInterval',
    value: function (_clearInterval) {
      function clearInterval() {
        return _clearInterval.apply(this, arguments);
      }

      clearInterval.toString = function () {
        return _clearInterval.toString();
      };

      return clearInterval;
    }(function () {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    })
  }, {
    key: 'render',
    value: function render() {
      var buttonType = this.props.buttonType;

      return buttonType === 'ellipse' ? this.renderEllipse() : this.renderTriangle();
    }
  }]);

  return Stepper;
}(_react.PureComponent);

Stepper.propTypes = {
  style: _reactNative.ViewPropTypes.style,

  inputStyle: _reactNative.ViewPropTypes.style,

  buttonStyle: _reactNative.ViewPropTypes.style,

  editable: _propTypes2.default.bool,

  buttonType: _propTypes2.default.oneOf(['ellipse', 'triangle']),

  min: _propTypes2.default.number,

  max: _propTypes2.default.number,

  value: _propTypes2.default.number,

  stepValue: _propTypes2.default.number,

  ellipseIconColor: _propTypes2.default.string,

  triangleIconColor: _propTypes2.default.string,

  selectionColor: _propTypes2.default.string,

  iconMinusPath: _propTypes2.default.string,

  iconPlusPath: _propTypes2.default.string,

  onValueChange: _propTypes2.default.func,

  disabled: _propTypes2.default.bool,

  getTextInputRef: _propTypes2.default.func
};
Stepper.defaultProps = {
  style: {},
  buttonStyle: {},
  inputStyle: {},
  editable: true,
  min: 0,
  value: 20,
  max: 99,
  stepValue: 1,
  ellipseIconColor: '#333',
  selectionColor: '#FF4800',
  buttonType: 'ellipse',
  iconMinusPath: _styled.dMinus,
  iconPlusPath: _styled.dPlus,
  triangleIconColor: '#FF4800',
  onValueChange: function onValueChange() {},
  disabled: false,
  getTextInputRef: function getTextInputRef() {}
};
exports.default = Stepper;