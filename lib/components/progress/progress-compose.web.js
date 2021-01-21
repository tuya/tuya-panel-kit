Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/progress/progress-compose.web.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _svgs = require('svgs');

var _svgs2 = _interopRequireDefault(_svgs);

var _reactNative = require('react-native');

var _gesture = require('./gesture');

var _gesture2 = _interopRequireDefault(_gesture);

var _pathCustom = require('./path-custom');

var _pathCustom2 = _interopRequireDefault(_pathCustom);

var _circle = require('./circle');

var _circle2 = _interopRequireDefault(_circle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProgressSimple = function (_Gesture) {
  _inherits(ProgressSimple, _Gesture);

  function ProgressSimple(props) {
    _classCallCheck(this, ProgressSimple);

    var _this = _possibleConstructorReturn(this, (ProgressSimple.__proto__ || Object.getPrototypeOf(ProgressSimple)).call(this, props));

    _this.getCirclePosition = function (path) {
      var back = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var startIndex = path.indexOf(' A');
      var progressStartIndex = path.indexOf(' ');
      var progressStartX = Number(path.substring(1, progressStartIndex));
      var progressStartY = Number(path.substring(progressStartIndex + 1, startIndex));
      var circleIndex = back ? path.lastIndexOf(' 1 ') : path.lastIndexOf(' 0 ');
      var needStr = path.substring(circleIndex + 3);
      var needIndex = needStr.indexOf(' ');
      var progressX = Number(needStr.substring(0, needIndex));
      var progressY = Number(needStr.substring(needIndex + 1));
      return { progressStartX: progressStartX, progressStartY: progressStartY, progressX: progressX, progressY: progressY };
    };

    _this.fixDegreeAndBindToInstance(props);
    _this.state = {
      value1: props.value1,
      value2: props.value2
    };
    return _this;
  }

  _createClass(ProgressSimple, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.fixDegreeAndBindToInstance(nextProps);
      if (this.state.value1 !== nextProps.value1) {
        this.setState({
          value1: nextProps.value1
        });
      }
      if (this.state.value2 !== nextProps.value2) {
        this.setState({
          value2: nextProps.value2
        });
      }
    }
  }, {
    key: 'fixDegreeAndBindToInstance',
    value: function fixDegreeAndBindToInstance(props) {
      var startDegree1 = props.startDegree1,
          andDegree1 = props.andDegree1,
          value1 = props.value1,
          startDegree2 = props.startDegree2,
          reduceDegree2 = props.reduceDegree2,
          value2 = props.value2;

      this.startDegree1 = startDegree1 % 360;
      this.startDegree2 = startDegree2 % 360;
      if (andDegree1 >= 360) {
        this.andDegree1 = 360;
      } else {
        this.andDegree1 = andDegree1;
      }
      if (reduceDegree2 >= 360) {
        this.andDegree2 = 360;
      } else {
        this.andDegree2 = reduceDegree2;
      }
      if (startDegree1 !== 0 || !this.andDegree1 !== 0) {
        this.endDegree1 = (startDegree1 + this.andDegree1) % 360 === 0 ? 360 : (startDegree1 + this.andDegree1) % 360;
      } else {
        this.endDegree1 = 0;
      }
      if (startDegree2 !== 0 || !this.andDegree2 !== 0) {
        this.endDegree2 = startDegree2 - this.andDegree2 >= 0 ? startDegree2 - this.andDegree2 : 360 - startDegree2 + this.andDegree2;
      } else {
        this.endDegree2 = 0;
      }

      this.backScalePath1 = this.createSvgPath(this.andDegree1, true);

      var _getCirclePosition = this.getCirclePosition(this.backScalePath1),
          startX1 = _getCirclePosition.progressStartX,
          startY1 = _getCirclePosition.progressStartY,
          endX1 = _getCirclePosition.progressX,
          endY1 = _getCirclePosition.progressY;

      this.startX1 = startX1;
      this.startY1 = startY1;
      this.endX1 = endX1;
      this.endY1 = endY1;

      this.backScalePath2 = this.createSvgPath(this.andDegree2, false);

      var _getCirclePosition2 = this.getCirclePosition(this.backScalePath2, false),
          startX2 = _getCirclePosition2.progressStartX,
          startY2 = _getCirclePosition2.progressStartY,
          endX2 = _getCirclePosition2.progressX,
          endY2 = _getCirclePosition2.progressY;

      this.startX2 = startX2;
      this.startY2 = startY2;
      this.endX2 = endX2;
      this.endY2 = endY2;

      var deltaDeg1 = this.mapValueToDeltaDeg(value1, true, props);

      this.foreScalePath1 = this.createSvgPath(deltaDeg1);

      var deltaDeg2 = this.mapValueToDeltaDeg(value2, false, props);

      this.foreScalePath2 = this.createSvgPath(deltaDeg2, false);

      var _getCirclePosition3 = this.getCirclePosition(this.foreScalePath1),
          progressX1 = _getCirclePosition3.progressX,
          progressY1 = _getCirclePosition3.progressY;

      var _getCirclePosition4 = this.getCirclePosition(this.foreScalePath2, false),
          progressX2 = _getCirclePosition4.progressX,
          progressY2 = _getCirclePosition4.progressY;

      this.progressX1 = progressX1;
      this.progressY1 = progressY1;
      this.progressX2 = progressX2;
      this.progressY2 = progressY2;
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
          scaleHeight1 = _props.scaleHeight1,
          scaleHeight2 = _props.scaleHeight2,
          disabled = _props.disabled,
          thumbRadius1 = _props.thumbRadius1,
          thumbRadius2 = _props.thumbRadius2;

      if (disabled) {
        return false;
      }

      var _getCircleInfo = this.getCircleInfo(),
          r = _getCircleInfo.r;

      var _getXYRelativeCenter = this.getXYRelativeCenter(x0, y0),
          x = _getXYRelativeCenter.x,
          y = _getXYRelativeCenter.y;

      var view = thumbRadius1 > thumbRadius2 ? thumbRadius1 : thumbRadius2;
      var scaleHeight = scaleHeight1 > scaleHeight2 ? scaleHeight1 : scaleHeight2;
      var len = Math.sqrt((x - view) * (x - view) + (y - view) * (y - view));
      var innerR = r - scaleHeight;
      var should = this.shouldUpdateScale(x0, y0);
      var finalShould = should && len <= r + view && len >= innerR - view;
      return finalShould;
    }
  }, {
    key: 'shouldUpdateScale',
    value: function shouldUpdateScale(x, y) {
      var startDegree1 = this.startDegree1,
          startDegree2 = this.startDegree2,
          endDegree1 = this.endDegree1,
          endDegree2 = this.endDegree2;

      var deg = this.getDegRelativeCenter(x, y);
      var should = void 0;
      if (deg < startDegree1 && deg > startDegree2 || deg < endDegree2 && deg > endDegree1) {
        should = false;
      } else {
        should = true;
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

      this.eventHandle(gestureState, onSlidingComplete, true);
    }
  }, {
    key: 'eventHandle',
    value: function eventHandle(_ref2, fn) {
      var locationX = _ref2.locationX,
          locationY = _ref2.locationY;
      var isRelease = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var startDegree1 = this.startDegree1,
          endDegree1 = this.endDegree1,
          startDegree2 = this.startDegree2;
      var _props2 = this.props,
          needCircle1 = _props2.needCircle1,
          needCircle2 = _props2.needCircle2,
          value1 = _props2.value1,
          value2 = _props2.value2;

      var deg = this.getDegRelativeCenter(locationX, locationY);
      var compareDeg = endDegree1 >= startDegree1 ? deg >= startDegree1 && deg <= endDegree1 : deg >= startDegree1 || deg <= endDegree1;
      var isInArea = this.shouldUpdateScale(locationX, locationY);
      if (isInArea) {
        var deltaDeg = void 0;
        if (compareDeg) {
          deltaDeg = deg - startDegree1;
          if (deltaDeg < 0) {
            deltaDeg = deg + 360 - startDegree1;
          }
        } else {
          deltaDeg = startDegree2 - deg;
          if (deltaDeg < 0) {
            deltaDeg = deg - 360 + startDegree2;
          }
        }
        var path = this.createSvgPath(deltaDeg, compareDeg);

        var _getCirclePosition5 = this.getCirclePosition(path, compareDeg),
            progressX = _getCirclePosition5.progressX,
            progressY = _getCirclePosition5.progressY;

        if (compareDeg) {
          this.foreScalePath1 = path;
          if (needCircle1) {
            this.progressX1 = progressX;
            this.progressY1 = progressY;
          }
          var value = this.mapDeltaDegToValue(deltaDeg, true);
          if (typeof fn === 'function') fn({ value1: value, value2: value2 });
          this.setState({
            value1: value,
            value2: value2
          });
        } else {
          this.foreScalePath2 = path;
          if (needCircle2) {
            this.progressX2 = progressX;
            this.progressY2 = progressY;
          }
          var _value = this.mapDeltaDegToValue(deltaDeg, false);
          if (typeof fn === 'function') fn({ value1: value1, value2: _value });
          this.setState({
            value1: value1,
            value2: _value
          });
        }
      }
      if (isRelease && !isInArea) {
        var _state = this.state,
            stateValue1 = _state.value1,
            stateValue2 = _state.value2;

        if (typeof fn === 'function') fn({ value1: stateValue1, value2: stateValue2 });
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
      var _props3 = this.props,
          thumbRadius1 = _props3.thumbRadius1,
          thumbRadius2 = _props3.thumbRadius2;

      var view = thumbRadius1 > thumbRadius2 ? thumbRadius1 : thumbRadius2;

      var _getXYRelativeCenter2 = this.getXYRelativeCenter(x - view, y - view),
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
      var back = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (back) {
        if (deltaDeg >= this.andDegree1) {
          return this.andDegree1;
        }
        return deltaDeg;
      }
      if (deltaDeg >= this.andDegree2) {
        return this.andDegree2;
      }
      return deltaDeg;
    }
  }, {
    key: 'mapDeltaDegToValue',
    value: function mapDeltaDegToValue(deltaDeg, bool) {
      var angle = this.mapDeltaDegToScaleCount(deltaDeg);
      var _props4 = this.props,
          min1 = _props4.min1,
          max1 = _props4.max1,
          min2 = _props4.min2,
          max2 = _props4.max2,
          stepValue = _props4.stepValue;

      if (bool) {
        if (stepValue) {
          var _deltaValue2 = max1 - min1;
          var _value3 = Math.round(angle * _deltaValue2 / stepValue / this.andDegree1);
          return Math.max(min1, Math.min(max1, _value3 * stepValue + min1));
        }
        var _deltaValue = max1 - min1;
        var _value2 = angle * _deltaValue / this.andDegree1;
        return Math.max(min1, Math.min(max1, _value2 + min1));
      }
      if (stepValue) {
        var _deltaValue3 = max2 - min2;
        var _value4 = Math.round(angle * _deltaValue3 / stepValue / this.andDegree2);
        return Math.max(min2, Math.min(max2, _value4 * stepValue + min2));
      }
      var deltaValue = max2 - min2;
      var value = angle * deltaValue / this.andDegree2;
      return Math.max(min2, Math.min(max2, value + min2));
    }
  }, {
    key: 'mapValueToDeltaDeg',
    value: function mapValueToDeltaDeg(value, bool, props) {
      var min1 = props.min1,
          max1 = props.max1,
          min2 = props.min2,
          max2 = props.max2;

      return bool ? (value - min1) * this.andDegree1 / (max1 - min1) : (value - min2) * this.andDegree2 / (max2 - min2);
    }
  }, {
    key: 'createSvgPath',
    value: function createSvgPath() {
      var deltaDeg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var back = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var _getCircleInfo3 = this.getCircleInfo(),
          r = _getCircleInfo3.r;

      var startDegree1 = this.startDegree1,
          startDegree2 = this.startDegree2;
      var scaleHeight1 = this.props.scaleHeight1;

      var innerRadius = r - scaleHeight1;
      var countDegree = this.mapDeltaDegToScaleCount(deltaDeg, back);
      var endDegree = back ? (countDegree + startDegree1) % 360 : (startDegree2 - countDegree) % 360;
      var startAngle = back ? startDegree1 % 360 * Math.PI / 180 : startDegree2 % 360 * Math.PI / 180;
      var endAngle = endDegree * Math.PI / 180;
      var _x1 = r + innerRadius * Math.cos(startAngle);
      var _y1 = r + innerRadius * Math.sin(startAngle);
      var _x2 = r + innerRadius * Math.cos(endAngle);
      var _y2 = r + innerRadius * Math.sin(endAngle);
      var path = 'M' + _x1 + ' ' + _y1 + ' A' + innerRadius + ' ' + innerRadius + ' 0 ' + (countDegree > 180 ? 1 : 0) + ' ' + (back ? 1 : 0) + ' ' + _x2 + ' ' + _y2;
      return path;
    }
  }, {
    key: 'render',
    value: function render() {
      var responder = this.getResponder();
      var _props5 = this.props,
          backColor = _props5.backColor,
          backStrokeOpacity = _props5.backStrokeOpacity,
          foreStrokeOpacity = _props5.foreStrokeOpacity,
          foreColor = _props5.foreColor,
          style = _props5.style,
          scaleHeight1 = _props5.scaleHeight1,
          scaleHeight2 = _props5.scaleHeight2,
          thumbFill = _props5.thumbFill,
          thumbStrokeWidth = _props5.thumbStrokeWidth,
          thumbStroke = _props5.thumbStroke,
          thumbFill2 = _props5.thumbFill2,
          thumbStrokeWidth2 = _props5.thumbStrokeWidth2,
          thumbStroke2 = _props5.thumbStroke2,
          thumbRadius1 = _props5.thumbRadius1,
          thumbRadius2 = _props5.thumbRadius2,
          needCircle1 = _props5.needCircle1,
          startColor = _props5.startColor,
          needCircle2 = _props5.needCircle2,
          endColor = _props5.endColor;

      var _getCircleInfo4 = this.getCircleInfo(),
          r = _getCircleInfo4.r;

      var size = r * 2;
      var isGradient = foreColor && typeof foreColor === 'object';
      var svgWidth = thumbRadius1 > thumbRadius2 ? size + 2 * thumbRadius1 : size + 2 * thumbRadius2;
      var view = thumbRadius1 > thumbRadius2 ? thumbRadius1 : thumbRadius2;
      return _react2.default.createElement(
        _reactNative.View,
        _extends({}, responder, {
          style: [style, {
            width: svgWidth,
            height: svgWidth
          }],
          __source: {
            fileName: _jsxFileName,
            lineNumber: 543
          }
        }),
        _react2.default.createElement(
          _svgs2.default,
          {
            viewBox: -view + ' ' + -view + ' ' + svgWidth + ' ' + svgWidth,
            width: svgWidth,
            height: svgWidth,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 553
            }
          },
          _react2.default.createElement(_svgs.Path, {
            d: this.backScalePath1,
            x: '0',
            y: '0',
            fill: 'none',
            stroke: backColor,
            strokeWidth: scaleHeight1,
            strokeOpacity: backStrokeOpacity,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 558
            }
          }),
          _react2.default.createElement(_circle2.default, {
            cx: this.startX1,
            cy: this.startY1,
            r: scaleHeight1 / 2 - 1,
            fill: startColor,
            stroke: startColor,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 567
            }
          }),
          _react2.default.createElement(_circle2.default, {
            cx: this.endX1,
            cy: this.endY1,
            r: scaleHeight1 / 2 - 1,
            fill: endColor,
            stroke: endColor,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 574
            }
          }),
          _react2.default.createElement(_svgs.Path, {
            d: this.backScalePath2,
            x: '0',
            y: '0',
            fill: 'none',
            stroke: backColor,
            strokeWidth: scaleHeight2,
            strokeOpacity: backStrokeOpacity,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 581
            }
          }),
          _react2.default.createElement(_circle2.default, {
            cx: this.startX2,
            cy: this.startY2,
            r: scaleHeight2 / 2 - 1,
            fill: startColor,
            stroke: startColor,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 590
            }
          }),
          _react2.default.createElement(_circle2.default, {
            cx: this.endX2,
            cy: this.endY2,
            r: scaleHeight2 / 2 - 1,
            fill: startColor,
            stroke: endColor,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 597
            }
          }),
          _react2.default.createElement(_pathCustom2.default, {
            isGradient: isGradient,
            path: this.foreScalePath1,
            strokeOpacity: foreStrokeOpacity,
            strokeWidth: scaleHeight1,
            foreColor: foreColor,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 604
            }
          }),
          _react2.default.createElement(_pathCustom2.default, {
            isGradient: isGradient,
            path: this.foreScalePath2,
            strokeOpacity: foreStrokeOpacity,
            strokeWidth: scaleHeight2,
            foreColor: foreColor,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 611
            }
          }),
          needCircle1 && _react2.default.createElement(_circle2.default, {
            cx: this.progressX1,
            cy: this.progressY1,
            r: thumbRadius1,
            fill: thumbFill,
            strokeWidth: thumbStrokeWidth,
            stroke: thumbStroke,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 619
            }
          }),
          needCircle2 && _react2.default.createElement(_circle2.default, {
            cx: this.progressX2,
            cy: this.progressY2,
            r: thumbRadius2,
            fill: thumbFill2,
            strokeWidth: thumbStrokeWidth2,
            stroke: thumbStroke2,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 629
            }
          })
        )
      );
    }
  }]);

  return ProgressSimple;
}(_gesture2.default);

ProgressSimple.propTypes = _extends({}, _gesture2.default.propTypes, {
  style: _reactNative.ViewPropTypes.style,

  value1: _propTypes2.default.number,

  value2: _propTypes2.default.number,

  startDegree1: _propTypes2.default.number,

  andDegree1: _propTypes2.default.number,

  startDegree2: _propTypes2.default.number,

  reduceDegree2: _propTypes2.default.number,

  min1: _propTypes2.default.number,

  max1: _propTypes2.default.number,

  min2: _propTypes2.default.number,

  max2: _propTypes2.default.number,

  stepValue: _propTypes2.default.number,

  backStrokeOpacity: _propTypes2.default.number,

  foreStrokeOpacity: _propTypes2.default.number,

  scaleHeight1: _propTypes2.default.number,

  scaleHeight2: _propTypes2.default.number,

  disabled: _propTypes2.default.bool,

  backColor: _propTypes2.default.string,

  foreColor: _propTypes2.default.string,

  onValueChange: _propTypes2.default.func,

  onSlidingComplete: _propTypes2.default.func,

  thumbFill: _propTypes2.default.string,

  thumbStrokeWidth: _propTypes2.default.number,

  thumbStroke: _propTypes2.default.string,

  thumbRadius1: _propTypes2.default.number,

  thumbRadius2: _propTypes2.default.number,

  needCircle1: _propTypes2.default.bool,

  needCircle2: _propTypes2.default.bool,

  startColor: _propTypes2.default.string,

  endColor: _propTypes2.default.string,

  thumbFill2: _propTypes2.default.string,

  thumbStrokeWidth2: _propTypes2.default.number,

  thumbStroke2: _propTypes2.default.string
});
ProgressSimple.defaultProps = _extends({}, _gesture2.default.defaultProps, {
  value1: 50,
  value2: 20,
  startDegree1: 165,
  andDegree1: 215,
  startDegree2: 140,
  reduceDegree2: 100,
  min1: 0,
  max1: 100,
  min2: 0,
  max2: 50,
  stepValue: 0,
  scaleHeight1: 9,
  scaleHeight2: 4,
  disabled: false,
  backColor: '#E5E5E5',
  foreColor: '#FF4800',
  onValueChange: function onValueChange() {},
  onSlidingComplete: function onSlidingComplete() {},

  style: null,
  backStrokeOpacity: 1,
  foreStrokeOpacity: 1,
  thumbFill: '#fff',
  thumbStroke: '#fff',
  thumbStrokeWidth: 2,
  thumbRadius1: 5,
  thumbRadius2: 2,
  needCircle1: true,
  needCircle2: true,
  startColor: '#FF4800',
  endColor: '#E5E5E5',
  thumbFill2: '#fff',
  thumbStrokeWidth2: 2,
  thumbStroke2: '#fff'
});
exports.default = ProgressSimple;