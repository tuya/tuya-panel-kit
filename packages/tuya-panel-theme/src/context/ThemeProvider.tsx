import React from 'react';
import defaultTheme from '../base';
import ThemeContext from './ThemeContext';

export interface IProps {
  theme?: { [key: string]: string };
  children: React.ReactChild;
}

const ThemeProvider: React.FunctionComponent<IProps> = (props: IProps) => {
  const { theme = defaultTheme, children } = props;
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
