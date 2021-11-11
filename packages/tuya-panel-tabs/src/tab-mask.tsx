import Color from 'color';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Rect } from 'react-native-svg';
import LinearGradient from 'tuya-panel-linear-gradient';
import { MASK_SIZE } from './constant';
import { ITabMask } from './interface';

const Mask = (props: ITabMask) => {
  const { visible, color } = props;
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

Mask.defaultProps = {
  visible: true,
  color: '#fff',
};

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: MASK_SIZE.width,
  },
});

export default Mask;
