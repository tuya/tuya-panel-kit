import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, StyleSheet, ViewPropTypes } from 'react-native';
import { Slider } from 'tuya-panel-kit';
import { store } from '../main';
import { startGesture, stopGesture } from '../redux/modules/uiState';

export default class ControlNumber extends Component {
  static propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    style: ViewPropTypes.style,
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func,
    onComplete: PropTypes.func,
    ...Slider.propTypes,
  };

  static defaultProps = {
    style: null,
    onChange: null,
    onComplete: null,
  };

  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value;
  }

  _handleSlidingStart = () => {
    store.dispatch(startGesture());
  };

  _handleSlidingComplete = value => {
    store.dispatch(stopGesture());
    this.props.onComplete && this.props.onComplete(value);
  };

  render() {
    const { style, min, max, onChange, value, title, ...SliderProps } = this.props;
    return (
      <View style={[styles.container, style]}>
        <Text style={styles.text} numberOfLines={1}>
          {title}
        </Text>
        <Slider
          style={styles.slider}
          canTouchTrack={true}
          maximumValue={max}
          minimumValue={min}
          thumbStyle={styles.sliderThumb}
          trackStyle={styles.sliderTrack}
          onlyMaximumTrack={false}
          value={value}
          onSlidingStart={this._handleSlidingStart}
          onValueChange={onChange}
          onSlidingComplete={this._handleSlidingComplete}
          {...SliderProps}
        />
        <Text style={styles.text} numberOfLines={1}>
          {Math.round(value)}
        </Text>
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
  },

  slider: {
    width: 236,
    marginHorizontal: 8,
  },

  sliderTrack: {
    height: 3,
  },

  sliderThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },

  text: {
    flex: 1,
    textAlign: 'center',
    fontSize: 10,
    color: '#000',
    backgroundColor: 'transparent',
  },
});
