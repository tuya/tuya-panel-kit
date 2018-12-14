import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import Svg, { LinearGradient, Defs, Stop, Rect } from 'react-native-svg';
import { convert } from '../../../utils/ratio';

const colorPoints = ['#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f0f', '#f00'];
const whitePoints = ['rgb(255, 162, 71)', '#fff', 'rgb(213, 225, 255)'];

export default class Hue extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    // 是否适配手机屏幕
    scalable: PropTypes.bool,
    saturation: PropTypes.oneOf(['2l', '2r', '2b', '2t', 'none']),

    kelvin: PropTypes.bool,
    axis: PropTypes.oneOf(['x', 'y'])
  };

  static defaultProps = {
    width: 100,
    height: 50,
    scalable: false,
    axis: 'x',
    kelvin: false,
    saturation: 'none'
  };

  shouldComponentUpdate(nextProps) {
    const { props } = this;

    return (
      props.width !== nextProps.width ||
      props.height !== nextProps.height ||
      props.scalable !== nextProps.scalable ||
      props.kelvin !== nextProps.kelvin ||
      props.saturation !== nextProps.saturation
    );
  }

  render() {
    let { width, height } = this.props;
    const { scalable, saturation, axis, kelvin } = this.props;

    if (scalable) {
      width = convert(width);
      height = convert(height);
    }

    const horizontal = axis === 'x';

    const saturationProps = horizontal
      ? { x1: '0%', y1: '0%', x2: '0%', y2: '100%' }
      : { x1: '0%', y1: '0%', x2: '100%', y2: '0%' };

    const hueProps = horizontal
      ? { x1: '0%', y1: '0%', x2: '100%', y2: '0%' }
      : { x1: '0%', y1: '0%', x2: '0%', y2: '100%' };

    const colorP = [...colorPoints];
    const points = kelvin ? whitePoints : colorP;
    const pointStep = 100 / (points.length - 1);
    return (
      <View style={{ width, height }}>
        <Svg width={width} height={height}>
          <Defs>
            <LinearGradient id="hue" {...hueProps}>
              {points.map((point, i) => {
                const key = `${point}${i}`;
                return (
                  <Stop
                    key={key}
                    offset={`${kelvin && i === 1 ? 60 : pointStep * i}%`}
                    stopColor={point}
                  />
                );
              })}
            </LinearGradient>

            <LinearGradient id="saturation" {...saturationProps}>
              <Stop
                offset="0%"
                stopColor="#fff"
                stopOpacity={saturation === '2b' || saturation === '2r' ? 0 : 1}
              />
              <Stop
                offset="100%"
                stopColor="#fff"
                stopOpacity={saturation === '2b' || saturation === '2r' ? 1 : 0}
              />
            </LinearGradient>
          </Defs>

          <Rect x="0" y="0" width="100%" height="100%" fill="url(#hue)" />

          <Rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill={saturation && saturation !== 'none' ? 'url(#saturation)' : 'none'}
          />
        </Svg>
      </View>
    );
  }
}
