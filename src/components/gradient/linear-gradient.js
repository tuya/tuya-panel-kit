/* eslint-disable no-restricted-syntax, guard-for-in */
import color from 'color';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ViewPropTypes,
} from 'react-native';
import Svg, {
  LinearGradient as Gradient,
  Defs,
  Stop,
} from 'react-native-svg';
import { NumberUtils } from '../../utils';

const Window = Dimensions.get('window');

export default class LinearGradient extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    children: PropTypes.any,
    stops: PropTypes.object,
    x1: PropTypes.string,
    y1: PropTypes.string,
    x2: PropTypes.string,
    y2: PropTypes.string,
  };

  static defaultProps = {
    style: null,
    children: null,
    stops: {
      '0%': 'rgb(255, 255, 255)',
      '100%': 'rgb(0, 0, 0)',
    },
    x1: '0%',
    y1: '0%',
    x2: '0%',
    y2: '100%',
  };

  constructor(props) {
    super(props);
    this.setSource = this.setSource.bind(this);
    this.state = {
      stops: props.stops,
      x1: props.x1,
      y1: props.y1,
      x2: props.x2,
      y2: props.y2,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      stops: nextProps.stops,
      x1: nextProps.x1,
      y1: nextProps.y1,
      x2: nextProps.x2,
      y2: nextProps.y2,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.x1 !== nextState.x1 ||
      this.state.x2 !== nextState.x2 ||
      this.state.y1 !== nextState.y1 ||
      this.state.y2 !== nextState.y2 ||
      this.state.stops !== nextState.stops
    );
  }

  setSource(background) {
    const { x1, y1, x2, y2, stops, ...fstops } = background;
    const st = stops || fstops;
    const props = this.props;
    this.setState({
      stops: st,
      x1: x1 || props.x1,
      y1: y1 || props.y1,
      x2: x2 || props.x2,
      y2: y2 || props.y2,
    });
  }

  render() {
    const { style } = this.props;
    const { stops, x1, x2, y1, y2 } = this.state;
    const { height, width } = StyleSheet.flatten([styles.container, style]);
    const stopView = [];
    for (const k in stops) {
      const stopColor = color(stops[k]);
      stopView.push(
        <Stop
          key={k}
          offset={k}
          stopColor={`#${NumberUtils.numToHexString(stopColor.rgbNumber(), 6)}`}
          stopOpacity={stopColor.alpha()}
        />,
      );
    }

    return (
      <View style={[styles.container, style]}>
        <Svg height={height} width={width}>
          <Defs>
            <Gradient id="Gradient" x1={x1} y1={y1} x2={x2} y2={y2}>
              {stopView.map(d => d)}
            </Gradient>
          </Defs>
          {React.Children.map(this.props.children, element => React.cloneElement(element, { fill: 'url(#Gradient)' }))}
        </Svg>
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
