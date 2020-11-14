import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, StyleSheet, ViewPropTypes } from 'react-native';
import { SwitchButton } from 'tuya-panel-kit';

export default class ControlBoolean extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    title: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    ...SwitchButton.propTypes,
  };

  static defaultProps = {
    style: null,
  };

  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value;
  }

  render() {
    const { style, value, title, ...SwitchButtonProps } = this.props;
    return (
      <View style={[styles.container, style]}>
        <Text style={styles.text} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.right}>
          <SwitchButton
            value={value}
            onTintColor="#44DB5E"
            onThumbTintColor="#fff"
            {...SwitchButtonProps}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },

  right: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 12,
  },

  text: {
    textAlign: 'center',
    fontSize: 12,
    color: '#000',
    backgroundColor: 'transparent',
  },
});
