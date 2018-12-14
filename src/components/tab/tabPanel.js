import React from 'react';
import { View } from 'react-native';

const TabPanel = props => {
  const { children, ...otherProps } = props;
  return (
    <View {...otherProps}>
      { children }
    </View>
  );
};

export default TabPanel;
