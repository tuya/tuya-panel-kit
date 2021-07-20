import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Animated, StyleSheet, Easing, ViewPropTypes } from 'react-native';

const DEFAULT_ANIMATION_CONFIG = {
  duration: 300,
  delay: 0,
  isInteraction: true,
  useNativeDriver: true,
};

class Fade extends PureComponent {
  static displayName = 'Motion.Fade';
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
     * 动画不透明度
     */
    fadeOpacity: PropTypes.number,
    /**
     * 自定义内容
     */
    children: PropTypes.element.isRequired,
    /**
     * 动画显示时长
     */
    showDuration: PropTypes.number,
    /**
     * 动画隐藏时长
     */
    hideDuration: PropTypes.number,
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
  };

  static defaultProps = {
    style: null,
    show: undefined,
    fadeOpacity: 1,
    showDuration: 300,
    hideDuration: 300,
    onShow: () => {},
    onHide: () => {},
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
