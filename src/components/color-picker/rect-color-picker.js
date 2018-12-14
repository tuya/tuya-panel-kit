/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-continue */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
import PropTypes from 'prop-types';
import React from 'react';
import { View, Image, StyleSheet, ViewPropTypes } from 'react-native';
import styleEqual from 'style-equal';
import Hue from './components/hue';
import Gesture from './components/gesture';
import { convert } from '../../utils/ratio';
import ColorUtils from '../../utils/color';
import resThumb from './res/thumb.png';

const Color = ColorUtils.color;

const noop = () => null;

const _thumbWidth = convert(32);
const _thumbHeight = convert(32);

/* istanbul ignore next */
const isEqual = (x, y) => {
  if (x === y) return true;
  if (!(x instanceof Object) || !(y instanceof Object)) return false;
  if (x.constructor !== y.constructor) return false;
  for (const p in x) {
    if (!x.hasOwnProperty(p)) continue;
    if (!y.hasOwnProperty(p)) return false;
    if (x[p] === y[p]) continue;
    if (typeof x[p] !== 'object') return false;
    if (!Object.equals(x[p], y[p])) return false;
  }
  for (const q in y) {
    if (y.hasOwnProperty(q) && !x.hasOwnProperty(q)) return false;
  }
  return true;
};

function getReactInstanceProps(inst) {
  let style = {};
  if (inst.props) {
    style = inst.props.style;
  } else if (inst._currentElement && inst._currentElement.props) {
    style = inst._currentElement.props.style;
  }
  return style;
  // return inst.props ? inst.props.style : inst._currentElement.props.style;
}

/* istanbul ignore next */
function satPropType(values) {
  return (props, propName, componentName) => {
    const value = props[propName];
    if (value === undefined || value === 'none') {
      return;
    }

    let index = values.indexOf(value);
    if (index === -1) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed.`
      );
    }

    if (props.axis === 'x') {
      index = ['2t', '2b'].indexOf(value);
      if (index === -1) {
        return new Error(
          `Invalid prop \`${propName}\` supplied to \`${componentName}\` when prop axis set \`x\`. Validation failed.`
        );
      }
    }

    if (props.axis === 'y') {
      index = ['2l', '2r'].indexOf(value);
      if (index === -1) {
        return new Error(
          `Invalid prop \`${propName}:${value}\` supplied to \`${componentName}\` when prop axis set \`y\`. Validation failed.`
        );
      }
    }
  };
}

export default class RectColorPicker extends Gesture {
  static propTypes = {
    ...Gesture.propTypes,
    style: ViewPropTypes.style,
    hueStyle: ViewPropTypes.style,
    thumbStyle: ViewPropTypes.style,
    minK: PropTypes.number,
    maxK: PropTypes.number,
    disabled: PropTypes.bool,
    kelvin: PropTypes.bool,
    overstep: PropTypes.bool,
    withFollowColor: PropTypes.bool,
    axis: PropTypes.oneOf(['x', 'y']),
    direction: PropTypes.oneOf(['horizontal', 'all', 'vertical']),
    saturation: satPropType(['none', '2l', '2r', '2b', '2t']),
    hsb: PropTypes.arrayOf(PropTypes.number),
    // 归一化坐标
    position: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
    onStart: PropTypes.func,
    onValueChange: PropTypes.func,
    onComplete: PropTypes.func,
    renderThumb: PropTypes.func,
    children: PropTypes.any,
  };

  static defaultProps = {
    ...Gesture.defaultProps,
    minK: 2500,
    maxK: 9000,
    disabled: false,
    kelvin: false,
    withFollowColor: false, // thumb背景色是否跟着底色
    overstep: false, // thumb 是否可以超出边界
    axis: 'x', // 色相的方向
    direction: 'horizontal', // thumb 滑动的方向
    saturation: 'none', // 饱和度方向
    hsb: [120, 100, 100],
    renderThumb: props => <Image source={resThumb} {...props} />,
  };

  constructor(props) {
    super(props);
    const {
      width,
      height,
      paddingHorizontal,
      paddingVertical
    } = this.getMeasureFromStyle(props.style);

    let { width: thumbWidth, height: thumbHeight } = this.getMeasureFromStyle(
      props.thumbStyle
    );

    if (!thumbHeight) thumbHeight = _thumbHeight;
    if (!thumbWidth) thumbWidth = _thumbWidth;

    this.state = {
      hueWidth: width,
      hueHeight: height,
      paddingHorizontal,
      paddingVertical,
      thumbWidth,
      thumbHeight
    };
  }

  eventHandle({ locationX, locationY }, fn) {
    const { thumbWidth, thumbHeight } = this.state;
    const { withFollowColor } = this.props;
    const pos = { x: locationX, y: locationY };
    const { x, y } = this.getThumbPosition(pos);
    const colorK = this.getColorKelvinByPosition({
      x: x + thumbWidth / 2,
      y: y + thumbHeight / 2
    });
    const normalizedPos = this.getNormalizedPosition(pos);
    const _thumbStyle = { left: x, top: y };
    if (withFollowColor) {
      _thumbStyle.backgroundColor = colorK.hex;
    }
    this.setThumbStyle(_thumbStyle);
    typeof fn === 'function' && fn({ ...colorK, ...normalizedPos });
  }

  onGrant(e, gesture) {
    const fn = this.props.onStart;
    this.eventHandle(gesture, fn);
  }

  onMove(e, gesture) {
    const fn = this.props.onValueChange;
    this.eventHandle(gesture, fn);
  }

  onRelease(e, gesture) {
    const fn = this.props.onComplete;
    this.eventHandle(gesture, fn);
  }

  setInstance = ref => {
    this.__root = ref;
  };

  // 归一化坐标
  getNormalizedPosition({ x, y }) {
    const { hueWidth, hueHeight } = this.state;
    let _x = x / hueWidth;
    let _y = y / hueHeight;

    _x = _x < 0 ? 0 : _x > 1 ? 1 : _x;
    _y = _y < 0 ? 0 : _y > 1 ? 1 : _y;

    return {
      x: _x,
      y: _y
    };
  }

  // 获取实际坐标
  getRealPosition({ x, y }) {
    const { hueWidth, hueHeight } = this.state;

    return {
      x: x * hueWidth,
      y: y * hueHeight
    };
  }

  getColorKelvinByPosition({ x, y }) {
    const { hueWidth, hueHeight, thumbWidth, thumbHeight } = this.state;
    const {
      axis,
      saturation,
      kelvin,
      minK,
      maxK,
      formatKelvin,
      overstep
    } = this.props;

    const isHorizontal = axis === 'x';
    let h = 0;
    let s = 100;
    let b = 100;
    let maxSat = 100;
    let k = 2500;

    let hueLen = isHorizontal ? x : y;
    if (!overstep) {
      hueLen -= isHorizontal ? thumbWidth / 2 : thumbHeight / 2;
    }

    if (kelvin) {
      if (typeof formatKelvin === 'function') {
        k = formatKelvin(x, y, hueWidth, hueHeight);
      } else {
        k = minK + hueLen * (maxK - minK) / this.totalHueLen;
      }
      const rgb = Color.kelvin2rgb(k);
      const hsb = Color.rgb2hsb(...rgb);
      [h, s, b] = hsb;
      maxSat = s;
    } else {
      h = hueLen * 360 / this.totalHueLen;
    }

    let satLen = y;
    if (!overstep) satLen -= thumbHeight / 2;
    if (saturation === '2b') satLen = this.totalSatLen - satLen;

    if (!isHorizontal) {
      satLen = x;
      if (!overstep) satLen -= thumbWidth / 2;
      if (saturation === '2r') satLen = this.totalSatLen - satLen;
    }

    if (saturation !== 'none') {
      s = satLen * maxSat / this.totalSatLen;
    }
    return {
      k,
      percentX: hueLen / this.totalHueLen,
      percentY: satLen / this.totalSatLen,
      hsb: [h, s, b],
      hex: Color.hsb2hex(h, s, b),
      rgb: Color.hsb2rgb(h, s, b)
    };
  }

  getPositionByHsb([h, s]) {
    const { thumbHeight, thumbWidth } = this.state;
    const { axis, saturation, overstep } = this.props;
    const isHorizontal = axis === 'x';
    const pos = h * this.totalHueLen / 360;
    const thumbInst = this.getThumbInstance();
    const thumbStyle = getReactInstanceProps(thumbInst);
    let { top: y = 0, left: x = 0 } = StyleSheet.flatten(thumbStyle);

    if (isHorizontal) {
      x = pos;
      if (saturation === '2t') {
        y = s * this.totalSatLen / 100;
      } else {
        y = (100 - s) * this.totalSatLen / 100;
      }
    } else {
      y = pos;
      if (saturation === '2l') {
        x = s * this.totalSatLen / 100;
      } else {
        x = (100 - s) * this.totalSatLen / 100;
      }
    }
    if (!overstep) {
      x += thumbWidth / 2;
      y += thumbHeight / 2;
    }
    return { x, y };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { props } = this;
    if (this.notHandleReceivePropsWhenTouching) {
      return false;
    }
    if (props.disabled !== nextProps.disabled) {
      return true;
    }
    const {
      hueWidth: oldWidth,
      hueHeight: oldHeight,
      paddingHorizontal: oldPaddingHorizontal,
      paddingVertical: oldPaddingVertical,
      thumbWidth: oldThumbWidth,
      thumbHeight: oldThumbHeight
    } = this.state;
    const {
      hueWidth: newWidth,
      hueHeight: newHeight,
      paddingHorizontal: newPaddingHorizontal,
      paddingVertical: newPaddingVertical,
      thumbWidth: newThumbWidth,
      thumbHeight: newThumbHeight
    } = nextState;

    return (
      oldWidth !== newWidth ||
      oldHeight !== newHeight ||
      newPaddingHorizontal !== oldPaddingHorizontal ||
      newPaddingVertical !== oldPaddingVertical ||
      oldThumbWidth !== newThumbWidth ||
      oldThumbHeight !== newThumbHeight ||
      props.kelvin !== nextProps.kelvin ||
      !isEqual(props.hsb, nextProps.hsb) ||
      !isEqual(props.position, nextProps.position) ||
      !styleEqual(this.props.style, nextProps.style)
    );
  }

  onHueLayoutHandle = ({ nativeEvent }) => {
    const { width, height } = nativeEvent.layout;

    this.setState(
      {
        hueWidth: width,
        hueHeight: height
      },
      this.initialize
    );
  };

  componentDidMount() {
    const { hueWidth, hueHeight } = this.state;
    if (hueWidth && hueHeight) {
      this.initialize();
    }
  }

  componentDidUpdate(prevProps) {
    const { props } = this;
    if (
      !isEqual(props.hsb, prevProps.hsb) ||
      !isEqual(props.position, prevProps.position) ||
      props.kelvin !== prevProps.kelvin
    ) {
      this.initialize();
    }
  }

  initialize() {
    const { withFollowColor, direction, overstep, axis } = this.props;
    const { hueWidth, hueHeight, thumbWidth, thumbHeight } = this.state;
    const isHorizontal = axis === 'x';
    if (overstep) {
      this.totalHueLen = isHorizontal ? hueWidth : hueHeight;
      this.totalSatLen = isHorizontal ? hueHeight : hueWidth;
    } else {
      this.totalHueLen = isHorizontal
        ? hueWidth - thumbWidth
        : hueHeight - thumbHeight;
      this.totalSatLen = isHorizontal
        ? hueHeight - thumbHeight
        : hueWidth - thumbWidth;
    }
    let { hsb, position } = this.props;
    if (position) {
      position = this.getRealPosition(position);
      hsb = this.getColorKelvinByPosition(position).hsb;
    } else {
      position = this.getPositionByHsb(hsb);
    }
    const { x, y } = this.getThumbPosition(position);
    const _thumbStyle = { left: x, top: y };
    if (withFollowColor) {
      hsb = direction === 'all' ? hsb : [hsb[0], 100, 100];
      const hex = Color.hsb2hex(...hsb);
      _thumbStyle.backgroundColor = hex;
    }
    this.setThumbStyle(_thumbStyle);
  }

  getMeasureFromStyle(style) {
    const {
      width,
      height,
      padding = 0,
      paddingTop = 0,
      paddingRight = 0,
      paddingBottom = 0,
      paddingLeft = 0,
      paddingHorizontal = 0,
      paddingVertical = 0
    } = StyleSheet.flatten(style || {});

    return {
      width,
      height,
      paddingHorizontal:
        padding || paddingHorizontal || Math.min(paddingLeft, paddingRight),
      paddingVertical:
        padding || paddingVertical || Math.min(paddingTop, paddingBottom)
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      width,
      height,
      paddingHorizontal,
      paddingVertical
    } = this.getMeasureFromStyle(nextProps.style);

    let { width: thumbWidth, height: thumbHeight } = this.getMeasureFromStyle(
      nextProps.thumbStyle
    );

    const { direction } = this.props;

    if (!thumbHeight) thumbHeight = _thumbHeight;
    if (!thumbWidth) thumbWidth = _thumbWidth;

    if (direction === 'vertical') {
      thumbWidth = _thumbHeight;
      thumbHeight = _thumbWidth;
    }

    const { state } = this;
    const s = {};

    if (state.hueWidth !== width && width !== undefined) {
      s.hueWidth = width;
    }
    if (state.hueHeight !== height && height !== undefined) {
      s.hueHeight = height;
    }
    if (
      state.paddingHorizontal !== paddingHorizontal &&
      paddingHorizontal !== undefined
    ) {
      s.paddingHorizontal = paddingHorizontal;
    }
    if (
      state.paddingVertical !== paddingVertical &&
      paddingVertical !== undefined
    ) {
      s.paddingVertical = paddingVertical;
    }
    if (state.thumbWidth !== thumbWidth && thumbWidth !== undefined) {
      s.thumbWidth = thumbWidth;
    }
    if (state.thumbHeight !== thumbHeight && thumbHeight !== undefined) {
      s.thumbHeight = thumbHeight;
    }
    if (Object.keys(s).length) {
      this.setState(s);
    }
  }

  getThumbPosition({ x, y }) {
    const { hueWidth, hueHeight, thumbWidth, thumbHeight } = this.state;
    const { overstep, direction } = this.props;
    let _x, _y;
    if (direction === 'horizontal') {
      _y = (hueHeight - thumbHeight) / 2;
      _x = x - thumbWidth / 2;
      if (overstep) {
        if (_x < -thumbWidth / 2) _x = -thumbWidth / 2;
        if (_x > hueWidth - thumbWidth / 2) _x = hueWidth - thumbWidth / 2;
      } else {
        if (_x < 0) _x = 0;
        if (_x > hueWidth - thumbWidth) _x = hueWidth - thumbWidth;
      }
    } else if (direction === 'vertical') {
      _x = (hueWidth - thumbWidth) / 2;
      _y = y - thumbHeight / 2;
      if (overstep) {
        if (_y < -thumbHeight / 2) _y = -thumbHeight / 2;
        if (_y > hueHeight - thumbHeight / 2) _y = hueHeight - thumbHeight / 2;
      } else {
        if (_y < 0) _y = 0;
        if (_y > hueHeight - thumbHeight) _y = hueHeight - thumbHeight;
      }
    } else {
      _y = y - thumbHeight / 2;
      _x = x - thumbWidth / 2;
      if (overstep) {
        if (_x < -thumbWidth / 2) _x = -thumbWidth / 2;
        if (_x > hueWidth - thumbWidth / 2) _x = hueWidth - thumbWidth / 2;
        if (_y < -thumbHeight / 2) _y = -thumbHeight / 2;
        if (_y > hueHeight - thumbHeight / 2) _y = hueHeight - thumbHeight / 2;
      } else {
        if (_x < 0) _x = 0;
        if (_x > hueWidth - thumbWidth) _x = hueWidth - thumbWidth;
        if (_y < 0) _y = 0;
        if (_y > hueHeight - thumbHeight) _y = hueHeight - thumbHeight;
      }
    }
    return {
      x: _x,
      y: _y
    };
  }

  setThumbInstance = inst => {
    this._thumbInst = inst;
  };

  getThumbInstance() {
    return this._thumbInst;
  }

  setThumbStyle(style) {
    const inst = this.getThumbInstance();
    inst.setNativeProps({
      style
    });
  }

  render() {
    const responder = this.getResponder();
    const {
      children,
      style,
      thumbStyle,
      disabled,
      hueStyle,
      saturation,
      axis,
      renderThumb,
      kelvin,
      overstep,
      ...props
    } = this.props;
    const { hueWidth, hueHeight, thumbHeight, thumbWidth } = this.state;
    let hueProps;

    if (hueWidth && hueHeight) {
      hueProps = {
        width: hueWidth,
        height: hueHeight
      };
    }
    delete props.position;
    delete props.direction;
    return (
      <View
        ref={this.setInstance}
        style={[{ overflow: 'hidden' }, style]}
        {...props}
        {...responder}
        onLayout={hueWidth && hueHeight ? noop : this.onHueLayoutHandle}
      >
        {hueProps ? (
          <View style={[{ overflow: 'hidden' }, hueStyle]}>
            <Hue
              overstep={overstep}
              kelvin={kelvin}
              saturation={saturation}
              axis={axis}
              {...hueProps}
            />
            {disabled ? (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  backgroundColor: '#666',
                  opacity: 0.6
                }}
              />
            ) : null}
          </View>
        ) : null}
        {renderThumb({
          ref: this.setThumbInstance,
          style: [
            {
              position: 'absolute',
              width: thumbWidth,
              height: thumbHeight
            },
            thumbStyle,
            disabled ? { backgroundColor: 'transparent' } : null
          ]
        })}
        {children}
      </View>
    );
  }
}
