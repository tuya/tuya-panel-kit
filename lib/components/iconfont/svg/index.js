Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/iconfont/svg/index.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _reactNativeSvg = require('react-native-svg');

var _defaultSvg = require('./defaultSvg');

var _defaultSvg2 = _interopRequireDefault(_defaultSvg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IconFont = function (_Component) {
  _inherits(IconFont, _Component);

  function IconFont() {
    _classCallCheck(this, IconFont);

    return _possibleConstructorReturn(this, (IconFont.__proto__ || Object.getPrototypeOf(IconFont)).apply(this, arguments));
  }

  _createClass(IconFont, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          viewBox = _props.viewBox,
          style = _props.style,
          name = _props.name,
          color = _props.color,
          size = _props.size,
          hFlip = _props.hFlip,
          vFlip = _props.vFlip,
          pathProps = _objectWithoutProperties(_props, ['viewBox', 'style', 'name', 'color', 'size', 'hFlip', 'vFlip']);

      var path = pathProps.d;
      if (!!name && typeof name === 'string') {
        var hasName = Object.prototype.hasOwnProperty.call(_defaultSvg2.default, name);
        path = hasName ? _defaultSvg2.default[name] : undefined;
      }
      var fill = this.props.fill || color;
      var stroke = this.props.stroke || color;
      var width = this.props.width || size;
      var height = this.props.height || size;

      if (!path) {
        return null;
      }

      var paths = [];
      if (typeof path === 'string') {
        paths = [path];
      } else {
        paths = path;
      }
      var count = paths.length;

      if (count === 0) {
        return null;
      }

      var transform = [];
      if (hFlip) {
        transform.push({ rotateY: '180deg' });
      }
      if (vFlip) {
        transform.push({ rotateX: '180deg' });
      }
      return _react2.default.createElement(
        _reactNative.View,
        {
          style: [styles.row, {
            width: width * count,
            height: height
          }, transform.length > 0 && transform, style],
          __source: {
            fileName: _jsxFileName,
            lineNumber: 99
          }
        },
        paths.map(function (pathData, i) {
          return _react2.default.createElement(
            _reactNativeSvg.Svg,
            { key: i, width: width, height: height, viewBox: viewBox, __source: {
                fileName: _jsxFileName,
                lineNumber: 112
              }
            },
            _react2.default.createElement(_reactNativeSvg.Path, _extends({}, pathProps, { fill: fill, stroke: stroke, d: pathData, __source: {
                fileName: _jsxFileName,
                lineNumber: 113
              }
            }))
          );
        })
      );
    }
  }]);

  return IconFont;
}(_react.Component);

IconFont.propTypes = {
  style: _reactNative.ViewPropTypes.style,
  viewBox: _propTypes2.default.string,

  name: _propTypes2.default.string,

  color: _reactNative.ColorPropType,

  size: _propTypes2.default.number,

  hFlip: _propTypes2.default.bool,

  vFlip: _propTypes2.default.bool,
  d: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]),
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  fill: _reactNative.ColorPropType,
  stroke: _reactNative.ColorPropType,
  strokeWidth: _propTypes2.default.number,
  strokeJoin: _propTypes2.default.oneOf(['round', 'miter', 'bevel']),
  strokeCap: _propTypes2.default.oneOf(['round', 'butt', 'square']),
  strokeDash: _propTypes2.default.arrayOf(_propTypes2.default.number)
};
IconFont.defaultProps = {
  style: null,
  viewBox: '0 0 1024 1024',
  name: null,
  color: '#000',
  size: 12,
  hFlip: false,
  vFlip: false,
  d: '',
  height: null,
  width: null,
  fill: null,
  stroke: null,
  strokeWidth: 1,
  strokeJoin: 'round',
  strokeCap: 'round',
  strokeDash: [0, 0]
};
exports.default = IconFont;


var styles = _reactNative.StyleSheet.create({
  row: {
    flexDirection: 'row'
  }
});