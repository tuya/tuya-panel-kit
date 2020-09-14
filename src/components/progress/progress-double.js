/* eslint-disable indent */
import PropTypes from 'prop-types';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import Gesture from './gesture';
import PathCustom from './path-custom';
import Gradient from './gradient';
import ProgressCircle from './circle';

export default class ProgressDouble extends Gesture {
  static propTypes = {
    ...Gesture.propTypes,
    /**
     * 渐变ID
     */
    gradientId: PropTypes.string,
    /**
     * 进度条样式
     */
    style: ViewPropTypes.style,
    /**
     * 最大具体值
     */
    maxValue: PropTypes.number,
    /**
     * 最小具体值
     */
    minValue: PropTypes.number,
    /**
     * 开始角度
     */
    startDegree: PropTypes.number,
    /**
     * 在开始的角度上增加的角度
     */
    andDegree: PropTypes.number,
    /**
     * 进度条始端最小值
     */
    min: PropTypes.number,
    /**
     * 进度条末端最大值
     */
    max: PropTypes.number,
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
     * 进度条渲染的高度
     */
    scaleHeight: PropTypes.number,
    /**
     * 进度条是否可以手势滑动
     */
    disabled: PropTypes.bool,
    /**
     * 大于具体值的颜色
     */
    backColor: PropTypes.string,
    /**
     * 小于具体值的颜色
     */
    foreColor: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /**
     * 值改变的回调
     * @param {number} minValue - 最小具体值
     * @param {number} maxValue - 最大具体值
     */
    onValueChange: PropTypes.func,
    /**
     * 滑动结束的回调
     * @param {number} minValue - 最小具体值
     * @param {number} maxValue - 最大具体值
     */
    onSlidingComplete: PropTypes.func,
    /**
     * 渐变起始点的x轴坐标
     */
    x1: PropTypes.string,
    /**
     * 渐变终点的x轴坐标
     */
    x2: PropTypes.string,
    /**
     * 渐变起始点的y轴坐标
     */
    y1: PropTypes.string,
    /**
     * 渐变终点的y轴坐标
     */
    y2: PropTypes.string,
    /**
     * 结束端thumb小圆球的填充色
     */
    thumbFill: PropTypes.string,
    /**
     * thumb小圆球边框宽度
     */
    thumbStrokeWidth: PropTypes.number,
    /**
     * 结束端thumb小圆球的边框色
     */
    thumbStroke: PropTypes.string,
    /**
     * thumb小圆球的半径
     */
    thumbRadius: PropTypes.number,
    /**
     * 开始端thumb小圆球的填充色
     */
    minThumbFill: PropTypes.string,
    /**
     * 开始端thumb小圆球的边框色
     */
    minThumbStroke: PropTypes.string,
    /**
     * 轨道不满360度开始的圆环颜色
     */
    startColor: PropTypes.string,
    /**
     * 轨道不满360度结束的圆环颜色
     */
    endColor: PropTypes.string,
    /**
     * 圆环中心自定义内容
     */
    renderCenterView: PropTypes.element,
  };

  static defaultProps = {
    ...Gesture.defaultProps,
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
    onValueChange() {},
    onSlidingComplete() {},
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
    renderCenterView: null,
  };

  constructor(props) {
    super(props);
    this.fixDegreeAndBindToInstance(props);
    this.state = {
      minValue: props.minValue,
      maxValue: props.maxValue,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.fixDegreeAndBindToInstance(nextProps);
    if (this.state.minValue !== nextProps.minValue) {
      this.setState({
        minValue: nextProps.minValue,
      });
    }

    if (this.state.maxValue !== nextProps.maxValue) {
      this.setState({
        maxValue: nextProps.maxValue,
      });
    }
  }

  fixDegreeAndBindToInstance(props) {
    const { startDegree, andDegree, maxValue, minValue } = props;
    this.startDegree = startDegree % 360;
    if (andDegree >= 360) {
      this.andDegree = 360;
    } else {
      this.andDegree = andDegree;
    }
    if (startDegree !== 0 || !this.andDegree !== 0) {
      this.endDegree =
        (startDegree + this.andDegree) % 360 === 0 ? 360 : (startDegree + this.andDegree) % 360;
    } else {
      this.endDegree = 0;
    }
    // 基础圆环路径
    this.backScalePath = this.createSvgPath(this.andDegree);
    const {
      progressStartX: startX,
      progressStartY: startY,
      progressX: endX,
      progressY: endY,
    } = this.getCirclePosition(this.backScalePath);
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    // 具体值对应的角度
    const deltaDeg = this.mapValueToDeltaDeg(maxValue);
    const minDeltaDeg = this.mapValueToDeltaDeg(minValue);
    // 小于具体值的路径
    this.foreScalePath = this.createSvgPath(deltaDeg, minDeltaDeg);
    const { progressStartX, progressStartY, progressX, progressY } = this.getCirclePosition(
      this.foreScalePath
    );
    this.progressX = progressX;
    this.progressY = progressY;
    this.progressStartY = progressStartY;
    this.progressStartX = progressStartX;
  }

  onStartShouldSetResponder({ nativeEvent: { locationX, locationY } }) {
    return this.shouldSetResponder(locationX, locationY);
  }

  shouldSetResponder(x0, y0) {
    const { scaleHeight, disabled, thumbRadius } = this.props;
    if (disabled) {
      return false;
    }
    const { r } = this.getCircleInfo();
    const { x, y } = this.getXYRelativeCenter(x0, y0);
    const len = Math.sqrt(
      (x - thumbRadius) * (x - thumbRadius) + (y - thumbRadius) * (y - thumbRadius)
    );
    const innerR = r - scaleHeight;
    const should = this.shouldUpdateScale(x0 - thumbRadius, y0 - thumbRadius);
    const finalShould = should && len <= r + thumbRadius && len >= innerR - thumbRadius;
    return finalShould;
  }

  shouldUpdateScale(x, y) {
    const { startDegree, endDegree } = this;
    const deg = this.getDegRelativeCenter(x, y);
    let should;
    if (endDegree <= startDegree) {
      should = (deg >= startDegree && deg > endDegree) || (deg < startDegree && deg <= endDegree);
    } else {
      should = (deg >= startDegree && deg < endDegree) || (deg > startDegree && deg <= endDegree);
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
    const { startDegree, endDegree } = this;
    const { thumbRadius } = this.props;
    // 鼠标点击的坐标
    const deg = this.getDegRelativeCenter(locationX - thumbRadius, locationY - thumbRadius);
    if (this.shouldUpdateScale(locationX - thumbRadius, locationY - thumbRadius)) {
      // 最小值对应的角度
      const startDeg = this.getDegRelativeCenter(this.progressStartX, this.progressStartY);
      // 最大值对应的角度
      const endDeg = this.getDegRelativeCenter(this.progressX, this.progressY);
      // 最小值距离基础圆环最小值的角度
      const startToStart = this.startCompareToStart(startDegree, endDegree, startDeg);
      // 最大值距离基础圆环最小值的角度
      const endToStart = endDeg >= startDegree ? endDeg - startDegree : 360 + endDeg - startDegree;
      const minValue = this.mapDeltaDegToValue(startToStart);
      const maxValue = this.mapDeltaDegToValue(endToStart);
      // 鼠标点击的位置与初始位置的角度
      const deltaDegree = deg >= startDegree ? deg - startDegree : deg + 360 - startDegree;
      const value = this.mapDeltaDegToValue(deltaDegree);

      // 点击的角度与渲染圆环最小值的距离
      const degToStartDeg = this.degCompareToStartDeg(deg, startDeg, startDegree);

      // 点击的角度与渲染圆环最大值的距离
      const degToEndDeg = this.compareDeg(startDegree, endDegree, deg, endDeg);
      // 最大值与基础圆环最小值的角度
      const endDegToStartDegree =
        endDeg >= startDegree ? endDeg - startDegree : 360 + endDeg - startDegree;
      // 最小值与基础圆环最小值的角度
      const startDegToStartDegree =
        startDeg >= startDegree
          ? startDeg - startDegree
          : startDeg > endDegree
          ? startDegree - startDeg
          : 360 - startDegree + startDeg;
      if (degToStartDeg >= degToEndDeg) {
        this.foreScalePath = this.createSvgPath(deltaDegree, startDegToStartDegree);
      } else {
        this.foreScalePath = this.createSvgPath(endDegToStartDegree, deltaDegree);
      }
      const { progressStartX, progressStartY, progressX, progressY } = this.getCirclePosition(
        this.foreScalePath
      );
      const locationToEnd = Math.sqrt(
        (this.progressX - (locationX - thumbRadius)) ** 2 +
          (this.progressY - (locationY - thumbRadius)) ** 2
      );
      const locationToStart = Math.sqrt(
        (this.progressStartX - (locationX - thumbRadius)) ** 2 +
          (this.progressStartY - (locationY - thumbRadius)) ** 2
      );
      if (locationToStart >= locationToEnd || value < minValue) {
        if (value < minValue) {
          this.progressStartX = progressStartX;
          this.progressStartY = progressStartY;

          if (typeof fn === 'function') fn({ minValue: value, maxValue });
          this.setState({
            minValue: value,
            maxValue,
          });
        } else {
          this.progressX = progressX;
          this.progressY = progressY;

          if (typeof fn === 'function') fn({ minValue, maxValue: value });
          this.setState({
            minValue,
            maxValue: value,
          });
        }
      } else if (locationToStart < locationToEnd || value > maxValue) {
        if (value > maxValue) {
          this.progressX = progressX;
          this.progressY = progressY;

          if (typeof fn === 'function') fn({ minValue, maxValue: value });
          this.setState({
            minValue,
            maxValue: value,
          });
        } else {
          this.progressStartX = progressStartX;
          this.progressStartY = progressStartY;

          if (typeof fn === 'function') fn({ minValue: value, maxValue });
          this.setState({
            minValue: value,
            maxValue,
          });
        }
      }
    }
  }

  getCirclePosition = path => {
    const startIndex = path.indexOf(' A');
    const progressStartIndex = path.indexOf(' ');
    const progressStartX = Number(path.substring(1, progressStartIndex));
    const progressStartY = Number(path.substring(progressStartIndex + 1, startIndex));
    const circleIndex = path.lastIndexOf(' 1 ');
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
    const { x: _x, y: _y } = this.getXYRelativeCenter(x, y);
    let deg = (Math.atan2(_y, _x) * 180) / Math.PI;
    if (deg < 0) {
      deg += 360;
    }
    return parseInt(deg, 10);
  }

  // 进度条渲染线目的角度
  mapDeltaDegToScaleCount(deltaDeg) {
    if (deltaDeg > this.andDegree) {
      return this.andDegree;
    }
    return deltaDeg;
  }

  startCompareToStart(startDegree, endDegree, startDeg) {
    // 当渲染的圆环的开始角度大于基础圆环的开始角度时
    if (startDeg >= startDegree) {
      return startDeg - startDegree;
    }
    // 当基础圆环的开始角度大于渲染圆环的角度时
    if (startDegree >= startDeg) {
      // 当基础圆环的开始角度大于渲染圆环的结束角度时
      if (startDegree >= endDegree) {
        return 360 + startDeg - startDegree;
      }
      return startDegree - startDeg;
    }
    return 360 + startDeg - startDegree;
  }
  degCompareToStartDeg(deg, startDeg, startDegree) {
    // 当点击角度大于渲染圆环的开始角度
    if (deg >= startDeg) {
      // 当渲染圆环的开始角度大于基础圆环的开始角度
      if (startDeg >= startDegree) {
        return deg - startDeg;
      }
      // 当点击角度大于基础圆环的开始角度
      if (deg >= startDegree) {
        return 360 - deg + startDeg;
      }
      return deg - startDeg;
    }
    // 当基础圆环的开始角度大于渲染圆环的开始角度
    if (startDegree > startDeg) {
      return startDeg - deg;
    }
    // 当点击角度大于基础圆环的开始角度
    if (deg >= startDegree) {
      return startDeg - deg;
    }
    return 360 - startDeg + deg;
  }

  compareDeg(startDegree, endDegree, deg, endDeg) {
    // 当基础圆环的结束角度大于开始角度时
    if (endDegree > startDegree) {
      // 当前点击的角度大于渲染圆环的结束角度时
      if (deg > endDeg) {
        return deg - endDeg;
      }
      return endDeg - deg;
    }
    // 当基础圆环的结束角度小于开始角度，当前点击的角度大于渲染圆环的结束角度时
    if (deg > endDeg) {
      // 渲染圆环的结束角度大于基础圆环的结束角度时
      if (endDeg > endDegree) {
        return deg - endDeg;
      }
      // 当前点击的角度小于基础圆环结束角度
      if (deg < endDegree) {
        return deg - endDeg;
      }
      return 360 + endDeg - deg;
    }
    // 渲染圆环的结束角度大于基础圆环的结束角度
    if (endDeg > endDegree) {
      // 当前点击的角度小于基础圆环的结束角度
      if (deg < endDegree) {
        return 360 - endDeg + deg;
      }
      return endDeg - deg;
    }
    return endDeg - deg;
  }

  mapDeltaDegToValue(deltaDeg) {
    const angle = this.mapDeltaDegToScaleCount(deltaDeg);
    const { min, max, stepValue } = this.props;

    if (stepValue) {
      const deltaValue = (angle * (max - min)) / stepValue;
      const value = Math.round(deltaValue / this.andDegree);
      return Math.max(min, Math.min(max, value * stepValue + min));
    }
    const deltaValue = max - min;
    const value = (angle * deltaValue) / this.andDegree;
    return Math.max(min, Math.min(max, value + min));
  }

  // 具体值对应的角度
  mapValueToDeltaDeg(value) {
    const { min, max } = this.props;
    return ((value - min) * this.andDegree) / (max - min);
  }

  // 计算路径路径
  createSvgPath(deltaDeg = 0, minDeltaDeg = 0) {
    const { r } = this.getCircleInfo();
    const { startDegree } = this;
    const { scaleHeight } = this.props;
    const innerRadius = r - scaleHeight;
    const countDegree = this.mapDeltaDegToScaleCount(deltaDeg);
    const endDegree = (countDegree + startDegree) % 360;
    const startAngle = (((startDegree + minDeltaDeg) % 360) * Math.PI) / 180;
    const endAngle = (endDegree * Math.PI) / 180;
    const _x1 = r + innerRadius * Math.cos(startAngle);
    const _y1 = r + innerRadius * Math.sin(startAngle);
    const _x2 = r + innerRadius * Math.cos(endAngle);
    const _y2 = r + innerRadius * Math.sin(endAngle);
    const num = countDegree - minDeltaDeg;
    if (countDegree - minDeltaDeg === 360) {
      const middleDegree =
        (this.mapDeltaDegToScaleCount(startDegree + minDeltaDeg + 180) * Math.PI) / 180;
      const middleX = r + innerRadius * Math.cos(middleDegree);
      const middleY = r + innerRadius * Math.sin(middleDegree);
      const path = `M${_x1} ${_y1} A${innerRadius} ${innerRadius} 0 ${
        num > 180 ? (startDegree === 270 ? 0 : 1) : 0
      } 1 ${middleX} ${middleY} A${innerRadius} ${innerRadius} 0 ${
        num > 180 ? 1 : 0
      } 1 ${_x2} ${_y2}`;
      return path;
    }
    const path = `M${_x1} ${_y1} A${innerRadius} ${innerRadius} 0 ${
      num > 180 ? 1 : 0
    } 1 ${_x2} ${_y2}`;
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
      gradientId,
      scaleHeight,
      x1,
      x2,
      y1,
      y2,
      thumbFill,
      thumbStrokeWidth,
      thumbStroke,
      thumbRadius,
      minThumbFill,
      minThumbStroke,
      startColor,
      endColor,
      renderCenterView,
    } = this.props;
    const { r } = this.getCircleInfo();
    const size = r * 2;
    const isGradient = foreColor && typeof foreColor === 'object';
    return (
      <View
        {...responder}
        style={[
          style,
          {
            width: size + 2 * thumbRadius,
            height: size + 2 * thumbRadius,
          },
        ]}
      >
        <Svg
          viewBox={`${-thumbRadius} ${-thumbRadius} ${size + 2 * thumbRadius} ${size +
            2 * thumbRadius}`}
          width={size + 2 * thumbRadius}
          height={size + 2 * thumbRadius}
        >
          <Path
            d={this.backScalePath}
            x="0"
            y="0"
            fill="none"
            stroke={backColor}
            strokeWidth={scaleHeight}
            strokeOpacity={backStrokeOpacity}
          />
          {this.andDegree < 360 && (
            <ProgressCircle
              cx={this.startX}
              cy={this.startY}
              r={scaleHeight / 2 - 1}
              fill={startColor}
              stroke={startColor}
            />
          )}
          {this.andDegree < 360 && (
            <ProgressCircle
              cx={this.endX}
              cy={this.endY}
              r={scaleHeight / 2 - 1}
              fill={endColor}
              stroke={endColor}
            />
          )}
          {isGradient && (
            <Gradient
              gradientId={gradientId}
              x1={x1}
              x2={x2}
              y1={y1}
              y2={y2}
              isGradient={isGradient}
              foreColor={foreColor}
            />
          )}
          <PathCustom
            isGradient={isGradient}
            path={this.foreScalePath}
            gradientId={gradientId}
            strokeOpacity={foreStrokeOpacity}
            strokeWidth={scaleHeight}
            foreColor={foreColor}
          />

          <ProgressCircle
            cx={this.progressStartX}
            cy={this.progressStartY}
            r={thumbRadius}
            fill={minThumbFill}
            strokeWidth={thumbStrokeWidth}
            stroke={minThumbStroke}
          />

          <ProgressCircle
            cx={this.progressX}
            cy={this.progressY}
            r={thumbRadius}
            fill={thumbFill}
            strokeWidth={thumbStrokeWidth}
            stroke={thumbStroke}
          />
        </Svg>
        {renderCenterView}
      </View>
    );
  }
}
