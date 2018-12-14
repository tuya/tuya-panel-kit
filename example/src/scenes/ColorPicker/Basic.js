import React, { Component } from 'react';
import { View } from 'react-native';
import { ColorPicker } from 'tuya-panel-kit';

export default class ColorPickerBasicScene extends Component {
  state = {
    hsb: [360, 100, 100],
  }

  _handleComplete = hsb => {
    this.setState({ hsb });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ColorPicker
          hsb={this.state.hsb}
          onComplete={this._handleComplete}
        />
      </View>
    );
  }
}
