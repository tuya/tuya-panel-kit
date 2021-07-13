/* eslint-disable no-restricted-syntax, guard-for-in */
import color from 'color';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { LinearGradient, Defs, Stop } from 'react-native-svg';
import { NumberUtils } from '../../utils';

export default class Gradient extends PureComponent {
  static propTypes = {
    gradientId: PropTypes.string,
    foreColor: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    x1: PropTypes.string,
    x2: PropTypes.string,
    y1: PropTypes.string,
    y2: PropTypes.string,
  };

  static defaultProps = {
    gradientId: 'Gradient',
    foreColor: '#FF4800',
    x1: '0%',
    y1: '0%',
    x2: '100%',
    y2: '0%',
  };

  render() {
    const { gradientId, foreColor, x1, x2, y1, y2 } = this.props;
    const stopView = [];

    for (const k in foreColor) {
      const stopColor = color(foreColor[k]);
      stopView.push(
        <Stop
          key={k}
          offset={k}
          stopColor={`#${NumberUtils.numToHexString(stopColor.rgbNumber(), 6)}`}
          stopOpacity={stopColor.alpha()}
        />
      );
    }

    return (
      <Defs>
        <LinearGradient id={gradientId} x1={x1} x2={x2} y1={y1} y2={y2}>
          {stopView.map(d => d)}
        </LinearGradient>
      </Defs>
    );
  }
}
