import React, { PureComponent } from 'react';
import { Animated, Easing } from 'react-native';
import { DEFAULT_ANIMATION_CONFIG } from './constant';
import { MotionPushDownProps, MotionPushDownState } from './interface';

class PushDown extends PureComponent<MotionPushDownProps, MotionPushDownState> {
  static displayName = 'Motion.PushDown';

  static defaultProps = {
    style: null,
    show: undefined,
    showDuration: 250,
    hideDuration: 350,
    dropHeight: 200,
    isAlign: true,
    onShow: () => null,
    onHide: () => null,
    animationConfig: DEFAULT_ANIMATION_CONFIG,
  };

  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
      dropHeight: new Animated.Value(0),
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
    this.state.dropHeight.stopAnimation();
  }

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
    Animated.timing(this.state.dropHeight, {
      toValue: 1,
      ...animationConfig,
      duration: showDuration,
      easing: Easing.bezier(0.38, 0, 0.25, 1),
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
    Animated.timing(this.state.dropHeight, {
      toValue: 0,
      ...animationConfig,
      duration: hideDuration,
      easing: Easing.bezier(0, 0, 0.25, 1),
    }).start(({ finished }) => {
      if (finished) {
        this.setState({ show: false, isAnimating: false }, () => {
          typeof onHide === 'function' && onHide();
        });
      }
    });
  };

  render() {
    const { style, children, isAlign, dropHeight } = this.props;
    if (!this.state.show || !React.isValidElement(children)) {
      return null;
    }
    return (
      <Animated.View
        renderToHardwareTextureAndroid={this.state.isAnimating}
        style={[
          style,
          {
            justifyContent: 'center',
            transform: [
              {
                translateY: this.state.dropHeight.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, dropHeight],
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

export default PushDown;
