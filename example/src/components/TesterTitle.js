/* eslint-disable react/prefer-stateless-function */
import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, StyleSheet, ViewPropTypes } from 'react-native';

export default class RNTesterTitle extends React.Component {
  static propTypes = {
    style: ViewPropTypes.style,
    title: PropTypes.string.isRequired,
  };

  static defaultProps = {
    style: null,
  };

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Text style={styles.text}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    marginVertical: 10,
    padding: 10,
    backgroundColor: 'white',
  },
  text: {
    color: '#333',
    fontSize: 19,
    fontWeight: '500',
  },
});
