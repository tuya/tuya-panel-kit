import PropTypes from 'prop-types';
import { withTheme } from 'styled-components/native';

const ThemeConsumer = ({ theme, children }) => children(theme);

ThemeConsumer.propTypes = {
  theme: PropTypes.shape({}),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};
ThemeConsumer.defaultProps = {
  theme: null,
};

export default withTheme(ThemeConsumer);
