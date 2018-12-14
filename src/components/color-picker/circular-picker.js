import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import {
  View,
  Image,
  PanResponder,
  StyleSheet,
  ViewPropTypes,
} from 'react-native';
import Svg, {
  G,
  Circle,
  Defs,
  Stop,
  LinearGradient,
} from 'react-native-svg';
import { NumberUtils } from '../../utils';

const thumb = require('./res/circular-thumb.png');

const { calcPercent, inMaxMin } = NumberUtils;

/**
 * 极坐标转笛卡尔坐标
 * @param {number} radius 半径
 * @param {number} degreeInAngle 角度
 * @returns {object} 笛卡尔坐标系的{x, y}
 */
const polar2Cartesian = (radius, degreeInAngle) => {
  const rad = degreeInAngle * Math.PI / 180;
  const x = radius + (radius) * Math.cos(rad);
  const y = radius + (radius) * Math.sin(rad);
  return { x, y };
};

/**
 * 笛卡尔坐标转极坐标
 * @param {number} x 横坐标
 * @param {number} y 纵坐标
 */
const cartesian2Polar = (x, y) => {
  const r = Math.sqrt(x * x, y * y);
  const rad = Math.atan2(y, x);
  return { r, rad };
};

/**
 * 角度转弧度
 * @param {number} degreeInAngle 角度
 */
const degree2rad = degreeInAngle => {
  return degreeInAngle * Math.PI / 180;
};

/**
 * 弧度转角度
 * @param {number} degreeInRad 弧度
 */
const rad2degree = degreeInRad => degreeInRad * 180 / Math.PI;

export default class CircularPicker extends PureComponent {
  static propTypes = {
    style: ViewPropTypes.style,
    thumbStyle: Image.propTypes.style,
    degree: PropTypes.number,
    startDegree: PropTypes.number,
    endDegree: PropTypes.number,
    radius: PropTypes.number,
    frontStrokeColor: PropTypes.string,
    strokeColor: PropTypes.string,
    strokeWidth: PropTypes.number,
    strokeLinecap: PropTypes.oneOf(['butt', 'round', 'square']),
    disabled: PropTypes.bool,
    TrackComponent: PropTypes.element,
    renderThumb: PropTypes.func,
    onStart: PropTypes.func,
    onValueChange: PropTypes.func,
    onComplete: PropTypes.func,
    stops: PropTypes.arrayOf(PropTypes.shape({
      offset: PropTypes.string.isRequired,
      ...Stop.propTypes,
    })),
  }

  static defaultProps = {
    style: null,
    thumbStyle: null,
    degree: 0,
    radius: 115,
    frontStrokeColor: null,
    strokeColor: 'red',
    strokeWidth: 40,
    strokeLinecap: 'round',
    startDegree: 30,
    endDegree: 330,
    disabled: false,
    TrackComponent: null,
    renderThumb: null,
    onStart: null,
    onValueChange: null,
    onComplete: null,
    stops: null,
    // stops: [{
    //   offset: '0%',
    //   stopColor: '#FEECAB',
    //   stopOpacity: 1,
    // }, {
    //   offset: '100%',
    //   stopColor: '#C0E8FF',
    //   stopOpacity: 1,
    // }],
  }

  constructor(props) {
    super(props);
    const { radius, strokeWidth } = props;

    this._thumbRadius = strokeWidth * 0.5 + 2;

    this._centerPoint = radius + this._thumbRadius;

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.shouldSetResponder,
      onMoveShouldSetPanResponder: this.shouldSetResponder,
      onPanResponderGrant: this._handleGrant,
      onPanResponderMove: this._handleMove,
      onPanResponderRelease: this._handleRelease,
      onPanResponderTerminate: this._handleRelease,
    });
  }

  componentWillReceiveProps({ radius, strokeWidth }) {
    if (
      this.props.radius !== radius ||
      this.props.strokeWidth !== strokeWidth
    ) {
      this._thumbRadius = strokeWidth * 0.5 + 2;
      this._centerPoint = radius + this._thumbRadius;
    }
  }

  // 通过角度得到弧长
  getArcLengthByDegree(degree) {
    const { radius } = this.props;
    // 弧长 = 半径 * 弧度
    return degree2rad(degree) * radius;
  }

  shouldSetResponder = () => !this.props.disabled;

  // 中心坐标系转换成svg里的左上角顶点坐标系
  adjustSvgCoordinates = (x, y, rad) => {
    // 第一象限
    if (x > 0 && y > 0) return Math.PI * 2 - rad;
    // 第二象限
    if (x < 0 && y > 0) return Math.PI * 2 - rad;
    // 第三象限
    if (x < 0 && y < 0) return Math.abs(rad);
    // 第四象限
    if (x > 0 && y < 0) return Math.abs(rad);

    // 落在纵轴上
    if (x === 0 && y > 0) return Math.PI * 3 / 2;
    if (x === 0 && y < 0) return Math.PI / 2;
    return 0;
  }

  _moveTo(xRelativeOrigin, yRelativeOrigin, callback) {
    const { startDegree, endDegree, radius } = this.props;

    const xRelativeCenter = xRelativeOrigin - this._centerPoint - this._thumbRadius;
    const yRelativeCenter = yRelativeOrigin - this._centerPoint - this._thumbRadius;
    const { rad } = cartesian2Polar(xRelativeCenter, yRelativeCenter);
    const adjustRad = this.adjustSvgCoordinates(xRelativeCenter, yRelativeCenter, rad);
    const degree = rad2degree(adjustRad);

    let realDegree = degree - 360;
    const realStartDegree = -startDegree - 90;
    const realEndDegree = -endDegree - 90 + 360;

    const isBeyondStart = realDegree > realStartDegree;
    const isBeyondEnd = realDegree < realEndDegree;
    const inSpecialRange = realEndDegree > 0 && realDegree < -270;

    if (isBeyondStart && isBeyondEnd) {
      const sDelta = realDegree - realStartDegree;
      const eDelta = realEndDegree - realDegree;
      realDegree = sDelta < eDelta ? realStartDegree : realEndDegree;
    }

    if (inSpecialRange) {
      realDegree = realEndDegree;
    }

    const { x, y } = polar2Cartesian(radius, 360 - realDegree);

    this.updateThumbStyle({
      transform: [{
        translate: [x, y],
      }],
    });

    const transformedDegree = realDegree < -90
      ? -(realDegree + 90)
      : -(realDegree - 270);

    typeof callback === 'function' && callback({
      hue: degree,
      degree: transformedDegree,
      percent: calcPercent(startDegree, endDegree, transformedDegree),
    });
  }

  _handleGrant = e => {
    const { locationX, locationY } = e.nativeEvent;
    this.xRelativeOriginStart = locationX;
    this.yRelativeOriginStart = locationY;
    this.props.onStart && this.props.onStart();
  }

  _handleMove = (e, gestureState) => {
    const { dx, dy } = gestureState;
    const xRelativeOrigin = this.xRelativeOriginStart + dx;
    const yRelativeOrigin = this.yRelativeOriginStart + dy;
    this._moveTo(xRelativeOrigin, yRelativeOrigin, this.props.onValueChange);
  }

  _handleRelease = (e, gestureState) => {
    const { dx, dy } = gestureState;
    const xRelativeOrigin = this.xRelativeOriginStart + dx;
    const yRelativeOrigin = this.yRelativeOriginStart + dy;
    this._moveTo(xRelativeOrigin, yRelativeOrigin, this.props.onComplete);
    this.xRelativeOriginStart = 0;
    this.yRelativeOriginStart = 0;
  }

  updateThumbStyle(style) {
    if (this._thumbRef) {
      this._thumbRef.setNativeProps({ style });
    }
  }

  _renderTrack() {
    const {
      degree,
      radius,
      frontStrokeColor,
      strokeColor,
      strokeWidth,
      strokeLinecap,
      startDegree,
      endDegree,
      TrackComponent,
      stops,
    } = this.props;
    const size = this._centerPoint * 2;
    if (TrackComponent) {
      return React.cloneElement(TrackComponent, {
        style: [TrackComponent.props.style, { width: size, height: size }]
      });
    }
    // strokeDashoffset从三点钟方向开始
    // 我们在这把他转为从底部六点钟开始
    const degreeOffset = -90 - startDegree;
    const endDegreeDiff = endDegree - startDegree;
    const degreeDiff = inMaxMin(startDegree, endDegree, degree) - startDegree;
    const commonCircleProps = {
      cx: this._centerPoint,
      cy: this._centerPoint,
      r: radius,
      fill: 'transparent',
      strokeWidth,
      strokeLinecap,
      strokeDashoffset: this.getArcLengthByDegree(degreeOffset),
    };
    return (
      <Svg
        width={size}
        height={size}
      >
        <G>
          <Circle
            {...commonCircleProps}
            stroke={stops ? 'url(#Gradient)' : strokeColor}
            strokeDasharray={[
              this.getArcLengthByDegree(endDegreeDiff),
              this.getArcLengthByDegree(360 - endDegreeDiff),
            ]}
          />
          {stops && (
            <Defs>
              <LinearGradient id="Gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                {/* eslint-disable-next-line react/no-array-index-key */}
                {stops.map((stopProps, i) => <Stop key={i} {...stopProps} />)}
              </LinearGradient>
            </Defs>
          )}
          {frontStrokeColor && (
            <Circle
              {...commonCircleProps}
              stroke={frontStrokeColor}
              strokeDasharray={[
                this.getArcLengthByDegree(degreeDiff),
                this.getArcLengthByDegree(360 - degreeDiff),
              ]}
            />
          )}
        </G>
      </Svg>
    );
  }

  _renderThumb() {
    const {
      thumbStyle,
      degree,
      disabled,
      renderThumb,
      radius,
    } = this.props;
    // 默认从三点钟方向开始
    // 我们在这把他转为从底部六点钟开始
    const transformedDegree = -degree - 90;
    const { x, y } = polar2Cartesian(radius, 360 - transformedDegree);
    const size = this._thumbRadius * 2;
    if (renderThumb) {
      return renderThumb({
        disabled,
        x,
        y,
        size,
      });
    }
    return (
      <Image
        ref={ref => { this._thumbRef = ref; }}
        source={thumb}
        style={[
          styles.thumb,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            opacity: disabled ? 0 : 1,
            transform: [{
              translate: [x, y],
            }],
          },
          thumbStyle,
        ]}
      />
    );
  }

  render() {
    const { style } = this.props;
    return (
      <View
        style={[style, {
          width: this._centerPoint * 2,
          height: this._centerPoint * 2,
        }]}
        pointerEvents="box-only"
        {...this._panResponder.panHandlers}
      >
        {/* 轨道 */}
        {this._renderTrack()}

        {/* 圆球 */}
        {this._renderThumb()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  thumb: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'transparent',
    transform: [{
      translate: [0, 0],
    }],
  },
});
