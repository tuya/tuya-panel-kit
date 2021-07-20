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
  /**
   * 分隔线样式
   */
  style: ViewPropTypes.style,
  /**
   * 主轴方向
   */
  flexDirection: PropTypes.oneOf(['row', 'column']),
  /**
   * 是否显示
   */
  visible: PropTypes.bool,
  /**
   * 分隔线颜色
   */
  color: ColorPropType,
  /**
   * 分隔线宽
   */
  width: PropTypes.number,
  /**
   * 分隔线高
   */
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
