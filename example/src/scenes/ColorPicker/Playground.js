import React, { Component } from 'react';
import { View } from 'react-native';
import { ColorPicker } from 'tuya-panel-kit';
import ExplorerLayout from '../../components/ExplorerLayout';
import ControlBoolean from '../../components/ControlBoolean';
import ControlNumber from '../../components/ControlNumber';

export default class ColorPickerPlaygroundScene extends Component {
  state = {
    hsb: [360, 100, 100],
    disabled: false,
    isWhiteMode: false,
    innerRadius: 32,
  }

  _handleComplete = hsb => {
    this.setState({ hsb });
  }

  _handleBoolChange = key => value => {
    this.setState({ [key]: value });
  }

  _handleNumberChange = key => value => {
    this.setState({ [key]: Math.round(value) });
  }

  renderContent = () => {
    return (
      <ColorPicker
        style={{}}
        hsb={this.state.hsb}
        disabled={this.state.disabled}
        mode={this.state.isWhiteMode ? 'white' : 'colour'}
        innerRadius={this.state.innerRadius}
        onComplete={this._handleComplete}
      />
    );
  }

  renderPlayground = () => {
    return (
      <View>
        <ControlBoolean
          title="Toggle disabled"
          value={this.state.disabled}
          onValueChange={disabled => this.setState({ disabled })}
        />
        <ControlBoolean
          title="Toggle isWhiteMode"
          value={this.state.isWhiteMode}
          onValueChange={isWhiteMode => this.setState({ isWhiteMode })}
        />
        <ControlNumber
          min={0}
          max={100}
          value={this.state.innerRadius}
          title="innerRadius"
          onChange={this._handleNumberChange('innerRadius')}
          onComplete={this._handleNumberChange('innerRadius')}
        />
      </View>
    );
  }

  render() {
    return (
      <ExplorerLayout
        scrollEnabled={false}
        contentStyle={{ marginTop: 24 }}
        renderContent={this.renderContent}
        renderPlayground={this.renderPlayground}
      />
    );
  }
}
