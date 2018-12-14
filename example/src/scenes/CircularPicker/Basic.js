import React, { Component } from 'react';
import { View } from 'react-native';
import { CircularPicker } from 'tuya-panel-kit';

export default class CircularPickerBasicScene extends Component {
  state = {
    degree: 0,
  }

  _handleValueChange = data => {
    this.setState({ degree: Math.round(data.degree) });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <CircularPicker
          degree={this.state.degree}
          radius={115}
          strokeWidth={40}
          startDegree={0}
          endDegree={360}
          onValueChange={this._handleValueChange}
          onComplete={this._handleValueChange}
        />
      </View>
    );
  }
}
