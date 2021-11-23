import React from 'react';
import { View } from 'react-native';
import { TabPaneProps } from './interface';

const TabPane = (props: TabPaneProps) => {
  const { children, ...otherProps } = props;
  return <View {...otherProps}>{children}</View>;
};

export default TabPane;
