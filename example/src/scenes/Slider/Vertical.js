import React, { Component } from 'react';
import { View } from 'react-native';
import { Slider, TYText } from 'tuya-panel-kit';

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
        <TYText text="reverseValue = false" style={{ marginBottom: 10 }} />
        <View style={{ flexDirection: 'row' }}>
          <Slider.Vertical
            theme={{
              thumbSize: 26,
              thumbRadius: 26,
              thumbTintColor: '#FFF',
              minimumTrackTintColor: '#57BCFB',
              maximumTrackTintColor: '#E3E9EE',
            }}
            trackStyle={{ width: 6, height: 200, borderRadius: 3 }}
            // style={{ height: 200 }}
            value={this.state.value}
            minimumValue={0}
            maximumValue={100}
          />
          <Slider.Vertical
            theme={{
              thumbSize: 20,
              thumbRadius: 20,
              thumbTintColor: '#FFF',
              maximumTrackTintColor: '#E3E9EE',
              minimumTrackTintColor: '#E3E9EE',
            }}
            type="parcel"
            trackStyle={{ width: 36, height: 200, borderRadius: 18 }}
            style={{ marginHorizontal: 10 }}
            value={this.state.value}
            minimumValue={0}
            maximumValue={100}
            thumbTouchSize={{ width: 36, height: 36 }}
            renderMinimumTrack={() => (
              <View
                style={{
                  width: 30,
                  borderRadius: 15,
                  backgroundColor: '#57BCFB',
                  marginVertical: 3,
                  flex: 1,
                }}
              />
            )}
          />
          <Slider.Vertical
            theme={{
              maximumTrackTintColor: '#E3E9EE',
              minimumTrackTintColor: '#E3E9EE',
            }}
            type="parcel"
            trackStyle={{ width: 46, height: 200, borderRadius: 16 }}
            style={{ marginHorizontal: 10 }}
            value={this.state.value}
            minimumValue={0}
            maximumValue={100}
            thumbTouchSize={{ width: 46, height: 46 }}
            thumbStyle={{
              width: 14,
              height: 3,
              borderRadius: 5.5,
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
            renderMinimumTrack={() => (
              <View
                style={{
                  width: 38,
                  borderRadius: 14,
                  backgroundColor: '#57BCFB',
                  marginVertical: 4,
                  flex: 1,
                }}
              />
            )}
            renderThumb={() => (
              <View
                style={{
                  height: 3,
                  borderRadius: 5.5,
                  width: 14,
                  backgroundColor: '#FFF',
                  flex: 1,
                }}
              />
            )}
          />
          <Slider.Vertical
            theme={{
              thumbSize: 20,
              thumbRadius: 20,
              thumbTintColor: '#57BCFB',
              minimumTrackTintColor: '#57BCFB',
              maximumTrackTintColor: '#E3E9EE',
            }}
            type="parcel"
            trackStyle={{ width: 46, height: 200, borderRadius: 16 }}
            thumbTouchSize={{ width: 46, height: 46 }}
            style={{ marginHorizontal: 10 }}
            value={0}
            minimumValue={0}
            maximumValue={100}
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
            useNoun={true}
            stepValue={25}
            minNounStyle={{ backgroundColor: '#f0f' }}
          />
          <Slider.Vertical
            theme={{
              thumbSize: 26,
              thumbRadius: 26,
              thumbTintColor: '#FFF',
              minimumTrackTintColor: '#57BCFB',
              maximumTrackTintColor: '#E3E9EE',
            }}
            trackStyle={{ width: 6, height: 200, borderRadius: 3 }}
            style={{ marginHorizontal: 10 }}
            value={0}
            minimumValue={0}
            maximumValue={100}
            useNoun={true}
            stepValue={25}
            minNounStyle={{ backgroundColor: '#f0f' }}
          />
        </View>
        <TYText text="reverseValue = true" style={{ marginVertical: 10 }} />
        <View style={{ flexDirection: 'row' }}>
          <Slider.Vertical
            theme={{
              thumbSize: 26,
              thumbRadius: 26,
              thumbTintColor: '#FFF',
              minimumTrackTintColor: '#E3E9EE',
              maximumTrackTintColor: '#57BCFB',
            }}
            trackStyle={{ width: 6, height: 200, borderRadius: 3 }}
            reverseValue={true}
            value={this.state.value}
            minimumValue={0}
            maximumValue={100}
          />
          <Slider.Vertical
            theme={{
              thumbSize: 20,
              thumbRadius: 20,
              thumbTintColor: '#FFF',
              maximumTrackTintColor: '#E3E9EE',
              minimumTrackTintColor: '#E3E9EE',
            }}
            type="parcel"
            trackStyle={{ width: 36, height: 200, borderRadius: 18 }}
            thumbTouchSize={{ width: 36, height: 36 }}
            style={{ marginHorizontal: 10 }}
            value={this.state.value}
            minimumValue={0}
            maximumValue={100}
            reverseValue={true}
            renderMinimumTrack={() => (
              <View
                style={{
                  width: 30,
                  borderRadius: 15,
                  backgroundColor: '#57BCFB',
                  marginVertical: 3,
                  flex: 1,
                }}
              />
            )}
          />
          <Slider.Vertical
            theme={{
              maximumTrackTintColor: '#E3E9EE',
              minimumTrackTintColor: '#E3E9EE',
            }}
            type="parcel"
            trackStyle={{ width: 46, height: 200, borderRadius: 16 }}
            thumbTouchSize={{ width: 46, height: 46 }}
            style={{ marginHorizontal: 10 }}
            value={this.state.value}
            minimumValue={0}
            maximumValue={100}
            thumbStyle={{
              width: 14,
              height: 3,
              borderRadius: 5.5,
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
            reverseValue={true}
            renderMinimumTrack={() => (
              <View
                style={{
                  width: 38,
                  borderRadius: 14,
                  backgroundColor: '#57BCFB',
                  marginVertical: 4,
                  flex: 1,
                }}
              />
            )}
            renderThumb={() => (
              <View
                style={{
                  height: 3,
                  borderRadius: 5.5,
                  width: 14,
                  backgroundColor: '#FFF',
                  flex: 1,
                }}
              />
            )}
          />
          <Slider.Vertical
            theme={{
              thumbSize: 20,
              thumbRadius: 20,
              thumbTintColor: '#57BCFB',
              minimumTrackTintColor: '#57BCFB',
              maximumTrackTintColor: '#E3E9EE',
            }}
            type="parcel"
            trackStyle={{ width: 46, height: 200, borderRadius: 16 }}
            thumbTouchSize={{ width: 46, height: 46 }}
            style={{ marginHorizontal: 10 }}
            value={0}
            minimumValue={0}
            maximumValue={100}
            reverseValue={true}
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
            useNoun={true}
            stepValue={25}
            minNounStyle={{ backgroundColor: '#f0f' }}
          />
          <Slider.Vertical
            theme={{
              thumbSize: 26,
              thumbRadius: 26,
              thumbTintColor: '#FFF',
              minimumTrackTintColor: '#E3E9EE',
              maximumTrackTintColor: '#57BCFB',
            }}
            trackStyle={{ width: 6, height: 200, borderRadius: 3 }}
            style={{ marginHorizontal: 10 }}
            value={0}
            reverseValue={true}
            minimumValue={0}
            maximumValue={100}
            useNoun={true}
            stepValue={25}
            minNounStyle={{ backgroundColor: '#f0f' }}
          />
        </View>
      </View>
    );
  }
}
