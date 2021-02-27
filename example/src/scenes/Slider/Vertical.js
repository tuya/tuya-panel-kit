import React, { Component } from 'react';
import { View } from 'react-native';
import { Slider } from 'tuya-panel-kit';

export default class SliderVerticalScene extends Component {
  state = {
    value: 24,
  };

  _handleComplete = value => {
    this.setState({ value: Math.round(value) });
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Slider.Vertical
          style={{ height: 200 }}
          value={this.state.value}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#ff0000"
          maximumTrackTintColor="#ff00ff"
        />
        <Slider.Vertical
          theme={{
            trackRadius: 25,
            trackHeight: 50,
            thumbSize: 36,
            thumbRadius: 18,
            thumbTintColor: '#ff0000',
            minimumTrackTintColor: '#ff00ff',
            maximumTrackTintColor: '#00ffff',
          }}
          // reverseValue={true}
          style={{ height: 200, width: 50 }}
          value={this.state.value}
          type="parcel"
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#ff0000"
          maximumTrackTintColor="#ffff00"
        />
      </View>
    );
  }
}
