import color from 'color';
import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { LinearGradient as Gradient, Defs, Stop } from 'react-native-svg';
import { Utils } from 'tuya-panel-utils';
import { ILinearProps, defaultLinear, IState } from './interface';

const Window = Dimensions.get('window');
const { numToHexString } = Utils.NumberUtils;

export default class LinearGradient extends Component<ILinearProps, IState> {
  static defaultProps = defaultLinear;

  constructor(props) {
    super(props);
    this._gradientId = Math.random()
      .toString(36)
      .substring(7);
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
      this.state.stops !== nextState.stops ||
      this.props.children !== nextProps.children
    );
  }

  get gradientId() {
    return this.props.gradientId || this._gradientId;
  }

  setSource(background) {
    const { x1, y1, x2, y2, stops, ...fstops } = background;
    const st = stops || fstops;
    const { props } = this;
    this.setState({
      stops: st,
      x1: x1 || props.x1,
      y1: y1 || props.y1,
      x2: x2 || props.x2,
      y2: y2 || props.y2,
    });
  }

  _gradientId: string;

  render() {
    const { gradientId } = this;
    const { style } = this.props;
    const { stops, x1, x2, y1, y2 } = this.state;
    const { height, width } = StyleSheet.flatten([styles.container, style]);
    const stopView = [];
    Object.keys(stops).forEach(k => {
      const stopColor = color(stops[k]);
      stopView.push(
        <Stop
          key={k}
          offset={k}
          stopColor={`#${numToHexString(stopColor.rgbNumber(), 6)}`}
          stopOpacity={stopColor.alpha()}
        />
      );
    });

    return (
      <View style={[styles.container, style]}>
        <Svg height={height} width={width}>
          <Defs>
            <Gradient id={gradientId} x1={x1} x2={x2} y1={y1} y2={y2}>
              {stopView.map(d => d)}
            </Gradient>
          </Defs>
          {React.Children.map(this.props.children, element => {
            if (React.isValidElement(element)) {
              return React.cloneElement(element, { fill: `url(#${gradientId})` });
            }
            return null;
          })}
        </Svg>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    bottom: 0,
    flex: 1,
    height: Window.height,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: Window.width,
  },
});
