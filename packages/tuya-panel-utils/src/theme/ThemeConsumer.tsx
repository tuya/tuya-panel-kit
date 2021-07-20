import PropTypes from 'prop-types';
import { withTheme } from 'styled-components/native';

const ThemeConsumer = ({ theme, children }) => children(theme);

ThemeConsumer.propTypes = {
  theme: PropTypes.objectOf(PropTypes.object),
  children: PropTypes.element.isRequired,
};
ThemeConsumer.defaultProps = {
  theme: null,
};

export default withTheme(ThemeConsumer);
