import React, { Component } from 'react';
import { View } from 'react-native';
import { Slider, TYText } from 'tuya-panel-kit';
import Strings from '../../i18n';

export default class SliderHorizontalScene extends Component {
  state = {
    value: 0,
  };

  _handleComplete = value => {
    this.setState({ value: Math.round(value) });
  };

  render() {

    t2 = Strings.getLang('test') + Strings.getLang('default');
    t2 = Strings.getLang('test') + 'local theme';

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TYText text={this.t1} />
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
        

        <TYText text={this.t2} />
        <Slider
          theme={{
            width: 200,
            height: 50,
            trackRadius: 25,
            trackHeight: 50,
            thumbSize: 36,
            thumbRadius: 18,
            thumbTintColor: '#ff0000',
            minimumTrackTintColor: '#ff00ff',
            maximumTrackTintColor: '#00ffff',
          }}
          type="parcel"
          style={{ height: 50, width: 200 }}
        />
      </View>
    );
  }
}
