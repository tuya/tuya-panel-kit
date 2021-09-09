import React from 'react';
import { Utils } from 'tuya-panel-utils';
import TopBar from './topBar';
import { IThemeTopBarProps } from './interface';

const { getTheme, ThemeConsumer } = Utils.ThemeUtils;

const ThemedTopBar = (props: IThemeTopBarProps) => {
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

ThemedTopBar.defaultProps = {
  theme: null,
};

ThemedTopBar.height = TopBar.height;
ThemedTopBar.Container = TopBar.Container;
ThemedTopBar.Content = TopBar.Content;
ThemedTopBar.Action = TopBar.Action;

export default ThemedTopBar;
