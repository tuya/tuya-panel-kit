import React, { Component } from 'react';
import {
  View,
  Image,
} from 'react-native';
import { CircularPicker } from 'tuya-panel-kit';

const Res = {
  hue: require('../../res/hue.png'),
};

export default class CircularPickerHuePickerScene extends Component {
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
          startDegree={0}
          endDegree={360}
          TrackComponent={<Image source={Res.hue} />}
          onValueChange={this._handleValueChange}
          onComplete={this._handleValueChange}
        />
      </View>
    );
  }
}
