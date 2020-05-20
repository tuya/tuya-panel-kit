import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing, ViewPropTypes } from 'react-native';

const DEFAULT_ANIMATION_CONFIG = {
  duration: 250,
  delay: 0,
  isInteraction: true,
  useNativeDriver: true,
};

class ScaleFadeIn extends PureComponent {
  static displayName = 'Motion.ScaleFadeIn';
  static propTypes = {
    /**
     * 内容样式
     */
    style: ViewPropTypes.style,
    /**
     * 是否显示内容
     */
    show: PropTypes.bool,
    /**
     * 初始缩放倍数
     */
    initScale: PropTypes.number,
    /**
     * 动画结束缩放倍数
     */
    finalScale: PropTypes.number,
    /**
     * 动画显示时长
     */
    showDuration: PropTypes.number,
    /**
     * 动画隐藏时长
     */
    hideDuration: PropTypes.number,
    /**
     * 自定义内容
     */
    children: PropTypes.element.isRequired,
    /**
     * 是否竖直居中
     */
    isAlign: PropTypes.bool,
    /**
     * 动画显示回调
     */
    onShow: PropTypes.func,
    /**
     * 动画隐藏回调
     */
    onHide: PropTypes.func,
    /**
     * 动画配置参数
     */
    animationConfig: PropTypes.shape({
      duration: PropTypes.number,
      delay: PropTypes.number,
      isInteraction: PropTypes.bool,
      useNativeDriver: PropTypes.bool,
    }),
    /**
     * 向左平移的距离，tips气泡模拟transform-origin属性
     */
    width: PropTypes.number,
    /**
     * 向上平移的距离，tips气泡模拟transform-origin属性
     */
    height: PropTypes.number,
  };

  static defaultProps = {
    style: null,
    show: undefined,
    showDuration: 250,
    hideDuration: 250,
    initScale: 0,
    finalScale: 0,
    isAlign: true,
    onShow: () => {},
    onHide: () => {},
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
