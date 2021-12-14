import React, { PureComponent } from 'react';
import { Animated, StyleSheet, Easing } from 'react-native';
import { MotionFadeProps, MotionFadeState } from './interface';
import { DEFAULT_ANIMATION_CONFIG } from './constant';

class Fade extends PureComponent<MotionFadeProps, MotionFadeState> {
  static displayName = 'Motion.Fade';

  static defaultProps = {
    style: null,
    show: undefined,
    fadeOpacity: 1,
    showDuration: 300,
    hideDuration: 300,
    onShow: () => null,
    onHide: () => null,
    animationConfig: DEFAULT_ANIMATION_CONFIG,
  };

  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
      opacity: new Animated.Value(0),
      isAnimating: false,
    };
  }

  componentDidMount() {
    if (this.state.show) {
      this.startShowAnimation();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { show } = nextProps;
    if (typeof show !== 'undefined' && show !== this.state.show) {
      this.startAnimation(show);
    }
  }

  componentWillUnmount() {
    this.state.opacity.stopAnimation();
  }

  startAnimation = show => {
    if (show) {
      this.setState({ show: true, isAnimating: true }, this.startShowAnimation);
    } else {
      this.setState({ isAnimating: true }, this.startHideAnimation);
    }
  };

  startShowAnimation = () => {
    const { fadeOpacity, onShow, showDuration } = this.props;
    const animationConfig = { ...DEFAULT_ANIMATION_CONFIG, ...this.props.animationConfig };
    Animated.timing(this.state.opacity, {
      toValue: fadeOpacity,
      ...animationConfig,
      duration: showDuration,
      easing: Easing.bezier(0, 0, 0.25, 1),
    }).start(({ finished }) => {
      if (finished) {
        this.setState({ isAnimating: false }, () => {
          typeof onShow === 'function' && onShow();
        });
      }
    });
  };

  startHideAnimation = () => {
    const { onHide, hideDuration } = this.props;
    const animationConfig = { ...DEFAULT_ANIMATION_CONFIG, ...this.props.animationConfig };
    Animated.timing(this.state.opacity, {
      toValue: 0,
      ...animationConfig,
      duration: hideDuration,
      easing: Easing.bezier(0.42, 0, 1, 1),
    }).start(({ finished }) => {
      if (finished) {
        this.setState({ show: false, isAnimating: false }, () => {
          typeof onHide === 'function' && onHide();
        });
      }
    });
  };

  render() {
    const { style, children } = this.props;
    if (!this.state.show || !React.isValidElement(children)) {
      return null;
    }
    return (
      <Animated.View
        renderToHardwareTextureAndroid={this.state.isAnimating}
        style={[styles.container, style, { opacity: this.state.opacity }]}
      >
        {children}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});

export default Fade;
