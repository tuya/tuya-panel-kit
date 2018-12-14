import React, { Component } from 'react';
import { View } from 'react-native';
import { Slider } from 'tuya-panel-kit';

export default class SliderVerticalScene extends Component {
  state = {
    value: 24,
  }

  _handleComplete = value => {
    this.setState({ value: Math.round(value) });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Slider.Vertical
          style={{ height: 200 }}
          value={this.state.value}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#4A90E2"
          maximumTrackTintColor="#50E3C2"
        />
      </View>
    );
  }
}
