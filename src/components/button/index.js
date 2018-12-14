import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  ViewPropTypes,
} from 'react-native';

import { Rect } from 'react-native-svg';
import LinearGradient from '../gradient/linear-gradient';

export default class Button extends Component {
  static propTypes = {
    ...TouchableOpacity.propTypes,
    style: ViewPropTypes.style,
    contentStyle: ViewPropTypes.style,
    backgroundStyle: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
    }),
    background: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
    ]),
  };

  static defaultProps = {
    style: undefined,
    contentStyle: undefined,
    backgroundStyle: undefined,
    background: undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      svg: null,
    };
  }

  renderImageBackground() {
    const { style, contentStyle, background, ...props } = this.props;

    return (
      <TouchableOpacity style={style} {...props}>
        <Image source={background} />
        <View style={[
          contentStyle,
          styles.container,
          styles.absoluteFill,
        ]}
        >
          {this.props.children}
        </View>
      </TouchableOpacity>
    );
  }

  renderLinearGradientBackground() {
    const { style, contentStyle, background, backgroundStyle, ...props } = this.props;
    const { x1, y1, x2, y2, ...stops } = background;
    return (
      <TouchableOpacity
        {...props}
        style={[style]}
        onLayout={({ nativeEvent: { layout: { width, height } } }) => {
          this.setState({ svg: { width, height } });
        }}
      >
        {this.state.svg && (
          <LinearGradient
            stops={stops}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
          >
            <Rect
              x="0"
              y="0"
              {...this.state.svg}
              {...backgroundStyle}
            />
          </LinearGradient>
        )}
        <View style={[
          contentStyle,
          styles.container,
          { overflow: 'hidden' },
        ]}
        >
          {this.props.children}
        </View>
      </TouchableOpacity>
    );
  }

  renderWithoutBackground() {
    const { style, contentStyle, ...props } = this.props;

    return (
      <TouchableOpacity style={style} {...props}>
        <View style={[
          contentStyle,
          styles.container,
          styles.absoluteFill,
          styles.reset,
        ]}
        >
          {this.props.children}
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { background } = this.props;
    const backgroundType = typeof background;

    switch (backgroundType) {
      case 'number':// button 背景是图片
        return this.renderImageBackground();

      case 'object':// button 背景是渐变颜色
        return this.renderLinearGradientBackground();

      default:
        return this.renderWithoutBackground();
    }
  }
}


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  reset: {
    position: 'relative',
    padding: 0,
    margin: 0,
    borderWidth: 0,
  },
});
