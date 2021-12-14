import React, { PureComponent } from 'react';
import { Animated, StyleSheet, Easing, Dimensions } from 'react-native';
import { DEFAULT_ANIMATION_CONFIG } from './constant';
import { MotionPullUpProps, MotionPullUpState } from './interface';

const { height: winHeight } = Dimensions.get('window');

class PullUp extends PureComponent<MotionPullUpProps, MotionPullUpState> {
  static displayName = 'Motion.PullUp';

  static defaultProps = {
    style: null,
    show: undefined,
    dropHeight: undefined,
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
      animatedY: new Animated.Value(0),
      measuredHeight: props.dropHeight,
    };
  }

  componentDidMount() {
    if (this.state.show && typeof this.state.measuredHeight === 'number') {
      this.startShowAnimation();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (typeof this.state.measuredHeight !== 'number') {
      return;
    }
    const { show } = nextProps;
    if (typeof show !== 'undefined' && show !== this.state.show) {
      this.startAnimation(show);
    }
  }

  componentWillUnmount() {
    this.state.animatedY.stopAnimation();
  }

  startAnimation = show => {
    if (show) {
      this.setState({ show: true }, this.startShowAnimation);
    } else {
      this.startHideAnimation();
    }
  };

  startShowAnimation = () => {
    const { onShow, showDuration } = this.props;
    const animationConfig = { ...DEFAULT_ANIMATION_CONFIG, ...this.props.animationConfig };
    Animated.timing(this.state.animatedY, {
      toValue: 1,
      ...animationConfig,
      easing: Easing.bezier(0, 0, 0.25, 1),
      duration: showDuration,
    }).start(({ finished }) => {
      if (finished) {
        typeof onShow === 'function' && onShow();
      }
    });
  };

  startHideAnimation = () => {
    const { onHide, hideDuration } = this.props;
    const animationConfig = { ...DEFAULT_ANIMATION_CONFIG, ...this.props.animationConfig };
    Animated.timing(this.state.animatedY, {
      toValue: 0,
      ...animationConfig,
      easing: Easing.bezier(0.38, 0, 0.25, 1),
      duration: hideDuration,
    }).start(({ finished }) => {
      if (finished) {
        this.setState({ show: false }, () => {
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
        style={[
          styles.container,
          style,
          {
            transform: [
              {
                translateY: this.state.animatedY.interpolate({
                  inputRange: [0, 1],
                  outputRange: [this.state.measuredHeight || winHeight, 0],
                }),
              },
            ],
          },
        ]}
      >
        {React.cloneElement(children, {
          onLayout: ({ nativeEvent: { layout } }) => {
            if (
              layout &&
              typeof this.state.measuredHeight === 'undefined' &&
              typeof layout.height === 'number'
            ) {
              this.setState({ measuredHeight: layout.height }, () => {
                this.startAnimation(this.state.show);
              });
            }
          },
        })}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});

export default PullUp;
