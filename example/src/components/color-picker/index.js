import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, PanResponder, Image, ViewPropTypes } from 'react-native';
import ReactNativeComponentTree from 'react-native/Libraries/Renderer/shims/ReactNativeComponentTree';
import { Utils } from 'tuya-panel-kit';
import colorPicker from './res/color-picker.png';
import thumb from './res/thumb.png';
import white from './res/white.png';

const { color: Color } = Utils.ColorUtils;
const { convert } = Utils.RatioUtils;

const defaultThumbSize = convert(40);
const defaultThumbInnerSize = convert(28);
const minBrightness = 0;
const maxBrightness = 100;
const minSaturation = 0;
const maxSaturation = 100;

export default class ColorPicker extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    width: PropTypes.number,
    height: PropTypes.number,
    hsb: PropTypes.arrayOf(PropTypes.number),
    disabled: PropTypes.bool,
    mode: PropTypes.oneOf(['colour', 'white']),
    colorPickerImage: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        uri: PropTypes.string.isRequired,
      }),
    ]),
    innerRadius: PropTypes.number,
    hasInner: PropTypes.bool,
    innerElement: PropTypes.element,
    onPress: PropTypes.func,
    onStart: PropTypes.func,
    onValueChange: PropTypes.func,
    onComplete: PropTypes.func,
    /**
     * 事件统一回调，包含onStart onValueChange, onComplete
     */
    onChange: PropTypes.func,
  };

  static defaultProps = {
    style: null,
    width: convert(264),
    height: convert(264),
    hsb: [180, 100, 100],
    disabled: false,
    mode: 'colour',
    colorPickerImage: colorPicker,
    innerRadius: convert(64 / 2),
    hasInner: true,
    innerElement: null,
    onPress() {},
    onStart() {},
    onValueChange() {},
    onComplete() {},
    onChange: null,
  };

  static correctionHSB(hsb) {
    const [h, s, b] = hsb;
    const isSCorrect = s >= minSaturation && s <= maxSaturation;
    const isBCorrect = b >= minBrightness && b <= maxBrightness;

    if (isSCorrect && isBCorrect) {
      return hsb;
    }

    const _s = s < minSaturation ? minSaturation : s > maxSaturation ? maxSaturation : s;
    const _b = b < minBrightness ? minBrightness : b > maxBrightness ? maxBrightness : b;
    return [h, _s, _b];
  }

  static getBrightnessRate(brightness) {
    const range = maxBrightness - minBrightness;
    return (brightness - minBrightness) / range;
  }

  static getSaturationRate(saturation) {
    const range = maxSaturation - minSaturation;
    return (saturation - minSaturation) / range;
  }

  constructor(props) {
    super(props);

    const { hsb } = props;
    const { cx, cy, r } = this.getCircleInfo(props);

    this.cx = cx;
    this.cy = cy;
    this.r = r;

    this.hsb = hsb;
    const xyRelativeOrigin = this.mapHsbToXYRelativeOrigin(hsb);
    this.thumbXY = this.getThumbCoord(xyRelativeOrigin.x, xyRelativeOrigin.y);

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: e => {
        const { xRelativeOrigin, yRelativeOrigin } = this.getStartOriginCoordByTouchEvent(e);
        const distance = this.getLengthTouchPointToCenterPoint(xRelativeOrigin, yRelativeOrigin);
        const { disabled, onPress, innerRadius } = this.props;
        if (disabled) return !disabled;
        if (typeof onPress === 'function') {
          if (distance < innerRadius) {
            onPress();
          } else if (distance < this.r) {
            // onPress('colour');
          }
        }
        return this.shouldSetPanHandle(e);
      },
      onMoveShouldSetPanResponder: this.shouldSetPanHandle,
      onPanResponderGrant: this.panResponderGrantHandle,
      onPanResponderMove: this.panResponderMoveHandle,
      onPanResponderRelease: this.panResponderCompleteHandle,
      onPanResponderTerminationRequest: () => false,
      onPanResponderTerminate: this.panResponderCompleteHandle,
      onStartShouldSetResponderCapture: () => false,
      onMoveShouldSetPanResponderCapture: () => false,
    });

    this.xRelativeOriginStart = 0;
    this.yRelativeOriginStart = 0;

    ['Hue', 'Saturation', 'Brightness'].forEach((item, i) => {
      this[`set${item}`] = v => {
        this.hsb[i] = v;
        const { x, y } = this.mapHsbToXYRelativeOrigin(this.hsb);
        this.eventHandle(x, y);
      };

      this[`get${item}`] = () => this.hsb[i];
    });
  }

  componentWillReceiveProps(nextProps) {
    const { width: newWidth, height: newHeight, hsb: newHsb } = nextProps;
    const { width, height } = this.props;

    if (this.xRelativeOriginStart || this.yRelativeOriginStart) return;

    let shouldUpdate = false;

    if (width * height !== newWidth * newHeight) {
      const { cx, cy, r } = this.getCircleInfo(nextProps);
      this.cx = cx;
      this.cy = cy;
      this.r = r;
      shouldUpdate = true;
    }

    const [h, s, b] = this.hsb;
    const [_h, _s, _b] = newHsb;

    if (Math.abs(_h - h) > 0.5 || Math.abs(_s - s) > 0.5 || Math.abs(_b - b) > 0.5) {
      shouldUpdate = true;
    }

    if (shouldUpdate) {
      this.hsb = newHsb;
      const xyRelativeOrigin = this.mapHsbToXYRelativeOrigin(newHsb);
      this.eventHandle(xyRelativeOrigin.x, xyRelativeOrigin.y);
      this.forceUpdate();
    }
    this.shouldUpdate = shouldUpdate;
  }

  shouldComponentUpdate(nextProps) {
    const shouldUpdate = !!this.shouldUpdate;
    this.shouldUpdate = false;
    if (this.props.mode !== nextProps.mode) {
      return true;
    }
    return this.isTouching ? false : shouldUpdate;
  }

  getThumbCoord(xRelativeOrigin, yRelativeOrigin) {
    return {
      x: xRelativeOrigin - defaultThumbSize / 2,
      y: yRelativeOrigin - defaultThumbSize / 2,
    };
  }

  getCircleInfo(props) {
    const { width, height } = props;
    const size = Math.min(width, height);
    const r = size / 2;

    return {
      r,
      cx: r + defaultThumbSize / 2,
      cy: r + defaultThumbSize / 2,
    };
  }

  getLengthTouchPointToCenterPoint(x, y) {
    // eslint-disable-next-line no-unused-vars
    const { cx, cy, r } = this;
    // eslint-disable-next-line no-restricted-properties
    return Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2));
  }

  getColorInfo(xRelativeOrigin, yRelativeOrigin) {
    const h = this.getHueByCoord(xRelativeOrigin, yRelativeOrigin);
    const s = this.getSaturationByCoord(xRelativeOrigin, yRelativeOrigin);
    const b = this.hsb[2];

    return [h, s, b];
  }

  getHueByCoord(xRelativeOrigin, yRelativeOrigin) {
    return this.getDegree(xRelativeOrigin, yRelativeOrigin);
  }

  getSaturationByCoord(x, y) {
    const { innerRadius } = this.props;
    const maxLen = this.r - innerRadius;
    let b = this.getLengthTouchPointToCenterPoint(x, y) - innerRadius;
    b = b < 0 ? 0 : b > maxLen ? maxLen : b;
    const range = maxSaturation - minSaturation;
    return minSaturation + (b * range) / maxLen;
  }

  setThumbStyle(style) {
    this.thumbRef.setNativeProps({ style });
  }

  getRadian(xRelativeOrigin, yRelativeOrigin) {
    const xRelativeCenter = xRelativeOrigin - this.cx;
    const yRelativeCenter = yRelativeOrigin - this.cy;

    let rad = Math.atan2(yRelativeCenter, xRelativeCenter);

    if (xRelativeCenter > 0 && yRelativeCenter > 0) rad = Math.PI * 2 - rad;
    if (xRelativeCenter < 0 && yRelativeCenter > 0) rad = Math.PI * 2 - rad;
    if (xRelativeCenter < 0 && yRelativeCenter < 0) rad = Math.abs(rad);
    if (xRelativeCenter > 0 && yRelativeCenter < 0) rad = Math.abs(rad);

    if (xRelativeCenter === 0 && yRelativeCenter > 0) rad = (Math.PI * 3) / 2;
    if (xRelativeCenter === 0 && yRelativeCenter < 0) rad = Math.PI / 2;
    return rad;
  }

  getDegree(xRelativeOrigin, yRelativeOrigin) {
    const rad = this.getRadian(xRelativeOrigin, yRelativeOrigin);
    return (rad * 180) / Math.PI;
  }

  getStartOriginCoordByTouchEvent(e) {
    const { locationX, locationY } = e.nativeEvent;
    return {
      xRelativeOrigin: locationX,
      yRelativeOrigin: locationY,
    };
  }

  getETargetInstance(e) {
    return ReactNativeComponentTree.getInstanceFromNode(e.target);
  }

  getETargetElement(e) {
    const inst = this.getETargetInstance(e);
    return inst._currentElement;
  }

  getMiddleView = () => {
    const { innerElement, innerRadius, mode, hasInner } = this.props;
    const Res = { white };
    const isColorMode = mode === 'colour';
    if (!hasInner) return null;
    if (innerElement) return innerElement;
    return (
      <View
        style={{
          width: innerRadius * 2,
          height: innerRadius * 2,
          borderRadius: innerRadius,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: convert(56),
            height: convert(56),
            borderRadius: innerRadius,
            backgroundColor: '#F8F8F8',
            borderWidth: convert(4),
            borderColor: '#fff',
          }}
        />
        <Image
          source={Res.white}
          resizeMode="contain"
          style={{
            width: innerRadius * 2,
            height: innerRadius * 2,
            borderRadius: innerRadius,
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: isColorMode ? 0 : 1,
          }}
        />
      </View>
    );
  };

  eventHandle(xRelativeOrigin, yRelativeOrigin, fn) {
    const { xFixedRelativeOrigin, yFixedRelativeOrigin } = this.fixXYRelativeOrigin(
      xRelativeOrigin,
      yRelativeOrigin
    );
    this.thumbXY = this.getThumbCoord(xFixedRelativeOrigin, yFixedRelativeOrigin);

    if (this.thumbWrapRef) {
      const style = {
        left: this.thumbXY.x,
        top: this.thumbXY.y,
      };
      this.thumbWrapRef.setNativeProps({ style });
    }
    const hsb = this.getColorInfo(xFixedRelativeOrigin, yFixedRelativeOrigin);
    const rgb = Color.hsb2rgb(...hsb);
    this.hsb = hsb;
    const hexColor = Color.hsb2hex(...hsb);
    this.setThumbStyle({ backgroundColor: hexColor });
    typeof fn === 'function' && fn(hsb, rgb);
    typeof fn === 'function' &&
      typeof this.props.onChange === 'function' &&
      this.props.onChange(hsb, rgb);
  }

  updateThumb(saturation) {
    const [hue, , brightness] = this.hsb;
    const { x, y } = this.mapHsbToXYRelativeOrigin([hue, saturation, brightness]);
    this.eventHandle(x, y);
  }

  shouldSetPanHandle = e => {
    const { disabled, innerRadius } = this.props;
    if (disabled) return !disabled;
    const { xRelativeOrigin, yRelativeOrigin } = this.getStartOriginCoordByTouchEvent(e);
    const thumbX1 = this.thumbXY.x - defaultThumbSize / 2;
    const thumbY1 = this.thumbXY.y - defaultThumbSize / 2;
    const thumbX2 = this.thumbXY.x + defaultThumbSize / 2;
    const thumbY2 = this.thumbXY.y + defaultThumbSize / 2;

    if (
      thumbX1 < xRelativeOrigin &&
      xRelativeOrigin < thumbX2 &&
      thumbY1 < yRelativeOrigin &&
      yRelativeOrigin < thumbY2
    ) {
      return true;
    }
    const distance = this.getLengthTouchPointToCenterPoint(xRelativeOrigin, yRelativeOrigin);
    if (distance < innerRadius) return false;
    return distance <= this.r && distance >= innerRadius;
  };

  panResponderGrantHandle = e => {
    const { onStart } = this.props;
    const { xRelativeOrigin, yRelativeOrigin } = this.getStartOriginCoordByTouchEvent(e);
    this.xRelativeOriginStart = xRelativeOrigin;
    this.yRelativeOriginStart = yRelativeOrigin;
    this.eventHandle(xRelativeOrigin, yRelativeOrigin, onStart);
  };

  panResponderMoveHandle = (e, gestureState) => {
    const { onValueChange } = this.props;
    this.isTouching = true;
    const { dx, dy } = gestureState;
    const xRelativeOrigin = this.xRelativeOriginStart + dx;
    const yRelativeOrigin = this.yRelativeOriginStart + dy;
    this.eventHandle(xRelativeOrigin, yRelativeOrigin, onValueChange);
  };

  panResponderCompleteHandle = (e, gestureState) => {
    const { onComplete } = this.props;
    const { dx, dy } = gestureState;
    const xRelativeOrigin = this.xRelativeOriginStart + dx;
    const yRelativeOrigin = this.yRelativeOriginStart + dy;
    this.eventHandle(xRelativeOrigin, yRelativeOrigin, onComplete);
    this.xRelativeOriginStart = 0;
    this.yRelativeOriginStart = 0;
    this.isTouching = false;
  };

  fixXYRelativeOrigin(xRelativeOrigin, yRelativeOrigin) {
    const { innerRadius } = this.props;
    const { r, cx, cy } = this;
    const distance = this.getLengthTouchPointToCenterPoint(xRelativeOrigin, yRelativeOrigin);
    const xRelativeCenter = xRelativeOrigin - cx;
    const yRelativeCenter = yRelativeOrigin - cy;
    const angle = Math.atan2(yRelativeCenter, xRelativeCenter);
    let xFixedRelativeOrigin = xRelativeOrigin;
    let yFixedRelativeOrigin = yRelativeOrigin;
    if (distance > r) {
      xFixedRelativeOrigin = r * Math.cos(angle) + cx;
      yFixedRelativeOrigin = r * Math.sin(angle) + cy;
    } else if (distance < innerRadius) {
      xFixedRelativeOrigin = innerRadius * Math.cos(angle) + cx;
      yFixedRelativeOrigin = innerRadius * Math.sin(angle) + cy;
    }
    return {
      xFixedRelativeOrigin,
      yFixedRelativeOrigin,
    };
  }

  mapHsbToXYRelativeOrigin(hsb) {
    const rad = ((360 - hsb[0]) * Math.PI) / 180;
    const s = hsb[1];
    const length = this.mapSaturationToLength(s);
    const x = length * Math.cos(rad) + this.cx;
    const y = length * Math.sin(rad) + this.cy;
    return { x, y };
  }

  mapSaturationToLength(s) {
    const { innerRadius } = this.props;
    const maxLen = this.r - innerRadius;
    const range = maxSaturation - minSaturation;

    return (maxLen / range) * (s - minSaturation) + innerRadius;
  }

  render() {
    const { height, width, mode, style, colorPickerImage } = this.props;
    const _width = width + defaultThumbSize;
    const _height = height + defaultThumbSize;
    const isColorMode = mode === 'colour';
    const Res = {
      colorPicker: colorPickerImage,
      thumb,
    };
    const middleView = this.getMiddleView();
    return (
      <View
        style={[
          {
            alignItems: 'center',
            justifyContent: 'center',
            width: _width,
            height: _height,
          },
          style,
        ]}
        {...this._panResponder.panHandlers}
      >
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width,
            height,
          }}
        >
          <Image
            source={Res.colorPicker}
            style={{
              width,
              height,
              position: 'absolute',
              left: 0,
              top: 0,
            }}
            resizeMode="contain"
          />
          {middleView}
        </View>

        <View
          style={{
            width: defaultThumbSize,
            height: defaultThumbSize,
            position: 'absolute',
            borderRadius: defaultThumbSize / 2,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isColorMode ? 1 : 0,
            top: this.thumbXY.y,
            left: this.thumbXY.x,
          }}
          ref={ref => {
            this.thumbWrapRef = ref;
          }}
        >
          <View
            ref={ref => {
              this.thumbRef = ref;
            }}
            style={{
              width: defaultThumbInnerSize,
              height: defaultThumbInnerSize,
              borderRadius: defaultThumbInnerSize / 2,
              backgroundColor: Color.hsb2hex(...this.hsb),
            }}
          />
          <Image
            source={Res.thumb}
            resizeMode="contain"
            style={{
              width: defaultThumbSize,
              height: defaultThumbSize,
              borderRadius: defaultThumbSize / 2,
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
        </View>

        <View
          style={{
            width: _width,
            height: _height,
            position: 'absolute',
            left: 0,
            top: 0,
          }}
          pointerEvents="box-only"
        />
      </View>
    );
  }
}
