Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/TYText/index.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactNative = require('react-native');

var _styled = require('./styled');

var _styled2 = _interopRequireDefault(_styled);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TYText = function (_React$Component) {
  _inherits(TYText, _React$Component);

  function TYText(props) {
    _classCallCheck(this, TYText);

    var _this = _possibleConstructorReturn(this, (TYText.__proto__ || Object.getPrototypeOf(TYText)).call(this, props));

    _this.setText = function (text) {
      _this.setState({ text: text });
    };

    _this.setNativeProps = function (nativeProps) {
      _this._text.setNativeProps(nativeProps);
    };

    _this.state = {
      text: props.text ? props.text : props.children
    };
    return _this;
  }

  _createClass(TYText, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({ text: nextProps.text ? nextProps.text : nextProps.children });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          style = _props.style,
          size = _props.size,
          props = _objectWithoutProperties(_props, ['style', 'size']);

      var _StyleSheet$flatten = _reactNative.StyleSheet.flatten([style]),
          fontSize = _StyleSheet$flatten.fontSize;

      var realSize = fontSize || size;
      return _react2.default.createElement(
        _styled2.default,
        _extends({
          style: style,
          ref: function ref(_ref) {
            _this2._text = _ref;
          },
          allowFontScaling: false,
          size: realSize
        }, props, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 52
          }
        }),
        this.state.text
      );
    }
  }]);

  return TYText;
}(_react2.default.Component);

TYText.propTypes = _extends({
  type: _propTypes2.default.oneOf(['heading', 'title', 'paragraph']),
  size: _propTypes2.default.oneOfType([_propTypes2.default.oneOf(['large', 'normal', 'small']), _propTypes2.default.number]),
  align: _propTypes2.default.oneOf(['left', 'center', 'right']),
  weight: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  color: _reactNative.ColorPropType
}, _reactNative.Text.propTypes);
TYText.defaultProps = {
  type: null,
  size: null,
  align: null,
  weight: null,
  color: null
};
exports.default = TYText;