import React, { Component } from 'react';
import { View } from 'react-native';
import { RectColorPicker } from 'tuya-panel-kit';

export default class RectColorPickerHSPickerScene extends Component {
  state = {
    hsb: [180, 100, 100],
  }

  _handleValueChange = data => {
    this.setState({ hsb: data.hsb });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <RectColorPicker
          style={{ width: 100, height: 300 }}
          hsb={this.state.hsb}
          direction="vertical"
          axis="y"
          onValueChange={this._handleValueChange}
        />
      </View>
    );
  }
}
