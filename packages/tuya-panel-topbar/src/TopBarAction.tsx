import React from 'react';
import { View, ImageURISource } from 'react-native';
import {
  StyledTopBarAction,
  StyledTopBarText,
  StyledIconFont,
  StyledImage,
  TOPBAR_MARGIN,
  TOPBAR_ACTION_WIDTH,
} from './styled';
import { ITopBarActionProps } from './interface';

const TopBarAction: React.FC<ITopBarActionProps> & { width: number } = ({
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
    (source && typeof source === 'object' && 'uri' in source)
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
