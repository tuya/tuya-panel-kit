import React from 'react';
import { View, ViewPropTypes, ColorPropType } from 'react-native';
import { RatioUtils } from '../../utils';

const { width } = RatioUtils;

const TabPanel = ({ style, background, ...props }) => (
  <View style={[{ width }, { backgroundColor: background }, style]} {...props} />
);

TabPanel.propTypes = {
  style: ViewPropTypes.style,
  background: ColorPropType,
};

TabPanel.defaultProps = {
  style: null,
  background: 'transparent',
};

export default TabPanel;
