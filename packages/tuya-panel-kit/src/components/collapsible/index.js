/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing, ViewPropTypes, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapperStyle: {
    overflow: 'hidden',
  },
});

const EASING_PREFIX = ['EaseInOut', 'EaseIn', 'EaseOut'];

class Collapsible extends React.PureComponent {
  static propTypes = {
    /**
     * 子元素对齐方式
     */
    align: PropTypes.oneOf(['top', 'center', 'bottom']),
    /**
     * 是否折叠
     */
    collapsed: PropTypes.bool,
    /**
     * 需要折叠的高度
     */
    collapsedHeight: PropTypes.number,
    /**
     * 折叠动画时长
     */
    duration: PropTypes.number,
    /**
     * 动画缓动函数
     */
    easing: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    /**
     * 容器样式
     */
    style: ViewPropTypes.style,
    /**
     * 变更回调函数
     */
    onChange: PropTypes.func,
    /**
     * 嵌套子元素
     */
    children: PropTypes.node,
  };
  static defaultProps = {
    align: 'top',
    collapsed: true,
    collapsedHeight: 0,
    duration: 300,
    easing: 'EaseOutCubic',
    onChange: () => {},
    children: null,
    style: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      height: new Animated.Value(props.collapsedHeight),
      contentHeight: 0,
      animating: false,
      measured: false,
      measuring: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.collapsed !== this.props.collapsed) {
      this.setState({ measured: false }, () => this.setHeight(prevProps));
    } else {
      this.setHeight(prevProps);
    }
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  setHeight = prevProps => {
    const { collapsed, collapsedHeight } = this.props;
    if (prevProps.collapsed !== collapsed) {
      this.toggleCollapsed(collapsed);
    } else if (collapsed && prevProps.collapsedHeight !== collapsedHeight) {
      this.state.height.setValue(collapsedHeight);
    }
  };

  setRef = ref => {
    this.content = ref;
  };

  getContentStyle = () => {
    const { measuring, height, contentHeight } = this.state;
    const { align } = this.props;
    if (measuring) {
      return { position: 'absolute', opacity: 0 };
    } else if (align !== 'top') {
      return {
        transform: [
          {
            translateY: height.interpolate({
              inputRange: [0, contentHeight],
              outputRange: [align === 'center' ? contentHeight / -2 : -contentHeight, 0],
            }),
          },
        ],
      };
    }
    return {};
  };

  measureContent = callback => {
    this.setState({ measuring: true }, () => {
      requestAnimationFrame(() => {
        if (!this.content) {
          /* istanbul ignore next */
          // TODO: 不可能走到这里
          this.setState({ measuring: false }, () => callback(this.props.collapsedHeight));
        } else {
          this.content.measure((x, y, width, height) => {
            this.setState(
              {
                measuring: false,
                measured: true,
                contentHeight: height,
              },
              () => callback(height)
            );
          });
        }
      });
    });
  };

  toggleCollapsed = collapsed => {
    if (collapsed) {
      this.transitionToHeight(this.props.collapsedHeight);
    } else if (!this.content) {
      if (this.state.measured) {
        this.transitionToHeight(this.state.contentHeight);
      }
    } else {
      this.measureContent(contentHeight => {
        this.transitionToHeight(contentHeight);
      });
    }
  };

  transitionToHeight = height => {
    const { duration, easing } = this.props;
    let finalEasing;
    let matching = false;
    if (typeof easing === 'string') {
      for (let i = 0; i < EASING_PREFIX.length; i++) {
        let prefix = EASING_PREFIX[i];
        if (easing.substr(0, prefix.length) === prefix) {
          const easingS =
            easing.substr(prefix.length, 1).toLowerCase() + easing.substr(prefix.length + 1);
          prefix = prefix.substr(4, 1).toLowerCase() + prefix.substr(5);
          finalEasing = Easing[prefix](Easing[easingS || 'ease']);
          matching = true;
          break;
        }
      }
      if (!matching) {
        finalEasing = Easing[easing];
      }
      if (!finalEasing) {
        /* istanbul ignore next */ throw new Error(`Invalid easing type "${this.props.easing}"`);
      }
      if (this.animation) {
        this.animation.stop();
      }
      this.setState({ animating: true });
      this.animation = Animated.timing(this.state.height, {
        toValue: height,
        duration,
        easing: finalEasing,
        useNativeDriver: false,
      });
      this.animation.start(() => {
        if (this.unmounted) /* istanbul ignore next */ return;
        this.setState({ animating: false }, () => {
          if (this.unmounted) /* istanbul ignore next */ return;
          this.props.onChange();
        });
      });
    }
  };

  handleLayoutChange = e => {
    const contentHeight = e.nativeEvent.layout.height;
    if (
      this.state.animating ||
      this.props.collapsed ||
      this.state.measuring ||
      this.state.contentHeight === contentHeight
    ) {
      return;
    }
    /* istanbul ignore next */
    this.state.height.setValue(contentHeight);
    /* istanbul ignore next */
    this.setState({ contentHeight });
  };

  render() {
    const { height, measuring, measured, animating } = this.state;
    const { style, collapsed, children } = this.props;
    const hasKnownHeight = !measuring && (measured || collapsed);
    const wrapperStyle = [styles.wrapperStyle, { height }];
    const preContentStyle = this.getContentStyle();
    const contentStyle = [preContentStyle, style];
    return (
      <Animated.View
        style={hasKnownHeight ? wrapperStyle : null}
        pointerEvents={collapsed ? 'none' : 'auto'}
      >
        <Animated.View
          style={contentStyle}
          ref={this.setRef}
          onLayout={animating ? undefined : this.handleLayoutChange}
        >
          {children}
        </Animated.View>
      </Animated.View>
    );
  }
}

export default Collapsible;
