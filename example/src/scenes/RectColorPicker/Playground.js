import React, { Component } from 'react';
import { View } from 'react-native';
import { RectColorPicker } from 'tuya-panel-kit';
import ExplorerLayout from '../../components/ExplorerLayout';
import ControlBoolean from '../../components/ControlBoolean';

export default class RectColorPickerPlaygroundScene extends Component {
  state = {
    disabled: false
  }

  _handleBoolChange = key => value => {
    this.setState({ [key]: value });
  }

  renderContent = () => {
    return (
      <RectColorPicker
        style={{ width: 340, height: 44 }}
        disabled={this.state.disabled}
      />
    );
  }

  renderPlayground = () => {
    return (
      <View>
        <ControlBoolean
          title="Toggle Disabled"
          value={this.state.disabled}
          onValueChange={this._handleBoolChange('disabled')}
        />
      </View>
    );
  }

  render() {
    return (
      <ExplorerLayout
        contentStyle={{ marginTop: 24 }}
        renderContent={this.renderContent}
        renderPlayground={this.renderPlayground}
      />
    );
  }
}
