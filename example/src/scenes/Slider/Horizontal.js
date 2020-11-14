import React, { Component } from 'react';
import { View } from 'react-native';
import { Slider, TYText } from 'tuya-panel-kit';

export default class SliderHorizontalScene extends Component {
  state = {
    value: 0,
  };

  _handleComplete = value => {
    this.setState({ value: Math.round(value) });
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TYText text="测试默认" />
        <Slider.Horizontal
          style={{ width: 295 }}
          maximumValue={100}
          minimumValue={0}
          step={25}
          value={this.state.value}
          // maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
          // minimumTrackTintColor="#ff0000"
          onValueChange={this._handleComplete}
          onSlidingComplete={this._handleComplete}
          // renderMaximumTrack={() => <View style={{ height: 20, backgroundColor: 'red' }} />}
          // renderMinimumTrack={() => <View style={{ height: 20, backgroundColor: 'blue' }} />}
          // renderThumb={() => <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'yellow' }} />}
          // thumbStyle={{ width: 40, height: 40, borderRadius: 20 }}
          // maximumTrackStyle={{ height: 20 }}
        />
        <TYText text="测试local theme" />
        <Slider
          theme={{
            width: 200,
            trackRadius: 8,
            trackHeight: 16,
            thumbSize: 36,
            thumbRadius: 18,
            thumbTintColor: '#ff0000',
            minimumTrackTintColor: '#ff00ff',
            maximumTrackTintColor: '#00ffff',
          }}
        />
      </View>
    );
  }
}
