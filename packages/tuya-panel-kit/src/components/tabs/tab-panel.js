import React from 'react';
import { View, ViewPropTypes, ColorPropType } from 'react-native';
import { RatioUtils } from '../../utils';

const { width } = RatioUtils;

const TabPanel = ({ style, background, ...props }) => (
  <View style={[{ width }, { backgroundColor: background }, style]} {...props} />
);

TabPanel.propTypes = {
  /**
   *  内容样式
   */
  style: ViewPropTypes.style,
  /**
   *  背景色
   */
  background: ColorPropType,
};

TabPanel.defaultProps = {
  style: null,
  background: 'transparent',
};

export default TabPanel;
