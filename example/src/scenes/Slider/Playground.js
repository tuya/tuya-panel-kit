import React, { Component } from 'react';
import { View } from 'react-native';
import { Slider } from 'tuya-panel-kit';
import ExplorerLayout from '../../components/ExplorerLayout';
import ControlBoolean from '../../components/ControlBoolean';

export default class SliderPlaygroundScene extends Component {
  state = {
    disabled: false,
    canTouchTrack: false,
    onlyMaximumTrack: false,
    value: 0,
  };

  _handleBoolChange = key => value => {
    this.setState({ [key]: value });
  };

  _handleComplete = value => {
    this.setState({ value: Math.round(value) });
  };

  renderContent = () => {
    return (
      <View style={{ alignItems: 'center' }}>
        <Slider.Horizontal
          style={{ width: 295 }}
          maximumValue={100}
          minimumValue={0}
          maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
          minimumTrackTintColor="#4397D7"
          value={this.state.value}
          disabled={this.state.disabled}
          canTouchTrack={this.state.canTouchTrack}
          onlyMaximumTrack={this.state.onlyMaximumTrack}
          onSlidingComplete={this._handleComplete}
        />
        <Slider.Vertical
          style={{ height: 200 }}
          value={this.state.value}
          disabled={this.state.disabled}
          canTouchTrack={this.state.canTouchTrack}
          onlyMaximumTrack={this.state.onlyMaximumTrack}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#4A90E2"
          maximumTrackTintColor="#50E3C2"
          onSlidingComplete={this._handleComplete}
        />
      </View>
    );
  };

  renderPlayground = () => {
    return (
      <View>
        <ControlBoolean
          title="Toggle Disabled"
          value={this.state.disabled}
          onValueChange={this._handleBoolChange('disabled')}
        />
        <ControlBoolean
          title="Toggle canTouchTrack"
          value={this.state.canTouchTrack}
          onValueChange={this._handleBoolChange('canTouchTrack')}
        />
        <ControlBoolean
          title="Toggle onlyMaximumTrack"
          value={this.state.onlyMaximumTrack}
          onValueChange={this._handleBoolChange('onlyMaximumTrack')}
        />
      </View>
    );
  };

  render() {
    return (
      <ExplorerLayout
        style={{ flex: 1 }}
        scrollEnabled={false}
        renderContent={this.renderContent}
        renderPlayground={this.renderPlayground}
      />
    );
  }
}
