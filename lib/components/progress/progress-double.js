Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'src/components/progress/progress-double.js';

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

var ProgressDouble = function (_Gesture) {
  _inherits(ProgressDouble, _Gesture);

  function ProgressDouble(props) {
    _classCallCheck(this, ProgressDouble);

    var _this = _possibleConstructorReturn(this, (ProgressDouble.__proto__ || Object.getPrototypeOf(ProgressDouble)).call(this, props));

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
      minValue: props.minValue,
      maxValue: props.maxValue
    };
    return _this;
  }

  _createClass(ProgressDouble, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.fixDegreeAndBindToInstance(nextProps);
      if (this.state.minValue !== nextProps.minValue) {
        this.setState({
          minValue: nextProps.minValue
        });
      }

      if (this.state.maxValue !== nextProps.maxValue) {
        this.setState({
          maxValue: nextProps.maxValue
        });
      }
    }
  }, {
    key: 'fixDegreeAndBindToInstance',
    value: function fixDegreeAndBindToInstance(props) {
      var startDegree = props.startDegree,
          andDegree = props.andDegree,
          maxValue = props.maxValue,
          minValue = props.minValue;

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

      var deltaDeg = this.mapValueToDeltaDeg(maxValue, props);
      var minDeltaDeg = this.mapValueToDeltaDeg(minValue, props);

      this.foreScalePath = this.createSvgPath(deltaDeg, minDeltaDeg);

      var _getCirclePosition2 = this.getCirclePosition(this.foreScalePath),
          progressStartX = _getCirclePosition2.progressStartX,
          progressStartY = _getCirclePosition2.progressStartY,
          progressX = _getCirclePosition2.progressX,
          progressY = _getCirclePosition2.progressY;

      this.progressX = progressX;
      this.progressY = progressY;
      this.progressStartY = progressStartY;
      this.progressStartX = progressStartX;
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
          disabled = _props.disabled,
          thumbRadius = _props.thumbRadius;

      if (disabled) {
        return false;
      }

      var _getCircleInfo = this.getCircleInfo(),
          r = _getCircleInfo.r;

      var _getXYRelativeCenter = this.getXYRelativeCenter(x0, y0),
          x = _getXYRelativeCenter.x,
          y = _getXYRelativeCenter.y;

      var len = Math.sqrt((x - thumbRadius) * (x - thumbRadius) + (y - thumbRadius) * (y - thumbRadius));
      var innerR = r - scaleHeight;
      var should = this.shouldUpdateScale(x0 - thumbRadius, y0 - thumbRadius);
      var finalShould = should && len <= r + thumbRadius && len >= innerR - thumbRadius;
      return finalShould;
    }
  }, {
    key: 'shouldUpdateScale',
    value: function shouldUpdateScale(x, y) {
      var startDegree = this.startDegree,
          endDegree = this.endDegree;

      var deg = this.getDegRelativeCenter(x, y);
      var should = void 0;
      if (endDegree <= startDegree) {
        should = deg >= startDegree && deg > endDegree || deg < startDegree && deg <= endDegree;
      } else {
        should = deg >= startDegree && deg < endDegree || deg > startDegree && deg <= endDegree;
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
      var startDegree = this.startDegree,
          endDegree = this.endDegree;
      var thumbRadius = this.props.thumbRadius;

      var deg = this.getDegRelativeCenter(locationX - thumbRadius, locationY - thumbRadius);
      var isInArea = this.shouldUpdateScale(locationX - thumbRadius, locationY - thumbRadius);
      if (isInArea) {
        var startDeg = this.getDegRelativeCenter(this.progressStartX, this.progressStartY);

        var endDeg = this.getDegRelativeCenter(this.progressX, this.progressY);

        var startToStart = this.startCompareToStart(startDegree, endDegree, startDeg);

        var endToStart = endDeg >= startDegree ? endDeg - startDegree : 360 + endDeg - startDegree;
        var minValue = this.mapDeltaDegToValue(startToStart);
        var maxValue = this.mapDeltaDegToValue(endToStart);

        var deltaDegree = deg >= startDegree ? deg - startDegree : deg + 360 - startDegree;
        var value = this.mapDeltaDegToValue(deltaDegree);

        var degToStartDeg = this.degCompareToStartDeg(deg, startDeg, startDegree);

        var degToEndDeg = this.compareDeg(startDegree, endDegree, deg, endDeg);

        var endDegToStartDegree = endDeg >= startDegree ? endDeg - startDegree : 360 + endDeg - startDegree;

        var startDegToStartDegree = startDeg >= startDegree ? startDeg - startDegree : startDeg > endDegree ? startDegree - startDeg : 360 - startDegree + startDeg;
        if (degToStartDeg >= degToEndDeg) {
          this.foreScalePath = this.createSvgPath(deltaDegree, startDegToStartDegree);
        } else {
          this.foreScalePath = this.createSvgPath(endDegToStartDegree, deltaDegree);
        }

        var _getCirclePosition3 = this.getCirclePosition(this.foreScalePath),
            progressStartX = _getCirclePosition3.progressStartX,
            progressStartY = _getCirclePosition3.progressStartY,
            progressX = _getCirclePosition3.progressX,
            progressY = _getCirclePosition3.progressY;

        var locationToEnd = Math.sqrt(Math.pow(this.progressX - (locationX - thumbRadius), 2) + Math.pow(this.progressY - (locationY - thumbRadius), 2));
        var locationToStart = Math.sqrt(Math.pow(this.progressStartX - (locationX - thumbRadius), 2) + Math.pow(this.progressStartY - (locationY - thumbRadius), 2));
        if (locationToStart >= locationToEnd || value < minValue) {
          if (value < minValue) {
            this.progressStartX = progressStartX;
            this.progressStartY = progressStartY;

            if (typeof fn === 'function') fn({ minValue: value, maxValue: maxValue });
            this.setState({
              minValue: value,
              maxValue: maxValue
            });
          } else {
            this.progressX = progressX;
            this.progressY = progressY;

            if (typeof fn === 'function') fn({ minValue: minValue, maxValue: value });
            this.setState({
              minValue: minValue,
              maxValue: value
            });
          }
        } else if (locationToStart < locationToEnd || value > maxValue) {
          if (value > maxValue) {
            this.progressX = progressX;
            this.progressY = progressY;

            if (typeof fn === 'function') fn({ minValue: minValue, maxValue: value });
            this.setState({
              minValue: minValue,
              maxValue: value
            });
          } else {
            this.progressStartX = progressStartX;
            this.progressStartY = progressStartY;

            if (typeof fn === 'function') fn({ minValue: value, maxValue: maxValue });
            this.setState({
              minValue: value,
              maxValue: maxValue
            });
          }
        }
      }
      if (isRelease && !isInArea) {
        var _state = this.state,
            _minValue = _state.minValue,
            _maxValue = _state.maxValue;

        if (typeof fn === 'function') fn({ minValue: _minValue, maxValue: _maxValue });
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
      if (deltaDeg > this.andDegree) {
        return this.andDegree;
      }
      return deltaDeg;
    }
  }, {
    key: 'startCompareToStart',
    value: function startCompareToStart(startDegree, endDegree, startDeg) {
      if (startDeg >= startDegree) {
        return startDeg - startDegree;
      }

      if (startDegree >= startDeg) {
        if (startDegree >= endDegree) {
          return 360 + startDeg - startDegree;
        }
        return startDegree - startDeg;
      }
      return 360 + startDeg - startDegree;
    }
  }, {
    key: 'degCompareToStartDeg',
    value: function degCompareToStartDeg(deg, startDeg, startDegree) {
      if (deg >= startDeg) {
        if (startDeg >= startDegree) {
          return deg - startDeg;
        }

        if (deg >= startDegree) {
          return 360 - deg + startDeg;
        }
        return deg - startDeg;
      }

      if (startDegree > startDeg) {
        return startDeg - deg;
      }

      if (deg >= startDegree) {
        return startDeg - deg;
      }
      return 360 - startDeg + deg;
    }
  }, {
    key: 'compareDeg',
    value: function compareDeg(startDegree, endDegree, deg, endDeg) {
      if (endDegree > startDegree) {
        if (deg > endDeg) {
          return deg - endDeg;
        }
        return endDeg - deg;
      }

      if (deg > endDeg) {
        if (endDeg > endDegree) {
          return deg - endDeg;
        }

        if (deg < endDegree) {
          return deg - endDeg;
        }
        return 360 + endDeg - deg;
      }

      if (endDeg > endDegree) {
        if (deg < endDegree) {
          return 360 - endDeg + deg;
        }
        return endDeg - deg;
      }
      return endDeg - deg;
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
    value: function mapValueToDeltaDeg(value, props) {
      var min = props.min,
          max = props.max;

      return (value - min) * this.andDegree / (max - min);
    }
  }, {
    key: 'createSvgPath',
    value: function createSvgPath() {
      var deltaDeg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var minDeltaDeg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var _getCircleInfo3 = this.getCircleInfo(),
          r = _getCircleInfo3.r;

      var startDegree = this.startDegree;
      var scaleHeight = this.props.scaleHeight;

      var innerRadius = r - scaleHeight;
      var countDegree = this.mapDeltaDegToScaleCount(deltaDeg);
      var endDegree = (countDegree + startDegree) % 360;
      var startAngle = (startDegree + minDeltaDeg) % 360 * Math.PI / 180;
      var endAngle = endDegree * Math.PI / 180;
      var _x1 = r + innerRadius * Math.cos(startAngle);
      var _y1 = r + innerRadius * Math.sin(startAngle);
      var _x2 = r + innerRadius * Math.cos(endAngle);
      var _y2 = r + innerRadius * Math.sin(endAngle);
      var num = countDegree - minDeltaDeg;
      if (countDegree - minDeltaDeg === 360) {
        var middleDegree = this.mapDeltaDegToScaleCount(startDegree + minDeltaDeg + 180) * Math.PI / 180;
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
      var _props3 = this.props,
          backColor = _props3.backColor,
          backStrokeOpacity = _props3.backStrokeOpacity,
          foreStrokeOpacity = _props3.foreStrokeOpacity,
          foreColor = _props3.foreColor,
          style = _props3.style,
          gradientId = _props3.gradientId,
          scaleHeight = _props3.scaleHeight,
          x1 = _props3.x1,
          x2 = _props3.x2,
          y1 = _props3.y1,
          y2 = _props3.y2,
          thumbFill = _props3.thumbFill,
          thumbStrokeWidth = _props3.thumbStrokeWidth,
          thumbStroke = _props3.thumbStroke,
          thumbRadius = _props3.thumbRadius,
          minThumbFill = _props3.minThumbFill,
          minThumbStroke = _props3.minThumbStroke,
          startColor = _props3.startColor,
          endColor = _props3.endColor,
          renderCenterView = _props3.renderCenterView;

      var _getCircleInfo4 = this.getCircleInfo(),
          r = _getCircleInfo4.r;

      var size = r * 2;
      var isGradient = foreColor && typeof foreColor === 'object';
      return _react2.default.createElement(
        _reactNative.View,
        _extends({}, responder, {
          style: [style, {
            width: size + 2 * thumbRadius,
            height: size + 2 * thumbRadius
          }],
          __source: {
            fileName: _jsxFileName,
            lineNumber: 601
          }
        }),
        _react2.default.createElement(
          _reactNativeSvg2.default,
          {
            viewBox: -thumbRadius + ' ' + -thumbRadius + ' ' + (size + 2 * thumbRadius) + ' ' + (size + 2 * thumbRadius),
            width: size + 2 * thumbRadius,
            height: size + 2 * thumbRadius,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 611
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
              lineNumber: 617
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
              lineNumber: 627
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
              lineNumber: 636
            }
          }),
          isGradient && _react2.default.createElement(_gradient2.default, {
            gradientId: gradientId,
            x1: x1,
            x2: x2,
            y1: y1,
            y2: y2,
            isGradient: isGradient,
            foreColor: foreColor,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 645
            }
          }),
          _react2.default.createElement(_pathCustom2.default, {
            isGradient: isGradient,
            path: this.foreScalePath,
            gradientId: gradientId,
            strokeOpacity: foreStrokeOpacity,
            strokeWidth: scaleHeight,
            foreColor: foreColor,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 655
            }
          }),
          _react2.default.createElement(_circle2.default, {
            cx: this.progressStartX,
            cy: this.progressStartY,
            r: thumbRadius,
            fill: minThumbFill,
            strokeWidth: thumbStrokeWidth,
            stroke: minThumbStroke,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 664
            }
          }),
          _react2.default.createElement(_circle2.default, {
            cx: this.progressX,
            cy: this.progressY,
            r: thumbRadius,
            fill: thumbFill,
            strokeWidth: thumbStrokeWidth,
            stroke: thumbStroke,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 673
            }
          })
        ),
        renderCenterView
      );
    }
  }]);

  return ProgressDouble;
}(_gesture2.default);

ProgressDouble.propTypes = _extends({}, _gesture2.default.propTypes, {
  gradientId: _propTypes2.default.string,

  style: _reactNative.ViewPropTypes.style,

  maxValue: _propTypes2.default.number,

  minValue: _propTypes2.default.number,

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

  foreColor: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),

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

  minThumbFill: _propTypes2.default.string,

  minThumbStroke: _propTypes2.default.string,

  startColor: _propTypes2.default.string,

  endColor: _propTypes2.default.string,

  renderCenterView: _propTypes2.default.element
});
ProgressDouble.defaultProps = _extends({}, _gesture2.default.defaultProps, {
  gradientId: 'Double',
  maxValue: 25,
  minValue: 0,
  startDegree: 0,
  andDegree: 450,
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
  thumbStroke: '#FF4800',
  thumbStrokeWidth: 2,
  thumbRadius: 3.5,
  minThumbFill: '#fff',
  minThumbStroke: '#FF4800',
  startColor: '#E5E5E5',
  endColor: '#E5E5E5',
  renderCenterView: null
});
exports.default = ProgressDouble;