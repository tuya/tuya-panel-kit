import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { createAnimation, DIFFUSION_DEFAULT_ANIMATION_CONFIG } from './utils';
import { DiffusionProps } from './interface';

const { convertX: cx } = Utils.RatioUtils;

export default class Diffusion extends Component<DiffusionProps> {
  static defaultProps: DiffusionProps = {
    radius: cx(50),
    maxRadius: cx(100),
    color: '#00FF00',
    width: cx(5),
    number: 2,
    intervalTime: 0,
    startAnimated: true,
    mainDelay: 1000,
    animationConfig: DIFFUSION_DEFAULT_ANIMATION_CONFIG,
    style: {},
    children: null,
  };

  constructor(props) {
    super(props);
    const obj = {};
    for (let i = 0; i < this.props.number; i++) {
      obj[`stateRadius${i}`] = new Animated.Value(props.radius);
      obj[`stateOpacity${i}`] = new Animated.Value(0);
    }
    this.state = obj;
  }

  componentDidMount = () => {
    this.props.startAnimated && this.startAnimated();
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.startAnimated !== this.props.startAnimated) {
      if (nextProps.startAnimated) {
        this.startAnimated();
      } else {
        this.stopAnimated();
      }
    }
  };

  componentWillUnmount = () => {
    this.stopAnimated();
  };

  timeHandle = [];
  timeHandle1 = [];
  stopAnimated = () => {
    const obj = {};
    for (let i = 0; i < this.props.number; i++) {
      this.state[`stateRadius${i}`].stopAnimation();
      this.state[`stateOpacity${i}`].stopAnimation();
      obj[`stateOpacity${i}`] = new Animated.Value(0);
      obj[`stateRadius${i}`] = new Animated.Value(this.props.radius);
    }
    this.setState(obj);
    this.timeHandle.map(time => clearTimeout(time));
    this.timeHandle = [];
    this.timeHandle1.map(time => clearTimeout(time));
    this.timeHandle1 = [];
  };

  startAnimated = () => {
    for (let i = 0; i < this.props.number; i++) {
      this.childTask(i, true);
    }
  };

  childTask = (i, isInit = false) => {
    const animationConfig = {
      ...DIFFUSION_DEFAULT_ANIMATION_CONFIG,
      ...this.props.animationConfig,
    };
    const { duration, delay, easing, useNativeDriver, isInteraction } = animationConfig;
    this.timeHandle.push(
      setTimeout(
        () => {
          this.setState(
            {
              [`stateOpacity${i}`]: new Animated.Value(1),
              [`stateRadius${i}`]: new Animated.Value(this.props.radius),
            },
            () => {
              Animated.parallel([
                createAnimation({
                  value: this.state[`stateRadius${i}`],
                  toValue: this.props.maxRadius,
                  duration,
                  delay,
                  easing,
                  useNativeDriver,
                  isInteraction,
                }),
                createAnimation({
                  value: this.state[`stateOpacity${i}`],
                  toValue: 0,
                  duration,
                  delay,
                  easing,
                  useNativeDriver,
                  isInteraction,
                }),
              ]).start(() => {
                this.timeHandle1.push(
                  setTimeout(() => {
                    this.childTask(i);
                  }, this.props.intervalTime)
                );
              });
            }
          );
        },
        isInit ? i * this.props.mainDelay : 0
      )
    );
  };

  render() {
    const { width, color, radius, maxRadius, style, number, children } = this.props;
    return (
      <View
        style={[
          {
            justifyContent: 'center',
            alignItems: 'center',
            width: 2 * maxRadius,
            height: 2 * maxRadius,
          },
          style,
        ]}
      >
        {new Array(number)
          .fill(0)
          .map((__, i) => i)
          .map((item, index) => {
            const innerRadius = this.state[`stateRadius${index}`].interpolate({
              inputRange: [radius, maxRadius],
              outputRange: [radius, maxRadius],
            });
            const innerWidth = this.state[`stateRadius${index}`].interpolate({
              inputRange: [radius, maxRadius],
              outputRange: [2 * radius, 2 * maxRadius],
            });
            return (
              <Animated.View
                key={item}
                style={[
                  { position: 'absolute', borderWidth: width, borderColor: color },
                  {
                    width: innerWidth,
                    height: innerWidth,
                    borderRadius: innerRadius,
                    opacity: this.state[`stateOpacity${index}`],
                  },
                ]}
              />
            );
          })}
        <View
          style={{
            width: 2 * radius,
            height: 2 * radius,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {children}
        </View>
      </View>
    );
  }
}
