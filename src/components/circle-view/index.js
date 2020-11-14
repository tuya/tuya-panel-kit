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
  /**
   * 圆形视图的样式
   */
  style: ViewPropTypes.style,
  /**
   * 嵌套子元素
   */
  children: PropTypes.node,
  /**
   * 圆形视图的背景色
   */
  color: ColorPropType,
  /**
   * 圆形视图边框的背景色
   */
  borderColor: ColorPropType,
  /**
   * 圆形视图边框的尺寸
   */
  borderWidth: PropTypes.number,
  /**
   * 圆形视图的半径
   */
  radius: PropTypes.number.isRequired,
};

export default CircleView;
