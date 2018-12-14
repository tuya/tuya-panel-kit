import React, { Component } from 'react';
import { View } from 'react-native';
import { CircularPicker } from 'tuya-panel-kit';

export default class CircularPickerProgressScene extends Component {
  state = {
    degree: 30,
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
          startDegree={30}
          endDegree={330}
          strokeColor="red"
          frontStrokeColor="blue"
          onValueChange={this._handleValueChange}
          onComplete={this._handleValueChange}
        />
      </View>
    );
  }
}
