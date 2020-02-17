import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing, ViewPropTypes } from 'react-native';

const DEFAULT_ANIMATION_CONFIG = {
  duration: 300,
  delay: 0,
  isInteraction: true,
  useNativeDriver: true,
};

class PushDown extends PureComponent {
  static displayName = 'Motion.PushDown';
  static propTypes = {
    /**
     * 测试标识符
     */
    accessibilityLabel: PropTypes.string,
    /**
     * 内容样式
     */
    style: ViewPropTypes.style,
    /**
     * 是否显示内容
     */
    show: PropTypes.bool,
    /**
     * 动画显示时长
     */
    showDuration: PropTypes.number,
    /**
     * 动画隐藏时长
     */
    hideDuration: PropTypes.number,
    /**
     * 下拉的高度
     */
    dropHeight: PropTypes.number,
    /**
     * 自定义内容
     */
    children: PropTypes.element.isRequired,
    /**
     * 动画显示回调
     */
    onShow: PropTypes.func,
    /**
     * 是否竖直居中
     */
    isAlign: PropTypes.bool,
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
    accessibilityLabel: 'PushDown',
    style: null,
    show: undefined,
    showDuration: 250,
    hideDuration: 350,
    dropHeight: 200,
    isAlign: true,
    onShow: () => {},
    onHide: () => {},
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
    if (!this.state.isAnimating && typeof show !== 'undefined' && show !== this.state.show) {
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
    const { style, children, isAlign, dropHeight, accessibilityLabel } = this.props;
    if (!this.state.show || !React.isValidElement(children)) {
      return null;
    }
    return (
      <Animated.View
        accessibilityLabel={accessibilityLabel}
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
