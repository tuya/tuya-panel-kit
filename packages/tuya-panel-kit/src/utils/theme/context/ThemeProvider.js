import React from 'react';
import PropTypes from 'prop-types';
import defaultTheme from '../../../components/theme/base';
import ThemeContext from './ThemeContext';

export default function ThemeProvider({ theme, children }) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

ThemeProvider.propTypes = {
  theme: PropTypes.object,
  children: PropTypes.element.isRequired,
};

ThemeProvider.defaultProps = {
  theme: defaultTheme,
};
