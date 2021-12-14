import React, { PureComponent } from 'react';
import { Animated, StyleSheet, Easing } from 'react-native';
import { DEFAULT_ANIMATION_CONFIG as DEFAULT_CONFIG } from './constant';
import { MotionToastProps, MotionToastState } from './interface';

const DEFAULT_ANIMATION_CONFIG = {
  ...DEFAULT_CONFIG,
  duration: 250,
};

class MotionToast extends PureComponent<MotionToastProps, MotionToastState> {
  static defaultProps = {
    style: null,
    initScale: 0.5,
    showDuration: 250,
    hideDuration: 250,
    animationConfig: DEFAULT_ANIMATION_CONFIG,
  };

  constructor(props) {
    super(props);
    this._timer = null;
    this.state = {
      fadeValue: new Animated.Value(0),
      scale: new Animated.Value(props.initScale),
      show: props.show,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { show } = nextProps;
    if (typeof show !== 'undefined' && show !== this.state.show) {
      this.setState({ show });
      if (show) {
        this.startShowAnimation();
      } else {
        this.startHideAnimation();
      }
    }
  }

  componentWillUnmount() {
    this._timer && clearTimeout(this._timer);
  }

  _timer: number;

  startShowAnimation = () => {
    const { showDuration } = this.props;
    const { fadeValue, scale } = this.state;
    const animationConfig = { ...DEFAULT_ANIMATION_CONFIG, ...this.props.animationConfig };
    Animated.parallel([
      Animated.timing(fadeValue, {
        toValue: 1,
        ...animationConfig,
        duration: showDuration,
        easing: Easing.bezier(0, 0, 0.25, 1),
      }),
      Animated.timing(scale, {
        toValue: 1,
        ...animationConfig,
        duration: showDuration,
        easing: Easing.bezier(0, 0, 0.25, 1),
      }),
    ]).start(() => this.timer());
  };

  startHideAnimation = () => {
    const { initScale, hideDuration } = this.props;
    const { fadeValue, scale } = this.state;
    const animationConfig = { ...DEFAULT_ANIMATION_CONFIG, ...this.props.animationConfig };
    Animated.parallel([
      Animated.timing(fadeValue, {
        toValue: 0,
        ...animationConfig,
        duration: hideDuration,
        easing: Easing.bezier(0.42, 0, 1, 1),
      }),
      Animated.timing(scale, {
        toValue: initScale,
        ...animationConfig,
        duration: hideDuration,
        easing: Easing.bezier(0.42, 0, 1, 1),
      }),
    ]).start();
  };

  timer = () => {
    clearTimeout(this._timer);
    this._timer = setTimeout(() => this.props.onFinish(), 2000);
  };

  render() {
    const { scale, fadeValue } = this.state;
    const { children, style } = this.props;
    if (!React.isValidElement(children)) {
      return null;
    }
    return (
      <Animated.View style={[styles.center, style, { opacity: fadeValue, transform: [{ scale }] }]}>
        {children}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MotionToast;
