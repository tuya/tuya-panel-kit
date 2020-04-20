Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconSVG = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/iconfont/art/index.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactNative = require('react-native');

var _defaultSvg = require('./defaultSvg');

var _defaultSvg2 = _interopRequireDefault(_defaultSvg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Surface = _reactNative.ART.Surface,
    Shape = _reactNative.ART.Shape;

var ShapeKey = 0;

var IconSVG = exports.IconSVG = function (_React$Component) {
  _inherits(IconSVG, _React$Component);

  function IconSVG(props) {
    _classCallCheck(this, IconSVG);

    var _this = _possibleConstructorReturn(this, (IconSVG.__proto__ || Object.getPrototypeOf(IconSVG)).call(this, props));

    _this._setAppState = function (nextAppState) {
      if (_reactNative.Platform.OS === 'ios') return;
      _this.setState({
        currentAppState: nextAppState
      });
    };

    _this.state = {
      currentAppState: true
    };
    return _this;
  }

  _createClass(IconSVG, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _reactNative.AppState.addEventListener('change', this._setAppState);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _reactNative.AppState.removeEventListener('change', this._setAppState);
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;

      if (!props.d) return null;

      var d = [];
      if (typeof props.d === 'string') {
        d = [props.d];
      } else {
        d = props.d;
      }
      var count = d.length;
      if (count === 0) return null;

      var width = props.width,
          height = props.height;

      var offset = props.spaceOffset;

      var ShapeProps = {
        x: props.x,
        y: props.y,
        scaleX: props.scaleX || props.scale,
        scaleY: props.scaleY || props.scale,
        stroke: props.stroke,
        strokeWidth: props.strokeWidth,
        strokeCap: props.strokeCap,
        strokeDash: props.strokeDash,
        strokeJoin: props.strokeJoin,
        fill: props.fill
      };
      var transformStyle = {};
      var transform = [];
      if (props.hFlip) {
        transform.push({
          rotateY: '180deg'
        });
      }

      if (props.vFlip) {
        transform.push({
          rotateX: '180deg'
        });
      }

      if (transform.length) {
        transformStyle.transform = transform;
      }

      var surfaceStyle = _reactNative.StyleSheet.flatten([{ backgroundColor: 'transparent' }, props.style, transformStyle]);

      return _react2.default.createElement(
        _reactNative.View,
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 82
          }
        },
        this.state.currentAppState && _react2.default.createElement(
          Surface,
          {
            height: height,
            width: width * count - offset * (count - 1),
            style: surfaceStyle,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 84
            }
          },
          d.map(function (path, i) {
            var isSimpleElement = _react2.default.isValidElement(path);
            if (!isSimpleElement) {
              return _react2.default.createElement(Shape, _extends({}, ShapeProps, {
                key: ShapeKey++,
                d: path,
                x: i > 0 ? width * i - offset * i : 0,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 93
                }
              }));
            }
            return _react2.default.cloneElement(path, _extends({}, ShapeProps, path.props));
          })
        )
      );
    }
  }]);

  return IconSVG;
}(_react2.default.Component);

IconSVG.defaultProps = {
  d: '',
  fill: '#000',
  height: 44,
  width: 44,
  x: 0,
  y: 0,
  scaleX: null,
  scaleY: null,
  scale: 1.0,
  stroke: null,
  strokeWidth: 1,
  style: null,
  strokeJoin: 'round',
  strokeCap: 'round',
  strokeDash: [0, 0],
  opacity: 1,
  spaceOffset: 0
};

IconSVG.propTypes = {
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  x: _propTypes2.default.number,
  y: _propTypes2.default.number,
  scaleX: _propTypes2.default.number,
  scaleY: _propTypes2.default.number,
  scale: _propTypes2.default.number,
  d: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]),
  fill: _propTypes2.default.string,
  stroke: _propTypes2.default.string,
  strokeWidth: _propTypes2.default.number,
  style: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]),
  strokeJoin: _propTypes2.default.oneOf(['round', 'miter', 'bevel']),
  strokeCap: _propTypes2.default.oneOf(['round', 'butt', 'square']),
  strokeDash: _propTypes2.default.arrayOf(_propTypes2.default.number),
  opacity: _propTypes2.default.number,

  spaceOffset: _propTypes2.default.number
};

var IconFont = function IconFont(props) {
  var color = props.color,
      size = props.size;
  var d = props.d;

  if (props.name !== undefined) {
    var hasName = Object.prototype.hasOwnProperty.call(_defaultSvg2.default, props.name);
    d = hasName ? _defaultSvg2.default[props.name] : undefined;
  }

  var viewBox = [];
  if (typeof d === 'object' && d.d) {
    if (typeof d.viewBox === 'string') {
      viewBox = d.viewBox.split(' ').map(function (v) {
        return parseInt(v, 10);
      });
    }
    d = d.d;
  }
  if (!d) return null;

  var fill = props.fill || color;
  var stroke = props.stroke || color;
  var width = props.width || size;
  var height = props.height || size;

  var x = 0;
  var y = 0;
  var scaleX = 1.0;
  var scaleY = 1.0;

  if (viewBox && viewBox.length === 4) {
    x = props.x || viewBox[0];
    y = props.y || viewBox[1];
    scaleX = props.scaleX || (width - x) / viewBox[2];
    scaleY = props.scaleY || (height - y) / viewBox[3];
  } else {
    x = props.x || 0;
    y = props.y || (props.descent / props.unitsPerEm + 1.0) * height;
    scaleX = props.scaleX || width / props.unitsPerEm;
    scaleY = props.scaleY || -height / props.unitsPerEm;
  }

  return _react2.default.createElement(IconSVG, _extends({}, props, {
    width: width,
    height: height,
    x: x,
    y: y,
    scaleX: scaleX,
    scaleY: scaleY,
    fill: fill,
    stroke: stroke,
    d: d,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 191
    }
  }));
};

IconFont.defaultProps = {
  color: '#000',
  size: 16,
  unitsPerEm: 1024,
  ascent: 896,
  descent: -128,
  hFlip: null,
  vFlip: null,
  name: undefined
};

IconFont.propTypes = _extends({}, IconSVG.propTypes, {
  color: _propTypes2.default.string,
  size: _propTypes2.default.number,
  ascent: _propTypes2.default.number,
  descent: _propTypes2.default.number,
  unitsPerEm: _propTypes2.default.number,
  hFlip: _propTypes2.default.bool,
  vFlip: _propTypes2.default.bool,
  name: _propTypes2.default.string
});

exports.default = IconFont;