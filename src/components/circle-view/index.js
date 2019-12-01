/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';
import React from 'react';
import { View, ColorPropType, ViewPropTypes, StyleSheet } from 'react-native';

const CircleView = props => {
  const { children, radius, style, color, borderColor, borderWidth = 1.5, ...restProps } = props;
  let _backgroundColor = null;
  if (style) {
    _backgroundColor = StyleSheet.flatten(style).backgroundColor;
  }

  const propStyle = {};
  if (borderColor) {
    propStyle.borderWidth = borderWidth;
    propStyle.borderColor = borderColor;
  }
  propStyle.backgroundColor = color || _backgroundColor || null;

  const circleWrapperStyle = [
    propStyle,
    style,
    {
      overflow: 'hidden',
      borderRadius: radius,
      height: radius * 2,
      width: radius * 2,
    },
  ];

  return (
    <View {...restProps} style={circleWrapperStyle}>
      {children}
    </View>
  );
};

CircleView.propTypes = {
  style: ViewPropTypes.style,
  children: PropTypes.node,
  color: ColorPropType,
  borderColor: ColorPropType,
  borderWidth: PropTypes.number,
  radius: PropTypes.number.isRequired,
};

export default CircleView;
