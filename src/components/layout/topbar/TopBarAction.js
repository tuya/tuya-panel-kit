import PropTypes from 'prop-types';
import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, ViewPropTypes } from 'react-native';
import TYText from '../../TYText';
import IconFont from '../../iconfont';
import { isIos } from '../../../utils/ratio';

const TopBarAction = ({
  style,
  contentStyle,
  size,
  color,
  spacing,
  source,
  disabled,
  children,
  onPress,
  ...restProps
}) => {
  const isText = typeof source === 'string';
  let child = children;
  if (isText) {
    child = (
      <TYText style={[styles.text, { color }, contentStyle]} numberOfLines={1} {...restProps}>
        {source}
      </TYText>
    );
  } else if (
    typeof source === 'number' ||
    (source && typeof source === 'object' && typeof source.uri === 'string')
  ) {
    child = <Image style={[contentStyle, { tintColor: color }]} source={source} {...restProps} />;
  }
  if (restProps.name || restProps.d) {
    child = <IconFont style={contentStyle} size={size} color={color} {...restProps} />;
  }
  const { width = TopBarAction.width } = StyleSheet.flatten([style]);
  return (
    <TouchableOpacity
      style={[
        styles.wrapper,
        style,
        !isText && { marginHorizontal: spacing },
        isText && { width: width + spacing * 2 },
      ]}
      activeOpacity={0.8}
      disabled={disabled}
      hitSlop={isText ? null : { top: spacing, left: spacing, bottom: spacing, right: spacing }}
      onPress={onPress}
    >
      {child}
    </TouchableOpacity>
  );
};

TopBarAction.displayName = 'TopBar.Action';

TopBarAction.width = 26;

TopBarAction.propTypes = {
  ...IconFont.propTypes,
  style: ViewPropTypes.style,
  contentStyle: PropTypes.any,
  size: PropTypes.number,
  spacing: PropTypes.number,
  color: PropTypes.string,
  source: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.shape({
      uri: PropTypes.string.isRequired,
    }),
  ]),
  disabled: PropTypes.bool,
  children: PropTypes.any,
  onPress: PropTypes.func,
};

TopBarAction.defaultProps = {
  style: null,
  contentStyle: null,
  size: 26,
  spacing: 12,
  color: '#fff',
  source: null,
  disabled: false,
  children: <View />,
  onPress: null,
};

const styles = StyleSheet.create({
  wrapper: {
    width: TopBarAction.width,
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: isIos ? 16 : 18,
    color: '#fff',
  },
});

export default TopBarAction;
