Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberSelectorModal = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/popup/number-selector.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _utils = require('../../utils');

var _withSkeleton = require('./withSkeleton');

var _withSkeleton2 = _interopRequireDefault(_withSkeleton);

var _styled = require('./styled');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var scaleNumber = _utils.NumberUtils.scaleNumber,
    inMaxMin = _utils.NumberUtils.inMaxMin;

var NumberSelectorPopup = function (_Component) {
  _inherits(NumberSelectorPopup, _Component);

  function NumberSelectorPopup(props) {
    _classCallCheck(this, NumberSelectorPopup);

    var _this = _possibleConstructorReturn(this, (NumberSelectorPopup.__proto__ || Object.getPrototypeOf(NumberSelectorPopup)).call(this, props));

    _this._handleValueChange = function (value) {
      var _this$props = _this.props,
          onValueChange = _this$props.onValueChange,
          _onDataChange = _this$props._onDataChange;

      onValueChange && onValueChange(value);
      _onDataChange && _onDataChange(value);
      _this.setState({ value: value });
    };

    _this._handleReduce = function () {
      var _this$props2 = _this.props,
          min = _this$props2.min,
          step = _this$props2.step,
          onValueChange = _this$props2.onValueChange,
          _onDataChange = _this$props2._onDataChange;

      _this.setState(function (_ref) {
        var value = _ref.value;

        var newValue = +value - step * _this._stepLevel;
        var realValue = newValue >= min ? newValue : min;
        if (realValue === value) {
          return;
        }
        onValueChange && onValueChange(realValue);
        _onDataChange && _onDataChange(realValue);
        return {
          value: realValue
        };
      });
    };

    _this._handleAdd = function () {
      var _this$props3 = _this.props,
          max = _this$props3.max,
          step = _this$props3.step,
          onValueChange = _this$props3.onValueChange,
          _onDataChange = _this$props3._onDataChange;

      _this.setState(function (_ref2) {
        var value = _ref2.value;

        var newValue = +value + step * _this._stepLevel;
        var realValue = newValue <= max ? newValue : max;
        if (realValue === value) {
          return;
        }
        onValueChange && onValueChange(realValue);
        _onDataChange && _onDataChange(realValue);
        return {
          value: realValue
        };
      });
    };

    _this._handlePressIn = function (isAdd) {
      return function () {
        var runner = function runner() {
          if (isAdd) {
            _this._handleAdd();
          } else {
            _this._handleReduce();
          }
        };
        runner();
        _this.clearInterval();
        _this._interval = setInterval(function () {
          var now = Date.now();
          if (!_this._pressInTime) {
            _this._pressInTime = now;
          } else {
            var level = Math.floor((now - _this._pressInTime) / 100);
            level = inMaxMin(1, 20, level);
            _this._stepLevel = level;
          }
          runner();
        }, 100);
      };
    };

    _this._handlePressOut = function () {
      _this._stepLevel = 1;
      _this._pressInTime = null;
      _this.clearInterval();
    };

    _this._interval = null;
    _this._stepLevel = 1;
    _this._pressInTime = null;
    _this.state = {
      value: props.value
    };
    props._onDataChange(_this.state.value);
    return _this;
  }

  _createClass(NumberSelectorPopup, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.value !== nextProps.value) {
        this.setState({ value: +nextProps.value });
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
      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }
    })
  }, {
    key: 'renderMinusBtn',
    value: function renderMinusBtn(props) {
      var _props = this.props,
          min = _props.min,
          switchValue = _props.switchValue;

      var disabled = !switchValue || this.state.value === min;
      return _react2.default.createElement(_styled.StyledSliderBtn, _extends({
        icon: 'minus',
        disabled: disabled,
        onPressIn: this._handlePressIn(false),
        onPressOut: this._handlePressOut
      }, props, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 171
        }
      }));
    }
  }, {
    key: 'renderPlusBtn',
    value: function renderPlusBtn(props) {
      var _props2 = this.props,
          max = _props2.max,
          switchValue = _props2.switchValue;

      var disabled = !switchValue || this.state.value === max;
      return _react2.default.createElement(_styled.StyledSliderBtn, _extends({
        icon: 'plus',
        disabled: disabled,
        onPressIn: this._handlePressIn(true),
        onPressOut: this._handlePressOut
      }, props, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 185
        }
      }));
    }
  }, {
    key: 'renderContent',
    value: function renderContent() {
      var _props3 = this.props,
          switchValue = _props3.switchValue,
          numberSelectorWrapperStyle = _props3.numberSelectorWrapperStyle,
          type = _props3.type,
          scale = _props3.scale,
          min = _props3.min,
          max = _props3.max,
          step = _props3.step,
          value = _props3.value,
          onValueChange = _props3.onValueChange,
          _onDataChange = _props3._onDataChange,
          sliderProps = _objectWithoutProperties(_props3, ['switchValue', 'numberSelectorWrapperStyle', 'type', 'scale', 'min', 'max', 'step', 'value', 'onValueChange', '_onDataChange']);

      var opacityStyle = { opacity: switchValue ? 1 : 0.6 };
      var content = void 0;
      switch (type) {
        case 'slider':
          {
            var sliderBtnProps = {
              iconSize: 18,
              disabled: false,
              onPressIn: function onPressIn() {},
              onPressOut: function onPressOut() {}
            };
            content = _react2.default.createElement(
              _styled.StyledSliderContent,
              {
                style: [{ flexDirection: 'column' }, numberSelectorWrapperStyle],
                flexDirection: 'column',
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 221
                }
              },
              _react2.default.createElement(
                _styled.StyledDisplayText,
                { style: opacityStyle, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 225
                  }
                },
                '' + scaleNumber(scale, this.state.value)
              ),
              _react2.default.createElement(
                _styled.StyledSliderContainer,
                {
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 228
                  }
                },
                this.renderMinusBtn(sliderBtnProps),
                _react2.default.createElement(_styled.StyledSlider, _extends({
                  style: opacityStyle,
                  value: this.state.value,
                  stepValue: step,
                  minimumValue: min,
                  maximumValue: max
                }, sliderProps, {
                  onValueChange: this._handleValueChange,
                  onSlidingComplete: this._handleValueChange,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 230
                  }
                })),
                this.renderPlusBtn(sliderBtnProps)
              )
            );
          }
          break;
        default:
          content = _react2.default.createElement(
            _styled.StyledSliderContent,
            { style: numberSelectorWrapperStyle, __source: {
                fileName: _jsxFileName,
                lineNumber: 248
              }
            },
            this.renderMinusBtn(),
            _react2.default.createElement(
              _styled.StyledDisplayText,
              { style: opacityStyle, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 250
                }
              },
              '' + scaleNumber(scale, this.state.value)
            ),
            this.renderPlusBtn()
          );
          break;
      }
      return content;
    }
  }, {
    key: 'render',
    value: function render() {
      var disabled = !this.props.switchValue;
      return _react2.default.createElement(
        _reactNative.View,
        { pointerEvents: disabled ? 'none' : 'auto', __source: {
            fileName: _jsxFileName,
            lineNumber: 263
          }
        },
        this.renderContent()
      );
    }
  }]);

  return NumberSelectorPopup;
}(_react.Component);

NumberSelectorPopup.propTypes = {
  numberSelectorWrapperStyle: _reactNative.ViewPropTypes.style,

  switchValue: _propTypes2.default.bool.isRequired,

  type: _propTypes2.default.oneOf(['basic', 'slider']),

  value: _propTypes2.default.number.isRequired,

  max: _propTypes2.default.number,

  min: _propTypes2.default.number,

  step: _propTypes2.default.number,

  scale: _propTypes2.default.number,

  onValueChange: _propTypes2.default.func,

  _onDataChange: _propTypes2.default.func
};
NumberSelectorPopup.defaultProps = {
  numberSelectorWrapperStyle: null,
  type: 'basic',
  max: 100,
  min: 0,
  step: 1,
  scale: 0,
  onValueChange: function onValueChange() {},
  _onDataChange: function _onDataChange() {}
};
var NumberSelectorModal = exports.NumberSelectorModal = (0, _withSkeleton2.default)(NumberSelectorPopup, true);

exports.default = (0, _withSkeleton2.default)(NumberSelectorPopup);