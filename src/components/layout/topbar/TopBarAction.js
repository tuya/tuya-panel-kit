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
  /**
   * TopBar.Action的样式
   */
  style: ViewPropTypes.style,
  /**
   * TopBar.Action主体的样式，可为图片、文字或IconFont的样式
   */
  contentStyle: PropTypes.any,
  /**
   * TopBar.Action的IconFont的尺寸
   */
  size: PropTypes.number,
  /**
   * TopBar.Action的左右边距，注若为文字类型spacing将会被作为额外宽度添加给Action
   */
  spacing: PropTypes.number,
  /**
   * TopBar.Action主体内容的颜色，可为图片的底色、文字颜色或IconFont颜色。
   */
  color: PropTypes.string,
  /**
   * TopBar.Action的主体内容，
   * 若为字符串则渲染文字组件，若为数值或网络图片则渲染图片组件，若不存在则渲染空View。
   */
  source: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.shape({
      uri: PropTypes.string.isRequired,
    }),
  ]),
  /**
   * 是否禁用
   */
  disabled: PropTypes.bool,
  /**
   * TopBar.Action的子元素，
   * 如果不传TopBar.Action会自动根据所传source的类型自动渲染所需子元素。
   */
  children: PropTypes.any,
  /**
   * 点击事件
   */
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
