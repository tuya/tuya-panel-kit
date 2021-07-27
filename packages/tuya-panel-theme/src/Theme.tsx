import React from 'react';
import { Utils } from 'tuya-panel-utils';
import { ThemeProvider } from 'styled-components/native';
import ThemeContextProvider from './context/ThemeProvider';
import defaultTheme from './base';

const { deepMerge } = Utils.ThemeUtils;

export interface IProps {
  theme?: { [key: string]: string };
  children: React.ReactChild;
}

const Theme: React.FunctionComponent<IProps> = props => {
  const { theme, children } = props;
  const finalTheme = deepMerge(defaultTheme, theme);
  return (
    <ThemeProvider theme={finalTheme}>
      <ThemeContextProvider theme={finalTheme}>{children}</ThemeContextProvider>
    </ThemeProvider>
  );
};

export default Theme;
