Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/unit-text/unit-text-art.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _art = require('../iconfont/art');

var _art2 = _interopRequireDefault(_art);

var _defaultSvg = require('../iconfont/art/defaultSvg');

var _defaultSvg2 = _interopRequireDefault(_defaultSvg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LetterWidth = 0.37;
var LetterPadding = (1 - LetterWidth) / 2;

var UnitTextART = function (_React$PureComponent) {
  _inherits(UnitTextART, _React$PureComponent);

  function UnitTextART(props) {
    _classCallCheck(this, UnitTextART);

    var _this = _possibleConstructorReturn(this, (UnitTextART.__proto__ || Object.getPrototypeOf(UnitTextART)).call(this, props));

    _this.state = {
      value: props.value || '',
      unit: props.unit
    };
    return _this;
  }

  _createClass(UnitTextART, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.state.value || nextProps.unit !== this.state.unit) {
        this.setState({
          value: nextProps.value,
          unit: nextProps.unit
        });
      }
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      if (value !== this.state.value) {
        this.setState({ value: '' + value });
      }
    }
  }, {
    key: 'setUnit',
    value: function setUnit(unit) {
      if (unit !== this.state.unit) {
        this.setState({ unit: '' + unit });
      }
    }
  }, {
    key: 'renderUnit',
    value: function renderUnit() {
      var _props = this.props,
          unitSize = _props.unitSize,
          valueSize = _props.valueSize,
          size = _props.size,
          unitColor = _props.unitColor,
          unitPaddingLeft = _props.unitPaddingLeft,
          unitPaddingTop = _props.unitPaddingTop;
      var unit = this.state.unit;

      if (!unit) {
        return null;
      }
      var uSize = unitSize || size / 2;
      var isRtl = _reactNative.I18nManager.isRTL;
      var marginType = isRtl ? 'marginRight' : 'marginLeft';
      var vSize = valueSize || size;
      var uNeedLeft = (vSize + uSize) * (LetterPadding - 0.025);
      var unitStyle = [_defineProperty({ marginTop: unitPaddingTop }, marginType, -uNeedLeft + unitPaddingLeft)];
      return _react2.default.createElement(_art2.default, { d: _defaultSvg2.default[unit] || unit, size: uSize, style: unitStyle, color: unitColor, __source: {
          fileName: _jsxFileName,
          lineNumber: 114
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          style = _props2.style,
          size = _props2.size,
          valueSize = _props2.valueSize,
          valueColor = _props2.valueColor,
          valueColors = _props2.valueColors,
          unit = _props2.unit,
          unitSize = _props2.unitSize,
          unitColor = _props2.unitColor,
          unitPaddingLeft = _props2.unitPaddingLeft,
          unitPaddingTop = _props2.unitPaddingTop,
          value = _props2.value,
          rest = _objectWithoutProperties(_props2, ['style', 'size', 'valueSize', 'valueColor', 'valueColors', 'unit', 'unitSize', 'unitColor', 'unitPaddingLeft', 'unitPaddingTop', 'value']);

      var isRtl = _reactNative.I18nManager.isRTL;
      var letter = ('' + this.state.value).split('');
      if (!letter || !letter.length) return null;
      var vSize = valueSize || size;
      var needLeft = vSize * (LetterPadding * 2 - 0.05);
      var marginType = isRtl ? 'marginRight' : 'marginLeft';
      var wrapperStyle = [styles.wrapperStyle, { flexDirection: isRtl ? 'row-reverse' : 'row' }, style];
      return _react2.default.createElement(
        _reactNative.View,
        _extends({}, rest, { style: wrapperStyle, __source: {
            fileName: _jsxFileName,
            lineNumber: 144
          }
        }),
        letter.map(function (l, i) {
          var letterStyle = [i !== 0 && _defineProperty({}, marginType, -needLeft)];
          var color = valueColors[i] ? valueColors[i] : valueColor;
          return _react2.default.createElement(_art2.default, {
            name: l,
            size: vSize,
            style: letterStyle,
            key: 'TYUnitText_' + l + '_' + (i + 1),
            color: color,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 149
            }
          });
        }),
        this.renderUnit()
      );
    }
  }]);

  return UnitTextART;
}(_react2.default.PureComponent);

UnitTextART.propTypes = {
  style: _reactNative.ViewPropTypes.style,

  size: _propTypes2.default.number,

  valueSize: _propTypes2.default.number,

  valueColors: _propTypes2.default.array,

  valueColor: _propTypes2.default.string,

  unit: _propTypes2.default.string,

  unitSize: _propTypes2.default.number,

  unitColor: _propTypes2.default.string,

  unitPaddingLeft: _propTypes2.default.number,

  unitPaddingTop: _propTypes2.default.number,

  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]).isRequired
};
UnitTextART.defaultProps = {
  style: null,
  unit: '',
  valueSize: null,
  unitSize: null,
  size: 96,
  valueColors: [],
  valueColor: 'white',
  unitColor: 'white',
  unitPaddingLeft: 0,
  unitPaddingTop: 0
};
exports.default = UnitTextART;


var styles = _reactNative.StyleSheet.create({
  wrapperStyle: {
    justifyContent: 'center'
  }
});