import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { RadialGradient as Gradient, Defs, Stop, Rect } from 'react-native-svg';
import { RadialGradientProps } from './interface';

const Window = Dimensions.get('window');

export default class RadialGradient extends Component<RadialGradientProps> {
  static defaultProps = {
    style: null,
    gradientId: 'radial-gradient',
    cx: '50%',
    cy: '50%',
    rx: '50%',
    ry: '50%',
    fx: '50%',
    fy: '50%',
    stops: [
      {
        offset: '0%',
        stopColor: '#ff0',
        stopOpacity: '1',
      },
      {
        offset: '100%',
        stopColor: '#00f',
        stopOpacity: '1',
      },
    ],
  };

  constructor(props) {
    super(props);
    this._gradientId = Math.random()
      .toString(36)
      .substring(7);
  }

  get gradientId() {
    return this.props.gradientId || this._gradientId;
  }

  _gradientId: string;

  render() {
    const { gradientId } = this;
    const { style, cx, cy, rx, ry, fx, fy, stops } = this.props;
    const { height, width } = StyleSheet.flatten([styles.container, style]);
    return (
      <View style={[styles.container, style]}>
        <Svg height={height} style={style} width={width}>
          <Defs>
            <Gradient id={gradientId} cx={cx} cy={cy} fx={fx} fy={fy} rx={rx} ry={ry}>
              {stops.map(x => (
                <Stop key={x.offset} {...x} />
              ))}
            </Gradient>
          </Defs>
          <Rect fill={`url(#${gradientId})`} height={height} width={width} x="0" y="0" />
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
