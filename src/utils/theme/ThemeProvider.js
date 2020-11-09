import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as ThemeProviderBase } from 'styled-components/native';
import { deepMerge } from './utils';
import ThemeConsumer from './ThemeConsumer';

const ThemeProvider = ({ theme, children }) => {
  return (
    <ThemeConsumer>
      {t => <ThemeProviderBase theme={deepMerge(t, theme)}>{children}</ThemeProviderBase>}
    </ThemeConsumer>
  );
};

ThemeProvider.propTypes = {
  theme: PropTypes.object,
  children: PropTypes.element.isRequired,
};
ThemeProvider.defaultProps = {
  theme: null,
};

export default ThemeProvider;
