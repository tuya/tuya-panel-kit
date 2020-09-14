import PropTypes from 'prop-types';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import Gesture from './gesture';
import PathCustom from './path-custom';
import ProgressCircle from './circle';

export default class ProgressSimple extends Gesture {
  static propTypes = {
    ...Gesture.propTypes,
    /**
     * 进度条样式
     */
    style: ViewPropTypes.style,
    /**
     * 具体值1
     */
    value1: PropTypes.number,
    /**
     * 具体值2
     */
    value2: PropTypes.number,
    /**
     * 进度条1开始角度
     */
    startDegree1: PropTypes.number,
    /**
     * 进度条1在开始的角度上增加的角度
     */
    andDegree1: PropTypes.number,
    /**
     * 进度条2开始角度
     */
    startDegree2: PropTypes.number,
    /**
     * 进度条2在开始的角度上减少的角度
     */
    reduceDegree2: PropTypes.number,
    /**
     * 进度条1最小值
     */
    min1: PropTypes.number,
    /**
     * 进度条1最大值
     */
    max1: PropTypes.number,
    /**
     * 进度条2最小值
     */
    min2: PropTypes.number,
    /**
     * 进度条2最大值
     */
    max2: PropTypes.number,
    /**
     * 步长
     */
    stepValue: PropTypes.number,
    /**
     * 大于具体值的不透明度
     */
    backStrokeOpacity: PropTypes.number,
    /**
     * 小于具体值的不透明度
     */
    foreStrokeOpacity: PropTypes.number,
    /**
     * 进度条1渲染的高度
     */
    scaleHeight1: PropTypes.number,
    /**
     * 进度条2渲染的高度
     */
    scaleHeight2: PropTypes.number,
    /**
     * 进度条是否可以手势滑动
     */
    disabled: PropTypes.bool,
    /**
     * 进度条大于具体值的颜色
     */
    backColor: PropTypes.string,
    /**
     * 进度条小于具体值的颜色
     */
    foreColor: PropTypes.string,
    /**
     * 值改变的回调
     * @param {number} value1 - 具体值1
     * @param {number} value2 - 具体值2
     */
    onValueChange: PropTypes.func,
    /**
     * 滑动结束的回调
     * @param {number} value1 - 具体值1
     * @param {number} value2 - 具体值2
     */
    onSlidingComplete: PropTypes.func,
    /**
     * Thumb小圆球的填充色
     */
    thumbFill: PropTypes.string,
    /**
     * Thumb小圆球边框宽度
     */
    thumbStrokeWidth: PropTypes.number,
    /**
     * Thumb小圆球的边框色
     */
    thumbStroke: PropTypes.string,
    /**
     * 进度条1Thumb小圆球的半径
     */
    thumbRadius1: PropTypes.number,
    /**
     * 进度条2Thumb小圆球的半径
     */
    thumbRadius2: PropTypes.number,
    /**
     * 是否需要最大值的Touch
     */
    needCircle1: PropTypes.bool,
    /**
     * 是否需要另一个轨道上的thumb
     */
    needCircle2: PropTypes.bool,
    /**
     * 轨道开始的圆环颜色
     */
    startColor: PropTypes.string,
    /**
     * 轨道结束的圆环颜色
     */
    endColor: PropTypes.string,
  };

  static defaultProps = {
    ...Gesture.defaultProps,
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
    onValueChange() {},
    onSlidingComplete() {},
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
  };

  constructor(props) {
    super(props);
    this.fixDegreeAndBindToInstance(props);
    this.state = {
      value1: props.value1,
      value2: props.value2,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.fixDegreeAndBindToInstance(nextProps);
    if (this.state.value1 !== nextProps.value1) {
      this.setState({
        value1: nextProps.value1,
      });
    }
    if (this.state.value2 !== nextProps.value2) {
      this.setState({
        value2: nextProps.value2,
      });
    }
  }

  fixDegreeAndBindToInstance(props) {
    const { startDegree1, andDegree1, value1, startDegree2, reduceDegree2, value2 } = props;
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
      this.endDegree1 =
        (startDegree1 + this.andDegree1) % 360 === 0 ? 360 : (startDegree1 + this.andDegree1) % 360;
    } else {
      this.endDegree1 = 0;
    }
    if (startDegree2 !== 0 || !this.andDegree2 !== 0) {
      this.endDegree2 =
        startDegree2 - this.andDegree2 >= 0
          ? startDegree2 - this.andDegree2
          : 360 - startDegree2 + this.andDegree2;
    } else {
      this.endDegree2 = 0;
    }
    // 基础圆环路径1
    this.backScalePath1 = this.createSvgPath(this.andDegree1, true);
    const {
      progressStartX: startX1,
      progressStartY: startY1,
      progressX: endX1,
      progressY: endY1,
    } = this.getCirclePosition(this.backScalePath1);
    this.startX1 = startX1;
    this.startY1 = startY1;
    this.endX1 = endX1;
    this.endY1 = endY1;
    // 基础圆环路径
    this.backScalePath2 = this.createSvgPath(this.andDegree2, false);
    const {
      progressStartX: startX2,
      progressStartY: startY2,
      progressX: endX2,
      progressY: endY2,
    } = this.getCirclePosition(this.backScalePath2, false);
    this.startX2 = startX2;
    this.startY2 = startY2;
    this.endX2 = endX2;
    this.endY2 = endY2;
    // 具体值对应的角度
    const deltaDeg1 = this.mapValueToDeltaDeg(value1, true);
    // 小于具体值的路径
    this.foreScalePath1 = this.createSvgPath(deltaDeg1);
    // 具体值对应的角度
    const deltaDeg2 = this.mapValueToDeltaDeg(value2, false);
    // 小于具体值的路径
    this.foreScalePath2 = this.createSvgPath(deltaDeg2, false);
    const { progressX: progressX1, progressY: progressY1 } = this.getCirclePosition(
      this.foreScalePath1
    );
    const { progressX: progressX2, progressY: progressY2 } = this.getCirclePosition(
      this.foreScalePath2,
      false
    );
    this.progressX1 = progressX1;
    this.progressY1 = progressY1;
    this.progressX2 = progressX2;
    this.progressY2 = progressY2;
  }

  onStartShouldSetResponder({ nativeEvent: { locationX, locationY } }) {
    return this.shouldSetResponder(locationX, locationY);
  }

  shouldSetResponder(x0, y0) {
    const { scaleHeight1, scaleHeight2, disabled, thumbRadius1, thumbRadius2 } = this.props;
    if (disabled) {
      return false;
    }
    const { r } = this.getCircleInfo();
    const { x, y } = this.getXYRelativeCenter(x0, y0);
    const view = thumbRadius1 > thumbRadius2 ? thumbRadius1 : thumbRadius2;
    const scaleHeight = scaleHeight1 > scaleHeight2 ? scaleHeight1 : scaleHeight2;
    const len = Math.sqrt((x - view) * (x - view) + (y - view) * (y - view));
    const innerR = r - scaleHeight;
    const should = this.shouldUpdateScale(x0, y0);
    const finalShould = should && len <= r + view && len >= innerR - view;
    return finalShould;
  }

  shouldUpdateScale(x, y) {
    const { startDegree1, startDegree2, endDegree1, endDegree2 } = this;
    const deg = this.getDegRelativeCenter(x, y);
    let should;
    if ((deg < startDegree1 && deg > startDegree2) || (deg < endDegree2 && deg > endDegree1)) {
      should = false;
    } else {
      should = true;
    }
    return should;
  }

  onMoveShouldSetResponder() {
    return false;
  }

  onGrant(e, gestureState) {
    const { onValueChange } = this.props;
    this.eventHandle(gestureState, onValueChange);
  }

  onMove(e, gestureState) {
    const { onValueChange } = this.props;
    this.eventHandle(gestureState, onValueChange);
  }

  onRelease(e, gestureState) {
    const { onSlidingComplete } = this.props;
    this.eventHandle(gestureState, onSlidingComplete);
  }

  eventHandle({ locationX, locationY }, fn) {
    const { startDegree1, endDegree1, startDegree2 } = this;
    const { needCircle1, needCircle2, value1, value2 } = this.props;
    const deg = this.getDegRelativeCenter(locationX, locationY);
    const compareDeg =
      endDegree1 >= startDegree1
        ? deg >= startDegree1 && deg <= endDegree1
        : deg >= startDegree1 || deg <= endDegree1;
    if (this.shouldUpdateScale(locationX, locationY)) {
      let deltaDeg;
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
      const path = this.createSvgPath(deltaDeg, compareDeg);
      const { progressX, progressY } = this.getCirclePosition(path, compareDeg);
      if (compareDeg) {
        this.foreScalePath1 = path;
        if (needCircle1) {
          this.progressX1 = progressX;
          this.progressY1 = progressY;
        }
        const value = this.mapDeltaDegToValue(deltaDeg, true);
        if (typeof fn === 'function') fn({ value1: value, value2 });
        this.setState({
          value1: value,
          value2,
        });
      } else {
        this.foreScalePath2 = path;
        if (needCircle2) {
          this.progressX2 = progressX;
          this.progressY2 = progressY;
        }
        const value = this.mapDeltaDegToValue(deltaDeg, false);
        if (typeof fn === 'function') fn({ value1, value2: value });
        this.setState({
          value1,
          value2: value,
        });
      }
    }
  }

  getCirclePosition = (path, back = true) => {
    const startIndex = path.indexOf(' A');
    const progressStartIndex = path.indexOf(' ');
    const progressStartX = Number(path.substring(1, progressStartIndex));
    const progressStartY = Number(path.substring(progressStartIndex + 1, startIndex));
    const circleIndex = back ? path.lastIndexOf(' 1 ') : path.lastIndexOf(' 0 ');
    const needStr = path.substring(circleIndex + 3);
    const needIndex = needStr.indexOf(' ');
    const progressX = Number(needStr.substring(0, needIndex));
    const progressY = Number(needStr.substring(needIndex + 1));
    return { progressStartX, progressStartY, progressX, progressY };
  };

  getLayoutFromStyle(style) {
    const { width = 125, height = 125 } = StyleSheet.flatten(style) || {};
    return {
      width,
      height,
    };
  }

  // 获取圆环的半径信息
  getCircleInfo() {
    const { width, height } = this.getLayoutFromStyle(this.props.style);
    const size = Math.min(width, height);
    const r = size / 2;
    const cx = r;
    const cy = r;
    return {
      r,
      cx,
      cy,
    };
  }

  getXYRelativeCenter(x, y) {
    const { cx, cy } = this.getCircleInfo();
    return {
      x: x - cx,
      y: y - cy,
    };
  }

  getDegRelativeCenter(x, y) {
    const { thumbRadius1, thumbRadius2 } = this.props;
    const view = thumbRadius1 > thumbRadius2 ? thumbRadius1 : thumbRadius2;
    const { x: _x, y: _y } = this.getXYRelativeCenter(x - view, y - view);
    let deg = (Math.atan2(_y, _x) * 180) / Math.PI;
    if (deg < 0) {
      deg += 360;
    }
    return parseInt(deg, 10);
  }

  // 进度条渲染线目的角度
  mapDeltaDegToScaleCount(deltaDeg, back = true) {
    if (back) {
      if (deltaDeg > this.andDegree1) {
        return this.andDegree1;
      }
      return deltaDeg;
    }
    if (deltaDeg > this.andDegree2) {
      return this.andDegree2;
    }
    return deltaDeg;
  }

  mapDeltaDegToValue(deltaDeg, bool) {
    const angle = this.mapDeltaDegToScaleCount(deltaDeg);
    const { min1, max1, min2, max2, stepValue } = this.props;
    if (bool) {
      if (stepValue) {
        const deltaValue = max1 - min1;
        const value = Math.round((angle * deltaValue) / stepValue / this.andDegree1);
        return Math.max(min1, Math.min(max1, value * stepValue + min1));
      }
      const deltaValue = max1 - min1;
      const value = (angle * deltaValue) / this.andDegree1;
      return Math.max(min1, Math.min(max1, value + min1));
    }
    if (stepValue) {
      const deltaValue = max2 - min2;
      const value = Math.round((angle * deltaValue) / stepValue / this.andDegree2);
      return Math.max(min2, Math.min(max2, value * stepValue + min2));
    }
    const deltaValue = max2 - min2;
    const value = (angle * deltaValue) / this.andDegree2;
    return Math.max(min2, Math.min(max2, value + min2));
  }

  // 具体值对应的角度
  mapValueToDeltaDeg(value, bool) {
    const { min1, max1, min2, max2 } = this.props;
    return bool
      ? ((value - min1) * this.andDegree1) / (max1 - min1)
      : ((value - min2) * this.andDegree2) / (max2 - min2);
  }

  // 计算路径路径
  createSvgPath(deltaDeg = 0, back = true) {
    if (deltaDeg === 0) return '';
    const { r } = this.getCircleInfo();
    const { startDegree1, startDegree2 } = this;
    const { scaleHeight1 } = this.props;
    const innerRadius = r - scaleHeight1;
    const countDegree = this.mapDeltaDegToScaleCount(deltaDeg, back);
    const endDegree = back
      ? (countDegree + startDegree1) % 360
      : (startDegree2 - countDegree) % 360;
    const startAngle = back
      ? ((startDegree1 % 360) * Math.PI) / 180
      : ((startDegree2 % 360) * Math.PI) / 180;
    const endAngle = (endDegree * Math.PI) / 180;
    const _x1 = r + innerRadius * Math.cos(startAngle);
    const _y1 = r + innerRadius * Math.sin(startAngle);
    const _x2 = r + innerRadius * Math.cos(endAngle);
    const _y2 = r + innerRadius * Math.sin(endAngle);
    const path = `M${_x1} ${_y1} A${innerRadius} ${innerRadius} 0 ${countDegree > 180 ? 1 : 0} ${
      back ? 1 : 0
    } ${_x2} ${_y2}`;
    return path;
  }

  render() {
    const responder = this.getResponder();
    const {
      backColor,
      backStrokeOpacity,
      foreStrokeOpacity,
      foreColor,
      style,
      scaleHeight1,
      scaleHeight2,
      thumbFill,
      thumbStrokeWidth,
      thumbStroke,
      thumbRadius1,
      thumbRadius2,
      needCircle1,
      startColor,
      needCircle2,
      endColor,
    } = this.props;
    const { r } = this.getCircleInfo();
    const size = r * 2;
    const isGradient = foreColor && typeof foreColor === 'object';
    const svgWidth =
      thumbRadius1 > thumbRadius2 ? size + 2 * thumbRadius1 : size + 2 * thumbRadius2;
    const view = thumbRadius1 > thumbRadius2 ? thumbRadius1 : thumbRadius2;
    return (
      <View
        {...responder}
        style={[
          style,
          {
            width: svgWidth,
            height: svgWidth,
          },
        ]}
      >
        <Svg
          viewBox={`${-view} ${-view} ${svgWidth} ${svgWidth}`}
          width={svgWidth}
          height={svgWidth}
        >
          <Path
            d={this.backScalePath1}
            x="0"
            y="0"
            fill="none"
            stroke={backColor}
            strokeWidth={scaleHeight1}
            strokeOpacity={backStrokeOpacity}
          />
          <ProgressCircle
            cx={this.startX1}
            cy={this.startY1}
            r={scaleHeight1 / 2 - 1}
            fill={startColor}
            stroke={startColor}
          />
          <ProgressCircle
            cx={this.endX1}
            cy={this.endY1}
            r={scaleHeight1 / 2 - 1}
            fill={endColor}
            stroke={endColor}
          />
          <Path
            d={this.backScalePath2}
            x="0"
            y="0"
            fill="none"
            stroke={backColor}
            strokeWidth={scaleHeight2}
            strokeOpacity={backStrokeOpacity}
          />
          <ProgressCircle
            cx={this.startX2}
            cy={this.startY2}
            r={scaleHeight2 / 2 - 1}
            fill={startColor}
            stroke={startColor}
          />
          <ProgressCircle
            cx={this.endX2}
            cy={this.endY2}
            r={scaleHeight2 / 2 - 1}
            fill={startColor}
            stroke={endColor}
          />
          <PathCustom
            isGradient={isGradient}
            path={this.foreScalePath1}
            strokeOpacity={foreStrokeOpacity}
            strokeWidth={scaleHeight1}
            foreColor={foreColor}
          />
          <PathCustom
            isGradient={isGradient}
            path={this.foreScalePath2}
            strokeOpacity={foreStrokeOpacity}
            strokeWidth={scaleHeight2}
            foreColor={foreColor}
          />
          {needCircle1 && (
            <ProgressCircle
              cx={this.progressX1}
              cy={this.progressY1}
              r={thumbRadius1}
              fill={thumbFill}
              strokeWidth={thumbStrokeWidth}
              stroke={thumbStroke}
            />
          )}
          {needCircle2 && (
            <ProgressCircle
              cx={this.progressX2}
              cy={this.progressY2}
              r={thumbRadius2}
              fill={thumbFill}
              strokeWidth={thumbStrokeWidth}
              stroke={thumbStroke}
            />
          )}
        </Svg>
      </View>
    );
  }
}
