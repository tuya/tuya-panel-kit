import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ViewPropTypes,
} from 'react-native';
import Svg, {
  RadialGradient as Gradient,
  Defs,
  Stop,
  Rect,
} from 'react-native-svg';

const Window = Dimensions.get('window');

// eslint-disable-next-line react/prefer-stateless-function
export default class RadialGradient extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    cx: PropTypes.string,
    cy: PropTypes.string,
    rx: PropTypes.string,
    ry: PropTypes.string,
    fx: PropTypes.string,
    fy: PropTypes.string,
    stops: PropTypes.arrayOf(PropTypes.shape({
      offset: PropTypes.string.isRequired,
      stopColor: PropTypes.string.isRequired,
      stopOpacity: PropTypes.string.isRequired,
    })),
  };

  static defaultProps = {
    style: null,
    cx: '50%',
    cy: '50%',
    rx: '50%',
    ry: '50%',
    fx: '50%',
    fy: '50%',
    stops: [{
      offset: '0%',
      stopColor: '#ff0',
      stopOpacity: '1',
    }, {
      offset: '100%',
      stopColor: '#00f',
      stopOpacity: '1',
    }],
  };

  render() {
    const {
      style,
      cx,
      cy,
      rx,
      ry,
      fx,
      fy,
      stops,
    } = this.props;
    const { height, width } = StyleSheet.flatten([styles.container, style]);

    return (
      <View style={[styles.container, style]}>
        <Svg height={height} width={width} style={[styles.container, style]}>
          <Defs>
            <Gradient
              id="grad"
              cx={cx}
              cy={cy}
              rx={rx}
              ry={ry}
              fx={fx}
              fy={fy}
              gradientUnits="userSpaceOnUse"
            >
              {stops.map(x => <Stop key={x.offset} {...x} />)}
            </Gradient>
          </Defs>
          <Rect
            x="0"
            y="0"
            width={width}
            height={height}
            fill="url(#grad)"
          />
        </Svg>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'transparent',
    width: Window.width,
    height: Window.height,
  },
});
