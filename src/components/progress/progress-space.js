import PropTypes from 'prop-types';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import Gesture from './gesture';
import PathCustom from './path-custom';
import Gradient from './gradient';

export default class ProgressSpace extends Gesture {
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
     * 具体值
     */
    value: PropTypes.number,
    /**
     * 开始角度
     */
    startDegree: PropTypes.number,
    /**
     * 在开始的角度上增加的角度
     */
    andDegree: PropTypes.number,
    /**
     * 最小值
     */
    min: PropTypes.number,
    /**
     * 最大值
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
     * 进度条渲染线条的数目
     */
    scaleNumber: PropTypes.number,
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
     * @param {number} value - 具体值
     */
    onValueChange: PropTypes.func,
    /**
     * 滑动结束的回调
     * @param {number} value - 具体值
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
     * 圆环中心自定义内容
     */
    renderCenterView: PropTypes.element,
  };

  static defaultProps = {
    ...Gesture.defaultProps,
    gradientId: 'Space',
    value: 50,
    startDegree: 135,
    andDegree: 270,
    min: 0,
    max: 100,
    stepValue: 0,
    scaleNumber: 120,
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
    renderCenterView: null,
  };

  constructor(props) {
    super(props);
    this.fixDegreeAndBindToInstance(props);
    this.state = {
      value: props.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.fixDegreeAndBindToInstance(nextProps);
    if (this.state.value !== nextProps.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  fixDegreeAndBindToInstance(props) {
    const { startDegree, andDegree, value } = props;
    this.startDegree = startDegree;
    this.endDegree = startDegree + andDegree;
    // 当初始度数大于360度时
    if (startDegree >= 360) {
      this.startDegree = startDegree % 360;
      this.endDegree = (startDegree + andDegree) % 360;
    }
    // 基础圆环路径
    this.backScalePath = this.createSvgPath(andDegree);
    // 具体值对应的角度
    const deltaDeg = this.mapValueToDeltaDeg(value);
    // 小于具体值的路径
    this.foreScalePath = this.createSvgPath(deltaDeg);
  }

  onStartShouldSetResponder({ nativeEvent: { locationX, locationY } }) {
    return this.shouldSetResponder(locationX, locationY);
  }

  shouldSetResponder(x0, y0) {
    const { scaleHeight, disabled } = this.props;
    if (disabled) {
      return false;
    }
    const { r } = this.getCircleInfo();
    const { x, y } = this.getXYRelativeCenter(x0, y0);
    const len = Math.sqrt(x * x + y * y);
    const innerR = r - scaleHeight;
    const should = this.shouldUpdateScale(x0, y0);
    const finalShould = should && len <= r && len >= innerR;
    return finalShould;
  }

  shouldUpdateScale(x, y) {
    const { startDegree, endDegree } = this;
    const deg = this.getDegRelativeCenter(x, y);
    let should;
    if (endDegree < 360) {
      should = deg >= startDegree && deg <= endDegree;
    } else {
      should = deg >= startDegree || deg <= endDegree % 360;
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
    const { startDegree } = this;
    const deg = this.getDegRelativeCenter(locationX, locationY);
    if (this.shouldUpdateScale(locationX, locationY)) {
      let deltaDeg = deg - startDegree;
      if (deltaDeg < 0) {
        deltaDeg = deg + 360 - startDegree;
      }
      this.foreScalePath = this.createSvgPath(deltaDeg);
      const value = this.mapDeltaDegToValue(deltaDeg);
      if (typeof fn === 'function') fn(value);
      this.setState({
        value,
      });
    }
  }

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

  // 进度条渲染线目的条数
  mapDeltaDegToScaleCount(deltaDeg) {
    const { scaleNumber, andDegree } = this.props;
    const eachDeg = andDegree / scaleNumber;
    let count = Math.ceil(deltaDeg / eachDeg);
    if (count > scaleNumber) count = scaleNumber;
    return count;
  }

  mapDeltaDegToValue(deltaDeg) {
    const count = this.mapDeltaDegToScaleCount(deltaDeg);
    const { min, max, scaleNumber, andDegree, stepValue } = this.props;
    if (stepValue) {
      const eachDeg = andDegree / scaleNumber;
      const deltaValue = max - min;
      const value = Math.round((count * eachDeg * deltaValue) / stepValue / andDegree);
      return Math.max(min, Math.min(max, value * stepValue + min));
    }
    const eachDeg = andDegree / scaleNumber;
    const deltaValue = max - min;
    const value = (count * eachDeg * deltaValue) / andDegree;
    return Math.max(min, Math.min(max, value + min));
  }

  // 具体值对应的角度
  mapValueToDeltaDeg(value) {
    const { min, max, andDegree } = this.props;
    return ((value - min) * andDegree) / (max - min);
  }

  // 计算路径路径
  createSvgPath(deltaDeg = 0) {
    if (deltaDeg === 0) return '';
    const { r } = this.getCircleInfo();
    const { startDegree } = this;
    const { scaleNumber, scaleHeight, andDegree } = this.props;
    // 每个角度
    const eachDeg = andDegree / scaleNumber;
    const innerRadius = r - scaleHeight;

    const count = this.mapDeltaDegToScaleCount(deltaDeg);
    let path = '';

    for (let i = 0; i <= count; i++) {
      const pointDeg = startDegree + i * eachDeg;
      const pointAngle = (pointDeg * Math.PI) / 180;
      const _x1 = r + r * Math.cos(pointAngle);
      const _y1 = r + r * Math.sin(pointAngle);
      const _x2 = r + innerRadius * Math.cos(pointAngle);
      const _y2 = r + innerRadius * Math.sin(pointAngle);
      path += `M${_x1} ${_y1} L${_x2} ${_y2}`;
    }
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
      x1,
      x2,
      y1,
      y2,
      renderCenterView,
      min,
    } = this.props;
    const { r } = this.getCircleInfo();
    const size = r * 2;
    const isGradient = foreColor && typeof foreColor === 'object';
    const greater = this.state.value !== min;
    return (
      <View
        {...responder}
        style={[
          {
            width: 125,
            height: 125,
          },
          style,
        ]}
      >
        <Svg width={size} height={size}>
          <Path
            d={this.backScalePath}
            x="0"
            y="0"
            fill="none"
            stroke={backColor}
            strokeOpacity={backStrokeOpacity}
          />
          {isGradient && greater && (
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
            strokeOpacity={foreStrokeOpacity}
            strokeWidth={0}
            gradientId={gradientId}
            foreColor={foreColor}
          />
        </Svg>
        {renderCenterView}
      </View>
    );
  }
}
