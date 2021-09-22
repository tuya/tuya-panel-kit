import React from 'react';
import { View, Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Utils } from 'tuya-panel-utils';
import { createAnimation, WAVE_DEFAULT_ANIMATION_CONFIG } from './utils';
import { WaveViewProps, WaveViewStateTypes } from './interface';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const { convertX: cx, viewWidth } = Utils.RatioUtils;

/**
 * ---------+------------------------+
 * <-- P -->|<--    T    -->|        |______
 *          |   /\          |   /\   |  ^
 *          |  /  \         |  /  \  |  A
 *          | /    \        | /    \ |  |
 *          |/      \       |/      \|__V___
 *          |        \      /        |  ^
 *          |         \    /         |  |
 *          |          \  /          |  |
 *          |           \/           |  H
 *          |                        |  |
 *          |                        |  |
 * ---------+------------------------+__V___
 */

class Wave extends React.PureComponent<WaveViewProps, WaveViewStateTypes> {
  static defaultProps: WaveViewProps = {
    H: cx(50),
    waveParams: [
      { A: 25, T: 120, fill: '#64c3d6' },
      { A: 20, T: 100, fill: '#0092ba' },
    ],
    style: {},
    animated: true,
    animationConfig: WAVE_DEFAULT_ANIMATION_CONFIG,
  };

  constructor(props: WaveViewProps) {
    super(props);
    const { H, waveParams, animated, style } = this.props;
    /* eslint-disable prefer-object-spread */
    const wrapStyle = Object.assign(
      { width: cx(100), height: cx(100), overflow: 'hidden', backgroundColor: 'transparent' },
      style
    );

    this.state = {
      H: (wrapStyle.height * H) / 100,
      style: wrapStyle,
      waveParams,
    };

    this._animValues = [];
    this._animations = [];
    this._animated = animated || false;

    for (let i = 0; i < waveParams.length; i++) {
      this._animValues.push(new Animated.Value(0));
    }
  }

  componentDidMount() {
    this._animated && this.startAnim();
  }

  componentWillReceiveProps(nextProps: WaveViewProps) {
    if (this.props.animated !== nextProps.animated) {
      this._animated = nextProps.animated;
      this._animated && this.startAnim();
      !this._animated && this.stopAnim();
    }
  }

  componentWillUnmount() {
    this.stopAnim();
    this._animValues = null;
    this._animations = null;
  }

  _animValues: Animated.Value[];
  _animations: Animated.Value[];
  _animated: boolean;

  startAnim() {
    this.stopAnim();
    const animationConfig = {
      ...WAVE_DEFAULT_ANIMATION_CONFIG,
      ...this.props.animationConfig,
    };

    const { duration, delay, easing, useNativeDriver, isInteraction } = animationConfig;

    for (let i = 0; i < this._animValues.length; i++) {
      const anim = Animated.loop(
        createAnimation({
          value: this._animValues[i],
          toValue: 1,
          duration: duration + delay * i,
          delay: 0,
          easing,
          useNativeDriver,
          isInteraction,
        })
      );
      // @ts-ignore
      this._animations.push(anim);
      anim.start();
    }
    this._animated = true;
  }

  stopAnim() {
    for (let i = 0; i < this._animations.length; i++) {
      // @ts-ignore
      this._animations[i].stop();
      this._animations[i] = null;
    }
    this._animations = [];
    this._animated = false;
  }

  render() {
    const { H, waveParams, style } = this.state;
    const waves = [];
    const mergeStyle = { width: viewWidth, height: cx(120), ...style };
    for (let i = 0; i < waveParams.length; i++) {
      const { A, T, fill } = waveParams[i];
      const translateX = this._animValues[i].interpolate({
        inputRange: [0, 1],
        outputRange: [0, -2 * T],
      });
      // 保证水波足够长

      const scale = mergeStyle.width >= T ? Math.ceil(mergeStyle.width / T) : 1;
      let d = `M 0 ${A} Q ${T / 4} ${2 * A} `;
      for (let j = 1; j < 6 * scale + 1; j++) {
        d += `${(T * j) / 2} ${A} ${j === 6 * scale ? 'V' : 'T'} `;
      }
      d += ` ${A + H} H 0 Z`;
      const wave = (
        <AnimatedSvg
          key={i}
          style={{
            width: 3 * scale * T,
            height: A + H,
            position: 'absolute',
            left: 0,
            bottom: 0,
            transform: [{ translateX }],
          }}
          preserveAspectRatio="xMinYMin meet"
          viewBox={`0 0 ${3 * scale * T} ${A + H}`}
        >
          <Path d={d} fill={fill} />
        </AnimatedSvg>
      );
      waves.push(wave);
    }

    return <View style={mergeStyle}>{waves}</View>;
  }
}

export default Wave;
