import React, { PureComponent } from 'react';
import { Animated, Easing, Dimensions } from 'react-native';
import { DEFAULT_ANIMATION_CONFIG } from './constant';
import { MotionScalePullDownProps, MotionScalePullDownState } from './interface';

const { height: winHeight } = Dimensions.get('window');

class ScalePullDown extends PureComponent<MotionScalePullDownProps, MotionScalePullDownState> {
  static displayName = 'Motion.ScalePullDown';

  static defaultProps = {
    style: null,
    show: undefined,
    showDuration: 300,
    hideDuration: 300,
    initScale: 0,
    isAlign: true,
    onShow: () => null,
    onHide: () => null,
    animationConfig: DEFAULT_ANIMATION_CONFIG,
  };

  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
      scale: new Animated.Value(props.initScale),
      opacity: new Animated.Value(0),
      dropHeight: new Animated.Value(0),
      measuredHeight: winHeight,
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
    this.state.scale.stopAnimation();
    this.state.opacity.stopAnimation();
    this.state.dropHeight.stopAnimation();
  }

  _viewRef: any;

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
          this._viewRef &&
            this._viewRef._component.measureInWindow((positionX, positionY, width, height) => {
              this.setState({ measuredHeight: winHeight - positionY });
            });
        });
      }
    });
  };

  startHideAnimation = () => {
    const { onHide, hideDuration } = this.props;
    const animationConfig = { ...DEFAULT_ANIMATION_CONFIG, ...this.props.animationConfig };
    Animated.parallel([
      Animated.timing(this.state.opacity, {
        toValue: 0,
        ...animationConfig,
        duration: hideDuration,
        easing: Easing.bezier(0.42, 0, 1, 1),
      }),
      Animated.timing(this.state.dropHeight, {
        toValue: 1,
        ...animationConfig,
        duration: hideDuration,
        easing: Easing.bezier(0.38, 0, 0.25, 1),
      }),
    ]).start(({ finished }) => {
      if (finished) {
        this.setState({ show: false, isAnimating: false }, () => {
          this.state.dropHeight.setValue(0);
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
    return (
      <Animated.View
        renderToHardwareTextureAndroid={this.state.isAnimating}
        ref={ref => {
          this._viewRef = ref;
        }}
        style={[
          style,
          {
            justifyContent: 'center',
            opacity: this.state.opacity,
            transform: [
              {
                scale: this.state.scale,
              },
              {
                translateY: this.state.dropHeight.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, this.state.measuredHeight || winHeight],
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

export default ScalePullDown;
