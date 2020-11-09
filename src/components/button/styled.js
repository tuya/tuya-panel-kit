import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';
import TYText from '../TYText';
import IconFont from '../iconfont';
import { defaultTheme } from '../theme';
import { RatioUtils, ThemeUtils } from '../../utils';

const { convertX: cx } = RatioUtils;
const { parseToCss, getTheme, ThemeConsumer } = ThemeUtils;

const DEFAULT_THEME = defaultTheme.button.light;

export const SIZE_MAP = {
  small: cx(32),
  normal: cx(40),
  large: cx(48),
};

const BTN_TEXT_STYLES_MAP = {
  left: css`
    font-size: 16;
    margin-right: 8px;
  `,
  right: css`
    font-size: 16;
    margin-left: 8px;
  `,
  top: css`
    margin-bottom: 4px;
  `,
  bottom: css`
    margin-top: 4px;
  `,
};

const sizeStyles = props => {
  const bgWidth = getTheme(props, 'button.bgWidth');
  const bgHeight = getTheme(props, 'button.bgHeight');
  const bgRadius = getTheme(props, 'button.bgRadius');
  if (props.size === 'noSet') {
    const styles = [];
    if (typeof bgWidth === 'number') styles.push(`width: ${bgWidth}`);
    if (typeof bgHeight === 'number') styles.push(`height: ${bgHeight}`);
    if (typeof bgRadius === 'number') styles.push(`border-radius: ${bgRadius}`);
    if (styles.length === 0) return null;
    const stylesStr = styles.join('\n');
    return css`
      ${stylesStr}
    `;
  }
  const size = typeof props.size === 'number' ? props.size : SIZE_MAP[props.size];
  // TODO: 确认是否能直接将按钮背景改为圆角
  return css`
    width: ${bgWidth || size}px;
    height: ${bgHeight || size}px;
    border-radius: ${bgRadius || size / 2}px;
  `;
};

const bgStyles = props => {
  if (props.type !== 'primary') {
    return css`
      background-color: transparent;
    `;
  }
  return css`
    background-color: ${getTheme(props, 'button.bgColor', DEFAULT_THEME.bgColor)};
  `;
};

const btnTextStyles = props => {
  if (!props.textDirection) {
    return null;
  }
  return BTN_TEXT_STYLES_MAP[props.textDirection] || BTN_TEXT_STYLES_MAP.right;
};

export const StyledBtnWrapper = styled(View)`
  align-self: ${props => (props.stretch ? 'stretch' : 'center')};
  align-items: center;
  justify-content: center;
  ${props => {
    const margin = getTheme(props, 'button.margin', DEFAULT_THEME.margin);
    return parseToCss(margin, 'margin');
  }};
`;

export const StyledBtnContainer = styled(TouchableOpacity)`
  align-self: ${props => (props.stretch ? 'stretch' : 'center')};
  align-items: center;
  justify-content: center;
`;

export const StyledBtn = styled(View)`
  align-items: center;
  justify-content: center;
  overflow: hidden;
  ${props => sizeStyles(props)};
  ${props => bgStyles(props)};
`;

export const StyledBtnText = styled(TYText)`
  text-align: center;
  font-size: ${props => getTheme(props, 'button.fontSize', DEFAULT_THEME.fontSize)};
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  color: ${props => getTheme(props, 'button.fontColor', DEFAULT_THEME.fontColor)};
  ${props => btnTextStyles(props)};
`;

export const StyledBadge = styled(View)`
  position: absolute;
  border-radius: ${cx(8)}px;
  padding: ${`2px ${cx(8)}px`};
`;

export const StyledBadgeText = styled(TYText)`
  font-size: 10px;
  text-align: center;
`;

export const StyledIconFont = props => {
  // eslint-disable-next-line react/prop-types
  const { size, color, ...rest } = props;
  return (
    <ThemeConsumer>
      {theme => {
        const propsWithTheme = { ...props, theme };
        return (
          <IconFont
            size={size || 28}
            color={color || getTheme(propsWithTheme, 'button.iconColor', DEFAULT_THEME.iconColor)}
            {...rest}
          />
        );
      }}
    </ThemeConsumer>
  );
};
