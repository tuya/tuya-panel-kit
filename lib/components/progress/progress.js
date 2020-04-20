Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/progress/progress.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNativeSvg = require('react-native-svg');

var _reactNativeSvg2 = _interopRequireDefault(_reactNativeSvg);

var _reactNative = require('react-native');

var _gesture = require('./gesture');

var _gesture2 = _interopRequireDefault(_gesture);

var _pathCustom = require('./path-custom');

var _pathCustom2 = _interopRequireDefault(_pathCustom);

var _gradient = require('./gradient');

var _gradient2 = _interopRequireDefault(_gradient);

var _circle = require('./circle');

var _circle2 = _interopRequireDefault(_circle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Progress = function (_Gesture) {
  _inherits(Progress, _Gesture);

  function Progress(props) {
    _classCallCheck(this, Progress);

    var _this = _possibleConstructorReturn(this, (Progress.__proto__ || Object.getPrototypeOf(Progress)).call(this, props));

    _this.getCirclePosition = function (path) {
      var startIndex = path.indexOf(' A');
      var progressStartIndex = path.indexOf(' ');
      var progressStartX = Number(path.substring(1, progressStartIndex));
      var progressStartY = Number(path.substring(progressStartIndex + 1, startIndex));
      var circleIndex = path.lastIndexOf(' 1 ');
      var needStr = path.substring(circleIndex + 3);
      var needIndex = needStr.indexOf(' ');
      var progressX = Number(needStr.substring(0, needIndex));
      var progressY = Number(needStr.substring(needIndex + 1));
      return { progressStartX: progressStartX, progressStartY: progressStartY, progressX: progressX, progressY: progressY };
    };

    _this.fixDegreeAndBindToInstance(props);
    _this.state = {
      value: props.value
    };
    return _this;
  }

  _createClass(Progress, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.fixDegreeAndBindToInstance(nextProps);
    }
  }, {
    key: 'fixDegreeAndBindToInstance',
    value: function fixDegreeAndBindToInstance(props) {
      var startDegree = props.startDegree,
          andDegree = props.andDegree,
          value = props.value;

      this.startDegree = startDegree % 360;
      if (andDegree >= 360) {
        this.andDegree = 360;
      } else {
        this.andDegree = andDegree;
      }
      if (startDegree !== 0 || !this.andDegree !== 0) {
        this.endDegree = (startDegree + this.andDegree) % 360 === 0 ? 360 : (startDegree + this.andDegree) % 360;
      } else {
        this.endDegree = 0;
      }

      this.backScalePath = this.createSvgPath(this.andDegree);

      var _getCirclePosition = this.getCirclePosition(this.backScalePath),
          startX = _getCirclePosition.progressStartX,
          startY = _getCirclePosition.progressStartY,
          endX = _getCirclePosition.progressX,
          endY = _getCirclePosition.progressY;

      this.startX = startX;
      this.startY = startY;
      this.endX = endX;
      this.endY = endY;

      var deltaDeg = this.mapValueToDeltaDeg(value);

      this.foreScalePath = this.createSvgPath(deltaDeg);

      var _getCirclePosition2 = this.getCirclePosition(this.foreScalePath),
          progressStartX = _getCirclePosition2.progressStartX,
          progressStartY = _getCirclePosition2.progressStartY,
          progressX = _getCirclePosition2.progressX,
          progressY = _getCirclePosition2.progressY;

      this.startProgressX = progressStartX;
      this.startProgressY = progressStartY;
      this.progressX = progressX;
      this.progressY = progressY;
    }
  }, {
    key: 'onStartShouldSetResponder',
    value: function onStartShouldSetResponder(_ref) {
      var _ref$nativeEvent = _ref.nativeEvent,
          locationX = _ref$nativeEvent.locationX,
          locationY = _ref$nativeEvent.locationY;

      return this.shouldSetResponder(locationX, locationY);
    }
  }, {
    key: 'shouldSetResponder',
    value: function shouldSetResponder(x0, y0) {
      var _props = this.props,
          scaleHeight = _props.scaleHeight,
          disabled = _props.disabled;

      if (disabled) {
        return false;
      }

      var _getCircleInfo = this.getCircleInfo(),
          r = _getCircleInfo.r;

      var _getXYRelativeCenter = this.getXYRelativeCenter(x0, y0),
          x = _getXYRelativeCenter.x,
          y = _getXYRelativeCenter.y;

      var len = Math.sqrt(x * x + y * y);
      var innerR = r - scaleHeight;
      var should = this.shouldUpdateScale(x0, y0);
      var finalShould = should && len <= r && len >= innerR - 2;
      return finalShould;
    }
  }, {
    key: 'shouldUpdateScale',
    value: function shouldUpdateScale(x, y) {
      var startDegree = this.startDegree,
          endDegree = this.endDegree;

      var deg = this.getDegRelativeCenter(x, y);
      var should = void 0;
      if (startDegree < endDegree) {
        should = deg >= startDegree && deg <= endDegree;
      } else {
        should = deg >= startDegree || deg <= endDegree % 360;
      }
      return should;
    }
  }, {
    key: 'onMoveShouldSetResponder',
    value: function onMoveShouldSetResponder() {
      return false;
    }
  }, {
    key: 'onGrant',
    value: function onGrant(e, gestureState) {
      var onValueChange = this.props.onValueChange;

      this.eventHandle(gestureState, onValueChange);
    }
  }, {
    key: 'onMove',
    value: function onMove(e, gestureState) {
      var onValueChange = this.props.onValueChange;

      this.eventHandle(gestureState, onValueChange);
    }
  }, {
    key: 'onRelease',
    value: function onRelease(e, gestureState) {
      var onSlidingComplete = this.props.onSlidingComplete;

      this.eventHandle(gestureState, onSlidingComplete);
    }
  }, {
    key: 'eventHandle',
    value: function eventHandle(_ref2, fn) {
      var locationX = _ref2.locationX,
          locationY = _ref2.locationY;
      var startDegree = this.startDegree;
      var needMaxCircle = this.props.needMaxCircle;

      var deg = this.getDegRelativeCenter(locationX, locationY);
      if (this.shouldUpdateScale(locationX, locationY)) {
        var deltaDeg = deg - startDegree;
        if (deltaDeg < 0) {
          deltaDeg = deg + 360 - startDegree;
        }
        var value = this.mapDeltaDegToValue(deltaDeg);

        this.foreScalePath = this.createSvgPath(deltaDeg);

        var _getCirclePosition3 = this.getCirclePosition(this.foreScalePath),
            progressX = _getCirclePosition3.progressX,
            progressY = _getCirclePosition3.progressY;

        if (needMaxCircle) {
          this.progressX = progressX;
          this.progressY = progressY;
        }
        this.setState({
          value: value
        });

        if (typeof fn === 'function') fn(value);
      }
    }
  }, {
    key: 'getLayoutFromStyle',
    value: function getLayoutFromStyle(style) {
      var _ref3 = _reactNative.StyleSheet.flatten(style) || {},
          _ref3$width = _ref3.width,
          width = _ref3$width === undefined ? 125 : _ref3$width,
          _ref3$height = _ref3.height,
          height = _ref3$height === undefined ? 125 : _ref3$height;

      return {
        width: width,
        height: height
      };
    }
  }, {
    key: 'getCircleInfo',
    value: function getCircleInfo() {
      var _getLayoutFromStyle = this.getLayoutFromStyle(this.props.style),
          width = _getLayoutFromStyle.width,
          height = _getLayoutFromStyle.height;

      var size = Math.min(width, height);
      var r = size / 2;
      var cx = r;
      var cy = r;
      return {
        r: r,
        cx: cx,
        cy: cy
      };
    }
  }, {
    key: 'getXYRelativeCenter',
    value: function getXYRelativeCenter(x, y) {
      var _getCircleInfo2 = this.getCircleInfo(),
          cx = _getCircleInfo2.cx,
          cy = _getCircleInfo2.cy;

      return {
        x: x - cx,
        y: y - cy
      };
    }
  }, {
    key: 'getDegRelativeCenter',
    value: function getDegRelativeCenter(x, y) {
      var _getXYRelativeCenter2 = this.getXYRelativeCenter(x, y),
          _x = _getXYRelativeCenter2.x,
          _y = _getXYRelativeCenter2.y;

      var deg = Math.atan2(_y, _x) * 180 / Math.PI;
      if (deg < 0) {
        deg += 360;
      }
      return parseInt(deg, 10);
    }
  }, {
    key: 'mapDeltaDegToScaleCount',
    value: function mapDeltaDegToScaleCount(deltaDeg) {
      if (deltaDeg >= this.andDegree) {
        return this.andDegree;
      }
      return deltaDeg;
    }
  }, {
    key: 'mapDeltaDegToValue',
    value: function mapDeltaDegToValue(deltaDeg) {
      var angle = this.mapDeltaDegToScaleCount(deltaDeg);
      var _props2 = this.props,
          min = _props2.min,
          max = _props2.max,
          stepValue = _props2.stepValue;


      if (stepValue) {
        var _deltaValue = angle * (max - min) / stepValue;
        var _value = Math.round(_deltaValue / this.andDegree);
        return Math.max(min, Math.min(max, _value * stepValue + min));
      }
      var deltaValue = max - min;
      var value = angle * deltaValue / this.andDegree;
      return Math.max(min, Math.min(max, value + min));
    }
  }, {
    key: 'mapValueToDeltaDeg',
    value: function mapValueToDeltaDeg(value) {
      var _props3 = this.props,
          min = _props3.min,
          max = _props3.max;

      return (value - min) * this.andDegree / (max - min);
    }
  }, {
    key: 'createSvgPath',
    value: function createSvgPath() {
      var deltaDeg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (deltaDeg === 0) return '';

      var _getCircleInfo3 = this.getCircleInfo(),
          r = _getCircleInfo3.r;

      var startDegree = this.startDegree;
      var scaleHeight = this.props.scaleHeight;

      var innerRadius = r - scaleHeight;
      var countDegree = this.mapDeltaDegToScaleCount(deltaDeg);
      var endDegree = (countDegree + startDegree) % 360;
      var startAngle = startDegree % 360 * Math.PI / 180;
      var endAngle = endDegree * Math.PI / 180;
      var _x1 = r + innerRadius * Math.cos(startAngle);
      var _y1 = r + innerRadius * Math.sin(startAngle);
      var _x2 = r + innerRadius * Math.cos(endAngle);
      var _y2 = r + innerRadius * Math.sin(endAngle);
      var num = countDegree;
      if (countDegree === 360) {
        var middleDegree = this.mapDeltaDegToScaleCount(startDegree + 180) * Math.PI / 180;
        var middleX = r + innerRadius * Math.cos(middleDegree);
        var middleY = r + innerRadius * Math.sin(middleDegree);
        var _path = 'M' + _x1 + ' ' + _y1 + ' A' + innerRadius + ' ' + innerRadius + ' 0 ' + (num > 180 ? startDegree === 270 ? 0 : 1 : 0) + ' 1 ' + middleX + ' ' + middleY + ' A' + innerRadius + ' ' + innerRadius + ' 0 ' + (num > 180 ? 1 : 0) + ' 1 ' + _x2 + ' ' + _y2;
        return _path;
      }
      var path = 'M' + _x1 + ' ' + _y1 + ' A' + innerRadius + ' ' + innerRadius + ' 0 ' + (num > 180 ? 1 : 0) + ' 1 ' + _x2 + ' ' + _y2;
      return path;
    }
  }, {
    key: 'render',
    value: function render() {
      var responder = this.getResponder();
      var _props4 = this.props,
          backColor = _props4.backColor,
          backStrokeOpacity = _props4.backStrokeOpacity,
          foreStrokeOpacity = _props4.foreStrokeOpacity,
          foreColor = _props4.foreColor,
          style = _props4.style,
          gradientId = _props4.gradientId,
          scaleHeight = _props4.scaleHeight,
          x1 = _props4.x1,
          x2 = _props4.x2,
          y1 = _props4.y1,
          y2 = _props4.y2,
          thumbFill = _props4.thumbFill,
          thumbStrokeWidth = _props4.thumbStrokeWidth,
          thumbStroke = _props4.thumbStroke,
          thumbRadius = _props4.thumbRadius,
          needMaxCircle = _props4.needMaxCircle,
          needMinCircle = _props4.needMinCircle,
          startColor = _props4.startColor,
          endColor = _props4.endColor,
          renderCenterView = _props4.renderCenterView,
          min = _props4.min;

      var _getCircleInfo4 = this.getCircleInfo(),
          r = _getCircleInfo4.r;

      var size = r * 2;
      var isGradient = foreColor && typeof foreColor === 'object';
      var greater = this.state.value !== min;
      return _react2.default.createElement(
        _reactNative.View,
        _extends({}, responder, {
          style: [{
            width: 125,
            height: 125
          }, style],
          __source: {
            fileName: _jsxFileName,
            lineNumber: 444
          }
        }),
        _react2.default.createElement(
          _reactNativeSvg2.default,
          { width: size, height: size, __source: {
              fileName: _jsxFileName,
              lineNumber: 454
            }
          },
          _react2.default.createElement(_reactNativeSvg.Path, {
            d: this.backScalePath,
            x: '0',
            y: '0',
            fill: 'none',
            stroke: backColor,
            strokeWidth: scaleHeight,
            strokeOpacity: backStrokeOpacity,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 455
            }
          }),
          this.andDegree < 360 && _react2.default.createElement(_circle2.default, {
            cx: this.startX,
            cy: this.startY,
            r: scaleHeight / 2 - 1,
            fill: startColor,
            stroke: startColor,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 465
            }
          }),
          this.andDegree < 360 && _react2.default.createElement(_circle2.default, {
            cx: this.endX,
            cy: this.endY,
            r: scaleHeight / 2 - 1,
            fill: endColor,
            stroke: endColor,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 474
            }
          }),
          isGradient && greater && _react2.default.createElement(_gradient2.default, {
            gradientId: gradientId,
            x1: x1,
            x2: x2,
            y1: y1,
            y2: y2,
            foreColor: foreColor,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 483
            }
          }),
          _react2.default.createElement(_pathCustom2.default, {
            isGradient: isGradient,
            path: this.foreScalePath,
            strokeOpacity: foreStrokeOpacity,
            strokeWidth: scaleHeight,
            gradientId: gradientId,
            foreColor: foreColor,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 492
            }
          }),
          needMaxCircle && _react2.default.createElement(_circle2.default, {
            cx: this.progressX,
            cy: this.progressY,
            r: thumbRadius,
            fill: thumbFill,
            strokeWidth: thumbStrokeWidth,
            stroke: thumbStroke,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 501
            }
          }),
          needMinCircle && _react2.default.createElement(_circle2.default, {
            cx: this.startProgressX,
            cy: this.startProgressY,
            r: thumbRadius,
            fill: foreColor,
            strokeWidth: thumbStrokeWidth,
            stroke: foreColor,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 511
            }
          })
        ),
        renderCenterView
      );
    }
  }]);

  return Progress;
}(_gesture2.default);

Progress.propTypes = _extends({}, _gesture2.default.propTypes, {
  gradientId: _propTypes2.default.string,

  style: _reactNative.ViewPropTypes.style,

  value: _propTypes2.default.number,

  startDegree: _propTypes2.default.number,

  andDegree: _propTypes2.default.number,

  min: _propTypes2.default.number,

  max: _propTypes2.default.number,

  stepValue: _propTypes2.default.number,

  backStrokeOpacity: _propTypes2.default.number,

  foreStrokeOpacity: _propTypes2.default.number,

  scaleHeight: _propTypes2.default.number,

  disabled: _propTypes2.default.bool,

  backColor: _propTypes2.default.string,

  foreColor: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object, _propTypes2.default.arrayOf(_propTypes2.default.shape({
    offset: _propTypes2.default.string.isRequired,
    stopColor: _propTypes2.default.string.isRequired,
    stopOpacity: _propTypes2.default.string.isRequired
  }))]),

  onValueChange: _propTypes2.default.func,

  onSlidingComplete: _propTypes2.default.func,

  x1: _propTypes2.default.string,

  x2: _propTypes2.default.string,

  y1: _propTypes2.default.string,

  y2: _propTypes2.default.string,

  thumbFill: _propTypes2.default.string,

  thumbStrokeWidth: _propTypes2.default.number,

  thumbStroke: _propTypes2.default.string,

  thumbRadius: _propTypes2.default.number,

  needMaxCircle: _propTypes2.default.bool,

  needMinCircle: _propTypes2.default.bool,

  startColor: _propTypes2.default.string,

  endColor: _propTypes2.default.string,

  renderCenterView: _propTypes2.default.element
});
Progress.defaultProps = _extends({}, _gesture2.default.defaultProps, {
  gradientId: 'Progress',
  value: 50,
  startDegree: 135,
  andDegree: 270,
  min: 0,
  max: 100,
  stepValue: 0,
  scaleHeight: 9,
  disabled: false,
  backColor: '#E5E5E5',
  foreColor: '#FF4800',
  onValueChange: function onValueChange() {},
  onSlidingComplete: function onSlidingComplete() {},

  style: null,
  backStrokeOpacity: 1,
  foreStrokeOpacity: 1,
  x1: '0%',
  y1: '0%',
  x2: '100%',
  y2: '0%',
  thumbFill: '#fff',
  thumbStroke: '#fff',
  thumbStrokeWidth: 2,
  thumbRadius: 2,
  needMaxCircle: false,
  needMinCircle: false,
  startColor: '#FF4800',
  endColor: '#E5E5E5',
  renderCenterView: null
});
exports.default = Progress;