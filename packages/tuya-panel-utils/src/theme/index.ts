import { withTheme } from 'styled-components/native';
import ThemeConsumer from './ThemeConsumer';
import ThemeProvider from './ThemeProvider';
import {
  parseToCss,
  parseToStyle,
  deepMerge,
  getTheme,
  getPropsFromStyle,
  getValueFormObject,
} from './utils';

export default {
  withTheme,
  ThemeProvider,
  ThemeConsumer,
  parseToCss,
  parseToStyle,
  deepMerge,
  getTheme,
  getPropsFromStyle,
  getValueFormObject,
};
