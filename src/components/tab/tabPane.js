import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const TabPane = props => {
  const { children, ...otherProps } = props;
  return (
    <View {...otherProps}>
      { children }
    </View>
  );
};

TabPane.propTypes = {
  key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  tabWidth: PropTypes.number,
  tab: PropTypes.node,
}

export default TabPane;
