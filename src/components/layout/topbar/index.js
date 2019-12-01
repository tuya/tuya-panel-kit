import React from 'react';
import PropTypes from 'prop-types';
import { ColorPropType } from 'react-native';
import TopBar from './topbar';
import { ThemeUtils } from '../../../utils';

const { getTheme, ThemeConsumer } = ThemeUtils;

const ThemedTopBar = props => {
  const { theme: localTheme, ...rest } = props;
  return (
    <ThemeConsumer>
      {globalTheme => {
        const theme = {
          ...globalTheme,
          topbar: { ...globalTheme.topbar, ...localTheme },
        };
        const propsWithTheme = { theme, ...rest };
        const background = getTheme(propsWithTheme, 'topbar.background');
        const color = getTheme(propsWithTheme, 'topbar.color');
        return <TopBar background={background} color={color} {...rest} />;
      }}
    </ThemeConsumer>
  );
};

ThemedTopBar.propTypes = {
  theme: PropTypes.shape({
    /**
     * 头部栏背景颜色
     */
    background: ColorPropType,
    /**
     * 头部栏主体颜色（包括图标，图片，文字等）
     */
    color: ColorPropType,
  }),
};

ThemedTopBar.defaultProps = {
  theme: null,
};

ThemedTopBar.height = TopBar.height;
ThemedTopBar.Container = TopBar.Container;
ThemedTopBar.Content = TopBar.Content;
ThemedTopBar.Action = TopBar.Action;

export default ThemedTopBar;
