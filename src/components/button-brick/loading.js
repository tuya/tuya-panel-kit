import React from 'react';
import { View, ViewPropTypes, ColorPropType } from 'react-native';
import PropTypes from 'prop-types';
import Svg, { Circle } from 'react-native-svg';
import RotationView from '../rotation-view';
import { RatioUtils } from '../../utils';

const { convertX: cx } = RatioUtils;

const Loading = ({
  loading = false,
  color = '#fff',
  backgroundColor = 'rgba(0,0,0,.1)',
  style = {},
  size = cx(14),
  strokeWidth = cx(2),
}) => {
  if (!loading) return <View />;
  const w = size * 2 - 4 * strokeWidth;
  const content = w / 2;
  const r = w * 0.4;
  const strokeDasharray = [(Math.PI * r) / 2, Math.PI * r * 1.5];
  return (
    <RotationView style={style} duration={1000}>
      <Svg height={w} width={w}>
        <Circle
          cx={content}
          cy={content}
          r={r}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <Circle
          cx={content}
          cy={content}
          r={r}
          origin={`${content},${content}`}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={content}
        />
      </Svg>
    </RotationView>
  );
};

Loading.propTypes = {
  loading: PropTypes.bool,
  color: ColorPropType,
  backgroundColor: ColorPropType,
  style: ViewPropTypes.style,
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
};

Loading.defaultProps = {
  loading: false,
  color: '#fff',
  backgroundColor: 'rgba(0,0,0,.1)',
  style: {},
  size: cx(14),
  strokeWidth: cx(2),
};

export default Loading;
