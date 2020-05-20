import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const TabPane = props => {
  const { children, ...otherProps } = props;
  return <View {...otherProps}>{children}</View>;
};

TabPane.propTypes = {
  /**
   * 每个tab的宽度
   */
  tabWidth: PropTypes.number,
  /**
   * tab上文字或者自定义的元素
   */
  tab: PropTypes.node,
};

export default TabPane;
