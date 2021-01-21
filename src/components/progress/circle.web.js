import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Circle } from 'svgs';

export default class ProgressCircle extends PureComponent {
  static propTypes = {
    cx: PropTypes.number,
    cy: PropTypes.number,
    fill: PropTypes.string,
    strokeWidth: PropTypes.number,
    stroke: PropTypes.string,
    r: PropTypes.number,
  };

  static defaultProps = {
    cx: 0,
    cy: 0,
    fill: '#fff',
    strokeWidth: 2,
    stroke: '#000',
    r: 4,
  };

  render() {
    const { strokeWidth, fill, stroke, r, cx, cy } = this.props;
    return <Circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
  }
}
