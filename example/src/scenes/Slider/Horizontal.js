import React, { Component } from 'react';
import { View } from 'react-native';
import { Slider, TYText } from 'tuya-panel-kit';

export default class SliderHorizontalScene extends Component {
  state = {
    value: 25,
  };

  _handleComplete = value => {
    this.setState({ value: Math.round(value) });
  };

  render() {
    const { value } = this.state;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TYText text="reverseValue = false" style={{ marginBottom: 10 }} />
        <View>
          <Slider.Horizontal
            theme={{
              width: 318,
              height: 6,
              trackRadius: 3,
              trackHeight: 6,
              thumbSize: 26,
              thumbRadius: 26,
              thumbTintColor: '#FFF',
              minimumTrackTintColor: '#57BCFB',
              maximumTrackTintColor: '#E3E9EE',
            }}
            maximumValue={100}
            minimumValue={0}
            value={this.state.value}
            onValueChange={this._handleComplete}
            onSlidingComplete={this._handleComplete}
          />
          <Slider
            theme={{
              width: 318,
              height: 36,
              trackRadius: 18,
              trackHeight: 36,
              thumbSize: 20,
              thumbRadius: 20,
              thumbTintColor: '#FFF',
              minimumTrackTintColor: '#E3E9EE',
              maximumTrackTintColor: '#E3E9EE',
            }}
            thumbTouchSize={{ width: 36, height: 36 }}
            style={{ marginVertical: 10 }}
            type="parcel"
            renderMinimumTrack={() => (
              <View
                style={{
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: '#57BCFB',
                  marginHorizontal: 3,
                }}
              />
            )}
          />
          <Slider
            theme={{
              width: 318,
              height: 46,
              trackRadius: 16,
              trackHeight: 46,
              thumbSize: 20,
              thumbRadius: 20,
              thumbTintColor: '#57BCFB',
              minimumTrackTintColor: '#E3E9EE',
              maximumTrackTintColor: '#E3E9EE',
            }}
            style={{ marginVertical: 10 }}
            thumbTouchSize={{ width: 46, height: 46 }}
            thumbStyle={{
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            type="parcel"
            renderMinimumTrack={() => (
              <View
                style={{
                  height: 38,
                  borderRadius: 14,
                  backgroundColor: '#57BCFB',
                  marginHorizontal: 4,
                }}
              />
            )}
            renderThumb={() => (
              <View
                style={{
                  height: 14,
                  borderRadius: 5.5,
                  width: 3,
                  backgroundColor: '#FFF',
                }}
              />
            )}
          />
          <Slider
            theme={{
              width: 318,
              height: 46,
              trackRadius: 16,
              trackHeight: 46,
              thumbSize: 20,
              thumbRadius: 20,
              thumbTintColor: '#57BCFB',
              minimumTrackTintColor: '#57BCFB',
              maximumTrackTintColor: '#E3E9EE',
            }}
            maximumValue={100}
            thumbTouchSize={{ width: 46, height: 46 }}
            stepValue={25}
            thumbStyle={{
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            type="parcel"
            useNoun={true}
            style={{ marginVertical: 10 }}
          />
          <Slider
            theme={{
              width: 318,
              height: 6,
              trackRadius: 3,
              trackHeight: 6,
              thumbSize: 26,
              thumbRadius: 26,
              thumbTintColor: '#FFF',
              minimumTrackTintColor: '#57BCFB',
              maximumTrackTintColor: '#E3E9EE',
            }}
            style={{ marginVertical: 10 }}
            maximumValue={100}
            minimumValue={0}
            stepValue={25}
            useNoun={true}
            value={value}
            onValueChange={value => this.setState({ value })}
            minNounStyle={{ backgroundColor: '#f0f' }}
          />
        </View>
        <TYText text="reverseValue = true" style={{ marginVertical: 10 }} />
        <View>
          <Slider.Horizontal
            theme={{
              width: 318,
              height: 6,
              trackRadius: 3,
              trackHeight: 6,
              thumbSize: 26,
              thumbRadius: 26,
              thumbTintColor: '#FFF',
              minimumTrackTintColor: '#E3E9EE',
              maximumTrackTintColor: '#57BCFB',
            }}
            maximumValue={100}
            minimumValue={0}
            reverseValue={true}
            value={this.state.value}
            onValueChange={this._handleComplete}
            onSlidingComplete={this._handleComplete}
          />
          <Slider
            theme={{
              width: 318,
              height: 36,
              trackRadius: 18,
              trackHeight: 36,
              thumbSize: 20,
              thumbRadius: 20,
              thumbTintColor: '#FFF',
              minimumTrackTintColor: '#E3E9EE',
              maximumTrackTintColor: '#E3E9EE',
            }}
            style={{ marginVertical: 10 }}
            type="parcel"
            thumbTouchSize={{ width: 36, height: 36 }}
            reverseValue={true}
            renderMinimumTrack={() => (
              <View
                style={{
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: '#57BCFB',
                  marginHorizontal: 3,
                }}
              />
            )}
          />
          <Slider
            theme={{
              width: 318,
              height: 46,
              trackRadius: 16,
              trackHeight: 46,
              thumbSize: 20,
              thumbRadius: 20,
              thumbTintColor: '#57BCFB',
              minimumTrackTintColor: '#E3E9EE',
              maximumTrackTintColor: '#E3E9EE',
            }}
            style={{ marginVertical: 10 }}
            reverseValue={true}
            thumbTouchSize={{ width: 46, height: 46 }}
            thumbStyle={{
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            type="parcel"
            renderMinimumTrack={() => (
              <View
                style={{
                  height: 38,
                  borderRadius: 14,
                  backgroundColor: '#57BCFB',
                  marginHorizontal: 4,
                }}
              />
            )}
            renderThumb={() => (
              <View
                style={{
                  height: 14,
                  borderRadius: 5.5,
                  width: 3,
                  backgroundColor: '#FFF',
                }}
              />
            )}
          />
          <Slider
            theme={{
              width: 318,
              height: 46,
              trackRadius: 16,
              trackHeight: 46,
              thumbSize: 20,
              thumbRadius: 20,
              thumbTintColor: '#57BCFB',
              minimumTrackTintColor: '#57BCFB',
              maximumTrackTintColor: '#E3E9EE',
            }}
            maximumValue={100}
            stepValue={25}
            thumbTouchSize={{ width: 46, height: 46 }}
            style={{ marginVertical: 10 }}
            thumbStyle={{
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            type="parcel"
            useNoun={true}
            reverseValue={true}
            minNounStyle={{ backgroundColor: '#f0f' }}
          />
          <Slider
            theme={{
              width: 318,
              height: 6,
              trackRadius: 3,
              trackHeight: 6,
              thumbSize: 26,
              thumbRadius: 26,
              thumbTintColor: '#FFF',
              minimumTrackTintColor: '#E3E9EE',
              maximumTrackTintColor: '#57BCFB',
            }}
            style={{ marginVertical: 10 }}
            maximumValue={100}
            minimumValue={0}
            stepValue={25}
            useNoun={true}
            reverseValue={true}
            minNounStyle={{ backgroundColor: '#f0f' }}
          />
        </View>
      </View>
    );
  }
}
