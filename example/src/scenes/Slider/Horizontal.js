import React, { Component } from 'react';
import { View } from 'react-native';
import { Slider } from 'tuya-panel-kit';

export default class SliderHorizontalScene extends Component {
  state = {
    value: 0,
  }

  _handleComplete = value => {
    this.setState({ value: Math.round(value) });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Slider.Horizontal
          style={{ width: 295 }}
          maximumValue={100}
          minimumValue={0}
          value={this.state.value}
          maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
          minimumTrackTintColor="#4397D7"
          onSlidingComplete={this._handleComplete}
        />
      </View>
    );
  }
}
