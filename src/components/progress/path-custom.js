import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Path } from 'react-native-svg';

export default class PathCustom extends PureComponent {
  static propTypes = {
    strokeOpacity: PropTypes.number,
    path: PropTypes.string,
    isGradient: PropTypes.bool,
    gradientId: PropTypes.string,
    foreColor: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    strokeWidth: PropTypes.number,
  };

  static defaultProps = {
    strokeOpacity: 1,
    path: '',
    isGradient: false,
    gradientId: 'Gradient',
    foreColor: '#FF4800',
    strokeWidth: 5,
  };

  render() {
    const { strokeOpacity, isGradient, gradientId, foreColor, strokeWidth, path } = this.props;
    return (
      <Path
        d={path}
        x="0"
        y="0"
        fill="none"
        strokeWidth={strokeWidth}
        strokeOpacity={strokeOpacity}
        stroke={isGradient ? `url(#${gradientId})` : foreColor}
      />
    );
  }
}
