import React, { PureComponent } from 'react';
import { Animated, Easing } from 'react-native';
import { DEFAULT_ANIMATION_CONFIG as DEFAULT_CONFIG } from './constant';
import { MotionScaleFadeInProps, MotionScaleFadeInState } from './interface';

const DEFAULT_ANIMATION_CONFIG = {
  ...DEFAULT_CONFIG,
  duration: 250,
};

class ScaleFadeIn extends PureComponent<MotionScaleFadeInProps, MotionScaleFadeInState> {
  static displayName = 'Motion.ScaleFadeIn';

  static defaultProps = {
    style: null,
    show: undefined,
    showDuration: 250,
    hideDuration: 250,
    initScale: 0,
    finalScale: 0,
    isAlign: true,
    onShow: () => null,
    onHide: () => null,
    animationConfig: DEFAULT_ANIMATION_CONFIG,
    width: null,
    height: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
      scale: new Animated.Value(props.initScale),
      opacity: new Animated.Value(0),
      isAnimating: false,
      translateX: new Animated.Value(0),
      translateY: new Animated.Value(0),
    };
  }

  componentDidMount() {
    if (this.state.show) {
      this.startShowAnimation();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { show, width, height } = nextProps;
    if (width !== this.props.width || height !== this.props.height) {
      this.width = width;
      this.height = height;
    }
    if (typeof show !== 'undefined' && show !== this.state.show) {
      this.startAnimation(show);
    }
  }

  componentWillUnmount() {
    this.state.scale.stopAnimation();
    this.state.opacity.stopAnimation();
  }

  width: number;
  height: number;

  startAnimation = show => {
    if (show) {
      this.setState({ show, isAnimating: true }, this.startShowAnimation);
    } else {
      this.setState({ isAnimating: true }, this.startHideAnimation);
    }
  };

  startShowAnimation = () => {
    const { onShow, showDuration } = this.props;
    const animationConfig = { ...DEFAULT_ANIMATION_CONFIG, ...this.props.animationConfig };
    Animated.parallel([
      Animated.timing(this.state.scale, {
        toValue: 1,
        ...animationConfig,
        duration: showDuration,
        easing: Easing.bezier(0, 0, 0.25, 1),
      }),
      Animated.timing(this.state.translateX, {
        toValue: 1,
        ...animationConfig,
        duration: showDuration,
        easing: Easing.bezier(0, 0, 0.25, 1),
      }),
      Animated.timing(this.state.translateY, {
        toValue: 1,
        ...animationConfig,
        duration: showDuration,
        easing: Easing.bezier(0, 0, 0.25, 1),
      }),
      Animated.timing(this.state.opacity, {
        toValue: 1,
        ...animationConfig,
        duration: showDuration,
        easing: Easing.bezier(0, 0, 0.25, 1),
      }),
    ]).start(({ finished }) => {
      if (finished) {
        this.setState({ isAnimating: false }, () => {
          typeof onShow === 'function' && onShow();
        });
      }
    });
  };

  startHideAnimation = () => {
    const { finalScale, onHide, hideDuration } = this.props;
    const animationConfig = { ...DEFAULT_ANIMATION_CONFIG, ...this.props.animationConfig };
    Animated.parallel([
      Animated.timing(this.state.scale, {
        toValue: finalScale,
        ...animationConfig,
        duration: hideDuration,
        easing: Easing.bezier(0.42, 0, 1, 1),
      }),
      Animated.timing(this.state.translateX, {
        toValue: 1,
        ...animationConfig,
        duration: hideDuration,
        easing: Easing.bezier(0.42, 0, 1, 1),
      }),
      Animated.timing(this.state.translateY, {
        toValue: 1,
        ...animationConfig,
        duration: hideDuration,
        easing: Easing.bezier(0.42, 0, 1, 1),
      }),
      Animated.timing(this.state.opacity, {
        toValue: 0,
        ...animationConfig,
        duration: hideDuration,
        easing: Easing.bezier(0.42, 0, 1, 1),
      }),
    ]).start(({ finished }) => {
      if (finished) {
        this.setState({ show: false, isAnimating: false }, () => {
          typeof onHide === 'function' && onHide();
        });
      }
    });
  };

  render() {
    const { style, children, isAlign } = this.props;
    if (!this.state.show || !React.isValidElement(children)) {
      return null;
    }
    const isFormCorner = this.width && this.height;
    return (
      <Animated.View
        renderToHardwareTextureAndroid={this.state.isAnimating}
        style={[
          style,
          {
            justifyContent: 'center',
            opacity: this.state.opacity,
            transform: [
              {
                scale: this.state.scale,
              },
            ],
          },
          isFormCorner && {
            transform: [
              {
                scale: this.state.scale,
              },
              {
                translateX: this.state.translateX.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, this.width],
                }),
              },
              {
                translateY: this.state.translateY.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, this.height],
                }),
              },
            ],
          },
          isAlign && { alignItems: 'center' },
        ]}
      >
        {children}
      </Animated.View>
    );
  }
}

export default ScaleFadeIn;
