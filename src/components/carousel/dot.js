/* eslint-disable react/no-array-index-key */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  dot: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 10,
    left: 0,
    right: 0,
  },
  dotContainer: {
    flexDirection: 'row',
  },
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: '#bbb',
  },
  dotActiveStyle: {
    backgroundColor: '#fff',
  },
  spaceStyle: {
    marginHorizontal: 3,
    marginVertical: 3,
  },
});

const defaultDot = props => {
  const { dotStyle, dotActiveStyle, count, currentIndex, dotWrapperStyle } = props;
  const dotArr = Array(count)
    .fill('2333')
    .map((item, i) => (
      <View
        key={`dot-${i}`}
        style={[
          styles.dotStyle,
          styles.spaceStyle,
          dotStyle,
          i === currentIndex && styles.dotActiveStyle,
          i === currentIndex && dotActiveStyle,
        ]}
      />
    ));
  return (
    <View style={[styles.dot, dotWrapperStyle]}>
      <View style={styles.dotContainer}>{dotArr}</View>
    </View>
  );
};

defaultDot.propTypes = {
  dotStyle: ViewPropTypes.style,
  dotActiveStyle: ViewPropTypes.style,
  dotWrapperStyle: ViewPropTypes.style,
  count: PropTypes.number,
  currentIndex: PropTypes.number,
};

defaultDot.defaultProps = {
  dotStyle: {},
  dotActiveStyle: {},
  dotWrapperStyle: {},
  count: 3,
  currentIndex: 0,
};

export default defaultDot;
