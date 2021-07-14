import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components/native';
import ThemeContextProvider from '../../utils/theme/context/ThemeProvider';
import defaultTheme from './base';
import ThemeUtils from '../../utils/theme';

const { deepMerge } = ThemeUtils;

export default class Theme extends PureComponent {
  static propTypes = {
    theme: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
  };

  render() {
    const theme = deepMerge(defaultTheme, this.props.theme);
    return (
      <ThemeProvider theme={theme}>
        <ThemeContextProvider theme={theme}>{this.props.children}</ThemeContextProvider>
      </ThemeProvider>
    );
  }
}
