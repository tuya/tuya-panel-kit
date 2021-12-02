import React from 'react';
import { View } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { TabPanelProps } from './interface';

const { width } = Utils.RatioUtils;

const TabPanel = (props: TabPanelProps) => {
  const { style, background, ...rest } = props;
  return <View style={[{ width }, { backgroundColor: background }, style]} {...rest} />;
};

TabPanel.defaultProps = {
  style: null,
  background: 'transparent',
};

export default TabPanel;
