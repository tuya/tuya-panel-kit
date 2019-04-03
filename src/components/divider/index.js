import PropTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet, ColorPropType, ViewPropTypes } from 'react-native';

function Divider(props) {
  const { visible, color, width, height } = props;
  const style = [styles.container, props.style];
  const styleObj = StyleSheet.flatten(style) || {};
  const flexDirection = styleObj.flexDirection || props.flexDirection;
  if (flexDirection !== 'row') {
    style.push({ width: StyleSheet.hairlineWidth });
  } else {
    style.push({ height: StyleSheet.hairlineWidth });
  }
  if (width) {
    style.push({ width });
  }
  if (height) {
    style.push({ height });
  }
  if (color) {
    style.push({ backgroundColor: color });
  }
  if (!visible) {
    style.push({ backgroundColor: 'transparent' });
  }

  return <View style={style} />;
}

Divider.propTypes = {
  style: ViewPropTypes.style,
  flexDirection: PropTypes.oneOf(['row', 'column']),
  visible: PropTypes.bool,
  color: ColorPropType,
  width: PropTypes.number,
  height: PropTypes.number,
};

Divider.defaultProps = {
  style: null,
  flexDirection: 'row',
  visible: true,
  color: null,
  width: null,
  height: null,
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: '#DBDBDB',
  },
});

export default Divider;
