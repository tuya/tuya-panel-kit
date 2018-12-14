import React, { Component } from 'react';
import { View } from 'react-native';
import { RectColorPicker } from 'tuya-panel-kit';

export default class RectColorPickerVerticalScene extends Component {
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
          style={{ width: 300, height: 200 }}
          hsb={this.state.hsb}
          saturation="2b"
          direction="all"
          axis="x"
          onValueChange={this._handleValueChange}
        />
      </View>
    );
  }
}
