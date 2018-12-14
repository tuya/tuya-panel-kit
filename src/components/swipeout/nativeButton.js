import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, TouchableWithoutFeedback, Text, Platform, TouchableNativeFeedback, TouchableHighlight, StyleSheet } from 'react-native';

class NativeButton extends React.Component {
  static propTypes = {
    ...TouchableWithoutFeedback.propTypes,
    textStyle: Text.propTypes.style,
    children: PropTypes.node.isRequired,
    background: (TouchableNativeFeedback.propTypes) ?
      TouchableNativeFeedback.propTypes.background : PropTypes.any,
  }

  static defaultProps = {
    textStyle: undefined,
    background: undefined,
  }


  renderText = () => {
    if (typeof this.props.children !== 'string') {
      return this.props.children;
    }
    return (
      <Text
        numberOfLines={1}
        ellipsizeMode={Platform.OS === 'ios' ? 'clip' : 'tail'}
        style={[styles.textButton, this.props.textStyle]}
      >
        { this.props.children }
      </Text>
    );
  }
  render() {
    const disabledStyle = this.props.disabled ? styles.opacity : {};
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={this.props.onPress}
        disabled={this.props.disabled}
        style={[styles.button, this.props.style, disabledStyle]}
      >
        { this.renderText() }
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  textButton: {
    fontSize: 14,
    alignSelf: 'center',
  },
  opacity: {
    opacity: 0.8,
  },
});

export default NativeButton;
