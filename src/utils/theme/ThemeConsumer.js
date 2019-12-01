import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components/native';

class ThemeConsumer extends React.Component {
  static propTypes = {
    theme: PropTypes.object.isRequired,
    children: PropTypes.func.isRequired,
  };

  render() {
    return this.props.children(this.props.theme);
  }
}

export default withTheme(ThemeConsumer);
