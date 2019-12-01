import PropTypes from 'prop-types';
import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import {
  StyledTopBarAction,
  StyledTopBarText,
  StyledIconFont,
  StyledImage,
  TOPBAR_MARGIN,
  TOPBAR_ACTION_WIDTH,
} from './styled';
import IconFont from '../../iconfont';

const TopBarAction = ({
  accessibilityLabel,
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
      <StyledTopBarText style={contentStyle} color={color} numberOfLines={1} {...restProps}>
        {source}
      </StyledTopBarText>
    );
  } else if (
    typeof source === 'number' ||
    (source && typeof source === 'object' && typeof source.uri === 'string')
  ) {
    child = <StyledImage style={contentStyle} source={source} color={color} {...restProps} />;
  }
  if (restProps.name || restProps.d) {
    child = <StyledIconFont style={contentStyle} size={size} color={color} {...restProps} />;
  }
  return (
    <StyledTopBarAction
      accessibilityLabel={accessibilityLabel}
      style={[{ marginHorizontal: spacing }, style]}
      activeOpacity={0.8}
      disabled={disabled}
      hitSlop={isText ? null : { top: spacing, left: spacing, bottom: spacing, right: spacing }}
      onPress={onPress}
    >
      {child}
    </StyledTopBarAction>
  );
};

TopBarAction.displayName = 'TopBar.Action';

TopBarAction.width = TOPBAR_ACTION_WIDTH;

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
  size: TOPBAR_ACTION_WIDTH,
  spacing: TOPBAR_MARGIN,
  color: null,
  source: null,
  disabled: false,
  children: <View />,
  onPress: null,
};

export default TopBarAction;
