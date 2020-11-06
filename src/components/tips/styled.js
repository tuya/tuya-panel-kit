import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import IconFont from '../iconfont';
import { defaultTheme } from '../theme';
import { RatioUtils, ThemeUtils } from '../../utils';

const DEFAULT_THEME = defaultTheme.tips.light;

const { convertX: cx } = RatioUtils;
const { getTheme, ThemeConsumer } = ThemeUtils;

export const StyledViewChildren = styled(View)`
  min-width: ${cx(64)};
  border-radius: ${cx(4)};
  padding: ${`${cx(8)}px ${cx(16)}px ${cx(8)}px ${cx(16)}px`};
  background-color: ${props => getTheme(props, 'tips.bgColor', DEFAULT_THEME.bgColor)};
`;

export const StyledIconFont = props => {
  const { color, ...rest } = props;
  return (
    <ThemeConsumer>
      {theme => {
        const propsWithTheme = { ...props, theme };
        return (
          <IconFont
            size={cx(32)}
            color={color || getTheme(propsWithTheme, 'tips.bgColor', DEFAULT_THEME.bgColor)}
            {...rest}
          />
        );
      }}
    </ThemeConsumer>
  );
};
