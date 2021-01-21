/* eslint-disable new-cap */
import PropTypes from 'prop-types';
import Color from 'color';
import React from 'react';
import { View, StyleSheet, ColorPropType } from 'react-native';
import { Rect } from 'svgs';
import LinearGradient from '../gradient/linear-gradient';
import { MASK_SIZE } from './constant';

const Mask = ({ visible, color }) => {
  if (!visible || color === 'transparent') {
    return null;
  }
  const c1 = Color(color)
    .alpha(0)
    .rgbString();
  const c2 = Color(color)
    .alpha(0.8)
    .rgbString();
  const c3 = Color(color)
    .alpha(1)
    .rgbString();
  return (
    <View style={styles.container}>
      <LinearGradient
        style={MASK_SIZE}
        x1="0%"
        y1="50%"
        x2="100%"
        y2="50%"
        stops={{
          '0%': c1,
          '40%': c2,
          '100%': c3,
        }}
      >
        <Rect {...MASK_SIZE} />
      </LinearGradient>
    </View>
  );
};

Mask.propTypes = {
  visible: PropTypes.bool,
  color: ColorPropType,
};

Mask.defaultProps = {
  visible: true,
  color: '#fff',
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: MASK_SIZE.width,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

export default Mask;
