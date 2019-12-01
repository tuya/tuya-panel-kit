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
    align: PropTypes.oneOf(['top', 'center', 'bottom']),
    collapsed: PropTypes.bool,
    collapsedHeight: PropTypes.number,
    duration: PropTypes.number,
    easing: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    style: ViewPropTypes.style,
    onChange: PropTypes.func,
    children: PropTypes.node,
  };
  static defaultProps = {
    align: 'top',
    collapsed: true,
    collapsedHeight: 0,
    duration: 300,
    easing: 'EaseOutCubic',
    onChange: () => null,
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
          this.setState({ measuring: false }, () => callback(this.props.collapsedHeight));
        } else {
          this.content.getNode().measure((x, y, width, height) => {
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
        throw new Error(`Invalid easing type "${this.props.easing}"`);
      }
      if (this.animation) {
        this.animation.stop();
      }
      this.setState({ animating: true });
      this.animation = Animated.timing(this.state.height, {
        toValue: height,
        duration,
        easing: finalEasing,
      });
      this.animation.start(() => {
        if (this.unmounted) return;
        this.setState({ animating: false }, () => {
          if (this.unmounted) return;
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

    this.state.height.setValue(contentHeight);
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
